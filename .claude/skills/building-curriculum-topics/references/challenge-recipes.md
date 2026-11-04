# Shared challenge recipes

Use [the visual recipes](visual-recipes.md) alongside this interaction reference.
The currently built years' illustrated lessons, subject frames, diagrams and
manipulatives are the baseline for future topics. Reuse their visual renderer
and interaction; a data bank is only the content layer.

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
Unit-test them with `node --test`; component tests (Vitest + jsdom) live in
`tests/components/`.

**An ambiguous dataset must answer `null`, not a guess.** Two rows on the same
count give "which has most?" two correct answers while the challenge accepts
one, so a correct learner is marked wrong. Make the generator return `null` for
a tie (see `mostPopular` / `sortByQuantity` in `statistics.js`) and check the
datasets against it — a tie that reaches the screen is invisible until a child
hits it.

**Distractors must be plausible near-misses** — one step short, one step long,
off-by-ones. Random numbers get eliminated without doing the maths. Never emit a
negative option for Year 2.

For a `build(level, rng)` recipe, build once for the current level with
`useMemo(() => build(level, Math.random), [level])`, and
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

## Or author the questions as data

A challenge whose interaction is one of the shared kinds needs no JSX of its
own. Return `{ kind, ...fields }` objects from the pure builder and render with
`src/components/challenge/data/DataChallenge.jsx`:

```jsx
export default function MyTopicChallenge2({ onComplete }) {
  return <DataChallenge level={2} build={buildMyTopic} titles={TITLES}
    renderVisual={question => <MyTopicVisual question={question} />}
    illustrate onComplete={onComplete} />;
}
```

Here `MyTopicVisual` is the appropriate maintained subject renderer. Prefer
wrapping the existing subject game when it also owns illustrated notes,
special controls or an answer checker. `illustrate` adds supported pictures to
choice/sort labels; it does not supply a teaching introduction or replace a
missing diagram. Built-in chart/clock/coins/fraction/place-value kinds already
draw their own visual controls.

The rules for each kind (starting response, when Check is ready, whether an
answer is right, what makes a question unfair) are in
`src/data/challenges/questionKinds.js`. Lint a bank in its unit test with
`assert.deepEqual(lintBuild(buildMyTopic, { titles: TITLES, year }), [])`: it
runs every level over 50 seeds and catches missing answers, duplicate or
equal-fraction options, ties, already-sorted orders, Year 2 negatives and US
spelling.

| kind | fields | answered by |
|---|---|---|
| `choice` | `options`, `answer`, `variant?` | ChoiceGrid |
| `number` | `answer`, `label?`, `maxDigits?` | NumberInput |
| `type` | `answer`, `spoken?`, `maxLength?`, `apostrophe?` | LetterInput |
| `build` | `tiles: [{id,label}]`, `answer`, `letters?`, `fixed?` | TileBuilder |
| `sort` | `bins: [{id,label}]`, `cards: [{id,label,bin}]` | SortBins |
| `order` | `items: [{id,label,value?}]` (start order), `answer: ids` | DragToOrder |
| `pick` | `tokens`, `answer: index`, `mode?`, `pickable?`, `hinted?` | WordPicker |
| `sequence` | `terms`, `gaps: indices`, `captions?`, `highlight?` | NumberLine + keypad |
| `chart` | `chart: {type: bar/pictogram/tally, rows, …}`, `answer`, `options?`, `ask?` | chart + options or keypad |
| `clock` | read: `time`, `answer`, `options?` · set: `time`, `start?`, `minuteStep?` | ClockFace (+ TimeSetter) |
| `coins` | count: `coins`, `answer` · make: `target` | coin row + keypad · CoinTray |
| `fraction` | read: `parts`, `shaded`, `answer`, `options?` · shade: `parts`, `answer` | FractionBar · FractionShadeBoard |
| `placeValue` | read: `blocks`, `answer`, `ask?` · build: `answer`, `exact?` | PlaceValueBlocks |

Every kind also takes `prompt`, `rule`, `passage`, `text`, `equation`,
`sentence` (one `___`), `hint` (after two misses; strikes one wrong `choice`
option) and `speak` (adds a 🔊 button). `**bold**` marks stressed words.


## Maths boundaries: examples, not a substitute for the mapping

Year 2 counts in 2s, 3s and 5s from 0; 10s may start anywhere. Its fraction scope is 1/3, 1/4, 2/4, 3/4 and 1/2; time is to five minutes. Check the exact money requirement before combining units. Read the current topic mapping and statutory notes before choosing ranges or representations.
