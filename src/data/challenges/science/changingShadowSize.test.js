import test from "node:test";
import assert from "node:assert/strict";
import { shadowGeometry } from "./shadowModel.js";
import { CONFIGURATIONS, COMPARE_BANK, PATTERN_BANK, TABLE_BANK, ENQUIRY_BANK, sizeObservations, buildShadowSizeQuestions, isShadowSetupCorrect, isShadowSizeRecordCorrect, isShadowTableCorrect } from "./changingShadowSize.js";
import { initialShadowEnquiry, reduceShadowEnquiry } from "./shadowEnquiry.js";
import { assertBankRuns, assertProcessPaths, seededRng } from "./lightTestHelpers.js";
test("shadow geometry matches independently worked distances, whole-cm precision and invalid input bounds", () => {
  for (const [source, object, screen, height, expected] of [[0, 20, 60, 4, 12], [0, 30, 60, 4, 8], [0, 40, 60, 4, 6], [10, 40, 60, 4, 7], [20, 40, 60, 4, 8], [0, 20, 60, 8, 24]]) {
    assert.equal(shadowGeometry({ source, object, screen, height }).shadowHeight, expected);
  }
  assert.equal(shadowGeometry({ source: 10, object: 40, screen: 60, height: 4 }).exactHeight, 20 / 3);
  const base = { source: 0, object: 30, screen: 60, height: 4 };
  for (const bad of [{ source: -1 }, { object: 0 }, { object: 60 }, { object: 61 }, { object: .01 }, { height: 0 }, { height: -1 }, { screen: 0 }, { source: 30 }]) assert.equal(shadowGeometry({ ...base, ...bad }), null);
  for (const key of Object.keys(base)) for (const value of [NaN, Infinity, -Infinity, "30", null]) assert.equal(shadowGeometry({ ...base, [key]: value }), null);
  assert.deepEqual(shadowGeometry({ object: 30 }), shadowGeometry(base));
  assert.equal(shadowGeometry({}), null);
  for (const input of [null, undefined, [], "scene"]) assert.equal(shadowGeometry(input), null);
});
test("size banks preserve fixed screen and one moving position, unique measured options and meaningful run depth", () => {
  assertBankRuns([COMPARE_BANK, PATTERN_BANK, TABLE_BANK, ENQUIRY_BANK], buildShadowSizeQuestions);
  for (const config of CONFIGURATIONS) {
    const stages = sizeObservations(config);
    const geometry = stages.map(s => shadowGeometry(s.geometry));
    assert.ok(geometry.every(g => g.screen === 60 && g.height === config.height));
    assert.equal(new Set(geometry.map(g => g.shadowHeight)).size, 3);
    assert.equal(new Set(geometry.map(g => config.moving === "object" ? g.source : g.object)).size, 1);
    assert.deepEqual(sizeObservations(config, true).map(s => s.geometry), stages.map(s => s.geometry).reverse());
  }
  for (let seed = 1; seed <= 30; seed++) assert.deepEqual(buildShadowSizeQuestions(4, seededRng(seed)).map(q => q.group).sort(), ["object-further", "object-nearer", "source-nearer"]);
});
test("fair comparison requires all five factors and only the intended position changes", () => {
  for (let seed = 1; seed <= 12; seed++) for (const q of buildShadowSizeQuestions(4, seededRng(seed))) {
    assert.equal(isShadowSetupCorrect(q, q.setupExpected), true);
    for (const bad of [null, {}, { ...q.setupExpected, extra: "keep" }]) assert.equal(isShadowSetupCorrect(q, bad), false);
    for (const id of Object.keys(q.setupExpected)) {
      const missing = { ...q.setupExpected }; delete missing[id]; assert.equal(isShadowSetupCorrect(q, missing), false);
      assert.equal(isShadowSetupCorrect(q, { ...q.setupExpected, [id]: q.setupExpected[id] === "keep" ? "change" : "keep" }), false);
    }
  }
});
test("records accept displayed rounded cm and reject blanks, distances, malformed and partial entries", () => {
  for (const q of buildShadowSizeQuestions(3, seededRng(2))) {
    const numeric = Object.fromEntries(q.stages.map(s => [s.id, String(shadowGeometry(s.geometry).shadowHeight)]));
    assert.equal(isShadowTableCorrect(q, numeric), true);
    for (const bad of [null, {}, { ...numeric, extra: "8" }]) assert.equal(isShadowTableCorrect(q, bad), false);
    for (const s of q.stages) for (const value of ["", " ", "NaN", "Infinity", NaN, 8, "8.0", "-8", "0", "7cm", String(shadowGeometry(s.geometry).sourceDistance)]) assert.equal(isShadowTableCorrect(q, { ...numeric, [s.id]: value }), false);
  }
  for (const q of buildShadowSizeQuestions(4, seededRng(2))) {
    assert.equal(isShadowSizeRecordCorrect(q, q.recordExpected), true);
    assert.equal(isShadowSizeRecordCorrect({ ...q, recordCards: q.recordCards.map(() => q.recordCards[0]) }, q.recordExpected), false);
    assert.equal(isShadowSizeRecordCorrect({ ...q, recordCards: q.recordCards.map((c, i) => i ? c : { ...c, id: "unknown" }) }, q.recordExpected), false);
    for (const bad of [null, {}, { ...q.recordExpected, extra: "cm-8" }]) assert.equal(isShadowSizeRecordCorrect(q, bad), false);
    for (const s of q.stages) {
      const missing = { ...q.recordExpected }; delete missing[s.id]; assert.equal(isShadowSizeRecordCorrect(q, missing), false);
      assert.equal(isShadowSizeRecordCorrect(q, { ...q.recordExpected, [s.id]: "cm-0" }), false);
    }
  }
});
test("size enquiry requires fair setup, all positions, records and bounded explanation; reset invalidates all stages", () => {
  for (let seed = 1; seed <= 12; seed++) for (const q of buildShadowSizeQuestions(4, seededRng(seed))) assertProcessPaths(q, isShadowSizeRecordCorrect, initialShadowEnquiry, reduceShadowEnquiry, true);
});
