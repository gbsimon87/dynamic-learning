import { toKebabCase } from "../utils/toKebabCase";

const rawCurriculum = [
  {
    title: "Number - Number and Place Value",
    topics: [
      { id: "numbers-and-counting", name: "Numbers and Counting" },
      { id: "counting-forwards-and-backwards", name: "Counting Forwards and Backwards" },
      { id: "counting-in-steps-of-2-3-5-and-10", name: "Counting in Steps of 2, 3, 5 and 10" },
      { id: "counting-more-and-less", name: "Counting More and Less" },
      { id: "place-value", name: "Place Value" },
      { id: "less-than-greater-than-and-equal-to", name: "Less Than, Greater Than and Equal To" }
    ]
  },
  {
    title: "Number - Addition and Subtraction",
    topics: [
      { id: "doubling-and-halving-using-addition-and-subtraction", name: "Doubling and Halving using Addition and Subtraction" },
      { id: "solving-number-problems", name: "Solving Number Problems" },
      { id: "using-two-digit-numbers", name: "Using Two-Digit Numbers" },
      { id: "solving-missing-number-problems", name: "Solving Missing Number Problems" }
    ]
  },
  {
    title: "Number - Multiplication and Division",
    topics: [
      { id: "what-is-multiplication", name: "What is Multiplication?" },
      { id: "what-is-division", name: "What is Division?" },
      { id: "2-5-and-10-multiplication-tables", name: "2, 5 and 10 Multiplication Tables" },
      { id: "division-problems", name: "Division Problems" },
      { id: "connecting-multiplication-and-division", name: "Connecting Multiplication and Division" },
      { id: "doubling-and-halving-using-multiplication-and-division", name: "Doubling and Halving using Multiplication and Division" },
      { id: "solving-multiplication-and-division-problems", name: "Solving Multiplication and Division Problems" }
    ]
  },
  {
    title: "Number - Fractions",
    topics: [
      { id: "what-is-a-fraction", name: "What is a Fraction?" },
      { id: "fractions-of-numbers", name: "Fractions of Numbers" },
      { id: "finding-fractions-of-larger-groups", name: "Finding Fractions of Larger Groups" }
    ]
  },
  {
    title: "Measurement",
    topics: [
      { id: "measuring-length-and-height", name: "Measuring Length and Height" },
      { id: "measuring-weight-and-volume", name: "Measuring Weight and Volume" },
      { id: "comparing-measurements", name: "Comparing Measurements" },
      { id: "measuring-temperature", name: "Measuring Temperature" },
      { id: "measuring-time", name: "Measuring Time" },
      { id: "standard-units-of-money", name: "Standard Units of Money" },
      { id: "money-problems", name: "Money Problems" }
    ]
  },
  {
    title: "Geometry – Properties of Shapes",
    topics: [
      { id: "2-d-shapes", name: "2-D Shapes" },
      { id: "3-d-shapes", name: "3-D Shapes" },
      { id: "different-shapes", name: "Different Shapes" }
    ]
  },
  {
    title: "Geometry – Position and Direction",
    topics: [
      { id: "patterns", name: "Patterns" },
      { id: "sequences", name: "Sequences" },
      { id: "quarter-turns-and-half-turns", name: "Quarter Turns and Half Turns" },
      { id: "right-angle-turns", name: "Right-Angle Turns" }
    ]
  },
  {
    title: "Statistics",
    topics: [
      { id: "pictograms", name: "Pictograms" },
      { id: "tally-charts", name: "Tally Charts" },
      { id: "block-diagrams", name: "Block Diagrams" },
      { id: "tables", name: "Tables" },
      { id: "gathering-information-and-using-data", name: "Gathering Information and Using Data" }
    ]
  }
];

export const year2MathCurriculum = rawCurriculum.map(category => ({
  id: toKebabCase(category.title),
  title: category.title,
  topics: category.topics.map(topic => ({
    id: toKebabCase(topic.name),
    name: topic.name,
    challenges: [
      { id: 1, title: "Challenge 1" },
      { id: 2, title: "Challenge 2" },
      { id: 3, title: "Challenge 3" },
      { id: 4, title: "Challenge 4" }
    ]
  }))
}));
