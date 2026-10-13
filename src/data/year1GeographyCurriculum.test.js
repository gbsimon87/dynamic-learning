import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { year1GeographyCurriculum as curriculum } from "./year1GeographyCurriculum.js";
import { countsTowardYear, loadCurriculum, yearAwardSubjectIds } from "./curriculumRegistry.js";
import { TOPIC_SKILLS } from "./certificateSkills.js";
import { buildLockState } from "./curriculumLocks.js";
import { completeChallenge } from "./progressRules.js";
import { completedGeographyActivity } from "./geographyActivities.js";
import { YEAR1_GEOGRAPHY_BUILDERS, YEAR1_GEOGRAPHY_TOPICS } from "./challenges/geography/year1/index.js";
import { lintGeographyTopic, GEOGRAPHY_AGES } from "./challenges/geography/engine.js";
import { ALL_GEOGRAPHY_SOURCES } from "./challenges/geography/allSources.js";
import { compassGrid } from "./challenges/geography/year1/routesAndSimpleMaps.js";
import year1Maps from "../assets/geography/year1-maps.json" with { type: "json" };

const IDS = [
  ["our-place", ["around-our-school", "human-and-physical-features", "maps-from-above"]],
  ["the-united-kingdom", ["four-countries-of-the-uk", "uk-capital-cities", "seas-around-the-uk"]],
  ["the-wider-world", ["seven-continents", "five-oceans", "hot-and-cold-places"]],
  ["weather-and-exploring", ["daily-weather", "seasons-in-the-uk", "routes-and-simple-maps"]],
];
const topics = curriculum.flatMap((c) => c.topics);
const isBuilt = (id, level) => {
  const pascal = id.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join("");
  return existsSync(new URL(`../pages/skills/geography/challenges/year1/${id}/${pascal}Challenge${level}.jsx`, import.meta.url));
};
const seeded = (seed) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

test("Year 1 Geography: permanent IDs, 48 wrapper paths, statutory mapping and exact outcomes", () => {
  assert.deepEqual(curriculum.map((c) => [c.id, c.topics.map((t) => t.id)]), IDS);
  assert.equal(loadCurriculum("1", "geography"), curriculum);
  assert.equal(topics.length, 12);
  const mapping = readFileSync(new URL("../../docs/curriculum/key-stage-1-geography.md", import.meta.url), "utf8");
  const spec = readFileSync(new URL("../../docs/geography-curriculum/year-1-design-spec.md", import.meta.url), "utf8");
  for (const t of topics) {
    assert.deepEqual(t.challenges.map((c) => c.id), [1, 2, 3, 4]);
    assert.ok(mapping.includes(`\`${t.id}\``), t.id);
    const outcome = TOPIC_SKILLS[`1/geography/${t.id}`];
    assert.ok(spec.includes(`| ${t.name} | ${outcome} |`), t.id);
    for (const q of t.challenges) assert.ok(isBuilt(t.id, q.id), `${t.id}/${q.id}`);
    assert.ok(YEAR1_GEOGRAPHY_TOPICS[t.id], `${t.id} bank`);
  }
});

test("Year 1 Geography banks pass the shared lint at Year 1 limits", () => {
  assert.deepEqual(GEOGRAPHY_AGES[1], { notesWords: 30, sentenceWords: 10, rounds: 4, minBank: 6 });
  for (const [id, topic] of Object.entries(YEAR1_GEOGRAPHY_TOPICS)) {
    assert.equal(topic.year, 1);
    assert.deepEqual(lintGeographyTopic(topic, ALL_GEOGRAPHY_SOURCES, {}), [], id);
  }
});

test("Year 1 runs have four distinct rounds, answers among options and sorts of two or three cards", () => {
  for (const [id, build] of Object.entries(YEAR1_GEOGRAPHY_BUILDERS)) for (const level of [1, 2, 3, 4]) for (const seed of [1, 7, 42]) {
    const { questions, notes } = build(level, seeded(seed));
    assert.equal(questions.length, 4, `${id}/${level}`);
    assert.equal(new Set(questions.map((q) => q.prompt)).size, 4);
    assert.ok(notes.lines.length > 0);
    for (const q of questions) {
      if (q.kind === "choice") { assert.ok(q.options.includes(q.answer)); assert.equal(q.options.length, 3); }
      if (q.kind === "sort") assert.ok(q.cards.length >= 2 && q.cards.length <= 3, `${id}/${level} sort size`);
      if (q.kind === "order") assert.ok(q.items.length >= 2 && q.items.length <= 3, `${id}/${level} order size`);
    }
  }
});

test("compass grids compute positions from the north arrow, including a rotated north", () => {
  const up = compassGrid("t", "up", [["east"], ["north"]]);
  assert.deepEqual(up.features.map((f) => f.at), [[3, 1], [2, 0]]);
  const right = compassGrid("t", "right", [["east"], ["north"], ["west"]]);
  assert.deepEqual(right.features.map((f) => f.at), [[2, 2], [3, 1], [2, 0]]);
  assert.throws(() => compassGrid("t", "up", [["east"], ["east"]]));
});

test("Year 1 maps keep the four UK countries separate from the Republic of Ireland and draw seven continents", () => {
  const ids = year1Maps.ukNations.features.map((f) => f.id);
  for (const id of ["england", "scotland", "wales", "northernIreland", "ireland"]) assert.ok(ids.includes(id));
  for (const f of year1Maps.ukNations.features) assert.ok(f.rings.length > 0, f.id);
  for (const id of ["africa", "antarctica", "asia", "europe", "northAmerica", "southAmerica", "australia"]) assert.ok(year1Maps.world.continents[id].length > 0, id);
});

test("Year 1 Geography stays outside every year award", () => {
  assert.equal(countsTowardYear(1, "geography"), false);
  assert.deepEqual(yearAwardSubjectIds(1), ["math", "english", "science", "history"]);
});

test("Year 1 Geography cascades through all topics, reloads numeric completions and permits replay", () => {
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

test("Year 1 grown-up activities appear only after all four digital slots complete", () => {
  for (const id of ["around-our-school", "daily-weather", "seasons-in-the-uk", "routes-and-simple-maps"]) {
    const category = curriculum.find((c) => c.topics.some((t) => t.id === id));
    const args = { year: 1, subject: "geography", categoryId: category.id, topicId: id, isBuilt };
    let progress = {};
    for (const n of [1, 2, 3]) {
      progress = completeChallenge(progress, category.id, id, n);
      assert.equal(completedGeographyActivity({ ...args, progress }), null);
    }
    progress = completeChallenge(progress, category.id, id, 4);
    const before = JSON.stringify(progress);
    assert.match(completedGeographyActivity({ ...args, progress }).note, /does not certify outdoor/);
    assert.equal(completedGeographyActivity({ ...args, year: 2, progress }), null);
    assert.equal(JSON.stringify(progress), before);
  }
});
