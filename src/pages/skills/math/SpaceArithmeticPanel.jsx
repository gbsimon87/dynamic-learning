import { useCallback, useEffect, useReducer, useRef, useImperativeHandle, useState } from 'react';
import { SPACE_FEEDBACK_MS as FEEDBACK_MS } from '../../../data/freePlay/spaceArithmeticConfig.js';
import {
  FIND_CHOICES, OPERAND_CHOICES, OPERATIONS, OPERATION_LABELS, OPERATION_SIGNS, RANGE_PRESETS, VALUE_CEILING, VALUE_FLOOR,
  withMax, withMin, withOperationToggled,
} from './practiceSettings.js';
import RangeSlider from '../../../components/skills/RangeSlider.jsx';
import { makeSpaceQuestion } from '../../../data/freePlay/spaceArithmeticQuestions.js';
import { createInitialSpaceRound, reduceSpaceRound } from '../../../data/freePlay/spaceArithmeticRound.js';
import { JOURNEY_LEG, journeyAt } from '../../../data/freePlay/spaceArithmeticJourney.js';
import { useAnswerFeedback } from '../../../components/skills/useAnswerFeedback.js';
import AnswerFeedbackLine from '../../../components/skills/AnswerFeedbackLine.jsx';
import SpeakButton from '../../../components/challenge/SpeakButton.jsx';
import { mathToSpeech } from '../../../data/mathSpeech.js';
import { steerArithmeticLane } from '../geography/solarArithmeticRunner.js';
import './SpaceArithmetic.css';

// `count` dots in rows of `row`; the last `gone` are crossed out (taking away).
function Dots({ count, label, row = 10, gone = 0 }) {
  return <div className="space-arithmetic-dots"><strong>{label}</strong><div aria-hidden="true">{Array.from({ length: Math.ceil(count / row) }, (_, r) => <div key={r}>{Array.from({ length: Math.min(row, count - r * row) }, (_, i) => <span key={i} className={r * row + i >= count - gone ? 'is-gone' : undefined}>●</span>)}</div>)}</div></div>;
}
const DOT_LIMIT = 40;

