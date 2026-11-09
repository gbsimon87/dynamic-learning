import { buildTopic, TITLES } from "../topicBank.js";
import { withFigures } from "../figures.js";
import { TOPIC_VISUALS, FIGURE_RULES } from "./figures.js";
import { loopsAndDecisions, changingVariables, procedures, debuggingLonger } from "./programming.js";
import { sensors, controlling, simulations } from "./physical.js";
import { searching, sorting, comparing } from "./algorithms.js";
import { collecting, databases, presenting } from "./data.js";
import { messaging, smartSearching, factOrFake, footprint } from "./online.js";

/** Topic id (toKebabCase of the topic name in year6ComputingCurriculum.js) -> its question bank. */
const AUTHORED = {
  "combining-loops-and-decisions": loopsAndDecisions,
  "variables-that-change": changingVariables,
  procedures,
  "debugging-longer-programs": debuggingLonger,
  "sensors-and-inputs": sensors,
  "controlling-devices": controlling,
  simulations,
  "searching-algorithms": searching,
  "sorting-algorithms": sorting,
  "comparing-algorithms": comparing,
  "collecting-data": collecting,
  "databases-and-spreadsheets": databases,
  "presenting-data": presenting,
  "how-email-and-messaging-work": messaging,
  "smart-searching": smartSearching,
  "fact-or-fake": factOrFake,
  "digital-footprint-and-reporting": footprint,
};
export const YEAR6_COMPUTING_TOPICS = Object.fromEntries(Object.entries(AUTHORED).map(([id, topic]) => [id, { ...topic, visual: TOPIC_VISUALS[id] }]));
export const YEAR6_COMPUTING_BUILDERS = Object.fromEntries(Object.entries(YEAR6_COMPUTING_TOPICS).map(([id, topic]) => [id, withFigures(buildTopic(topic), FIGURE_RULES[id], topic.visual)]));
export { FIGURE_RULES as YEAR6_COMPUTING_FIGURE_RULES };
export const YEAR6_COMPUTING_TITLES = TITLES;
