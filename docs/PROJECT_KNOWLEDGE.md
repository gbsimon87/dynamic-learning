# 📖 Project Knowledge — Dynamic Learning App

> **⚠️ THIS DOCUMENT IS AI-MAINTAINED.**
>
> This project is maintained by an AI assistant (Claude Code). This file is the
> single source of truth for how the project is structured and why decisions were
> made.
>
> **The AI MUST update this document whenever:**
> - a new feature, skill game, or curriculum challenge is added
> - a routing, data-model, or folder-structure decision changes
> - a dependency is added or removed
> - a convention is established, changed, or retired
> - a known bug is discovered or fixed
>
> Updating this document is part of "done" — a change is not complete until this
> file reflects it. Also update [PROJECT_IDEAS.md](PROJECT_IDEAS.md) when an idea
> moves between statuses.

**Last reviewed:** 2026-08-09

---

## 1. What This Project Is

**Dynamic Learning** is an interactive web learning platform for primary-school
children (currently targeted at ~6-year-olds / **UK Year 2**). It teaches Maths,
English, Geometry and Geography through browser-based mini-games.

There are two distinct learning modes, and the distinction matters for every
decision made in this codebase:

| Mode | Purpose | Structure | Progress tracked? |
|---|---|---|---|
| **Skills Mode** | Free, unstructured practice. Pick any game, play anytime. | Flat list of standalone games | No |
| **Curriculum Mode** | Structured, sequential learning following the UK National Curriculum. | Category → Topic → Challenge, each unlocked in order | Yes, in `localStorage` |

---

## 2. Tech Stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | **React 19** | Function components + hooks only. No class components. |
| Build tool | **Vite 7** | `npm run dev` / `build` / `preview` |
| Routing | **react-router 7** | `createBrowserRouter` in [src/main.jsx](../src/main.jsx) |
| Styling | **Plain CSS** | One `.css` file co-located per component. No CSS framework, no CSS-in-JS. |
| Drag & drop | **@hello-pangea/dnd** | Used by ordering / sorting challenges |
| Maps | **leaflet** + **react-leaflet** + **@turf/turf** | GeoJSON served from `public/` |
| 3D | **three** (+ **tweakpane** for dev controls) | Solar System scene |
| Clock UI | **react-clock** | Clock Generator |
| Number words | **written-number** | Converts `42` → "forty-two" |
| Linting | **ESLint 9** flat config | `npm run lint` |

**No backend. No database. No auth. No test framework.** Everything is
client-side and state lives in `localStorage`.

### Scripts
```bash
npm run dev      # local dev server
npm run build    # production build
npm run lint     # eslint
npm run preview  # preview production build
```

---

## 3. Folder Structure

```
src/
├── main.jsx                  # Router definition — ALL routes registered here
├── App.css, index.css        # Global styles + CSS variables + light/dark themes
├── layouts/
│   └── RootLayout.jsx        # Navbar + <Outlet />
├── context/
│   └── ThemeContext.jsx      # Global light/dark theme
├── components/               # Shared, reusable pieces
│   ├── ui/Navbar.jsx
│   ├── ClockPanel.jsx, CountingNumbersPanel.jsx, DualLabelClock.jsx,
│   ├── MapGame.jsx, MultiplicationGrid.jsx, ShapeQuiz.jsx
├── data/
│   ├── year2MathCurriculum.js   # Curriculum tree (categories → topics)
│   └── cities.json
├── utils/
│   └── toKebabCase.js        # Generates the IDs used in URLs + storage keys
├── pages/
│   ├── home/Home.jsx
│   ├── skills/
│   │   ├── SkillsPage.jsx    # Skills hub — links to every skill game
│   │   ├── math/             # Skill games, grouped by subject
│   │   ├── english/
│   │   ├── geography/
│   │   └── math/challenges/year2/<topic-id>/<TopicName>ChallengeN.jsx
│   └── curriculum/
│       ├── CurriculumPage.jsx   # Category/topic/challenge grid + lock logic
│       ├── ProblemView.jsx      # Shell around one challenge; saves progress
│       └── Challenge.jsx        # Dynamic loader for the challenge component
public/
├── countries.geojson, continents.geojson
├── images/landmarks/*.webp
└── static/
```

**Convention:** every page/component lives in a folder alongside its own `.css`
file of the same name.

---

## 4. Architecture & Key Decisions

