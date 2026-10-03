# Year 3 Science: implementation tracker

**Start here to resume.** Branch: `feat/year-3-science`.
**Last updated:** 2026-10-03.
**Current milestone:** Final code bug/security review complete; all 84 challenge implementations and automated checks passed. Interactive browser and owner review pending.
**Built:** 21 of 21 topics; **84 of 84 challenges**. Forces and magnets: **20/20**. Science is registered for Year 3.

## Resume point

All 84 challenges are implemented. Next task: owner and interactive browser review of the complete Science path.
The owner authorised completing the entire Forces and magnets category, one topic
at a time. Each preceding topic has been implemented, checked and documented.

Review `Predicting Attraction and Repulsion` at
`/year/3/science/problem/forces-and-magnets/predicting-attraction-and-repulsion/1` with a selected
Year 3 child and preceding work completed. All topics have four challenges;
short runs use five tasks and guided C4 enquiries use three rounds. Verify two wrong attempts,
hints, keyboard/touch controls, all stages, reset, full runs, celebrations, saved
completion, reload/replay, phone width and both themes. Browser tools were unavailable;
SSR is initial-render evidence, not an interactive playthrough. Keep real learner
data intact. Storage/auth/reward/unlock rules and identifiers remain unchanged.

| Document | Purpose |
|---|---|
| [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) | Approved decisions, 21-topic list, architecture, delivery sequence and acceptance criteria. |
| [TOPIC_BRIEF_YEAR3.md](TOPIC_BRIEF_YEAR3.md) | Four challenge designs and boundaries for every topic, computed names and implementation/verification rules. |
| [BUG_SECURITY_REVIEW.md](BUG_SECURITY_REVIEW.md) | Final code review findings, fixes, repeatable checks and remaining verification. |
| [Year 3 Science source](../curriculum/year-3-science.md) | Supplied text preserved verbatim; official provenance checked and 21-topic crosswalk added. |
| [Project knowledge](../PROJECT_KNOWLEDGE.md) | Shared architecture and current implemented state. |
| [English tracker](../english-curriculum/IMPLEMENTATION_TRACKER.md) | Reference pattern for implementation versus verification status. |

## Decisions locked on 2026-10-03

- Year 3 substantive content only; Curriculum Mode only.
- Five categories in source order; 21 approved topics; four slots per topic, 84 total.
- Embedded enquiry; no standalone enquiry category or additional investigation topics.
- Five short questions or three substantial investigation rounds, as specified in the brief.
- Guided enquiry with ungraded predictions, learner-controlled observation stages and evidence-based explanations.
- Scientific understanding through choices, diagrams, sorting and built explanations; optional speech, glosses and hints after two misses.
- CSS/SVG models; curated local specimen images may be used; current dependencies.
- Diagram labelling first, guided plant comparisons next, richer models introduced with later categories.
- Optional collapsed grown-up activity cards at relevant topic completions; no tracked practical completion.
- Register Science at groundwork and build incrementally on this branch.
- Category-by-category implementation with owner review of each complete topic before continuing.
- Separate plan, tracker and topic brief; keep the tracker current after each topic and at pauses.

These decisions are already approved. Ask again only when new evidence creates a material change.

## Milestones

| Milestone | Status | Evidence / next action |
|---|---|---|
| Discovery and product choices | Complete | Source, guides, English/Maths patterns and shared kit inspected; owner approved the decisions and topic list. |
| Planning documents | Complete | Plan, tracker and all-topic brief written; documentation consistency, lint, tests and build passed. |
| Source provenance and mapping | Complete | Official DfE provenance/OGL checked; supplied excerpt unchanged; 21-topic app crosswalk and reference-index entry added. |
| Dataset, identifiers and registry | Complete | 21 topics, 84 independent slots, literal locked IDs; Year 3 Science registered with release-prefix/milestone checks. |
| Science curriculum presentation | Implemented | Five category icons and Science hero glyphs; browser/theme inspection pending. |
| Plants | Implemented; browser pending | All five topics implemented (20/20); owner authorised proceeding into Animals. |
| Animals, including humans | Implemented; browser pending | All three topics implemented (12/12); Muscles owner and browser review pending. |
| Rocks | Implemented; browser pending | All three topics implemented (12/12). |
| Light | Implemented; browser pending | All five topics / 20 challenges; whole-category implementation authorised 2026-10-03. |
| Forces and magnets | Implemented; browser pending | 5 topics / 20 challenges; built and checked in order. |
| Full curriculum and regression verification | Automated passed; browser pending | All 84 actual wrappers, release order, replay and strict subject/year awards tested. Real saved-progress playthrough pending; other subjects preserved. |

## Topic and challenge status

Challenge states: **Planned → In progress → Implemented**.
Automated checks, interactive browser checks and owner review are separate evidence columns.
A file existing does not establish working interaction or reviewed content.
When a topic has partial progress, expand its notes below with per-challenge verification details.
Mark a topic fully done only when required checks and owner review are complete;
record unavailable browser checks explicitly rather than claiming they passed.

| Category | Topic | Topic ID | C1 | C2 | C3 | C4 | Automated | Browser | Owner review |
|---|---|---|---|---|---|---|---|---|---|
| Plants | Parts of Flowering Plants | `parts-of-flowering-plants` | Implemented | Implemented | Implemented | Implemented | Passed | Unavailable; pending | Proceed authorised |
| Plants | What Plants Need to Grow | `what-plants-need-to-grow` | Implemented | Implemented | Implemented | Implemented | Passed | Unavailable; pending | Proceed authorised |
| Plants | Water Transport in Plants | `water-transport-in-plants` | Implemented | Implemented | Implemented | Implemented | Passed | Unavailable; pending | Proceed authorised |
| Plants | Pollination and Seed Formation | `pollination-and-seed-formation` | Implemented | Implemented | Implemented | Implemented | Passed | Unavailable; pending | Proceed authorised |
| Plants | Seed Dispersal | `seed-dispersal` | Implemented | Implemented | Implemented | Implemented | Passed | Unavailable; pending | Proceed authorised |
| Animals, including humans | Nutrition for Animals and Humans | `nutrition-for-animals-and-humans` | Implemented | Implemented | Implemented | Implemented | Passed | Unavailable; pending | Proceed authorised |
| Animals, including humans | Skeletons for Support and Protection | `skeletons-for-support-and-protection` | Implemented | Implemented | Implemented | Implemented | Passed | Unavailable; pending | Proceed authorised |
| Animals, including humans | Muscles and Movement | `muscles-and-movement` | Implemented | Implemented | Implemented | Implemented | Passed | Unavailable; pending | Proceed authorised |
| Rocks | Comparing and Grouping Rocks | `comparing-and-grouping-rocks` | Implemented | Implemented | Implemented | Implemented | Passed | Unavailable; pending | Proceed authorised |
| Rocks | How Fossils Form | `how-fossils-form` | Implemented | Implemented | Implemented | Implemented | Passed | Unavailable; pending | Proceed authorised |
| Rocks | What Soil Is Made From | `what-soil-is-made-from` | Implemented | Implemented | Implemented | Implemented | Passed | Unavailable; pending | Proceed authorised |
| Light | Light and Darkness | `light-and-darkness` | Implemented | Implemented | Implemented | Implemented | Passed | Unavailable; pending | Pending |
| Light | Reflected Light | `reflected-light` | Implemented | Implemented | Implemented | Implemented | Passed | Unavailable; pending | Pending |
| Light | Protecting Our Eyes from Sunlight | `protecting-our-eyes-from-sunlight` | Implemented | Implemented | Implemented | Implemented | Passed | Unavailable; pending | Pending |
| Light | How Shadows Form | `how-shadows-form` | Implemented | Implemented | Implemented | Implemented | Passed | Unavailable; pending | Pending |
| Light | Changing Shadow Size | `changing-shadow-size` | Implemented | Implemented | Implemented | Implemented | Passed | Unavailable; pending | Pending |
| Forces and magnets | Movement on Different Surfaces | `movement-on-different-surfaces` | Implemented | Implemented | Implemented | Implemented | Passed | Unavailable; pending | Pending |
| Forces and magnets | Contact and Magnetic Forces | `contact-and-magnetic-forces` | Implemented | Implemented | Implemented | Implemented | Passed | Unavailable; pending | Pending |
| Forces and magnets | Magnetic Materials | `magnetic-materials` | Implemented | Implemented | Implemented | Implemented | Passed | Unavailable; pending | Pending |
| Forces and magnets | Magnets and Their Poles | `magnets-and-their-poles` | Implemented | Implemented | Implemented | Implemented | Passed | Unavailable; pending | Pending |
| Forces and magnets | Predicting Attraction and Repulsion | `predicting-attraction-and-repulsion` | Implemented | Implemented | Implemented | Implemented | Passed | Unavailable; pending | Pending |

