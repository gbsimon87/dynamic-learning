import { assertLevel, shuffle } from "./random.js";

/**
 * Opposite Match — endless rounds of matching words with their opposites.
 *
 *   1  Easier  — three pairs of everyday words (hot / cold)
 *   2  Medium  — four pairs, adding feelings, time and describing words
 *   3  Harder  — five pairs, adding longer, less common words (ancient / modern)
 *
 * Harder levels still deal the easier pairs too. A round never holds two pairs
 * that share a word: `old` is the opposite of both `young` and `new`, and a
 * round with both would have two right answers for one word.
 *
 * Pure: `rng` is a parameter and nothing loops without a bound.
 */

export const LEVELS = [
  { id: 1, label: "🌱 Easier" },
  { id: 2, label: "🌿 Medium" },
  { id: 3, label: "🌳 Harder" },
];

/** Pairs per round at each level. */
const PAIR_COUNT = { 1: 3, 2: 4, 3: 5 };

/** New pairs introduced at each level. */
const PAIRS = {
  1: [
    ["hot", "cold"], ["big", "small"], ["up", "down"], ["happy", "sad"], ["fast", "slow"],
    ["day", "night"], ["wet", "dry"], ["full", "empty"], ["tall", "short"], ["in", "out"],
    ["hard", "soft"], ["clean", "dirty"], ["come", "go"], ["young", "old"], ["push", "pull"],
    ["loud", "quiet"], ["open", "closed"], ["start", "finish"], ["heavy", "light"], ["right", "wrong"],
  ],
  2: [
    ["warm", "cool"], ["kind", "mean"], ["brave", "scared"], ["polite", "rude"], ["early", "late"],
    ["near", "far"], ["awake", "asleep"], ["begin", "end"], ["first", "last"], ["strong", "weak"],
    ["smooth", "rough"], ["before", "after"], ["wide", "narrow"], ["sunny", "rainy"], ["bright", "dark"],
    ["thick", "thin"], ["rich", "poor"], ["true", "false"], ["above", "below"], ["inside", "outside"],
    ["new", "old"],
  ],
  3: [
    ["ancient", "modern"], ["generous", "selfish"], ["accept", "refuse"], ["increase", "decrease"],
    ["arrive", "depart"], ["victory", "defeat"], ["include", "exclude"], ["visible", "invisible"],
    ["possible", "impossible"], ["confident", "nervous"], ["ascend", "descend"], ["enormous", "tiny"],
    ["cheerful", "gloomy"], ["rapid", "gradual"], ["major", "minor"], ["expand", "shrink"],
    ["rigid", "flexible"], ["fragile", "sturdy"], ["permit", "forbid"], ["success", "failure"],
  ],
};

/** Every pair a level can deal (its own plus the easier levels'). */
export function pairsForLevel(level) {
  assertLevel(level);
  return Array.from({ length: level }, (_, i) => PAIRS[i + 1]).flat();
}

export function pairCountForLevel(level) {
  assertLevel(level);
  return PAIR_COUNT[level];
}

/** Up to `count` pairs, none sharing a word with another. */
function choosePairs(level, rng) {
  const count = PAIR_COUNT[level];
  const chosen = [];
  const used = new Set();
  for (const pair of shuffle(pairsForLevel(level), rng)) {
    if (chosen.length === count) break;
    if (used.has(pair[0]) || used.has(pair[1])) continue;
    chosen.push(pair);
    used.add(pair[0]);
    used.add(pair[1]);
  }
  return chosen;
}

export function makeOppositeQuestion(rng, level) {
  assertLevel(level);
  // Flip each pair at random so the left word is not always the same side.
  const pairs = choosePairs(level, rng).map(([a, b]) => (rng() < 0.5 ? [a, b] : [b, a]));
  const left = shuffle(pairs.map((p) => p[0]), rng);
  const right = shuffle(pairs.map((p) => p[1]), rng);
  return {
    key: pairs.map((p) => p.join("-")).sort().join(","),
    kind: "match",
    level,
    pairs,
    left,
    right,
    prompt: "Tap a word, then tap its opposite",
    speech: `Tap a word, then tap its opposite. Words: ${left.join(", ")}. Opposites: ${right.join(", ")}.`,
  };
}
