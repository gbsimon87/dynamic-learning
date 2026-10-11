import { wordQuestions } from "./year2Practice.js";

/** Compound Words and Nouns: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "A compound (joined word) has two words. A noun names a person, place or thing. Some nouns end in er or ness.";
export const BANK = [
  {
    "answer": "whiteboard",
    "wrong": [
      "whitebord",
      "witeboard"
    ],
    "clue": "Join white + board to name the classroom writing surface."
  },
  {
    "answer": "superman",
    "wrong": [
      "supermann",
      "supaman"
    ],
    "clue": "Join super + man to name a man with special powers in a story."
  },
  {
    "answer": "sunflower",
    "wrong": [
      "sunflour",
      "sunflowr"
    ],
    "clue": "Join sun + flower to name the tall plant with yellow petals."
  },
  {
    "answer": "football",
    "wrong": [
      "footbal",
      "futball"
    ],
    "clue": "Join foot + ball to name a game played by kicking a ball."
  },
  {
    "answer": "playground",
    "wrong": [
      "playgrownd",
      "playgroun"
    ],
    "clue": "Join play + ground to name a place where children play."
  },
  {
    "answer": "raincoat",
    "wrong": [
      "raincote",
      "raincoatt"
    ],
    "clue": "Join rain + coat to name something that keeps rain off you."
  },
  {
    "answer": "classroom",
    "wrong": [
      "clasroom",
      "classrum"
    ],
    "clue": "Join class + room to name the room where pupils learn."
  },
  {
    "answer": "teapot",
    "wrong": [
      "teapott",
      "teaput"
    ],
    "clue": "Join tea + pot to name the container used to make tea."
  },
  {
    "answer": "snowman",
    "wrong": [
      "snowmann",
      "snowmun"
    ],
    "clue": "Join snow + man to name a figure made from snow."
  },
  {
    "answer": "paintbrush",
    "wrong": [
      "paintbrushe",
      "paintbrsh"
    ],
    "clue": "Join paint + brush to name a tool for painting."
  },
  {
    "answer": "teacher",
    "wrong": [
      "teachar",
      "teacherr"
    ],
    "clue": "Add er to teach. Name a person who teaches."
  },
  {
    "answer": "helper",
    "wrong": [
      "helpar",
      "helperr"
    ],
    "clue": "Add er to help. Name a person who helps."
  },
  {
    "answer": "farmer",
    "wrong": [
      "farmar",
      "farmerer"
    ],
    "clue": "Add er to farm. Name a person who works on a farm."
  },
  {
    "answer": "kindness",
    "wrong": [
      "kindnes",
      "kindniss"
    ],
    "clue": "Add ness to kind. Name the quality of being kind."
  },
  {
    "answer": "darkness",
    "wrong": [
      "darknes",
      "darkniss"
    ],
    "clue": "Add ness to dark. Name the state of being dark."
  }
];
export function buildQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
