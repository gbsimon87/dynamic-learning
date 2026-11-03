// Pure Year 5 Maths banks. Every builder receives its random source.
// Boundaries and topic-to-statutory mappings: docs/curriculum/year-5-maths.md.
import { shuffle, TITLES } from './kit.js';
import { BUILDERS as placeValue, TOPIC_TITLES as placeValueTitles } from './builders/placeValue.js';
import { BUILDERS as addSubtract, TOPIC_TITLES as addSubtractTitles } from './builders/addSubtract.js';
import { BUILDERS as multiply, TOPIC_TITLES as multiplyTitles } from './builders/multiply.js';
import { BUILDERS as divide, TOPIC_TITLES as divideTitles } from './builders/divide.js';
import { BUILDERS as fractions, TOPIC_TITLES as fractionsTitles } from './builders/fractions.js';
import { BUILDERS as decimals, TOPIC_TITLES as decimalsTitles } from './builders/decimals.js';
import { BUILDERS as measurement, TOPIC_TITLES as measurementTitles } from './builders/measurement.js';
import { BUILDERS as shapes, TOPIC_TITLES as shapesTitles } from './builders/shapes.js';
import { BUILDERS as angles, TOPIC_TITLES as anglesTitles } from './builders/angles.js';
import { BUILDERS as position, TOPIC_TITLES as positionTitles } from './builders/position.js';
import { BUILDERS as statistics, TOPIC_TITLES as statisticsTitles } from './builders/statistics.js';

export { TITLES } from './kit.js';
const BUILDERS = { ...placeValue, ...addSubtract, ...multiply, ...divide, ...fractions, ...decimals, ...measurement, ...shapes, ...angles, ...position, ...statistics };
const TOPIC_TITLES = { ...placeValueTitles, ...addSubtractTitles, ...multiplyTitles, ...divideTitles, ...fractionsTitles, ...decimalsTitles, ...measurementTitles, ...shapesTitles, ...anglesTitles, ...positionTitles, ...statisticsTitles };

/** The title over a challenge: the topic's own when it has one, else the generic slot title. */
export const titleFor = (topic, level) => TOPIC_TITLES[topic]?.[level - 1] ?? TITLES[level - 1];
export const TOPIC_KEYS = Object.keys(BUILDERS);

const keyOf = q => JSON.stringify([q.prompt, q.rule, q.equation, q.text, q.answer, q.terms, q.visual, q.items?.map(i => i.label), q.cards?.map(c => c.label), q.tiles?.map(t => t.label).sort()]);

/** Five questions for one challenge. A repeated question is rebuilt (bounded), so a run never asks the same thing twice. */
export function buildYear5Math(topic, level, rng = Math.random) {
  if (!Object.hasOwn(BUILDERS, topic)) throw new RangeError(`Unknown Year 5 Maths topic: ${topic}`);
  if (!Number.isInteger(level) || level < 1 || level > 4) throw new RangeError(`Unknown challenge level: ${level}`);
  const seen = new Set(), questions = [];
  for (let i = 0; i < 5; i++) {
    let q = BUILDERS[topic](level, rng, i);
    for (let tries = 0; tries < 40 && seen.has(keyOf(q)); tries++) q = BUILDERS[topic](level, rng, i);
    seen.add(keyOf(q));
    questions.push(q);
  }
  return shuffle(questions, rng);
}
