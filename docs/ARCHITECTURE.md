# Current architecture

Use [AUTHORING.md](AUTHORING.md) for the authoring workflow and task-specific `.claude/skills/` guides before implementation. This page describes code boundaries and contracts; the source files linked below decide current behaviour.

## App, routes and identity

[main.jsx](../src/main.jsx) creates the React app and browser router under theme, authentication and rewards providers. [RootLayout](../src/layouts/RootLayout.jsx) supplies the shared shell. Route-level imports defer game and account code until needed. [App.css](../src/App.css) owns the `--light-*` / `--dark-*` theme tokens; components must work in both themes with large touch targets.

Skills Mode is standalone and ungated at `/skills` and `/skills/<game>`. Curriculum Mode uses `/curriculum`, `/curriculum/year/:year/:subject` and `/year/:year/:subject/problem/:categoryId/:topicId/:challengeId`. [RequireChild](../src/components/RequireChild.jsx) requires a selected child profile for curriculum progress and the child's Trophy Room. This identity requirement is separate from challenge access: **all built curriculum challenges are open**, regardless of completion. Public teaching guides and the daily puzzle have their own ungated routes.

[AuthContext](../src/context/AuthContext.jsx) owns account/profile state. Progress belongs to the active child, not the parent account or browser as a whole. Keep identity, gameplay, completion and persistence in their existing layers rather than calling a concrete storage driver from a game.

The ungated `/teachers/planning` route lazy-loads the teacher planning preview.
`src/data/teacherPlanning.js` holds fictional evidence and pure planning rules;
`teacherPlanningResources.js` resolves existing Year 3 maths and Skills references
with injected built availability. The page keeps its draft in React state only
and provides a separate print view. It does not write account, progress or
assessment records. The shared footer links to the preview; `APP_PAGES` recognises
direct server requests while keeping the route outside indexable public pages.
`teacherResourceCatalogue.js` supplies additional teacher labels, reviewed
learning-need aliases and scope independently of permanent curriculum IDs.
`teacherResourceExamples.js` adapts real pure question builders into read-only
examples. `TeacherResources.jsx` provides the finder and simplified example
models without mounting challenge runners or accessing the store.
`TeacherClassInput.jsx` collects class judgement or reviewed CSV/TSV topic totals;
`teacherClassInput.js` validates imports and compiles evidence independently of
learner progress. No sample evidence is loaded by default. The generator uses
confirmed learning focuses to narrow activities and teaching prompts, weights
extra slots by priority and freezes evidence/source/revision in the plan. Input
changes require application and explicit draft replacement; all state is unsaved
and class-level, with no new API or pupil-data persistence.
`getTeacherCurriculum` in `teacherPlanningResources.js` now indexes every topic
and challenge in the selected registry dataset, with injected built availability
and metadata from `lessons/index.js` where available. It supplies dynamic
objectives/learning focuses as well as resources. Quick entry, import review and
the resource finder share these arrays. Search retains matching resource IDs;
input compilation validates them and plan snapshots copy them. Year/subject
changes require confirmation before clearing unsaved input/plan state. Existing
lesson notes supply wider planning content; detailed pilot descriptions are
additional metadata rather than a limit on discoverable resources.
Generated plans initially show a weekly outline. The page tracks one active
lesson by its stable draft ID; `LessonCard` separates the readable teaching
sequence from its explicit editing mode. Reordering is a separate display mode.
All edits still update the same in-memory draft, and the independent print view
includes every lesson regardless of which lesson or editing controls are open.

## Registry, datasets and implementation availability

[curriculumRegistry.js](../src/data/curriculumRegistry.js) is the registry for years 1–6, 12 subjects and 33 available year/subject pathways. It is not a promise that every possible year/subject pairing exists or that every registered challenge has a component. Use `findCurriculum` / `loadCurriculum` and inspect the target dataset.

Datasets under `src/data/` define categories, topics and challenge titles/IDs. Category/topic IDs derived from titles are permanent URL and progress keys. Renaming a title that generates an ID requires a deliberate migration; it is not a cosmetic edit. The statutory boundary and topic mappings live in [curriculum/](curriculum/): read the target mapping row and referenced requirement before authoring questions, and preserve statutory text verbatim.

[challengeAvailability.js](../src/data/challengeAvailability.js) derives implementation availability from a Vite static glob. [challengeModules.js](../src/pages/curriculum/challengeModules.js) supplies the loader glob. Keep these patterns aligned. Pure progress and navigation modules receive an `isBuilt(topicId, challengeId)` callback instead of importing Vite-only availability code.

`available` and `countsTowardYear` serve different purposes. A playable pathway can stay outside overall year certificates/milestones through `countsTowardYear: false`. Missing flags count toward the year. Explicitly exclude unfinished new curricula and preserve existing award membership; registration must not silently take away a previously earned year award.

