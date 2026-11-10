# Project knowledge — Learn with Bix

**Current builder entry point · reviewed 2026-11-03.** Start here with any AI
tool or developer, read [AGENTS.md](../AGENTS.md) for repository rules, then
choose the project mode below. Source code and `package.json` decide
current behaviour.

| Need | Read |
|---|---|
| Build a Curriculum course, topic or challenge | [Curriculum authoring](AUTHORING.md), including the [new-course integration checklist](AUTHORING.md#new-course-integration) |
| Build a standalone Skills Mode game/challenge | [Skills game authoring](SKILLS_AUTHORING.md): game loop, visuals, route, hub and public guide |
| Architecture and persistence contracts | [Current architecture](ARCHITECTURE.md) |
| Implemented subjects, years and counts | [Curriculum inventory](CURRICULUM_INVENTORY.md) |
| Visual teaching patterns | [Visual recipes](VISUAL_RECIPES.md) |
| Solar System and Ocean Explorer 3D worlds | [Explorable worlds](EXPLORABLE_WORLDS.md) |
| Deployment or outstanding review | [Operations](OPERATIONS.md), [SEO follow-up](SEO_NEXT_STEPS.md) |
| Time and token measurement | [Build measurement](BUILD_MEASUREMENT.md) |
| Upcoming work | [Project ideas](PROJECT_IDEAS.md), [Solar System roadmap](SOLAR_SYSTEM_IDEAS.md) |
| Delivered changes | [Changelog](CHANGELOG.md) |
| Check scope and final merge validation | [Validation policy](VALIDATION.md) |
| Coding rules learned from past bugs | [Engineering rules](ENGINEERING_RULES.md) |

## 1. What This Project Is

React learning app with standalone **Skills Mode** and progress-tracked
**Curriculum Mode**, aligned to the UK National Curriculum. Keep core controls
suitable for young children: short instructions, large touch targets, sound-off
play and both themes. Adapt content difficulty to the requested school year.

All built curriculum challenges are **open**, independently of saved completion.
Selecting a child profile is still required for that child's progress. Completion
controls records, rewards and awards, not access to the next challenge.

Skills Mode games are standalone practice, usually endless rounds with selectable
levels. They do not use Curriculum's four completion slots or `onComplete`
contract. Register their route, Skills hub entry and public guide together.
These are app features; the linked authoring docs do not require Claude Code.

## 2. Tech Stack

React 19, Vite 7, React Router 7 and plain CSS. Node/Express + MongoDB provide the
production API. Shared kits use SVG/CSS diagrams, `@hello-pangea/dnd`, Leaflet and
Three.js where appropriate. Node's test runner covers pure logic/server code;
Vitest + Testing Library + jsdom cover components. Exact dependencies and scripts:
[package.json](../package.json). Deployment's Node version and build configuration:
[render.yaml](../render.yaml).

Development defaults to the browser store. The exact build-time setting
`VITE_USE_API=true` selects API mode; production uses API + MongoDB. Browser
storage is not a secure account boundary or a cross-device backup.

### Scripts

```sh
npm run dev:web                 # frontend only
npm run dev                     # frontend + API; API needs local configuration
npm run lint
npm test                        # Node suites, then Vitest component suites
npm run build                   # Vite build + public-page prerendering
npm run preview
npm run test:unit
npm run test:components
npm run check:seo               # built HTTP/crawl + local Chrome checks
```

For one topic, replace `N`, `SUBJECT`, `TOPICID` and paths with real values:

```sh
npm run topic:context -- --year N --subject SUBJECT --topic TOPICID
npm run scaffold:topic -- --year N --subject SUBJECT --topic TOPICID --game src/path/to/SubjectGame.jsx
npm run check:topic -- --year N --subject SUBJECT --topic TOPICID
npm run check:course -- --year N --subject SUBJECT
npm run course:timer -- report year6
npm run course:usage -- --help
```

Scaffolding previews by default; `--write` creates files without overwriting.
Maths/English generic scaffolds include shared question visuals. Other subjects
require their visual game adapter. Read [AUTHORING.md](AUTHORING.md) for supported
flags, pilot/review steps and checker limitations. Read [OPERATIONS.md](OPERATIONS.md)
before seeding, database audits or deployment; `seed` changes the configured database.

## 3. Folder Structure

| Location | Responsibility |
|---|---|
| `src/pages/skills/` | Standalone games and subject/year challenge wrappers/shared games |
| `src/pages/curriculum/` | Curriculum selection, loader, lessons, completion and navigation |
| `src/components/challenge/` | Interaction kit, diagrams, lesson/story/adventure frames |
| `src/data/challenges/`, `src/data/lessons/` | Pure builders, authored banks and teaching examples |
| `src/data/store/`, `src/hooks/`, `src/context/` | Store drivers and account/progress/rewards integration |
| `shared/`, `server/` | Shared document rules/catalogues, API and database code |
| `tests/components/`, `scripts/` | Playthroughs and local authoring/verification tools |
| `docs/curriculum/` | Verbatim statutory requirements and topic mappings |
| `docs/*AUTHORING.md`, `.claude/skills/` | Project build workflows and plain-Markdown agent checklists |
| `docs/authoring/`, `docs/superpowers/` | Durable briefs, plans and review evidence |

## 4. Architecture & Key Decisions

The [architecture reference](ARCHITECTURE.md) links to the current implementations.

### 4.1 Routing

[src/main.jsx](../src/main.jsx) owns routes. Public Skills Mode and teaching guides
are distinct from profile-based curriculum routes. A curriculum challenge uses
`/year/:year/:subject/problem/:categoryId/:topicId/:challengeId`.

### 4.2 Curriculum data model

[curriculumRegistry.js](../src/data/curriculumRegistry.js) maps year/subject to a
dataset. Each topic has four slots. Titles often generate IDs used in URLs and
saved progress; keep shipped IDs permanent. Read the exact topic mapping and
referenced statutory bullet in [curriculum/](curriculum/) before authoring.
Never paraphrase saved statutory text.

### 4.3 Challenge loading (the convention that ties it together)

The loader's static Vite glob expects
`src/pages/skills/<subject>/challenges/yearN/<topic-id>/<PascalTopicId>Challenge1.jsx`.
Use context/scaffold output rather than hand-spelling paths. Module availability
is separate from registry availability and completion. Missing modules and failed
imports have different UI paths; preserve the existing retry behaviour.

### 4.4 Challenge component contract

A wrapper default-exports a component accepting `onComplete`, passed through
unchanged to preserve `{ combos }`. `ChallengeShell` owns retry, feedback,
success locking and completion of the whole run. Games never write progress.
Keep banks pure with an injected `rng`, and retain the subject's illustrated
teaching frame, visual models and custom answer checking.

### 4.5 Progress & unlocking

Read the [progress skill](../.claude/skills/curriculum-progress/SKILL.md) before
changing IDs, persisted data, completion, access or year-award membership.
Progress is per `(childId, year, subject)`. Preserve hydration/document-identity
guards, ordered saves, versioned migrations and monotonic merges. Failed reads
remain errors, never writable empty data. Completion checks membership of built
challenge IDs; all built challenges remain open.

`countsTowardYear` is independent of playability and defaults to true. Explicitly
exclude staged additions and preserve existing year awards when registering content.

### 4.6 Theming

[App.css](../src/App.css) owns paired theme tokens. Theme classes go on `body`.
Use the shared kit and SVG/CSS assets, accessible text equivalents and large
controls. Verify real layout/drag only where jsdom cannot prove it, following
[AGENTS.md](../AGENTS.md).

### 4.7 Accounts, profiles & the store seam

Account/profile state selects the active child; use the common async store, not
a concrete driver from UI code. Parent accounts and self-managed learner accounts
both exist. Keep children, years, subjects, progress and rewards isolated.

### 4.8 The backend (`server/`)

Express serves the API and built frontend from the same origin with HTTP-only
session cookies. Routes authenticate and enforce child ownership. Storage/API
failures must remain visible; shared merge/migration helpers preserve earned data.
See [architecture](ARCHITECTURE.md) and [operations](OPERATIONS.md) before changes.

## 5. What Currently Exists

**39 registered pathways, all complete (Year 6: Maths, English, Science, History, Geography, Computing and French).**
See the [full inventory](CURRICULUM_INVENTORY.md) for subject
coverage, award exclusions, introductions and review trackers. “Implemented”
means files exist; it does not certify statutory coverage or content/device review.

Standalone games and public descriptions are registered in
[skillsCatalog.js](../shared/skillsCatalog.js) and [skillGuides.js](../shared/skillGuides.js).
Free-play games reuse `src/components/skills/FreePlayShell.jsx`; curriculum
subjects reuse their own illustrated shared games and challenge kit. Rewards,
XP/streaks, badges, certificates and progress summaries have existing shared
rules: extend those layers instead of creating another store or counter.

For feature detail, read the [architecture](ARCHITECTURE.md) and the source it
links. Delivered outcomes belong in [CHANGELOG.md](CHANGELOG.md).

**Teacher tools** at `/teachers` link the planning pilot to three
account-free tools. All `/teachers` pages use `TeacherWorkspace.jsx` and its shared
header, with the compact planner as the visual reference. Teacher-only layout
rules in `TeacherWorkspace.css` keep parent guides independent. **Topic briefings** (`/teachers/briefings`) cover every
Maths and English topic that has Bix introductions; Year 3 Maths also has
authored teacher notes, which also supply the planning pilot's lesson text, vocabulary and briefing links for those topics. The **report comment builder** (`/teachers/reports`)
drafts editable, template-built comments. The 12 **parent guides**
(`/parent-guides/:slug`, data in `shared/parentExplainers.js`) are the
"how it's taught" layer under the curriculum guides, which link to them. They
can be sent as links or printed, and become indexed only once reviewed. None of
these pages stores what is typed into it. See the
[design record](superpowers/2026-11-09-teacher-everyday-tools.md).

The **teacher planning pilot** at `/teachers/planning` accepts class-level
needs or pasted question-response totals and generates editable three-week
plans with matching resource playlists. Its calendar view shows lessons automatically assigned from the chosen start date
and time, respecting lessons per week and skipping weekends. Each teaching week
is five school days from that start, which need not be Monday. Individual dates
and times remain editable; overlaps are flagged and schedules appear in print. Fictional evidence is an explicit demo choice. It has no
teacher accounts, live assessments or saved plans yet; refresh discards
inputs/edits and printing/PDF keeps a copy. It is linked from the footer and
excluded from search indexing. See the
[phased plan](superpowers/plans/2026-11-08-teacher-planning-playlists.md).

Year/subject selectors scope fuzzy search to all built challenges in that
curriculum, using topic/activity names, existing lesson text and classroom terms.
Teachers can add topics from several subjects to one plan for the same year.
Changing the search subject retains topics, pasted results and draft edits;
changing year still requires confirmation when there is work to discard.
Lessons show their subject in the list, calendar and printout; retrieval stays
within that subject. Pasted class results can include multiple subjects.
The Year 3 Maths default covers 176 challenges across 44 topics. Matching activity
IDs are retained in generated plans. Existing teaching notes and the pilot's
additional reviewed descriptions remain distinct; read-only previews never
record pupil progress. See the [full-curriculum search record](superpowers/2026-11-08-teacher-full-curriculum-search.md)
for coverage, source limits and checks.
The [class-input record](superpowers/2026-11-08-teacher-class-input.md) describes
accepted imports, evidence limits, input-to-plan rules and current validation.

## 6. Known Issues / Debt

[OPERATIONS.md](OPERATIONS.md) separates source-confirmed limitations, dated
hosting records, unrechecked reports and superseded issues. [PROJECT_IDEAS.md](PROJECT_IDEAS.md)
tracks upcoming work. Physical-device, child/owner, accessibility and external
rollout checks need their own evidence; passing tests does not close them.

Hosting configuration and deployment safeguards are in [operations](OPERATIONS.md).

## 7. How To Add Things (playbooks)

| Task | Guide | Maintained example |
|---|---|---|
| All four Curriculum topic challenges | [Curriculum authoring](AUTHORING.md), [visual recipes](VISUAL_RECIPES.md) | [Year 5 Maths game](../src/pages/skills/math/challenges/year5/Year5MathGame.jsx), [bank](../src/data/challenges/year5Math/questions.js), [playthrough](../tests/components/year4MathPlaythrough.test.jsx) |
| A single Curriculum challenge | [Authoring workflow](AUTHORING.md), [loader contract](ARCHITECTURE.md#challenge-execution-and-teaching-presentation) | [Maths slot wrapper](../src/pages/skills/math/challenges/year5/place-value-to-a-million/PlaceValueToAMillionChallenge1.jsx) |
| New Curriculum year or subject | [Course integration](AUTHORING.md#new-course-integration) | [Year 5 Science dataset](../src/data/year5ScienceCurriculum.js), [game](../src/pages/skills/science/challenges/year5/Year5ScienceGame.jsx), [test](../src/data/year5ScienceCurriculum.test.js) |
| Illustrated lessons/models | [Visual recipes](VISUAL_RECIPES.md) | [Lesson frame](../src/components/challenge/lesson/LessonFrame.jsx), [question visuals test](../tests/components/questionVisuals.test.jsx) |
| Standalone Skills Mode game/challenge | [Skills game authoring](SKILLS_AUTHORING.md) | [Money Match](../src/pages/skills/math/MoneyMatch.jsx), [generator](../src/data/freePlay/money.js), [loop tests](../tests/components/freePlay.test.jsx) |
| Another real star system | [Star-system skill](../.claude/skills/add-star-system/SKILL.md) | [System registry](../src/pages/skills/geography/systems/registry.js) |
| Progress/persistence | [Progress skill](../.claude/skills/curriculum-progress/SKILL.md), [architecture](ARCHITECTURE.md) | [Progress playthrough](../tests/components/progress.test.jsx) |

One topic's exact curriculum boundary and source paths come from `topic:context`.
Use [curriculum/README.md](curriculum/README.md) to locate programmes for a new
course, and [Superpowers templates](superpowers/templates/) for compact briefs.
`AGENTS.md` also links the plain-Markdown checklists in `.claude/skills/`; any AI
tool can read them, but the project workflows above are the primary build routes.

## 8. Conventions Checklist

Read the mode's project guide and repository rules. Preserve permanent IDs, learner progress and earned
awards. Keep statutory boundaries, British English, answerability, visual/lesson
alignment and sound-off accessibility. Reuse the kit; vary Curriculum's four slots
and keep standalone Skills loops independent of Curriculum completion.
Use focused checks at intermediate handoffs; follow [validation](VALIDATION.md)
for the full lint/tests/build once before merge/release and broader checks for
shared/progress changes. Follow `AGENTS.md` for justified browser checks; report
technical/content/device review and deferred final checks separately.

## 9. Hard-Won Rules (from the 2026-08-21 audit)

Read [ENGINEERING_RULES.md](ENGINEERING_RULES.md): bounded sampling, answer
ranges, timers, theme tokens, contrast, scoped CSS and more. Apply current code,
skills and [AGENTS.md](../AGENTS.md) where they differ.

## Keeping this guide short

Aim to keep this entry point under 2,000 words; move substantial detail into a
focused reference. Update this page only when current architecture, commands, scope or routing to
references changes. Update the relevant focused reference and inventory with it.
Record delivered outcomes and verification in [CHANGELOG.md](CHANGELOG.md),
upcoming work in [PROJECT_IDEAS.md](PROJECT_IDEAS.md), and detailed feature evidence
in its tracker/brief. Ordinary builds must not load every reference by default.
