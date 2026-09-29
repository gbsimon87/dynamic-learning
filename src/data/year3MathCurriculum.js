import { toKebabCase } from "../utils/toKebabCase.js";

/**
 * UK Year 3 Maths — the national curriculum programme of study.
 *
 * Source: docs/curriculum/year-3-maths.md (Department for Education, OGL v3.0).
 * Every topic below traces to a statutory bullet in that document. Non-statutory
 * guidance shapes the challenges, never the topic list.
 *
 * Year 3 has SEVEN categories, not Year 2's eight: the programme of study has no
 * "Position and Direction" strand at this year. That is correct, not an omission.
 *
 * ⚠️ Titles are identifiers. Every id below is recomputed from the title/name by
 * `toKebabCase`, and those ids are used in URLs, as challenge directory names,
 * and as keys inside a learner's saved progress. Renaming a title silently
 * orphans completed work — there is no migration path. Treat a rename as a
 * migration, not an edit.
 *
 * The `id` fields written by hand here are ignored by the export; they are kept
 * only so the source list reads the way the Year 2 dataset does.
 */
const rawCurriculum = [
  {
    title: "Number - Number and Place Value",
    topics: [
      { id: "counting-in-multiples-of-4-8-50-and-100", name: "Counting in Multiples of 4, 8, 50 and 100", icon: "🐸" },
      { id: "finding-10-or-100-more-or-less", name: "Finding 10 or 100 More or Less", icon: "💯" },
      { id: "place-value-in-3-digit-numbers", name: "Place Value in 3-Digit Numbers", icon: "🏗️" },
      { id: "comparing-and-ordering-numbers-to-1000", name: "Comparing and Ordering Numbers to 1000", icon: "🪜" },
      { id: "representing-and-estimating-numbers", name: "Representing and Estimating Numbers", icon: "🎯" },
      { id: "reading-and-writing-numbers-to-1000", name: "Reading and Writing Numbers to 1000", icon: "📖" },
      { id: "number-and-place-value-problems", name: "Number and Place Value Problems", icon: "🧩" }
    ]
  },
  {
    title: "Number - Addition and Subtraction",
    topics: [
      { id: "adding-and-subtracting-ones-tens-and-hundreds", name: "Adding and Subtracting Ones, Tens and Hundreds", icon: "🔢" },
      { id: "column-addition", name: "Column Addition", icon: "➕" },
      { id: "column-subtraction", name: "Column Subtraction", icon: "➖" },
      { id: "estimating-and-checking-answers", name: "Estimating and Checking Answers", icon: "✅" },
      { id: "missing-number-problems", name: "Missing Number Problems", icon: "🔍" },
      { id: "addition-and-subtraction-problems", name: "Addition and Subtraction Problems", icon: "🧠" }
    ]
  },
  {
    title: "Number - Multiplication and Division",
    topics: [
      { id: "3-and-4-times-tables", name: "3 and 4 Times Tables", icon: "🍀" },
      { id: "the-8-times-table", name: "The 8 Times Table", icon: "🐙" },
      { id: "multiplying-and-dividing-two-digit-numbers", name: "Multiplying and Dividing Two-Digit Numbers", icon: "✖️" },
      { id: "scaling-and-correspondence-problems", name: "Scaling and Correspondence Problems", icon: "🐘" },
      { id: "multiplication-and-division-problems", name: "Multiplication and Division Problems", icon: "🧮" }
    ]
  },
  {
    title: "Number - Fractions",
    topics: [
      { id: "tenths", name: "Tenths", icon: "🔟" },
      { id: "fractions-of-a-set-of-objects", name: "Fractions of a Set of Objects", icon: "🍇" },
      { id: "fractions-as-numbers", name: "Fractions as Numbers", icon: "📍" },
      { id: "equivalent-fractions", name: "Equivalent Fractions", icon: "🟰" },
      { id: "adding-and-subtracting-fractions", name: "Adding and Subtracting Fractions", icon: "🥧" },
      { id: "comparing-and-ordering-fractions", name: "Comparing and Ordering Fractions", icon: "🍫" },
      { id: "fraction-problems", name: "Fraction Problems", icon: "🍉" }
    ]
  },
  {
    title: "Measurement",
    topics: [
      { id: "measuring-length-in-mm-cm-and-m", name: "Measuring Length in mm, cm and m", icon: "📏" },
      { id: "measuring-mass", name: "Measuring Mass", icon: "🏋️" },
      { id: "measuring-volume-and-capacity", name: "Measuring Volume and Capacity", icon: "🥛" },
      { id: "adding-and-subtracting-measurements", name: "Adding and Subtracting Measurements", icon: "🧪" },
      { id: "perimeter-of-2-d-shapes", name: "Perimeter of 2-D Shapes", icon: "🚧" },
      { id: "money-and-giving-change", name: "Money and Giving Change", icon: "💷" },
      { id: "telling-the-time-to-the-minute", name: "Telling the Time to the Minute", icon: "⏱️" },
      { id: "roman-numerals-and-24-hour-clocks", name: "Roman Numerals and 24-Hour Clocks", icon: "🏛️" },
      { id: "units-of-time-and-durations", name: "Units of Time and Durations", icon: "⌛" }
    ]
  },
  {
    title: "Geometry – Properties of Shapes",
    topics: [
      { id: "drawing-2-d-shapes", name: "Drawing 2-D Shapes", icon: "✏️" },
      { id: "making-and-recognising-3-d-shapes", name: "Making and Recognising 3-D Shapes", icon: "🎲" },
      { id: "angles-as-turns", name: "Angles as Turns", icon: "🧭" },
      { id: "right-angles", name: "Right Angles", icon: "📐" },
      { id: "comparing-angles-to-a-right-angle", name: "Comparing Angles to a Right Angle", icon: "🔺" },
      { id: "horizontal-vertical-parallel-and-perpendicular-lines", name: "Horizontal, Vertical, Parallel and Perpendicular Lines", icon: "🛤️" }
    ]
  },
  {
    title: "Statistics",
    topics: [
      { id: "bar-charts", name: "Bar Charts", icon: "📊" },
      { id: "scaled-pictograms", name: "Scaled Pictograms", icon: "🖼️" },
      { id: "tables", name: "Tables", icon: "📋" },
      { id: "one-step-and-two-step-questions", name: "One-Step and Two-Step Questions", icon: "👣" }
    ]
  }
];

export const year3MathCurriculum = rawCurriculum.map(category => ({
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
