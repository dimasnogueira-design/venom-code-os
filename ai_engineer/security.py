"""VENOM AI ENGINEER — explicit safe capabilities. No arbitrary shell, network or deploy."""
from dataclasses import dataclass
from pathlib import Path
import os
import subprocess

BLOCKED_COMPONENTS = {".git", ".ssh", "node_modules", "__pycache__", "data", "private", ".venv", "venv", "secrets", "credentials"}
BLOCKED_NAMES = {".env", ".env.local", ".env.production", ".npmrc", "id_rsa", "id_ed25519", "service-account.json", "auth.json", "credentials.json"}
BLOCKED_EXTS = {".pem", ".key", ".p12", ".pfx", ".sqlite", ".db"}
MAX_READ_BYTES = 64_000
MAX_WRITE_BYTES = 96_000

class AccessDenied(ValueError):
    """Unsafe operation rejected by the capability gate."""

@dataclass(frozen=True)
class Capabilities:
    workspace: Path
    allow_write: bool = False
    allow_tests: bool = False

    def __post_init__(self):
        root = self.workspace.resolve(strict=True)
        if not root.is_dir():
            raise AccessDenied("workspace deve ser um diretório existente")
        object.__setattr__(self, "workspace", root)

    def resolve(self, relative: str) -> Path:
        if not relative or os.path.isabs(relative):
            raise AccessDenied("Somente caminhos relativos ao workspace")
        parts = Path(relative).parts
        blocked_components = {component.casefold() for component in BLOCKED_COMPONENTS}
        if ".." in parts or any(part.casefold() in blocked_components for part in parts):
            raise AccessDenied("Caminho contém segmentos bloqueados")
        if any(part.casefold().startswith(".env") for part in parts) or Path(relative).name.casefold() in BLOCKED_NAMES:
            raise AccessDenied("Credenciais bloqueadas")
        if any(mark in Path(relative).name.lower() for mark in ("secret", "token", "password", "private_key")):
            raise AccessDenied("Nome de arquivo confidencial bloqueado")
        if Path(relative).suffix.lower() in BLOCKED_EXTS:
            raise AccessDenied("Tipo sensível bloqueado")
        path = (self.workspace / relative).resolve()
        if path != self.workspace and self.workspace not in path.parents:
            raise AccessDenied("Caminho fora do workspace")
        return path

    def list_files(self, relative: str = ".") -> list[str]:
        folder = self.resolve(relative)
        if not folder.is_dir():
            raise AccessDenied("Diretório inexistente")
        result = []
        for candidate in sorted(folder.iterdir()):
            try:
                self.resolve(str(candidate.relative_to(self.workspace)))
            except (AccessDenied, ValueError):
                continue
            result.append(str(candidate.relative_to(self.workspace)) + ("/" if candidate.is_dir() else ""))
            if len(result) >= 100:
                break
        return result

    def read_text(self, relative: str) -> str:
        path = self.resolve(relative)
        if not path.is_file() or path.stat().st_size > MAX_READ_BYTES:
            raise AccessDenied("Arquivo inexistente ou grande demais")
        try:
            return path.read_text(encoding="utf-8")
        except UnicodeDecodeError as exc:
            raise AccessDenied("Somente UTF-8") from exc

    def write_text(self, relative: str, content: str) -> str:
        if not self.allow_write:
            raise AccessDenied("Escrita desativada: exija --allow-write em checkout isolado")
        if not isinstance(content, str) or len(content.encode("utf-8")) > MAX_WRITE_BYTES:
            raise AccessDenied("Conteúdo inválido ou grande demais")
        path = self.resolve(relative)
        if path.exists() and path.is_dir():
            raise AccessDenied("Não é possível sobrescrever diretórios")
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content, encoding="utf-8")
        return str(path.relative_to(self.workspace))

    def run_checks(self, check: str) -> dict:
        if not self.allow_tests:
            raise AccessDenied("Execução de testes desativada")
        allowed = {
            "python-unit": ["python", "-m", "unittest", "discover", "-s", "tests", "-v"],
            "python-compile": ["python", "-m", "compileall", "-q", "."],
            "node-lint": ["npm", "run", "lint", "--", "--no-cache"],
            "node-build": ["npm", "run", "build"],
        }
        if check not in allowed:
            raise AccessDenied("Verificação não autorizada")
        clean_env = {k: v for k, v in os.environ.items() if k in ("PATH", "HOME", "LANG", "LC_ALL", "SYSTEMROOT", "WINDIR", "TEMP", "TMP")}
        clean_env["CI"] = "1"
        try:
            result = subprocess.run(allowed[check], cwd=self.workspace, capture_output=True,
                                    text=True, shell=False, timeout=90, check=False, env=clean_env)
        except subprocess.TimeoutExpired:
            return {"check": check, "status": "timeout", "exit_code": None}
        except FileNotFoundError:
            return {"check": check, "status": "unavailable", "exit_code": None}
        return {"check": check, "status": "passed" if result.returncode == 0 else "failed",
                "exit_code": result.returncode, "output_tail": (result.stdout + "\n" + result.stderr)[-2000:]}
