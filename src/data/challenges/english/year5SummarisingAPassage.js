import { readingQuestions } from "./year5Practice.js";
/** Summarising a Passage: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "A summary (a short version) keeps the main points in order, in your own words. It leaves out examples and extra detail.";
export const BANK = [
  {
    "title": "Why Bees Matter",
    "short": "Tigers are the largest of the big cats. They live in forests and grasslands, and hunt mostly at night. A tiger at Zayn’s local zoo likes to sleep in a cardboard box.",
    "intro": [
      {
        "prompt": "Which is the best one-sentence summary?",
        "answer": "Tigers are the biggest big cats, living in forests and grasslands and hunting at night.",
        "wrong": [
          "A tiger at Zayn’s zoo sleeps in a cardboard box.",
          "Tigers are the most beautiful animals in the world."
        ]
      },
      {
        "prompt": "Which detail can be left out of a summary?",
        "answer": "A tiger at Zayn’s local zoo likes to sleep in a cardboard box.",
        "wrong": [
          "Tigers are the largest of the big cats.",
          "Tigers hunt mostly at night."
        ]
      },
      {
        "prompt": "Where do tigers live?",
        "answer": "In forests and grasslands",
        "wrong": [
          "In deserts and cities",
          "In oceans and rivers"
        ]
      }
    ],
    "evidence": [
      "Bees do a very important job.",
      "Bees carry pollen from flower to flower, which helps plants make seeds and fruit.",
      "A honeybee visits about a hundred flowers on every trip.",
      "Many of our foods depend on bees.",
      "Apples, strawberries and pumpkins all need bees to grow.",
      "Leo’s gran once ate nine strawberries in a row at the farm shop.",
      "Sadly, there are fewer bees than there used to be.",
      "Farmers and gardeners can help by planting wildflowers and avoiding strong chemicals.",
      "Zayn’s class has planted a patch of lavender, which smells lovely."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Bees do a very important job. Bees carry pollen from flower to flower, which helps plants make seeds and fruit. A honeybee visits about a hundred flowers on every trip."
      },
      {
        "type": "p",
        "text": "Many of our foods depend on bees. Apples, strawberries and pumpkins all need bees to grow. Leo’s gran once ate nine strawberries in a row at the farm shop."
      },
      {
        "type": "p",
        "text": "Sadly, there are fewer bees than there used to be. Farmers and gardeners can help by planting wildflowers and avoiding strong chemicals. Zayn’s class has planted a patch of lavender, which smells lovely."
      }
    ],
    "groups": [
      {
        "label": "Main idea (keep in a summary)",
        "cards": [
          "Bees carry pollen from flower to flower, which helps plants make seeds and fruit.",
          "Many of our foods depend on bees.",
          "Sadly, there are fewer bees than there used to be.",
          "Farmers and gardeners can help by planting wildflowers and avoiding strong chemicals."
        ]
      },
      {
        "label": "Extra detail (leave out)",
        "cards": [
          "A honeybee visits about a hundred flowers on every trip.",
          "Apples, strawberries and pumpkins all need bees to grow.",
          "Leo’s gran once ate nine strawberries in a row at the farm shop.",
          "Zayn’s class has planted a patch of lavender, which smells lovely."
        ]
      }
    ],
    "sortPrompt": "Sort the sentences. Does each one hold a main idea to keep in a summary, or an extra detail to leave out?",
    "questions": [
      {
        "prompt": "Which is the best one-sentence summary of the whole passage?",
        "answer": "Bees help plants grow, many foods need them, and we can protect them by planting wildflowers.",
        "wrong": [
          "A honeybee visits about a hundred flowers on every trip.",
          "Bees are the best insects, so everyone should love them."
        ],
        "evidencePrompt": "Tap the sentence that says what bees do for plants.",
        "evidence": "Bees carry pollen from flower to flower, which helps plants make seeds and fruit."
      },
      {
        "prompt": "What is the main idea of paragraph 2?",
        "answer": "Many foods depend on bees.",
        "wrong": [
          "Leo’s gran loves strawberries.",
          "Bees only visit pumpkins."
        ],
        "evidencePrompt": "Tap the sentence that gives the main idea of paragraph 2.",
        "evidence": "Many of our foods depend on bees."
      },
      {
        "prompt": "Which detail can be left out of a summary?",
        "answer": "Zayn’s class has planted a patch of lavender.",
        "wrong": [
          "There are fewer bees than there used to be.",
          "Farmers can plant wildflowers to help."
        ],
        "evidencePrompt": "Tap the sentence about the lavender.",
        "evidence": "Zayn’s class has planted a patch of lavender, which smells lovely."
      },
      {
        "prompt": "What is the main idea of paragraph 3?",
        "answer": "Bees are becoming fewer, and people can help them.",
        "wrong": [
          "Bees dislike chemicals.",
          "Lavender is the best flower."
        ],
        "evidencePrompt": "Tap the sentence that says what farmers and gardeners can do.",
        "evidence": "Farmers and gardeners can help by planting wildflowers and avoiding strong chemicals."
      }
    ]
  },
  {
    "title": "The Journey of a Letter",
    "short": "Every spring, swallows fly thousands of miles from Africa to Britain. They build mud nests under roofs and feed on flying insects. Ellie’s uncle thinks swallows are the prettiest birds.",
    "intro": [
      {
        "prompt": "Which is the best one-sentence summary?",
        "answer": "Swallows fly from Africa to Britain, build mud nests and eat insects.",
        "wrong": [
          "Ellie’s uncle thinks swallows are pretty.",
          "Swallows build their nests in Africa."
        ]
      },
      {
        "prompt": "Which detail is not needed in a summary?",
        "answer": "Ellie’s uncle thinks swallows are the prettiest birds.",
        "wrong": [
          "Swallows feed on flying insects.",
          "Swallows build mud nests under roofs."
        ]
      },
      {
        "prompt": "What do swallows eat?",
        "answer": "Flying insects",
        "wrong": [
          "Mud",
          "Seeds"
        ]
      }
    ],
    "evidence": [
      "When you post a letter, it begins its journey in a red postbox.",
      "A van collects the post each afternoon and takes it to a large sorting office.",
      "The van driver in Amara’s town wears a bright yellow cap.",
      "At the sorting office, machines read each address and put the letters into bundles for different places.",
      "Workers check any messy handwriting by eye.",
      "One machine can sort thirty thousand letters in an hour.",
      "Finally, a postie delivers the letter to the right door.",
      "Most letters arrive the next day, though some take longer.",
      "Priya once waited a week for a postcard from her uncle in Spain."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "When you post a letter, it begins its journey in a red postbox. A van collects the post each afternoon and takes it to a large sorting office. The van driver in Amara’s town wears a bright yellow cap."
      },
      {
        "type": "p",
        "text": "At the sorting office, machines read each address and put the letters into bundles for different places. Workers check any messy handwriting by eye. One machine can sort thirty thousand letters in an hour."
      },
      {
        "type": "p",
        "text": "Finally, a postie delivers the letter to the right door. Most letters arrive the next day, though some take longer. Priya once waited a week for a postcard from her uncle in Spain."
      }
    ],
    "groups": [
      {
        "label": "Main idea (keep in a summary)",
        "cards": [
          "When you post a letter, it begins its journey in a red postbox.",
          "A van collects the post each afternoon and takes it to a large sorting office.",
          "At the sorting office, machines read each address and put the letters into bundles for different places.",
          "Finally, a postie delivers the letter to the right door."
        ]
      },
      {
        "label": "Extra detail (leave out)",
        "cards": [
          "The van driver in Amara’s town wears a bright yellow cap.",
          "Workers check any messy handwriting by eye.",
          "One machine can sort thirty thousand letters in an hour.",
          "Priya once waited a week for a postcard from her uncle in Spain."
        ]
      }
    ],
    "sortPrompt": "Sort the sentences. Does each one hold a main idea to keep in a summary, or an extra detail to leave out?",
    "questions": [
      {
        "prompt": "Which is the best one-sentence summary of the whole passage?",
        "answer": "A letter goes from a postbox to a sorting office, where it is sorted, and then a postie delivers it.",
        "wrong": [
          "One machine can sort thirty thousand letters in an hour.",
          "Posting a letter is the best way to talk to people far away."
        ],
        "evidencePrompt": "Tap the sentence that tells where a letter is taken after it is collected.",
        "evidence": "A van collects the post each afternoon and takes it to a large sorting office."
      },
      {
        "prompt": "What is the main idea of paragraph 2?",
        "answer": "Machines at the sorting office sort letters by address.",
        "wrong": [
          "Vans collect the post in the afternoon.",
          "A postie delivers the letters."
        ],
        "evidencePrompt": "Tap the sentence that gives the main idea of paragraph 2.",
        "evidence": "At the sorting office, machines read each address and put the letters into bundles for different places."
      },
      {
        "prompt": "Which detail can be left out of a summary?",
        "answer": "Priya once waited a week for a postcard from her uncle in Spain.",
        "wrong": [
          "A van collects the post each afternoon.",
          "A postie delivers the letter to the right door."
        ],
        "evidencePrompt": "Tap the sentence about the postcard from Spain.",
        "evidence": "Priya once waited a week for a postcard from her uncle in Spain."
      },
      {
        "prompt": "In which order do the steps of a letter’s journey happen?",
        "answer": "Postbox, sorting office, front door",
        "wrong": [
          "Sorting office, postbox, front door",
          "Front door, postbox, sorting office"
        ],
        "evidencePrompt": "Tap the sentence that tells the last step of the journey.",
        "evidence": "Finally, a postie delivers the letter to the right door."
      }
    ]
  },
  {
    "title": "Layers of the Rainforest",
    "short": "Pandas spend most of the day eating bamboo. They live in the mountains of China, where the air is cool and misty. Amara’s favourite panda at the zoo has a very silly walk.",
    "intro": [
      {
        "prompt": "Which is the best one-sentence summary?",
        "answer": "Pandas live in cool, misty Chinese mountains and spend most of the day eating bamboo.",
        "wrong": [
          "Amara’s favourite panda has a silly walk.",
          "Pandas eat nothing but fruit."
        ]
      },
      {
        "prompt": "Which detail can be left out of a summary?",
        "answer": "Amara’s favourite panda at the zoo has a very silly walk.",
        "wrong": [
          "Pandas eat bamboo.",
          "Pandas live in the mountains of China."
        ]
      },
      {
        "prompt": "Where do pandas live?",
        "answer": "In the mountains of China",
        "wrong": [
          "In the deserts of Africa",
          "In the jungles of Brazil"
        ]
      }
    ],
    "evidence": [
      "A rainforest has four layers, and each is home to different living things.",
      "The tallest trees, called emergents, poke above all the others.",
      "Eagles and monkeys nest there, in the strongest winds and the brightest sun.",
      "Below them, the canopy forms a thick green roof.",
      "Most rainforest animals live in the canopy because food is easy to find.",
      "Scientists once counted over fifty kinds of ant in a single canopy tree.",
      "Some leaves are as big as dinner plates.",
      "The forest floor is dark and damp because very little light gets through.",
      "Fungi and beetles break down fallen leaves, which feeds the soil.",
      "Amara’s teacher says it is the most fascinating layer of all."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "A rainforest has four layers, and each is home to different living things. The tallest trees, called emergents, poke above all the others. Eagles and monkeys nest there, in the strongest winds and the brightest sun."
      },
      {
        "type": "p",
        "text": "Below them, the canopy forms a thick green roof. Most rainforest animals live in the canopy because food is easy to find. Scientists once counted over fifty kinds of ant in a single canopy tree. Some leaves are as big as dinner plates."
      },
      {
        "type": "p",
        "text": "The forest floor is dark and damp because very little light gets through. Fungi and beetles break down fallen leaves, which feeds the soil. Amara’s teacher says it is the most fascinating layer of all."
      }
    ],
    "groups": [
      {
        "label": "Main idea (keep in a summary)",
        "cards": [
          "A rainforest has four layers, and each is home to different living things.",
          "The tallest trees, called emergents, poke above all the others.",
          "Most rainforest animals live in the canopy because food is easy to find.",
          "The forest floor is dark and damp because very little light gets through."
        ]
      },
      {
        "label": "Extra detail (leave out)",
        "cards": [
          "Eagles and monkeys nest there, in the strongest winds and the brightest sun.",
          "Scientists once counted over fifty kinds of ant in a single canopy tree.",
          "Some leaves are as big as dinner plates.",
          "Amara’s teacher says it is the most fascinating layer of all."
        ]
      }
    ],
    "sortPrompt": "Sort the sentences. Does each one hold a main idea to keep in a summary, or an extra detail to leave out?",
    "questions": [
      {
        "prompt": "Which is the best one-sentence summary of the whole passage?",
        "answer": "A rainforest has four layers, from the tall emergents to the dark floor, and each suits different living things.",
        "wrong": [
          "The canopy is full of animals, including over fifty kinds of ant in one tree.",
          "The forest floor is the most fascinating layer of the rainforest."
        ],
        "evidencePrompt": "Tap the sentence that says how many layers a rainforest has.",
        "evidence": "A rainforest has four layers, and each is home to different living things."
      },
      {
        "prompt": "What is the main idea of paragraph 2?",
        "answer": "The canopy is where most rainforest animals live.",
        "wrong": [
          "Some leaves are as big as dinner plates.",
          "Scientists study ants."
        ],
        "evidencePrompt": "Tap the sentence that explains why most animals live in the canopy.",
        "evidence": "Most rainforest animals live in the canopy because food is easy to find."
      },
      {
        "prompt": "Which detail could be left out of a summary?",
        "answer": "Some leaves are as big as dinner plates.",
        "wrong": [
          "The forest floor is dark and damp.",
          "Most rainforest animals live in the canopy."
        ],
        "evidencePrompt": "Tap the sentence about the size of the leaves.",
        "evidence": "Some leaves are as big as dinner plates."
      },
      {
        "prompt": "Why does the teacher’s comment not belong in a summary?",
        "answer": "It is one person’s opinion, not a key point.",
        "wrong": [
          "It is the first sentence.",
          "It is about the canopy."
        ],
        "evidencePrompt": "Tap the sentence that gives a teacher’s opinion.",
        "evidence": "Amara’s teacher says it is the most fascinating layer of all."
      }
    ]
  }
];
export function buildSummarisingAPassageQuestions(level, rng) {
  return readingQuestions(BANK, RULE, level, rng);
}
