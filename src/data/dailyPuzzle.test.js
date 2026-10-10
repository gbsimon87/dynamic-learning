import test from "node:test";
import assert from "node:assert/strict";
import { RIDDLES, puzzleForDay, puzzleProblems, recordPuzzle, solvedOn } from "./dailyPuzzle.js";
import { normaliseRewards } from "./rewardsShape.js";
import { findUsSpellings } from "./english/textChecks.js";

function days(from, count) {
  const start = Date.parse(`${from}T12:00:00Z`);
  return Array.from({ length: count }, (_, i) => new Date(start + i * 86400000).toISOString().slice(0, 10));
}

test("the same day always gives the same puzzle", () => {
  assert.deepEqual(puzzleForDay("2026-10-10"), puzzleForDay("2026-10-10"));
  assert.notDeepEqual(puzzleForDay("2026-10-10"), puzzleForDay("2026-10-11"));
});

test("two years of daily puzzles are all fair: one answer, distinct options, nothing negative", () => {
  for (const day of days("2026-01-01", 730)) {
    const puzzle = puzzleForDay(day);
    assert.deepEqual(puzzleProblems(puzzle), [], `${day}: ${JSON.stringify(puzzle)}`);
  }
});

test("the kind rotates, so the same kind never comes two days running", () => {
  const kinds = days("2026-10-01", 60).map((day) => puzzleForDay(day).kind);
  for (let i = 1; i < kinds.length; i += 1) assert.notEqual(kinds[i], kinds[i - 1]);
  assert.deepEqual([...new Set(kinds)].sort(), ["missing", "next", "odd", "riddle"]);
});

test("odd one out never mixes overlapping groups (a fish is an animal)", () => {
  for (const day of days("2026-01-01", 730)) {
    const puzzle = puzzleForDay(day);
    if (puzzle.kind !== "odd") continue;
    const sea = ["🐟", "🐙", "🦀", "🐬", "🐳"];
    const land = ["🐶", "🐱", "🐰", "🐻", "🦊"];
    const hasSea = puzzle.options.some((o) => sea.includes(o));
    const hasLand = puzzle.options.some((o) => land.includes(o));
    assert.ok(!(hasSea && hasLand), `${day}: ${puzzle.options.join(" ")}`);
  }
});

test("riddles are British English and every answer differs from its distractors", () => {
  for (const riddle of RIDDLES) {
    assert.deepEqual(findUsSpellings([riddle.q, riddle.answer, ...riddle.others].join(" ")), []);
    assert.ok(!riddle.others.includes(riddle.answer));
  }
});

test("one puzzle star per day, however many times it is solved", () => {
  const r = normaliseRewards(null);
  const once = recordPuzzle(r, "2026-10-10");
  assert.equal(solvedOn(once, "2026-10-10"), true);
  assert.equal(once.puzzles.total, 1);
  assert.equal(recordPuzzle(once, "2026-10-10"), once);
  const twice = recordPuzzle(once, "2026-10-11");
  assert.equal(twice.puzzles.total, 2);
  assert.deepEqual(twice.puzzles.days, ["2026-10-10", "2026-10-11"]);
});
