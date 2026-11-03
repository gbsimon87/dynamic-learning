import test from "node:test";
import assert from "node:assert/strict";
import { mathQuestionModel, wordPartsModel, classificationKeyModel, resultsChartModel } from "./questionVisuals.js";
import { literalPicture, questionPicture } from "./literalPictures.js";
import { TOPIC_KEYS as keys4, buildYear4Math } from "./year4Math/questions.js";
import { TOPIC_KEYS as keys5, buildYear5Math } from "./year5Math/questions.js";
import { seededRng } from "./questionKinds.js";

test("arithmetic pictures retain the givens without computing the displayed answer", () => {
  assert.deepEqual(mathQuestionModel({ prompt: "18 + 7 = ?", answer: 25 }), { type: "parts", a: 18, b: 7, op: "+" });
  assert.deepEqual(mathQuestionModel({ prompt: "8 × 6 = ?" }), { type: "array", rows: 8, columns: 6 });
  assert.deepEqual(mathQuestionModel({ prompt: "96 ÷ 8 = ?" }), { type: "share", total: 96, groups: 8 });
  assert.equal(mathQuestionModel({ prompt: "The story has no supplied quantities.", answer: 100 }), null);
});

test("fraction pictures preserve mixed numbers and skip incomplete or impractically large bars", () => {
  assert.deepEqual(mathQuestionModel({ prompt: "2 3/4 = ?/4" }).fractions, [{ label: "2 3/4", n: 11, d: 4 }]);
  assert.deepEqual(mathQuestionModel({ prompt: "Find the missing numerator: 2/5 = ?/20" }).fractions, [{ label: "2/5", n: 2, d: 5 }]);
  assert.equal(mathQuestionModel({ prompt: "123/1000 = ?" }), null);
  assert.equal(mathQuestionModel({ prompt: "1/0 = ?" }), null);
});

test("comparison charts preserve the supplied order and rounding lines show both neighbours", () => {
  assert.deepEqual(mathQuestionModel({ prompt: "Which number is greater: 432,100 or 420,900?" }).numbers, ["432,100", "420,900"]);
  assert.deepEqual(mathQuestionModel({ prompt: "Which sign makes 4.4 ___ 4.5 true?" }).numbers, ["4.4", "4.5"]);
  assert.deepEqual(mathQuestionModel({ prompt: "Round 4.34 to 1 decimal place." }), { type: "rounding", n: 4.34, low: 4.3, high: 4.4 });
  assert.deepEqual(mathQuestionModel({ prompt: "Round 381,250 to the nearest 1000." }), { type: "rounding", n: 381250, low: 381000, high: 382000 });
});

test("all Years 4–5 maths models are independent of answers, hints and option correctness", () => {
  for (const [keys, build] of [[keys4, buildYear4Math], [keys5, buildYear5Math]]) {
    for (const topic of keys) for (const level of [1, 2, 3, 4]) for (const seed of [1, 7, 23]) {
      for (const q of build(topic, level, seededRng(seed))) {
        const before = JSON.stringify(q), model = mathQuestionModel(q);
        const guarded = { ...q };
        for (const field of ["answer", "hint", "options", "maths"]) Object.defineProperty(guarded, field, { get: () => { throw new Error(`Read hidden ${field}`); } });
        assert.deepEqual(mathQuestionModel(guarded), model, `${topic}/${level}`);
        assert.equal(JSON.stringify(q), before);
        if (model?.type === "rounding") assert.ok(model.low <= model.n && model.n <= model.high && model.high > model.low);
      }
    }
  }
});

test("word-part pictures use quoted roots in the supplied context, leaving the new word unknown", () => {
  assert.deepEqual(wordPartsModel({ text: "‘Phone’ means sound and ‘tele’ means far away.", answer: "telephone" }), null);
  assert.deepEqual(wordPartsModel({ text: "‘Phone’ means sound and ‘tele’ means far away.", visualKind: "wordParts", answer: "telephone" }), ["Phone", "tele"]);
  assert.deepEqual(wordPartsModel({ text: "The root ‘aqua’ means water.", answer: "aquarium" }), ["aqua"]);
  assert.equal(wordPartsModel({ prompt: "What is the root?", answer: "jump" }), null);
});

test("classification diagrams reproduce all branches without choosing a route", () => {
  const text = "Use this key: Has feathers? Yes → robin. No → Has six legs? Yes → beetle. No → Has a shell? Yes → snail. No → earthworm.";
  assert.deepEqual(classificationKeyModel(text), { branches: [
    { question: "Has feathers?", yes: "robin" }, { question: "Has six legs?", yes: "beetle" }, { question: "Has a shell?", yes: "snail" },
  ], no: "earthworm" });
  assert.equal(classificationKeyModel("Use this key: Has feathers? Sometimes → robin."), null);
});

test("literal pictures use whole words and avoid hidden dictation or ambiguous scientific terms", () => {
  assert.equal(literalPicture("Start the race."), null);
  assert.equal(literalPicture("Some animal cells divide."), null);
  assert.equal(literalPicture("The classification key has three questions."), null);
  assert.equal(literalPicture("The crescent moon was visible."), null);
  assert.equal(literalPicture("The battery powers an electrical circuit.").type, "cell");
  assert.equal(questionPicture({ prompt: "Which spelling?", answer: "boat", spoken: "The boat arrived." }), null);
  assert.equal(questionPicture({ sentence: "The ___ landed on the flower." }).type, "flower");
});

test("results charts retain the table's values and unit and keep the scale bounded", () => {
  const model = resultsChartModel({ headings: ["Material", "Melting temperature (°C)"], rows: [["A", 15], ["B", 42], ["C", 68]] });
  assert.equal(model.unit, "Melting temperature (°C)");
  assert.deepEqual(model.bars, [{ label: "A", value: 15 }, { label: "B", value: 42 }, { label: "C", value: 68 }]);
  assert.ok(68 / model.step <= 8);
  assert.equal(resultsChartModel({ headings: ["Material", "Mass", "Temperature"], rows: [["A", 15, 40], ["B", 42, 60]] }), null);
  assert.equal(resultsChartModel({ headings: ["Test", "Result"], rows: [["A", "warm"], ["B", "cold"]] }), null);
});
