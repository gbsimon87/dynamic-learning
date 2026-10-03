import { sample, shuffle } from "../english/shared.js";
import { exactRecord } from "./forcesShared.js";
export const GLOSS = "Contact means touching. A push or pull by a hand, foot or rope needs contact between the bodies. Magnetic forces can act across a gap; the magnet does not need to touch the other object. Attract means pull together; repel means push apart. A gap alone does not prove a magnetic force: use the named magnet and supplied movement evidence. No noticeable movement does not prove that all forces are absent.";
export const CASES = [
  ["book", "hand", "book", "pushes", "contact"], ["ball", "foot", "ball", "pushes", "contact"],
  ["door", "finger", "door", "pushes", "contact"], ["cart", "rope", "cart handle", "pulls", "contact"],
  ["drawer", "hand", "drawer handle", "pulls", "contact"], ["swing", "hand", "swing seat", "pushes", "contact"],
  ["elastic", "hand", "elastic strip", "pulls", "contact"], ["sponge", "hand", "sponge", "pushes", "contact"],
  ["clip", "bar magnet", "ordinary steel paperclip", "attracts", "magnetic"],
  ["washer", "bar magnet", "iron washer", "attracts", "magnetic"],
  ["nail", "bar magnet", "ordinary steel nail", "attracts", "magnetic"],
  ["pin", "bar magnet", "ordinary steel pin", "attracts", "magnetic"],
  ["magnet-pull", "bar magnet", "second bar magnet", "attracts", "magnetic"],
  ["magnet-push", "bar magnet", "second bar magnet", "repels", "magnetic"],
  ["magnet-push-again", "second bar magnet", "third bar magnet", "repels", "magnetic"],
].map(([id, giver, receiver, verb, kind]) => ({ id, giver, receiver, verb, kind }));
export const FACT_BANK = CASES.map(c => ({ id: `fact-${c.id}`, scene: c }));
export const SORT_BANK = CASES.map(c => ({ id: `sort-${c.id}`, scene: c }));
export const DIAGRAM_BANK = CASES.map(c => ({ id: `diagram-${c.id}`, scene: c }));
export const ENQUIRY_BANK = [CASES[0], CASES[1], CASES[3], CASES[8], CASES[9], CASES[10], CASES[12], CASES[13], CASES[14]].map((c, i) => ({ id: `enquiry-${c.id}`, scene: c, group: i < 3 ? "contact" : c.verb === "repels" ? "repel" : "attract" }));
export const BINS = [{ id: "none", label: "No noticeable effect observed" }, { id: "contact", label: "Push or pull while touching" }, { id: "gap", label: "Magnetic effect across a gap" }];
export function contactStages(scene) {
  const magnetic = scene.kind === "magnetic";
  return [0, 1, 2].map(index => {
    const effect = index > 0, touching = !magnetic && effect;
    return { id: `stage-${index}`, label: index === 0 ? "Before" : index === 1 ? "During the force" : "Continue observing", scene, effect, touching, gap: touching ? 0 : index === 0 ? 25 : scene.verb === "repels" ? (index === 1 ? 40 : 55) : (index === 1 ? 15 : 8),
      text: !effect ? `The ${scene.giver} and ${scene.receiver} are separated. No noticeable movement or shape change is recorded in this supplied before-observation.` : magnetic ? `The ${scene.giver} ${scene.verb} the ${scene.receiver}. The ${scene.receiver} ${scene.verb === "repels" ? "moves away" : "moves towards it"} while a visible gap remains. The two bodies do not touch; this is a magnetic effect.` : `The ${scene.giver} touches and ${scene.verb} the ${scene.receiver}. ${scene.receiver === "sponge" || scene.receiver === "elastic strip" ? "Its shape changes" : "It moves"} while the bodies are touching. This direct push or pull needs contact.` };
  });
}
export function contactTargets(q) {
  return [{ id: "giver", label: "Force-giving body", text: `The ${q.scene.giver}` }, { id: "receiver", label: "Body affected", text: `The ${q.scene.receiver}` }, { id: "space", label: q.scene.kind === "magnetic" ? "Gap between bodies" : "Touching place", text: q.scene.kind === "magnetic" ? "Space remains between the bodies as a magnetic force acts" : "The place where the two bodies touch during the push or pull" }].map((t, i) => ({ ...t, letter: String.fromCharCode(65 + (i + CASES.findIndex(c => c.id === q.scene.id)) % 3) }));
}
export function buildContactQuestions(level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new RangeError("Unknown contact force level");
  const bank = [FACT_BANK, SORT_BANK, DIAGRAM_BANK, ENQUIRY_BANK][level - 1];
  const anchors = level === 4 ? ["contact", "attract", "repel"].map(group => sample(bank.filter(q => q.group === group), 1, rng)[0]) : ["contact", "magnetic"].map(kind => sample(bank.filter(q => q.scene.kind === kind), 1, rng)[0]);
  const chosen = level === 4 ? anchors : [...anchors, ...sample(bank.filter(q => !anchors.some(a => a.id === q.id)), 3, rng)];
  return shuffle(chosen, rng).map(q => {
    const stages = contactStages(q.scene), magnetic = q.scene.kind === "magnetic", diagramTargets = contactTargets(q);
    return { ...q, level, stages, diagramTargets, labels: shuffle(diagramTargets.map(t => ({ id: t.id, label: t.label })), rng), targets: diagramTargets.map(t => ({ id: t.letter, label: t.letter })),
      prompt: "What does the supplied observation show about this force?", answer: magnetic ? "This magnetic force acts while the bodies are separated." : "This direct push or pull needs the bodies to touch.", options: shuffle([magnetic ? "This magnetic force acts while the bodies are separated." : "This direct push or pull needs the bodies to touch.", magnetic ? "The magnet must touch the other body for any magnetic force to act." : "This hand, foot or rope acts without touching the other body.", "A gap by itself always proves that the force is magnetic."], rng),
      recordCards: shuffle(stages.map(s => ({ id: s.id, label: s.label })), rng), recordBins: BINS, recordExpected: Object.fromEntries(stages.map(s => [s.id, !s.effect ? "none" : s.touching ? "contact" : "gap"])),
      title: "Does this force need the two bodies to touch?", setup: "Predict, inspect the before-observation and both force observations, then record whether an effect was seen and whether the bodies touched.",
      predictionOptions: ["The bodies may need to touch.", "A force may act across a gap.", "No noticeable effect may be seen.", "I am not sure yet."], recordPrompt: "Use the supplied observation notes. No visible effect is different from a visible effect across a gap.", recordHint: "Check both the effect and the touching/gap evidence in each named stage.", conclusionHint: "Name the bodies first, add touching or gap evidence, then explain this specified force.",
      tiles: shuffle([{ id: "bodies", label: `First: compare the ${q.scene.giver} and ${q.scene.receiver}.` }, { id: "evidence", label: `Evidence: ${magnetic ? "movement was seen while a gap remained between them" : "a change was seen while they were touching"}.` }, { id: "cause", label: `So: ${magnetic ? "this magnetic force acted without contact" : "this direct push or pull needed contact"}.` }, { id: "gap-proof", label: "So: every gap proves that a magnetic force is acting." }, { id: "all-touch", label: "So: all forces require touching." }], rng), correctConclusionIds: ["bodies", "evidence", "cause"],
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
