import test from "node:test";
import assert from "node:assert/strict";
import { FACT_BANK, COMPARE_BANK, DIAGRAM_BANK, ENQUIRY_BANK, SURFACES, reflectionPath, reflectionTargets, buildReflectionQuestions, isReflectionRecordCorrect, isReflectionLabelsCorrect } from "./reflectedLight.js";
import { assertBankRuns, assertProcessPaths, seededRng, permutations } from "./lightTestHelpers.js";

test("reflection banks provide unique deterministic runs, clear and non-clear evidence", () => {
  assertBankRuns([FACT_BANK, COMPARE_BANK, DIAGRAM_BANK, ENQUIRY_BANK], buildReflectionQuestions);
  for (let seed = 1; seed <= 50; seed++) {
    assert.deepEqual([...new Set(buildReflectionQuestions(1, seededRng(seed)).map(q => q.surface.clear))].sort(), [false, true]);
    assert.deepEqual(buildReflectionQuestions(4, seededRng(seed)).map(q => q.group).sort(), ["both", "different", "neither"]);
  }
  assert.equal(SURFACES.find(s => s.id === "paper").clear, false);
});
test("selected reflection path has equal heights and a symmetric surface bounce", () => {
  const p = reflectionPath();
  assert.deepEqual(p.source, [70, 150]); assert.deepEqual(p.surface, [180, 80]); assert.deepEqual(p.eye, [290, 150]);
  assert.equal(p.surface[0] - p.source[0], p.eye[0] - p.surface[0]);
  assert.equal(p.source[1], p.eye[1]);
});
test("image records accept both/neither and reject partial, unknown or duplicated evidence", () => {
  for (const level of [2, 4]) for (let seed = 1; seed <= 30; seed++) for (const q of buildReflectionQuestions(level, seededRng(seed))) {
    assert.equal(isReflectionRecordCorrect(q, q.recordExpected), true);
    for (const bad of [null, {}, { ...q.recordExpected, extra: "clear" }]) assert.equal(isReflectionRecordCorrect(q, bad), false);
    for (const c of q.recordCards) {
      const missing = { ...q.recordExpected }; delete missing[c.id]; assert.equal(isReflectionRecordCorrect(q, missing), false);
      assert.equal(isReflectionRecordCorrect(q, { ...q.recordExpected, [c.id]: q.recordExpected[c.id] === "clear" ? "not-clear" : "clear" }), false);
    }
    assert.equal(isReflectionRecordCorrect({ ...q, recordCards: q.recordCards.map(() => q.recordCards[0]) }, q.recordExpected), false);
    assert.ok(q.stages.slice(1).every(s => s.text.includes("reflects light even")));
  }
});
test("reflection labelling accepts only the correct three distinct parts", () => {
  for (const q of buildReflectionQuestions(3, seededRng(7))) {
    const expected = Object.fromEntries(reflectionTargets(q.variant).map(t => [t.id, t.letter]));
    for (const letters of permutations(Object.values(expected))) {
      const placement = Object.fromEntries(Object.keys(expected).map((id, i) => [id, letters[i]]));
      assert.equal(isReflectionLabelsCorrect(q, placement), JSON.stringify(placement) === JSON.stringify(expected));
    }
    for (const bad of [null, {}, { ...expected, extra: "D" }, { ...expected, eye: "unknown" }]) assert.equal(isReflectionLabelsCorrect(q, bad), false);
  }
});
test("reflection enquiries require full evidence and explanation; all predictions and resets are guarded", () => {
  for (let seed = 1; seed <= 12; seed++) for (const q of buildReflectionQuestions(4, seededRng(seed))) assertProcessPaths(q, isReflectionRecordCorrect);
});
