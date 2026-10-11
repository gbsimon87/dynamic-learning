import { spellingQuestions } from "./year1Practice.js";

/** Year 1: "ee · ea (/i:/) · ea (/ɛ/) · ie (/aɪ/) · ie (/i:/) · igh".
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
    "answer": "tree",
    "pattern": "ee",
    "picture": "🌳",
    "sentence": "A ___ has a trunk and branches.",
    "prompt": "Spell the missing word.",
    "speak": "tree. A tree has a trunk and branches.",
    "wrong": [
      "trea",
      "tre"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "green",
    "pattern": "ee",
    "picture": "🟢",
    "sentence": "The grass is ___.",
    "prompt": "Spell the missing word.",
    "speak": "green. The grass is green.",
    "wrong": [
      "grean",
      "gree"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "feet",
    "pattern": "ee",
    "picture": "🦶",
    "sentence": "My ___ fit in my shoes.",
    "prompt": "Spell the missing word.",
    "speak": "feet. My feet fit in my shoes.",
    "wrong": [
      "feat",
      "fee"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "sea",
    "pattern": "ea",
    "picture": "🌊",
    "sentence": "The ___ is full of salt water.",
    "prompt": "Spell the missing word.",
    "speak": "sea. The sea is full of salt water.",
    "wrong": [
      "see",
      "se"
    ],
    "hint": "It has 3 letters. Listen for each part."
  },
  {
    "answer": "meat",
    "pattern": "ea",
    "picture": "🍖",
    "sentence": "We cook the ___ for dinner.",
    "prompt": "Spell the missing word.",
    "speak": "meat. We cook the meat for dinner.",
    "wrong": [
      "meet",
      "mea"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "head",
    "pattern": "ea",
    "picture": "🙂",
    "sentence": "My hat goes on my ___.",
    "prompt": "Spell the missing word.",
    "speak": "head. My hat goes on my head.",
    "wrong": [
      "hed",
      "hea"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "bread",
    "pattern": "ea",
    "picture": "🍞",
    "sentence": "We make toast from ___.",
    "prompt": "Spell the missing word.",
    "speak": "bread. We make toast from bread.",
    "wrong": [
      "bred",
      "brea"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "read",
    "pattern": "ea",
    "picture": "📖",
    "sentence": "Yesterday I ___ this book.",
    "prompt": "Spell the missing word.",
    "speak": "read. Yesterday I read this book.",
    "wrong": [
      "red",
      "rea"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "tie",
    "pattern": "ie",
    "picture": "👔",
    "sentence": "Leo wears a ___ with his shirt.",
    "prompt": "Spell the missing word.",
    "speak": "tie. Leo wears a tie with his shirt.",
    "wrong": [
      "ty",
      "ti"
    ],
    "hint": "It has 3 letters. Listen for each part."
  },
  {
    "answer": "pie",
    "pattern": "ie",
    "picture": "🥧",
    "sentence": "We eat apple ___.",
    "prompt": "Spell the missing word.",
    "speak": "pie. We eat apple pie.",
    "wrong": [
      "pigh",
      "pi"
    ],
    "hint": "It has 3 letters. Listen for each part."
  },
  {
    "answer": "field",
    "pattern": "ie",
    "picture": "🌾",
    "sentence": "The cows graze in the ___.",
    "prompt": "Spell the missing word.",
    "speak": "field. The cows graze in the field.",
    "wrong": [
      "feeld",
      "fiel"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "chief",
    "pattern": "ie",
    "picture": "👑",
    "sentence": "The ___ is the leader.",
    "prompt": "Spell the missing word.",
    "speak": "chief. The chief is the leader.",
    "wrong": [
      "cheef",
      "chie"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "thief",
    "pattern": "ie",
    "picture": "🕵️",
    "sentence": "The ___ stole the bag.",
    "prompt": "Spell the missing word.",
    "speak": "thief. The thief stole the bag.",
    "wrong": [
      "theef",
      "thie"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "night",
    "pattern": "igh",
    "picture": "🌃",
    "sentence": "Stars shine at ___.",
    "prompt": "Spell the missing word.",
    "speak": "night. Stars shine at night.",
    "wrong": [
      "nite",
      "nigh"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "light",
    "pattern": "igh",
    "picture": "💡",
    "sentence": "The lamp gives us ___.",
    "prompt": "Spell the missing word.",
    "speak": "light. The lamp gives us light.",
    "wrong": [
      "lite",
      "ligh"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "high",
    "pattern": "igh",
    "picture": "🪁",
    "sentence": "The kite flies ___ in the sky.",
    "prompt": "Spell the missing word.",
    "speak": "high. The kite flies high in the sky.",
    "wrong": [
      "hie",
      "hig"
    ],
    "hint": "It has 4 letters. Listen for each part."
  }
];
export function buildTheSpellingsEeEaIeAndIgh(level, rng) {
  return spellingQuestions(BANK, "Look for ee, ea, ie or igh. Some letters have different sounds.", level, rng);
}
