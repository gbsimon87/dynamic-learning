import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spreadLabels } from "./scienceDiagrams.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const ASSETS = path.join(ROOT, "src/assets/science");
const manifest = JSON.parse(fs.readFileSync(path.join(ASSETS, "manifest.json"), "utf8"));
const sources = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/science-assets/sources.json"), "utf8"));

test("every file in the manifest exists, and every asset on disk is in the manifest", () => {
  const listed = new Set(manifest.files.map((file) => file.path));
  for (const file of listed) assert.ok(fs.existsSync(path.join(ASSETS, file)), file);
  for (const dir of fs.readdirSync(ASSETS, { withFileTypes: true }).filter((d) => d.isDirectory())) {
    for (const name of fs.readdirSync(path.join(ASSETS, dir.name))) {
      assert.ok(listed.has(`${dir.name}/${name}`), `${dir.name}/${name} is not in manifest.json`);
    }
  }
});

test("every source is pinned to a full commit and carries its licence or attribution", () => {
  for (const [id, source] of Object.entries(sources)) {
    if (id.startsWith("$")) continue;
    assert.match(source.commit, /^[0-9a-f]{40}$/, id);
    assert.ok(source.credit && source.license, id);
    const dir = path.join(ROOT, source.outputs);
    const notice = ["LICENSE", "ATTRIBUTION.md", "NOTICE"].some((name) => fs.existsSync(path.join(dir, name)));
    assert.ok(notice, `${id} has no LICENSE, NOTICE or ATTRIBUTION.md beside its files`);
  }
});

test("size budget: no file over 120 KB, all science artwork under 1.5 MB", () => {
  let total = 0;
  for (const file of manifest.files) {
    const size = fs.statSync(path.join(ASSETS, file.path)).size;
    assert.ok(size <= 120 * 1024, `${file.path} is ${(size / 1024).toFixed(0)} KB`);
    total += size;
  }
  assert.ok(total <= 1.5 * 1024 * 1024, `${(total / 1024).toFixed(0)} KB in total`);
});

test("skeleton anchors sit inside the picture, on the label side, top to bottom", () => {
  const skeleton = JSON.parse(fs.readFileSync(path.join(ASSETS, "bodyparts3d/skeleton.json"), "utf8"));
  for (const [pose, view] of Object.entries(skeleton.poses)) {
    assert.ok(fs.existsSync(path.join(ASSETS, "bodyparts3d", view.file)), pose);
    for (const group of skeleton.groups) {
      const at = view.anchors[group];
      assert.ok(at && at.x > 0 && at.x < 1 && at.y > 0 && at.y < 1, `${pose} ${group}`);
      // Labels are on the right, so an anchor left of centre would send its
      // line across the whole body.
      assert.ok(at.x >= 0.45, `${pose} ${group} anchor is on the far side`);
    }
    const order = ["skull", "ribs", "spine", "legs"].map((group) => view.anchors[group].y);
    assert.deepEqual(order, [...order].sort((a, b) => a - b), `${pose} anchors are not top to bottom`);
  }
});

test("labels keep their anchor height unless that would crowd the one above", () => {
  assert.deepEqual(spreadLabels([{ id: "a", y: 10 }, { id: "b", y: 100 }]), { a: 10, b: 100 });
  assert.deepEqual(spreadLabels([{ id: "b", y: 110 }, { id: "a", y: 100 }]), { a: 100, b: 130 });
  assert.deepEqual(spreadLabels([{ id: "a", y: 0 }, { id: "b", y: 5 }, { id: "c", y: 6 }], 20), { a: 0, b: 20, c: 40 });
});
