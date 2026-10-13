import { ask, cards, lesson, pic, topic } from "./authoring.js";

const S = ["y1Weather", "y1Rain", "y1Drawings"];
const WORD = { sunny: "sunny", cloudy: "cloudy", rainy: "rainy", windy: "windy", snowy: "snowy" };

const symbols = cards("Weather symbols", Object.keys(WORD).map((w) => [w, w[0].toUpperCase() + w.slice(1)]),
  "Five labelled weather pictures: sunny with a bright sun, cloudy with clouds, rainy with a cloud and raindrops, windy with swirling wind lines and leaves, snowy with snowflakes.",
  ["Weather is what the sky and air are like.", "Weather can change during a day."]);
const set = (n, names) => cards(`Weather pictures ${n}`, names.map((w, i) => [w, null, "ABC"[i]]), names.map((w, i) => `Picture ${"ABC"[i]} shows ${w} weather.`).join(" "), ["Look at each picture."]);
const W1 = set(1, ["sunny", "rainy", "snowy"]), W2 = set(2, ["windy", "cloudy", "sunny"]), W3 = set(3, ["snowy", "windy", "rainy"]);

// C2 — example records (not real observations).
const record = (n, days) => pic("weather", `Example weather record ${n}`, `An example weather record. ${days.map((d) => `${d.day}: ${d.w.join(" and ")}.`).join(" ")}`,
  ["This is example data, not today's weather."], { days, caption: `Example weather record ${n}` });
const R1 = record(1, [{ day: "Monday", w: ["sunny"] }, { day: "Tuesday", w: ["cloudy", "rainy"] }, { day: "Wednesday", w: ["windy"] }, { day: "Thursday", w: ["rainy"] }, { day: "Friday", w: ["snowy"] }]);
const R2 = record(2, [{ day: "Monday", w: ["cloudy"] }, { day: "Tuesday", w: ["sunny", "windy"] }, { day: "Wednesday", w: ["rainy"] }, { day: "Thursday", w: ["sunny"] }]);

// C3 — what can we see out of the window?
const windowView = (n, weather) => pic("outside", `Window ${n}`, `A view through a window. The weather is ${weather.join(" and ")}.`, ["Look at the sky and the tree."], { weather });
const WINDOWS = [
  [["cloudy", "rainy"], "Cloudy and rainy", "Sunny and dry", "Snowy and still"],
  [["sunny"], "Sunny and dry", "Rainy and grey", "Snowy"],
  [["snowy"], "Snowy", "Sunny and hot", "Rainy"],
  [["sunny", "windy"], "Sunny and windy", "Snowy and still", "Rainy and grey"],
  [["cloudy"], "Cloudy", "Sunny with no clouds", "Snowy"],
  [["rainy", "windy"], "Rainy and windy", "Sunny and still", "Snowy"],
  [["cloudy", "windy"], "Cloudy and windy", "Sunny and still", "Snowy and still"],
];

const plan = cards("Recording the weather", [["sunny", "Look"], ["cloudy", "Draw"], ["rainy", "Record the day"]],
  "Three labelled pictures for a weather record: look at the sky, draw the symbol, write the day.",
  ["An observation is what we see now.", "A forecast is a guess about later.", "Record the day and the weather."]);

export const WEATHER_ACTIVITY = {
  summary: "With a grown-up: keep a weather diary",
  question: "What is the weather like each day this week?",
  materials: "paper, pencil and a grown-up",
  steps: ["Look outside at the same time each day.", "Draw the weather symbols you see.", "Write the day next to your drawing.", "After five days, talk about what changed."],
  paper: "Day / weather symbols / one word about it.",
  present: "Show your diary. Which weather did you see most?",
  alternative: "Look through a window with a grown-up.",
};

export const dailyWeather = topic([
  lesson(["Weather can be sunny, cloudy or rainy.", "It can be windy or snowy too.", "Symbols are pictures for weather."], symbols, [
    ...ask([["Which picture shows sunny weather?", "A", "B", "C"], ["Which picture shows rainy weather?", "B", "A", "C"], ["Which picture shows snowy weather?", "C", "A", "B"]], W1, S, "Look for sun, rain or snowflakes."),
    ...ask([["Which picture shows windy weather?", "A", "B", "C"], ["Which picture shows cloudy weather?", "B", "A", "C"]], W2, S, "Look for wind lines or clouds."),
    ...ask([["Which picture shows snow falling?", "A", "B", "C"], ["Which picture shows the wind blowing?", "B", "A", "C"]], W3, S, "Look for wind lines or snowflakes."),
  ]),
  lesson(["A weather record shows each day.", "Some days have two kinds of weather.", "This record is example data."], R1, [
    ...ask([
      ["Record 1: what was Monday's weather?", "Sunny", "Snowy", "Rainy"],
      ["Record 1: what was Tuesday's weather?", "Cloudy and rainy", "Sunny", "Windy"],
      ["Record 1: which day was snowy?", "Friday", "Monday", "Wednesday"],
      ["Record 1: which day was windy?", "Wednesday", "Tuesday", "Friday"],
      ["Record 1: how many days had rain?", "2", "1", "4"],
    ], R1, S, "Find the day. Read its pictures."),
    ...ask([
      ["Record 2: what was Tuesday's weather?", "Sunny and windy", "Rainy", "Cloudy"],
      ["Record 2: which day was rainy?", "Wednesday", "Monday", "Thursday"],
    ], R2, S, "Find the day. Read its pictures."),
  ]),
  lesson(["Look out of the window.", "What do you see in the sky?", "Choose words that match."], windowView("view", ["cloudy", "rainy"]),
    WINDOWS.map(([w, answer, w1, w2], i) => ask([[`Window ${i + 1}: which words match the weather?`, answer, w1, w2]], windowView(i + 1, w), S, "Look at the sky, ground and tree.")[0])),
  lesson(["Observe means look carefully now.", "A forecast is a guess about later.", "Record the day and weather."], plan, ask([
    ["Which is an observation?", "It is raining now", "It will rain tomorrow", "Rain is my favourite"],
    ["Which is a forecast?", "Tomorrow may be sunny", "The sun is out now", "I can see clouds"],
    ["What should go in a weather record?", "The day and the weather", "Your home address", "Your favourite food"],
    ["Where is a safe place to look from?", "A window with a grown-up", "A busy road", "A rooftop"],
    ["Why write the day too?", "Weather changes from day to day", "Days never change", "It makes it rain"],
    ["It is cloudy and windy. What do you record?", "Cloudy and windy", "Only sunny", "Nothing at all"],
    ["How can you record rain quickly?", "Draw a rain symbol", "Write a long story", "Take a bath"],
  ], plan, S, "Think about what you can see right now.")),
], WEATHER_ACTIVITY);
