import { sentenceQuestions } from "./year4Practice.js";
/** Determiners: docs/curriculum/year-3-and-4-english.md, Year 4 mapping. */
export const RULE = "A determiner (word before a noun) tells us which one or how many, such as this, some and each.";
export const BANK = [
  {
    "sentence": "I saw ___ elephant.",
    "answer": "an",
    "wrong": [
      "a",
      "these"
    ],
    "hint": "Is the noun singular, plural, or something you cannot count one by one?"
  },
  {
    "sentence": "Priya picked ___ apple.",
    "answer": "an",
    "wrong": [
      "a",
      "those"
    ],
    "hint": "Is the noun singular, plural, or something you cannot count one by one?"
  },
  {
    "sentence": "Biscuit found ___ bone.",
    "answer": "a",
    "wrong": [
      "an",
      "these"
    ],
    "hint": "Is the noun singular, plural, or something you cannot count one by one?"
  },
  {
    "sentence": "Leo wore ___ coat.",
    "answer": "a",
    "wrong": [
      "an",
      "those"
    ],
    "hint": "Is the noun singular, plural, or something you cannot count one by one?"
  },
  {
    "sentence": "___ children are playing.",
    "answer": "These",
    "wrong": [
      "This",
      "An"
    ],
    "hint": "Is the noun singular, plural, or something you cannot count one by one?"
  },
  {
    "sentence": "___ flowers are red.",
    "answer": "Those",
    "wrong": [
      "That",
      "A"
    ],
    "hint": "Is the noun singular, plural, or something you cannot count one by one?"
  },
  {
    "sentence": "___ dog is asleep.",
    "answer": "This",
    "wrong": [
      "These",
      "An"
    ],
    "hint": "Is the noun singular, plural, or something you cannot count one by one?"
  },
  {
    "sentence": "___ book is mine.",
    "answer": "That",
    "wrong": [
      "Those",
      "An"
    ],
    "hint": "Is the noun singular, plural, or something you cannot count one by one?"
  },
  {
    "sentence": "___ people came to the show.",
    "answer": "Many",
    "wrong": [
      "Much",
      "An"
    ],
    "hint": "Is the noun singular, plural, or something you cannot count one by one?"
  },
  {
    "sentence": "There is ___ water in the jug.",
    "answer": "some",
    "wrong": [
      "many",
      "a"
    ],
    "hint": "Is the noun singular, plural, or something you cannot count one by one?"
  },
  {
    "sentence": "___ sand got into my shoes.",
    "answer": "Much",
    "wrong": [
      "Many",
      "An"
    ],
    "hint": "Is the noun singular, plural, or something you cannot count one by one?"
  },
  {
    "sentence": "___ pencils are on the desk.",
    "answer": "Several",
    "wrong": [
      "Much",
      "A"
    ],
    "hint": "Is the noun singular, plural, or something you cannot count one by one?"
  },
  {
    "sentence": "There are ___ biscuits left.",
    "answer": "few",
    "wrong": [
      "little",
      "an"
    ],
    "hint": "Is the noun singular, plural, or something you cannot count one by one?"
  },
  {
    "sentence": "There is ___ milk left.",
    "answer": "little",
    "wrong": [
      "few",
      "an"
    ],
    "hint": "Is the noun singular, plural, or something you cannot count one by one?"
  },
  {
    "sentence": "___ child received a sticker.",
    "answer": "Each",
    "wrong": [
      "These",
      "Many"
    ],
    "hint": "Is the noun singular, plural, or something you cannot count one by one?"
  },
  {
    "sentence": "___ chairs are empty.",
    "answer": "Both",
    "wrong": [
      "Every",
      "An"
    ],
    "hint": "Is the noun singular, plural, or something you cannot count one by one?"
  },
  {
    "sentence": "___ umbrella is broken.",
    "answer": "This",
    "wrong": [
      "These",
      "A"
    ],
    "hint": "Is the noun singular, plural, or something you cannot count one by one?"
  }
];
export function buildDeterminersQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng);
}
