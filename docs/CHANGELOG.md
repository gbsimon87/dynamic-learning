# Delivered changes

Record delivered outcomes here, newest first, with useful verification and
remaining review limits. Keep current architecture/scope in
[PROJECT_KNOWLEDGE.md](PROJECT_KNOWLEDGE.md) and its focused references; upcoming
work belongs in [PROJECT_IDEAS.md](PROJECT_IDEAS.md). Implementation history before
2026-11-03 is in git history (`docs/PROJECT_KNOWLEDGE.md` at commit `fd4bc37`).

## 2026-11-09 — Lesson plans open as a readable teaching sequence

- Generated plans start with a compact outline grouped by week, including lesson/activity counts and timings. Only one lesson opens at a time. Opening shows Warm up → Teach and model → Practise → Check understanding, with direct activity links; support/stretch, evidence and activity previews remain available through disclosures.
- Editing fields appear only after “Edit lesson”; lesson movement controls appear only after “Reorder lessons”. Edits update the reading and full print views, survive closing/reopening and move with lessons across weeks. The sample desktop outline is approximately half its previous height; the opened first lesson shrank from 1,321px to 820px without removing teaching content.
- Full lint/build and all 958 component tests pass, including 22 teacher workflows. Full Node tests retain the same three existing Year 6 English/story-content failures and four skips. Chrome layout checks covered 1280/768/360px in both themes, reading/editing/reordering, disclosures, preserved progress and all 15 printed lessons, with no horizontal overflow or page errors; sampled text contrast exceeds 4.5:1. Physical-device, assistive-technology and teacher usability reviews remain pending.

## 2026-11-09 — Teacher planning page simplified into three steps

- Fixed class selection: year and subject are now one-tap chips that apply immediately (with a confirmation only when topics or a plan would be lost). Previously a changed year did nothing until a separate "Use this year and subject" button was found, so the header and search stayed on the old year. Year chips only list years that have a curriculum.
- Fixed input-state bugs: topics now apply as soon as they are added (no "Use these class needs" step), re-pressing the active input tab no longer blocks planning, switching between topics, pasted results and the sample keeps each tab's evidence, and a teacher's untick survives status changes. Each topic gets a Teach / Practise / Secure / Not sure control.
- Rebuilt the hierarchy as header → 1 What does your class need? → 2 Choose what to plan → 3 Build the plan → plan. Removed the hero metrics, duplicate "Find the right activity" section, eyebrow labels, rules essay and most helper copy. Lessons are collapsible rows; activity instructions and previews sit behind one disclosure. Learner progress and storage are untouched.
- Full lint/build and all 957 component tests pass; Node tests retain the same three content failures and four skips. One Chromium pass (plus one confirmation pass) covered desktop and phone in both themes with no overflow or console errors. Print layout, teacher review and physical devices were not rechecked.

## 2026-11-08 — Teacher search across the whole selected curriculum

- Quick class overview now searches every built challenge in the selected year and subject, using curriculum names, actual lesson titles/text, classroom terms, prefixes and spelling suggestions. The default Year 3 Maths course has 176 challenges across 44 topics; selectors cover all 37 registered pathways. Wider source-derived metadata supplements the original pilot's detailed descriptions.
- Search shows matching activities and lets teachers choose a particular challenge directly. Those IDs are retained in generated lessons and validated against the selected focus/availability. Imports and the general resource finder share the same catalogue. Curriculum changes protect unsaved work with confirmation; plan/print labels retain their own context. Closed lesson editors render on demand.
- Full lint/build, focused logic/workflow checks and all 956 component tests pass. Node tests retain three unchanged content failures and four database-dependent skips. One Chrome pass covers desktop, tablet and phone in both themes, Maths/Science/English context changes and printing. See the [coverage and review record](superpowers/2026-11-08-teacher-full-curriculum-search.md).

## 2026-11-08 — Teacher class input, fuzzy search and automatic plans

