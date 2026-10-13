import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { booleanPointInPolygon, point } from "@turf/turf";
import { GROUP1 } from "./group1.js";
import { SOURCES_G1 } from "./sources1.js";
import { GEOGRAPHY_SOURCES } from "../sources.js";
import { buildGeographyTopic, lintGeographyTopic } from "../engine.js";
import { seededRng, isCorrect } from "../../questionKinds.js";
import { place } from "./records.js";
import { project } from "../geometry.js";

const manifest = JSON.parse(readFileSync(new URL("../../../../assets/geography/manifest.json", import.meta.url)));
const maps = JSON.parse(readFileSync(new URL("../../../../assets/geography/maps.json", import.meta.url)));
const SOURCES = { ...GEOGRAPHY_SOURCES, ...SOURCES_G1 };

test("group 1 topics lint cleanly and every key is registered", () => {
  assert.deepEqual(Object.keys(GROUP1), ["north-american-countries-and-cities", "south-american-countries-and-cities", "washington-state"]);
  for (const t of Object.values(GROUP1)) {
    assert.deepEqual(lintGeographyTopic(t, SOURCES, manifest.images), []);
    for (const [level] of [1, 2, 3, 4].entries()) {
      const build = buildGeographyTopic(t);
      const seen = new Set();
      for (let s = 1; s <= 60; s++) {
        const run = build(level + 1, seededRng(s));
        seen.add(run.questions.map((q) => q.prompt).join("|"));
        for (const q of run.questions) if (q.kind === "choice") assert.ok(isCorrect(q, q.answer));
      }
      assert.ok(seen.size > 20);
    }
  }
  for (const s of Object.keys(SOURCES_G1)) assert.ok(s.startsWith("g1_"));
});

test("Washington map markers sit in the state and seattle/spokane contrasts are as stated", () => {
  const state = maps.washington.features.find((f) => f.name === "Washington State");
  for (const [lon, lat] of [[-122.33, 47.61], [-122.9, 47.04], [-117.43, 47.66], [-120.5, 46.6]]) assert.ok(booleanPointInPolygon(point([lon, lat]), state.geometry));
  const [s, k] = [place("seattle"), place("spokane")];
  assert.ok(s.months[0].t > k.months[0].t && s.months[0].r > k.months[0].r);
  assert.ok(k.months[6].t > s.months[6].t && k.months[6].r < s.months[6].r);
});

const COUNTRY = { Canada: "Canada", USA: "United States of America", Mexico: "Mexico", Cuba: "Cuba", Brazil: "Brazil", Peru: "Peru", Chile: "Chile", Argentina: "Argentina", Ottawa: "Canada", "Washington DC": "United States of America", "Mexico City": "Mexico", Havana: "Cuba", Brasilia: "Brazil", Lima: "Peru", Santiago: "Chile", "Buenos Aires": "Argentina" };
test("group 1 markers are in view, inside their countries, and rivers exist", () => {
  for (const t of Object.values(GROUP1)) for (const l of t.lessons) for (const q of [...l.bank, { visual: l.notes.visual }]) {
    const v = q.visual;
    if (v.type !== "map") continue;
    for (const m of v.markers) {
      const [x, y] = project(m.point, maps[v.view].extent);
      assert.ok(x >= 0 && x <= 480 && y >= 0 && y <= 320, m.label);
      if (COUNTRY[m.label]) assert.ok(booleanPointInPolygon(point(m.point), maps[v.view].features.find((f) => f.name === COUNTRY[m.label]).geometry), m.label);
    }
    for (const r of v.rivers ?? []) assert.ok(maps[v.view].lines.some((x) => x.name === r));
  }
});

test("table questions only use months shown, and Washington/Americas claims recompute", () => {
  const abbr = { January: "Jan:", March: "Mar:", April: "Apr:", July: "Jul:", October: "Oct:" };
  for (const t of Object.values(GROUP1)) for (const l of t.lessons) for (const q of l.bank) {
    if (q.visual.type !== "table") continue;
    for (const [name, a] of Object.entries(abbr)) if (q.prompt.includes(name)) assert.ok(q.visual.alt.includes(a), `${name} not shown for: ${q.prompt}`);
  }
  const wa = GROUP1["washington-state"].lessons[1].bank.find((q) => q.prompt.startsWith("Of Seattle, Olympia and Yakima, which lies furthest north"));
  const lat = { Seattle: 47.61, Olympia: 47.04, Yakima: 46.6 };
  assert.equal(Object.entries(lat).sort((a, b) => b[1] - a[1])[0][0], wa.answer);
  const sa = GROUP1["south-american-countries-and-cities"].lessons[2].bank.find((q) => q.prompt === "In March, which place has the most rain?");
  const best = ["manaus", "quito", "buenosaires"].sort((a, b) => place(b).months[2].r - place(a).months[2].r)[0];
  assert.equal(place(best).name, sa.answer);
  const wb = GROUP1["washington-state"].lessons[2].bank.find((q) => q.prompt.startsWith("Which shown month is wettest"));
  assert.equal(wb.answer, "January");
});
