import { c, lesson, ordered, record, sort, topic, visual } from "./authoring.js";
import { climateTable, place } from "./records.js";

export const FULL = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const POWER = "g2_nasaPower", NOAA = "g2_noaaClimate", MET = "g2_metZones";

/** Climate record id for each place name used on the maps. */
const IDS = { Manaus: "manaus", Quito: "quito", Aswan: "aswan", Seattle: "seattle", Spokane: "spokane", Regina: "regina", Yellowknife: "yellowknife", Utqiagvik: "utqiagvik", Ambleside: "ambleside", Naples: "naples", "Buenos Aires": "buenosaires", Ottawa: "ottawa" };
/** Extra marker places used by group 2 (longitude, latitude); not climate records. */
export const EXTRA = { Madrid: [-3.7, 40.42], Cairo: [31.24, 30.04], Dubai: [55.3, 25.2], Tokyo: [139.69, 35.69], "New York": [-74.0, 40.71], London: [-0.12, 51.51] };
const point = (name) => IDS[name] ? [place(IDS[name]).lon, place(IDS[name]).lat] : EXTRA[name];
const where = (p) => `${Math.round(Math.abs(p[1]))} degrees ${p[1] < 0 ? "south" : "north"}, ${Math.round(Math.abs(p[0])) === 0 ? "on the Greenwich Meridian (0 degrees longitude)" : `${Math.round(Math.abs(p[0]))} degrees ${p[0] < 0 ? "west" : "east"}`}`;
export const letter = (i) => String.fromCharCode(65 + i);

/** World map with lettered markers A, B, C... in the order of `names`. */
export function worldMap(names, lines = []) {
  const markers = names.map((label, i) => ({ id: letter(i), label, point: point(label) }));
  const alt = `North is up. ${markers.map((m) => `${m.id}, ${m.label}: ${where(m.point)}.`).join(" ")} ${lines.join(" ")}`;
  return visual("map", "Map: World", alt, lines, { view: "world", markers });
}
export const letterOf = (v, name) => v.markers.find((m) => m.label === name).id;
export const lat = (name) => point(name)[1];
export const lon = (name) => point(name)[0];

/** Climate table with elevation and latitude also written into the text equivalent. */
export function tbl(ids, months = [0, 3, 6, 9], title = "Monthly climate records") {
  const t = climateTable(ids, { title, months });
  const extra = ids.map((id) => `${place(id).name} is at ${Math.abs(place(id).lat).toFixed(1)} degrees ${place(id).lat < 0 ? "south" : "north"} and the data cell for it is ${place(id).elevationM} m above sea level.`).join(" ");
  return { ...t, alt: `${t.alt} ${extra}` };
}
const warm = (id, i) => place(id).months[i].t;
const rain = (id, i) => place(id).months[i].r;
const range = (id) => warm(id, 6) - warm(id, 0);
/** Tie guard: an answer must be unambiguous. */
const strict = (a, b, what) => { if (a === b) throw new Error(`tie: ${what}`); return a > b; };

/** Simplified scheme used by this topic (checked in climate.test.js). */
export function zoneOf(id) {
  const m = place(id).months;
  if (place(id).elevationM >= 1000) return "outside the scheme"; // mountain climate: an altitude influence
  if (m.every((x) => x.r < 10)) return "dry";
  if (m.every((x) => x.t >= 18)) return "tropical";
  if (m.every((x) => x.t <= 10)) return "polar";
  if (m.every((x) => x.t > 0 && x.t < 30)) return "temperate";
  return "outside the scheme";
}
const SCHEME = "Our simple scheme: tropical is warm every month, dry has almost no rain, temperate is mild, polar is always cold.";

