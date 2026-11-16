// A Space Arithmetic flight's shape: a goal of right answers before the rocket
// lands, and comeback sums. Nothing is stored; a flight log lives only on the card.

/** Right answers before the rocket lands; "Keep flying" adds another lot. */
export const FLIGHT_GOAL = 10;
/** Missed sums come back once the child has answered `after` other questions; at most `max` wait. */
export const COMEBACK = { after: 3, max: 5 };
/** After this many misses on one sum, Show me opens by itself. */
export const STUCK_MISSES = 2;

/** Queue a sum that needed a second go (or help) to come back later. */
export function scheduleComeback(queue, question) {
  if (!question?.key) return queue;
  const rest = queue.filter(item => item.question.key !== question.key);
  return [...rest, { question, wait: COMEBACK.after }].slice(-COMEBACK.max);
}

const shuffled = list => {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
  return out;
};

/**
 * One more question is about to be asked: every waiting sum gets closer, and
 * the first that is due comes back (its answers in a new order, `comeback: true`).
 */
export function takeComeback(queue) {
  const ticked = queue.map(item => ({ ...item, wait: item.wait - 1 }));
  const due = ticked.findIndex(item => item.wait <= 0);
  if (due < 0) return { question: null, queue: ticked };
  const { question } = ticked[due];
  return { question: { ...question, options: shuffled(question.options), comeback: true }, queue: ticked.filter((_, i) => i !== due) };
}
