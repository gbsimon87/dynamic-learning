import { wordQuestions } from "./year5Practice.js";
/** The endings cial and tial: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "The “shul” ending is –cial after a vowel letter and –tial after a consonant letter. Exceptions: initial, financial, commercial, provincial.";
export const BANK = [
  {
    "word": "official",
    "meaning": "approved by someone in charge",
    "sentence": "The ___ results will be put on the school website.",
    "wrong": [
      "officeal",
      "offishal"
    ],
    "tip": "The letter before the ending is a vowel letter."
  },
  {
    "word": "special",
    "meaning": "not ordinary; extra good",
    "sentence": "Today is a ___ day because it is Amara’s birthday.",
    "wrong": [
      "speshal",
      "spetial"
    ],
    "tip": "The letter before the ending is a vowel letter."
  },
  {
    "word": "artificial",
    "meaning": "made by people, not found in nature",
    "sentence": "The shop sold ___ flowers made of silk.",
    "wrong": [
      "artifishal",
      "artifitial"
    ]
  },
  {
    "word": "partial",
    "meaning": "only part, not complete",
    "sentence": "The Moon covered only part of the Sun in the ___ eclipse.",
    "wrong": [
      "parshal",
      "particial"
    ],
    "tip": "The letter before the ending is a consonant letter."
  },
  {
    "word": "confidential",
    "meaning": "meant to be kept secret",
    "sentence": "The doctor keeps your records ___.",
    "wrong": [
      "confidenshal",
      "confidencial"
    ],
    "tip": "The letter before the ending is a consonant letter."
  },
  {
    "word": "essential",
    "meaning": "absolutely needed",
    "sentence": "Water is ___ for plants to grow.",
    "wrong": [
      "essencial",
      "esential"
    ],
    "tip": "The letter before the ending is a consonant letter."
  },
  {
    "word": "initial",
    "meaning": "at the beginning; first",
    "sentence": "Her ___ idea was a rocket, but she changed her mind.",
    "wrong": [
      "inicial",
      "inishal"
    ],
    "tip": "An exception: it breaks the rule about a vowel letter before the ending."
  },
  {
    "word": "financial",
    "meaning": "to do with money",
    "sentence": "Dad asked the bank for ___ advice.",
    "wrong": [
      "finantial",
      "finanshal"
    ],
    "tip": "An exception: the ending is spelt like the word finance."
  },
  {
    "word": "commercial",
    "meaning": "to do with buying and selling",
    "sentence": "The harbour is a busy ___ port.",
    "wrong": [
      "commertial",
      "commersial"
    ],
    "tip": "An exception: it is linked to the word commerce."
  },
  {
    "word": "provincial",
    "meaning": "to do with a province, a region of a country",
    "sentence": "The ___ capital is the biggest city in the region.",
    "wrong": [
      "provintial",
      "provinshal"
    ],
    "tip": "An exception: it is linked to the word province."
  },
  {
    "word": "social",
    "meaning": "to do with meeting and mixing with other people",
    "sentence": "Leo loves the ___ side of school, meeting friends.",
    "wrong": [
      "soshal",
      "sotial"
    ]
  },
  {
    "word": "glacial",
    "meaning": "very cold; to do with ice",
    "sentence": "The ___ lake was too cold to swim in.",
    "wrong": [
      "glashial",
      "glatial"
    ]
  },
  {
    "word": "torrential",
    "meaning": "pouring down heavily",
    "sentence": "___ rain flooded the playground.",
    "wrong": [
      "torrenshal",
      "torrencial"
    ]
  },
  {
    "word": "residential",
    "meaning": "where people live",
    "sentence": "Leo lives on a quiet ___ street.",
    "wrong": [
      "residencial",
      "residenshal"
    ]
  },
  {
    "word": "substantial",
    "meaning": "large in amount",
    "sentence": "The builder charged a ___ amount of money.",
    "wrong": [
      "substanshal",
      "substancial"
    ]
  },
  {
    "word": "influential",
    "meaning": "having a strong effect on other people",
    "sentence": "The ___ teacher inspired many pupils.",
    "wrong": [
      "influenshal",
      "influencial"
    ]
  },
  {
    "word": "facial",
    "meaning": "to do with the face",
    "sentence": "Bix pulled a funny ___ expression.",
    "wrong": [
      "fashial",
      "facal"
    ]
  }
];
export function buildTheEndingsCialAndTialQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
