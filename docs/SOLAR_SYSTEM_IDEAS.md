# Solar System — open ideas

Upcoming work for [SolarSystem.jsx](../src/pages/skills/geography/SolarSystem.jsx).
How it is built: [EXPLORABLE_WORLDS.md](EXPLORABLE_WORLDS.md). IDs are stable;
built ideas are removed (git history has them). Sizes: Easy ≲1 day, Medium 2–5
days, Hard 1–3 weeks, Complex 3+ weeks. 🎓 teaching link · ⚙️ infrastructure.

## Decisions and gates

- **Bloom (#5):** needs a real-phone baseline. `npm run build`, then
  `npx vite preview --host`; on a phone on the same Wi-Fi capture `?debug` and
  `?debug&bloom=1` after 20 s and during meteor breakup. Low-tier p95 within
  ~2 ms supports bloom; otherwise use sprite glow. Transparent lines need a
  separate post-output pass if bloom ships.
- **Audio (#27):** decide whether Skills Mode may have effects; pick sounds in
  the [audition page](sounds/mixkit-audition.html) and update the
  [sound policy](sounds/README.md). Lift-off rumble (#35) and music depend on it.
- **Old sky:** find a source for the six `cubeMap/` images or replace them with
  the credited Milky Way default.
- **Playtests:** 2–3 children with a parent: first-visit reaction, flight,
  clues, turbo, chapter help-unlock timing and question tone.
- **Third star system:** forces the `systemAhead` rule (heading decides where a
  trip goes).
- **Reported once, not reproduced:** orbit lines switched off and a Sun message
  appeared without a tap.
- **Phone planet cards** can cover their planet; camera framing above the card
  is open.

## Recommended next

1. **#109 Alpha Centauri** via the `add-star-system` skill (Medium).
2. **#91 Nebula clouds** — second Beyond destination (Medium–Hard).
3. **#75 Golden Record** — hidden Voyager near the Pale Blue Dot route; text and
   read-aloud first (Easy–Medium).
4. **#3 "Light takes…" badge** (Easy).

## Open ideas

### Easy

| # | Idea | Experience |
|---|---|---|
| 2 | Little rocket on tap | Tapping a planet sends a small rocket ahead of the camera |
| 3 | "Light takes…" badge | "Sunlight takes 8 minutes to reach Earth" 🎓 |
| 5 | Glowing Sun (bloom) | Awaiting phone baseline |
| 6 | Lens flare | Rings of light when the Sun is just off-screen |
| 7 | Twinkling stars | Background stars gently twinkle |
| 10 | Sun surface shimmer | The Sun's surface slowly boils |
| 13 | Realistic Saturn rings (finish) | Finer dusty structure beyond the gapped bands |
| 14 | Faint rings elsewhere | Jupiter, Uranus and Neptune rings when zoomed in |
| 16 | Moon always faces Earth (finish) | Optional arrow/label 🎓 |
| 17 | Backwards and sideways spinners | Curly arrows for Venus and Uranus |
| 18 | Dwarf-planet friends | Ceres, Haumea and Eris |
| 19 | Polaris marker | The North Star with a "North" label |
| 20 | Star colours | Red Betelgeuse, blue Rigel |
| 21 | "Stars are suns" moment | Tap a background star: "That's a sun, very far away!" |
| 27 | Arrival sounds | Awaiting audio decision |
| 28 | Space hum | Optional soft ambient pad |
| 29 | Photo mode | Hide the UI and save a picture |
| 30 | Screensaver drift | Idle camera drifts round the system |
| 31 | Hidden fact sparkles | Tap hidden stars near planets for a fact |
| 32 | Silly faces mode | Cartoon planet faces that blink |
| 33 | Car ride to the Sun | "Driving to the Sun would take about 170 years!" |

### Medium

| # | Idea | Experience |
|---|---|---|
| 35 | Lift-off rumble (finish) | Awaiting audio decision |
| 36 | Boost flame flare (finish) | Manual boost flares the exhaust |
| 38 | Watch from outside (finish) | Third camera view |
| 39 | Gravity slingshot | Autopilot to Saturn swings past Jupiter 🎓 |
| 40 | Real spacecraft cameos | Voyager, New Horizons, Juno, Parker with cards |
| 42 | Kuiper belt | Sparse icy ring beyond Neptune |
| 43 | Solar prominences | Glowing loops off the Sun's edge |
| 44 | Procedural Sun | Granules and limb darkening |
| 45 | Solar wind and magnetic shield | Particles curving round Earth |
| 46 | Parallax star layers | Near stars slide faster when flying |
| 49 | Shiny oceans | Sunlight glints off sea, not land |
| 51 | Hubble | Orbiting telescope with a card |
| 52 | Satellite train | String of satellites after launch |
| 53 | Earth's satellites layer | Toggle the satellite shell |
| 56 | Swirling Great Red Spot | Jupiter's bands flow |
| 58 | Volcanoes on Io | Erupting plumes |
| 59 | Geysers on Enceladus | Icy jets |
| 60 | Mars dust storm | Planet-wide storm button |
| 61 | Rover pins on Mars | Curiosity and Perseverance |
| 63 | Squished vs real distances | "Real spacing" mode |
| 64 | Orbit trails | Fading ribbons |
| 65 | Seasons on Earth | Tilt arrow; UK summer sunlight 🎓 |
| 66 | Where are the planets today? | Real positions for today's date |
| 69 | Story and fact flip | Constellation card flips |
| 70 | Stars aren't flat | Turn Orion sideways |
| 71 | The planets' road | The ecliptic line |
| 72 | Brightest stars | Labels sized by brightness |
| 74 | Space passport | Owner deferred; builds on `dl.solarMissions` stamps |
| 75 | Golden Record | Hidden Voyager plays a greeting |
| 76 | Arrival question | One big-button question on arrival |
| 77 | Planet sounds | NASA sonifications |
| 78 | Design an alien | Build a creature for a planet 🎓 |
| 79 | Movie mode | Cinematic flyby |
| 80 | Light race | Light pulse ticks off each planet 🎓 |
| 81 | Badge confetti (finish) | Confetti for flight badges |

### Hard

| # | Idea | Experience |
|---|---|---|
| 85 | Dock with the ISS | Line up rings and drift in |
| 86 | Land on the Moon | Steer a lander down gently |
| 87 | Ship garage | Spend stardust on paint and trails |
| 88 | Solar sail ride | Drift outward on sunlight 🎓 |
| 89 | Gamepad support | Fly with a controller |
| 90 | Black hole with lensing | Needs a tablet lensing spike first |
| 91 | Nebula clouds | Fly through star-forming gas |
| 92 | Supernova | Swell, flash, new nebula |
| 93 | Pulsar lighthouse | Sweeping beams |
| 95 | Bix's pretend anomaly | Mystery portal with a bonus |
| 96 | Tap a country on Earth | Hear its name; link to Flag Finder |
| 97 | Real sky colours | Sunset edge at the terminator |
| 98 | A year on Earth | UK day length through a year 🎓 |
| 99 | Our star neighbours | ~100 nearest stars in 3D |
| 100 | Tonight's sky from home | UK garden sky for tonight 🎓 |
| 101 | Make your own constellation | Draw, name, Bix tells its story |
| 102 | Bix's story missions | Five-chapter story |
| 103 | Planet builder | Too hot, too cold, just right 🎓 |
| 104 | Gravity sandbox | Flick a moon at a planet |
| 105 | Music that changes with place | Depends on audio decision |
| 113 | Warp to Beyond (finish) | More destinations; flying in Beyond |

### Complex

| # | Idea | Experience |
|---|---|---|
| 106 | Extract scene modules ⚙️ | Split planets, belt, sky, camera director and UI bridge out of `SolarSystem.jsx` |
| 107 | Adaptive quality ⚙️ | Measure frame rate and lower effects automatically |
| 109 | More star systems | Alpha Centauri, Sirius A and B, Kepler-16 |
| 110 | Time machine | Scrub centuries; Halley in 2061 |
| 111 | Visit a planet's surface | Valles Marineris, Titan's lakes |
| 112 | Move to React Three Fiber ⚙️ | Not planned |

Dependencies: #34 ship → #35–39; #73 missions → #74/#81/#102; #48 + #65 → #98;
#66 → #110; bloom composer → #5/#90/#92.
