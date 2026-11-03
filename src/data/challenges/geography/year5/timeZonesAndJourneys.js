import { c, lesson, ordered, record, sort, topic, visual } from "./authoring.js";

const TZ = "g2_nistZones", GMT = "g2_rmgGmt", CLOCKS = "g2_govClocks", DATE = "y5_dateLine", RUS = "y5_russiaZones", EX = "example";
const OFF = { London: 0, Cairo: 2, Dubai: 4, Tokyo: 9, Sydney: 11, "New York": -5, "Los Angeles": -8 };
const off = (n) => `UTC${OFF[n] < 0 ? "−" : "+"}${Math.abs(OFF[n])}`;
const hh = (h) => `${String(((h % 24) + 24) % 24).padStart(2, "0")}:00`;
const clock = (h) => `${hh(h)}${h >= 24 ? " (next day)" : h < 0 ? " (day before)" : ""}`;
const offsetTable = (names, title = "Example UTC offsets, 14 January 2026") => visual("table", title, `Example data for 14 January 2026. ${names.map((n) => `${n}: ${off(n)}.`).join(" ")} UTC is the world time standard. An offset says how many hours a place is ahead of or behind UTC.`, [
  "Example data for 14 January 2026: whole-hour offsets from UTC.", "UTC+2 means two hours ahead of UTC. UTC−5 means five hours behind.", "Offsets are supplied; other dates can differ.",
], { caption: "Example UTC offsets on 14 January 2026", columns: ["Place", "Example UTC offset"], rows: names.map((n) => [n, off(n)]) });

const turn = visual("record", "Earth turns, time zones follow", "Earth turns once in 24 hours, so it turns 15 degrees of longitude each hour. Going east, local time is later. Going west, local time is earlier. Time zones are about 15 degrees wide, but their edges follow borders, so they are not perfect strips.", [
  "Earth turns once in 24 hours, so it turns 15 degrees of longitude each hour.", "Going east, local time is later. Going west, it is earlier.", "Time zones are about 15 degrees wide, but borders shape their edges.", "UTC is the world time standard. Greenwich is at 0 degrees longitude.",
], {});
const T1 = offsetTable(["London", "Cairo", "Tokyo", "New York"]);
const T2 = offsetTable(["London", "Cairo", "Dubai", "Tokyo", "Sydney", "New York", "Los Angeles"]);

/** Question: hour `h` local time at `from`, asked for `to`. Options carry a day note when midnight is crossed. */
const conv = (from, to, h) => {
  const d = OFF[to] - OFF[from], ans = h + d, mirror = h - d;
  if (d === 0) throw new Error("no difference");
  const options = [ans, mirror, ans + (d > 0 ? 1 : -1)];
  if (new Set(options.map((x) => clock(x))).size !== 3) throw new Error(`options collide ${from}-${to}-${h}`);
  return c(`It is ${hh(h)} in ${from}. What is the local time in ${to}?`, clock(ans), clock(mirror), clock(options[2]), T2, [TZ, EX], "Find both offsets. Add the difference when the place is ahead; subtract when it is behind.");
};

const flights = record([
  "Example flights. Durations are rounded and times are local.",
  "A: London to New York, leaving 10:00 London time, flight time 8 hours.",
  "B: London to Cairo, leaving 10:00 London time, flight time 5 hours.",
  "C: London to Tokyo, leaving 10:00 London time, flight time 14 hours.",
  "Example offsets: London UTC+0, New York UTC−5, Cairo UTC+2, Tokyo UTC+9.",
], "Example flights");
const arrive = (dep, dur, to) => dep + dur + OFF[to] - OFF.London;
const dateLine = record([
  "The International Date Line runs roughly along 180 degrees longitude, with bends for borders.",
  "Cross it going west and the calendar date moves forward one day.",
  "Cross it going east and the date goes back one day.",
  "Russia has eleven time zones. China uses one time across the whole country.",
  "In summer the UK moves its clocks forward one hour to British Summer Time, UTC+1.",
], "Dates, countries and clocks");

