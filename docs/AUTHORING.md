# Curriculum authoring

Start with the requested year, subject and topic ID. The current registry covers years 1–6 (Year 6: Science only so far) and 12 subjects; check availability rather than assuming a registered course has every challenge. All built challenges are open. Completion tracks learning and awards; it does not gate access.

This is the project workflow for Curriculum Mode, readable by any AI tool or
developer. For standalone Skills Mode games use [SKILLS_AUTHORING.md](SKILLS_AUTHORING.md).
For an existing topic, use the scoped context command below. For a new course
(such as Year 6), complete integration first; context/scaffold commands cannot
invent an unregistered dataset or its teaching boundary.

## New course integration

1. Use [the curriculum source index](curriculum/README.md) to select the saved
   statutory programme. Save missing programmes verbatim from the official DfE
   PDF with source/retrieval metadata. Map each proposed topic to the exact
   requirement and exclusions. Preserve the documented year split for key-stage
   subjects and relevant English spelling/grammar appendices.
2. Add a dataset following [Year 5 Science](../src/data/year5ScienceCurriculum.js)
   or the matching subject. Categories/topics need permanent IDs and four slots.
   Many datasets derive IDs from titles with
   [toKebabCase](../src/utils/toKebabCase.js), ignoring raw handwritten IDs.
   Keep shipped IDs unchanged. Add registry/ID tests rather than relying on a
   build to reveal spelling or missing-module mistakes.
3. Register the combination in [curriculumRegistry.js](../src/data/curriculumRegistry.js).
   Update year/subject definitions there and the accepted profile fields in
   [childFields.js](../src/data/childFields.js) when needed: both year lists now
   include 6, so another Year 6 subject needs only its registry entry. A Year 7
   would need both lists and the tests that use 7 as the unavailable year. A new subject also needs its child
   whitelist, selector look/tokens in
   [CurriculumSelectPage](../src/pages/curriculum/CurriculumSelectPage.jsx), and
   hero/category visuals in [CurriculumPage](../src/pages/curriculum/CurriculumPage.jsx).
   Keep unknown combinations unavailable; preserve old profiles and progress.
4. Choose the existing subject engine/visual approach in
   [VISUAL_RECIPES.md](VISUAL_RECIPES.md), then connect the new year's own banks
   and four wrappers per topic. Story, map and adventure frames need their
   existing game adapters. The shared route/loader already handles years and
   slots; do not add a route per challenge or register Curriculum content in the
   standalone Skills catalogue. Finish a representative pilot before scaling.
5. Add illustrated lessons or the subject's notes/stories and topic certificate
   statements via [lessons/index.js](../src/data/lessons/index.js) and
   [certificateSkills.js](../src/data/certificateSkills.js). Add the public
   year/subject guide in [curriculumGuides.js](../shared/curriculumGuides.js).
   Verify signup/profile choices, curriculum entry points and public guides use
   the intended year/subject; update catalogue/count assertions where applicable.
