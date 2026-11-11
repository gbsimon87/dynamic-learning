# Ocean Explorer — animal materials and swimming

Date: 2026-11-11. Scope: all twelve existing species and their 85 placed
instances on `/skills/ocean-explorer`.

## Implemented

Applied the material, anatomical, procedural-motion and performance parts of
the owner's reference prompt directly to the existing Three.js models. No new
animal assets, dependencies, routes, discovery facts or saved state.

`oceanModelDetail.js` keeps the existing projected caustics and adds subtle
procedural micro-normal relief, footprint-filtered detail and a faint Fresnel
rim. Thin fins and jelly tissue use a directional-sun backlighting approximation
in the standard material pass. This is approximate thin-tissue scattering,
not a full subsurface or transmission simulation. Smooth mammals and adult
swordfish no longer inherit the generic fish-scale shader. Shark denticles,
ray spots, seahorse/turtle skin ridges and octopus mottling have separate
patterns. Clownfish have three pale bands. The surface-gradient implementation
was checked against the installed Three.js r181 shader chunks; hooks remain
version-dependent.

`oceanAnimalMotion.js` precomputes two relative morph targets per flexible
mesh. Sine/cosine weights generate a travelling wave without rewriting vertex
buffers each frame. Matching normal morphs keep the surface lighting moving;
Three.js picking uses the same morphed vertex positions. Bounds include signed
morph extrema. The body wave carries tail roots and attached fins along the
same displacement and tangent, without accumulating transforms.

| Species | Visible changes |
| --- | --- |
| Parrotfish | Flexible body/tail, moving pectoral fins and scale relief |
| Clownfish | Three bands, independently phased body/tail waves and pectoral strokes in each school |
| Green sea turtle | Tapered front flippers with tip flex and coordinated rear flippers; skin ridges |
| Spotted eagle ray | Procedural white spots and flexible pointed wings; upper/lower layers share the wave |
| Seahorse | Bony-looking surface bands, subtle curled-tail flex and rapid dorsal-fin flutter |
| Reef shark | Denticle relief, discreet closed mouth and continuous lateral body/tail motion |
| Giant Pacific octopus | Mottled skin and curling arms; both rows of suckers bend with each arm |
| Humpback whale | Smooth skin, paired blowhole recesses, tapered long pectoral flippers and slow vertical body/fluke motion |
| Swordfish | Smooth adult skin, gill-cover lines and quicker lateral swimming |
| Bottlenose dolphin | Smooth skin and vertical body/fluke motion carrying its fins |
| Porcupinefish | Finer, shorter spines, skin relief and existing fin-driven hover; no repeated defensive inflation |
| Moon jelly | Asymmetric bell pulse, delayed tentacle/oral-arm waves and tentacle roots following the bell radius |

Each placed animal gets a deterministic animation phase. Small hover motions
live below its discovery anchor, preserving exact loop positions for the tour
and orbit pilot. All movement continues to use the existing water clock:
pause, reduced motion and hidden-tab behaviour hold it still.

`oceanWater.js` now projects caustics from the final morphed position and normal,
attenuating shimmer on downward-facing surfaces rather than lighting bellies
as brightly as backs.

## Rendering budget

- Continuous bodies use 32 longitudinal by 20 radial subdivisions; small eyes
  and other fine features use a lighter sphere. Each flexible mesh needs two
  position/normal morphs and zero bones.
- Static anatomy is batched by material inside each articulation pivot.
  Animated fins, morph meshes and transparent jelly layers retain their own
  transforms. Octopus suckers are batched per arm so they can share its flex.
- Matching body, arm, wing and tentacle morph geometry shares immutable CPU/GPU
  buffers across matching instances. Meshes retain independent animation
  weights and materials. This also avoids rebuilding the same normal morphs
  when another animal or a second scene is constructed. The scene's existing
  geometry set releases shared geometry once on disposal.
- Full-detail models use approximately 2,500–12,600 triangles each, including
  the three-fish clownfish school. At most 22 mesh draws per target before any
  scene-wide rendering work. These are geometry counts, not measured frame
  rates or a claim of mobile performance.
- Fine anatomy hides at 26 scene units; appendage animation updates at most
  15 times per second beyond 32, while the travel position updates normally.
  Detail/animation restores immediately on approach. Existing visibility
  culling beyond 85 units from each loop centre remains in place.
- Procedural relief, colour and roughness share the standard material; no
  extra per-animal image maps, material texture fetches, lights, rendering passes or
  download requests. Jellyfish retain their existing transparent materials
  and use a single forward pass per layer.

Three.js stores morph position/normal data in its own GPU data textures; these
are part of the morph mechanism, not downloaded image textures.

The anatomy-hotspot interaction and camera-tracking eyes from the generic
prompt were not part of this visual pass. Existing whole-animal discoveries,
cards and child-friendly interaction remain the educational path.

## Verification

- Twenty-one focused Node checks pass: nine new realism/geometry/material checks
  plus existing species, distribution, loop and reef checks. New checks cover
  travelling-wave maths, moving-surface picking, bounds, fin attachment,
  model budgets, ray underside synchronisation, detail restoration, material
  shader composition, independently animated shared buffers, independent phases
  and pause/resume.
- Full `npm run lint` passes. Production build passes and prerenders 70 public
  pages. Existing City Spotlight import-attribute and large-chunk notices remain.
- Full `npm test` stops in the Node stage: 2,862 pass, four skip, eight fail.
  Five server/security/SEO failures cannot bind `127.0.0.1` in this sandbox;
  the other three are the pre-existing Year 6 English lesson lint, story-count
  and story-length assertions. None touches Ocean code. A separate affected
  component run covers scene and page behaviour.
- A full affected component run (58 scene + 16 page checks) initially reports
  70 passes and four failures: two existing assertions about porthole first-hit
  geometry and starting-camera clearance, plus two five-second timeouts in
  tests constructing the ocean twice. Geometry/morph sharing then removes
  those timeouts: a final targeted run passes all nine disposal, animal,
  camera and pause checks without changing timeouts. All 16 page checks passed
  in the full affected run. The obsolete hard-coded two-instanced-mesh disposal
  assertion now checks the actual scene's instance count and idempotent cleanup.
- The full Node run preceded the geometry-sharing optimisation and its extra
  independent-animation test; final affected Node, component, lint and build
  checks were rerun afterward. The entire component suite was not rerun.
- Browser tools are unavailable in this session. Actual WebGL shader
  compilation, appearance in both themes and camera views, transparency,
  visual anatomy, touch layout and physical-device frame rates remain
  unverified. Shader-composition tests do not replace a real GPU check.

The repository already contained the immersive Ocean and detailed cockpit
work at the start of this task; it is retained. No commit or deployment.
