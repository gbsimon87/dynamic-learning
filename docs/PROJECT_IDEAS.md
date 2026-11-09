# 💡 Project Ideas — Learn with Bix

> **⚠️ AI-MAINTAINED DOCUMENT — UPCOMING WORK ONLY.**
> Keep only work that remains. Move delivered outcomes to
> [CHANGELOG.md](CHANGELOG.md); do not leave completed rows here.

**Last reviewed:** 2026-11-09

Before taking on a curriculum proposal, check the current scope in
[PROJECT_KNOWLEDGE.md](PROJECT_KNOWLEDGE.md) and
[CURRICULUM_INVENTORY.md](CURRICULUM_INVENTORY.md). Detailed delivery records
belong in [CHANGELOG.md](CHANGELOG.md), not in this file.

## Guardrails for future work

- Preserve learner progress. Anything involving persistence, rewards, attempts,
  completion or access must follow the `curriculum-progress` skill.
- Treat content accuracy, child/owner review and physical-device review as
  separate evidence. Passing automated checks alone does not close any of them.
- New curriculum content follows [AUTHORING.md](AUTHORING.md); new standalone
  games follow [SKILLS_AUTHORING.md](SKILLS_AUTHORING.md).
- Serve both account types where relevant, keep large touch targets and both
  themes, and retain a usable sound-off path.

## What 6–8 year olds enjoy

- **Doing, not reading:** one spoken sentence plus one clear thing to tap.
- **Wins in seconds:** short rounds and an early success.
- **A character who cares:** Bix responds to what the child just did.
- **Collecting and choosing:** earned, non-random choices such as stickers or
  outfits.
- **Silliness and surprise:** jokes, funny sounds and occasional novelty.
- **Showing a grown-up:** something to print, share or play together.
- **Hard limits:** no countdown pressure, loss of earned work, guilt prompts,
  gambling-like rewards or sales. Every idea must work with touch, mouse,
  keyboard and sound off.

## Status key

| Status | Meaning |
|---|---|
| 🟡 In progress | Useful follow-up work remains. |
| 🔵 Planned | Agreed next work, not started. |
| ⚪ Idea | Captured, not yet committed to. |

IDs are stable references, not a ranking. Gaps are intentional when completed
ideas are removed.

---

## 💡 Ideas

### Teacher tools: review and expansion

- Ask teachers to review the Year 3 Maths notes and each parent guide before
  publishing/indexing it; record each approved parent-guide slug in `REVIEWED`.
- Write teacher notes for further courses.
- Consider one shared year/subject topic-list component for the guides,
  briefings and planning picker.

### Teacher planning and playlists

Add teacher access and saved/reopened plans, then consider class pre-tests and
private school sharing. Review planning suggestions and resource mappings with
teachers before expanding them. Individual evidence and Bix pre-tests require
new records; completion totals cannot diagnose learning gaps. See the
[phased plan](superpowers/plans/2026-11-08-teacher-planning-playlists.md) and
[input limits](superpowers/2026-11-08-teacher-class-input.md).

### More teacher tools: everyday workload

Four proposals, each responsible for a different stage of a teacher's routine:
prepare pupil work, explain it to the class, respond to mistakes, and organise
the week's materials. Their value is a hypothesis to test with teachers.

| # | Feature | When the teacher uses it | Precise first version and output | Scope boundary | Status |
|---|---|---|---|---|---|
| 46 | **Printable practice builder** | Preparing independent work, a short starter or homework; rewriting questions and making answer sheets. | Teacher selects year, topics and question count; chooses optional worked examples and vocabulary support; swaps unsuitable questions; then prints a pupil sheet and separate checked answer key. Pilot with Year 3 Maths and question types that work on paper, including diagrams and space for working. | Owns pupil practice materials. Starters and homework are layouts within this tool; task adaptation is an option on the same sheet. Lesson sequencing stays in the planner. | ⚪ Idea |
| 48 | **Whole-class teaching display** | Preparing the explanation and worked example that pupils will see on the classroom screen. | Teacher selects a Bix worked example, edits its explanation and reveals one step at a time, then shows a related question with its answer hidden until requested. Use large diagrams and text; keep teacher notes separate from the projected view. Start with existing illustrated Maths examples. | Owns live modelling and explanation. It reuses the selected lesson's content; worksheet creation belongs to #46 and lesson planning stays in the planner. Full slide-deck generation is outside the first version. | ⚪ Idea |
| 51 | **Whole-class feedback sheet** | After looking through books, when the same mistake needs explaining to several pupils. | Teacher selects a topic and records up to three observed mistakes and one success. For supported misconceptions, offer an editable correction with a worked example and one follow-up question per mistake. Produce a single class feedback sheet with a separate answer key; accept teacher-written content where no reviewed explanation exists. | Owns feedback on work the teacher has already reviewed. The teacher supplies the findings; automatic marking, pupil diagnosis, general practice sheets and end-of-year report comments are outside this feature. | ⚪ Idea |
| 57 | **Weekly preparation checklist** | Before the week starts or when setting up tomorrow's lessons; checking what to photocopy, gather or book. | Add structured equipment and printing requirements to selected planner lessons. Teacher confirms missing requirements, quantities and preparation dates; combine repeated items while retaining their lesson/day references. Output one editable checklist with tick boxes and print quantities. | Extends the existing planner with materials logistics. It consumes lesson/resource requirements and never invents a lesson or creates its worksheets. Quantities and equipment must be confirmed by the teacher. | ⚪ Idea |

