# Galaxy map and TRAPPIST-1 — design

Ideas: [SOLAR_SYSTEM_IDEAS.md](../../SOLAR_SYSTEM_IDEAS.md) #108 galaxy map, #109
other star systems. Builds on #113 Warp to Beyond and #83 free flight
([Beyond spec](2026-10-25-beyond-warp-and-space-ripples-design.md)).
Status: design, awaiting owner approval. Date: 2026-10-26.

## Intent

Children can already leave the Solar System through Beyond, but only to watch
one event (Space ripples). The owner wants real places to _go_: a second star
system the child can explore exactly as they explore ours — touring it,
flying the rocket around it, tapping planets for facts, chasing flight clues —
and a galaxy map that shows where it is.

The long-term picture: a galaxy map that opens from a toolbar button, shows
galaxies, then the known star systems in our galaxy, and lets the child jump
into one. Eventually the child flies their rocket from any system to any
other, and where they end up depends on where the systems really are. This
first build delivers that picture with **one** new system, done richly:
**TRAPPIST-1** — and builds it so the next NASA-mapped system is mostly a data
job.

Why TRAPPIST-1: seven Earth-sized planets to fly between, among the best
measured densities of any exoplanets (real "5.4 g/cm³" facts), JWST
temperature measurements on the inner two, three planets in the zone where
water could stay liquid, and a dim red star that looks unmistakably not-home.

## Goals

1. A **Galaxy map** button opens a 3D map with two levels: galaxies, then the
   Milky Way with its known systems. Choosing TRAPPIST-1 takes the child there.
2. **TRAPPIST-1 is a full, explorable system** with: a guided tour, Fly the
   rocket (free flight, turbo, orbit a planet, camera views), planet cards with
   facts, search, its own flight clues, and space birthdays.
3. **Flying there**: in Fly the rocket, once the ship passes beyond the edge
   of the system (past Pluto, at home) in any direction, it reaches the other
   system in **at most 10 seconds**, with the child flying the whole way.
4. **Home is always easy**: our Solar System is the home system, one obvious
   step away from anywhere.
5. Audience is **6–8 year olds**, but real units are welcome on cards
   ("density 5.4 g/cm³", "about 40 light-years away").
6. **Reusable**: adding the next real system is mostly writing one system
   definition, following a written guide (see "Built to repeat").

## Non-goals (this build)

