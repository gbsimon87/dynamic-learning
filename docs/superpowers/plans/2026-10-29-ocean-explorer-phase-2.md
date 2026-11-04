# Ocean Explorer — Phase 2 (manual steering) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

Date: 2026-10-29  
Status: Implemented and verified on 2026-10-29.

**Goal:** Children drive the existing submarine around the existing scene with forgiving keyboard and touch controls.

**Architecture:** Reuse Solar System's flight controls: `steerInput`/`stickVector` (`flightControls.js`), the same scheme (joystick or arrows/WASD steer, hold GO or Space to move), Solar's key normalisation and its joystick/GO pointer handling. `solarFreeFlight.js` and `solarFlightCamera.js` are not reused: they are bound to planets, trips and orbits, and the Solar chase camera replaces drag-to-look. A pure steering module (`oceanSteering.js`) owns movement maths and limits. `oceanScene.js` runs it inside the existing animation loop and turns the camera into a chase view that keeps the child's chosen viewing angle relative to the submarine. The page maps keys and a new on-screen pad (`OceanDriveControls.jsx`) to one steering input.

**Tech Stack:** React, plain CSS, Three.js + OrbitControls (existing), `node:test` for pure modules, Vitest + Testing Library for components.

**Spec:** [Ocean Explorer design](../specs/2026-10-29-ocean-explorer-design.md), Phase 2 row: “Drive around that same scene with forgiving keyboard and touch controls.”

## Global Constraints

