---
name: building-curriculum-topics
description: Use when building all four challenges for a Year 2+ Maths or Year 3+ English curriculum topic in the Dynamic Learning app - covers the shared challenge kit, the pure generator pattern, the computed file names the loader depends on, and how to verify a topic in the browser without clicking through it by hand.
---

# Building a Curriculum Topic

A topic is **4 challenge components** that escalate. Build them on the shared
kit in `src/components/challenge/` — never by copy-pasting an existing
challenge.

**REQUIRED BACKGROUND:** `add-curriculum-challenge` owns the path convention and
the `onComplete` contract. This skill assumes it.

## The kit

| Component | Use for |
|---|---|
| `ChallengeShell` | Always. Owns question index, feedback, the 1s success lock, and the single `onComplete()`. |
| `ChoiceGrid` | Pick one of N. |
| `NumberLine` | A sequence with blanks to fill. |
| `DragToOrder` | Arrange items into an order. Keyboard-operable (space, arrows, space). |
| `NumberInput` | Typed numeric answer. Pass `hideField` when the answer already shows elsewhere. |
| `PictogramChart`, `TallyChart`, `BlockDiagram`, `DataTable` | Read **or build** a chart. Pass the step/set callback and the same component becomes the construct half. |
| `SurveyTray` | An unsorted pile of things — data before anyone organised it. |

`challenge-kit.css` themes all of them from the `--light-*` / `--dark-*` tokens
in App.css. **Do not write per-challenge CSS for anything the kit already
styles** — that is how 140 files drift apart. Extend the kit instead.

Children report an attempt with `submit(isCorrect)`. The shell decides whether
to advance, so no challenge can complete early.

## Question data goes in a pure module

Put generators in `src/data/challenges/<topic>.js`: no React, and take `rng` as
a parameter so challenges randomise per mount while tests stay deterministic.
Unit-test them with `node --test` (the project has no component test runner).

**An ambiguous dataset must answer `null`, not a guess.** Two rows on the same
count give "which has most?" two correct answers while the challenge accepts
one, so a correct learner is marked wrong. Make the generator return `null` for
a tie (see `mostPopular` / `sortByQuantity` in `statistics.js`) and check the
datasets against it — a tie that reaches the screen is invisible until a child
hits it.

**Distractors must be plausible near-misses** — one step short, one step long,
off-by-ones. Random numbers get eliminated without doing the maths. Never emit a
negative option for Year 2.

Build questions once per mount with `useMemo(() => build(Math.random), [])`, and
key the inner component on the question index so typed state never carries over.

**A control that accumulates reports a STEP, never a total.** A `+` button that
hands back `value + 1` computed it from the render's props; two fast taps land
in one React batch and the second overwrites the first, so a tap is silently
lost. Emit `+1` / `-1`, apply it in the challenge with
`setState(prev => ...)`, and clamp there. `NumberInput` had this bug and so did
the first cut of `TallyChart`.

**Update state functionally, never from the prop.** Two taps land in the same
React batch, so `onChange(value + key)` makes the second overwrite the first —
a child double-tapping loses a digit. Write `onChange((prev) => prev + key)`.

## Name the files by computing, not by spelling

Getting this wrong fails **silently** — the learner sees "not yet available".

```bash
node -e '
const toKebab=(s)=>s.toLowerCase().replace(/[^a-z0-9\s-]/g,"").trim().replace(/\s+/g,"-");
const cap=(id)=>id.split("-").map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join("");
const name="<Topic Name From The Dataset>";
console.log(toKebab(name), cap(toKebab(name)));'
```

Category ids keep their dashes, so `"Number - Number and Place Value"` becomes
`number---number-and-place-value` — **three** dashes. Compute it; do not type it.

## Read the programme of study first

`docs/curriculum/year-<n>-<subject>.md` holds the statutory text verbatim, plus
a table mapping every topic in our dataset to the requirement it serves. Find
your topic's row before designing anything. It sets the **boundary** of the
topic, which is what stops a well-built challenge being off-spec:

