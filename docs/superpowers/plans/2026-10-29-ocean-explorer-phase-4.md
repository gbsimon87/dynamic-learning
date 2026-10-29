# Ocean Explorer — Phase 4 (one swimming fish) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A parrotfish swims a slow loop near the reef. A child can watch it, drive close, choose **Orbit Parrotfish**, circle it as it swims and read its card, exactly as with the reef.

**Architecture:** The fish is a second discovery in the existing Phase 3 flow, so no new kit pieces are needed. `oceanFish.js` holds the model and a pure swim path. The environment moves the fish whenever the water moves. The scene offers and orbits any discovery that carries an `orbit` profile, and the orbit pilot already follows a moving target. The page chooses the card by the orbited discovery's `id`.

**Tech Stack:** React 19, Three.js, Vite, `node:test` (colocated `*.test.js`), Vitest + Testing Library (`tests/components/`).

**Spec:** `docs/superpowers/specs/2026-10-29-ocean-explorer-design.md` (row "4. Sea life": "Watch one swimming fish, then introduce more animals gradually using the same discovery experience"; "Learning in later phases"; visual principles) and `docs/superpowers/specs/2026-10-29-explorable-worlds-design.md` (rules for shared pieces).

## Decisions this plan makes (owner to confirm)

The spec gives Phase 4 one line, so these are the builder's calls:

- **One fish, a parrotfish.** It belongs on a coral reef, and its best-known fact, that it turns coral into white sand, links to the sandy seabed the child can see. More animals come later, one at a time, as data plus a model.
- **It swims a fixed loop to the left of the start**, away from the reef and from the submarine's start. It is in view from the first camera and never passes through the reef or the parked submarine. It is not solid, so a child who drives into its path may see it pass through the hull. That is the cost of this call; avoiding the submarine is left for later.
- **Fish movement follows the water-motion toggle.** Automatic movement must be stoppable (spec, visual principles), so the existing button pauses the fish too and is renamed: **Pause ocean / Resume ocean / Still ocean**. With reduced motion the fish holds still.
- **The fish casts no shadow.** Shadows are rendered once, not every frame, so a moving shadow would mean redrawing the shadow map each frame.

## Global Constraints

- **The Solar System must not change**, and the kit in `src/components/worlds/` gains no ocean names or `id === 'parrotfish'` checks. What a world decides is data.
- Orbit wording: `Orbit Parrotfish`, `Orbiting Parrotfish`, and ` · steady view` with reduced motion. About one lap a minute (`ORBIT_RATE`), as with the reef.
- The card uses the same structure as the reef card: eyebrow "Sea life", name "Parrotfish", "Show/Hide parrotfish facts" while orbiting, a one-sentence opening, an honesty note, ✨ Discover and 🔎 Look closer with 🔊 Read aloud. **No** Play & compare, no Explore more, no placeholders.
- Every fact carries a primary-source URL. The owner reviews the wording before Phase 4 is called done.
- Habitat colours stay the same in both interface themes. Controls use theme tokens, touch targets are at least 48px, and keyboard access is kept.
- No commits until the owner allows them.

## Review Focus

1. **The fish swims past a submarine that is not moving.** The Orbit offer should appear and disappear without the child driving. Pinned by the Task 3 test `the fish is offered as it swims past a parked submarine`.
2. **Orbiting a moving fish.** The fish must stay in view and not be hidden behind the submarine. The submarine must stay clear of the reef, the sand and the surface. Pinned by the Task 3 test `orbiting the fish follows it and keeps it in view`.
3. **Reduced motion or paused water.** The fish holds still, and offer and orbit still work, steadily. Pinned by the Task 3 test `a still ocean keeps the fish in place`.
4. **Orbiting the reef, then the fish.** Each card shows the right discovery and starts fresh. Pinned by the Task 4 test `the card follows the orbited discovery`.
5. **The fish's loop.** It never reaches the reef, the submarine's start, the rocks' height or the surface. Pinned by the Task 2 test `the swim loop stays clear of the reef, the start and the rocks`.

---

### Task 1: Parrotfish card data

**Files:**
- Modify: `src/pages/skills/geography/oceanDiscoveries.js`, `src/pages/skills/geography/oceanDiscoveries.test.js`

**Interfaces:**
- Produces: `FISH_DISCOVERY` (a `Discovery`, id `'parrotfish'`), `FISH_ORBIT = { entryDistance: 5.5, radius: 3, rig: { back: 3.5, lift: 3, trail: 1.5 }, level: true }`, and `OCEAN_DISCOVERIES = [REEF_DISCOVERY, FISH_DISCOVERY]`.

