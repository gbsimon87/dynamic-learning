import { wordQuestions } from "./year5Practice.js";
/** The endings ant, ance, ent and ence: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "Use –ant/–ance/–ancy if a related word has an a sound (observant, observation). Use –ent/–ence/–ency after soft c or g, or if a related word has a clear e sound.";
export const BANK = [
  {
    "word": "observant",
    "meaning": "quick to notice things",
    "sentence": "The ___ detective spotted a tiny footprint.",
    "wrong": [
      "observent",
      "obzervant"
    ],
    "tip": "Think of observation: the sound before the ending is an a."
  },
  {
    "word": "observance",
    "meaning": "the act of following a rule or custom",
    "sentence": "Strict ___ of the safety rules keeps everyone safe.",
    "wrong": [
      "observence",
      "observanse"
    ]
  },
  {
    "word": "expectant",
    "meaning": "waiting hopefully for something to happen",
    "sentence": "The ___ crowd waited for the show to begin.",
    "wrong": [
      "expectent",
      "expectunt"
    ],
    "tip": "Think of expectation: the sound before the ending is an a."
  },
  {
    "word": "hesitant",
    "meaning": "unsure and slow to act",
    "sentence": "Zayn was ___ about jumping off the high board.",
    "wrong": [
      "hesitent",
      "hezitant"
    ]
  },
  {
    "word": "hesitancy",
    "meaning": "a slow, unsure pause before you act",
    "sentence": "The ___ in his voice showed he was not sure.",
    "wrong": [
      "hesitency",
      "hesitansy"
    ]
  },
  {
    "word": "tolerant",
    "meaning": "willing to accept other people’s views and ways",
    "sentence": "A ___ teacher listens to many different opinions.",
    "wrong": [
      "tolerent",
      "tollerant"
    ]
  },
  {
    "word": "tolerance",
    "meaning": "willingness to accept people who are different",
    "sentence": "We learn ___ by respecting other people.",
    "wrong": [
      "tolerence",
      "tolerrance"
    ]
  },
  {
    "word": "substance",
    "meaning": "a particular kind of material",
    "sentence": "The sticky ___ on the floor turned out to be honey.",
    "wrong": [
      "substence",
      "substanse"
    ],
    "tip": "Think of substantial: the sound before the ending is an a."
  },
  {
    "word": "innocent",
    "meaning": "not guilty of doing wrong",
    "sentence": "Biscuit looked ___, but there was cake on his nose.",
    "wrong": [
      "innocant",
      "inocent"
    ]
  },
  {
    "word": "innocence",
    "meaning": "being free from guilt or blame",
    "sentence": "Amara protested her ___ when asked about the missing pen.",
    "wrong": [
      "innocense",
      "innocance"
    ]
  },
  {
    "word": "decent",
    "meaning": "good enough; of fair quality",
    "sentence": "Leo found a ___ pair of boots for the muddy walk.",
    "wrong": [
      "decient",
      "desent"
    ]
  },
  {
    "word": "decency",
    "meaning": "polite, honest and fair behaviour",
    "sentence": "He had the ___ to say sorry.",
    "wrong": [
      "decensy",
      "decancy"
    ]
  },
  {
    "word": "frequent",
    "meaning": "happening often",
    "sentence": "Rain is a ___ visitor in Wales.",
    "wrong": [
      "frequant",
      "frequint"
    ]
  },
  {
    "word": "frequency",
    "meaning": "how often something happens",
    "sentence": "The ___ of the buses is one every ten minutes.",
    "wrong": [
      "frequancy",
      "frequensy"
    ]
  },
  {
    "word": "confident",
    "meaning": "sure of yourself",
    "sentence": "Zayn felt ___ before the quiz.",
    "wrong": [
      "confidint",
      "confedent"
    ],
    "tip": "A related word meaning “secret” has a clear e sound before its ending."
  },
  {
    "word": "confidence",
    "meaning": "belief in yourself",
    "sentence": "Amara walked on stage with great ___.",
    "wrong": [
      "confidance",
      "confidense"
    ]
  },
  {
    "word": "assistant",
    "meaning": "a person who helps",
    "sentence": "The shop ___ helped Leo find the right size.",
    "wrong": [
      "assistent",
      "asistant"
    ]
  },
  {
    "word": "assistance",
    "meaning": "help",
    "sentence": "Priya asked for ___ with the heavy box.",
    "wrong": [
      "assistence",
      "assistanse"
    ]
  },
  {
    "word": "obedient",
    "meaning": "doing what you are told",
    "sentence": "Biscuit is an ___ dog who sits on command.",
    "wrong": [
      "obediant",
      "obedeint"
    ]
  },
  {
    "word": "obedience",
    "meaning": "doing as you are told",
    "sentence": "The dog school teaches ___.",
    "wrong": [
      "obediance",
      "obedence"
    ]
  },
  {
    "word": "independent",
    "meaning": "able to do things without help from others",
    "sentence": "Ellie is ___ and ties her own laces.",
    "wrong": [
      "independant",
      "indipendent"
    ]
  },
  {
    "word": "independence",
    "meaning": "freedom from being controlled by others",
    "sentence": "The country celebrated its ___ with fireworks.",
    "wrong": [
      "independance",
      "independense"
    ]
  },
  {
    "word": "distant",
    "meaning": "far away",
    "sentence": "A ___ planet showed as a tiny dot in the telescope.",
    "wrong": [
      "distent",
      "distint"
    ]
  },
  {
    "word": "patient",
    "meaning": "calm and able to wait without getting cross",
    "sentence": "Zayn was ___ while the cake baked.",
    "wrong": [
      "patiant",
      "patiunt"
    ]
  },
  {
    "word": "different",
    "meaning": "not the same",
    "sentence": "Amara’s drawing looks ___ from Leo’s.",
    "wrong": [
      "diferent",
      "differant"
    ]
  },
  {
    "word": "absence",
    "meaning": "a time of being away",
    "sentence": "Priya’s ___ from school lasted three days.",
    "wrong": [
      "absense",
      "absance"
    ]
  },
  {
    "word": "silence",
    "meaning": "complete quiet",
    "sentence": "There was ___ in the hall as the test began.",
    "wrong": [
      "silance",
      "sylence"
    ]
  }
];
export function buildTheEndingsAntAnceEntAndEnceQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
