# 📖 Project Knowledge — Learn with Bix

## Implemented Curriculum Mode pathways

**Complete** means every planned topic has all four challenge files implemented;
it does not certify full statutory coverage. Topic links list the complete topic
inventory for each pathway.

| Year | Subject / topic inventory | Topics | Challenges | Status |
|---|---|---:|---:|---|
| 1 | [Maths](../src/data/year1MathCurriculum.js) | 32 | 128 | Complete |
| 1 | [English](../src/data/year1EnglishCurriculum.js) | 38 | 152 | Complete |
| 1 | [Science](../src/data/year1ScienceCurriculum.js) | 16 | 64 | Complete |
| 1 | [History](../src/data/year1HistoryCurriculum.js) | 14 | 56 | Complete |
| 1 | [Geography](../src/data/year1GeographyCurriculum.js) | 12 | 48 | Complete |
| 2 | [Maths](../src/data/year2MathCurriculum.js) | 39 | 156 | Complete |
| 2 | [English](../src/data/year2EnglishCurriculum.js) | 39 | 156 | Complete |
| 2 | [Science](../src/data/year2ScienceCurriculum.js) | 19 | 76 | Complete |
| 2 | [History](../src/data/year2HistoryCurriculum.js) | 17 | 68 | Complete |
| 2 | [Geography](../src/data/year2GeographyCurriculum.js) | 14 | 56 | Complete |
| 3 | [Maths](../src/data/year3MathCurriculum.js) | 44 | 176 | Complete |
| 3 | [English](../src/data/year3EnglishCurriculum.js) | 32 | 128 | Complete |
| 3 | [Science](../src/data/year3ScienceCurriculum.js) | 21 | 84 | Complete |
| 3 | [History](../src/data/year3HistoryCurriculum.js) | 22 | 88 | Complete |
| 3 | [Geography](../src/data/year3GeographyCurriculum.js) | 16 | 64 | Complete |
| 4 | [Maths](../src/data/year4MathCurriculum.js) | 42 | 168 | Complete |
| 4 | [English](../src/data/year4EnglishCurriculum.js) | 33 | 132 | Complete |
| 4 | [Science](../src/data/year4ScienceCurriculum.js) | 20 | 80 | Complete |
| 4 | [Geography](../src/data/year4GeographyCurriculum.js) | 16 | 64 | Complete |
| 4 | [History](../src/data/year4HistoryCurriculum.js) | 18 | 72 | Complete |
| 5 | All subjects | 0 | 0 | Not implemented |
| 6 | All subjects | 0 | 0 | Not implemented |
| **Total** | **20 complete pathways** | **504 built** | **2,016 built** | |

Other year/subject combinations have no implemented Curriculum Mode pathway.
History: Years 1–4 are complete (see
`docs/history-curriculum/HISTORY_TRACKER.md`).
Geography's standalone Skills Mode games and saved programmes in
`docs/curriculum/` do not count as curriculum implementations.
Specifications for Years 1–4 Geography were drafted on 2026-10-13: 58 proposed
topics / 232 challenge briefs, with an embedded implementation tracker in each
year spec and the shared spec. See [Geography specs](geography-curriculum/README.md).
Subsequent owner requests implemented Year 3 and Year 4: 16 topics / 64 challenges
each, included in the totals above. Year 1 (12 topics / 48 challenges) followed
on 2026-10-13; Year 2 (14 topics / 56 challenges) is also implemented.
See "Curriculum Mode — Year 1 Geography" below.
Geography uses the existing per-child progress tree and stays outside the
overall year awards. Physical-device voice/touch review remains pending.

The homepage curriculum section highlights this inventory in
`HomeCurriculumOverview.jsx`: Years 1–6 and every registry subject, topic counts,
totals derived from the curriculum datasets and challenge availability. The
caption reads “Number of topics by year and subject”; cells show topic counts
without completion labels. A small note beneath the table clarifies that Learn with Bix is
independently developed, with no UK government affiliation or endorsement.
Unavailable pathways are labelled “Not yet available”; Geography is the last
column in the homepage table. The table scrolls horizontally on small
screens and uses the homepage's paired theme tokens. Subject icons appear beside
the table's column headings, replacing the separate subject badge list. History
also appears in the homepage hero (2026-10-13).

For signed-out visitors, “Start my adventure” links to `/signup` and “Explore the
curriculum” opens `/what-we-teach` (2026-10-15). Signed-in users retain curriculum
access and their next-challenge resume destination.

Homepage skill cards group their content in `.home-skill-copy`. At every viewport,
the subject and skill name sit beside a compact icon, with the description below
and tighter padding and gaps. The grid uses one, two or four columns according to
screen width. Actions remain aligned at the bottom of each card row on desktop
(2026-10-13).

---

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

**Last reviewed:** 2026-10-12

---

## 1. What This Project Is

Ocean Explorer Phase 1 (2026-10-29): the stationary-submarine prototype is
implemented at `/skills/ocean-explorer`, with its public preview guide at
`/learn/ocean-explorer`. The [design](superpowers/specs/2026-10-29-ocean-explorer-design.md)
keeps the experience and broad phases; the completed
[Phase 1 build plan](superpowers/plans/2026-10-29-ocean-explorer-phase-1.md)
records implementation and verification. Phase 2 (manual steering) is built; see the
[Phase 2 plan](superpowers/plans/2026-10-29-ocean-explorer-phase-2.md). Phase 3 (orbit a
coral reef and read its card) is built; see the
[Phase 3 plan](superpowers/plans/2026-10-29-ocean-explorer-phase-3.md). Phase 4 starts sea
life with one swimming parrotfish that can be orbited; see the
[Phase 4 plan](superpowers/plans/2026-10-29-ocean-explorer-phase-4.md). More animals, tours and
area travel remain idea #44 in `PROJECT_IDEAS.md`. Ocean Explorer is the second
[explorable world](superpowers/specs/2026-10-29-explorable-worlds-design.md) built on the
Solar System's concept.

Brand logo (2026-10-21): the navbar and footer share `BrandMark`, displaying
static Bix SVG artwork derived from the existing mascot favicon. Coral and teal
variants follow the app's selected theme. The existing LB mark appears if the
selected image cannot load; the navbar retains its accessible home-link name.

Home-screen installation (2026-10-21): the existing Bix PNG icons serve Android
(192px, 512px and a padded maskable icon) and Apple (180px touch icon). The
manifest uses a stable root `id`, UK English and standalone display. Shared HTML
includes the explicit Apple touch-icon size, Bix home-screen title, standalone
capability and default status bar metadata. Installed launches open `/` in the
existing app; network access is still required. No offline caching is provided.
Verify installation on physical iOS and Android devices after deployment; an
existing shortcut may need to be removed and added again to refresh its icon.


