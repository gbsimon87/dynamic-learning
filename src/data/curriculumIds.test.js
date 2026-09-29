import test from "node:test";
import assert from "node:assert/strict";
import { year2MathCurriculum } from "./year2MathCurriculum.js";
import { year3MathCurriculum } from "./year3MathCurriculum.js";

/**
 * Category and topic ids are keys inside every learner's saved progress, so a
 * change here silently orphans completed work. This list is the ids as they
 * stood on 2026-09-29, when topic icons were added; an edit that moves one
 * should fail loudly here and be treated as a migration, not an update.
 */
const LOCKED_IDS = {
  "2": [
    [
      "number---number-and-place-value",
      [
        "numbers-and-counting",
        "counting-forwards-and-backwards",
        "counting-in-steps-of-2-3-5-and-10",
        "counting-more-and-less",
        "place-value",
        "less-than-greater-than-and-equal-to"
      ]
    ],
    [
      "number---addition-and-subtraction",
      [
        "doubling-and-halving-using-addition-and-subtraction",
        "solving-number-problems",
        "using-two-digit-numbers",
        "solving-missing-number-problems"
      ]
    ],
    [
      "number---multiplication-and-division",
      [
        "what-is-multiplication",
        "what-is-division",
        "2-5-and-10-multiplication-tables",
        "division-problems",
        "connecting-multiplication-and-division",
        "doubling-and-halving-using-multiplication-and-division",
        "solving-multiplication-and-division-problems"
      ]
    ],
    [
      "number---fractions",
      [
        "what-is-a-fraction",
        "fractions-of-numbers",
        "finding-fractions-of-larger-groups"
      ]
    ],
    [
      "measurement",
      [
        "measuring-length-and-height",
        "measuring-weight-and-volume",
        "comparing-measurements",
        "measuring-temperature",
        "measuring-time",
        "standard-units-of-money",
        "money-problems"
      ]
    ],
    [
      "geometry-properties-of-shapes",
      [
        "2-d-shapes",
        "3-d-shapes",
        "different-shapes"
      ]
    ],
    [
      "geometry-position-and-direction",
      [
        "patterns",
        "sequences",
        "quarter-turns-and-half-turns",
        "right-angle-turns"
      ]
    ],
    [
      "statistics",
      [
        "pictograms",
        "tally-charts",
        "block-diagrams",
        "tables",
        "gathering-information-and-using-data"
      ]
    ]
  ],
  "3": [
    [
      "number---number-and-place-value",
      [
        "counting-in-multiples-of-4-8-50-and-100",
        "finding-10-or-100-more-or-less",
        "place-value-in-3-digit-numbers",
        "comparing-and-ordering-numbers-to-1000",
        "representing-and-estimating-numbers",
        "reading-and-writing-numbers-to-1000",
        "number-and-place-value-problems"
      ]
    ],
    [
      "number---addition-and-subtraction",
      [
        "adding-and-subtracting-ones-tens-and-hundreds",
        "column-addition",
        "column-subtraction",
        "estimating-and-checking-answers",
        "missing-number-problems",
        "addition-and-subtraction-problems"
      ]
    ],
    [
      "number---multiplication-and-division",
      [
        "3-and-4-times-tables",
        "the-8-times-table",
        "multiplying-and-dividing-two-digit-numbers",
        "scaling-and-correspondence-problems",
        "multiplication-and-division-problems"
      ]
    ],
    [
      "number---fractions",
      [
        "tenths",
        "fractions-of-a-set-of-objects",
        "fractions-as-numbers",
        "equivalent-fractions",
        "adding-and-subtracting-fractions",
        "comparing-and-ordering-fractions",
        "fraction-problems"
      ]
    ],
    [
      "measurement",
      [
        "measuring-length-in-mm-cm-and-m",
        "measuring-mass",
        "measuring-volume-and-capacity",
        "adding-and-subtracting-measurements",
        "perimeter-of-2-d-shapes",
        "money-and-giving-change",
        "telling-the-time-to-the-minute",
        "roman-numerals-and-24-hour-clocks",
        "units-of-time-and-durations"
      ]
    ],
    [
      "geometry-properties-of-shapes",
      [
        "drawing-2-d-shapes",
        "making-and-recognising-3-d-shapes",
        "angles-as-turns",
        "right-angles",
        "comparing-angles-to-a-right-angle",
        "horizontal-vertical-parallel-and-perpendicular-lines"
      ]
    ],
    [
      "statistics",
      [
        "bar-charts",
        "scaled-pictograms",
        "tables",
        "one-step-and-two-step-questions"
      ]
    ]
  ]
};

const ids = (curriculum) =>
  curriculum.map((category) => [category.id, category.topics.map((topic) => topic.id)]);

test("Year 2 category and topic ids are unchanged", () => {
  assert.deepEqual(ids(year2MathCurriculum), LOCKED_IDS[2]);
});

test("Year 3 category and topic ids are unchanged", () => {
  assert.deepEqual(ids(year3MathCurriculum), LOCKED_IDS[3]);
});

test("every topic has a sticker icon", () => {
  for (const curriculum of [year2MathCurriculum, year3MathCurriculum]) {
    for (const category of curriculum) {
      for (const topic of category.topics) {
        assert.ok(topic.icon, `${topic.name} has no icon`);
      }
    }
  }
});
