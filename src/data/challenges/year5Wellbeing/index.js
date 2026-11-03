import { buildTopic, CREATIVE_TITLES } from "../year5Creative/shared.js";
import { friends } from "./friends.js";
import { feelings } from "./feelings.js";
import { safety } from "./safety.js";
import { health } from "./health.js";
import { withFigures } from "../figures.js";
import { TOPIC_VISUALS, FIGURE_RULES } from "./figures.js";

const AUTHORED = { ...friends, ...feelings, ...safety, ...health };
// Every topic carries `visual`: its start-screen picture, also copied onto its level 1 questions.
export const YEAR5_WELLBEING_TOPICS = Object.fromEntries(Object.entries(AUTHORED).map(([id, topic]) => [id, { ...topic, visual: TOPIC_VISUALS[id] }]));
export const YEAR5_WELLBEING_BUILDERS = Object.fromEntries(Object.entries(YEAR5_WELLBEING_TOPICS).map(([id, topic]) => [id, withFigures(buildTopic(topic), FIGURE_RULES[id], topic.visual)]));
export { FIGURE_RULES as YEAR5_WELLBEING_FIGURE_RULES };
export const YEAR5_WELLBEING_TITLES = CREATIVE_TITLES;
