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

**Last reviewed:** 2026-09-15

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
| Accounts | **Parent email + child profiles** | PBKDF2 password hashing, behind a swappable async store — see §4.7 |
| Backend | **Express + MongoDB Atlas** | `server/` — optional: the app still runs fully local. See §4.8 |
| Hosting | **Render.com** | One Web Service serves the API and the built SPA — see [DEPLOYMENT.md](DEPLOYMENT.md) |
| Linting | **ESLint 9** flat config | `npm run lint` |
| External APIs | **REST Countries** (`restcountries.com`) | Country names & flags for Flag Finder skill game |

**No backend. No database. No component-test framework.** Everything is
client-side and state lives in `localStorage`. External data is fetched from public APIs
(currently just REST Countries for the Flag Finder geography game).

**The backend is optional.** As of 2026-09-15 there are two interchangeable storage
drivers (§4.7). By default everything still lives in this browser's `localStorage` and
the app needs no server at all. Set `VITE_USE_API=true` at build time and the same app
talks to the Express + MongoDB backend in `server/` instead (§4.8), with no component
changes. In local mode: Password hashing is real (PBKDF2-SHA-256, 150k iterations) but it runs
client-side, so it protects nothing against someone holding the device; it exists so the
data shape and call sites already match what a real backend expects. All account access
goes through the async store in §4.7, which is the designed seam for a future MongoDB
backend.

### External API: REST Countries

