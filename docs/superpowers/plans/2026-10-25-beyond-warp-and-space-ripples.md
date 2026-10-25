# Warp to Beyond (#113) and Space ripples (#94) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Children leave the Solar System through a pretend black-hole warp, choose Space ripples, watch two black holes merge on a glowing grid, and come home to the overview.

**Architecture:** Pure timing and data files (node-tested) drive two Three.js scene modules, `beyondWarp.js` and `spaceRipples.js`. Each has its own scene and camera, drawn instead of the Solar System, following `lineUp.js` (#62). A controller module, `beyond.js`, sequences picker → warp out → destination → warp home. It is registered with the existing module host in `SolarSystem.jsx`, and small React components supply the picker, the hold-to-warp control and the ripples card.

**Tech Stack:** React 19 + Vite, Three.js (no new dependencies), `node --test` for `*.test.js` beside the source, Vitest + Testing Library for `tests/components/*.test.jsx`, Playwright via `scripts/checkSolarUi.js`.

**Spec:** [docs/superpowers/specs/2026-10-25-beyond-warp-and-space-ripples-design.md](../specs/2026-10-25-beyond-warp-and-space-ripples-design.md). Read it first.

## Global Constraints

- All new source lives in `src/pages/skills/geography/`. Unit tests go beside it as `<name>.test.js` and component tests in `tests/components/`.
- Code style matches the neighbouring files: 4-space indent in `SolarSystem.jsx` and older modules, and 2-space in the flight files being edited. Short "why" comments, same density as `lineUp.js`.
- No new npm dependencies, no storage, no URL state, no new sound effects. Read-aloud only, via `speak` from `src/utils/speech.js`, gated by `isMuted()` from `src/components/celebration/sound/player.js`.
- Overlays use theme tokens from `App.css` (`--light-*` / `--dark-*`). All buttons are at least 48px. Both themes.
- Low tier = `quality === "low"`, from the existing `currentQuality()`. Low tier halves streaks (as `createWarpStreaks` already does), simplifies the swirl and uses fewer grid lines.
- Reduced motion is read as a function `reducedMotion()` every frame, never cached.
- Every module owns and disposes its geometries, materials, textures and controls (`dispose()`), and builds nothing until first opened.
- Exact copy (verbatim):
  - Beyond button: label `Beyond`, aria-label `Warp to Beyond`, icon `🌀`.
  - Flight edge offer: `Warp to Beyond`.
  - Picker title `Where to?`. Ripples card name `Space ripples`, blurb `Two black holes spin together and make space wobble.`
  - Hold button aria-label `Hold to power the engine`. Visible text `Hold to fly`, and `Hold Space` on keyboard devices.
  - Pretend line: `Getting here was a pretend space shortcut. Real black holes don't lead anywhere.`
  - Picture label: `This is a picture to help us imagine. Real space ripples are invisible, and we've sped them up.`
  - Buttons: `Bring them together`, `Replay`, `Back to the Solar System`.
  - Facts: the three in the spec's "#94 Card" section, verbatim.
- Before writing the facts, confirm GW150914 figures (36 and 29 solar masses, about 1.3 billion light-years, 14 September 2015, change in length far less than an atom) against https://www.ligo.caltech.edu/page/press-release-gw150914 and add that link to the roadmap's teaching references.
- Branch: stay on `feat/solar-system`. **Do not commit unless the owner asks.** The "Checkpoint" steps list the files that belong together.
- `npm run lint`, `npm test` and `npm run build` must pass at the end of every task that touches source.

## Review Focus

1. **The tab is hidden, or the window loses focus, mid-warp while holding:** holding must stop (the ride drifts on). It must never stay at full power with no finger down. Tested in Task 7.
2. **A second trip after coming home:** opening Beyond again must work and must not leave objects from the first trip in any scene. Tested in Task 6.
3. **Dragging to look around the ripples scene:** this must not count as a tap. Only a press-and-release that moves less than 6px makes a ripple. Tested in Task 3.
4. **Tapping many times quickly:** the number of live ripples is capped. The oldest is replaced, and frame cost doesn't grow. Tested in Task 3.
5. **Reduced motion switched on mid-warp:** the ride switches to the calm version and still completes and arrives. Tested in Task 2.

---

### Task 1: Destination list

**Files:**
- Create: `src/pages/skills/geography/beyondDestinations.js`
- Test: `src/pages/skills/geography/beyondDestinations.test.js`

**Interfaces:**
- Produces:
  - `BEYOND_DESTINATIONS: Destination[]`
  - `availableDestinations(): Destination[]`, which only returns entries with `ready: true`
  - `destinationById(id: string): Destination | null`
  - `Destination = { id, kind: "event" | "system" | "galaxy", place: { galaxy: string | null, galaxyLabel: string, system: string | null }, name, blurb, pretendLines: string[], ready: boolean, canFly: boolean, camera: { position: [x,y,z], target: [x,y,z] }, edgeRadius: number, bodies: { id, name, radius, position: [x,y,z] }[] }`
  - The Space ripples entry: `id: "space-ripples"`, `kind: "event"`, `place: { galaxy: null, galaxyLabel: "Far beyond our galaxy", system: null }`, `canFly: false`, `ready: true`. Its bodies are the two black holes (`"black-hole-a"`, `"black-hole-b"`). The camera and edge values are the builder's call, but they must match Task 3's scene. No Three.js imports.

- [ ] **Step 1: Write the failing tests**

```js
test("only ready destinations are offered, so there are no coming-soon cards", () => {
    assert.deepEqual(availableDestinations().map((d) => d.id), ["space-ripples"]);
    assert.ok(BEYOND_DESTINATIONS.every((d) => typeof d.ready === "boolean"));
});
test("space ripples is an event beyond our galaxy that cannot be flown yet", () => {
    const d = destinationById("space-ripples");
    assert.equal(d.kind, "event"); assert.equal(d.place.galaxy, null); assert.equal(d.canFly, false);
    assert.equal(d.name, "Space ripples");
    assert.ok(d.pretendLines.some((l) => l.includes("pretend space shortcut")));
});
test("every destination carries what free flight will need later", () => {
    for (const d of BEYOND_DESTINATIONS) {
        assert.equal(d.camera.position.length, 3); assert.ok(d.edgeRadius > 0); assert.ok(Array.isArray(d.bodies));
        for (const b of d.bodies) { assert.ok(b.radius > 0); assert.equal(b.position.length, 3); }
    }
});
test("unknown ids return null", () => assert.equal(destinationById("andromeda"), null));
```

- [ ] **Step 2: Run them and check they fail.** `node --test src/pages/skills/geography/beyondDestinations.test.js` → FAIL, module not found.
- [ ] **Step 3: Implement `beyondDestinations.js`.** Add a top comment saying the galaxy map (#108) will read this same list, and that only real Milky Way systems will be added (owner rule).
- [ ] **Step 4: Run them and check they pass.**
- [ ] **Step 5: Checkpoint:** the two files above.

### Task 2: Warp ride timing

**Files:**
- Create: `src/pages/skills/geography/beyondWarpTimeline.js`
- Test: `src/pages/skills/geography/beyondWarpTimeline.test.js`

**Interfaces:**
- Produces:
  - `WARP_HOLD_SECONDS = 5`, `WARP_DRIFT_SHARE = 0.25` (released = a quarter speed, so about 20 s if never held) and `WARP_HOME_SECONDS = 3`.
  - `createWarpRide({ reducedMotion: () => boolean })` → `{ step(dt: number, holding: boolean): WarpFrame }`
  - `homeRideFrame(t: number, reducedMotion: boolean): WarpFrame`
  - `WarpFrame = { progress: 0..1, stage: "doorway" | "tunnel" | "flash" | "done", doorway: 0..1 (black hole size ahead), swirl: 0..1, streakSpeed: 0..1, streakBrightness: 0..1, flash: 0..1, calm: boolean, done: boolean }`
  - Stages by progress: doorway below 0.2, tunnel from 0.2 to 0.9, flash from 0.9 to 1, done at 1. When `calm` (reduced motion), swirl and streaks are 0 and flash is at most 0.3. Pure, with no Three.js.

- [ ] **Step 1: Write the failing tests**

```js
test("holding the whole way takes WARP_HOLD_SECONDS", () => {
    const ride = createWarpRide({ reducedMotion: () => false });
    let f; for (let t = 0; t < WARP_HOLD_SECONDS - 0.05; t += 0.05) f = ride.step(0.05, true);
    assert.equal(f.done, false); f = ride.step(0.1, true); assert.equal(f.done, true); assert.equal(f.stage, "done");
});
test("letting go drifts slowly forward, never back, and still finishes", () => {
    const ride = createWarpRide({ reducedMotion: () => false });
    const a = ride.step(1, true).progress, b = ride.step(1, false).progress;
    assert.ok(b > a); assert.ok(Math.abs((b - a) - WARP_DRIFT_SHARE / WARP_HOLD_SECONDS) < 1e-9);
    let f; for (let i = 0; i < 400 && !(f = ride.step(0.1, false)).done; i++); assert.equal(f.done, true);
});
test("stages follow progress", () => { /* step to 0.1, 0.5, 0.95 progress; expect doorway, tunnel, flash */ });
test("reduced motion turned on mid-ride goes calm and still arrives", () => {
    let calm = false; const ride = createWarpRide({ reducedMotion: () => calm });
    assert.ok(ride.step(2, true).swirl > 0);
    calm = true; const f = ride.step(0.1, true);
    assert.equal(f.calm, true); assert.equal(f.swirl, 0); assert.equal(f.streakBrightness, 0);
    let g; for (let i = 0; i < 100 && !(g = ride.step(0.1, true)).done; i++); assert.equal(g.done, true);
    assert.ok(g.flash <= 0.3);
});
test("the ride home needs no holding and ends at WARP_HOME_SECONDS", () => {
    assert.equal(homeRideFrame(WARP_HOME_SECONDS - 0.01, false).done, false);
    assert.equal(homeRideFrame(WARP_HOME_SECONDS, false).done, true);
});
test("a huge dt (tab was hidden) cannot skip past done or exceed 1", () => {
    assert.equal(createWarpRide({ reducedMotion: () => false }).step(60, false).progress <= 1, true);
});
```

Write the "stages follow progress" body with real assertions.

- [ ] **Step 2: Run them and check they fail.**
- [ ] **Step 3: Implement.** Progress rate is `holding ? 1 / WARP_HOLD_SECONDS : WARP_DRIFT_SHARE / WARP_HOLD_SECONDS`, clamped to 1. The rest of the curves are the builder's call, but must be smooth: reuse `smoothstep` as in `warpTimeline.js`.
- [ ] **Step 4: Run them and check they pass.**
- [ ] **Step 5: Checkpoint.**

### Task 3: Ripple timing, ripple pool and tap detection

**Files:**
- Create: `src/pages/skills/geography/rippleTimeline.js`
- Test: `src/pages/skills/geography/rippleTimeline.test.js`

**Interfaces:**
- Produces:
  - `MERGE_SECONDS = 12`, `MAX_RIPPLES = 8`, `TAP_SLOP_PX = 6`.
  - `mergeFrame(t: number, reducedMotion: boolean)` → `{ separation, angle, emitRing: boolean, flash: 0..1, merged: boolean, done: boolean, wobble: 0..1 }`. Separation starts at `1` and shrinks as `(1 - t / MERGE_SECONDS) ** 0.25`, the real inspiral shape. Angular speed grows as `separation ** -1.5`, so the black holes spin faster as they close in, which is the chirp. They merge when separation is below 0.15. `done` is true at `MERGE_SECONDS`. Under reduced motion, `wobble` is 0 and `flash` is at most 0.3.
  - `createRipplePool(max = MAX_RIPPLES)` → `{ add({ x, z, amplitude, speed }), update(dt), heightAt(x, z): number, list(): Ripple[] }`. A ripple is a travelling ring `amplitude * sin(k * (r - speed * age)) * envelope`, zero ahead of its front, fading out by 6 s. When full, `add` drops the oldest.
  - `isTap(down: {x, y, time}, up: {x, y, time}): boolean`. True when moved less than `TAP_SLOP_PX` and held under 500 ms.

- [ ] **Step 1: Write the failing tests**

```js
test("the pair spirals in faster and faster, then merges once", () => {
    const early = mergeFrame(1, false), late = mergeFrame(10, false);
    assert.ok(late.separation < early.separation);
    // angular speed: compare angle advance over 0.1 s
    const spin = (t) => mergeFrame(t + 0.1, false).angle - mergeFrame(t, false).angle;
    assert.ok(spin(10) > spin(1) * 2);
    assert.equal(mergeFrame(MERGE_SECONDS, false).merged, true); assert.equal(mergeFrame(MERGE_SECONDS, false).done, true);
});
test("reduced motion: no wobble, soft flash", () => {
    for (let t = 0; t <= MERGE_SECONDS; t += 0.25) { const f = mergeFrame(t, true); assert.equal(f.wobble, 0); assert.ok(f.flash <= 0.3); }
});
test("a ring travels outward and is flat ahead of its front", () => {
    const pool = createRipplePool(); pool.add({ x: 0, z: 0, amplitude: 1, speed: 10 }); pool.update(1);
    assert.equal(pool.heightAt(50, 0), 0); assert.notEqual(pool.heightAt(9.5, 0), 0);
});
test("tapping many times keeps at most MAX_RIPPLES, dropping the oldest", () => {
    const pool = createRipplePool();
    for (let i = 0; i < 50; i++) pool.add({ x: i, z: 0, amplitude: 1, speed: 10 });
    assert.equal(pool.list().length, MAX_RIPPLES); assert.equal(pool.list()[0].x, 50 - MAX_RIPPLES);
});
test("ripples fade away completely", () => {
    const pool = createRipplePool(); pool.add({ x: 0, z: 0, amplitude: 1, speed: 10 }); pool.update(7);
    assert.equal(pool.list().length, 0);
});
test("a drag to look around is not a tap", () => {
    assert.equal(isTap({ x: 0, y: 0, time: 0 }, { x: 3, y: 2, time: 200 }), true);
    assert.equal(isTap({ x: 0, y: 0, time: 0 }, { x: 40, y: 0, time: 200 }), false);
    assert.equal(isTap({ x: 0, y: 0, time: 0 }, { x: 0, y: 0, time: 900 }), false);
});
```

- [ ] **Step 2: Run them and check they fail.** **Step 3: Implement.** **Step 4: Run them and check they pass.** **Step 5: Checkpoint.**

### Task 4: Space ripples scene module

**Files:**
- Create: `src/pages/skills/geography/spaceRipples.js`
- Test: `src/pages/skills/geography/spaceRipples.test.js`

**Interfaces:**
- Consumes: `destinationById("space-ripples")` (camera, bodies), `mergeFrame`, `createRipplePool`, `isTap`, `MERGE_SECONDS`.
- Produces: `createSpaceRipples({ renderer, quality: "standard" | "low", reducedMotion: () => boolean, onChange: (state) => void })` → `{ open(), close(), isActive(), update(dt), render(), resize({ width, height }), bringTogether(), replay(), pointerDown(event), pointerUp(event, rect), dispose(), stage(): "waiting" | "merging" | "settled", gridLineCount: number }`.
  - `onChange({ stage })` fires on each stage change.
  - `GRID_LINES = { standard: 96, low: 48 }`, the lines per side of the glowing grid.

Behaviour:
- Built on first `open()`: its own `THREE.Scene` and camera, with faint `THREE.Points` stars. The grid is a `LineSegments` sheet whose heights come from the merge "well" plus `pool.heightAt` (GPU or CPU is the builder's call). Two black holes are dark spheres with a glowing additive ring each.
- Drag-to-look uses its own `OrbitControls` with pan and zoom off and min distance equal to max distance, so the camera rotates but never travels. It is enabled only while active.
- `waiting`: the pair orbits slowly at separation 1. `bringTogether()` → `merging` drives `mergeFrame`. Each `emitRing` adds a ripple at the centre, and the end sets `wobble` on the camera and the flash. Then comes `settled` with one bigger black hole.
- `replay()` → back to `waiting`, then immediately `bringTogether()`.
- `pointerDown` / `pointerUp` call `isTap`. On a tap, raycast against the grid plane (y = 0). A hit within the grid adds a ripple and returns true. A miss returns false.
- Like `lineUp.js`, it draws instead of the Solar System. `render()` calls `renderer.render(scene, camera)`.

- [ ] **Step 1: Write the failing tests** (node, no WebGL: pass a fake `renderer = { render: () => {}, domElement: { addEventListener() {}, removeEventListener() {}, style: {} } }`. Check `OrbitControls` accepts it, or inject `createControls` as an option so tests can pass a stub. Builder's call, but tests must not need WebGL).

```js
test("builds nothing until opened, then uses fewer grid lines on low", () => { /* gridLineCount 0 before open; 48 low; 96 standard */ });
test("bring them together runs waiting → merging → settled", () => {
    const changes = []; const r = make({ onChange: (s) => changes.push(s.stage) }); r.open();
    assert.equal(r.stage(), "waiting"); r.bringTogether();
    for (let t = 0; t <= MERGE_SECONDS + 0.5; t += 0.1) r.update(0.1);
    assert.deepEqual(changes, ["merging", "settled"]);
});
test("replay starts the merge again", () => { /* after settled, replay → merging */ });
test("a tap on the grid makes a ripple; a drag does not", () => {
    // pointerDown/pointerUp with clientX/Y at the canvas centre, rect {left:0,top:0,width:800,height:600}
    // tap → true; drag 40px → false
});
test("closing and disposing frees everything", () => { /* after dispose, scene.children.length === 0; second dispose is safe */ });
test("resize updates the camera aspect", () => { /* resize({width:400,height:800}) → camera.aspect 0.5 */ });
```

Expose `scene` and `camera` on the returned object for tests (`lineUp.js` keeps them private, so a getter is fine).

- [ ] **Step 2: Run them and check they fail.** **Step 3: Implement.** **Step 4: Run them and check they pass.** **Step 5: Checkpoint.**

### Task 5: Warp scene module

**Files:**
- Create: `src/pages/skills/geography/beyondWarp.js`
- Test: `src/pages/skills/geography/beyondWarp.test.js`

**Interfaces:**
- Consumes: `createWarpRide`, `homeRideFrame`, `WARP_HOME_SECONDS` (Task 2), and `createWarpStreaks({ camera, quality })` (existing: `update(dt, { speed, brightness })`, `dispose()`).
- Produces: `createBeyondWarp({ renderer, quality, reducedMotion, makeRocket: () => THREE.Object3D, onFrame: (frame: WarpFrame) => void, onDone: (direction: "out" | "home") => void })` → `{ start(direction: "out" | "home"), setHolding(holding: boolean), isActive(), update(dt), render(), resize({ width, height }), dispose(), scene, camera }`.

Behaviour:
- Its own scene and camera. The rocket comes from `makeRocket()`. In `SolarSystem.jsx` that is `() => buildShip(currentQuality()).ship` from `autopilotShip.js`, so the warp is handed the rocket and never builds one itself. The rocket is seen from behind.
- `doorway` scales a dark sphere with a glowing purple-blue ring ahead. `swirl` drives a purple-blue spiral tunnel around the view axis (technique is the builder's call; simpler on low). Streaks are driven from `streakSpeed` and `streakBrightness`. `flash` is a full-screen additive quad.
- `"out"` uses `createWarpRide` with `setHolding`. `"home"` uses `homeRideFrame` and ignores holding. At `done`, `onDone(direction)` is called once and the warp goes inactive.
- `onFrame` is called every update so React can show progress. React state updates are throttled by the caller.

- [ ] **Step 1: Write the failing tests**

```js
test("out ride only finishes with time, faster when held, and reports done once", () => { /* hold → done after ~5 s, onDone called exactly once with "out" */ });
test("home ride finishes on its own in WARP_HOME_SECONDS", () => { /* start("home"), update without holding, onDone("home") */ });
test("streaks attach to the warp's own camera and are hidden in calm mode", () => { /* reducedMotion () => true: camera.children[0].visible stays false */ });
test("starting again after done works, and dispose removes everything", () => { /* start out → done → start home → done; dispose → scene.children.length 0, camera.children.length 0 */ });
```

- [ ] **Step 2: Run them and check they fail.** **Step 3: Implement.** **Step 4: Run them and check they pass.** **Step 5: Checkpoint.**

### Task 6: Beyond controller

**Files:**
- Create: `src/pages/skills/geography/beyond.js`
- Test: `src/pages/skills/geography/beyond.test.js`

**Interfaces:**
- Consumes: `createBeyondWarp` (Task 5), `createSpaceRipples` (Task 4), `destinationById` (Task 1).
- Produces: `createBeyond({ renderer, getQuality: () => quality, reducedMotion, makeRocket, onChange: (state: BeyondState) => void, scenes = { "space-ripples": createSpaceRipples }, createWarp = createBeyondWarp })` → `{ go(destinationId), setHolding(bool), goHome(), exitNow(), isActive(), destination(), update(dt), render(), resize(size), dispose() }`. `exitNow()` is for Reset: it disposes any destination, stops the warp without `onDone`, and sets the phase to `"off"` straight away.
  - `BeyondState = { phase: "off" | "warp-out" | "arrived" | "warp-home", destinationId: string | null, progress: 0..1, calm: boolean, stage?: string }`
  - The destination's `stage` is passed through.
  - `onReturned` happens when the phase goes from `"warp-home"` to `"off"`. The page then resets to the overview (Task 8).

Behaviour:
- `go(id)` builds the warp on first use and starts `"out"`. On done it builds the destination scene with `scenes[id]`, calls `open()` → `"arrived"`.
- `goHome()` closes and **disposes** the destination scene (no GPU memory kept while away; spec "Separate scene"), then starts `"home"`. On done → `"off"`.
- `render()` draws the warp while warping, the destination while arrived, and nothing when off. `go` while not `"off"` is ignored.
- The `scenes` and `createWarp` injection points let the test use fakes, and let later destinations (#109) register without touching this file's logic.

- [ ] **Step 1: Write the failing tests** with fake warp/scene factories recording calls:

```js
test("go → warp-out → arrived → goHome → warp-home → off", () => { /* drive fake warp onDone; assert phases from onChange */ });
test("the destination is built on arrival and disposed on the way home", () => { /* fake scene.dispose called once at goHome */ });
test("a second trip builds a fresh destination and leaves nothing from the first", () => {
    /* two full trips: factory called twice; first instance disposed; second instance opened; no stray calls */
});
test("go while already away is ignored; unknown destinations are ignored", () => { /* ... */ });
test("dispose mid-trip disposes the warp and any destination", () => { /* ... */ });
test("exitNow from arrived goes straight to off with no warp home", () => { /* destination disposed, phase "off", warp start("home") never called */ });
```

- [ ] **Step 2: Run them and check they fail.** **Step 3: Implement.** **Step 4: Run them and check they pass.** **Step 5: Checkpoint.**

### Task 7: Beyond UI components

**Files:**
- Create: `src/pages/skills/geography/BeyondPicker.jsx`, `BeyondWarpControls.jsx`, `SpaceRipplesCard.jsx`, and one shared `Beyond.css`
- Test: `tests/components/beyond.test.jsx`

**Interfaces:**
- Consumes: `availableDestinations()` (Task 1), `speak` and `stopNarrationOf`, and `isMuted`.
- Produces:
  - `BeyondPicker({ destinations, onChoose: (id) => void, onClose: () => void })`. A `role="dialog"` labelled `Where to?`, with one 48px+ card button per destination (name, blurb, `galaxyLabel`, pretend line) and a `Close` button. Escape closes it, and focus moves into the dialog on open.
  - `BeyondWarpControls({ progress: 0..1, calm: boolean, onHoldChange: (holding: boolean) => void })`. A hold button (aria-label `Hold to power the engine`) using the pointer-capture pattern of the Turbo button in `SolarFlightControls.jsx`, plus Space/Shift keydown/keyup on `window`. Window `blur`, `visibilitychange` (hidden), `pointercancel` and `lostpointercapture` all call `onHoldChange(false)`. A `role="progressbar"` with `aria-valuenow` from 0 to 100. In calm mode a short line reads `Hold to fill the bar — we'll get there gently.`
  - `SpaceRipplesCard({ stage, onBringTogether, onReplay, onHome })`. The card (`solar-info-card` styling) shows the name, the 3 facts, the picture label, the pretend line and a `🔊 Hear about space ripples` button. It also shows `Bring them together` when `stage === "waiting"`, `Replay` when `"settled"`, nothing while merging, and always `Back to the Solar System`. Exports `SPACE_RIPPLES_FACTS` and `SPACE_RIPPLES_LINE` (the read-aloud text = facts + picture label).

- [ ] **Step 1: Write the failing tests** (Vitest, style of `SolarOrbitControl.test.jsx`):

```jsx
test('picker lists only ready destinations and chooses one', () => { /* click card "Space ripples" → onChoose('space-ripples'); Escape → onClose */ });
test('holding by pointer and by Space/Shift reports hold and release', () => { /* pointerDown → true, pointerUp → false; keyDown Space → true, keyUp → false */ });
test('losing focus or hiding the page while holding releases the engine', () => {
  /* hold via Space, then fireEvent.blur(window) → onHoldChange(false); hold again, set document.visibilityState 'hidden' + dispatch visibilitychange → false */
});
test('progress is announced as a progressbar', () => { /* progress 0.42 → aria-valuenow 42 */ });
test('ripples card shows the right action for each stage and the honesty labels', () => {
  /* waiting → Bring them together; merging → neither; settled → Replay; always Back to the Solar System; picture label + pretend line text present */
});
test('read-aloud respects the navbar mute', () => { /* vi.mock speech + player; isMuted true → speak not called; false → called with SPACE_RIPPLES_LINE */ });
```

- [ ] **Step 2: Run them and check they fail.** `npx vitest run tests/components/beyond.test.jsx`
- [ ] **Step 3: Implement the three components and `Beyond.css`.** Theme tokens only. The ripples card is capped at 340px wide like the other cards, and the picker at 440px like the missions dialog. Portrait phones get bottom placement as the other cards do.
- [ ] **Step 4: Run them and check they pass.** **Step 5: Checkpoint.**

### Task 8: Wire Beyond into the Solar System, plus the fly-past-Pluto offer

**Files:**
- Modify: `src/pages/skills/geography/solarFreeFlight.js` (export `FLIGHT_EDGE_RADIUS = 1350`, use it in place of the literal `1350`, and add `atEdge: boolean` to the `emit()` payload, true when `ship.position.length() >= FLIGHT_EDGE_RADIUS - 5`)
- Modify: `src/pages/skills/geography/solarFreeFlight.test.js`
- Modify: `src/pages/skills/geography/SolarFlightControls.jsx` (new prop `onBeyond`, which shows a `Warp to Beyond` button when `view?.atEdge`, also when the panel is collapsed, like the orbit offer)
- Modify: `tests/components/SolarOrbitControl.test.jsx` (or a new `tests/components/flightEdge.test.jsx`)
- Modify: `src/pages/skills/geography/SolarSystem.jsx`

**Interfaces:**
- Consumes: `createBeyond` (Task 6), the components (Task 7), `availableDestinations`, `buildShip`, `currentQuality`, `reducedQuery`.
- Produces on `sceneApiRef.current`: `openBeyond()` (opens the picker), `goBeyond(id)`, `setWarpHolding(bool)`, `goHomeFromBeyond()`. Mode string `"beyond"`, and a `beyondState` React state matching `BeyondState`.

Steps:

- [ ] **Step 1: Write the failing tests.** In `solarFreeFlight.test.js`, flying straight out to the edge emits `atEdge: true`, and moving back in emits `false`. Follow the file's existing pattern for driving the ship. In the component test, `view={{ atEdge: true }}` shows `Warp to Beyond` (collapsed too), clicking calls `onBeyond`, and `atEdge: false` hides it.
- [ ] **Step 2: Run them and check they fail.**
- [ ] **Step 3: Implement the flight changes.**
- [ ] **Step 4: Wire `SolarSystem.jsx`:**
  - `const beyond = modules.add("beyond", createBeyond({ renderer, getQuality: currentQuality, reducedMotion: () => reducedQuery.matches, makeRocket: () => buildShip(currentQuality()).ship, onChange: ... }))`. Throttle React updates of `progress` to changes of at least 0.01.
  - **Animate loop:** while `beyond.isActive()`, hold the world clock (`paused || paleBlueDot.holdsClock() || beyond.isActive()`), skip `controls.update()`, and draw with `beyond.render()` in the same branch as `lineUp.render()`.
  - **Entering:**
    - Beyond can only be entered from idle or free flight. Opening the picker brakes the ship but leaves free flight running.
    - Choosing a destination does this, in order: `warpIn?.skip()`, stop the tour or orbit, stop free flight, `controls.enabled = false`, `pane.hidden = true`, `beyond.go(id)`.
    - The picker sits between GO and the warp, so a held GO cannot carry over. The warp's Space key matches flight's Space, which gives the same feel. *(This replaces the spec's carry-over call.)*
    - The picker state `beyondPickerOpen` sits outside the module. Closing the picker without choosing returns to where the child was, including still flying.
  - **Arriving home** (`phase` goes from `"warp-home"` to `"off"`): call `resetView()` so the child lands at the overview, `controls.enabled = true`, `pane.hidden = false`, and clear selection, free flight, tour and orbit.
  - **Reset:** `resetSolarSystem()` calls `beyond.exitNow()` first and closes the picker. Unmount is covered by the module host's `dispose()`.
  - **Mode:** `else if (beyondState.phase !== "off") mode = "beyond";`. While in this mode, hide the launch row, search, overview, missions, settings drawer and flight HUD.
  - **Render:** `BeyondWarpControls` during `"warp-out"`, plus `SpaceRipplesCard` while `"arrived"` for `space-ripples`. Pointer events on the canvas go to the destination's `pointerDown`/`pointerUp` only while arrived.
  - **Beyond button:** the fifth button in `.solar-launch-buttons`, using the exact copy from Global Constraints, disabled until `sceneReady`.
  - **Read-aloud:** on arrival, if not muted, `speak("Two black holes are spinning together. Press Bring them together to see space wobble!")`. Stop narration on leaving.
- [ ] **Step 5: Run everything.** `npm run lint && npm test && npm run build` → all pass. Record the unit and component test counts.
- [ ] **Step 6: Checkpoint:** the flight files, `SolarSystem.jsx` and the tests.

### Task 9: Browser pass, roadmap and knowledge docs

**Files:**
- Modify: `scripts/checkSolarUi.js` (add a `--beyond-only` flag)
- Modify: `docs/SOLAR_SYSTEM_IDEAS.md`, `docs/PROJECT_KNOWLEDGE.md`

- [ ] **Step 1: Add the `--beyond-only` scenario.** It must be one batched pass over 1280×900, 390×844 and 844×390, in both themes (the script already loops over viewports and themes, so skip 619×756 under this flag). For each combination, in this order:
  - Click `Warp to Beyond`.
  - The picker is inside the viewport (`inside(...)`). Choose `Space ripples`.
  - Hold the engine (pointer down on `Hold to power the engine` for 6 s; reduced-motion contexts also see the progressbar reach 100).
  - Wait for `Bring them together` → click it → wait about 13 s for `Replay`.
  - Tap the canvas centre once.
  - Screenshot the warp mid-ride (normal-motion context only), the arrived scene, and the settled scene.
  - Click `Back to the Solar System` → wait for the launch row to be visible again.
  - Assert the card and buttons fit inside the viewport, 48px targets, and zero page/module errors.
  - Additionally, on 1280×900 light: start `Fly the rocket`, call the debug path or hold GO toward the edge until `Warp to Beyond` appears in the flight HUD. If no fast path exists, expose a test-only `sceneApiRef` hook guarded by `?debug` (builder's call), then click it and check the picker opens.
- [ ] **Step 2: Run** `node scripts/checkSolarUi.js --beyond-only`. Review the screenshots in `/tmp/bix-solar-ui/`, fix everything found, and rerun at most once.
- [ ] **Step 3: Update the docs:**
  - `SOLAR_SYSTEM_IDEAS.md`: #113 → `◐ Warp, picker and one destination built; more destinations (#90/#91/#109) pending`. #94 → `✅ Device/playtest checks pending`. Update the Phase 6 row, upcoming sequence item 3, and a short "Warp to Beyond and Space ripples" section under "Current implementation and limits" covering what's built, what's pretend, the fact that nothing is saved, the free-flight refactor still needed for #109 (`createSolarFreeFlight` adds its ship to the Solar System scene and takes Solar System bodies), and what was not checked in a browser or on a device. Add the LIGO link to teaching references. Bump "Reviewed against source".
  - `PROJECT_KNOWLEDGE.md`: add the new files to the Solar System section, matching its existing format.
- [ ] **Step 4: Final run.** `npm run lint && npm test && npm run build` → pass. Report the counts and what the browser did and did not show.
- [ ] **Step 5: Checkpoint:** the script and the docs.
