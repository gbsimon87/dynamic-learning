import { useCallback, useEffect, useReducer, useRef, useImperativeHandle, useState } from 'react';
import { SPACE_FEEDBACK_MS as FEEDBACK_MS } from '../../../data/freePlay/spaceArithmeticConfig.js';
import {
  FIND_CHOICES, OPERAND_CHOICES, OPERATIONS, OPERATION_LABELS, OPERATION_SIGNS, RANGE_PRESETS, VALUE_CEILING, VALUE_FLOOR,
  withMax, withMin, withOperationToggled,
} from './practiceSettings.js';
import RangeSlider from '../../../components/skills/RangeSlider.jsx';
import SpaceMathActivities from './SpaceMathActivities.jsx';
import { SpaceSetupShell, SpaceTools, TurboButton } from './SpaceControls.jsx';
import { isTypingTarget, resumeWhenFocused, useSpaceTurbo } from './useSpaceTurbo.js';
import {
  BOND_TARGETS, DEFAULT_MISSION_SETTINGS, MISSIONS, SKIP_STEPS, makeMissionQuestion, missionById, streakTier,
} from '../../../data/freePlay/spaceMissions.js';
import { loadBestStreaks, saveBestStreaks, withStreak } from '../../../data/freePlay/spaceArithmeticRecords.js';
import { FLIGHT_GOAL, STUCK_MISSES, scheduleComeback, takeComeback } from '../../../data/freePlay/spaceArithmeticFlight.js';
import { createInitialSpaceRound, reduceSpaceRound } from '../../../data/freePlay/spaceArithmeticRound.js';
import { JOURNEY_LEG, journeyAt } from '../../../data/freePlay/spaceArithmeticJourney.js';
import { useAnswerFeedback } from '../../../components/skills/useAnswerFeedback.js';
import AnswerFeedbackLine from '../../../components/skills/AnswerFeedbackLine.jsx';
import SpeakButton from '../../../components/challenge/SpeakButton.jsx';
import { mathToSpeech } from '../../../data/mathSpeech.js';
import { steerArithmeticLane } from '../geography/solarArithmeticRunner.js';
import './SpaceArithmetic.css';

// `count` dots in rows of `row`; the last `gone` are crossed out (taking away)
// and the last `empty` are open circles still to fill (number bonds).
function Dots({ count, label, row = 10, gone = 0, empty = 0 }) {
  return <div className="space-arithmetic-dots"><strong>{label}</strong><div aria-hidden="true">{Array.from({ length: Math.ceil(count / row) }, (_, r) => <div key={r}>{Array.from({ length: Math.min(row, count - r * row) }, (_, i) => {
    const n = r * row + i;
    if (n >= count - empty) return <span key={i} className="is-empty">○</span>;
    return <span key={i} className={n >= count - gone ? 'is-gone' : undefined}>●</span>;
  })}</div>)}</div></div>;
}
const DOT_LIMIT = 40;
const EMPTY_LOG = { firstTry: 0, topStreak: 0, cracked: [] };

