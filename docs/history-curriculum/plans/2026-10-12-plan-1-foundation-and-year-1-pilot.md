# History Plan 1: Foundation and Year 1 Pilot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Register History as a subject, build the shared story-card engine and image
pipeline, ship the Year 1 History dataset (all 14 topics "Coming soon"), and ship the
first topic, Toys Then and Now, end to end as the pilot for owner review.

**Architecture:** A topic is pure data: four story cards and banks of question
templates. `buildHistoryTopic(topic)` turns it into `build(level, rng) → { story,
questions }`, reusing Year 1 Science's `makeQuestion` so every round is an existing
`DataChallenge` kind (`choice`, `sort`, `order`). `HistoryChallenge` shows the story
card, then hands the questions to the unchanged `DataChallenge`, with source pictures and
a "📖 Bix's story" button drawn through `renderVisual`. Images are CC0 / public-domain
files, pinned by hash, converted to WebP by headless Chrome, and listed in a manifest
that the lint, the UI and the credits page all read.

**Tech Stack:** React 19 + Vite, `node --test` for pure modules (`npm run test:unit`),
Vitest + Testing Library + jsdom for components (`npm run test:components`),
`playwright-core` + local Chrome for the offline image script.

**Spec:** [shared-design-spec.md](../shared-design-spec.md) and
[year-1-design-spec.md](../year-1-design-spec.md). Tracker:
[HISTORY_TRACKER.md](../HISTORY_TRACKER.md).

**Later plans (not this one):** Plan 2: Year 1 topics 2–14. Plans 3–5: Years 2, 3
and 4, each written after the previous year's pilot review. `TimelineVisual` and the
local-history activity cards are built in the plan whose content first uses them.

## Global Constraints

- Audience 5–6 (Year 1). Story card ≤ 30 words, each sentence ≤ 10 words; 4 rounds
  per run; ≥ 6 templates available per level; 3 options per choice (shared spec §3).
