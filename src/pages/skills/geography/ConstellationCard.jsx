import { useEffect, useRef } from 'react';
import SolarSections, { SolarSection } from './SolarSections.jsx';
import { SKY_LINE } from './constellationSkyLayout.js';
import { isMuted } from '../../../components/celebration/sound/player.js';
import { speak, stopNarration } from '../../../utils/speech.js';
import './ConstellationCard.css';

export default function ConstellationCard({ onFindSky, onJoinDots, constellation, index, total, muted, onPrevious, onNext, onToggleMute, onExit }) {
  const close = useRef(null), exit = useRef(onExit);
  exit.current = onExit;
  const spokenText = `${constellation.narration} ${SKY_LINE}`;
  useEffect(() => {
    if (muted || isMuted()) { stopNarration(); return; }
    speak(spokenText);
    return stopNarration;
  }, [spokenText, muted]);
  useEffect(() => {
    close.current?.focus();
    const escape = e => { if (e.key === 'Escape') { e.stopPropagation(); exit.current(); } };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, []);
  return <aside className="solar-constellation solar-constellation--sky" role="dialog" aria-label={`${constellation.name} information`}>
    <header className="solar-constellation__header">
      <div><span className="solar-constellation__eyebrow">Star pattern {index + 1} / {total}</span><h2>{constellation.name}</h2></div>
      <button aria-label="Centre constellation" title="Centre constellation" onClick={onFindSky}>🎯</button>
      <button ref={close} aria-label="Close constellations" onClick={onExit}>×</button>
    </header>
    <p className="solar-constellation__hint">Drag the sky to look around.</p>
    <div className="solar-constellation__scroll">
      <SolarSections key={constellation.id}>
        <SolarSection section="about" title="✨ About this pattern"><p>{constellation.alsoKnownAs}</p><p>{constellation.description}</p><p>{SKY_LINE}</p></SolarSection>
        <SolarSection section="facts" title="💡 Star facts"><ul>{constellation.facts.map(fact => <li key={fact}>{fact}</li>)}</ul></SolarSection>
      </SolarSections>
    </div>
    <nav className="solar-constellation__controls" aria-label="Constellation navigation">
      <button aria-label="Previous" title="Previous" onClick={onPrevious} disabled={index === 0}>←</button>
      <button className="solar-constellation__join" onClick={onJoinDots}>⭐ Join dots</button>
      <button aria-label="Next" title="Next" onClick={onNext} disabled={index === total - 1}>→</button>
      <button aria-label="Replay narration" title="Read aloud" disabled={muted} onClick={() => { if (!muted && !isMuted()) speak(spokenText); }}>↻</button>
      <button aria-label={muted ? 'Turn sound on' : 'Mute'} title={muted ? 'Turn sound on' : 'Mute'} onClick={onToggleMute}>{muted ? '🔊' : '🔇'}</button>
    </nav>
  </aside>;
}
