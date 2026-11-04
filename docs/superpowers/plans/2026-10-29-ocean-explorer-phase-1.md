# Ocean Explorer — Phase 1 build plan

Date: 2026-10-29  
Status: Phase 1 implemented and verified on 2026-10-29.  
Design: [Ocean Explorer](../specs/2026-10-29-ocean-explorer-design.md)  
Scope: one stationary submarine in a simple ocean, with viewing controls.

## Result

At `/skills/ocean-explorer`, a visitor sees a simple 3D submarine suspended
above a sandy seabed in blue, hazy water. Dragging changes the viewing angle;
pinch/scroll changes the distance within limits. Keyboard equivalents and
Reset view work. The page is reachable from Skills Mode without an account
and has the existing Back to Skills link.

Stop at that result. Steering, animals, reefs, lessons, cards, narration,
tours, maps, cockpit, travel between areas and decorative animation belong
to later phases. No external assets, dependencies or stored state are needed.

## Repository decisions

- Follow `.claude/skills/add-skill-game/SKILL.md` for registration, themes and
  checks. Its flat game-route example is stale: current `src/main.jsx` and
  `shared/skillsCatalog.js` use `/skills/<name>`. Use `/skills/ocean-explorer`;
  the public guide is `/learn/ocean-explorer`. No legacy flat redirect is needed.
- Nest the lazy game route under the existing `SkillGameLayout`, outside
  `RequireChild`. Reuse its back bar. Keep the normal navbar; do not apply
  Solar System's special navbar-hiding layout to this prototype.
- Use React, plain CSS and the existing Three.js/OrbitControls dependencies.
  Build an independent scene; do not modify Solar System.
- Keep the model, scene lifecycle and HTML page separate. No generic ocean
  engine, habitat registry, quality framework or future-mode scaffolding.
- Keep all rendering static between view changes. No continuous animation
  loop, camera damping, autorotation, propeller animation or bubbles in Phase 1.

## File changes

| Action | File | Responsibility |
|---|---|---|
| Create | `src/pages/skills/geography/OceanExplorer.jsx` | Title, preview label, viewing instructions, canvas, Reset view, loading/unavailable UI |
| Create | `src/pages/skills/geography/OceanExplorer.css` | Scoped responsive layout and interface themes |
| Create | `src/pages/skills/geography/oceanSubmarine.js` | Original submarine built as a movable Three.js group |
| Create | `src/pages/skills/geography/oceanScene.js` | Water/seabed, renderer, camera, viewing controls, resize and cleanup |
| Create | `tests/components/oceanExplorer.test.jsx` | Page states, reset, keyboard delegation, cleanup and navigation |
| Create | `tests/components/oceanScene.test.jsx` | Scene lifecycle and view limits, with renderer/controls mocked where needed |
| Modify | `src/main.jsx` | Lazy `/skills/ocean-explorer` route |
| Modify | `shared/skillsCatalog.js` | Geography preview entry |
| Modify | `shared/skillGuides.js` | Honest instructions and description for the preview |
| Modify | `src/seo/SkillGuide.jsx` | Show a preview badge for this entry instead of Choose your level |
| Modify | `tests/components/seo.test.jsx` | Cover the preview badge and existing catalogue/guide integration |
| Modify if needed | `src/App.css` | Only new paired tokens that cannot use the existing palette |
| Update at completion | `docs/PROJECT_KNOWLEDGE.md`, `docs/PROJECT_IDEAS.md`, this plan | Record actual delivery and remaining phases |

## 1. Build the submarine

- [x] Create `createOceanSubmarine()` in `oceanSubmarine.js`, returning a
  `THREE.Group` with a rounded hull, nose window, small fins and a propeller.
  Use low-detail primitives and a small set of shared materials.
- [x] Keep the model centred around its local origin, with its forward axis
  along negative Z. Position it above the seabed in the scene, not inside the
  model builder, so later steering can move the whole group.
- [x] Use a bright hull, dark window and contrasting trim, with simple opaque
  materials. No model downloads, textures, interior, glass refraction or shaders.
  Draw the palette from existing paired theme tokens; add pairs only if needed.

