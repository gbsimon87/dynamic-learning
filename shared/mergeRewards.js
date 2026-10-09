import { normaliseRewards } from "../src/data/rewardsShape.js";

const union = (a, b) => [...new Set([...a, ...b])];
const badgeKey = (badge) => typeof badge === "string" ? badge : badge.id;
const maximum = (a, b) => Math.max(Number(a) || 0, Number(b) || 0);

/** Three-way conflict handling. Earned badges/counters never regress.
 * XP uses the local delta once backfill is established; concurrent legacy
 * backfills use the maximum, so the same old learning is never paid twice.
 * A news clear removes only items seen by that client, keeping new arrivals.
 * Streak state follows the latest played day, retaining best/recent history.
 */
export function mergeRewards(currentData, incomingData, baseData = null) {
  const current = normaliseRewards(currentData);
  const incoming = normaliseRewards(incomingData);
  const base = baseData === null ? null : normaliseRewards(baseData);
  const badges = new Map(current.badges.map((badge) => [badgeKey(badge), badge]));
  for (const badge of incoming.badges) if (!badges.has(badgeKey(badge))) badges.set(badgeKey(badge), badge);
  const counts = { ...current.counts, ...incoming.counts };
  for (const key of Object.keys(counts)) counts[key] = maximum(current.counts[key], incoming.counts[key]);
  const news = { ...current.news, ...incoming.news };
  for (const key of ["badges", "stickers"]) {
    const removed = new Set(base ? base.news[key].filter((id) => !incoming.news[key].includes(id)) : []);
    const added = base ? incoming.news[key].filter((id) => !base.news[key].includes(id)) : incoming.news[key];
    news[key] = union(current.news[key].filter((id) => !removed.has(id)), added);
  }
  const streakUnchanged = base && JSON.stringify(current.streak) === JSON.stringify(base.streak);
  const streak = streakUnchanged
    || (incoming.streak.lastDay ?? "") > (current.streak.lastDay ?? "")
    || incoming.streak.lastDay === current.streak.lastDay && incoming.streak.current > current.streak.current
    ? incoming.streak : current.streak;
  const practice = (incoming.practice.day ?? "") > (current.practice.day ?? "") ? incoming.practice : current.practice;
  return {
    ...current, ...incoming,
    badges: [...badges.values()], counts, news,
    xp: base?.xpBackfilled && current.xpBackfilled
      ? current.xp + Math.max(0, incoming.xp - base.xp) : maximum(current.xp, incoming.xp),
    xpBackfilled: current.xpBackfilled || incoming.xpBackfilled,
    streak: { ...streak, best: maximum(current.streak.best, incoming.streak.best),
      recent: streakUnchanged ? incoming.streak.recent : union(current.streak.recent, incoming.streak.recent).sort().slice(-14),
      frozen: streakUnchanged ? incoming.streak.frozen : union(current.streak.frozen, incoming.streak.frozen).sort().slice(-14) },
    practice: { ...practice, count: current.practice.day === incoming.practice.day
      ? maximum(current.practice.count, incoming.practice.count) : practice.count },
    recentStickers: union(current.recentStickers, incoming.recentStickers).slice(-5),
  };
}
