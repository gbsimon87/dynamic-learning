import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { year2HistoryCurriculum as curriculum } from "./year2HistoryCurriculum.js";
import { isCurriculumAvailable, loadCurriculum } from "./curriculumRegistry.js";
import { TOPIC_SKILLS } from "./certificateSkills.js";

// Permanent identifiers, approved 2026-10-12. A change here orphans saved
// progress and must be treated as a migration.
const LOCKED_IDS = [
  [
    "changes-within-living-memory",
    [
      "keeping-in-touch-then-and-now",
      "getting-about-then-and-now"
    ]
  ],
  [
    "the-great-fire-of-london",
    [
      "london-in-1666",
      "how-the-great-fire-started-and-spread",
      "how-we-know-about-the-great-fire",
      "london-after-the-fire"
    ]
  ],
  [
    "nurses-who-made-a-difference",
    [
      "florence-nightingale",
      "mary-seacole",
      "edith-cavell",
      "nursing-then-and-now"
    ]
  ],
  [
    "people-who-changed-things",
    [
      "rosa-parks",
      "emily-davison-and-votes-for-women",
      "william-caxton-and-tim-berners-lee"
    ]
  ],
  [
    "days-we-remember",
    [
      "bonfire-night",
      "remembrance-day"
    ]
  ],
  [
    "history-near-you",
    [
      "memorials-and-blue-plaques",
      "old-maps-and-photos"
    ]
  ]
];
const topics = curriculum.flatMap((c) => c.topics);

test("Year 2 History: six categories, 17 stable topics and 68 challenge slots", () => {
  assert.deepEqual(curriculum.map((c) => [c.id, c.topics.map((t) => t.id)]), LOCKED_IDS);
  assert.deepEqual(curriculum.map((c) => c.title), ["Changes Within Living Memory", "The Great Fire of London", "Nurses Who Made a Difference", "People Who Changed Things", "Days We Remember", "History Near You"]);
  assert.equal(topics.length, 17);
  assert.equal(loadCurriculum("2", "history"), curriculum);
  assert.equal(isCurriculumAvailable(2, "history"), true);
  for (const t of topics) {
    assert.ok(t.icon, t.id);
    assert.deepEqual(t.challenges.map((q) => q.id), [1, 2, 3, 4]);
    assert.ok(TOPIC_SKILLS[`2/history/${t.id}`], `${t.id} has no certificate line`);
  }
});

test("Year 2 History: titles use plain letters only", () => {
  for (const name of [...curriculum.map((c) => c.title), ...topics.map((t) => t.name)]) {
    assert.match(name, /^[A-Za-z0-9 ',-]+$/, name);
  }
});

test("Year 2 History: every topic has a statutory mapping row", () => {
  const reference = readFileSync(new URL("../../docs/curriculum/key-stage-1-history.md", import.meta.url), "utf8");
  for (const t of topics) assert.ok(reference.includes(`| ${t.name} | \`${t.id}\` |`), t.name);
});

test("Year 2 History: fresh locks, topic/category cascade and replay", async () => {
  const { buildLockState } = await import("./curriculumLocks.js");
  const { completeChallenge } = await import("./progressRules.js");
  const { findNextChallenge } = await import("./curriculumNavigation.js");
  const locks = (progress) => buildLockState({ curriculum, progress, isBuilt: () => true });
  const category = curriculum[0], topic = category.topics[0];
  let progress = {};
  assert.deepEqual(locks(progress).map((c) => c.locked), [false, true, true, true, true, true]);
  assert.deepEqual(locks(progress)[0].topics[0].challenges.map((q) => q.locked), [false, true, true, true]);
  progress = completeChallenge(progress, category.id, topic.id, 1);
  const restored = JSON.parse(JSON.stringify(progress));
  assert.deepEqual(locks(restored)[0].topics[0].challenges.map((q) => q.locked), [false, false, true, true]);
  assert.equal(findNextChallenge(locks(restored), { categoryId: category.id, topicId: topic.id, challengeId: 1 }).challengeId, 2);
  for (const id of [2, 3, 4]) progress = completeChallenge(progress, category.id, topic.id, id);
  assert.equal(locks(progress)[0].topics[1].locked, false);
  assert.equal(locks(progress)[1].locked, true);
  for (const t of category.topics) for (const q of t.challenges) progress = completeChallenge(progress, category.id, t.id, q.id);
  assert.equal(locks(progress)[0].complete, true);
  assert.equal(locks(progress)[1].locked, false);
  assert.deepEqual(completeChallenge(progress, category.id, topic.id, 1), progress);
});

test("Year 2 History: existing year awards keep their subject requirement pending owner review", async () => {
  const { countsTowardYear, yearAwardSubjectIds } = await import("./curriculumRegistry.js");
  assert.equal(countsTowardYear(2, "history"), false);
  assert.deepEqual(yearAwardSubjectIds(2), ["math", "english", "science"]);
  assert.equal(countsTowardYear(1, "history"), true);
  assert.equal(isCurriculumAvailable(3, "history"), true);
  assert.equal(isCurriculumAvailable(4, "history"), false);
});

test("Year 2 History: local activities are read-only and appear only for a finished local topic", async () => {
  const { completedHistoryActivity } = await import("./historyActivities.js");
  const { completeChallenge } = await import("./progressRules.js");
  const category = curriculum.at(-1);
  for (const topic of category.topics) {
    const input = { year: 2, subject: "history", categoryId: category.id, topicId: topic.id, isBuilt: () => true };
    let progress = {};
    assert.equal(completedHistoryActivity({ ...input, progress }), null);
    for (const id of [1, 2, 3]) progress = completeChallenge(progress, category.id, topic.id, id);
    assert.equal(completedHistoryActivity({ ...input, progress }), null);
    progress = completeChallenge(progress, category.id, topic.id, 4);
    const before = JSON.stringify(progress);
    assert.ok(completedHistoryActivity({ ...input, progress })?.steps.length);
    assert.equal(JSON.stringify(progress), before);
    assert.equal(completedHistoryActivity({ ...input, progress, subject: "science" }), null);
    assert.equal(completedHistoryActivity({ ...input, progress, year: 1 }), null);
    assert.equal(completedHistoryActivity({ ...input, progress, categoryId: "wrong-category" }), null);
  }
});
