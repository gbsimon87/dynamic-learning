# Constellations in the Solar System — Stage One: SVG Star Chart

Date: 2026-09-21
Status: implemented; catalogue expansion approved 2026-09-21

> **Catalogue expansion (2026-09-21):** A later product decision supersedes the
> one-constellation scope below. The explorer now includes a recognisable full
> Great Bear figure for Ursa Major plus Ursa Minor, Cassiopeia, Cygnus and Orion.
> Minor stars may set `label: false` to prevent crowded charts. Coordinates and
> magnitudes come from HYG v4.1, western line figures follow Stellarium's western
> sky culture, and right-ascension centring uses a circular mean so figures that
> cross 0h/24h project correctly. The original stage-one detail is retained
> below as the record of the initial implementation.

## Problem

`SolarSystem.jsx` teaches the planets well — a guided tour flies the camera to
each body and reads a narration over an info card. It teaches nothing about the
sky those planets sit in. Children who can name all eight planets still cannot
point at a star pattern and name it.

We want a Constellations feature that works like the Tour: step forwards and
backwards through a list, each stop showing the pattern, its name, a
child-friendly description and a few facts.

Two things constrain how we build it. First, the feature must stay trivially
expandable — it began with one constellation and can grow to a dozen. Second,
`SolarSystem.jsx` is already 1808 lines wrapped around a single `useEffect`, and
adding a third mode inline would make that worse.

## Approach: staged, one source of truth

The obvious build is a real celestial sphere in the Three.js scene. We are not
building that first. A handful of faint dots on a black sphere is a weak first
experience for a young child, and aiming an `OrbitControls` camera *outward* at
a point on a sphere is where the schedule risk lives.

Instead:

- **Stage one (this spec)** renders each constellation as an SVG star chart in a
  React overlay. No Three.js changes at all.
- **Stage two (sketched at the end, not built)** adds the celestial sphere and a
  "find it in the real sky" camera flight.

The two stages share one data file holding **real J2000 right ascension and
declination**. Stage one projects those coordinates to 2D; stage two converts the
same numbers to unit vectors. Hand-drawn x/y coordinates would have made stage
one marginally simpler and stage two a rewrite.

## Non-goals

- Any quiz, score or progress tracking. This is an explorer, not a challenge.
- Real-time sky positions, precession, or the observer's latitude and date.
- Any change to the meteor experiment, the planet tour, search, or the
  Tweakpane controls beyond the mode-state refactor described in section 5.

## 1. Data — `constellations.js`

New file beside `moonFacts.js`, following its doc-comment convention. Exports
`constellations`, an array whose order is the browse order.

```js
{
  id: "ursa-major",
  name: "Ursa Major",
  alsoKnownAs: "The Great Bear · The Plough · The Big Dipper",
  description: "<2 sentences, child-friendly>",
  narration: "<spoken text>",
  facts: [ /* 4-5 strings, same register as planetData.facts */ ],
  stars: [ { id, name, raHours, decDeg, magnitude }, … ],
  lines: [ ["alkaid", "mizar"], … ],   // pairs of star ids
}
```

`lines` holds star **ids**, not indices, so reordering `stars` cannot silently
redraw the figure.

### Ursa Major

The seven Plough stars only, not the full ~20-star constellation. The bear
outline is unrecognisable to a child; the saucepan is instant. That the seven are
part of something larger becomes the first fact rather than a drawing problem.

| id | Name | RA (hours, J2000) | Dec (degrees, J2000) | Magnitude |
|---|---|---|---|---|
| `dubhe` | Dubhe | 11.06213 | +61.75103 | 1.79 |
| `merak` | Merak | 11.03069 | +56.38242 | 2.37 |
| `phecda` | Phecda | 11.89718 | +53.69475 | 2.44 |
| `megrez` | Megrez | 12.25710 | +57.03261 | 3.31 |
| `alioth` | Alioth | 12.90049 | +55.95983 | 1.77 |
| `mizar` | Mizar | 13.39876 | +54.92536 | 2.23 |
| `alkaid` | Alkaid | 13.79234 | +49.31328 | 1.86 |

Seven segments — the bowl closed, the handle attached at Megrez:

```
dubhe–merak, merak–phecda, phecda–megrez, megrez–dubhe    (bowl)
megrez–alioth, alioth–mizar, mizar–alkaid                 (handle)
```

Description: *"Ursa Major is one of the easiest star patterns to spot — seven
bright stars that look like a giant saucepan. It is part of a much bigger
constellation that people have imagined as a great bear for thousands of years."*

Narration: *"Ursa Major. Seven bright stars make a shape like a giant saucepan,
high in the northern sky. Follow the two stars at the end of the pan and they
point you straight to the North Star."*

Facts:

