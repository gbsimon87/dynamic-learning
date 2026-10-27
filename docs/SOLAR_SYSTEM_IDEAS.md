# Solar System — ideas and roadmap

Skills Mode → Geography · [SolarSystem.jsx](../src/pages/skills/geography/SolarSystem.jsx)
Reviewed against source: **2026-10-27**. All 113 idea IDs are retained.

## Current position

| Phase | Built | Still open |
|---|---|---|
| 0 — Foundations | Module host, quality tiers/readout, bloom test, #82 My view, credited replacement planet textures | Real-phone bloom baseline; unknown-source cube-map sky |
| 1 — First ten seconds | #4 time, #22 age, #23 Bix’s weight, #24 sneeze, #25 Sun safety, #26 bounce, #1 warp arrival, #8 shooting stars, #9 Milky Way, #11 clouds, #12 atmospheres | #5 bloom decision; #27 arrival audio; child playtest |
| 2 — Meet your ship | #34 autopilot, #50 ISS, #35 tour lift-off, #62 size line-up, #47 Pale Blue Dot; integrated flight | Integrated-flight child checks; rumble depends on audio decision |
| 3 — Living Solar System | #48 day/night, #54 Moon phases, #16 tidal-locking core, #55 auroras, #41 comet tails, #57 close-up rings | Optional #16 arrow/label; device checks; original “surprise on every planet” exit is not met |
| 4 — Missions and stars | #73 mission cards; #67 sky constellations; #68 join the dots | #74 passport (deferred by owner), #75 Golden Record; lensing spike |
| 5 — Take the controls | #83 free flight in the main Solar System; hold-to-boost turbo with shared light streaks | Child/device steering checks; #84 asteroid run |
| 6 — Beyond | #113 warp, picker and one destination; #94 space ripples; #108 galaxy map; #109 TRAPPIST-1 with trips, signposts and Home | More destinations (#90 black hole, #91 nebula); more #109 systems; flying in Beyond; tablet/device checks |

✅ built · ◐ partial · ⏳ external dependency · — unbuilt. Built means implemented,
not deployed or physically device-tested. Stretch ideas are not phase blockers.

### Decisions and checks still needed

- **Phone baseline / #5:** run `npm run build` then `npx vite preview --host`.
  On a real phone on the same Wi-Fi, capture `?debug` and `?debug&bloom=1`
  after 20 seconds, plus during meteor breakup. Compare low-tier p95: within
  about 2 ms supports bloom; otherwise use sprite glow. If blocked, enable Local
  Network permission for the server’s app in macOS Settings and avoid guest Wi-Fi.
  Bloom currently stays off for children; transparent lines need a separate
  post-output pass if bloom ships. Desktop results are not a phone baseline.
- **#27 audio:** decide whether Skills Mode may have effects; pick whoosh/chime
  by ear in [audition](sounds/mixkit-audition.html). Update the
  [sound policy](sounds/README.md) and processing/cue list before enabling them.
  Lift-off rumble and later music depend on this.
- **Old sky:** establish a source for the six `cubeMap/` images or approve
  replacing them with the credited Milky Way default.
- **Playtests:** 2–3 children with a parent present and agreeing: first-visit
  reaction, then integrated joystick/keyboard flight, clues and hold-to-boost
  turbo. Record which destinations they reach without help. The old A/B
  colour-planet prototype was removed at the owner’s request (2026-10-23).
- **Physical devices:** touch, speech and performance remain unverified for
  recent effects. Browser phone-width checks do not close this.
- **Reported once:** orbit lines switched off and a Sun message appeared without
  a tap; not reproduced. Keep open until evidence identifies a cause.
- **Review findings (2026-10-27):** fixed — no welcome after teardown
  mid-arrival; Back to start and Turn back are disabled during the hand-over
  wait; map focus on a far system keeps the camera distance. A hand-over during
  another load ends when that load settles (the scene always rebuilds, 20 s cap).
- **Delivery:** the galaxy map / TRAPPIST-1 work is committed on
  `feat/galaxy-map-trappist-1`, not merged; earlier work was merged locally into `dev`.
  Push/deployment status is unverified. Publishing needs an explicit instruction.

## Build rules

- Ages 6–8: forgiving play, 48px targets, read-aloud, both themes. The scene is
  always night; overlays use theme tokens. No child analytics.
- True science; label compressed scales/time and pretend content. Deep-space
  objects belong in Beyond. Avoid clues based on changing moon counts.
  [Year 5 Earth and space](curriculum/year-5-science.md) guides teaching, not a
  claim of statutory coverage for younger learners.
- New scene effects use `solarModules.js` (`update`, `resize`, `dispose`). Use
  the shared clock, low tier at width <720 or coarse pointer, and calm reduced
  motion. Dispose owned resources and hide effects in incompatible modes.
- Stay with Three.js/add-ons and primitives; no R3F rewrite or physics engine
  now. Pool particles. Test phone memory before adding large textures.
