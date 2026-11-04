import { PLACE_VALUE_BUILDERS } from './placeValue.js';
import { OPERATION_BUILDERS } from './additional.js';
import { FRACTION_BUILDERS } from './fractions.js';
import { RATIO_ALGEBRA_BUILDERS } from './ratioAlgebra.js';
import { MEASUREMENT_GEOMETRY_BUILDERS } from './measurementGeometry.js';
import { shuffle } from '../year5Math/kit.js';
export const TITLES = ['Explore the model', 'Practise the method', 'Arrange and compare', 'Solve a problem'];
const BUILDERS = { ...PLACE_VALUE_BUILDERS, ...OPERATION_BUILDERS, ...FRACTION_BUILDERS, ...RATIO_ALGEBRA_BUILDERS, ...MEASUREMENT_GEOMETRY_BUILDERS };
export const TOPIC_KEYS = Object.keys(BUILDERS);
export const titleFor = (_topic, level) => TITLES[level - 1];
export function buildYear6Math(topic, level, rng = Math.random) {
  if (!Object.hasOwn(BUILDERS, topic)) throw new RangeError(`Unknown Year 6 Maths bank: ${topic}`);
  if (!Number.isInteger(level) || level < 1 || level > 4) throw new RangeError(`Unknown challenge level: ${level}`);
  return shuffle(Array.from({ length: 5 }, (_, i) => BUILDERS[topic](level, rng, i)), rng);
}
