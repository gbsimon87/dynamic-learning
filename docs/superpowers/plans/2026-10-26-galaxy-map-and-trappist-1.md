# Galaxy map and TRAPPIST-1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Solar System scene build from a system definition, add TRAPPIST-1 as a second fully explorable system, let the child fly or jump between systems in ≤10 seconds, and add a 3D galaxy map — so each later NASA-mapped system is mostly a data file.

**Architecture:** The existing scene effect in `SolarSystem.jsx` reads a **system definition** instead of inline home data; home-only features run only when the definition's `extras` switch them on. A thin page wrapper holds the current system id and remounts the scene (`key={systemId}`) to change system. A light **registry** (ids, real positions, map cards) feeds travel, signposts and the galaxy map; full definitions load on demand. The trip between systems is split across the remount: the leaving scene plays the warning and first half of the dash, the arriving scene plays the second half.

**Tech Stack:** React 19, Three.js 0.181 (+ `three/examples/jsm`), Vite, `node --test` unit tests beside source, Vitest + Testing Library component tests in `tests/components/`, local Playwright script `scripts/checkSolarUi.js`.

**Spec:** [docs/superpowers/specs/2026-10-26-galaxy-map-and-trappist-1-design.md](../specs/2026-10-26-galaxy-map-and-trappist-1-design.md). Read it before any task.

## Progress

Branch `feat/galaxy-map-trappist-1` (from `dev`), nothing committed (owner rule). Executed natively, one slice at a time. Detailed record and every ruling: `.superpowers/sdd/2026-10-26-galaxy-map-and-trappist-1/progress.md` (git-ignored).

