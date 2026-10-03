import test from "node:test";
import assert from "node:assert/strict";
import { MATERIALS, FACT_BANK, SORT_BANK, TABLE_BANK, ENQUIRY_BANK, buildMaterialsQuestions, isMaterialsRecordCorrect, isMaterialsSetupCorrect } from "./magneticMaterials.js";
import { initialForcesEnquiry, reduceForcesEnquiry } from "./forcesShared.js";
import { seededRng, assertBankRuns, assertProcessPaths } from "./lightTestHelpers.js";
test("material banks have fifteen distinct samples, guaranteed metal/non-metal counterexamples and deterministic runs", () => {
  assertBankRuns([FACT_BANK, SORT_BANK, TABLE_BANK, ENQUIRY_BANK], buildMaterialsQuestions);
  assert.equal(new Set(MATERIALS.map(s => s.id)).size, 15);
  for (const sample of MATERIALS) assert.equal(sample.attracted, ["iron", "ordinary carbon steel"].includes(sample.material));
  for (let seed = 1; seed <= 30; seed++) {
    const run = buildMaterialsQuestions(1, seededRng(seed));
    assert.ok(run.some(q => q.samples[0].attracted)); assert.ok(run.some(q => q.samples[0].metal && !q.samples[0].attracted)); assert.ok(run.some(q => !q.samples[0].metal));
    for (const level of [2, 3, 4]) for (const q of buildMaterialsQuestions(level, seededRng(seed))) {
      assert.equal(q.samples.length, 3); assert.equal(new Set(q.samples.map(s => s.id)).size, 3);
      assert.ok(q.samples.some(s => s.attracted)); assert.ok(q.samples.some(s => s.metal && !s.attracted)); assert.ok(q.samples.some(s => !s.metal));
      assert.ok(q.stages.every(s => s.text.includes("prepared equal-size piece") && s.text.includes("same classroom magnet, starting gap")));
    }
  }
});
test("material evidence records reject incomplete, duplicated, unknown and incorrect classifications", () => {
  for (const level of [2, 3, 4]) for (let seed = 1; seed <= 12; seed++) for (const q of buildMaterialsQuestions(level, seededRng(seed))) {
    assert.equal(isMaterialsRecordCorrect(q, q.recordExpected), true);
    for (const bad of [null, {}, { ...q.recordExpected, extra: "attracted" }]) assert.equal(isMaterialsRecordCorrect(q, bad), false);
    for (const s of q.samples) { const missing = { ...q.recordExpected }; delete missing[s.id]; assert.equal(isMaterialsRecordCorrect(q, missing), false); assert.equal(isMaterialsRecordCorrect(q, { ...q.recordExpected, [s.id]: s.attracted ? "not-attracted" : "attracted" }), false); }
    assert.equal(isMaterialsRecordCorrect({ ...q, recordCards: q.recordCards.map(() => q.recordCards[0]) }, q.recordExpected), false);
    assert.equal(isMaterialsRecordCorrect({ ...q, samples: q.samples.map((s, i) => i ? s : { ...s, id: "unknown" }) }, q.recordExpected), false);
  }
});
test("material comparisons change only material with size, magnet, gap and method kept fixed", () => {
  for (const q of buildMaterialsQuestions(3, seededRng(2))) {
    assert.equal(isMaterialsSetupCorrect(q, q.setupExpected), true);
    for (const bad of [null, {}, { ...q.setupExpected, extra: "keep" }]) assert.equal(isMaterialsSetupCorrect(q, bad), false);
    for (const id of Object.keys(q.setupExpected)) { const missing = { ...q.setupExpected }; delete missing[id]; assert.equal(isMaterialsSetupCorrect(q, missing), false); assert.equal(isMaterialsSetupCorrect(q, { ...q.setupExpected, [id]: q.setupExpected[id] === "keep" ? "change" : "keep" }), false); }
  }
});
test("material enquiries require fair setup and every sample result, accept ungraded predictions and invalidate reset evidence", () => {
  const reduce = (s, a, q) => reduceForcesEnquiry(s, a, q, isMaterialsRecordCorrect, isMaterialsSetupCorrect);
  for (let seed = 1; seed <= 12; seed++) for (const q of buildMaterialsQuestions(4, seededRng(seed))) assertProcessPaths(q, isMaterialsRecordCorrect, initialForcesEnquiry, reduce, true);
});