- Any star system other than TRAPPIST-1 and home. (#109's others come later.)
- Anything to visit inside other galaxies — they are **look, don't land**.
- Saving anything: no visited systems, no stamps. Waits for the passport (#74).
- Mission stamps (#73) in TRAPPIST-1. Missions stay home-only.
- Launch meteor in TRAPPIST-1 — it stays home-only.
- Fuel, jump range or any resource limit on travel (owner removed it).
- Flying inside Beyond destinations such as Space ripples.
- Sound effects (still blocked on the #27 audio decision). Read-aloud is fine.
- The future navigation dropdown menu (owner plans it separately).
- Splitting `SolarSystem.jsx` into many small modules (#106 continues
  separately); this build makes it definition-driven, not smaller.

## Anti-goals

- **A pretty picker.** The map must lead to somewhere the child can fly, not
  just to another card.
- **Waiting.** No journey longer than 10 seconds (owner).
- **Getting lost.** A child 40 light-years away with no obvious way home is a
  failure even if everything else works.
- **Invented science presented as real.** Nobody has seen any TRAPPIST-1
  surface. Looks are artist's impressions and must be labelled so.
- **Breaking home.** Every existing Solar System feature must behave exactly
  as it does today when the child is at home.
- **A one-off.** If TRAPPIST-1 needs system-specific code in shared features,
  the next system will cost as much again.

## Owner decisions

- The toolbar **five-button rule is removed** (a dropdown will come later).
  Update the build rule in `SOLAR_SYSTEM_IDEAS.md`.
- The Galaxy map is **its own toolbar button**.
- **Beyond stays** as a separate feature, reachable from any system. Space
  ripples stays as a **special spot on the galaxy map** (it is beyond our
  galaxy; GW150914's host galaxy is unknown).
- **Constellations** is independent of which system the child is in and stays
  reachable from TRAPPIST-1.
- **Launch meteor** is home-only.
- TRAPPIST-1 gets **Tour** and **Fly the rocket**, new **flight clues**, and
  **space birthdays**. No mission stamps.
- Galaxy view art: **NASA's well-known artist's illustration of the Milky Way**
  (NASA/JPL-Caltech/R. Hurt), shown **in 3D** so the child can turn, tilt and
  pan around it.
- Other galaxies: **look, don't land** (a card, no systems).
- Travel: passing beyond the system's edge, in any direction, gives **a few
  seconds' warning**, then the trip; the child can **turn back partway**; the
  child navigates the rocket the whole way. **Never more than 10 seconds**,
  however far apart the systems are; longer real distances may make a trip a
  little longer within that cap.
- Eventually travel follows **real relative positions**: fly towards where a
  system really is to go there.
- Home: our Solar System is always **home** and easy to get back to.
- **Nothing is saved.**
- Reusable plan and reusable code for more real systems.
- Existing owner rule kept: star systems are real ones in the Milky Way only.

## How it works

### One trip, three ways in

All travel between systems uses **one interstellar trip** — the rocket
dashing through space, light streaks rushing past (`warpStreaks.js`), the
star behind shrinking and the star ahead growing, with the label "Sped up -
even light takes about 40 years to make this trip." It is not the pretend
black-hole doorway Beyond uses, because these are real places reached by
flying. _(My call: using Beyond's hold-to-ride warp for map jumps would mean
a pretend shortcut to a real place, and its drift can take about 20 seconds,
over the owner's limit.)_

1. **Flying out** (Fly the rocket): the child flies the trip themselves —
   see "Flying between systems".
2. **Jump there** (galaxy map): the same trip, flown by autopilot, ending at
   the system's overview.
3. **Home button** (when away): the same trip home, by autopilot, ending at
   the home overview.

All three take at most 10 seconds and respect reduced motion (no streaks; a
progress bar and fade, like the warp).

### Galaxy map

A new toolbar button, **Galaxy map**, available in both systems. It opens a
full-scene 3D map (its own scene and camera, like the line-up and Beyond).

**Level 1 — galaxies.** The Milky Way, plus neighbours such as the Andromeda
Galaxy, Triangulum and the Large and Small Magellanic Clouds, placed in a
rough 3D arrangement (compressed and labelled as such). The **Space ripples**
spot sits out here as a special marker, "far beyond our galaxy". Tapping a
neighbour galaxy opens a look-don't-land card (what it is, how far, one or two
facts). Tapping the Milky Way zooms into level 2. Tapping Space ripples opens
the existing Beyond warp to that destination.

**Level 2 — the Milky Way.** NASA's illustration on a disc the child can
drag to turn, tilt and pan, with depth added so it reads as 3D rather than a
flat picture (e.g. a star-particle layer and a raised central bulge — builder's
choice). It shows home in the Orion Spur about 26,000 light-years from the
centre, with a **You are here** pulse on whichever system the child is in.

At galaxy scale 40 light-years is far smaller than a pixel, so every system we
can visit sits on the same spot as home. Level 2 therefore has an **"Our
neighbourhood"** close-up (a further zoom or an inset — builder's choice)
that places systems by their **real relative positions**, built to hold many
systems, with 48px labelled markers. Distances shown are real; any
compression is labelled.

Tapping a system opens its card: name, distance, star type, number of
planets, one fact, and **Jump there** (or **Go home** for the Solar System).
Choosing the system you are already in just closes the map.

### TRAPPIST-1 — the system

**The star.** TRAPPIST-1 is an ultracool red dwarf: about 2,560 K, about 9%
of the Sun's mass, only slightly wider than Jupiter, about 40.7 light-years
away in the constellation Aquarius. Shown dim and salmon-red. It flares often
in real life; a gentle occasional flare is a welcome extra (builder's call).

**The planets** — values to check against the NASA Exoplanet Archive
(Agol et al. 2021) before writing any card:

| Planet | Width (Earth = 1) | Mass (Earth = 1) | Year (Earth days) | Density g/cm³ | Notes for cards                        |
| ------ | ----------------- | ---------------- | ----------------- | ------------- | -------------------------------------- |
| b      | 1.12              | 1.37             | 1.51              | ≈5.4          | JWST: hot dayside, likely no thick air |
| c      | 1.10              | 1.31             | 2.42              | ≈5.4          | JWST: no thick carbon-dioxide air      |
| d      | 0.79              | 0.39             | 4.05              | ≈4.4          | Inner edge of the water zone           |
| e      | 0.92              | 0.69             | 6.10              | ≈4.9          | In the water zone                      |
| f      | 1.05              | 1.04             | 9.21              | ≈5.0          | In the water zone                      |
| g      | 1.13              | 1.32             | 12.35             | ≈5.0          | In the water zone                      |
| h      | 0.76              | 0.33             | 18.77             | ≈4.1          | Coldest, outermost                     |

**Teaching points** (verify each before use):

- All seven orbits would fit inside Mercury's; their years last days.
- Their orbits keep a neat rhythm (a resonant chain).
- Scientists think each always shows the star the same face — say
  "scientists think", not fact.
- From one planet, a neighbour can look bigger than our Moon does from Earth
  (e.g. g seen from f at closest approach).
- We see the system edge-on from Earth: the planets pass in front of their
  star, which is how they were found. Arriving from the Sun's direction, the
  child arrives level with the orbits.
- From TRAPPIST-1, **our Sun is just a faint star**, in the direction of
  Leo as Earth sees it. The home signpost marks it (see "Signposts").
- No known moons.

**Every number gets a home comparison** for 6–8 year olds: "density 5.4
g/cm³ — about the same as Earth (5.5)", "a year of 6 days".

**Looks.** Artist's impressions, procedural or small textures — no large
downloads without a phone-memory check. b and c dark, bare rock (consistent
with JWST); the rest plausible rocky worlds, with water/ice hints only where
labelled "might". The planet card carries a short honesty line, in the style
of Space ripples: "Nobody has seen these planets up close. This is a picture
to help us imagine."

**Scale and time.** Distances and sizes are compressed, as at home, and
labelled. TRAPPIST-1 has its **own time scale**: its years are days, so at
home's speed the inner planets would spin dizzyingly. Real period ratios are
kept, the time controls (⏸ 🐢 🐇) work as at home, and the speed-up is
labelled. The system feels compact: reaching its edge from the centre takes
about as long as crossing home's inner planets (builder's call).

**Arrival.** Each visit opens with a short welcome from Bix, read aloud
(navbar mute applies): "Welcome to TRAPPIST-1, about 40 light-years from home!
Seven rocky planets circle this little red star."

**Names.** Planets keep their real names (TRAPPIST-1 b … h) on screen, with a
spoken form for read-aloud ("TRAPPIST one B") so speech never says "minus
one".

**Planet cards** use the same card component as home (Discover, two facts then
More facts, Look closer, Play & compare) with TRAPPIST-1 facts. Play & compare
offers **Your space birthday** — dramatic here: a 7-year-old would be about
1,690 on b and about 136 on h. Other activities (Bix on the scales, planet
sizes) are welcome if they fit — builder's call; surface gravity follows from
the table.

**Tour.** "Tour TRAPPIST-1": star, then b → h, narration per stop, the same
controls as the home tour (Next/Previous, narration mute).

**Fly the rocket.** Same controls, turbo, orbit a planet, both camera views
and **C**, surface bumpers and boundary. The flight starts beside a chosen
body — **TRAPPIST-1 e** _(my call: the most Earth-like, in the water zone)_ —
and "Back to Earth" becomes **Back to start**, naming that body.

**Flight clues.** A new TRAPPIST-1 deck covering the star and all seven
planets (several clues per planet are fine — "the innermost", "the coldest",
"three planets in the water zone: find the middle one", "find the sign
pointing home"). Same rules as home: memory-only, real proximity required,
hints and skips free, no consecutive identical targets. Badge names and
thresholds fit the deck size (builder's call). Home's 25-clue deck is
unchanged.

**My view and search.** The settings drawer and planet search work with
TRAPPIST-1's bodies; switches that don't apply (Moon names, home-only
effects) are hidden there.

**Constellations from TRAPPIST-1.** Constellations are Earth's star
patterns. Opened from TRAPPIST-1 they show the same Earth sky patterns,
labelled "as seen from Earth" (builder's call on wording). Do not invent
TRAPPIST-1 constellations. The background sky can stay the same Milky Way:
40 light-years barely changes it.

**Toolbar in TRAPPIST-1:** Tour TRAPPIST-1, Fly the rocket, Constellations,
Beyond, Galaxy map, **Home**. No Launch meteor, no Missions. At home the
toolbar gains Galaxy map, making six buttons: until the dropdown arrives, the
toolbar must still fit at 390px without overlapping the scene's controls.

### Flying between systems

The owner's framing: **the child is navigating their rocket from one solar
system to the other.** It is a flight, not a cutscene.

- **Warning.** In Fly the rocket, crossing the system's edge (just beyond
  Pluto's orbit, at home) in any direction shows a short warning in the
  flight HUD: "Leaving the Solar System — heading for TRAPPIST-1 in 3… 2… 1…"
  with a big **Turn back** button (and a keyboard equivalent). Turning back —
  the button, or steering back towards the star — cancels it. The warning is
  read aloud unless muted. _(My call: about 3 seconds.)_
- **The trip.** Then the rocket dashes to the other system while the child
  keeps flying it: steering, the camera views and **C** still work. It
  arrives at the other system's edge, still in Fly the rocket, facing
  inwards, then the arrival welcome plays. _(My call: warning plus dash at
  most 10 seconds, so the dash is about 7.)_
- **Turn back partway.** **Turn back** stays available during the trip. It
  returns the rocket quickly to just inside the edge of the system it left,
  facing its star — never stranded between systems. Steering must not cancel
  the trip by accident; only a deliberate turn-around counts (builder decides
  how much).
- **Both directions.** Leaving TRAPPIST-1 works the same way ("heading home
  to the Solar System in 3… 2… 1…").
- Not triggered while orbiting a planet, during autopilot or tours, or
  straight after Back to start.
- Today the boundary offers **Warp to Beyond**. That offer gives way to the
  trip; Beyond is still on the toolbar.

### Signposts

Out past the edge of each system, in the **real direction** of every other
system, stands a glowing signpost visible during flight: "TRAPPIST-1 — 40
light-years this way" at home (towards Aquarius); "Home — the Solar System"
at TRAPPIST-1, beside the faint dot of our Sun. Signs are generated from the
definitions' positions, so a new system gets its signs everywhere
automatically.

In this build, any direction past the edge still goes to the other system
(owner) — the sign shows the way but isn't required. When a third system
arrives, the signs become the rule: fly out past a sign to go there. What
happens when no sign lies ahead is decided then.
_(Owner left signs to me if they help the future; they do, and are cheap.)_

### Getting home

- A **Home** button is always visible away from home — on the toolbar and
  in the flight HUD. It flies the trip home by autopilot and lands at the
  home overview.
- On the galaxy map, the Solar System's card says **Go home**.
- _(My call.)_ Beyond and Space ripples return the child to **the system they
  left**, not always home. Home is one tap away from there.
- Reset and page reload always start at home (nothing is saved).

## Built to repeat: more real systems later

TRAPPIST-1 is the **first of many** real systems (Kepler-90, HR 8799, Alpha
Centauri, Kepler-16, …). The next one should be mostly a data job.

**One system definition per system**, a data module (plus any textures),
testable in node. Roughly — field names are the builder's:

- **identity**: id, name, spoken name, place in the galaxy → system
  hierarchy;
- **real position**: right ascension, declination and distance from the
  Sun (NASA Exoplanet Archive), converted to one shared light-year frame with
  home at the origin — used by the map, signposts and travel;
- **stars** — a _list_, even though TRAPPIST-1 has one, because later systems
  have two or three. Each: size, colour/temperature, facts, optional extras
  (flares);
- **planets** (and moons when a system has them): scene size and distance,
  orbit period and orientation, real values for cards (mass, width, density,
  year, temperature where measured) with home comparisons, look, tour line,
  facts, honesty notes;
- **scene settings**: scale, time scale, flight edge, flight start body,
  compression labels;
- **content**: arrival welcome, tour order, flight clue deck and badges,
  space birthday data (derived from orbit periods), map card text;
- **sources**: a citation for every number.

**A lightweight registry** lists every system's identity, position and map
card text, and nothing heavy. The map, signposts and trip read the registry;
a system's full definition and textures load only when the child goes there
(code-split), so more systems don't slow the first page load. Beyond events
such as Space ripples and look-don't-land galaxies are entries in the same
place hierarchy (extending `beyondDestinations.js`, already shaped
galaxy → system/event → bodies), so the map reads one catalogue.

**Shared features read a definition; they never name a system.** The system
scene, tour, Fly the rocket (turbo, orbit, cameras, bumpers, edge, Back to
start), planet cards, search, My view, flight clues, space birthday,
Constellations, the trip, signposts, the map and Home all take a
definition. No `if (system === 'trappist-1')` — and no `'Earth'` — in
shared code. (Today `solarFreeFlight.js` looks up Earth by name and the
flight HUD says "Back to Earth"; both become definition-driven.)

**Home becomes a definition too** — its planets, facts, tour lines and clues
move out of `SolarSystem.jsx` into a home definition that the shared scene
reads, so home and TRAPPIST-1 share one scene, one data format and one test
suite. Home-only things (Launch meteor, missions, ISS, Halley's Comet, Earth's
day/night, clouds and auroras, Moon phases, Pale Blue Dot, the size line-up,
Sun sneeze) stay **home extras**.

**Proof of reuse.** A shared test suite runs against **every** registered
definition: required fields, sources present, card numbers consistent
(density from mass and width), clue targets exist, tour covers every body,
birthday data valid, spoken names present. A small **made-up test-only
system** (never shipped, never shown) is also run through the shared
features, the registry, signposts and trip-direction maths, proving nothing
is hard-coded to TRAPPIST-1 and that "which system is this way?" works with
three systems.

**Adding a system is written down.** The build ends with a short
`.claude/skills/add-star-system` skill, matching the repo's other skills:
where the definition goes, which archive values to take and how to cite them,
honesty labels, writing rules for 6–8 year olds (home comparisons, spoken
names), textures and phone memory, credits, the tests, and the browser check.

## Architecture

- **One scene, built from a definition, rebuilt on system change** (owner
  approved 2026-10-26, replacing the earlier "two scenes" call after the code
  was read). `SolarSystem.jsx` builds everything inside one effect —
  camera following, labels, tapping, tour, search and flight wiring — and
  already disposes everything on unmount. A separate scene would have copied
  ~1,000 lines or needed the same extraction. Instead:
  - the existing scene effect builds from a **system definition** (stars,
    planets, moons, orbits, tour, cards, clues, flight settings);
  - home-only features run only when the definition switches them on
    (**home extras**: meteor, missions, ISS, Halley's Comet, Earth day/night,
    clouds/atmospheres, auroras, Saturn ring detail, asteroid belt and small-body
    regions, Moon phases, Pale Blue Dot, line-up, Sun sneeze/safety, lift-off,
    warp-in);
  - a thin page wrapper holds the current system id and remounts the scene
    (`key={systemId}`) when it changes. Nothing is saved; reload starts home.
  - So **home moves onto the shared scene in this build**, which satisfies
    the owner's "home must move fully onto the shared scene" requirement
    (recorded in `SOLAR_SYSTEM_IDEAS.md` #106 / Upcoming sequence item 6).
- **The trip is split across the rebuild.** The leaving system plays the
  warning and the first half of the dash; the arriving system starts in
  "arriving" mode and plays the second half, ending in Fly the rocket at its
  edge. The light streaks cover the hand-over; the 10-second cap, steering
  and Turn back are unchanged. Turn back during the second half returns via
  the same split.
- **Safety for home:** home's data moves out byte-for-byte first, pinned by
  tests; each home extra is gated in its own task; a guard test fails if the
  scene code names a planet or system; one batched before/after browser
  comparison of home gates the start of TRAPPIST-1 work.
- **One system in memory at a time.** Going to TRAPPIST-1 disposes the home
  scene (the remount); coming home rebuilds it. Beyond
  scenes still draw on top of whichever system the child left. The galaxy-map
  texture loads when the map opens and is freed when it closes.
- Effects use `solarModules.js` (`update`, `resize`, `dispose`), the shared
  clock, the low tier at width <720 or coarse pointer, and calm reduced motion.
- Three.js and its add-ons only; no R3F, no physics engine.
- _(My call.)_ **Changing system resets session play** — flight-clue run and
  badges, tour position, orbit. Page-level preferences (My view settings,
  mutes, camera view) carry over.
- _(My call.)_ **Safety net for home:** before moving any home code, add
  characterisation tests around what moves (planet data, free flight against
  home bodies, tour order, clue deck, toolbar contents). One batched browser
  comparison of home before/after is the acceptance gate.
- _(My call.)_ The galaxy art is NASA/JPL-Caltech/R. Hurt (SSC-Caltech)'s
  Milky Way illustration as a texture of at most 4096px (2048px on the low
  tier). If its usage terms don't allow this, stop and ask the owner before
  substituting anything.

## Delivery slices

Each slice ends with lint, full tests and build passing, and leaves home
working exactly as before.

1. **Foundations** — definition format, registry, shared test suite and the
   test-only system; home data moved into the home definition; shared
   modules take a definition (free flight's Earth lookup and "Back to Earth"
   gone). No visible change at home.
2. **TRAPPIST-1** — definition, the scene rendering it, cards, tour, Fly the rocket,
   clues, birthday, search, My view, arrival welcome. Reachable only by an
   adult-only URL switch until slice 3.
3. **Travel** — the trip (flown, autopilot, Home), warning and turn back,
   signposts, Beyond returning to the system left, the toolbar in both
   systems.
4. **Galaxy map** — both levels, neighbourhood close-up, cards, Jump there,
   Go home, Space ripples spot, look-don't-land galaxies.
5. **Write-up** — the `add-star-system` skill, `SOLAR_SYSTEM_IDEAS.md`
   (#108/#109 statuses, five-button rule removed), `PROJECT_KNOWLEDGE.md`,
   credits.

### Suggested models

Agreed with the owner (2026-10-26). The build plan repeats this, and any
helper agents follow it. The step-by-step plan itself: **Opus, high effort**
(a planning miss carries into every slice; max effort adds cost without much
gain because the design settles the hard decisions).

| Work                                                                                | Model                         |
| ----------------------------------------------------------------------------------- | ----------------------------- |
| Slice 1, foundations (moving home's data out, shared features reading a definition) | Opus: highest risk to home    |
| Slice 3, travel (trip, turn back, signposts, Home button)                           | Opus: tricky timing and state |
| Slice 2, TRAPPIST-1 content (facts, cards, clues, tour, looks)                      | Sonnet                        |
| Slice 4, galaxy map                                                                 | Sonnet, with an Opus review   |
| Slice 5, the guide and docs                                                         | Sonnet                        |
| Checking facts against the NASA Exoplanet Archive, searching the code               | Haiku                         |

A session cannot switch its own model; the owner changes it with `/model`.
At most two helper agents at once (project rule).

## Rules carried over

- Ages 6–8: 48px targets, read-aloud, forgiving play, both themes for
  overlays (the scene stays night). The navbar mute governs read-aloud.
- True science, honestly labelled: compressed scales, sped-up time and
  travel, artist's-impression looks, "scientists think" where not settled.
- Curriculum progress and `dl.solarMissions` are untouched. Nothing new is
  stored.
- Credits: the NASA Milky Way illustration and any other image are credited
  on `/credits`; confirm usage terms before shipping.

## Proving it works

Lint, full tests and build pass. Unit tests: the shared definition suite
(every system plus the test-only one), the TRAPPIST-1 clue deck, trip timing
(≤10 s, both directions, warning, turn back), signpost directions from real
positions, the registry. Component tests: map navigation (levels,
look-don't-land, Jump there, Go home), toolbars in both systems, the Home
button, Back to start, the arrival welcome and mute. One batched browser pass
for what jsdom can't show — the 3D map, flight in TRAPPIST-1, the trip,
signposts, the six-button toolbar — at 1280×900, 390×844 and 844×390 in both
themes. Physical-device and child checks stay open and are reported as open.

## Left to the builder

Extraction beyond what's listed; the system scene's internals; map depth
technique and the neighbourhood close-up; planet looks; TRAPPIST-1's scene
scale and time scale; tour, clue and welcome wording; badge thresholds;
turn-back detection; extra card activities; flare effect; neighbour-galaxy
list and arrangement; how the toolbar fits at 390px.