- Images: `CC0-1.0` or `PDM-1.0` only. ≤ 800 px long edge, WebP, ≤ 120 KB.
- Colours only through `--light-*` / `--dark-*` tokens (via the kit's `--ck-*`) or the
  page's own token sets; both themes must work; large touch targets.
- British English (`lintBuild` checks US spelling).
- Category and topic titles are permanent progress keys; plain English letters only.
- **No change** to progress shape, storage keys or unlock rules
  (`.claude/skills/curriculum-progress`).
- Read `.claude/skills/add-curriculum-challenge` and `building-curriculum-topics`
  before Task 6.
- `npm run lint`, `npm test` and `npm run build` pass at the end of every task.
- Work on branch `feat/history-curriculum`.

## Review Focus

1. **Opening "📖 Bix's story" mid-round, then answering.** The child's selected answer
   must survive the story opening and closing, and Check must still mark it right.
   Pinned in Task 5 (`keeps the chosen answer while the story opens and closes`).
2. **A picture id with no image** (typo, or a file missing from the build). The round
   must show a visible "picture could not load" note, not crash or show nothing.
   Pinned in Task 5 (`an unknown picture shows a note instead of crashing`).
3. **A full run with wrong answers.** Two misses show the hint, the run still completes,
   and `onComplete` fires exactly once. Pinned in Task 6 (pilot playthrough).
4. **Keyboard only.** "Let's go!" and "📖 Bix's story" are real buttons with accessible
   names, and the toggle reports `aria-expanded`. Pinned in Task 5.
5. **Dark theme at 320 px wide.** Story card, photo and credit stay readable with no
   horizontal scroll. Not unit-testable; checked by hand in Task 7 with the steps given.

---

## File Structure

| File | Responsibility |
|---|---|
| `src/data/curriculumRegistry.js` | + `history` subject; + Year 1 History entry |
| `src/data/childFields.js` | + `"history"` in `CHILD_SUBJECTS` |
| `src/pages/curriculum/CurriculumSelectPage.jsx` / `.css` | History subject colours |
| `src/pages/curriculum/CurriculumPage.jsx` | History hero glyphs; Year 1 category icons |
| `src/data/year1HistoryCurriculum.js` (+ `.test.js`) | Year 1 dataset, locked IDs |
| `src/data/year1HistoryCertificateSkills.js` | 14 "I can…" lines |
| `src/data/certificateSkills.js` | Import the Year 1 History lines |
| `docs/curriculum/key-stage-1-history.md` | Mapping section: KS1 split + Year 1 rows |
| `scripts/history-assets/sources.json` | Pinned image sources (URL, hash, licence, alt, credit) |
| `scripts/history-assets/fetch.mjs` | Download, verify, resize, encode WebP, write manifest |
| `src/assets/history/manifest.json` | Generated: what the app and tests read |
| `src/assets/history/images/*.webp` | Generated images |
| `src/data/historyImages.test.js` | Manifest rules and file budgets |
| `src/data/licences.js` | + `CC0-1.0`, `PDM-1.0` |
| `src/pages/credits/Credits.jsx` | + History pictures section |
| `src/data/challenges/history/engine.js` (+ `.test.js`) | Age settings, titles, builder, topic lint |
| `src/data/challenges/history/testTopic.js` | Small valid topic used by tests only |
| `src/components/challenge/history/historyImages.js` | id → `{ src, alt, credit, … }` (Vite) |
| `src/components/challenge/history/StoryCard.jsx` | The "Bix explains" card |
| `src/components/challenge/history/SourceVisual.jsx` | Photo + credit, or a missing-picture note |
| `src/components/challenge/history/HistoryVisual.jsx` | `renderVisual`: story button + source |
| `src/components/challenge/history/HistoryChallenge.jsx` | Story phase, then `DataChallenge` |
| `src/components/challenge/history/history.css` | Styles, `--ck-*` tokens only |
| `src/data/challenges/history/year1/toysThenAndNow.js` | Pilot topic content |
| `src/data/challenges/history/year1/index.js` | `YEAR1_HISTORY_BUILDERS` |
| `src/data/challenges/history/year1/year1History.test.js` | Content lint for every built Year 1 topic |
| `src/pages/skills/history/challenges/year1/Year1HistoryGame.jsx` | Year 1 glue |
| `src/pages/skills/history/challenges/year1/toys-then-and-now/ToysThenAndNowChallenge{1..4}.jsx` | Loader wrappers |
| `tests/components/history.test.jsx` | Engine UI and pilot playthrough |

---

### Task 1: Register History as a subject

**Files:**
- Modify: `src/data/curriculumRegistry.js` (`CURRICULUM_SUBJECTS`)
- Modify: `src/data/childFields.js:23`
- Modify: `src/data/childFields.test.js:120,128,149`
- Modify: `server/signup.test.js:353`
- Modify: `src/pages/curriculum/CurriculumSelectPage.jsx` (`SUBJECT_LOOKS`)
- Modify: `src/pages/curriculum/CurriculumSelectPage.css` (subject tokens, lines 24–31)
- Modify: `src/pages/curriculum/CurriculumPage.jsx:49-53` (glyphs)

**Interfaces:**
- Produces: subject id `"history"` accepted everywhere a subject id is validated.

- [ ] **Step 1: Branch**

```bash
git switch -c feat/history-curriculum
```

- [ ] **Step 2: Change the tests first**

In `src/data/childFields.test.js`, replace the three uses of `"history"` as an unknown
subject with `"astrology"`, and add an acceptance check:

```js
// line 120
  assert.throws(() => normaliseChildPatch({ subjects: ["astrology"] }), /INVALID_SUBJECTS/);
// line 128
  assert.deepEqual(readSubjects({ subjects: ["math", "astrology"] }), ["math"]);
// line 149
  assert.throws(() => normaliseNewChildren([{ name: "A", subjects: ["astrology"] }], { max: 6 }), /INVALID_SUBJECTS/);
```

Add after the "subjects: the list is the curriculum's subject ids" test:

```js
test("subjects: History can be chosen", () => {
  assert.deepEqual(normaliseChildPatch({ subjects: ["history"] }), { subjects: ["history"] });
  assert.deepEqual(readSubjects({ subjects: ["history"] }), ["history"]);
});
```

In `server/signup.test.js:353`:

```js
      [[{ name: "A", subjects: ["astrology"] }], "INVALID_SUBJECTS"],
```

- [ ] **Step 3: Run to see it fail**

Run: `node --test src/data/childFields.test.js`
Expected: FAIL in "subjects: History can be chosen" (`INVALID_SUBJECTS`).

- [ ] **Step 4: Implement**

`src/data/curriculumRegistry.js`, in `CURRICULUM_SUBJECTS` after science:

```js
  { id: "history", name: "History", icon: "🏛️" },
```

`src/data/childFields.js:23`:

```js
export const CHILD_SUBJECTS = ["math", "english", "geography", "science", "history"];
```

`src/pages/curriculum/CurriculumSelectPage.jsx`, in `SUBJECT_LOOKS`:

```js
  history: { hue: "--cs-hue-history", deep: "--cs-deep-history" },
```

`src/pages/curriculum/CurriculumSelectPage.css`, after `--cs-hue-science` and
`--cs-deep-science` respectively (white on `#7a4a2c` is 7.39:1):

```css
  --cs-hue-history: #b5794f;
  --cs-deep-history: #7a4a2c;
```

`src/pages/curriculum/CurriculumPage.jsx`, after `SCIENCE_GLYPHS`:

```js
const HISTORY_GLYPHS = MATHS_GLYPHS.map((glyph, index) => ({
  ...glyph,
  char: ["🏺", "✦", "👑", "📜", "🏰", "●", "🛡️", "★", "🕰️"][index],
}));
const GLYPHS_BY_SUBJECT = { english: ENGLISH_GLYPHS, science: SCIENCE_GLYPHS, history: HISTORY_GLYPHS };
```

(replacing the existing `GLYPHS_BY_SUBJECT` line).

- [ ] **Step 5: Run the tests**

Run: `npm test`
Expected: PASS, including `childFields.test.js`, `server/signup.test.js` and
`certificateSkills.test.js` (History has no curriculum yet, so no lines are required).
If a component test counts the subjects on the sign-up or curriculum pages, update its
expected list to include History; don't remove History to make it pass.

- [ ] **Step 6: Commit**

```bash
git add src/data/curriculumRegistry.js src/data/childFields.js src/data/childFields.test.js server/signup.test.js src/pages/curriculum/CurriculumSelectPage.jsx src/pages/curriculum/CurriculumSelectPage.css src/pages/curriculum/CurriculumPage.jsx
git commit -m "feat(history): register History as a subject"
```

---

### Task 2: Year 1 History dataset, certificate lines and KS1 mapping

**Files:**
- Create: `src/data/year1HistoryCurriculum.js`
- Create: `src/data/year1HistoryCurriculum.test.js`
- Create: `src/data/year1HistoryCertificateSkills.js`
- Modify: `src/data/curriculumRegistry.js` (import + `CURRICULA` entry)
- Modify: `src/data/certificateSkills.js` (import + spread)
- Modify: `src/pages/curriculum/CurriculumPage.jsx` (`CATEGORY_ICONS`)
- Modify: `docs/curriculum/key-stage-1-history.md` (mapping section)

**Interfaces:**
- Produces: `year1HistoryCurriculum` (same shape as `year1ScienceCurriculum`);
  `loadCurriculum(1, "history")`; `YEAR1_HISTORY_TOPIC_SKILLS` keyed `1/history/<topicId>`.

- [ ] **Step 1: Write the failing test** — `src/data/year1HistoryCurriculum.test.js`

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { year1HistoryCurriculum as curriculum } from "./year1HistoryCurriculum.js";
import { isCurriculumAvailable, loadCurriculum } from "./curriculumRegistry.js";
import { TOPIC_SKILLS } from "./certificateSkills.js";

// Permanent identifiers, approved 2026-10-12. A change here orphans saved
// progress and must be treated as a migration.
const LOCKED_IDS = [
  ["then-and-now", ["toys-then-and-now", "homes-then-and-now", "school-then-and-now", "seaside-holidays-then-and-now"]],
  ["the-first-flight", ["the-wright-brothers-first-flight", "flying-then-and-now"]],
  ["explorers", ["christopher-columbus", "neil-armstrong", "explorers-then-and-now"]],
  ["kings-and-queens", ["queen-elizabeth-i", "queen-victoria", "two-queens-long-ago"]],
  ["clues-around-you", ["old-and-new-buildings", "clues-in-street-names"]],
];
const topics = curriculum.flatMap((c) => c.topics);

test("Year 1 History: five categories, 14 stable topics and 56 challenge slots", () => {
  assert.deepEqual(curriculum.map((c) => [c.id, c.topics.map((t) => t.id)]), LOCKED_IDS);
  assert.deepEqual(curriculum.map((c) => c.title), ["Then and Now", "The First Flight", "Explorers", "Kings and Queens", "Clues Around You"]);
  assert.equal(topics.length, 14);
  assert.equal(loadCurriculum("1", "history"), curriculum);
  assert.equal(isCurriculumAvailable(1, "history"), true);
  for (const t of topics) {
    assert.ok(t.icon, t.id);
    assert.deepEqual(t.challenges.map((q) => q.id), [1, 2, 3, 4]);
    assert.ok(TOPIC_SKILLS[`1/history/${t.id}`], `${t.id} has no certificate line`);
  }
});

test("Year 1 History: titles use plain letters only", () => {
  for (const name of [...curriculum.map((c) => c.title), ...topics.map((t) => t.name)]) {
    assert.match(name, /^[A-Za-z0-9 ',-]+$/, name);
  }
});

test("Year 1 History: every topic has a statutory mapping row", () => {
  const reference = readFileSync(new URL("../../docs/curriculum/key-stage-1-history.md", import.meta.url), "utf8");
  for (const t of topics) assert.ok(reference.includes(`| ${t.name} | \`${t.id}\` |`), t.name);
});
```

- [ ] **Step 2: Run to see it fail**

Run: `node --test src/data/year1HistoryCurriculum.test.js`
Expected: FAIL, `Cannot find module './year1HistoryCurriculum.js'`.

- [ ] **Step 3: Create the dataset** — `src/data/year1HistoryCurriculum.js`

```js
import { toKebabCase } from "../utils/toKebabCase.js";

// England key stage 1 History, Year 1 (DfE / OGL v3.0). Source and app
// crosswalk: docs/curriculum/key-stage-1-history.md. Design:
// docs/history-curriculum/year-1-design-spec.md. Titles are persistent
// identifiers (approved 2026-10-12); do not rename them without a progress migration.
const rawCurriculum = [
  { title: "Then and Now", topics: [
    ["Toys Then and Now", "🧸"],
    ["Homes Then and Now", "🏠"],
    ["School Then and Now", "🏫"],
    ["Seaside Holidays Then and Now", "🏖️"],
  ] },
  { title: "The First Flight", topics: [
    ["The Wright Brothers' First Flight", "✈️"],
    ["Flying Then and Now", "🛩️"],
  ] },
  { title: "Explorers", topics: [
    ["Christopher Columbus", "⛵"],
    ["Neil Armstrong", "🚀"],
    ["Explorers Then and Now", "🧭"],
  ] },
  { title: "Kings and Queens", topics: [
    ["Queen Elizabeth I", "👑"],
    ["Queen Victoria", "🫖"],
    ["Two Queens Long Ago", "👸"],
  ] },
  { title: "Clues Around You", topics: [
    ["Old and New Buildings", "🏚️"],
    ["Clues in Street Names", "🪧"],
  ] },
];

export const year1HistoryCurriculum = rawCurriculum.map(({ title, topics }) => ({
  id: toKebabCase(title), title,
  topics: topics.map(([name, icon]) => ({
    id: toKebabCase(name), name, icon,
    challenges: [1, 2, 3, 4].map((id) => ({ id, title: `Challenge ${id}` })),
  })),
}));
```

- [ ] **Step 4: Register it** — `src/data/curriculumRegistry.js`

```js
import { year1HistoryCurriculum } from "./year1HistoryCurriculum.js";
```

and in `CURRICULA`:

```js
  // Approved 2026-10-12 (docs/history-curriculum/year-1-design-spec.md). Topics
  // show as "Coming soon" until their challenge files exist.
  { year: 1, subject: "history", available: true, load: () => year1HistoryCurriculum },
```

- [ ] **Step 5: Certificate lines** — `src/data/year1HistoryCertificateSkills.js`

```js
// Year 1 History "I can…" lines (docs/curriculum/key-stage-1-history.md).
export const YEAR1_HISTORY_TOPIC_SKILLS = {
  "1/history/toys-then-and-now": "I can spot how toys have changed since my grandparents were young.",
  "1/history/homes-then-and-now": "I can say how homes have changed since my grandparents were young.",
  "1/history/school-then-and-now": "I can compare school long ago with my school today.",
  "1/history/seaside-holidays-then-and-now": "I can compare seaside holidays long ago and today.",
  "1/history/the-wright-brothers-first-flight": "I know the Wright brothers made the first aeroplane flight.",
  "1/history/flying-then-and-now": "I can compare the first aeroplane with planes today.",
  "1/history/christopher-columbus": "I know who Christopher Columbus was and where he sailed.",
  "1/history/neil-armstrong": "I know Neil Armstrong was the first person to walk on the Moon.",
  "1/history/explorers-then-and-now": "I can compare how two explorers travelled.",
  "1/history/queen-elizabeth-i": "I know who Queen Elizabeth I was.",
  "1/history/queen-victoria": "I know who Queen Victoria was.",
  "1/history/two-queens-long-ago": "I can compare the lives of two queens from long ago.",
  "1/history/old-and-new-buildings": "I can spot clues that a building is old.",
  "1/history/clues-in-street-names": "I can find clues about the past in street names.",
};
```

`src/data/certificateSkills.js`: add
`import { YEAR1_HISTORY_TOPIC_SKILLS } from "./year1HistoryCertificateSkills.js";`
after line 24, and `...YEAR1_HISTORY_TOPIC_SKILLS,` after `...YEAR2_SCIENCE_TOPIC_SKILLS,`.

- [ ] **Step 6: Category icons** — `src/pages/curriculum/CurriculumPage.jsx`

At the top of `CATEGORY_ICONS` (anchored, so no Maths or English pattern can claim them):

```js
  // History, Year 1
  { match: /^then and now$/i, icon: "🕰️" },
  { match: /^the first flight$/i, icon: "✈️" },
  { match: /^explorers$/i, icon: "🧭" },
  { match: /^kings and queens$/i, icon: "👑" },
  { match: /^clues around you$/i, icon: "🔎" },
```

- [ ] **Step 7: Mapping section** — `docs/curriculum/key-stage-1-history.md`

Replace the whole "> **No History dataset yet.** …" blockquote under
`# Mapping to our curriculum dataset` with:

```markdown
Years 1 and 2 split key stage 1 between them (approved 2026-10-12): both years teach
all four statutory strands, Year 2 further back in time and deeper. The app cannot
know where a child lives, so the locality strand is taught as how to find history near
you, with UK examples. Of the bracketed examples, Pieter Bruegel the Elder and LS Lowry
are not used: Lowry's paintings are still in copyright, which breaks the app's
open-licence image rule. Design: `docs/history-curriculum/year-1-design-spec.md` and
`year-2-design-spec.md`. Titles are permanent URL and progress identifiers.

### Year 1

| Category | App topic | Topic ID | Statutory requirement served | Activity boundary |
|---|---|---|---|---|
| Then and Now | Toys Then and Now | `toys-then-and-now` | changes within living memory | Grandparents' toys (wood, tin, marbles, tops) and toys today (plastic, batteries); old photos as a source. |
| Then and Now | Homes Then and Now | `homes-then-and-now` | changes within living memory | Coal fires, washing by hand, one TV; central heating, machines, screens. |
| Then and Now | School Then and Now | `school-then-and-now` | changes within living memory | Chalk and blackboards, rows of desks; whiteboards and tablets today. |
| Then and Now | Seaside Holidays Then and Now | `seaside-holidays-then-and-now` | changes within living memory. Where appropriate, these should be used to reveal aspects of change in national life | Piers, Punch and Judy, donkeys, bathing huts; holidays today. |
| The First Flight | The Wright Brothers' First Flight | `the-wright-brothers-first-flight` | events beyond living memory that are significant nationally or globally | Orville and Wilbur Wright, 1903, 12 seconds, the Wright Flyer. No years shown in Year 1. |
| The First Flight | Flying Then and Now | `flying-then-and-now` | events beyond living memory that are significant nationally or globally | The first aeroplane compared with planes today. |
| Explorers | Christopher Columbus | `christopher-columbus` | the lives of significant individuals in the past who have contributed to national and international achievements | Sailed west with three ships; people already lived there and were treated very unfairly. |
| Explorers | Neil Armstrong | `neil-armstrong` | the lives of significant individuals in the past who have contributed to national and international achievements | Apollo 11, the first person to walk on the Moon. |
| Explorers | Explorers Then and Now | `explorers-then-and-now` | Some should be used to compare aspects of life in different periods | Ships and rockets, maps and computers, how long journeys took. |
| Kings and Queens | Queen Elizabeth I | `queen-elizabeth-i` | the lives of significant individuals in the past who have contributed to national and international achievements | Long reign, the Armada (no fighting described), clothes and portraits. |
| Kings and Queens | Queen Victoria | `queen-victoria` | the lives of significant individuals in the past who have contributed to national and international achievements | Very long reign, big family, life in her time. |
| Kings and Queens | Two Queens Long Ago | `two-queens-long-ago` | Some should be used to compare aspects of life in different periods | Clothes, homes, travel; how we know about them. Not Elizabeth II. |
| Clues Around You | Old and New Buildings | `old-and-new-buildings` | significant historical events, people and places in their own locality | Clues that a building is old: materials, windows, dates on walls. |
| Clues Around You | Clues in Street Names | `clues-in-street-names` | significant historical events, people and places in their own locality | Mill Lane, Station Road, Church Street and what they tell us. |

### Year 2

Added with the Year 2 dataset.
```

- [ ] **Step 8: Run the tests**

Run: `npm run test:unit`
Expected: PASS, including `year1HistoryCurriculum.test.js` and
`certificateSkills.test.js` ("every topic in every registered curriculum has its own
statement").

- [ ] **Step 9: Commit**

```bash
git add src/data/year1HistoryCurriculum.js src/data/year1HistoryCurriculum.test.js src/data/year1HistoryCertificateSkills.js src/data/curriculumRegistry.js src/data/certificateSkills.js src/pages/curriculum/CurriculumPage.jsx docs/curriculum/key-stage-1-history.md
git commit -m "feat(history): Year 1 History dataset, certificate lines and KS1 mapping"
```

---

### Task 3: History image pipeline and picture credits

**Files:**
- Create: `scripts/history-assets/sources.json`
- Create: `scripts/history-assets/fetch.mjs`
- Create (generated): `src/assets/history/manifest.json`, `src/assets/history/images/*.webp`
- Create: `src/data/historyImages.test.js`
- Modify: `src/data/licences.js`
- Modify: `src/pages/credits/Credits.jsx`
- Modify: `tests/components/credits.test.jsx`

**Interfaces:**
- Produces: `src/assets/history/manifest.json` shaped
  `{ "images": { "<id>": { file, title, creator, date, institution, objectUrl, licence, alt, credit } } }`;
  image ids `cma-two-children-with-toys`, `cma-child-with-drum`;
  `LICENCES["CC0-1.0"]`, `LICENCES["PDM-1.0"]`.

- [ ] **Step 1: Write the failing test** — `src/data/historyImages.test.js`

```js
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { LICENCES } from "./licences.js";

const read = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));
const manifest = read("../assets/history/manifest.json");
const sources = read("../../scripts/history-assets/sources.json");
const ALLOWED = ["CC0-1.0", "PDM-1.0"];

test("History images: every manifest entry is open-licence, credited and described", () => {
  const ids = Object.keys(manifest.images);
  assert.ok(ids.length >= 2);
  assert.deepEqual(ids.sort(), Object.keys(sources).sort(), "manifest and sources.json list the same images");
  for (const [id, image] of Object.entries(manifest.images)) {
    assert.ok(ALLOWED.includes(image.licence), `${id}: licence ${image.licence}`);
    assert.ok(LICENCES[image.licence], `${id}: no LICENCES entry`);
    for (const field of ["title", "institution", "objectUrl", "alt", "credit"]) assert.ok(image[field]?.trim(), `${id}: no ${field}`);
    assert.match(sources[id].sha256, /^[0-9a-f]{64}$/, `${id}: sha256`);
  }
});

test("History images: files exist, are WebP and within budget", () => {
  for (const [id, image] of Object.entries(manifest.images)) {
    const file = new URL(`../assets/history/images/${image.file}`, import.meta.url);
    assert.ok(existsSync(file), `${id}: missing ${image.file}`);
    assert.ok(statSync(file).size <= 120 * 1024, `${id}: over 120 KB`);
    const head = readFileSync(file).subarray(0, 12).toString("latin1");
    assert.ok(head.startsWith("RIFF") && head.endsWith("WEBP"), `${id}: not WebP`);
  }
});
```

- [ ] **Step 2: Run to see it fail**

Run: `node --test src/data/historyImages.test.js`
Expected: FAIL, `ENOENT … src/assets/history/manifest.json`.

- [ ] **Step 3: Pin the sources** — `scripts/history-assets/sources.json`

(Both checked 2026-10-12: Cleveland Museum of Art open access, `share_license_status: "CC0"`.)

```json
{
  "cma-two-children-with-toys": {
    "title": "Two Children with Toys",
    "creator": "Unidentified photographer",
    "date": "about 1855",
    "institution": "Cleveland Museum of Art",
    "objectUrl": "https://clevelandart.org/art/2002.32",
    "fileUrl": "https://openaccess-cdn.clevelandart.org/2002.32/2002.32_web.jpg",
    "licence": "CC0-1.0",
    "sha256": "058f2edcf0dd8072deed6de30c413d3d2538b08a025be81c5ade2f0d0ae2a04a",
    "retrieved": "2026-10-12",
    "alt": "A very old photo of two children. A doll sits in a wooden cart with wheels. There is a basket on the floor.",
    "credit": "Two Children with Toys, about 1855. Cleveland Museum of Art, CC0."
  },
  "cma-child-with-drum": {
    "title": "Child with Drum",
    "creator": "Unidentified photographer",
    "date": "1850s",
    "institution": "Cleveland Museum of Art",
    "objectUrl": "https://clevelandart.org/art/2002.33",
    "fileUrl": "https://openaccess-cdn.clevelandart.org/2002.33/2002.33_web.jpg",
    "licence": "CC0-1.0",
    "sha256": "bada6e371991ced75a1069ee27ae84b54aece49275b8d7dd58b68e3d200c7d41",
    "retrieved": "2026-10-12",
    "alt": "A very old photo of a child holding a drum and two drumsticks.",
    "credit": "Child with Drum, 1850s. Cleveland Museum of Art, CC0."
  }
}
```

- [ ] **Step 4: Write the script** — `scripts/history-assets/fetch.mjs`

```js
/**
 * Builds the History pictures from scripts/history-assets/sources.json.
 *
 *   node scripts/history-assets/fetch.mjs
 *
 * Downloads each pinned file, checks its sha256, scales it to at most 800 px on
 * the long edge, encodes WebP (≤ 120 KB) in headless Chrome, writes
 * src/assets/history/images/<id>.webp and rebuilds src/assets/history/manifest.json.
 * Only CC0-1.0 and PDM-1.0 are accepted (docs/history-curriculum/shared-design-spec.md §6).
 * Needs Chrome: set CHROME_PATH if it is not in /Applications.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launchIsolatedPage } from "../science-assets/isolatedPage.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SOURCES = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/history-assets/sources.json"), "utf8"));
const OUT = path.join(ROOT, "src/assets/history");
const CHROME = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const ALLOWED = new Set(["CC0-1.0", "PDM-1.0"]);
const MAX_EDGE = 800;
const MAX_BYTES = 120 * 1024;
const QUALITIES = [0.8, 0.7, 0.6, 0.5];
const KEEP = ["title", "creator", "date", "institution", "objectUrl", "licence", "alt", "credit"];

const sha256 = (buffer) => crypto.createHash("sha256").update(buffer).digest("hex");

async function fetchVerified(id, source) {
  if (!ALLOWED.has(source.licence)) throw new Error(`${id}: licence ${source.licence} is not allowed`);
  const response = await fetch(source.fileUrl);
  if (!response.ok) throw new Error(`${id}: ${response.status} fetching ${source.fileUrl}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  const actual = sha256(buffer);
  if (actual !== source.sha256) throw new Error(`${id}: sha256 ${actual} does not match sources.json (${source.sha256})`);
  return buffer;
}

async function toWebp(page, buffer, mime) {
  for (const quality of QUALITIES) {
    const dataUrl = await page.evaluate(async ({ b64, mime, maxEdge, quality }) => {
      const img = new Image();
      img.src = `data:${mime};base64,${b64}`;
      await img.decode();
      const scale = Math.min(1, maxEdge / Math.max(img.naturalWidth, img.naturalHeight));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.naturalWidth * scale);
      canvas.height = Math.round(img.naturalHeight * scale);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/webp", quality);
    }, { b64: buffer.toString("base64"), mime, maxEdge: MAX_EDGE, quality });
    const webp = Buffer.from(dataUrl.split(",")[1], "base64");
    if (webp.length <= MAX_BYTES) return webp;
  }
  throw new Error(`could not get under ${MAX_BYTES} bytes`);
}

const mimeOf = (url) => (/\.png$/i.test(url) ? "image/png" : "image/jpeg");

fs.mkdirSync(path.join(OUT, "images"), { recursive: true });
const { browser, page } = await launchIsolatedPage(CHROME);
const images = {};
try {
  for (const [id, source] of Object.entries(SOURCES).sort(([a], [b]) => a.localeCompare(b))) {
    const webp = await toWebp(page, await fetchVerified(id, source), mimeOf(source.fileUrl));
    const file = `${id}.webp`;
    fs.writeFileSync(path.join(OUT, "images", file), webp);
    images[id] = { file, ...Object.fromEntries(KEEP.map((key) => [key, source[key] ?? null])) };
    console.log(`${id}: ${webp.length} bytes`);
  }
} finally {
  await browser.close();
}
fs.writeFileSync(path.join(OUT, "manifest.json"), `${JSON.stringify({ images }, null, 2)}\n`);
```

- [ ] **Step 5: Run the script**

Run: `node scripts/history-assets/fetch.mjs`
Expected: two lines like `cma-child-with-drum: 7xxxx bytes`, and
`src/assets/history/manifest.json` plus two `.webp` files written.

- [ ] **Step 6: Licences** — `src/data/licences.js`, add to `LICENCES`:

```js
  "CC0-1.0": { name: "CC0 1.0 Universal (public domain dedication)", url: "https://creativecommons.org/publicdomain/zero/1.0/" },
  "PDM-1.0": { name: "Public Domain Mark 1.0", url: "https://creativecommons.org/publicdomain/mark/1.0/" },
```

- [ ] **Step 7: Run the image test**

Run: `node --test src/data/historyImages.test.js`
Expected: PASS.

- [ ] **Step 8: Credits test** — append to `tests/components/credits.test.jsx`

```js
import historyManifest from "../../src/assets/history/manifest.json";

it("lists every History picture with its museum, licence and source link", () => {
  const { container } = render(<MemoryRouter><Credits /></MemoryRouter>);
  for (const [id, image] of Object.entries(historyManifest.images)) {
    const card = container.querySelector(`li[id="history-${id}"]`);
    expect(card, id).not.toBeNull();
    expect(card.textContent).toContain(image.title);
    expect(card.textContent).toContain(image.institution);
    expect(within(card).getByRole("link", { name: LICENCES[image.licence].name }).getAttribute("href")).toBe(LICENCES[image.licence].url);
    expect(within(card).getByRole("link", { name: "Source" }).getAttribute("href")).toBe(image.objectUrl);
  }
});
```

(Put the `import` with the other imports at the top of the file.)

Run: `npx vitest run tests/components/credits.test.jsx`
Expected: FAIL, the History cards don't exist.

- [ ] **Step 9: Credits page** — `src/pages/credits/Credits.jsx`

Add the import and a second list after the Science `</ul>`, and widen the intro:

```jsx
import historyManifest from "../../assets/history/manifest.json";
import { LICENCES } from "../../data/licences";
```

```jsx
        <p className="info-intro">
          Some Science and History pictures were made or kept by other people, who shared them under these licences. Thank you!
        </p>
```

```jsx
      <h2 className="credits-heading">History pictures</h2>
      <ul className="credits-list">
        {Object.entries(historyManifest.images).map(([id, image]) => (
          <li key={id} id={`history-${id}`} className="info-section credits-item">
            <h3>{image.title}</h3>
            <p>{[image.creator, image.date, image.institution].filter(Boolean).join(", ")}</p>
            <p className="credits-links">
              <span className="credits-links-label">Licence</span>
              <a className="credits-chip" href={LICENCES[image.licence].url}>{LICENCES[image.licence].name}</a>
              <a className="credits-source" href={image.objectUrl}>Source</a>
            </p>
          </li>
        ))}
      </ul>
```

- [ ] **Step 10: Run the tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 11: Commit**

```bash
git add scripts/history-assets src/assets/history src/data/historyImages.test.js src/data/licences.js src/pages/credits/Credits.jsx tests/components/credits.test.jsx
git commit -m "feat(history): pinned open-licence image pipeline and picture credits"
```

---

### Task 4: History engine (pure)

**Files:**
- Create: `src/data/challenges/history/engine.js`
- Create: `src/data/challenges/history/testTopic.js`
- Create: `src/data/challenges/history/engine.test.js`

**Interfaces:**
- Consumes: `makeQuestion(template, rng, level)` from
  `src/data/challenges/year1Science/engine.js`; `shuffle(rng, items)` from
  `src/data/challenges/year1Math/shared.js`.
- Produces:
  - `HISTORY_AGE: { [year]: { storyWords, sentenceWords, rounds, minBank, options } }`
  - `HISTORY_TITLES: { [year]: string[4] }`
  - `buildHistoryTopic(topic) → (level, rng) → { story, questions }`
  - `lintHistoryTopic(topic, { images }) → string[]` (empty when sound)
  - Topic shape: `{ year, references: string[], levels: { 1..4: { story: { lines: string[], image? , picture?, pictureLabel? }, rounds: bankName[] } }, banks: { [name]: template[] } }`.
    A template is a Year 1 Science template object (`type` choice / sort / order, see
    `year1Science/engine.js`) plus `answeredBy: string | string[]`, and optionally
    `visual: { type: "source", image: id }`.
  - `HISTORY_TEST_TOPIC` (tests only).

- [ ] **Step 1: The test topic** — `src/data/challenges/history/testTopic.js`

```js
// A small, valid Year 1 topic for the engine and component tests. Not shipped:
// nothing in the app imports it.
const story = { lines: ["Grandparents had wooden trains.", "Today some trains use an app."], picture: "🚂", pictureLabel: "a toy train" };
const sourceStory = { lines: ["This photo is very, very old."], image: "cma-child-with-drum" };

const choices = [
  { type: "choice", prompt: "What were old trains made of?", answer: "wood", wrong: ["glass", "paper"], answeredBy: "wooden trains", hint: "Look at Bix's story." },
  { type: "choice", prompt: "Who had wooden trains?", answer: "grandparents", wrong: ["babies", "robots"], answeredBy: "Grandparents had" },
  { type: "choice", prompt: "What can some trains use today?", answer: "an app", wrong: ["coal", "a candle"], answeredBy: "use an app" },
  { type: "choice", prompt: "When do some trains use an app?", answer: "today", wrong: ["long ago", "never"], answeredBy: "Today" },
];
const sorts = [{
  type: "sort", prompt: "Long ago or today?",
  bins: [{ id: "then", label: "Long ago" }, { id: "now", label: "Today" }],
  cards: [["wooden train", "then"], ["train with an app", "now"]],
  answeredBy: ["wooden trains", "use an app"],
}];
const orders = [{ type: "order", prompt: "Put them in order, oldest first.", labels: ["wooden train", "train with an app"], answeredBy: ["wooden trains", "use an app"] }];
const photo = [
  { type: "choice", prompt: "What is the child holding?", answer: "a drum", wrong: ["a ball", "a kite"], answeredBy: "holding a drum", visual: { type: "source", image: "cma-child-with-drum" } },
  { type: "choice", prompt: "How many drumsticks are there?", answer: "two", wrong: ["one", "five"], answeredBy: "two drumsticks", visual: { type: "source", image: "cma-child-with-drum" } },
  { type: "choice", prompt: "Is this photo old or new?", answer: "very old", wrong: ["new", "made today"], answeredBy: "very old", visual: { type: "source", image: "cma-child-with-drum" } },
  { type: "choice", prompt: "What does this photo show?", answer: "a child", wrong: ["a dog", "a car"], answeredBy: "a child", visual: { type: "source", image: "cma-child-with-drum" } },
];
const sourceSorts = [{
  type: "sort", prompt: "What can you see in the photo?",
  bins: [{ id: "yes", label: "In the photo" }, { id: "no", label: "Not in the photo" }],
  cards: [["a drum", "yes"], ["drumsticks", "yes"], ["a tablet", "no"]],
  answeredBy: ["a drum", "drumsticks"], visual: { type: "source", image: "cma-child-with-drum" },
}];
const sourceOrders = [{
  type: "order", prompt: "Which came first?", labels: ["this photo", "you"],
  answeredBy: "very, very old", visual: { type: "source", image: "cma-child-with-drum" },
}];

export const HISTORY_TEST_TOPIC = {
  year: 1,
  references: ["Test fixture only."],
  levels: {
    1: { story, rounds: ["choices", "sorts", "choices", "orders"] },
    2: { story, rounds: ["orders", "choices", "sorts", "choices"] },
    3: { story: sourceStory, rounds: ["photo", "sourceSorts", "photo", "sourceOrders"] },
    4: { story, rounds: ["choices", "choices", "sorts", "orders"] },
  },
  banks: { choices, sorts, orders, photo, sourceSorts, sourceOrders },
};
```

- [ ] **Step 2: Write the failing test** — `src/data/challenges/history/engine.test.js`

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { lintBuild, seededRng } from "../questionKinds.js";
import { HISTORY_AGE, HISTORY_TITLES, buildHistoryTopic, lintHistoryTopic } from "./engine.js";
import { HISTORY_TEST_TOPIC as topic } from "./testTopic.js";

const { images } = JSON.parse(readFileSync(new URL("../../../assets/history/manifest.json", import.meta.url), "utf8"));
const build = buildHistoryTopic(topic);
const questionsOnly = (level, rng) => build(level, rng).questions;
const clone = () => structuredClone(topic);

test("builds a story and the year's number of fair questions, from the rng only", () => {
  for (const level of [1, 2, 3, 4]) {
    const run = build(level, seededRng(3));
    assert.equal(run.story, topic.levels[level].story);
    assert.equal(run.questions.length, HISTORY_AGE[1].rounds);
    assert.deepEqual(run, build(level, seededRng(3)));
  }
  assert.deepEqual(lintBuild(questionsOnly, { year: 1, titles: HISTORY_TITLES[1], minQuestions: 4 }), []);
});

test("every choice offers the year's number of options", () => {
  for (let seed = 1; seed <= 20; seed++) for (const q of build(1, seededRng(seed)).questions) {
    if (q.kind === "choice") assert.equal(q.options.length, HISTORY_AGE[1].options);
  }
});

test("source rounds keep their picture", () => {
  const q = build(3, seededRng(1)).questions.find((x) => x.visual?.type === "source");
  assert.deepEqual(q.visual, { type: "source", image: "cma-child-with-drum" });
});

test("the test topic itself is sound", () => {
  assert.deepEqual(lintHistoryTopic(topic, { images }), []);
});

test("lint: story too long, sentence too long, missing picture", () => {
  const t = clone();
  t.levels[1].story = { lines: ["one two three four five six seven eight nine ten eleven.", ...Array(4).fill("a b c d e f g")] };
  const problems = lintHistoryTopic(t, { images });
  assert.ok(problems.some((p) => p.includes("level 1: story has 39 words (max 30)")), problems.join("\n"));
  assert.ok(problems.some((p) => p.includes("level 1: sentence too long")));
  assert.ok(problems.some((p) => p.includes("level 1: story needs an image or a picture with a label")));
});

test("lint: an answer the card does not give is caught", () => {
  const t = clone();
  t.banks.choices[0].answeredBy = "made of gold";
  assert.ok(lintHistoryTopic(t, { images }).some((p) => p.includes('"made of gold" is not on the story card or picture')));
});

test("lint: unknown images, thin banks, few round types, wrong round count", () => {
  const t = clone();
  t.levels[3].story.image = "nope";
  t.banks.photo[0].visual.image = "nope";
  t.levels[1].rounds = ["choices", "choices", "choices", "choices", "choices"];
  t.banks.choices = t.banks.choices.slice(0, 2);
  const problems = lintHistoryTopic(t, { images });
  assert.ok(problems.some((p) => p.includes('level 3: unknown image "nope"')));
  assert.ok(problems.some((p) => p.includes('bank "photo" #1: unknown image "nope"')));
  assert.ok(problems.some((p) => p.includes("level 1: needs 4 rounds")));
  assert.ok(problems.some((p) => p.includes('bank "choices" has 2 templates but is drawn 5 times')));
  assert.ok(problems.some((p) => p.includes("only 2 templates to draw from (min 6)")));
  const plain = clone();
  for (const level of [1, 2, 3, 4]) plain.levels[level].rounds = ["choices", "choices", "choices", "choices"];
  assert.ok(lintHistoryTopic(plain, { images }).some((p) => p.includes("only 1 round types across the topic (min 3)")));
});

test("lint: no references, unknown year", () => {
  assert.ok(lintHistoryTopic({ ...clone(), references: [] }, { images }).includes("no references"));
  assert.deepEqual(lintHistoryTopic({ ...clone(), year: 9 }, { images }), ["unknown year 9"]);
});
```

- [ ] **Step 3: Run to see it fail**

Run: `node --test src/data/challenges/history/engine.test.js`
Expected: FAIL, `Cannot find module './engine.js'`.

- [ ] **Step 4: Implement** — `src/data/challenges/history/engine.js`

```js
import { makeQuestion } from "../year1Science/engine.js";
import { shuffle } from "../year1Math/shared.js";

/**
 * A History topic is a story card and a bank of question templates per level
 * (docs/history-curriculum/shared-design-spec.md §3–4):
 *
 *   { year, references, levels: { 1: { story, rounds: [bankName × n] }, … }, banks }
 *
 * `story` is { lines: [one sentence each], image? } or { lines, picture,
 * pictureLabel }. Templates are the Year 1 Science template types (choice,
 * sort, order; see ../year1Science/engine.js) plus `answeredBy`: the phrase(s)
 * on the story card, or in the source picture's alt text, that answer it.
 * `lintHistoryTopic` checks those phrases are really there, so a child can
 * always find the answer instead of guessing.
 *
 * Runs draw templates without replacement; randomness comes only from `rng`.
 */
export const HISTORY_AGE = {
  1: { storyWords: 30, sentenceWords: 10, rounds: 4, minBank: 6, options: 3 },
  2: { storyWords: 45, sentenceWords: 12, rounds: 5, minBank: 7, options: 3 },
  3: { storyWords: 60, sentenceWords: 16, rounds: 5, minBank: 7, options: 3 },
  4: { storyWords: 70, sentenceWords: 18, rounds: 5, minBank: 7, options: 3 },
};

export const HISTORY_TITLES = {
  1: ["Meet it", "Old or new?", "Picture detective", "Same or different?"],
  2: ["Meet it", "Long ago or now?", "History detective", "Compare and remember"],
  3: ["Meet it", "When was it?", "History detective", "Think like a historian"],
  4: ["Meet it", "When was it?", "History detective", "Think like a historian"],
};

const words = (text) => String(text).split(/\s+/).filter(Boolean);
const phrases = (answeredBy) => [answeredBy].flat().filter((p) => typeof p === "string" && p.trim() !== "");

export function buildHistoryTopic(topic) {
  const age = HISTORY_AGE[topic.year];
  if (!age) throw new Error(`no History age settings for year ${topic.year}`);
  return (level, rng) => {
    const plan = topic.levels[level];
    if (!plan) throw new Error(`no level ${level}`);
    const decks = {};
    const draw = (name) => {
      if (!topic.banks[name]) throw new Error(`unknown bank "${name}"`);
      decks[name] ??= shuffle(rng, topic.banks[name]);
      const next = decks[name].shift();
      if (!next) throw new Error(`bank "${name}" ran out`);
      return next;
    };
    const questions = plan.rounds.map((name) => makeQuestion({ count: age.options, ...draw(name) }, rng, level));
    return { story: plan.story, questions };
  };
}

/** Everything that would make a topic unfair for its year, as short strings. */
export function lintHistoryTopic(topic, { images = {} } = {}) {
  const age = HISTORY_AGE[topic?.year];
  if (!age) return [`unknown year ${topic?.year}`];
  const problems = [];
  const need = (ok, message) => { if (!ok) problems.push(message); };
  need(Array.isArray(topic.references) && topic.references.length > 0, "no references");
  const types = new Set();

  for (const level of [1, 2, 3, 4]) {
    const plan = topic.levels?.[level];
    const at = (message) => `level ${level}: ${message}`;
    if (!plan) { problems.push(at("missing")); continue; }

    const story = plan.story ?? {};
    const lines = Array.isArray(story.lines) ? story.lines : [];
    need(lines.length > 0 && lines.every((line) => typeof line === "string" && line.trim() !== ""), at("story needs lines"));
    const text = lines.join(" ");
    const count = words(text).length;
    need(count <= age.storyWords, at(`story has ${count} words (max ${age.storyWords})`));
    for (const line of lines) need(words(line).length <= age.sentenceWords, at(`sentence too long: "${line}"`));
    need(Boolean(story.image) || (Boolean(story.picture) && Boolean(story.pictureLabel)), at("story needs an image or a picture with a label"));
    if (story.image) need(Boolean(images[story.image]), at(`unknown image "${story.image}"`));

    const rounds = Array.isArray(plan.rounds) ? plan.rounds : [];
    need(rounds.length === age.rounds, at(`needs ${age.rounds} rounds`));
    const uses = {};
    for (const name of rounds) uses[name] = (uses[name] ?? 0) + 1;

    let pool = 0;
    for (const [name, drawn] of Object.entries(uses)) {
      const bank = topic.banks?.[name];
      if (!Array.isArray(bank)) { problems.push(at(`unknown bank "${name}"`)); continue; }
      need(bank.length >= drawn, at(`bank "${name}" has ${bank.length} templates but is drawn ${drawn} times`));
      pool += bank.length;
      bank.forEach((template, i) => {
        const where = at(`bank "${name}" #${i + 1}`);
        if (typeof template !== "object" || template === null) { problems.push(`${where}: not a template object`); return; }
        types.add(template.type);
        const sourceId = template.visual?.type === "source" ? template.visual.image : null;
        const source = sourceId ? images[sourceId] : null;
        if (sourceId) need(Boolean(source), `${where}: unknown image "${sourceId}"`);
        const found = phrases(template.answeredBy);
        need(found.length > 0, `${where}: no answeredBy`);
        const haystack = `${text} ${source?.alt ?? ""} ${images[story.image]?.alt ?? ""}`.toLowerCase();
        for (const phrase of found) need(haystack.includes(phrase.toLowerCase()), `${where}: "${phrase}" is not on the story card or picture`);
      });
    }
    need(pool >= age.minBank, at(`only ${pool} templates to draw from (min ${age.minBank})`));
  }

  need(types.size >= 3, `only ${types.size} round types across the topic (min 3)`);
  return problems;
}
```

- [ ] **Step 5: Run the tests**

Run: `node --test src/data/challenges/history/engine.test.js`
Expected: PASS (8 tests).

If "story has 39 words" differs, recount the fixture line in the test (11 + 4 × 7 = 39)
rather than loosening the engine.

- [ ] **Step 6: Commit**

```bash
git add src/data/challenges/history
git commit -m "feat(history): story-card topic engine with answerability lint"
```

---

### Task 5: History challenge UI

**Files:**
- Create: `src/components/challenge/history/historyImages.js`
- Create: `src/components/challenge/history/StoryCard.jsx`
- Create: `src/components/challenge/history/SourceVisual.jsx`
- Create: `src/components/challenge/history/HistoryVisual.jsx`
- Create: `src/components/challenge/history/HistoryChallenge.jsx`
- Create: `src/components/challenge/history/history.css`
- Create: `tests/components/history.test.jsx`

**Interfaces:**
- Consumes: `buildHistoryTopic`, `HISTORY_TITLES`, `HISTORY_TEST_TOPIC` (Task 4);
  `src/assets/history/manifest.json` (Task 3); `DataChallenge` (unchanged);
  `SpeakButton({ text, compact, label })`; `Mascot({ className, decorative })`.
- Produces:
  - `historyImage(id) → { id, src, file, title, creator, date, institution, objectUrl, licence, alt, credit } | null`
  - `<HistoryChallenge build year level onComplete />` where `build` is a
    `buildHistoryTopic` result. Wrappers (Task 6) render it via a per-year game.

- [ ] **Step 1: Write the failing tests** — `tests/components/history.test.jsx`

```jsx
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import { buildHistoryTopic } from "../../src/data/challenges/history/engine";
import { HISTORY_TEST_TOPIC } from "../../src/data/challenges/history/testTopic";
import { seededRng } from "../../src/data/challenges/questionKinds";
import HistoryChallenge from "../../src/components/challenge/history/HistoryChallenge";
import SourceVisual from "../../src/components/challenge/history/SourceVisual";

