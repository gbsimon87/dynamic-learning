# Years 3 & 4 English: implementation tracker

**Start here to resume.** Branch: `feat/english-year-3-and-4` (the owner merges
into `dev`; no PRs). Last updated **2026-10-01**.

| Document | What it is |
|---|---|
| [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) | The approved plan and every product decision (the decisions table). |
| [TOPIC_BRIEF_YEAR3.md](TOPIC_BRIEF_YEAR3.md) / [TOPIC_BRIEF_YEAR4.md](TOPIC_BRIEF_YEAR4.md) | The self-contained brief for building a batch of topics: conventions, kit, rules, file names, tests, report format. |
| [../curriculum/year-3-and-4-english.md](../curriculum/year-3-and-4-english.md) | Statutory text, the Year 3 / Year 4 split of Appendix 1, the boundaries, and the approved topic lists with the bullet each topic serves. |
| [../curriculum/english-appendix-1-years-3-and-4.md](../curriculum/english-appendix-1-years-3-and-4.md) | Appendix 1 (spelling), verbatim. |
| `.claude/skills/building-curriculum-topics/SKILL.md` | The "English topics" section: the kit, house rules, how to verify. |

---

## Decisions made after the plan was written

- **Three Year 3 titles lost their hyphens** before shipping, so their ids stay
  clean: "The Prefixes Super, Anti and Auto", "The Suffixes ation and ly",
  "The sure and ture Endings". A test now rejects any topic id with a doubled
  or trailing dash.
- **Badges.** The old "Year hero" badge really fired when a *subject* was
  finished. It is now **Subject star** and keeps the stored id `year-hero`.
  A new **Year hero** (id `year-finisher`, unlocks 🦅) fires on the year
  milestone. There is no back-fill: no child had finished a year.
- **The year award** needs every subject registered for that year
  (`useOtherSubjectsProgress` + `allSubjectsComplete`). Year 3's award
  therefore needs Year 3 English to be built and finished too.
- **Year 4 exists in the app.** `CURRICULUM_YEARS` and `CHILD_YEAR_GROUPS`
  are now `[1, 2, 3, 4]`; Year 4 Maths shows "Coming soon".
- **The Year 4 topic list was approved** (33 topics); its ids are locked in
  `curriculumIds.test.js`.
- **Word list split:** Year 3 takes the first 50 entries, accident(ally) to
  important; Year 4 takes interest to woman/women.

## Done (committed)

| Commit | What |
|---|---|
| `9c4ceda`, `c00bfbe` | Appendix 1 saved; source header; Year 3 mapping, signed off |
| `6f0a181` | Year award needs every registered subject |
| `b8cb0d2` | Subject star / Year hero badges |
| `8a1d85f` | Year 3 English dataset registered, ids locked |
| `2c1b111` | Speech helper moved to `src/utils/speech.js` |
| `4ce0d15` | English kit: LetterInput, TileBuilder, WordPicker, ReadingPassage, SortBins, SpeakButton, HintNote, `misses` for hints |
| `8d020ec`, `d8301ec` | Pilots: Homophones, Conjunctions, Characters' Feelings, Paragraphs. Browser-verified (wrong-answer retry, hint after two misses, full run, topic celebration, phone width, dark theme) |
| `4f0e944` | Year 4 added to the app; Year 4 dataset and mapping |
| `2f9b209` | English strand icons and letter glyphs on the curriculum page; English section in the skill |

## Year 3: topic status

Legend: ✅ previously browser-verified pilot · 🧪 implemented, tested and React-rendered; **interactive browser review and commits pending**

All **32 topics / 128 challenges** now have builders, games and correctly
named challenge files. The resumed work completed six missing sets of challenge
wrappers and the missing Poetry Forms and Words That Spark the Imagination banks.
The four pilots retain their earlier browser verification; all other topics have
passed automated checks and a Vite/React render pass. Browser controls were not
available in the completion session, so those checks are not marked as done.

| # | Category | Topic | Status |
|---|---|---|---|
| 1 | Spelling - Prefixes and Suffixes | Adding Prefixes | 🧪 |
| 1 | | The Prefixes Super, Anti and Auto | 🧪 |
| 1 | | The Suffixes ation and ly | 🧪 |
| 1 | | Doubling Before a Suffix | 🧪 |
| 2 | Reading - Words and Meanings | Root Words | 🧪 |
| 2 | | Exception Words | 🧪 |
| 2 | | Using a Dictionary | 🧪 |
| 2 | | Words in Context | 🧪 |
| 3 | Grammar - Words | A or An | 🧪 |
| 3 | | Word Families | 🧪 |
| 4 | Reading - Stories | Does It Make Sense? | 🧪 |
| 4 | | Characters' Feelings | ✅ pilot |
| 4 | | Predicting What Happens Next | 🧪 |
| 4 | | Fairy Stories, Myths and Legends | 🧪 |
| 5 | Spelling - Sounds and Homophones | The sure and ture Endings | 🧪 |
| 5 | | Tricky Sounds y and ou | 🧪 |
| 5 | | Homophones | ✅ pilot |
| 5 | | Words Often Misspelt | 🧪 |
| 6 | Grammar - Sentences | Conjunctions | ✅ pilot |
| 6 | | Time and Cause Words | 🧪 |
| 6 | | The Present Perfect | 🧪 |
| 6 | | Inverted Commas | 🧪 |
| 7 | Reading - Non-Fiction and Poetry | Finding Information | 🧪 |
| 7 | | Asking Questions about a Text | 🧪 |
| 7 | | Kinds of Writing | 🧪 |
| 7 | | Words That Spark the Imagination | 🧪 |
| 7 | | Poetry Forms | 🧪 |
| 8 | Writing - Composition | Paragraphs | ✅ pilot |
| 8 | | Headings and Sub-headings | 🧪 |
| 8 | | Settings, Characters and Plot | 🧪 |
| 8 | | Proofreading | 🧪 |
| 8 | | Dictation | 🧪 |