Build #46 first: it has the clearest recurring output and reuses Bix's question
content. Test whether teachers can produce a usable sheet with less preparation
and correction time than their usual method. Consider #48 next if teachers need
to demonstrate Bix models to a whole class. Validate demand for #51 and #57
before building them; the checklist also needs reliable resource metadata.

Keep quick checks within the planned assessment workflow, and intervention or
cover instructions within the lesson planner. Generic parent-message drafting
and group-rotation scheduling are omitted from this shortlist: establish demand
beyond teachers' existing tools before adding them. Retained IDs stay stable;
the gaps reflect consolidation.

### Other project ideas

| # | Future work | Outcome | Next scope / dependency | Status |
|---|---|---|---|---|
| 6 | **Migrate earlier English games to shared question data** | Earlier English challenges use the common formats and renderers without losing their teaching interactions. | Migrate `EnglishPracticeGame` only with side-by-side replay and regression evidence. | 🟡 In progress |
| 7 | **Accessibility and keyboard audit** | Every interaction can be played with keyboard or screen reader support, reduced motion and readable text in both themes. | Play every interaction end to end with keyboard and a screen reader; fix the findings. | ⚪ Idea |
| 8 | **Complete read-aloud coverage and device verification** | Children can hear remaining drag-and-build Maths tile lists, with reliable voice behaviour on phones and tablets. | Add the missing tile-list reading and test real-device voices. | 🟡 In progress |
| 9 | **Extend the grown-up progress report** | Grown-ups can see time spent and topics that need more practice. | First design a separate per-attempt recording path; decide whether a reset control is safe and what it includes. | 🟡 In progress |
| 10 | **Questions that adjust to the child** | Question difficulty adapts within the child’s year-group curriculum. | Depends on per-attempt recording from #9; define and test genuine difficulty controls before adapting. | ⚪ Idea |
| 11 | **Safeguarding and parental consent** | Sign-up and data handling meet the advice of a qualified reviewer. | Send the review brief, confirm hosting/supplier agreements, then implement the consent requirements. | 🟡 In progress |
| 12 | **Phonics and rhyming games** | Early readers practise sounds, rhymes and syllables. | Obtain suitable letter-sound recordings; browser speech is not a substitute for phonics audio. | ⚪ Idea |
| 13 | **Story Maker and Story Sequencer** | Children build a silly story or arrange picture cards into a sequence. | Reuse suitable Year 3 English material where appropriate. | ⚪ Idea |
| 14 | **Offline, installable app** | Shared-device/tablet users can play without a connection. | Agree a safe offline queue and merge rule before implementation so progress cannot be lost. | ⚪ Idea |
| 15 | **Geography quality review and next scope** | Geography content is reviewed on physical devices, with stronger practical coverage and future Years 5–6 depth. | Play Years 2 and 4 through in the app, review Years 1–4 on phones/tablets, replace secondary Year 4 sources, then agree the next scope. | 🟡 In progress |
| 17 | **Solar System meteor: physical-device test** | Meteor performance is measured on a real phone and tablet. | Record the measurements and any touch/performance findings. | 🟡 In progress |
| 20 | **More Skills games** | New free-play games give children more short, replayable practice. | Choose from Maths: Math Sentence Builder, Compare the Numbers, Math Maze, Clock Quiz, Skip Count Jump, Estimate It!, Magic Squares, Number Line Jump, Odd or Even Sort, Shape Sorter 3D, Pattern Play, Tally Marks Trainer or Math Bingo; English: Sentence Fixer, Word Picture Puzzle, Riddle Time, Emoji Sentences, Picture Vocabulary, Alphabet Adventure or Listening & Repeat; Geography: Country Puzzle. | ⚪ Idea |
| 24 | **Avatar wardrobe** | Children earn hats, glasses, capes or a pet for their avatar; nothing is sold. | Decide achievement-to-item unlocks and preserve existing rewards data. | ⚪ Idea |
| 25 | **Bix’s den** | Children decorate Bix’s room with earned topic objects that replay gentle revision facts. | Do after #24 establishes the unlocking model. | ⚪ Idea |
| 26 | **Boss rounds** | A friendly mixed-topic finale gives extra practice without time pressure or failure. | Design mixed-question selection and commission/create boss art. | ⚪ Idea |
| 27 | **Expand real-world missions** | Children can tick off an activity, have a grown-up confirm it and earn a mission sticker; more subjects can offer missions. | Keep mission awards separate from curriculum completion. | 🟡 In progress |
| 28 | **Teach the grown-up** | A child sets and marks a topic quiz for a grown-up, with Bix cheering them on. | Design the hand-over and marking flow. | ⚪ Idea |
| 29 | **Pass-and-play for two** | Two players take turns or cooperate on one device in Skills Mode. | Keep curriculum progress entirely out of this mode. | ⚪ Idea |
| 31 | **Science notebook and geography passport** | Topic cards and exploration stamps make a gentle collection/revision screen. | Design the collection, fact playback and earning rules. | ⚪ Idea |
| 32 | **Seasonal events** | Short themed packs such as Halloween counting, Advent puzzles or an Easter hunt leave permanent stickers. | Plan each pack at least a term ahead. | ⚪ Idea |
| 33 | **Story adventure** | Each year’s topic list becomes a light Bix storyline and map. | Scope the art and writing, then connect it to topic progress safely. | ⚪ Idea |
| 36 | **Privacy-safe analytics** | Learn where grown-ups and learners need help without tracking children. | After #11, configure a privacy-first analytics service with named events only and explicit consent rules. | 🟡 In progress |
| 38 | **Interactive review of English and Science** | Child-like playthroughs validate wrong answers, hints, saving, celebrations, touch, keyboard, themes and read-aloud. | Use disposable profiles and record owner/content/device evidence separately. | 🟡 In progress |
| 42 | **History quality review and award decisions** | History receives physical-device review and outstanding year-award inclusion decisions. | Review Years 2–4 on devices; decide Year 2 and Year 4 award membership without changing earned awards. | 🟡 In progress |
| 43 | **Secret Rule Zoo child playtest** | Observe 6–8 year olds using the rule-discovery activity and choose its next scope. | Decide whether to add two-feature rules or child-made creatures after the playtest. | 🟡 In progress |
| 44 | **Ocean Explorer: review and Phase 6** | Ocean facts, controls and performance are reviewed before travel expands to new areas. | Obtain owner fact review and physical-device evidence, then scope area travel. | 🟡 In progress |
| 45 | **Course-checker coverage for bespoke banks** | The course checker validates more question banks rather than only checking file structure. | Add adapters for Years 2–3 Maths, Year 3 English (including dictation), Year 3 Science and dictation in Years 1, 2, 4 and 5; reuse existing subject validators. | ⚪ Idea |