- Toolbar: modes only; six buttons now (incl. Galaxy map and, away from home, Home), so labels show only from 1440px and a dropdown is the next step as it grows. Planet card: local facts/play.
  My view: preferences and Reset. Secrets need no button. Tweakpane is for adults.
- Existing navbar mute governs new read-aloud/effects; retain tour narration mute.
- Curriculum progress is untouched. Read `curriculum-progress` before persistence.
  #73 explicitly uses **`dl.solarMissions`**, version 1, browser-wide completed
  mission IDs; shared across profiles and retained through sign-out. Storage
  failures leave play available. #74 will build the passport on these stamps.
  Flight rewards last only for that adventure; traced-figure collections last
  only for this page visit. Neither changes curriculum progress or mission stamps.
- Update this roadmap and `PROJECT_KNOWLEDGE.md` with implementation; lint,
  tests, build and UI checks are required. Keep device/playtest gates honest.

## Upcoming sequence and dependencies

1. **#75 Golden Record**, then a tablet lensing spike before #90.
2. **#84 asteroid run:** builds on #83 main-scene free flight; child/device
   steering checks remain open. #87 garage depends on stardust and #85 docking on #50 ISS.
3. **#113 → #90/#91:** warp opens separate Beyond scenes (warp and #94 built
   2026-10-25; flying in Beyond first needs `createSolarFreeFlight` to accept
   another scene and bodies). #108 galaxy map and #109 TRAPPIST-1 are built
   (2026-10-26); further systems follow the `add-star-system` skill, and the
   third system forces the `systemAhead` decision (which way leads where).
4. **#74 passport** is deferred at the owner's request. Retain mission stamps
   and the explicit Skills-only storage contract when it returns.
