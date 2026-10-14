import test from "node:test";
import assert from "node:assert/strict";
import { hasUniqueValues, mostPopular, leastPopular, symbolCount } from "./statistics.js";
import {
  QUESTION_COUNT,
  MAX_SYMBOLS,
  PILE_MAX,
  CONTEXTS,
  mixedNearMisses,
  distinctValues,
  scaleTop,
  buildPictogramRead,
  buildPictogramCompare,
  buildPictogramConstruct,
  buildPictogramProblems,
  buildTallyRead,
  buildTallyWhole,
  buildTallyPile,
  buildTallyProblems,
  buildBlockRead,
  buildBlockScale,
  buildBlockConstruct,
  buildBlockProblems,
  buildTableRead,
  buildTableCell,
  buildTableFromTally,
  buildTableProblems,
  buildPileCount,
  buildPileSort,
  buildPileToBlocks,
  buildPileProblems,
} from "./statisticsQuestions.js";

/** mulberry32: well mixed from the very first draw, even for seeds 1, 2, 3. */
function seeded(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 2 ** 32;
  };
}

const SEEDS = Array.from({ length: 80 }, (_, i) => i + 1);

function eachRun(build, check) {
  for (const seed of SEEDS) {
    const questions = build(seeded(seed));
    assert.equal(questions.length, QUESTION_COUNT);
    check(questions, seed);
  }
}

/** A run must not show the same dataset twice, and two runs must differ. */
function assertFresh(build, datasetOf) {
  eachRun(build, (qs) => {
    const keys = qs.map((q) => JSON.stringify(datasetOf(q)));
    assert.equal(new Set(keys).size, keys.length, "a dataset repeats within a run");
  });
  const runs = new Set(SEEDS.slice(0, 10).map((seed) => JSON.stringify(build(seeded(seed)).map(datasetOf))));
  assert.equal(runs.size, 10, "two attempts drew the same questions");
}

function assertChoices(qs) {
  for (const q of qs) {
    assert.ok(q.options.includes(q.answer), `answer ${q.answer} missing from ${q.options}`);
    assert.equal(new Set(q.options).size, q.options.length, `duplicate options ${q.options}`);
    for (const option of q.options) {
      if (typeof option === "number") assert.ok(option >= 1, `option ${option} below 1`);
    }
  }
}

/**
 * Where the answer sits among the options sorted smallest first. Over many
 * runs it must land in more than one place, or "pick the second-biggest"
 * would always be right.
 */
function assertAnswerPositionVaries(build) {
  const places = new Set();
  eachRun(build, (qs) => {
    for (const q of qs) {
      if (typeof q.answer !== "number") continue;
      places.add([...q.options].sort((a, b) => a - b).indexOf(q.answer));
    }
  });
  assert.ok(places.size >= 3, `the answer only ever sits at ${[...places]}`);
}

const valueOf = (rows, label) => rows.find((r) => r.label === label).value;

/** Recomputes a word problem from its story and rows, independently of the builder. */
function solveStory(story, rows) {
  const labels = rows.map((r) => r.label).filter((l) => story.includes(` ${l}`));
  if (/fewest/.test(story)) {
    const sorted = rows.map((r) => r.value).sort((a, b) => a - b);
    return sorted[0] + sorted[1];
  }
  if (/altogether/.test(story)) return rows.reduce((s, r) => s + r.value, 0);
  if (/together/.test(story)) return labels.reduce((s, l) => s + valueOf(rows, l), 0);
  if (/how many more|How many more/.test(story)) {
    assert.equal(labels.length, 2, `"${story}" names ${labels.length} rows`);
    return Math.abs(valueOf(rows, labels[0]) - valueOf(rows, labels[1]));
  }
  throw new Error(`cannot solve "${story}"`);
}

/* ---------- helpers ---------- */

test("mixedNearMisses keeps the answer, never repeats, never goes below 1", () => {
  for (const seed of SEEDS) {
    for (const answer of [1, 2, 5, 12, 19]) {
      const options = mixedNearMisses(answer, [1, 2, 5], 4, seeded(seed));
      assert.equal(options.length, 4);
      assert.ok(options.includes(answer));
      assert.equal(new Set(options).size, 4);
      assert.ok(options.every((n) => n >= 1));
    }
  }
});

