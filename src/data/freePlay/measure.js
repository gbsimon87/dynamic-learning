import { scaleOptions } from "../challenges/measurement.js";
import { assertLevel, multiples, pick, shuffle } from "./random.js";

/**
 * Measure It — endless scale questions for the Skills Mode measuring game.
 *
 *   read  ScaleReader shows a pointer; pick the reading from four options
 *   set   MeasureDrag: move the pointer to a given reading
 *
 * Every scale is a whole number of steps, and every value — answer or
 * distractor — sits on a step, so each option is something the scale could
 * actually show (scaleOptions in measurement.js).
 *
 * Levels: 1 is Year 2's gentlest scales (count in ones, tens); 2 reads in
 * twos, fives and fifties; 3 is Year 3 — millimetres and the 1000 ml jug.
 */

/** The four instruments, dressed for ScaleReader / MeasureDrag. */
const INSTRUMENTS = {
  ruler: { unit: "cm", orientation: "horizontal", variant: "", noun: "ruler", what: "How long is the ribbon?" },
  rulerMm: { unit: "mm", orientation: "horizontal", variant: "", noun: "ruler", what: "How long is the ribbon?" },
  thermometer: { unit: "°C", orientation: "vertical", variant: "thermometer", noun: "thermometer", what: "What temperature does it show?" },
  jug: { unit: "ml", orientation: "vertical", variant: "jug", noun: "jug", what: "How much water is in the jug?" },
  kitchen: { unit: "g", orientation: "horizontal", variant: "", noun: "scale", what: "How heavy is the parcel?" },
};

/** Units as they are read aloud. */
const SAID = { cm: "centimetres", mm: "millimetres", "°C": "degrees", ml: "millilitres", g: "grams" };

export const SCALES = {
  1: [
    { instrument: "ruler", min: 0, max: 20, majorStep: 5, minorStep: 1, step: 1 },
    { instrument: "jug", min: 0, max: 100, majorStep: 10, minorStep: 10, step: 10 },
    { instrument: "thermometer", min: 0, max: 40, majorStep: 10, minorStep: 10, step: 10 },
  ],
  2: [
    { instrument: "ruler", min: 0, max: 30, majorStep: 5, minorStep: 1, step: 1 },
    { instrument: "kitchen", min: 0, max: 100, majorStep: 10, minorStep: 2, step: 2 },
    { instrument: "thermometer", min: -10, max: 40, majorStep: 10, minorStep: 5, step: 5 },
    { instrument: "jug", min: 0, max: 500, majorStep: 100, minorStep: 50, step: 50 },
  ],
  3: [
    { instrument: "rulerMm", min: 0, max: 100, majorStep: 10, minorStep: 5, step: 5 },
    { instrument: "kitchen", min: 0, max: 1000, majorStep: 100, minorStep: 50, step: 50 },
    { instrument: "thermometer", min: -10, max: 50, majorStep: 10, minorStep: 2, step: 2 },
    { instrument: "jug", min: 0, max: 1000, majorStep: 100, minorStep: 50, step: 50 },
  ],
};

export function sayMeasure(value, unit) {
  const said = SAID[unit] ?? unit;
  if (unit === "°C" && value < 0) return `minus ${-value} ${said}`;
  return `${value} ${said}`;
}

export function formatMeasure(value, unit) {
  return unit === "°C" ? `${value}${unit}` : `${value} ${unit}`;
}

/**
 * The value to ask about: any step above the bottom of the scale. The very
 * bottom is left out — a pointer resting at 0 reads as "nothing set yet".
 */
function valueOn(scale, rng) {
  return pick(rng, multiples(scale.min + scale.step, scale.max, scale.step));
}

export function makeMeasureQuestion(rng, level) {
  assertLevel(level);
  const scale = pick(rng, SCALES[level]);
  const instrument = INSTRUMENTS[scale.instrument];
  const value = valueOn(scale, rng);
  const common = { ...scale, ...instrument, answer: value };

  if (rng() < 0.5) {
    const options = shuffle(scaleOptions(value, scale.step, scale.min, scale.max, 4), rng)
      .map((option) => formatMeasure(option, instrument.unit));
    return {
      ...common,
      kind: "read",
      key: `read:${scale.instrument}:${scale.max}:${value}`,
      options,
      answerLabel: formatMeasure(value, instrument.unit),
      prompt: instrument.what,
      speech: `${instrument.what} Read the ${instrument.noun}.`,
    };
  }

  return {
    ...common,
    kind: "set",
    key: `set:${scale.instrument}:${scale.max}:${value}`,
    prompt: `Move the marker to ${formatMeasure(value, instrument.unit)}.`,
    speech: `Move the marker on the ${instrument.noun} to ${sayMeasure(value, instrument.unit)}.`,
  };
}
