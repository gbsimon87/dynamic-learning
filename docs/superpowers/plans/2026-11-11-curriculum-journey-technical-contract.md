# Curriculum journey — implementation contract

Companion to the [feature plan](2026-11-11-curriculum-introductions-mastery.md).
Reviewed against source on **2026-11-11**. This document specifies future work;
none of the proposed modules, methods or commands below exists yet.

Use these defaults without asking the owner to redesign routine details.
Keep the owner's decisions: all built pathways at launch; results and practice
suggestions; retries; no pass mark. Record a necessary deviation and its reason
in the [handoff record](../2026-11-11-curriculum-journey-handoff.md).

## 1. Implementation constraints and source seams

| Existing source | What the implementing model must preserve/use |
|---|---|
| `src/data/curriculumRegistry.js` | Enumerate years/subjects with `loadCurriculum`; keep existing permanent IDs and award membership. Do not trust stale counts in comments. |
| `scripts/curriculum/topics.js` | Reuse `wrapperPaths`, `pascalTopicId` and mapping/context helpers for filesystem enumeration. Some IDs contain repeated hyphens; never normalise them again. |
| `src/data/challengeAvailability.js`, `src/pages/curriculum/challengeModules.js` | Vite glob is authoritative in the browser. Node/server code cannot import this availability module. Inject availability into pure rules. |
| `src/pages/curriculum/ProblemView.jsx` | Existing completion/rewards orchestration and `{ combos }` callback remain intact. Add review actions after calculating before/after completion. |
| `src/components/RequireChild.jsx` | Preserve login/profile and existing `/hello` onboarding redirects; wrap its final Outlet in the feature's session-memory provider when enabled, keyed by the active child. |
| `src/components/celebration/CompletionCelebration.jsx` | Presentation only. Add an optional review-action prop; do not write quiz/progress records inside it. |
| `src/data/curriculumNavigation.js` | Keep `findNextChallenge` return type and callers compatible. Add a separate review-action resolver. |
| `src/data/curriculumResume.js` | Homepage/profile resume stays challenge based initially. Do not write fake progress to make quizzes appear here. Map links expose saved quizzes. |
| `src/hooks/useProgress.js`, `src/data/progressPersistence.js` | Model successful-read hydration, document identity, ignored stale responses and ordered writes. Do not rewrite their existing behaviour. |
| `src/data/store/index.js` | Existing build-time store choice remains. Both concrete drivers are statically imported, so a top-level import of every quiz bank would affect API-mode bundles too. Load local assessment content inside local-only methods. |
| `server/middleware.js` | Run `requireAuth`, then `requireOwnedChild`; scope every subsequent lookup to `req.child._id`. Child IDs are Mongo ObjectIds on the server. |
| `server/learningWrites.js` | Existing merge-and-retry helper suits monotonic journey acknowledgements. It does not by itself enforce a quiz client's expected revision; quiz writes need their own explicit compare-and-swap. |
| `server/app.js` | Register new routers before JSON `/api` 404. Keep existing body limits, safe-object validation, cookie/origin checks and API `no-store`. |
| `server/routes/children.js`, `server/routes/auth.js` | Extend child and whole-account deletion for both new collections; local store has separate versions of both methods. |
| `shared/seo.js`, `src/seo/entry-server.jsx`, `scripts/prerender.js`, `server/seo.js` | `curriculumPaths()` produces `dist/route-manifest.json`; the server uses it for dynamic curriculum HTTP recognition. Add actual new quiz paths there as well as page metadata; React routes alone are insufficient. Keep them out of public paths/sitemap. |

All new pure modules use explicit `.js` relative imports and no JSX, DOM, Vite
globals or React. They must import under `node --test`. Reuse source controls and
models where useful; do not mount `ChallengeShell`, `DataChallenge`,
`HistoryChallenge` or `GeographyChallenge` as the assessment runner.

`DataRound` is exported, but submits a correctness boolean; its `KindControl` is
private and some question objects contain nested answers (`cards[].bin`, etc.).
Reusing it wholesale would lose the raw first response and leak scoring data.
Use a dedicated controlled assessment round, reusing lower-level controls.

## 2. Built-content manifest and feature activation

Create `scripts/curriculum/journeyManifest.js` and a generated, plain-data
`shared/curriculumJourneyManifest.js`. Enumerate registered datasets and existing
wrapper files with the same path convention as the loader. Include only topics
with at least one built challenge and quests with at least one built topic.

