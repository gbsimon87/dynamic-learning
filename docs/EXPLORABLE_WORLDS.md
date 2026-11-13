# Explorable worlds: Solar System and Ocean Explorer

The two 3D Skills Mode worlds, both Three.js (no R3F, no physics engine),
lazy-loaded and ungated. Upcoming work: [SOLAR_SYSTEM_IDEAS.md](SOLAR_SYSTEM_IDEAS.md)
and [PROJECT_IDEAS.md](PROJECT_IDEAS.md). Open device/playtest checks are in
[OPERATIONS.md](OPERATIONS.md).

## Rules for both worlds

- Ages 6–8: forgiving play, 48px targets, read-aloud, both themes on overlays
  (scenes have fixed palettes refreshed on theme change), no child analytics.
  Nothing damages, times or scores the child harshly.
- True science; label compressed scales/time and pretend content ("Sped up",
  "drawn much smaller than real"). Leave out claims that cannot be verified.
  Facts cite NASA/NOAA-grade sources in the data files.
- Reduced motion and the pause control must hold every moving effect still.
  Hidden tabs, zero-size containers and disposal stop the loop. Dispose every
  owned geometry, material, texture, render target and listener.
- No runtime downloads beyond bundled, credited assets (`/credits`). Pixel ratio
  capped at 1.5. Test phone memory before adding large textures.
- The navbar mute governs read-aloud. Curriculum progress is never touched.
- No timers, fuel, damage or penalties; discoveries are session-only. Each
  world's saved state, if any, uses its own storage key. Facts match the
  animal or body shown.

## Shared world kit — `src/components/worlds/`

`discovery.js` (card data shape, `validateDiscovery`), `WorldSections.jsx`
(fold-out sections), `WorldOrbitControl.jsx` (Orbit / Leave orbit),
`orbitPilot.js` (`createOrbitPilot`, `nearestOrbitTarget`, `ORBIT_RATE`) and
`WorldInfoCard.jsx`. A world passes its rules as data: an orbit
`profile(target)` (entry distance, radius, camera rig, optional `level`), an
`isSolid` obstacle filter, the model's `forward` axis and card slots. Extract
the next shared piece (search, settings, tours, trips) when a second world needs
it, moving Solar onto it in the same change. The kit holds no world-specific
checks (`kind === 'moon'`, `name === 'Saturn'`); moving Solar onto a shared
piece must not change what children see.

## Solar System — `src/pages/skills/geography/`

**Scene.** `SolarSystemPage.jsx` mounts `SolarSystem.jsx`, which builds one scene
from a **system definition** (`systems/home.js`, `systems/trappist1.js`, listed in
`systems/registry.js`, checked by `validateSystem.js`) and remounts it when the
child changes system. Home-only extras: meteor, missions, ISS, Halley's Comet,
Earth effects, Moon phases, Pale Blue Dot, size line-up, Sun sneeze. Add a real
star system with the [add-star-system skill](../.claude/skills/add-star-system/SKILL.md).

**New effects are modules** ([solarModules.js](../src/pages/skills/geography/solarModules.js)):
plain objects with `update(dt, frame)`, `resize(size)`, `dispose()`, driven from
`animate()`. A throwing module is disposed and dropped. Use the shared world
clock; low quality tier at width < 720 or coarse pointer; pool particles; hide
effects in incompatible modes. [solarRenderPipeline.js](../src/pages/skills/geography/solarRenderPipeline.js)
renders through bloom only when enabled; bloom stays off for children until a
real-phone baseline (`?debug` vs `?debug&bloom=1`, low-tier p95 within ~2 ms)
supports it.

**Orbits and time.** `planetOrbits.js` supplies J2000 mean elements and a Kepler
solver; `solarSimulation.js` uses the same positions as the drawn paths. Moons
are circular and tidally locked. Distances and time are compressed, and the
starting orientation is not today's sky. `paleBlueDot*.js` `holdsClock()` while
looking back at Earth.

**Flight.** `solarFreeFlight.js` + `flightControls.js` (joystick/keyboard; hold GO
or Space; hold-to-boost/Shift up to 3× cruise). `flightClues.js` holds the clue
deck and `FLIGHT_CHAPTERS`; arrival needs real proximity held 0.45 s, and wrong,
stale or duplicate arrivals never award. Point/Help me steer unlock after 20 s
of powered flying or 10 s after opening the hint. `beltRockField.js` pools belt
rocks that only wobble the ship. `solarPlanetOrbit.js` is the optional orbit ride
(illustrative speed; never satisfies clues). Cameras: behind rocket and cockpit,
toggled with **C**.

**Beyond and other systems.** Beyond warps to separate scenes (Space ripples:
GW150914 merge). Flying past a system's edge warns for 3 s, then a trip of at
most 10 s, labelled sped up, hands over to the next scene (20 s load cap, then
home). Signposts point the real way to other systems. With two systems any
direction leads to the other; choosing by heading (`systemAhead`) is needed
when a third arrives. Galaxy map: Milky Way picture over three levels; real
Milky Way systems only, other galaxies seen from outside. No flying inside
Beyond yet (needs `createSolarFreeFlight` to accept another scene).

**Toolbar.** Tour, Fly the rocket, **More** (`SolarToolbarMenu.jsx`) and, away
from home, Home. Labels from 1280px. Planet cards (`SolarInfoCard`, ≤340×400px)
keep local facts and play; My view holds preferences and Reset. Tweakpane is
for adults only.

