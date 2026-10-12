import { toKebabCase } from "../utils/toKebabCase.js";

// England key stage 1 History, Year 1 (DfE / OGL v3.0). Source and app
// crosswalk: docs/curriculum/key-stage-1-history.md. Design:
// docs/history-curriculum/year-1-design-spec.md. Titles are persistent
// identifiers (approved 2026-10-12); do not rename them without a progress migration.
const rawCurriculum = [
  { title: "Then and Now", topics: [
    ["Toys Then and Now", "🧸"],
    ["Homes Then and Now", "🏠"],
    ["School Then and Now", "🏫"],
    ["Seaside Holidays Then and Now", "🏖️"],
  ] },
  { title: "The First Flight", topics: [
    ["The Wright Brothers' First Flight", "✈️"],
    ["Flying Then and Now", "🛩️"],
  ] },
  { title: "Explorers", topics: [
    ["Christopher Columbus", "⛵"],
    ["Neil Armstrong", "🚀"],
    ["Explorers Then and Now", "🧭"],
  ] },
  { title: "Kings and Queens", topics: [
    ["Queen Elizabeth I", "👑"],
    ["Queen Victoria", "🫖"],
    ["Two Queens Long Ago", "👸"],
  ] },
  { title: "Clues Around You", topics: [
    ["Old and New Buildings", "🏚️"],
    ["Clues in Street Names", "🪧"],
  ] },
];

export const year1HistoryCurriculum = rawCurriculum.map(({ title, topics }) => ({
  id: toKebabCase(title), title,
  topics: topics.map(([name, icon]) => ({
    id: toKebabCase(name), name, icon,
    challenges: [1, 2, 3, 4].map((id) => ({ id, title: `Challenge ${id}` })),
  })),
}));
