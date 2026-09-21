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

test("Ursa Major ships with the seven Plough stars and a closed bowl", () => {
  const ursa = constellations.find((item) => item.id === "ursa-major");
  assert.ok(ursa, "ursa-major must be present");
  assert.deepEqual(
    ursa.stars.map((star) => star.id).sort(),
    ["alioth", "alkaid", "dubhe", "megrez", "merak", "mizar", "phecda"],
  );
  assert.equal(ursa.lines.length, 7, "four bowl segments plus three handle segments");
});