### 4.1 Routing
All routes are declared in a single flat list in [src/main.jsx](../src/main.jsx).
Skill games each get a top-level kebab-case route (`/word-builder`,
`/flag-finder`). The curriculum uses one dynamic route:

```
/year/:year/:subject/problem/:categoryId/:topicId/:challengeId
```

**Decision:** routes are flat rather than nested-by-subject, keeping URLs short
and child-friendly. New skill games must be registered in *both* `main.jsx` and
[SkillsPage.jsx](../src/pages/skills/SkillsPage.jsx).

### 4.2 Curriculum data model
[src/data/year2MathCurriculum.js](../src/data/year2MathCurriculum.js) exports a
tree built from a hand-written `rawCurriculum` array:

```
Category (e.g. "Number - Number and Place Value")
  └── Topic (e.g. "Numbers and Counting")
        └── Challenge 1..4   ← auto-generated, always exactly 4 per topic
```

IDs are derived from titles via `toKebabCase()`. These IDs are used in URLs *and*
as `localStorage` keys, so **renaming a category or topic title silently breaks
saved progress**. Treat titles as stable identifiers.

Year 2 Maths currently defines **8 categories / 35 topics / 140 challenge slots**.

### 4.3 Challenge loading (the convention that ties it together)
[Challenge.jsx](../src/pages/curriculum/Challenge.jsx) resolves a challenge
component by **file-path convention**, using a dynamic `import()`:

```
src/pages/skills/{subject}/challenges/year{year}/{topicId}/{PascalTopicId}Challenge{n}.jsx
```

Example: topic `counting-forwards-and-backwards`, challenge `2` →
`src/pages/skills/math/challenges/year2/counting-forwards-and-backwards/CountingForwardsAndBackwardsChallenge2.jsx`

If the file does not exist, the user sees *"This challenge is not yet available"*
and is redirected to `/curriculum` after a 3-second countdown. **This means
unbuilt challenges degrade gracefully — you can ship topics incrementally.**

### 4.4 Challenge component contract
Every challenge component:
- is the **default export** of its file
- receives a single prop: **`onComplete`**
- calls `onComplete()` when the learner answers correctly (typically after a
  ~1s success-feedback delay)
- owns its own state, its own randomisation, and its own co-located CSS
- uses a `.challenge-container` root and a `.feedback` element for messages

### 4.5 Progress & unlocking
Progress is stored in `localStorage` under the key `` `${subject}Progress_year${year}` ``
(e.g. `mathProgress_year2`), shaped as:

```js
{
  [categoryId]: {
    topics: {
      [topicId]: { completedChallenges: [1, 2] }
    }
  }
}
```

Unlock rules (implemented in [CurriculumPage.jsx](../src/pages/curriculum/CurriculumPage.jsx)):
- **Category** unlocks when the previous category is fully complete.
- **Topic** unlocks when the previous topic in the same category is complete.
- **Challenge** unlocks when it is the next uncompleted challenge in its topic;
  completed challenges stay replayable.
- A brand-new user has only the first category unlocked.

Writes happen in [ProblemView.jsx](../src/pages/curriculum/ProblemView.jsx) on
`onComplete`, then it navigates back to `/curriculum` after ~1s.

### 4.6 Theming
[ThemeContext.jsx](../src/context/ThemeContext.jsx) stores `light`/`dark` in
`localStorage` (key: `theme`), defaulting to the OS `prefers-color-scheme`. It
applies the theme by setting `document.body.className`. All colours should be
driven by CSS variables in [index.css](../src/index.css) so both themes work.

---

## 5. What Currently Exists

### Skills Mode — built games
**Maths:** Clock Generator, Counting Numbers, Multiplication Grid, Arithmetic
Practice, Find the Missing Number, Number Bonds, Fraction Fun
**Geometry:** Shape Explorer
**English:** Word Builder, Word Sorter, Sentence Builder, Opposite Match,
Synonym Safari, Sight Word Pop
**Geography:** Solar System (3D), World Map, Flag Finder, City Spotlight

### Curriculum Mode — built challenges
Only **Year 2 Mathematics** exists, and only two topics have challenges built:

| Category | Topic | Challenges built |
|---|---|---|
| Number – Number and Place Value | Numbers and Counting | 1, 2, 3, 4 ✅ |
| Number – Number and Place Value | Counting Forwards and Backwards | 1, 2, 3, 4 ✅ |
| *(all other 33 topics)* | — | 0 — falls back to "not yet available" |

**Year 3 does not exist yet.** Adding it is a major planned workstream (see
[PROJECT_IDEAS.md](PROJECT_IDEAS.md)).

