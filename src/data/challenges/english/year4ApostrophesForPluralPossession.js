import { sentenceQuestions } from "./year4Practice.js";
/** Apostrophes for Plural Possession: docs/curriculum/year-3-and-4-english.md, Year 4 mapping. */
export const RULE = "An apostrophe shows belonging. Add it after s for regular plurals; add ’s to plurals such as children.";
export const BANK = [
  {
    "sentence": "These are the ___ bags.",
    "answer": "girls’",
    "wrong": [
      "girl’s",
      "girls"
    ],
    "context": "The bags belong to all the girls.",
    "prompt": "Show that the bags belong to the whole group.",
    "hint": "Find the plural first. Does it already end in s?"
  },
  {
    "sentence": "These are the ___ bags.",
    "answer": "boys’",
    "wrong": [
      "boy’s",
      "boys"
    ],
    "context": "The bags belong to all the boys.",
    "prompt": "Show that the bags belong to the whole group.",
    "hint": "Find the plural first. Does it already end in s?"
  },
  {
    "sentence": "These are the ___ bags.",
    "answer": "babies’",
    "wrong": [
      "baby’s",
      "babies"
    ],
    "context": "The bags belong to all the babies.",
    "prompt": "Show that the bags belong to the whole group.",
    "hint": "Find the plural first. Does it already end in s?"
  },
  {
    "sentence": "These are the ___ bags.",
    "answer": "children’s",
    "wrong": [
      "childrens’",
      "children"
    ],
    "context": "The bags belong to all the children.",
    "prompt": "Show that the bags belong to the whole group.",
    "hint": "Find the plural first. Does it already end in s?"
  },
  {
    "sentence": "These are the ___ bags.",
    "answer": "men’s",
    "wrong": [
      "mens’",
      "men"
    ],
    "context": "The bags belong to all the men.",
    "prompt": "Show that the bags belong to the whole group.",
    "hint": "Find the plural first. Does it already end in s?"
  },
  {
    "sentence": "These are the ___ bags.",
    "answer": "mice’s",
    "wrong": [
      "mices’",
      "mice"
    ],
    "context": "The bags belong to all the mice.",
    "prompt": "Show that the bags belong to the whole group.",
    "hint": "Find the plural first. Does it already end in s?"
  },
  {
    "sentence": "These are the ___ bags.",
    "answer": "women’s",
    "wrong": [
      "womens’",
      "women"
    ],
    "context": "The bags belong to all the women.",
    "prompt": "Show that the bags belong to the whole group.",
    "hint": "Find the plural first. Does it already end in s?"
  },
  {
    "sentence": "These are the ___ bags.",
    "answer": "dogs’",
    "wrong": [
      "dog’s",
      "dogs"
    ],
    "context": "The bags belong to all the dogs.",
    "prompt": "Show that the bags belong to the whole group.",
    "hint": "Find the plural first. Does it already end in s?"
  },
  {
    "sentence": "These are the ___ bags.",
    "answer": "cats’",
    "wrong": [
      "cat’s",
      "cats"
    ],
    "context": "The bags belong to all the cats.",
    "prompt": "Show that the bags belong to the whole group.",
    "hint": "Find the plural first. Does it already end in s?"
  },
  {
    "sentence": "These are the ___ bags.",
    "answer": "teachers’",
    "wrong": [
      "teacher’s",
      "teachers"
    ],
    "context": "The bags belong to all the teachers.",
    "prompt": "Show that the bags belong to the whole group.",
    "hint": "Find the plural first. Does it already end in s?"
  },
  {
    "sentence": "These are the ___ bags.",
    "answer": "players’",
    "wrong": [
      "player’s",
      "players"
    ],
    "context": "The bags belong to all the players.",
    "prompt": "Show that the bags belong to the whole group.",
    "hint": "Find the plural first. Does it already end in s?"
  },
  {
    "sentence": "These are the ___ bags.",
    "answer": "friends’",
    "wrong": [
      "friend’s",
      "friends"
    ],
    "context": "The bags belong to all the friends.",
    "prompt": "Show that the bags belong to the whole group.",
    "hint": "Find the plural first. Does it already end in s?"
  },
  {
    "sentence": "These are the ___ bags.",
    "answer": "horses’",
    "wrong": [
      "horse’s",
      "horses"
    ],
    "context": "The bags belong to all the horses.",
    "prompt": "Show that the bags belong to the whole group.",
    "hint": "Find the plural first. Does it already end in s?"
  },
  {
    "sentence": "These are the ___ bags.",
    "answer": "foxes’",
    "wrong": [
      "fox’s",
      "foxes"
    ],
    "context": "The bags belong to all the foxes.",
    "prompt": "Show that the bags belong to the whole group.",
    "hint": "Find the plural first. Does it already end in s?"
  },
  {
    "sentence": "These are the ___ bags.",
    "answer": "pupils’",
    "wrong": [
      "pupil’s",
      "pupils"
    ],
    "context": "The bags belong to all the pupils.",
    "prompt": "Show that the bags belong to the whole group.",
    "hint": "Find the plural first. Does it already end in s?"
  }
];
export function buildApostrophesForPluralPossessionQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng);
}
