import { c, lesson, ordered, sort, topic, visual } from "./authoring.js";
import { gridReference } from "../geometry.js";

const tenths = (x) => Math.round(x * 10);
/** Six-figure reference from a grid point: three easting digits, then three northing digits (points sit on tenth lines). */
export const sixFigure = ([e, n]) => `${String(tenths(e)).padStart(3, "0")}${String(tenths(n)).padStart(3, "0")}`;
export const acrossTenths = ([e]) => tenths(e) % 10;
export const upTenths = ([, n]) => tenths(n) % 10;
/** Near-miss distractors: swapped order, swapped tenths, one tenth out, and the four-figure square only. */
export function nearMisses(point, i = 0) {
  const [e, n] = point;
  const swapped = `${String(tenths(n)).padStart(3, "0")}${String(tenths(e)).padStart(3, "0")}`;
  const tenthSwap = `${Math.floor(e)}${upTenths(point)}${Math.floor(n)}${acrossTenths(point)}`;
  const oneOut = sixFigure([e + (acrossTenths(point) < 9 ? 0.1 : -0.1), n]);
  const oneUp = sixFigure([e, n + (upTenths(point) < 9 ? 0.1 : -0.1)]);
  const pairs = [[swapped, tenthSwap], [tenthSwap, oneOut], [swapped, oneUp]];
  return pairs[i % 3];
}

export const PRACTICE_POINTS = [[23.3, 41.6], [24.7, 42.2], [25.4, 41.8], [23.8, 43.3], [24.2, 43.6], [25.6, 42.9], [25.1, 43.4]];
export const OS_POINTS = [[25.4, 21.7], [26.8, 22.3], [27.2, 23.6], [25.7, 23.2], [26.3, 21.4]];
const OS_WINDOW = { origin: [25, 21], size: 3 };

const ord = (n) => ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth"][n - 1];
const squareText = (p, o) => `the ${ord(Math.floor(p[0]) - o[0] + 1)} column and ${ord(Math.floor(p[1]) - o[1] + 1)} row of squares, counting from the grid's lower-left square`;
const practice = (point, title = "Practice grid: a six-figure reference") => visual("grid", title,
  `North is up. Grid lines are 1 km apart and thin lines mark tenths of a square. The numbered lines start at easting 23 and northing 41. Marker T is in ${squareText(point, [23, 41])}.`,
  ["Grid lines are 1 km apart. Practice grid, example data.", "Thin lines split each square into tenths; count them from the lower-left corner.", "Read eastings first, then northings."],
  { origin: [23, 41], size: 3, tenths: true, markers: [{ id: "T", label: "Tree marker", point }] });
const several = (points) => {
  const markers = points.map((point, j) => ({ id: "ABC"[j], label: `Marker ${"ABC"[j]}`, point }));
  return visual("grid", "Practice grid: find a marker from its tenths",
    `North is up. Grid lines are 1 km apart and thin lines mark tenths of a square. The numbered lines start at easting 23 and northing 41. ${markers.map((m) => `${m.id} is in ${squareText(m.point, [23, 41])}.`).join(" ")}`,
    ["Grid lines are 1 km apart. Practice grid, example data.", "Count tenths across, then up, from each marker's own lower-left corner."],
    { origin: [23, 41], size: 3, tenths: true, markers });
};
const os = (point) => visual("grid", "OS extract window: Derwent Water area",
  `North is up. The OS extract window shows eastings 25 to 28 and northings 21 to 24. The numbered lines of the window start at easting 25 and northing 21. Marker P is in ${squareText(point, [25, 21])}. The actual OS keys are shown beneath the extract.`,
  ["Original OS raster extract, June 2026, shown as a window 3 km wide. Added numbered 1 km grid and tenth lines.", "Contains OS data © Crown copyright and database right 2026.", "Use the actual OS keys shown beneath the extract. P marks a position."],
  { origin: [22, 19], size: 8, window: OS_WINDOW, tenths: true, image: "os-derwentwater", markers: [{ id: "P", label: "Position P", point }] });
const key = visual("photo", "The actual OS key, June 2026", "The actual OS key shows grey areas for buildings and green patches for woods.",
  ["OS means Ordnance Survey. A map key explains the symbols on that map.", "Grey areas represent buildings; green patches represent woods."], { image: "os-land-key" });

