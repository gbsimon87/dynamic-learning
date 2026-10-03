import test from "node:test";
import assert from "node:assert/strict";
import { OBJECTS, SCENE_BANK, COMPARE_BANK, BUILD_BANK, ENQUIRY_BANK, ROUTES, lightingObservation, buildLightQuestions, isLightRecordCorrect, isLightExplanationCorrect } from "./lightAndDarkness.js";
import { initialProcessEnquiry, reduceProcessEnquiry } from "./processEnquiry.js";
const rng = seed => () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
test("light banks have replay depth, deterministic unique runs and both lighting conditions", () => {
  const banks = [SCENE_BANK, COMPARE_BANK, BUILD_BANK, ENQUIRY_BANK], before = JSON.stringify(banks);
  banks.forEach((bank, i) => { assert.equal(bank.length, [15, 15, 15, 9][i]); assert.equal(new Set(bank.map(q => q.id)).size, bank.length); });
  for (let seed = 1; seed <= 50; seed++) for (let level = 1; level <= 4; level++) {
    const run = buildLightQuestions(level, rng(seed)); assert.deepEqual(run, buildLightQuestions(level, rng(seed))); assert.equal(run.length, level === 4 ? 3 : 5); assert.equal(new Set(run.map(q => q.id)).size, run.length);
    if (level === 1) assert.deepEqual([...new Set(run.map(q => q.lit))].sort(), [false, true]);
    if (level === 4) assert.deepEqual(run.map(q => q.group).sort(), ["repeat", "turn-off", "turn-on"]);
    for (const q of run) {
      if (level === 1) { assert.equal(new Set(q.options).size, 3); assert.equal(q.options.filter(option => option === q.answer).length, 1); }
      if (level === 2 || level === 4) { assert.equal(isLightRecordCorrect(q, q.recordExpected), true); assert.ok(q.stages.some(s => s.lit)); assert.ok(q.stages.some(s => !s.lit)); assert.ok(q.stages.every(s => s.object === q.object && s.source === q.source)); }
      if (level === 3) assert.equal(isLightExplanationCorrect(q, ["condition", "eyes", "result"]), true);
    }
  }
  assert.equal(JSON.stringify(banks), before); for (const level of [0, 5, "1", null]) assert.throws(() => buildLightQuestions(level, rng(1)), RangeError);
});
test("dark and lit observations independently explain seeing and the unchanged object's presence", () => {
  for (const object of OBJECTS) {
    const dark = lightingObservation(object, "lamp", false), lit = lightingObservation(object, "lamp", true);
    assert.match(dark.text, /No light enters/); assert.match(dark.text, /still inside/); assert.match(dark.text, /cannot see/);
    assert.match(lit.text, /gives out light/); assert.match(lit.text, /observer's eyes/); assert.match(lit.text, /can see/);
  }
  assert.deepEqual(ROUTES.map(r => r.states), [[false, false, true], [true, true, false], [true, false, true]]);
  for (const q of buildLightQuestions(3, rng(5))) {
    const result = q.tiles.find(t => t.id === "result").label;
    assert.equal(result.includes("cannot see"), !q.lit);
    assert.equal(q.tiles.find(t => t.id === "eyes").label.includes("no light"), !q.lit);
  }
});
test("light records reject missing, extra, flipped and duplicate observations", () => {
  for (const level of [2, 4]) for (let seed = 1; seed <= 12; seed++) for (const q of buildLightQuestions(level, rng(seed))) {
    assert.equal(isLightRecordCorrect(q, q.recordExpected), true);
    for (const bad of [null, {}, { ...q.recordExpected, extra: "visible" }]) assert.equal(isLightRecordCorrect(q, bad), false);
    for (const card of q.recordCards) { const missing = { ...q.recordExpected }; delete missing[card.id]; assert.equal(isLightRecordCorrect(q, missing), false); assert.equal(isLightRecordCorrect(q, { ...q.recordExpected, [card.id]: q.recordExpected[card.id] === "visible" ? "not-visible" : "visible" }), false); }
    assert.equal(isLightRecordCorrect({ ...q, recordCards: q.recordCards.map(() => q.recordCards[0]) }, q.recordExpected), false);
  }
});
test("built explanations require the stated First, Next, So structure and reject misconceptions", () => {
  function orderedTriples(ids) { return ids.flatMap(a => ids.filter(b => b !== a).flatMap(b => ids.filter(c => c !== a && c !== b).map(c => [a, b, c]))); }
  for (const q of buildLightQuestions(3, rng(3))) {
    for (const ids of orderedTriples(q.tiles.map(t => t.id))) assert.equal(isLightExplanationCorrect(q, ids), ids.join() === "condition,eyes,result");
    for (const bad of [null, [], ["condition"], ["condition", "eyes"], ["condition", "condition", "result"], ["condition", "eyes", "unknown"], ["condition", "eyes", "result", "extra"]]) assert.equal(isLightExplanationCorrect(q, bad), false);
    assert.equal(isLightExplanationCorrect({ ...q, tiles: [] }, ["condition", "eyes", "result"]), false);
  }
});
test("every prediction is ungraded; investigation completion requires all stages, records and final explanation", () => {
  for (let seed = 1; seed <= 9; seed++) for (const q of buildLightQuestions(4, rng(seed))) for (const prediction of q.predictionOptions) {
    let s = initialProcessEnquiry(); const act = (type, extra = {}) => { s = reduceProcessEnquiry(s, { type, ...extra, revision: s.revision, version: s.version }, q, isLightRecordCorrect); };
    act("start"); assert.equal(s.stage, "prediction"); act("predict", { value: prediction }); act("start"); assert.equal(s.stage, "observe");
    const first = s; act("recordStage"); assert.equal(s, first); act("view", { index: 2 }); assert.equal(s, first); act("next"); act("recordStage"); assert.equal(s.stage, "observe"); act("next"); act("recordStage"); assert.equal(s.stage, "record"); act("checkRecord"); assert.equal(s.stage, "record");
    for (const card of q.recordCards) act("record", { id: card.id, bin: q.recordExpected[card.id] }); act("checkRecord"); assert.equal(s.stage, "conclusion");
    act("conclusion", { ids: ["condition", "eye-source", "result"] }); act("finish"); assert.equal(s.stage, "conclusion"); act("conclusion", { ids: ["condition", "eyes", "result"] }); act("finish"); assert.equal(s.stage, "done"); const done = s; act("finish"); assert.equal(s, done); act("reset"); assert.equal(s, done);
  }
});
test("restart clears light evidence and invalidates stale observation callbacks", () => {
  const q = buildLightQuestions(4, rng(9))[0]; let s = initialProcessEnquiry();
  s = reduceProcessEnquiry(s, { type: "predict", value: q.predictionOptions[0], revision: 0, version: 0 }, q, isLightRecordCorrect);
  s = reduceProcessEnquiry(s, { type: "start", revision: 0, version: 0 }, q, isLightRecordCorrect);
  s = reduceProcessEnquiry(s, { type: "reset", revision: 0, version: 1 }, q, isLightRecordCorrect);
  assert.equal(s.stage, "prediction"); assert.equal(s.prediction, null); assert.deepEqual(s.seen, []); assert.deepEqual(s.record, {}); assert.deepEqual(s.conclusion, []);
  assert.equal(reduceProcessEnquiry(s, { type: "next", revision: 0, version: 1 }, q, isLightRecordCorrect), s);
});
