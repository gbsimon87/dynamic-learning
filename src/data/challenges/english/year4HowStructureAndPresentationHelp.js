import { readingQuestions } from "./year4Reading.js";
export const RULE = "Headings, lists and paragraphs organise information so readers can find and use it.";
export const BANK = [
  {
    "title": "Finding Your Way through a Book",
    "short": "A contents page lists the main sections of a book. Each section has a page number beside it. Priya wants to find the chapter about rivers. She checks the contents page before turning any pages.",
    "intro": [
      {
        "prompt": "Why are page numbers useful?",
        "answer": "They show where a section starts.",
        "wrong": [
          "They show the price of the book.",
          "They count the readers."
        ]
      },
      {
        "prompt": "Which feature lists the main sections?",
        "answer": "Contents page",
        "wrong": [
          "A story’s dialogue",
          "A poem’s rhyme"
        ]
      },
      {
        "prompt": "Why does Priya check it first?",
        "answer": "To locate the chapter she wants",
        "wrong": [
          "To learn the book’s price",
          "To count the letters"
        ]
      }
    ],
    "evidence": [
      "A contents page lists the main sections of a book.",
      "Each section has a page number beside it.",
      "Priya wants to find the chapter about rivers.",
      "She checks the contents page before turning any pages.",
      "An index lists specific subjects in alphabetical order.",
      "One subject can have several page numbers if it appears in different places.",
      "Zayn wants every page that mentions otters.",
      "He looks under O in the index and checks each number."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "A contents page lists the main sections of a book. Each section has a page number beside it. Priya wants to find the chapter about rivers. She checks the contents page before turning any pages."
      },
      {
        "type": "p",
        "text": "An index lists specific subjects in alphabetical order. One subject can have several page numbers if it appears in different places. Zayn wants every page that mentions otters. He looks under O in the index and checks each number."
      }
    ],
    "groups": [
      {
        "label": "Contents page",
        "cards": [
          "A contents page lists the main sections of a book.",
          "Each section has a page number beside it.",
          "Priya wants to find the chapter about rivers.",
          "She checks the contents page before turning any pages."
        ]
      },
      {
        "label": "Index",
        "cards": [
          "An index lists specific subjects in alphabetical order.",
          "One subject can have several page numbers if it appears in different places.",
          "Zayn wants every page that mentions otters.",
          "He looks under O in the index and checks each number."
        ]
      }
    ],
    "sortPrompt": "Sort the details under the paragraph theme they support.",
    "questions": [
      {
        "prompt": "Which feature should Zayn use for a specific subject appearing in several places?",
        "answer": "The index",
        "wrong": [
          "The front cover only",
          "A blank page"
        ],
        "evidence": "One subject can have several page numbers if it appears in different places.",
        "evidencePrompt": "Tap the sentence explaining why one index subject can have several numbers."
      },
      {
        "prompt": "What helps someone find a subject quickly in an index?",
        "answer": "Alphabetical order",
        "wrong": [
          "Rhyming words",
          "Long unbroken paragraphs"
        ],
        "evidence": "An index lists specific subjects in alphabetical order.",
        "evidencePrompt": "Tap the sentence explaining how index subjects are arranged."
      },
      {
        "prompt": "Why does the contents page suit Priya’s task?",
        "answer": "She wants a whole chapter about rivers.",
        "wrong": [
          "She wants to count otters.",
          "She needs a character’s speech."
        ],
        "evidence": "Priya wants to find the chapter about rivers.",
        "evidencePrompt": "Tap the sentence naming Priya’s topic."
      },
      {
        "prompt": "How do the two features serve different purposes?",
        "answer": "Contents lists main sections; index lists specific subjects.",
        "wrong": [
          "Both tell a made-up story.",
          "Neither helps locate information."
        ],
        "evidence": "A contents page lists the main sections of a book.",
        "evidencePrompt": "Tap the sentence explaining what a contents page lists."
      }
    ]
  },
  {
    "title": "How to Make a Paper Fan",
    "short": "Amara wrote instructions for making a paper fan. She put the materials under a heading called You will need. She listed a sheet of paper and coloured pencils. Below the list, she numbered the steps.",
    "intro": [
      {
        "prompt": "What does the materials heading help readers find?",
        "answer": "The things they need",
        "wrong": [
          "The author’s age",
          "The final price"
        ]
      },
      {
        "prompt": "Why number the steps?",
        "answer": "To show the order to follow",
        "wrong": [
          "To count the pencils",
          "To make the lines rhyme"
        ]
      },
      {
        "prompt": "Which kind of text is Amara writing?",
        "answer": "Instructions",
        "wrong": [
          "A diary",
          "A fairy tale"
        ]
      }
    ],
    "evidence": [
      "Amara wrote instructions for making a paper fan.",
      "She put the materials under a heading called You will need.",
      "She listed a sheet of paper and coloured pencils.",
      "Below the list, she numbered the steps.",
      "First, decorate the paper before it is folded.",
      "Next, fold a narrow strip forwards, then fold the next strip backwards.",
      "Keep folding until the whole sheet forms a zigzag.",
      "Finally, pinch one end and spread the other end into a fan."
    ],
    "blocks": [
      {
        "type": "h",
        "text": "You will need"
      },
      {
        "type": "p",
        "text": "A sheet of paper and coloured pencils."
      },
      {
        "type": "h",
        "text": "Make the fan"
      },
      {
        "type": "item",
        "text": "First, decorate the paper before it is folded."
      },
      {
        "type": "item",
        "text": "Next, fold a narrow strip forwards, then fold the next strip backwards."
      },
      {
        "type": "item",
        "text": "Keep folding until the whole sheet forms a zigzag."
      },
      {
        "type": "item",
        "text": "Finally, pinch one end and spread the other end into a fan."
      }
    ],
    "groups": [
      {
        "label": "Planning the page",
        "cards": [
          "Amara wrote instructions for making a paper fan.",
          "She put the materials under a heading called You will need.",
          "She listed a sheet of paper and coloured pencils.",
          "Below the list, she numbered the steps."
        ]
      },
      {
        "label": "The making steps",
        "cards": [
          "First, decorate the paper before it is folded.",
          "Next, fold a narrow strip forwards, then fold the next strip backwards.",
          "Keep folding until the whole sheet forms a zigzag.",
          "Finally, pinch one end and spread the other end into a fan."
        ]
      }
    ],
    "sortPrompt": "Sort the details under the paragraph theme they support.",
    "questions": [
      {
        "prompt": "Why are the steps presented as a numbered list?",
        "answer": "Readers need to follow them in order.",
        "wrong": [
          "Readers need to sing them.",
          "Readers must count every letter."
        ],
        "evidence": "Below the list, she numbered the steps.",
        "evidencePrompt": "Tap the sentence describing the numbered layout."
      },
      {
        "prompt": "Which heading helps you prepare before starting?",
        "answer": "You will need",
        "wrong": [
          "The end",
          "About the author"
        ],
        "evidence": "She put the materials under a heading called You will need.",
        "evidencePrompt": "Tap the sentence naming the materials heading."
      },
      {
        "prompt": "Why is Finally useful in the last step?",
        "answer": "It signals the last action.",
        "wrong": [
          "It describes the colour.",
          "It names a character."
        ],
        "evidence": "Finally, pinch one end and spread the other end into a fan.",
        "evidencePrompt": "Tap the sentence that signals the last action."
      },
      {
        "prompt": "How does the heading Make the fan help?",
        "answer": "It separates the steps from the materials list.",
        "wrong": [
          "It tells us the paper’s weight.",
          "It replaces every instruction."
        ],
        "evidence": "Amara wrote instructions for making a paper fan.",
        "evidencePrompt": "Tap the sentence explaining what Amara’s text teaches."
      }
    ]
  },
  {
    "title": "Ellie’s Invitation",
    "short": "Ellie wrote a letter to Gran about the school play. She began with Dear Gran. She put news about rehearsals in the first paragraph. She ended with Love from Ellie.",
    "intro": [
      {
        "prompt": "What does Dear Gran tell the reader?",
        "answer": "Who the letter is addressed to",
        "wrong": [
          "When the play starts",
          "How many actors there are"
        ]
      },
      {
        "prompt": "What does Love from Ellie show?",
        "answer": "Who wrote the letter",
        "wrong": [
          "Which seat to use",
          "The ticket price"
        ]
      },
      {
        "prompt": "Why group rehearsal news in one paragraph?",
        "answer": "To keep related information together",
        "wrong": [
          "To hide the news",
          "To make words rhyme"
        ]
      }
    ],
    "evidence": [
      "Dear Gran,",
      "Our class is rehearsing a play about a lost dragon. I play the explorer who finds its cave. We practise after lunch, and I am learning all my lines.",
      "The play is on Friday at four o’clock in our school hall. Please reply if you can come, so I can save you a seat. I would love you to see it.",
      "Love from Ellie"
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Dear Gran,"
      },
      {
        "type": "p",
        "text": "Our class is rehearsing a play about a lost dragon. I play the explorer who finds its cave. We practise after lunch, and I am learning all my lines."
      },
      {
        "type": "p",
        "text": "The play is on Friday at four o’clock in our school hall. Please reply if you can come, so I can save you a seat. I would love you to see it."
      },
      {
        "type": "p",
        "text": "Love from Ellie"
      }
    ],
    "groups": [
      {
        "label": "Letter opening and ending",
        "cards": [
          "Ellie wrote a letter to Gran about the school play.",
          "She began with Dear Gran.",
          "She put news about rehearsals in the first paragraph.",
          "She ended with Love from Ellie."
        ]
      },
      {
        "label": "Information in the invitation",
        "cards": [
          "In her next paragraph, Ellie explained when the play would take place.",
          "She included the day, time and name of the school hall.",
          "She asked Gran to reply so she could save a seat.",
          "Each paragraph kept related information together, making the invitation easy to follow."
        ]
      }
    ],
    "sortPrompt": "Sort the details under the paragraph theme they support.",
    "questions": [
      {
        "prompt": "Why does the writer use separate paragraphs?",
        "answer": "To group rehearsal news and invitation details separately",
        "wrong": [
          "To put each word on a new page",
          "To create a rhyme pattern"
        ],
        "evidence": "Our class is rehearsing a play about a lost dragon. I play the explorer who finds its cave. We practise after lunch, and I am learning all my lines.",
        "evidencePrompt": "Tap the paragraph about rehearsals."
      },
      {
        "prompt": "What does the greeting do?",
        "answer": "Identifies who is receiving the letter",
        "wrong": [
          "Lists the actors",
          "Tells the ending of the play"
        ],
        "evidence": "Dear Gran,",
        "evidencePrompt": "Tap the letter’s greeting."
      },
      {
        "prompt": "What is the purpose of the paragraph beginning The play is on Friday?",
        "answer": "To give details Gran needs to attend",
        "wrong": [
          "To describe the dragon’s costume",
          "To list rehearsal mistakes"
        ],
        "evidence": "The play is on Friday at four o’clock in our school hall. Please reply if you can come, so I can save you a seat. I would love you to see it.",
        "evidencePrompt": "Tap the paragraph giving the day, time and place."
      },
      {
        "prompt": "How does the sign-off help?",
        "answer": "It identifies the writer and closes the letter.",
        "wrong": [
          "It gives stage directions.",
          "It lists things to bring."
        ],
        "evidence": "Love from Ellie",
        "evidencePrompt": "Tap the letter’s sign-off."
      }
    ]
  }
];
export function buildHowStructureAndPresentationHelpQuestions(level, rng) {
  return readingQuestions(BANK, RULE, level, rng);
}
