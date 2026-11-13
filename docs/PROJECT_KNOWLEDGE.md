# Project knowledge — Learn with Bix

**Start here** with any AI tool or developer, read [AGENTS.md](../AGENTS.md) for
repository rules, then open only the reference your task needs. Source code and
`package.json` decide current behaviour.

| Need | Read |
|---|---|
| Build a Curriculum course, topic or challenge | [AUTHORING.md](AUTHORING.md), including [new course integration](AUTHORING.md#new-course-integration) |
| Curriculum introductions and quizzes content | [JOURNEY_AUTHORING.md](JOURNEY_AUTHORING.md) |
| Build a standalone Skills Mode game | [SKILLS_AUTHORING.md](SKILLS_AUTHORING.md) |
| Visual teaching patterns, maps, image licensing | [VISUAL_RECIPES.md](VISUAL_RECIPES.md) |
| Architecture, persistence, security, teacher tools | [ARCHITECTURE.md](ARCHITECTURE.md) |
| Implemented subjects, years, counts and awards | [CURRICULUM_INVENTORY.md](CURRICULUM_INVENTORY.md) |
| What we teach (verbatim statutory programmes) | [curriculum/README.md](curriculum/README.md) |
| Solar System and Ocean Explorer 3D worlds | [EXPLORABLE_WORLDS.md](EXPLORABLE_WORLDS.md) |
| Deployment, data safety, outstanding review | [OPERATIONS.md](OPERATIONS.md) |
| Public pages, indexing, SEO checks | [SEO.md](SEO.md) |
| Which checks to run | [VALIDATION.md](VALIDATION.md) |
| Coding rules learned from past bugs | [ENGINEERING_RULES.md](ENGINEERING_RULES.md) |
| Upcoming work | [PROJECT_IDEAS.md](PROJECT_IDEAS.md), [SOLAR_SYSTEM_IDEAS.md](SOLAR_SYSTEM_IDEAS.md) |
| Sounds | [sounds/README.md](sounds/README.md) |
| Privacy and safeguarding questions | [safeguarding/REVIEW_BRIEF.md](safeguarding/REVIEW_BRIEF.md) |

Delivered history lives in git, not in docs. Docs describe what is true now and
what is still to do.

## 1. What this project is

React learning app with standalone **Skills Mode** and progress-tracked
**Curriculum Mode**, aligned to the UK National Curriculum. Keep core controls
suitable for young children: short instructions, large touch targets, sound-off
play and both themes. Adapt content difficulty to the requested school year.

All built curriculum challenges are **open**, independently of saved completion.
Selecting a child profile is still required for that child's progress.
Completion controls records, rewards and awards, not access.

Skills Mode games are standalone practice, usually endless rounds with selectable
levels. They do not use Curriculum's four completion slots or `onComplete`
contract. Register their route, Skills hub entry and public guide together.

**Teacher tools** at `/teachers` are account-free and store nothing: lesson
planning with automatic scheduling, a printable practice-sheet builder (Years 1–6
Maths, English, Science, History, plus Year 3 Geography), topic briefings,
report-comment drafts and 12 parent guides (`/parent-guides/:slug`). Contracts:
[ARCHITECTURE.md](ARCHITECTURE.md#teacher-tools).

## 2. Tech stack

React 19, Vite 7, React Router 7 and plain CSS. Node/Express + MongoDB provide the
production API. Shared kits use SVG/CSS diagrams, `@hello-pangea/dnd`, Leaflet and
Three.js where appropriate. Node's test runner covers pure logic/server code;
Vitest + Testing Library + jsdom cover components. Deployment's Node version and
build configuration: [render.yaml](../render.yaml).

Development defaults to the browser store. The exact build-time setting
`VITE_USE_API=true` selects API mode; production uses API + MongoDB. Browser
storage is not a secure account boundary or a cross-device backup.

```sh
npm run dev:web                 # frontend only
npm run dev                     # frontend + API; API needs local configuration
npm run lint
npm test                        # Node suites, then Vitest component suites
npm run build                   # Vite build + public-page prerendering
npm run check:seo               # built HTTP/crawl + local Chrome checks

npm run topic:context -- --year N --subject SUBJECT --topic TOPICID
npm run scaffold:topic -- --year N --subject SUBJECT --topic TOPICID --game src/path/to/SubjectGame.jsx
npm run check:topic -- --year N --subject SUBJECT --topic TOPICID
npm run check:course -- --year N --subject SUBJECT
npm run check:journey -- --year N --subject SUBJECT
```

Scaffolding previews by default; `--write` creates files without overwriting.
Read [OPERATIONS.md](OPERATIONS.md) before seeding, database audits or
deployment; `seed` changes the configured database.

## 3. Folder structure

| Location | Responsibility |
|---|---|
| `src/pages/skills/` | Standalone games, 3D worlds and subject/year challenge wrappers/shared games |
| `src/pages/curriculum/` | Curriculum selection, loader, lessons, completion and navigation |
| `src/pages/teachers/` | Teacher tools |
| `src/components/challenge/` | Interaction kit, diagrams, lesson/story/adventure frames |
| `src/data/challenges/`, `src/data/lessons/` | Pure builders, authored banks and teaching examples |
| `src/data/store/`, `src/hooks/`, `src/context/` | Store drivers and account/progress/rewards integration |
| `shared/`, `server/` | Shared document rules/catalogues, API and database code |
| `tests/components/`, `scripts/` | Playthroughs and local authoring/verification tools |
| `docs/curriculum/` | Verbatim statutory requirements and topic mappings |
| `docs/templates/` | Course start prompt, topic brief, strand-agent brief, working course record |
| `.claude/skills/` | Plain-Markdown task checklists any agent can read |

## 4. Key decisions

Detail and source links: [ARCHITECTURE.md](ARCHITECTURE.md).

- **Routing.** [src/main.jsx](../src/main.jsx) owns routes. A curriculum
  challenge uses `/year/:year/:subject/problem/:categoryId/:topicId/:challengeId`.
- **Curriculum data.** [curriculumRegistry.js](../src/data/curriculumRegistry.js)
  maps year/subject to a dataset. Each topic has four slots. Titles often
  generate IDs used in URLs and saved progress: shipped IDs are permanent. Read
  the topic's mapping in [curriculum/](curriculum/) before authoring; never
  paraphrase statutory text.
- **Challenge loading.** A static Vite glob expects
  `src/pages/skills/<subject>/challenges/yearN/<topic-id>/<PascalTopicId>Challenge1.jsx`.
  Use context/scaffold output rather than hand-spelling paths.
- **Challenge contract.** A wrapper default-exports a component accepting
  `onComplete`, passed through unchanged to preserve `{ combos }`.
  `ChallengeShell` owns retry, feedback and completion. Games never write
  progress. Banks are pure with an injected `rng`.
- **Progress.** Per `(childId, year, subject)`. Read the
  [progress skill](../.claude/skills/curriculum-progress/SKILL.md) before
  changing IDs, persisted data, completion, access or award membership. Failed
  reads stay errors, never writable empty data. `countsTowardYear` is
  independent of playability and defaults to true; exclude staged additions.
- **Theming.** [App.css](../src/App.css) owns paired `--light-*`/`--dark-*`
  tokens; theme classes go on `body`.
- **Accounts.** Parent accounts and self-managed learner accounts both exist.
  UI uses the common async store, never a concrete driver. Keep children, years,
  subjects, progress and rewards isolated.
- **Backend.** Express serves the API and built frontend from one origin with
  HTTP-only session cookies; routes enforce child ownership; storage/API failures
  stay visible.
- **Rewards.** XP/streaks, badges, certificates and progress summaries have
  shared rules: extend those layers instead of adding another store or counter.

## 5. Playbooks

| Task | Guide | Maintained example |
|---|---|---|
| All four Curriculum topic challenges | [AUTHORING.md](AUTHORING.md), [VISUAL_RECIPES.md](VISUAL_RECIPES.md) | [Year 5 Maths game](../src/pages/skills/math/challenges/year5/Year5MathGame.jsx), [bank](../src/data/challenges/year5Math/questions.js), [playthrough](../tests/components/year4MathPlaythrough.test.jsx) |
| A single Curriculum challenge | [AUTHORING.md](AUTHORING.md), [loader contract](ARCHITECTURE.md#challenge-execution-and-teaching-presentation) | [Maths slot wrapper](../src/pages/skills/math/challenges/year5/place-value-to-a-million/PlaceValueToAMillionChallenge1.jsx) |
| New Curriculum year or subject | [Course integration](AUTHORING.md#new-course-integration), [start prompt](templates/course-start-prompt.md) | [Year 5 Science dataset](../src/data/year5ScienceCurriculum.js), [test](../src/data/year5ScienceCurriculum.test.js) |
| Standalone Skills Mode game | [SKILLS_AUTHORING.md](SKILLS_AUTHORING.md) | [Money Match](../src/pages/skills/math/MoneyMatch.jsx), [generator](../src/data/freePlay/money.js) |
| Another real star system | [Star-system skill](../.claude/skills/add-star-system/SKILL.md) | [System registry](../src/pages/skills/geography/systems/registry.js) |
| Progress/persistence | [Progress skill](../.claude/skills/curriculum-progress/SKILL.md) | [Progress playthrough](../tests/components/progress.test.jsx) |

## 6. Conventions

Preserve permanent IDs, learner progress and earned awards. Keep statutory
boundaries, British English, answerability, visual/lesson alignment and
sound-off accessibility. Use focused checks during work and the full
lint/tests/build once before merge ([VALIDATION.md](VALIDATION.md)). Report
technical, content and device review separately: passing tests do not close
human review.

## Keeping docs current

Keep this page under 1,500 words. When something ships, update the focused
reference it changes (architecture, inventory, operations) and remove it from
PROJECT_IDEAS. Don't add dated build records, trackers or changelogs; git keeps
history. Working notes for a build go in gitignored `.superpowers/`.
