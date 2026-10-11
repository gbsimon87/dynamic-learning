import { wordQuestions } from "./year2Practice.js";

/** Apostrophes for Ownership: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "For one owner, add an apostrophe and s. The girl’s book belongs to one girl.";
export const BANK = [
  {
    "answer": "Megan's",
    "wrong": [
      "Megans",
      "Megans'"
    ],
    "clue": "Write the ownership word for a book belonging to Megan."
  },
  {
    "answer": "Ravi's",
    "wrong": [
      "Ravis",
      "Ravis'"
    ],
    "clue": "Write the ownership word for a bag belonging to Ravi."
  },
  {
    "answer": "girl's",
    "wrong": [
      "girls",
      "girls'"
    ],
    "clue": "Write the ownership word for a hat belonging to one girl."
  },
  {
    "answer": "child's",
    "wrong": [
      "childs",
      "childs'"
    ],
    "clue": "Write the ownership word for a toy belonging to one child."
  },
  {
    "answer": "man's",
    "wrong": [
      "mans",
      "mans'"
    ],
    "clue": "Write the ownership word for a coat belonging to one man."
  },
  {
    "answer": "Amara's",
    "wrong": [
      "Amaras",
      "Amaras'"
    ],
    "clue": "Write the ownership word for a pencil belonging to Amara."
  },
  {
    "answer": "Leo's",
    "wrong": [
      "Leos",
      "Leos'"
    ],
    "clue": "Write the ownership word for a ball belonging to Leo."
  },
  {
    "answer": "Priya's",
    "wrong": [
      "Priyas",
      "Priyas'"
    ],
    "clue": "Write the ownership word for a bike belonging to Priya."
  },
  {
    "answer": "Zayn's",
    "wrong": [
      "Zayns",
      "Zayns'"
    ],
    "clue": "Write the ownership word for a drawing belonging to Zayn."
  },
  {
    "answer": "Ellie's",
    "wrong": [
      "Ellies",
      "Ellies'"
    ],
    "clue": "Write the ownership word for a dog belonging to Ellie."
  },
  {
    "answer": "dog's",
    "wrong": [
      "dogs",
      "dogs'"
    ],
    "clue": "Write the ownership word for a bone belonging to one dog."
  },
  {
    "answer": "cat's",
    "wrong": [
      "cats",
      "cats'"
    ],
    "clue": "Write the ownership word for a bed belonging to one cat."
  },
  {
    "answer": "teacher's",
    "wrong": [
      "teachers",
      "teachers'"
    ],
    "clue": "Write the ownership word for a desk belonging to one teacher."
  },
  {
    "answer": "boy's",
    "wrong": [
      "boys",
      "boys'"
    ],
    "clue": "Write the ownership word for a shoe belonging to one boy."
  },
  {
    "answer": "rabbit's",
    "wrong": [
      "rabbits",
      "rabbits'"
    ],
    "clue": "Write the ownership word for a hutch belonging to one rabbit."
  }
];
export function buildQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
