import cities from "../cities.json" with { type: "json" };
import { assertLevel, pick, shuffle } from "./random.js";

/**
 * City Spotlight — endless rounds of naming the city from a famous place.
 *
 *   1  Easier  — three cities to choose from
 *   2  Medium  — four cities
 *   3  Harder  — six cities
 *
 * Every round has exactly one right answer: the picture's city. The wrong
 * choices are other cities from the bank, never the right one twice, and never
 * a city in the same country as the answer (so a child is not asked to tell
 * two places in one country apart by name alone).
 *
 * Pure: `rng` is a parameter and nothing loops without a bound.
 */

export const LEVELS = [
  { id: 1, label: "🌱 Easier" },
  { id: 2, label: "🌿 Medium" },
  { id: 3, label: "🌳 Harder" },
];

const CHOICE_COUNT = { 1: 3, 2: 4, 3: 6 };

export function choiceCountForLevel(level) {
  assertLevel(level);
  return CHOICE_COUNT[level];
}

export function makeCityQuestion(rng, level) {
  assertLevel(level);
  const city = pick(rng, cities);
  const others = cities.filter((c) => c.name !== city.name && c.country !== city.country);
  const wrong = shuffle(others, rng).slice(0, CHOICE_COUNT[level] - 1);
  const choices = shuffle([city, ...wrong], rng).map((c) => c.name);
  return {
    key: city.name,
    level,
    city,
    answer: city.name,
    choices,
    image: city.image,
    hint: city.hint,
    prompt: "Which city is this?",
    speech: `${city.hint}. Which city is this?`,
  };
}
