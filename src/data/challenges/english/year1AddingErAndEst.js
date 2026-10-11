import { spellingQuestions } from "./year1Practice.js";

/** Year 1: "Adding –er and –est to adjectives where no change is needed to the root word".
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
    "answer": "quicker",
    "root": "quick",
    "ending": "er",
    "pattern": "er",
    "prompt": "Add er to quick. Spell the new word.",
    "sentence": "This is ___ than that.",
    "speak": "quicker. Add er to quick. Spell the new word.",
    "wrong": [
      "quick",
      "quicke"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "quickest",
    "root": "quick",
    "ending": "est",
    "pattern": "est",
    "prompt": "Add est to quick. Spell the new word.",
    "sentence": "This is the ___ of all.",
    "speak": "quickest. Add est to quick. Spell the new word.",
    "wrong": [
      "quick",
      "quickes"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "fresher",
    "root": "fresh",
    "ending": "er",
    "pattern": "er",
    "prompt": "Add er to fresh. Spell the new word.",
    "sentence": "This is ___ than that.",
    "speak": "fresher. Add er to fresh. Spell the new word.",
    "wrong": [
      "fresh",
      "freshe"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "freshest",
    "root": "fresh",
    "ending": "est",
    "pattern": "est",
    "prompt": "Add est to fresh. Spell the new word.",
    "sentence": "This is the ___ of all.",
    "speak": "freshest. Add est to fresh. Spell the new word.",
    "wrong": [
      "fresh",
      "freshes"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "grander",
    "root": "grand",
    "ending": "er",
    "pattern": "er",
    "prompt": "Add er to grand. Spell the new word.",
    "sentence": "This is ___ than that.",
    "speak": "grander. Add er to grand. Spell the new word.",
    "wrong": [
      "grand",
      "grande"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "grandest",
    "root": "grand",
    "ending": "est",
    "pattern": "est",
    "prompt": "Add est to grand. Spell the new word.",
    "sentence": "This is the ___ of all.",
    "speak": "grandest. Add est to grand. Spell the new word.",
    "wrong": [
      "grand",
      "grandes"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "longer",
    "root": "long",
    "ending": "er",
    "pattern": "er",
    "prompt": "Add er to long. Spell the new word.",
    "sentence": "This is ___ than that.",
    "speak": "longer. Add er to long. Spell the new word.",
    "wrong": [
      "long",
      "longe"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "longest",
    "root": "long",
    "ending": "est",
    "pattern": "est",
    "prompt": "Add est to long. Spell the new word.",
    "sentence": "This is the ___ of all.",
    "speak": "longest. Add est to long. Spell the new word.",
    "wrong": [
      "long",
      "longes"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "shorter",
    "root": "short",
    "ending": "er",
    "pattern": "er",
    "prompt": "Add er to short. Spell the new word.",
    "sentence": "This is ___ than that.",
    "speak": "shorter. Add er to short. Spell the new word.",
    "wrong": [
      "short",
      "shorte"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "shortest",
    "root": "short",
    "ending": "est",
    "pattern": "est",
    "prompt": "Add est to short. Spell the new word.",
    "sentence": "This is the ___ of all.",
    "speak": "shortest. Add est to short. Spell the new word.",
    "wrong": [
      "short",
      "shortes"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "brighter",
    "root": "bright",
    "ending": "er",
    "pattern": "er",
    "prompt": "Add er to bright. Spell the new word.",
    "sentence": "This is ___ than that.",
    "speak": "brighter. Add er to bright. Spell the new word.",
    "wrong": [
      "bright",
      "brighte"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "brightest",
    "root": "bright",
    "ending": "est",
    "pattern": "est",
    "prompt": "Add est to bright. Spell the new word.",
    "sentence": "This is the ___ of all.",
    "speak": "brightest. Add est to bright. Spell the new word.",
    "wrong": [
      "bright",
      "brightes"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "smaller",
    "root": "small",
    "ending": "er",
    "pattern": "er",
    "prompt": "Add er to small. Spell the new word.",
    "sentence": "This is ___ than that.",
    "speak": "smaller. Add er to small. Spell the new word.",
    "wrong": [
      "small",
      "smalle"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "smallest",
    "root": "small",
    "ending": "est",
    "pattern": "est",
    "prompt": "Add est to small. Spell the new word.",
    "sentence": "This is the ___ of all.",
    "speak": "smallest. Add est to small. Spell the new word.",
    "wrong": [
      "small",
      "smalles"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "taller",
    "root": "tall",
    "ending": "er",
    "pattern": "er",
    "prompt": "Add er to tall. Spell the new word.",
    "sentence": "This is ___ than that.",
    "speak": "taller. Add er to tall. Spell the new word.",
    "wrong": [
      "tall",
      "talle"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "tallest",
    "root": "tall",
    "ending": "est",
    "pattern": "est",
    "prompt": "Add est to tall. Spell the new word.",
    "sentence": "This is the ___ of all.",
    "speak": "tallest. Add est to tall. Spell the new word.",
    "wrong": [
      "tall",
      "talles"
    ],
    "hint": "Keep all the letters of the starting word."
  }
];
export function buildAddingErAndEst(level, rng) {
  return spellingQuestions(BANK, "Keep the starting word. Add er or est.", level, rng);
}
