import { useEffect, useRef, useState } from 'react';
import { speak, stopNarration } from '../../../utils/speech.js';
import { isMuted } from '../../../components/celebration/sound/player.js';
import { spreadMarkers } from './galaxyMapData.js';
import './GalaxyMap.css';

const LEVELS = {
  galaxies: { title: 'Galaxies near ours', note: 'Distances squeezed to fit', back: null },
  'milky-way': { title: 'The Milky Way, our galaxy', note: 'Tap “You are here” to see the stars near us', back: 'galaxies' },
  neighbourhood: { title: 'Our neighbourhood', note: 'Real directions and distances, in light-years', back: 'milky-way' },
};

// Marker positions change every frame; only redraw when one moves a whole pixel.
const sameMarkers = (a, b) => a.length === b.length && a.every((m, i) => m.id === b[i].id && m.visible === b[i].visible
  && Math.round(m.x) === Math.round(b[i].x) && Math.round(m.y) === Math.round(b[i].y));

function cardFor(marker, catalogue) {
  if (marker.kind === 'galaxy') return { kind: 'galaxy', ...catalogue.galaxies.find((g) => g.id === marker.id) };
  if (marker.kind === 'event') return { kind: 'event', ...catalogue.events.find((e) => e.id === marker.id) };
  return { kind: 'system', ...catalogue.systems.find((s) => s.id === marker.id) };
}

function cardLines(card) {
  if (card.kind === 'galaxy') return [card.card.what, card.card.fact, 'It is much too far to visit — we can only look.'];
  if (card.kind === 'event') return [card.label, card.blurb];
  return [card.home ? 'Our home' : `About ${Math.round(card.distanceLy)} light-years from home`,
    card.mapCard?.starType, card.mapCard && `${card.mapCard.planetCount} planets`, card.mapCard?.fact].filter(Boolean);
}

/**
 * The galaxy map's buttons over its 3D scene (galaxyMap.js): a header with
 * the level, Back and Close; a labelled button on every marker, placed from
 * `getMarkers()` each frame; and a card for the chosen marker — Jump there,
 * Go home, Visit (events) or Back to the current system.
 */
export default function GalaxyMapPanel({ catalogue, level, currentSystemId, getMarkers, onLevel, onFocus, onClose, onJump, onGoHome, onVisitEvent }) {
  const [markers, setMarkers] = useState(() => spreadMarkers(getMarkers()));
  const [selected, setSelected] = useState(null);
  const getRef = useRef(getMarkers);
  getRef.current = getMarkers;
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const selectedRef = useRef(selected);
  selectedRef.current = selected;
  const root = useRef(null);
  useEffect(() => {
    let frame = 0;
    const tick = () => {
      const next = spreadMarkers(getRef.current());
      setMarkers((current) => (sameMarkers(current, next) ? current : next));
      frame = window.requestAnimationFrame?.(tick);
    };
    frame = window.requestAnimationFrame?.(tick);
    return () => window.cancelAnimationFrame?.(frame);
  }, []);
  useEffect(() => { setSelected(null); setMarkers(spreadMarkers(getRef.current())); }, [level]);
  useEffect(() => {
    root.current?.focus();
    const keydown = (e) => {
      if (e.key !== 'Escape' || e.defaultPrevented) return;
      e.preventDefault();
      if (selectedRef.current) setSelected(null); else closeRef.current();
    };
    window.addEventListener('keydown', keydown);
    return () => { window.removeEventListener('keydown', keydown); stopNarration(); };
  }, []);

  const info = LEVELS[level];
  const choose = (marker) => {
    if (marker.kind === 'galaxy' && marker.enterable) { onLevel('milky-way'); return; }
    if (marker.kind === 'here') { onLevel('neighbourhood'); return; }
    setSelected(cardFor(marker, catalogue));
    onFocus(marker.id);
  };
  const isCurrent = selected?.kind === 'system' && selected.id === currentSystemId;
  return <section className="galaxy-map" ref={root} tabIndex={-1} aria-label="Galaxy map">
    <header className="galaxy-map__header">
      {info.back && <button type="button" onClick={() => onLevel(info.back)}><span aria-hidden="true">← </span>Back</button>}
      <div className="galaxy-map__title"><h2>{info.title}</h2><p>{info.note}</p></div>
      <button type="button" className="galaxy-map__close" aria-label="Close the galaxy map" onClick={onClose}>✕</button>
    </header>
    <div className="galaxy-map__markers">
      {markers.map((marker) => <button key={marker.id} type="button" hidden={!marker.visible}
        className={`galaxy-map__marker galaxy-map__marker--${marker.kind}${marker.here ? ' is-here' : ''}${selected?.id === marker.id ? ' is-selected' : ''}`}
        style={{ left: `${marker.x}px`, top: `${marker.y}px` }}
        aria-label={marker.here ? `${marker.label} (you are here)` : marker.label}
        onClick={() => choose(marker)}>
        <span className="galaxy-map__dot" aria-hidden="true" />
        <span className="galaxy-map__label">{marker.label}{marker.here ? ' · you are here' : ''}</span>
      </button>)}
    </div>
    {selected && <section className="galaxy-map__card" role="region" aria-label={selected.name}>
      <header><h3>{selected.name}</h3>
        <button type="button" aria-label="Read aloud" onClick={() => { if (!isMuted()) speak([selected.spokenName ?? selected.name, ...cardLines(selected)].join('. ')); }}>🔊</button>
      </header>
      {cardLines(selected).map((line) => <p key={line}>{line}</p>)}
      <div className="galaxy-map__actions">
        {selected.kind === 'event' && <button type="button" onClick={() => onVisitEvent(selected.id)}><span aria-hidden="true">🌀 </span>Visit</button>}
        {selected.kind === 'system' && (isCurrent
          ? <button type="button" onClick={onClose}>Back to {selected.phrase}</button>
          : selected.home ? <button type="button" onClick={onGoHome}><span aria-hidden="true">🏠 </span>Go home</button>
            : <button type="button" onClick={() => onJump(selected.id)}><span aria-hidden="true">🚀 </span>Jump there</button>)}
        <button type="button" onClick={() => setSelected(null)}>Close card</button>
      </div>
    </section>}
  </section>;
}