Column answer entry (2026-10-20): Year 3 column addition/subtraction challenges
3–4 and short multiplication, plus Year 4 column addition/subtraction and written
multiplication layouts, use shared `ColumnAnswer`. Learners enter one digit per
aligned answer box, starting at ones and advancing left; selecting a box replaces
its digit. Touch and physical keyboards work, Backspace removes a digit and
Clear resets the whole answer. Submission waits for every column, including
zeroes. Each round resets its entry and locks every control during success.
`ColumnBuilder` supports variable column counts and multiplication. Year 4 column
challenge 3 now uses the same column boxes rather than left-to-right digit tiles;
column and written-multiplication story rounds also display the working layout.
The existing curriculum questions, progress contracts and unlock rules remain.
Second-pass audit: all live column-entry renderers route through this shared
control; Year 3 column challenges 1–2 use multiple choice, and Year 4 written
multiplication challenge 3 uses partitioned expression tiles. Years 1–2 have no
formal column-entry screens, and Year 5 has no implemented maths pathway.
Generated banks across 20 seeds confirm the seven Year 4 column-entry slots.
The wrong-answer regression derives a different value from each generated
answer, avoiding accidental correct guesses such as 99.

Curriculum numeric keypads (2026-10-20): shared `NumberInput` uses three
columns in calculator order (7–9, 4–6, 1–3), followed by Clear, 0 and Backspace.
This applies across all maths years and other curriculum users of the shared
input. Existing keyboard entry, digit limits, disabled states and theme tokens
are preserved; buttons retain their 54px minimum height.


Navbar backgrounds (2026-10-15): explicit paired tokens in `App.css` set
light mode to `#f3e5e8` and dark mode to `#22181c`, rather than inheriting
the page background.

Mobile tables (2026-10-15): lesson examples (including place value), data and
tally tables, pictograms and Year 4 maths visuals use the shared
`components/ui/ScrollableTable` viewport. Native table layout and touch targets
are preserved, with horizontal scrolling and keyboard focus when needed.
Existing homepage, multiplication, geography and science table viewports remain
in place. Shared minimum-width constraints let table ancestors shrink within
flex/grid layouts instead of expanding the mobile page. New tables should use
`ScrollableTable` or an equivalent constrained, keyboard-accessible viewport.
Browser verification checks lesson, data, editable tally and pictogram tables at
320, 375, 768 and 1280px in both themes: overflowing tables scroll and the page
stays within its viewport. The real homepage also loads successfully.

Signed-in auth navigation (2026-10-15): `/login` and `/signup` wait for session
restoration, then redirect existing accounts to `/curriculum` when a child is
active or `/profiles` otherwise. In-flight sign-in keeps its requested destination;
new signup keeps its completion hand-over. Public curriculum hub/guide actions
show “Explore the curriculum” for signed-in users and hide the sign-in prompt.
The guides’ final call to action also offers a next learning step instead of
asking existing accounts to finish account setup.

Public curriculum overviews (2026-10-15): `/what-we-teach` groups all 20
Years 1–4 Maths, English, Geography, Science and History guides by year.
Each `/curriculum-guide/year-<year>-<subject>` page uses the approved colourful,
spacious Year 3 Maths design. The public subject slug is `maths`; the curriculum
registry keeps its existing `math` ID. `shared/curriculumGuides.js` contains
reviewed public editorial copy keyed by category ID, subject-specific practical
limits and game/activity suggestions. Exact topic names and counts are read
from the existing curriculum registry. The same catalogue supplies public URLs,
metadata and sitemap entries; no learner state is included.

Summaries were checked against the topic inventories, `docs/curriculum/`
crosswalks, lesson registry and challenge renderers. Geography and History explain
that year allocations are Bix's choice within a statutory key stage; Years 3–4
English identifies its shared programme. Short lesson screens are described for
Maths and Year 3 English only. Science and History offer grown-up activity ideas
rather than imply dedicated ungated games exist. All pages explain practical
limits and avoid treating challenge counts as proof of full statutory coverage.
Some mapping status paragraphs predate implementation; the live registry and
challenge-availability checks confirm the shipped inventory.

Signed-out main navigation and homepage “Explore the curriculum” open the public
hub; “Start my adventure” still starts signup. All implemented homepage table
cells link to their corresponding guides. A centred “Explore what we teach →”
link directly beneath the table opens the full public hub, using the existing
quiet button styling and touch target. The footer and signup link to the hub;
each guide links to its year's other subjects. Signed-in learning navigation
retains its existing destination. All 48 public URLs use anonymous prerendering,
metadata, sitemap and existing server public-route handling. The guides use a
lavender hero with decorative Bix, paired theme colours, concise topic cards,
three learning steps and native expandable topic inventories/curriculum notes.

Validation: lint and production build pass. Browser checks exercise all twenty
guides without JavaScript and both themes at desktop/mobile widths; all public
URLs are discoverable from homepage HTML. All 405 component tests pass.
The English test blocker was fixed on 2026-10-15: prediction clue sorting now
shuffles once and searches a finite set of compatible pairs instead of retrying
random shuffles indefinitely. Every run still has five distinct pairs, covers all
nine predictions with one repeat in the last round, and excludes ambiguous
party/baking pairs. A new regression checks those constraints with constant RNGs;
the original bounded-generator test is enabled and passes. `npm test` now runs
unmodified to completion: 2,099 unit tests pass (four database-dependent skips)
and all 405 component tests pass. Lint and the production build also pass.
An isolated browser harness verifies the sorting challenge at mobile width in
both themes with constant RNG 0.5: wrong answers retry, all five correct rounds
finish and completion fires once. This checks the component, not the account or
progress flow; no real learner state was used.

SEO delivery (2026-10-14): public `/`, `/skills` and 25 `/learn/<game-slug>`
guides now receive anonymous React HTML generated during `npm run build`.
Express serves these documents with per-page metadata, canonical/social tags,
JSON-LD, sitemap and robots policy. Account/progress/utility and direct-game
screens retain the SPA and are `noindex`; guides link to unchanged ungated game
URLs. Review historical game search traffic before rolling out that indexing
policy. See [SEO audit](SEO_AUDIT.md) for findings, trade-offs and validation.
Production opts in with `SEO_INDEXABLE=true` at build/runtime; default and dev
are excluded. `PUBLIC_APP_URL` supplies the fixed public origin. Unknown frontend
routes/assets now return HTTP 404, and recognised slash/case/host variants use
308 redirects without losing query parameters. Internal prerender files and the
generated curriculum route manifest are not public URLs. The manifest recognises
routes only; it does not change gates, unlock rules, stored progress or ownership.

