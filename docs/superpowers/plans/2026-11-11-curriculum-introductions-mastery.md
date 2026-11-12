# Curriculum introductions and mastery quizzes

**Date:** 2026-11-11 · **Status:** second-pass plan complete; ready for implementation after the owner's model switch. No feature code shipped.
**Idea:** [#69](../../PROJECT_IDEAS.md#curriculum-introductions-and-mastery-quizzes-69) · **Branch:** `ideas/curriculum-introductions-mastery`, created from `dev`.

## Agreed outcome

Cover **all built subjects and years** in one feature launch. Children see what
they are about to learn and why it is useful, then revisit it through a mixed
quiz after each quest and a final test for the subject in that year.

Owner decisions on 2026-11-11:

- Launch across all built pathways, rather than releasing a single-subject pilot.
- Show results and practice suggestions, allow retries, and use **no pass mark**.

Implementation is specified in three linked records:

- **This plan:** product outcome, learner experience, scope and milestones.
- **[Technical contract](2026-11-11-curriculum-journey-technical-contract.md):** exact content/record shapes, store/API methods, state transitions, navigation, error handling, source seams and required regressions.
- **[Handoff and pathway ledger](../2026-11-11-curriculum-journey-handoff.md):** ordered work packets, coverage for all 39 pathways, check commands, evidence and a continuation prompt.

The technical contract resolves the implementation defaults below; use it for
method signatures, response shapes and edge cases. These defaults are planning
decisions, distinct from the two explicit owner decisions above. Internal samples
prove the shared approach before full content production; they do not reduce
the agreed launch scope. Existing challenges remain open and replayable, with
their current completion, stickers and year awards preserved.

## Source findings and size

The hierarchy is **year → subject → quest → topic → challenge → questions**.
Quests are `category` objects in the datasets. Keep those permanent IDs.

Source audit on 2026-11-11 used the [registry](../../../src/data/curriculumRegistry.js),
its datasets and expected challenge module paths. It found **39 pathways,
216 quests, 923 topics and 3,692 built challenges**. The full scope therefore
needs **1,178 introductions** (39 subject + 216 quest + 923 topic),
**216 quest quizzes** and **39 final subject tests**. Recompute at implementation
start and before release so additions on `dev` are included deliberately.

Existing teaching screens already explain individual challenges through
[LessonFrame](../../../src/components/challenge/lesson/LessonFrame.jsx),
History/Geography frames and [AdventureChallenge](../../../src/components/challenge/adventure/AdventureChallenge.jsx).
Those teach methods; the new screens explain purpose and learning goals.
[Challenge.jsx](../../../src/pages/curriculum/Challenge.jsx) wraps registered lessons.
Avoid duplicate introductions when a subject also supplies its own frame.

[ChallengeShell](../../../src/components/challenge/ChallengeShell.jsx) retries until
correct and reports `{ combos }`. That contract cannot establish an independent
quiz score. Use a separate assessment runner while reusing appropriate answer
controls, subject visuals and reviewed pure question builders.

Read the [progress skill](../../../.claude/skills/curriculum-progress/SKILL.md),
[visual recipes](../../VISUAL_RECIPES.md) and each subject's exact
[statutory mapping](../../curriculum/README.md) before implementation/content work.
Existing implementation counts do not certify teaching quality.

## Learner experience

| Moment | Behaviour |
|---|---|
| First visit to a year/subject | One illustrated subject introduction explaining what the child will learn and where it helps. |
| First entry into a quest | One screen with the quest's goals and a concrete use for the learning. |
| First entry into a topic | One screen explaining the new idea, its usefulness and a simple illustrative example. |
| Challenge start | Retain the existing method/example teaching screen and question interactions. |
| Quest finished | Offer **Quest Mastery**, mixing questions from every built topic in the quest. Keep a visible quiz entry on its quest card. |
| Subject finished | Offer a **Subject Final Test**, sampling every built quest in that subject/year. Keep an entry on the subject page. |
| Quiz finished | Show correct/answered/total, topics to practise and direct practice links; offer a fresh attempt. |

Planned interaction rules:

- Show each introduction automatically once per child/year/subject/scope, then
  provide explicit replay links on the map. Record acknowledgement on Continue
  or Skip, rather than merely on render. Editing copy does not automatically
  interrupt existing learners again.
- Direct challenge links run the same pending introduction sequence as map links:
  subject → quest → topic → challenge. Keep the intended destination through
  refresh/back navigation and provide a clear way to go straight to the activity.
- Topic/quest introductions occur on entering their learning, not when merely
  swiping past a quest card. Visiting a second challenge in the same topic does
  not repeat them. Existing learners get the new explanations on their next
  relevant visit; never manufacture prior views from completed challenges.
- A screen has a short heading, up to three brief learning statements, one
  useful illustration and one everyday application, with Continue, Skip and
  optional read-aloud. Aim to fit normal phone viewports; allow scrolling for
  enlarged text and short screens rather than clipping content.
- Keep quizzes available for voluntary practice. Recommend them after completion
  without requiring them to access another challenge or changing completion
  percentages. Out-of-order completion must still offer a quest review when the
  last outstanding challenge is finished, wherever it sits in the dataset.
- After a quiz, return to its quest/subject map or follow a practice suggestion.
  Do not send the child through an endless quiz/intro loop.

## Quiz design and evidence

- Use a separate, untimed run with one scored initial submission per item.
  Include “I'm not sure” as an explicit skip. Lock submitted answers; show
  explanations after submission and never alter the initial result with retries.
  Practising an explanation or starting a fresh attempt is a separate action.
- Each quest blueprint selects one item from every built topic. Each
  final-test blueprint selects two items per quest, balancing topics and skills.
  These are starting counts for review, not claims of exhaustive assessment.
  Split longer tests into short resumable sections rather than omitting coverage.
- Select within topic/quest quotas first, then mix the order. Inject deterministic
  randomness for tests and freeze the selected item versions/order for a run.
  Deduplicate by item identity/content; inadequate pools are authoring failures,
  never silently padded repeats or omitted topics.
- Author alternate items/variants for fresh attempts. Reuse a builder only after
  reviewing its question types, scoring, level and visuals for assessment use.
  Keep useful evidence, diagrams and manipulatives. Do not reveal a live answer
  through a picture, worked example, hint or speech text.
  The implementation baseline is three reviewed candidates per built topic
  (at least 2,769 candidates currently), not merely 255 blueprint objects.
- Preserve the skill being assessed: read-aloud may support Maths but must not
  read out a reading/dictation answer; French needs appropriate language support.
  Practical, creative and physical subjects need knowledge/application questions
  that honestly describe what was sampled. A quiz cannot certify physical or
  creative performance, or complete subject mastery.
- Results distinguish incorrect, skipped and not yet answered. Show coverage
  alongside the score and make practice suggestions from the sampled items.
  Do not diagnose a misconception or label a whole topic mastered from one item.
- Keep results across attempts, with latest-result access from the map. Partial
  runs remain resumable and are visibly different from completed tests. Start
  without extra XP, badges or a pass/fail award; “Quest Mastery” is an activity
  title, not a certification claim.

## Technical boundaries

Proposed names are implementation targets, not existing APIs.

| Layer | Planned changes |
|---|---|
| Content | `src/data/curriculumIntroductions/` holds authored subject/quest/topic explanations, source references and visual metadata keyed by existing IDs. An index resolves content by year/subject/scope. |
| Assessment definitions | `shared/curriculumAssessments/` holds versioned blueprints, item factories and pure scoring adapters usable by Node and the frontend. Lazy-load by pathway; keep private API answer keys out of pupil payloads. |
| Intro UI | `src/components/curriculum/CurriculumIntroduction.jsx` plus a scoped journey hook/resolver. Reuse Mascot, SpeakButton, theme tokens and existing useful visual components. |
| Quiz UI | `src/pages/curriculum/AssessmentView.jsx`, an independent `AssessmentRunner` and result view. Extract/reuse subject round controls where practical without changing their existing challenge lifecycle. |
| Entry/navigation | Integrate in `CurriculumPage.jsx`, `ProblemView.jsx` and completion actions. Preserve `findNextChallenge`'s challenge-only contract; add a separate resolver for recommended introductions/reviews. |
| Routes | Add lazy routes under `RequireChild`, for example `/curriculum/year/:year/:subject/quest/:categoryId/mastery` and `/curriculum/year/:year/:subject/final-test`. Validate every parameter and support direct server requests without public indexing. |
| Persistence | Add journey-state and assessment-session/result methods to both async store drivers, authenticated server routes, shared validation and MongoDB collections/indexes. Keep ownership and saves within the existing store seam. |

Persist two separate versioned record types:

1. **Journey state**, scoped to child/year/subject: acknowledged introduction
   scope IDs and content versions. Merge acknowledgements monotonically so stale
   tabs cannot undo them. Continue and Skip both acknowledge the scope; no
   separate viewing analytics. Neither is evidence of understanding.
2. **Assessment session**, scoped to child/year/subject and quest/final-test:
   stable session ID, definition version, fixed item versions/parameters/order,
   initial responses/outcomes, explicit skips, revision and status.
   Finalised results are immutable. Pin in-progress runs to their definition;
   content updates must not rescore historical attempts or change resumed items.

The live API creates sessions and scores responses using its trusted item
definitions, rather than accepting a client-supplied score. Local mode uses the
same pure scoring rules. Use idempotent response/finalisation writes and revision
checks to prevent double taps, retry requests and stale tabs from duplicating or
overwriting answers. Handle incompatible simultaneous edits visibly.

Both record types need successful-read hydration and identity guards, ordered
writes, visible retry errors and account/profile/year/subject isolation.
Extend child/account deletion to remove their new records. The current privacy
notice is a draft, not an approved retention policy. Initially retain records
with the child until profile/account deletion, collect only the feature's
necessary fields, and update the notice and existing review follow-up to describe
the new data. Do not invent an approved policy or automatic data deletion.

The existing `dl.progress` / API progress document, numeric challenge IDs,
reward data and award membership stay intact. New collections need their own
version/validation contracts. If implementation changes any existing stored
shape, write the numbered migration and legacy regressions required by the
progress skill before shipping.

## Implementation sequence and acceptance

Use the handoff's work packets for executable steps within these milestones.
Build behind explicit frontend/backend flags, default off until full-scope
coverage is ready. This allows internal validation while retaining the owner's
single launch across all built pathways.

### 1. Coverage manifest and reusable content contract

Generate a registry-and-built-module manifest of every pathway, quest and topic.
Add an authoring checklist for explanation goals/usefulness, statutory mapping,
visual model, item quotas, scoring and review status. Add a checker that reports
missing introductions, missing quiz adapters, invalid IDs, insufficient pools
and broken practice links across the entire launch scope.

**Done when:** the checker enumerates all current built content and reports the
initial gaps explicitly. An unbuilt topic is never offered as a quiz/practice
destination. Future course authoring includes these new requirements.

### 2. Storage, session and scoring foundation

Implement validated versioned records, both store drivers, authenticated routes,
ownership, deletion and indexes. Add the session/revision/finalisation protocol
and deterministic scoring tests before connecting live learner flows.

**Done when:** local and API fixtures can acknowledge an intro and start, save,
resume and finalise a quiz without touching old progress. Failed reads/writes,
unauthorised access, stale writes, duplicate requests and identity switching
are covered. Broader progress/account/reward regressions pass immediately.

### 3. Prove the experience with representative internal samples

Build the intro sequence, map entry points, quiz runner and results. Start with
Year 3 Maths Fractions, then exercise English reading/dictation, a Science
diagram, History/Geography evidence, an Adventure subject and a practical-subject
knowledge check. Test subject-final selection across every quest as well.

**Done when:** each distinct rendering/scoring family works, including direct
links, arbitrary challenge order, replay, skip, partial resume and practice
navigation. Existing challenge screens and callbacks retain their behaviour.
These samples are development validation, not the public release scope.

### 4. Author and integrate all built pathways

Complete Maths/English, then Science/History/Geography, then the remaining Year 5
and Year 6 subjects, covering every built year in each family. Read each exact
mapping row before drafting explanations or selecting assessment items. Preserve
existing historical/source credits, language settings and subject interactions.

Use the manifest to track all 1,178 introductions and 255 assessments, including
reviewed item variants. Independently recompute answers, check distractors and
ensure application examples are useful and age appropriate. Do not bulk-generate
generic explanations from titles or call unreviewed content complete.

**Done when:** every manifest entry has authored content and reviewed quiz
coverage; the global checker has no unexplained gaps. Each pathway's final test
includes every built quest. Reconcile newly added `dev` content before release.

### 5. Complete verification and release as one feature

Run focused checks per milestone, then `npm run lint`, `npm test` and
`npm run build` once for the final integrated implementation. Verify direct HTTP
routes/indexing; run `npm run check:seo` when the route/catalogue changes require
it under [validation policy](../../VALIDATION.md).

Use jsdom playthroughs for new-child and existing-child introductions, replay,
deep links, back/refresh, out-of-order completion, quiz answers/skips/results,
resume and save failures. Cover each interaction/scoring family with meaningful
component tests and every blueprint with pure coverage/scoring tests. Include
legacy progress fixtures, both stores, siblings, account changes and earned awards.

Use one batched browser pass only for remaining layout/overlap/drag/map gaps,
covering phone/tablet/desktop and both themes; fix findings and confirm at most
once more. Record physical-device, accessibility and child/teacher review
separately from automated checks. Browser tooling being unavailable must not
block non-browser work or be reported as an app failure.

**Done when:** all built pathways meet the content manifest and technical
acceptance criteria; remaining human/device review limits are explicit. Release
readiness is assessed against that evidence. Update architecture, authoring,
inventory and the changelog for delivered behaviour, and retain only unfinished
work in Project Ideas. No automatic deployment is part of this planning task.

## Evidence at planning handoff

| Category | Current evidence |
|---|---|
| Implemented | Plan and linked idea only. No new application behaviour or storage changes. |
| Source checked | Registry/datasets/module paths; lesson/challenge contracts; progress versus award completion; both stores and API ownership/deletion/CAS; RequireChild onboarding; SSR route-manifest production; number/letter control capacity. Statutory Year 3 Maths mapping is a representative example; other subjects need their own source review during authoring. |
| Technically checked | All 39 pathway ledger rows match source: 216 quests, 923 topics, 3,692 expected challenge files. Derived totals: 1,178 intros, 255 assessments, minimum 2,769 candidate items. Documentation whitespace, code fences, local links and diff checks pass; details in handoff. |
| Content reviewed | Product scope confirmed by owner. Introduction copy, quiz items and subject adaptations are not yet authored/reviewed. |
| Device/learner reviewed | Not performed for this plan. |
| Deferred | All implementation tests, full lint/test/build and browser/device checks; documentation-only planning does not require app validation. |

## Second-pass review findings and resolutions

| Gap in the first plan | Resolution for implementation |
|---|---|
| Quiz lifecycle was described but not specified | Exact start/respond/finish protocol, fixed snapshots, revision checks, duplicate-request semantics and public serializer allowlist. |
| Reusing the existing round could discard the real response | A controlled assessment round submits the raw value; existing completion shells keep their current contract. |
| Introduction storage failure could obstruct open challenges | Retry and an explicit Continue for now path; failed reads never create writable empty journey state. |
| Direct links, explicit replay and refresh needed one consistent approach | In-place entry boundary at the destination URL; validated replay/session search parameters; no arbitrary return URL. |
| An end-of-quest positional check would miss arbitrary completion order | Compare existing before/after completion predicates, with separate explicitly labelled review actions. |
| A short history page could give incorrect map status | One authoritative overview for every quiz scope, plus separate paginated history. |
| Server availability could diverge from Vite-only module discovery | Generated/checkable built-content manifest with filesystem and browser parity checks. |
| Adding only React routes would leave direct quiz links returning HTTP 404 | Extend the SSR `curriculumPaths()` route-manifest producer and SEO metadata; test built HTTP routes. |
| Existing keypad/letter controls cannot enter every year's answer | Explicit assessment controls/capacity checks for large, signed and decimal numbers, spelling and French accents. |
| Award completion and built-content map completion use different strictness | Review recommendations use the existing built-content lock state, while award predicates remain unchanged. |
| “All subjects” could conceal a large unfinished content set | 39-pathway ledger, exact quotas, minimum candidate counts, family-specific examples and strict all-scope release check. |
| Existing privacy wording did not describe attempt records | Update factual notice/deletion behaviour and carry forward existing qualified-review limits; no invented approved policy. |
| Multi-session implementation needed a durable next step | Numbered work packets, measurement/resume instructions and a ready-to-paste handoff prompt. |
