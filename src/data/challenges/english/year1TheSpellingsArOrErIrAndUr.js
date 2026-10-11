import { spellingQuestions } from "./year1Practice.js";

/** Year 1: "ar · er (/ɜ:/) · er (/ə/) · ir · ur · or · ore · aw · au".
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
    "answer": "car",
    "pattern": "ar",
    "picture": "🚗",
    "sentence": "We travel in a ___.",
    "prompt": "Spell the missing word.",
    "speak": "car. We travel in a car.",
    "wrong": [
      "ca",
      "carr"
    ],
    "hint": "It has 3 letters. Listen for each part."
  },
  {
    "answer": "park",
    "pattern": "ar",
    "picture": "🛝",
    "sentence": "We play at the ___.",
    "prompt": "Spell the missing word.",
    "speak": "park. We play at the park.",
    "wrong": [
      "parc",
      "par"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "arm",
    "pattern": "ar",
    "picture": "💪",
    "sentence": "I lift my ___ to wave.",
    "prompt": "Spell the missing word.",
    "speak": "arm. I lift my arm to wave.",
    "wrong": [
      "am",
      "ar"
    ],
    "hint": "It has 3 letters. Listen for each part."
  },
  {
    "answer": "horse",
    "pattern": "or",
    "picture": "🐴",
    "sentence": "I ride a ___.",
    "prompt": "Spell the missing word.",
    "speak": "horse. I ride a horse.",
    "wrong": [
      "haws",
      "hors"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "short",
    "pattern": "or",
    "picture": "📏",
    "sentence": "This little stick is ___.",
    "prompt": "Spell the missing word.",
    "speak": "short. This little stick is short.",
    "wrong": [
      "shawt",
      "shor"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "shore",
    "pattern": "ore",
    "picture": "🏖️",
    "sentence": "Waves wash onto the ___.",
    "prompt": "Spell the missing word.",
    "speak": "shore. Waves wash onto the shore.",
    "wrong": [
      "shaw",
      "shor"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "saw",
    "pattern": "aw",
    "picture": "🪚",
    "sentence": "We cut wood with a ___.",
    "prompt": "Spell the missing word.",
    "speak": "saw. We cut wood with a saw.",
    "wrong": [
      "sor",
      "sa"
    ],
    "hint": "It has 3 letters. Listen for each part."
  },
  {
    "answer": "yawn",
    "pattern": "aw",
    "picture": "🥱",
    "sentence": "I ___ when I feel tired.",
    "prompt": "Spell the missing word.",
    "speak": "yawn. I yawn when I feel tired.",
    "wrong": [
      "yorn",
      "yaw"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "August",
    "pattern": "au",
    "picture": "📅",
    "sentence": "July is followed by ___.",
    "prompt": "Spell the missing word.",
    "speak": "August. July is followed by August.",
    "wrong": [
      "Awgust",
      "Augus"
    ],
    "hint": "It has 6 letters. Listen for each part."
  },
  {
    "answer": "her",
    "pattern": "er",
    "picture": "👧",
    "sentence": "Amara has ___ own bag.",
    "prompt": "Spell the missing word.",
    "speak": "her. Amara has her own bag.",
    "wrong": [
      "hur",
      "he"
    ],
    "hint": "It has 3 letters. Listen for each part."
  },
  {
    "answer": "under",
    "pattern": "er",
    "picture": "⬇️",
    "sentence": "The ball is ___ the chair.",
    "prompt": "Spell the missing word.",
    "speak": "under. The ball is under the chair.",
    "wrong": [
      "unda",
      "unde"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "sister",
    "pattern": "er",
    "picture": "👧",
    "sentence": "My ___ is my parents’ daughter.",
    "prompt": "Spell the missing word.",
    "speak": "sister. My sister is my parents’ daughter.",
    "wrong": [
      "sista",
      "siste"
    ],
    "hint": "It has 6 letters. Listen for each part."
  },
  {
    "answer": "bird",
    "pattern": "ir",
    "picture": "🐦",
    "sentence": "A ___ has feathers.",
    "prompt": "Spell the missing word.",
    "speak": "bird. A bird has feathers.",
    "wrong": [
      "burd",
      "bir"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "shirt",
    "pattern": "ir",
    "picture": "👕",
    "sentence": "I wear a ___.",
    "prompt": "Spell the missing word.",
    "speak": "shirt. I wear a shirt.",
    "wrong": [
      "shurt",
      "shir"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "church",
    "pattern": "ur",
    "picture": "⛪",
    "sentence": "The ___ has a tall bell tower.",
    "prompt": "Spell the missing word.",
    "speak": "church. The church has a tall bell tower.",
    "wrong": [
      "chirch",
      "churc"
    ],
    "hint": "It has 6 letters. Listen for each part."
  },
  {
    "answer": "turn",
    "pattern": "ur",
    "picture": "↪️",
    "sentence": "We ___ left at the corner.",
    "prompt": "Spell the missing word.",
    "speak": "turn. We turn left at the corner.",
    "wrong": [
      "tern",
      "tur"
    ],
    "hint": "It has 4 letters. Listen for each part."
  }
];
export function buildTheSpellingsArOrErIrAndUr(level, rng) {
  return spellingQuestions(BANK, "Look for ar, or, ore, aw, au, er, ir or ur.", level, rng);
}
