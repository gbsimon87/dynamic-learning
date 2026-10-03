import { sample, shuffle } from "../english/shared.js";
import { shadowGeometry } from "./shadowModel.js";

// The screen stays at 60 cm. Either the source or the object moves, never both.
export const CONFIGURATIONS = [
  { id: "small-card", objectLabel: "4 cm card", height: 4, moving: "object", positions: [20, 30, 40] },
  { id: "tall-card", objectLabel: "6 cm card", height: 6, moving: "object", positions: [20, 30, 40] },
  { id: "wood", objectLabel: "8 cm wooden strip", height: 8, moving: "object", positions: [20, 30, 40] },
  { id: "source-card", objectLabel: "4 cm card", height: 4, moving: "source", positions: [0, 10, 20], object: 40 },
  { id: "source-strip", objectLabel: "8 cm strip", height: 8, moving: "source", positions: [0, 10, 20], object: 40 },
];
export function sizeObservations(config, reverse = false, variant = 0) {
  const positions = variant === 2 ? (config.moving === "object" ? [15, 25, 35] : [0, 15, 25]) : config.positions;
  return (reverse ? [...positions].reverse() : positions).map((position, i) => {
    const geometry = { source: config.moving === "source" ? position : 0, object: config.moving === "object" ? position : config.object, screen: 60, height: config.height };
    const g = shadowGeometry(geometry);
    if (!g) throw new RangeError("Invalid shadow configuration");
    return { id: `position-${i}`, label: `Position ${i + 1}`, on: true, blocks: true, geometry,
      text: `${config.objectLabel}; ${config.moving === "object" ? "only the object moves; source and screen stay fixed" : "only the source moves; object and screen stay fixed"}. Source → object: ${g.sourceDistance} cm. Object → screen: ${g.screenDistance} cm. Shadow height: ${g.shadowHeight} cm (nearest whole cm).` };
  });
}
export const COMPARE_BANK = CONFIGURATIONS.flatMap(config => [[0, 1], [1, 2], [0, 2]].map((pair, variant) => ({ id: `compare-${config.id}-${variant}`, config, pair, variant })));
export const PATTERN_BANK = CONFIGURATIONS.flatMap(config => [0, 1, 2].map(variant => ({ id: `pattern-${config.id}-${variant}`, config, variant, reverse: variant === 1 })));
export const TABLE_BANK = CONFIGURATIONS.flatMap(config => [0, 1, 2].map(variant => ({ id: `table-${config.id}-${variant}`, config, variant, reverse: variant === 1 })));
export const ENQUIRY_BANK = ["object-nearer", "object-further", "source-nearer"].flatMap((group, i) => [0, 1, 2].map(variant => ({ id: `enquiry-${group}-${variant}`, group, config: CONFIGURATIONS[i < 2 ? variant : 3 + variant % 2], variant, reverse: group !== "object-further" })));
const SETUP_FACTORS = [{ id: "object-position", label: "Object position" }, { id: "source-position", label: "Source position" }, { id: "screen-position", label: "Screen position" }, { id: "object-height", label: "Object height" }, { id: "lamp", label: "Lamp used and its brightness setting" }];
export function buildShadowSizeQuestions(level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new RangeError("Unknown shadow size level");
  const bank = [COMPARE_BANK, PATTERN_BANK, TABLE_BANK, ENQUIRY_BANK][level - 1];
  const chosen = level === 4 ? ["object-nearer", "object-further", "source-nearer"].map(group => sample(bank.filter(q => q.group === group), 1, rng)[0]) : sample(bank, 5, rng);
  return shuffle(chosen, rng).map(q => {
    const all = sizeObservations(q.config, q.reverse, level === 1 ? 0 : q.variant);
    const stages = level === 1 ? q.pair.map(i => all[i]) : all;
    const g = stages.map(s => shadowGeometry(s.geometry));
    const closer = g.at(-1).sourceDistance < g[0].sourceDistance;
    const changed = q.config.moving === "object" ? "object-position" : "source-position";
    const pattern = `In this fixed-screen model, the ${q.config.moving} moved ${closer ? "closer to" : "further from"} the ${q.config.moving === "object" ? "source" : "object"}, and the shadow became ${closer ? "larger" : "smaller"}.`;
    return { ...q, level, stages, title: "How does one distance change affect shadow size?",
      setup: `Compare positions of the same ${q.config.objectLabel}. Move only the ${q.config.moving}; keep the screen and other conditions fixed. Read shadow height to the nearest whole cm.`,
      prompt: level === 1 ? "Which position has the taller shadow? Read the two model measurements." : "Compare all three positions. Choose the pattern supported by these measurements.",
      answer: level === 1 ? stages[g[0].shadowHeight > g[1].shadowHeight ? 0 : 1].label : pattern,
      options: level === 1 ? shuffle(stages.map(s => s.label), rng) : shuffle([pattern, "All three shadows have the same height.", `In this model, getting closer makes the shadow smaller; getting further away makes it larger.`], rng),
      setupCards: shuffle(SETUP_FACTORS, rng), setupExpected: Object.fromEntries(SETUP_FACTORS.map(f => [f.id, f.id === changed ? "change" : "keep"])),
      predictionOptions: ["The shadow may get larger.", "The shadow may get smaller.", "The shadow may stay the same height.", "I am not sure yet."],
      recordCards: shuffle(stages.map(s => ({ id: s.id, label: s.label })), rng), recordBins: [...new Set(g.map(m => m.shadowHeight))].map(h => ({ id: `cm-${h}`, label: `${h} cm` })),
      recordExpected: Object.fromEntries(stages.map((s, i) => [s.id, `cm-${g[i].shadowHeight}`])),
      tiles: shuffle([{ id: "change", label: `First: only the ${q.config.moving} position changed; the screen stayed fixed.` }, { id: "evidence", label: `Evidence: shadow height changed from ${g[0].shadowHeight} cm to ${g.at(-1).shadowHeight} cm.` }, { id: "pattern", label: `So: ${pattern}` }, { id: "all", label: "So: every outdoor shadow follows this exact rule at every time of day." }, { id: "size", label: "First: the object's height changed to make the shadow change." }], rng), correctConclusionIds: ["change", "evidence", "pattern"],
    };
  });
}
export function isShadowSetupCorrect(q, setup) {
  const changed = q.config.moving === "object" ? "object-position" : "source-position";
  return setup != null && Object.keys(setup).length === SETUP_FACTORS.length && SETUP_FACTORS.every(f => Object.hasOwn(setup, f.id) && setup[f.id] === (f.id === changed ? "change" : "keep"));
}
export function isShadowSizeRecordCorrect(q, record) {
  return [3, 4].includes(q.level) && record != null && q.stages.length === 3 && new Set(q.stages.map(s => s.id)).size === 3 && q.recordCards.length === 3 && new Set(q.recordCards.map(c => c.id)).size === 3 && q.recordCards.every(c => q.stages.some(s => s.id === c.id)) && Object.keys(record).length === 3 && q.stages.every(s => {
    const g = shadowGeometry(s.geometry);
    return g && Object.hasOwn(record, s.id) && record[s.id] === `cm-${g.shadowHeight}`;
  });
}
export function isShadowTableCorrect(q, record) {
  return q.level === 3 && record != null && q.stages.length === 3 && new Set(q.stages.map(s => s.id)).size === 3 && Object.keys(record).length === 3 && q.stages.every(s => {
    const value = record[s.id], g = shadowGeometry(s.geometry);
    return typeof value === "string" && /^\d{1,2}$/.test(value) && g && Number(value) === g.shadowHeight;
  });
}