| Task                         | Status  | Notes                                                                                                                                                                                                                                                                                                                     |
| ---------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0 Baseline                   | ✅ done | `scripts/checkSolarBaseline.js --capture/--compare` (new script, not a flag on `checkSolarUi.js`); 36 screenshots in `/tmp/bix-solar-baseline`, zero errors                                                                                                                                                               |
| 1 System maths + validation  | ✅ done | 10 tests pass. TRAPPIST-1 b density is 5.45 → **5.5** (plan's 5.4 was a rounding slip; Task 11 list corrected)                                                                                                                                                                                                            |
| 2 Home definition            | ✅ done | `systems/home.js`; snapshot generated mechanically into `systems/fixtures/homeSnapshot.json`; planetData's unseen tour-fact lists dropped (card facts kept)                                                                                                                                                               |
| 3 Registry + shared suite    | ✅ done | `systems/registry.js`, test-only `fixtures/testSystem.js`; density stats carry numeric `densityGcm3`                                                                                                                                                                                                                      |
| 4 Scene reads the definition | ✅ done | Textures/materials/planets/Sun/camera from `HOME_SYSTEM`; `sceneGuard.test.js` started; `worldSurfaces.test.js` now reads moons from the definition. Earth-specific lookups remain until Task 7                                                                                                                           |
| 5 Cards + birthday           | ✅ done | Play/card read body data; `systems/bodyInfo.js` pulled forward from Task 13; stats + honesty line + tour finish label; short years read in Earth days                                                                                                                                                                     |
| 6 Flight settings            | ✅ done | `edgeRadius`/`startBodyId` passed to free flight (`FLIGHT_EDGE_RADIUS` export removed); HUD takes `clues, badges, startName, systemName, systemPhrase`                                                                                                                                                                    |
| 7 Home extras gated          | ✅ done | Off extras use stand-in objects; off belt = zero-count belt; tour reads `tour.stops`; guard test passes (no body names in shared files)                                                                                                                                                                                   |
| 8 Page wrapper + toolbar     | ✅ done | `SolarSystemPage.jsx` (route), remount by `key`, adult `?debug&system=`; toolbar/search/canvas labels use `system.phrase`; meteor + missions gated                                                                                                                                                                        |
| 9 Home comparison gate       | ✅ done | 36 pairs reviewed by eye: only random asteroids/stars and clock-moved planets differ; zero errors. **Slice 1 complete**                                                                                                                                                                                                   |
| 10 Fact check                | ✅ done | Haiku helper vs NASA archive. Corrected: periods b 1.510826, c 2.421937, g 12.352446; RA 23.1084 h, Dec −5.0435°. Dropped "d at inner edge of water zone" (no source); water zone = e, f, g. JWST: b ≈230 °C, c ≈107 °C                                                                                                   |
| 11 TRAPPIST-1 definition     | ✅ done | `systems/trappist1.js` + registry entry + tests; validator now requires list-shaped `closer`/`facts` and numeric `orbit` elements                                                                                                                                                                                         |
| 12 Scene support             | ✅ done | `proceduralPlanet.js`; star card (`buildStarInfo`, tap/tour/search); drawer `hiddenToggles`; constellation `viewpointNote`; welcome spoken once; quality guard for remount. One batched browser pass: renders at 3 sizes × 2 themes, no errors                                                                            |
| 13 Card tests                | ✅ done | `tests/components/trappist1Cards.test.jsx` (incl. 300-shuffle clue deck). **Slice 2 complete** — next: Slice 3 (Travel), switch to **Opus**                                                                                                                                                                               |
| 14 Trip timeline             | ✅ done | `systems/tripTimeline.js`, 8 tests; `tripFrame` takes `previous` so the hand-over fires on one frame                                                                                                                                                                                                                      |
| 15 Trip mode in free flight  | ✅ done | Warning, dash, hand-over, turn back (button or held turn-around), arrival, autopilot trips; flown trips leave straight out from where they crossed the edge                                                                                                                                                               |
| 16 Trip HUD                  | ✅ done | `SolarTripHud.jsx/.css`: countdown read once, Turn back (B/Backspace), "Sped up" label, progress bar under reduced motion; Warp to Beyond edge offer and `atEdge` removed                                                                                                                                                 |
| 17 Hand-over + Home          | ✅ done | Page loads one system at a time, remounts by `id:visit`, failed load → home + alert, page speaks the welcome (once, not muted, not after turn back); Home on toolbar and flight HUD (autopilot); scene mode `trip` for autopilot trips                                                                                    |
| 18 Signposts                 | ✅ done | `systems/signposts.js` + `systemSignposts.js` (arrow, ring, label; faint home star away from home); signs are flight targets, not obstacles; TRAPPIST-1 clue "Find the sign pointing home"; validator accepts `sign:<id>`. **Slice 3 complete**                                                                           |
| 19 Map catalogue             | ✅ done | `galaxyMapData.js`: galaxies (look-don't-land), Space ripples event, registry systems at real positions; `spreadMarkers` keeps close markers tappable                                                                                                                                                                     |
| 20 Milky Way image           | ✅ done | Gate passed (JPL image use policy; Commons: public domain). ssc2008-10a1 → `public/static/milky-way-4096.jpg` (2.47 MB) / `-2048.jpg` (0.68 MB); credits entry                                                                                                                                                            |
| 21 Map scene                 | ✅ done | `galaxyMap.js`: three levels as groups, picture disc + star layer + bulge, You are here, pan held per level, camera pulls back on portrait                                                                                                                                                                                |
| 22 Map panel + button        | ✅ done | `GalaxyMapPanel.jsx/GalaxyMap.css`; Galaxy map button in both systems; Jump there / Go home fly the autopilot trip; Space ripples visits Beyond. **Slice 4 complete** (its Opus review folded into the final review)                                                                                                      |
| 23 add-star-system skill     | ✅ done | `.claude/skills/add-star-system/SKILL.md`, dry-run against the test system                                                                                                                                                                                                                                                |
| 24 Docs                      | ✅ done | IDEAS (#108 ✅, #109 ◐, toolbar rule, item 6 ✅, new section), PROJECT_KNOWLEDGE, AGENTS skills row                                                                                                                                                                                                                       |
| 25 Final verification        | ✅ done | Lint/test/build pass (2425 unit, 576 component). `checkSolarUi.js --systems`; two batched browser passes, zero errors. Final Opus review: 1 critical + 1 important fixed with tests; marker overlap and 1280 toolbar fixed after the confirm pass (not re-checked in a browser). **Slice 5 complete — nothing committed** |

## Global Constraints

- **No commits until the owner allows them** (owner, 2026-10-26). Commit steps below are written for when that changes; until then, stop at "tests pass" and leave changes in the working tree.
- Lint, `npm test` (unit + components) and `npm run build` pass at the end of every task.
- Home must behave exactly as today. Home's data moves byte-for-byte; any visible home change is a bug.
- Shared code never names a system or body: no `"Earth"`, `"Saturn"`, `"Pluto"`, `"Sun"`, `"trappist-1"`-style literals in `SolarSystem.jsx`, `SolarInfoCard.jsx`, `SolarFlightControls.jsx`, `PlanetPlayCard.jsx`, `solarFreeFlight.js`, `planetPlay.js`. Names live in definitions.
- Ages 6–8: 48px targets, read-aloud through `speak()` only when `!isMuted()`, both themes for overlays via `--light-*`/`--dark-*` tokens in `App.css`; the scene stays night.
- True science, labelled: "Sped up - even light takes about {N} years to make this trip."; TRAPPIST-1 honesty line "Nobody has seen these planets up close. This is a picture to help us imagine."; "scientists think" for tidal locking.
- Nothing new is stored. `dl.solarMissions`, `dl.solarView` and curriculum progress are untouched.
- Three.js and its add-ons only; no new npm dependencies; no R3F; no physics engine.
- Effects use `solarModules.js` (`update`, `resize`, `dispose`), the shared clock, low tier at width <720 or coarse pointer, calm reduced motion.
- Trip timing: warning 3 s; whole trip (warning + dash) never more than 10 s.
- Models per slice (spec "Suggested models"): Slice 1 Opus; Slice 2 Sonnet (fact checks Haiku); Slice 3 Opus; Slice 4 Sonnet with Opus review; Slice 5 Sonnet. At most two helper agents at once.
- Browser checks: Task 0 baseline, Task 9 comparison, Task 25 final pass — each one batched script covering 1280×900, 390×844, 844×390 in light and dark. No other browser passes except one confirm pass after fixes.

## Review Focus

1. **Wobbling at the edge** — a child crossing and recrossing the edge must get one clean countdown each time, never two trips or a stuck warning. Test: Task 15 `recrossing the edge restarts the warning once and never starts two trips`.
2. **Buttons during travel** — Galaxy map, Home, Jump there, Beyond or Reset pressed mid-trip, mid-tour or mid-warp must be ignored or safely cancel the trip, never remount twice. Test: Task 17 `travel requests while a trip is running are ignored`.
3. **Reduced motion changing mid-trip** — the trip continues and switches to the progress bar. Test: Task 16 `switching to reduced motion mid-trip keeps the trip and shows progress`.
4. **Narration overlap and mute** — welcome, warning and tour lines never talk over each other; navbar mute silences all; turning back does not replay the welcome. Test: Task 17 `arrival welcome speaks once, never when muted, not after turn back`.
5. **Slow or failed system load at handoff** — a loading state shows; on failure the child lands home with a message, never on a blank scene. Test: Task 17 `a failed system load lands the child home with a message`.

---

## Slice 1 — Foundations (Opus)

Ends with home running from its definition, every home extra gated, and a before/after browser comparison passing. No visible change.

### Task 0: Capture the home baseline

**Files:**

- Modify: `scripts/checkSolarUi.js` (add a `--baseline <dir>` flag)

- [x] **Step 1:** Add `--baseline <dir>`: for each of 1280×900, 390×844, 844×390 × light/dark, open `/skills/geography/solar-system` (warp-in skipped as the script already does), screenshot: overview; Earth card (search "Earth", choose it); tour stop 1; Fly the rocket HUD; My view drawer open; Beyond picker. Save as `<dir>/<w>x<h>-<theme>-<view>.png`. Record page errors.
- [x] **Step 2:** Run `npm run build && node scripts/checkSolarUi.js --baseline /tmp/bix-solar-baseline`. Expected: 36 screenshots, zero page/module errors.
- [x] **Step 3:** Keep `/tmp/bix-solar-baseline` until Task 9 passes.

### Task 1: System maths and validation

**Files:**

- Create: `src/pages/skills/geography/systems/systemMath.js`
- Create: `src/pages/skills/geography/systems/validateSystem.js`
- Test: `src/pages/skills/geography/systems/systemMath.test.js`, `src/pages/skills/geography/systems/validateSystem.test.js`

**Interfaces:**

- Produces:
  - `densityGcm3(massEarth: number, radiusEarth: number): number` — `5.514 * mass / radius³`
  - `surfaceGravity(massEarth, radiusEarth): number` — `mass / radius²` (Earth = 1)
  - `yearInEarthYears(periodDays: number): number` — `periodDays / 365.25`
  - `positionLy({ raHours, decDeg, distanceLy }): {x,y,z}` — `skyDirection()` from `constellationSkyLayout.js` × distance (scene y-up ecliptic frame, home at origin)
  - `directionBetween(fromPos, toPos): {x,y,z}` — unit vector; `{x:0,y:0,z:0}` if equal
  - `systemAhead(heading: {x,y,z}, fromId: string, entries: RegistryEntry[]): string|null` — entry with largest dot(heading, direction) if that dot ≥ `Math.cos(30°)`, else null
  - `validateSystem(definition): string[]` — list of human-readable problems; empty when valid (fields per "Definition shape" below)

**Definition shape** (all later tasks use these exact names):

```js
{
  id, name, phrase, spokenName, home: boolean,
  place: { galaxy: "milky-way", galaxyLabel: "Milky Way" },
  position: { raHours, decDeg, distanceLy },            // home: { raHours: 0, decDeg: 0, distanceLy: 0 }
  starPhrase,                                            // "the Sun" / "TRAPPIST-1"
  stars: [{ id, name, spokenName, radius, look: { texture?, color, emissive, emissiveIntensity }, light: { color, intensity }, card? }],
  planets: [{ id, name, spokenName, kindLabel, classification?, radius, distance, speed, orbit?, tilt,
              tidallyLocked?, hasRings?, look: { texture? | surface? | procedural? }, moons: [],
              tourNarration, facts, closer?, play?: { yearInEarthYears?, gravity?, hasSurface }, stats?: [{ label, value, compare }],
              sections?: { rings?, dayNight?, moonPhases?, auroras? }, lineUp?: boolean }],
  moonDetails: { "<planetId>/<moonName>": { label, diameter, summary, facts } },
  tour: { stops: string[], finish: "pale-blue-dot" | "end", finishLabel },
  flight: { edgeRadius, startBodyId, clues: [], badges: [] },
  scene: { camera: { position, target }, honesty: string|null, scaleNote },
  welcome: string|null,
  mapCard: { starType, planetCount, fact },
  extras: { meteor, missions, iss, comet, earthEffects, saturnRingDetail, asteroidBelt, moonPhases, paleBlueDot, lineUp, sunTaps, liftOff, warpIn },
  sources: [{ what, url }],
}
```

- [x] **Step 1: Write failing tests**

```js
test("density and gravity follow mass and width", () => {
  assert.equal(densityGcm3(1, 1).toFixed(3), "5.514");
  assert.equal(densityGcm3(1.374, 1.116).toFixed(1), "5.4");
  assert.equal(surfaceGravity(0.326, 0.755).toFixed(2), "0.57");
});
test("a 7-year-old's age follows the orbit period", () => {
  assert.equal(Math.floor(7 / yearInEarthYears(1.51088) + 1e-9), 1692);
  assert.equal(Math.floor(7 / yearInEarthYears(18.7729) + 1e-9), 136);
});
test("positions use the constellation sky's frame", () => {
  const p = positionLy({ raHours: 23.1082, decDeg: -5.0414, distanceLy: 40.66 });
  const d = skyDirection({ raHours: 23.1082, decDeg: -5.0414 });
  assert.ok(Math.abs(p.x - d.x * 40.66) < 1e-9 && Math.abs(p.z - d.z * 40.66) < 1e-9);
});
test("directionBetween is reversible", () => { /* a→b equals −(b→a) */ });
test("systemAhead picks the system within 30° of the heading, else null", () => { /* three fixture entries */ });
test("validateSystem reports a missing startBodyId, a clue target that is no body, and a tour stop that is no body", () => { ... });
```

- [x] **Step 2:** Run `node --test src/pages/skills/geography/systems/`. Expected: FAIL (modules missing).
- [x] **Step 3:** Implement both modules. `validateSystem` checks: required top-level fields; ≥1 star; unique body ids; `flight.startBodyId`, every `tour.stops[]` and every clue `target` resolve to a star, planet or `<planetId>/<moon>` id (extras-provided ids such as `ISS`, `asteroid-belt`, `halleys-comet` are allowed only when the matching extra is on); `spokenName` on every star and planet; `sources` non-empty unless `home`; `play.gravity`/`play.yearInEarthYears` numbers when present.
- [x] **Step 4:** Run the tests. Expected: PASS.
- [x] **Step 5:** Commit `feat(systems): add system maths and definition validation`.

### Task 2: Home definition (data moved byte-for-byte)

**Files:**

- Create: `src/pages/skills/geography/systems/home.js`
- Test: `src/pages/skills/geography/systems/homeSnapshot.test.js`

**Interfaces:**

- Consumes: Task 1 shape.
- Produces: `export const HOME_SYSTEM` (definition, `id: "solar-system"`, `name: "Solar System"`, `phrase: "the Solar System"`, `spokenName: "the Solar System"`, `starPhrase: "the Sun"`, `home: true`).

- [x] **Step 1: Write the snapshot test first, from the current source.** Copy, from `SolarSystem.jsx:285-479`, each planet's `name, radius, distance, speed, tilt, hasRings, moons[] (all fields), tourNarration, facts` into the test as literal expected values; plus `PLANET_PLAY` (`planetPlay.js`), `PLANET_DETAILS` keys, `moonFacts` keys, `FLIGHT_CLUES` ids/targets and `FLIGHT_BADGES` (`flightClues.js`), sun radius `5`, camera `[0,72,128]→[0,0,0]`, edge radius `1350`. Assert `HOME_SYSTEM` matches each value (`deepEqual`) and `validateSystem(HOME_SYSTEM)` is `[]`.
- [x] **Step 2:** Run it. Expected: FAIL (module missing).
- [x] **Step 3:** Create `home.js`. Planet ids equal names (`"Mercury"`…) so existing search ids, mission ids and clue targets stay identical. `look.texture` holds the current paths (`/static/2k_mercury.jpg` …); Pluto `look.surface: "Pluto"`. `orbit: PLANET_ORBITS.<Name>`. `kindLabel` `"Planet"`, Pluto `"Dwarf planet"` with `classification: "Dwarf planet"`. `play` from `PLANET_PLAY`; `closer`/`facts` overrides from `PLANET_DETAILS`; `moonDetails: moonFacts`; `lineUp: true` where `TRUE_RADII_KM` has the name; `sections`: Saturn `rings`, Earth `dayNight, moonPhases, auroras`. `tour: { stops: [8 planets + Pluto in current order], finish: "pale-blue-dot", finishLabel: "One last look back at Earth" }`. `flight: { edgeRadius: 1350, startBodyId: "Earth", clues: FLIGHT_CLUES, badges: FLIGHT_BADGES }`. All `extras` true. `stars[0]`: `{ id: "Sun", name: "Sun", spokenName: "the Sun", radius: 5, look: { texture: "/static/2k_sun.jpg", emissive: 0xffcc66, emissiveIntensity: 0.6 }, light: { color: 0xffffff, intensity: 400 } }`. Keep `planetPlay.js`, `planetDetails.js`, `moonFacts.js`, `flightClues.js` exports in place (re-exported data) so nothing else breaks yet.
- [x] **Step 4:** Run the test. Expected: PASS.
- [x] **Step 5:** Commit `feat(systems): move home data into a definition`.

### Task 3: Registry, test-only system and the shared definition suite

**Files:**

- Create: `src/pages/skills/geography/systems/registry.js`
- Create: `src/pages/skills/geography/systems/fixtures/testSystem.js` (test-only; never imported by app code)
- Test: `src/pages/skills/geography/systems/definitions.test.js`

**Interfaces:**

- Produces:
  - `HOME_SYSTEM_ID = "solar-system"`
  - `SYSTEM_REGISTRY: RegistryEntry[]` where `RegistryEntry = { id, name, phrase, home, place, position, mapCard, load: () => Promise<definition> }` — home only in this task; TRAPPIST-1 added in Task 11
  - `registryEntry(id): RegistryEntry|null`, `loadSystem(id): Promise<definition>` (rejects for unknown id), `otherSystems(id): RegistryEntry[]`
- `testSystem.js`: `id: "test-system"`, one star, two planets, `position: { raHours: 6, decDeg: 0, distanceLy: 10 }`, two clues, minimal tour.

- [x] **Step 1: Write the failing suite.** For every definition in `[HOME_SYSTEM, ...await Promise.all(SYSTEM_REGISTRY.map(e => e.load())), TEST_SYSTEM]`: `validateSystem` is `[]`; registry entry `name/phrase/position` equal the definition's; when a planet has `stats` with a density, it matches `densityGcm3` of its mass/width to 1 decimal; tour stops cover every planet; `play.yearInEarthYears` equals `yearInEarthYears(periodDays)` when a planet has `periodDays`. Also: `loadSystem("nope")` rejects; `otherSystems(HOME_SYSTEM_ID)` excludes home; registry module source contains no `import(` of a fixture.
- [x] **Step 2:** Run. Expected: FAIL.
- [x] **Step 3:** Implement. `load` for home returns `Promise.resolve(HOME_SYSTEM)`; future entries use `() => import("./<file>.js").then(m => m.<EXPORT>)`.
- [x] **Step 4:** Run. Expected: PASS.
- [x] **Step 5:** Commit `feat(systems): add the system registry and shared definition suite`.

### Task 4: Scene reads bodies from the definition

**Files:**

- Modify: `src/pages/skills/geography/SolarSystem.jsx` (planet data block `:285-479`, materials `:202-280`, `createPlanetSystem` `:578`, `createPlanetInfo`/`createMoonInfo` `:1262-1306`, search entries `:746-774`, `applyWorldPoses` `:1681`)

**Interfaces:**

- Consumes: `HOME_SYSTEM`.
- Produces: `ThreeSolarSystem({ system })` — the scene component takes a definition (default `HOME_SYSTEM` until Task 8).

- [x] **Step 1:** Replace inline `planetData` with `system.planets`, building materials from `look`: `texture` → `MeshStandardMaterial({ map })` with the same metalness/roughness as today; `surface` → `surfaceMaterial(name)`; `procedural` → Task 12 (throw `Error("procedural looks arrive in Task 12")` for now). Sun mesh/material from `system.stars[0]`. Point light colour/intensity from `stars[0].light`.
- [x] **Step 2:** `createPlanetInfo` reads `kindLabel`, `classification ?? "<order> planet from <starPhrase>"`, `facts`, `closer`, `play`, `stats`, `sections`, `lineUp`; `createMoonInfo` reads `system.moonDetails`. Search `kindLabel` from definition.
- [x] **Step 3:** Pass `tidallyLocked` through to `getBodyPose` (already supported).
- [x] **Step 4:** Run `npm run lint && npm test && npm run build`. Expected: all pass; no test changes needed.
- [x] **Step 5:** Commit `refactor(solar): build the scene from the system definition`.

### Task 5: Cards and space birthday read the body, not the name

**Files:**

- Modify: `src/pages/skills/geography/planetPlay.js`, `PlanetPlayCard.jsx`, `SolarInfoCard.jsx`
- Test: `tests/components/planetPlayCard.test.jsx`, `tests/components/SolarInfoCard.test.jsx`, `src/pages/skills/geography/planetPlay.test.js` (existing — update)

**Interfaces:**

- Produces:
  - `playFor(play)`, `ageOn(play, earthAge)`, `ageSentence(name, play, earthAge, { isHome })`, `weightOn(play)`, `weightSentence(name, play, { isHome })` — `isHome` true only for the definition's home planet (`startBodyId` of the home system) so "On Earth you're 7, of course!" stays.
  - `<PlanetPlayCard name play isHome onLineUp />`
  - `SolarInfoCard` reads `body.play`, `body.closer`, `body.sections`, `body.lineUp`, `body.stats`, `body.honesty`, `tour.finishLabel`.

- [x] **Step 1: Failing tests.** Update existing tests to the new props with identical expected text for home. Add: `TRAPPIST-1 b age for 7 is "On TRAPPIST-1 b you'd be 1692!"` (play `{ yearInEarthYears: 1.51088 / 365.25, gravity: 1.10, hasSurface: true }`); `stats render as "Density 5.4 g/cm³ · Earth is 5.5"`; `honesty line shows when the body carries one`; `last tour button uses tour.finishLabel`.
- [x] **Step 2:** Run `npx vitest run tests/components/planetPlayCard.test.jsx tests/components/SolarInfoCard.test.jsx && node --test src/pages/skills/geography/planetPlay.test.js`. Expected: FAIL.
- [x] **Step 3:** Implement. Name checks (`'Saturn'`, `'Earth'`, `earthMoon`, `TRUE_RADII_KM[...]`, `PLANET_DETAILS[...]`) become `body.sections.*`, `body.lineUp`, `body.closer`. Moon phases section shows for a body with `sections.moonPhases` (home sets it on Earth and on `Earth/Moon` moon detail).
- [x] **Step 4:** Run. Expected: PASS; home card text identical.
- [x] **Step 5:** Commit `refactor(solar): cards and play read body data`.

### Task 6: Free flight and the flight HUD take the definition's flight settings

**Files:**

- Modify: `src/pages/skills/geography/solarFreeFlight.js`, `SolarFlightControls.jsx`, `flightClues.js`
- Test: `src/pages/skills/geography/solarFreeFlight.test.js`, `tests/components/SolarFlightControls.test.jsx`

**Interfaces:**

- Produces:
  - `createSolarFreeFlight({ ..., edgeRadius, startBodyId })`; `FLIGHT_EDGE_RADIUS` export removed (home passes 1350). `home()` uses `startBodyId`.
  - `<SolarFlightControls ... clues badges startName systemPhrase />` — "Back to {startName}" (home: "Back to Earth"), section label "Fly through {systemPhrase}", help text "...The sizes and distances in {systemPhrase} are compressed."
  - `createFlightRound(random, clues)` unchanged signature; the HUD passes its `clues` prop.

- [x] **Step 1: Failing tests.** `free flight starts beside startBodyId` (bodies fixture without an "Earth"); `edge clamps at the given edgeRadius`; `HUD says Back to TRAPPIST-1 e and Fly through TRAPPIST-1 for those props`; existing home HUD tests unchanged in text.
- [x] **Step 2:** Run both test files. Expected: FAIL.
- [x] **Step 3:** Implement and pass `system.flight` values from `SolarSystem.jsx`.
- [x] **Step 4:** Run. Expected: PASS.
- [x] **Step 5:** Commit `refactor(solar): flight settings come from the definition`.

### Task 7: Home extras gated by the definition (scene)

**Files:**

- Modify: `src/pages/skills/geography/SolarSystem.jsx` (modules `:1698-1979`, asteroid belt `:635-721`, reset `:1144-1219`, tour `:1400-1437`, sun taps, warp-in, lift-off)
- Test: `src/pages/skills/geography/systems/sceneGuard.test.js`

**Interfaces:**

- Consumes: `system.extras`, `system.tour`.
- Produces: none new; each extra is created only when on, and every use is null-safe (`iss?.`, `comet?.`, …).

- [x] **Step 1: Write the guard test.** Read the source of the files listed in Global Constraints; assert no match for `/["'`](Mercury|Venus|Earth|Mars|Jupiter|Saturn|Uranus|Neptune|Pluto|Sun|Moon)["'`]/`and no`/trappist/i`. Expected now: FAIL (lists offending lines).
- [x] **Step 2:** Gate one extra at a time, running `npm test` after each: `meteor`, `missions`, `iss`, `comet`, `earthEffects` (day/night, atmospheres, aurora), `saturnRingDetail`, `asteroidBelt` (+ small-body regions, region labels, belt flight body, Tweakpane belt folder), `moonPhases` (`getMoonPhase`), `paleBlueDot`, `lineUp`, `sunTaps` (sneeze/safety; otherwise a star with `card` opens its card — Task 12), `liftOff` (tour starts at the first stop when off), `warpIn`. Body lookups that need a home body take its id from the extra's config: e.g. `extras: { iss: { body: "Earth" }, saturnRingDetail: { body: "Saturn" }, earthEffects: { body: "Earth" }, meteor: { body: "Earth" }, paleBlueDot: { body: "Earth" } }` — update `home.js` and the Task 2 snapshot accordingly (truthy objects instead of `true`).
- [x] **Step 3:** Tour uses `system.tour.stops` (ids → search entries) and ends with `finish`: `"pale-blue-dot"` keeps today's behaviour; `"end"` exits the tour.
- [x] **Step 4:** Run `npm run lint && npm test && npm run build`. Expected: PASS including the guard test.
- [x] **Step 5:** Commit `refactor(solar): home-only features become home extras`.

### Task 8: Page wrapper and toolbar from the definition

**Files:**

- Create: `src/pages/skills/geography/SolarSystemPage.jsx` (new default export used by the route)
- Modify: `src/main.jsx:107` (lazy import `SolarSystemPage`), `SolarSystem.jsx` (toolbar `:2431-2495`, missions, hint text, search placeholder, `aria-label`s)
- Test: `tests/components/solarSystemPage.test.jsx`

**Interfaces:**

- Produces:
  - `SolarSystemPage()` — state `{ systemId: HOME_SYSTEM_ID, arrival: null }`; renders `<ThreeSolarSystem key={systemId} system={definition} arrival={arrival} onTravel={travel} />`. `travel({ to, mode: "flown"|"autopilot", direction })` loads the target via `loadSystem`, then sets state (Task 17 fills the trip parts). While loading, a `role="status"` "Getting {phrase} ready…" message shows.
  - Adult-only switch: `?system=<id>` read once on mount, honoured only when `readDebugFlags(location.search).debug` is true (removed in Task 17).
  - Toolbar: Tour (`Tour {phrase}`), Fly the rocket, Constellations, Launch meteor (`extras.meteor`), Beyond, and — from Task 22 — Galaxy map; Home appears when `!system.home` (Task 17). Search placeholder/labels "Search {phrase}". Missions render only with `extras.missions`.
- [x] **Step 1: Failing test** with `ThreeSolarSystem` mocked (`vi.mock('../../src/pages/skills/geography/SolarSystem.jsx', ...)`) to record props: `renders home by default`; `?system=test... without debug is ignored`; `a travel request remounts the scene with the new key and system`.
- [x] **Step 2:** Run `npx vitest run tests/components/solarSystemPage.test.jsx`. Expected: FAIL.
- [x] **Step 3:** Implement; `SolarSystem.jsx` keeps `export default ThreeSolarSystem` for tests and the wrapper.
- [x] **Step 4:** Run full checks. Expected: PASS.
- [x] **Step 5:** Commit `feat(solar): page wrapper switches systems by remounting the scene`.

### Task 9: Home before/after comparison (gate)

- [x] **Step 1:** `npm run build && node scripts/checkSolarUi.js --baseline /tmp/bix-solar-after`.
- [x] **Step 2:** Add `--compare <baselineDir> <afterDir>` to the script: pixel-diff each pair (the random star field and asteroid placement differ per load, so flag pairs where more than 2% of pixels differ by more than 10%), and list flagged pairs. Review every flagged pair by eye against its baseline.
- [x] **Step 3:** Expected: no unexplained differences, zero page/module errors. Fix anything found, re-run once. Do not start Slice 2 until this passes.

## Slice 2 — TRAPPIST-1 (Sonnet; fact checks Haiku)

### Task 10: Verify TRAPPIST-1 facts against the archive (Haiku)

**Files:** none (output feeds Task 11's `sources` and values).

- [x] **Step 1:** Check each value below against the NASA Exoplanet Archive (TRAPPIST-1 system overview; Agol et al. 2021 parameter set) and NASA's TRAPPIST-1 pages; check JWST results (Greene et al. 2023 for b; Zieba et al. 2023 for c); check "neighbour looks bigger than our Moon" (g from f at closest approach: ≈0.66° vs Moon ≈0.52°) and "our Sun is a faint star in Leo, as Earth sees it, about magnitude 5". Report any value that differs, with the source URL.
  - Star: 2,566 K; 0.0898 M☉; 0.1192 R☉; 40.66 ly; RA 23.1082 h; Dec −5.0414°; constellation Aquarius.
  - Planets (width R⊕, mass M⊕, period d, a AU): b 1.116/1.374/1.51088/0.01154 · c 1.097/1.308/2.42180/0.01580 · d 0.788/0.388/4.04922/0.02227 · e 0.920/0.692/6.10101/0.02925 · f 1.045/1.039/9.20754/0.03849 · g 1.129/1.321/12.35290/0.04683 · h 0.755/0.326/18.7729/0.06189.
- [x] **Step 2:** Use the verified values in Task 11; list sources in the definition.

### Task 11: TRAPPIST-1 definition

**Files:**

- Create: `src/pages/skills/geography/systems/trappist1.js`
- Modify: `src/pages/skills/geography/systems/registry.js` (add entry with `load: () => import("./trappist1.js").then(m => m.TRAPPIST_1)`)
- Test: `src/pages/skills/geography/systems/trappist1.test.js`

**Interfaces:**

- Produces: `export const TRAPPIST_1` — `id: "trappist-1"`, `name: "TRAPPIST-1"`, `phrase: "TRAPPIST-1"`, `spokenName: "TRAPPIST one"`, `home: false`, `starPhrase: "TRAPPIST-1"`, `place: { galaxy: "milky-way", galaxyLabel: "Milky Way" }`, `position: { raHours: 23.1082, decDeg: -5.0414, distanceLy: 40.66 }`.

Pinned values:

- Planet ids `trappist-1b` … `trappist-1h`; names `TRAPPIST-1 b` …; spoken `TRAPPIST one B` …; `kindLabel: "Planet"`.
- Scene `radius = round(0.45 × width, 2)`; `distance = round(a_AU × 1000, 1)`; `speed = round(0.02 × 1.51088 / periodDays, 5)`; `tilt: 0`; `tidallyLocked: true`; `moons: []`.
- `play: { yearInEarthYears: periodDays / 365.25, gravity: round(surfaceGravity, 2), hasSurface: true }`; keep `periodDays`, `massEarth`, `radiusEarth` on each planet for the suite.
- `stats` per planet (a density stat also carries numeric `densityGcm3`, per Task 3): `Width {w} × Earth`, `Mass {m} × Earth`, `Density {ρ} g/cm³` (compare "Earth is 5.5"), `A year lasts {p} days` (compare "Earth's lasts 365"); b and c add a measured-temperature stat from Task 10.
- Star: `radius: 3`, `look: { color: 0xff7a4d, emissive: 0xff6a3a, emissiveIntensity: 0.9 }`, `light: { color: 0xffa070, intensity: <builder tunes> }`, `card` with classification "Ultracool red dwarf star" and facts (slightly wider than Jupiter; about 9% of the Sun's mass; surface about 2,560 K, less than half as hot as the Sun's ≈5,770 K; flares often).
- `tour: { stops: ["TRAPPIST-1", "trappist-1b", …, "trappist-1h"], finish: "end", finishLabel: "Finish the tour" }`.
- `flight: { edgeRadius: 180, startBodyId: "trappist-1e", clues: [≥12 clues: every planet and the star at least once; "home-sign" clue target added in Task 18], badges: [{1,"First discovery","🌟"},{5,"Red Star Scout","🔴"},{10,"TRAPPIST Pilot","🚀"}] }`.
- `scene: { camera: { position: [0, 45, 85], target: [0, 0, 0] }, honesty: "Nobody has seen these planets up close. This is a picture to help us imagine.", scaleNote: "Sizes, distances and speeds are squeezed and sped up." }`.
- `welcome: "Welcome to TRAPPIST-1, about 40 light-years from home! Seven rocky planets circle this little red star."`
- `mapCard: { starType: "Ultracool red dwarf", planetCount: 7, fact: "All seven planets would fit inside Mercury's orbit." }`.
- `extras`: all false.
- Teaching facts (Task 10-verified only): orbits inside Mercury's; years in days; resonant chain; "scientists think" same face; neighbour bigger than our Moon; seen edge-on from Earth so planets pass in front of the star; our Sun a faint star from here; no known moons; water zone e, f, g (d at its inner edge). Every number gets a home comparison.
- Looks: `look.procedural: { base, accent, kind: "bare-rock" | "rocky" | "icy-maybe" }` — b, c `bare-rock` dark; others `rocky`; f, g, h may be `icy-maybe` with facts saying "might".

- [x] **Step 1: Failing tests:** `a 7-year-old is 1692 on b and 136 on h`; `densities round to 5.5, 5.5, 4.4, 4.9, 5.0, 5.1, 4.2`; `e is the flight start and the water-zone planets are e, f and g`; `every planet has a spoken name without a minus sign`; plus the shared suite (Task 3) now loads TRAPPIST-1.
- [x] **Step 2:** Run `node --test src/pages/skills/geography/systems/`. Expected: FAIL.
- [x] **Step 3:** Write the definition.
- [x] **Step 4:** Run. Expected: PASS.
- [ ] **Step 5:** Commit `feat(systems): add the TRAPPIST-1 definition`.

### Task 12: Scene support for TRAPPIST-1 features

**Files:**

- Create: `src/pages/skills/geography/systems/proceduralPlanet.js` (canvas-texture or shader material from `look.procedural`; small, ≤512px canvas)
- Modify: `SolarSystem.jsx`, `ConstellationCard.jsx`, `SolarSettingsDrawer.jsx`, `solarViewSettings.js`
- Test: `src/pages/skills/geography/systems/proceduralPlanet.test.js`, `tests/components/ConstellationCard.test.jsx`, `tests/components/solarSettingsDrawer.test.jsx`

**Interfaces:**

- Produces: `proceduralPlanetMaterial(look, { quality }): THREE.Material` (seeded by planet id so it never changes between visits); star `card` → tapping the star or a tour stop on it opens `SolarInfoCard` with `kind: "star"`; `<ConstellationCard viewpointNote />` showing "Star patterns as seen from Earth" when `!system.home`; drawer hides toggles whose extra is off (`moonLabels` when no planet has moons, belt toggle without `asteroidBelt`).

- [x] **Step 1: Failing tests:** `same id gives the same texture colours`; `constellation card shows the Earth-viewpoint note`; `drawer hides Moon names when no moons`.
- [x] **Step 2:** Run. Expected: FAIL.
- [x] **Step 3:** Implement; also: read-aloud uses `spokenName` (`speakPlanet`, card read buttons); arrival `welcome` is spoken once after mount when `!isMuted()` and shown as a tap message; honesty line passed on planet info for non-home systems; `scene.camera` sets the default/Reset view.
- [x] **Step 4:** Run full checks. Expected: PASS.
- [ ] **Step 5:** Commit `feat(solar): render and explain TRAPPIST-1`.

### Task 13: TRAPPIST-1 playthrough tests

> Progress note: `systems/bodyInfo.js` already exists (built in Task 5); this task adds only the TRAPPIST-1 tests.

**Files:**

- Test: `tests/components/trappist1Cards.test.jsx`

- [x] **Step 1:** Write tests driving `SolarInfoCard` with TRAPPIST-1 bodies built by the scene's info builder (export `buildPlanetInfo(system, planet, index)` and `buildStarInfo(system, star)` from a new `src/pages/skills/geography/systems/bodyInfo.js`, moving the logic out of `SolarSystem.jsx`): `b card says "1st planet from TRAPPIST-1"`; `space birthday choice of 7 reads "On TRAPPIST-1 b you'd be 1692!"`; `Bix on the scales is offered when gravity is present`; `star card shows the honesty line`; `tour card's last button reads Finish the tour`. And `SolarFlightControls` with TRAPPIST-1's clues: a full clue deck has no two identical targets in a row (seeded random).
- [x] **Step 2:** Run. Expected: FAIL, then implement `bodyInfo.js`, run again: PASS. Home info builder tests: home Mercury card still says "1st planet from the Sun".
- [ ] **Step 3:** Commit `test(solar): TRAPPIST-1 cards, birthday and clue deck`.

## Slice 3 — Travel (Opus)

### Task 14: Trip timeline (pure)

**Files:**

- Create: `src/pages/skills/geography/systems/tripTimeline.js`
- Test: `src/pages/skills/geography/systems/tripTimeline.test.js`

**Interfaces:**

- Produces:
  - `WARNING_SECONDS = 3`, `MAX_TRIP_SECONDS = 10`, `EDGE_OFFER_MARGIN = 5`, `ARRIVE_INSET = 20`, `TURN_BACK_ALIGNMENT = -0.5`, `TURN_BACK_HOLD = 0.6`
  - `dashSecondsFor(distanceLy) = Math.min(7, 5 + 0.75 * Math.log10(Math.max(distanceLy, 1)))`
  - `tripFrame({ elapsed, dashSeconds, calm }) → { phase: "warning"|"departing"|"arriving"|"done", progress, handoff: boolean, streakSpeed, streakBrightness, fade }` — departing ends at half the dash (`handoff` true on that frame), arriving covers the rest.
  - `shouldWarn({ distance, edgeRadius, radialSpeed, orbiting, autopilot, armed })` — true when `distance >= edgeRadius - EDGE_OFFER_MARGIN && radialSpeed > 0 && !orbiting && !autopilot && armed`. `armed` turns false after Back to start until the ship is back below `edgeRadius - 50`.
  - `warningCancelled(alignmentWithOutward)` — `< 0`
  - `createTurnBackIntent()` → `{ update(dt, alignmentWithTrip): boolean, reset() }` — true once alignment `< -0.5` has held `>= 0.6 s`.
  - `arrivalPose(edgeRadius, directionToOrigin) → { position, lookAt: [0,0,0] }` — position `directionToOrigin × (edgeRadius − ARRIVE_INSET)`.

- [x] **Step 1: Failing tests:** `40.66 ly dash is about 6.2 s`; `any distance keeps warning + dash ≤ 10 s` (1, 40.66, 1e3, 1e9); `handoff happens exactly once at half the dash`; `warning does not start while orbiting, on autopilot, or straight after Back to start`; `facing back towards the star cancels the warning`; `a small wobble never turns back; a held turn-around does`; `reduced motion gives zero streaks and a fade`.
- [x] **Step 2:** Run. Expected: FAIL. **Step 3:** Implement. **Step 4:** PASS.
- [ ] **Step 5:** Commit `feat(travel): trip timeline`.

### Task 15: Trip mode in free flight

**Files:**

- Modify: `src/pages/skills/geography/solarFreeFlight.js`
- Test: `src/pages/skills/geography/solarFreeFlight.test.js`

**Interfaces:**

- Consumes: Task 14; `SolarSystem.jsx` builds `tripTo` from `otherSystems(system.id)[0]` and `directionBetween(positionLy(current), positionLy(target))` (Task 1/3).
- Produces on the free-flight API:
  - option `tripTo: { id, phrase, direction, distanceLy } | null` (the other system; with two systems it is always set; Task 18 adds signposts, not selection)
  - `onChange` view gains `trip: null | { phase, secondsLeft, progress, toPhrase, distanceLy, calm }`
  - `turnBack()`, `startAutopilotTrip()` (no input, used by Home/Jump there), `beginArrival({ fromDirection, mode })` (called on mount by the arriving scene), callbacks `onHandoff({ to, mode, direction })` and `onTripDone()`
  - Edge behaviour: clamp at `edgeRadius` stays during the warning; after the warning the clamp lifts and the ship is carried along the trip direction while steering still turns the ship/camera.
- [x] **Step 1: Failing tests:** `crossing the edge outward starts a 3 s warning`; `recrossing the edge restarts the warning once and never starts two trips`; `steering back during the warning cancels it`; `after the warning the ship leaves along the trip direction and onHandoff fires once`; `turnBack during departing returns the ship inside the edge facing the star`; `beginArrival places the ship at the arrival pose and ends with onTripDone, still in free flight`; `turnBack during arriving fires onHandoff back to the origin`.
- [x] **Step 2:** FAIL. **Step 3:** Implement. **Step 4:** PASS.
- [ ] **Step 5:** Commit `feat(travel): fly out of a system`.

### Task 16: Trip HUD

**Files:**

- Create: `src/pages/skills/geography/SolarTripHud.jsx`, `SolarTripHud.css`
- Modify: `SolarFlightControls.jsx` (render the HUD when `view.trip`; remove the "Warp to Beyond" edge offer and `onBeyond` prop)
- Test: `tests/components/SolarTripHud.test.jsx`, `tests/components/SolarFlightControls.test.jsx`

**Interfaces:**

- Produces: `<SolarTripHud trip onTurnBack />` — warning: "Leaving {fromPhrase} — heading for {toPhrase} in 3… 2… 1…" (live region), big **Turn back** button (48px+, keyboard `B` and `Backspace` outside inputs), honesty label "Sped up - even light takes about {Math.round(distanceLy)} years to make this trip."; `calm` shows a `role="progressbar"` with `aria-valuenow`.
- [x] **Step 1: Failing tests:** `warning counts down and speaks once when unmuted`; `Turn back button and B key call onTurnBack`; `switching to reduced motion mid-trip keeps the trip and shows progress`; `no Warp to Beyond button at the edge any more`.
- [x] **Step 2:** FAIL. **Step 3:** Implement with theme tokens. **Step 4:** PASS.
- [ ] **Step 5:** Commit `feat(travel): trip warning and turn back`.

### Task 17: Hand-over, autopilot trips and Home

**Files:**

- Modify: `SolarSystemPage.jsx`, `SolarSystem.jsx` (accept `arrival`, `onTravel`; Home button in toolbar and flight HUD; autopilot trip for Home; remove the `?system=` switch), `SolarFlightControls.jsx` (Home button when away)
- Test: `tests/components/solarSystemPage.test.jsx`

**Interfaces:**

- Consumes: Tasks 8, 15, 16.
- Produces: `arrival = { from: id, mode: "flown"|"autopilot", fromDirection, elapsedAtHandoff }` passed to the new scene; the scene calls `freeFlight.beginArrival` (flown) or runs the autopilot arrival then `resetView()` (autopilot). `onTravel` is ignored while a load or trip is in flight.

- [x] **Step 1: Failing tests (scene mocked):** `handoff remounts into the other system with arrival details`; `travel requests while a trip is running are ignored`; `a failed system load lands the child home with a message` (mock `loadSystem` rejection → `role="alert"` "We couldn't reach {phrase}. Back home for now."); `arrival welcome speaks once, never when muted, not after turn back`; `Home button shows only away from home and starts an autopilot trip`; `Beyond from TRAPPIST-1 returns to TRAPPIST-1` (Beyond's existing home-return lands at the current mount's overview — assert no travel request is made).
- [x] **Step 2:** FAIL. **Step 3:** Implement. Total autopilot trip ≤10 s using the same timeline (no warning phase: `elapsed` starts at `WARNING_SECONDS`). **Step 4:** PASS, full checks.
- [ ] **Step 5:** Commit `feat(travel): travel between systems and Home`.

### Task 18: Signposts and our Sun from TRAPPIST-1

**Files:**

- Create: `src/pages/skills/geography/systems/signposts.js` (pure), `src/pages/skills/geography/systemSignposts.js` (scene module)
- Modify: `SolarSystem.jsx` (add module; add signpost bodies to free-flight targets), `trappist1.js` (add the "find the sign pointing home" clue, target `sign:solar-system`)
- Test: `src/pages/skills/geography/systems/signposts.test.js`

**Interfaces:**

- Produces:
  - `signpostsFor(currentId, entries, edgeRadius) → [{ id: "sign:<id>", targetId, label, position, direction }]` — position `direction × (edgeRadius + 30)`; label `"{name} — {Math.round(distanceLy)} light-years this way"`, home's label `"Home — the Solar System"`.
  - `createSystemSignposts({ scene, camera, signposts, makeLabel, homeStarDot: boolean, quality })` module (`update`, `dispose`); away from home it also draws a faint star dot for our Sun on the sky sphere in home's direction.
- [ ] **Step 1: Failing tests:** `home's sign points towards TRAPPIST-1's sky direction`; `TRAPPIST-1's sign points the opposite way and is labelled Home — the Solar System`; `with the test system registered, every system gets a sign to every other`.
- [ ] **Step 2:** FAIL. **Step 3:** Implement. **Step 4:** PASS, full checks.
- [ ] **Step 5:** Commit `feat(travel): signposts to other systems`.

## Slice 4 — Galaxy map (Sonnet, Opus review)

### Task 19: Map catalogue (pure)

**Files:**

- Create: `src/pages/skills/geography/galaxyMapData.js`
- Modify: `beyondDestinations.js` (export unchanged; catalogue reads it)
- Test: `src/pages/skills/geography/galaxyMapData.test.js`

**Interfaces:**

- Produces:
  - `MAP_LEVELS = ["galaxies", "milky-way", "neighbourhood"]`
  - `GALAXIES` — Milky Way (enterable), Andromeda (2.5 million ly; RA 0.712 h, Dec +41.27), Triangulum (2.7 million ly; 1.564 h, +30.66), Large Magellanic Cloud (160,000 ly; 5.392 h, −69.76), Small Magellanic Cloud (200,000 ly; 0.877 h, −72.83); each `{ id, name, distanceLy, look: "dont-land", card: { what, fact } }` except the Milky Way.
  - `mapDistance(ly) = 40 * Math.log10(ly / 10000)` (level 1, labelled "Distances squeezed to fit")
  - `mapCatalogue(registry, destinations) → { galaxies, events, systems }` — events from `availableDestinations()` (Space ripples, placed on level 1 at a fixed direction, label "Far beyond our galaxy"); systems from the registry with neighbourhood positions `positionLy()` at 1 unit per light-year.
- [x] **Step 1: Failing tests:** `only the Milky Way can be entered`; `Andromeda is farther on the map than the Magellanic Clouds`; `Space ripples is an event on the galaxies level`; `every registered system appears in the neighbourhood at its real position`; `adding the test system adds a marker without code changes`.
- [x] **Step 2–4:** FAIL → implement → PASS.
- [ ] **Step 5:** Commit `feat(map): galaxy map catalogue`.

### Task 20: Milky Way image (owner gate on usage terms)

**Files:**

- Create: `public/static/milky-way-4096.jpg`, `public/static/milky-way-2048.jpg`
- Modify: `src/pages/credits/Credits.jsx`, `tests/components/credits.test.jsx`

- [x] **Step 1:** Read NASA/JPL's image use policy for NASA/JPL-Caltech/R. Hurt (SSC-Caltech) "Milky Way" illustration (ssc2008-10, unannotated version). If use on this site with credit is clearly allowed, continue; otherwise **stop and ask the owner**.
- [x] **Step 2:** Download the unannotated original into a new empty directory, resize to 4096 and 2048 px squares (JPEG quality ≈ 82), check each is under 2.5 MB / 0.8 MB.
- [x] **Step 3:** Add a credits entry (id `milky-way-illustration`): "Milky Way illustration by NASA/JPL-Caltech/R. Hurt (SSC-Caltech)", source link, usage note. Extend the credits test to find it.
- [x] **Step 4:** Run `npx vitest run tests/components/credits.test.jsx`. Expected: PASS.
- [ ] **Step 5:** Commit `feat(map): add the NASA Milky Way illustration`.

### Task 21: Map scene

**Files:**

- Create: `src/pages/skills/geography/galaxyMap.js`
- Test: `src/pages/skills/geography/galaxyMap.test.js`

**Interfaces:**

- Produces: `createGalaxyMap({ renderer, quality, reducedMotion, catalogue, currentSystemId, createControls })` returning `{ open(), close(), isActive(), level(), setLevel(level), focus(markerId), projectMarkers(): [{ id, x, y, visible }], update(dt), render(), resize(size), dispose() }`. Drawn instead of the system scene (like `lineUp`). Milky Way texture `milky-way-4096.jpg` (`-2048` on low tier) on a disc with a star-particle layer and raised bulge; loaded on `open`, freed on `close`. OrbitControls allow rotate, tilt (polar 0.2–1.4 rad), pan and zoom within each level's bounds. `SUN_ON_IMAGE = { u, v }` measured from the image (Orion Spur, ≈26,000 ly from the centre).
- [x] **Step 1: Failing tests (node, no renderer: inject `createControls` and a fake renderer like `spaceRipples.test.js` does):** `opening builds the scene and closing frees the texture`; `setLevel moves the camera target to each level's centre`; `projectMarkers returns one entry per marker on the current level`; `You are here follows currentSystemId`.
- [x] **Step 2–4:** FAIL → implement → PASS.
- [ ] **Step 5:** Commit `feat(map): 3D galaxy map scene`.

### Task 22: Map panel and toolbar button

**Files:**

- Create: `src/pages/skills/geography/GalaxyMapPanel.jsx`, `GalaxyMap.css`
- Modify: `SolarSystem.jsx` (Galaxy map button in both systems; open/close the map module; marker positions; Jump there/Go home call `onTravel({ mode: "autopilot" })`; Space ripples calls `goBeyond("space-ripples")`)
- Test: `tests/components/GalaxyMapPanel.test.jsx`

**Interfaces:**

- Produces: `<GalaxyMapPanel level markers card currentSystemId onLevel onMarker onClose onJump onGoHome onVisitEvent />` — DOM marker buttons (48px, labelled) positioned from `projectMarkers()` each animation frame; header with level title and Back; cards: system (name, distance "about 40 light-years from home", star type, planet count, fact, **Jump there** / **Go home** / closes if current); galaxy (look-don't-land text, no jump); event (Space ripples, "Visit"). Read-aloud button on each card.
- [x] **Step 1: Failing tests:** `galaxies level shows Andromeda with no jump button`; `tapping the Milky Way goes to its level and Back returns`; `neighbourhood shows home and TRAPPIST-1; TRAPPIST-1 card offers Jump there`; `the current system's card closes the map instead of jumping`; `away from home the Solar System card says Go home`; `Space ripples card visits Beyond`.
- [x] **Step 2–4:** FAIL → implement → PASS; full checks. The toolbar (now six buttons at home) must fit at 390px without covering the My view button or search — e.g. icon-only labels below a width the builder picks; add a component test `toolbar labels collapse on narrow screens` if the choice is CSS-class driven.
- [ ] **Step 5:** Commit `feat(map): galaxy map panel`.

## Slice 5 — Write-up (Sonnet)

### Task 23: The add-star-system skill

**Files:**

- Create: `.claude/skills/add-star-system/SKILL.md` (frontmatter `name`, `description`, `model: sonnet`, like `add-skill-game`)

- [x] **Step 1:** Write the guide: where definitions live (`systems/`), the definition shape (link Task 1's block via `validateSystem.js`), registry entry, values to take from the NASA Exoplanet Archive and how to cite them in `sources`, honesty labels, writing rules (6–8 year olds, home comparisons, spoken names, "scientists think"), procedural looks and phone memory, credits, the shared suite (`node --test src/pages/skills/geography/systems/`), what the map/signposts/trip pick up automatically, and the batched browser check. Mention the open decision: choosing a destination by heading when a third system arrives (`systemAhead`).
- [x] **Step 2:** Dry-run it against `testSystem.js`: every step it lists exists in the code. Fix gaps.
- [ ] **Step 3:** Commit `docs(skills): add-star-system guide`.

### Task 24: Docs

**Files:**

- Modify: `docs/SOLAR_SYSTEM_IDEAS.md`, `docs/PROJECT_KNOWLEDGE.md`, `AGENTS.md` (skills table row for `add-star-system`)

- [x] **Step 1:** IDEAS: #108 and #109 statuses (◐: TRAPPIST-1 built, more systems pending), Phase 6 row, remove the five-button toolbar rule from "Build rules", mark Upcoming sequence item 6 done, add a "Galaxy map and TRAPPIST-1" implementation section with limits (device/child checks open; destination-by-heading decided at the third system).
- [x] **Step 2:** PROJECT_KNOWLEDGE: architecture note (definition-driven scene, registry, remount on system change, split trip).
- [ ] **Step 3:** Commit `docs: galaxy map and TRAPPIST-1`.

### Task 25: Final verification

- [x] **Step 1:** `npm run lint && npm test && npm run build`. Expected: all pass; report counts.
- [x] **Step 2:** Extend `scripts/checkSolarUi.js` with `--systems`: at 1280×900, 390×844, 844×390 × light/dark — home toolbar fits without overlap (six buttons); open Galaxy map → galaxies → Milky Way → neighbourhood → TRAPPIST-1 → Jump there; TRAPPIST-1 overview, a planet card, tour stop 1, Fly the rocket HUD, signpost visible; fly to the edge (test hook `?debug` teleport) → warning → Turn back; trip home via Home button. Zero page/module errors; screenshots reviewed.
- [x] **Step 3:** Fix findings; one confirm pass.
- [x] **Step 4:** Report honestly: what passed, what was not browser-checked, and that physical-device and child checks remain open.
