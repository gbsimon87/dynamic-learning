import { wordQuestions } from "./year4Practice.js";
/** The shun Endings: docs/curriculum/year-3-and-4-english.md, Year 4 mapping. */
export const RULE = "Use tion after t or te, ssion after ss or mit, sion often after d or se, and cian after c or cs.";
export const BANK = [
  {
    "word": "invention",
    "meaning": "something newly created",
    "sentence": "The machine was Zayn’s ___.",
    "wrong": [
      "invenssion",
      "invencian"
    ]
  },
  {
    "word": "injection",
    "meaning": "medicine given with a needle",
    "sentence": "The nurse gave an ___.",
    "wrong": [
      "injecssion",
      "injecsion"
    ]
  },
  {
    "word": "action",
    "meaning": "something done",
    "sentence": "The story was full of ___.",
    "wrong": [
      "acssion",
      "accian"
    ]
  },
  {
    "word": "hesitation",
    "meaning": "a pause before doing something",
    "sentence": "Leo answered without ___.",
    "wrong": [
      "hesitassion",
      "hesitacian"
    ]
  },
  {
    "word": "completion",
    "meaning": "the act of finishing",
    "sentence": "The builders celebrated the ___ of the bridge.",
    "wrong": [
      "complesion",
      "complecian"
    ]
  },
  {
    "word": "expression",
    "meaning": "a look that shows a feeling",
    "sentence": "Amara’s ___ showed surprise.",
    "wrong": [
      "expretion",
      "expresion"
    ]
  },
  {
    "word": "discussion",
    "meaning": "a talk about something",
    "sentence": "The class had a ___ about books.",
    "wrong": [
      "discusion",
      "discuttion"
    ]
  },
  {
    "word": "confession",
    "meaning": "saying that you did something wrong",
    "sentence": "The thief made a ___.",
    "wrong": [
      "confesion",
      "confetion"
    ]
  },
  {
    "word": "permission",
    "meaning": "being allowed to do something",
    "sentence": "Ask ___ before borrowing the bike.",
    "wrong": [
      "permision",
      "permition"
    ]
  },
  {
    "word": "admission",
    "meaning": "being allowed to enter",
    "sentence": "The ticket includes ___ to the museum.",
    "wrong": [
      "admision",
      "admition"
    ]
  },
  {
    "word": "expansion",
    "meaning": "the act of getting bigger",
    "sentence": "The town’s ___ meant more houses.",
    "wrong": [
      "expantion",
      "expancian"
    ]
  },
  {
    "word": "extension",
    "meaning": "an added part",
    "sentence": "The school has a new ___.",
    "wrong": [
      "extention",
      "extencian"
    ]
  },
  {
    "word": "comprehension",
    "meaning": "understanding",
    "sentence": "The questions checked our ___.",
    "wrong": [
      "comprehention",
      "comprehencian"
    ]
  },
  {
    "word": "tension",
    "meaning": "a feeling of worry or strain",
    "sentence": "There was ___ before the result.",
    "wrong": [
      "tention",
      "tencian"
    ]
  },
  {
    "word": "attention",
    "meaning": "careful listening or watching",
    "sentence": "Please pay ___.",
    "wrong": [
      "attension",
      "attencian"
    ]
  },
  {
    "word": "intention",
    "meaning": "a plan to do something",
    "sentence": "His ___ was to help.",
    "wrong": [
      "intension",
      "intencian"
    ]
  },
  {
    "word": "musician",
    "meaning": "someone who plays music",
    "sentence": "Priya wants to be a ___.",
    "wrong": [
      "musition",
      "musission"
    ]
  },
  {
    "word": "electrician",
    "meaning": "someone who works with electrical equipment",
    "sentence": "The ___ repaired the lights.",
    "wrong": [
      "electrition",
      "electrission"
    ]
  },
  {
    "word": "magician",
    "meaning": "someone who performs magic tricks",
    "sentence": "The ___ made a coin vanish.",
    "wrong": [
      "magition",
      "magission"
    ]
  },
  {
    "word": "politician",
    "meaning": "someone who works in government",
    "sentence": "The ___ spoke at the meeting.",
    "wrong": [
      "politition",
      "politission"
    ]
  },
  {
    "word": "mathematician",
    "meaning": "someone who studies mathematics",
    "sentence": "The ___ solved the puzzle.",
    "wrong": [
      "mathematition",
      "mathematicion"
    ]
  }
];
export function buildTheShunEndingsQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