## Year 4: topic status

All **33 topics / 132 challenges** are implemented. Builders are named
`year4<PascalTopic>.js`, with per-topic tests. Games and challenge wrappers live
in `src/pages/skills/english/challenges/year4/`.

| Topic | Status |
|---|---|
| The Prefixes il, im and ir | 🧪 |
| The Suffix ous | 🧪 |
| More ly Adverbs | 🧪 |
| Apostrophes for Plural Possession | 🧪 |
| Main Ideas and Summaries | 🧪 |
| Justifying Inferences | 🧪 |
| How Language Creates Meaning | 🧪 |
| How Structure and Presentation Help | 🧪 |
| Plural or Possessive | 🧪 |
| Standard English Verbs | 🧪 |
| Determiners | 🧪 |
| Expanded Noun Phrases | 🧪 |
| The shun Endings | 🧪 |
| The zhun Ending | 🧪 |
| The Endings gue and que | 🧪 |
| More Words Often Misspelt | 🧪 |
| Themes in Stories | 🧪 |
| Predicting from Clues | 🧪 |
| Myths and Legends from Around the World | 🧪 |
| Comparing Forms of Poetry | 🧪 |
| Fronted Adverbials | 🧪 |
| Commas after Fronted Adverbials | 🧪 |
| Punctuating Direct Speech | 🧪 |
| Pronouns and Possessive Pronouns | 🧪 |
| Greek and French ch | 🧪 |
| The Letters sc | 🧪 |
| The Sounds ei, eigh and ey | 🧪 |
| More Homophones | 🧪 |
| Paragraphs around a Theme | 🧪 |
| Nouns or Pronouns for Clarity | 🧪 |
| Editing for Consistency | 🧪 |
| Proofreading Longer Texts | 🧪 |
| Dictation | 🧪 |

## Completion checks (2026-10-01)

- `npm run lint`: passed.
- `npm test`: 987 passed, 1 pre-existing skip, no failures (988 total).
- `npm run build`: passed; the existing large main bundle warning remains.
- All **260** English challenge components loaded and rendered through Vite and
  React, with speech unavailable. This verifies component imports and initial
  render; it does **not** verify clicks, completion, layout or contrast.
- Coverage tests check every approved slot has its computed filename and passes
  `onComplete` through. Year 4 bank tests exercise all levels across 30 seeds
  and constant RNGs, check answer availability, tile multiplicity, evidence,
  British spelling and passage lengths.
- Appendix tests cover the entire Year 4 word list, homophone split and every
  example in its assigned spelling patterns.
- Three random retry loops in Year 3 builders were replaced with bounded
  selection, with regression tests for constant RNGs.
- **Still to review in a browser:** two wrong attempts and hint, complete runs,
  saved completion/celebrations, keyboard input, 375px layout and both themes.
  Existing work and the resumed additions remain in the working tree for review.

The implementation is complete; the remaining verification is interactive.
Read [IMPLEMENTATION_REVIEW.md](IMPLEMENTATION_REVIEW.md) for the shared patterns,
content notes and browser-driving details.

## Verifying (how every built topic was checked)

- Start the dev server with every built challenge unlocked:
  `VITE_UNLOCK_ALL=true npx vite --port 5199`.
- Load a child profile without a backend: run
  `env -u MONGODB_URI node scripts/seed.js`, which writes `dev-seed.json`
  only. Then in the browser console, load it into localStorage and set
  `dl.session` to a seeded child.
- Challenge URL: `/year/3/english/problem/<categoryId>/<topicId>/<n>`.
- In one `browser_evaluate` per challenge, import the topic's bank from the
  dev server (`await import('/src/data/challenges/english/<topic>.js')`), map
  what is on screen back to the answer, and:
  - play two wrong answers on question 1 (the hint appears, the question does
    not advance);
  - then play the run, which must end on the celebration;
  - then check `dl.progress` holds numeric challenge ids.
- Also check 375px width (no horizontal scroll), the dark theme, and
  `LetterInput` taps landing in one batch.

## Documentation

- `docs/PROJECT_KNOWLEDGE.md` §5 records both years as implemented.
- `docs/PROJECT_IDEAS.md` #16 now tracks only the remaining Year 1–2 English work.
- Optional: seed English progress in `scripts/seed.js`, which seeds Maths
  only today.
