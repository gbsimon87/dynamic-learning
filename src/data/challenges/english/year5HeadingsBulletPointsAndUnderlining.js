import { readingQuestions } from "./year5Practice.js";
/** Headings, Bullet Points and Underlining: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "Headings show what each part is about, bullet points make a short list easy to scan, and underlining or bold makes key words stand out.";
export const BANK = [
  {
    "title": "Swimming Club Notice",
    "short": "Library Rules. • Whisper • Walk, never run • Put books back. The word QUIET is underlined at the top.",
    "intro": [
      {
        "prompt": "Which device makes the rules easy to scan?",
        "answer": "Bullet points",
        "wrong": [
          "One long paragraph",
          "A speech bubble"
        ]
      },
      {
        "prompt": "What does underlining the word QUIET do?",
        "answer": "It makes the key word stand out.",
        "wrong": [
          "It makes the word quieter.",
          "It changes what the word means."
        ]
      },
      {
        "prompt": "Which heading would suit a list of three rules?",
        "answer": "Library Rules",
        "wrong": [
          "Opening Hours",
          "Book Prices"
        ]
      }
    ],
    "evidence": [
      "When and where",
      "Swimming club meets every Tuesday at half past four.",
      "We use the Riverside pool, next to the library.",
      "What to bring",
      "• A swimming costume or trunks",
      "• A towel",
      "• A water bottle",
      "• A swimming cap if you have long hair",
      "Rules",
      "Always walk beside the pool, and never run.",
      "Please tell the teacher before you leave."
    ],
    "blocks": [
      {
        "type": "h",
        "text": "When and where"
      },
      {
        "type": "p",
        "text": "Swimming club meets every Tuesday at half past four. We use the Riverside pool, next to the library."
      },
      {
        "type": "h",
        "text": "What to bring"
      },
      {
        "type": "p",
        "text": "• A swimming costume or trunks"
      },
      {
        "type": "p",
        "text": "• A towel"
      },
      {
        "type": "p",
        "text": "• A water bottle"
      },
      {
        "type": "p",
        "text": "• A swimming cap if you have long hair"
      },
      {
        "type": "h",
        "text": "Rules"
      },
      {
        "type": "p",
        "text": "Always walk beside the pool, and never run. Please tell the teacher before you leave."
      }
    ],
    "groups": [
      {
        "label": "Bullet-point items",
        "cards": [
          "• A swimming costume or trunks",
          "• A towel",
          "• A water bottle",
          "• A swimming cap if you have long hair"
        ]
      },
      {
        "label": "Sentences in a paragraph",
        "cards": [
          "Swimming club meets every Tuesday at half past four.",
          "We use the Riverside pool, next to the library.",
          "Always walk beside the pool, and never run.",
          "Please tell the teacher before you leave."
        ]
      }
    ],
    "sortPrompt": "Sort the lines from the notice. Is each one a bullet-point item, or a sentence from a paragraph?",
    "questions": [
      {
        "prompt": "Why is “What to bring” written as a bullet list?",
        "answer": "The items are short and easy to scan.",
        "wrong": [
          "The items are long sentences.",
          "The items must be done in order."
        ],
        "evidencePrompt": "Tap the first bullet point in the list.",
        "evidence": "• A swimming costume or trunks"
      },
      {
        "prompt": "Which heading would help a reader find the day and time?",
        "answer": "When and where",
        "wrong": [
          "What to bring",
          "Rules"
        ],
        "evidencePrompt": "Tap the heading a reader would use to find the time.",
        "evidence": "When and where"
      },
      {
        "prompt": "What is the job of the heading “Rules”?",
        "answer": "It tells the reader what the section below is about.",
        "wrong": [
          "It tells the reader the day of the club.",
          "It lists the things to bring."
        ],
        "evidencePrompt": "Tap the heading that introduces the safety instructions.",
        "evidence": "Rules"
      },
      {
        "prompt": "Why might the words “half past four” be underlined?",
        "answer": "Readers can spot the time quickly.",
        "wrong": [
          "It shows the words are spelt wrongly.",
          "It tells readers to say them loudly."
        ],
        "evidencePrompt": "Tap the sentence that holds the time of the club.",
        "evidence": "Swimming club meets every Tuesday at half past four."
      }
    ]
  },
  {
    "title": "Fluffy Pancakes",
    "short": "Fruit Salad. You will need: • two apples • one banana • a handful of grapes. Method: cut everything small and mix gently.",
    "intro": [
      {
        "prompt": "Why is a bullet list good for the fruit?",
        "answer": "Each item is short and separate.",
        "wrong": [
          "The fruits must be added in order.",
          "The fruit is described in long sentences."
        ]
      },
      {
        "prompt": "Which word is a heading?",
        "answer": "Method",
        "wrong": [
          "banana",
          "gently"
        ]
      },
      {
        "prompt": "What is the first item in the list?",
        "answer": "Two apples",
        "wrong": [
          "One banana",
          "A handful of grapes"
        ]
      }
    ],
    "evidence": [
      "You will need",
      "• 100 g of flour",
      "• two eggs",
      "• 200 ml of milk",
      "• a pinch of salt",
      "Method",
      "First, whisk the flour, eggs and milk until smooth.",
      "Next, heat a little butter in a frying pan.",
      "Then pour in a spoonful of batter and wait until bubbles appear.",
      "Finally, flip the pancake and cook the other side.",
      "Safety",
      "Ask an adult to help with the hot pan."
    ],
    "blocks": [
      {
        "type": "h",
        "text": "You will need"
      },
      {
        "type": "p",
        "text": "• 100 g of flour"
      },
      {
        "type": "p",
        "text": "• two eggs"
      },
      {
        "type": "p",
        "text": "• 200 ml of milk"
      },
      {
        "type": "p",
        "text": "• a pinch of salt"
      },
      {
        "type": "h",
        "text": "Method"
      },
      {
        "type": "item",
        "text": "First, whisk the flour, eggs and milk until smooth."
      },
      {
        "type": "item",
        "text": "Next, heat a little butter in a frying pan."
      },
      {
        "type": "item",
        "text": "Then pour in a spoonful of batter and wait until bubbles appear."
      },
      {
        "type": "item",
        "text": "Finally, flip the pancake and cook the other side."
      },
      {
        "type": "h",
        "text": "Safety"
      },
      {
        "type": "p",
        "text": "Ask an adult to help with the hot pan."
      }
    ],
    "groups": [
      {
        "label": "Bullet-point items",
        "cards": [
          "• 100 g of flour",
          "• two eggs",
          "• 200 ml of milk",
          "• a pinch of salt"
        ]
      },
      {
        "label": "Steps written as sentences",
        "cards": [
          "First, whisk the flour, eggs and milk until smooth.",
          "Next, heat a little butter in a frying pan.",
          "Then pour in a spoonful of batter and wait until bubbles appear.",
          "Finally, flip the pancake and cook the other side."
        ]
      }
    ],
    "sortPrompt": "Sort the lines from the recipe. Is each one a bullet-point item, or a step written as a sentence?",
    "questions": [
      {
        "prompt": "Why are the ingredients written as bullet points rather than as a paragraph?",
        "answer": "They are a list of separate, short items.",
        "wrong": [
          "They must be done in order.",
          "They are all full sentences."
        ],
        "evidencePrompt": "Tap the bullet point that gives the amount of milk.",
        "evidence": "• 200 ml of milk"
      },
      {
        "prompt": "Which heading would you look under to find out what to do first?",
        "answer": "Method",
        "wrong": [
          "You will need",
          "Safety"
        ],
        "evidencePrompt": "Tap the first step of the method.",
        "evidence": "First, whisk the flour, eggs and milk until smooth."
      },
      {
        "prompt": "Why do the steps begin with First, Next, Then and Finally?",
        "answer": "To show the order of the steps",
        "wrong": [
          "To show how many eggs to use",
          "To make them into bullet points"
        ],
        "evidencePrompt": "Tap the step that comes straight after heating the pan.",
        "evidence": "Then pour in a spoonful of batter and wait until bubbles appear."
      },
      {
        "prompt": "Why is “Safety” a good heading?",
        "answer": "It tells the reader the part below is about staying safe.",
        "wrong": [
          "It tells the reader the amounts.",
          "It lists the ingredients."
        ],
        "evidencePrompt": "Tap the sentence that gives the safety advice.",
        "evidence": "Ask an adult to help with the hot pan."
      }
    ]
  },
  {
    "title": "Rocket Day",
    "short": "Park Clean-up Day. Bring gloves, a bin bag and a big smile. Leo has underlined the date, Saturday 8 June, so nobody misses it.",
    "intro": [
      {
        "prompt": "Which heading would suit the sentence “Bring gloves, a bin bag and a big smile”?",
        "answer": "What to bring",
        "wrong": [
          "Where to go",
          "Who is coming"
        ]
      },
      {
        "prompt": "Why has Leo underlined the date?",
        "answer": "So the key date stands out and nobody misses it",
        "wrong": [
          "Because the date is spelt wrongly",
          "To make the date longer"
        ]
      },
      {
        "prompt": "What would make the list of things to bring easier to scan?",
        "answer": "Bullet points",
        "wrong": [
          "A longer paragraph",
          "A smaller picture"
        ]
      }
    ],
    "evidence": [
      "Getting there",
      "Rocket Day is on Saturday 21 September at the Science Centre.",
      "Trains from the town station run every twenty minutes.",
      "Activities",
      "• Build a bottle rocket",
      "• Launch it on the field",
      "• Meet a real astronaut",
      "• Design a mission badge",
      "Tickets",
      "Tickets cost five pounds each.",
      "Children under four go free.",
      "Book early, because places fill up quickly."
    ],
    "blocks": [
      {
        "type": "h",
        "text": "Getting there"
      },
      {
        "type": "p",
        "text": "Rocket Day is on Saturday 21 September at the Science Centre. Trains from the town station run every twenty minutes."
      },
      {
        "type": "h",
        "text": "Activities"
      },
      {
        "type": "p",
        "text": "• Build a bottle rocket"
      },
      {
        "type": "p",
        "text": "• Launch it on the field"
      },
      {
        "type": "p",
        "text": "• Meet a real astronaut"
      },
      {
        "type": "p",
        "text": "• Design a mission badge"
      },
      {
        "type": "h",
        "text": "Tickets"
      },
      {
        "type": "p",
        "text": "Tickets cost five pounds each. Children under four go free. Book early, because places fill up quickly."
      }
    ],
    "groups": [
      {
        "label": "Bullet-point items",
        "cards": [
          "• Build a bottle rocket",
          "• Launch it on the field",
          "• Meet a real astronaut",
          "• Design a mission badge"
        ]
      },
      {
        "label": "Sentences in a paragraph",
        "cards": [
          "Rocket Day is on Saturday 21 September at the Science Centre.",
          "Trains from the town station run every twenty minutes.",
          "Tickets cost five pounds each.",
          "Children under four go free."
        ]
      }
    ],
    "sortPrompt": "Sort the lines from the leaflet. Is each one a bullet-point item, or a sentence from a paragraph?",
    "questions": [
      {
        "prompt": "What do all the bullet points in the Activities list have in common?",
        "answer": "Each begins with a verb that tells you what to do.",
        "wrong": [
          "Each gives a price.",
          "Each is a full paragraph."
        ],
        "evidencePrompt": "Tap the bullet point about making a badge.",
        "evidence": "• Design a mission badge"
      },
      {
        "prompt": "Which heading would a reader use to find the price?",
        "answer": "Tickets",
        "wrong": [
          "Getting there",
          "Activities"
        ],
        "evidencePrompt": "Tap the heading that would lead you to the price.",
        "evidence": "Tickets"
      },
      {
        "prompt": "Why might “Saturday 21 September” be underlined?",
        "answer": "So readers spot the key date quickly",
        "wrong": [
          "Because it is a mistake",
          "Because the event is cancelled"
        ],
        "evidencePrompt": "Tap the sentence that gives the date.",
        "evidence": "Rocket Day is on Saturday 21 September at the Science Centre."
      },
      {
        "prompt": "Why does the writer use separate headings such as “Getting there” and “Tickets”?",
        "answer": "So readers can jump to the part they need",
        "wrong": [
          "So all the text fits on one line",
          "To make the leaflet shorter"
        ],
        "evidencePrompt": "Tap the sentence about trains.",
        "evidence": "Trains from the town station run every twenty minutes."
      }
    ]
  }
];
export function buildHeadingsBulletPointsAndUnderliningQuestions(level, rng) {
  return readingQuestions(BANK, RULE, level, rng);
}
