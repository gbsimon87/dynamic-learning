import { sample, shuffle } from "./shared.js";
import { wordQuestions } from "./year4Practice.js";
/** More Homophones: docs/curriculum/year-3-and-4-english.md, Year 4 mapping. */
export const RULE = "Homophones (words sounding the same) have different spellings and meanings. Use the sentence to decide.";
export const BANK = [
  {
    "word": "accept",
    "meaning": "to agree to take something",
    "sentence": "Will you ___ the invitation?",
    "wrong": [
      "except",
      "axcept"
    ]
  },
  {
    "word": "except",
    "meaning": "apart from",
    "sentence": "Everyone went ___ Leo.",
    "wrong": [
      "accept",
      "exept"
    ]
  },
  {
    "word": "affect",
    "meaning": "to change or influence",
    "sentence": "Rain can ___ the game.",
    "wrong": [
      "effect",
      "afect"
    ]
  },
  {
    "word": "effect",
    "meaning": "a result",
    "sentence": "The medicine had a helpful ___.",
    "wrong": [
      "affect",
      "efect"
    ]
  },
  {
    "word": "groan",
    "meaning": "a low sound of pain or complaint",
    "sentence": "Leo let out a ___ when he saw the chores.",
    "wrong": [
      "grown",
      "grone"
    ]
  },
  {
    "word": "grown",
    "meaning": "become bigger",
    "sentence": "The plant has ___ taller.",
    "wrong": [
      "groan",
      "growen"
    ]
  },
  {
    "word": "heel",
    "meaning": "the back part of a foot",
    "sentence": "My shoe rubbed my ___.",
    "wrong": [
      "heal",
      "he’ll"
    ]
  },
  {
    "word": "heal",
    "meaning": "to become well again",
    "sentence": "The cut will ___ soon.",
    "wrong": [
      "heel",
      "he’ll"
    ]
  },
  {
    "word": "he’ll",
    "meaning": "he will",
    "sentence": "Leo says ___ help tomorrow.",
    "wrong": [
      "heal",
      "heel"
    ]
  },
  {
    "word": "medal",
    "meaning": "a prize worn on a ribbon",
    "sentence": "Amara won a gold ___.",
    "wrong": [
      "meddle",
      "medel"
    ]
  },
  {
    "word": "meddle",
    "meaning": "to interfere",
    "sentence": "Please do not ___ with my model.",
    "wrong": [
      "medal",
      "medle"
    ]
  },
  {
    "word": "scene",
    "meaning": "a part of a play",
    "sentence": "The last ___ was set in a cave.",
    "wrong": [
      "seen",
      "sceen"
    ]
  },
  {
    "word": "seen",
    "meaning": "looked at in the past",
    "sentence": "Have you ___ my coat?",
    "wrong": [
      "scene",
      "sean"
    ]
  },
  {
    "word": "weather",
    "meaning": "the conditions outside",
    "sentence": "The ___ was wet and windy.",
    "wrong": [
      "whether",
      "wether"
    ]
  },
  {
    "word": "whether",
    "meaning": "if one thing or another is true",
    "sentence": "I cannot decide ___ to walk or cycle.",
    "wrong": [
      "weather",
      "wether"
    ]
  },
  {
    "word": "whose",
    "meaning": "belonging to which person",
    "sentence": "___ bag is this?",
    "wrong": [
      "who’s",
      "whos"
    ]
  },
  {
    "word": "who’s",
    "meaning": "who is",
    "sentence": "___ coming to the party?",
    "wrong": [
      "whose",
      "whos"
    ]
  }
];
export function buildMoreHomophonesQuestions(level, rng) {
  if (level === 2) return Array.from({ length: 5 }, () => ({ kind: "sort",
    prompt: "Does the word fit this sentence? Homophones must match its meaning.",
    bins: [{ id: "right", label: "Fits the sentence" }, { id: "wrong", label: "Does not fit" }],
    cards: shuffle(sample(BANK, 6, rng).map((row, index) => ({ id: String(index),
      label: row.sentence.replace("___", index < 3 ? row.word : row.wrong[0]),
      bin: index < 3 ? "right" : "wrong" })), rng),
    hint: "Three words fit. Read each whole sentence and check the word’s meaning." }));
  return wordQuestions(BANK, RULE, level, rng);
}