The Skills hub catalogue moved to `shared/skillsCatalog.js`; guide descriptions
live in `shared/skillGuides.js`. Adding a game requires its lazy route, catalogue
entry and guide content (see the updated `add-skill-game` guide). Games, auth and
curriculum pages load as lazy route modules; public hubs/guides remain eager.
Navbar scroll tracking uses a passive listener/ref; main navigation has a name,
the shell offers a skip link, and Speed Reader no longer nests a main landmark.
`scripts/prerender.js` uses existing Vite/React tooling and needs no browser to
build. `npm run check:seo` verifies built HTTP HTML and local Chrome/Playwright
behaviour without a database or third-party requests; screenshots are ignored in
`.seo-artifacts/`. The public sharing card is `public/social-card.png` with an
editable SVG source. HTML revalidates, hashed Vite assets cache immutably, and
private HTML/API responses remain `no-store`.

UI updates (2026-10-13): `components/ui/AppFooter.jsx` and its own paired-theme
stylesheet replace the homepage-only footer. `RootLayout` shows it on `/`,
`/curriculum`, `/skills`, `/trophies`, `/profiles`, `/parent`, `/login` and `/signup` (including trailing
slashes). The flex shell anchors it to the bottom of short pages and places it
after content on long pages. Profile, parent, login and signup pages defer viewport height to the
shell. Credits' History heading uses the reading sheet's padding; parent account
actions use a wrapping row with a 1rem gap; parent-area notes have a 1rem top
margin. Brain-break dialogs have a permanent,
non-empty “Brain break” heading and accessible name in both movement and cheer
states; changing instructions remain polite live announcements.

**Learn with Bix** (formerly Dynamic Learning) is an interactive web learning platform for primary-school
children (built first for ~6-year-olds / **UK Year 2**; Curriculum Mode now
also covers Years 1–4 Maths, English, Science and History). It teaches Maths, English,
Geometry and Geography through browser-based mini-games.

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
| Celebration particles | **canvas-confetti** | Lazy-loaded by `celebration/fx/effects.js` only (§4.5, "Celebrations") |
| Number words | **written-number** | Converts `42` → "forty-two" |
| Accounts | **Parent email + child profiles** | PBKDF2 password hashing, behind a swappable async store — see §4.7 |
| Backend | **Express + MongoDB Atlas** | `server/` — optional: the app still runs fully local. See §4.8 |
| Hosting | **Render.com** | Each Web Service serves the API and the built SPA (same origin for the session cookie) — see `render.yaml` and §6 item 17 |
| Linting | **ESLint 9** flat config | `npm run lint` |
| External APIs | **REST Countries** (`restcountries.com`) | Country names & flags for Flag Finder skill game |

Pure logic uses Node’s built-in `node:test`; React components use
Vitest + jsdom in `tests/components/`. `npm test` runs both suites. External
data is fetched from public APIs (currently just REST Countries for the
Flag Finder geography game).

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
- **Fields used:** `names.common` (country name), `flag.url_png` (flag image URL), `continents` (question-pool filters)
- **Authentication:** API key via `VITE_REST_COUNTRIES_API_KEY` env var. The provider requires a key for full access; browser origins must be allowed on that key.
- **Usage:** Generates unique country name + flag questions with 4-option multiple choice. Requests `limit=100`, follows `data.meta.more`, and begins play after the first usable page; see “Geography loading and game controls” below.

### Scripts
```bash
npm run dev         # Vite and the watched API together (without .env the API stops at FATAL; Vite keeps running)
npm run dev:web     # Vite only
npm run build       # Vite build + public React prerendering
npm run lint        # eslint
npm run preview     # preview production build
npm test            # node --test, then Vitest component tests
npm run server      # the Express API
npm run dev:server  # the API, watched, reading .env
npm run seed        # development seed account (see §5, "Development seed")
npm run check:seo   # built HTTP/crawl checks + local Chrome (no database)
```

---

## 3. Folder Structure

