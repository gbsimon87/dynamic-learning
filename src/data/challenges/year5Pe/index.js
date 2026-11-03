import { buildTopic, CREATIVE_TITLES } from "../year5Creative/shared.js";
import { withVisuals } from "../year5Creative/visuals.js";
import { YEAR5_PE_TOPIC_VISUALS, YEAR5_PE_QUESTION_VISUALS } from "./visuals.js";
import { invasion } from "./invasion.js";
import { teamGames } from "./teamGames.js";
import { striking } from "./striking.js";
import { athletics } from "./athletics.js";
import { outdoorsAndFitness } from "./outdoorsAndFitness.js";

export const YEAR5_PE_TOPICS = withVisuals({ ...invasion, ...teamGames, ...striking, ...athletics, ...outdoorsAndFitness }, YEAR5_PE_TOPIC_VISUALS, YEAR5_PE_QUESTION_VISUALS);
export const YEAR5_PE_BUILDERS = Object.fromEntries(Object.entries(YEAR5_PE_TOPICS).map(([id, topic]) => [id, buildTopic(topic)]));
export const YEAR5_PE_TITLES = CREATIVE_TITLES;
