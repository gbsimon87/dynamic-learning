import { sentenceQuestions } from "./year2Practice.js";

/** Commas in Lists: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "A comma separates items in a list. Use and before the last item: apples, pears and plums.";
export const BANK = [
  {
    "prompt": "Use commas in a list. Put and before the last item.",
    "sentence": "We chose ___.",
    "answer": "apples, pears and plums",
    "wrong": [
      "apples pears and plums",
      "apples, pears plums"
    ]
  },
  {
    "prompt": "Use commas in a list. Put and before the last item.",
    "sentence": "We chose ___.",
    "answer": "bread, milk and eggs",
    "wrong": [
      "bread milk and eggs",
      "bread, milk eggs"
    ]
  },
  {
    "prompt": "Use commas in a list. Put and before the last item.",
    "sentence": "We chose ___.",
    "answer": "pens, books and bags",
    "wrong": [
      "pens books and bags",
      "pens, books bags"
    ]
  },
  {
    "prompt": "Use commas in a list. Put and before the last item.",
    "sentence": "We chose ___.",
    "answer": "coats, hats and boots",
    "wrong": [
      "coats hats and boots",
      "coats, hats boots"
    ]
  },
  {
    "prompt": "Use commas in a list. Put and before the last item.",
    "sentence": "We chose ___.",
    "answer": "red, blue and green",
    "wrong": [
      "red blue and green",
      "red, blue green"
    ]
  },
  {
    "prompt": "Use commas in a list. Put and before the last item.",
    "sentence": "We chose ___.",
    "answer": "cats, dogs and rabbits",
    "wrong": [
      "cats dogs and rabbits",
      "cats, dogs rabbits"
    ]
  },
  {
    "prompt": "Use commas in a list. Put and before the last item.",
    "sentence": "We chose ___.",
    "answer": "carrots, peas and beans",
    "wrong": [
      "carrots peas and beans",
      "carrots, peas beans"
    ]
  },
  {
    "prompt": "Use commas in a list. Put and before the last item.",
    "sentence": "We chose ___.",
    "answer": "forks, spoons and plates",
    "wrong": [
      "forks spoons and plates",
      "forks, spoons plates"
    ]
  },
  {
    "prompt": "Use commas in a list. Put and before the last item.",
    "sentence": "We chose ___.",
    "answer": "sand, shells and stones",
    "wrong": [
      "sand shells and stones",
      "sand, shells stones"
    ]
  },
  {
    "prompt": "Use commas in a list. Put and before the last item.",
    "sentence": "We chose ___.",
    "answer": "paper, glue and paint",
    "wrong": [
      "paper glue and paint",
      "paper, glue paint"
    ]
  },
  {
    "prompt": "Use commas in a list. Put and before the last item.",
    "sentence": "We chose ___.",
    "answer": "socks, shirts and shorts",
    "wrong": [
      "socks shirts and shorts",
      "socks, shirts shorts"
    ]
  },
  {
    "prompt": "Use commas in a list. Put and before the last item.",
    "sentence": "We chose ___.",
    "answer": "bats, balls and nets",
    "wrong": [
      "bats balls and nets",
      "bats, balls nets"
    ]
  },
  {
    "prompt": "Use commas in a list. Put and before the last item.",
    "sentence": "We chose ___.",
    "answer": "cups, bowls and jugs",
    "wrong": [
      "cups bowls and jugs",
      "cups, bowls jugs"
    ]
  },
  {
    "prompt": "Use commas in a list. Put and before the last item.",
    "sentence": "We chose ___.",
    "answer": "trees, bushes and flowers",
    "wrong": [
      "trees bushes and flowers",
      "trees, bushes flowers"
    ]
  },
  {
    "prompt": "Use commas in a list. Put and before the last item.",
    "sentence": "We chose ___.",
    "answer": "chairs, tables and lamps",
    "wrong": [
      "chairs tables and lamps",
      "chairs, tables lamps"
    ]
  }
];
export function buildQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng);
}
