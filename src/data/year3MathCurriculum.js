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
      { id: "counting-in-multiples-of-4-8-50-and-100", name: "Counting in Multiples of 4, 8, 50 and 100" },
      { id: "finding-10-or-100-more-or-less", name: "Finding 10 or 100 More or Less" },
      { id: "place-value-in-3-digit-numbers", name: "Place Value in 3-Digit Numbers" },
      { id: "comparing-and-ordering-numbers-to-1000", name: "Comparing and Ordering Numbers to 1000" },
      { id: "representing-and-estimating-numbers", name: "Representing and Estimating Numbers" },
      { id: "reading-and-writing-numbers-to-1000", name: "Reading and Writing Numbers to 1000" },
      { id: "number-and-place-value-problems", name: "Number and Place Value Problems" }
    ]
  },
  {
    title: "Number - Addition and Subtraction",
    topics: [
      { id: "adding-and-subtracting-ones-tens-and-hundreds", name: "Adding and Subtracting Ones, Tens and Hundreds" },
      { id: "column-addition", name: "Column Addition" },
      { id: "column-subtraction", name: "Column Subtraction" },
      { id: "estimating-and-checking-answers", name: "Estimating and Checking Answers" },
      { id: "missing-number-problems", name: "Missing Number Problems" },
      { id: "addition-and-subtraction-problems", name: "Addition and Subtraction Problems" }
    ]
  },
  {
    title: "Number - Multiplication and Division",
    topics: [
      { id: "3-and-4-times-tables", name: "3 and 4 Times Tables" },
      { id: "the-8-times-table", name: "The 8 Times Table" },
      { id: "multiplying-and-dividing-two-digit-numbers", name: "Multiplying and Dividing Two-Digit Numbers" },
      { id: "scaling-and-correspondence-problems", name: "Scaling and Correspondence Problems" },
      { id: "multiplication-and-division-problems", name: "Multiplication and Division Problems" }
    ]
  },
  {
    title: "Number - Fractions",
    topics: [
      { id: "tenths", name: "Tenths" },
      { id: "fractions-of-a-set-of-objects", name: "Fractions of a Set of Objects" },
      { id: "fractions-as-numbers", name: "Fractions as Numbers" },
      { id: "equivalent-fractions", name: "Equivalent Fractions" },
      { id: "adding-and-subtracting-fractions", name: "Adding and Subtracting Fractions" },
      { id: "comparing-and-ordering-fractions", name: "Comparing and Ordering Fractions" },
      { id: "fraction-problems", name: "Fraction Problems" }
    ]
  },
  {
    title: "Measurement",
    topics: [
      { id: "measuring-length-in-mm-cm-and-m", name: "Measuring Length in mm, cm and m" },
      { id: "measuring-mass", name: "Measuring Mass" },
      { id: "measuring-volume-and-capacity", name: "Measuring Volume and Capacity" },
      { id: "adding-and-subtracting-measurements", name: "Adding and Subtracting Measurements" },
      { id: "perimeter-of-2-d-shapes", name: "Perimeter of 2-D Shapes" },
      { id: "money-and-giving-change", name: "Money and Giving Change" },
      { id: "telling-the-time-to-the-minute", name: "Telling the Time to the Minute" },
      { id: "roman-numerals-and-24-hour-clocks", name: "Roman Numerals and 24-Hour Clocks" },
      { id: "units-of-time-and-durations", name: "Units of Time and Durations" }
    ]
  },
  {
    title: "Geometry – Properties of Shapes",
    topics: [
      { id: "drawing-2-d-shapes", name: "Drawing 2-D Shapes" },
      { id: "making-and-recognising-3-d-shapes", name: "Making and Recognising 3-D Shapes" },
      { id: "angles-as-turns", name: "Angles as Turns" },
      { id: "right-angles", name: "Right Angles" },
      { id: "comparing-angles-to-a-right-angle", name: "Comparing Angles to a Right Angle" },
      { id: "horizontal-vertical-parallel-and-perpendicular-lines", name: "Horizontal, Vertical, Parallel and Perpendicular Lines" }
    ]
  },
  {
    title: "Statistics",
    topics: [
      { id: "bar-charts", name: "Bar Charts" },
      { id: "scaled-pictograms", name: "Scaled Pictograms" },
      { id: "tables", name: "Tables" },
      { id: "one-step-and-two-step-questions", name: "One-Step and Two-Step Questions" }
    ]
  }
];

export const year3MathCurriculum = rawCurriculum.map(category => ({
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
