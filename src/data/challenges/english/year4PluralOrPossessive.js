import { sentenceQuestions } from "./year4Practice.js";
/** Plural or Possessive: docs/curriculum/year-3-and-4-english.md, Year 4 mapping. */
export const RULE = "Plural s means more than one. Possessive ’s or s’ shows that something belongs to someone.";
export const BANK = [
  {
    "sentence": "We saw three ___ by the gate.",
    "answer": "dogs",
    "wrong": [
      "dog’s",
      "dogs’"
    ],
    "prompt": "Choose the plural noun.",
    "hint": "Count the animals or people. Is anyone owning something?"
  },
  {
    "sentence": "We saw three ___ by the gate.",
    "answer": "cats",
    "wrong": [
      "cat’s",
      "cats’"
    ],
    "prompt": "Choose the plural noun.",
    "hint": "Count the animals or people. Is anyone owning something?"
  },
  {
    "sentence": "We saw three ___ by the gate.",
    "answer": "foxes",
    "wrong": [
      "fox’s",
      "foxes’"
    ],
    "prompt": "Choose the plural noun.",
    "hint": "Count the animals or people. Is anyone owning something?"
  },
  {
    "sentence": "We saw three ___ by the gate.",
    "answer": "horses",
    "wrong": [
      "horse’s",
      "horses’"
    ],
    "prompt": "Choose the plural noun.",
    "hint": "Count the animals or people. Is anyone owning something?"
  },
  {
    "sentence": "We saw three ___ by the gate.",
    "answer": "birds",
    "wrong": [
      "bird’s",
      "birds’"
    ],
    "prompt": "Choose the plural noun.",
    "hint": "Count the animals or people. Is anyone owning something?"
  },
  {
    "sentence": "The ___ coat was blue.",
    "answer": "girl’s",
    "wrong": [
      "girls",
      "girls’"
    ],
    "context": "One girl owned the coat.",
    "prompt": "Show who owns the coat.",
    "hint": "How many owners are there?"
  },
  {
    "sentence": "The ___ coat was blue.",
    "answer": "boy’s",
    "wrong": [
      "boys",
      "boys’"
    ],
    "context": "One boy owned the coat.",
    "prompt": "Show who owns the coat.",
    "hint": "How many owners are there?"
  },
  {
    "sentence": "The ___ coat was blue.",
    "answer": "teacher’s",
    "wrong": [
      "teachers",
      "teachers’"
    ],
    "context": "One teacher owned the coat.",
    "prompt": "Show who owns the coat.",
    "hint": "How many owners are there?"
  },
  {
    "sentence": "The ___ coat was blue.",
    "answer": "player’s",
    "wrong": [
      "players",
      "players’"
    ],
    "context": "One player owned the coat.",
    "prompt": "Show who owns the coat.",
    "hint": "How many owners are there?"
  },
  {
    "sentence": "The ___ coat was blue.",
    "answer": "friend’s",
    "wrong": [
      "friends",
      "friends’"
    ],
    "context": "One friend owned the coat.",
    "prompt": "Show who owns the coat.",
    "hint": "How many owners are there?"
  },
  {
    "sentence": "The ___ bowls were empty.",
    "answer": "dogs’",
    "wrong": [
      "dog’s",
      "dogs"
    ],
    "context": "The bowls belong to several dogs.",
    "prompt": "Show who owns the bowls.",
    "hint": "Find the plural form before you place the apostrophe."
  },
  {
    "sentence": "The ___ bowls were empty.",
    "answer": "cats’",
    "wrong": [
      "cat’s",
      "cats"
    ],
    "context": "The bowls belong to several cats.",
    "prompt": "Show who owns the bowls.",
    "hint": "Find the plural form before you place the apostrophe."
  },
  {
    "sentence": "The ___ bowls were empty.",
    "answer": "rabbits’",
    "wrong": [
      "rabbit’s",
      "rabbits"
    ],
    "context": "The bowls belong to several rabbits.",
    "prompt": "Show who owns the bowls.",
    "hint": "Find the plural form before you place the apostrophe."
  },
  {
    "sentence": "The ___ bowls were empty.",
    "answer": "horses’",
    "wrong": [
      "horse’s",
      "horses"
    ],
    "context": "The bowls belong to several horses.",
    "prompt": "Show who owns the bowls.",
    "hint": "Find the plural form before you place the apostrophe."
  },
  {
    "sentence": "The ___ bowls were empty.",
    "answer": "birds’",
    "wrong": [
      "bird’s",
      "birds"
    ],
    "context": "The bowls belong to several birds.",
    "prompt": "Show who owns the bowls.",
    "hint": "Find the plural form before you place the apostrophe."
  }
];
export function buildPluralOrPossessiveQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng);
}