/** Show me: a picture and a prompt that fit the question, never the answer in words. */
function Help({ question }) {
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
 * The Space Arithmetic card over the Solar scene. The scene flies the rocket
 * forward on its own; the child steers left/right for numbers, or in four
 * directions for equations (arrow keys or WASD). The opening the rocket is
 * in when the rings arrive is the answer.
 * The flight never stops for feedback: the next sum (or the same one after a
 * miss) flies straight in while the result shows beside it. Still play keeps a
 * short feedback pause, then moves on by itself. No Next or Try again buttons.
 */
export default function SpaceArithmeticPanel({ flightApi, forceStill = false, ref }) {
  const [s, dispatch] = useReducer(reduceSpaceRound, undefined, createInitialSpaceRound);
  const [settings, setSettings] = useState(s.settings);
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
  useEffect(() => {
    flightApi?.setState({ blocked: still || s.paused || s.helpOpen || s.phase === 'setup', phase: s.phase });
  }, [still, s.paused, s.helpOpen, s.phase, flightApi]);
  useEffect(() => { if (s.phase === 'choosing') flightApi?.setLane?.(s.selectedLane); }, [s.selectedLane, s.phase, s.roundId, flightApi]);
  // The scene calls `crossing` from its frame loop, after render: read the latest round from a ref.
  const latest = useRef(s);
  useEffect(() => { latest.current = s; });
  const crossing = useCallback(({ lane, roundId }) => {
    const { question, settings } = latest.current;
    const right = question && roundId === latest.current.roundId && question.options[lane] === question.answer;
    dispatch({ type: 'PASS', roundId, lane, question: right ? makeSpaceQuestion(settings, question.key) : undefined });
  }, []);
  useImperativeHandle(ref, () => ({ crossing }));
  // Still play shows `outcome` during its feedback pause; flight shows `lastOutcome` while flying on.
  const shown = s.outcome ?? s.lastOutcome;
  useEffect(() => {
    if (shown && lastOutcome.current !== shown.roundId) {
      lastOutcome.current = shown.roundId;
      answer(shown.correct, { firstTry: shown.firstTry });
    }
  }, [shown, answer]);
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
      if (correct) dispatch({ type: 'NEXT', roundId: s.roundId, question: makeSpaceQuestion(s.settings, s.question.key) });
      else dispatch({ type: 'RETRY', roundId: s.roundId });
    }, correct ? FEEDBACK_MS.correct : FEEDBACK_MS.wrong);
    return () => window.clearTimeout(timer);
  }, [s.phase, s.paused, s.roundId, s.outcome, s.settings, s.question, clear]);
  const locked = s.paused || s.helpOpen || s.phase !== 'choosing';
  const grid = Boolean(s.question?.reverse);
  const steer = direction => send('SELECT_LANE', { lane: steerArithmeticLane(s.selectedLane, direction, grid) });
  const atEdge = direction => steerArithmeticLane(s.selectedLane, direction, grid) === s.selectedLane;
  // Equations use a real two-row flight grid; number answers keep four lanes.
  useEffect(() => {
    if (s.phase === 'setup' || still) return undefined;
    const key = e => {
      if (locked || e.repeat || e.target?.closest?.('input, textarea, select, [contenteditable="true"]')) return;
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const direction = { ArrowLeft: 'left', a: 'left', ArrowRight: 'right', d: 'right', ArrowUp: 'up', w: 'up', ArrowDown: 'down', s: 'down' }[k];
      if (!direction || (!grid && ['up', 'down'].includes(direction))) return;
      e.preventDefault(); send('SELECT_LANE', { lane: steerArithmeticLane(s.selectedLane, direction, grid) });
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [s.phase, s.selectedLane, still, locked, grid, send]);
  // Hold Shift (or the Turbo button) to make the rings close in faster.
  const [turbo, setTurbo] = useState(false);
  const flying = s.phase !== 'setup' && !still;
  useEffect(() => {
    if (!flying) return undefined;
    const down = e => { if (e.key === 'Shift' && !e.target?.closest?.('input, textarea, select, [contenteditable="true"]')) setTurbo(true); };
    const up = e => { if (e.key === 'Shift') setTurbo(false); };
    const off = () => setTurbo(false);
    window.addEventListener('keydown', down); window.addEventListener('keyup', up); window.addEventListener('blur', off);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); window.removeEventListener('blur', off); off(); };
  }, [flying]);
  const boosting = flying && turbo && !locked;
  useEffect(() => { flightApi?.setTurbo?.(boosting); }, [boosting, flightApi]);
  // Three or more right first time in a row: the rocket's flame burns big.
  const hot = flying && s.streak >= 3;
  useEffect(() => { flightApi?.setHot?.(hot); }, [hot, flightApi]);
  const turboPointer = useRef(null);
  // A held button misses its pointerup once disabled: drop Turbo whenever input locks.
  useEffect(() => { if (locked) { turboPointer.current = null; setTurbo(false); } }, [locked]);
  useEffect(() => {
    if (!s.paused && s.phase === 'choosing' && s.roundId) prompt.current?.focus({ preventScroll: true });
  }, [s.roundId, s.phase, s.paused]);
  useEffect(() => {
    if (!s.helpOpen && wasHelp.current && !s.paused) helpButton.current?.focus();
    wasHelp.current = s.helpOpen;
  }, [s.paused, s.helpOpen]);
  const start = () => { const question = makeSpaceQuestion(settings); reset(); dispatch({ type: 'START', question, settings }); };
  const journey = journeyAt(s.solved);
  const solvedText = s.outcome?.correct ? s.question.prompt.replace('?', s.question.answer) : s.question?.prompt;

  if (s.phase === 'setup') {
    const mixDisabled = settings.types.length < 2;
    return <section className="space-arithmetic solar-arithmetic-panel is-setup" aria-label="Space Arithmetic">
      <header className="space-arithmetic-bar">
        <button className="skill-btn space-arithmetic-back" onClick={() => flightApi?.leave()} aria-label="Back to Solar System">←</button>
        <h1>Space Arithmetic</h1>
      </header>
      <p className="space-arithmetic-lead">Your rocket flies by itself. {settings.find === 'sum' ? <>Steer <strong>up, down, left or right</strong> into the right sum.</> : <>Move <strong>left</strong> or <strong>right</strong> into the right ring.</>}</p>
      <h2 className="space-arithmetic-label" id="space-find">What to find?</h2>
      <div className="space-arithmetic-choices" role="group" aria-labelledby="space-find">
        {FIND_CHOICES.map(({ id, label, example }) => <button className="skill-btn space-arithmetic-find" key={id} aria-pressed={settings.find === id} onClick={() => setSettings(prev => ({ ...prev, find: id }))}>
          {label}<span className="space-arithmetic-example" aria-hidden="true">{example}</span>
        </button>)}
      </div>
      <h2 className="space-arithmetic-label" id="space-ops">What to practise?</h2>
      <div className="space-arithmetic-ops" role="group" aria-labelledby="space-ops">
        {OPERATIONS.map(op => <button className="skill-btn" key={op} aria-pressed={settings.types.includes(op)} onClick={() => setSettings(prev => withOperationToggled(prev, op))}>
          <span aria-hidden="true" className="space-arithmetic-sign">{OPERATION_SIGNS[op]}</span>{OPERATION_LABELS[op]}
        </button>)}
      </div>
      <button className="skill-btn space-arithmetic-mix" aria-pressed={settings.mixOperations} disabled={mixDisabled} onClick={() => setSettings(prev => ({ ...prev, mixOperations: !prev.mixOperations }))}>
        Mix operations in one question
      </button>
      <p className="space-arithmetic-note">{mixDisabled ? 'Pick two or more operations to mix them.' : 'Like 4 + (5 × 2). Brackets come first.'}</p>
      <h2 className="space-arithmetic-label" id="space-operands">How many numbers?</h2>
      <div className="space-arithmetic-choices" role="group" aria-labelledby="space-operands">
        {OPERAND_CHOICES.map(n => <button className="skill-btn" key={n} aria-pressed={settings.operands === n} onClick={() => setSettings(prev => ({ ...prev, operands: n }))}>{n}</button>)}
      </div>
      <h2 className="space-arithmetic-label" id="space-size">How big are the numbers?</h2>
      <div className="space-arithmetic-choices" role="group" aria-labelledby="space-size">
        {RANGE_PRESETS.map(top => { const on = settings.min === VALUE_FLOOR && settings.max === top;
          return <button className="skill-btn" key={top} aria-pressed={on} onClick={() => setSettings(prev => ({ ...prev, min: VALUE_FLOOR, max: top }))}>Up to {top}</button>; })}
      </div>
      <p className="space-arithmetic-readout" aria-live="polite">From <strong>{settings.min}</strong> to <strong>{settings.max}</strong></p>
      <RangeSlider min={settings.min} max={settings.max} floor={VALUE_FLOOR} ceiling={VALUE_CEILING}
        onMinChange={n => setSettings(prev => withMin(prev, n))} onMaxChange={n => setSettings(prev => withMax(prev, n))} />
      <button className="skill-btn space-arithmetic-start" onClick={start}>Start flight</button>
      <p className="space-arithmetic-note">A pretend practice space</p>
    </section>;
  }

  return <>
    <section className="space-arithmetic solar-arithmetic-panel is-playing" aria-label="Space Arithmetic">
      <header className="space-arithmetic-bar">
        <button className="skill-btn space-arithmetic-back" onClick={() => flightApi?.leave()} aria-label="Back to Solar System">←</button>
        <span className="space-arithmetic-count"><span>Sums solved: {s.solved}</span>
          {s.streak >= 2 && <span className={`space-arithmetic-streak${hot ? ' is-hot' : ''}`} aria-label={`${s.streak} right first time in a row`}>🔥 {s.streak}</span>}
        </span>
        {!s.paused && <SpeakButton compact text={s.question.reverse ? `Which sum makes ${s.question.target}?` : mathToSpeech(s.question.prompt)} label="Hear the question" />}
      </header>
      <h2 ref={prompt} tabIndex={-1} className={`space-arithmetic-sum${s.outcome?.correct ? ' is-solved' : ''}${solvedText.length > 14 ? ' is-long' : ''}`}>{solvedText}</h2>
      {!still && grid && <p className="space-arithmetic-note">Fly ↑ ↓ ← → into the right sum. Arrow keys or WASD.</p>}
      {s.lastOutcome?.correct && <p className="space-arithmetic-last"><span aria-hidden="true">✓ </span>{s.lastOutcome.solvedText}</p>}
      <p className={`space-arithmetic-journey${s.lastOutcome?.correct && journey.reached ? ' is-reached' : ''}`}>
        {s.lastOutcome?.correct && journey.reached
          ? <><span aria-hidden="true">🪐 </span>You reached {journey.reached}!</>
          : <><span aria-hidden="true">🚀 </span>Next stop: {journey.next}</>}
        <span className="space-arithmetic-pips" role="img" aria-label={`${journey.progress} of ${JOURNEY_LEG} sums to ${journey.next}`}>
          {Array.from({ length: JOURNEY_LEG }, (_, i) => <span key={i} className={i < journey.progress ? 'is-done' : undefined} />)}
        </span>
      </p>
      <AnswerFeedbackLine feedback={fb.feedback} ref={fb.feedbackRef} />
      <div className="space-arithmetic-tools">
        <button className="skill-btn" ref={helpButton} disabled={locked} onClick={() => send('OPEN_HELP')}>Show me</button>
        {s.paused
          ? <button className="skill-btn" onClick={() => { if (!document.hidden && document.hasFocus()) dispatch({ type: 'RESUME' }); }}>Resume</button>
          : <button className="skill-btn" onClick={() => send('PAUSE')}>Pause</button>}
        <button className="skill-btn" onClick={() => { reset(); send('CHANGE_SETTINGS'); }}>Settings</button>
      </div>
      {s.paused && <p className="space-arithmetic-note">Paused. Press Resume when you’re ready.</p>}
      {s.helpOpen && <section className="space-arithmetic-help" aria-label="Help">
        <Help question={s.question} />
        <button className="skill-btn" disabled={s.paused} onClick={() => { send('CLOSE_HELP'); helpButton.current?.focus(); }}>Close help</button>
      </section>}
      {still && <div className={`space-arithmetic-answers${s.question.reverse ? ' has-equations' : ''}`} role="group" aria-label="Answer rings">
        {s.question.options.map((n, lane) => <button className="skill-btn space-arithmetic-ring" key={lane} disabled={locked} aria-label={`Answer ${n}`} onClick={() => send('COMMIT', { lane })}>{n}</button>)}
      </div>}
    </section>
    {!still && <div className={`space-arithmetic-steer${grid ? ' is-grid' : ''}`} role="group" aria-label="Steer the rocket">
      {grid && <button className="skill-btn space-arithmetic-up" aria-label="Move up" disabled={locked || atEdge('up')} onClick={() => steer('up')}>▲</button>}
      <button className="skill-btn space-arithmetic-left" aria-label="Move left" disabled={locked || atEdge('left')} onClick={() => steer('left')}>◀</button>
      <span aria-live="polite" className="space-arithmetic-lane">{grid ? `${s.selectedLane < 2 ? 'Top' : 'Bottom'} ${s.selectedLane % 2 ? 'right' : 'left'} ring: ` : 'Ring '}{s.question.options[s.selectedLane]}</span>
      <button className="skill-btn space-arithmetic-right" aria-label="Move right" disabled={locked || atEdge('right')} onClick={() => steer('right')}>▶</button>
      {grid && <button className="skill-btn space-arithmetic-down" aria-label="Move down" disabled={locked || atEdge('down')} onClick={() => steer('down')}>▼</button>}
      <button className={`skill-btn space-arithmetic-turbo${boosting ? ' is-on' : ''}`} aria-label="Hold Turbo to fly faster" title="Hold to fly faster · Shift" disabled={locked}
        onPointerDown={e => { if (turboPointer.current !== null) return; turboPointer.current = e.pointerId; e.currentTarget.setPointerCapture?.(e.pointerId); e.preventDefault(); setTurbo(true); }}
        onPointerUp={e => { if (turboPointer.current === e.pointerId) { turboPointer.current = null; setTurbo(false); } }}
        onPointerCancel={() => { turboPointer.current = null; setTurbo(false); }}>Turbo</button>
    </div>}
  </>;
}
