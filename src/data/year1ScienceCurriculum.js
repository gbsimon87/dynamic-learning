import { toKebabCase } from "../utils/toKebabCase.js";

// England Year 1 Science, DfE / OGL v3.0. Source and app crosswalk:
// docs/curriculum/year-1-science.md. Titles are persistent identifiers
// (approved 2026-10-11); do not rename them without a progress migration.
const rawCurriculum = [
  { title: "Plants", topics: [
    ["Wild and Garden Plants", "🌼"],
    ["Deciduous and Evergreen Trees", "🌳"],
    ["Parts of a Flowering Plant", "🌷"],
    ["Parts of a Tree", "🪵"],
  ] },
  { title: "Animals, including humans", topics: [
    ["Fish Amphibians Reptiles Birds and Mammals", "🐸"],
    ["Carnivores Herbivores and Omnivores", "🥕"],
    ["Comparing Animal Bodies", "🐾"],
    ["Parts of the Human Body", "🧍"],
    ["Our Five Senses", "👂"],
  ] },
  { title: "Everyday materials", topics: [
    ["Objects and Materials", "🥄"],
    ["Naming Everyday Materials", "🪨"],
    ["Properties of Materials", "✨"],
    ["Grouping Materials", "🗂️"],
  ] },
  { title: "Seasonal changes", topics: [
    ["The Four Seasons", "🍂"],
    ["Weather and the Seasons", "🌦️"],
    ["Day Length Through the Year", "🌅"],
  ] },
];

export const year1ScienceCurriculum = rawCurriculum.map(({ title, topics }) => ({
  id: toKebabCase(title), title,
  topics: topics.map(([name, icon]) => ({
    id: toKebabCase(name), name, icon,
    challenges: [1, 2, 3, 4].map(id => ({ id, title: `Challenge ${id}` })),
  })),
}));
