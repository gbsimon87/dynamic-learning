// Space Arithmetic asks the same questions as Arithmetic Practice: same
// operations, mixing, number of terms and number range, from the same
// generator (whole-number answers and steps by construction).
import { DEFAULT_PRACTICE_SETTINGS } from '../../pages/skills/math/practiceSettings.js';
import { generateQuestion, generateReverseQuestion } from '../../pages/skills/math/generateQuestion.js';

const SIGN = { '+': 'addition', '-': 'subtraction', '×': 'multiplication', '÷': 'division' };
const ATTEMPTS = 4;
const pretty = text => text.replaceAll(' - ', ' − ');

/** `a op b` with one operator, or null for longer or mixed questions. */
export function simpleParts(text) {
  const m = /^(\d+) ([+\-×÷]) (\d+)$/.exec(text);
  return m ? { a: Number(m[1]), operation: SIGN[m[2]], b: Number(m[3]) } : null;
}

/**
 * `settings` is Arithmetic Practice's `{ types, mixOperations, operands, min, max }`.
 * Avoids repeating `previousKey` (a few bounded tries, never a loop).
 * Returns `{ key, prompt, answer, options, parts }`; `options` order is the
 * left-to-right ring order, four unique whole numbers with one answer.
 * With `find: 'sum'` the card shows `? = 7` and a two-by-two grid of flight
 * rings holds four calculations; `answer` is the one that
 * makes 7 (`reverse`, `target` set).
 */
export function makeSpaceQuestion(settings, previousKey = null) {
  // A live development session can retain the old level-based settings after
  // hot reload. Missing/non-finite bounds must never reach the generator.
  const safeSettings = { ...DEFAULT_PRACTICE_SETTINGS, ...settings };
  for (const bound of ['min', 'max']) {
    if (!Number.isFinite(safeSettings[bound])) safeSettings[bound] = DEFAULT_PRACTICE_SETTINGS[bound];
  }
  if (safeSettings.find === 'sum') {
    let r = generateReverseQuestion(safeSettings);
    for (let i = 1; i < ATTEMPTS && r.correctAnswer === previousKey; i++) r = generateReverseQuestion(safeSettings);
    return { key: r.correctAnswer, prompt: `? = ${r.target}`, answer: pretty(r.correctAnswer), options: r.options.map(pretty), parts: null, reverse: true, target: r.target };
  }
  let q = generateQuestion(safeSettings);
  for (let i = 1; i < ATTEMPTS && q.questionText === previousKey; i++) q = generateQuestion(safeSettings);
  return {
    key: q.questionText,
    prompt: `${pretty(q.questionText)} = ?`,
    answer: q.correctAnswer,
    options: q.options,
    parts: simpleParts(q.questionText),
  };
}