vi.mock("../../src/utils/speech", () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: vi.fn(async () => {}), isNarrationSupported: () => false }));
vi.mock("../../src/components/celebration/sound/player", () => ({ playCue: () => () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {} }));
vi.mock("../../src/components/celebration/fx/effects", () => ({ playEffect: () => {} }));

const build = buildHistoryTopic(HISTORY_TEST_TOPIC);
const show = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);
afterEach(() => { vi.restoreAllMocks(); vi.useRealTimers(); document.body.classList.remove("dark"); });
const settle = () => act(() => { vi.advanceTimersByTime(1000); });

describe("HistoryChallenge", () => {
  it("opens on Bix's story, then starts the rounds", () => {
    show(<HistoryChallenge build={build} year={1} level={1} onComplete={vi.fn()} />);
    expect(screen.getByRole("region", { name: "Bix's story" })).toBeTruthy();
    expect(screen.getByText("Grandparents had wooden trains.")).toBeTruthy();
    expect(screen.queryByText("Question 1 of 4")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Let's go!" }));
    expect(screen.getByText("Question 1 of 4")).toBeTruthy();
    expect(screen.getByText("Meet it")).toBeTruthy();
  });

  it("keeps the chosen answer while the story opens and closes", () => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockImplementation(seededRng(4));
    const expected = build(1, seededRng(4)).questions;
    show(<HistoryChallenge build={build} year={1} level={1} onComplete={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: "Let's go!" }));
    const first = expected[0];
    expect(first.kind).toBe("choice");
    fireEvent.click(screen.getByRole("button", { name: first.answer, exact: true }));
    const toggle = screen.getByRole("button", { name: "📖 Bix's story" });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByRole("region", { name: "Bix's story" })).toBeTruthy();
    fireEvent.click(toggle);
    fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
    settle();
    expect(screen.getByText("Question 2 of 4")).toBeTruthy();
  });

  it("draws a source round's photo with its alt text and credit, in both themes", () => {
    for (const theme of ["light", "dark"]) {
      document.body.classList.toggle("dark", theme === "dark");
      const { unmount } = show(<HistoryChallenge build={build} year={1} level={3} onComplete={vi.fn()} />);
      expect(screen.getByRole("img", { name: /holding a drum and two drumsticks/ })).toBeTruthy();
      fireEvent.click(screen.getByRole("button", { name: "Let's go!" }));
      expect(screen.getAllByRole("img", { name: /holding a drum/ }).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Cleveland Museum of Art, CC0/).length).toBeGreaterThan(0);
      unmount();
    }
  });
});