test("distinctValues gives all-different values in range", () => {
  for (const seed of SEEDS) {
    const values = distinctValues(4, 2, 9, seeded(seed));
    assert.equal(new Set(values).size, 4);
    assert.ok(values.every((n) => n >= 2 && n <= 9));
  }
});

test("scaleTop rounds up to a whole step and never below 6", () => {
  assert.equal(scaleTop([{ value: 7 }], 2), 8);
  assert.equal(scaleTop([{ value: 3 }], 2), 6);
  assert.equal(scaleTop([{ value: 14 }], 2), 14);
});

test("every prompt phrase reads as plain words for every context", () => {
  for (const c of CONTEXTS) {
    assert.ok(c.labels.length >= 4);
    assert.match(c.prep, /^(on|in|at)$/);
  }
});

/* ---------- Pictograms ---------- */

test("Pictograms 1: key of 2, the asked row highlighted, the symbol count offered as a trap", () => {
  eachRun(buildPictogramRead, (qs) => {
    assertChoices(qs);
    for (const q of qs) {
      assert.equal(q.ratio, 2);
      assert.equal(q.answer, valueOf(q.rows, q.ask));
      assert.ok(q.prompt.includes(q.ask));
      assert.ok(q.options.includes(symbolCount(q.answer, 2)) || q.answer === 2);
      for (const r of q.rows) assert.ok(symbolCount(r.value, 2) <= MAX_SYMBOLS);
    }
  });
  assertFresh(buildPictogramRead, (q) => q.rows);
});

test("Pictograms 2: keys of 5 and 10, no ties, most/fewest/how-many-more twice each", () => {
  eachRun(buildPictogramCompare, (qs) => {
    assertChoices(qs);
    for (const kind of ["most", "fewest", "difference"]) assert.equal(qs.filter((q) => q.kind === kind).length, 2);
    for (const q of qs) {
      assert.ok([5, 10].includes(q.ratio));
      assert.ok(hasUniqueValues(q.rows));
      if (q.kind === "most") assert.equal(q.answer, mostPopular(q.rows));
      if (q.kind === "fewest") assert.equal(q.answer, leastPopular(q.rows));
      if (q.kind === "difference") assert.equal(q.answer, solveStory(q.prompt, q.rows));
    }
  });
  assertFresh(buildPictogramCompare, (q) => q.rows);
});

test("Pictograms 3: every target is a whole number of symbols inside the control's cap", () => {
  eachRun(buildPictogramConstruct, (qs) => {
    assert.deepEqual(qs.map((q) => q.ratio).sort(), [10, 10, 2, 2, 5, 5]);
    for (const q of qs) {
      for (const t of q.targets) {
        const n = symbolCount(t.value, q.ratio);
        assert.ok(n >= 1 && n <= MAX_SYMBOLS);
      }
    }
  });
  assertFresh(buildPictogramConstruct, (q) => q.targets);
});

test("Pictograms 4: every story recomputes to its answer, inside 100", () => {
  eachRun(buildPictogramProblems, (qs) => {
    for (const q of qs) {
      assert.equal(q.answer, solveStory(q.story, q.rows), q.story);
      assert.ok(q.answer >= 1 && q.answer <= 100);
      assert.ok(q.rows.reduce((s, r) => s + r.value, 0) <= 100);
    }
  });
  assertFresh(buildPictogramProblems, (q) => q.rows);
});

/* ---------- Tally charts ---------- */

test("Tally 1: asked count has a gate, the answer moves around among the options", () => {
  eachRun(buildTallyRead, (qs) => {
    assertChoices(qs);
    for (const q of qs) {
      assert.ok(q.answer >= 5 && q.answer <= 20);
      assert.equal(q.answer, valueOf(q.rows, q.ask));
      assert.ok(hasUniqueValues(q.rows));
      assert.ok(q.rows.every((r) => r.value <= 20));
    }
  });
  assertAnswerPositionVaries(buildTallyRead);
  assertFresh(buildTallyRead, (q) => q.rows);
});

