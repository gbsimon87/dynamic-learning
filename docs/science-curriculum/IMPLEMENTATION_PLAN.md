# Year 3 Science: implementation plan

**Approved:** 2026-10-03. **Branch:** `feat/year-3-science`.
**Current status:** Science registered; Plants, Animals, Rocks and Light fully implemented; Forces and magnets 5/5 topics (20/20 challenges). Science: 21/21 topics, 84/84 challenges. Automated and initial render checks passed; interactive browser and owner review pending.
**Second pass:** 2026-10-03; bug/security findings and implementation checks are recorded in the tracker.
**Final code review:** 2026-10-03; six defect groups fixed across the initial and follow-up reviews; automated checks passed. [Findings and remaining verification](BUG_SECURITY_REVIEW.md).

The owner authorised completing the whole Light category on 2026-10-03, superseding the topic-by-topic pause for this batch.

The owner authorised proceeding one topic at a time through Forces and magnets on 2026-10-03. Each topic is implemented, checked and documented before starting the next; no additional per-topic permission pause is needed.

Live progress and the resume point belong in [the tracker](y3-science-tracker.md).
The [topic brief](TOPIC_BRIEF_YEAR3.md) specifies each topic's four challenge designs.
This plan records the approved product decisions; proposed lesson designs in the brief have not yet had content or browser review.

## Goal and approved decisions

Build Year 3 Science in Curriculum Mode using the established English/Maths architecture:
five categories, 21 topics and exactly four challenges per topic (**84 challenges**).

| Decision | Agreed approach |
|---|---|
| Year and mode | Year 3 substantive Science only; Curriculum Mode only. |
| Category order | The five categories in the supplied programme of study's order. |
| Granularity | Split requirements only where four challenges cannot teach them well; use the approved list below. |
| Working scientifically | Embedded in content topics, not a sixth category or additional investigation topics. These are shared Years 3–4 expectations, not all required for each topic. |
| Digital enquiry | Guided: an ungraded prediction, a fair comparison, staged observations, recorded findings and a built conclusion. |
| Time and persistence | Learner-controlled observation stages; no real-time waiting or persisted experiment state. |
| Challenge length | Five questions for short tasks; three substantial rounds for investigations. |
| Assessment | Choices, diagrams, sorting and built explanations; no required free writing or spelling gate. |
| Support | Optional tap-to-read speech, scientific vocabulary glosses and narrowing hints after two misses. |
| Visuals | CSS/SVG for models; curated specimen images may be packaged locally. |
| Technical defaults | Existing dependencies, plain scoped CSS, both themes, keyboard alternatives, reduced motion and touch targets at least 44px. |
| First new interactions | Diagram labelling, followed by guided plant comparisons. Build richer models when their categories are reached. |
| Practical work | Optional collapsed “Try with a grown-up” activity cards at relevant topic completions; no completion tracking or progression gate. |
| Availability | Register Science during groundwork; do not wait for all challenges. Implementation remains on the feature branch. |
| Delivery and review | Category by category, topic by topic; make each complete four-challenge topic available for owner review before continuing. |
| Documentation | Separate plan, implementation tracker and Year 3 topic brief. |

## Approved topics and stable identifiers

| Category | Topics in order |
|---|---|
| Plants | Parts of Flowering Plants; What Plants Need to Grow; Water Transport in Plants; Pollination and Seed Formation; Seed Dispersal |
| Animals, including humans | Nutrition for Animals and Humans; Skeletons for Support and Protection; Muscles and Movement |
| Rocks | Comparing and Grouping Rocks; How Fossils Form; What Soil Is Made From |
| Light | Light and Darkness; Reflected Light; Protecting Our Eyes from Sunlight; How Shadows Form; Changing Shadow Size |
| Forces and magnets | Movement on Different Surfaces; Contact and Magnetic Forces; Magnetic Materials; Magnets and Their Poles; Predicting Attraction and Repulsion |

Category and topic titles become identifiers through `toKebabCase`.
The tracker records the computed IDs; freeze them before registration and lock them with tests.
Changes after shipping require deliberate compatibility handling; never silently rename an identifier.
The skeleton requirement is split into support/protection and movement.
The flowering-plant life-cycle requirement is split into pollination/seed formation and dispersal.
Overlapping magnetic-material requirements share one topic.

## Source and coverage groundwork

