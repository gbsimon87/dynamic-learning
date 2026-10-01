import { PATTERNS } from "../../english/appendix1.js";
import { sample, shuffle } from "./shared.js";

/**
 * Year 3 Doubling Before a Suffix. Appendix 1, "Adding suffixes beginning
 * with vowel letters to words of more than one syllable": if the last
 * syllable is stressed and ends in one consonant letter after one vowel
 * letter, double that consonant before a vowel suffix (forgetting,
 * beginning, preferred). If the syllable is unstressed, do not (gardening,
 * limited).
 *
 *   1 pick   the stress is shown (for·GET); pick the right spelling
 *   2 sort   say each word aloud: double, or just add? (inferred)
 *   3 build  root + the extra letter tile (or not) + the suffix
 *   4 type   a sentence and "root + suffix": type the word (applied)
 *
 * Every root ends in a single vowel letter + a single consonant letter, so
 * stress is the only thing that decides. Left out on purpose:
 *  - roots ending in l (travel, cancel, label, model…): British spelling
 *    doubles the l even when it is unstressed (travelled), which breaks the
 *    rule as Year 3 learns it;
 *  - worship, kidnap, program, focus, benefit, picnic, panic: other
 *    exceptions or two accepted spellings;
 *  - roots ending in w, x or y, which are never doubled.
 */
export const QUESTIONS_PER_CHALLENGE = 5;

/**
 * Roots with their syllables; the stressed syllable is in capitals.
 * `double` is what the rule gives.
 */
export const ROOTS = [
  // stressed last syllable: double
  { root: "forget", syllables: ["for", "GET"], double: true },
  { root: "forgot", syllables: ["for", "GOT"], double: true },
  { root: "begin", syllables: ["be", "GIN"], double: true },
  { root: "prefer", syllables: ["pre", "FER"], double: true },
  { root: "admit", syllables: ["ad", "MIT"], double: true },
  { root: "occur", syllables: ["oc", "CUR"], double: true },
  { root: "regret", syllables: ["re", "GRET"], double: true },
  { root: "permit", syllables: ["per", "MIT"], double: true },
  { root: "refer", syllables: ["re", "FER"], double: true },
  { root: "omit", syllables: ["o", "MIT"], double: true },
  { root: "upset", syllables: ["up", "SET"], double: true },
  { root: "unzip", syllables: ["un", "ZIP"], double: true },
  { root: "unwrap", syllables: ["un", "WRAP"], double: true },
  { root: "unplug", syllables: ["un", "PLUG"], double: true },
  { root: "forbid", syllables: ["for", "BID"], double: true },
  { root: "outwit", syllables: ["out", "WIT"], double: true },
  // unstressed last syllable: just add
  { root: "garden", syllables: ["GAR", "den"], double: false },
  { root: "limit", syllables: ["LIM", "it"], double: false },
  { root: "visit", syllables: ["VIS", "it"], double: false },
  { root: "offer", syllables: ["OF", "fer"], double: false },
  { root: "open", syllables: ["O", "pen"], double: false },
  { root: "happen", syllables: ["HAP", "pen"], double: false },
  { root: "enter", syllables: ["EN", "ter"], double: false },
  { root: "listen", syllables: ["LIS", "ten"], double: false },
  { root: "whisper", syllables: ["WHIS", "per"], double: false },
  { root: "answer", syllables: ["AN", "swer"], double: false },
  { root: "order", syllables: ["OR", "der"], double: false },
  { root: "wonder", syllables: ["WON", "der"], double: false },
  { root: "cover", syllables: ["COV", "er"], double: false },
  { root: "water", syllables: ["WA", "ter"], double: false },
  { root: "remember", syllables: ["re", "MEM", "ber"], double: false },
  { root: "gather", syllables: ["GATH", "er"], double: false },
  { root: "shiver", syllables: ["SHIV", "er"], double: false },
  { root: "bother", syllables: ["BOTH", "er"], double: false },
  { root: "deliver", syllables: ["de", "LIV", "er"], double: false },
];