/** Show me: a picture and a prompt that fit the question, never the answer in words. */
function Help({ question }) {
  // Make 10: the given number filled in, the gap to the target left open.
  if (question.kind === 'bonds') {
    const { a, target } = question.bond;
    return <>
      {target <= 20 && <Dots count={target} empty={target - a} label={`${a} and how many more make ${target}?`} />}
      <p>{target === 100 ? `Start at ${a}. Count on in tens to 100.` : `Start at ${a}. Count on to ${target}. How many jumps?`}</p>
    </>;
  }
  // Skip-count: show the jumps between the numbers, never the missing one.
  if (question.kind === 'skip') {
    const { step } = question.skip;
    return <>
      <p className="space-arithmetic-jumps" aria-hidden="true">{question.prompt.split(', ').join(` →+${step}→ `)}</p>
      <p>Each jump adds {step}. Count on in {step}s.</p>
    </>;
  }
  // Find the sum: never point at the right ring.
  if (question.reverse) return <p>Work out each sum, one at a time. Which one makes {question.target}?</p>;
  const p = question.parts;
  if (!p) return <p>{question.key.includes('(') ? 'Work out the brackets first. Then go from left to right, one step at a time.' : 'Go from left to right, one step at a time.'}</p>;
  const { a, b } = p;
  if (p.operation === 'addition') return <>
    {a + b <= DOT_LIMIT && <div className="space-arithmetic-choices"><Dots count={a} label={`First group: ${a}`} /><Dots count={b} label={`Add this group: ${b}`} /></div>}
    <p>Start at {a}. Count on {b} more, one at a time.</p>
  </>;
  if (p.operation === 'subtraction') return <>
    {a <= DOT_LIMIT && <Dots count={a} gone={b} label={`${a}, take away ${b}`} />}
    <p>Start at {a}. Count back {b}{a <= DOT_LIMIT ? ', or count the dots left' : ''}.</p>
  </>;
  if (p.operation === 'multiplication') return <>
    {a <= 10 && b <= 10 && <Dots count={a * b} row={b} label={`${a} groups of ${b}`} />}
    <p>{a} groups of {b}. Count up in {b}s, {a} times.</p>
  </>;
  return <>
    {b <= 10 && a / b <= 10 && <Dots count={a} row={b} label={`${a} in groups of ${b}`} />}
    <p>How many groups of {b} make {a}? Count the groups.</p>
  </>;
}

/**
 * The Space Arithmetic card over the Solar scene. Laser Blast is the answer
 * flight: the scene flies the rocket forward on its own; the child steers
 * left/right for numbers, or in four directions for equations (arrow keys or
 * WASD), and fires at the answer ahead or flies through it.
 * The flight never stops for feedback: the next sum (or the same one after a
 * miss) flies straight in while the result shows beside it. Still play keeps a
 * short feedback pause, then moves on by itself. No Next or Try again buttons.
 */
export default function SpaceArithmeticPanel(props) {
  const [selection, setSelection] = useState({ mode: 'laser', visit: 0 });
  // Keep round IDs increasing across modes so a late scene event stays stale.
  const roundSequence = useRef(0);
  const chooseMode = mode => setSelection(previous => ({ mode, visit: previous.visit + 1 }));
  return selection.mode === 'laser'
    ? <SpaceAnswerFlight key={selection.visit} {...props} roundSequence={roundSequence} onModeChange={chooseMode} />
    : <SpaceMathActivities key={selection.visit} {...props} mode={selection.mode} onModeChange={chooseMode} roundSequence={roundSequence} />;
}

