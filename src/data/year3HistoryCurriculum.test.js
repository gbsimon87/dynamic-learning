import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { year3HistoryCurriculum as curriculum } from "./year3HistoryCurriculum.js";
import { countsTowardYear, loadCurriculum, yearAwardSubjectIds } from "./curriculumRegistry.js";
import { TOPIC_SKILLS } from "./certificateSkills.js";
import { buildLockState } from "./curriculumLocks.js";
import { completeChallenge } from "./progressRules.js";
import { allSubjectsComplete, getCompletionMilestones } from "./completionMilestones.js";
import { yearCertificate } from "./certificates.js";

// Approved 2026-10-12; these keys must never silently rename saved progress.
const LOCKED_IDS = [
  ["stone-age-to-iron-age", ["how-we-know-about-prehistory", "stone-age-hunter-gatherers", "the-first-farmers-and-skara-brae", "stonehenge-and-the-bronze-age", "iron-age-hill-forts", "from-stone-to-iron"]],
  ["roman-britain", ["the-roman-empire-and-its-army", "julius-caesar-tries-to-invade", "claudius-conquers-britain", "boudica-fights-back", "hadrians-wall", "roman-towns-roads-and-baths", "roman-gods-and-early-christianity", "how-the-romans-changed-britain"]],
  ["the-first-civilisations", ["where-the-first-civilisations-began", "what-the-first-civilisations-gave-us", "the-river-nile", "pharaohs-and-pyramids", "hieroglyphs", "egyptian-gods-and-mummies", "everyday-life-in-ancient-egypt", "tutankhamuns-tomb"]],
];
const topics = curriculum.flatMap((c) => c.topics);
const isBuilt = (id, level) => {
  const name = id.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join("");
  return existsSync(new URL(`../pages/skills/history/challenges/year3/${id}/${name}Challenge${level}.jsx`, import.meta.url));
};

test("Year 3 History: three categories, 22 approved topics, 88 slots and certificate lines", () => {
  assert.deepEqual(curriculum.map((c) => [c.id, c.topics.map((t) => t.id)]), LOCKED_IDS);
  assert.deepEqual(curriculum.map((c) => c.title), ["Stone Age to Iron Age", "Roman Britain", "The First Civilisations"]);
  assert.equal(topics.length, 22);
  assert.equal(loadCurriculum("3", "history"), curriculum);
  for (const topic of topics) {
    assert.ok(topic.icon);
    assert.match(topic.name, /^[A-Za-z0-9 ',-]+$/);
    assert.deepEqual(topic.challenges.map((q) => q.id), [1, 2, 3, 4]);
    assert.ok(TOPIC_SKILLS[`3/history/${topic.id}`]);
  }
});

test("Year 3 History: every topic maps to the KS2 source and the later-year gaps are recorded", () => {
  const text = readFileSync(new URL("../../docs/curriculum/key-stage-2-history.md", import.meta.url), "utf8");
  for (const topic of topics) assert.ok(text.includes(`| ${topic.name} | \`${topic.id}\` |`), topic.id);
  assert.match(text, /Year 3 therefore does \*\*not\*\* cover the whole KS2 programme/);
});

test("Year 3 History: all 88 wrappers are built, unlock in order and remain replayable", () => {
  assert.equal(topics.flatMap((t) => t.challenges.filter((q) => isBuilt(t.id, q.id))).length, 88);
  const locks = (progress) => buildLockState({ curriculum, progress, isBuilt });
  const first = curriculum[0], pilot = first.topics[0];
  let progress = {};
  assert.deepEqual(locks(progress)[0].topics[0].challenges.map((q) => q.locked), [false, true, true, true]);
  for (const t of locks(progress).flatMap((c) => c.topics).slice(1)) {
    assert.equal(t.challenges.every((q) => !q.missing), true);
    assert.equal(t.locked, true);
  }
  progress = completeChallenge(progress, first.id, pilot.id, "1");
  const restored = JSON.parse(JSON.stringify(progress));
  assert.deepEqual(locks(restored)[0].topics[0].challenges.map((q) => q.locked), [false, false, true, true]);
  for (const id of [2, 3, 4]) progress = completeChallenge(progress, first.id, pilot.id, id);
  assert.equal(locks(progress)[0].topics[0].complete, true);
  assert.equal(locks(progress)[0].topics[1].locked, false);
  assert.equal(locks(progress)[1].locked, true);
  for (const category of curriculum) for (const topic of category.topics) {
    assert.equal(locks(progress).find((c) => c.id === category.id).topics.find((t) => t.id === topic.id).locked, false);
    for (const level of [1, 2, 3, 4]) progress = completeChallenge(progress, category.id, topic.id, level);
  }
  assert.equal(locks(progress).every((c) => c.complete), true);
  assert.deepEqual(completeChallenge(progress, first.id, pilot.id, 1), progress);
  assert.deepEqual(progress[first.id].topics[pilot.id].completedChallenges, [1, 2, 3, 4]);
});

test("Year 3 History: owner-approved inclusion requires all four subjects for the year award", () => {
  assert.equal(countsTowardYear(3, "history"), true);
  assert.deepEqual(yearAwardSubjectIds(3), ["math", "english", "science", "history"]);
  assert.deepEqual(yearAwardSubjectIds(3, "math"), ["english", "science", "history"]);
  assert.deepEqual(yearAwardSubjectIds(3, "history"), ["math", "english", "science"]);
  assert.equal(countsTowardYear(1, "history"), true);
  assert.equal(countsTowardYear(2, "history"), false);
});

test("Year 3 History: the year certificate and final-subject milestone wait for History", () => {
  const candidates = yearAwardSubjectIds(3).map((subject) => {
    const curriculum = loadCurriculum(3, subject);
    let progress = {};
    for (const category of curriculum) for (const topic of category.topics) for (const challenge of topic.challenges) {
      progress = completeChallenge(progress, category.id, topic.id, challenge.id);
    }
    return { year: 3, subject, subjectName: subject === "math" ? "Maths" : subject[0].toUpperCase() + subject.slice(1), curriculum, progress, isBuilt: () => true };
  });
  const before = JSON.stringify(candidates);
  const withoutHistory = candidates.map((entry) => entry.subject === "history" ? { ...entry, progress: {} } : entry);
  assert.equal(yearCertificate(withoutHistory, 3), null);
  assert.equal(yearCertificate(candidates.map((entry) => entry.subject === "history" ? { ...entry, isBuilt: () => false } : entry), 3), null);
  assert.equal(yearCertificate(candidates, 3).achievement, "finished every Year 3 challenge in Maths, English, Science and History");
  for (const last of candidates) {
    const category = last.curriculum.at(-1), topic = category.topics.at(-1), challenge = topic.challenges.at(-1);
    const progress = structuredClone(last.progress);
    progress[category.id].topics[topic.id].completedChallenges = topic.challenges.slice(0, -1).map((q) => q.id);
    assert.equal(yearCertificate(candidates.map((entry) => entry === last ? { ...entry, progress } : entry), 3), null);
    const args = { ...last, progress, categoryId: category.id, topicId: topic.id, challengeId: challenge.id };
    assert.ok(getCompletionMilestones({ ...args, otherSubjectsComplete: allSubjectsComplete(candidates.filter((entry) => entry !== last)) }).earned.includes("year"));
    if (last.subject !== "history") {
      assert.equal(getCompletionMilestones({ ...args, otherSubjectsComplete: allSubjectsComplete(withoutHistory.filter((entry) => entry.subject !== last.subject)) }).earned.includes("year"), false);
    }
  }
  assert.equal(JSON.stringify(candidates), before, "award checks leave all saved progress intact");
});
