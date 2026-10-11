import { buildTopic, c, sorter, spell, typed } from "./engine.js";
import { shuffle } from "../year1Math/shared.js";

// Year 1 Seasonal changes (docs/curriculum/year-1-science.md), set in the UK.
// Weather is described as "most likely" in a season, never "only", because
// rain, wind and cloud happen all year. Day lengths are rounded daylight
// hours for London: about 8 in December, 12 in March and September, 16 in June.

/* ---------- The Four Seasons ---------- */

const SEASON_RULE = "The four seasons are spring, summer, autumn and winter. Then spring comes again.";
const SEASONS = ["spring", "summer", "autumn", "winter"];
const season = (prompt, answer, extra = {}) => c(prompt, answer, SEASONS.filter((s) => s !== answer), extra);

const seasonLearn = [
  season("Which season comes after spring?", "summer", { rule: SEASON_RULE }),
  season("Which season comes after summer?", "autumn", { rule: SEASON_RULE }),
  season("Which season comes after autumn?", "winter", { rule: SEASON_RULE }),
  season("Which season comes after winter?", "spring", { rule: SEASON_RULE }),
  season("Which season comes before summer?", "spring", { rule: SEASON_RULE }),
  season("In the UK, which season is usually the warmest?", "summer", { hint: "Think of the beach and ice lollies." }),
  season("In the UK, which season is usually the coldest?", "winter", { hint: "Think of frost and snow." }),
  season("In which season do many trees lose their leaves?", "autumn", { hint: "Think of crunchy brown leaves." }),
  season("In which season do new leaves and blossom appear on trees?", "spring", { hint: "Think of buds opening." }),
];

const scene = (picture, pictureLabel, answer) => season("Which season does the picture show?", answer, { picture, pictureLabel });
const seasonPictures = [
  scene("🍂 🍁", "brown and orange leaves falling from trees", "autumn"),
  scene("⛄ ❄️", "a snowman and snowflakes", "winter"),
  scene("🐣 🌷", "a chick hatching and tulips opening", "spring"),
  scene("🏖️ ☀️", "a hot, sunny beach", "summer"),
  scene("🌸 🐑", "blossom on a tree and a young lamb", "spring"),
  scene("🌰 🍂", "conkers and fallen leaves on the ground", "autumn"),
];

const seasonSorts = [
  sorter("Sort the signs: spring or autumn?", [["spring", "Spring"], ["autumn", "Autumn"]], [
    ["buds opening", "spring"], ["lambs being born", "spring"], ["blossom on trees", "spring"], ["daffodils flowering", "spring"],
    ["leaves falling", "autumn"], ["conkers dropping", "autumn"], ["leaves turning brown", "autumn"],
  ]),
  sorter("Sort the signs: summer or winter?", [["summer", "Summer"], ["winter", "Winter"]], [
    ["hot, sunny days", "summer"], ["light evenings", "summer"], ["paddling in the sea", "summer"],
    ["frost on the grass", "winter"], ["bare trees", "winter"], ["snow", "winter"], ["dark evenings", "winter"],
  ]),
];

const seasonOrder = SEASONS.map((start, i) => ({
  type: "order",
  prompt: `Put the seasons in order. Start with ${start}.`,
  labels: [...SEASONS.slice(i), ...SEASONS.slice(0, i)],
  hint: "After winter, spring comes again.",
}));

const seasonSpell = [
  spell("spring", "🐣", "a chick hatching", "Lambs and chicks are born in this season. Make its name."),
  spell("summer", "☀️", "a bright sun", "This is the warmest season. Make its name."),
  spell("autumn", "🍂", "falling leaves", "Leaves fall from many trees in this season. Make its name."),
  spell("winter", "⛄", "a snowman", "This is the coldest season. Make its name."),
];

const seasonApply = [
  season("Bix collects conkers that have fallen from the tree. Which season is it?", "autumn"),
  season("Bix sees lambs in the field and blossom on the trees. Which season is it?", "spring"),
  season("Bix builds a snowman. Which season is it most likely to be?", "winter"),
  season("Bix eats an ice lolly in the hot sunshine. Which season is it most likely to be?", "summer"),
  season("It is autumn now. Which season will come next?", "winter"),
  season("Bix's birthday is in summer. Which season comes just before summer?", "spring"),
  season("Bix sees frost on the grass and the trees are bare. Which season is it?", "winter"),
];

