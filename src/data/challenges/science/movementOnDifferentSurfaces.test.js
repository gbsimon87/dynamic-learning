import test from "node:test";
import assert from "node:assert/strict";
import { FACT_BANK, COMPARE_BANK, TABLE_BANK, ENQUIRY_BANK, SCENARIOS, buildMovementQuestions, isMovementRecordCorrect, isMovementSetupCorrect, isMovementTableCorrect } from "./movementOnDifferentSurfaces.js";
import { initialForcesEnquiry, reduceForcesEnquiry, exactRecord } from "./forcesShared.js";
import { seededRng, assertBankRuns, assertProcessPaths } from "./lightTestHelpers.js";
test("movement banks provide fifteen distinct tests and deterministic five/five/five/three runs", () => {
  assertBankRuns([FACT_BANK, COMPARE_BANK, TABLE_BANK, ENQUIRY_BANK], buildMovementQuestions);
  assert.equal(new Set(SCENARIOS.map(s => `${s.toy}/${s.samples.map(x => `${x.label}:${x.distance}`).join()}`)).size, 15);
  for (const s of SCENARIOS) { assert.ok(s.samples.every(x => Number.isInteger(x.distance) && x.distance > 0 && x.distance <= 60)); assert.notEqual(s.samples[0].distance, s.samples[1].distance); }
  for (const q of buildMovementQuestions(1, seededRng(1))) {
    const [a, b] = q.scenario.samples;
    assert.equal(q.answer, a.distance > b.distance ? `Sample A: ${a.label}` : `Sample B: ${b.label}`);
    assert.match(q.stages[0].text, /same ramp position with no extra push/);
  }
});
test("surface records reject missing, extra and incorrect comparisons and do not guess at ties", () => {
  for (const level of [2, 4]) for (let seed = 1; seed <= 20; seed++) for (const q of buildMovementQuestions(level, seededRng(seed))) {
    assert.equal(isMovementRecordCorrect(q, q.recordExpected), true);
    for (const bad of [null, {}, { ...q.recordExpected, extra: "less" }, { ...q.recordExpected, A: "unknown" }]) assert.equal(isMovementRecordCorrect(q, bad), false);
    for (const id of ["A", "B"]) { const missing = { ...q.recordExpected }; delete missing[id]; assert.equal(isMovementRecordCorrect(q, missing), false); assert.equal(isMovementRecordCorrect(q, { ...q.recordExpected, [id]: q.recordExpected[id] === "less" ? "further" : "less" }), false); }
    const tied = { ...q, scenario: { ...q.scenario, samples: q.scenario.samples.map(s => ({ ...s, distance: 30 })) } };
    assert.equal(isMovementRecordCorrect(tied, q.recordExpected), false);
    assert.equal(isMovementRecordCorrect({ ...q, recordCards: q.recordCards.map(() => q.recordCards[0]) }, q.recordExpected), false);
  }
});
test("fair plans require all five factors, with surface the only changed condition", () => {
  const q = buildMovementQuestions(3, seededRng(1))[0];
  assert.equal(isMovementSetupCorrect(q, q.setupExpected), true);
  for (const id of Object.keys(q.setupExpected)) { const missing = { ...q.setupExpected }; delete missing[id]; assert.equal(isMovementSetupCorrect(q, missing), false); assert.equal(isMovementSetupCorrect(q, { ...q.setupExpected, [id]: q.setupExpected[id] === "keep" ? "change" : "keep" }), false); }
  assert.equal(isMovementSetupCorrect(q, { ...q.setupExpected, extra: "keep" }), false);
  for (const q of buildMovementQuestions(3, seededRng(4))) {
    const correct = Object.fromEntries(q.scenario.samples.map(s => [s.id, String(s.distance)]));
    assert.equal(isMovementTableCorrect(q, correct), true);
    for (const bad of [null, {}, { ...correct, extra: "0" }, { ...correct, A: "" }, { ...correct, A: " " }, { ...correct, A: "NaN" }, { ...correct, A: NaN }, { ...correct, A: "-1" }]) assert.equal(isMovementTableCorrect(q, bad), false);
  }
});
test("surface enquiry gates setup, observations, records and explanation; predictions/reset/stale callbacks are guarded", () => {
  const reduce = (s, a, q) => reduceForcesEnquiry(s, a, q, isMovementRecordCorrect, isMovementSetupCorrect);
  for (let seed = 1; seed <= 12; seed++) for (const q of buildMovementQuestions(4, seededRng(seed))) assertProcessPaths(q, isMovementRecordCorrect, initialForcesEnquiry, reduce, true);
});
test("shared exact records reject empty descriptors, unknown IDs and inherited/array records", () => {
  assert.equal(exactRecord([], {}, {}), false);
  assert.equal(exactRecord([{ id: "A" }, { id: "A" }], { A: "yes" }, { A: "yes" }), false);
  assert.equal(exactRecord([{ id: "A" }], { A: "yes" }, Object.create({ A: "yes" })), false);
  assert.equal(exactRecord([{ id: "A" }], { A: "yes" }, []), false);
});
