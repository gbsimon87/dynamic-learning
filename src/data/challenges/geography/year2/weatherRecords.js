import { choices, lesson, ordered, record, topic, visual } from "./authoring.js";
import { WEATHER_ACTIVITY } from "./activities.js";
const symbols = record(["☀ sunny: sunshine. ☁ cloudy: cloud cover.", "☂ rainy: falling rain. ≋ windy: moving air.", "Several weather types can happen on one day.", "A day with sunshine can also have rain."], "Weather symbol key");
export const WEATHER_LOG = [
  ["Monday", "☂ rainy, ☁ cloudy"], ["Tuesday", "☀ sunny, ≋ windy"],
  ["Wednesday", "☁ cloudy"], ["Thursday", "☂ rainy, ≋ windy"], ["Friday", "☀ sunny"],
];
const log = visual("table", "Five-day UK practice weather log", WEATHER_LOG.map(r => r.join(": ")).join(". ") + ". This is example data, not measured weather.",
  ["Example data for a UK practice place, October 2026.", "Each day can show more than one weather type."],
  { caption: "Example data — five days, UK practice place", columns: ["Day", "Weather recorded"], rows: WEATHER_LOG });
const counts = visual("table", "Count days with each weather type", "Sunny: 2 days. Cloudy: 2 days. Rainy: 2 days. Windy: 2 days. Each circle means one day.",
  ["Example data from the five-day UK practice log.", "One ● means one day with that weather type.", "A day can count in more than one row."],
  { caption: "Pictogram and tally — one ● means one day", columns: ["Weather", "Days", "Tally"], rows: [["Sunny", "● ●", "| |"], ["Cloudy", "● ●", "| |"], ["Rainy", "● ●", "| |"], ["Windy", "● ●", "| |"]] });
const method = record(["Observe from the same safe place at the same time.", "Write the day and every weather type you notice.", "Keep the same symbol meanings throughout the log.", "Count days after you finish recording.", "Five days tell us about that record, not long-term climate.", "UK winters are usually cooler than summers, with varied daily weather."]);
export const weatherRecords = topic([
  lesson(["Weather describes what happens on a day.", "Symbols help us record sunshine, clouds, rain and wind.", "Several weather types can happen together."], symbols, choices([
    ["Which symbol records rain?", "☂ Rainy", "☀ Sunny", "≋ Windy"],
    ["Which symbol records sunshine?", "☀ Sunny", "☁ Cloudy", "☂ Rainy"],
    ["Which symbol records cloud cover?", "☁ Cloudy", "☀ Sunny", "≋ Windy"],
    ["Which symbol records moving air?", "≋ Windy", "☂ Rainy", "☁ Cloudy"],
    ["What does the rainy symbol mean?", "Falling rain", "Only sunshine", "Only moving air"],
    ["Can sunshine and rain happen on one day?", "Yes, both can happen", "No, never", "Only in winter"],
    ["What does the cloudy symbol record?", "Cloud cover", "Falling snow only", "No moving air"],
  ], symbols, ["y2Weather"])),
  lesson(["Read the row for the named day.", "Record every weather type shown that day.", "This log uses invented example data."], log, choices([
    ["Which pair of days had rain?", "Monday and Thursday", "Tuesday and Friday", "Wednesday and Friday"],
    ["Which pair of days had sunshine?", "Tuesday and Friday", "Monday and Thursday", "Wednesday and Thursday"],
    ["Which day recorded only clouds?", "Wednesday", "Monday", "Tuesday"],
    ["Which pair of days had wind?", "Tuesday and Thursday", "Monday and Friday", "Wednesday and Friday"],
    ["What was recorded on Monday?", "Rain and clouds", "Sunshine and wind", "Only sunshine"],
    ["What was recorded on Thursday?", "Rain and wind", "Only clouds", "Only sunshine"],
    ["Which day recorded only sunshine?", "Friday", "Tuesday", "Thursday"],
  ], log, ["example"])),
  lesson(["Each circle stands for one day in this pictogram.", "Tally marks count the same days.", "One day can appear in several weather rows."], counts, choices([
    ["How many days had rain?", "2", "1", "4"],
    ["How many days had sunshine?", "2", "3", "5"],
    ["How many days had cloud cover?", "2", "1", "5"],
    ["How many days had wind?", "2", "3", "4"],
    ["Which comparison matches rain and sunshine counts?", "Both have 2 days", "Rain has more days", "Sunshine has more days"],
    ["What does one circle stand for?", "One day", "Two days", "One whole year"],
    ["Why can one day appear in several rows?", "Several weather types can happen together", "Each circle means five days", "Each row shows a different country"],
  ], counts, ["example"])),
  lesson(["Keep the same place, time and symbols each day.", "Describe what your record shows.", "A short weather log cannot describe a whole climate."], method, [
    ...choices([
      ["Which time plan makes daily records easier to compare?", "Observe at the same time each day", "Change times without recording them", "Record only when it rains"],
      ["What should you record when sunshine and rain occur?", "Both weather types", "Sunshine only", "Rain only"],
      ["Which key makes your log clear?", "Keep the same symbol meanings", "Change symbols daily without a key", "Leave every symbol unexplained"],
      ["What can a five-day log describe?", "Weather during those five days", "Every future day's weather", "The whole country's climate"],
      ["Which is a typical UK seasonal pattern?", "Winters are usually cooler than summers", "Every winter day has snow", "No summer day has rain"],
      ["When should you count the recorded rainy days?", "After checking the completed log", "Before observing any days", "By guessing without a log"],
    ], method, ["y2Weather", "example"]),
    ordered("Order these steps for keeping a clear log.", ["Observe safely", "Record day and weather", "Count recorded days", "Describe the record"], method, ["example"], "Observe before recording. Describe after counting."),
  ]),
], WEATHER_ACTIVITY);
