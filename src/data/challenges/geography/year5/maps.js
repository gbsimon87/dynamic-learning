import { visual } from "./authoring.js";
import { PLACES as YEAR4_PLACES } from "../year4/maps.js";

/** [longitude, latitude]. Year 5 places added to the Year 4 set. */
export const PLACES = {
  ...YEAR4_PLACES,
  Glasgow: [-4.25, 55.86], Inverness: [-4.22, 57.48], Aberdeen: [-2.09, 57.15], "Ben Nevis": [-5.0, 56.8],
  "Loch Ness": [-4.45, 57.3], "Isle of Skye": [-6.2, 57.3], Cairngorms: [-3.67, 57.1],
  Seville: [-5.98, 37.39], Malaga: [-4.42, 36.72], Granada: [-3.6, 37.18], Cordoba: [-4.78, 37.89], Cadiz: [-6.29, 36.53],
  "Sierra Nevada": [-3.3, 37.05], "Strait of Gibraltar": [-5.6, 36.0], Madrid: [-3.7, 40.42],
  Belem: [-48.5, -1.46], "Rio de Janeiro": [-43.2, -22.9], "Sao Paulo": [-46.63, -23.55],
  Cairo: [31.24, 30.04], Tokyo: [139.69, 35.69], "New York": [-74.0, 40.71], Sydney: [151.21, -33.87], Nairobi: [36.82, -1.29], Lagos: [3.38, 6.52], Mumbai: [72.88, 19.08],
  Borneo: [114, 0.5], Sahel: [10, 14], Japan: [138, 37], California: [-120, 36], "Saudi Arabia": [45, 24], Ghana: [-1.2, 7.9], Iceland: [-19, 64.9],
  Felixstowe: [1.35, 51.96], Suez: [32.55, 30.0], Panama: [-79.5, 9.1],
};
const compassWord = (v, positive, negative) => `${Math.abs(v)} degrees ${v < 0 ? negative : positive}`;
const TITLES = { northAmerica: "North America", southAmerica: "South America", washington: "Washington State and neighbours", world: "World", uk: "United Kingdom", europe: "Europe" };
/** A labelled-marker map. Markers are A, B, C... in the order given; the alt text lists their positions. */
export function map(view, names, lines = [], extra = {}) {
  const markers = names.map((label, i) => ({ id: String.fromCharCode(65 + i), label, point: PLACES[label] }));
  const positions = markers.map((m) => `${m.id}, ${m.label}: ${compassWord(m.point[1], "north", "south")}, ${compassWord(m.point[0], "east", "west")}.`);
  return visual("map", `Map: ${TITLES[view] ?? view}`, `North is up. ${positions.join(" ")} ${lines.join(" ")}`, lines, { view, markers, ...extra });
}
export const letterOf = (v, name) => v.markers.find((m) => m.label === name).id;
