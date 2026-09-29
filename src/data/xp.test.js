import test from "node:test";
import assert from "node:assert/strict";
import { backfillXp, displayXp, levelFor, xpForRun } from "./xp.js";
import { normaliseRewards } from "./rewardsShape.js";

const P0 = { day: null, count: 0 };

test("first completion is 10, plus 2 per combo", () => {
  assert.equal(xpForRun({ firstTime: true, combos: 2, practice: P0, today: "2026-09-30" }).xp, 14);
});

test("practice earns 5 for the first 2 replays a day, then nothing", () => {
  let practice = P0;
  const got = [];
  for (let i = 0; i < 3; i++) {
    const r = xpForRun({ firstTime: false, combos: 1, practice, today: "2026-09-30" });
    got.push([r.xp, r.practiceCapped]);
    practice = r.practice;
  }
  assert.deepEqual(got, [[7, false], [7, false], [0, true]]);
  assert.equal(xpForRun({ firstTime: false, combos: 0, practice, today: "2026-10-01" }).xp, 5);
});

test("level curve: 100, 250, 450, 700, 1000, 1350", () => {
  assert.deepEqual(levelFor(0), { level: 1, into: 0, needed: 100 });
  assert.equal(levelFor(99).level, 1);
  assert.equal(levelFor(100).level, 2);
  assert.deepEqual(levelFor(260), { level: 3, into: 10, needed: 200 });
  for (const [xp, level] of [[450, 4], [700, 5], [1000, 6], [1349, 6], [1350, 7]]) {
    assert.equal(levelFor(xp).level, level, `${xp} XP`);
  }
});

test("back-fill counts only completed, built challenges", () => {
  const curriculum = [{ id: "c", topics: [{ id: "t", challenges: [{ id: 1 }, { id: 2 }, { id: 3 }] }] }];
  const candidates = [{
    curriculum,
    progress: { c: { topics: { t: { completedChallenges: [1, 2, 3, 9] } } } },
    isBuilt: (topicId, challengeId) => Number(challengeId) !== 3,
  }];
  assert.equal(backfillXp(candidates), 20);
  assert.equal(backfillXp([]), 0);
});

test("displayed XP includes a pending back-fill until it is stored", () => {
  const r = normaliseRewards({ xp: 5 });
  assert.equal(displayXp(r, 40), 45);
  assert.equal(displayXp(r, null), 5);
  assert.equal(displayXp({ ...r, xpBackfilled: true }, 40), 5);
});
