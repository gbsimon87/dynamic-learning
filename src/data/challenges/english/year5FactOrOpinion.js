import { readingQuestions } from "./year5Practice.js";
/** Fact or Opinion: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "A fact (a statement that can be checked) is different from an opinion (what someone thinks or feels). Words such as best, should and I think often show an opinion.";
export const BANK = [
  {
    "title": "Class Trip to Marsh Farm",
    "short": "The new pool opens on 1 July and has six lanes. Swimming there is brilliant. Lessons cost five pounds a week.",
    "intro": [
      {
        "prompt": "Which sentence is an opinion?",
        "answer": "Swimming there is brilliant.",
        "wrong": [
          "The new pool opens on 1 July and has six lanes.",
          "Lessons cost five pounds a week."
        ]
      },
      {
        "prompt": "Which word shows that a sentence is an opinion?",
        "answer": "brilliant",
        "wrong": [
          "six",
          "July"
        ]
      },
      {
        "prompt": "Which statement can be checked?",
        "answer": "The pool has six lanes.",
        "wrong": [
          "Swimming there is brilliant.",
          "Everyone will enjoy the lessons."
        ]
      }
    ],
    "evidence": [
      "Marsh Farm is ten miles from our school.",
      "The trip is on Friday 14 June.",
      "Coaches leave at nine o’clock.",
      "Children must bring a packed lunch.",
      "The farm has forty cows, two ponies and a flock of sheep.",
      "Children can feed the goats at half past ten.",
      "Visiting the lambs is the most fun thing to do.",
      "The ice cream is the tastiest in the county.",
      "Everyone will love the tractor ride.",
      "The barn is much too smelly for a picnic."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Marsh Farm is ten miles from our school. The trip is on Friday 14 June. Coaches leave at nine o’clock. Children must bring a packed lunch."
      },
      {
        "type": "p",
        "text": "The farm has forty cows, two ponies and a flock of sheep. Children can feed the goats at half past ten. Visiting the lambs is the most fun thing to do. The ice cream is the tastiest in the county. Everyone will love the tractor ride. The barn is much too smelly for a picnic."
      }
    ],
    "groups": [
      {
        "label": "Fact",
        "cards": [
          "Marsh Farm is ten miles from our school.",
          "The trip is on Friday 14 June.",
          "Coaches leave at nine o’clock.",
          "The farm has forty cows, two ponies and a flock of sheep."
        ]
      },
      {
        "label": "Opinion",
        "cards": [
          "Visiting the lambs is the most fun thing to do.",
          "The ice cream is the tastiest in the county.",
          "Everyone will love the tractor ride.",
          "The barn is much too smelly for a picnic."
        ]
      }
    ],
    "sortPrompt": "Sort the sentences from the leaflet. Can each one be checked (a fact), or is it what someone thinks (an opinion)?",
    "questions": [
      {
        "prompt": "Which sentence is an opinion?",
        "answer": "Visiting the lambs is the most fun thing to do.",
        "wrong": [
          "The farm has forty cows, two ponies and a flock of sheep.",
          "Coaches leave at nine o’clock."
        ],
        "evidencePrompt": "Tap the opinion about the lambs.",
        "evidence": "Visiting the lambs is the most fun thing to do."
      },
      {
        "prompt": "Which word shows the writer’s opinion in “The ice cream is the tastiest in the county”?",
        "answer": "tastiest",
        "wrong": [
          "county",
          "cream"
        ],
        "evidencePrompt": "Tap the opinion about the ice cream.",
        "evidence": "The ice cream is the tastiest in the county."
      },
      {
        "prompt": "Can “Coaches leave at nine o’clock” be checked?",
        "answer": "Yes, by looking at the trip timetable",
        "wrong": [
          "No, because it is what someone thinks",
          "No, because it mentions a time"
        ],
        "evidencePrompt": "Tap the fact about when the coaches leave.",
        "evidence": "Coaches leave at nine o’clock."
      },
      {
        "prompt": "Why is “Everyone will love the tractor ride” an opinion?",
        "answer": "It says how people will feel, which cannot be checked.",
        "wrong": [
          "It is about a tractor.",
          "It is a short sentence."
        ],
        "evidencePrompt": "Tap the sentence that says what everyone will think of the tractor ride.",
        "evidence": "Everyone will love the tractor ride."
      }
    ]
  },
  {
    "title": "Game Review: Comet Dash",
    "short": "Zayn’s football boots are blue. He thinks they are the coolest boots in school. He bought them last week for forty pounds.",
    "intro": [
      {
        "prompt": "Which sentence is an opinion?",
        "answer": "He thinks they are the coolest boots in school.",
        "wrong": [
          "Zayn’s football boots are blue.",
          "He bought them last week for forty pounds."
        ]
      },
      {
        "prompt": "Which word shows an opinion?",
        "answer": "coolest",
        "wrong": [
          "blue",
          "forty"
        ]
      },
      {
        "prompt": "Which statement could be checked with a receipt?",
        "answer": "He bought them last week for forty pounds.",
        "wrong": [
          "They are the coolest boots in school.",
          "Everybody wants a pair."
        ]
      }
    ],
    "evidence": [
      "Comet Dash is a racing game for one to four players.",
      "It costs twelve pounds.",
      "The game has ten levels and six different spaceships.",
      "Players earn a star for each level they finish.",
      "I think the second level is the best.",
      "The graphics are stunning.",
      "The music is far too loud and annoying.",
      "Nobody should miss this game."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Comet Dash is a racing game for one to four players. It costs twelve pounds. The game has ten levels and six different spaceships. Players earn a star for each level they finish."
      },
      {
        "type": "p",
        "text": "I think the second level is the best. The graphics are stunning. The music is far too loud and annoying. Nobody should miss this game."
      }
    ],
    "groups": [
      {
        "label": "Fact",
        "cards": [
          "Comet Dash is a racing game for one to four players.",
          "It costs twelve pounds.",
          "The game has ten levels and six different spaceships.",
          "Players earn a star for each level they finish."
        ]
      },
      {
        "label": "Opinion",
        "cards": [
          "I think the second level is the best.",
          "The graphics are stunning.",
          "The music is far too loud and annoying.",
          "Nobody should miss this game."
        ]
      }
    ],
    "sortPrompt": "Sort the sentences from the game review. Can each one be checked (a fact), or is it what the reviewer thinks (an opinion)?",
    "questions": [
      {
        "prompt": "Which sentence is a fact?",
        "answer": "The game has ten levels and six different spaceships.",
        "wrong": [
          "The music is far too loud and annoying.",
          "Nobody should miss this game."
        ],
        "evidencePrompt": "Tap the fact about the number of levels.",
        "evidence": "The game has ten levels and six different spaceships."
      },
      {
        "prompt": "Which words show that “I think the second level is the best” is an opinion?",
        "answer": "I think",
        "wrong": [
          "second level",
          "is the"
        ],
        "evidencePrompt": "Tap the sentence that begins with I think.",
        "evidence": "I think the second level is the best."
      },
      {
        "prompt": "Can “It costs twelve pounds” be checked?",
        "answer": "Yes, by looking at the price in a shop",
        "wrong": [
          "No, because it is a matter of taste",
          "No, because twelve is a big number"
        ],
        "evidencePrompt": "Tap the fact about the price.",
        "evidence": "It costs twelve pounds."
      },
      {
        "prompt": "Which sentence would another player be most likely to disagree with?",
        "answer": "The music is far too loud and annoying.",
        "wrong": [
          "It costs twelve pounds.",
          "Comet Dash is a racing game for one to four players."
        ],
        "evidencePrompt": "Tap the opinion about the music.",
        "evidence": "The music is far too loud and annoying."
      }
    ]
  },
  {
    "title": "A Letter to the Head Teacher",
    "short": "The new bus route starts on Monday and stops outside the library. The old bus was far too slow. The journey now takes twelve minutes.",
    "intro": [
      {
        "prompt": "Which sentence is an opinion?",
        "answer": "The old bus was far too slow.",
        "wrong": [
          "The new bus route starts on Monday and stops outside the library.",
          "The journey now takes twelve minutes."
        ]
      },
      {
        "prompt": "Which words show an opinion?",
        "answer": "far too slow",
        "wrong": [
          "on Monday",
          "outside the library"
        ]
      },
      {
        "prompt": "Which statement can be checked on a timetable?",
        "answer": "The journey now takes twelve minutes.",
        "wrong": [
          "The old bus was far too slow.",
          "The new route is the best idea ever."
        ]
      }
    ],
    "evidence": [
      "Dear Mrs Okoye,",
      "Our lunch break at Elm Street School lasts thirty minutes.",
      "The infants have forty minutes.",
      "Last week, Class 5 timed the lunch queue, and it took twelve minutes.",
      "That leaves only eighteen minutes to eat and play.",
      "I think lunchtime is far too short.",
      "A longer break would make everyone happier.",
      "The playground is the best place to make friends, so we should have more time there.",
      "It is unfair that the infants get longer than we do.",
      "Please would you consider adding ten minutes?",
      "Yours sincerely,",
      "Priya"
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Dear Mrs Okoye,"
      },
      {
        "type": "p",
        "text": "Our lunch break at Elm Street School lasts thirty minutes. The infants have forty minutes. Last week, Class 5 timed the lunch queue, and it took twelve minutes. That leaves only eighteen minutes to eat and play."
      },
      {
        "type": "p",
        "text": "I think lunchtime is far too short. A longer break would make everyone happier. The playground is the best place to make friends, so we should have more time there. It is unfair that the infants get longer than we do."
      },
      {
        "type": "p",
        "text": "Please would you consider adding ten minutes?"
      },
      {
        "type": "p",
        "text": "Yours sincerely, Priya"
      }
    ],
    "groups": [
      {
        "label": "Fact",
        "cards": [
          "Our lunch break at Elm Street School lasts thirty minutes.",
          "The infants have forty minutes.",
          "Last week, Class 5 timed the lunch queue, and it took twelve minutes.",
          "That leaves only eighteen minutes to eat and play."
        ]
      },
      {
        "label": "Opinion",
        "cards": [
          "I think lunchtime is far too short.",
          "A longer break would make everyone happier.",
          "The playground is the best place to make friends, so we should have more time there.",
          "It is unfair that the infants get longer than we do."
        ]
      }
    ],
    "sortPrompt": "Sort the sentences from the letter. Can each one be checked (a fact), or is it what Priya thinks (an opinion)?",
    "questions": [
      {
        "prompt": "Which sentence is a fact the class could check with a stopwatch?",
        "answer": "Last week, Class 5 timed the lunch queue, and it took twelve minutes.",
        "wrong": [
          "I think lunchtime is far too short.",
          "A longer break would make everyone happier."
        ],
        "evidencePrompt": "Tap the fact that tells how long the lunch queue took.",
        "evidence": "Last week, Class 5 timed the lunch queue, and it took twelve minutes."
      },
      {
        "prompt": "Which word shows opinion in “The playground is the best place to make friends”?",
        "answer": "best",
        "wrong": [
          "playground",
          "make"
        ],
        "evidencePrompt": "Tap the opinion about the playground.",
        "evidence": "The playground is the best place to make friends, so we should have more time there."
      },
      {
        "prompt": "Why is “It is unfair that the infants get longer than we do” an opinion?",
        "answer": "Whether something is fair is a judgement, and people can disagree.",
        "wrong": [
          "It is about the infants.",
          "It is written as a question."
        ],
        "evidencePrompt": "Tap the sentence that says it is unfair.",
        "evidence": "It is unfair that the infants get longer than we do."
      },
      {
        "prompt": "What does Priya ask Mrs Okoye to do?",
        "answer": "Add ten minutes to lunchtime",
        "wrong": [
          "Shorten the lunch queue",
          "Give the infants less time"
        ],
        "evidencePrompt": "Tap the sentence that asks Mrs Okoye for something.",
        "evidence": "Please would you consider adding ten minutes?"
      }
    ]
  }
];
export function buildFactOrOpinionQuestions(level, rng) {
  return readingQuestions(BANK, RULE, level, rng);
}
