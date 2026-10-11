import { wordReadingQuestions } from "./year1Practice.js";

/** Year 1: "read accurately by blending sounds in unfamiliar words containing GPCs that have been taught".
 * Source: docs/curriculum/year-1-english.md and english-appendix-1-year-1.md.
 * 1 supported choice; 2 independent choice; 3 whole-structure work; 4 applied building/spelling.
 */
export const TITLES = [
  "Read and choose.",
  "Find the meaning.",
  "Match the meaning.",
  "Build the meaning."
];
export const BANK = [
  {
    "word": "cat",
    "meaning": "a pet that meows",
    "wrong": [
      "a pet that barks",
      "a bird that sings"
    ],
    "parts": [
      "c",
      "a",
      "t"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "ship",
    "meaning": "a large sea boat",
    "wrong": [
      "a road car",
      "a sky plane"
    ],
    "parts": [
      "sh",
      "i",
      "p"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "fish",
    "meaning": "an animal with fins",
    "wrong": [
      "an animal with fur",
      "an animal with feathers"
    ],
    "parts": [
      "f",
      "i",
      "sh"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "shop",
    "meaning": "a place to buy things",
    "wrong": [
      "a place to swim",
      "a place to sleep"
    ],
    "parts": [
      "sh",
      "o",
      "p"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "frog",
    "meaning": "an animal that hops",
    "wrong": [
      "a bird that flies",
      "a fish that swims"
    ],
    "parts": [
      "f",
      "r",
      "o",
      "g"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "flag",
    "meaning": "cloth on a pole",
    "wrong": [
      "a stone in a pond",
      "a light on a wall"
    ],
    "parts": [
      "f",
      "l",
      "a",
      "g"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "crab",
    "meaning": "a sea animal with claws",
    "wrong": [
      "a farm animal with wool",
      "a pet with feathers"
    ],
    "parts": [
      "c",
      "r",
      "a",
      "b"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "drum",
    "meaning": "something you beat for music",
    "wrong": [
      "something you wear for warmth",
      "something you eat for lunch"
    ],
    "parts": [
      "d",
      "r",
      "u",
      "m"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "plum",
    "meaning": "a small purple fruit",
    "wrong": [
      "a long green leaf",
      "a round wooden ball"
    ],
    "parts": [
      "p",
      "l",
      "u",
      "m"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "tent",
    "meaning": "a shelter made of cloth",
    "wrong": [
      "a boat made of wood",
      "a cup made of glass"
    ],
    "parts": [
      "t",
      "e",
      "n",
      "t"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "milk",
    "meaning": "a white drink",
    "wrong": [
      "a red fruit",
      "a blue cloth"
    ],
    "parts": [
      "m",
      "i",
      "l",
      "k"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "stamp",
    "meaning": "something stuck on a letter",
    "wrong": [
      "something worn on a foot",
      "something eaten with soup"
    ],
    "parts": [
      "s",
      "t",
      "a",
      "m",
      "p"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "chest",
    "meaning": "a box with a lid",
    "wrong": [
      "a chair with legs",
      "a tree with leaves"
    ],
    "parts": [
      "ch",
      "e",
      "s",
      "t"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "brush",
    "meaning": "something with bristles",
    "wrong": [
      "something with wheels",
      "something with wings"
    ],
    "parts": [
      "b",
      "r",
      "u",
      "sh"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "shelf",
    "meaning": "a board for keeping books",
    "wrong": [
      "a cloth for drying hands",
      "a tool for digging soil"
    ],
    "parts": [
      "sh",
      "e",
      "l",
      "f"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "bench",
    "meaning": "a long seat",
    "wrong": [
      "a round plate",
      "a short rope"
    ],
    "parts": [
      "b",
      "e",
      "n",
      "ch"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  }
];
export function buildBlendingSounds(level, rng) {
  return wordReadingQuestions(BANK, "Say each sound, then blend the sounds into the whole word.", level, rng);
}
