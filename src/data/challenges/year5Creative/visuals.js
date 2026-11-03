const BANKS = ["facts", "sorts", "structures", "enquiries"];

/**
 * Adds figures to a subject's topic banks without touching its question text.
 * `topicVisuals[id]` becomes `topic.visual`; each `questionVisuals[id]` row is
 * `[prompt, visual, nth?]` and attaches `visual` to the question(s) with exactly
 * that prompt in the topic (all of them, or only the nth when given). Every row
 * must match, so a reworded prompt fails loudly instead of silently losing its figure.
 */
export function withVisuals(topics, topicVisuals, questionVisuals) {
  const out = {};
  for (const [id, topic] of Object.entries(topics)) {
    if (!topicVisuals[id]) throw new Error(`${id} has no topic visual`);
    const rows = questionVisuals[id] ?? [];
    const used = new Set();
    const seen = new Map();
    const attach = (q) => {
      const occurrence = seen.get(q.prompt) ?? 0;
      seen.set(q.prompt, occurrence + 1);
      const at = rows.findIndex((row) => row[0] === q.prompt && (row[2] === undefined || row[2] === occurrence));
      if (at < 0) return q;
      used.add(at);
      return { ...q, visual: rows[at][1] };
    };
    const next = { ...topic, visual: topicVisuals[id] };
    for (const bank of BANKS) next[bank] = topic[bank].map(attach);
    rows.forEach((row, at) => { if (!used.has(at)) throw new Error(`${id}: no question has the prompt "${row[0]}"`); });
    out[id] = next;
  }
  for (const id of [...Object.keys(topicVisuals), ...Object.keys(questionVisuals)]) {
    if (!topics[id]) throw new Error(`Unknown topic ${id}`);
  }
  return out;
}

/** Every `visual` in a topic bank, as `[where, visual]` pairs: handy for tests. */
export function allVisuals(topic) {
  return [["topic", topic.visual], ...BANKS.flatMap((bank) => topic[bank].filter((q) => q.visual).map((q) => [`${bank}: ${q.prompt}`, q.visual]))];
}