- `/teachers/planning` now starts with class-needs entry instead of loading fictional evidence. Teachers can describe needs and choose a class status, or paste CSV/TSV topic-response totals and confirm their mappings. Sample data is an explicit opt-in. Inputs stay in the current tab; refresh clears them, and saved accounts/plans remain pending.
- Added typo/transposition suggestions to reviewed classroom vocabulary. Uncertain matches require confirmation. Automatic plans use the entered evidence and representation, choose matching resources, favour teaching needs when allocating extra lessons, and use confident topics for retrieval. No sample scores fill gaps, class totals do not infer individual groups, and existing edits require explicit draft replacement.
- Full lint/build and all 952 component tests pass; final focused checks cover the mobile/vocabulary refinements. Full Node tests retain three unchanged content failures and four database-dependent skips. Chrome checks cover both input routes and generated plans at desktop/tablet/phone widths in both themes, plus print. See the [class-input record](superpowers/2026-11-08-teacher-class-input.md) for validation and remaining review.

## 2026-11-08 — Find teacher activities by learning need

- Added reviewed teacher descriptions for the Year 3 pilot's 20 curriculum challenges and Fraction Fun: learning objective, child actions, starting knowledge, teaching use, scope and limits. Existing curriculum names, IDs and progress remain intact.
- Teachers can search classroom terms, resolve ambiguous needs such as “finding halves”, inspect read-only examples from actual question banks, include objectives in planning focus and add activities within a lesson. Resource explanations also appear in printed plans. Missing activities and supporting-only matches are explicit; edited drafts are preserved.
- Full lint/build and all 947 component tests pass. The full Node suite retains three existing content failures and four database-dependent skips. One Chrome pass covers desktop, tablet and phone in both themes, five example model types and print. Teacher, physical-device and assistive-technology review remain pending. See the [discovery record](superpowers/2026-11-08-teacher-resource-discovery.md) for scope and evidence.

## 2026-11-08 — Teacher planning and playlists preview

- Added `/teachers/planning`, linked from the footer, with clearly fictional Year 3 maths evidence. The preview distinguishes correct/incorrect/skipped/not-assessed responses, shows pupil distributions and explains its provisional teaching priorities.
- Teachers can choose objectives, generate 3–15 lessons over three weeks, edit titles/objectives/timings/teaching notes, reorder lessons and Bix resources, and print/save a complete PDF. Twenty existing curriculum challenges and supporting Fraction Fun are resolved from current catalogues/availability. Replacing a draft requires explicit confirmation; refreshing loses edits. Teacher accounts, saved plans, live assessments and school sharing remain future milestones.
- Full lint/build, all 941 component tests, planner/resource unit tests and HTTP route regressions pass. Browser layout/contrast checks cover desktop, tablet and phone in both themes, plus complete print output. Full `npm test` has three pre-existing failures in Year 6 English lesson lint and story content; four database tests skip without MongoDB. SEO HTTP checks pass, but its browser script stops at an unchanged Number Bonds heading mismatch. Physical-device, assistive-technology and teacher review remain pending. See the [plan and evidence](superpowers/plans/2026-11-08-teacher-planning-playlists.md).

## 2026-11-08 — Times Tables Race: simpler setup screen

- Replaced the From/To dropdowns and quick-choice buttons with numbered steps: tap any mix of 1–12 times-table tiles (with All and Clear), then pick one of two picture cards, Beat the clock or Finish the race. Start stays disabled until a table is chosen. Tables 0 and 13–20 are no longer offered. The play and results screens are unchanged. Skills Mode stays untracked.
- Data and component tests updated and passing. Full lint and production build pass. Full `npm test` reports three failures already on `dev`, in files this change does not touch: Year 6 English lesson lint and two `stories.test.js` checks. One browser pass at 375px and 1280px in both themes found no horizontal scroll and 64px+ tiles. The play and results screens and a real device were not checked.

