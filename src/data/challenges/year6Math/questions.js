import { PLACE_VALUE_BUILDERS } from './placeValue.js';
import { shuffle } from '../year5Math/kit.js';
export const TITLES = ['Explore the model', 'Practise the method', 'Arrange and compare', 'Solve a problem'];
export const TOPIC_KEYS = Object.keys(PLACE_VALUE_BUILDERS);
export const titleFor = (_topic, level) => TITLES[level - 1];
export function buildYear6Math(topic, level, rng = Math.random) {
  if (!Object.hasOwn(PLACE_VALUE_BUILDERS, topic)) throw new RangeError(`Unknown Year 6 Maths bank: ${topic}`);
  if (!Number.isInteger(level) || level < 1 || level > 4) throw new RangeError(`Unknown challenge level: ${level}`);
  return shuffle(Array.from({ length: 5 }, (_, i) => PLACE_VALUE_BUILDERS[topic](level, rng, i)), rng);
}
