import { visual } from "./authoring.js";

export const PLACES = {
  London: [-0.12, 51.51], Edinburgh: [-3.19, 55.95], Cardiff: [-3.18, 51.48], Belfast: [-5.93, 54.60],
  Manchester: [-2.24, 53.48], Birmingham: [-1.90, 52.49], "Newcastle upon Tyne": [-1.61, 54.98],
  Cumbria: [-3.0, 54.6], "North Yorkshire": [-1.2, 54.2], "Greater London": [-0.12, 51.51],
  "Lake District": [-3.1, 54.5], Pennines: [-2.2, 54.0], "River Thames": [-0.55, 51.45], Whitby: [-0.62, 54.49],
  UK: [-2, 54], France: [2.2, 46.6], Spain: [-3.6, 40], Italy: [12.5, 43], Germany: [10.4, 51],
  Norway: [9, 62], Poland: [19, 52], Greece: [23, 39], Russia: [47, 59],
  Paris: [2.35, 48.86], Rome: [12.5, 41.9], Berlin: [13.4, 52.5], Moscow: [37.6, 55.75],
  Naples: [14.27, 40.85], Vesuvius: [14.43, 40.82], Campania: [14.8, 40.8],
  Keswick: [-3.13, 54.60], Ambleside: [-2.96, 54.43], Kendal: [-2.75, 54.33],
  Windermere: [-2.95, 54.35], "Scafell Pike": [-3.21, 54.45], "Derwentwater": [-3.15, 54.57],
};

export function map(view, names, lines = [], extra = {}) {
  const markers = names.map((label, i) => ({ id: String.fromCharCode(65 + i), label, point: PLACES[label] }));
  const positions = markers.map((m) => `${m.id}, ${m.label}: ${m.point[1]} degrees north, ${Math.abs(m.point[0])} degrees ${m.point[0] < 0 ? "west" : "east"}.`);
  return visual("map", `Map: ${view === "lake" ? "Lake District National Park" : view}`, `North is up. ${positions.join(" ")} ${lines.join(" ")}`, lines, { view, markers, ...extra });
}

export const UK_CITIES = ["London", "Edinburgh", "Cardiff", "Belfast", "Manchester", "Birmingham", "Newcastle upon Tyne"];
export const EUROPE_COUNTRIES = ["UK", "France", "Spain", "Italy", "Germany", "Norway", "Poland", "Greece", "Russia"];
export const UK_CITY_MAP = map("uk", UK_CITIES, ["England's capital is London; Scotland's is Edinburgh.", "Wales's capital is Cardiff; Northern Ireland's is Belfast."]);
export const EUROPE_MAP = map("europe", EUROPE_COUNTRIES, ["Russia extends eastwards into Asia beyond this European map."]);
export const LAKE_MAP = map("lake", ["Keswick", "Ambleside", "Kendal", "Windermere", "Scafell Pike", "Derwentwater"], ["The outlined area is the Lake District National Park.", "Kendal is nearby, outside the park boundary."]);
export const CAMPANIA_MAP = map("campania", ["Naples", "Vesuvius"], ["The outlined area is Campania, a region within Italy.", "Naples and Vesuvius are two places within this region."]);