function SpaceAnswerFlight({ flightApi, forceStill = false, ref, roundSequence, onModeChange }) {
  const [s, dispatch] = useReducer(reduceSpaceRound, undefined, () => ({ ...createInitialSpaceRound(), roundId: roundSequence.current }));
  useEffect(() => { roundSequence.current = Math.max(roundSequence.current, s.roundId); }, [s.roundId, roundSequence]);
  const [settings, setSettings] = useState(() => ({ ...DEFAULT_MISSION_SETTINGS, ...s.settings }));
  // Stardust collected this flight: session-only fun, nothing stored.
  const [dust, setDust] = useState(0);
  // Best streak per mission, kept in this browser only. `flightBest` is the
  // record when this flight started, so beating it is announced once.
  const [best, setBest] = useState(() => loadBestStreaks());
  const [flightBest, setFlightBest] = useState(0);
  const announced = useRef(false);
  // A short status line for a power-up or a new best streak.
  const [moment, setMoment] = useState(null);
  // The flight lands after `goal` right answers and shows its log (this flight only).
  const [goal, setGoal] = useState(FLIGHT_GOAL);
  const [log, setLog] = useState(EMPTY_LOG);
  // Sums that needed a second go come back later; two misses in a row open Show me.
  const comebacks = useRef([]), misses = useRef(0), autoHelped = useRef(null);
  const [autoHelp, setAutoHelp] = useState(false);
  const landingHeading = useRef(null);
  const [reduced, setReduced] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
  const prompt = useRef(null), helpButton = useRef(null), lastOutcome = useRef(null), preparedRound = useRef(null), wasHelp = useRef(false);
  const fb = useAnswerFeedback();
  const { answer, clear, reset } = fb;
  // Reduced motion or no WebGL: the same sums, answered by tapping a ring.
  const still = forceStill || reduced;
  const send = useCallback((type, extra = {}) => dispatch({ type, roundId: s.roundId, ...extra }), [s.roundId]);
  useEffect(() => {
    const query = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const changed = () => setReduced(query.matches);
    query?.addEventListener('change', changed);
    return () => { query?.removeEventListener('change', changed); };
  }, []);
  useEffect(() => {
    const pause = () => dispatch({ type: 'PAUSE' });
    const hidden = () => { if (document.hidden) pause(); };
    window.addEventListener('blur', pause); document.addEventListener('visibilitychange', hidden);
    return () => { window.removeEventListener('blur', pause); document.removeEventListener('visibilitychange', hidden); };
  }, []);
  useEffect(() => {
    if (s.phase === 'crossing' && !s.paused) dispatch({ type: 'COMPLETE', roundId: s.roundId });
  }, [s.phase, s.paused, s.roundId]);
  useEffect(() => {
    if (s.phase === 'choosing' && preparedRound.current !== s.roundId) {
      preparedRound.current = s.roundId; flightApi?.prepareRound(s.question, s.roundId);
    }
  }, [s.roundId, s.question, s.phase, flightApi]);
  const landed = s.phase !== 'setup' && s.solved >= goal;
  useEffect(() => {
    flightApi?.setState({ blocked: still || s.paused || s.helpOpen || s.phase === 'setup' || landed, phase: s.phase });
  }, [still, s.paused, s.helpOpen, s.phase, landed, flightApi]);
  useEffect(() => { if (s.phase === 'choosing') flightApi?.setLane?.(s.selectedLane); }, [s.selectedLane, s.phase, s.roundId, flightApi]);
  // The scene calls `crossing` from its frame loop, after render: read the latest round from a ref.
  const latest = useRef(s);
  useEffect(() => { latest.current = s; });
  // The next sum after a right answer: a comeback if one is due, otherwise a new one.
  // A sum that needed a second go or help is queued to come back.
  const nextQuestion = useCallback(round => {
    const { question, settings, hadMiss, assisted } = round;
    if (hadMiss || assisted) comebacks.current = scheduleComeback(comebacks.current, { ...question, comeback: false });
    const due = takeComeback(comebacks.current);
    comebacks.current = due.queue;
    return due.question ?? makeMissionQuestion(settings, question.key);
  }, []);
  const crossing = useCallback(({ lane, roundId }) => {
    const { question } = latest.current;
    const right = question && roundId === latest.current.roundId && question.options[lane] === question.answer;
    dispatch({ type: 'PASS', roundId, lane, question: right ? nextQuestion(latest.current) : undefined });
  }, [nextQuestion]);
  const stardust = useCallback((count = 1) => {
    const { phase, paused } = latest.current;
    if (phase === 'choosing' && !paused) setDust(n => n + Math.max(0, Math.floor(count) || 0));
  }, []);
  useImperativeHandle(ref, () => ({ crossing, stardust }));
  // Still play shows `outcome` during its feedback pause; flight shows `lastOutcome` while flying on.
  const shown = s.outcome ?? s.lastOutcome;
  useEffect(() => {
    if (shown && lastOutcome.current !== shown.roundId) {
      lastOutcome.current = shown.roundId;
      answer(shown.correct, { firstTry: shown.firstTry });
      misses.current = shown.correct ? 0 : misses.current + 1;
      const clean = shown.correct && shown.firstTry;
      setLog(l => ({ ...l, firstTry: l.firstTry + Number(clean), cracked: clean && shown.comeback ? [...l.cracked, shown.solvedText] : l.cracked }));
    }
  }, [shown, answer]);
  // Stuck on one sum: after two misses Show me opens by itself, once per sum.
  useEffect(() => {
    if (s.phase !== 'choosing' || s.paused || s.helpOpen || misses.current < STUCK_MISSES || autoHelped.current === s.question.key) return;
    autoHelped.current = s.question.key; setAutoHelp(true);
    dispatch({ type: 'OPEN_HELP', roundId: s.roundId });
  }, [s.phase, s.paused, s.helpOpen, s.roundId, s.question]);
  useEffect(() => { setLog(l => (s.streak > l.topStreak ? { ...l, topStreak: s.streak } : l)); }, [s.streak]);
  // In flight the result line fades after a moment; the rocket never waited for it.
  useEffect(() => {
    if (!s.lastOutcome) return undefined;
    const { roundId: outcomeRoundId, correct } = s.lastOutcome;
    const timer = window.setTimeout(() => { clear(); dispatch({ type: 'CLEAR_LAST', outcomeRoundId }); }, correct ? FEEDBACK_MS.correct : FEEDBACK_MS.wrong);
    return () => window.clearTimeout(timer);
  }, [s.lastOutcome, clear]);
  // Feedback moves on by itself; a pause holds it until Resume.
  useEffect(() => {
    if (s.phase !== 'feedback' || s.paused) return undefined;
    const correct = s.outcome.correct;
    const timer = window.setTimeout(() => {
      clear();
      if (correct) dispatch({ type: 'NEXT', roundId: s.roundId, question: nextQuestion(latest.current) });
      else dispatch({ type: 'RETRY', roundId: s.roundId });
    }, correct ? FEEDBACK_MS.correct : FEEDBACK_MS.wrong);
    return () => window.clearTimeout(timer);
  }, [s.phase, s.paused, s.roundId, s.outcome, clear, nextQuestion]);
  const locked = s.paused || s.helpOpen || s.phase !== 'choosing' || landed;
  const grid = Boolean(s.question?.reverse);
  const steer = direction => send('SELECT_LANE', { lane: steerArithmeticLane(s.selectedLane, direction, grid) });
  const atEdge = direction => steerArithmeticLane(s.selectedLane, direction, grid) === s.selectedLane;
  // Equations use a real two-row flight grid; number answers keep four lanes.
  useEffect(() => {
    if (s.phase === 'setup' || still) return undefined;
    const key = e => {
      if (locked || e.repeat || isTypingTarget(e.target)) return;
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (k === ' ' || k === 'f') {
        if (e.target?.closest?.('button, a')) return;
        e.preventDefault(); flightApi?.fire?.(); return;
      }
      const direction = { ArrowLeft: 'left', a: 'left', ArrowRight: 'right', d: 'right', ArrowUp: 'up', w: 'up', ArrowDown: 'down', s: 'down' }[k];
      if (!direction || (!grid && ['up', 'down'].includes(direction))) return;
      e.preventDefault(); send('SELECT_LANE', { lane: steerArithmeticLane(s.selectedLane, direction, grid) });
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [s.phase, s.selectedLane, still, locked, grid, send, flightApi]);
  const flying = s.phase !== 'setup' && !still;
  // Hold Shift (or the Turbo button) to make the rings close in faster.
  const turbo = useSpaceTurbo({ flying, locked, flightApi });
  // Three or more right first time in a row: the rocket's flame burns big.
  const hot = flying && s.streak >= 3;
  useEffect(() => { flightApi?.setHot?.(hot); }, [hot, flightApi]);
  // Streak power-ups: the warp lines change colour; powering up says so.
  const tier = flying ? streakTier(s.streak) : null;
  const shownTier = useRef(0);
  useEffect(() => {
    flightApi?.setTier?.(tier?.id ?? null);
    const at = tier?.at ?? 0;
    if (at > shownTier.current) setMoment(`${tier.emoji} ${tier.name}!`);
    shownTier.current = at;
  }, [tier, flightApi]);
  // A longer streak than ever before in this mission: saved here, fireworks once a flight.
  useEffect(() => {
    if (s.phase === 'setup') return;
    const id = s.settings.mission, next = withStreak(best, id, s.streak);
    if (next === best) return;
    setBest(next); saveBestStreaks(next);
    if (!announced.current && flightBest > 0 && s.streak > flightBest) {
      announced.current = true;
      setMoment(`🏆 New best streak: ${s.streak}!`);
      flightApi?.celebrate?.({ kind: 'record' });
    }
  }, [s.streak, s.phase, s.settings.mission, best, flightBest, flightApi]);
  // Landing: fireworks in the scene, and the flight log takes focus.
  useEffect(() => {
    if (!landed) return;
    landingHeading.current?.focus({ preventScroll: true });
    flightApi?.celebrate?.({ kind: 'landing' });
  }, [landed, flightApi]);
  useEffect(() => {
    if (!moment) return undefined;
    const timer = window.setTimeout(() => setMoment(null), 2600);
    return () => window.clearTimeout(timer);
  }, [moment]);
  useEffect(() => {
    if (!s.paused && s.phase === 'choosing' && s.roundId) prompt.current?.focus({ preventScroll: true });
  }, [s.roundId, s.phase, s.paused]);
  useEffect(() => {
    if (!s.helpOpen && wasHelp.current && !s.paused) helpButton.current?.focus();
    wasHelp.current = s.helpOpen;
  }, [s.paused, s.helpOpen]);
  const start = () => {
    const question = makeMissionQuestion(settings); reset(); setDust(0); setMoment(null);
    setFlightBest(best[settings.mission] ?? 0); announced.current = false;
    setGoal(FLIGHT_GOAL); setLog(EMPTY_LOG); setAutoHelp(false);
    comebacks.current = []; misses.current = 0; autoHelped.current = null;
    dispatch({ type: 'START', question, settings });
  };
  const mission = missionById((s.phase === 'setup' ? settings : s.settings).mission);
  const journey = journeyAt(s.solved);
  // Back at setup the scene clears its sparks and fly-bys.
  const inSetup = s.phase === 'setup', flightMission = s.settings.mission;
  useEffect(() => { flightApi?.setMission?.(inSetup ? null : flightMission); }, [inSetup, flightMission, flightApi]);
  // Reaching a planet on the tour sends it sweeping past in the scene.
  const celebrated = useRef(null);
  useEffect(() => {
    const last = s.lastOutcome;
    if (!last?.correct || celebrated.current === last.roundId) return;
    celebrated.current = last.roundId;
    const now = journeyAt(s.solved);
    if (now.reached) flightApi?.celebrate?.({ kind: 'planet', planet: now.reached });
  }, [s.lastOutcome, s.solved, flightApi]);
  const bestNow = best[s.settings.mission] ?? 0;
  const solvedLabel = { bonds: 'Stars found', skip: 'Numbers found' }[mission.questions] ?? 'Sums solved';
  const solvedText = s.outcome?.correct ? s.question.prompt.replace('?', s.question.answer) : s.question?.prompt;

  if (s.phase === 'setup') {
    const mixDisabled = settings.types.length < 2;
    const pick = (key, value) => () => setSettings(prev => ({ ...prev, [key]: value }));
    const missionBest = best[mission.id] ?? 0;
    // One line per choice: a short label, then its buttons.
    const row = (id, label, buttons) => <div className="space-arithmetic-row">
      <h2 className="space-arithmetic-label" id={id}>{label}</h2>
      <div className="space-arithmetic-segmented" role="group" aria-labelledby={id}>{buttons}</div>
    </div>;
    return <SpaceSetupShell mode="laser" onModeChange={onModeChange} onBack={() => flightApi?.leave()} onStart={start}
      badge={missionBest > 0 && <span className="space-arithmetic-best" aria-label={`Best streak ${missionBest}`}>🏆 {missionBest}</span>}>
      {row('space-mission', 'Play', MISSIONS.map(m => <button className="skill-btn space-arithmetic-set" key={m.id} aria-label={m.title} title={m.title} aria-pressed={settings.mission === m.id} onClick={pick('mission', m.id)}>
        <span aria-hidden="true">{m.emoji}</span><span className="space-arithmetic-set-name" aria-hidden="true">{m.short}</span>
      </button>))}
      {mission.questions === 'bonds' && <>
        {row('space-bonds', 'Make', BOND_TARGETS.map(n => <button className="skill-btn" key={n} aria-label={`Make ${n}`} aria-pressed={settings.bondTarget === n} onClick={pick('bondTarget', n)}>{n}</button>))}
        <p className="space-arithmetic-note">{settings.bondTarget === 100 ? '30 + ? = 100' : `3 + ? = ${settings.bondTarget}`}</p>
      </>}
      {mission.questions === 'skip' && <>
        {row('space-skip', 'Count in', SKIP_STEPS.map(n => <button className="skill-btn" key={n} aria-pressed={settings.skipStep === n} onClick={pick('skipStep', n)}>{n}s</button>))}
        <p className="space-arithmetic-note">{[0, 1, 2, 3].map(i => (i === 2 ? '?' : String((i + 1) * settings.skipStep))).join(', ')}</p>
      </>}
      {mission.questions === 'practice' && <>
        {row('space-find', 'Find', FIND_CHOICES.map(({ id, label, example }) => <button className="skill-btn space-arithmetic-find" key={id} aria-label={label} aria-pressed={settings.find === id} onClick={pick('find', id)}>
          <span className="space-arithmetic-example" aria-hidden="true">{example}</span>
        </button>))}
        {row('space-ops', 'Practise', OPERATIONS.map(op => <button className="skill-btn space-arithmetic-op" key={op} aria-label={OPERATION_LABELS[op]} title={OPERATION_LABELS[op]} aria-pressed={settings.types.includes(op)} onClick={() => setSettings(prev => withOperationToggled(prev, op))}>
          <span aria-hidden="true">{OPERATION_SIGNS[op]}</span>
        </button>))}
        <button className="space-arithmetic-switch" aria-label="Mix operations in one question" aria-pressed={settings.mixOperations} disabled={mixDisabled} onClick={() => setSettings(prev => ({ ...prev, mixOperations: !prev.mixOperations }))}>
          <span className="space-arithmetic-switch-text">Mix<span className="space-arithmetic-note" aria-hidden="true">4 + (5 × 2)</span></span>
          <span className="space-arithmetic-switch-knob" aria-hidden="true" />
        </button>
        {row('space-operands', 'Numbers', OPERAND_CHOICES.map(n => <button className="skill-btn" key={n} aria-pressed={settings.operands === n} onClick={pick('operands', n)}>{n}</button>))}
        {row('space-size', 'Up to', RANGE_PRESETS.map(top => <button className="skill-btn" key={top} aria-label={`Up to ${top}`} aria-pressed={settings.min === VALUE_FLOOR && settings.max === top} onClick={() => setSettings(prev => ({ ...prev, min: VALUE_FLOOR, max: top }))}>{top}</button>))}
        <div className="space-arithmetic-range">
          <RangeSlider min={settings.min} max={settings.max} floor={VALUE_FLOOR} ceiling={VALUE_CEILING}
            onMinChange={n => setSettings(prev => withMin(prev, n))} onMaxChange={n => setSettings(prev => withMax(prev, n))} />
          <p className="space-arithmetic-readout" aria-live="polite">From <strong>{settings.min}</strong> to <strong>{settings.max}</strong></p>
        </div>
      </>}
    </SpaceSetupShell>;
  }

  if (landed) {
    return <section className="space-arithmetic solar-arithmetic-panel is-landed" aria-label="Space Arithmetic">
      <header className="space-arithmetic-bar">
        <button className="skill-btn space-arithmetic-back" onClick={() => flightApi?.leave()} aria-label="Back to Solar System">←</button>
        <h2 ref={landingHeading} tabIndex={-1} className="space-arithmetic-landed-title"><span aria-hidden="true">🛬 </span>Flight complete!</h2>
      </header>
      <ul className="space-arithmetic-log">
        <li><span aria-hidden="true">✅</span>{solvedLabel}<strong>{s.solved}</strong></li>
        <li><span aria-hidden="true">⭐</span>Right first time<strong>{log.firstTry}</strong></li>
        <li><span aria-hidden="true">🔥</span>Longest streak<strong>{log.topStreak}{flightBest > 0 && bestNow > flightBest && <span className="space-arithmetic-best is-new">New best!</span>}</strong></li>
        <li><span aria-hidden="true">🪐</span>Planets reached<strong>{Math.floor(s.solved / JOURNEY_LEG)}</strong></li>
        {dust > 0 && <li><span aria-hidden="true">✨</span>Stardust<strong>{dust}</strong></li>}
      </ul>
      {log.cracked.length > 0 && <div className="space-arithmetic-cracked">
        <p><span aria-hidden="true">🔁 </span>Comebacks cracked</p>
        <ul>{log.cracked.map((text, i) => <li key={i}>{text}</li>)}</ul>
      </div>}
      <div className="space-arithmetic-landed-actions">
        <button className="skill-btn space-arithmetic-start" onClick={() => setGoal(s.solved + FLIGHT_GOAL)}>Keep flying</button>
        <button className="skill-btn" onClick={() => { reset(); send('CHANGE_SETTINGS'); }}>New mission</button>
      </div>
    </section>;
  }

  const reached = s.lastOutcome?.correct && journey.reached;
  return <>
    <section className={`space-arithmetic solar-arithmetic-panel is-playing${still ? ' is-still' : ''}`} aria-label="Space Arithmetic">
      <header className="space-arithmetic-bar">
        <button className="skill-btn space-arithmetic-back" onClick={() => flightApi?.leave()} aria-label="Back to Solar System">←</button>
        <span className="space-arithmetic-count">
          <span className="space-arithmetic-solved" aria-label={`${solvedLabel}: ${s.solved}`}><span aria-hidden="true">✅ </span>{s.solved}</span>
          {s.streak >= 2 && <span className={`space-arithmetic-streak${hot ? ' is-hot' : ''}${tier ? ` is-${tier.id}` : ''}`} aria-label={`${s.streak} right first time in a row`}>{tier?.emoji ?? '🔥'} {s.streak}</span>}
          {bestNow > 0 && <span className={`space-arithmetic-best${flightBest > 0 && bestNow > flightBest ? ' is-new' : ''}`} aria-label={`Best streak ${bestNow}`}>🏆 {bestNow}</span>}
          {dust > 0 && <span className="space-arithmetic-dust" aria-label={`${dust} stardust collected`}>✨ {dust}</span>}
        </span>
        {!s.paused && <SpeakButton compact text={s.question.reverse ? `Which sum makes ${s.question.target}?` : s.question.speech ?? mathToSpeech(s.question.prompt)} label="Hear the question" />}
      </header>
      {/* Two groups: the question (left) and tools, help and answers (right) when the still view goes wide. */}
      <div className="space-arithmetic-main">
      {s.question.comeback && <p className="space-arithmetic-comeback"><span aria-hidden="true">🔁 </span>Comeback sum</p>}
      <h2 ref={prompt} tabIndex={-1} className={`space-arithmetic-sum${s.outcome?.correct ? ' is-solved' : ''}${solvedText.length > 14 ? ' is-long' : ''}`}>{solvedText}</h2>
      {moment && <p className="space-arithmetic-moment" role="status">{moment}</p>}
      {s.lastOutcome?.correct && <p className="space-arithmetic-last"><span aria-hidden="true">✓ </span>{s.lastOutcome.solvedText}</p>}
      <p className={`space-arithmetic-journey${reached ? ' is-reached' : ''}`}>
        {reached
          ? <><span aria-hidden="true">🪐 </span>You reached {journey.reached}!</>
          : <><span aria-hidden="true">🚀 </span>Next stop: {journey.next}</>}
        <span className="space-arithmetic-pips" role="img" aria-label={`${journey.progress} of ${JOURNEY_LEG} sums to ${journey.next}`}>
          {Array.from({ length: JOURNEY_LEG }, (_, i) => <span key={i} className={i < journey.progress ? 'is-done' : undefined} />)}
        </span>
      </p>
      <AnswerFeedbackLine feedback={fb.feedback} ref={fb.feedbackRef} />
      </div>
      <div className="space-arithmetic-side">
      <SpaceTools helpRef={helpButton} locked={locked} paused={s.paused} helpOpen={s.helpOpen}
        onHelp={() => { if (s.helpOpen) { setAutoHelp(false); send('CLOSE_HELP'); } else send('OPEN_HELP'); }}
        onPause={() => send('PAUSE')} onResume={resumeWhenFocused(() => dispatch({ type: 'RESUME' }))}
        onSettings={() => { reset(); send('CHANGE_SETTINGS'); }} />
      {s.paused && <p className="space-arithmetic-paused" role="status"><span aria-hidden="true">⏸ </span>Paused</p>}
      {s.helpOpen && <section className="space-arithmetic-help" aria-label="Help">
        {autoHelp && <p className="space-arithmetic-help-lead">Tricky one! Let’s work it out together.</p>}
        <Help question={s.question} />
      </section>}
      {still && <div className={`space-arithmetic-answers${s.question.reverse ? ' has-equations' : ''}`} role="group" aria-label="Answer rings">
        {s.question.options.map((n, lane) => <button className="skill-btn space-arithmetic-ring" key={lane} disabled={locked} aria-label={`Answer ${n}`} onClick={() => send('COMMIT', { lane })}>{n}</button>)}
      </div>}
      </div>
    </section>
    {!still && <div className={`space-arithmetic-steer has-fire${grid ? ' is-grid' : ''}`} role="group" aria-label="Steer the rocket">
      {grid && <button className="skill-btn space-arithmetic-up" aria-label="Move up" disabled={locked || atEdge('up')} onClick={() => steer('up')}>▲</button>}
      <button className="skill-btn space-arithmetic-left" aria-label="Move left" disabled={locked || atEdge('left')} onClick={() => steer('left')}>◀</button>
      <span aria-live="polite" className="space-arithmetic-lane">{grid ? `${s.selectedLane < 2 ? 'Top' : 'Bottom'} ${s.selectedLane % 2 ? 'right' : 'left'} ring: ` : 'Ring '}{s.question.options[s.selectedLane]}</span>
      <button className="skill-btn space-arithmetic-right" aria-label="Move right" disabled={locked || atEdge('right')} onClick={() => steer('right')}>▶</button>
      <button className="skill-btn space-arithmetic-fire" aria-label="Fire" disabled={locked} onClick={() => flightApi?.fire?.()} title="Fire · Space"><span aria-hidden="true">💥</span></button>
      {grid && <button className="skill-btn space-arithmetic-down" aria-label="Move down" disabled={locked || atEdge('down')} onClick={() => steer('down')}>▼</button>}
      <TurboButton turbo={turbo} disabled={locked} />
    </div>}
  </>;
}
