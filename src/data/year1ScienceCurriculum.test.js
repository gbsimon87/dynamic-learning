import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { year1ScienceCurriculum as curriculum } from "./year1ScienceCurriculum.js";
import { year1MathCurriculum } from "./year1MathCurriculum.js";
import { year1EnglishCurriculum } from "./year1EnglishCurriculum.js";
import { year3ScienceCurriculum } from "./year3ScienceCurriculum.js";
import { isCurriculumAvailable, loadCurriculum } from "./curriculumRegistry.js";
import { buildLockState } from "./curriculumLocks.js";
import { completeChallenge } from "./progressRules.js";
import { allSubjectsComplete, getCompletionMilestones } from "./completionMilestones.js";
import { readBuiltChallenges, makeIsBuilt } from "../../scripts/seedBuilt.js";
import { findNextChallenge } from "./curriculumNavigation.js";
import { TOPIC_SKILLS } from "./certificateSkills.js";

// Permanent identifiers, approved 2026-10-11. A change here orphans saved
// progress and must be treated as a migration.
const LOCKED_IDS = [
  ["plants", ["wild-and-garden-plants", "deciduous-and-evergreen-trees", "parts-of-a-flowering-plant", "parts-of-a-tree"]],
  ["animals-including-humans", ["fish-amphibians-reptiles-birds-and-mammals", "carnivores-herbivores-and-omnivores", "comparing-animal-bodies", "parts-of-the-human-body", "our-five-senses"]],
  ["everyday-materials", ["objects-and-materials", "naming-everyday-materials", "properties-of-materials", "grouping-materials"]],
  ["seasonal-changes", ["the-four-seasons", "weather-and-the-seasons", "day-length-through-the-year"]],
];
const topics = curriculum.flatMap((c) => c.topics);
const isBuilt = makeIsBuilt(readBuiltChallenges(fileURLToPath(new URL("../../", import.meta.url))), "science", 1);
const locks = (progress) => buildLockState({ curriculum, progress, isBuilt });
function finish(tree) {
  let progress = {};
  for (const c of tree) for (const t of c.topics) for (const q of t.challenges) progress = completeChallenge(progress, c.id, t.id, q.id);
  return progress;
}

test("Year 1 Science: four statutory areas, 16 stable topics and 64 challenge slots", () => {
  assert.deepEqual(curriculum.map((c) => [c.id, c.topics.map((t) => t.id)]), LOCKED_IDS);
  assert.deepEqual(curriculum.map((c) => c.title), ["Plants", "Animals, including humans", "Everyday materials", "Seasonal changes"]);
  assert.equal(topics.length, 16);
  assert.equal(loadCurriculum("1", "science"), curriculum);
  assert.equal(isCurriculumAvailable(1, "science"), true);
  assert.notEqual(curriculum, year3ScienceCurriculum);
  for (const t of topics) {
    assert.ok(t.icon);
    assert.deepEqual(t.challenges.map((q) => q.id), [1, 2, 3, 4]);
    assert.ok(TOPIC_SKILLS[`1/science/${t.id}`], `${t.id} has no certificate line`);
  }
});

test("Year 1 Science: every computed loader path exists and forwards completion", () => {
  for (const t of topics) for (const { id } of t.challenges) {
    const name = t.id.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join("");
    const file = new URL(`../pages/skills/science/challenges/year1/${t.id}/${name}Challenge${id}.jsx`, import.meta.url);
    assert.ok(existsSync(file), file.pathname);
    const source = readFileSync(file, "utf8");
    assert.ok(source.includes("export default"));
    assert.ok(source.includes(`level={${id}}`));
    assert.ok(source.includes(`topicId="${t.id}"`));
    assert.ok(source.includes("onComplete={onComplete}"));
    assert.ok(isBuilt(t.id, id));
  }
});

test("Year 1 Science: fresh locks, completion, reload, replay and category cascade", () => {
  const [category] = curriculum, [topic] = category.topics;
  let progress = {};
  assert.deepEqual(locks(progress).map((c) => c.locked), [false, true, true, true]);
  assert.deepEqual(locks(progress)[0].topics[0].challenges.map((c) => c.locked), [false, true, true, true]);
  progress = completeChallenge(progress, category.id, topic.id, 1);
  const restored = JSON.parse(JSON.stringify(progress));
  assert.deepEqual(locks(restored)[0].topics[0].challenges.map((c) => c.locked), [false, false, true, true]);
  assert.equal(findNextChallenge(locks(restored), { categoryId: category.id, topicId: topic.id, challengeId: 1 }).challengeId, 2);
  for (const t of category.topics) for (const q of t.challenges) progress = completeChallenge(progress, category.id, t.id, q.id);
  assert.equal(locks(progress)[0].complete, true);
  assert.equal(locks(progress)[1].locked, false);
  assert.deepEqual(completeChallenge(progress, category.id, topic.id, 1), progress);
});

test("Year 1 Science: other curricula are untouched and the year award needs all three subjects", () => {
  const snapshot = JSON.stringify([year1MathCurriculum, year1EnglishCurriculum, year3ScienceCurriculum]);
  const maths = finish(year1MathCurriculum), english = finish(year1EnglishCurriculum);
  const finished = finish(curriculum);
  assert.equal(JSON.stringify([year1MathCurriculum, year1EnglishCurriculum, year3ScienceCurriculum]), snapshot);
  const subjects = [
    { curriculum, progress: finished, isBuilt },
    { curriculum: year1MathCurriculum, progress: maths, isBuilt: () => true },
    { curriculum: year1EnglishCurriculum, progress: {}, isBuilt: () => true },
  ];
  assert.equal(allSubjectsComplete(subjects), false);
  subjects[2].progress = english;
  assert.equal(allSubjectsComplete(subjects), true);
  const category = curriculum.at(-1), topic = category.topics.at(-1);
  const almost = structuredClone(finished);
  almost[category.id].topics[topic.id].completedChallenges = [1, 2, 3];
  const input = { curriculum, progress: almost, categoryId: category.id, topicId: topic.id, challengeId: 4, isBuilt };
  assert.equal(getCompletionMilestones({ ...input, otherSubjectsComplete: false }).earned.includes("year"), false);
  assert.equal(getCompletionMilestones({ ...input, otherSubjectsComplete: true }).earned.includes("year"), true);
});

test("Year 1 Science: every topic has a statutory mapping", () => {
  const reference = readFileSync(new URL("../../docs/curriculum/year-1-science.md", import.meta.url), "utf8");
  for (const topic of topics) assert.ok(reference.includes(`| ${topic.name} | \`${topic.id}\` |`), topic.name);
});
