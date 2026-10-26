import { useEffect, useRef } from 'react';
import { speak } from '../../../utils/speech.js';
import { isMuted } from '../../../components/celebration/sound/player.js';
import './SolarTripHud.css';

const editable = target => target?.closest?.('input, textarea, select, [contenteditable="true"]');

/**
 * The trip between star systems in the flight HUD: the leaving countdown, the
 * honest "sped up" label, a progress bar under reduced motion, and Turn back
 * (also B or Backspace). `trip` comes from free flight's view.
 */
export default function SolarTripHud({ trip, onTurnBack }) {
  const turnBackRef = useRef(onTurnBack);
  turnBackRef.current = onTurnBack;
  const warning = trip.phase === 'warning';
  const destination = trip.toHome ? `heading home to ${trip.toPhrase}` : `heading for ${trip.toPhrase}`;
  // Read aloud once per countdown; a new countdown mounts a new HUD.
  useEffect(() => {
    if (!warning || isMuted()) return;
    const to = trip.toSpoken ?? trip.toPhrase;
    speak(`Leaving ${trip.fromSpoken ?? trip.fromPhrase}, ${trip.toHome ? `heading home to ${to}` : `heading for ${to}`} in 3, 2, 1.`);
    // Only the first warning frame speaks.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const keydown = e => {
      if (!['b', 'B', 'Backspace'].includes(e.key) || editable(e.target)) return;
      e.preventDefault(); turnBackRef.current();
    };
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, []);
  const message = warning ? `Leaving ${trip.fromPhrase} — ${destination} in ${Math.max(1, Math.ceil(trip.secondsLeft))}…`
    : trip.phase === 'arriving' ? `Arriving at ${trip.toPhrase}` : `Flying to ${trip.toPhrase}`;
  const percent = Math.round(trip.progress * 100);
  return <div className="solar-trip">
    <p className="solar-trip__message" role="status">{message}</p>
    {trip.calm && !warning && <div className="solar-trip__progress" role="progressbar" aria-label="Trip progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
      <span style={{ width: `${percent}%` }} />
    </div>}
    <p className="solar-trip__honesty">Sped up — even light takes about {Math.round(trip.distanceLy)} years to make this trip.</p>
    <button type="button" className="solar-trip__turn-back" onClick={() => onTurnBack()}><span aria-hidden="true">↩</span> Turn back</button>
  </div>;
}
