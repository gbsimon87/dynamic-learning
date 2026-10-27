import { useEffect, useId, useReducer, useRef, useState } from 'react';
import { stickVector } from './flightControls.js';
import { speak, stopNarration } from '../../../utils/speech.js';
import { isMuted } from '../../../components/celebration/sound/player.js';
import { createChapterRound, flightChapters, flightRoundReducer, helpProgress, shuffledOptions } from './flightClues.js';
import SolarCameraChoices from './SolarCameraChoices.jsx';
import SolarOrbitControl from './SolarOrbitControl.jsx';
import SolarTripHud from './SolarTripHud.jsx';
import './SolarFlightControls.css';

const help = systemPhrase => `Use the joystick or arrow keys or W A S D to steer. Hold GO or Space to fly and Turbo or Shift to boost; let go to slow down. Press C to switch camera view. Once you have tried for a while, Where to? and Hint can point the rocket for you. In the asteroid belt, bumping a rock just wobbles the rocket. Turbo slows near destinations. The sizes and distances in ${systemPhrase} are compressed.`;
const LOCKED_HELP = 'Read the clue and try first — help is coming!';
/**
 * `clues`, `chapters`, `badges`, `startName`, `systemName` and `systemPhrase`
 * come from the system definition. `onHome` (away from home) flies home by
 * autopilot. `session` is a plain object the scene keeps while the child stays
 * in this system, so closing and reopening the panel keeps chapters and stars.
 */
