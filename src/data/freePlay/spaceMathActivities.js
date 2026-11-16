// Manipulative activities share the Solar scene, but never learner progress.
// Laser Blast is the one answer flight; the stations are flown through gates.
// `short` names the mode tile; `how` is the one-line instruction (spoken and
// shown in help) and `gates` the gate labels a child will meet.
export const SPACE_MATH_MODES = [
  { id: 'laser', icon: '💥', title: 'Laser Blast', short: 'Blast',
    how: 'Steer to the right answer, then fire or fly through it.' },
  { id: 'collect', icon: '⭐', title: 'Target Collector', short: 'Collect',
    how: 'Fly through stars to make the target. Undo takes the last star off. Then fly through Dock.',
    gates: ['1', '2', '3', 'Undo', 'Dock'] },
  { id: 'balance', icon: '⚖️', title: 'Balance the Space Station', short: 'Balance',
    how: 'Fly through +1 or +2 to load crystals, −1 to unload. When both sides match, fly through Dock.',
    gates: ['+1', '+2', '−1', 'Dock'] },
  { id: 'share', icon: '👽', title: 'Alien Sharing Station', short: 'Share',
    how: 'Fly to an alien to give one crystal. Share them all fairly. Unfair? Pick one up and move it.',
    gates: ['Alien 1', 'Alien 2', 'Pick up'] },
];

const integer = (min, max, rng) => min + Math.floor(rng() * (max - min + 1));
export function makeSpaceActivity(mode, limit = 10, rng = Math.random) {
  const ceiling = limit === 20 ? 20 : 10;
  if (mode === 'collect') return { kind: mode, target: integer(6, ceiling, rng) };
  if (mode === 'balance') {
    const total = integer(5, ceiling, rng);
    const a = integer(1, total - 1, rng);
    return { kind: mode, a, b: total - a, base: integer(1, total - 1, rng), limit: ceiling };
  }
  const aliens = integer(2, 4, rng);
  return { kind: 'share', aliens, total: aliens * integer(1, Math.floor(ceiling / aliens), rng) };
}

export const collectedTotal = cargo => cargo.reduce((sum, value) => sum + value, 0);
export function collectionAccepts(question, value) {
  return Number.isInteger(value) && value > 0 && question.collection.total + value <= question.collection.target;
}
export function collectionWave(activity, cargo) {
  return {
    key: `collect-${activity.target}-${cargo.join('-')}`, kind: 'collect', dressing: 'star',
    prompt: `Make ${activity.target}`, options: [1, 2, 3, 4], answer: null,
    collection: { target: activity.target, total: collectedTotal(cargo) },
  };
}

/** Every action is a destination flown through by the rocket. */
export function activityFlightWave(s) {
  const q = s.activity;
  let options, flightActions;
  if (q.kind === 'collect') {
    const full = collectedTotal(s.cargo) === q.target;
    options = full ? ['Dock', 'Undo', 'Dock', 'Undo'] : ['1', '2', '3', 'Undo'];
    flightActions = full ? [{ type: 'dock' }, { type: 'undo' }, { type: 'dock' }, { type: 'undo' }]
      : [{ type: 'collect', value: 1 }, { type: 'collect', value: 2 }, { type: 'collect', value: 3 }, { type: 'undo' }];
  } else if (q.kind === 'balance') {
    options = ['+1', '+2', '−1', 'Dock'];
    flightActions = [{ type: 'cargo', delta: 1 }, { type: 'cargo', delta: 2 }, { type: 'cargo', delta: -1 }, { type: 'dock' }];
  } else {
    const pickup = collectedTotal(s.loads) === q.total;
    options = Array.from({ length: 4 }, (_, i) => i < q.aliens ? `${pickup ? 'Pick up' : 'Alien'} ${i + 1}` : 'Cruise');
    flightActions = options.map((_, i) => i < q.aliens ? { type: 'share', alien: i, delta: pickup ? -1 : 1 } : { type: 'cruise' });
  }
  return { key: `activity-${s.roundId}`, kind: 'spaceActivity', options, flightActions, answer: null,
    dressing: q.kind === 'collect' ? 'star' : 'ring',
    station: { ...q, cargo: [...s.cargo], loads: [...s.loads] } };
}

export function activityFlightAccepts(wave, lane) {
  const action = wave.flightActions[lane], q = wave.station;
  if (!action) return false;
  if (action.type === 'collect') return collectedTotal(q.cargo) + action.value <= q.target;
  if (action.type === 'undo') return q.cargo.length > 0;
  if (action.type === 'cargo') return q.cargo.length + action.delta >= 0 && q.cargo.length + action.delta <= q.limit;
  if (action.type === 'share') return action.delta > 0 ? collectedTotal(q.loads) < q.total : q.loads[action.alien] > 0;
  if (action.type === 'dock') return q.kind === 'collect' ? collectedTotal(q.cargo) === q.target : q.base + q.cargo.length === q.a + q.b;
  return true;
}

