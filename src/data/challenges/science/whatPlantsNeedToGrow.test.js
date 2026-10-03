import test from "node:test";
import assert from "node:assert/strict";
import { buildWhatPlantsNeedToGrowQuestions, NEEDS, REQUIREMENT_BANK, COMPARISON_BANK, FAIR_TEST_BANK, INVESTIGATION_BANK, isFairTestCorrect, isGrowthRecordCorrect } from "./whatPlantsNeedToGrow.js";
import { initialGrowthInvestigation, reduceGrowthInvestigation } from "./growthInvestigation.js";

function seeded(seed) {
  let value = (seed * 2654435761) >>> 0;
  return () => { value = (value * 1664525 + 1013904223) >>> 0; return value / 4294967296; };
}
const q = buildWhatPlantsNeedToGrowQuestions(4, seeded(7))[0];
const correctSetup = (question) => Object.fromEntries(question.cards.map((card) => [card.id, card.id === question.factor ? "change" : "keep"]));
const correctRecord = (question) => Object.fromEntries(Object.entries(question.stages.at(-1).heights).map(([id, height]) => [id, String(height)]));
const act = (state, action, question = q) => reduceGrowthInvestigation(state, { ...action, revision: state.revision, version: state.version }, question);
function atStage(stage, question = q) {
  let state = initialGrowthInvestigation();
  if (stage === "prediction") return state;
  state = act(state, { type: "predict", value: question.predictionOptions[3] }, question);
  state = act(state, { type: "start" }, question);
  if (stage === "setup") return state;
  for (const [id, bin] of Object.entries(correctSetup(question))) state = act(state, { type: "place", id, bin }, question);
  state = act(state, { type: "checkSetup" }, question);
  if (stage === "observe") return state;
  for (let i = 1; i < question.stages.length; i += 1) state = act(state, { type: "nextObservation" }, question);
  state = act(state, { type: "recordStage" }, question);
  if (stage === "record") return state;
  for (const [id, value] of Object.entries(correctRecord(question))) state = act(state, { type: "record", id, value }, question);
  state = act(state, { type: "checkRecord" }, question);
  if (stage === "conclusion") return state;
  state = act(state, { type: "conclusion", ids: ["conclusion-0"] }, question);
  return act(state, { type: "finish" }, question);
}

