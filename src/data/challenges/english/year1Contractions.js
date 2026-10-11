import { wordReadingQuestions } from "./year1Practice.js";

/** Year 1: "read words with contractions [for example, I’m, I’ll, we’ll], and understand that the apostrophe represents the omitted letter(s)".
 * Source: docs/curriculum/year-1-english.md and english-appendix-1-year-1.md.
 * 1 supported choice; 2 independent choice; 3 whole-structure work; 4 applied building/spelling.
 */
export const TITLES = [
  "Read and choose.",
  "Find the meaning.",
  "Match the meaning.",
  "Build the meaning."
];
export const BANK = [
  {
    "word": "I'm",
    "meaning": "I am",
    "wrong": [
      "I will",
      "I have"
    ],
    "parts": [
      "I",
      "'",
      "m"
    ],
    "hint": "The little mark stands for letters left out of two words.",
    "expanded": "I am",
    "omitted": "a"
  },
  {
    "word": "I'll",
    "meaning": "I will",
    "wrong": [
      "I am",
      "I have"
    ],
    "parts": [
      "I",
      "'",
      "ll"
    ],
    "hint": "The little mark stands for letters left out of two words.",
    "expanded": "I will",
    "omitted": "wi"
  },
  {
    "word": "we'll",
    "meaning": "we will",
    "wrong": [
      "we are",
      "we have"
    ],
    "parts": [
      "we",
      "'",
      "ll"
    ],
    "hint": "The little mark stands for letters left out of two words.",
    "expanded": "we will",
    "omitted": "wi"
  },
  {
    "word": "he's",
    "meaning": "he is",
    "wrong": [
      "he will",
      "he can"
    ],
    "parts": [
      "he",
      "'",
      "s"
    ],
    "hint": "The little mark stands for letters left out of two words.",
    "expanded": "he is",
    "omitted": "i"
  },
  {
    "word": "she's",
    "meaning": "she is",
    "wrong": [
      "she will",
      "she can"
    ],
    "parts": [
      "she",
      "'",
      "s"
    ],
    "hint": "The little mark stands for letters left out of two words.",
    "expanded": "she is",
    "omitted": "i"
  },
  {
    "word": "it's",
    "meaning": "it is",
    "wrong": [
      "it will",
      "it can"
    ],
    "parts": [
      "it",
      "'",
      "s"
    ],
    "hint": "The little mark stands for letters left out of two words.",
    "expanded": "it is",
    "omitted": "i"
  },
  {
    "word": "you're",
    "meaning": "you are",
    "wrong": [
      "you will",
      "you have"
    ],
    "parts": [
      "you",
      "'",
      "re"
    ],
    "hint": "The little mark stands for letters left out of two words.",
    "expanded": "you are",
    "omitted": "a"
  },
  {
    "word": "we're",
    "meaning": "we are",
    "wrong": [
      "we will",
      "we have"
    ],
    "parts": [
      "we",
      "'",
      "re"
    ],
    "hint": "The little mark stands for letters left out of two words.",
    "expanded": "we are",
    "omitted": "a"
  },
  {
    "word": "they're",
    "meaning": "they are",
    "wrong": [
      "they will",
      "they have"
    ],
    "parts": [
      "they",
      "'",
      "re"
    ],
    "hint": "The little mark stands for letters left out of two words.",
    "expanded": "they are",
    "omitted": "a"
  },
  {
    "word": "can't",
    "meaning": "cannot do it",
    "wrong": [
      "can do it",
      "will do it"
    ],
    "parts": [
      "can",
      "'",
      "t"
    ],
    "hint": "The little mark stands for letters left out of two words.",
    "expanded": "cannot",
    "omitted": "no"
  },
  {
    "word": "don't",
    "meaning": "do not",
    "wrong": [
      "does not",
      "did not"
    ],
    "parts": [
      "don",
      "'",
      "t"
    ],
    "hint": "The little mark stands for letters left out of two words.",
    "expanded": "do not",
    "omitted": "o"
  },
  {
    "word": "didn't",
    "meaning": "did not",
    "wrong": [
      "do not",
      "does not"
    ],
    "parts": [
      "didn",
      "'",
      "t"
    ],
    "hint": "The little mark stands for letters left out of two words.",
    "expanded": "did not",
    "omitted": "o"
  },
  {
    "word": "isn't",
    "meaning": "is not",
    "wrong": [
      "was not",
      "will not"
    ],
    "parts": [
      "isn",
      "'",
      "t"
    ],
    "hint": "The little mark stands for letters left out of two words.",
    "expanded": "is not",
    "omitted": "o"
  },
  {
    "word": "wasn't",
    "meaning": "was not",
    "wrong": [
      "is not",
      "will not"
    ],
    "parts": [
      "wasn",
      "'",
      "t"
    ],
    "hint": "The little mark stands for letters left out of two words.",
    "expanded": "was not",
    "omitted": "o"
  },
  {
    "word": "haven't",
    "meaning": "have not",
    "wrong": [
      "had not",
      "has not"
    ],
    "parts": [
      "haven",
      "'",
      "t"
    ],
    "hint": "The little mark stands for letters left out of two words.",
    "expanded": "have not",
    "omitted": "o"
  },
  {
    "word": "I've",
    "meaning": "I have",
    "wrong": [
      "I am",
      "I will"
    ],
    "parts": [
      "I",
      "'",
      "ve"
    ],
    "hint": "The little mark stands for letters left out of two words.",
    "expanded": "I have",
    "omitted": "ha"
  }
];
export function buildContractions(level, rng) {
  return wordReadingQuestions(BANK, "The little mark shows where letters have been left out.", level, rng);
}
