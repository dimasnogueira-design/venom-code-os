# VENOM CODE — GitHub Copilot routing

Read and obey `AGENTS.md` in the repository root for task classification, approval boundaries and delivery rules.

Project skills are installed in `.agents/skills/<skill-name>/SKILL.md`. Load the best matching skill **automatically** for each change. Use multiple skills only when their scopes overlap meaningfully.

Routing shorthand:
- React/Next.js -> `vercel-react-best-practices`
- UI/accessibility/mobile -> `web-design-guidelines`
- Bug/error -> `systematic-debugging`
- End-to-end check -> `verification` (+ `agent-browser` when a browser CLI exists)
- Large feature -> `writing-plans` + `test-driven-development`
- PR review -> `requesting-code-review`
- Vercel/deploy/CI -> `deployments-ci-cd`
- Marketing, sales and user-facing prose -> `humanizer`

Do not infer production deployment permission from a skill. Use feature branches, tests, PR reviews and explicit approvals.
