import { wordQuestions } from "./year5Practice.js";
/** Words often misspelt (first set): docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "Look closely at the unusual letters, silent letters and double letters in these words. Say the tricky part slowly as you spell it.";
export const BANK = [
  {
    "word": "accommodate",
    "meaning": "to provide a room or space for",
    "sentence": "The campsite can ___ twenty tents.",
    "wrong": [
      "acommodate",
      "accomodate"
    ],
    "tip": "Two c and two m."
  },
  {
    "word": "accompany",
    "meaning": "to go somewhere with someone",
    "sentence": "Biscuit will ___ Ellie on her walk.",
    "wrong": [
      "acompany",
      "accompanny"
    ],
    "tip": "Two c, but only one m."
  },
  {
    "word": "according",
    "meaning": "as stated by",
    "sentence": "___ to the map, the beach is a mile away.",
    "wrong": [
      "acording",
      "accordeing"
    ],
    "tip": "Two c and one d."
  },
  {
    "word": "achieve",
    "meaning": "to succeed in doing something",
    "sentence": "With hard work, Zayn hopes to ___ his goal.",
    "wrong": [
      "acheive",
      "achiev"
    ],
    "tip": "The i comes before the e."
  },
  {
    "word": "aggressive",
    "meaning": "angry and ready to attack",
    "sentence": "The goose was ___ and hissed at us.",
    "wrong": [
      "agressive",
      "aggresive"
    ],
    "tip": "Two g and two s."
  },
  {
    "word": "amateur",
    "meaning": "someone who does something for fun, not as a job",
    "sentence": "Priya is an ___ footballer who plays for fun.",
    "wrong": [
      "amatuer",
      "amature"
    ],
    "tip": "The ending sounds like “er” but is spelt –eur."
  },
  {
    "word": "ancient",
    "meaning": "very, very old",
    "sentence": "The museum has an ___ Egyptian coin.",
    "wrong": [
      "ansient",
      "anchent"
    ],
    "tip": "The “sh” sound in the middle is spelt ci."
  },
  {
    "word": "apparent",
    "meaning": "easy to see or understand",
    "sentence": "It was ___ that Biscuit had been digging, because of his muddy paws.",
    "wrong": [
      "aparent",
      "apparant"
    ],
    "tip": "Two p, one r, and it ends –ent."
  },
  {
    "word": "appreciate",
    "meaning": "to be thankful for",
    "sentence": "Amara will ___ some help with the tidying.",
    "wrong": [
      "apreciate",
      "appresiate"
    ],
    "tip": "Two p."
  },
  {
    "word": "attached",
    "meaning": "joined on to something",
    "sentence": "A label was ___ to the parcel.",
    "wrong": [
      "atached",
      "attatched"
    ],
    "tip": "Two t."
  },
  {
    "word": "available",
    "meaning": "ready to be used or got",
    "sentence": "Are there any seats ___ on the bus?",
    "wrong": [
      "avaliable",
      "availible"
    ],
    "tip": "It ends –able and has no double letters."
  },
  {
    "word": "average",
    "meaning": "typical, or in the middle",
    "sentence": "Leo is of ___ height for his age.",
    "wrong": [
      "avarage",
      "averege"
    ],
    "tip": "Only one v and one r."
  },
  {
    "word": "awkward",
    "meaning": "clumsy or uncomfortable",
    "sentence": "It felt ___ when nobody laughed at Zayn’s joke.",
    "wrong": [
      "akward",
      "awkwerd"
    ],
    "tip": "Two w."
  },
  {
    "word": "bargain",
    "meaning": "something bought for less than its usual price",
    "sentence": "Mum got a ___ at the market: two scarves for the price of one.",
    "wrong": [
      "bargin",
      "bargane"
    ],
    "tip": "The ending is –ain."
  },
  {
    "word": "bruise",
    "meaning": "a dark mark on skin after a bump",
    "sentence": "Leo had a blue ___ on his knee.",
    "wrong": [
      "bruse",
      "brooze"
    ],
    "tip": "The vowel sound is spelt ui."
  },
  {
    "word": "category",
    "meaning": "a group of similar things",
    "sentence": "Fiction is one ___ of book.",
    "wrong": [
      "catagory",
      "catergory"
    ],
    "tip": "The middle has g, o, r."
  },
  {
    "word": "cemetery",
    "meaning": "a place where the dead are buried",
    "sentence": "The old church has a quiet ___ behind it.",
    "wrong": [
      "cemetary",
      "cematery"
    ],
    "tip": "Three e and no a."
  },
  {
    "word": "committee",
    "meaning": "a group chosen to make decisions",
    "sentence": "The school ___ decided to hold a bake sale.",
    "wrong": [
      "comittee",
      "commitee"
    ],
    "tip": "Two m, two t and two e."
  },
  {
    "word": "communicate",
    "meaning": "to share information",
    "sentence": "Bees use dance to ___ where the flowers are.",
    "wrong": [
      "comunicate",
      "communikate"
    ],
    "tip": "Two m and one n."
  },
  {
    "word": "community",
    "meaning": "the people who live in the same area",
    "sentence": "Our local ___ held a street party.",
    "wrong": [
      "comunity",
      "communty"
    ],
    "tip": "Two m."
  },
  {
    "word": "competition",
    "meaning": "a contest",
    "sentence": "Amara won the baking ___.",
    "wrong": [
      "compitition",
      "competetion"
    ],
    "tip": "It begins c, o, m, p, e."
  },
  {
    "word": "conscience",
    "meaning": "your inner sense of right and wrong",
    "sentence": "Zayn’s ___ told him to hand back the money.",
    "wrong": [
      "concience",
      "consience"
    ],
    "tip": "Hidden inside is the word science."
  },
  {
    "word": "conscious",
    "meaning": "awake and aware",
    "sentence": "The patient was ___ and able to talk.",
    "wrong": [
      "concious",
      "consious"
    ],
    "tip": "Hidden inside is the word science."
  },
  {
    "word": "controversy",
    "meaning": "a public argument about something",
    "sentence": "The new rule caused a ___ in the village.",
    "wrong": [
      "contraversy",
      "controvercy"
    ],
    "tip": "It begins contro, not contra."
  },
  {
    "word": "convenience",
    "meaning": "something that makes life easier",
    "sentence": "The shop’s long opening hours are a great ___.",
    "wrong": [
      "convienience",
      "conveniance"
    ],
    "tip": "The ending has i before e."
  }
];
export function buildWordsOftenMisspeltQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
