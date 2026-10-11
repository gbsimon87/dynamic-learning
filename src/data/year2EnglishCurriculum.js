import { toKebabCase } from "../utils/toKebabCase.js";

/** UK Year 2 English. Sources and topic boundaries: docs/curriculum/year-2-english.md
 * and english-appendix-1-year-2.md. Titles are permanent progress identifiers.
 * Categories alternate strands, following the existing Years 3–4 structure.
 */
const rawCurriculum = [
  {
    "title": "Spelling - Sounds and Endings",
    "topics": [
      {
        "name": "The ge and dge Spellings",
        "icon": "💎"
      },
      {
        "name": "Soft c and Silent Letters",
        "icon": "🤫"
      },
      {
        "name": "The le, el, al and il Endings",
        "icon": "🐪"
      },
      {
        "name": "The y and ey Endings",
        "icon": "🔑"
      },
      {
        "name": "Other Ways to Spell Sounds",
        "icon": "📺"
      }
    ]
  },
  {
    "title": "Reading - Words",
    "topics": [
      {
        "name": "Reading Longer Words",
        "icon": "🦋"
      },
      {
        "name": "Reading Words with Suffixes",
        "icon": "🌱"
      },
      {
        "name": "Common Exception Words",
        "icon": "🦓"
      }
    ]
  },
  {
    "title": "Grammar - Words",
    "topics": [
      {
        "name": "Compound Words and Nouns",
        "icon": "🧩"
      },
      {
        "name": "Adjectives and Adverbs",
        "icon": "🎨"
      }
    ]
  },
  {
    "title": "Reading - Stories",
    "topics": [
      {
        "name": "Sequencing Events",
        "icon": "🪜"
      },
      {
        "name": "Understanding Characters",
        "icon": "💗"
      },
      {
        "name": "Predicting from a Story",
        "icon": "🔮"
      },
      {
        "name": "Fairy Stories and Traditional Tales",
        "icon": "🏰"
      },
      {
        "name": "Word Meanings in Stories",
        "icon": "🔎"
      }
    ]
  },
  {
    "title": "Spelling - Suffixes",
    "topics": [
      {
        "name": "Changing y to ies",
        "icon": "🪰"
      },
      {
        "name": "Suffixes after y",
        "icon": "🪁"
      },
      {
        "name": "Dropping e before a Suffix",
        "icon": "🥾"
      },
      {
        "name": "Doubling the Last Letter",
        "icon": "👯"
      },
      {
        "name": "The Suffixes ment, ness, ful, less and ly",
        "icon": "🪄"
      }
    ]
  },
  {
    "title": "Grammar - Sentences and Punctuation",
    "topics": [
      {
        "name": "Statements, Questions, Exclamations and Commands",
        "icon": "💬"
      },
      {
        "name": "Expanded Noun Phrases",
        "icon": "🎈"
      },
      {
        "name": "Joining Sentences",
        "icon": "🔗"
      },
      {
        "name": "Present and Past Tense",
        "icon": "⏰"
      },
      {
        "name": "Actions in Progress",
        "icon": "🏃"
      },
      {
        "name": "Capital Letters and End Marks",
        "icon": "🔠"
      },
      {
        "name": "Commas in Lists",
        "icon": "🛒"
      }
    ]
  },
  {
    "title": "Spelling - Apostrophes and Homophones",
    "topics": [
      {
        "name": "Contractions",
        "icon": "✂️"
      },
      {
        "name": "Apostrophes for Ownership",
        "icon": "🎒"
      },
      {
        "name": "Homophones and Near Homophones",
        "icon": "👂"
      }
    ]
  },
  {
    "title": "Reading - Information and Poetry",
    "topics": [
      {
        "name": "Finding Facts in Non-Fiction",
        "icon": "🗂️"
      },
      {
        "name": "Poems and Repeated Phrases",
        "icon": "🎶"
      },
      {
        "name": "Asking Questions and Discussing Books",
        "icon": "❓"
      }
    ]
  },
  {
    "title": "Writing - Planning and Checking",
    "topics": [
      {
        "name": "Planning and Building Stories",
        "icon": "✍️"
      },
      {
        "name": "Writing about Real Events",
        "icon": "📅"
      },
      {
        "name": "Writing for Different Purposes",
        "icon": "✉️"
      },
      {
        "name": "Building Poems",
        "icon": "🌟"
      },
      {
        "name": "Checking and Improving Writing",
        "icon": "🕵️"
      },
      {
        "name": "Dictation",
        "icon": "🎧"
      }
    ]
  }
];

export const year2EnglishCurriculum = rawCurriculum.map((category) => ({
  id: toKebabCase(category.title),
  title: category.title,
  topics: category.topics.map((topic) => ({
    id: toKebabCase(topic.name), name: topic.name, icon: topic.icon,
    challenges: [1, 2, 3, 4].map((id) => ({ id, title: `Challenge ${id}` })),
  })),
}));
