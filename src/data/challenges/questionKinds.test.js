import test from "node:test";
import assert from "node:assert/strict";
import {
  KIND_NAMES,
  blankFill,
  chartAnswer,
  fractionValue,
  initialResponse,
  isCorrect,
  isReady,
  lintBuild,
  richRuns,
  seededRng,
  validateQuestion,
  visibleOptions,
} from "./questionKinds.js";

/** One sound question per kind, with a right and a wrong response. */
const SAMPLES = {
  choice: { q: { kind: "choice", prompt: "Which is even?", options: [3, 4, 5], answer: 4, hint: "Even numbers end in 0, 2, 4, 6 or 8." }, right: 4, wrong: 3 },
  number: { q: { kind: "number", equation: "6 × 5 = ?", answer: 30 }, right: "30", wrong: "35" },
  type: { q: { kind: "type", prompt: "Spell the word.", sentence: "I ___ my bike.", answer: "rode" }, right: "rode", wrong: "road" },
  build: {
    q: { kind: "build", prompt: "Build the word.", tiles: [{ id: "a", label: "t" }, { id: "b", label: "a" }, { id: "c", label: "c" }], letters: true, answer: "cat" },
    right: ["c", "b", "a"], wrong: ["a", "b", "c"],
  },
  sort: {
    q: { kind: "sort", prompt: "Sort them.", bins: [{ id: "odd", label: "Odd" }, { id: "even", label: "Even" }], cards: [{ id: "1", label: "1", bin: "odd" }, { id: "2", label: "2", bin: "even" }] },
    right: { 1: "odd", 2: "even" }, wrong: { 1: "even", 2: "odd" },
  },
  order: {
    q: { kind: "order", prompt: "Smallest first.", items: [{ id: "b", label: "20", value: 20 }, { id: "a", label: "5", value: 5 }, { id: "c", label: "31", value: 31 }], answer: ["a", "b", "c"] },
    right: [{ id: "a" }, { id: "b" }, { id: "c" }], wrong: [{ id: "b" }, { id: "a" }, { id: "c" }],
  },
  pick: { q: { kind: "pick", prompt: "Tap the verb.", tokens: ["The", "dog", "ran"], answer: 2 }, right: 2, wrong: 1 },
  sequence: {
    q: { kind: "sequence", prompt: "Fill the gap.", terms: [2, 4, 6, 8], gaps: [2] },
    right: { values: { 2: "6" }, active: 2 }, wrong: { values: { 2: "7" }, active: 2 },
  },
  chart: {
    q: { kind: "chart", prompt: "Which was most popular?", chart: { type: "bar", rows: [{ label: "Red", value: 4 }, { label: "Blue", value: 7 }] }, ask: { op: "most" }, options: ["Red", "Blue"], answer: "Blue" },
    right: "Blue", wrong: "Red",
  },
  clockRead: { q: { kind: "clock", mode: "read", prompt: "What time is it?", time: { hour: 3, minute: 30 }, options: ["half past 3", "3 o’clock"], answer: "half past 3" }, right: "half past 3", wrong: "3 o’clock" },
  clockSet: { q: { kind: "clock", mode: "set", prompt: "Show quarter past 4.", time: { hour: 4, minute: 15 } }, right: { hour: 4, minute: 15 }, wrong: { hour: 4, minute: 45 } },
  coinsCount: { q: { kind: "coins", mode: "count", prompt: "How much?", coins: [20, 20, 5], answer: 45 }, right: "45", wrong: "40" },
  coinsMake: { q: { kind: "coins", mode: "make", prompt: "Make 30p.", target: 30 }, right: [20, 10], wrong: [20, 5] },
  fractionRead: { q: { kind: "fraction", mode: "read", prompt: "What fraction is shaded?", parts: 4, shaded: 3, options: ["3/4", "1/4", "1/2"], answer: "3/4" }, right: "3/4", wrong: "1/4" },
  fractionShade: { q: { kind: "fraction", mode: "shade", prompt: "Shade 2/3.", parts: 3, answer: 2 }, right: [true, true, false], wrong: [true, false, false] },
  placeValueRead: { q: { kind: "placeValue", mode: "read", prompt: "What number?", blocks: { hundreds: 1, tens: 2, ones: 3 }, answer: 123 }, right: "123", wrong: "321" },
  placeValueBuild: { q: { kind: "placeValue", mode: "build", prompt: "Make 42.", answer: 42 }, right: { hundreds: 0, tens: 4, ones: 2 }, wrong: { hundreds: 0, tens: 2, ones: 4 } },
};

