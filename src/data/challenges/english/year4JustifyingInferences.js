import { readingQuestions } from "./year4Reading.js";
/** Original texts for Justifying Inferences; source URLs on the traditional retellings. */
export const RULE = "An inference (an idea worked out from clues) needs evidence from the text.";
export const BANK = [
  {
    "title": "Behind the Curtain",
    "short": "Leo stood beside the stage with his script held tightly in both hands. He checked the opening line for the third time. Amara quietly offered to practise with him. Leo nodded and let out a long breath.",
    "intro": [
      {
        "prompt": "How does Leo probably feel at first?",
        "answer": "Nervous",
        "wrong": [
          "Bored",
          "Angry"
        ]
      },
      {
        "prompt": "Why does Amara offer to practise?",
        "answer": "To help Leo feel ready",
        "wrong": [
          "To stop the play",
          "To hide the script"
        ]
      },
      {
        "prompt": "Which detail suggests worry?",
        "answer": "He checks the opening line repeatedly.",
        "wrong": [
          "He waves to the audience.",
          "He puts the script away."
        ]
      }
    ],
    "evidence": [
      "Leo stood beside the stage with his script held tightly in both hands.",
      "He checked the opening line for the third time.",
      "Amara quietly offered to practise with him.",
      "Leo nodded and let out a long breath.",
      "They spoke the lines together behind the curtain.",
      "When Leo forgot a word, Amara waited instead of answering for him.",
      "By the time the curtain rose, Leo’s hands had stopped shaking.",
      "He walked to the front of the stage and spoke clearly to the audience."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Leo stood beside the stage with his script held tightly in both hands. He checked the opening line for the third time. Amara quietly offered to practise with him. Leo nodded and let out a long breath."
      },
      {
        "type": "p",
        "text": "They spoke the lines together behind the curtain. When Leo forgot a word, Amara waited instead of answering for him. By the time the curtain rose, Leo’s hands had stopped shaking. He walked to the front of the stage and spoke clearly to the audience."
      }
    ],
    "groups": [
      {
        "label": "Signs of worry",
        "cards": [
          "Leo stood beside the stage with his script held tightly in both hands.",
          "He checked the opening line for the third time.",
          "Amara quietly offered to practise with him.",
          "Leo nodded and let out a long breath."
        ]
      },
      {
        "label": "Support and growing confidence",
        "cards": [
          "They spoke the lines together behind the curtain.",
          "When Leo forgot a word, Amara waited instead of answering for him.",
          "By the time the curtain rose, Leo’s hands had stopped shaking.",
          "He walked to the front of the stage and spoke clearly to the audience."
        ]
      }
    ],
    "sortPrompt": "Sort the details under the paragraph theme they support.",
    "questions": [
      {
        "prompt": "Which inference is best supported by the ending?",
        "answer": "Practising with Amara helped Leo become more confident.",
        "wrong": [
          "Leo decided not to perform.",
          "Amara wanted Leo to fail."
        ],
        "evidence": "By the time the curtain rose, Leo’s hands had stopped shaking.",
        "evidencePrompt": "Tap the sentence showing a physical sign that Leo is calmer."
      },
      {
        "prompt": "Why might Amara wait when Leo forgets a word?",
        "answer": "She wants him to find the word himself.",
        "wrong": [
          "She cannot hear him.",
          "She wants the curtain to fall."
        ],
        "evidence": "When Leo forgot a word, Amara waited instead of answering for him.",
        "evidencePrompt": "Tap the sentence showing that Amara gives Leo time."
      },
      {
        "prompt": "What suggests Leo is worried at the start?",
        "answer": "He grips the script tightly and checks it repeatedly.",
        "wrong": [
          "He speaks clearly to the audience.",
          "He walks to the front of the stage."
        ],
        "evidence": "Leo stood beside the stage with his script held tightly in both hands.",
        "evidencePrompt": "Tap the sentence showing Leo gripping something tightly."
      },
      {
        "prompt": "What suggests he is ready at the end?",
        "answer": "He goes on stage and speaks clearly.",
        "wrong": [
          "He leaves before the play starts.",
          "He tears up the script."
        ],
        "evidence": "He walked to the front of the stage and spoke clearly to the audience.",
        "evidencePrompt": "Tap the sentence showing Leo performing successfully."
      }
    ]
  },
  {
    "title": "The Purse",
    "short": "Ellie found a purse beneath the park bench. She opened it just enough to see a name on a card. Biscuit tugged at his lead, but Ellie stayed by the bench. She called her mum and asked what to do.",
    "intro": [
      {
        "prompt": "Why does Ellie look at the card?",
        "answer": "To find out who owns the purse",
        "wrong": [
          "To choose a game",
          "To hide the purse"
        ]
      },
      {
        "prompt": "What suggests Ellie wants to do the right thing?",
        "answer": "She asks Mum what to do.",
        "wrong": [
          "She throws the card away.",
          "She takes the money."
        ]
      },
      {
        "prompt": "Why does Biscuit tug the lead?",
        "answer": "He probably wants to keep walking.",
        "wrong": [
          "He wants to read the card.",
          "He works in the park office."
        ]
      }
    ],
    "evidence": [
      "Ellie found a purse beneath the park bench.",
      "She opened it just enough to see a name on a card.",
      "Biscuit tugged at his lead, but Ellie stayed by the bench.",
      "She called her mum and asked what to do.",
      "Mum helped her take the purse to the park office.",
      "An older woman arrived there, searching anxiously through her empty bag.",
      "When Ellie handed over the purse, the woman’s shoulders relaxed.",
      "Ellie smiled as she and Biscuit set off again, even though their walk had been delayed."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Ellie found a purse beneath the park bench. She opened it just enough to see a name on a card. Biscuit tugged at his lead, but Ellie stayed by the bench. She called her mum and asked what to do."
      },
      {
        "type": "p",
        "text": "Mum helped her take the purse to the park office. An older woman arrived there, searching anxiously through her empty bag. When Ellie handed over the purse, the woman’s shoulders relaxed. Ellie smiled as she and Biscuit set off again, even though their walk had been delayed."
      }
    ],
    "groups": [
      {
        "label": "Finding and deciding",
        "cards": [
          "Ellie found a purse beneath the park bench.",
          "She opened it just enough to see a name on a card.",
          "Biscuit tugged at his lead, but Ellie stayed by the bench.",
          "She called her mum and asked what to do."
        ]
      },
      {
        "label": "Returning and reacting",
        "cards": [
          "Mum helped her take the purse to the park office.",
          "An older woman arrived there, searching anxiously through her empty bag.",
          "When Ellie handed over the purse, the woman’s shoulders relaxed.",
          "Ellie smiled as she and Biscuit set off again, even though their walk had been delayed."
        ]
      }
    ],
    "sortPrompt": "Sort the details under the paragraph theme they support.",
    "questions": [
      {
        "prompt": "What does Ellie’s behaviour suggest?",
        "answer": "She values returning the purse more than finishing her walk quickly.",
        "wrong": [
          "She dislikes the park office.",
          "She wants to keep the purse."
        ],
        "evidence": "Ellie smiled as she and Biscuit set off again, even though their walk had been delayed.",
        "evidencePrompt": "Tap the sentence showing Ellie is happy despite the delay."
      },
      {
        "prompt": "How does the woman probably feel after the purse is returned?",
        "answer": "Relieved",
        "wrong": [
          "Jealous",
          "Bored"
        ],
        "evidence": "When Ellie handed over the purse, the woman’s shoulders relaxed.",
        "evidencePrompt": "Tap the sentence giving a physical sign of relief."
      },
      {
        "prompt": "What suggests the woman has lost something important?",
        "answer": "She searches her empty bag anxiously.",
        "wrong": [
          "She reads a book calmly.",
          "She walks Biscuit."
        ],
        "evidence": "An older woman arrived there, searching anxiously through her empty bag.",
        "evidencePrompt": "Tap the sentence showing the woman searching anxiously."
      },
      {
        "prompt": "What shows Ellie seeks advice before acting?",
        "answer": "She calls Mum to ask what to do.",
        "wrong": [
          "She runs straight home.",
          "She follows Biscuit without stopping."
        ],
        "evidence": "She called her mum and asked what to do.",
        "evidencePrompt": "Tap the sentence showing Ellie asking for advice."
      }
    ]
  },
  {
    "title": "The Model Bridge",
    "short": "Zayn saw Priya’s model bridge bend in the middle. Priya put down her ruler and stared at the bent cardboard. Zayn pushed his own finished model aside. He asked whether she wanted another pair of hands.",
    "intro": [
      {
        "prompt": "Why does Zayn move his model aside?",
        "answer": "To make time to help Priya",
        "wrong": [
          "To break his own bridge",
          "To hide the ruler"
        ]
      },
      {
        "prompt": "How does Priya probably feel when her bridge bends?",
        "answer": "Disappointed",
        "wrong": [
          "Proud of the damage",
          "Amused by a joke"
        ]
      },
      {
        "prompt": "What shows Zayn offers help politely?",
        "answer": "He asks whether she wants help.",
        "wrong": [
          "He grabs the bridge.",
          "He blames her."
        ]
      }
    ],
    "evidence": [
      "Zayn saw Priya’s model bridge bend in the middle.",
      "Priya put down her ruler and stared at the bent cardboard.",
      "Zayn pushed his own finished model aside.",
      "He asked whether she wanted another pair of hands.",
      "Together they added a support under the weakest part.",
      "Priya tested the bridge with a toy car, and this time it stayed level.",
      "She grinned and slid the car across twice more.",
      "Zayn returned to his own desk only after Priya had packed the bridge safely in its box."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Zayn saw Priya’s model bridge bend in the middle. Priya put down her ruler and stared at the bent cardboard. Zayn pushed his own finished model aside. He asked whether she wanted another pair of hands."
      },
      {
        "type": "p",
        "text": "Together they added a support under the weakest part. Priya tested the bridge with a toy car, and this time it stayed level. She grinned and slid the car across twice more. Zayn returned to his own desk only after Priya had packed the bridge safely in its box."
      }
    ],
    "groups": [
      {
        "label": "A problem and an offer",
        "cards": [
          "Zayn saw Priya’s model bridge bend in the middle.",
          "Priya put down her ruler and stared at the bent cardboard.",
          "Zayn pushed his own finished model aside.",
          "He asked whether she wanted another pair of hands."
        ]
      },
      {
        "label": "Repair and successful testing",
        "cards": [
          "Together they added a support under the weakest part.",
          "Priya tested the bridge with a toy car, and this time it stayed level.",
          "She grinned and slid the car across twice more.",
          "Zayn returned to his own desk only after Priya had packed the bridge safely in its box."
        ]
      }
    ],
    "sortPrompt": "Sort the details under the paragraph theme they support.",
    "questions": [
      {
        "prompt": "What does Zayn’s behaviour suggest about him?",
        "answer": "He is considerate and stays until the job is safely finished.",
        "wrong": [
          "He only wants to finish his own work.",
          "He enjoys breaking models."
        ],
        "evidence": "Zayn returned to his own desk only after Priya had packed the bridge safely in its box.",
        "evidencePrompt": "Tap the sentence showing Zayn does not leave until the bridge is safe."
      },
      {
        "prompt": "What suggests Priya is pleased with the repair?",
        "answer": "She grins and tests the bridge again.",
        "wrong": [
          "She stares at bent cardboard.",
          "She puts her ruler down."
        ],
        "evidence": "She grinned and slid the car across twice more.",
        "evidencePrompt": "Tap the sentence showing Priya’s happy reaction."
      },
      {
        "prompt": "Why did they add a support?",
        "answer": "To strengthen the part that had bent",
        "wrong": [
          "To make the bridge collapse",
          "To hide the toy car"
        ],
        "evidence": "Together they added a support under the weakest part.",
        "evidencePrompt": "Tap the sentence showing where the new support went."
      },
      {
        "prompt": "Which action best supports the idea that Zayn wants to help?",
        "answer": "He puts his own work aside.",
        "wrong": [
          "He packs his own bridge.",
          "He takes Priya’s ruler."
        ],
        "evidence": "Zayn pushed his own finished model aside.",
        "evidencePrompt": "Tap the sentence showing Zayn setting aside his own work."
      }
    ]
  }
];
export function buildJustifyingInferencesQuestions(level, rng) {
  return readingQuestions(BANK, RULE, level, rng);
}
