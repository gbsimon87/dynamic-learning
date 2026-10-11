import { sentenceQuestions } from "./year2Practice.js";

/** Writing about Real Events: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "Write facts about a real event. Say what happened and when.";
export const BANK = [
  {
    "prompt": "Class record: on Monday, we planted beans. Choose the sentence that matches the record.",
    "sentence": "___",
    "answer": "On Monday, we planted beans.",
    "wrong": [
      "On Monday, we painted a fence.",
      "On Monday, we will plant."
    ]
  },
  {
    "prompt": "Class record: on Tuesday, we visited the library. Choose the sentence that matches the record.",
    "sentence": "___",
    "answer": "On Tuesday, we visited the library.",
    "wrong": [
      "On Tuesday, we went swimming.",
      "On Tuesday, we will visit."
    ]
  },
  {
    "prompt": "Class record: on Wednesday, we played football. Choose the sentence that matches the record.",
    "sentence": "___",
    "answer": "On Wednesday, we played football.",
    "wrong": [
      "On Wednesday, we baked bread.",
      "On Wednesday, we will play."
    ]
  },
  {
    "prompt": "Class record: on Thursday, we made paper fans. Choose the sentence that matches the record.",
    "sentence": "___",
    "answer": "On Thursday, we made paper fans.",
    "wrong": [
      "On Thursday, we flew to the moon.",
      "On Thursday, we will make."
    ]
  },
  {
    "prompt": "Class record: on Friday, we sang in assembly. Choose the sentence that matches the record.",
    "sentence": "___",
    "answer": "On Friday, we sang in assembly.",
    "wrong": [
      "On Friday, we went camping.",
      "On Friday, we will sing."
    ]
  },
  {
    "prompt": "Class record: on Saturday, we walked in the park. Choose the sentence that matches the record.",
    "sentence": "___",
    "answer": "On Saturday, we walked in the park.",
    "wrong": [
      "On Saturday, we visited a castle.",
      "On Saturday, we will walk."
    ]
  },
  {
    "prompt": "Class record: on Sunday, we baked a cake. Choose the sentence that matches the record.",
    "sentence": "___",
    "answer": "On Sunday, we baked a cake.",
    "wrong": [
      "On Sunday, we climbed a mountain.",
      "On Sunday, we will bake."
    ]
  },
  {
    "prompt": "Class record: on Monday, we read a poem. Choose the sentence that matches the record.",
    "sentence": "___",
    "answer": "On Monday, we read a poem.",
    "wrong": [
      "On Monday, we washed a car.",
      "On Monday, we will read."
    ]
  },
  {
    "prompt": "Class record: on Tuesday, we counted seeds. Choose the sentence that matches the record.",
    "sentence": "___",
    "answer": "On Tuesday, we counted seeds.",
    "wrong": [
      "On Tuesday, we played tennis.",
      "On Tuesday, we will count."
    ]
  },
  {
    "prompt": "Class record: on Wednesday, we drew birds. Choose the sentence that matches the record.",
    "sentence": "___",
    "answer": "On Wednesday, we drew birds.",
    "wrong": [
      "On Wednesday, we made a kite.",
      "On Wednesday, we will draw."
    ]
  },
  {
    "prompt": "Class record: on Thursday, we built a model. Choose the sentence that matches the record.",
    "sentence": "___",
    "answer": "On Thursday, we built a model.",
    "wrong": [
      "On Thursday, we went fishing.",
      "On Thursday, we will build."
    ]
  },
  {
    "prompt": "Class record: on Friday, we shared fruit. Choose the sentence that matches the record.",
    "sentence": "___",
    "answer": "On Friday, we shared fruit.",
    "wrong": [
      "On Friday, we planted trees.",
      "On Friday, we will share."
    ]
  },
  {
    "prompt": "Class record: on Saturday, we fed the ducks. Choose the sentence that matches the record.",
    "sentence": "___",
    "answer": "On Saturday, we fed the ducks.",
    "wrong": [
      "On Saturday, we rode a horse.",
      "On Saturday, we will feed."
    ]
  },
  {
    "prompt": "Class record: on Sunday, we visited Grandma. Choose the sentence that matches the record.",
    "sentence": "___",
    "answer": "On Sunday, we visited Grandma.",
    "wrong": [
      "On Sunday, we went to school.",
      "On Sunday, we will visit."
    ]
  },
  {
    "prompt": "Class record: on Monday, we measured shadows. Choose the sentence that matches the record.",
    "sentence": "___",
    "answer": "On Monday, we measured shadows.",
    "wrong": [
      "On Monday, we made soup.",
      "On Monday, we will measure."
    ]
  }
];
export function buildQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng);
}
