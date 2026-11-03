import { wordQuestions } from "./year5Practice.js";
/** The letters ei after c: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "I before e, except after c, when the sound is “ee”. After c it is ei (receive); otherwise ie (believe). Exceptions: protein, caffeine, seize.";
export const BANK = [
  {
    "word": "deceive",
    "meaning": "to trick someone into believing something false",
    "sentence": "It is wrong to ___ your friends with lies.",
    "wrong": [
      "decieve",
      "deseive"
    ],
    "tip": "The letters before the ei are d-e-c."
  },
  {
    "word": "conceive",
    "meaning": "to form an idea in your mind",
    "sentence": "Priya could not ___ how the magic trick worked.",
    "wrong": [
      "concieve",
      "conseive"
    ]
  },
  {
    "word": "receive",
    "meaning": "to get something that is given or sent",
    "sentence": "Amara hopes to ___ a letter from her penfriend.",
    "wrong": [
      "recieve",
      "reseive"
    ]
  },
  {
    "word": "perceive",
    "meaning": "to notice or become aware of",
    "sentence": "From the hilltop, we could ___ ships far out at sea.",
    "wrong": [
      "percieve",
      "perseive"
    ]
  },
  {
    "word": "ceiling",
    "meaning": "the flat surface at the top of a room",
    "sentence": "Leo stuck glow-in-the-dark stars to his bedroom ___.",
    "wrong": [
      "cieling",
      "seiling"
    ],
    "tip": "After the c, it is e before i."
  },
  {
    "word": "protein",
    "meaning": "a body-building nutrient found in eggs, meat and beans",
    "sentence": "Eggs and beans are full of ___.",
    "wrong": [
      "protien",
      "proteen"
    ],
    "tip": "An exception to the rule: the ei comes after a t."
  },
  {
    "word": "caffeine",
    "meaning": "a substance in tea and coffee that keeps you awake",
    "sentence": "Children should not drink fizzy drinks with lots of ___.",
    "wrong": [
      "cafeine",
      "caffiene"
    ],
    "tip": "An exception to the rule: the ei comes after an f."
  },
  {
    "word": "seize",
    "meaning": "to grab suddenly and firmly",
    "sentence": "The goalkeeper dived to ___ the ball.",
    "wrong": [
      "sieze",
      "seeze"
    ],
    "tip": "An exception to the rule: the ei comes after an s."
  },
  {
    "word": "believe",
    "meaning": "to think that something is true",
    "sentence": "Do you ___ in ghosts?",
    "wrong": [
      "beleive",
      "believ"
    ],
    "tip": "No c here, so it is i before e."
  },
  {
    "word": "achieve",
    "meaning": "to succeed in doing something",
    "sentence": "With practice, you can ___ your goals.",
    "wrong": [
      "acheive",
      "achive"
    ],
    "tip": "No c here, so it is i before e."
  },
  {
    "word": "field",
    "meaning": "a large area of open, grassy land",
    "sentence": "The cows grazed in the ___.",
    "wrong": [
      "feild",
      "feeld"
    ],
    "tip": "No c here, so it is i before e."
  },
  {
    "word": "piece",
    "meaning": "a part of something",
    "sentence": "Ellie ate a ___ of cake.",
    "wrong": [
      "peice",
      "peece"
    ],
    "tip": "No c here, so it is i before e."
  },
  {
    "word": "shield",
    "meaning": "a guard held up to block an attack",
    "sentence": "The knight raised his ___ to block the sword.",
    "wrong": [
      "sheild",
      "sheeld"
    ],
    "tip": "No c here, so it is i before e."
  },
  {
    "word": "thief",
    "meaning": "a person who steals",
    "sentence": "A ___ stole the jewels from the museum.",
    "wrong": [
      "theif",
      "theef"
    ],
    "tip": "No c here, so it is i before e."
  },
  {
    "word": "brief",
    "meaning": "short and quick",
    "sentence": "The talk was ___, only two minutes long.",
    "wrong": [
      "breif",
      "breef"
    ],
    "tip": "No c here, so it is i before e."
  },
  {
    "word": "relief",
    "meaning": "the good feeling when a worry ends",
    "sentence": "Amara sighed with ___ when she found her lost keys.",
    "wrong": [
      "releif",
      "releef"
    ],
    "tip": "No c here, so it is i before e."
  },
  {
    "word": "niece",
    "meaning": "the daughter of your brother or sister",
    "sentence": "Zayn’s sister has a daughter, so Zayn has a ___.",
    "wrong": [
      "neice",
      "neece"
    ],
    "tip": "No c here, so it is i before e."
  },
  {
    "word": "chief",
    "meaning": "the leader of a group",
    "sentence": "The fire ___ gave the orders.",
    "wrong": [
      "cheif",
      "cheef"
    ],
    "tip": "No c here, so it is i before e."
  },
  {
    "word": "yield",
    "meaning": "to give way; to let someone go first",
    "sentence": "Cars must ___ to people on the crossing.",
    "wrong": [
      "yeild",
      "yeeld"
    ],
    "tip": "No c here, so it is i before e."
  }
];
export function buildTheLettersEiAfterCQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
