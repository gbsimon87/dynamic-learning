import { visual } from "./authoring.js";
import { PLACES } from "./maps.js";

/** Shared helpers for the group 4 banks (settlements, trade, resources, three regions). */
export const landGrid = (title, cells, key, lines = []) => {
  const name = Object.fromEntries(key.map((k) => [k.code, k.label]));
  const alt = `${title}. North is up. Key: ${key.map((k) => `${k.code} is ${k.label}`).join("; ")}. ${cells.map((r, i) => `Row ${i + 1} from west to east: ${[...r].map((ch) => `${ch} ${name[ch]}`).join(", ")}.`).join(" ")} ${lines.join(" ")}`.trim();
  return visual("landuse", title, alt, lines, { cells, key });
};
/** Several drawings in one visual; the alt carries every drawing's text equivalent. */
export const pairOf = (title, parts, lines) => visual("record", title, `${parts.map((p) => `${p.title}: ${p.alt}`).join(" ")} ${lines.join(" ")}`.trim(), lines, { maps: parts });
export const count = (cells, ch) => cells.join("").split(ch).length - 1;
/** Numeric options around a count: the answer plus two near misses, as strings. */
export const near = (n) => [String(n), String(n + 1), String(n > 1 ? n - 1 : n + 2)];
const NAMES = ["east", "north-east", "north", "north-west", "west", "south-west", "south", "south-east"];
/** Eight-point compass direction from one named place to another (flat approximation). */
export function direction(from, to) {
  const [x1, y1] = PLACES[from], [x2, y2] = PLACES[to];
  const a = (Math.atan2(y2 - y1, (x2 - x1) * Math.cos(((y1 + y2) / 2) * Math.PI / 180)) * 180 / Math.PI + 360) % 360;
  const off = Math.abs(((a % 45) + 45) % 45 - 22.5);
  if (off < 5) throw new Error(`Direction ${from} to ${to} is too close to a compass boundary`);
  return NAMES[Math.round(a / 45) % 8];
}
/** [answer, wrong1, wrong2] direction options. */
export const directionOptions = (from, to) => { const i = NAMES.indexOf(direction(from, to)); return [NAMES[i], NAMES[(i + 4) % 8], NAMES[(i + 2) % 8]]; };
/** The single name whose value is largest (or smallest); throws on ties. */
export function extreme(items, value, max = true) {
  const sorted = [...items].sort((a, b) => (max ? value(b) - value(a) : value(a) - value(b)));
  if (value(sorted[0]) === value(sorted[1])) throw new Error("Tied extreme");
  return sorted[0];
}
export const dist = (a, b) => Math.hypot(PLACES[a][0] - PLACES[b][0], (PLACES[a][1] - PLACES[b][1]) * 1.4);
