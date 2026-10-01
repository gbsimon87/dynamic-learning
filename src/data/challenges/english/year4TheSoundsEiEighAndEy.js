import { wordQuestions } from "./year4Practice.js";
/** The Sounds ei, eigh and ey: docs/curriculum/year-3-and-4-english.md, Year 4 mapping. */
export const RULE = "The long a sound can be spelt ei, eigh or ey. Learn the pattern within each word.";
export const BANK = [
  {
    "word": "vein",
    "meaning": "a tube carrying blood in your body",
    "sentence": "The nurse found a ___ in his arm.",
    "wrong": [
      "vane",
      "veen"
    ]
  },
  {
    "word": "weigh",
    "meaning": "to find how heavy something is",
    "sentence": "Please ___ the apples.",
    "wrong": [
      "way",
      "wiegh"
    ]
  },
  {
    "word": "eight",
    "meaning": "the number after seven",
    "sentence": "The spider had ___ legs.",
    "wrong": [
      "eigt",
      "eihgt"
    ]
  },
  {
    "word": "neighbour",
    "meaning": "someone living nearby",
    "sentence": "Our ___ watered the plants.",
    "wrong": [
      "nieghbour",
      "neigbour"
    ]
  },
  {
    "word": "they",
    "meaning": "the people or things being spoken about",
    "sentence": "___ went to the park.",
    "wrong": [
      "thay",
      "thei"
    ]
  },
  {
    "word": "obey",
    "meaning": "to do what you are told",
    "sentence": "Biscuit must ___ Ellie’s command.",
    "wrong": [
      "obay",
      "obei"
    ]
  },
  {
    "word": "weight",
    "meaning": "how heavy something is",
    "sentence": "The parcel’s ___ was written on the label.",
    "wrong": [
      "wieght",
      "waight"
    ]
  },
  {
    "word": "eighteen",
    "meaning": "the number after seventeen",
    "sentence": "There were ___ chairs.",
    "wrong": [
      "eigteen",
      "eihgteen"
    ]
  },
  {
    "word": "eighty",
    "meaning": "eight lots of ten",
    "sentence": "Gran is ___ years old.",
    "wrong": [
      "eigty",
      "eihgty"
    ]
  },
  {
    "word": "eighth",
    "meaning": "number eight in order",
    "sentence": "Leo finished ___ in the race.",
    "wrong": [
      "eigth",
      "eihgth"
    ]
  },
  {
    "word": "sleigh",
    "meaning": "a vehicle that slides over snow",
    "sentence": "The reindeer pulled a ___.",
    "wrong": [
      "slay",
      "sliegh"
    ]
  },
  {
    "word": "freight",
    "meaning": "goods carried by a vehicle",
    "sentence": "The train carried ___.",
    "wrong": [
      "frieght",
      "frayt"
    ]
  },
  {
    "word": "rein",
    "meaning": "a strap used to guide a horse",
    "sentence": "Priya held one ___ in each hand.",
    "wrong": [
      "reen",
      "rien"
    ]
  },
  {
    "word": "reign",
    "meaning": "the time a king or queen rules",
    "sentence": "The queen’s ___ lasted many years.",
    "wrong": [
      "riegn",
      "reing"
    ]
  },
  {
    "word": "disobey",
    "meaning": "to refuse to do what you are told",
    "sentence": "Do not ___ the safety rules.",
    "wrong": [
      "disobay",
      "disobei"
    ]
  }
];
export function buildTheSoundsEiEighAndEyQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