Each pathway entry contains `{ year, subject, categories: [{ id,
topics: [{ id, challengeIds }] }] }`. Preserve registry order and numeric
challenge IDs. No timestamps or
machine-specific paths. The browser checker compares this with real Vite
availability; the generation/check script compares it with actual source files.
The server validates assessment scopes against this manifest, never a client
claim of availability. Registry data remains the source for names/content order.

Add proposed commands:

```sh
npm run journey:manifest -- --write        # regenerate generated IDs only
npm run journey:manifest -- --check        # fail on stale generated manifest
npm run check:journey -- --inventory       # list coverage/gaps, exit 0 for gaps
npm run check:journey -- --year 3 --subject math
npm run check:journey -- --all              # strict full-launch check
```

Both strict modes exit nonzero for missing or invalid content. `--inventory`
still fails for malformed source/arguments. It must label gaps, not call them
passes. Write operations never overwrite authored content.

Use `VITE_ENABLE_CURRICULUM_JOURNEY=true` and
`ENABLE_CURRICULUM_JOURNEY=true` as explicit frontend/backend development/release
flags, default off during implementation. Both affect only this new feature.
No change to `VITE_USE_API` semantics. Pass backend enablement through
`createCurriculumJourneyRouter({ enabled })`, injected by an optional journey
configuration in `createApp`, so tests can enable it without racing over global
environment variables. Content-loader/time/ID dependencies can also be injected
in service tests so protocol checks do not depend on all 39 banks being finished.
When disabled, retain the existing learner
flow; new API routers authenticate/validate ownership, then return
`503 JOURNEY_DISABLED`. Enable together for the all-pathway release after strict
coverage and validation. Never ship a flag-enabled partial catalogue as the
agreed full launch. Existing records survive flag rollback.

## 3. Introduction content and display contract

Create pure authored modules at
`src/data/curriculumIntroductions/<subject>/yearN.js`, plus a lazy `index.js`.
Export one pathway object:

```js
{
  year: 3, subject: "math",
  subjectIntroduction: { /* Introduction */ },
  quests: {
    [categoryId]: {
      introduction: { /* Introduction */ },
      topics: { [topicId]: { /* Introduction */ } }
    }
  }
}
// Introduction:
{
  version: 1,
  title: "Fractions of a group",
  learning: ["Find equal shares of a group."], // 1–3 short statements
  usefulness: "Share counters fairly when you play a game.",
  example: { text: "Share 12 counters between 4 players. Each gets 3.",
    model: { renderer: "equal-groups", data: { /* explicit visible givens */ },
      alt: "Twelve counters in four equal groups of three." } },
  sources: [{ path: "docs/curriculum/year-3-maths.md",
    heading: "Number — fractions", topicId: "fractions-of-a-set-of-objects" }]
}
```

The example illustrates the shape; author/validate actual model data against
its renderer before use. Each intro needs useful visual data and a text
equivalent, not a decorative icon accepted as a learning model. Reuse SVG/CSS
assets, not image-generation dependencies. Subject/quest examples can show
several connected ideas through one concise model. Target roughly 40–80 words
at subject/quest level and 25–60 at topic level; these are editing targets, not
padding requirements. Use the selected year's language level.

Stable acknowledgement scope IDs:

- `subject`
- `quest:${categoryId}`
- `topic:${categoryId}:${topicId}`

Use exact existing IDs, including repeated hyphens. New content versions are
stored for provenance, but acknowledgement of any prior version suppresses the
automatic screen. A manual replay always loads the latest available content.
Continue and Skip have the same persistence meaning: this intro need not be
automatically shown again. Do not collect separate viewing analytics.

### Entry sequence

Create `CurriculumEntryBoundary` and `useCurriculumJourney`. Apply the boundary
at the subject map, challenge view and assessment entry. It renders before
mounting a challenge runner, so the runner cannot start or reward behind it.

| Target | Automatic intro scopes, in order |
|---|---|
| Subject map | Subject only |
| Challenge | Subject, quest, topic |
| Quest quiz | Subject, quest; no topic teaching that reveals quiz answers |
| Subject final | Subject only |
| Explicit replay | Exactly the requested scope, whether acknowledged or not |

Render pending screens in place at the destination URL; no arbitrary `returnTo`
URL parameter is needed. The URL therefore survives refresh. Use search
parameters for explicit replay (`?intro=subject`, or `?intro=quest&category=…`,
or `?intro=topic&category=…&topic=…`) on the subject map only, validated against
the current pathway. Remove replay parameters with replace after closing.
Invalid replay parameters show a safe map-level message and no write.

