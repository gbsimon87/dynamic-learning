import assert from "node:assert/strict";
import { initialProcessEnquiry, reduceProcessEnquiry } from "./processEnquiry.js";

export const seededRng = seed => () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
export function permutations(items) {
  return items.length ? items.flatMap((item, i) => permutations(items.filter((_, j) => j !== i)).map(rest => [item, ...rest])) : [[]];
}
export function assertBankRuns(banks, build, investigation = true) {
  const before = JSON.stringify(banks);
  banks.forEach((bank, i) => { assert.ok(bank.length >= (i === 3 && investigation ? 9 : 15)); assert.equal(new Set(bank.map(q => q.id)).size, bank.length); });
  for (let level = 1; level <= 4; level++) {
    for (const seed of [1, 2, 3, 4, 5, 15, 99, 12345]) {
      const run = build(level, seededRng(seed));
      assert.deepEqual(run, build(level, seededRng(seed)));
      assert.equal(run.length, level === 4 && investigation ? 3 : 5);
      assert.equal(new Set(run.map(q => q.id)).size, run.length);
      for (const q of run) {
        for (const key of ["options", "predictionOptions"]) if (q[key]?.length) assert.equal(new Set(q[key]).size, q[key].length, `${q.id}: ${key}`);
        if (q.options?.length && q.answer) assert.equal(q.options.filter(value => value === q.answer).length, 1, q.id);
        for (const key of ["recordCards", "recordBins", "tiles", "labels", "targets"]) if (q[key]?.length) {
          assert.equal(new Set(q[key].map(c => c.id)).size, q[key].length, `${q.id}: ${key} IDs`);
          assert.equal(new Set(q[key].map(c => c.label)).size, q[key].length, `${q.id}: ${key} labels`);
        }
      }
    }
    for (const value of [0, .5, .999999]) assert.equal(build(level, () => value).length, level === 4 && investigation ? 3 : 5);
  }
  assert.equal(JSON.stringify(banks), before);
  for (const level of [0, 5, "1", null]) assert.throws(() => build(level, seededRng(1)), RangeError);
}
export function assertProcessPaths(question, validate, initial = initialProcessEnquiry, reduce = (state, action, q) => reduceProcessEnquiry(state, action, q, validate), setup = false) {
  for (const prediction of question.predictionOptions) {
    let s = initial();
    const act = (type, extra = {}) => { s = reduce(s, { type, ...extra, revision: s.revision, version: s.version }, question); };
    act("start"); assert.equal(s.stage, "prediction");
    act("predict", { value: "unknown" }); assert.equal(s.prediction, null);
    act("predict", { value: prediction });
    const start = { type: "start", revision: s.revision, version: s.version };
    act("start"); const afterStart = s;
    assert.equal(reduce(s, start, question), afterStart);
    if (setup) {
      assert.equal(s.stage, "setup"); act("next"); assert.equal(s.stage, "setup");
      act("checkSetup"); assert.equal(s.stage, "setup");
      for (const [id, bin] of Object.entries(question.setupExpected)) act("setup", { id, bin });
      const wrong = Object.keys(question.setupExpected)[0];
      act("setup", { id: wrong, bin: question.setupExpected[wrong] === "keep" ? "change" : "keep" });
      act("checkSetup"); assert.equal(s.stage, "setup");
      act("setup", { id: wrong, bin: question.setupExpected[wrong] });
      act("checkSetup"); assert.equal(s.stage, "observe");
      const frozen = s; act("setup", { id: wrong, bin: "change" }); assert.equal(s, frozen);
    }
    assert.equal(s.stage, "observe");
    const first = s; act("recordStage"); assert.equal(s, first); act("view", { index: question.stages.length - 1 }); assert.equal(s, first);
    const next = { type: "next", revision: s.revision, version: s.version };
    act("next"); const afterNext = s; assert.equal(reduce(s, next, question), afterNext);
    act("recordStage"); assert.equal(s.stage, "observe");
    while (s.seen.length < question.stages.length) act("next");
    const stable = JSON.stringify(question.stages);
    act("view", { index: 0 }); act("view", { index: question.stages.length - 1 });
    assert.equal(JSON.stringify(question.stages), stable);
    act("recordStage"); act("checkRecord"); assert.equal(s.stage, "record");
    const beforeInvalid = s; act("record", { id: "unknown", bin: question.recordBins[0].id }); assert.equal(s, beforeInvalid);
    for (const [id, bin] of Object.entries(question.recordExpected)) act("record", { id, bin });
    const recordStage = s;
    act("checkRecord"); assert.equal(s.stage, "conclusion");
    const before = s; act("record", { id: question.recordCards[0].id, bin: null }); assert.equal(s, before);
    act("conclusion", { ids: [question.tiles.find(t => !question.correctConclusionIds.includes(t.id)).id, ...question.correctConclusionIds.slice(1)] });
    act("finish"); assert.equal(s.stage, "conclusion");
    const resetAction = { type: "reset", revision: s.revision, version: s.version };
    const reset = reduce(s, resetAction, question);
    assert.deepEqual(reset, initial(1, s.version + 1));
    assert.equal(reduce(reset, { type: "finish", revision: s.revision, version: s.version }, question), reset);
    assert.equal(reduce(reset, resetAction, question), reset);
    const incomplete = { ...s, record: {}, conclusion: question.correctConclusionIds };
    assert.equal(reduce(incomplete, { type: "finish", revision: s.revision, version: s.version }, question), incomplete);
    assert.equal(validate(question, recordStage.record), true);
    act("conclusion", { ids: question.correctConclusionIds }); act("finish"); assert.equal(s.stage, "done");
    const done = s; act("finish"); assert.equal(s, done); act("reset"); assert.equal(s, done);
  }
}