test("every kind has a sample, and every sample is sound", () => {
  const covered = new Set(Object.values(SAMPLES).map(({ q }) => q.kind));
  assert.deepEqual([...covered].sort(), [...KIND_NAMES].sort());
  for (const [name, { q }] of Object.entries(SAMPLES)) {
    assert.deepEqual(validateQuestion(q), [], name);
  }
});

test("each kind marks the right response right and the wrong one wrong", () => {
  for (const [name, { q, right, wrong }] of Object.entries(SAMPLES)) {
    assert.equal(isCorrect(q, right), true, `${name}: right`);
    assert.equal(isCorrect(q, wrong), false, `${name}: wrong`);
    assert.equal(isReady(q, right), true, `${name}: ready`);
  }
});

test("a fresh response is not ready to check, except an order (it starts shuffled)", () => {
  for (const [name, { q }] of Object.entries(SAMPLES)) {
    const ready = isReady(q, initialResponse(q));
    assert.equal(ready, q.kind === "order" || (q.kind === "clock" && q.mode === "set"), name);
  }
});

test("unfair questions are caught", () => {
  const problems = (q) => validateQuestion(q).join("; ");
  assert.match(problems({ kind: "choice", prompt: "?", options: [1, 2], answer: 3 }), /answer missing/);
  assert.match(problems({ kind: "choice", prompt: "?", options: [1, 1, 2], answer: 2 }), /duplicate options/);
  assert.match(problems({ kind: "choice", prompt: "?", options: ["1/2", "2/4"], answer: "1/2" }), /same fraction/);
  assert.match(problems({ kind: "order", prompt: "?", items: [{ id: "a", label: "1" }, { id: "b", label: "2" }], answer: ["a", "b"] }), /already in order/);
  assert.match(problems({ kind: "chart", prompt: "?", chart: { type: "bar", rows: [{ label: "A", value: 2 }, { label: "B", value: 2 }] }, ask: { op: "most" }, answer: "A", options: ["A", "B"] }), /tie/);
  assert.match(problems({ kind: "coins", mode: "count", prompt: "?", coins: [20, 3], answer: 23 }), /not a UK coin/);
  assert.match(problems({ kind: "clock", mode: "set", prompt: "?", time: { hour: 12, minute: 0 } }), /starts at the answer/);
  assert.match(problems({ kind: "fraction", mode: "read", prompt: "?", parts: 4, shaded: 1, options: ["1/2", "1/4"], answer: "1/2" }), /does not match/);
  assert.match(problems({ kind: "number", answer: 5 }), /nothing tells the learner/);
  assert.match(problems({ kind: "number", prompt: "What **colour", answer: 5 }), /unbalanced/);
  assert.match(problems({ kind: "number", prompt: "Pick a color.", answer: 5 }), /US spelling/);
  assert.match(validateQuestion({ kind: "choice", prompt: "?", options: [-1, 2], answer: 2 }, { year: 2 }).join(), /negative/);
  assert.match(problems({ kind: "choice", prompt: "?", picture: "🐱", options: ["cat", "cot"], answer: "cat" }), /pictureLabel/);
  assert.deepEqual(validateQuestion({ kind: "choice", prompt: "?", picture: "🐱", pictureLabel: "a cat", options: ["cat", "cot"], answer: "cat" }), []);
  assert.deepEqual(validateQuestion({ kind: "nope" }), ['unknown kind "nope"']);
});

