import { wordQuestions } from "./year4Practice.js";
/** Greek and French ch: docs/curriculum/year-3-and-4-english.md, Year 4 mapping. */
export const RULE = "The letters ch can sound like k in Greek origin words, or sh in many French origin words.";
export const BANK = [
  {
    "word": "scheme",
    "meaning": "a plan",
    "sentence": "The children made a ___ for the garden.",
    "wrong": [
      "skeem",
      "sceeme"
    ]
  },
  {
    "word": "chorus",
    "meaning": "part of a song sung together",
    "sentence": "Everyone joined in the ___.",
    "wrong": [
      "corus",
      "chorous"
    ]
  },
  {
    "word": "chemist",
    "meaning": "a scientist who studies substances",
    "sentence": "The ___ mixed two liquids.",
    "wrong": [
      "kemist",
      "chemmist"
    ]
  },
  {
    "word": "echo",
    "meaning": "a sound heard again after it bounces back",
    "sentence": "Leo heard an ___ in the cave.",
    "wrong": [
      "ecko",
      "eco"
    ]
  },
  {
    "word": "character",
    "meaning": "a person in a story",
    "sentence": "Amara invented a ___.",
    "wrong": [
      "caracter",
      "charecter"
    ]
  },
  {
    "word": "chef",
    "meaning": "someone who cooks as a job",
    "sentence": "The ___ made soup.",
    "wrong": [
      "shef",
      "cheff"
    ]
  },
  {
    "word": "chalet",
    "meaning": "a wooden mountain house",
    "sentence": "They stayed in a ___.",
    "wrong": [
      "shalet",
      "challett"
    ]
  },
  {
    "word": "machine",
    "meaning": "a device that does work",
    "sentence": "The ___ washed the clothes.",
    "wrong": [
      "mashine",
      "machene"
    ]
  },
  {
    "word": "brochure",
    "meaning": "a little book giving information",
    "sentence": "Priya read the holiday ___.",
    "wrong": [
      "broshure",
      "brochur"
    ]
  },
  {
    "word": "school",
    "meaning": "a place where children learn",
    "sentence": "Ellie walked to ___.",
    "wrong": [
      "skool",
      "scool"
    ]
  },
  {
    "word": "stomach",
    "meaning": "the part of your body that digests food",
    "sentence": "My ___ rumbled.",
    "wrong": [
      "stomack",
      "stomache"
    ]
  },
  {
    "word": "orchestra",
    "meaning": "a large group of musicians",
    "sentence": "The ___ played on stage.",
    "wrong": [
      "orkestra",
      "orcestra"
    ]
  },
  {
    "word": "anchor",
    "meaning": "a heavy object that holds a boat in place",
    "sentence": "The crew lowered the ___.",
    "wrong": [
      "ankor",
      "ancher"
    ]
  },
  {
    "word": "parachute",
    "meaning": "equipment that slows a fall through the air",
    "sentence": "The skydiver opened a ___.",
    "wrong": [
      "parashute",
      "parachoot"
    ]
  },
  {
    "word": "chute",
    "meaning": "a sloping channel things slide down",
    "sentence": "The parcel slid down the ___.",
    "wrong": [
      "shute",
      "choot"
    ]
  }
];
export function buildGreekAndFrenchChQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