1. The seven bright stars of the Plough are only part of a much larger
   constellation called the Great Bear.
2. Dubhe and Merak are called the Pointers — draw a line through them and it
   takes you straight to the North Star.
3. Mizar, in the handle, has a tiny companion star called Alcor. People once
   used the pair to test their eyesight.
4. From the UK, Ursa Major never sets. It circles the North Star all year round.
5. The stars only look close together. Dubhe is more than twice as far from us
   as Megrez, even though they sit side by side in the bowl.

## 2. Projection — `constellationProjection.js`

Pure module, no React and no Three.js, tested with `node --test` like
`solarSearch.js`. Two exports.

**`raDecToUnitVector({ raHours, decDeg })`** → `{ x, y, z }` on the unit sphere.
Unused in stage one; it is the seam stage two plugs into, and it costs four lines
now against a data-model argument later.

**`projectConstellation(stars)`** → `{ points, width, height }`, where each point
is `{ id, x, y, radius }`.

The maths is a standard gnomonic (tangent-plane) projection about the mean
position of the stars:

```
cos c = sin δ₀ sin δ + cos δ₀ cos δ cos(α − α₀)
ξ     = cos δ sin(α − α₀) / cos c                        (east)
η     = (cos δ₀ sin δ − sin δ₀ cos δ cos(α − α₀)) / cos c  (north)
```

Chart coordinates are `x = −ξ` and `y = −η`. Both negations matter. Negating ξ
puts east on the left, which is how the sky looks from underneath it and how
every star chart is drawn — it places the Plough's bowl on the right and the
handle trailing left. Negating η turns north up, because SVG's y axis grows
downward.

The projected cloud is then scaled to fit a padded box, **preserving aspect
ratio**, and `width`/`height` are returned for the caller's `viewBox`. Ursa Major
comes out roughly 2:1; stretching it to a square would destroy the shape a child
is meant to recognise.

`radius` is derived from magnitude on a fixed scale — brighter stars are larger —
rather than normalised per constellation, so a faint constellation still reads as
faint once there are several.

### Tests (`constellationProjection.test.js`)

Written first. They assert structural truths, never pixel values:

- `raDecToUnitVector` returns unit-length vectors; Dec +90° maps to the pole.
- Seven points come back for Ursa Major, all inside the returned box.
- Alkaid is leftmost (minimum x); Merak is rightmost (maximum x).
- Dubhe is topmost (minimum y); Alkaid is bottom-most (maximum y).
- Aspect ratio `width / height` falls between 1.7 and 2.0. (The reference
  implementation yields 1.816 for Ursa Major at the default padding.)
- Every id in `lines` resolves to a star in `stars` — a data-integrity test that
  runs over the whole `constellations` array, so a typo in a future entry fails
  the suite instead of silently dropping a segment.

## 3. Presentation — `ConstellationCard.jsx` + `ConstellationCard.css`

A presentational component. It takes the constellation, the index, the total, the
muted flag and callbacks; it holds no data of its own.

The chart is inline SVG with a `viewBox` from `projectConstellation`, so it
scales to any width without media queries. A `<circle>` per star with a soft
radial glow, a `<line>` per segment.

On entry the segments draw themselves in — `stroke-dasharray` and
`stroke-dashoffset` animated over roughly 900ms — and the star names fade in
after. That draw-in is the moment that sells the feature to a child, and it is
the one piece of motion worth spending effort on. Under
`prefers-reduced-motion: reduce` the figure appears complete, matching how
`SolarSystem.css` already suppresses `solar-card-enter`.

Layout is its own overlay panel rather than a squeeze into `solar-info-card`,
because the chart needs real estate the side panel does not have: stacked on
mobile (chart, name, description, facts, controls), two columns from 720px with
the chart beside the text. The glass-and-gradient treatment, the border radius
and the button styling are lifted from `.solar-info-card` and
`.solar-tour-controls` so it reads as the same product. Class prefix
`solar-constellation`, matching the existing BEM-ish convention.

Controls mirror the tour exactly: `← Previous` / `Next →`, Replay narration,
Mute, and Exit. With one constellation both navigation buttons render disabled
and the eyebrow reads "Constellation 1 of 1". Ugly for exactly as long as the
list has one entry, and correct without changes forever after.

## 4. Narration — `narration.js`

The tour's `speakPlanet` hard-codes a planet into its utterance. Extract the
speech-synthesis body into a small module exporting `speak(text, options)` and
`stopNarration()`, keeping the existing `en-GB` / rate 0.95 / pitch 1.02 voice
settings as defaults. `speakPlanet` becomes a one-line caller.

Mute state stays local to each mode — the tour keeps its scene-local `tourMuted`,
constellations get their own React state. A shared mute flag would couple two
features that have no reason to know about each other.