- Continue acknowledges the current scope, then shows the next pending screen.
- Skip acknowledges the current scope and advances in the same way.
- “Go straight to activity” acknowledges all remaining scopes in this entry
  sequence in one request, then enters the destination. It never marks unrelated
  topics/quests acknowledged.
- On save failure, keep the acknowledgement pending with Retry and “Continue
  for now”. The latter suppresses it in memory for this child/pathway/session
  only, explicitly warning that it may return after refresh. Retry retains the
  captured original child/key; it must not write into a newly selected profile.
- A failed journey read offers Retry and “Continue for now” without issuing
  acknowledgement writes. No empty document is created from that failed read.
  Existing progress loading/errors still follow their own contract.
- Missing intro/content imports: show Retry for load errors; preserve challenge
  access with Continue for now. The strict release checker must prevent missing
  authored entries. Do not guess generic text from titles at runtime.

Scope component state by `(childId, year, subject, destination)` immediately on
render; ignore late loads/writes after that key changes. A single journey hook
instance serves each route boundary/child view, rather than three independent
hooks racing to show the same screen. Keep the quest rail from remounting on
ordinary acknowledgement updates and preserve its position on replay return.

Use a `CurriculumJourneySessionProvider` around the final Outlet in
`RequireChild`, keyed by active child ID, for in-memory Continue-for-now scope
sets across route changes. It does not read/write storage on mount. Losing this
memory on refresh, sign-out or child switch is intentional; it must not leak to
another child. Hook requests/acknowledgements still carry their captured full
document key. Feature-disabled paths use the current Outlet flow without new
journey reads, writes or automatic intros.

## 4. Quiz content, selection and response contract

Use `shared/curriculumAssessments/<subject>/yearN/` with `index.js` and one
authored file per quest where helpful. All item and scoring data must be
JSON-serialisable. A shared lazy index resolves `(year, subject)` without
loading all pathways on app startup. Do not import React renderers into banks.

Author **at least three distinct reviewed candidate items per built topic**.
An adapted/generated item is acceptable after independent answer and visual
review; preserve a stable item ID/version and materialise all values when the
session starts. A generator alone, without reviewed cases and bounded sampling,
is not a completed pool. Current minimum: 2,769 candidate items for 923 topics.
Vary facts/contexts/representations, not just option order.

```js
// Private materialised candidate, before a session is stored:
{
  id: "fractions-of-a-set-of-objects.equal-share.a", version: 1,
  categoryId: "number---fractions", topicId: "fractions-of-a-set-of-objects",
  objective: "Find a unit fraction of a set.",
  sourceRefs: [/* saved mapping path + topic/heading */],
  public: {
    prompt: "What is one quarter of 12 counters?",
    evidence: [], // authored text/passage/source cards/tables with credits
    model: { renderer: "equal-groups", data: { /* givens only */ }, alt: "…" },
    input: { kind: "number", maxDigits: 2, label: "Number of counters" },
    speech: { mode: "prompt", lang: "en-GB", text: "…" }
  },
  scoring: { kind: "number", accepted: [3] },
  review: { answerText: "3 counters", explanation: "12 shared into 4 equal groups is 3 in each group." },
  practice: { topicId: "fractions-of-a-set-of-objects", challengeId: 1 }
}
```

Dots in authored item **values** are allowed; do not use these IDs as client
object keys, because `server/security.js` rejects dotted JSON keys. Store
responses as arrays/records with an `itemInstanceId` value. Reject unknown item
IDs instead of indexing arbitrary objects with user strings.

Start with these controlled input/scoring pairs. Extend explicitly when a
reviewed subject needs a different representation; do not flatten the whole
curriculum into choice questions just to avoid a needed control.

| Public input | Submitted `value` | Private scorer |
|---|---|---|
| `choice` with `{id,label}` options | Option ID string | Exact accepted ID |
| `number` | Bounded numeric string from keypad | Strict finite numeric parse against accepted values; reject empty/NaN/Infinity; use explicit precision only where the item requires it |
| `text` for spelling/short answer | String, max 120 characters | Explicit accepted strings and case/punctuation policy; no fuzzy marking or broad punctuation stripping |
| `order` with stable card IDs | Array of IDs | Exact permutation, no missing/duplicate/unknown IDs |
| `sort` with card/bin IDs | Array of `{cardId,binId}` | Exact assignments; validate every card/bin, never transmit correct bins before submission |
| `fractionShade` | Array of selected segment indices | Count or exact-set rule declared by the item; validate range/uniqueness |
| `numberTrack` | Integer tick index | Exact accepted tick(s), with denominator/scale visible |

