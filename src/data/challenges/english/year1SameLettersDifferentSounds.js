import { wordReadingQuestions } from "./year1Practice.js";

/** Year 1: "respond speedily with the correct sound to graphemes (letters or groups of letters) for all 40+ phonemes, including, where applicable, alternative sounds for graphemes".
 * Source: docs/curriculum/year-1-english.md and english-appendix-1-year-1.md.
 * 1 supported choice; 2 independent choice; 3 whole-structure work; 4 applied building/spelling.
 */
export const TITLES = [
  "Read and choose.",
  "Find the sound.",
  "Match the sound.",
  "Build the sound clue."
];
export const BANK = [
  {
    "sound": true,
    "word": "sea",
    "soundGroup": "ee",
    "soundLabel": "ee as in tree",
    "meaning": "sounds like tree",
    "wrong": [
      "sounds like head",
      "sounds like pie"
    ],
    "parts": [
      "s",
      "ea"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "sound": true,
    "word": "head",
    "soundGroup": "e",
    "soundLabel": "e as in bed",
    "meaning": "sounds like bed",
    "wrong": [
      "sounds like tree",
      "sounds like night"
    ],
    "parts": [
      "h",
      "ea",
      "d"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "sound": true,
    "word": "meat",
    "soundGroup": "ee",
    "soundLabel": "ee as in tree",
    "meaning": "sounds like feet",
    "wrong": [
      "sounds like bread",
      "sounds like tie"
    ],
    "parts": [
      "m",
      "ea",
      "t"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "sound": true,
    "word": "bread",
    "soundGroup": "e",
    "soundLabel": "e as in bed",
    "meaning": "sounds like red",
    "wrong": [
      "sounds like green",
      "sounds like high"
    ],
    "parts": [
      "b",
      "r",
      "ea",
      "d"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "sound": true,
    "word": "pie",
    "soundGroup": "eye",
    "soundLabel": "eye as in pie",
    "meaning": "sounds like sky",
    "wrong": [
      "sounds like chief",
      "sounds like head"
    ],
    "parts": [
      "p",
      "ie"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "sound": true,
    "word": "field",
    "soundGroup": "ee",
    "soundLabel": "ee as in tree",
    "meaning": "has the ee sound in tree",
    "wrong": [
      "has the eye sound in pie",
      "has the e sound in bed"
    ],
    "parts": [
      "f",
      "ie",
      "l",
      "d"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "sound": true,
    "word": "chief",
    "soundGroup": "ee",
    "soundLabel": "ee as in tree",
    "meaning": "has the ee sound in tree",
    "wrong": [
      "has the eye sound in tie",
      "has the o sound in dog"
    ],
    "parts": [
      "ch",
      "ie",
      "f"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "sound": true,
    "word": "thief",
    "soundGroup": "ee",
    "soundLabel": "ee as in tree",
    "meaning": "has the ee sound in tree",
    "wrong": [
      "has the eye sound in pie",
      "has the a sound in cat"
    ],
    "parts": [
      "th",
      "ie",
      "f"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "sound": true,
    "word": "moon",
    "soundGroup": "long-oo",
    "soundLabel": "oo as in food",
    "meaning": "has the oo sound in food",
    "wrong": [
      "has the oo sound in foot",
      "has the o sound in dog"
    ],
    "parts": [
      "m",
      "oo",
      "n"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "sound": true,
    "word": "book",
    "soundGroup": "short-oo",
    "soundLabel": "oo as in foot",
    "meaning": "has the oo sound in foot",
    "wrong": [
      "has the oo sound in moon",
      "has the o sound in dog"
    ],
    "parts": [
      "b",
      "oo",
      "k"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "sound": true,
    "word": "wood",
    "soundGroup": "short-oo",
    "soundLabel": "oo as in foot",
    "meaning": "sounds like good",
    "wrong": [
      "sounds like food",
      "sounds like snow"
    ],
    "parts": [
      "w",
      "oo",
      "d"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "sound": true,
    "word": "pool",
    "soundGroup": "long-oo",
    "soundLabel": "oo as in food",
    "meaning": "sounds like school",
    "wrong": [
      "sounds like foot",
      "sounds like cow"
    ],
    "parts": [
      "p",
      "oo",
      "l"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "sound": true,
    "word": "cow",
    "soundGroup": "ow",
    "soundLabel": "ow as in cow",
    "meaning": "sounds like now",
    "wrong": [
      "sounds like snow",
      "sounds like food"
    ],
    "parts": [
      "c",
      "ow"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "sound": true,
    "word": "snow",
    "soundGroup": "oa",
    "soundLabel": "oa as in boat",
    "meaning": "sounds like grow",
    "wrong": [
      "sounds like cow",
      "sounds like good"
    ],
    "parts": [
      "s",
      "n",
      "ow"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "sound": true,
    "word": "bear",
    "soundGroup": "air",
    "soundLabel": "air as in chair",
    "meaning": "sounds like chair",
    "wrong": [
      "sounds like hear",
      "sounds like car"
    ],
    "parts": [
      "b",
      "ear"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "sound": true,
    "word": "hear",
    "soundGroup": "ear",
    "soundLabel": "ear as in near",
    "meaning": "sounds like near",
    "wrong": [
      "sounds like pear",
      "sounds like fair"
    ],
    "parts": [
      "h",
      "ear"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  }
];
export function buildSameLettersDifferentSounds(level, rng) {
  return wordReadingQuestions(BANK, "The same letters can make different sounds. Read the whole word.", level, rng);
}
