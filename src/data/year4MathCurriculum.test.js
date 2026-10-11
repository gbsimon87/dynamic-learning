import test from "node:test";
import assert from "node:assert/strict";
import { year4MathCurriculum } from "./year4MathCurriculum.js";

// Persistent URL/progress identifiers: changing these requires a migration.
const LOCKED_IDS = [
  [
    "number---number-and-place-value",
    [
      "counting-in-multiples-of-6-7-9-25-and-1000",
      "finding-1000-more-or-less",
      "counting-backwards-through-zero",
      "place-value-in-4-digit-numbers",
      "ordering-and-comparing-numbers-beyond-1000",
      "representing-and-estimating-numbers",
      "rounding-to-10-100-and-1000",
      "place-value-problems",
      "roman-numerals-to-100"
    ]
  ],
  [
    "number---addition-and-subtraction",
    [
      "column-addition-and-subtraction",
      "estimating-and-checking-calculations",
      "two-step-addition-and-subtraction-problems"
    ]
  ],
  [
    "number---multiplication-and-division",
    [
      "multiplication-and-division-facts-to-12",
      "mental-multiplication-and-division",
      "factor-pairs-and-commutativity",
      "written-multiplication",
      "scaling-and-correspondence-problems"
    ]
  ],
  [
    "number---fractions-including-decimals",
    [
      "equivalent-fraction-families",
      "counting-in-hundredths",
      "fractions-of-quantities",
      "adding-and-subtracting-fractions",
      "tenths-and-hundredths-as-decimals",
      "decimal-equivalents-of-quarters-and-halves",
      "dividing-by-10-and-100",
      "rounding-decimals",
      "comparing-and-ordering-decimals",
      "fraction-and-decimal-problems"
    ]
  ],
  [
    "measurement",
    [
      "converting-units-of-measure",
      "perimeter-of-rectilinear-shapes",
      "area-by-counting-squares",
      "measures-and-money",
      "analogue-and-digital-time",
      "time-conversion-problems"
    ]
  ],
  [
    "geometry-properties-of-shapes",
    [
      "classifying-triangles-and-quadrilaterals",
      "acute-and-obtuse-angles",
      "lines-of-symmetry",
      "completing-symmetric-figures"
    ]
  ],
  [
    "geometry-position-and-direction",
    [
      "coordinates-in-the-first-quadrant",
      "translations-on-a-grid",
      "plotting-points-and-completing-polygons"
    ]
  ],
  [
    "statistics",
    [
      "bar-charts-and-time-graphs",
      "comparing-and-calculating-with-data"
    ]
  ]
];

test("Year 4 Maths persistent identifiers remain unchanged", () => {
  assert.deepEqual(year4MathCurriculum.map(c => [c.id, c.topics.map(t => t.id)]), LOCKED_IDS);
});
