import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { year2GeographyCurriculum as curriculum } from "./year2GeographyCurriculum.js";
import { countsTowardYear, loadCurriculum, yearAwardSubjectIds } from "./curriculumRegistry.js";
import { TOPIC_SKILLS } from "./certificateSkills.js";
import { buildLockState } from "./curriculumLocks.js";
import { completeChallenge } from "./progressRules.js";
import { completedGeographyActivity } from "./geographyActivities.js";

const IDS = [
  ["world-and-uk-knowledge", ["continents-and-oceans-together", "uk-places-and-landscapes", "compass-directions-and-routes"]],
  ["weather-and-world-patterns", ["weather-records", "the-equator-and-the-poles"]],
  ["two-small-places", ["whitby-by-the-sea", "kampong-ayer-by-the-river", "homes-and-journeys-in-two-places", "comparing-two-small-places"]],
  ["making-and-reading-maps", ["aerial-views-and-landmarks", "symbols-and-map-keys", "making-a-simple-map"]],
  ["local-fieldwork", ["observing-our-school-grounds", "exploring-our-local-area"]],
];
const topics = curriculum.flatMap(c => c.topics);
const isBuilt = (id, level) => {
  const pascal = id.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join("");
  return existsSync(new URL(`../pages/skills/geography/challenges/year2/${id}/${pascal}Challenge${level}.jsx`, import.meta.url));
};

test("Year 2 Geography: permanent IDs, all 56 wrapper paths, statutory mapping and exact outcomes", () => {
  assert.deepEqual(curriculum.map(c => [c.id, c.topics.map(t => t.id)]), IDS);
  assert.equal(loadCurriculum("2", "geography"), curriculum);
  assert.equal(topics.length, 14);
  const mapping = readFileSync(new URL("../../docs/curriculum/key-stage-1-geography.md", import.meta.url), "utf8");
  const spec = readFileSync(new URL("../../docs/geography-curriculum/year-2-design-spec.md", import.meta.url), "utf8");
  for (const t of topics) {
    assert.deepEqual(t.challenges.map(c => c.id), [1, 2, 3, 4]);
    assert.ok(mapping.includes(`\`${t.id}\``));
    const outcome = TOPIC_SKILLS[`2/geography/${t.id}`];
    assert.ok(spec.includes(`| ${t.name} | ${outcome} |`));
    for (const q of t.challenges) assert.ok(isBuilt(t.id, q.id));
  }
});

test("Year 2 Geography preserves all prior year award requirements", () => {
  assert.equal(countsTowardYear(2, "geography"), false);
  assert.deepEqual(yearAwardSubjectIds(2), ["math", "english", "science"]);
  assert.deepEqual(yearAwardSubjectIds(1), ["math", "english", "science", "history"]);
  assert.deepEqual(yearAwardSubjectIds(3), ["math", "english", "science", "history"]);
  assert.deepEqual(yearAwardSubjectIds(4), ["math", "english", "science"]);
});

test("Year 2 Geography cascades through all topics, reloads numeric completions and permits replay", () => {
  let progress = {};
  const locks = () => buildLockState({ curriculum, progress, isBuilt });
  assert.deepEqual(locks()[0].topics[0].challenges.map(c => c.locked), [false, true, true, true]);
  assert.ok(locks().slice(1).every(c => c.locked));
  for (const category of curriculum) for (const topic of category.topics) {
    assert.equal(locks().find(c => c.id === category.id).topics.find(t => t.id === topic.id).locked, false);
    for (const { id } of topic.challenges) {
      const round = locks().find(c => c.id === category.id).topics.find(t => t.id === topic.id).challenges.find(q => q.id === id);
      assert.equal(round.locked, false);
      progress = completeChallenge(progress, category.id, topic.id, String(id));
      progress = JSON.parse(JSON.stringify(progress));
      assert.ok(progress[category.id].topics[topic.id].completedChallenges.every(Number.isInteger));
    }
  }
  assert.ok(locks().every(c => c.complete));
  const before = JSON.stringify(progress);
  progress = completeChallenge(progress, curriculum[0].id, topics[0].id, 1);
  assert.equal(JSON.stringify(progress), before);
  assert.ok(locks().every(c => c.topics.every(t => t.challenges.every(q => !q.locked))));
});

test("Year 2 grown-up activities are derived only after all four digital slots complete", () => {
  for (const id of ["weather-records", "making-a-simple-map", "observing-our-school-grounds", "exploring-our-local-area"]) {
    const category = curriculum.find(c => c.topics.some(t => t.id === id));
    const args = { year: 2, subject: "geography", categoryId: category.id, topicId: id, isBuilt };
    let progress = {};
    for (const n of [1, 2, 3]) {
      progress = completeChallenge(progress, category.id, id, n);
      assert.equal(completedGeographyActivity({ ...args, progress }), null);
    }
    progress = completeChallenge(progress, category.id, id, 4);
    const before = JSON.stringify(progress);
    const activity = completedGeographyActivity({ ...args, progress });
    assert.match(activity.note, /does not certify outdoor/);
    assert.match(activity.steps.join(" "), /On paper:/);
    assert.equal(completedGeographyActivity({ ...args, year: 1, progress }), null);
    assert.equal(completedGeographyActivity({ ...args, subject: "math", progress }), null);
    assert.equal(JSON.stringify(progress), before);
  }
});

test("Year 2 geography storage stays isolated from other years, subjects and child profiles", async () => {
  const memory = new Map();
  const previous = globalThis.localStorage;
  globalThis.localStorage = { getItem: k => memory.get(k) ?? null, setItem: (k, v) => memory.set(k, String(v)) };
  try {
    const { store } = await import("./store/localStorageStore.js");
    const old = { number: { topics: { counting: { completedChallenges: [1, 2, 3] } } } };
    const documents = [["first", 2, "math"], ["second", 2, "geography"], ["first", 3, "geography"], ["first", 4, "geography"]];
    for (const [child, year, subject] of documents) await store.saveProgress(child, year, subject, old);
    const category = curriculum[0], topic = category.topics[0];
    const progress = completeChallenge({}, category.id, topic.id, "1");
    await store.saveProgress("first", 2, "geography", progress);
    assert.deepEqual((await store.getProgress("first", 2, "geography")).data, progress);
    for (const [child, year, subject] of documents) assert.deepEqual((await store.getProgress(child, year, subject)).data, old);
  } finally {
    if (previous === undefined) delete globalThis.localStorage;
    else globalThis.localStorage = previous;
  }
});
