import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { year5GeographyCurriculum as curriculum } from "./year5GeographyCurriculum.js";
import { YEAR5_GEOGRAPHY_TOPIC_SKILLS } from "./year5GeographyCertificateSkills.js";
import { countsTowardYear, loadCurriculum } from "./curriculumRegistry.js";
import { YEAR5_GEOGRAPHY_TOPICS, YEAR5_GEOGRAPHY_BUILDERS, YEAR5_GEOGRAPHY_SOURCES } from "./challenges/geography/year5/index.js";
import { GEOGRAPHY_TITLES, lintGeographyTopic } from "./challenges/geography/engine.js";
import { project } from "./challenges/geography/geometry.js";
import { lintBuild, isCorrect, isReady, seededRng } from "./challenges/questionKinds.js";

const manifest = JSON.parse(readFileSync(new URL("../assets/geography/manifest.json", import.meta.url)));
const maps = JSON.parse(readFileSync(new URL("../assets/geography/maps.json", import.meta.url)));
const topics = curriculum.flatMap((c) => c.topics);
const pascal = (id) => id.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join("");
const response = (q) => q.kind === "sort" ? Object.fromEntries(q.cards.map((c) => [c.id, c.bin])) : q.kind === "order" ? q.answer.map((id) => q.items.find((i) => i.id === id)) : q.answer;

test("Year 5 Geography locks 16 topic IDs, 64 wrapper files, a bank, a certificate line and a doc row per topic", () => {
  assert.equal(loadCurriculum("5", "geography"), curriculum);
  assert.equal(countsTowardYear(5, "geography"), false);
  assert.equal(topics.length, 16);
  assert.deepEqual(Object.keys(YEAR5_GEOGRAPHY_TOPICS).sort(), topics.map((t) => t.id).sort());
  const doc = readFileSync(new URL("../../docs/curriculum/key-stage-2-geography.md", import.meta.url), "utf8");
  const year5Section = doc.slice(doc.indexOf("## Year 5 topics mapped to statutory requirements"));
  assert.ok(year5Section.length > 100, "Year 5 table missing from the KS2 doc");
  for (const t of topics) {
    assert.deepEqual(t.challenges.map((c) => c.id), [1, 2, 3, 4]);
    const line = YEAR5_GEOGRAPHY_TOPIC_SKILLS[`5/geography/${t.id}`];
    assert.ok(line && line.startsWith("I can") && line.length <= 80, `certificate line for ${t.id}`);
    for (const level of [1, 2, 3, 4]) {
      assert.ok(existsSync(new URL(`../pages/skills/geography/challenges/year5/${t.id}/${pascal(t.id)}Challenge${level}.jsx`, import.meta.url)), `${t.id}/${level}`);
    }
    assert.ok(year5Section.includes(`\`${t.id}\``), `${t.id} missing from the Year 5 table in the KS2 doc`);
  }
  assert.deepEqual(Object.keys(YEAR5_GEOGRAPHY_TOPIC_SKILLS).sort(), topics.map((t) => `5/geography/${t.id}`).sort());
});

for (const [id, topic] of Object.entries(YEAR5_GEOGRAPHY_TOPICS)) test(`${id}: sourced, supported banks and valid five-round runs over 20 seeds`, () => {
  assert.equal(topic.year, 5);
  assert.deepEqual(lintGeographyTopic(topic, YEAR5_GEOGRAPHY_SOURCES, manifest.images), []);
  const build = YEAR5_GEOGRAPHY_BUILDERS[id];
  assert.deepEqual(lintBuild((l, r) => build(l, r).questions, { titles: GEOGRAPHY_TITLES, year: 5, seeds: 20, minQuestions: 5 }), []);
  for (let level = 1; level <= 4; level++) for (let seed = 1; seed <= 20; seed++) {
    const run = build(level, seededRng(seed));
    assert.equal(run.questions.length, 5);
    assert.equal(new Set(run.questions.map((q) => q.prompt)).size, 5);
    for (const q of run.questions) { assert.ok(isReady(q, response(q))); assert.ok(isCorrect(q, response(q))); }
  }
});

test("Year 5 map markers stay inside their map view", () => {
  for (const t of Object.values(YEAR5_GEOGRAPHY_TOPICS)) for (const lesson of t.lessons) for (const q of [...lesson.bank, { visual: lesson.notes.visual }]) {
    const v = q.visual;
    if (v.type !== "map") continue;
    for (const m of v.markers) {
      const [x, y] = project(m.point, maps[v.view].extent);
      assert.ok(x >= 0 && x <= 480 && y >= 0 && y <= 320, `${m.label} outside ${v.view}`);
    }
  }
});
