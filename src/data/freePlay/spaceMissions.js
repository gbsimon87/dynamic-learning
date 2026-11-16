// Laser Blast's question sets: one flight, different things to find. Sums ask
// Arithmetic Practice's questions (spaceArithmeticQuestions.js); Make 10 and
// Count in steps have their own small generators below. Nothing is timed,
// nothing can be lost and nothing is stored: progress comes from the session's
// right answers. Ids are kept from the older missions so best streaks carry on.
import { makeSpaceQuestion } from './spaceArithmeticQuestions.js';

export const MISSIONS = [
  { id: 'blaster', emoji: '➕', title: 'Sums', short: 'Sums', questions: 'practice', dressing: 'ring' },
  { id: 'bonds', emoji: '🔟', title: 'Number bonds', short: 'Bonds', questions: 'bonds', dressing: 'star' },
  { id: 'skip', emoji: '🦘', title: 'Count in steps', short: 'Steps', questions: 'skip', dressing: 'ring' },
];
export const missionById = id => MISSIONS.find(m => m.id === id) ?? MISSIONS[0];

export const BOND_TARGETS = [10, 20, 100];
export const SKIP_STEPS = [2, 3, 4, 5, 10];
export const DEFAULT_MISSION_SETTINGS = { mission: 'blaster', bondTarget: 10, skipStep: 2 };

const randomInt = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const shuffle = list => {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
  return out;
};
/** Four unique options: the answer, then the first allowed wrong ones in order of preference. */
function options(answer, preferred, allowed) {
  const out = [answer];
  for (const n of preferred) if (out.length < 4 && allowed(n) && !out.includes(n)) out.push(n);
  return shuffle(out);
}

/**
 * Number bonds: `a + ? = target`. Bonds to 100 use tens (Year 2). Wrong
 * options are near misses and `a` itself, the number a child may copy.
 */
export function makeBondQuestion(target = 10, previousKey = null) {
  const unit = target === 100 ? 10 : 1;
  let a;
  for (let i = 0; i < 4; i++) {
    a = randomInt(0, target / unit) * unit;
    if (`${a} + ? = ${target}` !== previousKey) break;
  }
  const answer = target - a;
  const near = [answer + unit, answer - unit, a, answer + 2 * unit, answer - 2 * unit, answer + 3 * unit, answer - 3 * unit];
  const prompt = `${a} + ? = ${target}`;
  return {
    key: prompt, prompt, answer, kind: 'bonds', parts: null, bond: { a, target },
    options: options(answer, near, n => n >= 0 && n <= target && n % unit === 0),
  };
}

/**
 * Skip counting: four terms counting up in `step` from a multiple of it, with
 * one of the last three missing. The next and previous terms are always
 * tempting wrong options, so the child has to look at where the gap is.
 */
export function makeSkipQuestion(step = 2, previousKey = null) {
  let start, gap, prompt;
  for (let i = 0; i < 4; i++) {
    start = randomInt(0, 8) * step; gap = randomInt(1, 3);
    prompt = Array.from({ length: 4 }, (_, j) => (j === gap ? '?' : String(start + j * step))).join(', ');
    if (prompt !== previousKey) break;
  }
  const answer = start + gap * step;
  const near = [answer + step, answer - step, answer + 1, answer - 1, answer + 2 * step, answer + 2];
  return {
    key: prompt, prompt, answer, kind: 'skip', parts: null, skip: { step, start, gap },
    speech: `Count in ${step}s. ${prompt.replace('?', 'blank')}. What is the missing number?`,
    options: options(answer, near, n => n >= 0),
  };
}

/** The next question for the chosen set, with the thing its answers ride on (`dressing`). */
export function makeMissionQuestion(settings = {}, previousKey = null) {
  const mission = missionById(settings.mission);
  let question;
  if (mission.questions === 'bonds') question = makeBondQuestion(BOND_TARGETS.includes(settings.bondTarget) ? settings.bondTarget : 10, previousKey);
  else if (mission.questions === 'skip') question = makeSkipQuestion(SKIP_STEPS.includes(settings.skipStep) ? settings.skipStep : 2, previousKey);
  else question = makeSpaceQuestion(settings, previousKey);
  // Calculation grids are wide ovals: they always fly in rings.
  return { ...question, dressing: question.reverse ? 'ring' : mission.dressing };
}

/**
 * Streak power-ups: right first time, back to back, and the rocket powers up.
 * Looks only (the speed never changes); any miss or Show me starts again.
 */
export const STREAK_TIERS = [
  { at: 3, id: 'blazing', emoji: '🔥', name: 'Blazing rocket', colour: 0xffb36b },
  { at: 6, id: 'lightning', emoji: '⚡', name: 'Lightning rocket', colour: 0xc6a8ff },
  { at: 10, id: 'rainbow', emoji: '🌈', name: 'Rainbow rocket', colour: null },
];
export const streakTier = streak => STREAK_TIERS.findLast(tier => streak >= tier.at) ?? null;
