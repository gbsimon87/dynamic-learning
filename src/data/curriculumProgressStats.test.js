import test from "node:test";
import assert from "node:assert/strict";
import {
  getCategoryBreakdown,
  getTopicStats,
  getYearStats,
} from "./curriculumProgressStats.js";

// Two categories. "counting" has 2 built challenges of 3; "shapes" has none
// built at all, so it must never appear in a denominator.
const curriculum = [
  {
    id: "number",
    topics: [
      {
        id: "counting",
        challenges: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    ],
  },
  {
    id: "geometry",
    topics: [
      {
        id: "shapes",
        challenges: [{ id: 1 }, { id: 2 }],
      },
    ],
  },
];

// Only counting/1 and counting/2 have component files.
const isBuilt = (topicId, challengeId) =>
  topicId === "counting" && (challengeId === 1 || challengeId === 2);

test("empty progress reports zero without dividing by zero", () => {
  assert.deepEqual(getYearStats({}, curriculum, isBuilt), {
    completed: 0,
    total: 2,
    percent: 0,
    datasetTotal: 5,
  });
});

test("a topic with nothing built has a total of zero and 0%", () => {
  assert.deepEqual(
    getTopicStats({}, "geometry", curriculum[1].topics[0], isBuilt),
    { completed: 0, total: 0, percent: 0 }
  );
});

test("unbuilt challenges are excluded from the denominator", () => {
  // 3 challenges in the dataset, only 2 built.
  assert.equal(getTopicStats({}, "number", curriculum[0].topics[0], isBuilt).total, 2);
});

test("counts completed challenges for a topic", () => {
  const progress = {
    number: { topics: { counting: { completedChallenges: [1] } } },
  };
  assert.deepEqual(getTopicStats(progress, "number", curriculum[0].topics[0], isBuilt), {
    completed: 1,
    total: 2,
    percent: 50,
  });
});

test("ignores a completed id whose challenge is not built", () => {
  // Challenge 3 exists in the dataset but has no component, so completing it
  // must not push the topic past 100%.
  const progress = {
    number: { topics: { counting: { completedChallenges: [1, 2, 3] } } },
  };
  assert.deepEqual(getTopicStats(progress, "number", curriculum[0].topics[0], isBuilt), {
    completed: 2,
    total: 2,
    percent: 100,
  });
});

test("ignores a completed id that is not in the dataset at all", () => {
  const progress = {
    number: { topics: { counting: { completedChallenges: [99] } } },
  };
  assert.equal(getTopicStats(progress, "number", curriculum[0].topics[0], isBuilt).completed, 0);
});

test("treats string challenge ids as their numeric equivalents", () => {
  const progress = {
    number: { topics: { counting: { completedChallenges: ["2"] } } },
  };
  assert.equal(getTopicStats(progress, "number", curriculum[0].topics[0], isBuilt).completed, 1);
});

test("the year total sums every built challenge across categories", () => {
  const progress = {
    number: { topics: { counting: { completedChallenges: [1, 2] } } },
  };
  assert.deepEqual(getYearStats(progress, curriculum, isBuilt), {
    completed: 2,
    total: 2,
    percent: 100,
    datasetTotal: 5,
  });
});

test("percent rounds to a whole number", () => {
  const threeBuilt = [
    { id: "number", topics: [{ id: "counting", challenges: [{ id: 1 }, { id: 2 }, { id: 3 }] }] },
  ];
  const allBuilt = () => true;
  const progress = {
    number: { topics: { counting: { completedChallenges: [1] } } },
  };
  assert.equal(getYearStats(progress, threeBuilt, allBuilt).percent, 33);
});

test("the year stats also report the full dataset total, built or not", () => {
  // 3 + 2 challenges exist in the dataset; only 2 are built.
  const stats = getYearStats({}, curriculum, isBuilt);
  assert.equal(stats.total, 2);
  assert.equal(stats.datasetTotal, 5);
});

test("the dataset total counts unbuilt topics that are excluded elsewhere", () => {
  // "shapes" contributes 0 to `total` but its 2 challenges still exist.
  const nothingBuilt = () => false;
  const stats = getYearStats({}, curriculum, nothingBuilt);
  assert.equal(stats.total, 0);
  assert.equal(stats.percent, 0);
  assert.equal(stats.datasetTotal, 5);
});

/* ===== CATEGORY BREAKDOWN =====
   Feeds the per-child panel in the Parent Area. The fixture above is the useful
   shape for this: one category with something built, one with nothing. */

test("the breakdown keeps categories in curriculum order", () => {
  const out = getCategoryBreakdown({}, curriculum, isBuilt);
  assert.deepEqual(
    out.map((category) => category.id),
    ["number", "geometry"]
  );
});

test("a category reports built-only counts, summed from its topics", () => {
  const progress = {
    number: { topics: { counting: { completedChallenges: [1] } } },
  };

  const [number] = getCategoryBreakdown(progress, curriculum, isBuilt);
  assert.equal(number.completed, 1);
  assert.equal(number.total, 2); // 2 built of 3 in the dataset
  assert.equal(number.percent, 50);
});

test("a category with nothing built is 0 of 0, never NaN", () => {
  const [, geometry] = getCategoryBreakdown({}, curriculum, isBuilt);
  assert.deepEqual(
    { completed: geometry.completed, total: geometry.total, percent: geometry.percent },
    { completed: 0, total: 0, percent: 0 }
  );
});

test("each category carries its topics with their own counts", () => {
  const progress = {
    number: { topics: { counting: { completedChallenges: [1, 2] } } },
  };

  const [number] = getCategoryBreakdown(progress, curriculum, isBuilt);
  assert.equal(number.topics.length, 1);
  assert.deepEqual(number.topics[0], {
    id: "counting",
    name: undefined, // the fixture has no names; the real dataset does
    completed: 2,
    total: 2,
    percent: 100,
  });
});

test("a completion id for an unbuilt challenge cannot push a category over 100%", () => {
  // Challenge 3 exists in the dataset but has no component file. A stale or
  // hand-edited id for it must not count.
  const progress = {
    number: { topics: { counting: { completedChallenges: [1, 2, 3] } } },
  };

  const [number] = getCategoryBreakdown(progress, curriculum, isBuilt);
  assert.equal(number.completed, 2);
  assert.equal(number.percent, 100);
});

test("an empty or missing curriculum yields an empty breakdown", () => {
  assert.deepEqual(getCategoryBreakdown({}, [], isBuilt), []);
  assert.deepEqual(getCategoryBreakdown({}, null, isBuilt), []);
});
