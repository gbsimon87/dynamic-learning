import test from "node:test";
import assert from "node:assert/strict";
import { buildWaterTransportInPlantsQuestions, isWaterSequenceCorrect } from "./waterTransportInPlants.js";
import { buildPollinationAndSeedFormationQuestions, isPollinationSequenceCorrect } from "./pollinationAndSeedFormation.js";
import { buildMusclesQuestions, isMovementExplanationCorrect } from "./musclesAndMovement.js";
import { buildFossilQuestions, isFossilOrderCorrect } from "./howFossilsForm.js";
import { buildSunlightQuestions, isSunlightMessageCorrect } from "./protectingOurEyesFromSunlight.js";
import { buildMovementQuestions, isMovementTableCorrect, isMovementRecordCorrect } from "./movementOnDifferentSurfaces.js";
import { buildWhatPlantsNeedToGrowQuestions, isGrowthRecordCorrect } from "./whatPlantsNeedToGrow.js";
import { buildPolesQuestions } from "./magnetsAndTheirPoles.js";
import { buildPredictionQuestions, isMagnetBuildCorrect } from "./predictingAttractionAndRepulsion.js";

test("ordered Science answers require every tile, including indices skipped by sparse arrays", () => {
  const cases = [
    [buildWaterTransportInPlantsQuestions, isWaterSequenceCorrect, q => q.steps.map((_, i) => `step-${i}`)],
    [buildPollinationAndSeedFormationQuestions, isPollinationSequenceCorrect, q => q.steps.map((_, i) => `step-${i}`)],
    [buildMusclesQuestions, isMovementExplanationCorrect, q => q.correctConclusionIds],
    [buildFossilQuestions, isFossilOrderCorrect, q => q.correctConclusionIds],
    [buildSunlightQuestions, isSunlightMessageCorrect, q => q.correctConclusionIds],
  ];
  for (const [build, validate, expected] of cases) for (const q of build(3, () => .5)) {
    const answer = expected(q);
    assert.equal(validate(q, answer), true, q.id);
    const missing = [...answer];
    delete missing[0];
    for (const bad of [Array(answer.length), missing, answer.map(() => undefined), [...answer].reverse(), [...answer, "unknown"]]) {
      assert.equal(validate(q, bad), false, `${q.id}: incomplete or invalid order`);
    }
  }
});

test("surface records need two distinct A/B samples and finite supported measurements", () => {
  for (const level of [2, 3, 4]) for (const q of buildMovementQuestions(level, () => .5)) {
    const validate = level === 3 ? isMovementTableCorrect : isMovementRecordCorrect;
    const answer = level === 3 ? Object.fromEntries(q.scenario.samples.map(s => [s.id, String(s.distance)])) : q.recordExpected;
    assert.equal(validate(q, answer), true);
    const variants = [[], [q.scenario.samples[0]], [q.scenario.samples[0], q.scenario.samples[0]], q.scenario.samples.map(s => ({ ...s, id: "unknown" })), q.scenario.samples.map(s => ({ ...s, distance: NaN }))];
    for (const samples of variants) assert.equal(validate({ ...q, scenario: { ...q.scenario, samples } }, answer), false);
    assert.equal(validate({ ...q, scenario: { ...q.scenario, samples: [q.scenario.samples[0], q.scenario.samples[0]] } }, { A: String(q.scenario.samples[0].distance), unrelated: "1" }), false);
    assert.equal(validate(q, Object.assign([], answer)), false);
    assert.equal(validate(q, Object.create(answer)), false);
    assert.equal(validate({ ...q, scenario: { ...q.scenario, samples: [...q.scenario.samples].reverse() } }, answer), true);
  }
});

test("plant-height records accept whole decimal cm and reject alternate numeric syntaxes", () => {
  for (const q of buildWhatPlantsNeedToGrowQuestions(4, () => .5)) {
    const heights = q.stages.at(-1).heights;
    const record = Object.fromEntries(Object.entries(heights).map(([id, h]) => [id, String(h)]));
    assert.equal(isGrowthRecordCorrect(q, record), true);
    assert.equal(isGrowthRecordCorrect(q, heights), true);
    for (const [id, height] of Object.entries(heights)) {
      for (const value of [`${height}.0`, `+${height}`, ` ${height} `]) assert.equal(isGrowthRecordCorrect(q, { ...record, [id]: value }), true);
      for (const value of [`0x${height.toString(16)}`, `${height}e0`, `${height}.5`, true, "", " "]) {
        assert.equal(isGrowthRecordCorrect(q, { ...record, [id]: value }), false);
      }
    }
    assert.equal(isGrowthRecordCorrect(q, Object.assign([], record)), false);
    assert.equal(isGrowthRecordCorrect(q, Object.create(record)), false);
  }
});

test("short pole tasks contain no enquiry-only undefined text", () => {
  for (const level of [1, 2, 3, 4]) for (const q of buildPolesQuestions(level, () => .5)) {
    assert.doesNotMatch(JSON.stringify(q), /undefined/);
    assert.equal(q.tiles.length > 0, level === 4);
    assert.equal(q.correctConclusionIds.length > 0, level === 4);
  }
});

test("magnet construction rejects arrays with pole properties", () => {
  for (const q of buildPredictionQuestions(3, () => .5)) {
    const pair = { left: q.target === "repel" ? q.initialPair.right : q.initialPair.right === "N" ? "S" : "N", right: q.initialPair.right };
    assert.equal(isMagnetBuildCorrect(q, pair, true), true);
    assert.equal(isMagnetBuildCorrect(q, Object.assign([], pair), true), false);
  }
});
