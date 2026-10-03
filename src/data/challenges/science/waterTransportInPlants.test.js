import test from "node:test";
import assert from "node:assert/strict";
import { ROUTE_BANK, COMPARISON_BANK, SEQUENCE_BANK, INVESTIGATION_BANK, buildWaterTransportInPlantsQuestions, isWaterSequenceCorrect, isWaterRecordCorrect } from "./waterTransportInPlants.js";
import { initialWaterInvestigation, reduceWaterInvestigation } from "./waterInvestigation.js";

function seeded(seed) {
  let value = (seed * 2654435761) >>> 0;
  return () => { value = (value * 1664525 + 1013904223) >>> 0; return value / 4294967296; };
}
const question = buildWaterTransportInPlantsQuestions(4, seeded(4))[0];
const act = (state, action, q = question) => reduceWaterInvestigation(state, { ...action, revision: state.revision, version: state.version }, q);
const recordFor = (q) => Object.fromEntries(q.recordCards.map((card) => [card.id, q.stages.at(-1).marks.includes(card.id) ? "seen" : "not-seen"]));
function atStage(stage, q = question) {
  let state = initialWaterInvestigation();
  if (stage === "prediction") return state;
  state = act(state, { type: "predict", value: q.predictionOptions[2] }, q);
  state = act(state, { type: "start" }, q);
  if (stage === "observe") return state;
  for (let i = 1; i < q.stages.length; i += 1) state = act(state, { type: "next" }, q);
  state = act(state, { type: "recordStage" }, q);
  if (stage === "record") return state;
  for (const [id, bin] of Object.entries(recordFor(q))) state = act(state, { type: "record", id, bin }, q);
  state = act(state, { type: "checkRecord" }, q);
  if (stage === "conclusion") return state;
  state = act(state, { type: "conclusion", ids: ["supported"] }, q);
  return act(state, { type: "finish" }, q);
}
test("three short banks have 15 distinct tasks and nine complete enquiries", () => {
  for (const bank of [ROUTE_BANK, COMPARISON_BANK, SEQUENCE_BANK]) {
    assert.equal(bank.length, 15);
    assert.equal(new Set(bank.map((item) => item.id)).size, 15);
    assert.equal(new Set(bank.map((item) => `${item.prompt}/${item.setup ?? ""}`)).size, 15);
  }
  assert.equal(INVESTIGATION_BANK.length, 9);
  assert.equal(new Set(INVESTIGATION_BANK.map((item) => item.setup)).size, 9);
});
for (const level of [1, 2, 3, 4]) test(`level ${level}: complete options, distinct questions, reproducible sampling and bank coverage`, () => {
  const seen = new Set();
  for (let seed = 0; seed < 100; seed += 1) {
    const run = buildWaterTransportInPlantsQuestions(level, seeded(seed));
    assert.deepEqual(run, buildWaterTransportInPlantsQuestions(level, seeded(seed)));
    assert.equal(run.length, level === 4 ? 3 : 5);
    assert.equal(new Set(run.map((q) => q.id)).size, run.length);
    for (const q of run) {
      seen.add(q.id);
      if (level < 3) {
        assert.equal(new Set(q.options).size, q.options.length);
        assert.equal(q.options.filter((option) => option === q.answer).length, 1);
      } else {
        assert.equal(new Set(q.tiles.map((tile) => tile.id)).size, q.tiles.length);
        assert.equal(new Set(q.tiles.map((tile) => tile.label)).size, q.tiles.length);
      }
      if (level === 3) {
        const expected = q.steps.map((_, index) => `step-${index}`);
        assert.ok(isWaterSequenceCorrect(q, expected));
        for (const wrong of [[], [expected[0]], [...expected, "unknown"], expected.map(() => expected[0]), [...expected].reverse()]) assert.ok(!isWaterSequenceCorrect(q, wrong));
      }
      if (level === 4) {
        assert.equal(new Set(run.map((item) => item.model)).size, 3);
        assert.ok(isWaterRecordCorrect(q, recordFor(q)));
        assert.equal(q.tiles.find((tile) => tile.id === "supported").label, q.conclusion);
        assert.equal(new Set(q.stages.map((stage) => stage.id)).size, 3);
        assert.equal(q.stages[0].marks.length, 0);
        assert.ok(q.stages.at(-1).marks.length > 0);
      }
    }
  }
  assert.equal(seen.size, level === 4 ? 9 : 15);
  for (const rng of [() => 0, () => .999999]) assert.equal(buildWaterTransportInPlantsQuestions(level, rng).length, level === 4 ? 3 : 5);
});
test("records require exactly the known inspected parts; empty, partial, duplicate and unknown records fail", () => {
  for (let seed = 0; seed < 20; seed += 1) for (const q of buildWaterTransportInPlantsQuestions(4, seeded(seed))) {
    const valid = recordFor(q);
    assert.ok(isWaterRecordCorrect(q, valid));
    for (const card of q.recordCards) {
      const missing = { ...valid }; delete missing[card.id];
      assert.ok(!isWaterRecordCorrect(q, missing));
      assert.ok(!isWaterRecordCorrect(q, { ...valid, [card.id]: valid[card.id] === "seen" ? "not-seen" : "seen" }));
    }
    for (const wrong of [null, {}, { ...valid, unknown: "seen" }, { ...valid, [q.recordCards[0].id]: "" }]) assert.ok(!isWaterRecordCorrect(q, wrong));
    assert.ok(!isWaterRecordCorrect({ ...q, recordCards: [] }, {}));
    assert.ok(!isWaterRecordCorrect({ ...q, recordCards: [q.recordCards[0], q.recordCards[0]] }, valid));
  }
});
test("predictions are unrestricted among allowed ideas and skip no observations", () => {
  for (const value of question.predictionOptions) {
    let state = initialWaterInvestigation();
    state = act(state, { type: "predict", value });
    assert.equal(state.stage, "prediction");
    state = act(state, { type: "start" });
    assert.equal(state.stage, "observe");
    assert.deepEqual(state.seen, [0]);
    assert.equal(state.recordChecked, false);
  }
  const state = initialWaterInvestigation();
  assert.equal(act(state, { type: "start" }), state);
  assert.equal(act(state, { type: "predict", value: "unknown" }), state);
});
test("only all observed stages, an exact record and a supported explanation finish a round", () => {
  for (let seed = 0; seed < 15; seed += 1) for (const q of buildWaterTransportInPlantsQuestions(4, seeded(seed))) {
    assert.equal(atStage("done", q).stage, "done");
    for (const stage of ["prediction", "observe", "record"]) {
      const state = atStage(stage, q);
      assert.equal(act(state, { type: "finish" }, q), state);
    }
    let state = atStage("conclusion", q);
    for (const ids of [[], ["air"], ["roots"], ["everything"], ["supported", "air"]]) {
      state = act(state, { type: "conclusion", ids }, q);
      assert.equal(act(state, { type: "finish" }, q), state);
    }
    assert.equal(act(state, { type: "conclusion", ids: ["unknown"] }, q), state);
    assert.equal(act(state, { type: "conclusion", ids: ["supported", "supported"] }, q), state);
  }
});
test("rapid navigation, stale resets, unseen stages and stage skipping are rejected", () => {
  const state = atStage("observe");
  const token = { type: "next", revision: state.revision, version: state.version };
  const next = reduceWaterInvestigation(state, token, question);
  assert.equal(next.observation, 1);
  assert.equal(reduceWaterInvestigation(next, token, question), next);
  assert.equal(reduceWaterInvestigation(next, { ...token, type: "reset" }, question), next);
  assert.equal(act(state, { type: "recordStage" }), state);
  for (const index of [-1, 2, NaN, Infinity, "0"]) assert.equal(act(state, { type: "view", index }), state);
  assert.equal(act(state, { type: "record", id: "stem", bin: "seen" }), state);
});
test("reset clears records, seen observations, explanation and correctness without changing the scenario", () => {
  const copy = structuredClone(question);
  for (const stage of ["observe", "record", "conclusion"]) {
    const before = atStage(stage);
    const reset = act(before, { type: "reset" });
    assert.deepEqual(reset, initialWaterInvestigation(before.revision + 1, before.version + 1));
    for (const type of ["next", "recordStage", "record", "checkRecord", "conclusion", "finish", "reset"]) assert.equal(reduceWaterInvestigation(reset, { type, revision: before.revision, version: before.version, id: "stem", bin: "seen", ids: ["supported"] }, question), reset);
  }
  assert.deepEqual(question, copy);
});
test("viewing earlier observations preserves records; completed rounds cannot be altered", () => {
  const state = atStage("conclusion");
  const old = act(state, { type: "view", index: 0 });
  assert.equal(old.observation, 0);
  assert.deepEqual(old.record, state.record);
  const done = atStage("done");
  for (const type of ["reset", "record", "finish", "conclusion"]) assert.equal(act(done, { type }), done);
});
test("independent science cases distinguish rooted uptake, cut-end uptake and limited evidence", () => {
  assert.equal(ROUTE_BANK[0].answer, "Through its roots.");
  assert.equal(ROUTE_BANK[10].answer, "At the cut end of its stem.");
  assert.deepEqual(INVESTIGATION_BANK[0].stages.at(-1).marks, ["stem", "flower"]);
  assert.deepEqual(INVESTIGATION_BANK[4].stages.at(-1).marks, ["leaves"]);
  assert.deepEqual(INVESTIGATION_BANK[8].stages.at(-1).marks, ["stem"]);
  assert.ok(INVESTIGATION_BANK[8].conclusion.includes("does not show it reached a leaf"));
  for (const q of INVESTIGATION_BANK) for (const stage of q.stages) {
    assert.equal(new Set(stage.marks).size, stage.marks.length);
    assert.ok(stage.marks.every((mark) => mark === "stem" || (q.model === "flower" && mark === "flower") || (q.model === "leafy" && mark === "leaves")));
  }
});
test("unknown levels and empty sequences cannot pass", () => {
  for (const level of [0, 5, NaN, "4"]) assert.throws(() => buildWaterTransportInPlantsQuestions(level, seeded(1)), RangeError);
  assert.ok(!isWaterSequenceCorrect({ steps: [] }, []));
});
