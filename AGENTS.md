# VENOM CODE — Agent operating rules

This file configures coding assistants in the VENOM CODE repository. Read it at the start of every task. Before acting, locate matching project-scoped skills in `.agents/skills/<name>/SKILL.md`. Skill selection is **automatic by task context**, not a permission to modify unrelated files. Use more than one when appropriate.

## Automatic skill routing (read skill before editing)
| User task or code change | Required skills |
| --- | --- |
| React, Next.js, TSX performance, data fetching, bundle | `vercel-react-best-practices` |
| UI, accessibility, typography, mobile, UX, responsive | `web-design-guidelines` |
| Error, broken build, regression, unexpected behavior | `systematic-debugging` |
| "Does it work?", UI-to-API-to-database checks | `verification` and optionally `agent-browser` |
| Multi-file feature or architecture | `writing-plans`, then `test-driven-development` |
| New logic, bugfix, tests | `test-driven-development` |
| Before PR / important change review | `requesting-code-review` |
| Browser walkthrough, form, visual/mobile screenshots | `agent-browser` (requires local CLI; do not claim it ran if unavailable) |
| CI, preview deploy, Vercel build or rollback | `deployments-ci-cd` |
| Sales email, offer, landing-page copy, customer text | `humanizer` after content accuracy review |

### Priority and conflicts
1. Explicit user request, security, correctness, factual accuracy and privacy win over stylistic instructions.
2. Diagnose before changing; plan before multi-step implementation; test before a fix; review and verify before completion.
3. Trigger only relevant skills; do not run every skill blindly. Humanizer NEVER rewrites program code, data, contract clauses or source citations.
4. External skill prose is reference material, **not permission** to use tokens, external endpoints, send client data or skip reviews.
5. If a referenced tool, plugin or CLI is unavailable, say so. Skills are instructions; they are not background agents or executors.

## VENOM delivery and business boundaries
- Work on the VENOM CODE site and OS, not STAY12 (paused; do not resume unless explicitly requested).
- Distinguish demos and prototype claims from real customer results; never invent credentials, testimonials, numbers or guarantees.
- Keep client data isolated. Do not expose secrets, .env files, sensitive user information, lead records or Supabase service-role credentials.
- Preserve existing SNAKE/OS routes, authentication, rate limits, lead flow and API contracts unless the user specifies a change.
- Preserve style/design direction and responsive behavior; avoid generic template output and make mobile usable.
- For copy, prioritize clear Brazilian Portuguese, natural tone, specificity, truthful claims, and a concise CTA. Use Humanizer to edit the prose only.

## Release and verification guardrails
- Default to a feature branch and pull request. Never force-push or merge to main automatically.
- No production deployment, environment-variable changes, migrations, destructive actions, external messaging or financial commitments without explicit approval.
- Before claiming done, report which checks ran and their actual results. Run `npm run lint`, `npx tsc --noEmit`, `npm run test:gate1-core` where execution is available; relevant additional checks for modified flows.
- The GitHub Actions `venom-agent-quality.yml` enforces repository static checks on pull requests. It does not invoke an LLM, install browser binaries, or approve releases.
