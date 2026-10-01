/** v1/v2 rewards can omit fields, but the document must be an object. */
export function isRewardsData(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
