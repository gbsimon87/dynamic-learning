import { sentenceQuestions } from "./year2Practice.js";

/** Expanded Noun Phrases: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "A noun phrase (words around a naming word) can add description: the blue butterfly.";
export const BANK = [
  {
    "prompt": "Describe the boat as small and red. Put small before red.",
    "sentence": "We saw ___.",
    "answer": "the small red boat",
    "wrong": [
      "the boat small red",
      "the small boat red"
    ]
  },
  {
    "prompt": "Describe the dog as little and brown. Put little before brown.",
    "sentence": "We saw ___.",
    "answer": "the little brown dog",
    "wrong": [
      "the dog little brown",
      "the little dog brown"
    ]
  },
  {
    "prompt": "Describe the cat as sleepy and black. Put sleepy before black.",
    "sentence": "We saw ___.",
    "answer": "the sleepy black cat",
    "wrong": [
      "the cat sleepy black",
      "the sleepy cat black"
    ]
  },
  {
    "prompt": "Describe the bird as tiny and yellow. Put tiny before yellow.",
    "sentence": "We saw ___.",
    "answer": "the tiny yellow bird",
    "wrong": [
      "the bird tiny yellow",
      "the tiny bird yellow"
    ]
  },
  {
    "prompt": "Describe the bag as big and blue. Put big before blue.",
    "sentence": "We saw ___.",
    "answer": "the big blue bag",
    "wrong": [
      "the bag big blue",
      "the big bag blue"
    ]
  },
  {
    "prompt": "Describe the hat as soft and green. Put soft before green.",
    "sentence": "We saw ___.",
    "answer": "the soft green hat",
    "wrong": [
      "the hat soft green",
      "the soft hat green"
    ]
  },
  {
    "prompt": "Describe the box as old and wooden. Put old before wooden.",
    "sentence": "We saw ___.",
    "answer": "the old wooden box",
    "wrong": [
      "the box old wooden",
      "the old box wooden"
    ]
  },
  {
    "prompt": "Describe the ball as round and orange. Put round before orange.",
    "sentence": "We saw ___.",
    "answer": "the round orange ball",
    "wrong": [
      "the ball round orange",
      "the round ball orange"
    ]
  },
  {
    "prompt": "Describe the flower as tall and pink. Put tall before pink.",
    "sentence": "We saw ___.",
    "answer": "the tall pink flower",
    "wrong": [
      "the flower tall pink",
      "the tall flower pink"
    ]
  },
  {
    "prompt": "Describe the coat as warm and purple. Put warm before purple.",
    "sentence": "We saw ___.",
    "answer": "the warm purple coat",
    "wrong": [
      "the coat warm purple",
      "the warm coat purple"
    ]
  },
  {
    "prompt": "Describe the sock as long and stripy. Put long before stripy.",
    "sentence": "We saw ___.",
    "answer": "the long stripy sock",
    "wrong": [
      "the sock long stripy",
      "the long sock stripy"
    ]
  },
  {
    "prompt": "Describe the cake as small and sweet. Put small before sweet.",
    "sentence": "We saw ___.",
    "answer": "the small sweet cake",
    "wrong": [
      "the cake small sweet",
      "the small cake sweet"
    ]
  },
  {
    "prompt": "Describe the tree as tall and leafy. Put tall before leafy.",
    "sentence": "We saw ___.",
    "answer": "the tall leafy tree",
    "wrong": [
      "the tree tall leafy",
      "the tall tree leafy"
    ]
  },
  {
    "prompt": "Describe the cup as little and white. Put little before white.",
    "sentence": "We saw ___.",
    "answer": "the little white cup",
    "wrong": [
      "the cup little white",
      "the little cup white"
    ]
  },
  {
    "prompt": "Describe the book as thick and heavy. Put thick before heavy.",
    "sentence": "We saw ___.",
    "answer": "the thick heavy book",
    "wrong": [
      "the book thick heavy",
      "the thick book heavy"
    ]
  }
];
export function buildQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng);
}
