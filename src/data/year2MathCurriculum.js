import { toKebabCase } from "../utils/toKebabCase.js";

const rawCurriculum = [
  {
    title: "Number - Number and Place Value",
    topics: [
      { id: "numbers-and-counting", name: "Numbers and Counting", icon: "🔢" },
      { id: "counting-forwards-and-backwards", name: "Counting Forwards and Backwards", icon: "🔁" },
      { id: "counting-in-steps-of-2-3-5-and-10", name: "Counting in Steps of 2, 3, 5 and 10", icon: "🦘" },
      { id: "counting-more-and-less", name: "Counting More and Less", icon: "🔼" },
      { id: "place-value", name: "Place Value", icon: "🧱" },
      { id: "less-than-greater-than-and-equal-to", name: "Less Than, Greater Than and Equal To", icon: "🐊" }
    ]
  },
  {
    title: "Number - Addition and Subtraction",
    topics: [
      { id: "doubling-and-halving-using-addition-and-subtraction", name: "Doubling and Halving using Addition and Subtraction", icon: "👯" },
      { id: "solving-number-problems", name: "Solving Number Problems", icon: "🧩" },
      { id: "using-two-digit-numbers", name: "Using Two-Digit Numbers", icon: "🔟" },
      { id: "solving-missing-number-problems", name: "Solving Missing Number Problems", icon: "🔍" }
    ]
  },
  {
    title: "Number - Multiplication and Division",
    topics: [
      { id: "what-is-multiplication", name: "What is Multiplication?", icon: "✖️" },
      { id: "what-is-division", name: "What is Division?", icon: "➗" },
      { id: "2-5-and-10-multiplication-tables", name: "2, 5 and 10 Multiplication Tables", icon: "🖐️" },
      { id: "division-problems", name: "Division Problems", icon: "🍪" },
      { id: "connecting-multiplication-and-division", name: "Connecting Multiplication and Division", icon: "🔗" },
      { id: "doubling-and-halving-using-multiplication-and-division", name: "Doubling and Halving using Multiplication and Division", icon: "🪞" },
      { id: "solving-multiplication-and-division-problems", name: "Solving Multiplication and Division Problems", icon: "🧮" }
    ]
  },
  {
    title: "Number - Fractions",
    topics: [
      { id: "what-is-a-fraction", name: "What is a Fraction?", icon: "🍕" },
      { id: "fractions-of-numbers", name: "Fractions of Numbers", icon: "🍰" },
      { id: "finding-fractions-of-larger-groups", name: "Finding Fractions of Larger Groups", icon: "🍓" }
    ]
  },
  {
    title: "Measurement",
    topics: [
      { id: "measuring-length-and-height", name: "Measuring Length and Height", icon: "📏" },
      { id: "measuring-weight-and-volume", name: "Measuring Weight and Volume", icon: "🧪" },
      { id: "comparing-measurements", name: "Comparing Measurements", icon: "⚖️" },
      { id: "measuring-temperature", name: "Measuring Temperature", icon: "🌡️" },
      { id: "measuring-time", name: "Measuring Time", icon: "⏰" },
      { id: "standard-units-of-money", name: "Standard Units of Money", icon: "🪙" },
      { id: "money-problems", name: "Money Problems", icon: "💰" }
    ]
  },
  {
    title: "Geometry – Properties of Shapes",
    topics: [
      { id: "2-d-shapes", name: "2-D Shapes", icon: "🔺" },
      { id: "3-d-shapes", name: "3-D Shapes", icon: "🧊" },
      { id: "different-shapes", name: "Different Shapes", icon: "🔷" }
    ]
  },
  {
    title: "Geometry – Position and Direction",
    topics: [
      { id: "patterns", name: "Patterns", icon: "🌈" },
      { id: "sequences", name: "Sequences", icon: "🐛" },
      { id: "quarter-turns-and-half-turns", name: "Quarter Turns and Half Turns", icon: "🔄" },
      { id: "right-angle-turns", name: "Right-Angle Turns", icon: "🤖" }
    ]
  },
  {
    title: "Statistics",
    topics: [
      { id: "pictograms", name: "Pictograms", icon: "🖼️" },
      { id: "tally-charts", name: "Tally Charts", icon: "✏️" },
      { id: "block-diagrams", name: "Block Diagrams", icon: "📊" },
      { id: "tables", name: "Tables", icon: "📋" },
      { id: "gathering-information-and-using-data", name: "Gathering Information and Using Data", icon: "🔎" }
    ]
  }
];

export const year2MathCurriculum = rawCurriculum.map(category => ({
  id: toKebabCase(category.title),
  title: category.title,
  topics: category.topics.map(topic => ({
    id: toKebabCase(topic.name),
    name: topic.name,
    icon: topic.icon,
    challenges: [
      { id: 1, title: "Challenge 1" },
      { id: 2, title: "Challenge 2" },
      { id: 3, title: "Challenge 3" },
      { id: 4, title: "Challenge 4" }
    ]
  }))
}));
