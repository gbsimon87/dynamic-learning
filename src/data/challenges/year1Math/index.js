import { numberBuilders } from "./numbers.js";
import { arithmeticBuilders } from "./arithmetic.js";
import { groupBuilders, fractionBuilders } from "./groupsFractions.js";
import { measurementBuilders } from "./measurement.js";
import { geometryBuilders } from "./geometry.js";

// Stable builders keep DataChallenge's mount-time randomisation from restarting.
export const YEAR1_MATH_BUILDERS = {
  ...numberBuilders, ...arithmeticBuilders, ...groupBuilders,
  ...fractionBuilders, ...measurementBuilders, ...geometryBuilders,
};
export const YEAR1_MATH_TITLES = ["Look and learn", "Try it yourself", "Make it work", "Help Bix solve it"];
