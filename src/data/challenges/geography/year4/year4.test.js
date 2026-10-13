import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { booleanPointInPolygon, point } from "@turf/turf";
import { YEAR4_GEOGRAPHY_TOPICS, YEAR4_GEOGRAPHY_BUILDERS, YEAR4_GEOGRAPHY_SOURCES } from "./index.js";
import { year4GeographyCurriculum } from "../../../year4GeographyCurriculum.js";
import { GEOGRAPHY_TITLES, lintGeographyTopic } from "../engine.js";
import { gridReference, isGridInterior, project } from "../geometry.js";
import { lintBuild, isCorrect, isReady, seededRng } from "../../questionKinds.js";
import { geographyQuestionSpeech } from "../speech.js";

const manifest = JSON.parse(readFileSync(new URL("../../../../assets/geography/manifest.json", import.meta.url)));
const maps = JSON.parse(readFileSync(new URL("../../../../assets/geography/maps.json", import.meta.url)));
const response = (q) => q.kind === "sort" ? Object.fromEntries(q.cards.map((c) => [c.id, c.bin])) : q.kind === "order" ? q.answer.map((id) => q.items.find((i) => i.id === id)) : q.answer;
const allTopicIds = year4GeographyCurriculum.flatMap((c) => c.topics.map((t) => t.id));

test("Year 4 banks only use locked topic IDs", () => {
  for (const id of Object.keys(YEAR4_GEOGRAPHY_TOPICS)) assert.ok(allTopicIds.includes(id), `unknown topic id ${id}`);
});

for (const [id, topic] of Object.entries(YEAR4_GEOGRAPHY_TOPICS)) test(`${id}: sourced, supported, age-appropriate banks and varied five-round runs`, () => {
  assert.equal(topic.year, 4);
  assert.deepEqual(lintGeographyTopic(topic, YEAR4_GEOGRAPHY_SOURCES, manifest.images), []);
  const build = YEAR4_GEOGRAPHY_BUILDERS[id];
  assert.deepEqual(lintBuild((l, r) => build(l, r).questions, { titles: GEOGRAPHY_TITLES, year: 4, seeds: 60, minQuestions: 5 }), []);
  for (let level = 1; level <= 4; level++) {
    const signatures = new Set();
    for (let seed = 1; seed <= 60; seed++) {
      const run = build(level, seededRng(seed));
      assert.equal(run.questions.length, 5);
      assert.equal(new Set(run.questions.map((q) => q.prompt)).size, 5);
      signatures.add(run.questions.map((q) => q.prompt).join("|"));
      for (const q of run.questions) { assert.ok(isReady(q, response(q))); assert.ok(isCorrect(q, response(q))); }
    }
    assert.ok(signatures.size > 20, `slot ${level}: poor replay variation`);
  }
});

const COUNTRY_OF = { Canada: "Canada", USA: "United States of America", Mexico: "Mexico", Cuba: "Cuba", Brazil: "Brazil", Peru: "Peru", Chile: "Chile", Argentina: "Argentina",
  Ottawa: "Canada", "Washington DC": "United States of America", "Mexico City": "Mexico", Havana: "Cuba", Brasilia: "Brazil", Lima: "Peru", Santiago: "Chile", "Buenos Aires": "Argentina" };
const WASHINGTON_PLACES = ["Seattle", "Olympia", "Spokane", "Yakima", "Tacoma"];
const allVisuals = (v) => [v, ...(v.maps ?? []), ...(v.views ?? []).map((w) => ({ type: "map", view: w.view, markers: [...w.markers, ...(v.layers ?? []).flatMap((l) => l.markers)] }))];

test("Year 4 map markers stay in view, sit in their named country or state, and use real rivers", () => {
  for (const t of Object.values(YEAR4_GEOGRAPHY_TOPICS)) for (const lesson of t.lessons) for (const q of [...lesson.bank, { visual: lesson.notes.visual }]) {
    for (const v of allVisuals(q.visual).filter((v) => v.type === "map")) {
      const view = maps[v.view];
      for (const m of v.markers) {
        const [x, y] = project(m.point, view.extent);
        assert.ok(x >= 0 && x <= 480 && y >= 0 && y <= 320, `${m.label} outside ${v.view}`);
        const country = COUNTRY_OF[m.label];
        if (country && ["northAmerica", "southAmerica"].includes(v.view)) {
          const f = view.features.find((f) => f.name === country);
          assert.ok(f && booleanPointInPolygon(point(m.point), f.geometry), `${m.label} is not inside ${country}`);
        }
        if (v.view === "washington" && WASHINGTON_PLACES.includes(m.label)) {
          const f = view.features.find((f) => f.name === "Washington State");
          assert.ok(booleanPointInPolygon(point(m.point), f.geometry), `${m.label} must be inside Washington State`);
        }
      }
      for (const r of v.rivers ?? []) assert.ok((view.lines ?? []).some((l) => l.name === r), `${r} missing from ${v.view}`);
    }
  }
});

test("six-figure references: three easting digits then three northing digits, tenths only, no boundary points", () => {
  const six = ([e, n]) => `${Math.floor(e * 10)}${Math.floor(n * 10)}`.padStart(6, "0");
  assert.equal(six([23.3, 41.6]), "233416");
  for (const t of Object.values(YEAR4_GEOGRAPHY_TOPICS)) for (const lesson of t.lessons) for (const q of lesson.bank) {
    for (const v of allVisuals(q.visual).filter((v) => v.tenths)) for (const m of v.markers ?? []) {
      assert.ok(isGridInterior(m.point), `${m.label} sits on a square boundary`);
      assert.ok(m.point.every((n) => Math.abs(n * 10 - Math.round(n * 10)) < 1e-9), `${m.label} must sit on a tenth line`);
      assert.ok(m.point.every((n) => (n * 10) % 10 !== 0), `${m.label} sits on a square line`);
    }
  }
  assert.equal(gridReference([23.4, 41.6]), "2341");
});

test("narration reads six-figure references digit by digit", () => {
  assert.match(geographyQuestionSpeech({ prompt: "Choose.", visual: { type: "grid" }, options: ["233416"] }), /2, 3, 3, 4, 1, 6/);
});

test("tenths grids describe each marker's tenths for screen readers", async () => {
  const { geographyVisualDescription } = await import("../speech.js");
  const v = { type: "grid", alt: "North is up.", tenths: true, markers: [{ id: "T", point: [23.3, 41.6] }] };
  assert.match(geographyVisualDescription(v), /T is 3 tenths across and 6 tenths up/);
  assert.equal(geographyVisualDescription({ ...v, tenths: undefined }), "North is up.");
});
