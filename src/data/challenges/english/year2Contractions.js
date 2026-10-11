import { wordQuestions } from "./year2Practice.js";

/** Contractions: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "An apostrophe marks missing letters. Do not becomes don’t.";
export const BANK = [
  {
    "answer": "can't",
    "wrong": [
      "cant",
      "ca'nt"
    ],
    "clue": "Shorten cannot with an apostrophe."
  },
  {
    "answer": "didn't",
    "wrong": [
      "didnt",
      "did'nt"
    ],
    "clue": "Shorten did not with an apostrophe."
  },
  {
    "answer": "hasn't",
    "wrong": [
      "hasnt",
      "has'nt"
    ],
    "clue": "Shorten has not with an apostrophe."
  },
  {
    "answer": "couldn't",
    "wrong": [
      "couldnt",
      "could'nt"
    ],
    "clue": "Shorten could not with an apostrophe."
  },
  {
    "answer": "it's",
    "wrong": [
      "its",
      "its'"
    ],
    "clue": "Shorten it is with an apostrophe."
  },
  {
    "answer": "I'll",
    "wrong": [
      "Ill",
      "Il'l"
    ],
    "clue": "Shorten I will with an apostrophe."
  },
  {
    "answer": "don't",
    "wrong": [
      "dont",
      "do'nt"
    ],
    "clue": "Shorten do not with an apostrophe."
  },
  {
    "answer": "isn't",
    "wrong": [
      "isnt",
      "is'nt"
    ],
    "clue": "Shorten is not with an apostrophe."
  },
  {
    "answer": "wasn't",
    "wrong": [
      "wasnt",
      "was'nt"
    ],
    "clue": "Shorten was not with an apostrophe."
  },
  {
    "answer": "aren't",
    "wrong": [
      "arent",
      "are'nt"
    ],
    "clue": "Shorten are not with an apostrophe."
  },
  {
    "answer": "weren't",
    "wrong": [
      "werent",
      "were'nt"
    ],
    "clue": "Shorten were not with an apostrophe."
  },
  {
    "answer": "won't",
    "wrong": [
      "wont",
      "wo'nt"
    ],
    "clue": "Shorten will not. This contraction changes the spelling too."
  },
  {
    "answer": "I'm",
    "wrong": [
      "Im",
      "I'mm"
    ],
    "clue": "Shorten I am with an apostrophe."
  },
  {
    "answer": "we're",
    "wrong": [
      "were",
      "wer'e"
    ],
    "clue": "Shorten we are with an apostrophe."
  },
  {
    "answer": "they're",
    "wrong": [
      "theyre",
      "their"
    ],
    "clue": "Shorten they are with an apostrophe."
  }
];
export function buildQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
