import { requireJourney, introductionForScope } from "../../shared/curriculumJourneyData.js";
import { buildLockState } from "./curriculumLocks.js";

export { CURRICULUM_JOURNEY_ENABLED } from "./curriculumJourneyFlag.js";
export const curriculumAssessmentHref = (year, subject, kind, categoryId) => kind === "subject"
  ? `/curriculum/year/${year}/${subject}/final-test` : `/curriculum/year/${year}/${subject}/quest/${categoryId}/mastery`;

export function curriculumEntryScopes(pathway, { target, categoryId, topicId, replay = null }) {
  const quest = pathway.categories.find((q) => q.id === categoryId);
  const topic = quest?.topics.find((t) => t.id === topicId);
  if (replay) {
    requireJourney(replay === "subject" || replay === "quest" && quest || replay === "topic" && topic, "INVALID_REPLAY");
    return [replay === "subject" ? "subject" : replay === "quest" ? `quest:${categoryId}` : `topic:${categoryId}:${topicId}`];
  }
  if (target === "map" || target === "subject") return ["subject"];
  requireJourney(quest && (target === "quest" || target === "challenge" && topic), "INVALID_SCOPE");
  return ["subject", `quest:${categoryId}`, ...(target === "challenge" ? [`topic:${categoryId}:${topicId}`] : [])];
}

export function pendingCurriculumIntroductions(scopes, doc, suppressed = new Set(), replay = false) {
  const seen = new Set(doc?.data.acknowledged.map((a) => a.scopeId) ?? []);
  return scopes.filter((scope) => !suppressed.has(scope) && (replay || !seen.has(scope)));
}
export { introductionForScope };

export function getCurriculumReviewActions({ curriculum, before, after, categoryId, isBuilt, year, subject }) {
  const built = (state) => buildLockState({ curriculum, progress: state, isBuilt }).filter((q) => q.topics.some((t) => !t.unbuilt));
  const previous = built(before), next = built(after);
  const actions = [];
  if (!previous.find((q) => q.id === categoryId)?.complete && next.find((q) => q.id === categoryId)?.complete) {
    actions.push({ label: "Try Quest Mastery", href: curriculumAssessmentHref(year, subject, "quest", categoryId) });
  }
  if (next.length && next.every((q) => q.complete) && !previous.every((q) => q.complete)) {
    actions.push({ label: "Try your subject final test", href: curriculumAssessmentHref(year, subject, "subject", null) });
  }
  return actions;
}

/** Child-readable text for a saved raw answer, using only public item data. */
export function describeAssessmentResponse(input, value) {
  const label = (list, id) => list.find((entry) => entry.id === id)?.label ?? id;
  switch (input.kind) {
    case "choice": return label(input.options, value);
    case "order": return value.map((id) => label(input.cards, id)).join(" → ");
    case "sort": return value.map((v) => `${label(input.cards, v.cardId)}: ${label(input.bins, v.binId)}`).join("; ");
    case "fractionShade": return `${value.length} of ${input.parts} parts shaded`;
    case "numberTrack": return `mark ${value}`;
    default: return String(value);
  }
}

export const ASSESSMENT_SECTION_SIZE = 4;

/**
 * Practice suggestions from a completed or partial session: topics with
 * incorrect/skipped sampled items, most missed first, then curriculum order.
 * Targets resolve against CURRENT availability; a vanished slot falls back to
 * another built challenge in the topic, otherwise the suggestion has no link.
 */
export function assessmentPracticeSuggestions(session, curriculum, isBuilt) {
  const order = [];
  for (const quest of curriculum) for (const topic of quest.topics) order.push(`${quest.id}/${topic.id}`);
  const byTopic = new Map();
  session.items.forEach((item, index) => {
    const outcome = session.responses[index]?.outcome;
    if (outcome !== "incorrect" && outcome !== "skipped") return;
    const key = `${item.categoryId}/${item.topicId}`;
    const entry = byTopic.get(key) ?? { categoryId: item.categoryId, topicId: item.topicId, missed: 0, targets: [] };
    entry.missed++; entry.targets.push(item.practice.challengeId);
    byTopic.set(key, entry);
  });
  return [...byTopic.values()].sort((a, b) => b.missed - a.missed
    || order.indexOf(`${a.categoryId}/${a.topicId}`) - order.indexOf(`${b.categoryId}/${b.topicId}`)).map((entry) => {
    const topic = curriculum.find((q) => q.id === entry.categoryId)?.topics.find((t) => t.id === entry.topicId);
    const built = topic?.challenges.filter((c) => isBuilt(topic.id, c.id)).map((c) => Number(c.id)) ?? [];
    const challengeId = entry.targets.find((id) => built.includes(id)) ?? built[0] ?? null;
    return { categoryId: entry.categoryId, topicId: entry.topicId, topicName: topic?.name ?? entry.topicId, missed: entry.missed, challengeId };
  });
}
