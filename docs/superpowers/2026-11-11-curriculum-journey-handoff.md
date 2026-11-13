# Curriculum journey — implementation handoff and coverage ledger

**Planning completed:** 2026-11-11 · **Implementation:** in progress (see packet evidence below).
**Branch:** `ideas/curriculum-introductions-mastery`, created from `dev`.
**Source HEAD at second pass:** `0d49134` (working tree also contains these uncommitted planning documents).

Read the [feature plan](plans/2026-11-11-curriculum-introductions-mastery.md)
and [technical contract](plans/2026-11-11-curriculum-journey-technical-contract.md).
This file is the durable implementation ledger; update it at each completed
work packet and handoff. The owner requested a planning stop to switch models.
Do not interpret this record as evidence that application code exists.

## Start/resume procedure

1. Read `AGENTS.md`, `docs/PROJECT_KNOWLEDGE.md`, the feature plan and technical
   contract. Read the progress skill before the persistence/navigation work and
   the visual recipes before UI/content. Read subject mapping rows when authoring,
   rather than loading all statutory documents at once.
2. Check `git status --short` and the current branch. Stay on the branch above;
   preserve the uncommitted plan/idea files and unrelated user changes. Do not
   recreate the branch, reset, stash away or discard those records. If the owner
   moved the branch intentionally, use the supplied context and record the change.
3. Look at the work-packet statuses below and continue the earliest unfinished
   dependency. Inspect existing code first: a later session may have implemented
   it even if its last report was interrupted. Do not overwrite finished work.
4. At the first implementation work, create one course-content build timer with
   ID `curriculum-journey`; resume an existing paused timer. Inspect/report an
   existing timer rather than resetting it. Keep its state/ID in this record.
   Planning was not timed and must not be retroactively estimated.
5. Keep final all-pathway coverage as the target. An internal example or one
   finished year is an intermediate milestone, never the completed feature.
6. Use focused lint/tests as each packet changes code. Run broader existing
   progress/accounts/rewards regressions when shared infrastructure changes.
   Reserve the full lint/tests/build and SEO run for the final integrated scope.
7. Record implementation, technical results, content review and device/learner
   review separately. Update this ledger before yielding, pause the timer, and
   state the next concrete task. Resume it when continuing.
8. Stop the timer only after the requested implementation and verification are
   complete; report its measured duration. Token usage remains unknown unless
   the actual tool supplies a counter. No guessed timings, token usage or costs.

Proposed measurement workflow at implementation time:

```sh
npm run course:timer -- report curriculum-journey
# If absent: start. If paused: resume. If already running: retain it.
npm run course:timer -- start curriculum-journey
npm run course:timer -- pause curriculum-journey  # before an interim handoff
npm run course:timer -- resume curriculum-journey # next working session
# stop/report only after implementation and required verification finish
```

These are alternatives depending on existing timer state, not one command list
to execute blindly. A completed old timer needs a new recorded ID for a new scope.

## Work packets

Every packet is **TODO** initially. Record exact changed scope, checks and next
task when completing one. Packet dependencies govern order; content batches
need not modify shared infrastructure once the representative approach is proven.

