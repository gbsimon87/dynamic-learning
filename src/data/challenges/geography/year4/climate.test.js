import test from "node:test";
import assert from "node:assert/strict";
import { place } from "./records.js";
import { zoneOf, worldMap, EXTRA } from "./climateZones.js";
import { dn } from "./dayNightAndTimeZones.js";
import { GROUP2 } from "./group2.js";

test("simplified climate-zone scheme gives the stated zones for the labelled examples", () => {
  assert.equal(zoneOf("manaus"), "tropical");
  assert.equal(zoneOf("aswan"), "dry");
  for (const id of ["seattle", "ambleside", "naples", "buenosaires"]) assert.equal(zoneOf(id), "temperate", id);
  assert.equal(zoneOf("utqiagvik"), "polar");
  assert.equal(zoneOf("quito"), "outside the scheme"); // mountain climate is an altitude influence
});

test("climate comparisons used in the banks", () => {
  const m = (id, i) => place(id).months[i];
  assert.ok(m("spokane", 0).t < m("seattle", 0).t && place("spokane").elevationM > place("seattle").elevationM);
  assert.ok(m("quito", 0).t < m("manaus", 0).t && Math.abs(place("quito").lat) < 4);
  assert.ok(m("yellowknife", 0).t < m("utqiagvik", 0).t && m("yellowknife", 6).t > m("utqiagvik", 6).t);
  assert.ok(m("manaus", 0).r > 100 && m("aswan", 6).r === 0);
});

test("time-zone examples: whole-hour offsets, no midnight crossing", () => {
  const offsets = { London: 0, Cairo: 2, Dubai: 4, Tokyo: 9, "New York": -5 };
  assert.equal(10 + offsets.Cairo - offsets.London, 12);
  assert.equal(14 + offsets.London - offsets["New York"], 19);
  assert.equal(15 + offsets.Cairo - offsets.Tokyo, 8);
  assert.ok(EXTRA.Tokyo[0] > EXTRA.Dubai[0] && EXTRA["New York"][0] < 0);
  const m = worldMap(["London", "Cairo", "Tokyo"]);
  assert.equal(m.markers.length, 3);
});

test("day/night drawing: lit side spans 110 degrees west to 70 degrees east of Greenwich", () => {
  const v = dn([-40, 130]);
  assert.match(v.alt, /40 degrees west of Greenwich/);
  assert.throws(() => dn([60]), /too close/);
});

test("group 2 registers its three topics", () => {
  assert.deepEqual(Object.keys(GROUP2), ["climate-zones", "biomes-and-vegetation-belts", "day-night-and-time-zones"]);
  for (const t of Object.values(GROUP2)) for (const l of t.lessons) assert.ok(l.bank.length >= 7);
});

test("time-zone conversions are recomputed and stay within daylight hours 08:00-17:00", () => {
  const offsets = { London: 0, Cairo: 2, Dubai: 4, Tokyo: 9, "New York": -5 };
  const bank = GROUP2["day-night-and-time-zones"].lessons[2].bank.filter((q) => /^It is \d\d:00 in/.test(q.prompt));
  assert.ok(bank.length >= 7);
  for (const q of bank) {
    const [, h, from, to] = q.prompt.match(/^It is (\d\d):00 in (.+)\. What time is it in (.+)\?$/);
    const want = Number(h) + offsets[to] - offsets[from];
    assert.equal(q.answer, `${String(want).padStart(2, "0")}:00`);
    assert.ok(want >= 8 && want <= 17 && Number(h) >= 8 && Number(h) <= 17, q.prompt);
  }
});

test("a marker at 0 degrees is described as on the Greenwich Meridian, not west", () => {
  const m = worldMap(["London", "New York"]);
  assert.match(m.alt, /London: 52 degrees north, on the Greenwich Meridian/);
  assert.match(m.alt, /New York: 41 degrees north, 74 degrees west/);
});

test("Aswan desert questions do not pair cacti with Aswan", async () => {
  const { biomesAndVegetationBelts: b } = await import("./biomesAndVegetationBelts.js");
  const text = JSON.stringify(b.lessons.slice(1).map((l) => l.bank));
  assert.ok(!/cact/i.test(text));
});
