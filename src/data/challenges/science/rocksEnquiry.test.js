import test from "node:test";
import assert from "node:assert/strict";
import { buildRocksQuestions } from "./comparingAndGroupingRocks.js";
import { initialRocksEnquiry, reduceRocksEnquiry } from "./rocksEnquiry.js";
import { seededRng } from "./lightTestHelpers.js";

function fixture(question, target) {
  let state = initialRocksEnquiry();
  const act = (type, extra = {}) => { state = reduceRocksEnquiry(state, { type, ...extra, revision: state.revision, version: state.version }, question); };
  if (target === "plan") return state;
  act("plan", { value: question.fairAnswer }); act("checkPlan");
  if (target === "prediction") return state;
  act("predict", { value: question.predictionOptions[0] }); act("start");
  if (target === "observe") return state;
  for (let i = 1; i < question.stages.length; i++) act("next");
  act("recordStage");
  if (target === "record") return state;
  for (const [id, bin] of Object.entries(question.recordExpected)) act("record", { id, bin });
  act("checkRecord");
  if (target === "conclusion") return state;
  act("conclusion", { ids: question.correctConclusionIds }); act("finish");
  return state;
}

test("rock enquiry requires a fair plan before predicting or inspecting evidence", () => {
  for (const q of buildRocksQuestions(4, seededRng(2))) {
    const initial = initialRocksEnquiry(), action = { revision: 0, version: 0 };
    for (const type of ["predict", "start", "next", "recordStage", "checkRecord", "finish"]) assert.equal(reduceRocksEnquiry(initial, { ...action, type, value: q.predictionOptions[0] }, q), initial);
    assert.equal(reduceRocksEnquiry(initial, { ...action, type: "plan", value: "unknown" }, q), initial);
    for (const value of q.fairOptions.filter(value => value !== q.fairAnswer)) {
      const wrong = reduceRocksEnquiry(initial, { ...action, type: "plan", value }, q);
      assert.equal(reduceRocksEnquiry(wrong, { ...action, type: "checkPlan" }, q), wrong);
    }
    const correct = reduceRocksEnquiry(initial, { ...action, type: "plan", value: q.fairAnswer }, q);
    const accepted = reduceRocksEnquiry(correct, { ...action, type: "checkPlan" }, q);
    assert.equal(accepted.stage, "prediction");
    assert.equal(reduceRocksEnquiry(accepted, { ...action, type: "checkPlan" }, q), accepted);
    assert.equal(reduceRocksEnquiry(accepted, { ...action, type: "plan", value: q.fairOptions.find(value => value !== q.fairAnswer) }, q), accepted);
  }
});

test("rock resets clear plan and evidence atomically; stale resets preserve both", () => {
  for (const q of buildRocksQuestions(4, seededRng(3))) for (const stage of ["plan", "prediction", "observe", "record", "conclusion"]) {
    const state = fixture(q, stage);
    assert.equal(state.stage, stage);
    const stale = { type: "reset", revision: state.revision, version: state.version - 1 };
    assert.equal(reduceRocksEnquiry(state, stale, q), state);
    const resetAction = { type: "reset", revision: state.revision, version: state.version };
    const reset = reduceRocksEnquiry(state, resetAction, q);
    assert.deepEqual(reset, initialRocksEnquiry(state.revision + 1, state.version + 1));
    for (const type of ["reset", "plan", "checkPlan", "start", "next", "recordStage", "record", "checkRecord", "conclusion", "finish"]) {
      assert.equal(reduceRocksEnquiry(reset, { ...resetAction, type, value: q.fairAnswer, ids: q.correctConclusionIds }, q), reset);
    }
  }
});

test("rock completion requires current checked evidence and protects completed rounds", () => {
  for (const q of buildRocksQuestions(4, seededRng(4))) {
    const conclusion = fixture(q, "conclusion");
    const incomplete = { ...conclusion, record: {}, conclusion: q.correctConclusionIds };
    assert.equal(reduceRocksEnquiry(incomplete, { type: "finish", revision: incomplete.revision, version: incomplete.version }, q), incomplete);
    const uncheckedPlan = { ...conclusion, fairChoice: null, conclusion: q.correctConclusionIds };
    assert.equal(reduceRocksEnquiry(uncheckedPlan, { type: "finish", revision: uncheckedPlan.revision, version: uncheckedPlan.version }, q), uncheckedPlan);
    const done = fixture(q, "done");
    assert.equal(done.stage, "done");
    for (const type of ["reset", "plan", "finish"]) assert.equal(reduceRocksEnquiry(done, { type, revision: done.revision, version: done.version }, q), done);
  }
});
