// Bounded, deterministic generators. All diagrams are plain data, never JSX.
export const int = (rng, min, max) => min + Math.floor(rng() * (max - min + 1));
export const pick = (rng, items) => items[int(rng, 0, items.length - 1)];
export function shuffle(rng, items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = int(rng, 0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
export const run = (make, level, rng) => Array.from({ length: 5 }, (_, i) => make(level, rng, i));
export const numericOptions = (rng, answer, max = 100) => shuffle(rng,
  [...new Set([answer, answer - 1, answer + 1, answer - 2, answer + 2])]
    .filter(n => n >= 0 && n <= max).slice(0, 4));
export function numberQuestion(rng, level, prompt, answer, extra = {}, max = 100) {
  return { kind: level < 3 ? "choice" : "number", prompt, answer,
    ...(level < 3 ? { options: numericOptions(rng, answer, max) } : { maxDigits: 3 }), ...extra };
}
export const choice = (rng, prompt, answer, options, extra = {}) => ({
  kind: "choice", prompt, answer, options: shuffle(rng, options), variant: "wordy", ...extra,
});
export function order(rng, prompt, labels, values = labels.map((_, i) => i)) {
  const sorted = labels.map((label, i) => ({ id: `item-${i}`, label: String(label), value: values[i] }));
  const answer = sorted.map(item => item.id);
  let items = shuffle(rng, sorted);
  if (items.every((item, i) => item.id === answer[i])) items = [...items.slice(1), items[0]];
  return { kind: "order", prompt, items, answer };
}
export const objects = (count, label = "Counters", crossed = 0) => ({ type: "objects", groups: [{ count, label, crossed }] });
export const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function tiles(rng, labels, letters = false) {
  const original = labels.map((label, i) => ({ id: `tile-${i}`, label: String(label) }));
  let result = shuffle(rng, original);
  const join = items => items.map(item => item.label).join(letters ? "" : " ");
  if (join(result) === join(original)) result = [...result.slice(1), result[0]];
  return result;
}
