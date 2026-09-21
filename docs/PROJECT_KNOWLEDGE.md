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

**Last reviewed:** 2026-09-21

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

**No component-test framework.** Pure logic is covered by Node's built-in
`node:test` (`npm test`); React components have no test environment at all —
see §6 item 4. External data is fetched from public APIs (currently just REST
Countries for the Flag Finder geography game).

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
npm run dev         # local dev server (Vite)
npm run build       # production build
npm run lint        # eslint
npm run preview     # preview production build
npm test            # node --test — pure logic only, no browser environment
npm run server      # the Express API
npm run dev:server  # the API, watched, reading .env
npm run seed        # development seed account (see §5, "Development seed")
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
│   ├── useProgress.js        # Active child's curriculum progress (§4.5)
│   ├── useRewards.js         # Active child's badges (see "Badges", §5)
│   ├── useChildrenProgress.js  # Progress for a LIST of children (§5)
│   └── useChildrenRewards.js   # Badges for a LIST of children
├── components/               # Shared, reusable pieces
│   ├── RequireChild.jsx      # Route guard for Curriculum Mode (§4.7)
│   ├── ProgressRing.jsx      # The one percent dial, shared by 3 screens
│   ├── celebration/CompletionCelebration.jsx
│   ├── challenge/            # The shared challenge kit (39 components)
│   ├── ui/Navbar.jsx
│   ├── ClockPanel.jsx, ReadingNumbersPanel.jsx, DualLabelClock.jsx,
│   ├── MapGame.jsx, MultiplicationGrid.jsx, ShapeQuiz.jsx
├── data/
│   ├── year2MathCurriculum.js   # Curriculum tree (categories → topics)
│   ├── year3MathCurriculum.js
│   ├── curriculumRegistry.js    # Which curricula exist — the one source
│   ├── avatars.js               # Starter profile emoji + colour tokens
│   ├── badges.js                # Badge catalogue + earnBadges (§5)
│   ├── childFields.js           # Writable child fields + year rules (§5)
│   ├── lastAccount.js           # `dl.lastAccount` welcome-back hint (§4.7)
│   ├── curriculumResume.js      # "Where was this child up to?" (§5)
│   ├── resumeCandidates.js      # Loads the documents pickResume consumes
│   ├── curriculumProgressStats.js
│   ├── progressRules.js, curriculumLocks.js, curriculumNavigation.js
│   ├── completionMilestones.js
│   ├── challenges/              # Pure question generators, unit-tested
│   ├── store/                   # THE BACKEND SEAM (§4.7)
│   │   ├── index.js             # Swap point: re-exports the active store
│   │   ├── localStorageStore.js # Browser driver
│   │   └── apiStore.js          # HTTP + cookie driver
│   └── cities.json
shared/                       # Imported by BOTH src/ and server/
└── accountTypes.js           # parent vs learner, age bands (§4.7)
scripts/                      # Dev tooling, Node-only
├── seed.js                   # Development seed account (§5)
├── seedData.js               # What it seeds — pure, tested
└── seedBuilt.js              # Which challenges exist, read from disk
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

Year 2 Maths currently defines **8 categories / 39 topics / 156 challenge slots**.

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
returns `{ progress, hydrated, isTopicComplete, isChallengeUnlocked,
isCategoryComplete, isCategoryPassable, isChallengeComplete, completeChallenge }`.
This replaced logic previously duplicated across `CurriculumPage.jsx` and
`ProblemView.jsx` (see §6, resolved). The shape above is still unversioned —
that remains a known gap (§6).

**The rules themselves are pure and live outside React** (2026-09-18):

| Module | Owns |
|---|---|
| [progressRules.js](../src/data/progressRules.js) | The predicates — complete / unlocked / passable — plus `completeChallenge` as a reducer. `useProgress` is a thin binding layer over these. |
| [curriculumLocks.js](../src/data/curriculumLocks.js) | `buildLockState({curriculum, progress, isBuilt, bypassLocks})` → every category/topic/challenge flagged `locked`/`complete`/`missing` in one pass. |
| [curriculumNavigation.js](../src/data/curriculumNavigation.js) | `findNextChallenge(lockState, position)` — the first playable challenge after the one just finished. |
| [completionMilestones.js](../src/data/completionMilestones.js) | Read-only milestone detection for a newly completed challenge; reuses the progress reducer and completion rules without writing to storage. |

They take availability as an `isBuilt` callback rather than importing
`challengeAvailability`, which uses `import.meta.glob` and so cannot load under
`node --test`. All three are covered by pure tests.

