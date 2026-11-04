# Ocean Explorer — Phase 3 (coral reef orbit) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A child drives the submarine to a coral reef, chooses **Orbit Coral reef**, circles it and reads its card, built on the first pieces of a shared world kit that the Solar System also moves onto.

**Architecture:** Four world-neutral pieces go in `src/components/worlds/`: discovery data shape, fold-out sections, Orbit button, orbit pilot and info card. Solar files become thin wrappers that pass their space rules as data, so Solar behaviour, classes and tests stay identical. The ocean adds a reef model, its discovery data, orbit wiring in `oceanScene.js` and the button + card in `OceanExplorer.jsx`.

**Tech Stack:** React 19, Three.js, Vite, `node:test` (unit, colocated `*.test.js`), Vitest + Testing Library (`tests/components/`).

**Spec:** `docs/superpowers/specs/2026-10-29-ocean-explorer-design.md` (Phase 3) and `docs/superpowers/specs/2026-10-29-explorable-worlds-design.md`.

## Global Constraints

- **The Solar System must not change.** Same buttons, words, cards, motion and layout. Existing Solar tests pass unchanged apart from import paths.
- Kit files contain no Solar or ocean names and no `kind === 'moon'` / `name === 'Saturn'` checks; worlds pass those rules as data.
- Do not restructure `SolarSystem.jsx`'s main effect; only swap imports.
- Both themes (`--light-*` / `--dark-*` tokens), touch targets ≥ 48px, keyboard access, reduced motion.
- Reef card: header label "Habitat", name "Coral reef", "Show/Hide reef facts" while orbiting, opening line, honesty note, ✨ Discover, 🔎 Look closer with 🔊 Read aloud. **No** Play & compare, **no** Explore more, no placeholders.
- Orbit offer wording `Orbit Coral reef`, status `Orbiting Coral reef`, reduced motion adds ` · steady view`; about one lap a minute; reduced motion holds still.
- Every reef fact carries a primary-source URL; the owner reviews the wording before Phase 3 is called done.
- No commits until the owner allows them.

## Review Focus

1. **Entering orbit from above, below or at an angle** — the submarine must settle level around the reef and never dip into the sand or through the surface. → Task 3 test `level orbit eases to anchor height`.
2. **Leaving orbit then driving** — the craft carries on from where it is, facing the way it was circling, with no jump of position or camera. → Task 6 test `leave orbit hands back steering in place`.
3. **Back to start / Reset view while orbiting** — orbit ends cleanly first; no stuck disabled controls. → Task 6 test `back to start ends the orbit`.
4. **Held keys or GO pressed while orbiting** — ignored during the orbit, no surprise lurch afterwards beyond what is still held. → Task 7 test `drive input during orbit is ignored`.
5. **Closing the card while orbiting** — orbit continues, card stays closed until the next orbit. → Task 7 test `closing the card keeps orbiting`.

---

### Task 1: Discovery shape and fold-out sections

**Files:**
- Create: `src/components/worlds/discovery.js`, `src/components/worlds/discovery.test.js`
- Create: `src/components/worlds/WorldSections.jsx`, `src/components/worlds/WorldSections.css` (move of `SolarSections.*`, classes `world-sections`, `world-section`, `world-section__toggle`, `world-section__content`)
- Delete: `src/pages/skills/geography/SolarSections.jsx`, `SolarSections.css`
- Modify imports: `SolarInfoCard.jsx:5`, `SolarMissions.jsx:6`, `ConstellationCard.jsx:2`; selector in `SolarMissions.css:30`

**Interfaces:**
- Produces: `validateDiscovery(discovery) -> string[]` (empty when valid). `Discovery` JSDoc typedef:
  `{ id, name, eyebrow, factsNoun, summary, honesty?, meta: string[], stats: {label, value, compare?}[], facts: string[] (≥2), closer: string[], sources?: string[] }`
- Produces: `default WorldSections({ children, defaultOpen })`, `WorldSection({ section, title, children })` — same behaviour as the Solar versions.

- [x] **Step 1: Failing test** `validateDiscovery`: a complete reef-like object returns `[]`; missing `name` → message containing `name`; one fact → message containing `facts`; a stat without `value` → message containing `stats`.
- [x] **Step 2:** `node --test src/components/worlds/discovery.test.js` → FAIL (module missing).
- [x] **Step 3:** Implement `discovery.js`; move sections with renamed classes; update the three importers (`SolarSections`/`SolarSection` names become `WorldSections`/`WorldSection`) and the Missions CSS selector.
- [x] **Step 4:** `node --test src/components/worlds/discovery.test.js` → PASS; `npx vitest run tests/components` → PASS unchanged.

