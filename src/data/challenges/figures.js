/**
 * Picture rules for a topic bank: pure data, no React.
 *
 * A rule is `{ when, show, levels? }`.
 *   when    a RegExp tested on the question prompt, or `(question) => boolean`
 *   show    a `visual` object, or `(question, match) => visual | null`
 *   levels  optional list of levels the rule applies to
 * The first matching rule gives a question its `visual`. A question that already has its own
 * visual, other than the topic's, keeps it. Rules read the built question, so they can use
 * the numbers and words the question really shows and never contradict it.
 */
export const rule = (when, show, levels) => ({ when, show, levels });

/** The rule that fits `question`, with the visual it draws, or null. */
export function pickFigure(question, level, rules = [], topicVisual) {
  if (question.visual && question.visual !== topicVisual) return null;
  for (let index = 0; index < rules.length; index += 1) {
    const { when, show, levels } = rules[index];
    if (levels && !levels.includes(level)) continue;
    const match = when instanceof RegExp ? (question.prompt ?? "").match(when) : when(question) && [];
    if (!match) continue;
    const visual = typeof show === "function" ? show(question, match) : show;
    if (visual) return { index, visual };
  }
  return null;
}

/** Wrap a topic's `build(level, rng)` so the questions that fit a rule get its picture. */
export function withFigures(build, rules = [], topicVisual) {
  return (level, rng) => build(level, rng).map((q) => {
    const found = pickFigure(q, level, rules, topicVisual);
    return found ? { ...q, visual: found.visual } : q;
  });
}

const TYPE_OK = (visual, types) => Boolean(visual) && typeof visual === "object" && types.includes(visual.type);

/**
 * Checks used by the subject tests. Returns a list of problems (empty when all is well):
 * every topic has a visual of a known type, every drawn question visual has a known type,
 * and every rule fires at least once across `seeds` runs of every level.
 */
export function checkFigures({ topics, builders, rulesByTopic, types, seeds = 150 }) {
  // questionKinds' seededRng is too regular to reach every question; mulberry32 spreads well.
  const seededRng = (seed) => () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const problems = [];
  for (const [id, topic] of Object.entries(topics)) {
    if (!TYPE_OK(topic.visual, types)) problems.push(`${id}: topic visual missing or unknown`);
    const rules = rulesByTopic[id] ?? [];
    const fired = new Set();
    for (let level = 1; level <= 4; level += 1) for (let seed = 1; seed <= seeds; seed += 1) {
      for (const q of builders[id](level, seededRng(seed))) {
        if (q.visual && !TYPE_OK(q.visual, types)) problems.push(`${id}/${level}: unknown visual type ${q.visual?.type}`);
        const found = pickFigure({ ...q, visual: undefined }, level, rules, topic.visual);
        if (found) fired.add(found.index);
      }
    }
    rules.forEach((r, i) => { if (!fired.has(i)) problems.push(`${id}: figure rule ${i} (${r.when}) never fires`); });
  }
  return problems;
}
