import { toKebabCase } from "../utils/toKebabCase.js";

// Titles are persistent identifiers. Source and mapping: docs/curriculum/year-5-maths.md.
// `builder` names the question bank in challenges/year5Math/ that the topic's four challenges draw on.
const rawCurriculum = [
  {
    "title": "Number - Number and Place Value",
    "topics": [
      { "name": "Place Value to a Million", "builder": "place", "icon": "🔢" },
      { "name": "Ordering and Comparing Numbers to a Million", "builder": "compare", "icon": "🔢" },
      { "name": "Counting in Steps and Number Sequences", "builder": "steps", "icon": "🔢" },
      { "name": "Negative Numbers and Counting Through Zero", "builder": "negative", "icon": "🔢" },
      { "name": "Rounding Large Numbers", "builder": "round", "icon": "🔢" },
      { "name": "Roman Numerals to 1000", "builder": "roman", "icon": "🔢" },
      { "name": "Large Number Problems", "builder": "bigProblems", "icon": "🔢" }
    ]
  },
  {
    "title": "Number - Addition and Subtraction",
    "topics": [
      { "name": "Column Addition and Subtraction with Large Numbers", "builder": "columns", "icon": "➕" },
      { "name": "Mental Addition and Subtraction with Large Numbers", "builder": "mental", "icon": "➕" },
      { "name": "Rounding to Check Answers", "builder": "check", "icon": "➕" },
      { "name": "Multi-Step Addition and Subtraction Problems", "builder": "addProblems", "icon": "➕" }
    ]
  },
  {
    "title": "Number - Multiplication and Division",
    "topics": [
      { "name": "Multiples and Factors", "builder": "factors", "icon": "✖️" },
      { "name": "Prime and Composite Numbers", "builder": "primes", "icon": "✖️" },
      { "name": "Written Multiplication", "builder": "written", "icon": "✖️" },
      { "name": "Long Multiplication", "builder": "long", "icon": "✖️" },
      { "name": "Mental Multiplication and Division", "builder": "mentalMul", "icon": "✖️" },
      { "name": "Short Division and Remainders", "builder": "division", "icon": "✖️" },
      { "name": "Multiplying and Dividing by 10, 100 and 1000", "builder": "scale10", "icon": "✖️" },
      { "name": "Square and Cube Numbers", "builder": "powers", "icon": "✖️" },
      { "name": "Scaling and Rate Problems", "builder": "rates", "icon": "✖️" },
      { "name": "Four Operations and the Equals Sign", "builder": "operations", "icon": "✖️" }
    ]
  },
  {
    "title": "Number - Fractions (including Decimals and Percentages)",
    "topics": [
      { "name": "Comparing and Ordering Fractions", "builder": "fcompare", "icon": "🍰" },
      { "name": "Equivalent Fractions", "builder": "equivalent", "icon": "🍰" },
      { "name": "Mixed Numbers and Improper Fractions", "builder": "mixed", "icon": "🍰" },
      { "name": "Adding and Subtracting Fractions", "builder": "fractionCalc", "icon": "🍰" },
      { "name": "Multiplying Fractions by Whole Numbers", "builder": "fractionMul", "icon": "🍰" },
      { "name": "Decimals as Fractions and Thousandths", "builder": "decimalFractions", "icon": "🍰" },
      { "name": "Rounding, Ordering and Comparing Decimals", "builder": "decimalOrder", "icon": "🍰" },
      { "name": "Adding and Subtracting Decimals", "builder": "decimalCalc", "icon": "🍰" },
      { "name": "Percentages, Fractions and Decimals", "builder": "percent", "icon": "🍰" }
    ]
  },
  {
    "title": "Measurement",
    "topics": [
      { "name": "Converting Metric Units", "builder": "metric", "icon": "📏" },
      { "name": "Metric and Imperial Equivalents", "builder": "imperial", "icon": "📏" },
      { "name": "Perimeter of Composite Rectilinear Shapes", "builder": "perimeter", "icon": "📏" },
      { "name": "Area of Rectangles", "builder": "area", "icon": "📏" },
      { "name": "Estimating Area, Volume and Capacity", "builder": "estimate", "icon": "📏" },
      { "name": "Converting Units of Time", "builder": "time", "icon": "📏" },
      { "name": "Measurement Problems", "builder": "measureProblems", "icon": "📏" }
    ]
  },
  {
    "title": "Geometry – Properties of Shapes",
    "topics": [
      { "name": "3-D Shapes from 2-D Drawings", "builder": "solids", "icon": "🔷" },
      { "name": "Estimating, Measuring and Drawing Angles", "builder": "angles", "icon": "🔷" },
      { "name": "Angles at a Point and on a Straight Line", "builder": "angleFacts", "icon": "🔷" },
      { "name": "Properties of Rectangles", "builder": "rectangles", "icon": "🔷" },
      { "name": "Regular and Irregular Polygons", "builder": "polygons", "icon": "🔷" }
    ]
  },
  {
    "title": "Geometry – Position and Direction",
    "topics": [
      { "name": "Reflecting Shapes", "builder": "reflect", "icon": "📍" },
      { "name": "Translating Shapes", "builder": "translate", "icon": "📍" }
    ]
  },
  {
    "title": "Statistics",
    "topics": [
      { "name": "Reading Line Graphs", "builder": "lineGraphs", "icon": "📊" },
      { "name": "Tables and Timetables", "builder": "timetables", "icon": "📊" }
    ]
  }
];

export const year5MathCurriculum = rawCurriculum.map(({ title, topics }) => ({
  id: toKebabCase(title), title,
  topics: topics.map(({ name, icon, builder }) => ({
    id: toKebabCase(name), name, icon, builder,
    challenges: [1, 2, 3, 4].map((id) => ({ id, title: `Challenge ${id}` })),
  })),
}));
