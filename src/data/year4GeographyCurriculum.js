import { toKebabCase } from "../utils/toKebabCase.js";

// Titles locked on first implementation, 2026-10-13. Source: KS2 geography crosswalk.
const raw = [
  { title: "North and South America", topics: [["North American Countries and Cities", "🍁"], ["South American Countries and Cities", "🦙"], ["Washington State", "🌲"]] },
  { title: "Climate and the Globe", topics: [["Climate Zones", "🌡️"], ["Biomes and Vegetation Belts", "🌴"], ["Day Night and Time Zones", "🕒"]] },
  { title: "Rivers and Changing Landscapes", topics: [["River Journeys", "🏞️"], ["Rivers and People", "🚤"], ["Changing UK Landscapes", "🏘️"]] },
  { title: "Settlements and Resources", topics: [["Settlements and Land Use", "🏡"], ["Food and Trade Links", "🚢"], ["Energy Minerals and Water", "⚡"], ["Comparing Three Regions", "🔎"]] },
  { title: "Mapping and Fieldwork Enquiries", topics: [["Six Figure Grid References", "▦"], ["Maps Atlases and Digital Mapping", "🧭"], ["Local Fieldwork Enquiry", "📋"]] },
];

export const year4GeographyCurriculum = raw.map(({ title, topics }) => ({
  id: toKebabCase(title), title,
  topics: topics.map(([name, icon]) => ({
    id: toKebabCase(name), name, icon,
    challenges: [1, 2, 3, 4].map((id) => ({ id, title: `Challenge ${id}` })),
  })),
}));
