import { isProgressData } from "./progressData.js";

export const PROGRESS_SCHEMA_VERSION = 1;
export const PROGRESS_MIGRATIONS = {};

/** Read-time only. Add a numbered step BEFORE shipping an ID/shape change.
 * A step receives a copy and must preserve unknown fields and completions.
 * The stored document is upgraded only by the next successful real save.
 */
export function migrateProgressDocument(doc, { version = PROGRESS_SCHEMA_VERSION, migrations = PROGRESS_MIGRATIONS } = {}) {
  if (doc === null) return null;
  if (!doc || !isProgressData(doc.data)) throw new Error("INVALID_PROGRESS");
  const sourceVersion = doc.schemaVersion ?? 1;
  if (!Number.isSafeInteger(sourceVersion) || sourceVersion < 1 || sourceVersion > version) {
    throw new Error("UNSUPPORTED_PROGRESS_VERSION");
  }
  let next = structuredClone(doc);
  for (let current = sourceVersion; current < version; current++) {
    const migrate = migrations[current];
    if (typeof migrate !== "function") throw new Error("PROGRESS_MIGRATION_REQUIRED");
    next = migrate(next);
    if (!next || !isProgressData(next.data)) throw new Error("INVALID_PROGRESS_MIGRATION");
    next.schemaVersion = current + 1;
  }
  return { ...next, schemaVersion: version };
}

/** Completions are monotonic. A stale snapshot cannot remove saved learning. */
export function mergeProgress(current, incoming) {
  if (!isProgressData(current) || !isProgressData(incoming)) throw new Error("INVALID_PROGRESS");
  const next = structuredClone(current);
  for (const [categoryId, category] of Object.entries(incoming)) {
    const previous = Object.hasOwn(next, categoryId) ? next[categoryId] : {};
    const topics = { ...previous.topics };
    for (const [topicId, topic] of Object.entries(category.topics ?? {})) {
      const old = Object.hasOwn(topics, topicId) ? topics[topicId] : {};
      const merged = { ...old, ...topic };
      if (old.completedChallenges || topic.completedChallenges) {
        merged.completedChallenges = [...new Set([
          ...(old.completedChallenges ?? []), ...(topic.completedChallenges ?? []),
        ].map(Number))];
      }
      Object.defineProperty(topics, topicId, { value: merged, enumerable: true, configurable: true, writable: true });
    }
    const merged = { ...previous, ...category };
    if (previous.topics || category.topics) merged.topics = topics;
    Object.defineProperty(next, categoryId, { value: merged, enumerable: true, configurable: true, writable: true });
  }
  return next;
}

/** For future version steps: copy renamed IDs, retaining originals/metadata.
 * Collisions union completions rather than overwriting an existing target.
 */
export function copyProgressIds(data, { categories = {}, topics = {}, challenges = {} } = {}) {
  const renamed = (mapping, id) => Object.hasOwn(mapping, id) ? mapping[id] : id;
  let next = mergeProgress({}, data);
  for (const [categoryId, category] of Object.entries(data)) {
    const targetCategory = renamed(categories, categoryId);
    next = mergeProgress(next, { [targetCategory]: { ...category, topics: {} } });
    for (const [topicId, topic] of Object.entries(category.topics ?? {})) {
      const topicKey = `${categoryId}/${topicId}`;
      const targetTopic = Object.hasOwn(topics, topicKey) ? topics[topicKey] : topicId;
      const copied = { ...topic };
      if (topic.completedChallenges) copied.completedChallenges = topic.completedChallenges.map(
        (id) => Object.hasOwn(challenges, `${topicKey}/${id}`) ? Number(challenges[`${topicKey}/${id}`]) : Number(id)
      );
      next = mergeProgress(next, { [targetCategory]: { topics: { [targetTopic]: copied } } });
    }
  }
  return next;
}
