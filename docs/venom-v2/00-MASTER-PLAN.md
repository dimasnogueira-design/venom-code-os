# VENOM CODE V2 — MASTER PLAN

Status: FOUNDATION / NO PRODUCTION CHANGES
Branch: design/venom-v2-foundation

## Objective

Rebuild the public VENOM CODE experience as a cinematic, technology-first creative studio website while preserving the VENOM CODE OS, SNAKE, lead flow, Supabase, governance and operational architecture.

The V2 is not a reskin. It is a narrative system built from:
- real-time 3D where it creates meaning;
- editorial typography;
- controlled motion;
- scroll choreography;
- technical UI details;
- a persistent VENOM/SNAKE identity;
- strong mobile fallbacks;
- performance budgets from the start.

## Non-negotiables

1. Never redesign production directly.
2. Preserve /os and API behavior.
3. No copied source code, copyrighted models, images, audio or licensed font files from reference sites.
4. Extract principles, measurements, motion logic, hierarchy and interaction patterns, then re-author them.
5. Every spectacular desktop effect requires a mobile/reduced-motion fallback.
6. Motion must communicate hierarchy or narrative. No decorative WebGL for its own sake.
7. The snake is a narrative character, not a mascot pasted into every section.
8. VENOM must remain technology/authority/precision/sophistication — never gamer aesthetic.
9. Public content must stay readable and indexable without the 3D layer.
10. Build prototypes before integrating effects into the production page.

## Work sequence

### Gate A — Reference intelligence
- reference inventory;
- screenshots/states;
- typography;
- colors;
- layout and grids;
- particles/backgrounds;
- cursor;
- motion timings/easings;
- scroll choreography;
- likely rendering stack;
- mobile behavior;
- performance strategy;
- transferable principle for VENOM.

Deliverable: 01-REFERENCE-MATRIX.md + extractor reports.

### Gate B — Creative direction
Freeze:
- visual thesis;
- palette;
- type hierarchy;
- grid;
- texture;
- icon language;
- copy density;
- chapter structure;
- use of lime;
- lighting/material language;
- rules for SNAKE.

Deliverable: 02-CREATIVE-DIRECTION.md.

### Gate C — Motion system
Freeze:
- scroll model;
- reveal families;
- camera behavior;
- transition grammar;
- pointer behavior;
- particle behavior;
- easing;
- timing bands;
- reduced-motion strategy.

Deliverable: 03-MOTION-SYSTEM.md.

### Gate D — Hero / serpent prototype
Build the snake in isolation before touching the homepage.
Prototype only:
- body/path motion;
- material;
- light;
- camera;
- scroll sync;
- depth with DOM typography;
- 60/30 fps targets;
- mobile/static fallback.

Deliverable: /lab/serpent or isolated prototype branch.

### Gate E — Page storyboard
Storyboard the page as scenes, not sections.

Proposed scene map:
00 Boot / signal
01 Emergence — serpent reveal
02 Manifesto — VENOM thesis
03 Capabilities — six areas
04 Work — chapter stack
05 Systems / AI — SNAKE transformation
06 Process — controlled tunnel / sequence
07 Proof / cases
08 Contact — terminal silence / final strike

### Gate F — Component architecture
Define reusable:
- Scene;
- StickyScene;
- SplitReveal;
- KineticType;
- ChapterStack;
- MediaFrame;
- TechnicalLabel;
- CursorField;
- ParticleField;
- SerpentCanvas;
- SnakeInterface;
- ReducedMotionFallback.

### Gate G — implementation
Only after A–F are approved:
- install 3D/motion dependencies;
- integrate one scene at a time;
- visual QA desktop;
- visual QA iPhone;
- performance QA;
- accessibility QA;
- preview deploy;
- production approval.

## Initial technical direction

Frontend remains Next.js + React + TypeScript.

Expected additions only after prototype approval:
- three
- @react-three/fiber
- @react-three/drei (selectively)
- gsap + ScrollTrigger
- lenis (only if native scroll cannot deliver required choreography)

Renderer strategy:
- Three.js WebGPURenderer where safe;
- WebGL fallback;
- static/video fallback for constrained devices;
- 3D payload lazy/deferred after meaningful first paint.

## Performance budgets

Target experience:
- useful HTML first;
- no 3D blocking LCP;
- compressed textures/models;
- no autoplay audio;
- stable layout before canvas;
- 60fps target desktop;
- graceful 30fps acceptable on constrained mobile;
- stop/pause expensive rendering when tab is hidden;
- prefers-reduced-motion supported;
- static image fallback when capability/thermal budget is poor.

## Definition of ready-to-code

We do not redesign the homepage until:
- reference matrix is approved;
- hero snake concept is approved;
- color/type/grid are frozen;
- page storyboard is frozen;
- motion grammar is frozen;
- prototype proves performance;
- mobile fallback is defined.

This is the anti-rework gate for VENOM V2.
