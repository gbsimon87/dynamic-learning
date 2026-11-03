import { buildGeographyTopic } from "../engine.js";
import { ALL_GEOGRAPHY_SOURCES } from "../allSources.js";
import { scotlandAndTheHighlands } from "./scotlandAndTheHighlands.js";
import { andalusiaInSpain } from "./andalusiaInSpain.js";
import { theAmazonRegionOfBrazil } from "./theAmazonRegionOfBrazil.js";
import { coastsAndCoastalLandforms } from "./coastsAndCoastalLandforms.js";
import { riversInFlood } from "./riversInFlood.js";
import { livingWithNaturalHazards } from "./livingWithNaturalHazards.js";
import { climateGraphsAndPatterns } from "./climateGraphsAndPatterns.js";
import { biomesAndSustainability } from "./biomesAndSustainability.js";
import { naturalResourcesAroundTheWorld } from "./naturalResourcesAroundTheWorld.js";
import { tradeLinksAndGlobalConnections } from "./tradeLinksAndGlobalConnections.js";
import { settlementGrowthAndChange } from "./settlementGrowthAndChange.js";
import { economicActivityAndJobs } from "./economicActivityAndJobs.js";
import { latitudeAndLongitudeInPractice } from "./latitudeAndLongitudeInPractice.js";
import { timeZonesAndJourneys } from "./timeZonesAndJourneys.js";
import { contoursScaleAndOsMaps } from "./contoursScaleAndOsMaps.js";
import { designingAFieldworkEnquiry } from "./designingAFieldworkEnquiry.js";

// Keyed by topic id (the kebab-case of the topic name in year5GeographyCurriculum.js).
export const YEAR5_GEOGRAPHY_TOPICS = {
  "scotland-and-the-highlands": scotlandAndTheHighlands,
  "andalusia-in-spain": andalusiaInSpain,
  "the-amazon-region-of-brazil": theAmazonRegionOfBrazil,
  "coasts-and-coastal-landforms": coastsAndCoastalLandforms,
  "rivers-in-flood": riversInFlood,
  "living-with-natural-hazards": livingWithNaturalHazards,
  "climate-graphs-and-patterns": climateGraphsAndPatterns,
  "biomes-and-sustainability": biomesAndSustainability,
  "natural-resources-around-the-world": naturalResourcesAroundTheWorld,
  "trade-links-and-global-connections": tradeLinksAndGlobalConnections,
  "settlement-growth-and-change": settlementGrowthAndChange,
  "economic-activity-and-jobs": economicActivityAndJobs,
  "latitude-and-longitude-in-practice": latitudeAndLongitudeInPractice,
  "time-zones-and-journeys": timeZonesAndJourneys,
  "contours-scale-and-os-maps": contoursScaleAndOsMaps,
  "designing-a-fieldwork-enquiry": designingAFieldworkEnquiry,
};
export const YEAR5_GEOGRAPHY_SOURCES = ALL_GEOGRAPHY_SOURCES;
export const YEAR5_GEOGRAPHY_BUILDERS = Object.fromEntries(Object.entries(YEAR5_GEOGRAPHY_TOPICS).map(([id, topic]) => [id, buildGeographyTopic(topic)]));
