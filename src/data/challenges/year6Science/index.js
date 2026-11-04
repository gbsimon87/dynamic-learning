import { buildTopic, TITLES } from "./engine.js";
import { living } from "./living.js";
import { animals } from "./animals.js";
import { evolution } from "./evolution.js";
import { light } from "./light.js";
import { electricity } from "./electricity.js";
import { TOPIC_VISUALS, FIGURE_RULES } from "./figures.js";
import { withFigures } from "../figures.js";

const AUTHORED = { ...living, ...animals, ...evolution, ...light, ...electricity };
// Every topic carries `visual`: its start-screen picture, also copied onto its level 1 questions.
export const YEAR6_SCIENCE_TOPICS = Object.fromEntries(Object.entries(AUTHORED).map(([id, topic]) => [id, { ...topic, visual: TOPIC_VISUALS[id] }]));
export const YEAR6_SCIENCE_BUILDERS = Object.fromEntries(Object.entries(YEAR6_SCIENCE_TOPICS).map(([id, topic]) => [id, withFigures(buildTopic(topic), FIGURE_RULES[id], topic.visual)]));
export const YEAR6_SCIENCE_TITLES = TITLES;
export { FIGURE_RULES as YEAR6_SCIENCE_FIGURE_RULES };