test("Tally 2: no ties, and the right answer for most, fewest and altogether", () => {
  eachRun(buildTallyWhole, (qs) => {
    assertChoices(qs);
    for (const q of qs) {
      assert.ok(hasUniqueValues(q.rows));
      if (q.kind === "most") assert.equal(q.answer, mostPopular(q.rows));
      if (q.kind === "fewest") assert.equal(q.answer, leastPopular(q.rows));
      if (q.kind === "total") assert.equal(q.answer, solveStory(q.prompt, q.rows));
    }
  });
  assertFresh(buildTallyWhole, (q) => q.rows);
});

test("Tally 3: the targets are the pile's real counts", () => {
  eachRun(buildTallyPile, (qs) => {
    for (const q of qs) {
      for (const t of q.targets) assert.equal(t.value, q.items.filter((i) => i === t.label).length);
      assert.ok(q.targets.every((t) => t.value <= 20));
    }
  });
  assertFresh(buildTallyPile, (q) => q.targets);
});

test("Tally 4: four rows, and every story recomputes to its answer", () => {
  eachRun(buildTallyProblems, (qs) => {
    for (const q of qs) {
      assert.equal(q.rows.length, 4);
      assert.equal(q.answer, solveStory(q.story, q.rows), q.story);
      assert.ok(q.answer >= 1);
    }
  });
  assertFresh(buildTallyProblems, (q) => q.rows);
});

/* ---------- Block diagrams ---------- */

test("Block 1: the answer is the highlighted column, with a scale tall enough", () => {
  eachRun(buildBlockRead, (qs) => {
    assertChoices(qs);
    for (const q of qs) {
      assert.equal(q.answer, valueOf(q.rows, q.ask));
      assert.ok(q.prompt.includes(q.ask));
      assert.ok(q.rows.every((r) => r.value <= q.max));
    }
  });
  assertAnswerPositionVaries(buildBlockRead);
  assertFresh(buildBlockRead, (q) => q.rows);
});

test("Block 2: the asked column stops on an odd number, between two scale labels", () => {
  eachRun(buildBlockScale, (qs) => {
    assertChoices(qs);
    for (const q of qs) {
      assert.equal(q.answer % 2, 1);
      assert.equal(q.answer, valueOf(q.rows, q.ask));
      assert.ok(q.prompt.includes(q.ask), "the prompt must name its column");
      assert.ok(hasUniqueValues(q.rows));
      assert.ok(q.rows.every((r) => r.value <= q.max) && q.max % 2 === 0);
    }
  });
  assertFresh(buildBlockScale, (q) => q.rows);
});

test("Block 3: every target fits on the scale", () => {
  eachRun(buildBlockConstruct, (qs) => {
    for (const q of qs) assert.ok(q.targets.every((t) => t.value >= 1 && t.value <= q.max));
  });
  assertFresh(buildBlockConstruct, (q) => q.targets);
});

test("Block 4: four different columns, every story recomputes to its answer", () => {
  eachRun(buildBlockProblems, (qs) => {
    for (const q of qs) {
      assert.equal(q.rows.length, 4);
      assert.ok(hasUniqueValues(q.rows), "two-smallest needs no ties");
      assert.equal(q.answer, solveStory(q.story, q.rows), q.story);
    }
  });
  assertFresh(buildBlockProblems, (q) => q.rows);
});

/* ---------- Tables ---------- */

test("Tables 1: options are the table's own four different numbers", () => {
  eachRun(buildTableRead, (qs) => {
    assertChoices(qs);
    for (const q of qs) {
      assert.deepEqual([...q.options].sort((a, b) => a - b), q.rows.map((r) => r.value).sort((a, b) => a - b));
      assert.equal(q.answer, valueOf(q.rows, q.ask));
    }
  });
  assertFresh(buildTableRead, (q) => q.rows);
});