## 2026-11-08 — Shape Explorer moved to Maths

- Moved the Shape Explorer card into Maths on the Skills hub and removed the now-empty Shapes category. Its existing `/skills/shapes` game route and public guide are unchanged.
- Skills hub/guide tests, full lint, production build and public SEO validation pass. The concurrent Year 6 English lesson-content validation failure remains outside this change.

## 2026-11-08 — Year 6 Geography complete course implementation

- Built the 16-topic, 64-challenge Year 6 Geography pathway: regional comparison; glaciers, river/coast management and climate responses; energy, migration, trade and UK land use; then six-figure references, digital layers and fieldwork planning/evaluation. Every topic uses the established Geography field-note presentation and a visible evidence card for its answer.
- Registered the course, permanent IDs, certificate outcomes, public guide and Year 6 selector/signup availability. Geography is explicitly `countsTowardYear: false`, so it does not alter the Year 6 Maths/English/Science certificate or any saved learner progress.
- The Geography data test, 16-topic course checker (20 deterministic seeds) and a 64-wrapper/retry/hint/completion component playthrough pass. Full repository lint, tests and production build remain to be run; browser layout, physical-device, content specialist and learner review remain pending.

## 2026-11-08 — Year 6 History built; Year 6 award switched on

- Built **Year 6 History**: 5 categories, 20 topics, 80 challenges. Local history (method topics with made-up examples, plus Jarrow through time: Bede, Palmer's shipyard, the 1936 march), crime and punishment from the Anglo-Saxons to today, and change/cause/significance skills. Registered with `countsTowardYear: false`; public guide, certificate lines, permanent IDs and the statutory crosswalk added. See [the course record](superpowers/2026-11-08-year6-history-course-build.md).
- **Owner decision:** Year 6 Maths, English and Science now count toward the Year 6 award (staged exclusion removed; no earned award can be lost). Registry and dataset tests updated.
- Checks: lint, 20/20 `check:course`, a 80-challenge component playthrough, build and node/component suites pass, except one Year 6 English lesson lint failure from concurrent English work. Not checked in a browser or on a device; content, Jarrow fact-check and sensitive-topic reviews are pending.

## 2026-11-08 — Year 6 English: Composition and Editing completed

- Built all four Curriculum slots and matching Bix lessons for **Formal Register for Audience and Purpose**, **Precising Longer Passages**, **Passive Voice in Writing**, **Subjunctive Forms in Writing**, **Proofreading for Clarity and Effect**, and **Year 6 Dictation**. The quest uses visible context, choice/sort/sentence-tile practice and the existing sound-off look-cover-write dictation route; progress, unlocks and Year 6 award membership are unchanged.
- Five authored banks pass 30-seed topic checks, bank lint and a retry/hint/choice/sort/tile completion playthrough. Dictation has its own Appendix 1 bank test and a structure-only loader check because its specialised response kinds are unsupported by the generic checker. Lint and the production build pass; full tests currently report broader API/public-page failures. Browser layout, physical-device, teacher/content and owner/learner review remain pending.

## 2026-11-08 — Year 6 English: Cohesion, Layout and Punctuation completed

- Built all four curriculum slots and Bix lessons for the seven topics: **Cohesive Devices across Paragraphs** (contrast, result and repeated-phrase links), **Ellipsis** (spotting and building omissions), **Layout Devices** (device matching, leaflet sub-heading tapping), **Semicolons, Colons and Dashes**, **Punctuation in Lists** and **Bullet Point Punctuation** (tap-the-gap and tap-the-line controls), and **Hyphens to Avoid Ambiguity**. The course remains explicitly excluded from Year 6 awards.
- Each bank has 15 authored templates per slot. Bank lint, semantic bank tests (for example: only the repeating opener repeats paragraph 1's words; every bullet list is internally consistent), 50-seed topic checks and a playthrough of all 28 slots (retry, hint, choice, sort, tiles, tap) pass; focused lint is clean. Bullet-point style is one taught convention that the statutory text does not specify, so owner review is advised. Full-course lint/test/build, browser layout, physical-device and content/owner review remain pending.

## 2026-11-08 — Year 6 English: Interpretation and Comparison completed

- Built all four Curriculum slots and matching Bix lessons for **Exploring Meaning in Context**, **Predicting from Details**, **Summarising across Paragraphs**, **Figurative Language and its Effect**, **Comparing Accounts and Viewpoints**, **Themes and Conventions**, and **Asking Questions about Texts**. Each topic uses visible reading evidence, then progresses through choices, claim sorting, response tiles and independent application; learner progress, unlocks and Year 6 award membership are unchanged.
- Every reading bank has 15 authored templates per slot. Deterministic bank validation, a retry/hint/choice/sort/tile/completion playthrough and the production build pass. The full lint run remains blocked by an in-progress cohesion-topic lint error; full test runs also report unfinished lessons in the concurrently built cohesion/writing scope. Browser, touch-device, teacher/content and owner/learner review remain pending.

## 2026-11-07 — Year 6 English: Spelling - Advanced Patterns completed

- Built all four curriculum slots and Bix lessons for **The Letter String ough** (rhyme-word models, sound sorting, letter tiles, sentence choices), **Confusing Word Pairs** (the eleven Year 6 pairs: meaning choices, clue sorting, tiles and sentence checks) and **Year 6 Word List Parts 1 and 2** (spelling-chunk models, right/wrong sorting, tiles and typed sentence gaps for every statutory word from identity to yacht). The quest now has six playable topics; the course remains explicitly excluded from Year 6 awards.
- Bank tests check every word against the saved Appendix 1 data; the node test caught and fixed identical sentence-check prompts in Confusing Word Pairs. Focused lint, 50-seed topic checks and completion playthroughs of all 16 new slots pass. Full-course lint/test/build, browser layout, physical-device and content/owner review remain pending.

## 2026-11-07 — Year 6 English: Formal Language and Sentence Choices

- Completed all four curriculum slots and Bix lessons for **Active and Passive Voice**, **Formal Structures and the Subjunctive**, and **Expanded Noun Phrases for Information**. The quest now also includes the already-built Formal and Informal Vocabulary and Synonyms and Antonyms topics.
- Topic checks (four slots × 50 deterministic seeds), bank tests and a component playthrough for retry, hint, choice, sort and tile-build completion pass. Browser layout, physical-device, content/owner review and full-course validation remain pending.

## 2026-11-06 — Year 6 English: Synonyms and Antonyms

- Built all four curriculum slots and Bix lessons for **Synonyms and Antonyms**: choosing synonyms and antonyms, sorting around one headword, swapping a word in a sentence with word tiles, and odd-one-out and same/opposite-meaning sentence choices. The course remains explicitly excluded from Year 6 awards.
- Focused lint, deterministic four-slot bank checking (50 seeds), topic-loader checking and component playthroughs of all four slots pass. Full-course lint/test/build, browser layout, physical-device and content/owner review remain pending.

## 2026-11-06 — Year 6 English: Hyphens in Words

- Built all four curriculum slots and Bix lessons for **Hyphens in Words**: visible prefix-and-base models, prefix sorting, letter-tile spelling and sentence choices teach the Appendix 1 forms `co-ordinate` and `re-enter` without conflating them with the later punctuation topic about avoiding ambiguity. The course remains explicitly excluded from Year 6 awards.
- Focused lint, deterministic four-slot bank checking (50 seeds), topic-loader checking and a retry/hint/completion component playthrough pass. Full-course lint/test/build, browser layout, physical-device and content/owner review remain pending.

## 2026-11-05 — Year 6 English: Adding Endings to fer

- Built all four curriculum slots and Bix lessons for **Adding Endings to fer**: visible root-and-suffix models, spelling choices, sorting, letter tiles and sentence spelling all teach when vowel-led suffixes do or do not double the `r` in `-fer` words. The course remains explicitly excluded from Year 6 awards.
- Focused lint, deterministic four-slot bank checking (50 seeds), topic-loader checking and a retry/hint/completion component playthrough pass. Full-course lint/test/build, browser layout, physical-device and content/owner review remain pending.

## 2026-11-04 — Year 6 English course integration and pilot

- Registered the approved 31-topic / 124-slot Year 6 English tree, mapped each permanent topic ID to the Years 5–6 statutory programme and retained `countsTowardYear: false`. No learner-progress, persistence or unlock rule changed.
- Built the four-slot Formal and Informal Vocabulary pilot with Bix lessons, touch-friendly choice/sort/tile activities, 15 authored templates per slot and a retry/hint/completion playthrough. The public guide now identifies the other 30 topics as unavailable while they are built.
- Focused lint, bank, registration, selector, guide and component checks pass. Full lint, test, build, course-wide checker, browser-layout and device/content review are intentionally pending the complete course.

## 2026-11-04 — Year 6 Maths regression coverage and fixes

- Extended focused bank checks and all-slot playthroughs, including decimal tile entry, incorrect-answer retry and independent arithmetic checks. Fixed input, arithmetic, distractor and lesson-format failures found during validation.
- Full validation evidence and remaining teaching/device review are in the [course record](superpowers/2026-11-04-year6-math-course-build.md#follow-up-validation--2026-11-04).

## 2026-11-04 — Year 6 Maths complete course implementation

- Completed all 49 Year 6 Maths topics and 196 challenge slots in the existing Year 6 Maths teaching frame. The course now includes the four operations, fractions and decimals, ratio, algebra, measurement, geometry, position and statistics alongside the place-value pilot.
- Added a Bix lesson for every challenge slot, updated the public guide and curriculum inventory, and retained the staged award setting (`countsTowardYear: false`) without changing learner progress or stored IDs.
- Final build result and remaining content/device review are recorded in the [course record](superpowers/2026-11-04-year6-math-course-build.md).

## 2026-11-04 — Focused development checks and one final validation pass

- Added [validation policy](VALIDATION.md) for Curriculum and Skills: focused
  checks at intermediate handoffs; full lint/tests/build once before merge/release.
  Rerun checks affected by subsequent fixes and broaden immediately for progress,
  accounts, routing, shared engines/components or build configuration changes.
- Aligned AGENTS.md, both authoring guides, course/topic/strand templates and
  relevant agent skills. Keep meaningful bank/playthrough coverage, explicit
  pending final checks and short log summaries. Documentation-only changes do
  not require application suites/builds.
- Validated this documentation-only change with diff, local-link and skill
  metadata checks; application tests/build were not rerun.

## 2026-11-04 — Automatic course usage records and build feedback

- Added `course:usage` for Claude Code logs: branch/timer filtering, global
  message-ID deduplication, per-model/role counters, subagent/resumed-session
  support and explicit unknown fields. Raw transcripts stay outside the repo.
- A completed build can update its course record and Measured builds row in one
  command. Repeated collection refreshes the same entry; ambiguous/missing sources
  fail clearly, and unfinished pilots cannot write completed-build rows.
- Updated the start prompt, course record and strand brief to collect usage
  automatically, check integration fixtures before scaling, preserve pilot
  corrections and record concrete next-build improvements. Parameterised subject
  numeric/lesson contracts instead of imposing Science defaults.
- Collector tests cover duplicate/cumulative rows, branch/time filtering,
  unknown counters, malformed logs, ambiguous discovery and idempotent records.
  A read-only Science check documents its timer-versus-branch-start difference;
  the original baseline is preserved.
- Validation: lint, full tests (2,680 Node and 750 component tests; four MongoDB
  tests skipped without configuration) and build pass. No browser check needed
  for this tooling/documentation change.

## 2026-11-04 — Year 6 Maths place-value pilot

- Owner pilot feedback: capitalised each displayed quest title’s first letter;
  permanent category IDs remain unchanged.

- Registered the approved 49-topic / 196-slot Maths tree with year-award inclusion
  explicitly disabled. Only the four place-value topics are playable so far:
  16 challenges and 16 illustrated, separately registered Bix lessons.
- Added place-value charts through ten million, rounding and negative-number
  models, ordering/sorting tasks and contextual problems. Uses existing theme
  styles and interaction controls; no learner data is reset or migrated.
- Bank tests independently recompute visible calculations; playthroughs cover
  all 16 challenges in both themes, retry/hints and completion, plus real loader
  entry through every lesson. Full validation and remaining owner trial are
  recorded in the [course record](superpowers/2026-11-04-year6-math-course-build.md).
- The other 45 topics remain unavailable pending the requested pilot review.

## 2026-11-04 — Ocean Explorer merged into dev

The `feat/underwater` branch (built 2026-10-29) is merged. Ocean Explorer is a
3D Skills Mode world at `/skills/ocean-explorer`, with its preview guide at
`/learn/ocean-explorer`. It is the second explorable world on the Solar System's
concept, sharing the new world kit in `src/components/worlds/`:

- **Phase 1:** a stationary submarine you can view, zoom and reset.
- **Phase 2:** manual steering with the Solar System's joystick and keys.
- **Phase 3:** orbit a coral reef and read its card.
- **Phase 4:** swimming sea life, now 12 species and 85 animals across nine reefs.

How it works is in [EXPLORABLE_WORLDS.md](EXPLORABLE_WORLDS.md); the
[design](superpowers/specs/2026-10-29-ocean-explorer-design.md) and phase plans
are in `docs/superpowers/`. Remaining work is idea #44. The course-checker
backlog item it collided with is now #45. Owner review of the sea-life facts and
physical-device review are pending.

## 2026-11-04 — Year 6 Science, and Years 5–6 award membership

- Registered Year 6 (Science only so far): 5 strands, 24 topics, 96 challenges
  in the Science adventure frame, mapped verbatim in
  [year-6-science.md](curriculum/year-6-science.md). New figures: circuit
  diagrams with standard symbols, light paths, a periscope, shadows and the
  circulatory system. Year 6 is offered in profiles, signup and the picker, with
  a public guide. [Course record](superpowers/2026-11-04-year6-science-course-build.md).
- Year awards (owner decision): Years 5 and 6 count Maths, English and Science.
  Year 5 History no longer counts, which removes a requirement and revokes
  nothing. Year 6 Science stays excluded until Year 6 Maths and English exist.
- Lint, full tests (2,634 unit/API and 662 component passes; four existing
  skips), build and `check:course --year 6 --subject science` (24/24) passed.
  The new figures had one batched browser pass, at desktop and phone widths in
  both themes. No teacher content review, safeguarding read or device review yet.
- Token usage was counted from the session logs, one entry per message. It is
  recorded in the course record and as the first row of
  [Measured builds](BUILD_MEASUREMENT.md#measured-builds). From it,
  [AUTHORING.md](AUTHORING.md#course-builds-with-content-agents) gained a
  recipe for building a course with content agents and a checklist for adding
  another Year 6 subject. There is also a reusable
  [strand agent brief](superpowers/templates/strand-agent-brief.md).

## 2026-11-04 — Authoring follow-ups

- `BUILD_MEASUREMENT.md` now gives tool-neutral token-recording rules instead
  of OpenAI/Codex-specific commands.
- Course timer records in `docs/authoring/timings/` are git-ignored; final
  totals go in the course record.
- Removed the skill's `references/visual-recipes.md` pointer; links now go
  straight to `docs/VISUAL_RECIPES.md`.
- Backlog #45 tracks bank-checker adapters for the 140 structure-only topics.
- Removed the dated `docs/history/` project-knowledge archive and the branch
  review record; links now point to current docs. The archive's still-current
  coding rules moved to `ENGINEERING_RULES.md`. Earlier detail remains in git
  history (`docs/PROJECT_KNOWLEDGE.md` at `fd4bc37`).

## 2026-11-03 — Full course-building branch review

Reviewed all tracked and untracked work on `feat/improve-course-builds` against
`dev`. Fixed History image-root false failures, internal game-topic aliases,
incompatible envelope/custom-control scaffolds and the existing statutory
licence/license spelling exception. Added regression coverage and corrected
stale progress/deployment guidance.

The first-context guide now has direct, AI-tool-neutral paths for Curriculum
courses and standalone Skills Mode games. Added `SKILLS_AUTHORING.md`, promoted
the visual catalogue into `VISUAL_RECIPES.md`, and documented complete new-course
integration. The entry guide is 1,590 words; the full earlier content remains in
the archive. Bank-checker coverage gaps are tracked as backlog #45.

Lint, full tests (2,627 unit/API and 655 component passes; four existing skips)
and build passed. All 749 topics were swept: 609 passed bank checks over 50
seeds per slot; 140 bespoke topics passed structural checks with their generic
bank-coverage limits explicit. No unexpected failures remained. Source comments
changed in `render.yaml`/`server/email.js`; runtime configuration/behaviour did
not. No commit, deployment, live-data write or new browser/device review occurred.

## 2026-11-03 — Focused project knowledge and build measurement

- Replaced the 45,713-word project knowledge file with a 1,457-word current
  builder guide. Preserved the complete earlier content, with relative links
  rebased, in a clearly labelled historical archive. Split out current
  architecture, curriculum inventory and operations/outstanding review.
- Added direct routes to subject skills, maintained implementation examples,
  visual teaching recipes, commands and exact statutory context. Updated
  maintenance instructions so future outcomes go here instead of growing the
  entry guide into a chronology again.
- Documented official OpenAI token reporting: CLI session/account commands,
  completed-turn JSON usage events, app/IDE context-versus-token distinctions
  and the limits of the local duration timer. No previous or current unobserved
  token counts were inferred.
- Documentation/source review only; no app behaviour, learner records,
  deployment settings or live services changed. Full pre-split content was
  checked against the archive after declared link rebasing; local guide links
  and anchors resolve, and all 32 pathways/749 topics/2,996 slots match the
  current source inventory. Six skill frontmatters are valid. Lint, the full
  suite (2,625 unit/API and 655 component passes, four existing skips) and the
  build (62 public pages prerendered) passed. No browser pass was needed for
  documentation-only changes; live services and physical devices were not checked.

## 2026-11-03 — Curriculum authoring workflow and tools

The authoring work immediately preceding the documentation split delivered
`topic:context`, `scaffold:topic`, `check:topic`, `check:course` and `course:timer`.
The matching skills, compact topic/course templates and visual recipes now guide
future builds through existing subject engines and current illustrated teaching.
Scaffolds preview first, refuse overwrites and preserve subject visuals; empty
generic banks fail tests. Bank adapters reuse available subject validators;
unsupported checks and remaining review gaps are explicit.

The timer persists work/pause intervals across sessions without claiming token
usage. An existing Opposite Match test was made deterministic after a random
positional assumption produced a false failure. Immediately before this split,
lint, build and the full suite passed: 2,625 unit/API checks, four existing skips
and 655 component checks. All 749 topic mappings were found, representative
Year 5 checks covered twelve subjects, and a full Year 5 Science check passed.
No browser pass was needed for tooling/docs; course device/content review is
separate. The current workflow is in [AUTHORING.md](AUTHORING.md).
