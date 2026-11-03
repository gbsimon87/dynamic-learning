import { buildTopic, TITLES } from "../topicBank.js";
import { withFigures } from "../figures.js";
import { TOPIC_VISUALS, FIGURE_RULES } from "./figures.js";
import { sequences, loops, decisions, variables, inputsAndOutputs, bugs } from "./programming.js";
import { decomposition, algorithms, logic } from "./algorithms.js";
import { networks, dataTravel, internetAndWeb, searching, ranking, judging, safeInfo, kindOnline } from "./knowledge.js";

/** Topic id (toKebabCase of the topic name in year5ComputingCurriculum.js) -> its question bank. */
const AUTHORED = {
  "sequences-of-instructions": sequences,
  "repeat-loops": loops,
  "if-and-else-decisions": decisions,
  variables,
  "inputs-and-outputs": inputsAndOutputs,
  "finding-and-fixing-bugs": bugs,
  "breaking-problems-into-parts": decomposition,
  "how-algorithms-work": algorithms,
  "logic-with-and-or-and-not": logic,
  "computer-networks": networks,
  "how-data-travels": dataTravel,
  "the-internet-and-the-web": internetAndWeb,
  "using-search-engines": searching,
  "how-results-are-ranked": ranking,
  "judging-websites": judging,
  "keeping-information-safe": safeInfo,
  "kind-and-responsible-online": kindOnline,
};
// Every topic carries `visual`: its start-screen picture, also copied onto its level 1 questions.
export const YEAR5_COMPUTING_TOPICS = Object.fromEntries(Object.entries(AUTHORED).map(([id, topic]) => [id, { ...topic, visual: TOPIC_VISUALS[id] }]));
export const YEAR5_COMPUTING_BUILDERS = Object.fromEntries(Object.entries(YEAR5_COMPUTING_TOPICS).map(([id, topic]) => [id, withFigures(buildTopic(topic), FIGURE_RULES[id], topic.visual)]));
export { FIGURE_RULES as YEAR5_COMPUTING_FIGURE_RULES };
export const YEAR5_COMPUTING_TITLES = TITLES;
