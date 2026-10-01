import { toKebabCase } from "../utils/toKebabCase.js";

/**
 * UK Year 4 English — the national curriculum programme of study.
 *
 * Sources: docs/curriculum/year-3-and-4-english.md (the Years 3 and 4
 * programme of study, the Years 3 and 4 parts of Appendix 2, and the mapping
 * from each topic below to the bullet it serves) and
 * docs/curriculum/english-appendix-1-years-3-and-4.md (spelling). Department
 * for Education, OGL v3.0.
 *
 * One programme of study covers Years 3 and 4; this is the Year 4 half (the
 * Year 4 column of the Appendix 1 split, every Year 4 row of Appendix 2, and
 * the harder reading bullets). Categories alternate between strands, as in
 * Year 3. Approved 2026-10-01.
 *
 * ⚠️ Titles are identifiers: ids are recomputed from them by `toKebabCase` and
 * used in URLs, challenge directory names and saved progress. A rename is a
 * migration, not an edit. curriculumIds.test.js locks them.
 */
const rawCurriculum = [
  {
    title: "Spelling - Prefixes, Suffixes and Apostrophes",
    topics: [
      { name: "The Prefixes il, im and ir", icon: "🚫" },
      { name: "The Suffix ous", icon: "🦖" },
      { name: "More ly Adverbs", icon: "🐢" },
      { name: "Apostrophes for Plural Possession", icon: "🎒" },
    ],
  },
  {
    title: "Reading - Understanding Texts",
    topics: [
      { name: "Main Ideas and Summaries", icon: "📌" },
      { name: "Justifying Inferences", icon: "🕵️‍♀️" },
      { name: "How Language Creates Meaning", icon: "🎨" },
      { name: "How Structure and Presentation Help", icon: "🗺️" },
    ],
  },
  {
    title: "Grammar - Words and Phrases",
    topics: [
      { name: "Plural or Possessive", icon: "🐕" },
      { name: "Standard English Verbs", icon: "🎓" },
      { name: "Determiners", icon: "👉" },
      { name: "Expanded Noun Phrases", icon: "🎈" },
    ],
  },
  {
    title: "Spelling - Word Endings",
    topics: [
      { name: "The shun Endings", icon: "🎻" },
      { name: "The zhun Ending", icon: "📺" },
      { name: "The Endings gue and que", icon: "👅" },
      { name: "More Words Often Misspelt", icon: "✏️" },
    ],
  },
  {
    title: "Reading - Stories and Poems",
    topics: [
      { name: "Themes in Stories", icon: "⚔️" },
      { name: "Predicting from Clues", icon: "🧭" },
      { name: "Myths and Legends from Around the World", icon: "🌍" },
      { name: "Comparing Forms of Poetry", icon: "📜" },
    ],
  },
  {
    title: "Grammar - Sentences and Speech",
    topics: [
      { name: "Fronted Adverbials", icon: "🚀" },
      { name: "Commas after Fronted Adverbials", icon: "⏸️" },
      { name: "Punctuating Direct Speech", icon: "🗣️" },
      { name: "Pronouns and Possessive Pronouns", icon: "🙋" },
    ],
  },
  {
    title: "Spelling - Sounds and Homophones",
    topics: [
      { name: "Greek and French ch", icon: "🧑‍🍳" },
      { name: "The Letters sc", icon: "🔬" },
      { name: "The Sounds ei, eigh and ey", icon: "⚖️" },
      { name: "More Homophones", icon: "🎧" },
    ],
  },
  {
    title: "Writing - Composition and Editing",
    topics: [
      { name: "Paragraphs around a Theme", icon: "🧱" },
      { name: "Nouns or Pronouns for Clarity", icon: "🔁" },
      { name: "Editing for Consistency", icon: "🛠️" },
      { name: "Proofreading Longer Texts", icon: "🔍" },
      { name: "Dictation", icon: "🎙️" },
    ],
  },
];

export const year4EnglishCurriculum = rawCurriculum.map((category) => ({
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
