import test from "node:test";
import assert from "node:assert/strict";
import { mergeRewards } from "./mergeRewards.js";
import { normaliseRewards } from "../src/data/rewardsShape.js";

test("two established clients retain XP deltas and every badge", () => {
  const base = normaliseRewards({ xp: 100, xpBackfilled: true });
  const current = { ...base, xp: 110, badges: [{ id: "first" }], extra: "keep" };
  const incoming = { ...base, xp: 120, badges: [{ id: "second" }] };
  const result = mergeRewards(current, incoming, base);
  assert.equal(result.xp, 130);
  assert.deepEqual(result.badges.map((badge) => badge.id), ["first", "second"]);
  assert.equal(result.extra, "keep");
});
test("a stale clear acknowledges only seen news, never a new arrival", () => {
  const base = normaliseRewards({ news: { badges: ["seen"], stickers: [] } });
  const current = { ...base, news: { badges: ["seen", "new"], stickers: ["new-sticker"] } };
  const incoming = { ...base, news: { badges: [], stickers: [] } };
  assert.deepEqual(mergeRewards(current, incoming, base).news, { badges: ["new"], stickers: ["new-sticker"] });
});
test("a stale earning snapshot cannot resurrect news cleared elsewhere", () => {
  const base = normaliseRewards({ xp: 100, xpBackfilled: true, news: { badges: ["seen"], stickers: [] } });
  const current = { ...base, news: { badges: [], stickers: [] } };
  const incoming = { ...base, xp: 110 };
  assert.deepEqual(mergeRewards(current, incoming, base).news.badges, []);
});
test("an uncontested clock correction retains the existing streak rule", () => {
  const base = normaliseRewards({ streak: { lastDay: "2026-11-01", recent: ["2026-11-01"], current: 5, best: 5 } });
  const incoming = { ...base, streak: { ...base.streak, lastDay: "2026-10-09", recent: ["2026-10-09"] } };
  assert.equal(mergeRewards(base, incoming, base).streak.lastDay, "2026-10-09");
  assert.deepEqual(mergeRewards(base, incoming, base).streak.recent, ["2026-10-09"]);
});
test("legacy/backfill conflict is conservative; scores/counts/history never regress", () => {
  const base = normaliseRewards({ xp: 0 });
  const current = normaliseRewards({ xp: 120, xpBackfilled: true, counts: { challenge: 12 }, streak: { lastDay: "2026-10-09", best: 5, current: 5, recent: ["2026-10-09"] } });
  const incoming = normaliseRewards({ xp: 110, xpBackfilled: true, counts: { challenge: 11 }, streak: { lastDay: "2026-10-08", best: 4, current: 4, recent: ["2026-10-08"] } });
  const merged = mergeRewards(current, incoming, base);
  assert.equal(merged.xp, 120);
  assert.equal(merged.counts.challenge, 12);
  assert.equal(merged.streak.current, 5);
  assert.deepEqual(merged.streak.recent, ["2026-10-08", "2026-10-09"]);
});

test("a finished intro and shown coach marks survive a stale snapshot", () => {
  const current = { intro: { done: true, doneAt: "2026-10-10T09:00:00.000Z" }, tips: ["map"] };
  const stale = { intro: { done: false }, tips: ["trophies"] };
  const merged = mergeRewards(current, stale, {});
  assert.deepEqual(merged.intro, { done: true, doneAt: "2026-10-10T09:00:00.000Z" });
  assert.deepEqual(merged.tips.sort(), ["map", "trophies"]);
  const both = mergeRewards({ intro: { done: true, doneAt: "2026-10-11T09:00:00.000Z" } },
    { intro: { done: true, doneAt: "2026-10-10T09:00:00.000Z" } });
  assert.equal(both.intro.doneAt, "2026-10-10T09:00:00.000Z");
});

test("puzzle days union and the total never regresses", () => {
  const merged = mergeRewards({ puzzles: { days: ["2026-10-09"], total: 4 } }, { puzzles: { days: ["2026-10-10"], total: 3 } });
  assert.deepEqual(merged.puzzles.days, ["2026-10-09", "2026-10-10"]);
  assert.equal(merged.puzzles.total, 4);
});
