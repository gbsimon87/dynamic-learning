import { c, lesson, ordered, record, sort, topic, visual } from "./authoring.js";

const OS = "os", CON = "y5_contours", SCALE = "g5_rgs", EX = "example";

/** A contour map with letters on the rings. `steep` is the side where the rings are close together. */
function contour({ title, rings, interval, base, summit, steep, spots }) {
  const heights = Array.from({ length: rings }, (_, i) => base + i * interval);
  const steepText = steep ? ` The rings are closest together on the ${steep} side.` : " The rings are evenly spaced.";
  const spotText = spots.map((s) => `${s.id} is ${s.between ? `halfway between the ${heights[s.ring]} metre ring and the ${heights[s.ring + 1]} metre ring` : `on the ${heights[s.ring]} metre ring`}, on the ${s.side} side.`).join(" ");
  const alt = `A contour map seen from above, with north up. The rings are labelled ${heights.join(", ")} metres, from the outside inwards. The top of the hill is ${summit} metres.${steepText} ${spotText}`;
  return visual("contour", title, alt, ["Each ring joins places at the same height above sea level.", `The gap between rings is ${interval} metres of height.`, `The triangle marks the top, ${summit} metres high.`], {
    rings, interval, base, summit, ...(steep ? { steep } : {}), spots: spots.map((s) => ({ ...s, label: s.between ? `Between ${heights[s.ring]} m and ${heights[s.ring + 1]} m` : `On the ${heights[s.ring]} m ring` })),
  });
}
const heightOf = (v, id) => { const s = v.spots.find((x) => x.id === id); return v.base + s.ring * v.interval; };

const intro = record([
  "A contour line joins places at the same height above sea level.",
  "On Ordnance Survey maps, contour lines are brown.",
  "A number on a contour line tells you its height in metres.",
  "A spot height gives the height of one point, such as a hill top.",
  "Contours never cross, because one place cannot have two heights.",
], "What contour lines show");
const C1 = contour({ title: "A hill with letters", rings: 4, interval: 10, base: 20, summit: 63, spots: [{ id: "A", ring: 0, side: "west" }, { id: "B", ring: 2, side: "west" }, { id: "C", ring: 1, side: "east" }, { id: "D", ring: 3, side: "east" }] });
const C2 = contour({ title: "A steep east side", rings: 4, interval: 10, base: 50, summit: 83, steep: "east", spots: [{ id: "A", ring: 0, side: "west" }, { id: "B", ring: 1, side: "west" }, { id: "C", ring: 0, side: "east" }, { id: "D", ring: 1, side: "east" }] });
const C3 = contour({ title: "A steep north side", rings: 5, interval: 10, base: 100, summit: 147, steep: "north", spots: [{ id: "A", ring: 0, side: "west" }, { id: "B", ring: 1, side: "east", between: true }, { id: "C", ring: 3, side: "west" }, { id: "D", ring: 2, side: "east", between: true }] });
const slope = record(["Contour lines close together show a steep slope.", "Contour lines far apart show a gentle slope.", "Walking up a steep slope is harder than walking up a gentle slope.", "A steep slope can make a river flow fast and a path hard to climb."], "Contours and slopes");
const ht = (v, id) => c(`What is the height at marker ${id}?`, `${heightOf(v, id)} m`, `${heightOf(v, id) + v.interval} m`, `${heightOf(v, id) - v.interval} m`, v, [CON, OS], "Read the number on the ring that marker is on.");
const climb = (v, id) => { const d = v.summit - heightOf(v, id); return c(`A walker climbs from marker ${id} to the top. How many metres of climb is that?`, `${d} m`, `${d + v.interval} m`, `${d - v.interval} m`, v, [CON, OS], "Subtract the height at the marker from the height at the top."); };

const gridPlan = visual("plan", "Plan with a 1 km grid", "North is up. Grid squares are 1 km wide. A is in the second column and second row. B is three squares east of A. C is four squares north of A. D is three squares east of C.", ["Practice plan, example data.", "Each grid square is 1 km wide."], { origin: [10, 20], size: 6, markers: [{ id: "A", label: "Marker A", point: [11.5, 21.5] }, { id: "B", label: "Marker B", point: [14.5, 21.5] }, { id: "C", label: "Marker C", point: [11.5, 25.5] }, { id: "D", label: "Marker D", point: [14.5, 25.5] }] });
const km = (n) => [`${n} km`, `${n + 1} km`, `${n - 1} km`];
const scales = record([
  "A map scale compares distance on the map with distance on the ground.",
  "On a 1:25 000 map, 1 cm is 250 metres, so 4 cm is 1 km.",
  "On a 1:50 000 map, 1 cm is 500 metres, so 2 cm is 1 km.",
  "A 1:25 000 map is larger scale, so it shows more detail.",
  "OS Explorer maps are 1:25 000. OS Landranger maps are 1:50 000.",
], "Map scale");

