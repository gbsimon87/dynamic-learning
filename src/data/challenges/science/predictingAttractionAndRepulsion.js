import { sample, shuffle } from "../english/shared.js";
import { exactRecord } from "./forcesShared.js";
import { magnetOutcome, magnetObservation, oppositePole, outcomeWord, MAGNET_OUTCOMES } from "./magnetModel.js";
import { PAIRS, COMPARE_BANK as POLE_COMPARISONS } from "./magnetsAndTheirPoles.js";

export const RULE = "Look at the two ends that face each other. Same poles repel. Different poles attract.";
export const PREDICT_BANK = PAIRS.flatMap((pair, i) => [0, 1, 2, 3].map(variant => ({ id: `predict-${i}-${variant}`, pair, variant })));
export const COMPARE_BANK = POLE_COMPARISONS.map(q => ({ id: q.id.replace("compare-", "prediction-table-"), pairs: q.pairs }));
const MISSIONS = [
  { id: "join", target: "attract", prompt: "Make the two magnets pull together." },
  { id: "apart", target: "repel", prompt: "Make the two magnets push apart." },
  { id: "pull", target: "attract", prompt: "Make the two magnets attract." },
  { id: "push", target: "repel", prompt: "Make the two magnets repel." },
  { id: "together", target: "attract", prompt: "Make the two magnets move towards each other." },
];
export const BUILD_BANK = MISSIONS.flatMap(mission => [0, 1, 2].map(variant => {
  const left = variant === 1 ? "S" : "N", right = mission.target === "attract" ? left : oppositePole(left);
  return { ...mission, id: `build-${mission.id}-${variant}`, variant, initialPair: { left, right }, turnSide: variant === 2 ? "left" : null };
}));
export const ENQUIRY_BANK = ["turn-left", "turn-right", "repeat"].flatMap((group, i) => [0, 1, 2].map(variant => ({ id: `enquiry-${group}-${variant}`, group, variant, pair: PAIRS[i === 0 ? [0, 2, 3][variant] : i === 1 ? [0, 1, 3][variant] : [0, 1, 2][variant]], turn: i === 0 ? "left" : i === 1 ? "right" : null })));
export function proposedPair(pair, variant) {
  return { left: variant === 1 || variant === 3 ? oppositePole(pair.left) : pair.left, right: variant === 2 || variant === 3 ? oppositePole(pair.right) : pair.right };
}
export function buildPredictionQuestions(level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new RangeError("Unknown magnetic prediction level");
  const bank = [PREDICT_BANK, COMPARE_BANK, BUILD_BANK, ENQUIRY_BANK][level - 1];
  const chosen = level === 4 ? ["turn-left", "turn-right", "repeat"].map(group => sample(bank.filter(q => q.group === group), 1, rng)[0]) : sample(bank, 5, rng);
  return shuffle(chosen, rng).map(q => {
    if (level === 1) {
      const pair = proposedPair(q.pair, q.variant), answer = MAGNET_OUTCOMES.find(o => o.id === magnetOutcome(pair.left, pair.right)).label;
      return { ...q, level, stages: [magnetObservation(q.pair, "before", "Starting arrangement", false)], answer, options: shuffle(MAGNET_OUTCOMES.map(o => o.label), rng),
        prompt: q.variant === 0 ? "What will happen with these facing ends?" : q.variant === 1 ? "Turn only the left magnet. What will happen now?" : q.variant === 2 ? "Turn only the right magnet. What will happen now?" : "Turn both magnets. What will happen now?", proposed: pair };
    }
    if (level === 3) return { ...q, level, stages: [magnetObservation(q.initialPair, "before", "Starting arrangement", false)] };
    const turned = !q.turn ? q.pair : { ...q.pair, [q.turn]: oppositePole(q.pair[q.turn]) };
    const stages = level === 2 ? q.pairs.map((pair, i) => magnetObservation(pair, `test-${i}`, `Test ${String.fromCharCode(65 + i)}`, false)) : [magnetObservation(q.pair, "before", "Before testing", false), magnetObservation(q.pair, "first", "First test"), magnetObservation(turned, "second", q.turn ? `Turn only the ${q.turn} magnet` : "Repeat without turning")];
    const records = level === 2 ? stages : stages.slice(1);
    return { ...q, level, stages, recordCards: shuffle(records.map(s => ({ id: s.id, label: `${s.label}: facing ${s.pair.left} and ${s.pair.right}` })), rng), recordBins: MAGNET_OUTCOMES, recordExpected: Object.fromEntries(records.map(s => [s.id, magnetOutcome(s.pair.left, s.pair.right)])),
      title: q.turn ? `What happens if only the ${q.turn} magnet turns?` : "What happens if we run the same test again?", setup: q.turn ? `Predict, then run the first test. Turn only the ${q.turn} magnet and run the second test. The other magnet stays as it was.` : "Predict, then run the same test twice with the same facing poles. Compare the results.", nextLabel: "Run the next test",
      predictionOptions: ["The second test will attract", "The second test will repel", "I am not sure yet"], recordPrompt: "Sort what each test showed. The picture before testing is not a result.", recordHint: "Match each test to the ends facing each other. Turning one magnet changes which pole faces the gap.", conclusionHint: "Say what you did, what each test showed, and the rule that fits.",
      tiles: level === 4 ? shuffle([{ id: "action", label: q.turn ? `First: turn only the ${q.turn} magnet between the tests.` : "First: run the same test again without turning a magnet." }, { id: "evidence", label: `Evidence: the magnets ${outcomeWord(magnetOutcome(q.pair.left, q.pair.right))} in the first test and ${outcomeWord(magnetOutcome(turned.left, turned.right))} in the second test.` }, { id: "rule", label: q.turn ? "So: turning one magnet changed same poles to different, or different to same. Same poles repel. Different poles attract." : `So: both tests had ${q.pair.left === q.pair.right ? "the same" : "different"} facing poles, so the magnets ${outcomeWord(magnetOutcome(q.pair.left, q.pair.right))} both times.` }, { id: "outer", label: "So: use the far ends, not the ends that face each other." }, { id: "prediction", label: "So: the result must match my prediction, whatever poles face." }], rng) : [], correctConclusionIds: level === 4 ? ["action", "evidence", "rule"] : [],
    };
  });
}
export function isPredictionRecordCorrect(q, record) {
  if (![2, 4].includes(q.level)) return false;
  const stages = q.level === 2 ? q.stages : q.stages.filter(s => s.tested);
  if (!stages.length || stages.some(s => !magnetOutcome(s.pair.left, s.pair.right))) return false;
  return exactRecord(q.recordCards, Object.fromEntries(stages.map(s => [s.id, magnetOutcome(s.pair.left, s.pair.right)])), record);
}
export function isMagnetBuildCorrect(q, pair, tested) {
  if (q.level !== 3 || tested !== true || pair == null || typeof pair !== "object" || Array.isArray(pair) || Object.keys(pair).length !== 2 || !Object.hasOwn(pair, "left") || !Object.hasOwn(pair, "right") || !["attract", "repel"].includes(q.target)) return false;
  if (q.turnSide && pair[q.turnSide === "left" ? "right" : "left"] !== q.initialPair[q.turnSide === "left" ? "right" : "left"]) return false;
  return magnetOutcome(pair.left, pair.right) === q.target;
}
