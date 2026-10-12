import { fullTopicComplete } from "./completionMilestones.js";
import { year2HistoryCurriculum } from "./year2HistoryCurriculum.js";

export const HISTORY_ACTIVITIES = {
  "memorials-and-blue-plaques": {
 title: "Find a clue near you",
 steps: ["With a grown-up, look for a memorial or plaque nearby, or in a local museum's online pictures.", "Read its words together. Who or what does it remember?", "Ask why this person or event matters to the place."],
 note: "Optional: you do not need to visit anywhere to finish the topic.",
},
  "old-maps-and-photos": {
 title: "Compare a place near you",
 steps: ["Ask a grown-up to help find an old local photo through a library or museum.", "Compare it with a newer view of the same place.", "Point out one thing that changed and one that stayed, if you can."],
 note: "Optional: looking at pictures at home is enough. This activity does not change progress.",
},
};

// Read-only enrichment: never required for progress, rewards or certificates.
export function completedHistoryActivity({ year, subject, categoryId, topicId, progress, isBuilt }) {
  if (Number(year) !== 2 || subject !== "history" || progress == null || typeof isBuilt !== "function") return null;
  const topic = year2HistoryCurriculum.find((category) => category.id === categoryId)?.topics.find((item) => item.id === topicId);
  return topic && fullTopicComplete(progress, categoryId, topic, isBuilt) ? HISTORY_ACTIVITIES[topicId] ?? null : null;
}