export const contoursScaleAndOsMaps = topic([
  lesson(["Contour lines join places at the same height.", "Numbers show height in metres.", "OS contour lines are brown."], intro, [
    c("What does a contour line join?", "Places at the same height", "Places at the same distance", "Places of the same size", intro, [CON, OS], "Read the first evidence sentence."),
    c("What colour are contour lines on OS maps?", "Brown", "Blue", "Black", intro, [CON, OS], "Read the second evidence sentence."),
    c("What does the number on a contour line show?", "Its height in metres", "Its width in metres", "Its age in years", intro, [CON], "Read the third evidence sentence."),
    c("What does a spot height show?", "The height of one point", "The width of a path", "The name of a hill", intro, [CON], "Read the fourth evidence sentence."),
    c("Can two contour lines cross?", "No, one place cannot have two heights", "Yes, they often cross on a steep hill", "Yes, they cross wherever two valleys meet", intro, [CON], "Read the last evidence sentence."),
    ht(C1, "A"), ht(C1, "B"), ht(C1, "C"),
  ]),
  lesson(["Close rings show a steep slope.", "Far apart rings show a gentle slope.", "Read the drawing."], slope, [
    c("What do contour lines close together show?", "A steep slope", "A gentle slope", "A flat sea", slope, [CON], "Read the first evidence sentence."),
    c("What do contour lines far apart show?", "A gentle slope", "A steep slope", "A cliff", slope, [CON], "Read the second evidence sentence."),
    c("Which walk is harder?", "Up a steep slope", "Up a gentle slope", "Along a flat path", slope, [CON], "Read the third evidence sentence."),
    c("Which side of the hill is steeper?", "East", "West", "They are equally steep", C2, [CON], "Find the side where the rings are closest together."),
    c("Which marker pair is on the steep side?", "C and D", "A and B", "A and C", C2, [CON], "Look at the east side."),
    c("Which marker pair is on the gentle side?", "A and B", "C and D", "B and D", C2, [CON], "Look at the west side."),
    c("What is the height at marker B?", `${heightOf(C2, "B")} m`, `${heightOf(C2, "B") + 10} m`, `${heightOf(C2, "B") - 10} m`, C2, [CON, OS], "Read the number on the ring."),
    c("On a steep slope, how fast might a river flow?", "Fast", "Slowly", "It cannot flow", slope, [CON], "Read the last evidence sentence."),
    sort("Sort each description by steep slope or gentle slope.", ["Steep slope", "Gentle slope"], [["Rings close together", 0], ["Hard to climb", 0], ["Rings far apart", 1], ["Easy to walk up", 1]], slope, [CON], "Read the first three evidence sentences."),
  ]),
  lesson(["Rings give heights in steps.", "A place between rings is between two heights.", "The top is higher than the highest ring."], C3, [
    c("Marker A is on which height?", `${heightOf(C3, "A")} m`, `${heightOf(C3, "A") + 10} m`, `${heightOf(C3, "A") + 20} m`, C3, [CON], "Read the number on the outer ring."),
    c("Marker C is on which height?", `${heightOf(C3, "C")} m`, `${heightOf(C3, "C") - 10} m`, `${heightOf(C3, "C") + 10} m`, C3, [CON], "Read the number on the ring."),
    c("Marker B is between which two heights?", "110 m and 120 m", "100 m and 110 m", "120 m and 130 m", C3, [CON], "It is between ring 2 and ring 3 from outside."),
    c("Marker D is between which two heights?", "120 m and 130 m", "110 m and 120 m", "130 m and 140 m", C3, [CON], "It is between ring 3 and ring 4 from outside."),
    c("Which side of this hill is steepest?", "North", "South", "West", C3, [CON], "Find where the rings are closest together."),
    c("How high is the top of the hill?", "147 m", "140 m", "150 m", C3, [CON, OS], "Read the spot height by the triangle."),
    climb(C3, "A"), climb(C1, "B"),
    c("Which marker is the highest?", "C", "A", "B", C3, [CON], "Compare the heights on each ring."),
    ordered("Order the markers from the lowest to the highest.", ["A", "B", "D", "C"], C3, [CON], "Marker A is on the outer ring."),
  ]),
  lesson(["A scale links map distance to real distance.", "A 1:25 000 map has 4 cm for each kilometre.", "Use grid squares for quick distances."], scales, [
    c("On a 1:25 000 map, how many centimetres show 1 km?", "4 cm", "2 cm", "10 cm", scales, [SCALE], "Read the second evidence sentence."),
    c("On a 1:50 000 map, how many centimetres show 1 km?", "2 cm", "4 cm", "10 cm", scales, [SCALE], "Read the third evidence sentence."),
    c("A path is 8 cm long on a 1:25 000 map. How long is it on the ground?", "2 km", "1 km", "4 km", scales, [SCALE], "Every 4 cm is 1 km."),
    c("A path is 6 cm long on a 1:50 000 map. How long is it on the ground?", "3 km", "2 km", "6 km", scales, [SCALE], "Every 2 cm is 1 km."),
    c("Which scale shows more detail?", "1:25 000", "1:50 000", "They show the same detail", scales, [SCALE], "Read the fourth evidence sentence."),
    c("Which OS maps are 1:25 000?", "Explorer", "Landranger", "Neither", scales, [SCALE, OS], "Read the last evidence sentence."),
    c("How far is it from A to B in a straight line along the grid?", ...km(3), gridPlan, [EX], "Count the grid squares between the markers."),
    c("How far is it from A to C in a straight line along the grid?", ...km(4), gridPlan, [EX], "Count the grid squares between the markers."),
    c("A walker goes from A east to B, then north to D. How far is that?", ...km(7), gridPlan, [EX], "Add the east distance and the north distance."),
  ]),
]);
