import test from "node:test";
import assert from "node:assert/strict";
import { FACT_BANK, COMPARE_BANK, DIAGRAM_BANK, ENQUIRY_BANK, CONDITIONS, shadowObservation, buildShadowFormationQuestions, isShadowFormationRecordCorrect, isShadowFormationLabelsCorrect } from "./howShadowsForm.js";
import { shadowTargets } from "./shadowModel.js";
import { assertBankRuns, assertProcessPaths, seededRng, permutations } from "./lightTestHelpers.js";
test("shadow formation banks and runs cover controlled object and lamp comparisons", () => {
  assertBankRuns([FACT_BANK, COMPARE_BANK, DIAGRAM_BANK, ENQUIRY_BANK], buildShadowFormationQuestions);
  for (let seed = 1; seed <= 30; seed++) {
    assert.deepEqual(buildShadowFormationQuestions(4, seededRng(seed)).map(q => q.group).sort(), ["remove", "return", "switch"]);
    for (const q of buildShadowFormationQuestions(4, seededRng(seed))) {
      assert.ok(q.stages.every(s => JSON.stringify(s.geometry) === JSON.stringify(q.stages[0].geometry)));
      assert.ok(q.stages.every(s => q.group === "switch" ? s.blocks : s.on));
    }
  }
});
test("no light and no blocker differ from a cast shadow; opaque means light cannot pass through", () => {
  assert.match(shadowObservation("card", CONDITIONS[0]).text, /blocks light, forming a darker patch/);
  assert.match(shadowObservation("card", CONDITIONS[1]).text, /without this object blocking/);
  assert.match(shadowObservation("card", CONDITIONS[2]).text, /unlit screen is not a cast shadow/);
  assert.ok(FACT_BANK.some(q => q.answer === "Light cannot pass through the object."));
});
test("shadow formation records reject partial, extra, unknown and incorrect observations", () => {
  for (const level of [2, 4]) for (const q of buildShadowFormationQuestions(level, seededRng(9))) {
    assert.equal(isShadowFormationRecordCorrect(q, q.recordExpected), true);
    for (const bad of [null, {}, { ...q.recordExpected, extra: "shadow" }]) assert.equal(isShadowFormationRecordCorrect(q, bad), false);
    for (const c of q.recordCards) {
      const missing = { ...q.recordExpected }; delete missing[c.id]; assert.equal(isShadowFormationRecordCorrect(q, missing), false);
      assert.equal(isShadowFormationRecordCorrect(q, { ...q.recordExpected, [c.id]: q.recordExpected[c.id] === "shadow" ? "none" : "shadow" }), false);
    }
    assert.equal(isShadowFormationRecordCorrect({ ...q, recordCards: q.recordCards.map(() => q.recordCards[0]) }, q.recordExpected), false);
    assert.equal(isShadowFormationRecordCorrect({ ...q, recordCards: q.recordCards.map((c, i) => i ? c : { ...c, id: "unknown" }) }, q.recordExpected), false);
  }
});
test("all shadow labels must occupy their lettered targets", () => {
  for (const q of buildShadowFormationQuestions(3, seededRng(1))) {
    const expected = Object.fromEntries(shadowTargets(q.variant).map(t => [t.id, t.letter]));
    for (const letters of permutations(Object.values(expected))) {
      const record = Object.fromEntries(Object.keys(expected).map((id, i) => [id, letters[i]]));
      assert.equal(isShadowFormationLabelsCorrect(q, record), JSON.stringify(record) === JSON.stringify(expected));
    }
    for (const bad of [null, {}, { ...expected, extra: "D" }, { ...expected, source: "unknown" }]) assert.equal(isShadowFormationLabelsCorrect(q, bad), false);
  }
});
test("shadow formation enquiries guard predictions, inspection, records, conclusions and reset", () => {
  for (let seed = 1; seed <= 12; seed++) for (const q of buildShadowFormationQuestions(4, seededRng(seed))) assertProcessPaths(q, isShadowFormationRecordCorrect);
});
