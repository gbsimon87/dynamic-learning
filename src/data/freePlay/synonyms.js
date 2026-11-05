import { assertLevel, pick, shuffle } from "./random.js";

/**
 * Synonym Safari — endless memory rounds: flip two cards to find words that
 * mean the same.
 *
 *   1  Easier  — three pairs of everyday words (big / large)
 *   2  Medium  — four pairs, adding words like fix / repair
 *   3  Harder  — six pairs, adding longer, less common words (enormous / colossal)
 *
 * Words are grouped into small families of synonyms. A round takes at most one
 * family per pair, and two words from it, so no word in a round can match
 * anything but its own partner. `family` also keeps an easy family (sad / unhappy)
 * out of a round with its harder cousin (miserable / gloomy).
 *
 * Pure: `rng` is a parameter and nothing loops without a bound.
 */

export const LEVELS = [
  { id: 1, label: "🌱 Easier" },
  { id: 2, label: "🌿 Medium" },
  { id: 3, label: "🌳 Harder" },
];

/** Pairs per round at each level. */
const PAIR_COUNT = { 1: 3, 2: 4, 3: 6 };

/** [family, words] — every word in a family means the same as the others. */
const FAMILIES = {
  1: [
    ["happy", ["happy", "glad", "cheerful"]],
    ["big", ["big", "large", "huge"]],
    ["small", ["small", "little", "tiny"]],
    ["fast", ["fast", "quick", "speedy"]],
    ["start", ["begin", "start"]],
    ["end", ["end", "finish"]],
    ["sad", ["sad", "unhappy"]],
    ["angry", ["angry", "mad", "cross"]],
    ["scared", ["scared", "afraid", "frightened"]],
    ["pretty", ["pretty", "lovely", "beautiful"]],
    ["tidy", ["tidy", "neat"]],
    ["talk", ["talk", "speak", "chat"]],
    ["shout", ["shout", "yell"]],
    ["smart", ["smart", "clever"]],
    ["easy", ["easy", "simple"]],
    ["tired", ["tired", "sleepy"]],
    ["laugh", ["laugh", "giggle"]],
    ["ill", ["ill", "sick", "unwell"]],
    ["child", ["child", "kid"]],
    ["shut", ["shut", "close"]],
    ["rock", ["rock", "stone"]],
    ["cold", ["cold", "chilly", "freezing"]],
  ],
  2: [
    ["buy", ["buy", "purchase"]],
    ["help", ["help", "assist", "aid"]],
    ["hard", ["hard", "difficult", "tough"]],
    ["old", ["old", "ancient", "aged"]],
    ["brave", ["brave", "bold", "fearless"]],
    ["gift", ["gift", "present"]],
    ["strange", ["strange", "odd", "peculiar"]],
    ["calm", ["calm", "peaceful", "tranquil"]],
    ["tasty", ["tasty", "delicious", "yummy"]],
    ["mistake", ["mistake", "error"]],
    ["choose", ["choose", "select", "pick"]],
    ["fix", ["fix", "repair", "mend"]],
    ["rich", ["rich", "wealthy"]],
    ["reply", ["reply", "answer", "respond"]],
    ["almost", ["almost", "nearly"]],
    ["stop", ["stop", "halt"]],
    ["leave", ["leave", "depart"]],
    ["shy", ["shy", "timid", "bashful"]],
    ["hurry", ["hurry", "rush", "dash"]],
    ["wander", ["wander", "roam", "stroll"]],
    ["hot", ["hot", "boiling", "roasting"]],
    ["trip", ["trip", "journey", "voyage"]],
  ],
  3: [
    ["big", ["enormous", "gigantic", "colossal"]],
    ["sad", ["miserable", "gloomy", "wretched"]],
    ["unwilling", ["reluctant", "unwilling"]],
    ["fragile", ["fragile", "delicate", "brittle"]],
    ["angry", ["furious", "enraged", "livid"]],
    ["hungry", ["hungry", "famished", "starving"]],
    ["tired", ["exhausted", "weary", "drained"]],
    ["obvious", ["obvious", "evident", "apparent"]],
    ["brave", ["courageous", "valiant", "heroic"]],
    ["vanish", ["vanish", "disappear"]],
    ["hide", ["conceal", "hide", "disguise"]],
    ["plenty", ["abundant", "plentiful", "ample"]],
    ["vital", ["essential", "vital", "crucial"]],
    ["think", ["ponder", "contemplate", "consider"]],
    ["fast", ["swift", "rapid", "brisk"]],
    ["smart", ["intelligent", "brilliant", "bright"]],
    ["amazed", ["astonished", "amazed", "astounded"]],
    ["start", ["commence", "initiate"]],
    ["find", ["discover", "uncover", "detect"]],
    ["home", ["dwelling", "residence", "abode"]],
    ["weak", ["feeble", "frail", "puny"]],
    ["shake", ["tremble", "shudder", "quiver"]],
    ["lucky", ["fortunate", "lucky"]],
    ["danger", ["perilous", "hazardous", "risky"]],
    ["generous", ["generous", "charitable", "giving"]],
    ["strong", ["sturdy", "robust", "solid"]],
  ],
};

/** Every family a level can deal (its own plus the easier levels'). */
export function familiesForLevel(level) {
  assertLevel(level);
  return Array.from({ length: level }, (_, i) => FAMILIES[i + 1]).flat();
}

export function pairCountForLevel(level) {
  assertLevel(level);
  return PAIR_COUNT[level];
}

/** Up to `count` word pairs, one per family, each from a different family. */
function choosePairs(level, rng) {
  const count = PAIR_COUNT[level];
  const chosen = [];
  const families = new Set();
  const words = new Set();
  for (const [family, list] of shuffle(familiesForLevel(level), rng)) {
    if (chosen.length === count) break;
    if (families.has(family) || list.some((w) => words.has(w))) continue;
    const first = pick(rng, list);
    const second = pick(rng, list.filter((w) => w !== first));
    chosen.push([first, second]);
    families.add(family);
    list.forEach((w) => words.add(w));
  }
  return chosen;
}

export function makeSynonymQuestion(rng, level) {
  assertLevel(level);
  const pairs = choosePairs(level, rng);
  const cards = shuffle(
    pairs.flatMap(([a, b], pair) => [
      { id: `${pair}a`, word: a, pair },
      { id: `${pair}b`, word: b, pair },
    ]),
    rng,
  );
  return {
    key: pairs.map((p) => [...p].sort().join("-")).sort().join(","),
    kind: "memory",
    level,
    pairs,
    cards,
    prompt: "Flip two cards to find words that mean the same",
    speech: `Flip two cards to find words that mean the same. There are ${pairs.length} pairs to find.`,
  };
}