/** The words the topic uses: a root and a suffix that begins with a vowel. */
export const PAIRS = [
  ["forget", "ing"], ["forgot", "en"], ["begin", "ing"], ["begin", "er"],
  ["prefer", "ed"], ["prefer", "ing"], ["admit", "ed"], ["admit", "ing"],
  ["occur", "ed"], ["occur", "ing"], ["regret", "ed"], ["permit", "ed"],
  ["refer", "ed"], ["omit", "ed"], ["upset", "ing"], ["unzip", "ed"],
  ["unwrap", "ed"], ["unwrap", "ing"], ["unplug", "ed"], ["forbid", "en"],
  ["outwit", "ed"],
  ["garden", "ing"], ["garden", "er"], ["limit", "ing"], ["limit", "ed"],
  ["limit", "ation"], ["visit", "ed"], ["visit", "ing"], ["visit", "or"],
  ["offer", "ed"], ["offer", "ing"], ["open", "ed"], ["open", "ing"],
  ["open", "er"], ["happen", "ed"], ["happen", "ing"], ["enter", "ed"],
  ["enter", "ing"], ["listen", "ed"], ["listen", "er"], ["whisper", "ed"],
  ["whisper", "ing"], ["answer", "ed"], ["order", "ed"], ["wonder", "ed"],
  ["wonder", "ing"], ["cover", "ed"], ["water", "ed"], ["water", "ing"],
  ["remember", "ed"], ["gather", "ed"], ["shiver", "ed"], ["bother", "ed"],
  ["deliver", "ed"], ["deliver", "ing"],
];

const rootInfo = new Map(ROOTS.map((item) => [item.root, item]));

export function rootOf(root) {
  return rootInfo.get(root);
}

/** The rule itself: double the last letter only when the last syllable is stressed. */
export function addSuffix(root, suffix) {
  const info = rootInfo.get(root);
  return info.double ? root + root.at(-1) + suffix : root + suffix;
}

/** The other spelling: what you get by applying the rule the wrong way round. */
export function wrongSpelling(root, suffix) {
  const info = rootInfo.get(root);
  return info.double ? root + suffix : root + root.at(-1) + suffix;
}

export const ENTRIES = PAIRS.map(([root, suffix]) => ({
  root,
  suffix,
  double: rootInfo.get(root).double,
  word: addSuffix(root, suffix),
}));

/** Level 4: "root + suffix" is shown under the sentence, so only one word fits. */
export const TYPE_ITEMS = [
  { sentence: "Zayn keeps ___ his lunch box.", root: "forget", suffix: "ing", emoji: "🍱" },
  { sentence: "Gran is ___ in the sunshine.", root: "garden", suffix: "ing", emoji: "🌻" },
  { sentence: "This is the ___ of the story.", root: "begin", suffix: "ing", emoji: "📖" },
  { sentence: "We ___ Grandad in hospital.", root: "visit", suffix: "ed", emoji: "🏥" },
  { sentence: "Leo ___ that he ate the last biscuit.", root: "admit", suffix: "ed", emoji: "🍪" },
  { sentence: "Amara ___ the plants after school.", root: "water", suffix: "ed", emoji: "🪴" },
  { sentence: "Ellie ___ her present slowly.", root: "unwrap", suffix: "ed", emoji: "🎁" },
  { sentence: "Priya ___ a secret to her friend.", root: "whisper", suffix: "ed", emoji: "🤫" },
  { sentence: "The idea ___ to me in the bath.", root: "occur", suffix: "ed", emoji: "💡" },
  { sentence: "Biscuit ___ to the sound of the doorbell.", root: "listen", suffix: "ed", emoji: "🔔" },
  { sentence: "Zayn ___ the pencil case and took out a pen.", root: "unzip", suffix: "ed", emoji: "✏️" },
  { sentence: "The door ___ with a creak.", root: "open", suffix: "ed", emoji: "🚪" },
  { sentence: "Leo ___ shouting at his brother.", root: "regret", suffix: "ed", emoji: "😔" },
  { sentence: "Nobody knew what had ___.", root: "happen", suffix: "ed", emoji: "❓" },
  { sentence: "Dad ___ the toaster before he cleaned it.", root: "unplug", suffix: "ed", emoji: "🔌" },
  { sentence: "We ___ in the cold, wet playground.", root: "shiver", suffix: "ed", emoji: "🥶" },
  { sentence: "Our teacher is a ___ at chess.", root: "begin", suffix: "er", emoji: "♟️" },
  { sentence: "The fox ___ the hungry wolf.", root: "outwit", suffix: "ed", emoji: "🦊" },
].map((item) => ({ ...item, answer: addSuffix(item.root, item.suffix) }));

/** "for · GET" as text, for the speak button and the hints. */
export function stressText(root) {
  return rootInfo.get(root).syllables.join(" · ");
}

export function fillBlank(sentence, word) {
  return sentence.replace("___", word);
}

