import { SPACE_FLIGHT as F } from './spaceArithmeticConfig.js';
import { nextStreak } from '../answerStreak.js';
import { DEFAULT_PRACTICE_SETTINGS } from '../../pages/skills/math/practiceSettings.js';
export function createInitialSpaceRound() {
  return { phase: 'setup', settings: { ...DEFAULT_PRACTICE_SETTINGS, modeId: 'relaxed' }, roundId: 0, question: null,
    selectedLane: F.initialLane, committedLane: null, elapsedSeconds: 0, solved: 0, streak: 0, hadMiss: false, assisted: false, outcome: null, lastOutcome: null, paused: false, helpOpen: false };
}
// The rocket keeps its lane from one sum to the next: the flight never jumps back.
const round = (s, question) => ({ ...s, phase: 'choosing', roundId: s.roundId + 1, question, committedLane: null, elapsedSeconds: 0, outcome: null, helpOpen: false });
function resolve(s) {
  const correct = s.question.options[s.committedLane] === s.question.answer;
  const firstTry = !s.hadMiss && !s.assisted;
  // Right first time, back to back (the shared curriculum rule); any miss resets it.
  const { streak } = nextStreak(s.streak, correct, firstTry);
  return { ...s, phase: 'feedback', elapsedSeconds: F.durationSeconds, solved: s.solved + Number(correct), streak, hadMiss: s.hadMiss || !correct,
    outcome: { correct, firstTry, roundId: s.roundId, lane: s.committedLane } };
}
export function reduceSpaceRound(s, a) {
  if (a.type === 'CHANGE_SETTINGS') return { ...createInitialSpaceRound(), settings: s.settings, roundId: s.roundId + 1 };
  if (a.type === 'START') return s.phase === 'setup' ? round({ ...createInitialSpaceRound(), roundId: s.roundId, settings: a.settings }, a.question) : s;
  if (a.type === 'PAUSE') return s.phase !== 'setup' ? { ...s, paused: true } : s;
  if (a.type === 'RESUME') return { ...s, paused: false };
  if (a.type === 'CLEAR_LAST') return s.lastOutcome && s.lastOutcome.roundId === a.outcomeRoundId ? { ...s, lastOutcome: null } : s;
  if (a.roundId !== s.roundId || s.paused) return s;
  switch (a.type) {
    case 'SELECT_LANE': return s.phase === 'choosing' && !s.helpOpen && Number.isInteger(a.lane) ? { ...s, selectedLane: Math.max(0, Math.min(F.optionCount - 1, a.lane)) } : s;
    case 'COMMIT': return s.phase === 'choosing' && !s.helpOpen && Number.isInteger(a.lane) && a.lane >= 0 && a.lane < F.optionCount ? { ...s, phase: 'crossing', committedLane: a.lane, elapsedSeconds: 0 } : s;
    case 'TICK': {
      if (s.phase !== 'crossing' || !Number.isFinite(a.dt) || a.dt <= 0) return s;
      const next = { ...s, elapsedSeconds: s.elapsedSeconds + Math.min(a.dt, F.maxDeltaSeconds) };
      return next.elapsedSeconds + 1e-9 >= F.durationSeconds ? resolve(next) : next;
    }
    case 'COMPLETE': return s.phase === 'crossing' ? resolve(s) : s;
    // Flight: the rings reached the rocket. Score it and fly straight on — the
    // next sum after a right answer, the same sum again after a miss — with no
    // feedback stop. `lastOutcome` carries the result for the card to show.
    case 'PASS': {
      if (s.phase !== 'choosing' || s.helpOpen || !Number.isInteger(a.lane) || a.lane < 0 || a.lane >= F.optionCount) return s;
      const r = resolve({ ...s, committedLane: a.lane });
      const lastOutcome = { ...r.outcome, solvedText: s.question.prompt.replace('?', s.question.answer) };
      return r.outcome.correct
        ? round({ ...r, hadMiss: false, assisted: false, lastOutcome }, a.question ?? s.question)
        : round({ ...r, lastOutcome }, s.question);
    }
    case 'RETRY': return s.phase === 'feedback' && !s.outcome.correct ? round({ ...s, hadMiss: true }, s.question) : s;
    case 'NEXT': return s.phase === 'feedback' && s.outcome.correct ? round({ ...s, hadMiss: false, assisted: false }, a.question) : s;
    case 'OPEN_HELP': return s.phase === 'choosing' ? { ...s, helpOpen: true, assisted: true } : s;
    case 'CLOSE_HELP': return s.phase === 'choosing' ? { ...s, helpOpen: false } : s;
    default: return s;
  }
}
