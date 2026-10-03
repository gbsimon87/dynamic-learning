/**
 * Renders the Year 3 skeleton illustrations from BodyParts3D, once.
 *
 *   node scripts/science-assets/render-bones.mjs
 *
 * Fetches atlas.json and only the binary chunks that hold the selected bones
 * from the pinned human-atlas commit (sources.json), caches them under
 * node_modules/.cache/science-assets, renders flat cartoon-shaded bones with an
 * outline in the system Google Chrome (playwright-core, no browser download),
 * and writes to src/assets/science/bodyparts3d/:
 *
 *   skeleton-<pose>.webp   one image per arm pose, transparent background
 *   skeleton.json          image sizes and the label anchors per pose (0–1)
 *   ATTRIBUTION.md         the CC BY 4.0 credit and what was adapted
 *
 * The outputs are committed; nothing here runs during `npm run build`.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { ANCHOR_PARTS, GROUPS, POSES, selectSkeleton, sideOf } from "./bones.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SOURCE = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/science-assets/sources.json"), "utf8")).bodyparts3d;
const CACHE = path.join(ROOT, "node_modules/.cache/science-assets/bodyparts3d", SOURCE.commit);
const OUT = path.join(ROOT, SOURCE.outputs);
const CHROME = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const raw = (file) => `https://raw.githubusercontent.com/${SOURCE.repo}/${SOURCE.commit}/${file}`;

async function cached(file) {
  const target = path.join(CACHE, file);
  if (fs.existsSync(target)) return fs.readFileSync(target);
  const response = await fetch(raw(file));
  if (!response.ok) throw new Error(`${response.status} fetching ${file}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, buffer);
  return buffer;
}

const atlas = JSON.parse(await cached("public/models/atlas.json"));
const parts = selectSkeleton(atlas);
const chunkIds = [...new Set(parts.map((part) => part.chunk))].sort((a, b) => a - b);
console.log(`${parts.length} bones from ${chunkIds.length} of ${atlas.chunks.length} chunks`);

// One payload: per part, its positions (Float32), normals (Int16) and indices
// (Uint32) copied out of its chunk, the same layout human-atlas packs.
const chunks = {};
for (const id of chunkIds) chunks[id] = await cached(atlas.chunks[id].url.replace(/^\//, "public/"));
const segments = [];
let offset = 0;
const take = (buffer, start, bytes) => {
  const padding = (4 - (offset % 4)) % 4;
  if (padding) { segments.push(Buffer.alloc(padding)); offset += padding; }
  const at = offset;
  segments.push(buffer.subarray(start, start + bytes));
  offset += bytes;
  return at;
};
const index = parts.map((part) => {
  const chunk = chunks[part.chunk];
  return {
    name: part.name,
    group: part.group,
    side: sideOf(part.name),
    vertexCount: part.vertexCount,
    indexCount: part.indexCount,
    positions: take(chunk, part.positions, part.vertexCount * 12),
    normals: take(chunk, part.normals, part.vertexCount * 6),
    indices: take(chunk, part.indices, part.indexCount * 4),
  };
});
const payload = Buffer.concat(segments);

const THREE_DIR = path.join(ROOT, "node_modules/three/build");
const PAGE = fs.readFileSync(path.join(ROOT, "scripts/science-assets/render-bones.html"));

const browser = await chromium.launch({ executablePath: CHROME, args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage();
page.on("console", (message) => console.log(`[page] ${message.text()}`));
await page.route("http://render.local/**", async (route) => {
  const url = new URL(route.request().url());
  if (url.pathname === "/") return route.fulfill({ body: PAGE, contentType: "text/html" });
  if (url.pathname === "/payload.bin") return route.fulfill({ body: payload, contentType: "application/octet-stream" });
  if (url.pathname === "/payload.json") {
    return route.fulfill({ body: JSON.stringify({ parts: index, anchors: ANCHOR_PARTS, poses: POSES }), contentType: "application/json" });
  }
  const file = path.join(THREE_DIR, path.basename(url.pathname));
  if (fs.existsSync(file)) return route.fulfill({ body: fs.readFileSync(file), contentType: "text/javascript" });
  return route.fulfill({ status: 404 });
});
await page.goto("http://render.local/");
await page.waitForFunction(() => window.ready === true || window.failed, null, { timeout: 120000 });
const failure = await page.evaluate(() => window.failed);
if (failure) throw new Error(failure);

fs.mkdirSync(OUT, { recursive: true });
const manifest = { source: SOURCE.repo, commit: SOURCE.commit, credit: SOURCE.credit, groups: GROUPS, poses: {} };
for (const pose of Object.keys(POSES)) {
  const result = await page.evaluate((name) => window.renderPose(name), pose);
  const file = `skeleton-${pose}.webp`;
  fs.writeFileSync(path.join(OUT, file), Buffer.from(result.dataUrl.split(",")[1], "base64"));
  manifest.poses[pose] = { file, width: result.width, height: result.height, anchors: result.anchors };
  console.log(`${file}: ${result.width}×${result.height}, ${(fs.statSync(path.join(OUT, file)).size / 1024).toFixed(0)} KB`);
}
await browser.close();

fs.writeFileSync(path.join(OUT, "skeleton.json"), `${JSON.stringify(manifest, null, 2)}\n`);
fs.writeFileSync(
  path.join(OUT, "ATTRIBUTION.md"),
  `# BodyParts3D bones\n\n${SOURCE.attribution}\n\n` +
    `Source: https://github.com/${SOURCE.repo} at commit \`${SOURCE.commit}\` ` +
    "(its public/ATTRIBUTION.md: BodyParts3D 4.0, isa_BP3D_4.0_obj_99, " +
    "Mitsuhashi et al. 2009, https://doi.org/10.1093/nar/gkn613).\n\n" +
    `Adaptations here: ${parts.length} bone meshes selected (muscles, gums, voice-box ` +
    "cartilage and spinal disks left out); arms rotated at the shoulder into three " +
    "poses; rendered as flat illustrations by scripts/science-assets/render-bones.mjs.\n",
);
console.log(`wrote ${path.relative(ROOT, OUT)}`);