| ID | Work | Dependencies | Completion evidence |
|---|---|---|---|
| W01 | Manifest, checker skeleton and coverage inventory | None | Correctly enumerate all actual built paths, generated-manifest drift tests and an honest inventory of missing content. Package commands exist. No learner UI changes. |
| W02 | Pure content/record contracts and representative materialised items | W01 | JSON-safe schemas, source/renderer/practice validation; selection/scoring/summary/transitions/public projection tests, including incorrect and invalid answers. |
| W03 | Journey acknowledgements through both stores/API | W02 | Monotonic merge/no-op; ownership, hydration/failure/isolation; new collection/index; matching driver contracts and deletion coverage. |
| W04 | Assessment storage/session protocol through both stores/API | W02, W03 infrastructure | Start/respond/finish CAS and duplicate-request tests, snapshots/resume, public allowlist, overview/history ordering, deletion; immediate broader regressions. |
| W05 | Introduction boundary and accessible screens | W03 | Map/challenge/direct-quiz scope sequences, replay, Continue/Skip/skip-sequence, failure bypass and no mounted challenge behind intro. |
| W06 | Assessment controls, runner, sections and results | W04 | Raw values, initial response saved once, skip/review, lost-ack retry, four-question sections, URL resume, history and useful practice links. |
| W07 | Map, completion actions, routes, SEO and flags | W05, W06 | Map overview, arbitrary completion order, quest+final offers, unchanged challenge next link, HTTP direct routes/noindex, disabled legacy flow. |
| W08 | Internal representative-family proof | W07 | Year 3 Fractions; English reading/dictation; Science diagram; History/Geography evidence; Adventure and practical knowledge examples pass content/interaction review and playthroughs. |
| W09 | All-year Maths and English content | W08 | All 12 pathways authored, candidates independently checked, scoped checker/tests pass; ledger evidence updated. |
| W10 | All-year Science, History and Geography content | W08 | All 18 pathways authored with source/visual context and scoped checks; bespoke Year 3 Science covered explicitly. |
| W11 | Remaining Year 5/6 subjects | W08 | Seven additional Year 5 pathways plus Year 6 Computing/French; language/audio/practical limitations handled; all nine pathways covered. |
| W12 | Global coverage, final validation and delivery records | W09–W11 | Strict whole-curriculum checker, broader/final checks, browser gaps assessed, maintained docs/privacy updated, explicit human/device review limits and all-built release readiness recorded. |

Do not add an approval stop after W08. The owner has already chosen the whole
built curriculum. The current turn stops because it is a planning/model-switch
handoff, not because each internal sample needs new authorisation.

### W01–W02 details

- Implement a manifest generator/checker using `loadCurriculum` and actual wrapper
  paths, and parity tests with Vite's module set. Avoid a manually maintained
  list of 923 topic IDs. Keep deterministic output; test partial/unbuilt fixtures.
- Checker output must report expected/authored/validated/review-evidence counts
  separately. Initial missing content is visible; inventory mode is not a pass.
- Implement shared validators and pure transitions before HTTP/UI. Add private
  item → public item projection tests that inspect nested objects, not just an
  omitted top-level `answer` property.
- Build a small finite fixture with two quests, multiple topics, three candidate
  items/topic and several input types. Test exact quotas, empty/insufficient pools,
  deterministic randomness, initial-response scoring and separate skip counts.
- Resolve a few real samples using `npm run topic:context -- --year 3 --subject
  math --topic fractions-of-a-set-of-objects`; use the returned source/visual
  references. Do not assume a nonexistent `year3Math/questions.js` shared bank.

### W03–W04 details

- New router goes before API 404 in `server/app.js`. Add collection accessors
  and **new** indexes without altering old progress/reward indexes or documents.
- Journey merge can use existing `saveLearning`; session writes require the
  explicit expected-revision CAS specified in the technical contract.
- Extend local/API method implementations, API response validation and both
  child/account deletion paths. Do not leave new collections outside deletion.
- Test simultaneous first starts and distinct competing responses, identical
  retries after a lost HTTP acknowledgement, resume after a bank edit, immutable
  completed runs and sibling data retention after deletion.
- Add the overview endpoint before the dynamic session route. History and map
  statuses must agree even when history contains more than 20 attempts.
- If a test MongoDB is unavailable, implement/run pure, mocked and component
  coverage, record real-DB cases as unverified, and keep those release limits
  visible. Never point integration tests or destructive fixtures at learner data.

### W05–W08 details

- Keep the destination URL during automatic introductions. Replays use validated
  map query parameters; saved quizzes use `?session=<UUID>`. Refresh/back must
  remain well defined. Existing `/hello` onboarding and child selection still run
  through `RequireChild` first.
