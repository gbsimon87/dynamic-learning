import { spellingQuestions } from "./year1Practice.js";

/** Year 1: "air · ear · ear (/ɛə/) · are (/ɛə/)".
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
    "answer": "chair",
    "pattern": "air",
    "picture": "🪑",
    "sentence": "Sit on a ___.",
    "prompt": "Spell the missing word.",
    "speak": "chair. Sit on a chair.",
    "wrong": [
      "chare",
      "chai"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "hair",
    "pattern": "air",
    "picture": "💇",
    "sentence": "I brush my ___.",
    "prompt": "Spell the missing word.",
    "speak": "hair. I brush my hair.",
    "wrong": [
      "hare",
      "hai"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "pair",
    "pattern": "air",
    "picture": "🧦",
    "sentence": "Two socks make a ___.",
    "prompt": "Spell the missing word.",
    "speak": "pair. Two socks make a pair.",
    "wrong": [
      "pare",
      "pai"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "air",
    "pattern": "air",
    "picture": "💨",
    "sentence": "We breathe ___.",
    "prompt": "Spell the missing word.",
    "speak": "air. We breathe air.",
    "wrong": [
      "are",
      "ai"
    ],
    "hint": "It has 3 letters. Listen for each part."
  },
  {
    "answer": "fair",
    "pattern": "air",
    "picture": "⚖️",
    "sentence": "Taking turns is ___.",
    "prompt": "Spell the missing word.",
    "speak": "fair. Taking turns is fair.",
    "wrong": [
      "fare",
      "fai"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "stair",
    "pattern": "air",
    "picture": "🪜",
    "sentence": "Step up onto the ___.",
    "prompt": "Spell the missing word.",
    "speak": "stair. Step up onto the stair.",
    "wrong": [
      "stare",
      "stai"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "ear",
    "pattern": "ear",
    "picture": "👂",
    "sentence": "I hear with my ___.",
    "prompt": "Spell the missing word.",
    "speak": "ear. I hear with my ear.",
    "wrong": [
      "eer",
      "ea"
    ],
    "hint": "It has 3 letters. Listen for each part."
  },
  {
    "answer": "hear",
    "pattern": "ear",
    "picture": "👂",
    "sentence": "I ___ the bell ring.",
    "prompt": "Spell the missing word.",
    "speak": "hear. I hear the bell ring.",
    "wrong": [
      "heer",
      "hea"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "near",
    "pattern": "ear",
    "picture": "📍",
    "sentence": "Come ___ so we can talk.",
    "prompt": "Spell the missing word.",
    "speak": "near. Come near so we can talk.",
    "wrong": [
      "neer",
      "nea"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "beard",
    "pattern": "ear",
    "picture": "🧔",
    "sentence": "Hair on a chin is a ___.",
    "prompt": "Spell the missing word.",
    "speak": "beard. Hair on a chin is a beard.",
    "wrong": [
      "beerd",
      "bear"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "bear",
    "pattern": "ear",
    "picture": "🐻",
    "sentence": "The ___ has thick fur.",
    "prompt": "Spell the missing word.",
    "speak": "bear. The bear has thick fur.",
    "wrong": [
      "bair",
      "bea"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "pear",
    "pattern": "ear",
    "picture": "🍐",
    "sentence": "I eat a juicy ___.",
    "prompt": "Spell the missing word.",
    "speak": "pear. I eat a juicy pear.",
    "wrong": [
      "pair",
      "pea"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "wear",
    "pattern": "ear",
    "picture": "👕",
    "sentence": "I ___ a shirt.",
    "prompt": "Spell the missing word.",
    "speak": "wear. I wear a shirt.",
    "wrong": [
      "wair",
      "wea"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "care",
    "pattern": "are",
    "picture": "❤️",
    "sentence": "We ___ for our pets.",
    "prompt": "Spell the missing word.",
    "speak": "care. We care for our pets.",
    "wrong": [
      "cair",
      "car"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "share",
    "pattern": "are",
    "picture": "🤝",
    "sentence": "We ___ the toys with our friends.",
    "prompt": "Spell the missing word.",
    "speak": "share. We share the toys with our friends.",
    "wrong": [
      "shair",
      "shar"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "scared",
    "pattern": "are",
    "picture": "😨",
    "sentence": "A loud bang made me feel ___.",
    "prompt": "Spell the missing word.",
    "speak": "scared. A loud bang made me feel scared.",
    "wrong": [
      "scaird",
      "scare"
    ],
    "hint": "It has 6 letters. Listen for each part."
  }
];
export function buildTheSpellingsAirEarAndAre(level, rng) {
  return spellingQuestions(BANK, "air, ear and are can share a sound. ear can sound different.", level, rng);
}
