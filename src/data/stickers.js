/**
 * Topic stickers: one collectible per curriculum topic.
 *
 * DERIVED, never stored. A sticker is "earned" exactly when the topic milestone
 * would say the topic is finished (`fullTopicComplete`), read straight from the
 * child's existing progress document. So there is nothing new to persist, no
 * backfill, and a child who finished topics before stickers existed has them
 * already. The cost is that a sticker has no "earned on" date.
 *
 * Pure, so it runs under `node --test`. `isBuilt(topicId, challengeId)` is
 * injected for the same reason the progress rules take it.
 */
import { fullTopicComplete } from "./completionMilestones.js";
import { getTopicStats } from "./curriculumProgressStats.js";

/**
 * @returns {{topicId, categoryId, name, icon, earned, available, remaining}}
 *   `available` is false while any of the topic's challenges is unbuilt — such
 *   a sticker cannot be earned yet, so the UI says "coming soon" rather than
 *   "N to go". `remaining` counts built challenges not yet done.
 */
export function topicSticker(progress, categoryId, topic, isBuilt) {
  const available =
    topic.challenges.length > 0 &&
    topic.challenges.every((challenge) => isBuilt(topic.id, challenge.id));
  const stats = getTopicStats(progress, categoryId, topic, isBuilt);

  return {
    topicId: topic.id,
    categoryId,
    name: topic.name,
    icon: topic.icon ?? "⭐",
    earned: fullTopicComplete(progress, categoryId, topic, isBuilt),
    available,
    remaining: stats.total - stats.completed,
  };
}

/** Every sticker in a curriculum, grouped by category (quest), in order. */
export function topicStickers(curriculum, progress, isBuilt) {
  return (curriculum ?? []).map((category) => ({
    categoryId: category.id,
    title: category.title,
    stickers: category.topics.map((topic) =>
      topicSticker(progress, category.id, topic, isBuilt)
    ),
  }));
}

/** `{ earned, total }` across grouped stickers from `topicStickers`. */
export function countStickers(groups) {
  const all = (groups ?? []).flatMap((group) => group.stickers);
  return { earned: all.filter((sticker) => sticker.earned).length, total: all.length };
}
