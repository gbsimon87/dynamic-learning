import test from "node:test";
import assert from "node:assert/strict";
import { FACT_BANK, COMPARE_BANK, DIAGRAM_BANK, ENQUIRY_BANK, buildPolesQuestions, poleLabelExpected, isPolesRecordCorrect, isPolesLabelsCorrect } from "./magnetsAndTheirPoles.js";
import { magnetOutcome, magnetArrangement, oppositePole } from "./magnetModel.js";
import { initialForcesEnquiry, reduceForcesEnquiry } from "./forcesShared.js";
import { seededRng, assertBankRuns, assertProcessPaths, permutations } from "./lightTestHelpers.js";
test("pole banks provide sixteen meaningful facts, fifteen distinct ordered comparison sets and nine controlled enquiries", () => {
  assertBankRuns([FACT_BANK, COMPARE_BANK, DIAGRAM_BANK, ENQUIRY_BANK], buildPolesQuestions);
  assert.equal(FACT_BANK.length, 16);
  assert.equal(new Set(COMPARE_BANK.map(q => q.pairs.map(p => p.left + p.right).join())).size, 15);
  assert.equal(new Set(ENQUIRY_BANK.map(q => q.pair.left + q.pair.right + q.turn)).size, 9);
  for (let seed = 1; seed <= 30; seed++) {
    const facts = buildPolesQuestions(1, seededRng(seed));
    assert.ok([0, 1, 2].every(variant => facts.some(q => q.variant === variant)));
    assert.deepEqual(buildPolesQuestions(4, seededRng(seed)).map(q => q.group).sort(), ["different-first", "repeat", "same-first"]);
  }
});
test("independent pole truth table and geometry show both poles and correct separation changes", () => {
  for (const [left, right, expected] of [["N", "N", "repel"], ["S", "S", "repel"], ["N", "S", "attract"], ["S", "N", "attract"]]) {
    assert.equal(magnetOutcome(left, right), expected);
    const before = magnetArrangement({ left, right }), after = magnetArrangement({ left, right }, true);
    assert.equal(before.outcome, null); assert.equal(after.outcome, expected);
    assert.equal(after.ends[0].pole, oppositePole(left)); assert.equal(after.ends[1].pole, left); assert.equal(after.ends[2].pole, right); assert.equal(after.ends[3].pole, oppositePole(right));
    assert.deepEqual(after.ends.slice(0, 2).map(e => e.pole).sort(), ["N", "S"]); assert.deepEqual(after.ends.slice(2).map(e => e.pole).sort(), ["N", "S"]);
    const gap = x => x.rightX - x.leftX - x.width;
    assert.ok(gap(after) > 0); assert.equal(gap(after) < gap(before), expected === "attract"); assert.equal(gap(after) > gap(before), expected === "repel");
    assert.notEqual(magnetOutcome(oppositePole(left), right), expected); assert.notEqual(magnetOutcome(left, oppositePole(right)), expected);
  }
  for (const value of [null, undefined, "north", "n", 0, NaN, ""]) { assert.equal(oppositePole(value), null); assert.equal(magnetOutcome(value, "N"), null); assert.equal(magnetOutcome("S", value), null); }
  for (const pair of [null, {}, { left: "N", right: "unknown" }]) assert.equal(magnetArrangement(pair), null);
  assert.equal(magnetArrangement({ left: "N", right: "S" }, "true"), null);
});
test("all four pole labels and every observed outcome are required; duplicate/unknown/partial answers fail", () => {
  for (const q of buildPolesQuestions(3, seededRng(4))) {
    const expected = poleLabelExpected(q);
    for (const values of permutations(Object.values(expected))) {
      const placement = Object.fromEntries(Object.keys(expected).map((id, i) => [id, values[i]]));
      assert.equal(isPolesLabelsCorrect(q, placement), JSON.stringify(placement) === JSON.stringify(expected));
    }
    for (const bad of [null, {}, { ...expected, extra: "A" }, { ...expected, "left-n": "unknown" }]) assert.equal(isPolesLabelsCorrect(q, bad), false);
  }
  for (const level of [2, 3, 4]) for (const q of buildPolesQuestions(level, seededRng(2))) {
    assert.equal(isPolesRecordCorrect(q, q.recordExpected), true);
    for (const bad of [null, {}, { ...q.recordExpected, extra: "attract" }]) assert.equal(isPolesRecordCorrect(q, bad), false);
    for (const c of q.recordCards) { const missing = { ...q.recordExpected }; delete missing[c.id]; assert.equal(isPolesRecordCorrect(q, missing), false); assert.equal(isPolesRecordCorrect(q, { ...q.recordExpected, [c.id]: q.recordExpected[c.id] === "attract" ? "repel" : "attract" }), false); }
    assert.equal(isPolesRecordCorrect({ ...q, recordCards: q.recordCards.map(() => q.recordCards[0]) }, q.recordExpected), false);
  }
});
test("turning changes the outcome, repeating retains it and neither removes either pole", () => {
  for (let seed = 1; seed <= 20; seed++) for (const q of buildPolesQuestions(4, seededRng(seed))) {
    assert.equal(q.stages[0].outcome, null);
    assert.equal(q.stages[1].outcome === q.stages[2].outcome, q.turn === "repeat");
    if (q.turn !== "repeat") assert.equal(q.stages[1].pair[q.turn], oppositePole(q.stages[2].pair[q.turn]));
  }
});
test("pole enquiries require both tested outcomes and complete explanation with guarded predictions/reset", () => {
  const reduce = (s, a, q) => reduceForcesEnquiry(s, a, q, isPolesRecordCorrect);
  for (let seed = 1; seed <= 12; seed++) for (const q of buildPolesQuestions(4, seededRng(seed))) assertProcessPaths(q, isPolesRecordCorrect, initialForcesEnquiry, reduce);
});
