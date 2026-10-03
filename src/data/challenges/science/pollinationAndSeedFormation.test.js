import test from "node:test";
import assert from "node:assert/strict";
import { ROLE_BANK, COMPARISON_BANK, SEQUENCE_BANK, ENQUIRY_BANK, buildPollinationAndSeedFormationQuestions, isPollinationSequenceCorrect, isPollinationRecordCorrect } from "./pollinationAndSeedFormation.js";
import { initialProcessEnquiry, reduceProcessEnquiry } from "./processEnquiry.js";

function seeded(seed) {
  let value = (seed * 2654435761) >>> 0;
  return () => { value = (value * 1664525 + 1013904223) >>> 0; return value / 4294967296; };
}
const q = buildPollinationAndSeedFormationQuestions(4, seeded(4))[0];
const act = (state, action, question = q) => reduceProcessEnquiry(state, { ...action, revision: state.revision, version: state.version }, question, isPollinationRecordCorrect);
function atStage(stage, question = q) {
  let state = initialProcessEnquiry();
  if (stage === "prediction") return state;
  state = act(state, { type: "predict", value: question.predictionOptions[2] }, question);
  state = act(state, { type: "start" }, question);
  if (stage === "observe") return state;
  for (let i = 1; i < question.stages.length; i += 1) state = act(state, { type: "next" }, question);
  state = act(state, { type: "recordStage" }, question);
  if (stage === "record") return state;
  for (const [id, bin] of Object.entries(question.recordExpected)) state = act(state, { type: "record", id, bin }, question);
  state = act(state, { type: "checkRecord" }, question);
  if (stage === "conclusion") return state;
  state = act(state, { type: "conclusion", ids: ["supported"] }, question);
  return act(state, { type: "finish" }, question);
}
test("15 distinct tasks per short bank and nine distinct source enquiries", () => {
  for (const bank of [ROLE_BANK, COMPARISON_BANK, SEQUENCE_BANK]) {
    assert.equal(bank.length, 15);
    assert.equal(new Set(bank.map((item) => item.id)).size, 15);
    assert.equal(new Set(bank.map((item) => `${item.prompt}/${item.setup ?? ""}`)).size, 15);
  }
  assert.equal(ENQUIRY_BANK.length, 9);
  assert.equal(new Set(ENQUIRY_BANK.map((item) => item.setup)).size, 9);
});
for (const level of [1, 2, 3, 4]) test(`level ${level} has deterministic complete runs, unique descriptors and full bank coverage`, () => {
  const seen = new Set();
  for (let seed = 0; seed < 100; seed += 1) {
    const run = buildPollinationAndSeedFormationQuestions(level, seeded(seed));
    assert.deepEqual(run, buildPollinationAndSeedFormationQuestions(level, seeded(seed)));
    assert.equal(run.length, level === 4 ? 3 : 5);
    assert.equal(new Set(run.map((item) => item.id)).size, run.length);
    for (const question of run) {
      seen.add(question.id);
      if (level < 3) {
        assert.equal(new Set(question.options).size, question.options.length);
        assert.equal(question.options.filter((option) => option === question.answer).length, 1);
      } else {
        assert.equal(new Set(question.tiles.map((tile) => tile.id)).size, question.tiles.length);
        assert.equal(new Set(question.tiles.map((tile) => tile.label)).size, question.tiles.length);
      }
      if (level === 3) {
        const correct = question.steps.map((_, index) => `step-${index}`);
        assert.ok(isPollinationSequenceCorrect(question, correct));
        for (const wrong of [[], [correct[0]], correct.map(() => correct[0]), [...correct].reverse(), [...correct, "unknown"]]) assert.ok(!isPollinationSequenceCorrect(question, wrong));
      }
      if (level === 4) {
        assert.equal(new Set(run.map((item) => item.group)).size, 3);
        assert.equal(new Set(question.stages.map((stage) => stage.id)).size, 3);
        assert.equal(question.tiles.find((tile) => tile.id === "supported").label, question.conclusion);
        assert.ok(isPollinationRecordCorrect(question, question.recordExpected));
      }
    }
  }
  assert.equal(seen.size, level === 4 ? 9 : 15);
  for (const rng of [() => 0, () => .999999]) assert.equal(buildPollinationAndSeedFormationQuestions(level, rng).length, level === 4 ? 3 : 5);
});
test("records require both known evidence IDs and reject missing, unknown, empty or duplicate records", () => {
  for (let seed = 0; seed < 12; seed += 1) for (const question of buildPollinationAndSeedFormationQuestions(4, seeded(seed))) {
    const valid = question.recordExpected;
    for (const wrong of [null, {}, { pollination: valid.pollination }, { ...valid, unknown: "shown" }, { ...valid, seeds: "" }, { ...valid, seeds: valid.seeds === "shown" ? "not-shown" : "shown" }]) assert.ok(!isPollinationRecordCorrect(question, wrong));
    assert.ok(!isPollinationRecordCorrect({ ...question, recordCards: [] }, {}));
    assert.ok(!isPollinationRecordCorrect({ ...question, recordCards: [question.recordCards[0], question.recordCards[0]] }, valid));
  }
});
test("any allowed prediction starts observations but no prediction completes assessed work", () => {
  for (const value of q.predictionOptions) {
    let state = initialProcessEnquiry();
    state = act(state, { type: "predict", value });
    assert.equal(state.stage, "prediction");
    state = act(state, { type: "start" });
    assert.equal(state.stage, "observe");
    assert.deepEqual(state.seen, [0]);
    assert.equal(state.recordChecked, false);
  }
  const state = initialProcessEnquiry();
  assert.equal(act(state, { type: "predict", value: "unknown" }), state);
  assert.equal(act(state, { type: "start" }), state);
});
test("all observations, the complete correct record and a supported conclusion are required", () => {
  const covered = new Set();
  for (let seed = 0; seed < 20; seed += 1) for (const question of buildPollinationAndSeedFormationQuestions(4, seeded(seed))) {
    covered.add(question.id);
    assert.equal(atStage("done", question).stage, "done");
    for (const stage of ["prediction", "observe", "record"]) {
      const state = atStage(stage, question);
      assert.equal(act(state, { type: "finish" }, question), state);
    }
    let state = atStage("conclusion", question);
    for (const ids of [[], ["pollen-seeds"], ["instant"], ["roots"], ["supported", "instant"]]) {
      state = act(state, { type: "conclusion", ids }, question);
      assert.equal(act(state, { type: "finish" }, question), state);
    }
    for (const ids of [["unknown"], ["supported", "supported"]]) assert.equal(act(state, { type: "conclusion", ids }, question), state);
  }
  assert.equal(covered.size, 9);
});
test("duplicate transitions, stale resets, unknown record bins and unseen stages are rejected", () => {
  const state = atStage("observe");
  const token = { type: "next", revision: state.revision, version: state.version };
  const next = reduceProcessEnquiry(state, token, q, isPollinationRecordCorrect);
  assert.equal(next.observation, 1);
  for (const action of [token, { ...token, type: "reset" }]) assert.equal(reduceProcessEnquiry(next, action, q, isPollinationRecordCorrect), next);
  assert.equal(act(state, { type: "recordStage" }), state);
  for (const index of [-1, 2, NaN, Infinity, "0"]) assert.equal(act(state, { type: "view", index }), state);
  const record = atStage("record");
  assert.equal(act(record, { type: "record", id: "unknown", bin: "shown" }), record);
  assert.equal(act(record, { type: "record", id: "seeds", bin: "unknown" }), record);
  assert.equal(act(record, { type: "checkRecord" }), record);
});
test("reset invalidates all downstream work and rejects old revision callbacks without rerolling", () => {
  const original = structuredClone(q);
  for (const stage of ["observe", "record", "conclusion"]) {
    const before = atStage(stage);
    const reset = act(before, { type: "reset" });
    assert.deepEqual(reset, initialProcessEnquiry(before.revision + 1, before.version + 1));
    for (const type of ["next", "record", "checkRecord", "conclusion", "finish", "reset"]) assert.equal(reduceProcessEnquiry(reset, { type, revision: before.revision, version: before.version, id: "seeds", bin: "shown", ids: ["supported"] }, q, isPollinationRecordCorrect), reset);
  }
  assert.deepEqual(q, original);
});
test("revisiting a stage preserves records and completed rounds remain immutable", () => {
  const state = atStage("conclusion");
  const previous = act(state, { type: "view", index: 0 });
  assert.equal(previous.observation, 0);
  assert.deepEqual(previous.record, state.record);
  const done = atStage("done");
  for (const type of ["reset", "finish", "record", "conclusion"]) assert.equal(act(done, { type }), done);
});
test("independent biology cases distinguish pollen, seeds, wind transfer and unobserved new seeds", () => {
  assert.equal(ROLE_BANK[1].answer, "Pollen.");
  assert.equal(ROLE_BANK[6].answer, "Wind.");
  assert.ok(ROLE_BANK[12].answer.startsWith("No."));
  assert.deepEqual(ENQUIRY_BANK[0].recordExpected, { pollination: "shown", seeds: "shown" });
  assert.deepEqual(ENQUIRY_BANK[2].recordExpected, { pollination: "shown", seeds: "not-shown" });
  assert.deepEqual(ENQUIRY_BANK[8].recordExpected, { pollination: "not-shown", seeds: "not-shown" });
  assert.ok(ENQUIRY_BANK[2].conclusion.includes("do not show that seeds formed"));
  assert.ok(ENQUIRY_BANK[8].conclusion.includes("do not show new seeds"));
  assert.equal(SEQUENCE_BANK[0].steps.at(-1), "New seeds develop");
});
test("unknown levels and empty sequences cannot start or pass", () => {
  for (const level of [0, 5, NaN, "4"]) assert.throws(() => buildPollinationAndSeedFormationQuestions(level, seeded(1)), RangeError);
  assert.ok(!isPollinationSequenceCorrect({ steps: [] }, []));
  const state = initialProcessEnquiry();
  const predicted = act(state, { type: "predict", value: q.predictionOptions[0] });
  assert.equal(act(predicted, { type: "start" }, { ...q, stages: [] }), predicted);
});
