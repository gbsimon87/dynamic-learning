import { buildTopic, TITLES } from "../topicBank.js";
import { withFigures } from "../figures.js";
import { listening, listeningVisuals, listeningRules } from "./listening.js";
import { conversations, conversationsVisuals, conversationsRules } from "./conversations.js";
import { describing, describingVisuals, describingRules } from "./describing.js";
import { grammar, grammarVisuals, grammarRules } from "./grammar.js";
import { reading, readingVisuals, readingRules } from "./reading.js";

/** Topic id (toKebabCase of the topic name in year6FrenchCurriculum.js) -> its question bank, one file per strand. */
const AUTHORED = { ...listening, ...conversations, ...describing, ...grammar, ...reading };
const VISUALS = { ...listeningVisuals, ...conversationsVisuals, ...describingVisuals, ...grammarVisuals, ...readingVisuals };
export const YEAR6_FRENCH_FIGURE_RULES = { ...listeningRules, ...conversationsRules, ...describingRules, ...grammarRules, ...readingRules };

// Every topic carries `visual`: its start-screen picture, also copied onto its level 1 questions.
export const YEAR6_FRENCH_TOPICS = Object.fromEntries(Object.entries(AUTHORED).map(([id, topic]) => [id, { ...topic, visual: VISUALS[id] }]));
export const YEAR6_FRENCH_BUILDERS = Object.fromEntries(Object.entries(YEAR6_FRENCH_TOPICS).map(([id, topic]) => [id, withFigures(buildTopic(topic), YEAR6_FRENCH_FIGURE_RULES[id], topic.visual)]));
export const YEAR6_FRENCH_TITLES = TITLES;