export const timeZonesAndJourneys = topic([
  lesson(["Earth turns 15 degrees every hour.", "East is later; west is earlier.", "Greenwich is at 0 degrees."], turn, [
    c("How many degrees of longitude does Earth turn each hour?", "15", "24", "360", turn, [TZ], "Read the first evidence sentence."),
    c("How long does Earth take to turn once?", "24 hours", "12 hours", "365 days", turn, [TZ], "Read the first evidence sentence."),
    c("If you travel east, what happens to local time?", "It is later", "It is earlier", "It stays the same", turn, [TZ], "Read the second evidence sentence."),
    c("If you travel west, what happens to local time?", "It is earlier", "It is later", "It stays the same", turn, [TZ], "Read the second evidence sentence."),
    c("About how wide is a time zone?", "15 degrees of longitude", "1 degree", "90 degrees", turn, [TZ], "Read the third evidence sentence."),
    c("What shapes the edges of time zones?", "Borders", "The colour of the sea", "Mountain height only", turn, [TZ], "Read the third evidence sentence."),
    c("What is UTC?", "The world time standard", "A type of clock face", "A calendar date", turn, [TZ, GMT], "Read the last evidence sentence."),
    c("A place is 30 degrees east of Greenwich. About how many hours ahead is it?", "2 hours", "1 hour", "30 hours", turn, [TZ], "Divide the degrees by 15."),
    ordered("Order the places from earliest local time to latest, west to east.", ["New York", "London", "Cairo", "Tokyo"], T1, [TZ, EX], "Start with the lowest offset."),
  ]),
  lesson(["An offset shows hours ahead or behind UTC.", "Use the table to find local times.", "Cross midnight with care."], T2, [
    conv("London", "Tokyo", 12), conv("London", "New York", 12), conv("London", "Cairo", 9), conv("Cairo", "New York", 14), conv("Tokyo", "London", 20),
    conv("London", "Sydney", 14), conv("New York", "Los Angeles", 15), conv("Dubai", "London", 18), conv("Los Angeles", "Cairo", 8),
  ]),
  lesson(["A flight changes the clock.", "Add the flight time, then the time-zone difference.", "Read the example flights."], flights, [
    c("Flight A arrives at what local time?", clock(arrive(10, 8, "New York")), clock(10 + 8), clock(arrive(10, 8, "New York") + 10), flights, [TZ, EX], "Add 8 hours, then subtract 5 hours."),
    c("Flight B arrives at what local time?", clock(arrive(10, 5, "Cairo")), clock(10 + 5), clock(10 + 5 - 2), flights, [TZ, EX], "Add 5 hours, then add 2 hours."),
    c("Flight C arrives at what local time?", clock(arrive(10, 14, "Tokyo")), clock(10 + 14), clock(10 + 14 - 9), flights, [TZ, EX], "Add 14 hours, then add 9 hours."),
    c("When Flight A lands, what is the time in London?", clock(10 + 8), clock(10 + 8 - 5), clock(10 + 8 + 5), flights, [TZ, EX], "London time is departure plus flight time."),
    c("Why does Flight A arrive at an earlier clock time than 18:00?", "New York is five hours behind London", "New York is five hours ahead", "Flights go backwards in time", flights, [TZ, EX], "Compare the offsets."),
    c("Why does Flight C arrive the next day on the clock?", "Tokyo is nine hours ahead of London", "Tokyo is nine hours behind London", "The plane is very fast", flights, [TZ, EX], "Compare the offsets."),
    c("Which flight has the longest flight time?", "Flight C", "Flight A", "Flight B", flights, [EX], "Compare the durations."),
    c("Which flight has the shortest flight time?", "Flight B", "Flight A", "Flight C", flights, [EX], "Compare the durations."),
    ordered("Order the flights from the shortest to the longest.", ["Flight B (5 hours)", "Flight A (8 hours)", "Flight C (14 hours)"], flights, [EX], "Compare the durations."),
  ]),
  lesson(["The date line is where the calendar day changes.", "Countries choose how to use time zones.", "Read the evidence."], dateLine, [
    c("Roughly along which longitude does the International Date Line run?", "180 degrees", "0 degrees", "90 degrees", dateLine, [DATE], "Read the first evidence sentence."),
    c("What happens to the date when you cross the date line going west?", "It moves forward one day", "It goes back one day", "It stays exactly the same", dateLine, [DATE], "Read the second evidence sentence."),
    c("What happens to the date when you cross the date line going east?", "It goes back one day", "It moves forward one day", "It stays exactly the same", dateLine, [DATE], "Read the third evidence sentence."),
    c("How many time zones does Russia have?", "Eleven", "One", "Three", dateLine, [RUS], "Read the fourth evidence sentence."),
    c("How many time zones does China use across the whole country?", "One", "Eleven", "Five", dateLine, [DATE, RUS], "Read the fourth evidence sentence."),
    c("What is British Summer Time?", "UTC+1, one hour ahead of GMT", "UTC−1, one hour behind GMT in summer", "UTC+5, five hours ahead of GMT in summer", dateLine, [CLOCKS], "Read the last evidence sentence."),
    c("Why does the International Date Line bend in places?", "It bends to follow borders", "Earth wobbles each day", "The Sun moves it each year", dateLine, [DATE], "Read the first evidence sentence."),
    c("Which is a true statement from the evidence?", "A large country can use one time zone or many", "Every country has exactly one time zone", "Time zones never use borders", dateLine, [RUS], "Compare Russia and China."),
    sort("Sort each move by what happens to the date.", ["Date moves forward a day", "Date goes back a day"], [["Cross the date line going west", 0], ["Fly west over 180 degrees", 0], ["Cross the date line going east", 1], ["Fly east over 180 degrees", 1]], dateLine, [DATE], "West forward, east back."),
  ]),
]);
