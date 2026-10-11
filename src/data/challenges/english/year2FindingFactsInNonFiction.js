import { readingQuestions } from "./year2Practice.js";

/** Finding Facts in Non-Fiction: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "Non-fiction (information writing) gives facts. Headings tell us what a part is about.";
export const BANK = [
  {
    "title": "Growing a bean",
    "blocks": [
      {
        "type": "h",
        "text": "What a bean needs"
      },
      {
        "type": "p",
        "text": "A bean needs water to grow."
      },
      {
        "type": "p",
        "text": "Its roots take in water from the soil."
      },
      {
        "type": "p",
        "text": "Its leaves use light to help the plant grow."
      },
      {
        "type": "p",
        "text": "Give a bean light and enough water, without flooding its pot."
      }
    ],
    "evidence": [
      "A bean needs water to grow.",
      "Its roots take in water from the soil.",
      "Its leaves use light to help the plant grow.",
      "Give a bean light and enough water, without flooding its pot."
    ],
    "questions": [
      {
        "prompt": "What does a bean need to grow?",
        "answer": "Water",
        "wrong": [
          "Paint",
          "A woolly hat"
        ],
        "evidence": "A bean needs water to grow.",
        "evidencePrompt": "Tap the first sentence about a bean needing water."
      },
      {
        "prompt": "Which part takes in water?",
        "answer": "Roots",
        "wrong": [
          "Flowers",
          "The pot"
        ],
        "evidence": "Its roots take in water from the soil.",
        "evidencePrompt": "Tap the sentence about taking in water."
      },
      {
        "prompt": "What do leaves use?",
        "answer": "Light",
        "wrong": [
          "Sandwiches",
          "Stones"
        ],
        "evidence": "Its leaves use light to help the plant grow.",
        "evidencePrompt": "Tap the sentence about leaves."
      },
      {
        "prompt": "Which heading best fits these facts?",
        "answer": "Caring for a bean plant",
        "wrong": [
          "Making a sandwich",
          "Playing football"
        ],
        "evidence": "Give a bean light and enough water, without flooding its pot.",
        "evidencePrompt": "Tap the sentence giving care advice."
      }
    ],
    "order": [
      "A bean needs water to grow.",
      "Its roots take in water from the soil.",
      "Its leaves use light to help the plant grow."
    ],
    "orderPrompt": "Put these facts in the order they appear in the information text."
  },
  {
    "title": "Make a paper fan",
    "blocks": [
      {
        "type": "item",
        "text": "First, get a sheet of paper."
      },
      {
        "type": "item",
        "text": "Next, fold it forwards and backwards into pleats."
      },
      {
        "type": "item",
        "text": "Then, pinch one end together."
      },
      {
        "type": "item",
        "text": "Spread the other end out to make your fan."
      }
    ],
    "evidence": [
      "First, get a sheet of paper.",
      "Next, fold it forwards and backwards into pleats.",
      "Then, pinch one end together.",
      "Spread the other end out to make your fan."
    ],
    "questions": [
      {
        "prompt": "What do you need first?",
        "answer": "A sheet of paper",
        "wrong": [
          "A pot of soil",
          "A glass of milk"
        ],
        "evidence": "First, get a sheet of paper.",
        "evidencePrompt": "Tap the line about what you need."
      },
      {
        "prompt": "How do you fold the paper?",
        "answer": "Forwards and backwards",
        "wrong": [
          "Only into a tiny ball",
          "Not at all"
        ],
        "evidence": "Next, fold it forwards and backwards into pleats.",
        "evidencePrompt": "Tap the line about folding."
      },
      {
        "prompt": "What do you pinch together?",
        "answer": "One end",
        "wrong": [
          "Both your shoes",
          "A flower"
        ],
        "evidence": "Then, pinch one end together.",
        "evidencePrompt": "Tap the instruction about pinching."
      },
      {
        "prompt": "Why should these instructions be in order?",
        "answer": "You need folded paper before finishing the fan",
        "wrong": [
          "The last step must happen first",
          "The order never matters"
        ],
        "evidence": "Spread the other end out to make your fan.",
        "evidencePrompt": "Tap the instruction about finishing the fan."
      }
    ],
    "order": [
      "First, get a sheet of paper.",
      "Next, fold it forwards and backwards into pleats.",
      "Then, pinch one end together."
    ],
    "orderPrompt": "Put the instructions in the order needed to make a fan."
  },
  {
    "title": "A robin",
    "blocks": [
      {
        "type": "p",
        "text": "A robin is a small bird with a red breast."
      },
      {
        "type": "h",
        "text": "Food"
      },
      {
        "type": "p",
        "text": "It eats insects and worms."
      },
      {
        "type": "h",
        "text": "Nests"
      },
      {
        "type": "p",
        "text": "It makes a nest to lay its eggs in."
      },
      {
        "type": "h",
        "text": "Watching birds"
      },
      {
        "type": "p",
        "text": "Watch birds from a distance so you do not disturb them."
      }
    ],
    "evidence": [
      "A robin is a small bird with a red breast.",
      "It eats insects and worms.",
      "It makes a nest to lay its eggs in.",
      "Watch birds from a distance so you do not disturb them."
    ],
    "questions": [
      {
        "prompt": "What colour is a robin’s breast?",
        "answer": "Red",
        "wrong": [
          "Green",
          "Purple"
        ],
        "evidence": "A robin is a small bird with a red breast.",
        "evidencePrompt": "Tap the sentence about what a robin looks like."
      },
      {
        "prompt": "What does a robin eat?",
        "answer": "Insects and worms",
        "wrong": [
          "Only cake",
          "Metal and glass"
        ],
        "evidence": "It eats insects and worms.",
        "evidencePrompt": "Tap the sentence about food."
      },
      {
        "prompt": "Why does a robin make a nest?",
        "answer": "To lay its eggs in",
        "wrong": [
          "To park a car in",
          "To store pencils in"
        ],
        "evidence": "It makes a nest to lay its eggs in.",
        "evidencePrompt": "Tap the sentence about the nest."
      },
      {
        "prompt": "Which heading fits the final line?",
        "answer": "How to watch birds",
        "wrong": [
          "What robins eat",
          "What colour robins are"
        ],
        "evidence": "Watch birds from a distance so you do not disturb them.",
        "evidencePrompt": "Tap the sentence giving advice about watching birds."
      }
    ],
    "order": [
      "A robin is a small bird with a red breast.",
      "It eats insects and worms.",
      "It makes a nest to lay its eggs in."
    ],
    "orderPrompt": "Put these facts in the order they appear in the information text."
  }
];
export function buildQuestions(level, rng) {
  return readingQuestions(BANK, RULE, level, rng);
}
