import test from "node:test";
import assert from "node:assert/strict";
import { PREDICT_BANK, COMPARE_BANK, BUILD_BANK, ENQUIRY_BANK, buildPredictionQuestions, isPredictionRecordCorrect, isMagnetBuildCorrect } from "./predictingAttractionAndRepulsion.js";
import { magnetOutcome, oppositePole } from "./magnetModel.js";
import { initialMagnetBuild, reduceMagnetBuild } from "./magnetBuild.js";
import { initialForcesEnquiry, reduceForcesEnquiry } from "./forcesShared.js";
import { seededRng, assertBankRuns, assertProcessPaths } from "./lightTestHelpers.js";
test("prediction banks have replay depth, hidden untested results and independent turn predictions", () => {
  assertBankRuns([PREDICT_BANK, COMPARE_BANK, BUILD_BANK, ENQUIRY_BANK], buildPredictionQuestions);
  assert.equal(PREDICT_BANK.length, 16);
  assert.equal(new Set(ENQUIRY_BANK.map(q => q.pair.left + q.pair.right + q.group)).size, 9);
  for (let seed = 1; seed <= 30; seed++) for (const q of buildPredictionQuestions(1, seededRng(seed))) {
    const left = q.variant === 1 || q.variant === 3 ? oppositePole(q.pair.left) : q.pair.left;
    const right = q.variant === 2 || q.variant === 3 ? oppositePole(q.pair.right) : q.pair.right;
    assert.equal(q.answer.startsWith("Repel"), left === right); assert.equal(q.stages[0].outcome, null);
  }
  for (const q of buildPredictionQuestions(2, seededRng(5))) assert.ok(q.stages.every(s => !s.tested && s.outcome === null));
});
test("every valid requested arrangement is accepted; constraints, incomplete input and stale tests are rejected", () => {
  for (let seed = 1; seed <= 20; seed++) for (const q of buildPredictionQuestions(3, seededRng(seed))) {
    assert.notEqual(magnetOutcome(q.initialPair.left, q.initialPair.right), q.target);
    let accepted = 0;
    for (const left of ["N", "S"]) for (const right of ["N", "S"]) {
      const pair = { left, right }, expected = (left === right ? "repel" : "attract") === q.target && (!q.turnSide || right === q.initialPair.right);
      assert.equal(isMagnetBuildCorrect(q, pair, true), expected); if (expected) accepted++;
      assert.equal(isMagnetBuildCorrect(q, pair, false), false);
    }
    assert.equal(accepted, q.turnSide ? 1 : 2);
    for (const bad of [null, {}, { left: "N" }, { left: "north", right: "S" }, { left: "N", right: "S", extra: true }, Object.create({ left: "N", right: "S" })]) assert.equal(isMagnetBuildCorrect(q, bad, true), false);
  }
});
test("turning invalidates model results before stale checks/runs; rapid turns accumulate and reset invalidates old callbacks", () => {
  const q = buildPredictionQuestions(3, () => .5).find(q => !q.turnSide);
  let s = initialMagnetBuild(q);
  const act = (type, extra = {}) => { s = reduceMagnetBuild(s, { type, ...extra, revision: s.revision, version: s.version }, q); };
  act("check"); assert.equal(s.done, false);
  act("run"); const wrong = s; act("check"); assert.equal(s, wrong);
  const oldCheck = { type: "check", revision: s.revision, version: s.version }, oldRun = { ...oldCheck, type: "run" };
  act("turn", { side: "left" }); assert.equal(s.tested, false);
  assert.equal(reduceMagnetBuild(s, oldCheck, q), s); assert.equal(reduceMagnetBuild(s, oldRun, q), s);
  const turned = s;
  act("reset"); assert.deepEqual(s.pair, q.initialPair); assert.equal(s.tested, false); assert.equal(s.revision, 1);
  assert.equal(reduceMagnetBuild(s, { type: "turn", side: "left", revision: turned.revision, version: turned.version }, q), s);
  const rapid = { type: "turn", side: "left", revision: s.revision, version: s.version };
  s = reduceMagnetBuild(s, rapid, q); s = reduceMagnetBuild(s, rapid, q);
  assert.deepEqual(s.pair, q.initialPair); assert.equal(s.tested, false);
  act("turn", { side: "left" }); act("run"); act("check"); assert.equal(s.done, true);
  const done = s; act("check"); assert.equal(s, done); act("reset"); assert.equal(s, done); act("turn", { side: "left" }); assert.equal(s, done);
  for (const restricted of buildPredictionQuestions(3, () => .5).filter(q => q.turnSide)) {
    const state = initialMagnetBuild(restricted);
    assert.equal(reduceMagnetBuild(state, { type: "turn", side: "right", revision: 0, version: 0 }, restricted), state);
  }
});
test("prediction result records reject partial, extra, duplicate and unknown rows", () => {
  for (const level of [2, 4]) for (const q of buildPredictionQuestions(level, seededRng(3))) {
    assert.equal(isPredictionRecordCorrect(q, q.recordExpected), true);
    for (const bad of [null, {}, { ...q.recordExpected, extra: "repel" }]) assert.equal(isPredictionRecordCorrect(q, bad), false);
    for (const c of q.recordCards) { const missing = { ...q.recordExpected }; delete missing[c.id]; assert.equal(isPredictionRecordCorrect(q, missing), false); assert.equal(isPredictionRecordCorrect(q, { ...q.recordExpected, [c.id]: q.recordExpected[c.id] === "attract" ? "repel" : "attract" }), false); }
    assert.equal(isPredictionRecordCorrect({ ...q, recordCards: q.recordCards.map(() => q.recordCards[0]) }, q.recordExpected), false);
  }
});
test("model enquiry predictions are ungraded; every run and complete evidence are required before completion", () => {
  const reduce = (s, a, q) => reduceForcesEnquiry(s, a, q, isPredictionRecordCorrect);
  for (let seed = 1; seed <= 12; seed++) for (const q of buildPredictionQuestions(4, seededRng(seed))) assertProcessPaths(q, isPredictionRecordCorrect, initialForcesEnquiry, reduce);
});