### Task 2: Orbit button

**Files:**
- Create: `src/components/worlds/WorldOrbitControl.jsx`, `WorldOrbitControl.css` (move of `SolarOrbitControl.*`, classes `world-orbit-control`, `world-orbit-control--floating`)
- Delete: `SolarOrbitControl.jsx`, `SolarOrbitControl.css`; move its last rule (`.solar-system .solar-info-card__body[hidden]`) into `SolarSystem.css`
- Modify imports: `SolarSystem.jsx:40`, `SolarFlightControls.jsx:7`, `tests/components/SolarOrbitControl.test.jsx:4` (path only)

**Interfaces:**
- Produces: `default WorldOrbitControl({ name, active, onEnter, onLeave, floating, reducedMotion, className, children })` — identical markup and labels (`Orbit ${name}`, `Leave orbit around ${name}`, `Orbiting ${name}`, ` · steady view`); `className` is appended to the root.

- [x] **Step 1:** Move and rename; update imports.
- [x] **Step 2:** `npx vitest run tests/components/SolarOrbitControl.test.jsx` → PASS unchanged.

### Task 3: Orbit pilot with per-world profile

**Files:**
- Create: `src/components/worlds/orbitPilot.js`, `src/components/worlds/orbitPilot.test.js`
- Modify: `src/pages/skills/geography/solarPlanetOrbit.js` (becomes a wrapper; keeps all four exports and signatures)

**Interfaces:**
- Produces:
  - `ORBIT_RATE = TAU / 60`
  - `nearestOrbitTarget(targets, position, profile) -> target | null` — skips targets with no `object3d`, `radius <= 0` or `profile(target) == null`; picks smallest `distance - radius` within `profile(target).entryDistance`.
  - `createOrbitPilot({ ship, camera, controls, profile, getCameraView = () => 'behind', reducedMotion = () => false, obstacles = [], isSolid = () => true, forward = UP }) -> { isActive, target, start(target) -> bool, stop() -> previous, update(dt), dispose }`
  - `profile(target) -> null | { entryDistance, radius, rig: { back, lift, trail }, level?: boolean }`
- Solar wrapper: `createPlanetOrbit(opts)` = `createOrbitPilot({ ...opts, profile: solarOrbitProfile, isSolid: o => !['belt','comet','satellite'].includes(o.kind) })`; `nearestOrbitBody(bodies, p)` = `nearestOrbitTarget(bodies, p, solarOrbitProfile)`; `orbitEntryDistance` and `PLANET_ORBIT_RATE` unchanged. `solarOrbitProfile` returns `null` unless `kind` is `planet`/`moon`, and carries today's moon / Saturn / planet numbers exactly.
- Behaviour additions, used only when asked: `level: true` flattens the starting radial to horizontal, uses `UP` as the axis, and eases the ship's height offset from its entry height to the anchor height with the same `alpha` as the radius. `forward` is the model's nose axis passed to `setFromUnitVectors(forward, tangent)`; the default `UP` keeps the rocket's behaviour.

- [x] **Step 1: Failing tests** (`node:test`), with a reef-like target `{ id:'reef', name:'Coral reef', radius:3, object3d }` and profile `{ entryDistance: 9, radius: 6, rig: { back: 5, lift: 2.2, trail: 1.5 }, level: true }`:
  - `profile returning null is never offered or started`
  - `level orbit eases to anchor height` — start 2.5 above the anchor; after 5 s of 1/60 updates `|ship.y - anchor.y| < 0.01`, and every frame's ship y stays between the anchor y and the starting y.
  - `forward axis keeps the nose along the path without roll` — with `forward = (0,0,-1)`, after 3 s the ship's world -Z is within 0.05 of the horizontal tangent and its world +Y is within 0.01 of `UP`.
  - `isSolid filters obstacles` — a non-solid obstacle placed on the path does not push the ship.
- [x] **Step 2:** `node --test src/components/worlds/orbitPilot.test.js` → FAIL.
- [x] **Step 3:** Move the pilot body out of `solarPlanetOrbit.js` into `orbitPilot.js`, replacing the hard-coded rules with `profile` / `isSolid` / `forward`; rewrite `solarPlanetOrbit.js` as the wrapper above.
- [x] **Step 4:** `node --test src/components/worlds/orbitPilot.test.js src/pages/skills/geography/solarPlanetOrbit.test.js src/pages/skills/geography/solarFreeFlight.test.js` → PASS (Solar tests unchanged).

