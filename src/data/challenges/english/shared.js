/**
 * Small pure helpers every English question builder shares.
 *
 * Builders take `rng` (a () => [0, 1) function) so challenges randomise per
 * mount while tests stay deterministic.
 */

/** A shuffled copy (Fisher–Yates). */
export function shuffle(items, rng) {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** `count` distinct items, in random order. Throws if the bank is too small. */
export function sample(items, count, rng) {
  if (items.length < count) {
    throw new Error(`bank has ${items.length} items, ${count} needed`);
  }
  return shuffle(items, rng).slice(0, count);
}

/**
 * How a typed or built answer is compared: case, spacing and the two
 * apostrophe and quote styles do not matter. "Who’s" and "who's" are one
 * answer; "who s" is not.
 */
export function normaliseAnswer(text) {
  return String(text ?? "")
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function isSameAnswer(given, expected) {
  return normaliseAnswer(given) === normaliseAnswer(expected);
}

/** Splits a sentence into display tokens, keeping punctuation on its word. */
export function tokenise(sentence) {
  return sentence.trim().split(/\s+/);
}

/** A token with its surrounding punctuation removed, lower case. */
export function bareWord(token) {
  return token.replace(/^[^A-Za-z’']+|[^A-Za-z’']+$/g, "").toLowerCase();
}
