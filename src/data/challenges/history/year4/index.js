import { buildHistoryTopic } from "../engine.js";
import { whenTheRomansLeftBritain } from "./whenTheRomansLeftBritain.js";
import { theScotsComeFromIreland } from "./theScotsComeFromIreland.js";
import { angloSaxonSettlers } from "./angloSaxonSettlers.js";
import { angloSaxonKingdoms } from "./angloSaxonKingdoms.js";
import { angloSaxonVillageLife } from "./angloSaxonVillageLife.js";
import { cluesInPlaceNames } from "./cluesInPlaceNames.js";
import { suttonHooAndAngloSaxonArt } from "./suttonHooAndAngloSaxonArt.js";
import { saintsAndMonasteries } from "./saintsAndMonasteries.js";
import { whoWereTheVikings } from "./whoWereTheVikings.js";
import { theRaidOnLindisfarne } from "./theRaidOnLindisfarne.js";
import { theGreatVikingInvasion } from "./theGreatVikingInvasion.js";
import { vikingLifeInJorvik } from "./vikingLifeInJorvik.js";
import { alfredTheGreat } from "./alfredTheGreat.js";
import { athelstanFirstKingOfEngland } from "./athelstanFirstKingOfEngland.js";
import { danegeldAndKingCnut } from "./danegeldAndKingCnut.js";
import { angloSaxonLawsAndJustice } from "./angloSaxonLawsAndJustice.js";
import { edwardTheConfessor } from "./edwardTheConfessor.js";
import { fromRomansTo1066 } from "./fromRomansTo1066.js";

export const YEAR4_HISTORY_TOPICS = {
  "when-the-romans-left-britain": whenTheRomansLeftBritain,
  "the-scots-come-from-ireland": theScotsComeFromIreland,
  "anglo-saxon-settlers": angloSaxonSettlers,
  "anglo-saxon-kingdoms": angloSaxonKingdoms,
  "anglo-saxon-village-life": angloSaxonVillageLife,
  "clues-in-place-names": cluesInPlaceNames,
  "sutton-hoo-and-anglo-saxon-art": suttonHooAndAngloSaxonArt,
  "saints-and-monasteries": saintsAndMonasteries,
  "who-were-the-vikings": whoWereTheVikings,
  "the-raid-on-lindisfarne": theRaidOnLindisfarne,
  "the-great-viking-invasion": theGreatVikingInvasion,
  "viking-life-in-jorvik": vikingLifeInJorvik,
  "alfred-the-great": alfredTheGreat,
  "athelstan-first-king-of-england": athelstanFirstKingOfEngland,
  "danegeld-and-king-cnut": danegeldAndKingCnut,
  "anglo-saxon-laws-and-justice": angloSaxonLawsAndJustice,
  "edward-the-confessor": edwardTheConfessor,
  "from-romans-to-1066": fromRomansTo1066,
};
export const YEAR4_HISTORY_BUILDERS = Object.fromEntries(
  Object.entries(YEAR4_HISTORY_TOPICS).map(([id, data]) => {
    const build = buildHistoryTopic(data);
    return [id, (level, rng) => {
      const run = build(level, rng);
      return { ...run, questions: run.questions.map((q) => q.kind === "order" ? { ...q, direction: "vertical" } : q) };
    }];
  })
);
