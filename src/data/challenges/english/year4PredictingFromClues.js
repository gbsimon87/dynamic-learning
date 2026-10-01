import { readingQuestions } from "./year4Reading.js";
/** Original texts for Predicting from Clues; source URLs on the traditional retellings. */
export const RULE = "A prediction (idea about what may happen) uses details already stated and clues you infer.";
export const BANK = [
  {
    "title": "Ready for Rain",
    "short": "Ellie heard rain tapping the window. Biscuit was waiting beside the door for his walk. Ellie picked up a waterproof coat and a towel. She placed the towel beside the door before clipping on Biscuit’s lead.",
    "intro": [
      {
        "prompt": "What will Ellie probably wear?",
        "answer": "Her waterproof coat",
        "wrong": [
          "A swimming costume",
          "A party dress"
        ]
      },
      {
        "prompt": "Why put a towel by the door?",
        "answer": "To dry Biscuit after a wet walk",
        "wrong": [
          "To cover a cake",
          "To clean a telescope"
        ]
      },
      {
        "prompt": "Which clue suggests the walk may be wet?",
        "answer": "Rain taps the window.",
        "wrong": [
          "The lead is new.",
          "The door is blue."
        ]
      }
    ],
    "evidence": [
      "Ellie heard rain tapping the window.",
      "Biscuit was waiting beside the door for his walk.",
      "Ellie picked up a waterproof coat and a towel.",
      "She placed the towel beside the door before clipping on Biscuit’s lead.",
      "The path outside was full of shallow puddles.",
      "Biscuit stepped eagerly towards the garden gate.",
      "Ellie pulled up her hood and checked that the towel would be easy to reach later.",
      "Then they left the house together."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Ellie heard rain tapping the window. Biscuit was waiting beside the door for his walk. Ellie picked up a waterproof coat and a towel. She placed the towel beside the door before clipping on Biscuit’s lead."
      },
      {
        "type": "p",
        "text": "The path outside was full of shallow puddles. Biscuit stepped eagerly towards the garden gate. Ellie pulled up her hood and checked that the towel would be easy to reach later. Then they left the house together."
      }
    ],
    "groups": [
      {
        "label": "Wet weather clues",
        "cards": [
          "Ellie heard rain tapping the window.",
          "The path outside was full of shallow puddles.",
          "Rain is falling.",
          "There is water on the path."
        ]
      },
      {
        "label": "Preparation for a walk",
        "cards": [
          "Ellie picked up a waterproof coat and a towel.",
          "She placed the towel beside the door before clipping on Biscuit’s lead.",
          "Ellie pulled up her hood and checked that the towel would be easy to reach later.",
          "Ellie clips on the lead."
        ]
      }
    ],
    "sortPrompt": "Sort the details under the paragraph theme they support.",
    "questions": [
      {
        "prompt": "What will Ellie probably do when they return?",
        "answer": "Dry Biscuit with the towel",
        "wrong": [
          "Give away Biscuit’s lead",
          "Put the towel in the pond"
        ],
        "evidence": "She placed the towel beside the door before clipping on Biscuit’s lead.",
        "evidencePrompt": "Tap the sentence showing the towel being prepared for their return."
      },
      {
        "prompt": "What might happen to Biscuit’s paws?",
        "answer": "They may get wet in the puddles.",
        "wrong": [
          "They will turn into wheels.",
          "They will stay dry because there is no water."
        ],
        "evidence": "The path outside was full of shallow puddles.",
        "evidencePrompt": "Tap the sentence giving the clue about water on the path."
      },
      {
        "prompt": "Why is Ellie likely to keep her hood up?",
        "answer": "The rain may continue during the walk.",
        "wrong": [
          "She wants to hide a crown.",
          "The story says the sun is hot."
        ],
        "evidence": "Ellie heard rain tapping the window.",
        "evidencePrompt": "Tap the sentence showing rain outside."
      },
      {
        "prompt": "Which prediction has the strongest evidence?",
        "answer": "They are going for a wet walk.",
        "wrong": [
          "They are travelling to a desert.",
          "They are going to a birthday party."
        ],
        "evidence": "Then they left the house together.",
        "evidencePrompt": "Tap the sentence showing they actually start the outing."
      }
    ]
  },
  {
    "title": "The Growing Bean",
    "short": "Zayn planted a bean in a pot by the window. After a week, a pale shoot appeared. The shoot leaned towards the light. Zayn turned the pot and put a small cane beside the plant.",
    "intro": [
      {
        "prompt": "What will probably happen if the plant keeps growing?",
        "answer": "The stem will become taller.",
        "wrong": [
          "The pot will become a tree.",
          "The leaves will turn into coins."
        ]
      },
      {
        "prompt": "Why put in a cane?",
        "answer": "To support the growing plant",
        "wrong": [
          "To make a noise",
          "To hide the window"
        ]
      },
      {
        "prompt": "What suggests the plant responds to light?",
        "answer": "The shoot leans towards it.",
        "wrong": [
          "The pot is brown.",
          "The string is loose."
        ]
      }
    ],
    "evidence": [
      "Zayn planted a bean in a pot by the window.",
      "After a week, a pale shoot appeared.",
      "The shoot leaned towards the light.",
      "Zayn turned the pot and put a small cane beside the plant.",
      "A second leaf began to unfold above the first.",
      "Zayn watered the soil when it felt dry, taking care not to flood it.",
      "He measured the stem and saw that it was taller than the day before.",
      "He tied a loose loop of string around the cane, ready for the growing stem."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Zayn planted a bean in a pot by the window. After a week, a pale shoot appeared. The shoot leaned towards the light. Zayn turned the pot and put a small cane beside the plant."
      },
      {
        "type": "p",
        "text": "A second leaf began to unfold above the first. Zayn watered the soil when it felt dry, taking care not to flood it. He measured the stem and saw that it was taller than the day before. He tied a loose loop of string around the cane, ready for the growing stem."
      }
    ],
    "groups": [
      {
        "label": "Signs of growth",
        "cards": [
          "After a week, a pale shoot appeared.",
          "The shoot leaned towards the light.",
          "A second leaf began to unfold above the first.",
          "He measured the stem and saw that it was taller than the day before."
        ]
      },
      {
        "label": "Care and support",
        "cards": [
          "Zayn turned the pot and put a small cane beside the plant.",
          "Zayn watered the soil when it felt dry, taking care not to flood it.",
          "He tied a loose loop of string around the cane, ready for the growing stem.",
          "Zayn checks the soil before watering."
        ]
      }
    ],
    "sortPrompt": "Sort the details under the paragraph theme they support.",
    "questions": [
      {
        "prompt": "Why is Zayn likely to use the string soon?",
        "answer": "The taller stem may need support.",
        "wrong": [
          "He wants to tie the window shut.",
          "The string will become a leaf."
        ],
        "evidence": "He tied a loose loop of string around the cane, ready for the growing stem.",
        "evidencePrompt": "Tap the sentence showing the string prepared for the stem."
      },
      {
        "prompt": "Which prediction is supported by the new leaf?",
        "answer": "The plant is likely to continue developing.",
        "wrong": [
          "The plant has already stopped growing.",
          "The pot will disappear."
        ],
        "evidence": "A second leaf began to unfold above the first.",
        "evidencePrompt": "Tap the sentence showing a second leaf unfolding."
      },
      {
        "prompt": "What might happen if the soil becomes dry?",
        "answer": "Zayn will probably water it.",
        "wrong": [
          "Zayn will paint it.",
          "Zayn will throw away every leaf."
        ],
        "evidence": "Zayn watered the soil when it felt dry, taking care not to flood it.",
        "evidencePrompt": "Tap the sentence showing how Zayn responds to dry soil."
      },
      {
        "prompt": "Which clue supports predicting a taller plant?",
        "answer": "The stem is taller than yesterday.",
        "wrong": [
          "The window has a latch.",
          "The cane is brown."
        ],
        "evidence": "He measured the stem and saw that it was taller than the day before.",
        "evidencePrompt": "Tap the sentence comparing the plant’s height on two days."
      }
    ]
  },
  {
    "title": "The Garden Picture",
    "short": "Amara unpacked paints, brushes and a large sheet of paper. She placed a photograph of the school garden beside the paper. She mixed green and yellow on a palette. Then she drew a light outline of the garden gate.",
    "intro": [
      {
        "prompt": "What is Amara probably going to make?",
        "answer": "A painting of the garden",
        "wrong": [
          "A cake for a party",
          "A wooden gate"
        ]
      },
      {
        "prompt": "Why use the photograph?",
        "answer": "To help her draw the garden",
        "wrong": [
          "To wrap the brushes",
          "To clean the palette"
        ]
      },
      {
        "prompt": "Which clue shows she is preparing to paint?",
        "answer": "She mixes colours on a palette.",
        "wrong": [
          "She opens a recipe book.",
          "She carries a football."
        ]
      }
    ],
    "evidence": [
      "Amara unpacked paints, brushes and a large sheet of paper.",
      "She placed a photograph of the school garden beside the paper.",
      "She mixed green and yellow on a palette.",
      "Then she drew a light outline of the garden gate.",
      "Priya carried in a jar of clean water for washing the brushes.",
      "Amara looked from the photograph to her outline, checking the shape of the gate.",
      "She chose a broad brush and dipped it into the green paint.",
      "The paper was still mostly blank as she lifted the brush towards it."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Amara unpacked paints, brushes and a large sheet of paper. She placed a photograph of the school garden beside the paper. She mixed green and yellow on a palette. Then she drew a light outline of the garden gate."
      },
      {
        "type": "p",
        "text": "Priya carried in a jar of clean water for washing the brushes. Amara looked from the photograph to her outline, checking the shape of the gate. She chose a broad brush and dipped it into the green paint. The paper was still mostly blank as she lifted the brush towards it."
      }
    ],
    "groups": [
      {
        "label": "Preparing materials",
        "cards": [
          "Amara unpacked paints, brushes and a large sheet of paper.",
          "She mixed green and yellow on a palette.",
          "Priya carried in a jar of clean water for washing the brushes.",
          "The palette holds mixed paint."
        ]
      },
      {
        "label": "Starting the picture",
        "cards": [
          "Then she drew a light outline of the garden gate.",
          "Amara looked from the photograph to her outline, checking the shape of the gate.",
          "She chose a broad brush and dipped it into the green paint.",
          "The paper was still mostly blank as she lifted the brush towards it."
        ]
      }
    ],
    "sortPrompt": "Sort the details under the paragraph theme they support.",
    "questions": [
      {
        "prompt": "What will Amara probably do next?",
        "answer": "Put green paint onto the paper",
        "wrong": [
          "Bake the paper in an oven",
          "Use the brush to write a shopping list"
        ],
        "evidence": "She chose a broad brush and dipped it into the green paint.",
        "evidencePrompt": "Tap the sentence showing the brush being loaded with paint."
      },
      {
        "prompt": "What is the picture likely to show?",
        "answer": "The school garden",
        "wrong": [
          "A spaceship in flight",
          "A snowy mountain"
        ],
        "evidence": "She placed a photograph of the school garden beside the paper.",
        "evidencePrompt": "Tap the sentence identifying the photograph used as a model."
      },
      {
        "prompt": "Why might Amara use the water later?",
        "answer": "To wash paint from the brushes",
        "wrong": [
          "To water a real bean in this scene",
          "To make the paper float away"
        ],
        "evidence": "Priya carried in a jar of clean water for washing the brushes.",
        "evidencePrompt": "Tap the sentence explaining the water’s purpose."
      },
      {
        "prompt": "Which clue shows painting has not yet covered the page?",
        "answer": "The paper is still mostly blank.",
        "wrong": [
          "The picture is framed.",
          "The paint is completely dry."
        ],
        "evidence": "The paper was still mostly blank as she lifted the brush towards it.",
        "evidencePrompt": "Tap the sentence showing the state of the paper at the end."
      }
    ]
  }
];
export function buildPredictingFromCluesQuestions(level, rng) {
  return readingQuestions(BANK, RULE, level, rng);
}