test("banks contain 15 short tasks per level and nine complete investigation scenarios", () => {
  for (const bank of [REQUIREMENT_BANK, COMPARISON_BANK, FAIR_TEST_BANK]) {
    assert.equal(bank.length, 15);
    assert.equal(new Set(bank.map((item) => item.id)).size, 15);
    assert.equal(new Set(bank.map((item) => `${item.prompt}/${item.guide ?? item.comparison ?? item.evidence}`)).size, 15);
  }
  assert.equal(INVESTIGATION_BANK.length, 9);
  assert.equal(new Set(INVESTIGATION_BANK.map((item) => item.comparison)).size, 9);
});
for (const level of [1, 2, 3, 4]) test(`level ${level} has reproducible distinct questions and complete, unique descriptors`, () => {
  const seen = new Set();
  for (let seed = 0; seed < 100; seed += 1) {
    const questions = buildWhatPlantsNeedToGrowQuestions(level, seeded(seed));
    assert.deepEqual(questions, buildWhatPlantsNeedToGrowQuestions(level, seeded(seed)));
    assert.equal(questions.length, level === 4 ? 3 : 5);
    assert.equal(new Set(questions.map((question) => question.id)).size, questions.length);
    assert.equal(new Set(questions.map((question) => question.need ?? question.factor)).size, questions.length);
    for (const question of questions) {
      seen.add(question.id);
      if (level < 3) {
        assert.equal(new Set(question.options).size, question.options.length);
        assert.equal(question.options.filter((option) => option === question.answer).length, 1);
      } else {
        assert.equal(new Set(question.cards.map((card) => card.id)).size, 7);
        assert.equal(new Set(question.cards.map((card) => card.label)).size, 7);
        assert.ok(isFairTestCorrect(question, correctSetup(question)));
      }
      if (level === 4) {
        assert.equal(new Set(question.tiles.map((tile) => tile.label)).size, 4);
        assert.equal(question.tiles.find((tile) => tile.id === "conclusion-0").label, question.conclusion);
        assert.equal(question.stages.length, 3);
        assert.equal(new Set(question.stages.map((stage) => stage.id)).size, 3);
        assert.equal(question.stages[0].heights.A, question.stages[0].heights.B);
        assert.ok(isGrowthRecordCorrect(question, correctRecord(question)));
      }
    }
  }
  assert.equal(seen.size, level === 4 ? 9 : 15);
  for (const rng of [() => 0, () => .999999]) assert.equal(buildWhatPlantsNeedToGrowQuestions(level, rng).length, level === 4 ? 3 : 5);
});
test("fair-test validator rejects blank, missing, unknown and incorrectly changed conditions", () => {
  const valid = correctSetup(q);
  assert.ok(!isFairTestCorrect({ ...q, cards: [] }, {}));
  assert.ok(!isFairTestCorrect({ ...q, cards: q.cards.map(() => q.cards[0]) }, valid));
  for (const wrong of [null, {}, { ...valid, water: "unknown" }, { ...valid, unknown: "keep" }, Object.fromEntries(q.cards.map((card) => [card.id, "keep"]))]) assert.ok(!isFairTestCorrect(q, wrong));
  for (const card of q.cards) { const partial = { ...valid }; delete partial[card.id]; assert.ok(!isFairTestCorrect(q, partial)); }
});
test("record requires both displayed final heights, rejecting blank, unknown and non-finite values", () => {
  const valid = correctRecord(q);
  assert.ok(!isGrowthRecordCorrect({ ...q, stages: [] }, valid));
  for (const wrong of [null, {}, { A: valid.A }, { ...valid, B: "" }, { ...valid, B: " " }, { ...valid, B: NaN }, { ...valid, B: Infinity }, { ...valid, B: true }, { ...valid, unknown: 1 }, { ...valid, B: Number(valid.B) + 1 }]) assert.ok(!isGrowthRecordCorrect(q, wrong));
});
test("predictions accept every offered idea, never observations or completion", () => {
  for (const value of q.predictionOptions) {
    let state = initialGrowthInvestigation();
    state = act(state, { type: "predict", value });
    assert.equal(state.stage, "prediction");
    state = act(state, { type: "start" });
    assert.equal(state.stage, "setup");
    assert.equal(state.setupChecked, false);
    assert.deepEqual(state.seen, []);
  }
  const state = initialGrowthInvestigation();
  assert.equal(act(state, { type: "predict", value: "unknown" }), state);
  assert.equal(act(state, { type: "start" }), state);
});
test("each scenario advances only through complete setup, all observations, exact record and supported conclusion", () => {
  for (const question of INVESTIGATION_BANK) {
    const built = { ...question, cards: buildWhatPlantsNeedToGrowQuestions(3, seeded(1))[0].cards, tiles: question.conclusionOptions.map((label, index) => ({ id: `conclusion-${index}`, label })) };
    assert.equal(atStage("done", built).stage, "done");
    for (const stage of ["prediction", "setup", "observe", "record"]) {
      const state = atStage(stage, built);
      assert.equal(act(state, { type: "finish" }, built), state);
    }
    let state = atStage("conclusion", built);
    for (const ids of [[], ["conclusion-1"], ["conclusion-2"], ["conclusion-3"], ["conclusion-0", "conclusion-1"]]) {
      state = act(state, { type: "conclusion", ids }, built);
      assert.equal(act(state, { type: "finish" }, built), state);
    }
  }
});
test("duplicate and stale transitions cannot skip stages or advance observations twice", () => {
  let state = atStage("setup");
  for (const [id, bin] of Object.entries(correctSetup(q))) state = act(state, { type: "place", id, bin });
  const token = { type: "checkSetup", revision: state.revision, version: state.version };
  const observed = reduceGrowthInvestigation(state, token, q);
  assert.equal(observed.stage, "observe");
  assert.equal(reduceGrowthInvestigation(observed, token, q), observed);
  const nextToken = { type: "nextObservation", revision: observed.revision, version: observed.version };
  const next = reduceGrowthInvestigation(observed, nextToken, q);
  assert.equal(next.observation, 1);
  assert.equal(reduceGrowthInvestigation(next, nextToken, q), next);
  assert.equal(reduceGrowthInvestigation(next, { ...nextToken, type: "reset" }, q), next);
  assert.equal(act(observed, { type: "recordStage" }), observed);
  assert.equal(act(observed, { type: "viewObservation", index: 2 }), observed);
  assert.equal(act(observed, { type: "viewObservation", index: -1 }), observed);
  assert.equal(act(observed, { type: "viewObservation", index: Infinity }), observed);
});
test("reset invalidates all downstream work and rejects callbacks from the previous revision", () => {
  for (const stage of ["setup", "observe", "record", "conclusion"]) {
    const before = atStage(stage);
    const reset = act(before, { type: "reset" });
    assert.deepEqual(reset, initialGrowthInvestigation(before.revision + 1, before.version + 1));
    for (const type of ["checkSetup", "nextObservation", "recordStage", "record", "checkRecord", "conclusion", "finish", "reset"]) assert.equal(reduceGrowthInvestigation(reset, { type, revision: before.revision, version: before.version, id: "A", value: "8", ids: ["conclusion-0"] }, q), reset);
  }
});
test("completed rounds are immutable and viewing old observations does not change assessed data", () => {
  const done = atStage("done");
  for (const type of ["reset", "finish", "record", "conclusion"]) assert.equal(act(done, { type }), done);
  const state = atStage("conclusion");
  const previous = act(state, { type: "viewObservation", index: 0 });
  assert.equal(previous.observation, 0);
  assert.deepEqual(previous.record, state.record);
  assert.deepEqual(previous.placement, state.placement);
});
test("independent observation cases include both directions and a tie; conclusions agree with measured growth", () => {
  assert.deepEqual(INVESTIGATION_BANK[0].stages.at(-1).heights, { A: 8, B: 5 });
  assert.deepEqual(INVESTIGATION_BANK[1].stages.at(-1).heights, { A: 4, B: 7 });
  assert.deepEqual(INVESTIGATION_BANK[4].stages.at(-1).heights, { A: 6, B: 6 });
  for (const question of INVESTIGATION_BANK) {
    const first = question.stages[0].heights;
    const last = question.stages.at(-1).heights;
    const aGrowth = last.A - first.A;
    const bGrowth = last.B - first.B;
    assert.equal(question.conclusion, aGrowth === bGrowth ? "Both grew equally in this comparison." : aGrowth > bGrowth ? "A grew more than B in this comparison." : "B grew more than A in this comparison.");
    assert.ok(question.conclusion.includes("in this comparison"));
  }
  assert.deepEqual(NEEDS.map((need) => need.id), ["air", "light", "water", "nutrients", "room"]);
});
test("unknown levels are rejected", () => {
  for (const level of [0, 5, NaN, "4"]) assert.throws(() => buildWhatPlantsNeedToGrowQuestions(level, seeded(1)), RangeError);
});
