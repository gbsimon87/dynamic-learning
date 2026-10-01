import test from "node:test";
import assert from "node:assert/strict";
import { findUsSpellings } from "../../english/textChecks.js";
import {
  CAUSE_WORDS,
  CHOOSE_ITEMS,
  RECOUNTS,
  STORY_ITEMS,
  TIME_WORDS,
  buildTimeAndCauseQuestions,
  fill,
  isOrderCorrect,
  isSortCorrect,
  signalWords,
  typeOf,
} from "./timeAndCauseWords.js";
import { bareWord } from "./shared.js";

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

test("every bank holds at least 15 items, three times what a run needs", () => {
  for (const bank of [CHOOSE_ITEMS, RECOUNTS, STORY_ITEMS]) assert.ok(bank.length >= 15, bank.length);
  // Level 2 takes ten WHEN and ten WHY sentences per run.
  assert.ok(CHOOSE_ITEMS.filter((item) => item.type === "time").length >= 10);
  assert.ok(CHOOSE_ITEMS.filter((item) => item.type === "cause").length >= 10);
});

test("the Conjunctions topic's words are never answers here", () => {
  const answers = [...CHOOSE_ITEMS, ...STORY_ITEMS].map((item) => item.answer.toLowerCase());
  for (const word of ["when", "if", "because", "although"]) assert.ok(!answers.includes(word), word);
});

test("each sentence has one gap, its type matches its word, and the options are distinct", () => {
  for (const item of CHOOSE_ITEMS) {
    assert.equal(item.sentence.split("___").length, 2, item.sentence);
    assert.equal(typeOf(item.answer), item.type, item.sentence);
    const options = [item.answer, ...item.wrong].map((word) => word.toLowerCase());
    assert.equal(new Set(options).size, options.length, item.sentence);
    for (const word of options) assert.ok(typeOf(word), word);
  }
});

test("a filled sort sentence holds exactly one time or cause word: its own", () => {
  for (const item of CHOOSE_ITEMS) {
    assert.deepEqual(signalWords(fill(item.sentence, item.answer)), [item.answer.toLowerCase()], item.sentence);
  }
});

test("every Year 3 word is an answer somewhere", () => {
  const answers = new Set([...CHOOSE_ITEMS, ...STORY_ITEMS].map((item) => item.answer.toLowerCase()));
  for (const word of [...TIME_WORDS, ...CAUSE_WORDS]) assert.ok(answers.has(word), word);
});

test("recounts: four sentences, the first with no time word, every later one with one", () => {
  for (const recount of RECOUNTS) {
    assert.equal(recount.length, 4);
    assert.equal(new Set(recount).size, 4);
    assert.deepEqual(signalWords(recount[0]), [], recount[0]);
    for (const sentence of recount.slice(1)) {
      const words = sentence.split(/\s+/).map(bareWord);
      assert.ok(signalWords(sentence).length > 0 || words.includes("next"), sentence);
    }
    for (const sentence of recount) assert.match(sentence, /^[A-Z].*\.$/, sentence);
  }
});

test("level 4 answers are one typeable word; the box holds it once", () => {
  for (const item of STORY_ITEMS) {
    assert.match(item.answer, /^[A-Za-z]+$/, item.text);
    assert.equal(item.text.split("___").length, 2, item.text);
    const box = [item.answer, ...item.box].map((word) => word.toLowerCase());
    assert.equal(new Set(box).size, 3, item.text);
    // A capitalised answer starts a sentence; a lower-case one does not.
    const before = item.text.split("___")[0];
    assert.equal(/^[A-Z]/.test(item.answer), before === "" || /[.!?] $/.test(before), item.text);
  }
});

test("all text uses British spelling", () => {
  const text = [
    ...CHOOSE_ITEMS.map((item) => item.sentence),
    ...RECOUNTS.flat(),
    ...STORY_ITEMS.map((item) => item.text),
  ].join(" ");
  assert.deepEqual(findUsSpellings(text), []);
});

test("every level builds five answerable questions", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    const rng = seeded(seed);
    for (const q of buildTimeAndCauseQuestions(1, rng)) {
      assert.equal(q.options.length, 3);
      assert.equal(q.options.filter((option) => option === q.answer).length, 1);
      assert.notEqual(q.struck, q.answer);
    }
    const sorts = buildTimeAndCauseQuestions(2, rng);
    assert.equal(sorts.length, 5);
    assert.equal(new Set(sorts.flatMap((q) => q.cards.map((card) => card.label))).size, 20);
    for (const q of sorts) {
      assert.equal(q.cards.filter((card) => card.bin === "time").length, 2);
      const right = Object.fromEntries(q.cards.map((card) => [card.id, card.bin]));
      assert.ok(isSortCorrect(q, right));
      assert.equal(isSortCorrect(q, {}), false);
    }
    for (const q of buildTimeAndCauseQuestions(3, rng)) {
      const sorted = [...q.items].sort((a, b) => q.answer.indexOf(a.id) - q.answer.indexOf(b.id));
      assert.ok(isOrderCorrect(q, sorted));
      assert.equal(isOrderCorrect(q, q.items), false, "never starts solved");
    }
    for (const q of buildTimeAndCauseQuestions(4, rng)) {
      assert.equal(q.box.filter((word) => word === q.answer).length, 1);
      assert.equal(q.hint.replace(/[ ]/g, "").length, q.answer.length);
    }
  }
});
