import { buildHistoryTopic } from "../engine.js";
import { whereAncientGreeceWas } from "./whereAncientGreeceWas.js";
import { athensAndSparta } from "./athensAndSparta.js";
import { everydayLifeInAthens } from "./everydayLifeInAthens.js";
import { democracyInAthens } from "./democracyInAthens.js";
import { greekGodsAndMyths } from "./greekGodsAndMyths.js";
import { theParthenonAndGreekTemples } from "./theParthenonAndGreekTemples.js";
import { theOlympicGames } from "./theOlympicGames.js";
import { greeksAndPersians } from "./greeksAndPersians.js";
import { alexanderTheGreat } from "./alexanderTheGreat.js";
import { greekThinkersAndTheatre } from "./greekThinkersAndTheatre.js";
import { greekIdeasWeStillUse } from "./greekIdeasWeStillUse.js";
import { whereTheMayaLived } from "./whereTheMayaLived.js";
import { mayaFarmingAndFood } from "./mayaFarmingAndFood.js";
import { mayaCitiesAndKings } from "./mayaCitiesAndKings.js";
import { chichenItzaAndMayaPyramids } from "./chichenItzaAndMayaPyramids.js";
import { mayaWritingAndBooks } from "./mayaWritingAndBooks.js";
import { mayaNumbersAndTheCalendar } from "./mayaNumbersAndTheCalendar.js";
import { mayaGodsAndTheBallGame } from "./mayaGodsAndTheBallGame.js";
import { theClassicMayaCollapse } from "./theClassicMayaCollapse.js";
import { oneLongTimeline } from "./oneLongTimeline.js";
import { sourcesAndInterpretations } from "./sourcesAndInterpretations.js";
import { comparingPastSocieties } from "./comparingPastSocieties.js";

export const YEAR5_HISTORY_TOPICS = {
  "where-ancient-greece-was": whereAncientGreeceWas,
  "athens-and-sparta": athensAndSparta,
  "everyday-life-in-athens": everydayLifeInAthens,
  "democracy-in-athens": democracyInAthens,
  "greek-gods-and-myths": greekGodsAndMyths,
  "the-parthenon-and-greek-temples": theParthenonAndGreekTemples,
  "the-olympic-games": theOlympicGames,
  "greeks-and-persians": greeksAndPersians,
  "alexander-the-great": alexanderTheGreat,
  "greek-thinkers-and-theatre": greekThinkersAndTheatre,
  "greek-ideas-we-still-use": greekIdeasWeStillUse,
  "where-the-maya-lived": whereTheMayaLived,
  "maya-farming-and-food": mayaFarmingAndFood,
  "maya-cities-and-kings": mayaCitiesAndKings,
  "chichen-itza-and-maya-pyramids": chichenItzaAndMayaPyramids,
  "maya-writing-and-books": mayaWritingAndBooks,
  "maya-numbers-and-the-calendar": mayaNumbersAndTheCalendar,
  "maya-gods-and-the-ball-game": mayaGodsAndTheBallGame,
  "the-classic-maya-collapse": theClassicMayaCollapse,
  "one-long-timeline": oneLongTimeline,
  "sources-and-interpretations": sourcesAndInterpretations,
  "comparing-past-societies": comparingPastSocieties,
};
export const YEAR5_HISTORY_BUILDERS = Object.fromEntries(
  Object.entries(YEAR5_HISTORY_TOPICS).map(([id, data]) => {
    const build = buildHistoryTopic(data);
    return [id, (level, rng) => {
      const run = build(level, rng);
      return { ...run, questions: run.questions.map((q) => q.kind === "order" ? { ...q, direction: "vertical" } : q) };
    }];
  })
);
