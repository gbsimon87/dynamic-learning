const object = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

/** Validate known fields without dropping extra fields or legacy numeric ids. */
export function isProgressData(data) {
  if (!object(data)) return false;
  return Object.values(data).every((category) => object(category)
    && (category.topics === undefined || object(category.topics)
      && Object.values(category.topics).every((topic) => object(topic)
        && (topic.completedChallenges === undefined || Array.isArray(topic.completedChallenges)
          && topic.completedChallenges.every((id) => (typeof id === "number" || typeof id === "string" && id.trim() !== "")
            && Number.isFinite(Number(id)))))));
}
