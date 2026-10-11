import { spellingQuestions } from "./year1Practice.js";

/** Year 1: "Compound words".
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
    "answer": "football",
    "parts": [
      "foot",
      "ball"
    ],
    "pattern": "ball",
    "prompt": "Join foot and ball into one word.",
    "sentence": "The new word is ___.",
    "speak": "football. Join foot and ball.",
    "wrong": [
      "foot ball",
      "ballfoot"
    ],
    "hint": "The first word comes first. Leave no space inside the new word."
  },
  {
    "answer": "playground",
    "parts": [
      "play",
      "ground"
    ],
    "pattern": "ground",
    "prompt": "Join play and ground into one word.",
    "sentence": "The new word is ___.",
    "speak": "playground. Join play and ground.",
    "wrong": [
      "play ground",
      "groundplay"
    ],
    "hint": "The first word comes first. Leave no space inside the new word."
  },
  {
    "answer": "farmyard",
    "parts": [
      "farm",
      "yard"
    ],
    "pattern": "yard",
    "prompt": "Join farm and yard into one word.",
    "sentence": "The new word is ___.",
    "speak": "farmyard. Join farm and yard.",
    "wrong": [
      "farm yard",
      "yardfarm"
    ],
    "hint": "The first word comes first. Leave no space inside the new word."
  },
  {
    "answer": "bedroom",
    "parts": [
      "bed",
      "room"
    ],
    "pattern": "room",
    "prompt": "Join bed and room into one word.",
    "sentence": "The new word is ___.",
    "speak": "bedroom. Join bed and room.",
    "wrong": [
      "bed room",
      "roombed"
    ],
    "hint": "The first word comes first. Leave no space inside the new word."
  },
  {
    "answer": "blackberry",
    "parts": [
      "black",
      "berry"
    ],
    "pattern": "berry",
    "prompt": "Join black and berry into one word.",
    "sentence": "The new word is ___.",
    "speak": "blackberry. Join black and berry.",
    "wrong": [
      "black berry",
      "berryblack"
    ],
    "hint": "The first word comes first. Leave no space inside the new word."
  },
  {
    "answer": "sunset",
    "parts": [
      "sun",
      "set"
    ],
    "pattern": "set",
    "prompt": "Join sun and set into one word.",
    "sentence": "The new word is ___.",
    "speak": "sunset. Join sun and set.",
    "wrong": [
      "sun set",
      "setsun"
    ],
    "hint": "The first word comes first. Leave no space inside the new word."
  },
  {
    "answer": "rainbow",
    "parts": [
      "rain",
      "bow"
    ],
    "pattern": "bow",
    "prompt": "Join rain and bow into one word.",
    "sentence": "The new word is ___.",
    "speak": "rainbow. Join rain and bow.",
    "wrong": [
      "rain bow",
      "bowrain"
    ],
    "hint": "The first word comes first. Leave no space inside the new word."
  },
  {
    "answer": "seaside",
    "parts": [
      "sea",
      "side"
    ],
    "pattern": "side",
    "prompt": "Join sea and side into one word.",
    "sentence": "The new word is ___.",
    "speak": "seaside. Join sea and side.",
    "wrong": [
      "sea side",
      "sidesea"
    ],
    "hint": "The first word comes first. Leave no space inside the new word."
  },
  {
    "answer": "toothbrush",
    "parts": [
      "tooth",
      "brush"
    ],
    "pattern": "brush",
    "prompt": "Join tooth and brush into one word.",
    "sentence": "The new word is ___.",
    "speak": "toothbrush. Join tooth and brush.",
    "wrong": [
      "tooth brush",
      "brushtooth"
    ],
    "hint": "The first word comes first. Leave no space inside the new word."
  },
  {
    "answer": "bathtub",
    "parts": [
      "bath",
      "tub"
    ],
    "pattern": "tub",
    "prompt": "Join bath and tub into one word.",
    "sentence": "The new word is ___.",
    "speak": "bathtub. Join bath and tub.",
    "wrong": [
      "bath tub",
      "tubbath"
    ],
    "hint": "The first word comes first. Leave no space inside the new word."
  },
  {
    "answer": "cupcake",
    "parts": [
      "cup",
      "cake"
    ],
    "pattern": "cake",
    "prompt": "Join cup and cake into one word.",
    "sentence": "The new word is ___.",
    "speak": "cupcake. Join cup and cake.",
    "wrong": [
      "cup cake",
      "cakecup"
    ],
    "hint": "The first word comes first. Leave no space inside the new word."
  },
  {
    "answer": "teapot",
    "parts": [
      "tea",
      "pot"
    ],
    "pattern": "pot",
    "prompt": "Join tea and pot into one word.",
    "sentence": "The new word is ___.",
    "speak": "teapot. Join tea and pot.",
    "wrong": [
      "tea pot",
      "pottea"
    ],
    "hint": "The first word comes first. Leave no space inside the new word."
  },
  {
    "answer": "sandpit",
    "parts": [
      "sand",
      "pit"
    ],
    "pattern": "pit",
    "prompt": "Join sand and pit into one word.",
    "sentence": "The new word is ___.",
    "speak": "sandpit. Join sand and pit.",
    "wrong": [
      "sand pit",
      "pitsand"
    ],
    "hint": "The first word comes first. Leave no space inside the new word."
  },
  {
    "answer": "popcorn",
    "parts": [
      "pop",
      "corn"
    ],
    "pattern": "corn",
    "prompt": "Join pop and corn into one word.",
    "sentence": "The new word is ___.",
    "speak": "popcorn. Join pop and corn.",
    "wrong": [
      "pop corn",
      "cornpop"
    ],
    "hint": "The first word comes first. Leave no space inside the new word."
  },
  {
    "answer": "snowman",
    "parts": [
      "snow",
      "man"
    ],
    "pattern": "man",
    "prompt": "Join snow and man into one word.",
    "sentence": "The new word is ___.",
    "speak": "snowman. Join snow and man.",
    "wrong": [
      "snow man",
      "mansnow"
    ],
    "hint": "The first word comes first. Leave no space inside the new word."
  },
  {
    "answer": "sunshine",
    "parts": [
      "sun",
      "shine"
    ],
    "pattern": "shine",
    "prompt": "Join sun and shine into one word.",
    "sentence": "The new word is ___.",
    "speak": "sunshine. Join sun and shine.",
    "wrong": [
      "sun shine",
      "shinesun"
    ],
    "hint": "The first word comes first. Leave no space inside the new word."
  }
];
export function buildCompoundWords(level, rng) {
  return spellingQuestions(BANK, "Join two whole words without a space.", level, rng);
}
