import { wordQuestions } from "./year4Practice.js";
/** The zhun Ending: docs/curriculum/year-3-and-4-english.md, Year 4 mapping. */
export const RULE = "The ending sounding like “zhun” is spelt sion. Say division, invasion and decision to hear it.";
export const BANK = [
  {
    "word": "division",
    "meaning": "sharing into parts",
    "sentence": "We practised ___ in maths.",
    "wrong": [
      "divition",
      "divission"
    ]
  },
  {
    "word": "invasion",
    "meaning": "entering a place by force",
    "sentence": "The legend describes an ___.",
    "wrong": [
      "invation",
      "invassion"
    ]
  },
  {
    "word": "confusion",
    "meaning": "not understanding clearly",
    "sentence": "The muddled map caused ___.",
    "wrong": [
      "confution",
      "confussion"
    ]
  },
  {
    "word": "decision",
    "meaning": "a choice you make",
    "sentence": "Ellie made a ___ about the costume.",
    "wrong": [
      "decition",
      "decission"
    ]
  },
  {
    "word": "collision",
    "meaning": "two things crashing together",
    "sentence": "The toy cars had a ___.",
    "wrong": [
      "collition",
      "collission"
    ]
  },
  {
    "word": "television",
    "meaning": "a screen for watching programmes",
    "sentence": "Leo watched a nature programme on ___.",
    "wrong": [
      "televition",
      "televison"
    ]
  },
  {
    "word": "revision",
    "meaning": "studying something again",
    "sentence": "Priya did some ___ before the quiz.",
    "wrong": [
      "revition",
      "revission"
    ]
  },
  {
    "word": "precision",
    "meaning": "being very exact",
    "sentence": "The model was built with great ___.",
    "wrong": [
      "precition",
      "precission"
    ]
  },
  {
    "word": "vision",
    "meaning": "the ability to see",
    "sentence": "Owls have excellent night ___.",
    "wrong": [
      "vition",
      "vission"
    ]
  },
  {
    "word": "occasion",
    "meaning": "a special event or time",
    "sentence": "The party was a happy ___.",
    "wrong": [
      "occation",
      "occassion"
    ]
  },
  {
    "word": "explosion",
    "meaning": "a sudden loud bursting",
    "sentence": "The film showed a noisy ___.",
    "wrong": [
      "explotion",
      "explossion"
    ]
  },
  {
    "word": "erosion",
    "meaning": "wearing away by water or wind",
    "sentence": "The cliff was damaged by ___.",
    "wrong": [
      "erotion",
      "erossion"
    ]
  },
  {
    "word": "conclusion",
    "meaning": "a final idea or ending",
    "sentence": "Zayn wrote a ___ to his report.",
    "wrong": [
      "conclution",
      "conclussion"
    ]
  },
  {
    "word": "inclusion",
    "meaning": "making someone part of a group",
    "sentence": "The club encouraged everyone’s ___.",
    "wrong": [
      "inclution",
      "inclussion"
    ]
  },
  {
    "word": "illusion",
    "meaning": "something that seems real but is not",
    "sentence": "The mirror created an ___.",
    "wrong": [
      "illution",
      "illussion"
    ]
  }
];
export function buildTheZhunEndingQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
