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
│   ├── ClockPanel.jsx, ReadingNumbersPanel.jsx, DualLabelClock.jsx,
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
Node pin is now 22.23.3 LTS, replacing 22.11.0 which did not meet Vite's engine
requirement. Remaining backend concerns and verification limits are recorded in
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

Two browser-local keys, neither of them identity:

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
**Maths:** Clock Generator, Reading Numbers, Multiplication Grid, Arithmetic
Practice, Find the Missing Number, Number Bonds, Fraction Fun
**Geometry:** Shape Explorer
**English:** Word Builder, Word Sorter, Sentence Builder, Opposite Match,
Synonym Safari, Sight Word Pop, Speed Reader
**Geography:** Solar System (3D), World Map, Flag Finder, City Spotlight
(match a landmark picture to its city), Find the City (tap the city on a map;
shows the distance and a line from the tap to the city, plus a country hint)

### Geography loading and game controls (2026-10-12)

**Flag Finder (`/flag-finder`).** Previously the game waited for all roughly
254 country records across eleven sequential default-size requests before
showing a question, with no timeout. `src/data/flagCountries.js` now requests
100 records per page (the free-plan maximum, normally three requests), publishes
each page immediately, and starts play when at least four distinct flag-bearing
countries are ready. Remaining pages load in the background and expand the
continent choices without replacing the current question or resetting score,
selection, or the 1.5-second answer-feedback timer.

A shared in-memory store deduplicates StrictMode/overlapping loads and reuses
loaded data across route visits until the browser reloads. The bounded load
continues when leaving the route to populate that cache; it writes no learner
storage. Each request has an eight-second abort timeout, including response-body
reading. Failure preserves playable partial data and offers “Try again”. Retry
merges countries by name; offsets advance by actual response length so a server
page cap cannot skip records. The 120ms inter-page pause and 20-page safety cap
remain. First-page data and flag images still require the external service;
there is no offline fallback. Implementation and verification limits are in
[Flag Finder loading](FLAG_FINDER_LOADING.md).

**World Map (`/world-map`).** Countries/Continents are a neutral segmented
control instead of accent-filled buttons matching the navbar logo and Sign in.
The selected mode uses a panel background, bold label and contrasting underline;
`aria-pressed`, a named button group, visible keyboard focus and 44px minimum
button height expose selection and keep touch targets usable. Both themes use
existing tokens. The country instruction reads “Click the correct country”.

**City games.** City Spotlight (`/city-spotlight`) now focuses on matching a
landmark picture to one of four city names, with a 1.5-second answer transition.
The former map interaction lives in Find the City (`/find-the-city`), registered
in both the router and Skills hub. A country hint is available before a guess.
After one tap, markers show the guess and the nearest visible world-copy of the
city, a dashed line connects them, and the result reports great-circle distance
in whole kilometres. A tap within 750km counts as found (existing `cityGuess.js`
rule). “Next city” advances manually so the learner can inspect the result;
hints/guesses clear for each new city. Both games use `cities.json`, have finite
shuffled rounds and replay, and write no progress. CSS is scoped to each game.
See [geography notes](notes_geography.md) for the revised game list.

**Validation.** `npm run lint`, `npm test` and `npm run build` passed after the
geography changes (1,612 Node tests and 140 component tests passed; four database
integration tests skipped). Four Flag Finder component regressions cover early
play, background-page stability/cache reuse, initial and partial failures/retry,
and request timeouts. Local browser checks verified mobile Flag Finder,
continent switching, cached revisits, and World Map mode selection in both
themes, plus City Spotlight answer selection and Find the City hint, guess/line/
distance, and next-city reset. Country API responses were intercepted: live timing with the configured
API key was blocked by automatic approval review, so no live latency reduction
is claimed. Build still reports the existing large-chunk warning.

**Solar System constellation explorer (built and expanded 2026-09-21):**
`/solar-system` includes an idle-only Constellations entry point. It presents
Ursa Major's full Great Bear figure, Ursa Minor, Cassiopeia, Cygnus and Orion as
animated, responsive SVG star charts with child-friendly descriptions, facts,
shared speech-synthesis narration, mute/replay controls and Previous/Next
navigation. Catalogue data stores real J2000 right ascension, declination and
apparent magnitude in `constellations.js`; optional labels keep dense figures
readable. On phones, narration and Previous/Next controls use icon buttons with
accessible labels; the card's × is the sole exit control. The pure
`constellationProjection.js` module converts it to a proportion-preserving
gnomonic chart, handles the 0h/24h right-ascension seam, and also exposes unit
vectors for a future Three.js sky stage.
Constellation mode is derived from the existing meteor/tour state, dims but does
not stop the scene, hides exploration overlays, and prevents meteor launch. The
Solar System control panel automatically collapses when either the planet tour
or constellation explorer begins, leaving only its compact title bar. The
chart and data contracts have pure tests. Desktop, 375 px, both themes,
reduced motion, narration controls, tour/meteor/search regressions, and both exit
paths were browser-verified with no runtime errors. No dependencies were added.

**Solar System meteor experiment (implementation in progress, 2026-09-20):**
`/solar-system` keeps Tour, Constellations, Launch meteor and Reset Solar System
in one compact top action group rather than a persistent bottom panel. During a
meteor sequence, a labelled Reset Solar System action remains visible beside a
compact phase message. The page
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

**`/signup` is one question-led path** (built 2026-10-07, spec
`docs/superpowers/specs/2026-10-07-signup-onboarding-design.md`), for anyone old
enough to hold the account: a grown-up or a learner aged 13+. One question per
screen, with Bix guiding; the whole family is built **before** credentials are
asked for, and **nothing is saved until the end** — abandoning midway leaves no
account behind.

| Step | What it asks | Notes |
|---|---|---|
| `birthYear` | Year of birth (wheel, no pre-selection) | Age counted at the youngest it could be: `currentYear − birthYear − 1`. |
| `gate` | — (under 13) | Dead end: "ask a grown-up". **No request, nothing saved.** |
| `who` | Me / My children | 18+ only; 13–17 is always "Me". Me → `learner`, children → `parent`. |
| `count` | How many children | Parent only; 1–6 (4+ starts four, "Add another" up to 6). |
| `name` · `year` · `look` · `subjects` | Per learner: nickname (≤ 20), school year (or "Not sure"), avatar + colour, subjects | `subjects` is skipped when the year has none; stored as `[]`. |
| `summary` | Review, Edit, Add another | |
| `account` | Email, password, confirm | Calls `/signup/code`. |
| `code` | Six-digit code | Skipped when verification is off. Submits on the sixth digit. |
| `handover` | "Hand the device to Maya!" | Creates nothing; `selectChild`, then the first chosen subject or `/`. |

**Two routes** (`server/routes/signup.js`, both behind the auth throttle):

- `POST /api/auth/signup/code { email }` sends a code. 409 `EMAIL_TAKEN`; 429
  `CODE_RECENTLY_SENT` (30 s) / `TOO_MANY_CODES` (5 an hour); 502
  `EMAIL_SEND_FAILED`. With verification off it answers `{ verification: "off" }`
  and stores nothing.
- `POST /api/auth/signup/complete { email, code?, password, accountType, ageBand,
  children[] }` validates **everything else first** (so a typo in a profile never
  spends an attempt), checks the code, then creates the parent and every
  profile and signs in (201 `{ parent, children }`). 1–6 children for a parent,
  exactly 1 for a learner; an under-13 band is `AGE_BAND_TOO_YOUNG`. If a profile
  fails to save, the parent and its profiles are deleted together
  (`SIGNUP_FAILED`). It selects no child — the hand-over does.

