/**
 * What a completion celebration shows, and in what order.
 *
 * A big moment is a SEQUENCE — one reward per full-screen step, each waiting
 * for "Continue" so a reveal is never tapped past unseen. A plain challenge
 * stays one screen, so the everyday case never costs extra taps and the big
 * moments keep their weight.
 *
 * Pure data: which steps, and which effect and sound cue each one fires. The
 * UI owns how a step looks; this owns that it exists. Tested under node.
 */

import { STREAK_MILESTONES } from "./streak.js";
import { wonSticker } from "./stickers.js";

/**
 * Effect and sound per milestone level, from quietest to loudest. Cue names
 * are scenarios in celebration/sound/cues.js.
 */
export const TIERS = {
  practice: { effect: "sparkle", cue: "practice" },
  challenge: { effect: "burst", cue: "success" },
  topic: { effect: "confetti", cue: "topic" },
  category: { effect: "confettiStars", cue: "quest" },
  subject: { effect: "fireworks", cue: "subjectYear" },
  year: { effect: "fireworksFinale", cue: "subjectYear" },
};

const BIG_LEVELS = new Set(["topic", "category", "subject", "year"]);
const STREAK_STEPS = new Set(["started", "extended", "saved", "restarted"]);

/**
 * @param {object} input
 *   level       getCompletionMilestones' `level` ("practice" when replaying)
 *   earned      its `earned` levels
 *   badges      catalogue entries just awarded by useRewards.award
 *   sticker     the topic's sticker (stickers.topicSticker), or null
 *   yearBefore  getYearStats before this completion, or null
 *   yearAfter   getYearStats after it, or null
 *   xp          { gained, total, capped } for the headline, or null
 *   levelUp     the new level number, or null
 *   streak      { outcome, current, usedFreezes, dots } when the streak moved, or null
 * @returns {object[]} steps; the last one always carries the next actions.
 */
export function buildCelebrationSteps({
  level,
  earned = [],
  badges = [],
  sticker = null,
  yearBefore = null,
  yearAfter = null,
  xp = null,
  levelUp = null,
  streak = null,
}) {
  const tier = TIERS[level] ?? TIERS.challenge;
  const headline = { type: "headline", level, ...tier, xp };
  const middle = [];

  if (BIG_LEVELS.has(level) && yearBefore && yearAfter) {
    // No entry cue: ProgressStep plays "progress" as the ring starts to fill.
    middle.push({
      type: "progress",
      from: yearBefore.percent,
      to: yearAfter.percent,
      completed: yearAfter.completed,
      total: yearAfter.total,
    });
  }

  if (wonSticker(earned, sticker)) {
    middle.push({ type: "sticker", sticker, effect: "stars", cue: "sticker" });
  }

  // A badge always gets its own beat, even on a plain challenge (First steps):
  // it is the thing the child keeps.
  for (const badge of badges) {
    middle.push({ type: "badge", badge, effect: "stars", cue: "badge" });
    if (badge.unlocksAvatar) {
      middle.push({ type: "unlock", badge, avatar: badge.unlocksAvatar, effect: "sparkle", cue: "unlock" });
    }
  }

  if (levelUp) {
    middle.push({ type: "levelUp", level: levelUp, effect: "confettiStars", cue: "levelUp" });
  }
  if (streak && STREAK_STEPS.has(streak.outcome)) {
    const milestone = STREAK_MILESTONES.includes(streak.current);
    middle.push({ type: "streak", ...streak, effect: milestone ? "confettiStars" : "burst", cue: "streak" });
  }

  if (earned.includes("year")) {
    middle.push({ type: "certificate", effect: "confetti", cue: "certificate" });
  }

  if (middle.length === 0) return [{ ...headline, final: true }];
  return [headline, ...middle, { type: "next", final: true }];
}