---

## 🎯 Suggested order

1. Get the safeguarding review started (#11); it determines what evidence and
   analytics are permitted.
2. Review current child-facing experiences on real devices and with assistive
   technology (#7, #8, #17, #38, #42, #44).
3. Improve authoring confidence before expanding content (#6, #45), then choose
   one new Skills game (#20).
4. Design per-attempt recording only after #11; it unlocks #9, #10 and #36.
5. Add engagement features in dependency order: #24 before #25; complete #8
   before #12 and #33; make an offline merge decision before #14.

---

## 🔧 Notes for builders

- **#6:** Start with [AUTHORING.md](AUTHORING.md). The question-kind rules are
  in `src/data/challenges/questionKinds.js`; `DataChallenge.jsx` renders them.
  Replay old and migrated challenges side by side before replacing the existing
  interaction.
- **#7:** Audit actual flows, not just event handlers. Include `TileBuilder`,
  `SortBins`, `PlaceValueBlocks`, `MeasureDrag`, `LetterInput` and `DragToOrder`.
- **#8:** Speech uses `src/utils/speech.js` and `SpeakButton`; Maths readings
  use `data/mathSpeech.js` and `components/challenge/readAloud.js`. Keep visible
  text and a sound-off route.
- **#9 / #10:** Attempt data must be recorded during a run in `ChallengeShell`
  or the game, in a store separate from completions. Read the
  `curriculum-progress` skill before any schema change or reset design.
- **#13:** `SettingsCharactersAndPlotGame.jsx` is reusable for story ordering;
  `stories.json` feeds only `SpeedReader`.
- **#14:** Offline progress needs a queue and a conflict rule compatible with
  the API store.
- **#15:** Use the statutory geography files in `docs/curriculum/` and the
  [Geography specs](geography-curriculum/README.md). Do not let standalone flag
  games substitute for locational, place or fieldwork requirements.
- **#20:** Start each game from `FreePlayShell` and follow the `add-skill-game`
  skill.
- **#24:** Model worn items as an additive rewards-schema change; retain every
  existing rewards field.
- **#27:** Keep mission awards independent of curriculum completions.
- **#36:** Use PostHog EU Cloud with a signed DPA, IP capture/autocapture/session
  replay off, and named events only. Never identify users by email or a child’s
  name; do not collect child activity without the consent outcome from #11.
- **#38:** Use the English and Science trackers, disposable profiles and real
  end-to-end playthroughs; an initial React render is not a playthrough.
