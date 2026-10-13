// Builds the Year 1 Geography teaching maps. Run: node scripts/geography-assets/build-year1-assets.mjs
// Natural Earth v5.1.2 (public domain): 50m map units for the four UK countries, 110m countries for continents.
// Output: src/assets/geography/year1-maps.json — kept separate from maps.json so other years' views are untouched.
import { writeFileSync } from "node:fs";
const NE = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/";
const get = async (u) => (await fetch(u)).json();

const sqd = (p, a, b) => { let x = a[0], y = a[1], dx = b[0] - x, dy = b[1] - y; if (dx || dy) { const t = Math.max(0, Math.min(1, ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy))); x += t * dx; y += t * dy; } return (p[0] - x) ** 2 + (p[1] - y) ** 2; };
function rdp(pts, tol) { if (pts.length < 3) return pts; let idx = 0, max = 0; for (let i = 1; i < pts.length - 1; i++) { const d = sqd(pts[i], pts[0], pts.at(-1)); if (d > max) { max = d; idx = i; } } if (max > tol * tol) return [...rdp(pts.slice(0, idx + 1), tol).slice(0, -1), ...rdp(pts.slice(idx), tol)]; return [pts[0], pts.at(-1)]; }
const round = (d) => (p) => [Math.round(p[0] * d) / d, Math.round(p[1] * d) / d];
const area = (ring) => Math.abs(ring.reduce((s, p, i) => { const q = ring[(i + 1) % ring.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0) / 2);
const outerRings = (g) => (g.type === "Polygon" ? [g.coordinates] : g.coordinates).map((poly) => poly[0]);

/** Keeps the part of a ring on one side of a meridian (Sutherland–Hodgman against one edge). */
function clip(ring, lon, keepEast) {
  const inside = (p) => keepEast ? p[0] >= lon : p[0] <= lon;
  const out = [];
  for (let i = 0; i < ring.length; i++) {
    const a = ring[i], b = ring[(i + 1) % ring.length];
    if (inside(a)) out.push(a);
    if (inside(a) !== inside(b)) { const t = (lon - a[0]) / (b[0] - a[0]); out.push([lon, a[1] + t * (b[1] - a[1])]); }
  }
  return out;
}
const tidy = (rings, tol, minArea, d) => rings.map((r) => rdp(r, tol).map(round(d))).filter((r) => r.length >= 4 && area(r) >= minArea);

// Four UK countries plus neighbours for context; the Republic of Ireland is not part of the UK.
const units = (await get(NE + "ne_50m_admin_0_map_units.geojson")).features;
const ukExtent = [-10.8, 49.8, 2.1, 61];
const inUk = (r) => r.some((p) => p[0] >= ukExtent[0] && p[0] <= ukExtent[2] && p[1] >= ukExtent[1] && p[1] <= ukExtent[3]);
const ukNations = {
  extent: ukExtent,
  features: [["England", "england"], ["Scotland", "scotland"], ["Wales", "wales"], ["N. Ireland", "northernIreland"], ["Ireland", "ireland"], ["France", "france"], ["Isle of Man", "isleOfMan"]]
    .map(([name, id]) => {
      const f = units.find((u) => u.properties.NAME === name);
      return { id, rings: tidy(outerRings(f.geometry).filter(inUk), 0.03, 0.004, 100) };
    }),
};

// Continents for the seven-continent model. Russia is split at 60°E (roughly the Urals) so it is shown in both Europe and Asia;
// France's overseas territory in South America is clipped away from Europe. Oceania islands other than Australia stay neutral.
const countries = (await get(NE + "ne_110m_admin_0_countries.geojson")).features;
const CONTINENT = { Africa: "africa", Antarctica: "antarctica", Asia: "asia", Europe: "europe", "North America": "northAmerica", "South America": "southAmerica" };
const continents = { africa: [], antarctica: [], asia: [], europe: [], northAmerica: [], southAmerica: [], australia: [], other: [] };
for (const f of countries) {
  const { NAME: name, CONTINENT: c } = f.properties;
  let rings = outerRings(f.geometry);
  if (name === "Russia") {
    rings = rings.filter((r) => r.every((p) => p[0] > -170)); // drop the Chukotka sliver across the date line
    continents.europe.push(...rings.map((r) => clip(r, 60, false)).filter((r) => r.length >= 4));
    continents.asia.push(...rings.map((r) => clip(r, 60, true)).filter((r) => r.length >= 4));
    continue;
  }
  if (name === "France") rings = rings.filter((r) => r[0][0] > -20);
  const id = name === "Australia" ? "australia" : CONTINENT[c] ?? "other";
  continents[id].push(...rings);
}
const world = { extent: [-180, -90, 180, 85], continents: Object.fromEntries(Object.entries(continents).map(([id, rings]) => [id, tidy(rings, 0.6, 0.5, 10)])) };

const out = { source: "Natural Earth v5.1.2 (public domain): ne_50m_admin_0_map_units, ne_110m_admin_0_countries. Simplified for teaching.", retrieved: "2026-10-13", ukNations, world };
writeFileSync(new URL("../../src/assets/geography/year1-maps.json", import.meta.url), JSON.stringify(out));
console.log(ukNations.features.map((f) => `${f.id}:${f.rings.length}`).join(" "), "|", Object.entries(world.continents).map(([k, v]) => `${k}:${v.length}`).join(" "));
