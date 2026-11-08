import { toKebabCase } from "../utils/toKebabCase.js";

// Approved 2026-11-08. Titles are permanent URL and progress keys.
// Crosswalk: docs/curriculum/key-stage-2-history.md ("Year 6 topic crosswalk").
const rawCurriculum = [
  { title: "Local History - Investigating Your Area", topics: [
    ["What Is Local History?", "🏘️"],
    ["Maps Through Time", "🗺️"],
    ["Buildings and Streets as Evidence", "🏠"],
    ["Census, Photos and Memories", "📸"],
    ["Planning a Local Study", "📝"],
  ] },
  { title: "Local History - Jarrow Through Time", topics: [
    ["Jarrow and the Venerable Bede", "📖"],
    ["Palmer's Shipyard and the Iron Ships", "🚢"],
    ["The Jarrow March, 1936", "🥾"],
  ] },
  { title: "Crime and Punishment - Anglo-Saxons to 1700", topics: [
    ["Law and Order Before 1066", "⚖️"],
    ["Norman Law and the Forest", "🌲"],
    ["Magna Carta and Trial by Jury", "📜"],
    ["Vagabonds, Plots and the Poor Law", "🕯️"],
  ] },
  { title: "Crime and Punishment - 1700 to Today", topics: [
    ["Highwaymen and the Bloody Code", "🐎"],
    ["Transportation to Australia", "⛵"],
    ["Peel's Police", "👮"],
    ["Prisons and Reformers", "🔑"],
    ["Crime-Fighting Today", "🔬"],
  ] },
  { title: "Thinking Like a Historian", topics: [
    ["Change and Continuity", "🔄"],
    ["Cause and Consequence", "🔗"],
    ["Who and What Mattered?", "⭐"],
  ] },
];

export const year6HistoryCurriculum = rawCurriculum.map(({ title, topics }) => ({
  id: toKebabCase(title), title,
  topics: topics.map(([name, icon]) => ({
    id: toKebabCase(name), name, icon,
    challenges: [1, 2, 3, 4].map((id) => ({ id, title: `Challenge ${id}` })),
  })),
}));