Unlock rules (computed by `buildLockState`, consumed by both
[CurriculumPage.jsx](../src/pages/curriculum/CurriculumPage.jsx) and
[ProblemView.jsx](../src/pages/curriculum/ProblemView.jsx) — a second copy is how
a learner silently gets sent to a locked challenge):
- **Category** unlocks when every earlier category is passable. (Passable, not
  complete: a category with nothing built must not block the chain, but must not
  be badged finished either.)
- **Topic** unlocks when the previous topic in the same category is complete,
  where "complete" counts only *built* challenges. A fully unbuilt topic is
  skipped entirely, since it can never be completed. Before 2026-09-18 a topic
  holding even one unbuilt challenge could never complete and so gated the next
  topic forever — while the screen showed the learner "2/2 done", because the
  progress count already ignored unbuilt challenges. The two now agree.
- **Challenge** unlocks when it is the next uncompleted challenge in its topic;
  completed challenges stay replayable. Unbuilt challenges don't block the ones
  after them.
- A brand-new user has only the first category unlocked.

Challenges are **lazy-loaded on demand** by
[Challenge.jsx](../src/pages/curriculum/Challenge.jsx), which distinguishes two
failures that look identical from the outside: a challenge with no registered
module ("not yet available", permanent, returns the learner to the curriculum),
and a registered module that could not be fetched or evaluated (temporary — a
dropped connection or a stopped dev server — which offers a retry and keeps the
learner where they are). Conflating them told children a challenge they can
actually play does not exist, and ejected them from it.

Writes happen in [ProblemView.jsx](../src/pages/curriculum/ProblemView.jsx) via
`completeChallenge()` on `onComplete`. It then shows the shared
[CompletionCelebration](../src/components/celebration/CompletionCelebration.jsx).
The moment grows from **challenge → topic → section (category) → subject → year**
when that completion earns several milestones at once. The screen includes a
summary at larger milestones, and its primary action stays the next playable
challenge from `findNextChallenge`; "Back to topics" is the secondary action.
If there is no next playable challenge, the primary action opens the topics.
Replaying a finished challenge gets a practice message, not another award.

Milestone detection requires **every planned challenge to be built and done**
before calling a topic, section, subject, or year finished. This is deliberately
stricter than the unlock rules, which skip unbuilt challenges to keep the path
playable. A year award currently applies when its sole registered subject is
finished; if a second subject is registered for a year, the subject award still
works and the year award waits for a cross-subject progress read. Confetti is
brief and skippable; `prefers-reduced-motion` removes its animation. The heading
receives focus for assistive technology. No completion data or storage keys
changed.

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

An **account** (email + password) owns one or more **child profiles** (name, emoji
avatar, colour, year group). Children never type a password — they tap their avatar
on `/profiles`.

**There are two kinds of account** as of 2026-09-19, distinguished by
`accountType` and defined once in [shared/accountTypes.js](../shared/accountTypes.js),
which both store drivers and the server import:

| `accountType` | Who | Notes |
|---|---|---|
| `"parent"` | A grown-up setting the app up for their children | The default. **Absent means parent**, so no migration was needed. |
| `"learner"` | An older child who signed up for themselves | Owns their own profile. Carries an `ageBand`; under-13 never reaches account creation. |

`isLearner` is derived on the auth context and changes exactly three things: a
learner with one profile skips the "who's playing" screen, `/parent` is titled
"My account", and profile copy is first-person.

Everything account-shaped goes through one async interface,
[src/data/store/index.js](../src/data/store/index.js):

```
createParent · findParentByEmail · verifyParent · getParent · signOutParent
listChildren · getChild · createChild · updateChild · deleteChild
getProgress(childId, year, subject) · saveProgress(childId, year, subject, data)
getRewards(childId)                 · saveRewards(childId, data)
```

**Every method is `async` even though localStorage is synchronous.** That is deliberate
and load-bearing: it is what lets a future `mongoStore.js` implement the same interface
against a real API and be swapped in by changing the single re-export in `index.js`.
Do not "simplify" these to synchronous calls.

Documents are deliberately Mongo-shaped, `_id` from `crypto.randomUUID()`, one
localStorage key per collection (`dl.parents`, `dl.children`, `dl.progress`,
`dl.rewards`):

```js
parents:  { _id, email, passwordHash, passwordSalt, iterations,
            accountType, ageBand, createdAt }
children: { _id, parentId, name, avatar, colour, yearGroup, createdAt }
progress: { _id, childId, year, subject, schemaVersion: 1, data: {...}, createdAt, updatedAt }
rewards:  { _id, childId, schemaVersion: 1, data: {...}, createdAt, updatedAt }
```

Rewards are **one document per child**, not per year+subject like progress — a
badge belongs to the learner across every year they study (§4.10).

