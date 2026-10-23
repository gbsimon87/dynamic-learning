import { useEffect, useId, useReducer, useRef, useState } from 'react';
import { stickVector } from './flightControls.js';
import { speak, stopNarration } from '../../../utils/speech.js';
import { isMuted } from '../../../components/celebration/sound/player.js';
import { createFlightRound, flightRoundReducer, FLIGHT_BADGES } from './flightClues.js';
import './SolarFlightControls.css';

const HELP = 'Steer with the joystick. Hold GO to fly. Let go to slow down. On a keyboard, use arrow keys or W A S D to steer, and Space to fly. Choose a world and press Face world to point towards it. Hold Turbo or Shift to boost. Turbo slows near destinations. The sizes and distances in this Solar System are compressed.';
export default function SolarFlightControls({ api, bodies, view, onClose }) {
  const hud = useRef(null), reward = useRef(null);
  const root = useRef(null), thumb = useRef(null), stickPointer = useRef(null), thrustPointer = useRef(null), boostPointer = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const [destination, setDestination] = useState('');
  const [round, dispatch] = useReducer(flightRoundReducer, undefined, createFlightRound);
  const [hint, setHint] = useState(false);
  const [adventure, setAdventure] = useState(0);
  const [panel, setPanel] = useState(null);
  const clue = round.deck[round.index];
  const flightId = useId();
  const goalToken = `${flightId}:${adventure}:${clue.id}`;
  const stars = round.earned.length;
  const badges = FLIGHT_BADGES.filter(badge => stars >= badge.stars);
  const newBadge = FLIGHT_BADGES.find(badge => stars === badge.stars);
  const targetName = bodies.find(body => body.id === clue.target)?.name ?? clue.target.split('/').at(-1);
  useEffect(() => { api?.setGoal?.(clue.target, goalToken); }, [api, clue, goalToken]);
  useEffect(() => () => api?.setGoal?.(null), [api]);
  useEffect(() => {
    if (view?.arrival?.token !== goalToken) return;
    dispatch({ type: 'arrive', target: view.arrival.target, token: clue.id });
  }, [view?.arrival, goalToken, clue]);
  useEffect(() => {
    if (!round.solved) return;
    hud.current?.scrollTo({ top: 0 });
    reward.current?.focus({ preventScroll: true });
  }, [round.solved]);
  const [burning, setBurning] = useState(false);
  const release = () => { api?.brake(); setBurning(false); stickPointer.current = thrustPointer.current = boostPointer.current = null; if (thumb.current) thumb.current.style.transform = ''; };
  useEffect(() => {
    root.current?.focus();
    const escape = e => { if (e.key === 'Escape') closeRef.current(); };
    window.addEventListener('keydown', escape);
    return () => { window.removeEventListener('keydown', escape); stopNarration(); };
  }, []);
  useEffect(() => {
    const reset = () => { api?.brake(); setBurning(false); stickPointer.current = thrustPointer.current = boostPointer.current = null; if (thumb.current) thumb.current.style.transform = ''; };
    window.addEventListener('blur', reset); document.addEventListener('visibilitychange', reset);
    return () => { window.removeEventListener('blur', reset); document.removeEventListener('visibilitychange', reset); api?.brake(); };
  }, [api]);
  const move = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const v = stickVector(e.clientX - rect.left - rect.width / 2, e.clientY - rect.top - rect.height / 2, (rect.width - 56) / 2);
    api?.setStick(v.x, v.y);
    if (thumb.current) thumb.current.style.transform = `translate(${v.thumbX}px, ${v.thumbY}px)`;
  };
  const endStick = e => {
    if (stickPointer.current !== e.pointerId) return;
    stickPointer.current = null; api?.setStick(0, 0);
    if (thumb.current) thumb.current.style.transform = '';
  };
  const endThrust = e => {
    if (thrustPointer.current !== e.pointerId) return;
    thrustPointer.current = null; api?.setThrust(false); setBurning(false);
  };
  return <section className="solar-flight" ref={root} tabIndex={-1} aria-label="Fly through the Solar System">
    <div className="solar-flight__top" ref={hud}>
      <header className="solar-flight__header">
        <button onClick={onClose} aria-label="Back to Solar System">←</button>
        <div><strong>Space explorer</strong><span>Clue {round.index + 1} / {round.deck.length}</span></div>
        <span className="solar-flight__stars" aria-label={`${stars} stars earned`}>⭐ {stars}</span>
        <button aria-label="Read clue" title="Read clue" onClick={() => { if (!isMuted()) speak(`${clue.clue}${hint ? ` ${clue.hint}` : ''}`); }}>🔊</button>
      </header>
      {round.solved ? <div className="solar-flight__reward" key={clue.id} role="status" ref={reward} tabIndex={-1}>
        <strong>✅ You found {targetName}!</strong><p>⭐ +1 star</p>
        {newBadge && <p>{newBadge.icon} New badge: <strong>{newBadge.name}</strong></p>}
        <details><summary>What did you discover?</summary><p>{clue.fact}</p>
          <button onClick={() => { if (!isMuted()) speak(`You found ${targetName}! You earned one star. ${clue.fact}`); }}>Read discovery</button>
        </details>
        {round.index === round.deck.length - 1 && <p>Adventure finished! You earned {stars} stars.</p>}
      </div> : <p className="solar-flight__clue">{clue.clue}</p>}
      {!round.solved && <>
        <nav className="solar-flight__tools" aria-label="Flight tools">
          <button aria-expanded={panel === 'destination'} aria-controls="flight-destination" onClick={() => setPanel(panel === 'destination' ? null : 'destination')}>🧭 Where to?</button>
          <button aria-expanded={panel === 'hint'} aria-controls="flight-hint" onClick={() => { setHint(true); setPanel(panel === 'hint' ? null : 'hint'); }}>💡 Hint</button>
          <button aria-expanded={panel === 'extras'} aria-controls="flight-extras" onClick={() => setPanel(panel === 'extras' ? null : 'extras')}>☰ More</button>
        </nav>
        {panel === 'hint' && <div className="solar-flight__panel" id="flight-hint"><p>{clue.hint}</p>
          <button onClick={() => { release(); setDestination(clue.target); setPanel(null); api?.face(clue.target); root.current?.focus(); }}>Help me steer</button>
        </div>}
        {panel === 'destination' && <div className="solar-flight__panel" id="flight-destination">
          <label>Choose a destination<select value={destination} onChange={e => setDestination(e.target.value)}>
            <option value="">Pick a world…</option>{bodies.map(b => <option key={b.id} value={b.id}>{b.name}{b.parentName ? ` · ${b.parentName}` : ''}</option>)}
          </select></label>
          <button disabled={!destination} onClick={() => { release(); setPanel(null); api?.face(destination); root.current?.focus(); }}>Point rocket here</button>
        </div>}
        <p className="solar-flight__guidance" aria-live="polite">{view?.navigationArrived ? `You reached ${view.navigationArrived}. Keep following the clue!` : view?.navigation
          ? view.gap < 2 ? `Nearly at ${view.navigation}!` : `Towards ${view.navigation} · hold GO or Turbo`
          : 'Steer + hold GO · hold Turbo for a boost'}</p>
      </>}
      {panel === 'extras' && <div className="solar-flight__panel" id="flight-extras">
        <strong>My discoveries</strong><p>Stars are for this adventure. Hints cost no stars.</p>
        {badges.length > 0 && <ul aria-label="Earned badges">{badges.map(badge => <li key={badge.name}>{badge.icon} {badge.name}</li>)}</ul>}
        {stars > 0 && <ul aria-label="Discoveries">{round.earned.map(item => <li key={item.id}>✅ {bodies.find(body => body.id === item.target)?.name ?? item.target.split('/').at(-1)}</li>)}</ul>}
        <button onClick={() => { release(); api?.home(); root.current?.focus(); }}>Back to Earth</button>
        <button onClick={() => { if (!isMuted()) speak(HELP); }}>Read aloud</button>
        <p>Arrows / WASD steer · Space flies · Shift boosts. Sizes and distances are compressed; travel speed is pretend.</p>
      </div>}
      {(round.solved || panel === 'extras') && <button className="solar-flight__next" onClick={() => {
        release(); stopNarration(); hud.current?.scrollTo({ top: 0 }); setHint(false); setDestination(''); setPanel(null);
        if (round.index === round.deck.length - 1) { setAdventure(n => n + 1); dispatch({ type: 'restart', round: createFlightRound() }); }
        else dispatch({ type: 'next' });
        root.current?.focus();
      }}>{round.index === round.deck.length - 1 ? 'New adventure' : round.solved ? 'Next clue →' : 'Skip clue'}</button>}
    </div>
    <div className="solar-flight__stick" role="group" aria-label="Joystick"
      onPointerDown={e => { if (stickPointer.current !== null) return; stickPointer.current = e.pointerId; e.currentTarget.setPointerCapture?.(e.pointerId); move(e); e.preventDefault(); root.current?.focus(); }}
      onPointerMove={e => { if (stickPointer.current === e.pointerId) move(e); }}
      onPointerUp={endStick} onPointerCancel={endStick} onLostPointerCapture={endStick}>
      <span ref={thumb} />
    </div>
    <button className={`solar-flight__go${burning && !round.solved ? ' is-on' : ''}`} aria-label="Thrust" disabled={round.solved}
      onPointerDown={e => { if (thrustPointer.current !== null) return; thrustPointer.current = e.pointerId; e.currentTarget.setPointerCapture?.(e.pointerId); e.preventDefault(); root.current?.focus(); api?.setThrust(true); setBurning(true); }}
      onPointerUp={endThrust} onPointerCancel={endThrust} onLostPointerCapture={endThrust}
      onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); api?.setThrust(true); setBurning(true); } }}
      onKeyUp={e => { if (e.key === ' ' || e.key === 'Enter') { api?.setThrust(false); setBurning(false); } }}
      onBlur={() => { api?.setThrust(false); setBurning(false); }}>GO!</button>
    <button className={`solar-flight__turbo${view?.boosting ? ' is-on' : ''}`} aria-label="Hold Turbo to boost" title="Hold to boost · Shift" disabled={round.solved}
      onPointerDown={e => { if (boostPointer.current !== null) return; boostPointer.current = e.pointerId; e.currentTarget.setPointerCapture?.(e.pointerId); e.preventDefault(); root.current?.focus(); api?.setBoost(true); }}
      onPointerUp={e => { if (boostPointer.current === e.pointerId) { boostPointer.current = null; api?.setBoost(false); } }}
      onPointerCancel={() => { boostPointer.current = null; api?.setBoost(false); }}
      onLostPointerCapture={() => { boostPointer.current = null; api?.setBoost(false); }}
      onKeyDown={e => { if ([' ', 'Enter', 'Shift'].includes(e.key)) { e.preventDefault(); api?.setBoost(true); } }}
      onKeyUp={e => { if ([' ', 'Enter', 'Shift'].includes(e.key)) api?.setBoost(false); }}
      onBlur={() => api?.setBoost(false)}>⚡ Turbo</button>
    {/* On touch-down: a phone drops the click of a second finger while one holds GO. */}
    <button className="solar-flight__brake" onPointerDown={e => { e.preventDefault(); release(); root.current?.focus(); }}
      onClick={() => { release(); root.current?.focus(); }}>Stop</button>
  </section>;
}
