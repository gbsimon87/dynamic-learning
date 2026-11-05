# Delivered changes

Record delivered outcomes here, newest first, with useful verification and
remaining review limits. Keep current architecture/scope in
[PROJECT_KNOWLEDGE.md](PROJECT_KNOWLEDGE.md) and its focused references; upcoming
work belongs in [PROJECT_IDEAS.md](PROJECT_IDEAS.md). Implementation history before
2026-11-03 is in git history (`docs/PROJECT_KNOWLEDGE.md` at commit `fd4bc37`).

## 2026-11-05 — Shape Explorer restyle, 2D/3D and per-level shapes

- `/skills/shapes` now runs on `FreePlayShell` (levels, star pips, read-aloud, shared feedback) with themed SVG shapes and large name tiles; a wrong tile is set aside so the child retries. `ShapeQuiz.jsx` and the `--sq-*` tokens are gone.
- A 2D / 3D switch (keeps the level). Each level has its own shapes: 2D 6 / 8 / 16 (up to the kinds of triangle and quadrilateral, 7–12-sided polygons, sector, lens), 3D 6 / 5 / 6 (up to the regular solids, frustum, bipyramid). Pure bank `src/data/freePlay/shapeExplorer.js`; "Trapezoid" is now "Trapezium" (UK).
- Names that also fit one drawing (rhombus/parallelogram, the triangle kinds, octahedron/bipyramid, diamond/trapezium) are never offered together (`alsoCounts` / `group`). Square/rectangle and circle/oval stay distinct, as in Years 1–2.
- Flat-faced solids are drawn from vertex data (`solidModels.js`: hull faces, back-face culling, shading), with face-count and Euler-formula tests; curved solids are hand-drawn. Left out: megagon, icosagon, hendecagon, prismatoid, antiprism, Möbius strip, Klein bottle, ellipsoid, ovoid.
- Checked: focused lint, unit and component tests. **No browser check** — the 3D drawings, tile wrapping for long names and both themes have not been seen on screen. Not device-reviewed.

## 2026-11-05 — Flag Finder restyle

- `/skills/flag-finder` now runs on `FreePlayShell` like the other free-play games: star pips, read-aloud, shared feedback and Bix's cheer. The "Where in the world?" label and select are gone; the whole planet and each continent are the level chips. A wrong country greys out and the child tries again; the right one lights up and the next flag follows.
- On desktop (≥900px wide, ≥600px tall) the whole game fits the window with no page scroll: flag beside the four answers, the flag absorbing spare height. Smaller screens scroll as normal. Question generation is the pure `src/data/freePlay/flagFinder.js`; the shell takes a new optional `className`.
- Checked: lint, component tests, build, unit test for the generator; one batched browser pass at 1280×720, 1440×800, 1920×1080 and 390×844 in both themes (desktop `scrollHeight` equals the viewport). Not device-reviewed by a child. `npm test` has 4 failures in Year 6 lesson/story/award tests from the uncommitted Year 6 work, not this change.

## 2026-11-05 — City Spotlight restyle and levels

