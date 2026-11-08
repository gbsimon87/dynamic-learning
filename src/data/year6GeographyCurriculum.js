import { toKebabCase } from "../utils/toKebabCase.js";

// Titles become URL and progress IDs. Locked on first implementation, 2026-11-08.
// Source: docs/curriculum/key-stage-2-geography.md, "Year 6 topics mapped to statutory requirements".
const rawCurriculum = [
  { title: "Regions and Comparison", topics: [{ name: "Belize and the Caribbean Coast", icon: "🪸" }, { name: "Comparing Four Regions", icon: "🔎" }, { name: "Europe the Americas and Russia", icon: "🌍" }, { name: "Changing UK Counties and Cities", icon: "🏙️" }] },
  { title: "Environmental Change", topics: [{ name: "Glaciers and Mountain Environments", icon: "🏔️" }, { name: "Managing Rivers", icon: "🏞️" }, { name: "Managing Coasts", icon: "🌊" }, { name: "Climate Change Responses", icon: "🌱" }] },
  { title: "People Resources and Connections", topics: [{ name: "Energy Choices and Trade Offs", icon: "⚡" }, { name: "Population and Migration", icon: "🧳" }, { name: "Global Trade Networks", icon: "🚢" }, { name: "Changing UK Land Use", icon: "🏗️" }] },
  { title: "Maps Data and Fieldwork", topics: [{ name: "Six Figure References and Scale", icon: "🧭" }, { name: "Digital Map Layers", icon: "🗺️" }, { name: "Planning a Fieldwork Enquiry", icon: "📋" }, { name: "Presenting and Evaluating Fieldwork", icon: "📊" }] },
];

export const year6GeographyCurriculum = rawCurriculum.map(({ title, topics }) => ({
  id: toKebabCase(title),
  title,
  topics: topics.map(({ name, icon }) => ({
    id: toKebabCase(name),
    name,
    icon,
    challenges: [1, 2, 3, 4].map((id) => ({ id, title: `Challenge ${id}` })),
  })),
}));
