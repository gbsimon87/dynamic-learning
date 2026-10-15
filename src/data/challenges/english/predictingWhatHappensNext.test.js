import test from "node:test";
import assert from "node:assert/strict";
import { CAST_NAMES } from "../../english/cast.js";
import { findReadingPassage } from "../../english/passagesReading.js";
import { findUsSpellings, passageText, sentenceCount } from "../../english/textChecks.js";
import { questionProblems, questionText } from "./readingKit.js";
import {
  AVOID_PAIRS,
  CLUE_ITEMS,
  PASSAGE_SETS,
  PREDICTIONS,
  PREDICT_ITEMS,
  buildPredictingQuestions,
} from "./predictingWhatHappensNext.js";

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const flat = (text) => text.toLowerCase().replace(/’/g, "'");

test("banks hold at least 15 items, and three passages", () => {
  assert.ok(PREDICT_ITEMS.length >= 15);
  assert.ok(CLUE_ITEMS.length >= 15);
  assert.ok(PASSAGE_SETS.length >= 6);
  // Level 2: enough prediction pairs for variety, three clues each.
  assert.ok(PREDICTIONS.length >= 6);
  for (const prediction of PREDICTIONS) assert.equal(prediction.clues.length, 3, prediction.id);
});

test("level 1 openings are two or three sentences about the cast, with three distinct options", () => {
  for (const item of PREDICT_ITEMS) {
    const count = sentenceCount(item.text);
    assert.ok(count >= 2 && count <= 3, item.text);
    assert.ok(CAST_NAMES.some((name) => item.text.includes(name)) || /\b(baby bird|traffic light)\b/i.test(item.text), item.text);
    assert.equal(new Set([item.answer, ...item.wrong]).size, 3, item.text);
  }
});

test("level 2: clues are unique across predictions, and avoided pairs exist", () => {
  const clues = PREDICTIONS.flatMap((prediction) => prediction.clues);
  assert.equal(new Set(clues).size, clues.length);
  const ids = PREDICTIONS.map((prediction) => prediction.id);
  for (const pair of AVOID_PAIRS) for (const id of pair) assert.ok(ids.includes(id), id);
});

test("level 3: the clue moves around, and every story has four sentences", () => {
  for (const item of CLUE_ITEMS) {
    assert.equal(item.sentences.length, 4, item.prediction);
    assert.ok(item.answer >= 0 && item.answer < 4);
  }
  assert.ok(new Set(CLUE_ITEMS.map((item) => item.answer)).size >= 3);
});

test("level 4: quoted clues are in the passage, and the answer is in its paragraph", () => {
  for (const set of PASSAGE_SETS) {
    const passage = findReadingPassage(set.passage);
    for (const item of set.questions) {
      assert.equal(new Set([item.answer, ...item.wrong]).size, 3, item.q);
      assert.ok(item.para >= 0 && item.para < passage.blocks.length);
      if (/^Which clue/.test(item.q)) {
        for (const option of [item.answer, ...item.wrong]) assert.ok(flat(passageText(passage)).includes(flat(option)), option);
        assert.ok(flat(passage.blocks[item.para].text).includes(flat(item.answer)), item.answer);
      }
    }
  }
});

test("all text uses British spelling", () => {
  const text = [
    ...PREDICT_ITEMS.flatMap((item) => [item.text, item.answer, ...item.wrong]),
    ...PREDICTIONS.flatMap((prediction) => [prediction.label, ...prediction.clues]),
    ...CLUE_ITEMS.flatMap((item) => [item.prediction, ...item.sentences]),
    ...PASSAGE_SETS.flatMap((set) => set.questions.flatMap((item) => [item.q, item.answer, ...item.wrong])),
  ].join(" ");
  assert.deepEqual(findUsSpellings(text), []);
});

test("every level builds sound questions across 30 seeds", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    for (const level of [1, 2, 3, 4]) {
      const questions = buildPredictingQuestions(level, seeded(seed));
      assert.equal(questions.length, level === 4 ? 4 : 5);
      for (const q of questions) {
        assert.deepEqual(questionProblems(q), [], `level ${level}`);
        assert.deepEqual(findUsSpellings(questionText(q)), []);
      }
      if (level === 2) {
        for (const q of questions) {
          const [a, b] = q.bins.map((bin) => bin.id);
          assert.ok(!AVOID_PAIRS.some(([x, y]) => (x === a && y === b) || (x === b && y === a)), `${a} with ${b}`);
        }
      }
    }
  }
});

test("level 2: a run never shows the same pair twice, and uses every prediction", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    const questions = buildPredictingQuestions(2, seeded(seed));
    const pairs = questions.map((q) => q.bins.map((bin) => bin.id).sort().join("+"));
    assert.equal(new Set(pairs).size, pairs.length, `seed ${seed}`);
    assert.equal(new Set(questions.flatMap((q) => q.bins.map((bin) => bin.id))).size, PREDICTIONS.length, `seed ${seed}`);
  }
});

test("level 3: the clue sits in every one of the four places somewhere in the bank", () => {
  assert.deepEqual([...new Set(CLUE_ITEMS.map((item) => item.answer))].sort(), [0, 1, 2, 3]);
});

test("level 2: constant randomness preserves coverage, distinct pairs and unambiguous clues", () => {
  for (const value of [0, 0.5, 0.999]) {
    const questions = buildPredictingQuestions(2, () => value);
    assert.equal(questions.length, 5);
    const seen = new Set();
    const pairs = new Set();
    const uses = new Map();
    for (const question of questions) {
      assert.deepEqual(questionProblems(question), []);
      const ids = question.bins.map(bin => bin.id);
      assert.equal(new Set(ids).size, 2);
      assert.ok(!AVOID_PAIRS.some(pair => pair.every(id => ids.includes(id))));
      pairs.add([...ids].sort().join("+"));
      for (const id of ids) uses.set(id, (uses.get(id) ?? 0) + 1);
      // Only the final round may reuse a prediction; all others come first.
      if (seen.size < PREDICTIONS.length - 1) for (const id of ids) assert.ok(!seen.has(id));
      ids.forEach(id => seen.add(id));
      for (const card of question.cards) {
        assert.ok(PREDICTIONS.find(item => item.id === card.bin).clues.includes(card.label));
      }
    }
    assert.equal(pairs.size, 5);
    assert.equal(seen.size, PREDICTIONS.length);
    assert.equal([...uses.values()].filter(count => count === 2).length, 1);
    assert.ok([...uses.values()].every(count => count <= 2));
  }
});
