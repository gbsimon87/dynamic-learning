import test from "node:test";
import assert from "node:assert/strict";
import { normaliseRewards } from "./rewardsShape.js";
import { earnBadges } from "./badges.js";
import { INTRO_BADGE_ID, finishIntro, introEligible, markTip, tipPending } from "./intro.js";

const AT = "2026-10-10T09:00:00.000Z";
const fresh = () => normaliseRewards(null);

test("only a child who has never played is offered the intro automatically", () => {
  assert.equal(introEligible(fresh(), { pendingBackfill: 0 }), true);
  assert.equal(introEligible(normaliseRewards({ xpBackfilled: true })), true);
  assert.equal(introEligible(fresh()), false, "back-fill unknown (progress read failed): not new");
  assert.equal(introEligible(normaliseRewards({ xp: 10 })), false);
  assert.equal(introEligible(normaliseRewards({ badges: [{ id: "first-steps" }] })), false);
  assert.equal(introEligible(normaliseRewards({ streak: { lastDay: "2026-10-09" } })), false);
  assert.equal(introEligible(fresh(), { pendingBackfill: 40 }), false);
  assert.equal(introEligible(normaliseRewards({ intro: { done: true } }), { pendingBackfill: 0 }), false);
  assert.equal(introEligible(null), false);
});

test("finishing awards Met Bix once, flags it new and marks the intro done", () => {
  const { rewards, awarded } = finishIntro(fresh(), { at: AT, completed: true });
  assert.deepEqual(awarded.map((b) => b.id), [INTRO_BADGE_ID]);
  assert.deepEqual(rewards.intro, { done: true, doneAt: AT });
  assert.deepEqual(rewards.news.badges, [INTRO_BADGE_ID]);
  assert.equal(rewards.badges.filter((b) => b.id === INTRO_BADGE_ID).length, 1);
  const again = finishIntro(rewards, { at: "2026-10-11T09:00:00.000Z", completed: true });
  assert.equal(again.rewards, rewards, "a replay changes nothing");
  assert.deepEqual(again.awarded, []);
});

test("skipping marks it done without a badge; finishing a replay later still awards it", () => {
  const skipped = finishIntro(fresh(), { at: AT, completed: false });
  assert.equal(skipped.rewards.intro.done, true);
  assert.deepEqual(skipped.awarded, []);
  assert.equal(skipped.rewards.badges.length, 0);
  const later = finishIntro(skipped.rewards, { at: "2026-10-12T09:00:00.000Z", completed: true });
  assert.equal(later.rewards.intro.doneAt, AT, "the first finish date is kept");
  assert.deepEqual(later.awarded.map((b) => b.id), [INTRO_BADGE_ID]);
});

test("no completion milestone ever awards the intro badge", () => {
  const { awarded } = earnBadges(fresh(), ["challenge", "topic", "category", "subject", "year"], { at: AT });
  assert.ok(!awarded.some((b) => b.id === INTRO_BADGE_ID));
});

test("coach marks are recorded once", () => {
  const r = fresh();
  assert.equal(tipPending(r, "map"), true);
  const marked = markTip(r, "map");
  assert.equal(tipPending(marked, "map"), false);
  assert.equal(markTip(marked, "map"), marked);
});
