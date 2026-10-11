import { spellingQuestions } from "./year1Practice.js";

/** Year 1: "The /ŋ/ sound spelt n before k · -tch".
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
    "answer": "bank",
    "pattern": "nk",
    "picture": "🏦",
    "sentence": "We save coins at the ___.",
    "prompt": "Spell the missing word.",
    "speak": "bank. We save coins at the bank.",
    "wrong": [
      "banck",
      "ban"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "pink",
    "pattern": "nk",
    "picture": "🩷",
    "sentence": "Mix red and white to make ___.",
    "prompt": "Spell the missing word.",
    "speak": "pink. Mix red and white to make pink.",
    "wrong": [
      "pinck",
      "pin"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "sink",
    "pattern": "nk",
    "picture": "🚰",
    "sentence": "Wash your hands in the ___.",
    "prompt": "Spell the missing word.",
    "speak": "sink. Wash your hands in the sink.",
    "wrong": [
      "sinck",
      "sin"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "wink",
    "pattern": "nk",
    "picture": "😉",
    "sentence": "Shut one eye to ___.",
    "prompt": "Spell the missing word.",
    "speak": "wink. Shut one eye to wink.",
    "wrong": [
      "winck",
      "win"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "honk",
    "pattern": "nk",
    "picture": "🚗",
    "sentence": "The car horn goes ___.",
    "prompt": "Spell the missing word.",
    "speak": "honk. The car horn goes honk.",
    "wrong": [
      "honck",
      "hon"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "sunk",
    "pattern": "nk",
    "picture": "⛵",
    "sentence": "The boat has ___ below the water.",
    "prompt": "Spell the missing word.",
    "speak": "sunk. The boat has sunk below the water.",
    "wrong": [
      "sunck",
      "sun"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "think",
    "pattern": "nk",
    "picture": "💭",
    "sentence": "Stop and ___ before you answer.",
    "prompt": "Spell the missing word.",
    "speak": "think. Stop and think before you answer.",
    "wrong": [
      "thinck",
      "thin"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "drink",
    "pattern": "nk",
    "picture": "🥛",
    "sentence": "Each day I ___ milk.",
    "prompt": "Spell the missing word.",
    "speak": "drink. Each day I drink milk.",
    "wrong": [
      "drinck",
      "drin"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "catch",
    "pattern": "tch",
    "picture": "⚾",
    "sentence": "Can you ___ the ball?",
    "prompt": "Spell the missing word.",
    "speak": "catch. Can you catch the ball?",
    "wrong": [
      "cach",
      "catc"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "fetch",
    "pattern": "tch",
    "picture": "🐕",
    "sentence": "Biscuit can ___ the ball.",
    "prompt": "Spell the missing word.",
    "speak": "fetch. Biscuit can fetch the ball.",
    "wrong": [
      "fech",
      "fetc"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "match",
    "pattern": "tch",
    "picture": "⚽",
    "sentence": "We play a football ___.",
    "prompt": "Spell the missing word.",
    "speak": "match. We play a football match.",
    "wrong": [
      "mach",
      "matc"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "pitch",
    "pattern": "tch",
    "picture": "⚽",
    "sentence": "We play on the football ___.",
    "prompt": "Spell the missing word.",
    "speak": "pitch. We play on the football pitch.",
    "wrong": [
      "pich",
      "pitc"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "hutch",
    "pattern": "tch",
    "picture": "🐇",
    "sentence": "The rabbit sleeps in a ___.",
    "prompt": "Spell the missing word.",
    "speak": "hutch. The rabbit sleeps in a hutch.",
    "wrong": [
      "huch",
      "hutc"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "notch",
    "pattern": "tch",
    "picture": "🪵",
    "sentence": "A ___ is a small cut in wood.",
    "prompt": "Spell the missing word.",
    "speak": "notch. A notch is a small cut in wood.",
    "wrong": [
      "noch",
      "notc"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "kitchen",
    "pattern": "tch",
    "picture": "🍳",
    "sentence": "We cook in the ___.",
    "prompt": "Spell the missing word.",
    "speak": "kitchen. We cook in the kitchen.",
    "wrong": [
      "kichen",
      "kitche"
    ],
    "hint": "It has 7 letters. Listen for each part."
  },
  {
    "answer": "witch",
    "pattern": "tch",
    "picture": "🧙‍♀️",
    "sentence": "The ___ has a magic broom.",
    "prompt": "Spell the missing word.",
    "speak": "witch. The witch has a magic broom.",
    "wrong": [
      "wich",
      "witc"
    ],
    "hint": "It has 5 letters. Listen for each part."
  }
];
export function buildTheSoundsNkAndTch(level, rng) {
  return spellingQuestions(BANK, "Look for nk or tch in these words.", level, rng);
}
