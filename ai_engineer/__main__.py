"""Run with python -m ai_engineer --mission '...' [--live]."""
import argparse
import json
import os
from dataclasses import asdict
from pathlib import Path
from .engineer import plan_offline, run_live
from .security import Capabilities

def main() -> int:
    parser = argparse.ArgumentParser(description="VENOM AI ENGINEER")
    parser.add_argument("--mission", required=True)
    parser.add_argument("--workspace", default=".")
    parser.add_argument("--live", action="store_true", help="API real, pode consumir créditos")
    parser.add_argument("--allow-write", action="store_true")
    parser.add_argument("--allow-tests", action="store_true")
    parser.add_argument("--model", default=os.getenv("VENOM_ENGINEER_MODEL"))
    args = parser.parse_args()
    if (args.allow_write or args.allow_tests) and not args.live:
        parser.error("--allow-write e --allow-tests exigem --live e workspace isolado")
    capabilities = Capabilities(Path(args.workspace), args.allow_write, args.allow_tests)
    try:
        output = run_live(args.mission, capabilities, args.model) if args.live else asdict(plan_offline(args.mission))
    except (ValueError, RuntimeError) as exc:
        parser.exit(2, "ERRO: " + str(exc) + "\n")
    print(json.dumps(output, ensure_ascii=False, indent=2))
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
