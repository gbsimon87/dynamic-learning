import { toKebabCase } from "../utils/toKebabCase.js";

// DfE / OGL v3.0: docs/curriculum/year-6-science.md. Titles are progress IDs.
const strands = [
  ["Living things and their habitats", [
    ["Classifying Living Things", "🗂️"], ["Vertebrate Groups", "🐟"], ["Invertebrate Groups", "🐌"],
    ["Micro-organisms", "🦠"], ["Classification Keys", "🔑"],
  ]],
  ["Animals, including humans", [
    ["The Circulatory System", "🫀"], ["The Heart and Pulse", "💓"], ["Blood and Blood Vessels", "🩸"],
    ["Diet, Exercise and Health", "🥗"], ["Drugs, Medicines and Lifestyle", "💊"], ["Transporting Nutrients and Water", "🚚"],
  ]],
  ["Evolution and inheritance", [
    ["Fossils as Evidence", "🦴"], ["Inheritance and Variation", "🐶"], ["Adaptation", "🐪"],
    ["Adapting to Extreme Places", "🐧"], ["Evolution", "🦒"],
  ]],
  ["Light", [
    ["How Light Travels", "🔦"], ["How We See Things", "👁️"], ["Mirrors and Periscopes", "🪞"], ["Shadow Shapes", "👤"],
  ]],
  ["Electricity", [
    ["Circuit Symbols", "⚡"], ["Cells and Brightness", "🔋"], ["Comparing Components", "🔔"], ["Switches and Circuit Faults", "🔌"],
  ]],
];

export const year6ScienceCurriculum = strands.map(([title, topics]) => ({
  id: toKebabCase(title), title,
  topics: topics.map(([name, icon]) => ({
    id: toKebabCase(name), name, icon,
    challenges: [1, 2, 3, 4].map((id) => ({ id, title: `Challenge ${id}` })),
  })),
}));
