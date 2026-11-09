import { ch, od, st, nm, bd } from "../topicBank.js";
import { shuffle } from "../year1Math/shared.js";
import { int, pick, times, nearNumbers } from "../year5Computing/shared.js";

/** A choice whose answer is a number, with nearby wrong numbers. */
const numberPick = (rng, prompt, answer, min = 0) => ch(prompt, String(answer), nearNumbers(rng, answer, 3, min));

// Year 6 Algorithms: searching, sorting and counting steps to compare them. Every answer is
// computed by the helpers below from the list the question shows.

/** How many items a linear search checks to find `target` (it checks from the start). */
export const linearChecks = (list, target) => list.indexOf(target) + 1;
/** Guesses a halving search makes to find `target` between lo and hi, guessing the middle (rounded down). */
export function halvingGuesses(lo, hi, target) {
  let guesses = 0;
  while (lo <= hi) {
    guesses += 1;
    const mid = Math.floor((lo + hi) / 2);
    if (mid === target) return guesses;
    if (mid < target) lo = mid + 1; else hi = mid - 1;
  }
  return guesses;
}
/** Most guesses a halving search ever needs for 1..n. */
export const worstHalving = (n) => Math.ceil(Math.log2(n + 1));
/** One bubble-sort pass, smallest first: returns the new list and how many swaps it made. */
export function bubblePass(list) {
  const out = [...list]; let swaps = 0;
  for (let i = 0; i < out.length - 1; i += 1) if (out[i] > out[i + 1]) { [out[i], out[i + 1]] = [out[i + 1], out[i]]; swaps += 1; }
  return { out, swaps };
}
/** Total swaps a full bubble sort makes: the number of pairs that are the wrong way round. */
export const totalSwaps = (list) => list.reduce((sum, a, i) => sum + list.slice(i + 1).filter((b) => b < a).length, 0);

const distinct = (rng, count, lo, hi) => shuffle(rng, Array.from({ length: hi - lo + 1 }, (_, i) => lo + i)).slice(0, count);
const show = (list) => list.join(", ");

/* ====================================================================
   Searching algorithms
   ==================================================================== */
export const searching = {
  rule: "A linear search checks items one at a time from the start until it finds what it wants. A halving search only works on a sorted list: check the middle, then throw away the half the item cannot be in, and repeat.",
  hint: "For a linear search, count along from the start. For a halving search, find the middle each time and keep only one half.",
  levels: {
    1: [
      ...times(8, () => (rng) => { const list = distinct(rng, 7, 1, 30); const t = pick(rng, list); return numberPick(rng, `A linear search looks for ${t} in this list: ${show(list)}. How many numbers does it check?`, linearChecks(list, t), 1); }),
      ch("What does a **linear search** do?", "Checks each item in turn from the start", ["Checks only the middle item", "Sorts the list first", "Guesses at random"]),
      ch("What must be true before you can use a halving search?", "The list must be sorted", ["The list must be short", "The list must have no numbers", "The list must start at 0"]),
      ch("In a halving search, which item do you check first?", "The middle one", ["The first one", "The last one", "A random one"]),
    ],
    2: [
      ...times(8, () => (rng) => { const n = pick(rng, [15, 31, 63, 100]); const t = int(rng, 1, n); return numberPick(rng, `Guess my number from 1 to ${n}. Each time you guess the middle of what is left (rounding down) and I say higher or lower. My number is ${t}. How many guesses do you need?`, halvingGuesses(1, n, t), 1); }),
      ...times(6, () => (rng) => { const n = pick(rng, [20, 30, 40, 50]); const lo = 1; const mid = Math.floor((lo + n) / 2); return ch(`You are guessing a number from 1 to ${n} with a halving search. What is your first guess?`, String(mid), [String(lo), String(n), String(mid + 5)]); }),
    ],
    3: [
      od("Put the steps of a halving search in order.", ["Check the middle item", "If it is the one you want, stop", "If not, throw away the half it cannot be in", "Repeat with the half that is left"]),
      st("Which search does this describe?", ["Linear search", "Halving search"], [["Starts at the first item", 0], ["Checks items one at a time", 0], ["Works on an unsorted list", 0], ["Starts in the middle", 1], ["Throws away half each time", 1], ["Needs a sorted list", 1]]),
      od("Put the steps in order to find a word in a dictionary by halving.", ["Open the dictionary near the middle", "Decide if the word comes before or after", "Keep only that half", "Repeat until you find the word"]),
      od("Put the steps of a linear search in order.", ["Start at the first item", "Check if it is the one you want", "If not, move to the next item", "Stop when you find it or reach the end"]),
      st("Can you use a halving search on this list?", ["Yes: it is sorted", "No: it is not sorted"], [["2, 5, 9, 14, 20", 0], ["1, 3, 4, 8, 11", 0], ["apple, banana, cherry, grape", 0], ["9, 2, 14, 5, 20", 1], ["8, 1, 11, 3, 4", 1], ["grape, apple, cherry, banana", 1]]),
      ...times(4, () => (rng) => { const n = 31; const t = int(rng, 1, n); const seq = []; let lo = 1; let hi = n; while (lo <= hi) { const m = Math.floor((lo + hi) / 2); seq.push(String(m)); if (m === t) break; if (m < t) lo = m + 1; else hi = m - 1; } if (seq.length < 3) return null; return bd(`Guess a number from 1 to 31 by halving, rounding down. The number is ${t}. Build your guesses in order.`, seq.join(" ")); }),
    ],
    4: [
      ...times(5, () => (rng) => { const n = pick(rng, [7, 15, 31, 63, 127]); return nm(`What is the most guesses a halving search ever needs for a number from 1 to ${n}?`, worstHalving(n)); }),
      ...times(5, () => (rng) => { const list = distinct(rng, 9, 1, 50); const t = pick(rng, list); return nm(`A linear search looks for ${t} in ${show(list)}. How many numbers does it check?`, linearChecks(list, t)); }),
      ...times(5, () => (rng) => { const n = pick(rng, [50, 100]); const t = int(rng, 1, n); return nm(`Halving search from 1 to ${n}, guessing the middle and rounding down. The number is ${t}. How many guesses?`, halvingGuesses(1, n, t)); }),
    ],
  },
};