export function createSpaceActivityState(roundId = 0) {
  return { phase: 'setup', roundId, activity: null, cargo: [], loads: [], paused: false,
    helpOpen: false, assisted: false, hadMiss: false, solved: 0, result: null, resultId: 0 };
}
const fresh = (s, activity) => ({ ...s, phase: 'active', roundId: s.roundId + 1, activity,
  cargo: [], loads: activity.kind === 'share' ? Array(activity.aliens).fill(0) : [],
  helpOpen: false, assisted: false, hadMiss: false, result: null });
export function spaceActivityCorrect(s) {
  const q = s.activity;
  if (q.kind === 'collect') return collectedTotal(s.cargo) === q.target;
  if (q.kind === 'balance') return q.base + s.cargo.length === q.a + q.b;
  return s.loads.reduce((sum, n) => sum + n, 0) === q.total && s.loads.every(n => n === s.loads[0]);
}
const solvedText = s => s.activity.kind === 'collect' ? `${s.cargo.join(' + ')} = ${s.activity.target}`
  : s.activity.kind === 'balance' ? `${s.activity.a} + ${s.activity.b} = ${s.activity.base} + ${s.cargo.length}`
    : `${s.activity.total} ÷ ${s.activity.aliens} = ${s.loads[0]}`;
const result = (s, correct) => ({ ...s, phase: correct ? 'solved' : s.phase,
  solved: s.solved + Number(correct), hadMiss: s.hadMiss || !correct, resultId: s.resultId + 1,
  result: { id: s.resultId + 1, correct, firstTry: !s.hadMiss && !s.assisted, solvedText: correct ? solvedText(s) : null } });

export function reduceSpaceActivity(s, a) {
  if (a.type === 'START') return s.phase === 'setup' ? fresh(s, a.activity) : s;
  if (a.type === 'NEXT') return s.phase === 'solved' && !s.paused ? fresh(s, a.activity) : s;
  if (a.type === 'PAUSE') return s.phase !== 'setup' ? { ...s, paused: true } : s;
  if (a.type === 'RESUME') return { ...s, paused: false };
  if (s.paused || s.phase !== 'active' || a.roundId !== s.roundId) return s;
  if (a.type === 'HELP') return { ...s, helpOpen: !s.helpOpen, assisted: true };
  if (s.helpOpen) return s;
  switch (a.type) {
    case 'FLY': {
      if (!Number.isInteger(a.lane) || a.lane < 0 || a.lane > 3) return s;
      const wave = activityFlightWave(s), action = wave.flightActions[a.lane];
      let next = { ...s, roundId: s.roundId + 1, result: null };
      // Empty undo/pick-up bays are harmless: keep flying and keep the work.
      if (!activityFlightAccepts(wave, a.lane)) return ['undo', 'share'].includes(action.type) ? next : result(next, false);
      if (action.type === 'collect') next.cargo = [...s.cargo, action.value];
      if (action.type === 'undo') next.cargo = s.cargo.slice(0, -1);
      if (action.type === 'cargo') next.cargo = Array(s.cargo.length + action.delta).fill(1);
      if (action.type === 'share') next.loads = s.loads.map((n, i) => n + (i === action.alien ? action.delta : 0));
      if (action.type === 'dock' || (action.type === 'share' && collectedTotal(next.loads) === s.activity.total)) {
        const checked = result(next, spaceActivityCorrect(next));
        return checked.result.correct && a.nextActivity ? { ...fresh(checked, a.nextActivity), result: checked.result } : checked;
      }
      return next;
    }
    case 'CHECK': return result(s, spaceActivityCorrect(s));
    case 'COLLECT': {
      if (s.activity.kind !== 'collect' || !Number.isInteger(a.lane) || a.lane < 0 || a.lane > 3) return s;
      const wave = collectionWave(s.activity, s.cargo), value = wave.options[a.lane];
      if (collectedTotal(s.cargo) === s.activity.target) return s;
      const next = { ...s, roundId: s.roundId + 1 };
      return collectionAccepts(wave, value) ? { ...next, cargo: [...s.cargo, value], result: null } : result(next, false);
    }
    case 'UNDO': return s.activity.kind === 'collect' && s.cargo.length ? { ...s, cargo: s.cargo.slice(0, -1), roundId: s.roundId + 1, result: null } : s;
    case 'CARGO': {
      if (s.activity.kind !== 'balance' || ![1, -1].includes(a.delta)) return s;
      const count = s.cargo.length + a.delta;
      return count >= 0 && count <= s.activity.limit ? { ...s, cargo: Array(count).fill(1), result: null } : s;
    }
    case 'SHARE': {
      if (s.activity.kind !== 'share' || !Number.isInteger(a.alien) || a.alien < 0 || a.alien >= s.loads.length || ![1, -1].includes(a.delta)) return s;
      const remaining = s.activity.total - collectedTotal(s.loads);
      if ((a.delta > 0 && remaining === 0) || (a.delta < 0 && s.loads[a.alien] === 0)) return s;
      return { ...s, loads: s.loads.map((n, i) => n + (i === a.alien ? a.delta : 0)), result: null };
    }
    case 'RESET': return { ...s, cargo: [], loads: s.loads.map(() => 0), roundId: s.roundId + 1, result: null };
    default: return s;
  }
}
