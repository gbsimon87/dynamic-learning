import { buildHistoryTopic } from "../engine.js";
import { keepingInTouchThenAndNow } from "./keepingInTouchThenAndNow.js";
import { gettingAboutThenAndNow } from "./gettingAboutThenAndNow.js";
import { londonIn1666 } from "./londonIn1666.js";
import { howTheGreatFireStartedAndSpread } from "./howTheGreatFireStartedAndSpread.js";
import { howWeKnowAboutTheGreatFire } from "./howWeKnowAboutTheGreatFire.js";
import { londonAfterTheFire } from "./londonAfterTheFire.js";
import { florenceNightingale } from "./florenceNightingale.js";
import { marySeacole } from "./marySeacole.js";
import { edithCavell } from "./edithCavell.js";
import { nursingThenAndNow } from "./nursingThenAndNow.js";
import { rosaParks } from "./rosaParks.js";
import { emilyDavisonAndVotesForWomen } from "./emilyDavisonAndVotesForWomen.js";
import { williamCaxtonAndTimBernersLee } from "./williamCaxtonAndTimBernersLee.js";
import { bonfireNight } from "./bonfireNight.js";
import { remembranceDay } from "./remembranceDay.js";
import { memorialsAndBluePlaques } from "./memorialsAndBluePlaques.js";
import { oldMapsAndPhotos } from "./oldMapsAndPhotos.js";

export const YEAR2_HISTORY_TOPICS = {
  "keeping-in-touch-then-and-now": keepingInTouchThenAndNow,
  "getting-about-then-and-now": gettingAboutThenAndNow,
  "london-in-1666": londonIn1666,
  "how-the-great-fire-started-and-spread": howTheGreatFireStartedAndSpread,
  "how-we-know-about-the-great-fire": howWeKnowAboutTheGreatFire,
  "london-after-the-fire": londonAfterTheFire,
  "florence-nightingale": florenceNightingale,
  "mary-seacole": marySeacole,
  "edith-cavell": edithCavell,
  "nursing-then-and-now": nursingThenAndNow,
  "rosa-parks": rosaParks,
  "emily-davison-and-votes-for-women": emilyDavisonAndVotesForWomen,
  "william-caxton-and-tim-berners-lee": williamCaxtonAndTimBernersLee,
  "bonfire-night": bonfireNight,
  "remembrance-day": remembranceDay,
  "memorials-and-blue-plaques": memorialsAndBluePlaques,
  "old-maps-and-photos": oldMapsAndPhotos,
};

const TIMELINES = {
  "london-in-1666": { band: 0, label: "London and the Great Fire · 1666" },
  "how-the-great-fire-started-and-spread": { band: 0, label: "The Great Fire · 1666" },
  "how-we-know-about-the-great-fire": { band: 0, label: "The Great Fire · 1666" },
  "london-after-the-fire": { band: 0, label: "Rebuilding after the Great Fire" },
  "florence-nightingale": { band: 1, label: "Florence in the Crimean War" },
  "mary-seacole": { band: 1, label: "Mary in the Crimean War" },
  "edith-cavell": { band: 2, label: "Edith in the First World War" },
  "emily-davison-and-votes-for-women": { band: 2, label: "Campaigning for women's votes" },
  "rosa-parks": { band: 3, label: "Rosa and the bus boycott" },
  "bonfire-night": { band: 0, label: "The Gunpowder Plot · 1605" },
  "remembrance-day": { band: 2, label: "The armistice · 1918" },
};
for (const [id, timeline] of Object.entries(TIMELINES)) {
  YEAR2_HISTORY_TOPICS[id].levels[2].story.timeline = timeline;
}

export const YEAR2_HISTORY_BUILDERS = Object.fromEntries(
  Object.entries(YEAR2_HISTORY_TOPICS).map(([id, data]) => {
    const build = buildHistoryTopic(data);
    return [id, (level, rng) => {
      const run = build(level, rng);
      return { ...run, questions: run.questions.map((q) => q.kind === "order" ? { ...q, direction: "vertical" } : q) };
    }];
  })
);
