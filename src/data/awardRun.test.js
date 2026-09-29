import test from "node:test";
import assert from "node:assert/strict";
import { awardRun } from "./awardRun.js";
import { normaliseRewards } from "./rewardsShape.js";

const base = { at: "2026-09-30T10:00:00.000Z", year: "2", subject: "math", combos: 0, sticker: null };
const V1 = { schemaVersion: 1, badges: [{ id: "first-steps", level: "challenge" }], counts: { challenge: 3 } };

test("a first completion adds XP, starts a streak and stores v2 without losing v1 data", () => {
  const r = awardRun(V1, { ...base, earned: ["challenge"], firstTime: true, today: "2026-09-30", pendingBackfill: 30 });
  assert.equal(r.rewards.schemaVersion, 2);
  assert.equal(JSON.stringify(r.rewards.badges), JSON.stringify(V1.badges));
  assert.equal(r.rewards.counts.challenge, 4);
  assert.equal(r.xpGained, 10);
  assert.equal(r.rewards.xp, 40); // 30 back-fill + 10
  assert.equal(r.rewards.xpBackfilled, true);
  assert.equal(r.streakOutcome, "started");
});

test("pendingBackfill null (the progress read failed) leaves the back-fill for later", () => {
  const r = awardRun(V1, { ...base, earned: ["challenge"], firstTime: true, today: "2026-09-30", pendingBackfill: null });
  assert.equal(r.rewards.xp, 10);
  assert.equal(r.rewards.xpBackfilled, false);
});

test("the back-fill alone never counts as a level-up", () => {
  const r = awardRun(V1, { ...base, earned: ["challenge"], firstTime: true, today: "2026-09-30", pendingBackfill: 300 });
  assert.equal(r.levelBefore, 3); // 300 XP
  assert.equal(r.levelAfter, 3); // 310 XP
});

test("crossing a level boundary is a level-up", () => {
  const start = normaliseRewards({ xp: 95, xpBackfilled: true });
  const r = awardRun(start, { ...base, earned: ["challenge"], firstTime: true, today: "2026-09-30", pendingBackfill: 0 });
  assert.deepEqual([r.levelBefore, r.levelAfter], [1, 2]);
});

test("new badges and an earned sticker become news", () => {
  const r = awardRun(normaliseRewards(null), {
    ...base, earned: ["challenge", "topic"], firstTime: true, today: "2026-09-30",
    sticker: "2/math/numbers-and-counting", pendingBackfill: 0,
  });
  assert.deepEqual(r.rewards.news.stickers, ["2/math/numbers-and-counting"]);
  assert.ok(r.rewards.news.badges.includes("first-steps"));
  assert.ok(r.rewards.news.badges.includes("topic-finisher"));
});

test("a third practice replay today earns no XP but still counts for the streak", () => {
  let r = normaliseRewards({ xpBackfilled: true });
  let out;
  for (let i = 0; i < 3; i++) {
    out = awardRun(r, { ...base, earned: [], firstTime: false, today: "2026-09-30", pendingBackfill: 0 });
    r = out.rewards;
  }
  assert.equal(out.xpGained, 0);
  assert.equal(out.practiceCapped, true);
  assert.equal(r.xp, 10);
  assert.equal(r.streak.current, 1);
});
