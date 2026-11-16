import { useCallback, useEffect, useImperativeHandle, useMemo, useReducer, useRef, useState } from 'react';
import { SPACE_MATH_MODES, activityFlightWave, collectedTotal, createSpaceActivityState, makeSpaceActivity, reduceSpaceActivity } from '../../../data/freePlay/spaceMathActivities.js';
import { useAnswerFeedback } from '../../../components/skills/useAnswerFeedback.js';
import AnswerFeedbackLine from '../../../components/skills/AnswerFeedbackLine.jsx';
import SpeakButton from '../../../components/challenge/SpeakButton.jsx';
import SpaceMathFlightView from './SpaceMathFlightView.jsx';
import { SpaceSetupShell, SpaceTools, TurboButton } from './SpaceControls.jsx';
import { isTypingTarget, resumeWhenFocused, useSpaceTurbo } from './useSpaceTurbo.js';
import './SpaceMathActivities.css';

// A worked example for each station, as a picture first (spoken label for screen readers).
const EXAMPLES = {
  collect: { picture: <>⭐3 + ⭐3 + ⭐3 <b>→</b> 🎯9</>, label: 'Example: 3 + 3 + 3 makes 9.' },
  balance: { picture: <>4 + 3 <b>⚖️</b> 5 + 2</>, label: 'Example: 4 + 3 balances 5 + 2.' },
  share: { picture: <>💎6 <b>→</b> 👽2 👽2 👽2</>, label: 'Example: 6 crystals shared by 3 aliens is 2 each.' },
};
function Example({ mode }) {
  const example = EXAMPLES[mode];
  return <p className="space-activity-example" role="img" aria-label={example.label}><span aria-hidden="true">{example.picture}</span></p>;
}
function Gates({ info }) {
  return <ul className="space-activity-gates" aria-label="Gates">{info.gates.map(gate => <li key={gate}>{gate}</li>)}</ul>;
}

/** Where the activity stands, as a picture: the scene's station shows the same. */
function Progress({ s }) {
  const q = s.activity;
  if (q.kind === 'collect') {
    const total = collectedTotal(s.cargo);
    return <div className="space-activity-progress" role="status" aria-label={`Cargo ${total} of ${q.target}`}>
      <span className="space-activity-meter" aria-hidden="true"><span style={{ width: `${Math.min(100, (total / q.target) * 100)}%` }} /></span>
      <span aria-hidden="true">⭐ <strong>{total}</strong> / {q.target}{s.cargo.length > 1 && <small> · {s.cargo.join(' + ')}</small>}</span>
    </div>;
  }
  if (q.kind === 'balance') {
    const right = `${q.base} + ${s.cargo.length}`;
    return <div className="space-activity-progress is-balance" role="status" aria-label={`Station ${q.a} + ${q.b} and ${right}`}>
      <span className="space-activity-pan" aria-hidden="true">{q.a} + {q.b}</span><span aria-hidden="true">⚖️</span><span className="space-activity-pan" aria-hidden="true">{right}</span>
    </div>;
  }
  const left = q.total - collectedTotal(s.loads);
  return <div className="space-activity-progress is-share" role="status" aria-label={`Ship ${left}. ${s.loads.map((n, i) => `Alien ${i + 1}: ${n}`).join(', ')}`}>
    <span className="space-activity-pan" aria-hidden="true">🚀 💎{left}</span>
    {s.loads.map((n, i) => <span key={i} className="space-activity-pan" aria-hidden="true">👽 <strong>{n}</strong></span>)}
  </div>;
}

/**
 * Target Collector, Balance the Space Station and Alien Sharing Station. Every
 * action is a gate flown through in the Solar scene; the card only shows the
 * goal, a picture of progress and the icon tools.
 */