**Input capacity is a release check.** Existing `NumberInput.jsx` accepts only
unsigned whole digits and defaults to three digits; `LetterInput.jsx` accepts
lowercase a–z plus an optional apostrophe. Neither alone supports all Years 1–6
questions. Use an assessment-specific `AssessmentNumberInput` for explicitly
declared signed/decimal entry and sufficient digit counts, reusing the old input
only for compatible items. Provide large sign/decimal buttons and physical
keyboard support; do not strip a minus/decimal and submit a different number.
Accept plain decimal notation only, not exponent/hex/Infinity. Integer items use
safe-integer comparison; decimal items declare allowed decimal places and compare
scaled values without silently rounding an over-precise response into correctness.
Likewise provide `AssessmentTextInput` where French diacritics/case or short
phrases are needed; disable autocorrect/spelling suggestions for spelling tests.
Do not require a character that the available on-screen control cannot produce.
Checker/control tests cover zero, large answers, negative/decimal answers,
apostrophes and accented French, plus any item's maximum-length answer.

Models (charts, clocks, coins, maps, source pictures, etc.) are independent of
response controls. Select existing lower-level controls, such as `ChoiceGrid`,
`NumberInput`, `LetterInput`, `DragToOrder`, `SortBins`, `FractionShadeBoard` and
`FractionNumberTrack`, where their props fit. Models have an explicit renderer
registry and allowed data schema. Renderers consume **only** public givens;
scoring and review objects never enter their props before the answer is saved.
History needs its source/story context; Geography needs sources/keys/units.
Unknown renderers fail the content checker and show recoverable UI if encountered.

### Exact selection rules

1. A quest run selects one candidate from **every built topic** in that quest.
2. A subject final selects two candidates from **every built quest**, from two
   distinct topics where the quest has at least two. If it has one topic, select
   two distinct items from that topic. Empty quests are excluded by the manifest.
3. Prefer candidates not used in the most recent attempt of that same
   quiz. If the pool is exhausted, allow reuse and never promise “never seen
   before”. At least one selected item must differ on a fresh attempt when an
   alternate valid set exists. Reorder alone does not make a fresh set.
4. Shuffle enumerated eligible pools with an injected seeded RNG, select to
   quotas, then shuffle the final run. Bounded operations only; no retry-until-full
   loops. Persist the chosen item snapshots/order, not only a seed.
5. No repeated candidate ID/content fingerprint in one run. Insufficient pools,
   missing adapters and invalid practice targets are explicit content errors.
6. Use four-question sections with a short break/continue screen between them;
   no timer. Resume works at every saved answer, not only section boundaries.

For the current baseline this means 923 question slots across the 216 quest
blueprints and 432 across 39 subject finals. These are selection quotas, not
the size of the candidate bank or a claim of exhaustive statutory assessment.
Topic/quest coverage summaries list what was actually sampled.

### Narration and explanations

- Intro narration is optional and never automatic. Reuse `SpeakButton` and the
  existing sound/language controls, including stopping speech on navigation.
- Each item has an explicit speech policy. Reading assessment passages and
  hidden dictation/spelling answers are not spoken accidentally. French uses
  `fr-FR` for French, with separate English instructions if needed.
- Audio-dependent items need an authored supported fallback; mark that fallback's
  sampled skill honestly (for example, reading support rather than listening).
  Do not silently score the unavailable listening task incorrect or omit its
  topic. Checker requires the fallback where voice support is a dependency.
- No pre-answer worked solution/hint button in a scored run. After the saved
  submission, show a gentle outcome and the item's explanation with Next.
  A wrong answer stays a valid initial response. Explicit skips show the same
  review support but do not become correct answers.
- A replayed explanation from an earlier saved response is read-only and never
  resubmits. A new attempt gets a separate session ID.

## 5. Persisted records and serializers

Use new collection keys `dl.curriculumJourney` and `dl.curriculumAssessments`
locally, and `curriculumJourney` / `curriculumAssessments` in MongoDB. Do not
alter `dl.progress`, `dl.rewards`, existing storage versions or shipped IDs.
New records start at `schemaVersion: 1`; shared readers reject malformed/future
versions without resetting them. Unknown stored metadata survives safe updates.

Journey document:

```js
{
  _id, childId, year: 3, subject: "math", schemaVersion: 1, revision: 1,
  data: { acknowledged: [
    { scopeId: "subject", contentVersion: 1, acknowledgedAt: "ISO timestamp" }
  ] },
  createdAt, updatedAt
}
```

Unique key: `(childId, year, subject)`. Union by scope ID; first accepted
acknowledgement wins, regardless of later copy versions. Repeated acknowledgement
is a no-op. Times come from server/local driver, not the request body.

