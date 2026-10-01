import { PATTERNS } from "../../english/appendix1.js";
import { sample, shuffle } from "./shared.js";

/**
 * Year 3 The Suffixes ation and ly (Appendix 1).
 *
 * –ation is added to verbs to form nouns, and "the rules already learnt still
 * apply": a final e is dropped (admire → admiration).
 * –ly is added to an adjective to form an adverb, straight on to most roots
 * (sad → sadly, usual → usually). Exception (1) only: a root of more than one
 * syllable ending in a consonant + y changes y to i (happy → happily).
 *
 * Exceptions (2) to (4) (gently, basically, truly, duly, wholly) are YEAR 4 and
 * never appear: no root here ends in –le or –ic, and none is true, due or
 * whole (the test checks). One-syllable –y roots (shy, dry, sly) are left out
 * too: their –ly forms keep the y, so they would contradict exception (1).
 *
 *   1 pick   the rules are shown; pick the right spelling of root + suffix
 *   2 sort   which suffix does each root take? / just add –ly, or y to i?
 *   3 build  build the word from root, root-without-its-last-letter, i and
 *            suffix tiles
 *   4 type   a sentence and a root in brackets: type the word (no gloss)
 */
export const QUESTIONS_PER_CHALLENGE = 5;

/** –ation: verb → noun. A root ending in e drops it. */
export const ATION_ROOTS = [
  "inform", "adore", "sense", "prepare", "admire", "explore", "imagine",
  "invite", "examine", "observe", "combine", "inspire", "relax", "expect",
  "limit", "tempt", "starve",
];

/** –ly added straight on: adjective → adverb, no change to the root. */
export const LY_ROOTS = [
  "sad", "complete", "usual", "final", "comical", "quick", "slow", "loud",
  "quiet", "kind", "brave", "careful", "safe", "proud", "soft", "glad", "bad",
  "nice", "polite", "sudden", "calm", "neat", "bright", "warm", "wise",
];

/** Exception (1): more than one syllable, consonant + y → change y to i. */
export const LY_Y_ROOTS = [
  "happy", "angry", "lucky", "busy", "easy", "noisy", "hungry", "lazy",
  "sleepy", "merry", "greedy", "cheeky", "grumpy", "messy", "tidy", "heavy",
];

export function addAtion(root) {
  return root.replace(/e$/, "") + "ation";
}

export function addLy(root) {
  return /[^aeiou]y$/.test(root) ? root.slice(0, -1) + "ily" : root + "ly";
}

/** Every root with its suffix, the finished word and which rule it uses. */
export const ENTRIES = [
  ...ATION_ROOTS.map((root) => ({
    root,
    suffix: "ation",
    word: addAtion(root),
    rule: root.endsWith("e") ? "drop-e" : "add",
  })),
  ...LY_ROOTS.map((root) => ({ root, suffix: "ly", word: addLy(root), rule: "add" })),
  ...LY_Y_ROOTS.map((root) => ({ root, suffix: "ly", word: addLy(root), rule: "y-to-i" })),
];

/**
 * Level 1 wrong spellings: the near-misses children actually write. Keeping
 * the e (admireation, admiretion), sounding it out (informashun), dropping it before –ly (completly), one l (usualy),
 * keeping the y (happyly), the y-to-i rule where it does not belong (sadily).
 */
export function nearMisses(entry) {
  const { root, suffix } = entry;
  const stem = root.slice(0, -1);
  if (suffix === "ation") {
    return entry.rule === "drop-e" ? [root + "ation", root + "tion"] : [root + "ion", root + "ashun"];
  }
  if (entry.rule === "y-to-i") return [root + "ly", stem + "ly"];
  if (root.endsWith("l")) return [root + "y", root + "ily"];
  if (root.endsWith("e")) return [stem + "ly", stem + "ily"];
  return [root + "ily", root + "ley"];
}

/** Level 4: the sentence decides the suffix; the root is shown in brackets. */
export const TYPE_ITEMS = [
  { sentence: "Biscuit wagged his tail ___ when Ellie came home.", root: "happy", answer: "happily", emoji: "🐶" },
  { sentence: "Zayn closed the door ___ so the baby did not wake.", root: "quiet", answer: "quietly", emoji: "🚪" },
  { sentence: "We sent Gran an ___ to our party.", root: "invite", answer: "invitation", emoji: "💌" },
  { sentence: "Leo used his ___ to draw a dragon with three heads.", root: "imagine", answer: "imagination", emoji: "🐉" },
  { sentence: "The firefighter ___ ran into the smoke.", root: "brave", answer: "bravely", emoji: "🧑‍🚒" },
  { sentence: "The library has lots of ___ about dinosaurs.", root: "inform", answer: "information", emoji: "🦕" },
  { sentence: "The tired children ate their dinner ___.", root: "hungry", answer: "hungrily", emoji: "🍝" },
  { sentence: "Amara ___ remembered to bring her coat.", root: "lucky", answer: "luckily", emoji: "🧥" },
  { sentence: "Mr Green stamped his foot ___.", root: "angry", answer: "angrily", emoji: "😠" },
  { sentence: "After the long walk, Gran sat down for some ___.", root: "relax", answer: "relaxation", emoji: "🛋️" },
  { sentence: "We did lots of ___ for the school play.", root: "prepare", answer: "preparation", emoji: "🎭" },
  { sentence: "Priya carried the eggs ___ so none of them broke.", root: "careful", answer: "carefully", emoji: "🥚" },
  { sentence: "The doctor gave Leo an ___ to check his ears.", root: "examine", answer: "examination", emoji: "🩺" },
  { sentence: "Ellie ___ walks Biscuit before school.", root: "usual", answer: "usually", emoji: "🦮" },
  { sentence: "The race was long, but we ___ reached the finish line.", root: "final", answer: "finally", emoji: "🏁" },
  { sentence: "The monkey grinned ___ and stole a banana.", root: "cheeky", answer: "cheekily", emoji: "🐒" },
  { sentence: "Our class went on an ___ of the woods.", root: "explore", answer: "exploration", emoji: "🌳" },
  { sentence: "Biscuit ___ ate all the sausages.", root: "greedy", answer: "greedily", emoji: "🌭" },
  { sentence: "The puppy ___ jumped into the puddle.", root: "sudden", answer: "suddenly", emoji: "💦" },
];

