import { toKebabCase } from "../utils/toKebabCase.js";

// Titles are persistent identifiers. Topics are mapped to the statutory Key stage 2 computing
// bullets in docs/curriculum/key-stage-2-computing.md.
const rawCurriculum = [
  { title: "Programming Basics", topics: [
    { name: "Sequences of Instructions", icon: "🧩" }, { name: "Repeat Loops", icon: "🔁" }, { name: "If and Else Decisions", icon: "🔀" },
    { name: "Variables", icon: "📦" }, { name: "Inputs and Outputs", icon: "🎛️" }, { name: "Finding and Fixing Bugs", icon: "🐞" },
  ] },
  { title: "Algorithms and Logic", topics: [
    { name: "Breaking Problems into Parts", icon: "🧱" }, { name: "How Algorithms Work", icon: "🧮" }, { name: "Logic with And Or and Not", icon: "🧠" },
  ] },
  { title: "Networks and the Web", topics: [
    { name: "Computer Networks", icon: "🔌" }, { name: "How Data Travels", icon: "📨" }, { name: "The Internet and the Web", icon: "🌐" },
  ] },
  { title: "Search and Information", topics: [
    { name: "Using Search Engines", icon: "🔍" }, { name: "How Results Are Ranked", icon: "📊" }, { name: "Judging Websites", icon: "✅" },
  ] },
  { title: "Safe and Responsible Use", topics: [
    { name: "Keeping Information Safe", icon: "🔐" }, { name: "Kind and Responsible Online", icon: "🤝" },
  ] },
];

export const year5ComputingCurriculum = rawCurriculum.map(({ title, topics }) => ({
  id: toKebabCase(title), title,
  topics: topics.map(({ name, icon }) => ({
    id: toKebabCase(name), name, icon,
    challenges: [1, 2, 3, 4].map((id) => ({ id, title: `Challenge ${id}` })),
  })),
}));
