import test from "node:test";
import assert from "node:assert/strict";
import { buildLockState } from "./curriculumLocks.js";
import { findNextChallenge } from "./curriculumNavigation.js";

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
      { id: "shapes", name: "Shapes", challenges: [{ id: 1 }, { id: 2 }] },
    ],
  },
];

const allBuilt = () => true;

/** Lock state as it stands the moment `challengeId` of `topicId` is completed. */
const stateAfter = (progress, options) =>
  buildLockState({ curriculum, progress, isBuilt: allBuilt, ...options });

test("advances to the next challenge in the same topic", () => {
  const state = stateAfter({
    number: { topics: { counting: { completedChallenges: [1] } } },
  });

  assert.deepEqual(
    findNextChallenge(state, {
      categoryId: "number",
      topicId: "counting",
      challengeId: 1,
    }),
    { categoryId: "number", topicId: "counting", challengeId: 2 }
  );
});

// challengeId arrives from the URL as a string.
test("accepts a string challenge id from the route", () => {
  const state = stateAfter({
    number: { topics: { counting: { completedChallenges: [1] } } },
  });

  assert.deepEqual(
    findNextChallenge(state, {
      categoryId: "number",
      topicId: "counting",
      challengeId: "1",
    }),
    { categoryId: "number", topicId: "counting", challengeId: 2 }
  );
});

test("crosses into the next topic after the last challenge", () => {
  const state = stateAfter({
    number: { topics: { counting: { completedChallenges: [1, 2] } } },
  });

  assert.deepEqual(
    findNextChallenge(state, {
      categoryId: "number",
      topicId: "counting",
      challengeId: 2,
    }),
    { categoryId: "number", topicId: "place-value", challengeId: 1 }
  );
});

test("crosses into the next category after the last topic", () => {
  const state = stateAfter({
    number: {
      topics: {
        counting: { completedChallenges: [1, 2] },
        "place-value": { completedChallenges: [1, 2] },
      },
    },
  });

  assert.deepEqual(
    findNextChallenge(state, {
      categoryId: "number",
      topicId: "place-value",
      challengeId: 2,
    }),
    { categoryId: "geometry", topicId: "shapes", challengeId: 1 }
  );
});

test("returns null at the end of the curriculum", () => {
  const state = stateAfter({
    number: {
      topics: {
        counting: { completedChallenges: [1, 2] },
        "place-value": { completedChallenges: [1, 2] },
      },
    },
    geometry: { topics: { shapes: { completedChallenges: [1, 2] } } },
  });

  assert.equal(
    findNextChallenge(state, {
      categoryId: "geometry",
      topicId: "shapes",
      challengeId: 2,
    }),
    null
  );
});

// An unbuilt challenge is skipped, and — since it no longer blocks its topic
// from completing — the next topic opens and the resolver lands there.
test("skips an unbuilt challenge and moves into the next topic", () => {
  const isBuilt = (topicId, challengeId) =>
    !(topicId === "counting" && challengeId === 2);
  const state = buildLockState({
    curriculum,
    progress: { number: { topics: { counting: { completedChallenges: [1] } } } },
    isBuilt,
  });

  assert.equal(state[0].topics[0].complete, true);
  assert.equal(state[0].topics[1].locked, false);
  assert.deepEqual(
    findNextChallenge(state, {
      categoryId: "number",
      topicId: "counting",
      challengeId: 1,
    }),
    { categoryId: "number", topicId: "place-value", challengeId: 1 }
  );
});

test("skips an entirely unbuilt topic", () => {
  const isBuilt = (topicId) => topicId !== "place-value";
  const state = buildLockState({
    curriculum,
    progress: { number: { topics: { counting: { completedChallenges: [1, 2] } } } },
    isBuilt,
  });

  assert.deepEqual(
    findNextChallenge(state, {
      categoryId: "number",
      topicId: "counting",
      challengeId: 2,
    }),
    { categoryId: "geometry", topicId: "shapes", challengeId: 1 }
  );
});

// Replaying an old challenge must not hand back something still locked.
test("never returns a locked challenge", () => {
  const state = stateAfter({
    number: { topics: { counting: { completedChallenges: [1, 2] } } },
  });

  // place-value/1 is unlocked; place-value/2 is not. Replaying counting/1
  // should land on the first PLAYABLE item after it, not simply the next one.
  const next = findNextChallenge(state, {
    categoryId: "number",
    topicId: "counting",
    challengeId: 1,
  });

  assert.deepEqual(next, {
    categoryId: "number",
    topicId: "counting",
    challengeId: 2,
  });

  const afterTopic = findNextChallenge(state, {
    categoryId: "number",
    topicId: "place-value",
    challengeId: 1,
  });
  assert.equal(afterTopic, null);
});

test("returns null when the current position is not in the curriculum", () => {
  const state = stateAfter({});
  assert.equal(
    findNextChallenge(state, {
      categoryId: "nope",
      topicId: "missing",
      challengeId: 1,
    }),
    null
  );
});

test("returns null for an empty curriculum", () => {
  assert.equal(
    findNextChallenge([], {
      categoryId: "number",
      topicId: "counting",
      challengeId: 1,
    }),
    null
  );
});