Category IDs: `plants`, `animals-including-humans`, `rocks`, `light`, `forces-and-magnets`.
IDs are computed from approved titles and must match the dataset, directory names and URL/storage keys.

## Shared components, content and integration

| Work item | Status | First use / verification |
|---|---|---|
| Pure Science question builders and bank conventions | Implemented | First topic: 16 observations and 16 diagram cases; deterministic sampling, all-part coverage and invalid-answer checks passed. |
| DiagramLabelBoard | Implemented | Atomic placement/removal and occupied-target rejection tested; button keyboard controls and 48px targets authored; interactive check pending. |
| ObservationSequence | Implemented | Controlled authored stages, previous observations and reset; 27 growth screens preserve their default output; 27 water screens use the optional JSX renderer with tested dye marks. |
| Process-enquiry reducer and hook | Implemented | Pollination topic: reusable topic-validated records/conclusions; revision/version, unmount and synchronous completion guards. Existing water/growth reducers retained. |
| FairTestBoard | Implemented | Controlled seven-card setup; exact factor/complete-ID validation; investigation revision/version guards. |
| SpecimenViewer and curated asset provenance | Planned | Introduce with relevant seed/rock specimen tasks; asset evidence and descriptions. |
| ShadowExplorer and pure geometry | Implemented | Controlled discrete positions, fixed screen, source/object movement separately; independent geometry and whole-cm measurement tests; initial renders passed. |
| MagnetExplorer and pure pole rules | Implemented | Forces and magnets; discrete arrangements and observed interaction. |
| Practical activity catalogue and optional completion input | Implemented | First four topic observation/care activities; strict scoped eligibility tested; final-screen and map disclosures; no writes or awards. |
| Science kit styling | Implemented | Existing tokens, responsive labels, no new motion; browser inspection of themes/phone pending. |
| Existing progress/reward/loader regression checks | Automated passed | Full existing suite; prefix expansion and strict awards tested; actual Vite glob sees all four wrappers. Interactive checks pending. |

## Verification log

| Date / milestone | Check | Result |
|---|---|---|
| 2026-10-03 / documents | Branch and working-tree inspection | On `feat/year-3-science`; no existing Science planning directory. |
| 2026-10-03 / documents | Document links, 21-topic/84-slot consistency, computed identifiers | Passed: three files, five ordered categories, 21 unique computed topic IDs, 84 challenge designs, 11 valid local links and no trailing whitespace. |
| 2026-10-03 / documents | `npm run lint` | Passed. |
| 2026-10-03 / documents | `npm test` | Passed: 1,016 passes, zero failures, one database-dependent skip (`MONGODB_URI` not set); 1,017 total. |
| 2026-10-03 / documents | `npm run build` | Passed; existing large-chunk warning remains. |
| 2026-10-03 / documents | Science browser verification | Not applicable to documentation-only work; no Science UI exists yet. |
| 2026-10-03 / second pass | Bug/security contract checks | Reproduced later-topic re-locking after an earlier slot is added, and the shell gate's lack of internal-stage protection; safeguards documented, runtime behaviour unchanged. |
| 2026-10-03 / second pass | Documentation consistency | Passed: stable 21-topic/84-slot counts and identifiers, consistent table columns, 11 local links and no trailing whitespace. |
| 2026-10-03 / second pass | Lint / tests / build | All passed: 1,016 test passes, zero failures, one database-dependent authorization skip; existing large-chunk warning remains. |
| 2026-10-03 / first topic | Lint / tests / build | Passed: 1,031 passes, zero failures, one DB-dependent skip; existing large-chunk warning. |
| 2026-10-03 / first topic | Source preservation, mapping, stable IDs, wrapper coverage | Passed: original excerpt unchanged; 21 IDs mapped; four first-topic wrappers, no later placeholders. |
| 2026-10-03 / first topic | Vite load / React render | Passed: actual availability glob and all four wrappers; sixteen SVG variants; optional final disclosure and default celebration. |
| 2026-10-03 / first topic | Interactive browser, phone and both themes | Pending: browser controls unavailable; initial renders are not a playthrough. |
| 2026-10-03 / growth topic | Lint / tests / build | Passed: 1,046 passes, zero failures, one DB-dependent skip; existing large-chunk warning. |
| 2026-10-03 / growth topic | Banks and pure investigation transitions | Passed: 15 tasks per short level, nine enquiries; all requirements per short run; guarded setup/record/conclusion, resets and duplicate/stale callbacks. |
| 2026-10-03 / growth topic | Vite load / React render | Passed: all four wrappers and real glob; 27 observation screens with independently checked drawn heights; fair-test board. |
| 2026-10-03 / growth topic | Prefix progression / activity eligibility | Passed: eight wrappers, predecessor progress preserved; four growth slots required; no category/subject/year award; optional card after strict completion. |
| 2026-10-03 / growth topic | Browser / visual / owner review | Pending: no browser tools; terminal renders do not establish interactive behaviour or theme layout. |
| 2026-10-03 / water topic | Lint / tests / build | Passed: 1,060 passes, zero failures, one database-dependent skip; existing large-chunk warning. |
| 2026-10-03 / water topic | Banks / guarded process enquiry | Passed: 15 tasks per short bank, nine scenarios; empty/unknown/duplicate records, stage skipping, reset and repeated/stale callbacks tested. |
| 2026-10-03 / water topic | Vite load / React render | Passed: four wrappers; 27 dye-observation renders agree with evidence; 27 growth renders preserve height/table agreement. |
| 2026-10-03 / water topic | Release path / strict practical eligibility | Passed: twelve wrappers in order; earlier progress preserved; all four water slots required; no premature category/subject/year award. |
| 2026-10-03 / water topic | Browser / visual / owner review | Pending: browser controls unavailable. |
| 2026-10-03 / pollination topic | Lint / tests / build | Passed: 1,074 passes, zero failures, one DB-dependent skip; existing large-chunk warning. |
| 2026-10-03 / pollination topic | Banks / shared process-enquiry guards | Passed: 15 tasks per short bank, nine enquiries; evidence records, sequencing, stage skipping, resets, duplicate/stale callbacks and bounded conclusions. |
| 2026-10-03 / pollination topic | Vite load / React render | Passed: four wrappers and actual availability; 27 observation screens with pollen/seed markers matching evidence and accessible descriptions. |
| 2026-10-03 / pollination topic | Release path / practical eligibility | Passed: sixteen wrappers; previous progress preserved; strict fourth-topic milestone; no premature category/subject/year award. |
| 2026-10-03 / pollination topic | Browser / visual / owner review | Pending: browser controls unavailable. |

## Second-pass bug/security review (2026-10-03)

This reviews the design and current integration contracts, not an implemented Science feature or the entire deployed application.
The approved 21 topics, 84 slots and product decisions are unchanged. The plan and brief now specify the safeguards below.
Documented mitigations still need implementation and verification; they are not runtime fixes.

