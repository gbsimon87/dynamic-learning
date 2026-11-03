import { toKebabCase } from "../utils/toKebabCase.js";

// DfE / OGL v3.0: docs/curriculum/key-stage-2-physical-education.md. Titles are persistent identifiers.
const rawCurriculum = [
  { title: "Team games", topics: [
    { name: "Football Hockey and Rugby Tag", icon: "⚽" }, { name: "Netball and Basketball", icon: "🏀" },
    { name: "Attacking and Defending", icon: "🛡️" }, { name: "Net and Wall Games", icon: "🎾" },
    { name: "Cricket and Rounders", icon: "🏏" },
  ] },
  { title: "Athletics gymnastics and dance", topics: [
    { name: "Track and Field Events", icon: "🏃" }, { name: "Times and Distances", icon: "⏱️" },
    { name: "Gymnastics and Dance", icon: "🤸" },
  ] },
  { title: "Outdoors and swimming", topics: [
    { name: "Orienteering and Teamwork", icon: "🧭" }, { name: "Swimming and Water Safety", icon: "🏊" },
  ] },
  { title: "Fitness and fair play", topics: [
    { name: "Warming Up and Fitness", icon: "💓" }, { name: "Fair Play and Personal Best", icon: "🏅" },
  ] },
];

export const year5PeCurriculum = rawCurriculum.map(({ title, topics }) => ({
  id: toKebabCase(title), title,
  topics: topics.map(({ name, icon }) => ({
    id: toKebabCase(name), name, icon,
    challenges: [1, 2, 3, 4].map((id) => ({ id, title: `Challenge ${id}` })),
  })),
}));
