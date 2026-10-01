import test from "node:test";
import assert from "node:assert/strict";

import { SEED_CHILDREN, SEED_PARENT, buildProgress, buildRewards, withSeedStreak } from "./seedData.js";
import { year2MathCurriculum } from "../src/data/year2MathCurriculum.js";

/* A tiny curriculum: two categories, the second with nothing built. */
const curriculum = [
  {
    id: "number",
    title: "Number",
    topics: [
      { id: "counting", name: "Counting", challenges: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] },
      { id: "place-value", name: "Place Value", challenges: [{ id: 1 }, { id: 2 }] },
    ],
  },
  {
    id: "shapes",
    title: "Shapes",
    topics: [{ id: "flat", name: "Flat", challenges: [{ id: 1 }, { id: 2 }] }],
  },
];

// Everything in "number" is built; nothing in "shapes" is.
const isBuilt = (topicId) => topicId === "counting" || topicId === "place-value";

function completedIds(data, categoryId, topicId) {
  return data?.[categoryId]?.topics?.[topicId]?.completedChallenges ?? [];
}

test("the seed account is the obviously-fake one", () => {
  assert.equal(SEED_PARENT.email, "testuser@gmail.com");
  assert.equal(SEED_PARENT.password, "password");
});

test("both seeded children exist and differ", () => {
  const names = SEED_CHILDREN.map((child) => child.name);
  assert.deepEqual(names, ["Demi", "Liam"]);

  // The whole point of two children is that they are not the same: the resume
  // card, the profile cards and the parent breakdown all key off which
  // curriculum was most recent.
  const [demi, liam] = SEED_CHILDREN;
  assert.notEqual(demi.mostRecentYear, liam.mostRecentYear);
  assert.notDeepEqual(demi.progress, liam.progress);
});

test("every seeded child has progress in BOTH years", () => {
  for (const child of SEED_CHILDREN) {
    assert.ok(child.progress[2] > 0, `${child.name} needs Year 2 progress`);
    assert.ok(child.progress[3] > 0, `${child.name} needs Year 3 progress`);
  }
});

test("a child's most recent year is one they actually have progress in", () => {
  for (const child of SEED_CHILDREN) {
    assert.ok(
      child.progress[child.mostRecentYear] > 0,
      `${child.name}'s most recent year must have progress`
    );
  }
});

test("progress is completed in display order, so nothing is locked-but-done", () => {
  const { data, completed } = buildProgress(curriculum, isBuilt, 5);

  assert.equal(completed, 5);
  // Four from the first topic, then one from the second — never the reverse.
  assert.deepEqual(completedIds(data, "number", "counting"), [1, 2, 3, 4]);
  assert.deepEqual(completedIds(data, "number", "place-value"), [1]);
});

test("unbuilt challenges are skipped, never marked complete", () => {
  const { data, completed } = buildProgress(curriculum, isBuilt, 99);

  // Only the six built ones, and nothing at all under "shapes" — a seeded
  // completion for a challenge with no component file is one a learner could
  // never have earned and can never replay.
  assert.equal(completed, 6);
  assert.equal(data.shapes, undefined);
});

test("asking for zero completes nothing", () => {
  const { data, completed } = buildProgress(curriculum, isBuilt, 0);
  assert.equal(completed, 0);
  assert.deepEqual(data, {});
});

test("badges are replayed from progress, not invented", () => {
  // One challenge: the first-steps badge and nothing else.
  const one = buildRewards([
    { curriculum, isBuilt, count: 1, year: 2, subject: "math" },
  ]);
  assert.deepEqual(one.badges.map((badge) => badge.id), ["first-steps"]);
  assert.equal(one.counts.challenge, 1);

  // A finished topic additionally earns the topic badge.
  const topic = buildRewards([
    { curriculum, isBuilt, count: 4, year: 2, subject: "math" },
  ]);
  assert.deepEqual(topic.badges.map((badge) => badge.id), [
    "first-steps",
    "topic-finisher",
  ]);
  assert.equal(topic.counts.challenge, 4);
  assert.equal(topic.counts.topic, 1);
});

test("the badge tally matches the number of challenges completed", () => {
  const rewards = buildRewards([
    { curriculum, isBuilt, count: 6, year: 2, subject: "math" },
    { curriculum, isBuilt, count: 4, year: 3, subject: "math" },
  ]);

  // A badge log that outran its progress would be the bug worth catching here.
  assert.equal(rewards.counts.challenge, 10);
});

test("no badge is ever awarded twice across years", () => {
  const rewards = buildRewards([
    { curriculum, isBuilt, count: 6, year: 2, subject: "math" },
    { curriculum, isBuilt, count: 6, year: 3, subject: "math" },
  ]);

  const ids = rewards.badges.map((badge) => badge.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("seeded rewards are v2 with XP matching the completions", () => {
  const isBuilt = () => true;
  const rewards = buildRewards([{ curriculum: year2MathCurriculum, isBuilt, count: 7, year: 2, subject: "math" }]);
  assert.equal(rewards.schemaVersion, 2);
  assert.equal(rewards.xp, 70);
  assert.equal(rewards.xpBackfilled, true);
});

test("withSeedStreak builds a streak of N days ending yesterday", () => {
  const out = withSeedStreak(buildRewards([]), 4, "2026-09-30");
  assert.equal(out.streak.current, 4);
  assert.equal(out.streak.lastDay, "2026-09-29");
  assert.deepEqual(out.streak.recent, ["2026-09-26", "2026-09-27", "2026-09-28", "2026-09-29"]);
  assert.equal(withSeedStreak(buildRewards([]), 0, "2026-09-30").streak.current, 0);
});

test("a seeded year counts as finished only when its other subjects are", () => {
  const tiny = [
    { id: "words", title: "Words", topics: [{ id: "a-or-an", name: "A or An", challenges: [{ id: 1 }] }] },
  ];
  const all = () => true;
  const yearsFinished = (otherSubjectsComplete) =>
    buildRewards([
      { curriculum: tiny, isBuilt: all, count: 1, year: 3, subject: "math", otherSubjectsComplete },
    ]).counts.year ?? 0;

  assert.equal(yearsFinished(true), 1);
  assert.equal(yearsFinished(false), 0);
  assert.equal(yearsFinished(undefined), 0);
});
