import { toKebabCase } from "../utils/toKebabCase.js";

// DfE / OGL v3.0: docs/curriculum/key-stage-2-design-and-technology.md. Titles are persistent identifiers.
const rawCurriculum = [
  { title: "Designing and evaluating", topics: [
    { name: "Design Criteria and Research", icon: "📝" }, { name: "Sketches and Models", icon: "✏️" },
    { name: "Evaluating Products", icon: "🔍" }, { name: "Inventors and Designers", icon: "💡" },
  ] },
  { title: "Making", topics: [
    { name: "Tools and Safety", icon: "🔨" }, { name: "Materials and Joining", icon: "🪵" },
  ] },
  { title: "Technical knowledge", topics: [
    { name: "Strong Structures", icon: "🌉" }, { name: "Levers and Linkages", icon: "⚖️" },
    { name: "Gears Pulleys and Cams", icon: "⚙️" }, { name: "Electrical Systems", icon: "🔌" },
    { name: "Computing to Monitor and Control", icon: "🤖" },
  ] },
  { title: "Cooking and nutrition", topics: [
    { name: "A Healthy and Varied Diet", icon: "🥗" }, { name: "Seasonality and Food Sources", icon: "🌾" },
    { name: "Cooking Skills and Kitchen Hygiene", icon: "🍳" },
  ] },
];

export const year5DesignCurriculum = rawCurriculum.map(({ title, topics }) => ({
  id: toKebabCase(title), title,
  topics: topics.map(({ name, icon }) => ({
    id: toKebabCase(name), name, icon,
    challenges: [1, 2, 3, 4].map((id) => ({ id, title: `Challenge ${id}` })),
  })),
}));
