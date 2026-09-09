# Speed Reader Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a spritz-style speed-reading game to Skills Mode under English & Words, where a story is displayed one word at a time at a chosen speed, followed by comprehension questions and a re-read-faster loop.

**Architecture:** A single page component owns a four-value `screen` state machine (`setup → reading → questions → finish`). All pacing maths lives in a pure, React-free module so it can be unit tested with the Node runtime. A stateful hook wraps that maths in a recursive-`setTimeout` scheduler with exactly one teardown path. The reading view renders inside a local, dumb overlay component that knows nothing about reading.

**Tech Stack:** React 19 (hooks only), react-router 7, plain co-located CSS, `node:test` + `node:assert/strict` for pure-logic tests (built into the runtime — no new dependencies).

**Spec:** [docs/superpowers/specs/2026-09-10-speed-reader-design.md](../specs/2026-09-10-speed-reader-design.md)

## Global Constraints

- **Audience is UK Year 2, 6–8 years old.** Large touch targets, legible type, no dense text.
- **No `localStorage` writes.** Skills Mode is deliberately untracked (`PROJECT_KNOWLEDGE.md` §1).
- **No new npm dependencies.** Tests use `node:test`, built into Node ≥ 18.
- **Plain CSS only**, co-located, one file per component. No CSS framework, no CSS-in-JS.
- **Both themes must render correctly.** Colours come from the tokens in `src/App.css`; new tokens get a `body.dark` override following the `--map-*` precedent.
- **Two registration points are mandatory** and must land in the same change: the route in `src/main.jsx` and the `<Link>` in `src/pages/skills/SkillsPage.jsx`. Missing the second makes the game invisible to learners.
- **Routes are flat and kebab-case.** This one is `/speed-reader`.
- **The pivot letter must never render below 24px.** `--light-accent` on the white panel measures 3.14:1, which passes WCAG AA for *large* text only. Small type would make it non-compliant.
- **`npm run lint` must pass** at the end of every task.
- Function components with default exports. No class components.

---

### Task 1: Route, page skeleton, and both registrations

Front-loads the registration rule that the `add-skill-game` skill warns about, so the game is reachable from `/skills` before any logic exists.

**Files:**
- Create: `src/pages/skills/english/SpeedReader.jsx`
- Create: `src/pages/skills/english/SpeedReader.css`
- Modify: `src/main.jsx` (import block `// === SKILLS: English ===`, route group `// === English Skills ===`)
- Modify: `src/pages/skills/SkillsPage.jsx` (the English & Words `.skills-links`)

**Interfaces:**
- Consumes: nothing.
- Produces: default export `SpeedReader` from `src/pages/skills/english/SpeedReader.jsx`, mounted at `/speed-reader`.

- [ ] **Step 1: Create the page skeleton**

`src/pages/skills/english/SpeedReader.jsx`:

```jsx
import "./SpeedReader.css";

function SpeedReader() {
  return (
    <div className="sr-page page">
      <h2 className="sr-title">⚡ Speed Reader</h2>
      <p className="sr-intro">
        Words flash one at a time. Keep your eyes still and read!
      </p>
    </div>
  );
}

export default SpeedReader;
```

- [ ] **Step 2: Create the stylesheet**

`src/pages/skills/english/SpeedReader.css`:

```css
.sr-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

.sr-title {
  font-size: 1.75rem;
}

.sr-intro {
  max-width: 34rem;
}
```

- [ ] **Step 3: Register the route**

In `src/main.jsx`, add to the `// === SKILLS: English ===` import block, after the `SightWordPop` import:

```jsx
import SpeedReader from "./pages/skills/english/SpeedReader";
```

And in the `// === English Skills ===` route group, after the `sight-word-pop` entry:

```jsx
      { path: "speed-reader", element: <SpeedReader /> },
```

- [ ] **Step 4: Register the link**

In `src/pages/skills/SkillsPage.jsx`, in the English & Words card's `.skills-links`, after the Sight Word Pop link:

```jsx
            <Link to="/speed-reader" className="skill-btn">Speed Reader</Link>
```

The card's `.skills-card-text` already ends "and more!", so it needs no edit.

- [ ] **Step 5: Verify in the browser**

Run: `npm run dev`

Check, in this order — step 4 is the one that catches the classic mistake:
1. `/speed-reader` renders the title and intro.
2. `/skills` shows a **Speed Reader** button in the English & Words card.
3. That button navigates to `/speed-reader`.
4. Toggle the theme on `/speed-reader`; text stays legible in both.

- [ ] **Step 6: Lint and commit**

```bash
npm run lint
git add src/pages/skills/english/SpeedReader.jsx src/pages/skills/english/SpeedReader.css src/main.jsx src/pages/skills/SkillsPage.jsx
git commit -m "feat: add Speed Reader page skeleton and register it in Skills Mode"
```

---

### Task 2: Pure timing module (TDD)

The only genuinely tricky logic in the feature, and the only part that can be tested without a browser. React-free by design so plain `node` can import it.

**Files:**
- Create: `src/hooks/spritzTiming.js`
- Test: `src/hooks/spritzTiming.test.js`
- Modify: `package.json` (add a `test` script — a script, not a dependency)

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `tokenize(text: string, chunkSize?: number) → Chunk[]` where
    `Chunk = { text: string, words: string[], longestWordChars: number, endsClause: boolean, endsSentence: boolean }`
  - `chunkDelay(chunk: Chunk, wpm: number, chunkSize?: number) → number` (milliseconds)
  - `pivotIndex(word: string) → number` (index into `word`)
  - `nextSpeed(wpm: number) → number`
  - Constants: `SPEED_PRESETS`, `WPM_MIN`, `WPM_MAX`, `MAX_WORDS`, `COUNTDOWN_MS`

- [ ] **Step 1: Add the test script**

In `package.json`, add to `scripts`:

```json
    "test": "node --test src/",
```

- [ ] **Step 2: Write the failing tests**

`src/hooks/spritzTiming.test.js`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import {
  tokenize,
  chunkDelay,
  pivotIndex,
  nextSpeed,
  MAX_WORDS,
  WPM_MAX,
} from "./spritzTiming.js";

test("tokenize splits on whitespace and drops empties", () => {
  const chunks = tokenize("  the   quick  fox ");
  assert.equal(chunks.length, 3);
  assert.deepEqual(chunks.map((c) => c.text), ["the", "quick", "fox"]);
});

test("tokenize returns an empty array for blank input", () => {
  assert.deepEqual(tokenize(""), []);
  assert.deepEqual(tokenize("   \n  "), []);
});

test("tokenize groups words by chunk size, last chunk may be short", () => {
  const chunks = tokenize("one two three four five", 2);
  assert.deepEqual(chunks.map((c) => c.text), ["one two", "three four", "five"]);
});

test("tokenize flags clause and sentence ends from the last word", () => {
  const [clause, sentence, plain] = tokenize("wait, stop! go");
  assert.equal(clause.endsClause, true);
  assert.equal(clause.endsSentence, false);
  assert.equal(sentence.endsSentence, true);
  assert.equal(sentence.endsClause, false);
  assert.equal(plain.endsClause, false);
  assert.equal(plain.endsSentence, false);
});

test("tokenize sees punctuation through a trailing quote", () => {
  const [chunk] = tokenize('"stop!"');
  assert.equal(chunk.endsSentence, true);
});

test("longestWordChars ignores punctuation and takes the longest word", () => {
  const [chunk] = tokenize("a magnificent, cat", 3);
  // "magnificent" is 11 letters; the comma must not count.
  assert.equal(chunk.longestWordChars, 11);
});

test("tokenize caps very long input at MAX_WORDS", () => {
  const chunks = tokenize(new Array(MAX_WORDS + 50).fill("word").join(" "));
  assert.equal(chunks.length, MAX_WORDS);
});

test("chunkDelay is one base delay for a short single word", () => {
  const [chunk] = tokenize("cat");
  // 60000 / 120 = 500ms per word, no stretch, no pause.
  assert.equal(chunkDelay(chunk, 120), 500);
});

test("chunkDelay stretches for words longer than six characters", () => {
  const [chunk] = tokenize("elephants"); // 9 chars -> 1 + 3 * 0.04 = 1.12
  assert.equal(chunkDelay(chunk, 120), 560);
});

test("chunkDelay caps the length stretch at 1.6x", () => {
  const [chunk] = tokenize("a".repeat(40));
  assert.equal(chunkDelay(chunk, 120), 800); // 500 * 1.6
});

