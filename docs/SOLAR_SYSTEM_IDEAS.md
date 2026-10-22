# Solar System — ideas and roadmap

Skills Mode → Geography · [SolarSystem.jsx](../src/pages/skills/geography/SolarSystem.jsx)
Reviewed against source: **2026-10-22**. All 113 idea IDs are retained.

## Current position

| Phase | Built | Still open |
|---|---|---|
| 0 — Foundations | Module host, quality tiers/readout, bloom test, #82 My view, credited replacement planet textures | Real-phone bloom baseline; unknown-source cube-map sky |
| 1 — First ten seconds | #4 time, #22 age, #23 Bix’s weight, #24 sneeze, #25 Sun safety, #26 bounce, #1 warp arrival, #8 shooting stars, #9 Milky Way, #11 clouds, #12 atmospheres | #5 bloom decision; #27 arrival audio; child playtest |
| 2 — Meet your ship | #34 autopilot, #50 ISS, #35 tour lift-off, #62 size line-up, #47 Pale Blue Dot; steering prototype | Child steering comparison; rumble depends on audio decision |
| 3 — Living Solar System | #48 day/night, #54 Moon phases, #16 tidal-locking core, #55 auroras, #41 comet tails, #57 close-up rings | Optional #16 arrow/label; device checks; original “surprise on every planet” exit is not met |
| 4 — Missions and stars | #73 mission cards; #67 sky constellations | #74 passport, #68 join the dots, #75 Golden Record; lensing spike |
| 5 — Take the controls | Prototype only | #83 free flight after steering choice, then #84 asteroid run |
| 6 — Beyond | Nothing yet | #113 warp, then #90 black hole and #91 nebula |

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
  reaction, then steering B (tap) and A (joystick), about five minutes each.
  Copy the steering Notes summary and record which worked without help.
  Simon’s keyboard trial: 4/5 targets in 34.3 s, four bumps; B not tried.
- **Physical devices:** touch, speech and performance remain unverified for
  recent effects. Browser phone-width checks do not close this.
- **Reported once:** orbit lines switched off and a Sun message appeared without
  a tap; not reproduced. Keep open until evidence identifies a cause.
- **Delivery:** previous notes record a local merge into `dev`; push/deployment
  status is unverified. Publishing still requires an explicit instruction.

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
- Toolbar: modes only, at most five buttons. Planet card: local facts/play.
  My view: preferences and Reset. Secrets need no button. Tweakpane is for adults.
- Existing navbar mute governs new read-aloud/effects; retain tour narration mute.
- Curriculum progress is untouched. Read `curriculum-progress` before persistence.
  #73 explicitly uses **`dl.solarMissions`**, version 1, browser-wide completed
  mission IDs; shared across profiles and retained through sign-out. Storage
  failures leave play available. #74 will build the passport on these stamps.
- Update this roadmap and `PROJECT_KNOWLEDGE.md` with implementation; lint,
  tests, build and UI checks are required. Keep device/playtest gates honest.

## Upcoming sequence and dependencies

1. **#74 passport:** turn visited worlds into a browsable collection; retain
   mission stamps and keep the Skills-only storage contract explicit.
2. **#68 join the dots:** builds on the now-implemented #67 sky constellations;
   #101 comes later.
3. **#75 Golden Record**, then a tablet lensing spike before #90.
4. **#83 → #84:** choose controls from playtests, then free flight and asteroid
   stardust; #87 garage depends on stardust and #85 docking on #50 ISS.
5. **#113 → #90/#91:** warp opens separate Beyond scenes. #108 galaxy map is
   optional later navigation; #109 other systems follows warp.

Other chains: composer → #5/#90/#92/#113; #34 ship → #35–39/#47/#73;
#73 missions → #74/#81/#102; #48 + #65 → #98; #66 → #110.

Phase exits still require child/device checks: first-visit delight (1), confident
steering choice (2), living-world coverage and checked Moon/day-night content (3),
repeatable activities and retained stamps (4), independent travel (5), tablet warp
and unmistakably separate deep space (6). Prioritise visible improvements and
reorder stretch work from playtests; old calendar estimates were speculative.

## Idea catalogue

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
| 13 | **Realistic Saturn rings** | Saturn's rings have real gaps and dusty transparency | — |
| 14 | **Faint rings elsewhere** | Jupiter, Uranus and Neptune show their thin rings when you zoom in | — |
| 15 | **Pluto's heart** | Pluto gets its real heart-shaped plain | — |
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
| 35 | **Lift-off from Earth** | "3, 2, 1, lift off!" with smoke and a rumble, then the ship leaves Earth | ✅ |
| 36 | **Engine flames and boost** | Glowing exhaust that flares when the ship speeds up | ◐ Basic exhaust built; boost pending |
| 37 | **Settle into orbit** | On arrival the ship circles the planet so the child watches it turn below | — |
| 38 | **Camera choices** | Buttons for "behind the ship", "cockpit window" and "watch from outside" | — |
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
| 67 | **Find it in the 3D sky** | Existing charts open real-coordinate star patterns around the Solar System; drag to look around | ✅ |
| 68 | **Join the dots** | Tap the stars in order and the constellation draws itself with glowing lines | — |
| 69 | **Story and fact flip** | Each constellation card flips between its story and a true fact | — |
| 70 | **Stars aren't flat** | Turn Orion sideways and see its stars are at very different distances | — |
| 71 | **The planets' road** | A faint line shows all planets travel along the same path across the sky | — |
| 72 | **Brightest stars** | Labels for Sirius, Vega, Betelgeuse and friends, sized by brightness | — |
| 73 | **Mission cards** | Choose a clue, fly to its world and collect a mission stamp. | ✅ |
| 74 | **Space passport** | Every planet visited stamps a page in a passport | — |
| 75 | **Golden Record** | A hidden Voyager spacecraft plays "Hello from the children of planet Earth" | — |
| 76 | **Arrival question** | One big-button question on arrival ("Is Mars bigger or smaller than Earth?") | — |
| 77 | **Planet sounds** | 🔊 on each card plays NASA's "sounds" (sonifications) of that planet | — |
| 78 | **Design an alien** | Pick a planet and build a creature that could live there (thick fur for Neptune, heat shield for Venus) 🎓 | — |
| 79 | **Movie mode** | Black bars slide in and the camera films a cinematic flyby with music | — |
| 80 | **Light race** | A light pulse leaves the Sun and races outward, ticking off each planet's arrival time 🎓 | — |
| 81 | **Badges with confetti** | Badges for "Visited all moons of Mars" and similar, with confetti | — |
| 82 | **Child control panel** | A drawer with big toggles for orbits, names, speed and the visual extras ⚙️ | ✅ |

