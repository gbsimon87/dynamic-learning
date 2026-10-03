import test from "node:test";
import assert from "node:assert/strict";
import { WARNING, RULES, ACTIONS, FACT_BANK, SORT_BANK, MESSAGE_BANK, ADVICE_BANK, buildSunlightQuestions, isSunlightSortCorrect, isSunlightMessageCorrect } from "./protectingOurEyesFromSunlight.js";
import { assertBankRuns, seededRng } from "./lightTestHelpers.js";
test("sunlight banks provide fifteen authored situations, five tasks and all three protective principles", () => {
  assertBankRuns([FACT_BANK, SORT_BANK, MESSAGE_BANK, ADVICE_BANK], buildSunlightQuestions, false);
  for (let level = 1; level <= 4; level++) for (let seed = 1; seed <= 50; seed++) assert.deepEqual([...new Set(buildSunlightQuestions(level, seededRng(seed)).map(q => q.rule))].sort(), ["dark", "look", "uv"]);
  assert.match(WARNING, /Never look directly at the Sun, even through dark glasses/);
  assert.match(RULES.find(r => r.id === "uv").text, /99% or 100% of both UVA and UVB/);
  assert.match(RULES.find(r => r.id === "dark").text, /do not prove/);
  for (const action of ACTIONS.filter(a => a.safe)) assert.doesNotMatch(action.label, /^Look directly|^Stare|^Test sunglasses by looking/);
});
test("sunlight sorting rejects missing and extra actions and unsafe advice", () => {
  for (let seed = 1; seed <= 30; seed++) for (const q of buildSunlightQuestions(2, seededRng(seed))) {
    const expected = Object.fromEntries(q.actions.map(a => [a.id, a.safe ? "protect" : "avoid"]));
    assert.equal(isSunlightSortCorrect(q, expected), true);
    for (const bad of [null, {}, { ...expected, extra: "protect" }]) assert.equal(isSunlightSortCorrect(q, bad), false);
    for (const a of q.actions) {
      const missing = { ...expected }; delete missing[a.id]; assert.equal(isSunlightSortCorrect(q, missing), false);
      assert.equal(isSunlightSortCorrect(q, { ...expected, [a.id]: a.safe ? "avoid" : "protect" }), false);
    }
    assert.equal(isSunlightSortCorrect({ ...q, actions: q.actions.map(() => q.actions[0]) }, expected), false);
  }
});
test("sunlight messages require advice, supported reason and the direct-viewing warning", () => {
  for (const level of [3, 4]) for (const q of buildSunlightQuestions(level, seededRng(7))) {
    for (const a of q.tiles) for (const b of q.tiles) for (const c of q.tiles) assert.equal(isSunlightMessageCorrect(q, [a.id, b.id, c.id]), [a.id, b.id, c.id].join() === "act,why,never");
    for (const bad of [null, [], ["act"], ["act", "why", "unknown"], ["act", "why", "never", "extra"]]) assert.equal(isSunlightMessageCorrect(q, bad), false);
    assert.equal(isSunlightMessageCorrect({ ...q, tiles: [] }, ["act", "why", "never"]), false);
  }
});
