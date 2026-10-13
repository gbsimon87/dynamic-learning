import { buildGeographyTopic } from "../engine.js";
import { ALL_GEOGRAPHY_SOURCES } from "../allSources.js";
import { GROUP1 } from "./group1.js";
import { GROUP2 } from "./group2.js";
import { GROUP3 } from "./group3.js";
import { GROUP4 } from "./group4.js";
import { GROUP5 } from "./group5.js";

export const YEAR4_GEOGRAPHY_TOPICS = { ...GROUP1, ...GROUP2, ...GROUP3, ...GROUP4, ...GROUP5 };
export const YEAR4_GEOGRAPHY_SOURCES = ALL_GEOGRAPHY_SOURCES;
export const YEAR4_GEOGRAPHY_BUILDERS = Object.fromEntries(Object.entries(YEAR4_GEOGRAPHY_TOPICS).map(([id, topic]) => [id, buildGeographyTopic(topic)]));