- Year 2 counts in steps of 2, 3 and 5 **from 0**, but in 10s from any number.
- Year 2 fractions are 1/3, 1/4, 2/4, 3/4 and 1/2 — nothing else.
- Year 2 tells time to **five minutes**, not to the minute.
- Year 2 money problems stay within **one unit** — never mix pounds and pence.

The non-statutory "notes and guidance" are where the good question ideas live:
arrays and repeated addition, the 5 times table on a clock face, partitioning 23
as both 20 + 3 and 10 + 13, pictograms with one symbol standing for 2, 5 or 10.

## Design the four slots

1. Gentlest — the rule is stated and visually supported.
2. The rule must be inferred.
3. Whole-structure work (order, build, match), not one more term.
4. Applied — word problems, typed answers, nothing to eliminate.

Four multiple-choice screens is a weak topic. Vary the interaction. Keep Year 2
inside 100, short sentences, digits not number words.

## Verify without clicking 24 times

Dev server may be on 5174 if 5173 is taken. The URL is:

`/year/{year}/{subject}/problem/{categoryId}/{topicId}/{n}`

Curriculum routes are behind `RequireChild`, so a child profile must be
selected. The default store is localStorage, so no backend is needed.

Drive a whole challenge in one `browser_evaluate` call — read the question from
the DOM, compute the answer, click, wait past the 1s lock:

```js
async () => {
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  for (let q = 0; q < 6; q++) {
    /* read the prompt, compute the answer, click the right control */
    document.querySelector('.submit-btn').click();
    await sleep(1400);
  }
  return location.pathname; // '/curriculum/year/2/math' once complete
}
```

This also proves the generators: if the correct answer is ever missing from the
options, the loop reports it.

**Read the answer off the DRAWING, not the data.** Count the rendered symbols,
marks or blocks and work the answer out from those. A loop that reads the
challenge's own numbers only proves the challenge agrees with itself; one that
reads the picture proves the picture and the logic agree — which is the half no
unit test can reach.

Two things only a real render shows, both found this way:

* **The wording must identify what is being asked.** With nothing highlighted,
  "How many books read?" over columns labelled Mon/Tue/Wed has no answer at
  all. If your driver cannot tell which row a prompt means, neither can a
  seven-year-old. Have the driver match the prompt against the row labels and
  fail when it matches none or several.
* **The host page can restyle your buttons.** `ProblemView.css` used to
  carry `.problem-page button { margin-top: 1.5rem }`, which reached every
  button inside a challenge. It was removed in 1f588c4, but the kit still
  styles dense button rows with two classes (`.block-stack .block-slot`) and
  `margin-top: 0`, so a host rule like that can never come back and pull the
  layout apart. It is worth doing even when a topic "obviously"
works — the batching bug above was found this way and nothing else would have
caught it, because there is no component test runner.

## English topics (Year 3 onwards)

English follows the same four-slot pattern, with three differences.

**Questions come from authored banks, not arithmetic.** That makes "is there
exactly one right answer?" the main risk. Wrong options are chosen by hand
for each item, so they are clearly wrong. An option that "also fits" is left
out, never marked wrong ("Biscuit wagged his tail because Ellie came home" is
fine English, so "because" is not a wrong option there). Every bank holds at
least 3× a run (≥15 items, or ≥3 passages for a passage level). Tests check
the mechanics: one blank per sentence, a tapped word appearing exactly once,
quoted evidence appearing verbatim in its passage.

**Where things live.**

| What | Where |
|---|---|
| Statutory word lists, homophones, pattern examples (with our Year 3 / Year 4 split) | `src/data/english/appendix1.js`, tested word by word against `docs/curriculum/english-appendix-1-years-3-and-4.md` |
| The recurring cast and their pronouns | `src/data/english/cast.js` |
| Shared passages | `src/data/english/passages.js` (≤200 words, tested) |
| British-spelling, word and sentence checks for tests | `src/data/english/textChecks.js` |
| shuffle / sample / isSameAnswer / tokenise / bareWord | `src/data/challenges/english/shared.js` |
| One builder per topic | `src/data/challenges/english/<topic>.js` + `.test.js` |
| One game per topic, shared by its four challenge files | `src/pages/skills/english/challenges/year3/<Pascal>Game.jsx` |
| Year 4 equivalents | Builder `src/data/challenges/english/year4<CamelTopic>.js` (the `year4` prefix stops collisions with Year 3 modules such as `dictation.js`); game and challenges under `challenges/year4/` |

