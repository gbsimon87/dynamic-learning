export const POLES = ["N", "S"];
export const MAGNET_OUTCOMES = [{ id: "attract", label: "Attract — pull together" }, { id: "repel", label: "Repel — push apart" }];
export const MAGNET_GLOSS = "N means north pole; S means south pole. A magnet has both poles. In this bar-magnet model they are at opposite ends. Attract means pull together; repel means push apart. The same facing poles repel; different facing poles attract. Read the two ends nearest the gap, not the far ends. This discrete model shows a direction of movement, not a measured force, speed or time.";
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
    text: `The facing ends across the gap are ${pair.left} and ${pair.right}. ${tested ? `This model test shows ${model.outcome === "attract" ? "attraction: the magnets move towards each other" : "repulsion: the magnets move apart"}. Both magnets keep an N and an S pole.` : "The two magnets are arranged with a gap. The model test has not been run yet; no outcome is shown."}` };
}
