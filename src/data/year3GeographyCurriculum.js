import { toKebabCase } from "../utils/toKebabCase.js";

// Titles locked on first implementation, 2026-10-13. Source: KS2 geography crosswalk.
const raw = [
  {
    "title": "The UK and Europe",
    "topics": [
      [
        "Counties Cities and Regions",
        "🏙️"
      ],
      [
        "UK Landscapes and Land Use",
        "🏞️"
      ],
      [
        "Europe and Russia",
        "🗺️"
      ]
    ]
  },
  {
    "title": "Lines on the Globe",
    "topics": [
      [
        "The Equator and Hemispheres",
        "🌍"
      ],
      [
        "Tropics and Polar Circles",
        "☀️"
      ],
      [
        "Latitude and Longitude",
        "📍"
      ]
    ]
  },
  {
    "title": "Physical Processes",
    "topics": [
      [
        "Mountains and Valleys",
        "⛰️"
      ],
      [
        "Volcanoes",
        "🌋"
      ],
      [
        "Earthquakes",
        "🪨"
      ],
      [
        "The Water Cycle",
        "💧"
      ]
    ]
  },
  {
    "title": "Two European Regions",
    "topics": [
      [
        "The Lake District",
        "🐑"
      ],
      [
        "Campania",
        "⛵"
      ],
      [
        "Comparing Two Regions",
        "🔎"
      ]
    ]
  },
  {
    "title": "Maps and Local Surveys",
    "topics": [
      [
        "Eight Compass Points",
        "🧭"
      ],
      [
        "Four Figure Grid References",
        "▦"
      ],
      [
        "Surveying Local Land Use",
        "📋"
      ]
    ]
  }
];

export const year3GeographyCurriculum = raw.map(({ title, topics }) => ({
  id: toKebabCase(title), title,
  topics: topics.map(([name, icon]) => ({
    id: toKebabCase(name), name, icon,
    challenges: [1,2,3,4].map((id) => ({ id, title: `Challenge ${id}` })),
  })),
}));