Assessment document (private driver/server form):

```js
{
  _id, sessionId: "UUID", childId, year: 3, subject: "math",
  kind: "quest", categoryId: "number---fractions", // null for kind: "subject"
  schemaVersion: 1, definitionVersion: 1, revision: 0,
  status: "active", // only "active" or "completed"
  items: [{ itemInstanceId: "UUID", candidateId, candidateVersion,
    categoryId, topicId, objective, sourceRefs,
    public: { /* fixed prompt/evidence/model/input/speech */ },
    scoring: { /* private */ }, review: { /* private until submitted */ },
    practice: { topicId, challengeId } }],
  responses: [{ itemInstanceId, submissionId: "UUID",
    response: { kind: "answer", value: "3" }, // or { kind: "skip" }
    outcome: "correct", // "correct" | "incorrect" | "skipped"
    submittedAt: "ISO timestamp" }],
  summary: null, // filled on completion, derived from responses
  createdAt, updatedAt, completedAt: null
}
```

Unique `(childId, sessionId)`; index `(childId, year, subject, createdAt desc,
sessionId desc)` for deterministic history. Do not make `(scope,status)` unique:
starting fresh can leave a prior active attempt available in history. Session
identifiers never grant access; ownership is always in the query filter.

Completed summary is `{ total, answered, correct, incorrect, skipped,
byTopic: [{ categoryId, topicId, total, answered, correct, incorrect, skipped }] }`.
Invariant: `answered = correct + incorrect`; on completed runs,
`total = answered + skipped`. Partial runs additionally expose `remaining`.
Show “X correct out of T” and separate skipped/remaining counts; never inflate
the score by dropping skips from the denominator. Show no pass/mastery label.

Public IDs are strings, including the Mongo childId, not raw ObjectId objects.
The public session serializer is an **allowlist projection**: identity/scope,
versions/revision/status, public item data, responses, counts and timestamps.
Exclude all `scoring` data on every response, including errors and completed
runs. Return `review` only for items with a persisted submission. Exclude
unsubmitted item review/explanation/answer text on create, get, list and conflicts.
History lists return summaries, not the full private/public item bank.

Snapshots make resume/historical results independent of later edits to question
banks. Completing a run scores against its stored private snapshots, not whatever
the latest bank says. Never fetch client-supplied answers/scoring definitions.

## 6. Store methods, HTTP routes and concurrency

All methods below are async, have identical signatures/results in both drivers,
and validate returned public documents in `apiStore.js`. Throw errors with a
stable `.code` matching the existing API error convention; local errors must
carry the same codes. Only explicit missing values mean absence.

Common HTTP base: `/api/curriculum-journey/:childId/:year/:subject`.

| Store method | HTTP operation and result |
|---|---|
| `getCurriculumJourney(childId, year, subject)` | GET base → `{ journey: docOrNull }`; method returns doc/null |
| `acknowledgeCurriculumIntroductions(childId, year, subject, { acknowledgements })` | POST base + `/acknowledgements`, array of `{scopeId,contentVersion}`, max three → `{ journey: doc }`; method returns doc |
| `getCurriculumAssessmentOverview(childId, year, subject)` | GET base + `/assessments/overview` → `{ scopes: [{ kind, categoryId, latestActive, latestCompleted }] }`; method returns that object. Include every built quiz scope; absent sessions are explicit nulls. |
| `listCurriculumAssessments(childId, year, subject, { kind, categoryId, cursor = null, limit = 20 })` | GET base + `/assessments` with encoded query → `{ sessions: summaries, nextCursor }`; method returns that object |
| `startCurriculumAssessment(childId, year, subject, { sessionId, kind, categoryId })` | POST base + `/assessments` → `{ session: publicDoc }`; method returns publicDoc |
| `getCurriculumAssessment(childId, year, subject, sessionId)` | GET base + `/assessments/:sessionId` → `{ session: publicDoc }`; method returns publicDoc; missing/foreign session is an error |
| `submitCurriculumAssessmentResponse(childId, year, subject, sessionId, { expectedRevision, itemInstanceId, submissionId, response })` | POST base + `/assessments/:sessionId/responses` → `{ session: publicDoc }`; method returns publicDoc |
| `finishCurriculumAssessment(childId, year, subject, sessionId, { expectedRevision })` | POST base + `/assessments/:sessionId/finish` → `{ session: publicDoc }`; method returns publicDoc |

