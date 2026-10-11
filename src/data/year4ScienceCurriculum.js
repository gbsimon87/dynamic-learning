import { toKebabCase } from "../utils/toKebabCase.js";

// DfE / OGL v3.0: docs/curriculum/year-4-science.md. Titles are progress IDs.
const strands = [
  ["Living things and their habitats", [
    ["Grouping Living Things", "🐾"], ["Classification Keys", "🔎"], ["Changing Environments", "🌳"],
  ]],
  ["Animals, including humans", [
    ["The Human Digestive System", "🍎"], ["Teeth and Their Functions", "🦷"], ["Food Chains", "🌿"],
  ]],
  ["States of matter", [
    ["Solids, Liquids and Gases", "🧊"], ["Heating and Cooling", "🌡️"],
    ["Evaporation and Condensation", "💧"], ["The Water Cycle", "🌧️"],
  ]],
  ["Sound", [
    ["Sounds and Vibrations", "🥁"], ["How Sound Travels", "👂"], ["Changing Pitch", "🎸"],
    ["Volume and Vibrations", "🔊"], ["Sound and Distance", "📏"],
  ]],
  ["Electricity", [
    ["Electrical Appliances and Safety", "🔌"], ["Simple Series Circuits", "🔋"],
    ["Complete and Incomplete Circuits", "💡"], ["Switches", "🎛️"], ["Conductors and Insulators", "⚡"],
  ]],
];

export const year4ScienceCurriculum = strands.map(([title, topics]) => ({
  id: toKebabCase(title), title,
  topics: topics.map(([name, icon]) => ({
    id: toKebabCase(name), name, icon,
    challenges: [1, 2, 3, 4].map(id => ({ id, title: `Challenge ${id}` })),
  })),
}));
