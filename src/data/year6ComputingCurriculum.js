import { toKebabCase } from "../utils/toKebabCase.js";

// Titles are persistent identifiers. Topics are mapped to the statutory Key stage 2 computing
// bullets in docs/curriculum/key-stage-2-computing.md (Year 6 table). Approved 2026-11-09.
const rawCurriculum = [
  { title: "Programming Projects", topics: [
    { name: "Combining Loops and Decisions", icon: "🔀" }, { name: "Variables That Change", icon: "📈" },
    { name: "Procedures", icon: "🧰" }, { name: "Debugging Longer Programs", icon: "🐞" },
  ] },
  { title: "Physical Systems", topics: [
    { name: "Sensors and Inputs", icon: "🌡️" }, { name: "Controlling Devices", icon: "🚦" }, { name: "Simulations", icon: "🎛️" },
  ] },
  { title: "Algorithms", topics: [
    { name: "Searching Algorithms", icon: "🔎" }, { name: "Sorting Algorithms", icon: "📶" }, { name: "Comparing Algorithms", icon: "⚖️" },
  ] },
  { title: "Data and Information", topics: [
    { name: "Collecting Data", icon: "📝" }, { name: "Databases and Spreadsheets", icon: "🗂️" }, { name: "Presenting Data", icon: "📊" },
  ] },
  { title: "Online World", topics: [
    { name: "How Email and Messaging Work", icon: "✉️" }, { name: "Smart Searching", icon: "🔍" },
    { name: "Fact or Fake", icon: "🧐" }, { name: "Digital Footprint and Reporting", icon: "👣" },
  ] },
];

export const year6ComputingCurriculum = rawCurriculum.map(({ title, topics }) => ({
  id: toKebabCase(title), title,
  topics: topics.map(({ name, icon }) => ({
    id: toKebabCase(name), name, icon,
    challenges: [1, 2, 3, 4].map((id) => ({ id, title: `Challenge ${id}` })),
  })),
}));
