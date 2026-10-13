import { c, lesson, ordered, record, sort, topic, visual } from "./authoring.js";
import { letter, letterOf, worldMap } from "./climateZones.js";

const DAY = "g2_astroDay", GMT = "g2_rmgGmt", CLOCKS = "g2_govClocks", NIST = "g2_nistZones", EG = "example";

/** Earth from above the North Pole; points A-D at longitudes east (+) or west (-) of Greenwich. Daylight spans 110 degrees west to 70 degrees east. */
const lit = (lon) => lon > -110 && lon < 70;
const side = (p) => `${Math.abs(p.lon)} degrees ${p.lon < 0 ? "west" : "east"} of Greenwich`;
export function dn(lons, lines = [], title = "Earth seen from above the North Pole") {
  const points = lons.map((lon, i) => ({ label: letter(i), lon }));
  for (const p of points) if ([-110, 70].some((e) => Math.abs(p.lon - e) < 15)) throw new Error("point too close to the day/night edge");
  const alt = `Earth seen from above the North Pole. The Sun is on the left. The Greenwich Meridian is drawn as a line. ${points.map((p) => `${p.label} is ${p.lon === 0 ? "on the Greenwich Meridian" : side(p)}.`).join(" ")} In this drawing, places from 110 degrees west to 70 degrees east of Greenwich face the Sun. ${lines.join(" ")}`;
  return visual("daynight", title, alt, lines, { points });
}
const dayOf = (v, label) => lit(v.points.find((p) => p.label === label).lon);

// Slot 1
const Dv1 = dn([-40, 130], ["Day and night are labelled on the drawing."]);
const Dv2 = dn([130, -40, -160], ["Only one point is on the side facing the Sun."]);
const Dv3 = dn([-40, 40, 130], ["Only one point is on the side facing away from the Sun."]);
const Dv4 = dn([-40, 130, 40, -160], ["Sort each lettered point into day or night."]);
const turn = record(["Evening: the place turns away from the Sun.", "Morning: the place turns back towards the Sun.", "Midnight: the place faces away from the Sun.", "Noon: the place faces the Sun.", "Earth turns steadily, so these changes repeat."], "A place as Earth turns");
const rotate = record(["Earth rotates, or turns, all the time.", "The side facing the Sun has daytime.", "The side facing away from the Sun has night.", "The Sun appears to rise in the east and set in the west."], "Day and night");
const pick = (v, want, prompt, wrongs) => {
  const ans = v.points.find((p) => dayOf(v, p.label) === want).label;
  return c(prompt, ans, ...wrongs, v, [DAY], "Find the Sun, then the side facing it.");
};
const dayCount = (v, want) => v.points.filter((p) => dayOf(v, p.label) === want).length;
if (dayCount(Dv1, true) !== 1 || dayCount(Dv1, false) !== 1 || dayCount(Dv2, true) !== 1 || dayCount(Dv3, false) !== 1) throw new Error("ambiguous day/night points");

// Slot 2
const OFFSETS = { London: 0, Cairo: 2, Dubai: 4, Tokyo: 9, "New York": -5 };
const off = (n) => `UTC${OFFSETS[n] < 0 ? "−" : "+"}${Math.abs(OFFSETS[n])}`;
const offLines = (names) => [...names.map((n) => `${n}: example offset ${off(n)}.`), "Example data for 14 January 2026; the Greenwich Meridian is the 0 degrees line."];
const M1 = worldMap(["London", "Cairo", "Tokyo"], offLines(["London", "Cairo", "Tokyo"]));
const M2 = worldMap(["New York", "London", "Dubai", "Tokyo"], offLines(["New York", "London", "Dubai", "Tokyo"]));
const M3 = worldMap(["Tokyo", "London", "Dubai", "New York", "Cairo"], offLines(["Tokyo", "London", "Dubai", "New York", "Cairo"]));
const G1 = dn([-40, 0, 40], ["The line is the Greenwich Meridian, labelled on the drawing."], "Greenwich Meridian and three points");
const G2 = dn([-60, 0, 130], ["The line is the Greenwich Meridian, labelled on the drawing."], "Greenwich Meridian and three points");
const mk = (v, name, others, prompt, hint = "Read the labels, then the positions in the description.") => c(prompt, letterOf(v, name), ...others.map((o) => letterOf(v, o)), v, [GMT, EG], hint);