- The subject/quest/topic explanations are additional purpose screens. Retain
  existing challenge-specific method examples, without adding a second copy of
  that same method screen. Test both LessonFrame and built-in Adventure/story
  teaching approaches.
- Controlled round state resets by itemInstanceId, not array position alone.
  Synchronous submission guards prevent double taps before React state updates.
- Check input capacity early: the existing NumberInput strips decimal/minus
  characters, and LetterInput has no French accents. Implement the contract's
  compatible assessment controls and prove those answer forms are enterable.
- UI correctness comes from the acknowledged store response. In API mode, send
  the raw answer; never a client-computed correct flag or total.
- Test failures with slow/deferred promises and profile changes, not only happy
  paths. Introduction save trouble must not change challenge access rules.
- Extend celebration props with explicitly labelled review actions; test out-of-
  order quest completion and both actions on subject completion. Quizzes do not
  call `completeChallenge`, award XP or issue certificates.
- Add real quiz paths to `curriculumPaths()` in `src/seo/entry-server.jsx` as well
  as React/SEO metadata. The built route manifest drives HTTP recognition.
  Review-ready state uses built-content completion, not the stricter predicates
  that gate existing completion awards when planned challenges remain unbuilt.
- Prove each renderer family before spreading it across 39 pathways. Do not
  replace a needed source, diagram or manipulative with a generic text card.

### W09–W11 content batch procedure

For each pathway in the ledger, work one quest at a time:

1. Resolve real dataset IDs and source mappings. Inspect the nearest existing
   game/lesson/model; preserve its year boundaries and source credits.
2. Author the subject introduction once, then the quest introduction and every
   built topic's purpose/usefulness/example screen.
3. Author or adapt at least three reviewed candidates for each topic. Record
   objective, source, public evidence/model, raw response schema, independent
   scoring expectation, review explanation and a built practice target.
4. Build the quest selection coverage and final-test two-items-per-quest coverage
   from those pools. Questions must remain within their topic/year; no generic
   cross-year filler to reach a count.
5. Check answers independently of the scorer, uniqueness/answerability,
   distractors, British English, model givens, sound-off/read-aloud policy and
   practical-subject assessment limits. Review all finite candidates; sample
   generated variants with reproducible cases and record remaining limits.
6. Run the scoped journey checker, affected lint and the relevant existing/new
   bank/renderer playthroughs. Fix failures before moving the pathway's technical
   status forward. Do not rerun the whole app suite per quest.
7. Update the ledger with counts and evidence links. “Authored” is not
   “reviewed”; an automated presence check is not a human/teacher review.

### W12 details

- Recompute the launch manifest against current source. Include any newly built
  pathway/topic deliberately; explain count deltas instead of hardcoding the old
  baseline as the only valid answer. No unbuilt or unavailable practice links.
- Run strict all-scope checks and final lint/tests/build/SEO. Record actual
  failures and skipped tests, including unrelated ones; do not copy historical
  red/green results from another plan. Fix failures within scope and report any
  remaining release blocker honestly.
- Use browser tooling only if available and justified after jsdom checks, in
  one batched pass across both themes and appropriate viewports. Record real
  device and teacher/child review independently; do not label them done from CI.
- Update current architecture/progress summary if necessary, curriculum inventory,
  authoring guidance/templates/checkers, privacy wording, Operations and Changelog.
  Retain plan evidence and remove only delivered upcoming work from Project Ideas.
- The complete release needs both feature flags enabled together, after coverage
  passes. Document configuration and a rollback that disables flags and retains
  data. No merge, deployment or production database work is implied by this plan.

## Full-pathway coverage ledger

Baseline was recomputed from source in both planning passes. `I` = introductions
authored; `Q` = reviewed candidate pool/blueprints authored; `T` = technical checks;
`C` = content review evidence; `D` = device/learner evidence. `—` means not done,
not “not applicable”. `C partial` = author self-review plus a sampled
coordinator check (see W09 evidence), not an independent full content review. `AI review` = an independent model reviewer re-checked every fact, answer, distractor and practice slot against the challenge banks (2026-11-12); no teacher, child or human subject-expert review. Each pathway needs one subject intro plus Qs+Ts below,
one quiz per quest and one final. All 39 rows are authored and pass `check:journey -- --all` (2026-11-12).

