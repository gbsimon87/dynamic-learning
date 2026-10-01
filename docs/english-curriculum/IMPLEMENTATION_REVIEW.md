# Years 3–4 English completion review

**2026-10-01 · `feat/english-year-3-and-4`**

Both approved datasets are implemented: **65 topics, 260 challenge slots**.
The current working tree includes the earlier uncommitted work and the completion
changes. The tracker distinguishes implementation from interactive verification.

## What was completed

Year 3 now has the missing wrappers for Adding Prefixes; The Prefixes Super,
Anti and Auto; The Suffixes ation and ly; Doubling Before a Suffix; A or An;
and Word Families. Poetry Forms and Words That Spark the Imagination now have
question banks; Kinds of Writing and those two banks have additional checks.
Dictionary ordering, spelling tiles and prediction pairing use bounded selection
instead of retrying random choices indefinitely.

Year 4 has a bank, game, four challenge files and tests for every approved topic.
The common spelling progression is supported choice → contextual spelling sort → letter
building → spelling in context. More Homophones sorts **sentences by whether the
word fits**, because another real homophone is not a spelling error.

Grammar and sentence composition use supported choice → sorting → building a
missing phrase → contextual completion. Plural possession sorting includes the
ownership context. Fronted Adverbials distinguishes time, place and manner;
Commas after Fronted Adverbials concentrates on comma placement.

Reading topics use three original passage sets per topic, with 3–4 questions on
one passage per run: short supported extracts → grouping details → tapping
specific evidence → understanding the whole text. Poems retain line breaks and
instructions/letters have their actual presentation. Poetry descriptions explain
that narrative and rhyming forms can overlap.

Proofreading Longer Texts has three coherent passages with four authored errors
per passage. Dictation has 18 Year 4 sentences and reuses the existing
listen/look-cover-write interface. Building includes separate punctuation tiles
for commas and inverted commas; duplicate word tiles are interchangeable.

## Source and content boundaries

The statutory curriculum files and the permanent topic/category identifiers were
preserved. `appendix1.js` now also records the Year 4 pattern examples. Tests
check every example against the saved appendix and its topic bank, and check the
entire Year 4 word list and homophone split.

The three traditional texts are original short retellings, framed as myths and
tales rather than factual accounts. Their public-domain sources are recorded
in the bank:

- [Old Greek Stories, James Baldwin](https://www.gutenberg.org/cache/epub/11582/pg11582-images.html): Icarus and Daedalus.
- [In the Days of Giants, Abbie Farwell Brown](https://www.gutenberg.org/cache/epub/44622/pg44622-images.html): Thor’s missing hammer.
- [West African Folk-Tales, William H. Barker and Cecilia Sinclair](https://www.gutenberg.org/cache/epub/66923/pg66923-images.html): Anansi’s wisdom pot.

The remaining prose and poems were authored for the app using its recurring cast.

## Checks completed

- ESLint passes.
- Node tests: **1016 pass, 1 pre-existing skip**, no failures.
- Production build passes; Vite still reports the existing large main bundle.
- `node scripts/checkEnglishChallenges.js`: all **260** components load and produce the challenge shell, question progress
  and Check control through Vite and React rendering without speech support.
- A permanent coverage test derives all filenames from the approved datasets,
  preventing missing wrappers from passing the test suite unnoticed.
- Year 4 banks exercise all four levels across 30 seeds plus constant RNGs.
  Tests check option uniqueness, correct answers, sufficient letter/word tiles,
  unique sorting cards, evidence, British spelling and passage length.
- Regression tests exercise the three formerly unbounded Year 3 generators.
- Dictation tests reconstruct punctuation and prove that complete tile answers
  pass while partial answers fail.

## Interactive verification still required

Browser controls were unavailable in the completion session. React rendering is
an initial-render check, not a browser playthrough. The four committed Year 3
pilots retain their earlier browser checks. For the other topics, still check:

1. Two wrong attempts stay on the same question and reveal a narrowing hint.
2. Correct runs finish once, save the numeric challenge id and show celebration.
3. Both themes, keyboard input and 375px layout work without horizontal overflow.
4. Speech, mute and visual dictation fallback work on a real device.

Use the tracker’s existing seed/development instructions for this review.
Do not seed over a browser containing a learner’s irreplaceable progress.

For Year 4, import `/src/data/challenges/english/year4<PascalTopic>.js` in the dev
browser and match the displayed sentence or passage title against `BANK`.
`EnglishPracticeGame` uses `.english-focus`, `.challenge-prompt`, `.choice-btn`,
`.tile-tray-slot` and `.letter-input-key`; sorting uses the shared `SortBins`.
Reading uses `ReadingTopicGame` and the shared WordPicker; its evidence answer is
the index of the bank’s exact `questions[n].evidence` in `set.evidence`.
Dictation uses `.dictation-look`, `.dictation-btn` and the existing tile/letter
controls. The final rendered phrase and punctuation should determine the answer;
the bank is a way to locate it, not a substitute for checking what the UI shows.

The follow-up [bug/security review](BUG_SECURITY_REVIEW.md) records the fixes,
remaining backend risks and the scope of automated verification.