describe("SourceVisual", () => {
  it("an unknown picture shows a note instead of crashing", () => {
    show(<SourceVisual image="no-such-picture" />);
    expect(screen.getByRole("note").textContent).toMatch(/picture could not load/i);
  });

  it("links the credits page", () => {
    show(<SourceVisual image="cma-two-children-with-toys" />);
    const figure = screen.getByRole("figure");
    expect(within(figure).getByRole("link", { name: "All credits" }).getAttribute("href")).toBe("/credits");
  });
});
```

- [ ] **Step 2: Run to see it fail**

Run: `npx vitest run tests/components/history.test.jsx`
Expected: FAIL, cannot resolve `HistoryChallenge`.

- [ ] **Step 3: Image lookup** — `src/components/challenge/history/historyImages.js`

```js
import manifest from "../../../assets/history/manifest.json";

// Vite turns each WebP into a hashed URL. Built by scripts/history-assets/fetch.mjs.
const FILES = import.meta.glob("../../../assets/history/images/*.webp", { eager: true, import: "default" });

/** The picture for an id, or null when it is unknown or its file is missing. */
export function historyImage(id) {
  const entry = manifest.images[id];
  const src = entry && FILES[`../../../assets/history/images/${entry.file}`];
  return src ? { ...entry, id, src } : null;
}
```

- [ ] **Step 4: Source picture** — `src/components/challenge/history/SourceVisual.jsx`

```jsx
import { Link } from "react-router";
import { historyImage } from "./historyImages";
import "./history.css";

