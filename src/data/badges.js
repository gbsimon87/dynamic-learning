/**
 * The badge catalogue and the pure rule for awarding them.
 *
 * Badges hang off `completionMilestones.getCompletionMilestones`, which already
 * decides — and is already tested for — when a challenge, topic, category,
 * subject or year is finished. Nothing here re-derives any of that; it maps
 * milestones that have just been earned onto badges not yet held.
 *
 * Pure: no React, no storage, no dates beyond what the caller passes in, so it
 * runs under `node --test`.
 *
 * WHY NOT STREAKS: a streak needs to know which DAYS a child played, and
 * nothing records that. Rather than invent a half-answer from the one
 * `updatedAt` stamp per curriculum, streaks are deliberately out of scope —
 * see PROJECT_IDEAS.
 */

/**
 * `level` is the milestone that earns it, `repeatable` marks the badges a
 * learner can hold several of (one per topic finished, say) rather than once.
 *
 * `unlocksAvatar` names an emoji from AVATARS_UNLOCKABLE. Keeping the link here
 * rather than in avatars.js means a designer adding a badge adds its reward in
 * the same place, and an avatar can never be unlockable by nothing.
 */
export const BADGES = [
  {
    id: "first-steps",
    level: "challenge",
    once: true,
    icon: "🌱",
    name: "First steps",
    blurb: "You finished your very first challenge!",
  },
  {
    id: "topic-finisher",
    level: "topic",
    icon: "🏆",
    name: "Topic finisher",
    blurb: "You finished every challenge in a topic.",
    unlocksAvatar: "🐨",
  },
  {
    id: "topic-master",
    level: "topic",
    threshold: 5,
    icon: "🌟",
    name: "Topic master",
    blurb: "Five whole topics finished.",
    unlocksAvatar: "🦉",
  },
  {
    id: "quest-champion",
    level: "category",
    icon: "👑",
    name: "Quest champion",
    blurb: "You finished a whole quest.",
    unlocksAvatar: "🐲",
  },
  {
    id: "year-hero",
    level: "subject",
    icon: "🚀",
    name: "Year hero",
    blurb: "Every challenge in the year, done.",
    unlocksAvatar: "🦖",
  },
];

const BY_ID = new Map(BADGES.map((badge) => [badge.id, badge]));

/** @returns {object|undefined} the catalogue entry for an id. */
export function getBadge(id) {
  return BY_ID.get(id);
}

/** Avatars a learner starts with, and the ones a badge opens up. */
export const AVATARS_UNLOCKABLE = BADGES.filter((badge) => badge.unlocksAvatar).map(
  (badge) => badge.unlocksAvatar
);

/** Which badge unlocks a given avatar, or undefined if it is a starter. */
export function badgeForAvatar(emoji) {
  return BADGES.find((badge) => badge.unlocksAvatar === emoji);
}

/**
 * The empty document, so callers never branch on "has this child any?".
 *
 * `counts` tallies milestones REACHED, which is not the same as badges held:
 * "Topic master" needs five topics, but only the first topic awards a badge, so
 * the badge log alone can never tell you how many topics are done. The tally
 * has to be its own field.
 */
export function emptyRewards() {
  return { schemaVersion: 1, badges: [], counts: {} };
}

/** Ids currently held, as a Set. */
export function heldBadgeIds(rewards) {
  return new Set((rewards?.badges ?? []).map((entry) => entry.id));
}

/** How many times a milestone level has been reached. */
export function countAtLevel(rewards, level) {
  return Number(rewards?.counts?.[level] ?? 0);
}

/**
 * Awards whatever the just-earned milestones deserve, and tallies them.
 *
 * IDEMPOTENT, which matters more than it sounds: `getCompletionMilestones`
 * returns `earned: []` for a challenge already complete, so replaying a
 * completion — a double submit, a refresh, a child redoing a topic for fun —
 * neither awards a badge twice nor inflates the tally. That guarantee lives
 * there; this function relies on it and must not be called with invented
 * milestones.
 *
 * @param {object} rewards   the child's current rewards document
 * @param {string[]} earned  milestone levels from getCompletionMilestones
 * @param {object} context   { at: ISO string, year, subject }
 * @returns {{rewards: object, awarded: object[]}} the new document and the
 *   catalogue entries just earned. `rewards` is the SAME object when nothing
 *   changed, so a caller can skip the write.
 */
export function earnBadges(rewards, earned, context = {}) {
  const current = rewards ?? emptyRewards();
  const earnedLevels = new Set(earned ?? []);
  if (earnedLevels.size === 0) return { rewards: current, awarded: [] };

  // Tally first: a threshold badge earned on this very run must see the
  // milestone that triggered it counted.
  const counts = { ...(current.counts ?? {}) };
  for (const level of earnedLevels) {
    counts[level] = (Number(counts[level]) || 0) + 1;
  }

  const held = heldBadgeIds(current);
  const awarded = [];
  const log = [...(current.badges ?? [])];

  for (const badge of BADGES) {
    if (held.has(badge.id)) continue;
    if (!earnedLevels.has(badge.level)) continue;
    if (badge.threshold && counts[badge.level] < badge.threshold) continue;

    const entry = {
      id: badge.id,
      level: badge.level,
      earnedAt: context.at ?? null,
      year: context.year ?? null,
      subject: context.subject ?? null,
    };
    log.push(entry);
    held.add(badge.id);
    awarded.push(badge);
  }

  // The tally moved even when no badge did, so this is always a new document.
  return {
    rewards: { ...current, schemaVersion: 1, badges: log, counts },
    awarded,
  };
}

/** Avatars this child may choose: the starters plus anything they have earned. */
export function unlockedAvatars(rewards, starters) {
  const held = heldBadgeIds(rewards);
  const earned = BADGES.filter(
    (badge) => badge.unlocksAvatar && held.has(badge.id)
  ).map((badge) => badge.unlocksAvatar);
  return [...starters, ...earned];
}