- [ ] **Step 1: Failing test** `the parrotfish card is complete, sourced and opens with one sentence`: `validateDiscovery(FISH_DISCOVERY)` is `[]`. The name is `'Parrotfish'`, the eyebrow is `'Sea life'` and factsNoun is `'parrotfish'`. Every source is `https://`. The summary has one sentence ending. `OCEAN_DISCOVERIES.map(d => d.id)` is `['coral-reef', 'parrotfish']`. Second test, `the fish is orbited closer than the reef`: `FISH_ORBIT.level === true`, `FISH_ORBIT.radius < REEF_ORBIT.radius`, and `FISH_ORBIT.entryDistance > FISH_ORBIT.radius`.
- [ ] **Step 2:** `node --test src/pages/skills/geography/oceanDiscoveries.test.js`. Expected: FAIL (export missing).
- [ ] **Step 3:** Add the data. The wording is for ages 6 to 8, and every claim comes from these sources:
  - <https://oceanservice.noaa.gov/facts/sand.html>: beak, scraping algae off rocks and dead coral, grinding coral into sand, "hundreds of pounds of white sand each year", Hawaii's white beaches, helping keep the reef healthy.
  - <https://www.floridamuseum.ufl.edu/discover-fish/species-profiles/stoplight-parrotfish/>: teeth fused into beak-like plates, up to 55 cm long, 3 to 50 m deep, colour changes as they grow, active by day.
  - <https://www.floridamuseum.ufl.edu/southflorida/habitats/corals/reef-communities/>: the night-time mucus cocoon.

  Opening line: *"A parrotfish has a beak like a parrot, made of teeth joined together."*

  Honesty note: *"This ocean is a made-up mix of places, and this parrotfish is drawn bigger so it is easy to spot. Real parrotfish live on warm coral reefs."*
- [ ] **Step 4:** Run the same command. Expected: PASS (4 tests).

### Task 2: Fish model and swim loop

**Files:**
- Create: `src/pages/skills/geography/oceanFish.js`, `src/pages/skills/geography/oceanFish.test.js`