Two browser-local keys, neither of them identity:

- `dl.session` = `{ parentId, childId, email }`. The `email` is a **display hint
  only** — identity always re-validates `parentId` against the store.
- `dl.lastAccount` = `{ email, accountType, profiles: [{id, name, avatar, colour}] }`,
  written on sign-in so `/login` can greet a returning family by their profile
  faces and ask for the password alone. **Display data only** — never a
  credential, hash or token, and a test asserts that. It does not skip
  authentication; the 30-day session cookie is what usually keeps a family
  signed in, and when `/login` does appear the password is genuinely required.

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
server/routes/       auth, children, progress, rewards
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

**Solar System constellation explorer (built 2026-09-21):** `/solar-system`
includes an idle-only Constellations entry point. Stage one presents Ursa Major
as an animated, responsive SVG star chart with child-friendly description,
facts, shared speech-synthesis narration, mute/replay controls, and navigation
that is already data-driven for more constellations. Catalogue data stores real
J2000 right ascension and declination in `constellations.js`; the pure
`constellationProjection.js` module converts it to a proportion-preserving
gnomonic chart and also exposes unit vectors for a future Three.js sky stage.
Constellation mode is derived from the existing meteor/tour state, dims but does
not stop the scene, hides exploration overlays, and prevents meteor launch. The
chart and data contracts have 13 pure tests. Desktop, 375 px, both themes,
reduced motion, narration controls, tour/meteor/search regressions, and both exit
paths were browser-verified with no runtime errors. No dependencies were added.

**Solar System meteor experiment (implementation in progress, 2026-09-20):**
`/solar-system` now has Launch meteor and Reset Solar System controls. The page
keeps its existing renderer/animation loop and adds a pure world clock, a pure
phase timeline, numeric fragment/path helpers, and a Three.js effect controller
under `src/pages/skills/geography/`. During launch it freezes the world, stops
the tour/follow/search, frames Earth, then shows an approaching meteor, impact,
textured curved fragments, and a held aftermath. Reset restores the initial
world, camera, controls, labels, lights, stars, belt, and pane settings without
writing progress. The breakup camera rises above the orbital plane so Venus
does not cover Earth when the planets align.

Verified 2026-09-20 in a local headless browser: the full sequence in both themes,
reset from every phase (including a pane sweep that restored all defaults after
edits that reallocate star and belt buffers), keyboard and focus handling,
320–1440 px layouts with live resize, reduced motion including a mid-flight
preference change, rapid input, hidden-tab return, route exit and re-entry,
exploration regression, recoverable construction failure, and ten repeat cycles
with flat resource counts (67 geometries / 19 textures / 19 programs). Desktop
production-preview frames ran at a median 8.3 ms with Reset visible in 9 ms.

The effect layer was then reworked for a more cinematic look (2026-09-20): a
seeded irregular rock, a tapered plasma trail, a screen-space motion-blur streak,
a drifting smoke column, a surface heat spot, a white impact flash, two soft
decelerating shockwaves, sparks with drag, and a cooling ejecta cloud, with the
corona, emissive and light all ramping as the meteor closes in.

Four things worth knowing before touching this again. Particles use one small
`ShaderMaterial` with per-particle size, colour and alpha, because `PointsMaterial`
allows only one size and one colour per system; it keeps `gl_PointSize` correct by
reading the drawing-buffer height in `onBeforeRender`. Any light added near a
planet must be tiny — the Sun is intensity 400 at about 25 units, so its local
irradiance is under 1, and a close light with decay 2 blows out the surface at
anything above roughly 0.25. Hard-edged `RingGeometry` reads as a solid band rather
than a shockwave, so the blast rings use a soft gradient texture on a plane. And
the controller is built lazily on the first accepted launch inside the launch error
boundary, so a construction failure leaves ordinary exploration usable behind a
retry message.

Still open: physical-device performance, which no device in this workspace can
supply — tracked in the
[tracker](solar-system-meteor/IMPLEMENTATION_TRACKER.md). No dependencies added.

### Accounts — built 2026-09-15, rebuilt 2026-09-19
Sign-up (`/signup`), sign-in (`/login`), child profile picker (`/profiles`), and an
account admin screen (`/parent`). See §4.7. Curriculum Mode requires a selected child
profile; Skills Mode does not.

**`/signup` is a wizard on one route**, because two different people arrive there
and the old single screen served only one of them — it greeted a ten-year-old
with "Create a parent account" and three password fields:

