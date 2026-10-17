import tempfile
from pathlib import Path
import unittest
from ai_engineer.engineer import plan_offline
from ai_engineer.security import Capabilities, AccessDenied

class EngineerTests(unittest.TestCase):
    def test_plan_is_not_execution(self):
        plan = plan_offline("Auditar Gmail e WhatsApp para SNAKE")
        self.assertEqual(plan.status, "PLAN_ONLY_NOT_EXECUTED")
        self.assertEqual(plan.mode, "OFFLINE_PLAN")
        self.assertTrue(any("SNAKE" in s for s in plan.workstreams))

    def test_missing_mission(self):
        with self.assertRaises(ValueError):
            plan_offline(" ")

    def test_read_only_default(self):
        with tempfile.TemporaryDirectory() as directory:
            reader = Capabilities(Path(directory))
            with self.assertRaises(AccessDenied):
                reader.write_text("service.py", "print('ok')")
            writer = Capabilities(Path(directory), allow_write=True)
            self.assertEqual(writer.write_text("service.py", "print('ok')"), "service.py")
            self.assertEqual(reader.read_text("service.py"), "print('ok')")

    def test_path_and_secret_protection(self):
        with tempfile.TemporaryDirectory() as directory:
            cap = Capabilities(Path(directory), allow_write=True)
            for name in ("../outside", "/tmp/outside", ".env", ".env.local",
                         ".git/config", "private/token.txt", "secrets.json",
                         "credentials.json", "a/password.key"):
                with self.subTest(name=name), self.assertRaises(AccessDenied):
                    cap.write_text(name, "secret")

    def test_case_insensitive_sensitive_components(self):
        with tempfile.TemporaryDirectory() as directory:
            cap = Capabilities(Path(directory), allow_write=True)
            for name in (".GIT/config", ".ENV.local", "Private/token.txt",
                         "DATA/notes.txt", "CREDENTIALS/record.txt"):
                with self.subTest(name=name), self.assertRaises(AccessDenied):
                    cap.write_text(name, "secret")

    def test_symlink_outside(self):
        with tempfile.TemporaryDirectory() as directory, tempfile.TemporaryDirectory() as outside:
            Path(directory, "escape").symlink_to(Path(outside), target_is_directory=True)
            cap = Capabilities(Path(directory), allow_write=True)
            with self.assertRaises(AccessDenied):
                cap.write_text("escape/bad.txt", "bad")

    def test_arbitrary_commands_denied(self):
        with tempfile.TemporaryDirectory() as directory:
            with self.assertRaises(AccessDenied):
                Capabilities(Path(directory), allow_tests=True).run_checks("rm -rf /")
            with self.assertRaises(AccessDenied):
                Capabilities(Path(directory)).run_checks("python-unit")

    def test_private_dirs_not_listed(self):
        with tempfile.TemporaryDirectory() as directory:
            Path(directory, ".git").mkdir()
            Path(directory, "src").mkdir()
            filenames = Capabilities(Path(directory)).list_files()
            self.assertIn("src/", filenames)
            self.assertNotIn(".git/", filenames)

if __name__ == "__main__":
    unittest.main()