6. Set `countsTowardYear: false` for staged additions. Playability, completion
   and award inclusion are distinct; do not change earned year awards implicitly.
   Read the [progress contract](ARCHITECTURE.md#progress-stores-and-server)
   before ID/storage/award changes. Test legacy data, child/year/subject
   isolation and unavailable-module fallbacks alongside the new curriculum.

The [course record](superpowers/templates/course-build.md) tracks scope, permanent
IDs, visual baseline, pilot and technical/content/device evidence. Use current
source tests such as [year5ScienceCurriculum.test.js](../src/data/year5ScienceCurriculum.test.js)
and [curriculumIds.test.js](../src/data/curriculumIds.test.js) as integration models.

## Course builds with content agents

This is the recipe that built Year 6 Science (24 topics) in 23 minutes of
recorded work; see the [baseline](BUILD_MEASUREMENT.md#measured-builds). The
coordinator's own turns cost far more per topic than the content agents', so
the coordinator integrates, pilots and reviews, and the agents write the banks.

1. **Start the course in a fresh session** with the
   [start prompt](superpowers/templates/course-start-prompt.md), with the course timer running. A
   session carrying earlier work re-sends that context on every turn.
2. **Integrate and pilot first** (coordinator): dataset, registry, wrappers,
   certificate lines, the visual renderer and any new figure types, the subject
   test, and one complete strand as the model. Give each strand its own bank
   file exporting `<strand>`, `<strand>Visuals` and `<strand>Rules`, merged by
   `index.js` and `figures.js`, as `src/data/challenges/year6Science/` does. Two
   agents then never edit the same file.
3. **Brief at most two content agents** with the
   [strand agent brief](superpowers/templates/strand-agent-brief.md): the model
   strand, the exact topic IDs, the statutory bullets with their line range, the
   figure types, the content rules and the test to run. Sonnet was enough for
   bank writing; keep the coordinator on the stronger model for review.
4. **Keep the coordinator's context small while they work**: read files by line
   range, avoid commands that print whole files or long test logs, batch
   independent calls, and run the full suite once at the end rather than after
   every edit.
5. **Review what comes back** before the full suite:
   - safeguarding-sensitive topics in full;
   - the facts each agent says it was unsure of;
   - the answer-length cue: the share of choice questions whose answer is
     clearly the longest option. Year 5 Science was 28% and Year 6 Science 30%;
     a topic far above that needs rewording.
6. **Check new hand-drawn figures in one batched browser pass**: render every
   new figure type and topic picture to one static page, at desktop and phone
   widths in both themes. This found crowded labels, a dark-theme colour and a
   misdrawn diagram that jsdom tests could not show.

Content slips the checks caught in the Year 6 build, so put them in every brief:

- Prompts must be unique within each pool (facts, sorts, structures,
  enquiries); a run of five must not repeat a task.
- The US-spelling check flags "meter" even for an instrument; say "sensor".
- An order task needs one defensible order; drop steps whose order is a matter
  of taste.
- A sort's cards must fit its prompt's starting point. "Start with one bulb"
  cannot include "remove the second bulb".

### Adding another subject to a registered year

A year that already has a subject needs no year-list changes. For Year 6, a
further subject needs:

- its dataset and registry entry, with `countsTowardYear: false` until Year 6
  Maths, English and Science all exist;
- certificate lines and the public guide;
- its permanent IDs in `curriculumIds.test.js`;
- the counts that list every pathway: the guide totals in
  `shared/curriculumGuides.test.js`, the Year 6 subjects in
  `tests/components/curriculumSelect.test.jsx` and `subjectsForYear(6)` in
  `src/data/signupFlow.test.js`.

Tests that need a year with no curriculum use Year 7.

## Find just enough context

```sh
npm run topic:context -- --year N --subject SUBJECT --topic TOPICID
```

Use the output's exact registry entry, statutory mapping and file paths. Read the mapping row and its referenced requirement before writing questions. `docs/curriculum/` is the teaching boundary; preserve statutory text verbatim. Read one nearby bank/game, its wrappers, lesson and playthrough test. The matching `.claude/skills/` guide supplies implementation details; the whole project knowledge file is not required for an ordinary topic.

For a new year/subject, register its dataset and statutory mapping first using `add-curriculum-year`. Choose permanent titles/IDs before shipping. Titles-derived IDs are URL and progress keys; later renames require a migration. Set unfinished new curricula to `countsTowardYear: false` explicitly: adding content must not silently change year-award membership.

## Make a compact brief and a pilot

Copy [the topic brief](superpowers/templates/topic-brief.md), or use the scaffold's generated brief. Record the exact requirement, exclusions, four learning slots, misconceptions, interaction recipe and evidence needed. For a whole course, use [the course build record](superpowers/templates/course-build.md) and start with one representative topic.

Read the [visual recipes](VISUAL_RECIPES.md) and the built-year renderers listed by `topic:context`. Use the existing subject's illustrated Bix introduction/notes, separately authored worked examples and question models/manipulatives as the baseline. Specify these for all four slots in the brief. Preserve the visual representation between explanation and task; extend shared visual components where a new topic needs a missing model. Text-only assessments such as hidden dictation can be appropriate when justified by the learning goal.

Prefer the existing subject game, which also preserves diagrams, evidence, custom controls and answer checking. Supported data kinds live in `src/data/challenges/questionKinds.js`; rendering lives in `src/components/challenge/data/DataChallenge.jsx`. A content bank and a generic answer control alone do not reproduce the built courses' visual teaching.

The four slots usually progress from supported introduction through reduced support and whole-structure work to application. Use interactions that reveal understanding. Finish one representative slot, its lesson and playthrough first, then expand the proven recipe to all four. This is ordinary implementation work, not a new approval gate.

## Generate the skeleton where it fits

For an existing registered topic with a statutory mapping, preserve its subject game/visual frame:

```sh
npm run scaffold:topic -- --year N --subject SUBJECT --topic TOPICID --game src/path/to/SubjectGame.jsx
npm run scaffold:topic -- --year N --subject SUBJECT --topic TOPICID --game src/path/to/SubjectGame.jsx --write
```

Preview is the default; `--write` creates files without overwriting existing work. `--game` creates four wrappers and `docs/authoring/yearN-SUBJECT-TOPICID.md`, preserving the chosen renderer. Connect the game to the new topic's own banks; using an older game as a reference does not register new content.

For compatible Maths/English data interactions, omitting `--game` creates wrappers with `MathQuestionVisual`/`EnglishQuestionVisual` and pictured controls, a pure bank under `src/data/challenges/authored/yearN/SUBJECT/`, its test and the brief. The bank test deliberately fails until teaching content is completed. These shared fallbacks may return null; inspect the rendered representation and add missing authored visuals. Other subjects require `--game` so their illustrated notes/story/map/evidence frame is preserved. Generated files are a skeleton, not reviewed teaching.

To wrap an existing compatible Maths/English pure builder with those shared visuals:

```sh
npm run scaffold:topic -- --year N --subject SUBJECT --topic TOPICID --builder src/path/to/bank.js --export buildName
```

The supplied module must exist and export the function. This creates wrappers and a brief, not a bank/test. Review the preview before adding `--write`.

To preserve an existing subject's story screen, diagrams or adventure layout, wrap its game instead:

```sh
npm run scaffold:topic -- --year N --subject SUBJECT --topic TOPICID --game src/path/to/SubjectGame.jsx --topic-prop topicId
```

The game must have a default export accepting `level`, `onComplete` and the topic prop (`topicId` by default; use `--topic-prop topic` for games using `topic`). If its bank uses an internal key rather than the permanent curriculum ID, pass `--topic-key KEY` (for example Year 5 Maths uses `topic="place"` for `place-value-to-a-million`). This also creates wrappers and a brief only. Choose `--game` or `--builder`, not both. Verify the game supports the new topic in its own banks before shipping. Generic `--builder` scaffolds require arrays of shared-kind questions; story envelopes and custom answer/control models require `--game`. The generic scaffold cannot supply specialised maps, story cards, enquiry controls or figures automatically.

## Review content and prove behaviour

Review every variant: independently recompute answers, require one defensible answer, remove tied orderings and plausible alternative readings, check British spelling and age-appropriate ranges, and compare prompts with the visible drawing/evidence. Question pictures use visible givens or authored evidence, never hidden answers, hints or correct bin assignments; a worked introductory example is authored separately and may show its own solution. Preserve accessible labels, picture/card association, both themes and sound-off play. Wrong attempts must retry; hints should help without giving the answer. Bix's lesson must teach the same representation as its challenge. Shared builders should accept deterministic `rng` for tests and randomise once per mount in the game.

```sh
npm run check:topic -- --year N --subject SUBJECT --topic TOPICID
npm run check:course -- --year N --subject SUBJECT
npm run lint
npm test
npm run build
```

The topic check validates wrapper JSX, immediate relative imports and banks covered by its adapters. The course check applies it to every registered topic, continues after individual failures and exits nonzero if any fail. Both accept `--json` for complete machine-readable check results (context emits Markdown); `--seeds 50` selects the deterministic runs (1–1000). An unsupported adapter is a limitation, not a successful bank check; default validation exits nonzero. `--structure-only` deliberately narrows the check and reports that scope. For bespoke pure builders, context/topic checks also accept `--builder PATH --export NAME`. Keep subject-specific validators and tests where the generic checker cannot prove the interaction. Extend jsdom playthroughs for retry, hints where relevant, full completion and the `{ combos }` callback payload.

Current adapter gaps include Year 2–3 Maths, Year 3 English/Science and dictation's
memory-game response model. Use their subject-specific bank/playthrough suites;
`--structure-only` can check loader files but must not be reported as a bank pass.
Maths custom answer acceptance also needs its existing subject tests even when
common question structure passes. Do not replace a working interaction to make
it fit the generic checker.

Use browser automation only for gaps jsdom cannot show: real layout/overlap, drag, canvas, WebGL, maps or comparable rendering. Follow `AGENTS.md`: one batched pass across required viewports and both themes, at most one confirmation pass after fixes. If tooling is unavailable, complete automated checks and report the missing visual verification. Never change the app to work around unavailable AI tooling.

Production uses API + MongoDB; development defaults to the browser store unless built with `VITE_USE_API=true`. Use isolated test accounts and fixtures; never reset learner data. Read `curriculum-progress` before changing IDs, storage, completion, awards or access rules.

## Report the evidence honestly

Follow [build measurement](BUILD_MEASUREMENT.md) for timing and token
recording. The coordinating agent starts/resumes the scope's timer,
pauses when yielding, and stops after the requested work and verification finish.
Keep the timer ID in the course record; never reset an old measurement or sum
overlapping parent/subagent timers. Timing includes unpaused AI/tool/test waits,
does not infer tokens and is not content approval. Keep unavailable token counts
unknown, with their reporting gaps explicit.

Keep these statuses separate in the brief/course record:

| Status | Evidence |
|---|---|
| Implemented | Exact topics/slots/lessons delivered, plus unavailable scope |
| Technically validated | Commands/results, bank adapters, playthrough coverage and browser gaps |
| Content reviewed | Which variants and statutory boundaries were checked; reviewer and remaining uncertainty |
| Device reviewed | Actual viewports/themes/devices and interactions exercised |
| Owner/learner review | Decisions requiring product knowledge, or observed child experience |

Do all review and automation possible in the session. Remaining human work should be concrete: observe a child's comprehension, enjoyment and independence; try touch, speech/voices and ergonomics on physical devices; resolve product or teaching choices that available evidence cannot determine. Automated checks do not certify these experiences, and content review is not implied by lint passing.

Keep durable briefs, specs and evidence under `docs/authoring/` or `docs/superpowers/`. Disposable `.superpowers/` and `.sdd/` runtime logs are not durable project guidance. Update the current inventory/architecture references when scope or contracts change; keep `PROJECT_KNOWLEDGE.md` as the short entry point. Record delivered outcomes and verification in `CHANGELOG.md`, remove completed work from the upcoming-only `PROJECT_IDEAS.md`.
