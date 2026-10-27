import { shuffle } from "./random.js";

/**
 * Times Tables Race: the pure parts.
 *
 * A fact is { a, b } and is asked as "a × b". Choosing tables from..to deals
 * every fact with one factor in that range and the other from 1 to 12, in
 * both orders (3 × 8 and 8 × 3 are different questions that share an answer).
 * A result is { fact, ms, misses }: how long the child took to get that
 * question right and how many wrong tries came first.
 */

export const MAX_TABLE = 20;
export const MULTIPLIER_MAX = 12;
/** A round adds this to the clock for every wrong try, so guessing never pays. */
export const PENALTY_MS = 3000;
/** Slower than this counts as a fact to practise, even when it was right. */
export const SLOW_MS = 5000;

export const ROUND_SIZES = [10, 20, 30];
export const COUNTDOWN_SECONDS = [30, 60, 90];

/** Keeps from <= to when one end of the range is changed. */
export function adjustRange({ from, to }, changed) {
  if (changed === "from" && from > to) return { from, to: from };
  if (changed === "to" && to < from) return { from: to, to };
  return { from, to };
}

export const answerOf = (fact) => fact.a * fact.b;
export const factLabel = (fact) => `${fact.a} × ${fact.b}`;
const factKey = (fact) => `${fact.a}x${fact.b}`;

export function buildFacts(from, to) {
  const seen = new Set();
  const facts = [];
  for (let table = from; table <= to; table += 1) {
    for (let other = 1; other <= MULTIPLIER_MAX; other += 1) {
      for (const fact of [{ a: table, b: other }, { a: other, b: table }]) {
        if (seen.has(factKey(fact))) continue;
        seen.add(factKey(fact));
        facts.push(fact);
      }
    }
  }
  return facts;
}

/**
 * Deals every fact once, shuffled, then deals them all again: nothing repeats
 * until the whole pool has been asked, and the same fact never comes twice in
 * a row across a reshuffle.
 */
export function createDeck(facts, rng) {
  let pile = [];
  let last = null;
  return {
    next() {
      if (pile.length === 0) {
        pile = shuffle(facts, rng);
        if (facts.length > 1 && last && factKey(pile[pile.length - 1]) === factKey(last)) {
          [pile[0], pile[pile.length - 1]] = [pile[pile.length - 1], pile[0]];
        }
      }
      last = pile.pop();
      return last;
    },
  };
}

export function summarise(results, { penalise = false } = {}) {
  const answered = results.length;
  const firstTry = results.filter((r) => r.misses === 0).length;
  const misses = results.reduce((sum, r) => sum + r.misses, 0);
  const answeringMs = results.reduce((sum, r) => sum + r.ms, 0);
  return {
    answered,
    firstTry,
    misses,
    accuracy: answered === 0 ? 0 : Math.round((firstTry / answered) * 100),
    totalMs: answeringMs + (penalise ? misses * PENALTY_MS : 0),
  };
}

/** The slowest answers, longest first, one per fact. */
export function slowest(results, count = 3) {
  const best = new Map();
  for (const r of results) {
    const key = factKey(r.fact);
    if (!best.has(key) || r.ms > best.get(key).ms) best.set(key, r);
  }
  return [...best.values()].sort((x, y) => y.ms - x.ms).slice(0, count);
}

/** Facts that took more than one try, most misses first, one per fact. */
export function missed(results) {
  const total = new Map();
  for (const r of results) {
    if (r.misses === 0) continue;
    const key = factKey(r.fact);
    total.set(key, { fact: r.fact, misses: (total.get(key)?.misses ?? 0) + r.misses });
  }
  return [...total.values()].sort((x, y) => y.misses - x.misses);
}

/** Missed or slow facts: what "Practise my tricky ones" replays. */
export function trickyFacts(results) {
  const seen = new Set();
  const facts = [];
  const add = (fact) => {
    if (seen.has(factKey(fact))) return;
    seen.add(factKey(fact));
    facts.push(fact);
  };
  missed(results).forEach((m) => add(m.fact));
  slowest(results, results.length).filter((r) => r.ms >= SLOW_MS).forEach((r) => add(r.fact));
  return facts;
}

export const formatSeconds = (ms) => `${(ms / 1000).toFixed(1)}s`;
