// Pure Year 4 Maths banks. Every builder receives its random source.
// Boundaries and topic-to-statutory mappings: docs/curriculum/year-4-maths.md.
import { shuffle, TITLES } from './kit.js';
import { BUILDERS as placeValue, TOPIC_TITLES as placeValueTitles } from './builders/placeValue.js';
import { BUILDERS as addSubtract, TOPIC_TITLES as addSubtractTitles } from './builders/addSubtract.js';
import { BUILDERS as mulDiv, TOPIC_TITLES as mulDivTitles } from './builders/mulDiv.js';
import { BUILDERS as fractions, TOPIC_TITLES as fractionsTitles } from './builders/fractions.js';
import { BUILDERS as measurement, TOPIC_TITLES as measurementTitles } from './builders/measurement.js';
import { BUILDERS as geometry, TOPIC_TITLES as geometryTitles } from './builders/geometry.js';
import { BUILDERS as position, TOPIC_TITLES as positionTitles } from './builders/position.js';
import { BUILDERS as statistics, TOPIC_TITLES as statisticsTitles } from './builders/statistics.js';

export { TITLES, roman } from './kit.js';
const BUILDERS = { ...placeValue, ...addSubtract, ...mulDiv, ...fractions, ...measurement, ...geometry, ...position, ...statistics };

const TOPIC_TITLES = { ...placeValueTitles, ...addSubtractTitles, ...mulDivTitles, ...fractionsTitles, ...measurementTitles, ...geometryTitles, ...positionTitles, ...statisticsTitles };
/** The title over a challenge: the topic's own when it has one, else the generic slot title. */
export const titleFor = (topic, level) => TOPIC_TITLES[topic]?.[level - 1] ?? TITLES[level - 1];

export const TOPIC_KEYS = Object.keys(BUILDERS);
export function buildYear4Math(topic, level, rng = Math.random) {
  if(!Object.hasOwn(BUILDERS,topic)) throw new RangeError(`Unknown Year 4 Maths topic: ${topic}`);
  if(!Number.isInteger(level)||level<1||level>4) throw new RangeError(`Unknown challenge level: ${level}`);
  return shuffle(Array.from({length:5},(_,i)=>BUILDERS[topic](level,rng,i)),rng);
}