const seasonTyped = [
  typed("Leaves fall from many trees in this season. Type its name.", "autumn"),
  typed("This is the coldest season. Type its name.", "winter"),
  typed("This is the warmest season. Type its name.", "summer"),
];

/* ---------- Weather and the Seasons ---------- */

const WEATHER = ["sunny", "rainy", "snowy", "cloudy", "windy", "foggy", "stormy"];
// A picture can show more than one kind of weather (a storm is rainy and cloudy too),
// so each leaves out the words that would also be true of it.
const ALSO_TRUE = { stormy: ["rainy", "cloudy", "windy"], rainy: ["cloudy", "stormy"], snowy: ["cloudy"], cloudy: ["foggy", "stormy"], foggy: ["cloudy"], windy: ["stormy"], sunny: [] };
const weather = (picture, pictureLabel, answer) => c("What is the weather like in the picture?", answer, WEATHER.filter((w) => w !== answer && !ALSO_TRUE[answer].includes(w)), { picture, pictureLabel });
const weatherLearn = [
  weather("☀️", "the sun shining in a clear sky", "sunny"),
  weather("🌧️", "a grey cloud with drops falling", "rainy"),
  weather("🌨️", "a cloud with snowflakes falling", "snowy"),
  weather("☁️", "a sky full of grey cloud", "cloudy"),
  weather("🌬️", "air blowing hard", "windy"),
  weather("🌫️", "thick mist that is hard to see through", "foggy"),
  weather("⛈️", "a dark cloud with lightning", "stormy"),
];

const weatherSeasons = [
  season("In the UK, snow is most likely in which season?", "winter"),
  season("In the UK, hot sunny days are most likely in which season?", "summer"),
  season("Frost on the grass in the morning is most likely in which season?", "winter"),
  season("Which season often has windy days and falling leaves?", "autumn"),
  c("Can it rain in every season in the UK?", "Yes, it can rain in any season.", ["No, it only rains in winter."]),
  c("Which weather is more likely in winter?", "snowy", ["hot and sunny"]),
  c("Which weather is more likely in summer?", "warm and sunny", ["snowy", "frosty"]),
];

const weatherSorts = [
  sorter("Is it more likely in summer or in winter?", [["summer", "Summer"], ["winter", "Winter"]], [
    ["hot, sunny days", "summer"], ["warm evenings", "summer"], ["a heatwave", "summer"],
    ["snow", "winter"], ["frost", "winter"], ["icy puddles", "winter"], ["freezing fog", "winter"],
  ]),
];

// Two weeks of Bix's weather records. Values are distinct, so "most" and
// "fewest" each have one answer; each set adds up to 14 days.
const WEEKS = [
  { when: "two weeks in January", rows: [["rainy", 6], ["cloudy", 4], ["snowy", 3], ["sunny", 1]] },
  { when: "two weeks in July", rows: [["sunny", 7], ["cloudy", 4], ["rainy", 2], ["windy", 1]] },
  { when: "two weeks in October", rows: [["windy", 5], ["rainy", 4], ["cloudy", 3], ["sunny", 2]] },
  { when: "two weeks in April", rows: [["sunny", 6], ["rainy", 5], ["cloudy", 2], ["windy", 1]] },
];
const weatherChart = (rng) => {
  const week = WEEKS[Math.floor(rng() * WEEKS.length)];
  const rows = shuffle(rng, week.rows.map(([label, value]) => ({ label, value })));
  const chart = { type: "pictogram", rows, ratio: 1, symbol: "●" };
  const style = Math.floor(rng() * 3);
  if (style === 0) {
    return { type: "chart", prompt: `Bix's weather chart for ${week.when}. Which weather happened most?`, chart, ask: { op: "most" }, answer: [...rows].sort((a, b) => b.value - a.value)[0].label, options: rows.map((r) => r.label), hint: "Find the longest row." };
  }
  if (style === 1) {
    return { type: "chart", prompt: `Bix's weather chart for ${week.when}. Which weather happened least?`, chart, ask: { op: "least" }, answer: [...rows].sort((a, b) => a.value - b.value)[0].label, options: rows.map((r) => r.label), hint: "Find the shortest row." };
  }
  const row = rows[Math.floor(rng() * rows.length)];
  return { type: "chart", prompt: `Bix's weather chart for ${week.when}. How many days were ${row.label}?`, chart, ask: { op: "value", label: row.label }, answer: row.value, hint: "Count the dots in that row." };
};
const weatherCharts = [weatherChart, weatherChart, weatherChart];

