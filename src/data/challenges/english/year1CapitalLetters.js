import { sentenceQuestions } from "./year1Practice.js";

/** Year 1: "using a capital letter for names of people, places, the days of the week, and the personal pronoun ‘I’".
 * Source: docs/curriculum/year-1-english.md and english-appendix-1-year-1.md.
 * 1 supported choice; 2 independent choice; 3 whole-structure work; 4 applied building/spelling.
 */
export const TITLES = [
  "Read the clue.",
  "Try without the rule.",
  "Build it with tiles.",
  "Use what you know."
];
export const BANK = [
  {
    "prompt": "Fix the capital letter.",
    "context": "i am here.",
    "answer": "I am here.",
    "wrong": [
      "i am here."
    ],
    "caseSensitive": true,
    "speak": "Fix the capital letter.",
    "hint": "Check names, places, days and the word I."
  },
  {
    "prompt": "Fix the capital letter.",
    "context": "leo has a bag.",
    "answer": "Leo has a bag.",
    "wrong": [
      "leo has a bag."
    ],
    "caseSensitive": true,
    "speak": "Fix the capital letter.",
    "hint": "Check names, places, days and the word I."
  },
  {
    "prompt": "Fix the capital letter.",
    "context": "amara can jump.",
    "answer": "Amara can jump.",
    "wrong": [
      "amara can jump."
    ],
    "caseSensitive": true,
    "speak": "Fix the capital letter.",
    "hint": "Check names, places, days and the word I."
  },
  {
    "prompt": "Fix the capital letter.",
    "context": "priya likes cake.",
    "answer": "Priya likes cake.",
    "wrong": [
      "priya likes cake."
    ],
    "caseSensitive": true,
    "speak": "Fix the capital letter.",
    "hint": "Check names, places, days and the word I."
  },
  {
    "prompt": "Fix the capital letter.",
    "context": "zayn has a hat.",
    "answer": "Zayn has a hat.",
    "wrong": [
      "zayn has a hat."
    ],
    "caseSensitive": true,
    "speak": "Fix the capital letter.",
    "hint": "Check names, places, days and the word I."
  },
  {
    "prompt": "Fix the capital letter.",
    "context": "Ellie feeds biscuit.",
    "answer": "Ellie feeds Biscuit.",
    "wrong": [
      "Ellie feeds biscuit."
    ],
    "caseSensitive": true,
    "speak": "Fix the capital letter.",
    "hint": "Check names, places, days and the word I."
  },
  {
    "prompt": "Fix the capital letter.",
    "context": "We visit london.",
    "answer": "We visit London.",
    "wrong": [
      "We visit london."
    ],
    "caseSensitive": true,
    "speak": "Fix the capital letter.",
    "hint": "Check names, places, days and the word I."
  },
  {
    "prompt": "Fix the capital letter.",
    "context": "We live in kent.",
    "answer": "We live in Kent.",
    "wrong": [
      "We live in kent."
    ],
    "caseSensitive": true,
    "speak": "Fix the capital letter.",
    "hint": "Check names, places, days and the word I."
  },
  {
    "prompt": "Fix the capital letter.",
    "context": "We visit york.",
    "answer": "We visit York.",
    "wrong": [
      "We visit york."
    ],
    "caseSensitive": true,
    "speak": "Fix the capital letter.",
    "hint": "Check names, places, days and the word I."
  },
  {
    "prompt": "Fix the capital letter.",
    "context": "Today is monday.",
    "answer": "Today is Monday.",
    "wrong": [
      "Today is monday."
    ],
    "caseSensitive": true,
    "speak": "Fix the capital letter.",
    "hint": "Check names, places, days and the word I."
  },
  {
    "prompt": "Fix the capital letter.",
    "context": "We play on tuesday.",
    "answer": "We play on Tuesday.",
    "wrong": [
      "We play on tuesday."
    ],
    "caseSensitive": true,
    "speak": "Fix the capital letter.",
    "hint": "Check names, places, days and the word I."
  },
  {
    "prompt": "Fix the capital letter.",
    "context": "It is wednesday.",
    "answer": "It is Wednesday.",
    "wrong": [
      "It is wednesday."
    ],
    "caseSensitive": true,
    "speak": "Fix the capital letter.",
    "hint": "Check names, places, days and the word I."
  },
  {
    "prompt": "Fix the capital letter.",
    "context": "School ends on friday.",
    "answer": "School ends on Friday.",
    "wrong": [
      "School ends on friday."
    ],
    "caseSensitive": true,
    "speak": "Fix the capital letter.",
    "hint": "Check names, places, days and the word I."
  },
  {
    "prompt": "Fix the capital letter.",
    "context": "i can help Leo.",
    "answer": "I can help Leo.",
    "wrong": [
      "i can help Leo."
    ],
    "caseSensitive": true,
    "speak": "Fix the capital letter.",
    "hint": "Check names, places, days and the word I."
  },
  {
    "prompt": "Fix the capital letter.",
    "context": "We see amara.",
    "answer": "We see Amara.",
    "wrong": [
      "We see amara."
    ],
    "caseSensitive": true,
    "speak": "Fix the capital letter.",
    "hint": "Check names, places, days and the word I."
  },
  {
    "prompt": "Fix the capital letter.",
    "context": "biscuit can fetch.",
    "answer": "Biscuit can fetch.",
    "wrong": [
      "biscuit can fetch."
    ],
    "caseSensitive": true,
    "speak": "Fix the capital letter.",
    "hint": "Check names, places, days and the word I."
  }
];
export function buildCapitalLetters(level, rng) {
  return sentenceQuestions(BANK, "Use a capital letter for names, places, days and I.", level, rng);
}
