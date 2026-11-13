# Curriculum authoring

Project workflow for Curriculum Mode, readable by any AI tool or developer. For
standalone Skills Mode games use [SKILLS_AUTHORING.md](SKILLS_AUTHORING.md).

The registry covers Years 1–6 and 12 subjects; check availability rather than
assuming a registered course has every challenge. All built challenges are open.
Completion tracks learning and awards; it does not gate access. For an existing
topic, use the scoped context command below. For a new course, complete
integration first: context/scaffold commands cannot invent an unregistered
dataset or its teaching boundary.

## New course integration

1. Use [the curriculum source index](curriculum/README.md) to select the saved
   statutory programme. Save missing programmes verbatim from the official DfE
   PDF with source/retrieval metadata. Map each proposed topic to the exact
   requirement and exclusions. Preserve the documented year split for key-stage
   subjects and relevant English spelling/grammar appendices.
2. Add a dataset following [Year 5 Science](../src/data/year5ScienceCurriculum.js)
   or the matching subject. Categories/topics need permanent IDs and four slots.
   Many datasets derive IDs from titles with
   [toKebabCase](../src/utils/toKebabCase.js), which deletes anything outside
   a–z and 0–9 ("Æthelred" becomes "thelred"): use plain English letters in
   titles and check the actual outputs. Keep shipped IDs unchanged. Add
   registry/ID tests rather than relying on a build to reveal mistakes.
