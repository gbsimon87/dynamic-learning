# Solar System Meteor Experiment — Progress Tracker

**Last updated:** 2026-09-20  
**Overall status:** Feature implemented and verified in a local headless browser;
physical-device performance evidence is the only required check still missing  
**Implementation milestones complete:** 5 of 7 (M6/M7 blocked on device evidence)  
**Plan:** [Implementation plan](IMPLEMENTATION_PLAN.md)  
**Visual construction:** [Geometry and effects recipe](VISUAL_RECIPE.md)  
**Backlog:** [Project Ideas, #17](../PROJECT_IDEAS.md)

Use `Not started`, `In progress`, `Blocked`, or `Done`. Check a task only after
performing it; mark a milestone Done only when its evidence is recorded. Planning
work is not implementation completion. Update this file alongside implementation.

Read the next milestone and its referenced plan sections, make the bounded
change, run its checks, and record the result before continuing. Basic controls,
reset, locking, and cleanup must work in the first browser prototype. Do not leave
these until the later polish milestones.

## Milestone summary

| ID | Milestone | Depends on | Status | Completion evidence |
| --- | --- | --- | --- | --- |
| M1 | World timing and reset foundation | — | Done | T1–T6 pass; pane sweep restored every §7 default after edits; exploration intact; build passes. |
| M2 | Complete simple sequence in the real scene | M1 | Done | Full six-phase sequence observed; reset from every phase; screenshots; no physical device available. |
| M3 | Camera, meteor, and navigation integration | M2 | Done | T9–T10 added; phase survives live resize in all phases; B3/B8/B10 pass; no competing tour/follow/zoom. |
| M4 | Textured destruction and aftermath | M3 | Done | T7–T8 added (seam/topology/UV); pieces read as Earth; dust sprite defect found and fixed. |
| M5 | Controls, themes, and accessibility | M4 | Done | B1/B4/B5/B6 pass; contrast measured 5.46–16.44:1; 320 px–1440 px clean; reduced motion verified. |
| M6 | Device performance and lifecycle | M5 | Blocked | B7–B9/B11–B12 all pass; resources stable over 10 cycles; **physical-device timing unavailable**. |
| M7 | Final verification and documentation | M6 | Blocked | All B checks except device timing; 543/544 tests, lint, build recorded; backlog #17 kept open. |

Test IDs T1–T10 and browser IDs B1–B12 are defined in plan §§11–12. Preserve these
IDs in evidence so the implementing agent can tell exactly what remains.

## M1 — World timing and reset foundation

Read plan §§3–7 and §11. Files: `solarSimulation.js`, `meteorTimeline.js`, their
tests, and the timing/default/reset sections of `SolarSystem.jsx`.

- [x] Record starting working-tree state and inspect the source anchors in §3.
- [x] Add a single defaults factory; use fresh mutable settings for pane bindings.
- [x] Add pure world-time and body-pose helpers; replace absolute Clock usage.
- [x] Make planet/moon/belt motion use the explicit world times. Preserve belt
      instance sizes and baseline generated star/belt data.
- [x] Define initial rendered poses at time zero and use those on reset.
- [x] Implement the pure timeline API, normal/reduced schedules, and ordered
      boundary events; add T1–T6 with independent expected values.
- [x] Add page `resetSolarSystem`, shared damping-clear helper, and a reset guard.
      At this stage the experiment reset call can be optional until M2 wires it.
- [x] Expose the full reset through the scene API and a basic labelled Reset
      button so it can be exercised in the browser; preserve idle Overview.
- [x] Add visibility timestamp handling; no RAF/timer added by pure modules.
- [x] In browser: change speed/labels/tilt/lights/stars/belt/background, reset,
      inspect defaults, then search/follow/drag/tour again. Confirm no orbit jump
      on background-tab return or speed change.
- [x] Run focused tests and build; record evidence and relevant existing warnings.

**Evidence:** T1–T6 pass in `meteorTimeline.test.js` / `solarSimulation.test.js`,
including new T3 split-vs-single delta equivalence, T4 reset-from-every-phase with
stale-run isolation, and T5 reduced-motion entry order. Browser (headless Chrome
1440×900, dark): edited Orbit Speed 1→5, orbits/labels/moon-labels/tilt, Sun 400→50,
Ambient, Star Count 5000→900, galaxy off, glow off, belt Count 4500→800; Reset
restored every value to the §7 defaults exactly, including the derived belt radii
47.0 / 118.3. Search, follow, drag and tour all worked afterwards. Build passes.

## M2 — Complete simple sequence

Read plan §§2, 4, 6–8, 10 and recipe §§1–3, 5–6. Files: `meteorExperiment.js`,
initial `meteorGeometry.js`, and page integration/basic control CSS.

- [x] Create controller with the documented public contract and one effect root.
- [x] Locate Earth by name; capture world pose/radius at launch; keep borrowed
      scene resources intact.
- [x] Implement guarded launch transaction, phase mirror, basic Launch/Reset,
      phase status, disabled relaunch, and Escape reset. Reset is visible from
      the first preparing frame.
- [x] Integrate controller update into the existing RAF; freeze the normal world;
      stop narration/follow/zoom; skip controls updates; hide pane/normal overlays.
- [x] Render a simple meteor approach and visible surface contact, followed by
      curved Earth fragments at the captured pose and a held aftermath.
- [x] Use the same numeric fragment/path helpers intended for later polish;
      avoid throwaway controllers or temporary second animation loops.
- [x] Implement full reset from preparing/approaching/impact/breaking/aftermath,
      retry on construction failure, and owned-resource cleanup on unmount.
- [x] Capture images of intact Earth, aligned fragment swap, separated pieces,
      and restored overview. Check a portrait phone viewport as well as desktop.
- [x] Record a physical phone/tablet to use for M6, or explicitly record that
      physical-device access is currently unavailable.
- [x] Confirm the installed Three.js/procedural approach remains the default.
      Record any concrete visual limitation instead of adding a speculative dependency.
- [x] Run focused tests and build; finish B2/basic B3/B7/B9 before polishing.

**Evidence:** Full sequence observed at 1440×900 dark with status transitions at
0.28 s preparing → 1.42 approaching → 4.87 impact → 5.92 breaking → 8.22 aftermath
(the React status mirror lags the authoritative phase by a render; exact boundaries
are proven by T2). Launch is disabled in aftermath, Reset enabled.
[Dark aftermath](evidence/b1-desktop-dark-aftermath.png) shows curved blue/green
crust pieces in a globe-shaped spread. Reset verified from all five active phases
plus Escape. Interrupted cycles (reset at 0.1/1.5/4.9/6.0 s) leave no debris.
**Physical device: none available through this workspace** — recorded as pending.

## M3 — Camera, meteor, and navigation integration

Read plan §§5–6, §8 and recipe §§2–4. Files: geometry helpers/tests, controller,
page navigation guards, resize/visibility integration.

- [x] Implement stable camera basis, contact normal, Bézier control points,
      accelerating travel, and endpoint accounting for meteor radius.
- [x] Implement usable-frame fit using actual container and reserved strip space;
      retain the original path through resize and refit only the camera.
- [x] Add glow and bounded trail buffers; correct trail direction and culling.
- [x] Check preparation from overview, Earth/Moon follow, arbitrary drag angle,
      and the opposite side of the Sun; avoid camera travel through large bodies.
- [x] Guard every entry point listed in plan §6, including direct pane actions
      and tour callbacks; effect meshes cannot become normal zoom targets.
- [x] Apply label/orbit visibility masks each frame; hold the Moon intact.
- [x] Add T9–T10, including arbitrary translated/rotated/scaled Earth fixtures.
- [x] Record approach start/middle/contact at 390×844 and 844×390; measure Earth
      readability and confirm Reset stays outside the action.
- [x] Verify resize in each phase and B8 background return; reset during fast
      repeated taps still cancels immediately.
- [x] Run focused tests and build; record camera/path tuning values.

**Evidence:** T9–T10 added — T9 proves the contact point and whole-path clearance
survive uniform scale (0.45/3/128.5) and an arbitrary rotate+translate placement of
Earth; T10 projects every path sample and Earth at the fitted distance and asserts
it lands inside the usable frame for five viewports × three reserved-strip heights.
Live resize during preparing/approaching/impact/breaking/aftermath preserved the
phase and kept one canvas with no overflow. B8 (below) confirms background return.
B3/B10 confirm no competing tour, follow, zoom or click-through.

## M4 — Textured destruction and aftermath

Read plan §8 and recipe §§5–8. Files: geometry helpers/tests and controller.

- [x] Complete tiered 16/32 fragment meshes with original-grid outer surfaces,
      global Earth UVs, inner shell, and correctly wound cut faces.
- [x] Recenter vertices around fragment pivots; confirm zero-separation outer
      surfaces match Earth at its frozen tilt/spin without a texture jump.
- [x] Add deterministic displacement/rotation and bounds-derived breakup framing.
- [x] Add progressive cracks, a single contact glow pulse/ring, temporary light,
      and bounded dust/sparks using existing pooled buffers/materials.
- [x] Ensure large blue/green fragments remain after transient effects finish;
      no invisible intact Earth or effect remains selectable.
- [x] Add T7–T8; check polar patches, seams, finite geometry, and repeatability.
- [x] Capture impact, early breakup, settled aftermath, and reset in both tiers.
      Assess whether pieces read as Earth rather than unrelated rocks or a grid.
- [x] Verify reset clears every transient draw range/light/material state and the
      next launch reproduces the complete effect.
- [x] Run focused tests and build; record final visual tuning or specific gaps.

**Evidence:** T7–T8 added. T8 builds a shared-vertex map across all patches and
proves neighbouring patches agree on latitude exactly and on longitude modulo one
texture wrap, so the tiling has no gap and no seam jump; it also pins the UV range
to exactly the half-texel pole offset the installed `SphereGeometry` itself uses
(6 pole vertices, `v` strictly in range). Both tiers (16 and 32 pieces) pass.

Visual assessment: pieces read as Earth — recognisable blue ocean and green/tan
landmass on the outer faces, arranged as a broken globe rather than unrelated rocks.

**Defect found and fixed during this milestone:** dust, sparks and the meteor trail
used `PointsMaterial` with no `map`, so every particle rendered as a hard opaque
square — clearly visible as a grey block cluster in
[before](evidence/b1-light-breaking-before-dust-fix.png). They now reuse the
controller's existing owned `glowTexture`, giving soft round particles
([after](evidence/b1-light-aftermath-after-dust-fix.png)) at no resource cost —
geometry/texture/program counts were unchanged at 67/19/19 across four more cycles.

The rust-heavy interior noted here was resolved in the later visual pass by
thinning the fragment shell (inner radius 0.72 → 0.88) and replacing the emissive
orange interior with lit grey-brown rock warmed by a residual ember light. See the
visual pass entry in the work log and the decision register.

## M5 — Controls, themes, and accessibility

Read plan §9 and B1/B4–B6. Files: page UI/CSS, paired App.css tokens, controller's
reduced-motion rendering branch.

- [x] Finish labelled 48 px buttons, persistent status, pretend caption, disabled
      behavior, visible focus, and sensible Launch → Reset → Launch focus flow.
- [x] Replace hardcoded viewport height with the navbar-height token.
- [x] Reserve actual control-strip/safe-area height in layout and camera fit;
      keep info cards/hint above it and hide competing overlays while active.
- [x] Inspect 320 px width, phone portrait/landscape, tablet, desktop, and a
      short-height viewport. Record no overlap or horizontal overflow.
- [x] Implement paired theme tokens; measure computed control text contrast and
      button bounds in both themes, including disabled states and status text.
- [x] Implement reduced-motion timeline/rendering and preference-change policy;
      no motion preference in the scene effect dependencies.
- [x] Verify keyboard activation, active Escape from the strip, idle search
      Escape, focus restoration, and screen-reader status frequency.
- [x] Capture both themes and reduced-motion aftermath; run lint/build and the
      timeline tests after any timing changes.

**Evidence:** B1 both themes, B4, B5 and B6 pass (details in the table below).
Measured computed contrast, all well above 4.5:1 —
dark: caption 14.95, status 11.06, Launch 10.79, Reset 14.84;
light: caption 15.08, status 7.89, Launch 5.46, Reset 16.44, disabled Launch 5.46.
Touch targets: 271×48 at 1440×900, 131×57 at 320×844, 48 px minimum at 768×1024.
No horizontal overflow at 320/390/768/844/1440 and Reset always fully visible.
Reduced motion runs the short schedule (preparing 0.2 s → impact 0.21 → aftermath
0.45) and enabling it mid-flight cancels the run and announces ready immediately.

## M6 — Device performance and lifecycle

Read plan §§10–12. Files: targeted fixes in affected modules; no new test framework.

- [x] Verify one RAF owner, no effect timers, and no per-frame allocations of
      geometry/materials or React state updates.
- [ ] Warm up a production preview on the recorded physical device; measure
      three full sequences and Reset response with default scene settings.
- [ ] Record median/p95 frame intervals, quality tier, DPR, browser, viewport,
      and baseline scene cost. Tune measured bottlenecks within the visual contract.
- [x] Record geometry/texture/program/draw-call counts after warm-up and cycles
      5/10 in the same phase/view; inspect interrupted-reset cycles too.
- [x] Complete B7–B9 and B11–B12: double taps, background return, route exits,
      removed fault injection, and all reset phases.
- [x] Review cleanup for observers/listeners/pane microtasks/controls/resources;
      verify route re-entry and React development remounts leave one live scene.
- [x] Remove ad hoc diagnostics/globals and confirm no feature-caused console errors.
- [x] Rerun relevant tests/build after fixes. Physical-device evidence missing
      remains an explicit unfinished task, even if emulation passes.

**Evidence:** B7, B8, B9, B11 and B12 all pass (see table). Resource counts were
identical after warm-up, cycle 5, cycle 10 and interrupted cycles
(geometries 67, textures 19, programs 19, draw calls 25, one effect root, one
canvas, one controller). Temporary `window.__solarDiag` instrumentation and the
temporary construction-fault injection were both removed afterwards and the files
verified clean (`meteorExperiment.js` byte-identical to its pre-injection backup).
No feature-caused console errors.

Desktop production-preview timing (headless Chrome, macOS, 1440×900, DPR 1,
standard tier): baseline median 8.3 ms / p95 8.6 ms; three meteor sequences median
8.3 ms / p95 8.6–8.7 ms, worst frame 11 ms; Reset visible response 9 ms. The effect
is indistinguishable from baseline cost on this machine.

**Blocked:** no physical phone or tablet is reachable from this workspace, so the
required device benchmark is still outstanding. Per plan §12 this milestone is not
marked Done on emulated evidence alone.

## M7 — Final verification and documentation

Read plan §§11–14. Files: regression fixes, tracker, project knowledge, backlog.

- [x] Complete every required B1–B12 evidence row below; rerun changed areas.
- [x] Verify ordinary search/follow/zoom/tour after full reset and after re-entry.
- [x] Run `npm test`, `npm run lint`, `npm run build`; record results separately
      from planning-time or prototype results.
- [x] Inspect final diff for unrelated changes, dependencies, storage writes,
      hardcoded UI colours, and unused diagnostics.
- [x] Record implemented behavior and any accepted limitations in
      `docs/PROJECT_KNOWLEDGE.md`; record package/asset attribution if applicable.
- [ ] Remove the completed backlog idea #17 only once required evidence is present.
- [x] Update this header's milestone count/status and handoff notes accurately.

**Evidence:** `npm test` 544 tests, 543 pass, 0 fail, 1 pre-existing skip.
`npm run lint` clean, exit 0. `npm run build` succeeds with only the pre-existing
>500 kB chunk warning. Exploration regression (B10) verified after both full reset
and route re-entry. Final diff reviewed: no new dependencies, no storage writes, no
hardcoded UI colours in the new CSS, and no remaining diagnostics or globals.

**Blocked:** backlog idea #17 is deliberately *not* removed, because plan §13 only
allows that once all required acceptance evidence is present and the physical-device
benchmark is missing. It stays 🟡 Partial with the device check named as the gap.

## Decision register

Defaults are resolved so the builder can proceed. Change only with recorded evidence.

| Topic | Decision | Evidence / tuning still needed |
| --- | --- | --- |
| Stack | Installed Three.js 0.181.0 / Tweakpane 4.0.5; no added dependency | Source and lockfile inspected during planning. |
| Architecture | Pure timeline/simulation/geometry helpers + one imperative controller + existing page RAF | Implement M1/M2. |
| Earth fragments | Thick UV-correct sphere patches: low 16, standard 32; original Earth texture | M2 alignment check, M4 visual gate. |
| Motion | Freeze at launch; camera-relative staged path; analytical fragment motion; static final pieces | Camera constants require M3 browser tuning. |
| Reset | Full page-default scene; zero-time poses and original generated star/belt records; idle Overview remains camera-only | Defaults/reset table in plan §7. |
| Background tabs | Pause visible animation time; no catch-up | B8 pending. |
| Reduced motion | Short gentle/static alternative; enabling mid-flight resets safely | B6 pending. |
| Quality selection | Low for initial width <720 px or coarse pointer; tier fixed for mount | Device benchmark pending. |
| Optional additions | Audio, physics, bloom, imported model deferred | Reconsider only for a recorded unmet acceptance criterion. |
| Physical target | No device available through this workspace | Headless Chrome viewport checks are recorded below; physical-device benchmark remains pending. |
| Controller creation | **Deviation:** the controller is constructed lazily on the first accepted launch, not eagerly before the scene API is published | Plan §4 asks for eager creation but also permits lazy effect construction. Construction sits inside the launch error boundary, which disposes the partial controller, nulls it, shows the retry message and leaves exploration usable — so the observable contract (B11) is equivalent, and nothing is allocated until the learner uses the feature. B11 passes. |
| Particle rendering | Trail, dust and spark `PointsMaterial`s reuse the controller's existing owned `glowTexture` | Without a `map` they rendered as hard opaque squares (visible in the B1 light-theme before image). Reusing the already-owned texture fixed it with no new resource: counts stayed 67/19/19. |
| Particle rendering (visual pass) | Replaced `PointsMaterial` with one small `ShaderMaterial` carrying per-particle `aSize`, `aColor` and `aAlpha` | `PointsMaterial` allows only one size and one colour per system, which is what made the trail a uniform dotted line and the sparks flat. The shader keeps `gl_PointSize` in real pixels by reading the drawing-buffer height in `onBeforeRender`, so it is DPR- and viewport-correct. Adds one program; counts are stable at 68/22/20. |
| Added effects | Trail smoke system, screen-space motion-blur streak, contact heat spot, impact flash, second shockwave, procedural rock/smoke/shockwave textures | Plan §8 budgets were starting ceilings, not targets. One extra points system (trail smoke) and three canvas textures were added; measured cost is still indistinguishable from the baseline scene (median 8.3 ms). |
| Approach lighting | The single permitted extra light now rides in with the meteor, then relocates to the contact point and flashes | Plan §8 allows one extra light. Reusing it for both jobs gives the requested build-up of environmental illumination without exceeding the budget. Intensity had to be ~0.25 (not 11): the Sun is intensity 400 at ~25 units, so its local irradiance is under 1, and a close light with decay 2 blows out Earth at anything larger. |
| Shockwave form | Soft gradient texture on a plane, kept near the contact point | Hard-edged `RingGeometry` rendered as an opaque tan band that read as Saturn's rings encircling the planet. |
| Fragment shell | Inner radius 0.72 → 0.88, interiors lit grey-brown rock rather than emissive orange | The thick shell made the cut faces dominate as wide brown bands (worst on the 16-piece low tier, where it read as a wrapped parcel). Thinning the shell and letting the residual ember light model the rock keeps the blue/green crust the main read, which also resolves the rust-heavy note raised in M4. |

## Verification evidence

Use paths to screenshots/recordings in the agreed review location. Record actual
observations; “code looks right” or a unit-test pass is not browser evidence.

| Check | Status | Evidence / device / viewport / theme |
| --- | --- | --- |
| T1–T6 timeline and simulation | Done | `meteorTimeline.test.js` + `solarSimulation.test.js` pass, now including T3 split-vs-single delta equivalence with inert zero/negative/NaN/Infinity deltas, T4 reset from every phase with stale-run isolation, and T5 reduced-motion zero-duration entry order. |
| T7–T8 fragment geometry | Done | `meteorGeometry.test.js` both tiers: finite geometry, valid indices, nonzero-area faces, outward/inner/cap normals, plus new cross-patch shared-vertex seam test (latitude exact, longitude modulo one wrap) and exact half-texel pole UV bound. |
| T9–T10 path and framing | Done | New T9 uniform-scale homogeneity (r = 0.45/3/128.5) and arbitrary rotate+translate Earth fixture with 128 clearance samples each; new T10 projects Earth and 33 path samples inside the usable frame for 5 viewports × 3 reserved heights. |
| B1 full sequence / themes | Done | Headless Chrome 1440×900. Dark: phases at 0.28/1.42/4.87/5.92/8.22 s, [aftermath](evidence/b1-desktop-dark-aftermath.png). Light: [breaking](evidence/b1-light-breaking-before-dust-fix.png), [aftermath](evidence/b1-light-aftermath-after-dust-fix.png). Status and Reset legible in both. Earlier 390×844 dark run retained: [approach](evidence/solar-final-approach.png), [impact](evidence/solar-final-impact.png), [breakup](evidence/solar-final-breakup.png). |
| B2 all reset phases / defaults | Done | Reset returned ready from preparing, approaching, impact, breaking, aftermath and Escape, each within the next rendered frames, one canvas, focus back on Launch. Pane sweep: 10 edited settings (incl. Star Count 5000→900 and belt Count 4500→800, which reallocate GPU resources) all restored to §7 defaults. [Reset image](evidence/solar-final-reset.png). |
| B3 competing navigation / narration | Done | Launched mid-tour while narrating: `speechSynthesis.speaking` true→false, info card and hint removed, pane hidden, canvas cursor grab→default, experiment ran normally. Canvas click + wheel during the run selected nothing and did not change phase. All restored on reset. |
| B4 keyboard / focus | Done | Tab reaches Launch then Reset; Enter and Space both launch; focus moves to Reset on launch; Escape from the strip while active resets and returns focus to Launch; Enter on Reset resets; idle search Escape still only clears the query (scene untouched). |
| B5 viewport / resize matrix | Done | 320×844 (131×57 buttons, no overflow, [image](evidence/b5-320-aftermath.png)), 390×844, 844×390 ([landscape](evidence/solar-landscape-after.png)), 768×1024 (48 px min), 1440×900 (271×48). No overlap, no horizontal overflow, Reset always fully visible. Live resize during all five phases preserved phase and kept one canvas. |
| B6 reduced motion / preference changes | Done | Reduced schedule measured: preparing 0.2 s → impact 0.21 s → aftermath 0.45 s, ending in static fragments ([dark](evidence/b6-reduced-dark-aftermath.png), [light](evidence/solar-light-reduced.png)). Enabling the preference mid-flight cancelled the active run immediately and announced ready; the next launch used the reduced schedule. |
| B7 repeated inputs | Done | Five rapid Launch taps produced exactly one sequence (one effect root, one canvas, phase preparing). Double Reset in the same tick was harmless. Repeated launch/reset over 10 cycles left no duplicate group, loop or delayed debris. |
| B8 hidden-tab return | Done | Backgrounding via a second Playwright tab does **not** hide the page (0 visibilitychange events, RAF still ~60 fps), so the state the frame loop reads was driven directly instead. Hidden 16.2 s during approaching → returned still in approaching, no jump and no skipped impact. |
| B9 route exit / remount | Done | Exited to `/skills` during impact and aftermath and re-entered: off-route 0 canvases, 0 panes, cleanup ran, narration stopped; on return exactly one canvas, one pane, intact Earth, ready status, no JS errors and no post-disposal callbacks. |
| B10 exploration regression | Done | After a full cycle and reset: searched Earth and Moon (both cards correct), wheel and drag worked, guided tour stepped Mercury→Venus→Earth→Venus with working Next/Previous/Replay, launching from a running tour worked, and the tour restarted from stop 1 after reset. |
| B11 recoverable failure / retry | Done | Temporary construction fault injected: overview stayed usable (1 canvas, 1 pane, both buttons enabled), "That meteor did not launch. Try again." shown, no controller leaked. A second faulty attempt behaved identically and logged once per attempt, not per frame. With the fault removed the next launch ran the full sequence. Injection removed and file verified byte-identical to backup. |
| B12 repeated cycles / resources | Done | Geometries 67, textures 19, programs 19, draw calls 25 — identical after warm-up, cycle 5, cycle 10 and after interrupted cycles; one effect root and one canvas throughout. Re-verified unchanged after the particle-sprite fix. Earth texture still renders after all cycles. |
| Physical-device timing / Reset response | **Not run — blocked** | No physical phone or tablet is reachable from this workspace. Desktop production preview recorded instead (see performance record); this does not satisfy the plan §12 device requirement. |
| Final `npm test` | Done | 544 tests, 543 pass, 0 fail, 1 pre-existing skip. |
| Final `npm run lint` | Done | Clean, exit 0. |
| Final `npm run build` | Done | Succeeds; only the pre-existing >500 kB chunk warning. |

### Performance record

Desktop only. The physical-device row above remains outstanding.

- Device / OS / browser: Mac (darwin 25.6.0), headless Chrome via Playwright
- Build / viewport / DPR / tier: production preview (`vite preview`), 1440×900, DPR 1, standard
- Baseline scene median / p95 frame interval: 8.3 ms / 8.6 ms (max 9.4 ms)
- Meteor sequence median / p95, three runs: 8.3 / 8.6 ms, 8.3 / 8.6 ms, 8.3 / 8.7 ms (worst frame 11 ms)
- Reset visible response time: 9 ms (target ≤100 ms)
- Counts after warm-up / cycle 5 / cycle 10: 67 / 19 / 19 / 25 in every sample (geometries / textures / programs / draw calls)
- Screenshots: see the evidence table
- Result: comfortably inside the ≤33.3 ms median and ≤50 ms p95 targets, with no
  repeatable stall at breakup or Reset, and the effect cost indistinguishable from
  the baseline scene on this machine. Remaining limitation: no physical-device data.

### Milestone handoff template

- Milestone / date / status:
- Files and behavior changed:
- Checks performed and exact result:
- Browser evidence:
- Decisions/tuning changed from the plan and why:
- Remaining issue and next concrete task:

## Work log

- **2026-09-20:** Added backlog idea #17 and drafted the initial plan and tracker.
  Inspected the existing scene, camera reset, and scene-to-React bridge.
- **2026-09-20:** Expanded planning for a smaller implementing model. Verified
  source integration points and installed APIs; specified file/API boundaries,
  timing/reset/ownership contracts, a visual construction recipe, ordered tasks,
  and test/browser evidence requirements. Reordered milestones so timing and
  reset precede the visual prototype. No feature code or dependencies changed;
  implementation remains 0 of 7 milestones complete.
- **2026-09-20, planning validation:** Local documentation links and code fences
  checked; proposed approach clearance sampled across five aspect ratios;
  2,736 patch vertices/UVs compared with the installed source sphere. The current
  application `npm run build` passed with the existing >500 kB chunk warning.
  These are plan/baseline checks, not completion of implementation tests or any
  browser/device acceptance row above.

- **2026-09-20, verification pass (takeover):** Took over an implemented but largely
  unverified feature. Closed the pure-test gaps the tracker flagged: added T3 (split
  vs single delta), T4 (reset from every phase, stale-run isolation), T5 (reduced
  zero-duration entry order), T8 (cross-patch seam/topology and exact pole-UV bound),
  T9 (uniform scale and arbitrary Earth placement) and T10 (projection inside the
  usable frame). One over-strict assertion I wrote was corrected after measuring that
  the only UV overshoot is the half-texel pole offset the installed `SphereGeometry`
  uses — not a defect.

  Ran the browser matrix: B1–B12 all pass except the physical-device benchmark, which
  is unavailable here. Two harness traps were identified rather than mis-reported as
  product bugs — Playwright's tab switch does not background the page (so B8 was
  driven through the state the frame loop actually reads), and the Tweakpane root is
  `.tp-rotv`, not `.tp-dfwv`.

  One real defect found and fixed: particles rendered as hard squares because their
  `PointsMaterial`s had no `map`; they now reuse the controller's owned glow texture.
  Temporary `window.__solarDiag` instrumentation and a temporary construction-fault
  injection were added for B11/B12 and both removed afterwards, verified clean.

  Final: 543/544 tests pass (1 pre-existing skip), lint clean, build passes with the
  pre-existing chunk warning. M1–M5 Done; M6/M7 Blocked solely on physical-device
  timing, and backlog #17 deliberately left open for that reason.

