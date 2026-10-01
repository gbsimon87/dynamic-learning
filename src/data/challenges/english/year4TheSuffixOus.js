import { wordQuestions } from "./year4Practice.js";
/** The Suffix ous: docs/curriculum/year-3-and-4-english.md, Year 4 mapping. */
export const RULE = "The suffix (word ending) ous often means “full of”. Change our to or; keep e after g to keep its soft sound.";
export const BANK = [
  {
    "word": "poisonous",
    "meaning": "containing poison",
    "sentence": "The berries were ___.",
    "wrong": [
      "poisonus",
      "poisonouus"
    ]
  },
  {
    "word": "dangerous",
    "meaning": "full of danger",
    "sentence": "The icy road was ___.",
    "wrong": [
      "dangerus",
      "dangerious"
    ]
  },
  {
    "word": "mountainous",
    "meaning": "having many mountains",
    "sentence": "They explored a ___ region.",
    "wrong": [
      "mountainus",
      "mountainious"
    ]
  },
  {
    "word": "famous",
    "meaning": "known by many people",
    "sentence": "Amara met a ___ author.",
    "wrong": [
      "fameous",
      "famus"
    ]
  },
  {
    "word": "various",
    "meaning": "several different",
    "sentence": "Priya tried ___ colours.",
    "wrong": [
      "varyous",
      "varius"
    ]
  },
  {
    "word": "tremendous",
    "meaning": "very great",
    "sentence": "The team made a ___ effort.",
    "wrong": [
      "tremendus",
      "tremendious"
    ]
  },
  {
    "word": "enormous",
    "meaning": "very large",
    "sentence": "Biscuit saw an ___ dog.",
    "wrong": [
      "enormus",
      "enourmous"
    ]
  },
  {
    "word": "jealous",
    "meaning": "unhappy that someone has something you want",
    "sentence": "The story’s king felt ___.",
    "wrong": [
      "jelous",
      "jealus"
    ]
  },
  {
    "word": "humorous",
    "meaning": "funny",
    "sentence": "Leo told a ___ story.",
    "wrong": [
      "humourous",
      "humorus"
    ]
  },
  {
    "word": "glamorous",
    "meaning": "attractive and exciting",
    "sentence": "The stage looked ___.",
    "wrong": [
      "glamourous",
      "glamorus"
    ]
  },
  {
    "word": "vigorous",
    "meaning": "strong and energetic",
    "sentence": "The dance had ___ movements.",
    "wrong": [
      "vigourous",
      "vigorus"
    ]
  },
  {
    "word": "courageous",
    "meaning": "brave",
    "sentence": "The ___ knight helped the villagers.",
    "wrong": [
      "couragous",
      "courageus"
    ]
  },
  {
    "word": "outrageous",
    "meaning": "very shocking",
    "sentence": "The villain made an ___ demand.",
    "wrong": [
      "outragous",
      "outrageus"
    ]
  },
  {
    "word": "serious",
    "meaning": "not joking",
    "sentence": "Zayn had a ___ expression.",
    "wrong": [
      "sereous",
      "serius"
    ]
  },
  {
    "word": "obvious",
    "meaning": "easy to see or understand",
    "sentence": "The answer was ___.",
    "wrong": [
      "obveous",
      "obvius"
    ]
  },
  {
    "word": "curious",
    "meaning": "wanting to know more",
    "sentence": "Ellie was ___ about the cave.",
    "wrong": [
      "cureous",
      "curius"
    ]
  },
  {
    "word": "hideous",
    "meaning": "very ugly or unpleasant",
    "sentence": "The fairy tale had a ___ monster.",
    "wrong": [
      "hidious",
      "hideus"
    ]
  },
  {
    "word": "spontaneous",
    "meaning": "happening without planning",
    "sentence": "They gave a ___ cheer.",
    "wrong": [
      "spontanious",
      "spontaneus"
    ]
  },
  {
    "word": "courteous",
    "meaning": "polite and considerate",
    "sentence": "The guide was very ___.",
    "wrong": [
      "courtious",
      "courteus"
    ]
  }
];
export function buildTheSuffixOusQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