const EX = ["g5_rgs", "example"], OSS = ["os", "g5_rgs"];
const fourFig = (p, i) => c(`Practice grid ${i + 1}: which four-figure reference names the square holding marker T?`, gridReference(p),
  `${Math.floor(p[1])}${Math.floor(p[0])}`, gridReference([Math.floor(p[0]) + 1.5, Math.floor(p[1]) + 1.5]), practice(p), EX, "Use the lower-left corner lines. Eastings come first.");
const six = (p, v, prompt, sources, i) => c(prompt, sixFigure(p), ...nearMisses(p, i), v, sources, "Count tenths across, then up. Eastings come first.");
const exampleRef = c("A marker is 3 tenths east of 23 and 6 tenths north of 41. Choose its reference.", sixFigure([23.3, 41.6]), ...nearMisses([23.3, 41.6], 0), practice([23.3, 41.6]), EX, "Write the easting, its tenths, the northing, then its tenths.");

export const sixFigureGridReferences = topic([
  lesson(["A four-figure reference names one 1 km square.", "Read eastings first, then northings.", "A six-figure reference splits the square into tenths.", "A map key explains symbols."], key, [
    c("What does a map key explain?", "The map's symbols", "Only tomorrow's weather", "Only the map's date", key, ["os"], "Think about what a symbol stands for."),
    c("Which feature does the green patch represent?", "Woods", "A lake", "A building area", key, ["os"], "Match the colour with the key."),
    c("Which feature does the grey area represent?", "Buildings", "Woods", "Open sea", key, ["os"], "Match the colour with the key."),
    fourFig(PRACTICE_POINTS[1], 1),
    fourFig(PRACTICE_POINTS[3], 3),
    c("On this practice grid, how far apart are the numbered grid lines?", "1 km", "100 m", "10 km", practice(PRACTICE_POINTS[0]), EX, "Read the first line of the visible notes."),
    c("How many equal steps run from one numbered line to the next?", "Ten", "Five", "Twenty", practice(PRACTICE_POINTS[0]), EX, "Count the thin lines between two numbered lines, then add one."),
    c("In a six-figure reference, how many of the digits give the eastings?", "Three", "Two", "Four", practice(PRACTICE_POINTS[0]), EX, "Eastings and northings use equal shares of the digits."),
    c("Which numbers do you read first in a grid reference?", "Eastings, along", "Northings, up", "Either, if you tell people", practice(PRACTICE_POINTS[0]), EX, "Think about which direction you read first on a map."),
  ]),
  lesson(["Start at the square's lower-left corner.", "Count tenths across, then tenths up.", "Write the easting digits before the northing digits."], practice(PRACTICE_POINTS[0]), [
    c("Practice grid 1: how many tenths across from the left line is T?", `${acrossTenths(PRACTICE_POINTS[0])} tenths`, `${upTenths(PRACTICE_POINTS[0])} tenths`, "9 tenths", practice(PRACTICE_POINTS[0]), EX, "Count along the bottom from the square's left line."),
    c("Practice grid 2: how many tenths up from the bottom line is T?", `${upTenths(PRACTICE_POINTS[1])} tenths`, `${acrossTenths(PRACTICE_POINTS[1])} tenths`, "9 tenths", practice(PRACTICE_POINTS[1]), EX, "Count up from the square's bottom line."),
    c("Practice grid 3: how many tenths across from the left line is T?", `${acrossTenths(PRACTICE_POINTS[2])} tenths`, `${upTenths(PRACTICE_POINTS[2])} tenths`, "9 tenths", practice(PRACTICE_POINTS[2]), EX, "Count along the bottom from the square's left line."),
    c("In 233416, which digit counts the tenths across?", "The third digit", "The fourth digit", "The sixth digit", practice(PRACTICE_POINTS[0]), EX, "Easting digits come first, so check where they end."),
    (() => { const pts = [PRACTICE_POINTS[1], PRACTICE_POINTS[2], PRACTICE_POINTS[3]]; const v = several(pts); return c("Which marker is 7 tenths across and 2 tenths up in its square?", "Marker A", "Marker B", "Marker C", v, EX, "Count tenths from each marker's own lower-left corner."); })(),
    (() => { const pts = [PRACTICE_POINTS[4], PRACTICE_POINTS[5], PRACTICE_POINTS[6]]; const v = several(pts); return c("Which marker is 6 tenths across and 9 tenths up in its square?", "Marker B", "Marker A", "Marker C", v, EX, "Count tenths from each marker's own lower-left corner."); })(),
    c("OS extract: how many tenths up from the bottom line is P?", `${upTenths(OS_POINTS[0])} tenths`, `${acrossTenths(OS_POINTS[0])} tenths`, "9 tenths", os(OS_POINTS[0]), OSS, "Count up from the bottom line of P's square."),
    ordered("Order the steps for a six-figure reference.", ["Find the square's lower-left corner", "Count the tenths across", "Count the tenths up", "Write easting digits, then northing digits"], practice(PRACTICE_POINTS[0]), EX, "Start from the corner of the square."),
    sort("Which references are correct for marker T? Sort them.", ["Correct for T", "Not correct for T"],
      [[sixFigure(PRACTICE_POINTS[2]), 0], ...nearMisses(PRACTICE_POINTS[2], 0).map((s) => [s, 1])], practice(PRACTICE_POINTS[2]), EX, "Compare each reference with T's tenths."),
  ]),
  lesson(["Use the square's lower-left lines first.", "Add the tenths across and up.", "The OS extract uses the same 1 km grid rules."], practice(PRACTICE_POINTS[0]), [
    exampleRef,
    ...[1, 2, 3, 4].map((k) => six(PRACTICE_POINTS[k], practice(PRACTICE_POINTS[k]), `Practice grid ${k + 1}: which six-figure reference names marker T?`, EX, k)),
    ...[0, 1, 2].map((k) => six(OS_POINTS[k], os(OS_POINTS[k]), `OS extract ${k + 1}: which six-figure reference names position P?`, OSS, k + 1)),
    six(PRACTICE_POINTS[5], practice(PRACTICE_POINTS[5]), "Practice grid 6: which six-figure reference names marker T?", EX, 0),
  ]),
  lesson(["Four figures name a 1 km square.", "Six figures give a position within that square.", "A longer reference gives a more precise place."], practice(PRACTICE_POINTS[1]), [
    c("Which reference names only the whole square holding marker T?", gridReference(PRACTICE_POINTS[1]), sixFigure(PRACTICE_POINTS[1]), `${Math.floor(PRACTICE_POINTS[1][1])}${Math.floor(PRACTICE_POINTS[1][0])}`, practice(PRACTICE_POINTS[1]), EX, "Look for the reference that names the whole square."),
    c("Which reference places marker T more precisely?", "The six-figure reference", "The four-figure reference", "Both are equally precise", practice(PRACTICE_POINTS[1]), EX, "Compare the size of the part each reference names."),
    c("How long is the side of a square named by a four-figure reference here?", "1 km", "100 m", "10 km", practice(PRACTICE_POINTS[1]), EX, "Read the grid spacing in the visible notes."),
    c("How long is the side of the smallest square a six-figure reference names here?", "100 m", "1 km", "10 m", practice(PRACTICE_POINTS[1]), EX, "A square's side is split into ten equal tenths."),
    (() => { const pts = [[24.3, 42.6], [24.8, 42.1]]; const v = several(pts); return c("Markers A and B share a square. What is true of their references?", "Same four figures, different six figures", "Different four figures, same six figures", "Same four and six figures", v, EX, "Compare the squares first, then the tenths."); })(),
    c("Which statement about 233416 and 2341 is true?", "233416 is inside square 2341", "2341 is inside square 233416", "They name two different squares", practice([23.3, 41.6]), EX, "Look at the first two digits of each part."),
    c("Why can two six-figure references both lie in one four-figure square?", "A square holds many tenth positions", "Each square holds one position", "The northing is read before the easting", practice(PRACTICE_POINTS[3]), EX, "Count how many tenth positions a square holds."),
    ordered("Order these from the least to the most precise reference.", ["Marker is on the practice grid", "Marker is in square 2341", "Marker is at 233416"], practice([23.3, 41.6]), EX, "Start with the broadest place."),
    sort("Sort the references by type.", ["Four-figure", "Six-figure"], [["2341", 0], ["2543", 0], ["233416", 1], ["254439", 1]], practice(PRACTICE_POINTS[0]), EX, "Count the digits in each reference."),
  ]),
]);