### Task 4: Information card

**Files:**
- Create: `src/components/worlds/WorldInfoCard.jsx`, `WorldInfoCard.css` (default `world-card` look, matching the Solar card's effective styles: panel tokens, 48px close/buttons, compact type)
- Modify: `src/pages/skills/geography/SolarInfoCard.jsx` (becomes a wrapper; same props)
- Test: `tests/components/worldInfoCard.test.jsx`

**Interfaces:**
- Consumes: `Discovery` (Task 1), `WorldSections` (Task 1).
- Produces: `default WorldInfoCard({ discovery, baseClass = 'world-card', orbiting = false, onClose, onRead, tour = { active: false }, tourActions, storySection, playSection, closerExtras, exploreSection })`
  - Renders the exact structure of today's `SolarInfoCard`, with every class built from `baseClass` (`${baseClass}__header`, `__eyebrow`, `__close`, `__tour-button`, `__summary`, `__honesty`, `__body`, `__meta`, `__stats`, `__more-facts`, `__navigation`, and `${baseClass}--tour`).
  - Orbit toggle text: `${detailsVisible ? 'Hide' : 'Show'} ${discovery.factsNoun} facts`. Read aloud button: `🔊 Read about ${name}` calling `onRead(closer.join(' '))`.
  - Optional slots render only when given. The Play section is `playSection`, Look closer gets `closerExtras` after the read-aloud block, and the tour story section is `storySection`. Navigation buttons call `tourActions.previous/replay/toggleNarration/next`.
- Solar wrapper: builds the discovery from `body` (`eyebrow` from today's tour / moon / classification rule, `factsNoun` moon/star/planet, `meta: [classification, moonSummary]`). It passes `baseClass="solar-info-card"` and keeps today's Play, Rings, Comet, Day & night, Moon phases, Auroras and Explore sections as slots, plus its muted-aware `read`. The Solar card's output DOM is unchanged.

- [x] **Step 1: Failing tests** with a reef discovery fixture:
  - Renders an `aside` named `Coral reef information` with class `world-card`, eyebrow `Habitat`, summary, honesty, stats and two facts, with a `More facts` fold when there are more than two.
  - `🔊 Read about Coral reef` calls `onRead` with the closer text joined.
  - No `Play & compare`, `Explore more` or `Tour story` buttons when the slots are absent.
  - When orbiting, the body starts hidden behind `Show reef facts`. Clicking it reveals the details and the label becomes `Hide reef facts`.
  - × calls `onClose`.
- [x] **Step 2:** `npx vitest run tests/components/worldInfoCard.test.jsx` → FAIL.
- [x] **Step 3:** Implement the card and the CSS; rewrite `SolarInfoCard.jsx` as the wrapper.
- [x] **Step 4:** `npx vitest run tests/components/worldInfoCard.test.jsx tests/components/SolarInfoCard.test.jsx tests/components/trappist1Cards.test.jsx` → PASS (Solar tests unchanged).

### Task 5: Reef model, discovery data and seabed placement

**Files:**
- Create: `src/pages/skills/geography/oceanReef.js`, `oceanDiscoveries.js`, `oceanDiscoveries.test.js`
- Modify: `oceanEnvironment.js` (rocks and seagrass keep clear of the reef; reef added to the group and to `obstacles`)

**Interfaces:**
- Produces: `REEF_SPOT = { x: 0, z: -11 }`, `REEF_RADIUS = 2.8`, `REEF_HEIGHT = 1.8`.
- Produces: `createOceanReef() -> THREE.Group` named `ocean-reef`. It is stylised coral in fixed habitat colours (pink, orange, purple, teal): branching, brain and fan shapes within `REEF_RADIUS`, casting and receiving shadows.
- Produces: `REEF_DISCOVERY: Discovery` (`id: 'coral-reef'`, `name: 'Coral reef'`, `eyebrow: 'Habitat'`, `factsNoun: 'reef'`, plus `sources`) and `REEF_ORBIT = { entryDistance: 9, radius: 6, rig: { back: 5, lift: 2.2, trail: 1.5 }, level: true }`.
- `createOceanEnvironment` additionally returns `reef: { object3d: anchor, radius: 3, ...REEF_DISCOVERY }`. `anchor` is an `Object3D` at `(REEF_SPOT.x, oceanFloorHeight(REEF_SPOT) + 3.2, REEF_SPOT.z)`. `obstacles` gains `{ x, z, radius: REEF_RADIUS, top: floor + REEF_HEIGHT }`.

- [x] **Step 1: Failing tests**:
  - `validateDiscovery(REEF_DISCOVERY)` is `[]`; every `sources` entry starts with `https://`; the summary is one sentence.
  - In `tests/components/oceanScene.test.jsx`, `the reef sits ahead of the start, clear of rocks`: the scene contains `ocean-reef`, and no rock obstacle is within `REEF_RADIUS + 1.5` of `REEF_SPOT`.
- [x] **Step 2:** Run both → FAIL.
- [x] **Step 3:** Research and write the copy, checking each fact on the source page with WebFetch.
  - Sources: NOAA Ocean Service (corals tutorial, coral facts, bleaching) and GBRMPA reef facts.
  - Content: the opening line about coral being tiny animals, not rocks. The honesty note: "This ocean is a made-up mix of places. Real coral reefs grow in warm, shallow, sunny seas."
  - Stats: where found, how deep, biggest reef. Facts: polyps, limestone skeletons, algae and colour, the share of sea life on reefs. Closer: 2–3 short paragraphs.
  - Then build the model and placement. Re-roll any rock or seagrass position inside the clear zone.
- [x] **Step 4:** Both tests → PASS; the existing ocean scene tests still PASS.

### Task 6: Orbit in the ocean scene

**Files:**
- Modify: `src/pages/skills/geography/oceanScene.js`
- Test: `tests/components/oceanScene.test.jsx`

**Interfaces:**
- Consumes: `createOrbitPilot`, `nearestOrbitTarget` (Task 3); `environment.reef`, `REEF_ORBIT` (Task 5).
- Produces: `createOceanScene` options gain `onOrbitOffer(offer | null)` and `onOrbitChange(orbit | null)`. Here `offer = { id, name }` and `orbit = { id, name, steady }`. Each fires only when its value changes. The API gains `enterOrbit() -> bool` and `leaveOrbit()`.
- Behaviour:
  - The pilot uses the submarine as `ship` with `forward = (0, 0, -1)`, `profile = () => REEF_ORBIT` and `obstacles = [environment.reef]`.
  - The offer is recomputed after each drive step, `returnToStart` and `leaveOrbit`.
  - While orbiting, the loop runs every frame: `pilot.update(seconds)`, propeller spin, `shadowMap.needsUpdate`, the camera clamped below `OCEAN_SURFACE_HEIGHT - 0.8` and re-aimed at `controls.target`. Steering input is ignored.
  - `leaveOrbit()` reads the heading from the submarine's world -Z (`yaw = atan2(-fx, -fz)`), resets steering to `createSteeringState(position, yaw)`, re-places the submarine and calls `saveView()`.
  - `returnToStart()` and `dispose()` end any orbit first.

- [x] **Step 1: Failing tests**:
  - `offers the reef only when close`: offer is `null` at the start. After placing the submarine within 9 of the anchor and running a frame, the offer is `{ id: 'coral-reef', name: 'Coral reef' }`. Driving back away resets it to `null`.
  - `enterOrbit circles the reef level and in view`: `onOrbitChange` receives `{ name: 'Coral reef', steady: true }` (reduced motion in the harness). Repeat with motion allowed: after 15 s the angle around the anchor has advanced `ORBIT_RATE * 15 ± 0.05`. The camera stays below the ceiling and the submarine stays above `oceanFloorHeight + STEERING.floorClearance`.
  - `leave orbit hands back steering in place`: after leaving, the submarine position is unchanged and the steering yaw matches its heading within 0.01. One idle frame moves nothing.
  - `back to start ends the orbit`: `onOrbitChange(null)` fires and the submarine is at the start.
  - `steering bumps against the reef`: driving straight from the start at reef height never brings the submarine within `REEF_RADIUS + STEERING.hullRadius - 0.01` of `REEF_SPOT`.
- [x] **Step 2:** `npx vitest run tests/components/oceanScene.test.jsx` → FAIL.
- [x] **Step 3:** Implement.
- [x] **Step 4:** `npx vitest run tests/components/oceanScene.test.jsx` → PASS.

### Task 7: Page controls, card and copy

**Files:**
- Modify: `OceanExplorer.jsx`, `OceanExplorer.css`, `shared/skillGuides.js` (`ocean-explorer` entry)
- Test: `tests/components/oceanExplorer.test.jsx`

**Interfaces:**
- Consumes: `WorldOrbitControl` (Task 2), `WorldInfoCard` (Task 4), scene API (Task 6), `REEF_DISCOVERY`.
- Behaviour:
  - State is `offer`, `orbit` and `cardOpen`.
  - Render `<WorldOrbitControl floating className="ocean-explorer__orbit" name={offer?.name ?? orbit?.name} active={!!orbit} reducedMotion={orbit?.steady} …>` while there is an offer or an orbit.
  - Entering orbit opens the card (`orbiting`, `onRead` = `speak` unless `isMuted()`). Leaving orbit closes it; × closes it and the orbit continues.
  - Escape on the canvas leaves orbit.
  - Placement: the orbit control sits at the top-left of the scene and the card at the top-right (`width: min(340px, 100% - 24px)`), both clear of the joystick and GO. Under 720px wide the card spans the width below the orbit control with `max-height: 45%`.
  - Help text adds: "Drive close to the coral reef and choose Orbit to circle it and read about it. Press Escape to leave orbit."
  - Guide copy changes "This prototype has no animals, lessons or tours yet." to "Drive close to the coral reef and choose Orbit to circle it and read about it. There are no animals or tours yet." It adds the practice item `Coral reef habitats`.

- [x] **Step 1: Failing tests** with the mocked scene, driving its callbacks:
  - `offers and enters orbit`: the offer callback shows `Orbit Coral reef`, and clicking it calls `enterOrbit`. The orbit callback shows `Orbiting Coral reef`, a `Coral reef information` card and `Leave orbit`.
  - `closing the card keeps orbiting`: × hides the card and `Leave orbit` stays.
  - `leaving orbit closes the card`: `Leave orbit` calls `leaveOrbit`. Escape on the canvas does too.
  - `drive input during orbit is ignored`: the scene receives no non-zero `setSteering` beyond what the page already sends. This is asserted in the scene test instead if the page has no say.
- [x] **Step 2:** `npx vitest run tests/components/oceanExplorer.test.jsx` → FAIL.
- [x] **Step 3:** Implement.
- [x] **Step 4:** `npx vitest run tests/components/oceanExplorer.test.jsx tests/components/seo.test.jsx` → PASS.

### Task 8: Verify and record

- [x] `npm run lint`, `npm test`, `npm run build`, `npm run check:seo` pass.
- [x] One batched browser pass on the production preview at 390×844, 844×390, 768×1024 and 1280×900, in both themes:
  - Ocean: drive to the reef, check the offer, orbit, card, read-aloud button, leave orbit and Back to start, with no overlap of the card, orbit control, joystick and GO.
  - Solar System: open a planet card and orbit Earth in manual flight. Compare against the same views captured before Task 1, which needs a baseline capture before starting.
  - Fix what it shows, then at most one more pass.
- [x] Update the spec statuses, the `PROJECT_KNOWLEDGE.md` Ocean Explorer section (plus a short "Shared world kit" note) and idea #44 in `PROJECT_IDEAS.md`, and mark this plan.
- [x] Report what was not checked: physical devices, screen readers and the owner's fact review.

## Completion criteria

A child drives to the reef without help, orbits it, reads or hears its card, leaves orbit and drives on, on phone, tablet and desktop in both themes. The Solar System looks and behaves exactly as before, and its tests pass unchanged apart from import paths.

## Verification results — 2026-10-29

- `npm run lint`, `npm test` (2,485 unit passes, four skips; 659 component passes), `npm run build` and `npm run check:seo` pass.
- Two batched Chrome passes (software WebGL) on the production preview at 390×844, 844×390, 768×1024 and 1280×900 in both themes. Held Space reached the reef and the offer appeared every time. Orbit, Show reef facts, Look closer and Leave orbit all worked. The orbit control, card, joystick and GO never overlapped. There was no horizontal overflow, no console errors, and leaving orbit closed the card. The Solar System page loaded without errors.
- The first pass showed the submarine hiding the reef in the orbit view. The fix scaled the reef ×1.45 and moved the camera higher and further back (`REEF_ORBIT` radius 7.5, rig back 3 / lift 4.5 / trail 3; anchor 4 above the base). The second pass confirmed the reef is in view.
- Not checked: Solar planet orbit and planet card in a browser (covered by unchanged Solar unit/component tests), physical devices, screen readers, read-aloud audio, and the owner's review of the reef wording. The Great Barrier Reef stat was left out because its source could not be reached.
