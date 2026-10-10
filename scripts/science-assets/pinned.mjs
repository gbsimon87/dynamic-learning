/**
 * Fetches a file from a source in sources.json at its pinned commit, and
 * checks it against the sha256 recorded there, both when downloaded and when
 * reused from the node_modules/.cache copy. A file with no recorded hash, or
 * a mismatch, fails loudly: update sources.json deliberately when a pin moves.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const sha256 = (buffer) => crypto.createHash("sha256").update(buffer).digest("hex");

export function verify(source, file, buffer) {
  const expected = source.sha256?.[file];
  if (!expected) throw new Error(`${source.repo}: no sha256 for ${file} in sources.json`);
  const actual = sha256(buffer);
  if (actual !== expected) throw new Error(`${source.repo}: ${file} sha256 ${actual} does not match sources.json (${expected})`);
  return buffer;
}

export async function download(source, file) {
  const response = await fetch(`https://raw.githubusercontent.com/${source.repo}/${source.commit}/${file}`);
  if (!response.ok) throw new Error(`${response.status} fetching ${source.repo}/${file}`);
  return verify(source, file, Buffer.from(await response.arrayBuffer()));
}

/** Like download, but keeps a verified copy under `cacheDir`. */
export async function cachedDownload(source, cacheDir, file) {
  const target = path.resolve(cacheDir, file);
  if (!target.startsWith(path.resolve(cacheDir) + path.sep)) throw new Error(`${file} resolves outside the cache`);
  if (fs.existsSync(target)) return verify(source, file, fs.readFileSync(target));
  const buffer = await download(source, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, buffer);
  return buffer;
}