**Meteor and reset.** `meteorExperiment.js` borrows Earth, its texture and the
camera and owns one effect group marked `userData.isMeteorEffect` (excluded from
picking and zoom). `resetSolarSystem()` restores all defaults even with no
controller and skips OrbitControls `update()` while an experiment runs. The
quality tier is fixed per mount. Device targets (never measured): median frame
≤ 33 ms, p95 ≤ 50 ms, reset visible within 100 ms. The flight camera choice lives
in React state; Reset restores Behind rocket.

**Storage.** Only `dl.solarMissions` (version 1): browser-wide completed mission
IDs, shared across profiles, kept through sign-out; storage failure leaves play
available. Flight rewards, chapter progress and traced constellations last only
for that visit. Read `curriculum-progress` before adding persistence.

**Checks.** `npm run build && node scripts/checkSolarUi.js [--systems]` — local
Chrome pass at desktop/phone/landscape in both themes (`--systems` adds the
More list, galaxy map, TRAPPIST-1 and trips). `checkSolarBaseline.js
--capture/--compare` takes before/after screenshots for scene refactors.

**Teaching sources** (facts in `flightClues.js`, `namedAsteroids.js`,
`spaceRipplesFacts.js` and cards were checked against these):
[NASA planets](https://science.nasa.gov/solar-system/planets/),
[Jupiter moons](https://science.nasa.gov/jupiter/jupiter-moons/),
[Mars moons](https://science.nasa.gov/mars/moons/),
[Saturn moons](https://science.nasa.gov/saturn/moons/),
[Triton](https://science.nasa.gov/neptune/moons/triton/),
[Charon](https://science.nasa.gov/dwarf-planets/pluto/moons/charon/),
[asteroids](https://science.nasa.gov/solar-system/asteroids/),
[Ceres](https://science.nasa.gov/dwarf-planets/ceres/facts/),
[Vesta](https://science.nasa.gov/solar-system/asteroids/4-vesta/),
[Psyche](https://science.nasa.gov/solar-system/asteroids/16-psyche/),
[Bennu](https://science.nasa.gov/solar-system/asteroids/101955-bennu/),
[ISS](https://www.nasa.gov/international-space-station/),
[Halley](https://science.nasa.gov/solar-system/comets/1p-halley/),
[GW150914 / LIGO](https://www.ligo.caltech.edu/news/ligo20160211),
[IAU constellations](https://www.iau.org/IAU/IAU/Astronomy-FAQs/Constellations.aspx?hkey=bb9dc841-0618-41b5-ac70-149741062141).
They support Skills exploration, not a claim of statutory coverage.

## Ocean Explorer — `src/pages/skills/geography/ocean*`

**Page.** `/skills/ocean-explorer` fills `100dvh` with the navbar and Skills back
bar hidden; overlays carry Back to Skills, title, tour button and a Controls menu
(pause, reset, return to start, help). `OceanExplorer.jsx` owns UI state;
`oceanScene.js` owns renderer, camera, loop and disposal. No preference or
discovery is saved.

**Three.js upgrades:** the `onBeforeCompile` shader patches in
`oceanModelDetail.js`, `oceanEnvironment.js` and `oceanWater.js` were written
against r181 chunks; re-check them and the water reflection target on upgrade.

**Modules.** `oceanWater.js` (Water addon, surface faces down), `oceanEnvironment.js` (terrain, rocks, seagrass, particles,
moving animals; `obstacles`), `oceanLighting.js` (baked reflection environment),
`oceanReef.js` (`REEFS`, nine reefs), `oceanSubmarine.js`, `oceanModelDetail.js`
(procedural bodies, fins, skin), `oceanCreatures.js` / `oceanMoreCreatures.js`
(models, shared `kit`), `oceanAnimalMotion.js` (GPU morph swimming),
`oceanCockpit.js` + `OceanCockpit.jsx` (3D interior built on first use),
`oceanTour.js`, `oceanDiscoveries.js`.

**Steering.** `oceanSteering.js` is pure: eased speed/turn/climb within
`STEERING.areaRadius` (100), seabed clearance, a height limit below the surface,
soft rock bumps. Input reuses `flightControls.js`; touch controls
(`OceanDriveControls.jsx`) show at ≤720px. Keys are read on the focused canvas
only and released on blur/hidden tab. The camera keeps the child's chosen
offset in the craft's yaw frame; **C** toggles the cockpit view.

**Animals.** `oceanAnimals.js` has one entry per animal (12 species, 85
animals): discovery, orbit profile, loop and model. A new animal is data plus a
model; `oceanAnimals.test.js` keeps loops clear of reefs, start, edge and each
other. A discovery has a unique `key` (the object in the water) and an `id` (the
card): the scene offers, orbits and tracks by `key`; callbacks and the page use
`id`. Animals beyond 85 units are hidden and not animated; fine detail hides
beyond 26 units and appendages update at ≤15 Hz beyond 32. Telemetry screens
refresh ≤5 times a second. Water-only frames are capped at 30 fps and the loop
stops when craft and water are still.

**Tour.** `oceanTour.js`: 13 stops (reef, then each species, picking the nearest
individual); trips capped at 9 s and rise over reefs; pause, skip, back/forward,
replay/mute narration; reduced motion arrives directly.
