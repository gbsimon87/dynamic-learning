import { makeQuestion } from "../year1Science/engine.js";
import { shuffle } from "../year1Math/shared.js";

/**
 * A History topic is a story card and a bank of question templates per level
 * (docs/history-curriculum/shared-design-spec.md §3–4):
 *
 *   { year, references, levels: { 1: { story, rounds: [bankName × n] }, … }, banks }
 *
 * `story` is { lines: [one sentence each], image? } or { lines, picture,
 * pictureLabel }. Templates are the Year 1 Science template types (choice,
 * sort, order; see ../year1Science/engine.js) plus `answeredBy`: the phrase(s)
 * on the story card, or in the source picture's alt text, that answer it.
 * `lintHistoryTopic` checks those phrases are really there, so a child can
 * always find the answer instead of guessing.
 *
 * Runs draw templates without replacement; randomness comes only from `rng`.
 */
export const HISTORY_AGE = {
  1: { storyWords: 30, sentenceWords: 10, rounds: 4, minBank: 6, options: 3 },
  2: { storyWords: 45, sentenceWords: 12, rounds: 5, minBank: 7, options: 3 },
  3: { storyWords: 60, sentenceWords: 16, rounds: 5, minBank: 7, options: 3 },
  4: { storyWords: 70, sentenceWords: 18, rounds: 5, minBank: 7, options: 3 },
};

export const HISTORY_TITLES = {
  1: ["Meet it", "Old or new?", "Picture detective", "Same or different?"],
  2: ["Meet it", "Long ago or now?", "History detective", "Compare and remember"],
  3: ["Meet it", "When was it?", "History detective", "Think like a historian"],
  4: ["Meet it", "When was it?", "History detective", "Think like a historian"],
};

const words = (text) => String(text).split(/\s+/).filter(Boolean);
const phrases = (answeredBy) => [answeredBy].flat().filter((p) => typeof p === "string" && p.trim() !== "");

export function buildHistoryTopic(topic) {
  const age = HISTORY_AGE[topic.year];
  if (!age) throw new Error(`no History age settings for year ${topic.year}`);
  return (level, rng) => {
    const plan = topic.levels[level];
    if (!plan) throw new Error(`no level ${level}`);
    const decks = {};
    const draw = (name) => {
      if (!topic.banks[name]) throw new Error(`unknown bank "${name}"`);
      decks[name] ??= shuffle(rng, topic.banks[name]);
      const next = decks[name].shift();
      if (!next) throw new Error(`bank "${name}" ran out`);
      return next;
    };
    const questions = plan.rounds.map((name) => makeQuestion({ count: age.options, ...draw(name) }, rng, level));
    return { story: plan.story, questions };
  };
}

/** Everything that would make a topic unfair for its year, as short strings. */
export function lintHistoryTopic(topic, { images = {} } = {}) {
  const age = HISTORY_AGE[topic?.year];
  if (!age) return [`unknown year ${topic?.year}`];
  const problems = [];
  const need = (ok, message) => { if (!ok) problems.push(message); };
  need(Array.isArray(topic.references) && topic.references.length > 0, "no references");
  const types = new Set();

  for (const level of [1, 2, 3, 4]) {
    const plan = topic.levels?.[level];
    const at = (message) => `level ${level}: ${message}`;
    if (!plan) { problems.push(at("missing")); continue; }

    const story = plan.story ?? {};
    const lines = Array.isArray(story.lines) ? story.lines : [];
    need(lines.length > 0 && lines.every((line) => typeof line === "string" && line.trim() !== ""), at("story needs lines"));
    const text = lines.join(" ");
    const count = words(text).length;
    need(count <= age.storyWords, at(`story has ${count} words (max ${age.storyWords})`));
    for (const line of lines) need(words(line).length <= age.sentenceWords, at(`sentence too long: "${line}"`));
    need(Boolean(story.image) || (Boolean(story.picture) && Boolean(story.pictureLabel)), at("story needs an image or a picture with a label"));
    if (story.image) need(Boolean(images[story.image]), at(`unknown image "${story.image}"`));

    const rounds = Array.isArray(plan.rounds) ? plan.rounds : [];
    need(rounds.length === age.rounds, at(`needs ${age.rounds} rounds`));
    const uses = {};
    for (const name of rounds) uses[name] = (uses[name] ?? 0) + 1;

    let pool = 0;
    for (const [name, drawn] of Object.entries(uses)) {
      const bank = topic.banks?.[name];
      if (!Array.isArray(bank)) { problems.push(at(`unknown bank "${name}"`)); continue; }
      need(bank.length >= drawn, at(`bank "${name}" has ${bank.length} templates but is drawn ${drawn} times`));
      pool += bank.length;
      bank.forEach((template, i) => {
        const where = at(`bank "${name}" #${i + 1}`);
        if (typeof template !== "object" || template === null) { problems.push(`${where}: not a template object`); return; }
        types.add(template.type);
        const sourceId = template.visual?.type === "source" ? template.visual.image : null;
        const source = sourceId ? images[sourceId] : null;
        if (sourceId) need(Boolean(source), `${where}: unknown image "${sourceId}"`);
        const found = phrases(template.answeredBy);
        need(found.length > 0, `${where}: no answeredBy`);
        const haystack = `${text} ${source?.alt ?? ""} ${images[story.image]?.alt ?? ""}`.toLowerCase();
        for (const phrase of found) need(haystack.includes(phrase.toLowerCase()), `${where}: "${phrase}" is not on the story card or picture`);
      });
    }
    need(pool >= age.minBank, at(`only ${pool} templates to draw from (min ${age.minBank})`));
  }

  need(types.size >= 3, `only ${types.size} round types across the topic (min 3)`);
  return problems;
}
