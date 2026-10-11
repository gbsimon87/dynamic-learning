import { sentenceQuestions } from "./year2Practice.js";

/** Present and Past Tense: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "Tense tells us when. Present tense is now or regularly. Past tense has already happened.";
export const BANK = [
  {
    "prompt": "Write about yesterday. Use the past tense of play.",
    "sentence": "Yesterday, we ___ together.",
    "answer": "played",
    "wrong": [
      "play",
      "plaied"
    ]
  },
  {
    "prompt": "Write about what we do every day. Use the present tense of jump.",
    "sentence": "Every day, we ___ together.",
    "answer": "jump",
    "wrong": [
      "jumped",
      "jumps"
    ]
  },
  {
    "prompt": "Write about yesterday. Use the past tense of look.",
    "sentence": "Yesterday, we ___ together.",
    "answer": "looked",
    "wrong": [
      "look",
      "lookt"
    ]
  },
  {
    "prompt": "Write about what we do every day. Use the present tense of walk.",
    "sentence": "Every day, we ___ together.",
    "answer": "walk",
    "wrong": [
      "walked",
      "walks"
    ]
  },
  {
    "prompt": "Write about yesterday. Use the past tense of help.",
    "sentence": "Yesterday, we ___ together.",
    "answer": "helped",
    "wrong": [
      "help",
      "helpt"
    ]
  },
  {
    "prompt": "Write about what we do every day. Use the present tense of talk.",
    "sentence": "Every day, we ___ together.",
    "answer": "talk",
    "wrong": [
      "talked",
      "talks"
    ]
  },
  {
    "prompt": "Write about yesterday. Use the past tense of wash.",
    "sentence": "Yesterday, we ___ together.",
    "answer": "washed",
    "wrong": [
      "wash",
      "washt"
    ]
  },
  {
    "prompt": "Write about what we do every day. Use the present tense of cook.",
    "sentence": "Every day, we ___ together.",
    "answer": "cook",
    "wrong": [
      "cooked",
      "cooks"
    ]
  },
  {
    "prompt": "Write about yesterday. Use the past tense of paint.",
    "sentence": "Yesterday, we ___ together.",
    "answer": "painted",
    "wrong": [
      "paint",
      "paintt"
    ]
  },
  {
    "prompt": "Write about what we do every day. Use the present tense of open.",
    "sentence": "Every day, we ___ together.",
    "answer": "open",
    "wrong": [
      "opened",
      "opens"
    ]
  },
  {
    "prompt": "Write about yesterday. Use the past tense of close.",
    "sentence": "Yesterday, we ___ together.",
    "answer": "closed",
    "wrong": [
      "close",
      "closd"
    ]
  },
  {
    "prompt": "Write about what we do every day. Use the present tense of smile.",
    "sentence": "Every day, we ___ together.",
    "answer": "smile",
    "wrong": [
      "smiled",
      "smiles"
    ]
  },
  {
    "prompt": "Write about yesterday. Use the past tense of clap.",
    "sentence": "Yesterday, we ___ together.",
    "answer": "clapped",
    "wrong": [
      "clap",
      "claped"
    ]
  },
  {
    "prompt": "Write about what we do every day. Use the present tense of stop.",
    "sentence": "Every day, we ___ together.",
    "answer": "stop",
    "wrong": [
      "stopped",
      "stops"
    ]
  },
  {
    "prompt": "Write about yesterday. Use the past tense of dance.",
    "sentence": "Yesterday, we ___ together.",
    "answer": "danced",
    "wrong": [
      "dance",
      "danct"
    ]
  }
];
export function buildQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng);
}
