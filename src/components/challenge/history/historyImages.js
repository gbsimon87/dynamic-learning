import manifest from "../../../assets/history/manifest.json";

// Vite turns each WebP into a hashed URL. Built by scripts/history-assets/fetch.mjs.
const FILES = import.meta.glob("../../../assets/history/images/*.webp", { eager: true, import: "default" });

/** The picture for an id, or null when it is unknown or its file is missing. */
export function historyImage(id) {
  const entry = manifest.images[id];
  const src = entry && FILES[`../../../assets/history/images/${entry.file}`];
  return src ? { ...entry, id, src } : null;
}
