import { toKebabCase } from "../utils/toKebabCase.js";

// Approved titles, 2026-10-12. Permanent URL and progress identifiers.
// Crosswalk: docs/curriculum/key-stage-2-history.md.
const rawCurriculum = [
  { title: "Stone Age to Iron Age", topics: [
    ["How We Know About Prehistory", "🔍"],
    ["Stone Age Hunter-Gatherers", "🦣"],
    ["The First Farmers and Skara Brae", "🏘️"],
    ["Stonehenge and the Bronze Age", "🪨"],
    ["Iron Age Hill Forts", "🏰"],
    ["From Stone to Iron", "📈"],
  ] },
  { title: "Roman Britain", topics: [
    ["The Roman Empire and Its Army", "⚔️"],
    ["Julius Caesar Tries to Invade", "🚢"],
    ["Claudius Conquers Britain", "🏛️"],
    ["Boudica Fights Back", "🛡️"],
    ["Hadrian's Wall", "🧱"],
    ["Roman Towns, Roads and Baths", "🛁"],
    ["Roman Gods and Early Christianity", "🏺"],
    ["How the Romans Changed Britain", "🛣️"],
  ] },
  { title: "The First Civilisations", topics: [
    ["Where the First Civilisations Began", "🗺️"],
    ["What the First Civilisations Gave Us", "💡"],
    ["The River Nile", "🌊"],
    ["Pharaohs and Pyramids", "🔺"],
    ["Hieroglyphs", "📜"],
    ["Egyptian Gods and Mummies", "⚱️"],
    ["Everyday Life in Ancient Egypt", "🌾"],
    ["Tutankhamun's Tomb", "👑"],
  ] },
];

export const year3HistoryCurriculum = rawCurriculum.map(({ title, topics }) => ({
  id: toKebabCase(title), title,
  topics: topics.map(([name, icon]) => ({
    id: toKebabCase(name), name, icon,
    challenges: [1, 2, 3, 4].map((id) => ({ id, title: `Challenge ${id}` })),
  })),
}));
