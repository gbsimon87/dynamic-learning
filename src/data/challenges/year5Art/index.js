import { buildTopic, CREATIVE_TITLES } from "../year5Creative/shared.js";
import { withVisuals } from "../year5Creative/visuals.js";
import { YEAR5_ART_TOPIC_VISUALS, YEAR5_ART_QUESTION_VISUALS } from "./visuals.js";
import { drawing } from "./drawing.js";
import { colour } from "./colour.js";
import { making } from "./making.js";
import { greats } from "./greats.js";

export const YEAR5_ART_TOPICS = withVisuals({ ...drawing, ...colour, ...making, ...greats }, YEAR5_ART_TOPIC_VISUALS, YEAR5_ART_QUESTION_VISUALS);
export const YEAR5_ART_BUILDERS = Object.fromEntries(Object.entries(YEAR5_ART_TOPICS).map(([id, topic]) => [id, buildTopic(topic)]));
export const YEAR5_ART_TITLES = CREATIVE_TITLES;
