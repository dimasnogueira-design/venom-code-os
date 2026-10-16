# VENOM CODE — Project Skill Pack

Project-scoped Agent Skills (each has YAML frontmatter and `SKILL.md`):
- `vercel-react-best-practices` — Next.js / React quality and performance
- `web-design-guidelines` — accessibility, UX and interface review
- `systematic-debugging` — root-cause-first debugging
- `verification` — full user-story QA
- `writing-plans` — implementation plans
- `test-driven-development` — tests before features/fixes
- `requesting-code-review` — code review before merging
- `agent-browser` — interactive browser exploration; CLI must be installed separately
- `deployments-ci-cd` — safe Vercel/GitHub release operations
- `humanizer` — final pass on factual customer-facing prose

Automatic routing instructions: `AGENTS.md` and `.github/copilot-instructions.md`.
Static CI checks: `.github/workflows/venom-agent-quality.yml`.

A **skill is an instruction pack**. It is loaded by a compatible agent when relevant; it does not run by itself. PR checks run in GitHub Actions without an AI model. ChatGPT skills and plugins installed in a conversation are separate from repository-scoped skills.

Browser skill: for agent browser CLI usage on a developer workstation, follow https://github.com/vercel-labs/agent-browser and install the CLI explicitly. The skill alone does not supply Chrome or execute screenshots.

Source credits and licensing: see `THIRD_PARTY_NOTICES.md`.

## Security & delivery extension — 2026-10-16

**Updated pack: 18 skills total**, counting the original 11 skills plus:
- `venom-pentest`: non-destructive security assessment orchestrator with strict scope and authorization
- `venom-delivery-gate`: Definition of Ready / Done, QA evidence, responsive and regression review
- `web-security-review`, `api-security-review`, `code-review-security`: OWASP-based audit procedures (full plays included)
- `secrets-scan`, `sca-audit`: credential and dependency security guidance

Routing is defined in `AGENTS.md` and `venom-skill-router/SKILL.md`. Source attribution in `SECURITY_SOURCES.md`.
CodeQL static analysis runs on public repository PRs **where installed**; the private RebelShop repository is excluded. Static analysis is not penetration testing, and no live tests run without explicit authorization.
