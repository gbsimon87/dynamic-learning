import { pick, shuffle } from "./random.js";

/**
 * Flag Finder — endless rounds: see a flag, pick its country from four.
 *
 * The "level" is where in the world to play: `ALL_CONTINENTS` or a continent
 * name. Countries come from the REST Countries store, so the generator takes
 * the list as a parameter and stays pure.
 *
 * Distractors are drawn by shuffling, never by rejection sampling: a loop that
 * waits for four distinct names never ends on a short list.
 */

export const ALL_CONTINENTS = "all";

// Antarctica is left out deliberately: the API lists only a handful of entries
// for it and most have no flag, so it can never fill a four-option question.
export const PLAYABLE_CONTINENTS = ["Africa", "Asia", "Europe", "North America", "Oceania", "South America"];

const OPTIONS = 4;

export function countriesIn(countries, continent) {
  return continent === ALL_CONTINENTS ? countries : countries.filter((c) => c.continents.includes(continent));
}

/** The continents that can supply a full question, in a fixed order. */
export function playableContinents(countries) {
  return PLAYABLE_CONTINENTS.filter((name) => countriesIn(countries, name).length >= OPTIONS);
}

/**
 * One question, or null when the list cannot supply four distinct countries.
 * `key` is the correct country so the shell does not deal it twice in a row.
 */
export function makeFlagQuestion(rng, countries, continent = ALL_CONTINENTS) {
  const unique = [...new Map(countriesIn(countries, continent).map((c) => [c.name, c])).values()];
  if (unique.length < OPTIONS) return null;

  const correct = pick(rng, unique);
  const distractors = shuffle(unique.filter((c) => c.name !== correct.name), rng).slice(0, OPTIONS - 1);
  const options = shuffle([correct, ...distractors], rng);
  return {
    key: correct.name,
    prompt: "Which country’s flag is this?",
    speech: `Which country's flag is this? Choose from ${options.map((o) => o.name).join(", ")}`,
    correct,
    options,
  };
}
