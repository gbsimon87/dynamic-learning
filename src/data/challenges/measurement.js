/**
 * Pure question data for the "Measurement" category.
 *
 * Statutory scope (docs/curriculum/year-2-maths.md): standard units for
 * length/height (m/cm), mass (kg/g), temperature (°C) and capacity
 * (litres/ml); comparing and ordering with >, < and =; £ and p, combining
 * amounts and finding different coin combinations; money problems within ONE
 * unit, including change; comparing and sequencing intervals of time; telling
 * the time TO FIVE MINUTES including quarter past and quarter to; and knowing
 * the minutes in an hour and hours in a day.
 *
 * Two boundaries are easy to drift past and are enforced here: time never goes
 * finer than five minutes, and money never mixes pounds with pence in one
 * calculation.
 */

/** UK coins in pence. */
export const COINS = [1, 2, 5, 10, 20, 50, 100, 200];

/**
 * Money as it is written and said.
 *
 * Under a pound it is "47p"; whole pounds are "£1"; anything else is "£1.05"
 * with two digits, because "£1.5" misreads as one pound fifty.
 */
export function formatMoney(pence) {
  if (pence < 100) return `${pence}p`;
  const pounds = Math.floor(pence / 100);
  const rest = pence % 100;
  if (rest === 0) return `£${pounds}`;
  return `£${pounds}.${String(rest).padStart(2, "0")}`;
}

export function totalOf(coins) {
  return coins.reduce((sum, coin) => sum + coin, 0);
}

/**
 * True when these coins make exactly the target.
 *
 * Deliberately not "the fewest coins": the statutory requirement is to find
 * DIFFERENT combinations that equal the same amount, so 20+20+10 and 50 are
 * both right for 50p.
 */
export function isValidCoinCombination(coins, target) {
  return coins.length > 0 && totalOf(coins) === target;
}

/** The labelled values of a scale, from `min` to `max` every `step`. */
export function tickValues(min, max, step) {
  const ticks = [];
  for (let v = min; v <= max; v += step) ticks.push(v);
  return ticks;
}

/** The symbol that makes `a ? b` true. */
export function compareMeasures(a, b) {
  if (a < b) return "<";
  if (a > b) return ">";
  return "=";
}

const NEXT_HOUR = (hour) => (hour === 12 ? 1 : hour + 1);

/**
 * The time as a child reads it aloud.
 *
 * Past the half hour the time is said "to" the NEXT hour, which is the part
 * that has to be taught rather than derived.
 */
export function timeToWords(hour, minute) {
  if (minute === 0) return `${hour} o'clock`;
  if (minute === 15) return `quarter past ${hour}`;
  if (minute === 30) return `half past ${hour}`;
  if (minute === 45) return `quarter to ${NEXT_HOUR(hour)}`;
  if (minute < 30) return `${minute} past ${hour}`;
  return `${60 - minute} to ${NEXT_HOUR(hour)}`;
}

/** How many minutes until the hour. On the hour, a whole hour remains. */
export function minutesToNextHour(minute) {
  return minute === 0 ? 60 : 60 - minute;
}

/** The unit relationships Year 2 is expected to know. */
export const CONVERSIONS = [
  { from: "cm", to: "m", perUnit: 100 },
  { from: "g", to: "kg", perUnit: 1000 },
  { from: "ml", to: "litre", perUnit: 1000 },
  { from: "min", to: "hour", perUnit: 60 },
  { from: "hour", to: "day", perUnit: 24 },
];

/** 200 cm -> 2 m. Callers keep to amounts that convert exactly. */
export function convert(amount, from) {
  const rule = CONVERSIONS.find((c) => c.from === from);
  return amount / rule.perUnit;
}

/**
 * Answer options for "read the scale", always `count` of them.
 *
 * The obvious version — take the value either side and drop any that fall off
 * the scale — quietly gives only TWO options at the ends, and a two-option
 * question about a thermometer reading −10 °C is a coin flip. This walks
 * outwards a step at a time and keeps going until it has enough, so a reading
 * at either end is as hard as one in the middle.
 *
 * Every option is a whole number of steps from the answer, so each one can be
 * read off the scale rather than being an impossible value.
 */
export function scaleOptions(value, step, min, max, count) {
  const options = [value];

  for (let distance = 1; options.length < count; distance += 1) {
    for (const candidate of [value - distance * step, value + distance * step]) {
      if (candidate < min || candidate > max) continue;
      if (options.includes(candidate)) continue;
      options.push(candidate);
      if (options.length === count) break;
    }
    // Nothing left within the scale; stop rather than loop forever.
    if (value - distance * step < min && value + distance * step > max) break;
  }

  return options;
}
