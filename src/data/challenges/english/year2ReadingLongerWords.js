import { wordQuestions } from "./year2Practice.js";

/** Reading Longer Words: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "Read each part of a longer word, then blend the parts together.";
export const BANK = [
  {
    "answer": "windmill",
    "wrong": [
      "windmil",
      "windmell"
    ],
    "clue": "Blend wind + mill. It turns in the wind."
  },
  {
    "answer": "sunset",
    "wrong": [
      "sunsett",
      "sonset"
    ],
    "clue": "Blend sun + set. The sun goes down."
  },
  {
    "answer": "rabbit",
    "wrong": [
      "rabit",
      "rabbitt"
    ],
    "clue": "Blend rab + bit. It is an animal with long ears."
  },
  {
    "answer": "carrot",
    "wrong": [
      "carot",
      "carrott"
    ],
    "clue": "Blend car + rot. It is an orange vegetable."
  },
  {
    "answer": "picnic",
    "wrong": [
      "piknic",
      "picnick"
    ],
    "clue": "Blend pic + nic. It is a meal outside."
  },
  {
    "answer": "basket",
    "wrong": [
      "baskit",
      "bascket"
    ],
    "clue": "Blend bas + ket. It is a woven container."
  },
  {
    "answer": "rocket",
    "wrong": [
      "rockit",
      "roket"
    ],
    "clue": "Blend rock + et. It can travel into space."
  },
  {
    "answer": "button",
    "wrong": [
      "buton",
      "buttun"
    ],
    "clue": "Blend but + ton. It fastens a shirt."
  },
  {
    "answer": "garden",
    "wrong": [
      "gardun",
      "gardenn"
    ],
    "clue": "Blend gar + den. It is a place to grow plants."
  },
  {
    "answer": "market",
    "wrong": [
      "markit",
      "markett"
    ],
    "clue": "Blend mar + ket. It is a place with stalls selling things."
  },
  {
    "answer": "helmet",
    "wrong": [
      "hellmet",
      "helmit"
    ],
    "clue": "Blend hel + met. It protects your head."
  },
  {
    "answer": "velvet",
    "wrong": [
      "velvit",
      "velvett"
    ],
    "clue": "Blend vel + vet. It is a soft cloth."
  },
  {
    "answer": "magnet",
    "wrong": [
      "magnit",
      "magnett"
    ],
    "clue": "Blend mag + net. It can pull some metals."
  },
  {
    "answer": "robin",
    "wrong": [
      "robbin",
      "robinn"
    ],
    "clue": "Blend rob + in. It is a bird with a red breast."
  },
  {
    "answer": "sandpit",
    "wrong": [
      "sandpitt",
      "sandpet"
    ],
    "clue": "Blend sand + pit. It is a place to play in sand."
  }
];
export function buildQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
