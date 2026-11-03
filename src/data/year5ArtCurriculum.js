import { toKebabCase } from "../utils/toKebabCase.js";

// DfE / OGL v3.0: docs/curriculum/key-stage-2-art-and-design.md. Titles are persistent identifiers.
const rawCurriculum = [
  { title: "Sketchbooks and drawing", topics: [
    { name: "Sketchbooks and Observation", icon: "📒" }, { name: "Line and Tone", icon: "✏️" },
    { name: "Perspective and Proportion", icon: "📐" }, { name: "Talking About Art", icon: "🖼️" },
  ] },
  { title: "Colour and painting", topics: [
    { name: "The Colour Wheel", icon: "🎨" }, { name: "Colour Mood and Mixing", icon: "🌈" }, { name: "Painting Techniques", icon: "🖌️" },
  ] },
  { title: "Printing sculpture and pattern", topics: [
    { name: "Printmaking", icon: "🖨️" }, { name: "Sculpture and Clay", icon: "🏺" }, { name: "Pattern and Texture", icon: "🔷" },
  ] },
  { title: "Artists architects and designers", topics: [
    { name: "Artists and Their Famous Works", icon: "🧑‍🎨" }, { name: "Famous Sculptors", icon: "🗿" },
    { name: "Craft Makers and Designers", icon: "🧵" }, { name: "Architects and Buildings", icon: "🏛️" },
  ] },
];

export const year5ArtCurriculum = rawCurriculum.map(({ title, topics }) => ({
  id: toKebabCase(title), title,
  topics: topics.map(({ name, icon }) => ({
    id: toKebabCase(name), name, icon,
    challenges: [1, 2, 3, 4].map((id) => ({ id, title: `Challenge ${id}` })),
  })),
}));
