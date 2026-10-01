import { sentenceQuestions } from "./year4Practice.js";
/** Standard English Verbs: docs/curriculum/year-3-and-4-english.md, Year 4 mapping. */
export const RULE = "Standard English uses forms such as we were and I did. Check who is doing the action and when it happens.";
export const BANK = [
  {
    "sentence": "We ___ at the park yesterday.",
    "answer": "were",
    "wrong": [
      "was",
      "is"
    ]
  },
  {
    "sentence": "I ___ my homework last night.",
    "answer": "did",
    "wrong": [
      "done",
      "does"
    ]
  },
  {
    "sentence": "She ___ the whole race yesterday.",
    "answer": "ran",
    "wrong": [
      "run",
      "runned"
    ]
  },
  {
    "sentence": "They ___ a fox on the walk.",
    "answer": "saw",
    "wrong": [
      "seen",
      "seed"
    ]
  },
  {
    "sentence": "Leo has ___ his lunch.",
    "answer": "eaten",
    "wrong": [
      "ate",
      "eated"
    ]
  },
  {
    "sentence": "Priya has ___ the answer.",
    "answer": "written",
    "wrong": [
      "wrote",
      "writed"
    ]
  },
  {
    "sentence": "The children ___ happy today.",
    "answer": "are",
    "wrong": [
      "is",
      "am"
    ]
  },
  {
    "sentence": "I ___ ready to start now.",
    "answer": "am",
    "wrong": [
      "is",
      "are"
    ]
  },
  {
    "sentence": "He ___ to school every day.",
    "answer": "goes",
    "wrong": [
      "go",
      "going"
    ]
  },
  {
    "sentence": "They ___ to school every day.",
    "answer": "go",
    "wrong": [
      "goes",
      "going"
    ]
  },
  {
    "sentence": "Ellie ___ the ball yesterday.",
    "answer": "caught",
    "wrong": [
      "catched",
      "catch"
    ]
  },
  {
    "sentence": "Zayn has ___ a picture.",
    "answer": "drawn",
    "wrong": [
      "drew",
      "drawed"
    ]
  },
  {
    "sentence": "We have ___ the bell.",
    "answer": "heard",
    "wrong": [
      "heared",
      "hear"
    ]
  },
  {
    "sentence": "The dog ___ asleep last night.",
    "answer": "was",
    "wrong": [
      "were",
      "be"
    ]
  },
  {
    "sentence": "She ___ not like cold soup.",
    "answer": "does",
    "wrong": [
      "do",
      "done"
    ]
  },
  {
    "sentence": "The books ___ on the shelf now.",
    "answer": "are",
    "wrong": [
      "is",
      "am"
    ]
  },
  {
    "sentence": "Leo has ___ his coat.",
    "answer": "taken",
    "wrong": [
      "took",
      "taked"
    ]
  },
  {
    "sentence": "I ___ the story yesterday.",
    "answer": "told",
    "wrong": [
      "telled",
      "tell"
    ]
  }
];
export function buildStandardEnglishVerbsQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng);
}
