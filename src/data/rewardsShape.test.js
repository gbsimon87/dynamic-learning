import test from "node:test";
import assert from "node:assert/strict";
import { REWARDS_SCHEMA_VERSION, normaliseRewards } from "./rewardsShape.js";

const V1 = {
  schemaVersion: 1,
  badges: [{ id: "first-steps", level: "challenge", earnedAt: "2026-09-19T10:00:00.000Z", year: 2, subject: "math" }],
  counts: { challenge: 14, topic: 2 },
};

test("a v1 document reads as v2 and keeps every original field byte-identical", () => {
  const out = normaliseRewards(structuredClone(V1));
  assert.equal(out.schemaVersion, REWARDS_SCHEMA_VERSION);
  assert.equal(JSON.stringify(out.badges), JSON.stringify(V1.badges));
  assert.equal(JSON.stringify(out.counts), JSON.stringify(V1.counts));
});

test("missing fields get defaults", () => {
  const out = normaliseRewards(V1);
  assert.equal(out.xp, 0);
  assert.equal(out.xpBackfilled, false);
  assert.deepEqual(out.streak, { current: 0, best: 0, lastDay: null, freezes: 0, recent: [], frozen: [] });
  assert.deepEqual(out.news, { badges: [], stickers: [] });
  assert.deepEqual(out.recentStickers, []);
  assert.deepEqual(out.practice, { day: null, count: 0 });
});

test("garbage degrades to defaults and never throws", () => {
  for (const bad of [null, undefined, 7, "x", [], { xp: "lots", streak: 3, news: null, badges: "no" }]) {
    const out = normaliseRewards(bad);
    assert.equal(out.xp, 0);
    assert.ok(Array.isArray(out.badges));
    assert.equal(out.streak.lastDay, null);
  }
});

test("freezes are clamped to 0–2 and bad dates are dropped", () => {
  const out = normaliseRewards({ streak: { freezes: 9, lastDay: "yesterday", recent: ["2026-09-29", "nope"] } });
  assert.equal(out.streak.freezes, 2);
  assert.equal(out.streak.lastDay, null);
  assert.deepEqual(out.streak.recent, ["2026-09-29"]);
});

test("unknown top-level fields survive, so a newer app's data is never lost", () => {
  assert.equal(normaliseRewards({ futureThing: 1 }).futureThing, 1);
});
