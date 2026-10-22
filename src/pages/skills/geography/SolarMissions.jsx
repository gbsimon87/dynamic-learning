import { useEffect, useRef, useState } from 'react';
import Dialog from '../../../components/ui/Dialog.jsx';
import { speak, stopNarrationOf } from '../../../utils/speech.js';
import { isMuted } from '../../../components/celebration/sound/player.js';
import { MISSIONS, missionMatches, loadMissionStamps, saveMissionStamps } from './solarMissions.js';
import './SolarMissions.css';

export default function SolarMissions({ enabled, body, onStart, onOpen }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const [completed, setCompleted] = useState(loadMissionStamps);
  const [saved, setSaved] = useState(true);
  const [found, setFound] = useState(false);
  const narration = useRef('');
  const root = useRef(null);
  useEffect(() => {
    const element = root.current;
    const parent = element?.parentElement;
    if (!element || !parent || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(() => parent.style.setProperty('--solar-mission-height', `${element.getBoundingClientRect().height}px`));
    observer.observe(element);
    return () => { observer.disconnect(); parent.style.removeProperty('--solar-mission-height'); };
  }, []);
  useEffect(() => () => stopNarrationOf(narration.current), []);
  useEffect(() => {
    if (!enabled) { setOpen(false); stopNarrationOf(narration.current); }
  }, [enabled]);
  useEffect(() => {
    if (!enabled || found || !missionMatches(active, body)) return;
    setFound(true);
    setCompleted(previous => previous.includes(active.id) ? previous : [...previous, active.id]);
  }, [enabled, active, body, found]);
  useEffect(() => { setSaved(saveMissionStamps(completed)); }, [completed]);
  const read = text => { if (!isMuted()) { narration.current = text; speak(text); } };
  const close = () => { setOpen(false); stopNarrationOf(narration.current); };
  return <div ref={root} className="solar-missions" hidden={!enabled}>
    <button className="solar-missions__launcher" type="button" onClick={() => { onOpen(); setOpen(true); }}>🎯 Missions {completed.length}/{MISSIONS.length}</button>
    {active && <div className="solar-missions__task">
      <span role="status">{found ? `✅ Found it! ${active.answer}` : `🎯 ${active.clue}`}</span>
      <button type="button" onClick={() => read(found ? active.answer : active.clue)} aria-label="Read mission aloud">🔊</button>
      <button type="button" onClick={() => { stopNarrationOf(narration.current); setActive(null); }} aria-label="Put mission away">✕</button>
    </div>}
    {open && <Dialog label="Space missions" className="solar-missions-dialog" onClose={close}>
      <h2>🎯 Space missions</h2>
      <p>Pick a clue, then use search or tap a world to fly there. Explore as much as you like!</p>
      <p>{completed.length} of {MISSIONS.length} stamps collected. Saved in this browser, shared by everyone using it.</p>
      {!saved && <p role="status">Your browser cannot save stamps right now. You can still play.</p>}
      <div className="solar-missions-dialog__list">{MISSIONS.map(mission => <article key={mission.id}>
        <p>{completed.includes(mission.id) ? '✅ ' : '🌟 '}{mission.clue}</p>
        <button type="button" onClick={() => read(mission.clue)} aria-label={`Read ${mission.id} clue aloud`}>🔊 Hear clue</button>
        <button type="button" onClick={() => { close(); onStart(); setFound(false); setActive(mission); }}> {completed.includes(mission.id) ? 'Explore again' : 'Try this mission'}</button>
      </article>)}</div>
    </Dialog>}
  </div>;
}
