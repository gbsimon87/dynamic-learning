import { toKebabCase } from "../utils/toKebabCase.js";

// Titles are permanent URL/progress identifiers. Source: docs/curriculum/year-6-maths.md.
// The complete course tree is registered; missing challenge modules remain unavailable.
const rawCurriculum = [
  {
    "title": "Number – Number and place value",
    "topics": [
      {
        "name": "Place Value to Ten Million",
        "icon": "🔢"
      },
      {
        "name": "Rounding Whole Numbers",
        "icon": "🔢"
      },
      {
        "name": "Negative Numbers and Intervals",
        "icon": "🔢"
      },
      {
        "name": "Place Value Problems",
        "icon": "🔢"
      }
    ]
  },
  {
    "title": "Number – Addition, subtraction, multiplication and division",
    "topics": [
      {
        "name": "Long Multiplication",
        "icon": "✖️"
      },
      {
        "name": "Long Division and Remainders",
        "icon": "✖️"
      },
      {
        "name": "Short Division and Remainders",
        "icon": "✖️"
      },
      {
        "name": "Mental Calculation Strategies",
        "icon": "✖️"
      },
      {
        "name": "Factors, Multiples and Primes",
        "icon": "✖️"
      },
      {
        "name": "Order of Operations",
        "icon": "✖️"
      },
      {
        "name": "Multi-Step Addition and Subtraction",
        "icon": "✖️"
      },
      {
        "name": "Four-Operation Problems",
        "icon": "✖️"
      },
      {
        "name": "Estimating and Checking Answers",
        "icon": "✖️"
      }
    ]
  },
  {
    "title": "Number – Fractions (including decimals and percentages)",
    "topics": [
      {
        "name": "Simplifying Fractions and Common Denominators",
        "icon": "🍰"
      },
      {
        "name": "Comparing and Ordering Fractions",
        "icon": "🍰"
      },
      {
        "name": "Adding and Subtracting Fractions and Mixed Numbers",
        "icon": "🍰"
      },
      {
        "name": "Multiplying Proper Fractions",
        "icon": "🍰"
      },
      {
        "name": "Dividing Fractions by Whole Numbers",
        "icon": "🍰"
      },
      {
        "name": "Fractions as Division and Decimals",
        "icon": "🍰"
      },
      {
        "name": "Decimal Place Value and Powers of Ten",
        "icon": "🍰"
      },
      {
        "name": "Multiplying Decimals",
        "icon": "🍰"
      },
      {
        "name": "Written Division with Decimal Answers",
        "icon": "🍰"
      },
      {
        "name": "Rounding Decimal Answers",
        "icon": "🍰"
      },
      {
        "name": "Fraction, Decimal and Percentage Equivalences",
        "icon": "🍰"
      }
    ]
  },
  {
    "title": "Ratio and proportion",
    "topics": [
      {
        "name": "Ratio and Missing Quantities",
        "icon": "⚖️"
      },
      {
        "name": "Percentages of Amounts and Comparisons",
        "icon": "⚖️"
      },
      {
        "name": "Similar Shapes and Scale Factors",
        "icon": "⚖️"
      },
      {
        "name": "Unequal Sharing and Grouping",
        "icon": "⚖️"
      }
    ]
  },
  {
    "title": "Algebra",
    "topics": [
      {
        "name": "Using Formulae",
        "icon": "🔤"
      },
      {
        "name": "Linear Number Sequences",
        "icon": "🔤"
      },
      {
        "name": "Missing Numbers and Expressions",
        "icon": "🔤"
      },
      {
        "name": "Equations with Two Unknowns",
        "icon": "🔤"
      },
      {
        "name": "Finding All Combinations",
        "icon": "🔤"
      }
    ]
  },
  {
    "title": "Measurement",
    "topics": [
      {
        "name": "Measurement Problems",
        "icon": "📏"
      },
      {
        "name": "Converting Standard Units",
        "icon": "📏"
      },
      {
        "name": "Miles and Kilometres",
        "icon": "📏"
      },
      {
        "name": "Area and Perimeter Relationships",
        "icon": "📏"
      },
      {
        "name": "Area and Volume Formulae",
        "icon": "📏"
      },
      {
        "name": "Areas of Triangles and Parallelograms",
        "icon": "📏"
      },
      {
        "name": "Volumes of Cubes and Cuboids",
        "icon": "📏"
      }
    ]
  },
  {
    "title": "Geometry – Properties of shapes",
    "topics": [
      {
        "name": "Drawing Shapes from Dimensions and Angles",
        "icon": "🔷"
      },
      {
        "name": "3-D Shapes and Nets",
        "icon": "🔷"
      },
      {
        "name": "Classifying Shapes and Finding Angles",
        "icon": "🔷"
      },
      {
        "name": "Parts of Circles",
        "icon": "🔷"
      },
      {
        "name": "Missing Angles",
        "icon": "🔷"
      }
    ]
  },
  {
    "title": "Geometry – Position and direction",
    "topics": [
      {
        "name": "Coordinates in Four Quadrants",
        "icon": "📍"
      },
      {
        "name": "Drawing, Translating and Reflecting Shapes",
        "icon": "📍"
      }
    ]
  },
  {
    "title": "Statistics",
    "topics": [
      {
        "name": "Pie Charts and Line Graphs",
        "icon": "📊"
      },
      {
        "name": "The Mean",
        "icon": "📊"
      }
    ]
  }
];

export const year6MathCurriculum = rawCurriculum.map(({ title, topics }) => ({
  id: toKebabCase(title), title,
  topics: topics.map(({ name, icon }) => {
    const id = toKebabCase(name);
    return {
      id, name, icon, builder: id,
      challenges: [1, 2, 3, 4].map((challengeId) => ({ id: challengeId, title: `Challenge ${challengeId}` })),
    };
  }),
}));
