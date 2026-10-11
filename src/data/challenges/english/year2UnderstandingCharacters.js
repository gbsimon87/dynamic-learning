import { readingQuestions } from "./year2Practice.js";

/** Understanding Characters: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "Use what a character says and does to work out how they feel.";
export const BANK = [
  {
    "title": "Zayn at the school gate",
    "blocks": [
      {
        "type": "p",
        "text": "Zayn held Dad’s hand tightly at the school gate."
      },
      {
        "type": "p",
        "text": "He whispered that he did not know anyone in his new class."
      },
      {
        "type": "p",
        "text": "Amara smiled and offered to show him the classroom."
      },
      {
        "type": "p",
        "text": "Zayn let go of Dad’s hand and smiled back."
      }
    ],
    "evidence": [
      "Zayn held Dad’s hand tightly at the school gate.",
      "He whispered that he did not know anyone in his new class.",
      "Amara smiled and offered to show him the classroom.",
      "Zayn let go of Dad’s hand and smiled back."
    ],
    "questions": [
      {
        "prompt": "How did Zayn probably feel at first?",
        "answer": "Worried",
        "wrong": [
          "Angry with Amara",
          "Bored at home"
        ],
        "evidence": "Zayn held Dad’s hand tightly at the school gate.",
        "evidencePrompt": "Tap the action showing Zayn staying close to Dad."
      },
      {
        "prompt": "Why might Zayn feel worried?",
        "answer": "He did not know anyone",
        "wrong": [
          "He had lost a football",
          "He wanted to go swimming"
        ],
        "evidence": "He whispered that he did not know anyone in his new class.",
        "evidencePrompt": "Tap the sentence explaining his worry."
      },
      {
        "prompt": "How did Amara help?",
        "answer": "She offered to show him the classroom",
        "wrong": [
          "She hid his bag",
          "She ran away"
        ],
        "evidence": "Amara smiled and offered to show him the classroom.",
        "evidencePrompt": "Tap the sentence about Amara helping."
      },
      {
        "prompt": "What does Zayn's smile suggest at the end?",
        "answer": "He feels more welcome",
        "wrong": [
          "He is angry with Dad",
          "He wants Amara to leave"
        ],
        "evidence": "Zayn let go of Dad’s hand and smiled back.",
        "evidencePrompt": "Tap the clue that his feelings changed."
      }
    ],
    "order": [
      "Zayn held Dad’s hand tightly at the school gate.",
      "He whispered that he did not know anyone in his new class.",
      "Amara smiled and offered to show him the classroom."
    ],
    "orderPrompt": "Put the events in the order they happen in the story."
  },
  {
    "title": "Ellie and the wet puppy",
    "blocks": [
      {
        "type": "p",
        "text": "Ellie saw a puppy shivering in the rain."
      },
      {
        "type": "p",
        "text": "She took off her coat and wrapped it around the puppy."
      },
      {
        "type": "p",
        "text": "She asked an adult to help find its owner."
      },
      {
        "type": "p",
        "text": "The puppy settled on her lap and stopped shaking."
      }
    ],
    "evidence": [
      "Ellie saw a puppy shivering in the rain.",
      "She took off her coat and wrapped it around the puppy.",
      "She asked an adult to help find its owner.",
      "The puppy settled on her lap and stopped shaking."
    ],
    "questions": [
      {
        "prompt": "What kind of person does Ellie seem to be?",
        "answer": "Caring",
        "wrong": [
          "Cruel",
          "Careless about animals"
        ],
        "evidence": "She took off her coat and wrapped it around the puppy.",
        "evidencePrompt": "Tap the sentence showing Ellie using her coat to help."
      },
      {
        "prompt": "Why did Ellie wrap up the puppy?",
        "answer": "It was cold and wet",
        "wrong": [
          "It wanted to play football",
          "It was too hot"
        ],
        "evidence": "Ellie saw a puppy shivering in the rain.",
        "evidencePrompt": "Tap the clue that the puppy needed warmth."
      },
      {
        "prompt": "Who did Ellie ask for help?",
        "answer": "An adult",
        "wrong": [
          "A dragon",
          "A passing squirrel"
        ],
        "evidence": "She asked an adult to help find its owner.",
        "evidencePrompt": "Tap the sentence about getting help."
      },
      {
        "prompt": "How did the puppy probably feel at the end?",
        "answer": "More comfortable",
        "wrong": [
          "Colder than before",
          "Angry because Ellie ran away"
        ],
        "evidence": "The puppy settled on her lap and stopped shaking.",
        "evidencePrompt": "Tap the clue that the puppy felt better."
      }
    ],
    "order": [
      "Ellie saw a puppy shivering in the rain.",
      "She took off her coat and wrapped it around the puppy.",
      "She asked an adult to help find its owner."
    ],
    "orderPrompt": "Put the events in the order they happen in the story."
  },
  {
    "title": "Leo’s model",
    "blocks": [
      {
        "type": "p",
        "text": "Leo had spent all morning building a tower."
      },
      {
        "type": "p",
        "text": "Biscuit bumped the table and the tower broke."
      },
      {
        "type": "p",
        "text": "Leo frowned and folded his arms."
      },
      {
        "type": "p",
        "text": "Priya offered to help rebuild it, and Leo thanked her."
      }
    ],
    "evidence": [
      "Leo had spent all morning building a tower.",
      "Biscuit bumped the table and the tower broke.",
      "Leo frowned and folded his arms.",
      "Priya offered to help rebuild it, and Leo thanked her."
    ],
    "questions": [
      {
        "prompt": "How did Leo probably feel when his tower broke?",
        "answer": "Upset",
        "wrong": [
          "Pleased that it broke",
          "Sleepy in bed"
        ],
        "evidence": "Leo frowned and folded his arms.",
        "evidencePrompt": "Tap the clue showing Leo was upset."
      },
      {
        "prompt": "Why did Leo care about the tower?",
        "answer": "He had spent time building it",
        "wrong": [
          "It was someone else's tower",
          "He wanted to break it"
        ],
        "evidence": "Leo had spent all morning building a tower.",
        "evidencePrompt": "Tap the sentence about the time Leo spent."
      },
      {
        "prompt": "What caused the tower to break?",
        "answer": "Biscuit bumped the table",
        "wrong": [
          "Priya took it apart",
          "Rain washed it away"
        ],
        "evidence": "Biscuit bumped the table and the tower broke.",
        "evidencePrompt": "Tap the sentence about the accident."
      },
      {
        "prompt": "Why did Leo thank Priya?",
        "answer": "She offered to help",
        "wrong": [
          "She broke the tower",
          "She took his pieces away"
        ],
        "evidence": "Priya offered to help rebuild it, and Leo thanked her.",
        "evidencePrompt": "Tap the sentence showing why Leo thanked Priya."
      }
    ],
    "order": [
      "Leo had spent all morning building a tower.",
      "Biscuit bumped the table and the tower broke.",
      "Leo frowned and folded his arms."
    ],
    "orderPrompt": "Put the events in the order they happen in the story."
  }
];
export function buildQuestions(level, rng) {
  return readingQuestions(BANK, RULE, level, rng);
}
