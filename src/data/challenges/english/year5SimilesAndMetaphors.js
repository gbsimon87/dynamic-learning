import { readingQuestions } from "./year5Practice.js";
/** Similes and Metaphors: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "A simile (compares two things using like or as) and a metaphor (says one thing is another) help the reader picture what is described.";
export const BANK = [
  {
    "title": "The Night Walk",
    "short": "The kite was a red bird high in the sky. Priya gripped the string as tightly as a sailor holds a rope. The kite pulled like a puppy on a lead.",
    "intro": [
      {
        "prompt": "Which sentence is a metaphor?",
        "answer": "The kite was a red bird high in the sky.",
        "wrong": [
          "The kite pulled like a puppy on a lead.",
          "Priya gripped the string as tightly as a sailor holds a rope."
        ]
      },
      {
        "prompt": "In the last sentence, what is the kite compared with?",
        "answer": "A puppy on a lead",
        "wrong": [
          "A red bird",
          "A sailor with a rope"
        ]
      },
      {
        "prompt": "What does “a red bird” help you picture?",
        "answer": "A bright kite flying high",
        "wrong": [
          "A real bird tangled in string",
          "A sad bird with no wings"
        ]
      }
    ],
    "evidence": [
      "The concert had finished, and Amara and Leo walked home across the park.",
      "The moon was a silver coin in the sky.",
      "The grass was as wet as a sponge.",
      "Leo’s torch shone like a tiny star.",
      "The path was a pale ribbon through the dark.",
      "Amara pulled up her hood.",
      "Her fingers felt as cold as ice.",
      "The trees were tall giants with bony arms.",
      "A wind howled like a hungry wolf.",
      "At last they spotted their street.",
      "Every window was a golden square of welcome."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "The concert had finished, and Amara and Leo walked home across the park. The moon was a silver coin in the sky. The grass was as wet as a sponge. Leo’s torch shone like a tiny star. The path was a pale ribbon through the dark."
      },
      {
        "type": "p",
        "text": "Amara pulled up her hood. Her fingers felt as cold as ice. The trees were tall giants with bony arms. A wind howled like a hungry wolf. At last they spotted their street. Every window was a golden square of welcome."
      }
    ],
    "groups": [
      {
        "label": "Simile",
        "cards": [
          "The grass was as wet as a sponge.",
          "Leo’s torch shone like a tiny star.",
          "Her fingers felt as cold as ice.",
          "A wind howled like a hungry wolf."
        ]
      },
      {
        "label": "Metaphor",
        "cards": [
          "The moon was a silver coin in the sky.",
          "The path was a pale ribbon through the dark.",
          "The trees were tall giants with bony arms.",
          "Every window was a golden square of welcome."
        ]
      }
    ],
    "sortPrompt": "Sort the sentences. Does each one compare using like or as (a simile), or say one thing is another (a metaphor)?",
    "questions": [
      {
        "prompt": "What does “The moon was a silver coin” make the reader picture?",
        "answer": "A round, flat, shining moon",
        "wrong": [
          "Money lost in the park",
          "A moon made of metal in a shop"
        ],
        "evidencePrompt": "Tap the sentence that says the moon was something else.",
        "evidence": "The moon was a silver coin in the sky."
      },
      {
        "prompt": "Why is “Leo’s torch shone like a tiny star” a simile?",
        "answer": "It compares the torch with a star using the word like.",
        "wrong": [
          "It says the torch is a star with no joining word.",
          "It describes the torch without comparing it."
        ],
        "evidencePrompt": "Tap the simile about the torch.",
        "evidence": "Leo’s torch shone like a tiny star."
      },
      {
        "prompt": "Which sentence says the same as “The trees were tall giants with bony arms” without a comparison?",
        "answer": "The trees were tall, with thin, bare branches.",
        "wrong": [
          "The trees were small and covered in leaves.",
          "Real giants were standing in the park."
        ],
        "evidencePrompt": "Tap the metaphor about the trees.",
        "evidence": "The trees were tall giants with bony arms."
      },
      {
        "prompt": "What does “howled like a hungry wolf” help the reader hear?",
        "answer": "A loud, wild, mournful sound",
        "wrong": [
          "A soft, gentle whisper",
          "A quiet, steady hum"
        ],
        "evidencePrompt": "Tap the sentence that compares the wind with an animal.",
        "evidence": "A wind howled like a hungry wolf."
      }
    ]
  },
  {
    "title": "Storm Song",
    "short": "Snow was a white blanket over the hill. Zayn’s sledge flew down like an arrow. The cold air nipped his nose like a tiny crab.",
    "intro": [
      {
        "prompt": "Which sentence is a metaphor?",
        "answer": "Snow was a white blanket over the hill.",
        "wrong": [
          "Zayn’s sledge flew down like an arrow.",
          "The cold air nipped his nose like a tiny crab."
        ]
      },
      {
        "prompt": "What does the arrow simile tell you about the sledge?",
        "answer": "It moved very fast.",
        "wrong": [
          "It moved slowly and wobbled.",
          "It broke in half."
        ]
      },
      {
        "prompt": "What does the crab simile help you feel?",
        "answer": "The air pinching his nose",
        "wrong": [
          "The air warming his nose",
          "The air smelling of the sea"
        ]
      }
    ],
    "evidence": [
      "The thunder is a drum in the clouds.",
      "Rain taps the roof like tiny fingers.",
      "The gutters are rushing rivers.",
      "Puddles shine like spilt silver paint.",
      "The wind is a thief, snatching at hats.",
      "My umbrella bobs like a boat on the waves.",
      "The streetlamps glow as softly as candles.",
      "The night is a dark, wet blanket.",
      "By morning, the storm has gone."
    ],
    "blocks": [
      {
        "type": "line",
        "text": "The thunder is a drum in the clouds."
      },
      {
        "type": "line",
        "text": "Rain taps the roof like tiny fingers."
      },
      {
        "type": "line",
        "text": "The gutters are rushing rivers."
      },
      {
        "type": "line",
        "text": "Puddles shine like spilt silver paint."
      },
      {
        "type": "line",
        "text": "The wind is a thief, snatching at hats."
      },
      {
        "type": "line",
        "text": "My umbrella bobs like a boat on the waves."
      },
      {
        "type": "line",
        "text": "The streetlamps glow as softly as candles."
      },
      {
        "type": "line",
        "text": "The night is a dark, wet blanket."
      },
      {
        "type": "line",
        "text": "By morning, the storm has gone."
      }
    ],
    "groups": [
      {
        "label": "Simile",
        "cards": [
          "Rain taps the roof like tiny fingers.",
          "Puddles shine like spilt silver paint.",
          "My umbrella bobs like a boat on the waves.",
          "The streetlamps glow as softly as candles."
        ]
      },
      {
        "label": "Metaphor",
        "cards": [
          "The thunder is a drum in the clouds.",
          "The gutters are rushing rivers.",
          "The wind is a thief, snatching at hats.",
          "The night is a dark, wet blanket."
        ]
      }
    ],
    "sortPrompt": "Sort the lines of the poem. Is each one a simile (uses like or as) or a metaphor (says one thing is another)?",
    "questions": [
      {
        "prompt": "What does the metaphor “The thunder is a drum in the clouds” help you hear?",
        "answer": "Deep, booming rumbles",
        "wrong": [
          "Quick, tiny taps",
          "Complete silence"
        ],
        "evidencePrompt": "Tap the line that says thunder is something else.",
        "evidence": "The thunder is a drum in the clouds."
      },
      {
        "prompt": "What is compared in “Puddles shine like spilt silver paint”?",
        "answer": "Shiny puddles and spilt silver paint",
        "wrong": [
          "Painters and rainy weather",
          "Rain and silver coins"
        ],
        "evidencePrompt": "Tap the line that compares puddles with paint.",
        "evidence": "Puddles shine like spilt silver paint."
      },
      {
        "prompt": "Why does the poet call the wind a thief?",
        "answer": "It seems to snatch things such as hats.",
        "wrong": [
          "It is quiet and sneaky.",
          "It carries the rain away."
        ],
        "evidencePrompt": "Tap the metaphor about the wind.",
        "evidence": "The wind is a thief, snatching at hats."
      },
      {
        "prompt": "What does the metaphor “The gutters are rushing rivers” show?",
        "answer": "Water pouring fast along the gutters",
        "wrong": [
          "That real rivers run down the street",
          "That the rain has stopped"
        ],
        "evidencePrompt": "Tap the line that says the gutters are something else.",
        "evidence": "The gutters are rushing rivers."
      }
    ]
  },
  {
    "title": "Morning at the Harbour",
    "short": "The storm cloud was a giant bruise over the hills. Rain fell like pins on the tin roof. Amara watched from her window as the garden became a lake.",
    "intro": [
      {
        "prompt": "Which sentence is a simile?",
        "answer": "Rain fell like pins on the tin roof.",
        "wrong": [
          "The storm cloud was a giant bruise over the hills.",
          "The garden became a lake."
        ]
      },
      {
        "prompt": "Which colours might “a giant bruise” suggest?",
        "answer": "Dark purple and grey",
        "wrong": [
          "Bright yellow",
          "Pale pink"
        ]
      },
      {
        "prompt": "What does “the garden became a lake” mean?",
        "answer": "The garden filled with water.",
        "wrong": [
          "A lake was dug in the garden.",
          "The garden was painted blue."
        ]
      }
    ],
    "evidence": [
      "Dawn crept over the harbour as slowly as honey sliding off a spoon.",
      "The sea was a sheet of crumpled foil.",
      "Fishing boats bobbed like sleepy ducks.",
      "Gulls were white scraps of paper tossed on the breeze.",
      "Ellie stood on the jetty with her sketchbook.",
      "The cliffs behind her were a sleeping dragon’s spine.",
      "A ferry slid out of the mist like a ghost.",
      "Its horn was a deep, sad cello.",
      "The air tasted as salty as chips.",
      "By noon the mist had cleared, and she could finally begin to draw."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Dawn crept over the harbour as slowly as honey sliding off a spoon. The sea was a sheet of crumpled foil. Fishing boats bobbed like sleepy ducks. Gulls were white scraps of paper tossed on the breeze."
      },
      {
        "type": "p",
        "text": "Ellie stood on the jetty with her sketchbook. The cliffs behind her were a sleeping dragon’s spine. A ferry slid out of the mist like a ghost. Its horn was a deep, sad cello. The air tasted as salty as chips. By noon the mist had cleared, and she could finally begin to draw."
      }
    ],
    "groups": [
      {
        "label": "Simile",
        "cards": [
          "Dawn crept over the harbour as slowly as honey sliding off a spoon.",
          "Fishing boats bobbed like sleepy ducks.",
          "A ferry slid out of the mist like a ghost.",
          "The air tasted as salty as chips."
        ]
      },
      {
        "label": "Metaphor",
        "cards": [
          "The sea was a sheet of crumpled foil.",
          "Gulls were white scraps of paper tossed on the breeze.",
          "The cliffs behind her were a sleeping dragon’s spine.",
          "Its horn was a deep, sad cello."
        ]
      }
    ],
    "sortPrompt": "Sort the sentences from the travel description. Is each one a simile (uses like or as) or a metaphor (says one thing is another)?",
    "questions": [
      {
        "prompt": "What does “The sea was a sheet of crumpled foil” make the reader picture?",
        "answer": "A sea that is wrinkled and shiny",
        "wrong": [
          "A sea made of kitchen foil",
          "A calm, dull sea"
        ],
        "evidencePrompt": "Tap the sentence that says the sea was something else.",
        "evidence": "The sea was a sheet of crumpled foil."
      },
      {
        "prompt": "What is compared in the simile about the ferry?",
        "answer": "A ferry and a ghost",
        "wrong": [
          "A ferry and the mist",
          "A ferry and a cliff"
        ],
        "evidencePrompt": "Tap the simile about the ferry.",
        "evidence": "A ferry slid out of the mist like a ghost."
      },
      {
        "prompt": "Why does the writer call the ferry’s horn “a deep, sad cello”?",
        "answer": "To show a low, mournful sound",
        "wrong": [
          "To show it was a musical instrument on board",
          "To show it was loud and cheerful"
        ],
        "evidencePrompt": "Tap the sentence about the sound of the horn.",
        "evidence": "Its horn was a deep, sad cello."
      },
      {
        "prompt": "Which sentence says the same as “Dawn crept over the harbour as slowly as honey sliding off a spoon” in plain words?",
        "answer": "The sun rose very slowly over the harbour.",
        "wrong": [
          "The sun rose quickly over the harbour.",
          "Honey was spilt on the harbour."
        ],
        "evidencePrompt": "Tap the simile about how slowly dawn arrived.",
        "evidence": "Dawn crept over the harbour as slowly as honey sliding off a spoon."
      }
    ]
  }
];
export function buildSimilesAndMetaphorsQuestions(level, rng) {
  return readingQuestions(BANK, RULE, level, rng);
}
