import { PATTERNS } from "../../english/appendix1.js";
import { sample, shuffle } from "./shared.js";

/**
 * Year 3 Tricky Sounds y and ou (Appendix 1): "The /ɪ/ sound spelt y
 * elsewhere than at the end of words" and "The /ʌ/ sound spelt ou". The
 * appendix says "These words should be learnt as needed", so the list stays
 * modest: the appendix's own examples plus a few well-known words.
 *
 *   1 fill    picture + word with a gap: choose y or i, ou or u (rule shown)
 *   2 sort    sort pictures of words into the spelling they use: the tricky
 *             one (y, ou) or the usual one (i, u) (inferred)
 *   3 build   build the word from letter tiles, with one spare tile (whole
 *             word)
 *   4 type    read or hear a sentence and type the missing word (applied)
 */
export const QUESTIONS_PER_CHALLENGE = 5;

/**
 * `gap` is where the tricky letters start, `spell` the letters ("y" or
 * "ou"). Each word has two sentences with one blank.
 */
export const WORDS = [
  { word: "myth", spell: "y", gap: 1, emoji: "🐉", meaning: "an old story about gods or magic creatures", sentences: ["Zayn read a ___ about a dragon.", "The old ___ told of a giant who lived in the sea."] },
  { word: "gym", spell: "y", gap: 1, emoji: "🤸", meaning: "a big room for PE and climbing", sentences: ["We climbed the ropes in the school ___.", "Priya does handstands in the ___."] },
  { word: "Egypt", spell: "y", gap: 2, emoji: "🐪", meaning: "a country in Africa with very old pyramids", sentences: ["The River Nile flows through ___.", "Leo’s class is learning about ancient ___."] },
  { word: "pyramid", spell: "y", gap: 1, emoji: "🔺", meaning: "a shape with a square base and pointed top", sentences: ["The kings were buried inside a stone ___.", "Amara built a ___ out of sugar cubes."] },
  { word: "mystery", spell: "y", gap: 1, emoji: "🕵️", meaning: "something strange that nobody can explain", sentences: ["Where did the cake go? It was a ___.", "Ellie loves reading ___ stories."] },
  { word: "crystal", spell: "y", gap: 2, emoji: "💎", meaning: "a clear, shiny stone", sentences: ["The cave walls sparkled with ___.", "Amara held the ___ up to the light."] },
  { word: "symbol", spell: "y", gap: 1, emoji: "♻️", meaning: "a sign or picture that stands for something", sentences: ["A heart is a ___ for love.", "The ___ on the bin means you can recycle it."] },
  { word: "syrup", spell: "y", gap: 1, emoji: "🥞", meaning: "a thick, sweet, sticky liquid", sentences: ["Leo poured ___ on his pancakes.", "The ___ was so sticky that it stuck to his fingers."] },
  { word: "gymnast", spell: "y", gap: 1, emoji: "🤸‍♀️", meaning: "someone who does flips, jumps and balances", sentences: ["The ___ did a perfect cartwheel.", "Priya wants to be a ___ when she grows up."] },
  { word: "young", spell: "ou", gap: 1, emoji: "🐣", meaning: "not old", sentences: ["The ___ chick had fluffy feathers.", "Grandad was a footballer when he was ___."] },
  { word: "touch", spell: "ou", gap: 1, emoji: "👆", meaning: "to feel something with your hand", sentences: ["Please do not ___ the wet paint.", "Biscuit’s nose is cold to ___."] },
  { word: "double", spell: "ou", gap: 1, emoji: "✖️", meaning: "two times as much", sentences: ["___ four is eight.", "Ellie had a ___ scoop of ice cream."] },
  { word: "trouble", spell: "ou", gap: 2, emoji: "😬", meaning: "a problem, or being told off", sentences: ["Biscuit was in ___ for chewing the sofa.", "The car had engine ___ and stopped."] },
  { word: "country", spell: "ou", gap: 1, emoji: "🗺️", meaning: "a land with its own people, like Wales or France", sentences: ["France is a ___ next to Spain.", "Which ___ would you most like to visit?"] },
  { word: "cousin", spell: "ou", gap: 1, emoji: "👫", meaning: "the child of your aunt or uncle", sentences: ["My ___ is coming to stay for the weekend.", "Zayn and his ___ built a sandcastle."] },
  { word: "couple", spell: "ou", gap: 1, emoji: "💑", meaning: "two people together, or two of something", sentences: ["The happy ___ danced at the wedding.", "Can I have a ___ of biscuits, please?"] },
  { word: "courage", spell: "ou", gap: 1, emoji: "🦁", meaning: "being brave", sentences: ["It took ___ to climb the tall tree.", "The knight showed great ___ in the battle."] },
];

/** The usual spelling of the same sound, offered beside the tricky one. */
export const USUAL = { y: "i", ou: "u" };

/** The third option in level 1: another vowel that is clearly wrong. */
const ODD = { y: "ee", ou: "o" };

