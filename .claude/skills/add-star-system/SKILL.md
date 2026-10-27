---
name: add-star-system
description: Use when adding another real star system (an exoplanet system NASA has mapped) to the Solar System page in the Learn with Bix app - covers the one definition file, the registry entry, which numbers to take from the NASA Exoplanet Archive, the writing and honesty rules for 6-8 year olds, and what the galaxy map, signposts and trips pick up automatically.
model: sonnet
---

# Adding a Star System

The Solar System page is one shared 3D scene that reads a **system
definition**. Home (`systems/home.js`) and TRAPPIST-1 (`systems/trappist1.js`)
are both definitions. A new system is **one data file plus one registry
entry** — no scene code. If you find yourself editing `SolarSystem.jsx` to add
a system, stop: shared files must never name a system or body
(`systems/sceneGuard.test.js` fails if they do).

All paths below are under `src/pages/skills/geography/`.

## Owner rules

- Real systems in the Milky Way only. Other galaxies are look-don't-land.
- Home is always home: a reload starts there, and Home is one tap away elsewhere.
- Nothing is saved (no storage keys) until the passport exists.
- True science, labelled. A picture nobody has seen up close says so.

## Steps

1. **Check the facts first.** Take values from the NASA Exoplanet Archive
   system overview (`https://exoplanetarchive.ipac.caltech.edu/overview/<host>`),
   one published solution for the whole system (name it in `sources`):
   radius and mass (Earths), orbital period (days), semi-major axis (AU),
   host RA (hours), Dec (degrees) and distance (light-years = parsecs × 3.2616).
   Anything else (temperatures, "water zone") needs its own source. A cheap
   helper (Haiku) can cross-check; drop any claim no source supports.
2. **Write `systems/<id>.js`** exporting one constant. Copy the shape of
   `trappist1.js`; the field list is the comment at the top of
   `systems/validateSystem.js`. Notes:
   - `id` is kebab-case (`kepler-186`); body ids are `<id><letter>` or similar
     and never equal another system's ids.
   - `position: { raHours, decDeg, distanceLy }` drives the map, signposts and
     trip direction. Home sits at distance 0.
   - Planets need `orbit` elements (circular and flat is fine:
     `{ eccentricity: 0, inclination: 0, ascendingNode: 0, perihelionLongitude: 0, meanLongitude }`),
     `look.procedural: { base, accent, kind }` with kind `bare-rock`, `rocky`
     or `icy-maybe` (a small seeded texture: no image files, kind to phones),
     `facts` and `closer` as **lists**, `play: { yearInEarthYears, gravity, hasSurface }`,
     and `massEarth`, `radiusEarth`, `periodDays` so the shared suite can check
     the card numbers. A density stat carries numeric `densityGcm3`.
   - A star with a `card` becomes tappable, tourable and searchable.
   - `scene.honesty` is the "picture to help us imagine" line;
     `scene.camera` frames the overview; `flight.edgeRadius` is just past the
     outermost orbit; `flight.startBodyId` is where Fly the rocket starts.
   - `flight.clues` (12 or more) cover the star and every planet; add
     `{ target: "sign:solar-system", … }` for "find the sign pointing home".
     `flight.badges` reward stars earned. A clue may add `then` (a second,
     nearby find: "Now find its moon…") and `question` { text, options (2–3),
     answer, why } — the answer must be taught by that clue's `fact`.
     Optional `flight.chapters` [{ id, name, icon, promise, clueIds }] must use
     every clue; without them the clues split into "Part 1, Part 2…" of five.
   - `extras: {}` — home-only features (meteor, missions, ISS, comet, belt,
     line-up, warp-in) stay off away from home.
   - `welcome` is read aloud on arrival (the phrase is swapped for
     `spokenName`); `mapCard: { starType, planetCount, fact }` is the map card.
   - `sources: [{ what, url }]` — every number traces to one of these.
3. **Register it** in `systems/registry.js`: a literal light entry (`id, name,
   phrase, spokenName, home: false, place, position, mapCard`) and
   `load: () => import("./<id>.js").then((m) => m.<CONSTANT>)`. The full file
   loads only when the child goes there. The shared suite checks the light
   entry mirrors the definition.
4. **Add a system test** `systems/<id>.test.js` for its own facts (copy
   `trappist1.test.js`: ages on two planets, densities, water-zone clues,
   spoken names without a minus sign, the clue deck).
5. **Run** `node --test src/pages/skills/geography/systems/*.test.js` (use the
   glob: `node --test <dir>` does not work here), then `npm run lint`,
   `npm test`, `npm run build`.

## Writing for 6–8 year olds

- Short sentences; compare with home ("bigger than Earth", "a year lasts 6 Earth days").
- Real units are fine ("density 5.5 g/cm³", "about 41 light-years").
- "Scientists think…" for anything unsettled (tidal locking, air, water).
- Every body has a `spokenName` with no symbols ("TRAPPIST one", "Test B"),
  because speech reads "-1" as "minus one".
- Nothing scary or certain about life.

## What you get for free

- **Galaxy map**: a marker in the neighbourhood at its real position, a card
  with Jump there (`galaxyMapData.js` reads the registry).
- **Signposts**: a sign out past every system's edge pointing to it, and one
  in it pointing back to every other (`systems/signposts.js`).
- **Trips**: flying out past the edge, Jump there and Home all use one trip
  capped at 10 seconds (`systems/tripTimeline.js`); longer distances take a
  little longer.
- **Cards, tour, search, space birthdays, Fly the rocket, Constellations and
  Beyond** all read the definition.

## Open decision

With two systems, flying out in any direction goes to the other one. When a
**third** system arrives, decide what flying out picks: `systemAhead()` in
`systems/systemMath.js` (within 30° of the heading) is ready for "fly towards
the sign", but what happens with no sign ahead is the owner's call. Ask before
building it; free flight's `tripTo` is the one place to change.

## Before you call it done

One batched browser pass (CLAUDE.md "Browser checks"): `node
scripts/checkSolarUi.js --systems` after `npm run build` — every viewport and
both themes in one run. Look at the screenshots: the new system's overview, a
planet card, the map card, a trip there and Home. Add a credits entry
(`src/pages/credits/Credits.jsx`) only if you add a picture file.
