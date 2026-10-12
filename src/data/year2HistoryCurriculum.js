import { toKebabCase } from "../utils/toKebabCase.js";
// Approved Year 2 History titles: permanent URL and progress identifiers.
// Statutory crosswalk: docs/curriculum/key-stage-1-history.md.
const rawCurriculum = [
  {
    "title": "Changes Within Living Memory",
    "topics": [
      [
        "Keeping in Touch Then and Now",
        "📞"
      ],
      [
        "Getting About Then and Now",
        "🚗"
      ]
    ]
  },
  {
    "title": "The Great Fire of London",
    "topics": [
      [
        "London in 1666",
        "🏘️"
      ],
      [
        "How the Great Fire Started and Spread",
        "🔥"
      ],
      [
        "How We Know About the Great Fire",
        "📖"
      ],
      [
        "London After the Fire",
        "🏗️"
      ]
    ]
  },
  {
    "title": "Nurses Who Made a Difference",
    "topics": [
      [
        "Florence Nightingale",
        "🪔"
      ],
      [
        "Mary Seacole",
        "🩹"
      ],
      [
        "Edith Cavell",
        "🏥"
      ],
      [
        "Nursing Then and Now",
        "🩺"
      ]
    ]
  },
  {
    "title": "People Who Changed Things",
    "topics": [
      [
        "Rosa Parks",
        "🚌"
      ],
      [
        "Emily Davison and Votes for Women",
        "🗳️"
      ],
      [
        "William Caxton and Tim Berners-Lee",
        "📰"
      ]
    ]
  },
  {
    "title": "Days We Remember",
    "topics": [
      [
        "Bonfire Night",
        "🎆"
      ],
      [
        "Remembrance Day",
        "🌺"
      ]
    ]
  },
  {
    "title": "History Near You",
    "topics": [
      [
        "Memorials and Blue Plaques",
        "🪧"
      ],
      [
        "Old Maps and Photos",
        "🗺️"
      ]
    ]
  }
];
export const year2HistoryCurriculum = rawCurriculum.map(({ title, topics }) => ({
  id: toKebabCase(title), title,
  topics: topics.map(([name, icon]) => ({
    id: toKebabCase(name), name, icon,
    challenges: [1, 2, 3, 4].map((id) => ({ id, title: `Challenge ${id}` })),
  })),
}));
