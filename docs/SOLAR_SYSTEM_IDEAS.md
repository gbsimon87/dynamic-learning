# Solar System — enhancement ideas and roadmap

Planning document for [`SolarSystem.jsx`](../src/pages/skills/geography/SolarSystem.jsx)
(Skills Mode → Geography). It lists 113 ideas, sorted by how hard they are to
build, scores how much each will impress a child for the effort, and sets out
a phased roadmap that ends with a flyable ship and warp travel to other star
systems.

Progress is tracked in this document: see [§11 Progress](#progress), and the
✅ / ⏳ marks on each roadmap item. Update both in the same commit as the work.

---

## 1. Where we start from

What the page already does, so ideas build on it rather than repeat it:

| Already built | Where |
|---|---|
| Sun, 8 planets, Pluto, 30 moons, 2k NASA-style textures, cube-map sky | `SolarSystem.jsx` planet data |
| Banded Saturn rings, instanced asteroid belt, sun-glow sprite, random star `Points` | `createSaturnRings`, `createAsteroidBelt`, `makeSunGlowTexture`, `createStars` |
| Click/tap to focus, follow camera with blend, cursor-anchored wheel zoom | `focusEntry`, `onWheel` |
| Narrated guided tour (read-aloud via `speech.js`) | `visitTourPlanet` |
| Search planets and moons | `solarSearch.js` |
| Flat constellation explorer cards (real RA/Dec data) | `ConstellationCard.jsx`, `constellations.js` |
| Meteor-impact experiment with phases, quality tier and reduced-motion path | `meteorExperiment.js` |
| Adult debug controls (orbit speed, lights, belt, glow) | Tweakpane pane |

Constraints that shape every idea below:

- **The audience is 6–8.** Controls must work with one finger and no reading.
  Nothing should be failable in a way that makes a child feel stupid, and
  nothing should be frightening (a supernova is "a star recycling itself",
  not a disaster).
- **Facts must be true.** Anything invented (a hidden Bix sock, a pretend
  anomaly) is plainly labelled as play. Black holes, nebulae and supernovae are
  *not* in our solar system, so they belong in the "journeys beyond" section,
  never placed next to Neptune as if they were. Moon counts change every year
  or two, so check NASA before shipping a number.
- **Phones and tablets matter most.** The meteor run is 8.3 ms a frame on
  desktop and still untested on real devices (backlog #17). Every effect below
  needs a `low` quality path, using the same check the meteor already uses
  (`clientWidth < 720 || pointer: coarse`).
- **`prefers-reduced-motion` is already respected.** Warp streaks, shakes,
  flashes and fast camera moves all need a calm alternative.
- **Both themes, large targets.** Overlays and cards use the `--light-*` /
  `--dark-*` tokens from `App.css`. The 3D scene itself is always night.
- **No curriculum progress is touched.** Skills Mode is ungated. Any stamps,
  badges or cosmetics use their own `localStorage` key, separate from
  curriculum progress. Read the `curriculum-progress` skill before that work
  anyway.
- **Curriculum link.** "Earth and space" is statutory in Year 5 (see
  [`curriculum/year-5-science.md`](curriculum/year-5-science.md)): planets
  orbiting the Sun, the Moon orbiting Earth, day and night. Ideas that teach
  those are tagged 🎓. Our learners are younger, so this is groundwork, not
  coverage.

---

## 2. How to read the lists

**Difficulty tiers** (one developer, already familiar with this file):

| Tier | Rough size | Typical work |
|---|---|---|
| **Easy / quick win** | ≤ 1 day | Uses `three` and `three/examples` only; no new subsystem |
| **Medium** | 2–5 days | A small shader, a new mesh family, a new UI overlay or a scripted camera sequence |
| **Hard** | 1–3 weeks | A new interaction model, custom post-processing, a new scene, or simple physics |
| **Complex / core overhaul** | 3+ weeks | Architecture changes, new data pipelines, multi-scene travel |

**Wow** is 1–5: how likely a 7-year-old is to say "whoa" or call someone over.
🎓 = teaches a curriculum idea. ⚙️ = an enabler with no direct wow, needed by
later ideas.

Themes: 🚀 Vehicles & flight · 🌌 Deep space · 🌍 Earth & planets ·
✨ Stars & constellations · 🎮 Play & delight.

---

## 3. Easy / quick wins (≤ 1 day each)

### 🚀 Vehicles & flight

| # | Idea | What the child sees or does | Build notes | Wow |
|---|---|---|---|---|
| 1 | **Warp-in arrival** | Page opens with stars stretching into streaks, then the camera swoops into the Solar System | Stretch star `Points` along the view axis with a vertex-shader velocity uniform for 1.5 s; once per visit, tap to skip, off on reduced motion | 4 |
| 2 | **Little rocket on tap** | Tapping a planet sends a small rocket sprite ahead of the camera to "lead the way" | Sprite moved along the existing `focusEntry` path; purely decorative | 3 |
| 3 | **"Light takes…" badge** | While flying to a planet: "Sunlight takes 8 minutes to reach Earth" 🎓 | Precomputed light-time per planet in the planet data | 2 |
| 4 | **Kid-sized time controls** | Big ⏸ / 🐢 / 🐇 buttons for slower, pause and faster | Binds to the existing `orbitSpeedMultiplier`; Tweakpane stays for adults | 3 |

### 🌌 Deep space

| # | Idea | What the child sees or does | Build notes | Wow |
|---|---|---|---|---|
| 5 | **Glowing Sun (bloom)** | The Sun really shines; bright edges glow softly | `EffectComposer` + `UnrealBloomPass` + `OutputPass` from `three/examples`; half-resolution bloom on `low` | 5 |
| 6 | **Lens flare** | Rings of light when the Sun is just off-screen | `Lensflare` from `three/examples`, attached to `sunLight`; hidden when the Sun is occluded | 4 |
| 7 | **Twinkling stars** | Background stars gently twinkle | Per-star random phase attribute; `onBeforeCompile` on the existing `PointsMaterial` | 3 |
| 8 | **Shooting stars** | Every 20–40 s a streak crosses the sky; tapping one makes a sparkle and "Make a wish!" | One pooled `Line` with a fading gradient, random great-circle arc | 4 |
| 9 | **Milky Way sky** | A toggle swaps the dots for a real Milky Way band | `public/static/8k_stars_milky_way.jpg` already ships; use it as an equirectangular `scene.background`. Phones need a 4k copy: the 8k image decodes to ~128 MB of GPU memory | 4 |
| 10 | **Sun surface shimmer** | The Sun's surface slowly boils | Scroll two offset UVs of the existing sun texture in the emissive map, blended | 3 |

### 🌍 Earth & planets

| # | Idea | What the child sees or does | Build notes | Wow |
|---|---|---|---|---|
| 11 | **Earth clouds** | White clouds drift over Earth at their own speed | Second sphere at 1.01× with a cloud alpha texture, rotating faster than Earth | 4 |
| 12 | **Atmosphere glow** | A thin blue halo around Earth; yellow haze on Venus; faint pink on Mars | Fresnel rim shader on a `BackSide` sphere, colour per planet | 4 |
| 13 | **Realistic Saturn rings** | Saturn's rings have real gaps and dusty transparency | Replace banded `RingGeometry` with a ring alpha texture, remapping UVs radially | 3 |
| 14 | **Faint rings elsewhere** | Jupiter, Uranus and Neptune show their thin rings when you zoom in | Reuse the ring builder with very low opacity; fade in by camera distance | 2 |
| 15 | **Pluto's heart** | Pluto gets its real heart-shaped plain | Swap the grey material for a New Horizons texture map | 3 |
| 16 | **Moon always faces Earth** | Arrow shows the Moon keeps the same face towards us 🎓 | Lock the Moon's rotation to its orbit angle; toggleable label | 2 |
| 17 | **Backwards and sideways spinners** | Curly arrows show Venus spins backwards and Uranus rolls on its side | Arrow sprites parented to the axial group; shown on focus | 2 |
| 18 | **Dwarf-planet friends** | Ceres in the asteroid belt, egg-shaped Haumea and Eris beyond Pluto | Add to planet data; Haumea is a scaled ellipsoid | 3 |

### ✨ Stars & constellations

| # | Idea | What the child sees or does | Build notes | Wow |
|---|---|---|---|---|
| 19 | **Polaris marker** | The North Star glows with a small "North" label | One sprite at Polaris's RA/Dec from `constellations.js` | 2 |
| 20 | **Star colours** | Bright stars show their real colours (red Betelgeuse, blue Rigel) | Colour attribute from B–V index for the named stars already in `constellations.js` | 3 |
| 21 | **"Stars are suns" moment** | Tapping a background star: "That's a sun, very far away!" | Raycast against `Points` with a threshold; speak a short line | 3 |

### 🎮 Play & delight

| # | Idea | What the child sees or does | Build notes | Wow |
|---|---|---|---|---|
| 22 | **How old would I be?** | Pick your age with big buttons: "On Mars you'd be 3! On Mercury, 29!" 🎓 | Pure maths from orbital periods; read aloud; no data stored | 5 |
| 23 | **How much would I weigh?** | Bix on bathroom scales bounces lighter on the Moon and heavier on Jupiter | Surface-gravity ratios; CSS spring animation on a DOM card. Always Bix's weight, never the child's: weight is sensitive at this age | 4 |
| 24 | **Sun sneeze easter egg** | Tap the Sun five times and it "sneezes" a solar flare | Short particle burst plus a camera nudge (off on reduced motion) | 4 |
| 25 | **Sun safety tip** | First tap on the Sun: "Never look at the real Sun — it can hurt your eyes" | One-off narration line; a safeguarding win, not a wow | 1 |
| 26 | **Planet bounce on tap** | The tapped planet does a squishy little bounce | Scale tween on `body`; very cheap feedback for small fingers | 2 |
| 27 | **Arrival sounds** | A whoosh while flying and a chime on arrival | Reuse the `public/sounds` pipeline (`docs/sounds/`); obey the tour mute | 3 |
| 28 | **Space hum** | Optional soft ambient pad | One looping file, off by default, shares the mute toggle | 3 |
| 29 | **Photo mode** | 📷 hides the UI and saves a picture of the view | Render once, then `canvas.toBlob`; download link; no upload anywhere | 3 |
| 30 | **Screensaver drift** | Left alone for a minute, the camera drifts slowly round the system | Idle timer drives `controls` auto-rotate; any touch cancels | 3 |
| 31 | **Hidden fact sparkles** | Little glowing stars hidden near planets; tap to hear a fact | 10 sprites at fixed spots; facts from the planet data | 3 |
| 32 | **Silly faces mode** | A toggle gives every planet a cartoon face that blinks | Face decal sprite per planet; clearly a "play" toggle | 4 |
| 33 | **Car ride to the Sun** | "Driving to the Sun would take about 170 years!" | Static comparisons per planet, read aloud | 3 |

---

## 4. Medium (2–5 days each)

### 🚀 Vehicles & flight

| # | Idea | What the child sees or does | Build notes | Wow |
|---|---|---|---|---|
| 34 | **Autopilot spaceship** | Tap a planet; a real ship flies there on a smooth curve and the camera chases it | Low-poly ship from primitives (no asset licence); `CatmullRomCurve3` path that bends around the Sun. Replaces the camera-only move in `focusEntry`, so search, tap and the tour all change; the base for every flight idea | 5 |
| 35 | **Lift-off from Earth** | "3, 2, 1, lift off!" with smoke and a rumble, then the ship leaves Earth | Scripted sequence in the meteor module's phase style; smoke as pooled sprites | 5 |
| 36 | **Engine flames and boost** | Glowing exhaust that flares when the ship speeds up | Additive particle cone; intensity tied to path speed | 4 |
| 37 | **Settle into orbit** | On arrival the ship circles the planet so the child watches it turn below | Blend from path to a circular orbit around the target `root` | 4 |
| 38 | **Camera choices** | Buttons for "behind the ship", "cockpit window" and "watch from outside" | Three camera rigs; reuse the existing follow blend | 3 |
| 39 | **Gravity slingshot** | Autopilot to Saturn swings past Jupiter and speeds up: "Slingshot!" 🎓 | Route through a Jupiter waypoint with a speed curve; tells the Voyager story | 4 |
| 40 | **Real spacecraft cameos** | Voyager 1 and 2, New Horizons, Juno and Parker Solar Probe sit roughly where they are, each with a card | Simple models (primitives or NASA 3D resources, check terms); approximate positions | 4 |

### 🌌 Deep space

| # | Idea | What the child sees or does | Build notes | Wow |
|---|---|---|---|---|
| 41 | **Comets with two tails** | Halley's Comet swoops in close; its tails always point away from the Sun 🎓 | Elliptical orbit; tail is two additive sprite ribbons aligned to the Sun vector | 4 |
| 42 | **Kuiper belt** | A sparse, icy ring beyond Neptune with Pluto inside it | Second `InstancedMesh` reusing `createAsteroidBelt` settings | 3 |
| 43 | **Solar prominences** | Glowing loops arc off the Sun's edge | `TubeGeometry` arcs with an animated additive shader | 4 |
| 44 | **Procedural Sun** | A Sun with bubbling granules and darker edges | fbm-noise fragment shader with limb darkening, replacing the texture on `standard` | 4 |
| 45 | **Solar wind and magnetic shield** | Faint particles stream from the Sun and curve around Earth | Particle stream with a hand-tuned deflection field near Earth | 3 |
| 46 | **Parallax star layers** | When flying, near stars slide past faster than far ones | Two or three star shells at different radii; only matters once flight exists | 3 |
| 47 | **Pale Blue Dot** | From Neptune the camera turns back; Earth is a single tiny dot, and Bix reads Voyager's story 🎓 | Scripted camera plus narration; quietly one of the most moving moments possible | 5 |

### 🌍 Earth & planets

| # | Idea | What the child sees or does | Build notes | Wow |
|---|---|---|---|---|
| 48 | **Day, night and city lights** | Earth's night side twinkles with city lights; the line between day and night moves 🎓 | Shader mixing day and night textures by `dot(normal, sunDir)`; covers the statutory "day and night" | 5 |
| 49 | **Shiny oceans** | Sunlight glints off the sea but not the land | Specular map on Earth's material | 3 |
| 50 | **The ISS** | The space station circles Earth fast; tap it for "astronauts live here!" | Built from boxes and solar-panel planes; orbit period scaled; card plus narration | 5 |
| 51 | **Hubble** | The Hubble telescope orbits too, with a card of its famous pictures | Small model; card images from NASA (public domain, credit them) | 3 |
| 52 | **Satellite train** | After launch, a line of satellites rises like a string of pearls | Instanced dots spreading along an orbit over time | 4 |
| 53 | **Earth's satellites layer** | A toggle shows the busy shell of satellites round Earth | Instanced points in low, medium and geostationary shells; labelled as illustrative | 3 |
| 54 | **Moon phases window** | A small "view from Earth" window shows the Moon's phase as it orbits 🎓 | Second small render or a 2D canvas computed from the Sun–Earth–Moon angle | 4 |
| 55 | **Northern lights** | Green and pink curtains ripple over Earth's poles | Ribbon meshes with scrolling noise in an additive shader | 5 |
| 56 | **Swirling Great Red Spot** | Jupiter's bands flow and the Red Spot slowly turns | UV-swirl shader centred on the spot; bands scroll at different speeds | 3 |
| 57 | **Saturn's rings up close** | Fly near Saturn and the rings break into thousands of icy chunks | Swap the ring texture for an `InstancedMesh` of rocks within a distance threshold | 5 |
| 58 | **Volcanoes on Io** | Io has erupting plumes | Small particle fountains at fixed surface points | 4 |
| 59 | **Geysers on Enceladus** | Icy jets spray from Enceladus's south pole | As #58 with icy colours | 3 |
| 60 | **Mars dust storm** | A button whips up a planet-wide orange storm | Animated haze sphere and a texture tint | 3 |
| 61 | **Rover pins on Mars** | Pins show where Curiosity and Perseverance are; tap for a card | Lat/long to sphere position; card with real photos | 3 |
| 62 | **Line-up by size** | All planets line up side by side, with a giant Sun behind 🎓 | Tween every body to a row at true relative sizes; tap again to return | 5 |
| 63 | **Squished vs real distances** | "Real spacing" spreads the planets so far apart they almost vanish | Animate `distance` values; explain why the model is squished | 4 |
| 64 | **Orbit trails** | Planets leave fading ribbons behind them | Ring buffer of recent positions per planet in a `Line` | 3 |
| 65 | **Seasons on Earth** | Tilt arrow; the UK side gets more sunlight in summer | Highlight hemisphere lighting at four orbit points | 3 |
| 66 | **Where are the planets today?** | Planets jump to their real positions for today's date | Approximate Keplerian elements (JPL table) in a pure, tested module like `solarSimulation.js` | 4 |

### ✨ Stars & constellations

| # | Idea | What the child sees or does | Build notes | Wow |
|---|---|---|---|---|
| 67 | **Find it in the real sky** | "Find it in the sky →" flies the 3D view to the constellation among the stars | Backlog #19: a `constellationSky.js` module like `meteorExperiment.js`, celestial sphere at radius ≈2700 | 5 |
| 68 | **Join the dots** | Tap the stars in order and the constellation draws itself with glowing lines | Builds on #67; `Line2` from `three/examples` for lines thicker than 1 px | 5 |
| 69 | **Story and fact flip** | Each constellation card flips between its story and a true fact | Extend `ConstellationCard.jsx`; read both sides aloud | 3 |
| 70 | **Stars aren't flat** | Turn Orion sideways and see its stars are at very different distances | Real distances for the named stars; rotate the figure in 3D | 5 |
| 71 | **The planets' road** | A faint line shows all planets travel along the same path across the sky | Ecliptic circle on the celestial sphere | 2 |
| 72 | **Brightest stars** | Labels for Sirius, Vega, Betelgeuse and friends, sized by brightness | Small curated list with magnitude-scaled sprites | 3 |

### 🎮 Play & delight

| # | Idea | What the child sees or does | Build notes | Wow |
|---|---|---|---|---|
| 73 | **Mission cards** | "Visit the planet with the most moons", "Find a moon with geysers" | Mission list plus checks on focus events; stamps saved under a Skills-only key | 4 |
| 74 | **Space passport** | Every planet visited stamps a page in a passport | Shares the collection screen with backlog #31 | 4 |
| 75 | **Golden Record** | A hidden Voyager spacecraft plays "Hello from the children of planet Earth" | NASA public-domain audio clip; a gentle find | 5 |
| 76 | **Arrival question** | One big-button question on arrival ("Is Mars bigger or smaller than Earth?") | Never gates anything; correct answers get the existing chime and confetti | 3 |
| 77 | **Planet sounds** | 🔊 on each card plays NASA's "sounds" (sonifications) of that planet | Public NASA sonifications, credited; explain they are data turned into sound | 4 |
| 78 | **Design an alien** | Pick a planet and build a creature that could live there (thick fur for Neptune, heat shield for Venus) 🎓 | DOM builder with layered SVG parts; teaches conditions, not real aliens | 4 |
| 79 | **Movie mode** | Black bars slide in and the camera films a cinematic flyby with music | Keyframed camera paths; one music bed; skip on reduced motion | 4 |
| 80 | **Light race** | A light pulse leaves the Sun and races outward, ticking off each planet's arrival time 🎓 | Sphere shell growing at a scaled light speed; timer overlay | 4 |
| 81 | **Badges with confetti** | Badges for "Visited all moons of Mars" and similar, with confetti | `canvas-confetti` is already a dependency | 3 |
| 82 | **Child control panel** | A drawer with big toggles for orbits, names, speed and the visual extras ⚙️ | Sits beside Tweakpane, which stays for grown-ups because it also tunes lighting, stars, glow and the belt; sound is the navbar's site-wide switch; see §8 | 2 |

---

## 5. Hard (1–3 weeks each)

### 🚀 Vehicles & flight

| # | Idea | What the child sees or does | Build notes | Wow |
|---|---|---|---|---|
| 83 | **Free-flight spaceship** | Steer the ship yourself: on-screen joystick and a big thrust button, or arrow keys and WASD | Arcade physics (velocity plus damping, auto-level, soft speed cap); invisible bumpers so you bounce gently off the Sun and planets; no physics engine needed | 5 |
| 84 | **Asteroid-belt run** | Weave through the belt collecting crystals; bumping a rock just wobbles you | Spatial hash over the existing `InstancedMesh` matrices; sphere checks only; no fail state | 5 |
| 85 | **Dock with the ISS** | Line up rings and drift in slowly; Bix cheers when it clicks | Alignment and approach-speed tolerance mini-game; builds on #50 and #83 | 5 |
| 86 | **Land on the Moon** | Switch to a Moon surface, steer the lander down gently, Bix plants a flag | Separate small scene (heightmap from a public lunar DEM); one thrust button; a soft "bounce and try again" instead of crashing | 5 |
| 87 | **Ship garage** | Spend stardust on paint colours, trail effects and stickers | Cosmetic only; saved under a Skills-only key; no real money ever | 4 |
| 88 | **Solar sail ride** | Unfold a shiny sail and drift outward pushed by sunlight 🎓 | Variant of #83 where thrust comes from the Sun direction | 3 |
| 89 | **Gamepad support** | Plug in a controller and fly | Gamepad API polled in the flight update | 3 |

### 🌌 Deep space (journeys beyond our Solar System)

| # | Idea | What the child sees or does | Build notes | Wow |
|---|---|---|---|---|
| 90 | **Black hole with lensing** | Stars bend and smear round a black hole; a glowing disc swirls round it; it's brighter on one side | Screen-space lensing pass (deflection by distance from the projected centre) plus an accretion-disc shader with Doppler brightening; only in the journeys-beyond view | 5 |
| 91 | **Nebula clouds** | Fly through glowing pink and blue gas clouds where new stars are born | Layered soft billboards on `low`; raymarched 3D noise volume on `standard` | 5 |
| 92 | **Supernova** | A giant star swells, flashes, sends out a ring and leaves a new nebula: "You're made of star stuff!" | Scripted phases like the meteor; bloom spike, shockwave ring, then #91; gentle framing, no peril | 5 |
| 93 | **Pulsar lighthouse** | A tiny spinning star sweeps beams of light like a lighthouse | Two cone meshes with additive falloff, rotating fast | 4 |
| 94 | **Space ripples** | Two black holes spin together and the space grid ripples outward | Displaced grid plane with a travelling sine; tells the gravitational-waves story | 4 |
| 95 | **Bix's pretend anomaly** | A shimmering mystery portal hides a bonus surprise | Clearly labelled "Bix made this up!"; the place for fiction, kept apart from facts | 3 |
| 113 | **Warp to Beyond** | A big Beyond button: the ship enters a swirling warp tunnel and comes out at a black hole, a nebula or another star system | Warp-tunnel shader as a scene transition; each destination is its own scene module and data file, in the same shape as `planetData`; the quickest route to deep-space content, with no galaxy map needed | 5 |

### 🌍 Earth & planets

| # | Idea | What the child sees or does | Build notes | Wow |
|---|---|---|---|---|
| 96 | **Tap a country on Earth** | Zoom in, tap the globe, and hear the country's name; link to Flag Finder | Raycast UV to lat/long, then point-in-polygon with `@turf/turf` (already a dependency) over the GeoJSON the World Map uses | 4 |
| 97 | **Real sky colours** | Earth's edge glows sunset orange where day meets night | Rayleigh/Mie scattering shader on the atmosphere shell (#12 upgrade) | 4 |
| 98 | **A year on Earth** | Watch Earth orbit once; the UK's day length grows and shrinks 🎓 | Scripted orbit with a day-length graph overlay; uses #48 and #65 | 3 |

### ✨ Stars & constellations

| # | Idea | What the child sees or does | Build notes | Wow |
|---|---|---|---|---|
| 99 | **Our star neighbours** | Zoom out past Pluto to see the ~100 nearest stars in true 3D; tap one to fly there | Curated subset of the HYG catalogue (CC BY-SA, credit it); log-scaled distances | 5 |
| 100 | **Tonight's sky from home** | Stand in a UK garden at tonight's date and time and see which constellations are up 🎓 | Horizon view at a fixed UK latitude (no geolocation, for privacy); sidereal-time maths in a pure tested module | 5 |
| 101 | **Make your own constellation** | Join any stars to draw your own constellation, name it, and Bix tells its story | Builds on #68; saved locally; name chosen from word tiles, not free text, to keep it safe | 5 |

### 🎮 Play & delight

| # | Idea | What the child sees or does | Build notes | Wow |
|---|---|---|---|---|
| 102 | **Bix's story missions** | Five chapters: Bix's lost telescope is somewhere in Saturn's rings… | Mission engine from #73 plus narration and simple cut-scenes | 5 |
| 103 | **Planet builder** | Choose a planet's size and distance; see if it's too hot, too cold or just right 🎓 | Habitable-zone rule by distance; animated frost or heat haze | 5 |
| 104 | **Gravity sandbox** | Flick a moon at a planet and watch it orbit, crash gently or fly away | Small N-body integrator (velocity Verlet) on a handful of bodies | 5 |
| 105 | **Music that changes with place** | Warm tones near the Sun, icy chimes near Neptune | Web Audio crossfading layered stems by camera distance | 4 |

---

## 6. Complex / core overhaul (3+ weeks)

| # | Idea | What it means | Build notes | Wow |
|---|---|---|---|---|
| 106 | **Split the 1,886-line component** ⚙️ | Planets, belt, sky, camera director and UI bridge become separate modules | Copy the `meteorExperiment.js` contract (`enter / update / resize / exit / dispose / isActive`); pure maths stays in tested `.js` files. Done step by step: a small module host first (Phase 0), then existing code moves out only when a feature needs to change it | — |
| 107 | **Quality and performance system** ⚙️ | The page measures its own frame rate and lowers effects to stay smooth | Rolling frame-time monitor; `low`, `standard` and `high` tiers; KTX2 textures; lazy-load heavy modules with dynamic `import()` | — |
| 108 | **Galaxy map** | Zoom out to the Milky Way's spiral, see where our Sun is, and pick a destination on it | Galaxy as a few hundred thousand `Points`; reuses the #113 warp and destination files. Not needed to reach Beyond destinations | 4 |
| 109 | **Other star systems** | Visit TRAPPIST-1 (seven Earth-sized planets), Alpha Centauri (three suns), Sirius A and B, Kepler-16 (a planet with two suns) | Data-driven systems reached through #113; planets with uncertain looks are labelled "artist's idea" | 5 |
| 110 | **Time machine** | Scrub through centuries: watch Halley's Comet return in 2061, see planets line up | Builds on #66 with a long time scale and event markers | 4 |
| 111 | **Visit a planet's surface** | Fly low over Mars's Valles Marineris or Titan's lakes | Procedural or DEM terrain scenes per body, with a shared lander/ship controller | 5 |
| 112 | **Move to React Three Fiber** ⚙️ | Rewrite the scene declaratively with R3F and Drei | **Not recommended now**; see §7. Reconsider only if #106 still leaves the code hard to change | — |

### Considered and not recommended

| Idea | Why not |
|---|---|
| Voice commands ("fly to Mars") | Browser speech recognition can send children's audio to a cloud service. Needs a safeguarding review (see `docs/safeguarding/`) first. |
| VR / WebXR mode | Headset makers set 10+ or 13+ age guidance; our audience is 6–8. |
| Shared or multiplayer space | Contact between children needs moderation we don't have. |
| Real brand cameos (named cars, company rockets) | Advertising to children; the real NASA/ESA missions above tell the same story. |

---

## 7. Technology and dependencies

**Recommendation: stay on plain Three.js and add almost nothing.** Most of
this list needs only `three` (already `^0.181.0`) and its `three/examples`
add-ons.

| Need | Use | New dependency? | Notes |
|---|---|---|---|
| Bloom, flares, colour grading | `EffectComposer`, `UnrealBloomPass`, `OutputPass`, `ShaderPass`, `Lensflare` (`three/examples/jsm`) | No | Composer is a prerequisite for #5, #90, #92, #113 |
| Thicker glowing lines | `Line2` / `LineMaterial` (`three/examples/jsm/lines`) | No | WebGL ignores `linewidth` on `LineBasicMaterial` |
| Accessible labels and cards over 3D | `CSS2DRenderer` or React overlays (today's pattern) | No | DOM labels can be read by screen readers; sprite labels can't |
| Ship, ISS and Hubble models | Primitives first; `GLTFLoader` + `DRACOLoader` if real models are used | No | Check NASA 3D Resources terms for each model |
| Smaller textures | `KTX2Loader` + Basis | No (loader), build step yes | Cuts GPU memory on phones; matters for #107 |
| Smoother camera moves | Hand-rolled tweens (today) or `camera-controls` | Optional | Only if the follow and blend code keeps growing |
| Many particles | `InstancedMesh`, `Points`; `GPUComputationRenderer` for #104 at scale | No | Pool and reuse; never allocate per frame |
| Collisions in flight | Sphere checks and a spatial hash | No | **Rapier / cannon-es are not needed.** Arcade flight is kinematic; a physics engine adds ~0.5–2 MB (Rapier is WASM) for no visible gain |
| Joystick on touch | Hand-rolled pointer events | No | ~100 lines; libraries like `nipplejs` aren't worth the weight |
| Sound | Web Audio API plus the existing `public/sounds` pipeline | No | Unlock audio on first tap (iOS) |
| Post-processing at scale | `postprocessing` (pmndrs) | Optional | Merges effects into fewer passes; consider only if `three/examples` passes cost too much on phones |
| Future renderer | `WebGPURenderer` + TSL (in `three` r181) | No | Not yet; WebGL coverage on school tablets is the safer bet |

**Why not React Three Fiber (R3F) now.** R3F plus Drei would give `<Stars>`,
`<Trail>`, `<Sparkles>`, `<Html>`, `<CameraControls>` and
`<PerformanceMonitor>` for free, and the code would read more like the rest of
the app. But the page is 1,886 working lines of imperative Three.js, the meteor
experiment is tested against that structure, and a rewrite would bring no
visible change. Splitting the file into modules (#106) gets most of the
maintainability benefit at a fraction of the risk. If a later rewrite happens,
do it on a fresh route, with the old page kept until the new one matches it.

---

## 8. Where each feature lives on screen

The toolbar already holds search, an overview button and four large buttons
(Tour, Constellations, Launch meteor, Reset). Most of the ideas above add a
button somewhere, so without a rule the screen fills up by Phase 2. Every new
feature goes in exactly one of these places:

| Place | What goes there | Examples |
|---|---|---|
| **Toolbar** — at most five big buttons | *Modes* only: things that change what the whole screen does | Tour, Fly (#34), Sky (#67), Meteor, later Beyond (#113) |
| **Planet card** | Facts and games about the planet you're looking at | How old (#22), How heavy (#23), Planet sounds (#77), Arrival question (#76), Line-up (#62) |
| **Settings drawer** (#82) | Toggles and preferences | Orbits, names, Milky Way (#9), Silly faces (#32), speed (#4), Reset |
| **Nowhere** | Secrets, found by looking and tapping | Sun sneeze (#24), fact sparkles (#31), Golden Record (#75), shooting-star wishes (#8) |

Reset moves into the drawer once Fly takes its place on the toolbar. Sound
needs no new switch: the navbar's site-wide sound switch already exists, and
effects (#27) and music (#28, #105) follow it. The tour's own narration mute
stays as it is. Tweakpane stays visible for grown-ups, because it covers tuning
the drawer doesn't (lighting, stars, sun glow, asteroid belt).

---

## 9. What depends on what

Build order has to follow these chains. The roadmap below already does.

| Build first | Before |
|---|---|
| Module host ⚙️ (Phase 0) | Everything new: each feature is its own module from the start |
| `EffectComposer` ⚙️ | #5 bloom → #92 supernova, #113 warp tunnel, #90 black-hole lensing |
| #82 settings drawer | #4, #9, #28, #32 and any other toggle |
| #34 autopilot ship | #35 lift-off, #36 flames, #37 orbit settle, #38 cameras, #39 slingshot, #47 Pale Blue Dot (as a flight), #73 missions ("fly to…") |
| Free-flight spike (Phase 2) | The control scheme chosen for #83 |
| #83 free flight | #84 asteroid run, #85 docking, #88 solar sail, #89 gamepad, #46 parallax stars |
| #84 asteroid run (stardust) | #87 ship garage (stardust is what you spend there) |
| #50 ISS | #85 docking |
| #73 mission engine | #74 passport, #81 badges, #102 story missions |
| #67 constellations in the sky | #68 join the dots → #101 make your own |
| #48 day/night and #65 seasons | #98 a year on Earth |
| #66 planets today | #110 time machine |
| #113 warp to Beyond | #90, #91, #92, #109; #108 galaxy map comes last as a nicer way to choose a destination |

---

## 10. Wow per effort — the best value

Score = wow ÷ effort (Easy 1, Medium 2.5, Hard 6, Complex 15). The "Needs"
column is effort the score leaves out: something that has to exist first.

| Rank | # | Idea | Tier | Wow | Needs | Phase |
|---|---|---|---|---|---|---|
| 1 | 22 | How old would I be? | Easy | 5 | Nothing | 1a |
| 2 | 5 | Glowing Sun (bloom) | Easy | 5 | `EffectComposer` and a phone cost check | 1b |
| 3 | 24 | Sun sneeze easter egg | Easy | 4 | Nothing | 1a |
| 4 | 23 | How heavy would Bix be? | Easy | 4 | Nothing | 1a |
| 5 | 8 | Shooting stars | Easy | 4 | Nothing | 1b |
| 6 | 1 | Warp-in arrival | Easy | 4 | Nothing | 1b |
| 7 | 11, 12 | Earth clouds and atmosphere glow | Easy | 4 | A cloud texture (credit it) | 1b |
| 8 | 9 | Milky Way sky | Easy | 4 | A 4k copy for phones | 1b |
| 9 | 34 | Autopilot spaceship | Medium | 5 | Module host | 2 |
| 10 | 50 | The ISS | Medium | 5 | Nothing | 2 |
| 11 | 62 | Line-up by size | Medium | 5 | Nothing | 2 |
| 12 | 47 | Pale Blue Dot | Medium | 5 | Best after #34 | 2 |
| 13 | 48 | Day, night and city lights | Medium | 5 | A night-lights texture | 3 |
| 14 | 55 | Northern lights | Medium | 5 | Nothing | 3 |
| 15 | 67, 68 | Constellations in the sky and join the dots | Medium | 5 | Backlog #19 design exists | 4 |

Lowest value for now: #112 (R3F rewrite), #111 (surface visits) and #110 (time
machine). Each is large, and earlier items deliver most of the same feeling.

---

## 11. Roadmap

### Progress

✅ done · ⏳ waiting on something outside the code · blank = not started.

| Phase | Status | Notes |
|---|---|---|
| 0 — Foundations | Code done; ⏳ waiting on the phone baseline | Started 2026-10-21. Phase 1 can begin: only #5 bloom waits on the phone numbers |
| 1 — The first ten seconds | Done except ⏳ #27 (sound decision) and ⏳ #5 bloom (phone numbers) | Started 2026-10-22 |
| 2 — Meet your ship | Not started | |
| 3 — A living Solar System | Not started | |
| 4 — Missions and stars | Not started | |
| 5 — Take the controls | Not started | |
| 6 — Beyond the Solar System | Not started | |

### Principles

1. **Something new a child can see every 1–2 weeks.** Only Phase 0 is
   plumbing, and it is kept short. Phase 1 ships its first half before the
   visual work starts.
2. **New features are modules from day one; old code moves only when it's
   touched.** A small module host goes in first. Existing planet, belt and
   camera code is pulled out (#106) only when a feature needs to change it,
   instead of a big refactor up front with no visible change.
3. **The ship arrives early and becomes the way you get around.** The
   spaceship is the headline feature. Building it in Phase 2 means missions,
   the ISS, Pale Blue Dot and the tour are designed around flying, rather than
   having flight added afterwards.
4. **Test the riskiest ideas cheaply first.** Three throwaway spikes answer
   the questions that could sink a phase (see below), each well before the
   phase that depends on it.
5. **Playtest with children, because analytics won't tell us.** `analytics.js`
   deliberately never tracks children. Each phase ends with 2–3 children (with
   a parent present and agreeing) trying it, and we watch where they get stuck.
   The results reorder the next phase.
6. **Core and stretch.** Each phase lists the core items that define it and
   stretch items done only if time allows. Estimates cover the core only.

### Risk spikes

| Spike | Question it answers | When | Size |
|---|---|---|---|
| Bloom on a phone | Can `EffectComposer` + bloom run at the `low` tier without dropping frames? If not, #5 becomes a sprite-only glow | Phase 0 | 1 day |
| Joystick with a 6-year-old | Can young children steer with an on-screen joystick, or do they need tap-where-to-go steering? | Phase 2 | 2 days, throwaway |
| Lensing on a tablet | Can the black-hole pass (#90) run on a school tablet, or does it need a pre-rendered fallback? | Phase 4 | 2 days, throwaway |

### Effort and timeline

Easy items are ½–1 day, Medium 2–5 days, Hard 1–3 weeks, for one developer.

| Phase | Theme | Core effort |
|---|---|---|
| 0 | Foundations | 1–2 weeks |
| 1 | The first ten seconds | 1½–3 weeks |
| 2 | Meet your ship | 2½–5½ weeks |
| 3 | A living Solar System | 2–5 weeks |
| 4 | Missions and stars | 2½–5½ weeks |
| 5 | Take the controls | 2–6 weeks |
| 6 | Beyond the Solar System | 3–9 weeks |
| **Total** | | **about 3½–8½ months** |

The wide ranges are honest: shader work varies a lot from idea to idea. Re-rank
after every phase using the playtest notes.

### Phase 0 — Foundations (1–2 weeks) ⚙️

- ✅ **Module host and quality tier** (2026-10-21).
  [`solarModules.js`](../src/pages/skills/geography/solarModules.js) is the
  registry the animate loop calls (`update(dt, { active })`, `resize`,
  `dispose`); a module that throws is reported and dropped without stopping
  the page. [`solarQuality.js`](../src/pages/skills/geography/solarQuality.js)
  holds the one `low` / `standard` rule (the meteor now uses it too) and the
  grown-up URL switches: `?debug`, `bloom=1`, `quality=low|standard`. The first
  module is the `?debug` frame readout
  ([`solarFrameReadout.js`](../src/pages/skills/geography/solarFrameReadout.js)),
  which shows median and p95 frame times, the tier, DPR and viewport. Desktop
  (Chrome, DPR 2, 1200×535, standard): 120 fps, frame 8.3 ms / p95 9.3 ms,
  our work 0.8 ms / p95 1.0 ms.
  **New feature code goes in a module, not in the `SolarSystem.jsx` effect.**
- ✅ **Bloom spike, desktop part** (2026-10-22).
  [`solarRenderPipeline.js`](../src/pages/skills/geography/solarRenderPipeline.js)
  draws the scene either directly (bloom off: exactly the old
  `renderer.render`) or through `EffectComposer` → `UnrealBloomPass` →
  `OutputPass` into a 4× MSAA half-float target. With bloom on, the Sun's
  emissive goes from 0.6 to 2.5 so only it passes the 1.0 threshold; on the
  `low` tier the blur runs at half resolution. Children get bloom off. It turns
  on with `?bloom=1`, and `?debug` adds a "Bloom (test)" Tweakpane folder
  (strength, radius, threshold, Sun brightness).
  - Desktop, Chrome, DPR 1, 1280×647, 120 Hz screen: bloom off 8.3 / p95
    9.1 ms; bloom on 8.3 / p95 9.0 ms; bloom on at `low` 8.3 / p95 9.2 ms.
    Our work stays ~1 ms. A desktop GPU hides the cost, so only the phone
    numbers can decide.
  - The meteor runs through all five phases with bloom on, with no console
    errors.
  - **Finding:** in the bloom path, see-through things blend in linear light,
    so orbit lines look brighter. Measured on a 0–255 scale, the outer rings
    go from 134 and 102 to 201 and 192. Scaling opacity by `^2.2` only got them
    to 166 and 151, so it was dropped. If real bloom wins, Phase 1 #5 should
    draw lines and labels in a second pass after `OutputPass` instead.
- ⏳ **Phone baseline and bloom decision** (backlog #17). Waiting on
  measurements from a real phone or tablet. No deploy is needed:
  1. On the Mac: `npm run build`, then `npx vite preview --host`. Note the
     `Network:` address it prints, such as `http://192.168.1.20:4173`. Allow
     incoming connections if macOS asks.
     If the phone can't connect but the address works on the Mac: on recent
     macOS, the app that started the server needs Local Network permission.
     Turn on Visual Studio Code (or Terminal) in System Settings → Privacy &
     Security → Local Network, quit and reopen it, then start the preview
     again. Also make sure the phone isn't on a guest network, and type the
     address with `http://`.
  2. On the phone, on the same Wi-Fi: open `<address>/solar-system?debug`,
     leave it alone for 20 seconds, and screenshot the green readout.
  3. Repeat with `<address>/solar-system?debug&bloom=1`.
  4. On both, tap Launch meteor and screenshot the readout as the pieces
     drift apart.
  5. Record the numbers here and decide: if bloom's p95 stays within about
     2 ms of bloom off at the `low` tier, use real bloom for #5. Otherwise #5
     becomes a sprite-only glow.
- ✅ **#82 "My view" settings drawer** (2026-10-22). A gear button in the
  bottom-right corner opens big switches for orbit lines, planet names and moon
  names ([`SolarSettingsDrawer.jsx`](../src/pages/skills/geography/SolarSettingsDrawer.jsx)).
  The toggles are data in [`solarViewSettings.js`](../src/pages/skills/geography/solarViewSettings.js),
  so Phase 1 adds a row, not markup. Choices are saved per browser under
  `dl.solarView` (not learner progress), stay in step with Tweakpane, and
  survive Reset. The drawer shows only when the launch buttons do, and opening
  it folds Tweakpane away. It has no sound switch (see §8). Checked at
  1200×535 and 390×844 in both themes: 48 px switches, no sideways scroll.
- ✅ **Asset checklist** (2026-10-21). Added to `public/static/` from Solar
  System Scope (CC BY 4.0): `2k_earth_clouds.jpg`, `2k_earth_nightmap.jpg`,
  `2k_saturn_ring_alpha.png` (2048×125, RGBA). `4k_stars_milky_way.jpg`
  (4096×2048, 0.5 MB) is resized from the 8k original. The 8k image is only
  1.9 MB to download, but it decodes to about 128 MB of GPU memory and many
  phones can't load textures wider than 4096 px. `/credits` now has a Solar
  System Scope entry. The Sun, Mercury, Venus, Earth, Moon, Mars, Uranus and
  Milky Way files were checked byte for byte against Solar System Scope's
  downloads. Pluto is deferred: Solar System Scope has no real Pluto map.
  - ✅ **Jupiter, Neptune and Saturn replaced** (2026-10-22). The old files
    (1024×576, 1800×900 and a blurry 318×159) had no recorded source. They are
    now Solar System Scope's 2048×1024 maps, covered by the same credit.
  - ⏳ **Unknown source:** the `cubeMap/` sky (six PNGs, 2.5 MB) still has no
    recorded source. Find and credit it, or replace it with the credited Milky
    Way sky (#9).

*Exit:* the settings drawer is the only visible change, there's a phone
baseline in hand, and real bloom versus sprite glow is decided.

### Phase 1 — The first ten seconds (1½–3 weeks)

Two drops, so children see something in the first week:

- **1a — no 3D risk (days 1–4):** #22 how old, #23 how heavy, #24 sun sneeze,
  #25 sun safety, #26 bounce, #27 sounds, #4 time controls. These are cards,
  tweens and audio, so they ship even if the visual work runs late.
- **1b — the look (rest of the phase):** #5 bloom, #1 warp-in (plays once per
  visit, tap to skip), #8 shooting stars, #9 Milky Way, #11 clouds, #12
  atmospheres.
- *Stretch:* #6 lens flare, #7 twinkle, #13 rings, #10 sun shimmer, #31 fact
  sparkles, #33 car ride.

Done so far:

- ✅ **#4 time controls** (2026-10-22). "Planet speed" in My view: ⏸ Stop,
  🐢 Slow (the normal speed, 1×) and 🐇 Fast (20×, so Earth goes round in
  about a minute). Stop freezes orbits and spins. The choice is not saved,
  because a Solar System still stopped from last time would look broken, and
  Reset goes back to Slow. Moving Tweakpane's Orbit Speed slider un-presses
  the buttons unless it lands on 1 or 20. Presets live in
  [`solarViewSettings.js`](../src/pages/skills/geography/solarViewSettings.js).
- ✅ **#22 how old and #23 how heavy** (2026-10-22). Two big buttons on the
  planet card ([`PlanetPlayCard.jsx`](../src/pages/skills/geography/PlanetPlayCard.jsx),
  maths in [`planetPlay.js`](../src/pages/skills/geography/planetPlay.js)).
  Ages 4–11 as buttons give "On Mars you'd be 3!" (whole birthdays, so
  Jupiter says "you haven't had your first birthday yet"); the age is never
  stored. The weight game puts the CSS Bix on bathroom scales that bounce
  higher on light worlds. Bix weighs 20 kg on Earth; the gas giants say "at
  the cloud tops" because they have no ground. It is always Bix's weight,
  never the child's. Sentences are read aloud only while the navbar sound is
  on. Shown for the eight planets, Pluto and the Moon (the Moon has weight
  only); hidden during the tour, whose card is already full.
- ✅ **#24 sun sneeze, #25 sun safety and #26 bounce** (2026-10-22). The Sun
  can now be tapped. The first tap of a visit shows and reads "Never look at
  the real Sun. It can hurt your eyes!"; five taps within 3 seconds (the first
  counts) give "A-a-achoo! The Sun sneezed out a solar flare!" with a burst of
  sparks that curl back towards the Sun
  ([`sunSneeze.js`](../src/pages/skills/geography/sunSneeze.js), one pooled
  `Points`, 90 sparks on `low`, 180 on `standard`). Tapped planets and the Sun
  do a squishy bounce ([`solarTaps.js`](../src/pages/skills/geography/solarTaps.js),
  with the tap counter, both unit-tested). Changes from the plan: no camera
  nudge, because the follow camera sets its position every frame, so the Sun
  scrunches up instead; and the bounce ends at once before the meteor launches
  and on Reset, because the meteor checks Earth's exact size. Reduced motion
  keeps the words and drops the bounce and sparks. Lines are read aloud only
  while the navbar sound is on.
- ✅ **#9 Milky Way sky** (2026-10-22). A "Milky Way sky" switch in My view
  swaps the cube-map sky and the star dots for Solar System Scope's Milky Way
  photo ([`solarSky.js`](../src/pages/skills/geography/solarSky.js)). The band
  is tilted 60° to the planets' plane, as the real one is, and shown 3× brighter
  because the photo is true to life and very dark. It loads the first time it's
  switched on: the 4k copy on the `low` tier, the 8k one otherwise. The choice
  is saved in `dl.solarView` and survives Reset. It is off by default, so the
  uncredited cube map is still what most children see (see the asset
  checklist in Phase 0).
- ✅ **#11 Earth clouds and #12 atmosphere glow** (2026-10-22). Solar System
  Scope's cloud map drifts over Earth a little faster than the ground, and
  stops with ⏸. Earth has a soft blue halo, Venus a yellow one and Mars a faint
  pink one, brighter on the day side
  ([`planetAtmospheres.js`](../src/pages/skills/geography/planetAtmospheres.js),
  a small rim shader). They are children of the planet, so they tilt, bounce
  and hide with it, and the meteor's check of Earth's exact size still passes.
- ✅ **#8 shooting stars** (2026-10-22). The first streak crosses the part of
  the sky you're looking at 6–10 seconds after the page opens, then one every
  20–40 seconds ([`shootingStars.js`](../src/pages/skills/geography/shootingStars.js),
  timing and the tap test in
  [`shootingStarTiming.js`](../src/pages/skills/geography/shootingStarTiming.js)).
  Each lasts 1.6 s, slower than a real one, so a child has time to tap it. A
  tap within 44 px of its head makes a golden sparkle and "🌠 Make a wish!",
  read aloud while the navbar sound is on. None appear under reduced motion or
  during the meteor. The Sun's lines and the wish share one message slot.
- ✅ **#1 warp-in arrival** (2026-10-22). The page opens at warp speed:
  streaks of light rush past while the camera swoops in from six times further
  out to the usual overview, over 2.6 seconds
  ([`warpIn.js`](../src/pages/skills/geography/warpIn.js), timing in
  [`warpTimeline.js`](../src/pages/skills/geography/warpTimeline.js); 160
  streaks on `low`, 320 on `standard`). It plays once per visit
  (`dl.solarWarpSeen` in sessionStorage) and never under reduced motion.
  Anything the child does skips it: a tap, drag or scroll, search, the tour,
  Reset or the meteor.
- ⏳ **#5 glowing Sun.** Waiting on the Phase 0 phone baseline: real bloom
  (with lines and labels drawn after `OutputPass`) or a sprite-only glow.
- ⏳ **#27 arrival sounds.** Waiting on a decision.
  [`docs/sounds/README.md`](sounds/README.md) says all of Skills Mode is
  silent by design, and every sound in the app was chosen by ear. To add a
  whoosh and an arrival chime: pick them in
  [`mixkit-audition.html`](sounds/mixkit-audition.html), add them to
  `process-sounds.py` and `cues.js`, and update the README's "Silent by
  design" line.

*Exit:* a child opening the page for the first time reacts within ten seconds,
and phone frame time stays within the Phase 0 baseline.

### Phase 2 — Meet your ship (2½–5½ weeks)

- **#34 autopilot ship** replaces the camera-only fly-to used by search, tap
  and the tour. Keep the old camera move behind reduced motion. Write tests
  first, because three existing features change at once.
- **#35 lift-off** becomes the start of the tour.
- **#50 ISS**, **#62 line-up by size** and **#47 Pale Blue Dot**, flown as the
  last leg of the tour out to Neptune.
- **Joystick spike** with 2–3 children (see above).
- *Stretch:* #36 flames, #37 orbit settle, #38 camera choices, #39 slingshot.

*Exit:* every way of moving round the page uses the ship, nothing that worked
before is broken, and we know which steering style Phase 5 will build.

### Phase 3 — A living Solar System (2–5 weeks)

- **#48 day, night and city lights** and **#54 Moon phases**, the two
  statutory ideas, both read aloud.
- **#55 northern lights**, **#41 comets** and **#57 Saturn's rings up close**.
  By this phase the ship can fly into the rings, which is why they come after
  Phase 2.
- *Stretch:* #51 Hubble, #52 satellite train, #58–59 Io and Enceladus, #63 real
  distances, #65 seasons, #43 prominences.

*Exit:* every planet has at least one moving surprise, and the day/night and
Moon content is checked against
[`year-5-science.md`](curriculum/year-5-science.md).

### Phase 4 — Missions and stars (2½–5½ weeks)

- **#73 mission cards**, written as journeys ("Fly to the planet with the most
  moons"), and **#74 passport**, sharing the collection screen with backlog
  #31. Read the `curriculum-progress` skill first and save under a separate
  Skills-only key.
- **#67 constellations in the sky** (backlog #19) and **#68 join the dots**.
- **#75 Golden Record**, hidden on Voyager.
- **Lensing spike** for Phase 6.
- *Stretch:* #70 stars aren't flat, #69 story/fact flip, #77 planet sounds,
  #81 badges, #29 photo mode.

*Exit:* a child has something to *do* on every visit, and stamps survive a
reload and a sign-out.

### Phase 5 — Take the controls (2–6 weeks)

- **#83 free flight**, using whichever steering the Phase 2 spike chose, with
  autopilot always one tap away as the "help me" button. Autopilot also stays
  the keyboard and screen-reader route.
- **#84 asteroid-belt run**: the first flight game, and the source of
  stardust.
- *Stretch:* #85 ISS docking, #87 ship garage, #89 gamepad, #46 parallax stars.

*Exit:* a 6-year-old can get from Earth to Saturn alone, by autopilot or by
steering, without getting lost or stuck.

### Phase 6 — Beyond the Solar System (3–9 weeks)

A simple **Beyond** button and warp tunnel (#113) open a short list of
destinations. The galaxy map (#108, Complex) is not needed to reach them, so it
waits until Later as a nicer way to choose where to go.

- **#113 warp to Beyond**, using what the lensing spike learned.
- **#90 black hole** and **#91 nebula** as the first destinations, each with a
  narrated card saying how far away it really is.
- *Stretch:* #92 supernova, #109 TRAPPIST-1 as the first other star system,
  #93 pulsar.

*Exit:* warp travel works on a tablet at the `low` tier, and nothing in the
Beyond view could be mistaken for part of our own Solar System.

### Later

Order to be decided from playtests: #99 star neighbours, #108 galaxy map, the
rest of #109, #100 tonight's sky, #101 make a constellation, #102 story
missions, #103 planet builder, #104 gravity sandbox, #86 Moon landing, #96 tap
a country, then the remaining Complex items.