export default function SolarFlightControls({ api, bodies, view, clues, chapters: chapterList, badges, startName, systemName, systemPhrase, session: sessionProp, cameraView = 'behind', onCameraViewChange = () => {}, onClose, onHome, homePhrase }) {
  const hud = useRef(null), reward = useRef(null);
  const root = useRef(null), thumb = useRef(null), stickPointer = useRef(null), thrustPointer = useRef(null), boostPointer = useRef(null);
  // While the next system loads the trip owns the screen: closing would flash the overview.
  const handingOver = Boolean(view?.trip?.waiting);
  const closeRef = useRef(onClose);
  closeRef.current = handingOver ? () => {} : onClose;
  const [destination, setDestination] = useState('');
  const ownSession = useRef({});
  const session = sessionProp ?? ownSession.current;
  const chapters = chapterList ?? flightChapters({ clues });
  // One chapter needs no choosing; otherwise the child picks (or returns to) one.
  const [round, dispatch] = useReducer(flightRoundReducer, undefined,
    () => session.round ?? (chapters.length === 1 ? createChapterRound(chapters[0], clues) : null));
  const [finished, setFinished] = useState(() => session.finished ?? []);
  const [pastStars, setPastStars] = useState(() => session.pastStars ?? 0);
  const [chapterDone, setChapterDone] = useState(() => session.chapterDone ?? null);
  const [hint, setHint] = useState(false);
  const [adventure, setAdventure] = useState(() => (session.adventure ?? 0) + 1);
  const [panel, setPanel] = useState(null);
  const [options, setOptions] = useState([]);
  const [hintOpened, setHintOpened] = useState({ token: null, at: 0 });
  const [now, setNow] = useState(() => Date.now());
  const [helpStart, setHelpStart] = useState({ token: null, engine: 0 });
  const engineNow = useRef(0);
  engineNow.current = view?.engineTime ?? engineNow.current;
  useEffect(() => { Object.assign(session, { round, finished, pastStars, chapterDone, adventure }); }, [session, round, finished, pastStars, chapterDone, adventure]);
  const [hudCollapsed, setHudCollapsed] = useState(() => typeof window !== 'undefined' && Boolean(window.matchMedia?.('(pointer: coarse), (max-width: 720px), (orientation: landscape) and (max-height: 520px)').matches));
  const clue = round && !chapterDone ? round.deck[round.index] : null;
  const chapter = chapters.find(c => c.id === (chapterDone ?? round?.chapterId)) ?? null;
  const flightId = useId();
  const goalToken = clue ? `${flightId}:${adventure}:${clue.id}` : null;
  const stars = pastStars + (round?.earned.length ?? 0);
  const earnedBadges = badges.filter(badge => stars >= badge.stars);
  const newBadge = round?.solved ? badges.find(badge => stars === badge.stars) : null;
  const nameOf = target => bodies.find(body => body.id === target)?.name ?? target.split('/').at(-1);
  const targetName = clue ? nameOf(clue.target) : '';
  const lastStep = Boolean(round) && round.index === round.deck.length - 1;
  const answer = clue && round.answers?.[clue.id];
  const helpState = helpProgress({ engineSeconds: helpStart.token === goalToken ? engineNow.current - helpStart.engine : 0, hintSeconds: hintOpened.token === goalToken ? (now - hintOpened.at) / 1000 : null });
  const changeCameraView = nextView => { onCameraViewChange(nextView); root.current?.focus(); };
  useEffect(() => { api?.setGoal?.(clue?.target ?? null, goalToken); }, [api, clue, goalToken]);
  useEffect(() => () => api?.setGoal?.(null), [api]);
  // Each new clue or step starts its own wait for help.
  useEffect(() => { setHelpStart({ token: goalToken, engine: engineNow.current }); }, [goalToken]);
  useEffect(() => { if (clue?.question) setOptions(shuffledOptions(clue.question)); }, [clue]);
  useEffect(() => {
    if (hintOpened.token !== goalToken || helpState.unlocked) return undefined;
    const timer = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(timer);
  }, [hintOpened, goalToken, helpState.unlocked]);
  useEffect(() => {
    if (!clue || view?.arrival?.token !== goalToken) return;
    dispatch({ type: 'arrive', target: view.arrival.target, token: clue.id });
  }, [view?.arrival, goalToken, clue]);
  const startChapter = next => {
    release(); stopNarration(); setPanel(null); setHint(false); setDestination('');
    setPastStars(n => n + (chapterDone ? 0 : round?.earned.length ?? 0));
    setChapterDone(null); setAdventure(n => n + 1);
    dispatch({ type: 'restart', round: createChapterRound(next, clues) });
    root.current?.focus();
  };
  const finishChapter = () => {
    setPastStars(n => n + round.earned.length);
    setFinished(list => list.includes(round.chapterId) ? list : [...list, round.chapterId]);
    setChapterDone(round.chapterId);
  };
  const choose = () => {
    if (!round || chapterDone) return;
    setPastStars(n => n + round.earned.length);
    dispatch({ type: 'restart', round: null });
  };
  const [bumpNote, setBumpNote] = useState(false);
  useEffect(() => {
    if (!view?.bumps) return undefined;
    setBumpNote(true);
    const timer = window.setTimeout(() => setBumpNote(false), 2000);
    return () => window.clearTimeout(timer);
  }, [view?.bumps]);
  const readQuestion = () => { if (!isMuted() && clue?.question) speak(`${clue.question.text} ${options.join(', or ')}?`); };
  useEffect(() => {
    if (!round?.solved) return;
    hud.current?.scrollTo({ top: 0 });
    reward.current?.focus({ preventScroll: true });
  }, [round?.solved]);
  const [burning, setBurning] = useState(false);
  const release = () => { api?.brake(); setBurning(false); stickPointer.current = thrustPointer.current = boostPointer.current = null; if (thumb.current) thumb.current.style.transform = ''; };
  useEffect(() => {
    root.current?.focus();
    // A dialog over the flight (the Beyond picker) handles its own Escape first.
    const escape = e => { if (e.key === 'Escape' && !e.defaultPrevented) closeRef.current(); };
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
  return <section className="solar-flight" ref={root} tabIndex={-1} aria-label={`Fly through ${systemPhrase}`}>
    {view?.trip && <SolarTripHud trip={view.trip} onTurnBack={() => { release(); api?.turnBack(); root.current?.focus(); }} />}
    <div className={`solar-flight__top${hudCollapsed ? ' is-collapsed' : ''}`} ref={hud}>
      <header className="solar-flight__header">
        <button onClick={onClose} disabled={handingOver} aria-label={`Back to ${systemName}`}>←</button>
        <div><strong>Space explorer</strong><span>{clue ? `${chapter?.icon ?? '🚀'} ${chapter?.name ?? ''} · Clue ${round.index + 1} / ${round.deck.length}` : chapterDone ? 'Adventure complete' : 'Choose an adventure'}</span></div>
        <span className="solar-flight__stars" aria-label={`${stars} stars earned`}>⭐ {stars}</span>
        {onHome && !view?.trip && <button className="solar-flight__home" aria-label={`Fly home to ${homePhrase}`} title={`Fly home to ${homePhrase}`} onClick={() => { release(); onHome(); root.current?.focus(); }}>🏠</button>}
        {clue && <button className="solar-flight__read-aloud" aria-label="Read clue" title="Read clue" onClick={() => { if (!isMuted()) speak(`${clue.clue}${hint ? ` ${clue.hint}` : ''}`); }}>🔊</button>}
        <button className="solar-flight__panel-toggle" aria-label={hudCollapsed ? 'Expand flight panel' : 'Collapse flight panel'} title={hudCollapsed ? 'Expand flight panel' : 'Collapse flight panel'} aria-expanded={!hudCollapsed} aria-controls="solar-flight-details" onClick={() => setHudCollapsed(value => !value)}>{hudCollapsed ? '⌄' : '⌃'}</button>
      </header>
      <SolarCameraChoices value={cameraView} onChange={changeCameraView} compact={hudCollapsed} />
      <SolarOrbitControl name={view?.orbitPlanet?.name} active={view?.orbiting} reducedMotion={view?.orbitSteady}
        onEnter={() => { release(); api?.enterOrbit(); root.current?.focus(); }}
        onLeave={() => { api?.leaveOrbit(); root.current?.focus(); }} />
      <div className="solar-flight__details" id="solar-flight-details" hidden={hudCollapsed}>
      {!clue && !chapterDone && <div className="solar-flight__chapters">
        <p>Choose an adventure. Each one has about five things to find.</p>
        <ChapterList chapters={chapters} finished={finished} suggested={finished.length === 0 ? chapters[0]?.id : null} onChoose={startChapter} />
      </div>}
      {chapterDone && <div className="solar-flight__chapter-done" role="status">
        <strong>🎉 {chapter?.name} complete!</strong>
        <p>{chapter?.icon} Chapter badge: <strong>{chapter?.name}</strong> · ⭐ {round?.earned.length ?? 0} found</p>
        {round?.earned.length > 0 && <ul aria-label="What you found">{round.earned.map(item => <li key={item.id}><strong>{nameOf(item.target)}:</strong> {item.fact}</li>)}</ul>}
        <button className="solar-flight__next" onClick={() => startChapter(chapter)}>Play {chapter?.name} again</button>
        <p>Or try another adventure:</p>
        <ChapterList chapters={chapters.filter(c => c.id !== chapterDone)} finished={finished} onChoose={startChapter} />
      </div>}
      {clue && (round.solved ? <div className="solar-flight__reward" key={clue.id} role="status" ref={reward} tabIndex={-1}>
        <strong>✅ You found {targetName}!</strong><p>⭐ +1 star</p>
        {newBadge && <p>{newBadge.icon} New badge: <strong>{newBadge.name}</strong></p>}
        <details open><summary>What did you discover?</summary><p>{clue.fact}</p>
          <button onClick={() => { if (!isMuted()) speak(`You found ${targetName}! You earned one star. ${clue.fact}`); }}>Read discovery</button>
        </details>
        {clue.question && <div className="solar-flight__question" role="group" aria-label="Quick question">
          <p><strong>{clue.question.text}</strong></p>
          <div className="solar-flight__answers">{options.map(option => <button key={option}
            className={answer && option === clue.question.answer ? 'is-right' : answer === option ? 'is-chosen' : undefined}
            aria-pressed={answer === option} disabled={Boolean(answer)}
            onClick={() => dispatch({ type: 'answer', stepId: clue.id, choice: option })}>{option}</button>)}</div>
          {answer && <p className="solar-flight__answer-note" role="status">{answer === clue.question.answer ? `Yes! ${clue.question.why}` : `Not quite — it’s “${clue.question.answer}”. ${clue.question.why}`}</p>}
          <button onClick={readQuestion}>Read question</button>
        </div>}
      </div> : <>
        <p className="solar-flight__clue">{clue.clue}</p>
        {round.index === 0 && chapter?.honesty && <p className="solar-flight__honesty">{chapter.honesty}</p>}
      </>)}
      {clue && !round.solved && <>
        <nav className="solar-flight__tools" aria-label="Flight tools">
          <button aria-expanded={panel === 'destination'} aria-controls="flight-destination" onClick={() => setPanel(panel === 'destination' ? null : 'destination')}>🧭 Where to?</button>
          <button aria-expanded={panel === 'hint'} aria-controls="flight-hint" onClick={() => { setHint(true); if (hintOpened.token !== goalToken) { setHintOpened({ token: goalToken, at: Date.now() }); setNow(Date.now()); } setPanel(panel === 'hint' ? null : 'hint'); }}>💡 Hint</button>
          <button aria-expanded={panel === 'extras'} aria-controls="flight-extras" onClick={() => setPanel(panel === 'extras' ? null : 'extras')}>☰ More</button>
        </nav>
        {panel === 'hint' && <div className="solar-flight__panel" id="flight-hint"><p>{clue.hint}</p>
          <button disabled={!helpState.unlocked} onClick={() => { release(); setDestination(clue.target); setPanel(null); api?.face(clue.target); root.current?.focus(); }}>Help me steer</button>
          {!helpState.unlocked && <HelpLock share={helpState.share} />}
        </div>}
        {panel === 'destination' && <div className="solar-flight__panel" id="flight-destination">
          <label>Choose a destination<select value={destination} onChange={e => setDestination(e.target.value)}>
            <option value="">Pick a world…</option>{bodies.map(b => <option key={b.id} value={b.id}>{b.name}{b.parentName ? ` · ${b.parentName}` : ''}</option>)}
          </select></label>
          <button disabled={!destination || !helpState.unlocked} onClick={() => { release(); setPanel(null); api?.face(destination); root.current?.focus(); }}>Point rocket here</button>
          {!helpState.unlocked && <HelpLock share={helpState.share} />}
        </div>}
        <p className="solar-flight__guidance" aria-live="polite">{bumpNote ? 'Bump! Rocks only wobble you — keep going.' : view?.navigationArrived ? `You reached ${view.navigationArrived}. Keep following the clue!` : view?.navigation
          ? view.gap < 2 ? `Nearly at ${view.navigation}!` : <>Towards {view.navigation}<span className="solar-flight__guidance--keyboard"> · hold Space to fly</span><span className="solar-flight__guidance--touch"> · hold GO or Turbo</span></>
          : <><span className="solar-flight__guidance--keyboard">Arrows / WASD steer · hold Space to fly · Shift boosts · C switches view</span><span className="solar-flight__guidance--touch">Joystick steers · hold GO to fly · Turbo boosts</span></>}</p>
      </>}
      {panel === 'extras' && <div className="solar-flight__panel" id="flight-extras">
        <strong>My discoveries</strong><p>Stars last while you explore here. Hints cost no stars.</p>
        {earnedBadges.length > 0 && <ul aria-label="Earned badges">{earnedBadges.map(badge => <li key={badge.name}>{badge.icon} {badge.name}</li>)}</ul>}
        {round?.earned.length > 0 && <ul aria-label="Discoveries">{round.earned.map(item => <li key={item.id}>✅ {nameOf(item.target)}</li>)}</ul>}
        {chapters.length > 1 && clue && <button onClick={() => { release(); setPanel(null); choose(); }}>Choose another adventure</button>}
        <button disabled={handingOver} onClick={() => { release(); api?.home(); root.current?.focus(); }}>Back to {startName}</button>
        <button onClick={() => { if (!isMuted()) speak(help(systemPhrase)); }}>Read aloud</button>
        <p>Desktop: arrows / WASD steer · hold Space to fly · hold Shift to boost · C switches camera view. Touch: joystick steers · hold GO to fly · Turbo boosts. Sizes and distances are compressed; travel speed is pretend.</p>
      </div>}
      {clue && (round.solved || panel === 'extras') && <button className="solar-flight__next" onClick={() => {
        release(); stopNarration(); hud.current?.scrollTo({ top: 0 }); setHint(false); setDestination(''); setPanel(null);
        if (lastStep) finishChapter();
        else dispatch({ type: 'next' });
        root.current?.focus();
      }}>{lastStep ? 'Finish adventure' : round.solved ? clue.continues ? 'Keep going →' : 'Next clue →' : 'Skip clue'}</button>}
      </div>
    </div>
    <div className="solar-flight__touch-controls">
      <div className="solar-flight__stick" role="group" aria-label="Joystick"
        onPointerDown={e => { if (stickPointer.current !== null) return; stickPointer.current = e.pointerId; e.currentTarget.setPointerCapture?.(e.pointerId); move(e); e.preventDefault(); root.current?.focus(); }}
        onPointerMove={e => { if (stickPointer.current === e.pointerId) move(e); }}
        onPointerUp={endStick} onPointerCancel={endStick} onLostPointerCapture={endStick}>
        <span ref={thumb} />
      </div>
      <button className={`solar-flight__go${burning && !(round?.solved && clue) ? ' is-on' : ''}`} aria-label="Thrust" disabled={Boolean(round?.solved && clue)}
        onPointerDown={e => { if (thrustPointer.current !== null) return; thrustPointer.current = e.pointerId; e.currentTarget.setPointerCapture?.(e.pointerId); e.preventDefault(); root.current?.focus(); api?.setThrust(true); setBurning(true); }}
        onPointerUp={endThrust} onPointerCancel={endThrust} onLostPointerCapture={endThrust}
        onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); api?.setThrust(true); setBurning(true); } }}
        onKeyUp={e => { if (e.key === ' ' || e.key === 'Enter') { api?.setThrust(false); setBurning(false); } }}
        onBlur={() => { api?.setThrust(false); setBurning(false); }}>GO!</button>
      <button className={`solar-flight__turbo${view?.boosting ? ' is-on' : ''}`} aria-label="Hold Turbo to boost" title="Hold to boost · Shift" disabled={Boolean(round?.solved && clue)}
        onPointerDown={e => { if (boostPointer.current !== null) return; boostPointer.current = e.pointerId; e.currentTarget.setPointerCapture?.(e.pointerId); e.preventDefault(); root.current?.focus(); api?.setBoost(true); }}
        onPointerUp={e => { if (boostPointer.current === e.pointerId) { boostPointer.current = null; api?.setBoost(false); } }}
        onPointerCancel={() => { boostPointer.current = null; api?.setBoost(false); }}
        onLostPointerCapture={() => { boostPointer.current = null; api?.setBoost(false); }}
        onKeyDown={e => { if ([' ', 'Enter', 'Shift'].includes(e.key)) { e.preventDefault(); api?.setBoost(true); } }}
        onKeyUp={e => { if ([' ', 'Enter', 'Shift'].includes(e.key)) api?.setBoost(false); }}
        onBlur={() => api?.setBoost(false)}>⚡ Turbo</button>
    </div>
  </section>;
}

function ChapterList({ chapters, finished, suggested = null, onChoose }) {
  return <ul className="solar-flight__chapter-list">{chapters.map(chapter => <li key={chapter.id}>
    <button className={chapter.id === suggested ? 'is-suggested' : undefined} onClick={() => onChoose(chapter)}>
      <span className="solar-flight__chapter-icon" aria-hidden="true">{chapter.icon}</span>
      <span><strong>{chapter.name}</strong>{finished.includes(chapter.id) && <span aria-label="finished"> ✓</span>}
        {chapter.id === suggested && <em> · Start here</em>}<small>{chapter.promise}</small></span>
    </button>
  </li>)}</ul>;
}

function HelpLock({ share }) {
  return <p className="solar-flight__help-lock">{LOCKED_HELP}
    <span className="solar-flight__help-progress" role="progressbar" aria-label="Help unlocking" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(share * 100)}>
      <span style={{ width: `${Math.round(share * 100)}%` }} />
    </span>
  </p>;
}
