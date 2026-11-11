# Ocean Explorer: detailed 3D cockpit

Date: 2026-11-11. Builds on the [camera toggle](2026-11-11-ocean-explorer-camera.md).

The owner clarified that the futuristic-submarine prompt describes the cockpit
to implement in the app. The earlier generated concept is not an app asset.

## Implemented

- Replaced the small CSS dashboard with a camera-local Three.js cabin:
  bevelled oval pressure bulkhead, metal trim and fasteners, shallow curved
  glass, caged lamps, overhead controls, three telemetry screens, banks of
  switches, round gauges, guarded rockers, twin flight-style joysticks with
  articulated grips and rubber boots, and paired throttle levers.
- Physical materials provide painted metal, reflective steel, rough grips and
  clear-coated glass. Warm amber and cool cyan local lights illuminate the
  interior. Eight paired light/dark theme tokens define its palette.
- The main windshield is open to the existing live ocean, with faint glass
  tint/reflections. C and the Controls menu retain the outside/cockpit switch.
  The cabin uses a dedicated render layer, appears only in cockpit rendering,
  and stays attached through driving, tours and discovery orbits.
- Telemetry textures show scene-relative depth and heading, drive commands and
  nearby visible discoveries within 30 scene units. Contacts use actual scene
  positions; no invented oxygen, fuel or pressure readings are shown. Sticks
  and throttle levers follow the existing input. Other switches and gauges
  remain decorative; keyboard and touch driving controls own interaction.
- The cabin is created once, on first use. Fixed furniture is batched by
  material, fasteners are instanced and three owned 256 × 160 data textures
  refresh only when values change, at most five times per second. Its motion
  uses the existing scene loop; no new timers or animation loop were added.
- Portrait framing keeps the central display and both joystick heads in view;
  the outer side consoles may crop. Existing touch controls and menus remain
  above the cabin. No progress, persistence, species, facts or ocean-world
  boundaries changed. This is a detailed lit game interior, not a claim of an
  engineering-certified submarine simulation or verified photorealism.

## Validation and review

- Five pure geometry/resource tests pass: open central sightline, finite
  geometry and fewer than 100 rendered meshes, live grip articulation,
  bounded telemetry/contact updates, portrait/wide joystick projection,
  theme refresh and one-time texture disposal.
- All 16 Ocean page/input tests pass. The existing camera playthroughs also
  check lazy interior creation, cabin visibility during the render, outside
  view restoration, drive/resize/tour following and scene-owned texture cleanup.
- All three affected camera scene playthroughs pass on isolated rerun (7.11 s).
  The first concurrent run hit the five-second limit in two tests while unit/
  build work was running; there were no failed behaviour assertions.
- Full lint and production build pass; 70 public pages prerendered. The build
  retains the existing City Spotlight JSON import-attribute and chunk-size
  notices. `git diff --check` passes.
- `npm test` reports 2,854 unit passes, four skips and the same eight baseline
  failures: five local-listener tests blocked by the sandbox and three English/
  story-content checks. The 16 page tests and three camera scene checks ran
  separately because the unit failures stop `npm test` before components.
  The broader component sweep was not repeated for this follow-up; its earlier
  three model/framing failures remain recorded in the camera-toggle report.
  A fully green merge/release check remains outstanding.
- Content review: no discovery or curriculum content changed; telemetry is
  derived from the illustrative game world. No physical-device or child review
  is claimed.
- Browser review: no browser or Node REPL control tools are available in this
  session. Real WebGL lighting, materials, reflection/shader behaviour, screen
  legibility, both themes, overlay layout and frame rate remain visually
  unverified. Geometry projection and automated checks do not close that gap.
