import test from "node:test";
import assert from "node:assert/strict";
import { sixFigure, nearMisses, PRACTICE_POINTS, OS_POINTS, acrossTenths, upTenths } from "./sixFigureGridReferences.js";
import { mapsAtlasesAndDigitalMapping, LAKE_EXPLORER } from "./mapsAtlasesAndDigitalMapping.js";
import { localFieldworkEnquiry, WIDTHS, COVER } from "./localFieldworkEnquiry.js";

test("six-figure helper: spec example and distractors", () => {
  assert.equal(sixFigure([23.3, 41.6]), "233416");
  assert.deepEqual(nearMisses([23.3, 41.6], 0), ["416233", "236413"]);
  for (const p of [...PRACTICE_POINTS, ...OS_POINTS]) {
    assert.notEqual(acrossTenths(p), upTenths(p), `${p} tenths must differ so swaps are wrong`);
    for (let i = 0; i < 3; i++) assert.equal(new Set([sixFigure(p), ...nearMisses(p, i)]).size, 3);
  }
});

test("plan directions and distances", () => {
  assert.ok(mapsAtlasesAndDigitalMapping.lessons[1].bank.length >= 7);
  const prompts = mapsAtlasesAndDigitalMapping.lessons[1].bank;
  const answerOf = (re) => prompts.find((q) => re.test(q.prompt)).answer;
  assert.equal(answerOf(/Plan A: how far is it from the Windmill to the Bridge/), "6 km");
  assert.equal(answerOf(/Plan B: how far is it from the Wood to the Lake/), "5 km");
  assert.equal(answerOf(/Plan B: which direction is the Lake from the Church/), "South-west");
  assert.equal(answerOf(/Plan A: which direction is the Lookout from the Campsite/), "North-east");
});

test("explorer: nearest town to Windermere and extremes come from the marker coordinates", () => {
  const layer = LAKE_EXPLORER.layers[0].markers;
  const wind = LAKE_EXPLORER.views[1].markers.find((m) => m.label === "Windermere").point;
  const d = (a, b) => Math.hypot((a[0] - b[0]) * Math.cos(54.4 * Math.PI / 180), a[1] - b[1]);
  const nearest = layer.reduce((a, b) => (d(a.point, wind) < d(b.point, wind) ? a : b)).label;
  assert.equal(nearest, "Ambleside");
  assert.equal(layer.reduce((a, b) => (a.point[1] > b.point[1] ? a : b)).label, "Keswick");
  assert.equal(layer.reduce((a, b) => (a.point[0] > b.point[0] ? a : b)).label, "Kendal");
});

test("fieldwork example data and activity", () => {
  assert.ok(WIDTHS.B.every((w, i) => w > WIDTHS.A[i]));
  assert.ok(COVER.A > COVER.B);
  const a = localFieldworkEnquiry.activity;
  assert.ok(a.summary && a.question && a.steps.length >= 5 && a.materials && a.paper && a.present && a.alternative);
  assert.equal(new Set(a.steps).size, a.steps.length);
  assert.match(a.alternative, /window|tabletop/);
});
import { YEAR4_GEOGRAPHY_BUILDERS } from "./index.js";
import { seededRng } from "../../questionKinds.js";
test("six-figure C3 keyed answers equal sixFigure of the marker", () => {
  const b = YEAR4_GEOGRAPHY_BUILDERS["six-figure-grid-references"];
  let checked = 0;
  for (let s = 1; s <= 40; s++) for (const q of b(3, seededRng(s)).questions) {
    const m = q.visual.markers?.[0];
    if (/six-figure reference names|Choose its reference/.test(q.prompt)) { assert.equal(q.answer, sixFigure(m.point)); checked++; }
  }
  assert.ok(checked > 20);
});
