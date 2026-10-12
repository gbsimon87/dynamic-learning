import { buildHistoryTopic } from "../engine.js";
import { howWeKnowAboutPrehistory } from "./howWeKnowAboutPrehistory.js";
import { stoneAgeHunterGatherers } from "./stoneAgeHunterGatherers.js";
import { theFirstFarmersAndSkaraBrae } from "./theFirstFarmersAndSkaraBrae.js";
import { stonehengeAndTheBronzeAge } from "./stonehengeAndTheBronzeAge.js";
import { ironAgeHillForts } from "./ironAgeHillForts.js";
import { fromStoneToIron } from "./fromStoneToIron.js";
import { theRomanEmpireAndItsArmy } from "./theRomanEmpireAndItsArmy.js";
import { juliusCaesarTriesToInvade } from "./juliusCaesarTriesToInvade.js";
import { claudiusConquersBritain } from "./claudiusConquersBritain.js";
import { boudicaFightsBack } from "./boudicaFightsBack.js";
import { hadriansWall } from "./hadriansWall.js";
import { romanTownsRoadsAndBaths } from "./romanTownsRoadsAndBaths.js";
import { romanGodsAndEarlyChristianity } from "./romanGodsAndEarlyChristianity.js";
import { howTheRomansChangedBritain } from "./howTheRomansChangedBritain.js";
import { whereTheFirstCivilisationsBegan } from "./whereTheFirstCivilisationsBegan.js";
import { whatTheFirstCivilisationsGaveUs } from "./whatTheFirstCivilisationsGaveUs.js";
import { theRiverNile } from "./theRiverNile.js";
import { pharaohsAndPyramids } from "./pharaohsAndPyramids.js";
import { hieroglyphs } from "./hieroglyphs.js";
import { egyptianGodsAndMummies } from "./egyptianGodsAndMummies.js";
import { everydayLifeInAncientEgypt } from "./everydayLifeInAncientEgypt.js";
import { tutankhamunsTomb } from "./tutankhamunsTomb.js";

export const YEAR3_HISTORY_TOPICS = {
  "how-we-know-about-prehistory": howWeKnowAboutPrehistory,
  "stone-age-hunter-gatherers": stoneAgeHunterGatherers,
  "the-first-farmers-and-skara-brae": theFirstFarmersAndSkaraBrae,
  "stonehenge-and-the-bronze-age": stonehengeAndTheBronzeAge,
  "iron-age-hill-forts": ironAgeHillForts,
  "from-stone-to-iron": fromStoneToIron,
  "the-roman-empire-and-its-army": theRomanEmpireAndItsArmy,
  "julius-caesar-tries-to-invade": juliusCaesarTriesToInvade,
  "claudius-conquers-britain": claudiusConquersBritain,
  "boudica-fights-back": boudicaFightsBack,
  "hadrians-wall": hadriansWall,
  "roman-towns-roads-and-baths": romanTownsRoadsAndBaths,
  "roman-gods-and-early-christianity": romanGodsAndEarlyChristianity,
  "how-the-romans-changed-britain": howTheRomansChangedBritain,
  "where-the-first-civilisations-began": whereTheFirstCivilisationsBegan,
  "what-the-first-civilisations-gave-us": whatTheFirstCivilisationsGaveUs,
  "the-river-nile": theRiverNile,
  "pharaohs-and-pyramids": pharaohsAndPyramids,
  "hieroglyphs": hieroglyphs,
  "egyptian-gods-and-mummies": egyptianGodsAndMummies,
  "everyday-life-in-ancient-egypt": everydayLifeInAncientEgypt,
  "tutankhamuns-tomb": tutankhamunsTomb,
};
export const YEAR3_HISTORY_BUILDERS = Object.fromEntries(
  Object.entries(YEAR3_HISTORY_TOPICS).map(([id, data]) => {
    const build = buildHistoryTopic(data);
    return [id, (level, rng) => {
      const run = build(level, rng);
      return { ...run, questions: run.questions.map((q) => q.kind === "order" ? { ...q, direction: "vertical" } : q) };
    }];
  })
);
