import { readingQuestions } from "./year2Practice.js";

/** Asking Questions and Discussing Books: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "Ask questions about a text. Listen to others and use a clue when you explain your answer.";
export const BANK = [
  {
    "title": "A book about the sea",
    "blocks": [
      {
        "type": "p",
        "text": "Amara chose an information book about the sea."
      },
      {
        "type": "p",
        "text": "She read that dolphins breathe air."
      },
      {
        "type": "p",
        "text": "Leo asked how dolphins breathe when they are in water."
      },
      {
        "type": "p",
        "text": "Amara showed him the page about dolphins coming to the surface."
      }
    ],
    "evidence": [
      "Amara chose an information book about the sea.",
      "She read that dolphins breathe air.",
      "Leo asked how dolphins breathe when they are in water.",
      "Amara showed him the page about dolphins coming to the surface."
    ],
    "questions": [
      {
        "prompt": "What kind of book did Amara choose?",
        "answer": "An information book",
        "wrong": [
          "A book of only jokes",
          "A fairy tale"
        ],
        "evidence": "Amara chose an information book about the sea.",
        "evidencePrompt": "Tap the sentence about the kind of book."
      },
      {
        "prompt": "Which question fits the fact about breathing air?",
        "answer": "How do dolphins breathe in water?",
        "wrong": [
          "What colour is Amara's coat?",
          "When is Leo's birthday?"
        ],
        "evidence": "She read that dolphins breathe air.",
        "evidencePrompt": "Tap the fact that prompted a question."
      },
      {
        "prompt": "Who asked a question?",
        "answer": "Leo",
        "wrong": [
          "Biscuit",
          "Ellie"
        ],
        "evidence": "Leo asked how dolphins breathe when they are in water.",
        "evidencePrompt": "Tap the sentence about asking a question."
      },
      {
        "prompt": "Which reply uses information from the book?",
        "answer": "Dolphins come to the surface to breathe",
        "wrong": [
          "Dolphins never need air",
          "Dolphins breathe through their tails"
        ],
        "evidence": "Amara showed him the page about dolphins coming to the surface.",
        "evidencePrompt": "Tap the sentence supporting an answer from the book."
      }
    ],
    "order": [
      "Amara chose an information book about the sea.",
      "She read that dolphins breathe air.",
      "Leo asked how dolphins breathe when they are in water."
    ],
    "orderPrompt": "Put the events in the order they happen in the story."
  },
  {
    "title": "A story to share",
    "blocks": [
      {
        "type": "p",
        "text": "Priya read a story about a girl sharing her lunch."
      },
      {
        "type": "p",
        "text": "The girl gave half her sandwich to a hungry friend."
      },
      {
        "type": "p",
        "text": "Zayn said the girl seemed kind."
      },
      {
        "type": "p",
        "text": "Priya listened and pointed to the sharing as a reason to agree."
      }
    ],
    "evidence": [
      "Priya read a story about a girl sharing her lunch.",
      "The girl gave half her sandwich to a hungry friend.",
      "Zayn said the girl seemed kind.",
      "Priya listened and pointed to the sharing as a reason to agree."
    ],
    "questions": [
      {
        "prompt": "What did the girl share?",
        "answer": "Half her sandwich",
        "wrong": [
          "Her coat",
          "Her bicycle"
        ],
        "evidence": "The girl gave half her sandwich to a hungry friend.",
        "evidencePrompt": "Tap the sentence about what was shared."
      },
      {
        "prompt": "Which question is about the story?",
        "answer": "Why did the girl share her lunch?",
        "wrong": [
          "How many wheels has a bus?",
          "Where is the moon?"
        ],
        "evidence": "The girl gave half her sandwich to a hungry friend.",
        "evidencePrompt": "Tap the action a reader could ask about."
      },
      {
        "prompt": "What did Zayn think of the girl?",
        "answer": "She seemed kind",
        "wrong": [
          "She seemed cruel",
          "She seemed careless"
        ],
        "evidence": "Zayn said the girl seemed kind.",
        "evidencePrompt": "Tap the sentence giving Zayn's view."
      },
      {
        "prompt": "Which reply explains an opinion with evidence?",
        "answer": "She was kind because she shared with a hungry friend",
        "wrong": [
          "She was kind because I like the book's cover",
          "She was kind because the story has words"
        ],
        "evidence": "Priya listened and pointed to the sharing as a reason to agree.",
        "evidencePrompt": "Tap the sentence showing a reason to agree."
      }
    ],
    "order": [
      "Priya read a story about a girl sharing her lunch.",
      "The girl gave half her sandwich to a hungry friend.",
      "Zayn said the girl seemed kind."
    ],
    "orderPrompt": "Put the events in the order they happen in the story."
  },
  {
    "title": "Ellie chooses a poem",
    "blocks": [
      {
        "type": "p",
        "text": "Ellie read a poem about a bright yellow sun."
      },
      {
        "type": "p",
        "text": "She liked the phrase golden glow because it made her picture warm light."
      },
      {
        "type": "p",
        "text": "Leo waited for Ellie to finish before giving his view."
      },
      {
        "type": "p",
        "text": "He said he liked the rhyme and read his favourite line."
      }
    ],
    "evidence": [
      "Ellie read a poem about a bright yellow sun.",
      "She liked the phrase golden glow because it made her picture warm light.",
      "Leo waited for Ellie to finish before giving his view.",
      "He said he liked the rhyme and read his favourite line."
    ],
    "questions": [
      {
        "prompt": "What was the poem about?",
        "answer": "A bright yellow sun",
        "wrong": [
          "A dark cave",
          "A lost sock"
        ],
        "evidence": "Ellie read a poem about a bright yellow sun.",
        "evidencePrompt": "Tap the sentence naming the poem's subject."
      },
      {
        "prompt": "Why did Ellie like golden glow?",
        "answer": "It helped her picture warm light",
        "wrong": [
          "It told her where her bag was",
          "It explained how to bake bread"
        ],
        "evidence": "She liked the phrase golden glow because it made her picture warm light.",
        "evidencePrompt": "Tap the sentence explaining Ellie's favourite phrase."
      },
      {
        "prompt": "How did Leo take turns?",
        "answer": "He waited for Ellie to finish",
        "wrong": [
          "He shouted over Ellie",
          "He walked away without listening"
        ],
        "evidence": "Leo waited for Ellie to finish before giving his view.",
        "evidencePrompt": "Tap the sentence about listening and taking turns."
      },
      {
        "prompt": "Which question invites a view about the poem?",
        "answer": "Which line do you like, and why?",
        "wrong": [
          "What is six plus two?",
          "How tall is your door?"
        ],
        "evidence": "He said he liked the rhyme and read his favourite line.",
        "evidencePrompt": "Tap the sentence about a favourite line."
      }
    ],
    "order": [
      "Ellie read a poem about a bright yellow sun.",
      "She liked the phrase golden glow because it made her picture warm light.",
      "Leo waited for Ellie to finish before giving his view."
    ],
    "orderPrompt": "Put the events in the order they happen in the story."
  }
];
export function buildQuestions(level, rng) {
  return readingQuestions(BANK, RULE, level, rng);
}
