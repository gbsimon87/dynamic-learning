import test from "node:test";
import assert from "node:assert/strict";
import {
  completeChallenge,
  isCategoryComplete,
  isCategoryPassable,
  isChallengeComplete,
  isChallengeUnlocked,
  isFirstTimeUser,
  isTopicComplete,
} from "./progressRules.js";

const topic = { id: "counting", challenges: [{ id: 1 }, { id: 2 }, { id: 3 }] };

const category = {
  id: "number",
  topics: [
    topic,
    { id: "place-value", challenges: [{ id: 1 }, { id: 2 }] },
  ],
};

const progressWith = (completedChallenges) => ({
  number: { topics: { counting: { completedChallenges } } },
});

test("a fresh learner is a first-time user", () => {
  assert.equal(isFirstTimeUser({}), true);
  assert.equal(isFirstTimeUser(progressWith([1])), false);
});

test("a topic completes only when every challenge is done", () => {
  assert.equal(isTopicComplete({}, "number", "counting", topic), false);
  assert.equal(
    isTopicComplete(progressWith([1, 2]), "number", "counting", topic),
    false
  );
  assert.equal(
    isTopicComplete(progressWith([1, 2, 3]), "number", "counting", topic),
    true
  );
});

// Regression: a length check marked this complete, so four bogus entries
// unlocked the rest of the curriculum.
test("repeated ids never complete a topic", () => {
  assert.equal(
    isTopicComplete(progressWith([1, 1, 1]), "number", "counting", topic),
    false
  );
});

// A topic containing an unbuilt challenge could never be completed, so it
// permanently gated the topic after it — while the screen showed "2/2 done",
// because the progress COUNT already ignored unbuilt challenges. Gating now
// ignores them too, so the two agree.
test("unbuilt challenges are excluded from topic completion", () => {
  const skipChallenge = (challenge) => challenge.id === 3;
  assert.equal(
    isTopicComplete(progressWith([1, 2]), "number", "counting", topic),
    false
  );
  assert.equal(
    isTopicComplete(progressWith([1, 2]), "number", "counting", topic, skipChallenge),
    true
  );
});

// Distinct from "everything built is done": there is nothing to complete.
test("a topic with nothing built is never complete", () => {
  assert.equal(
    isTopicComplete(progressWith([1, 2, 3]), "number", "counting", topic, () => true),
    false
  );
});

test("challenge ids stored as strings still count as complete", () => {
  assert.equal(
    isTopicComplete(progressWith(["1", "2", "3"]), "number", "counting", topic),
    true
  );
});

test("the first challenge is always unlocked", () => {
  assert.equal(isChallengeUnlocked({}, "number", "counting", topic, 0), true);
});

test("a challenge unlocks once everything before it is done", () => {
  const progress = progressWith([1]);
  assert.equal(
    isChallengeUnlocked(progress, "number", "counting", topic, 1),
    true
  );
  assert.equal(
    isChallengeUnlocked(progress, "number", "counting", topic, 2),
    false
  );
});

// An unbuilt challenge can never be completed, so treating it as a blocker
// would wall off every challenge after it.
test("unbuilt challenges do not block the ones after them", () => {
  const skipChallenge = (challenge) => challenge.id === 2;
  assert.equal(
    isChallengeUnlocked(progressWith([1]), "number", "counting", topic, 2, skipChallenge),
    true
  );
});

test("a category completes only when all its completable topics are done", () => {
  const partial = {
    number: {
      topics: {
        counting: { completedChallenges: [1, 2, 3] },
        "place-value": { completedChallenges: [1] },
      },
    },
  };
  assert.equal(isCategoryComplete(partial, category), false);

  const full = {
    number: {
      topics: {
        counting: { completedChallenges: [1, 2, 3] },
        "place-value": { completedChallenges: [1, 2] },
      },
    },
  };
  assert.equal(isCategoryComplete(full, category), true);
});

test("skipped topics are excluded from category completion", () => {
  const skipTopic = (t) => t.id === "place-value";
  assert.equal(
    isCategoryComplete(progressWith([1, 2, 3]), category, skipTopic),
    true
  );
});

// Complete and passable deliberately disagree here: an empty category must not
// block the chain, but must not be badged finished either.
test("a category with nothing completable is passable but not complete", () => {
  const skipTopic = () => true;
  assert.equal(isCategoryComplete({}, category, skipTopic), false);
  assert.equal(isCategoryPassable({}, category, skipTopic), true);
});

test("challenge completion compares numerically across types", () => {
  const progress = progressWith([1, 2]);
  assert.equal(isChallengeComplete(progress, "number", "counting", 1), true);
  assert.equal(isChallengeComplete(progress, "number", "counting", "2"), true);
  assert.equal(isChallengeComplete(progress, "number", "counting", 3), false);
});

test("completing a challenge stores a number, not the string from the URL", () => {
  const next = completeChallenge({}, "number", "counting", "1");
  assert.deepEqual(next.number.topics.counting.completedChallenges, [1]);
});

test("completing the same challenge twice is a no-op", () => {
  const first = completeChallenge({}, "number", "counting", 1);
  const second = completeChallenge(first, "number", "counting", 1);
  assert.equal(second, first);
});

// Dropping any level of the spread wipes sibling progress for a whole category.
test("completing a challenge preserves sibling topics and categories", () => {
  const existing = {
    number: {
      topics: {
        counting: { completedChallenges: [1] },
        "place-value": { completedChallenges: [1, 2] },
      },
    },
    geometry: { topics: { shapes: { completedChallenges: [1] } } },
  };

  const next = completeChallenge(existing, "number", "counting", 2);

  assert.deepEqual(next.number.topics.counting.completedChallenges, [1, 2]);
  assert.deepEqual(next.number.topics["place-value"].completedChallenges, [1, 2]);
  assert.deepEqual(next.geometry.topics.shapes.completedChallenges, [1]);
  assert.notEqual(next, existing);
});

test("completing a challenge keeps other fields on the topic record", () => {
  const existing = {
    number: { topics: { counting: { completedChallenges: [1], note: "keep" } } },
  };
  const next = completeChallenge(existing, "number", "counting", 2);
  assert.equal(next.number.topics.counting.note, "keep");
});