/** A real historical source: the photo, then who made and kept it. */
export default function SourceVisual({ image }) {
  const picture = historyImage(image);
  if (!picture) {
    return <p className="history-source-missing" role="note">Sorry, this picture could not load. Ask a grown-up for help.</p>;
  }
  return (
    <figure className="history-source">
      <img className="history-source-img" src={picture.src} alt={picture.alt} />
      <figcaption className="history-source-credit">
        {picture.credit} · <Link to="/credits">All credits</Link>
      </figcaption>
    </figure>
  );
}
```

- [ ] **Step 5: Story card** — `src/components/challenge/history/StoryCard.jsx`

```jsx
import Mascot from "../../mascot/Mascot";
import SpeakButton from "../SpeakButton";
import SourceVisual from "./SourceVisual";
import "./history.css";

/** Bix explains: the few sentences every question in this challenge is answered from. */
export default function StoryCard({ story }) {
  return (
    <section className="history-story" aria-label="Bix's story">
      <div className="history-story-head">
        <Mascot className="mascot-small" decorative />
        <p className="history-story-heading">Bix explains</p>
        <SpeakButton text={story.lines.join(" ")} compact label="Read Bix's story" />
      </div>
      {story.image
        ? <SourceVisual image={story.image} />
        : <span className="history-story-picture" role="img" aria-label={story.pictureLabel}>{story.picture}</span>}
      {story.lines.map((line) => <p key={line} className="history-story-line">{line}</p>)}
    </section>
  );
}
```

- [ ] **Step 6: Round visual** — `src/components/challenge/history/HistoryVisual.jsx`

```jsx
import { useState } from "react";
import StoryCard from "./StoryCard";
import SourceVisual from "./SourceVisual";