export default function SpaceMathActivities({ mode, onModeChange, flightApi, forceStill, roundSequence, ref }) {
  const [s, dispatch] = useReducer(reduceSpaceActivity, roundSequence.current, createSpaceActivityState);
  const [limit, setLimit] = useState(10), [lane, setLane] = useState(1);
  const [reduced, setReduced] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
  const latest = useRef(s), prepared = useRef(null), reported = useRef(null), heading = useRef(null), help = useRef(null), wasHelp = useRef(false);
  const fb = useAnswerFeedback();
  const { answer, clear } = fb;
  const info = SPACE_MATH_MODES.find(m => m.id === mode), q = s.activity;
  const still = forceStill || reduced, playing = s.phase === 'active';
  const locked = s.paused || s.helpOpen || !playing;
  const wave = useMemo(() => (s.activity ? activityFlightWave(s) : null), [s]);
  const send = (type, extra = {}) => dispatch({ type, roundId: s.roundId, ...extra });
  useEffect(() => { latest.current = s; roundSequence.current = Math.max(roundSequence.current, s.roundId); }, [s, roundSequence]);
  useEffect(() => {
    const pause = () => dispatch({ type: 'PAUSE' });
    const hidden = () => { if (document.hidden) pause(); };
    const query = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const changed = () => setReduced(query.matches);
    window.addEventListener('blur', pause); document.addEventListener('visibilitychange', hidden); query?.addEventListener('change', changed);
    return () => { window.removeEventListener('blur', pause); document.removeEventListener('visibilitychange', hidden); query?.removeEventListener('change', changed); };
  }, []);
  useEffect(() => {
    flightApi?.setHot?.(false); flightApi?.setTier?.(null); flightApi?.setMission?.(null);
    return () => { flightApi?.setState?.({ blocked: true, phase: 'setup' }); };
  }, [flightApi]);
  // Turbo works here as in Laser Blast: the gates close in faster.
  const turbo = useSpaceTurbo({ flying: playing && !still, locked, flightApi });
  useEffect(() => {
    if (playing && !still && prepared.current !== s.roundId) {
      prepared.current = s.roundId; flightApi?.prepareRound?.(wave, s.roundId);
    }
  }, [playing, still, s.roundId, wave, flightApi]);
  useEffect(() => { flightApi?.setState?.({ blocked: still || locked, phase: playing ? 'choosing' : 'setup' }); }, [playing, still, locked, s.roundId, flightApi]);
  useEffect(() => { if (playing) flightApi?.setLane?.(lane); }, [lane, playing, s.roundId, flightApi]);
  const fly = useCallback(({ lane: chosen, roundId }) => {
    const now = latest.current;
    if (now.phase !== 'active' || now.paused || now.helpOpen || now.roundId !== roundId) return;
    dispatch({ type: 'FLY', lane: chosen, roundId, nextActivity: makeSpaceActivity(mode, limit) });
  }, [mode, limit]);
  const crossing = useCallback(event => { if (!still) fly(event); }, [still, fly]);
  useImperativeHandle(ref, () => ({ crossing, stardust() {} }), [crossing]);
  useEffect(() => {
    if (locked) return undefined;
    const down = event => {
      if (isTypingTarget(event.target) || event.ctrlKey || event.metaKey || event.altKey) return;
      const key = event.key.toLowerCase();
      const direction = ['arrowleft', 'a'].includes(key) ? -1 : ['arrowright', 'd'].includes(key) ? 1 : 0;
      if (direction) { event.preventDefault(); setLane(n => Math.max(0, Math.min(3, n + direction))); }
      if (still && !event.repeat && [' ', 'f'].includes(key) && !event.target?.closest?.('button, a')) {
        event.preventDefault(); fly({ lane, roundId: s.roundId });
      }
    };
    window.addEventListener('keydown', down); return () => window.removeEventListener('keydown', down);
  }, [locked, still, lane, s.roundId, fly]);
  // A finished activity: feedback, and fireworks in the scene.
  useEffect(() => {
    if (s.result && reported.current !== s.result.id) {
      reported.current = s.result.id; answer(s.result.correct, { firstTry: s.result.firstTry });
      if (s.result.correct) flightApi?.celebrate?.({ kind: 'activity' });
    } else if (!s.result) clear();
  }, [s.result, answer, clear, flightApi]);
  useEffect(() => { if (playing && !s.paused) heading.current?.focus({ preventScroll: true }); }, [playing, s.paused]);
  useEffect(() => {
    if (wasHelp.current && !s.helpOpen && !s.paused) help.current?.focus();
    wasHelp.current = s.helpOpen;
  }, [s.helpOpen, s.paused]);

  if (!playing) {
    const row = (id, label, content) => <div className="space-arithmetic-row">
      <h2 className="space-arithmetic-label" id={id}>{label}</h2>{content}
    </div>;
    return <SpaceSetupShell mode={mode} onModeChange={onModeChange} onBack={() => flightApi?.leave?.()} className="space-activities is-activity-setup"
      onStart={() => dispatch({ type: 'START', activity: makeSpaceActivity(mode, limit) })}>
      <Example mode={mode} />
      {row('space-activity-gates', 'Gates', <Gates info={info} />)}
      {row('space-activity-range', 'Up to', <div className="space-arithmetic-segmented" role="group" aria-labelledby="space-activity-range">
        {[10, 20].map(n => <button key={n} className="skill-btn" aria-label={`Up to ${n}`} aria-pressed={limit === n} onClick={() => setLimit(n)}>{n}</button>)}
      </div>)}
    </SpaceSetupShell>;
  }

  const goal = q.kind === 'collect' ? `Make ${q.target}` : q.kind === 'balance' ? `${q.a} + ${q.b} = ${q.base} + ?` : `Share ${q.total} fairly`;
  const miss = s.result && !s.result.correct;
  return <>
    <section className="space-arithmetic solar-arithmetic-panel space-activities is-flying" aria-label="Space Arithmetic">
      <header className="space-arithmetic-bar">
        <button className="skill-btn space-arithmetic-back" onClick={() => flightApi?.leave?.()} aria-label="Back to Solar System">←</button>
        <span className="space-arithmetic-count">
          <span className="space-arithmetic-solved" aria-label={`Activities completed: ${s.solved}`}><span aria-hidden="true">✅ </span>{s.solved}</span>
        </span>
        {!s.paused && <SpeakButton compact text={`${goal}. ${info.how}`} label="Hear the question" />}
      </header>
      <h2 className="space-arithmetic-sum is-long" ref={heading} tabIndex={-1}><span aria-hidden="true">{info.icon} </span>{goal}</h2>
      {s.helpOpen ? <section className="space-arithmetic-help space-activities-help" aria-label="Help">
        <p>{info.how}</p>
        <Example mode={mode} />
      </section> : <Progress s={s} />}
      {s.result?.correct && <p className="space-arithmetic-last"><span aria-hidden="true">✓ </span>{s.result.solvedText}</p>}
      {miss && <p className="space-activity-miss"><span aria-hidden="true">🔁 </span>{mode === 'share' ? 'Not fair yet. Move a crystal.' : 'Not yet. Fix it, then dock.'}</p>}
      <AnswerFeedbackLine feedback={fb.feedback} ref={fb.feedbackRef} />
      <SpaceTools helpRef={help} locked={locked} paused={s.paused} helpOpen={s.helpOpen} onHelp={() => send('HELP')}
        onPause={() => dispatch({ type: 'PAUSE' })} onResume={resumeWhenFocused(() => dispatch({ type: 'RESUME' }))}
        onSettings={() => onModeChange(mode)} />
      {s.paused && <p className="space-arithmetic-paused" role="status"><span aria-hidden="true">⏸ </span>Paused</p>}
    </section>
    {still && <SpaceMathFlightView state={s} wave={wave} lane={lane} />}
    <div className="space-arithmetic-steer space-math-flight-controls" role="group" aria-label="Steer the rocket">
      <button className="skill-btn" disabled={locked || lane === 0} aria-label="Move left" onClick={() => setLane(n => Math.max(0, n - 1))}>◀</button>
      <span className="space-arithmetic-lane" aria-live="polite">Gate: {wave.options[lane]}</span>
      <button className="skill-btn" disabled={locked || lane === 3} aria-label="Move right" onClick={() => setLane(n => Math.min(3, n + 1))}>▶</button>
      {still
        ? <button className="skill-btn space-math-advance" disabled={locked} onClick={() => fly({ lane, roundId: s.roundId })}>Fly through</button>
        : <TurboButton turbo={turbo} disabled={locked} />}
    </div>
  </>;
}
