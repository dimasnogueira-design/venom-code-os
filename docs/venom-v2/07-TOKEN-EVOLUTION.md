# VENOM V2 — TOKEN EVOLUTION 0.1

The existing Core tokens are preserved as the compatibility layer.
V2 should evolve them rather than create a second unrelated token universe.

## Existing base retained

Venom signal: #B8FF19
Ink: #050606
Surface 1: #0B0D0C
Text: #F1F4EF
Muted: #979D99

These values remain valid until visual testing proves a change is necessary.

## Proposed V2 semantic additions

### Surfaces

--v2-void: #020303
--v2-ink: #050606
--v2-graphite: #0b0d0c
--v2-elevated: #111411

Use several dark values so depth comes from luminance, not gradients everywhere.

### Signal

--v2-signal: existing --color-venom
--v2-signal-deep: existing --color-venom-deep

Rule:
signal color should occupy a small percentage of the viewport in most scenes.

### Metallic neutrals

Do not freeze exact values until serpent shader prototype.
Need:
- cold rim;
- neutral specular;
- dark reflective base.

## Type scale

Existing display scale is already useful:
--text-display clamp(4rem, 9vw, 9rem)

V2 may require one oversized editorial token beyond this for controlled viewport-breaking words.

Proposed:
--text-mega: clamp(5rem, 14vw, 14rem)

Do not apply globally. Scene-specific use only.

## Grid

Keep:
12 columns desktop
4 columns conceptual mobile
1180px base content width

Evaluate wider cinematic shell:
1440–1600px max for media/3D alignment while body copy retains narrower measure.

## Spacing

Existing spacing system is sound.
Add scene rhythm rather than arbitrary new spacing:
- quiet scene: 140–220px vertical rhythm desktop;
- dense technical scene: 80–140px;
- mobile: 72–120px.

## Radius

V2 direction:
fewer rounded cards.
Most cinematic/editorial surfaces use square or 4px geometry.
Rounded elements reserved for controls/dialogs where functional.

## Borders

1px low-alpha neutral.
Lime borders only for active/focus/system status.

## Shadows

Use fewer conventional box shadows.
Depth should primarily come from:
- actual 3D;
- luminance;
- occlusion;
- blur;
- atmospheric falloff.

## Motion token migration

Existing Core:
instant 100
fast 200
standard 300
reveal 600
cinematic 900

V2 extends, does not replace:
--motion-scene: 1200ms
--motion-long: 1800ms

Long timings are guidelines for authored sequences, not forced CSS durations.

## Approval gate

Do not change app/venom-core.css yet.
First validate palette and typography in:
1. hero keyframe;
2. capability scene;
3. case scene;
4. SNAKE scene;
5. mobile keyframe.

Only then migrate approved tokens into Core.