test("chunkDelay adds half a base delay at a clause end", () => {
  const [chunk] = tokenize("wait,");
  assert.equal(chunkDelay(chunk, 120), 750); // 500 + 250
});

test("chunkDelay adds a full base delay at a sentence end", () => {
  const [chunk] = tokenize("stop.");
  assert.equal(chunkDelay(chunk, 120), 1000); // 500 + 500
});

test("chunkDelay scales with chunk size but does not double-count characters", () => {
  const [chunk] = tokenize("the elephants", 2);
  // base 500 * 2 words = 1000, stretched by the longest word only (1.12).
  assert.equal(chunkDelay(chunk, 120, 2), 1120);
});

test("pivotIndex follows the spritz length table", () => {
  assert.equal(pivotIndex("a"), 0);
  assert.equal(pivotIndex("cat"), 1);
  assert.equal(pivotIndex("dragon"), 2);
  assert.equal(pivotIndex("elephants"), 2);
  assert.equal(pivotIndex("magnificent"), 3);
  assert.equal(pivotIndex("extraordinarily"), 4);
});

test("pivotIndex stays inside the string it will index", () => {
  const word = "hi";
  assert.ok(pivotIndex(word) < word.length);
});

test("nextSpeed climbs to the next preset above the current speed", () => {
  assert.equal(nextSpeed(60), 100);
  assert.equal(nextSpeed(100), 150);
  assert.equal(nextSpeed(120), 150); // off-preset speeds round up to a preset
  assert.equal(nextSpeed(150), 200);
});

test("nextSpeed steps by 25 above the top preset and stops at the maximum", () => {
  assert.equal(nextSpeed(200), 225);
  assert.equal(nextSpeed(290), WPM_MAX);
  assert.equal(nextSpeed(WPM_MAX), WPM_MAX); // callers use this to hide "faster"
});
```

- [ ] **Step 3: Run the tests to verify they fail**

Run: `npm test`
Expected: FAIL — `Cannot find module`, because `spritzTiming.js` does not exist yet.

- [ ] **Step 4: Write the implementation**

`src/hooks/spritzTiming.js`:

```js
/**
 * Pure pacing maths for the Speed Reader game.
 *
 * Deliberately free of React imports so `node --test` can load it directly -
 * the project has no test framework (PROJECT_KNOWLEDGE.md §2) and this module
 * needs none.
 */

// --- Tunable pacing constants -------------------------------------------
const LENGTH_FREE_CHARS = 6;        // words up to this length get no extra time
const LENGTH_STRETCH_PER_CHAR = 0.04;
const LENGTH_STRETCH_MAX = 1.6;
const CLAUSE_PAUSE = 0.5;           // in multiples of one word's base delay
const SENTENCE_PAUSE = 1.0;

export const SPEED_PRESETS = [
  { id: "slow", emoji: "🐢", label: "Slow", wpm: 60 },
  { id: "steady", emoji: "🚶", label: "Steady", wpm: 100 },
  { id: "fast", emoji: "🐇", label: "Fast", wpm: 150 },
  { id: "super", emoji: "🚀", label: "Super", wpm: 200 },
];

export const WPM_MIN = 60;
export const WPM_MAX = 300;   // 5 words/sec. Text substitution is not a
                              // luminance flash, but there is no reason to go
                              // faster than a child can decode.
export const MAX_WORDS = 500; // cap on pasted text
export const COUNTDOWN_MS = 700;
const ABOVE_TOP_PRESET_STEP = 25;

