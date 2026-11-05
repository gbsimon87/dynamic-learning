import { toKebabCase } from "../utils/toKebabCase.js";

// DfE / OGL v3.0: docs/curriculum/year-5-and-6-english.md. Titles are URL
// and learner-progress IDs; change them only with a migration.
const strands = [
  ["Spelling - Advanced Patterns", [
    ["Adding Endings to fer", "🔁"], ["Hyphens in Words", "➖"], ["The Letter String ough", "🔤"],
    ["Confusing Word Pairs", "👯"], ["Year 6 Word List Part 1", "📝"], ["Year 6 Word List Part 2", "📋"],
  ]],
  ["Reading - Interpretation and Comparison", [
    ["Exploring Meaning in Context", "🔎"], ["Predicting from Details", "🔮"], ["Summarising across Paragraphs", "✂️"],
    ["Figurative Language and its Effect", "🌈"], ["Comparing Accounts and Viewpoints", "⚖️"],
    ["Themes and Conventions", "🎭"], ["Asking Questions about Texts", "❓"],
  ]],
  ["Grammar - Formal Language and Sentence Choices", [
    ["Formal and Informal Vocabulary", "🎩"], ["Synonyms and Antonyms", "↔️"], ["Active and Passive Voice", "🎬"],
    ["Formal Structures and the Subjunctive", "🏛️"], ["Expanded Noun Phrases for Information", "🧩"],
  ]],
  ["Grammar - Cohesion, Layout and Punctuation", [
    ["Cohesive Devices across Paragraphs", "🔗"], ["Ellipsis", "…"], ["Layout Devices", "📰"],
    ["Semicolons, Colons and Dashes", "✒️"], ["Punctuation in Lists", "📑"], ["Bullet Point Punctuation", "•"],
    ["Hyphens to Avoid Ambiguity", "🧭"],
  ]],
  ["Writing - Composition and Editing", [
    ["Formal Register for Audience and Purpose", "✉️"], ["Precising Longer Passages", "📏"],
    ["Passive Voice in Writing", "🖊️"], ["Subjunctive Forms in Writing", "💬"],
    ["Proofreading for Clarity and Effect", "🔍"], ["Year 6 Dictation", "🎙️"],
  ]],
];

export const year6EnglishCurriculum = strands.map(([title, topics]) => ({
  id: toKebabCase(title), title,
  topics: topics.map(([name, icon]) => ({
    id: toKebabCase(name), name, icon,
    challenges: [1, 2, 3, 4].map((id) => ({ id, title: `Challenge ${id}` })),
  })),
}));
