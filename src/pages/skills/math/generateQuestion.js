// Question generation for Arithmetic Practice. Separate module so it can be
// exercised directly without breaking fast refresh.
//
// Two invariants, guaranteed by construction (never generate-then-reject, which
// is how this file once froze the browser):
//   1. the answer is a non-negative whole number;
//   2. so is every intermediate result.
//
// Mixed questions use explicit brackets - `4 + (5 × 2)` - since Year 2 has not
// been taught operator precedence.

export const OPERATIONS = ['addition', 'subtraction', 'multiplication', 'division'];

// Largest factor inside a bracketed product in a mixed question.
const MIXED_FACTOR_CAP = 5;
const MAX_OPERANDS = 4;

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function randInt(min, max) {
  const lo = Math.min(min, max);
  const hi = Math.max(min, max);
  return Math.floor(Math.random() * (hi - lo + 1)) + lo;
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// --- Single-operator builders -------------------------------------------------
// Each returns { text, value } where `text` is what the learner reads and
// `value` is its result. `text` is already safe to nest inside brackets.

function buildAddition(operands, min, max) {
  const numbers = Array.from({ length: operands }, () => randInt(min, max));
  return {
    text: numbers.join(' + '),
    value: numbers.reduce((a, b) => a + b, 0),
  };
}

function buildSubtraction(operands, min, max) {
  // Subtrahends first, then start = their sum + answer. Keeps the result >= 0
  // while always producing the requested term count.
  const subtrahends = Array.from({ length: operands - 1 }, () =>
    Math.max(1, randInt(min, max))
  );
  const subTotal = subtrahends.reduce((a, b) => a + b, 0);
  const answer = randInt(0, Math.max(min, max));
  const terms = [subTotal + answer, ...subtrahends];
  return { text: terms.join(' - '), value: answer };
}

function buildMultiplication(operands, min, max) {
  const numbers = Array.from({ length: operands }, () => randInt(min, max));
  return {
    text: numbers.join(' × '),
    value: numbers.reduce((a, b) => a * b, 1),
  };
}

// `operands` unused: division always renders as one dividend ÷ divisor pair.
function buildDivision(_operands, min, max) {
  // Divisor from the lower half of the range: picking it first and capping the
  // quotient at max/divisor skewed hard toward `n ÷ n = 1`.
  const divisorCeiling = Math.max(2, Math.min(max, Math.ceil(Math.max(2, max) / 2)));
  const divisor = randInt(Math.max(2, Math.min(min, divisorCeiling)), divisorCeiling);
  const quotient = randInt(2, Math.max(2, max));
  return { text: `${divisor * quotient} ÷ ${divisor}`, value: quotient };
}

const BUILDERS = {
  addition: buildAddition,
  subtraction: buildSubtraction,
  multiplication: buildMultiplication,
  division: buildDivision,
};

// --- Mixed-operator builder --------------------------------------------------

// Returns null when this operator can't extend safely, so the caller just stops.
function extend(current, operation, min, max) {
  switch (operation) {
    case 'addition': {
      const n = randInt(min, max);
      return { text: `${current.text} + ${n}`, value: current.value + n };
    }
    case 'subtraction': {
      // Never subtract more than we have, so the running total stays >= 0.
      if (current.value < 1) return null;
      const n = randInt(1, Math.min(current.value, max));
      return { text: `${current.text} - ${n}`, value: current.value - n };
    }
    case 'multiplication': {
      // Bracketed, with small factors so the running total stays Year 2 sized.
      const cap = Math.max(2, Math.min(max, MIXED_FACTOR_CAP));
      const n = randInt(2, cap);
      const m = randInt(Math.min(min, cap), cap);
      return {
        text: `${current.text} + (${m} × ${n})`,
        value: current.value + m * n,
      };
    }
    case 'division': {
      // Only divide by a factor of the running total, so the result stays whole.
      const factors = [];
      for (let d = 2; d <= Math.min(current.value, max); d++) {
        if (current.value % d === 0) factors.push(d);
      }
      if (factors.length === 0) return null;
      const d = pick(factors);
      // Only bracket when the expression is more than a bare number, so we
      // never render pointless parentheses like "(4) ÷ 4".
      const needsBrackets = /[+\-×÷]/.test(current.text);
      const left = needsBrackets ? `(${current.text})` : current.text;
      return { text: `${left} ÷ ${d}`, value: current.value / d };
    }
    default:
      return null;
  }
}

function buildMixed(types, operands, min, max) {
  // Start from a plain number, then apply operators one at a time. `operands`
  // terms means `operands - 1` operators.
  const seed = randInt(min, max);
  let current = { text: String(seed), value: seed };

  const wanted = Math.max(1, operands - 1);
  let applied = 0;

  // Bounded: at most one attempt per operator per available type.
  for (let step = 0; step < wanted; step += 1) {
    let next = null;
    // At most one bracketed group, never nested: once one exists, only flat +/-.
    const alreadyBracketed = current.text.includes('(');
    const usable = alreadyBracketed
      ? types.filter((t) => t === 'addition' || t === 'subtraction')
      : types;
    if (usable.length === 0) break;

    for (const operation of shuffleArray(usable)) {
      next = extend(current, operation, min, max);
      if (next) break;
    }
    if (!next) break; // nothing can extend safely - stop with what we have
    current = next;
    applied += 1;
  }

  // If literally nothing could be applied, fall back to a simple sum so the
  // learner never sees a bare number as a "question".
  if (applied === 0) return buildAddition(Math.max(2, operands), min, max);
  return current;
}

// --- Distractors -------------------------------------------------------------

function buildOptions(correctAnswer) {
  // Scale with the answer: a fixed +/-5 makes a 4-digit product obvious.
  const spread = Math.max(3, Math.round(Math.abs(correctAnswer) * 0.15));

  // Enumerate up front: near zero there may be fewer than 3 valid candidates.
  const candidates = [];
  for (let delta = -spread; delta <= spread; delta++) {
    const wrong = correctAnswer + delta;
    if (delta !== 0 && wrong >= 0) candidates.push(wrong);
  }
  // Widen upward if the window still can't supply 3 distractors.
  let next = correctAnswer + spread + 1;
  while (candidates.length < 3) {
    candidates.push(next);
    next += 1;
  }

  const incorrect = shuffleArray(candidates).slice(0, 3);
  return shuffleArray([...incorrect, correctAnswer]);
}

// --- Public API --------------------------------------------------------------

/**
 * @param {object} settings
 * @param {string[]} [settings.types]  One or more of OPERATIONS. One is chosen at
 *                                     random per question.
 * @param {boolean} [settings.mixOperations] Combine several operators in one
 *                                     problem, e.g. `4 + (5 × 2)`.
 * @param {string}  [settings.type]    Legacy single-operation field.
 */
export function generateQuestion({
  type,
  types,
  mixOperations = false,
  operands,
  min,
  max,
}) {
  // Accept the legacy single `type` as well as the newer `types` array.
  const selected = (types && types.length ? types : [type]).filter((t) =>
    OPERATIONS.includes(t)
  );
  const active = selected.length ? selected : ['addition'];
  const termCount = Math.min(Math.max(Number(operands) || 2, 2), MAX_OPERANDS);

  const built =
    mixOperations && active.length > 1
      ? buildMixed(active, termCount, min, max)
      : BUILDERS[pick(active)](termCount, min, max);

  return {
    questionText: built.text,
    correctAnswer: built.value,
    options: buildOptions(built.value),
  };
}
