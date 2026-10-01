# Plan: Year 3 & 4 English in Curriculum Mode

> The plan approved on 2026-10-01, kept as written. **Live status, and what
> changed since the plan was written, is in
> [IMPLEMENTATION_TRACKER.md](IMPLEMENTATION_TRACKER.md).**

## Context

Curriculum Mode only has Maths (Years 2 and 3). We want English for Years 3 and 4,
built from `docs/curriculum/year-3-and-4-english.md` the same way Maths is built:
a dataset of categories → topics → 4 challenges, pure question modules that are
unit-tested, and challenge components on the shared kit.

English differs from Maths in four ways that shape this plan:
- **One programme of study covers two years.** Appendix 2 splits grammar by year;
  the reading, spelling and composition bullets are shared.
- **Spelling depends on English Appendix 1**, which is not saved in the repo.
- **Questions come from authored banks** (word lists, sentences, passages) rather
  than arithmetic, so "is there exactly one right answer?" is the main risk.
- **The kit has no word or letter input.** Everything there is for numbers.

### Decisions made (with the user)
| Question | Decision |
|---|---|
| Year structure | Two datasets, `year3EnglishCurriculum` and `year4EnglishCurriculum`. **Build Year 3 first.** Year 4 also means adding Year 4 to the app. |
| Strands the app can't assess (handwriting, performance, discussion, reading aloud to a class) | No topics. Record them as gaps in the mapping doc. |
| Audio | Browser speech synthesis where it helps: dictation, homophones, an optional "read to me" on passages and prompts. Works without it when a device has no voice. |
| Spelling input | Letter or word tiles in the easier slots; a large in-app letter keyboard in the harder ones. Never the native text field. |
| Appendix 1 | Fetch it from gov.uk and save the Years 3–4 section verbatim. |
| Passages | Original texts written for the app. |
| Year award | Fix it first: a year is finished only when every registered subject is. |
| Granularity | About 30 topics, roughly one per assessable bullet. |
| Category order | Short categories, alternating between strands. |
| Rollout | One pilot topic per strand, reviewed with the user in the browser, then the rest category by category. |
| Questions per challenge | 5. A passage challenge asks 3–4 questions about one text. |
| Passage length | Grows by slot: 2–3 sentences in slot 1, up to about 200 words in slot 4. Must fit a phone screen with little scrolling. |
| Variety | Each play draws from a bank about 3× the size needed, with options shuffled. |
| Visuals | Emoji picture clues, highlights and CSS only. No image files. |
| Wrong answers | Retry as Maths does. After 2 misses on the same question, show a hint (highlight the tricky part, play the word again, or strike out a wrong option). Never show the answer. |
| Grammar terms | The statutory term plus a friendly gloss, e.g. "conjunction (joining word)". Slot 4 drops the gloss. |
| Composition | Only choices and building, all of it markable. No free writing. |
| Read aloud | 🔊 buttons on prompts and passages. Nothing plays automatically. |
| Characters | A recurring cast of 4–5 diverse children and a pet, with Bix appearing now and then. |
| Content review | The user reviews by playing in the browser. No separate review of the banks. |
| Year 4 before its Maths exists | Year 4 appears in the picker with English available; the Maths card shows "Coming soon". |
| Skills Mode | Curriculum Mode only. |
| Topic list sign-off | Revise the draft after the Appendix 1 check, show it in the mapping doc, and get the user's approval **before** the dataset ships. |
| Pilots | Homophones, Conjunctions, Characters' Feelings, Paragraphs. |
| Git | Work on the current branch `feat/english-year-3-and-4` in separate commits (the year-award fix in a commit of its own). No PRs. The user merges into `dev`. |
| Hints and rewards | A hint changes nothing the child earns: XP, completion and the stored data stay the same. |

---

## Phase 0: Source material (docs only)

1. **Add a header to `docs/curriculum/year-3-and-4-english.md`.** It needs the
   source URL, retrieval date, status and licence (match `year-2-english.md`).
   Leave the statutory text verbatim.
2. **Save Appendix 1 (spelling), Years 3–4 section** as
   `docs/curriculum/english-appendix-1-years-3-and-4.md`. Fetch it from gov.uk,
   keep it verbatim, and give it the same header. It holds the prefix and suffix
   rules, the sound spellings, the homophones table and the statutory word list.
3. **Add the mapping table** at the end of the programme-of-study file. It covers:
   - the Year 3 boundaries that are easy to overshoot (as in `year-3-maths.md`);
   - one row per topic, mapped to the statutory bullet it serves;
   - which items are taught in Year 3 and which in Year 4. The appendices say
     "Years 3 and 4", so we split them ourselves and write the split down;
   - **Not covered:** handwriting, performing poems and plays, discussion, reading
     aloud to a group, and planning by discussing.
4. Add both files to `docs/curriculum/README.md`.

