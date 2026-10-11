# Year 1 English — topic builder brief

**Status, 2026-10-11:** the course is complete (38 topics, 152 challenges).
This is the original assignment brief; its shared-tree worker restrictions
describe that build, rather than pending work. Current implementation and
verification are recorded in [PROJECT_KNOWLEDGE.md](../PROJECT_KNOWLEDGE.md).
Most banks now use `year1Practice.js`; the Alphabet pilot and custom dictation
retain their own builders.

Repo: /Users/simoncordova/Desktop/Simon/dynamic-learning (React + Vite learning app, children aged 5–6 for Year 1).
You are building the QUESTION BANKS for some Year 1 English topics. The dataset, registry,
challenge wrapper files and docs are handled by the lead — you write ONLY the files listed below.

## ⚠️ Shared working tree
Another AI is building Year 2 English in this same working tree right now, and the lead is
editing shared files. Therefore:
- Create/modify ONLY `src/data/challenges/english/year1<Pascal>.js` and `year1<Pascal>.test.js`
  for your own topics (plus anything explicitly listed in your assignment).
- Do NOT edit any other file (no shared helpers, kit components, registry, docs, package.json).
  If the kit genuinely lacks something you need, design around it and mention it in your report.
- Do NOT run git commands that change state (no add/commit/stash/checkout/reset).
- Run only your own tests: `node --test src/data/challenges/english/year1<Pascal>.test.js`
  and `npx eslint <your files>`. Don't "fix" failures in files that aren't yours.

## Read first
1. `docs/curriculum/year-1-english.md` (statutory Year 1 programme of study + Appendix 2 Year 1).
2. `docs/curriculum/english-appendix-1-year-1.md` (Year 1 spelling patterns, example words, common exception words).
3. `src/data/challenges/questionKinds.js` — the question kinds and their fields/validation (header comment + KINDS).
4. `src/components/challenge/data/DataChallenge.jsx` — how questions render.
5. The PILOT topic, which is your template:
   `src/data/challenges/english/year1TheAlphabet.js` and `year1TheAlphabet.test.js`.
6. `src/data/challenges/english/year1Checks.js` — `checkYear1Build`, which every test must call.
7. `src/data/english/cast.js` — the recurring cast (Amara she, Leo he, Priya she, Zayn he, Ellie she, Biscuit the dog he). Use them in sentences and stories.
8. `src/data/challenges/english/shared.js` — `shuffle`, `sample`, `tokenise`, `bareWord`.

## What each topic module must export
File `src/data/challenges/english/year1<Pascal>.js` where `<Pascal>` is given in your assignment.
- `export const TITLES = [4 strings]` — short child-friendly heading per challenge (≤ 7 words).
- `export function build<Pascal>(level, rng)` → array of question objects for level 1–4
  (throw on another level). Questions are plain data objects of the kinds in questionKinds.js:
  `choice`, `type`, `build`, `sort`, `order`, `pick` are the useful ones for English.
- Export the bank(s) too, so the test can check them.
- A header comment quoting the statutory bullet(s) the topic serves, and the plan for the 4 levels (as in the pilot).