const weatherSpell = [
  spell("rain", "🌧️", "a grey cloud with drops falling", "What is falling from the cloud? Make the word."),
  spell("snow", "🌨️", "a cloud with snowflakes falling", "What is falling from the cloud? Make the word."),
  spell("sunny", "☀️", "the sun shining in a clear sky", "What is the weather like? Make the word."),
  spell("windy", "🌬️", "air blowing hard", "What is the weather like? Make the word."),
  spell("foggy", "🌫️", "thick mist", "What is the weather like? Make the word."),
];

const weatherClothes = [
  c("It is snowy and cold. What should Bix wear outside?", "a warm coat, hat and gloves", ["shorts and a T-shirt", "a swimming costume"]),
  c("It is hot and sunny. What should Bix wear outside?", "a sun hat and sun cream", ["a woolly hat and gloves", "a thick winter coat"]),
  c("It is raining. What should Bix take outside?", "an umbrella", ["sunglasses", "sun cream"]),
  c("It is very sunny. Is it safe to look straight at the Sun?", "No. Never look at the Sun, even with sunglasses.", ["Yes, if you wear sunglasses.", "Yes, for a short time."]),
  c("It is a windy day. What would be fun to fly?", "a kite", ["a sledge", "a paddling pool"]),
  c("It is frosty, and there is ice on the path. What should Bix do?", "walk carefully", ["run fast", "slide down the path"]),
];

const weatherTyped = [
  typed("Frozen water that falls from clouds in winter is called ___. Type the word.", "snow"),
  typed("Water that falls from clouds is called ___. Type the word.", "rain"),
  typed("When the sun shines all day, the weather is ___. Type the word.", "sunny"),
];

/* ---------- Day Length Through the Year ---------- */

const DAYS = [
  { label: "A day in December", season: "winter", light: 8 },
  { label: "A day in March", season: "spring", light: 12 },
  { label: "A day in June", season: "summer", light: 16 },
  { label: "A day in September", season: "autumn", light: 12 },
];
const DAY_NOTE = "Each box is one hour. Sun boxes are daylight.";

const pair = (rng) => {
  const longFirst = rng() < 0.5;
  const ask = rng() < 0.5 ? "longer" : "shorter";
  const rows = longFirst ? [{ label: "Day A", light: 16 }, { label: "Day B", light: 8 }] : [{ label: "Day A", light: 8 }, { label: "Day B", light: 16 }];
  const longer = longFirst ? "Day A" : "Day B";
  const shorter = longFirst ? "Day B" : "Day A";
  return c(`Which day has ${ask === "longer" ? "more" : "fewer"} hours of daylight?`, ask === "longer" ? longer : shorter, [ask === "longer" ? shorter : longer], {
    visual: { type: "days", rows }, rule: DAY_NOTE, hint: "Count the sun boxes in each row.",
  });
};

const dayFacts = [
  season("In the UK, which season has the longest days?", "summer"),
  season("In the UK, which season has the shortest days?", "winter"),
  c("In winter, when does it get dark?", "early, before tea time", ["late, after bedtime"]),
  c("In the UK summer, it is often still light at bedtime. Why?", "Summer days are long.", ["Summer days are short.", "The Moon is very bright."]),
  c("Do days stay the same length all year?", "No, they change with the seasons.", ["Yes, every day is the same."]),
  c("As winter turns into spring, the days get ___.", "longer", ["shorter"]),
  c("As summer turns into autumn, the days get ___.", "shorter", ["longer"]),
];

const count = (day) => ({
  type: "number", prompt: `${day.label}. Count the sun boxes. How many hours of daylight are there?`, answer: day.light,
  visual: { type: "days", rows: [{ label: day.label, light: day.light }] }, rule: DAY_NOTE, hint: "Touch each sun box once as you count.",
});
const dayCounts = DAYS.map(count);

