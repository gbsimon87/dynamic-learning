/**
 * The rewards document's shape, and the one place it is migrated.
 *
 * Read-time and lossless: `normaliseRewards` fills in anything missing with a
 * default and never drops a field it does not know, so a v1 document (badges
 * and counts only) reads as v2 in memory and is written as v2 only on its next
 * real save. Nothing here throws: corrupt data degrades to defaults.
 *
 * v1 (2026-09-19): badges, counts.
 * v2 (2026-09-30): + xp, xpBackfilled, streak, news, recentStickers, practice.
 */
export const REWARDS_SCHEMA_VERSION = 2;

const DAY = /^\d{4}-\d{2}-\d{2}$/;

function obj(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}
function list(value) {
  return Array.isArray(value) ? value : [];
}
function int(value, min = 0, max = Number.MAX_SAFE_INTEGER) {
  const n = Math.floor(Number(value));
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : min;
}
function day(value) {
  return typeof value === "string" && DAY.test(value) ? value : null;
}
const isDay = (value) => day(value) !== null;

export function normaliseRewards(data) {
  const source = obj(data);
  const streak = obj(source.streak);
  const news = obj(source.news);
  const practice = obj(source.practice);

  return {
    ...source,
    schemaVersion: REWARDS_SCHEMA_VERSION,
    badges: list(source.badges),
    counts: obj(source.counts),
    xp: int(source.xp),
    xpBackfilled: source.xpBackfilled === true,
    streak: {
      ...streak,
      current: int(streak.current),
      best: int(streak.best),
      lastDay: day(streak.lastDay),
      freezes: int(streak.freezes, 0, 2),
      recent: list(streak.recent).filter(isDay),
      frozen: list(streak.frozen).filter(isDay),
    },
    news: { ...news, badges: list(news.badges), stickers: list(news.stickers) },
    recentStickers: list(source.recentStickers),
    practice: { day: day(practice.day), count: int(practice.count) },
  };
}