Validate integer registered year, known subject, built quest membership, kind,
UUIDs, response schema/bounds and blueprint availability. For subject tests,
`categoryId` must be null; for quest tests it must be a built category ID. Clamp
neither invalid IDs nor invalid response values into valid ones. Limit history
requests to 1–50 and use an opaque cursor scoped to this child/pathway/filter;
stable order is createdAt/sessionId descending. An empty list is valid; a failed
request is not an empty list.

Error mapping: 400 malformed/unknown scope/invalid response;
401 unauthenticated; 404 foreign/missing child or session;
409 `REVISION_CONFLICT`, `ITEM_ALREADY_ANSWERED`, `ITEM_OUT_OF_ORDER`,
`SUBMISSION_ID_REUSED`, `SESSION_COMPLETE`,
`INCOMPLETE_ASSESSMENT` or `SESSION_ID_REUSED` as applicable;
503 `JOURNEY_DISABLED` or unavailable content. Network failures and malformed
success bodies throw in the API driver. Never return a raw private document in
error details. UI can refetch the authorised public session to resolve a conflict.

### Write algorithm

1. **Start:** child/year/subject/kind/category and `sessionId` are validated.
   Generate the session once from trusted content. A unique index arbitrates
   concurrent starts. If this child/sessionId already exists with the same scope,
   return it unchanged (200); a new session is 201. Same ID with different scope
   gives `SESSION_ID_REUSED`. Replays never regenerate question values/order.
2. **Respond:** load the owned session. Check for an existing matching
   `submissionId` before the revision check: same item and same canonical payload
   returns the current public session unchanged. A reused ID with different
   content conflicts. A different submission to an answered item conflicts.
   Reject completed runs, wrong current revision or invalid item/value. Only the
   first unanswered item in the stored order accepts a submission. Score once,
   append one response and increment revision via atomic compare-and-swap.
3. **CAS failure:** return a conflict; do not auto-rebase a different answer onto
   the new revision. UI refetches and shows the already-saved response if another
   tab won. Same-action retries keep their original IDs/payload.
4. **Finish:** already completed returns the same result, even if the retry has
   the older revision. Otherwise require current revision and an answer/explicit
   skip for every item. Compute summary, mark completed and increment revision
   atomically. No automatic submission of unanswered items as incorrect/skipped.
5. **Resume:** fetch the fixed session. If the last answered item has a review
   screen, show that read-only screen with Next, then the first unanswered item.
   If every item is saved but finish has not succeeded, show Finish/Retry.
   Completed sessions open results. Leave for later makes no completion write.

Enforce small per-field sizes, at most 256 items/session and bounded total
snapshot size (for example 512 KiB) before insertion. Those ceilings are safety
bounds, not target quiz lengths. If future coverage exceeds them, fail the
checker and redesign the bound deliberately; never truncate a quest/test.

For local mode, reuse guarded collection primitives and `withCollectionLock`.
Re-read inside the lock and apply the **same pure transitions**, throwing on
corrupt reads/quota errors. Do not emulate CAS by trusting stale React state.
Without Web Locks, keep the entire read/transition/write synchronous after any
content loading; report that cross-tab atomicity remains limited on those
browsers. Local storage is already documented as a development convenience.

Create an explicit hook-driven action queue per captured document/session key.
No session creation in render/effects: Start is an explicit button action, with
sessionId held stable through retries. Lock Submit synchronously before awaiting
the store, retain the attempted response/IDs after a failure and offer Retry.
Do not advance/show correctness until an acknowledged saved submission returns.
Ignore late responses after profile/pathway/session changes. A failed quiz save
keeps the learner on that item; leaving remains possible with a clear unsaved
answer notice. The current unfinished text/drag state need not survive refresh;
the last acknowledged answer does.

## 7. UI routes, review recommendations and results

Register these under the existing `RequireChild` boundary in `src/main.jsx`:

```text
/curriculum/year/:year/:subject/quest/:categoryId/mastery
/curriculum/year/:year/:subject/final-test
```

Both use `AssessmentView`. A validated `?session=<UUID>` identifies a resumable
or completed attempt; replace the URL after successful Start. A valid session
must match the route's child/pathway/kind/category. Never change the selected
child based on a query parameter. Old links without session show the quiz's
overview with Start, latest result, and Resume when appropriate. “Start fresh”
creates a new session after explaining that the prior attempt remains in history.

