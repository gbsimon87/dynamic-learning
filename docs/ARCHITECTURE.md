# Current architecture

Use [AUTHORING.md](AUTHORING.md) for the authoring workflow and task-specific `.claude/skills/` guides before implementation. This page describes code boundaries and contracts; the source files linked below decide current behaviour.

## App, routes and identity

[main.jsx](../src/main.jsx) creates the React app and browser router under theme, authentication and rewards providers. [RootLayout](../src/layouts/RootLayout.jsx) supplies the shared shell. Route-level imports defer game and account code until needed. [App.css](../src/App.css) owns the `--light-*` / `--dark-*` theme tokens; components must work in both themes with large touch targets.

Skills Mode is standalone and ungated at `/skills` and `/skills/<game>`. Curriculum Mode uses `/curriculum`, `/curriculum/year/:year/:subject` and `/year/:year/:subject/problem/:categoryId/:topicId/:challengeId`. [RequireChild](../src/components/RequireChild.jsx) requires a selected child profile for curriculum progress and the child's Trophy Room. This identity requirement is separate from challenge access: **all built curriculum challenges are open**, regardless of completion. Public teaching guides and the daily puzzle have their own ungated routes.

[AuthContext](../src/context/AuthContext.jsx) owns account/profile state. Progress belongs to the active child, not the parent account or browser as a whole. Keep identity, gameplay, completion and persistence in their existing layers rather than calling a concrete storage driver from a game.

**Sign-up** is one question per screen; steps and skips are pure data in
[signupFlow.js](../src/data/signupFlow.js). The draft lives in `sessionStorage`
(`dl.signupDraft`) and never holds the password or birth year; only the age band
is stored. Under-13s are gated with no request made. `POST /api/auth/signup/code`
sends a six-digit code; `POST /api/auth/signup/complete` checks it and creates the
parent and all children (1–6, or exactly 1 for a learner account) in one request,
rolling back on failure. Codes ([signupCodes.js](../server/signupCodes.js)) are
HMAC-hashed with `SESSION_SECRET`, expire after 10 minutes, allow 5 attempts,
resend after 30 s, at most 5 sends an hour per email, single use. Validation runs
before the code is touched, so a typo never burns an attempt. Verification runs
only when `RESEND_API_KEY` and `EMAIL_FROM` are both set (or in non-production log
mode); otherwise `emailVerified: false` is stored. Older accounts lack the field,
meaning "never asked".

## Registry, datasets and implementation availability

[curriculumRegistry.js](../src/data/curriculumRegistry.js) is the registry for years 1–6, 12 subjects and the pathways in [CURRICULUM_INVENTORY.md](CURRICULUM_INVENTORY.md). It is not a promise that every possible year/subject pairing exists or that every registered challenge has a component. Use `findCurriculum` / `loadCurriculum` and inspect the target dataset.

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

## Curriculum introductions and quizzes

