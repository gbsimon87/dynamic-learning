import { buildGeographyTopic } from "../engine.js";
import { ALL_GEOGRAPHY_SOURCES } from "../allSources.js";
import { YEAR6_GEOGRAPHY_TOPICS } from "./topics.js";

export { YEAR6_GEOGRAPHY_TOPICS };
export const YEAR6_GEOGRAPHY_SOURCES = ALL_GEOGRAPHY_SOURCES;
export const YEAR6_GEOGRAPHY_BUILDERS = Object.fromEntries(
  Object.entries(YEAR6_GEOGRAPHY_TOPICS).map(([id, value]) => [id, buildGeographyTopic(value)]),
);
