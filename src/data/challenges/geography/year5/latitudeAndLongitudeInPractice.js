import { c, lesson, record, sort, topic, visual } from "./authoring.js";
import { map } from "./maps.js";

const LL = "coordinates", PM = "g2_rmgGmt", ATLAS = "atlas", HEM = "y5_hemispheres", KM = "y5_degreeKm";
const fmt = (lat, lon) => `${Math.abs(lat)}°${lat >= 0 ? "N" : "S"}, ${Math.abs(lon)}°${lon >= 0 ? "E" : "W"}`;
const flipLat = (lat, lon) => fmt(-lat, lon);
const swapped = (lat, lon) => fmt(lon, lat);

const basics = record([
  "Latitude lines run east to west. They show how far north or south a place is, from 0 degrees at the Equator to 90 degrees at a pole.",
  "Longitude lines run from pole to pole. They show how far east or west a place is.",
  "The Prime Meridian is 0 degrees longitude. It passes through Greenwich in London.",
  "A position is written latitude first, then longitude, such as 51°N, 0°.",
], "Latitude and longitude");

const grid = (lon, lat) => visual("coordinates", "Practice latitude and longitude grid", `Practice grid. The marker P is where the line labelled ${Math.abs(lat)}${lat > 0 ? "N" : "S"} crosses the line labelled ${Math.abs(lon)}${lon > 0 ? "E" : "W"}.`, ["Practice grid: latitude lines run across and longitude lines run up and down.", "Read latitude first, then longitude."], { point: [lon, lat] });
const gridQuestion = ([lon, lat], n) => c(`Grid ${n}: what are the coordinates of marker P? Latitude first.`, fmt(lat, lon), flipLat(lat, lon), swapped(lat, lon), grid(lon, lat), [LL], "Read the latitude line first, then the longitude line.");
const hemisphere = ([lon, lat], n) => c(`Grid ${n}: in which two hemispheres is marker P?`, `${lat > 0 ? "Northern" : "Southern"} and ${lon > 0 ? "Eastern" : "Western"}`, `${lat > 0 ? "Southern" : "Northern"} and ${lon > 0 ? "Eastern" : "Western"}`, `${lat > 0 ? "Northern" : "Southern"} and ${lon > 0 ? "Western" : "Eastern"}`, grid(lon, lat), [LL, HEM], "North is above the Equator; east is right of the Prime Meridian.");

const CITIES = [["Cairo", 30, 31], ["Sydney", -34, 151], ["New York", 41, -74], ["Nairobi", -1, 37], ["Tokyo", 36, 140]];
const cityLine = ([n, lat, lon]) => `${n}: ${fmt(lat, lon)}.`;
const cityMap = map("world", CITIES.map((x) => x[0]), [...CITIES.map(cityLine), "Positions are rounded to the nearest degree."]);
const cityRow = (n) => CITIES.find((x) => x[0] === n);
const hemiOf = ([, lat, lon]) => `${lat > 0 ? "Northern" : "Southern"} and ${lon > 0 ? "Eastern" : "Western"}`;
const hemiQuestion = (n) => { const r = cityRow(n); const ans = hemiOf(r); const all = ["Northern and Eastern", "Northern and Western", "Southern and Eastern", "Southern and Western"].filter((x) => x !== ans); return c(`In which two hemispheres is ${n}?`, ans, all[0], all[1], cityMap, [ATLAS, HEM], "Check north or south, then east or west."); };

const useful = record([
  "One degree of latitude is about 111 kilometres on the ground.",
  "Lines of latitude are parallel and never meet.",
  "Lines of longitude are furthest apart at the Equator and meet at the poles.",
  "Greenwich was chosen as the world's 0 degrees longitude at an international meeting in 1884.",
  "Places on the same line of longitude can be at very different latitudes, so both numbers are needed.",
], "Useful facts");

