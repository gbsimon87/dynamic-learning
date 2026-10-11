import { sentenceQuestions } from "./year2Practice.js";

/** Statements, Questions, Exclamations and Commands: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "A statement tells. A question asks. A command tells someone to do something. An exclamation can start with What or How.";
export const BANK = [
  {
    "prompt": "Choose a statement (a telling sentence).",
    "sentence": "___",
    "answer": "The dog is sleeping.",
    "wrong": [
      "Is the dog sleeping?",
      "Let the dog sleep."
    ]
  },
  {
    "prompt": "Choose a question (an asking sentence).",
    "sentence": "___",
    "answer": "Where is my coat?",
    "wrong": [
      "My coat is here.",
      "Put on your coat."
    ]
  },
  {
    "prompt": "Choose a command (tell someone what to do).",
    "sentence": "___",
    "answer": "Close the door.",
    "wrong": [
      "The door is closed.",
      "Is the door closed?"
    ]
  },
  {
    "prompt": "Choose an exclamation starting with What.",
    "sentence": "___",
    "answer": "What a tall tree it is!",
    "wrong": [
      "The tree is tall.",
      "Is the tree tall?"
    ]
  },
  {
    "prompt": "Choose an exclamation starting with How.",
    "sentence": "___",
    "answer": "How bright the stars are!",
    "wrong": [
      "The stars are bright.",
      "Are the stars bright?"
    ]
  },
  {
    "prompt": "Choose a question (an asking sentence).",
    "sentence": "___",
    "answer": "Can you hear the bell?",
    "wrong": [
      "You can hear the bell.",
      "Listen to the bell."
    ]
  },
  {
    "prompt": "Choose a statement (a telling sentence).",
    "sentence": "___",
    "answer": "Amara has a green bag.",
    "wrong": [
      "Does Amara have a green bag?",
      "Bring Amara her green bag."
    ]
  },
  {
    "prompt": "Choose a command (tell someone what to do).",
    "sentence": "___",
    "answer": "Please wash your hands.",
    "wrong": [
      "Your hands are clean.",
      "Are your hands clean?"
    ]
  },
  {
    "prompt": "Choose an exclamation starting with What.",
    "sentence": "___",
    "answer": "What a lovely day it is!",
    "wrong": [
      "The day is lovely.",
      "Is the day lovely?"
    ]
  },
  {
    "prompt": "Choose a question (an asking sentence).",
    "sentence": "___",
    "answer": "When does the bus arrive?",
    "wrong": [
      "The bus arrives at noon.",
      "Wait for the bus."
    ]
  },
  {
    "prompt": "Choose a statement (a telling sentence).",
    "sentence": "___",
    "answer": "Biscuit likes his ball.",
    "wrong": [
      "Does Biscuit like his ball?",
      "Give Biscuit his ball."
    ]
  },
  {
    "prompt": "Choose a command (tell someone what to do).",
    "sentence": "___",
    "answer": "Put the books on the shelf.",
    "wrong": [
      "The books are on the shelf.",
      "Are the books on the shelf?"
    ]
  },
  {
    "prompt": "Choose an exclamation starting with How.",
    "sentence": "___",
    "answer": "How cold the water is!",
    "wrong": [
      "The water is cold.",
      "Is the water cold?"
    ]
  },
  {
    "prompt": "Choose a question (an asking sentence).",
    "sentence": "___",
    "answer": "Why is Leo laughing?",
    "wrong": [
      "Leo is laughing.",
      "Make Leo laugh."
    ]
  },
  {
    "prompt": "Choose a command (tell someone what to do).",
    "sentence": "___",
    "answer": "Keep off the grass.",
    "wrong": [
      "The grass is wet.",
      "Is the grass wet?"
    ]
  }
];
export function buildQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng);
}
