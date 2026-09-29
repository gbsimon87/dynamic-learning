/**
 * The words a child sees at a success moment, rotated so they never feel
 * canned: the same line is never shown twice in a row.
 *
 * Some lines use the child's name. A line with `{name}` is only eligible when a
 * name is known, so a profile without one never reads "Brilliant, !".
 *
 * Pure: `pickMessage` takes its randomness and the last id shown as arguments.
 * `nextMessage` is the stateful convenience the UI calls; it remembers the last
 * line per kind in module memory only — never storage, it is not worth keeping.
 */

export const MESSAGES = {
  // Per answer, inside a challenge.
  correct: ["Correct!", "Yes! Well done!", "Spot on!", "Brilliant!", "You got it!", "Super!"],
  wrong: [
    "Nearly! Have another go.",
    "Not quite — try again!",
    "So close! Give it another try.",
    "Keep going — you can do it!",
  ],
  last: ["All done! Brilliant work!", "That's the lot — amazing!"],

  // Completion headlines, by milestone level.
  practice: ["Great practice!", "Practice makes progress, {name}!", "Sharp as ever!"],
  challenge: [
    "You did it!",
    "Brilliant, {name}!",
    "Challenge smashed!",
    "Super work, {name}!",
    "Nailed it!",
    "Fantastic!",
  ],
  topic: ["Topic complete!", "Topic complete, {name}!", "You're a star, {name}!", "Whole topic done!"],
  category: ["Quest complete!", "Quest conquered, {name}!", "What a quest!"],
  subject: ["{subject} complete!", "You finished {subject}, {name}!"],
  year: ["Year {year} complete!", "Year {year} champion, {name}!"],
};

function fill(template, values) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ""));
}

/**
 * @param {string} kind  a key of MESSAGES
 * @param {object} options
 *   name, subject, year  fill the placeholders
 *   previousId           the id shown last time; never returned again
 *   random               () => [0, 1), injectable for tests
 * @returns {{id: string, text: string}}
 */
export function pickMessage(kind, { name, subject, year, previousId, random = Math.random } = {}) {
  const pool = (MESSAGES[kind] ?? MESSAGES.challenge)
    .map((template, index) => ({ id: `${kind}:${index}`, template }))
    .filter((entry) => name || !entry.template.includes("{name}"));

  const fresh = pool.length > 1 ? pool.filter((entry) => entry.id !== previousId) : pool;
  const choice = fresh[Math.min(fresh.length - 1, Math.floor(random() * fresh.length))];
  return { id: choice.id, text: fill(choice.template, { name, subject, year }) };
}

const lastShown = new Map();

/** `pickMessage`, remembering the last line per kind for this page session. */
export function nextMessage(kind, options = {}) {
  const message = pickMessage(kind, { ...options, previousId: lastShown.get(kind) });
  lastShown.set(kind, message.id);
  return message.text;
}
