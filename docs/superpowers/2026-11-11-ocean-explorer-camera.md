# Ocean Explorer: second camera

Date: 2026-11-11. Added to the existing Ocean Explorer branch and its in-progress
immersive-world changes.

The later [detailed 3D cockpit](2026-11-11-ocean-explorer-3d-cockpit.md) replaces
this record's initial CSS dashboard. This record retains the camera-toggle
implementation and its original verification results.

## Implemented

- C toggles the outside camera and a simple forward-facing submarine cockpit,
  matching Solar System's camera shortcut. A Controls-menu button offers the
  same switch on touch devices. The shortcut ignores held-key repeats, modified
  shortcuts, composition and editable fields, and is removed on unmount.
- A curved porthole frame, compact dashboard, two dials and decorative sonar
  suggest the owner's reference images. These are static, non-interactive
  instruments, not live depth or animal readings. They use existing paired ocean
  theme tokens and leave the driving controls available.
- A separate 65-degree camera follows the submarine's local forward direction,
  including turns, ascent/descent, tours and discovery orbits. The outside
  camera continues tracking so switching back preserves its chosen angle.
  The hull is hidden only during cockpit rendering; no interior model, external
  assets, saved preferences or progress changes are included.
- Both camera projections resize. Switching views redraws paused/reduced-motion
  scenes immediately without starting an animation or changing the craft's pose.

## Verification and review

- New behavioural checks cover shortcut/menu switching, repeat and typing
  guards, cleanup, forward camera pose, hull visibility, outside-view restoration,
  turning/rising, portrait resize, return to start and paused tour orbit.
- Before this change, the Ocean component suites had 67 failures out of 70
  checks. Their setup lacked router context for the new Back link and a GPU
  stand-in for the environment-light bake. Updated that setup and obsolete
  preview assertions. Bounded old scene-test travel waits and compare porthole
  object IDs to avoid hanging or serialising entire Three.js scenes on failure.
- Full lint and affected follow-up lint pass. Production build passes with 70
  public pages prerendered; existing mixed JSON import-attribute and chunk-size
  notices remain. `git diff --check` passes.
- Ocean suites: 71 of 74 checks pass, including all 16 page/input checks and all
  three new scene-camera checks. Three earlier model checks still fail: cleanup
  expects two instanced meshes instead of the current 51; the porthole raycast's
  first-hit assertion no longer matches the updated submarine; a turtle loop
  comes within 4.94 units of the earlier change's farther-back starting camera
  against a five-unit assertion. These are separate from the new cockpit.
- `npm test`: 2,849 unit checks pass, four skip and eight fail. Five failures
  cannot bind a local HTTP listener in the sandbox; the other three are existing
  Year 6 English lesson/story-content checks. Component checks were run
  separately because `npm test` stops at the unit failures.
- Remaining component suites: 107 files / 952 checks pass (including the Ocean
  page suite). Combined with the separately completed Ocean scene suite, all
  108 component files were exercised: 1,007 checks pass and the three model/
  framing checks above fail. No complete green merge/release check is claimed.
- Content: no discovery facts or learning content changed. Instruments are
  decoration only. No child/owner review is claimed.
- Browser/device: unavailable in this session (no browser/Node REPL control
  tools). Actual WebGL appearance, porthole/dashboard layout in both themes,
  physical touch use and performance still need visual review.