Introductions and Quest Mastery / Subject Final Test quizzes sit beside
challenges. They never call `completeChallenge`, award XP or stickers, or affect
year awards. On by default; set both switches to `"false"` to roll back: `VITE_ENABLE_CURRICULUM_JOURNEY` (build time,
[curriculumJourneyFlag.js](../src/data/curriculumJourneyFlag.js)) and
`ENABLE_CURRICULUM_JOURNEY` (server); release steps are in
[OPERATIONS.md](OPERATIONS.md#curriculum-introductions-and-quizzes).

- **Content** is one introductions file and one assessment bank per pathway
  (`src/data/curriculumIntroductions/<subject>/year<N>.js`,
  `shared/curriculumAssessments/<subject>/year<N>.js`), found by convention.
  `shared/curriculumJourneyManifest.js` is generated
  (`npm run journey:manifest -- --write|--check`); the server validates scopes
  against it and never trusts a client claim of availability. Authoring:
  [JOURNEY_AUTHORING.md](JOURNEY_AUTHORING.md).
- **Records** live in their own collections (`curriculumJourney`,
  `curriculumAssessments`; `dl.*` locally), separate from progress and rewards,
  removed by child/account deletion. The journey document key is
  `(childId, year, subject)`; acknowledged scope IDs are `subject`,
  `quest:<categoryId>` and `topic:<categoryId>:<topicId>`, merged by union.
- **Sessions** snapshot their items at start, so resume and results ignore later
  bank edits. A quest quiz takes one item per built topic; a subject final two
  per built quest, preferring items not in the previous attempt. Answers are sent
  raw and scored on the server. Only the first unanswered item accepts a
  submission. Writes use revision compare-and-swap plus an idempotent
  `submissionId` ([curriculumAssessmentRules.js](../shared/curriculumAssessmentRules.js);
  409 codes `REVISION_CONFLICT`, `ITEM_ALREADY_ANSWERED`, `ITEM_OUT_OF_ORDER`,
  `SUBMISSION_ID_REUSED`, `SESSION_COMPLETE`, `INCOMPLETE_ASSESSMENT`). Item IDs
  contain dots, which `server/security.js` rejects as JSON keys, so responses are
  arrays carrying `itemInstanceId`; sessions are capped at 256 items.
- **Serialisation** is an allowlist: `scoring` never leaves the server; `review`
  appears only for submitted items. Summaries count answered = correct +
  incorrect, with skips in the denominator. There is no pass mark or mastery label.
- `getCurriculumReviewActions` ([curriculumJourney.js](../src/data/curriculumJourney.js))
  offers quizzes on built-content completion (`buildLockState`), not
  `fullCategoryComplete`/`fullSubjectComplete`, which need every planned
  challenge and gate awards. Quiz routes (`.../quest/:categoryId/mastery`,
  `.../final-test`) must stay in `curriculumPaths()` in
  `src/seo/entry-server.jsx`; React routes alone give HTTP 404.

## Teacher tools

All `/teachers` pages are ungated, account-free and store nothing typed into
them: drafts live in React state and printing/PDF keeps a copy. They use
`TeacherWorkspace.jsx` and its CSS (teacher-only layout; parent guides stay
independent). They never write account, progress or assessment records, and
authored content is technically validated, not teacher-reviewed.

- **Planning** (`/teachers/planning`, noindex): `teacherPlanning.js` holds pure
  planning rules and the optional fictional demo evidence;
  `getTeacherCurriculum` in `teacherPlanningResources.js` indexes every topic and
  challenge in the selected dataset with injected built availability and lesson
  metadata. `teacherResourceCatalogue.js` adds labels and learning-need aliases
  independent of permanent IDs; `teacherResourceExamples.js` adapts real pure
  builders into read-only examples (no challenge runners, no store). Plans
  snapshot evidence, sources and matching activity IDs. Year changes with
  unsaved work need confirmation.
- **Class input** (`teacherClassInput.js`): pasted results need headers
  `Topic,Correct,Answered` (optional `Expected,Skipped`) and are rejected
  atomically when malformed; limits 20,000 characters, 50 rows, counts up to
  100,000, 9 focuses. Priority heuristics (check below 2 answers or under 75%
  coverage; teach under 60% correct, practise 60–79%, retrieve from 80%) are
  provisional prompts, not diagnoses. Named pupil records are unsupported.
- **Briefing notes** are the single source of subject knowledge.
  `teachingFromBriefing` derives plan text: pilot objectives first, then notes,
  then a generic fallback. A note entry has `statutory` (1–2 verbatim quotes from
  `programmeOfStudy(year, subject)`, checked by `teacherBriefings.test.js`),
  `inBrief`, `keyFacts` (3–5, ending with what the year does not expect),
  `misconceptions` (2–3 of mistake/why/response), `vocabulary` (4–8), `before`
  and `next`. Register a set in `NOTES` in `teacherBriefings/index.js`.
- **Practice sheets** (`teacherPractice/`): finite question pools, never padded
  with repeats; dictation scripts only in the answer key; picture clues stay
  pictures; topics from different years cannot be combined. Adapters use
  explicit `source` identifiers, never `Function.name` (see
  [engineering rules](ENGINEERING_RULES.md)).
- **Parent guides** ([parentExplainers.js](../shared/parentExplainers.js)) stay
  noindex until their slug is in `REVIEWED`.

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

## Security boundaries

- User text stays text: React escapes it; ESLint blocks raw HTML sinks,
  `dangerouslySetInnerHTML`, `eval`, dynamic functions and `javascript:` URLs.
  Profile colours render through a token whitelist, never stored CSS strings.
- Shared validation bounds nicknames (20 code points, no control characters),
  emails (254 characters, scalar only), passwords (8–1,024 for new signups,
  never trimmed) and six-digit signup codes.
- [server/security.js](../server/security.js) runs before API handlers: rejects
  cross-site writes (Fetch Metadata + Origin against `PUBLIC_APP_URL`), requires
  `application/json` bodies, rejects `$`/dotted/`__proto__`/`constructor`/`prototype`
  keys recursively with bounded nesting, returns safe parse errors (1 MB limit),
  and sets a strict same-origin CSP plus no-sniff, no-referrer, frame denial,
  HSTS (production) and `no-store` API responses. No permissive CORS.
- Sessions are HS256-only HTTP-only SameSite cookies; password reset revokes
  sessions; MongoDB queries are ownership-constrained.
- Limits: browser-store mode has no security boundary against whoever controls
  the device; learning results are accepted from the authenticated client (no
  server grading); auth throttling is in memory per process
  ([authThrottle.js](../server/authThrottle.js)).

## Verification boundary

[package.json](../package.json) defines commands. React-free rules, banks, shared helpers and server tests run with Node's test runner; [Vitest configuration](../vitest.config.js) runs `tests/components/` playthroughs in jsdom. Keep Vite globals out of Node-tested pure modules. Run lint, the complete tests and the production build; the build also prerenders public pages.

Use browser checks only for gaps jsdom cannot show, following [AGENTS.md](../AGENTS.md). Technical checks, content review, device review and owner/learner review are separate evidence. Existing files, generated wrappers and passing tests do not certify statutory coverage, teaching quality or physical-device usability.
