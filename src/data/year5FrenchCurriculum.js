import { toKebabCase } from "../utils/toKebabCase.js";

// Titles are persistent identifiers. Topics are mapped to the statutory Key stage 2 languages
// bullets in docs/curriculum/key-stage-2-languages.md (French, decided 2026-11-02).
const rawCurriculum = [
  { title: "Sounds and Spelling", topics: [
    { name: "Silent Letters and Liaison", icon: "🤫" }, { name: "Nasal Sounds", icon: "👃" }, { name: "Accents and Sound Patterns", icon: "🎩" },
  ] },
  { title: "Everyday Words", topics: [
    { name: "Greetings and Family", icon: "👋" }, { name: "Numbers to 100", icon: "🔢" }, { name: "Days Months and Weather", icon: "🌦️" },
    { name: "Food and Ordering", icon: "🥐" }, { name: "School and Town", icon: "🏫" }, { name: "Hobbies and Opinions", icon: "⚽" }, { name: "Clothes and Colours", icon: "👕" },
  ] },
  { title: "Grammar", topics: [
    { name: "Gender Articles and Plurals", icon: "🔤" }, { name: "Adjectives Agreement and Position", icon: "🎨" }, { name: "Be Have Go and Do", icon: "🔑" },
    { name: "Verbs Ending in er", icon: "🛠️" }, { name: "Saying No and Asking Questions", icon: "❓" },
  ] },
  { title: "Reading and Writing", topics: [
    { name: "Reading Short Texts", icon: "📖" }, { name: "Building and Translating Sentences", icon: "🧱" },
  ] },
];

export const year5FrenchCurriculum = rawCurriculum.map(({ title, topics }) => ({
  id: toKebabCase(title), title,
  topics: topics.map(({ name, icon }) => ({
    id: toKebabCase(name), name, icon,
    challenges: [1, 2, 3, 4].map((id) => ({ id, title: `Challenge ${id}` })),
  })),
}));
