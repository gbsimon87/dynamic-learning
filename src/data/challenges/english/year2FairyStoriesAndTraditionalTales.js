import { readingQuestions } from "./year2Practice.js";

/** Fairy Stories and Traditional Tales: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "Retell the events in a traditional tale (a story passed down over time).";
export const BANK = [
  {
    "title": "Amara retells the Three Little Pigs",
    "blocks": [
      {
        "type": "p",
        "text": "The first two pigs built houses of straw and sticks."
      },
      {
        "type": "p",
        "text": "The wolf blew those houses down."
      },
      {
        "type": "p",
        "text": "The pigs ran to the third pig’s strong brick house."
      },
      {
        "type": "p",
        "text": "The wolf could not blow the brick house down."
      }
    ],
    "evidence": [
      "The first two pigs built houses of straw and sticks.",
      "The wolf blew those houses down.",
      "The pigs ran to the third pig’s strong brick house.",
      "The wolf could not blow the brick house down."
    ],
    "questions": [
      {
        "prompt": "What did the first two pigs build with?",
        "answer": "Straw and sticks",
        "wrong": [
          "Bricks and stone",
          "Glass and ice"
        ],
        "evidence": "The first two pigs built houses of straw and sticks.",
        "evidencePrompt": "Tap the sentence about the first two houses."
      },
      {
        "prompt": "Who blew down the first two houses?",
        "answer": "The wolf",
        "wrong": [
          "The third pig",
          "Amara"
        ],
        "evidence": "The wolf blew those houses down.",
        "evidencePrompt": "Tap the sentence about the wolf."
      },
      {
        "prompt": "Where did the pigs go for safety?",
        "answer": "The brick house",
        "wrong": [
          "The wolf’s cave",
          "A boat at sea"
        ],
        "evidence": "The pigs ran to the third pig’s strong brick house.",
        "evidencePrompt": "Tap the sentence about escaping."
      },
      {
        "prompt": "Why was the third house safer in this tale?",
        "answer": "The wolf could not blow it down",
        "wrong": [
          "It was made of straw",
          "It had no walls"
        ],
        "evidence": "The wolf could not blow the brick house down.",
        "evidencePrompt": "Tap the sentence showing why the brick house was safer."
      }
    ],
    "order": [
      "The first two pigs built houses of straw and sticks.",
      "The wolf blew those houses down.",
      "The pigs ran to the third pig’s strong brick house."
    ],
    "orderPrompt": "Put the events in the order they happen in the story."
  },
  {
    "title": "Leo retells Cinderella",
    "blocks": [
      {
        "type": "p",
        "text": "Cinderella wanted to go to the ball but had no fine clothes."
      },
      {
        "type": "p",
        "text": "A fairy helped her get a dress and a carriage."
      },
      {
        "type": "p",
        "text": "Cinderella left the ball at midnight and lost a glass slipper."
      },
      {
        "type": "p",
        "text": "The slipper helped the prince find her again."
      }
    ],
    "evidence": [
      "Cinderella wanted to go to the ball but had no fine clothes.",
      "A fairy helped her get a dress and a carriage.",
      "Cinderella left the ball at midnight and lost a glass slipper.",
      "The slipper helped the prince find her again."
    ],
    "questions": [
      {
        "prompt": "Why did Cinderella need help at first?",
        "answer": "She had no fine clothes for the ball",
        "wrong": [
          "She had lost a book",
          "She wanted to build a house"
        ],
        "evidence": "Cinderella wanted to go to the ball but had no fine clothes.",
        "evidencePrompt": "Tap the sentence about the problem."
      },
      {
        "prompt": "Who helped Cinderella get ready?",
        "answer": "A fairy",
        "wrong": [
          "A wolf",
          "A giant"
        ],
        "evidence": "A fairy helped her get a dress and a carriage.",
        "evidencePrompt": "Tap the sentence about the helper."
      },
      {
        "prompt": "What did Cinderella lose?",
        "answer": "A glass slipper",
        "wrong": [
          "A wooden spoon",
          "A red hat"
        ],
        "evidence": "Cinderella left the ball at midnight and lost a glass slipper.",
        "evidencePrompt": "Tap the sentence about what was lost."
      },
      {
        "prompt": "Why was the slipper important?",
        "answer": "It helped the prince find Cinderella",
        "wrong": [
          "It grew into a tree",
          "It carried everyone home"
        ],
        "evidence": "The slipper helped the prince find her again.",
        "evidencePrompt": "Tap the sentence about how the slipper helped."
      }
    ],
    "order": [
      "Cinderella wanted to go to the ball but had no fine clothes.",
      "A fairy helped her get a dress and a carriage.",
      "Cinderella left the ball at midnight and lost a glass slipper."
    ],
    "orderPrompt": "Put the events in the order they happen in the story."
  },
  {
    "title": "Priya retells the Enormous Turnip",
    "blocks": [
      {
        "type": "p",
        "text": "An old man grew an enormous turnip."
      },
      {
        "type": "p",
        "text": "He pulled it, but it would not come out."
      },
      {
        "type": "p",
        "text": "His family and their animals joined in pulling."
      },
      {
        "type": "p",
        "text": "When a little mouse helped too, they pulled the turnip out."
      }
    ],
    "evidence": [
      "An old man grew an enormous turnip.",
      "He pulled it, but it would not come out.",
      "His family and their animals joined in pulling.",
      "When a little mouse helped too, they pulled the turnip out."
    ],
    "questions": [
      {
        "prompt": "What did the old man grow?",
        "answer": "A very large turnip",
        "wrong": [
          "A tiny apple",
          "A tall sunflower"
        ],
        "evidence": "An old man grew an enormous turnip.",
        "evidencePrompt": "Tap the sentence about what grew."
      },
      {
        "prompt": "What was the problem?",
        "answer": "He could not pull the turnip out alone",
        "wrong": [
          "The turnip had vanished",
          "The animals ate the turnip"
        ],
        "evidence": "He pulled it, but it would not come out.",
        "evidencePrompt": "Tap the sentence about the problem."
      },
      {
        "prompt": "Who joined the old man?",
        "answer": "His family and their animals",
        "wrong": [
          "Only a wolf",
          "Only a fairy"
        ],
        "evidence": "His family and their animals joined in pulling.",
        "evidencePrompt": "Tap the sentence about the helpers."
      },
      {
        "prompt": "What idea does the ending show?",
        "answer": "Working together can help",
        "wrong": [
          "No one should help others",
          "The smallest helper never matters"
        ],
        "evidence": "When a little mouse helped too, they pulled the turnip out.",
        "evidencePrompt": "Tap the sentence showing what teamwork achieved."
      }
    ],
    "order": [
      "An old man grew an enormous turnip.",
      "He pulled it, but it would not come out.",
      "His family and their animals joined in pulling."
    ],
    "orderPrompt": "Put the events in the order they happen in the story."
  }
];
export function buildQuestions(level, rng) {
  return readingQuestions(BANK, RULE, level, rng);
}