// Trailing quotes and brackets must not hide the punctuation behind them.
const CLAUSE_END = /[,;:]["')\]]*$/;
const SENTENCE_END = /[.!?]["')\]]*$/;

/** Letter and digit count only - punctuation should not buy a word more time. */
const wordChars = (word) => word.replace(/[^\p{L}\p{N}]/gu, "").length;

const normalisedChunkSize = (chunkSize) => Math.max(1, Math.floor(chunkSize));

/**
 * Split text into display chunks, recording what each one needs for pacing.
 * Caps at MAX_WORDS so a pasted novel cannot lock a child into a 40-minute read.
 */
export function tokenize(text, chunkSize = 1) {
  const words = String(text ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, MAX_WORDS);

  const size = normalisedChunkSize(chunkSize);
  const chunks = [];

  for (let i = 0; i < words.length; i += size) {
    const group = words.slice(i, i + size);
    const last = group[group.length - 1];
    chunks.push({
      text: group.join(" "),
      words: group,
      // The hardest word gates recognition, so it alone sets the stretch.
      // Summing characters would double-count at chunkSize 2 or 3 and inflate
      // every multi-word delay.
      longestWordChars: Math.max(...group.map(wordChars)),
      endsClause: CLAUSE_END.test(last),
      endsSentence: SENTENCE_END.test(last),
    });
  }

  return chunks;
}

/** How long this chunk stays on screen, in milliseconds. */
export function chunkDelay(chunk, wpm, chunkSize = 1) {
  const base = 60000 / wpm;
  let delay = base * normalisedChunkSize(chunkSize);

  const over = Math.max(0, chunk.longestWordChars - LENGTH_FREE_CHARS);
  delay *= Math.min(LENGTH_STRETCH_MAX, 1 + over * LENGTH_STRETCH_PER_CHAR);

  if (chunk.endsClause) delay += base * CLAUSE_PAUSE;
  if (chunk.endsSentence) delay += base * SENTENCE_PAUSE;

  return delay;
}

/**
 * Optimal recognition point - the letter the eye should land on. Standard
 * spritz table, clamped so the result always indexes the string as displayed
 * (a leading quote makes the visible word longer than its letter count).
 */
export function pivotIndex(word) {
  const len = wordChars(word);
  let index;
  if (len <= 1) index = 0;
  else if (len <= 5) index = 1;
  else if (len <= 9) index = 2;
  else if (len <= 13) index = 3;
  else index = 4;
  return Math.min(index, Math.max(0, word.length - 1));
}

/**
 * The speed the "read it again, faster" button offers.
 *
 * The fine-tune slider means the current speed is often not on a preset, so
 * this targets the lowest preset strictly above it, then steps by 25 once past
 * the top preset. Returning the input unchanged means "already at the maximum" -
 * callers use that to relabel the button.
 */
export function nextSpeed(wpm) {
  const preset = SPEED_PRESETS.find((p) => p.wpm > wpm);
  if (preset) return preset.wpm;
  return Math.min(WPM_MAX, wpm + ABOVE_TOP_PRESET_STEP);
}
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS — 17 passing tests, 0 failing.

- [ ] **Step 6: Lint and commit**

```bash
npm run lint
git add src/hooks/spritzTiming.js src/hooks/spritzTiming.test.js package.json
git commit -m "feat: add pure spritz pacing maths with node:test coverage"
```

---

### Task 3: Story content and a shape test

**Files:**
- Create: `src/data/stories.json`
- Test: `src/data/stories.test.js`

**Interfaces:**
- Consumes: `MAX_WORDS` from `src/hooks/spritzTiming.js` (test only).
- Produces: default JSON export — an array of
  `{ id: string, title: string, emoji: string, band: "easy"|"medium"|"longer", text: string, questions: Array<{ q: string, options: string[], answer: number }> }`

- [ ] **Step 1: Write the failing shape test**

`src/data/stories.test.js`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import stories from "./stories.json" with { type: "json" };
import { tokenize } from "../hooks/spritzTiming.js";

const BANDS = ["easy", "medium", "longer"];
const WORD_RANGES = { easy: [25, 55], medium: [56, 95], longer: [96, 140] };

test("there are six stories, two per difficulty band", () => {
  assert.equal(stories.length, 6);
  for (const band of BANDS) {
    assert.equal(stories.filter((s) => s.band === band).length, 2, band);
  }
});

test("story ids are unique and kebab-case", () => {
  const ids = stories.map((s) => s.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.match(id, /^[a-z0-9]+(-[a-z0-9]+)*$/);
});

test("every story has a title, an emoji and text", () => {
  for (const s of stories) {
    assert.ok(s.title.length > 0, s.id);
    assert.ok(s.emoji.length > 0, s.id);
    assert.ok(s.text.trim().length > 0, s.id);
  }
});

test("word counts sit inside their advertised band", () => {
  for (const s of stories) {
    const count = tokenize(s.text).length;
    const [min, max] = WORD_RANGES[s.band];
    assert.ok(
      count >= min && count <= max,
      `${s.id} has ${count} words, outside ${s.band} range ${min}-${max}`
    );
  }
});

test("every story has three questions with in-range answers", () => {
  for (const s of stories) {
    assert.equal(s.questions.length, 3, s.id);
    for (const q of s.questions) {
      assert.ok(q.q.trim().length > 0, s.id);
      assert.equal(q.options.length, 3, `${s.id}: ${q.q}`);
      assert.ok(new Set(q.options).size === 3, `${s.id}: duplicate options`);
      assert.ok(
        Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length,
        `${s.id}: answer index ${q.answer} out of range`
      );
    }
  }
});

test("the correct answer is not always in the same position", () => {
  // Guards against a child learning "the first one is always right" rather
  // than reading the story.
  const positions = new Set(
    stories.flatMap((s) => s.questions.map((q) => q.answer))
  );
  assert.ok(positions.size >= 3, "correct answers should use all three slots");
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `./stories.json`.

- [ ] **Step 3: Write the content**

`src/data/stories.json`:

```json
[
  {
    "id": "lost-egg",
    "title": "The Lost Egg",
    "emoji": "🐉",
    "band": "easy",
    "text": "Mia found a big blue egg under the old oak tree. It was warm. Something moved inside! Crack went the shell. A tiny green dragon looked up at Mia and sneezed a puff of smoke. Mia laughed and named him Pip.",
    "questions": [
      {
        "q": "What did Mia find under the tree?",
        "options": ["A shoe", "An egg", "A rock"],
        "answer": 1
      },
      {
        "q": "What came out of the shell?",
        "options": ["A bird", "A frog", "A tiny dragon"],
        "answer": 2
      },
      {
        "q": "What did Mia name him?",
        "options": ["Pip", "Max", "Sam"],
        "answer": 0
      }
    ]
  },
  {
    "id": "the-cat-and-the-kite",
    "title": "The Cat and the Kite",
    "emoji": "🪁",
    "band": "easy",
    "text": "Sam flew his red kite in the park. The wind pulled hard. Up went the kite, over the trees! Then the string snapped. The kite landed in a hedge, right on top of a very cross cat.",
    "questions": [
      {
        "q": "What colour was the kite?",
        "options": ["Blue", "Green", "Red"],
        "answer": 2
      },
      {
        "q": "What happened to the string?",
        "options": ["It snapped", "It got wet", "It was too short"],
        "answer": 0
      },
      {
        "q": "Where did the kite land?",
        "options": ["On a roof", "In a hedge", "In a pond"],
        "answer": 1
      }
    ]
  },
  {
    "id": "rock-pool",
    "title": "Rock Pool",
    "emoji": "🌊",
    "band": "medium",
    "text": "Tess and Grandad walked down to the beach when the tide went out. In a rock pool they found a small green crab. It waved one claw at them and then hid under a stone. Next to it a red starfish clung to the rock, holding on tight. Tess counted its five arms. Grandad said the pool was like a tiny town, busy with little animals, and that the sea would come back to cover it again by teatime.",
    "questions": [
      {
        "q": "What did Tess and Grandad find first in the pool?",
        "options": ["A shell", "A small green crab", "A fish"],
        "answer": 1
      },
      {
        "q": "How many arms did the starfish have?",
        "options": ["Eight", "Three", "Five"],
        "answer": 2
      },
      {
        "q": "What did Grandad say the rock pool was like?",
        "options": ["A tiny town", "A big bath", "A rainy day"],
        "answer": 0
      }
    ]
  },
  {
    "id": "library-cat",
    "title": "The Library Cat",
    "emoji": "📚",
    "band": "medium",
    "text": "Every morning the library cat sat on the same sunny windowsill. Her name was Comma, because she always curled up in a little curve. Children read to her and she never once interrupted. One Tuesday a boy called Ravi read her a story about a lion. Comma listened to every word. When Ravi closed the book she stretched, yawned, and put one paw on the cover, as if she were asking for it again.",
    "questions": [
      {
        "q": "Why was the cat called Comma?",
        "options": ["She liked books", "She curled up in a little curve", "She was very small"],
        "answer": 1
      },
      {
        "q": "What was Ravi's story about?",
        "options": ["A boat", "A dragon", "A lion"],
        "answer": 2
      },
      {
        "q": "What did Comma do when the book closed?",
        "options": ["Put one paw on the cover", "Ran away", "Went to sleep"],
        "answer": 0
      }
    ]
  },
  {
    "id": "moon-picnic",
    "title": "Moon Picnic",
    "emoji": "🚀",
    "band": "longer",
    "text": "Nadia packed jam sandwiches, two apples and a flask of tea, because you should never visit the moon on an empty stomach. Her rocket was made from an old bathtub and a great deal of tape. It rattled all the way up, past the clouds, past the aeroplanes, past a very surprised seagull. On the moon everything was grey and quiet and covered in soft dust. Nadia laid out her blanket in a crater and poured the tea. It floated straight out of the cup in wobbling golden balls. She caught one in her mouth, which is the only sensible way to drink tea on the moon, and decided she would come back on Sunday.",
    "questions": [
      {
        "q": "What was Nadia's rocket made from?",
        "options": ["A cardboard box", "An old bathtub and tape", "A barrel"],
        "answer": 1
      },
      {
        "q": "What did the tea do when she poured it?",
        "options": ["It froze solid", "It disappeared", "It floated in wobbling balls"],
        "answer": 2
      },
      {
        "q": "When did Nadia decide to come back?",
        "options": ["On Sunday", "On Monday", "Never again"],
        "answer": 0
      }
    ]
  },
  {
    "id": "winter-bus",
    "title": "The Winter Bus",
    "emoji": "🚌",
    "band": "longer",
    "text": "The number nine bus broke down at the top of Hill Road on the coldest morning of the year. Everybody groaned. Mr Okafor, the driver, stood up and said that since they were all going to be late anyway, they might as well be late together. He opened his flask and shared it out in paper cups. A woman with a violin played three songs. Two boys cleared the snow from the windscreen without being asked. By the time the new bus arrived, forty minutes later, nobody on board could remember being cross. Mr Okafor said it was the best breakdown of his entire career, and he had had eleven.",
    "questions": [
      {
        "q": "Where did the bus break down?",
        "options": ["Outside the school", "At the top of Hill Road", "By the river"],
        "answer": 1
      },
      {
        "q": "What did the woman with the violin do?",
        "options": ["Fell asleep", "Called for help", "Played three songs"],
        "answer": 2
      },
      {
        "q": "How many breakdowns had Mr Okafor had?",
        "options": ["Eleven", "Nine", "Two"],
        "answer": 0
      }
    ]
  }
]
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS — all 6 story tests green alongside the 17 timing tests.

If a word-count assertion fails, adjust the story text rather than widening the band range: the bands are what the child sees on the tile.

- [ ] **Step 5: Lint and commit**

```bash
npm run lint
git add src/data/stories.json src/data/stories.test.js
git commit -m "feat: add six Speed Reader stories with comprehension questions"
```

---

### Task 4: Setup screen

**Files:**
- Modify: `src/pages/skills/english/SpeedReader.jsx`
- Modify: `src/pages/skills/english/SpeedReader.css`

**Interfaces:**
- Consumes: `stories.json`; `SPEED_PRESETS`, `WPM_MIN`, `WPM_MAX`, `MAX_WORDS`, `tokenize` from `spritzTiming.js`.
- Produces: within `SpeedReader`, the state `screen`, `storyId`, `customText`, `useCustom`, `wpm`, `chunkSize`, `showPivot`, and a derived `activeText`. Later tasks read these.

- [ ] **Step 1: Replace the page body with the setup screen**

`src/pages/skills/english/SpeedReader.jsx`:

```jsx
import { useMemo, useState } from "react";
import stories from "../../../data/stories.json";
import {
  SPEED_PRESETS,
  WPM_MIN,
  WPM_MAX,
  MAX_WORDS,
  tokenize,
} from "../../../hooks/spritzTiming";
import "./SpeedReader.css";

const BAND_DOT = { easy: "🟢", medium: "🟡", longer: "🔴" };

function SpeedReader() {
  const [screen, setScreen] = useState("setup");
  const [storyId, setStoryId] = useState(stories[0].id);
  const [useCustom, setUseCustom] = useState(false);
  const [customText, setCustomText] = useState("");
  const [wpm, setWpm] = useState(100);
  const [chunkSize, setChunkSize] = useState(1);
  const [showPivot, setShowPivot] = useState(true);

  const story = stories.find((s) => s.id === storyId);
  const activeText = useCustom ? customText : story.text;
  const chunks = useMemo(() => tokenize(activeText, chunkSize), [activeText, chunkSize]);

  const customWordCount = useMemo(
    () => (useCustom ? String(customText).trim().split(/\s+/).filter(Boolean).length : 0),
    [useCustom, customText]
  );
  const capped = customWordCount > MAX_WORDS;
  const canStart = chunks.length > 0;

  const wordCountOf = (text) => tokenize(text).length;

  if (screen === "setup") {
    return (
      <div className="sr-page page">
        <h2 className="sr-title">⚡ Speed Reader</h2>
        <p className="sr-intro">
          Words flash one at a time. Keep your eyes still and read!
        </p>

        <fieldset className="sr-group">
          <legend className="sr-legend">Pick a story</legend>
          <div className="sr-stories">
            {stories.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`sr-story ${!useCustom && s.id === storyId ? "is-active" : ""}`}
                aria-pressed={!useCustom && s.id === storyId}
                onClick={() => {
                  setStoryId(s.id);
                  setUseCustom(false);
                }}
              >
                <span className="sr-story-emoji" aria-hidden="true">{s.emoji}</span>
                <span className="sr-story-title">{s.title}</span>
                <span className="sr-story-meta">
                  {BAND_DOT[s.band]} {wordCountOf(s.text)} words
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        <details
          className="sr-custom"
          open={useCustom}
          onToggle={(e) => setUseCustom(e.currentTarget.open)}
        >
          <summary className="sr-summary">Paste your own story</summary>
          <textarea
            className="sr-textarea"
            rows="5"
            value={customText}
            placeholder="Paste or type a story here…"
            onChange={(e) => setCustomText(e.target.value)}
          />
          {capped && (
            <p className="sr-note">
              That is {customWordCount} words — we will read the first {MAX_WORDS}.
            </p>
          )}
          {useCustom && !canStart && (
            <p className="sr-note">Add some words to start reading.</p>
          )}
          {useCustom && canStart && (
            <p className="sr-note">No questions for your own story — just the reading.</p>
          )}
        </details>

        <fieldset className="sr-group">
          <legend className="sr-legend">How fast?</legend>
          <div className="sr-speeds">
            {SPEED_PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`sr-speed ${wpm === p.wpm ? "is-active" : ""}`}
                aria-pressed={wpm === p.wpm}
                onClick={() => setWpm(p.wpm)}
              >
                <span aria-hidden="true">{p.emoji}</span> {p.label}
                <small>{p.wpm}</small>
              </button>
            ))}
          </div>
          <label className="sr-slider">
            Fine-tune: {wpm} words a minute
            <input
              type="range"
              min={WPM_MIN}
              max={WPM_MAX}
              step="5"
              value={wpm}
              onChange={(e) => setWpm(Number(e.target.value))}
            />
          </label>
        </fieldset>

        <fieldset className="sr-group">
          <legend className="sr-legend">Words at a time</legend>
          <div className="sr-chunks">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                type="button"
                className={`sr-chunk ${chunkSize === n ? "is-active" : ""}`}
                aria-pressed={chunkSize === n}
                onClick={() => setChunkSize(n)}
              >
                {n}
              </button>
            ))}
          </div>
          <label className="sr-toggle">
            <input
              type="checkbox"
              checked={showPivot}
              onChange={(e) => setShowPivot(e.target.checked)}
            />
            Highlight the middle letter
          </label>
        </fieldset>

        <button
          type="button"
          className="sr-start"
          disabled={!canStart}
          onClick={() => setScreen("reading")}
        >
          Start Reading ➡️
        </button>
      </div>
    );
  }

  return (
    <div className="sr-page page">
      <p className="sr-intro">Reading {chunks.length} chunks at {wpm} wpm.</p>
      <button type="button" className="sr-start" onClick={() => setScreen("setup")}>
        ⏮ Back
      </button>
    </div>
  );
}

