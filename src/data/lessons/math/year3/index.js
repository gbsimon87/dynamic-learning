import { PLACE_VALUE_LESSONS } from "./placeValue.js";
import { ADD_SUBTRACT_LESSONS } from "./addSubtract.js";
import { MUL_DIV_LESSONS } from "./mulDiv.js";
import { FRACTIONS_LESSONS } from "./fractions.js";
import { MEASUREMENT_LESSONS } from "./measurement.js";
import { GEOMETRY_LESSONS } from "./geometry.js";
import { STATISTICS_LESSONS } from "./statistics.js";

/** Year 3 Maths lessons by topic id; each category's are in their own file. */
export const YEAR3_MATH_LESSONS = {
  ...PLACE_VALUE_LESSONS,
  ...ADD_SUBTRACT_LESSONS,
  ...MUL_DIV_LESSONS,
  ...FRACTIONS_LESSONS,
  ...MEASUREMENT_LESSONS,
  ...GEOMETRY_LESSONS,
  ...STATISTICS_LESSONS,
};
