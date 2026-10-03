/**
 * Renders the Year 3 flowering-tree illustration with ez-tree, once.
 *
 *   node scripts/science-assets/render-trees.mjs
 *
 * Fetches ONLY ez-tree's src/lib files from the pinned commit (sources.json),
 * caches them under node_modules/.cache/science-assets, grows one tree with a
 * fixed seed in the system Google Chrome (playwright-core, no browser
 * download), draws it in the same flat toon style as the bones, and writes to
 * src/assets/science/ez-tree/:
 *
 *   tree-blossom.webp   the tree on a transparent background, base at the bottom
 *   tree.json           image size and label anchors (0–1): trunk, leaves, blossom
 *   LICENSE             ez-tree's MIT licence
 *
 * The outputs are committed; nothing here runs during `npm run build`, and the
 * ez-tree code is never bundled into the app.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SOURCE = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/science-assets/sources.json"), "utf8"))["ez-tree"];
const CACHE = path.join(ROOT, "node_modules/.cache/science-assets/ez-tree", SOURCE.commit);
const OUT = path.join(ROOT, SOURCE.outputs);
const CHROME = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

async function cached(file) {
  const target = path.join(CACHE, file);
  if (fs.existsSync(target)) return fs.readFileSync(target);
  const response = await fetch(`https://raw.githubusercontent.com/${SOURCE.repo}/${SOURCE.commit}/${file}`);
  if (!response.ok) throw new Error(`${response.status} fetching ${file}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, buffer);
  return buffer;
}

const lib = {};
for (const file of SOURCE.files) lib[file] = await cached(file);

// tree.js imports the presets loader, which imports JSON modules a plain
// browser page cannot load. We pass every option ourselves, so it is stubbed.
const PRESETS_STUB = "export const TreePreset = {}; export function loadPreset() { throw new Error('presets are not used'); }";
const THREE_DIR = path.join(ROOT, "node_modules/three/build");
const PAGE = fs.readFileSync(path.join(ROOT, "scripts/science-assets/render-trees.html"));

const browser = await chromium.launch({ executablePath: CHROME, args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage();
page.on("console", (message) => console.log(`[page] ${message.text()}`));
await page.route("http://render.local/**", async (route) => {
  const url = new URL(route.request().url());
  if (url.pathname === "/") return route.fulfill({ body: PAGE, contentType: "text/html" });
  if (url.pathname.startsWith("/ez-tree/")) {
    const name = url.pathname.slice("/ez-tree/".length).replace(/(\.js)?$/, ".js");
    if (name === "presets/index.js") return route.fulfill({ body: PRESETS_STUB, contentType: "text/javascript" });
    const file = `src/lib/${name}`;
    if (lib[file]) return route.fulfill({ body: lib[file], contentType: "text/javascript" });
    return route.fulfill({ status: 404 });
  }
  const file = path.join(THREE_DIR, path.basename(url.pathname));
  if (fs.existsSync(file)) return route.fulfill({ body: fs.readFileSync(file), contentType: "text/javascript" });
  return route.fulfill({ status: 404 });
});
await page.goto("http://render.local/");
await page.waitForFunction(() => window.ready === true || window.failed, null, { timeout: 120000 });
const failure = await page.evaluate(() => window.failed);
if (failure) throw new Error(failure);

const result = await page.evaluate(() => window.renderTree());
await browser.close();

fs.mkdirSync(OUT, { recursive: true });
const file = "tree-blossom.webp";
fs.writeFileSync(path.join(OUT, file), Buffer.from(result.dataUrl.split(",")[1], "base64"));
fs.writeFileSync(path.join(OUT, "LICENSE"), lib.LICENSE);
const tree = { source: SOURCE.repo, commit: SOURCE.commit, credit: SOURCE.credit, file, width: result.width, height: result.height, anchors: result.anchors };
fs.writeFileSync(path.join(OUT, "tree.json"), `${JSON.stringify(tree, null, 2)}\n`);
console.log(`${file}: ${result.width}×${result.height}, ${(fs.statSync(path.join(OUT, file)).size / 1024).toFixed(0)} KB`);
console.log(`wrote ${path.relative(ROOT, OUT)}`);