function pickQuestion(entry, rng) {
  return {
    kind: "pick",
    root: entry.root,
    suffix: entry.suffix,
    syllables: rootInfo.get(entry.root).syllables,
    double: entry.double,
    answer: entry.word,
    options: shuffle([entry.word, wrongSpelling(entry.root, entry.suffix)], rng),
  };
}

/**
 * Level 2: four "root + suffix" cards a question, two of each kind, and no
 * root twice in a run (so 10 doubling and 10 plain roots a run, from 16 and 19).
 */
function sortQuestions(rng) {
  const pick = (double) => {
    const byRoot = new Map();
    for (const entry of shuffle(ENTRIES.filter((item) => item.double === double), rng)) {
      if (!byRoot.has(entry.root)) byRoot.set(entry.root, entry);
    }
    return [...byRoot.values()];
  };
  const doubled = pick(true);
  const plain = pick(false);
  return Array.from({ length: QUESTIONS_PER_CHALLENGE }, () => {
    const cards = [...doubled.splice(0, 2), ...plain.splice(0, 2)].map((entry) => ({
      id: `${entry.root}+${entry.suffix}`,
      label: `${entry.root} + ${entry.suffix}`,
      root: entry.root,
      bin: entry.double ? "double" : "add",
    }));
    return {
      kind: "sort",
      bins: [
        { id: "double", label: "double the last letter" },
        { id: "add", label: "just add the ending" },
      ],
      cards: shuffle(cards, rng),
    };
  });
}

/** Level 3: tiles are the root, its last letter again, the suffix and a spare suffix. */
function buildQuestion(entry, rng) {
  const spare = sample(["ing", "ed", "er"].filter((suffix) => suffix !== entry.suffix), 1, rng)[0];
  const labels = [entry.root, entry.root.at(-1), entry.suffix, spare];
  return {
    kind: "build",
    root: entry.root,
    suffix: entry.suffix,
    double: entry.double,
    syllables: rootInfo.get(entry.root).syllables,
    answer: entry.word,
    tiles: shuffle(labels.map((label, index) => ({ id: `t${index}`, label })), rng),
  };
}

function typeQuestion(item) {
  return {
    kind: "type",
    sentence: item.sentence,
    root: item.root,
    suffix: item.suffix,
    emoji: item.emoji,
    answer: item.answer,
    syllables: rootInfo.get(item.root).syllables,
    filled: fillBlank(item.sentence, item.answer),
  };
}

/** Levels 1 and 3: five entries, at least two of each kind. */
function balanced(entries, rng) {
  const doubled = entries.filter((entry) => entry.double);
  const plain = entries.filter((entry) => !entry.double);
  const [extra] = sample([doubled, plain], 1, rng);
  const chosen = new Set([...sample(doubled, 2, rng), ...sample(plain, 2, rng)]);
  const rest = extra.filter((entry) => !chosen.has(entry));
  return shuffle([...chosen, ...sample(rest, 1, rng)], rng);
}

// Level 3 leaves out "limit + ation": its spare suffix tiles are verb endings.
const BUILD_ENTRIES = ENTRIES.filter((entry) => ["ing", "ed", "er"].includes(entry.suffix));

export function buildDoublingQuestions(level, rng) {
  if (level === 1) return balanced(ENTRIES, rng).map((entry) => pickQuestion(entry, rng));
  if (level === 2) return sortQuestions(rng);
  if (level === 3) return balanced(BUILD_ENTRIES, rng).map((entry) => buildQuestion(entry, rng));
  if (level === 4) return sample(TYPE_ITEMS, QUESTIONS_PER_CHALLENGE, rng).map(typeQuestion);
  throw new Error(`no doubling level ${level}`);
}

export function isSortCorrect(question, placement) {
  return question.cards.every((card) => placement[card.id] === card.bin);
}

export function builtWord(question, placed) {
  return placed.map((id) => question.tiles.find((tile) => tile.id === id)?.label ?? "").join("");
}

export function isBuildCorrect(question, placed) {
  return builtWord(question, placed) === question.answer;
}

/** Appendix 1's own examples, doubled and not, for the test. */
export const APPENDIX_EXAMPLES = [...PATTERNS.doubling.words, ...PATTERNS.doubling.notDoubled];

/** Roots that must never appear (British -l doubling and other exceptions). */
export const EXCLUDED_ROOTS = [
  "travel", "cancel", "label", "model", "signal", "level", "quarrel", "marvel",
  "pedal", "total", "fuel", "dial", "control", "patrol", "worship", "kidnap",
  "program", "focus", "benefit", "picnic", "panic", "gallop", "target",
];
