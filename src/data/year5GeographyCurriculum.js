import { toKebabCase } from "../utils/toKebabCase.js";

// Titles are persistent identifiers (they become ids via toKebabCase). Locked on first implementation, 2026-11-03.
// Source: docs/curriculum/key-stage-2-geography.md, "Year 5 topics mapped to statutory requirements".
const rawCurriculum = [
  { title: "Regions in Depth", topics: [{ name: "Scotland and the Highlands", icon: "🏔️" }, { name: "Andalusia in Spain", icon: "🫒" }, { name: "The Amazon Region of Brazil", icon: "🌳" }] },
  { title: "Coasts Rivers and Hazards", topics: [{ name: "Coasts and Coastal Landforms", icon: "🌊" }, { name: "Rivers in Flood", icon: "🌧️" }, { name: "Living with Natural Hazards", icon: "🌋" }] },
  { title: "Climate and Environments", topics: [{ name: "Climate Graphs and Patterns", icon: "📈" }, { name: "Biomes and Sustainability", icon: "🌱" }] },
  { title: "Resources Trade and Settlement", topics: [{ name: "Natural Resources Around the World", icon: "⛏️" }, { name: "Trade Links and Global Connections", icon: "🚢" }, { name: "Settlement Growth and Change", icon: "🏙️" }, { name: "Economic Activity and Jobs", icon: "💼" }] },
  { title: "Coordinates Time and Maps", topics: [{ name: "Latitude and Longitude in Practice", icon: "🌐" }, { name: "Time Zones and Journeys", icon: "🕒" }, { name: "Contours Scale and OS Maps", icon: "🗺️" }, { name: "Designing a Fieldwork Enquiry", icon: "📋" }] },
];

export const year5GeographyCurriculum = rawCurriculum.map(({ title, topics }) => ({
  id: toKebabCase(title), title,
  topics: topics.map(({ name, icon }) => ({
    id: toKebabCase(name), name, icon,
    challenges: [1, 2, 3, 4].map((id) => ({ id, title: `Challenge ${id}` })),
  })),
}));