```
src/
├── main.jsx                  # Router definition — ALL routes registered here
├── App.css, index.css        # Global styles + CSS variables + light/dark themes
├── layouts/
│   └── RootLayout.jsx        # Navbar + <Outlet /> + shared hub footer
├── context/
│   ├── ThemeContext.jsx      # Global light/dark theme provider
│   ├── theme-context.js      # Context object, split out for Fast Refresh
│   ├── AuthContext.jsx       # Parent account + child profile provider (§4.7)
│   ├── auth-context.js       # Context object, split out for Fast Refresh
│   ├── RewardsContext.jsx    # RewardsProvider: the ONE writer of rewards (§5, "Badges, XP & streaks")
│   └── rewards-context.js    # Context object, split out for Fast Refresh
├── hooks/
│   ├── useProgress.js        # Active child's curriculum progress (§4.5)
│   ├── useRewards.js         # Thin reader of RewardsProvider (see "Badges, XP & streaks", §5)
│   ├── useChildrenProgress.js  # Progress for a LIST of children (§5)
│   ├── useChildrenRewards.js   # Badges for a LIST of children
│   └── useTrophyData.js        # One child's rewards + progress, read-only (Trophy Room)
├── components/               # Shared, reusable pieces
│   ├── RequireChild.jsx      # Route guard for Curriculum Mode (§4.7)
│   ├── ProgressRing.jsx      # The one percent dial, shared by 3 screens
│   ├── mascot/Mascot.jsx     # Bix — homepage, combo line, Trophy Room; secrets + `jokes` (§5, "Bix's jokes")
│   │                         #   JokeBubble, BixJokeCard (end of a topic), useBixJoke
│   ├── celebration/          # Completion sequence, steps/ (incl. LevelUpStep, StreakStep), fx/ (particles), sound/ (cues + mute)
│   ├── rewards/              # LevelBar, WeekDots: shared XP bar and Mon–Sun streak dots
│   ├── certificate/          # Certificate (+ print sheet), CertificateDialog, BixSignature (§5, "Certificates")
│   ├── skills/               # FreePlayShell (endless Skills games), useAnswerFeedback, AnswerFeedbackLine (§5)
│   ├── coach/CoachMark.jsx   # First-visit tips from Bix, shown once per child (§5, "First play")
│   ├── brainBreak/           # BrainBreak (mounted in RootLayout) + breakSetting.js, the device interval (§5)
│   ├── challenge/            # The shared challenge kit: maths + the English kit (LetterInput, TileBuilder,
│   │                         #   WordPicker, ReadingPassage, SortBins, SpeakButton, HintNote; english-kit.css; hints.js)
│   │                         #   readAloud.js + challenge-context.js: Maths "Read it to me" (§5)
│   │                         #   data/DataChallenge.jsx: draws questions authored as data (§5)
│   ├── ui/Navbar.jsx, ui/useModalDialog.js, ui/Dialog.jsx   # the one modal behaviour + a ready-made dialog (§7)
│   ├── ClockPanel.jsx, DualLabelClock.jsx,
│   ├── MapGame.jsx, MultiplicationGrid.jsx, ShapeQuiz.jsx
├── data/
│   ├── year1MathCurriculum.js    # 32 topics / 128 challenges; data questions + practical pictures
│   ├── year1EnglishCurriculum.js # 38 topics / 152 challenges; shared data-question renderer
│   ├── year1ScienceCurriculum.js # 16 topics / 64 challenges; authored banks + drawn diagrams
│   ├── year2ScienceCurriculum.js # 19 topics / 76 challenges; Year 1 recipe engine + drawn diagrams
│   ├── year4ScienceCurriculum.js # 20 topics / 80 challenges; authored evidence tasks + picture models
│   ├── year2MathCurriculum.js   # Curriculum tree (categories → topics)
│   ├── year2EnglishCurriculum.js # 39 topics / 156 challenges; shared data-question renderer
│   ├── year3MathCurriculum.js
│   ├── year3EnglishCurriculum.js, year4EnglishCurriculum.js
│   ├── year4HistoryCurriculum.js # 18 topics / 72 challenges; Anglo-Saxons, Scots and Vikings
│   ├── curriculumRegistry.js    # Which curricula exist — the one source (years 1–4)
│   ├── english/                 # English content shared across topics: appendix1.js (statutory word lists,
│   │                            #   our Y3/Y4 split), cast.js, passages*.js, textChecks.js (British spelling)
│   ├── avatars.js               # Starter profile emoji + colour tokens
│   ├── badges.js                # Badge catalogue + earnBadges (§5)
│   ├── rewardsShape.js          # normaliseRewards: the v3 rewards shape, migrated on read (§5)
│   ├── freePlay/                # Pure generators for the free-play games: money, measure, robot, charts, placeValue (§5)
│   ├── certificates.js, certificateSkills.js   # Which certificates a child holds (derived) + "I can…" lines (§5)
│   ├── bixJokes.js              # Bix's joke pool + nextJoke (never repeats until all told) (§5)
│   ├── mathSpeech.js            # On-screen maths → spoken words ("6 × 5 = ?" → "6 times 5 equals what?") (§5)
│   ├── intro.js                 # Bix's intro: who sees it, finishIntro, coach-mark tips (§5, "First play")
│   ├── dailyPuzzle.js           # Seeded puzzle per day + one-star-a-day reward (§5, "First play")
│   ├── brainBreaks.js           # Break activities, interval setting, which routes count (§5, "First play")
│   ├── xp.js, streak.js         # XP, levels, back-fill · streak, freezes, week dots (pure, §5)
│   ├── news.js                  # "Something new": addNews / clearNews / hasNews (§5)
│   ├── awardRun.js              # Everything one finished challenge changes, in one pure step (§5)
│   ├── childFields.js           # Writable child fields + year rules (§5)
│   ├── lastAccount.js           # `dl.lastAccount` welcome-back hint (§4.7)
│   ├── curriculumResume.js      # "Where was this child up to?" (§5)
│   ├── resumeCandidates.js      # Loads the documents pickResume consumes
│   ├── curriculumProgressStats.js
│   ├── progressRules.js, curriculumLocks.js, curriculumNavigation.js
│   ├── completionMilestones.js
│   ├── stickers.js              # Topic stickers, DERIVED from progress (§5)
│   ├── celebrationSteps.js      # Which celebration steps, effects, cues
│   ├── celebrationMessages.js   # Rotating, never-repeating headlines
│   ├── challenges/              # Pure question generators, unit-tested
│   │   ├── questionKinds.js     # The 13 data question kinds: rules, validateQuestion, lintBuild (§5)
│   │   ├── year1Science/        # Year 1 Science banks + recipe engine (engine.js, §5)
│   │   ├── year2Science/        # Year 2 Science banks on the Year 1 engine (§5)
│   │   └── english/             # One builder per English topic (+ shared.js); Year 4 ones are year4*.js
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
│   ├── toKebabCase.js        # Generates the IDs used in URLs + storage keys
│   └── speech.js             # One British speech-synthesis voice (Solar System, English/Science kit, Maths read-aloud)
├── pages/
│   ├── home/Home.jsx, HomeAchievements.jsx   # HomeAchievements: something-new, streak/level, collection and daily-puzzle cards
│   ├── intro/                # BixIntro (`/hello`, lazy) + StarBasket (drag / tap / keys lesson)
│   ├── puzzle/DailyPuzzle.jsx   # `/daily-puzzle`, lazy, ungated
│   ├── auth/                 # Login, signup/ (SignUpFlow), Profiles, ParentArea
│   ├── skills/
│   │   ├── SkillsPage.jsx    # Skills hub — links to every skill game
│   │   ├── math/             # Skill games, grouped by subject
│   │   ├── english/
│   │   ├── geography/
│   │   ├── math/challenges/year2/<topic-id>/<TopicName>ChallengeN.jsx
│   │   └── english/challenges/year3|year4/<Pascal>Game.jsx + <topic-id>/<Pascal>ChallengeN.jsx
│   └── curriculum/
│       ├── CurriculumPage.jsx   # Category/topic/challenge grid + lock logic
│       ├── ProblemView.jsx      # Shell around one challenge; saves progress
│       └── Challenge.jsx        # Dynamic loader for the challenge component
public/
├── countries.geojson, continents.geojson
├── images/landmarks/*.webp
├── sounds/*.mp3              # The app's 14 sound files — see docs/sounds/README.md
└── static/
docs/sounds/                  # Where each sound came from + how to replace one
├── README.md                 # Scenario → file → Mixkit id table, loudness, licence
├── mixkit-audition.html      # The page the sounds were chosen on (open in Chrome)
├── mixkit-catalogue.json     # 147 Mixkit sounds: id, title, preview URL
└── process-sounds.py, measure.py  # Rebuild public/sounds from the originals (ffmpeg)
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

Year 1 Maths: **7 categories / 32 topics / 128 challenges**, all built
(2026-10-11; identifiers locked in `year1MathCurriculum.test.js`).
Year 1 English: **8 categories / 38 topics / 152 challenges**, all built
(2026-10-11; identifiers locked in `curriculumIds.test.js`).
Year 1 Science: **4 categories / 16 topics / 64 challenges**, all built
(2026-10-11; identifiers locked in `year1ScienceCurriculum.test.js`).
Year 1 History: **5 categories / 14 topics / 56 challenges**, all built
(2026-10-12; identifiers locked in `year1HistoryCurriculum.test.js`). History
topics are authored as data: four "Bix explains" story cards plus question banks
per topic (`src/data/challenges/history/`), built by `buildHistoryTopic` into
`DataChallenge` questions and checked by `lintHistoryTopic`, which proves every
answer appears on its story card or in its photo's alt text. Progress is the
usual per-child `(childId, year, subject)` progress document with subject
`history`; nothing about the progress shape, keys or unlock rules changed.
Year 2 Maths currently defines **8 categories / 39 topics / 156 challenge slots**.
Year 2 English: **9 / 39 / 156** (2026-10-11; identifiers locked in its own
`year2EnglishCurriculum.test.js`).
Year 2 Science: **4 categories / 19 topics / 76 challenges**, all built
(2026-10-11; identifiers locked in `year2ScienceCurriculum.test.js`).
Year 2 History: **6 categories / 17 topics / 68 challenges**, all built
(2026-10-12; identifiers locked in `year2HistoryCurriculum.test.js`); five rounds
per challenge and optional local-history activities. Registered outside the year
award until owner review.
Year 3 History: **3 categories / 22 topics / 88 challenges**, all built
(2026-10-12). Counts toward the Year 3 award on explicit owner approval;
identifiers and four-subject award requirements locked in `year3HistoryCurriculum.test.js`.
Year 3 Geography: **5 categories / 16 topics / 64 challenges**, all built
(2026-10-13; IDs and availability locked in `year3GeographyCurriculum.test.js`).
Four notes cards and banks per topic, five rounds per run. Registered outside
the year award; no progress schema, document-key or unlock-rule changes.
Year 4 Geography: **5 categories / 16 topics / 64 challenges**, all built
(2026-10-13; IDs and wrapper paths locked in `year4GeographyCurriculum.test.js`).
Year 4 History: **2 categories / 18 topics / 72 challenges**, all built
(2026-10-12; identifiers locked in `year4HistoryCurriculum.test.js`). Five rounds,
source-maker/purpose questions and connected KS2 timeline; registered outside
the overall year award to preserve existing certificates.
Year 4 Maths: **8 categories / 42 topics / 168 challenges**, all implemented
(2026-10-11; identifiers locked in `year4MathCurriculum.test.js`).
Year 4 Science: **5 categories / 20 topics / 80 challenges**, all implemented
(2026-10-11; stable category/topic identifiers locked in `year4ScienceCurriculum.test.js`).
Year 3 English: **8 / 32 / 128**; Year 4 English: **8 / 33 / 132** (both
approved 2026-10-01; ids locked in `curriculumIds.test.js`).

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
isCategoryComplete, isCategoryPassable, isChallengeComplete, completeChallenge,
loadError, saveError, retryLoad, retrySave }`.
This replaced logic previously duplicated across `CurriculumPage.jsx` and
`ProblemView.jsx` (see §6, resolved). The tree above is unchanged; its document envelope is versioned. As of
2026-10-09, `shared/progressDocument.js` reads that version in both drivers and
the API. Missing versions mean v1; future/invalid versions fail closed. Future
ID/shape changes must bump `PROGRESS_SCHEMA_VERSION`, add a numbered step to
`PROGRESS_MIGRATIONS`, and include a migration regression fixture. Reads migrate
copies only; the next real save persists the upgrade. `copyProgressIds` copies
renames, retaining originals/metadata and merging target collisions. The
pre-accounts keys above remain deliberately excluded.

