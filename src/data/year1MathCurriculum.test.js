import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { year1MathCurriculum as curriculum } from "./year1MathCurriculum.js";
import { year1EnglishCurriculum } from "./year1EnglishCurriculum.js";
import { year2MathCurriculum } from "./year2MathCurriculum.js";
import { isCurriculumAvailable, loadCurriculum } from "./curriculumRegistry.js";
import { buildLockState } from "./curriculumLocks.js";
import { completeChallenge } from "./progressRules.js";
import { allSubjectsComplete, getCompletionMilestones } from "./completionMilestones.js";
import { readBuiltChallenges, makeIsBuilt } from "../../scripts/seedBuilt.js";
import { findNextChallenge } from "./curriculumNavigation.js";

// Permanent identifiers from the initial Year 1 Maths implementation.
const LOCKED_IDS = [
  [
    "number---number-and-place-value",
    [
      "counting-objects",
      "counting-forwards-and-backwards-to-100",
      "reading-and-writing-numerals-to-100",
      "counting-in-twos-fives-and-tens",
      "one-more-and-one-less",
      "comparing-and-ordering-quantities",
      "number-words-to-20"
    ]
  ],
  [
    "number---addition-and-subtraction",
    [
      "addition-subtraction-and-equals-signs",
      "number-bonds-within-20",
      "adding-within-20",
      "subtracting-within-20",
      "missing-numbers-within-20",
      "one-step-addition-and-subtraction-problems"
    ]
  ],
  [
    "number---multiplication-and-division",
    [
      "equal-groups-and-arrays",
      "sharing-and-grouping",
      "doubling-small-quantities"
    ]
  ],
  [
    "number---fractions",
    [
      "finding-a-half",
      "finding-a-quarter"
    ]
  ],
  [
    "measurement",
    [
      "comparing-and-measuring-lengths-and-heights",
      "comparing-and-measuring-mass",
      "comparing-and-measuring-capacity",
      "measuring-and-comparing-time",
      "recognising-coins",
      "recognising-notes",
      "sequencing-events",
      "days-months-and-years",
      "oclock-and-half-past"
    ]
  ],
  [
    "geometry-properties-of-shapes",
    [
      "recognising-2-d-shapes",
      "recognising-3-d-shapes"
    ]
  ],
  [
    "geometry-position-and-direction",
    [
      "describing-position",
      "describing-movement",
      "whole-half-quarter-and-three-quarter-turns"
    ]
  ]
];
const topics = curriculum.flatMap(c => c.topics);
const isBuilt = makeIsBuilt(readBuiltChallenges(fileURLToPath(new URL("../../", import.meta.url))), "math", 1);
const locks = progress => buildLockState({ curriculum, progress, isBuilt });
function finish(tree) {
  let progress = {};
  for (const c of tree) for (const t of c.topics) for (const q of t.challenges) {
    progress = completeChallenge(progress, c.id, t.id, q.id);
  }
  return progress;
}

test("Year 1 Maths: seven statutory strands, 32 stable topics and 128 challenge slots", () => {
  assert.deepEqual(curriculum.map(c => [c.id, c.topics.map(t => t.id)]), LOCKED_IDS);
  assert.equal(curriculum.length, 7);
  assert.equal(topics.length, 32);
  assert.equal(new Set(topics.map(t => t.id)).size, 32);
  assert.equal(loadCurriculum("1", "math"), curriculum);
  assert.equal(isCurriculumAvailable(1, "math"), true);
  for (const t of topics) {
    assert.ok(t.icon);
    assert.deepEqual(t.challenges.map(q => q.id), [1, 2, 3, 4]);
  }
});

test("Year 1 Maths: every computed loader path exists and forwards completion", () => {
  for (const t of topics) for (const { id } of t.challenges) {
    const name = t.id.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join("");
    const file = new URL(`../pages/skills/math/challenges/year1/${t.id}/${name}Challenge${id}.jsx`, import.meta.url);
    assert.ok(existsSync(file), file.pathname);
    const source = readFileSync(file, "utf8");
    assert.ok(source.includes("export default"));
    assert.ok(source.includes(`level={${id}}`));
    assert.ok(source.includes(`topicId="${t.id}"`));
    assert.ok(source.includes("onComplete={onComplete}"));
    assert.ok(isBuilt(t.id, id));
  }
});

test("Year 1 Maths: fresh locks, completion, reload, replay and category cascade", () => {
  const [category] = curriculum, [topic] = category.topics;
  let progress = {};
  assert.deepEqual(locks(progress).map(c => c.locked), [false, true, true, true, true, true, true]);
  assert.deepEqual(locks(progress)[0].topics[0].challenges.map(c => c.locked), [false, true, true, true]);
  progress = completeChallenge(progress, category.id, topic.id, 1);
  const restored = JSON.parse(JSON.stringify(progress));
  assert.deepEqual(locks(restored)[0].topics[0].challenges.map(c => c.locked), [false, false, true, true]);
  assert.deepEqual(findNextChallenge(locks(restored), { categoryId: category.id, topicId: topic.id, challengeId: 1 }).challengeId, 2);
  for (const t of category.topics) for (const q of t.challenges) progress = completeChallenge(progress, category.id, t.id, q.id);
  assert.equal(locks(progress)[0].complete, true);
  assert.equal(locks(progress)[1].locked, false);
  assert.equal(locks(progress)[0].topics[0].challenges[0].locked, false);
  assert.deepEqual(completeChallenge(progress, category.id, topic.id, 1), progress);
});

test("Year 1 Maths: registration isolates other curricula and year awards require both subjects", () => {
  const oldEnglish = JSON.stringify(year1EnglishCurriculum), oldMaths = JSON.stringify(year2MathCurriculum);
  const existingEnglishProgress = finish(year1EnglishCurriculum), existingYear2Progress = finish(year2MathCurriculum);
  const before = JSON.stringify([existingEnglishProgress, existingYear2Progress]);
  const finished = finish(curriculum);
  assert.equal(JSON.stringify([existingEnglishProgress, existingYear2Progress]), before);
  assert.equal(JSON.stringify(year1EnglishCurriculum), oldEnglish);
  assert.equal(JSON.stringify(year2MathCurriculum), oldMaths);
  assert.notEqual(curriculum, year2MathCurriculum);
  const subjects = [
    { curriculum, progress: finished, isBuilt },
    { curriculum: year1EnglishCurriculum, progress: {}, isBuilt: () => true },
  ];
  assert.equal(allSubjectsComplete(subjects), false);
  subjects[1].progress = existingEnglishProgress;
  assert.equal(allSubjectsComplete(subjects), true);
  const category = curriculum.at(-1), topic = category.topics.at(-1);
  const almost = structuredClone(finished);
  almost[category.id].topics[topic.id].completedChallenges = [1, 2, 3];
  const input = { curriculum, progress: almost, categoryId: category.id, topicId: topic.id, challengeId: 4, isBuilt };
  assert.equal(getCompletionMilestones({ ...input, otherSubjectsComplete: false }).earned.includes("year"), false);
  assert.equal(getCompletionMilestones({ ...input, otherSubjectsComplete: true }).earned.includes("year"), true);
});

test("Year 1 Maths: every topic has a statutory mapping", () => {
  const reference = readFileSync(new URL("../../docs/curriculum/year-1-maths.md", import.meta.url), "utf8");
  for (const topic of topics) assert.ok(reference.includes(`| ${topic.name} |`), topic.name);
});