[The supplied Science reference](../curriculum/year-3-science.md) is the curriculum authority.
Groundwork has preserved the statutory text and non-statutory guidance, verified the official source metadata and appended the app topic mapping. The completed groundwork requirements were:

1. Verify its provenance against the official Department for Education programme of study.
   Record the verified source URL, verification/retrieval date, statutory status and licence.
   Keep the supplied statutory wording verbatim; do not silently correct or paraphrase it.
2. Append a clearly labelled app-authored mapping: each approved topic to the relevant substantive requirements and enquiry skills.
   The brief's references are an initial design crosswalk, not a replacement for this source mapping.
3. Record Year 3 boundaries and limitations: digital representations do not establish practical equipment handling,
   independent oral reporting, real-world observation or independent written scientific reporting.
   Optional activities provide opportunities but are not assessed or certified by the app.
4. Add Science to the curriculum reference index and reflect implementation status in project knowledge.
   Keep unrelated Year 4/5 Science and History reference files intact.

Source verification and mapping were completed during groundwork; evidence is recorded in the tracker. The original documentation milestone itself did not implement those steps.

## Architecture and interfaces

- Create `src/data/year3ScienceCurriculum.js` in the existing dataset shape:
  categories with title-derived IDs, topics with names and display icons, and challenge IDs 1–4.
  Register `year: 3, subject: "science"` in the existing curriculum registry.
  Science is already in the subject catalogue; Year 3 already exists.
- Pure authored banks, builders and validators belong in `src/data/challenges/science/`.
  Use one topic builder with an injected RNG, bounded shuffle/selection, and per-topic `node:test` coverage.
  Short levels have at least 15 meaningful bank items; investigation levels have at least nine complete scenarios.
  Equivalent valid arrangements or explanations must be accepted; otherwise constrain the task so its answer is unambiguous.
- Give every topic a shared `<Pascal>Game.jsx` and four thin default-export wrappers beneath
  `src/pages/skills/science/challenges/year3/<topic-id>/<Pascal>Challenge<N>.jsx`.
  The existing dynamic route and Vite glob find these; do not add routes for individual challenges.
- Build questions once per run with memoisation; key round state by question index.
  Preserve `ChallengeShell({ title, questions, render, onComplete })`,
  `render({ question, submit, locked, index, misses })` and `onComplete({ combos })`.
  Pass the completion callback through unchanged. Only the host persists completion and awards rewards.
- An investigation is one shell question with internal stages. Predictions and observation navigation do not submit an answer.
  Wrong assessable setup/record/conclusion attempts call `submit(false)` and stay on their stage.
  Correct intermediate checks only unlock the next stage locally; call `submit(true)` once all assessed work in the round is correct.
  Freeze completed setup before observations. A setup edit or reset invalidates observations, recorded answers,
  the chosen conclusion and all downstream validation; require the affected stages to be completed again.
  Reset the round on advancement or leaving the challenge. Use a pure stage reducer with a synchronous acceptance guard
  and round revision to reject repeated transitions and callbacks belonging to an earlier stage, setup or run.
  Final validation checks the current revision's complete required record, not a cached success flag or DOM text.
- Shell `misses` is cumulative within a question, including an entire investigation round; it resets only on question advancement.
  After two assessed misses in that round, show a hint relevant to the current stage. Do not reset the shared shell at stage boundaries.
  A prediction never increments misses; a reset never rerolls the question or clears the shell's misses/combo history.
- Reuse sorting, sequencing, tables, charts, measurement, choices, tiles, hints and speech.
  New boards accept content, controlled learner state, change callbacks and `disabled`; no storage writes.
  Put scientific model logic outside React and use it for both the drawing and the validator.
- `DataTable` is read-only apart from displaying one blank; it is not a multi-cell editor.
  Record results through explicit labelled numeric/choice inputs and render the controlled values in the table.
  Its single-blank mode may show the active cell while the other recorded cells remain visible.
  Preserve its current public API and defaults rather than implying it collects a whole record itself.
- Add Science category icons and Science hero glyphs to the curriculum presentation using existing theme tokens.
  Other subject decoration and shared component defaults retain their existing behaviour.

### New shared interactions, added only when needed

