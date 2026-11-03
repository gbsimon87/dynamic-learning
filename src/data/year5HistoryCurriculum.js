import { toKebabCase } from "../utils/toKebabCase.js";

// Approved 2026-11-02. Titles are permanent URL and progress keys.
// Crosswalk: docs/curriculum/key-stage-2-history.md ("Year 5 topic crosswalk").
const rawCurriculum = [
  { title: "Ancient Greece - Land and Cities", topics: [
    ["Where Ancient Greece Was", "🗺️"],
    ["Athens and Sparta", "🛡️"],
    ["Everyday Life in Athens", "🏺"],
    ["Democracy in Athens", "🗳️"],
  ] },
  { title: "Ancient Greece - Beliefs and Games", topics: [
    ["Greek Gods and Myths", "⚡"],
    ["The Parthenon and Greek Temples", "🏛️"],
    ["The Olympic Games", "🏅"],
  ] },
  { title: "Ancient Greece - Wars, Ideas and Legacy", topics: [
    ["Greeks and Persians", "⚔️"],
    ["Alexander the Great", "👑"],
    ["Greek Thinkers and Theatre", "🎭"],
    ["Greek Ideas We Still Use", "💡"],
  ] },
  { title: "The Maya - Land and Cities", topics: [
    ["Where the Maya Lived", "🌴"],
    ["Maya Farming and Food", "🌽"],
    ["Maya Cities and Kings", "🗿"],
    ["Chichen Itza and Maya Pyramids", "🛕"],
  ] },
  { title: "The Maya - Ideas and Change", topics: [
    ["Maya Writing and Books", "✍️"],
    ["Maya Numbers and the Calendar", "🔢"],
    ["Maya Gods and the Ball Game", "🏀"],
    ["The Classic Maya Collapse", "🍂"],
  ] },
  { title: "Connections and Chronology", topics: [
    ["One Long Timeline", "📈"],
    ["Sources and Interpretations", "🔎"],
    ["Comparing Past Societies", "⚖️"],
  ] },
];

export const year5HistoryCurriculum = rawCurriculum.map(({ title, topics }) => ({
  id: toKebabCase(title), title,
  topics: topics.map(([name, icon]) => ({
    id: toKebabCase(name), name, icon,
    challenges: [1, 2, 3, 4].map((id) => ({ id, title: `Challenge ${id}` })),
  })),
}));
