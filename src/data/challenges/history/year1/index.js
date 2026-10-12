import { buildHistoryTopic } from "../engine.js";
import { toysThenAndNow } from "./toysThenAndNow.js";
import { homesThenAndNow } from "./homesThenAndNow.js";
import { schoolThenAndNow } from "./schoolThenAndNow.js";
import { seasideHolidaysThenAndNow } from "./seasideHolidaysThenAndNow.js";
import { theWrightBrothersFirstFlight } from "./theWrightBrothersFirstFlight.js";
import { flyingThenAndNow } from "./flyingThenAndNow.js";
import { christopherColumbus } from "./christopherColumbus.js";
import { neilArmstrong } from "./neilArmstrong.js";
import { explorersThenAndNow } from "./explorersThenAndNow.js";
import { queenElizabethI } from "./queenElizabethI.js";
import { queenVictoria } from "./queenVictoria.js";
import { twoQueensLongAgo } from "./twoQueensLongAgo.js";
import { oldAndNewBuildings } from "./oldAndNewBuildings.js";
import { cluesInStreetNames } from "./cluesInStreetNames.js";

// Year 1 History topics, keyed by dataset topic id, in dataset order. Add each
// topic here when all four of its challenges ship (release order: shared-design-spec.md §8).
export const YEAR1_HISTORY_TOPICS = {
  "toys-then-and-now": toysThenAndNow,
  "homes-then-and-now": homesThenAndNow,
  "school-then-and-now": schoolThenAndNow,
  "seaside-holidays-then-and-now": seasideHolidaysThenAndNow,
  "the-wright-brothers-first-flight": theWrightBrothersFirstFlight,
  "flying-then-and-now": flyingThenAndNow,
  "christopher-columbus": christopherColumbus,
  "neil-armstrong": neilArmstrong,
  "explorers-then-and-now": explorersThenAndNow,
  "queen-elizabeth-i": queenElizabethI,
  "queen-victoria": queenVictoria,
  "two-queens-long-ago": twoQueensLongAgo,
  "old-and-new-buildings": oldAndNewBuildings,
  "clues-in-street-names": cluesInStreetNames,
};

// Stable builders keep HistoryChallenge's mount-time randomisation from restarting.
export const YEAR1_HISTORY_BUILDERS = Object.fromEntries(
  Object.entries(YEAR1_HISTORY_TOPICS).map(([id, topic]) => [id, buildHistoryTopic(topic)])
);
