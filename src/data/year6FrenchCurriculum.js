import { toKebabCase } from "../utils/toKebabCase.js";

// Titles are persistent identifiers. Topics are mapped to the statutory Key stage 2 languages
// bullets in docs/curriculum/key-stage-2-languages.md (Year 6 French, decided 2026-11-09).
const rawCurriculum = [
  { title: "Listening and Sounds", topics: [
    { name: "Following Instructions", icon: "👂" }, { name: "Rhymes Songs and Poems", icon: "🎵" }, { name: "Pronunciation and Intonation", icon: "🗣️" },
  ] },
  { title: "Conversations", topics: [
    { name: "Asking for Help", icon: "🙋" }, { name: "Opinions and Reasons", icon: "💭" }, { name: "Daily Routine and Time", icon: "⏰" }, { name: "Holidays and Travel", icon: "✈️" },
  ] },
  { title: "Describing", topics: [
    { name: "Describing People", icon: "🧑" }, { name: "Describing Places", icon: "🏘️" }, { name: "Describing Actions", icon: "🏃" },
  ] },
  { title: "Grammar", topics: [
    { name: "My Your His and Her", icon: "🫵" }, { name: "Want Can and Must", icon: "🔑" }, { name: "Going to Do Things", icon: "🔮" }, { name: "French and English Compared", icon: "⚖️" },
  ] },
  { title: "Reading and Writing", topics: [
    { name: "Reading Longer Texts", icon: "📚" }, { name: "Using a Dictionary", icon: "📕" }, { name: "Writing About Myself", icon: "✍️" },
  ] },
];

export const year6FrenchCurriculum = rawCurriculum.map(({ title, topics }) => ({
  id: toKebabCase(title), title,
  topics: topics.map(({ name, icon }) => ({
    id: toKebabCase(name), name, icon,
    challenges: [1, 2, 3, 4].map((id) => ({ id, title: `Challenge ${id}` })),
  })),
}));