export function letterHint(word) {
  return [word[0], ...Array.from(word.slice(1), () => "_")].join(" ");
}

export function fillBlank(sentence, word) {
  return sentence.replace("___", word);
}

function pickQuestion(entry, rng) {
  return {
    kind: "pick",
    root: entry.root,
    suffix: entry.suffix,
    rule: entry.rule,
    answer: entry.word,
    options: shuffle([entry.word, ...nearMisses(entry)], rng),
  };
}

export const SORT_KINDS = {
  suffix: {
    prompt: "Which suffix (word ending) does each word take?",
    bins: [
      { id: "ation", label: "+ ation" },
      { id: "ly", label: "+ ly" },
    ],
  },
  y: {
    prompt: "Each word takes the suffix (word ending) ly. How do you add it?",
    bins: [
      { id: "add", label: "just add ly" },
      { id: "y-to-i", label: "change y to i, then add ly" },
    ],
  },
};

/**
 * Level 2: three "which suffix?" sorts and two "just add, or y to i?" sorts,
 * three cards a bin, and no root twice in a run.
 */
function sortQuestions(rng) {
  const ation = shuffle(ATION_ROOTS, rng);
  const ly = shuffle(LY_ROOTS, rng);
  const lyY = shuffle(LY_Y_ROOTS, rng);
  const kinds = shuffle(["suffix", "suffix", "suffix", "y", "y"], rng);
  return kinds.map((kind) => {
    const cards =
      kind === "suffix"
        ? [
            ...ation.splice(0, 3).map((root) => ({ id: root, label: root, bin: "ation" })),
            ...ly.splice(0, 3).map((root) => ({ id: root, label: root, bin: "ly" })),
          ]
        : [
            ...ly.splice(0, 3).map((root) => ({ id: root, label: root, bin: "add" })),
            ...lyY.splice(0, 3).map((root) => ({ id: root, label: root, bin: "y-to-i" })),
          ];
    return { kind: "sort", sortKind: kind, prompt: SORT_KINDS[kind].prompt, bins: SORT_KINDS[kind].bins, cards: shuffle(cards, rng) };
  });
}

/**
 * Level 3: the same five kinds of tile every time, so the tiles never hint
 * at the rule: the root, the root without its last letter, i, ation, ly.
 */
function buildQuestion(entry, rng) {
  const labels = [entry.root, entry.root.slice(0, -1), "i", "ation", "ly"];
  return {
    kind: "build",
    root: entry.root,
    suffix: entry.suffix,
    rule: entry.rule,
    answer: entry.word,
    tiles: shuffle(labels.map((label, index) => ({ id: `t${index}`, label })), rng),
  };
}

function typeQuestion(item) {
  return {
    kind: "type",
    sentence: item.sentence,
    root: item.root,
    emoji: item.emoji,
    answer: item.answer,
    spoken: `${fillBlank(item.sentence, "blank")} The root word is ${item.root}.`,
    filled: fillBlank(item.sentence, item.answer),
    hint: letterHint(item.answer),
  };
}

// Level 3 skips three-letter roots: "sa" as a tile would only be noise.
const BUILD_ENTRIES = ENTRIES.filter((entry) => entry.root.length >= 4);

export function buildSuffixQuestions(level, rng) {
  if (level === 2) return sortQuestions(rng);
  if (level === 1) return balanced(ENTRIES, rng).map((entry) => pickQuestion(entry, rng));
  if (level === 3) return balanced(BUILD_ENTRIES, rng).map((entry) => buildQuestion(entry, rng));
  if (level === 4) return sample(TYPE_ITEMS, QUESTIONS_PER_CHALLENGE, rng).map(typeQuestion);
  throw new Error(`no ation and ly level ${level}`);
}

/**
 * Five entries covering every rule: two –ation (one drop-e), one plain –ly,
 * two y-to-i, so a run never misses the rule the topic is about.
 */
function balanced(entries, rng) {
  const of = (suffix, rule) => entries.filter((entry) => entry.suffix === suffix && entry.rule === rule);
  return shuffle(
    [
      ...sample(of("ation", "drop-e"), 1, rng),
      ...sample(of("ation", "add"), 1, rng),
      ...sample(of("ly", "add"), 1, rng),
      ...sample(of("ly", "y-to-i"), 2, rng),
    ],
    rng
  );
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

/** Appendix 1's examples for –ation and –ly (Year 3 half). */
export const APPENDIX_EXAMPLES = [...PATTERNS.ation.words, ...PATTERNS.ly.words];
