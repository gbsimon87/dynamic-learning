import test from "node:test";
import assert from "node:assert/strict";
import { completeChallenge } from "./progressRules.js";
import { allSubjectsComplete, getCompletionMilestones } from "./completionMilestones.js";

const curriculum = [
  {
    id: "number",
    title: "Number",
    topics: [
      { id: "counting", name: "Counting", challenges: [{ id: 1, title: "Challenge 1" }, { id: 2, title: "Challenge 2" }] },
      { id: "place-value", name: "Place Value", challenges: [{ id: 1, title: "Challenge 1" }] },
    ],
  },
  {
    id: "shapes",
    title: "Shapes",
    topics: [
      { id: "flat-shapes", name: "Flat Shapes", challenges: [{ id: 1, title: "Challenge 1" }] },
    ],
  },
];

const built = () => true;

function result(progress, categoryId, topicId, challengeId, options = {}) {
  return getCompletionMilestones({
    curriculum,
    progress,
    categoryId,
    topicId,
    challengeId,
    isBuilt: options.isBuilt || built,
    otherSubjectsComplete: options.othersDone ?? false,
  });
}

test("ordinary challenge earns only a challenge celebration", () => {
  const milestone = result({}, "number", "counting", "1");
  assert.equal(milestone.level, "challenge");
  assert.deepEqual(milestone.earned, ["challenge"]);
  assert.equal(milestone.summary.topicName, "Counting");
});

test("the last challenge in a topic earns the topic celebration", () => {
  const milestone = result({ number: { topics: { counting: { completedChallenges: [1] } } } }, "number", "counting", "2");
  assert.equal(milestone.level, "topic");
  assert.deepEqual(milestone.earned, ["challenge", "topic"]);
});

test("finishing the last topic in a section earns the section celebration", () => {
  const progress = { number: { topics: { counting: { completedChallenges: [1, 2] } } } };
  const milestone = result(progress, "number", "place-value", "1");
  assert.equal(milestone.level, "category");
  assert.deepEqual(milestone.earned, ["challenge", "topic", "category"]);
  assert.equal(milestone.summary.categoryTopics, 2);
});

test("finishing every section earns subject, and year only when the other subjects are done", () => {
  const progress = { number: { topics: { counting: { completedChallenges: [1, 2] }, "place-value": { completedChallenges: [1] } } } };
  const subject = result(progress, "shapes", "flat-shapes", "1");
  assert.equal(subject.level, "subject");
  assert.equal(subject.summary.subjectChallenges, 4);
  const year = result(progress, "shapes", "flat-shapes", "1", { othersDone: true });
  assert.equal(year.level, "year");
  assert.deepEqual(year.earned, ["challenge", "topic", "category", "subject", "year"]);
});

test("unbuilt planned challenges prevent a full topic, section, subject or year award", () => {
  const progress = { number: { topics: { counting: { completedChallenges: [1, 2] } } } };
  const isBuilt = (topicId, challengeId) => !(topicId === "place-value" && Number(challengeId) === 1);
  const milestone = result(progress, "shapes", "flat-shapes", "1", { isBuilt, onlySubject: true });
  assert.equal(milestone.level, "category");
  assert.deepEqual(milestone.earned, ["challenge", "topic", "category"]);
});

test("replaying a completed challenge does not award a milestone again", () => {
  const progress = { number: { topics: { counting: { completedChallenges: [1, 2] } } } };
  const milestone = result(progress, "number", "counting", "2");
  assert.equal(milestone.level, "practice");
  assert.deepEqual(milestone.earned, []);
});

const done = { number: { topics: { counting: { completedChallenges: [1, 2] }, "place-value": { completedChallenges: [1] } } }, shapes: { topics: { "flat-shapes": { completedChallenges: [1] } } } };

test("a year with no other subjects counts the others as complete", () => {
  assert.equal(allSubjectsComplete([]), true);
});

test("another subject finished in full lets the year complete", () => {
  assert.equal(allSubjectsComplete([{ curriculum, progress: done, isBuilt: built }]), true);
});

test("another subject only partly done blocks the year", () => {
  const partial = { number: { topics: { counting: { completedChallenges: [1, 2] } } } };
  assert.equal(allSubjectsComplete([{ curriculum, progress: partial, isBuilt: built }]), false);
  assert.equal(allSubjectsComplete([{ curriculum, progress: {}, isBuilt: built }]), false);
});

test("another subject that could not be read never counts as complete", () => {
  assert.equal(allSubjectsComplete([{ curriculum, progress: null, isBuilt: built }]), false);
  assert.equal(allSubjectsComplete([{ curriculum, progress: undefined, isBuilt: built }]), false);
});

test("another subject with unbuilt challenges cannot be complete yet", () => {
  const unbuilt = (topicId) => topicId !== "flat-shapes";
  assert.equal(allSubjectsComplete([{ curriculum, progress: done, isBuilt: unbuilt }]), false);
});

test("one finished and one unfinished other subject still blocks the year", () => {
  assert.equal(allSubjectsComplete([
    { curriculum, progress: done, isBuilt: built },
    { curriculum, progress: {}, isBuilt: built },
  ]), false);
});

test("reverse-order completion awards milestones only when their members are done", () => {
  let progress = {};
  const positions = curriculum.flatMap(category => category.topics.flatMap(topic =>
    topic.challenges.map(challenge => [category.id, topic.id, challenge.id]))).reverse();
  for (const [index, [categoryId, topicId, challengeId]] of positions.entries()) {
    const milestone = result(progress, categoryId, topicId, challengeId, { othersDone: true });
    assert.equal(milestone.earned.includes("subject"), index === positions.length - 1);
    assert.equal(milestone.earned.includes("year"), index === positions.length - 1);
    if (topicId === "counting") {
      assert.equal(milestone.earned.includes("topic"), challengeId === 1);
      assert.equal(milestone.earned.includes("category"), challengeId === 1);
    }
    progress = completeChallenge(progress, categoryId, topicId, challengeId);
    assert.deepEqual(result(progress, categoryId, topicId, challengeId).earned, []);
  }
});