| Finding | Risk / evidence | Required mitigation and verification |
|---|---|---|
| Earlier missing slots added after later play | High: reproduced with current `buildLockState`; a later completed topic becomes locked when an earlier topic gains an incomplete slot, though stored progress survives. | Release complete four-slot topics in order; no placeholders/out-of-order releases; test release expansion with saved progress. |
| Stale records and conclusions after setup edits | High: original instructions cleared the record but did not explicitly invalidate all downstream correctness. | Reset observations, answers, conclusion and validation together; check current revision at final success. |
| Repeated or stale investigation transitions | High: reproduced shell gate behaviour; it accepts repeated wrong submissions and protects successful shell questions, not internal stages. | Pure stage reducer, synchronous acceptance guard, revision-tagged callbacks and unmount/reset cleanup; test rapid taps, stale callbacks and no premature success. |
| Failed reads and child/run changes | High: existing hooks are deliberately fail closed; older skill passages suggest treating corruption as empty. | Preserve live guards/queues and sole host writers; test local/API load/save failures, retries and profile switches; do not infer verified API ownership from a skipped database test. |
| Unsafe content and asset ingestion | Medium: curated images and new catalogues otherwise had no explicit rendering/asset boundary. | React text, fixed local raster paths, reviewed JSX/SVG, no injected markup/runtime source fetches/route-derived paths or private data in public assets. |
| Missing evidence or invalid answer records | Medium: asset presence, empty `every(...)`, missing IDs and stale flags could yield unanswerable tasks or false completion. | Recoverable evidence failure; exact complete known-ID validation; reject empty, duplicate, unknown or non-finite answers. |
| Hint counter ambiguity | Medium: shell misses reset per question, not per investigation stage. | Round-wide threshold with a hint for the current stage; no shell reset or reroll loophole. |
| Recording table capability mismatch | Medium: current `DataTable` renders one blank and has no multi-cell edit callbacks. | Compose labelled inputs and controlled table values; preserve current API; unique labels where used as keys. |
| Invalid model boundaries and rounding | Medium: shadow distance zero/crossed positions or display/answer precision drift can break geometry or reject a correct answer. | Bounded inputs, ordered geometry, finite results and consistent displayed precision; independently derived example tests. |
| Practical activity eligibility and shared UI regression | Medium: availability-based completion differs from all-four-slot completion; global topic-only lookup risks wrong subject/year content. | Validated Year 3 Science lookup, strict topic predicate, optional final-screen disclosure, scoped styles and regression checks without the new prop. |

Focused non-mutating checks reproduced the availability and shell-gate behaviour above using existing pure modules.
No progress rules, security controls, feature code or source documents were changed.
Documentation consistency and lint/test/build reruns passed; results and the database-dependent skip are recorded in the verification log.

## Current blockers and review queue

- All 21 topics / 84 challenges are implemented. The owner authorised whole-category Light implementation and sequential Forces implementation; both are complete. Final bug/security code review and automated checks passed; complete Science browser and owner review remain next.
- Browser controls are unavailable in this session. Initial React renders passed, but full playthrough,
  visual/theme/phone inspection and keyboard interaction remain unverified.
- Database-dependent authorization test skipped because `MONGODB_URI` is unset; no auth changes made.
- Production build retains the existing large-chunk warning.
- Seed Dispersal uses original schematic SVG, with no external image assets. Curated specimen licensing remains relevant to future topics.
- No commit, push, merge or deployment performed.

## Session handoff record

**2026-10-03 — documentation milestone**
- Created the separate approved plan, resumable tracker and 21-topic brief.
- Added a planning-only link in project knowledge; left source documents and feature code intact.
- Documentation consistency, lint, tests and build passed; no Science browser verification applies yet.
- Pre-existing untracked reference files observed: `key-stage-2-history.md`,
  `year-3-science.md`, `year-4-science.md`, `year-5-science.md` under `docs/curriculum/`.
  These are supplied workspace material; do not overwrite or remove them.
- Next: owner reviews the docs; implementation starts with source/registry groundwork, then the first Plants topic.

**2026-10-03 — second-pass review**
- Read the three documents against live loading, progress, submission, table and completion contracts.
- Added the review findings, implementation guards, secure content/asset boundaries and targeted acceptance cases.
- Kept approved titles, category order, 84-slot scope and current 0-built status unchanged.
- Rechecked links, table structure, identifiers and challenge counts; lint, tests and build passed with the existing authorization skip and large-chunk warning.
- Remaining: implement and verify these mitigations during feature work; API ownership/browser checks are not supplied by this documentation pass.

**For each later topic/session, append:** date, topic/challenge progress, bank sizes, components changed,
checks and actual results, content/model issues, owner feedback, commit reference if one exists, and exact next task.
Update status rows and totals together; do not replace the accumulated decision or verification history.

**2026-10-03 — groundwork and first topic**
- Registered Year 3 Science, source-ordered 21-topic dataset / 84 slots, locked identifiers,
  source provenance/app crosswalk, reference index and Science map decoration.
- Preserved the supplied reference text exactly; source snapshot comparison passed.
- Built all four Parts of Flowering Plants wrappers, shared game and pure question banks.
  Sixteen distinct observations / sixteen structure variants; each short run has five tasks.
  C1/C2/C4 always cover all four parts; validators reject empty, unknown or duplicate records.
- Added PlantFigure / DiagramLabelBoard, tested geometry and atomic placement; controlled callback
  guards close synchronously after success. Optional vocabulary, tap speech and hints after two misses.
- Added read-only practical catalogue and collapsed card on strict completed-topic map/final celebration.
  Default celebrations remain unchanged; markup-like catalogue strings render as escaped text.
- Lint passed; tests: 1,031 passed / zero failures / one DB skip (1,032 total); build passed.
  Actual Vite glob resolved all four wrappers; initial screens and all sixteen SVG variants rendered.
- Vite's attempted dev WebSocket bind was denied by the sandbox; render checks still completed.
  No browser controls available; no full interaction/visual pass claimed and no tooling workaround installed.
- Review queue: first topic. Next build after review: What Plants Need to Grow, all four slots together.

**2026-10-03 — What Plants Need to Grow**
- Owner said “go” after first-topic delivery, authorising the next topic; first-topic browser checks still pending.
- Built all four growth wrappers and shared game: five questions in C1–C3; three substantial enquiries in C4.
- Banks: 15 requirement tasks, 15 supplied care-card comparisons, 15 fair setups and nine authored enquiries.
  Each short run covers air, light, water, soil nutrients and space. Care cards use illustrative unnamed flowering plant types.
- C4 samples one water, one nutrients and one space comparison. Results include A/B differences and a tie;
  conclusions describe only the shown comparison. Heights do not assert a universal care rule or real growth forecast.
- Added reusable FairTestBoard / ObservationSequence; recording uses labelled controlled fields and existing DataTable.
- Pure revision/version state machine guards duplicate/stale transitions. Only final evidence-based conclusion calls shell success;
  predictions are ungraded. Reset clears setup, observations, records, conclusions and validation without rerolling or resetting shell misses.
  No new timers or persisted experiment data. Optional speech includes displayed heights.
- Added optional plant-care observation card through existing strict completion lookup; no stored practical completion.
- Tests initially exposed repeated prompt labels and correlated test-seed coverage; unique tasks include their evidence/guide,
  and deterministic test seeds now explore the entire bank. Final checks all passed: lint, 1,046 test passes (one DB skip), build.
- Vite loaded all four new wrappers; initial screens and all 27 observation states rendered. SVG heights independently matched table data.
  Browser controls unavailable; both-theme/phone/keyboard playthrough checks remain pending.
- No commit, push, merge or deployment. Resume: owner reviews growth topic, then Water Transport in Plants.

**2026-10-03 — Water Transport in Plants**
- Owner said “go” after growth-topic delivery, authorising the third topic; interactive checks remain pending.
- Built four wrappers and shared game: C1–C3 five tasks each, C4 three enquiries.
- Banks: 15 supported route choices, 15 before/after evidence tasks, 15 ordered routes/sequences,
  nine authored process enquiries (cut flower, cut leafy stalk, inspected stem section).