| Step | Grown-up branch | Learner branch |
|---|---|---|
| 0 | Two illustrated choice cards | same screen |
| 0b | — | "How old are you?" age chips. Under 13 → a warm dead end offering "Get a grown-up". **No account is created.** |
| 1 | Email, password, confirm, show/hide, live strength hint | same, gentler copy |
| 2 | "Add your first child" (`ProfileBuilder`) | "Make my profile" |
| → | `/profiles` | `/curriculum` |

⚠️ **The account is created at the end of step 1, not at the end of the wizard**,
because step 2 calls `addChild`, which needs an authenticated account. So a
failure at step 2 leaves a real account with no profile — recoverable, and it
routes to `/profiles`, which is exactly the screen for adding one. There is no
way back from step 2: the credentials are already saved.

**The age gate is an honest speed bump, not compliance.** A child can tap an
older age. It is enough for a family project and is deliberately not enough for
a public launch — see PROJECT_IDEAS.

`AuthShell` gives `/login` and `/signup` one drifting sky, one card and one
entrance, so moving between them reads as two views of the same place.
`ProfileBuilder` was lifted out of `Profiles.jsx` so the wizard and the picker
share one implementation of the name/avatar/colour/year form — they had been
two copies, which is how a colour picker gets fixed on one screen and not the
other. It only ever CREATES; editing an existing profile happens in `/parent`.

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
**Year 2 Mathematics** has all thirty-nine topics built — the year is complete:

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
| Statistics | Pictograms | 1, 2, 3, 4 ✅ |
| Statistics | Tally Charts | 1, 2, 3, 4 ✅ |
| Statistics | Block Diagrams | 1, 2, 3, 4 ✅ |
| Statistics | Tables | 1, 2, 3, 4 ✅ |
| Statistics | Gathering Information and Using Data | 1, 2, 3, 4 ✅ |

All thirty-nine are built on the **shared challenge kit**
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

