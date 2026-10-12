import { toKebabCase } from "../utils/toKebabCase.js";

// Approved 2026-10-12. Titles are permanent URL and progress keys.
const rawCurriculum = [
  { title: "Anglo-Saxons and Scots", topics: [
    ["When the Romans Left Britain", "🚪"],
    ["The Scots Come from Ireland", "⛵"],
    ["Anglo-Saxon Settlers", "🛶"],
    ["Anglo-Saxon Kingdoms", "👑"],
    ["Anglo-Saxon Village Life", "🏡"],
    ["Clues in Place Names", "🪧"],
    ["Sutton Hoo and Anglo-Saxon Art", "🪖"],
    ["Saints and Monasteries", "⛪"],
  ] },
  { title: "Vikings and Anglo-Saxons", topics: [
    ["Who Were the Vikings", "🐉"],
    ["The Raid on Lindisfarne", "🌊"],
    ["The Great Viking Invasion", "⚔️"],
    ["Viking Life in Jorvik", "🏘️"],
    ["Alfred the Great", "🔥"],
    ["Athelstan First King of England", "🏰"],
    ["Danegeld and King Cnut", "💰"],
    ["Anglo-Saxon Laws and Justice", "⚖️"],
    ["Edward the Confessor", "🕍"],
    ["From Romans to 1066", "📈"],
  ] },
];

export const year4HistoryCurriculum = rawCurriculum.map(({ title, topics }) => ({
  id: toKebabCase(title), title,
  topics: topics.map(([name, icon]) => ({
    id: toKebabCase(name), name, icon,
    challenges: [1, 2, 3, 4].map((id) => ({ id, title: `Challenge ${id}` })),
  })),
}));
