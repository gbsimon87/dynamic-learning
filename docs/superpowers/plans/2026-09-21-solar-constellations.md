# Constellations (Stage One) Implementation Plan

> **Post-plan expansion (2026-09-21):** The completed one-constellation stage
> was subsequently expanded to five. Ursa Major now draws the recognisable
> Great Bear beyond the seven-star Plough, joined by Ursa Minor, Cassiopeia,
> Cygnus and Orion. Dense figures support selectively hidden labels, and the
> projection uses circular right-ascension centring across the 0h/24h seam.
> The task steps below remain the historical implementation record.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking — tick each box as you complete it, and fill in the Progress table below.

**Goal:** Let a child step through constellations in the Solar System page, each one shown as an animated SVG star chart with its name, a short description, facts and spoken narration.

**Architecture:** Real J2000 sky coordinates live in a data file. A pure module projects them to 2D chart coordinates. A presentational React component draws them as SVG over the (dimmed) Three.js canvas. No Three.js code changes in this stage, and no new dependencies.

**Tech Stack:** React 19, plain CSS, inline SVG, `node --test` (via `npm test`), existing Web Speech API usage.

**Spec:** `docs/superpowers/specs/2026-09-21-solar-constellations-design.md` — read it before Task 1. The plan tells you *what to type*; the spec tells you *why*, and it is the tiebreaker if the two ever disagree.

## Progress

| Task | Description | Status |
|---|---|---|
| 1 | Projection module + tests | ☑ done |
| 2 | Constellation data + integrity test | ☑ done |
| 3 | Shared narration module | ☑ done |
| 4 | `ConstellationCard` component + CSS | ☑ done |
| 5 | Wire into `SolarSystem.jsx` | ☑ done |
| 6 | Manual browser verification | ☑ done |

Status values: ☐ not started · ◐ in progress · ☑ done · ⚠ blocked (say why).

## Global Constraints

- **No new npm dependencies.** Nothing gets added to `package.json`. If you think you need a library, you have misread the plan.
- **No Three.js changes in this stage.** Do not touch the big `useEffect` in `SolarSystem.jsx` except for the three specific edits named in Task 3 and Task 5.
- **Indentation:** 4 spaces in `.jsx` and in `src/pages/skills/geography/*.js` data/logic modules; 2 spaces in `.css` and in `*.test.js`. Match the file you are editing.
- **CSS class prefix:** `solar-constellation`, BEM-ish, matching `solar-info-card` / `solar-tour-controls`.
- **Copy register:** written for a 5–8 year old. Short sentences, concrete comparisons, no jargon.
- **Test command:** `npm test` (which is `node --test`). Baseline before you start: **544 tests, 543 pass, 1 skipped, 0 fail.** Your changes must never reduce the pass count.
- **Commits:** the user gates commits in this repo. Each task ends with a commit step — **run it only if the user has told you to commit.** Otherwise stop at the passing test and report.

---

### Task 1: Projection module

Converts sky coordinates (right ascension / declination) into flat chart coordinates a `<svg>` can draw. Pure functions, no React, no Three.js.

**Files:**
- Create: `src/pages/skills/geography/constellationProjection.js`
- Test: `src/pages/skills/geography/constellationProjection.test.js`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `raDecToUnitVector({ raHours, decDeg })` → `{ x: number, y: number, z: number }`, length 1.
  - `projectConstellation(stars, options?)` → `{ points: { id, x, y, radius }[], width: number, height: number }`. `stars` is an array of `{ id, name, raHours, decDeg, magnitude }`. `options` is `{ padding = 8, box = 100 }`.

**Background you need (read this, it prevents the two likely mistakes):**

Right ascension is an angle measured in *hours* (0–24), not degrees — multiply by 15 to get degrees. Declination is already in degrees.

The projection is *gnomonic*: imagine touching a flat sheet of paper to the sphere of the sky at the middle of the constellation, then shining a light from the centre of the sphere so the stars cast shadows onto the paper. The standard formulas, where (α₀, δ₀) is the touch point and (α, δ) is a star:

```
cos c = sin δ₀ · sin δ + cos δ₀ · cos δ · cos(α − α₀)
ξ     = cos δ · sin(α − α₀) / cos c                              (how far east)
η     = (cos δ₀ · sin δ − sin δ₀ · cos δ · cos(α − α₀)) / cos c  (how far north)
```

Chart `x` is `−ξ` and chart `y` is `−η`. **Both minus signs are deliberate — do not "fix" them.** Negating ξ puts east on the left, which is how the sky looks when you stand under it and how every star chart is drawn. Negating η puts north at the top, because SVG's y axis grows *downward*.

- [x] **Step 1: Write the failing test**

Create `src/pages/skills/geography/constellationProjection.test.js`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { raDecToUnitVector, projectConstellation } from "./constellationProjection.js";

// The seven Plough stars, J2000. Kept inline so this file tests the maths
// rather than whatever constellations.js happens to contain.
const URSA_MAJOR = [
  { id: "dubhe", name: "Dubhe", raHours: 11.06213, decDeg: 61.75103, magnitude: 1.79 },
  { id: "merak", name: "Merak", raHours: 11.03069, decDeg: 56.38242, magnitude: 2.37 },
  { id: "phecda", name: "Phecda", raHours: 11.89718, decDeg: 53.69475, magnitude: 2.44 },
  { id: "megrez", name: "Megrez", raHours: 12.25710, decDeg: 57.03261, magnitude: 3.31 },
  { id: "alioth", name: "Alioth", raHours: 12.90049, decDeg: 55.95983, magnitude: 1.77 },
  { id: "mizar", name: "Mizar", raHours: 13.39876, decDeg: 54.92536, magnitude: 2.23 },
  { id: "alkaid", name: "Alkaid", raHours: 13.79234, decDeg: 49.31328, magnitude: 1.86 },
];

