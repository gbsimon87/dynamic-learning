import { sentenceQuestions } from "./year4Practice.js";
/** Expanded Noun Phrases: docs/curriculum/year-3-and-4-english.md, Year 4 mapping. */
export const RULE = "An expanded noun phrase (a noun with extra description) adds adjectives, nouns or a preposition phrase.";
export const BANK = [
  {
    "sentence": "We noticed ___.",
    "answer": "the small brown dog with a curled tail",
    "wrong": [
      "the dog small brown with a curled tail",
      "the small brown with a curled tail dog"
    ],
    "prompt": "Build a phrase describing the dog.",
    "hint": "Keep the describing words before the noun and the preposition phrase after it."
  },
  {
    "sentence": "We noticed ___.",
    "answer": "the sleepy black cat on the cushion",
    "wrong": [
      "the cat sleepy black on the cushion",
      "the sleepy black on the cushion cat"
    ],
    "prompt": "Build a phrase describing the cat.",
    "hint": "Keep the describing words before the noun and the preposition phrase after it."
  },
  {
    "sentence": "We noticed ___.",
    "answer": "the tiny wooden boat beside the jetty",
    "wrong": [
      "the boat tiny wooden beside the jetty",
      "the tiny wooden beside the jetty boat"
    ],
    "prompt": "Build a phrase describing the boat.",
    "hint": "Keep the describing words before the noun and the preposition phrase after it."
  },
  {
    "sentence": "We noticed ___.",
    "answer": "the old stone house on the hill",
    "wrong": [
      "the house old stone on the hill",
      "the old stone on the hill house"
    ],
    "prompt": "Build a phrase describing the house.",
    "hint": "Keep the describing words before the noun and the preposition phrase after it."
  },
  {
    "sentence": "We noticed ___.",
    "answer": "the tall leafy tree by the gate",
    "wrong": [
      "the tree tall leafy by the gate",
      "the tall leafy by the gate tree"
    ],
    "prompt": "Build a phrase describing the tree.",
    "hint": "Keep the describing words before the noun and the preposition phrase after it."
  },
  {
    "sentence": "We noticed ___.",
    "answer": "the heavy blue bag under the desk",
    "wrong": [
      "the bag heavy blue under the desk",
      "the heavy blue under the desk bag"
    ],
    "prompt": "Build a phrase describing the bag.",
    "hint": "Keep the describing words before the noun and the preposition phrase after it."
  },
  {
    "sentence": "We noticed ___.",
    "answer": "the little yellow bird in the tree",
    "wrong": [
      "the bird little yellow in the tree",
      "the little yellow in the tree bird"
    ],
    "prompt": "Build a phrase describing the bird.",
    "hint": "Keep the describing words before the noun and the preposition phrase after it."
  },
  {
    "sentence": "We noticed ___.",
    "answer": "the comfortable green chair near the window",
    "wrong": [
      "the chair comfortable green near the window",
      "the comfortable green near the window chair"
    ],
    "prompt": "Build a phrase describing the chair.",
    "hint": "Keep the describing words before the noun and the preposition phrase after it."
  },
  {
    "sentence": "We noticed ___.",
    "answer": "the enormous purple dragon with silver wings",
    "wrong": [
      "the dragon enormous purple with silver wings",
      "the enormous purple with silver wings dragon"
    ],
    "prompt": "Build a phrase describing the dragon.",
    "hint": "Keep the describing words before the noun and the preposition phrase after it."
  },
  {
    "sentence": "We noticed ___.",
    "answer": "the ancient ruined castle above the village",
    "wrong": [
      "the castle ancient ruined above the village",
      "the ancient ruined above the village castle"
    ],
    "prompt": "Build a phrase describing the castle.",
    "hint": "Keep the describing words before the noun and the preposition phrase after it."
  },
  {
    "sentence": "We noticed ___.",
    "answer": "the thick red book on the shelf",
    "wrong": [
      "the book thick red on the shelf",
      "the thick red on the shelf book"
    ],
    "prompt": "Build a phrase describing the book.",
    "hint": "Keep the describing words before the noun and the preposition phrase after it."
  },
  {
    "sentence": "We noticed ___.",
    "answer": "the delicate white flower beside the stream",
    "wrong": [
      "the flower delicate white beside the stream",
      "the delicate white beside the stream flower"
    ],
    "prompt": "Build a phrase describing the flower.",
    "hint": "Keep the describing words before the noun and the preposition phrase after it."
  },
  {
    "sentence": "We noticed ___.",
    "answer": "the small metal box with a brass lock",
    "wrong": [
      "the box small metal with a brass lock",
      "the small metal with a brass lock box"
    ],
    "prompt": "Build a phrase describing the box.",
    "hint": "Keep the describing words before the noun and the preposition phrase after it."
  },
  {
    "sentence": "We noticed ___.",
    "answer": "the narrow wooden bridge over the river",
    "wrong": [
      "the bridge narrow wooden over the river",
      "the narrow wooden over the river bridge"
    ],
    "prompt": "Build a phrase describing the bridge.",
    "hint": "Keep the describing words before the noun and the preposition phrase after it."
  },
  {
    "sentence": "We noticed ___.",
    "answer": "the warm woollen coat with large buttons",
    "wrong": [
      "the coat warm woollen with large buttons",
      "the warm woollen with large buttons coat"
    ],
    "prompt": "Build a phrase describing the coat.",
    "hint": "Keep the describing words before the noun and the preposition phrase after it."
  }
];
export function buildExpandedNounPhrasesQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng);
}
