import { readingQuestions } from "./year5Practice.js";
/** Comparing Characters and Settings: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "To compare two characters or settings, say what is the same and what is different, using details from the text.";
export const BANK = [
  {
    "title": "Rock Pool Day",
    "short": "Amara and Leo went to the same match. Amara jumped up and cheered at every kick. Leo sat quietly by the fence, sketching the players.",
    "intro": [
      {
        "prompt": "How are Amara and Leo different at the match?",
        "answer": "Amara cheers loudly, but Leo sits quietly.",
        "wrong": [
          "Leo cheers loudly, but Amara sits quietly.",
          "Amara sketches, but Leo cheers."
        ]
      },
      {
        "prompt": "What do Amara and Leo have in common?",
        "answer": "They are at the same match.",
        "wrong": [
          "They both sketch the players.",
          "They both cheer at every kick."
        ]
      },
      {
        "prompt": "Which character is quieter?",
        "answer": "Leo",
        "wrong": [
          "Amara",
          "Neither of them"
        ]
      }
    ],
    "evidence": [
      "At Pebble Bay, the tide had gone out and left glittering rock pools.",
      "Priya knelt at the edge of the biggest one.",
      "She barely breathed while she watched the water.",
      "She moved so slowly that a tiny shrimp drifted straight past her fingers.",
      "Her notebook lay open on her knee, and she drew each creature with a sharp pencil.",
      "Zayn had no patience for sitting still.",
      "He leapt from rock to rock in his wellies, splashing and shouting, “Look at this one!”",
      "Zayn scooped up a crab in his bucket, then tipped it gently back.",
      "He swung his bucket as he went, clanking it against the stones.",
      "Both of them laughed when the crab scuttled sideways into the weeds."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "At Pebble Bay, the tide had gone out and left glittering rock pools."
      },
      {
        "type": "p",
        "text": "Priya knelt at the edge of the biggest one. She barely breathed while she watched the water. She moved so slowly that a tiny shrimp drifted straight past her fingers. Her notebook lay open on her knee, and she drew each creature with a sharp pencil."
      },
      {
        "type": "p",
        "text": "Zayn had no patience for sitting still. He leapt from rock to rock in his wellies, splashing and shouting, “Look at this one!” Zayn scooped up a crab in his bucket, then tipped it gently back. He swung his bucket as he went, clanking it against the stones. Both of them laughed when the crab scuttled sideways into the weeds."
      }
    ],
    "groups": [
      {
        "label": "Priya",
        "cards": [
          "Priya knelt at the edge of the biggest one.",
          "She barely breathed while she watched the water.",
          "She moved so slowly that a tiny shrimp drifted straight past her fingers.",
          "Her notebook lay open on her knee, and she drew each creature with a sharp pencil."
        ]
      },
      {
        "label": "Zayn",
        "cards": [
          "Zayn had no patience for sitting still.",
          "He leapt from rock to rock in his wellies, splashing and shouting, “Look at this one!”",
          "Zayn scooped up a crab in his bucket, then tipped it gently back.",
          "He swung his bucket as he went, clanking it against the stones."
        ]
      }
    ],
    "sortPrompt": "Sort the sentences. Does each one describe Priya or Zayn?",
    "questions": [
      {
        "prompt": "How are Priya and Zayn different?",
        "answer": "Priya moves slowly and quietly, but Zayn rushes about noisily.",
        "wrong": [
          "Priya shouts and splashes, but Zayn draws.",
          "Priya is afraid of crabs, but Zayn is not."
        ],
        "evidencePrompt": "Tap the sentence that shows Zayn cannot sit still.",
        "evidence": "Zayn had no patience for sitting still."
      },
      {
        "prompt": "What do the two children have in common?",
        "answer": "Both enjoy watching the sea creatures.",
        "wrong": [
          "Both draw in notebooks.",
          "Both swing a bucket."
        ],
        "evidencePrompt": "Tap the sentence that shows both children enjoying the crab.",
        "evidence": "Both of them laughed when the crab scuttled sideways into the weeds."
      },
      {
        "prompt": "Which detail belongs to Priya?",
        "answer": "She draws the creatures in a notebook.",
        "wrong": [
          "She carries a bucket.",
          "She leaps from rock to rock."
        ],
        "evidencePrompt": "Tap the sentence that shows how Priya records what she sees.",
        "evidence": "Her notebook lay open on her knee, and she drew each creature with a sharp pencil."
      },
      {
        "prompt": "Why does a shrimp come so close to Priya?",
        "answer": "She keeps very still.",
        "wrong": [
          "She has a net.",
          "She shouts to attract it."
        ],
        "evidencePrompt": "Tap the sentence that shows how close the shrimp came.",
        "evidence": "She moved so slowly that a tiny shrimp drifted straight past her fingers."
      }
    ]
  },
  {
    "title": "Market and Harbour",
    "short": "Zayn’s classroom was loud and bright, full of chattering children. The school library was quiet and dim, with only the rustle of pages and the tick of a clock.",
    "intro": [
      {
        "prompt": "Which words describe the classroom?",
        "answer": "Loud and bright",
        "wrong": [
          "Quiet and dim",
          "Empty and cold"
        ]
      },
      {
        "prompt": "How is the library different from the classroom?",
        "answer": "It is quieter and darker.",
        "wrong": [
          "It is noisier and brighter.",
          "It is bigger and busier."
        ]
      },
      {
        "prompt": "What do the two places have in common?",
        "answer": "They are both rooms in the school.",
        "wrong": [
          "They are both dim.",
          "They are both full of chatter."
        ]
      }
    ],
    "evidence": [
      "On Saturdays, Bridgeford Market roared with life.",
      "Traders shouted their prices over the blare of music.",
      "The smell of fried onions drifted between the crowded stalls.",
      "Shoppers jostled past her elbows, and she could hardly hear her own thoughts.",
      "Her grandmother’s village, Little Crake, was different.",
      "Only one gull cried over the harbour, and the water slapped softly against the wall.",
      "The air smelled of salt and seaweed.",
      "A fisherman mended his nets on the quay and nodded without a word.",
      "In the quiet, Amara could finally hear her own thoughts.",
      "Yet in both places, Amara bought chips and ate them hot."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "On Saturdays, Bridgeford Market roared with life. Traders shouted their prices over the blare of music. The smell of fried onions drifted between the crowded stalls. Shoppers jostled past her elbows, and she could hardly hear her own thoughts."
      },
      {
        "type": "p",
        "text": "Her grandmother’s village, Little Crake, was different. Only one gull cried over the harbour, and the water slapped softly against the wall. The air smelled of salt and seaweed. A fisherman mended his nets on the quay and nodded without a word. In the quiet, Amara could finally hear her own thoughts. Yet in both places, Amara bought chips and ate them hot."
      }
    ],
    "groups": [
      {
        "label": "Bridgeford Market",
        "cards": [
          "On Saturdays, Bridgeford Market roared with life.",
          "Traders shouted their prices over the blare of music.",
          "The smell of fried onions drifted between the crowded stalls.",
          "Shoppers jostled past her elbows, and she could hardly hear her own thoughts."
        ]
      },
      {
        "label": "Little Crake",
        "cards": [
          "Only one gull cried over the harbour, and the water slapped softly against the wall.",
          "The air smelled of salt and seaweed.",
          "A fisherman mended his nets on the quay and nodded without a word.",
          "In the quiet, Amara could finally hear her own thoughts."
        ]
      }
    ],
    "sortPrompt": "Sort the sentences. Does each one describe Bridgeford Market or Little Crake?",
    "questions": [
      {
        "prompt": "How is the harbour different from the market?",
        "answer": "The harbour is quiet, but the market is noisy.",
        "wrong": [
          "The harbour is noisy, but the market is quiet.",
          "The harbour has stalls, but the market has boats."
        ],
        "evidencePrompt": "Tap the sentence that describes the sounds at the harbour.",
        "evidence": "Only one gull cried over the harbour, and the water slapped softly against the wall."
      },
      {
        "prompt": "What does Amara do in both places?",
        "answer": "She eats chips.",
        "wrong": [
          "She mends nets.",
          "She listens to music."
        ],
        "evidencePrompt": "Tap the sentence that shows something Amara did in both places.",
        "evidence": "Yet in both places, Amara bought chips and ate them hot."
      },
      {
        "prompt": "Which detail belongs to the market?",
        "answer": "The smell of fried onions",
        "wrong": [
          "The smell of salt and seaweed",
          "A fisherman mending his nets"
        ],
        "evidencePrompt": "Tap the sentence that describes a cooking smell.",
        "evidence": "The smell of fried onions drifted between the crowded stalls."
      },
      {
        "prompt": "How does Amara feel in the two places?",
        "answer": "Overwhelmed in the market and calm in the village",
        "wrong": [
          "Calm in the market and overwhelmed in the village",
          "Bored in both places"
        ],
        "evidencePrompt": "Tap the sentence that shows Amara struggling to think in the market.",
        "evidence": "Shoppers jostled past her elbows, and she could hardly hear her own thoughts."
      }
    ]
  },
  {
    "title": "The Maths Challenge",
    "short": "Ellie packed her bag the night before, with a list and a tick beside every item. Priya shoved things in at the last minute and sat on the bag to close it.",
    "intro": [
      {
        "prompt": "Which girl plans ahead?",
        "answer": "Ellie",
        "wrong": [
          "Priya",
          "Both of them"
        ]
      },
      {
        "prompt": "How do the girls pack differently?",
        "answer": "Ellie uses a list, but Priya packs in a rush.",
        "wrong": [
          "Priya uses a list, but Ellie packs in a rush.",
          "Ellie packs last minute, and Priya packs the night before."
        ]
      },
      {
        "prompt": "What is the same about the girls?",
        "answer": "Both of them pack a bag.",
        "wrong": [
          "Both of them make a list.",
          "Both of them sit on the bag."
        ]
      }
    ],
    "evidence": [
      "Mr Bell’s maths challenge began with a loud click of the timer.",
      "Leo’s pencil flew across the page, scribbling answers before the first question was properly read.",
      "Leo wrote so fast that his sevens looked like ones.",
      "Amara, meanwhile, read each problem twice and checked her working in the margin.",
      "She wrote every digit carefully, as clear as print.",
      "Both gripped their pencils tightly, and neither dared glance at the clock.",
      "Halfway through, Leo finished a whole page and grinned at his neat-looking rows.",
      "Amara had only completed half, though every answer was ringed in green.",
      "When Mr Bell marked the papers, Leo found three careless mistakes.",
      "Amara found none, but she had run out of time for the last question.",
      "Afterwards they swapped papers, wondering what they could learn from each other."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Mr Bell’s maths challenge began with a loud click of the timer."
      },
      {
        "type": "p",
        "text": "Leo’s pencil flew across the page, scribbling answers before the first question was properly read. Leo wrote so fast that his sevens looked like ones. Amara, meanwhile, read each problem twice and checked her working in the margin. She wrote every digit carefully, as clear as print. Both gripped their pencils tightly, and neither dared glance at the clock."
      },
      {
        "type": "p",
        "text": "Halfway through, Leo finished a whole page and grinned at his neat-looking rows. Amara had only completed half, though every answer was ringed in green. When Mr Bell marked the papers, Leo found three careless mistakes. Amara found none, but she had run out of time for the last question. Afterwards they swapped papers, wondering what they could learn from each other."
      }
    ],
    "groups": [
      {
        "label": "Leo",
        "cards": [
          "Leo’s pencil flew across the page, scribbling answers before the first question was properly read.",
          "Leo wrote so fast that his sevens looked like ones.",
          "Halfway through, Leo finished a whole page and grinned at his neat-looking rows.",
          "When Mr Bell marked the papers, Leo found three careless mistakes."
        ]
      },
      {
        "label": "Amara",
        "cards": [
          "Amara, meanwhile, read each problem twice and checked her working in the margin.",
          "She wrote every digit carefully, as clear as print.",
          "Amara had only completed half, though every answer was ringed in green.",
          "Amara found none, but she had run out of time for the last question."
        ]
      }
    ],
    "sortPrompt": "Sort the sentences. Does each one describe Leo or Amara?",
    "questions": [
      {
        "prompt": "What is the main difference between how Leo and Amara work?",
        "answer": "Leo works fast but carelessly, and Amara works carefully but slowly.",
        "wrong": [
          "Leo works carefully but slowly, and Amara works fast but carelessly.",
          "Leo works with a friend, and Amara works alone."
        ],
        "evidencePrompt": "Tap the sentence that shows Amara checking her work as she goes.",
        "evidence": "Amara, meanwhile, read each problem twice and checked her working in the margin."
      },
      {
        "prompt": "How are Leo and Amara alike?",
        "answer": "Both feel nervous and grip their pencils tightly.",
        "wrong": [
          "Both finish every question.",
          "Both make careless mistakes."
        ],
        "evidencePrompt": "Tap the sentence that shows how the two children are alike.",
        "evidence": "Both gripped their pencils tightly, and neither dared glance at the clock."
      },
      {
        "prompt": "Why did finishing a whole page not mean Leo did better?",
        "answer": "He made three careless mistakes.",
        "wrong": [
          "He skipped the last question.",
          "Mr Bell did not mark his paper."
        ],
        "evidencePrompt": "Tap the sentence that shows how Leo’s speed affected his marks.",
        "evidence": "When Mr Bell marked the papers, Leo found three careless mistakes."
      },
      {
        "prompt": "What did each child lose by working the way they did?",
        "answer": "Leo lost marks to mistakes, and Amara ran out of time.",
        "wrong": [
          "Leo ran out of time, and Amara lost marks to mistakes.",
          "Neither of them lost anything."
        ],
        "evidencePrompt": "Tap the sentence that shows what Amara’s careful approach cost her.",
        "evidence": "Amara found none, but she had run out of time for the last question."
      }
    ]
  }
];
export function buildComparingCharactersAndSettingsQuestions(level, rng) {
  return readingQuestions(BANK, RULE, level, rng);
}