Statistics added the last five: `PictogramChart` (with the key that carries
many-to-one correspondence at ratios 2, 5 and 10), `TallyChart` (real gates of
five, the fifth mark struck across the other four), `BlockDiagram` (countable
bricks against a labelled axis, not a smooth bar), `DataTable` (the one
representation with no picture) and `SurveyTray` (an unsorted pile — data
before anyone organised it, which is what makes "count the objects in each
category" askable at all). All five read and build, so the same component
serves "interpret" and "construct".

Two rules that module enforces, both learnt the hard way elsewhere in the kit:

* **An ambiguous dataset answers `null`.** `mostPopular`, `leastPopular` and
  `sortByQuantity` return `null` on a tie rather than picking a winner, because
  a tie gives a question several correct answers while the challenge accepts
  one — a correct learner marked wrong.
* **Stepping controls report a step, never a total.** The +/− buttons on a
  pictogram or tally chart emit `+1`/`−1` and the challenge applies it to its
  own previous state. A total computed from the rendered value is computed from
  stale props, and two fast taps in one React batch lose one — the same bug
  `NumberInput` had.

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

`.problem-page button { margin-top: 1.5rem }` in `ProblemView.css` reaches
**every** button inside a challenge, including the ten block slots in each
`BlockDiagram` column — which pulled the bricks 24px apart and left the stack
no longer lining up with its own axis. The kit neutralises it for its own
tightly-packed controls (`.block-stack .block-slot`, `.survey-tray
.survey-item`, `.pictogram-controls .chart-step-btn`); two classes outrank one
class plus a type, so the kit wins without naming the host. Any future kit
component that renders a dense row or column of buttons needs the same line.

Locked topics still list their challenges (each rendered locked and
unclickable). Hiding them left a locked topic as a bare padlock, with no sign
of what it held or how much of it there was.

### Development seed (2026-09-19)

```bash
npm run seed              # create or refresh the test account
npm run seed -- --purge   # wipe the app's collections first
npm run seed -- --dry     # print the plan, write nothing
```

Creates `testuser@gmail.com` / `password` with two children — **Demi** (Year 3,
well into Year 2 and starting Year 3) and **Liam** (Year 2, the mirror image).
Their progress differs on purpose: the profile cards, the resume card and the
parent breakdown all pick "most recently played", and that is only visible when
two children disagree.

**It seeds both storage modes, because the app has two (§4.7):**

- **MongoDB**, whenever `MONGODB_URI` is set. Read by the app built with
  `VITE_USE_API=true`.
- **`dev-seed.json` at the repo root**, always. In the default localStorage
  mode the browser *is* the database and no Node script can reach it, so the
  script writes a bundle and prints a console snippet that loads it.

  ⚠️ **It must not live in `public/`.** Everything in `public/` is copied into
  `dist/`, so a local `npm run build` packaged this test account's password
  hash into the deployable bundle — caught 2026-09-19 by checking `dist/`
  after the build. `.gitignore` protects the repo and CI, but not a local
  build. A dev-only Vite middleware (`devSeedPlugin` in `vite.config.js`,
  `apply: 'serve'`) serves it at `/dev-seed.json` instead, so it cannot reach
  a build at all.

Three things to keep:

- **Progress is built in DISPLAY ORDER.** Completing challenges at random would
  produce a learner the app itself shows as impossible — challenge 3 done while
  1 and 2 are locked. Walking in order is what makes the seeded state obey the
  unlock rules in §4.5.
- **Only built challenges are completed.** `scripts/seedBuilt.js` reads the
  filesystem, because `challengeAvailability.js` uses `import.meta.glob`, which
  does not exist outside Vite. The path pattern must stay in step with §4.3 or
  the seed marks challenges complete that nobody can open.
- **Badges are replayed, not invented.** Each completion goes through the real
  `getCompletionMilestones` and `earnBadges`, so a seeded child's badges can
  never claim something their progress does not support.

⚠️ `--purge` deletes **every** parent, child, progress and rewards document in
the target database, not only the seeded ones. It refuses when `NODE_ENV` is
`production`, refuses when the database name matches `/prod|live|production/i`
without `--i-know-what-i-am-doing`, and prints the cluster host and database
name with a 3-second pause before acting. Do not remove those.

### Year group on a profile (2026-09-19)

`yearGroup` lives on the child document; **absent means "not chosen"**, so there
is no migration and no guessing. A year is never inferred from progress — a
child who tried Year 3 once must not be labelled Year 3 forever.

Adding it required the write path that did not exist: a profile was
create-or-delete only. `store.updateChild(childId, patch)` now exists on both
drivers, with `PATCH /api/children/:childId` behind `requireOwnedChild`.

**`src/data/childFields.js` is not optional.** A patch is the one place a caller
could set `parentId` (handing a child to another family) or `_id` (orphaning
every progress document pointing at the old one). Both are silent. The
whitelist is shared by both drivers and the server and tested from both ends.

**`undefined` means "not supplied"; `null` means "clear it".** Callers build
patches by destructuring, so `{ name, avatar, colour, yearGroup }` from an
argument that never mentioned a year still carries a `yearGroup` key holding
`undefined`. Keying off `in` alone read that as an explicit invalid value and
broke `createChild` for every caller that did not pass a year — caught by the
existing store tests.

The curriculum picker **pre-selects** the saved year rather than removing the
step, and skips itself only when that year has exactly one ready subject. The
skip needs an escape hatch: leaving a curriculum **remounts** the picker, so
component state cannot remember "I came to change it", and the back arrow
bounced straight back in with the picker unreachable. `CurriculumPage`'s back
link is therefore `/curriculum?pick=1`; every other link still wants the skip.

### Renaming a child profile (2026-09-19)

Each profile row on `/parent` has a name field and Save name button, including
on a learner account's "My account" screen. The form rejects blank names,
reports failed saves beside the field, and calls the existing `updateChild`
context method. That method refreshes the profile list, the active child, and
the login screen's welcome-back record. The child ID and progress documents
stay unchanged. The parent and profile picker pages share a drifting glyph
backdrop like the Home and Skills hubs. On narrow screens the parent page's name
form stacks, year buttons wrap, and long names stay inside their profile card.

### Badges (2026-09-19)

One **rewards document per child**, separate from progress: a badge belongs to
the learner across every year, and keeping them apart means a reward bug can
never corrupt a completion. `store.getRewards/saveRewards`, `GET`/`PUT
/api/rewards/:childId`, and deleting a child cascades to both.

`src/data/badges.js` holds the catalogue and `earnBadges`. It hangs off
`getCompletionMilestones`, which already decides when a topic or category is
finished — nothing re-derives that.

Two things to keep true:

- **The tally is its own field.** `counts` records milestones *reached*, which
  is not the same as badges held: "Topic master" needs five topics but only the
  first awards a badge, so the badge log alone can never count topics. Deriving
  the count from the log is the bug this shape exists to prevent.
- **Idempotence comes from upstream.** `getCompletionMilestones` returns
  `earned: []` for an already-complete challenge, which is what makes replaying
  a completion — double submit, refresh, a child redoing a topic — award
  nothing and leave the tally alone. Never call `earnBadges` with invented
  milestones.

`useRewards` mirrors `useProgress`'s `loadedKeyRef` guard, because the same
child-switch hazard applies. Unlike progress its write is **explicit**, not an
effect on state: badges are awarded at exactly one moment.

Unlocked avatars are redeemed in `/parent`, which is the only place an existing
profile can be edited at all — `ProfileBuilder` only ever creates. Locked
pictures are still shown, padlocked: a reward nobody knows about motivates
nobody.

### Progress visibility — where each figure comes from (2026-09-19)

Four screens show progress, and they all read the **same** two modules, which is
deliberate: when they each derived their own, two screens could describe the same
child differently.

| Screen | Shows | Source |
|---|---|---|
| Home | current-topic ring, "x of y done", resume card | `useHomeResume` → `pickResume` |
| `/curriculum/year/:y/:s` | year ring, per-category bar, per-topic counts | `useProgress` + `curriculumProgressStats` |
| `/profiles` cards | ring + "Year 3 Maths · 12 of 40" | `useChildrenProgress` → `pickResume` |
| `/parent` per child | year figure, category bars, topic counts | `useChildrenProgress` → `summary.categories` |

- **`src/data/curriculumResume.js`** (was `pages/home/homeResume.js`, moved
  2026-09-19) picks the most recently stamped curriculum for one child and
  returns its stats, category breakdown and next challenge. Pure.
- **`src/data/resumeCandidates.js`** loads the documents `pickResume` consumes.
  Shared by the homepage and the profile picker so they cannot read different
  sets of curricula and disagree about where a child is.
- **`src/hooks/useChildrenProgress.js`** does the same for a LIST of children.
  It exists because `useProgress` and `useHomeResume` both key off the *active*
  child, and `/profiles` renders before anyone is selected.
- **`src/components/ProgressRing.jsx`** is the one ring. It was written out
  identically twice before this; `prefix` names its classes so each page keeps
  its own size and colours.

Two rules the UI follows and should keep following:

- **Never render a 0% ring for a learner who has not started.** `/profiles`
  shows "Ready to start! ✨" instead. An empty dial reads as "you have done
  nothing", which is the opposite of the intent.
- **Withhold the figure until it has loaded** rather than showing 0 and jumping.
  `CurriculumPage` gates on `hydrated`; the profile cards gate on `loading`.

**Cost:** these screens read one document per child per available curriculum —
2 per child today. Free on localStorage, N×2 HTTP requests against the API. If
that ever hurts, the fix is a bulk summary endpoint on the server, not caching
in the hook.

### Curriculum Mode — progress display
`CurriculumPage` shows a year progress bar plus a per-topic `x/y` counter, both
computed by `src/data/curriculumProgressStats.js`. Denominators count only
*built* challenges so 100% is reachable; `datasetTotal` carries the full
curriculum count so the UI can say "12 of 12 available · 12 of 156 in the full
curriculum" rather than letting 100% read as "year finished".

The **Year 2** dataset holds **39 topics across 8 categories = 156 challenge
slots**, all built. Earlier revisions of these docs said 35 topics; that was
wrong, and was caught 2026-09-18 by reading the count off the running app.

**Year 3 Maths exists as of 2026-09-18.**
[year3MathCurriculum.js](../src/data/year3MathCurriculum.js) holds **44 topics
across 7 categories = 176 challenge slots**, authored from
[docs/curriculum/year-3-maths.md](curriculum/year-3-maths.md) (DfE programme of
study, OGL v3.0). Every topic traces to a statutory bullet.

**Seven categories, not eight:** the Year 3 programme of study has no "Position
and Direction" strand. Year 3 showing one fewer card than Year 2 is correct.

Year 3 is selectable from `/curriculum` — registered in
[curriculumRegistry.js](../src/data/curriculumRegistry.js), which was already
year-aware, so no other code changed.

Progress is namespaced per `(childId, year, subject)`, so Year 2 and Year 3 are
independent documents; verified in-browser that adding Year 3 leaves existing
Year 2 progress untouched and writes no Year 3 document until something is
completed.

Dataset invariants are covered by `src/data/year3MathCurriculum.test.js` —
notably that topic ids are unique across the whole year, since they become
challenge directory names and a collision would be silent breakage.

**Year 3 challenges — all 44 topics built (176 of 176 challenges).** All seven
categories are complete. *Number - Fractions* (all seven topics) was built
separately. **Number - Number and Place Value** has all seven
topics: place value in 3-digit numbers; counting in multiples of 4, 8, 50 and
100; finding 10 or 100 more or less; comparing and ordering numbers to 1000;
representing and estimating numbers; reading and writing numbers to 1000; and
number and place value problems. **Number - Addition and Subtraction** has all
six: mental changes to ones, tens and hundreds; column addition; column
subtraction; estimating and inverse checks; missing numbers; and one- and
two-step problems. **Number - Multiplication and Division** has all five topics:

| Category | Topic | Challenges built |
|---|---|---|
| Number - Multiplication and Division | 3 and 4 Times Tables | 1, 2, 3, 4 ✅ |
| Number - Multiplication and Division | The 8 Times Table | 1, 2, 3, 4 ✅ |
| Number - Multiplication and Division | Multiplying and Dividing Two-Digit Numbers | 1, 2, 3, 4 ✅ |
| Number - Multiplication and Division | Scaling and Correspondence Problems | 1, 2, 3, 4 ✅ |
| Number - Multiplication and Division | Multiplication and Division Problems | 1, 2, 3, 4 ✅ |
| Measurement | Measuring Length in mm, cm and m | 1, 2, 3, 4 ✅ |
| Measurement | Measuring Mass | 1, 2, 3, 4 ✅ |
| Measurement | Measuring Volume and Capacity | 1, 2, 3, 4 ✅ |
| Measurement | Adding and Subtracting Measurements | 1, 2, 3, 4 ✅ |
| Measurement | Perimeter of 2-D Shapes | 1, 2, 3, 4 ✅ |
| Measurement | Money and Giving Change | 1, 2, 3, 4 ✅ |
| Measurement | Telling the Time to the Minute | 1, 2, 3, 4 ✅ |
| Measurement | Roman Numerals and 24-Hour Clocks | 1, 2, 3, 4 ✅ |
| Measurement | Units of Time and Durations | 1, 2, 3, 4 ✅ |
| Geometry – Properties of Shapes | Drawing 2-D Shapes | 1, 2, 3, 4 ✅ |
| Geometry – Properties of Shapes | Making and Recognising 3-D Shapes | 1, 2, 3, 4 ✅ |
| Geometry – Properties of Shapes | Angles as Turns | 1, 2, 3, 4 ✅ |
| Geometry – Properties of Shapes | Right Angles | 1, 2, 3, 4 ✅ |
| Geometry – Properties of Shapes | Comparing Angles to a Right Angle | 1, 2, 3, 4 ✅ |
| Geometry – Properties of Shapes | Horizontal, Vertical, Parallel and Perpendicular Lines | 1, 2, 3, 4 ✅ |
| Statistics | Bar Charts | 1, 2, 3, 4 ✅ |
| Statistics | Scaled Pictograms | 1, 2, 3, 4 ✅ |
| Statistics | Tables | 1, 2, 3, 4 ✅ |
| Statistics | One-Step and Two-Step Questions | 1, 2, 3, 4 ✅ |

Each topic uses a pure question generator with `node:test` coverage. A fresh
learner can now follow a continuous path from the first challenge of the year
through Statistics. Year 3 Statistics reuses `BarChart`, `PictogramChart`,
`DataTable`, `ChoiceGrid` and `NumberInput`: learners read, compare, build, then
solve one- and two-step questions from scales of 2, 5 and 10. `BarChart` now
locks its controls after success, caps them at the axis top and gives its ±
buttons large touch targets, including a narrow-screen layout.

⚠️ **Two Year 3 topics overlap on paper and must not overlap in practice.**
*Finding 10 or 100 More or Less* (place value) and *Adding and Subtracting Ones,
Tens and Hundreds* (addition and subtraction) both change a 3-digit number by a
power of ten. They are kept apart by scope and by framing: the place value topic
uses only 10 and 100 and asks which DIGIT moves — a labelled neighbour strip,
reading a jump backwards from before/after, filling all four neighbours at once,
and counting chains. The arithmetic topic keeps ±1, the block pictures and the
story problems. Anyone editing either one should read both first.

Ten kit components were added for Year 3, all in `src/components/challenge/`:

| Component | Serves | Why it isn't an existing component |
|---|---|---|
| `PlaceValueBlocks` | 3-digit place value, representing & estimating | Base-ten flats/rods/cubes. Each piece is drawn from its own cells so a learner can count a rod and confirm it is ten. |
| `ColumnBuilder` | column addition & subtraction, estimating & checking | Carries and exchanges are rendered as their own marks. A component that showed only the finished sum would hide the step being taught. |
| `AngleExplorer` | angles as turns, right angles, comparing angles | `RotationDial` turns only in whole right angles by design, so "greater or less than a right angle?" has nothing in between to show. |
| `BarChart` | bar charts, one/two-step questions | `BlockDiagram` deliberately refuses smooth bars — Year 2 counts squares. Year 3 must READ a value off a scale, which is the opposite requirement. |
| `PerimeterShape` | perimeter, adding & subtracting measurements | `ShapeFigure` has no side labels to sum; `traced` lights sides one at a time so the total is seen to accumulate. |
| `FactTriangle` | multiplication and division fact families | Keeps the product above its two factors so one picture supports both multiplication and inverse division facts. |
| `PartitionBoard` | two-digit multiplication and division | Shows a calculation split into friendly chunks and lets the learner build those chunks without duplicating the layout. |
| `ShortMultiplication` | formal two-digit by one-digit multiplication | Gives each answer place its own large selectable slot, keeping the written method aligned by place value. |
| `CorrespondenceBoard` | all-pairs correspondence problems | Makes every one-from-each-set pairing explicit and keyboard-operable as a matrix of large buttons. |
| `MixedUnitBuilder` | m/cm, kg/g and l/ml composition | Shows the large-unit whole and small-unit remainder together, with one reusable control for all three conversion families. |

Their animations are functional, not decorative — a carry hops into its column,
ten ones pop in as countable pieces, an angle sweeps rather than jumps, bars
grow from the axis, a perimeter lights up edge by edge. All are disabled under
`prefers-reduced-motion`.

Existing kit components were **extended** rather than copied when a new year
needed finer representations — a near-identical widget is how challenge files
drift apart:

| Component | Extension | Why |
|---|---|---|
| `NumberLine` | optional `captions` | A row is not always a count. "100 less / 10 less / 342 / 10 more / 100 more" needs each cell to say what it is, or the blanks have no question attached to them. |
| `ChoiceGrid` | `variant="wordy"` | Four options reading "four hundred and six" at the numeric size fill the screen and stop being comparable at a glance. |
| `PlaceValueBlocks` | reused as a builder | The same component reads a number (`showCounts={false}`) and builds one (`onStep`), which is what keeps Challenge 1 and Challenge 3 of *Representing and Estimating Numbers* showing the same picture. |
| `ScaleReader` / `MeasureDrag` | optional `minorStep` | Year 3 rulers and jugs need fine, unlabelled subdivisions while keeping major labels readable; Year 2 retains its previous behaviour by default. |
| `ClockFace` | `numeralStyle="roman"` | One dial now teaches Arabic and Roman clock faces without duplicating the hand geometry. |
| `TimeSetter` | optional `minuteStep` | Year 2 still moves in five-minute steps while Year 3 can set a time to the nearest minute. |
| `ShapeFigure` | optional `drawnSides` and `highlightSides` | The same polygon data now supports tracing a drawing and identifying line relationships without a second shape renderer. |
| `SolidFigure` | optional `rotation` | A solid can be recognised in another orientation while retaining the same complete edge drawing. |

⚠️ **A generator that can produce an unanswerable question should refuse.**
`solveConstraints` in `numberAndPlaceValueProblems.js` brute-forces every
3-digit number and returns null for a clue set with NO solution *and* for one
with two, because both mark a correct child wrong. `estimateOptions` in
`representingNumbers.js` refuses any option within 100 of the answer, since two
options twenty apart make a correct estimate a coin toss. Both are pinned by
tests; neither failure would ever be visible on screen.

⚠️ **A picture must not print its own answer.** The first cut of Challenge 1
asked "how many hundreds?" while `PlaceValueBlocks` displayed "Hundreds 4" above
the blocks, so the task could be completed without counting. `showCounts={false}`
fixes it. Only a real render showed this — every unit test and the static checks
passed, because the challenge agreed with itself.

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
   would still accept duplicates. The `rewards` collection (added 2026-09-19) has
   **no index at all**, and its `childId` should be unique for the same reason —
   the route upserts on it. Run, once:
   `db.parents.createIndex({email:1},{unique:true})`,
   `db.progress.createIndex({childId:1,year:1,subject:1},{unique:true})` and
   `db.rewards.createIndex({childId:1},{unique:true})`.
9. **`apiStore` has no unit tests** — it was verified end-to-end in a browser against a
   real server (signup → profile → challenge → logout → login → progress intact), but
   has no `fetch`-mocked test file of its own.
10. **No accessibility pass** — drag-and-drop interactions have no keyboard or
   screen-reader alternative; no audio support for pre-readers.
**Resolved since last review:**

- **Numbers and Counting Challenge 3 rejected correct answers** (found
  2026-08-09, fixed 2026-09-18). `handleSubmit` compared
  `answers[i] === sequence[i].toString()` — a STRING comparison — so an answer
  padded with a leading zero ("043" for 43) was rejected while looking correct
  on screen. Fixed by rebuilding the topic on the shared kit and comparing by
  value via `isCorrectNumber`, which is unit-tested.
- **`Challenge.jsx` no longer uses `/* @vite-ignore */`** — it now resolves
  challenges through a static
  `import.meta.glob("../skills/*/challenges/year*/*/*Challenge*.jsx")` registry,
  so missing files are detectable and Vite can statically analyse the import.

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
