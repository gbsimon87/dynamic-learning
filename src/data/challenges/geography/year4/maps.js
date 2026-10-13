import { visual } from "./authoring.js";
import { PLACES as YEAR3_PLACES } from "../year3/maps.js";

/** [longitude, latitude]. Shared places for Year 4 map markers; add topic-only extras in your own file. */
export const PLACES = {
  ...YEAR3_PLACES,
  Canada: [-106, 60], USA: [-98, 39], Mexico: [-102, 23.5], Cuba: [-79.5, 21.8],
  Ottawa: [-75.7, 45.42], "Washington DC": [-77.04, 38.91], "Mexico City": [-99.13, 19.43], Havana: [-82.3, 23],
  Brazil: [-53, -10], Peru: [-75, -9.5], Chile: [-71, -35], Argentina: [-65, -34],
  Brasilia: [-47.93, -15.78], Lima: [-77.04, -12.05], Santiago: [-70.65, -33.45], "Buenos Aires": [-58.38, -34.6],
  "Amazon Basin": [-62, -4], "Andes Mountains": [-70, -20], Pampas: [-62, -35],
  "Rocky Mountains": [-114, 50], "Great Plains": [-100, 42], "Northern Canada": [-100, 66],
  Seattle: [-122.33, 47.61], Olympia: [-122.9, 47.04], Spokane: [-117.43, 47.66], "Puget Sound": [-122.5, 47.6],
  "Cascade Range": [-121.5, 47.5], Yakima: [-120.5, 46.6], Tacoma: [-122.44, 47.25], "Pacific coast": [-124.2, 47.3],
  Manaus: [-60.02, -3.12], Quito: [-78.5, -0.18], Aswan: [32.9, 24.09], Regina: [-104.62, 50.45], Yellowknife: [-114.37, 62.45],
  Utqiagvik: [-156.79, 71.29], Ambleside: [-2.96, 54.43], Ottawa_: [-75.7, 45.42],
};
const compassWord = (v, positive, negative) => `${Math.abs(v)} degrees ${v < 0 ? negative : positive}`;
/** A labelled-marker map. Markers are A, B, C… in the order given; the alt text lists their positions. */
export function map(view, names, lines = [], extra = {}) {
  const markers = names.map((label, i) => ({ id: String.fromCharCode(65 + i), label, point: PLACES[label] }));
  const positions = markers.map((m) => `${m.id}, ${m.label}: ${compassWord(m.point[1], "north", "south")}, ${compassWord(m.point[0], "east", "west")}.`);
  const titles = { northAmerica: "North America", southAmerica: "South America", washington: "Washington State and neighbours", world: "World", uk: "United Kingdom", europe: "Europe", lake: "Lake District National Park", campania: "Campania, Italy" };
  return visual("map", `Map: ${titles[view] ?? view}`, `North is up. ${positions.join(" ")} ${lines.join(" ")}`, lines, { view, markers, ...extra });
}
