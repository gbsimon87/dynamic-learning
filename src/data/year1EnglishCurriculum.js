import { toKebabCase } from "../utils/toKebabCase.js";

/**
 * UK Year 1 English — the national curriculum programme of study.
 *
 * Sources: docs/curriculum/year-1-english.md (the Year 1 programme of study,
 * the Year 1 part of Appendix 2, and the mapping from each topic below to the
 * bullet it serves) and docs/curriculum/english-appendix-1-year-1.md
 * (spelling). Department for Education, OGL v3.0.
 *
 * Categories alternate between strands (spelling, reading, grammar, writing),
 * as Year 3 and Year 4 do. Approved 2026-10-11.
 *
 * ⚠️ Titles are identifiers. Every id below is recomputed from the title/name by
 * `toKebabCase`, and those ids are used in URLs, as challenge directory names,
 * and as keys inside a learner's saved progress. Renaming a title silently
 * orphans completed work — there is no migration path. Treat a rename as a
 * migration, not an edit. curriculumIds.test.js locks them.
 */
const rawCurriculum = [
  {
    title: "Spelling - Letters and Sounds",
    topics: [
      { name: "The Alphabet", icon: "🔤" },
      { name: "Double Letters and ck", icon: "🦆" },
      { name: "The Sounds nk and tch", icon: "🐟" },
      { name: "Words Ending in ve and y", icon: "🎁" },
      { name: "The Spellings ph, wh and k", icon: "🐘" },
    ],
  },
  {
    title: "Reading - Phonics",
    topics: [
      { name: "Blending Sounds", icon: "🧩" },
      { name: "Same Letters, Different Sounds", icon: "🔀" },
      { name: "Tricky Words", icon: "🦓" },
      { name: "Longer Words", icon: "🐇" },
      { name: "Contractions", icon: "🤏" },
    ],
  },
  {
    title: "Grammar - Words",
    topics: [
      { name: "Singular and Plural", icon: "🐶" },
      { name: "Adding ing, ed and er", icon: "🏃" },
      { name: "Adding er and est", icon: "🏆" },
      { name: "The Prefix un", icon: "🔓" },
      { name: "Compound Words", icon: "⚽" },
    ],
  },
  {
    title: "Reading - Stories",
    topics: [
      { name: "Traditional Tales", icon: "🏰" },
      { name: "Titles and Events", icon: "📕" },
      { name: "Thinking About Characters", icon: "🤔" },
      { name: "What Happens Next?", icon: "🔮" },
    ],
  },
  {
    title: "Spelling - Vowel Sounds",
    topics: [
      { name: "The Spellings ai, ay, oi and oy", icon: "🚂" },
      { name: "Split Digraphs", icon: "✂️" },
      { name: "The Spellings ee, ea, ie and igh", icon: "🌙" },
      { name: "The Spellings oo, oa, ow and ew", icon: "🌈" },
      { name: "The Spellings ar, or, er, ir and ur", icon: "🚗" },
      { name: "The Spellings air, ear and are", icon: "🐻" },
    ],
  },
  {
    title: "Grammar - Sentences",
    topics: [
      { name: "Words and Sentences", icon: "🧱" },
      { name: "Joining with And", icon: "🔗" },
      { name: "Capital Letters", icon: "👑" },
      { name: "Days of the Week", icon: "📅" },
      { name: "Ending a Sentence", icon: "🛑" },
    ],
  },
  {
    title: "Reading - Poems and Facts",
    topics: [
      { name: "Rhymes and Poems", icon: "🎵" },
      { name: "Repeated Phrases", icon: "🔁" },
      { name: "What Words Mean", icon: "💬" },
      { name: "Facts and Stories", icon: "📰" },
    ],
  },
  {
    title: "Writing - Composition",
    topics: [
      { name: "Building Sentences", icon: "🏗️" },
      { name: "Ordering a Story", icon: "📚" },
      { name: "Checking It Makes Sense", icon: "🔍" },
      { name: "Dictation", icon: "🎧" },
    ],
  },
];

export const year1EnglishCurriculum = rawCurriculum.map((category) => ({
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