- **2026-09-20, meteor visual pass:** Reworked the effect layer of
  `meteorExperiment.js` for a more cinematic approach, impact and aftermath, with
  no new dependencies and no change to the timeline, controller contract, reset or
  accessibility behaviour.

  Approach: the meteor is now a seeded irregular rock with a procedural surface
  instead of a faceted icosahedron; a tapered plasma trail runs from a white-hot
  head through orange to cooled ember; a screen-space stretched sprite fakes motion
  blur along the direction of travel; a smoke column drifts and widens behind it;
  the surface heats under the incoming rock; and corona, emissive, trail brightness
  and light intensity all ramp with proximity so the run builds.

  Impact: a brief white flash, two decelerating soft shockwaves, sparks with drag
  and fall-back, and an ejecta dust cloud that cools from warm to grey ash.
  Aftermath: a dim ember at the centre of the debris keeps lighting the pieces.

  Tuning was driven by screenshots, and several first attempts were wrong and were
  corrected: the corona and heat spot initially merged into a white blob that
  swallowed the rock; the point light was ~400× the Sun's local irradiance and blew
  out Earth; the shockwaves read as Saturn's rings; and an early raise of the
  fragment interior emissive made the aftermath worse, not better, before the shell
  was thinned instead.

  Re-verified: 543/544 tests pass, lint clean, build passes with the pre-existing
  chunk warning; resources flat at 68 geometries / 22 textures / 20 programs across
  warm-up, cycles 3 and 6 and interrupted cycles, one effect root and one canvas;
  reduced motion still reaches static pieces in 0.47 s with no trail, sparks or
  shockwave; production-preview frames unchanged at a median 8.3 ms with Reset
  visible in 2.1 ms. Evidence: [approach](evidence/v2-approach.png),
  [impact](evidence/v2-impact.png), [aftermath](evidence/v2-aftermath.png),
  [reduced motion](evidence/v2-reduced-motion.png),
  [phone low tier](evidence/v2-phone-approach.png).