Extend `curriculumPaths()` in `src/seo/entry-server.jsx` to enumerate each built
quest mastery path and subject-final path from the generated manifest. This
feeds `scripts/prerender.js`'s existing route manifest; do not add a permissive
server catch-all that gives unknown quest/subject paths HTTP 200. Add titles in
`shared/seo.js`; valid private app routes remain noindex, missing scopes remain
404 over HTTP. Recognise those valid route paths even when feature flags are
off; the UI then offers a safe return to the subject map and performs no new
feature reads/writes. `?session=` and replay queries do not create separate
manifest/sitemap entries or expose child records in server-rendered HTML.

Map additions: replay intro links at subject/quest/topic level; a quiz card after
each quest's topics; a final-test card after the quest rail. A card shows
recommended status, latest completed result and a resume link. Use one overview
request for the pathway, selecting the most recently created active and
completed session separately for each scope, not one request for every card.
Resolve ties by sessionId descending. The server can group sorted owned sessions
by scope/status; project summary fields, not snapshots. The local driver uses the
same ordering. Register `/assessments/overview` before `/:sessionId` routes.
Fetch paginated scope-specific history only when requested. An overview failure
shows Retry and retains valid map/challenge access; do not render it as “no quiz
attempts yet”. Fetch a session by its validated ID for actual resume/results.

Create `src/data/curriculumReviewNavigation.js` with a pure
`getCurriculumReviewActions({ curriculum, before, after, categoryId, isBuilt })`.
Use existing completion predicates/built filtering, not positional heuristics.

For review recommendations, use category `.complete` from `buildLockState` on
the before and after snapshots, filtering out categories with no built topics.
A built subject is review-ready when that nonempty category list is all complete.
Do not use `fullCategoryComplete` / `fullSubjectComplete` from
`completionMilestones.js` for this new built-content review calculation: those
deliberately require every **planned** challenge to be built for awards. Keep
their stricter award rules untouched. Test a partially built fixture as well
as the current fully built curriculum.

Return these actions:

- A newly complete category gives a Quest Mastery action for that category.
- A newly complete subject also gives a Subject Final Test action.
- When both happen, show the quest action first and the final test alongside it.
- Replaying an already completed challenge does not auto-offer “newly finished”
  actions. Quizzes remain available from the map for that learner.
- Existing `nextHref` still points at the next challenge. Label review links
  explicitly; do not repurpose it and leave “Next challenge” pointing to a quiz.
- A challenge save failure must stay visible on the celebration. A review action
  never claims a failed completion write was durably saved.

Practice suggestions: group incorrect/skipped sampled items by topic, resolve
their reviewed practice target against **current** built availability, and link
to that challenge. Prefer suggestions with more missed/skipped items; ties use
curriculum order. Show up to three initially with “See all”. Say “Try practising”
rather than diagnosing a gap. If a source target disappeared, use another built
challenge in that same topic, otherwise show no dead link and explain availability.
All-correct results offer voluntary revisiting without inventing weaknesses.

## 8. File delivery map

These are proposed deliverables; use cohesive small modules instead of one large
hook/router. Keep existing source edits focused.

| New area | Deliverables |
|---|---|
| Pure contracts | `shared/curriculumJourneyData.js`, `shared/curriculumAssessmentData.js`, `shared/curriculumAssessmentRules.js` and focused Node tests: validation, projection, transitions, summary/scoring/selection |
| Content | `src/data/curriculumIntroductions/index.js` plus subject/year modules; `shared/curriculumAssessments/index.js` plus subject/year/quest banks; explicit public model/input renderer registry under `src/components/curriculum/` |
| Inventory/checks | `scripts/curriculum/journeyManifest.js`, `scripts/checkCurriculumJourney.js`, generated manifest, package scripts and checker fixtures/tests |
| Persistence | New methods in both store drivers; `server/routes/curriculumJourney.js`; session persistence helper under `server/`; `db.js` accessors/indexes; public serializers; deletion extensions |
| Hooks | `src/hooks/useCurriculumJourney.js`, `src/hooks/useCurriculumAssessment.js`; pure async helpers under `src/data/` for keyed action ordering/identity handling |
| Views | `CurriculumJourneySessionProvider.jsx`, `CurriculumEntryBoundary.jsx`, `CurriculumIntroduction.jsx`, `AssessmentRound.jsx`, `AssessmentNumberInput.jsx`, `AssessmentTextInput.jsx`, `AssessmentRunner.jsx`, `AssessmentResults.jsx`, scoped CSS; `AssessmentView.jsx` route |
| Integration | `RequireChild.jsx`, `CurriculumPage.jsx`, `ProblemView.jsx`, `CompletionCelebration.jsx`, review-navigation module, `main.jsx`, `src/seo/entry-server.jsx`, `shared/seo.js`; privacy wording and maintained docs at delivery |
| Configuration | Document both new flags in `.env.example`, hosting configuration and Operations; default off for partial development and preserve existing store/hosting settings. |
| Evidence | Extend handoff ledger with authored/reviewed coverage, commands/results, failures and separate browser/device/learner evidence |

