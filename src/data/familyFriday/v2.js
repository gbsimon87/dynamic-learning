import pool from './curriculum-v2.js';
import { ANIMAL_QUESTIONS, WORLD_QUESTIONS } from './v1.js';
import { randInt, seeded, shuffle } from '../freePlay/random.js';

const SUBJECTS = { math: 'Number nudge', english: 'Word wonder', science: 'Science surprise', history: 'Time explorers', geography: 'Our amazing world', art: 'Art detective', computing: 'Computing curiosity', design: 'Clever designs', french: 'French connection', music: 'Music moment', pe: 'Move and play', wellbeing: 'Feeling good' };
const TITLES = ['Big little discoveries', 'A pinch of wonder', 'Five curious questions', 'Think, chat, discover', 'Wonder together', 'A little Friday fun', 'Your curious crew', 'Small quiz, big smiles'];
const DISCOVERIES = [...ANIMAL_QUESTIONS, ...WORLD_QUESTIONS];
const TIERS = [[1, 2], [3, 4], [5, 6]];
export const RECENT_FAMILY_WEEKS = 12;
const groups = new Map();
for (const question of pool) {
  const { year, subject } = question.curriculum;
  const key = `${year}:${subject}`;
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(question);
}

// Choose a subject before a question: a large English bank must not crowd out
// smaller subjects. Search is bounded even if a future pool becomes sparse.
function draw(years, subjects, recent, selected, rng) {
  const available = shuffle(Object.keys(SUBJECTS).filter(subject => !subjects.has(subject)), rng);
  for (const subject of available) for (const year of shuffle(years, rng)) {
    const deck = groups.get(`${year}:${subject}`) ?? [];
    if (!deck.length) continue;
    const start = randInt(rng, 0, deck.length - 1);
    for (let offset = 0; offset < deck.length; offset += 1) {
      const question = deck[(start + offset) % deck.length];
      if (!recent.has(question.id) && !selected.has(question.id)) return question;
    }
  }
  return null;
}

/** Reconstruct only IDs for earlier weeks; no browser storage or server job.
 * This makes the repeat guard identical for new visitors and returning families.
 * Cost grows with elapsed weeks, with four small bounded deck searches per week.
 */
function curriculumQuestions(index) {
  const history = [];
  let questions;
  // Index 0 belongs to the immutable launch edition; V2 begins at index 1.
  for (let week = 1; week <= index; week += 1) {
    const rng = seeded(Math.imul(week + 1, 2654435761));
    const recent = new Set(history.flat());
    const subjects = new Set(), selected = new Set();
    questions = [];
    for (const tier of [0, 1, 2, (week - 1) % 3]) {
      const question = draw(TIERS[tier], subjects, recent, selected, rng)
        ?? draw(TIERS.flat(), subjects, recent, selected, rng)
        ?? draw(TIERS.flat(), subjects, new Set(), selected, rng)
        ?? draw(TIERS.flat(), new Set(), new Set(), selected, rng);
      if (!question) throw new Error('Family Friday publication bank needs four distinct questions');
      questions.push(question);
      subjects.add(question.curriculum.subject);
      selected.add(question.id);
    }
    history.push([...selected]);
    if (history.length > RECENT_FAMILY_WEEKS) history.shift();
  }
  return questions;
}

/** Four curriculum questions across Years 1–6, plus one family discovery.
 * Frozen data + versioned selection preserve every published edition forever.
 */
export function curriculumEdition(week, index) {
  const rng = seeded(Math.imul(index + 1, 2246822519));
  const curriculum = curriculumQuestions(index).map(question => ({ ...question, category: SUBJECTS[question.curriculum.subject] }));
  const discovery = DISCOVERIES[(index - 1) % DISCOVERIES.length];
  const questions = shuffle([...curriculum, { ...discovery, category: 'Family discovery' }], rng)
    .map(question => ({ ...structuredClone(question), options: shuffle([...question.options], rng) }));
  return { week, number: index + 1, title: TITLES[index % TITLES.length], questions };
}
