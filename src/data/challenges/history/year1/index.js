import { buildHistoryTopic } from "../engine.js";
import { toysThenAndNow } from "./toysThenAndNow.js";

// Year 1 History topics, keyed by dataset topic id. Add each topic here when
// all four of its challenges ship (release order: shared-design-spec.md §8).
export const YEAR1_HISTORY_TOPICS = {
  "toys-then-and-now": toysThenAndNow,
};

// Stable builders keep HistoryChallenge's mount-time randomisation from restarting.
export const YEAR1_HISTORY_BUILDERS = Object.fromEntries(
  Object.entries(YEAR1_HISTORY_TOPICS).map(([id, topic]) => [id, buildHistoryTopic(topic)])
);
