import { sentenceQuestions } from "./year2Practice.js";

/** Capital Letters and End Marks: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "Start a sentence with a capital letter. End a statement with a full stop and a question with a question mark.";
export const BANK = [
  {
    "prompt": "Choose the statement with a capital letter and full stop.",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "The cat is asleep.",
    "wrong": [
      "the cat is asleep.",
      "The cat is asleep?"
    ]
  },
  {
    "prompt": "Choose the question with a capital letter and question mark.",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "Where is Amara?",
    "wrong": [
      "where is Amara?",
      "Where is Amara."
    ]
  },
  {
    "prompt": "Choose the statement with a capital letter and full stop.",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "Leo has a kite.",
    "wrong": [
      "leo has a kite.",
      "Leo has a kite?"
    ]
  },
  {
    "prompt": "Choose the question with a capital letter and question mark.",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "Can Priya swim?",
    "wrong": [
      "can Priya swim?",
      "Can Priya swim."
    ]
  },
  {
    "prompt": "Choose the exclamation with a capital letter and exclamation mark.",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "What a big dog it is!",
    "wrong": [
      "what a big dog it is!",
      "What a big dog it is?"
    ]
  },
  {
    "prompt": "Choose the statement with a capital letter and full stop.",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "Zayn likes painting.",
    "wrong": [
      "zayn likes painting.",
      "Zayn likes painting?"
    ]
  },
  {
    "prompt": "Choose the question with a capital letter and question mark.",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "Is the gate open?",
    "wrong": [
      "is the gate open?",
      "Is the gate open."
    ]
  },
  {
    "prompt": "Choose the exclamation with a capital letter and exclamation mark.",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "How tall the tower is!",
    "wrong": [
      "how tall the tower is!",
      "How tall the tower is?"
    ]
  },
  {
    "prompt": "Choose the statement with a capital letter and full stop.",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "Ellie feeds Biscuit.",
    "wrong": [
      "ellie feeds Biscuit.",
      "Ellie feeds Biscuit?"
    ]
  },
  {
    "prompt": "Choose the question with a capital letter and question mark.",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "When is lunch?",
    "wrong": [
      "when is lunch?",
      "When is lunch."
    ]
  },
  {
    "prompt": "Choose the statement with a capital letter and full stop.",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "We walked to school.",
    "wrong": [
      "we walked to school.",
      "We walked to school?"
    ]
  },
  {
    "prompt": "Choose the question with a capital letter and question mark.",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "Who has the ball?",
    "wrong": [
      "who has the ball?",
      "Who has the ball."
    ]
  },
  {
    "prompt": "Choose the exclamation with a capital letter and exclamation mark.",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "What a cold day it is!",
    "wrong": [
      "what a cold day it is!",
      "What a cold day it is?"
    ]
  },
  {
    "prompt": "Choose the statement with a capital letter and full stop.",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "The bus is blue.",
    "wrong": [
      "the bus is blue.",
      "The bus is blue?"
    ]
  },
  {
    "prompt": "Choose the question with a capital letter and question mark.",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "Why is it wet?",
    "wrong": [
      "why is it wet?",
      "Why is it wet."
    ]
  }
];
export function buildQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng);
}