**Concurrent saves (2026-10-09):** completions union by numeric identity at every
category/topic level. API writes use compare-and-swap revisions plus unique
keys to arbitrate simultaneous inserts. Local writes re-read inside a Web Lock
on the collection, where available. `useProgress` merges acknowledged remote
completions with newer local state. Hydration/profile guards and unlock rules
remain unchanged. A PUT is no longer a way to reset learning.

**Bug/security review, 2026-10-01:** progress reads now fail closed. Only an
explicit missing document means a new learner; failed API reads, invalid JSON,
malformed progress and unreadable local storage display a retry control and
cannot be followed by a completion write. Local progress saves report quota
failures. `progressPersistence.js` serialises writes per child/year/subject across
hook remounts, and waits for pending writes before reading; failed saves retain
the in-memory snapshot for retry. `shared/progressData.js` validates known
fields on API reads and writes while retaining extra fields and numeric-string
legacy ids. The stored shape, keys and unlock predicates are unchanged.

`ProblemView` keys each challenge run by child and route, so navigating cancels
the old run and clears its completion panel. Direct URLs now obey the same lock
state as the picker. `ChallengeShell` synchronously rejects repeated successful
submissions and stale question handlers. Dictation enables apostrophes, disables
hidden inputs, includes ownership context for regular plural possessives and
counts words independently of punctuation. Speech cancellation settles pending
promises even when browsers emit no completion event. Year 4 spelling sorts now
include meaning and sentence context for real-word distractors.

**Follow-up review:** failed progress and rewards snapshots now survive
navigation/profile switches in module session queues, and retry before an old
stored document is read. Rewards APIs reject malformed payloads/acknowledgements
and unavailable-child 404s; local rewards storage reports corruption and quota
failures. Login/signup share bounded account (20 per 15 minutes) and process
(120 per minute) budgets, independent of proxy headers. Coordinated limits across
instances remain deployment work. Remote sign-out errors now keep the account
visibly signed in and offer a retry, rather than falsely claiming the cookie
session ended. Local sign-out still requires no API endpoint.

The compatible lockfile update removes 15 npm audit advisories (11 high, 3
moderate, 1 low); audit reports zero known advisories at review time. Render's
Node pin is now 22.23.4 LTS (2026-10-26: the eMudhra CA-compromise patch; was 22.23.3, before that 22.11.0, which did not meet Vite's engine
requirement). Remaining backend concerns and verification limits are recorded in
[the bug/security review](english-curriculum/BUG_SECURITY_REVIEW.md).

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
playable. A year award applies when the subject just finished was the last unfinished
subject registered for that year (2026-10-01). Year 3 requires Maths, English,
Science and History after owner approval on 2026-10-12. `ProblemView` reads the child's
other subjects for the year through the read-only `useOtherSubjectsProgress`
hook and checks them with `allSubjectsComplete` (completionMilestones.js). A
subject still loading, or one whose read failed, counts as NOT finished, so the
award is never given on a guess. The final run of an eligible subject waits for
these reads and offers retry on failure; entering each challenge refreshes the
snapshot (Year 3 History review, 2026-10-12). A year with one subject reads nothing and
behaves as before. Two badges sit on these milestones (`badges.js`):
**Subject star** (stored id `year-hero`, kept from when it was called Year hero
and every year had one subject) on `subject`, and **Year hero** (id
`year-finisher`, unlocks 🦅) on `year`. The year milestone also drives the
certificate step and the `counts.year` tally. There is no back-fill: on
2026-10-01 no child had finished a year.

#### Celebrations (2026-09-29)

