import { readingQuestions } from "./year4Reading.js";
/** Original texts for Comparing Forms of Poetry; source URLs on the traditional retellings. */
export const RULE = "A narrative poem tells events; free verse has no fixed rhyme pattern. A poem can be narrative and rhyming.";
export const BANK = [
  {
    "title": "The Kite and The Sky",
    "short": "Leo ran across the park, / His kite rose high before the dark. / He held the string and watched it fly, / A dancing dot against the sky.",
    "intro": [
      {
        "prompt": "Which description matches the first poem?",
        "answer": "rhyming narrative",
        "wrong": [
          "free verse",
          "a set of instructions"
        ]
      },
      {
        "prompt": "How is this text presented?",
        "answer": "In separate poem lines",
        "wrong": [
          "As a contents page",
          "As numbered instructions"
        ]
      },
      {
        "prompt": "Which statement is true of its subject?",
        "answer": "It describes a kite in the sky",
        "wrong": [
          "It explains how to cook soup.",
          "It gives a shopping list."
        ]
      }
    ],
    "evidence": [
      "Leo ran across the park,",
      "His kite rose high before the dark.",
      "He held the string and watched it fly,",
      "A dancing dot against the sky.",
      "Amara looks upwards.",
      "Clouds unfold slowly",
      "above the quiet field.",
      "The sky has room for every thought."
    ],
    "blocks": [
      {
        "type": "h",
        "text": "Poem one"
      },
      {
        "type": "line",
        "text": "Leo ran across the park,"
      },
      {
        "type": "line",
        "text": "His kite rose high before the dark."
      },
      {
        "type": "line",
        "text": "He held the string and watched it fly,"
      },
      {
        "type": "line",
        "text": "A dancing dot against the sky."
      },
      {
        "type": "h",
        "text": "Poem two"
      },
      {
        "type": "line",
        "text": "Amara looks upwards."
      },
      {
        "type": "line",
        "text": "Clouds unfold slowly"
      },
      {
        "type": "line",
        "text": "above the quiet field."
      },
      {
        "type": "line",
        "text": "The sky has room for every thought."
      }
    ],
    "groups": [
      {
        "label": "Poem one",
        "cards": [
          "Leo ran across the park,",
          "His kite rose high before the dark.",
          "He held the string and watched it fly,",
          "A dancing dot against the sky."
        ]
      },
      {
        "label": "Poem two",
        "cards": [
          "Amara looks upwards.",
          "Clouds unfold slowly",
          "above the quiet field.",
          "The sky has room for every thought."
        ]
      }
    ],
    "sortPrompt": "Sort the lines into the poem they belong to.",
    "sortContext": "Poem one: Leo ran across the park, / His kite rose high before the dark. / He held the string and watched it fly, / A dancing dot against the sky.\nPoem two: Amara looks upwards. / Clouds unfold slowly / above the quiet field. / The sky has room for every thought.",
    "questions": [
      {
        "prompt": "Which form describes the second poem?",
        "answer": "free verse",
        "wrong": [
          "rhyming narrative",
          "instructions"
        ],
        "evidence": "Amara looks upwards.",
        "evidencePrompt": "The first four lines are poem one; the last four are poem two. Tap the opening line of the second poem."
      },
      {
        "prompt": "What presentation do both poems share?",
        "answer": "They are arranged in separate lines.",
        "wrong": [
          "They are numbered making steps.",
          "They are alphabetical indexes."
        ],
        "evidence": "Leo ran across the park,",
        "evidencePrompt": "The first four lines are poem one; the last four are poem two. Tap the opening line of the first poem."
      },
      {
        "prompt": "Which description best compares them?",
        "answer": "The first rhymes and tells an event; the second is free verse.",
        "wrong": [
          "Both are letters asking for tickets.",
          "Both give rules for a game."
        ],
        "evidence": "The sky has room for every thought.",
        "evidencePrompt": "The first four lines are poem one; the last four are poem two. Tap the closing line of the second poem."
      },
      {
        "prompt": "Which statement best describes narrative poetry?",
        "answer": "It tells a sequence of events.",
        "wrong": [
          "It must be a materials list.",
          "It cannot include a character."
        ],
        "evidence": "A dancing dot against the sky.",
        "evidencePrompt": "The first four lines are poem one; the last four are poem two. Tap the line showing the kite being watched in flight."
      }
    ]
  },
  {
    "title": "The Seed and The Rain",
    "short": "Priya planted a tiny seed. / She watered it beside the door. / A green shoot lifted through the soil. / She smiled and planted one seed more.",
    "intro": [
      {
        "prompt": "Which description matches the first poem?",
        "answer": "narrative poem",
        "wrong": [
          "free verse",
          "a set of instructions"
        ]
      },
      {
        "prompt": "How is this text presented?",
        "answer": "In separate poem lines",
        "wrong": [
          "As a contents page",
          "As numbered instructions"
        ]
      },
      {
        "prompt": "Which statement is true of its subject?",
        "answer": "It describes a seed growing",
        "wrong": [
          "It explains how to cook soup.",
          "It gives a shopping list."
        ]
      }
    ],
    "evidence": [
      "Priya planted a tiny seed.",
      "She watered it beside the door.",
      "A green shoot lifted through the soil.",
      "She smiled and planted one seed more.",
      "Rain rests on the window.",
      "Zayn traces its wandering paths.",
      "Each bead holds a little light.",
      "The afternoon listens."
    ],
    "blocks": [
      {
        "type": "h",
        "text": "Poem one"
      },
      {
        "type": "line",
        "text": "Priya planted a tiny seed."
      },
      {
        "type": "line",
        "text": "She watered it beside the door."
      },
      {
        "type": "line",
        "text": "A green shoot lifted through the soil."
      },
      {
        "type": "line",
        "text": "She smiled and planted one seed more."
      },
      {
        "type": "h",
        "text": "Poem two"
      },
      {
        "type": "line",
        "text": "Rain rests on the window."
      },
      {
        "type": "line",
        "text": "Zayn traces its wandering paths."
      },
      {
        "type": "line",
        "text": "Each bead holds a little light."
      },
      {
        "type": "line",
        "text": "The afternoon listens."
      }
    ],
    "groups": [
      {
        "label": "Poem one",
        "cards": [
          "Priya planted a tiny seed.",
          "She watered it beside the door.",
          "A green shoot lifted through the soil.",
          "She smiled and planted one seed more."
        ]
      },
      {
        "label": "Poem two",
        "cards": [
          "Rain rests on the window.",
          "Zayn traces its wandering paths.",
          "Each bead holds a little light.",
          "The afternoon listens."
        ]
      }
    ],
    "sortPrompt": "Sort the lines into the poem they belong to.",
    "sortContext": "Poem one: Priya planted a tiny seed. / She watered it beside the door. / A green shoot lifted through the soil. / She smiled and planted one seed more.\nPoem two: Rain rests on the window. / Zayn traces its wandering paths. / Each bead holds a little light. / The afternoon listens.",
    "questions": [
      {
        "prompt": "Which form describes the second poem?",
        "answer": "free verse",
        "wrong": [
          "narrative poem",
          "instructions"
        ],
        "evidence": "Rain rests on the window.",
        "evidencePrompt": "The first four lines are poem one; the last four are poem two. Tap the opening line of the second poem."
      },
      {
        "prompt": "What presentation do both poems share?",
        "answer": "They are arranged in separate lines.",
        "wrong": [
          "They are numbered making steps.",
          "They are alphabetical indexes."
        ],
        "evidence": "Priya planted a tiny seed.",
        "evidencePrompt": "The first four lines are poem one; the last four are poem two. Tap the opening line of the first poem."
      },
      {
        "prompt": "Which description best compares them?",
        "answer": "The first tells events in order; the second captures a rainy moment in free verse.",
        "wrong": [
          "Both are letters asking for tickets.",
          "Both give rules for a game."
        ],
        "evidence": "The afternoon listens.",
        "evidencePrompt": "The first four lines are poem one; the last four are poem two. Tap the closing line of the second poem."
      },
      {
        "prompt": "Which statement best describes narrative poetry?",
        "answer": "It tells a sequence of events.",
        "wrong": [
          "It must be a materials list.",
          "It cannot include a character."
        ],
        "evidence": "She smiled and planted one seed more.",
        "evidencePrompt": "The first four lines are poem one; the last four are poem two. Tap the line showing the next seed being planted."
      }
    ]
  },
  {
    "title": "The Stream and The Journey",
    "short": "The stream runs bright beside the green, / Its silver stones are smooth and clean. / It sings a tune beneath the tree, / Then carries on towards the sea.",
    "intro": [
      {
        "prompt": "Which description matches the first poem?",
        "answer": "rhyming poem",
        "wrong": [
          "narrative poem",
          "a set of instructions"
        ]
      },
      {
        "prompt": "How is this text presented?",
        "answer": "In separate poem lines",
        "wrong": [
          "As a contents page",
          "As numbered instructions"
        ]
      },
      {
        "prompt": "Which statement is true of its subject?",
        "answer": "It describes a stream",
        "wrong": [
          "It explains how to cook soup.",
          "It gives a shopping list."
        ]
      }
    ],
    "evidence": [
      "The stream runs bright beside the green,",
      "Its silver stones are smooth and clean.",
      "It sings a tune beneath the tree,",
      "Then carries on towards the sea.",
      "Ellie packed a bag at dawn.",
      "She walked beside the winding stream.",
      "At noon she found the wooden bridge.",
      "She crossed and reached her grandma’s home."
    ],
    "blocks": [
      {
        "type": "h",
        "text": "Poem one"
      },
      {
        "type": "line",
        "text": "The stream runs bright beside the green,"
      },
      {
        "type": "line",
        "text": "Its silver stones are smooth and clean."
      },
      {
        "type": "line",
        "text": "It sings a tune beneath the tree,"
      },
      {
        "type": "line",
        "text": "Then carries on towards the sea."
      },
      {
        "type": "h",
        "text": "Poem two"
      },
      {
        "type": "line",
        "text": "Ellie packed a bag at dawn."
      },
      {
        "type": "line",
        "text": "She walked beside the winding stream."
      },
      {
        "type": "line",
        "text": "At noon she found the wooden bridge."
      },
      {
        "type": "line",
        "text": "She crossed and reached her grandma’s home."
      }
    ],
    "groups": [
      {
        "label": "Poem one",
        "cards": [
          "The stream runs bright beside the green,",
          "Its silver stones are smooth and clean.",
          "It sings a tune beneath the tree,",
          "Then carries on towards the sea."
        ]
      },
      {
        "label": "Poem two",
        "cards": [
          "Ellie packed a bag at dawn.",
          "She walked beside the winding stream.",
          "At noon she found the wooden bridge.",
          "She crossed and reached her grandma’s home."
        ]
      }
    ],
    "sortPrompt": "Sort the lines into the poem they belong to.",
    "sortContext": "Poem one: The stream runs bright beside the green, / Its silver stones are smooth and clean. / It sings a tune beneath the tree, / Then carries on towards the sea.\nPoem two: Ellie packed a bag at dawn. / She walked beside the winding stream. / At noon she found the wooden bridge. / She crossed and reached her grandma’s home.",
    "questions": [
      {
        "prompt": "Which form describes the second poem?",
        "answer": "narrative poem",
        "wrong": [
          "rhyming poem",
          "instructions"
        ],
        "evidence": "Ellie packed a bag at dawn.",
        "evidencePrompt": "The first four lines are poem one; the last four are poem two. Tap the opening line of the second poem."
      },
      {
        "prompt": "What presentation do both poems share?",
        "answer": "They are arranged in separate lines.",
        "wrong": [
          "They are numbered making steps.",
          "They are alphabetical indexes."
        ],
        "evidence": "The stream runs bright beside the green,",
        "evidencePrompt": "The first four lines are poem one; the last four are poem two. Tap the opening line of the first poem."
      },
      {
        "prompt": "Which description best compares them?",
        "answer": "The first describes a stream in rhyming lines; the second tells a journey.",
        "wrong": [
          "Both are letters asking for tickets.",
          "Both give rules for a game."
        ],
        "evidence": "She crossed and reached her grandma’s home.",
        "evidencePrompt": "The first four lines are poem one; the last four are poem two. Tap the closing line of the second poem."
      },
      {
        "prompt": "Which statement best describes narrative poetry?",
        "answer": "It tells a sequence of events.",
        "wrong": [
          "It must be a materials list.",
          "It cannot include a character."
        ],
        "evidence": "At noon she found the wooden bridge.",
        "evidencePrompt": "The first four lines are poem one; the last four are poem two. Tap the line showing Ellie finding a bridge."
      }
    ]
  }
];
export function buildComparingFormsOfPoetryQuestions(level, rng) {
  return readingQuestions(BANK, RULE, level, rng);
}
