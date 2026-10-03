import { toKebabCase } from "../utils/toKebabCase.js";

// England Year 3 Science, DfE / OGL v3.0. Source and app crosswalk:
// docs/curriculum/year-3-science.md. Titles are persistent identifiers;
// do not rename them without a progress migration. Four slots per topic.
const rawCurriculum = [
  {
    "title": "Plants",
    "topics": [
      {
        "name": "Parts of Flowering Plants",
        "icon": "🌼"
      },
      {
        "name": "What Plants Need to Grow",
        "icon": "🌱"
      },
      {
        "name": "Water Transport in Plants",
        "icon": "💧"
      },
      {
        "name": "Pollination and Seed Formation",
        "icon": "🐝"
      },
      {
        "name": "Seed Dispersal",
        "icon": "🍃"
      }
    ]
  },
  {
    "title": "Animals, including humans",
    "topics": [
      {
        "name": "Nutrition for Animals and Humans",
        "icon": "🥗"
      },
      {
        "name": "Skeletons for Support and Protection",
        "icon": "🦴"
      },
      {
        "name": "Muscles and Movement",
        "icon": "💪"
      }
    ]
  },
  {
    "title": "Rocks",
    "topics": [
      {
        "name": "Comparing and Grouping Rocks",
        "icon": "🪨"
      },
      {
        "name": "How Fossils Form",
        "icon": "🐚"
      },
      {
        "name": "What Soil Is Made From",
        "icon": "🌱"
      }
    ]
  },
  {
    "title": "Light",
    "topics": [
      {
        "name": "Light and Darkness",
        "icon": "💡"
      },
      {
        "name": "Reflected Light",
        "icon": "🪞"
      },
      {
        "name": "Protecting Our Eyes from Sunlight",
        "icon": "🕶️"
      },
      {
        "name": "How Shadows Form",
        "icon": "🌑"
      },
      {
        "name": "Changing Shadow Size",
        "icon": "📏"
      }
    ]
  },
  {
    "title": "Forces and magnets",
    "topics": [
      {
        "name": "Movement on Different Surfaces",
        "icon": "🛝"
      },
      {
        "name": "Contact and Magnetic Forces",
        "icon": "🧲"
      },
      {
        "name": "Magnetic Materials",
        "icon": "🔩"
      },
      {
        "name": "Magnets and Their Poles",
        "icon": "🧭"
      },
      {
        "name": "Predicting Attraction and Repulsion",
        "icon": "↔️"
      }
    ]
  }
];

export const year3ScienceCurriculum = rawCurriculum.map((category) => ({
  id: toKebabCase(category.title),
  title: category.title,
  topics: category.topics.map((topic) => ({
    id: toKebabCase(topic.name),
    name: topic.name,
    icon: topic.icon,
    challenges: [1, 2, 3, 4].map((id) => ({ id, title: `Challenge ${id}` })),
  })),
}));
