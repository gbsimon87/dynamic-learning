import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { YEAR2_GEOGRAPHY_TOPICS as topics, YEAR2_GEOGRAPHY_BUILDERS as builders } from "./index.js";
import { lintGeographyTopic, GEOGRAPHY_TITLES, GEOGRAPHY_AGES } from "../engine.js";
import { ALL_GEOGRAPHY_SOURCES } from "../allSources.js";
import { lintBuild, isCorrect, isReady, seededRng } from "../../questionKinds.js";
import { CONTINENTS, OCEANS } from "./visuals.js";
import { DIRECTIONS, ROUTES, directionPlan, routePlan } from "./compassDirectionsAndRoutes.js";
import { WEATHER_LOG } from "./weatherRecords.js";
import { GROUNDS_ROWS } from "./observingOurSchoolGrounds.js";
import { LOCAL_ROWS } from "./exploringOurLocalArea.js";
import { symbolPlan } from "./symbolsAndMapKeys.js";
import { year2GeographyQuestionSpeech } from "./speech.js";
import { buildGeographyTopic } from "../engine.js";

const manifest = JSON.parse(readFileSync(new URL("../../../../assets/geography/manifest.json", import.meta.url)));
const response = q => q.kind === "sort" ? Object.fromEntries(q.cards.map(c => [c.id, c.bin])) : q.kind === "order" ? q.answer.map(id => q.items.find(i => i.id === id)) : q.answer;
for (const [id, topic] of Object.entries(topics)) test(`${id}: sourced age-limited banks, valid answers and varied five-round runs`, () => {
  assert.equal(topic.year, 2);
  assert.deepEqual(lintGeographyTopic(topic, ALL_GEOGRAPHY_SOURCES, manifest.images), []);
  const build = builders[id];
  assert.deepEqual(lintBuild((l, r) => build(l, r).questions, { titles: GEOGRAPHY_TITLES, year: 2, seeds: 60, minQuestions: 5 }), []);
  for (let level = 1; level <= 4; level++) {
    const signatures = new Set();
    for (let seed = 1; seed <= 60; seed++) {
      const run = build(level, seededRng(seed));
      assert.equal(run.questions.length, 5);
      assert.equal(new Set(run.questions.map(q => q.prompt)).size, 5);
      signatures.add(run.questions.map(q => q.prompt).join("|"));
      for (const q of run.questions) { assert.ok(isReady(q, response(q))); assert.ok(isCorrect(q, response(q))); }
    }
    assert.ok(signatures.size > 20);
  }
});