## Phase 1: Groundwork in code

### 1a. Cross-subject year award (read the `curriculum-progress` skill first)
- Today `ProblemView.jsx` passes `isOnlySubjectInYear` to
  `getCompletionMilestones` (`src/data/completionMilestones.js`).
- Change it to `otherSubjectsComplete`, a boolean that `ProblemView` computes.
  It loads each other subject registered for that year with
  `store.getProgress(childId, year, subject)` and checks it with the existing
  `fullSubjectComplete` and that subject's `isBuilt`.
- Never guess: if a read fails, there is no year award.
- **No change to the stored shape, storage keys or unlock rules.** Badges already
  earned stay.
- One consequence: Year 3's award will need English built and finished too.
- Update `scripts/seedData.js`. Its comment at line ~114 assumes one subject per
  year.
- Tests: extend `completionMilestones.test.js` to cover two subjects, one
  subject, and a failed read.

### 1b. Register the dataset
- Create `src/data/year3EnglishCurriculum.js`, copying the shape of
  `year3MathCurriculum.js` (rawCurriculum, `toKebabCase` ids, icons, 4
  challenges per topic).
- Add `{ year: 3, subject: "english" }` to `CURRICULA` in
  `src/data/curriculumRegistry.js`.
- Add the new ids to `LOCKED_IDS` in `src/data/curriculumIds.test.js` **once the
  titles are final**, because titles are ids.
- Nothing else needs to change. `Challenge.jsx`, `challengeAvailability.js` and
  `scripts/seedBuilt.js` already find files by `skills/*/challenges/year*`. Each
  topic shows "Coming soon" until it is built.

### 1c. Shared speech helper
- Move `src/pages/skills/geography/narration.js` to `src/utils/speech.js` and
  update the geography imports.
- Respect the app's mute (`useSoundMuted`).
- Add a kit `SpeakButton` that hides itself when speech is not supported.

### 1d. New kit components (`src/components/challenge/`, styled in `challenge-kit.css` from the theme tokens)
| Component | Use |
|---|---|
| `TileBuilder` | Tap letter or word tiles into slots to build a word or sentence. Tap a placed tile to remove it. Works from the keyboard. |
| `LetterInput` | A large on-screen a–z keyboard with backspace, modelled on `NumberInput`. State updates are functional (`prev => prev + key`). |
| `WordPicker` | Tap a word, or a gap between words, in a sentence: the conjunction, the mistake, where the speech marks go. |
| `ReadingPassage` | A short text with a title, headings and paragraphs, plus an optional `SpeakButton`. |
| `SortBins` | Put cards into 2–3 labelled bins (a/an, -sure/-ture, past/present perfect). First check whether `CorrespondenceBoard` can be extended instead. |

**`ChallengeShell` hints.** Add a `misses` value (wrong attempts on the current
question) to the `render` arguments, and reset it when the question advances. A
challenge shows its own hint when `misses >= 2`. The shell keeps its existing
behaviour, so all 332 current challenges are unaffected, which a test checks.

`ChoiceGrid` and `DragToOrder` are reused as they are. Each new component
cancels the `.problem-page button` margin, as the topic-building skill warns.
Every touch target is at least 44px.

### 1e. Content and logic modules
- Question builders go in `src/data/challenges/english/<topic>.js`. They are pure,
  take `rng`, and have a `.test.js` next to them (`node --test` finds them).
- Shared banks go in `src/data/english/`: `appendix1.js` (word lists taken from
  the saved appendix), `homophones.js`, `cast.js` (the recurring characters:
  name, emoji, one-line personality) and `passages.js` (original texts as JS,
  each tagged with year, text type, word count and the skills it supports).
- Each builder returns 5 questions drawn from a bank of at least 15.
- Tests also check passage length (slot 1 has 3 sentences or fewer; slot 4 is
  200 words or fewer) and British spelling (a short list of US forms that must
  never appear).
- `src/data/challenges/english/answers.js` normalises answers: case, whitespace,
  and curly vs straight quotes.
- **Tests every bank must pass:**
  - each option list contains its answer exactly once;
  - distractors are distinct and plausible (same root, a common misspelling, the
    other homophone);
  - a sentence where more than one option fits returns `null` and is dropped,
    never shown;
  - every word comes from the saved Appendix 1 list for its year.

## Phase 2: Year 3 dataset (draft, ~32 topics)

Titles become permanent ids once shipped, so this list is reviewed in Phase 0
against Appendix 1 and frozen before 1b ships.

