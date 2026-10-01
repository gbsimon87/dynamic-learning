import { readingQuestions } from "./year4Reading.js";
/** Original texts for Paragraphs around a Theme; source URLs on the traditional retellings. */
export const RULE = "A paragraph groups related ideas. Begin a new paragraph when the focus changes.";
export const BANK = [
  {
    "title": "Our Library Visit",
    "short": "Priya checked the opening time before leaving school. Leo packed the books that needed returning. Amara brought a list of titles she hoped to find. The class walked to the library with their teacher.",
    "intro": [
      {
        "prompt": "Which heading groups these details?",
        "answer": "Preparing for the visit",
        "wrong": [
          "What happened inside the library",
          "A shopping trip"
        ]
      },
      {
        "prompt": "Why keep these sentences together?",
        "answer": "They share one theme.",
        "wrong": [
          "They all rhyme.",
          "They name the same colour."
        ]
      },
      {
        "prompt": "Which sentence belongs under this heading?",
        "answer": "Leo packed the books that needed returning.",
        "wrong": [
          "Ellie chose a story from the adventure section.",
          "The librarian showed the children how to borrow their books."
        ]
      }
    ],
    "evidence": [
      "Priya checked the opening time before leaving school.",
      "Leo packed the books that needed returning.",
      "Amara brought a list of titles she hoped to find.",
      "The class walked to the library with their teacher.",
      "Inside, Zayn found the information shelves near the desk.",
      "Ellie chose a story from the adventure section.",
      "The librarian showed the children how to borrow their books.",
      "Each child left with a book to read at home."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Priya checked the opening time before leaving school. Leo packed the books that needed returning. Amara brought a list of titles she hoped to find. The class walked to the library with their teacher."
      },
      {
        "type": "p",
        "text": "Inside, Zayn found the information shelves near the desk. Ellie chose a story from the adventure section. The librarian showed the children how to borrow their books. Each child left with a book to read at home."
      }
    ],
    "groups": [
      {
        "label": "Preparing for the visit",
        "cards": [
          "Priya checked the opening time before leaving school.",
          "Leo packed the books that needed returning.",
          "Amara brought a list of titles she hoped to find.",
          "The class walked to the library with their teacher."
        ]
      },
      {
        "label": "What happened inside the library",
        "cards": [
          "Inside, Zayn found the information shelves near the desk.",
          "Ellie chose a story from the adventure section.",
          "The librarian showed the children how to borrow their books.",
          "Each child left with a book to read at home."
        ]
      }
    ],
    "sortPrompt": "Sort the details under the paragraph theme they support.",
    "questions": [
      {
        "prompt": "Which heading fits the second paragraph?",
        "answer": "What happened inside the library",
        "wrong": [
          "Preparing for the visit",
          "A journey to space"
        ],
        "evidence": "Ellie chose a story from the adventure section.",
        "evidencePrompt": "Tap the sentence mentioning Ellie choosing an adventure story."
      },
      {
        "prompt": "Where should the new paragraph begin?",
        "answer": "Inside, Zayn found the information shelves near the desk.",
        "wrong": [
          "Leo packed the books that needed returning.",
          "Amara brought a list of titles she hoped to find."
        ],
        "evidence": "Inside, Zayn found the information shelves near the desk.",
        "evidencePrompt": "Tap the sentence where the text changes to its second theme."
      },
      {
        "prompt": "Why split this text into two paragraphs?",
        "answer": "The focus changes between two related themes.",
        "wrong": [
          "Every sentence must be a paragraph.",
          "Only long words need paragraphs."
        ],
        "evidence": "Priya checked the opening time before leaving school.",
        "evidencePrompt": "Tap the sentence that starts the first theme."
      },
      {
        "prompt": "Which sentence belongs with the first theme?",
        "answer": "Amara brought a list of titles she hoped to find.",
        "wrong": [
          "The librarian showed the children how to borrow their books.",
          "Each child left with a book to read at home."
        ],
        "evidence": "Amara brought a list of titles she hoped to find.",
        "evidencePrompt": "Tap the sentence mentioning Amara’s list of titles."
      }
    ]
  },
  {
    "title": "Making a Wildlife Pond",
    "short": "Zayn marked a shallow patch in the school garden. Amara helped remove stones from the edge. An adult fitted a waterproof liner into the hollow. The group filled the pond and placed safe stepping stones around it.",
    "intro": [
      {
        "prompt": "Which heading groups these details?",
        "answer": "Building the pond",
        "wrong": [
          "Wildlife and observation",
          "A shopping trip"
        ]
      },
      {
        "prompt": "Why keep these sentences together?",
        "answer": "They share one theme.",
        "wrong": [
          "They all rhyme.",
          "They name the same colour."
        ]
      },
      {
        "prompt": "Which sentence belongs under this heading?",
        "answer": "Amara helped remove stones from the edge.",
        "wrong": [
          "Priya spotted a frog beside the reeds.",
          "Ellie recorded the animals in a notebook each week."
        ]
      }
    ],
    "evidence": [
      "Zayn marked a shallow patch in the school garden.",
      "Amara helped remove stones from the edge.",
      "An adult fitted a waterproof liner into the hollow.",
      "The group filled the pond and placed safe stepping stones around it.",
      "Soon, tiny water insects moved across the surface.",
      "Priya spotted a frog beside the reeds.",
      "Ellie recorded the animals in a notebook each week.",
      "The children kept the area quiet so wildlife could settle."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Zayn marked a shallow patch in the school garden. Amara helped remove stones from the edge. An adult fitted a waterproof liner into the hollow. The group filled the pond and placed safe stepping stones around it."
      },
      {
        "type": "p",
        "text": "Soon, tiny water insects moved across the surface. Priya spotted a frog beside the reeds. Ellie recorded the animals in a notebook each week. The children kept the area quiet so wildlife could settle."
      }
    ],
    "groups": [
      {
        "label": "Building the pond",
        "cards": [
          "Zayn marked a shallow patch in the school garden.",
          "Amara helped remove stones from the edge.",
          "An adult fitted a waterproof liner into the hollow.",
          "The group filled the pond and placed safe stepping stones around it."
        ]
      },
      {
        "label": "Wildlife and observation",
        "cards": [
          "Soon, tiny water insects moved across the surface.",
          "Priya spotted a frog beside the reeds.",
          "Ellie recorded the animals in a notebook each week.",
          "The children kept the area quiet so wildlife could settle."
        ]
      }
    ],
    "sortPrompt": "Sort the details under the paragraph theme they support.",
    "questions": [
      {
        "prompt": "Which heading fits the second paragraph?",
        "answer": "Wildlife and observation",
        "wrong": [
          "Building the pond",
          "A journey to space"
        ],
        "evidence": "Priya spotted a frog beside the reeds.",
        "evidencePrompt": "Tap the sentence mentioning Priya spotting a frog."
      },
      {
        "prompt": "Where should the new paragraph begin?",
        "answer": "Soon, tiny water insects moved across the surface.",
        "wrong": [
          "Amara helped remove stones from the edge.",
          "An adult fitted a waterproof liner into the hollow."
        ],
        "evidence": "Soon, tiny water insects moved across the surface.",
        "evidencePrompt": "Tap the sentence where the text changes to its second theme."
      },
      {
        "prompt": "Why split this text into two paragraphs?",
        "answer": "The focus changes between two related themes.",
        "wrong": [
          "Every sentence must be a paragraph.",
          "Only long words need paragraphs."
        ],
        "evidence": "Zayn marked a shallow patch in the school garden.",
        "evidencePrompt": "Tap the sentence that starts the first theme."
      },
      {
        "prompt": "Which sentence belongs with the first theme?",
        "answer": "An adult fitted a waterproof liner into the hollow.",
        "wrong": [
          "Ellie recorded the animals in a notebook each week.",
          "The children kept the area quiet so wildlife could settle."
        ],
        "evidence": "An adult fitted a waterproof liner into the hollow.",
        "evidencePrompt": "Tap the sentence mentioning an adult fitting the liner."
      }
    ]
  },
  {
    "title": "The Class Play",
    "short": "Leo practised his lines with a partner. Priya made a cardboard crown for the king. Zayn painted scenery for the back of the stage. Amara checked that every costume had a name label.",
    "intro": [
      {
        "prompt": "Which heading groups these details?",
        "answer": "Preparing the play",
        "wrong": [
          "The performance",
          "A shopping trip"
        ]
      },
      {
        "prompt": "Why keep these sentences together?",
        "answer": "They share one theme.",
        "wrong": [
          "They all rhyme.",
          "They name the same colour."
        ]
      },
      {
        "prompt": "Which sentence belongs under this heading?",
        "answer": "Priya made a cardboard crown for the king.",
        "wrong": [
          "Ellie opened the play with a clear greeting.",
          "The audience clapped at the end of the final scene."
        ]
      }
    ],
    "evidence": [
      "Leo practised his lines with a partner.",
      "Priya made a cardboard crown for the king.",
      "Zayn painted scenery for the back of the stage.",
      "Amara checked that every costume had a name label.",
      "On Friday, families took their seats in the hall.",
      "Ellie opened the play with a clear greeting.",
      "The audience clapped at the end of the final scene.",
      "The children bowed together and thanked their helpers."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Leo practised his lines with a partner. Priya made a cardboard crown for the king. Zayn painted scenery for the back of the stage. Amara checked that every costume had a name label."
      },
      {
        "type": "p",
        "text": "On Friday, families took their seats in the hall. Ellie opened the play with a clear greeting. The audience clapped at the end of the final scene. The children bowed together and thanked their helpers."
      }
    ],
    "groups": [
      {
        "label": "Preparing the play",
        "cards": [
          "Leo practised his lines with a partner.",
          "Priya made a cardboard crown for the king.",
          "Zayn painted scenery for the back of the stage.",
          "Amara checked that every costume had a name label."
        ]
      },
      {
        "label": "The performance",
        "cards": [
          "On Friday, families took their seats in the hall.",
          "Ellie opened the play with a clear greeting.",
          "The audience clapped at the end of the final scene.",
          "The children bowed together and thanked their helpers."
        ]
      }
    ],
    "sortPrompt": "Sort the details under the paragraph theme they support.",
    "questions": [
      {
        "prompt": "Which heading fits the second paragraph?",
        "answer": "The performance",
        "wrong": [
          "Preparing the play",
          "A journey to space"
        ],
        "evidence": "Ellie opened the play with a clear greeting.",
        "evidencePrompt": "Tap the sentence mentioning Ellie’s opening greeting."
      },
      {
        "prompt": "Where should the new paragraph begin?",
        "answer": "On Friday, families took their seats in the hall.",
        "wrong": [
          "Priya made a cardboard crown for the king.",
          "Zayn painted scenery for the back of the stage."
        ],
        "evidence": "On Friday, families took their seats in the hall.",
        "evidencePrompt": "Tap the sentence where the text changes to its second theme."
      },
      {
        "prompt": "Why split this text into two paragraphs?",
        "answer": "The focus changes between two related themes.",
        "wrong": [
          "Every sentence must be a paragraph.",
          "Only long words need paragraphs."
        ],
        "evidence": "Leo practised his lines with a partner.",
        "evidencePrompt": "Tap the sentence that starts the first theme."
      },
      {
        "prompt": "Which sentence belongs with the first theme?",
        "answer": "Zayn painted scenery for the back of the stage.",
        "wrong": [
          "The audience clapped at the end of the final scene.",
          "The children bowed together and thanked their helpers."
        ],
        "evidence": "Zayn painted scenery for the back of the stage.",
        "evidencePrompt": "Tap the sentence mentioning Zayn painting scenery."
      }
    ]
  }
];
export function buildParagraphsAroundAThemeQuestions(level, rng) {
  return readingQuestions(BANK, RULE, level, rng);
}
