import { toKebabCase } from "../utils/toKebabCase.js";

// Permanent titles, first implementation 2026-10-13. KS1 app allocation.
const raw = [
  {
    "title": "World and UK Knowledge",
    "topics": [
      [
        "Continents and Oceans Together",
        "🌍"
      ],
      [
        "UK Places and Landscapes",
        "🏞️"
      ],
      [
        "Compass Directions and Routes",
        "🧭"
      ]
    ]
  },
  {
    "title": "Weather and World Patterns",
    "topics": [
      [
        "Weather Records",
        "🌦️"
      ],
      [
        "The Equator and the Poles",
        "🌐"
      ]
    ]
  },
  {
    "title": "Two Small Places",
    "topics": [
      [
        "Whitby by the Sea",
        "⚓"
      ],
      [
        "Kampong Ayer by the River",
        "🏘️"
      ],
      [
        "Homes and Journeys in Two Places",
        "🚶"
      ],
      [
        "Comparing Two Small Places",
        "🔎"
      ]
    ]
  },
  {
    "title": "Making and Reading Maps",
    "topics": [
      [
        "Aerial Views and Landmarks",
        "🦅"
      ],
      [
        "Symbols and Map Keys",
        "🗝️"
      ],
      [
        "Making a Simple Map",
        "🗺️"
      ]
    ]
  },
  {
    "title": "Local Fieldwork",
    "topics": [
      [
        "Observing Our School Grounds",
        "🌳"
      ],
      [
        "Exploring Our Local Area",
        "📋"
      ]
    ]
  }
];
export const year2GeographyCurriculum = raw.map(({ title, topics }) => ({
  id: toKebabCase(title), title,
  topics: topics.map(([name, icon]) => ({
    id: toKebabCase(name), name, icon,
    challenges: [1, 2, 3, 4].map(id => ({ id, title: `Challenge ${id}` })),
  })),
}));