// Slot 3
const rows = (names) => names.map((n) => [n, off(n)]);
const offsetTable = (names) => visual("table", "Example UTC offsets, 14 January 2026", `Example data for 14 January 2026. ${names.map((n) => `${n}: ${off(n)}.`).join(" ")} UTC is the world time standard; an offset says how many hours a place is ahead of or behind it.`, ["Example data for 14 January 2026: whole-hour offsets from UTC.", "UTC+2 means two hours ahead of UTC; UTC−5 means five hours behind.", "These offsets are supplied; other dates can differ."], { caption: "Example UTC offsets on 14 January 2026", columns: ["Place", "Example UTC offset"], rows: rows(names) });
const TT = offsetTable(["New York", "London", "Cairo", "Dubai", "Tokyo"]);
const hh = (h) => `${String(h).padStart(2, "0")}:00`;
const conv = (from, to, h) => {
  const d = OFFSETS[to] - OFFSETS[from], ans = h + d;
  if (d === 0 || ans < 8 || ans > 17 || h < 8 || h > 17) throw new Error(`time example out of range ${from}${to}`);
  const mirror = h - d;
  const w2 = mirror >= 8 && mirror <= 17 && mirror !== h ? mirror : ans + 1;
  return c(`It is ${hh(h)} in ${from}. What time is it in ${to}?`, hh(ans), hh(h), hh(w2), TT, [EG], "Find the difference between the two offsets.");
};
const hours = (a, b) => OFFSETS[b] - OFFSETS[a];

// Slot 4
const why = record(["Earth rotates, so places face the Sun at different times.", "Places further east are ahead: the Sun reaches them earlier.", "Britain uses Greenwich Mean Time (GMT) in winter.", "Britain uses British Summer Time (BST) in summer; BST is one hour ahead of GMT.", "Time zone borders often follow local boundaries; zones are not all equal strips."], "Why local times differ");
const SRC4 = [DAY, CLOCKS, NIST];

