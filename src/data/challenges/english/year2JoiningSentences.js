import { sentenceQuestions } from "./year2Practice.js";

/** Joining Sentences: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "Joining words connect ideas: and adds, but contrasts, or gives a choice, because gives a reason, if gives a condition, when gives a time, that reports.";
export const BANK = [
  {
    "prompt": "Give the reason for wearing a coat.",
    "sentence": "I wore a coat ___ it was cold.",
    "answer": "because",
    "wrong": [
      "because of",
      "during"
    ]
  },
  {
    "prompt": "Give the reason for getting a drink.",
    "sentence": "Leo got water ___ he was thirsty.",
    "answer": "because",
    "wrong": [
      "because of",
      "during"
    ]
  },
  {
    "prompt": "Give the reason for staying inside.",
    "sentence": "We stayed inside ___ it was raining.",
    "answer": "because",
    "wrong": [
      "because of",
      "during"
    ]
  },
  {
    "prompt": "Say what happens at the time the bell rings.",
    "sentence": "We pack away ___ the bell rings.",
    "answer": "when",
    "wrong": [
      "during",
      "afterwards"
    ]
  },
  {
    "prompt": "Say what happens at the time the sun sets.",
    "sentence": "It gets dark ___ the sun sets.",
    "answer": "when",
    "wrong": [
      "during",
      "afterwards"
    ]
  },
  {
    "prompt": "Say what happens at the time Ellie arrives.",
    "sentence": "Biscuit wags his tail ___ Ellie arrives.",
    "answer": "when",
    "wrong": [
      "during",
      "afterwards"
    ]
  },
  {
    "prompt": "Give a condition: it must be sunny to have the picnic.",
    "sentence": "We will have a picnic ___ it is sunny.",
    "answer": "if",
    "wrong": [
      "unless",
      "despite"
    ]
  },
  {
    "prompt": "Give a condition: the work must be finished before playing.",
    "sentence": "You can play ___ you finish your work.",
    "answer": "if",
    "wrong": [
      "unless",
      "despite"
    ]
  },
  {
    "prompt": "Report what Amara said. Use that.",
    "sentence": "Amara said ___ she likes books.",
    "answer": "that",
    "wrong": [
      "during",
      "because of"
    ]
  },
  {
    "prompt": "Report what Zayn knows. Use that.",
    "sentence": "Zayn knows ___ the gate is open.",
    "answer": "that",
    "wrong": [
      "during",
      "because of"
    ]
  },
  {
    "prompt": "Add two things to the shopping list. Use and.",
    "sentence": "We need bread ___ milk.",
    "answer": "and",
    "wrong": [
      "but",
      "because"
    ]
  },
  {
    "prompt": "Give a choice of two drinks. Use or.",
    "sentence": "Would you like water ___ juice?",
    "answer": "or",
    "wrong": [
      "because",
      "when"
    ]
  },
  {
    "prompt": "Show a contrast. Use but.",
    "sentence": "The box is small ___ it is heavy.",
    "answer": "but",
    "wrong": [
      "because of",
      "during"
    ]
  },
  {
    "prompt": "Add another action. Use and.",
    "sentence": "Priya smiled ___ waved.",
    "answer": "and",
    "wrong": [
      "because",
      "if"
    ]
  },
  {
    "prompt": "Show a contrast. Use but.",
    "sentence": "Leo wanted to play ___ he was too tired.",
    "answer": "but",
    "wrong": [
      "during",
      "because of"
    ]
  }
];
export function buildQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng);
}