The [Flag Finder](../src/pages/skills/geography/FlagFinder.jsx) geography skill game
fetches live country data from [REST Countries API](https://restcountries.com/):
- **Endpoint:** `https://api.restcountries.com/countries/v5`
- **Fields used:** `names.common` (country name), `flag.url_png` (flag image URL)
- **Authentication:** Optional API key via `VITE_REST_COUNTRIES_API_KEY` env var
- **Usage:** Generates unique country name + flag questions with 4-option multiple choice

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
│   ├── ThemeContext.jsx      # Global light/dark theme provider
│   ├── theme-context.js      # Context object, split out for Fast Refresh
│   ├── AuthContext.jsx       # Parent account + child profile provider (§4.7)
│   └── auth-context.js       # Context object, split out for Fast Refresh
├── hooks/
│   └── useProgress.js        # Shared curriculum-progress hook (account-aware, §4.5)
├── components/               # Shared, reusable pieces
│   ├── RequireChild.jsx      # Route guard for Curriculum Mode (§4.7)
│   ├── ui/Navbar.jsx
│   ├── ClockPanel.jsx, ReadingNumbersPanel.jsx, DualLabelClock.jsx,
│   ├── MapGame.jsx, MultiplicationGrid.jsx, ShapeQuiz.jsx
├── data/
│   ├── year2MathCurriculum.js   # Curriculum tree (categories → topics)
│   ├── avatars.js               # Child profile emoji + colour tokens
│   ├── store/                   # THE BACKEND SEAM (§4.7)
│   │   ├── index.js             # Swap point: re-exports the active store
│   │   ├── localStorageStore.js # Current driver
│   └── cities.json
├── utils/
│   └── toKebabCase.js        # Generates the IDs used in URLs + storage keys
├── pages/
│   ├── home/Home.jsx
│   ├── auth/                 # Login, SignUp, Profiles, ParentArea
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
Progress is **per child profile** as of 2026-09-15. It is stored via the store layer
(§4.7) as one document per `(childId, year, subject)` in the `dl.progress` collection,
with the progress tree itself under that document's `data` field, shaped as:

```js
{
  [categoryId]: {
    topics: {
      [topicId]: { completedChallenges: [1, 2] }
    }
  }
}
```

The legacy pre-accounts key `` `${subject}Progress_year${year}` `` (e.g.
`mathProgress_year2`) is **no longer read or written**. Any such key left in a
browser is simply ignored — there is deliberately **no migration path**, removed
2026-09-15 as an explicit product decision. Do not reintroduce one.

All reading and writing of progress goes through the shared
[useProgress](../src/hooks/useProgress.js) hook — `useProgress(year, subject)`
returns `{ progress, hydrated, isTopicComplete, isCategoryComplete,
isChallengeComplete, completeChallenge }`. This replaced logic previously
duplicated across `CurriculumPage.jsx` and `ProblemView.jsx` (see §6, resolved).
The shape above is still unversioned — that remains a known gap (§6).

Unlock rules (implemented in [CurriculumPage.jsx](../src/pages/curriculum/CurriculumPage.jsx),
consuming the hook's `progress`/`isTopicComplete`/`isCategoryComplete` rather
than reading storage directly):
- **Category** unlocks when the previous category is fully complete.
- **Topic** unlocks when the previous topic in the same category is complete.
- **Challenge** unlocks when it is the next uncompleted challenge in its topic;
  completed challenges stay replayable.
- A brand-new user has only the first category unlocked.

Writes happen in [ProblemView.jsx](../src/pages/curriculum/ProblemView.jsx) via
`completeChallenge()` on `onComplete`, then it navigates back to `/curriculum`
after ~1s.

⚠️ **The hook is inert with no active child** — empty progress, and it never writes.
It also refuses to save unless the in-memory progress came from the document currently
loaded (tracked in a ref). Without that guard, switching profile writes the *outgoing*
child's progress into the *incoming* child's document: the load effect resets state, but
the save effect still fires once with the previous render's value. Do not remove it.

### 4.6 Theming
[ThemeContext.jsx](../src/context/ThemeContext.jsx) stores `light`/`dark` in
`localStorage` (key: `theme`), defaulting to the OS `prefers-color-scheme`. The
context object lives separately in
[theme-context.js](../src/context/theme-context.js), keeping the provider module
compatible with React Fast Refresh. The provider applies the theme by setting
classes on `document.body`. All colours should be driven by CSS variables in
[index.css](../src/index.css) so both themes work.

### 4.7 Accounts, profiles & the store seam

A **parent account** (email + password) owns one or more **child profiles** (name, emoji
avatar, colour). Children never type a password — they tap their avatar on `/profiles`.

Everything account-shaped goes through one async interface,
[src/data/store/index.js](../src/data/store/index.js):

```
createParent · findParentByEmail · verifyParent
listChildren · getChild · createChild · deleteChild
getProgress(childId, year, subject) · saveProgress(childId, year, subject, data)
```

**Every method is `async` even though localStorage is synchronous.** That is deliberate
and load-bearing: it is what lets a future `mongoStore.js` implement the same interface
against a real API and be swapped in by changing the single re-export in `index.js`.
Do not "simplify" these to synchronous calls.

Documents are deliberately Mongo-shaped, `_id` from `crypto.randomUUID()`, one
localStorage key per collection (`dl.parents`, `dl.children`, `dl.progress`):

```js
parents:  { _id, email, passwordHash, passwordSalt, iterations, createdAt }
children: { _id, parentId, name, avatar, colour, createdAt }
progress: { _id, childId, year, subject, schemaVersion: 1, data: {...}, createdAt, updatedAt }
```

Session: `dl.session` = `{ parentId, childId, email }`. The `email` is a **display hint
only** — identity always re-validates `parentId` against the store. It exists because the
store has no `getParent(parentId)`; adding one lets the field be dropped.

`verifyParent` returns `null` identically for "no such account" and "wrong password", so
the login screen cannot be used to enumerate accounts. Keep it that way.

**No migration, by decision.** Old pre-accounts progress is not carried into a
profile, and local accounts are not uploaded to the backend. This was considered and
deliberately dropped on 2026-09-15; `migrateLegacyProgress.js` and its tests were
deleted. A new profile starts empty.

**Gating:** `RequireChild` wraps only the Curriculum routes — signed out → `/login`, no
child selected → `/profiles`. Home and all of Skills Mode stay ungated, because Skills
Mode never tracked progress.

### 4.8 The backend (`server/`)
Express + MongoDB, added 2026-09-15. **Optional** — the app runs fully local unless
built with `VITE_USE_API=true`. Deployed as a SINGLE Render Web Service that serves both
`/api/*` and the built `dist/`, so the SPA and API share an origin. That is what lets
the session be a plain HTTP-only cookie with no CORS handling anywhere.

```
server/index.js      entry; fails fast if MONGODB_URI or SESSION_SECRET is missing
server/app.js        app construction, split out so tests need no port
server/db.js         ONE MongoClient, connected once and reused
server/auth.js       PBKDF2-SHA-256 hashing + JWT session cookie `dl_session`
server/middleware.js requireAuth, requireOwnedChild
server/routes/       auth, children, progress
```

Endpoints mirror the store interface exactly; see the table in
[DEPLOYMENT.md](DEPLOYMENT.md) or `server/routes/`.

**Authorization — the part to not break.** In local mode "whose data is this" is
answered by the browser holding it. On a server it must be enforced:
- Ownership lives **in the query filter**, never a post-fetch `if`. `requireOwnedChild`
  queries `{_id: childId, parentId: <session parent>}`, so a handler can never hold a
  document it is not allowed to see. Progress routes use `req.child._id`, already proven
  owned — never the raw `childId` from the URL.
- `requireAuth` re-reads the parent from the DB rather than trusting the JWT payload, so
  a deleted parent's still-valid token is not a session.
- Another family's resource returns **404, not 403**, and a malformed id returns the
  identical 404 — ids cannot be probed.
- Unknown email and wrong password return an identical 401: no account enumeration.
- **Duplicate emails are enforced in application code**, because the Atlas index on
  `parents.email` is NOT unique (see §6 item 8). There is a pre-insert check plus a
  post-insert reconciliation that deletes its own row if a concurrent signup won.

Password hashing stays PBKDF2-SHA-256 via `node:crypto` — not for migration (there is
none, §4.7), but because it needs no native build step on Render's free tier.

⚠️ Passwords are hashed **client-side in local mode and server-side in API mode**. Local
mode's hashing protects nothing against someone holding the device; it is data-shape
correctness, not security.

---

## 5. What Currently Exists

### Skills Mode — built games
**Maths:** Clock Generator, Reading Numbers, Multiplication Grid, Arithmetic
Practice, Find the Missing Number, Number Bonds, Fraction Fun
**Geometry:** Shape Explorer
**English:** Word Builder, Word Sorter, Sentence Builder, Opposite Match,
Synonym Safari, Sight Word Pop, Speed Reader
**Geography:** Solar System (3D), World Map, Flag Finder, City Spotlight

### Accounts — built 2026-09-15
Parent sign-up/sign-in (`/signup`, `/login`), child profile picker (`/profiles`), and a
parent admin screen (`/parent`). Local-only; see §4.7. Curriculum Mode now requires a
selected child profile; Skills Mode does not.

### Curriculum Mode — dev unlock switch
`VITE_UNLOCK_ALL=true` opens every built challenge in the picker, bypassing the
sequential unlock rules (`src/data/devUnlock.js`). It is a BUILD-time switch
like `VITE_USE_API`, so a production build made without it has no bypass at
all — which is why it is an env var and not a URL parameter. It changes only
what `CurriculumPage` offers: `useProgress`, the completion rules and the
stored data are untouched, and unbuilt challenges stay unavailable. A banner
shows while it is active, so a genuine gating bug is never mistaken for the
flag working.

### Curriculum Mode — the source material
`docs/curriculum/` holds the National Curriculum programmes of study verbatim,
with every topic in our dataset mapped to the statutory requirement it serves,
and a list of requirements no topic covers yet. Read the relevant row before
authoring questions for a topic.

### Curriculum Mode — built challenges
Only **Year 2 Mathematics** exists, and thirty-four topics have challenges
built — everything except Statistics:

| Category | Topic | Challenges built |
|---|---|---|
| Number – Number and Place Value | Numbers and Counting | 1, 2, 3, 4 ✅ |
| Number – Number and Place Value | Counting Forwards and Backwards | 1, 2, 3, 4 ✅ |
| Number – Number and Place Value | Counting in Steps of 2, 3, 5 and 10 | 1, 2, 3, 4 ✅ |
| Number – Number and Place Value | Counting More and Less | 1, 2, 3, 4 ✅ |
| Number – Number and Place Value | Place Value | 1, 2, 3, 4 ✅ |
| Number – Number and Place Value | Less Than, Greater Than and Equal To | 1, 2, 3, 4 ✅ |
| Number – Addition and Subtraction | Doubling and Halving using Addition and Subtraction | 1, 2, 3, 4 ✅ |
| Number – Addition and Subtraction | Solving Number Problems | 1, 2, 3, 4 ✅ |
| Number – Addition and Subtraction | Using Two-Digit Numbers | 1, 2, 3, 4 ✅ |
| Number – Addition and Subtraction | Solving Missing Number Problems | 1, 2, 3, 4 ✅ |
| Number – Multiplication and Division | What is Multiplication? | 1, 2, 3, 4 ✅ |
| Number – Multiplication and Division | What is Division? | 1, 2, 3, 4 ✅ |
| Number – Multiplication and Division | 2, 5 and 10 Multiplication Tables | 1, 2, 3, 4 ✅ |
| Number – Multiplication and Division | Division Problems | 1, 2, 3, 4 ✅ |
| Number – Multiplication and Division | Connecting Multiplication and Division | 1, 2, 3, 4 ✅ |
| Number – Multiplication and Division | Doubling and Halving using Multiplication and Division | 1, 2, 3, 4 ✅ |
| Number – Multiplication and Division | Solving Multiplication and Division Problems | 1, 2, 3, 4 ✅ |
| Number – Fractions | What is a Fraction? | 1, 2, 3, 4 ✅ |
| Number – Fractions | Fractions of Numbers | 1, 2, 3, 4 ✅ |
| Number – Fractions | Finding Fractions of Larger Groups | 1, 2, 3, 4 ✅ |
| Measurement | Measuring Length and Height | 1, 2, 3, 4 ✅ |
| Measurement | Measuring Weight and Volume | 1, 2, 3, 4 ✅ |
| Measurement | Comparing Measurements | 1, 2, 3, 4 ✅ |
| Measurement | Measuring Temperature | 1, 2, 3, 4 ✅ |
| Measurement | Measuring Time | 1, 2, 3, 4 ✅ |
| Measurement | Standard Units of Money | 1, 2, 3, 4 ✅ |
| Measurement | Money Problems | 1, 2, 3, 4 ✅ |
| Geometry – Properties of Shapes | 2-D Shapes | 1, 2, 3, 4 ✅ |
| Geometry – Properties of Shapes | 3-D Shapes | 1, 2, 3, 4 ✅ |
| Geometry – Properties of Shapes | Different Shapes | 1, 2, 3, 4 ✅ |
| Geometry – Position and Direction | Patterns | 1, 2, 3, 4 ✅ |
| Geometry – Position and Direction | Sequences | 1, 2, 3, 4 ✅ |
| Geometry – Position and Direction | Quarter Turns and Half Turns | 1, 2, 3, 4 ✅ |
| Geometry – Position and Direction | Right-Angle Turns | 1, 2, 3, 4 ✅ |
| *(the 5 Statistics topics)* | — | 0 — falls back to "not yet available" |

All thirty-four are built on the **shared challenge kit**
(`src/components/challenge/`): `ChallengeShell` owns the run loop and the single
`onComplete()`, with `ChoiceGrid`, `NumberLine`, `DragToOrder` and `NumberInput`
as interactions, all themed once from `challenge-kit.css`. Its question
generators live in `src/data/challenges/countingInSteps.js` and are unit-tested.
Measurement added four richer games to the kit: `ScaleReader` (one component
dressed as a ruler, thermometer, jug and kitchen scale), `MeasureDrag` (the same
scale, learner-set, click/keys/drag), `CoinTray` (real UK coins, tap only) and
`ClockFace`/`TimeSetter` (wrapping the existing DualLabelClock, minutes in
fives).

Geometry added `ShapeFigure` and `SolidFigure`, both SVG. SVG rather than CSS
clip-path because the topic is about properties: the same vertex list draws the
outline, dots each corner and places the line of symmetry, and a test asserts
that a shape claiming five sides has five corners. The older
`src/components/ShapeQuiz.jsx` draws shapes with hardcoded inline colours and
does not theme; it belongs to Skills Mode and was left alone.

Position and Direction added five more: `PatternStrip`, `OrientationPicker`,
`RotationDial`, `RobotGrid` and `PositionBoard`. The robot is the guidance's
own example of programming with right angles; its position always comes from
the unit-tested `runProgram`, so the drawing cannot drift from the answer.

New topics should compose the kit rather than copy an existing challenge — see
the `building-curriculum-topics` skill. The kit has since grown a highlighted
number-line cell, a rule machine, base-ten blocks and a comparison statement
row, all added as later topics needed them.

"Numbers and Counting" and "Counting Forwards and Backwards" were rebuilt on
the kit 2026-09-18, replacing the original bespoke components. That rewrite
fixed a long-standing bug: the old sequence challenge compared typed answers as
**strings**, so "043" was rejected for 43 — visibly correct, marked wrong, and
since it sat at challenge 3 of the first topic it walled off the whole
curriculum. Answers are now compared by value (`isCorrectNumber`).

Locked topics still list their challenges (each rendered locked and
unclickable). Hiding them left a locked topic as a bare padlock, with no sign
of what it held or how much of it there was.

### Curriculum Mode — progress display
`CurriculumPage` shows a year progress bar plus a per-topic `x/y` counter, both
computed by `src/data/curriculumProgressStats.js`. Denominators count only
*built* challenges so 100% is reachable; `datasetTotal` carries the full
curriculum count so the UI can say "12 of 12 available · 12 of 156 in the full
curriculum" rather than letting 100% read as "year finished".

The dataset holds **39 topics across 8 categories = 156 challenge slots**.
Earlier revisions of these docs said 35 topics; that was wrong, and was caught
2026-09-18 by reading the count off the running app.

**Year 3 does not exist yet.** Adding it is a major planned workstream (see
[PROJECT_IDEAS.md](PROJECT_IDEAS.md)).

---

## 6. Known Issues / Debt

Carried over from [notes.md](notes.md) and code review. Verified against source
on 2026-08-09 — two previously-reported bugs no longer reproduce in current code
and are marked below rather than silently dropped, in case they were fixed
without a changelog note or the report was inaccurate.

1. ~~**Counting Numbers game** — a bug prevents advancing in subtraction
   mode.~~ **Closed 2026-08-09, renamed instead of fixed.** The component has
   no operation modes (addition/subtraction/etc.) or "advance" step at all —
   it only generates and displays a random number in a chosen range, so the
   subtraction-mode report never mapped onto this component. The game was
   renamed **Reading Numbers** (route `/reading-numbers`, component
   `ReadingNumbersPanel.jsx`) to match what it actually does, closing the
   mismatch rather than inventing subtraction behaviour that was never in
   scope.
   **Known limitation:** the generated number is capped at **775,840**
   (`MAX_ALLOWED` in `ReadingNumbersPanel.jsx`) — the `written-number` package
   used for the text representation does not reliably render numbers above
   this. Both the `min`/`max` range inputs clamp to it in JS, not just via the
   HTML `max` attribute.
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
3. ~~**Word Sorter** — a word placed into a category can't be removed
   again.~~ **Fixed 2026-08-09.** Root cause: bucket tiles rendered as plain
   `<div>`s instead of `Draggable`s (no drag handle), and `handleDragEnd`
   only had a branch for word-bank → bucket moves. Wrapped bucket items in
   `Draggable` and extended `handleDragEnd` to branch on `result.source`:
   bank → bucket, bucket → bank, and bucket → bucket all now update state
   correctly. Also guarded the round-completion effect with `!completed` so
   a bucket-to-bucket move after all 6 words are placed doesn't re-trigger
   scoring. Verified with simulated real mouse drags in-browser (Playwright's
   synthetic `dragTo` doesn't trigger `@hello-pangea/dnd`'s pointer sensor —
   needed manual `mouse.move`/`down`/`up` sequencing with pauses).
4. **No component-test framework** — pure Speed Reader pacing and story data use
   Node's built-in `node:test` via `npm test`, with no added dependency. React
   component tests still need a deliberate Vitest/jsdom/Testing Library setup.
5. **Fragile IDs** — renaming a curriculum title changes its kebab-case ID and
   orphans existing progress. Still true, and still with no migration path.
   **Partially addressed 2026-09-15:** progress documents now carry
   `schemaVersion: 1` (§4.7), so a future migration has something to branch on —
   but nothing reads that field yet and the kebab-case IDs inside `data` are
   exactly as fragile as before.
6. ~~**Duplicated progress logic**~~ **Fixed 2026-08-09.** Read/write of
   `localStorage` progress was implemented separately in `CurriculumPage.jsx`
   and `ProblemView.jsx`; extracted into [useProgress](../src/hooks/useProgress.js)
   (§4.5). Stored shape, hydration guard, merge-not-replace writes, and all
   unlock rules verified unchanged via the `curriculum-progress` skill's full
   manual checklist.
7. **Local mode has no security boundary** — with `VITE_USE_API` unset (the default),
   accounts live in `localStorage` and the PBKDF2 hashing runs client-side. It protects
   nothing against anyone holding the device, and progress neither syncs nor survives
   clearing site data. Fine for a single family device; not an account system.
8. **The Atlas indexes are NOT unique** — `parents.email` and the
   `{childId, year, subject}` triple were created through a tool that could not set
   `unique`. The server compensates in application code (§4.8), but the database itself
   would still accept duplicates. Run, once:
   `db.parents.createIndex({email:1},{unique:true})` and
   `db.progress.createIndex({childId:1,year:1,subject:1},{unique:true})`.
9. **`apiStore` has no unit tests** — it was verified end-to-end in a browser against a
   real server (signup → profile → challenge → logout → login → progress intact), but
   has no `fetch`-mocked test file of its own.
10. **No accessibility pass** — drag-and-drop interactions have no keyboard or
   screen-reader alternative; no audio support for pre-readers.
11. **Numbers and Counting Challenge 3 rejects correct answers** — found
   2026-08-09 while manually verifying the `useProgress` extraction above.
   `NumbersAndCountingChallenge3.jsx` shows "❌ Not quite!" even when every
   blank is filled with the visibly-correct sequence value. Confirmed
   pre-existing (file unmodified vs `dev`) and unrelated to the hook work.
   Not yet root-caused; suspect the `missingIndices`/`sequence` `useMemo`s or
   a stale closure in `handleSubmit`. See idea #4 in `PROJECT_IDEAS.md`.

**Resolved since last review:** `Challenge.jsx` no longer uses
`/* @vite-ignore */` — it now resolves challenges through a static
`import.meta.glob("../skills/*/challenges/year*/*/*Challenge*.jsx")` registry,
so missing files are detectable and Vite can statically analyse the import.
This was previously listed here and as idea #10 in
[PROJECT_IDEAS.md](PROJECT_IDEAS.md); both are now updated.

---

## 7. How To Add Things (playbooks)

### Pure-logic tests

`npm test` runs Node's built-in test discovery. Keep these tests React-free.
Component tests remain deferred until the project deliberately adopts a
browser-like test environment.

### Modal / overlay pattern

`src/pages/skills/english/ReaderOverlay.jsx` is the app's first modal. It remains
local to Speed Reader and accepts only `children`, `onClose`, and `label`. When a
second game needs a modal, move and generalise this implementation under
`src/components/ui/` instead of creating a second focus/scroll-lock pattern.

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

---

## 9. Hard-Won Rules (from the 2026-08-21 audit)

A full audit fixed 42 issues; see [ISSUES.md](ISSUES.md) for the itemised record. These are the
patterns that caused real bugs, so they are now rules.

### Never sample in an unbounded loop
`while (arr.length < n) { pick a random candidate; keep it if valid }` **froze the browser
three separate times** in this codebase, and was one data row from a fourth. If the valid
candidate pool can be smaller than `n`, the loop never ends.

**Instead:** enumerate the candidate pool up front, or shuffle-and-slice. Both are bounded by
construction.

Fixed instances: `generateQuestion.js`, `FindTheMissingNumber.jsx`,
`CountingForwardsAndBackwardsChallenge{3,4}.jsx`, `FlagFinder.jsx`.

### Answer options must be non-negative whole numbers
Distractors are filtered to `>= 0`, so a generator that can produce a negative or fractional
answer creates an impossible question. Build expressions **backwards from a chosen answer**
rather than generating-then-rejecting.

Distractor spread should also **scale with the answer** — a fixed ±5 window makes a 4-digit
product obvious by magnitude.

### Never drive a paired slider with a reactive DOM `min`/`max`
`min={otherValue + 1}` pushes the input's *rendered* value without updating state, so the
label, the slider and the state all disagree. **Clamp in state on commit instead** — see
`MathPractice.handleMinChange`.

### Progress unlocking must check identity, not count
`challengeIndex === completed.length` bricked the whole curriculum on any gap in the saved
array, with no repair UI. Ask "is everything *before* this complete?" using a `Set` of ids.
Likewise `completed.length === total` is not completion — check membership.

### Inline styles need CSS-variable tokens, not literals
Inline styles cannot carry `body.dark` overrides. Hardcoded colours left ShapeQuiz and the
World Map HUD light-only in dark mode. Define `--token` pairs in `App.css` (light in `:root`,
dark in `body.dark`) and reference them from the inline style.

### Theme classes go on `<body>`
Any stylesheet scoped to `.App.dark` was **dead** — that element no longer renders. Use
`body.dark`. And when setting the class, use `classList.remove(...)` / `add(...)`, never
`className = ''` (which destroys Leaflet's own body classes).

### The accent colour is a BACKGROUND, never body text
Found again 2026-09-15 on the new `/profiles` heading, which used
`color: var(--pf-accent)` and measured **2.66:1** in light theme — the exact figure
already documented in `App.css`. The accent pink only works as a *fill*, with
`--on-*-accent` ink on top. Reach for `--*-text` for headings and copy.

Both agents that wrote this screen computed contrast from the token values and believed
it passed; only measuring the live computed styles caught it. Measure, don't derive.

### Text on the accent colour must use `--on-*-accent`
`white` on `--light-accent` is only 3.17:1. The dark ink reaches 5.46:1 on the same pink. Also
**lighten** accent hovers rather than darkening them, or the ink falls below AA again.

### Every timer needs a ref and a cleanup
Untracked `setTimeout` fired after unmount, after mode switches, and twice per click when
scheduled *inside* a state updater (StrictMode runs updaters twice). Store the handle in a ref,
clear it on unmount, and supersede rather than stack.

### Full-viewport pages must subtract the navbar
`height: 100dvh` below a sticky navbar overflows and triggers hide-on-scroll jitter. The navbar
publishes its measured height as `--navbar-height`; use
`calc(100dvh - var(--navbar-height))`. Don't hardcode a pixel guess — it is 63–76px depending
on viewport.

### Fixed pixel heights and animation distances must share a variable
A hard `440px` field with `-460px` keyframes drifted apart and overflowed small phones. Drive
both from one custom property (`--field-h`).

### Only reveal on a correct answer
The World Map marked the target as "found" on wrong answers too, so a child could complete
every country having answered them all wrong.

### CSS is global — scope it
`.wrapper`, `.score`, `.prompt`, `.optionBtn` are each defined in several files; the last one
bundled wins app-wide, so screens render differently depending on visit order. New components
must scope every rule under a unique root class. ⚠️ Retro-fitting this is **still partly
outstanding** — and do it file by file with visual checks: an automated regex pass emptied
`MathPractice.css`.

### The REST Countries v5 API paginates at 25
Flag Finder was quizzing 25 of 254 countries. Follow `data.meta.more` using `offset`, pause
~120ms between pages (bursts get rate-limited, and the throttled response carries **no CORS
headers**, surfacing as an opaque `TypeError: Failed to fetch`), and keep partial results rather
than failing the whole load.

### Verify in the browser, not just in the unit
Several bugs only appeared in the real app: the Word Sorter never re-dealt, the counting inputs
were invisible in dark mode, and the map scored wrong answers as found. Contrast in particular
must be **measured** from computed styles — the target is WCAG AA **4.5:1**.
