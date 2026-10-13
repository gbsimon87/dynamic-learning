import { fullTopicComplete } from "./completionMilestones.js";
import { year3GeographyCurriculum } from "./year3GeographyCurriculum.js";

export const GEOGRAPHY_SURVEY_ACTIVITY = {
  title: "Try a land-use survey with a grown-up",
  steps: [
    "Ask: how is land used around a familiar place? Take paper and a pencil.",
    "Choose two observation points with a grown-up. Stay together in a suitable place.",
    "Use the same categories and observation time at both points: homes, shops, farming, leisure, uncertain.",
    "Tally visible uses. Record uncertain when the building's use is unclear.",
    "On paper, record Site A and Site B. Sketch a map with a key and draw a graph.",
    "Compare the sampled points. What might another point or time show?",
  ],
  note: "Optional fieldwork. A window observation with a grown-up or the example plan is an alternative. Keep records on paper; no address, location or photograph is collected. Digital completion does not certify outdoor observation.",
};

/** Read-only enrichment; uses the existing completion predicate and adds no stored state. */
export function completedGeographyActivity({ year, subject, categoryId, topicId, progress, isBuilt }) {
  if (Number(year) !== 3 || subject !== "geography" || topicId !== "surveying-local-land-use" || progress == null || typeof isBuilt !== "function") return null;
  const topic = year3GeographyCurriculum.find((c) => c.id === categoryId)?.topics.find((t) => t.id === topicId);
  return topic && fullTopicComplete(progress, categoryId, topic, isBuilt) ? GEOGRAPHY_SURVEY_ACTIVITY : null;
}