- **Per answer** — `ChallengeShell` (every one of the 332 challenges runs through
  it) fills one segment of a progress bar, pops a tick, sparkles and plays a
  sound on a right answer (a different one on the last question); a wrong one
  wobbles, gets a kind rotating line and the app's quietest sound, a soft boop.
  **Combo:** every 3 questions right first time in a row (`answerStreak.js`,
  pure and tested) shows a 🔥 "3 in a row!" line with its own sound and a
  bigger burst; any wrong attempt resets it. Its feedback classes are
  `challenge-feedback-*`, deliberately not `.feedback.correct`, which several
  Skills games define globally.
- **On completion** — `buildCelebrationSteps` (pure, tested) turns the milestone
  result into a SEQUENCE: headline → year progress → topic sticker → one step
  per badge → avatar unlock → level-up → streak → certificate (the biggest of
  year, subject or quest; a topic's is behind "See my certificate" on its sticker) → next.
  Each step waits for Continue; "Skip" is on every step. A plain challenge or a
  practice replay is a single screen, unless it earns a level-up or is the day's
  first finished challenge (then headline → streak → next). Effects and sound escalate by tier (`TIERS`).
- **XP, level-up and streak (2026-09-30).** The headline carries a **+N XP** chip
  and a filling level bar ("Practice XP done for today" once the day's 2 XP-earning
  replays are used). The **level-up** step shows the new level with a medium Bix
  cheering as it appears (`LevelUpStep`, cue `levelUp`). The **streak** step
  (`StreakStep`, cue `streak`) appears only on the day's first finished challenge
  (`recordDay` outcome `started`, `extended`, `saved` or `restarted`): "N-day
  streak!", a freeze-saved message, or a new-streak message, with the week dots;
  streaks of 3, 7, 14 and 30 get a bigger effect (`STREAK_MILESTONES`). Full order:
  headline → year progress → sticker → badge(s) → unlock → level-up → streak →
  certificate → next.
- **It only announces.** Progress and badges are written in `ProblemView`
  before the sequence mounts; its extra figures (`yearBefore`/`yearAfter`, the
  sticker) come from running the pure `completeChallenge` reducer on a copy.
- **The app has sound.** 16 scenarios, each its own cue in `sound/cues.js`,
  play 14 recorded files from `public/sounds/` (Mixkit, loudness-matched in
  tiers so fanfares are loudest and the wrong-answer boop quietest). The full
  scenario → file → Mixkit id table, how they were processed, and how to swap
  one are in [docs/sounds/README.md](sounds/README.md); the audition page they
  were picked on is saved beside it. Callers only name a scenario
  (`playCue("topic")`), so replacing a sound touches no component.
- **Playback** (`sound/player.js`) is plain Web Audio — no audio library.
  `ProblemView` calls `preloadSounds()`, so the files download only on a
  curriculum challenge page (Skills Mode and the homepage never fetch them);
  the first tap there creates the audio and decodes them, so the first answer
  is never kept waiting. Only one answer sound plays at a time, and the
  challenge shell fades its last one on unmount, so `correct-last` or a combo
  never plays over the celebration's opening sound. Every cue keeps a synthesised fallback, so a failed
  file plays a tone, never silence; `cues.test.js` checks every file exists,
  because the fallback would otherwise hide a missing one. `playCue` returns a
  stop function: a new celebration step, or leaving the celebration, fades out
  the previous sound, so the 8-second finale never talks over the next step.
- **Mute** is the navbar 🔊 button, stored as the device preference
  `dl.soundMuted` — not learner data. Muting also fades out whatever is
  playing (or still loading), so a fanfare stops at once. iOS's silent switch / Silent Mode also
  silences web audio; that is deliberately not overridden, and `/parent` has a
  "Sound" section explaining it.
- **Licence (read 2026-09-29):** the Mixkit Sound Effects Free License covers
  use in the app, commercial included, with no attribution. It forbids
  redistributing the sounds on their own or "with source files"; keeping the
  MP3s in this public repo was checked with a lawyer and accepted by the owner
  (2026-09-29). Full text and reasoning: the Licence section of
  [docs/sounds/README.md](sounds/README.md).
- **StrictMode double-runs** state initialisers, updaters and effects:
  headlines are chosen with `peekMessage` and recorded in an effect, a step's
  cue is guarded by a ref, and the stop-on-unmount is deferred a tick so the
  dev-only remount cancels it — or dev shows repeated lines, doubled fanfares,
  or a finale cut off the instant it starts.
- **Unlocked pictures are claimable in the moment.** The "New picture
  unlocked!" step has a "Make it my picture" button that calls the same
  `updateChild` the grown-up area's picker uses. (The "pictures" are profile
  emoji — 🐨 🦉 🐲 🦖 🦅 — locked behind badges in `badges.js`; nothing is generated.)
- **Bix**, the CSS-drawn mascot, is shared from `src/components/mascot/`: the
  homepage hero, a small cheering Bix beside every combo line (decorative,
  hidden from assistive technology), and a medium Bix by the Trophy Room's
  "Next up". His colour tokens live on `.mascot` itself with a `body.dark`
  pair, so he renders correctly off the homepage; smaller sizes use CSS `zoom`
  because his features are sized in pixels.
- `prefers-reduced-motion` drops every particle effect (canvas never created)
  and turns flips/drops into fades. Each step's heading takes focus.

The 2026-09-29 celebrations changed no stored data; the only new key was `dl.soundMuted`.
(The 2026-09-30 XP and streak work does change the rewards document: see §5.)

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
requestSignupCode · completeSignup   (createParent is localStorage-only now; over HTTP, sign-up is completeSignup)
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
            accountType, ageBand, emailVerified?, emailVerifiedAt?, createdAt }
children: { _id, parentId, name, avatar, colour, yearGroup, subjects?, createdAt }
          // emailVerified* and subjects are absent on older documents (§5)
progress: { _id, childId, year, subject, schemaVersion: 1, data: {...}, createdAt, updatedAt }
rewards:  { _id, childId, schemaVersion: 1, data: {...}, createdAt, updatedAt }
          // the envelope stays 1; the shape version is `data.schemaVersion` (now 2, §5)
