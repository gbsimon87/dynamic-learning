/**
 * "Where was this child up to?" for the homepage Keep-going card.
 *
 * A child's progress lives in one document per year+subject, and nothing
 * records which curriculum they were last on — so the picker reads every
 * available curriculum's document and takes the one stamped most recently.
 *
 * Read-only by construction: it takes progress documents as data and returns a
 * description. It never writes, and it re-uses `buildLockState` rather than
 * re-deriving any unlock rule, so the card can never point a learner at a
 * challenge the curriculum screen shows as locked
 * (see .claude/skills/curriculum-progress).
 *
 * Pure: no React, no storage, no `import.meta.glob`, so it runs under
 * `node --test`. Availability arrives per-candidate as an `isBuilt` callback.
 */
import { buildLockState } from "../../data/curriculumLocks.js";
import { getTopicStats, getYearStats } from "../../data/curriculumProgressStats.js";

/** True when this progress document records at least one completed challenge. */
function hasProgress(progress) {
  if (!progress) return false;

  return Object.values(progress).some((category) =>
    Object.values(category?.topics ?? {}).some(
      (topic) => (topic?.completedChallenges ?? []).length > 0
    )
  );
}

/** Milliseconds since the epoch, or 0 for a missing or unparseable stamp. */
function stampedAt(updatedAt) {
  const ms = Date.parse(updatedAt ?? "");
  return Number.isNaN(ms) ? 0 : ms;
}

/** Most recently touched; ties break towards the higher year group. */
function mostRecent(a, b) {
  const byStamp = stampedAt(b.updatedAt) - stampedAt(a.updatedAt);
  return byStamp !== 0 ? byStamp : b.year - a.year;
}

/** First challenge in display order that is open, built and not yet done. */
function firstPlayable(lockState, year, subject) {
  for (const category of lockState) {
    for (const topic of category.topics) {
      for (const challenge of topic.challenges) {
        if (challenge.locked || challenge.missing || challenge.completed) continue;

        return {
          categoryId: category.id,
          topicId: topic.id,
          topicName: topic.name,
          challengeId: challenge.id,
          challengeTitle: challenge.title,
          href: `/year/${year}/${subject}/problem/${category.id}/${topic.id}/${challenge.id}`,
        };
      }
    }
  }

  return null;
}

/**
 * Built-challenge progress through the topic the learner is currently in.
 *
 * The homepage ring reads this rather than the year figure: two challenges out
 * of a whole year rounds to 1%, which tells a 6-year-old their work amounted to
 * nothing. The same two inside a four-challenge topic is half way.
 */
function currentTopic(curriculum, progress, isBuilt, position) {
  if (!position) return null;

  const category = curriculum.find((entry) => entry.id === position.categoryId);
  const topic = category?.topics.find((entry) => entry.id === position.topicId);
  if (!topic) return null;

  return {
    id: topic.id,
    name: topic.name,
    ...getTopicStats(progress, category.id, topic, isBuilt),
  };
}

/**
 * @param {Array} candidates one entry per available curriculum:
 *   { year, subject, subjectName, curriculum, progress, updatedAt, isBuilt }
 *
 * @returns {object|null} null when nothing has been started yet — the homepage
 *   shows its "start your journey" invitation instead. Otherwise:
 *   { year, subject, subjectName, stats, topicsHref,
 *     next: { categoryId, topicId, topicName, challengeId, challengeTitle, href } | null,
 *     topic: { id, name, completed, total, percent } | null }
 *   `next` and `topic` are both null when everything built has been completed.
 */
export function pickResume(candidates) {
  const started = (candidates ?? [])
    .filter((entry) => entry?.curriculum?.length && hasProgress(entry.progress))
    .sort(mostRecent);

  const chosen = started[0];
  if (!chosen) return null;

  const { year, subject, subjectName, curriculum, progress, isBuilt } = chosen;

  const lockState = buildLockState({ curriculum, progress, isBuilt });
  const next = firstPlayable(lockState, year, subject);

  return {
    year,
    subject,
    subjectName,
    stats: getYearStats(progress, curriculum, isBuilt),
    topic: currentTopic(curriculum, progress, isBuilt, next),
    topicsHref: `/curriculum/year/${year}/${subject}`,
    next,
  };
}
