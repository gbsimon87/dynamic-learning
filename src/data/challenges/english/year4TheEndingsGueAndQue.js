import { wordQuestions } from "./year4Practice.js";
/** The Endings gue and que: docs/curriculum/year-3-and-4-english.md, Year 4 mapping. */
export const RULE = "Some French origin words end in gue for a hard g sound, or que for a k sound.";
export const BANK = [
  {
    "word": "league",
    "meaning": "a group of sports teams",
    "sentence": "Leo’s team joined a ___.",
    "wrong": [
      "leage",
      "leaque"
    ]
  },
  {
    "word": "tongue",
    "meaning": "the part of your mouth used for tasting",
    "sentence": "Biscuit licked his lips with his ___.",
    "wrong": [
      "tounge",
      "tong"
    ]
  },
  {
    "word": "antique",
    "meaning": "an old object that is valuable",
    "sentence": "Gran showed us an ___.",
    "wrong": [
      "antigue",
      "anteek"
    ]
  },
  {
    "word": "unique",
    "meaning": "the only one of its kind",
    "sentence": "Each snowflake is ___.",
    "wrong": [
      "unigue",
      "uneek"
    ]
  },
  {
    "word": "vague",
    "meaning": "not clear or exact",
    "sentence": "The directions were ___.",
    "wrong": [
      "vaque",
      "vage"
    ]
  },
  {
    "word": "plague",
    "meaning": "a serious disease affecting many people",
    "sentence": "The history book described a ___.",
    "wrong": [
      "plaquee",
      "plage"
    ]
  },
  {
    "word": "fatigue",
    "meaning": "great tiredness",
    "sentence": "The long climb caused ___.",
    "wrong": [
      "fatique",
      "fatige"
    ]
  },
  {
    "word": "catalogue",
    "meaning": "a list of items",
    "sentence": "Priya looked in the library ___.",
    "wrong": [
      "cataloque",
      "catalouge"
    ]
  },
  {
    "word": "dialogue",
    "meaning": "a conversation in a story",
    "sentence": "The play had lively ___.",
    "wrong": [
      "dialoque",
      "dialouge"
    ]
  },
  {
    "word": "colleague",
    "meaning": "someone you work with",
    "sentence": "Mum’s ___ helped with the event.",
    "wrong": [
      "colleaque",
      "colleage"
    ]
  },
  {
    "word": "intrigue",
    "meaning": "interest mixed with curiosity",
    "sentence": "The mystery filled Amara with ___.",
    "wrong": [
      "intrique",
      "intrige"
    ]
  },
  {
    "word": "technique",
    "meaning": "a way of doing something",
    "sentence": "Zayn learnt a new painting ___.",
    "wrong": [
      "technigue",
      "tecknique"
    ]
  },
  {
    "word": "boutique",
    "meaning": "a small shop selling fashionable clothes",
    "sentence": "We passed a little ___.",
    "wrong": [
      "boutigue",
      "bouteek"
    ]
  },
  {
    "word": "cheque",
    "meaning": "a paper instruction to pay money",
    "sentence": "Gran paid with a ___.",
    "wrong": [
      "chegue",
      "chek"
    ]
  },
  {
    "word": "picturesque",
    "meaning": "attractive like a picture",
    "sentence": "The village was ___.",
    "wrong": [
      "picturesgue",
      "picturesk"
    ]
  }
];
export function buildTheEndingsGueAndQueQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
