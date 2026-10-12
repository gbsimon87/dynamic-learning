import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { year4HistoryCurriculum as curriculum } from "./year4HistoryCurriculum.js";
import { countsTowardYear, loadCurriculum, yearAwardSubjectIds } from "./curriculumRegistry.js";
import { TOPIC_SKILLS } from "./certificateSkills.js";
import { buildLockState } from "./curriculumLocks.js";
import { completeChallenge } from "./progressRules.js";

// Approved 2026-10-12; these keys must never silently rename saved progress.
const LOCKED_IDS = [
  ["anglo-saxons-and-scots", ["when-the-romans-left-britain", "the-scots-come-from-ireland", "anglo-saxon-settlers", "anglo-saxon-kingdoms", "anglo-saxon-village-life", "clues-in-place-names", "sutton-hoo-and-anglo-saxon-art", "saints-and-monasteries"]],
  ["vikings-and-anglo-saxons", ["who-were-the-vikings", "the-raid-on-lindisfarne", "the-great-viking-invasion", "viking-life-in-jorvik", "alfred-the-great", "athelstan-first-king-of-england", "danegeld-and-king-cnut", "anglo-saxon-laws-and-justice", "edward-the-confessor", "from-romans-to-1066"]],
];
const topics = curriculum.flatMap((c) => c.topics);
const isBuilt = (id, level) => {
  const name = id.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join("");
  return existsSync(new URL(`../pages/skills/history/challenges/year4/${id}/${name}Challenge${level}.jsx`, import.meta.url));
};

test("Year 4 History: two categories, 18 approved topics, 72 slots and certificate lines", () => {
  assert.deepEqual(curriculum.map((c) => [c.id, c.topics.map((t) => t.id)]), LOCKED_IDS);
  assert.deepEqual(curriculum.map((c) => c.title), ["Anglo-Saxons and Scots", "Vikings and Anglo-Saxons"]);
  assert.equal(topics.length, 18);
  assert.equal(loadCurriculum("4", "history"), curriculum);
  for (const topic of topics) {
    assert.ok(topic.icon);
    assert.match(topic.name, /^[A-Za-z0-9 ',-]+$/);
    assert.deepEqual(topic.challenges.map((q) => q.id), [1, 2, 3, 4]);
    assert.ok(TOPIC_SKILLS[`4/history/${topic.id}`]);
  }
});

test("Year 4 History: every topic maps to the KS2 source and the later-year gaps are recorded", () => {
  const text = readFileSync(new URL("../../docs/curriculum/key-stage-2-history.md", import.meta.url), "utf8");
  for (const topic of topics) assert.ok(text.includes(`| ${topic.name} | \`${topic.id}\` |`), topic.id);
  assert.match(text, /Year 3 therefore does \*\*not\*\* cover the whole KS2 programme/);
});

test("Year 4 History: all 72 wrappers are built, unlock in order and remain replayable", () => {
  assert.equal(topics.flatMap((t) => t.challenges.filter((q) => isBuilt(t.id, q.id))).length, 72);
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


test("Year 4 History preserves existing year awards and other history year decisions", () => {
  assert.equal(countsTowardYear(4, "history"), false);
  assert.deepEqual(yearAwardSubjectIds(4), ["math", "english", "science"]);
  assert.equal(countsTowardYear(1, "history"), true);
  assert.equal(countsTowardYear(2, "history"), false);
  assert.equal(countsTowardYear(3, "history"), true);
});