| Year | Subject ID | Quests | Topics | I | Q | T | C | D |
|---|---|---:|---:|---|---|---|---|---|
| 1 | math | 7 | 32 | ✓ | ✓ | ✓ | partial | — |
| 1 | english | 8 | 38 | ✓ | ✓ | ✓ | partial | — |
| 1 | geography | 4 | 12 | ✓ | ✓ | ✓ | AI review | — |
| 1 | science | 4 | 16 | ✓ | ✓ | ✓ | partial | — |
| 1 | history | 5 | 14 | ✓ | ✓ | ✓ | AI review | — |
| 2 | math | 8 | 39 | ✓ | ✓ | ✓ | partial | — |
| 2 | english | 9 | 39 | ✓ | ✓ | ✓ | partial | — |
| 2 | geography | 5 | 14 | ✓ | ✓ | ✓ | AI review | — |
| 2 | science | 4 | 19 | ✓ | ✓ | ✓ | partial | — |
| 2 | history | 6 | 17 | ✓ | ✓ | ✓ | AI review | — |
| 3 | math | 7 | 44 | ✓ | ✓ | ✓ | partial | — |
| 3 | english | 8 | 32 | ✓ | ✓ | ✓ | AI review | — |
| 3 | geography | 5 | 16 | ✓ | ✓ | ✓ | AI review | — |
| 3 | science | 5 | 21 | ✓ | ✓ | ✓ | partial | — |
| 3 | history | 3 | 22 | ✓ | ✓ | ✓ | AI review | — |
| 4 | math | 8 | 42 | ✓ | ✓ | ✓ | partial | — |
| 4 | english | 8 | 33 | ✓ | ✓ | ✓ | AI review | — |
| 4 | geography | 5 | 16 | ✓ | ✓ | ✓ | AI review | — |
| 4 | science | 5 | 20 | ✓ | ✓ | ✓ | partial | — |
| 4 | history | 2 | 18 | ✓ | ✓ | ✓ | AI review | — |
| 5 | math | 8 | 46 | ✓ | ✓ | ✓ | partial | — |
| 5 | english | 9 | 36 | ✓ | ✓ | ✓ | partial | — |
| 5 | geography | 5 | 16 | ✓ | ✓ | ✓ | AI review | — |
| 5 | science | 5 | 24 | ✓ | ✓ | ✓ | AI review | — |
| 5 | history | 6 | 22 | ✓ | ✓ | ✓ | AI review | — |
| 5 | art | 4 | 14 | ✓ | ✓ | ✓ | AI review | — |
| 5 | computing | 5 | 17 | ✓ | ✓ | ✓ | AI review | — |
| 5 | design | 4 | 14 | ✓ | ✓ | ✓ | AI review | — |
| 5 | french | 4 | 17 | ✓ | ✓ | ✓ | AI review | — |
| 5 | music | 4 | 14 | ✓ | ✓ | ✓ | AI review | — |
| 5 | pe | 4 | 12 | ✓ | ✓ | ✓ | AI review | — |
| 5 | wellbeing | 4 | 13 | ✓ | ✓ | ✓ | AI review | — |
| 6 | math | 9 | 49 | ✓ | ✓ | ✓ | partial | — |
| 6 | english | 5 | 31 | ✓ | ✓ | ✓ | partial | — |
| 6 | geography | 4 | 16 | ✓ | ✓ | ✓ | AI review | — |
| 6 | science | 5 | 24 | ✓ | ✓ | ✓ | AI review | — |
| 6 | history | 5 | 20 | ✓ | ✓ | ✓ | AI review | — |
| 6 | computing | 5 | 17 | ✓ | ✓ | ✓ | AI review | — |
| 6 | french | 5 | 17 | ✓ | ✓ | ✓ | AI review | — |
| **Total** | **39 pathways** | **216** | **923** | **39** | **39** | **39** | **0 human** | **0** |

