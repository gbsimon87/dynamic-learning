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
