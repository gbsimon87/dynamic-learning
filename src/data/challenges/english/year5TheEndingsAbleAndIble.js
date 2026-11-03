import { wordQuestions } from "./year5Practice.js";
/** The endings able and ible: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "–able/–ably is far more common than –ible/–ibly. Keep the e after soft c or g (noticeable, changeable). A y changes to i (rely, reliable).";
export const BANK = [
  {
    "word": "adorable",
    "meaning": "very lovable and sweet",
    "sentence": "A puppy in a tiny hat is ___.",
    "wrong": [
      "adorible",
      "adorabel"
    ],
    "tip": "Think of adoration: the sound before the ending is an a."
  },
  {
    "word": "adorably",
    "meaning": "in a sweet and lovable way",
    "sentence": "The kitten yawned ___ and fell asleep.",
    "wrong": [
      "adoribly",
      "adorabley"
    ]
  },
  {
    "word": "applicable",
    "meaning": "relevant and able to be applied",
    "sentence": "The rule is only ___ to pupils in Year 5.",
    "wrong": [
      "applicible",
      "aplicable"
    ]
  },
  {
    "word": "applicably",
    "meaning": "in a way that is relevant to the case",
    "sentence": "The tips were ___ chosen, so each one fitted its job.",
    "wrong": [
      "applicibly",
      "applicabley"
    ]
  },
  {
    "word": "considerable",
    "meaning": "large in amount or size",
    "sentence": "Building the model took a ___ amount of time.",
    "wrong": [
      "considerible",
      "considerabel"
    ]
  },
  {
    "word": "considerably",
    "meaning": "by a large amount",
    "sentence": "The giant was ___ taller than the dwarf.",
    "wrong": [
      "consideribly",
      "considerabley"
    ]
  },
  {
    "word": "tolerable",
    "meaning": "able to be put up with",
    "sentence": "The heat was strong but ___.",
    "wrong": [
      "tolerible",
      "tolerabel"
    ]
  },
  {
    "word": "tolerably",
    "meaning": "in a way that can just be put up with",
    "sentence": "The soup tasted ___ well: not great, but fine.",
    "wrong": [
      "toleribly",
      "tolerabley"
    ]
  },
  {
    "word": "changeable",
    "meaning": "likely to change",
    "sentence": "The weather in April is very ___.",
    "wrong": [
      "changeible",
      "changabel"
    ],
    "tip": "Keep the e after g so that g stays soft."
  },
  {
    "word": "noticeable",
    "meaning": "easy to see or spot",
    "sentence": "The dent in the car was very ___.",
    "wrong": [
      "noticable",
      "noticeible"
    ],
    "tip": "Keep the e after c so that c stays soft."
  },
  {
    "word": "forcible",
    "meaning": "done using force",
    "sentence": "The police made a ___ entry through the door.",
    "wrong": [
      "forcable",
      "forcibel"
    ]
  },
  {
    "word": "legible",
    "meaning": "clear enough to read",
    "sentence": "Zayn’s writing was so messy it was not ___.",
    "wrong": [
      "legable",
      "legibel"
    ]
  },
  {
    "word": "dependable",
    "meaning": "always there when you need help",
    "sentence": "Zayn is a ___ friend who always turns up.",
    "wrong": [
      "dependible",
      "dependabel"
    ]
  },
  {
    "word": "comfortable",
    "meaning": "soft, cosy and relaxing",
    "sentence": "The beanbag was warm and ___.",
    "wrong": [
      "comfortible",
      "comfterable"
    ]
  },
  {
    "word": "understandable",
    "meaning": "able to be understood",
    "sentence": "Her reason for being sad was ___.",
    "wrong": [
      "understandible",
      "understandabel"
    ]
  },
  {
    "word": "reasonable",
    "meaning": "fair and not too much",
    "sentence": "The shop sold sandwiches at a ___ price.",
    "wrong": [
      "reasonible",
      "reasonabel"
    ]
  },
  {
    "word": "enjoyable",
    "meaning": "giving pleasure",
    "sentence": "The trip to the farm was really ___.",
    "wrong": [
      "enjoyible",
      "enjoyabel"
    ]
  },
  {
    "word": "reliable",
    "meaning": "working well every time",
    "sentence": "The old bus was ___ and never broke down.",
    "wrong": [
      "relyable",
      "reliabel"
    ],
    "tip": "The y of rely changes to i before the ending."
  },
  {
    "word": "possible",
    "meaning": "able to happen",
    "sentence": "Is it ___ to see Jupiter tonight?",
    "wrong": [
      "possable",
      "possibel"
    ]
  },
  {
    "word": "possibly",
    "meaning": "perhaps",
    "sentence": "Dark clouds mean it will ___ rain.",
    "wrong": [
      "possably",
      "possibley"
    ]
  },
  {
    "word": "horrible",
    "meaning": "very unpleasant",
    "sentence": "The smell from the bin was ___.",
    "wrong": [
      "horrable",
      "horribel"
    ]
  },
  {
    "word": "horribly",
    "meaning": "in a very unpleasant way",
    "sentence": "The monster’s breath smelt ___.",
    "wrong": [
      "horrably",
      "horribley"
    ]
  },
  {
    "word": "terrible",
    "meaning": "extremely bad or serious",
    "sentence": "There was a ___ accident on the motorway.",
    "wrong": [
      "terrable",
      "terribel"
    ]
  },
  {
    "word": "terribly",
    "meaning": "very badly",
    "sentence": "The goalkeeper played ___ and let in ten goals.",
    "wrong": [
      "terrably",
      "terribley"
    ]
  },
  {
    "word": "visible",
    "meaning": "able to be seen",
    "sentence": "The Moon was ___ over the hills.",
    "wrong": [
      "visable",
      "visibel"
    ]
  },
  {
    "word": "visibly",
    "meaning": "in a way that can be seen",
    "sentence": "Amara was ___ shaking with cold.",
    "wrong": [
      "visably",
      "visibley"
    ]
  },
  {
    "word": "incredible",
    "meaning": "too amazing to be believed",
    "sentence": "The magician’s trick was ___.",
    "wrong": [
      "incredable",
      "incredibel"
    ]
  },
  {
    "word": "incredibly",
    "meaning": "extremely; amazingly",
    "sentence": "The cheetah was ___ fast.",
    "wrong": [
      "incredably",
      "incredibley"
    ]
  },
  {
    "word": "sensible",
    "meaning": "showing good judgement",
    "sentence": "It is ___ to wear a coat in the snow.",
    "wrong": [
      "sensable",
      "sensibel"
    ]
  },
  {
    "word": "sensibly",
    "meaning": "in a wise way",
    "sentence": "Ellie ___ packed a torch for the cave.",
    "wrong": [
      "sensably",
      "sensibley"
    ]
  },
  {
    "word": "breakable",
    "meaning": "able to be broken",
    "sentence": "Be careful with the ___ glass vase.",
    "wrong": [
      "breakible",
      "breakabel"
    ]
  },
  {
    "word": "edible",
    "meaning": "safe to eat",
    "sentence": "Not every wild mushroom is ___.",
    "wrong": [
      "edable",
      "edibel"
    ]
  },
  {
    "word": "flexible",
    "meaning": "able to bend easily",
    "sentence": "Gymnasts need ___ bodies.",
    "wrong": [
      "flexable",
      "flexibel"
    ]
  },
  {
    "word": "audible",
    "meaning": "loud enough to be heard",
    "sentence": "The whisper was barely ___.",
    "wrong": [
      "audable",
      "audibel"
    ]
  },
  {
    "word": "valuable",
    "meaning": "worth a lot of money",
    "sentence": "The ___ painting hung in the museum.",
    "wrong": [
      "valueable",
      "valuble"
    ]
  }
];
export function buildTheEndingsAbleAndIbleQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
