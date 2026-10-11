import { readingQuestions } from "./year2Practice.js";

/** Sequencing Events: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "Look for what happens first, next and last.";
export const BANK = [
  {
    "title": "Amara plants a seed",
    "blocks": [
      {
        "type": "p",
        "text": "First, Amara filled a pot with soil."
      },
      {
        "type": "p",
        "text": "Next, she pushed a seed into the soil."
      },
      {
        "type": "p",
        "text": "Then, she watered the seed."
      },
      {
        "type": "p",
        "text": "After a week, a green shoot appeared."
      }
    ],
    "evidence": [
      "First, Amara filled a pot with soil.",
      "Next, she pushed a seed into the soil.",
      "Then, she watered the seed.",
      "After a week, a green shoot appeared."
    ],
    "questions": [
      {
        "prompt": "What did Amara do first?",
        "answer": "Filled a pot with soil",
        "wrong": [
          "Watered the seed",
          "Saw a shoot"
        ],
        "evidence": "First, Amara filled a pot with soil.",
        "evidencePrompt": "Tap the sentence about the first step."
      },
      {
        "prompt": "What did she do just before watering?",
        "answer": "Pushed a seed into the soil",
        "wrong": [
          "Saw a shoot",
          "Filled a cup"
        ],
        "evidence": "Next, she pushed a seed into the soil.",
        "evidencePrompt": "Tap the sentence about putting in the seed."
      },
      {
        "prompt": "What happened after a week?",
        "answer": "A shoot appeared",
        "wrong": [
          "The pot vanished",
          "Amara bought a seed"
        ],
        "evidence": "After a week, a green shoot appeared.",
        "evidencePrompt": "Tap the sentence about what happened after a week."
      },
      {
        "prompt": "Which pair is in the right order?",
        "answer": "Plant the seed, then water it",
        "wrong": [
          "Water the seed, then fill the empty pot",
          "See a shoot, then plant its seed"
        ],
        "evidence": "Then, she watered the seed.",
        "evidencePrompt": "Tap the sentence about watering."
      }
    ],
    "order": [
      "First, Amara filled a pot with soil.",
      "Next, she pushed a seed into the soil.",
      "Then, she watered the seed."
    ],
    "orderPrompt": "Put the events in the order they happen in the story."
  },
  {
    "title": "Leo makes a sandwich",
    "blocks": [
      {
        "type": "p",
        "text": "First, Leo put bread on a plate."
      },
      {
        "type": "p",
        "text": "Next, he spread butter on the bread."
      },
      {
        "type": "p",
        "text": "Then, he added cheese."
      },
      {
        "type": "p",
        "text": "Last, he put another slice of bread on top."
      }
    ],
    "evidence": [
      "First, Leo put bread on a plate.",
      "Next, he spread butter on the bread.",
      "Then, he added cheese.",
      "Last, he put another slice of bread on top."
    ],
    "questions": [
      {
        "prompt": "What did Leo do first?",
        "answer": "Put bread on a plate",
        "wrong": [
          "Added cheese",
          "Put bread on top"
        ],
        "evidence": "First, Leo put bread on a plate.",
        "evidencePrompt": "Tap the sentence about the first step."
      },
      {
        "prompt": "What did he spread before adding cheese?",
        "answer": "Butter",
        "wrong": [
          "Jam",
          "Paint"
        ],
        "evidence": "Next, he spread butter on the bread.",
        "evidencePrompt": "Tap the sentence about spreading."
      },
      {
        "prompt": "What did he do last?",
        "answer": "Put bread on top",
        "wrong": [
          "Spread butter",
          "Found a plate"
        ],
        "evidence": "Last, he put another slice of bread on top.",
        "evidencePrompt": "Tap the sentence about the final step."
      },
      {
        "prompt": "What happened between spreading butter and putting bread on top?",
        "answer": "He added cheese",
        "wrong": [
          "He washed the plate",
          "He ate the sandwich"
        ],
        "evidence": "Then, he added cheese.",
        "evidencePrompt": "Tap the sentence about adding cheese."
      }
    ],
    "order": [
      "First, Leo put bread on a plate.",
      "Next, he spread butter on the bread.",
      "Then, he added cheese."
    ],
    "orderPrompt": "Put the events in the order they happen in the story."
  },
  {
    "title": "Priya finds her hat",
    "blocks": [
      {
        "type": "p",
        "text": "First, Priya noticed her hat was missing."
      },
      {
        "type": "p",
        "text": "Next, she looked under the chair."
      },
      {
        "type": "p",
        "text": "Then, she found it inside her bag."
      },
      {
        "type": "p",
        "text": "Last, she put it on and went outside."
      }
    ],
    "evidence": [
      "First, Priya noticed her hat was missing.",
      "Next, she looked under the chair.",
      "Then, she found it inside her bag.",
      "Last, she put it on and went outside."
    ],
    "questions": [
      {
        "prompt": "What did Priya notice first?",
        "answer": "Her hat was missing",
        "wrong": [
          "Her bag was wet",
          "Her chair was broken"
        ],
        "evidence": "First, Priya noticed her hat was missing.",
        "evidencePrompt": "Tap the sentence about the problem."
      },
      {
        "prompt": "Where did she look before finding the hat?",
        "answer": "Under the chair",
        "wrong": [
          "In the garden",
          "At school"
        ],
        "evidence": "Next, she looked under the chair.",
        "evidencePrompt": "Tap the sentence about where she looked."
      },
      {
        "prompt": "Where did she find her hat?",
        "answer": "Inside her bag",
        "wrong": [
          "Under a tree",
          "On the chair"
        ],
        "evidence": "Then, she found it inside her bag.",
        "evidencePrompt": "Tap the sentence about finding the hat."
      },
      {
        "prompt": "What did she do after finding her hat?",
        "answer": "Put it on and went outside",
        "wrong": [
          "Bought a new hat",
          "Looked under the chair again"
        ],
        "evidence": "Last, she put it on and went outside.",
        "evidencePrompt": "Tap the sentence about what she did last."
      }
    ],
    "order": [
      "First, Priya noticed her hat was missing.",
      "Next, she looked under the chair.",
      "Then, she found it inside her bag."
    ],
    "orderPrompt": "Put the events in the order they happen in the story."
  }
];
export function buildQuestions(level, rng) {
  return readingQuestions(BANK, RULE, level, rng);
}
