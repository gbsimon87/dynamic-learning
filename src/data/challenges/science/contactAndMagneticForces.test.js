import test from "node:test";
import assert from "node:assert/strict";
import { FACT_BANK, SORT_BANK, DIAGRAM_BANK, ENQUIRY_BANK, CASES, contactStages, contactTargets, buildContactQuestions, isContactRecordCorrect, isContactLabelsCorrect } from "./contactAndMagneticForces.js";
import { initialForcesEnquiry, reduceForcesEnquiry } from "./forcesShared.js";
import { seededRng, assertBankRuns, assertProcessPaths, permutations } from "./lightTestHelpers.js";
test("contact banks provide deterministic runs and both contact/non-contact evidence", () => {
  assertBankRuns([FACT_BANK, SORT_BANK, DIAGRAM_BANK, ENQUIRY_BANK], buildContactQuestions);
  for (let seed = 1; seed <= 30; seed++) for (const level of [1, 2, 3]) assert.deepEqual([...new Set(buildContactQuestions(level, seededRng(seed)).map(q => q.scene.kind))].sort(), ["contact", "magnetic"]);
  for (let seed = 1; seed <= 30; seed++) assert.deepEqual(buildContactQuestions(4, seededRng(seed)).map(q => q.group).sort(), ["attract", "contact", "repel"]);
});
test("direct force evidence requires touching; all magnetic effects retain a gap and move in the stated direction", () => {
  for (const scene of CASES) {
    const stages = contactStages(scene);
    assert.equal(stages[0].effect, false);
    for (const s of stages.slice(1)) { assert.equal(s.effect, true); assert.equal(s.touching, scene.kind === "contact"); assert.equal(s.gap > 0, scene.kind === "magnetic"); }
    if (scene.kind === "magnetic") {
      const gaps = stages.map(s => s.gap);
      assert.equal(gaps[2] > gaps[1] && gaps[1] > gaps[0], scene.verb === "repels");
      assert.equal(gaps[2] < gaps[1] && gaps[1] < gaps[0], scene.verb === "attracts");
    }
  }
});
test("records reject missing, duplicate, unknown and flipped evidence", () => {
  for (const level of [2, 4]) for (const q of buildContactQuestions(level, seededRng(7))) {
    assert.equal(isContactRecordCorrect(q, q.recordExpected), true);
    for (const bad of [null, {}, { ...q.recordExpected, extra: "gap" }]) assert.equal(isContactRecordCorrect(q, bad), false);
    for (const c of q.recordCards) { const missing = { ...q.recordExpected }; delete missing[c.id]; assert.equal(isContactRecordCorrect(q, missing), false); assert.equal(isContactRecordCorrect(q, { ...q.recordExpected, [c.id]: "unknown" }), false); }
    assert.equal(isContactRecordCorrect({ ...q, recordCards: q.recordCards.map(() => q.recordCards[0]) }, q.recordExpected), false);
  }
});
test("contact/gap labels require the three correct lettered targets", () => {
  for (const q of buildContactQuestions(3, seededRng(4))) {
    const expected = Object.fromEntries(contactTargets(q).map(t => [t.id, t.letter]));
    for (const values of permutations(Object.values(expected))) {
      const record = Object.fromEntries(Object.keys(expected).map((id, i) => [id, values[i]]));
      assert.equal(isContactLabelsCorrect(q, record), JSON.stringify(record) === JSON.stringify(expected));
    }
    for (const bad of [null, {}, { ...expected, extra: "A" }, { ...expected, giver: "unknown" }]) assert.equal(isContactLabelsCorrect(q, bad), false);
  }
});
test("all contact predictions are ungraded; enquiries require inspection, records, explanation and guarded reset", () => {
  const reduce = (s, a, q) => reduceForcesEnquiry(s, a, q, isContactRecordCorrect);
  for (let seed = 1; seed <= 12; seed++) for (const q of buildContactQuestions(4, seededRng(seed))) assertProcessPaths(q, isContactRecordCorrect, initialForcesEnquiry, reduce);
});
