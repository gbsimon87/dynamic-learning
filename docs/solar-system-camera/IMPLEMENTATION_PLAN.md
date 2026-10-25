# Solar System camera choices — implementation plan

Prepared 2026-10-25 for [roadmap idea #38](../SOLAR_SYSTEM_IDEAS.md).
Status: implemented 2026-10-25 for the two confirmed views. “Watch from outside,”
physical-device checks and child playtesting remain open.

## Intended experience

Offer two clearly named views: **Behind rocket** and **Cockpit**. Behind rocket
is the default, with the rocket close enough to feel like the child's vehicle
throughout acceleration, ordinary flight, Turbo, turning and braking. Cockpit
looks forwards from the rocket with a light window surround and shallow dashboard.
The same worlds, destinations, clues and controls work in both.

Confirmed scope:

- Make both views available in manual flight and during autopilot/tour journeys.
- Use a simple cockpit surround rather than a detailed walkable 3D interior.

Recommended behaviour:

- Retain normal planet framing at autopilot arrival, so children can explore the
  destination and read its card. The chosen view resumes on the next journey.
- Keep the choice in page memory. A new page visit starts Behind rocket.
- The catalogue's third choice, “watch from outside”, is a later feature. Record
  #38 as partial when these two choices ship; do not mark the whole idea complete.

## What the current code tells us

`solarFreeFlight.js` uses a rocket at scale 0.3 and requests a camera position
2.2 units behind it and 0.7 above it. However, the camera eases towards that
moving world position with `1 - exp(-6 * dt)`. The camera therefore falls
further behind as speed increases. Reducing the 2.2 offset alone cannot fix it.

A local Node/Three.js reproduction used the actual flight module, an unobstructed
flight, 180 updates at 1/60 second and the current speed settings:

| Motion setting | Ordinary thrust: camera-to-rocket | Turbo: camera-to-rocket |
|---|---:|---:|
| Normal motion | 13.58 scene units | 35.76 scene units |
| Reduced motion | 2.56 scene units | 2.56 scene units |

These are reproduction measurements, not browser screenshots or device results.
The regression tests now cover normal motion at 30/60/120 Hz and both normal and
Turbo thrust, in addition to reduced-motion behavior.

Autopilot has a different camera implementation in `autopilotShip.js`: its
chase offset is 5.5 rocket lengths, then it blends into destination framing.
Its rocket also changes scale with destination size. It needs consistent
framing rules, but does not have the same world-position easing defect.

`SolarSystem.jsx` coordinates several existing camera owners: free flight,
autopilot, overview/follow, warp-in, meteor, constellations, size line-up and
Pale Blue Dot. Camera ownership and handovers are a central integration concern.

## Visual design

### Behind rocket

- Carry the camera with the rocket's actual displacement each frame, including
  bumper corrections, before smoothing its relative following offset. Reset the
  displacement history on enter, home, teleport and ownership changes.
- Smooth turns and the relative camera offset with bounded, frame-rate-aware
  damping. Maintain a stable world-up direction and avoid sudden rolls.
- Bring the resting camera closer too. Tune from a visible silhouette target:
  initially about 10–14% of scene height, excluding exhaust and invisible hit
  geometry. This is a first visual target, to be checked against real screenshots.
- Keep size broadly constant from rest through full Turbo. Convey speed through
  the existing scene movement, exhaust and pooled streaks.
- Frame the rocket near the lower centre, above the controls, with space ahead
  for the destination. Check the usable area after HUD/control placement on
  portrait and short landscape screens; pixel size alone is insufficient.
- Resolve camera obstruction after deriving the desired pose. World clearance
  can override preferred framing; prevent that correction from causing repeated
  bouncing or pushing the camera through a neighbouring body.

### Cockpit

- Put the viewpoint at a consistent forward-facing seat/nose anchor, derived
  from the rocket pose and scale. Aim along the travel heading with stable up;
  allow steering while stationary without introducing roll or head bob.
- Hide the active rocket's exterior, flame and tap target from this view. Keep
  the ship simulation and collision reference alive. Integrate this with the
  modules' visibility updates so the hull cannot reappear next frame.
- Build an original, lightweight CSS/SVG window surround and low dashboard.
  Keep the centre clear; decorative elements have no pointer handling and are
  hidden from assistive technology. No new renderer, textures or asset pipeline.
- Reuse real existing flight information only if useful, such as destination or
  Turbo state. Avoid redundant gauges, small text and decorative flashing.
- Keep the surround clear of joystick, GO and Turbo controls on
  touch-sized/coarse-pointer screens. Hide those touch controls on desktop, where
  arrows/WASD steer, Space flies and Shift boosts.
  In a short landscape viewport, reduce decoration before sacrificing space.
- Validate the cockpit anchor and near-plane clearance against planets, moons
  and the Sun. Avoid solving clipping by placing the camera in front of the
  collision protection. Preserve the existing near/far settings unless measured
  evidence requires a change.
- Reuse Turbo streaks outside the window; review their intensity in this view.
  Honour reduced motion: no streaks, shake, bob, animated banking or view swoop.

### Choosing a view

- Provide one compact, labelled two-choice control with 48px minimum targets,
  visible selected state, keyboard operation and accessible pressed state.
- Keep it readily available during flight, with a stable position and no overlap
  with Back, tour navigation, the clue panel or the touch controls. Do not add
  another top-level activity to the already constrained mode toolbar.
- Use the same selection state for manual flight and autopilot. Update it
  immediately; do not wait for the periodic flight-status callback.
- Switching view preserves position, heading, velocity, selected destination,
  clue, stars and arrival dwell. A held pointer/key must still release correctly;
  returning keyboard focus to the flight surface must not leave thrust stuck.
- Use a brief bounded transition when normal motion permits it. Conceal the
  exterior before entering it, and reveal it only when the outgoing viewpoint
  clears it. Reduced motion changes view immediately. No transition travels
  through a planet or interpolates through the hull visibly.
- App overlays follow the existing light/dark tokens. The scene remains space
  at night. Keep cockpit decoration legible without obscuring the view.

## Implementation structure

Keep movement, rewards and camera presentation separate:

| Area | Proposed responsibility |
|---|---|
| `solarFlightCamera.js` (new) | Shared camera pose/framing helpers, relative chase damping, cockpit anchor, transition state and reset logic; independently testable with Three.js in Node. |
| `solarFreeFlight.js` | Retain steering, speed, collisions and arrival logic; supply final ship pose/displacement to camera helpers and expose a view setter. |
| `autopilotShip.js` | Retain route, scale and arrival logic; use the shared flight-view helpers during journeys and preserve the destination handover. |
| `SolarCameraChoices.jsx` / `.css` (new) | Reusable accessible view control, scoped styles and selected state. |
| `SolarCockpit.jsx` / `.css` (new) | Decorative responsive window/dashboard, with no independent simulation or input handling. |
| `SolarFlightControls.jsx` / `.css` | Integrate the chooser with the compact manual-flight HUD. |
| `SolarSystem.jsx` | Page-level selection, active-flight visibility and small wiring changes between the existing owners. |

These names are proposed seams, not a requirement to create empty abstractions.
Keep camera calculations out of the already large page effect. A new scene
controller, if needed, must use `solarModules.js` lifecycle hooks.

There must be **one camera writer per frame**. Shared helpers are called by the
current flight owner; do not add an independently running camera controller
that competes with it. Audit module order and UI visibility during handovers.

Retain the existing single renderer and animation clock. Allocate reusable
vectors/quaternions outside the update loop; dispose any new owned resources.
Do not change dependencies or stored preferences/progress for this feature.

## Lifecycle decisions

| Situation | Expected behaviour |
|---|---|
| Open manual flight | Use the current page choice; save the incoming camera/control state. |
| Release thrust / reach a clue target | Remain in the chosen view; existing braking and rewards work. |
| Back to Earth | Keep the chosen view; reset camera history as well as ship/input state. |
| Exit manual flight | Remove cockpit decoration, restore the saved camera/control state and show the normal scene rocket. |
| Tap/search a world or start a tour leg | Use the selected journey view; show its chooser while the camera is owned by flight. |
| Tour countdown | Retain the existing Earth/countdown framing; activate the selected journey view on departure. |
| Autopilot arrival | Blend safely into existing planet framing and hide cockpit decoration; retain the choice for the next leg. |
| Skip/drag/cancel autopilot | End the flight view and follow the existing landing/cancel behaviour. |
| Reduced-motion autopilot | Retain the existing parked-ship/planet-glide path; do not introduce a cockpit ride. |
| Reset, meteor, constellation sky, line-up, Pale Blue Dot, unmount | Release flight presentation and resources; the other mode retains its own camera. Reset restores the default view. |
| Resize / rotate | Recompute framing and decoration without resetting flight or the adventure. |

Capture and restore every camera/control property the new feature actually
changes, including projection settings if introduced. Restore the pre-flight
pose on exit, not the pose immediately preceding a view switch.

## Build sequence and evidence

The two selected camera views are implemented. `solarFlightCamera.js` applies
each frame's actual ship displacement before easing the relative chase offset;
the behind-rocket offset is closer, and cockpit has a stable forward camera with
a lightweight responsive overlay. The page-memory selection is shared between
manual flight and autopilot/tours. Arrival returns to planet framing and restores
the selected flight view on the next journey. “Watch from outside” is deliberately
still pending.

1. **Fix and prove camera following first.** Completed. Parameterise the existing test fixture
   for normal/reduced motion. Reproduce the increasing gap, then fix translation
   tracking and tune a closer chase profile. Exercise ordinary flight, Turbo,
   braking, turns and camera obstruction without cockpit UI in the way.
2. **Complete a manual cockpit slice.** Completed. Implement the shared view state, chooser,
   forward camera and responsive surround. Prove switching while flying and
   stationary, input cleanup, target arrival, Home and exit restoration.
3. **Apply the views to autopilot/tours.** Completed. Reuse the camera helpers, account for
   variable ship scale, and handle takeoff/arrival/cancellation. Explicitly check
   the tour card and special-mode boundaries.
4. **Run automated checks before visual inspection.** Completed. `npm run lint`,
   `npm test` and `npm run build`. Add meaningful regression coverage listed below.
5. **Make one batched local browser pass if tooling is available.** Completed. Used the
   existing `scripts/checkSolarUi.js` approach, extending it for camera views.
   Review captures and motion, fix issues, then make at most one confirming pass.
6. **Update both project documents.** Completed. Recorded exactly what shipped and what remains
   unverified. Keep the third camera idea, physical-device checks and child
   playtests open where applicable.

### Automated regression coverage

- Chase distance and projected rocket silhouette stay bounded through full
  ordinary/Turbo acceleration in normal motion. Compare against reduced motion.
  Test 30/60/120 Hz and irregular accepted frame deltas, allowing an initial
  bounded transition and intentional obstruction corrections.
- Stationary steering, turns, braking and sudden bumper corrections keep the
  camera finite, facing the intended direction and outside world surfaces.
- Both views preserve movement/arrival outcomes. Switching during an arrival
  dwell neither clears its progress nor awards a duplicate discovery.
- Camera/view transitions reset correctly after home, enter/exit and cancellation.
  Selected view and visible decoration cannot drift apart.
- Cockpit has stable forward/up vectors, no visible own hull, and valid clearance
  near the smallest moon as well as the largest body.
- Autopilot supports small/large destinations, moving targets, arrival callbacks,
  cancellation and skip exactly once. Its end pose still matches normal follow.
- React component tests cover view selection/labels, focus, held-pointer release,
  keyboard input, reduced motion, and existing clue/collection behaviour.
- Exit/unmount restores affected camera/control properties and disposes resources.
  Repeated entry does not duplicate listeners, overlays or scene objects.

### Browser review matrix

The batched browser pass used both themes at 1280×900, 619×756, 390×844 and
844×390, with zero page/module errors. Manual flight captured both views at each
viewport/theme combination, including movement and Turbo; screenshots were
reviewed for framing and HUD/control overlap. Autopilot view switching and
arrival were checked at 1280×900 in light theme. Reduced-motion camera behavior
is covered by automated tests; reduced-motion browser screenshots, autopilot
across the full viewport/theme matrix, exhaustive tours/close approaches, and
real-device checks remain open. The existing scene still uses one renderer.

The local browser pass does not verify physical touch or phone performance.
Check real-device comfort and two-finger
steering/view changes, then a short child playtest for finding and understanding
the two views before declaring those gates complete.

## Acceptance criteria

- The rocket remains clearly close at ordinary and Turbo speeds, without
  accumulating translation lag or covering the destination.
- Cockpit feels like travelling inside the rocket, keeps most of space visible
  and works with the same forgiving controls and activities.
- View changes are predictable, reversible and preserve the flight/adventure.
- Autopilot/tour handovers and other scene modes retain correct camera ownership.
- Both themes, portrait/landscape, keyboard and touch-sized controls are covered.
- Lint, tests and build pass; visual and physical-device evidence is reported
  separately, with no claim that code-only checks prove the experience.