export default SpeedReader;
```

The `screen !== "setup"` branch is a temporary stub so this task is verifiable on its own. Task 6 replaces it.

- [ ] **Step 2: Add the setup styles**

Append to `src/pages/skills/english/SpeedReader.css`:

```css
.sr-group {
  border: none;
  width: 100%;
  max-width: 44rem;
}

.sr-legend {
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.sr-stories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(9.5rem, 1fr));
  gap: 0.75rem;
}

.sr-story {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  min-height: 6.5rem;
  padding: 0.75rem;
  border: 2px solid var(--map-border);
  border-radius: 12px;
  background-color: var(--light-panel);
  color: inherit;
  cursor: pointer;
}

body.dark .sr-story {
  background-color: var(--dark-panel);
}

.sr-story-emoji { font-size: 1.75rem; }
.sr-story-title { font-weight: 700; }
.sr-story-meta { font-size: 0.85rem; color: var(--map-muted); }

.sr-story.is-active,
.sr-speed.is-active,
.sr-chunk.is-active {
  border-color: var(--light-accent);
  outline: 2px solid var(--light-accent);
}

body.dark .sr-story.is-active,
body.dark .sr-speed.is-active,
body.dark .sr-chunk.is-active {
  border-color: var(--dark-accent);
  outline-color: var(--dark-accent);
}

.sr-speeds { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; }

.sr-speed,
.sr-chunk {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 5rem;
  min-height: 3rem;
  padding: 0.5rem 0.75rem;
  border: 2px solid var(--map-border);
  border-radius: 10px;
  background-color: var(--light-panel);
  color: inherit;
  cursor: pointer;
}

body.dark .sr-speed,
body.dark .sr-chunk { background-color: var(--dark-panel); }

.sr-speed small { color: var(--map-muted); }

.sr-chunks { display: flex; gap: 0.5rem; justify-content: center; }
.sr-chunk { min-width: 3.25rem; font-size: 1.25rem; }

.sr-slider { display: block; margin-top: 0.75rem; }
.sr-slider input { width: 100%; max-width: 22rem; }

.sr-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 0.75rem;
}

.sr-custom { width: 100%; max-width: 44rem; text-align: left; }
.sr-summary { cursor: pointer; font-weight: 700; padding: 0.5rem 0; }
.sr-textarea { width: 100%; padding: 0.5rem; border-radius: 8px; border: 2px solid var(--map-border); background-color: var(--light-panel); color: inherit; }
body.dark .sr-textarea { background-color: var(--dark-panel); }
.sr-note { font-size: 0.9rem; color: var(--map-muted); margin-top: 0.4rem; }

.sr-start {
  min-height: 3.25rem;
  padding: 0.75rem 2rem;
  font-size: 1.15rem;
  font-weight: 700;
  border: none;
  border-radius: 12px;
  background-color: var(--light-accent);
  color: var(--on-light-accent);
  cursor: pointer;
}

body.dark .sr-start {
  background-color: var(--dark-accent);
  color: var(--on-dark-accent);
}

.sr-start:disabled { background-color: gray; opacity: 0.6; cursor: not-allowed; }
```

- [ ] **Step 3: Verify in the browser**

Run: `npm run dev`, open `/speed-reader`.

1. Six story tiles render with emoji, title, band dot and a word count.
2. Clicking a tile selects it; only one is selected at a time.
3. Speed presets select, and each updates the slider number.
4. Moving the slider leaves no preset highlighted (an off-preset speed).
5. Words-at-a-time and the pivot checkbox both toggle.
6. Open "Paste your own story" — Start becomes disabled while it is empty.
7. Type a word — Start enables, and the "no questions" note appears.
8. Paste over 500 words — the cap notice shows the real count.
9. Clicking a story tile while the textarea is open switches back to the preset.
10. Start goes to the stub screen; ⏮ Back returns.
11. Both themes: tiles, buttons and textarea are all legible.

- [ ] **Step 4: Lint and commit**

```bash
npm run lint
git add src/pages/skills/english/SpeedReader.jsx src/pages/skills/english/SpeedReader.css
git commit -m "feat: add Speed Reader setup screen with story, speed and display options"
```

---

### Task 5: Reader overlay

A dumb, accessible overlay. It knows nothing about reading, so promoting it to `src/components/ui/Modal.jsx` on the second use is a file move.

**Files:**
- Create: `src/pages/skills/english/ReaderOverlay.jsx`
- Create: `src/pages/skills/english/ReaderOverlay.css`
- Modify: `src/pages/skills/english/SpeedReader.jsx` (render the stub inside it)

**Interfaces:**
- Consumes: nothing.
- Produces: default export `ReaderOverlay({ children, onClose, label })`. `onClose` fires on Esc, backdrop click, and the ✕ button. `label` is the accessible name.

- [ ] **Step 1: Create the overlay**

`src/pages/skills/english/ReaderOverlay.jsx`:

```jsx
import { useEffect, useRef } from "react";
import "./ReaderOverlay.css";

