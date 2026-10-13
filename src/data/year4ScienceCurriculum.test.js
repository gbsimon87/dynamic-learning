import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { year4ScienceCurriculum as curriculum } from "./year4ScienceCurriculum.js";
import { YEAR4_SCIENCE_BUILDERS } from "./challenges/year4Science/index.js";
import { loadCurriculum, isCurriculumAvailable } from "./curriculumRegistry.js";
import { buildLockState } from "./curriculumLocks.js";
import { completeChallenge } from "./progressRules.js";
import { fullSubjectComplete, allSubjectsComplete, getCompletionMilestones } from "./completionMilestones.js";
import { findNextChallenge } from "./curriculumNavigation.js";
import { subjectsForYear } from "./signupFlow.js";
import { describeCertificate, registeredSubjectNames } from "./certificates.js";
import { YEAR4_SCIENCE_TOPIC_SKILLS } from "./year4ScienceCertificateSkills.js";

const IDS = [
  ["living-things-and-their-habitats", ["grouping-living-things", "classification-keys", "changing-environments"]],
  ["animals-including-humans", ["the-human-digestive-system", "teeth-and-their-functions", "food-chains"]],
  ["states-of-matter", ["solids-liquids-and-gases", "heating-and-cooling", "evaporation-and-condensation", "the-water-cycle"]],
  ["sound", ["sounds-and-vibrations", "how-sound-travels", "changing-pitch", "volume-and-vibrations", "sound-and-distance"]],
  ["electricity", ["electrical-appliances-and-safety", "simple-series-circuits", "complete-and-incomplete-circuits", "switches", "conductors-and-insulators"]],
];
const topics = curriculum.flatMap(c => c.topics);
const isBuilt = (topic, id) => {
  const pascal = topic.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join("");
  return fs.existsSync(new URL(`../pages/skills/science/challenges/year4/${topic}/${pascal}Challenge${id}.jsx`, import.meta.url));
};
const finish = data => data.reduce((p, c) => c.topics.reduce((p, t) => t.challenges.reduce((p, slot) => completeChallenge(p, c.id, t.id, slot.id), p), p), {});

test("Year 4 Science locks its stable IDs and implements all 80 mapped slots", () => {
  assert.equal(isCurriculumAvailable(4, "science"), true);
  assert.equal(loadCurriculum("4", "science"), curriculum);
  assert.deepEqual(curriculum.map(c => [c.id, c.topics.map(t => t.id)]), IDS);
  assert.equal(topics.length, 20);
  assert.equal(new Set(topics.map(t => t.id)).size, 20);
  assert.equal(new Set(topics.map(t => t.challenges)).size, 20);
  assert.deepEqual(Object.keys(YEAR4_SCIENCE_BUILDERS).sort(), topics.map(t => t.id).sort());
  const source = fs.readFileSync(new URL("../../docs/curriculum/year-4-science.md", import.meta.url), "utf8");
  for (const topic of topics) {
    assert.ok(source.includes(`\`${topic.id}\``), `${topic.id} lacks source mapping`);
    assert.deepEqual(topic.challenges.map(slot => slot.id), [1, 2, 3, 4]);
    const pascal = topic.id.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join("");
    for (const slot of topic.challenges) {
      assert.equal(isBuilt(topic.id, slot.id), true);
      const text = fs.readFileSync(new URL(`../pages/skills/science/challenges/year4/${topic.id}/${pascal}Challenge${slot.id}.jsx`, import.meta.url), "utf8");
      assert.ok(text.includes("export default"));
      assert.ok(text.includes(`level={${slot.id}}`));
      assert.ok(text.includes("onComplete={onComplete}"));
    }
  }
  assert.deepEqual(subjectsForYear(4), ["math", "english", "geography", "science", "history"]);
  assert.deepEqual(registeredSubjectNames(4), ["Maths", "English", "Science"]);
});

