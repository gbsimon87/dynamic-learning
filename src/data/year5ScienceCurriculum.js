import { toKebabCase } from "../utils/toKebabCase.js";

// DfE / OGL v3.0: docs/curriculum/year-5-science.md. Titles are progress IDs.
const strands = [
  ["Living things and their habitats", [
    ["Mammal and Bird Life Cycles", "🐘"], ["Amphibian and Insect Life Cycles", "🐸"], ["Comparing Life Cycles", "🔄"],
    ["Reproduction in Plants", "🌸"], ["Reproduction in Animals", "🥚"],
  ]],
  ["Animals, including humans", [
    ["Stages of Human Growth", "👶"], ["Changes During Puberty", "🧒"], ["Growing Older", "🧓"],
  ]],
  ["Properties and changes of materials", [
    ["Properties of Materials", "🔍"], ["Conductors of Heat and Electricity", "⚡"], ["Choosing Materials for a Job", "🛠️"],
    ["Dissolving and Solutions", "🥄"], ["Separating Mixtures", "🧂"], ["Reversible Changes", "♻️"], ["Irreversible Changes", "🔥"],
  ]],
  ["Earth and space", [
    ["The Solar System", "🪐"], ["Planets and Orbits", "🔭"], ["Sun, Earth and Moon", "🌞"],
    ["Day and Night", "🌗"], ["Phases of the Moon", "🌙"],
  ]],
  ["Forces", [
    ["Gravity", "🍎"], ["Air and Water Resistance", "🪂"], ["Friction", "🛼"], ["Levers, Pulleys and Gears", "⚙️"],
  ]],
];

export const year5ScienceCurriculum = strands.map(([title, topics]) => ({
  id: toKebabCase(title), title,
  topics: topics.map(([name, icon]) => ({
    id: toKebabCase(name), name, icon,
    challenges: [1, 2, 3, 4].map((id) => ({ id, title: `Challenge ${id}` })),
  })),
}));
