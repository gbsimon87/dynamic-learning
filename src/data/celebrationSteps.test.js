import test from "node:test";
import assert from "node:assert/strict";
import { TIERS, buildCelebrationSteps } from "./celebrationSteps.js";
import { getBadge } from "./badges.js";

const types = (steps) => steps.map((step) => step.type);
const before = { percent: 40, completed: 4, total: 10 };
const after = { percent: 50, completed: 5, total: 10 };
const sticker = { topicId: "counting", icon: "🔢", earned: true };

test("a plain challenge is one screen that carries the next actions", () => {
  const steps = buildCelebrationSteps({ level: "challenge", earned: ["challenge"] });
  assert.deepEqual(types(steps), ["headline"]);
  assert.equal(steps[0].final, true);
  assert.equal(steps[0].cue, TIERS.challenge.cue);
});

test("practice is one quiet screen and never shows progress or awards", () => {
  const steps = buildCelebrationSteps({ level: "practice", yearBefore: before, yearAfter: after });
  assert.deepEqual(types(steps), ["headline"]);
  assert.equal(steps[0].effect, "sparkle");
});

test("a first challenge with a badge gets a badge beat, but no progress", () => {
  const steps = buildCelebrationSteps({
    level: "challenge",
    earned: ["challenge"],
    badges: [getBadge("first-steps")],
    yearBefore: before,
    yearAfter: after,
  });
  assert.deepEqual(types(steps), ["headline", "badge", "next"]);
});

test("a topic runs headline, progress, sticker, badge, unlock, next", () => {
  const steps = buildCelebrationSteps({
    level: "topic",
    earned: ["challenge", "topic"],
    badges: [getBadge("topic-finisher")],
    sticker,
    yearBefore: before,
    yearAfter: after,
  });
  assert.deepEqual(types(steps), ["headline", "progress", "sticker", "badge", "unlock", "next"]);
  assert.deepEqual([steps[1].from, steps[1].to], [40, 50]);
  assert.equal(steps[4].avatar, "🐨");
  assert.equal(steps.at(-1).final, true);
});

test("an unearned sticker is never revealed", () => {
  const steps = buildCelebrationSteps({
    level: "topic",
    earned: ["challenge", "topic"],
    sticker: { ...sticker, earned: false },
  });
  assert.deepEqual(types(steps), ["headline"]);
});

test("only a finished year adds the certificate, just before next", () => {
  const year = buildCelebrationSteps({
    level: "year",
    earned: ["challenge", "topic", "category", "subject", "year"],
    sticker,
    yearBefore: before,
    yearAfter: after,
  });
  assert.deepEqual(types(year), ["headline", "progress", "sticker", "certificate", "next"]);
  assert.equal(year[0].effect, "fireworksFinale");

  const subject = buildCelebrationSteps({
    level: "subject",
    earned: ["challenge", "topic", "category", "subject"],
    sticker,
  });
  assert.ok(!types(subject).includes("certificate"));
});

test("tiers escalate: each level has an effect and a cue", () => {
  for (const level of ["practice", "challenge", "topic", "category", "subject", "year"]) {
    assert.ok(TIERS[level].effect && TIERS[level].cue, level);
  }
});

const streakInfo = { outcome: "extended", current: 4, usedFreezes: 0, dots: [] };

test("the day's first plain challenge becomes headline, streak, next", () => {
  const steps = buildCelebrationSteps({ level: "challenge", earned: ["challenge"], streak: streakInfo });
  assert.deepEqual(types(steps), ["headline", "streak", "next"]);
});

test("a practice replay that is the day's first also gets the streak step", () => {
  const steps = buildCelebrationSteps({ level: "practice", streak: { ...streakInfo, outcome: "started", current: 1 } });
  assert.deepEqual(types(steps), ["headline", "streak", "next"]);
});

test("level-up comes after the unlock and before the streak and certificate", () => {
  const steps = buildCelebrationSteps({
    level: "year",
    earned: ["challenge", "topic", "category", "subject", "year"],
    badges: [getBadge("topic-finisher")],
    sticker,
    yearBefore: before,
    yearAfter: after,
    levelUp: 6,
    streak: streakInfo,
  });
  assert.deepEqual(types(steps), [
    "headline", "progress", "sticker", "badge", "unlock", "levelUp", "streak", "certificate", "next",
  ]);
});

test("the XP gain rides on the headline", () => {
  const [headline] = buildCelebrationSteps({ level: "challenge", earned: ["challenge"], xp: { gained: 12, total: 112, capped: false } });
  assert.deepEqual(headline.xp, { gained: 12, total: 112, capped: false });
});

test("streak milestones get the bigger effect", () => {
  const at = (current) =>
    buildCelebrationSteps({ level: "challenge", earned: ["challenge"], streak: { ...streakInfo, current } })[1].effect;
  assert.equal(at(4), "burst");
  assert.equal(at(7), "confettiStars");
});

test("no streak step when the streak didn't move (second game today)", () => {
  assert.deepEqual(types(buildCelebrationSteps({ level: "challenge", earned: ["challenge"], streak: null })), ["headline"]);
});
