import { assertLevel, pick, randInt, shuffle } from "./random.js";
import { SHAPES } from "./fractionShapes.js";

/**
 * Fraction Fun questions. Pure: `rng` is a `() => [0, 1)` so tests can seed it.
 *
 * Level 1 (ages 6-7): halves, thirds and quarters on simple shapes.
 * Level 2 (ages 8-10): up to tenths on every shape.
 * Level 3 (ages 11+): up to twelfths, and the shape may be cut into more
 * parts than the fraction's denominator (shade 3/4 of a shape cut into 8), or
 * the answer must be written in simplest form.
 *
 * Kinds: "shade" (shade the fraction named) and "name" (say what is shaded).
 * Because the parts are equal, any `target` parts shaded is a correct answer.
 */

export const KINDS = ["shade", "name"];

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const label = (n, d) => `${n}/${d}`;

function divisors(parts) {
  const found = [];
  for (let d = 2; d <= parts; d += 1) if (parts % d === 0) found.push(d);
  return found;
}

function chooseShape(rng, level, avoid) {
  const types = Object.keys(SHAPES).filter((t) => SHAPES[t].counts[level].length > 0);
  const fresh = types.filter((t) => t !== avoid);
  return pick(rng, fresh.length > 0 ? fresh : types);
}

function nameOptions(rng, shaded, parts, answer) {
  const wrong = [label(parts - shaded, parts), label(shaded, parts - shaded), label(shaded + 1, parts), label(shaded, parts + 1)];
  if (shaded > 1) wrong.push(label(shaded - 1, parts));
  const unique = [...new Set(wrong)].filter((o) => o !== answer && !o.startsWith("0/") && !/\/0$/.test(o));
  return shuffle([answer, ...shuffle(unique, rng).slice(0, 3)], rng);
}

function simplestOptions(rng, shaded, parts, answer) {
  const g = gcd(shaded, parts);
  const [n, d] = [shaded / g, parts / g];
  const wrong = [label(shaded, parts), label(d - n, d), label(n + 1, d), label(n, d + 1), label(parts - shaded, parts)];
  const unique = [...new Set(wrong)].filter((o) => o !== answer && !o.startsWith("0/"));
  return shuffle([answer, ...shuffle(unique, rng).slice(0, 3)], rng);
}

function makeShade(rng, level, avoid) {
  const type = chooseShape(rng, level, avoid);
  const parts = pick(rng, SHAPES[type].counts[level]);
  // Level 3 may name a coarser fraction than the picture is cut into.
  const denominator = level === 3 ? pick(rng, divisors(parts)) : parts;
  const numerator = randInt(rng, 1, denominator - 1);
  const target = (numerator * parts) / denominator;
  return {
    key: `shade-${type}-${parts}-${numerator}/${denominator}`,
    kind: "shade",
    shape: type,
    parts,
    numerator,
    denominator,
    target,
    shaded: [],
    prompt: `Shade ${label(numerator, denominator)} of the ${SHAPES[type].label}`,
    speech: `Shade ${numerator} out of ${denominator} equal parts of the ${SHAPES[type].label}`,
    hint: parts === denominator ? null : `The ${SHAPES[type].label} is cut into ${parts} equal parts.`,
  };
}

function makeName(rng, level, avoid) {
  const type = chooseShape(rng, level, avoid);
  const parts = pick(rng, SHAPES[type].counts[level]);
  let shaded = randInt(rng, 1, parts - 1);
  if (level === 3) {
    // Prefer a reducible fraction so "simplest form" has something to do.
    const reducible = Array.from({ length: parts - 1 }, (_, i) => i + 1).filter((s) => gcd(s, parts) > 1);
    if (reducible.length > 0) shaded = pick(rng, reducible);
  }
  const g = level === 3 ? gcd(shaded, parts) : 1;
  const answer = label(shaded / g, parts / g);
  const order = Array.from({ length: parts }, (_, i) => i);
  const picked = level === 3 ? shuffle(order, rng).slice(0, shaded) : order.slice(0, shaded);
  return {
    key: `name-${type}-${shaded}/${parts}`,
    kind: "name",
    shape: type,
    parts,
    numerator: shaded,
    denominator: parts,
    shaded: picked.sort((a, b) => a - b),
    answer,
    options: level === 3 ? simplestOptions(rng, shaded, parts, answer) : nameOptions(rng, shaded, parts, answer),
    prompt: level === 3 ? "What fraction is shaded? Write it in its simplest form." : "What fraction is shaded?",
    speech: level === 3 ? "What fraction is shaded? Give it in its simplest form." : "What fraction of the shape is shaded?",
    hint: null,
  };
}

/** `avoid` is the previous shape type, so a shape is not repeated back to back. */
export function makeFractionQuestion(rng, level, kind = "shade", avoid = null) {
  assertLevel(level);
  if (!KINDS.includes(kind)) throw new RangeError(`Unknown Fraction Fun kind: ${kind}`);
  return kind === "name" ? makeName(rng, level, avoid) : makeShade(rng, level, avoid);
}
