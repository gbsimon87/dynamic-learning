import { buildGeographyTopic } from "../engine.js";
import { continentsAndOceansTogether } from "./continentsAndOceansTogether.js";
import { ukPlacesAndLandscapes } from "./ukPlacesAndLandscapes.js";
import { compassDirectionsAndRoutes } from "./compassDirectionsAndRoutes.js";
import { weatherRecords } from "./weatherRecords.js";
import { theEquatorAndThePoles } from "./theEquatorAndThePoles.js";
import { whitbyByTheSea } from "./whitbyByTheSea.js";
import { kampongAyerByTheRiver } from "./kampongAyerByTheRiver.js";
import { homesAndJourneysInTwoPlaces } from "./homesAndJourneysInTwoPlaces.js";
import { comparingTwoSmallPlaces } from "./comparingTwoSmallPlaces.js";
import { aerialViewsAndLandmarks } from "./aerialViewsAndLandmarks.js";
import { symbolsAndMapKeys } from "./symbolsAndMapKeys.js";
import { makingASimpleMap } from "./makingASimpleMap.js";
import { observingOurSchoolGrounds } from "./observingOurSchoolGrounds.js";
import { exploringOurLocalArea } from "./exploringOurLocalArea.js";

export const YEAR2_GEOGRAPHY_TOPICS = {
  "continents-and-oceans-together": continentsAndOceansTogether,
  "uk-places-and-landscapes": ukPlacesAndLandscapes,
  "compass-directions-and-routes": compassDirectionsAndRoutes,
  "weather-records": weatherRecords,
  "the-equator-and-the-poles": theEquatorAndThePoles,
  "whitby-by-the-sea": whitbyByTheSea,
  "kampong-ayer-by-the-river": kampongAyerByTheRiver,
  "homes-and-journeys-in-two-places": homesAndJourneysInTwoPlaces,
  "comparing-two-small-places": comparingTwoSmallPlaces,
  "aerial-views-and-landmarks": aerialViewsAndLandmarks,
  "symbols-and-map-keys": symbolsAndMapKeys,
  "making-a-simple-map": makingASimpleMap,
  "observing-our-school-grounds": observingOurSchoolGrounds,
  "exploring-our-local-area": exploringOurLocalArea,
};
export const YEAR2_GEOGRAPHY_BUILDERS = Object.fromEntries(Object.entries(YEAR2_GEOGRAPHY_TOPICS).map(([id, topic]) => [id, buildGeographyTopic(topic)]));
