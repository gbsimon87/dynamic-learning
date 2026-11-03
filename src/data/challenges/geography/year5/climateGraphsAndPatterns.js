import { c, lesson, ordered, record, sort, topic } from "./authoring.js";
import { climateTable, place } from "../year4/records.js";

const POWER = "g1_power", NOAA = "g2_noaaClimate", MET = "g2_metZones", SEAS = "y5_seasons", ALT = "y5_altitude", BIO = "g2_nasaBiomes";
const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const SHORT = MONTH.map((m) => m.slice(0, 3));
const MI = [0, 3, 6, 9];
const nm = (id) => place(id).name;
const val = (id, mi, key) => place(id).months[mi][key];
/** The name whose value is largest (dir 1) or smallest (dir -1) in a month; throws on a tie. */
const pick = (ids, mi, key, dir) => {
  const sorted = [...ids].sort((a, b) => dir * (val(b, mi, key) - val(a, mi, key)));
  if (val(sorted[0], mi, key) === val(sorted[1], mi, key)) throw new Error(`tie ${mi} ${key}`);
  return sorted[0];
};
const others = (ids, answer) => ids.filter((x) => x !== answer);
const ask = (v, ids, prompt, mi, key, dir, hint) => { const a = pick(ids, mi, key, dir); return c(prompt, nm(a), nm(others(ids, a)[0]), "They are equal", v, [POWER], hint); };
const warmest = (id) => MI.reduce((best, i) => (val(id, i, "t") > val(id, best, "t") ? i : best), MI[0]);
const coolest = (id) => MI.reduce((best, i) => (val(id, i, "t") < val(id, best, "t") ? i : best), MI[0]);
const range = (id) => val(id, warmest(id), "t") - val(id, coolest(id), "t");
const chartOf = (id, mi, prompt, wrongs, max, step, v) => ({ kind: "chart", prompt, answer: val(id, mi, "r"), options: [val(id, mi, "r"), ...wrongs.map((w) => val(id, w, "r"))], chart: { type: "bar", rows: place(id).months.map((m, i) => ({ label: SHORT[i], value: m.r })), step, max, unit: `${nm(id)} rainfall (mm)` }, visual: v, sources: [POWER], evidence: [v.lines[0]], hint: `Find the bar labelled ${SHORT[mi]} and read its value.` });

// Slot 1: reading a climate table.
const IDS1 = ["manaus", "aswan"];
const t1 = climateTable(IDS1, { title: "Manaus and Aswan, typical months", months: MI });
const meaning = record(["Weather is what the sky is doing today.", "Climate is the typical weather of a place over many years.", "A climate table shows typical temperature and rainfall month by month.", "Rainfall is measured in millimetres (mm)."], "Weather and climate");
// Slot 2: hemispheres.
const IDS2 = ["buenosaires", "ottawa"];
const t2 = climateTable(IDS2, { title: "Buenos Aires (south) and Ottawa (north), typical months", months: MI });
const seasons = record(["Earth is tilted as it travels around the Sun.", "When the Northern Hemisphere leans towards the Sun, it is summer in the north and winter in the south.", "Six months later it is the other way round.", "So January is warm in Buenos Aires and cold in Ottawa."], "Opposite seasons");
// Slot 3: matching records to biomes.
const IDS3 = ["manaus", "aswan", "regina", "utqiagvik"];
const t3 = climateTable(IDS3, { title: "Four places, typical months", months: MI });
const biomeLines = record(["Tropical rainforest: hot and very wet all year.", "Desert: very little rain, often with hot days.", "Grassland: warm summers, cold winters and moderate rain.", "Tundra: very cold, with a short cool summer and little rain."], "Four biomes and their climates");
// Slot 4: why places differ.
const IDS4 = ["manaus", "quito"];
const t4 = climateTable(IDS4, { title: "Manaus and Quito, both near the Equator", months: MI });
const why = record(["Manaus and Quito both lie within 4 degrees of the Equator.", "Manaus is 51 metres above sea level.", "Quito is 1,863 metres above sea level.", "Air gets cooler as height above sea level increases."], "Same latitude, different height");
if (range("buenosaires") === range("ottawa")) throw new Error("range tie");
const bigRange = range("ottawa") > range("buenosaires") ? "Ottawa" : "Buenos Aires";
const smallRange = bigRange === "Ottawa" ? "Buenos Aires" : "Ottawa";
const MAR_R = chartOf("regina", 5, "How many millimetres of rain does Regina typically get in June?", [4, 6], 100, 20, t3);
const QWET = MI.reduce((b, i) => (val("quito", i, "r") > val("quito", b, "r") ? i : b), MI[0]);
const COLD = pick(IDS3, 0, "t", -1);
const AUG_R = chartOf("manaus", 7, "How many millimetres of rain does Manaus typically get in August?", [6, 8], 300, 50, t1);

