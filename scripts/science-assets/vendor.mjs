/**
 * Copies the listed third-party SVGs and licence files into src/assets/science.
 *
 *   node scripts/science-assets/vendor.mjs
 *
 * Reads sources.json, downloads ONLY the listed files from
 * raw.githubusercontent.com at each pinned commit (never a clone), optimises
 * SVGs with SVGO, and writes them flat into the source's output folder with its
 * LICENSE (and NOTICE where the licence asks for one). Then rebuilds
 * src/assets/science/manifest.json, which the picture-credits list and the
 * tests read. Sources with `renderedBy` are produced by that script instead.
 *
 * Re-running with no changes to sources.json produces identical files.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { optimize } from "svgo";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SOURCES = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/science-assets/sources.json"), "utf8"));
const ASSETS = path.join(ROOT, "src/assets/science");

const SVGO = {
  multipass: true,
  plugins: [
    // Keep the viewBox so the pictures scale; drop ids that would collide
    // when several inline SVGs share a page.
    "preset-default", // SVGO 4 keeps viewBox by default
    { name: "prefixIds", params: { prefix: (_, info) => path.basename(info.path, ".svg") } },
  ],
};

async function fetchFile(source, file) {
  const response = await fetch(`https://raw.githubusercontent.com/${source.repo}/${source.commit}/${file}`);
  if (!response.ok) throw new Error(`${response.status} fetching ${source.repo}/${file}`);
  return Buffer.from(await response.arrayBuffer());
}

const manifest = { sources: {}, files: [] };
for (const [id, source] of Object.entries(SOURCES)) {
  if (id.startsWith("$")) continue;
  manifest.sources[id] = {
    repo: source.repo, commit: source.commit, license: source.license,
    attribution: source.attribution, credit: source.credit,
  };
  const out = path.join(ROOT, source.outputs);
  if (source.renderedBy) {
    // Produced by its own script; list what is already there.
    for (const name of fs.existsSync(out) ? fs.readdirSync(out).sort() : []) {
      manifest.files.push({ source: id, path: path.relative(ASSETS, path.join(out, name)) });
    }
    continue;
  }
  fs.mkdirSync(out, { recursive: true });
  for (const file of source.files) {
    let body = await fetchFile(source, file);
    const name = path.basename(file);
    if (name.endsWith(".svg")) {
      body = Buffer.from(optimize(body.toString("utf8"), { ...SVGO, path: name }).data);
    }
    fs.writeFileSync(path.join(out, name), body);
    manifest.files.push({ source: id, path: path.relative(ASSETS, path.join(out, name)), from: file });
    console.log(`${id}: ${name} ${(body.length / 1024).toFixed(1)} KB`);
  }
}
fs.writeFileSync(path.join(ASSETS, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`manifest: ${manifest.files.length} files`);