export const dayNightAndTimeZones = topic([
  lesson(["Earth rotates, or turns, all the time.", "The side facing the Sun has daytime.", "The side facing away has night."], rotate, [
    pick(Dv1, true, "Which point is in daytime?", ["B", "Neither point"]),
    pick(Dv1, false, "Which point is in night?", ["A", "Neither point"]),
    pick(Dv2, true, "Which point faces the Sun?", ["A", "C"]),
    pick(Dv3, false, "Which point faces away from the Sun?", ["A", "B"]),
    c("What causes day and night?", "Earth rotating so places face the Sun, then away", "The Sun moving around Earth each day", "Clouds covering the whole Earth", rotate, [DAY], "Think about what Earth does all the time."),
    c("Which side of Earth has daytime?", "The side facing the Sun", "The side facing away from the Sun", "The side nearest the North Pole", rotate, [DAY], "Find where the Sun's light falls."),
    c("Why does the Sun appear to rise in the east?", "Earth turns, so places move towards the Sun", "The Sun starts moving at breakfast", "The Moon pushes the Sun upwards", rotate, [DAY], "It is Earth that moves."),
    sort("Sort each point into day or night.", ["Day side", "Night side"], Dv4.points.map((p) => [`Point ${p.label}`, dayOf(Dv4, p.label) ? 0 : 1]), Dv4, [DAY]),
    ordered("Starting at noon, order what happens to a place as Earth turns.", ["Noon: faces the Sun", "Evening: turns away", "Midnight: faces away", "Morning: turns back"], turn, [DAY], "Start at noon. Follow the turn away from the Sun."),
  ]),
  lesson(["The Greenwich Meridian is the 0 degrees longitude line.", "In our example, places east of it are ahead; places west are behind.", "Markers show example places and example offsets."], M1, [
    c("Which point lies on the Greenwich Meridian?", "B", "A", "C", G1, [GMT], "Find the labelled line first."),
    c("What longitude has the Greenwich Meridian?", "0 degrees", "90 degrees east", "180 degrees", G1, [GMT], "It is the reference line for longitude."),
    c("Which point is east of the Greenwich Meridian?", "C", "A", "B", G2, [GMT], "East is the direction of the Sun's rise."),
    c("Which point is west of the Greenwich Meridian?", "A", "B", "C", G2, [GMT], "Find the point on the other side from the east."),
    mk(M1, "London", ["Cairo", "Tokyo"], "Which marker is closest to the Greenwich Meridian?", "Compare each marker's degrees east or west."),
    mk(M1, "London", ["Cairo", "Tokyo"], "Which marker has the example offset UTC+0?"),
    mk(M2, "New York", ["London", "Dubai"], "Which marker is west of the Greenwich Meridian?", "Look for degrees west."),
    mk(M2, "Tokyo", ["London", "Dubai"], "Which marker has the largest example offset?"),
    c("Which example offset is shown for New York?", "UTC−5", "UTC+5", "UTC+0", M2, [EG], "Read the New York line."),
    c("In which direction from Greenwich is Tokyo?", "East", "West", "It is on the meridian", M1, [GMT, EG], "Compare degrees east or west."),
    ordered("Order the markers from furthest west to furthest east.", ["New York", "London", "Cairo", "Dubai", "Tokyo"], M3, [GMT, EG], "Compare degrees west first, then degrees east."),
  ]),
  lesson(["UTC is the world time standard. An offset says how far a clock is from it.", "UTC+2 means two hours ahead; UTC−5 means five hours behind.", "To compare places, find the difference between their offsets."], TT, [
    conv("London", "Cairo", 10),
    conv("London", "Dubai", 9),
    conv("New York", "London", 10),
    conv("Cairo", "London", 12),
    conv("Dubai", "Tokyo", 10),
    conv("Tokyo", "Cairo", 15),
    conv("London", "New York", 13),
    c(`How many hours ahead of London is Dubai in the example?`, `${hours("London", "Dubai")} hours ahead`, `${hours("London", "Dubai")} hours behind`, "2 hours ahead", TT, [EG], "Subtract London's offset from Dubai's."),
    c("Which place is behind London in the example?", "New York", "Cairo", "Tokyo", TT, [EG], "Look for a minus sign."),
    c("At the same moment, which place has the latest local time?", "Tokyo", "Cairo", "New York", TT, [EG], "The largest offset is furthest ahead."),
    sort("Sort the places by their example offset from London.", ["Ahead of London", "Behind London"], [["Cairo", 0], ["Dubai", 0], ["Tokyo", 0], ["New York", 1]], TT, [EG]),
    ordered("Order the places from earliest to latest local time at one moment.", ["New York", "London", "Cairo", "Dubai", "Tokyo"], TT, [EG], "The smallest offset has the earliest time."),
  ]),
  lesson(["Earth turns, so places face the Sun at different times.", "Britain uses GMT in winter and BST in summer.", "BST is one hour ahead of GMT."], why, [
    c("Why are local times different around the world?", "Earth rotates, so places face the Sun at different times", "The Sun moves faster over some countries", "Clocks run at different speeds", why, SRC4, "Think about what Earth does."),
    c("When does Britain use Greenwich Mean Time?", "In winter", "In summer", "Only at midnight", why, SRC4, "Read the Britain lines."),
    c("When does Britain use British Summer Time?", "In summer", "In winter", "All year round", why, SRC4, "Read the Britain lines."),
    c("What does BST stand for?", "British Summer Time", "British Standard Time", "Big Sun Time", why, SRC4, "The first word is about the country."),
    c("How does BST compare with GMT?", "One hour ahead", "One hour behind", "Exactly the same", why, SRC4, "Read the BST line."),
    c("Which statement is too simple about time zones?", "Every time zone is an equal strip", "Zone borders often follow local boundaries", "Time zones can be written as UTC offsets", why, SRC4, "Check the line about borders."),
    c("Why is Cairo ahead of London in the example?", "Cairo is east of Greenwich, where the Sun arrives earlier", "Cairo is west of Greenwich", "Cairo is on the Greenwich Meridian", why, SRC4, "Compare east and west."),
    c("Why is UTC+0 only an example for London on 14 January?", "In summer Britain uses BST instead", "London moves east in summer", "Clocks stop in summer", why, SRC4, "Read the lines about summer."),
    sort("Sort the names by the season Britain uses them.", ["Winter in Britain", "Summer in Britain"], [["GMT", 0], ["Greenwich Mean Time", 0], ["BST", 1], ["British Summer Time", 1], ["One hour ahead of GMT", 1]], why, SRC4),
  ]),
]);
