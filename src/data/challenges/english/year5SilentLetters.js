import { wordQuestions } from "./year5Practice.js";
/** Silent letters: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "A silent letter is written but not heard. Many were once sounded hundreds of years ago, so you have to learn them (the k in knight used to be said).";
export const BANK = [
  {
    "word": "doubt",
    "meaning": "a feeling of not being sure",
    "sentence": "There is no ___ that Biscuit ate the cake.",
    "wrong": [
      "dout",
      "doupt"
    ],
    "tip": "A silent b sits in the middle."
  },
  {
    "word": "island",
    "meaning": "a piece of land with water all around it",
    "sentence": "They sailed to a tiny ___ in the bay.",
    "wrong": [
      "iland",
      "ilend"
    ],
    "tip": "A silent s sits in the middle."
  },
  {
    "word": "lamb",
    "meaning": "a young sheep",
    "sentence": "The ___ skipped across the field.",
    "wrong": [
      "lamn",
      "lamm"
    ],
    "tip": "A silent b sits at the end."
  },
  {
    "word": "solemn",
    "meaning": "serious and quiet",
    "sentence": "The soldiers stood in ___ silence.",
    "wrong": [
      "solem",
      "solemm"
    ],
    "tip": "A silent n sits at the end."
  },
  {
    "word": "thistle",
    "meaning": "a prickly plant with purple flowers",
    "sentence": "The ___ is the national flower of Scotland.",
    "wrong": [
      "thissle",
      "thisle"
    ],
    "tip": "A silent t sits in the middle."
  },
  {
    "word": "knight",
    "meaning": "a soldier of long ago who wore armour",
    "sentence": "The ___ rode his horse into the castle.",
    "wrong": [
      "nite",
      "knite"
    ],
    "tip": "This one has a silent k and a silent gh."
  },
  {
    "word": "knife",
    "meaning": "a tool with a sharp blade for cutting",
    "sentence": "Dad cut the bread with a sharp ___.",
    "wrong": [
      "nife",
      "knif"
    ],
    "tip": "A silent k comes first."
  },
  {
    "word": "knee",
    "meaning": "the joint in the middle of your leg",
    "sentence": "Leo grazed his ___ when he fell off his bike.",
    "wrong": [
      "kney",
      "knea"
    ],
    "tip": "A silent k comes first."
  },
  {
    "word": "wrist",
    "meaning": "the joint between your hand and your arm",
    "sentence": "Amara wears her watch on her ___.",
    "wrong": [
      "rist",
      "wrisst"
    ],
    "tip": "A silent w comes first."
  },
  {
    "word": "wrong",
    "meaning": "not correct",
    "sentence": "Zayn gave the ___ answer by mistake.",
    "wrong": [
      "rong",
      "wron"
    ],
    "tip": "A silent w comes first."
  },
  {
    "word": "gnome",
    "meaning": "a tiny garden figure with a pointy hat",
    "sentence": "A stone ___ sat by the pond.",
    "wrong": [
      "nome",
      "gnom"
    ],
    "tip": "A silent g comes first."
  },
  {
    "word": "thumb",
    "meaning": "the short, thick finger on your hand",
    "sentence": "Priya hurt her ___ in the door.",
    "wrong": [
      "thum",
      "thumm"
    ],
    "tip": "A silent b sits at the end."
  },
  {
    "word": "climb",
    "meaning": "to go up using your hands and feet",
    "sentence": "Zayn loves to ___ trees.",
    "wrong": [
      "clim",
      "climm"
    ],
    "tip": "A silent b sits at the end."
  },
  {
    "word": "calm",
    "meaning": "quiet and peaceful",
    "sentence": "The lake was flat and ___ this morning.",
    "wrong": [
      "caum",
      "calmm"
    ],
    "tip": "A silent l sits in the middle."
  },
  {
    "word": "castle",
    "meaning": "a large old building with thick walls and towers",
    "sentence": "We toured the ___ with its stone towers.",
    "wrong": [
      "cassle",
      "casle"
    ],
    "tip": "A silent t sits in the middle."
  },
  {
    "word": "listen",
    "meaning": "to pay attention to a sound",
    "sentence": "Please ___ carefully to the story.",
    "wrong": [
      "lissen",
      "lisen"
    ],
    "tip": "A silent t sits in the middle."
  },
  {
    "word": "whistle",
    "meaning": "a high sound made by blowing through your lips",
    "sentence": "The referee blew her ___ to start the game.",
    "wrong": [
      "whissle",
      "whistel"
    ],
    "tip": "Two silent letters: a w after the first and a t in the middle."
  },
  {
    "word": "honest",
    "meaning": "truthful and fair",
    "sentence": "Be ___ and tell me what happened.",
    "wrong": [
      "onest",
      "honist"
    ],
    "tip": "A silent h comes first."
  },
  {
    "word": "hour",
    "meaning": "sixty minutes",
    "sentence": "The film lasts one ___.",
    "wrong": [
      "hower",
      "houer"
    ],
    "tip": "A silent h comes first."
  },
  {
    "word": "autumn",
    "meaning": "the season between summer and winter",
    "sentence": "Leaves turn gold in ___.",
    "wrong": [
      "autum",
      "autumm"
    ],
    "tip": "A silent n sits at the end."
  },
  {
    "word": "column",
    "meaning": "a tall stone pillar",
    "sentence": "A stone ___ held up the roof.",
    "wrong": [
      "colum",
      "collumn"
    ],
    "tip": "A silent n sits at the end."
  }
];
export function buildSilentLettersQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