Source/renderer discovery shortcuts:

| Family | Existing references to inspect |
|---|---|
| Maths | `src/data/lessons/math/`, `src/pages/skills/math/challenges/yearN/`; Year 3 has bespoke strand/topic games and separate pure builders, not one Year3MathGame. |
| English | `src/data/lessons/english/`, `src/pages/skills/english/challenges/EnglishPracticeGame.jsx`, year/topic reading and dictation games; read the relevant spelling/grammar appendices as well as the year mapping. |
| Science | Year 3's bespoke topic games/banks, other years' `src/data/challenges/yearNScience/` and subject visuals; inspect the actual wrapper for each topic. |
| History | `src/data/challenges/history/yearN/`, `HistoryChallenge.jsx`, `HistoryVisual.jsx`, `SourceVisual.jsx`; snapshots must retain evidence/story context and credits. |
| Geography | `src/data/challenges/geography/yearN/`, `GeographyChallenge.jsx`, `GeographyVisual.jsx`; preserve maps/sources/keys/units and current year split. |
| Additional subjects | Year 5/6 bank indexes and `YearN<Subject>Game.jsx`/visual pairs, `AdventureChallenge.jsx`; practical/listening questions state honestly which knowledge or skill is sampled. |

`topic:context` and [Visual recipes](../VISUAL_RECIPES.md) locate concrete files.
No source path pattern alone proves a topic's bank is supported by a checker.

## Focused check recipes

Use these as scopes, adding new test filenames as delivered. Redirect long output
to temporary logs and inspect summaries/failures. Proposed journey commands
cannot run until W01 adds them.

```sh
# Existing progress/navigation/resume regressions
node --test src/data/progressRules.test.js src/data/progressPersistence.test.js src/data/curriculumNavigation.test.js src/data/curriculumResume.test.js
# Both driver contracts and API authorization/account behaviour
node --test src/data/store/localStorageStore.test.js src/data/store/apiStore.test.js server/routes.test.js server/accountProtection.test.js
# Existing UI consumers when persistence/routing/teaching integration changes
npx vitest run tests/components/progress.test.jsx tests/components/rewards.test.jsx tests/components/challenge.test.jsx tests/components/lessonFrame.test.jsx tests/components/firstPlay.test.jsx
# New feature checker once implemented
npm run journey:manifest -- --check
npm run check:journey -- --all
# Final integrated scope
npm run lint
npm test
npm run build
npm run check:seo
```

Also run affected ESLint files and new pure/component suites. The list above is
not an exhaustive substitute for the technical contract's verification matrix.
Changes after a passing check require rerunning affected checks; no repeated
full run merely to produce another handoff report.

## Handoff state and evidence

| Field | Current state (2026-11-12, all pathways authored) |
|---|---|
| Current packet / next action | **W12 technically complete.** Next: owner/teacher device review on the dev service, then flip both production flags in `render.yaml` together. |
| Timer | `curriculum-journey` **stopped** at 16h 8m 33s recorded wall time over two work sessions (unpaused time, including idle gaps and AI/tool waits; not token usage). |
| Application changes | W01–W07 behind both flags. All 39 pathways authored (1,178 introductions, 3,001 candidates checked by `check:journey`). Flags **on for the dev service**, **off for production**. |
| Implementation checks | 2026-11-12 final run: `npm run lint` pass; `npm run test:unit` 2,902 pass / 0 fail (5 skipped); `npm run test:components` 1,062 of 1,064 pass, the two failures being the previously documented Ocean porthole/starting-camera checks (load timeouts in other files pass on isolated rerun, 30/30); `npm run build` pass (70 pages prerendered); `npm run check:seo` pass; `check:journey -- --all` PASS; `journey:manifest -- --check` current. |
| Browser evidence | One batched pass plus a confirmation pass at 390px and 1280px, light and dark: all 1,428 journey models render with no page errors and no page-level horizontal scroll. Fixed: geography maps rendered black in the journey (missing `--geo-*` tokens/stylesheet); latitude/longitude grid corner labels collided; two Y3 quiz points sat on the grid edge. Wide maths tables scroll inside their container on phones (intended). Not checked: real devices, narration, the full in-app quiz/final-test flow in a browser (covered by jsdom tests). |
| Content/device/learner review | Independent model review (`AI review` in the ledger) of 23 pathways: every fact, answer, distractor and practice slot checked against the challenge banks. Maths Y1–6, English Y1–2 and Y5–6, and Science Y1–4 have partial review only; Y3/Y4 English had a full model answer review on 2026-11-13. No teacher, child or device review. |
| Blocking owner decisions | Production flag flip. (Jarrow March distance resolved 2026-11-13: now "about 300 miles" everywhere.) |

