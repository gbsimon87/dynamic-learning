import { readingQuestions } from "./year4Reading.js";
/** Original texts for Themes in Stories; source URLs on the traditional retellings. */
export const RULE = "A theme (idea running through a story) is shown by choices and what happens afterwards.";
export const BANK = [
  {
    "title": "The Shiny Coin",
    "short": "Amara found a shiny coin beside the bakery. She wanted to buy a cake with it. Then she saw a younger child searching the pavement. Amara put the coin into the child’s open hand.",
    "intro": [
      {
        "prompt": "What choice does Amara make?",
        "answer": "She returns the coin.",
        "wrong": [
          "She buys the cake.",
          "She hides the coin."
        ]
      },
      {
        "prompt": "Which detail creates temptation?",
        "answer": "She wants to buy a cake.",
        "wrong": [
          "The shop is closed.",
          "Leo already has bread."
        ]
      },
      {
        "prompt": "Which theme fits the choice?",
        "answer": "Honesty",
        "wrong": [
          "Winning races",
          "Learning a musical instrument"
        ]
      }
    ],
    "evidence": [
      "Amara found a shiny coin beside the bakery.",
      "She wanted to buy a cake with it.",
      "Then she saw a younger child searching the pavement.",
      "Amara put the coin into the child’s open hand.",
      "The child explained that the coin was for bread to take home.",
      "Amara walked with the child to the shop and waited while the bread was bought.",
      "She still had no cake, but the child’s grateful smile stayed in her mind.",
      "When Leo asked why she looked happy, she told him that returning the coin had felt better than keeping it."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Amara found a shiny coin beside the bakery. She wanted to buy a cake with it. Then she saw a younger child searching the pavement. Amara put the coin into the child’s open hand."
      },
      {
        "type": "p",
        "text": "The child explained that the coin was for bread to take home. Amara walked with the child to the shop and waited while the bread was bought. She still had no cake, but the child’s grateful smile stayed in her mind. When Leo asked why she looked happy, she told him that returning the coin had felt better than keeping it."
      }
    ],
    "groups": [
      {
        "label": "Temptation and choice",
        "cards": [
          "Amara found a shiny coin beside the bakery.",
          "She wanted to buy a cake with it.",
          "Then she saw a younger child searching the pavement.",
          "Amara put the coin into the child’s open hand."
        ]
      },
      {
        "label": "Consequences of the choice",
        "cards": [
          "The child explained that the coin was for bread to take home.",
          "Amara walked with the child to the shop and waited while the bread was bought.",
          "She still had no cake, but the child’s grateful smile stayed in her mind.",
          "When Leo asked why she looked happy, she told him that returning the coin had felt better than keeping it."
        ]
      }
    ],
    "sortPrompt": "Sort the details under the paragraph theme they support.",
    "questions": [
      {
        "prompt": "Which theme runs through the story?",
        "answer": "Doing the honest thing can bring satisfaction.",
        "wrong": [
          "Always keep what you find.",
          "Never enter a bakery."
        ],
        "evidence": "When Leo asked why she looked happy, she told him that returning the coin had felt better than keeping it.",
        "evidencePrompt": "Tap the sentence showing Amara feels better after returning the coin."
      },
      {
        "prompt": "What makes Amara’s decision a meaningful choice?",
        "answer": "She gives up something she wanted.",
        "wrong": [
          "She dislikes cake.",
          "The coin is worth nothing."
        ],
        "evidence": "She wanted to buy a cake with it.",
        "evidencePrompt": "Tap the sentence showing what Amara wanted for herself."
      },
      {
        "prompt": "How does the ending support the theme?",
        "answer": "She feels happy even without buying a cake.",
        "wrong": [
          "She takes the coin back.",
          "She stops helping the child."
        ],
        "evidence": "She still had no cake, but the child’s grateful smile stayed in her mind.",
        "evidencePrompt": "Tap the sentence contrasting what Amara lacks with how she feels."
      },
      {
        "prompt": "Which action shows honesty?",
        "answer": "Returning the coin to the child who lost it",
        "wrong": [
          "Walking past the searching child",
          "Buying a cake with the coin"
        ],
        "evidence": "Amara put the coin into the child’s open hand.",
        "evidencePrompt": "Tap the sentence showing the honest action."
      }
    ]
  },
  {
    "title": "The Race",
    "short": "Leo wanted to be first across the field in the class race. Halfway round, Zayn tripped and fell. Leo stopped running and helped him stand. The other runners passed them.",
    "intro": [
      {
        "prompt": "What does Leo give up?",
        "answer": "His chance to finish first",
        "wrong": [
          "His school bag",
          "His lunch"
        ]
      },
      {
        "prompt": "Which action shows kindness?",
        "answer": "Helping Zayn stand",
        "wrong": [
          "Running past Zayn",
          "Hiding the finish line"
        ]
      },
      {
        "prompt": "Which theme best fits?",
        "answer": "Friendship matters more than winning.",
        "wrong": [
          "Speed always matters most.",
          "Falling is funny."
        ]
      }
    ],
    "evidence": [
      "Leo wanted to be first across the field in the class race.",
      "Halfway round, Zayn tripped and fell.",
      "Leo stopped running and helped him stand.",
      "The other runners passed them.",
      "Zayn’s knee hurt, so Leo walked with him to the teacher.",
      "The winner reached the finish while they were still crossing the field.",
      "Later, Zayn thanked Leo for staying when he could have run on.",
      "Leo pinned no medal on his shirt that day, but he knew he had been a good friend."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Leo wanted to be first across the field in the class race. Halfway round, Zayn tripped and fell. Leo stopped running and helped him stand. The other runners passed them."
      },
      {
        "type": "p",
        "text": "Zayn’s knee hurt, so Leo walked with him to the teacher. The winner reached the finish while they were still crossing the field. Later, Zayn thanked Leo for staying when he could have run on. Leo pinned no medal on his shirt that day, but he knew he had been a good friend."
      }
    ],
    "groups": [
      {
        "label": "The difficult choice",
        "cards": [
          "Leo wanted to be first across the field in the class race.",
          "Halfway round, Zayn tripped and fell.",
          "Leo stopped running and helped him stand.",
          "The other runners passed them."
        ]
      },
      {
        "label": "Friendship after the race",
        "cards": [
          "Zayn’s knee hurt, so Leo walked with him to the teacher.",
          "The winner reached the finish while they were still crossing the field.",
          "Later, Zayn thanked Leo for staying when he could have run on.",
          "Leo pinned no medal on his shirt that day, but he knew he had been a good friend."
        ]
      }
    ],
    "sortPrompt": "Sort the details under the paragraph theme they support.",
    "questions": [
      {
        "prompt": "Which theme does the ending support?",
        "answer": "Being a good friend can matter more than a prize.",
        "wrong": [
          "Winning is the only thing that matters.",
          "Friends should never race together."
        ],
        "evidence": "Leo pinned no medal on his shirt that day, but he knew he had been a good friend.",
        "evidencePrompt": "Tap the sentence contrasting a missing medal with friendship."
      },
      {
        "prompt": "Why is stopping a sacrifice for Leo?",
        "answer": "He wanted to win, but other runners pass him.",
        "wrong": [
          "He had already finished.",
          "He did not enter the race."
        ],
        "evidence": "The other runners passed them.",
        "evidencePrompt": "Tap the sentence showing the cost of stopping."
      },
      {
        "prompt": "How does Zayn’s thanks support the theme?",
        "answer": "It shows that Leo’s help was valued.",
        "wrong": [
          "It proves Leo won.",
          "It shows Zayn wanted to run alone."
        ],
        "evidence": "Later, Zayn thanked Leo for staying when he could have run on.",
        "evidencePrompt": "Tap the sentence showing Zayn appreciating Leo’s help."
      },
      {
        "prompt": "Which action most directly expresses friendship?",
        "answer": "Leo helps Zayn after falling.",
        "wrong": [
          "Leo looks at the medal.",
          "Other runners finish."
        ],
        "evidence": "Leo stopped running and helped him stand.",
        "evidencePrompt": "Tap the sentence showing Leo stopping to help."
      }
    ]
  },
  {
    "title": "Three Towers",
    "short": "Priya’s first paper tower collapsed before she could measure it. She looked at the bent base and made it wider. The second tower stayed up, but leaned to one side. Priya decided to try again instead of putting the paper away.",
    "intro": [
      {
        "prompt": "What does Priya do after her first failure?",
        "answer": "She changes the base and tries again.",
        "wrong": [
          "She throws away every sheet.",
          "She stops measuring forever."
        ]
      },
      {
        "prompt": "Which theme fits?",
        "answer": "Learning through persistence",
        "wrong": [
          "Keeping secrets",
          "Winning by cheating"
        ]
      },
      {
        "prompt": "What shows she persists?",
        "answer": "She chooses to try again.",
        "wrong": [
          "The first tower collapses.",
          "The ruler is long."
        ]
      }
    ],
    "evidence": [
      "Priya’s first paper tower collapsed before she could measure it.",
      "She looked at the bent base and made it wider.",
      "The second tower stayed up, but leaned to one side.",
      "Priya decided to try again instead of putting the paper away.",
      "She folded each strip carefully and checked that the sides were equal.",
      "Zayn held the ruler while she tested the new tower.",
      "This time it stood straight and carried the little flag at its top.",
      "Priya kept the two failed towers beside it to remind herself how much she had learnt."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Priya’s first paper tower collapsed before she could measure it. She looked at the bent base and made it wider. The second tower stayed up, but leaned to one side. Priya decided to try again instead of putting the paper away."
      },
      {
        "type": "p",
        "text": "She folded each strip carefully and checked that the sides were equal. Zayn held the ruler while she tested the new tower. This time it stood straight and carried the little flag at its top. Priya kept the two failed towers beside it to remind herself how much she had learnt."
      }
    ],
    "groups": [
      {
        "label": "Setbacks and persistence",
        "cards": [
          "Priya’s first paper tower collapsed before she could measure it.",
          "She looked at the bent base and made it wider.",
          "The second tower stayed up, but leaned to one side.",
          "Priya decided to try again instead of putting the paper away."
        ]
      },
      {
        "label": "Improvement and learning",
        "cards": [
          "She folded each strip carefully and checked that the sides were equal.",
          "Zayn held the ruler while she tested the new tower.",
          "This time it stood straight and carried the little flag at its top.",
          "Priya kept the two failed towers beside it to remind herself how much she had learnt."
        ]
      }
    ],
    "sortPrompt": "Sort the details under the paragraph theme they support.",
    "questions": [
      {
        "prompt": "Which theme fits the whole story?",
        "answer": "Mistakes can help us improve if we keep trying.",
        "wrong": [
          "A first failure means we should stop.",
          "Paper cannot make towers."
        ],
        "evidence": "Priya kept the two failed towers beside it to remind herself how much she had learnt.",
        "evidencePrompt": "Tap the sentence showing Priya values the earlier failures as learning."
      },
      {
        "prompt": "How does the final tower support the theme?",
        "answer": "It succeeds after changes and careful work.",
        "wrong": [
          "It is bought from a shop.",
          "It stands without any folding."
        ],
        "evidence": "This time it stood straight and carried the little flag at its top.",
        "evidencePrompt": "Tap the sentence showing the successful result."
      },
      {
        "prompt": "Which action shows persistence?",
        "answer": "Choosing to try again when the second tower leans",
        "wrong": [
          "Putting all the paper away",
          "Refusing to measure"
        ],
        "evidence": "Priya decided to try again instead of putting the paper away.",
        "evidencePrompt": "Tap the sentence showing Priya deciding to continue."
      },
      {
        "prompt": "Why keep the failed towers?",
        "answer": "To remember what she learnt from them",
        "wrong": [
          "To pretend they were straight",
          "To stop anyone making towers"
        ],
        "evidence": "Priya kept the two failed towers beside it to remind herself how much she had learnt.",
        "evidencePrompt": "Tap the sentence explaining the reason for keeping the failed towers."
      }
    ]
  }
];
export function buildThemesInStoriesQuestions(level, rng) {
  return readingQuestions(BANK, RULE, level, rng);
}
