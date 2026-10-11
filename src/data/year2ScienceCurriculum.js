import { toKebabCase } from "../utils/toKebabCase.js";

// England Year 2 Science, DfE / OGL v3.0. Source and app crosswalk:
// docs/curriculum/year-2-science.md. Titles are persistent identifiers
// (approved 2026-10-11); do not rename them without a progress migration.
const rawCurriculum = [
  { title: "Living things and their habitats", topics: [
    ["Living Dead and Never Alive", "🪨"],
    ["Habitats", "🏞️"],
    ["Micro-habitats", "🪵"],
    ["Simple Food Chains", "🦊"],
    ["Where Food Comes From", "🥕"],
  ] },
  { title: "Plants", topics: [
    ["Seeds and Bulbs", "🌰"],
    ["From Seed to Plant", "🌱"],
    ["What Plants Need to Grow", "💧"],
    ["Plant Experiments", "🔬"],
  ] },
  { title: "Animals, including humans", topics: [
    ["Animals and Their Offspring", "🐣"],
    ["Growing into Adults", "🐸"],
    ["What Animals Need to Survive", "💨"],
    ["Exercise", "🏃"],
    ["Healthy Eating", "🥦"],
    ["Hygiene", "🧼"],
  ] },
  { title: "Uses of everyday materials", topics: [
    ["Materials and Their Uses", "🧱"],
    ["Choosing the Right Material", "☂️"],
    ["Squashing Bending Twisting and Stretching", "🤸"],
    ["Inventors of New Materials", "💡"],
  ] },
];

export const year2ScienceCurriculum = rawCurriculum.map(({ title, topics }) => ({
  id: toKebabCase(title), title,
  topics: topics.map(([name, icon]) => ({
    id: toKebabCase(name), name, icon,
    challenges: [1, 2, 3, 4].map(id => ({ id, title: `Challenge ${id}` })),
  })),
}));