Append concise packet evidence here when implementation begins. Include actual
commands, result totals, changed revision/scope, limitations and next unfinished
task. Never mark W12 complete from a partly authored curriculum.

## Continuation prompt for the implementing model

Use after switching models and authorising implementation:

> Implement curriculum introductions and mastery quizzes using
> `docs/superpowers/plans/2026-11-11-curriculum-introductions-mastery.md`,
> its linked technical contract, and
> `docs/superpowers/2026-11-11-curriculum-journey-handoff.md`.
> Stay on `ideas/curriculum-introductions-mastery` and preserve its uncommitted
> planning documents and unrelated changes. Read AGENTS.md and the relevant
> project guides first. Start/resume the recorded build timer as specified.
>
> The agreed release covers every built subject/year, currently 39 pathways,
> 216 quests and 923 topics. Introduce subject/quest/topic purpose and usefulness,
> retain existing challenge teaching, add a mixed quiz after each quest and a
> final subject test. Results give practice suggestions and retries, with no
> pass mark, extra rewards or changes to existing open access/earned progress.
> Follow the exact separate storage/API/session and error contracts; do not
> retrofit quiz scores into challenge completion or reset learner records.
>
> Begin at the earliest unfinished work packet, initially W01. Prove representative
> interaction families internally, then finish all pathway content; a sample or
> pilot does not satisfy the all-built scope. Use the prescribed coverage ledger
> and acceptance checks. Do not add a new approval stop after internal samples.
> At handoffs update this record, pause the timer, report actual check limits
> and state the next task. Complete authorised implementation and verification;
> do not deploy or touch production data as part of it.

### Packet evidence

**W01 — done.** `scripts/curriculum/journeyManifest.js` writes/checks
`shared/curriculumJourneyManifest.js` (39/216/923/3,692) and, since 2026-11-12,
`shared/curriculumJourneySources.js` (every built topic's statutory mapping file
and heading; all 923 resolved). `npm run check:journey` (inventory/scoped/all)
and `npm run journey:brief` exist. Vite parity test:
`tests/components/curriculumJourneyManifest.test.jsx`.

**W02 — done.** Shared validation, selection, scoring, projection and summary in
`shared/curriculumJourneyData.js`, `curriculumAssessmentData.js`,
`curriculumAssessmentRules.js`, `curriculumAssessmentHistory.js` with
`shared/curriculumAssessmentRules.test.js`. Model registry extended with
`lesson` (reuses LessonExample shapes, diagram fields validated) and `pictures`.
Compact authoring helpers: `shared/curriculumJourneyAuthoring.js`
(deterministic option/card shuffles, generated source references).
Checker adds false-equation, answer-in-model and spoken-answer guards.

