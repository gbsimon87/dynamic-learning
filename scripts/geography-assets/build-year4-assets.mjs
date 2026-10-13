// Builds the Year 4 Geography teaching maps and climate records. Run: node scripts/geography-assets/build-year4-assets.mjs
// Natural Earth v5.1.2 (public domain); NASA POWER climatology (MERRA-2, 2001-2025).
import { readFileSync, writeFileSync } from "node:fs";
const NE = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/";
const get = async (u) => (await fetch(u)).json();
const mapsPath = new URL("../../src/assets/geography/maps.json", import.meta.url);
const maps = JSON.parse(readFileSync(mapsPath, "utf8"));

const sqd = (p, a, b) => { let x = a[0], y = a[1], dx = b[0] - x, dy = b[1] - y; if (dx || dy) { const t = Math.max(0, Math.min(1, ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy))); x += t * dx; y += t * dy; } return (p[0] - x) ** 2 + (p[1] - y) ** 2; };
function rdp(pts, tol) { if (pts.length < 3) return pts; let idx = 0, max = 0; for (let i = 1; i < pts.length - 1; i++) { const d = sqd(pts[i], pts[0], pts.at(-1)); if (d > max) { max = d; idx = i; } } if (max > tol * tol) return [...rdp(pts.slice(0, idx + 1), tol).slice(0, -1), ...rdp(pts.slice(idx), tol)]; return [pts[0], pts.at(-1)]; }
const r2 = (p) => [Math.round(p[0] * 100) / 100, Math.round(p[1] * 100) / 100];
const area = (ring) => Math.abs(ring.reduce((s, p, i) => { const q = ring[(i + 1) % ring.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0) / 2);
const hits = (bbox, e) => !(bbox[2] < e[0] || bbox[0] > e[2] || bbox[3] < e[1] || bbox[1] > e[3]);
const ringBox = (ring) => ring.reduce((b, p) => [Math.min(b[0], p[0]), Math.min(b[1], p[1]), Math.max(b[2], p[0]), Math.max(b[3], p[1])], [180, 90, -180, -90]);
function simplify(geom, extent, tol, minArea) {
  const polys = geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;
  const out = [];
  for (const poly of polys) {
    if (!hits(ringBox(poly[0]), extent) || area(poly[0]) < minArea) continue;
    const rings = poly.map((ring) => { const s = rdp(ring, tol).map(r2); return s.length >= 4 ? s : null; }).filter(Boolean);
    if (rings.length) out.push(rings);
  }
  return out.length ? { type: "MultiPolygon", coordinates: out } : null;
}
const countries = (await get(NE + "ne_50m_admin_0_countries.geojson")).features;
const states = (await get(NE + "ne_10m_admin_1_states_provinces.geojson")).features;
const rivers = (await get(NE + "ne_10m_rivers_lake_centerlines.geojson")).features;
const view = (extent, tol, minArea, extra = []) => ({
  extent,
  features: [...countries.map((f) => ({ name: f.properties.NAME, geometry: f.geometry })), ...extra]
    .map((f) => ({ name: f.name, ...(f.region ? { region: true } : {}), geometry: simplify(f.geometry, extent, tol, minArea) })).filter((f) => f.geometry),
});
maps.northAmerica = view([-170, 5, -50, 75], 0.2, 1);
maps.southAmerica = view([-85, -57, -32, 14], 0.15, 0.5);
const wa = states.filter((f) => ["Washington", "Oregon", "Idaho", "Montana"].includes(f.properties.name) && f.properties.admin === "United States of America")
  .concat(states.filter((f) => f.properties.name === "British Columbia")).map((f) => ({ name: f.properties.name === "Washington" ? "Washington State" : f.properties.name, region: f.properties.name === "Washington", geometry: f.geometry }));
maps.washington = { ...view([-125.5, 45.3, -116.5, 49.4], 0.01, 0, []), };
maps.washington.features = wa.map((f) => ({ name: f.name, ...(f.region ? { region: true } : {}), geometry: simplify(f.geometry, [-125.5, 45.3, -116.5, 49.4], 0.01, 0) })).filter((f) => f.geometry);
const line = (names, extent) => rivers.filter((f) => names.includes(f.properties.name)).flatMap((f) => (f.geometry.type === "LineString" ? [f.geometry.coordinates] : f.geometry.coordinates).map((c) => ({ name: f.properties.name, coords: rdp(c, 0.01).map(r2).filter((p) => p[0] >= extent[0] - 1 && p[0] <= extent[2] + 1 && p[1] >= extent[1] - 1 && p[1] <= extent[3] + 1) }))).filter((l) => l.coords.length > 1);
maps.uk.lines = line(["Thames", "Severn", "Tyne", "Trent", "Clyde", "Mersey", "Tay"], maps.uk.extent);
maps.washington.lines = line(["Columbia", "Snake"], maps.washington.extent);
console.log("uk rivers", [...new Set(maps.uk.lines.map((l) => l.name))], "wa rivers", [...new Set(maps.washington.lines.map((l) => l.name))], Object.fromEntries(Object.entries(maps).map(([k, v]) => [k, v.features.length])));
writeFileSync(mapsPath, JSON.stringify(maps));

const places = {
  manaus: ["Manaus", "Brazil", -60.02, -3.12], quito: ["Quito", "Ecuador", -78.5, -0.18], aswan: ["Aswan", "Egypt", 32.9, 24.09],
  seattle: ["Seattle", "USA", -122.33, 47.6], spokane: ["Spokane", "USA", -117.43, 47.66], regina: ["Regina", "Canada", -104.62, 50.45],
  yellowknife: ["Yellowknife", "Canada", -114.37, 62.45], utqiagvik: ["Utqiagvik", "USA", -156.79, 71.29], ambleside: ["Ambleside", "UK", -2.96, 54.43],
  naples: ["Naples", "Italy", 14.27, 40.85], buenosaires: ["Buenos Aires", "Argentina", -58.4, -34.6], ottawa: ["Ottawa", "Canada", -75.7, 45.42],
};
const M = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"], D = [31, 28.25, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const records = {};
for (const [id, [name, country, lon, lat]] of Object.entries(places)) {
  const j = await get(`https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=T2M,PRECTOTCORR&community=RE&longitude=${lon}&latitude=${lat}&format=JSON`);
  const p = j.properties.parameter;
  records[id] = { name, country, lat, lon, elevationM: Math.round(j.geometry.coordinates[2]), months: M.map((m, i) => ({ t: Math.round(p.T2M[m]), r: Math.round(p.PRECTOTCORR[m] * D[i]) })) };
}
writeFileSync(new URL("../../src/assets/geography/records/year4-climate-2001-2025.json", import.meta.url), JSON.stringify({ source: "NASA POWER climatology API v2.10.1, MERRA-2, Jan 2001 - Dec 2025; model grid-cell means, rounded; rainfall = mm/day x days in month", retrieved: "2026-10-13", places: records }, null, 1));
console.log(Object.entries(records).map(([k, v]) => `${k} ${v.elevationM}m T:${v.months.map((m) => m.t).join(",")} R:${v.months.map((m) => m.r).join(",")}`).join("\n"));
