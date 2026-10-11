import { sentenceQuestions } from "./year2Practice.js";

/** Actions in Progress: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "The progressive form (an action going on) uses is or was with an ing word: she is drumming; he was shouting.";
export const BANK = [
  {
    "prompt": "Say what Amara is doing now. Use is with an ing word.",
    "sentence": "Amara ___.",
    "answer": "is drawing",
    "wrong": [
      "was drawing",
      "is draw"
    ]
  },
  {
    "prompt": "Say what Leo was doing yesterday. Use was with an ing word.",
    "sentence": "Leo ___.",
    "answer": "was running",
    "wrong": [
      "is running",
      "was runn"
    ]
  },
  {
    "prompt": "Say what Priya is doing now. Use is with an ing word.",
    "sentence": "Priya ___.",
    "answer": "is climbing",
    "wrong": [
      "was climbing",
      "is climb"
    ]
  },
  {
    "prompt": "Say what Zayn was doing yesterday. Use was with an ing word.",
    "sentence": "Zayn ___.",
    "answer": "was painting",
    "wrong": [
      "is painting",
      "was paint"
    ]
  },
  {
    "prompt": "Say what Ellie is doing now. Use is with an ing word.",
    "sentence": "Ellie ___.",
    "answer": "is singing",
    "wrong": [
      "was singing",
      "is sing"
    ]
  },
  {
    "prompt": "Say what Biscuit was doing yesterday. Use was with an ing word.",
    "sentence": "Biscuit ___.",
    "answer": "was sleeping",
    "wrong": [
      "is sleeping",
      "was sleep"
    ]
  },
  {
    "prompt": "Say what Amara was doing yesterday. Use was with an ing word.",
    "sentence": "Amara ___.",
    "answer": "was reading",
    "wrong": [
      "is reading",
      "was read"
    ]
  },
  {
    "prompt": "Say what Leo is doing now. Use is with an ing word.",
    "sentence": "Leo ___.",
    "answer": "is drumming",
    "wrong": [
      "was drumming",
      "is drumm"
    ]
  },
  {
    "prompt": "Say what Priya was doing yesterday. Use was with an ing word.",
    "sentence": "Priya ___.",
    "answer": "was dancing",
    "wrong": [
      "is dancing",
      "was danc"
    ]
  },
  {
    "prompt": "Say what Zayn is doing now. Use is with an ing word.",
    "sentence": "Zayn ___.",
    "answer": "is building",
    "wrong": [
      "was building",
      "is build"
    ]
  },
  {
    "prompt": "Say what Ellie was doing yesterday. Use was with an ing word.",
    "sentence": "Ellie ___.",
    "answer": "was helping",
    "wrong": [
      "is helping",
      "was help"
    ]
  },
  {
    "prompt": "Say what Biscuit is doing now. Use is with an ing word.",
    "sentence": "Biscuit ___.",
    "answer": "is barking",
    "wrong": [
      "was barking",
      "is bark"
    ]
  },
  {
    "prompt": "Say what Amara is doing now. Use is with an ing word.",
    "sentence": "Amara ___.",
    "answer": "is writing",
    "wrong": [
      "was writing",
      "is writ"
    ]
  },
  {
    "prompt": "Say what Leo was doing yesterday. Use was with an ing word.",
    "sentence": "Leo ___.",
    "answer": "was shouting",
    "wrong": [
      "is shouting",
      "was shout"
    ]
  },
  {
    "prompt": "Say what Priya is doing now. Use is with an ing word.",
    "sentence": "Priya ___.",
    "answer": "is swimming",
    "wrong": [
      "was swimming",
      "is swimm"
    ]
  }
];
export function buildQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng);
}