test("Tables 2: the story names one row and one column, and the answer is where they meet", () => {
  eachRun(buildTableCell, (qs) => {
    assertChoices(qs);
    for (const q of qs) {
      const named = q.rows.filter((r) => q.story.toLowerCase().includes(r.label.toLowerCase()));
      assert.equal(named.length, 1, q.story);
      const cells = q.columns.map((c) => named[0][c.key]);
      assert.ok(cells.includes(q.answer));
      const all = q.rows.flatMap((r) => q.columns.map((c) => r[c.key]));
      assert.equal(new Set(all).size, all.length, "two cells share a value");
    }
  });
  assertFresh(buildTableCell, (q) => q.rows);
});

test("Tables 3: the gap is never the first row, and its answer comes from the tally", () => {
  eachRun(buildTableFromTally, (qs) => {
    for (const q of qs) {
      assert.notEqual(q.rows[0].label, q.missing);
      assert.equal(q.answer, valueOf(q.rows, q.missing));
      assert.ok(q.answer <= 20);
    }
  });
  assertFresh(buildTableFromTally, (q) => q.rows);
});

test("Tables 4: two of each kind, answers recomputed from the cells", () => {
  eachRun(buildTableProblems, (qs) => {
    for (const kind of ["row-total", "column-total", "difference"]) assert.equal(qs.filter((q) => q.kind === kind).length, 2);
    for (const q of qs) {
      const [a, b] = q.columns.map((c) => c.key);
      if (q.kind === "column-total") {
        const options = [a, b].map((k) => q.rows.reduce((s, r) => s + r[k], 0));
        assert.ok(options.includes(q.answer));
      } else {
        const row = q.rows.find((r) => q.story.toLowerCase().includes(r.label.toLowerCase()));
        assert.ok(row, q.story);
        assert.equal(q.answer, q.kind === "row-total" ? row[a] + row[b] : Math.abs(row[a] - row[b]));
      }
      assert.ok(q.answer >= 1 && q.answer <= 100);
    }
  });
  assertFresh(buildTableProblems, (q) => q.rows);
});

/* ---------- Gathering information ---------- */

test("Gathering 1: the answer is the real count of the asked kind", () => {
  eachRun(buildPileCount, (qs) => {
    assertChoices(qs);
    for (const q of qs) assert.equal(q.answer, q.items.filter((i) => i === q.ask).length);
  });
  assertAnswerPositionVaries(buildPileCount);
  assertFresh(buildPileCount, (q) => q.items);
});

test("Gathering 2: four different counts, a single right order, never handed over sorted", () => {
  eachRun(buildPileSort, (qs) => {
    assert.equal(qs.filter((q) => q.direction === "most-first").length, 3);
    for (const q of qs) {
      assert.ok(q.answer, "a tied pile has no single order");
      const counts = q.answer.map((c) => q.items.filter((i) => i === c).length);
      assert.equal(new Set(counts).size, 4);
      const expected = [...counts].sort((x, y) => (q.direction === "most-first" ? y - x : x - y));
      assert.deepEqual(counts, expected);
      assert.ok(!q.start.every((c, i) => c === q.answer[i]));
    }
  });
  assertFresh(buildPileSort, (q) => q.items);
});

test("Gathering 3: targets match the pile and fit the block diagram", () => {
  eachRun(buildPileToBlocks, (qs) => {
    for (const q of qs) {
      for (const t of q.targets) {
        assert.equal(t.value, q.items.filter((i) => i === t.label).length);
        assert.ok(t.value >= 1 && t.value <= PILE_MAX);
      }
    }
  });
  assertFresh(buildPileToBlocks, (q) => q.targets);
});

test("Gathering 4: every answer recomputed from the pile itself", () => {
  eachRun(buildPileProblems, (qs) => {
    for (const q of qs) {
      const kinds = [...new Set(q.items)];
      const count = (e) => q.items.filter((i) => i === e).length;
      assert.equal(new Set(kinds.map(count)).size, kinds.length, "two kinds tie");
      const named = kinds.filter((e) => q.story.includes(e));
      let expected;
      if (q.kind === "total") expected = q.items.length;
      else if (q.kind === "pair") expected = count(named[0]) + count(named[1]);
      else if (q.kind === "difference") expected = Math.abs(count(named[0]) - count(named[1]));
      else expected = Math.max(...kinds.map(count));
      assert.equal(q.answer, expected, q.story);
    }
  });
  assertFresh(buildPileProblems, (q) => q.items);
});