const byId = (points) => new Map(points.map((point) => [point.id, point]));
const extreme = (points, key, better) =>
  points.reduce((best, point) => (better(point[key], best[key]) ? point : best)).id;

test("raDecToUnitVector returns unit-length vectors", () => {
  for (const star of URSA_MAJOR) {
    const { x, y, z } = raDecToUnitVector(star);
    assert.ok(Math.abs(Math.hypot(x, y, z) - 1) < 1e-9, `${star.id} is not unit length`);
  }
});

test("raDecToUnitVector puts the north celestial pole on +y", () => {
  const { x, y, z } = raDecToUnitVector({ raHours: 0, decDeg: 90 });
  assert.ok(Math.abs(x) < 1e-9);
  assert.ok(Math.abs(z) < 1e-9);
  assert.ok(Math.abs(y - 1) < 1e-9);
});

test("every star is projected, inside the returned box", () => {
  const { points, width, height } = projectConstellation(URSA_MAJOR);
  assert.equal(points.length, 7);
  assert.deepEqual(
    points.map((point) => point.id).sort(),
    URSA_MAJOR.map((star) => star.id).sort(),
  );
  for (const point of points) {
    assert.ok(point.x >= 0 && point.x <= width, `${point.id} x out of box`);
    assert.ok(point.y >= 0 && point.y <= height, `${point.id} y out of box`);
  }
});

test("the Plough points the conventional way round", () => {
  const { points } = projectConstellation(URSA_MAJOR);
  // Bowl on the right, handle trailing left and dipping at its end.
  assert.equal(extreme(points, "x", (a, b) => a > b), "merak", "bowl should be rightmost");
  assert.equal(extreme(points, "x", (a, b) => a < b), "alkaid", "handle end should be leftmost");
  assert.equal(extreme(points, "y", (a, b) => a < b), "dubhe", "Dubhe should be highest");
  assert.equal(extreme(points, "y", (a, b) => a > b), "alkaid", "Alkaid should be lowest");
});

test("the chart keeps the constellation's real proportions", () => {
  const { width, height } = projectConstellation(URSA_MAJOR);
  const aspect = width / height;
  assert.ok(aspect > 1.7 && aspect < 2.0, `aspect ${aspect} is not roughly 1.8`);
});

test("brighter stars get bigger dots, on a scale shared across constellations", () => {
  const points = byId(projectConstellation(URSA_MAJOR).points);
  // Alioth (1.77) is brighter than Megrez (3.31), so it must be drawn larger.
  assert.ok(points.get("alioth").radius > points.get("megrez").radius);
  // A lone faint star must not be inflated to look bright.
  const lonely = projectConstellation([URSA_MAJOR[3]]).points[0];
  assert.ok(Math.abs(lonely.radius - points.get("megrez").radius) < 1e-9);
});

test("an empty star list degrades without throwing", () => {
  const { points, width, height } = projectConstellation([]);
  assert.deepEqual(points, []);
  assert.ok(width > 0 && height > 0);
});
```

- [x] **Step 2: Run the test and verify it fails**

```bash
npm test 2>&1 | grep -A 5 constellationProjection
```

Expected: failures reporting that `./constellationProjection.js` cannot be found. That is the correct starting state.

- [x] **Step 3: Write the implementation**

Create `src/pages/skills/geography/constellationProjection.js`:

```js
/**
 * Turns catalogue sky coordinates into things that can be drawn.
 *
 * Right ascension arrives in hours (0-24) and declination in degrees, which is
 * how star catalogues quote them. Keeping the real coordinates in the data and
 * projecting here means the same numbers can later be hung on a celestial
 * sphere in the Three.js scene without touching constellations.js.
 */

const DEG = Math.PI / 180;
const HOURS_TO_DEGREES = 15;

// Dot sizes are fixed across every constellation rather than normalised per
// constellation, so a faint pattern still reads as faint once there are several.
const BRIGHTEST_MAGNITUDE = 1.5;
const FAINTEST_MAGNITUDE = 4.5;
const LARGEST_RADIUS = 2.6;
const SMALLEST_RADIUS = 0.9;

const mean = (values) => values.reduce((total, value) => total + value, 0) / values.length;

function starRadius(magnitude) {
    // Magnitude runs backwards: smaller number means brighter star.
    const span = FAINTEST_MAGNITUDE - BRIGHTEST_MAGNITUDE;
    const t = Math.min(Math.max((magnitude - BRIGHTEST_MAGNITUDE) / span, 0), 1);
    return LARGEST_RADIUS + (SMALLEST_RADIUS - LARGEST_RADIUS) * t;
}

/** A point on the unit celestial sphere, in the scene's y-up convention. */
export function raDecToUnitVector({ raHours, decDeg }) {
    const ra = raHours * HOURS_TO_DEGREES * DEG;
    const dec = decDeg * DEG;
    const cosDec = Math.cos(dec);
    return { x: cosDec * Math.cos(ra), y: Math.sin(dec), z: cosDec * Math.sin(ra) };
}

/**
 * Gnomonic (tangent-plane) projection about the mean position of the stars,
 * scaled to fit a padded box while preserving the constellation's real
 * proportions. Returns chart coordinates ready for an SVG viewBox.
 */