## Challenge execution and teaching presentation

[ProblemView.jsx](../src/pages/curriculum/ProblemView.jsx) coordinates hydrated progress, the selected challenge, completion, rewards, celebration and next navigation. [Challenge.jsx](../src/pages/curriculum/Challenge.jsx) loads the default-exported component by the route parameters. Its expected location is:

```text
src/pages/skills/<subject>/challenges/yearN/<topic-id>/<PascalCaseTopicId>Challenge1.jsx
```

Each of the four slot wrappers must default-export a component accepting `onComplete`; a finished run calls `onComplete({ combos })`. Preserve that payload when wrapping a shared game. The static `import.meta.glob` is required for production bundling: a fully variable source-path import cannot replace it. A missing module means unavailable content; a registered module whose import fails gets retry UI instead of being labelled unbuilt.

Shared subject games and pure banks provide reusable interactions. [DataChallenge](../src/components/challenge/data/DataChallenge.jsx) supports the kinds in [questionKinds.js](../src/data/challenges/questionKinds.js), but generic controls do not automatically supply a subject's teaching frame. Extend the existing subject renderer when a topic needs diagrams, maps, story/evidence cards or manipulatives. See the [visual recipes](VISUAL_RECIPES.md) for the illustrated introduction, separately authored worked examples and useful question representations expected in built courses.

[lessons/index.js](../src/data/lessons/index.js) resolves optional subject/year/topic/slot lessons displayed through [LessonFrame](../src/components/challenge/lesson/LessonFrame.jsx). Some subjects supply introductions inside their own games. Keep the model used to explain an idea consistent with the model used to answer it. Questions must derive pictures from visible givens or authored evidence, never hidden answers.

## Progress, stores and server

Read the [curriculum-progress skill](../.claude/skills/curriculum-progress/SKILL.md) before changing IDs, storage, completion, access or award rules. Never reset learner data as a development shortcut.

[progressRules.js](../src/data/progressRules.js) contains pure completion predicates and an idempotent completion reducer. [curriculumLocks.js](../src/data/curriculumLocks.js) supplies the shared view used by the curriculum screen and [curriculumNavigation.js](../src/data/curriculumNavigation.js). Its lock flags remain false; availability and completion are separate. Completion requires membership of every built challenge, not an array length. Empty/unbuilt topics do not receive completion awards.

[useProgress.js](../src/hooks/useProgress.js) binds the rules to the active child's document. [progressPersistence.js](../src/data/progressPersistence.js) handles reads and ordered saves. Hydration and document-identity guards prevent the initial empty state or an outgoing child's state from being saved into another document. Failed reads remain errors with retry; they must never become writable empty progress.

Consumers import the async store through [store/index.js](../src/data/store/index.js). Development defaults to [localStorageStore](../src/data/store/localStorageStore.js); production uses [apiStore](../src/data/store/apiStore.js) with API + MongoDB. Only the exact build-time value `VITE_USE_API=true` selects API mode; changing it requires rebuilding. Local collections are `dl.parents`, `dl.children`, `dl.progress` and `dl.rewards`.

There is one progress document per `(childId, year, subject)`. Its `data` tree remains:

```js
{ [categoryId]: { topics: { [topicId]: { completedChallenges: [1, 2] } } } }
```

[progressDocument.js](../shared/progressDocument.js) reads versioned documents (current schema version 1; absent means 1), preserves unknown fields and unions completions from stale saves. New IDs/shapes require numbered migrations before shipping. [progressData.js](../shared/progressData.js) validates the tree. Writes normalise challenge IDs to numbers; reads tolerate legacy numeric strings.

[server/app.js](../server/app.js) builds the Express API and serves the built frontend in production. [progress routes](../server/routes/progress.js) authenticate requests and enforce child ownership, then merge through shared helpers and [learningWrites.js](../server/learningWrites.js). API network/response failures throw rather than masquerading as missing data. Rewards are separate documents and rules; [ProblemView](../src/pages/curriculum/ProblemView.jsx) guards additive rewards against duplicate callbacks within a run.

## Verification boundary

[package.json](../package.json) defines commands. React-free rules, banks, shared helpers and server tests run with Node's test runner; [Vitest configuration](../vitest.config.js) runs `tests/components/` playthroughs in jsdom. Keep Vite globals out of Node-tested pure modules. Run lint, the complete tests and the production build; the build also prerenders public pages.

Use browser checks only for gaps jsdom cannot show, following [AGENTS.md](../AGENTS.md). Technical checks, content review, device review and owner/learner review are separate evidence. Existing files, generated wrappers and passing tests do not certify statutory coverage, teaching quality or physical-device usability.