Test `year1<Pascal>.test.js` must call `checkYear1Build(build<Pascal>, { titles: TITLES })`
(pass `minQuestions: 3` for a level built on one passage) and add topic-specific checks that
recompute answers from first principles (e.g. the word parts join to the word; the plural rule
gives the answer; every hand-written option list contains its answer exactly once; quoted
evidence appears in its passage; a sort card's bin matches the rule).

## Rules (house rules for this app — follow all)
- **Five questions per challenge.** A challenge built on one short passage asks 3–4.
- **Four escalating slots, varied interactions** (four multiple-choice screens is a weak topic):
  1. gentlest — the rule is stated (`rule` field) and visually supported;
  2. the rule must be inferred;
  3. whole-structure work: sort, order, build from tiles;
  4. applied — typed answer (`type`) or building, nothing to eliminate where possible.
- **Exactly one right answer.** Hand-pick wrong options per item so they're clearly wrong;
  an option that "also fits" is left out, never marked wrong. Distractors are plausible
  near-misses (common Year 1 misspellings: "rane", "trea", "nite"), not random.
- **Bank size ≥ 3× a run**: ≥ 15 items per item bank; ≥ 3 passages for any passage-based level.
- **Randomise through `rng` only**, via `sample`/`shuffle`. Builders must still return the
  required number of DISTINCT questions with a constant rng (`() => 0`, `() => 0.999`) —
  `checkYear1Build` tests this — so sample from banks, never loop until random picks differ.
- **Every question has `speak`** (the 🔊 button text; it never autoplays). It reads the
  question for a child who can't read it yet. When READING is the skill being tested
  (which word matches the picture, read this word, read the passage), `speak` must NOT read
  the answer or the options aloud — only the instruction. When SPELLING is the skill,
  speaking the word is right (a teacher would say it).
- **Answerable without sound.** Some devices have no voice; then the 🔊 button isn't shown.
  Every question must be solvable from the screen: use `picture` (one emoji) +
  `pictureLabel` (what it shows, for screen readers) and/or a `sentence` with `___`.
  Choose emoji that unambiguously show the word (🐱 cat, ⛵ boat). If no emoji is clear, give a
  sentence context instead.
- **Spelling (`type`) questions**: show picture + sentence with the blank, speak the word and the sentence.
  Never show the target word itself on screen.
- **Hints** (`hint`, shown after two misses) narrow without giving the answer: "It starts
  with **b**", "Listen for the sound at the end", "Look at the letters at the start". On a
  `choice` with > 2 options, the hint also strikes one wrong option automatically.
- **Year 1 language.** Prompts ≤ 14 words, sentences ≤ ~10 words, passages ≤ 80 words, all
  short, everyday, decodable where possible with Year 1 sounds and common exception words.
  Original text only. Emoji in text sparingly. `**bold**` stresses a word.
- **British spelling** (colour, favourite, mum, maths, grey). `findUsSpellings` is enforced.
- **Grammar terms for Year 1 pupils** are only: letter, capital letter, word, singular,
  plural, sentence, punctuation, full stop, question mark, exclamation mark. Gloss them in
  slots 1–3 ("plural (more than one)"); slot 4 drops the gloss. Do NOT use noun, verb,
  adjective, suffix, prefix, vowel, consonant, digraph in child-facing text (say "word",
  "doing word", "describing word", "ending", "the letters un at the start"). Exception:
  the topic Split Digraphs may say "split digraph" with a gloss ("two letters split by
  another letter, like a-e in cake").
- **Stay inside Year 1.** No Year 2 patterns: no changing y to i (babies), no doubling
  (running, hopped), no dropping e (hoping, nicer), no -ly/-ful/-ness/-ment, no -tion, no
  kn/wr/gn, no -dge, no possessive apostrophes, no commas in lists, no suffix on a word
  that changes its root. Year 1 suffixes are ONLY where the root doesn't change
  (helping, helped, helper, quicker, quickest, jumps, wishes).
- **No free writing.** Composition is choose-and-build only.
- Choice options that are whole sentences/phrases should set `variant: "wordy"`.
- `pick`: `tokens` (words with their punctuation), `answer` = index; use for "tap the word that…".
- `order`: `items` in STARTING order (never already correct), `answer` = ids in the right
  order; give `value` numbers when there is a numeric order; `direction: "vertical"` for sentences.
- `sort`: 2–3 bins, every bin used, card labels distinct.
- `build`: `tiles` [{id,label}], `answer`; `letters: true` for word building from letter tiles
  (tiles must not already spell the answer); for sentence tiles answer is labels joined by spaces.

## Report back
List the files you created, the test results (paste the tail), and anything you could not do
within the rules (e.g. a kit limitation), plus any judgement calls about the curriculum
boundary. Keep it short.