// Slot 1: weather and climate
const wc = record(["Weather is what the air is like at one time, such as this morning.", "Climate is the usual weather of a place, averaged over many years, often thirty.", "A monthly climate summary shows typical months, not one day.", "One hot day does not change a place's climate.", "These example tables use 25 years, 2001 to 2025, a little short of the usual thirty."], "Weather or climate?");
// Slot 2: locate zones
const MA = worldMap(["Manaus", "Aswan", "Seattle", "Utqiagvik"], [SCHEME, "Manaus is a tropical example.", "Aswan is a dry example.", "Seattle is a temperate example.", "Utqiagvik is a polar example."]);
const MB = worldMap(["Ambleside", "Naples", "Buenos Aires", "Seattle"], [SCHEME, "All four places are temperate examples in this scheme."]);
const marker = (v, answerName, wrongNames, prompt, hint = "Use the zone labels, then the positions in the description.") => c(prompt, letterOf(v, answerName), ...wrongNames.map((n) => letterOf(v, n)), v, [MET, NOAA, POWER], hint);
// Slot 3: compare records
const T1 = tbl(["manaus", "aswan"], undefined, "Manaus and Aswan, typical months");
const T2 = tbl(["seattle", "spokane"], undefined, "Seattle and Spokane, typical months");
const T3 = tbl(["ambleside", "naples"], undefined, "Ambleside and Naples, typical months");
const T4 = tbl(["yellowknife", "utqiagvik"], undefined, "Yellowknife and Utqiagvik, typical months");
const T5 = tbl(["quito", "manaus"], undefined, "Quito and Manaus, typical months");
const nm = (id) => place(id).name;
const compare = (v, a, b, month, kind) => {
  const f = kind === "warmer" || kind === "colder" ? warm : rain;
  const aHigher = strict(f(a, month), f(b, month), `${a}${b}${month}${kind}`);
  const wantHigh = kind === "warmer" || kind === "wetter";
  const answer = aHigher === wantHigh ? nm(a) : nm(b), other = aHigher === wantHigh ? nm(b) : nm(a);
  const word = { warmer: "warmer", colder: "colder", wetter: "wetter", drier: "drier" }[kind];
  return c(`Which is ${word} in ${FULL[month]}: ${nm(a)} or ${nm(b)}?`, answer, other, "Both are the same", v, [POWER], "Find the same month in both columns. Compare the numbers.");
};
const bigger = (v, a, b) => {
  const aBig = strict(range(a), range(b), `range${a}${b}`);
  const answer = aBig ? nm(a) : nm(b), other = aBig ? nm(b) : nm(a);
  return c(`Which temperature changes more from January to July: ${nm(a)} or ${nm(b)}?`, answer, other, "They change equally", v, [POWER], "Subtract January from July for each place.");
};
const rainLine = (id, months) => `${nm(id)} rainfall (mm): ${months.map((i) => `${FULL[i]} ${rain(id, i)}`).join(", ")}.`;
const chartQ = (id, month, others) => {
  const months = [0, 3, 6, 9];
  const v = record([rainLine(id, months), "The bars show these four example months only."], `${nm(id)} rainfall chart`);
  return { kind: "chart", prompt: `How many millimetres of rain did ${nm(id)} get in ${FULL[month]}?`, answer: rain(id, month), options: [rain(id, month), ...others.map((i) => rain(id, i))],
    chart: { type: "bar", rows: months.map((i) => ({ label: FULL[i], value: rain(id, i) })), step: 50, max: 200, unit: "Rainfall (mm)" }, visual: v, sources: [POWER], evidence: [v.lines[0]], hint: "Find the bar for that month. Read its number." };
};
const rainSort = (id, cut, label) => {
  const months = [0, 3, 6, 9];
  months.forEach((i) => strict(rain(id, i), cut, `cut${id}${i}`));
  const v = T2;
  return sort(label, [`Over ${cut} mm`, `Under ${cut} mm`], months.map((i) => [`${nm(id)} ${FULL[i]}`, rain(id, i) > cut ? 0 : 1]), v, [POWER], "Read each month's rainfall in the table.");
};
// Slot 4: connect and explain
const Q4 = tbl(["quito", "manaus"], undefined, "Quito and Manaus, typical months");
const S4 = tbl(["seattle", "spokane"], undefined, "Seattle and Spokane, typical months");
const Y4 = tbl(["yellowknife", "utqiagvik"], undefined, "Yellowknife and Utqiagvik, typical months");
const N4 = tbl(["naples", "ambleside"], undefined, "Naples and Ambleside, typical months");
const L4 = tbl(["seattle", "spokane", "manaus", "utqiagvik"], undefined, "Four places, typical months");
const mountain = record(["Latitude is how far a place is north or south of the Equator.", "Height above sea level can make a place cooler.", "In our scheme, mountain climate is an extra influence, not a fifth zone.", "Latitude helps, but other factors also matter."], "Why latitude is not the whole story");

