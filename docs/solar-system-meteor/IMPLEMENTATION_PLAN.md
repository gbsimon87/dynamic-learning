# Solar System Meteor Experiment — Implementation Plan

**Created / expanded:** 2026-09-20  
**Status:** Detailed plan; implementation not started  
**Difficulty:** High  
**Backlog:** [Project Ideas, #17](../PROJECT_IDEAS.md)  
**Progress:** [Implementation tracker](IMPLEMENTATION_TRACKER.md)  
**Visual construction:** [Geometry and effects recipe](VISUAL_RECIPE.md)

## 1. Instructions for the implementing agent

Implement one tracker milestone at a time, in order. Read this plan, that
milestone's checklist, and the relevant sections of the visual recipe before
editing. Finish its checks and record evidence before proceeding. A milestone
is a useful stopping point, not a requirement to ask for permission to continue.

Start with `git status --short` and preserve existing work. Read
[AGENTS.md](../../AGENTS.md), the
[Skills Mode guide](../../.claude/skills/add-skill-game/SKILL.md), and the
architecture, theming, and hard-won rules in
[PROJECT_KNOWLEDGE.md](../PROJECT_KNOWLEDGE.md).

This is an enhancement to the existing `/solar-system` activity. Its route and
Skills hub link already exist; no new route, curriculum topic, account state,
reward, or progress storage is needed. Do not implement the experiment by
remounting the page, reloading the browser, or creating another renderer.

Decisions below are the implementation defaults. Numbers explicitly labelled
**tune** may change after browser inspection; record the result in the tracker.
Change an architectural decision only with a concrete reason and update the
plan and tracker together. Do not silently replace Earth breakup with an
explosion sprite or a collection of unrelated rocks.

## 2. Experience and scope

A seven-year-old can press **Launch meteor**, watch a rock approach Earth,
see a bright surface impact and Earth break into recognisable curved pieces,
then press **Reset Solar System** to restore the default overview and replay.

Use the visible caption **“A pretend space experiment — real Earth stays safe.”**
Keep the visual playful, with blue/green crust, warm glowing interiors, and dust.
This is exaggerated pretend play, not an accurate collision simulation.

Required in the first complete version:

- Launch, preparation, visible approach, surface impact, cracks, breakup, and a
  persistent destroyed aftermath; reset works throughout.
- One authoritative phase controller, one render loop, a frozen background
  simulation during the experiment, and fully restored exploration afterward.
- Touch and keyboard controls, light/dark styling, reduced motion, bounded
  effects, cleanup, and recorded browser verification.

Defer effect audio, physics, collisions between debris, destruction of other
planets or the Moon, scoring, camera shake, bloom/post-processing, imported 3D
models, and new dependencies. Existing tour narration must stop on launch.
A more elaborate visual stack is a fallback only after M2/M4 browser evidence
shows the procedural approach is inadequate.

### Normal-motion sequence

Durations are defaults to implement first; tune them together, not separately
in UI code and controller code.

| Phase | Duration | Visible result / invariant |
| --- | --- | --- |
| `ready` | Until launch | Intact scene; normal exploration; Launch enabled once the scene API exists. |
| `preparing` | 1.0 s | Freeze the current world pose; move the camera to the Earth shot; meteor/effects hidden. Reset already works. |
| `approaching` | 3.5 s | Meteor travels from distant space to one calculated surface contact, leaving a luminous trail. |
| `impact` | 0.8 s | Meteor stops at contact and disappears into a glow; one ring expands; cracks spread over the still-intact globe. |
| `breaking` | 2.4 s | In one frame, exchange the intact Earth for aligned fragments; pieces separate and rotate. |
| `aftermath` | Until reset | Finish fading dust/trail over 2 s, then hold a static arrangement of visible Earth fragments. |

Launch is rejected in every phase except `ready`, including `aftermath`.
Reset returns to `ready` immediately. It has no timed phase and does not wait
for animation or assets. The complete normal sequence reaches aftermath at 7.7 s
of visible animation time.

## 3. Source map and verified hazards

Inspected 2026-09-20. Use symbol names as edit anchors; line numbers will move.
Installed/locked versions: Three.js **0.181.0**, Tweakpane **4.0.5**.

| Existing source / anchor | Role and required integration |
| --- | --- |
| [SolarSystem.jsx](../../src/pages/skills/geography/SolarSystem.jsx), `useEffect(..., [])` | Owns scene construction, listeners, renderer, and cleanup. Keep this effect stable across React phase/theme changes. |
| `planetData`, `createPlanetSystem`, `planetSystems` | Find Earth by `system.userData.planet.name === "Earth"`; use its `userData.body`. Do not depend on array index 2. |
| `createPlanetSystem` | Transform chain is scene → system root → tilted `axialGroup` → spinning/scaled `body`. Earth radius is 0.45; its orbit distance is 25.64. Moon mesh is a child of the system root. |
| `sphereGeometry`, `materials.earth`, `textures.earth` | Geometry is a shared unit sphere with 32 × 32 segments; radius comes from body scale. Preserve these borrowed resources. |
| `simulation`, `glowSettings`, `starSettings`, `beltSettings`, `backgroundSettings` | Mutable objects bound to Tweakpane. Reset by assigning properties into the existing objects, not replacing their identities. |
| `createStars`, `createAsteroidBelt`, `updateAsteroidBelt` | Random data and GPU allocations need a defined reset baseline. Belt is 4,500 instances; stars are 5,000 points. |
| `stopFollowing`, `stopTour`, `stopNarration`, `resetView` | Reuse their responsibilities, but the existing `resetView` only flies the camera home. Add a distinct full-scene reset. |
| `sceneApiRef.current` | Add `launchMeteor` and `resetSolarSystem`; retain all existing navigation methods. |
| `focusEntry`, `visitTourPlanet`, `onClick`, `onWheel`, `onControlsStart` | Guard at scene level while the experiment owns the view; hiding JSX alone is insufficient. |
| `onKeyDown`, `onSearchKeyDown` | Active-experiment Escape must run before the current toolbar/search exemptions. Idle search Escape keeps its existing behavior. |
| `animate` | Currently combines `THREE.Clock` elapsed time with clamped frame deltas. Replace world timing deliberately; do not just set `dt = 0`. |
| `labelSprites`, `orbitPaths`, `filterZoomTargets` | Apply an experiment visibility mask every frame; mark effect meshes so they never enter normal picking/zoom selection. |
| `ResizeObserver` | Update camera aspect, renderer size, and experiment framing without restarting its timeline. |
| Effect cleanup | Current shallow traversal misses textures and repeats shared-material disposal. Use explicit resource ownership for the new effect and deduplicate normal-scene disposal. |
| [SolarSystem.css](../../src/pages/skills/geography/SolarSystem.css) | Existing overlays use absolute positions and z-indices 45–100; plan the new control strip around them. |
| [App.css](../../src/App.css) | Actual light/dark colour tokens and `--navbar-height` live here. Body has the theme class. |
| [solarSearch.test.js](../../src/pages/skills/geography/solarSearch.test.js) | Follow its `node:test` + `node:assert/strict` style. No component-test dependency. |

Specific pitfalls to address:

1. OrbitControls `enabled = false` disables input, but calling `update()` still
   applies stored damping. During the experiment, skip its update entirely and
   let the controller call `camera.lookAt()`.
2. The current orbit expression multiplies absolute clock time by the speed
   setting. A frozen delta alone leaves planets moving; resuming can jump.
3. Planet constructors place roots on +X, but the first animation frame places
   them near +Z. Define reset as the rendered pose at simulation time zero.
4. Partial `SphereGeometry` patches have local 0–1 UVs; reusing the Earth map
   without remapping repeats the whole planet on every fragment.
5. Labels are separate scene children. Hiding Earth does not hide its label,
   and the normal label loop can overwrite a one-off `visible = false`.
6. `controls.reset()` restores camera state, not Earth, settings, or damping
   history. A comprehensive reset needs the ordered routine in §7.
7. The page's inline height currently hardcodes 66 px and a 420 px minimum.
   Replace this with `calc(100dvh - var(--navbar-height))` for this viewport page;
   otherwise landscape phones can put Reset below the visible scene.

## 4. File boundaries and ownership

Create the following files beside `SolarSystem.jsx`. These names are planned
new files; do not create placeholders before their milestone.

| File | Responsibility |
| --- | --- |
| `solarSimulation.js` | Pure defaults factory, world-time advancement, and planet/moon pose calculations. No Three.js, DOM, React, timers, or storage. |
| `solarSimulation.test.js` | Freeze/resume, speed changes, time-zero poses, and independent default copies. |
| `meteorTimeline.js` | Pure phase transitions and ordered entry events, including reduced-motion durations. |
| `meteorTimeline.test.js` | Boundary, multi-phase delta, double-launch, reduced-motion, reset, and terminal-state tests. |
| `meteorGeometry.js` | Pure numeric geometry/path helpers: fragment arrays, seeded fragment motion, contact/path sampling, and camera fit calculation. Accept/return numbers, arrays, or plain objects. |
| `meteorGeometry.test.js` | UV continuity, shell topology, finite/bounded output, contact and path clearance, deterministic motion, and framing. |
| `meteorExperiment.js` | Three.js controller: create/reuse effect resources, snapshot Earth's world transform, animate camera/effects, hide/restore the intact mesh, and dispose owned resources. |
| `SolarSystem.jsx` | Integrate the controller, own ordinary world/reset/settings/navigation, and render learner controls/status. |
| `SolarSystem.css` | Scoped responsive control layout, focus/disabled states, and reduced-motion CSS. |
| `src/App.css` | Add paired `--solar-*` UI tokens only as needed. Three.js effect colours are visual art parameters, not UI text colours. |

Keep the new UI small enough to live in this page. Do not extract the entire
1,600-line scene into a new framework as part of this work.

### Controller contract

```js
const experiment = createMeteorExperiment({
  scene, camera, earthBody, earthTexture,
  quality, // "low" or "standard", selected once for this scene mount
  onPhaseChange, // (phase) => update the small React phase mirror
});

experiment.launch({ reducedMotion }); // boolean: accepted only from ready
experiment.update(dt);               // called only by the page's existing loop
experiment.resize({ width, height, reservedBottomPx }); // refit; preserve phase/path
experiment.reset();                  // ready, intact Earth, hidden/reinitialised effects
experiment.dispose();                // idempotent; no React callbacks
experiment.isActive();                // true through aftermath
experiment.getPhase();                // synchronous authoritative phase
```

The controller owns one `THREE.Group` attached directly to the scene and only
its own resources. Mark effect descendants `userData.isMeteorEffect = true`.
It borrows Earth/texture/camera; it does not own normal simulation settings,
Tweakpane, listeners, the renderer, requestAnimationFrame, or localStorage.
`reset()` restores the captured body's visibility without reparenting it.
The page's `resetSolarSystem()` additionally restores all scene defaults.

Create the controller after scene objects/camera exist, before publishing the
scene API or starting `animate()`. If initial creation fails, still publish the
normal scene API with a retry message and a null controller. Effect construction may be lazy on the first
accepted launch, but must be synchronous and bounded for this version. A thrown
construction/update error is caught by the page and routed through the full
reset. Dispose the failed controller (including partial resources), clear the
page's controller variable, and recreate it on the next launch using the same
factory arguments. Navigation callbacks must read that variable, not retain a
disposed controller. Full reset must also work when the controller is null.

React owns `{ phase, sceneReady, error }` plus button refs. Set `sceneReady`
when publishing the API. Do not add phase/error/theme to the scene effect's
dependencies. React reads phase changes; the scene uses `experiment.isActive()`
for immediate locking so a second tap cannot beat a React render. Treat a null
controller as inactive in loop/navigation guards; `sceneReady` means the base
scene API is usable, so an effect failure does not disable Reset or retry.

## 5. Pure timing and the single animation loop

### Timeline API and transition rules

Export `createMeteorState({ reducedMotion = false } = {})`,
`launchMeteor(state, { reducedMotion = false } = {})`,
`advanceMeteor(state, dt)`, and `resetMeteor(state)` from `meteorTimeline.js`.
Also export `getPhaseDuration(phase, reducedMotion)` so the controller's easing
uses the same duration table; do not repeat phase durations in rendering code.
Handle zero-duration phases through entry events without dividing by zero.

- State is `{ phase, elapsed, phaseElapsed, reducedMotion }`; no Object3D refs.
- `createMeteorState` returns `ready` with both times zero.
- The other functions return `{ state, entered }`, where `entered` is an ordered
  array of phase names entered by that operation. Do not mutate input state.
- An accepted launch enters `preparing`, clears times, and captures the supplied
  motion preference. Rejected launch returns unchanged state and `entered: []`.
- `advanceMeteor` consumes finite positive seconds; zero, negative, NaN, and
  Infinity leave state unchanged. `ready` never advances.
- Consume every crossed duration in order, carrying remainder into the next
  phase. Use a loop bounded by the finite phase count. Exact equality enters
  the next phase. Zero-duration reduced-motion phases still emit entry events.
- `aftermath` stays active forever, but caps its local time at the settling
  duration (normal 2 s; reduced 0.4 s), then stops accumulating time.
- Reset emits `ready` only if the prior phase was active, zeroes both times,
  and discards all prior entry events. Resetting ready is harmless.

On `impact` entry initialise contact effects once. On `breaking` entry swap
visibility once. Evaluate effect poses from current phase time, not repeated
`position += velocity` updates. If one delta crosses both boundaries, execute
both entry actions in order, then render the final resulting state. Do not use
`setTimeout`, `setInterval`, CSS animation events, or a second RAF for phases.

### World clock contract

Export `createWorldTime()` for a fresh zero time object and a pure
`advanceWorldTime(time, dt, settings, paused)` returning:

```js
{ elapsed, orbitTime, spinTime }
// while running:
// elapsed   += dt
// orbitTime += dt * settings.orbitSpeedMultiplier
// spinTime  += dt * settings.rotationSpeedMultiplier
```

Paused or invalid deltas leave all three values unchanged. Calculate planet
orbit angle as `planet.speed * orbitTime`, spin as
`planet.speed * spinTime * 60`, and moon orbit as
`moon.speed * orbitTime + moon.phase`. Use the current sin/cos conventions.
This preserves ordinary speed while allowing speed changes without teleporting.
Tilt remains driven by `simulation.enableTilt`. Export
`getBodyPose({ speed, distance, phase = 0 }, time)` returning
`{ position: { x, y: 0, z }, rotationY }` for both planet roots/bodies and moons;
the page applies position to the appropriate root/mesh and spin to its body.
Moon `phase` is the per-moon value from `createPlanetSystem`, not a new random
offset. Keep tilt application in the page.

Refactor asteroid updates to use stored initial angles plus `speed * orbitTime`,
with eccentricity driven by `elapsed`. Store each instance's original size and
set the reusable dummy's scale per instance. The current update reuses the last
constructed dummy scale, so copying angles alone cannot restore the belt.
Keep all generated initial angles/radii/speeds/inclinations/sizes for reset.

### Frame ordering

Use the existing `performance.now()` delta, clamped to `[0, 0.1]` for visible
frames. Remove `THREE.Clock.getElapsedTime()` from world motion. Read active
state once at the start of each frame:

```text
1. Compute and sanitise frame delta; always refresh previous timestamp.
2. If document is hidden or just became visible, use delta = 0.
3. If experiment is ready: advance world time and apply world poses.
4. If active: update experiment; otherwise run existing follow/zoom and controls.update().
5. Apply labels/orbits/glow, with experiment visibility masks.
6. Render once; schedule the existing next frame once.
```

Skip belt motion updates while active. Keep its current matrices frozen.
Hide all labels and orbit lines while active; leave other planet/Moon bodies
intact and frozen. Ordinary visibility follows its default settings on reset.

Add one `visibilitychange` listener that resets the frame timestamp on hide and
show. Hidden time does not consume phases or advance planets; returning after a
minute resumes the same phase. The pure timeline accepts large deltas for
correctness tests even though browser input is clamped to avoid skipped visuals.

## 6. Launch transaction and interaction lock

Implement a page-level `launchMeteor()` wrapper; all launches go through it.

1. Return `false` if disposed, base scene not ready, or already active. Recreate
   a missing controller after an earlier failure. Clear a previous retry message
   only when starting a new attempt. Controller recreation is inside the same
   error boundary as the rest of launch.
2. Stop narration and tour, stop following, zero follow interpolation and zoom
   animation, clear selection/focused ID, and collapse/blur search.
3. Disable OrbitControls input. Clear residual damping with the public API:
   save camera position/target, set `enableDamping = false`, call `update()` once,
   restore the saved camera/target, call `update()` once again, then restore the
   damping flag. Do this before capturing the preparation camera pose. Avoid
   private `_sphericalDelta` fields. No controls updates during active frames.
4. Call `scene.updateMatrixWorld(true)` so Earth has current world transforms.
   The controller captures this pose and accepts launch synchronously; no await
   or timer between checking ready and marking preparing.
5. Disable and hide Tweakpane (`pane.disabled`, `pane.hidden`), hide the normal
   toolbar/tour/info UI, and move keyboard focus to Reset after React commits.
   A successful launch freezes the world at its existing pose, not time zero.
6. If any effect operation throws, execute the reset transaction, log the error
   once for diagnosis, and show **“That meteor did not launch. Try again.”**
   Keep ordinary exploration usable; use fallback blue/green fragments if the
   existing Earth texture is unavailable. No new network assets are required.

Every competing entry point must also guard synchronously: `focusEntry`,
`visitTourPlanet`, tour replay/next/previous, `onClick`, `onWheel`,
`onControlsStart`, and relevant pane change callbacks. While active, wheel
still prevents its normal canvas behavior but does not modify zoom targets.
`filterZoomTargets` excludes `isMeteorEffect` defensively. Do not add fragments
to `planetBodies`, `searchEntries`, or `labelSprites`.

`resetView()` keeps its existing camera-only behavior in ready. When active,
it delegates to `resetSolarSystem()` and returns; the latter never calls
`resetView()` recursively. Existing Overview and pane Reset View therefore
recover the scene if invoked through an old handler. In active mode, window
Escape resets before checking whether the target is in `.solar-toolbar`.

## 7. Full reset specification

**Reset restores page defaults, not the learner's pre-launch settings.** Keep
this meaning consistent in the label, code, tests, and tracker. New Reset is
available in ready as well, so it can restore modified exploration settings.

### Baseline data

Create immutable default descriptions and fresh mutable settings from one
`createSolarDefaults({ marsDistance, jupiterDistance })` factory in
`solarSimulation.js`. Do not maintain a second handwritten reset literal.
Return `{ simulation, camera, lighting, glow, stars, belt, background, tour }`;
the page keeps these objects and binds the relevant ones to Tweakpane. Initial
lights/camera also read from this factory rather than duplicating constants.

| Item | Baseline |
| --- | --- |
| World | `elapsed = orbitTime = spinTime = 0`; all spins zero; roots/moons positioned using the normal pose function at zero; original tilts. |
| Simulation | Orbit speed 1; rotation speed 1; orbits on; planet labels on; moon labels off; tilt on. |
| Camera | Position `(0, 72, 128)`; target `(0, 0, 0)`; up `(0, 1, 0)`; zoom 1; FOV 50; near 0.1; far 5000. Aspect uses current container size. |
| Controls | Enabled; damping on / 0.075; pan and zoom on; existing min distance 1.5 / max 3000 and remaining page defaults retained. |
| Lights | Sun intensity 400; ambient intensity 0.28; no experiment light active. |
| Glow | Enabled; intensity 0.42; size 16. |
| Stars/background | 5,000 stars; size 0.6; original generated positions; galaxy background on. |
| Belt | Enabled; count 4,500; inner radius `marsDistance + 8`; outer radius `jupiterDistance - 15`; min/max size 0.25 / 0.3; inclination 3°; eccentricity 0.04; min/max speed 0.0004 / 0.0012; original generated records. |
| Earth | Same body object, parent, original material, scale, local position/quaternion, and visibility; never rebuild or reload its texture. Apply the zero-time spin/tilt afterward. |
| UI | No selected/followed body; blank/collapsed search; tour inactive, index 0, unmuted; pane focus Overview; error cleared on explicit Reset. |
| Pane | Visible/enabled; root expanded at widths ≥720 px; folders at their initial expansion settings. Recompute width for current viewport. |

Keep CPU copies of the original star positions and asteroid records once per
mount. If the user changed counts/settings, restore from those copies; reuse
existing buffers when compatible and dispose/recreate only changed resources.
Never regenerate a new random baseline on every Reset. Restore the bound
`asteroidBelt.settings` as well as `beltSettings`; they are separate objects
in the existing implementation.

### Reset order

1. Set a local `resetting` guard; cancel narration and clear follow/zoom state.
   All relevant pane callbacks return while `resetting` or disposed.
2. Call controller `reset()` if present; it clears phase/time/transient visibility and
   restores Earth. No pending effect callbacks may bring debris back afterward.
3. Assign defaults into the existing settings objects; restore lights,
   background, stars, and belt records; set world time to zero and apply poses.
4. Restore camera/target immediately, clear damping using the §6 routine,
   restore controls defaults, and synchronise `desiredCameraPosition`,
   `desiredControlsTarget`, `previousFollowPosition`, and follow blend state.
5. Reapply normal labels/orbits/glow from defaults, update world matrices, and
   refresh pane values once under the guard. Restore folder/root visibility.
   Extend the existing microtask suppression around `updateCameraFocus` so
   programmatic refresh never triggers navigation/rebuild loops.
6. Clear React search/selection/tour/error state; reset previous frame timestamp;
   finish the guard and put focus back on Launch after React commits. Do not
   steal focus if Reset was not initiated by the user (e.g. unmount cleanup).

A second Reset in the same tick is harmless. Theme, account/profile, learner
progress, and browser storage are untouched. Unmount uses `dispose()`, not a
user reset with React updates.

## 8. Rendering decisions

Follow [VISUAL_RECIPE.md](VISUAL_RECIPE.md) for the camera basis, meteor path,
contact math, patch UVs, thick fragments, cracks, and particle animation.

The initial prototype uses a simple rock, contact sprite, and a small number of
curved fragments, but already goes through the final controller/reset contracts.
M2 must show real globe separation, even before polish. M3/M4 improve that same
path rather than replacing it with a throwaway second implementation.

Choose quality once at mount: **low** when the initial container width is below
720 px or `(pointer: coarse)` matches; **standard** otherwise. Keep it for the
mount so resize does not allocate another fragment set. This is a conservative
heuristic, not a device benchmark. Both tiers provide the full visual sequence.

| Budget | Low | Standard |
| --- | --- | --- |
| Earth fragments | 16 (4 longitude × 4 latitude patches) | 32 (8 × 4) |
| Trail samples | 32 | 64 |
| Dust points | 80 | 160 |
| Spark points | 24 | 48 |
| Crack branches | 6 | 10 |
| Extra lights | 1, no shadows | 1, no shadows |
| Renderer pixel-ratio cap | Existing cap 2 initially | Existing cap 2 |

These are starting ceilings, not a quality target to exhaust. Reuse geometry,
materials, typed arrays, scratch vectors, and seeded fragment parameters.
No per-frame geometry/material construction or React updates. Do not enable
fragment shadows. If mobile timing misses the target, reduce effect density or
DPR based on measured evidence; do not silently reduce the entire app's quality.

## 9. Learner controls, layout, and reduced motion

Add a labelled `.solar-experiment-controls` strip at the bottom of the scene,
above the canvas, with the pretend caption, Launch, Reset, and a short status.
Keep both buttons mounted. Launch is disabled while active or before sceneReady;
Reset is enabled whenever sceneReady. Use native `button type="button"`.

Both buttons need at least 48 × 48 CSS px, a visible focus ring, and full labels.
Use `role="status"`, `aria-live="polite"`, `aria-atomic="true"` on one status
node; announce phase changes, never elapsed seconds. Suggested copy:

| Phase | Status |
| --- | --- |
| ready | Ready for a pretend space experiment. |
| preparing | Getting Earth ready to watch… |
| approaching | Here comes the meteor! |
| impact | The meteor has reached Earth! |
| breaking | Watch the pieces drift apart. |
| aftermath | Earth is in pieces. Reset to play again. |

Layout rules:

- Keep new rules under `.solar-system .solar-experiment-*`; theme overrides use
  `body.dark`. Use paired text/panel/accent/on-accent tokens in `App.css`.
- Use an opaque theme panel behind text; measure computed text contrast ≥4.5:1.
  Never use accent pink as text or white text on the light accent background.
- Reserve space for the strip using a CSS height variable updated by an observer
  on the strip (plus safe-area inset). Feed that reservation into camera framing.
  Reuse the page's resize handler; avoid a resize feedback loop.
- Move the existing hint above the strip when idle and hide it while active.
  Constrain the mobile information card above the strip, with its body scrolling.
  At short landscape heights the caption/status and buttons can form columns;
  no horizontal overflow and no clipped Reset. Allow the ordinary info card to
  shrink without covering controls.
- Give the strip z-index 110. Hide/disable pane and normal overlays while active;
  the browser/app navbar stays accessible so leaving the route always works.
- Set the canvas cursor to default while active and restore grab when ready.
- Launch from an open information card or a running tour must remain possible.

Observe `prefers-reduced-motion` with one cleaned-up matchMedia listener. At
launch, choose reduced durations: preparing 0.2 s, approaching 0 s, impact
0.25 s, breaking 0 s, aftermath settling 0.4 s. Use a direct camera cut, a gentle
opacity transition to the final fragment arrangement, and no moving trail,
expanding ring, sparks, or travelling debris. Show a small static contact glow.
The result still visibly contains Earth pieces and Reset follows the same path.

If reduced motion is enabled mid-flight, reset the active experiment immediately
and announce ready; the next launch uses reduced motion. Disabling the preference
mid-flight affects only the next launch. This avoids switching timeline tables
under an existing elapsed time. CSS also removes control/card transitions under
the media query. No effect audio or flashing sequence is introduced.

## 10. Lifecycle and failures

Normal reset hides and reinitialises a reusable effect pool; it does not dispose
and recreate it each cycle. Controller disposal removes its group and disposes
owned geometries, materials, generated glow texture, and any transient light
resources exactly once. Borrowed `earthTexture`, body material, shared sphere,
camera, and renderer are never disposed by the controller.

Page cleanup order:

1. Mark disposed and clear `sceneApiRef`; cancel RAF and stop narration.
2. Disconnect container/control-strip observers and remove canvas, keyboard,
   controls, visibility, and reduced-motion listeners; remove pane-width listener.
3. Dispose controller, pane, and controls. Controller disposal emits no phases.
4. Deduplicate remaining scene geometries/materials/textures with Sets; include
   material maps, label textures, Sun glow texture, explicit planet textures,
   and `backgroundTexture` even if background is currently hidden.
5. Dispose renderer. Guard existing queued pane microtasks against disposed state.

A material's disposal does not dispose its textures. Test ownership by keeping
Earth's texture working after ten resets. Avoid global caches that survive route
exit. A recoverable effect failure must not kill the normal page RAF: catch it,
reset, and render the usable overview with a retry message. Do not repeatedly
throw/log on every frame. Existing overall WebGL initialization failure is not
a new renderer recovery project; report it distinctly if it blocks testing.

## 11. Tests to write with the owning milestone

Keep test inputs independent of the implementation's own expected-output
calculations. Test observable invariants, not copied code or snapshots of huge
arrays. No browser globals in the pure modules.

| ID | Module | Required cases |
| --- | --- | --- |
| T1 | Timeline | Ready does not advance; launch enters preparing once; launch again in every active phase is ignored. |
| T2 | Timeline | Exact 1.0 / 4.5 / 5.3 / 7.7 s cumulative boundaries; delta crossing several boundaries emits all entries in order; impact/swap each occur once. |
| T3 | Timeline | Compare one large delta with split deltas; invalid/zero deltas are inert; aftermath caps time and stays active. Use numeric tolerance. |
| T4 | Timeline | Reset from each phase and repeated reset returns zeroed ready state; advancing an old run cannot create new events in the current state. |
| T5 | Timeline | Reduced zero-duration phases terminate correctly and preserve entry order; both schedules reach persistent aftermath. |
| T6 | Simulation | Pause/resume preserves phase; speed changes affect subsequent time only; zero-time planet/moon poses; independent default copies. |
| T7 | Geometry | Both tier counts; finite positions/normals/UVs; valid indices; nonzero-area faces; continuous UV/position seams; correct outward/inner/cap normals. |
| T8 | Geometry | At zero displacement, pieces reconstruct the unit globe; matching texture UVs on shared edges; thick shells and bounded separated poses. |
| T9 | Path/framing | End is surface plus meteor radius; all approach samples stay outside contact radius until endpoint; contact survives arbitrary Earth translation/rotation/uniform scale. |
| T10 | Path/framing | Deterministic seed, no NaN for portrait/landscape/aspect limits; projected path/Earth fit the usable frame with reserved UI space. |

Use a small number of meaningful fixtures, including Earth away from its default
position and tilt disabled. Browser checks cover React focus, Three.js resource
ownership, camera damping, and actual visual quality; pure tests cannot prove them.

## 12. Browser and performance acceptance

Run `npm run dev` and use the URL/port it prints. `/solar-system` is ungated and
needs no child profile. Use the in-app browser skill when available. Never clear
site storage to set up these tests. Record actual viewport, browser, motion
preference, and theme, plus screenshots/recording filenames, in the tracker.

Required cases and their observable pass conditions:

| ID | Scenario | Pass condition |
| --- | --- | --- |
| B1 | Desktop complete launch, both themes | Distant approach → surface contact → globe-shaped pieces separating → persistent fragments. Status and Reset stay legible. |
| B2 | Reset in each of six phases, including ready with edited pane settings | Within the next rendered frame: zero-time defaults, intact textured Earth, overview, no effects, correct pane values; next launch works. |
| B3 | Launch during tour narration, follow Moon, search result, zoom, or active drag damping | No competing camera motion, narration, panels, labels, or click-through; experiment uses the current Earth pose. |
| B4 | Keyboard | Tab reaches Launch/Reset, Enter/Space work, active Escape resets even from the strip, focus lands sensibly; idle search Escape still clears search. |
| B5 | Portrait 390×844, landscape 844×390, tablet 768×1024, desktop 1440×900 | No control overlap/overflow; Earth and incoming meteor readable; reset visible; resize during each phase preserves time/contact. Also inspect a 320 px-wide viewport. |
| B6 | Reduced motion and mid-flight preference change | Gentle/static alternative still communicates destruction; no camera flight/particles; preference change safely cancels as specified. |
| B7 | Five rapid Launch taps, double Reset, repeated launch/reset | One sequence, no duplicate effect group/loop/listeners; no delayed reappearance of debris. |
| B8 | Hide tab for ≥10 s during approach; return | Same phase resumes without a jump or sudden impact; no extra world time elapsed. |
| B9 | Navigate away during preparing, impact, and aftermath; re-enter | Narration/effects stop; no callback after disposal; one fresh renderer/loop/pane and intact Earth. |
| B10 | After reset: search Earth and Moon, wheel/pinch, drag, guided tour next/previous/replay | Existing exploration works with no hidden-body targets or stale follow pose. |
| B11 | Effect construction failure (temporary local fault injection, removed afterward) | Overview is restored, readable retry text appears, Reset/exploration work, and a later launch succeeds. |
| B12 | Ten full cycles after warm-up, plus interrupted cycles | Geometry/texture/program counts stabilise; one effect group and one RAF owner; Earth texture survives. |

Choose and record an actual available phone/tablet in M2; do not claim device
performance from viewport emulation. If no physical device is available, complete
all desktop/emulated checks and leave device verification explicitly pending.
Do not mark M6/M7 fully Done with that required evidence missing.

For performance use a production preview, default scene settings, a completed
warm-up cycle, and the chosen tier. Sample visible frame intervals for at least
three full sequences; record median and p95, device/browser, DPR, and viewport.
Aim for median ≤33.3 ms (30 fps) and p95 ≤50 ms, without repeatable long stalls
at breakup or Reset. Measure reset response with a recording/performance trace;
target visible restoration within 100 ms on the recorded device.

Temporarily record `renderer.info.memory.geometries`, `.textures`,
`renderer.info.programs.length`, and `.render.calls` after warm-up, cycle 5,
and cycle 10 in the same phase/view. Internal caches need not be zero, but live
resource counts must not grow each cycle. These metrics do not count listeners
or prove GPU timing; also inspect listener/RAF cleanup and route re-entry.
Keep diagnostics developer-only and remove ad hoc globals/instrumentation before
completion. Record baseline scene cost separately from the added effect cost.

## 13. Delivery order and documentation

The [tracker](IMPLEMENTATION_TRACKER.md) contains the executable task checklist:

1. **M1:** Pure timing/defaults, world clock, full reset foundation.
2. **M2:** Working simple launch → visible breakup → reset in the real scene.
3. **M3:** Camera framing, curved approach, glow/trail, complete navigation guards.
4. **M4:** Thick textured fragments, cracks, contact effects, dust, settled aftermath.
5. **M5:** Final responsive controls, focus/status, themes, reduced motion.
6. **M6:** Device performance, repeated reset, lifecycle and failure checks.
7. **M7:** Full regression, commands, and final documentation.

Basic Launch/Reset, synchronous lock, and safe cleanup are required from M2;
M5 polishes them rather than adding them for the first time. Basic reset/default
safety is required before any visual polish. Every intermediate stage must build.

Run focused pure tests during their milestone. For final verification run
`npm test`, `npm run lint`, and `npm run build`; record exit status and any
pre-existing warnings accurately. Fix regressions introduced by this work and
record unrelated blockers without broad unrelated refactoring.

When implementation starts, change backlog #17 to In progress. Only when all
required acceptance evidence is present, remove that completed idea and record
the final behavior, limitations, dependencies (if any), and conventions in
`PROJECT_KNOWLEDGE.md`. Keep these plan/tracker documents as the feature record.

## 14. Reference checks and fallback decisions

The installed source under `node_modules/three` is the version-specific authority;
current online docs can describe newer APIs. Consult
[OrbitControls](https://threejs.org/docs/pages/OrbitControls.html) for public
camera/controls APIs and
[SphereGeometry](https://threejs.org/docs/pages/SphereGeometry.html) for partial
sphere parameters. The damping and UV hazards above were also checked directly
against the installed 0.181.0 source. Tweakpane's
[miscellaneous APIs](https://tweakpane.github.io/docs/misc/) document refresh,
hiding/disabling views, and disposal.

Before adding a package or external asset, record the failed visual/performance
criterion, alternatives tried, maintenance status, installed-version compatibility,
licence and attribution, bundle cost, and measured device impact. Default to the procedural
recipe and existing Earth texture. Do not postpone routine decisions to an
unspecified future prototype: only visual tuning and actual device evidence
remain open in this plan.