**Done when:** the builder supplies one independently movable group. Visual
recognisability will be checked with the complete scene in the final browser pass.

## 2. Create the ocean scene and viewing behaviour

- [x] Implement `createOceanScene({ canvas, container, onReady, onUnavailable })`.
  Return a small API: `resetView()`, `handleViewKey(event)` and `dispose()`.
  `handleViewKey` reports whether it handled the event so the page prevents
  default browser behaviour only for supported view keys.
- [x] Create a perspective camera, blue background and matching distance fog,
  one simple seabed plane, soft ambient/directional lighting and the submarine.
  Avoid shadows, postprocessing, surface-water simulation and scenery assets.
  The seabed must extend beyond the visible area at maximum zoom.
- [x] Put the submarine a few units above the seabed and target its centre.
  Start behind and above it. Keep positions, zoom bounds and view increments
  in named constants inside this module; tune them during visual verification.
- [x] Use OrbitControls for drag and pinch/scroll. Disable panning, damping
  and autorotation. Bound distance to keep the whole craft visible and set
  the maximum polar angle to a horizontal view or higher, keeping the camera
  above the seabed. Do not let controls move the target away from the craft.
- [x] Add keyboard equivalents on the focused scene: arrows change viewing
  angles, +/− change viewing distance, and Home resets. Apply the same angle
  and distance limits as pointer controls. Do not use OrbitControls' default
  keyboard panning for these keys. No document-wide key handlers.
- [x] Render once initially and again on view changes, reset, resize and
  return to a visible tab. With no damping or animation, no idle frame loop
  is necessary. Avoid rendering while the page is hidden.
- [x] Use ResizeObserver on the actual container, guard zero dimensions,
  update camera aspect and cap device pixel ratio at 1.5 for the prototype.
  Read scene colours from CSS tokens. Refresh them and redraw if the app theme
  changes without resetting the current viewing angle.
- [x] Call `onReady` only after a successful first render. If renderer setup
  fails or the WebGL context is lost, show the unavailable state and release
  scene resources. Use one simple fallback, without automatic retry machinery.
- [x] Make cleanup safe for partial setup and repeated disposal: disconnect
  observers, remove listeners, dispose controls, unique geometries/materials
  and renderer, and prevent callbacks after disposal. Confirm StrictMode's
  setup → cleanup → setup works without duplicate handlers.

**Tests:** exercise reset, shared pointer/keyboard limits, resize from a
zero-sized container, hidden-tab behaviour, initialization/context-loss
failure and cleanup. Mock the GPU renderer and input adapter only as needed;
retain real Three.js camera maths for bounds assertions. Do not claim these
tests prove rendered appearance or real drag/pinch behaviour.

## 3. Add the page and minimal interface

- [x] Create `OceanExplorer.jsx` with an Ocean Explorer heading, visible
  **Prototype preview** label, short instructions, a focusable labelled canvas
  and **Reset view** button. Reuse the shared Back to Skills bar through routing.
- [x] Explain the available controls: drag to look around, pinch/scroll to zoom,
  arrows and +/− when the scene is focused, Home or Reset view to reset.
  Make clear that the submarine stays in place. Do not add steering buttons.
- [x] Create the scene in an effect, keep its API in a ref and dispose it on
  cleanup. Delegate view keys only from the focused canvas; preserve Tab and
  normal interaction with HTML controls. Do not label the canvas a button or
  promise a fully nonvisual 3D experience.
- [x] Show a short loading status until ready. If unavailable, show “The 3D
  ocean preview is unavailable on this device” and retain navigation back.
  Hide or disable Reset view until a scene is ready. Keep text outside WebGL.
- [x] Scope every style under `.ocean-explorer`. Use paired app colours,
  visible keyboard focus and controls at least 48 CSS pixels high. No CSS
  transition or ambient motion is needed, including with reduced motion.
- [x] Use a normal page header above a bounded responsive scene container.
  Avoid full-screen shell changes and hard-coded navbar/back-bar deductions.
  Keep the canvas within the viewport width, leave controls visible and allow
  ordinary vertical page scrolling on short screens. Size the renderer from
  the container rather than the window.

