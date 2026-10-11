import { sentenceQuestions } from "./year2Practice.js";

/** Planning and Building Stories: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "Plan a story: who, where, what happens first and what happens next.";
export const BANK = [
  {
    "prompt": "Plan: Amara is in the garden. First, Amara found a seed. Next, Amara planted it. Build the next sentence.",
    "sentence": "___",
    "answer": "Then Amara planted it.",
    "wrong": [
      "Then Amara found a seed.",
      "Then Amara went to the moon."
    ]
  },
  {
    "prompt": "Plan: Leo is in the park. First, Leo lost a ball. Next, Leo found it under a bench. Build the next sentence.",
    "sentence": "___",
    "answer": "Then Leo found it under a bench.",
    "wrong": [
      "Then Leo lost a ball.",
      "Then Leo went to the moon."
    ]
  },
  {
    "prompt": "Plan: Priya is at the beach. First, Priya found a shell. Next, Priya showed it to Ellie. Build the next sentence.",
    "sentence": "___",
    "answer": "Then Priya showed it to Ellie.",
    "wrong": [
      "Then Priya found a shell.",
      "Then Priya went to the moon."
    ]
  },
  {
    "prompt": "Plan: Zayn is in the classroom. First, Zayn drew a dragon. Next, Zayn coloured it green. Build the next sentence.",
    "sentence": "___",
    "answer": "Then Zayn coloured it green.",
    "wrong": [
      "Then Zayn drew a dragon.",
      "Then Zayn went to the moon."
    ]
  },
  {
    "prompt": "Plan: Ellie is in the kitchen. First, Ellie made a sandwich. Next, Ellie shared it with Leo. Build the next sentence.",
    "sentence": "___",
    "answer": "Then Ellie shared it with Leo.",
    "wrong": [
      "Then Ellie made a sandwich.",
      "Then Ellie went to the moon."
    ]
  },
  {
    "prompt": "Plan: Amara is in the library. First, Amara chose a book. Next, Amara read it at home. Build the next sentence.",
    "sentence": "___",
    "answer": "Then Amara read it at home.",
    "wrong": [
      "Then Amara chose a book.",
      "Then Amara went to the moon."
    ]
  },
  {
    "prompt": "Plan: Leo is in the playground. First, Leo met Priya. Next, Leo played a game with her. Build the next sentence.",
    "sentence": "___",
    "answer": "Then Leo played a game with her.",
    "wrong": [
      "Then Leo met Priya.",
      "Then Leo went to the moon."
    ]
  },
  {
    "prompt": "Plan: Priya is in the garden. First, Priya saw a beetle. Next, Priya watched it on a leaf. Build the next sentence.",
    "sentence": "___",
    "answer": "Then Priya watched it on a leaf.",
    "wrong": [
      "Then Priya saw a beetle.",
      "Then Priya went to the moon."
    ]
  },
  {
    "prompt": "Plan: Zayn is in the park. First, Zayn flew a kite. Next, Zayn packed it away. Build the next sentence.",
    "sentence": "___",
    "answer": "Then Zayn packed it away.",
    "wrong": [
      "Then Zayn flew a kite.",
      "Then Zayn went to the moon."
    ]
  },
  {
    "prompt": "Plan: Ellie is in the hall. First, Ellie found a lost coat. Next, Ellie gave it to the teacher. Build the next sentence.",
    "sentence": "___",
    "answer": "Then Ellie gave it to the teacher.",
    "wrong": [
      "Then Ellie found a lost coat.",
      "Then Ellie went to the moon."
    ]
  },
  {
    "prompt": "Plan: Amara is at the beach. First, Amara built a sandcastle. Next, Amara decorated it with shells. Build the next sentence.",
    "sentence": "___",
    "answer": "Then Amara decorated it with shells.",
    "wrong": [
      "Then Amara built a sandcastle.",
      "Then Amara went to the moon."
    ]
  },
  {
    "prompt": "Plan: Leo is in the kitchen. First, Leo washed an apple. Next, Leo ate it. Build the next sentence.",
    "sentence": "___",
    "answer": "Then Leo ate it.",
    "wrong": [
      "Then Leo washed an apple.",
      "Then Leo went to the moon."
    ]
  },
  {
    "prompt": "Plan: Priya is in the classroom. First, Priya built a tower. Next, Priya showed it to Amara. Build the next sentence.",
    "sentence": "___",
    "answer": "Then Priya showed it to Amara.",
    "wrong": [
      "Then Priya built a tower.",
      "Then Priya went to the moon."
    ]
  },
  {
    "prompt": "Plan: Zayn is in the garden. First, Zayn filled a bird bath. Next, Zayn watched a robin drink. Build the next sentence.",
    "sentence": "___",
    "answer": "Then Zayn watched a robin drink.",
    "wrong": [
      "Then Zayn filled a bird bath.",
      "Then Zayn went to the moon."
    ]
  },
  {
    "prompt": "Plan: Ellie is in the park. First, Ellie threw a ball. Next, Ellie watched Biscuit fetch it. Build the next sentence.",
    "sentence": "___",
    "answer": "Then Ellie watched Biscuit fetch it.",
    "wrong": [
      "Then Ellie threw a ball.",
      "Then Ellie went to the moon."
    ]
  }
];
export function buildQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng);
}
