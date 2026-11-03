import { wordQuestions } from "./year5Practice.js";
/** Homophones and confusing words: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "Some words sound alike but mean different things. Nouns end –ce and verbs end –se (advice, advise). For other pairs, check the meaning.";
export const BANK = [
  {
    "word": "advice",
    "meaning": "helpful ideas about what someone should do",
    "sentence": "Priya asked her gran for ___ about her project.",
    "wrong": [
      "advise",
      "adviss"
    ],
    "tip": "A noun (a thing) ends –ce."
  },
  {
    "word": "advise",
    "meaning": "to tell someone what you think they should do",
    "sentence": "Teachers ___ pupils to read every day.",
    "wrong": [
      "advice",
      "advize"
    ],
    "tip": "A verb (an action) ends –se."
  },
  {
    "word": "device",
    "meaning": "a machine or gadget made for a job",
    "sentence": "Zayn built a ___ to feed the cat.",
    "wrong": [
      "devise",
      "divice"
    ],
    "tip": "A noun (a thing) ends –ce."
  },
  {
    "word": "devise",
    "meaning": "to invent or plan something clever",
    "sentence": "Can you ___ a plan to catch the runaway balloon?",
    "wrong": [
      "device",
      "devize"
    ],
    "tip": "A verb (an action) ends –se."
  },
  {
    "word": "licence",
    "meaning": "an official paper that gives you permission",
    "sentence": "Dad has a driving ___.",
    "wrong": [
      "license",
      "lisence"
    ],
    "tip": "A noun (a thing) ends –ce."
  },
  {
    "word": "license",
    "meaning": "to give official permission",
    "sentence": "The council will ___ the new market.",
    "wrong": [
      "licence",
      "lisense"
    ],
    "tip": "A verb (an action) ends –se."
  },
  {
    "word": "practice",
    "meaning": "training done again and again",
    "sentence": "Leo goes to football ___ on Fridays.",
    "wrong": [
      "practise",
      "practis"
    ],
    "tip": "A noun (a thing) ends –ce."
  },
  {
    "word": "practise",
    "meaning": "to do something again and again to get better",
    "sentence": "Amara must ___ the piano every day.",
    "wrong": [
      "practice",
      "practize"
    ],
    "tip": "A verb (an action) ends –se."
  },
  {
    "word": "prophecy",
    "meaning": "a statement about what will happen in the future",
    "sentence": "The old ___ said a great storm would come.",
    "wrong": [
      "prophesy",
      "prophecey"
    ],
    "tip": "A noun (a thing) ends –cy."
  },
  {
    "word": "prophesy",
    "meaning": "to say what will happen in the future",
    "sentence": "The fortune teller claimed she could ___ the weather.",
    "wrong": [
      "prophecy",
      "prophasy"
    ],
    "tip": "A verb (an action) ends –sy."
  },
  {
    "word": "aisle",
    "meaning": "a gangway between rows of seats or shelves",
    "sentence": "Leo pushed the trolley down the pasta ___.",
    "wrong": [
      "isle",
      "aile"
    ]
  },
  {
    "word": "isle",
    "meaning": "a small island",
    "sentence": "They sailed to a tiny ___ off the coast.",
    "wrong": [
      "aisle",
      "ile"
    ]
  },
  {
    "word": "aloud",
    "meaning": "in a voice that people can hear",
    "sentence": "Ellie read her poem ___ to the class.",
    "wrong": [
      "allowed",
      "alowd"
    ]
  },
  {
    "word": "allowed",
    "meaning": "permitted",
    "sentence": "Pupils are ___ to bring a healthy snack.",
    "wrong": [
      "aloud",
      "alowed"
    ]
  },
  {
    "word": "altar",
    "meaning": "a table in a church used for religious services",
    "sentence": "Candles stood on the ___.",
    "wrong": [
      "alter",
      "altir"
    ]
  },
  {
    "word": "alter",
    "meaning": "to change",
    "sentence": "Amara wanted to ___ the ending of her story.",
    "wrong": [
      "altar",
      "altur"
    ]
  },
  {
    "word": "ascent",
    "meaning": "a climb upwards",
    "sentence": "The ___ of the mountain took six hours.",
    "wrong": [
      "assent",
      "asent"
    ]
  },
  {
    "word": "assent",
    "meaning": "agreement or permission",
    "sentence": "The headteacher gave her ___ to the plan.",
    "wrong": [
      "ascent",
      "acent"
    ]
  },
  {
    "word": "bridal",
    "meaning": "to do with a bride at a wedding",
    "sentence": "The shop sells ___ gowns.",
    "wrong": [
      "bridle",
      "bridel"
    ]
  },
  {
    "word": "bridle",
    "meaning": "straps worn on a horse’s head to steer it",
    "sentence": "Zayn slipped the ___ over the pony’s head.",
    "wrong": [
      "bridal",
      "bridul"
    ]
  },
  {
    "word": "cereal",
    "meaning": "a grain food eaten at breakfast",
    "sentence": "Leo poured milk on his ___.",
    "wrong": [
      "serial",
      "cerial"
    ]
  },
  {
    "word": "serial",
    "meaning": "a story told in parts, one after another",
    "sentence": "Each episode of the ___ ends on a cliffhanger.",
    "wrong": [
      "cereal",
      "serrial"
    ]
  },
  {
    "word": "compliment",
    "meaning": "a kind remark about someone",
    "sentence": "Priya gave Zayn a ___ on his painting.",
    "wrong": [
      "complement",
      "complimant"
    ]
  },
  {
    "word": "complement",
    "meaning": "to make something look or work better by being added to it",
    "sentence": "A green scarf will ___ her red coat nicely.",
    "wrong": [
      "compliment",
      "complemant"
    ]
  },
  {
    "word": "guessed",
    "meaning": "gave an answer without being sure of it",
    "sentence": "Leo ___ the right number of sweets in the jar.",
    "wrong": [
      "guest",
      "gessed"
    ]
  },
  {
    "word": "guest",
    "meaning": "a visitor",
    "sentence": "Ellie’s ___ stayed for dinner.",
    "wrong": [
      "guessed",
      "gest"
    ]
  },
  {
    "word": "heard",
    "meaning": "took in a sound with your ears",
    "sentence": "Amara ___ a strange noise in the attic.",
    "wrong": [
      "herd",
      "hurd"
    ]
  },
  {
    "word": "herd",
    "meaning": "a group of animals that live together",
    "sentence": "A ___ of cows crossed the road.",
    "wrong": [
      "heard",
      "hird"
    ]
  },
  {
    "word": "led",
    "meaning": "went in front and showed the way",
    "sentence": "Yesterday Zayn ___ the team onto the pitch.",
    "wrong": [
      "lead",
      "ledd"
    ]
  },
  {
    "word": "lead",
    "meaning": "a soft, heavy, grey metal",
    "sentence": "The old pipe was made of ___.",
    "wrong": [
      "led",
      "leed"
    ]
  },
  {
    "word": "morning",
    "meaning": "the early part of the day",
    "sentence": "Biscuit goes for a walk every ___.",
    "wrong": [
      "mourning",
      "morrning"
    ]
  },
  {
    "word": "mourning",
    "meaning": "feeling and showing sadness because someone has died",
    "sentence": "The whole town was in ___ after the sad news.",
    "wrong": [
      "morning",
      "murning"
    ]
  }
];
export function buildHomophonesAndConfusingWordsQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
