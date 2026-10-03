import test from "node:test";
import assert from "node:assert/strict";
import { SPECIMENS, METHODS, CHOICE_BANK, SORT_BANK, EXPLANATION_BANK, ENQUIRY_BANK, buildSeedDispersalQuestions as build, isSeedRecordCorrect as validate, isSeedExplanationCorrect } from "./seedDispersal.js";
import { initialProcessEnquiry, reduceProcessEnquiry } from "./processEnquiry.js";
function rng(seed) { let value = (seed * 2654435761) >>> 0; return () => { value = (1664525 * value + 1013904223) >>> 0; return value / 2 ** 32; }; }
test("authored banks cover five methods and distinguish observed movement from shape", () => {
  for (const bank of [CHOICE_BANK, SORT_BANK, EXPLANATION_BANK]) assert.equal(bank.length, 15);
  assert.equal(ENQUIRY_BANK.length, 9);
  assert.deepEqual(new Set(SPECIMENS.map((s) => s.method)), new Set(METHODS));
  for (const method of METHODS) assert.equal(SPECIMENS.filter((s) => s.method === method).length, 3);
  for (const s of SPECIMENS) { assert.ok(s.feature && s.movement && s.explanation); assert.ok(!s.feature.includes(s.method)); }
  for (const q of SORT_BANK) { assert.equal(new Set(q.specimens.map((s) => s.id)).size, 3); assert.equal(new Set(q.specimens.map((s) => s.method)).size, 3); }
});
test("sampling is deterministic, unique and reaches every authored item", () => {
  for (const level of [1,2,3,4]) {
    const seen = new Set();
    for (let seed = 0; seed < 150; seed++) {
      const questions = build(level, rng(seed));
      assert.deepEqual(questions, build(level, rng(seed)));
      assert.equal(questions.length, level === 4 ? 3 : 5);
      assert.equal(new Set(questions.map((q) => q.id)).size, questions.length);
      for (const q of questions) {
        seen.add(q.id);
        if (level === 1) { assert.equal(new Set(q.options).size, 5); assert.ok(q.options.includes(q.answer)); }
        if (level >= 3) { assert.equal(new Set(q.tiles.map((t) => t.label)).size, 3); assert.equal(q.tiles.find((t) => t.id === "supported").label, q.explanation); }
        if ([2,4].includes(level)) assert.equal(validate(q, q.recordExpected), true);
      }
      if (level === 4) assert.deepEqual(new Set(questions.map((q) => q.group)), new Set(["Wind", "Animals", "Water"]));
    }
    assert.equal(seen.size, level === 4 ? 9 : 15);
    for (const constant of [0, 0.999999]) assert.equal(build(level, () => constant).length, level === 4 ? 3 : 5);
  }
  assert.throws(() => build(0, rng(1)), RangeError);
});
test("records reject empty, missing, unknown, duplicate and incorrect evidence", () => {
  for (const level of [2,4]) for (const q of build(level, rng(12))) {
    for (const record of [null, {}, { ...q.recordExpected, unknown: "method-0" }, Object.fromEntries(q.recordCards.map((c) => [c.id, "unknown"]))]) assert.equal(validate(q, record), false);
    const missing = { ...q.recordExpected }; delete missing[q.recordCards[0].id]; assert.equal(validate(q, missing), false);
    const wrong = { ...q.recordExpected, [q.recordCards[0].id]: q.recordExpected[q.recordCards[0].id] === "method-4" ? "method-0" : "method-4" }; assert.equal(validate(q, wrong), false);
    assert.equal(validate({ ...q, recordCards: [] }, {}), false);
    assert.equal(validate({ ...q, recordCards: [q.recordCards[0], q.recordCards[0]] }, q.recordExpected), false);
  }
  for (const value of [[], ["unknown"], ["supported", "supported"], ["wrong-0"], null]) assert.equal(isSeedExplanationCorrect(value), false);
  assert.equal(isSeedExplanationCorrect(["supported"]), true);
});
test("all nine enquiries require all observations and correct records before completion", () => {
  for (let seed = 0; seed < 30; seed++) for (const q of build(4, rng(seed))) {
    let state = initialProcessEnquiry();
    const send = (action) => { state = reduceProcessEnquiry(state, { revision: state.revision, version: state.version, ...action }, q, validate); };
    send({ type: "finish" }); assert.equal(state.stage, "prediction");
    send({ type: "predict", value: q.predictionOptions[0] }); send({ type: "start" });
    const before = state; send({ type: "recordStage" }); assert.equal(state, before);
    send({ type: "next" }); send({ type: "next" }); send({ type: "recordStage" });
    send({ type: "checkRecord" }); assert.equal(state.stage, "record");
    for (const card of q.recordCards) send({ type: "record", id: card.id, bin: q.recordExpected[card.id] });
    send({ type: "checkRecord" }); assert.equal(state.stage, "conclusion");
    send({ type: "conclusion", ids: ["wrong-0"] }); send({ type: "finish" }); assert.equal(state.stage, "conclusion");
    send({ type: "conclusion", ids: ["supported"] }); send({ type: "finish" }); assert.equal(state.stage, "done");
    const done = state; send({ type: "reset" }); assert.equal(state, done);
  }
});
test("reset invalidates captured actions and clears downstream evidence without changing source", () => {
  const q = build(4, rng(7))[0]; const original = structuredClone(q);
  let state = initialProcessEnquiry();
  const send = (action) => { state = reduceProcessEnquiry(state, { revision: state.revision, version: state.version, ...action }, q, validate); };
  send({ type: "predict", value: q.predictionOptions[1] }); send({ type: "start" });
  const oldRevision = state.revision; const oldVersion = state.version;
  send({ type: "next" }); const advanced = state;
  send({ type: "next", version: oldVersion }); assert.equal(state, advanced);
  send({ type: "reset" }); assert.equal(state.stage, "prediction"); assert.deepEqual(state.record, {}); assert.deepEqual(state.seen, []); assert.deepEqual(state.conclusion, []);
  const reset = state; send({ type: "start", revision: oldRevision, version: oldVersion }); assert.equal(state, reset);
  assert.deepEqual(q, original);
});