- Same scene: no new scenery, animals, discoveries, cards, tours, map, area travel, cockpit or saved state.
- No timers, fuel limits, damage or penalties. Bumping the seabed, surface limit, area edge or a rock stops or slides the craft gently.
- Keep cameras calm: no compulsory bobbing, shake or automatic camera swings. Camera follows rigidly in the submarine's frame.
- Same controls as Solar System free flight, so children already know them. Joystick/arrow up = rise, down = dive (Solar's pitch). No reverse; letting go of GO coasts to a stop.
- Keyboard access on the focused canvas; no document-wide key handlers. Controls ≥ 48 CSS px, paired `--light-*`/`--dark-*` theme colours.
- Water motion stays optional (Pause water, reduced motion). Steering is child-initiated and runs regardless of water pause or reduced motion; the idle scene still does not render continuously when water is paused.
- No new dependencies or assets. No commits unless the owner asks.
- Listing and public guide stay labelled prototype preview and describe only what exists.

## Review Focus

1. **Stuck keys** — the canvas loses focus (Tab away, window switch) while a key is held: the submarine must coast to a stop, not keep driving. Test in Task 3.
2. **Sub near the surface or seabed** — camera must stay under the surface and above the sand at every zoom and angle while the craft is at its height limits. Test in Task 2.
3. **Hidden tab while driving** — loop stops; returning must not jump the craft forward by the hidden duration. Test in Task 2 (dt clamp already 0.1 s).
4. **Lost touch** — finger slides off the pad or the pointer is cancelled: input returns to zero. Test in Task 3.
5. **Driving into a rock** — craft never passes through the rock’s footprint at hull height. Test in Task 1.

---

## File Structure

| Action | File | Responsibility |
|---|---|---|
| Create | `src/pages/skills/geography/oceanSteering.js` | Pure steering state, easing and limits |
| Create | `src/pages/skills/geography/oceanSteering.test.js` | `node:test` unit tests |
| Modify | `src/pages/skills/geography/oceanEnvironment.js` | Export rock `obstacles` |
| Modify | `src/pages/skills/geography/oceanSubmarine.js` | Named `ocean-propeller` group |
| Modify | `src/pages/skills/geography/oceanScene.js` | Steering loop, chase camera, shadow refresh, new API |
| Create | `src/pages/skills/geography/OceanDriveControls.jsx` | Joystick + GO, adapted from `SolarFlightControls.jsx` |
| Modify | `src/pages/skills/geography/OceanExplorer.jsx`, `.css` | Key mapping, pad, Back to start, copy |
| Modify | `tests/components/oceanScene.test.jsx`, `oceanExplorer.test.jsx` | Steering/camera/page coverage |
| Modify | `shared/skillGuides.js` | Guide copy for steering |
| Update | spec status, `PROJECT_KNOWLEDGE.md`, `PROJECT_IDEAS.md` #44, this plan | Record delivery |

---

### Task 1: Pure steering

**Files:** Create `oceanSteering.js`, `oceanSteering.test.js`; modify `oceanEnvironment.js`.

**Interfaces:**
- Produces:
  - `STEERING` constants: `maxSpeed 4`, `acceleration 3`, `drag 2.5`, `turnSpeed 1.1` (rad/s), `turnEase 4`, `liftSpeed 1.8`, `liftEase 4`, `areaRadius 22`, `floorClearance 1.5`, `maxHeight 5.5`, `hullRadius 1.5`, `hullDepth 1.1`.
  - `createSteeringState({ x, y, z }, yaw = 0)` → `{ position: {x,y,z}, yaw, speed: 0, turn: 0, climb: 0 }`.
  - `stepSteering(state, input, seconds, world)` → new state (input `{ turn, throttle, lift }`: turn/lift −1..1, throttle 0..1; `world { floorHeight(x,z), obstacles: [{x,z,radius,top}] }`). Forward is `(-sin yaw, 0, -cos yaw)`; positive `turn` turns right (yaw decreases).
  - `isSteeringIdle(state, input)` → true when input is zero and speed/turn/climb are all below 0.001.
  - `environment.obstacles` from `createOceanEnvironment`: one entry per rock, `radius = max(scaleX, scaleZ)`, `top = y + scaleY`.

- [x] **Step 1: Write failing tests** (`node:test`, `assert`):
  - `accelerates gently toward max speed and coasts to a stop` — throttle 1 for 0.5 s gives 0 < speed < `maxSpeed`; 10 s gives speed ≈ `maxSpeed`; then 10 s zero input gives `isSteeringIdle` true.
  - `turning right moves the craft toward +x` — throttle 1, turn 1 for 2 s from yaw 0: position.x > 0, yaw < 0.
  - `stays above the seabed, below the height limit and inside the area` — lift −1 for 10 s ⇒ y ≥ floorHeight + `floorClearance` − 1e-9 and climb 0; lift 1 ⇒ y ≤ `maxHeight`; throttle 1 for 60 s ⇒ hypot(x,z) ≤ `areaRadius` + 1e-9.
  - `bumps softly off a rock instead of passing through` — rock `{x:0, z:-6, radius:1, top:2}` straight ahead at y 1; after 10 s throttle, distance to rock centre ≥ 1 + `hullRadius` − 1e-6; above `top + hullDepth` the same rock does not block.
  - `turns on the spot without thrust` — turn 1, throttle 0 for 1 s: yaw changes, position unchanged.

- [x] **Step 2:** `node --test src/pages/skills/geography/oceanSteering.test.js` → FAIL (module missing).
- [x] **Step 3: Implement.** Ease each of speed/turn/climb toward its target with `approach(current, target, rate * seconds)`; rate is `acceleration` while throttle is held, `drag` otherwise. Clamp horizontal radius, then push out of obstacles where `y - hullDepth < top`, halving speed on contact; then clamp y and zero `climb` at a limit. Add `obstacles` to the environment return.
- [x] **Step 4:** test → PASS.

### Task 2: Scene steering and chase camera

**Files:** Modify `oceanScene.js`, `oceanSubmarine.js`, `tests/components/oceanScene.test.jsx`.

**Interfaces:**
- Consumes: Task 1 exports and `environment.obstacles`, `oceanFloorHeight`.
- Produces scene API: `{ resetView, setWaterPaused, handleViewKey, setSteering(input), returnToStart(), dispose }`.
  - `handleViewKey` now handles **Shift+arrows** (look around), `+`/`−`/`=`, `Home`; plain arrows return `false` (they steer).
  - `setSteering({ turn, throttle, lift })` starts the loop if needed.
  - `returnToStart()` restores the start pose `(0, 3, 0)`, yaw 0, zero motion, and resets the view.
- Submarine: blades and hub inside a `THREE.Group` named `ocean-propeller`; `rotation.order = 'YXZ'`.

- [x] **Step 1: Update/write failing tests**
  - Existing angle tests switch to `{ key: 'ArrowDown', shiftKey: true }` etc.; `handleViewKey({ key: 'ArrowLeft' })` returns `false`.
  - `drives the submarine and keeps the camera behind it` — water paused (reduced motion); `setSteering({turn:0, throttle:1, lift:0})` queues one frame; ticking ~2 s moves the submarine along −z; camera-to-submarine offset in the submarine’s yaw frame is unchanged; renderer `shadowMap.needsUpdate` set true after moving; propeller rotation changed.
  - `stops the loop once the craft is idle while water is paused` — after zero input and enough ticks, `harness.frames.size === 0`.
  - `keeps the camera under the surface and above the sand at the height limits` — drive to `maxHeight`, zoom out fully, Shift+ArrowUp ×80: camera.y < surface − 0.5; dive to the floor, Shift+ArrowDown ×80: camera.y > `oceanFloorHeight(camera.x, camera.z)`.
  - `does not jump after a hidden tab` — hide during driving, tick at +50 s after showing: travel < `maxSpeed * 0.2`.
  - `returnToStart restores pose and view`.
- [x] **Step 2:** `npx vitest run tests/components/oceanScene.test.jsx` → FAIL.
- [x] **Step 3: Implement.** Keep a user-chosen `viewOffset` in the submarine’s yaw frame; update it only from user view changes (controls `change`, keys, reset). Each steering frame: step state, apply pose/pitch (`climb / liftSpeed * 0.12`), spin propeller by speed, set `target` from the model’s bounds centre in local space, place camera at `target + rotateY(viewOffset, yaw)`, constrain (surface ceiling, and a minimum camera height above the sand), set shadow `needsUpdate`, draw. Loop runs while `!paused || !isSteeringIdle`; steering frames run at display rate, water-only frames keep the 30 fps cap; `dt` clamped to 0.1 s.
- [x] **Step 4:** test → PASS.

### Task 3: Page controls

**Files:** Create `OceanDriveControls.jsx`; modify `OceanExplorer.jsx`, `OceanExplorer.css`, `tests/components/oceanExplorer.test.jsx`.

**Interfaces:**
- Consumes: scene API from Task 2; `steerInput`, `stickVector` from `flightControls.js`.
- Produces: `<OceanDriveControls onStick={(x, y) => …} onThrust={(on) => …} />` — Solar's joystick + GO markup and pointer handling (pointer ids, capture, cancel/lost-capture release), ocean-scoped classes. Joystick bottom-left, GO bottom-right, inside the scene container, shown only when ready. GO is a real button (Space/Enter hold, as in Solar); the joystick group has keyboard equivalents on the canvas.

- [x] **Step 1: Failing tests**
  - `steers from held keys and releases them on blur` — Space keydown ⇒ last `setSteering` `{turn:0, throttle:1, lift:0}`; `d` ⇒ turn 1; ArrowUp ⇒ lift 1; key repeat ignored; keyup Space ⇒ throttle 0; blur ⇒ all zero.
  - `Shift+arrows look around instead of steering` — `handleViewKey` mock returns true for shiftKey; `setSteering` not called.
  - `joystick and GO drive the scene and release on pointer up/cancel`.
  - `Back to start calls returnToStart`; disabled until ready.
  - Routed catalogue test still passes.
- [x] **Step 2:** `npx vitest run tests/components/oceanExplorer.test.jsx` → FAIL.
- [x] **Step 3: Implement.** Page keeps a key `Set` (Solar's normalisation: single characters lower-cased, repeats ignored) and stick/thrust refs, and sends `{ turn: x, lift: y, throttle }` from `steerInput(stickX, stickY, keys)` plus Space/GO on each change. Copy:
  - Intro: “Drive the submarine around the seabed and take a look around.”
  - Help: “**Drive:** steer with the joystick, or the arrow keys or W A S D. Up rises and down dives. Hold GO or Space to move; let go to slow down. **Look around:** drag to turn the view; pinch or scroll to zoom.”
  - Keyboard details: “Tab to the viewing area. Arrow keys or W A S D steer, and holding Space moves. Hold Shift with the arrow keys to look around, + and − to zoom, and Home to reset the view.”
  - Canvas fallback text drops “stationary”.
  Buttons: Pause/Resume water, Reset view, **Back to start**.
- [x] **Step 4:** test → PASS.

### Task 4: Guide, docs, verification

- [x] Update `shared/skillGuides.js` `ocean-explorer`: describe driving and looking around; drop “no steering”; keep “no animals, lessons or tours yet”. Practice items: `Steering and direction`, `Changing a viewpoint`.
- [x] `npm run lint`, `npm test`, `npm run build` pass.
- [x] One batched browser pass (canvas + touch layout): 390×844, 844×390, 768×1024, 1280×900 in both themes — drive with keys, joystick/GO overlap with the craft, rise/dive limits, Back to start. Fix, then at most one more pass. Report anything unchecked; physical devices remain unverified.
- [x] Update spec status, `PROJECT_KNOWLEDGE.md` Ocean Explorer section, idea #44, and mark this plan.

## Completion criteria

- Children can drive, turn, rise and dive with keys or the on-screen joystick and GO, and can always get back to the start.
- The craft cannot leave the area, go through the seabed or rocks, or reach the surface; nothing punishes bumping.
- The camera follows calmly and keeps the child’s chosen angle; Reset view and Home still work.
- Pause water/reduced motion still stop ambient motion; no idle render loop.
- Lint, tests, build pass; listing and guide stay accurate.

## Verification results — 2026-10-29

- `npm run lint`, `npm test` (2,477 unit passes, four database skips; 643
  component passes) and `npm run build` (51 prerendered pages) pass.
- One batched Chrome pass (software WebGL) on the production preview at
  390×844, 844×390, 768×1024 and 1280×900 in both themes: no page errors or
  horizontal overflow; joystick/GO show on touch/small screens only and sit
  clear of the craft. With water paused, real mouse input on the joystick/GO
  (390 wide) and held keys (1280 wide) moved the submarine, it coasted to a
  stop, and the idle canvas stopped rendering. Screenshots were inspected.
- Back to start restores the pose and view; the propeller keeps its last angle.
- Not checked: physical phone/tablet touch and performance, multi-touch
  (stick + GO at once) on real hardware, screen readers. `check:seo` was not
  re-run; only guide copy changed and the build prerendered the guide.