/**
 * DataChallenge's renderVisual for History. The story button lives here so it
 * sits inside the round, and its open/closed state is separate from the
 * answer the child has chosen.
 */
export default function HistoryVisual({ story, visual }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="history-story-toggle">
        <button type="button" className="history-story-button" aria-expanded={open} onClick={() => setOpen((was) => !was)}>
          📖 Bix's story
        </button>
        {open && <StoryCard story={story} />}
      </div>
      {visual?.type === "source" && <SourceVisual image={visual.image} />}
    </>
  );
}
```

- [ ] **Step 7: The challenge** — `src/components/challenge/history/HistoryChallenge.jsx`

```jsx
import { useCallback, useMemo, useState } from "react";
import DataChallenge from "../data/DataChallenge";
import { HISTORY_TITLES } from "../../../data/challenges/history/engine";
import StoryCard from "./StoryCard";
import HistoryVisual from "./HistoryVisual";
import "./history.css";

/**
 * Story first, then the rounds (docs/history-curriculum/shared-design-spec.md §4).
 * The run is built once per mount; DataChallenge gets a stable builder that
 * returns that same run, so it never re-randomises. Progress is untouched:
 * DataChallenge → ChallengeShell calls onComplete exactly as everywhere else.
 */
export default function HistoryChallenge({ build, year, level, onComplete }) {
  const run = useMemo(() => build(level, Math.random), [build, level]);
  const questions = useCallback(() => run.questions, [run]);
  const renderVisual = useCallback((q) => <HistoryVisual story={run.story} visual={q.visual} />, [run]);
  const [started, setStarted] = useState(false);
  const titles = HISTORY_TITLES[year];

  if (!started) {
    return (
      <div className="challenge-container history-story-phase">
        <h3 className="challenge-title">{titles[level - 1]}</h3>
        <StoryCard story={run.story} />
        <button type="button" className="submit-btn history-start" onClick={() => setStarted(true)}>Let's go!</button>
      </div>
    );
  }
  return <DataChallenge level={level} build={questions} titles={titles} renderVisual={renderVisual} readAloud onComplete={onComplete} />;
}
```

- [ ] **Step 8: Styles** — `src/components/challenge/history/history.css`

```css
/* History story card and sources. Colours only from the kit's --ck-* tokens,
   which follow the --light-* / --dark-* theme tokens (challenge-kit.css). */
.history-story {
  background: var(--ck-panel);
  color: var(--ck-text);
  border: 2px solid var(--ck-border);
  border-radius: 18px;
  padding: 1rem 1.1rem;
  margin: 0.75rem 0 1rem;
}
.history-story-head {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.history-story-heading {
  margin: 0;
  font-weight: 800;
  font-size: 1.15rem;
  flex: 1;
}
.history-story-picture {
  display: block;
  text-align: center;
  font-size: clamp(3rem, 14vw, 4.5rem);
  line-height: 1.2;
  margin: 0.5rem 0;
}
.history-story-line {
  font-size: clamp(1.15rem, 4.5vw, 1.35rem);
  line-height: 1.5;
  margin: 0.4rem 0;
  overflow-wrap: anywhere;
}
.history-start {
  width: 100%;
  min-height: 56px;
  font-size: 1.25rem;
}
.history-story-toggle {
  margin: 0.25rem 0 0.75rem;
}
.history-story-button {
  min-height: 48px;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: 2px solid var(--ck-border);
  background: var(--ck-muted);
  color: var(--ck-text);
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}
.history-story-button:focus-visible {
  outline: 3px solid var(--ck-accent);
  outline-offset: 2px;
}
.history-source {
  margin: 0.5rem auto;
  max-width: 420px;
  text-align: center;
}
.history-source-img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 12px;
  border: 2px solid var(--ck-border);
}
.history-source-credit {
  font-size: 0.85rem;
  margin-top: 0.35rem;
  color: var(--ck-text);
  opacity: 0.85;
}
.history-source-credit a {
  color: inherit;
}
.history-source-missing {
  padding: 0.75rem;
  border: 2px dashed var(--ck-border);
  border-radius: 12px;
  color: var(--ck-text);
  text-align: center;
}
```

- [ ] **Step 9: Run the tests**

Run: `npx vitest run tests/components/history.test.jsx`
Expected: PASS (5 tests).

- [ ] **Step 10: Lint, full tests, commit**

Run: `npm run lint && npm test`
Expected: PASS.

```bash
git add src/components/challenge/history tests/components/history.test.jsx
git commit -m "feat(history): story card, source pictures and HistoryChallenge"
```

---

### Task 6: Pilot topic, Toys Then and Now

**Files:**
- Create: `src/data/challenges/history/year1/toysThenAndNow.js`
- Create: `src/data/challenges/history/year1/index.js`
- Create: `src/data/challenges/history/year1/year1History.test.js`
- Create: `src/pages/skills/history/challenges/year1/Year1HistoryGame.jsx`
- Create: `src/pages/skills/history/challenges/year1/toys-then-and-now/ToysThenAndNowChallenge1.jsx` … `4.jsx`
- Modify: `tests/components/history.test.jsx` (playthrough)

**Interfaces:**
- Consumes: `buildHistoryTopic`, `lintHistoryTopic`, `HISTORY_AGE`, `HISTORY_TITLES`
  (Task 4); `HistoryChallenge` (Task 5); image ids (Task 3).
- Produces: `YEAR1_HISTORY_TOPICS: { [topicId]: topic }`,
  `YEAR1_HISTORY_BUILDERS: { [topicId]: build }`;
  `<Year1HistoryGame topicId level onComplete />`.

Content boundary (Year 1 spec §3, topic 1, and the KS1 mapping row): grandparents'
toys (wood, tin, marbles, tops) and toys today (plastic, batteries), with two 1850s
photos as "long ago" sources in slot 3. Every answer is on its card or in its photo's
alt text; the lint enforces it.

- [ ] **Step 1: Write the failing test** — `src/data/challenges/history/year1/year1History.test.js`

```js
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { initialResponse, isCorrect, isReady, lintBuild, seededRng } from "../../questionKinds.js";
import { HISTORY_AGE, HISTORY_TITLES, lintHistoryTopic } from "../engine.js";
import { year1HistoryCurriculum } from "../../../year1HistoryCurriculum.js";
import { YEAR1_HISTORY_BUILDERS as builders, YEAR1_HISTORY_TOPICS as topicData } from "./index.js";