---

## 6. Known Issues / Debt

Carried over from [notes.md](notes.md) and code review. Verified against source
on 2026-08-09 — two previously-reported bugs no longer reproduce in current code
and are marked below rather than silently dropped, in case they were fixed
without a changelog note or the report was inaccurate.

1. ~~**Counting Numbers game** — a bug prevents advancing in subtraction
   mode.~~ **Could not reproduce.** `CountingNumbersPanel.jsx` has no operation
   modes (addition/subtraction/etc.) or "advance" step at all — it only
   generates a random number and displays it. Either the component was
   rewritten since this was reported, or the report described a different
   game. Needs a human check before being removed entirely.
2. ~~**Number Bonds** — clicking a card in Match Mode flipped the "?" but
   nothing else happened.~~ **Fixed 2026-08-09.** Root cause was CSS, not
   the React state logic: `.bonds-card-inner` (the element `rotateY(180deg)`
   is applied to) had no `transform-style: preserve-3d`, so its absolutely
   positioned `.bonds-card-front`/`.bonds-card-back` children were flattened
   into the parent's rotation instead of rotating independently within a 3D
   context — the back face rendered mirrored/illegible, making the flip look
   broken even though `flipped`/`matched`/scoring state updated correctly
   underneath. Added `position: relative; transform-style: preserve-3d;` to
   `.bonds-card-inner` in `NumberBonds.css`; verified flip, match, and score
   flow in-browser.
3. **Word Sorter** — a word placed into a category can't be removed again.
   **Confirmed still present.** `WordSorter.jsx`'s `handleDragEnd` only
   handles word-bank → bucket moves; bucket tiles render as plain `<div>`s,
   not `Draggable`s, so a sorted word can never be dragged again.
4. **No tests** — there is no test framework or a single test in the repo.
5. **Fragile IDs** — renaming a curriculum title changes its kebab-case ID and
   orphans existing `localStorage` progress. No migration path exists.
6. **Duplicated progress logic** — read/write of `localStorage` progress is
   implemented separately in `CurriculumPage.jsx` and `ProblemView.jsx`.
7. **No accessibility pass** — drag-and-drop interactions have no keyboard or
   screen-reader alternative; no audio support for pre-readers.

**Resolved since last review:** `Challenge.jsx` no longer uses
`/* @vite-ignore */` — it now resolves challenges through a static
`import.meta.glob("../skills/*/challenges/year*/*/*Challenge*.jsx")` registry,
so missing files are detectable and Vite can statically analyse the import.
This was previously listed here and as idea #10 in
[PROJECT_IDEAS.md](PROJECT_IDEAS.md); both are now updated.

---

## 7. How To Add Things (playbooks)

### Add a new Skill game
1. Create `src/pages/skills/<subject>/<GameName>.jsx` + `<GameName>.css`.
2. Register the route in [src/main.jsx](../src/main.jsx).
3. Add a `<Link>` in the correct card in [SkillsPage.jsx](../src/pages/skills/SkillsPage.jsx).
4. Update §5 of this document and the status in [PROJECT_IDEAS.md](PROJECT_IDEAS.md).

### Add a new Curriculum challenge
1. Confirm the topic exists in [year2MathCurriculum.js](../src/data/year2MathCurriculum.js).
2. Create the file at the exact convention path (§4.3) with the exact PascalCase name.
3. Implement the `onComplete` contract (§4.4) and co-locate the CSS.
4. No routing changes are needed — the dynamic loader picks it up automatically.
5. Update the table in §5.

### Add a new Year / Subject
1. Create `src/data/year<N><Subject>Curriculum.js` in the same shape.
2. Make [CurriculumPage.jsx](../src/pages/curriculum/CurriculumPage.jsx) select
   the dataset from its `year`/`subject` props instead of the hard-coded import.
3. Create `src/pages/skills/<subject>/challenges/year<N>/...` folders.
4. Storage keys are already namespaced by year and subject, so progress won't clash.

---

## 8. Conventions Checklist

- Function components + hooks only.
- One co-located `.css` file per component, same base name.
- Kebab-case for routes, file-path IDs and storage keys; PascalCase for components.
- Emoji are used deliberately in child-facing UI copy — keep the tone playful.
- Feedback pattern: ✅ for correct, ❌ for retry, ~1s delay before advancing.
- Every screen must work in both light and dark themes.
- Content must be age-appropriate for the target year group.
