import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { year2ScienceCurriculum as curriculum } from "./year2ScienceCurriculum.js";
import { year2MathCurriculum } from "./year2MathCurriculum.js";
import { year2EnglishCurriculum } from "./year2EnglishCurriculum.js";
import { year1ScienceCurriculum } from "./year1ScienceCurriculum.js";
import { year3ScienceCurriculum } from "./year3ScienceCurriculum.js";
import { isCurriculumAvailable, loadCurriculum } from "./curriculumRegistry.js";
import { buildLockState } from "./curriculumLocks.js";
import { completeChallenge } from "./progressRules.js";
import { allSubjectsComplete, getCompletionMilestones } from "./completionMilestones.js";
import { readBuiltChallenges, makeIsBuilt } from "../../scripts/seedBuilt.js";
import { findNextChallenge } from "./curriculumNavigation.js";
import { TOPIC_SKILLS, SKILL_STATEMENT_MAX } from "./certificateSkills.js";

// Permanent identifiers, approved 2026-10-11. A change here orphans saved
// progress and must be treated as a migration.
const LOCKED_IDS = [
  ["living-things-and-their-habitats", ["living-dead-and-never-alive", "habitats", "micro-habitats", "simple-food-chains", "where-food-comes-from"]],
  ["plants", ["seeds-and-bulbs", "from-seed-to-plant", "what-plants-need-to-grow", "plant-experiments"]],
  ["animals-including-humans", ["animals-and-their-offspring", "growing-into-adults", "what-animals-need-to-survive", "exercise", "healthy-eating", "hygiene"]],
  ["uses-of-everyday-materials", ["materials-and-their-uses", "choosing-the-right-material", "squashing-bending-twisting-and-stretching", "inventors-of-new-materials"]],
];
const topics = curriculum.flatMap((c) => c.topics);
const isBuilt = makeIsBuilt(readBuiltChallenges(fileURLToPath(new URL("../../", import.meta.url))), "science", 2);
const locks = (progress) => buildLockState({ curriculum, progress, isBuilt });
function finish(tree) {
  let progress = {};
  for (const c of tree) for (const t of c.topics) for (const q of t.challenges) progress = completeChallenge(progress, c.id, t.id, q.id);
  return progress;
}

test("Year 2 Science: four statutory areas, 19 stable topics and 76 challenge slots", () => {
  assert.deepEqual(curriculum.map((c) => [c.id, c.topics.map((t) => t.id)]), LOCKED_IDS);
  assert.deepEqual(curriculum.map((c) => c.title), ["Living things and their habitats", "Plants", "Animals, including humans", "Uses of everyday materials"]);
  assert.equal(topics.length, 19);
  assert.equal(loadCurriculum("2", "science"), curriculum);
  assert.equal(isCurriculumAvailable(2, "science"), true);
  const year1Topics = new Set(year1ScienceCurriculum.flatMap((c) => c.topics.map((t) => t.id)));
  assert.ok(topics.every((t) => !year1Topics.has(t.id)), "a Year 2 topic id repeats a Year 1 one");
  for (const t of topics) {
    assert.ok(t.icon);
    assert.deepEqual(t.challenges.map((q) => q.id), [1, 2, 3, 4]);
    const line = TOPIC_SKILLS[`2/science/${t.id}`];
    assert.ok(line, `${t.id} has no certificate line`);
    assert.ok(line.length <= SKILL_STATEMENT_MAX, `${t.id}: certificate line too long`);
  }
});

test("Year 2 Science: every computed loader path exists and forwards completion", () => {
  for (const t of topics) for (const { id } of t.challenges) {
    const name = t.id.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join("");
    const file = new URL(`../pages/skills/science/challenges/year2/${t.id}/${name}Challenge${id}.jsx`, import.meta.url);
    assert.ok(existsSync(file), file.pathname);
    const source = readFileSync(file, "utf8");
    assert.ok(source.includes("export default"));
    assert.ok(source.includes(`level={${id}}`));
    assert.ok(source.includes(`topicId="${t.id}"`));
    assert.ok(source.includes("onComplete={onComplete}"));
    assert.ok(isBuilt(t.id, id));
  }
});

test("Year 2 Science: fresh locks, completion, reload, replay and category cascade", () => {
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

test("Year 2 Science: other curricula are untouched and the year award needs all three subjects", () => {
  const snapshot = JSON.stringify([year2MathCurriculum, year2EnglishCurriculum, year1ScienceCurriculum, year3ScienceCurriculum]);
  const maths = finish(year2MathCurriculum), english = finish(year2EnglishCurriculum);
  const finished = finish(curriculum);
  assert.equal(JSON.stringify([year2MathCurriculum, year2EnglishCurriculum, year1ScienceCurriculum, year3ScienceCurriculum]), snapshot);
  const subjects = [
    { curriculum, progress: finished, isBuilt },
    { curriculum: year2MathCurriculum, progress: maths, isBuilt: () => true },
    { curriculum: year2EnglishCurriculum, progress: {}, isBuilt: () => true },
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

test("Year 2 Science: every topic has a statutory mapping", () => {
  const reference = readFileSync(new URL("../../docs/curriculum/year-2-science.md", import.meta.url), "utf8");
  for (const topic of topics) assert.ok(reference.includes(`| ${topic.name} | \`${topic.id}\` |`), topic.name);
});
