import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { LICENCES } from "./licences.js";

const read = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));
const manifest = read("../assets/history/manifest.json");
const sources = read("../../scripts/history-assets/sources.json");
const ALLOWED = ["CC0-1.0", "PDM-1.0"];

test("History images: every manifest entry is open-licence, credited and described", () => {
  const ids = Object.keys(manifest.images);
  assert.ok(ids.length >= 2);
  assert.deepEqual(ids.sort(), Object.keys(sources).sort(), "manifest and sources.json list the same images");
  for (const [id, image] of Object.entries(manifest.images)) {
    assert.ok(ALLOWED.includes(image.licence), `${id}: licence ${image.licence}`);
    assert.ok(LICENCES[image.licence], `${id}: no LICENCES entry`);
    for (const field of ["title", "institution", "objectUrl", "alt", "credit"]) assert.ok(image[field]?.trim(), `${id}: no ${field}`);
    assert.match(sources[id].sha256, /^[0-9a-f]{64}$/, `${id}: sha256`);
  }
});

test("History images: files exist, are WebP and within budget", () => {
  for (const [id, image] of Object.entries(manifest.images)) {
    const file = new URL(`../assets/history/images/${image.file}`, import.meta.url);
    assert.ok(existsSync(file), `${id}: missing ${image.file}`);
    assert.ok(statSync(file).size <= 120 * 1024, `${id}: over 120 KB`);
    const head = readFileSync(file).subarray(0, 12).toString("latin1");
    assert.ok(head.startsWith("RIFF") && head.endsWith("WEBP"), `${id}: not WebP`);
  }
});
