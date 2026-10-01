import { sentenceQuestions } from "./year4Practice.js";
/** Commas after Fronted Adverbials: docs/curriculum/year-3-and-4-english.md, Year 4 mapping. */
export const RULE = "A fronted adverbial (opening phrase) needs a comma at its end, before the main clause.";
export const BANK = [
  {
    "sentence": "___ Leo finished the model.",
    "answer": "Later that day,",
    "wrong": [
      "Later that day",
      "Later , that day"
    ],
    "prompt": "Choose the opening with the comma in the correct place.",
    "hint": "The comma separates the whole opening phrase from the main clause."
  },
  {
    "sentence": "___ Priya fed the cat.",
    "answer": "Before breakfast,",
    "wrong": [
      "Before breakfast",
      "Before , breakfast"
    ],
    "prompt": "Choose the opening with the comma in the correct place.",
    "hint": "The comma separates the whole opening phrase from the main clause."
  },
  {
    "sentence": "___ Zayn checked the garden.",
    "answer": "After the storm,",
    "wrong": [
      "After the storm",
      "After , the storm"
    ],
    "prompt": "Choose the opening with the comma in the correct place.",
    "hint": "The comma separates the whole opening phrase from the main clause."
  },
  {
    "sentence": "___ Amara opened the curtains.",
    "answer": "Early in the morning,",
    "wrong": [
      "Early in the morning",
      "Early , in the morning"
    ],
    "prompt": "Choose the opening with the comma in the correct place.",
    "hint": "The comma separates the whole opening phrase from the main clause."
  },
  {
    "sentence": "___ Ellie walked home.",
    "answer": "At sunset,",
    "wrong": [
      "At sunset",
      "At , sunset"
    ],
    "prompt": "Choose the opening with the comma in the correct place.",
    "hint": "The comma separates the whole opening phrase from the main clause."
  },
  {
    "sentence": "___ Biscuit waited patiently.",
    "answer": "Near the gate,",
    "wrong": [
      "Near the gate",
      "Near , the gate"
    ],
    "prompt": "Choose the opening with the comma in the correct place.",
    "hint": "The comma separates the whole opening phrase from the main clause."
  },
  {
    "sentence": "___ the river flowed quietly.",
    "answer": "Under the bridge,",
    "wrong": [
      "Under the bridge",
      "Under , the bridge"
    ],
    "prompt": "Choose the opening with the comma in the correct place.",
    "hint": "The comma separates the whole opening phrase from the main clause."
  },
  {
    "sentence": "___ Priya found a feather.",
    "answer": "Beside the pond,",
    "wrong": [
      "Beside the pond",
      "Beside , the pond"
    ],
    "prompt": "Choose the opening with the comma in the correct place.",
    "hint": "The comma separates the whole opening phrase from the main clause."
  },
  {
    "sentence": "___ Leo spotted the kite.",
    "answer": "Across the field,",
    "wrong": [
      "Across the field",
      "Across , the field"
    ],
    "prompt": "Choose the opening with the comma in the correct place.",
    "hint": "The comma separates the whole opening phrase from the main clause."
  },
  {
    "sentence": "___ Zayn heard an echo.",
    "answer": "Inside the cave,",
    "wrong": [
      "Inside the cave",
      "Inside , the cave"
    ],
    "prompt": "Choose the opening with the comma in the correct place.",
    "hint": "The comma separates the whole opening phrase from the main clause."
  },
  {
    "sentence": "___ Amara carried the vase.",
    "answer": "With great care,",
    "wrong": [
      "With great care",
      "With , great care"
    ],
    "prompt": "Choose the opening with the comma in the correct place.",
    "hint": "The comma separates the whole opening phrase from the main clause."
  },
  {
    "sentence": "___ Ellie opened the door.",
    "answer": "Without a sound,",
    "wrong": [
      "Without a sound",
      "Without , a sound"
    ],
    "prompt": "Choose the opening with the comma in the correct place.",
    "hint": "The comma separates the whole opening phrase from the main clause."
  },
  {
    "sentence": "___ Leo ran to the station.",
    "answer": "As fast as he could,",
    "wrong": [
      "As fast as he could",
      "As , fast as he could"
    ],
    "prompt": "Choose the opening with the comma in the correct place.",
    "hint": "The comma separates the whole opening phrase from the main clause."
  },
  {
    "sentence": "___ Priya welcomed everyone.",
    "answer": "With a cheerful smile,",
    "wrong": [
      "With a cheerful smile",
      "With , a cheerful smile"
    ],
    "prompt": "Choose the opening with the comma in the correct place.",
    "hint": "The comma separates the whole opening phrase from the main clause."
  },
  {
    "sentence": "___ Zayn answered the question.",
    "answer": "After a short pause,",
    "wrong": [
      "After a short pause",
      "After , a short pause"
    ],
    "prompt": "Choose the opening with the comma in the correct place.",
    "hint": "The comma separates the whole opening phrase from the main clause."
  }
];
export function buildCommasAfterFrontedAdverbialsQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng);
}