5. **#101 custom constellations** comes later; #68 join the dots is now built.
6. ✅ **Home onto the shared system scene (#106) — done 2026-10-26.**
   Home and every other star system must run on one scene, with home-only
   features (meteor, missions, ISS, Halley's Comet, Earth effects, Moon
   phases, Pale Blue Dot, line-up, Sun sneeze) as home extras. The
   [galaxy map / TRAPPIST-1 design](superpowers/specs/2026-10-26-galaxy-map-and-trappist-1-design.md)
   did this in its first slice: the scene builds from a system definition and
   is rebuilt when the child changes system. Splitting the scene file into
   smaller modules remains ordinary #106 work.

Other chains: composer → #5/#90/#92/#113; #34 ship → #35–39/#47/#73;
#73 missions → #74/#81/#102; #48 + #65 → #98; #66 → #110.

Phase exits still require child/device checks: first-visit delight (1), confident
steering choice (2), living-world coverage and checked Moon/day-night content (3),
repeatable activities and retained stamps (4), independent travel (5), tablet warp
and unmistakably separate deep space (6). Prioritise visible improvements and
reorder stretch work from playtests; old calendar estimates were speculative.

## Recommended next five (2026-10-27)

1. **#109 Alpha Centauri** — the nearest star system (three suns, 4.2 ly).
   Uses the `add-star-system` skill end to end, proves the system definition is
   reusable, and forces the `systemAhead` rule so heading decides where a trip
   goes. Medium.
2. **#91 Nebula clouds** — a second Beyond destination with no lensing risk;
   reuses the warp, picker and module host. Pairs well with "stars are born
   here" teaching. Medium–Hard.
3. **#84 Asteroid-belt run** — the first real game for #83 free flight;
   builds on bumpers, boost and the existing belt. Gives returning children a
   reason to fly. Hard.
4. **#75 Golden Record** — a hidden Voyager near the Pale Blue Dot route;
   small, delightful, true, and unblocks the "surprise" feel of Phase 4. Easy–Medium
   (sound clip depends on the #27 audio decision; text and read-aloud first).
5. **Toolbar dropdown** (⚙️ under the build rules) — six buttons already
   crowd the toolbar below 1440px; every new mode (Beyond destinations, more
   systems) makes it worse. Do it before adding more modes. Medium.

Gates that still matter more than features: a real-phone baseline (#5),
a child playtest of flight and trips, and physical-device touch checks.

## Idea catalogue

**#37 built (2026-10-25):** Optional **Orbit planet** entry appears after
navigation/tour arrivals and close to planets in manual flight. Leave orbit,
manual steering/thrust, tour navigation and resets release the orbit pilot.
The existing rocket circles a live moving planet; reduced motion holds a steady
orbital angle. This is an illustrative ride, independent of the world clock.

**Moons pass (2026-10-25):** every featured moon's map was rebuilt (textured
fills for unmapped areas, no false-colour tints, real relative brightness);
Phobos, Deimos, Amalthea and Hyperion are lumpy; regular moons orbit in their
planet's equator (Uranus's moons circle vertically) and are tidally locked;
Triton and Phoebe orbit backwards; Jupiter's moons no longer skim its clouds.
**Orbit <moon>** reuses the #37 pilot at moon scale with the moon's own card;
the tour still visits planets only. The My view **Moon names** switch now also
names moons in the overview where badges do not overlap planet names
(previously it only worked while following a planet).

**#38 implemented in part (2026-10-25):** Behind rocket and a detailed Cockpit view
are available during manual flight and autopilot/tours, including planet orbit.
**C** switches cameras; collapsed flight panels keep a camera button visible.
Both ends of the chase camera rig follow ship displacement before easing,
avoiding both the speed-driven gap and backwards view near the flight boundary.
The owner confirmed the camera changes work as expected. “Watch from outside” remains a later part of #38. See the
[camera implementation record](solar-system-camera/IMPLEMENTATION_PLAN.md).

Original IDs remain stable. Difficulty is relative: Easy ≲1 day, Medium 2–5
days, Hard 1–3 weeks, Complex 3+ weeks; these are sizing guides, not schedules.
🎓 teaching link · ⚙️ infrastructure. Details belong in implementation modules.

### Easy

| # | Idea | Experience | Status |
|---|---|---|---|
| 1 | **Warp-in arrival** | Page opens with stars stretching into streaks, then the camera swoops into the Solar System | ✅ |
| 2 | **Little rocket on tap** | Tapping a planet sends a small rocket sprite ahead of the camera to "lead the way" | — |
| 3 | **"Light takes…" badge** | While flying to a planet: "Sunlight takes 8 minutes to reach Earth" 🎓 | — |
| 4 | **Kid-sized time controls** | Big ⏸ / 🐢 / 🐇 buttons for slower, pause and faster | ✅ |
| 5 | **Glowing Sun (bloom)** | The Sun really shines; bright edges glow softly | ⏳ phone baseline |
| 6 | **Lens flare** | Rings of light when the Sun is just off-screen | — |
| 7 | **Twinkling stars** | Background stars gently twinkle | — |
| 8 | **Shooting stars** | Every 20–40 s a streak crosses the sky; tapping one makes a sparkle and "Make a wish!" | ✅ |
| 9 | **Milky Way sky** | A toggle swaps the dots for a real Milky Way band | ✅ |
| 10 | **Sun surface shimmer** | The Sun's surface slowly boils | — |
| 11 | **Earth clouds** | White clouds drift over Earth at their own speed | ✅ |
| 12 | **Atmosphere glow** | A thin blue halo around Earth; yellow haze on Venus; faint pink on Mars | ✅ |
| 13 | **Realistic Saturn rings** | Saturn's rings have real gaps and dusty transparency | ◐ Gapped translucent bands built; finer dusty structure pending |
| 14 | **Faint rings elsewhere** | Jupiter, Uranus and Neptune show their thin rings when you zoom in | — |
| 15 | **Pluto's heart** | Pluto gets its real heart-shaped plain | ✅ New Horizons map (2026-10-25) |
| 16 | **Moon always faces Earth** | Arrow shows the Moon keeps the same face towards us 🎓 | ◐ Core built; optional arrow/label pending |
| 17 | **Backwards and sideways spinners** | Curly arrows show Venus spins backwards and Uranus rolls on its side | — |
| 18 | **Dwarf-planet friends** | Ceres in the asteroid belt, egg-shaped Haumea and Eris beyond Pluto | — |
| 19 | **Polaris marker** | The North Star glows with a small "North" label | — |
| 20 | **Star colours** | Bright stars show their real colours (red Betelgeuse, blue Rigel) | — |
| 21 | **"Stars are suns" moment** | Tapping a background star: "That's a sun, very far away!" | — |
| 22 | **How old would I be?** | Pick your age with big buttons: "On Mars you'd be 3! On Mercury, 29!" 🎓 | ✅ |
| 23 | **How much would I weigh?** | Bix on bathroom scales bounces lighter on the Moon and heavier on Jupiter | ✅ |
| 24 | **Sun sneeze easter egg** | Tap the Sun five times and it "sneezes" a solar flare | ✅ |
| 25 | **Sun safety tip** | First tap on the Sun: "Never look at the real Sun — it can hurt your eyes" | ✅ |
| 26 | **Planet bounce on tap** | The tapped planet does a squishy little bounce | ✅ |
| 27 | **Arrival sounds** | A whoosh while flying and a chime on arrival | ⏳ audio decision |
| 28 | **Space hum** | Optional soft ambient pad | — |
| 29 | **Photo mode** | 📷 hides the UI and saves a picture of the view | — |
| 30 | **Screensaver drift** | Left alone for a minute, the camera drifts slowly round the system | — |
| 31 | **Hidden fact sparkles** | Little glowing stars hidden near planets; tap to hear a fact | — |
| 32 | **Silly faces mode** | A toggle gives every planet a cartoon face that blinks | — |
| 33 | **Car ride to the Sun** | "Driving to the Sun would take about 170 years!" | — |

### Medium

| # | Idea | Experience | Status |
|---|---|---|---|
| 34 | **Autopilot spaceship** | Tap a planet; a real ship flies there on a smooth curve and the camera chases it | ✅ |
| 35 | **Lift-off from Earth** | "3, 2, 1, lift off!" with smoke and a rumble, then the ship leaves Earth | ◐ Countdown/smoke/lift-off built; rumble awaits audio decision |
| 36 | **Engine flames and boost** | Glowing exhaust that flares when the ship speeds up | ◐ Exhaust, turbo and streaks built; manual boost flame flare pending |
| 37 | **Settle into orbit** | Optional orbit ride after tour/navigation arrivals or near a planet in manual flight | ✅ Built; physical-device/comfort checks pending |
| 38 | **Camera choices** | Buttons for "behind the ship", "cockpit window" and "watch from outside" | ◐ Behind rocket + cockpit built; outside view pending |
| 39 | **Gravity slingshot** | Autopilot to Saturn swings past Jupiter and speeds up: "Slingshot!" 🎓 | — |
| 40 | **Real spacecraft cameos** | Voyager 1 and 2, New Horizons, Juno and Parker Solar Probe sit roughly where they are, each with a card | — |
| 41 | **Comets with two tails** | Halley's Comet swoops in close; its tails always point away from the Sun 🎓 | ✅ |
| 42 | **Kuiper belt** | A sparse, icy ring beyond Neptune with Pluto inside it | — |
| 43 | **Solar prominences** | Glowing loops arc off the Sun's edge | — |
| 44 | **Procedural Sun** | A Sun with bubbling granules and darker edges | — |
| 45 | **Solar wind and magnetic shield** | Faint particles stream from the Sun and curve around Earth | — |
| 46 | **Parallax star layers** | When flying, near stars slide past faster than far ones | — |
| 47 | **Pale Blue Dot** | Beyond Neptune the camera turns back; Earth is a single tiny dot, and Bix reads Voyager's story 🎓 | ✅ |
| 48 | **Day, night and city lights** | Earth's night side twinkles with city lights; the line between day and night moves 🎓 | ✅ |
| 49 | **Shiny oceans** | Sunlight glints off the sea but not the land | — |
| 50 | **The ISS** | The space station circles Earth fast; tap it for "astronauts live here!" | ✅ |
| 51 | **Hubble** | The Hubble telescope orbits too, with a card of its famous pictures | — |
| 52 | **Satellite train** | After launch, a line of satellites rises like a string of pearls | — |
| 53 | **Earth's satellites layer** | A toggle shows the busy shell of satellites round Earth | — |
| 54 | **Moon phases window** | A small "view from Earth" window shows the Moon's phase as it orbits 🎓 | ✅ |
| 55 | **Northern lights** | Green and pink curtains ripple over Earth's poles | ✅ |
| 56 | **Swirling Great Red Spot** | Jupiter's bands flow and the Red Spot slowly turns | — |
| 57 | **Saturn's rings up close** | Fly near Saturn and the rings resolve into individual icy chunks | ✅ |
| 58 | **Volcanoes on Io** | Io has erupting plumes | — |
| 59 | **Geysers on Enceladus** | Icy jets spray from Enceladus's south pole | — |
| 60 | **Mars dust storm** | A button whips up a planet-wide orange storm | — |
| 61 | **Rover pins on Mars** | Pins show where Curiosity and Perseverance are; tap for a card | — |
| 62 | **Line-up by size** | All planets line up side by side, with a giant Sun behind 🎓 | ✅ |
| 63 | **Squished vs real distances** | "Real spacing" spreads the planets so far apart they almost vanish | — |
| 64 | **Orbit trails** | Planets leave fading ribbons behind them | — |
| 65 | **Seasons on Earth** | Tilt arrow; the UK side gets more sunlight in summer | — |
| 66 | **Where are the planets today?** | Planets jump to their real positions for today's date | — |
| 67 | **Find it in the 3D sky** | Open real-coordinate star patterns directly around the Solar System; drag to look around | ✅ |
| 68 | **Join the dots** | Tap numbered stars in the existing 3D sky; each completed edge reveals its glowing line | ✅ |
| 69 | **Story and fact flip** | Each constellation card flips between its story and a true fact | — |
| 70 | **Stars aren't flat** | Turn Orion sideways and see its stars are at very different distances | — |
| 71 | **The planets' road** | A faint line shows all planets travel along the same path across the sky | — |
| 72 | **Brightest stars** | Labels for Sirius, Vega, Betelgeuse and friends, sized by brightness | — |
| 73 | **Mission cards** | Choose a clue, fly to its world and collect a mission stamp. | ✅ |
| 74 | **Space passport** | Every planet visited stamps a page in a passport | — Owner deferred |
| 75 | **Golden Record** | A hidden Voyager spacecraft plays "Hello from the children of planet Earth" | — |
| 76 | **Arrival question** | One big-button question on arrival ("Is Mars bigger or smaller than Earth?") | — |
| 77 | **Planet sounds** | 🔊 on each card plays NASA's "sounds" (sonifications) of that planet | — |
| 78 | **Design an alien** | Pick a planet and build a creature that could live there (thick fur for Neptune, heat shield for Venus) 🎓 | — |
| 79 | **Movie mode** | Black bars slide in and the camera films a cinematic flyby with music | — |
| 80 | **Light race** | A light pulse leaves the Sun and races outward, ticking off each planet's arrival time 🎓 | — |
| 81 | **Badges with confetti** | Badges for "Visited all moons of Mars" and similar, with confetti | ◐ Session flight stars/milestone badges built; broader goals/confetti pending |
| 82 | **Child control panel** | A drawer with big toggles for orbits, names, speed and the visual extras ⚙️ | ✅ |

### Hard

| # | Idea | Experience | Status |
|---|---|---|---|
| 83 | **Free-flight spaceship** | Steer through the main Solar System; 25 shuffled clues validate arrivals and earn stars/badges; hold-to-boost turbo and light streaks | ✅ Device/playtest checks pending |
| 84 | **Asteroid-belt run** | Weave through the belt collecting crystals; bumping a rock just wobbles you | — |
| 85 | **Dock with the ISS** | Line up rings and drift in slowly; Bix cheers when it clicks | — |
| 86 | **Land on the Moon** | Switch to a Moon surface, steer the lander down gently, Bix plants a flag | — |
| 87 | **Ship garage** | Spend stardust on paint colours, trail effects and stickers | — |
| 88 | **Solar sail ride** | Unfold a shiny sail and drift outward pushed by sunlight 🎓 | — |
| 89 | **Gamepad support** | Plug in a controller and fly | — |
| 90 | **Black hole with lensing** | Stars bend and smear round a black hole; a glowing disc swirls round it; it's brighter on one side | — |
| 91 | **Nebula clouds** | Fly through glowing pink and blue gas clouds where new stars are born | — |
| 92 | **Supernova** | A giant star swells, flashes, sends out a ring and leaves a new nebula: "You're made of star stuff!" | — |
| 93 | **Pulsar lighthouse** | A tiny spinning star sweeps beams of light like a lighthouse | — |
| 94 | **Space ripples** | Two black holes spin together and the space grid ripples outward | ✅ Device/playtest checks pending |
| 95 | **Bix's pretend anomaly** | A shimmering mystery portal hides a bonus surprise | — |
| 113 | **Warp to Beyond** | A big Beyond button: the ship enters a swirling warp tunnel and comes out at a black hole, a nebula or another star system | ◐ Warp, picker and Space ripples built; more destinations pending |
| 96 | **Tap a country on Earth** | Zoom in, tap the globe, and hear the country's name; link to Flag Finder | — |
| 97 | **Real sky colours** | Earth's edge glows sunset orange where day meets night | — |
| 98 | **A year on Earth** | Watch Earth orbit once; the UK's day length grows and shrinks 🎓 | — |
| 99 | **Our star neighbours** | Zoom out past Pluto to see the ~100 nearest stars in true 3D; tap one to fly there | — |
| 100 | **Tonight's sky from home** | Stand in a UK garden at tonight's date and time and see which constellations are up 🎓 | — |
| 101 | **Make your own constellation** | Join any stars to draw your own constellation, name it, and Bix tells its story | — |
| 102 | **Bix's story missions** | Five chapters: Bix's lost telescope is somewhere in Saturn's rings… | — |
| 103 | **Planet builder** | Choose a planet's size and distance; see if it's too hot, too cold or just right 🎓 | — |
| 104 | **Gravity sandbox** | Flick a moon at a planet and watch it orbit, crash gently or fly away | — |
| 105 | **Music that changes with place** | Warm tones near the Sun, icy chimes near Neptune | — |

### Complex

| # | Idea | Experience | Status |
|---|---|---|---|
| 106 | **Extract scene modules** ⚙️ | Planets, belt, sky, camera director and UI bridge become separate modules; **home moves fully onto the shared system scene** built for TRAPPIST-1 | ◐ Module host built; extraction ongoing. Home runs on the shared system scene (2026-10-26, [galaxy map / TRAPPIST-1 build](superpowers/specs/2026-10-26-galaxy-map-and-trappist-1-design.md)) |
| 107 | **Quality and performance system** ⚙️ | The page measures its own frame rate and lowers effects to stay smooth | ◐ Two tiers/readout built; adaptive quality pending |
| 108 | **Galaxy map** | Zoom out to the Milky Way's spiral, see where our Sun is, and pick a destination on it | ✅ Galaxies → Milky Way → neighbourhood; Jump there / Go home; Space ripples |
| 109 | **Other star systems** | Visit TRAPPIST-1 (seven Earth-sized planets), Alpha Centauri (three suns), Sirius A and B, Kepler-16 (a planet with two suns) | ◐ TRAPPIST-1 built, with trips, signposts and Home; more systems via the `add-star-system` skill |
| 110 | **Time machine** | Scrub through centuries: watch Halley's Comet return in 2061, see planets line up | — |
| 111 | **Visit a planet's surface** | Fly low over Mars's Valles Marineris or Titan's lakes | — |
| 112 | **Move to React Three Fiber** ⚙️ | Rewrite the scene declaratively with R3F and Drei | — |

## Current implementation and limits

### Orbits and shared clock — including the other agent’s changes

`planetOrbits.js` supplies J2000 mean orbital elements, a Kepler solver and
elliptical, inclined paths for the eight planets and Pluto. `solarSimulation.js`
uses the same positions as the visible orbit paths; moons retain circular paths.
Pluto’s inclined ellipse can cross Neptune’s path in projection without their
3D paths meeting. Scene distances and time are compressed. Initial J2000
orientation is **not today’s ephemeris**: #63 real-distance mode and #66 current-date
positions remain unbuilt. Tests cover the solver, perihelion/aphelion, inclination,
Pluto’s projected crossings, orbital direction/speed and shared simulation wiring.

`paleBlueDotView.js` / `paleBlueDot.js` expose `holdsClock()` while turning back
and looking at Earth. `SolarSystem.jsx` holds the shared simulation during those
phases so the magnified look-back stays steady; outbound flight still advances
normally. Phase tests cover this distinction.

### Living-world modules

`earthDayNight.js`, `moonPhase.js` / `MoonPhaseCard`, `earthAurora.js` /
`AuroraCard`, `cometOrbit.js` / `halleyComet.js`, and `saturnRingDetail.js` use
the existing world clock. Moon locking lives in `solarSimulation.js`. Close-up
rings use 3,200/900 instances, auroras 679/132 vertices per pole and comet ribbons
32/12 segments for standard/low quality. Saturn’s distant translucent annuli
retain a deliberate Cassini Division; finer ring detail remains stretch work.
Reduced motion freezes effects where appropriate. Assets are credited at
`/credits`; these effects introduced no new downloads.

### Integrated constellations and Join the Dots — #67 / #68

Five catalogue figures open directly in the **3D Solar System sky**; the duplicate
SVG chart and mode toggle are removed. `constellationSky.js` draws stars and
imaginary connecting lines on a 2,700-unit celestial sphere. Drag, recenter,
Previous/Next and read-aloud remain available. Closing restores the camera/sky.
The sphere shows directions, not stellar distances or a local/date-specific sky;
#70 and #100 remain unbuilt.

`JoinDots` follows catalogue edges in order, explicitly returning to branch
stars rather than inventing lines. Numbered 48px targets, forgiving wrong taps,
progress, restart, read-aloud and a completion checkmark/star support play. A
prominent Next pattern action continues the collection; duplicate completions
do not increase the count. The collection survives figure changes and reopening
on this page, then resets on leaving/reloading.

The tracing panel shares `solar-constellation--sky` styling: compact header,
short instruction, progress, scrollable content and a fixed navigation row.
Both browsing and tracing sit at the **top-left on desktop scene widths ≥600px**,
with a card capped at 340px / 40% of the scene and a reserved star-framing gutter. Portrait phones below 600px keep bottom controls;
phone landscape also uses the left layout. Completion scrolls/focuses the reward.
Tests cover all five tracing loops, wrong taps, collection/reset/navigation/mute
and projected framing, including the shared desktop-left layout.

### Warp to Beyond and Space ripples — #113 / #94

Design: [spec](superpowers/specs/2026-10-25-beyond-warp-and-space-ripples-design.md),
[plan](superpowers/plans/2026-10-25-beyond-warp-and-space-ripples.md).
**Beyond** is a launch button (the flight HUD's old edge offer gave way to
trips between systems in #108/#109). The picker shows only
destinations that exist. The child holds the engine (button, Space or Shift)
through a pretend black-hole doorway, a purple-blue swirl and the shared light
streaks. Letting go drifts slowly and still arrives. The ride home is
automatic and lands at the overview. Space ripples: a glowing grid with two black
holes. **Bring them together** plays a sped-up GW150914 chirp and merge; Replay
and tap-to-ripple follow. The card labels the grid as a picture and the doorway
as pretend, with three read-aloud facts. Nothing is saved; no sound effects.
Reduced motion: a progress bar instead of the swirl, and calmer ripples with no
wobble. Destinations are listed as galaxy → system/event → bodies for #108.
Owner rule: real Milky Way systems only; other galaxies are seen from outside.
Follow-up fixes (2026-10-25): shaders compile while the picker is open and
during the warp, both scenes are freed once home, focus follows the controls,
two-finger touches and fast taps behave, and keys inside the picker no longer
steer the rocket. Search becomes a button where the toolbar is too narrow, so
labels show again from 1100px.
Limits: no flying in Beyond yet (#109 needs the free-flight refactor). The
fly-past-Pluto offer is covered by unit/component tests, not the browser pass.
Physical-device touch, performance and child playtests are open. Lint, build,
full tests and the batched Chrome pass (1280×900, 390×844, 844×390, both themes,
zero errors) passed.

### Galaxy map and TRAPPIST-1 — #108 / #109

Design: [spec](superpowers/specs/2026-10-26-galaxy-map-and-trappist-1-design.md),
[plan](superpowers/plans/2026-10-26-galaxy-map-and-trappist-1.md). One scene
builds from a **system definition** (`systems/home.js`, `systems/trappist1.js`);
`SolarSystemPage.jsx` remounts it when the child changes system, and a
registry lists every system. **TRAPPIST-1**: seven planets with procedural
looks, a tappable star card, its own tour, clues, badges and space birthdays;
the honesty line says nobody has seen them up close. **Trips**: flying out past
the edge warns for 3 seconds ("Turn back" or steering back cancels), then the
rocket dashes to the other system while the child still steers; Turn back
works partway; every trip is at most 10 seconds and labelled "Sped up — even
light takes about 41 years". The leaving scene plays the first half, the
arriving scene the second. **Home** (toolbar and flight HUD) and the map's
**Jump there** fly the same trip by autopilot. **Signposts** past each edge
point the real way to every other system; TRAPPIST-1 shows our Sun as a faint
star. **Galaxy map** (toolbar): NASA/JPL-Caltech/R. Hurt's Milky Way picture
in 3D, pannable, over three levels — galaxies near ours (look, don't land;
Space ripples beyond), the Milky Way with "You are here", and the real
neighbourhood. Nothing is saved; reload starts home; Reset stays in the
current system. Launch meteor and mission stamps are home-only.
Follow-up fixes (2026-10-26/27): the warning no longer flickers at the edge;
page messages sit above the trip fade; the next system starts loading at the
warning, and a load that takes over 20 s lands home with a message that clears
after 8 s; the flight panel can't be closed during the hand-over wait; markers
that overlap are spread apart; the map pulls back on tall screens.
Limits: with two systems any direction past the edge goes to the other one;
choosing by heading (`systemAhead`) is decided when a third system arrives.
Physical-device and child checks are open; the Sun's spot on the picture was
placed by eye. Verified: lint, build, 2,429 unit and 581 component tests; two
batched Chrome passes (both themes, desktop/phone/landscape) with zero errors.
Not browser-checked: the follow-up fixes after the second pass. Run
`npm run build && node scripts/checkSolarUi.js --systems` to check them.

### Optional planet orbit — #37

`solarPlanetOrbit.js` is a shared pilot used by the existing autopilot and manual
flight modules. No new renderer, animation loop or saved data is added. The
**Orbit planet** button appears after planet navigation/tour arrival, or within
`orbitEntryDistance` of a live planet or moon during manual flight (including
Pluto; Sun, satellites, belts and comets do not offer orbit).

The ride circles in a plane through the moving planet's centre, settles to a
safe distance, clears Saturn's outer rings and retains surface/moon camera
bumpers. A lap takes about a minute; the speed is illustrative. Both camera
views and **C** remain available. Planet information compacts during orbit;
**Show planet facts** restores reading while tour navigation stays available.
**Leave orbit** returns to the same scene;
manual steering/thrust/boost also resumes manual control. Tour Next/Previous,
new destinations, Back to Earth, Reset and mode exits stop orbit. Orbiting does
not satisfy flight clues or award stars. Reduced motion tracks the planet from
a fixed orbital angle instead of continuously circling. Child comfort and
physical-device touch/performance checks remain open. Lint, build and all tests
pass. The local Chrome matrix (1280×900, 619×756, 390×844, 844×390; both themes)
checks all three orbit entry contexts, exits, tour Next, manual override, C and
compact facts with zero page/module errors; screenshots were reviewed.

### Spaceship adventure and rewards — #83 / partial #81

`solarFreeFlight.js` reuses the scene, clock and rocket. `flightControls.js`
provides joystick/keyboard input; the redundant standalone colour-planet steering
game and its renderer/scoring tests are removed. Releasing GO brakes; surface
bumpers protect worlds and the camera, and an outer boundary keeps travel local.
Face world follows moving targets while GO is held; manual steering overrides
it. Back to Earth repositions safely. Leaving restores the previous camera.

`flightClues.js` supplies **25 shuffled clues**, avoiding consecutive identical
destinations. They cover the eight planets, Pluto, Sun, Earth’s Moon, moons of
Mars/Jupiter/Saturn/Neptune/Pluto, ISS, asteroid belt and Halley’s Comet. All scene
destinations are selectable; hints and skips are free, and the belt stays visible.

Arrival requires actual proximity to the requested object, held for 0.45 seconds
after travel. Belt detection uses its annular region and height. Success brakes
the ship and shows a checkmark, star, teaching fact, optional narration and Next
clue. Badges at 1/5/10/20/25 stars and a discovery list provide rewards. Wrong,
stale and duplicate arrivals cannot award; an already-near target and Back to
Earth cannot immediately award. Replay starts a fresh adventure. Rewards are
**memory-only for that flight**, independent of the six persisted #73 missions.
Celebrations respect reduced motion; no new effect sounds are enabled.

Turbo is **hold to boost**, with **Shift** as the keyboard equivalent. It can
power the engine alone or with GO, reaching up to three times open-space cruise.
Automatic slowdown near surfaces/destinations and a near-target speed cap protect
arrival detection. Pooled tour light streaks respond to manual boost; reduced
motion suppresses them. Pointer capture loss, blur, page hiding, thrust release,
arrival and exit clear boost. Collision positions are cached once per frame.
Tests cover the full clue deck/rewards/replay, moving destinations, belt region,
wrong/stale/duplicate arrivals, hints/mutes, steering/boost cleanup and camera return.
Child steering/playtest and physical-device checks remain open.

### Compact cards and missions

`SolarSections` provides exclusive collapsible sections. `SolarInfoCard` keeps
the name/introduction visible, opens Discover first, shows two facts before More
facts, and groups extras under Look closer. Play & compare has one activity
chooser: space birthday, Bix on the scales or planet sizes. Moon phases and
auroras embed in their sections. Card limits are 340px wide / 400px high.
The flight HUD is capped at 340px with one open Where to? / Hint / More tool.
Mission selection is a bounded 440px dialog with one clue expanded, stamp progress
and the shared-browser storage explanation. Theme tokens, 48px targets and
scrolling content preserve accessible navigation. Mission matching/storage are
unchanged. Phone planet cards may still cover their planet; camera framing above
the card remains open. ISS is tappable and a flight destination, but absent from
the main planet search. #16’s optional arrow/label is still pending.

### Verification and outstanding checks

Lint, full tests and production build are required for every implementation pass.
The local-only `scripts/checkSolarUi.js` checks both themes at 1280×900, 390×844
and 844×390. `node scripts/checkSolarUi.js --systems` adds the galaxy map, TRAPPIST-1
tour, flying out, Turn back and the trip home. Previous batched checks covered mission selection, compact planet
activities, embedded Moon phases, main-scene flight, Shift turbo, constellation
bounds and desktop-left reading/navigation with no page/module errors.
The latest tracing panel pass completed Ursa Major in all six viewport/theme
combinations: panel bounds, 48px controls, visible navigation and completion/Next
pattern passed, with no page/module errors. Screenshots were reviewed. Lint,
build, 2,238 unit tests and 466 component tests passed (four unit tests skipped).
Automated browser sizes do **not** verify physical touch, device performance,
speech voices or child usability; those gates remain open above.

Stretch work remains in the catalogue; select it from playtests rather than old
calendar estimates. The old A/B steering prototype is retired, not awaiting a
choice. Adaptive quality, finer effects, Beyond scenes and passport remain open
as marked; a built feature is not a claim of deployment.

Teaching references retained from the implemented activities:
[NASA planets](https://science.nasa.gov/solar-system/planets/),
[Jupiter moons](https://science.nasa.gov/jupiter/jupiter-moons/),
[Mars moons](https://science.nasa.gov/mars/moons/),
[Saturn moons](https://science.nasa.gov/saturn/moons/),
[Triton](https://science.nasa.gov/neptune/moons/triton/),
[Charon](https://science.nasa.gov/dwarf-planets/pluto/moons/charon/),
[asteroids](https://science.nasa.gov/solar-system/asteroids/),
[ISS](https://www.nasa.gov/international-space-station/),
[Halley](https://science.nasa.gov/solar-system/comets/1p-halley/),
[GW150914 / LIGO](https://www.ligo.caltech.edu/news/ligo20160211) ([summary](https://en.wikipedia.org/wiki/First_observation_of_gravitational_waves)), and
[IAU constellations](https://www.iau.org/IAU/IAU/Astronomy-FAQs/Constellations.aspx?hkey=bb9dc841-0618-41b5-ac70-149741062141).
These support Skills exploration, not a claim of statutory Year 5 coverage.

Constellation positioning correction (2026-10-23): the left layout now starts
at 600 CSS pixels, including narrow/zoomed desktop windows and landscape
phones. Card width and sky gutter shrink together; portrait phones below
600px retain bottom controls. Regression coverage includes 600px and 619px.

Positioning fix verified: lint, full tests and build passed. The focused Chrome
check passed in both themes at 1280×900, 619×756, 390×844 and 844×390, including
left alignment, expanded reading content and visible navigation. Screenshots
were reviewed; physical-device checks remain open.