export const latitudeAndLongitudeInPractice = topic([
  lesson(["Latitude and longitude give an exact position.", "Latitude comes first.", "The Prime Meridian passes through Greenwich."], basics, [
    c("What do lines of latitude show?", "How far north or south a place is", "How far east or west a place is", "How high a place is", basics, [LL], "Read the first evidence sentence."),
    c("What do lines of longitude show?", "How far east or west a place is", "How far north or south a place is", "How deep the sea is", basics, [LL], "Read the second evidence sentence."),
    c("What is the latitude of the Equator?", "0 degrees", "90 degrees", "180 degrees", basics, [LL], "Read the first evidence sentence."),
    c("What is the longitude of the Prime Meridian?", "0 degrees", "90 degrees", "180 degrees", basics, [LL, PM], "Read the third evidence sentence."),
    c("Through which place does the Prime Meridian pass?", "Greenwich", "Paris", "Cairo", basics, [PM], "Read the third evidence sentence."),
    c("Which comes first when writing a position?", "Latitude", "Longitude", "Either, it does not matter", basics, [LL], "Read the last evidence sentence."),
    c("What is the greatest latitude a place can have?", "90 degrees", "180 degrees", "360 degrees", basics, [LL], "Read the first evidence sentence."),
    sort("Sort each line by whether it is latitude or longitude.", ["Latitude", "Longitude"], [["Equator", 0], ["Runs east to west", 0], ["Prime Meridian", 1], ["Runs pole to pole", 1]], basics, [LL, PM], "Latitude lines run across; longitude lines run up and down."),
  ]),
  lesson(["Read the grid.", "Find the latitude line, then the longitude line.", "Write latitude first."], grid(40, 20), [
    gridQuestion([40, 20], 1), gridQuestion([-40, -20], 2), gridQuestion([20, -40], 3), gridQuestion([-20, 40], 4), gridQuestion([40, -20], 5), gridQuestion([-40, 20], 6),
    hemisphere([40, 20], 7), hemisphere([-40, -20], 8), hemisphere([20, -40], 9),
  ]),
  lesson(["Use coordinates for real cities.", "Positions are rounded to the nearest degree.", "Work out the hemispheres."], cityMap, [
    hemiQuestion("Cairo"), hemiQuestion("Sydney"), hemiQuestion("New York"), hemiQuestion("Nairobi"), hemiQuestion("Tokyo"),
    c("Which marked city is furthest south?", "Sydney", "Nairobi", "Cairo", cityMap, [ATLAS], "Compare latitudes; south numbers are lower."),
    c("Which marked city is closest to the Equator?", "Nairobi", "Cairo", "Tokyo", cityMap, [ATLAS], "Look for the smallest latitude number."),
    c("Which marked city is in the Western Hemisphere?", "New York", "Cairo", "Tokyo", cityMap, [ATLAS, HEM], "Look for a W in the coordinates."),
    sort("Sort each city by Northern or Southern Hemisphere.", ["Northern Hemisphere", "Southern Hemisphere"], [["Cairo", 0], ["Tokyo", 0], ["Sydney", 1], ["Nairobi", 1]], cityMap, [ATLAS, HEM], "Look for N or S in each position."),
  ]),
  lesson(["Coordinates help measure and compare.", "One degree of latitude is about 111 kilometres.", "Both numbers are needed."], useful, [
    c("About how far is one degree of latitude?", "111 kilometres", "11 kilometres", "1,110 kilometres", useful, [KM], "Read the first evidence sentence."),
    c("About how far apart are places 10 degrees of latitude apart on the same meridian?", "1,110 kilometres", "111 kilometres", "11,100 kilometres", useful, [KM], "Multiply 111 by 10."),
    c("About how far apart are places 5 degrees of latitude apart on the same meridian?", "555 kilometres", "111 kilometres", "1,110 kilometres", useful, [KM], "Multiply 111 by 5."),
    c("What is true about lines of latitude?", "They are parallel and never meet", "They all meet at the poles", "They are the same as longitude", useful, [LL], "Read the second evidence sentence."),
    c("Where do lines of longitude meet?", "At the poles", "At the Equator", "At Greenwich only", useful, [LL], "Read the third evidence sentence."),
    c("When was Greenwich chosen as the world's 0 degrees longitude?", "1884", "1584", "1984", useful, [PM], "Read the fourth evidence sentence."),
    c("Why are both latitude and longitude needed?", "Places on one line can be at very different positions along it", "One number is always enough to find any place", "Neither number helps to find a place on Earth", useful, [LL], "Read the last evidence sentence."),
    c("Which statement is supported by the evidence?", "A degree of latitude is a steady distance on the ground", "Latitude lines meet together at both poles", "Longitude lines never meet each other anywhere", useful, [KM], "Check the first three evidence sentences."),
    sort("Sort each statement by whether it describes latitude or longitude.", ["Latitude", "Longitude"], [["Lines never meet", 0], ["About 111 km per degree", 0], ["Lines meet at the poles", 1], ["Prime Meridian is 0 degrees", 1]], useful, [LL, KM], "Read the evidence sentences about each."),
  ]),
]);