export const climateZones = topic([
  lesson(["Weather is the air at one time, like this morning.", "Climate is the usual weather, averaged over many years.", "Climate tables show typical months, not one day."], wc, [
    c("Which describes weather?", "Rain falling in Seattle this morning", "Seattle's usual rainfall each December", "Seattle's typical year of rain", wc, [NOAA], "One of these happens at a single time."),
    c("Which describes climate?", "Quito's usual temperature through the year", "A shower in Quito at lunchtime", "Quito's sunshine this afternoon", wc, [NOAA], "Climate is a usual pattern, not a moment."),
    sort("Sort the statements into weather and climate.", ["Weather", "Climate"], [["Fog this morning", 0], ["Snow fell last night", 0], ["Winters are usually cold", 1], ["Summers are usually dry", 1]], wc, [NOAA]),
    sort("Sort these into weather and climate.", ["Weather", "Climate"], [["A storm on Tuesday", 0], ["Thunder at three o'clock", 0], ["Hot most of the year", 1], ["Wet every winter for years", 1], ["Frost at breakfast today", 0]], wc, [NOAA]),
    c("How long a run of records makes a climate summary?", "Many years, often about thirty", "A few days of records", "A single week of records", wc, [NOAA], "Climate uses a long run of records."),
    c("Why does one hot day not change a place's climate?", "Climate uses records from many years", "Climate is based on the latest day", "Hot days are not measured by anyone", wc, [NOAA], "Think about how long a climate record is."),
    c("Which record is a climate summary?", "Average July temperature over many years", "The temperature at noon today", "Whether it is raining right now", wc, [NOAA], "Look for the record that uses many years."),
    c("What does a monthly climate table show?", "Typical temperature and rainfall for each month", "Today's forecast for the next hour", "The wind speed in one storm", wc, [NOAA, POWER], "The table is about typical months."),
    sort("Which are weather, and which are climate?", ["Weather", "Climate"], [["Today's forecast", 0], ["Yesterday's sunshine", 0], ["Typical monthly rainfall", 1], ["Average yearly temperature", 1]], wc, [NOAA]),
  ]),
  lesson(["Our simple scheme has four zones: tropical, dry, temperate and polar.", "Tropical is warm every month; polar is always cold.", "Some places, such as mountains, do not fit it neatly."], MA, [
    marker(MA, "Utqiagvik", ["Manaus", "Aswan"], "Which marker is the polar example?"),
    marker(MA, "Manaus", ["Aswan", "Seattle"], "Which marker is the tropical example?"),
    marker(MA, "Aswan", ["Seattle", "Utqiagvik"], "Which marker is the dry example?"),
    marker(MA, "Utqiagvik", ["Seattle", "Aswan"], "Which of these four markers lies furthest north?", "Compare the degrees north in the description."),
    marker(MA, "Manaus", ["Aswan", "Seattle"], "Which of these four markers lies nearest the Equator?", "The Equator is at zero degrees."),
    marker(MB, "Buenos Aires", ["Naples", "Ambleside"], "Which temperate example is south of the Equator?", "Look for degrees south."),
    marker(MB, "Ambleside", ["Naples", "Seattle"], "Which temperate example lies furthest north?", "Compare the degrees north in the description."),
    marker(MB, "Seattle", ["Naples", "Ambleside"], "Which temperate example lies furthest west?", "Compare the degrees west in the description."),
    ordered("Order the zone examples from furthest north to furthest south.", ["Utqiagvik (polar)", "Seattle (temperate)", "Aswan (dry)", "Manaus (tropical)"], MA, [MET, POWER], "Compare the degrees north or south."),
    ordered("Order these temperate examples from furthest north to furthest south.", ["Ambleside", "Seattle", "Naples", "Buenos Aires"], MB, [MET, POWER], "Compare the degrees north or south."),
  ]),
  lesson(["Compare the same months in each column.", "Temperature is in degrees Celsius; rainfall is in millimetres (mm).", "These records come from model grid cells, not one weather station."], T1, [
    compare(T1, "manaus", "aswan", 0, "warmer"),
    compare(T1, "manaus", "aswan", 6, "wetter"),
    compare(T2, "seattle", "spokane", 0, "colder"),
    compare(T2, "seattle", "spokane", 6, "wetter"),
    compare(T3, "ambleside", "naples", 6, "warmer"),
    compare(T3, "ambleside", "naples", 6, "drier"),
    compare(T4, "yellowknife", "utqiagvik", 0, "colder"),
    compare(T4, "yellowknife", "utqiagvik", 6, "warmer"),
    compare(T5, "manaus", "quito", 0, "warmer"),
    bigger(T2, "seattle", "spokane"),
    bigger(T3, "ambleside", "naples"),
    bigger(T4, "yellowknife", "utqiagvik"),
    rainSort("seattle", 100, "Sort Seattle's example months by rainfall."),
    chartQ("seattle", 3, [0, 9]),
    chartQ("quito", 0, [3, 6]),
  ]),
  lesson(["Latitude is distance north or south of the Equator.", "Height above sea level can also change climate.", "Mountains can make places cooler than their latitude suggests."], mountain, [
    c("Quito and Manaus are both near the Equator. Why is Quito cooler?", "Quito is much higher above sea level", "Quito is much further from the Equator", "Quito is nearer the poles than Manaus", Q4, [MET, NOAA, POWER], "Compare the heights above sea level."),
    c("Which statement does the Quito and Manaus table support?", "Quito is cooler than Manaus near the Equator", "Quito and Manaus have the same temperatures", "Quito is far from the Equator", Q4, [POWER], "Compare January temperatures in both columns."),
    c("Seattle and Spokane have similar latitude. What does the record show?", "Spokane is colder in January", "Seattle is colder in January", "Both have the same January temperature", S4, [POWER], "Compare the January row."),
    c("Which evidence shows Spokane is higher above sea level?", "732 m compared with 110 m", "Minus 3 degrees compared with 4 degrees", "47.7 degrees north compared with 47.6", S4, [POWER], "Look for metres above sea level."),
    c("Why can latitude alone not explain Quito's climate?", "Height above sea level also matters", "Only rainfall matters", "Climate never depends on position", Q4, [MET, NOAA], "Think about the extra number in the column heading."),
    c("In our four-zone scheme, how should Quito's mountain climate be treated?", "As an altitude influence, not forced into one zone", "As polar because it is cool", "As tropical because of its latitude only", Q4, [MET, NOAA], "Mountain climate is an extra influence."),
    c("Which statement is too simple?", "Places at the same latitude always have the same climate", "Height above sea level can change climate", "Climate zones group many places simply", S4, [MET, POWER], "Check the Seattle and Spokane records."),
    c("Utqiagvik is further north than Yellowknife. What does July show?", "Utqiagvik is colder in July", "Yellowknife is colder in July", "Both are the same in July", Y4, [POWER], "Compare the July row."),
    c("Which two places best test whether latitude alone explains climate?", "Seattle and Spokane", "Manaus and Utqiagvik", "Utqiagvik and Spokane", L4, [POWER], "Look for places at similar latitudes."),
    sort("Sort the statements by what the Seattle and Spokane table supports.", ["Supported", "Not supported"], [["Spokane is colder in January", 0], ["Spokane is higher above sea level", 0], ["Seattle is colder in January", 1], ["The two have equal rainfall in July", 1]], S4, [POWER]),
    c("Naples is nearer the Equator than Ambleside. What does July show?", "Naples is warmer in July", "Naples is colder in July", "Naples and Ambleside match in July", N4, [POWER], "Compare latitude, then the July row."),
  ]),
]);
