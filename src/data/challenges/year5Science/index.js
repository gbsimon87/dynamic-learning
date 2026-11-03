import { buildTopic, TITLES } from "./engine.js";
import { life } from "./life.js";
import { materials } from "./materials.js";
import { earth } from "./earth.js";
import { forces } from "./forces.js";
import { TOPIC_VISUALS, FIGURE_RULES } from "./figures.js";
import { withFigures } from "../figures.js";

const AUTHORED = { ...life, ...materials, ...earth, ...forces };
// Every topic carries `visual`: its start-screen picture, also copied onto its level 1 questions.
export const YEAR5_SCIENCE_TOPICS = Object.fromEntries(Object.entries(AUTHORED).map(([id, topic]) => [id, { ...topic, visual: TOPIC_VISUALS[id] }]));
export const YEAR5_SCIENCE_BUILDERS = Object.fromEntries(Object.entries(YEAR5_SCIENCE_TOPICS).map(([id, topic]) => [id, withFigures(buildTopic(topic), FIGURE_RULES[id], topic.visual)]));
export const YEAR5_SCIENCE_TITLES = TITLES;
export { FIGURE_RULES as YEAR5_SCIENCE_FIGURE_RULES };
