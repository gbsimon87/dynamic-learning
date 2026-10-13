import { buildGeographyTopic } from "../engine.js";
import { aroundOurSchool } from "./aroundOurSchool.js";
import { humanAndPhysicalFeatures } from "./humanAndPhysicalFeatures.js";
import { mapsFromAbove } from "./mapsFromAbove.js";
import { fourCountriesOfTheUk } from "./fourCountriesOfTheUk.js";
import { ukCapitalCities } from "./ukCapitalCities.js";
import { seasAroundTheUk } from "./seasAroundTheUk.js";
import { sevenContinents } from "./sevenContinents.js";
import { fiveOceans } from "./fiveOceans.js";
import { hotAndColdPlaces } from "./hotAndColdPlaces.js";
import { dailyWeather } from "./dailyWeather.js";
import { seasonsInTheUk } from "./seasonsInTheUk.js";
import { routesAndSimpleMaps } from "./routesAndSimpleMaps.js";

export const YEAR1_GEOGRAPHY_TOPICS = {
  "around-our-school": aroundOurSchool,
  "human-and-physical-features": humanAndPhysicalFeatures,
  "maps-from-above": mapsFromAbove,
  "four-countries-of-the-uk": fourCountriesOfTheUk,
  "uk-capital-cities": ukCapitalCities,
  "seas-around-the-uk": seasAroundTheUk,
  "seven-continents": sevenContinents,
  "five-oceans": fiveOceans,
  "hot-and-cold-places": hotAndColdPlaces,
  "daily-weather": dailyWeather,
  "seasons-in-the-uk": seasonsInTheUk,
  "routes-and-simple-maps": routesAndSimpleMaps,
};
export const YEAR1_GEOGRAPHY_BUILDERS = Object.fromEntries(Object.entries(YEAR1_GEOGRAPHY_TOPICS).map(([id, topic]) => [id, buildGeographyTopic(topic)]));
