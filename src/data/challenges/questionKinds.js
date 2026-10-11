import { isSameAnswer, normaliseAnswer } from "./english/shared.js";
import { isCorrectNumber } from "./numbersAndCounting.js";
import { isValidCoinCombination, totalOf, COINS } from "./measurement.js";
import { difference, leastPopular, mostPopular, total } from "./statistics.js";
import { findUsSpellings } from "../english/textChecks.js";

/**
 * The question kinds a challenge can be AUTHORED AS DATA, and everything
 * about them that is not React: what a question of each kind must contain,
 * what a learner's response starts as, when Check is ready, and whether a
 * response is right. `src/components/challenge/data/DataChallenge.jsx` draws
 * them; `questionKinds.test.js` lints every data bank through
 * `validateQuestion` without a browser.
 *
 * A question is a plain object: `{ kind, ...fields }`. Fields every kind
 * may carry (all optional):
 *
 *   prompt    the question, one line. `**bold**` marks words to stress.
 *   rule      a rule reminder shown above everything else
 *   passage   { title?, kind?, blocks } for ReadingPassage
 *   text      a short text shown in a reading box
 *   equation  a number sentence (string, or array of lines) in the big strip
 *   sentence  a sentence with exactly one ___; the blank shows the answer
 *             being chosen, built or typed
 *   hint      shown after two misses (hints.js). On `choice` it also strikes
 *             one wrong option when more than two remain; on `pick` it
 *             underlines `hinted`. A question with no hint shows none.
 *   speak     what the 🔊 button reads. No `speak`, no button. Never autoplays.
 *   readTextAloud  set false to hide text/passage narration when reading is tested
 *   caseSensitive  require capitals to match in choice/build answers (opt-in)
 *   picture   an emoji drawn large above the question (Year 1 leans on it),
 *             with `pictureLabel`, what a screen reader says instead
 *
 * Kind-specific fields: see KINDS below, and the table in the
 * building-curriculum-topics skill. "Read" visual kinds (chart, clock read,
 * coins count, fraction read, placeValue read) are answered from `options`
 * (tap one) or, with no options, by typing a whole number.
 */

const isNumber = (value) => typeof value === "number" && Number.isFinite(value);
const isText = (value) => typeof value === "string" && value.trim() !== "";
const isWhole = (value) => Number.isInteger(value) && value >= 0;

/* ---------- the answer control the visual "read" kinds share ---------- */

const readAnswer = {
  initial: (q) => (q.options ? null : ""),
  ready: (q, r) => (q.options ? r !== null && r !== undefined : r !== ""),
  correct: (q, r) => (q.options ? optionMatches(q, r) : isCorrectNumber(r, q.answer)),
  fill: (q, r) => (r ?? "") === "" ? "" : String(r),
  validate: (q, need) => {
    if (q.options) optionProblems(q, need);
    else need(isWhole(q.answer), "a typed answer must be a whole number");
  },
};

function optionMatches(q, response) {
  if (response === null || response === undefined) return false;
  return isNumber(q.answer) ? response === q.answer : isSameAnswer(response, q.answer, q);
}

function optionProblems(q, need) {
  need(Array.isArray(q.options) && q.options.length >= 2, "fewer than 2 options");
  if (!Array.isArray(q.options)) return;
  need(q.answer !== undefined && q.answer !== null, "no answer");
  const keys = q.options.map((option) => normaliseAnswer(option, q));
  need(new Set(keys).size === keys.length, "duplicate options");
  need(q.options.filter((option) => optionMatches(q, option)).length === 1,
    "answer missing from options (or offered twice)");
  need(q.options.every((option) => isNumber(option) || isText(option)), "an empty option");
  const values = q.options.map(fractionValue);
  if (values.every((value) => value !== null)) {
    need(new Set(values).size === values.length, "two options are the same fraction");
  }
}

