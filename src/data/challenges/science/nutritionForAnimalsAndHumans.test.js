import test from "node:test";
import assert from "node:assert/strict";
import { FACT_BANK, SOURCES, DIET_CARDS, SORT_BANK, FOOD_GROUPS, MEAL_BANK, ENQUIRY_BANK, buildNutritionQuestions as build, isNutritionMealCorrect as mealCorrect, isNutritionRecordCorrect as recordCorrect } from "./nutritionForAnimalsAndHumans.js";
import { initialProcessEnquiry, reduceProcessEnquiry } from "./processEnquiry.js";
function rng(seed) { let value = (seed * 2654435761) >>> 0; return () => { value = (1664525 * value + 1013904223) >>> 0; return value / 2 ** 32; }; }
test("nutrition banks have source attribution, distinct tasks and both type/amount coverage", () => {
  assert.equal(FACT_BANK.length, 18);
  for (const bank of [FACT_BANK, SORT_BANK, MEAL_BANK]) { assert.ok(bank.length >= 15); assert.equal(new Set(bank.map((q) => q.id)).size, bank.length); }
  assert.equal(ENQUIRY_BANK.length, 9);
  for (const source of Object.values(SOURCES)) assert.ok(source.url.startsWith("https://"));
  for (const fact of FACT_BANK) { assert.ok(SOURCES[fact.source]); assert.equal(new Set(fact.options).size, 3); assert.equal(fact.options.filter((option) => option === fact.answer).length, 1); }
  assert.equal(new Set(SORT_BANK.map((q) => q.cards.map((c) => c.id).join())).size, 15);
  assert.equal(new Set(SORT_BANK.flatMap((q) => q.cards.map((c) => c.id))).size, DIET_CARDS.length);
  for (const q of SORT_BANK) { assert.equal(new Set(q.cards.map((c) => c.id)).size, 3); assert.deepEqual(new Set(q.cards.map((c) => c.bin)), new Set(["plants", "animals", "both"])); }
  for (const q of ENQUIRY_BANK) { assert.equal(q.stages.length, 2); for (const stage of q.stages) assert.ok(SOURCES[stage.source]); }
});
test("deterministic runs have five short tasks or three complete research rounds and reach every bank item", () => {
  for (const level of [1,2,3,4]) {
    const seen = new Set();
    for (let seed = 0; seed < 150; seed++) {
      const questions = build(level, rng(seed)); assert.deepEqual(questions, build(level, rng(seed)));
      assert.equal(questions.length, level === 4 ? 3 : 5); assert.equal(new Set(questions.map((q) => q.id)).size, questions.length);
      if (level === 1 || level === 4) assert.deepEqual(new Set(questions.map((q) => q.group)), new Set(["source", "types", "amount"]));
      for (const q of questions) {
        seen.add(q.id);
        if (level === 1) assert.ok(q.options.includes(q.answer));
        if ([2,4].includes(level)) assert.equal(recordCorrect(q, q.recordExpected), true);
        if (level === 4) { assert.equal(new Set(q.tiles.map((t) => t.label)).size, 3); assert.equal(q.tiles.find((t) => t.id === "supported").label, q.conclusion); }
      }
    }
    assert.equal(seen.size, level === 4 ? 9 : level === 1 ? 18 : 15);
    for (const constant of [0, 0.999999]) assert.equal(build(level, () => constant).length, level === 4 ? 3 : 5);
  }
  assert.throws(() => build(5, rng(1)), RangeError);
});
test("every valid model menu combination and either order is accepted; correct total alone is insufficient", () => {
  for (const q of MEAL_BANK) {
    let solutions = 0;
    for (let mask = 0; mask < 2 ** q.foods.length; mask++) {
      const foods = q.foods.filter((_, index) => mask & (1 << index));
      const expected = FOOD_GROUPS.every((group) => foods.filter((food) => food.group === group.id).length === q.requirements[group.id]);
      const ids = foods.map((food) => food.id);
      assert.equal(mealCorrect(q, ids), expected); assert.equal(mealCorrect(q, [...ids].reverse()), expected);
      if (expected) solutions++;
    }
    assert.ok(solutions >= 2, q.id);
  }
  const q = MEAL_BANK[0];
  for (const ids of [null, [], ["unknown"], ["food-0-0", "food-0-0", "food-2-0"], ["food-0-0", "food-0-1", "food-1-0"]]) assert.equal(mealCorrect(q, ids), false);
  assert.equal(mealCorrect({ ...q, requirements: {} }, []), false);
  assert.equal(mealCorrect({ ...q, requirements: { starchy: 0, protein: 0, produce: 0 } }, []), false);
  assert.equal(mealCorrect({ ...q, foods: [] }, []), false);
  assert.equal(mealCorrect({ ...q, requirements: { ...q.requirements, starchy: NaN } }, []), false);
  assert.equal(mealCorrect({ ...q, requirements: { ...q.requirements, unknown: 1 } }, []), false);
});
test("record validation rejects missing, extra, duplicate, unknown and wrong evidence", () => {
  for (const level of [2,4]) for (const q of build(level, rng(7))) {
    for (const record of [null, {}, { ...q.recordExpected, unknown: "supported" }, Object.fromEntries(q.recordCards.map((c) => [c.id, "unknown"]))]) assert.equal(recordCorrect(q, record), false);
    const missing = { ...q.recordExpected }; delete missing[q.recordCards[0].id]; assert.equal(recordCorrect(q, missing), false);
    const wrong = { ...q.recordExpected, [q.recordCards[0].id]: q.recordBins.find((b) => b.id !== q.recordExpected[q.recordCards[0].id]).id }; assert.equal(recordCorrect(q, wrong), false);
    assert.equal(recordCorrect({ ...q, recordCards: [] }, {}), false);
    assert.equal(recordCorrect({ ...q, recordCards: q.recordCards.map(() => q.recordCards[0]) }, q.recordExpected), false);
    assert.equal(recordCorrect({ ...q, level: 1 }, q.recordExpected), false);
  }
});
test("claim checks have independently reviewed supported and unsupported patterns", () => {
  assert.deepEqual(ENQUIRY_BANK.map((q) => Object.values(q.recordExpected)), [
    ["supported", "not-supported"], ["supported", "not-supported"], ["supported", "supported"],
    ["not-supported", "not-supported"], ["supported", "not-supported"], ["supported", "not-supported"],
    ["supported", "not-supported"], ["not-supported", "not-supported"], ["supported", "not-supported"],
  ]);
  assert.ok(ENQUIRY_BANK[3].stages.every((s) => /plant|Plant/.test(s.text)));
  assert.ok(ENQUIRY_BANK[6].stages.some((s) => s.text.includes("no exact portion sizes")));
  assert.ok(ENQUIRY_BANK[5].stages.some((s) => s.text.includes("day or week")));
});
test("research cannot finish before every source, validated claims and a supported report", () => {
  const covered = new Set();
  for (let seed = 0; seed < 40; seed++) for (const q of build(4, rng(seed))) {
    covered.add(q.id); let state = initialProcessEnquiry();
    const send = (action) => { state = reduceProcessEnquiry(state, { revision: state.revision, version: state.version, ...action }, q, recordCorrect); };
    send({ type: "finish" }); assert.equal(state.stage, "prediction");
    send({ type: "predict", value: q.predictionOptions[0] }); send({ type: "start" });
    const first = state; send({ type: "recordStage" }); assert.equal(state, first);
    const capturedVersion = state.version; send({ type: "next" }); const second = state;
    send({ type: "next", version: capturedVersion }); assert.equal(state, second);
    send({ type: "view", index: 0 }); assert.equal(state.observation, 0);
    send({ type: "recordStage" }); send({ type: "checkRecord" }); assert.equal(state.stage, "record");
    for (const c of q.recordCards) send({ type: "record", id: c.id, bin: q.recordExpected[c.id] });
    send({ type: "checkRecord" }); assert.equal(state.stage, "conclusion");
    send({ type: "conclusion", ids: ["same"] }); send({ type: "finish" }); assert.equal(state.stage, "conclusion");
    const oldRevision = state.revision; send({ type: "reset" }); assert.equal(state.stage, "prediction"); assert.deepEqual(state.record, {}); assert.deepEqual(state.seen, []); assert.deepEqual(state.conclusion, []);
    const reset = state; send({ type: "conclusion", ids: ["supported"], revision: oldRevision }); assert.equal(state, reset);
    send({ type: "predict", value: q.predictionOptions[1] }); send({ type: "start" }); send({ type: "next" }); send({ type: "recordStage" });
    for (const c of q.recordCards) send({ type: "record", id: c.id, bin: q.recordExpected[c.id] });
    send({ type: "checkRecord" }); send({ type: "conclusion", ids: ["supported"] }); send({ type: "finish" }); assert.equal(state.stage, "done");
    const done = state; send({ type: "finish" }); send({ type: "reset" }); assert.equal(state, done);
  }
  assert.equal(covered.size, 9);
});
