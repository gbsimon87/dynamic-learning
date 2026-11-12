export const POLES = ["N", "S"];
export const MAGNET_OUTCOMES = [{ id: "attract", label: "Attract — pull together" }, { id: "repel", label: "Repel — push apart" }];
export const MAGNET_GLOSS = "N means north pole and S means south pole. Every magnet has two poles, one at each end. Attract means pull together. Repel means push apart. Poles that are the same push apart. Poles that are different pull together. Look at the two ends that face each other.";
export const outcomeWord = outcome => outcome === "attract" ? "attracted" : "repelled";
export function oppositePole(pole) { return pole === "N" ? "S" : pole === "S" ? "N" : null; }
export function magnetOutcome(left, right) {
  return POLES.includes(left) && POLES.includes(right) ? left === right ? "repel" : "attract" : null;
}
export function magnetArrangement(pair, tested = false) {
  if (pair == null || !POLES.includes(pair.left) || !POLES.includes(pair.right) || typeof tested !== "boolean") return null;
  const outcome = magnetOutcome(pair.left, pair.right), shift = !tested ? 0 : outcome === "attract" ? 20 : -20;
  return { outcome: tested ? outcome : null, leftX: 45 + shift, rightX: 225 - shift, width: 110,
    ends: [{ id: "left-outer", pole: oppositePole(pair.left) }, { id: "left-inner", pole: pair.left }, { id: "right-inner", pole: pair.right }, { id: "right-outer", pole: oppositePole(pair.right) }] };
}
export function magnetObservation(pair, id, label, tested = true) {
  const model = magnetArrangement(pair, tested);
  if (!model) throw new RangeError("Invalid bar-magnet arrangement");
  return { id, label, pair: { ...pair }, tested, outcome: model.outcome,
    text: `The ends facing each other are ${pair.left} and ${pair.right}. ${tested ? `The magnets ${model.outcome === "attract" ? "attract: they move towards each other" : "repel: they move apart"}.` : "The test has not been run yet."}` };
}