export function projectConstellation(stars, { padding = 8, box = 100 } = {}) {
    if (!Array.isArray(stars) || stars.length === 0) {
        return { points: [], width: box, height: box };
    }

    const ra0 = mean(stars.map((star) => star.raHours)) * HOURS_TO_DEGREES * DEG;
    const dec0 = mean(stars.map((star) => star.decDeg)) * DEG;
    const sinDec0 = Math.sin(dec0);
    const cosDec0 = Math.cos(dec0);

    const flat = stars.map((star) => {
        const ra = star.raHours * HOURS_TO_DEGREES * DEG;
        const dec = star.decDeg * DEG;
        const deltaRa = ra - ra0;
        const cosC = sinDec0 * Math.sin(dec) + cosDec0 * Math.cos(dec) * Math.cos(deltaRa);
        const east = (Math.cos(dec) * Math.sin(deltaRa)) / cosC;
        const north = (cosDec0 * Math.sin(dec) - sinDec0 * Math.cos(dec) * Math.cos(deltaRa)) / cosC;
        // East to the left (the sky seen from underneath) and north to the top
        // (SVG's y axis grows downward). Both negations are load-bearing.
        return { id: star.id, x: -east, y: -north, magnitude: star.magnitude };
    });

    const xs = flat.map((point) => point.x);
    const ys = flat.map((point) => point.y);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const spanX = Math.max(...xs) - minX || 1;
    const spanY = Math.max(...ys) - minY || 1;
    // One scale for both axes: stretching each to fill the box would destroy
    // the shape the child is meant to recognise.
    const scale = (box - padding * 2) / Math.max(spanX, spanY);

    return {
        points: flat.map((point) => ({
            id: point.id,
            x: padding + (point.x - minX) * scale,
            y: padding + (point.y - minY) * scale,
            radius: starRadius(point.magnitude),
        })),
        width: spanX * scale + padding * 2,
        height: spanY * scale + padding * 2,
    };
}
```

- [x] **Step 4: Run the tests and verify they pass**

```bash
npm test 2>&1 | tail -10
```

Expected: `fail 0`, and the total risen from 544 to 551.

If "the Plough points the conventional way round" fails, you have dropped or added a minus sign in `flat`. Re-read the two-sentence comment above it; do not change the test.

- [x] **Step 5: Commit** *(only if the user has asked you to commit)*

```bash
git add src/pages/skills/geography/constellationProjection.js src/pages/skills/geography/constellationProjection.test.js
git commit -m "feat: project constellation sky coordinates to chart coordinates"
```

---

### Task 2: Constellation data

**Files:**
- Create: `src/pages/skills/geography/constellations.js`
- Test: `src/pages/skills/geography/constellations.test.js`

**Interfaces:**
- Consumes: `projectConstellation` from Task 1 (in the test only).
- Produces: `constellations` — an array of
  `{ id, name, alsoKnownAs, description, narration, facts: string[], stars: { id, name, raHours, decDeg, magnitude }[], lines: [string, string][] }`.
  Array order is browse order. `lines` holds **star ids, not array indices**, so reordering `stars` cannot silently redraw the figure.

- [x] **Step 1: Write the failing test**

Create `src/pages/skills/geography/constellations.test.js`. These are data-integrity tests: they run over the whole array, so a typo in a constellation added next year fails the suite instead of silently dropping a line from the drawing.

```js
import test from "node:test";
import assert from "node:assert/strict";
import { constellations } from "./constellations.js";
import { projectConstellation } from "./constellationProjection.js";

test("every constellation carries the fields the card renders", () => {
  assert.ok(constellations.length > 0);
  for (const item of constellations) {
    assert.equal(typeof item.id, "string", "id must be a string");
    assert.ok(item.id.length > 0, "id must not be empty");
    assert.ok(item.name?.length > 0, `${item.id} needs a name`);
    assert.ok(item.alsoKnownAs?.length > 0, `${item.id} needs alsoKnownAs`);
    assert.ok(item.description?.length > 0, `${item.id} needs a description`);
    assert.ok(item.narration?.length > 0, `${item.id} needs narration`);
    assert.ok(Array.isArray(item.facts) && item.facts.length >= 3, `${item.id} needs 3+ facts`);
  }
});