3. Register the combination in [curriculumRegistry.js](../src/data/curriculumRegistry.js).
   Year lists there and in [childFields.js](../src/data/childFields.js) run to 6;
   a Year 7 needs both lists and the tests that use 7 as the unavailable year.
   A new subject also needs `CHILD_SUBJECTS` in step with `CURRICULUM_SUBJECTS`,
   selector look/tokens in
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
6. Set `countsTowardYear: false` for staged additions. Playability, completion
   and award inclusion are distinct; do not change earned year awards implicitly.
   Read the [progress contract](ARCHITECTURE.md#progress-stores-and-server)
   before ID/storage/award changes. Test legacy data, child/year/subject
   isolation and unavailable-module fallbacks alongside the new curriculum.

Register the dataset first, build topics in order and release a topic's four
wrappers together; add no placeholders. Use
[year5ScienceCurriculum.test.js](../src/data/year5ScienceCurriculum.test.js) and
[curriculumIds.test.js](../src/data/curriculumIds.test.js) as integration models.

### Counts and fixtures to update for another pathway

- its permanent IDs in `curriculumIds.test.js`;
- guide totals in `shared/curriculumGuides.test.js`, the year's subjects in
  `tests/components/curriculumSelect.test.jsx` and `subjectsForYear(N)` in
  `src/data/signupFlow.test.js`;
- public-guide assertions in `tests/components/curriculumGuides.test.jsx`
  (staged topics remain unavailable and the guide must say so);
- future-year recipe fixtures in `scripts/curriculum/authoring.test.js` when the
  new subject game becomes the newest reference, and per-year reading limits in
  `src/data/lessons/lintLessons.js` for a new lesson year.

Check each displayed quest name starts with a capital, including after a
Number/Geometry prefix. Use the subject's own bank contract and numeric/input
limits rather than copying another subject's defaults. Tests that need a year
with no curriculum use Year 7.

## Course builds with content agents

The coordinator integrates, pilots and reviews; content agents write banks.

1. **Start the course in a fresh session** with the
   [start prompt](templates/course-start-prompt.md).
2. **Integrate and pilot first** (coordinator): dataset, registry, wrappers,
   certificate lines, the visual renderer and any new figure types, the subject
   test, and one complete strand as the model. Give each strand its own bank
   file exporting `<strand>`, `<strand>Visuals` and `<strand>Rules`, merged by
   `index.js` and `figures.js`, as `src/data/challenges/year6Science/` does, so
   two agents never edit the same file (including tests and lessons).
3. **Brief at most two content agents** with the
   [strand agent brief](templates/strand-agent-brief.md): the model
   strand, exact topic IDs, statutory bullets with their line range, figure
   types, content rules and the test to run.
4. **Keep the coordinator's context small**: read files by line range, avoid
   printing whole files or long test logs, batch independent calls.
5. **Review what comes back** before the full suite: safeguarding-sensitive
   topics in full; facts each agent was unsure of; the answer-length cue (share
   of choice questions whose answer is clearly the longest option — around 30%
   is normal, far above needs rewording).
6. **Check new hand-drawn figures in one batched browser pass**: every new
   figure type on one static page, desktop and phone widths, both themes.

Put these in every brief:

- Prompts are unique within each pool; a run must not repeat a task.
- The US-spelling check flags "meter" even for an instrument; say "sensor".
- An order task needs one defensible order.
- A sort's cards must fit its prompt's starting point.

## Find just enough context

```sh
npm run topic:context -- --year N --subject SUBJECT --topic TOPICID
```

Use the output's exact registry entry, statutory mapping and file paths. Read
the mapping row and its requirement before writing questions; `docs/curriculum/`
is the teaching boundary. Read one nearby bank/game, its wrappers, lesson and
playthrough test, and the matching `.claude/skills/` guide.

## Brief and pilot

Copy [the topic brief](templates/topic-brief.md), or use the
scaffold's generated working brief. Record the requirement, exclusions, four
learning slots, misconceptions, interaction recipe and evidence needed.

Read the [visual recipes](VISUAL_RECIPES.md) and the built-year renderers listed
by `topic:context`. Use the subject's illustrated Bix introduction/notes,
separately authored worked examples and question models/manipulatives as the
baseline for all four slots. Prefer the existing subject game: it preserves
diagrams, evidence, custom controls and answer checking. Supported data kinds
live in `src/data/challenges/questionKinds.js`; rendering in
`src/components/challenge/data/DataChallenge.jsx`.

Slots usually progress from supported introduction through reduced support and
whole-structure work to application. Finish one representative slot, its lesson
and playthrough first, then expand to all four.

## Generate the skeleton

```sh
npm run scaffold:topic -- --year N --subject SUBJECT --topic TOPICID --game src/path/to/SubjectGame.jsx
npm run scaffold:topic -- --year N --subject SUBJECT --topic TOPICID --game src/path/to/SubjectGame.jsx --write
```

Preview is the default; `--write` creates files without overwriting. Every
scaffold writes a working brief to `.superpowers/topic-briefs/` (gitignored).

- `--game` creates four wrappers around the subject game. The game must
  default-export a component accepting `level`, `onComplete` and the topic prop
  (`--topic-prop topic` if it uses `topic`; `--topic-key KEY` if its bank uses an
  internal key, e.g. Year 5 Maths `place` for `place-value-to-a-million`).
- Omitting `--game` (Maths/English only) creates wrappers with
  `MathQuestionVisual`/`EnglishQuestionVisual`, a pure bank under
  `src/data/challenges/authored/yearN/SUBJECT/` and a test that fails until
  content is written. Those visual fallbacks may return null: add authored
  visuals where needed.
- `--builder PATH --export NAME` wraps an existing Maths/English pure builder.
  Choose `--game` or `--builder`, not both.

Other subjects require `--game` so their notes/story/map/evidence frame is
preserved. Generated files are a skeleton, not reviewed teaching.

## Review content

Review every variant: recompute answers, require one defensible answer, remove
tied orderings and alternative readings, check British spelling and
age-appropriate ranges, and compare prompts with the visible drawing/evidence.
Question pictures use visible givens or authored evidence, never hidden answers,
hints or correct bin assignments; a worked example is authored separately and may
show its solution. Wrong attempts retry; hints help without giving the answer.
Bix's lesson teaches the same representation as its challenge. Builders accept a
deterministic `rng` and randomise once per mount.

**Learner language** (every learner-facing string in all four slots and every
generated branch: titles, prompts, options, clues, hints, feedback, glosses,
`speak` text, captions, sort labels): short sentences of about 12 words or fewer,
one idea each; explicit actions ("Tap…", "Sort…"); British English. Keep the
statutory demand and explain necessary vocabulary once rather than removing it.
No double negatives or meta language ("supplied", "authored", "not graded").
Options are similar in length and grammar with one clearly correct answer.
`speak` matches the visible words. Maths "Read it to me" reads the screen
(`src/components/challenge/readAloud.js`): it lists drag cards and build tiles
for you, but mark any live preview of the child's arrangement
`data-read-aloud="skip"`. A clue card before a question reads as a fact
and the question stands alone. A wording pass never changes IDs, answer logic,
counts or progress.

Subject accuracy:

- **Geography:** seven continents including Antarctica (Skills `MapGame` uses
  Oceania and omits Antarctica). The UK, Great Britain and England are distinct;
  Russia spans Europe and Asia. Avoid disputed-boundary questions. Name the
  county convention used. Time zones use dated UTC offsets. Grid references read
  eastings then northings; OS grid is not latitude/longitude. Show similarities
  as well as contrasts between places; avoid stereotypes; draw natural hazards
  calmly. Fieldwork cards are optional grown-up activities that never gate
  completion or collect an address, school, GPS or photo.
- **History:** name hard things plainly in one short sentence, with no gore and
  no remains beyond wrapped mummies, coffins and masks. Use "how do we know?"
  framing, never mock the past, and say plainly where a figure hurt others. Use
  the dates schools teach; say "about" where historians disagree. Every topic
  lists reputable `references`.
- Practice data is labelled "example data"; facts need dated sources.

## Prove behaviour

Follow [validation](VALIDATION.md). During development lint affected files, run
the relevant bank/playthrough and integration tests, and the checker:

```sh
npm run check:topic -- --year N --subject SUBJECT --topic TOPICID
npm run check:course -- --year N --subject SUBJECT
```

The topic check validates wrapper JSX, immediate relative imports and banks
covered by its adapters; the course check runs it for every registered topic.
Both accept `--json`, `--seeds N` (1–1000) and, for bespoke builders,
`--builder PATH --export NAME`. An unsupported adapter is a limitation, not a
pass; `--structure-only` narrows the check and must not be reported as a bank
pass. Years 2–3 Maths, Year 3 English/Science and dictation use their own
question shapes: `scripts/curriculum/bespokeBanks.js` registers each topic's
pure builder (a test keeps it in step with the wrappers) and checks replay,
question count, readable text, UK spelling, Year 2 negatives and like-for-like
answers among options. Keep builders in `src/data/challenges/`, not inside a
wrapper. Their answer acceptance and shape-specific rules still need the
builder's own test, as do Maths custom answers. Do not replace a working interaction to
fit the checker. Extend jsdom playthroughs for retry, hints, full completion and
the `{ combos }` payload.

**Curriculum journey content.** Every built topic needs a purpose introduction
and at least three quiz candidates, and every quest/subject an introduction.
After building challenge files:

```sh
npm run journey:brief -- --year N --subject SUBJECT     # IDs, mapping rows, lesson titles
npm run journey:manifest -- --write
npm run check:journey -- --year N --subject SUBJECT
```

Follow [the journey authoring guide](JOURNEY_AUTHORING.md).
The checker does not check facts or answers.

Use browser automation only for what jsdom cannot show, as `AGENTS.md` says.
Use isolated test accounts and fixtures; never reset learner data.

## Report evidence honestly

Report these separately:

| Status | Evidence |
|---|---|
| Implemented | Exact topics/slots/lessons delivered, plus unavailable scope |
| Technically validated | Commands/results, bank adapters, playthrough coverage and browser gaps |
| Content reviewed | Variants and statutory boundaries checked; reviewer and remaining uncertainty |
| Device reviewed | Viewports/themes/devices and interactions exercised |
| Owner/learner review | Product decisions, or observed child experience |

Automated checks do not certify a child's comprehension, enjoyment or physical
device use. When scope or contracts change, update
[CURRICULUM_INVENTORY.md](CURRICULUM_INVENTORY.md) and the affected reference;
remove finished items from [PROJECT_IDEAS.md](PROJECT_IDEAS.md).
