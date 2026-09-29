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

/** Effect and sound per milestone level, from quietest to loudest. */
export const TIERS = {
  practice: { effect: "sparkle", cue: "chime" },
  challenge: { effect: "burst", cue: "success" },
  topic: { effect: "confetti", cue: "fanfareSmall" },
  category: { effect: "confettiStars", cue: "fanfare" },
  subject: { effect: "fireworks", cue: "fanfareBig" },
  year: { effect: "fireworksFinale", cue: "fanfareBig" },
};

const BIG_LEVELS = new Set(["topic", "category", "subject", "year"]);

/**
 * @param {object} input
 *   level       getCompletionMilestones' `level` ("practice" when replaying)
 *   earned      its `earned` levels
 *   badges      catalogue entries just awarded by useRewards.award
 *   sticker     the topic's sticker (stickers.topicSticker), or null
 *   yearBefore  getYearStats before this completion, or null
 *   yearAfter   getYearStats after it, or null
 * @returns {object[]} steps; the last one always carries the next actions.
 */
export function buildCelebrationSteps({
  level,
  earned = [],
  badges = [],
  sticker = null,
  yearBefore = null,
  yearAfter = null,
}) {
  const tier = TIERS[level] ?? TIERS.challenge;
  const headline = { type: "headline", level, ...tier };
  const middle = [];

  if (BIG_LEVELS.has(level) && yearBefore && yearAfter) {
    middle.push({
      type: "progress",
      from: yearBefore.percent,
      to: yearAfter.percent,
      completed: yearAfter.completed,
      total: yearAfter.total,
    });
  }

  if (earned.includes("topic") && sticker?.earned) {
    middle.push({ type: "sticker", sticker, effect: "stars", cue: "reveal" });
  }

  // A badge always gets its own beat, even on a plain challenge (First steps):
  // it is the thing the child keeps.
  for (const badge of badges) {
    middle.push({ type: "badge", badge, effect: "stars", cue: "reveal" });
    if (badge.unlocksAvatar) {
      middle.push({ type: "unlock", badge, avatar: badge.unlocksAvatar, effect: "sparkle", cue: "chime" });
    }
  }

  if (earned.includes("year")) {
    middle.push({ type: "certificate", effect: "confetti", cue: "fanfare" });
  }

  if (middle.length === 0) return [{ ...headline, final: true }];
  return [headline, ...middle, { type: "next", final: true }];
}