/* ====================================================================
   Sorting algorithms
   ==================================================================== */
export const sorting = {
  rule: "A bubble sort walks along the list comparing two neighbours at a time. If they are the wrong way round, it swaps them. One walk along the list is a pass. It keeps making passes until a whole pass has no swaps.",
  hint: "Compare the first two, swap if needed, then move one place along. Write the list again after each swap.",
  levels: {
    1: [
      ...times(8, () => (rng) => { const a = int(rng, 1, 30); let b = int(rng, 1, 30); if (a === b) b += 1; const swap = a > b; return ch(`Bubble sort, smallest first. It compares ${a} and ${b}. What does it do?`, swap ? "Swap them" : "Leave them", [swap ? "Leave them" : "Swap them"]); }),
      ch("What is one **pass** of a bubble sort?", "One walk along the list comparing neighbours", ["Sorting the list in one step", "Swapping the first and last items", "Picking a random item"]),
      ch("When does a bubble sort stop?", "When a whole pass makes no swaps", ["After exactly one pass", "When the list is empty", "After every item has moved"]),
      ch("Which list is sorted smallest first?", "3, 7, 12, 19", ["7, 3, 12, 19", "19, 12, 7, 3", "3, 12, 7, 19"]),
    ],
    2: [
      ...times(8, () => (rng) => {
        const list = distinct(rng, 5, 1, 20); const { out } = bubblePass(list);
        if (out.join() === list.join()) return null;
        const wrong = [[...list].sort((x, y) => x - y), [...list].reverse(), [list[1], list[0], ...list.slice(2)]].map(show).filter((w) => w !== show(out));
        return ch(`Bubble sort, smallest first. What is the list after ONE pass? Start: ${show(list)}`, show(out), [...new Set(wrong)]);
      }),
      ...times(6, () => (rng) => { const list = distinct(rng, 5, 1, 20); return numberPick(rng, `How many swaps does ONE pass of a bubble sort make on ${show(list)}? (Smallest first.)`, bubblePass(list).swaps, 0); }),
    ],
    3: [
      ...times(6, () => (rng) => { const list = distinct(rng, 5, 1, 50); return od(`Sort these numbers, smallest first: ${show(list)}`, [...list].sort((x, y) => x - y).map(String)); }),
      od("Put the bubble sort steps in order.", ["Compare the first two items", "Swap them if they are the wrong way round", "Move one place along and compare again", "At the end of the list, start a new pass", "Stop when a pass makes no swaps"]),
      od("Sort these words into alphabetical order.", ["apple", "kite", "moon", "robot", "zebra"]),
      ...times(4, () => (rng) => { const list = distinct(rng, 4, 1, 20); const { out } = bubblePass(list); return bd(`Bubble sort, smallest first. Build the list after ONE pass. Start: ${show(list)}`, out.join(" ")); }),
    ],
    4: [
      ...times(8, () => (rng) => { const list = distinct(rng, 5, 1, 30); return nm(`How many swaps does a full bubble sort make to put ${show(list)} smallest first?`, totalSwaps(list)); }),
      ...times(6, () => (rng) => { const list = distinct(rng, 6, 1, 40); return nm(`How many swaps does ONE pass of a bubble sort make on ${show(list)}? (Smallest first.)`, bubblePass(list).swaps); }),
    ],
  },
};