test("constellation ids are unique", () => {
  const ids = constellations.map((item) => item.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("every line joins two stars that exist in the same constellation", () => {
  for (const item of constellations) {
    const known = new Set(item.stars.map((star) => star.id));
    assert.equal(known.size, item.stars.length, `${item.id} has duplicate star ids`);
    for (const [from, to] of item.lines) {
      assert.ok(known.has(from), `${item.id}: line references unknown star "${from}"`);
      assert.ok(known.has(to), `${item.id}: line references unknown star "${to}"`);
      assert.notEqual(from, to, `${item.id}: line joins "${from}" to itself`);
    }
  }
});

test("every star carries drawable coordinates", () => {
  for (const item of constellations) {
    for (const star of item.stars) {
      assert.ok(star.name?.length > 0, `${item.id}/${star.id} needs a name`);
      assert.ok(star.raHours >= 0 && star.raHours < 24, `${item.id}/${star.id} raHours out of range`);
      assert.ok(star.decDeg >= -90 && star.decDeg <= 90, `${item.id}/${star.id} decDeg out of range`);
      assert.equal(typeof star.magnitude, "number", `${item.id}/${star.id} needs a magnitude`);
    }
  }
});

test("every constellation projects to a drawable chart", () => {
  for (const item of constellations) {
    const { points, width, height } = projectConstellation(item.stars);
    assert.equal(points.length, item.stars.length, `${item.id} lost stars in projection`);
    assert.ok(width > 0 && height > 0, `${item.id} projected to an empty box`);
    for (const point of points) {
      assert.ok(Number.isFinite(point.x) && Number.isFinite(point.y), `${item.id}/${point.id} is not finite`);
    }
  }
});

test("Ursa Major ships with the seven Plough stars and a closed bowl", () => {
  const ursa = constellations.find((item) => item.id === "ursa-major");
  assert.ok(ursa, "ursa-major must be present");
  assert.deepEqual(
    ursa.stars.map((star) => star.id).sort(),
    ["alioth", "alkaid", "dubhe", "megrez", "merak", "mizar", "phecda"],
  );
  assert.equal(ursa.lines.length, 7, "four bowl segments plus three handle segments");
});
```

- [x] **Step 2: Run the test and verify it fails**

```bash
npm test 2>&1 | grep -A 5 constellations.test
```

Expected: cannot find `./constellations.js`.

- [x] **Step 3: Write the data file**

Create `src/pages/skills/geography/constellations.js`. Copy the coordinates exactly — they are J2000 catalogue values, and a transcription slip will bend the shape without failing any test.

```js
/**
 * Constellations for the star explorer, in browse order.
 *
 * Coordinates are real J2000 right ascension (hours) and declination (degrees),
 * not hand-drawn chart positions, so constellationProjection.js can both draw
 * the flat chart today and place these stars on a celestial sphere later.
 *
 * lines  — pairs of star ids, so reordering `stars` cannot redraw the figure
 * facts  — the "Did you know?" list, same register as planetData.facts
 */
export const constellations = [
    {
        id: "ursa-major",
        name: "Ursa Major",
        alsoKnownAs: "The Great Bear · The Plough · The Big Dipper",
        description:
            "Ursa Major is one of the easiest star patterns to spot — seven bright stars that look like a giant saucepan. It is part of a much bigger constellation that people have imagined as a great bear for thousands of years.",
        narration:
            "Ursa Major. Seven bright stars make a shape like a giant saucepan, high in the northern sky. Follow the two stars at the end of the pan and they point you straight to the North Star.",
        facts: [
            "The seven bright stars of the Plough are only part of a much larger constellation called the Great Bear.",
            "Dubhe and Merak are called the Pointers — draw a line through them and it takes you straight to the North Star.",
            "Mizar, in the handle, has a tiny companion star called Alcor. People once used the pair to test their eyesight.",
            "From the UK, Ursa Major never sets. It circles the North Star all year round.",
            "The stars only look close together. Dubhe is more than twice as far from us as Megrez, even though they sit side by side in the bowl.",
        ],
        // The bowl, from its outer lip round to the handle join.
        stars: [
            { id: "dubhe", name: "Dubhe", raHours: 11.06213, decDeg: 61.75103, magnitude: 1.79 },
            { id: "merak", name: "Merak", raHours: 11.03069, decDeg: 56.38242, magnitude: 2.37 },
            { id: "phecda", name: "Phecda", raHours: 11.89718, decDeg: 53.69475, magnitude: 2.44 },
            { id: "megrez", name: "Megrez", raHours: 12.25710, decDeg: 57.03261, magnitude: 3.31 },
            { id: "alioth", name: "Alioth", raHours: 12.90049, decDeg: 55.95983, magnitude: 1.77 },
            { id: "mizar", name: "Mizar", raHours: 13.39876, decDeg: 54.92536, magnitude: 2.23 },
            { id: "alkaid", name: "Alkaid", raHours: 13.79234, decDeg: 49.31328, magnitude: 1.86 },
        ],
        lines: [
            ["dubhe", "merak"],
            ["merak", "phecda"],
            ["phecda", "megrez"],
            ["megrez", "dubhe"],
            ["megrez", "alioth"],
            ["alioth", "mizar"],
            ["mizar", "alkaid"],
        ],
    },
];
```

- [x] **Step 4: Run the tests and verify they pass**

```bash
npm test 2>&1 | tail -10
```

Expected: `fail 0`, total now 557.

- [x] **Step 5: Commit** *(only if the user has asked you to commit)*

```bash
git add src/pages/skills/geography/constellations.js src/pages/skills/geography/constellations.test.js
git commit -m "feat: add Ursa Major constellation data"
```

---

### Task 3: Shared narration module

The tour's narration helper hard-codes a planet into its utterance, so the constellation card cannot reuse it. Lift the speech-synthesis body out; leave the planet-specific string behind.

**Files:**
- Create: `src/pages/skills/geography/narration.js`
- Modify: `src/pages/skills/geography/SolarSystem.jsx` (three edits, all inside the big `useEffect`)

**Interfaces:**
- Consumes: nothing.
- Produces: `speak(text, options?)`, `stopNarration()`, `isNarrationSupported()`.

There is no automated test here. `speechSynthesis` is a browser API with no Node equivalent, and wrapping it in a fake to assert "we called the thing we called" would test nothing. This task is verified by the tour still speaking, which is step 5.

- [x] **Step 1: Create the module**

Create `src/pages/skills/geography/narration.js`:

```js
/**
 * Shared speech-synthesis helpers for the Solar System page.
 *
 * The planet tour and the constellation explorer both read short pieces of copy
 * in the same voice. Neither owns the browser's single speech queue, and mute
 * stays with each caller rather than living here, so the two features never
 * need to know about one another.
 */

const VOICE = { lang: "en-GB", rate: 0.95, pitch: 1.02 };

export function isNarrationSupported() {
    return typeof window !== "undefined"
        && "speechSynthesis" in window
        && "SpeechSynthesisUtterance" in window;
}

export function stopNarration() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }
}

export function speak(text, options = {}) {
    if (!isNarrationSupported() || !text) return;
    stopNarration();
    const utterance = new SpeechSynthesisUtterance(text);
    Object.assign(utterance, VOICE, options);
    window.speechSynthesis.speak(utterance);
}
```

- [x] **Step 2: Import it in `SolarSystem.jsx`**

Find the import block at the top of `src/pages/skills/geography/SolarSystem.jsx`. After the line:

```js
import { createMeteorExperiment } from "./meteorExperiment.js";
```

add:

```js
import { speak, stopNarration } from "./narration.js";
```

- [x] **Step 3: Delete the local `stopNarration` and rewrite `speakPlanet`**

Around line 978 there is a local `function stopNarration()` — **it must be deleted**, or it will shadow the import and the new module will never run. Replace this entire block:

```js
        function stopNarration() {
            if ("speechSynthesis" in window) window.speechSynthesis.cancel();
        }

        function speakPlanet(planet) {
            if (tourMuted || !("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) return;
            stopNarration();
            const utterance = new SpeechSynthesisUtterance(`${planet.name}. ${planet.tourNarration}`);
            utterance.lang = "en-GB";
            utterance.rate = 0.95;
            utterance.pitch = 1.02;
            window.speechSynthesis.speak(utterance);
        }
```

with just this:

```js
        function speakPlanet(planet) {
            if (tourMuted) return;
            speak(`${planet.name}. ${planet.tourNarration}`);
        }
```

Every other `stopNarration()` call site in the file stays exactly as it is — they now resolve to the import.

- [x] **Step 4: Verify nothing broke**

```bash
npm test 2>&1 | tail -6 && npx eslint src/pages/skills/geography/SolarSystem.jsx src/pages/skills/geography/narration.js
```

Expected: `fail 0` (still 557), and eslint clean. A `no-unused-vars` or "already declared" error here means you left the old local function in place.

- [x] **Step 5: Verify the tour still speaks**

```bash
npm run dev
```

Open the Solar System page, click **Tour the Solar System**, and confirm Mercury's narration is spoken aloud and that **Mute** silences it. This is the only check that the extraction worked; do not skip it.

- [x] **Step 6: Commit** *(only if the user has asked you to commit)*

```bash
git add src/pages/skills/geography/narration.js src/pages/skills/geography/SolarSystem.jsx
git commit -m "refactor: extract shared narration helpers from the planet tour"
```

---

### Task 4: `ConstellationCard` component

A presentational component: it receives a constellation and callbacks, and owns no data of its own beyond the narration effect.

**Files:**
- Create: `src/pages/skills/geography/ConstellationCard.jsx`
- Create: `src/pages/skills/geography/ConstellationCard.css`

**Interfaces:**
- Consumes: `projectConstellation` (Task 1), `speak` / `stopNarration` (Task 3).
- Produces: default export `ConstellationCard`, taking props
  `{ constellation, index, total, muted, onPrevious, onNext, onToggleMute, onExit }`.
  `constellation` is one element of the `constellations` array. `index` is 0-based.

- [x] **Step 1: Write the component**

Create `src/pages/skills/geography/ConstellationCard.jsx`:

```jsx
import React, { useEffect, useMemo } from "react";
import { projectConstellation } from "./constellationProjection.js";
import { speak, stopNarration } from "./narration.js";
import "./ConstellationCard.css";

// Each segment starts drawing shortly after the one before it, so the figure
// assembles itself rather than appearing all at once.
const LINE_STAGGER_MS = 90;
const STARS_DELAY_PADDING_MS = 200;

export default function ConstellationCard({
    constellation,
    index,
    total,
    muted,
    onPrevious,
    onNext,
    onToggleMute,
    onExit,
}) {
    const chart = useMemo(() => projectConstellation(constellation.stars), [constellation]);
    const pointById = useMemo(
        () => new Map(chart.points.map((point) => [point.id, point])),
        [chart],
    );
    const nameById = useMemo(
        () => new Map(constellation.stars.map((star) => [star.id, star.name])),
        [constellation],
    );

    const spokenText = `${constellation.name}. ${constellation.narration}`;

    useEffect(() => {
        if (muted) {
            stopNarration();
            return undefined;
        }
        speak(spokenText);
        // Covers stepping to another constellation, muting, and unmounting —
        // the card is the only thing that can stop its own narration.
        return stopNarration;
    }, [spokenText, muted]);

    const starsDelayMs = constellation.lines.length * LINE_STAGGER_MS + STARS_DELAY_PADDING_MS;

    return (
        <aside className="solar-constellation" aria-label={`${constellation.name} information`}>
            <div className="solar-constellation__chart-pane">
                <svg
                    className="solar-constellation__chart"
                    viewBox={`0 0 ${chart.width} ${chart.height}`}
                    role="img"
                    aria-label={`Star chart of ${constellation.name}`}
                >
                    <defs>
                        <radialGradient id="solar-constellation-glow">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
                            <stop offset="100%" stopColor="#9fd0ff" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <g className="solar-constellation__lines">
                        {constellation.lines.map(([fromId, toId], lineIndex) => {
                            const from = pointById.get(fromId);
                            const to = pointById.get(toId);
                            if (!from || !to) return null;
                            return (
                                <line
                                    key={`${fromId}-${toId}`}
                                    x1={from.x}
                                    y1={from.y}
                                    x2={to.x}
                                    y2={to.y}
                                    pathLength="1"
                                    style={{ animationDelay: `${lineIndex * LINE_STAGGER_MS}ms` }}
                                />
                            );
                        })}
                    </g>
                    <g
                        className="solar-constellation__stars"
                        style={{ animationDelay: `${starsDelayMs}ms` }}
                    >
                        {chart.points.map((point) => (
                            <g key={point.id}>
                                <circle
                                    className="solar-constellation__halo"
                                    cx={point.x}
                                    cy={point.y}
                                    r={point.radius * 3}
                                    fill="url(#solar-constellation-glow)"
                                />
                                <circle
                                    className="solar-constellation__star"
                                    cx={point.x}
                                    cy={point.y}
                                    r={point.radius}
                                />
                                <text
                                    className="solar-constellation__star-name"
                                    x={point.x}
                                    y={point.y - point.radius - 1.8}
                                    textAnchor="middle"
                                >
                                    {nameById.get(point.id)}
                                </text>
                            </g>
                        ))}
                    </g>
                </svg>
            </div>

            <div className="solar-constellation__body">
                <div className="solar-constellation__header">
                    <div>
                        <span className="solar-constellation__eyebrow">
                            Constellation {index + 1} of {total}
                        </span>
                        <h2>{constellation.name}</h2>
                        <p className="solar-constellation__aka">{constellation.alsoKnownAs}</p>
                    </div>
                    <button
                        type="button"
                        className="solar-constellation__close"
                        aria-label="Close constellations"
                        onClick={onExit}
                    >
                        ×
                    </button>
                </div>

                <div className="solar-constellation__scroll">
                    <p className="solar-constellation__description">{constellation.description}</p>
                    <h3>Did you know?</h3>
                    <ul>
                        {constellation.facts.map((fact) => <li key={fact}>{fact}</li>)}
                    </ul>
                </div>

                <div className="solar-tour-controls" aria-label="Constellation navigation">
                    <div className="solar-tour-controls__audio">
                        <button type="button" onClick={() => speak(spokenText)} disabled={muted}>
                            Replay narration
                        </button>
                        <button type="button" onClick={onToggleMute}>
                            {muted ? "Turn sound on" : "Mute"}
                        </button>
                    </div>
                    <div className="solar-tour-controls__nav">
                        <button type="button" onClick={onPrevious} disabled={index === 0}>
                            ← Previous
                        </button>
                        <button
                            type="button"
                            className="solar-tour-controls__next"
                            onClick={onNext}
                            disabled={index >= total - 1}
                        >
                            Next →
                        </button>
                    </div>
                    <button type="button" className="solar-tour-controls__exit" onClick={onExit}>
                        Back to the Solar System
                    </button>
                </div>
            </div>
        </aside>
    );
}
```

Note the controls reuse the existing `solar-tour-controls` classes from `SolarSystem.css` rather than restyling buttons — that is deliberate, so the two features stay visually identical.

- [x] **Step 2: Write the styles**

Create `src/pages/skills/geography/ConstellationCard.css`:

```css
/* The star explorer panel. Borrows the glass treatment from .solar-info-card
   but takes the middle of the screen, because the chart needs the room. */

.solar-constellation {
  position: absolute;
  z-index: 60;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: min(58rem, calc(100% - 2rem));
  max-height: min(86%, 44rem);
  padding: 1rem;
  overflow: hidden;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(159, 208, 255, 0.32);
  border-radius: 1.25rem;
  background:
    radial-gradient(circle at 100% 0, rgba(96, 165, 250, 0.18), transparent 48%),
    rgba(5, 10, 24, 0.94);
  box-shadow: 0 1.25rem 3.5rem rgba(0, 0, 0, 0.5);
  color: #f8fafc;
  font-family: system-ui, sans-serif;
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  animation: solar-card-enter 220ms ease-out;
}

.solar-constellation__chart-pane {
  flex: 0 0 auto;
  padding: 0.5rem;
  border: 1px solid rgba(159, 208, 255, 0.16);
  border-radius: 1rem;
  background: radial-gradient(circle at 50% 40%, rgba(23, 37, 84, 0.65), rgba(2, 4, 10, 0.9));
}

.solar-constellation__chart {
  display: block;
  width: 100%;
  height: auto;
}

/* --- the drawing ------------------------------------------------------- */

.solar-constellation__lines line {
  stroke: rgba(159, 208, 255, 0.72);
  stroke-width: 0.45;
  stroke-linecap: round;
  /* pathLength="1" on each line makes one dash span the whole segment,
     whatever its real length, so every segment draws in at the same rate. */
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: solar-constellation-draw 620ms ease-out forwards;
}

.solar-constellation__stars {
  opacity: 0;
  animation: solar-constellation-appear 420ms ease-out forwards;
}

.solar-constellation__star {
  fill: #ffffff;
}

.solar-constellation__star-name {
  fill: rgba(226, 240, 255, 0.82);
  font-size: 3.6px;
  font-weight: 600;
  letter-spacing: 0.04em;
}

@keyframes solar-constellation-draw {
  to { stroke-dashoffset: 0; }
}

@keyframes solar-constellation-appear {
  to { opacity: 1; }
}

/* --- the text ---------------------------------------------------------- */

.solar-constellation__body {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 0;
}

.solar-constellation__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
}

.solar-constellation__eyebrow {
  display: block;
  color: #9fd0ff;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.solar-constellation__header h2 {
  margin: 0.15rem 0 0;
  font-size: 1.4rem;
}

.solar-constellation__aka {
  margin: 0.2rem 0 0;
  color: rgba(226, 240, 255, 0.66);
  font-size: 0.78rem;
}

.solar-constellation__close {
  flex: 0 0 auto;
  width: 2rem;
  height: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  color: #f8fafc;
  font-size: 1.1rem;
  line-height: 1;
  cursor: pointer;
}

.solar-constellation__close:hover {
  background: rgba(255, 255, 255, 0.14);
}

.solar-constellation__scroll {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
}

.solar-constellation__description {
  margin: 0 0 0.75rem;
  font-size: 0.92rem;
  line-height: 1.5;
}

.solar-constellation__scroll h3 {
  margin: 0 0 0.4rem;
  color: #9fd0ff;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.solar-constellation__scroll ul {
  margin: 0;
  padding-left: 1.1rem;
  font-size: 0.85rem;
  line-height: 1.55;
}

.solar-constellation__scroll li + li {
  margin-top: 0.35rem;
}

/* --- wide screens: chart beside the text ------------------------------- */

@media (min-width: 720px) {
  .solar-constellation {
    flex-direction: row;
    gap: 1.25rem;
    padding: 1.25rem;
  }

  .solar-constellation__chart-pane {
    flex: 1 1 58%;
    align-self: center;
  }

  .solar-constellation__body {
    flex: 1 1 42%;
  }

  .solar-constellation__header h2 {
    font-size: 1.6rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .solar-constellation {
    animation: none;
  }

  .solar-constellation__lines line {
    stroke-dashoffset: 0;
    animation: none;
  }

  .solar-constellation__stars {
    opacity: 1;
    animation: none;
  }
}
```

- [x] **Step 3: Verify it compiles and lints**

```bash
npx eslint src/pages/skills/geography/ConstellationCard.jsx && npm run build
```

Expected: eslint clean, build succeeds. Nothing renders it yet — that is Task 5.

- [x] **Step 4: Commit** *(only if the user has asked you to commit)*

```bash
git add src/pages/skills/geography/ConstellationCard.jsx src/pages/skills/geography/ConstellationCard.css
git commit -m "feat: add constellation star-chart card"
```

---

### Task 5: Wire the card into `SolarSystem.jsx`

Seven edits. No Three.js code changes — everything here is React state and JSX, plus two CSS adjustments.

**Files:**
- Modify: `src/pages/skills/geography/SolarSystem.jsx`
- Modify: `src/pages/skills/geography/SolarSystem.css`

**Interfaces:**
- Consumes: `constellations` (Task 2), `ConstellationCard` (Task 4).
- Produces: nothing other tasks depend on.

**The one idea that makes this safe:** `mode` is **derived, never stored**. Only one new `useState` is added. Do not add a `setMode` anywhere — if you find yourself wanting one, you have gone wrong.

- [x] **Step 1: Add the imports**

Below the `narration.js` import added in Task 3:

```js
import { constellations } from "./constellations.js";
import ConstellationCard from "./ConstellationCard.jsx";
```

- [x] **Step 2: Add the one new piece of state**

Find this line (around line 43):

```js
    const [tourState, setTourState] = useState({ active: false, index: 0, total: 0, muted: false });
```

Add immediately after it:

```js
    // The constellation explorer is pure React — it never touches the scene —
    // so unlike tourState this has no mirror inside the Three.js effect.
    const [constellationState, setConstellationState] = useState({ active: false, index: 0, muted: false });
```

- [x] **Step 3: Derive `mode`**

Find this line (around line 1554, just above `const phaseMessages`):

```js
    const meteorActive = meteorPhase !== "ready";
```

Add immediately after it:

```js
    // Derived, never stored: meteorPhase, tourState and constellationState are
    // the sources of truth, so these four modes cannot drift out of sync.
    const mode = meteorActive
        ? "meteor"
        : tourState.active
            ? "tour"
            : constellationState.active
                ? "constellations"
                : "idle";
```

- [x] **Step 4: Replace the four JSX guards**

Work through these in order. **Two of them are not `mode === "idle"`** — the info card and the drag hint are visible during the tour today, and collapsing them to idle-only would silently regress it.

| # | Around line | Find | Replace with |
|---|---|---|---|
| 1 | 1581 | `{!meteorActive && !tourState.active && (` | `{mode === "idle" && (` |
| 2 | 1669 | `{!meteorActive && !selectedPlanet && !tourState.active && (` | `{mode === "idle" && !selectedPlanet && (` |
| 3 | 1679 | `{!meteorActive && selectedPlanet && (` | `{(mode === "idle" \|\| mode === "tour") && selectedPlanet && (` |
| 4 | 1780 | `{!meteorActive && <div` | `{(mode === "idle" \|\| mode === "tour") && <div` |

- [x] **Step 5: Add the constellations entry button**

Guard #2 above wraps the tour launch button. Replace that whole block — from the `{mode === "idle" && !selectedPlanet && (` you just wrote through its closing `)}` — with a two-button row:

```jsx
            {mode === "idle" && !selectedPlanet && (
                <div className="solar-launch-buttons">
                    <button
                        type="button"
                        className="solar-tour-launch"
                        onClick={() => sceneApiRef.current?.start()}
                    >
                        <span className="solar-tour-launch__icon" aria-hidden="true">▶</span>
                        Tour<span className="solar-tour-launch__full"> the Solar System</span>
                    </button>
                    <button
                        type="button"
                        className="solar-tour-launch"
                        aria-label="Explore constellations"
                        onClick={() => setConstellationState({ active: true, index: 0, muted: false })}
                    >
                        <span className="solar-tour-launch__icon" aria-hidden="true">✦</span>
                        <span className="solar-tour-launch__full">Constellations</span>
                    </button>
                </div>
            )}
```

On narrow screens the second button is the star glyph alone, which is why it carries an `aria-label`.

- [x] **Step 6: Render the card, dim the canvas, and lock out the meteor**

**6a.** Immediately after the guard-#3 info-card `</aside>` block closes (before the drag-hint block), add:

```jsx
            {mode === "constellations" && (
                <ConstellationCard
                    constellation={constellations[constellationState.index]}
                    index={constellationState.index}
                    total={constellations.length}
                    muted={constellationState.muted}
                    onPrevious={() => setConstellationState((current) => ({
                        ...current,
                        index: Math.max(0, current.index - 1),
                    }))}
                    onNext={() => setConstellationState((current) => ({
                        ...current,
                        index: Math.min(constellations.length - 1, current.index + 1),
                    }))}
                    onToggleMute={() => setConstellationState((current) => ({
                        ...current,
                        muted: !current.muted,
                    }))}
                    onExit={() => setConstellationState({ active: false, index: 0, muted: false })}
                />
            )}
```

**6b.** Give the `<canvas>` a class so it can be dimmed. Find:

```jsx
            <canvas
                ref={canvasRef}
                aria-label="Interactive model of the Solar System"
```

and insert a `className` line after `ref`:

```jsx
            <canvas
                ref={canvasRef}
                className={`solar-system__canvas${mode === "constellations" ? " solar-system__canvas--dimmed" : ""}`}
                aria-label="Interactive model of the Solar System"
```

**6c.** Stop a meteor launching behind the card. Find the launch button (around line 1801) and add one condition to `disabled`:

```jsx
disabled={!sceneReady || meteorActive || mode === "constellations"}
```

- [x] **Step 7: Widen the space the Tweakpane leaves for the buttons**

There are now two pills where there was one. Find `applyPaneWidth` (around line 857) and change **only** the narrow-screen value, `8.5rem` → `10.5rem`:

```js
        const applyPaneWidth = () => {
            pane.element.style.width = wideQuery.matches
                ? "min(256px, calc(100% - 2rem))"
                : "min(232px, calc(100% - 10.5rem))";
        };
```

- [x] **Step 8: Update the CSS**

In `src/pages/skills/geography/SolarSystem.css`:

**8a.** The launch buttons now sit in a flex row, so positioning moves from the button to the row. Replace the first five declarations of `.solar-tour-launch` (around line 31) — delete `position`, `z-index`, `top` and `left`, keeping everything from `display` down — and add the new container rule just above it:

```css
.solar-launch-buttons {
  position: absolute;
  z-index: 45;
  top: 1rem;
  left: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.solar-tour-launch {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.72rem 0.8rem;
  border: 1px solid rgba(255, 205, 117, 0.42);
  border-radius: 999px;
  background: rgba(13, 18, 34, 0.9);
  box-shadow: 0 0.75rem 2rem rgba(0, 0, 0, 0.3);
  color: #fff;
  font: 700 0.8rem/1 system-ui, sans-serif;
  cursor: pointer;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: background 160ms ease, border-color 160ms ease, transform 160ms ease;
}
```

**8b.** In the `@media (min-width: 720px)` block around line 507, the `.solar-tour-launch` rule still sets `top: 1rem;`, which is now inert. Delete just that one line, leaving `gap` and `padding`.

**8c.** Add the dimming rule. Put it near the top of the file, after the existing `.solar-system` rules:

```css
/* The scene keeps running behind the star chart — freezing it looks broken —
   but it steps back so the constellation reads clearly. */
.solar-system__canvas {
  transition: filter 320ms ease;
}

.solar-system__canvas--dimmed {
  filter: brightness(0.32) saturate(0.55);
}

@media (prefers-reduced-motion: reduce) {
  .solar-system__canvas {
    transition: none;
  }
}
```

- [x] **Step 9: Verify**

```bash
npm test 2>&1 | tail -6 && npx eslint src/pages/skills/geography/ && npm run build
```

Expected: `fail 0` (557 tests), eslint clean, build succeeds.

- [x] **Step 10: Commit** *(only if the user has asked you to commit)*

```bash
git add src/pages/skills/geography/SolarSystem.jsx src/pages/skills/geography/SolarSystem.css
git commit -m "feat: add constellations explorer to the Solar System page"
```

---

### Task 6: Manual browser verification

The `mode` refactor touches tour and meteor code paths that have no automated coverage. This task is how we know they still work. **Do not report the feature complete until every box below is ticked.**

**Files:** none — this is verification only.

- [x] **Step 1: Start the app**

```bash
npm run dev
```

Navigate to the Solar System page.

- [x] **Step 2: Check the features you did not build still work**

- [x] **Tour:** starts, steps forward and back, narrates, mutes, replays, exits cleanly.
- [x] **Tour overlays:** the planet info card and the "Drag to orbit…" hint are both still visible *during* the tour. (If either vanished, guard #3 or #4 in Task 5 Step 4 was over-collapsed to `mode === "idle"`.)
- [x] **Meteor:** launches and resets; the toolbar and hint hide while it runs.
- [x] **Search and click-to-follow:** still focus planets and moons.

- [x] **Step 3: Check the new feature**

- [x] The **✦ Constellations** button sits beside the Tour button and appears only on the idle view.
- [x] Clicking it opens the card, dims the scene behind it, and hides the toolbar, launch buttons and info card.
- [x] The Plough is recognisable: **bowl on the right, handle trailing to the left and dipping down at Alkaid.** Star names are legible.
- [x] The segments draw themselves in one after another, then the stars and names fade in.
- [x] Narration plays on open, **Replay** repeats it, **Mute** silences it and greys out Replay.
- [x] **← Previous** and **Next →** are both disabled (one constellation) and read "Constellation 1 of 1".
- [x] **Back to the Solar System** and **×** both close the card, undim the scene, and stop narration mid-sentence.
- [x] **Launch meteor** is disabled while the card is open.

- [x] **Step 4: Check both screen sizes**

- [x] **375px wide (phone):** chart above text; the Tour and ✦ pills both fit without overlapping the Tweakpane, which stays usable. *If they collide, widen the `10.5rem` from Task 5 Step 7 until they do not.*
- [x] **1280px wide (desktop):** chart beside the text; the ✦ button reads "✦ Constellations"; the card does not overflow the viewport.

- [x] **Step 5: Check reduced motion**

In your OS accessibility settings, turn on "reduce motion", reload, and open the card.

- [x] The constellation appears complete and still — no line-drawing, no fade-in, no card entrance animation.

- [x] **Step 6: Record the result**

Update the Progress table at the top of this plan. If anything above failed, write what and why next to the task rather than ticking it.

---

## Notes for whoever picks this up next

Stage two (the celestial sphere in the Three.js scene) is sketched in section 8 of the spec. `raDecToUnitVector` exists and is tested for exactly that purpose. Nothing in this stage forecloses it.

To add another constellation: append one object to `constellations` in
`constellations.js`. Nothing else needs to change — the Previous/Next buttons,
the "N of M" counter and the projection already handle it, and
`constellations.test.js` will catch a mistyped star id.