export const climateGraphsAndPatterns = topic([
  lesson(["Climate is typical weather over many years.", "A climate table shows temperature and rainfall.", "Compare places month by month."], meaning, [
    c("What is climate?", "The typical weather of a place over many years", "The weather a place has on one single day", "The strength of the wind at this minute", meaning, [NOAA, MET], "Read the second evidence sentence."),
    c("What is weather?", "What the sky is doing today", "A place's average over a century", "Where a place sits on the map", meaning, [NOAA], "Read the first evidence sentence."),
    c("What unit measures rainfall in these tables?", "Millimetres", "Kilograms", "Litres per hour", meaning, [POWER], "Read the last evidence sentence."),
    ask(t1, IDS1, "In January, which place is warmer?", 0, "t", 1, "Read the January row."),
    ask(t1, IDS1, "In July, which place is warmer?", 6, "t", 1, "Read the July row."),
    ask(t1, IDS1, "In January, which place has more rain?", 0, "r", 1, "Compare millimetres in the January row."),
    ask(t1, IDS1, "In July, which place has less rain?", 6, "r", -1, "Compare millimetres in the July row."),
    c("Which place has rain in every shown month?", "Manaus", "Aswan", "Both", t1, [POWER], "Look for a month with no rain."),
    AUG_R,
  ]),
  lesson(["Seasons are opposite north and south of the Equator.", "Buenos Aires is in the Southern Hemisphere.", "Ottawa is in the Northern Hemisphere."], seasons, [
    ask(t2, IDS2, "In January, which place is warmer?", 0, "t", 1, "Read the January row."),
    ask(t2, IDS2, "In July, which place is warmer?", 6, "t", 1, "Read the July row."),
    c("Which season is it in Buenos Aires in January?", "Summer", "Winter", "Autumn only", t2, [SEAS, POWER], "Look at its January temperature and the seasons evidence."),
    c("Which season is it in Ottawa in January?", "Winter", "Summer", "Spring only", t2, [SEAS, POWER], "Look at its January temperature."),
    c("Why are the seasons opposite in the two hemispheres?", "Earth is tilted as it travels around the Sun", "The Sun moves closer to the south only", "The Moon changes the seasons", seasons, [SEAS], "Read the first evidence sentence."),
    c("Which place has the bigger temperature change across the shown months?", bigRange, smallRange, "They are equal", t2, [POWER], "Compare each column's coolest and warmest months."),
    c("Which month shown is coolest in Buenos Aires?", MONTH[coolest("buenosaires")], "January", "October", t2, [POWER], "Compare the four temperatures in the column."),
    c("Which month shown is warmest in Ottawa?", MONTH[warmest("ottawa")], "January", "April", t2, [POWER], "Compare the four temperatures in the column."),
    ordered("Order Buenos Aires temperatures from coolest to warmest.", [...MI].sort((a, b) => val("buenosaires", a, "t") - val("buenosaires", b, "t")).map((i) => `${MONTH[i]} (${val("buenosaires", i, "t")}°C)`), t2, [POWER], "Start with the lowest temperature."),
  ]),
  lesson(["Climate helps explain which biome grows.", "Match each record to its biome.", "Use temperature and rainfall."], t3, [
    c("Which place has a desert climate?", "Aswan", "Manaus", "Utqiagvik", t3, [POWER, BIO], "Look for a place with no rain."),
    c("Which place fits a tropical rainforest?", "Manaus", "Regina", "Aswan", t3, [POWER, BIO], "Look for hot weather and lots of rain all year."),
    c("Which place fits the tundra?", "Utqiagvik", "Manaus", "Aswan", t3, [POWER, BIO], "Look for the coldest place."),
    c("Which place fits a grassland with cold winters?", "Regina", "Manaus", "Aswan", t3, [POWER, BIO], "Look for a place with cold January and warm July."),
    c("Which place is coldest in January?", nm(COLD), "Manaus", "Aswan", t3, [POWER], "Compare the January row."),
    c("Which biome has little rain and often hot days?", "Desert", "Tropical rainforest", "Tundra", biomeLines, [BIO], "Read the second evidence sentence."),
    c("Which biome is hot and very wet all year?", "Tropical rainforest", "Desert", "Grassland", biomeLines, [BIO], "Read the first evidence sentence."),
    c("Which of these places is below freezing in January?", "Regina", "Manaus", "Aswan", t3, [POWER], "Look for a negative temperature in the January row."),
    MAR_R,
  ]),
  lesson(["Latitude is not the only influence on climate.", "Height above sea level matters too.", "Compare two places near the Equator."], t4, [
    ask(t4, IDS4, "In January, which place is warmer?", 0, "t", 1, "Read the January row."),
    ask(t4, IDS4, "In July, which place is cooler?", 6, "t", -1, "Read the July row."),
    c("Which place is higher above sea level?", "Quito", "Manaus", "They are level", why, [ALT], "Read the second and third evidence sentences."),
    c("Why is Quito cooler than Manaus?", "It is much higher above sea level", "It is far from the Equator", "It is in the Arctic", why, [ALT], "Read the last evidence sentence."),
    c("What happens to air as height above sea level increases?", "It gets cooler", "It gets hotter", "It stays exactly the same", why, [ALT], "Read the last evidence sentence."),
    c("Which statement is supported by the evidence?", "Two places near the Equator can have different temperatures", "All places on the Equator are equally hot all year", "Height above sea level has no effect on climate", why, [ALT, POWER], "Compare Manaus with Quito."),
    c("Which month shown is wettest in Quito?", MONTH[QWET], "January", "July", t4, [POWER], "Compare Quito's four rainfall values."),
    c("What does this show about using latitude alone to predict climate?", "It is not enough on its own", "It always gives the whole answer", "It does not matter at all", why, [ALT, MET], "Think about what else changed."),
    sort("Sort each influence by whether it is height, distance from the Equator or something else.", ["Height above sea level", "Distance from the Equator"], [["Quito at 1,863 metres", 0], ["Mountain tops", 0], ["Places near the poles", 1], ["Places near the Equator", 1]], why, [ALT, MET], "Decide which idea each card describes."),
  ]),
]);