**`pendingSignups`** (one document per email, unique index on `email`):
`{ email, codeHash, expiresAt, attempts, sendCount, sendWindowStart, lastSentAt,
purgeAt }`. A TTL index on `purgeAt` (the later of the send window's end and the
code's expiry) removes old ones. `codeHash` is `HMAC-SHA256(SESSION_SECRET,
email:code)`; the code is never stored. A code lasts 10 minutes, allows 5 wrong
tries, and a wrong fifth or a failed send sets `codeHash: null` rather than
deleting the record, so the hourly send cap still holds.

**Sign-up review fixes (2026-10-09, #37).** Email shape validation is bounded
to 254 characters with disjoint domain-label classes. Failed sends restore the
previous `lastSentAt` while invalidating the new code and retaining send counts.
The conditional send write also matches `sendCount` and `codeHash`, so restoring
a timestamp cannot let a stale retry rewind the count. A losing race checks the
current code before claiming an email was sent.

`server/signupEmailLimits.js` adds ten `/code` requests per client per hour
(bounded, hashed in-memory client keys) and a daily send-attempt budget. Express
trusts one proxy hop when `RENDER=true`, otherwise none. `signupEmailBudgets`
stores `{ _id: "signup:<UTC day number>", count, purgeAt }`; the built-in unique
`_id` and conditional increment enforce the budget across workers/restarts, and
a TTL index removes old counters. No account, child, progress or reward fields
change. `SIGNUP_EMAIL_DAILY_LIMIT` defaults to 90 and must be a positive integer;
separate databases need separately allocated budgets within the provider quota.
Failed/time-out sends spend budget too. Resend calls time out after ten seconds;
only status diagnostics are retained, and verification-off mode warns at boot.

The code step offers a 64 px retry for transient completion errors while
retaining all six digits; rejected/expired codes keep their existing new-code
path. Hand-over navigation replaces the sign-up history entry, email autofocus
is removed, long resend waits use minutes, and code boxes can shrink on small
phones. Lint, build and the full database-backed suite pass; server-rendered UI
checks pass. Interactive browser verification remains open because this session
has no browser tools. See the sign-up tracker for the outstanding checks.

⚠️ **Two races are closed in the database, not in the handler.** Sending is gated
by a **conditional write** (insert on first send, update conditioned on the
`lastSentAt`, `sendCount` and `codeHash` that were read); the email goes out only if that write won, so ten
parallel requests send one email. And each guess **reserves an attempt
atomically before the code is compared** (`findOneAndUpdate` on
`attempts < 5`), so at most five guesses are ever compared; the code itself is
then claimed atomically (single use). Both are covered by tests that hold every
read until all requests have made theirs — keep those tests passing if you
touch the handlers.

**Email verification.** `parents` gain `emailVerified` and `emailVerifiedAt`.
**Absent means "never asked"** (every account made before 2026-10-07); nothing
gates or nags on them. An account made with verification off stores
`emailVerified: false`. Modes (`server/email.js`): both `RESEND_API_KEY` and
`EMAIL_FROM` → send; neither and not production → log the code to the terminal;
anything else → off. See §6 item 17.

**`subjects` on children.** An array of subject ids chosen at sign-up
(`[]` = Just exploring / not asked; absent reads as `[]`). Used twice: the
hand-over destination, and a "⭐ Your pick" tag on `CurriculumSelectPage`.

The birth-year wheel uses a compact, bordered scrolling list with 64px rows,
a filled selection and checkmark, a visible keyboard focus ring and theme
tokens (2026-10-12). Its frame is no longer faded by a mask, and selecting a
year keeps row heights stable.

**The draft.** `dl.signupDraft` in `sessionStorage` holds every answer except
the password and the code, plus the current step, so a refresh resumes. It never
holds the birth year (after a refresh the wheel shows no selection), and
**nothing at all is saved for an under-13 answer**. It is cleared on success and
by "Start again"; a draft that fails to parse is discarded.

**Where the logic lives.** `src/data/signupFlow.js` (pure: steps and skips, age
band, subjects per year, validation, the request body, `destinationFor`, draft
parse/serialise), `src/data/signupCopy.js` (Bix's lines and the error messages),
`server/routes/signup.js` (the routes), `server/signupCodes.js` (code, hash,
send decision), `server/email.js` (mailer; password reset #3 will add a second
message), `server/accounts.js` (`createParentAccount`: hash, insert, duplicate-race check).
The screens are in `src/pages/auth/signup/` (`SignUpFlow.jsx` is the state
machine; `steps.jsx`, `HandOver.jsx`, `parts/`). Both store drivers have
`requestSignupCode` and `completeSignup`; the localStorage driver has no code
step and stores `emailVerified: false`. `track()` (`src/utils/analytics.js`) is
a no-op with an allow-list until PostHog (#36): counts and step names only,
never names, emails or birth years.

**The age gate is an honest speed bump, not compliance.** A child can tap an
older year. It is enough for a family project and is deliberately not enough for
a public launch — see PROJECT_IDEAS.

`AuthShell` gives `/login` and `/signup` one drifting sky, one card and one
entrance, so moving between them reads as two views of the same place.
`ProfileBuilder` was lifted out of `Profiles.jsx` so the sign-up and the picker
share the name/avatar/colour/year pickers — they had been two copies, which is
how a colour picker gets fixed on one screen and not the other. The old
single-page sign-up wizard and its `POST /api/auth/signup` route were removed
(2026-10-07); `POST /api/auth/signup/complete` is the only way to create an
account over HTTP.

### Curriculum Mode — dev unlock switch
The hosted dev site (`dynamic-learning-dev-zkww.onrender.com`) automatically
opens every built curriculum challenge and all profile avatar choices for
review, including in production-mode Vite builds. `src/data/devUnlock.js`
checks that exact hostname; `learnwithbix.com`, the production Render hostname
and other hosts retain normal restrictions. Local Vite development can still
opt in with `VITE_UNLOCK_ALL=true`. That flag alone cannot unlock a hosted
production build, and no Render environment-variable change is required.

Both the picker and direct challenge routes use the same bypass. Completion,
earned badges, certificates, saved progress and account protections retain
their normal behaviour. Unbuilt content stays unavailable. A curriculum banner
marks review access so it is visible while testing.

### Curriculum Mode — the source material
`docs/curriculum/` holds the National Curriculum programmes of study verbatim,
with every topic in our dataset mapped to the statutory requirement it serves,
and a list of requirements no topic covers yet. Read the relevant row before
authoring questions for a topic.

English is complete for Years 1–6 as of 2026-10-11: each year's programme of
study with its key stage introduction and its part of Appendix 2 (grammar and
punctuation, bold glossary terms kept), the spelling appendix for every year
(`english-appendix-1-*.md`, including the Years 1–2 common exception words and
both statutory word lists), the shared spoken language requirements and the
phonetic alphabet chart. The appendix text was extracted from the DfE PDFs and
checked word for word against them. Files are indexed in
`docs/curriculum/README.md`.

Also saved 2026-10-11: Geography and History for key stages 1 and 2 (per key stage, as the
curriculum sets it out; the year split is ours to record), and proper headers,
headings and lists for Year 4 and Year 5 Science and key stage 2 History, whose
text was already verbatim. Every History and Geography file records its own
year split, since the curriculum sets these out per key stage. Year 1 Maths (implemented below) and
Year 1, 2 and 6 Science were added the same day, so every primary year of
English, Maths and Science is saved.

Geography updated 2026-10-13 from the owner-provided official primary PDF
(DFE-00186-2013): the key stage 1 and 2 references reproduce its text verbatim,
with the GOV.UK HTML page retained as a supporting reference. Source headers
include publication date, England scope, retrieval/check date and Crown
copyright/OGL attribution. Web-page editorial differences and the
unimplemented-dataset status remain explicit. All three
Geography references now follow the project's PDF-source convention.

Geography specifications drafted 2026-10-13:
[shared design](geography-curriculum/shared-design-spec.md) and
[Year 1](geography-curriculum/year-1-design-spec.md),
[Year 2](geography-curriculum/year-2-design-spec.md),
[Year 3](geography-curriculum/year-3-design-spec.md),
[Year 4](geography-curriculum/year-4-design-spec.md).
The year specs propose 12, 14, 16 and 16 topics respectively, four challenge
briefs per topic, certificate outcome lines and per-topic C1–C4 trackers. The
shared spec covers field notes, existing data controls, maps/assets, accessibility,
fieldwork, future registration and verification. Every topic is mapped in the
KS1/KS2 source files; statutory text and source-fidelity notes are unchanged.
The split is an app design proposal, not a DfE year allocation or owner-approved
topic list. KS2 Years 5–6 follow-on work and practical fieldwork coverage limits
are explicit. A subsequent owner request implemented Year 3 on the same day;
other years remain documentation only. See the implementation section below.

Key stage 3 Geography was added the same day from the owner-provided official
secondary PDF (DFE-00193-2013), preserving its wording and nested lists. It is
indexed in the curriculum README as reference only for years 7–9, beyond the
app's primary years; it includes purpose, aims and key stage 3 attainment targets.

History checked 2026-10-12 before the first History dataset: key stage 1 was
correct; key stage 2 had the right words but five statutory bullets sat inside
the non-statutory example lists and the last three had lost their bullets, so
its subject content was rebuilt with each requirement on its own and its
examples nested under it. Key stage 3 History (years 7 to 9) was added for
reference only, so primary topics can be written with the next stage in view.

**Every curriculum file follows the official DfE PDF** (decided 2026-10-11), not
the gov.uk web page. The 2015 web page differs editorially (numbers as
digits, some reworded or dropped phrases); each file lists those differences at
the end. Each file's text was rebuilt with the web page's headings and lists
and the PDF's wording, then checked word and punctuation for word against the
PDF, with stacked fractions and superscripts (cm², 360°) restored.

### Curriculum Mode — Year 1 History (2026-10-12)

Year 1 now offers **Maths, English, Science and History**, and History counts toward
the Year 1 certificate. History has **5 categories / 14 topics / 56 challenges**, four
rounds each: Then and Now (toys, homes, school, seaside), The First Flight, Explorers
(Columbus, Neil Armstrong), Kings and Queens (Elizabeth I, Victoria) and Clues Around
You. Every challenge opens with a "Bix explains" story card, read aloud on request and
reopenable mid-round ("📖 Bix's story"); every question names the words on the card or
in the photo's alt text that answer it, and `lintHistoryTopic` checks they are there.
Slots: Meet it, Old or new?, Picture detective, Same or different?. No dates appear in
Year 1 teaching text; photo credits keep their dates (owner decision).

Ten public-domain / CC0 pictures (Cleveland Museum of Art, Library of Congress
Photochrom prints, NASA, portraits of Elizabeth I and Victoria) are pinned by sha256 in
`scripts/history-assets/sources.json`; Homes, School, Street Names and Columbus use
emoji pictures. Topic files are checked one at a time with
`node scripts/check-history-topic.mjs <file>`; the content rules are in
`docs/history-curriculum/plans/year-1-topic-authoring-brief.md`.

Verified: unit and component tests (all 56 wrappers load; a full challenge played with
misses and the hint), and a headless Chrome run that played all 56 challenges in order
from fresh progress through the real controls, alternating themes, with 320 px checks
and no console errors. Pending: the owner's review, touch and the read-aloud voice on
real devices. Statutory crosswalk: `docs/curriculum/key-stage-1-history.md`.

### Curriculum Mode — Year 2 History (2026-10-12)

Year 2 History has **6 categories / 17 topics / 68 challenges**: Changes Within
Living Memory, The Great Fire of London, Nurses Who Made a Difference, People Who
Changed Things, Days We Remember and History Near You. The approved topic list is
in `history-curriculum/year-2-design-spec.md`; the statutory crosswalk is in
`curriculum/key-stage-1-history.md`. Every topic has a certificate achievement.

Topic banks in `src/data/challenges/history/year2/` reuse the History engine and
`DataChallenge`. Every level starts with a story of at most 45 words, with
sentences of at most 12 words; five rounds draw from at least seven templates.
Choices have three options. Meet it uses choice/sort, Long ago or now? adds
ordering, History detective reads sources and their limits, and Compare and
remember studies change, similarity and significance. Ordering cards stack
vertically for readable phone layouts. All rounds offer read-aloud and the
reopenable story, and retain the completion payload including combos.

Five new public-domain images are pinned in `scripts/history-assets/sources.json`
and listed in `/credits`: the Great Fire painting and portraits of Florence
Nightingale, Mary Seacole, Edith Cavell and Emily Davison. Their displayed details
were checked against the downloaded images. Practice maps, a practice plaque and
a book/web illustration are original SVGs, labelled as drawings; chronology bands
label the main events without date arithmetic. The two local-history topics offer
optional collapsed grown-up activities, without tracking or gating.

Year 2 History is playable but registered with `countsTowardYear: false` pending
owner review. Existing Year 2 certificates keep their three-subject requirement;
History topic/subject awards work normally. No progress shape, key or unlock rule
changes were made. Only remove this flag after the owner approves inclusion.

Verified: lint, full tests and build; all 68 challenges completed through the real
controls in isolated Chrome, both themes and 320/390 px, with reload, idempotent
replay and a byte-for-byte unchanged pre-existing Maths document. Story/start-button
contrast measured above 4.5:1 in both themes. The existing 320 px navbar overflow
was fixed by wrapping controls at full touch size and hiding the bar using its
measured height. Remaining device checks: `history-curriculum/HISTORY_TRACKER.md`.

### Curriculum Mode — Year 1 Geography (2026-10-13)

All **12 topics / 48 challenges** are built across Our Place, The United Kingdom,
The Wider World, and Weather and Exploring, following the
[Year 1 spec](geography-curriculum/year-1-design-spec.md) exactly (IDs locked in
`year1GeographyCurriculum.test.js`). Registry `countsTowardYear: false` keeps the
Year 1 award at Maths/English/Science/History; progress shape, keys and unlock
rules are unchanged. Signup now offers Geography for Year 1.

- **Banks:** `src/data/challenges/geography/year1/` — 352 templates, ≥6 per slot,
  4 rounds per run, 3 choices, 2–3 cards per sort/order, notes ≤30 words and
  sentences ≤10 words. `GEOGRAPHY_AGES[1]` drives both the builder's round count
  and the lint; the engine now reads rounds/minimum bank from the topic's year.
- **Pictures:** a new `y1` visual type rendered by
  `components/challenge/geography/Year1Drawing.jsx` (+ `Year1Sprites.jsx`,
  `year1.css`): original flat illustrations (feature/weather/season sprites,
  school/coast/countryside/town scenes, ground/aerial/plan views, compass grids,
  a viewpoint scene for left/right, weather records, window views, a season
  cycle), a four-nations UK map and a colour-by-continent world map/orthographic
  globe. Map data: `src/assets/geography/year1-maps.json`, built by
  `scripts/geography-assets/build-year1-assets.mjs` from public-domain Natural
  Earth (Russia split at 60°E; French Guiana not drawn as Europe). Every colour
  is a `--light-geo-*` / `--dark-geo-*` token in `App.css`.
- **Grown-up activities** (after all four slots): Around Our School, Daily
  Weather, Seasons in the UK, Routes and Simple Maps.
- **Field-notes redesign (all Geography years):** the start screen is now a
  sky banner with a slot stamp (🔍/🗺️/🕵️/💡, colour per slot), Bix "saying" the
  numbered notes in a speech bubble, soft picture cards with highlighted
  evidence lines and pill buttons, a chunky "Let's explore!" button and a
  leafy grown-up activity card. Older maps use sea-blue water, green land and
  blue rivers. Accessible names used by tests are unchanged.
- **Verified:** lint, unit and component tests (all 48 runs played through
  with hints and notes reopening) and build; every Year 1 challenge screenshot
  in light (900 px) and dark (390 px) with no horizontal overflow. Physical
  device voice/touch review is still pending.

### Curriculum Mode — Year 2 Geography (2026-10-13)

All **14 topics / 56 challenges** are built across World and UK Knowledge,
Weather and World Patterns, Two Small Places, Making and Reading Maps, and
Local Fieldwork. The owner requested implementation using the Year 2 spec.
`year2GeographyCurriculum.js` and 14 certificate outcomes follow its exact
names. Registry `countsTowardYear: false` preserves Year 2's Maths/English/
Science year-award requirements; progress keys, shape and unlock rules remain
unchanged. Signup now offers Geography for Year 2.

`src/data/challenges/geography/year2/` holds 403 authored templates, at least
seven per slot. Runs sample five without replacement. Year 2 notes stay within
45 words and sentences/prompts/choices within 12 words. The shared notes-first
wrapper preserves responses when notes reopen, offers requested narration,
and uses ordinary choices, sorts and ordering with existing retries/hints.
`KS1Drawing.jsx` supplies four-direction and rotated compass views, simple
landmark plans and shape/letter keys without KS2 grid-reference labels. World
and UK atlas geometry is reused. Visible evidence and text equivalents remain
available throughout answering.

Small-place studies stay within Whitby's harbour/adjoining streets and Kampong
Peramu's neighbourhood/nearby river in Kampong Ayer, Brunei. Four bundled,
inspected photographs have source/licence/date/checksum records and credits:
CC0 Whitby low-tide ground view and Peramu home/prayer hall; CC BY-SA 2.0 true
oblique aerial of Whitby's nearby church/abbey/sea. Captions describe actual
visible features. Example weather logs, paired day records, school observations
and local-route counts are explicitly invented teaching data. One view or day
is not used to claim a whole country's homes, journeys or climate.

Optional grown-up weather, original-map, grounds and local-walk cards provide
materials, steps, paper prompts and home/window alternatives. They appear on
replay and after topic completion using the existing read-only activity path.
No address, school name, GPS, upload or fieldwork completion is collected.

**Verification:** `npm run lint`, `npm test`, `npm run build` pass: **1,772 unit
and 323 component tests passed**, four database-dependent tests skipped. All
56 five-round component runs complete once with combos; retries/hints, notes
state, focus, requested narration, image failure/retry, per-photo credits,
source/asset validation, compass/route vectors and weather counts are checked.
The localhost API security test required sandbox escalation. Store tests
preserve other child/year/subject documents; prior year awards remain available.
Browser controls were unavailable, so desktop/phone layouts, visual theme checks,
real drag/keyboard ordering and switching UI remain pending. Ordering state uses
a mock control in jsdom. Physical phone/tablet voice/touch review is also pending.
Vite's existing large-chunk warning remains. No deployment was made.
**Year 2 bug/security review (2026-10-13):** all 403 templates were exercised
through their controls and all 56 runs replayed. Fixed positional ambiguity,
missing shape descriptions, tally narration, an unverified photo-sketch north
arrow and overbroad country/continent notes. The Year 2 wrapper safely rejects
inherited/invalid IDs and slots, and resets/cancels old runs on prop changes.
Regression tests cover real route gates and once-only saves, profile hydration
and acknowledgement races, remount/replay, HTML escaping and asset fallbacks.
No progress/ID/unlock/reward changes. Latest checks: repository-wide lint,
1,785 unit + 349 component tests (four DB tests skipped), build and production
npm audit pass; zero known production vulnerabilities. Year 2-specific tests
are 29 unit + 32 component. Browser/device review remains pending. Details:
[Year 2 bug/security review](geography-curriculum/YEAR2_BUG_SECURITY_REVIEW.md).

See [Year 2 spec/tracker](geography-curriculum/year-2-design-spec.md) and
[source pack](geography-curriculum/YEAR2_SOURCE_PACK.md). Digital completion
prepares for, and does not certify, original map drawing or real fieldwork.

### Curriculum Mode — Year 3 Geography (2026-10-13)

All **16 topics / 64 challenges** are implemented across The UK and Europe,
Lines on the Globe, Physical Processes, Two European Regions, and Maps and
Local Surveys. The owner requested the build from the Year 3 design spec.
The existing registry, loader, progress, rewards, stickers and certificates
handle the new subject/year entry. `countsTowardYear: false` preserves existing
Year 3 awards. No stored progress shape, document key or unlock rule changed.

`src/data/challenges/geography/engine.js` builds five rounds without replacement
from 454 authored templates, at least seven per slot. Each topic has four
≤60-word field-notes cards with ≤16-word sentences. Notes reopening preserves
question/response state. `GeographyChallenge` wraps `DataChallenge`, whose new
optional `speak` hook passes subject narration through the existing shell.
Narration respects visible options after hints, reads grid-reference digits
separately and says compass names. It is on request, with British speech settings.

`GeographyVisual` supplies original map/globe/coordinate/grid/compass/process
visuals, paired regional maps, a climate table, photos and text equivalents.
Country geometry is pinned public-domain Natural Earth v5.1.2; the Lake District
boundary is ONS/Planning Data OGL. Insets include surrounding land and distinguish
regional outlines from coastlines. Campania provinces are unioned into a single
region. Nearby labels use leader lines; phone labels use larger type.

The genuine June 2026 OS 1:250 000 raster extract shows Keswick/Derwentwater,
with an explicitly added 1 km grid and crops of the product's actual land/water
key. Photographs show Gatesgarth Farm and Naples harbour. The licence manifest
records sources, dates, transformations, alt text and checksums; `/credits`
attributes all borrowed assets. NASA POWER monthly MERRA-2 records from
1991–2020 supply matched, independently recalculated point-cell summaries.
These describe location examples rather than whole-region climate averages.
Source images offer a description and retry if loading fails.

The local-survey topic uses labelled example data. Its optional grown-up survey
card supplies materials, consistent categories/sites, paper tally/sketch/graph
prompts and a window-observation alternative. It appears during replay, after
completion and in the completed curriculum topic. `geographyActivities.js`
reads the existing completion predicate; it writes no fieldwork state.

**Verification:** lint, full tests and build pass: **1,700 unit tests and 280
component tests**, four database-dependent tests skipped. All 64 five-round
runs completed through actual browser controls with normal gating: C1/C3 light
desktop, C2/C4 dark 320 px. Checked retries, hints, notes state, keyboard ordering,
numeric persistence, reload and replay. Thirteen representative slots received
52 further layout checks across both themes and 320/1280 px. Image failure/retry,
requested British narration text, prior Year 2 Maths progress, prior Year 3
certificate availability and profile switching passed in isolated local contexts.
Physical phone/tablet voice and touch review remains pending. Build retains the
existing Vite large-chunk warning. No deployment was requested or made.

**Security and bug review (2026-10-13):** Fixed narration of moved ordering and
sorting cards by passing the current response to the subject narrator. Image
retries use a fresh bundled URL; missing images/maps/source IDs retain their text
equivalents, and changing a photo resets its error state. Registry lookups reject
inherited identifiers and source links require HTTPS. Authoring validation now
reports malformed structures, unknown kinds/views, invalid grids and bad chart
rows; non-finite/out-of-range grid coordinates cannot produce references.
Regression tests cover these cases and literal HTML in evidence. Production
`npm audit --omit=dev` reported zero known vulnerabilities. The review found no
new data collection or change to progress storage or award requirements.

See [Year 3 spec/tracker](geography-curriculum/year-3-design-spec.md) and
[source pack](geography-curriculum/YEAR3_SOURCE_PACK.md) for sources and exact
verification scope. This introductory digital path does not certify full KS2
coverage, independent fieldwork or extended explanations. Year 1 Geography
remains unimplemented; Year 2 is documented below.

### Curriculum Mode — Year 4 Geography (2026-10-13)

All **16 topics / 64 challenges** are implemented across North and South America,
Climate and the Globe, Rivers and Changing Landscapes, Settlements and Resources,
and Mapping and Fieldwork Enquiries, from the Year 4 design spec at the owner's request.
The registry entry uses `countsTowardYear: false`, so Year 4 awards (Maths,
English, Science) are unchanged; no stored progress shape, document key or unlock
rule changed. Subjects offered for Year 4 now include Geography.

The Year 3 engine is generalised: `GEOGRAPHY_AGES` gives Year 4 limits (notes ≤70
words, sentences ≤18), `topic(lessons, activity, year)` stamps the year, and
`lintGeographyTopic` reads it. 582 authored templates (≥7 per slot) live in
`src/data/challenges/geography/year4/` (one file per topic, `group1–5.js`
registries, `sources1–5.js`). `GeographyVisual` gained `river`, `daynight`,
`landuse`, `table`, paired-source rendering, an interactive `explorer` (overview/
detail views plus a thematic layer; buttons named "Map view: …"/"Map layer: …")
and `tenths`/`window` on grids; tenths grids describe each marker's tenths for
screen readers and narration. New Natural Earth views (`northAmerica`,
`southAmerica`, `washington`) and river lines, and NASA POWER 2001–2025 climate
records for 12 places, come from `scripts/geography-assets/build-year4-assets.mjs`.
Six-figure rounds reuse the Year 3 OS extract and key. The fieldwork topic's grown-up
card shows during a run and after completion (`geographyActivities.js`).

**Verification:** lint clean; 1,748 unit tests (4 database-dependent skipped) and
303 component tests pass; build passes. Every topic is checked with 60-seed runs,
marker/geometry tests (cities inside their country, Washington places inside the
state, rivers present) and derived-answer tests; all 64 wrapper runs are played
through the real controls in jsdom. Maps, rivers, day/night, tenths grids and the
explorer were inspected in a desktop browser. **Not done:** a full in-app playthrough
of every slot, both themes at phone width, and physical-device voice/touch. Several
sources are secondary (see [source pack](geography-curriculum/YEAR4_SOURCE_PACK.md)).
Two older tests that hard-coded Year 4's subject list were updated to include Geography.

### Curriculum Mode — Year 3 History (2026-10-12)

All **22 topics / 88 challenges** are implemented across **Stone Age to Iron Age**
(6 topics), **Roman Britain** (8) and **The First Civilisations** (8, overview plus
Ancient Egypt). The owner authorised completion after the first pilot. The KS2
crosswalk records these three units and the remaining Years 4–6 allocation; this
pathway does not claim full KS2 coverage.

The shared History engine renders four independently authored cards per topic:
Meet it, When was it?, History detective and Think like a historian. Each level
has five rounds drawn without replacement from at least seven templates, three
choice options, a ≤60-word card and ≤16-word sentences. Every topic uses choice,
sorting and vertical ordering. Read-aloud, retries, hints and free story reopening
reuse the existing components. Questions carry their answering evidence.

Chronology uses optional named, scrolling timeline bands, retaining KS1 defaults.
British periods run Stone → Bronze → Iron → Roman Britain → today. Roman events
include Caesar's 55/54 BC visits, Claudius AD 43, Boudica about AD 60–61, Hadrian's
Wall AD 122 and the end of rule about AD 410. Early-civilisation beginnings are
explicitly not whole civilisations in succession: their developments overlap.
Some topics sequence processes, such as the Nile farming year or bread making.
No date arithmetic is assessed; bands show order, not equal durations.

The source lessons use inspected, pinned CC0/public-domain images: a flint tool,
bronze axe, British and Roman coins, mosaic, altar, Egyptian jar, scribe, papyrus,
royal sculpture, coffin lid and fishing relief; CC0 site photos show Skara Brae,
Stonehenge, Maiden Castle and Hadrian's Wall. Harry Burton's public-domain 1922
photo records furniture and chariot parts in Tutankhamun's tomb. Modern photos,
find origins and repaired ruins are identified honestly. Objects cannot prove
every person's experience; royal art and Roman accounts have particular viewpoints.
Coffin imagery shows no uncovered bodies. All credits appear through the existing
manifest; pinned sources record URLs, licences, retrieval dates and hashes. WebPs
are ≤800 px and ≤120 KB. The targeted image pipeline preserves other assets.

All topics have certificate statements. History topic/subject rewards use the
normal completion flow. On 2026-10-12 the owner explicitly approved History
counting toward the overall Year 3 award. Its `countsTowardYear: false` flag is
removed: Year 3 now requires Maths, English, Science and History. Existing saved
progress and reward records remain intact; Year 2 keeps its separate exclusion.
No progress shapes, keys or unlock rules changed. See
`history-curriculum/plans/2026-10-12-plan-5-complete-year-3-history.md` and
`history-curriculum/HISTORY_TRACKER.md` for checks and remaining device review.
Full verification passed: lint, production build, 1,659 unit tests and 197
component tests (four database-dependent skips). Chrome completed all 88 routes
through real controls with normal locks, retries/hints, replay and reload; all 22
source cards loaded in both actual themes at 320/390 px. No horizontal overflow
or uncaught page errors; the pre-existing Maths progress document stayed unchanged.
The Trophy Room exposes all 22 topic, three quest and History subject certificates.

**Bug/security pass (2026-10-12):** the final run of an eligible subject now waits
for the other subjects’ progress, with retry for failed or invalid reads. New
challenge routes refresh those reads, preventing stale snapshots from losing
the Year 3 award. Ordinary runs, practice and excluded History years remain
playable; progress shapes, IDs, storage and unlock rules are unchanged. Review
scope, fixes and verification limits are recorded in
[the Year 3 review](history-curriculum/YEAR3_BUG_SECURITY_REVIEW.md). Checks pass:
1,670 unit / 235 component tests, lint and build; four database-dependent skips
and the existing large-chunk warning remain. Chrome checks all 88 route/story
flows, failed images, invalid routes, corrupt storage and the final award/replay.
The dependency audit reports zero known vulnerabilities. No confirmed Year 3
exploit was found.

### Curriculum Mode — Year 4 History (2026-10-12)

All **18 topics / 72 challenges** are implemented across **Anglo-Saxons and
Scots** (8 topics) and **Vikings and Anglo-Saxons** (10). The approved scope
continues Roman withdrawal through Edward the Confessor's death in 1066.
The final card gives one sentence about the Norman Conquest. Greece, a
non-European comparison, the local study and beyond-1066 theme remain
allocated to unbuilt Years 5–6; this does not claim full KS2 coverage.

Each topic has four authored story cards, five rounds per level from at least
seven templates, three choice options, sorting and vertical ordering. Cards
are ≤70 words; sentences are ≤18 words. Detective questions examine maker,
purpose, viewpoint and limits: Alcuin was abroad when Lindisfarne was raided;
royal praise does not supply rivals' views; a written law does not prove
obedience; Alfred's cakes and Cnut's tide are later stories, not eyewitness
records. Every question identifies answering words on its card or source.
Read-aloud, hints, retries, story reopening and completion reuse the shared kit.

Year 4's scrolling timeline runs about AD 410 → Anglo-Saxon kingdoms → 793 →
865 → Alfred → Athelstan → Cnut → Edward. The earlier Stone, Bronze, Iron and
Roman periods appear as muted context. Dates label chronology without sums.
Three inspected CC0/public-domain source images are pinned through the existing
pipeline: Cleveland's Anglo-Saxon brooch and early coin, and the Lindisfarne
Gospels page. The earlier coin is explicitly not Athelstan's. A Roman coin is
reused from Year 3. Original SVG drawings explain Dunadd, kingdom positions,
village evidence, name elements, Sutton Hoo, longships, the Danelaw, Coppergate
finds and legends. Drawings and approximate maps are clearly labelled.

The registry, child year selection and loader discover all 72 wrappers.
All topics have certificate statements. History topic, quest and subject rewards
use normal completion. `countsTowardYear: false` preserves the existing Year 4
Maths/English/Science award, following the existing History policy. No saved
progress shape, key or unlock rule changed. The owner's instruction authorises
the full build without pilot/category review pauses. See
`history-curriculum/plans/2026-10-12-plan-6-year-4-history.md` and the tracker for
verification evidence and physical-device touch/voice review.

Verified: lint and production build; **1,669 unit / 217 component tests** pass,
with four database-dependent skips and the existing large-chunk warning. Chrome
played all 72 routes through real controls with normal locks, retries, hints and
reopening, both themes and phone widths. All 18 source cards were inspected in
both themes at 320 px. Reload/replay preserved exactly 72 numeric completions;
a separate new-History run preserved all 15 prior curriculum progress documents.
All 18 topic certificate dialogs and the subject certificate opened; both quest
certificates are available. No page errors or horizontal overflow. Physical-device
voice/touch review remains; no deployment was made.

**Bug/security pass (2026-10-12):** the completion screen now respects the
current subject's existing `countsTowardYear` eligibility, preventing excluded
Years 2/4 History from re-awarding the year when other subjects are complete.
Year 4 content fixes remove an ambiguous Lindisfarne chronology question, a
malformed answer and a stale timeline description. The shared History source
renderer offers descriptions and retry when a known image fails. Review scope,
regressions and verification limits are recorded in
[the Year 4 review](history-curriculum/YEAR4_BUG_SECURITY_REVIEW.md).
Final checks pass: **1,670 unit / 225 component tests**, lint and build; four
database-dependent skips and the existing large-chunk warning remain. Chrome
replayed all 72 routes and separately verified the excluded subject's final
award, failed images, rejected URLs, corrupt progress and profile isolation.
All 15 other curriculum progress documents stayed unchanged. Dependency audit
reported zero known vulnerabilities; no confirmed Year 4 exploit was found.

### Curriculum Mode — Year 1 Maths (2026-10-11)

Year 1 now offers **Maths and English**. Maths has **7 categories / 32 topics /
128 implemented challenges**, with five questions per challenge. The statutory
programme in [year-1-maths.md](curriculum/year-1-maths.md) is unchanged; its new
mapping table traces every topic to a requirement and records coverage limits.
There is no Year 1 statistics strand.

| Category | Topics | Challenges built |
|---|---:|---:|
| Number - Number and Place Value | 7 | 28/28 |
| Number - Addition and Subtraction | 6 | 24/24 |
| Number - Multiplication and Division | 3 | 12/12 |
| Number - Fractions | 2 | 8/8 |
| Measurement | 9 | 36/36 |
| Geometry – Properties of Shapes | 2 | 8/8 |
| Geometry – Position and Direction | 3 | 12/12 |

The dataset is `src/data/year1MathCurriculum.js`, registered through the existing
registry. Pure seeded generators live in `src/data/challenges/year1Math/`, grouped
by strand; 128 convention-named wrappers use `Year1MathGame.jsx`. `DataChallenge`
now accepts an optional `renderVisual(question)` for diagrams alongside any
existing answer kind. It is absent for existing data challenges. The Year 1
renderer reuses ArrayGrid, PlaceValueBlocks, ScaleReader, ShapeFigure,
SolidFigure and PositionBoard, adding countable/crossed-out counters, equal and
unequal strips, non-standard measures, denomination diagrams and movement/turn
pictures. Its CSS is scoped and uses the light/dark App.css tokens.

Activities progress from supported reading/choice to independently filled
numbers, sorting, ordering, building, fraction shading, clock setting and short
applied problems. Counting stays within 0–100, arithmetic within 20 (including
zero), fraction names are halves/quarters, and clocks only use 0/30 minutes.
Squares are included in the rectangle family and cubes in the cuboid family;
name questions avoid offering both valid answers. Money images are simplified
diagrams, not photographs of every denomination design. Real-object measuring,
shape handling and discussion still need an adult.

Registration also exposes Maths in Year 1 signup and gives every new topic its
own certificate statement. Existing progress storage and unlock predicates are
reused. The existing year-award rule now waits for Maths **and** English; saved
English and Year 2 Maths identifiers and documents are not rewritten.

Validation: bank linting over 100 seeds per level, independently recomputed
arithmetic/drawing answers, all computed loader paths, fresh/reloaded/replay
locks, topic/category cascade and two-subject year milestones. React component
tests load all 128 real wrappers under light and dark body classes, count the
rendered counters/array dots, exercise sorting, clock setting and shading, and
complete a full run after wrong answers and a hint. Vite served the local
curriculum route. Browser controls/Node REPL are unavailable in this session, so
visual browser review, live colour/layout measurement and a real browser
persistence playthrough could not be completed; these checks remain for the
owner's interactive review. Lint, the full test suite and production build pass.

**Dirty-change review (2026-10-11):** reviewed the dataset, all 128 wrappers,
shared rendering, generators, certificates, signup expectations, tests and docs.
Removed the denomination from the applied coin prompt, which previously gave
away its answer. Lunch comparisons now specify noon and afternoon. Ruler objects
now render inside ScaleReader's optional child slot, sharing the track's
percentage coordinates and zero baseline rather than a separate fixed-pixel
height/offset; the drawings and prompts consistently call them ribbons/towers.
The one-more/one-less instruction identifies the labelled Start number rather
than referring to the middle of a four-number row. Loader tests now check the
wrapper's topic id and use decoded filesystem URLs for paths containing spaces.
Regressions independently check measurement answers/units, note comparisons,
coin prompts and time context; arithmetic checks also cover reversed equalities.
The component test checks both ruler orientations against their pointer and
common track. No saved identifiers, storage shapes or unlock predicates changed.
Lint, all tests and build pass; visual browser review remains unavailable.

### Curriculum Mode — Year 4 Maths (2026-10-11)

Year 4 Maths is registered and implements **8 categories / 42 topics / 168
challenges**. The topic-to-statutory mapping is in
[year-4-maths.md](curriculum/year-4-maths.md); the saved programme text is unchanged.

| Category | Topics | Challenges built |
|---|---:|---:|
| Number - Number and Place Value | 9 | 36 |
| Number - Addition and Subtraction | 3 | 12 |
| Number - Multiplication and Division | 5 | 20 |
| Number - Fractions including Decimals | 10 | 40 |
| Measurement | 6 | 24 |
| Geometry – Properties of Shapes | 4 | 16 |
| Geometry – Position and Direction | 3 | 12 |
| Statistics | 2 | 8 |

The learner chooses **Year 4 → Maths** through the existing year/subject picker
and signup choices. No new routes are needed. Each topic has four levels and
five questions per run, with rules and diagrams in the first level, independent
practice, arranging/building/plotting, and applied problems. Questions live in
`src/data/challenges/year4Math/questions.js`; `Year4MathGame` uses the shared
`ChallengeShell` and `DataRound`, with themed SVG diagrams and keyboard/touch
controls for coordinate plotting and mirrored square patterns. Learners build
scaled bar charts from tables using the shared `BarChart` step controls. Coordinate grids
scroll horizontally on narrow screens to preserve 44px targets. The shared
sequence renderer now honours `maxDigits`, so multiples of 1000 can be entered.
All 42 topics have certificate skill statements.

Storage, existing identifiers and unlock predicates are unchanged. Adding Maths
makes the existing Year 4 award rule wait for both registered subjects; saved
English completion and earned rewards remain intact. Screen activities do not
replace physical measurement, instrument drawing or classroom reasoning, and
completion does not certify full statutory mastery.

**Full review (2026-10-11):** all 42 topic banks and 168 challenge files were
checked against their statutory mappings. Mathematical tile validation now
accepts equivalent equations, sums and perimeter traversals; expanded numbers
include addition symbols and whole-calculation builds explicitly request all
tiles. Applied unit stories use meaningful contexts, comparisons include all
three relations, and chart differences and derived division facts vary.
Later clock levels cover every minute and all twelve hours; functional clock
updates preserve rapid taps. Decimal division explicitly checks digit values
and keeps all ordering inputs within two digits. Selected polygon vertices
close the diagram, shape captions wrap, column headings align with digits,
and narrow negative-number lines and reflection grids preserve readable labels
and touch targets by scrolling.

Validation: `npm run lint`, `npm test` and `npm run build` pass: **1,563 unit
passes, four existing skips, and 113 component passes**. Controller playthroughs
complete all **168 five-question challenges (840 questions)**, preserving the
single completion callback and combo data. Regression checks cover equivalent
and invalid tile responses, random-source boundaries, arithmetic and diagram
answers, SVG-derived geometry/symmetry, clock wrapping and rapid taps, four-digit
keypad entry, polygon sides, round reset and lock/replay cascades. The staged Year 4
changes were verified in isolation from the separate local Year 1 Science work.

Browser controls were unavailable, so physical dragging, pixel layout in both
themes and real-browser persistence remain unverified. The controller tests
explicitly use a reorder adapter because jsdom has no drag-collision layout.
The complete inventory and findings are in
[year-4-maths-review.md](curriculum/year-4-maths-review.md).

### Bix's lesson screens for every subject (2026-10-13)

Geography's start screen (banner, Bix's numbered notes in a speech bubble, a
picture, a big start button, notes reopenable mid-run) is now a shared layer
for the other subjects. `Challenge.jsx` looks up
`getLesson(subject, year, topicId, slot)` in `src/data/lessons/` and, when one
exists, wraps the loaded challenge in
`src/components/challenge/lesson/LessonFrame.jsx`. The challenge itself, its
questions and its `onComplete` are untouched; no lesson means it starts
straight away as before. Geography keeps its own `GeographyChallenge`.

- Data: `src/data/lessons/<subject>/year<n>/<category>.js`, one file per
  category, merged by that year's `index.js`. Each slot is
  `{ title, lines: [3], example }`; example types are `equation`, `column`,
  `steps`, `jumps`, `bar`, `groups`, `table`, and for English `sentence`
  (`**marked**` key words) and `fix` (wrong → right) (`LessonExample.jsx`).
- `lintLessons.js` (run by `lessons.test.js`) demands 4 lessons for every topic,
  3 lines each, Geography's per-year word limits, British spelling, and
  re-computes every numeric equation, column sum and counting sequence.
  `node scripts/lintLessonFile.mjs <file> <EXPORT> <category id>` lints one file.
- Slot colours are `--light-lesson-slot-1..4` / `--dark-lesson-slot-1..4` in
  App.css (aliases of Geography's slot colours).
- Rollout order (owner, 2026-10-13): Maths, English, Science, History; within
  each, Years 3, 4, 2, 1. Each step writes the year's lessons **and** fixes the
  challenges the lesson audit flags (repeats, guessable options, duplicate
  levels, off-spec content). Update this tracker when a year lands.

#### Lesson rollout tracker

| # | Subject | Year | Topics | Status |
|---|---|---|---|---|
| 1 | Maths | 3 | 44 | ✅ Done (2026-10-13) |
| 2 | Maths | 4 | 42 | ✅ Done (2026-10-13) |
| 3 | Maths | 2 | 39 | ✅ Done (2026-10-14) |
| 4 | Maths | 1 | 32 | ✅ Done (2026-10-14) |
| 5 | English | 3 | 32 | ✅ Done (2026-10-14) — plus 6 passages per reading level 4 |
| 6 | English | 4 | 33 | ⏭️ **Next** |
| 7 | English | 2 | 39 | To do |
| 8 | English | 1 | 38 | To do |
| 9 | Science | 3 | 21 | To do |
| 10 | Science | 4 | 20 | To do |
| 11 | Science | 2 | 19 | To do |
| 12 | Science | 1 | 16 | To do |
| 13 | History | 3 | 22 | To do |
| 14 | History | 4 | 18 | To do |
| 15 | History | 2 | 17 | To do |
| 16 | History | 1 | 14 | To do |

Geography is not in the rollout: it already has its own lesson screens.

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

### Curriculum Mode — Year 2 English (2026-10-11)

**Built: 39 topics, all 156 challenges, across nine categories.** English now
opens from the Year 2 subject picker alongside Maths. The new registry entry
uses the existing routes, availability lookup, unlock rules and per-child
progress documents. Existing Maths and Years 3–4 English identifiers are unchanged.

- **Sources:** the saved Year 2 programme of study, Appendix 2 and Appendix 1
  in `docs/curriculum/`. Every topic has a requirement/boundary row in
  [year-2-english.md](curriculum/year-2-english.md). Its statutory sections
  are unchanged. All Appendix 1 example words are offered in the spelling
  banks, including every common exception example and all eleven homophone
  groups. Year 2 examples are guidance, not a statutory word list.
- **Structure:** `year2EnglishCurriculum.js`; one pure, year-prefixed builder
  and test per topic in `src/data/challenges/english/`; one Game and four
  computed challenge wrappers under `src/pages/skills/english/challenges/year2/`.
  The categories alternate spelling, reading, grammar and writing as in Years 3–4.
- **Interactions:** the shared `DataChallenge` renderer supplies choices,
  four-card sorting, letter/word tiles, spelling entry, evidence selection
  and keyboard-operable ordering. `year2Practice.js` assembles questions;
  five rounds per word/sentence challenge, three or four per passage challenge.
  Each word/sentence bank has at least 15 items; each reading bank has three
  original short texts (24 in total), with verbatim evidence for its questions.
  Hints appear after two misses; grammar terms have glosses in levels 1–3.
- **Capital letters:** data questions can opt into `caseSensitive: true`,
  so capital-letter and proofreading questions reject lower-case alternatives.
  Choice validation, hint filtering and built answers use the same comparison.
  Other questions retain their existing case-insensitive comparison.
- **Dictation:** a Year 2 bank injects into the existing dictation Game,
  with tap-to-hear or look-cover-write when speech is unavailable. Its word
  and punctuation tiles preserve list commas, contractions, singular
  possessives, capitals and end marks. There is no dependence on audio alone.
- **Certificates:** `english/year2CertificateSkills.js` adds a short topic
  achievement for every new topic. Adding English means a Year 2 year award
  requires both registered subjects, through the existing registry-based rule.
- **Beyond the screen:** handwriting, whole books, repeated reading for
  fluency, live discussion, oral composition and poem performance need adult
  practice alongside the games. Structured story/poem building does not assess
  independent free writing. The source mapping records these boundaries.
- **Verification:** all 46 Year 2 checks pass, including bank validation,
  Appendix 1 coverage, computed challenge paths, registration, stable ids,
  fresh locks and topic/category cascades. Lint and production build pass;
  the component suite passes all 56 tests. An isolated Chrome profile loaded
  all 156 real challenge routes and completed nine runs covering choices,
  sorting, word/letter building, apostrophe spelling, capital-letter errors,
  evidence selection, keyboard ordering and dictation. Wrong answers retry,
  hints appear after two misses, progress persists on reload, completed
  challenges remain replayable, and a pre-existing Maths progress document
  stays unchanged. Settled screenshots of reading, sorting and spelling entry
  were checked in both themes at 390px and 1280px, with no horizontal overflow
  or browser runtime errors. This is representative interactive coverage,
  not a full playthrough of every authored question. The full `npm test` run
  now passes after Year 1 completion. `node scripts/checkEnglishChallenges.js`
  renders all 568 Year 1–4 English components through Vite/React with no speech voice.

| Category | Topics | Built challenges |
|---|---|---|
| Spelling - Sounds and Endings | The ge and dge Spellings; Soft c and Silent Letters; The le, el, al and il Endings; The y and ey Endings; Other Ways to Spell Sounds | All 20 ✅ |
| Reading - Words | Reading Longer Words; Reading Words with Suffixes; Common Exception Words | All 12 ✅ |
| Grammar - Words | Compound Words and Nouns; Adjectives and Adverbs | All 8 ✅ |
| Reading - Stories | Sequencing Events; Understanding Characters; Predicting from a Story; Fairy Stories and Traditional Tales; Word Meanings in Stories | All 20 ✅ |
| Spelling - Suffixes | Changing y to ies; Suffixes after y; Dropping e before a Suffix; Doubling the Last Letter; The Suffixes ment, ness, ful, less and ly | All 20 ✅ |
| Grammar - Sentences and Punctuation | Statements, Questions, Exclamations and Commands; Expanded Noun Phrases; Joining Sentences; Present and Past Tense; Actions in Progress; Capital Letters and End Marks; Commas in Lists | All 28 ✅ |
| Spelling - Apostrophes and Homophones | Contractions; Apostrophes for Ownership; Homophones and Near Homophones | All 12 ✅ |
| Reading - Information and Poetry | Finding Facts in Non-Fiction; Poems and Repeated Phrases; Asking Questions and Discussing Books | All 12 ✅ |
| Writing - Planning and Checking | Planning and Building Stories; Writing about Real Events; Writing for Different Purposes; Building Poems; Checking and Improving Writing; Dictation | All 24 ✅ |

### Curriculum Mode — Years 3 and 4 English (2026-10-01, implemented)

**The live status and the resume point is
[docs/english-curriculum/IMPLEMENTATION_TRACKER.md](english-curriculum/IMPLEMENTATION_TRACKER.md).**
The approved plan with every product decision sits beside it, along with the
self-contained briefs used to build batches of topics. All **32 Year 3 topics
(128 challenges)** and **33 Year 4 topics (132 challenges)** are implemented.
[IMPLEMENTATION_REVIEW.md](english-curriculum/IMPLEMENTATION_REVIEW.md) records
the completion checks and the outstanding interactive browser review.

- **Source.** The Years 3–4 programme of study and Appendix 1 are saved
  verbatim in `docs/curriculum/`. The mapping section of
  `year-3-and-4-english.md` holds three things that are our own design, not
  statutory: the Year 3 / Year 4 split, the boundaries for each year, and
  every topic → bullet row. Offline strands (handwriting, performance,
  discussion, reading aloud) are listed as deliberately not covered.
- **Datasets.** `year3EnglishCurriculum.js` (32 topics) and
  `year4EnglishCurriculum.js` (33). Categories alternate between strands
  (spelling → reading → grammar → …), so the sequential category unlock never
  puts ten reading topics before any spelling.
- **The pattern** is the same as Maths, with authored banks instead of
  arithmetic:
  - a pure builder per topic in `src/data/challenges/english/`, ≥3× a run,
    tested for one-right-answer and British spelling;
  - one `<Pascal>Game.jsx` per topic, shared by its 4 challenge files;
  - 5 questions per challenge (3–4 for a passage);
  - hints after two misses that never give the answer away;
  - glossed grammar terms in slots 1–3 only.

  See the "English topics" section of the `building-curriculum-topics` skill.
- **Built:** every topic in both approved datasets has all four challenges.
  Year 3 includes completed reading banks, all missing wrappers, and bounded
  shuffle/selection fallbacks. Year 4 adds its complete Appendix 1 spelling
  half, grammar, original comprehension texts, composition and dictation.
  Its spelling banks include every assigned appendix example, all statutory
  Year 4 word-list entries and all eight Year 4 homophone groups.
- **Shared rendering:** `EnglishPracticeGame.jsx` renders choice, sorting,
  letter-tile/word-tile building and spelling entry. Year 4 reading topics use
  `year3/ReadingTopicGame.jsx` with per-topic banks and `year4Reading.js`.
  `year4Practice.js` contains pure question assembly. Each topic still has its
  own builder, tests, Game and four computed challenge files.
  Dictation reuses the Year 3 Game with an injected Year 4 builder; its tokens
  preserve commas, inverted commas, possessive apostrophes and end marks.
- **Verification:** lint, 987 passing tests (one pre-existing skip), build and
  initial Vite/React rendering of all 260 English components pass. Only the
  four Year 3 pilots have had interactive browser verification so far.
  Browser controls were unavailable for the completion session; wrong-answer
  retries, full-run celebrations, mobile layout, keyboard use and computed
  contrast in both themes remain to be checked interactively.
- **Speech** is the browser's own speech synthesis in a British voice
  (`src/utils/speech.js`, `SpeakButton`). It plays only when tapped and follows
  the navbar mute; tapping while muted unmutes. With no voice available the
  button is not shown, so every question must be answerable without sound.
- **Year 4 in the app.** `CURRICULUM_YEARS` and `CHILD_YEAR_GROUPS` are now
  `[1, 2, 3, 4]`. Year 4 offers English and Maths (Maths implemented 2026-10-11).
- **Curriculum page:** the English strands have their own category icons
  (🔤 📖 🧱 ✍️) and the hero shows letters rather than maths symbols. English
  patterns are matched first, because "Composition" contains "position".

### Curriculum Mode — Year 1 English (2026-10-11)

**Complete: 8 categories, 38 topics, all 152 challenges.** Year 1 offers
English through the existing picker, routes and progress path. The approved
category/topic identifiers remain locked in `curriculumIds.test.js`; the
programme of study and boundaries are in
[year-1-english.md](curriculum/year-1-english.md). Statutory text is unchanged.

- **Structure:** `year1EnglishCurriculum.js`, registered in
  `curriculumRegistry.js`; 38 certificate “I can…” statements. Every topic
  has a pure, year-prefixed bank and test in `src/data/challenges/english/`,
  plus four computed challenge wrappers under
  `src/pages/skills/english/challenges/year1/`. The existing Alphabet pilot
  is preserved. `year1Practice.js` assembles the remaining data questions.
- **Interactions:** choices, word-to-meaning/sound matching, letter/word
  tiles, spelling entry, evidence selection and keyboard-operable ordering, drawn by `DataChallenge`.
  Five distinct questions per word/sentence challenge; three per short-text
  challenge. Each item bank has at least 15 authored items; each reading
  bank has three original passages or poems, at most 80 words each.
- **Early readers:** emoji pictures have accessible labels; every question
  offers tap-to-hear instructions when speech is available. Reading questions
  narrate instructions, never answers or passages: `readTextAloud: false`
  disables the shared text box’s extra narration button while keeping the
  question button. Older courses retain text narration by default. Spelling
  questions speak the target and provide a visible picture, context or word-parts clue.
  Typed words also show their first letters and length, so the visible
  sentence does not leave two plausible words when sound is unavailable.
  Hints appear after two misses; reading evidence hints narrow to two lines.
- **Year 1 boundaries:** added endings keep their roots unchanged; contractions
  are read and expanded, never typed with apostrophes. The spelling banks
  cover the mapped Appendix 1 patterns, including the alternative sounds of
  ea, ie, oo, ow and ear. Capitals are checked with opt-in case sensitivity;
  weekdays use capital-bearing tiles in the final level because the spelling
  keyboard only supplies lower-case letters. Ordinary Year 1 spelling hides
  the apostrophe key. Composition uses prescribed choices and building, with short contexts that establish the intended idea.
- **Dictation:** `year1Dictation.js` supplies short Year 1 sentences to the
  existing Year 3 memory game through `year1/DictationGame.jsx`. An optional
  `titles` prop gives Year 1 short headings while older years retain theirs.
  Its listen / look-cover-build fallback remains available without sound.
  The custom bank has its own checks for reconstruction, word boundaries,
  punctuation and constant random sources rather than `lintBuild`, whose
  kinds differ from the memory game.
- **Progress:** no storage keys, saved shapes or unlock rules change.
  Registration, fresh locks, completed-challenge replay and the first category
  cascade have integration tests. All 152 computed wrapper paths are checked
  by `year1ChallengeCoverage.test.js`; all data banks run `checkYear1Build`
  for short prompts, distinct questions, speech, British spelling and fair
  controls over seeded and constant random sources.
- **Verification:** `npm run lint`, `npm test` and `npm run build` pass:
  1,491 unit tests passed (four existing skips) and 56 component tests passed.
  All 568 Year 1–4 English challenges render through Vite/React, including
  without speech. An isolated Chrome profile loaded all 152 Year 1 routes
  and completed 15 representative runs covering choices, sorting, spelling,
  letter/word tiles, capitals, evidence, keyboard ordering and dictation.
  Wrong answers retry, hints appear after two misses, progress persists on
  reload and completed work remains replayable. A pre-existing Maths document
  stayed unchanged. Screenshots cover six interaction examples in both themes
  at 390px and 1280px (24 views), with no overflow or runtime errors. Browser
  speech checks confirm reading speaks only instructions and never autoplays.
  The existing large-chunk build warning remains.
- **Limits:** handwriting, independent oral reading, recitation, discussion
  and free writing still need an adult and are not assessed by the app; the
  source mapping records these boundaries. Interactive checking samples the
  controls and topic families rather than every question in every bank.

| Category | Topics | Built challenges |
|---|---|---|
| Spelling - Letters and Sounds | The Alphabet; Double Letters and ck; The Sounds nk and tch; Words Ending in ve and y; The Spellings ph, wh and k | All 20 ✅ |
| Reading - Phonics | Blending Sounds; Same Letters, Different Sounds; Tricky Words; Longer Words; Contractions | All 20 ✅ |
| Grammar - Words | Singular and Plural; Adding ing, ed and er; Adding er and est; The Prefix un; Compound Words | All 20 ✅ |
| Reading - Stories | Traditional Tales; Titles and Events; Thinking About Characters; What Happens Next? | All 16 ✅ |
| Spelling - Vowel Sounds | The Spellings ai, ay, oi and oy; Split Digraphs; The Spellings ee, ea, ie and igh; The Spellings oo, oa, ow and ew; The Spellings ar, or, er, ir and ur; The Spellings air, ear and are | All 24 ✅ |
| Grammar - Sentences | Words and Sentences; Joining with And; Capital Letters; Days of the Week; Ending a Sentence | All 20 ✅ |
| Reading - Poems and Facts | Rhymes and Poems; Repeated Phrases; What Words Mean; Facts and Stories | All 16 ✅ |
| Writing - Composition | Building Sentences; Ordering a Story; Checking It Makes Sense; Dictation | All 16 ✅ |

### Years 1–2 English — combined uncommitted-change review (2026-10-11)

Reviewed both courses together with the shared renderer, answer comparison,
registry, certificates, loader paths, tests and documentation. Statutory text
before the mapping sections in both programme files is byte-for-byte unchanged.
Saved progress identifiers, storage shapes and unlock rules are unchanged.

Corrections from this pass:
- Year 1 sound sorting now uses three distinct phoneme groups per round.
  Different descriptions of the same vowel sound can no longer become competing
  bins. A seeded regression check verifies each card has exactly one sound bin.
- Year 2 spelling entry shows starting letters and letter count before an
  attempt, narrowing definition clues that could otherwise invite synonyms.
  The apostrophe key is shown only when the target needs it.
- Year 2 word sorting asks whether a word fits its clue, rather than whether it
  is spelt correctly: a homophone can be correctly spelt but wrong in context.
- Tightened the basket meaning clue and corrected bee/buzzer contexts, beach
  prepositions and the toy-car action. Added a shared comparison regression
  check for capital-letter answers and the forgiving defaults used by older courses.

Validation: lint, the full test suite (1,491 unit passes, four existing skips,
56 component passes), production build and all 568 English component renders
pass. Fresh isolated Chrome checks cover all 156 Year 2 routes, representative
completion/retry/hint/persistence flows, Year 1 sound sorting, and updated
spelling/sorting layouts in both themes at phone and desktop widths. Interactive
coverage samples the controls; it does not exhaust every authored question.

### Curriculum Mode — Year 1 Science (2026-10-11)

Year 1 now offers **Maths, English and Science**. Science has **4 categories /
16 topics / 64 implemented challenges**, five questions each, in the DfE order:
Plants (4), Animals, including humans (5), Everyday materials (4) and Seasonal
changes (3). Titles were approved by the owner on 2026-10-11 and are progress
ids. [year-1-science.md](curriculum/year-1-science.md) maps every topic to its
statutory bullet and records the coverage limits; the statutory text is
unchanged.

**Authored as template banks.** Questions are written by hand, not generated
from numbers, so each topic is a set of named banks plus a five-slot recipe per
level (`src/data/challenges/year1Science/engine.js`, `buildTopic`). A run draws
templates without replacement, so nothing repeats within a challenge.
Templates: `c()` choice (3 options at level 1, 4 after), `sorter()` 2–3 bins
with at least one card per bin, `spell()` letter tiles, `typed()` letter
keyboard, order, number and chart. Generated templates are functions of `rng`
(the winter tree pair, day-length pairs, weather pictograms, Bix's absorbency
bar chart). Banks are in `plants.js`, `animals.js`, `materials.js` and
`seasons.js`. Slot titles: Look and learn · Spot and sort · Put it together ·
Be a scientist. Every wrong option is chosen so it does not also fit the clue.
Examples are clear-cut (no dogs or hedgehogs in the diet sort, no spoons in the
materials sort). Weather is "most likely" in a season, never "only". Day
lengths are rounded London daylight: about 8, 12 and 16 hours.

**One game, one drawing component.** All 64 wrappers render
`Year1ScienceGame` (`DataChallenge` with `readAloud` on, because Year 1
readers are just starting). `Year1ScienceVisual` draws plain SVG for five
visual types: a flowering plant (optionally from a bulb), a tree (with fruit,
or blossom in spring), a winter tree pair, a child's body and day-length
hour boxes. A pointed part gets a dot and an arrow. The drawing never prints
the name being asked for, and its screen-reader label says where the arrow
is, not what the part is called. Day-length boxes are a list of "sun box" / "dark box" items, so a
screen-reader user counts them as a sighted child does. Natural colours are `--y1s-*` tokens with dark
twins in `Year1ScienceVisual.css`, alongside the App.css tokens.

**Wiring.** Registered in `curriculumRegistry.js`; certificate lines in
`year1ScienceCertificateSkills.js`; Year 1 signup now offers Science. The
existing year-award rule waits for all three Year 1 subjects. Storage, unlock
rules and other curricula are untouched.

**Validation.** `year1Science.test.js` lints every bank over 100 seeds per
level and checks that no authored question repeats within a run, that each
topic uses at least three interaction kinds, that every question accepts a
complete correct response, that diagrams only name parts they can draw, and
that counts match the drawn sun boxes. `year1ScienceCurriculum.test.js` locks the ids
and checks loader paths, locks, the reload/replay cascade and the
three-subject year award. `tests/components/year1Science.test.jsx` renders
all 64 wrappers in both themes and plays a challenge from the drawing's labels.
It also checks a wrong answer and the hint, plus sorting, letter tiles and
typing with the real controls. A headless Chrome run against the dev server (local store,
`VITE_UNLOCK_ALL`) played all 64 challenges, 320 questions, through the real
controls, including keyboard drag-to-order. It recorded topic, quest and
"whole Science journey" celebrations and no console errors; phone-width
screenshots in both themes showed no horizontal overflow. An independent content review the same day fixed three science slips (foil
shown absorbing water, toads under a "smooth, damp skin" rule, "waterproof"
offered as wrong for rubber). It also fixed weather pictures whose wrong options
were also true, a day-order picture already in answer order, answers named in
prompts ("pine cones", "bluebell"), UK-ambiguous words ("rubber", "a glass") and
arrows that missed their part. **Still pending:**
the owner's review, touch on a real phone and the read-aloud voice on a device.

### Curriculum Mode — Year 2 Science (2026-10-11)

Year 2 now offers **Maths, English and Science**. Science has **4 categories /
19 topics / 76 implemented challenges**, five questions each, in the DfE order:
Living things and their habitats (5), Plants (4), Animals, including humans
(6) and Uses of everyday materials (4). Category titles are the statutory
headings; topic titles were approved by the owner on 2026-10-11 and are
progress ids. [year-2-science.md](curriculum/year-2-science.md) maps every
topic to its statutory bullet and records the coverage limits; the statutory
text is unchanged.

**Same engine as Year 1.** Banks in `src/data/challenges/year2Science/`
(`living.js`, `plants.js`, `animals.js`, `materials.js`) use
`year1Science/engine.js` (`buildTopic`, `c`, `sorter`, `spell`, `typed`)
unchanged, with the same slot titles. Generated templates are functions of
`rng`: the pot-plant pair, and Bix's bar charts (nature-walk sort, minibeast
counts, weekly bean heights, green leaves after a light/water test, seeds
sprouted in a warm, dark cupboard against a fridge, breaths after exercise),
all through `year2Science/charts.js` (`extremeChart`, `valueChart`), which
takes each answer from `chartAnswer`. Content follows the
guidance note that seeds and bulbs need water but most do not need light;
plants in the dark turn pale (drawn tall and thin, never "short"); health facts follow NHS
advice (an hour of activity, five a day, two minutes twice a day, 20-second
handwash). Food chains always start with a plant and use "is eaten by"; no
Year 4 producer/consumer words. Wrong options may repeat a link already in
the chain, because that tests which way the arrows point.

**One game, one drawing component.** All 76 wrappers render
`Year2ScienceGame` (`DataChallenge` with `readAloud` on). `Year2ScienceVisual`
draws three types: a food chain (HTML boxes and arrows, a dashed "?" box for a
gap, which screen readers hear as "a missing box"), a plant at one of four
growth stages (early stages cropped to the soil), and two pot plants labelled
Plant A and Plant B (healthy, pale or droopy). Labels describe what is visible,
never the stage name. Plant colours reuse the `--y1s-*` tokens; the few new
ones are `--y2s-*` with dark twins.

**Wiring.** Registered in `curriculumRegistry.js`; certificate lines in
`year2ScienceCertificateSkills.js`; Year 2 signup now offers Science. The
existing year-award rule now waits for all three Year 2 subjects, so a learner
who had finished Year 2 Maths and English sees the Year 2 certificate again
only after Science (certificates are derived, nothing stored is lost).
Storage, unlock rules and other curricula are untouched.

**Validation.** `year2Science.test.js` lints every bank over 100 seeds per
level, checks no screen repeats within a run, that each topic uses at least
three interaction kinds, that every question accepts a complete correct
response, that growth and pot drawings agree with their answers and that every
food chain starts with a plant. `year2ScienceCurriculum.test.js` locks the ids
and checks loader paths, certificate lines, locks, the reload/replay cascade
and the three-subject year award. `tests/components/year2Science.test.jsx`
renders all 76 wrappers in both themes, plays a Plant Experiments challenge
reading the test plants from the drawing's label (wrong answer, hint,
single completion), and sorts and types with the real controls. A headless
Chrome run against the dev server (`VITE_USE_API=false`, `VITE_UNLOCK_ALL`)
played all 76 challenges, 380 questions, through the real controls (keyboard
drag-to-order, letter tiles, keypad, sorting), checked every pot pair and
food-chain gap against the drawing, and reached topic, quest and "Science
complete!" celebrations with no console errors. Phone-width screenshots in both
themes showed no horizontal overflow. **Still pending:** the owner's review,
touch on a real phone and the read-aloud voice on a device.

**Review pass (2026-10-11).** Four independent content reviews (one per
category) and one code/UI review. Fixed: answers stated by the `rule` panel or
hint (a bank test now fails on any rule or hint that names the answer but not
the other options); typed answers with fair alternatives (sea/ocean,
home/habitat, cream/milk for butter, squeeze/squash, singular/plural), now
constrained or replaced; science slips (a "waterproof" swimming costume, crabs
hiding when the tide comes in, a warmth test that also changed light, a frog
that also lives in rainforests, onions grown "only" from bulbs); tone (no
stopping hearts, "bad" food, weight or skipped meals; exercise is not only
running; no pork); bar charts over 10 that overflowed BarChart's axis (data now
stays within ten gridlines, `step: 10` for breaths, tested); a chain link with
no picture (every link's icon is now tested); food chains repeating within a
run; small banks that replayed identically. The pale test plant is drawn tall,
thin and small-leaved with an outlined stem, so it differs by shape as well as
colour, and food chains stack vertically under 300px so an arrow never ends a
line. Component tests read the pots from the drawn shapes, play a food-chain
challenge from the drawing and check growth geometry. All 76 challenges were
replayed in headless Chrome afterwards with no problems or console errors.
Known and not fixed here: BarChart's step-1 axis overflows past ten gridlines
in any year, and its screen-reader label carries no values; the navbar
overflows at 320px on every page.

### Curriculum Mode — Year 4 Science (2026-10-11)

The complete five-strand pathway has 20 topics and 80 challenges, mapped to the
statutory bullets in [year-4-science.md](curriculum/year-4-science.md). It appears
through the existing year/subject picker, signup subjects, progress tree,
completion flow and certificates. Year 4's year award now requires Maths,
English **and Science**. No storage, migration or unlock-rule change.

`src/data/challenges/year4Science/` contains authored banks for habitats,
animals, matter, sound and electricity, with a pure seeded recipe engine. Five
questions per challenge: supported recognition; comparison with sorting;
whole-structure sorting/building/ordering; evidence-based application with
three scenario or measurement questions and two constructed responses.
`Year4ScienceGame` renders through the shared `DataChallenge` kit and passes
completion/combo data through unchanged. All 80 wrappers use the loader's
computed paths. Certificate statements have their own Year 4 Science module.
The optional `DataChallenge.checkAnswer` hook forwards to `DataRound`;
Year 4 uses `isScienceAnswerCorrect` for reviewed equivalent sentence orders.
Every tile must be used once, and incorrect scientific relationships still fail.

`Year4ScienceVisual` draws theme-aware pictorial circuits, the digestive route
and a simplified water cycle, and renders labelled supplied-results tables.
Bulbs in circuit questions are drawn unlit so the learner predicts from the
connections. Sound tasks use observable/written evidence without depending on
audio playback. Optional read-aloud is available across the year.

The mapping records practical limits: digital questions rehearse science but
do not claim to replace local habitat observation, hands-on circuit construction,
temperature measurements or actual sound enquiries. Only supervised suitable
low-voltage-cell activities are suggested; no mains experiments or formal
Year 6 circuit symbols/current/voltage teaching.

Data tests validate all four levels over 50 seeds per topic, response correctness,
source immutability, depicted circuit continuity, classification routes,
food-chain directions and supplied numeric evidence. Dataset tests cover all
80 files, initial locks, each completion/cascade, replay, numeric persistence,
strict subject/year awards and separation from earlier Science years. Component
tests render all 80 challenges in both themes and play retry, hint, full-run,
sorting and sentence-building flows. Browser evidence and review limits are
recorded in [the Year 4 tracker](science-curriculum/y4-science-tracker.md).

### Curriculum Mode — Year 3 Science (2026-10-03)

**Illustrated diagrams (2026-10-03):** Skeletons, Muscles and Movement, and
the three Rocks topics draw with third-party artwork vendored into
`src/assets/science/`. That means BodyParts3D bones rendered to WebP, Fluent
Emoji, the body-muscles path data and three Equinor sediment tiles. Every
file is pinned in `scripts/science-assets/sources.json` and listed in
`manifest.json`, with each source's licence beside it. A one-line credit sits
in each caption. `DIAGRAM_STYLE` in `src/data/scienceDiagrams.js` switches
back to the classic hand-built `*Figure` components, which also act as the
automatic fallback when an image fails to load. Tests cover the manifest,
the licence files, a size budget (≤120 KB per file, ≤1.5 MB in total) and the
label anchors. To re-fetch or re-render (outputs are committed, so builds
never touch the network; the render scripts drive the installed Google Chrome
through `playwright-core`), run the renders first, then `vendor.mjs`, which
rebuilds `manifest.json`:

```sh
node scripts/science-assets/render-bones.mjs   # bone images and anchors
node scripts/science-assets/render-trees.mjs   # tree image and anchors
node scripts/science-assets/vendor.mjs         # SVGs and licences; rebuilds manifest.json
```

**Plants diagrams (2026-10-04):** the five Plants topics follow the same
pattern. Real roots and a cut-open flower come from Bioicons (CC BY 4.0, by
Frédéric Bouché), and a flowering tree is grown once with ez-tree's generator
(`scripts/science-assets/render-trees.mjs`, which writes WebP and label
anchors). Blooms, pollinators, the seedling and the needs-guide pictures come
from Fluent Emoji. The stems, leaves and seed cases are drawn in the app, as
are the dispersal specimens (tuft, wing, burr, husk, pod, cut fruit). Geometry
and label anchors live in `src/data/plantArt.js` (tested); the drawing pieces
are in `PlantArt.jsx`. A dispersal picture shows features only, never the
method.

Science is registered for Year 3 with five source-ordered categories, 21 topics
and 84 challenge slots. **Parts of Flowering Plants**, **What Plants Need to Grow**, **Water Transport
in Plants**, **Pollination and Seed Formation** and **Seed Dispersal** each have all four challenges implemented (Plants 20/20). **Nutrition for Animals and Humans**, **Skeletons for Support and Protection** and **Muscles and Movement** add twelve challenges (Animals 12/12),
**Comparing and Grouping Rocks**, **How Fossils Form** and **What Soil Is Made From** add twelve challenges (Rocks 12/12), with all five **Light** topics adding twenty challenges (Light 20/20), bringing Science to 84/84. Forces and magnets has all five topics (20/20 challenges).
Topics were implemented in order, four slots together, with checks after each topic.
Interactive browser and owner review remain pending.

The first topic uses pure authored banks (16 observations / 16 diagram cases),
ChoiceGrid, a controlled DiagramLabelBoard and TileBuilder explanations.
PlantFigure draws local SVG with tested callouts; Science styles use shared theme
tokens. The optional grown-up activity appears on the final celebration and
completed topic map, using strict completion, without storage or reward changes.
Identifiers are locked in tests; the supplied source text is preserved with a
separate [topic mapping](curriculum/year-3-science.md).

The growth topic adds controlled FairTestBoard / ObservationSequence interactions,
15 authored tasks per short level and nine enquiry scenarios. C4 uses three rounds
with ungraded predictions, guarded setup, staged observations, two recorded heights
and a built conclusion. A pure revision/version state machine invalidates downstream
work on reset and rejects duplicate/stale transitions. No experiment data is stored.

Water Transport adds 15 tasks per short bank and nine process enquiries, with
rooted/cut-stem routes, before/after evidence, ordered routes and dye records.
Its supplied-setup state machine omits fair-test sorting. Only observed changes
support conclusions; cut stems have no roots attached. ObservationSequence now
accepts optional JSX content, with default growth rendering preserved.
WaterTransportFigure uses reviewed local SVG; an optional grown-up carnation
activity is available after strict completion.

Pollination adds 15 tasks per short bank and nine supplied-source enquiries,
covering insect/wind pollen transfer, seed formation and ordered life cycles.
FlowerLifeCycleFigure uses local labelled SVG and equivalent descriptions.
The reusable processEnquiry reducer / useProcessEnquiry hook guards transitions,
resets and unmount callbacks, with topic-specific evidence validation. An optional
flower-visitor observation activity never gates progress. Pollen is distinct from
seeds; a pollen-transfer observation alone does not prove new seeds formed.

Seed Dispersal adds fifteen tasks per short bank and nine comparison enquiries.
Choices, three-specimen sorting and built explanations connect visible features to
supplied movement evidence. Local SeedDispersalFigure SVG depicts seed/fruit structures;
examples are authored schematics, not species identifications. Guarded process enquiry
requires both records and a supported explanation. Optional grown-up observation
never gates progress. Tests verify the Plants category award only on its final slot,
replay/predecessor preservation and expansion into Animals.

Nutrition adds 18 source-supported facts, 15 diet-sort sets, 15 model-menu cases
and nine source-research enquiries. ScienceInformationCard shows adapted information
with visible attribution. Each C1 run covers food sources, types and amounts. C3 accepts
all combinations/orders meeting explicit group counts; these model counts are not real
portions or a complete day's diet. C4 uses guarded source reading, claim classification
and a supported report. Optional grown-up research never gates progress. Tests cover
all menu subsets and preserve completed Plants progress while releasing Animals.

Skeletons adds fifteen cases per bank, with five tasks in every slot: jobs, explicit
animal grouping, four structure labels plus a job match, and built explanations.
SkeletonFigure draws reviewed human/dog internal skeletons and crab/beetle outer
coverings; callout geometry is checked separately. Backbone and shell/exoskeleton
criteria are distinct. DiagramLabelBoard accepts a topic-specific accessible label,
with the Plant default retained. Optional grown-up picture research never gates progress.
Progress checks preserve Plants/Nutrition and require strict Skeletons topic completion.

Muscles adds fifteen cases per short bank and nine staged arm enquiries. C1 covers
muscle roles, C2 compares movement, C3 builds a linked three-clause explanation and
C4 uses three guarded investigations (bend, straighten, bend/return). MovementFigure
renders fixed-length bones turning at the elbow and opposing schematic muscle lengths,
with equivalent descriptions and adapted Nemours KidsHealth attribution. Predictions
are ungraded; observation, two claim records and the ordered explanation are required.
Optional picture research never gates progress. Tests preserve all earlier progress
and award the Animals category only on this final topic's fourth slot.

Comparing and Grouping Rocks adds six unnamed authored sample diagrams, eighteen
visible-feature tasks, fifteen sort sets, fifteen classification tables and nine
supplied-test investigations. New RockFigure SVG and controlled ClassificationTable
support appearance/property comparisons. C4 requires a fair plan, ungraded prediction,
all observation stages, both result records and a supported explanation; sample results
are distinct from rock-type claims. Optional picture observation never gates progress.
Tests preserve Plants/Animals and require strict first-Rocks topic completion without
awarding the unfinished Rocks category or Science year.

Light and Darkness adds 15 supported scene tasks, 15 comparisons, 15 built
explanations and nine controlled enquiries. Five non-luminous objects and three
sources support on/off comparisons with no other light entering. `LightSceneFigure`
uses accessible local SVG and complete text equivalents: dark observations omit
object shapes/emission marks while retaining object presence in captions. Lit/dark
fills use App.css tokens independently of app theme. C2 records three observations;
C3 builds First/Next/So explanations; C4 requires all stages and records before its
final three-tile explanation through the guarded enquiry hook. Every C1 run includes
lit and dark scenes. BBC Teach concepts verified 2026-10-03; no runtime network or
physical experiment required. Optional picture comparison requires strict completion.
Six topic tests plus availability/progress regression, four wrappers, 30 diagram
renders and 27 stage renders passed. No unfinished Light/Science award; earlier
progress preserved. Browser playthrough/both-theme visual checks remain pending.

What Soil Is Made From adds 20 identification tasks, 15 solid-material sorting cases,
15 four-component labelling cases and nine supplied-observation enquiries. Local
`SoilCompositionFigure` uses shared theme tokens, lettered SVG and equivalent notes.
Five authored sample records distinguish rock/mineral particles, decayed remains,
air and water, without inferring amounts or composition from colour. Every C1 run
covers all four components; C4 requires three observations, two evidence records and
one supported explanation through the guarded shared enquiry hook. British Society
of Soil Science concepts verified 2026-10-03; no runtime network or specimen handling.
Rocks awards only after Soil C4; Science stays unfinished. The optional picture activity
is read-only and requires all four slots. Six pure topic tests plus release/progress
regression, four wrapper renders, 15 diagrams and nine stage renders passed; browser
playthrough and both-theme checks remain pending. No persistence/unlock rule changed.

How Fossils Form adds five original illustrated accounts, fifteen tasks per short
bank and nine source-based enquiries. FossilFormationFigure shows cutaway burial,
evidence preservation and later exposure, with shell moulds, mineral-preserved bones
and leaf imprints. C2 checks claims; C3 orders four letter-linked pictures; C4 requires
all source cards, both evidence records and a supported explanation after an ungraded
prediction. Source attribution uses NHM/BGS; no real-time fossilisation or age questions.
Optional picture research never gates progress. Tests preserve earlier work, reject
incorrect orderings and require strict topic completion without unfinished Rocks awards.

Lint, tests (1,116 passes, one database-dependent skip) and production build
passed; Vite loaded all forty wrappers, initial React renders passed; all 27 water
observations matched their dye marks, and 27 growth screens preserved matching
drawn/table heights. The 27 pollination observation renders matched their
pollen/seed markers and accessible evidence descriptions. Four seed-dispersal wrappers
rendered through Vite; 42 specimen/observation renders matched their structural features
and escaped authored text. Nutrition’s four wrapper renders and 36 source-card renders
preserved attributed evidence; meal-table counts matched the requested total. Default
growth rendering remained intact after adding the optional research navigation label.
Skeletons’ four wrappers and 18 diagram renders passed geometry/structure checks;
the default Plant-label accessibility remained intact. Muscles’ four wrappers, three
SVG geometry renders and 72 comparison/observation renders passed.
Rocks’ four wrappers, six specimen diagrams, fifteen classification tables and nine
result-table renders passed, including text escaping and the initial fair-plan gate.
Fossils’ four wrappers, twenty cutaway diagrams and 36 source-card stage renders
passed, including readable ordering labels and escaped captions.

Reflected Light uses six supplied surfaces, 18 facts, 15 distinct comparisons,
18 lettered source/surface/eye diagrams and nine guarded enquiries. Clear image
and reflected light are explicitly distinguished; all supplied surfaces reflect.
Optica/BBC Teach concepts were verified on 2026-10-03; no numerical optics assessed.
Protecting Our Eyes from Sunlight has 15 authored situations per level and five
tasks/run, with supported information, action sorting, message tiles and applied
advice/explanation. NEI sources verified 2026-10-03; no practical sun-viewing test.

How Shadows Form has 15 tasks per short bank and nine guarded enquiries, separating
blocker removal/replacement from lamp off/on. An unlit screen is distinguished from
a cast shadow. Changing Shadow Size has 15 tasks per short bank and nine enquiries,
with fixed-screen source/object comparisons, keypad/table records and five-factor
fair setup before observation in C4. ShadowFigure and ShadowExplorer share a pure
point-source geometry model, with invalid-input fallback and whole-cm displayed/
assessed measurements. `shadowEnquiry.js` / `useShadowEnquiry.js` extend the existing
process stages with a frozen fair setup and reset/stale-callback guards. Neither
model nor enquiry state is persisted. All controls reuse theme tokens and native
keyboard/tap interactions. Optional strict-completion picture activities accompany
reflection and shadows. Interactive phone/both-theme and saved-progress checks are
pending; automated suite passed (1,149 passed, one database-dependent skip).

Interactive browser checks, both-theme visual checks and owner review remain
pending because browser controls are unavailable in this session.
All 20 Light wrappers and 347 distinct reflection/shadow observation renders passed
Vite SSR checks, including actual availability, model measurements and escaped captions.
The [Science tracker](science-curriculum/y3-science-tracker.md) records evidence,
review findings and the exact resume point. Next: complete Science browser and owner review. The owner authorised completing the entire Light category in
one batch on 2026-10-03.

### Forces and magnets implementation (2026-10-03)

5/5 topics, 20/20 challenges; Year 3 Science now 84/84. The owner
authorised sequential topic implementation; each topic passed lint, full tests,
production build and initial Vite renders before proceeding. Browser review pending.

**Movement on Different Surfaces:** 15 supplied surface comparisons per short bank and nine enquiries. C1 chooses the further run, C2 sorts measured travel evidence, C3 requires a complete fair plan before keypad/table records, and C4 uses prediction/fair setup/staged stops/records/bounded explanation. Same toy, ramp release, level track and cm measuring method within a comparison. APS friction concepts verified; supplied distances are original examples, not universal predictions.

**Contact and Magnetic Forces:** 15 supported contact/magnetic cases, 15 three-observation sorts, 15 lettered diagrams and nine controlled enquiries. Contact pushes/pulls require touching; supplied magnetic interactions retain a visible gap while a force acts. Before-force observations are distinct from contact/non-contact force evidence. IOP concepts verified; no claim that every non-contact force is magnetic.

**Magnetic Materials:** 15 supported material tests, 15 three-sample classifications, 15 fair-test/result-table tasks and nine enquiries. Named iron/ordinary steel samples are attracted; aluminium/copper and selected non-metals show no noticeable attraction in these supplied classroom tests. Records rely on supplied evidence, not appearance; not all metals are magnetic. Magnet, gap, sample size and testing method are fixed within comparisons.

**Magnets and Their Poles:** 16 supported pole facts, 15 supplied facing-pole comparisons, 15 label-and-record tasks and nine turning/repeating observation enquiries. Bar magnets have both N and S poles; all four facing pairs have supplied outcomes. Same poles repel; different poles attract. N/S identity is labelled, never inferred from colour. IOP concepts verified; numerical strength/field calculations excluded.

**Predicting Attraction and Repulsion:** 16 rule-supported predictions, 15 multi-pair records, 15 target-arrangement construction tasks and nine model enquiries. Native controls turn either magnet; equivalent successful arrangements are accepted. A pure two-pole model computes attraction/repulsion and drawings. Predictions ungraded in C4; run/turn observations precede records and a bounded explanation. Reset clears evidence and rejects stale callbacks; no timers or continuous physics.

### Final Science code review (2026-10-03)

Reviewed the dirty Year 3 Science implementation and shared integration; no
confirmed exploitable security vulnerability found. Dependency audit: zero known
vulnerabilities. Fixed sparse ordering validation in five topics, malformed surface
samples, non-decimal growth records, unused pole enquiry text and array-shaped
magnet construction answers. Five initial regression groups passed after reproducing
the failures. A follow-up fixed a rock enquiry reset race by putting fair-plan
approval and evidence in one guarded reducer, with three more regression groups.
Full checks: lint/build passed, 1,183 tests passed, one database-dependent skip. No progress/auth/storage/reward/unlock contract changes.

`node scripts/checkScienceChallenges.js` checks actual availability and all 84
original initial renders, then 6,960 sampled cases using reducer-prepared enquiry
states, hints and locked controls. It writes diagnostic HTML to a temporary
directory without accessing learner data. Browser interaction, layouts and real
saved-progress playthroughs remain pending. Details and limits: [final bug/security
review](science-curriculum/BUG_SECURITY_REVIEW.md).

### Privacy groundwork for #11 (2026-10-10)
Low-risk changes made while the qualified review (#11) is pending; the brief for
that review is [safeguarding/REVIEW_BRIEF.md](safeguarding/REVIEW_BRIEF.md).
- **Fonts self-hosted.** ABeeZee comes from `@fontsource/abeezee`, imported in
  `src/main.jsx`; `index.html` no longer calls Google Fonts.
- **No personal data in server logs.** Unexpected errors are logged through
  `errorSummary` (`server/logError.js`): name, code and stack frames, never the
  message (a Mongo duplicate-key message can contain an email).
- **Whole-account deletion.** `DELETE /api/auth/account` with `{ password }`
  removes the account, every child profile, their progress and rewards, and any
  pending sign-up for the email; the parent document goes last so a part-way
  failure can be retried. A wrong password is `403 WRONG_PASSWORD`; attempts are
  throttled per account. Both store drivers implement `deleteAccount`, exposed
  as `deleteAccount(password)` on the auth context and offered in `/parent` →
  Account behind a two-step password confirmation.
- **Placeholder privacy page** at `/privacy`, linked from the sign-up account
  step (new tab) and `/parent`. It states that it is not the reviewed notice.
- **MongoDB Atlas** runs on AWS Ireland (eu-west-1), a 3-node replica set.
  **Atlas backups are inactive.**

### Privacy review brief refresh (2026-10-15)

`docs/safeguarding/REVIEW_BRIEF.md` now reflects Years 1–4 across all five
subjects and the public curriculum overviews. Source checks corrected the
age-band validation description, distinguished API and local browser storage,
and expanded the data inventory to include first-play/daily-puzzle records,
recovery metadata and aggregate email-send budgets. The reviewer is asked to
establish lawful bases by purpose before prescribing consent, and to review
supplier contracts, subprocessors and international transfers. Live supplier
settings, backup status and agreements were not inspected; the brief marks them
for confirmation. This is preparation for the qualified review, not its outcome.

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

### Badges, XP & streaks (badges 2026-09-19; XP, streaks and news 2026-09-30)

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

**The 2026-09-30 spec supersedes the old "streaks deliberately out of scope"
stance.** Streaks, XP, levels and "something new" shipped on 2026-09-30.
The day stamps streaks were waiting for live in the **rewards document**, not
progress, which is untouched.

**The rewards shape** (`data`; `rewardsShape.js`, `REWARDS_SCHEMA_VERSION = 3`
since 2026-10-10; the v3 fields are below the table).
The stored envelope's own `schemaVersion` stays 1; the shape version is
`data.schemaVersion`.

| Field | Meaning |
|---|---|
| `schemaVersion` | 2 |
| `badges`, `counts` | Unchanged from v1 |
| `xp` | Total earned, integer |
| `xpBackfilled` | The one-off back-fill has been stored |
| `streak` | `{ current, best, lastDay, freezes (0-2), recent, frozen }`. `current` counts days played (a frozen day bridges the gap, adds nothing). `recent` and `frozen` are the last 14 days, for the Mon-Sun dots only |
| `news` | `{ badges: [ids], stickers: ["year/subject/topicId"] }`, earned but not yet looked at |
| `recentStickers` | `"year/subject/topicId"`, newest last, at most 5 |
| `practice` | `{ day, count }`: replays that earned XP on `day`; resets on a new day |
| `intro` (v3) | `{ done, doneAt }`: Bix's first-play intro finished or skipped, per child |
| `tips` (v3) | Ids of first-visit coach marks already shown (`"map"`, `"trophies"`) |
| `puzzles` (v3) | `{ days, total }`: Daily Bix puzzle days solved (last 60) and stars ever won |

**Migration happens on read and loses nothing.** `normaliseRewards` fills
missing fields with defaults, never removes or rewrites an existing one
(unknown fields survive) and never throws. A v1 or v2 document reads as v3 in
memory and is written as v3 only on its next real save. `shared/mergeRewards.js`
merges the v3 fields conservatively: a done intro stays done (earliest
`doneAt`), tips and puzzle days union, the puzzle total never regresses. `earnBadges` no longer sets
`schemaVersion`; `normaliseRewards` owns it.

**Phase 0 rule: a failed read is never followed by a write.** Only a rewards
document that genuinely does not exist (`null`) counts as "no rewards yet". If
the read throws, `RewardsProvider` stays `failed`, `award` and `clearNews` write
nothing, and `award` asks for a re-read. (Before this, a failed read let the
next finished challenge overwrite the saved document.) Re-reads also come from
`refresh()` (alias `retry()`), called as each challenge page opens, once when
the Trophy Room opens, on window focus and when the tab becomes visible, and by
the Trophy Room's "Try again" button, which replaces its loader after a failure
("We couldn't open your trophies just now").

**A run finished before the read lands is queued, not dropped.** `award`
returns null (that celebration shows no XP or badges) and the run is awarded
the moment the document is in, in the same save; its badges then show as NEW
in the Trophy Room. The queue lives in memory: closing the tab while the read
is still failing loses it.

**`refresh()` keeps a long-open tab current.** On a good read it re-reads in
the background and swaps in the stored document — only if nothing was saved
while the read was in flight and it is the newest read — so a tablet left open
all day builds on what the same child earned elsewhere since. It never reads
over unsaved memory: while a save is in flight it does nothing, and after a
failed save it sends the in-memory document again instead.

**Saves go one at a time per child.** Each newer snapshot waits for the one
in flight through `rewardsPersistence.js`, so replies cannot leave an older
document on the server. Failed snapshots remain available across profile
switches until a retry is acknowledged. Another child has an independent queue. A save that changes nothing (a
practice replay past the day's cap, on a day already counted) is skipped.

**`RewardsProvider` is the single writer.** `src/context/RewardsContext.jsx`,
mounted in `src/main.jsx` inside `AuthProvider`, holds one in-memory rewards
document for the active child, shared by the challenge page, navbar, home page
and Trophy Room. `useRewards()` is a thin reader of it. It keeps `useProgress`'s
`loadedKeyRef` guard (never write one child's rewards into another's document)
and a `latestRef` so two writes in a row never build on a stale copy. It writes
at exactly two moments:

1. **`award(...)`, a challenge finished.** `ProblemView` calls it once per run
   (guarded by a ref keyed to the run). One save covers badges, XP (plus any
   pending back-fill), streak, news and recent stickers, via the pure
   `awardRun`. `ChallengeShell` calls `onComplete({ combos })` and every
   challenge passes it straight through, so combos reach the award.
2. **`clearNews()`, the child opens their own Trophy Room.** One save, skipped
   when there is no news. The room shows NEW ribbons from what was new at the
   start of the visit, so they do not vanish while the child looks.

The grown-up room (`/parent/trophies/:childId`) and `/parent` read from the
store, normalised, and never write. Both show the **displayed** XP — stored XP
plus the back-fill worked out from that child's progress while `xpBackfilled`
is still false — so on day one a parent sees the same level the child does
rather than "Level 1 · 0 XP". The Trophy Room's stats line shows total XP.

**Back-fill.** While `xpBackfilled` is false the provider reads the progress
documents once (`loadResumeCandidates`, read-only) into an in-memory
`pendingBackfill`: 10 XP per completed, built challenge in any year. Displayed
XP is `xp + pendingBackfill` straight away; the next `award` stores it and sets
`xpBackfilled`. The provider stays `loading` until that read is done, so a
queued run is awarded against it (minus 10 per queued first completion, which
the back-fill already counts). If that read fails it waits for the next visit,
and meanwhile a first completion's base 10 XP is shown but not stored — the
back-fill will count that completion from progress — so nothing is paid twice.
Streaks start fresh.

**The numbers** (`xp.js`, `streak.js`):

- First completion of a challenge +10; practice replay +5 for the first 2
  replays each local day only; each "3 in a row" combo +2 (practice included).
- Levels: L2 at 100 XP, and each gap is 50 bigger than the last (L3 250,
  L4 450, L5 700, L6 1,000, L7 1,350).
- A streak day is the device's local `YYYY-MM-DD`; any finished challenge,
  practice included, counts. Played yesterday: +1. Missed days with enough
  freezes held: one freeze spent per missed day, +1. Missed more than freezes
  held: `current` resets to 1 and freezes are kept. A last day one day ahead
  (another device in an earlier time zone) counts as today. A last day further
  ahead means the clock was once set forward: the streak is pulled back to
  today and later days are dropped, rather than locked until the calendar
  catches up.
- **Freezes:** earned each time `current` reaches a multiple of 5, holding at
  most 2, spent automatically. `best` is the highest `current` reached.
- Display never writes: a streak reads alive while the missed days before today
  are within the freezes held ("play today to keep it"), otherwise 0.

**"Something new"** (`news.js`). Badges and stickers are **added to `news` when
earned** and **cleared when the child opens their own Trophy Room**, so
anything owned before this shipped is never new and nothing needs every
progress document. It drives the navbar 🏆 dot, the NEW ribbons in the Trophy
Room and the home "Something new!" card.

**Where it shows.** Navbar: above 480px `🔥 N` and `Lv N` chips beside the
name; at 480px and below a small `🔥N` badge on the avatar chip (`right: -4px`;
-6px pushed the bar 1px wider than 360px) and no level chip. Streak and level
are announced to screen readers through the avatar chip link's accessible name
(a visually-hidden span, e.g. "Demi, 2-day streak, level 3"). Home
(`HomeAchievements.jsx`, only while a child is playing): a something-new card,
a streak and level card (`WeekDots`, `LevelBar`) and a collection summary. The
Trophy Room and `/parent` show streak, best, level and XP.
`npm run seed` builds v2 documents with a demo streak.

**Concurrent rewards saves (2026-10-09):** server compare-and-swap merging
preserves all earned badges, maximum milestone/practice counts and streak best,
and the latest played-day streak state. News uses a three-way baseline: clearing
seen items preserves concurrent arrivals; a stale award cannot resurrect items
cleared elsewhere. Established XP uses the submitted delta, with a stable write
ID preventing repeat payouts across a lost acknowledgement (last 128 writes
remembered). Old clients and overlapping first backfills use maximum XP to avoid
counting old learning twice. Milestone counts and overlapping first backfills
can undercount simultaneous distinct runs; exact attempt accounting remains
future work. Two devices can also both reward the same apparent first completion
or spend their own daily practice allowance; no per-attempt ledger exists.
Local saves use the same merge inside a collection Web Lock where supported;
browsers without Web Locks have a synchronous best-effort fallback. Remote
rewards appear on the existing refresh/reload path. Failed/queued snapshots
remain session-only, so closing before acknowledgement can lose unsaved work.

Unlocked avatars can be redeemed in two places: `/parent` (every profile's
picture picker — `ProfileBuilder` only ever creates) and, since 2026-09-29, the
"Make it my picture" button on the celebration's unlock step, for the child who
just won it. Both call `updateChild`. Locked pictures are still shown,
padlocked: a reward nobody knows about motivates nobody.

### First play: Bix's intro, coach marks, daily puzzle & brain breaks (2026-10-10)

Four features from three backlog ideas (#35 with its coach marks, #34, #30), all in the **rewards
document or on the device** — progress is untouched.

**Bix's intro (`/hello`, `src/pages/intro/BixIntro.jsx`).** A six-step playable
hello: greeting by name, tap Bix, put the star in the basket (`StarBasket`:
drag, tap-then-tap, or arrow keys + Enter), the controls a challenge really has
(read-aloud is named as English and Science only, until Maths gets it under #8),
a can't-get-it-wrong favourite pick that awards the **Met Bix** badge, then on
to the page the child was heading for. Skip is on every step. Every line is on
screen and is also spoken when sound is on.
- **Who is sent there:** `RequireChild` redirects to `/hello` only when
  `introEligible` holds — no XP, no badges, no streak day, a back-fill KNOWN to
  be empty (an unknown one, after a failed progress read, counts as old work),
  intro not done — and only for grown-up accounts' children, never learner
  accounts. It waits for each child's FIRST rewards read of the session only; a
  failed read lets the child through, and later re-reads (retries, refreshes)
  never blank the page. Blanking on every re-read unmounted the page that asked
  for it, which asked again on remount, in a loop.
- **The flag** is `intro.done` in the rewards document (never progress).
  Skipping sets it with no badge; finishing a replay later still awards the
  badge once. A grown-up replays it from `/parent` → "Play Bix's hello game
  with …", which selects that child first so the badge is theirs.
- **Met Bix** has `level: "intro"`, which no completion milestone produces, so
  `earnBadges` can never award it; only `intro.finishIntro` does. The warm-up
  says "New badge" only when `finishIntro` really stored one: a replay says
  "You already have the Met Bix badge!", and a refused save claims nothing.

**Coach marks (`components/coach/CoachMark.jsx`).** One-time tips on the quest
map (`CurriculumPage`) and the child's own Trophy Room. A tip is recorded in
`tips` the moment it appears and stays until "Got it" or the child moves on.
Nothing shows before a good rewards read.

**Daily Bix puzzle (`/daily-puzzle`, `data/dailyPuzzle.js`).** One puzzle per
local day from a generator seeded by the date, so every device agrees without a
backend. Four kinds rotate by day (what comes next, odd one out, riddle, missing
number); tests check two years of dates for exactly one correct option, distinct
options and no negatives, and that odd-one-out never mixes overlapping groups.
Ungated; a signed-in child earns **one puzzle star per day** (fixed, never
random), stored in `puzzles`. There is deliberately no puzzle streak. Linked from
a card in `HomeAchievements`. If the star cannot be stored (the rewards read is
still loading or failed), the page says so rather than claiming the child
already has it. The generator uses the shared helpers in `data/freePlay/random.js`.

**Brain breaks (`components/brainBreak/`, `data/brainBreaks.js`).** Mounted once
in `RootLayout`. Counts **active play** in 5-second ticks — tab visible and a tap
or key press in the last minute — on play routes only (`countsTowardsBreak`
excludes `/parent`, sign-in, sign-up, `/profiles`, `/privacy`, `/credits`,
`/hello`). At the interval a small card offers "Let's move!" or "Not now"; it
never covers the question. The break is a modal (shared `useModalDialog`) with
one of ten activities, "Another one!", "I did it!" and "Back to playing";
Escape leaves. `useModalDialog` keeps a stack, so a break that opens over a
certificate or the Speed Reader is the only dialog that answers Escape and Tab. Both "Not now" and finishing restart the count. The interval
(10/15/20/30 min or off, default 15) is a **device** setting in
`localStorage` `dl.brainBreak`, set in `/parent` → Brain breaks, beside Sound.

**A profile switch can't borrow the previous child's rewards.**
`RewardsProvider` now records which child its state was read for and reports
`loading` (not `ready`) for the one render after a switch, before its load
effect resets. Without it the intro redirect could judge a new child by the old
child's document. Covered in `tests/components/rewards.test.jsx`.

### Maths read-aloud (#8, 2026-10-10)

Every Maths curriculum challenge shows **"Read it to me"** beside the question
counter, with no change to the ~330 challenge files:
- `ProblemView` provides `ChallengeContext` (`{ year, subject }`);
  `ChallengeShell` shows the button when `subject === "math"` (or when its
  `readAloud` prop forces it). English and Science keep their own SpeakButtons.
- At the tap, `readAloud.js` walks the rendered question: visible text in screen
  order (side-by-side cells join with commas), then the answer options gathered
  as "Is it 18, 20 or 16?". It never reads pictures (`svg`, `img`,
  `role="img"` — their labels are often the answer), controls, form fields,
  hidden content, or visual aids listed in `SKIP` (scales, clocks, place-value
  blocks, charts). `data-read-aloud="skip"` opts any element out; a challenge
  whose screen cannot be read this way passes `speak={(question) => string}`.
- `data/mathSpeech.js` turns symbols into words: operators, a blank as "what"
  in a sum or "blank" in a list, money, fractions, unit symbols after a number,
  `4s` as "fours", arrows, emoji names. It leaves clock times and hyphenated
  words alone. Unit-tested in `mathSpeech.test.js`; the walker and the
  Maths-only button in `tests/components/readAloud.test.jsx`.
- Never automatic; follows the app-wide mute like every SpeakButton; renders
  nothing without a speech voice. `SpeakButton` gained `getText` + `resetKey`
  (work the words out at the tap) and `className`.
- Spot-checked 48 of 332 challenges in the browser: readings are accurate. Some
  drag-and-build interactions read their tiles as a list after the statement,
  which is faithful to the screen but noisy (#8, remaining).

### Bix's jokes & silly secrets (#23, 2026-10-10)

- **Jokes** (`data/bixJokes.js`): 42 maths, science and word jokes, checked by
  tests for length, a question-then-answer shape, British spelling and unique
  ids. `nextJoke` never repeats one until all have been told; the told list is
  per tab (`sessionStorage` `dl.bixJokesTold`), never learner data.
- **Where:** the homepage Bix (`<Mascot jokes />`) has a "Tell me a joke"
  button and a long press on Bix; the celebration's final step for a topic or
  anything bigger shows `BixJokeCard`. Child-paced: setup, then the punchline
  only when the child taps "Tell me!" — no timers. One action button whose
  words change, so keyboard focus stays put; Escape closes the bubble.
- **Secrets:** five quick taps on any non-decorative Bix make him sneeze, then
  wobble, then change hat, in that order. The hat lives in module memory only
  (gone on reload). Each shows a line of text and is announced in a live
  region; movement stops under reduced motion, the text and hat still show.
- Spoken only while the app's sound is on; the words on screen carry it muted.

### Certificates (#22, 2026-10-10)

Every topic, quest (category), subject and year has a certificate with the
child's name, picture and colour, the date, a kid-friendly "I can…" line and
Bix's signature (`components/certificate/`).
- **Derived, never stored**, like stickers: `data/certificates.js` uses the
  same milestone functions as the celebration (`fullTopicComplete`,
  `fullCategoryComplete`, `fullSubjectComplete`, `allSubjectsComplete`), so a
  certificate cannot disagree with the moment it celebrates. With no "earned
  on" date, a reprint is dated the day it is printed and says so.
- **"I can…" lines** (`data/certificateSkills.js`): one per topic, keyed
  `year/subject/topicId`, written inside each topic's row in `docs/curriculum/`.
  Tests require a line for every registered topic, no orphans, at most 80
  characters, "I can/I know" and British spelling; a new topic without one gets
  a templated line. Quest, subject and year lines say what it took instead of
  repeating the achievement.
- **Where:** the celebration adds ONE certificate step for the biggest thing
  finished (year, else subject, else quest); a topic's opens from "See my
  certificate" on its sticker step, keeping a topic's sequence short. In the
  Trophy Room, every collected sticker, "Quest certificate" and the
  subject/year buttons open a certificate in a dialog to reprint.
- **Printing** renders a print-only copy into `<body>` and the print
  stylesheet shows only that, so "Print or save" gives one A4 / Letter page from
  any screen. Render at most one printable certificate at a time.
- The dialog is `ui/Dialog.jsx` (portal, backdrop, close button) on the shared
  `useModalDialog`.

### Questions as data (#6, 2026-10-10)

A challenge can be authored as data instead of JSX: its pure builder returns
`{ kind, ...fields }` questions and `components/challenge/data/DataChallenge.jsx`
renders them inside `ChallengeShell` with the shared kit.
- `data/challenges/questionKinds.js` holds every rule that is not React, per
  kind: the starting response, when Check is ready, whether a response is
  right, the sentence-blank text, and `validate` (what would make a question
  unfair). `validateQuestion` adds the shared checks (something tells the
  learner what to do, one `___`, balanced `**`, no Year 2 negatives, British
  spelling); `lintBuild` runs a builder over every level and 50 seeds.
- Kinds: choice, number, type, build, sort, order, pick, sequence, chart (bar,
  pictogram, tally), clock (read / set), coins (count / make), fraction (read /
  shade), placeValue (read / build). The field table is in the
  `building-curriculum-topics` skill.
- Generalises `EnglishPracticeGame` (choice / sort / build / type), which is
  unchanged for now. Year 1 Maths, Years 1–2 English and Years 1, 2 and 4 Science are
  built on `DataChallenge`. `renderVisual(question)` adds a read-only diagram;
  `readAloud` forces the "Read it to me" button on (Year 1 Science) or off.
- Tested in `questionKinds.test.js` (a sound sample per kind, right and wrong
  answers, the unfair cases) and `tests/components/dataChallenge.test.jsx`
  (each interactive kind answered through the real kit).

### Older Skills games: read-aloud and celebrations (2026-10-15)

The 20 older Skills catalogue entries now use the shared speech/feedback tools
where applicable. The 16 answer games use `useAnswerFeedback` and
`AnswerFeedbackLine`: Arithmetic Practice, Missing Number, Number Bonds,
Fraction Fun, Word Builder, Word Sorter, Sentence Builder, Opposite Match,
Synonym Safari, Sight Word Pop, Speed Reader's comprehension questions, Shape
Explorer, World Map, Flag Finder, City Spotlight and Find the City. Their
existing question loops and score rules remain; correct answers, retries,
combos and milestones use the same sound/mute and reduced-motion behaviour as
the newer free-play games. Generic duplicate feedback was removed while useful
answer explanations and round-completion messages remain.

Clock Generator, Multiplication Grid and Reading Numbers offer speech for their
current result; Solar System retains its existing narration. Speed Reader also
has an optional story read-aloud before starting. Word-game speech reads visible
words/options and does not reveal hidden memory cards. Number Bonds and Synonym
Safari cards are native buttons, and multiplication cells support touch/keyboard
selection. Submission guards prevent repeated scoring; mode/run changes clear
feedback appropriately. Synonym Safari's grid now fits narrow screens. Shared
feedback no longer uses the legacy global `.feedback` class.

Skills remain ungated and untracked: this work adds no stored XP, badges,
curriculum completions or attempt history. Real-device speech quality and the
broader whole-app accessibility review remain open (#8/#7/#38).

Validation: `npm run lint`, `npm test` (2,099 unit/API passes, four
existing database-dependent skips, 414 component passes), `npm run build` and
`npm run check:seo` pass. SEO checks cover 48 public URLs. Local Chrome loaded
all Skills routes; targeted desktop-light/phone-dark interactions covered
Number Bonds retry/mode reset, Fraction Fun, arithmetic/restart and number/grid
speech controls. Further checks covered World Map keyboard answers/reset,
Flag Finder feedback with a fixture API and Synonym Safari's phone layout.
Screenshots were reviewed. Live Flag Finder API availability and physical-device
voice quality were not established. The existing large-chunk build warning
remains.

### Free-play Skills games on the challenge kit (#5, 2026-10-10)

Five ungated Skills Mode games reuse the curriculum kit: **Money Match**
(`/money`, CoinTray), **Measure It** (`/measure`, ScaleReader / MeasureDrag),
**Robot Moves** (`/robot-moves`, RobotGrid / PositionBoard), **Chart
Detective** (`/charts`, tally / pictogram / bar) and **Place Value Blocks**
(`/place-value`). Registered in `main.jsx` and `SkillsPage.jsx` as usual.
- `components/skills/FreePlayShell.jsx` is the loop: endless questions from a
  pure `makeQuestion(rng, level)`, Easier / Medium / Harder (a level change
  starts a fresh game), the same question never twice running, a submission
  gate against double taps, focus moved to the new prompt, and a 🔊 button.
  No onComplete, no progress, nothing stored.
- `useAnswerFeedback` + `AnswerFeedbackLine` bring the curriculum's
  per-answer celebration to Skills Mode: a rotating line, sparkle and sound for
  right, 🔥 combo every three right first time, a 🌟 milestone every five, a
  kind retry line and wobble for a miss. Mute and reduced motion are honoured
  where they live. The older answer games adopted these exports on 2026-10-15.
- Generators in `data/freePlay/` are pure and tested (unique chart values so
  most/least never tie, bounded retries, UK coins only, no scale below zero —
  negative numbers are Year 4); the shell in `tests/components/freePlay.test.jsx`.
- The miss wobble is one shared function, `components/challenge/wobble.js`,
  used by both `ChallengeShell` and `useAnswerFeedback`, so Curriculum and
  Skills Mode feel the same.

### Topic stickers & the Trophy Room (2026-09-29)

**Stickers are derived, never stored.** `stickers.js` marks a topic's sticker
earned exactly when `fullTopicComplete` (exported from `completionMilestones`)
says so — the same strict rule as the topic milestone — straight from the
existing progress document. No new write path, no backfill; the price is no
"earned on" date. Each topic's emoji is the `icon` field in the curriculum
datasets; `curriculumIds.test.js` locks every category and topic id so adding
display fields can never move a progress key.

Badges gained a display-only `hint` ("Finish 5 topics") and `badgeProgress`
("2 of 5"), which reads the existing `counts` tally. Note the tally only moves
on real completions, so progress injected straight into storage shows a low
count — expected.

`/trophies` (behind `RequireChild`, 🏆 in the navbar) shows badges, a sticker
book per year grouped by quest, and a "Next up" card from `pickResume` with Bix
beside it. **It only ever shows the child who is playing** — a child never sees
a sibling's room. A grown-up sees every child's from `/parent` ("See {name}'s
Trophy Room" under each child), which opens `/parent/trophies/:childId`: the
same cabinet, read-only, with no Play button and no Bix. That route sits
outside `RequireChild` (a parent often has no child selected) and redirects
anything that is not a child of the signed-in account. `/parent` itself has no
grown-up gate, by decision (2026-09-29). Reads go through `useTrophyData`,
which never writes.

Earned stickers also replace the stop number on their topic in the Curriculum
Mode map (`CurriculumPage`), using the same `topicSticker` rule, so the map,
the celebration and the Trophy Room always agree.

### Curriculum-first home page (2026-10-11)

`/` leads with the existing curriculum start/resume action, followed by a
coral Curriculum adventure section explaining the year/subject choice,
challenge unlocks and saved progress. Maths, English and Science are shown as
curriculum subjects; the old Skills subject launchpad and equal-weight mode
cards are replaced. Signed-in children starting out also see the hero's
journey introduction.

Curriculum uses the shared school-backpack icon (`CURRICULUM_ICON` in
`curriculumRegistry.js`) in the navbar, homepage section label and curriculum
links, including the 404 page. Keep these references shared so they agree.

The sage Skills practice section highlights Solar System, Speed Reader,
Arithmetic Practice and Number Bonds with direct game links, plus a link to
all Skills games. Child achievements sit between curriculum and practice in
a honey section. The rose hero, warm curriculum, honey achievements and sage
practice use paired `--light-home-*` / `--dark-home-*` tokens in `App.css`.
Layouts stack on phones, links have large touch targets, and decorative motion
respects reduced-motion preferences. Existing resume, account gates, storage
and unlock rules are unchanged.

On mobile (up to 700px), each journey card places its step number, icon and
heading in one aligned grid row, with the description below at full width
(2026-10-12). Headings can wrap within their column on narrow phones.
“Pick your adventure” uses a compass icon; the backpack is reserved for
Curriculum Mode.

The shared hub footer includes an About group linking to `/privacy` and
`/credits` (2026-10-12), alongside Learn and Account.

The colour refinement keeps reading surfaces white in light mode and warm
charcoal in dark mode, with gentle section tints. Coral, sage, lavender and
honey are concentrated in section labels, skill-card borders and icon tiles.
Curriculum buttons use the original deep coral / teal pair, with a distinct
control border in dark mode. Headings and game links use darker matching inks;
secondary text is stronger. The decorative glyphs and card shadows are subdued.

The curriculum introduction explicitly connects finished curriculum challenges
with saved progress and unlocks. A visible "Play for practice" note above the
featured games explains that Skill games do not count towards curriculum
progress. The Skills hub repeats this explanation and links back to the
curriculum, including for visitors who enter directly through navigation.

Browser checks covered both themes at 1280, 768, 375 and 320px, for visitors,
new child profiles and a child with saved progress. The home sections fit at
all four widths. The existing shared navbar overflows by 13px for a signed-in
child at 320px; its fixed row of touch targets needs a separate compact
navigation treatment.

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

Carried over from the original notes file and code review. Verified against source
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
4. ~~**No component-test framework**~~ **Implemented 2026-10-09.** Vitest,
   jsdom and React Testing Library cover progress/rewards hydration, profile
   switching, retry guards, challenge load failures, signup navigation/code
   entry/hand-over and recovery. `npm test` runs Node suites then component
   suites; targeted scripts are `test:unit` and `test:components`.
5. ~~**No progress migration hook**~~ **Implemented 2026-10-09.** Version-aware,
   read-time migrations and lossless ID-copy helpers exist in the store/API
   path. No real curriculum IDs changed and the current schema stays v1.
   Every future rename still needs its own numbered migration and fixture.
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
8. **Production account-protection rollout pending** (2026-10-09). Read-only
   audit of `dynamic_learning` confirmed nonunique parent email/progress indexes,
   no rewards child index, and zero duplicate groups. New boot setup converts or
   creates uniqueness safely. Source changes have not been deployed and live
   indexes have not been modified. Set `PUBLIC_APP_URL` before deploying, rerun
   `audit:accounts` against the intended database, then verify unique indexes and
   actual password-reset delivery. Local `.env` targets `dynamic_learning_dev`,
   which was empty at audit time; do not mistake it for production.
9. ~~**API-store coverage is partial**~~ **Expanded 2026-10-09.** Fetch-mocked
   coverage now includes signup, login/session, child CRUD, reset endpoints,
   invalid acknowledgements, retry details, stable reward-write identities and
   unsupported progress versions. Malformed successes throw instead of becoming
   empty accounts/profile lists.
10. **No whole-app accessibility pass** (checked 2026-10-09) — some kit
   interactions use native buttons or drag-library keyboard support, and
   English/Science plus Solar System have read-aloud support. End-to-end
   keyboard/screen-reader and both-theme contrast review remains open; Maths
   and the remaining Skills games still need read-aloud coverage.
11. **Back-fill can under-pay in one edge case** (2026-09-30). If a first
   completion's progress save fails but its rewards save succeeds before the
   back-fill lands, that challenge's 10 XP is never counted. The safe
   direction; accepted.
12. **Rewards concurrency limits** (2026-10-09): merges prevent earned-state
   loss; exact cross-device attempt counting and deduplication remain unavailable.
   See §5, “Concurrent rewards saves”, for the conservative conflict policy.
13. **localStorage mode: a corrupt collection reads as empty and the next save
   replaces it** (2026-09-30 note). Existing behaviour for every collection
   (`dl.parents`, `dl.children`, `dl.progress`, `dl.rewards`), unchanged.
14. **Fraction Fun accepts any N segments** (2026-08-21 audit, needs a
   decision). `FractionFun.jsx` checks only how many segments are shaded, not
   which, so scattered shading passes "Shade 3/8 of the bar". This is a
   teaching call: for *fractions of a set* the check is already right and only
   the prompt wording changes; for a *bar model* (the usual Year 2 picture) the
   shading must run contiguously from one end and the check must require it.
15. **Global CSS collisions, partly fixed** (2026-08-21 audit). `.wrapper`,
   `.score`, `.prompt`, `.optionBtn` and `.startBtn` are still global in
   `MathPractice.css`, `FindTheMissingNumber.css`, `WordBuilder.css` and
   `SightWordPop.css`, and `FindTheMissingNumber.css` and `MathPractice.css`
   each have a bare `select {}`. CitySpotlight, Counting Challenge 1 and the
   challenge kit are already scoped. Scope one file at a time with a visual
   check (see §9, "CSS is global").
16. **Small leftovers kept deliberately** (2026-08-21 audit). `SynonymSafari.jsx`
   uses an unnamespaced `'difficulty'` localStorage key (no live collision) and
   a one-directional match test (works because both directions are always
   emitted); `.skills-grid` has an unreachable `max-width: 1400px` inside a
   1200px parent.
17. **Domain, email verification and a dev deployment are live**
   (domain set up 2026-10-09; spec
   `docs/superpowers/specs/2026-10-07-signup-onboarding-design.md`). The app
   is served at **`learnwithbix.com`** (Namecheap; apex A record →
   `216.24.57.1`, `www` CNAME → `dynamic-learning-zkww.onrender.com`; Render
   redirects `www` to the apex). The live Render service is
   **`dynamic-learning-zkww`** (web service: app + API, Starter so it never
   sleeps, deploys from `main`). **`dynamic-learning-dev-zkww`** (Free, deploys from
   `dev`, its own `MONGODB_DB=dynamic_learning_dev`) is the dev site. Both are
   managed by the Render Blueprint "DEV DL", which auto-syncs `render.yaml`
   from the `dev` branch — so `plan`/`branch` in that file ARE production's;
   never set production back to `free`.
   The older `dynamic-learning` static site (`dynamic-learning-n72m.onrender.com`,
   no API) is retired and suspended — attach nothing to it. It still holds the
   name `dynamic-learning`, which makes `render blueprints validate` report a
   false type/region change. `learnwithbix.com` is verified in Resend (DKIM TXT
   `resend._domainkey`, CNAMEs `send`/`rsend`, `_dmarc` TXT — keep these when
   editing DNS), and `RESEND_API_KEY` + `EMAIL_FROM` (`Bix
   <hello@learnwithbix.com>`) are set on Render, so the code step is on in
   production. Keys are sending-only, so sent mail is checked in the Resend
   dashboard, not the API. A live sign-up received its code on 2026-10-09. The app was renamed
   "Learn with Bix" on 2026-10-10 (navbar, home, footer, HTML title, emails,
   certificate, docs, package name). Infrastructure identifiers keep the old
   name on purpose: the `dynamic_learning` / `dynamic_learning_dev` databases,
   the Render service names/URLs and the repo, so no account or progress moves. Deliberately no personal address in this
   file: the repo is public.
**Resolved since last review:**

- **Sign-up interactive checks closed** (#37, 2026-10-10). All seven checks
  ran in Playwright against a throwaway local MongoDB with a stubbed mail
  provider (results per check in the
  [tracker](superpowers/plans/2026-10-07-signup-onboarding-tracker.md)). Fixes
  from that run: the logged-out navbar overflowed 8px at 320px (tightened in
  `Navbar.css` under 360px); daily-limit waits now read in hours, not "1426
  minutes" (`signupCopy.js`); "Send a new code" no longer drops keyboard focus
  to `<body>` — focus returns to the first code box once the send settles
  (`CodeBody` in `steps.jsx`). Not verified: real Resend delivery, a real
  hour/UTC-midnight rollover, and client limits behind Render's proxy.
- **Science diagram review follow-ups closed** (#18, 2026-10-10). All eleven
  items in [DIAGRAM_REVIEW_FOLLOWUPS.md](science-curriculum/DIAGRAM_REVIEW_FOLLOWUPS.md):
  the dog card draws its skeleton (our own `DogSkeleton.jsx`, no credit needed); the leaf account is no longer underwater;
  the back muscle now lengthens straight→half→bent (re-rendered `arm.json`,
  guarded by `armMuscleLengths.test.js`); muscle-map titles match each view
  with visible Front/Back labels; label fixes; hoverfly captioned as a fly;
  asset scripts run Chrome sandboxed with network blocked, verify sha256s from
  `sources.json` and validate cache paths; SVGO strips scripts and a test
  rejects active SVG content; a `/credits` page carries every licence text and
  is linked from each Science caption. Checked in the browser in both themes.

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

### Account and learning protection (2026-10-09)

Suggested priority 3's source work (#2, #3, #4, #40) is implemented. The review
confirmed missing password recovery, snapshot-overwrite races, nonunique
account/learning keys and an unread progress schema version.

- `/login` now links to `/forgot-password`; `/reset-password` accepts a secret
  fragment link, removes it from browser history, validates the new password
  and returns the user to sign-in. Existing auth styles cover both themes.
- `POST /api/auth/recovery/request` responds identically for unknown, verified
  and unverified emails before doing delivery work. Per-client/per-account
  throttles, a persistent shared signup/recovery daily budget and an atomic
  per-account cooldown limit sends. A random 256-bit token is stored only as a
  hash, expires after 30 minutes, and is consumed atomically with the password
  change. A newer request replaces it; failed deliveries invalidate it.
- Recovery retains the same account/profile IDs, progress and rewards, verifies
  control of the original email for legacy accounts and invalidates old JWTs
  through `sessionVersion`. Reset secrets/session metadata are excluded from
  public account documents. Email-off mode answers `RECOVERY_UNAVAILABLE`;
  browser-only local accounts explicitly do not support email recovery.
- Completion unions plus optimistic revisions protect API saves; both drivers
  have version-aware progress reads. Rewards use the conflict policy in §5.
  Local signup re-reads accounts after asynchronous hashing, preventing two
  simultaneous creations from erasing each other. Corrupt parent collections
  and failed account writes now fail closed.
- Vitest/jsdom/React Testing Library component coverage runs alongside the
  existing Node tests. API success envelopes for signup/session/child methods
  are validated. The existing signup fixtures now use a current/future fake
  clock, preventing the real MongoDB TTL monitor from deleting their test data.
- A read-only Atlas audit checked both the empty configured development database
  and production `dynamic_learning`. Production had zero duplicate groups,
  nonunique email/progress indexes and no rewards child index. The safe startup
  converter was tested against an isolated local MongoDB, including refusal to
  remove duplicate records. No live records/indexes were changed.

**Validation:** 1,333 Node unit/API checks and 17 component checks passed,
including all MongoDB suites with no skips. `npm run lint`, `npm test` and
`npm run build` passed in both local and `VITE_USE_API=true` modes. A compatible
transitive `source-map-js` update removed
the install-time advisory; npm audit reported zero vulnerabilities. The existing
large-chunk build warning remains. Tests verify stale snapshots, concurrent first
inserts, stable reward retries, retained sibling/legacy learning, numeric IDs,
hydration/remount/profile isolation, signup gate/navigation/code entry/hand-over,
reset expiry/reuse, old-session rejection and unchanged profile/learning records.

**Deployed 2026-10-10.** Verified on dev (recovery, link reuse/expiry, concurrent
saves, both themes) and in production: `parents.email`,
`progress(childId,year,subject)` and `rewards.childId` are unique with zero
duplicate groups; all progress documents pass `migrateProgressDocument`.
Production's first boot failed with `user is not allowed to do action [collMod]`
— converting an existing index needs `dbAdmin` on `dynamic_learning`, which the
readWrite Atlas user lacked; granting it fixed the boot (Render kept the previous
version live meanwhile). Read-only checks before any future index or progress
change: `MONGODB_DB=dynamic_learning npm run audit:accounts` (zero
`duplicateGroups`) and `npm run audit:progress` (no `failures`).

Design references: [OWASP password recovery](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html),
[MongoDB index conversion](https://www.mongodb.com/docs/manual/core/index-unique/convert-to-unique/)
and [Vitest test inclusion](https://vitest.dev/config/include.html).

### Backlog source audit (2026-10-09)

This is the earlier source snapshot. The account-protection changes recorded
above supersede its #2/#3/#4/#40 findings.

Checked **all 39 current PROJECT_IDEAS rows**, including all 21 standalone game
suggestions inside #20, against routes, components, data, stores, server code,
dependencies and the linked review trackers. **No current row is fully finished**:
each still describes missing functionality or outstanding acceptance evidence.
No whole row was deleted and IDs were preserved.

Shipped parts are recorded below. Narrowed #6 to extending the existing English
renderer, #13 to standalone creative/picture games, #23 to jokes and extra
reactions, #27 to activity confirmation/rewards and wider coverage, and #36 to
connecting the existing analytics wrapper. #6, #27 and #36 now show Partial.
An existing kit component, similarly named badge or curriculum challenge does
not by itself deliver a standalone game or its proposed reward flow.

| Idea | Source checked / existing implementation | Why it remains in the backlog |
|---|---|---|
| #2 Component tests | [package.json](../package.json), [API tests](../src/data/store/apiStore.test.js); Node tests cover progress/rewards responses. | No Vitest/Testing Library/component environment; hydration, wizard and other API coverage remain. |
| #3 Password recovery | [Routes](../src/main.jsx), [auth API](../server/routes/auth.js), [mailer](../server/email.js). | No recovery screens, reset endpoint or token lifecycle; mailer sends signup codes only. |
| #4 Progress migration | [Local store](../src/data/store/localStorageStore.js), [API store](../src/data/store/apiStore.js), [progress route](../server/routes/progress.js). | Version 1 is stored but no progress migration/ID-remapping hook reads it; rewards normalisation is separate. |
| #5 Free-play kit wrappers | [Skills routes](../src/main.jsx), [Skills hub](../src/pages/skills/SkillsPage.jsx), `src/components/challenge/`. | Money, measurement, position/direction, statistics and place-value kit interactions have no standalone Skills wrappers. **Shipped 2026-10-10:** §5, "Free-play Skills games"; row removed. |
| #6 Content format | [EnglishPracticeGame](../src/pages/skills/english/challenges/EnglishPracticeGame.jsx), `src/data/challenges/`. | Choice/sort/build/type rendering and separate JS banks exist; other interactions still need topic-specific JSX rather than data-only authoring. **Format and renderer shipped 2026-10-10:** §5, "Questions as data". |
| #7 Accessibility pass | [TileBuilder](../src/components/challenge/TileBuilder.jsx), [SortBins](../src/components/challenge/SortBins.jsx), [DragToOrder](../src/components/challenge/DragToOrder.jsx) and review trackers. | Native-button and drag-library keyboard support exist; no completed whole-app interaction/contrast audit is recorded. |
| #8 Read-aloud | [Speech utility](../src/utils/speech.js), [SpeakButton](../src/components/challenge/SpeakButton.jsx), English/Science games, [Solar System](../src/pages/skills/geography/SolarSystem.jsx). | Maths and other standalone games still lack shared narration; physical-device speech review remains. **Maths shipped 2026-10-10:** §5, "Maths read-aloud". |
| #9 Parent summary | [ParentArea](../src/pages/auth/ParentArea.jsx), [ChallengeShell](../src/components/challenge/ChallengeShell.jsx). | Completion summaries/profile edits exist; no persisted active time or wrong-answer evidence for practice recommendations. |
| #10 Adaptive difficulty | `src/data/challenges/`, [ChallengeShell](../src/components/challenge/ChallengeShell.jsx). | Fixed challenge levels and transient misses/combos exist; no persisted accuracy/response time or adaptive controller. |
| #11 Safeguards/consent | [Signup flow rules](../src/data/signupFlow.js), [account rules](../shared/accountTypes.js), [signup API](../server/routes/signup.js). | Entered-age gate exists; no grown-up consent verification/record or completed qualified review is recorded. Reviewer brief and privacy groundwork done 2026-10-10 (see "Privacy groundwork for #11"). |
| #12 Phonics/rhyming | [Skills routes](../src/main.jsx), English banks, [speech utility](../src/utils/speech.js). | No standalone sound-it-out, rhyming-match or syllable-splitter pack or dedicated phoneme audio. Syllables in suffix questions are different content. |
| #13 Story games | [SettingsCharactersAndPlotGame](../src/pages/skills/english/challenges/year3/SettingsCharactersAndPlotGame.jsx), [stories.json](../src/data/stories.json), [Skills routes](../src/main.jsx). | Curriculum plot-sentence ordering and guided story planning exist; free-choice generation and standalone picture sequencing do not. |
| #14 Offline/PWA | [Dependencies](../package.json), [entry HTML](../index.html), `public/`, store drivers. | No web-app manifest/service-worker registration/PWA plugin or offline API write/conflict flow. The Science asset manifest is unrelated. |
| #15 Geography curriculum | [Specs and embedded trackers](geography-curriculum/README.md), [curriculum registry](../src/data/curriculumRegistry.js). | Years 1–4 specs drafted 2026-10-13: 58 proposed topics / 232 briefs and KS1/KS2 crosswalks. Years 2–4 implemented: Year 2 has 14 topics / 56 slots; Years 3–4 have 16 / 64 each. Year 1 and browser/device review remain. Skills games remain standalone; Geography is excluded from overall year awards. |
| #16 Year 1–2 English | [Curriculum registry](../src/data/curriculumRegistry.js), English datasets/challenge directories. | Completed 2026-10-11: Year 1 has 38 topics / 152 challenges and Year 2 has 39 / 156. Years 1–4 English are registered and implemented. |
| #17 Meteor benchmark | [Meteor controller](../src/pages/skills/geography/meteorExperiment.js), [tracker](solar-system-meteor/IMPLEMENTATION_TRACKER.md). | Feature exists; the required physical phone/tablet timing evidence is explicitly outstanding. |
| #18 Science diagrams | [Follow-up checklist](science-curriculum/DIAGRAM_REVIEW_FOLLOWUPS.md), diagram components and `scripts/science-assets/`. | All 11 checklist items remain open in source: dog skeleton, leaf water, muscle geometry/titles, labels/Plants, renderer sandboxing, checksums, cache path validation, SVG stripping and built licence notices. |
| #19 3D constellations | [SolarSystem](../src/pages/skills/geography/SolarSystem.jsx), [ConstellationCard](../src/pages/skills/geography/ConstellationCard.jsx), projection modules. | Card explicitly stays outside the scene; no celestial-sphere constellation controller or real-sky action. |
| #20 Standalone game list | [All routes](../src/main.jsx), [Skills hub](../src/pages/skills/SkillsPage.jsx) and existing standalone implementations; individual inventory below. | None of its 21 proposed games is implemented as the described standalone activity. |
| #22 Certificates | [CertificateStep](../src/components/celebration/steps/CertificateStep.jsx), [celebration steps](../src/data/celebrationSteps.js), [TrophyRoom](../src/pages/trophies/TrophyRoom.jsx). | Year print/save exists; no topic/category certificate, avatar/signature/skill statement or reprint entry point. **Shipped 2026-10-10:** §5, "Certificates"; row removed. |
| #23 Jokes/reactions | [Mascot](../src/components/mascot/Mascot.jsx), [celebration messages](../src/data/celebrationMessages.js). | Tap-to-cheer, pointer following and combo reactions exist; no joke catalogue/read-aloud or long-tap/five-tap secrets. **Shipped 2026-10-10:** §5, "Bix's jokes"; row removed. |
| #24 Wardrobe | [Avatars](../src/data/avatars.js), [badges](../src/data/badges.js), [reward shape](../src/data/rewardsShape.js). | Badges unlock pictures; no wearable catalogue, equipped-item data or layered avatar display. |
| #25 Bix's den | [Routes](../src/main.jsx), [TrophyRoom](../src/pages/trophies/TrophyRoom.jsx), rewards data. | Trophy collections exist; no room, furniture placement or object-fact interaction. |
| #26 Boss rounds | [ChallengeShell](../src/components/challenge/ChallengeShell.jsx), generators, [routes](../src/main.jsx). | No category-wide mixed-question picker, boss state or boss artwork/play flow. |
| #27 Real-world missions | [Science activities](../src/data/scienceActivities.js), [PracticalActivityCard](../src/components/challenge/PracticalActivityCard.jsx), [topic map](../src/pages/curriculum/CurriculumPage.jsx). | Sixteen optional activity cards already exist and are read-only; no mission tick-off, grown-up confirmation or mission sticker; coverage is limited to Science. |
| #28 Teach the grown-up | [Routes](../src/main.jsx), challenge generators, signup [HandOver](../src/pages/auth/signup/HandOver.jsx). | Signup hands over a profile; no child-authored parent quiz or child marking flow. |
| #29 Pass-and-play | [Skills routes](../src/main.jsx), standalone games, [Profiles](../src/pages/auth/Profiles.jsx). | Profile switching exists; no alternating two-player session, separate scores or cooperative play. |
| #30 Brain breaks | [RootLayout](../src/layouts/RootLayout.jsx), [ParentArea](../src/pages/auth/ParentArea.jsx), mascot/reward modules. | No active-session break scheduler, movement prompt or grown-up interval setting. **Shipped 2026-10-10:** §5, "First play"; row removed from the backlog. |
| #31 Notebook/passport | [TrophyRoom](../src/pages/trophies/TrophyRoom.jsx), [stickers](../src/data/stickers.js), geography games. | Topic stickers exist; no specimen notebook/fact cards or country/planet exploration stamp persistence. |
| #32 Seasonal events | Reward/generator modules and [routes](../src/main.jsx). | No dated event-pack configuration, seasonal puzzle flow or event sticker awards. Ordinary story references to autumn/pumpkins are not events. |
| #33 Curriculum story | [CurriculumPage](../src/pages/curriculum/CurriculumPage.jsx), [CurriculumSelectPage](../src/pages/curriculum/CurriculumSelectPage.jsx). | Topic path and adventure copy exist; no year narrative, between-category scenes or walking-avatar world map. |
| #34 Daily puzzle | [Home](../src/pages/home/Home.jsx), reward/date modules, [routes](../src/main.jsx). | Streak day stamps exist; no date-seeded daily question, daily puzzle view or fixed puzzle reward. **Shipped 2026-10-10:** §5, "First play"; row removed from the backlog. |
| #35 Child intro | Signup [HandOver](../src/pages/auth/signup/HandOver.jsx), [child fields](../src/data/childFields.js), [reward shape](../src/data/rewardsShape.js), [badges](../src/data/badges.js). | No playable profile intro, per-child intro flag/replay or coach marks. The existing `first-steps` badge rewards a curriculum challenge, not an intro. **Shipped 2026-10-10:** §5, "First play"; row removed from the backlog. |
| #36 PostHog | [Analytics wrapper](../src/utils/analytics.js), [wrapper tests](../src/utils/analytics.test.js), [SignUpFlow](../src/pages/auth/signup/SignUpFlow.jsx), [dependencies](../package.json). | Allow-lists/funnel calls exist; no PostHog SDK/transport or consent gate. Hosted project settings/DPA were not verified. |
| #37 Signup findings | [Email validation](../shared/emailAddress.js), [signup route](../server/routes/signup.js), [send limits](../server/signupEmailLimits.js), [steps](../src/pages/auth/signup/steps.jsx), [mailer](../server/email.js), [route tests](../server/routes.test.js). | C1/I1/I2/I3/M1/M2/M5 fixed, plus M3/M4. Database-backed suites pass after fixture repairs. Interactive browser checks remain open. |
| #38 Interactive review | [English tracker](english-curriculum/IMPLEMENTATION_TRACKER.md), [Science tracker](science-curriculum/y3-science-tracker.md). | Broad playthrough/owner and real-device checks remain pending; implemented wrappers and passing pure tests do not close them. |
| #39 Rename | [Navbar](../src/components/ui/Navbar.jsx), [Home](../src/pages/home/Home.jsx), [HTML title](../index.html), [email](../server/email.js), [certificate](../src/components/celebration/steps/CertificateStep.jsx). | Renamed to Learn with Bix 2026-10-10; database and Render identifiers intentionally unchanged. |
| #40 Concurrency/indexes | [Progress route](../server/routes/progress.js), [rewards route](../server/routes/rewards.js), [database boot](../server/db.js). | Routes still replace snapshots; boot indexes only pending signups. Actual live database indexes/duplicates were not inspected. |
| #41 Skills celebrations | Standalone Skills games, [ChallengeShell](../src/components/challenge/ChallengeShell.jsx), shared celebration kit. | Shared combos/effects/sounds/Bix flow is used by curriculum challenges, not integrated into standalone games. |

**#20 individual game inventory:** checked each named activity against both the
route list and the standalone game source, so an alternative route/name would
not count as missing by itself. All remain unbuilt in Skills Mode:

- **Maths (13):** Math Sentence Builder, Compare the Numbers, Math Maze, Clock
  Quiz, Skip Count Jump, Estimate It!, Magic Squares, Number Line Jump, Odd or
  Even Sort, Shape Sorter 3D, Pattern Play, Tally Marks Trainer, Math Bingo.
- **English (7):** Sentence Fixer, Word Picture Puzzle, Riddle Time, Emoji
  Sentences, Picture Vocabulary, Alphabet Adventure, Listening & Repeat.
- **Geography (1):** Country Puzzle.

Closest existing games were inspected: Clock Generator displays times without
a matching quiz; Shape Explorer/ShapeQuiz identifies 2D shapes without 3D
sorting; Sentence Builder orders correct words without fixing grammar; Word
Builder fills a missing letter without a picture. Curriculum comparison,
number-line, pattern, tally, grammar and story interactions have no standalone
entry points for these ideas.

**Validation:** `npm run lint` and `npm run build` passed; `npm test` reported
1,248 passed, zero failed and two MongoDB-dependent suites skipped because
`MONGODB_URI` was unset. Build retains the existing large-chunk warning. This
was a documentation/source audit: no application, persistence or unlock code
changed; no browser or physical-device verification was performed.

---

## 7. How To Add Things (playbooks)

### Add a subject (learned from History, 2026-10-12)

Beyond the registry entry: add the id to `CHILD_SUBJECTS` in
`src/data/childFields.js` (sign-up and profile edits reject unknown subjects;
`childFields.test.js` keeps the two lists in step), give it a look in
`CurriculumSelectPage` (`SUBJECT_LOOKS` plus `--cs-hue-*` / `--cs-deep-*`), hero
glyphs in `CurriculumPage` (`GLYPHS_BY_SUBJECT`) and anchored `CATEGORY_ICONS`.
Tests that use the new id as an example of an *invalid* subject must change.
Registering a subject for a year makes that year's award (the live-computed year
certificate and the year milestone) wait for it too. While a subject is only
partly built, register it with `countsTowardYear: false` (`curriculumRegistry.js`)
so a year children already finished is not taken away; remove the flag once the
subject is complete and the owner agrees (Year 1 History: removed 2026-10-12).
History pictures are CC0 / public domain only, pinned in
`scripts/history-assets/sources.json` and rebuilt with
`node scripts/history-assets/fetch.mjs` (headless Chrome encodes the WebP, since
macOS `sips` cannot write it); `/credits` lists them from the manifest.

### Pure-logic tests

`npm run test:unit` runs Node's built-in test discovery. Keep these tests React-free.
`npm test` runs both the Node and component suites.
Component tests now use Vitest/jsdom/React Testing Library under
`tests/components/`; see `vitest.config.js`.

### Modal / overlay pattern

The modal behaviour — focus in, Tab trapped, Escape closes, page scroll locked,
focus returned on close — lives in `src/components/ui/useModalDialog.js`
(2026-10-10). `ui/Dialog.jsx` wraps it in a ready-made portal, backdrop and
close button (certificates use it); Speed Reader's `ReaderOverlay.jsx` and the
brain-break dialog use the hook with their own markup. A new modal uses
`Dialog`, or the hook when it needs its own look; never write a second
focus/scroll-lock implementation. Open dialogs form a stack: only the top one
answers Escape and traps Tab.

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
Years 3–4 English (2026-10-01) are a worked example of this process.
Year 4 Maths (2026-10-11) demonstrates a complete eight-strand year with
coordinate plotting, editable reflections and pure seeded question banks.
Year 1 Maths (2026-10-11) demonstrates adding a second subject to an existing
year with practical diagrams through `DataChallenge.renderVisual`.
Year 2 English (2026-10-11) is the worked example for the shared data-question
renderer, with its own banks, Appendix 1 coverage check and loader-path tests.
Year 1 Science (2026-10-11) is the worked example of a third subject in a year
and of hand-authored banks through a recipe engine (`year1Science/engine.js`).
Year 2 Science (2026-10-11) shows a second year reusing that engine unchanged,
with its own banks and drawing component.
Year 4 Science (2026-10-11) adds a complete five-strand year with independent
authored banks, evidence tables and picture circuit models (`year4Science/`).
Year 2 History (2026-10-12) reuses the story-card engine, adds five pinned source
images and original SVG practice sources, and keeps the year-award requirement
unchanged pending owner review. `historyActivities.js` provides read-only activity
cards after local topic completion through the existing celebration panel.
Year 3 History (2026-10-12) implements all 22 approved topics and 88 challenges,
with optional KS2 timeline bands and pinned CC0/public-domain historical sources.
Year 4 History (2026-10-12) adds all 18 approved topics / 72 challenges with
source-purpose questions, original SVG teaching aids and a timeline connecting
Year 3 to 1066. Its year-award exclusion preserves existing certificates.
Year 3 Geography (2026-10-13) adds a notes/evidence wrapper on `DataChallenge`,
licensed offline maps/photos and matched climate records. Its new registry entry
uses `countsTowardYear: false`; existing Year 3 certificates remain available.
Year 2 Geography (2026-10-13) reuses that engine with KS1 compass/landmark
visuals, shorter age limits, bounded place studies and read-only grown-up cards.
Its 56 wrappers, exact outcomes and registry entry preserve existing year awards.

1. Save the programme of study verbatim from the DfE PDF in `docs/curriculum/`, with a mapping
   section, and get the topic titles signed off. Titles are ids.
2. Create `src/data/year<N><Subject>Curriculum.js` in the same shape, with a
   dataset test, and lock its ids in `curriculumIds.test.js`.
3. Register it in `curriculumRegistry.js`. A new year also needs adding to
   `CURRICULUM_YEARS` and `CHILD_YEAR_GROUPS` (`childFields.js`).
4. Create `src/pages/skills/<subject>/challenges/year<N>/...` folders.
5. Progress is namespaced by (child, year, subject), so years never clash. A
   second subject in a year makes the year award wait for both (§4.5).
6. Add topic certificate statements and update tests that enumerate available
   subjects in signup or certificates. Use an actually unavailable year for
   empty-subject tests; Year 2 now offers Maths and English.

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

A full audit fixed 42 of 44 issues (the two still open are §6 items 14 and 15).
These are the patterns that caused real bugs, so they are now rules.

**Checked in that audit and found correct**, so nobody re-investigates: the
REST Countries v5 endpoint and key (`v3.1` is deprecated); progress I/O
try/catch and the `hydrated` guard against a save-before-hydrate wipe; the
challenge loader's "not yet available" fallback; the Leaflet lifecycle (no
manual `L.map()`, `key={mode}` remounts); GeoJSON fetch error handling; every
`to="/…"` link resolving to a route; theme persistence; WordBuilder's
distractors and timers; `writtenNumber`'s full `1…775840` range (a library
limit); and every `while` loop in the repo accounted for.

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
outstanding** (§6 item 15) — and do it file by file with visual checks: an automated regex pass emptied
`MathPractice.css`.

### The REST Countries v5 API defaults to 25 records per page
Flag Finder was quizzing 25 of 254 countries. Request `limit=100` (supported on
the free plan), render usable pages progressively, and follow `data.meta.more` using `offset`, pause
~120ms between pages (bursts get rate-limited, and the throttled response carries **no CORS
headers**, surfacing as an opaque `TypeError: Failed to fetch`), and keep partial results rather
than failing the whole load.

### Verify in the browser, not just in the unit
Several bugs only appeared in the real app: the Word Sorter never re-dealt, the counting inputs
were invisible in dark mode, and the map scored wrong answers as found. Contrast in particular
must be **measured** from computed styles — the target is WCAG AA **4.5:1**.