No school/class memberships, teacher assessment ingestion, adaptive difficulty,
analytics, leaderboard, new badges or changed year certificates are dependencies.
Saved attempt results remain per-child curriculum features. Parent reporting
can be a later consumer; do not build a new parent dashboard as part of this plan.

## 9. Verification matrix and release conditions

| Check | Required cases |
|---|---|
| Manifest/content | Exact built IDs; 39/216/923 baseline or explained source delta; all 1,178 intros; all 255 blueprints; minimum three candidates/topic; no missing/unknown renderers, broken source/practice references or hidden-answer models |
| Selection/scoring | Every topic in a quest; every quest in finals; distinct topics/fresh variants; small/exhausted pools; duplicate detection; seeded repeatability; numeric/text/permutation/assignment boundaries; independent expected answers |
| Public projection | Nested scoring/answers/reviews absent before submission, including response/conflict/list paths; only submitted-item review visible; source evidence and legitimate givens preserved |
| Journey | Missing record vs failed read; acknowledgement union/no-op; Continue/Skip/skip-sequence; replay without unrelated writes; deep links; failed save/Continue for now; profile/year/subject switch; stale responses; no challenge mounting behind intros |
| Session protocol | Duplicate start/response/finish; wrong item order; unknown option/value; stale revision; two writers; lost acknowledgement after durable write; immutable completed result; unchanged resume after content edit |
| Both stores | Exact contract parity, copy isolation, malformed success bodies, network errors, corrupt/quota local storage, remount/resume, local lock behaviour and explicit unsupported cross-tab limits |
| API/account | Anonymous denial; foreign child/session 404; source scope validation; body bounds; correct indexes/CAS; child/account deletion and sibling retention; wrong password deletes nothing |
| Integration | Fresh and existing learner; arbitrary challenge order; final outstanding challenge at any position; two review actions on final completion; no awards/completion from quizzes; old homepage/profile resume still works; invalid/deep HTTP routes and noindex |
| Accessibility | Keyboard alternatives for drag, labelled inputs/model equivalents, focus after intro/question/results, live save-error/outcome status, 44px touch targets, reduced motion, no-voice/mute/language paths and both themes |

Existing test references: `src/data/store/localStorageStore.test.js`,
`src/data/store/apiStore.test.js`, `src/data/progressRules.test.js`,
`src/data/progressPersistence.test.js`, `src/data/curriculumNavigation.test.js`,
`src/data/curriculumResume.test.js`, `server/routes.test.js`,
`server/accountProtection.test.js`, `shared/seo.test.js`,
`tests/components/progress.test.jsx`, `tests/components/challenge.test.jsx`,
`tests/components/lessonFrame.test.jsx`, `tests/components/rewards.test.jsx`,
`tests/components/firstPlay.test.jsx` and subject playthroughs.

Add pure and component tests for the new rules/flows, using repo conventions.
Some existing Mongo tests skip when `MONGODB_URI` is absent: explicitly record
that gap and never count a skipped real-DB concurrency/ownership test as passing.
Use isolated throwaway databases only, following existing test setup. Fixtures
and mocked routes supplement those checks; they do not prove Mongo index/CAS
behaviour. Never run seeds, purges or production-data tests for this work.

Run focused lint/tests after each work packet, broader account/progress/reward
regressions immediately after persistence/shared-route changes, and full lint,
tests and build once when final integration is ready. New app routes change SEO
recognition, so include `npm run check:seo` at the final release check. Record
the checked revision/scope and actual failures rather than copying old results.

Browser checks follow `AGENTS.md`: jsdom first; one batched layout/drag/map pass
only for remaining gaps (both themes, phone/tablet/desktop), at most one confirm
pass. Physical-device, teacher/child and assistive-technology review have their
own evidence columns. Technical green does not certify the learning experience.

Update `src/pages/privacy/Privacy.jsx` to describe intro acknowledgements and
saved quiz attempts, plus the existing deletion controls, when these ship.
The notice is currently a draft, not a reviewed retention policy. Do not invent
a legal approval/retention period or silently delete past attempts. Initially
retain these records with the child until existing child/account deletion;
record that behaviour and the existing qualified-review follow-up in Operations.
Store no names, audio, device identifiers or free-form feedback in these records.

Rollback disables the new flags and retains all records. Never undo the feature
by clearing storage, dropping collections or resetting learner progress.