const daySorts = [
  sorter("Sort the months: long days or short days?", [["long", "Long days"], ["short", "Short days"]], [
    ["May", "long"], ["June", "long"], ["July", "long"],
    ["November", "short"], ["December", "short"], ["January", "short"],
  ], { hint: "Months near June have long days." }),
];

const dayOrder = [
  { type: "order", prompt: "Put the days in order from the shortest day to the longest.", labels: ["A day in December", "A day in March", "A day in June"], visual: { type: "days", rows: calendarRows() }, hint: "Count the sun boxes." },
  { type: "order", prompt: "Put the seasons in order from the longest days to the shortest.", labels: ["summer", "spring", "winter"], hint: "Summer days are longest." },
];
function calendarRows() {
  // March, December, June: not sorted by length, so the picture does not give the order away.
  return [DAYS[1], DAYS[0], DAYS[2]].map(({ label, light }) => ({ label, light }));
}

const daySpell = [
  spell("long", undefined, undefined, "In summer, the days are ___. Make the word."),
  spell("short", undefined, undefined, "In winter, the days are ___. Make the word."),
  spell("dark", "🌙", "the Moon in the night sky", "At night it is ___. Make the word."),
  spell("light", "☀️", "the sun in the sky", "In the day it is ___. Make the word."),
];

const dayApply = [
  season("Bix goes to bed at 9 o'clock and it is still light outside. Which season is it most likely to be?", "summer"),
  season("Bix walks home from school at 4 o'clock and it is already getting dark. Which season is it most likely to be?", "winter"),
  season("Bix's chart shows the longest days in June. Which season is June in?", "summer"),
  season("Bix wants to play outside in the light after tea. Which season is best?", "summer"),
  (rng) => {
    const winterFirst = rng() < 0.5;
    const rows = winterFirst ? [{ label: "Day A", light: 8 }, { label: "Day B", light: 16 }] : [{ label: "Day A", light: 16 }, { label: "Day B", light: 8 }];
    return c("Bix drew a summer day and a winter day. Which one is the winter day?", winterFirst ? "Day A" : "Day B", [winterFirst ? "Day B" : "Day A"], {
      visual: { type: "days", rows }, rule: DAY_NOTE, hint: "Winter days have fewer hours of daylight.",
    });
  },
];

const dayTyped = [
  typed("In winter the days are ___. Type the missing word.", "short"),
  typed("In summer the days are ___. Type the missing word.", "long"),
  typed("The season with the longest days is ___. Type the missing word.", "summer"),
];

export const seasonBuilders = {
  "the-four-seasons": buildTopic({
    banks: { learn: seasonLearn, pictures: seasonPictures, sorts: seasonSorts, order: seasonOrder, spell: seasonSpell, apply: seasonApply, typed: seasonTyped },
    levels: {
      1: ["learn", "learn", "learn", "learn", "learn"],
      2: ["pictures", "sorts", "pictures", "sorts", "pictures"],
      3: ["order", "spell", "order", "spell", "order"],
      4: ["apply", "typed", "apply", "apply", "typed"],
    },
  }),
  "weather-and-the-seasons": buildTopic({
    banks: { learn: weatherLearn, seasons: weatherSeasons, sorts: weatherSorts, charts: weatherCharts, spell: weatherSpell, clothes: weatherClothes, typed: weatherTyped },
    levels: {
      1: ["learn", "learn", "learn", "learn", "learn"],
      2: ["seasons", "sorts", "seasons", "charts", "seasons"],
      3: ["charts", "spell", "charts", "spell", "spell"],
      4: ["clothes", "charts", "clothes", "typed", "clothes"],
    },
  }),
  "day-length-through-the-year": buildTopic({
    banks: { pairs: [pair, pair, pair], facts: dayFacts, counts: dayCounts, sorts: daySorts, order: dayOrder, spell: daySpell, apply: dayApply, typed: dayTyped },
    levels: {
      1: ["pairs", "facts", "pairs", "facts", "pairs"],
      2: ["counts", "facts", "counts", "sorts", "facts"],
      3: ["order", "spell", "order", "spell", "counts"],
      4: ["apply", "typed", "apply", "apply", "typed"],
    },
  }),
};
