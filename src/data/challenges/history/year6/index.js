import { buildHistoryTopic } from "../engine.js";
import { whatIsLocalHistory } from "./whatIsLocalHistory.js";
import { mapsThroughTime } from "./mapsThroughTime.js";
import { buildingsAndStreetsAsEvidence } from "./buildingsAndStreetsAsEvidence.js";
import { censusPhotosAndMemories } from "./censusPhotosAndMemories.js";
import { planningALocalStudy } from "./planningALocalStudy.js";
import { jarrowAndTheVenerableBede } from "./jarrowAndTheVenerableBede.js";
import { palmersShipyardAndTheIronShips } from "./palmersShipyardAndTheIronShips.js";
import { theJarrowMarch1936 } from "./theJarrowMarch1936.js";
import { lawAndOrderBefore1066 } from "./lawAndOrderBefore1066.js";
import { normanLawAndTheForest } from "./normanLawAndTheForest.js";
import { magnaCartaAndTrialByJury } from "./magnaCartaAndTrialByJury.js";
import { vagabondsPlotsAndThePoorLaw } from "./vagabondsPlotsAndThePoorLaw.js";
import { highwaymenAndTheBloodyCode } from "./highwaymenAndTheBloodyCode.js";
import { transportationToAustralia } from "./transportationToAustralia.js";
import { peelsPolice } from "./peelsPolice.js";
import { prisonsAndReformers } from "./prisonsAndReformers.js";
import { crimeFightingToday } from "./crimeFightingToday.js";
import { changeAndContinuity } from "./changeAndContinuity.js";
import { causeAndConsequence } from "./causeAndConsequence.js";
import { whoAndWhatMattered } from "./whoAndWhatMattered.js";

export const YEAR6_HISTORY_TOPICS = {
  "what-is-local-history": whatIsLocalHistory,
  "maps-through-time": mapsThroughTime,
  "buildings-and-streets-as-evidence": buildingsAndStreetsAsEvidence,
  "census-photos-and-memories": censusPhotosAndMemories,
  "planning-a-local-study": planningALocalStudy,
  "jarrow-and-the-venerable-bede": jarrowAndTheVenerableBede,
  "palmers-shipyard-and-the-iron-ships": palmersShipyardAndTheIronShips,
  "the-jarrow-march-1936": theJarrowMarch1936,
  "law-and-order-before-1066": lawAndOrderBefore1066,
  "norman-law-and-the-forest": normanLawAndTheForest,
  "magna-carta-and-trial-by-jury": magnaCartaAndTrialByJury,
  "vagabonds-plots-and-the-poor-law": vagabondsPlotsAndThePoorLaw,
  "highwaymen-and-the-bloody-code": highwaymenAndTheBloodyCode,
  "transportation-to-australia": transportationToAustralia,
  "peels-police": peelsPolice,
  "prisons-and-reformers": prisonsAndReformers,
  "crime-fighting-today": crimeFightingToday,
  "change-and-continuity": changeAndContinuity,
  "cause-and-consequence": causeAndConsequence,
  "who-and-what-mattered": whoAndWhatMattered,
};
export const YEAR6_HISTORY_BUILDERS = Object.fromEntries(
  Object.entries(YEAR6_HISTORY_TOPICS).map(([id, data]) => {
    const build = buildHistoryTopic(data);
    return [id, (level, rng) => {
      const run = build(level, rng);
      return { ...run, questions: run.questions.map((q) => q.kind === "order" ? { ...q, direction: "vertical" } : q) };
    }];
  })
);
