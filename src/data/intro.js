/**
 * Bix's first-play intro (`/hello`): who should see it, and what finishing or
 * skipping it changes in the child's rewards document.
 *
 * The "has done the intro" flag is per child and lives in the REWARDS
 * document (`intro`, v3), never in progress. Coach marks shown once live
 * beside it in `tips`. Pure: no React, no storage, so it runs under node.
 */

import { getBadge, heldBadgeIds } from "./badges.js";
import { addNews } from "./news.js";

export const INTRO_BADGE_ID = "met-bix";

/** First-visit coach marks, each shown once per child. */
export const TIPS = {
  map: "map",
  trophies: "trophies",
};

/**
 * Offered automatically only to a child who has genuinely never played: no
 * XP, no badges, no streak day, and no completions waiting to be back-filled.
 * A child who already plays never has it forced on them; a grown-up can
 * replay it from /parent.
 *
 * Before the one-off XP back-fill is stored, only a back-fill KNOWN to be 0
 * proves there is nothing to count: `null` means the progress read failed, and
 * a child from before XP existed would otherwise look brand new.
 */
export function introEligible(rewards, { pendingBackfill = null } = {}) {
  if (!rewards || rewards.intro?.done) return false;
  const noOldWork = rewards.xpBackfilled === true || pendingBackfill === 0;
  return (
    (rewards.xp ?? 0) === 0 &&
    (rewards.badges ?? []).length === 0 &&
    !rewards.streak?.lastDay &&
    noOldWork
  );
}

/**
 * Marks the intro done. Playing it to the end (`completed`) also awards the
 * Met Bix badge, once, and flags it as something new; skipping awards
 * nothing. Returns the SAME object when nothing changes, so callers can skip
 * the write (replaying the intro later changes nothing).
 */
export function finishIntro(rewards, { at = null, completed = false } = {}) {
  const alreadyDone = rewards.intro?.done === true;
  const held = heldBadgeIds(rewards).has(INTRO_BADGE_ID);
  const awardBadge = completed && !held;
  if (alreadyDone && !awardBadge) return { rewards, awarded: [] };

  let next = alreadyDone
    ? rewards
    : { ...rewards, intro: { ...rewards.intro, done: true, doneAt: at } };
  const awarded = [];
  if (awardBadge) {
    const badge = getBadge(INTRO_BADGE_ID);
    next = {
      ...next,
      badges: [...next.badges, { id: badge.id, level: badge.level, earnedAt: at, year: null, subject: null }],
    };
    next = addNews(next, { badges: [badge.id] });
    awarded.push(badge);
  }
  return { rewards: next, awarded };
}

/** Whether a coach mark still needs showing. */
export function tipPending(rewards, id) {
  return !(rewards?.tips ?? []).includes(id);
}

/** Records a coach mark as shown; the SAME object when it already was. */
export function markTip(rewards, id) {
  if (!tipPending(rewards, id)) return rewards;
  return { ...rewards, tips: [...rewards.tips, id] };
}