| # | Category | Topics |
|---|---|---|
| 1 | Spelling - Prefixes and Suffixes | Adding Prefixes · Super-, Anti- and Auto- · Adding -ly and -ation · Doubling Before a Suffix |
| 2 | Reading - Words and Meanings | Root Words · Exception Words · Using a Dictionary · Words in Context |
| 3 | Grammar - Words | A or An · Word Families |
| 4 | Reading - Stories | Does It Make Sense? · Characters' Feelings · Predicting What Happens Next · Fairy Stories, Myths and Legends |
| 5 | Spelling - Sounds and Homophones | The -sure and -ture Endings · Tricky Sounds y and ou · Homophones · Words Often Misspelt |
| 6 | Grammar - Sentences | Conjunctions · Time and Cause Words · The Present Perfect · Inverted Commas |
| 7 | Reading - Non-Fiction and Poetry | Finding Information · Asking Questions about a Text · Kinds of Writing · Words That Spark the Imagination · Poetry Forms |
| 8 | Writing - Composition | Paragraphs · Headings and Sub-headings · Settings, Characters and Plot · Proofreading · Dictation |

The Year 3 grammar terms (preposition, conjunction, word family, prefix, clause,
subordinate clause, direct speech, consonant, vowel, inverted commas) are taught
inside the topics that use them, not as a separate topic.

**The four challenges in a topic** follow the Maths pattern from the skill:
1. The rule is stated and shown, and the child chooses (`ChoiceGrid`).
2. The rule must be worked out (`SortBins`, or picking the odd one out).
3. Build the structure (`TileBuilder` for a word or sentence, `WordPicker`,
   `DragToOrder` for story events or paragraphs).
4. Apply it in context: a passage, typing with `LetterInput`, or dictation
   (listen, then build or type).

The four should use at least three different interactions.

**Example: Homophones**
1. Hear the word, pick its spelling, with a picture clue.
2. Sort the words into "sounds like *right*" and "sounds like *rain*".
3. Fix the wrong homophone in a sentence.
4. Hear a sentence, then type the missing homophone.

**Example: Characters' Feelings**
1. Read a short passage, then pick the feeling.
2. Pick the action that shows that feeling.
3. Tap the evidence in the text.
4. Answer across a longer passage.

## Phase 3: Pilot (one topic per strand), then review with the user

Build all four challenges for **Homophones**, **Conjunctions**,
**Characters' Feelings** and **Paragraphs**. Each topic gets its folder
`src/pages/skills/english/challenges/year3/<topicId>/<Pascal>Challenge{n}.jsx`,
with the name worked out by `toKebabCase` and `capitalizeTopicId`, never typed
by hand.

Where challenges are variations of one interaction, share a game component, as
`ColumnMethodGame.jsx` does. Review the four topics with the user in the browser,
then adjust the kit and patterns before scaling up.

## Phase 4: Rest of Year 3, category by category

Build in unlock order. For each category: build it, verify it in the browser,
update the §5 table in `docs/PROJECT_KNOWLEDGE.md`, and commit.

## Phase 5: Year 4 (outline; to be planned again in detail after Year 3)
- **Add Year 4 to the app:** `CURRICULUM_YEARS` and `CHILD_YEAR_GROUPS`
  (`src/data/childFields.js`), the year picker and the profile year buttons.
  Year 4 Maths shows as "Coming soon", as unavailable subjects do today.
  Check `resumeCandidates.js` and the server-side checks on year values.
- **`year4EnglishCurriculum.js`** covers:
  - the Year 4 half of the Appendix 1 split (-ous, -tion/-sion/-ssion/-cian,
    ch/sc/gue/que, ei/eigh/ey, the rest of the homophones and the word list);
  - the Year 4 Appendix 2 items: plural vs possessive -s, Standard English verb
    forms, expanded noun phrases, fronted adverbials and their commas, plural
    possessive apostrophes, full direct-speech punctuation, pronoun/noun
    cohesion, determiners, possessive pronouns;
  - harder comprehension: main ideas and summaries, how language, structure and
    presentation shape meaning, inferences justified with evidence.

## Docs to update as we go
- `docs/PROJECT_KNOWLEDGE.md`: §3 (new folders and kit components), §4.5 (the
  year award rule), §5 (built table).
- `docs/PROJECT_IDEAS.md`: delete row #16.
- `.claude/skills/building-curriculum-topics`: add an English section covering
  the banks, the ambiguity tests and the new kit components.

## Verification (every phase)
- `npm run lint`, `npm test` and `npm run build` pass.
- **Year award (1a):**
  - a seeded child with Year 3 Maths finished but English not finished does not
    get the year award;
  - with both finished, they do;
  - Year 2 behaves exactly as before;
  - existing Year 2 and Year 3 Maths progress still loads.
- **Each built topic,** driven in the browser with one `browser_evaluate` loop
  per challenge, as the skill describes:
  - the loop reads the answer from the rendered text, not the data;
  - a wrong answer retries;
  - a finished run increments the topic;
  - check light and dark themes, a 375px width, the keyboard path, and that
    "read to me" works muted and on a device with no voice.
- `VITE_UNLOCK_ALL=true` for reaching later categories during review.
