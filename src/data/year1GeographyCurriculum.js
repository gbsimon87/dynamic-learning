import { toKebabCase } from "../utils/toKebabCase.js";

// Titles locked on first implementation, 2026-10-13. Source: docs/geography-curriculum/year-1-design-spec.md.
// Titles derive the permanent IDs used in progress records; a rename is a migration.
const raw = [
  { title: "Our Place", topics: [["Around Our School", "🏫"], ["Human and Physical Features", "🏞️"], ["Maps from Above", "🛩️"]] },
  { title: "The United Kingdom", topics: [["Four Countries of the UK", "🇬🇧"], ["UK Capital Cities", "⭐"], ["Seas Around the UK", "🌊"]] },
  { title: "The Wider World", topics: [["Seven Continents", "🗺️"], ["Five Oceans", "🐋"], ["Hot and Cold Places", "🌡️"]] },
  { title: "Weather and Exploring", topics: [["Daily Weather", "🌦️"], ["Seasons in the UK", "🍂"], ["Routes and Simple Maps", "🧭"]] },
];

export const year1GeographyCurriculum = raw.map(({ title, topics }) => ({
  id: toKebabCase(title), title,
  topics: topics.map(([name, icon]) => ({
    id: toKebabCase(name), name, icon,
    challenges: [1, 2, 3, 4].map((id) => ({ id, title: `Challenge ${id}` })),
  })),
}));