```

Rewards are **one document per child**, not per year+subject like progress — a
badge belongs to the learner across every year they study (§4.10).

Browser-local keys, none of them identity:

- `dl.session` = `{ parentId, childId, email }`. The `email` is a **display hint
  only** — identity always re-validates `parentId` against the store.
- `dl.soundMuted` = `"1"` / `"0"`, the celebration mute switch. A device
  preference beside `theme`; safe to lose.
- `dl.lastAccount` = `{ email, accountType, profiles: [{id, name, avatar, colour}] }`,
  written on sign-in so `/login` can greet a returning family by their profile
  faces and ask for the password alone. **Display data only** — never a
  credential, hash or token, and a test asserts that. It does not skip
  authentication; the 30-day session cookie is what usually keeps a family
  signed in, and when `/login` does appear the password is genuinely required.
- `dl.solarView` = `{ showOrbits, showLabels, showMoonLabels, milkyWay,
  constellations, constellationBrightness }`, the Solar System's "My view"
  switches; `constellationBrightness` is `"faint"`, `"bright"` or
  `"brightest"`, and any other value loads as the default. A per-device view preference, not learner
  progress; safe to lose. The speed buttons are deliberately not saved.
- `dl.solarMissions` = `{ version: 1, completed: [missionId, ...] }`, six
  optional Solar System mission stamps. Browser-wide and shared across profiles;
  retained through sign-out, with no curriculum progress or identity fields.
- `dl.solarWarpSeen` = `"1"` in `sessionStorage`, so the Solar System's warp-in
  plays once per visit. Safe to lose.

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
server/routes/       auth, signup, recovery, children, progress, rewards
server/email.js      signup and password-recovery mailer (Resend; §6 item 17)
```

Endpoints mirror the store interface exactly; see `server/routes/`.

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
- **Duplicate emails and learning documents are enforced by unique indexes** in
  the new startup setup (2026-10-09). Existing nonunique indexes are converted
  with `collMod`, preserving records/indexes. A duplicate preflight refuses to
  start rather than deleting any account or learning. Signup handles MongoDB's
  duplicate-key error as `EMAIL_TAKEN`; it no longer reconciles by deletion.
  Production was audited read-only and has zero duplicate groups, but index
  conversion and deployment are still pending (§6 item 8).
- Password recovery increments the account's `sessionVersion`; authorization
  compares it with the signed session version, invalidating every old device's
  token. Legacy accounts/tokens default to version 0.

Password hashing stays PBKDF2-SHA-256 via `node:crypto` — not for migration (there is
none, §4.7), but because it needs no native build step on Render's free tier.

⚠️ Passwords are hashed **client-side in local mode and server-side in API mode**. Local
mode's hashing protects nothing against someone holding the device; it is data-shape
correctness, not security.

**Input and browser hardening (2026-10-12).** `server/security.js` adds a CSP
when serving the built app, security headers, non-cacheable API responses,
cross-site write guards and recursive JSON operator/prototype-key rejection.
Malformed and oversized bodies return safe JSON errors. Email is normalized
only from strings; profile creation and patches share typed, bounded
validation in both store drivers. Profile colours are whitelisted on writes
and at every CSS rendering location, including old cached records. Passwords
are capped at 1,024 characters, signup codes are strictly six-digit strings,
and JWT verification is restricted to HS256. Speed Reader bounds pasted text
without interpreting markup. ESLint prevents raw HTML/script sinks in app
code. Progress/reward shapes, storage keys and unlock rules are unchanged.
See [the security review](SECURITY_REVIEW.md) for input coverage, policy
compatibility, browser checks and the optional database-test permission limits.

---

## 5. What Currently Exists

### Skills Mode — built games
**Maths:** Clock Generator, Reading Numbers, Multiplication Grid, Times Tables Race, Arithmetic
Practice, Find the Missing Number, Number Bonds, Fraction Fun
**Geometry:** Shape Explorer
**English:** Word Builder (Easier/Medium/Harder tricky words: missing letter,
spelling and homophone questions; `src/data/freePlay/wordBuilder.js`), Word
Sorter, Sentence Builder, Opposite Match,
Synonym Safari, Sight Word Pop, Speed Reader
**Geography:** Solar System (3D), Ocean Explorer (3D prototype), World Map, Flag Finder, City Spotlight
(match a landmark picture to its city), Find the City (tap the city on a map;
shows the distance and a line from the tap to the city, plus a country hint)

### Shared world kit (2026-10-29)

`src/components/worlds/` holds world-neutral pieces that Solar System and Ocean
Explorer both use: `discovery.js` (the card's data shape and `validateDiscovery`),
`WorldSections.jsx` (fold-out sections), `WorldOrbitControl.jsx` (Orbit / Leave
orbit), `orbitPilot.js` (`createOrbitPilot`, `nearestOrbitTarget`, `ORBIT_RATE`)
and `WorldInfoCard.jsx`. A world passes its rules as data: an orbit `profile(target)`
(entry distance, radius, camera rig, optional `level`), an `isSolid` obstacle filter,
the model's `forward` axis, and card slots. `solarPlanetOrbit.js` and `SolarInfoCard.jsx`
are thin wrappers; Solar keeps its `solar-info-card` styles through the card's
`baseClass`, so its DOM and tests are unchanged. Extract the next piece (search,
settings, tours, missions, trips) when a world needs it, moving Solar onto it in
the same change.

### Ocean Explorer — more species (2026-10-29)

Seven more species join the five reef animals: Caribbean reef shark (5), giant Pacific octopus
(6), humpback whale (3, drawn much smaller than real), swordfish (5), bottlenose dolphin (6),
porcupinefish (6) and moon jelly (8), 85 animals in all. Their models are in
`oceanMoreCreatures.js` (sharing `kit` from `oceanCreatures.js`); each has its own orbit profile
sized to the animal. They have no home loop: every one is placed across the ocean. Facts come
from NOAA, NOAA Fisheries, NPS, MBARI, the Florida Museum and Monterey Bay Aquarium pages listed
in each card; unverifiable claims (octopus blue blood) were left out. Owner review pending.

### Ocean Explorer — a busy ocean (2026-10-29)

`REEFS` (`oceanReef.js`) lists nine reefs: the original plus eight spread by best-candidate
sampling (1 to 1.2 times its size). `ANIMALS` (`oceanAnimals.js`) now has one entry per animal: 46
at first (parrotfish 14, clownfish 10, turtle 7, ray 7, seahorse 8). The first of each species keeps
its old home loop; extras are placed across the ocean by the same sampling, clear of every reef,
the start, the edge and each other, each with its own loop size, height, speed, direction and
starting point. A discovery has a unique `key` (what is in the water) and an `id` (which card
to show): the scene offers, orbits and tracks by `key`, while callbacks and the page still speak
`id`. Animals beyond 85 units from the submarine are hidden and not animated; `environment.focus`
shows them again, in the right place, as it nears. Not yet measured on real phones. See the
[Phase 4c plan](superpowers/plans/2026-10-29-ocean-explorer-phase-4c-busy-ocean.md).

### Ocean Explorer — bigger ocean (2026-10-29)

The drivable area is 20 times the first preview's: `STEERING.areaRadius` 22 → 100. The seabed
runs 80 units past the edge so fog ends the view. About 440 rocks and 820 seagrass patches are
spread evenly by area (`scatter` uses √random) out to 20 units past the edge and 28 light shafts are scattered across the
ocean. The sun and its ±24 shadow box follow the submarine (`followSun`), and the suspended
motes wrap in a 54-unit box around the camera in the vertex shader. Speed is unchanged, so the
edge is about 25 s from the start. 

### Ocean Explorer — Phase 4b more animals (2026-10-29)

`oceanAnimals.js` lists the reef's swimming animals (parrotfish, a clownfish group, green sea
turtle, spotted eagle ray, seahorse): each carries its discovery, orbit profile (with
`faceTravel`), target radius, circular swim loop and model builder (`oceanCreatures.js`).
`oceanEnvironment.js` builds and moves them all from that list, so a new animal is data plus a
model. `oceanAnimals.test.js` keeps loops clear of the reef, the start, the area edge and each
other. Facts are NOAA and Florida Museum sourced; owner review pending. See the
[Phase 4b plan](superpowers/plans/2026-10-29-ocean-explorer-phase-4b-more-animals.md).