const { images } = JSON.parse(readFileSync(new URL("../../../../assets/history/manifest.json", import.meta.url), "utf8"));
const knownIds = new Set(year1HistoryCurriculum.flatMap((c) => c.topics.map((t) => t.id)));
const age = HISTORY_AGE[1];

function correctResponse(q) {
  if (q.kind === "sort") return Object.fromEntries(q.cards.map((c) => [c.id, c.bin]));
  if (q.kind === "order") return q.answer.map((id) => q.items.find((item) => item.id === id));
  return q.answer;
}

test("Year 1 History: every built topic is a real dataset topic and passes the History lint", () => {
  assert.ok(Object.keys(builders).length >= 1);
  for (const [id, topic] of Object.entries(topicData)) {
    assert.ok(knownIds.has(id), id);
    assert.equal(topic.year, 1);
    assert.deepEqual(lintHistoryTopic(topic, { images }), [], id);
  }
});

test("Year 1 History: fair questions, from the rng only, and runs vary", () => {
  for (const [id, build] of Object.entries(builders)) {
    const questions = (level, rng) => build(level, rng).questions;
    assert.deepEqual(lintBuild(questions, { year: 1, titles: HISTORY_TITLES[1], seeds: 100, minQuestions: age.rounds }), [], id);
    for (let level = 1; level <= 4; level++) {
      assert.deepEqual(build(level, seededRng(17)), build(level, seededRng(17)), `${id} ${level}: randomness only from rng`);
      assert.notDeepEqual(JSON.stringify(build(level, seededRng(1))), JSON.stringify(build(level, seededRng(456))), `${id} ${level}: identical replays`);
      for (const q of build(level, seededRng(17)).questions) assert.equal(isCorrect(q, initialResponse(q)), false, `${id}: starts at the answer`);
    }
  }
});

test("Year 1 History: no question repeats within a run, and every one accepts its answer", () => {
  for (const [id, build] of Object.entries(builders)) for (let level = 1; level <= 4; level++) for (let seed = 1; seed <= 40; seed++) {
    const run = build(level, seededRng(seed)).questions;
    const keys = run.map((q) => JSON.stringify([q.prompt, q.answer, q.bins, q.visual]));
    assert.equal(new Set(keys).size, keys.length, `${id} level ${level} seed ${seed}: repeated question`);
    for (const q of run) {
      assert.equal(isReady(q, correctResponse(q)), true, id);
      assert.equal(isCorrect(q, correctResponse(q)), true, id);
    }
  }
});

test("Year 1 History: every built topic has four wrappers that forward completion", () => {
  for (const id of Object.keys(builders)) for (const level of [1, 2, 3, 4]) {
    const name = id.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join("");
    const file = new URL(`../../../../pages/skills/history/challenges/year1/${id}/${name}Challenge${level}.jsx`, import.meta.url);
    assert.ok(existsSync(file), file.pathname);
    const source = readFileSync(file, "utf8");
    assert.ok(source.includes(`level={${level}}`) && source.includes(`topicId="${id}"`) && source.includes("onComplete={onComplete}"), file.pathname);
  }
});
```

- [ ] **Step 2: Run to see it fail**

Run: `node --test src/data/challenges/history/year1/year1History.test.js`
Expected: FAIL, `Cannot find module './index.js'`.

- [ ] **Step 3: Write the topic** — `src/data/challenges/history/year1/toysThenAndNow.js`

```js
// Year 1 History, Toys Then and Now (docs/curriculum/key-stage-1-history.md,
// "changes within living memory"; docs/history-curriculum/year-1-design-spec.md).
// Every template names the words on its story card or photo that answer it.

const photo1 = { type: "source", image: "cma-two-children-with-toys" };
const photo2 = { type: "source", image: "cma-child-with-drum" };

/* ---------- Level 1: Meet it ---------- */
const meetStory = {
  lines: [
    "Grandparents were children a long time ago.",
    "Many of their toys were wood or tin.",
    "They played marbles and spun tops.",
    "Today many toys are plastic or use batteries.",
  ],
  picture: "🧸", pictureLabel: "a teddy bear",
};
const facts = [
  { type: "choice", prompt: "What were many old toys made of?", answer: "wood", wrong: ["glass", "paper"], answeredBy: "wood or tin", hint: "Bix said old toys were **wood** or tin." },
  { type: "choice", prompt: "Which game did grandparents play?", answer: "marbles", wrong: ["video games", "tablet games"], answeredBy: "played marbles", hint: "Look for the word **marbles**." },
  { type: "choice", prompt: "What did grandparents spin?", answer: "tops", wrong: ["phones", "screens"], answeredBy: "spun tops", hint: "They **spun tops**." },
  { type: "choice", prompt: "What are many toys made of today?", answer: "plastic", wrong: ["stone", "bone"], answeredBy: "plastic", hint: "Today many toys are **plastic**." },
  { type: "choice", prompt: "What do many toys use today?", answer: "batteries", wrong: ["coal", "candles"], answeredBy: "use batteries", hint: "They use **batteries**." },
  { type: "choice", prompt: "When were grandparents children?", answer: "a long time ago", wrong: ["last week", "today"], answeredBy: "a long time ago", hint: "It was **a long time ago**." },
];
const thenOrNow = [{
  type: "sort", prompt: "Was it a toy from long ago, or today?",
  bins: [{ id: "then", label: "Long ago" }, { id: "now", label: "Today" }],
  cards: [["wooden toy", "then"], ["tin toy", "then"], ["spinning top", "then"], ["plastic toy", "now"], ["toy with batteries", "now"]],
  answeredBy: ["wood or tin", "spun tops", "plastic or use batteries"],
  hint: "Long ago: wood and tin. Today: plastic and batteries.",
}];

/* ---------- Level 2: Old or new? ---------- */
const trainStory = {
  lines: [
    "Toys change over time.",
    "Grandparents had wooden trains.",
    "Your grown-ups had plastic trains.",
    "Today some trains flash, beep and use an app.",
    "Teddy bears were loved then and now!",
  ],
  picture: "🚂", pictureLabel: "a toy train",
};
const oldNew = [
  { type: "choice", prompt: "Which train is the oldest?", answer: "wooden train", wrong: ["plastic train", "train with an app"], answeredBy: "Grandparents had wooden trains", hint: "Grandparents had the **oldest** one." },
  { type: "choice", prompt: "Which train is the newest?", answer: "train with an app", wrong: ["wooden train", "plastic train"], answeredBy: "use an app", hint: "Which one is from **today**?" },
  { type: "choice", prompt: "Which toy was loved then and now?", answer: "teddy bear", wrong: ["tablet", "games console"], answeredBy: "Teddy bears were loved then and now", hint: "Bix said **then and now**." },
  { type: "choice", prompt: "Who had plastic trains?", answer: "your grown-ups", wrong: ["grandparents", "children long, long ago"], answeredBy: "Your grown-ups had plastic trains", hint: "Look for **plastic trains**." },
  { type: "choice", prompt: "Do toys change over time?", answer: "yes", wrong: ["no"], answeredBy: "Toys change over time", hint: "Bix's first sentence tells you." },
];
const trainOrder = [
  { type: "order", prompt: "Put the trains in order. Oldest first.", labels: ["wooden train", "plastic train", "train with an app"], answeredBy: ["wooden trains", "plastic trains", "use an app"], hint: "Grandparents, then grown-ups, then today." },
  { type: "order", prompt: "Who played first? Put them in order.", labels: ["grandparents", "your grown-ups", "children today"], answeredBy: ["Grandparents had", "Your grown-ups had", "Today"], hint: "Grandparents are the oldest." },
];

/* ---------- Level 3: Picture detective ---------- */
const photoStory = {
  lines: [
    "This photo is very, very old.",
    "It was taken before your grandparents were born.",
    "Old photos show us toys from long ago.",
    "Look closely, like a detective!",
  ],
  image: "cma-two-children-with-toys",
};
const photos = [
  { type: "choice", prompt: "What toy sits in the wooden cart?", answer: "a doll", wrong: ["a teddy bear", "a robot"], answeredBy: "A doll sits in a wooden cart", visual: photo1, hint: "Look inside the cart." },
  { type: "choice", prompt: "What does the cart have?", answer: "wheels", wrong: ["a screen", "a button"], answeredBy: "wheels", visual: photo1, hint: "How does a cart move?" },
  { type: "choice", prompt: "What toy is the child holding?", answer: "a drum", wrong: ["a ball", "a kite"], answeredBy: "holding a drum", visual: photo2, hint: "You bang it with sticks." },
  { type: "choice", prompt: "What does the child use to play it?", answer: "drumsticks", wrong: ["a remote control", "a phone"], answeredBy: "drumsticks", visual: photo2, hint: "Look at the child's hands." },
  { type: "choice", prompt: "How do we know about toys from long ago?", answer: "from old photos", wrong: ["from a video game", "we can't know"], answeredBy: "Old photos show us toys", hint: "Bix told you what shows us." },
  { type: "choice", prompt: "Is this photo old or new?", answer: "very old", wrong: ["new", "taken today"], answeredBy: "very, very old", visual: photo1, hint: "Look at Bix's first sentence." },
  { type: "choice", prompt: "Can this photo tell us the children's names?", answer: "no", wrong: ["yes"], answeredBy: "two children", visual: photo1, hint: "Can you see any names written?" },
];

