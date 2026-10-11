import { spellingQuestions } from "./year1Practice.js";

/** Year 1: "ai, oi · ay, oy".
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
    "answer": "rain",
    "pattern": "ai",
    "picture": "🌧️",
    "sentence": "The ___ falls from clouds.",
    "prompt": "Spell the missing word.",
    "speak": "rain. The rain falls from clouds.",
    "wrong": [
      "rane",
      "rai"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "train",
    "pattern": "ai",
    "picture": "🚂",
    "sentence": "We ride on a ___.",
    "prompt": "Spell the missing word.",
    "speak": "train. We ride on a train.",
    "wrong": [
      "trane",
      "trai"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "snail",
    "pattern": "ai",
    "picture": "🐌",
    "sentence": "A ___ carries its shell.",
    "prompt": "Spell the missing word.",
    "speak": "snail. A snail carries its shell.",
    "wrong": [
      "snale",
      "snai"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "tail",
    "pattern": "ai",
    "picture": "🐕",
    "sentence": "Biscuit wags his ___.",
    "prompt": "Spell the missing word.",
    "speak": "tail. Biscuit wags his tail.",
    "wrong": [
      "tale",
      "tai"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "wait",
    "pattern": "ai",
    "picture": "🛑",
    "sentence": "Please ___ until it is your turn.",
    "prompt": "Spell the missing word.",
    "speak": "wait. Please wait until it is your turn.",
    "wrong": [
      "wate",
      "wai"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "day",
    "pattern": "ay",
    "picture": "☀️",
    "sentence": "We play outside in the ___.",
    "prompt": "Spell the missing word.",
    "speak": "day. We play outside in the day.",
    "wrong": [
      "dai",
      "da"
    ],
    "hint": "It has 3 letters. Listen for each part."
  },
  {
    "answer": "play",
    "pattern": "ay",
    "picture": "🛝",
    "sentence": "We ___ at the park.",
    "prompt": "Spell the missing word.",
    "speak": "play. We play at the park.",
    "wrong": [
      "plai",
      "pla"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "say",
    "pattern": "ay",
    "picture": "💬",
    "sentence": "I ___ hello to Amara.",
    "prompt": "Spell the missing word.",
    "speak": "say. I say hello to Amara.",
    "wrong": [
      "sai",
      "sa"
    ],
    "hint": "It has 3 letters. Listen for each part."
  },
  {
    "answer": "stay",
    "pattern": "ay",
    "picture": "🏠",
    "sentence": "Please ___ here with me.",
    "prompt": "Spell the missing word.",
    "speak": "stay. Please stay here with me.",
    "wrong": [
      "stai",
      "sta"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "tray",
    "pattern": "ay",
    "picture": "🍽️",
    "sentence": "Put the cups on the ___.",
    "prompt": "Spell the missing word.",
    "speak": "tray. Put the cups on the tray.",
    "wrong": [
      "trai",
      "tra"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "coin",
    "pattern": "oi",
    "picture": "🪙",
    "sentence": "I put a ___ in my purse.",
    "prompt": "Spell the missing word.",
    "speak": "coin. I put a coin in my purse.",
    "wrong": [
      "coyn",
      "coi"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "soil",
    "pattern": "oi",
    "picture": "🪴",
    "sentence": "The seed grows in the ___.",
    "prompt": "Spell the missing word.",
    "speak": "soil. The seed grows in the soil.",
    "wrong": [
      "soyl",
      "soi"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "join",
    "pattern": "oi",
    "picture": "🧩",
    "sentence": "We ___ the two parts.",
    "prompt": "Spell the missing word.",
    "speak": "join. We join the two parts.",
    "wrong": [
      "joyn",
      "joi"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "boy",
    "pattern": "oy",
    "picture": "👦",
    "sentence": "Leo is a ___.",
    "prompt": "Spell the missing word.",
    "speak": "boy. Leo is a boy.",
    "wrong": [
      "boi",
      "bo"
    ],
    "hint": "It has 3 letters. Listen for each part."
  },
  {
    "answer": "toy",
    "pattern": "oy",
    "picture": "🧸",
    "sentence": "The bear is my ___.",
    "prompt": "Spell the missing word.",
    "speak": "toy. The bear is my toy.",
    "wrong": [
      "toi",
      "to"
    ],
    "hint": "It has 3 letters. Listen for each part."
  },
  {
    "answer": "enjoy",
    "pattern": "oy",
    "picture": "😊",
    "sentence": "We ___ the game.",
    "prompt": "Spell the missing word.",
    "speak": "enjoy. We enjoy the game.",
    "wrong": [
      "enjoi",
      "enjo"
    ],
    "hint": "It has 5 letters. Listen for each part."
  }
];
export function buildTheSpellingsAiAyOiAndOy(level, rng) {
  return spellingQuestions(BANK, "Look for ai or oi inside words, and ay or oy at the end.", level, rng);
}
