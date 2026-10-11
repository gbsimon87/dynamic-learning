import { sentenceQuestions } from "./year2Practice.js";

/** Writing for Different Purposes: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "Think about why you are writing: to invite, thank, explain, give instructions or tell news.";
export const BANK = [
  {
    "prompt": "Write an invitation to a party.",
    "sentence": "___",
    "answer": "Please come to my party on Saturday.",
    "wrong": [
      "Thank you for my lovely present.",
      "First, wash your hands."
    ]
  },
  {
    "prompt": "Write a thank-you note for a book.",
    "sentence": "___",
    "answer": "Thank you for the book you gave me.",
    "wrong": [
      "Come to my party.",
      "Keep off the grass."
    ]
  },
  {
    "prompt": "Write an instruction for washing hands.",
    "sentence": "___",
    "answer": "First, wet your hands with water.",
    "wrong": [
      "I had fun at the park.",
      "Dear Grandma, thank you for the scarf."
    ]
  },
  {
    "prompt": "Write a sign to keep people off wet paint.",
    "sentence": "___",
    "answer": "Please do not touch the wet paint.",
    "wrong": [
      "Please come to my picnic.",
      "I liked the story."
    ]
  },
  {
    "prompt": "Write a question to ask about a lost bag.",
    "sentence": "___",
    "answer": "Have you seen my blue bag?",
    "wrong": [
      "My bag is blue.",
      "Put the bag down."
    ]
  },
  {
    "prompt": "Write an invitation to a picnic.",
    "sentence": "___",
    "answer": "Would you like to come to our picnic?",
    "wrong": [
      "Thank you for the sandwich.",
      "The robin has a red breast."
    ]
  },
  {
    "prompt": "Write a thank-you note for help.",
    "sentence": "___",
    "answer": "Thank you for helping me build the tower.",
    "wrong": [
      "Meet us at the gate for the picnic.",
      "First, add the flour."
    ]
  },
  {
    "prompt": "Write an instruction for planting a seed.",
    "sentence": "___",
    "answer": "Push the seed into the soil.",
    "wrong": [
      "I saw a seed yesterday.",
      "Thank you for the seeds."
    ]
  },
  {
    "prompt": "Write a sign asking people to shut a gate.",
    "sentence": "___",
    "answer": "Please close the gate.",
    "wrong": [
      "The gate is green.",
      "Would you like to come to tea?"
    ]
  },
  {
    "prompt": "Write news about a school visit yesterday.",
    "sentence": "___",
    "answer": "Yesterday, our class visited the farm.",
    "wrong": [
      "Please visit the farm tomorrow.",
      "Thank you for the farm book."
    ]
  },
  {
    "prompt": "Write an invitation to see a school play.",
    "sentence": "___",
    "answer": "Please come and watch our play on Friday.",
    "wrong": [
      "Thank you for the costume.",
      "Fold the paper in half."
    ]
  },
  {
    "prompt": "Write a thank-you note for a scarf.",
    "sentence": "___",
    "answer": "Thank you for my warm scarf.",
    "wrong": [
      "Come and see my scarf.",
      "Wash the scarf in warm water."
    ]
  },
  {
    "prompt": "Write an instruction for making a paper fan.",
    "sentence": "___",
    "answer": "Fold the paper forwards and backwards.",
    "wrong": [
      "I enjoyed the fan.",
      "Thank you for the paper."
    ]
  },
  {
    "prompt": "Write a sign warning about a deep pond.",
    "sentence": "___",
    "answer": "Danger! Deep water.",
    "wrong": [
      "Please come to my pond party.",
      "I saw a frog yesterday."
    ]
  },
  {
    "prompt": "Write a question to ask when lunch starts.",
    "sentence": "___",
    "answer": "When does lunch start?",
    "wrong": [
      "Lunch starts at noon.",
      "Please eat your lunch."
    ]
  }
];
export function buildQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng);
}
