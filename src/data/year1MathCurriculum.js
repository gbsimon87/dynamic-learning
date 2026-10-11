import { toKebabCase } from "../utils/toKebabCase.js";

// England Year 1 Maths. Every topic is mapped in docs/curriculum/year-1-maths.md.
// Titles are permanent URL and progress identifiers; later renames need migration.
const rawCurriculum = [
  { title: "Number - Number and Place Value", topics: [
    ["Counting Objects", "🍎"],
    ["Counting Forwards and Backwards to 100", "🐾"],
    ["Reading and Writing Numerals to 100", "🔢"],
    ["Counting in Twos Fives and Tens", "🧦"],
    ["One More and One Less", "🪜"],
    ["Comparing and Ordering Quantities", "⚖️"],
    ["Number Words to 20", "📖"],
  ] },
  { title: "Number - Addition and Subtraction", topics: [
    ["Addition Subtraction and Equals Signs", "➕"],
    ["Number Bonds Within 20", "🧩"],
    ["Adding Within 20", "🍓"],
    ["Subtracting Within 20", "🎈"],
    ["Missing Numbers Within 20", "🔎"],
    ["One-Step Addition and Subtraction Problems", "🚌"],
  ] },
  { title: "Number - Multiplication and Division", topics: [
    ["Equal Groups and Arrays", "🔵"],
    ["Sharing and Grouping", "🧸"],
    ["Doubling Small Quantities", "🦋"],
  ] },
  { title: "Number - Fractions", topics: [
    ["Finding a Half", "🍊"],
    ["Finding a Quarter", "🥪"],
  ] },
  { title: "Measurement", topics: [
    ["Comparing and Measuring Lengths and Heights", "📏"],
    ["Comparing and Measuring Mass", "⚖️"],
    ["Comparing and Measuring Capacity", "🥛"],
    ["Measuring and Comparing Time", "⏳"],
    ["Recognising Coins", "🪙"],
    ["Recognising Notes", "💷"],
    ["Sequencing Events", "🌅"],
    ["Days Months and Years", "📅"],
    ["O'clock and Half Past", "🕰️"],
  ] },
  { title: "Geometry – Properties of Shapes", topics: [
    ["Recognising 2-D Shapes", "🔺"],
    ["Recognising 3-D Shapes", "🧊"],
  ] },
  { title: "Geometry – Position and Direction", topics: [
    ["Describing Position", "📍"],
    ["Describing Movement", "👣"],
    ["Whole Half Quarter and Three-Quarter Turns", "🔄"],
  ] },
];

export const year1MathCurriculum = rawCurriculum.map(({ title, topics }) => ({
  id: toKebabCase(title), title,
  topics: topics.map(([name, icon]) => ({
    id: toKebabCase(name), name, icon,
    challenges: [1, 2, 3, 4].map(id => ({ id, title: `Challenge ${id}` })),
  })),
}));
