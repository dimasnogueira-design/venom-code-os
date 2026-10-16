---
name: venom-skill-router
description: Automatically route VENOM CODE tasks to the right installed specialist skills for development, UI, debugging, QA, deployments and customer-facing text.
---

# VENOM Skill Router

Start by classifying the task and reading the applicable `SKILL.md` files under `.agents/skills/`. A skill is reusable guidance; it is not a running daemon. Load only relevant specialties.

| Task signal | Skills |
| --- | --- |
| React, Next.js, TSX performance | `vercel-react-best-practices` |
| UI, accessibility, responsive, visual QA | `web-design-guidelines` |
| Bugs, failed builds, unexpected behavior | `systematic-debugging` + `test-driven-development` |
| Multi-step implementation | `writing-plans` + `test-driven-development` |
| Test customer journey / endpoints | `verification` and `agent-browser` if the executable is available |
| Browser interactions / screenshots | `agent-browser` |
| Review and pre-merge verification | `requesting-code-review` + `verification` |
| Vercel deploy, GitHub Actions, rollback | `deployments-ci-cd` |
| Natural commercial copy, proposals, messages | `humanizer`; always preserve truth and attribution |

## Guardrails
1. User intent, privacy, factual accuracy, contracts and system security outrank stylistic suggestions.
2. Diagnose before fixing; plan before complex change; add tests for code changes; verify before claiming success.
3. No automatic push to production, migrations, payments, customer communication, or merge without explicit approval.
4. Never invent metrics, testimonials, screenshots, QA results or references.
5. Humanizer changes prose, not code, customer records or contract clauses.
6. STAY12 is paused and excluded unless explicitly reactivated.

## Handoff
Report selected skills, changes made, evidence of checks actually run, checks not performed and approvals still required.

## Security and delivery gates (mandatory)

- Before coding or changing UI: use `venom-delivery-gate` to define acceptance criteria and delivery evidence.
- Before review/release: use `code-review-security`; when relevant select `web-security-review`, `api-security-review`, `secrets-scan`, and `sca-audit`.
- Pentest/security audit -> `venom-pentest`: source/config review by default; authorized staging passive scans only with target scope confirmed, active tests require explicitly approved exact scope. No third-party testing or production active fuzzing.
- Security-sensitive changes (access control, auth, session, payments, AI agent, webhooks, API, rate limits, storage) -> focused security review + regression tests. Never expose production keys.
- Before client handoff: `venom-delivery-gate` with mobile, function, code, copy, security and test evidence.
- CodeQL source analysis on PRs is not a penetration test. Human approves merges and releases.
