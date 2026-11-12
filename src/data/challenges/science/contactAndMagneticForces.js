import { sample, shuffle } from "../english/shared.js";
import { exactRecord } from "./forcesShared.js";
export const GLOSS = "Contact means touching. A push or pull from a hand, a foot or a rope needs touching. A magnet can pull or push across a gap without touching. Attract means pull together. Repel means push apart. A gap alone does not tell us a force is magnetic. Use the notes about the magnet and what moved.";
export const CASES = [
  ["book", "hand", "book", "pushes", "contact"], ["ball", "foot", "ball", "pushes", "contact"],
  ["door", "finger", "door", "pushes", "contact"], ["cart", "rope", "cart handle", "pulls", "contact"],
  ["drawer", "hand", "drawer handle", "pulls", "contact"], ["swing", "hand", "swing seat", "pushes", "contact"],
  ["elastic", "hand", "elastic strip", "pulls", "contact"], ["sponge", "hand", "sponge", "pushes", "contact"],
  ["clip", "bar magnet", "steel paperclip", "attracts", "magnetic"],
  ["washer", "bar magnet", "iron washer", "attracts", "magnetic"],
  ["nail", "bar magnet", "steel nail", "attracts", "magnetic"],
  ["pin", "bar magnet", "steel pin", "attracts", "magnetic"],
  ["magnet-pull", "bar magnet", "second bar magnet", "attracts", "magnetic"],
  ["magnet-push", "bar magnet", "second bar magnet", "repels", "magnetic"],
  ["magnet-push-again", "second bar magnet", "third bar magnet", "repels", "magnetic"],
].map(([id, giver, receiver, verb, kind]) => ({ id, giver, receiver, verb, kind }));
export const FACT_BANK = CASES.map(c => ({ id: `fact-${c.id}`, scene: c }));
export const SORT_BANK = CASES.map(c => ({ id: `sort-${c.id}`, scene: c }));
export const DIAGRAM_BANK = CASES.map(c => ({ id: `diagram-${c.id}`, scene: c }));
export const ENQUIRY_BANK = [CASES[0], CASES[1], CASES[3], CASES[8], CASES[9], CASES[10], CASES[12], CASES[13], CASES[14]].map((c, i) => ({ id: `enquiry-${c.id}`, scene: c, group: i < 3 ? "contact" : c.verb === "repels" ? "repel" : "attract" }));
export const BINS = [{ id: "none", label: "Nothing happened" }, { id: "contact", label: "Push or pull while touching" }, { id: "gap", label: "Magnet force across a gap" }];
export function contactStages(scene) {
  const magnetic = scene.kind === "magnetic";
  return [0, 1, 2].map(index => {
    const effect = index > 0, touching = !magnetic && effect;
    return { id: `stage-${index}`, label: index === 0 ? "Before" : index === 1 ? "While the force acts" : "A bit later", scene, effect, touching, gap: touching ? 0 : index === 0 ? 25 : scene.verb === "repels" ? (index === 1 ? 40 : 55) : (index === 1 ? 15 : 8),
      text: !effect ? `The ${scene.giver} and the ${scene.receiver} are apart. Nothing moves or changes yet.` : magnetic ? `The ${scene.giver} ${scene.verb} the ${scene.receiver}. The ${scene.receiver} ${scene.verb === "repels" ? "moves away" : "moves towards it"}. There is still a gap and they do not touch. This is a magnetic force.` : `The ${scene.giver} touches the ${scene.receiver} and ${scene.verb} it. ${scene.receiver === "sponge" || scene.receiver === "elastic strip" ? "Its shape changes" : "It moves"} while they touch. This push or pull needs touching.` };
  });
}
export function contactTargets(q) {
  return [{ id: "giver", label: "Thing that pushes or pulls", text: `The ${q.scene.giver}` }, { id: "receiver", label: "Thing that is moved", text: `The ${q.scene.receiver}` }, { id: "space", label: q.scene.kind === "magnetic" ? "Gap between them" : "Where they touch", text: q.scene.kind === "magnetic" ? "The gap between the two things while the magnet pulls or pushes" : "The place where the two things touch" }].map((t, i) => ({ ...t, letter: String.fromCharCode(65 + (i + CASES.findIndex(c => c.id === q.scene.id)) % 3) }));
}
export function buildContactQuestions(level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new RangeError("Unknown contact force level");
  const bank = [FACT_BANK, SORT_BANK, DIAGRAM_BANK, ENQUIRY_BANK][level - 1];
  const anchors = level === 4 ? ["contact", "attract", "repel"].map(group => sample(bank.filter(q => q.group === group), 1, rng)[0]) : ["contact", "magnetic"].map(kind => sample(bank.filter(q => q.scene.kind === kind), 1, rng)[0]);
  const chosen = level === 4 ? anchors : [...anchors, ...sample(bank.filter(q => !anchors.some(a => a.id === q.id)), 3, rng)];
  return shuffle(chosen, rng).map(q => {
    const stages = contactStages(q.scene), magnetic = q.scene.kind === "magnetic", diagramTargets = contactTargets(q);
    return { ...q, level, stages, diagramTargets, labels: shuffle(diagramTargets.map(t => ({ id: t.id, label: t.label })), rng), targets: diagramTargets.map(t => ({ id: t.letter, label: t.letter })),
      prompt: "What does this picture show about the force?", answer: magnetic ? "This magnetic force works across a gap" : "This push or pull needs touching", options: shuffle([magnetic ? "This magnetic force works across a gap" : "This push or pull needs touching", magnetic ? "The magnet must touch the other thing" : "This push or pull works without touching", "A gap always means the force is magnetic"], rng),
      recordCards: shuffle(stages.map(s => ({ id: s.id, label: s.label })), rng), recordBins: BINS, recordExpected: Object.fromEntries(stages.map(s => [s.id, !s.effect ? "none" : s.touching ? "contact" : "gap"])),
      title: "Does this force need the two things to touch?", setup: "Look at three pictures: before, while the force acts, and a bit later. Then record what happened and if the two things touched.",
      predictionOptions: ["The two things need to touch", "A force can work across a gap", "Nothing will happen", "I am not sure yet"], recordPrompt: "Sort each picture. Nothing happening is not the same as a magnet working across a gap.", recordHint: "In each picture, check if anything happened and if the two things touched.", conclusionHint: "Name the two things first. Then say if they touched. Then say what kind of force it was.",
      tiles: shuffle([{ id: "bodies", label: `First: look at the ${q.scene.giver} and the ${q.scene.receiver}.` }, { id: "evidence", label: `Evidence: ${magnetic ? "the " + q.scene.receiver + " moved while there was still a gap" : "something changed while they were touching"}.` }, { id: "cause", label: `So: ${magnetic ? "this magnetic force worked without touching" : "this push or pull needed touching"}.` }, { id: "gap-proof", label: "So: every gap means a magnetic force is acting." }, { id: "all-touch", label: "So: all forces need touching." }], rng), correctConclusionIds: ["bodies", "evidence", "cause"],
    };
  });
}
export function isContactRecordCorrect(q, record) {
  return [2, 4].includes(q.level) && exactRecord(q.recordCards, Object.fromEntries(contactStages(q.scene).map(s => [s.id, !s.effect ? "none" : s.touching ? "contact" : "gap"])), record);
}
export function isContactLabelsCorrect(q, record) {
  const targets = contactTargets(q);
  return q.level === 3 && exactRecord(targets, Object.fromEntries(targets.map(t => [t.id, t.letter])), record);
}