test("all 80 completions unlock sequentially, replay once and award Science only at the end", () => {
  let progress = {};
  const fresh = buildLockState({ curriculum, progress, isBuilt });
  assert.deepEqual(fresh.map(c => c.locked), [false, true, true, true, true]);
  for (const [ci, category] of curriculum.entries()) for (const [ti, topic] of category.topics.entries()) for (const slot of topic.challenges) {
    const before = structuredClone(progress);
    const locks = buildLockState({ curriculum, progress, isBuilt });
    assert.equal(locks[ci].topics[ti].challenges[slot.id - 1].locked, false);
    if (slot.id < 4) assert.equal(locks[ci].topics[ti].challenges[slot.id].locked, true);
    const final = ci === 4 && ti === 4 && slot.id === 4;
    const args = { curriculum, progress, isBuilt, categoryId: category.id, topicId: topic.id, challengeId: slot.id };
    const earned = getCompletionMilestones(args).earned;
    assert.equal(earned.includes("topic"), slot.id === 4);
    assert.equal(earned.includes("category"), slot.id === 4 && ti === category.topics.length - 1);
    assert.equal(earned.includes("subject"), final);
    assert.equal(earned.includes("year"), false);
    assert.equal(getCompletionMilestones({ ...args, otherSubjectsComplete: true }).earned.includes("year"), final);
    progress = completeChallenge(progress, category.id, topic.id, String(slot.id));
    assert.deepEqual(before, args.progress);
    assert.ok(progress[category.id].topics[topic.id].completedChallenges.every(Number.isInteger));
    const persisted = JSON.parse(JSON.stringify(progress));
    assert.deepEqual(buildLockState({ curriculum, progress: persisted, isBuilt }), buildLockState({ curriculum, progress, isBuilt }));
    assert.equal(completeChallenge(progress, category.id, topic.id, slot.id), progress);
    assert.equal(fullSubjectComplete(progress, curriculum, isBuilt), final);
    if (final) assert.equal(findNextChallenge(buildLockState({ curriculum, progress, isBuilt }), args), null);
  }
  assert.ok(buildLockState({ curriculum, progress, isBuilt }).every(c => c.topics.every(t => t.challenges.every(s => s.completed && !s.locked))));
  assert.equal(fullSubjectComplete(progress, curriculum, (topic, id) => isBuilt(topic, id) && !(topic === topics.at(-1).id && Number(id) === 4)), false);
});

test("each Year 4 Science topic certificate resolves its authored science statement", () => {
  assert.equal(Object.keys(YEAR4_SCIENCE_TOPIC_SKILLS).length, topics.length);
  for (const topic of topics) {
    const certificate = describeCertificate({ kind: "topic", year: "4", subject: "science", subjectName: "Science", topicId: topic.id, topicName: topic.name, icon: topic.icon });
    assert.equal(certificate.context, "Year 4 Science");
    assert.equal(certificate.key, `topic:4/science/${topic.id}`);
    assert.equal(certificate.statement, YEAR4_SCIENCE_TOPIC_SKILLS[`4/science/${topic.id}`]);
    assert.ok(certificate.statement.startsWith("I "));
  }
});

test("the Year 4 award needs Maths, English and Science while other years remain independent", () => {
  const candidates = ["math", "english", "science"].map(subject => {
    const data = loadCurriculum(4, subject);
    const implemented = (topic, id) => {
      const pascal = topic.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join("");
      return fs.existsSync(new URL(`../pages/skills/${subject}/challenges/year4/${topic}/${pascal}Challenge${id}.jsx`, import.meta.url));
    };
    return { curriculum: data, progress: finish(data), isBuilt: implemented };
  });
  assert.equal(allSubjectsComplete(candidates), true);
  for (let i = 0; i < 3; i++) assert.equal(allSubjectsComplete(candidates.map((c, j) => i === j ? { ...c, progress: {} } : c)), false);
  for (let i = 0; i < 3; i++) assert.equal(allSubjectsComplete(candidates.map((c, j) => i === j ? { ...c, isBuilt: () => false } : c)), false);
  for (const year of [1, 3]) {
    const data = loadCurriculum(year, "science");
    const old = finish(data), before = structuredClone(old);
    const category = curriculum[0], topic = category.topics[0];
    completeChallenge({}, category.id, topic.id, 1);
    assert.deepEqual(old, before);
  }
});
