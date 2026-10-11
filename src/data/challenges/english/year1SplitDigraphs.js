import { spellingQuestions } from "./year1Practice.js";

/** Year 1: "a–e · e–e · i–e · o–e · u–e".
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
    "answer": "cake",
    "pattern": "a",
    "picture": "🎂",
    "sentence": "We eat a slice of ___.",
    "prompt": "Spell the missing word.",
    "speak": "cake. We eat a slice of cake.",
    "wrong": [
      "caik",
      "cak"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "safe",
    "pattern": "a",
    "picture": "🦺",
    "sentence": "The helmet keeps me ___.",
    "prompt": "Spell the missing word.",
    "speak": "safe. The helmet keeps me safe.",
    "wrong": [
      "saif",
      "saf"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "made",
    "pattern": "a",
    "picture": "🧱",
    "sentence": "Leo ___ a tower from blocks.",
    "prompt": "Spell the missing word.",
    "speak": "made. Leo made a tower from blocks.",
    "wrong": [
      "maid",
      "mad"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "these",
    "pattern": "e",
    "picture": "👉",
    "sentence": "Pick up ___ two books.",
    "prompt": "Spell the missing word.",
    "speak": "these. Pick up these two books.",
    "wrong": [
      "thees",
      "thes"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "theme",
    "pattern": "e",
    "picture": "🎉",
    "sentence": "The party has a pirate ___.",
    "prompt": "Spell the missing word.",
    "speak": "theme. The party has a pirate theme.",
    "wrong": [
      "theem",
      "them"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "complete",
    "pattern": "e",
    "picture": "✅",
    "sentence": "The puzzle is ___ with every piece.",
    "prompt": "Spell the missing word.",
    "speak": "complete. The puzzle is complete with every piece.",
    "wrong": [
      "compleet",
      "complet"
    ],
    "hint": "It has 8 letters. Listen for each part."
  },
  {
    "answer": "five",
    "pattern": "i",
    "picture": "🖐️",
    "sentence": "This hand has ___ fingers.",
    "prompt": "Spell the missing word.",
    "speak": "five. This hand has five fingers.",
    "wrong": [
      "fiev",
      "fiv"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "ride",
    "pattern": "i",
    "picture": "🚲",
    "sentence": "We ___ our bikes.",
    "prompt": "Spell the missing word.",
    "speak": "ride. We ride our bikes.",
    "wrong": [
      "ried",
      "rid"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "time",
    "pattern": "i",
    "picture": "⏰",
    "sentence": "The clock tells the ___.",
    "prompt": "Spell the missing word.",
    "speak": "time. The clock tells the time.",
    "wrong": [
      "tiem",
      "tim"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "home",
    "pattern": "o",
    "picture": "🏠",
    "sentence": "We go ___ after school.",
    "prompt": "Spell the missing word.",
    "speak": "home. We go home after school.",
    "wrong": [
      "hoam",
      "hom"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "hole",
    "pattern": "o",
    "picture": "🕳️",
    "sentence": "The rabbit digs a ___.",
    "prompt": "Spell the missing word.",
    "speak": "hole. The rabbit digs a hole.",
    "wrong": [
      "hoal",
      "hol"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "rope",
    "pattern": "o",
    "picture": "🪢",
    "sentence": "We skip with a ___.",
    "prompt": "Spell the missing word.",
    "speak": "rope. We skip with a rope.",
    "wrong": [
      "roap",
      "rop"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "June",
    "pattern": "u",
    "picture": "📅",
    "sentence": "May is followed by ___.",
    "prompt": "Spell the missing word.",
    "speak": "June. May is followed by June.",
    "wrong": [
      "Joon",
      "Jun"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "tube",
    "pattern": "u",
    "picture": "🧴",
    "sentence": "Squeeze paste from the ___.",
    "prompt": "Spell the missing word.",
    "speak": "tube. Squeeze paste from the tube.",
    "wrong": [
      "toob",
      "tub"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "flute",
    "pattern": "u",
    "picture": "🪈",
    "sentence": "Blow into the ___ to make music.",
    "prompt": "Spell the missing word.",
    "speak": "flute. Blow into the flute to make music.",
    "wrong": [
      "floot",
      "flut"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "cube",
    "pattern": "u",
    "picture": "🧊",
    "sentence": "The ice is shaped like a ___.",
    "prompt": "Spell the missing word.",
    "speak": "cube. The ice is shaped like a cube.",
    "wrong": [
      "coob",
      "cub"
    ],
    "hint": "It has 4 letters. Listen for each part."
  }
];
export function buildSplitDigraphs(level, rng) {
  return spellingQuestions(BANK, "Two letters are split by another letter, like a-e in cake.", level, rng);
}