| Component | Contract and intended use |
|---|---|
| `DiagramLabelBoard` | SVG diagram, target descriptors, label descriptors, placement map, `onPlace(labelId, targetId or null)`, `disabled`. Select a label then a large target; placed labels can be removed. Each label occupies at most one target and each target holds at most one label; an occupied target must be emptied before replacement. Moving a label clears its old position in the same functional update. Plants first, then supported body and light diagrams. |
| `ObservationSequence` | Authored stage descriptors, controlled stage index, `onStageChange`, `disabled`. Label time/stage clearly; retain access to earlier observations. Plant transport/growth, life cycles, soil and fossils. |
| `FairTestBoard` | Supplied factor/condition choices, controlled setup, change callback, `disabled`. Show the changed factor and kept conditions together. Growth first; surface/material comparisons later. |
| `SpecimenViewer` | Local specimen descriptors with images and descriptions, controlled selected specimen, selection callback and `disabled`. Inline enlargement/inspection; avoid introducing a second modal pattern. Rocks and seeds when images add observable evidence. |
| `ShadowExplorer` | Fixed-screen scene, controlled source/object distance choices, change callbacks and `disabled`. A pure geometry model determines the visible shadow and measurements; change one distance at a time. |
| `MagnetExplorer` | Labelled two-pole magnets, controlled discrete facing-pole arrangements and run/reset actions, `disabled`. Pure pole rules determine demonstrated attraction/repulsion; no continuous physics engine. |

Keep styles in the shared kit or a scoped Science kit stylesheet; use theme tokens rather than hardcoded colours.
Every control has a keyboard/tap alternative. Functional animation is optional under reduced motion.
Curated images must have verified source/licence records, suitable descriptions, and visible evidence sufficient for the question.
No question depends on an unavailable external image request.

## Bug prevention and content security

- Validators require the exact non-empty set of required label/card/record IDs and complete learner answers.
  Reject unknown IDs, missing values, duplicate placements and non-finite measurements. An empty `every(...)`
  or blank-normalised answer must never count as correct. Validate a choice against its question's allowed options.
  Bank tests require unique descriptor IDs and unique display labels where existing components use labels as keys.
- All controls and their callbacks honour both the shell lock and the current investigation stage/revision.
  Disabled appearance alone is insufficient: an in-flight drag, repeated tap or delayed animation may still invoke a handler.
  Animation and speech never determine scientific results or completion. Cancel owned work on reset/unmount;
  reject late results after route, question or child changes.
- Keep observation/result data fixed for a scenario and accepted setup; resetting or inspecting earlier stages
  must not draw new random results. Scenarios used for comparisons label their conditions, times and units.
  Bound stage indices and model inputs. The shadow model requires source before object before screen,
  with positive distances; reject zero-distance/non-finite geometry. Grade the measurement at the same
  stated precision displayed to the learner, rather than comparing a rounded display to an unrounded answer.
- Render authored strings as React text and diagrams as reviewed JSX/SVG components.
  No `dangerouslySetInnerHTML`, `innerHTML`, runtime HTML/Markdown execution or injected downloaded SVG markup.
  Curated photos are local raster assets selected through a fixed catalogue; source URLs are provenance only.
  Do not derive image/import paths from route parameters, learner input or arbitrary URLs, or package
  fetched scripts/active SVGs as lesson assets. Public assets contain no seed credentials, child/profile data or tokens.
- Missing essential specimen images or invalid model/scenario data display a recoverable retry/unavailable state.
  They never fabricate observations, accept a guessed answer, skip a question as completed or write progress.
  Provide equivalent accessible observation evidence without putting the expected answer into hidden text, speech or target labels.
- Use the existing authenticated route, host and async store for progress/rewards.
  Science needs no new account/progress endpoints, client identity authority or bypass flag.
  Only an explicitly absent document means a fresh learner; failed reads or malformed documents do not become writable empty progress.
  Keep profile/run keys, hydration guards, save queues and retry controls intact. Test local and API paths separately;
  a skipped database authorization test does not establish verified API ownership.

## Practical activities and shared completion presentation

Store activities in a pure Science content catalogue keyed by topic ID.
Each card contains materials, short steps, what to observe and specific grown-up/safety instructions.
Offer activities only where they support the source guidance; do not create a mandatory activity for every topic.

