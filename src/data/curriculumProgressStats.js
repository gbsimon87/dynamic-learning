/**
 * Read-only progress statistics derived from the `progress` object that
 * useProgress already returns. Nothing here writes, and nothing here changes
 * an unlock rule — see .claude/skills/curriculum-progress for that contract.
 *
 * `isBuilt(topicId, challengeId)` is injected rather than imported so these
 * functions stay pure and testable outside Vite (challengeAvailability relies
 * on import.meta.glob). CurriculumPage passes a closure over its subject/year.
 */

function emptyStats() {
  return { completed: 0, total: 0, percent: 0 };
}

function withPercent(completed, total) {
  // A topic with nothing built is 0%, not NaN.
  return { completed, total, percent: total === 0 ? 0 : Math.round((completed / total) * 100) };
}

/** Built-challenge counts for one topic within a category. */
export function getTopicStats(progress, categoryId, topic, isBuilt) {
  const built = topic.challenges.filter((challenge) =>
    isBuilt(topic.id, Number(challenge.id))
  );
  if (built.length === 0) return emptyStats();

  const completedIds = new Set(
    (progress?.[categoryId]?.topics?.[topic.id]?.completedChallenges || []).map(Number)
  );

  // Intersect with the built set: a stale id, or one for a challenge that was
  // never built, must not push a topic past its own total.
  const completed = built.filter((challenge) =>
    completedIds.has(Number(challenge.id))
  ).length;

  return withPercent(completed, built.length);
}

/**
 * Built-challenge counts summed across an entire year's curriculum.
 *
 * `total` and `percent` cover only what has been built, so 100% is reachable.
 * `datasetTotal` is every challenge in the dataset, built or not, so the UI can
 * say "8 of 8 available · 8 of 148 in the full curriculum" rather than letting
 * a bare 100% read as "Year 2 Maths finished".
 */
export function getYearStats(progress, curriculum, isBuilt) {
  let completed = 0;
  let total = 0;
  let datasetTotal = 0;

  for (const category of curriculum) {
    for (const topic of category.topics) {
      const stats = getTopicStats(progress, category.id, topic, isBuilt);
      completed += stats.completed;
      total += stats.total;
      datasetTotal += topic.challenges.length;
    }
  }

  return { ...withPercent(completed, total), datasetTotal };
}

/**
 * Per-category and per-topic counts for a whole curriculum, in display order.
 *
 * The grown-up's view of "how is this child doing" needs the shape of the
 * progress, not just its size: 40% spread evenly across eight categories means
 * something different from 40% concentrated in two. Built-only throughout, for
 * the same reason `getYearStats` is — a category with nothing built yet reports
 * 0 of 0 rather than dragging the picture down.
 *
 * @returns {Array<{id, title, completed, total, percent, topics: Array}>}
 */
export function getCategoryBreakdown(progress, curriculum, isBuilt) {
  return (curriculum ?? []).map((category) => {
    const topics = category.topics.map((topic) => ({
      id: topic.id,
      name: topic.name,
      ...getTopicStats(progress, category.id, topic, isBuilt),
    }));

    const completed = topics.reduce((sum, topic) => sum + topic.completed, 0);
    const total = topics.reduce((sum, topic) => sum + topic.total, 0);

    return { id: category.id, title: category.title, ...withPercent(completed, total), topics };
  });
}
