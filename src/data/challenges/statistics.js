/**
 * Statistics — the pure maths behind the five Statistics games.
 *
 * No React here, and every randomising function takes `rng`, so `node --test`
 * can reach all of it. The whole category is "interpret and construct simple
 * pictograms, tally charts, block diagrams and tables", which means almost
 * every question is a *reading* of a dataset. So the rule this module follows
 * is: an ambiguous dataset answers `null` rather than picking a winner.
 *
 * A tie is the specific danger. "Which is most popular?" over two rows on 10
 * has two correct answers while the challenge would accept one, marking a
 * learner wrong for being right. `mostPopular`, `leastPopular` and
 * `sortByQuantity` all return `null` there, and `hasUniqueValues` is the guard
 * a dataset passes before it is ever asked about.
 */

/** One tally gate is five marks — four uprights and one across. */
export const TALLY_GATE = 5;

/** The many-to-one ratios the non-statutory guidance names. */
export const PICTOGRAM_RATIOS = [2, 5, 10];

/**
 * Splits a count into gates of five plus whatever is left over.
 * 12 -> [5, 5, 2]. A trailing zero is never emitted, so 10 -> [5, 5].
 */
export function tallyGroups(count) {
  const groups = [];
  let left = count;
  while (left >= TALLY_GATE) {
    groups.push(TALLY_GATE);
    left -= TALLY_GATE;
  }
  if (left > 0) groups.push(left);
  return groups;
}

export function countFromGroups(groups) {
  return groups.reduce((sum, group) => sum + group, 0);
}

/**
 * How many symbols a value needs when one symbol stands for `ratio` things.
 *
 * Throws on a value that is not a whole number of symbols: half symbols are
 * out of scope here, and drawing 3.5 symbols as 3 would make the picture
 * disagree with the answer. Loud beats silently wrong.
 */
export function symbolCount(value, ratio) {
  if (value % ratio !== 0) {
    throw new Error(`${value} is not a whole number of symbols at 1:${ratio}`);
  }
  return value / ratio;
}

export function valueFromSymbols(symbols, ratio) {
  return symbols * ratio;
}

/** rows are [{ label, value }] throughout. */
export function total(rows) {
  return rows.reduce((sum, row) => sum + row.value, 0);
}

function extreme(rows, pick) {
  if (rows.length === 0) return null;
  const best = rows.reduce((a, b) => (pick(b.value, a.value) ? b : a));
  const tied = rows.filter((row) => row.value === best.value).length > 1;
  return tied ? null : best.label;
}

export function mostPopular(rows) {
  return extreme(rows, (candidate, best) => candidate > best);
}

export function leastPopular(rows) {
  return extreme(rows, (candidate, best) => candidate < best);
}

function valueOf(rows, label) {
  const row = rows.find((r) => r.label === label);
  if (!row) throw new Error(`no category called "${label}"`);
  return row.value;
}

/** How many more one category has than another — always positive. */
export function difference(rows, a, b) {
  return Math.abs(valueOf(rows, a) - valueOf(rows, b));
}

/**
 * The category labels in quantity order, or `null` if any two rows tie —
 * a tie means several arrangements are correct and the question is unfair.
 */
export function sortByQuantity(rows, direction) {
  if (!hasUniqueValues(rows)) return null;
  const sorted = [...rows].sort((a, b) =>
    direction === "fewest-first" ? a.value - b.value : b.value - a.value
  );
  return sorted.map((row) => row.label);
}

export function hasUniqueValues(rows) {
  return new Set(rows.map((row) => row.value)).size === rows.length;
}

/**
 * Turns a loose pile of collected things into chart rows, in the order the
 * categories were given (not sorted — sorting them is the learner's job).
 *
 * An item outside the categories throws: dropping it would make the chart
 * disagree with the pile the learner is counting.
 */
export function countByCategory(items, categories) {
  const rows = categories.map((label) => ({ label, value: 0 }));
  for (const item of items) {
    const row = rows.find((r) => r.label === item);
    if (!row) throw new Error(`"${item}" is not one of the categories`);
    row.value += 1;
  }
  return rows;
}

/** 0, step, 2*step ... up to the first tick at or above `max`. */
export function axisTicks(max, step) {
  const ticks = [];
  for (let value = 0; value < max; value += step) ticks.push(value);
  ticks.push(ticks.length === 0 ? 0 : ticks[ticks.length - 1] + step);
  return ticks;
}

export function shuffle(items, rng) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * The answer plus off-by-a-few near misses. Random numbers get eliminated
 * without doing the maths; one-more and one-less have to be counted.
 * Never negative, never a duplicate.
 */
export function nearMissOptions(answer, count, rng) {
  const options = [answer];
  // Zero is excluded against a non-zero answer: a chart row with anything on
  // it rules out "none" at a glance, which turns a four-way question into a
  // three-way one for nothing.
  const floor = answer === 0 ? 0 : 1;
  for (let distance = 1; options.length < count; distance += 1) {
    for (const candidate of [answer - distance, answer + distance]) {
      if (candidate < floor || options.includes(candidate)) continue;
      options.push(candidate);
      if (options.length === count) break;
    }
  }
  return shuffle(options, rng);
}

/**
 * Answer options for "how many does this row show?" on a pictogram.
 *
 * The first distractor is deliberate: the number of SYMBOLS. Reading three
 * symbols at 1:5 as "3" is the pictogram mistake, and if that number is not
 * on screen the question can be answered without ever using the key — which
 * is the only thing the question is really about. The rest are whole symbols
 * out, because an option like 14 at 1:5 can be eliminated without counting.
 */
export function pictogramOptions(value, ratio, count, rng) {
  const symbols = symbolCount(value, ratio);
  const options = [value];
  if (symbols !== value) options.push(symbols);

  // Never zero against a non-zero answer - see nearMissOptions.
  const floor = value === 0 ? 0 : 1;
  for (let distance = 1; options.length < count; distance += 1) {
    for (const candidate of [value - distance * ratio, value + distance * ratio]) {
      if (candidate < floor || options.includes(candidate)) continue;
      options.push(candidate);
      if (options.length === count) break;
    }
  }
  return shuffle(options, rng);
}

/**
 * Keeps a stepped count inside its range.
 *
 * The +/− controls on a pictogram or tally chart ADD to what is there, so
 * they carry the same hazard as the number keypad: two fast taps can land in
 * one React batch, and a step applied to a stale value either loses a tap or
 * overshoots the limit. The challenge applies the step functionally and
 * clamps here, so neither can happen.
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