const FOCUSABLE =
  'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Full-screen focus overlay. Deliberately knows nothing about reading - it
 * takes children and a close handler, so it can move to components/ui/ intact
 * when a second game needs a modal.
 */
function ReaderOverlay({ children, onClose, label = "Reading" }) {
  const panelRef = useRef(null);
  const returnFocusRef = useRef(null);

  // Remember what had focus, move focus in, and restore it on close.
  useEffect(() => {
    returnFocusRef.current = document.activeElement;
    panelRef.current?.focus();
    return () => {
      const target = returnFocusRef.current;
      if (target && typeof target.focus === "function") target.focus();
    };
  }, []);

  // Lock background scrolling while open.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Esc closes; Tab cycles inside the panel.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const items = panelRef.current?.querySelectorAll(FOCUSABLE);
      if (!items || items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="ro-backdrop" onClick={onClose}>
      <div
        className="ro-panel"
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="ro-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export default ReaderOverlay;
```

- [ ] **Step 2: Create the overlay styles**

`src/pages/skills/english/ReaderOverlay.css`:

```css
:root {
  --reader-backdrop: rgba(34, 24, 28, 0.72);
  --reader-surface: var(--light-panel);
}

body.dark {
  --reader-backdrop: rgba(10, 6, 8, 0.82);
  --reader-surface: var(--dark-panel);
}

.ro-backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: var(--reader-backdrop);
}

.ro-panel {
  position: relative;
  width: min(56rem, 100%);
  min-height: min(32rem, 90dvh);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 2.5rem 1.5rem 1.5rem;
  border-radius: 18px;
  background-color: var(--reader-surface);
  color: inherit;
}

.ro-close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  min-width: 2.75rem;
  min-height: 2.75rem;
  font-size: 1.25rem;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.ro-close:hover { background-color: var(--map-chip); }
```

- [ ] **Step 3: Render the stub inside the overlay**

In `src/pages/skills/english/SpeedReader.jsx`, add the import:

```jsx
import ReaderOverlay from "./ReaderOverlay";
```

and replace the temporary non-setup return with:

```jsx
  return (
    <div className="sr-page page">
      <h2 className="sr-title">⚡ Speed Reader</h2>
      {screen === "reading" && (
        <ReaderOverlay onClose={() => setScreen("setup")} label="Speed reading">
          <p className="sr-intro">
            {chunks.length} chunks at {wpm} wpm.
          </p>
        </ReaderOverlay>
      )}
    </div>
  );
```

- [ ] **Step 4: Verify in the browser**

1. Start Reading opens a dimmed overlay over the page.
2. `Esc` closes it and returns to setup.
3. The ✕ button closes it.
4. Clicking the dark backdrop closes it; clicking the panel does not.
5. While open, the page behind cannot be scrolled.
6. `Tab` cycles only within the overlay and never reaches the navbar.
7. After closing, focus returns to the Start button.
8. Both themes: the backdrop dims and the panel is legible.

- [ ] **Step 5: Lint and commit**

```bash
npm run lint
git add src/pages/skills/english/ReaderOverlay.jsx src/pages/skills/english/ReaderOverlay.css src/pages/skills/english/SpeedReader.jsx
git commit -m "feat: add accessible reader overlay with focus trap and scroll lock"
```

---

### Task 6: The reading engine and word display

The core of the feature: the scheduler hook, the countdown, and the pivot-aligned word.

**Files:**
- Create: `src/hooks/useSpritzReader.js`
- Create: `src/pages/skills/english/ReadingView.jsx`
- Modify: `src/pages/skills/english/SpeedReader.jsx`
- Modify: `src/pages/skills/english/SpeedReader.css`

**Interfaces:**
- Consumes: `tokenize`, `chunkDelay`, `pivotIndex`, `COUNTDOWN_MS` from `spritzTiming.js`; `ReaderOverlay`.
- Produces:
  - `useSpritzReader({ text, wpm, chunkSize, onFinish }) → { chunk, index, total, isPlaying, isFinished, elapsedMs, play, pause, toggle, next, prev, restart }`
  - default export `ReadingView({ text, wpm, chunkSize, showPivot, onWpmChange, onFinish })`

- [ ] **Step 1: Write the scheduler hook**

`src/hooks/useSpritzReader.js`:

```js
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { chunkDelay, tokenize } from "./spritzTiming";

/**
 * Drives a spritz reading session.
 *
 * Uses a recursive setTimeout rather than setInterval: per-chunk delays vary
 * with word length and punctuation, so each tick must schedule the next using
 * that chunk's own delay. There is exactly one timer and one clearTimer, which
 * pause, next, prev, restart and unmount all funnel through - this project has
 * a history of leaked interval bugs and one teardown path is the fix.
 */
export function useSpritzReader({ text, wpm, chunkSize, onFinish }) {
  const chunks = useMemo(() => tokenize(text, chunkSize), [text, chunkSize]);

  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);

  const timerRef = useRef(null);
  const startedAtRef = useRef(null);
  // Read by the scheduler so a speed change mid-read does not rebuild it.
  const wpmRef = useRef(wpm);
  const onFinishRef = useRef(onFinish);

  useEffect(() => { wpmRef.current = wpm; }, [wpm]);
  useEffect(() => { onFinishRef.current = onFinish; }, [onFinish]);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  /** Fold the current run of reading time into the total. */
  const bankElapsed = useCallback(() => {
    if (startedAtRef.current !== null) {
      setElapsedMs((ms) => ms + (Date.now() - startedAtRef.current));
      startedAtRef.current = null;
    }
  }, []);

  const pause = useCallback(() => {
    clearTimer();
    bankElapsed();
    setIsPlaying(false);
  }, [clearTimer, bankElapsed]);

  const play = useCallback(() => {
    if (chunks.length === 0 || isFinished) return;
    if (startedAtRef.current === null) startedAtRef.current = Date.now();
    setIsPlaying(true);
  }, [chunks.length, isFinished]);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, pause, play]);

  const step = useCallback(
    (delta) => {
      clearTimer();
      setIsFinished(false);
      setIndex((i) => Math.max(0, Math.min(chunks.length - 1, i + delta)));
    },
    [clearTimer, chunks.length]
  );

  const next = useCallback(() => step(1), [step]);
  const prev = useCallback(() => step(-1), [step]);

  const restart = useCallback(() => {
    clearTimer();
    startedAtRef.current = null;
    setIndex(0);
    setElapsedMs(0);
    setIsFinished(false);
    setIsPlaying(false);
  }, [clearTimer]);

  // The scheduler. Re-arms whenever the shown chunk changes or play/pause flips.
  // Resuming re-shows the current chunk for its full delay rather than the
  // leftover milliseconds - simpler, and kinder to a child who just looked up.
  useEffect(() => {
    if (!isPlaying || isFinished || chunks.length === 0) return;

    const current = chunks[index];
    const delay = chunkDelay(current, wpmRef.current, chunkSize);

    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      if (index >= chunks.length - 1) {
        bankElapsed();
        setIsPlaying(false);
        setIsFinished(true);
      } else {
        setIndex((i) => i + 1);
      }
    }, delay);

    return clearTimer;
  }, [isPlaying, isFinished, index, chunks, chunkSize, clearTimer, bankElapsed]);

  // Fire onFinish once, after the finished state has settled.
  useEffect(() => {
    if (isFinished) onFinishRef.current?.();
  }, [isFinished]);

  // A child who looks away should not lose the story.
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) pause();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [pause]);

  // Belt and braces: no timer survives unmount.
  useEffect(() => clearTimer, [clearTimer]);

  return {
    chunk: chunks[index] ?? null,
    index,
    total: chunks.length,
    isPlaying,
    isFinished,
    elapsedMs,
    play,
    pause,
    toggle,
    next,
    prev,
    restart,
  };
}
```

- [ ] **Step 2: Write the reading view**

`src/pages/skills/english/ReadingView.jsx`:

```jsx
import { useEffect, useState } from "react";
import { useSpritzReader } from "../../../hooks/useSpritzReader";
import { COUNTDOWN_MS, pivotIndex } from "../../../hooks/spritzTiming";

