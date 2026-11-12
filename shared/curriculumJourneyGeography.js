import { isRecord, isText } from "./curriculumJourneyData.js";

const fields = (d, names) => isRecord(d) && Object.keys(d).every((k) => names.includes(k));
const optional = (v, test) => v === undefined || test(v);
const list = (v, test, max = 20) => Array.isArray(v) && v.length <= max && v.every(test);
const text = (v) => isText(v, 300);
const bool = (v) => typeof v === "boolean";
const pair = (v, min, max) => Array.isArray(v) && v.length === 2 && v.every((n) => Number.isFinite(n) && n >= min && n <= max);
const marker = (m) => fields(m, ["id", "label", "point"]) && isText(m.id, 5) && text(m.label) && pair(m.point, -180, 180) && Math.abs(m.point[1]) <= 90;
const markers = (v) => list(v, marker, 12) && new Set(v.map((m) => m.id)).size === v.length;
const gridMarker = (m) => fields(m, ["id", "label", "point"]) && isText(m.id, 5) && text(m.label) && pair(m.point, 0, 100);
const countries = ["england", "scotland", "wales", "northernIreland"];
const images = ["lake-sheep", "naples-port", "os-derwentwater", "os-land-key", "os-water-key", "whitby-harbour", "whitby-aerial", "peramu-homes", "peramu-building"];
const layout = (d) => isRecord(d) && Object.keys(d).length > 0 && Object.entries(d).every(([name, at]) => ["building", "tree", "pond", "playground"].includes(name)
  && pair(at, 0, 2) && at.every(Number.isInteger) && at[1] <= 1);
const common = ["type", "title", "alt", "lines"];
const shape = (v, extras) => fields(v, [...common, ...extras]);

const types = {
  map: (v) => shape(v, ["view", "markers", "equator", "rivers", "boundaries"])
    && ["world", "uk", "europe", "italy", "campania", "lake", "northAmerica", "southAmerica", "washington"].includes(v.view)
    && markers(v.markers) && optional(v.equator, bool) && optional(v.rivers, (r) => list(r, text))
    && optional(v.boundaries, (b) => list(b, (line) => list(line, (p) => pair(p, -180, 180), 100), 8)),
  globe: (v) => shape(v, ["referenceLines", "points"])
    && optional(v.referenceLines, (l) => list(l, (p) => fields(p, ["label", "lat"]) && text(p.label) && Number.isFinite(p.lat) && Math.abs(p.lat) < 90, 6))
    && optional(v.points, (l) => list(l, (p) => fields(p, ["label", "lat", "lon"]) && text(p.label) && Number.isFinite(p.lat) && Math.abs(p.lat) <= 80 && optional(p.lon, (n) => Number.isFinite(n) && Math.abs(n) <= 60), 6)),
  grid: (v) => shape(v, ["origin", "size", "markers", "route", "tenths", "image", "window"])
    && pair(v.origin, 0, 99) && v.origin.every(Number.isInteger) && Number.isInteger(v.size) && v.size >= 1 && v.size <= 6
    && optional(v.markers, (m) => list(m, gridMarker, 12)) && optional(v.route, (r) => list(r, (p) => pair(p, 0, 100), 10))
    && optional(v.tenths, bool) && optional(v.image, (i) => images.includes(i))
    && optional(v.window, (w) => fields(w, ["origin", "size"]) && pair(w.origin, 0, 99) && Number.isInteger(w.size) && w.size >= 1 && w.size <= v.size),
  coordinates: (v) => shape(v, ["point"]) && pair(v.point, -40, 40),
  compass: (v) => shape(v, []),
  ks1: (v) => shape(v, ["variant", "north", "features", "paths", "water", "orientationKnown", "extent"])
    && ["plan", "compass"].includes(v.variant) && ["up", "right"].includes(v.north)
    && list(v.features, (f) => fields(f, ["code", "label", "symbol", "x", "y"]) && isText(f.code, 5) && text(f.label)
      && ["house", "shop", "tree", "gate", "jetty", "water", "path"].includes(f.symbol) && [f.x, f.y].every((n) => Number.isFinite(n) && n >= 0 && n <= 4), 12)
    && optional(v.paths, (paths) => list(paths, (p) => Array.isArray(p) && p.length === 4 && p.every((n) => Number.isFinite(n) && n >= 0 && n <= 4), 12))
    && optional(v.water, (w) => ["whitby", "peramu"].includes(w)) && optional(v.orientationKnown, bool) && optional(v.extent, text),
  y1: (v) => {
    if (v.art === "cards") return shape(v, ["art", "items"]) && list(v.items, (i) => fields(i, ["s", "label", "code"]) && isText(i.s, 40) && optional(i.label, text) && optional(i.code, text), 12) && v.items.length > 0;
    if (v.art === "views") return shape(v, ["art", "panels", "layout"]) && optional(v.layout, layout)
      && list(v.panels, (p) => fields(p, ["kind", "layout", "caption", "id", "pins"]) && ["ground", "aerial", "plan"].includes(p.kind)
        && layout(p.layout ?? v.layout) && optional(p.caption, text) && optional(p.id, text)
        && optional(p.pins, (pins) => isRecord(pins) && Object.entries(pins).every(([key, feature]) => isText(key, 5) && Object.hasOwn(p.layout ?? v.layout, feature))), 3) && v.panels.length > 0;
    if (v.art === "uk") return shape(v, ["art", "names", "neighbours", "seas", "capitals", "markers", "plain", "only", "highlight"])
      && [v.names, v.neighbours, v.seas, v.plain].every((b) => optional(b, bool)) && optional(v.capitals, (c) => c === "names" || bool(c))
      && optional(v.markers, markers) && [v.only, v.highlight].every((a) => optional(a, (l) => list(l, (c) => countries.includes(c), 4)));
    return false;
  },
  photo: (v) => shape(v, ["image"]) && images.includes(v.image),
  mountain: (v) => shape(v, []),
  volcano: (v) => shape(v, []),
  fault: (v) => shape(v, []),
};
types.plan = types.grid;

/** Only public evidence fields are accepted; never a spread of a private bank item. */
export function isJourneyGeography(d) {
  return fields(d, ["visual", "sources"]) && isRecord(d.visual) && isText(d.visual.title, 150) && isText(d.visual.alt, 2000)
    && list(d.visual.lines, (s) => isText(s, 1000), 8) && Object.hasOwn(types, d.visual.type) && types[d.visual.type](d.visual)
    && optional(d.sources, (s) => list(s, (id) => isText(id, 100), 12) && new Set(s).size === s.length);
}
