import { wordReadingQuestions } from "./year1Practice.js";

/** Year 1: "read other words of more than one syllable that contain taught GPCs".
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
    "word": "rabbit",
    "meaning": "a pet with long ears",
    "wrong": [
      "a pet with a long trunk",
      "a pet with fins"
    ],
    "parts": [
      "rab",
      "bit"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "pocket",
    "meaning": "a small pouch in clothes",
    "wrong": [
      "a large box in a van",
      "a tall tree in a park"
    ],
    "parts": [
      "pock",
      "et"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "carrot",
    "meaning": "an orange root to eat",
    "wrong": [
      "a red berry to eat",
      "a green leaf to eat"
    ],
    "parts": [
      "car",
      "rot"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "thunder",
    "meaning": "a loud storm sound",
    "wrong": [
      "a quiet bird sound",
      "a soft bell sound"
    ],
    "parts": [
      "thun",
      "der"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "sunset",
    "meaning": "when the sun goes down",
    "wrong": [
      "when the sun comes up",
      "when the rain starts"
    ],
    "parts": [
      "sun",
      "set"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "garden",
    "meaning": "a place to grow plants",
    "wrong": [
      "a place to cook food",
      "a place to buy shoes"
    ],
    "parts": [
      "gar",
      "den"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "picnic",
    "meaning": "a meal eaten outside",
    "wrong": [
      "a game played inside",
      "a race run at night"
    ],
    "parts": [
      "pic",
      "nic"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "helmet",
    "meaning": "a hard hat for safety",
    "wrong": [
      "a warm sock for feet",
      "a soft coat for rain"
    ],
    "parts": [
      "hel",
      "met"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "insect",
    "meaning": "a creature with six legs",
    "wrong": [
      "a creature with two legs",
      "a creature with no legs"
    ],
    "parts": [
      "in",
      "sect"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "basket",
    "meaning": "a woven container with a handle",
    "wrong": [
      "a blanket for keeping warm",
      "a handle for opening doors"
    ],
    "parts": [
      "bas",
      "ket"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "rooftop",
    "meaning": "the top of a house",
    "wrong": [
      "the bottom of a boat",
      "the middle of a tree"
    ],
    "parts": [
      "roof",
      "top"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "bedroom",
    "meaning": "a room for sleeping",
    "wrong": [
      "a room for cooking",
      "a room for washing"
    ],
    "parts": [
      "bed",
      "room"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "rainbow",
    "meaning": "colours in the sky",
    "wrong": [
      "stars in the sea",
      "lights in the soil"
    ],
    "parts": [
      "rain",
      "bow"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "lunchbox",
    "meaning": "a box for a midday meal",
    "wrong": [
      "a box for drawing pencils",
      "a box for garden tools"
    ],
    "parts": [
      "lunch",
      "box"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "robin",
    "meaning": "a bird with a red chest",
    "wrong": [
      "a fish with a red tail",
      "a dog with a red coat"
    ],
    "parts": [
      "rob",
      "in"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  },
  {
    "word": "winter",
    "meaning": "the coldest season",
    "wrong": [
      "the hottest season",
      "the brightest morning"
    ],
    "parts": [
      "win",
      "ter"
    ],
    "hint": "Read the letters from left to right. Think about the whole word."
  }
];
export function buildLongerWords(level, rng) {
  return wordReadingQuestions(BANK, "Read a longer word in parts, then put the parts together.", level, rng);
}