test("Year 2 limits are enforced, with seven continents and five distinct oceans", () => {
  assert.deepEqual(GEOGRAPHY_AGES[2], { notesWords: 45, sentenceWords: 12, rounds: 5, minBank: 7 });
  assert.deepEqual(CONTINENTS.map(p => p[0]), ["Africa", "Antarctica", "Asia", "Europe", "North America", "South America", "Australia"]);
  assert.deepEqual(OCEANS.map(p => p[0]), ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Southern Ocean"]);
  const broken = structuredClone(topics["weather-records"]);
  broken.lessons[0].notes.lines = ["long ".repeat(46)];
  assert.match(lintGeographyTopic(broken, ALL_GEOGRAPHY_SOURCES, manifest.images).join("\n"), /exceed 45 words/);
});

test("four-direction and rotated-map answers agree with independently calculated vectors", () => {
  const bank = topics["compass-directions-and-routes"].lessons[1].bank;
  for (const [i, q] of bank.slice(0, 7).entries()) {
    const rotated = i >= 4;
    const v = directionPlan(rotated ? i - 4 : i, rotated);
    const [start, tree] = v.features;
    const dx = tree.x - start.x, dy = tree.y - start.y;
    const screenDirection = dy < 0 ? 0 : dx > 0 ? 1 : dy > 0 ? 2 : 3;
    assert.equal(q.answer, DIRECTIONS[(screenDirection + (rotated ? 3 : 0)) % 4]);
    assert.ok(!q.visual.alt.includes("north-east"));
  }
  for (const [i, route] of ROUTES.entries()) {
    const v = routePlan(route, i);
    assert.ok(route.length <= 3);
    assert.equal(v.paths.length, route.length);
    let x = 2, y = 2;
    for (const [step, d] of route.entries()) {
      const [dx, dy] = [[0, -1], [1, 0], [0, 1], [-1, 0]][d];
      assert.deepEqual(v.paths[step], [x, y, x + dx, y + dy]); x += dx; y += dy;
    }
    assert.deepEqual([v.features[1].x, v.features[1].y], [x, y]);
    assert.equal(topics["compass-directions-and-routes"].lessons[3].bank[i].answer, route.map(d => DIRECTIONS[d]).join(", then "));
  }
});

test("weather tally and pictogram agree with all observations, including multiple types per day", () => {
  const count = word => WEATHER_LOG.filter(r => r[1].includes(word)).length;
  for (const weather of ["sunny", "cloudy", "rainy", "windy"]) assert.equal(count(weather), 2);
  assert.deepEqual(WEATHER_LOG.filter(r => r[1].includes("rainy")).map(r => r[0]), ["Monday", "Thursday"]);
  const v = topics["weather-records"].lessons[2].notes.visual;
  for (const [name, circles, tally] of v.rows) {
    assert.equal(circles.split(" ").length, count(name.toLowerCase()));
    assert.equal(tally.split(" ").length, count(name.toLowerCase()));
  }
  assert.ok(Object.values(topics).flatMap(t => t.lessons).some(l => l.bank.some(q => q.kind === "sort")));
});

test("fieldwork counts and comparison claims are supported by the recorded rows", () => {
  for (const [, count, tally] of GROUNDS_ROWS) assert.equal(tally.split(" ").length, count);
  const trees = LOCAL_ROWS.find(r => r[0] === "Trees"), buildings = LOCAL_ROWS.find(r => r[0] === "Buildings"), paths = LOCAL_ROWS.find(r => r[0] === "Paths");
  assert.equal(trees[1] - trees[2], 2);
  assert.ok(buildings[2] > buildings[1]);
  assert.equal(paths[1], paths[2]);
  const all = JSON.stringify(topics);
  assert.match(all, /invented day records/);
  assert.match(all, /not all Brunei/);
  assert.match(all, /does not certify/);
});

test("Year 2 asset rights, source URLs, bundled checksums and equivalents are complete", () => {
  for (const id of ["whitby-harbour", "whitby-aerial", "peramu-homes", "peramu-building"]) {
    const a = manifest.images[id];
    for (const key of ["title", "place", "creator", "sourceUrl", "licenceUrl", "date", "retrieved", "alt", "attribution", "adapted"]) assert.ok(a[key]);
    assert.match(a.sourceUrl, /^https:\/\/commons.wikimedia.org/);
    const bytes = readFileSync(new URL(`../../../../assets/geography/${a.file}`, import.meta.url));
    assert.equal(createHash("sha256").update(bytes).digest("hex"), a.sha256);
    assert.ok(bytes.length < 200000);
  }
  assert.equal(manifest.images["whitby-aerial"].licence, "CC BY-SA 2.0");
  const photo = topics["whitby-by-the-sea"].lessons[0].notes.visual;
  assert.match(photo.alt, /low tide/);
  assert.ok(!photo.alt.includes("Boats sit"));
});

test("directly right/below questions have exactly one aligned answer", () => {
  const bank = topics["symbols-and-map-keys"].lessons[1].bank;
  const start = symbolPlan.features.find(f => f.label === "Building");
  for (const [prompt, predicate] of [
    ["Which feature is directly right of the building?", f => f.x > start.x && f.y === start.y],
    ["Which feature is directly below the building?", f => f.y > start.y && f.x === start.x],
  ]) {
    const q = bank.find(q => q.prompt === prompt);
    assert.ok(q);
    const matches = symbolPlan.features.filter(predicate).map(f => f.label);
    assert.deepEqual(matches, [q.answer]);
    assert.ok(!q.wrong.some(w => matches.includes(w)));
  }
});

test("map-key construction has equivalent named shapes for every required symbol", () => {
  const expected = { Building: "Roofed square", Shop: "Diamond", Trees: "Circle with trunk", Water: "Wavy lines", Path: "Dashed line" };
  for (const q of topics["making-a-simple-map"].lessons[2].bank) {
    for (const [card, bin] of q.cards) {
      const feature = q.bins[bin];
      assert.equal(card, expected[feature]);
      assert.ok(q.visual.alt.includes(`${feature}, ${expected[feature]}`));
    }
  }
});

test("unoriented photographic arrangement has no asserted north direction", () => {
  const paired = topics["aerial-views-and-landmarks"].lessons[2].notes.visual;
  const sketch = paired.maps.find(v => v.type === "ks1");
  assert.equal(sketch.orientationKnown, false);
  assert.ok(!sketch.alt.includes("North is"));
  assert.match(sketch.alt, /no assigned compass orientation/);
});

test("Year 2 narration counts tally marks while preserving choices, sorting and marker letters", () => {
  const q = { prompt: "Which tally matches three trees?", visual: { type: "table" }, options: ["| | |", "| |", "|"] };
  assert.equal(year2GeographyQuestionSpeech(q), "Which tally matches three trees? Choices: 3 tally marks; 2 tally marks; 1 tally mark.");
  assert.deepEqual(q.options, ["| | |", "| |", "|"]);
  const run = builders["compass-directions-and-routes"](2, () => .375);
  for (const question of run.questions) assert.match(year2GeographyQuestionSpeech(question), /Choices:/);
});

test("runs do not mutate frozen authoring data and every template can reach a run", () => {
  const freeze = value => {
    if (value && typeof value === "object" && !Object.isFrozen(value)) {
      Object.freeze(value); Object.values(value).forEach(freeze);
    }
    return value;
  };
  for (const [id, source] of Object.entries(topics)) {
    const topic = freeze(structuredClone(source)), build = buildGeographyTopic(topic);
    for (let level = 1; level <= 4; level++) {
      const seen = new Set();
      // Space seeds across the generator's state space, rather than testing neighbouring low states.
      for (let seed = 1; seed <= 100; seed++) for (const q of build(level, seededRng(seed * 104729)).questions) seen.add(q.prompt);
      assert.equal(seen.size, topic.lessons[level - 1].bank.length, `${id}/${level}: unreachable template`);
    }
  }
});