**W03/W04 — done.** Both drivers (`src/data/store/localCurriculumJourney.js`,
`apiCurriculumJourney.js`), `server/routes/curriculumJourney.js`,
`server/curriculumJourneyRepository.js` (CAS), new collections/indexes and
child/account deletion. Evidence: `src/data/store/curriculumJourneyStore.test.js`;
**real MongoDB** route tests `server/curriculumJourney.test.js` (8 pass, run with
`MONGODB_URI=mongodb://127.0.0.1:27017` on a throwaway `dl_test_journey_<pid>`
database that is dropped): 401/404/503 flag, monotonic acknowledgements,
concurrent identical starts, public projection, out-of-order/stale/reused
submission conflicts, ignored client outcomes, immutable finish, overview/
history, child and account deletion with sibling retention. Existing
`server/routes.test.js` and `server/accountProtection.test.js` also pass on the
same local throwaway setup (129 progress/account/store/SEO tests in one run).

**W05 — done.** `CurriculumEntryBoundary`, `CurriculumIntroduction`,
`useCurriculumJourney`, session provider in `RequireChild` (keyed by child).
Fixed: an explicit replay was suppressed for the rest of the session, so a
second replay of the same scope did not show.

**W06 — done.** `useCurriculumAssessment` (explicit Start with a stable
session ID, synchronous submit lock, identical-retry submission IDs, stale
response guards), `AssessmentRound`, `AssessmentInputs` (signed/decimal
keypad, accent bar, keyboard order/sort alternatives), `AssessmentRunner`
(review after each saved answer, four-question parts, resume), `AssessmentResults`
(score + coverage, skipped separate, practice suggestions), `AssessmentView`.

**W07 — done.** Routes in `src/main.jsx`; map replay links, per-quest quiz cards
and final-test card from one overview request (`CurriculumPage.jsx`);
celebration `reviewActions` from `getCurriculumReviewActions` (built-content lock
state, any completion order); quiz paths in `curriculumPaths()` and noindex
titles in `shared/seo.js`; flags documented in `.env.example` and `render.yaml`
(both `"false"`).

Evidence for W05–W07: `tests/components/curriculumJourney.test.jsx` (11 pass:
sequence/no mounting behind intros, skip-sequence single write, save/read
failures, replay twice + URL tidy, invalid replay, full quiz with skips and a
section break, resume + same-submission retry, unknown quest, no answer keys,
map cards/replay/overview failure); `src/data/curriculumJourney.test.js`
(8 pass: out-of-order quest/subject offers on a partially built fixture, replay
no-offer, scopes, practice suggestions, number drafts). Existing component
suites (progress, rewards, challenge, lessonFrame, firstPlay, curriculumSelect,
rootLayout): 47 pass.

**W08 — partly proven.** Interaction/render families covered in
`tests/components/assessmentRound.test.jsx` (15 pass): signed/decimal and large
number entry, French accent bar, choice/skip, keyboard order and sort, fraction
shading, number track, saved read-only review, evidence credits, and the
clock / bar-chart / pictures / timeline / lesson / table models plus a
recoverable unknown model. New model renderers this session: `clock`,
`bar-chart`. Still to prove with real content: History/Geography evidence,
Science diagrams, an Adventure subject and a practical-subject knowledge check
(they arrive with W10/W11 content).

**Earlier W08 note — in progress.** Year 3 Maths Fractions reference content authored and
validated (`src/data/curriculumIntroductions/math/year3.js`,
`shared/curriculumAssessments/math/year3.js`). Other families are being
authored in W09–W11 batches.

**Bundle fix (2026-11-12).** The 190 KB generated manifest had been pulled into
the eager main chunk through the store drivers. `getJourneyPathway` now lives in
`shared/curriculumJourneyPathway.js`, the local driver lazy-loads the service,
the API driver lazy-loads the manifest for overview validation, and the flag
lives in `src/data/curriculumJourneyFlag.js`.

**W09 — part done (8 of 12 pathways).** Authored by Sonnet content agents from
the authoring guide, each followed by the agent's own full answer re-check.
Every pathway below passes `npm run check:journey -- --year N --subject ID`
with 0 gaps (introductions/candidates):

