import { sentenceQuestions } from "./year1Practice.js";

/** Year 1: "beginning to punctuate sentences using a capital letter and a full stop, question mark or exclamation mark".
 * Source: docs/curriculum/year-1-english.md and english-appendix-1-year-1.md.
 * 1 supported choice; 2 independent choice; 3 whole-structure work; 4 applied building/spelling.
 */
export const TITLES = [
  "Read the clue.",
  "Try without the rule.",
  "Build it with tiles.",
  "Use what you know."
];
export const BANK = [
  {
    "prompt": "Add the end mark for this clue.",
    "context": "This tells us something.",
    "answer": "Leo has a hat.",
    "wrong": [
      "Leo has a hat?",
      "Leo has a hat!"
    ],
    "caseSensitive": true,
    "speak": "Add the end mark for this clue.",
    "hint": "Is it telling, asking, or shouting?",
    "mark": "."
  },
  {
    "prompt": "Add the end mark for this clue.",
    "context": "This tells us something.",
    "answer": "Amara is at home.",
    "wrong": [
      "Amara is at home?",
      "Amara is at home!"
    ],
    "caseSensitive": true,
    "speak": "Add the end mark for this clue.",
    "hint": "Is it telling, asking, or shouting?",
    "mark": "."
  },
  {
    "prompt": "Add the end mark for this clue.",
    "context": "This tells us something.",
    "answer": "The dog is asleep.",
    "wrong": [
      "The dog is asleep?",
      "The dog is asleep!"
    ],
    "caseSensitive": true,
    "speak": "Add the end mark for this clue.",
    "hint": "Is it telling, asking, or shouting?",
    "mark": "."
  },
  {
    "prompt": "Add the end mark for this clue.",
    "context": "This tells us something.",
    "answer": "We go to school.",
    "wrong": [
      "We go to school?",
      "We go to school!"
    ],
    "caseSensitive": true,
    "speak": "Add the end mark for this clue.",
    "hint": "Is it telling, asking, or shouting?",
    "mark": "."
  },
  {
    "prompt": "Add the end mark for this clue.",
    "context": "This tells us something.",
    "answer": "Priya likes peas.",
    "wrong": [
      "Priya likes peas?",
      "Priya likes peas!"
    ],
    "caseSensitive": true,
    "speak": "Add the end mark for this clue.",
    "hint": "Is it telling, asking, or shouting?",
    "mark": "."
  },
  {
    "prompt": "Add the end mark for this clue.",
    "context": "This asks a question.",
    "answer": "Can you help me?",
    "wrong": [
      "Can you help me.",
      "Can you help me!"
    ],
    "caseSensitive": true,
    "speak": "Add the end mark for this clue.",
    "hint": "Is it telling, asking, or shouting?",
    "mark": "?"
  },
  {
    "prompt": "Add the end mark for this clue.",
    "context": "This asks a question.",
    "answer": "Where is my coat?",
    "wrong": [
      "Where is my coat.",
      "Where is my coat!"
    ],
    "caseSensitive": true,
    "speak": "Add the end mark for this clue.",
    "hint": "Is it telling, asking, or shouting?",
    "mark": "?"
  },
  {
    "prompt": "Add the end mark for this clue.",
    "context": "This asks a question.",
    "answer": "Is it time to go?",
    "wrong": [
      "Is it time to go.",
      "Is it time to go!"
    ],
    "caseSensitive": true,
    "speak": "Add the end mark for this clue.",
    "hint": "Is it telling, asking, or shouting?",
    "mark": "?"
  },
  {
    "prompt": "Add the end mark for this clue.",
    "context": "This asks a question.",
    "answer": "What is your name?",
    "wrong": [
      "What is your name.",
      "What is your name!"
    ],
    "caseSensitive": true,
    "speak": "Add the end mark for this clue.",
    "hint": "Is it telling, asking, or shouting?",
    "mark": "?"
  },
  {
    "prompt": "Add the end mark for this clue.",
    "context": "This asks a question.",
    "answer": "Do you like cake?",
    "wrong": [
      "Do you like cake.",
      "Do you like cake!"
    ],
    "caseSensitive": true,
    "speak": "Add the end mark for this clue.",
    "hint": "Is it telling, asking, or shouting?",
    "mark": "?"
  },
  {
    "prompt": "Add the end mark for this clue.",
    "context": "This is a shout of surprise.",
    "answer": "Wow!",
    "wrong": [
      "Wow.",
      "Wow?"
    ],
    "caseSensitive": true,
    "speak": "Add the end mark for this clue.",
    "hint": "Is it telling, asking, or shouting?",
    "mark": "!"
  },
  {
    "prompt": "Add the end mark for this clue.",
    "context": "This is an urgent shout.",
    "answer": "Help!",
    "wrong": [
      "Help.",
      "Help?"
    ],
    "caseSensitive": true,
    "speak": "Add the end mark for this clue.",
    "hint": "Is it telling, asking, or shouting?",
    "mark": "!"
  },
  {
    "prompt": "Add the end mark for this clue.",
    "context": "This is an urgent shout.",
    "answer": "Stop!",
    "wrong": [
      "Stop.",
      "Stop?"
    ],
    "caseSensitive": true,
    "speak": "Add the end mark for this clue.",
    "hint": "Is it telling, asking, or shouting?",
    "mark": "!"
  },
  {
    "prompt": "Add the end mark for this clue.",
    "context": "This is a happy shout.",
    "answer": "Hooray!",
    "wrong": [
      "Hooray.",
      "Hooray?"
    ],
    "caseSensitive": true,
    "speak": "Add the end mark for this clue.",
    "hint": "Is it telling, asking, or shouting?",
    "mark": "!"
  },
  {
    "prompt": "Add the end mark for this clue.",
    "context": "This is a sudden shout of pain.",
    "answer": "Ouch!",
    "wrong": [
      "Ouch.",
      "Ouch?"
    ],
    "caseSensitive": true,
    "speak": "Add the end mark for this clue.",
    "hint": "Is it telling, asking, or shouting?",
    "mark": "!"
  },
  {
    "prompt": "Add the end mark for this clue.",
    "context": "This is an urgent shout.",
    "answer": "Look out!",
    "wrong": [
      "Look out.",
      "Look out?"
    ],
    "caseSensitive": true,
    "speak": "Add the end mark for this clue.",
    "hint": "Is it telling, asking, or shouting?",
    "mark": "!"
  }
];
export function buildEndingASentence(level, rng) {
  return sentenceQuestions(BANK, "Tell with a full stop. Ask with a question mark. Shout with an exclamation mark.", level, rng);
}