**The English kit** (in `src/components/challenge/`, styled in `english-kit.css`):

| Component | Use for |
|---|---|
| `LetterInput` | Spelling on a big a–z keyboard. Never the native field (autocorrect spells the word). `hideLine` when the letters already show in a sentence's blank. |
| `TileBuilder` | Build a word from letter tiles or a sentence from clause tiles. Tap to place, tap to take back. |
| `WordPicker` | Tap a word (`mode="word"`), a sentence (`variant="sentences"`), or a gap (`mode="gap"`; `innerGaps` when the first and last gaps can't be right). |
| `ReadingPassage` | A text with paragraphs, headings (`h`), poem lines (`line`), numbered steps (`item`) and `label`s; `highlight` for hints. |
| `SortBins` | Two or three labelled bins. Tap a card, then a bin. |
| `SpeakButton` | 🔊 tap to hear, in a British voice. Never automatic. Renders nothing without a voice, so no question may depend on it alone. |
| `HintNote` + `hints.js` | `ChallengeShell` passes `misses`. `showHint(misses)` is true after two misses. A hint narrows (strikes out a wrong option, underlines candidates, highlights the paragraph, shows `m _ _ _`) and never gives the answer, and never strikes when only two options remain. |

**House rules.** These were decided with the product owner on 2026-10-01:
- Five questions per challenge. A challenge built on one passage asks 3–4.
- Grammar terms come with a gloss in slots 1–3, "conjunction (joining word)",
  and slot 4 drops the gloss.
- Passages are original, use the cast, and are 2–3 sentences in slot 1 and
  up to ~200 words in slot 4.
- Emoji and CSS only.
- Composition is choice-and-build only. Nothing is free writing.
- British spelling, enforced by `findUsSpellings` in every bank's test.

**Verifying in the browser.** A driver can import a topic's bank from the
dev server, `await import('/src/data/challenges/english/<topic>.js')`, and
map what is ON SCREEN (the sentence, the meaning, the clue) back to its
answer. A prompt the driver cannot match is a prompt a child cannot answer
either. Always play two wrong answers on the first question, to see the hint
appear and confirm the question does not advance.

## Static checks that catch what a playthrough would

When a browser pass is not on the table, these are what stand in for it. Each
has caught a real bug in this project:

- **Ordering challenges must have no tied answers.** If two cards evaluate to
  the same number, several arrangements are correct but the validator accepts
  only one, so a learner who is right is told they are wrong. Evaluate every set
  and assert the values are distinct.
- **Every hand-written option list must contain its own answer**, or the
  question is unanswerable.
- **Recompute every word-problem answer** in a throwaway script rather than
  trusting the number typed in the data.
- **Re-derive the file name** with the loader's own `capitalizeTopicId` and
  check each file exists and has a `export default`.
- **A topic id starting with a digit** (`2-5-and-10-...` →
  `25And10MultiplicationTables`) is not a valid JS identifier. The FILE must
  still carry that name; give the function a different one and let the default
  export connect them.

**Confirm before claiming done:** a wrong answer retries without advancing; a
full run redirects to the curriculum page and increments the topic counter;
`npm run lint`, `npm test` and `npm run build` pass; and the topic is legible in
**both** themes.

## Finally

Update the table in `docs/PROJECT_KNOWLEDGE.md` §5. If an idea in
`docs/PROJECT_IDEAS.md` covered this work, **delete its row** — that file tracks
upcoming work only, and history belongs in `PROJECT_KNOWLEDGE.md`. A topic is
not done until the docs reflect it.
