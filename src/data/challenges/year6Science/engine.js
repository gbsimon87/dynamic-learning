// Year 6 Science reuses the Year 4 authoring helpers and round builder unchanged.
export { fact, sequence, sentence, groups, measurement, isScienceAnswerCorrect, buildTopic, TITLES } from "../year4Science/engine.js";

/** A supplied classification key, drawn as a branching diagram: [[question, yes], ...], then the last "no". */
export const keyVisual = (branches, no, alt) => ({ type: "classificationKey", key: { branches: branches.map(([question, yes]) => ({ question, yes })), no }, alt });

/** A series circuit drawn with standard symbols. `parts` go round the loop, starting top left. */
export const circuit = (parts, extra = {}) => ({ type: "circuitDiagram", parts, ...extra });