/** "3/4" → 0.75; anything else → null. */
export function fractionValue(option) {
  const match = /^\s*(\d+)\s*\/\s*(\d+)\s*$/.exec(String(option));
  if (!match || Number(match[2]) === 0) return null;
  return Number(match[1]) / Number(match[2]);
}

/* ---------- helpers for the kinds with structure ---------- */

const builtText = (q, placed) => placed
  .map((id) => q.tiles.find((tile) => tile.id === id)?.label ?? "")
  .join(q.letters ? "" : " ");

const firstGap = (q) => (Array.isArray(q.gaps) && q.gaps.length ? q.gaps[0] : null);

const shadedSet = (q) => new Set(
  Array.isArray(q.shaded) ? q.shaded : Array.from({ length: q.shaded ?? 0 }, (_, i) => i)
);

const blockValue = ({ hundreds = 0, tens = 0, ones = 0 } = {}) => hundreds * 100 + tens * 10 + ones;

const digitsOf = (value) => ({
  hundreds: Math.floor(value / 100),
  tens: Math.floor(value / 10) % 10,
  ones: value % 10,
});

/** What a chart question's `ask` works out to, or `null` when it is ambiguous. */
export function chartAnswer(chart, ask) {
  const rows = chart.rows ?? [];
  switch (ask?.op) {
    case "value": return rows.find((row) => row.label === ask.label)?.value ?? null;
    case "most": return mostPopular(rows);
    case "least": return leastPopular(rows);
    case "total": return total(rows);
    case "difference": return difference(rows, ask.labels[0], ask.labels[1]);
    default: return undefined;
  }
}

/** What a placeValue read question's `ask` works out to. */
function placeValueAnswer(q) {
  const value = blockValue(q.blocks);
  const ask = q.ask ?? "value";
  return ask === "value" ? value : (q.blocks?.[ask] ?? 0);
}

/* ---------- the registry ---------- */

/**
 * Each kind: `initial(q)` the response a round starts with, `ready(q, r)`
 * whether Check can be pressed, `correct(q, r)`, `fill(q, r)` the text shown
 * in a sentence's blank (empty for none), and `validate(q, need)` which calls
 * `need(ok, message)` for each thing that would make the question unfair.
 */
