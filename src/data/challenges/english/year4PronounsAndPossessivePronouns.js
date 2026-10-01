import { sentenceQuestions } from "./year4Practice.js";
/** Pronouns and Possessive Pronouns: docs/curriculum/year-3-and-4-english.md, Year 4 mapping. */
export const RULE = "A pronoun (word replacing a noun) includes she and them. A possessive pronoun (word showing ownership) includes mine and hers.";
export const BANK = [
  {
    "sentence": "Amara has a new book. ___ is reading it.",
    "answer": "She",
    "wrong": [
      "Her",
      "Hers"
    ],
    "hint": "Is the word doing an action, receiving an action, or showing ownership on its own?"
  },
  {
    "sentence": "Leo brought a kite. ___ will fly it.",
    "answer": "He",
    "wrong": [
      "Him",
      "His"
    ],
    "hint": "Is the word doing an action, receiving an action, or showing ownership on its own?"
  },
  {
    "sentence": "Priya and Ellie arrived. ___ are smiling.",
    "answer": "They",
    "wrong": [
      "Them",
      "Their"
    ],
    "hint": "Is the word doing an action, receiving an action, or showing ownership on its own?"
  },
  {
    "sentence": "Biscuit found a bone. ___ buried it.",
    "answer": "He",
    "wrong": [
      "Him",
      "His"
    ],
    "hint": "Is the word doing an action, receiving an action, or showing ownership on its own?"
  },
  {
    "sentence": "Zayn saw Amara. He waved to ___.",
    "answer": "her",
    "wrong": [
      "she",
      "hers"
    ],
    "hint": "Is the word doing an action, receiving an action, or showing ownership on its own?"
  },
  {
    "sentence": "Ellie called Leo. She waited for ___.",
    "answer": "him",
    "wrong": [
      "he",
      "his"
    ],
    "hint": "Is the word doing an action, receiving an action, or showing ownership on its own?"
  },
  {
    "sentence": "We saw Priya and Zayn. We joined ___.",
    "answer": "them",
    "wrong": [
      "they",
      "their"
    ],
    "hint": "Is the word doing an action, receiving an action, or showing ownership on its own?"
  },
  {
    "sentence": "This bag belongs to me. It is ___.",
    "answer": "mine",
    "wrong": [
      "my",
      "me"
    ],
    "hint": "Is the word doing an action, receiving an action, or showing ownership on its own?"
  },
  {
    "sentence": "This coat belongs to Leo. It is ___.",
    "answer": "his",
    "wrong": [
      "he",
      "him"
    ],
    "hint": "Is the word doing an action, receiving an action, or showing ownership on its own?"
  },
  {
    "sentence": "This scarf belongs to Ellie. It is ___.",
    "answer": "hers",
    "wrong": [
      "her",
      "she"
    ],
    "hint": "Is the word doing an action, receiving an action, or showing ownership on its own?"
  },
  {
    "sentence": "This ball belongs to us. It is ___.",
    "answer": "ours",
    "wrong": [
      "our",
      "us"
    ],
    "hint": "Is the word doing an action, receiving an action, or showing ownership on its own?"
  },
  {
    "sentence": "These boots belong to the twins. They are ___.",
    "answer": "theirs",
    "wrong": [
      "their",
      "them"
    ],
    "hint": "Is the word doing an action, receiving an action, or showing ownership on its own?"
  },
  {
    "sentence": "This hat belongs to you. It is ___.",
    "answer": "yours",
    "wrong": [
      "your",
      "you"
    ],
    "hint": "Is the word doing an action, receiving an action, or showing ownership on its own?"
  },
  {
    "sentence": "Zayn and I have a plan. ___ will explain it.",
    "answer": "We",
    "wrong": [
      "Us",
      "Our"
    ],
    "hint": "Is the word doing an action, receiving an action, or showing ownership on its own?"
  },
  {
    "sentence": "Priya gave me ___ pencil.",
    "answer": "her",
    "wrong": [
      "hers",
      "she"
    ],
    "hint": "Is the word doing an action, receiving an action, or showing ownership on its own?"
  }
];
export function buildPronounsAndPossessivePronounsQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng);
}