| Pathway | Intros | Items | Notes |
|---|---:|---:|---|
| Y1 Maths | 40 | 133 | Tally/pictogram/position items use tables/emoji; shape emoji need a device look |
| Y2 Maths | 48 | 182 | Block diagrams use `bar-chart`; scale-reading items are worded (no pointer renderer) |
| Y3 Maths | 52 | 163 | Reference quest (Fractions) by the coordinator; clock and bar-chart items moved to the new renderers |
| Y4 Maths | 51 | 162 | Rhombus item slightly debatable (see agent note); 4-digit numbers without commas as in the lessons |
| Y1 English | 47 | 153 | No speech; handwriting/phonics sounds/dictation sampled indirectly |
| Y2 English | 49 | 172 | Practice slots set by input kind, not checked against each lesson: **spot-check needed** |
| Y3 English | 41 | 146 | Full answer review done 2026-11-13 (see below) |
| Y4 English | 42 | 156 | Full answer review done 2026-11-13 (see below) |

Coordinator sampled ~40 random items across these pathways and found no wrong
answers; one Y3 Maths rounding-to-100 item matches the existing Y3 lesson even
though rounding to 100 is formally Y4. Remaining W09: Maths Y5/Y6 (a batch was
stopped before writing files) and English Y5/Y6.

**Checks run at pause:** `node --test` journey suites 30 pass; real-MongoDB
`server/curriculumJourney.test.js` 8 pass (`MONGODB_URI=mongodb://127.0.0.1:27017`,
throwaway database); Vitest journey/round/manifest suites 27 pass (the map test's
wait was raised to 5 s because the map stays hidden while larger content loads);
`npm run journey:manifest -- --check` current; `npm run lint` clean.
Earlier this session: 129 progress/account/store/SEO regressions and 47
existing component tests passed after the shared-route/deletion changes.

**Y3/Y4 English answer review (2026-11-13).** Every quiz question, answer, distractor and explanation in the Y3 and Y4 English banks (302 items), plus all 83 introductions, re-read by a model reviewer. Practice slots match the lesson titles. No wrong answers found. Fixed: an ordering question with more than one valid order (Y4 noun phrase, now in chunks); "Which word is spelt correctly?" questions whose distractors were real words (vain, vane, seen) or the US spelling neighbor; a sort card that contained its own answer (whether); a missing comma after the fronted adverbial "After lunch" in a Y4 question; a sort asking about an "underlined" idea when nothing was underlined; "said Zoe" vs "Zoe said"; a comma splice with "therefore" on a sort card; the Y3 "Six prefixes" table that listed four; and the Y3 grammar intro's "a unicorn" example, which contradicted the vowel-letter rule. The Y3 type-in question "It was icy, ___ the school closed." still accepts "therefore" so children are not marked wrong. Checks: scoped `check:journey` 0 gaps for both, `journey:manifest -- --check` current, eslint clean, journey unit tests 20 pass. No teacher or child review.

**Jarrow March distance (2026-11-13).** Owner chose "about 300 miles". Updated the Y6 History challenge bank, introduction and quiz explanation.

### Content batch procedure (for the next session)

Run at most two Sonnet content agents at once, each owning one or two pathways
(only their own two files per pathway). Brief each with: the authoring guide,
a finished same-subject example, `journey:brief` + `topic:context` for IDs,
mapping rows and lesson titles, the rule that practice slots follow the lesson
title, alt text is visible (never states the answer), choice labels must differ
by more than case and must not equal a label in the model, and "done when the
scoped checker reports 0 gaps and eslint passes". Then sample-check items with a
quick dump script before moving on. Remaining batches: Maths Y5+Y6; English
Y5+Y6; Science Y1–Y4 (Y3 bespoke); Science Y5–Y6 + Geography Y1–Y2; Geography
Y3–Y6; History Y1–Y4; History Y5–Y6 + Art + Design; Computing Y5–Y6 + French
Y5–Y6; Music + PE + Wellbeing. W12 then needs an independent answer review of
the whole bank (Y3/Y4 English first), `check:journey -- --all`, full lint/test/
build/SEO, and a single batched browser pass for the new renderers in both themes.
