import { sample, shuffle } from "../english/shared.js";
import { exactRecord } from "./forcesShared.js";
import { magnetOutcome, magnetObservation, magnetArrangement, oppositePole, outcomeWord, MAGNET_OUTCOMES } from "./magnetModel.js";
export const PAIRS = [{ left: "N", right: "N" }, { left: "N", right: "S" }, { left: "S", right: "N" }, { left: "S", right: "S" }];
const SETS = [[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3], [3, 2, 0]];
export const FACT_BANK = PAIRS.flatMap((pair, i) => [0, 1, 2, 3].map(variant => ({ id: `fact-${i}-${variant}`, pair, variant })));
export const COMPARE_BANK = SETS.flatMap((set, i) => [0, 1, 2].map(variant => ({ id: `compare-${i}-${variant}`, pairs: [...set.slice(variant), ...set.slice(0, variant)].map(j => PAIRS[j]), variant })));
export const DIAGRAM_BANK = COMPARE_BANK.map(q => ({ ...q, id: q.id.replace("compare-", "diagram-") }));
export const ENQUIRY_BANK = ["same-first", "different-first", "repeat"].flatMap((group, i) => [0, 1, 2].map(variant => ({ id: `enquiry-${group}-${variant}`, group, pair: i === 0 ? PAIRS[variant === 1 ? 3 : 0] : i === 1 ? PAIRS[variant === 1 ? 2 : 1] : PAIRS[[0, 1, 3][variant]], turn: i === 2 ? "repeat" : variant === 2 ? "left" : "right", variant })));
export function poleTargets(q) {
  const model = magnetArrangement(q.pairs?.[0] ?? q.pair);
  return model.ends.map((end, i) => ({ id: end.id, letter: String.fromCharCode(65 + (i + q.variant) % 4), text: `${end.id.startsWith("left") ? "Left" : "Right"} magnet, ${end.id.endsWith("inner") ? "end nearest the gap" : "end furthest from the gap"}, marked ${end.pole}` }));
}
export function poleLabelExpected(q) {
  const model = magnetArrangement(q.pairs[0]), targets = poleTargets(q);
  return Object.fromEntries(model.ends.map(end => [`${end.id.startsWith("left") ? "left" : "right"}-${end.pole.toLowerCase()}`, targets.find(t => t.id === end.id).letter]));
}
export function buildPolesQuestions(level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new RangeError("Unknown magnetic poles level");
  const bank = [FACT_BANK, COMPARE_BANK, DIAGRAM_BANK, ENQUIRY_BANK][level - 1];
  const anchors = level === 1 ? [0, 1, 2].map(variant => sample(bank.filter(q => q.variant === variant), 1, rng)[0]) : [];
  const chosen = level === 4 ? ["same-first", "different-first", "repeat"].map(group => sample(bank.filter(q => q.group === group), 1, rng)[0]) : level === 1 ? [...anchors, ...sample(bank.filter(q => !anchors.some(a => a.id === q.id)), 2, rng)] : sample(bank, 5, rng);
  return shuffle(chosen, rng).map(q => {
    const first = q.pair ?? q.pairs[0];
    const turned = q.turn === "repeat" ? first : q.turn === "left" ? { ...first, left: oppositePole(first.left) } : { ...first, right: oppositePole(first.right) };
    const stages = level === 4 ? [magnetObservation(first, "before", "Before testing", false), magnetObservation(first, "first", "First test"), magnetObservation(turned, "turned", q.turn === "repeat" ? "Repeat the arrangement" : `Turn the ${q.turn} magnet`)] : (q.pairs ?? [first]).map((pair, i) => magnetObservation(pair, `test-${i}`, `Test ${String.fromCharCode(65 + i)}`));
    const tested = stages.filter(s => s.tested), answer = q.variant === 0 ? "Two poles, one N and one S" : q.variant === 1 ? "North (N) and south (S)" : q.variant === 2 ? MAGNET_OUTCOMES.find(o => o.id === magnetOutcome(first.left, first.right)).label : "The two ends nearest the gap";
    const diagramTargets = poleTargets(q);
    return { ...q, level, stages, diagramTargets, targets: diagramTargets.map(t => ({ id: t.letter, label: t.letter })),
      labels: shuffle([{ id: "left-n", label: "Left magnet: north (N)" }, { id: "left-s", label: "Left magnet: south (S)" }, { id: "right-n", label: "Right magnet: north (N)" }, { id: "right-s", label: "Right magnet: south (S)" }], rng),
      prompt: q.variant === 0 ? "How many poles does each bar magnet have?" : q.variant === 1 ? "What are the two poles called?" : q.variant === 2 ? "What happens in this test?" : "Which two ends face each other?", answer,
      options: shuffle(q.variant === 0 ? [answer, "Only one pole, N", "Two poles, both N"] : q.variant === 1 ? [answer, "Two north poles", "North (N) and no other pole"] : q.variant === 2 ? MAGNET_OUTCOMES.map(o => o.label) : [answer, "The two ends furthest from the gap", "Only the north ends"], rng),
      recordCards: shuffle(tested.map(s => ({ id: s.id, label: `${s.label}: facing ${s.pair.left} and ${s.pair.right}` })), rng), recordBins: MAGNET_OUTCOMES, recordExpected: Object.fromEntries(tested.map(s => [s.id, magnetOutcome(s.pair.left, s.pair.right)])),
      title: q.turn === "repeat" ? "Does running the same test again change the result?" : "What changes when one bar magnet is turned?", setup: q.turn === "repeat" ? "Look at the ends facing each other. Run the first test. Then run the same test again without turning a magnet. Compare both results." : q.turn ? `Look at the ends facing each other. Run the first test. Then turn the ${q.turn} magnet and run the second test. The other magnet stays as it was.` : "", nextLabel: "Run the next test",
      predictionOptions: ["Turning one magnet will change attract to repel", "Turning one magnet will change repel to attract", "The result will stay the same", "I am not sure yet"], recordPrompt: "Sort both tests. The picture before testing is not a result.", recordHint: "Look at the two ends facing each other and how the magnets moved in each test.", conclusionHint: "Use the first test and the second test. Say which facing ends were the same and which were different.",
      tiles: level === 4 ? shuffle([{ id: "turn", label: q.turn === "repeat" ? "First: test the same facing poles twice, without turning a magnet." : `First: test the facing poles, then turn only the ${q.turn} magnet.` }, { id: "evidence", label: `Evidence: the magnets ${outcomeWord(magnetOutcome(first.left, first.right))} in the first test and ${outcomeWord(magnetOutcome(turned.left, turned.right))} in the second test.` }, { id: "rule", label: q.turn === "repeat" ? `So: the facing poles were ${first.left === first.right ? "the same" : "different"} both times, so the magnets ${outcomeWord(magnetOutcome(first.left, first.right))} both times.` : "So: same poles repel and different poles attract." }, { id: "one", label: "So: turning a magnet removes its south pole." }, { id: "colour", label: "So: the colour of the magnet decides its poles." }], rng) : [], correctConclusionIds: level === 4 ? ["turn", "evidence", "rule"] : [],
    };
  });
}
export function isPolesRecordCorrect(q, record) {
  if (![2, 3, 4].includes(q.level)) return false;
  const stages = q.stages.filter(s => s.tested);
  if (!stages.length || stages.some(s => !magnetOutcome(s.pair.left, s.pair.right))) return false;
  return exactRecord(q.recordCards, Object.fromEntries(stages.map(s => [s.id, magnetOutcome(s.pair.left, s.pair.right)])), record);
}
export function isPolesLabelsCorrect(q, placement) { return q.level === 3 && exactRecord(q.labels, poleLabelExpected(q), placement); }
