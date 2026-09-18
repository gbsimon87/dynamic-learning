---
name: building-curriculum-topics
description: Use when building all four challenges for a Year 2+ Maths curriculum topic in the Dynamic Learning app - covers the shared challenge kit, the pure generator pattern, the computed file names the loader depends on, and how to verify a topic in the browser without clicking through it by hand.
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

`challenge-kit.css` themes all of them from the `--light-*` / `--dark-*` tokens
in App.css. **Do not write per-challenge CSS for anything the kit already
styles** — that is how 140 files drift apart. Extend the kit instead.

Children report an attempt with `submit(isCorrect)`. The shell decides whether
to advance, so no challenge can complete early.

## Question data goes in a pure module

Put generators in `src/data/challenges/<topic>.js`: no React, and take `rng` as
a parameter so challenges randomise per mount while tests stay deterministic.
Unit-test them with `node --test` (the project has no component test runner).

**Distractors must be plausible near-misses** — one step short, one step long,
off-by-ones. Random numbers get eliminated without doing the maths. Never emit a
negative option for Year 2.

Build questions once per mount with `useMemo(() => build(Math.random), [])`, and
key the inner component on the question index so typed state never carries over.

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
options, the loop reports it. It is worth doing even when a topic "obviously"
works — the batching bug above was found this way and nothing else would have
caught it, because there is no component test runner.

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

Update the table in `docs/PROJECT_KNOWLEDGE.md` §5 and idea #20 in
`docs/PROJECT_IDEAS.md`. A topic is not done until the docs reflect it.
