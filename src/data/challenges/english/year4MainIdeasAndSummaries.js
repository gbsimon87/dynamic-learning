import { readingQuestions } from "./year4Reading.js";
/** Original texts for Main Ideas and Summaries; source URLs on the traditional retellings. */
export const RULE = "A main idea is what a paragraph is mostly about. A summary keeps the key ideas.";
export const BANK = [
  {
    "title": "A Garden for Everyone",
    "short": "Amara and Leo found the school garden full of weeds. They pulled out the weeds and loosened the soil. Priya brought seeds in little paper packets. The children planted the seeds in neat rows.",
    "intro": [
      {
        "prompt": "What is the main idea of this extract?",
        "answer": "The children prepare and plant a garden.",
        "wrong": [
          "The children hold a party.",
          "The children build a playground."
        ]
      },
      {
        "prompt": "Which detail belongs in a summary of their preparation?",
        "answer": "They removed weeds and loosened the soil.",
        "wrong": [
          "They picked ripe beans.",
          "They painted the school gate."
        ]
      },
      {
        "prompt": "Which heading fits this extract?",
        "answer": "Starting the garden",
        "wrong": [
          "Harvest time",
          "A football match"
        ]
      }
    ],
    "evidence": [
      "Amara and Leo found the school garden full of weeds.",
      "They pulled out the weeds and loosened the soil.",
      "Priya brought seeds in little paper packets.",
      "The children planted the seeds in neat rows.",
      "For the next month, Zayn watered the seedlings before lessons.",
      "Ellie made labels so everyone could recognise the plants.",
      "When the beans grew tall, the children tied them to canes.",
      "By summer, the empty patch had become a garden that the whole class could enjoy."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Amara and Leo found the school garden full of weeds. They pulled out the weeds and loosened the soil. Priya brought seeds in little paper packets. The children planted the seeds in neat rows."
      },
      {
        "type": "p",
        "text": "For the next month, Zayn watered the seedlings before lessons. Ellie made labels so everyone could recognise the plants. When the beans grew tall, the children tied them to canes. By summer, the empty patch had become a garden that the whole class could enjoy."
      }
    ],
    "groups": [
      {
        "label": "Preparing and planting",
        "cards": [
          "Amara and Leo found the school garden full of weeds.",
          "They pulled out the weeds and loosened the soil.",
          "Priya brought seeds in little paper packets.",
          "The children planted the seeds in neat rows."
        ]
      },
      {
        "label": "Caring for the growing plants",
        "cards": [
          "For the next month, Zayn watered the seedlings before lessons.",
          "Ellie made labels so everyone could recognise the plants.",
          "When the beans grew tall, the children tied them to canes.",
          "By summer, the empty patch had become a garden that the whole class could enjoy."
        ]
      }
    ],
    "sortPrompt": "Sort the details under the paragraph theme they support.",
    "questions": [
      {
        "prompt": "Which summary covers both paragraphs?",
        "answer": "The children planted a garden and cared for it as it grew.",
        "wrong": [
          "The children found weeds but left the garden alone.",
          "The children bought vegetables from a shop."
        ],
        "evidence": "By summer, the empty patch had become a garden that the whole class could enjoy.",
        "evidencePrompt": "Tap the sentence showing the result of the whole project."
      },
      {
        "prompt": "What is the first paragraph mainly about?",
        "answer": "Preparing the ground and planting seeds",
        "wrong": [
          "Picking ripe vegetables",
          "Watering tall plants"
        ],
        "evidence": "The children planted the seeds in neat rows.",
        "evidencePrompt": "Tap the sentence showing the seeds being planted."
      },
      {
        "prompt": "What is the second paragraph mainly about?",
        "answer": "Looking after the growing plants",
        "wrong": [
          "Buying seed packets",
          "Removing the first weeds"
        ],
        "evidence": "For the next month, Zayn watered the seedlings before lessons.",
        "evidencePrompt": "Tap the sentence showing a repeated job after planting."
      },
      {
        "prompt": "Which detail could be left out of a very short summary?",
        "answer": "The seeds came in paper packets.",
        "wrong": [
          "The children planted a garden.",
          "They cared for the growing plants."
        ],
        "evidence": "Priya brought seeds in little paper packets.",
        "evidencePrompt": "Tap the sentence giving a small detail about the seed containers."
      }
    ]
  },
  {
    "title": "The Book Corner",
    "short": "Priya asked the class to collect books they no longer read. Leo made a poster asking for storybooks and information books. Amara set up a collection box by the classroom door. By Friday, the box was full.",
    "intro": [
      {
        "prompt": "What are the children doing?",
        "answer": "Collecting books for the class",
        "wrong": [
          "Selling food",
          "Building shelves"
        ]
      },
      {
        "prompt": "Which detail shows the collection went well?",
        "answer": "The box was full by Friday.",
        "wrong": [
          "The poster was blue.",
          "The door was locked."
        ]
      },
      {
        "prompt": "Which heading fits?",
        "answer": "Collecting books",
        "wrong": [
          "Reading at lunchtime",
          "Repairing covers"
        ]
      }
    ],
    "evidence": [
      "Priya asked the class to collect books they no longer read.",
      "Leo made a poster asking for storybooks and information books.",
      "Amara set up a collection box by the classroom door.",
      "By Friday, the box was full.",
      "The children sorted the books and repaired torn covers.",
      "Zayn wrote labels for the shelves in the reading corner.",
      "Ellie helped younger pupils find books they might enjoy.",
      "Soon the reading corner was busy every lunchtime."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Priya asked the class to collect books they no longer read. Leo made a poster asking for storybooks and information books. Amara set up a collection box by the classroom door. By Friday, the box was full."
      },
      {
        "type": "p",
        "text": "The children sorted the books and repaired torn covers. Zayn wrote labels for the shelves in the reading corner. Ellie helped younger pupils find books they might enjoy. Soon the reading corner was busy every lunchtime."
      }
    ],
    "groups": [
      {
        "label": "Collecting books",
        "cards": [
          "Priya asked the class to collect books they no longer read.",
          "Leo made a poster asking for storybooks and information books.",
          "Amara set up a collection box by the classroom door.",
          "By Friday, the box was full."
        ]
      },
      {
        "label": "Making the books ready for readers",
        "cards": [
          "The children sorted the books and repaired torn covers.",
          "Zayn wrote labels for the shelves in the reading corner.",
          "Ellie helped younger pupils find books they might enjoy.",
          "Soon the reading corner was busy every lunchtime."
        ]
      }
    ],
    "sortPrompt": "Sort the details under the paragraph theme they support.",
    "questions": [
      {
        "prompt": "Which summary includes both stages?",
        "answer": "The class collected books and prepared a reading corner.",
        "wrong": [
          "Priya kept all the books at home.",
          "The class stopped reading at lunchtime."
        ],
        "evidence": "Soon the reading corner was busy every lunchtime.",
        "evidencePrompt": "Tap the sentence showing the reading corner being used."
      },
      {
        "prompt": "What is the first paragraph’s main idea?",
        "answer": "Collecting books",
        "wrong": [
          "Repairing books",
          "Helping readers choose"
        ],
        "evidence": "Priya asked the class to collect books they no longer read.",
        "evidencePrompt": "Tap the sentence explaining the request to the class."
      },
      {
        "prompt": "What is the second paragraph’s main idea?",
        "answer": "Preparing and using the reading corner",
        "wrong": [
          "Asking for donations",
          "Drawing a collection poster"
        ],
        "evidence": "The children sorted the books and repaired torn covers.",
        "evidencePrompt": "Tap the sentence showing how the books were made ready."
      },
      {
        "prompt": "Which detail is least needed in a short summary?",
        "answer": "The box stood by the classroom door.",
        "wrong": [
          "Books were collected.",
          "The reading corner was used."
        ],
        "evidence": "Amara set up a collection box by the classroom door.",
        "evidencePrompt": "Tap the sentence telling us exactly where the box was placed."
      }
    ]
  },
  {
    "title": "A Safer Walk",
    "short": "Ellie wanted to make the walk to school safer. She counted cars with her mum near the busy crossing. Zayn marked the places where parked cars blocked the pavement. The children wrote down what they had noticed.",
    "intro": [
      {
        "prompt": "What is the main idea?",
        "answer": "The children investigate problems on the walk to school.",
        "wrong": [
          "The children plan a race.",
          "The children buy cars."
        ]
      },
      {
        "prompt": "What did Zayn record?",
        "answer": "Places where parked cars blocked the pavement",
        "wrong": [
          "Places selling maps",
          "Places with new houses"
        ]
      },
      {
        "prompt": "Which heading fits?",
        "answer": "Finding the problems",
        "wrong": [
          "Writing to the council",
          "Painting new markings"
        ]
      }
    ],
    "evidence": [
      "Ellie wanted to make the walk to school safer.",
      "She counted cars with her mum near the busy crossing.",
      "Zayn marked the places where parked cars blocked the pavement.",
      "The children wrote down what they had noticed.",
      "Amara helped turn the notes into a letter to the council.",
      "Priya drew a clear map of the problem places.",
      "The council agreed to paint new road markings and inspect the crossing.",
      "The children checked the changes on their next walk and shared the news with the class."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Ellie wanted to make the walk to school safer. She counted cars with her mum near the busy crossing. Zayn marked the places where parked cars blocked the pavement. The children wrote down what they had noticed."
      },
      {
        "type": "p",
        "text": "Amara helped turn the notes into a letter to the council. Priya drew a clear map of the problem places. The council agreed to paint new road markings and inspect the crossing. The children checked the changes on their next walk and shared the news with the class."
      }
    ],
    "groups": [
      {
        "label": "Finding the problems",
        "cards": [
          "Ellie wanted to make the walk to school safer.",
          "She counted cars with her mum near the busy crossing.",
          "Zayn marked the places where parked cars blocked the pavement.",
          "The children wrote down what they had noticed."
        ]
      },
      {
        "label": "Asking for and checking changes",
        "cards": [
          "Amara helped turn the notes into a letter to the council.",
          "Priya drew a clear map of the problem places.",
          "The council agreed to paint new road markings and inspect the crossing.",
          "The children checked the changes on their next walk and shared the news with the class."
        ]
      }
    ],
    "sortPrompt": "Sort the details under the paragraph theme they support.",
    "questions": [
      {
        "prompt": "Which summary covers the whole text?",
        "answer": "The children investigated road problems, asked for changes and checked the result.",
        "wrong": [
          "The council asked the children to buy cars.",
          "Ellie decided to stop walking forever."
        ],
        "evidence": "The children checked the changes on their next walk and shared the news with the class.",
        "evidencePrompt": "Tap the sentence showing that the children checked the result."
      },
      {
        "prompt": "What is the first paragraph mainly about?",
        "answer": "Observing problems on the route",
        "wrong": [
          "Painting markings",
          "Receiving a council reply"
        ],
        "evidence": "The children wrote down what they had noticed.",
        "evidencePrompt": "Tap the sentence showing the observations being recorded."
      },
      {
        "prompt": "What is the second paragraph mainly about?",
        "answer": "Using the findings to seek changes",
        "wrong": [
          "Counting cars for the first time",
          "Choosing a school uniform"
        ],
        "evidence": "Amara helped turn the notes into a letter to the council.",
        "evidencePrompt": "Tap the sentence showing the observations being used in a request."
      },
      {
        "prompt": "Which small detail could a brief summary omit?",
        "answer": "Priya drew the map.",
        "wrong": [
          "The children investigated the route.",
          "The council agreed to make changes."
        ],
        "evidence": "Priya drew a clear map of the problem places.",
        "evidencePrompt": "Tap the sentence naming who drew the map."
      }
    ]
  }
];
export function buildMainIdeasAndSummariesQuestions(level, rng) {
  return readingQuestions(BANK, RULE, level, rng);
}
