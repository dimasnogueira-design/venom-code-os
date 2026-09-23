# VENOM CODE — Visual Gate QA

- Date: 2026-09-23
- Commit: `b14e2a3b95a6f7c0a85baeb57b0b6179d52014e4`
- Vercel deployment ID: `9wz7d1kEKFQg1zdZTPvSUTv63Ga7`
- Preview: https://venom-code-3xvi3fljb-dimasnogueira-9864.vercel.app/
- Production was not changed.

## Automated checks

- `npm run lint`: PASS
- `npm run build`: PASS
- Vercel deployment: READY
- Browser console errors during responsive pass: none observed

## Responsive visual pass

| Viewport | Result | Horizontal overflow | Notes |
| --- | --- | --- | --- |
| 1440 × 900 | PASS | No | Desktop navigation, six service cards, headings and SNAKE launcher render correctly. |
| 768 × 900 | PASS | No | Mobile menu replaces desktop navigation; two-column service grid remains readable. |
| 390 × 844 | PASS | No | Single-column service grid, headings, menu and SNAKE layout remain within viewport. |

Observed DOM metrics on the preceding Preview build after the visual treatment, which is unchanged by `b14e2a3` except for removal of the unverified header/footer image:

- 1440 viewport: document width 1425, six cards, no overflow.
- 768 viewport: document width 753, six cards, no overflow.
- 390 viewport: document width 375, six cards, no overflow.

## Gate matrix

| Area | Status | Evidence / limitation |
| --- | --- | --- |
| Header and desktop navigation | PASS | Verified in Preview. |
| Mobile menu presentation | PASS | Verified at 768 and 390 widths. |
| Official horizontal logo | BLOCKED | No standalone, verifiable official horizontal logo asset exists in the repository. Safe text wordmark retained. |
| Favicon | PASS | `app/icon.png` is served by Next.js as `/icon.png`. |
| Six service cards | PASS | All six render with lifted exposure, lighter overlay and readable text. |
| Responsive layout | PASS | 1440, 768 and 390 visual checks; no horizontal overflow. |
| SNAKE positioning and entry copy | PASS | Clear “Planejar meu projeto com IA” language and accessible floating button label. |
| SNAKE desktop/mobile dialog | PASS | Dialog, quick prompts, composer and recording control render at desktop and mobile widths. |
| Voice recording workflow | PARTIAL | Browser speech recognition implementation exists, but recording → transcription → review → send was not exercised with a real microphone in this gate. |
| Real SNAKE response | BLOCKED | Preview integration environment was not validated with the required real secrets. Direct unauthenticated API probe is blocked by Vercel deployment protection (HTTP 401). |
| Contact form submission | BLOCKED | Real submission was not exercised against the integration environment; no production write was performed. |

## Visual evidence

The 1440, 768, 390, desktop-SNAKE and mobile-SNAKE screenshots were captured and inspected in the authenticated Codex in-app browser during the gate. The browser integration displayed these captures inline and did not expose stable filesystem paths. No screenshot-file paths are claimed here.

## Release decision

Do not promote to production until the official logo asset is supplied or the safe wordmark is explicitly accepted, and the real contact/SNAKE integrations plus microphone workflow are exercised in the target environment.

## Integration environment audit — 2026-09-23

Read-only inspection of the Vercel project environment configuration found:

| Variable | Current scope |
| --- | --- |
| `SUPABASE_SERVICE_ROLE_KEY` | Production only |
| `OPENAI_API_KEY` | Production only |
| `SUPABASE_URL` | Production and Preview |
| `VENOM_AI_MODE` | Production and Preview |
| `VENOM_AI_MODEL` | Production and Preview |
| `VENOM_AI_HASH_SECRET` | Production and Preview; Vercel flags it as secret-like configuration needing attention |

There is no currently authorized Preview environment capable of exercising real SNAKE responses or writing a real contact lead. The APIs fail closed when the required server secret is unavailable: `/api/venom-ai` returns a service-unavailable state without Supabase unless mock mode is enabled, and `/api/leads` returns configuration unavailable without Supabase.

The public Preview is also protected by Vercel Authentication for unauthenticated API clients; a direct non-writing API probe returned HTTP 401 before reaching the application route. No secret was revealed, created, copied, downloaded or granted to Preview during this audit.

### Updated integration gate

| Area | Status | Reason |
| --- | --- | --- |
| Real SNAKE response | BLOCKED | `OPENAI_API_KEY` and `SUPABASE_SERVICE_ROLE_KEY` are Production-only. |
| Contact form persistence | BLOCKED | `SUPABASE_SERVICE_ROLE_KEY` is Production-only. |
| Voice control presentation | PASS | Recording control and review-before-send copy are implemented and render correctly. |
| Voice end-to-end | PARTIAL | A real microphone permission, spoken input, transcription review and send were not exercised. |
| Production promotion | STOP | Integration gate remains open. |