- Checked teaching examples/practical design against [RHS water transportation](https://www.rhs.org.uk/education-learning/school-gardening/resources/curriculum-linked/water-transportation-in-plants).
  Distinguished root uptake from cut-end uptake; no advanced cellular mechanisms or claimed real experiment timings.
  Stem sections are explicitly inside views; dots plus words identify dye. No colour-only answer dependence.
- Extended ObservationSequence with optional JSX observation renderer and accessible group label, preserving growth defaults.
  Added local reviewed WaterTransportFigure; no remote assets or injected SVG/HTML.
- Pure revision/version process state: predict → observe → record → explain. Supplied setup, no invented changed-factor stage.
  Predictions ungraded; record correctness advances locally; only supported final explanation reports shell success.
  Reset clears all downstream evidence/answers/flags and keeps fixed scenario and shell misses; stale/duplicate callbacks rejected.
- Records mean visible dye, not absence of water. Stem-only evidence cannot prove an unobserved leaf changed.
- Added collapsed optional carnation activity: grown-up handles cutting/colouring, stable plastic container, no drinking,
  optional on-screen alternative, no completion writes or gate.
- Lint passed; tests: 1,060 passed, zero failures, one DB skip (1,061 total). Build passed with existing chunk warning.
  Vite resolved all four wrappers; initial screens and 27 water observations rendered with dots checked against evidence.
  Regression rendered all 27 growth observations with matching heights/table values.
- No commit, push, merge or deployment. Resume: review water topic; next Pollination and Seed Formation.

**2026-10-03 — Pollination and Seed Formation**
- Owner said “go” after water-topic delivery, authorising the fourth topic. Earlier interactive verification is still pending.
- Four wrappers / one shared game: five tasks for C1–C3, three supplied-source enquiries for C4.
- Banks: 15 supported role questions, 15 evidence comparisons, 15 ordered life-cycle/process sequences,
  nine enquiries sampled across insects, wind and life-cycle evidence.
- Examples checked against [RHS plant reproduction](https://www.rhs.org.uk/advice/understanding-plants/how-plants-reproduce)
  and [SAPS primary reproduction guidance](https://www.saps.org.uk/teaching-resources/resources/1375/primary-booklet-3-reproduction-and-life-cycles-part-2/).
  Pollination and seed formation distinguished; no assumption of instant/guaranteed seeds, all-bee pollination,
  or pollen grains becoming seeds. Basic terms glossed; no assessed advanced reproductive terminology.
- Added reviewed local FlowerLifeCycleFigure: pollen dots on receiving part, oval seeds in cut-away cases,
  seed/seedling stages and labelled insect/wind transfer. Accessible descriptions do not claim unshown pollen or seeds.
- Added reusable processEnquiry reducer / useProcessEnquiry hook with topic record validation; previous reducers untouched.
  Predictions ungraded; records advance locally; final supported explanation alone completes a round.
  Reset clears local evidence/answers/flags, retains fixed scenario and shell misses, and rejects old callbacks.
- Added optional flower-visitor observation activity: grown-up chooses location, distance/no handling, no progress gate or writes.
  Visit alone does not prove pollination; records and conclusions require actual supplied evidence.
- Lint/tests/build passed: 1,074 passes, zero failures, one DB skip (1,075 total), existing chunk warning.
  Vite loaded all four wrappers; 27 life-cycle screens rendered with independently checked pollen/seed markers and descriptions.
  The render-check harness was corrected to compare React-escaped apostrophes as text; no application bug was involved.
- Browser/theme/phone/keyboard full playthrough remains pending. No commit/push/merge/deployment.
- Resume: review pollination topic, then Seed Dispersal to finish Plants (20/84 planned challenges).


**2026-10-03 — Seed Dispersal / Plants category**

- Owner “go” authorised the next complete topic. Added all four wrappers, a shared
  SeedDispersalGame and pure topic builder. Plants now has 20/20 challenges; Science 20/84.
- C1: five supported movement choices. C2: five three-specimen sorts using supplied
  movement evidence. C3: five feature/explanation builds with one ending. C4: three
  comparisons, one each from wind/animal/water groups, contrasted with bursting/gravity examples.
- Authored banks: 15 tasks per short level, nine enquiries. Five methods covered;
  hairy/winged fruits, hooked cases, fleshy fruits, floating cases, bursting pods and falling examples.
  Predictions are ungraded; illustrations are teaching examples, not named species or live experiments.
  A feature suggests a possible method; classify the supplied movement, not every possible method.
  Dispersal can reduce competition but does not guarantee growth.
- Added local SeedDispersalFigure SVG with equivalent feature text, shared theme tokens
  and no external assets. Science basis checked against [Kew’s seed-dispersal overview](https://www.kew.org/read-and-watch/plant-seed-dispersal-animal-poo)
  and [UKRI’s seeds and plant growth activity pack](https://www.ukri.org/wp-content/uploads/2022/01/BBSRC-140214-Seeds-and-plant-growth-discovery-activity-pack.pdf).
  These support mechanisms; the authored observations do not claim to be measured source data.
- Reused guarded process enquiry: full observations, both valid records, then supported
  conclusion before shell success. Revision/version reset and duplicate/stale transition
  tests passed. React text remains escaped; no runtime HTML/SVG injection, remote images or storage changes.
- Optional “Look for seed and fruit features” activity appears only after all four slots
  are built and complete. No tasting/unknown-plant handling or attaching hooks to animals.
- Progress regression: all twenty wrapper paths exist; later wrappers remain absent.
  Fifth-topic final slot earns challenge/topic/category, never subject/year. Predecessor
  progress and replay preserved; adding Nutrition unlocks its first slot without relocking Plants.
- Verification: lint passed; 1,080 tests passed, zero failures, one database-dependent skip
  (1,081 total); production build passed with existing large-chunk warning. Logs:
  `/tmp/y3-seed-tests.log`, `/tmp/y3-seed-build.log`. Vite loaded/rendered four wrappers;
  42 specimen/observation SVG renders checked hairs, hooks, wings, seed counts and water line;
  markup-like text escaped. `git diff --check` passed.
- Browser controls unavailable: full playthrough, phone/both-theme layouts, keyboard,
  narration and rapid-interaction checks pending. No commit, push, merge or deployment.
- Resume: review Seed Dispersal / Plants, then Nutrition for Animals and Humans.


**2026-10-03 — Nutrition for Animals and Humans**

- Owner “go” authorised the first Animals topic. Added a pure builder, shared game and
  all four computed-path wrappers. Science now has six topics / 24 challenges built.
- C1: five source-supported facts from 18 authored items; each run includes food source,
  nutrition types and amounts. C2: five three-card diet sorts from 15 distinct sets,
  classifying the plant/animal origins actually listed, rather than claiming a complete diet.
- C3: five model menus from 15 cases. Six food tiles in three named groups; explicit
  group counts represent classroom amounts, not portions or a complete day's diet.
  All supported combinations and orders are accepted. Exhaustively checked all 64
  subsets for each case; each has at least two solutions. Correct total alone is insufficient.
- C4: three source-card research rounds, one each for food sources/types/amounts, drawn
  from nine complete scenarios. Read both attributed cards, classify two claims,
  then build a supported report. Both-supported and neither-supported cases prevent
  learning a fixed sorting pattern. Predictions are ungraded; reset clears downstream evidence.
- ScienceInformationCard renders adapted text and visible source names using shared
  Science styling. ObservationSequence gained an optional next-button label, default
  unchanged for plant observations; research uses “Read next card”. No new interaction
  type was needed: ChoiceGrid, SortBins, TileBuilder and the guarded process enquiry fit.
- Source basis: [NHS Eatwell Guide](https://www.nhs.uk/live-well/eat-well/food-guidelines-and-food-labels/the-eatwell-guide/),
  [NHS healthy childhood](https://www.cddft.nhs.uk/services/nutrition-dietetics/children/healthy-eating/healthy-childhood),
  [NHS protein](https://www.myhealthlondon.nhs.uk/be-healthier/nutrition-hub/protein/),
  [NHS fat](https://www.nhs.uk/live-well/eat-well/food-types/different-fats-nutrition/),
  [NHS fibre](https://www.nhs.uk/live-well/eat-well/digestive-health/how-to-get-more-fibre-into-your-diet/),
  [Giraffe Conservation Foundation](https://giraffeconservation.org/facts-about-giraffe/what-do-giraffe-eat/),
  [ZSL lions](https://www.zsl.org/what-we-do/species/lions) and
  [Woodland Trust foxes](https://www.woodlandtrust.org.uk/blog/2019/08/what-foxes-eat/).
  Adapted cards teach food sources, carbohydrate/fat energy, protein growth/repair,
  vitamins/minerals, fibre and hydration, variety across a day/week and differing needs.
  No calorie, weight, supplement or personalised diet tasks; no runtime external requests/assets.
- Optional grown-up “Research an animal's food sources” activity is read-only and
  available only after all four slots are built/complete. No feeding or diet changes required.
- Progress: all 24 wrappers present, later placeholders absent. Nutrition is gated behind
  Plants; final slot awards topic only, not Animals/subject/year. Plants progress/replay and
  expansion into Skeletons are preserved. Storage/auth/reward/unlock implementation unchanged.
- Verification: lint passed; 1,087 tests passed, zero failures, one database-dependent skip
  (1,088 total); production build passed, existing large-chunk warning. Logs:
  `/tmp/y3-nutrition-tests.log`, `/tmp/y3-nutrition-build.log`. Vite loaded/rendered all four
  wrappers; 36 source-card renders preserved text and attribution. Meal table counts matched
  the requested total/six choices; markup-like title/body/source text escaped. Default growth
  table/stem rendering and custom research navigation passed. The first SSR harness required
  a whitespace-tolerant table-cell selector; this was a harness correction, not an app defect.
- Browser controls unavailable: full interaction, both-theme/phone/keyboard/narration
  checks pending. `git diff --check`, document links and original statutory preservation passed.
  No commit, push, merge or deployment. Resume: review Nutrition, then Skeletons.


**2026-10-03 — Skeletons for Support and Protection**

- Owner “go” authorised all four slots. Added pure builder/shared game and four
  computed-path wrappers. Science now has seven topics / 28 challenges built.
- Each slot has five short tasks and a 15-case authored bank. C1 chooses jobs from
  supported diagrams/evidence; C2 sorts three animal cards by a stated criterion;
  C3 labels all four human structures plus matches one job; C4 builds one supported
  explanation. C4 is deliberately five short tasks as approved, not a staged investigation.
- Human skull/rib cage/spine/leg bones; dog internal skeleton; crab/beetle exoskeleton
  examples. Grouping cards include humans, dogs, birds, bony fish, crabs, beetles,
  shelled snails and earthworms. Backbone and protective shell/exoskeleton criteria
  stay distinct. Bony-fish scales are not called a shell/exoskeleton; no-backbone
  animals are not described as lacking all support. Muscle mechanics deferred.
- Added reviewed local SkeletonFigure SVG and pure skeletonDiagram callout anchors.
  Human diagrams vary arm layout and letters. Dog/crab/beetle shapes are simplified,
  with that limitation visible; no remote images or injected SVG. Shared Science styles
  retain theme tokens. DiagramLabelBoard gained optional accessible label, default
  “Plant labels” preserved; Skeletons uses “Skeleton labels”.
- Source basis: [Cleveland Clinic skeletal system](https://my.clevelandclinic.org/health/body/21048-skeletal-system),
  [Amateur Entomologists’ Society exoskeleton](https://www.amentsoc.org/insects/glossary/terms/exoskeleton/),
  [Natural History Museum molluscs](https://www.nhm.ac.uk/discover/molluscs.html) and
  [Imperial College OPAL invertebrate guide](https://www.imperial.ac.uk/media/imperial-college/research-centres-and-groups/opal/Invertebrates-guide--UPDATED-FINAL.pdf).
  Cards are authored teaching explanations, not measured experiments. No bone-count
  memorisation, injury demonstrations or body testing required.
- Optional grown-up “Compare skeleton pictures” activity is read-only and appears
  only after four built/completed slots. Use diagrams rather than pressing/bending
  bodies or handling animals/bones.
- Validators require all known labels and exact unique targets; sorting uses canonical
  animal criteria. Unknown/missing/duplicate/extra answers rejected. Synchronous
  accepted-answer guards and shell completion retained; combo payload forwarded.
- Progress regression verifies all 28 wrappers, later placeholders absent; Skeletons
  stays behind Nutrition, grants strict topic completion only, preserves predecessor
  progress/replay, and releases Muscles without relocking earlier challenges.
- Verification: lint passed; 1,094 tests passed, zero failures, one database-dependent
  skip (1,095 total); production build passed with existing large-chunk warning.
  Logs: `/tmp/y3-skeleton-tests.log`, `/tmp/y3-skeleton-build.log`. Vite rendered four
  wrappers and 18 skeleton diagrams; human callouts, rib/spine/leg features, dog bones,
  external-covering semantics, escaped caption and default Plant-label accessibility passed.
  Pure geometry checks place callouts on independently evaluated SVG features.
- Browser controls unavailable: full playthrough, phone/both-theme layouts, keyboard,
  narration and rapid-interaction checks pending. Document links and original statutory
  text preservation verified; `git diff --check` passed. No storage/auth/reward/unlock
  code changes, commit, push, merge or deployment. Resume: review Skeletons, then Muscles.


**2026-10-03 — Muscles and Movement**

- Owner explicitly requested this topic; all four wrappers released together in source order.
  Science is now 8/21 topics and 32/84 challenges (Plants 20/20, Animals 12/12).
- Fifteen authored cases per short bank; nine enquiries. C1 uses diagram-supported muscle
  roles; C2 compares three pictures; C3 builds three linked clauses; C4 samples one
  bending, one straightening and one bending/return investigation per run.
- New local SVG MovementFigure with unique accessible title/description IDs, labelled
  front/back muscles, elbow, equivalent text and tendons. Pure movementGeometry keeps
  the bones' lengths fixed while rotating the lower arm and varying opposing schematic
  muscle lengths. No anatomical-name memorisation or forced physical movement.
- Science basis checked against [Nemours KidsHealth](https://kidshealth.org/en/kids/muscles.html)
  on 2026-10-03. Original adapted rule text visibly attributed; no copied images or runtime
  remote content. Scope is this simplified pair, not a claim about every muscle or all
  real-world movements. Optional grown-up picture research never gates or stores progress.
- Existing process reducer/hook reused without changes: all observations required, two
  claims classified, then three ordered explanation clauses. Predictions never graded;
  reset/stale/duplicate/finished transitions guarded. Shell owns misses/completion/combos.
- Tests independently derive comparison answers from poses; verify fixed bone length,
  opposing muscle length changes, replay-depth banks, deterministic sampling, answer
  membership, malformed explanations/records, all predictions, reset and stale callbacks.
  Prefix check verifies 32 actual wrappers and no later placeholders. Progress regression
  verifies Animals category award only on final C4, earlier data/replay preserved,
  strict optional activity eligibility, incomplete Science and expansion into Rocks.
- `npm run lint`, `npm test` (1,101 passed, zero failed, one MONGODB_URI-dependent skip),
  `npm run build` and `git diff --check` passed. Existing Vite large-chunk warning remains.
  Logs: `/tmp/y3-muscles-tests.log`, `/tmp/y3-muscles-build.log`.
- Vite SSR loaded all four real wrappers; initial screens had five/three rounds, no
  premature onComplete. Three pose SVG geometry renders and 72 comparison/observation
  renders passed. Optional speech correctly absent in SSR without browser voices.
- Security review: authored JSX text only, no raw HTML, network requests, new storage,
  asset URLs or timers; callbacks guarded; evidence rejects unknown/extra keys and
  explanations reject missing, duplicated, reordered or unknown tiles.
- Interactive browser, mobile/both-theme visual, narration and reload verification
  remain pending because no browser controls are available. No commit/push/deploy.
  Resume: owner review Muscles, then Comparing and Grouping Rocks.


**2026-10-03 — Comparing and Grouping Rocks**

- Owner explicitly requested the first Rocks topic. All four wrappers released together:
  9/21 topics, 36/84 challenges; Plants 20/20, Animals 12/12, Rocks 4/12.
- Six unnamed authored specimens; 18 visible-feature tasks, 15 grouping sets, 15
  classification tables and nine investigations. Five tasks in C1–3, three in C4;
  each investigation run covers scratch marks, water taken in and rubbing results.
- RockFigure uses local magnified SVG diagrams with equivalent feature descriptions,
  eight grain marks, four crystal shapes, bands and a labelled fossil imprint where
  supplied. Shapes are schematics, not photographs or rock identifications. No colour
  dependence; tokens serve both themes. React SVG-title warning found in render review
  and fixed with a single string title; subsequent wrapper/diagram renders were clean.
- New reusable controlled ClassificationTable: three rows by two criteria, native
  48px Yes/No buttons, pressed states, row/column/group labels and focusable horizontal
  overflow. One sample can meet several criteria; every cell is independently checked.
- C4 requires a correct fair plan before prediction/observations, then the existing
  guarded process reducer/hook requires every stage, both result records and a supported
  explanation. Wrong plan submits a miss without advancing; correct plan does not
  advance the shell. Restart also clears the plan. Same-group results are included.
- Tests describe these samples only; no universal property inferred from appearance.
  Scratch resistance is distinct from breaking; water taken in is distinct from
  through-flow; rubbing results are not scratch results. C4 uses distinct X/Y samples,
  separate from the A–F specimen cards, avoiding contradictory test evidence.
- Scientific appearance basis checked against [British Geological Survey](https://www.bgs.ac.uk/discovering-geology/rocks-and-minerals/)
  on 2026-10-03; learner attribution separates adapted concepts from authored examples.
  Optional grown-up observation is picture/surface observation only, never gates,
  saves or requires scratching, rubbing, breaking or handling unknown rocks.
- Tests verify bank depth, unique answers, deterministic sampling/no bank mutation,
  explicit-criterion sorting, all six table cells, malformed/missing/extra/duplicate
  records, supplied result/conclusion consistency, ungraded predictions, ordered
  observations, reset and stale/finished callbacks. Prefix regression verifies all
  36 wrappers and no later placeholders. Earlier progress/replay preserved; strict
  topic award/activity, no unfinished category/year award, expansion into Fossils.
- Lint, tests (1,109 passed; zero failed; one MONGODB_URI-dependent skip), production
  build and diff whitespace checks passed. Existing Vite large-chunk warning remains.
  Logs: `/tmp/y3-rocks-tests.log`, `/tmp/y3-rocks-build.log`.
- Vite SSR loaded all four actual wrappers without premature onComplete; C4 initially
  exposes only the comparison-plan gate. Six specimen renders matched SVG feature
  presence/counts; fifteen classification tables rendered twelve buttons/six selected
  cells with row/column labels; nine result tables matched outcomes. Text escaping
  verified using markup-shaped labels. No raw HTML, runtime fetches, new storage,
  asset URLs or timers introduced. Original statutory source preserved.
- Browser controls unavailable: interactive plan/retry/reset, mobile/both-theme visual,
  speech/cancellation and reload checks remain pending. No commit/push/deploy.
  Resume: review Comparing and Grouping Rocks, then How Fossils Form.


**2026-10-03 — How Fossils Form**

- Owner authorised proceeding after Comparing and Grouping Rocks. All four wrappers
  released together: 10/21 topics, 40/84 challenges; Rocks now 8/12.
- Five authored accounts (two shell settings, two fish-bone settings, one leaf setting),
  15 fact tasks, 15 claim-sort sets, 15 illustrated ordering tasks and nine source-based
  enquiries. Five tasks in C1–3; C4 samples shell/bone/leaf once each per run.
- New local FossilFormationFigure shows living things, burial in loose sediment,
  evidence preserved in rock and later exposure. Cutaway labels explain why buried
  material is visible. Shell moulds are shapes left when the shell dissolves; minerals
  preserve bone evidence; a leaf imprint records past plant life. No numerical ages,
  advanced rock cycle or claim that all remains become fossils. Exposure is discovery,
  distinct from earlier formation. Source concepts adapted into original learner text.
- Source basis checked 2026-10-03 against [Natural History Museum](https://www.nhm.ac.uk/discover/how-are-fossils-formed.html)
  and [British Geological Survey](https://www.bgs.ac.uk/discovering-geology/fossils-and-geological-time/fossils/),
  including leaf compression/imprints. Visible source attribution, no copied imagery
  or runtime remote content. Optional grown-up picture research never gates progress.
- C2 requires all three evidence claims. C3 shuffled picture letters map to readable
  TileBuilder cards (no JSX objects inside accessible labels); validator accepts only
  the four unique events in chronological order. C4 reuses guarded process enquiry:
  ungraded prediction, four source cards, two claim records and supported explanation.
  Reset/stale/duplicate/finished transitions guarded; shell owns completion/misses/combos.
- Tests verify bank depth, unique answers, deterministic sampling/no mutation, card/letter
  consistency, preservation mechanisms and qualifiers, malformed evidence records,
  every ordering permutation, all prediction choices, required source history, reset
  and stale callbacks. Prefix checks verify 40 actual wrappers and no later placeholders.
  Progress checks preserve Plants/Animals/first Rocks topic, replay and strict topic
  award/activity eligibility, no unfinished category/year award, and expansion to Soil.
- Lint, tests (1,116 passed; zero failed; one MONGODB_URI-dependent skip), production
  build and diff whitespace checks passed. Existing Vite large-chunk warning remains.
  Logs: `/tmp/y3-fossils-tests.log`, `/tmp/y3-fossils-build.log`.
- Vite SSR loaded four actual wrappers without premature onComplete. Twenty diagram
  renders matched burial cover, loose sediment, mineral marks and exposed surface;
  36 source-card stage renders retained appropriate evidence and no growth table.
  Ordered tiles retained readable labels; markup-shaped captions escaped. SVG text
  explicitly removes inherited path stroke so labels remain readable; sediment layer
  boundaries avoid the fish backbone line.
- Security review: authored JSX text only; no raw HTML, fetches, asset URLs, new storage
  or timers. Evidence rejects extra/missing/duplicate/unknown cards; ordering rejects
  unknown/duplicated/reordered events. Original statutory source preserved.
- Browser unavailable: interactive retry/reset/playthrough, mobile/both-theme visual,
  speech/cancellation and reload checks pending. No commit/push/deploy.
  Resume: review How Fossils Form, then What Soil Is Made From.

### 2026-10-03 — What Soil Is Made From

- Owner authorised the next topic. All four wrappers released together: 11/21 topics,
  44/84 challenges, Rocks 12/12. Next: Light and Darkness after review.
- Pure banks: 20 identification tasks, 15 sorting tasks, 15 labelling models and nine
  supplied-observation enquiries. Runs: five/five/five/three, with every C1 run covering
  mineral matter, organic matter, air and water. Five authored specimen-note sets;
  no claimed measured amounts, universal mixtures, soil-type identification or colour inference.
- New local `SoilCompositionFigure` supplies native SVG title/description and equivalent
  lettered notes, using existing theme styles. Reused controlled DiagramLabelBoard,
  atomic placement, SortBins and guarded process enquiry. C2 sorts two solid components;
  C3 labels all four selected components. C4 inspects three stages, sorts two claims,
  and chooses a supported built explanation. Predictions never call shell submit.
- Science concepts checked against [British Society of Soil Science](https://soils.org.uk/what-is-soil/)
  on 2026-10-03. Concepts adapted; sample notes are authored, not actual experiment results.
  Air/water occupy spaces; organic matter includes once-living remains, and soils contain
  living organisms too. Selected diagrams are not a complete soil inventory or amount chart.
- Optional `observe-soil-pictures` is collapsed/read-only and requires strict four-slot
  completion; no handling, collecting, tasting or digging required.
- Six topic tests cover deterministic replay, component coverage, independent material
  origins, all 24 labelling permutations, malformed records, every prediction path,
  required stages, wrong conclusions and stale reset callbacks. Release/progress regression
  covers all 44 wrappers, strict Rocks award only on Soil C4, preserved earlier progress,
  replay, optional eligibility, unfinished Science and future Light expansion.
- SSR loaded all four real wrappers, 15 diagrams and nine observation stages; no premature
  completion, NaN or unescaped markup. Shared defaults and storage/auth/unlock/reward
  implementations unchanged. Original statutory source snapshot preserved.
- Lint, full tests (1,124 total: 1,123 passed, zero failed, one database-dependent
  skip without MONGODB_URI) and production build passed. Existing >500 kB main-chunk
  warning remains. `git diff --check` passed. Interactive browser, phone and both-theme
  visual verification pending because no browser controls are available in this session.

### 2026-10-03 — Light and Darkness

- Owner authorised the next topic. All four wrappers released together: 12/21 topics,
  48/84 challenges; first Light topic 4/20. Next: Reflected Light after review.
- Pure banks: 15 supported scenes, 15 three-condition comparisons, 15 explanation
  cases and nine investigations; runs five/five/five/three. C1 guarantees both lit
  and completely dark observations. Five ordinary non-luminous objects; three labelled
  sources; controlled routes for adding/removing/returning light.
- New local `LightSceneFigure` supplies SVG title/description and full text equivalents.
  Dark observations contain no visible object shape or emission marks; the caption
  preserves object presence. Bright/dark fills use fixed App.css light-panel/dark-bg
  tokens independently of app theme, with readable lit-object strokes. No raster,
  network, timers or storage introduced. Models do not claim measured brightness.
- C2 uses SortBins for three observation records. C3 uses TileBuilder to explain
  condition, light reaching eyes and seeing in the explicit First/Next/So order.
  C4 uses the guarded process hook: ungraded prediction, all three observations,
  three records, then the same three-part explanation of the final observation.
  Eye-emitted light and darkness-as-substance are explicit misconception distractors.
- Light concepts verified against [BBC Teach light teacher resource](https://downloads.bbc.co.uk/learning/bbcteach/Light_teacher_resource.pdf)
  on 2026-10-03; supplied observations and artwork are original. No formal reflection
  angles, shadow work, lenses or refraction assessed in this topic.
- Optional `compare-light-pictures` requires strict four-slot completion and never
  gates or stores progress; no real room-darkening/bright-source viewing required.
- Six topic tests cover replay/depth/options, controlled conditions, independent
  visibility explanations, malformed/duplicate records, all 60 three-tile selections
  from five tiles, every prediction path, stage skipping, wrong conclusions and reset
  revision guards. Release/progress regression covers 48 actual wrappers, preserved
  earlier categories, strict topic/optional eligibility, replay, no unfinished category
  or year award, and future Reflected Light expansion.
- SSR passed for four real wrappers, 30 lit/dark diagrams, all 27 authored enquiry
  stage renders and escaped markup-like text. No premature completion or growth-table
  fallback. Original statutory snapshot preserved; shared persistence/auth/unlock/reward
  implementations unchanged. Browser/phone/both-theme interaction checks remain pending
  because browser controls are unavailable in this session.
- Final checks: `npm run lint` passed; `npm test` 1,131 total, 1,130 passed,
  zero failed, one database-dependent skip without MONGODB_URI; production build
  passed with the existing >500 kB main-chunk warning. `git diff --check` passed.


### 2026-10-03 — Complete Light category

- Owner requested finishing all Light topics, including the dirtied Reflected Light
  implementation. Four complete topics released after Light and Darkness: 16/21
  Science topics, 64/84 challenges; Light 20/20. Forces and magnets remains unbuilt.
- **Reflected Light:** 18 scene questions, 15 distinct surface-pair comparisons,
  18 lettered diagrams and nine enquiries (five/five/five/three tasks). Six surfaces;
  every sample reflects light, including paper/fabric and samples without a clear
  image. Controlled enquiries cover both, neither and differing image results.
  Source → surface → eye paths show one selected ray pair, not a reflected image
  or all scattered light. No angles, refraction or lenses assessed. Concepts checked
  against [Optica](https://www.optics4kids.org/what-is-optics/reflection/the-reflection-of-light)
  and [BBC Teach](https://downloads.bbc.co.uk/learning/bbcteach/Light_teacher_resource.pdf)
  on 2026-10-03. Original authored observations and SVG, no remote assets.
- **Protecting Our Eyes from Sunlight:** 15 authored everyday situations in each of
  four banks (five tasks/run), with guaranteed direct-viewing warning, UV-label
  advice and lens-darkness misconception coverage. Supported choices, three-action
  sorts, built messages and applied advice plus explanation. Source basis checked
  2026-10-03 against [NEI children's vision advice](https://www.nei.nih.gov/eye-health-information/healthy-vision/nei-for-kids/healthy-vision-tips)
  and [NEI sunglasses/direct-viewing guidance](https://www.nei.nih.gov/research-and-training/research-news/how-watch-eclipse-safely).
  No sun-viewing experiment or protection-testing activity; explicit warning on
  every task, including dark-glasses cases. This topic has no practical card.
- **How Shadows Form:** 15 supported facts, 15 controlled comparisons, 15 lettered
  arrangements and nine enquiries (five/five/five/three). Distinguishes a cast
  shadow from a wholly unlit screen. Compares blocker removal/replacement separately
  from lamp off/on, with fixed positions and no other light. Opaque blocks light;
  shadows lie behind the blocker on the screen. Shapes shown edge-on, not a test
  of silhouette shape. Uses existing guarded process enquiry and diagram placement.
- **Changing Shadow Size:** 15 comparisons, 15 pattern tasks, 15 table tasks and
  nine enquiries (five/five/five/three). Five configurations with distinct near/far
  observations, including moving source and moving object with a fixed screen.
  C3 inspects controlled positions and records heights using the existing keypad
  and read-only DataTable. C4 adds assessed five-factor fair setup before inspection,
  three whole-cm records, then changed condition/evidence/bounded conclusion tiles.
- New pure geometry is a centred opaque-object/point-source model on a perpendicular
  fixed screen, labelled as simplified. Drawing uses exact geometry; displayed and
  assessed measurements use the same whole-cm rounding. Independent examples cover
  4 cm objects at 20/30/40 cm producing 12/8/6 cm shadows and moving-source cases.
  Invalid/non-finite/reversed/oversized geometry returns unavailable, never completion.
  ShadowExplorer has native 48px position buttons, controlled availability and no
  motion requirement. Reset clears setup, seen stages, records and conclusion;
  accepted setup is frozen. Stale/duplicate/finished transitions are rejected.
- Added strict optional picture/model activities for reflection and both shadow
  topics; existing Light and Darkness activity retained. No changes to persistence,
  milestones, rewards, stored identifiers or unlock rules. No new dependencies.
- Tests cover bank depth, deterministic/constant RNG, options, labels/records,
  malformed/unknown/duplicate answers, all prediction choices, stage order,
  reset/revision guards and incorrect conclusions. Actual-file progression checks
  walk all 20 Light slots, preserve Plants/Animals/Rocks, check numeric IDs/replay,
  strict Light award only at its final slot, no Science/year award and future Forces
  expansion without relocking completed work.
- Final lint, full tests (1,150 total: 1,149 passed, zero failed, one database-dependent
  skip without MONGODB_URI) and production build passed. Existing >500 kB main-chunk
  warning remains. Logs: `/tmp/y3-light-lint.log`, `/tmp/y3-light-tests.log`,
  `/tmp/y3-light-build.log`, `/tmp/y3-light-render.log`.
- Vite SSR loaded all 20 real Light wrappers and confirmed actual glob availability
  with zero premature completions. 347 unique reflection/shadow observation renders
  passed light-path, shadow-presence/measurement, accessible-description and escaped
  caption checks. Disabled future positions and invalid-model fallback checked.
  Render review caught and fixed an SVG title child-array warning.
- Interactive browser, phone/both-theme visual checks, real saved-progress reload
  and owner review remain pending because browser tools are unavailable. Initial
  render evidence: `/tmp/y3-light-render.html`. No commit/push/deploy.


### 2026-10-03 — Movement on Different Surfaces

- Owner authorised the entire category, one topic at a time. All four wrappers
  released together; Science 68/84, Forces and magnets 4/20.
- 15 supplied surface comparisons per short bank and nine enquiries. C1 chooses the further run, C2 sorts measured travel evidence, C3 requires a complete fair plan before keypad/table records, and C4 uses prediction/fair setup/staged stops/records/bounded explanation. Same toy, ramp release, level track and cm measuring method within a comparison. APS friction concepts verified; supplied distances are original examples, not universal predictions.
- Shared kit, local reviewed SVG, optional speech/glosses and hints after two
  misses. Shell owns final completion/misses/combos; no new persistence, account
  endpoints, rewards authority, external assets or dependencies.
- Lint, full tests (1155 passed, zero failures, one MONGODB_URI-dependent skip)
  and production build passed. Existing Vite >500 kB chunk warning remains.
  Logs: `/tmp/y3-forces-1-lint.log`, `/tmp/y3-forces-1-tests.log`,
  `/tmp/y3-forces-1-build.log`, `/tmp/y3-forces-1-render.log`.
- Vite SSR verified all 4 released Forces wrappers and
  159 distinct observation renders, with zero premature completions,
  actual availability, rendered measurements/outcomes and escaped authored text.
  Initial-render evidence: `/tmp/y3-forces-1-render.html`.
- Tests cover deterministic/constant RNG, complete records/plans/labels, missing/
  extra/unknown/duplicated answers, ungraded predictions, inspection gates, incorrect
  conclusions, reset/revision/duplicate-transition guards, release order and replay.
  Earlier category progress is preserved. Browser/theme/phone/real-save checks and
  owner review pending because browser controls are unavailable. No commit/push/deploy.


### 2026-10-03 — Contact and Magnetic Forces

- Owner authorised the entire category, one topic at a time. All four wrappers
  released together; Science 72/84, Forces and magnets 8/20.
- 15 supported contact/magnetic cases, 15 three-observation sorts, 15 lettered diagrams and nine controlled enquiries. Contact pushes/pulls require touching; supplied magnetic interactions retain a visible gap while a force acts. Before-force observations are distinct from contact/non-contact force evidence. IOP concepts verified; no claim that every non-contact force is magnetic.
- Shared kit, local reviewed SVG, optional speech/glosses and hints after two
  misses. Shell owns final completion/misses/combos; no new persistence, account
  endpoints, rewards authority, external assets or dependencies.
- Lint, full tests (1160 passed, zero failures, one MONGODB_URI-dependent skip)
  and production build passed. Existing Vite >500 kB chunk warning remains.
  Logs: `/tmp/y3-forces-2-lint.log`, `/tmp/y3-forces-2-tests.log`,
  `/tmp/y3-forces-2-build.log`, `/tmp/y3-forces-2-render.log`.
- Vite SSR verified all 8 released Forces wrappers and
  318 distinct observation renders, with zero premature completions,
  actual availability, rendered measurements/outcomes and escaped authored text.
  Initial-render evidence: `/tmp/y3-forces-2-render.html`.
- Tests cover deterministic/constant RNG, complete records/plans/labels, missing/
  extra/unknown/duplicated answers, ungraded predictions, inspection gates, incorrect
  conclusions, reset/revision/duplicate-transition guards, release order and replay.
  Earlier category progress is preserved. Browser/theme/phone/real-save checks and
  owner review pending because browser controls are unavailable. No commit/push/deploy.


### 2026-10-03 — Magnetic Materials

- Owner authorised the entire category, one topic at a time. All four wrappers
  released together; Science 76/84, Forces and magnets 12/20.
- 15 supported material tests, 15 three-sample classifications, 15 fair-test/result-table tasks and nine enquiries. Named iron/ordinary steel samples are attracted; aluminium/copper and selected non-metals show no noticeable attraction in these supplied classroom tests. Records rely on supplied evidence, not appearance; not all metals are magnetic. Magnet, gap, sample size and testing method are fixed within comparisons.
- Shared kit, local reviewed SVG, optional speech/glosses and hints after two
  misses. Shell owns final completion/misses/combos; no new persistence, account
  endpoints, rewards authority, external assets or dependencies.
- Lint, full tests (1164 passed, zero failures, one MONGODB_URI-dependent skip)
  and production build passed. Existing Vite >500 kB chunk warning remains.
  Logs: `/tmp/y3-forces-3-lint.log`, `/tmp/y3-forces-3-tests.log`,
  `/tmp/y3-forces-3-build.log`, `/tmp/y3-forces-3-render.log`.
- Vite SSR verified all 12 released Forces wrappers and
  447 distinct observation renders, with zero premature completions,
  actual availability, rendered measurements/outcomes and escaped authored text.
  Initial-render evidence: `/tmp/y3-forces-3-render.html`.
- Tests cover deterministic/constant RNG, complete records/plans/labels, missing/
  extra/unknown/duplicated answers, ungraded predictions, inspection gates, incorrect
  conclusions, reset/revision/duplicate-transition guards, release order and replay.
  Earlier category progress is preserved. Browser/theme/phone/real-save checks and
  owner review pending because browser controls are unavailable. No commit/push/deploy.


### 2026-10-03 — Magnets and Their Poles

- Owner authorised the entire category, one topic at a time. All four wrappers
  released together; Science 80/84, Forces and magnets 16/20.
- 16 supported pole facts, 15 supplied facing-pole comparisons, 15 label-and-record tasks and nine turning/repeating observation enquiries. Bar magnets have both N and S poles; all four facing pairs have supplied outcomes. Same poles repel; different poles attract. N/S identity is labelled, never inferred from colour. IOP concepts verified; numerical strength/field calculations excluded.
- Shared kit, local reviewed SVG, optional speech/glosses and hints after two
  misses. Shell owns final completion/misses/combos; no new persistence, account
  endpoints, rewards authority, external assets or dependencies.
- Lint, full tests (1169 passed, zero failures, one MONGODB_URI-dependent skip)
  and production build passed. Existing Vite >500 kB chunk warning remains.
  Logs: `/tmp/y3-forces-4-lint.log`, `/tmp/y3-forces-4-tests.log`,
  `/tmp/y3-forces-4-build.log`, `/tmp/y3-forces-4-render.log`.
- Vite SSR verified all 16 released Forces wrappers and
  577 distinct observation renders, with zero premature completions,
  actual availability, rendered measurements/outcomes and escaped authored text.
  Initial-render evidence: `/tmp/y3-forces-4-render.html`.
- Tests cover deterministic/constant RNG, complete records/plans/labels, missing/
  extra/unknown/duplicated answers, ungraded predictions, inspection gates, incorrect
  conclusions, reset/revision/duplicate-transition guards, release order and replay.
  Earlier category progress is preserved. Browser/theme/phone/real-save checks and
  owner review pending because browser controls are unavailable. No commit/push/deploy.


### 2026-10-03 — Predicting Attraction and Repulsion

- Owner authorised the entire category, one topic at a time. All four wrappers
  released together; Science 84/84, Forces and magnets 20/20.
- 16 rule-supported predictions, 15 multi-pair records, 15 target-arrangement construction tasks and nine model enquiries. Native controls turn either magnet; equivalent successful arrangements are accepted. A pure two-pole model computes attraction/repulsion and drawings. Predictions ungraded in C4; run/turn observations precede records and a bounded explanation. Reset clears evidence and rejects stale callbacks; no timers or continuous physics.
- Shared kit, local reviewed SVG, optional speech/glosses and hints after two
  misses. Shell owns final completion/misses/combos; no new persistence, account
  endpoints, rewards authority, external assets or dependencies.
- Lint, full tests (1175 passed, zero failures, one MONGODB_URI-dependent skip)
  and production build passed. Existing Vite >500 kB chunk warning remains.
  Logs: `/tmp/y3-forces-5-lint.log`, `/tmp/y3-forces-5-tests.log`,
  `/tmp/y3-forces-5-build.log`, `/tmp/y3-forces-5-render.log`.
- Vite SSR verified all 20 released Forces wrappers and
  677 distinct observation renders, with zero premature completions,
  actual availability, rendered measurements/outcomes and escaped authored text.
  Initial-render evidence: `/tmp/y3-forces-5-render.html`.
- Tests cover deterministic/constant RNG, complete records/plans/labels, missing/
  extra/unknown/duplicated answers, ungraded predictions, inspection gates, incorrect
  conclusions, reset/revision/duplicate-transition guards, release order and replay.
  Earlier category progress is preserved. Browser/theme/phone/real-save checks and
  owner review pending because browser controls are unavailable. No commit/push/deploy.

Final Year 3 Science release check: Vite loaded and initially rendered all **84 actual challenge wrappers**, with zero premature completions. Pure progress regressions verify complete Science, the final Forces/category/subject awards, Year 3 awards only with both other subjects complete, and withholding awards for missing or unfinished slots. Interactive saved-progress, phone and both-theme review remain pending.


### 2026-10-03 — final implementation bug/security review

- Reviewed the dirty Science code and shared integration. No confirmed exploitable
  security vulnerability found; dependency audit reported zero known vulnerabilities.
- Fixed five defect groups: sparse ordering answers, malformed surface samples,
  non-decimal plant-height strings, unused pole text and array-shaped magnet answers.
  The five new regression groups failed before fixes and passed afterwards.
- Lint, production build and full tests passed: 1,180 passes, zero failures, one
  database-dependent skip. Progress/auth/reward/storage/unlock contracts unchanged.
- Repeatable Vite SSR checker added: all 84 original wrappers plus 6,930 sampled
  render cases, including legitimate intermediate enquiry states, hints and locked
  answer controls. Forces: 677 distinct diagram renders passed. No learner data read
  or written. Interactive checks remain pending; no browser controls available.
- Evidence, boundaries and reproduction commands: [final review](BUG_SECURITY_REVIEW.md).
  No commit, push or deployment. Next: disposable-profile interactive Science review.


### 2026-10-03 — follow-up final bug/security review

- Found and fixed a Rocks C4 reset race: separate plan flags could clear after
  the revision/version reducer rejected the reset. Fair-plan approval now shares
  a single guarded reducer with prediction, observations, records and explanation.
- Added three regression groups for fair-plan gating, atomic reset/stale callbacks
  and strict final completion. Existing rock playthrough tests now use the actual
  runtime reducer. Updated the render checker to approve the plan through this
  reducer and cover the unapproved-plan screen.
- Lint, build and full tests passed: **1,183 passed**, zero failures, one database
  skip. All 84 initial wrappers plus **6,960** sampled render cases passed.
- Security/progress integration reviewed again; no confirmed exploitable security
  vulnerability found. Dependencies unchanged; the same-day audit remains at zero
  known vulnerabilities. Progress/storage/auth/reward/unlock contracts unchanged.
- Latest logs: `/tmp/science-review-followup-{lint,tests,build,render}.log`.
  Browser interaction, saved-progress and database ownership checks remain pending
  as documented in [the review](BUG_SECURITY_REVIEW.md). No commit/push/deploy.
