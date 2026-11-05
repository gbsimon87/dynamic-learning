import { assertLevel, shuffle } from "./random.js";

/**
 * Shape Explorer — endless "what shape is this?" with four name choices.
 *
 *   1  Easier  — circle, square, triangle, rectangle
 *   2  Medium  — adds diamond, oval, star, heart
 *   3  Harder  — adds pentagon, hexagon, trapezium
 *
 * Harder levels still deal the easier shapes. Every level has at least four
 * shapes, so there are always three different wrong answers to offer.
 *
 * Pure: `rng` is a parameter and nothing loops without a bound.
 */

export const LEVELS = [
  { id: 1, label: "🌱 Easier" },
  { id: 2, label: "🌿 Medium" },
  { id: 3, label: "🌳 Harder" },
];

/** Shapes introduced at each level. `name` is what the child reads. */
const SHAPES = {
  1: [
    { id: "circle", name: "Circle" },
    { id: "square", name: "Square" },
    { id: "triangle", name: "Triangle" },
    { id: "rectangle", name: "Rectangle" },
  ],
  2: [
    { id: "diamond", name: "Diamond" },
    { id: "oval", name: "Oval" },
    { id: "star", name: "Star" },
    { id: "heart", name: "Heart" },
  ],
  3: [
    { id: "pentagon", name: "Pentagon" },
    { id: "hexagon", name: "Hexagon" },
    { id: "trapezium", name: "Trapezium" },
  ],
};

export const CHOICE_COUNT = 4;

/** Every shape a level can deal (its own plus the easier levels'). */
export function shapesForLevel(level) {
  assertLevel(level);
  return Array.from({ length: level }, (_, i) => SHAPES[i + 1]).flat();
}

export function makeShapeQuestion(rng, level) {
  assertLevel(level);
  const bank = shapesForLevel(level);
  const shape = bank[Math.min(bank.length - 1, Math.floor(rng() * bank.length))];
  const wrong = shuffle(bank.filter((s) => s.id !== shape.id), rng).slice(0, CHOICE_COUNT - 1);
  const options = shuffle([shape, ...wrong], rng);
  return {
    key: shape.id,
    level,
    shape,
    options,
    prompt: "What shape is this?",
    speech: `What shape is this? Is it a ${options.map((o) => o.name.toLowerCase()).join(", a ")}?`,
  };
}
