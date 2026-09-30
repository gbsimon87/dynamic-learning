/**
 * Everything one finished challenge changes, in one pure step: badges (via
 * earnBadges, unchanged), XP (plus any pending back-fill), the streak, and
 * news. The RewardsProvider saves the result; the celebration shows it.
 *
 * `pendingBackfill` is a number once the progress documents have been read,
 * or null if that read has not happened or failed, in which case the
 * back-fill waits for a later run.
 *
 * While the back-fill is still waiting, a first completion's base XP is NOT
 * stored: that completion is already in the progress documents, so the
 * back-fill will count it when it lands. Storing it too would pay it twice.
 * The child still sees it (`xpGained`, `xpTotal`); only the store waits.
 */
import { earnBadges } from "./badges.js";
import { normaliseRewards } from "./rewardsShape.js";
import { recordDay } from "./streak.js";
import { XP, levelFor, xpForRun } from "./xp.js";
import { addNews } from "./news.js";

export function awardRun(rewards, input) {
  const { earned = [], firstTime, combos = 0, sticker = null, today, at, year, subject } = input;
  const pendingBackfill = Number.isFinite(input.pendingBackfill) ? input.pendingBackfill : null;

  let next = normaliseRewards(rewards);
  const backfill = !next.xpBackfilled && pendingBackfill !== null ? pendingBackfill : 0;
  const levelBefore = levelFor(next.xp + backfill).level;

  const badges = earnBadges(next, earned, { at, year, subject });
  next = badges.rewards;

  const run = xpForRun({ firstTime, combos, practice: next.practice, today });
  const day = recordDay(next.streak, today);
  const deferred = !next.xpBackfilled && pendingBackfill === null && firstTime ? XP.first : 0;

  next = {
    ...next,
    xp: next.xp + backfill + run.xp - deferred,
    xpBackfilled: next.xpBackfilled || pendingBackfill !== null,
    practice: run.practice,
    streak: day.streak,
  };
  next = addNews(next, { badges: badges.awarded, sticker });

  return {
    rewards: next,
    awarded: badges.awarded,
    xpGained: run.xp,
    xpTotal: next.xp + deferred,
    practiceCapped: run.practiceCapped,
    levelBefore,
    levelAfter: levelFor(next.xp + deferred).level,
    streakOutcome: day.outcome,
    streak: day.streak,
    usedFreezes: day.usedFreezes,
    earnedFreeze: day.earnedFreeze,
  };
}
