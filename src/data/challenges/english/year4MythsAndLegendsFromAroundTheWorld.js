import { readingQuestions } from "./year4Reading.js";
/** Original texts for Myths and Legends from Around the World; source URLs on the traditional retellings. */
export const RULE = "Traditional myths and tales use extraordinary events to explore ideas and explain the world.";
export const BANK = [
  {
    "title": "Icarus: an Old Greek Myth",
    "short": "Priya opened a book of old Greek myths and read about Daedalus and his son Icarus. Daedalus made wings from feathers joined with wax so they could escape an island. He warned Icarus to keep away from the hot sun. Icarus was excited by the thought of flying.",
    "intro": [
      {
        "prompt": "Which tradition does this story come from?",
        "answer": "Old Greek myths",
        "wrong": [
          "A modern school diary",
          "Instructions for a real aeroplane"
        ]
      },
      {
        "prompt": "What unusual invention appears?",
        "answer": "Wings made with feathers and wax",
        "wrong": [
          "A steam train",
          "A glass bridge"
        ]
      },
      {
        "prompt": "What warning does Daedalus give?",
        "answer": "Stay away from the hot sun.",
        "wrong": [
          "Fly as high as possible.",
          "Leave the wings at home."
        ]
      }
    ],
    "evidence": [
      "Priya opened a book of old Greek myths and read about Daedalus and his son Icarus.",
      "Daedalus made wings from feathers joined with wax so they could escape an island.",
      "He warned Icarus to keep away from the hot sun.",
      "Icarus was excited by the thought of flying.",
      "In the myth, father and son flew out over the sea together.",
      "Icarus rose higher, forgetting the warning as the world grew small below him.",
      "The sun softened the wax, and the feathers came loose.",
      "Icarus fell into the sea, and Daedalus was left to grieve for his son."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Priya opened a book of old Greek myths and read about Daedalus and his son Icarus. Daedalus made wings from feathers joined with wax so they could escape an island. He warned Icarus to keep away from the hot sun. Icarus was excited by the thought of flying."
      },
      {
        "type": "p",
        "text": "In the myth, father and son flew out over the sea together. Icarus rose higher, forgetting the warning as the world grew small below him. The sun softened the wax, and the feathers came loose. Icarus fell into the sea, and Daedalus was left to grieve for his son."
      }
    ],
    "groups": [
      {
        "label": "The plan and warning",
        "cards": [
          "Priya opened a book of old Greek myths and read about Daedalus and his son Icarus.",
          "Daedalus made wings from feathers joined with wax so they could escape an island.",
          "He warned Icarus to keep away from the hot sun.",
          "Icarus was excited by the thought of flying."
        ]
      },
      {
        "label": "The flight and its consequence",
        "cards": [
          "In the myth, father and son flew out over the sea together.",
          "Icarus rose higher, forgetting the warning as the world grew small below him.",
          "The sun softened the wax, and the feathers came loose.",
          "Icarus fell into the sea, and Daedalus was left to grieve for his son."
        ]
      }
    ],
    "sortPrompt": "Sort the details under the paragraph theme they support.",
    "questions": [
      {
        "prompt": "Which theme is supported by Icarus’s mistake?",
        "answer": "Ignoring a warning can have serious consequences.",
        "wrong": [
          "Wax becomes stronger in heat.",
          "Excitement always keeps us safe."
        ],
        "evidence": "The sun softened the wax, and the feathers came loose.",
        "evidencePrompt": "Tap the sentence showing why the wings fail."
      },
      {
        "prompt": "Why is this presented as a myth rather than a practical guide?",
        "answer": "It is an old traditional story about an extraordinary flight.",
        "wrong": [
          "It lists safety checks for real wings.",
          "It reports a school experiment."
        ],
        "evidence": "Priya opened a book of old Greek myths and read about Daedalus and his son Icarus.",
        "evidencePrompt": "Tap the sentence naming the book and its story tradition."
      },
      {
        "prompt": "What causes Icarus to forget the warning?",
        "answer": "He is carried away by the excitement of flying high.",
        "wrong": [
          "He never hears a warning.",
          "He loses the book."
        ],
        "evidence": "Icarus rose higher, forgetting the warning as the world grew small below him.",
        "evidencePrompt": "Tap the sentence showing Icarus forgetting what he was told."
      },
      {
        "prompt": "What makes the ending sad?",
        "answer": "Daedalus loses his son.",
        "wrong": [
          "Priya loses her pencil.",
          "The island disappears."
        ],
        "evidence": "Icarus fell into the sea, and Daedalus was left to grieve for his son.",
        "evidencePrompt": "Tap the sentence showing the loss at the end."
      }
    ],
    "source": "https://www.gutenberg.org/cache/epub/11582/pg11582-images.html"
  },
  {
    "title": "Thor’s Hammer: a Norse Myth",
    "short": "Zayn read a Norse myth about Thor’s missing hammer. A giant called Thrym had taken it and hidden it. The giant demanded that the goddess Freyja marry him before he would return it. The gods needed a plan because Freyja refused.",
    "intro": [
      {
        "prompt": "Which tradition does Zayn read?",
        "answer": "Norse myths",
        "wrong": [
          "A school report",
          "A Greek recipe"
        ]
      },
      {
        "prompt": "Who has hidden the hammer?",
        "answer": "Thrym",
        "wrong": [
          "Freyja",
          "Zayn"
        ]
      },
      {
        "prompt": "Why do the gods need a plan?",
        "answer": "Freyja refuses the giant’s demand.",
        "wrong": [
          "The hammer is in a shop.",
          "Thor cannot find a book."
        ]
      }
    ],
    "evidence": [
      "Zayn read a Norse myth about Thor’s missing hammer.",
      "A giant called Thrym had taken it and hidden it.",
      "The giant demanded that the goddess Freyja marry him before he would return it.",
      "The gods needed a plan because Freyja refused.",
      "Thor dressed as a bride, hiding his face beneath a veil, and travelled to the giant’s hall with Loki.",
      "Loki helped keep the disguise secret by explaining away Thor’s surprising behaviour.",
      "When the hammer was brought out for the ceremony, it was finally within Thor’s reach.",
      "Thor seized it and brought the trick to an end."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Zayn read a Norse myth about Thor’s missing hammer. A giant called Thrym had taken it and hidden it. The giant demanded that the goddess Freyja marry him before he would return it. The gods needed a plan because Freyja refused."
      },
      {
        "type": "p",
        "text": "Thor dressed as a bride, hiding his face beneath a veil, and travelled to the giant’s hall with Loki. Loki helped keep the disguise secret by explaining away Thor’s surprising behaviour. When the hammer was brought out for the ceremony, it was finally within Thor’s reach. Thor seized it and brought the trick to an end."
      }
    ],
    "groups": [
      {
        "label": "The theft and demand",
        "cards": [
          "Zayn read a Norse myth about Thor’s missing hammer.",
          "A giant called Thrym had taken it and hidden it.",
          "The giant demanded that the goddess Freyja marry him before he would return it.",
          "The gods needed a plan because Freyja refused."
        ]
      },
      {
        "label": "The disguise and recovery",
        "cards": [
          "Thor dressed as a bride, hiding his face beneath a veil, and travelled to the giant’s hall with Loki.",
          "Loki helped keep the disguise secret by explaining away Thor’s surprising behaviour.",
          "When the hammer was brought out for the ceremony, it was finally within Thor’s reach.",
          "Thor seized it and brought the trick to an end."
        ]
      }
    ],
    "sortPrompt": "Sort the details under the paragraph theme they support.",
    "questions": [
      {
        "prompt": "How do the characters recover the hammer?",
        "answer": "They use a disguise to bring Thor close to it.",
        "wrong": [
          "They buy a new hammer.",
          "They ask Zayn to draw one."
        ],
        "evidence": "Thor dressed as a bride, hiding his face beneath a veil, and travelled to the giant’s hall with Loki.",
        "evidencePrompt": "Tap the sentence showing Thor travelling in disguise."
      },
      {
        "prompt": "What role does Loki play?",
        "answer": "He helps prevent the disguise being discovered.",
        "wrong": [
          "He returns the hammer before the visit.",
          "He writes Zayn’s diary."
        ],
        "evidence": "Loki helped keep the disguise secret by explaining away Thor’s surprising behaviour.",
        "evidencePrompt": "Tap the sentence explaining Loki’s help."
      },
      {
        "prompt": "What creates the chance to take the hammer back?",
        "answer": "It is brought out for the ceremony.",
        "wrong": [
          "It turns into a bird.",
          "Freyja hides it in a cave."
        ],
        "evidence": "When the hammer was brought out for the ceremony, it was finally within Thor’s reach.",
        "evidencePrompt": "Tap the sentence putting the hammer within reach."
      },
      {
        "prompt": "Which convention is found in this myth?",
        "answer": "Gods and a giant take part in an extraordinary adventure.",
        "wrong": [
          "A numbered materials list",
          "A factual school timetable"
        ],
        "evidence": "The gods needed a plan because Freyja refused.",
        "evidencePrompt": "Tap the sentence referring to the gods needing a plan."
      }
    ],
    "source": "https://www.gutenberg.org/cache/epub/44622/pg44622-images.html"
  },
  {
    "title": "Anansi’s Wisdom: a West African Tale",
    "short": "Amara read a West African tale about Anansi and a pot of wisdom. Anansi wanted to keep all the wisdom for himself. He put the wisdom in a pot and carried it to a tall tree. The pot hung in front of him and blocked his climb.",
    "intro": [
      {
        "prompt": "Where does the tale come from?",
        "answer": "West Africa",
        "wrong": [
          "A modern weather forecast",
          "A Norse instruction book"
        ]
      },
      {
        "prompt": "What is Anansi trying to keep?",
        "answer": "All the wisdom",
        "wrong": [
          "Every tree",
          "The rain"
        ]
      },
      {
        "prompt": "What stops him climbing easily?",
        "answer": "The pot hangs in front of him.",
        "wrong": [
          "His son hides the tree.",
          "The tree has no trunk."
        ]
      }
    ],
    "evidence": [
      "Amara read a West African tale about Anansi and a pot of wisdom.",
      "Anansi wanted to keep all the wisdom for himself.",
      "He put the wisdom in a pot and carried it to a tall tree.",
      "The pot hung in front of him and blocked his climb.",
      "His son watched and suggested moving the pot onto his back.",
      "Anansi realised that his son had offered wise advice even though the pot was supposed to hold all wisdom.",
      "In anger, Anansi threw the pot down and it broke.",
      "The tale says that wisdom spread through the world instead of belonging to just one person."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Amara read a West African tale about Anansi and a pot of wisdom. Anansi wanted to keep all the wisdom for himself. He put the wisdom in a pot and carried it to a tall tree. The pot hung in front of him and blocked his climb."
      },
      {
        "type": "p",
        "text": "His son watched and suggested moving the pot onto his back. Anansi realised that his son had offered wise advice even though the pot was supposed to hold all wisdom. In anger, Anansi threw the pot down and it broke. The tale says that wisdom spread through the world instead of belonging to just one person."
      }
    ],
    "groups": [
      {
        "label": "Keeping wisdom",
        "cards": [
          "Amara read a West African tale about Anansi and a pot of wisdom.",
          "Anansi wanted to keep all the wisdom for himself.",
          "He put the wisdom in a pot and carried it to a tall tree.",
          "The pot hung in front of him and blocked his climb."
        ]
      },
      {
        "label": "Advice and sharing wisdom",
        "cards": [
          "His son watched and suggested moving the pot onto his back.",
          "Anansi realised that his son had offered wise advice even though the pot was supposed to hold all wisdom.",
          "In anger, Anansi threw the pot down and it broke.",
          "The tale says that wisdom spread through the world instead of belonging to just one person."
        ]
      }
    ],
    "sortPrompt": "Sort the details under the paragraph theme they support.",
    "questions": [
      {
        "prompt": "What does the son’s advice show?",
        "answer": "Anansi does not possess every piece of wisdom.",
        "wrong": [
          "The pot has no value as a container.",
          "The son cannot speak."
        ],
        "evidence": "Anansi realised that his son had offered wise advice even though the pot was supposed to hold all wisdom.",
        "evidencePrompt": "Tap the sentence showing Anansi noticing wisdom outside his pot."
      },
      {
        "prompt": "Which theme does the ending suggest?",
        "answer": "Wisdom should not belong to only one person.",
        "wrong": [
          "Nobody can ever learn.",
          "Advice must always be ignored."
        ],
        "evidence": "The tale says that wisdom spread through the world instead of belonging to just one person.",
        "evidencePrompt": "Tap the sentence explaining wisdom spreading through the world."
      },
      {
        "prompt": "How could the climbing problem have been solved?",
        "answer": "Move the pot to Anansi’s back",
        "wrong": [
          "Make the pot even larger",
          "Put the tree inside the pot"
        ],
        "evidence": "His son watched and suggested moving the pot onto his back.",
        "evidencePrompt": "Tap the sentence giving the son’s practical suggestion."
      },
      {
        "prompt": "What makes this a traditional tale rather than a factual report?",
        "answer": "Wisdom is imagined as something that can be stored and scattered from a pot.",
        "wrong": [
          "It gives a real train timetable.",
          "It records a class vote."
        ],
        "evidence": "He put the wisdom in a pot and carried it to a tall tree.",
        "evidencePrompt": "Tap the sentence treating wisdom as something placed in a container."
      }
    ],
    "source": "https://www.gutenberg.org/cache/epub/66923/pg66923-images.html"
  }
];
export function buildMythsAndLegendsFromAroundTheWorldQuestions(level, rng) {
  return readingQuestions(BANK, RULE, level, rng);
}
