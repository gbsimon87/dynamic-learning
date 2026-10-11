import { toKebabCase } from "../utils/toKebabCase.js";

// Titles are persistent identifiers. Source and mapping: docs/curriculum/year-4-maths.md.
const rawCurriculum = [
  {
    "title": "Number - Number and Place Value",
    "topics": [
      {
        "name": "Counting in Multiples of 6, 7, 9, 25 and 1000",
        "builder": "count",
        "icon": "🔢"
      },
      {
        "name": "Finding 1000 More or Less",
        "builder": "more",
        "icon": "🔢"
      },
      {
        "name": "Counting Backwards Through Zero",
        "builder": "negative",
        "icon": "🔢"
      },
      {
        "name": "Place Value in 4-Digit Numbers",
        "builder": "place",
        "icon": "🔢"
      },
      {
        "name": "Ordering and Comparing Numbers Beyond 1000",
        "builder": "compare",
        "icon": "🔢"
      },
      {
        "name": "Representing and Estimating Numbers",
        "builder": "represent",
        "icon": "🔢"
      },
      {
        "name": "Rounding to 10, 100 and 1000",
        "builder": "round",
        "icon": "🔢"
      },
      {
        "name": "Place Value Problems",
        "builder": "placeProblems",
        "icon": "🔢"
      },
      {
        "name": "Roman Numerals to 100",
        "builder": "roman",
        "icon": "🔢"
      }
    ]
  },
  {
    "title": "Number - Addition and Subtraction",
    "topics": [
      {
        "name": "Column Addition and Subtraction",
        "builder": "columns",
        "icon": "➕"
      },
      {
        "name": "Estimating and Checking Calculations",
        "builder": "inverse",
        "icon": "➕"
      },
      {
        "name": "Two-Step Addition and Subtraction Problems",
        "builder": "addProblems",
        "icon": "➕"
      }
    ]
  },
  {
    "title": "Number - Multiplication and Division",
    "topics": [
      {
        "name": "Multiplication and Division Facts to 12",
        "builder": "tables",
        "icon": "✖️"
      },
      {
        "name": "Mental Multiplication and Division",
        "builder": "mental",
        "icon": "✖️"
      },
      {
        "name": "Factor Pairs and Commutativity",
        "builder": "factors",
        "icon": "✖️"
      },
      {
        "name": "Written Multiplication",
        "builder": "written",
        "icon": "✖️"
      },
      {
        "name": "Scaling and Correspondence Problems",
        "builder": "mulProblems",
        "icon": "✖️"
      }
    ]
  },
  {
    "title": "Number - Fractions including Decimals",
    "topics": [
      {
        "name": "Equivalent Fraction Families",
        "builder": "equivalent",
        "icon": "🍰"
      },
      {
        "name": "Counting in Hundredths",
        "builder": "hundredths",
        "icon": "🍰"
      },
      {
        "name": "Fractions of Quantities",
        "builder": "fractionSets",
        "icon": "🍰"
      },
      {
        "name": "Adding and Subtracting Fractions",
        "builder": "fractionCalc",
        "icon": "🍰"
      },
      {
        "name": "Tenths and Hundredths as Decimals",
        "builder": "decimal",
        "icon": "🍰"
      },
      {
        "name": "Decimal Equivalents of Quarters and Halves",
        "builder": "quarters",
        "icon": "🍰"
      },
      {
        "name": "Dividing by 10 and 100",
        "builder": "decimalDivide",
        "icon": "🍰"
      },
      {
        "name": "Rounding Decimals",
        "builder": "decimalRound",
        "icon": "🍰"
      },
      {
        "name": "Comparing and Ordering Decimals",
        "builder": "decimalCompare",
        "icon": "🍰"
      },
      {
        "name": "Fraction and Decimal Problems",
        "builder": "decimalProblems",
        "icon": "🍰"
      }
    ]
  },
  {
    "title": "Measurement",
    "topics": [
      {
        "name": "Converting Units of Measure",
        "builder": "units",
        "icon": "📏"
      },
      {
        "name": "Perimeter of Rectilinear Shapes",
        "builder": "perimeter",
        "icon": "📏"
      },
      {
        "name": "Area by Counting Squares",
        "builder": "area",
        "icon": "📏"
      },
      {
        "name": "Measures and Money",
        "builder": "money",
        "icon": "📏"
      },
      {
        "name": "Analogue and Digital Time",
        "builder": "time",
        "icon": "📏"
      },
      {
        "name": "Time Conversion Problems",
        "builder": "timeProblems",
        "icon": "📏"
      }
    ]
  },
  {
    "title": "Geometry – Properties of Shapes",
    "topics": [
      {
        "name": "Classifying Triangles and Quadrilaterals",
        "builder": "shapes",
        "icon": "🔷"
      },
      {
        "name": "Acute and Obtuse Angles",
        "builder": "angles",
        "icon": "🔷"
      },
      {
        "name": "Lines of Symmetry",
        "builder": "symmetry",
        "icon": "🔷"
      },
      {
        "name": "Completing Symmetric Figures",
        "builder": "reflect",
        "icon": "🔷"
      }
    ]
  },
  {
    "title": "Geometry – Position and Direction",
    "topics": [
      {
        "name": "Coordinates in the First Quadrant",
        "builder": "coordinates",
        "icon": "📍"
      },
      {
        "name": "Translations on a Grid",
        "builder": "translation",
        "icon": "📍"
      },
      {
        "name": "Plotting Points and Completing Polygons",
        "builder": "polygon",
        "icon": "📍"
      }
    ]
  },
  {
    "title": "Statistics",
    "topics": [
      {
        "name": "Bar Charts and Time Graphs",
        "builder": "graphs",
        "icon": "📊"
      },
      {
        "name": "Comparing and Calculating with Data",
        "builder": "data",
        "icon": "📊"
      }
    ]
  }
];

export const year4MathCurriculum = rawCurriculum.map(({ title, topics }) => ({
  id: toKebabCase(title), title,
  topics: topics.map(({ name, icon, builder }) => ({
    id: toKebabCase(name), name, icon, builder,
    challenges: [1, 2, 3, 4].map((id) => ({ id, title: `Challenge ${id}` })),
  })),
}));
