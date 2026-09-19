/**
 * Pure question data for Year 3 Measurement.
 *
 * Statutory boundaries (docs/curriculum/year-3-maths.md): mm/cm/m, g/kg,
 * ml/l, mixed units, perimeter, money and change using £ and p, analogue time
 * to the minute, Roman numerals I-XII, 12/24-hour clocks, time facts and
 * durations. Every builder returns six rounds and accepts an injected rng.
 */

import { shuffleValues } from "./placeValue3Digit.js";
import { compareMeasures, formatMoney, timeToWords } from "./measurement.js";

const ROUNDS = 6;

function assertLevel(level, name) {
  if (!Number.isInteger(level) || level < 1 || level > 4) {
    throw new RangeError(`Unknown ${name} level: ${level}`);
  }
}

function six(items, rng) {
  if (items.length < ROUNDS) throw new RangeError("A challenge needs six rounds");
  return shuffleValues(items, rng).slice(0, ROUNDS).map((item) => structuredClone(item));
}

function numericOptions(answer, step, rng, min = 0) {
  const candidates = [answer, answer - step, answer + step, answer + step * 2]
    .filter((value) => value >= min);
  return shuffleValues([...new Set(candidates)], rng).slice(0, 4);
}

function moneyOptions(answer, rng) {
  return numericOptions(answer, answer < 100 ? 10 : 25, rng)
    .map(formatMoney);
}

export function mixedToBase(major, minor, factor) {
  return major * factor + minor;
}

export function formatMixed(major, minor, majorUnit, minorUnit) {
  const parts = [];
  if (major) parts.push(`${major} ${majorUnit}`);
  if (minor || parts.length === 0) parts.push(`${minor} ${minorUnit}`);
  return parts.join(" ");
}

export function formatDigital12(hour, minute) {
  return `${hour}:${String(minute).padStart(2, "0")}`;
}

