import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { year4GeographyCurriculum as curriculum } from "./year4GeographyCurriculum.js";
import { countsTowardYear, loadCurriculum, yearAwardSubjectIds } from "./curriculumRegistry.js";
import { TOPIC_SKILLS } from "./certificateSkills.js";
import { buildLockState } from "./curriculumLocks.js";
import { completeChallenge } from "./progressRules.js";
import { completedGeographyActivity } from "./geographyActivities.js";
import { YEAR4_GEOGRAPHY_TOPICS } from "./challenges/geography/year4/index.js";

const IDS = [
  ["north-and-south-america", ["north-american-countries-and-cities", "south-american-countries-and-cities", "washington-state"]],
  ["climate-and-the-globe", ["climate-zones", "biomes-and-vegetation-belts", "day-night-and-time-zones"]],
  ["rivers-and-changing-landscapes", ["river-journeys", "rivers-and-people", "changing-uk-landscapes"]],
  ["settlements-and-resources", ["settlements-and-land-use", "food-and-trade-links", "energy-minerals-and-water", "comparing-three-regions"]],
  ["mapping-and-fieldwork-enquiries", ["six-figure-grid-references", "maps-atlases-and-digital-mapping", "local-fieldwork-enquiry"]],
];
const topics = curriculum.flatMap((c) => c.topics);
const isBuilt = (id, level) => {
  const name = id.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join("");
  return existsSync(new URL(`../pages/skills/geography/challenges/year4/${id}/${name}Challenge${level}.jsx`, import.meta.url));
};

test("Year 4 Geography locks all 16 topic IDs, 64 wrapper paths, four slots, certificate outcomes and a bank per topic", () => {
  assert.deepEqual(curriculum.map((c) => [c.id, c.topics.map((t) => t.id)]), IDS);
  assert.equal(loadCurriculum("4", "geography"), curriculum);
  assert.equal(topics.length, 16);
  for (const topic of topics) {
    assert.deepEqual(topic.challenges.map((c) => c.id), [1, 2, 3, 4]);
    assert.ok(TOPIC_SKILLS[`4/geography/${topic.id}`], topic.id);
    assert.ok(YEAR4_GEOGRAPHY_TOPICS[topic.id], `bank for ${topic.id}`);
    for (const q of topic.challenges) assert.ok(isBuilt(topic.id, q.id), `${topic.id}/${q.id}`);
  }
  const mapping = readFileSync(new URL("../../docs/curriculum/key-stage-2-geography.md", import.meta.url), "utf8");
  for (const t of topics) assert.ok(mapping.includes(`\`${t.id}\``), `${t.id} missing from the KS2 crosswalk`);
});

test("Geography stays outside Year 4 awards and rejects an unknown year", () => {
  assert.equal(countsTowardYear(4, "geography"), false);
  assert.ok(!yearAwardSubjectIds(4).includes("geography"));
  assert.equal(loadCurriculum(5, "geography"), null);
});

test("all Year 4 geography challenges cascade through topics/categories, survive reload, and remain replayable", () => {
  let progress = {};
  const locks = () => buildLockState({ curriculum, progress, isBuilt });
  assert.deepEqual(locks()[0].topics[0].challenges.map((c) => c.locked), [false, true, true, true]);
  assert.ok(locks().slice(1).every((c) => c.locked));
  for (const category of curriculum) for (const topic of category.topics) {
    assert.equal(locks().find((c) => c.id === category.id).topics.find((t) => t.id === topic.id).locked, false);
    for (const { id } of topic.challenges) {
      progress = completeChallenge(progress, category.id, topic.id, String(id));
      progress = JSON.parse(JSON.stringify(progress));
      assert.ok(progress[category.id].topics[topic.id].completedChallenges.every(Number.isInteger));
    }
  }
  assert.ok(locks().every((c) => c.complete));
  const before = JSON.stringify(progress);
  progress = completeChallenge(progress, curriculum[0].id, topics[0].id, 1);
  assert.equal(JSON.stringify(progress), before);
});

test("the fieldwork card appears only for a completed Year 4 enquiry topic and never changes progress", () => {
  const c = curriculum.at(-1), t = c.topics.at(-1), args = { year: 4, subject: "geography", categoryId: c.id, topicId: t.id, isBuilt };
  assert.equal(completedGeographyActivity({ ...args, progress: {} }), null);
  let progress = {}; for (const id of [1, 2, 3, 4]) progress = completeChallenge(progress, c.id, t.id, id);
  const before = JSON.stringify(progress);
  assert.match(completedGeographyActivity({ ...args, progress }).note, /does not certify outdoor/);
  assert.equal(completedGeographyActivity({ ...args, year: 3, progress }), null);
  assert.equal(completedGeographyActivity({ ...args, subject: "history", progress }), null);
  assert.equal(JSON.stringify(progress), before);
});
