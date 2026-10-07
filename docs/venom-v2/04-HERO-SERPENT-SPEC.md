# VENOM V2 — HERO / SERPENT CONCEPT 0.1

Working concept: THE EMERGENCE

## Narrative

Do not show the snake immediately.

### Beat 0 — darkness
Near-black field.
Very subtle environmental noise/particles.
VENOM wordmark is present or assembles with restraint.

### Beat 1 — false surface
A giant reflective surface moves behind the typography.
At first it is unreadable as an animal.

### Beat 2 — recognition
Scroll/camera reveals curved scale geometry.
User realizes the “surface” is a serpent body.

### Beat 3 — crossing
The body crosses the depth plane:
some letters are in front, some behind.
This proves real-time spatial integration rather than a background video.

### Beat 4 — disappearance
The body leaves frame.
Do not show the head yet.

### Beat 5 — return
Later in the site, body reappears between chapters.

### Beat 6 — intelligence transformation
At SNAKE section, physical material loses cohesion:
scales → fragments → particles/data → SNAKE interface.

### Beat 7 — final strike
Near final scene the head appears once.
Controlled, still, intelligent.
No attack animation.
A slight eye/head response can acknowledge pointer or CTA focus.

## Why this instead of a full snake hero

A full animal immediately spends the strongest visual asset.
Fragments create anticipation and let the identity recur throughout the site.

## Geometry options

Prototype A — procedural tube
- CatmullRomCurve3;
- TubeGeometry or custom ribbon/tube;
- shader/normal mapping;
- easiest to art-direct through scroll;
- light payload.

Prototype B — rigged GLB snake
- Blender model + armature;
- higher realism;
- larger payload;
- more complex animation blending.

Prototype C — hybrid
- procedural body for long traversal;
- authored GLB head for close-up final beat.

Recommended: C.

## Rendering

React Three Fiber over Three.js for scene integration.
Evaluate WebGPURenderer; maintain WebGL fallback.
Canvas can be fixed behind DOM for multi-scene continuity.

## Lighting

Very dark environment.
Primary form comes from:
- moving rim light;
- thin lime grazing highlight;
- cold neutral key;
- occasional reflected UI light.

Do not front-light the whole animal.

## Camera

Camera motion must be slow and heavy.
No game-camera orbit.
No constant pointer chase.

Possible hero path:
close macro → lateral reveal → gentle pullback → serpent exits depth.

## DOM integration

Typography remains HTML.
Canvas supplies serpent/depth.
Use explicit scene anchors and measured element bounds to coordinate occlusion.

True 3D text is not required for most copy.

## Prototype acceptance criteria

Desktop:
- serpent silhouette reads instantly after reveal;
- motion remains smooth during continuous scroll;
- no visible texture pop;
- DOM/canvas sync stays aligned;
- first paint not blocked by 3D.

Mobile:
- meaningful hero before 3D loads;
- fallback still feels premium;
- no overheating or prolonged frame collapse.

Accessibility:
- content complete without canvas;
- reduced motion gets static/key-art representation;
- no interaction depends on serpent movement.

## First prototype scope

Only build:
- one dark viewport;
- VENOM typography;
- one serpent body segment;
- one spline;
- one camera;
- one rim light;
- scroll progress 0→1;
- DOM occlusion simulation;
- FPS/debug overlay in dev only.

Do not build the full homepage until this prototype passes.
