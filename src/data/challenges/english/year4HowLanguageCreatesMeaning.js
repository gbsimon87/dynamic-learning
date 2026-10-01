import { readingQuestions } from "./year4Reading.js";
/** Original texts for How Language Creates Meaning; source URLs on the traditional retellings. */
export const RULE = "A writer’s word choices help us imagine sounds, pictures and feelings.";
export const BANK = [
  {
    "title": "The Changing Path",
    "short": "The wind whispered through the grass beside Amara’s feet. A stream chuckled over the smooth stones. Sunlight scattered golden dots across the path. Amara slowed down to listen.",
    "intro": [
      {
        "prompt": "What does “whispered” suggest about the wind?",
        "answer": "It makes a soft sound.",
        "wrong": [
          "It is completely silent.",
          "It makes a crash."
        ]
      },
      {
        "prompt": "What does “golden dots” help you picture?",
        "answer": "Patches of sunlight",
        "wrong": [
          "Heavy black clouds",
          "A painted road"
        ]
      },
      {
        "prompt": "What mood do the first lines create?",
        "answer": "Peaceful",
        "wrong": [
          "Frightening",
          "Furious"
        ]
      }
    ],
    "evidence": [
      "The wind whispered through the grass beside Amara’s feet.",
      "A stream chuckled over the smooth stones.",
      "Sunlight scattered golden dots across the path.",
      "Amara slowed down to listen.",
      "Beyond the gate, dark clouds gathered like a crowd at a doorway.",
      "The stream’s gentle voice became a roar.",
      "Rain hammered against the old tin shed.",
      "Amara hurried inside, holding her coat above her head."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "The wind whispered through the grass beside Amara’s feet. A stream chuckled over the smooth stones. Sunlight scattered golden dots across the path. Amara slowed down to listen."
      },
      {
        "type": "p",
        "text": "Beyond the gate, dark clouds gathered like a crowd at a doorway. The stream’s gentle voice became a roar. Rain hammered against the old tin shed. Amara hurried inside, holding her coat above her head."
      }
    ],
    "groups": [
      {
        "label": "Calm language",
        "cards": [
          "The wind whispered through the grass beside Amara’s feet.",
          "A stream chuckled over the smooth stones.",
          "Sunlight scattered golden dots across the path.",
          "Amara slowed down to listen."
        ]
      },
      {
        "label": "Stormy language",
        "cards": [
          "Beyond the gate, dark clouds gathered like a crowd at a doorway.",
          "The stream’s gentle voice became a roar.",
          "Rain hammered against the old tin shed.",
          "Amara hurried inside, holding her coat above her head."
        ]
      }
    ],
    "sortPrompt": "Sort the details under the paragraph theme they support.",
    "questions": [
      {
        "prompt": "How does the language change across the text?",
        "answer": "Soft sounds become loud, forceful sounds as a storm arrives.",
        "wrong": [
          "Loud sounds become silence at night.",
          "The writer describes no sounds."
        ],
        "evidence": "Rain hammered against the old tin shed.",
        "evidencePrompt": "Tap the sentence where rain is described with a forceful action word."
      },
      {
        "prompt": "Why describe the stream as chuckling?",
        "answer": "To make its gentle sound seem cheerful and alive",
        "wrong": [
          "To say a person is hiding in it",
          "To say the water has stopped"
        ],
        "evidence": "A stream chuckled over the smooth stones.",
        "evidencePrompt": "Tap the sentence giving the stream a human action."
      },
      {
        "prompt": "What does the comparison with a crowd suggest?",
        "answer": "Clouds are gathering closely together.",
        "wrong": [
          "Clouds are carrying umbrellas.",
          "The doorway is made of clouds."
        ],
        "evidence": "Beyond the gate, dark clouds gathered like a crowd at a doorway.",
        "evidencePrompt": "Tap the sentence containing the comparison about clouds."
      },
      {
        "prompt": "Which words help explain why Amara hurries?",
        "answer": "The stream roars and rain hammers.",
        "wrong": [
          "The wind whispers softly.",
          "Sunlight makes golden dots."
        ],
        "evidence": "The stream’s gentle voice became a roar.",
        "evidencePrompt": "Tap the sentence showing the stream has become louder."
      }
    ]
  },
  {
    "title": "The Biscuit Tin",
    "short": "Biscuit tiptoed towards the biscuit tin. His claws clicked faintly on the kitchen floor. Ellie watched his nose twitch beside the cupboard. The kitchen was as quiet as a sleeping cat.",
    "intro": [
      {
        "prompt": "What does “tiptoed” suggest?",
        "answer": "Biscuit moves quietly and carefully.",
        "wrong": [
          "Biscuit runs noisily.",
          "Biscuit is asleep."
        ]
      },
      {
        "prompt": "What does “clicked faintly” describe?",
        "answer": "A small quiet sound",
        "wrong": [
          "A bright colour",
          "A strong smell"
        ]
      },
      {
        "prompt": "What does the sleeping cat comparison emphasise?",
        "answer": "The kitchen is quiet.",
        "wrong": [
          "The kitchen is wet.",
          "The cupboard is tall."
        ]
      }
    ],
    "evidence": [
      "Biscuit tiptoed towards the biscuit tin.",
      "His claws clicked faintly on the kitchen floor.",
      "Ellie watched his nose twitch beside the cupboard.",
      "The kitchen was as quiet as a sleeping cat.",
      "Then the tin toppled with a clatter.",
      "Biscuits skittered across the tiles like tiny wheels.",
      "Biscuit scrambled backwards, his paws slipping in every direction.",
      "Ellie burst into laughter and put the tin safely out of reach."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Biscuit tiptoed towards the biscuit tin. His claws clicked faintly on the kitchen floor. Ellie watched his nose twitch beside the cupboard. The kitchen was as quiet as a sleeping cat."
      },
      {
        "type": "p",
        "text": "Then the tin toppled with a clatter. Biscuits skittered across the tiles like tiny wheels. Biscuit scrambled backwards, his paws slipping in every direction. Ellie burst into laughter and put the tin safely out of reach."
      }
    ],
    "groups": [
      {
        "label": "Quiet sneaking",
        "cards": [
          "Biscuit tiptoed towards the biscuit tin.",
          "His claws clicked faintly on the kitchen floor.",
          "Ellie watched his nose twitch beside the cupboard.",
          "The kitchen was as quiet as a sleeping cat."
        ]
      },
      {
        "label": "Sudden noisy movement",
        "cards": [
          "Then the tin toppled with a clatter.",
          "Biscuits skittered across the tiles like tiny wheels.",
          "Biscuit scrambled backwards, his paws slipping in every direction.",
          "Ellie burst into laughter and put the tin safely out of reach."
        ]
      }
    ],
    "sortPrompt": "Sort the details under the paragraph theme they support.",
    "questions": [
      {
        "prompt": "What effect does “scrambled backwards” create?",
        "answer": "A picture of sudden clumsy movement",
        "wrong": [
          "A picture of calm sleep",
          "A picture of slow careful walking"
        ],
        "evidence": "Biscuit scrambled backwards, his paws slipping in every direction.",
        "evidencePrompt": "Tap the sentence showing Biscuit’s hurried movement."
      },
      {
        "prompt": "Why compare biscuits to tiny wheels?",
        "answer": "To help us picture them moving across the floor",
        "wrong": [
          "To tell us they are made of metal",
          "To say they are stuck in the tin"
        ],
        "evidence": "Biscuits skittered across the tiles like tiny wheels.",
        "evidencePrompt": "Tap the sentence with the comparison about the biscuits."
      },
      {
        "prompt": "How does the mood change?",
        "answer": "Quiet suspense turns into noisy comedy.",
        "wrong": [
          "Cheerfulness turns into a sad ending.",
          "There is no change."
        ],
        "evidence": "Ellie burst into laughter and put the tin safely out of reach.",
        "evidencePrompt": "Tap the sentence showing Ellie finding the event funny."
      },
      {
        "prompt": "Which word makes the falling tin sound noisy?",
        "answer": "clatter",
        "wrong": [
          "faintly",
          "quiet"
        ],
        "evidence": "Then the tin toppled with a clatter.",
        "evidencePrompt": "Tap the sentence naming the noise of the falling tin."
      }
    ]
  },
  {
    "title": "A Quiet Doorway",
    "short": "Priya stepped into a library wrapped in warm silence. Rows of books stood like patient travellers waiting to be chosen. She ran a finger along their smooth spines. A small reading lamp glowed beside an empty chair.",
    "intro": [
      {
        "prompt": "What does “wrapped in warm silence” suggest?",
        "answer": "The library feels calm and comforting.",
        "wrong": [
          "The library is covered in cloth.",
          "The library is frightening."
        ]
      },
      {
        "prompt": "What does the comparison with waiting travellers suggest?",
        "answer": "The books seem ready to take readers somewhere.",
        "wrong": [
          "The books have train tickets.",
          "People are sleeping on shelves."
        ]
      },
      {
        "prompt": "What does “glowed” help you imagine?",
        "answer": "A gentle light",
        "wrong": [
          "A loud bell",
          "A rough chair"
        ]
      }
    ],
    "evidence": [
      "Priya stepped into a library wrapped in warm silence.",
      "Rows of books stood like patient travellers waiting to be chosen.",
      "She ran a finger along their smooth spines.",
      "A small reading lamp glowed beside an empty chair.",
      "Outside, buses growled and bicycle bells rang sharply.",
      "Inside, pages rustled like leaves stirred by a soft breeze.",
      "Priya settled into the chair, letting the busy street fade from her thoughts.",
      "The story opened a doorway to a different world."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Priya stepped into a library wrapped in warm silence. Rows of books stood like patient travellers waiting to be chosen. She ran a finger along their smooth spines. A small reading lamp glowed beside an empty chair."
      },
      {
        "type": "p",
        "text": "Outside, buses growled and bicycle bells rang sharply. Inside, pages rustled like leaves stirred by a soft breeze. Priya settled into the chair, letting the busy street fade from her thoughts. The story opened a doorway to a different world."
      }
    ],
    "groups": [
      {
        "label": "Inside the library",
        "cards": [
          "Priya stepped into a library wrapped in warm silence.",
          "Rows of books stood like patient travellers waiting to be chosen.",
          "A small reading lamp glowed beside an empty chair.",
          "Inside, pages rustled like leaves stirred by a soft breeze."
        ]
      },
      {
        "label": "Outside in the street",
        "cards": [
          "Buses growled outside.",
          "Bicycle bells rang sharply outside.",
          "The street was busy.",
          "Traffic made the street noisy."
        ]
      }
    ],
    "sortPrompt": "Sort the descriptions by the place they describe.",
    "questions": [
      {
        "prompt": "Why compare the story to a doorway?",
        "answer": "It lets Priya imagine entering another world.",
        "wrong": [
          "It explains how to repair the library door.",
          "It says the book is made of wood."
        ],
        "evidence": "The story opened a doorway to a different world.",
        "evidencePrompt": "Tap the sentence describing the story as an entrance."
      },
      {
        "prompt": "What is the effect of contrasting buses with rustling pages?",
        "answer": "It emphasises the calm inside compared with the noise outside.",
        "wrong": [
          "It makes both places seem equally noisy.",
          "It suggests pages are made from bus tickets."
        ],
        "evidence": "Outside, buses growled and bicycle bells rang sharply.",
        "evidencePrompt": "Tap the sentence giving noisy street sounds."
      },
      {
        "prompt": "Why compare pages to leaves in a soft breeze?",
        "answer": "To help us imagine a gentle rustling sound",
        "wrong": [
          "To say the library has no roof",
          "To tell us the books are wet"
        ],
        "evidence": "Inside, pages rustled like leaves stirred by a soft breeze.",
        "evidencePrompt": "Tap the sentence comparing the page sound with nature."
      },
      {
        "prompt": "Which detail shows Priya stops thinking about the street?",
        "answer": "The street fades from her thoughts.",
        "wrong": [
          "She stands beside a bus.",
          "She rings a bicycle bell."
        ],
        "evidence": "Priya settled into the chair, letting the busy street fade from her thoughts.",
        "evidencePrompt": "Tap the sentence showing Priya turning her attention away from outside."
      }
    ]
  }
];
export function buildHowLanguageCreatesMeaningQuestions(level, rng) {
  return readingQuestions(BANK, RULE, level, rng);
}