**Tests:** mock the scene factory to verify loading → ready, reset, view-key
delegation, unavailable state, unmount cleanup and remount under StrictMode.
No correct/wrong-answer or mode-switch test is relevant to this phase.

## 4. Register the preview and public guide

- [x] Add the lazy route under `SkillGameLayout` in `src/main.jsx`.
- [x] Add a Geography catalogue entry with `to: '/skills/ocean-explorer'`,
  `label: 'Ocean Explorer (preview)'`, an ocean icon and `preview: true`.
  Do not add it to Featured in this phase.
- [x] Add the `ocean-explorer` content entry in `shared/skillGuides.js`.
  Describe looking around a stationary submarine in a simple 3D ocean. Give
  the actual viewing instructions. Practice items can describe changing a
  viewpoint and inspecting a 3D model. Do not promise steering, levels,
  animal facts, tours or curriculum coverage.
- [x] The guide builder already spreads catalogue fields into each guide.
  In `SkillGuide.jsx`, use `guide.preview` to replace the existing **Choose
  your level** badge with **Prototype preview** for this entry. Preserve all
  existing guide behaviour. Add a focused assertion in `seo.test.jsx`.
- [x] Cover Skills → preview → Back to Skills in a routed component test,
  with only the scene mocked. Reuse the actual Skills page, game layout and
  catalogue entry. The final browser pass must exercise the real lazy route
  in `main.jsx`, since a test router alone does not prove its registration.
- [x] Let the existing catalogue-driven metadata, prerender and sitemap
  pipeline generate `/learn/ocean-explorer`. Do not hand-edit built output.

**Done when:** both the preview link and its About link resolve, and the public
guide describes the available prototype accurately without a levels badge.

## 5. Verify the complete prototype

- [x] Run focused tests during implementation:

  ```sh
  npm run test:components -- tests/components/oceanExplorer.test.jsx tests/components/oceanScene.test.jsx tests/components/seo.test.jsx
  ```

- [x] Run `npm run lint`, `npm test`, `npm run build`, then `npm run check:seo`.
  The build must finish prerendering the new public guide. The SEO check needs
  local Chrome and localhost access; handle sandbox restrictions through the
  available permission mechanism, without changing app behaviour to bypass them.
- [x] After tests/build, make one batched scene browser pass covering 390×844,
  844×390, 768×1024 and 1280×900 in both themes. Exercise entry through Skills,
  the real lazy route, drag, zoom bounds, keyboard view controls, reset, theme
  switching, resize, navigation away/back and the unavailable state. Include a
  reduced-motion case and touch-emulated drag/pinch when supported. Capture
  screenshots of the craft/framing and inspect them.
- [x] Check there is no blank canvas, model clipping, camera below the
  seabed, visible plane edge, horizontal overflow, hidden reset/back control,
  lost keyboard focus or duplicate canvas after remount. Confirm the idle
  scene does not continually render.
- [x] Fix findings and use at most one further batched browser pass. Do not
  manually repeat the public-guide checks already covered by `check:seo`.
  If browser tooling is unavailable, complete other checks and report the
  missing visual verification. Report emulated touch separately from actual
  phone/tablet checks; do not claim physical-device results without testing.

## 6. Record delivery and stop at Phase 1

- [x] Update `PROJECT_KNOWLEDGE.md` with the actual route, files, delivered
  viewing behaviour and validation results. Do not describe steering as built.
- [x] Update idea #44 in `PROJECT_IDEAS.md`: record the delivered prototype,
  remove Phase 1 from the remaining work and retain the unfinished later phases.
- [x] Mark completed tasks here and report any outstanding checks. Keep
  implementation-plan status separate from game-delivery status.
- [x] Deliver a short report with the working local URL and checks. End the
  implementation at this milestone; later phases get separate plans.

## Phase 1 completion criteria

- The real Skills link opens a recognisable, stationary submarine in a simple
  ocean scene without an account.
- Pointer/touch and keyboard viewing controls work within safe limits, and
  Reset view restores the initial composition.
- Page layout, focus and navigation work in both themes and tested viewports.
- Loading/unavailable states and navigate-away/remount behaviour work cleanly.
- The listing and public guide accurately identify the prototype's scope.
- Required checks and visual verification have explicit results, with no
  unreported failure or unsupported claim.