test("a hint strikes one wrong option, never below two", () => {
  const { q } = SAMPLES.choice;
  assert.deepEqual(visibleOptions(q, false), [3, 4, 5]);
  const hinted = visibleOptions(q, true);
  assert.equal(hinted.length, 2);
  assert.ok(hinted.includes(4));
  const two = { ...q, options: [3, 4] };
  assert.deepEqual(visibleOptions(two, true), [3, 4]);
});

test("a sentence's blank shows the response", () => {
  assert.equal(blankFill(SAMPLES.type.q, "rod"), "rod");
  assert.equal(blankFill(SAMPLES.build.q, ["c", "b"]), "ca");
  assert.equal(blankFill(SAMPLES.sort.q, {}), "");
});

test("helpers: bold runs, fraction values, chart answers", () => {
  assert.deepEqual(richRuns("Tap the **verb** now"), [
    { text: "Tap the ", bold: false }, { text: "verb", bold: true }, { text: " now", bold: false },
  ]);
  assert.equal(fractionValue("3/4"), 0.75);
  assert.equal(fractionValue("3/0"), null);
  assert.equal(fractionValue("half"), null);
  const rows = [{ label: "A", value: 3 }, { label: "B", value: 5 }];
  assert.equal(chartAnswer({ rows }, { op: "total" }), 8);
  assert.equal(chartAnswer({ rows }, { op: "difference", labels: ["B", "A"] }), 2);
});

test("lintBuild runs a bank over seeds and levels and names each problem", () => {
  const good = (level, rng) => Array.from({ length: 3 }, () => {
    const a = 1 + Math.floor(rng() * 9);
    return { kind: "number", equation: `${a} + ${level} = ?`, answer: a + level };
  });
  assert.deepEqual(lintBuild(good, { seeds: 10, year: 2 }), []);
  const bad = () => [{ kind: "choice", prompt: "?", options: [1, 2], answer: 3 }];
  const problems = lintBuild(bad, { levels: [1], seeds: 2, minQuestions: 1 });
  assert.equal(problems.length, 2);
  assert.match(problems[0], /^level 1, seed 1, question 1 \(choice\): answer missing/);
});

test("seededRng is deterministic and in [0, 1)", () => {
  const a = seededRng(7);
  const b = seededRng(7);
  for (let i = 0; i < 100; i += 1) {
    const x = a();
    assert.equal(x, b());
    assert.ok(x >= 0 && x < 1);
  }
});

test("capital-letter questions opt into strict case without changing older answers", () => {
  const choice = { kind: "choice", prompt: "Fix the capital letter.",
    caseSensitive: true, answer: "I am here.",
    options: ["i am here.", "I am here.", "I am here?"], hint: "Check the first letter." };
  assert.deepEqual(validateQuestion(choice), []);
  assert.equal(isCorrect(choice, "i am here."), false);
  assert.equal(isCorrect(choice, "I am here."), true);
  assert.ok(visibleOptions(choice, true).includes("I am here."));
  const build = { kind: "build", prompt: "Build the sentence.", caseSensitive: true,
    answer: "I am.", tiles: [{ id: "lower", label: "i" }, { id: "upper", label: "I" }, { id: "verb", label: "am." }] };
  assert.equal(isCorrect(build, ["lower", "verb"]), false);
  assert.equal(isCorrect(build, ["upper", "verb"]), true);
  assert.equal(isCorrect({ ...build, caseSensitive: undefined }, ["lower", "verb"]), true);
  assert.equal(isCorrect({ kind: "type", answer: "who's" }, " WHO’S "), true);
  assert.equal(isCorrect({ kind: "type", answer: "Monday", caseSensitive: true }, "monday"), false);
  assert.equal(isCorrect({ ...choice, caseSensitive: undefined }, "i am here."), true);
  assert.ok(validateQuestion({ ...choice, caseSensitive: undefined }).includes("duplicate options"));
});
