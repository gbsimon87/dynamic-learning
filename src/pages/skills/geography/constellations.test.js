import test from "node:test";
import assert from "node:assert/strict";
import { constellations } from "./constellations.js";
import { projectConstellation } from "./constellationProjection.js";

test("every constellation carries the fields the card renders", () => {
  assert.ok(constellations.length > 0);
  for (const item of constellations) {
    assert.equal(typeof item.id, "string", "id must be a string");
    assert.ok(item.id.length > 0, "id must not be empty");
    assert.ok(item.name?.length > 0, `${item.id} needs a name`);
    assert.ok(item.alsoKnownAs?.length > 0, `${item.id} needs alsoKnownAs`);
    assert.ok(item.description?.length > 0, `${item.id} needs a description`);
    assert.ok(item.narration?.length > 0, `${item.id} needs narration`);
    assert.ok(Array.isArray(item.facts) && item.facts.length >= 3, `${item.id} needs 3+ facts`);
  }
});

test("constellation ids are unique", () => {
  const ids = constellations.map((item) => item.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("the explorer includes five recognisable northern-sky constellations", () => {
  assert.deepEqual(
    constellations.map((item) => item.id),
    ["ursa-major", "ursa-minor", "cassiopeia", "cygnus", "orion"],
  );
});

test("every line joins two stars that exist in the same constellation", () => {
  for (const item of constellations) {
    const known = new Set(item.stars.map((star) => star.id));
    assert.equal(known.size, item.stars.length, `${item.id} has duplicate star ids`);
    for (const [from, to] of item.lines) {
      assert.ok(known.has(from), `${item.id}: line references unknown star "${from}"`);
      assert.ok(known.has(to), `${item.id}: line references unknown star "${to}"`);
      assert.notEqual(from, to, `${item.id}: line joins "${from}" to itself`);
    }
  }
});

test("every star carries drawable coordinates", () => {
  for (const item of constellations) {
    for (const star of item.stars) {
      assert.ok(star.name?.length > 0, `${item.id}/${star.id} needs a name`);
      assert.ok(Number.isFinite(star.raHours), `${item.id}/${star.id} raHours must be finite`);
      assert.ok(star.raHours >= 0 && star.raHours < 24, `${item.id}/${star.id} raHours out of range`);
      assert.ok(Number.isFinite(star.decDeg), `${item.id}/${star.id} decDeg must be finite`);
      assert.ok(star.decDeg >= -90 && star.decDeg <= 90, `${item.id}/${star.id} decDeg out of range`);
      assert.ok(Number.isFinite(star.magnitude), `${item.id}/${star.id} needs a finite magnitude`);
      assert.ok(star.label === undefined || typeof star.label === "boolean", `${item.id}/${star.id} label must be boolean`);
      assert.ok(
        star.labelPosition === undefined || star.labelPosition === "below",
        `${item.id}/${star.id} has an unsupported label position`,
      );
    }
  }
});

test("every constellation projects to a drawable chart", () => {
  for (const item of constellations) {
    const { points, width, height } = projectConstellation(item.stars);
    assert.equal(points.length, item.stars.length, `${item.id} lost stars in projection`);
    assert.ok(width > 0 && height > 0, `${item.id} projected to an empty box`);
    for (const point of points) {
      assert.ok(Number.isFinite(point.x) && Number.isFinite(point.y), `${item.id}/${point.id} is not finite`);
    }
  }
});

test("Ursa Major includes the seven-star Plough and the rest of the Great Bear figure", () => {
  const ursa = constellations.find((item) => item.id === "ursa-major");
  assert.ok(ursa, "ursa-major must be present");
  const starIds = new Set(ursa.stars.map((star) => star.id));
  for (const id of ["alioth", "alkaid", "dubhe", "megrez", "merak", "mizar", "phecda"]) {
    assert.ok(starIds.has(id), `the Plough is missing ${id}`);
  }
  assert.ok(ursa.stars.length > 7, "the Great Bear needs stars beyond the Plough");
  assert.ok(ursa.lines.length > 7, "the Great Bear needs lines beyond the Plough");
});

test("projection keeps stars together across the 0h/24h right-ascension seam", () => {
  const seamStars = [
    { id: "west", raHours: 23.9, decDeg: 30, magnitude: 2 },
    { id: "east", raHours: 0.1, decDeg: 30, magnitude: 2 },
  ];
  const chart = projectConstellation(seamStars);
  assert.ok(chart.width > chart.height, "nearby seam stars should form a short horizontal pair");
  assert.ok(chart.width <= 100, "seam pair should remain inside the chart box");
});
