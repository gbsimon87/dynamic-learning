import { spellingQuestions } from "./year1Practice.js";

/** Year 1: "oo (/u:/) · oo (/ʊ/) · oa · oe · ou · ow (/aʊ/) · ow (/əʊ/) · ue · ew".
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
    "answer": "moon",
    "pattern": "oo",
    "picture": "🌙",
    "sentence": "The ___ shines at night.",
    "prompt": "Spell the missing word.",
    "speak": "moon. The moon shines at night.",
    "wrong": [
      "moan",
      "moo"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "food",
    "pattern": "oo",
    "picture": "🍽️",
    "sentence": "We eat ___ when we are hungry.",
    "prompt": "Spell the missing word.",
    "speak": "food. We eat food when we are hungry.",
    "wrong": [
      "fude",
      "foo"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "book",
    "pattern": "oo",
    "picture": "📖",
    "sentence": "I read a ___.",
    "prompt": "Spell the missing word.",
    "speak": "book. I read a book.",
    "wrong": [
      "buk",
      "boo"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "foot",
    "pattern": "oo",
    "picture": "🦶",
    "sentence": "A sock covers my ___.",
    "prompt": "Spell the missing word.",
    "speak": "foot. A sock covers my foot.",
    "wrong": [
      "fut",
      "foo"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "boat",
    "pattern": "oa",
    "picture": "⛵",
    "sentence": "The ___ sails on the sea.",
    "prompt": "Spell the missing word.",
    "speak": "boat. The boat sails on the sea.",
    "wrong": [
      "bote",
      "boa"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "coat",
    "pattern": "oa",
    "picture": "🧥",
    "sentence": "I wear a ___ in the cold.",
    "prompt": "Spell the missing word.",
    "speak": "coat. I wear a coat in the cold.",
    "wrong": [
      "cote",
      "coa"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "toe",
    "pattern": "oe",
    "picture": "🦶",
    "sentence": "My smallest ___ is on my foot.",
    "prompt": "Spell the missing word.",
    "speak": "toe. My smallest toe is on my foot.",
    "wrong": [
      "tow",
      "to"
    ],
    "hint": "It has 3 letters. Listen for each part."
  },
  {
    "answer": "goes",
    "pattern": "oe",
    "picture": "🚶",
    "sentence": "Leo ___ to school each day.",
    "prompt": "Spell the missing word.",
    "speak": "goes. Leo goes to school each day.",
    "wrong": [
      "gows",
      "goe"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "out",
    "pattern": "ou",
    "picture": "🚪",
    "sentence": "We go ___ through the door.",
    "prompt": "Spell the missing word.",
    "speak": "out. We go out through the door.",
    "wrong": [
      "owt",
      "ou"
    ],
    "hint": "It has 3 letters. Listen for each part."
  },
  {
    "answer": "mouth",
    "pattern": "ou",
    "picture": "👄",
    "sentence": "I open my ___ to eat.",
    "prompt": "Spell the missing word.",
    "speak": "mouth. I open my mouth to eat.",
    "wrong": [
      "mowth",
      "mout"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "cow",
    "pattern": "ow",
    "picture": "🐄",
    "sentence": "The ___ gives us milk.",
    "prompt": "Spell the missing word.",
    "speak": "cow. The cow gives us milk.",
    "wrong": [
      "cou",
      "co"
    ],
    "hint": "It has 3 letters. Listen for each part."
  },
  {
    "answer": "snow",
    "pattern": "ow",
    "picture": "❄️",
    "sentence": "The ___ is cold and white.",
    "prompt": "Spell the missing word.",
    "speak": "snow. The snow is cold and white.",
    "wrong": [
      "snoa",
      "sno"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "blue",
    "pattern": "ue",
    "picture": "🔵",
    "sentence": "The sky is ___.",
    "prompt": "Spell the missing word.",
    "speak": "blue. The sky is blue.",
    "wrong": [
      "bloo",
      "blu"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "clue",
    "pattern": "ue",
    "picture": "🔍",
    "sentence": "A ___ helps solve the puzzle.",
    "prompt": "Spell the missing word.",
    "speak": "clue. A clue helps solve the puzzle.",
    "wrong": [
      "cloo",
      "clu"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "new",
    "pattern": "ew",
    "picture": "🎁",
    "sentence": "My present is a ___ toy.",
    "prompt": "Spell the missing word.",
    "speak": "new. My present is a new toy.",
    "wrong": [
      "noo",
      "ne"
    ],
    "hint": "It has 3 letters. Listen for each part."
  },
  {
    "answer": "flew",
    "pattern": "ew",
    "picture": "🦅",
    "sentence": "The bird ___ above the tree.",
    "prompt": "Spell the missing word.",
    "speak": "flew. The bird flew above the tree.",
    "wrong": [
      "floo",
      "fle"
    ],
    "hint": "It has 4 letters. Listen for each part."
  }
];
export function buildTheSpellingsOoOaOwAndEw(level, rng) {
  return spellingQuestions(BANK, "Look for oo, oa, oe, ou, ow, ue or ew.", level, rng);
}
