import { sentenceQuestions } from "./year4Practice.js";
/** Nouns or Pronouns for Clarity: docs/curriculum/year-3-and-4-english.md, Year 4 mapping. */
export const RULE = "Choose a noun or pronoun (replacement for a noun) that makes clear who you mean and avoids needless repetition.";
export const BANK = [
  {
    "sentence": "Amara waved. ___ smiled at us.",
    "answer": "She",
    "wrong": [
      "Her",
      "Hers"
    ],
    "hint": "Trace the action back to the named person. Check the pronoun’s form too."
  },
  {
    "sentence": "Leo whistled. ___ called Biscuit.",
    "answer": "He",
    "wrong": [
      "Him",
      "His"
    ],
    "hint": "Trace the action back to the named person. Check the pronoun’s form too."
  },
  {
    "sentence": "Ellie packed her bag. ___ put it by the door.",
    "answer": "She",
    "wrong": [
      "Her",
      "Hers"
    ],
    "hint": "Trace the action back to the named person. Check the pronoun’s form too."
  },
  {
    "sentence": "Zayn drew a rocket. ___ coloured it red.",
    "answer": "He",
    "wrong": [
      "Him",
      "His"
    ],
    "hint": "Trace the action back to the named person. Check the pronoun’s form too."
  },
  {
    "sentence": "Priya opened her book. ___ started reading.",
    "answer": "She",
    "wrong": [
      "Her",
      "Hers"
    ],
    "hint": "Trace the action back to the named person. Check the pronoun’s form too."
  },
  {
    "sentence": "Leo and Zayn arrived. ___ were tired.",
    "answer": "They",
    "wrong": [
      "Them",
      "Their"
    ],
    "hint": "Trace the action back to the named person. Check the pronoun’s form too."
  },
  {
    "sentence": "Amara and Ellie sang. ___ enjoyed the song.",
    "answer": "They",
    "wrong": [
      "Them",
      "Their"
    ],
    "hint": "Trace the action back to the named person. Check the pronoun’s form too."
  },
  {
    "sentence": "The dog ran outside. ___ chased a ball.",
    "answer": "He",
    "wrong": [
      "Him",
      "His"
    ],
    "hint": "Trace the action back to the named person. Check the pronoun’s form too."
  },
  {
    "sentence": "I saw the children. I waved to ___.",
    "answer": "them",
    "wrong": [
      "they",
      "their"
    ],
    "hint": "Trace the action back to the named person. Check the pronoun’s form too."
  },
  {
    "sentence": "Priya helped Ellie. Ellie thanked ___.",
    "answer": "Priya",
    "wrong": [
      "him",
      "them"
    ],
    "hint": "Trace the action back to the named person. Check the pronoun’s form too."
  },
  {
    "sentence": "Leo helped Zayn. Zayn thanked ___.",
    "answer": "Leo",
    "wrong": [
      "her",
      "them"
    ],
    "hint": "Trace the action back to the named person. Check the pronoun’s form too."
  },
  {
    "sentence": "Amara called Priya. Priya listened to ___.",
    "answer": "Amara",
    "wrong": [
      "him",
      "them"
    ],
    "hint": "Trace the action back to the named person. Check the pronoun’s form too."
  },
  {
    "sentence": "Ellie fed Biscuit. Biscuit followed ___.",
    "answer": "Ellie",
    "wrong": [
      "him",
      "them"
    ],
    "hint": "Trace the action back to the named person. Check the pronoun’s form too."
  },
  {
    "sentence": "Zayn called Leo. Leo answered ___.",
    "answer": "Zayn",
    "wrong": [
      "her",
      "them"
    ],
    "hint": "Trace the action back to the named person. Check the pronoun’s form too."
  },
  {
    "sentence": "The boys found a ball. The ball belonged to ___.",
    "answer": "them",
    "wrong": [
      "they",
      "their"
    ],
    "hint": "Trace the action back to the named person. Check the pronoun’s form too."
  }
];
export function buildNounsOrPronounsForClarityQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng);
}