### Ocean Explorer — Phase 4 parrotfish (2026-10-29)

`oceanFish.js` builds an original stylised parrotfish (about 1.8 long, no shadow) and
`fishPose(seconds)`, a 30-second circle of radius 5 around (−12, −3) at height 3.2,
starting on the side nearest the submarine and clear of the reef, the start and the
rocks. The environment moves it only while the water moves, so Pause ocean and
reduced motion hold it still. Every discovery carries its own `orbit` profile
(`FISH_ORBIT`: offered within 5.5, radius 3, a high camera so the hull never hides
the fish); the scene re-checks the offer as the fish swims past a parked submarine,
and the page picks the card by the orbited discovery's id. Facts come from NOAA and
the Florida Museum; owner review pending.

### Ocean Explorer — Phase 3 coral reef (2026-10-29)

`oceanReef.js` builds a stylised reef (scaled ×1.45, radius about 4) at `REEF_SPOT`
(0, −11), straight ahead of the start; rocks and seagrass are scattered clear of
it and it is a steering obstacle. `oceanDiscoveries.js` holds `REEF_DISCOVERY`
(NOAA-sourced facts, owner review pending) and `REEF_ORBIT`. `oceanScene.js`
offers orbit within 11 units of an invisible anchor 4 above the reef base, circles
level at radius 7.5 with a high chase camera, ignores steering while orbiting and
hands steering back in place on leave; Back to start ends an orbit. The page shows
the Orbit control top-left and the card top-right (full width under 720px); the
card opens with each orbit, × keeps orbiting, and Escape leaves orbit.

### Ocean Explorer — Phase 1 preview (2026-10-29)

`/skills/ocean-explorer` is an ungated, lazy-loaded page using the shared Skills
back bar and normal navbar. `OceanExplorer.jsx`/`.css` provide the preview label,
viewing instructions, Reset view and loading/unavailable states.
`oceanSubmarine.js` builds an original static model from simple Three.js shapes;
`oceanScene.js` adds water-coloured fog, lighting, scenery and bounded
OrbitControls. Drag/pinch/wheel and focused arrow/+/-/Home keys change only the
view. The submarine stays stationary. Both themes refresh the scene palette
without resetting its camera. Pixel ratio is capped at 1.5, and resources and
listeners are released on unmount or context loss.

Water appearance follow-up (2026-10-29): `oceanWater.js` integrates the Three.js
Water addon with a 256×256 reflection target, original seamless DataTexture
normal/caustic/sand maps and paired surface/seabed colours. Its surface faces down
at scene height 9. The r181 fragment shader's normal is flipped for underside
lighting/Fresnel shading, with reduced base reflectance and stylised transmitted
daylight. Camera limits keep every view below the surface.
Review this small shader adaptation and reflection-target ownership when
upgrading Three.js. The seabed patterns are stylised light effects, not a
physical caustics simulation.

Environment detail follow-up (2026-10-29): `oceanEnvironment.js` adds a gently
undulating 220-unit sand terrain with fine ripple/bump texture, 38 instanced
rocks, 420 static seagrass blades and 150 faint suspended particles. Rocks and
sand share two projected, differently scaled caustic layers generated from
jittered cells, replacing the obvious repeating sine net. The scene uses a
distance haze, faint sunlight volumes, hemisphere lighting and ACES tone
mapping. One 1024×1024 directional shadow map updates once for the static
geometry, rather than on every water frame. Instanced buffers and shadow maps
are explicitly disposed alongside textures/materials/geometry. Decorations
leave the craft’s immediate space clear; camera fitting still uses the
submarine alone. These are visual details, with no new discoveries or controls.

Screenshot corrections (2026-10-29): removed the separate unfogged gradient
dome. Its different colour exposed the distant, fogged floor/surface boundaries
as a bright horizontal strip; the background now shares the fog colour. Water
normals now come from a seamless multi-scale noise height field, replacing
parallel sine-wave stripes. Rock positions are welded before recalculating
normals for rounded shading. Side porthole housings extend beyond the widest
part of the hull, keeping the whole rim visible; raycast coverage checks all
four rims. Appearance awaits the owner’s next screenshot; no browser checks.

Water and suspended-particle motion render at up to 30 frames/second, with a Pause/Resume ocean
control (it also stops the fish). Reduced motion forces a still ocean; changing the preference while
running also stops the effect. Hidden tabs, zero-sized containers, pause and
disposal cancel the animation; returning from a hidden tab does not jump time.
Paused/reduced-motion scenes render only on view/size/theme changes. The helper
explicitly disposes its generated textures and the addon's reflection target,
in addition to scene geometry/material cleanup. No renderer migration or
external texture download is required.

Phase 2 steering (2026-10-29): the submarine drives with the Solar System
free-flight scheme — `steerInput`/`stickVector` from `flightControls.js` and
an adapted joystick/GO (`OceanDriveControls.jsx`, touch/≤720px only, like
Solar). Arrows/WASD or the stick turn and rise/dive; hold GO or Space to move.
Keys are read on the focused canvas only; blur, window blur and hidden tabs
release them. Shift+arrows look around; +/−/Home still zoom/reset the view.
`oceanSteering.js` is pure: eased speed/turn/climb, a 22-unit area, seabed
clearance, a height limit below the surface and soft rock bumps (rock
footprints come from `oceanEnvironment.js` `obstacles`). Nothing damages or
times the child. `oceanScene.js` keeps the child's chosen camera offset in
the craft's yaw frame, so the view follows rigidly with no automatic swing.
Steering frames run at the display rate, water-only frames keep the 30 fps
cap, and the loop stops when the craft is idle and water is still. The
cached shadow map refreshes only while the craft moves. Back to start resets
the pose and view. `solarFreeFlight.js`/`solarFlightCamera.js` were not
reused: they are bound to planets/trips and replace drag-to-look.
