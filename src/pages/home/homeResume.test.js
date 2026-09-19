import test from "node:test";
import assert from "node:assert/strict";
import { pickResume } from "./homeResume.js";

const curriculum = [
  {
    id: "number",
    title: "Number",
    topics: [
      { id: "counting", name: "Counting", challenges: [{ id: 1, title: "Count in 2s" }, { id: 2, title: "Count in 5s" }] },
      { id: "place-value", name: "Place Value", challenges: [{ id: 1, title: "Tens and ones" }] },
    ],
  },
  {
    id: "geometry",
    title: "Geometry",
    topics: [
      { id: "shapes", name: "Shapes", challenges: [{ id: 1, title: "Name the shape" }] },
    ],
  },
];

const allBuilt = () => true;

const candidate = (overrides = {}) => ({
  year: 2,
  subject: "math",
  subjectName: "Maths",
  curriculum,
  progress: {},
  updatedAt: "2026-01-01T00:00:00.000Z",
  isBuilt: allBuilt,
  ...overrides,
});

test("returns null when no candidate has any completed challenge", () => {
  assert.equal(pickResume([candidate()]), null);
});

test("returns null for an empty candidate list", () => {
  assert.equal(pickResume([]), null);
});

test("points at the first playable, unfinished challenge", () => {
  const resume = pickResume([
    candidate({
      progress: { number: { topics: { counting: { completedChallenges: [1] } } } },
    }),
  ]);

  assert.equal(resume.year, 2);
  assert.equal(resume.subject, "math");
  assert.deepEqual(resume.next, {
    categoryId: "number",
    topicId: "counting",
    topicName: "Counting",
    challengeId: 2,
    challengeTitle: "Count in 5s",
    href: "/year/2/math/problem/number/counting/2",
  });
});

test("skips into the following topic once a topic is finished", () => {
  const resume = pickResume([
    candidate({
      progress: { number: { topics: { counting: { completedChallenges: [1, 2] } } } },
    }),
  ]);

  assert.equal(resume.next.topicId, "place-value");
  assert.equal(resume.next.challengeId, 1);
});

test("never points at an unbuilt challenge", () => {
  const resume = pickResume([
    candidate({
      progress: { number: { topics: { counting: { completedChallenges: [1] } } } },
      // Challenge 2 of counting has no component file.
      isBuilt: (topicId, challengeId) =>
        !(topicId === "counting" && Number(challengeId) === 2),
    }),
  ]);

  assert.equal(resume.next.topicId, "place-value");
});

test("reports stats over the built challenges", () => {
  const resume = pickResume([
    candidate({
      progress: { number: { topics: { counting: { completedChallenges: [1] } } } },
    }),
  ]);

  assert.equal(resume.stats.completed, 1);
  assert.equal(resume.stats.total, 4);
  assert.equal(resume.stats.percent, 25);
});

test("chooses the most recently updated curriculum", () => {
  const started = { number: { topics: { counting: { completedChallenges: [1] } } } };

  const resume = pickResume([
    candidate({ year: 2, progress: started, updatedAt: "2026-01-01T00:00:00.000Z" }),
    candidate({ year: 3, progress: started, updatedAt: "2026-05-01T00:00:00.000Z" }),
  ]);

  assert.equal(resume.year, 3);
});

test("ignores curricula with no progress even when they sort later", () => {
  const resume = pickResume([
    candidate({
      year: 2,
      progress: { number: { topics: { counting: { completedChallenges: [1] } } } },
      updatedAt: "2026-01-01T00:00:00.000Z",
    }),
    candidate({ year: 3, progress: {}, updatedAt: "2026-09-01T00:00:00.000Z" }),
  ]);

  assert.equal(resume.year, 2);
});

test("falls back to the highest year when timestamps are missing", () => {
  const started = { number: { topics: { counting: { completedChallenges: [1] } } } };

  const resume = pickResume([
    candidate({ year: 2, progress: started, updatedAt: null }),
    candidate({ year: 3, progress: started, updatedAt: null }),
  ]);

  assert.equal(resume.year, 3);
});

test("reports a finished curriculum with no next challenge", () => {
  const resume = pickResume([
    candidate({
      progress: {
        number: {
          topics: {
            counting: { completedChallenges: [1, 2] },
            "place-value": { completedChallenges: [1] },
          },
        },
        geometry: { topics: { shapes: { completedChallenges: [1] } } },
      },
    }),
  ]);

  assert.equal(resume.next, null);
  assert.equal(resume.stats.percent, 100);
  assert.equal(resume.topicsHref, "/curriculum/year/2/math");
});

test("survives a curriculum with no topics", () => {
  assert.equal(pickResume([candidate({ curriculum: [] })]), null);
});

test("reports progress through the topic the next challenge sits in", () => {
  const resume = pickResume([
    candidate({
      progress: { number: { topics: { counting: { completedChallenges: [1] } } } },
    }),
  ]);

  assert.equal(resume.topic.id, "counting");
  assert.equal(resume.topic.name, "Counting");
  assert.deepEqual(
    { completed: resume.topic.completed, total: resume.topic.total, percent: resume.topic.percent },
    { completed: 1, total: 2, percent: 50 }
  );
});

test("the topic resets to 0% when the next challenge opens a fresh topic", () => {
  const resume = pickResume([
    candidate({
      progress: { number: { topics: { counting: { completedChallenges: [1, 2] } } } },
    }),
  ]);

  assert.equal(resume.topic.id, "place-value");
  assert.equal(resume.topic.percent, 0);
});

test("counts only built challenges towards the topic total", () => {
  const resume = pickResume([
    candidate({
      progress: { number: { topics: { counting: { completedChallenges: [1] } } } },
      // Counting has two challenges in the dataset but only one is built.
      isBuilt: (topicId, challengeId) =>
        !(topicId === "counting" && Number(challengeId) === 2),
    }),
  ]);

  // Counting is finished as far as built challenges go, so the next topic leads.
  assert.equal(resume.topic.id, "place-value");
  assert.equal(resume.topic.total, 1);
});

test("has no current topic once everything built is complete", () => {
  const resume = pickResume([
    candidate({
      progress: {
        number: {
          topics: {
            counting: { completedChallenges: [1, 2] },
            "place-value": { completedChallenges: [1] },
          },
        },
        geometry: { topics: { shapes: { completedChallenges: [1] } } },
      },
    }),
  ]);

  assert.equal(resume.next, null);
  assert.equal(resume.topic, null);
});
