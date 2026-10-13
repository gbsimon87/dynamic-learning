import { buildGeographyTopic } from "../engine.js";
import { countiesCitiesAndRegions } from "./countiesCitiesAndRegions.js";
import { ukLandscapesAndLandUse } from "./ukLandscapesAndLandUse.js";
import { europeAndRussia } from "./europeAndRussia.js";
import { theEquatorAndHemispheres } from "./theEquatorAndHemispheres.js";
import { tropicsAndPolarCircles } from "./tropicsAndPolarCircles.js";
import { latitudeAndLongitude } from "./latitudeAndLongitude.js";
import { mountainsAndValleys } from "./mountainsAndValleys.js";
import { volcanoes } from "./volcanoes.js";
import { earthquakes } from "./earthquakes.js";
import { theWaterCycle } from "./theWaterCycle.js";
import { theLakeDistrict } from "./theLakeDistrict.js";
import { campania } from "./campania.js";
import { comparingTwoRegions } from "./comparingTwoRegions.js";
import { eightCompassPoints } from "./eightCompassPoints.js";
import { fourFigureGridReferences } from "./fourFigureGridReferences.js";
import { surveyingLocalLandUse } from "./surveyingLocalLandUse.js";

export const YEAR3_GEOGRAPHY_TOPICS = {
  "counties-cities-and-regions": countiesCitiesAndRegions,
  "uk-landscapes-and-land-use": ukLandscapesAndLandUse,
  "europe-and-russia": europeAndRussia,
  "the-equator-and-hemispheres": theEquatorAndHemispheres,
  "tropics-and-polar-circles": tropicsAndPolarCircles,
  "latitude-and-longitude": latitudeAndLongitude,
  "mountains-and-valleys": mountainsAndValleys,
  "volcanoes": volcanoes,
  "earthquakes": earthquakes,
  "the-water-cycle": theWaterCycle,
  "the-lake-district": theLakeDistrict,
  "campania": campania,
  "comparing-two-regions": comparingTwoRegions,
  "eight-compass-points": eightCompassPoints,
  "four-figure-grid-references": fourFigureGridReferences,
  "surveying-local-land-use": surveyingLocalLandUse,
};
export const YEAR3_GEOGRAPHY_BUILDERS = Object.fromEntries(Object.entries(YEAR3_GEOGRAPHY_TOPICS).map(([id, topic]) => [id, buildGeographyTopic(topic)]));
