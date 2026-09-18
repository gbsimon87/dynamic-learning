import test from "node:test";
import assert from "node:assert/strict";
import { buildLockState } from "./curriculumLocks.js";

// Two categories. Everything is built except geometry/shapes/4, plus an
// entirely unbuilt topic ("symmetry") that must never gate anything.
const curriculum = [
  {
    id: "number",
    title: "Number",
    topics: [
      { id: "counting", name: "Counting", challenges: [{ id: 1 }, { id: 2 }] },
      { id: "place-value", name: "Place Value", challenges: [{ id: 1 }, { id: 2 }] },
    ],
  },
  {
    id: "geometry",
    title: "Geometry",
    topics: [
      { id: "shapes", name: "Shapes", challenges: [{ id: 1 }, { id: 4 }] },
      { id: "symmetry", name: "Symmetry", challenges: [{ id: 1 }, { id: 2 }] },
    ],
  },
];

const isBuilt = (topicId, challengeId) => {
  if (topicId === "symmetry") return false;
  if (topicId === "shapes" && challengeId === 4) return false;
  return true;
};

const build = (progress, options) =>
  buildLockState({ curriculum, progress, isBuilt, ...options });

/** Convenience lookups so assertions read as the screen does. */
const category = (state, id) => state.find((c) => c.id === id);
const topic = (state, catId, topicId) =>
  category(state, catId).topics.find((t) => t.id === topicId);
const challenge = (state, catId, topicId, challengeId) =>
  topic(state, catId, topicId).challenges.find((c) => c.id === challengeId);

const DONE_NUMBER = {
  number: {
    topics: {
      counting: { completedChallenges: [1, 2] },
      "place-value": { completedChallenges: [1, 2] },
    },
  },
};

test("a fresh learner gets only the first challenge of the first topic", () => {
  const state = build({});

  assert.equal(category(state, "number").locked, false);
  assert.equal(category(state, "geometry").locked, true);

  assert.equal(topic(state, "number", "counting").locked, false);
  assert.equal(topic(state, "number", "place-value").locked, true);

  assert.equal(challenge(state, "number", "counting", 1).locked, false);
  assert.equal(challenge(state, "number", "counting", 2).locked, true);
});

test("completing a challenge unlocks the next one and nothing further", () => {
  const state = build({
    number: { topics: { counting: { completedChallenges: [1] } } },
  });

  assert.equal(challenge(state, "number", "counting", 1).completed, true);
  assert.equal(challenge(state, "number", "counting", 2).locked, false);
  assert.equal(topic(state, "number", "place-value").locked, true);
});

test("completing a topic unlocks the next topic in the category", () => {
  const state = build({
    number: { topics: { counting: { completedChallenges: [1, 2] } } },
  });

  assert.equal(topic(state, "number", "counting").complete, true);
  assert.equal(topic(state, "number", "place-value").locked, false);
  assert.equal(challenge(state, "number", "place-value", 1).locked, false);
  assert.equal(category(state, "geometry").locked, true);
});

test("completing a category unlocks the next category", () => {
  const state = build(DONE_NUMBER);

  assert.equal(category(state, "number").complete, true);
  assert.equal(category(state, "geometry").locked, false);
  assert.equal(challenge(state, "geometry", "shapes", 1).locked, false);
});

// A completed challenge stays open forever — never re-lock finished work.
test("completed challenges stay replayable", () => {
  const state = build({
    number: { topics: { counting: { completedChallenges: [1, 2] } } },
  });
  assert.equal(challenge(state, "number", "counting", 1).locked, false);
  assert.equal(challenge(state, "number", "counting", 1).completed, true);
});

test("an unbuilt challenge is flagged missing and does not block its topic", () => {
  const state = build(DONE_NUMBER);
  const missing = challenge(state, "geometry", "shapes", 4);

  assert.equal(missing.missing, true);
  assert.equal(topic(state, "geometry", "shapes").unbuilt, false);
});

// The topic can never be completed, so gating the next topic on it would be a
// permanent wall.
test("a fully unbuilt topic is marked unbuilt and never gates the next one", () => {
  const state = build(DONE_NUMBER);
  assert.equal(topic(state, "geometry", "symmetry").unbuilt, true);
});

test("a category whose only topics are unbuilt does not block the chain", () => {
  const onlyUnbuilt = [
    curriculum[0],
    { id: "empty", title: "Empty", topics: [curriculum[1].topics[1]] },
    curriculum[1],
  ];
  const state = buildLockState({
    curriculum: onlyUnbuilt,
    progress: DONE_NUMBER,
    isBuilt,
  });

  assert.equal(category(state, "empty").locked, false);
  // Passable, but never badged finished.
  assert.equal(category(state, "empty").complete, false);
  assert.equal(category(state, "geometry").locked, false);
});

test("bypassLocks opens everything but still reports what is missing", () => {
  const state = build({}, { bypassLocks: true });

  assert.equal(category(state, "geometry").locked, false);
  assert.equal(topic(state, "geometry", "shapes").locked, false);
  assert.equal(challenge(state, "geometry", "shapes", 1).locked, false);
  assert.equal(challenge(state, "geometry", "shapes", 4).missing, true);
});

test("lock state preserves curriculum order", () => {
  const state = build({});
  assert.deepEqual(
    state.map((c) => c.id),
    ["number", "geometry"]
  );
  assert.deepEqual(
    state[0].topics.map((t) => t.id),
    ["counting", "place-value"]
  );
});