/* ====================================================================
   Comparing algorithms
   ==================================================================== */
export const comparing = {
  rule: "Two algorithms can solve the same problem in a different number of steps. To compare them, count the steps each one needs. For a long sorted list, a halving search needs far fewer checks than a linear search.",
  hint: "Count the steps for each algorithm on the same problem, then pick the one with fewer.",
  levels: {
    1: [
      ...times(6, () => (rng) => { const n = pick(rng, [10, 50, 100, 500]); return numberPick(rng, `A linear search looks through ${n} names and the one it wants is last. How many names does it check?`, n, 1); }),
      ch("Why do we compare algorithms?", "To find the one that solves the problem with fewer steps", ["To find the one with the longest name", "To make programs slower", "To use more memory"]),
      ch("Which is usually faster for finding a word in a sorted dictionary?", "A halving search", ["A linear search from page 1", "Reading every page twice", "Starting at a random page each time"]),
      ch("Two programs give the same answer. One takes 10 steps and one takes 100. Which is more efficient?", "The one that takes 10 steps", ["The one that takes 100 steps", "They are the same", "Neither"]),
    ],
    2: [
      ...times(8, () => (rng) => { const n = pick(rng, [15, 31, 63, 127]); const lin = n; const half = worstHalving(n); return ch(`The item is last in a sorted list of ${n}. Linear search checks ${lin} items. Halving needs at most ${half}. Which needs fewer checks?`, "Halving search", ["Linear search", "They need the same"]); }),
      ...times(6, () => (rng) => { const a = int(rng, 2, 6); const b = int(rng, 2, 6); const c = a * b; const d = int(rng, 4, 12); if (c === d) return null; const better = c < d ? "Program A" : "Program B"; return ch(`Program A repeats ${a} times inside a loop that repeats ${b} times. Program B has ${d} steps in a row. Which runs fewer steps?`, better, [better === "Program A" ? "Program B" : "Program A", "They are the same"]); }),
    ],
    3: [
      od("Put the searches in order, from fewest to most checks, for the last item in a sorted list of 100.", ["Halving search (7 checks)", "Linear search from the start (100 checks)", "Checking every item twice (200 checks)"]),
      st("For each list, which search is better?", ["Halving search", "Linear search"], [["A sorted list of 1,000 names", 0], ["Page numbers in a book", 0], ["A dictionary", 0], ["A shuffled pile of 1,000 cards", 1], ["An unsorted list of scores", 1], ["Names in the order people arrived", 1]]),
      ...times(4, () => (rng) => { const ns = shuffle(rng, [7, 15, 31, 63, 127]).slice(0, 4).sort((x, y) => x - y); return od("Put the sorted lists in order, from the fewest to the most halving guesses needed at most.", ns.map((n) => `A list of ${n} items`)); }),
    ],
    4: [
      ...times(5, () => (rng) => { const n = pick(rng, [15, 31, 63, 127, 255]); return nm(`For a sorted list of ${n}, a linear search may need ${n} checks. A halving search needs at most ${worstHalving(n)}. How many fewer checks is that?`, n - worstHalving(n)); }),
      ...times(5, () => (rng) => { const a = int(rng, 3, 9); const b = int(rng, 3, 9); return nm(`An algorithm has a loop of ${a} steps that repeats ${b} times. How many steps is that altogether?`, a * b); }),
      ...times(5, () => (rng) => { const n = pick(rng, [4, 5, 6]); return nm(`The worst case for a bubble sort is a list in reverse order. How many swaps does it make for a list of ${n} items in reverse order?`, (n * (n - 1)) / 2); }),
    ],
  },
};