/**
 * Level 2 "usual spelling" words: the same sound spelt the ordinary way.
 * `gap` and `spell` work as in WORDS.
 */
export const USUAL_WORDS = [
  { word: "fish", spell: "i", gap: 1, emoji: "🐟" },
  { word: "pig", spell: "i", gap: 1, emoji: "🐷" },
  { word: "milk", spell: "i", gap: 1, emoji: "🥛" },
  { word: "ship", spell: "i", gap: 2, emoji: "🚢" },
  { word: "hill", spell: "i", gap: 1, emoji: "⛰️" },
  { word: "lip", spell: "i", gap: 1, emoji: "👄" },
  { word: "sun", spell: "u", gap: 1, emoji: "☀️" },
  { word: "cup", spell: "u", gap: 1, emoji: "☕" },
  { word: "duck", spell: "u", gap: 1, emoji: "🦆" },
  { word: "bus", spell: "u", gap: 1, emoji: "🚌" },
  { word: "drum", spell: "u", gap: 2, emoji: "🥁" },
  { word: "jump", spell: "u", gap: 1, emoji: "🦘" },
];

/** "m _ th": the word with its tricky (or usual) letters replaced by one gap. */
export function gapped(entry) {
  return `${entry.word.slice(0, entry.gap)}_${entry.word.slice(entry.gap + entry.spell.length)}`;
}

export function letterHint(word) {
  return [word[0], ...Array.from(word.slice(1), () => "_")].join(" ");
}

export function fillBlank(sentence, word) {
  return sentence.replace("___", word);
}

function fillQuestion(entry, rng) {
  return {
    kind: "fill",
    word: entry.word,
    emoji: entry.emoji,
    meaning: entry.meaning,
    before: entry.word.slice(0, entry.gap),
    after: entry.word.slice(entry.gap + entry.spell.length),
    answer: entry.spell,
    usual: USUAL[entry.spell],
    options: shuffle([entry.spell, USUAL[entry.spell], ODD[entry.spell]], rng),
  };
}

/** Level 2: three tricky and three usual words for one sound. */
function sortQuestion(spell, rng) {
  const usual = USUAL[spell];
  const tricky = sample(WORDS.filter((entry) => entry.spell === spell), 3, rng);
  const plain = sample(USUAL_WORDS.filter((entry) => entry.spell === usual), 3, rng);
  const cards = [...tricky, ...plain].map((entry) => ({
    id: entry.word,
    label: `${entry.emoji} ${gapped(entry)}`,
    bin: entry.spell,
  }));
  return {
    kind: "sort",
    spell,
    bins: [
      { id: spell, label: spell },
      { id: usual, label: usual },
    ],
    cards: shuffle(cards, rng),
  };
}

/** Level 3: the word's letters plus the usual spelling as a spare tile. */
function buildQuestion(entry, rng) {
  const letters = [...entry.word, USUAL[entry.spell]];
  const tiles = letters.map((label, index) => ({ id: `l${index}`, label }));
  return {
    kind: "build",
    word: entry.word,
    emoji: entry.emoji,
    meaning: entry.meaning,
    answer: entry.word,
    tiles: shuffle(tiles, rng),
  };
}

function typeQuestion(entry, rng) {
  const [sentence] = sample(entry.sentences, 1, rng);
  return {
    kind: "type",
    emoji: entry.emoji,
    sentence,
    answer: entry.word,
    spoken: fillBlank(sentence, entry.word),
    hint: letterHint(entry.word),
  };
}

/** Both sounds in every run of levels 1, 3 and 4. */
function mixedWords(rng) {
  const y = WORDS.filter((entry) => entry.spell === "y");
  const ou = WORDS.filter((entry) => entry.spell === "ou");
  const [first, second] = shuffle([y, ou], rng);
  return shuffle([...sample(first, 3, rng), ...sample(second, 2, rng)], rng);
}

export function buildTrickySoundsYAndOuQuestions(level, rng) {
  if (level === 1) return mixedWords(rng).map((entry) => fillQuestion(entry, rng));
  if (level === 2) {
    const spells = shuffle(["y", "ou", "y", "ou", rng() < 0.5 ? "y" : "ou"], rng);
    return spells.map((spell) => sortQuestion(spell, rng));
  }
  if (level === 3) return mixedWords(rng).map((entry) => buildQuestion(entry, rng));
  if (level === 4) return mixedWords(rng).map((entry) => typeQuestion(entry, rng));
  throw new Error(`no tricky sounds level ${level}`);
}

export function isSortCorrect(question, placement) {
  return question.cards.every((card) => placement[card.id] === card.bin);
}

/** Level 3: the placed tiles, joined, compared without case (Egypt). */
export function builtWord(question, placed) {
  return placed.map((id) => question.tiles.find((tile) => tile.id === id)?.label ?? "").join("");
}

/** For the tests: the appendix's examples. */
export const APPENDIX_WORDS = { y: PATTERNS.ySoundI.words, ou: PATTERNS.ouSoundU.words };