Both modes must call `stopNarration()` on exit and on unmount. Stage one's card
is a React component, so its cleanup is a `useEffect` return in
`ConstellationCard`, not something the scene effect can do for it.

## 5. Wiring — `SolarSystem.jsx`

Stage one adds no Three.js code. The constellation card is pure React rendered
alongside the canvas.

**Mode state.** `mode` is **derived, never stored**:

```js
const mode = meteorActive ? "meteor"
    : tourState.active ? "tour"
    : constellationState.active ? "constellations"
    : "idle";
```

An earlier draft of this spec stored `mode` in its own `useState` and set it
alongside `meteorPhase` and `tourState` at every entry and exit point. That is
duplicated state with five sync points and no way to notice when they drift.
Deriving it adds exactly one new piece of state — `constellationState` — and
makes desync unrepresentable.

The JSX guards then collapse:

```
!meteorActive && !tourState.active              →  mode === "idle"
!meteorActive && !selectedPlanet && !tour…      →  mode === "idle" && !selectedPlanet
!meteorActive && selectedPlanet                 →  (mode === "idle" || mode === "tour") && selectedPlanet
!meteorActive                    (drag hint)    →  mode === "idle" || mode === "tour"
```

The last two matter: the info card and the drag hint are currently visible
*during* the tour, so they must not collapse to `mode === "idle"` — that would
silently regress the tour. Only the constellation card and the launch buttons
are idle-only.

This is a refactor of working code and it is worth doing now. There are already
two modes and four guarded regions; a third mode without it means every overlay
grows another `&&`, and stage two would add a fourth.

**Meteor exclusivity.** The experiment control strip renders in every mode, so
the "Launch meteor" button also gains `mode === "constellations"` to its
`disabled` condition. Without it, a meteor can be launched behind an open
constellation card.

**Entry point.** An "Explore constellations" button beside the existing
`solar-tour-launch`, same visual treatment, visible only when `mode === "idle"`.

**Backdrop.** A `.solar-system--dimmed` class on the canvas while the card is
open, so the chart reads clearly against a running scene. The scene keeps
animating behind it — freezing it would look broken.

**Exclusivity.** Entering constellations mode stops the tour and its narration if
one is running, exactly as `focusEntry` already calls `stopTour()`.

## 6. Files

| File | Change |
|---|---|
| `src/pages/skills/geography/constellations.js` | new — data |
| `src/pages/skills/geography/constellations.test.js` | new — data integrity, runs over every entry |
| `src/pages/skills/geography/constellationProjection.js` | new — pure projection |
| `src/pages/skills/geography/constellationProjection.test.js` | new — `node --test` |
| `src/pages/skills/geography/ConstellationCard.jsx` | new — presentation |
| `src/pages/skills/geography/ConstellationCard.css` | new — styles |
| `src/pages/skills/geography/narration.js` | new — `speak` / `stopNarration` |
| `src/pages/skills/geography/SolarSystem.jsx` | edit — `mode` state, entry button, render card, `speakPlanet` delegates |
| `src/pages/skills/geography/SolarSystem.css` | edit — dimmed canvas, entry button |

## 7. Verification

Automated, via `npm test`: the projection and data-integrity tests above. The
existing suite must stay green — the `mode` refactor touches tour and meteor
code paths that have no automated coverage, so their verification is manual.

Manual, in the browser, at both mobile and desktop widths:

1. Tour still starts, steps, narrates, mutes and exits.
2. Meteor still launches and resets, and its controls still hide the toolbar.
3. Constellations entry button appears only when idle; entering hides the
   toolbar, tour button and info card.
4. The Plough is recognisable — bowl right, handle trailing left and bending
   down at Alkaid.
5. Lines draw in on entry; nothing animates under reduced motion.
6. Narration plays on entry, replays on demand, stops on mute and on exit.
7. Exiting restores the idle view with the scene still running.

## 8. Stage two — sketch, not in scope

`constellationSky.js` following the `meteorExperiment.js` module shape —
`enter / update / resize / exit / dispose / isActive` — building a `THREE.Group`
on a celestial sphere at radius ≈2700 from the same RA/Dec via
`raDecToUnitVector`: `Points` for stars, `LineSegments` for the figure, a
`createLabel()` sprite for the name.

Known problems to solve then, recorded now so stage one does not accidentally
foreclose them: the camera must frame a point *outward* on the sphere within
`controls.minDistance` 1.5 / `maxDistance` 3000 and a far plane of 5000; the
figure needs `depthTest: false` and a `renderOrder` so planets do not slice
through it; and the existing random star field at radius 3000 will compete
visually, so it wants dimming while the mode is active.

The card gains a "Find it in the real sky →" button. Nothing in stage one blocks
any of this.