- `/skills/city-spotlight` now opens straight on a picture (the "Start Game" screen and the "Finished" screen are gone) and runs on `FreePlayShell` like the other free-play games: Easier / Medium / Harder levels (3 / 4 / 6 cities to choose from), star pips, read-aloud of the clue and the shared feedback. Rounds are endless; a wrong city greys out and the child tries again.
- Layout uses the width: on a wide card the picture sits beside the clue and city buttons; on a phone the picture is on top. Type steps are page title, then the question, then the city buttons, then the clue. CSS is `cs-*` scoped (the old global `.score` / `.prompt` rules are gone).
- New pure generator `src/data/freePlay/citySpotlight.js` (wrong choices never share the answer's country) with unit tests; `tests/components/citySpotlight.test.jsx` rewritten. Focused lint and tests only. **No browser check** (the Playwright browser was in use by another session): layout, both themes and phone width are unreviewed; full lint/test/build and device review pending.

## 2026-11-05 — Speed Reader restyle, levels and more stories

- `/skills/speed-reader` setup now sits in the shared challenge-kit panel (both themes via `--ck-*` tokens). A new Easy / Medium / Hard picker chooses which stories are offered and the starting pace (`src/data/freePlay/speedReader.js`: 70 / 110 / 160 wpm, 1 / 1 / 2 words at a time); speed and chunk size can still be changed.
- The speed control is now a big single-thumb slider with a 🐢 and 🚀 at the ends, the same look as the Arithmetic Practice slider, plus Slow / Steady / Fast / Super quick buttons and a live "words a minute" readout. The focus-letter option is a switch.
- "Your own story" is now one of two big cards ("A Bix story" / "Your own story") instead of a collapsed `<details>`; it shows a word count and still skips the questions.
- `src/data/stories.json` grew from 6 to 18 stories (6 per level, 3 questions each). New unit tests (`src/data/freePlay/speedReader.test.js`, including a story-shape check) and `tests/components/speedReader.test.jsx`; `textSecurity` test updated for the own-story card. Focused lint and tests only. No browser check (requested); full lint/test/build and device review pending.

## 2026-11-05 — Sight Word Pop restyle and levels

- `/skills/sight-word-pop` now starts from Easier / Medium / Harder levels instead of two sliders (8 words in 60s with slow bubbles, up to 12 words in 45s with fast ones). Playing has a time bar, a big target-word banner with read-aloud, larger coloured bubbles (theme tokens, both themes), and a 1–3 star result screen with Play again / Change level and a Stop button.
- Fixes: a bubble now scores by whether it matches the *current* target (a leftover bubble of the previous target no longer scores), and the game no longer ends while the last target is still floating. CSS is now `swp-*` scoped (the old global `.wrapper`/`.score`/`.prompt` rules are gone). New `tests/components/sightWordPop.test.jsx`. Focused lint and tests only. No browser check (requested); full lint/test/build and device review pending.

## 2026-11-05 — Synonym Safari restyle and levels

- `/skills/synonym-match` now runs on `FreePlayShell` like Word Builder: Easier / Medium / Harder levels, star pips, read-aloud and the shared feedback. It stays a flip-card memory game: Easier has 3 pairs of everyday words, Medium 4, Harder 6 with longer words (enormous / colossal). A right pair stays face up in a shared colour with a tick; a wrong pair shakes and turns back over. Rounds take one word family per pair, so no word can match anything but its own partner.
- New pure generator `src/data/freePlay/synonyms.js` (bank grew from 16 pairs to 70 synonym families) with unit tests, and `tests/components/synonymSafari.test.jsx`. The unnamespaced `difficulty` localStorage key is no longer written (removed from `docs/OPERATIONS.md` known issues). CSS is now `sa-*` scoped. Focused lint and tests only. No browser check (requested); full lint/test/build and device review pending.

## 2026-11-05 — Opposite Match restyle and levels

- `/skills/opposite-match` now runs on `FreePlayShell` like Word Builder: Easier / Medium / Harder levels, star pips, read-aloud and the shared feedback. Easier matches three pairs of everyday words, Medium four pairs, Harder five pairs with longer words (ancient / modern). Matching can start from either column; a right match locks both words in a shared colour with a tick, a wrong tap shakes that word and the first word stays chosen. Rounds never hold two pairs sharing a word (`old`).
- New pure generator `src/data/freePlay/opposites.js` (bank grew from 38 to 61 pairs) with unit tests; component test rewritten. CSS is now `om-*` scoped (the old global `.word-chip`/`.drop-zone` rules are gone). Focused lint and tests only. No browser check (requested); full lint/test/build and device review pending.

## 2026-11-05 — Sentence Builder restyle and levels

- `/skills/sentence-builder` now runs on `FreePlayShell` like Word Builder: Easier / Medium / Harder levels, star pips, read-aloud and the shared feedback. The old word-count sliders are replaced by levels: Easier 3–4 words, Medium 5–6, Harder 7–11. Easier and Medium keep the capital letter on the first word and the full stop on the last as clues; Harder drops both. Words fill numbered slots; tapping a placed word takes it back; a wrong order shakes only the misplaced words so the child can fix them.
- New pure generator `src/data/freePlay/sentenceBuilder.js` with unit tests (bank grew to 47 sentences); component tests rewritten. Its CSS is now `sb-*` scoped (the old global `.word-chip`/`.check-btn` rules are gone). Focused lint and tests only. No browser check (requested); full lint/test/build and device review pending.

## 2026-11-05 — Word Sorter restyle and levels

- `/skills/word-sorter` now runs on `FreePlayShell` like Word Builder: Easier / Medium / Harder levels, star pips, read-aloud and the shared feedback. Easier sorts nouns and verbs (6 words), Medium adds adjectives, Harder adds adverbs with longer words (8 words). Each box has its own colour and a plain-language hint ("naming words"). A wrong box shakes and the word stays in the bank; a right one pops in as a chip. Ambiguous words (play, drink, light, fast…) are excluded.
- New pure generator `src/data/freePlay/wordSorter.js` with unit tests, and `tests/components/wordSorter.test.jsx`. Focused lint and tests pass. No browser check (requested); full lint/test/build and device review pending.

## 2026-11-05 — Number Bonds restyle

- `/skills/number-bonds` now uses the shared free-play frame and kit tokens. The Target and Mode dropdowns are big segmented buttons (5/10/20/Custom; Match cards/Practice), Custom is a 52px −/+ stepper with a typed box clamped to 2–100, cards are larger flip tiles, and Practice uses the Arithmetic Practice equation panel. Rules are scoped under `.nb`.
- New `tests/components/numberBonds.test.jsx`; `olderSkillsFeedback` test updated for the new controls. Focused tests and lint pass. No browser check (requested); full lint/test/build and device review pending.

## 2026-11-05 — Arithmetic Practice setup restyle

- `/skills/arithmetic-practice` now uses the shared free-play frame and kit tokens. Operations are big toggle chips, the mix option is a switch, operand count and number size are segmented pickers (Up to 10/20/50/100), and Min/Max is one dual-thumb slider with 44px thumbs and a live "From x to y" readout. The play screen shares the same look. All rules are scoped under `.ap`, removing global `select` and `input[type=range]` leaks.
- New jsdom test `tests/components/mathPractice.test.jsx`; focused lint passes. One batched browser pass (desktop and 360px, both themes, drag including thumbs at the top end) found and fixed a chip wrap/clip. Full lint/test/build and physical-device review remain pending.

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
