import { sentenceQuestions } from "./year4Practice.js";
/** Punctuating Direct Speech: docs/curriculum/year-3-and-4-english.md, Year 4 mapping. */
export const RULE = "Direct speech (the words spoken) needs inverted commas, a comma after said, and its end mark inside the closing inverted commas.";
export const BANK = [
  {
    "sentence": "Leo said___",
    "answer": ", “I found the map.”",
    "wrong": [
      " “I found the map.”",
      ", “I found the map”."
    ],
    "prompt": "Complete the direct speech with all its punctuation.",
    "hint": "Check the comma before the opening speech mark and the end mark before the closing speech mark."
  },
  {
    "sentence": "Priya said___",
    "answer": ", “Where is my coat?”",
    "wrong": [
      " “Where is my coat?”",
      ", “Where is my coat”?"
    ],
    "prompt": "Complete the direct speech with all its punctuation.",
    "hint": "Check the comma before the opening speech mark and the end mark before the closing speech mark."
  },
  {
    "sentence": "Ellie said___",
    "answer": ", “Come back, Biscuit!”",
    "wrong": [
      " “Come back, Biscuit!”",
      ", “Come back, Biscuit”!"
    ],
    "prompt": "Complete the direct speech with all its punctuation.",
    "hint": "Check the comma before the opening speech mark and the end mark before the closing speech mark."
  },
  {
    "sentence": "Zayn said___",
    "answer": ", “The library is open.”",
    "wrong": [
      " “The library is open.”",
      ", “The library is open”."
    ],
    "prompt": "Complete the direct speech with all its punctuation.",
    "hint": "Check the comma before the opening speech mark and the end mark before the closing speech mark."
  },
  {
    "sentence": "Amara said___",
    "answer": ", “Can I help you?”",
    "wrong": [
      " “Can I help you?”",
      ", “Can I help you”?"
    ],
    "prompt": "Complete the direct speech with all its punctuation.",
    "hint": "Check the comma before the opening speech mark and the end mark before the closing speech mark."
  },
  {
    "sentence": "Leo said___",
    "answer": ", “Watch out!”",
    "wrong": [
      " “Watch out!”",
      ", “Watch out”!"
    ],
    "prompt": "Complete the direct speech with all its punctuation.",
    "hint": "Check the comma before the opening speech mark and the end mark before the closing speech mark."
  },
  {
    "sentence": "Priya said___",
    "answer": ", “I like this story.”",
    "wrong": [
      " “I like this story.”",
      ", “I like this story”."
    ],
    "prompt": "Complete the direct speech with all its punctuation.",
    "hint": "Check the comma before the opening speech mark and the end mark before the closing speech mark."
  },
  {
    "sentence": "Ellie said___",
    "answer": ", “Who has the key?”",
    "wrong": [
      " “Who has the key?”",
      ", “Who has the key”?"
    ],
    "prompt": "Complete the direct speech with all its punctuation.",
    "hint": "Check the comma before the opening speech mark and the end mark before the closing speech mark."
  },
  {
    "sentence": "Zayn said___",
    "answer": ", “What a huge dragon!”",
    "wrong": [
      " “What a huge dragon!”",
      ", “What a huge dragon”!"
    ],
    "prompt": "Complete the direct speech with all its punctuation.",
    "hint": "Check the comma before the opening speech mark and the end mark before the closing speech mark."
  },
  {
    "sentence": "Amara said___",
    "answer": ", “We can share the crayons.”",
    "wrong": [
      " “We can share the crayons.”",
      ", “We can share the crayons”."
    ],
    "prompt": "Complete the direct speech with all its punctuation.",
    "hint": "Check the comma before the opening speech mark and the end mark before the closing speech mark."
  },
  {
    "sentence": "Leo said___",
    "answer": ", “Are we there yet?”",
    "wrong": [
      " “Are we there yet?”",
      ", “Are we there yet”?"
    ],
    "prompt": "Complete the direct speech with all its punctuation.",
    "hint": "Check the comma before the opening speech mark and the end mark before the closing speech mark."
  },
  {
    "sentence": "Priya said___",
    "answer": ", “Stop at the gate!”",
    "wrong": [
      " “Stop at the gate!”",
      ", “Stop at the gate”!"
    ],
    "prompt": "Complete the direct speech with all its punctuation.",
    "hint": "Check the comma before the opening speech mark and the end mark before the closing speech mark."
  },
  {
    "sentence": "Ellie said___",
    "answer": ", “The puppy is asleep.”",
    "wrong": [
      " “The puppy is asleep.”",
      ", “The puppy is asleep”."
    ],
    "prompt": "Complete the direct speech with all its punctuation.",
    "hint": "Check the comma before the opening speech mark and the end mark before the closing speech mark."
  },
  {
    "sentence": "Zayn said___",
    "answer": ", “Is this your scarf?”",
    "wrong": [
      " “Is this your scarf?”",
      ", “Is this your scarf”?"
    ],
    "prompt": "Complete the direct speech with all its punctuation.",
    "hint": "Check the comma before the opening speech mark and the end mark before the closing speech mark."
  },
  {
    "sentence": "Amara said___",
    "answer": ", “Hooray, we won!”",
    "wrong": [
      " “Hooray, we won!”",
      ", “Hooray, we won”!"
    ],
    "prompt": "Complete the direct speech with all its punctuation.",
    "hint": "Check the comma before the opening speech mark and the end mark before the closing speech mark."
  }
];
export function buildPunctuatingDirectSpeechQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng);
}