export function formatDigital24(hour, minute) {
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

export function to24Hour(hour, minute, period) {
  const hour24 = period === "am" ? hour % 12 : (hour % 12) + 12;
  return formatDigital24(hour24, minute);
}

export function elapsedMinutes(startHour, startMinute, endHour, endMinute) {
  return endHour * 60 + endMinute - (startHour * 60 + startMinute);
}

export const ROMAN_HOURS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

const LENGTH_READS = [
  [34, "pencil"], [47, "leaf"], [62, "ribbon"], [79, "stick"], [85, "card"], [96, "shoelace"],
];
const LENGTH_COMPARE = [
  ["1 m 20 cm", 120, "115 cm", 115], ["85 cm", 85, "1 m", 100],
  ["2 m", 200, "190 cm", 190], ["1 m 5 cm", 105, "105 cm", 105],
  ["750 mm", 750, "80 cm", 800], ["60 cm", 600, "600 mm", 600],
];
const LENGTH_BUILDS = [[1, 25], [2, 40], [0, 85], [1, 60], [2, 5], [0, 45]];
const LENGTH_STORIES = [
  ["A ribbon is 1 m 20 cm long. Another ribbon is 35 cm. How many centimetres long are they altogether?", 155],
  ["A rope is 2 m long. 45 cm is cut off. How many centimetres remain?", 155],
  ["A caterpillar is 38 mm long and grows 17 mm. How many millimetres long is it now?", 55],
  ["A shelf is 1 m 80 cm long. A book takes 25 cm. How many centimetres are left?", 155],
  ["A path is 3 m long. How many centimetres is that?", 300],
  ["A strip is 900 mm long. How many centimetres is that?", 90],
];

export function buildLengthQuestions(level, rng) {
  assertLevel(level, "length");
  if (level === 1) return six(LENGTH_READS, rng).map(([answer, thing]) => ({
    type: "read-scale", thing, answer, unit: "mm", min: 0, max: 100,
    majorStep: 10, minorStep: 1, options: numericOptions(answer, 1, rng),
  }));
  if (level === 2) return six(LENGTH_COMPARE, rng).map(([leftLabel, left, rightLabel, right]) => ({
    type: "compare-measures", leftLabel, left, rightLabel, right, answer: compareMeasures(left, right),
  }));
  if (level === 3) return six(LENGTH_BUILDS, rng).map(([major, minor]) => ({
    type: "mixed-build", major, minor, majorUnit: "m", minorUnit: "cm", factor: 100,
    maxMajor: 3, minorStep: 5, answer: mixedToBase(major, minor, 100),
  }));
  return six(LENGTH_STORIES, rng).map(([prompt, answer]) => ({ type: "measure-story", prompt, answer }));
}

const MASS_READS = [[250, "flour"], [450, "rice"], [650, "apples"], [750, "potatoes"], [850, "sand"], [950, "sugar"]];
const MASS_COMPARE = [
  ["1 kg 200 g", 1200, "1150 g", 1150], ["850 g", 850, "1 kg", 1000],
  ["2 kg", 2000, "1900 g", 1900], ["1 kg 50 g", 1050, "1050 g", 1050],
  ["750 g", 750, "1 kg 20 g", 1020], ["2 kg 300 g", 2300, "2300 g", 2300],
];
const MASS_BUILDS = [[1, 200], [2, 400], [0, 800], [1, 600], [2, 100], [0, 500]];
const MASS_STORIES = [
  ["A bag weighs 1 kg 200 g. Another bag weighs 350 g. What is their total mass in grams?", 1550],
  ["A parcel weighs 2 kg. 450 g is removed. What mass remains in grams?", 1550],
  ["A melon weighs 850 g and a pear weighs 175 g. What is their total mass in grams?", 1025],
  ["A sack is 3 kg. How many grams is that?", 3000],
  ["A recipe needs 1 kg of flour. You have used 625 g. How many grams remain?", 375],
  ["Four packets weigh 250 g each. What is their total mass in grams?", 1000],
];

export function buildMassQuestions(level, rng) {
  assertLevel(level, "mass");
  if (level === 1) return six(MASS_READS, rng).map(([answer, thing]) => ({
    type: "read-scale", thing, answer, unit: "g", min: 0, max: 1000,
    majorStep: 100, minorStep: 50, options: numericOptions(answer, 50, rng),
  }));
  if (level === 2) return six(MASS_COMPARE, rng).map(([leftLabel, left, rightLabel, right]) => ({
    type: "compare-measures", leftLabel, left, rightLabel, right, answer: compareMeasures(left, right),
  }));
  if (level === 3) return six(MASS_BUILDS, rng).map(([major, minor]) => ({
    type: "mixed-build", major, minor, majorUnit: "kg", minorUnit: "g", factor: 1000,
    maxMajor: 3, minorStep: 100, answer: mixedToBase(major, minor, 1000),
  }));
  return six(MASS_STORIES, rng).map(([prompt, answer]) => ({ type: "measure-story", prompt, answer }));
}

const VOLUME_READS = [[150, "juice"], [300, "water"], [450, "milk"], [650, "squash"], [800, "soup"], [950, "rainwater"]];
const VOLUME_COMPARE = [
  ["1 l 200 ml", 1200, "1150 ml", 1150], ["850 ml", 850, "1 l", 1000],
  ["2 l", 2000, "1900 ml", 1900], ["1 l 50 ml", 1050, "1050 ml", 1050],
  ["750 ml", 750, "1 l 20 ml", 1020], ["2 l 300 ml", 2300, "2300 ml", 2300],
];
const VOLUME_BUILDS = [[1, 200], [2, 400], [0, 800], [1, 600], [2, 100], [0, 500]];
const VOLUME_STORIES = [
  ["A jug holds 1 l 200 ml. You add 350 ml. How many millilitres are in the jug?", 1550],
  ["A bottle holds 2 l. You pour out 450 ml. How many millilitres remain?", 1550],
  ["A pan has 850 ml of soup. Another 175 ml is added. How many millilitres is that?", 1025],
  ["A container holds 3 l. How many millilitres is that?", 3000],
  ["A tank holds 1 l. It contains 625 ml. How many millilitres more will fill it?", 375],
  ["Four cups hold 250 ml each. How many millilitres do they hold altogether?", 1000],
];

export function buildVolumeQuestions(level, rng) {
  assertLevel(level, "volume");
  if (level === 1) return six(VOLUME_READS, rng).map(([answer, thing]) => ({
    type: "read-jug", thing, answer, unit: "ml", min: 0, max: 1000,
    majorStep: 100, minorStep: 50, options: numericOptions(answer, 50, rng),
  }));
  if (level === 2) return six(VOLUME_COMPARE, rng).map(([leftLabel, left, rightLabel, right]) => ({
    type: "compare-measures", leftLabel, left, rightLabel, right, answer: compareMeasures(left, right),
  }));
  if (level === 3) return six(VOLUME_BUILDS, rng).map(([major, minor]) => ({
    type: "mixed-build", major, minor, majorUnit: "l", minorUnit: "ml", factor: 1000,
    maxMajor: 3, minorStep: 100, answer: mixedToBase(major, minor, 1000),
  }));
  return six(VOLUME_STORIES, rng).map(([prompt, answer]) => ({ type: "measure-story", prompt, answer }));
}

const MEASURE_CALCULATIONS = [
  ["35 cm + 24 cm", 59, "cm"], ["86 cm − 32 cm", 54, "cm"],
  ["450 g + 300 g", 750, "g"], ["900 g − 250 g", 650, "g"],
  ["650 ml + 200 ml", 850, "ml"], ["1,000 ml − 350 ml", 650, "ml"],
];
const MIXED_CALCULATIONS = [
  ["1 m 20 cm + 45 cm", 165, "cm"], ["2 m − 75 cm", 125, "cm"],
  ["1 kg 300 g + 450 g", 1750, "g"], ["2 kg − 650 g", 1350, "g"],
  ["1 l 250 ml + 500 ml", 1750, "ml"], ["2 l − 750 ml", 1250, "ml"],
];
const MIXED_RESULTS = [
  ["1 m + 35 cm", 1, 35, "m", "cm", 100, 5],
  ["2 m − 60 cm", 1, 40, "m", "cm", 100, 5],
  ["1 kg + 400 g", 1, 400, "kg", "g", 1000, 100],
  ["2 kg − 700 g", 1, 300, "kg", "g", 1000, 100],
  ["1 l + 600 ml", 1, 600, "l", "ml", 1000, 100],
  ["2 l − 800 ml", 1, 200, "l", "ml", 1000, 100],
];
const MEASURE_STORIES = [
  ["A 2 m ribbon has 85 cm cut off. How many centimetres remain?", 115],
  ["A 1 kg bag has 375 g added. What is the new mass in grams?", 1375],
  ["A 2 l jug has 650 ml poured out. How many millilitres remain?", 1350],
  ["A plank is 1 m 40 cm. Another is 75 cm. What is their total length in centimetres?", 215],
  ["A parcel is 2 kg 100 g. A 450 g book is removed. What mass remains in grams?", 1650],
  ["A tank has 1 l 250 ml, then 375 ml is added. How many millilitres is that?", 1625],
];

export function buildMeasurementArithmeticQuestions(level, rng) {
  assertLevel(level, "measurement arithmetic");
  if (level === 1) return six(MEASURE_CALCULATIONS, rng).map(([calculation, answer, unit]) => ({
    type: "measure-calculation", calculation, answer, unit,
    options: numericOptions(answer, unit === "cm" ? 5 : 50, rng).map((value) => `${value} ${unit}`),
  }));
  if (level === 2) return six(MIXED_CALCULATIONS, rng).map(([calculation, answer, unit]) => ({
    type: "mixed-calculation", calculation, answer, unit,
  }));
  if (level === 3) return six(MIXED_RESULTS, rng).map(([calculation, major, minor, majorUnit, minorUnit, factor, minorStep]) => ({
    type: "mixed-result", calculation, major, minor, majorUnit, minorUnit, factor,
    maxMajor: 3, minorStep, answer: mixedToBase(major, minor, factor),
  }));
  return six(MEASURE_STORIES, rng).map(([prompt, answer]) => ({ type: "measure-story", prompt, answer }));
}

const PERIMETERS = [
  ["rectangle", [6, 4, 6, 4]], ["square", [5, 5, 5, 5]],
  ["rectangle", [8, 3, 8, 3]], ["square", [7, 7, 7, 7]],
  ["rectangle", [9, 5, 9, 5]], ["rectangle", [12, 4, 12, 4]],
];
const MISSING_PERIMETERS = [
  [20, [6, 4, 6], 4], [28, [7, 7, 7], 7], [26, [8, 5, 8], 5],
  [36, [11, 7, 11], 7], [24, [6, 6, 6], 6], [30, [9, 6, 9], 6],
];
const PERIMETER_STORIES = [
  ["A rectangular garden is 8 m long and 5 m wide. What is its perimeter in metres?", 26],
  ["A square tile has sides of 7 cm. What is its perimeter in centimetres?", 28],
  ["A picture frame is 12 cm by 9 cm. What is its perimeter in centimetres?", 42],
  ["A square playground has sides of 15 m. What is its perimeter in metres?", 60],
  ["A rectangle is 14 cm long and 6 cm wide. What is its perimeter in centimetres?", 40],
  ["A card is 10 cm by 4 cm. What is its perimeter in centimetres?", 28],
];

function perimeterQuestion([shape, lengths], type, rng) {
  const answer = lengths.reduce((sum, value) => sum + value, 0);
  const question = {
    type, shape, sides: lengths.map((length) => ({ length, unit: "cm" })), answer,
  };
  if (type === "perimeter-read") {
    question.options = numericOptions(answer, 2, rng).map((value) => `${value} cm`);
  }
  return question;
}

export function buildPerimeterQuestions(level, rng) {
  assertLevel(level, "perimeter");
  if (level === 1) return six(PERIMETERS, rng).map((item) => perimeterQuestion(item, "perimeter-read", rng));
  if (level === 2) return six(MISSING_PERIMETERS, rng).map(([perimeter, known, answer]) => ({
    type: "perimeter-missing", perimeter, answer, shape: known.every((value) => value === known[0]) ? "square" : "rectangle",
    sides: [...known.map((length) => ({ length, unit: "cm" })), { length: "?", unit: "cm" }],
  }));
  if (level === 3) return six(PERIMETERS, rng).map((item) => perimeterQuestion(item, "perimeter-trace", rng));
  return six(PERIMETER_STORIES, rng).map(([prompt, answer]) => ({ type: "measure-story", prompt, answer }));
}

const MONEY_ADDS = [
  [125, 75], [240, 135], [99, 125], [350, 145], [175, 225], [420, 80],
];
const MONEY_CHANGE = [[500, 275], [1000, 645], [500, 199], [200, 135], [1000, 725], [500, 360]];
const MONEY_COIN_CHANGE = [[500, 365], [200, 125], [500, 420], [200, 145], [500, 275], [1000, 850]];
const MONEY_STORIES = [
  ["A book costs £2.35 and a pen costs £1.40. You pay £5. How much change do you get, in pence?", 125],
  ["Three cards cost 75p each. You pay £5. How much change do you get, in pence?", 275],
  ["You have £10. You spend £3.45 and £2.30. How many pence remain?", 425],
  ["Two toys cost £2.25 each. You pay £5. How much change do you get, in pence?", 50],
  ["A game costs £4.75. Its price is reduced by £1.20. What is the new price in pence?", 355],
  ["A snack costs £1.35 and a drink costs 85p. What is the total cost in pence?", 220],
];

export function buildMoneyQuestions(level, rng) {
  assertLevel(level, "money");
  if (level === 1) return six(MONEY_ADDS, rng).map(([first, second]) => {
    const answer = first + second;
    return { type: "money-add", first, second, answer, answerLabel: formatMoney(answer), options: moneyOptions(answer, rng) };
  });
  if (level === 2) return six(MONEY_CHANGE, rng).map(([paid, cost]) => ({
    type: "money-change", paid, cost, answer: paid - cost,
  }));
  if (level === 3) return six(MONEY_COIN_CHANGE, rng).map(([paid, cost]) => ({
    type: "money-coins", paid, cost, answer: paid - cost,
  }));
  return six(MONEY_STORIES, rng).map(([prompt, answer]) => ({ type: "money-story", prompt, answer }));
}

const MINUTE_TIMES = [[1, 7], [2, 13], [4, 28], [6, 34], [8, 49], [11, 56]];
const TIME_STORIES = [
  ["A lesson starts at 9:18 and ends at 9:52. How many minutes long is it?", 34],
  ["A bus leaves at 10:27 and arrives at 11:05. How many minutes is the journey?", 38],
  ["A game starts at 2:46 and lasts 29 minutes. How many minutes past 3 does it finish?", 15],
  ["It is 4:38. How many minutes are there until 5 o’clock?", 22],
  ["Reading starts at 6:12 and ends at 6:47. How many minutes is that?", 35],
  ["A show starts at 7:35 and ends at 8:20. How many minutes long is it?", 45],
];

export function buildTimeToMinuteQuestions(level, rng) {
  assertLevel(level, "time to the minute");
  const times = six(MINUTE_TIMES, rng);
  if (level === 1) return times.map(([hour, minute]) => {
    const answer = formatDigital12(hour, minute);
    const options = shuffleValues([
      answer, formatDigital12(hour, (minute + 5) % 60),
      formatDigital12(hour, (minute + 10) % 60), formatDigital12(hour, 60 - minute),
    ], rng);
    return { type: "read-clock-minute", hour, minute, answer, options: [...new Set(options)] };
  });
  if (level === 2) return times.map(([hour, minute]) => {
    const answer = timeToWords(hour, minute);
    const options = shuffleValues([
      answer, timeToWords(hour, Math.max(1, minute - 1)),
      timeToWords(hour, Math.min(59, minute + 1)),
    ], rng);
    return { type: "clock-words", hour, minute, answer, options: [...new Set(options)] };
  });
  if (level === 3) return times.map(([hour, minute]) => ({
    type: "set-clock-minute", hour, minute, answer: hour * 60 + minute,
  }));
  return six(TIME_STORIES, rng).map(([prompt, answer]) => ({ type: "time-story", prompt, answer }));
}

const ROMAN_TIMES = [[1, 5], [3, 20], [5, 35], [7, 45], [9, 10], [11, 50]];
const TO_24 = [[7, 15, "am"], [7, 15, "pm"], [12, 5, "am"], [12, 5, "pm"], [4, 40, "pm"], [9, 25, "am"]];
const FROM_24 = [[0, 20, "12:20 am"], [12, 30, "12:30 pm"], [14, 5, "2:05 pm"], [18, 45, "6:45 pm"], [21, 10, "9:10 pm"], [7, 35, "7:35 am"]];
const SET_24 = [[13, 8], [15, 22], [18, 37], [20, 49], [9, 14], [11, 56]];

export function buildRoman24Questions(level, rng) {
  assertLevel(level, "Roman and 24-hour clocks");
  if (level === 1) return six(ROMAN_TIMES, rng).map(([hour, minute]) => {
    const answer = formatDigital12(hour, minute);
    return {
      type: "roman-clock-read", hour, minute, answer,
      options: shuffleValues([answer, formatDigital12(hour, (minute + 5) % 60), formatDigital12((hour % 12) + 1, minute)], rng),
    };
  });
  if (level === 2) return six(TO_24, rng).map(([hour, minute, period]) => {
    const answer = to24Hour(hour, minute, period);
    const wrongPeriod = to24Hour(hour, minute, period === "am" ? "pm" : "am");
    return {
      type: "to-24-hour", hour, minute, period, answer,
      options: shuffleValues([answer, wrongPeriod, formatDigital24(Number(answer.slice(0, 2)), (minute + 5) % 60)], rng),
    };
  });
  if (level === 3) return six(FROM_24, rng).map(([hour, minute, answer]) => ({
    type: "from-24-hour", hour, minute, answer,
    options: shuffleValues([answer, `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${hour < 12 ? "pm" : "am"}`, `${(hour + 1) % 12 || 12}:${String(minute).padStart(2, "0")} ${hour < 12 ? "am" : "pm"}`], rng),
  }));
  return six(SET_24, rng).map(([hour24, minute]) => ({
    type: "set-roman-clock", hour24, hour: hour24 % 12 || 12, minute, answer: hour24 * 60 + minute,
  }));
}

const TIME_FACTS = [
  ["How many seconds are in 1 minute?", 60], ["How many days are in April?", 30],
  ["How many days are in May?", 31], ["How many days are in a normal year?", 365],
  ["How many days are in a leap year?", 366], ["How many days does February have in a normal year?", 28],
];
const DURATION_COMPARE = [
  ["90 seconds", 90, "2 minutes", 120], ["1 hour", 60, "55 minutes", 55],
  ["2 minutes", 120, "120 seconds", 120], ["75 minutes", 75, "1 hour", 60],
  ["3 hours", 180, "200 minutes", 200], ["150 seconds", 150, "2 minutes", 120],
];
const DURATION_ORDER = [
  [["45 seconds", 45], ["1 minute", 60], ["90 seconds", 90]],
  [["2 minutes", 120], ["150 seconds", 150], ["3 minutes", 180]],
  [["30 minutes", 30], ["1 hour", 60], ["75 minutes", 75]],
  [["50 minutes", 50], ["1 hour 10 minutes", 70], ["90 minutes", 90]],
  [["1 hour", 60], ["80 minutes", 80], ["2 hours", 120]],
  [["40 seconds", 40], ["55 seconds", 55], ["1 minute", 60]],
];
const TIMELINES = [[9, 10, 9, 42], [10, 35, 11, 20], [13, 5, 13, 48], [14, 27, 15, 3], [16, 12, 16, 55], [18, 40, 19, 15]];

export function buildDurationQuestions(level, rng) {
  assertLevel(level, "time units and durations");
  if (level === 1) return six(TIME_FACTS, rng).map(([prompt, answer]) => ({
    type: "time-fact", prompt, answer, options: numericOptions(answer, answer > 300 ? 1 : 1, rng),
  }));
  if (level === 2) return six(DURATION_COMPARE, rng).map(([leftLabel, left, rightLabel, right]) => ({
    type: "compare-durations", leftLabel, left, rightLabel, right, answer: compareMeasures(left, right),
  }));
  if (level === 3) return six(DURATION_ORDER, rng).map((items, round) => {
    const sorted = [...items].sort((a, b) => a[1] - b[1]);
    return {
      type: "order-durations",
      items: shuffleValues(items.map(([label, value], index) => ({ id: `${round}-${index}`, label, value })), rng),
      ordered: sorted.map(([label]) => label),
      answer: sorted.map(([label]) => label).join("|"),
    };
  });
  return six(TIMELINES, rng).map(([startHour, startMinute, endHour, endMinute]) => ({
    type: "duration-timeline", startHour, startMinute, endHour, endMinute,
    answer: elapsedMinutes(startHour, startMinute, endHour, endMinute),
  }));
}
