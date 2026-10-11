import { spellingQuestions } from "./year1Practice.js";

/** Year 1: "The /v/ sound at the end of words · Words ending –y (/i:/ or /ɪ/)".
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
    "answer": "have",
    "pattern": "ve",
    "picture": "🤲",
    "sentence": "I ___ two hands.",
    "prompt": "Spell the missing word.",
    "speak": "have. I have two hands.",
    "wrong": [
      "hav",
      "havee"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "give",
    "pattern": "ve",
    "picture": "🎁",
    "sentence": "I ___ a gift to Leo.",
    "prompt": "Spell the missing word.",
    "speak": "give. I give a gift to Leo.",
    "wrong": [
      "giv",
      "givee"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "live",
    "pattern": "ve",
    "picture": "🏠",
    "sentence": "We ___ in a house.",
    "prompt": "Spell the missing word.",
    "speak": "live. We live in a house.",
    "wrong": [
      "liv",
      "livee"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "love",
    "pattern": "ve",
    "picture": "❤️",
    "sentence": "I ___ my family.",
    "prompt": "Spell the missing word.",
    "speak": "love. I love my family.",
    "wrong": [
      "lov",
      "lovee"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "dove",
    "pattern": "ve",
    "picture": "🕊️",
    "sentence": "A ___ is a white bird.",
    "prompt": "Spell the missing word.",
    "speak": "dove. A dove is a white bird.",
    "wrong": [
      "dov",
      "dovee"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "five",
    "pattern": "ve",
    "picture": "🖐️",
    "sentence": "There are ___ fingers on this hand.",
    "prompt": "Spell the missing word.",
    "speak": "five. There are five fingers on this hand.",
    "wrong": [
      "fiv",
      "fivee"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "hive",
    "pattern": "ve",
    "picture": "🐝",
    "sentence": "Bees live in a ___.",
    "prompt": "Spell the missing word.",
    "speak": "hive. Bees live in a hive.",
    "wrong": [
      "hiv",
      "hivee"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "wave",
    "pattern": "ve",
    "picture": "👋",
    "sentence": "I ___ to say hello.",
    "prompt": "Spell the missing word.",
    "speak": "wave. I wave to say hello.",
    "wrong": [
      "wav",
      "wavee"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "happy",
    "pattern": "y",
    "picture": "😊",
    "sentence": "A big smile shows I am ___.",
    "prompt": "Spell the missing word.",
    "speak": "happy. A big smile shows I am happy.",
    "wrong": [
      "happee",
      "happ"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "funny",
    "pattern": "y",
    "picture": "😂",
    "sentence": "The joke is ___.",
    "prompt": "Spell the missing word.",
    "speak": "funny. The joke is funny.",
    "wrong": [
      "funnee",
      "funn"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "sunny",
    "pattern": "y",
    "picture": "☀️",
    "sentence": "The sky is bright and ___.",
    "prompt": "Spell the missing word.",
    "speak": "sunny. The sky is bright and sunny.",
    "wrong": [
      "sunnee",
      "sunn"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "party",
    "pattern": "y",
    "picture": "🎉",
    "sentence": "We have a birthday ___.",
    "prompt": "Spell the missing word.",
    "speak": "party. We have a birthday party.",
    "wrong": [
      "partee",
      "part"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "family",
    "pattern": "y",
    "picture": "👨‍👩‍👧",
    "sentence": "My ___ lives with me.",
    "prompt": "Spell the missing word.",
    "speak": "family. My family lives with me.",
    "wrong": [
      "familee",
      "famil"
    ],
    "hint": "It has 6 letters. Listen for each part."
  },
  {
    "answer": "very",
    "pattern": "y",
    "picture": "⭐",
    "sentence": "This star is ___ bright.",
    "prompt": "Spell the missing word.",
    "speak": "very. This star is very bright.",
    "wrong": [
      "veree",
      "ver"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "puppy",
    "pattern": "y",
    "picture": "🐶",
    "sentence": "A young dog is a ___.",
    "prompt": "Spell the missing word.",
    "speak": "puppy. A young dog is a puppy.",
    "wrong": [
      "puppee",
      "pupp"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "jelly",
    "pattern": "y",
    "picture": "🍮",
    "sentence": "The ___ wobbles in the bowl.",
    "prompt": "Spell the missing word.",
    "speak": "jelly. The jelly wobbles in the bowl.",
    "wrong": [
      "jellee",
      "jell"
    ],
    "hint": "It has 5 letters. Listen for each part."
  }
];
export function buildWordsEndingInVeAndY(level, rng) {
  return spellingQuestions(BANK, "The v sound ends in ve. Some words end in y.", level, rng);
}
