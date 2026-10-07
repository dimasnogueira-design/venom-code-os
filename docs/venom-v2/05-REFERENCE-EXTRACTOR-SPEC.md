# VENOM VISUAL INTELLIGENCE — REFERENCE EXTRACTOR SPEC

Goal:
Turn a public reference URL into structured design intelligence for human review and VENOM adaptation.

This is analysis software, not a site copier.

## Input

URL + optional label.

Example:
npm run ref:extract -- https://example.com --name example

## Browser capture

Recommended: Playwright / Chromium.

Capture:
- final DOM after JS;
- computed styles for representative nodes;
- linked stylesheet/script metadata;
- font-family declarations;
- CSS variables;
- colors;
- spacing;
- radii;
- shadows;
- viewport breakpoints inferred from stylesheets;
- screenshots at desktop/tablet/mobile;
- screenshots at scroll checkpoints;
- element bounding boxes;
- transitions/animations;
- canvas/WebGL presence;
- known library signatures (GSAP, Three.js, Lenis etc.) only when observable;
- performance/resource summary.

## Motion capture

At fixed scroll checkpoints:
0 / 10 / 25 / 50 / 75 / 90 / 100%

Record for selected elements:
- transform matrix;
- opacity;
- clip-path;
- filter;
- position;
- dimensions.

Compare snapshots to infer motion families.

Optional interaction probes:
- hover selected links/cards;
- open menu;
- pointer move;
- resize.

## Outputs

research/<slug>/
- overview.md
- typography.md
- color.md
- layout.md
- components.md
- motion.md
- rendering.md
- mobile.md
- performance.md
- venom-opportunities.md
- tokens.json
- observations.json
- screenshots/

## Design token extraction

tokens.json may contain:
- colors ranked by usage;
- font families;
- font sizes;
- line heights;
- tracking;
- spacing histogram;
- common widths/heights;
- border radii;
- border colors;
- shadows;
- transition durations;
- easing values.

Never download/repackage font binaries for reuse.

## Rendering detection

Signals:
- canvas elements;
- WebGL/WebGPU context availability;
- loaded script names;
- shader-like source patterns when public client code exposes them;
- Three.js/R3F globals/chunks;
- GSAP/ScrollTrigger signatures.

Report confidence levels:
CONFIRMED / STRONG SIGNAL / POSSIBLE / UNKNOWN.

Do not claim exact implementation from appearance alone.

## LLM analysis step

The model receives:
- screenshots;
- extracted tokens;
- structure;
- motion observations;
- rendering signals.

It produces:
1. what makes the experience distinctive;
2. likely interaction model;
3. transferable principles;
4. what not to copy;
5. VENOM adaptation proposal;
6. cost/complexity;
7. mobile risk;
8. performance risk.

## Legal / creative boundary

Allowed goal:
learn patterns and re-author original VENOM components.

Do not:
- publish copied HTML/CSS/JS as VENOM;
- reuse copyrighted imagery or 3D assets;
- redistribute proprietary font files;
- clone trademarked visual identity;
- bypass authentication/paywalls;
- scrape private surfaces.

## MVP implementation sequence

V0:
manual URL + screenshots + token extraction + markdown report.

V1:
scroll checkpoints + computed style sampling + library detection.

V2:
interaction probes + motion deltas + WebGL diagnostics.

V3:
reference comparison dashboard.

## First reference batch

1. Utsubo
2. Noomo Storytelling
3. Active Theory
4. Lusion WebGL Scroll Sync
5. Argus Labs / Studio Freight
6. CoMinVi
7. Obys
8. Immersive Garden

This batch becomes the evidence base for VENOM V2.
