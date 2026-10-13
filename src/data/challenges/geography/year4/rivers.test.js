import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { SCENARIO_DATA, scenarioChanges } from "./changingUkLandscapes.js";
import { riverJourneys } from "./riverJourneys.js";

const maps = JSON.parse(readFileSync(new URL("../../../../assets/geography/maps.json", import.meta.url)));

test("example grids: same extent, same key, expected change counts", () => {
  for (const sc of Object.values(SCENARIO_DATA)) {
    assert.equal(sc.before.length, sc.after.length);
    for (let i = 0; i < sc.before.length; i++) assert.equal(sc.before[i].length, sc.after[i].length);
    const keys = sc.key.map(([k]) => k);
    for (const ch of [...sc.before, ...sc.after].join("")) assert.ok(keys.includes(ch));
  }
  assert.equal(scenarioChanges(SCENARIO_DATA.coast).length, 6);
  assert.equal(scenarioChanges(SCENARIO_DATA.river).length, 4);
  assert.equal(scenarioChanges(SCENARIO_DATA.marsh).length, 5);
});

test("the changing-landscapes bank covers both human and physical change", () => {
  const all = Object.values(SCENARIO_DATA).flatMap(scenarioChanges).map((c) => `${c.from}${c.to}`);
  assert.ok(all.includes("BS") && all.includes("SM") && all.includes("WM"), "physical changes present");
  assert.ok(all.includes("FH") && all.includes("MI"), "human changes present");
});

test("river directions come from the drawn lines: Thames east, Trent north-east, Severn south-east", () => {
  const line = (name) => maps.uk.lines.find((l) => l.name === name).coords;
  const dir = (a, b) => { const dx = (b[0] - a[0]) * Math.cos((a[1] + b[1]) / 2 * Math.PI / 180), dy = b[1] - a[1]; return Math.atan2(dy, dx) * 180 / Math.PI; };
  const ends = (n) => [line(n)[0], line(n).at(-1)];
  assert.ok(Math.abs(dir(...ends("Thames"))) < 22.5);
  assert.ok(Math.abs(dir(...ends("Trent")) - 45) < 22.5);
  assert.ok(Math.abs(dir(...ends("Severn")) + 45) < 22.5);
  assert.equal(riverJourneys.lessons.length, 4);
});

test("Washington Columbia markers sit on the drawn river line", () => {
  const lines = maps.washington.lines.filter((l) => l.name === "Columbia");
  const distSeg = (a, b, p) => { const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * (b[0] - a[0]) + (p[1] - a[1]) * (b[1] - a[1])) / ((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2))); return Math.hypot(a[0] + t * (b[0] - a[0]) - p[0], a[1] + t * (b[1] - a[1]) - p[1]); };
  const near = (p) => lines.some((l) => l.coords.some((q, i) => i && distSeg(l.coords[i - 1], q, p) < 0.03));
  for (const p of [[-117.64, 49.0], [-119.05, 46.22], [-123.21, 46.17]]) assert.ok(near(p), `${p} off the line`);
});
