import { c, choices, lesson, record, sort, topic } from "./authoring.js";
import { CONTINENTS, OCEANS, worldMap, globe } from "./visuals.js";

const continentNotes = record(["A continent is a large area of land.", "Our atlas names Africa, Antarctica, Asia and Europe.", "It also names North America, South America and Australia.", "Some atlases use Oceania for the wider Australia region.", "An ocean is a large area of salty water."]);
const locate = worldMap([["UK", [-2, 54]], ["Brunei", [114.94, 4.88]], ["Europe", [20, 52]], ["Asia", [95, 42]]],
  ["The UK is a country in Europe.", "Brunei is a country in Asia.", "Atlas maps show land and water from above."]);
const classify = record(["Europe and Asia are continents.", "The UK and Brunei are countries.", "The Atlantic and Indian are oceans.", "Africa and Antarctica are continents, not countries."]);
const journeys = [
  [0, 2], [3, 0], [4, 5], [6, 2], [2, 3], [5, 6], [1, 0],
];
export const continentsAndOceansTogether = topic([
  lesson(["Continents are large areas of land.", "Oceans are large areas of salty water.", "Our maps use seven continents and five oceans."], continentNotes, [
    ...CONTINENTS.map(([name, point], i) => c(`Which continent is marked A on map ${i + 1}?`, name, CONTINENTS[(i + 1) % 7][0], CONTINENTS[(i + 3) % 7][0], worldMap([[name, point]], ["Find A in the map key."]), ["atlas", "y2Curriculum"])),
    ...OCEANS.map(([name, point], i) => c(`Which ocean is marked A on ocean map ${i + 1}?`, name, OCEANS[(i + 1) % 5][0], OCEANS[(i + 2) % 5][0], worldMap([[name, point]], ["Find the ocean marker in the map key."]), ["atlas", "y2Curriculum"])),
  ]),
  lesson(["The UK is a country within Europe.", "Brunei is a country within Asia.", "An atlas holds maps. A globe models Earth."], locate, [
    ...choices([
      ["Which marker shows the UK?", "A", "B", "D"],
      ["Which marker shows Brunei?", "B", "A", "C"],
      ["Which continent contains the UK?", "Europe", "Asia", "Africa"],
      ["Which continent contains Brunei?", "Asia", "Europe", "Antarctica"],
      ["Which country marker is farther north?", "UK", "Brunei", "Both equally north"],
    ], locate, ["atlas"]),
    c("Which globe marker is near the Equator?", "Brunei", "UK", "North Pole", globe, ["atlas"]),
    c("Which globe marker shows a European country?", "UK", "Brunei", "South Pole", globe, ["atlas"]),
  ]),
  lesson(["Country, continent and ocean name different things.", "The UK is a country within Europe.", "Use the labels to sort names."], classify, [
    ...choices([
      ["What kind of place is Europe?", "Continent", "Country", "Ocean"],
      ["What kind of place is Brunei?", "Country", "Continent", "Ocean"],
      ["What kind of place is the Atlantic?", "Ocean", "Country", "Continent"],
      ["What kind of place is the UK?", "Country", "Ocean", "Continent"],
      ["Which pair names two continents?", "Europe and Asia", "UK and Brunei", "Atlantic and Indian"],
      ["Which pair names two countries?", "UK and Brunei", "Africa and Antarctica", "Europe and Asia"],
    ], classify, ["atlas"]),
    sort("Sort these names by their kind.", ["Continent", "Country", "Ocean"], [["Europe", 0], ["Brunei", 1], ["UK", 1], ["Atlantic", 2]], classify, ["atlas"]),
  ]),
  lesson(["Read each journey from Start to Finish.", "Find both continent markers in the key.", "A journey can connect different continents."], worldMap(CONTINENTS.slice(0, 3)), journeys.map(([from, to], i) => {
    const a = CONTINENTS[from], b = CONTINENTS[to];
    const v = worldMap([a, b], ["Journey: start at A, finish at B.", "The labels show the two continent destinations."], `Continent journey ${i + 1}`);
    return c(`Journey ${i + 1}: which pair gives Start then Finish?`, `${a[0]} to ${b[0]}`, `${b[0]} to ${a[0]}`, `${a[0]} to ${CONTINENTS[(to + 1) % 7][0]}`, v, ["atlas"]);
  })),
]);
