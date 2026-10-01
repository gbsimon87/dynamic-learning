import { toKebabCase } from "../utils/toKebabCase.js";

/**
 * UK Year 3 English — the national curriculum programme of study.
 *
 * Sources: docs/curriculum/year-3-and-4-english.md (the Years 3 and 4
 * programme of study, the Years 3 and 4 parts of Appendix 2, and the mapping
 * from each topic below to the bullet it serves) and
 * docs/curriculum/english-appendix-1-years-3-and-4.md (spelling). Department
 * for Education, OGL v3.0.
 *
 * One programme of study covers Years 3 and 4; this is the Year 3 half. The
 * split is written down in the mapping doc, and Year 4 lives in its own
 * dataset so neither year teaches an item twice.
 *
 * Categories alternate between strands (spelling, reading, grammar, writing)
 * rather than following the document's order, so a child is never ten
 * reading topics away from spelling. That is a design choice, approved
 * 2026-10-01; the statutory text has no order requirement.
 *
 * ⚠️ Titles are identifiers. Every id below is recomputed from the title/name by
 * `toKebabCase`, and those ids are used in URLs, as challenge directory names,
 * and as keys inside a learner's saved progress. Renaming a title silently
 * orphans completed work — there is no migration path. Treat a rename as a
 * migration, not an edit. curriculumIds.test.js locks them.
 */
const rawCurriculum = [
  {
    title: "Spelling - Prefixes and Suffixes",
    topics: [
      { name: "Adding Prefixes", icon: "🧩" },
      { name: "The Prefixes Super, Anti and Auto", icon: "🦸" },
      { name: "The Suffixes ation and ly", icon: "🪄" },
      { name: "Doubling Before a Suffix", icon: "👯" },
    ],
  },
  {
    title: "Reading - Words and Meanings",
    topics: [
      { name: "Root Words", icon: "🌱" },
      { name: "Exception Words", icon: "🦓" },
      { name: "Using a Dictionary", icon: "📕" },
      { name: "Words in Context", icon: "🔎" },
    ],
  },
  {
    title: "Grammar - Words",
    topics: [
      { name: "A or An", icon: "🍎" },
      { name: "Word Families", icon: "🌳" },
    ],
  },
  {
    title: "Reading - Stories",
    topics: [
      { name: "Does It Make Sense?", icon: "🤔" },
      { name: "Characters' Feelings", icon: "💗" },
      { name: "Predicting What Happens Next", icon: "🔮" },
      { name: "Fairy Stories, Myths and Legends", icon: "🐉" },
    ],
  },
  {
    title: "Spelling - Sounds and Homophones",
    topics: [
      { name: "The sure and ture Endings", icon: "💎" },
      { name: "Tricky Sounds y and ou", icon: "🏺" },
      { name: "Homophones", icon: "👂" },
      { name: "Words Often Misspelt", icon: "📝" },
    ],
  },
  {
    title: "Grammar - Sentences",
    topics: [
      { name: "Conjunctions", icon: "🔗" },
      { name: "Time and Cause Words", icon: "⏰" },
      { name: "The Present Perfect", icon: "🎁" },
      { name: "Inverted Commas", icon: "💬" },
    ],
  },
  {
    title: "Reading - Non-Fiction and Poetry",
    topics: [
      { name: "Finding Information", icon: "🗂️" },
      { name: "Asking Questions about a Text", icon: "❓" },
      { name: "Kinds of Writing", icon: "✉️" },
      { name: "Words That Spark the Imagination", icon: "✨" },
      { name: "Poetry Forms", icon: "🎶" },
    ],
  },
  {
    title: "Writing - Composition",
    topics: [
      { name: "Paragraphs", icon: "🧱" },
      { name: "Headings and Sub-headings", icon: "📰" },
      { name: "Settings, Characters and Plot", icon: "🏰" },
      { name: "Proofreading", icon: "🕵️" },
      { name: "Dictation", icon: "🎧" },
    ],
  },
];

export const year3EnglishCurriculum = rawCurriculum.map((category) => ({
  id: toKebabCase(category.title),
  title: category.title,
  topics: category.topics.map((topic) => ({
    id: toKebabCase(topic.name),
    name: topic.name,
    icon: topic.icon,
    challenges: [
      { id: 1, title: "Challenge 1" },
      { id: 2, title: "Challenge 2" },
      { id: 3, title: "Challenge 3" },
      { id: 4, title: "Challenge 4" },
    ],
  })),
}));
