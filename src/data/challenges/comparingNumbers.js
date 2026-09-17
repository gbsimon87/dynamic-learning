/**
 * Pure question data for the "Less Than, Greater Than and Equal To" topic.
 */

export const SYMBOLS = ["<", ">", "="];

/** The one symbol that makes `left ? right` true. */
export function compareSymbol(left, right) {
  if (left < right) return "<";
  if (left > right) return ">";
  return "=";
}

/** Whether the statement the learner assembled is true. */
export function isTrueStatement(left, symbol, right) {
  switch (symbol) {
    case "<":
      return left < right;
    case ">":
      return left > right;
    case "=":
      return left === right;
    default:
      return false;
  }
}

/**
 * Strictly between, both ends excluded: "greater than 25 and less than 30"
 * is not satisfied by 25 or 30, and that boundary is the whole point of the
 * question.
 */
export function betweenBounds(value, low, high) {
  return value > low && value < high;
}