- No steering, animals, lessons, tours, area travel or persistence is introduced.


## Verification results — 2026-10-29

- `npm run lint`, `npm test`, `npm run build` and `npm run check:seo` pass.
- Unit tests: 2,473 passes and four database-dependent skips. Component tests:
  630 passes, including scene lifecycle/view limits and routed preview behaviour.
- The production build prerenders 51 public pages, including the preview guide.
  `scripts/checkSeo.js` now uses `SKILL_GUIDES.length` instead of a fixed count.
- Chrome checked 390×844, 844×390, 768×1024 and 1280×900 in both themes, covering
  real lazy-route entry, keyboard, drag, emulated pinch, zoom, reset, theme,
  resize and remount. Scene-interior pixel comparison confirmed reset without
  mistaking fractional border rasterisation for camera movement.
- Reduced motion, no idle render loop, unavailable WebGL and actual WebGL
  context-loss fallback passed. Screenshots were inspected. The scene uses
  ordinary vertical scrolling on short landscape screens.
- Browser checks used local Chrome with software WebGL. Physical phone/tablet
  performance and touch, and screen-reader interaction, remain unverified.
- Phase 1 adds no saved state, assets, dependencies or later-phase features.

## Water appearance follow-up — 2026-10-29

After the original Phase 1 delivery, the owner requested improving the water
using the supplied Water/WaterMesh references. This supersedes the original
static-water/no-surface restriction for the visual treatment only; steering
and other gameplay phases remain future work.

`oceanWater.js` uses WebGL Water for a downward-facing reflective surface,
procedural ripple/caustic textures and themed water/seabed colours. The viewing
camera stays under the surface. Water motion is capped at 30 frames/second,
can be paused, honours reduced motion and stops on hidden tabs or disposal.
The original geometry, materials, generated textures and reflection target
are all released on teardown. No external asset, new dependency or renderer
migration was added.

Follow-up verification: lint, full tests (2,473 unit passes, four database
skips; 633 component passes), build and SEO check pass. The browser batch
passed at the same four viewports in both themes, including motion/pause,
live reduced-motion changes, reset, drag/pinch, zoom, remount and WebGL failure.
Water screenshots were inspected. Physical-device performance/touch and
screen-reader verification remain outstanding.


## Environment detail follow-up — 2026-10-29

The owner’s screenshot review requested more natural detail. The visual scope
now includes shallow textured sand terrain, instanced rocks and small seagrass
patches, depth shading, faint sunlight shafts, soft shadows and sparse drifting
particles. Water retains the WebGL Water addon; WaterMesh still requires a
renderer migration and is not used. Original jittered-cell textures replace
the repeating sine-net caustics, with two world-projected light layers shared
by the terrain and rocks. Transmitted daylight and finer normal-map detail
soften the overhead surface. ACES tone mapping balances the scene.

The stationary craft and existing viewing controls remain the prototype’s
interaction. Pause/Resume water and reduced motion also freeze the particles;
static terrain and plants introduce no animal, lesson or discovery phase.
Geometry is shared/instanced where practical, shadows are cached for the static
scene, DPR and frame caps remain, and all additional GPU resources are released.

Verification for this detail pass: lint, full tests (2,473 unit passes, four
database-dependent skips; 634 component passes), focused cleanup/motion tests
and production build pass. The owner requested no visual checks and will
supply a screenshot. No browser checks, including the browser-based SEO check,
were repeated for this pass.


Screenshot review corrections — 2026-10-29: remove the unfogged background
dome that revealed the distant floor/surface edges as a horizontal band, and
let those planes blend into the shared fog/background colour. Use seamless
multi-scale noise for water normals instead of parallel sine waves, smooth
the rock normals across shared vertices, and lift the full porthole faces
outside the curved hull. A raycast regression test covers all four complete
rims. Browser/visual checks remain off at the owner’s request.

Screenshot-correction verification: lint, full tests (2,473 unit passes, four
database-dependent skips; 635 component passes) and production build pass.
Appearance remains pending the owner’s screenshot review.