**Interfaces:**
- Consumes: `REEF_SPOT`, `REEF_RADIUS` from `oceanReef.js`, and `OCEAN_SURFACE_HEIGHT` from `oceanWater.js`.
- Produces:
  - `FISH_LOOP = { x: -12, z: -3, radius: 5, height: 3.2, lapSeconds: 30 }`.
  - `FISH_RADIUS = 0.9` (the orbit pilot's target radius).
  - `fishPose(seconds) -> { x, y, z, heading }`, where `heading` is the yaw that faces the swim direction, with the model's nose on −Z as for the submarine. At `seconds = 0` the fish is at the point of the loop nearest the start (0, 0).
  - `createOceanFish(water) -> THREE.Group` named `'ocean-fish'`, about 1.8 long, original and stylised: rounded body, beak, eye, dorsal and side fins, and a tail child named `'ocean-fish-tail'`. Materials get `water?.addCaustics`. It casts no shadow.

- [ ] **Step 1: Failing test** `the swim loop stays clear of the reef, the start and the rocks`. Sample `fishPose(t)` for t from 0 to 60 in 0.25 s steps. At every sample:
  - The horizontal distance to `REEF_SPOT` is more than `REEF_RADIUS + FISH_ORBIT.radius + 1.5` (the orbiting hull clears the reef).
  - The distance to (0, 0) is more than `FISH_ORBIT.entryDistance`, so no offer appears at the start.
  - `y` is at least 3 (so a submarine orbiting the fish clears the tallest rock) and below `OCEAN_SURFACE_HEIGHT - 2`.
  - `Math.hypot(x, z) + FISH_ORBIT.radius` is less than `STEERING.areaRadius`.
- [ ] **Step 2: Failing test** `the fish swims one lap in lapSeconds, facing where it goes`:
  - `fishPose(0)` and `fishPose(FISH_LOOP.lapSeconds)` are within 1e-9.
  - The step from `fishPose(1)` to `fishPose(1.01)` points along `(-sin heading, -cos heading)` to within 0.02 rad.
  - `fishPose(0)` lies on the segment from the loop centre towards (0, 0).
- [ ] **Step 3:** `node --test src/pages/skills/geography/oceanFish.test.js`. Expected: FAIL (module missing).
- [ ] **Step 4:** Implement `oceanFish.js`. The pose is a plain circle, with no bobbing, so the orbit stays calm.
- [ ] **Step 5:** Run the same command. Expected: PASS.

### Task 3: Scene — the fish swims, is offered and can be orbited

**Files:**
- Modify: `src/pages/skills/geography/oceanEnvironment.js`, `src/pages/skills/geography/oceanScene.js`
- Test: `tests/components/oceanScene.test.jsx`

**Interfaces:**
- Consumes: Task 1 `FISH_DISCOVERY`, `FISH_ORBIT`, `REEF_ORBIT`; Task 2 `fishPose`, `createOceanFish`, `FISH_RADIUS`.
- Produces:
  - The environment returns `discoveries: [reef, fish]`. Each one is `{ ...Discovery, object3d, radius, orbit }`, and the reef gets `orbit: REEF_ORBIT`.
  - `environment.advance(seconds)` also moves the fish to `fishPose(total)` with yaw `heading`, and wags the tail.
  - The scene's pilot profile becomes `target => target.orbit ?? null`. The `reefProfile` constant is removed.
  - `enterOrbit()` orbits the offered discovery. `onOrbitChange` and `onOrbitOffer` keep their `{ id, name[, steady] }` shapes.

- [ ] **Step 1: Failing tests** in `oceanScene.test.jsx`:
  - `the fish swims with the water and starts in view`:
    - With motion allowed, the `'ocean-fish'` object moves after `drive(0, 2)` while the submarine is idle.
    - At start, its position projected through the camera is inside the frame (|x| and |y| of NDC < 1).
  - `a still ocean keeps the fish in place`:
    - With reduced motion, the fish stays at `fishPose(0)` after ticks.
    - After `api.setWaterPaused(true)` with motion allowed, it stops moving.
  - `the fish is offered as it swims past a parked submarine`:
    - With motion allowed, park the submarine on the loop by driving there. A helper teleport is acceptable: drive with `turn` then `throttle`, or call `returnToStart` and steer.
    - Then, with the submarine idle, tick for up to `FISH_LOOP.lapSeconds`.
    - `onOrbitOffer` is called with `{ id: 'parrotfish', name: 'Parrotfish' }` and later with `null`.
  - `orbiting the fish follows it and keeps it in view`:
    - Enter orbit while the fish is offered. `onOrbitChange` is called with `{ id: 'parrotfish', name: 'Parrotfish', steady: false }`.
    - Over 20 s of ticks:
      - The horizontal distance from the submarine to the fish settles to within 0.3 of `FISH_ORBIT.radius`.
      - The camera stays below `OCEAN_SURFACE_HEIGHT - 0.8`.
      - The submarine stays above the floor clearance and more than `REEF_RADIUS` from `REEF_SPOT`.
      - The distance from the submarine's centre to the camera→fish segment is more than 1.1, so the hull does not hide the fish.
  - `leaving the fish orbit hands back steering in place`: the submarine's position is unchanged and `onOrbitChange(null)` is called.
  - The existing reef tests keep passing unchanged.
- [ ] **Step 2:** `npx vitest run tests/components/oceanScene.test.jsx`. Expected: the new tests FAIL (no `'ocean-fish'`).
- [ ] **Step 3:** Implement. The environment adds the fish group and the `discoveries` list. Call `updateOffer()` over `environment.discoveries`. In `animate`, after `environment.advance`, call `updateOffer()` when not orbiting. `enterOrbit` looks up the discovery whose `id` matches `offer.id`.
- [ ] **Step 4:** Run the same command. Expected: all PASS. If the camera→fish clearance fails, tune `FISH_ORBIT.rig` only, and ledger the new values.

### Task 4: Page — the right card, honest controls and words

**Files:**
- Modify: `src/pages/skills/geography/OceanExplorer.jsx`, `shared/skillGuides.js` (ocean entry), `docs/PROJECT_KNOWLEDGE.md` (Ocean Explorer section), the spec's status line and build-plan list
- Test: `tests/components/oceanExplorer.test.jsx`

**Interfaces:**
- Consumes: Task 1 `OCEAN_DISCOVERIES`.

- [ ] **Step 1: Failing tests**:
  - `the card follows the orbited discovery`:
    - Offer and orbit the reef, then leave.
    - Offer `{ id: 'parrotfish', name: 'Parrotfish' }`, click `Orbit Parrotfish`, then fire `onOrbitChange({ id: 'parrotfish', name: 'Parrotfish', steady: false })`.
    - The complementary `Parrotfish information` shows, with the button `Show parrotfish facts`. `Coral reef information` is absent.
  - Update `offers pause/resume and keeps water still for reduced motion` to the labels `Pause ocean`, `Resume ocean` and `Still ocean`.
- [ ] **Step 2:** `npx vitest run tests/components/oceanExplorer.test.jsx`. Expected: FAIL.
- [ ] **Step 3:** Implement:
  - The card looks up `OCEAN_DISCOVERIES.find(d => d.id === orbit.id)`, keyed by id.
  - Button labels change as above. The title becomes "Your reduced-motion preference keeps the ocean still."
  - The canvas fallback text adds "and a parrotfish swimming nearby".
  - The help **Discover** line becomes "drive close to the coral reef or the parrotfish and choose Orbit to circle it and read about it."
  - In the guide, replace "There are no animals or tours yet." with "A parrotfish swims nearby and can be orbited too. There are no tours yet."
  - In the guide, add `'Animals and their habitats'` to the topics.
  - In `PROJECT_KNOWLEDGE.md`, update the Pause/Resume water wording and add one paragraph on the fish.
- [ ] **Step 4:** Run the same command. Expected: PASS.
- [ ] **Step 5: Whole suite:** `npm run lint`, `npm test`, `npx vitest run`, `npm run build` and `npm run check:seo` all pass. If the seo test pins the guide text, update it to the new wording.
- [ ] **Step 6: One batched browser pass**, because the fish and orbit are WebGL. Use phone, tablet and desktop viewports and light and dark themes. Check that the fish is visible at start, that orbiting it is readable, and that the card is readable. Fix what it shows; at most one confirming pass.