export const KINDS = {
  /** Tap one option. { options, answer, variant? } */
  choice: {
    initial: () => null,
    ready: (q, r) => r !== null && r !== undefined,
    correct: (q, r) => optionMatches(q, r),
    fill: (q, r) => (r === null || r === undefined ? "" : String(r)),
    validate: optionProblems,
  },

  /** Type a whole number on the keypad. { answer, label?, maxDigits? } */
  number: {
    initial: () => "",
    ready: (q, r) => r !== "",
    correct: (q, r) => isCorrectNumber(r, q.answer),
    fill: (q, r) => r,
    validate: (q, need) => {
      need(isWhole(q.answer), "answer must be a whole number");
      if (isWhole(q.answer) && q.maxDigits) need(String(q.answer).length <= q.maxDigits, "answer longer than maxDigits");
    },
  },

  /** Spell a word on the letter keyboard. { answer, spoken?, maxLength?, apostrophe? } */
  type: {
    initial: () => "",
    ready: (q, r) => r.length > 0,
    correct: (q, r) => isSameAnswer(r, q.answer, q),
    fill: (q, r) => r,
    validate: (q, need) => {
      need(typeof q.answer === "string" && /^[a-z’']+$/i.test(q.answer), "answer must be letters (and apostrophes) only");
      need(String(q.answer ?? "").length <= (q.maxLength ?? 32), "answer longer than maxLength");
    },
  },

  /** Build from tiles. { tiles: [{ id, label }], answer, letters?, fixed? } */
  build: {
    initial: () => [],
    ready: (q, r) => r.length > 0,
    correct: (q, r) => isSameAnswer(builtText(q, r), q.answer, q),
    fill: (q, r) => builtText(q, r),
    validate: (q, need) => {
      need(Array.isArray(q.tiles) && q.tiles.length >= 2, "fewer than 2 tiles");
      if (!Array.isArray(q.tiles)) return;
      need(new Set(q.tiles.map((tile) => tile.id)).size === q.tiles.length, "repeated tile id");
      need(isText(q.answer), "no answer");
      if (!isText(q.answer)) return;
      const needed = q.letters ? [...q.answer] : q.answer.split(" ");
      const pool = q.tiles.map((tile) => tile.label);
      const missing = needed.filter((label) => {
        const at = pool.indexOf(label);
        if (at < 0) return true;
        pool.splice(at, 1);
        return false;
      });
      need(missing.length === 0, `answer cannot be built from the tiles (missing ${missing.join(", ")})`);
      if (q.letters) need(q.tiles.map((tile) => tile.label).join("") !== q.answer, "tiles already spell the answer");
    },
  },

  /** Sort cards into bins. { bins: [{ id, label }], cards: [{ id, label, bin }] } */
  sort: {
    initial: () => ({}),
    ready: (q, r) => q.cards.every((card) => r[card.id]),
    correct: (q, r) => q.cards.every((card) => r[card.id] === card.bin),
    fill: () => "",
    validate: (q, need) => {
      need(Array.isArray(q.bins) && q.bins.length >= 2 && q.bins.length <= 3, "needs 2 or 3 bins");
      need(Array.isArray(q.cards) && q.cards.length >= 2, "fewer than 2 cards");
      if (!Array.isArray(q.bins) || !Array.isArray(q.cards)) return;
      const binIds = q.bins.map((bin) => bin.id);
      need(q.cards.every((card) => binIds.includes(card.bin)), "card for a missing bin");
      need(new Set(q.cards.map((card) => card.id)).size === q.cards.length, "repeated card id");
      need(new Set(q.cards.map((card) => normaliseAnswer(card.label))).size === q.cards.length, "repeated card label");
      need(binIds.every((id) => q.cards.some((card) => card.bin === id)), "empty bin");
    },
  },

  /**
   * Put cards in order (drag, or keyboard: space, arrows, space).
   * { items: [{ id, label, value? }] in their STARTING order, answer: ids in
   * the right order, direction? }. Give items a `value` and the linter checks
   * the answer really is that order and that no two values tie.
   */
  order: {
    initial: (q) => q.items,
    ready: () => true,
    correct: (q, r) => r.map((item) => item.id).join("|") === q.answer.join("|"),
    fill: () => "",
    validate: (q, need) => {
      need(Array.isArray(q.items) && q.items.length >= 2, "fewer than 2 items");
      need(Array.isArray(q.answer), "answer must be the ids in order");
      if (!Array.isArray(q.items) || !Array.isArray(q.answer)) return;
      const ids = q.items.map((item) => item.id);
      need(new Set(ids).size === ids.length, "repeated item id");
      need([...ids].sort().join("|") === [...q.answer].sort().join("|"), "answer ids differ from items");
      need(ids.join("|") !== q.answer.join("|"), "items start already in order");
      need(new Set(q.items.map((item) => normaliseAnswer(item.label))).size === ids.length, "repeated label");
      if (q.items.every((item) => isNumber(item.value))) {
        const values = q.items.map((item) => item.value);
        need(new Set(values).size === values.length, "tied values: more than one order is right");
        const byId = new Map(q.items.map((item) => [item.id, item.value]));
        const inAnswer = q.answer.map((id) => byId.get(id));
        const ascending = inAnswer.every((v, i) => i === 0 || v > inAnswer[i - 1]);
        const descending = inAnswer.every((v, i) => i === 0 || v < inAnswer[i - 1]);
        need(ascending || descending, "answer is not in value order");
      }
    },
  },

  /**
   * Tap a word, a sentence or a gap. { tokens, answer: index, mode?
   * ("word" | "gap"), variant? ("sentences"), innerGaps?, pickable?: indices,
   * hinted?: indices underlined by the hint }
   */
  pick: {
    initial: () => null,
    ready: (q, r) => r !== null,
    correct: (q, r) => r === q.answer,
    fill: () => "",
    validate: (q, need) => {
      need(Array.isArray(q.tokens) && q.tokens.length >= 2, "fewer than 2 tokens");
      if (!Array.isArray(q.tokens)) return;
      const gap = q.mode === "gap";
      const low = gap && q.innerGaps ? 1 : 0;
      const high = gap ? (q.innerGaps ? q.tokens.length - 1 : q.tokens.length) : q.tokens.length - 1;
      need(Number.isInteger(q.answer) && q.answer >= low && q.answer <= high, "answer is not a tappable token or gap");
      if (q.pickable) need(q.pickable.includes(q.answer), "answer is not pickable");
      if (q.hinted) need(q.hinted.includes(q.answer) && q.hinted.length >= 2, "hint must underline the answer and another");
    },
  },

  /** Fill the blanks of a number line. { terms, gaps: indices, captions?, highlight? } */
  sequence: {
    initial: (q) => ({ values: {}, active: firstGap(q) }),
    ready: (q, r) => q.gaps.every((gap) => (r.values[gap] ?? "") !== ""),
    correct: (q, r) => q.gaps.every((gap) => isCorrectNumber(r.values[gap] ?? "", q.terms[gap])),
    fill: () => "",
    validate: (q, need) => {
      need(Array.isArray(q.terms) && q.terms.every(isNumber), "terms must be numbers");
      need(Array.isArray(q.gaps) && q.gaps.length >= 1, "no gaps");
      if (!Array.isArray(q.terms) || !Array.isArray(q.gaps)) return;
      need(new Set(q.gaps).size === q.gaps.length, "repeated gap");
      need(q.gaps.every((gap) => Number.isInteger(gap) && gap >= 0 && gap < q.terms.length), "gap outside the line");
      need(q.terms.length - q.gaps.length >= 2, "fewer than two numbers left to read");
      need(q.gaps.every((gap) => isWhole(q.terms[gap])), "a blank's answer must be a whole number");
    },
  },

  /**
   * Read a chart. { chart: { type: "bar" | "pictogram" | "tally", rows:
   * [{ label, value }], step?, unit?, ratio?, symbol?, highlight? }, answer,
   * options?, ask?: { op: "value", label } | { op: "most" | "least" | "total" }
   * | { op: "difference", labels: [a, b] } }. With `ask`, the linter works the
   * answer out from the rows and fails a tie.
   */
  chart: {
    ...readAnswer,
    validate: (q, need) => {
      readAnswer.validate(q, need);
      const chart = q.chart;
      need(chart && ["bar", "pictogram", "tally"].includes(chart.type), "chart.type must be bar, pictogram or tally");
      if (!chart || !Array.isArray(chart.rows)) return need(false, "chart has no rows");
      need(new Set(chart.rows.map((row) => row.label)).size === chart.rows.length, "repeated chart label");
      need(chart.rows.every((row) => isWhole(row.value)), "chart values must be whole numbers");
      if (chart.type === "pictogram") {
        need(isWhole(chart.ratio) && chart.ratio > 0 && isText(chart.symbol), "a pictogram needs ratio and symbol");
        need(chart.rows.every((row) => row.value % chart.ratio === 0), "a pictogram value is not a whole number of symbols");
      }
      if (q.ask) {
        const expected = chartAnswer(chart, q.ask);
        need(expected !== null, "ambiguous: the chart has a tie");
        need(expected === null || expected === q.answer, `answer should be ${expected}`);
      }
    },
  },

  /**
   * A clock. Read: { mode: "read", time: { hour, minute }, answer, options?,
   * label? }. Set: { mode: "set", time, start?: { hour, minute },
   * minuteStep? } — the learner sets the hands with TimeSetter.
   */
  clock: {
    initial: (q) => (q.mode === "set" ? { ...(q.start ?? { hour: 12, minute: 0 }) } : readAnswer.initial(q)),
    ready: (q, r) => (q.mode === "set" ? true : readAnswer.ready(q, r)),
    correct: (q, r) => (q.mode === "set"
      ? r.hour === q.time.hour && r.minute === q.time.minute
      : readAnswer.correct(q, r)),
    fill: (q, r) => (q.mode === "set" ? "" : readAnswer.fill(q, r)),
    validate: (q, need) => {
      need(["read", "set"].includes(q.mode), "clock mode must be read or set");
      const time = q.time;
      need(time && Number.isInteger(time.hour) && time.hour >= 1 && time.hour <= 12, "time.hour must be 1–12");
      need(time && Number.isInteger(time.minute) && time.minute >= 0 && time.minute < 60, "time.minute must be 0–59");
      if (q.mode === "set") {
        const step = q.minuteStep ?? 5;
        need(time && time.minute % step === 0, `time cannot be set in steps of ${step} minutes`);
        const start = q.start ?? { hour: 12, minute: 0 };
        need(!time || start.hour !== time.hour || start.minute !== time.minute, "clock starts at the answer");
      } else {
        readAnswer.validate(q, need);
      }
    },
  },

  /**
   * Coins. Count: { mode: "count", coins: [pence...], answer, options? } —
   * the coins are shown, the learner says the total. Make: { mode: "make",
   * target } — the learner taps coins from CoinTray; any combination that
   * makes the target is right.
   */
  coins: {
    initial: (q) => (q.mode === "make" ? [] : readAnswer.initial(q)),
    ready: (q, r) => (q.mode === "make" ? r.length > 0 : readAnswer.ready(q, r)),
    correct: (q, r) => (q.mode === "make" ? isValidCoinCombination(r, q.target) : readAnswer.correct(q, r)),
    fill: (q, r) => (q.mode === "make" ? "" : readAnswer.fill(q, r)),
    validate: (q, need) => {
      need(["count", "make"].includes(q.mode), "coins mode must be count or make");
      if (q.mode === "make") {
        need(isWhole(q.target) && q.target > 0, "target must be a whole number of pence");
      } else {
        need(Array.isArray(q.coins) && q.coins.length > 0, "no coins to count");
        need(Array.isArray(q.coins) && q.coins.every((coin) => COINS.includes(coin)), "not a UK coin");
        readAnswer.validate(q, need);
        if (Array.isArray(q.coins) && isNumber(q.answer)) need(q.answer === totalOf(q.coins), `answer should be ${totalOf(q.coins)}`);
      }
    },
  },

  /**
   * Fractions. Read: { mode: "read", parts, shaded: count | indices, answer,
   * options? } on a FractionBar. Shade: { mode: "shade", parts, answer:
   * how many parts to shade } on a FractionShadeBoard.
   */
  fraction: {
    initial: (q) => (q.mode === "shade" ? [] : readAnswer.initial(q)),
    ready: (q, r) => (q.mode === "shade" ? r.some(Boolean) : readAnswer.ready(q, r)),
    correct: (q, r) => (q.mode === "shade" ? r.filter(Boolean).length === q.answer : readAnswer.correct(q, r)),
    fill: (q, r) => (q.mode === "shade" ? "" : readAnswer.fill(q, r)),
    validate: (q, need) => {
      need(["read", "shade"].includes(q.mode), "fraction mode must be read or shade");
      need(Number.isInteger(q.parts) && q.parts >= 2 && q.parts <= 12, "parts must be 2–12");
      if (q.mode === "shade") {
        need(Number.isInteger(q.answer) && q.answer >= 1 && q.answer <= q.parts, "answer must be 1–parts");
        return;
      }
      readAnswer.validate(q, need);
      const shaded = shadedSet(q);
      need([...shaded].every((i) => Number.isInteger(i) && i >= 0 && i < q.parts), "shaded part outside the bar");
      const value = fractionValue(q.answer);
      if (value !== null) need(Math.abs(value - shaded.size / q.parts) < 1e-9, "answer does not match the shading");
    },
  },

  /**
   * Base-ten blocks. Read: { mode: "read", blocks: { hundreds, tens, ones },
   * answer, options?, ask?: "value" | "hundreds" | "tens" | "ones" }. Build:
   * { mode: "build", answer, exact? } — the learner adds blocks until they
   * make the answer (with `exact`, digit for digit, no exchanges).
   */
  placeValue: {
    initial: (q) => (q.mode === "build" ? { hundreds: 0, tens: 0, ones: 0 } : readAnswer.initial(q)),
    ready: (q, r) => (q.mode === "build" ? blockValue(r) > 0 : readAnswer.ready(q, r)),
    correct: (q, r) => {
      if (q.mode !== "build") return readAnswer.correct(q, r);
      if (!q.exact) return blockValue(r) === q.answer;
      const want = digitsOf(q.answer);
      return r.hundreds === want.hundreds && r.tens === want.tens && r.ones === want.ones;
    },
    fill: (q, r) => (q.mode === "build" ? "" : readAnswer.fill(q, r)),
    validate: (q, need) => {
      need(["read", "build"].includes(q.mode), "placeValue mode must be read or build");
      if (q.mode === "build") {
        need(isWhole(q.answer) && q.answer > 0 && q.answer < 1000, "answer must be 1–999");
        return;
      }
      need(q.blocks && ["hundreds", "tens", "ones"].every((k) => (q.blocks[k] ?? 0) >= 0), "blocks must be counts");
      readAnswer.validate(q, need);
      if (q.blocks && isNumber(q.answer)) {
        const expected = placeValueAnswer(q);
        need(expected === q.answer, `answer should be ${expected}`);
      }
    },
  },
};

export const KIND_NAMES = Object.keys(KINDS);

const kindOf = (q) => {
  const kind = KINDS[q?.kind];
  if (!kind) throw new Error(`unknown question kind "${q?.kind}"`);
  return kind;
};

export const initialResponse = (q) => kindOf(q).initial(q);
export const isReady = (q, response) => Boolean(kindOf(q).ready(q, response));
export const isCorrect = (q, response) => Boolean(kindOf(q).correct(q, response));
/** The text a sentence's ___ shows for this response ("" for none). */
export const blankFill = (q, response) => kindOf(q).fill(q, response) ?? "";

/**
 * The options to draw. Once the hint is showing, a choice with more than two
 * options loses one wrong option; a choice already down to two never does.
 */
export function visibleOptions(q, hinting) {
  if (!hinting || !q.hint || !(q.options?.length > 2)) return q.options;
  const struck = q.options.find((option) => !optionMatches(q, option));
  return q.options.filter((option) => option !== struck);
}

/** `**bold**` markup → [{ text, bold }] runs. */
export function richRuns(text) {
  return String(text ?? "").split(/\*\*(.+?)\*\*/).map((run, i) => ({ text: run, bold: i % 2 === 1 })).filter((r) => r.text);
}

const plain = (text) => String(text ?? "").replace(/\*\*/g, "");

/** Every piece of text a question shows or speaks, for the spelling checks. */
export function questionText(q) {
  const passage = q.passage ? [q.passage.title, ...(q.passage.blocks ?? []).map((b) => b.text)] : [];
  return [
    q.prompt, q.rule, q.text, q.sentence, q.hint, q.speak, q.spoken, q.label, q.pictureLabel,
    ...[q.equation].flat(), ...passage,
    ...(q.options ?? []).map(String),
    ...(q.tiles ?? []).map((t) => t.label),
    ...(q.cards ?? []).map((c) => c.label),
    ...(q.bins ?? []).map((b) => b.label),
    ...(q.items ?? []).map((i) => i.label),
    ...(q.tokens ?? []),
    ...(q.captions ?? []),
    ...(q.chart?.rows ?? []).map((r) => r.label), q.chart?.unit,
    ...(isNumber(q.answer) ? [] : [q.answer]),
  ].filter((part) => typeof part === "string" && part !== "").map(plain).join(" ");
}

/** Every number a question shows as an option, term or answer. */
function shownNumbers(q) {
  return [
    ...(q.options ?? []).filter(isNumber),
    ...(isNumber(q.answer) ? [q.answer] : []),
    ...(q.terms ?? []).filter(isNumber),
    ...(q.items ?? []).map((item) => item.value).filter(isNumber),
  ];
}

/**
 * Everything that would make `q` unfair or unanswerable, as a list of short
 * strings — empty when it is sound. Pure, so tests can run it over thousands
 * of seeded builds.
 *
 * `context.title`  the challenge title, which can stand in for a prompt
 * `context.year`   the year group; Year 2 must never show a negative number
 */
export function validateQuestion(q, context = {}) {
  const problems = [];
  const need = (ok, message) => {
    if (!ok) problems.push(message);
  };
  if (!q || typeof q !== "object") return ["not a question object"];
  if (!KINDS[q.kind]) return [`unknown kind "${q.kind}"`];

  for (const field of ["prompt", "rule", "text", "hint", "speak", "sentence"]) {
    if (field in q && q[field] !== undefined) need(isText(q[field]), `empty ${field}`);
  }
  if (q.equation !== undefined) need([q.equation].flat().every(isText), "empty equation");
  if (q.picture !== undefined) need(isText(q.picture) && isText(q.pictureLabel), "a picture needs a pictureLabel");
  need(isText(q.prompt) || isText(context.title) || q.equation || isText(q.sentence),
    "nothing tells the learner what to do (no prompt, title, equation or sentence)");
  if (typeof q.sentence === "string") need(q.sentence.split("___").length === 2, "sentence needs exactly one ___");
  for (const field of ["prompt", "rule", "text", "hint"]) {
    if (typeof q[field] === "string") need((q[field].match(/\*\*/g) ?? []).length % 2 === 0, `unbalanced ** in ${field}`);
  }

  KINDS[q.kind].validate(q, need);

  if (context.year !== undefined && context.year <= 2) {
    need(shownNumbers(q).every((n) => n >= 0), "a negative number in a Year 2 question");
  }
  const us = findUsSpellings(questionText(q));
  need(us.length === 0, `US spelling: ${us.join(", ")}`);
  return problems;
}

/**
 * Runs `build(level, rng)` over many seeded rngs and validates every
 * question. Returns problems as "level 2, seed 7, question 3 (choice): …".
 */
export function lintBuild(build, { levels = [1, 2, 3, 4], seeds = 50, titles, year, minQuestions = 3 } = {}) {
  const problems = [];
  for (const level of levels) {
    const title = Array.isArray(titles) ? titles[level - 1] : titles?.[level];
    for (let seed = 1; seed <= seeds; seed += 1) {
      const questions = build(level, seededRng(seed));
      if (!Array.isArray(questions) || questions.length < minQuestions) {
        problems.push(`level ${level}, seed ${seed}: fewer than ${minQuestions} questions`);
        continue;
      }
      questions.forEach((q, i) => {
        for (const problem of validateQuestion(q, { title, year })) {
          problems.push(`level ${level}, seed ${seed}, question ${i + 1} (${q?.kind}): ${problem}`);
        }
      });
    }
  }
  return problems;
}

/** A deterministic () => [0, 1) for seed ≥ 1 (Park–Miller). */
export function seededRng(seed) {
  let state = seed % 2147483647 || 1;
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}
