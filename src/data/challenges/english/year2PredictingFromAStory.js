import { readingQuestions } from "./year2Practice.js";

/** Predicting from a Story: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "A prediction (what might happen next) uses clues. Choose what the clues make most likely.";
export const BANK = [
  {
    "title": "A rainy walk",
    "blocks": [
      {
        "type": "p",
        "text": "Amara and Leo were walking to the park."
      },
      {
        "type": "p",
        "text": "Dark clouds covered the sky and rain began to drip."
      },
      {
        "type": "p",
        "text": "Amara opened her umbrella."
      },
      {
        "type": "p",
        "text": "Leo stepped closer to her."
      }
    ],
    "evidence": [
      "Amara and Leo were walking to the park.",
      "Dark clouds covered the sky and rain began to drip.",
      "Amara opened her umbrella.",
      "Leo stepped closer to her."
    ],
    "questions": [
      {
        "prompt": "What will Leo most likely do next?",
        "answer": "Share Amara’s umbrella",
        "wrong": [
          "Build a snowman",
          "Put on swimming goggles"
        ],
        "evidence": "Leo stepped closer to her.",
        "evidencePrompt": "Tap the sentence about Leo moving closer to Amara."
      },
      {
        "prompt": "What weather clue matters?",
        "answer": "Rain began to drip",
        "wrong": [
          "The sun was very hot",
          "Snow covered the road"
        ],
        "evidence": "Dark clouds covered the sky and rain began to drip.",
        "evidencePrompt": "Tap the sentence giving the weather clue."
      },
      {
        "prompt": "What did Amara do to keep dry?",
        "answer": "Opened her umbrella",
        "wrong": [
          "Took off her coat",
          "Jumped into a pond"
        ],
        "evidence": "Amara opened her umbrella.",
        "evidencePrompt": "Tap the sentence about keeping dry."
      },
      {
        "prompt": "Why is sharing the umbrella a good prediction?",
        "answer": "Leo moved closer while it rained",
        "wrong": [
          "The story says it was snowing",
          "Leo was at home in bed"
        ],
        "evidence": "Leo stepped closer to her.",
        "evidencePrompt": "Tap the clue supporting the prediction."
      }
    ],
    "order": [
      "Amara and Leo were walking to the park.",
      "Dark clouds covered the sky and rain began to drip.",
      "Amara opened her umbrella."
    ],
    "orderPrompt": "Put the events in the order they happen in the story."
  },
  {
    "title": "Biscuit’s ball",
    "blocks": [
      {
        "type": "p",
        "text": "Ellie picked up Biscuit’s favourite ball."
      },
      {
        "type": "p",
        "text": "Biscuit wagged his tail and watched her hand."
      },
      {
        "type": "p",
        "text": "Ellie threw the ball across the grass."
      },
      {
        "type": "p",
        "text": "Biscuit sprang forwards."
      }
    ],
    "evidence": [
      "Ellie picked up Biscuit’s favourite ball.",
      "Biscuit wagged his tail and watched her hand.",
      "Ellie threw the ball across the grass.",
      "Biscuit sprang forwards."
    ],
    "questions": [
      {
        "prompt": "What will Biscuit most likely do next?",
        "answer": "Chase the ball",
        "wrong": [
          "Read a book",
          "Go to school"
        ],
        "evidence": "Biscuit sprang forwards.",
        "evidencePrompt": "Tap the sentence showing Biscuit moving after the throw."
      },
      {
        "prompt": "How do we know Biscuit wants the ball?",
        "answer": "He watches it and wags his tail",
        "wrong": [
          "He has gone to sleep",
          "He hides behind the house"
        ],
        "evidence": "Biscuit wagged his tail and watched her hand.",
        "evidencePrompt": "Tap the clue that Biscuit is interested."
      },
      {
        "prompt": "Where did Ellie throw the ball?",
        "answer": "Across the grass",
        "wrong": [
          "Into a cupboard",
          "Onto a roof"
        ],
        "evidence": "Ellie threw the ball across the grass.",
        "evidencePrompt": "Tap the sentence about throwing the ball."
      },
      {
        "prompt": "Which prediction has support from the text?",
        "answer": "Biscuit will run after the ball",
        "wrong": [
          "Ellie will bake a cake now",
          "Biscuit will paint the fence"
        ],
        "evidence": "Biscuit sprang forwards.",
        "evidencePrompt": "Tap the action supporting a chase."
      }
    ],
    "order": [
      "Ellie picked up Biscuit’s favourite ball.",
      "Biscuit wagged his tail and watched her hand.",
      "Ellie threw the ball across the grass."
    ],
    "orderPrompt": "Put the events in the order they happen in the story."
  },
  {
    "title": "The empty lunch box",
    "blocks": [
      {
        "type": "p",
        "text": "Priya opened her lunch box at noon."
      },
      {
        "type": "p",
        "text": "Inside were only crumbs."
      },
      {
        "type": "p",
        "text": "She looked at the school dinner counter."
      },
      {
        "type": "p",
        "text": "She picked up a tray and joined its queue."
      }
    ],
    "evidence": [
      "Priya opened her lunch box at noon.",
      "Inside were only crumbs.",
      "She looked at the school dinner counter.",
      "She picked up a tray and joined its queue."
    ],
    "questions": [
      {
        "prompt": "What will Priya most likely do next?",
        "answer": "Get a school dinner",
        "wrong": [
          "Go swimming",
          "Plant a tree"
        ],
        "evidence": "She picked up a tray and joined its queue.",
        "evidencePrompt": "Tap the sentence about Priya joining a queue."
      },
      {
        "prompt": "Why might Priya need a school dinner?",
        "answer": "Her lunch box has only crumbs",
        "wrong": [
          "She has three full sandwiches",
          "She has already gone home"
        ],
        "evidence": "Inside were only crumbs.",
        "evidencePrompt": "Tap the sentence about her empty lunch box."
      },
      {
        "prompt": "Where did Priya look?",
        "answer": "At the school dinner counter",
        "wrong": [
          "At the moon",
          "At the football pitch"
        ],
        "evidence": "She looked at the school dinner counter.",
        "evidencePrompt": "Tap the sentence about where Priya looked."
      },
      {
        "prompt": "Why is getting dinner a sensible prediction?",
        "answer": "She joined the dinner queue with a tray",
        "wrong": [
          "She packed a full lunch",
          "She went to the library"
        ],
        "evidence": "She picked up a tray and joined its queue.",
        "evidencePrompt": "Tap the strongest clue about what comes next."
      }
    ],
    "order": [
      "Priya opened her lunch box at noon.",
      "Inside were only crumbs.",
      "She looked at the school dinner counter."
    ],
    "orderPrompt": "Put the events in the order they happen in the story."
  }
];
export function buildQuestions(level, rng) {
  return readingQuestions(BANK, RULE, level, rng);
}
