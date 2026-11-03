import { readingQuestions } from "./year5Practice.js";
/** Retrieving and Recording Information: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "To retrieve information, scan the headings and key words. To record it, write a short note with only the key words, not a whole copied sentence.";
export const BANK = [
  {
    "title": "Visit Harbour Museum",
    "short": "Hill Zoo is open from 9 a.m. to 5 p.m. every day. Penguin feeding is at noon. Ellie’s favourite animal is the red panda.",
    "intro": [
      {
        "prompt": "When does penguin feeding happen?",
        "answer": "At noon",
        "wrong": [
          "At 9 a.m.",
          "At 5 p.m."
        ]
      },
      {
        "prompt": "Which is the best short note to record the opening hours?",
        "answer": "Zoo: open 9–5 daily",
        "wrong": [
          "Ellie likes red pandas",
          "Penguin feeding is a very exciting thing to watch at noon"
        ]
      },
      {
        "prompt": "Which detail can be left out of notes about visiting times?",
        "answer": "Ellie’s favourite animal is the red panda.",
        "wrong": [
          "Penguin feeding is at noon.",
          "Hill Zoo is open from 9 a.m. to 5 p.m. every day."
        ]
      }
    ],
    "evidence": [
      "Opening times",
      "The museum is open from Tuesday to Sunday.",
      "Doors open at ten o’clock and close at four.",
      "It is closed on Mondays.",
      "Tickets",
      "Children’s tickets cost three pounds.",
      "Adult tickets cost six pounds.",
      "Children under five go in for free.",
      "What to see",
      "The Whale Hall holds a skeleton that is twenty metres long.",
      "A guide told Leo she tells the same joke every morning.",
      "The Pirate Room has a real treasure chest.",
      "The café sells hot chocolate that tastes like melted sweets."
    ],
    "blocks": [
      {
        "type": "h",
        "text": "Opening times"
      },
      {
        "type": "p",
        "text": "The museum is open from Tuesday to Sunday. Doors open at ten o’clock and close at four. It is closed on Mondays."
      },
      {
        "type": "h",
        "text": "Tickets"
      },
      {
        "type": "p",
        "text": "Children’s tickets cost three pounds. Adult tickets cost six pounds. Children under five go in for free."
      },
      {
        "type": "h",
        "text": "What to see"
      },
      {
        "type": "p",
        "text": "The Whale Hall holds a skeleton that is twenty metres long. A guide told Leo she tells the same joke every morning. The Pirate Room has a real treasure chest. The café sells hot chocolate that tastes like melted sweets."
      }
    ],
    "groups": [
      {
        "label": "Useful for planning a visit",
        "cards": [
          "Doors open at ten o’clock and close at four.",
          "It is closed on Mondays.",
          "Children’s tickets cost three pounds.",
          "Children under five go in for free."
        ]
      },
      {
        "label": "Interesting, but not needed for planning",
        "cards": [
          "The Whale Hall holds a skeleton that is twenty metres long.",
          "A guide told Leo she tells the same joke every morning.",
          "The Pirate Room has a real treasure chest.",
          "The café sells hot chocolate that tastes like melted sweets."
        ]
      }
    ],
    "sortPrompt": "Sort the sentences from the leaflet. Which ones are useful for planning a visit, and which are interesting but not needed?",
    "sortContext": "Imagine you are making notes about opening times and ticket prices for a trip to the museum.",
    "questions": [
      {
        "prompt": "What time does the museum close?",
        "answer": "Four o’clock",
        "wrong": [
          "Ten o’clock",
          "Six o’clock"
        ],
        "evidencePrompt": "Tap the sentence that gives the opening and closing times.",
        "evidence": "Doors open at ten o’clock and close at four."
      },
      {
        "prompt": "Which heading would you look under to find the price of a ticket?",
        "answer": "Tickets",
        "wrong": [
          "Opening times",
          "What to see"
        ],
        "evidencePrompt": "Tap the heading you would look under to find a price.",
        "evidence": "Tickets"
      },
      {
        "prompt": "Which note records the price for a child?",
        "answer": "Child ticket: £3",
        "wrong": [
          "Children’s tickets are very cheap",
          "Adult ticket: £6"
        ],
        "evidencePrompt": "Tap the sentence that gives the price for a child.",
        "evidence": "Children’s tickets cost three pounds."
      },
      {
        "prompt": "On which day is the museum closed?",
        "answer": "Monday",
        "wrong": [
          "Sunday",
          "Tuesday"
        ],
        "evidencePrompt": "Tap the sentence that names the day the museum is closed.",
        "evidence": "It is closed on Mondays."
      }
    ]
  },
  {
    "title": "Fact File: Barn Owls",
    "short": "A volcano erupts when melted rock called magma rises through a vent. The crater is the bowl-shaped dip at the top. Priya saw a model volcano at the science fair.",
    "intro": [
      {
        "prompt": "What is magma?",
        "answer": "Melted rock",
        "wrong": [
          "A bowl-shaped dip",
          "A science fair"
        ]
      },
      {
        "prompt": "Which is the best short note about the crater?",
        "answer": "Crater: bowl at top",
        "wrong": [
          "Crater: magma",
          "The crater is the bowl-shaped dip at the top of the model that Priya saw at the science fair"
        ]
      },
      {
        "prompt": "Which detail can be left out of notes on how volcanoes work?",
        "answer": "Priya saw a model volcano at the science fair.",
        "wrong": [
          "Magma rises through a vent.",
          "The crater is the bowl-shaped dip at the top."
        ]
      }
    ],
    "evidence": [
      "Appearance",
      "A barn owl has a heart-shaped white face and golden-brown wings.",
      "It is about thirty-five centimetres tall.",
      "Its feathers are so soft that it flies without a sound.",
      "Food",
      "Barn owls hunt at night.",
      "They eat mice, voles and shrews.",
      "One owl can eat up to four small animals in a single night.",
      "Home",
      "They nest in old barns, church towers and hollow trees.",
      "A female lays four to six eggs.",
      "Young owls leave the nest after about ten weeks.",
      "Farmers have welcomed owls into their barns for hundreds of years."
    ],
    "blocks": [
      {
        "type": "h",
        "text": "Appearance"
      },
      {
        "type": "p",
        "text": "A barn owl has a heart-shaped white face and golden-brown wings. It is about thirty-five centimetres tall. Its feathers are so soft that it flies without a sound."
      },
      {
        "type": "h",
        "text": "Food"
      },
      {
        "type": "p",
        "text": "Barn owls hunt at night. They eat mice, voles and shrews. One owl can eat up to four small animals in a single night."
      },
      {
        "type": "h",
        "text": "Home"
      },
      {
        "type": "p",
        "text": "They nest in old barns, church towers and hollow trees. A female lays four to six eggs. Young owls leave the nest after about ten weeks. Farmers have welcomed owls into their barns for hundreds of years."
      }
    ],
    "groups": [
      {
        "label": "Key fact worth noting",
        "cards": [
          "A barn owl has a heart-shaped white face and golden-brown wings.",
          "It is about thirty-five centimetres tall.",
          "They eat mice, voles and shrews.",
          "One owl can eat up to four small animals in a single night."
        ]
      },
      {
        "label": "Detail that can be left out",
        "cards": [
          "They nest in old barns, church towers and hollow trees.",
          "A female lays four to six eggs.",
          "Young owls leave the nest after about ten weeks.",
          "Farmers have welcomed owls into their barns for hundreds of years."
        ]
      }
    ],
    "sortPrompt": "Sort the sentences. Which are key facts for the notes, and which can be left out?",
    "sortContext": "Imagine you are making short notes about what barn owls look like and what they eat.",
    "questions": [
      {
        "prompt": "Which is the best short note for recording what barn owls eat?",
        "answer": "Food: mice, voles, shrews",
        "wrong": [
          "Barn owls eat mice, voles and shrews, and they hunt at night when it is dark.",
          "Food: owl pellets"
        ],
        "evidencePrompt": "Tap the sentence that lists what barn owls eat.",
        "evidence": "They eat mice, voles and shrews."
      },
      {
        "prompt": "Which heading would you look under to find how tall a barn owl is?",
        "answer": "Appearance",
        "wrong": [
          "Food",
          "Home"
        ],
        "evidencePrompt": "Tap the sentence that tells how tall a barn owl is.",
        "evidence": "It is about thirty-five centimetres tall."
      },
      {
        "prompt": "How many eggs does a female barn owl lay?",
        "answer": "Four to six",
        "wrong": [
          "Two to four",
          "Six to eight"
        ],
        "evidencePrompt": "Tap the sentence that gives the number of eggs.",
        "evidence": "A female lays four to six eggs."
      },
      {
        "prompt": "Which heading would help you find where barn owls nest?",
        "answer": "Home",
        "wrong": [
          "Food",
          "Appearance"
        ],
        "evidencePrompt": "Tap the heading that would help you find where owls nest.",
        "evidence": "Home"
      }
    ]
  },
  {
    "title": "Space Club Week",
    "short": "Reading club meets on Mondays and Thursdays. It starts at half past twelve in Room 4. Amara’s book about owls is waiting for her there.",
    "intro": [
      {
        "prompt": "On which days does reading club meet?",
        "answer": "Monday and Thursday",
        "wrong": [
          "Tuesday and Friday",
          "Wednesday and Thursday"
        ]
      },
      {
        "prompt": "Which note best records when and where the club meets?",
        "answer": "Mon/Thu, 12.30, Room 4",
        "wrong": [
          "Reading club, every day at noon",
          "Amara reads about owls"
        ]
      },
      {
        "prompt": "Which detail is not needed for the note?",
        "answer": "Amara’s book about owls is waiting for her there.",
        "wrong": [
          "It starts at half past twelve in Room 4.",
          "Reading club meets on Mondays and Thursdays."
        ]
      }
    ],
    "evidence": [
      "Monday",
      "We meet in the hall at half past nine.",
      "Rocket building starts at ten o’clock and lasts one hour.",
      "Everyone brings a packed lunch, and Zayn always brings jam sandwiches.",
      "Wednesday",
      "Mr Bell leads a planet quiz at half past nine.",
      "After lunch, the club walks to the park for rocket launches at two o’clock.",
      "Last year, the biggest rocket landed in a tree.",
      "Friday",
      "Telescope night begins at seven o’clock in the playground.",
      "Parents are welcome to join.",
      "Wear warm clothes, because the sky is clearest on cold nights."
    ],
    "blocks": [
      {
        "type": "h",
        "text": "Monday"
      },
      {
        "type": "p",
        "text": "We meet in the hall at half past nine. Rocket building starts at ten o’clock and lasts one hour. Everyone brings a packed lunch, and Zayn always brings jam sandwiches."
      },
      {
        "type": "h",
        "text": "Wednesday"
      },
      {
        "type": "p",
        "text": "Mr Bell leads a planet quiz at half past nine. After lunch, the club walks to the park for rocket launches at two o’clock. Last year, the biggest rocket landed in a tree."
      },
      {
        "type": "h",
        "text": "Friday"
      },
      {
        "type": "p",
        "text": "Telescope night begins at seven o’clock in the playground. Parents are welcome to join. Wear warm clothes, because the sky is clearest on cold nights."
      }
    ],
    "groups": [
      {
        "label": "Key fact worth noting",
        "cards": [
          "We meet in the hall at half past nine.",
          "Rocket building starts at ten o’clock and lasts one hour.",
          "Mr Bell leads a planet quiz at half past nine.",
          "Telescope night begins at seven o’clock in the playground."
        ]
      },
      {
        "label": "Detail that can be left out",
        "cards": [
          "Everyone brings a packed lunch, and Zayn always brings jam sandwiches.",
          "Last year, the biggest rocket landed in a tree.",
          "Parents are welcome to join.",
          "Wear warm clothes, because the sky is clearest on cold nights."
        ]
      }
    ],
    "sortPrompt": "Sort the sentences. Which are key facts about days and times, and which can be left out of the notes?",
    "sortContext": "Imagine you are noting down the events and start times of Space Club week.",
    "questions": [
      {
        "prompt": "What time does telescope night begin?",
        "answer": "Seven o’clock",
        "wrong": [
          "Half past nine",
          "Two o’clock"
        ],
        "evidencePrompt": "Tap the sentence that tells when telescope night begins.",
        "evidence": "Telescope night begins at seven o’clock in the playground."
      },
      {
        "prompt": "Which heading would you look under to find the planet quiz?",
        "answer": "Wednesday",
        "wrong": [
          "Monday",
          "Friday"
        ],
        "evidencePrompt": "Tap the heading you would look under to find the planet quiz.",
        "evidence": "Wednesday"
      },
      {
        "prompt": "Which is the best note for Monday’s rocket building?",
        "answer": "Mon: rockets, 10.00–11.00",
        "wrong": [
          "Mon: rockets, 10.00 for two hours",
          "Mon: rockets, 9.30–10.30"
        ],
        "evidencePrompt": "Tap the sentence that tells how long rocket building lasts.",
        "evidence": "Rocket building starts at ten o’clock and lasts one hour."
      },
      {
        "prompt": "Where will the rockets be launched?",
        "answer": "In the park",
        "wrong": [
          "In the hall",
          "In the playground"
        ],
        "evidencePrompt": "Tap the sentence that says where the rockets will be launched.",
        "evidence": "After lunch, the club walks to the park for rocket launches at two o’clock."
      }
    ]
  }
];
export function buildRetrievingAndRecordingInformationQuestions(level, rng) {
  return readingQuestions(BANK, RULE, level, rng);
}
