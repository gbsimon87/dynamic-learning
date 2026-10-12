/**
 * Builds the History pictures from scripts/history-assets/sources.json.
 *
 *   node scripts/history-assets/fetch.mjs
 *
 * Downloads each pinned file, checks its sha256, scales it to at most 800 px on
 * the long edge, encodes WebP (≤ 120 KB) in headless Chrome, writes
 * src/assets/history/images/<id>.webp and rebuilds src/assets/history/manifest.json.
 * Only CC0-1.0 and PDM-1.0 are accepted (docs/history-curriculum/shared-design-spec.md §6).
 * Needs Chrome: set CHROME_PATH if it is not in /Applications.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launchIsolatedPage } from "../science-assets/isolatedPage.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SOURCES = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/history-assets/sources.json"), "utf8"));
const OUT = path.join(ROOT, "src/assets/history");
const CHROME = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const ALLOWED = new Set(["CC0-1.0", "PDM-1.0"]);
const MAX_EDGE = 800;
const MAX_BYTES = 120 * 1024;
const QUALITIES = [0.8, 0.7, 0.6, 0.5];
const KEEP = ["title", "creator", "date", "institution", "objectUrl", "licence", "alt", "credit"];

const sha256 = (buffer) => crypto.createHash("sha256").update(buffer).digest("hex");

async function fetchVerified(id, source) {
  if (!ALLOWED.has(source.licence)) throw new Error(`${id}: licence ${source.licence} is not allowed`);
  const response = await fetch(source.fileUrl);
  if (!response.ok) throw new Error(`${id}: ${response.status} fetching ${source.fileUrl}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  const actual = sha256(buffer);
  if (actual !== source.sha256) throw new Error(`${id}: sha256 ${actual} does not match sources.json (${source.sha256})`);
  return buffer;
}

async function toWebp(page, buffer, mime) {
  for (const quality of QUALITIES) {
    const dataUrl = await page.evaluate(async ({ b64, mime, maxEdge, quality }) => {
      const img = new Image();
      img.src = `data:${mime};base64,${b64}`;
      await img.decode();
      const scale = Math.min(1, maxEdge / Math.max(img.naturalWidth, img.naturalHeight));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.naturalWidth * scale);
      canvas.height = Math.round(img.naturalHeight * scale);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/webp", quality);
    }, { b64: buffer.toString("base64"), mime, maxEdge: MAX_EDGE, quality });
    const webp = Buffer.from(dataUrl.split(",")[1], "base64");
    if (webp.length <= MAX_BYTES) return webp;
  }
  throw new Error(`could not get under ${MAX_BYTES} bytes`);
}

const mimeOf = (url) => (/\.png$/i.test(url) ? "image/png" : "image/jpeg");

fs.mkdirSync(path.join(OUT, "images"), { recursive: true });
const { browser, page } = await launchIsolatedPage(CHROME);
const images = {};
try {
  for (const [id, source] of Object.entries(SOURCES).sort(([a], [b]) => a.localeCompare(b))) {
    const webp = await toWebp(page, await fetchVerified(id, source), mimeOf(source.fileUrl));
    const file = `${id}.webp`;
    fs.writeFileSync(path.join(OUT, "images", file), webp);
    images[id] = { file, ...Object.fromEntries(KEEP.map((key) => [key, source[key] ?? null])) };
    console.log(`${id}: ${webp.length} bytes`);
  }
} finally {
  await browser.close();
}
fs.writeFileSync(path.join(OUT, "manifest.json"), `${JSON.stringify({ images }, null, 2)}\n`);