Resolve activities by the validated year/subject/topic tuple; only Year 3 Science has this catalogue.
The host selects a relevant activity when the completion result earns the strict topic milestone
(all four planned challenges built and completed), not an availability-based topic-complete flag.
Pass it through an optional `practicalActivity` prop to `CompletionCelebration`.
Render a collapsed accessible disclosure on its final screen alongside the existing next actions;
it does not add a required step, alter milestone calculation, award XP, or write state.
Components with no activity prop behave as before.
Provide the same disclosure from fully completed Science topics in the topic map using `fullTopicComplete`
so it can be revisited without replaying a challenge. A partial topic never exposes it as an earned completion activity.
Give the disclosure native accessible expand/collapse behaviour and scope its styling to avoid affecting other subjects' celebrations.
Render authored activity instructions as text; expanding a card never awards anything or initiates a save.
Never include sun-viewing tests or suggest direct viewing through dark glasses.

## Delivery sequence and review

1. **Documentation milestone:** create these three documents and link them from project knowledge.
   Stop for owner review; do not implement the feature in this milestone.
2. **Groundwork:** verify source metadata, append the curriculum/enquiry mapping, register all 21 topics,
   lock identifiers, add Science presentation and dataset/availability/milestone coverage.
   Science becomes selectable immediately; unbuilt topics remain unavailable.
3. **Plants:** implement Parts of Flowering Plants first, including diagram labelling.
   Review its four challenges; continue through the remaining Plants topics in order.
   Introduce staged observations and fair comparison with the topics that need them.
4. **Remaining categories:** Animals, including humans → Rocks → Light → Forces and magnets.
   Complete, verify, document and review each topic before continuing.
5. **Final verification:** check the continuous path, all 84 files, full subject completion, cross-subject Year 3 completion,
   replay and unchanged pre-existing English/Maths progress.

Use existing availability and unlock rules throughout; do not change progress shape, keys or rules.
Release each complete four-challenge topic in approved order. Do not ship placeholder wrappers or out-of-order slots:
file presence is availability, and adding an earlier missing challenge can make a later completed topic locked again.
The registry may appear before playable content; show unavailable content honestly and do not award empty curricula.
Coverage tests grow with the completed release prefix; check all registered topics have four planned slots,
but require implementation files only for the topics marked implemented in that release (all 84 at the final milestone).
Availability-based progress can reach 100% of currently built work while full-curriculum completion is still pending.
Subject/year milestones wait for all planned challenges to be built and completed.
Existing earned rewards stay earned. Newly registered Science joins the existing Year 3 completion requirement.

## Acceptance checks and tracking

- Dataset tests cover five ordered categories, 21 unique topic IDs, 84 slots, stable identifiers and separate challenge arrays.
- Coverage checks derive filenames with the loader's naming algorithm and check default exports and callback forwarding.
- Bank/model tests cover answer availability, acceptable alternatives, meaningful bank sizes, stage ordering,
  recorded units, setup fairness, conclusions supported by supplied evidence and consistent model/drawing outcomes.
  Exercise multiple seeds and constant RNGs; never sample in an unbounded retry loop.
  Include partial/empty answers, duplicate and unknown IDs, setup/reset invalidation, rapid stage transitions,
  callbacks from an old revision, stable observations, model bounds and displayed measurement precision.
  Check model outcomes against independent known examples, not only the model's own generated answer.
- Every completed topic must pass `npm run lint`, `npm test` and `npm run build`.
  Browser checks cover two wrong attempts and hints, no premature advancement, a full run, saved completion,
  reload, replay, celebration, keyboard use, phone width, both themes, reduced motion and unavailable speech.
- Regression checks cover existing Year 2/3 Maths and Year 3/4 English, unavailable/failing challenge loads,
  partial Science availability, profile isolation and subject/year awards.
  Use disposable test profiles; never clear real learner data.
  Include failed reads/saves and retries, registration without an initial progress write, four-slot release expansion,
  completion during profile/route switches, missing specimen assets, literal markup-like text, strict practical-activity
  eligibility and celebrations without the new optional prop. Database-dependent ownership checks remain pending when skipped.
- Browser inspection is conditional on tools actually available in the session.
  If unavailable, continue terminal/static verification and record interactive checks as pending.
  Do not equate an initial render or passing unit tests with an interactive review.
- Update the tracker after every completed topic, material decision, blocker and pause.
  Record changes, bank sizes, checks actually run, outstanding risks, owner feedback and the exact next task.
  A topic is implemented before it is verified; owner review is a separate status.
