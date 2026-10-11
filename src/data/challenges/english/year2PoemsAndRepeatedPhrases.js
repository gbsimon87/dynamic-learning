import { readingQuestions } from "./year2Practice.js";

/** Poems and Repeated Phrases: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "Poems can use rhythm, rhyme and repeated words. Say the lines aloud if you like.";
export const BANK = [
  {
    "title": "Rain on the roof",
    "blocks": [
      {
        "type": "line",
        "text": "Tap, tap, tap on the roof so high,"
      },
      {
        "type": "line",
        "text": "Tap, tap, tap as the clouds go by."
      },
      {
        "type": "line",
        "text": "Ellie looks out at the rainy street,"
      },
      {
        "type": "line",
        "text": "Then pulls her boots onto both her feet."
      }
    ],
    "evidence": [
      "Tap, tap, tap on the roof so high,",
      "Tap, tap, tap as the clouds go by.",
      "Ellie looks out at the rainy street,",
      "Then pulls her boots onto both her feet."
    ],
    "questions": [
      {
        "prompt": "Which words repeat in the first two lines?",
        "answer": "Tap, tap, tap",
        "wrong": [
          "Both her feet",
          "Ellie looks out"
        ],
        "evidence": "Tap, tap, tap on the roof so high,",
        "evidencePrompt": "Tap the first line with the repeated tapping words."
      },
      {
        "prompt": "Which word rhymes with high?",
        "answer": "by",
        "wrong": [
          "street",
          "feet"
        ],
        "evidence": "Tap, tap, tap as the clouds go by.",
        "evidencePrompt": "Tap the line ending with a rhyme for high."
      },
      {
        "prompt": "Who looks at the rainy street?",
        "answer": "Ellie",
        "wrong": [
          "Leo",
          "Biscuit"
        ],
        "evidence": "Ellie looks out at the rainy street,",
        "evidencePrompt": "Tap the line naming the person looking outside."
      },
      {
        "prompt": "What do the repeated taps help us imagine?",
        "answer": "The sound of rain",
        "wrong": [
          "A silent room",
          "The taste of an apple"
        ],
        "evidence": "Tap, tap, tap on the roof so high,",
        "evidencePrompt": "Tap the line that sounds like rain tapping."
      }
    ],
    "order": [
      "Tap, tap, tap on the roof so high,",
      "Tap, tap, tap as the clouds go by.",
      "Ellie looks out at the rainy street,"
    ],
    "orderPrompt": "Put the first three poem lines in the order they appear."
  },
  {
    "title": "Biscuit’s game",
    "blocks": [
      {
        "type": "line",
        "text": "Run, Biscuit, run across the grass,"
      },
      {
        "type": "line",
        "text": "Run, Biscuit, run as children pass."
      },
      {
        "type": "line",
        "text": "He brings his ball back to the tree,"
      },
      {
        "type": "line",
        "text": "And drops it gently by my knee."
      }
    ],
    "evidence": [
      "Run, Biscuit, run across the grass,",
      "Run, Biscuit, run as children pass.",
      "He brings his ball back to the tree,",
      "And drops it gently by my knee."
    ],
    "questions": [
      {
        "prompt": "Which phrase repeats?",
        "answer": "Run, Biscuit, run",
        "wrong": [
          "By my knee",
          "To the tree"
        ],
        "evidence": "Run, Biscuit, run across the grass,",
        "evidencePrompt": "Tap the first line with the repeated running words."
      },
      {
        "prompt": "Which word rhymes with grass?",
        "answer": "pass",
        "wrong": [
          "tree",
          "knee"
        ],
        "evidence": "Run, Biscuit, run as children pass.",
        "evidencePrompt": "Tap the line ending with a rhyme for grass."
      },
      {
        "prompt": "What does Biscuit bring back?",
        "answer": "His ball",
        "wrong": [
          "A coat",
          "A book"
        ],
        "evidence": "He brings his ball back to the tree,",
        "evidencePrompt": "Tap the line about what Biscuit brings."
      },
      {
        "prompt": "What does gently tell us about Biscuit?",
        "answer": "He drops the ball with care",
        "wrong": [
          "He throws it hard at someone",
          "He bites a child"
        ],
        "evidence": "And drops it gently by my knee.",
        "evidencePrompt": "Tap the line showing Biscuit taking care."
      }
    ],
    "order": [
      "Run, Biscuit, run across the grass,",
      "Run, Biscuit, run as children pass.",
      "He brings his ball back to the tree,"
    ],
    "orderPrompt": "Put the first three poem lines in the order they appear."
  },
  {
    "title": "Stars for Zayn",
    "blocks": [
      {
        "type": "line",
        "text": "Shine, little star, in the sky tonight,"
      },
      {
        "type": "line",
        "text": "Shine, little star, with your tiny light."
      },
      {
        "type": "line",
        "text": "Zayn makes a wish as he looks up high,"
      },
      {
        "type": "line",
        "text": "Then waves to the moon in the deep dark sky."
      }
    ],
    "evidence": [
      "Shine, little star, in the sky tonight,",
      "Shine, little star, with your tiny light.",
      "Zayn makes a wish as he looks up high,",
      "Then waves to the moon in the deep dark sky."
    ],
    "questions": [
      {
        "prompt": "Which words repeat at the start of two lines?",
        "answer": "Shine, little star",
        "wrong": [
          "Zayn makes a wish",
          "Deep dark sky"
        ],
        "evidence": "Shine, little star, in the sky tonight,",
        "evidencePrompt": "Tap the first line with the repeated star words."
      },
      {
        "prompt": "Which word rhymes with tonight?",
        "answer": "light",
        "wrong": [
          "wish",
          "moon"
        ],
        "evidence": "Shine, little star, with your tiny light.",
        "evidencePrompt": "Tap the line ending with a rhyme for tonight."
      },
      {
        "prompt": "What does Zayn do while looking up?",
        "answer": "Makes a wish",
        "wrong": [
          "Eats a cake",
          "Plants a seed"
        ],
        "evidence": "Zayn makes a wish as he looks up high,",
        "evidencePrompt": "Tap the line about Zayn's wish."
      },
      {
        "prompt": "When is the poem most likely set?",
        "answer": "At night",
        "wrong": [
          "At a bright sunny noon",
          "During breakfast in daylight"
        ],
        "evidence": "Then waves to the moon in the deep dark sky.",
        "evidencePrompt": "Tap the line with a clue about the time."
      }
    ],
    "order": [
      "Shine, little star, in the sky tonight,",
      "Shine, little star, with your tiny light.",
      "Zayn makes a wish as he looks up high,"
    ],
    "orderPrompt": "Put the first three poem lines in the order they appear."
  }
];
export function buildQuestions(level, rng) {
  return readingQuestions(BANK, RULE, level, rng);
}
