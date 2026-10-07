# VENOM V2 — MOTION SYSTEM 0.1

## Principle

Motion reveals intelligence and hierarchy.
Nothing moves just because it can.

## Motion bands

MICRO
80–220ms
Hover, pointer response, labels, button states.

UI
220–500ms
Panels, menus, captions, focus transitions.

SCENE
600–1400ms
Large type reveal, media entrance, depth transitions.

CINEMATIC
1200–3000ms
Camera travel, serpent emergence, chapter transitions.
Must be interruptible by scroll and never trap the user.

## Easing families

Response:
cubic-bezier(.2,.8,.2,1)

Enter:
cubic-bezier(.16,1,.3,1)

Exit:
cubic-bezier(.7,0,.84,0)

Cinematic:
prefer physically smooth spline/camera interpolation over exaggerated CSS bounce.

No elastic/bouncy motion for primary VENOM language.

## Scroll model

Default:
native document flow + sticky scenes + ScrollTrigger.

Use scroll smoothing only if:
- it measurably improves 3D/DOM synchronization;
- keyboard, anchor links, history and accessibility remain correct.

No aggressive scroll hijacking.

## Serpent motion

The serpent follows a spline, not keyframed screen coordinates.

Inputs:
- normalized scroll progress;
- scene state;
- pointer influence (small);
- time (idle breathing only).

Outputs:
- spline offset;
- roll;
- head orientation;
- material highlight;
- light intensity;
- camera parallax.

The pointer must never fully control the animal.

## Type motion

Families:
- mask reveal;
- line assembly;
- scale/track tightening;
- occlusion behind 3D;
- viewport crop.

Avoid:
- random character scrambling everywhere;
- repeated glitch;
- constant letter-by-letter effects.

## Particles

Particles exist in three modes:
1. ambient dust — extremely sparse;
2. transition debris/data — scene-bound;
3. SNAKE transformation — serpent material dissolves into data.

GPU instancing required for large counts.
Disable/reduce on constrained mobile.

## Cursor

Desktop only.
Cursor can:
- magnetize slightly toward important targets;
- perturb a tiny local particle field;
- expose coordinates/state.

It must not obscure default usability.

## Scene transition grammar

A transition should use one dominant mechanism at a time:
- occlusion;
- camera pass;
- wipe by geometry;
- depth cross;
- luminance dissolve;
- type mask.

Never stack five effects just to look expensive.

## Reduced motion

When prefers-reduced-motion is enabled:
- no camera travel tied to scroll;
- no serpent traversal;
- replace 3D transitions with crossfades/static key art;
- no cursor effects;
- preserve all content and navigation.

## Mobile

Mobile is a separate choreography:
- fewer particles;
- lower-poly or baked serpent;
- shorter scene duration;
- fewer simultaneous layers;
- no hover-dependent meaning;
- thermal budget considered.

## QA targets

No visible layout jumps.
No scroll lock unless user explicitly enters a modal.
No animation required to understand content.
Canvas must never intercept clicks unintentionally.
Background tab pauses animation.
Resize/orientation changes recover gracefully.