### Hard

| # | Idea | Experience | Status |
|---|---|---|---|
| 83 | **Free-flight spaceship** | Steer the ship yourself: on-screen joystick and a big thrust button, or arrow keys and WASD | ◐ Steering prototype only |
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
| 94 | **Space ripples** | Two black holes spin together and the space grid ripples outward | — |
| 95 | **Bix's pretend anomaly** | A shimmering mystery portal hides a bonus surprise | — |
| 113 | **Warp to Beyond** | A big Beyond button: the ship enters a swirling warp tunnel and comes out at a black hole, a nebula or another star system | — |
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
| 106 | **Extract scene modules** ⚙️ | Planets, belt, sky, camera director and UI bridge become separate modules | ◐ Module host built; extraction ongoing |
| 107 | **Quality and performance system** ⚙️ | The page measures its own frame rate and lowers effects to stay smooth | ◐ Two tiers/readout built; adaptive quality pending |
| 108 | **Galaxy map** | Zoom out to the Milky Way's spiral, see where our Sun is, and pick a destination on it | — |
| 109 | **Other star systems** | Visit TRAPPIST-1 (seven Earth-sized planets), Alpha Centauri (three suns), Sirius A and B, Kepler-16 (a planet with two suns) | — |
| 110 | **Time machine** | Scrub through centuries: watch Halley's Comet return in 2061, see planets line up | — |
| 111 | **Visit a planet's surface** | Fly low over Mars's Valles Marineris or Titan's lakes | — |
| 112 | **Move to React Three Fiber** ⚙️ | Rewrite the scene declaratively with R3F and Drei | — |

## Deferred choices and known limits

- Stretch work from phases 1–3 remains in the catalogue: #6–7, #10, #13,
  #31, #33, #36–39, #43, #51–52, #58–59, #63 and #65.
- Later: #99 neighbours, #108 galaxy map, more #109 systems, #100 tonight’s
  sky, #101 custom constellations, #102 stories, #103 builder, #104 gravity,
  #86 landing and #96 countries. Choose order from playtests.
- Phone planet cards can cover the planet; framing above the card needs work.
  The ISS is tappable but not searchable. Steering B turns only through taps
  within the current view. #16’s optional arrow/label is not implemented.
- No voice commands (children’s audio/cloud review needed), VR (age mismatch),
  multiplayer (moderation unavailable) or advertising/brand cameos.

## Recent implementation reference

#73 provides six replayable clues, accepts arrivals through existing search/tap
ship paths, gives gentle success feedback and saves deduplicated stamps. Wrong
worlds remain freely explorable. Missions pause in other modes and have manual
read-aloud. No full passport or automatic destination reveal yet.
Teaching sources: [Mars](https://science.nasa.gov/mars/facts/),
[Saturn](https://science.nasa.gov/saturn/facts/),
[Enceladus](https://science.gsfc.nasa.gov/690/solar-system-tour/Saturn.html).

Phase 3 modules: `earthDayNight.js`, `moonPhase.js` / `MoonPhaseCard`,
`earthAurora.js` / `AuroraCard`, `cometOrbit.js` / `halleyComet.js`, and
`saturnRingDetail.js`. Moon locking lives in `solarSimulation.js`.
All use the existing world clock; ring chunks use 3,200/900 instances,
auroras 679/132 vertices per pole and comet ribbons 32/12 segments for
standard/low quality. Motion freezes where appropriate for reduced motion.
Assets are credited at `/credits`; phase 3 introduced no new downloads.

#67 (2026-10-22): existing five charts now offer **Find in the 3D sky**.
`constellationSky.js` draws catalogue stars and imaginary connecting lines on a
2,700-unit celestial sphere, with focused labels, drag-to-look, recenter and
Previous/Next. Framing reserves room for phone controls; reduced motion snaps
to each pattern. Back to chart/Close restores the original camera and sky.
The sphere shows directions, not stellar distances or a local/date-specific sky;
#70 and #100 remain unbuilt. No new assets, dependencies or stored data.
Teaching: [IAU constellation explanation](https://www.iau.org/IAU/IAU/Astronomy-FAQs/Constellations.aspx?hkey=bb9dc841-0618-41b5-ac70-149741062141).

Verification: lint, full tests and build pass; Chrome checks cover both themes,
phone/landscape framing, touch dragging, recenter, motion preferences and camera
restoration. Physical-device performance and voice checks remain open.
