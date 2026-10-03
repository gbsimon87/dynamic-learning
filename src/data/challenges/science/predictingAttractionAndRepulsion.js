import { sample, shuffle } from "../english/shared.js";
import { exactRecord } from "./forcesShared.js";
import { magnetOutcome, magnetObservation, oppositePole, MAGNET_OUTCOMES } from "./magnetModel.js";
import { PAIRS, COMPARE_BANK as POLE_COMPARISONS } from "./magnetsAndTheirPoles.js";

export const RULE = "Read the facing ends nearest the gap: same poles repel; different poles attract.";
export const PREDICT_BANK = PAIRS.flatMap((pair, i) => [0, 1, 2, 3].map(variant => ({ id: `predict-${i}-${variant}`, pair, variant })));
export const COMPARE_BANK = POLE_COMPARISONS.map(q => ({ id: q.id.replace("compare-", "prediction-table-"), pairs: q.pairs }));
const MISSIONS = [
  { id: "join", target: "attract", prompt: "Arrange the two bar magnets so they pull together." },
  { id: "apart", target: "repel", prompt: "Arrange the two bar magnets so they push apart." },
  { id: "pull", target: "attract", prompt: "Make an attraction arrangement with these two bar magnets." },
  { id: "push", target: "repel", prompt: "Make a repulsion arrangement with these two bar magnets." },
  { id: "together", target: "attract", prompt: "Build an arrangement that moves these bar magnets towards each other." },
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
        prompt: q.variant === 0 ? "Predict the outcome for the shown facing ends." : q.variant === 1 ? "Turn only the left magnet. Predict the new outcome." : q.variant === 2 ? "Turn only the right magnet. Predict the new outcome." : "Turn both magnets once. Predict the new outcome.", proposed: pair };
    }
    if (level === 3) return { ...q, level, stages: [magnetObservation(q.initialPair, "before", "Starting arrangement", false)] };
    const turned = !q.turn ? q.pair : { ...q.pair, [q.turn]: oppositePole(q.pair[q.turn]) };
    const stages = level === 2 ? q.pairs.map((pair, i) => magnetObservation(pair, `test-${i}`, `Test ${String.fromCharCode(65 + i)}`, false)) : [magnetObservation(q.pair, "before", "Before testing", false), magnetObservation(q.pair, "first", "First model test"), magnetObservation(turned, "second", q.turn ? `Turn only the ${q.turn} magnet` : "Repeat without turning")];
    const records = level === 2 ? stages : stages.slice(1);
    return { ...q, level, stages, recordCards: shuffle(records.map(s => ({ id: s.id, label: `${s.label}: facing ${s.pair.left} and ${s.pair.right}` })), rng), recordBins: MAGNET_OUTCOMES, recordExpected: Object.fromEntries(records.map(s => [s.id, magnetOutcome(s.pair.left, s.pair.right)])),
      title: q.turn ? `What happens if only the ${q.turn} magnet turns?` : "What happens if this arrangement is tested again?", setup: q.turn ? `Predict without scoring, run the starting model, turn only the ${q.turn} magnet and run the second model test. The other magnet stays fixed in orientation.` : "Predict without scoring, run the model twice with exactly the same facing poles and compare the results.", nextLabel: "Run next model test",
      predictionOptions: ["The second test may attract.", "The second test may repel.", "I am not sure yet."], recordPrompt: "Record what each model test showed. The untested starting arrangement is not a result.", recordHint: "Match each tested movement to its labelled facing ends. Turning one magnet changes which pole faces the gap.", conclusionHint: "Explain the turning/repeating instruction, both observed outcomes and the rule that fits those facing ends.",
      tiles: level === 4 ? shuffle([{ id: "action", label: q.turn ? `First: turn only the ${q.turn} magnet between model tests.` : "First: repeat the same facing arrangement without turning either magnet." }, { id: "evidence", label: `Evidence: the first model test showed ${magnetOutcome(q.pair.left, q.pair.right)}; the second showed ${magnetOutcome(turned.left, turned.right)}.` }, { id: "rule", label: q.turn ? "So: changing one facing pole changed same poles to different, or different to same. Same poles repel; different poles attract." : `So: both tests kept ${q.pair.left === q.pair.right ? "the same" : "different"} facing poles and gave the same ${magnetOutcome(q.pair.left, q.pair.right)} result.` }, { id: "outer", label: "So: ignore the facing ends and use only the far ends." }, { id: "prediction", label: "So: the model must agree with my prediction, whatever poles face." }], rng) : [], correctConclusionIds: level === 4 ? ["action", "evidence", "rule"] : [],
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
