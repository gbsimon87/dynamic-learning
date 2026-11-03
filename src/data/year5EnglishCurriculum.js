import { toKebabCase } from "../utils/toKebabCase.js";

/**
 * UK Year 5 English — the national curriculum programme of study.
 *
 * Sources: docs/curriculum/year-5-and-6-english.md (the Years 5 and 6
 * programme of study, the Years 5 and 6 parts of Appendix 2, and the mapping
 * from each topic below to the statutory bullet it serves),
 * docs/curriculum/english-appendix-1-years-5-and-6.md (spelling) and
 * docs/curriculum/english-spoken-language-years-1-to-6.md. Department for
 * Education, OGL v3.0.
 *
 * One programme of study covers Years 5 and 6; this is the Year 5 half (the
 * Year 5 column of Appendix 2, the Year 5 half of the Appendix 1 split and the
 * first half of the reading and writing bullets). Categories alternate between
 * strands, as in Years 3 and 4. Spoken language is practised through the
 * reading discussion bullets, so its category is titled "Reading - ".
 *
 * ⚠️ Titles are identifiers: ids are recomputed from them by `toKebabCase` and
 * used in URLs, challenge directory names and saved progress. A rename is a
 * migration, not an edit. (No accented letters: toKebabCase would drop them.)
 */
const rawCurriculum = [
  {
    title: "Spelling - Word Endings",
    topics: [
      { name: "The Endings cious and tious", icon: "🍰" },
      { name: "The Endings cial and tial", icon: "🌟" },
      { name: "The Endings ant, ance, ent and ence", icon: "🛎️" },
      { name: "The Endings able and ible", icon: "🧰" },
    ],
  },
  {
    title: "Reading - Words and Meanings",
    topics: [
      { name: "Roots and Origins", icon: "🌳" },
      { name: "Using a Dictionary and Thesaurus", icon: "📚" },
      { name: "Similes and Metaphors", icon: "🌈" },
    ],
  },
  {
    title: "Grammar - Verbs and Possibility",
    topics: [
      { name: "Making Verbs with ate, ise and ify", icon: "⚙️" },
      { name: "Verb Prefixes", icon: "🔧" },
      { name: "Modal Verbs and Possibility", icon: "🎲" },
    ],
  },
  {
    title: "Spelling - Silent Letters and Tricky Words",
    topics: [
      { name: "Silent Letters", icon: "🤫" },
      { name: "The Letters ei after c", icon: "🏠" },
      { name: "Homophones and Confusing Words", icon: "👯" },
      { name: "Words Often Misspelt", icon: "✏️" },
      { name: "More Words Often Misspelt", icon: "📝" },
    ],
  },
  {
    title: "Reading - Understanding Texts",
    topics: [
      { name: "Thoughts and Motives", icon: "💭" },
      { name: "Comparing Characters and Settings", icon: "⚖️" },
      { name: "Fact or Opinion", icon: "🔎" },
      { name: "Retrieving and Recording Information", icon: "🗒️" },
      { name: "Reading Play Scripts", icon: "🎭" },
    ],
  },
  {
    title: "Grammar - Clauses and Punctuation",
    topics: [
      { name: "Relative Pronouns", icon: "🔗" },
      { name: "Relative Clauses", icon: "🧩" },
      { name: "Brackets, Dashes and Commas", icon: "🔖" },
      { name: "Commas to Avoid Ambiguity", icon: "🐼" },
    ],
  },
  {
    title: "Grammar - Cohesion and Tense",
    topics: [
      { name: "Cohesion within Paragraphs", icon: "🧵" },
      { name: "Linking Paragraphs", icon: "🌉" },
      { name: "The Past Perfect", icon: "⏳" },
    ],
  },
  {
    title: "Writing - Composition and Editing",
    topics: [
      { name: "Audience, Purpose and Form", icon: "🎯" },
      { name: "Characters, Settings and Atmosphere", icon: "🏰" },
      { name: "Summarising a Passage", icon: "✂️" },
      { name: "Headings, Bullet Points and Underlining", icon: "📋" },
      { name: "Tense and Agreement", icon: "🧭" },
      { name: "Proofreading Spelling and Punctuation", icon: "🔍" },
      { name: "Dictation", icon: "🎙️" },
    ],
  },
  {
    title: "Reading - Discussion and Debate",
    topics: [
      { name: "Giving Reasons for Your Views", icon: "💬" },
      { name: "Challenging Views Courteously", icon: "🤝" },
    ],
  },
];

export const year5EnglishCurriculum = rawCurriculum.map(({ title, topics }) => ({
  id: toKebabCase(title), title,
  topics: topics.map(({ name, icon }) => ({
    id: toKebabCase(name), name, icon,
    challenges: [1, 2, 3, 4].map((id) => ({ id, title: `Challenge ${id}` })),
  })),
}));