const COUNTDOWN_STEPS = ["3", "2", "1", "Go!"];

function PivotWord({ text, showPivot }) {
  if (!showPivot) return <span className="sr-word-plain">{text}</span>;

  const i = pivotIndex(text);
  return (
    <>
      <span className="sr-word-left">{text.slice(0, i)}</span>
      <span className="sr-word-pivot">{text[i]}</span>
      <span className="sr-word-right">{text.slice(i + 1)}</span>
    </>
  );
}

function ReadingView({ text, wpm, chunkSize, showPivot, onFinish }) {
  const [countdown, setCountdown] = useState(0);
  const reader = useSpritzReader({ text, wpm, chunkSize, onFinish });

  // Countdown owns its own timer, separate from the reader's, so the hook keeps
  // exactly one timer and one teardown path.
  useEffect(() => {
    if (countdown >= COUNTDOWN_STEPS.length) return;
    const timer = setTimeout(() => setCountdown((c) => c + 1), COUNTDOWN_MS);
    return () => clearTimeout(timer);
  }, [countdown]);

  const counting = countdown < COUNTDOWN_STEPS.length;

  useEffect(() => {
    if (!counting) reader.play();
    // Only when the countdown ends. reader.play is stable per session.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counting]);

  if (counting) {
    return (
      <div className="sr-countdown" aria-live="assertive">
        {COUNTDOWN_STEPS[countdown]}
      </div>
    );
  }

  const progress = reader.total ? ((reader.index + 1) / reader.total) * 100 : 0;

  return (
    <>
      <div className="sr-stage">
        <div className="sr-crosshair" aria-hidden="true" />
        <div className="sr-word">
          {reader.chunk && <PivotWord text={reader.chunk.text} showPivot={showPivot} />}
        </div>
      </div>

      <div className="sr-progress">
        <div className="sr-progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <p className="sr-count">
        {reader.index + 1} / {reader.total} words
      </p>
    </>
  );
}

export default ReadingView;
```

- [ ] **Step 3: Wire it into the page**

In `src/pages/skills/english/SpeedReader.jsx`, import it:

```jsx
import ReadingView from "./ReadingView";
```

and replace the overlay's placeholder `<p>` with:

```jsx
          <ReadingView
            text={activeText}
            wpm={wpm}
            chunkSize={chunkSize}
            showPivot={showPivot}
            onFinish={() => setScreen("finish")}
          />
```

For this task the `finish` screen is not built yet, so also change the non-setup return's guard to keep the overlay mounted only for `reading`, and add a temporary finish stub:

```jsx
      {screen === "finish" && (
        <p className="sr-intro">Finished. <button type="button" className="sr-start" onClick={() => setScreen("setup")}>⏮ Back</button></p>
      )}
```

- [ ] **Step 4: Add the reading styles**

Append to `src/pages/skills/english/SpeedReader.css`:

```css
.sr-countdown {
  font-size: clamp(4rem, 20vw, 8rem);
  font-weight: 700;
  color: var(--light-accent);
}

body.dark .sr-countdown { color: var(--dark-accent); }

.sr-stage {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 8rem;
}

/* Three-part layout keeps the pivot letter dead centre no matter the word,
   so the eye never has to hunt for where the next word starts. */
.sr-word {
  display: flex;
  align-items: baseline;
  width: 100%;
  /* The pivot colour only meets WCAG AA at large sizes - see the plan's
     Global Constraints. Never let this fall below 24px. */
  font-size: clamp(2.5rem, 12vw, 5rem);
  font-weight: 700;
  line-height: 1.2;
  white-space: pre;
}

.sr-word-left { flex: 1; text-align: right; }
.sr-word-right { flex: 1; text-align: left; }
.sr-word-pivot { color: var(--light-accent); }
body.dark .sr-word-pivot { color: var(--dark-accent); }

.sr-word-plain { flex: 1; text-align: center; }

.sr-crosshair {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 0;
  border-left: 2px dotted var(--map-border);
}

.sr-progress {
  width: min(28rem, 100%);
  height: 0.6rem;
  border-radius: 999px;
  background-color: var(--map-chip);
  overflow: hidden;
}

.sr-progress-bar {
  height: 100%;
  background-color: var(--light-accent);
  transition: width 0.15s linear;
}

body.dark .sr-progress-bar { background-color: var(--dark-accent); }

.sr-count { color: var(--map-muted); }
```

- [ ] **Step 5: Verify in the browser**

1. Start Reading shows `3 · 2 · 1 · Go!`, then the first word.
2. Words advance on their own and the progress bar fills.
3. The word counter reaches `N / N` and the overlay gives way to the finish stub.
4. Long words visibly linger; words after a full stop hold longer than mid-sentence ones.
5. Turn the pivot toggle off in setup — the word renders plain and centred.
6. With the pivot on, the highlighted letter stays in the same screen position across many different words. This is the single most important check.
7. Set words-at-a-time to 2, read again: two words per flash, and the counter total roughly halves.
8. Read at 60 wpm and at 200 wpm — the difference is obvious.
9. Start a read, then switch browser tabs and come back: it is paused, not finished.
10. Start a read, then hit browser Back mid-read: no console errors and no stray timers.
11. Both themes: the word, pivot, crosshair and progress bar are all legible.

- [ ] **Step 6: Lint and commit**

```bash
npm run lint
git add src/hooks/useSpritzReader.js src/pages/skills/english/ReadingView.jsx src/pages/skills/english/SpeedReader.jsx src/pages/skills/english/SpeedReader.css
git commit -m "feat: add spritz reading engine with countdown and pivot-aligned word display"
```

---

### Task 7: Reading controls

**Files:**
- Modify: `src/pages/skills/english/ReadingView.jsx`
- Modify: `src/pages/skills/english/SpeedReader.jsx` (pass `onWpmChange`)
- Modify: `src/pages/skills/english/SpeedReader.css`

**Interfaces:**
- Consumes: the `reader` object from Task 6; `nextSpeed`, `WPM_MIN`, `WPM_MAX` from `spritzTiming.js`.
- Produces: `ReadingView` gains a required `onWpmChange(wpm: number)` prop.

- [ ] **Step 1: Add controls and keyboard handling**

In `src/pages/skills/english/ReadingView.jsx`, extend the imports:

```jsx
import { WPM_MIN, WPM_MAX, COUNTDOWN_MS, pivotIndex } from "../../../hooks/spritzTiming";
```

Add `onWpmChange` to the props, and inside the component — after the `counting` derivation — add the keyboard shortcuts:

```jsx
  useEffect(() => {
    if (counting) return;
    const onKeyDown = (e) => {
      if (e.key === " ") {
        e.preventDefault();
        reader.toggle();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        reader.next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        reader.prev();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [counting, reader]);
```

Then add the control row after the `<p className="sr-count">`:

```jsx
      <div className="sr-controls">
        <button
          type="button"
          className="sr-ctrl"
          onClick={reader.prev}
          disabled={reader.index === 0}
          aria-label="Previous word"
        >
          ⏮
        </button>
        <button type="button" className="sr-ctrl is-primary" onClick={reader.toggle}>
          {reader.isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>
        <button
          type="button"
          className="sr-ctrl"
          onClick={reader.next}
          disabled={reader.index >= reader.total - 1}
          aria-label="Next word"
        >
          ⏭
        </button>
      </div>

      <div className="sr-nudge">
        <button
          type="button"
          className="sr-ctrl"
          onClick={() => onWpmChange(Math.max(WPM_MIN, wpm - 20))}
          disabled={wpm <= WPM_MIN}
          aria-label="Slower"
        >
          🐢
        </button>
        <span className="sr-nudge-value">{wpm} wpm</span>
        <button
          type="button"
          className="sr-ctrl"
          onClick={() => onWpmChange(Math.min(WPM_MAX, wpm + 20))}
          disabled={wpm >= WPM_MAX}
          aria-label="Faster"
        >
          🚀
        </button>
      </div>
```

- [ ] **Step 2: Pass the handler from the page**

In `src/pages/skills/english/SpeedReader.jsx`, add to the `<ReadingView>` props:

```jsx
            onWpmChange={setWpm}
```

- [ ] **Step 3: Add the control styles**

Append to `src/pages/skills/english/SpeedReader.css`:

```css
.sr-controls,
.sr-nudge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.sr-ctrl {
  min-width: 3.25rem;
  min-height: 3.25rem;
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  border: 2px solid var(--map-border);
  border-radius: 12px;
  background-color: var(--reader-surface);
  color: inherit;
  cursor: pointer;
}

.sr-ctrl.is-primary {
  min-width: 8rem;
  font-weight: 700;
  border-color: transparent;
  background-color: var(--light-accent);
  color: var(--on-light-accent);
}

body.dark .sr-ctrl.is-primary {
  background-color: var(--dark-accent);
  color: var(--on-dark-accent);
}

.sr-ctrl:disabled { opacity: 0.45; cursor: not-allowed; }

.sr-nudge-value { min-width: 6rem; color: var(--map-muted); }
```

- [ ] **Step 4: Verify in the browser**

1. ⏸ pauses; the word stops changing. ▶ resumes from the same word, holding it a full beat.
2. ⏮ steps back a word; ⏭ steps forward. Both work while paused and while playing.
3. ⏮ is disabled on the first word; ⏭ is disabled on the last.
4. `Space` pauses and resumes. `←` and `→` step. `Esc` still exits.
5. 🐢 and 🚀 change speed mid-read without restarting, and the displayed wpm updates.
6. 🐢 is disabled at 60; 🚀 is disabled at 300.
7. A mid-read speed change persists back on the setup screen.
8. Step to the last word with ⏭, then press ▶ — it finishes cleanly.
9. Both themes: all controls legible, disabled states visibly distinct.

- [ ] **Step 5: Lint and commit**

```bash
npm run lint
git add src/pages/skills/english/ReadingView.jsx src/pages/skills/english/SpeedReader.jsx src/pages/skills/english/SpeedReader.css
git commit -m "feat: add pause, step and live speed controls to the Speed Reader"
```

---

### Task 8: Questions screen

**Files:**
- Create: `src/pages/skills/english/StoryQuestions.jsx`
- Modify: `src/pages/skills/english/SpeedReader.jsx`
- Modify: `src/pages/skills/english/SpeedReader.css`

**Interfaces:**
- Consumes: a story's `questions` array from `stories.json`.
- Produces: default export `StoryQuestions({ questions, onDone })`, where `onDone(correctCount: number)` fires after the last question.

- [ ] **Step 1: Create the questions screen**

`src/pages/skills/english/StoryQuestions.jsx`:

```jsx
import { useState } from "react";

/**
 * Three multiple-choice questions, one at a time, using the app's standard
 * correct/retry feedback. A wrong answer is not fatal - the child retries the
 * same question, and only first-time-correct counts toward the score.
 */
function StoryQuestions({ questions, onDone }) {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [attempted, setAttempted] = useState(false);

  const question = questions[step];
  const isCorrect = picked !== null && picked === question.answer;

  const choose = (i) => {
    if (isCorrect) return;
    setPicked(i);
    if (i === question.answer && !attempted) setCorrectCount((n) => n + 1);
    setAttempted(true);
  };

  const advance = () => {
    const last = step === questions.length - 1;
    if (last) {
      onDone(correctCount);
      return;
    }
    setStep((s) => s + 1);
    setPicked(null);
    setAttempted(false);
  };

  return (
    <div className="sr-quiz">
      <p className="sr-count">
        Question {step + 1} of {questions.length}
      </p>
      <h3 className="sr-question">{question.q}</h3>

      <div className="sr-options">
        {question.options.map((option, i) => (
          <button
            key={option}
            type="button"
            className={`sr-option ${picked === i ? (isCorrect ? "is-right" : "is-wrong") : ""}`}
            onClick={() => choose(i)}
            disabled={isCorrect}
          >
            {option}
          </button>
        ))}
      </div>

      {picked !== null && (
        <p className="sr-feedback">
          {isCorrect ? "✅ That's right!" : "❌ Not quite — try again!"}
        </p>
      )}

      {isCorrect && (
        <button type="button" className="sr-start" onClick={advance}>
          {step === questions.length - 1 ? "See how I did ➡️" : "Next question ➡️"}
        </button>
      )}
    </div>
  );
}

export default StoryQuestions;
```

- [ ] **Step 2: Route to it from the page**

In `src/pages/skills/english/SpeedReader.jsx`:

```jsx
import StoryQuestions from "./StoryQuestions";
```

Add score state alongside the others:

```jsx
  const [score, setScore] = useState(0);
```

Change the reader's finish handler so pasted text skips the quiz — there are no authored questions for it:

```jsx
            onFinish={() => setScreen(useCustom ? "finish" : "questions")}
```

And render the questions screen in the non-setup return, before the finish stub:

```jsx
      {screen === "questions" && (
        <StoryQuestions
          questions={story.questions}
          onDone={(correct) => {
            setScore(correct);
            setScreen("finish");
          }}
        />
      )}
```

- [ ] **Step 3: Add the quiz styles**

Append to `src/pages/skills/english/SpeedReader.css`:

```css
.sr-quiz {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 34rem;
}

.sr-question { font-size: 1.35rem; }

.sr-options { display: flex; flex-direction: column; gap: 0.75rem; width: 100%; }

.sr-option {
  min-height: 3.25rem;
  padding: 0.75rem 1rem;
  font-size: 1.1rem;
  border: 2px solid var(--map-border);
  border-radius: 12px;
  background-color: var(--light-panel);
  color: inherit;
  cursor: pointer;
}

body.dark .sr-option { background-color: var(--dark-panel); }

.sr-option.is-right { border-color: #2e7d4f; }
.sr-option.is-wrong { border-color: #c2384a; }
.sr-option:disabled { cursor: default; }

.sr-feedback { font-size: 1.1rem; font-weight: 700; }
```

- [ ] **Step 4: Verify in the browser**

1. Finishing a preset story lands on Question 1 of 3.
2. A correct pick shows ✅, disables the options, and reveals Next question.
3. A wrong pick shows ❌ and lets the child try again on the same question.
4. A question answered wrong first, then right, does not count toward the score.
5. The last question's button reads "See how I did" and reaches the finish stub.
6. Reading pasted custom text skips the quiz entirely.
7. Across the six stories the correct answer is not always the first option.
8. Both themes: options, and the right/wrong borders, are clearly distinguishable.

- [ ] **Step 5: Lint and commit**

```bash
npm run lint
git add src/pages/skills/english/StoryQuestions.jsx src/pages/skills/english/SpeedReader.jsx src/pages/skills/english/SpeedReader.css
git commit -m "feat: add Speed Reader comprehension questions"
```

---

### Task 9: Finish screen and the read-again-faster loop

**Files:**
- Modify: `src/pages/skills/english/SpeedReader.jsx`
- Modify: `src/pages/skills/english/SpeedReader.css`

**Interfaces:**
- Consumes: `nextSpeed` from `spritzTiming.js`; `score` state from Task 8.
- Produces: no new exports. `ReadingView` gains an `onStats` prop so the page can read the finished session's real word count and elapsed time.

- [ ] **Step 1: Report stats out of the reading view**

In `src/pages/skills/english/ReadingView.jsx`, accept `onStats` and report on finish. Add after the existing effects:

```jsx
  useEffect(() => {
    if (reader.isFinished) {
      onStats({ words: reader.total, elapsedMs: reader.elapsedMs });
    }
    // Fires once per finished session.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reader.isFinished]);
```

Add `onStats` to the destructured props.

- [ ] **Step 2: Build the finish screen**

In `src/pages/skills/english/SpeedReader.jsx`, import `nextSpeed`:

```jsx
import {
  SPEED_PRESETS,
  WPM_MIN,
  WPM_MAX,
  MAX_WORDS,
  nextSpeed,
  tokenize,
} from "../../../hooks/spritzTiming";
```

Add stats state:

```jsx
  const [stats, setStats] = useState({ words: 0, elapsedMs: 0 });
```

Pass the handler to `ReadingView`:

```jsx
            onStats={setStats}
```

Replace the finish stub with the real screen:

```jsx
      {screen === "finish" && (() => {
        const seconds = Math.max(1, Math.round(stats.elapsedMs / 1000));
        const measuredWpm = Math.round((stats.words / stats.elapsedMs) * 60000) || 0;
        const faster = nextSpeed(wpm);
        const canGoFaster = faster > wpm;

        return (
          <div className="sr-finish">
            <h3 className="sr-finish-title">🎉 Great reading!</h3>
            <p className="sr-finish-stats">
              {stats.words} words · {seconds} seconds · {measuredWpm} words a minute
            </p>
            {!useCustom && (
              <p className="sr-finish-stats">
                Questions: {score} / {story.questions.length} ✅
              </p>
            )}
            <button
              type="button"
              className="sr-start"
              onClick={() => {
                if (canGoFaster) setWpm(faster);
                setScreen("reading");
              }}
            >
              {canGoFaster
                ? `⚡ Read it again, faster → ${faster} wpm`
                : "⚡ Read it again"}
            </button>
            <button
              type="button"
              className="sr-secondary"
              onClick={() => setScreen("setup")}
            >
              📖 Pick another story
            </button>
          </div>
        );
      })()}
```

- [ ] **Step 3: Remount the reader on replay**

`ReadingView` holds the countdown and the session, so replaying the same story must give it a fresh mount. Add a run counter in `src/pages/skills/english/SpeedReader.jsx`:

```jsx
  const [run, setRun] = useState(0);
```

Increment it wherever reading starts — in the Start button's handler and the replay button's handler:

```jsx
                setRun((r) => r + 1);
```

and key the reading view on it:

```jsx
          <ReadingView
            key={run}
            text={activeText}
            ...
```

Without this the countdown state persists and a replay starts mid-story.

- [ ] **Step 4: Add the finish styles**

Append to `src/pages/skills/english/SpeedReader.css`:

```css
.sr-finish {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.sr-finish-title { font-size: 1.6rem; }
.sr-finish-stats { font-size: 1.05rem; }

.sr-secondary {
  min-height: 3rem;
  padding: 0.6rem 1.5rem;
  font-size: 1.05rem;
  border: 2px solid var(--map-border);
  border-radius: 12px;
  background-color: var(--light-panel);
  color: inherit;
  cursor: pointer;
}

body.dark .sr-secondary { background-color: var(--dark-panel); }
```

- [ ] **Step 5: Verify in the browser**

1. Finish a story: word count, seconds and measured wpm all look plausible.
2. Read the same story deliberately slowly with several pauses — the measured wpm reflects reading time, not wall clock, so pausing does not tank it.
3. The countdown is not counted in the elapsed time (a 40-word story at 100 wpm reports close to 100, not ~75).
4. From 100 wpm the button offers 150. From 120 it also offers 150.
5. Set the slider to 300 and finish — the button reads "Read it again" and keeps 300.
6. "Read it again, faster" replays the same story from the countdown at the higher speed.
7. "Pick another story" returns to setup with the tile still selected.
8. Custom text: the questions line is absent and the stats still show.
9. Both themes legible.

- [ ] **Step 6: Lint, test and commit**

```bash
npm run lint
npm test
git add src/pages/skills/english/SpeedReader.jsx src/pages/skills/english/ReadingView.jsx src/pages/skills/english/SpeedReader.css
git commit -m "feat: add Speed Reader finish screen with read-again-faster loop"
```

---

### Task 10: Accessibility polish and documentation

**Files:**
- Modify: `src/pages/skills/english/SpeedReader.css`
- Modify: `src/pages/skills/english/ReaderOverlay.css`
- Modify: `docs/PROJECT_KNOWLEDGE.md` (§5 Skills Mode English list)
- Modify: `docs/PROJECT_IDEAS.md` (a new Ideas row)

**Interfaces:**
- Consumes: everything built above.
- Produces: no new exports.

- [ ] **Step 1: Honour reduced motion**

Append to `src/pages/skills/english/SpeedReader.css`:

```css
/* The word flashing is the content, not decoration, so it stays. Only the
   decorative transitions go. */
@media (prefers-reduced-motion: reduce) {
  .sr-progress-bar { transition: none; }
}
```

- [ ] **Step 2: Add a visible focus ring inside the overlay**

Append to `src/pages/skills/english/ReaderOverlay.css`:

```css
.ro-panel :focus-visible {
  outline: 3px solid var(--light-accent);
  outline-offset: 2px;
}

body.dark .ro-panel :focus-visible {
  outline-color: var(--dark-accent);
}
```

- [ ] **Step 3: Confirm the pivot contrast in the real build**

The plan's Global Constraints record the pivot as 3.14:1 in light theme, which passes WCAG AA for *large* text only. Verify with browser devtools on a rendered word:

1. Inspect `.sr-word-pivot` in light theme and read the computed contrast ratio.
2. Confirm the rendered `font-size` is at least 24px at the narrowest viewport you support (resize to 320px wide — `clamp(2.5rem, 12vw, 5rem)` floors at 40px, so this should hold).
3. If the ratio reads below 3:1 — which would mean the panel colour differs from the assumed `#ffffff` — add a dedicated darker token rather than reusing the accent:

```css
:root { --reader-pivot: #c9414b; }
body.dark { --reader-pivot: var(--dark-accent); }
.sr-word-pivot { color: var(--reader-pivot); }
```

Record which branch you took in the commit message.

- [ ] **Step 4: Update PROJECT_KNOWLEDGE.md**

In §5, extend the English line of "Skills Mode — built games":

```markdown
**English:** Word Builder, Word Sorter, Sentence Builder, Opposite Match,
Synonym Safari, Sight Word Pop, Speed Reader
```

Then add to §6 or the conventions section, whichever fits the file's current shape, a short note recording two decisions future work needs to know:

```markdown
### Pure-logic tests via `node:test`

`npm test` runs `node --test src/`. This is the Node runtime's built-in test
runner - **no test framework is installed** and `package.json` gained no
dependency. It covers pure modules only (`src/hooks/spritzTiming.js`,
`src/data/stories.json` shape). Component tests would need jsdom and React
Testing Library, which remains unstarted work (PROJECT_IDEAS.md idea #2).

### Modal / overlay pattern

`src/pages/skills/english/ReaderOverlay.jsx` is the app's first modal. It is
deliberately local to Speed Reader and takes only `children`, `onClose` and
`label`. **When a second game needs a modal, move it to
`src/components/ui/Modal.jsx`** rather than writing a second one.
```

- [ ] **Step 5: Update PROJECT_IDEAS.md**

Add a row to the Ideas table:

```markdown
| 26 | **Speed Reader (spritz)** | Done 2026-09-10. Spritz-style reading game under English & Words at `/speed-reader`: six built-in stories with comprehension questions, plus a paste-your-own-text path. One word (or 2-3) at a time at 60-300 wpm with a pivot-letter highlight, length- and punctuation-aware pacing, a focus overlay with pause/step/live-speed controls, and a read-it-again-faster loop. Pacing maths is pure and covered by `node:test` (`npm test`) with no new dependencies. Design: [specs/2026-09-10-speed-reader-design.md](superpowers/specs/2026-09-10-speed-reader-design.md) | ✅ Done |
```

Also bump **Last reviewed** at the top of both docs to `2026-09-10`.

- [ ] **Step 6: Full verification pass**

Run: `npm run lint` and `npm test` — both must pass.

Then walk the whole `add-skill-game` checklist end to end:

1. `/speed-reader` loads.
2. The link appears on `/skills` in English & Words and navigates.
3. Full loop: pick story → countdown → read → questions → finish.
4. Controls: pause, resume, step back, step forward, live speed change.
5. `Esc` and ✕ both exit to setup.
6. Custom text: paste → read → straight to finish, no questions.
7. "Read it again, faster" replays one band up.
8. Both themes on every screen: setup, reading overlay, questions, finish.
9. Tab away mid-read → paused on return.
10. Navigate away mid-read → no console errors.
11. Keyboard only, no mouse: reach the game from `/skills`, pick a story, start, pause, exit.
12. Narrow viewport (320px): nothing overflows horizontally; the word stays large.

- [ ] **Step 7: Commit**

```bash
git add src/pages/skills/english/SpeedReader.css src/pages/skills/english/ReaderOverlay.css docs/PROJECT_KNOWLEDGE.md docs/PROJECT_IDEAS.md
git commit -m "feat: polish Speed Reader accessibility and document the new game"
```