/* ---------- Level 4: Same or different? ---------- */
const compareStory = {
  lines: [
    "Toys today are different from long ago.",
    "Many are plastic, and some need batteries.",
    "But some things are the same.",
    "Children still love dolls, drums and teddy bears.",
  ],
  picture: "🥁", pictureLabel: "a drum",
};
const sameDifferent = [{
  type: "sort", prompt: "Is it the same as long ago, or different now?",
  bins: [{ id: "same", label: "Same as long ago" }, { id: "different", label: "Different now" }],
  cards: [["children love dolls", "same"], ["children love drums", "same"], ["children love teddy bears", "same"], ["many toys are plastic", "different"], ["some toys need batteries", "different"]],
  answeredBy: ["still love dolls, drums and teddy bears", "Many are plastic", "need batteries"],
  hint: "Children **still** love some toys. That is the same.",
}];
const compare = [
  { type: "choice", prompt: "What is the same then and now?", answer: "children love dolls", wrong: ["toys need batteries", "toys are plastic"], answeredBy: "still love dolls", hint: "Look for the word **still**." },
  { type: "choice", prompt: "What is different about many toys today?", answer: "they are plastic", wrong: ["children love them", "they are drums"], answeredBy: "Many are plastic", hint: "What are many toys made of today?" },
  { type: "choice", prompt: "Which toys need batteries?", answer: "some toys today", wrong: ["a wooden top", "a drum long ago"], answeredBy: "some need batteries", hint: "Batteries are new." },
  { type: "choice", prompt: "Do children still love teddy bears?", answer: "yes", wrong: ["no"], answeredBy: "teddy bears", hint: "Bix's last sentence tells you." },
  { type: "choice", prompt: "Are toys today just like long ago?", answer: "some things are the same", wrong: ["everything is the same", "nothing is the same"], answeredBy: "some things are the same", hint: "Some are the same. Some are different." },
  { type: "choice", prompt: "Which toy did children love long ago and today?", answer: "a drum", wrong: ["a games console", "a tablet"], answeredBy: "drums", hint: "Remember the old photo!" },
];

export const toysThenAndNow = {
  year: 1,
  references: [
    "V&A Young V&A (Museum of Childhood) collection: toys from the 1950s–1970s (wooden, tin, plastic).",
    "Cleveland Museum of Art 2002.32 and 2002.33: daguerreotypes of children with toys, 1850s.",
    "BBC Bitesize KS1 History: toys in the past.",
  ],
  levels: {
    1: { story: meetStory, rounds: ["facts", "thenOrNow", "facts", "facts"] },
    2: { story: trainStory, rounds: ["oldNew", "trainOrder", "oldNew", "trainOrder"] },
    3: { story: photoStory, rounds: ["photos", "photos", "photos", "photos"] },
    4: { story: compareStory, rounds: ["sameDifferent", "compare", "compare", "compare"] },
  },
  banks: { facts, thenOrNow, oldNew, trainOrder, photos, sameDifferent, compare },
};
```

Note on photo templates in level 3: the card's own picture is photo1, so templates on
photo2 answer from photo2's alt text (the lint reads both).

- [ ] **Step 4: Index** — `src/data/challenges/history/year1/index.js`

```js
import { buildHistoryTopic } from "../engine.js";
import { toysThenAndNow } from "./toysThenAndNow.js";

// Year 1 History topics, keyed by dataset topic id. Add each topic here when
// all four of its challenges ship (release order: shared-design-spec.md §8).
export const YEAR1_HISTORY_TOPICS = {
  "toys-then-and-now": toysThenAndNow,
};

// Stable builders keep HistoryChallenge's mount-time randomisation from restarting.
export const YEAR1_HISTORY_BUILDERS = Object.fromEntries(
  Object.entries(YEAR1_HISTORY_TOPICS).map(([id, topic]) => [id, buildHistoryTopic(topic)])
);
```

- [ ] **Step 5: Game and wrappers**

`src/pages/skills/history/challenges/year1/Year1HistoryGame.jsx`:

```jsx
import HistoryChallenge from "../../../../../components/challenge/history/HistoryChallenge";
import { YEAR1_HISTORY_BUILDERS } from "../../../../../data/challenges/history/year1/index";

export default function Year1HistoryGame({ topicId, level, onComplete }) {
  return <HistoryChallenge build={YEAR1_HISTORY_BUILDERS[topicId]} year={1} level={level} onComplete={onComplete} />;
}
```

Four wrappers, `src/pages/skills/history/challenges/year1/toys-then-and-now/ToysThenAndNowChallenge1.jsx`
(and `2`, `3`, `4` with `level={2}`, `{3}`, `{4}`):

```jsx
import Year1HistoryGame from "../Year1HistoryGame";

export default function Challenge({ onComplete }) {
  return <Year1HistoryGame topicId="toys-then-and-now" level={1} onComplete={onComplete} />;
}
```

- [ ] **Step 6: Run the content tests**

Run: `node --test src/data/challenges/history/year1/year1History.test.js`
Expected: PASS. If the lint reports a word count or a missing phrase, fix the
**content** (shorten the line, or correct `answeredBy`), never the limits.

- [ ] **Step 7: Playthrough test** — append to `tests/components/history.test.jsx`

```jsx
import { YEAR1_HISTORY_BUILDERS } from "../../src/data/challenges/history/year1/index";

const challengeModules = import.meta.glob("../../src/pages/skills/history/challenges/year1/*/*Challenge*.jsx", { eager: true });

describe("Year 1 History pilot", () => {
  it("loads all four Toys Then and Now challenges", () => {
    const toys = Object.entries(challengeModules).filter(([path]) => path.includes("/toys-then-and-now/"));
    expect(toys).toHaveLength(4);
    for (const [, { default: Challenge }] of toys) {
      const { unmount } = show(<Challenge onComplete={vi.fn()} />);
      fireEvent.click(screen.getByRole("button", { name: "Let's go!" }));
      expect(screen.getByText("Question 1 of 4")).toBeTruthy();
      unmount();
    }
  });

  it("plays challenge 1 through: two misses show the hint, completion fires once", () => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockImplementation(seededRng(5));
    const expected = YEAR1_HISTORY_BUILDERS["toys-then-and-now"](1, seededRng(5)).questions;
    const done = vi.fn();
    const { default: Challenge } = challengeModules["../../src/pages/skills/history/challenges/year1/toys-then-and-now/ToysThenAndNowChallenge1.jsx"];
    show(<Challenge onComplete={done} />);
    fireEvent.click(screen.getByRole("button", { name: "Let's go!" }));
    const check = () => fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
    expected.forEach((q, i) => {
      expect(screen.getByText(`Question ${i + 1} of 4`)).toBeTruthy();
      if (q.kind === "choice") {
        if (i === 0) {
          const wrong = q.options.find((o) => o !== q.answer);
          for (let miss = 0; miss < 2; miss++) {
            fireEvent.click(screen.getByRole("button", { name: wrong, exact: true }));
            check();
          }
          expect(document.querySelector(".challenge-hint")).toBeTruthy();
        }
        fireEvent.click(screen.getByRole("button", { name: q.answer, exact: true }));
      } else {
        for (const card of q.cards) {
          fireEvent.click(screen.getByRole("button", { name: card.label, exact: true }));
          fireEvent.click(screen.getByRole("button", { name: q.bins.find((b) => b.id === card.bin).label, exact: true }));
        }
      }
      expect(done).not.toHaveBeenCalled();
      check();
      settle();
    });
    expect(done).toHaveBeenCalledTimes(1);
  });
});
```

(Move the new `import` line up with the other imports.)

Run: `npx vitest run tests/components/history.test.jsx`
Expected: PASS (7 tests). (The hint strikes the first wrong option only after the
second miss, so both misses can use the same option.)

- [ ] **Step 8: Lint, full tests, build, commit**

Run: `npm run lint && npm test && npm run build`
Expected: all PASS.

```bash
git add src/data/challenges/history/year1 src/pages/skills/history tests/components/history.test.jsx
git commit -m "feat(history): Year 1 pilot topic, Toys Then and Now"
```

---

### Task 7: Browser verification and records

**Files:**
- Modify: `docs/history-curriculum/HISTORY_TRACKER.md`
- Modify: `docs/PROJECT_KNOWLEDGE.md` (§4.2 data model, §5 what exists, §7 playbook)
- Modify: `docs/PROJECT_IDEAS.md` (History row, if one exists; otherwise add one as 🟡 In progress)

- [ ] **Step 1: Run the app**

Run: `npm run dev` and open the Vite URL.

- [ ] **Step 2: Check by hand, then record what you saw**

With a Year 1 child profile and no prior History progress:

1. `/curriculum`: History card appears with the brown look; Year 1 shows it available.
   Year 2–4 show History the way Geography appears (no curriculum yet).
2. Year 1 History page: five categories with their icons; topics 2–14 "Coming soon";
   Toys Then and Now challenge 1 playable; challenges 2–4 locked until 1 is done.
3. Challenge 1: story card, 🔊 reads it, "Let's go!", four rounds, "📖 Bix's story"
   opens and closes without losing a chosen answer, two misses show the hint,
   completion celebrates, progress shows after reload.
4. Challenge 3: both photos load with credits; "All credits" opens `/credits` and the
   History pictures section lists both.
5. Repeat 3–4 in dark theme, and at 320 px wide (devtools): no horizontal scroll,
   text readable, photo fits.
6. Existing Year 1 Maths, English and Science progress still shows unchanged.

If browser tooling is unavailable in an agent session, say so in the tracker instead
of claiming the check.

- [ ] **Step 3: Update the tracker**

In `HISTORY_TRACKER.md`: Current milestone "Year 1 pilot built; awaiting owner
review"; Built "1 year registered, 1 topic, 4 challenges"; Milestones rows for
registration/engine and Year 1 build updated with evidence; a Log entry listing what
shipped and what the browser check found; Documents table gains this plan.

- [ ] **Step 4: Update project docs**

`PROJECT_KNOWLEDGE.md`: History in §4.2 (`year1HistoryCurriculum`, story-card topic
shape, `historyProgress_year1`), §5 (Year 1 History: dataset registered, 1 of 14
topics built), §7 (add-a-subject notes: `CHILD_SUBJECTS`, subject looks, glyphs,
category icons, credits). `PROJECT_IDEAS.md`: History row to 🟡 In progress.

- [ ] **Step 5: Final verification and commit**

Run: `npm run lint && npm test && npm run build`
Expected: all PASS.

```bash
git add docs
git commit -m "docs(history): record Year 1 pilot and the History foundation"
```

**Stop here for owner review of the pilot** (shared spec §10). Plan 2 (Year 1 topics
2–14) is written after that review.
