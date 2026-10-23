import { useEffect, useMemo, useRef, useState } from 'react';
import { traceSteps } from './constellationTrace.js';
import { isMuted } from '../../../components/celebration/sound/player.js';
import { speak, stopNarration } from '../../../utils/speech.js';
import './ConstellationCard.css';
import './JoinDots.css';

export default function JoinDots({ constellation, api, muted, onClose, onPrevious, onNext, index, total, completedIds = [], onCollect }) {
  const steps = useMemo(() => traceSteps(constellation.lines), [constellation]);
  const [count, setCount] = useState(0);
  const [retry, setRetry] = useState(false);
  const targets = useRef(new Map());
  const panel = useRef(null);
  const content = useRef(null);
  const done = count === steps.length;
  const next = steps[count];
  const name = constellation.stars.find(s => s.id === next?.id)?.name;
  const instruction = done ? `You drew ${constellation.name}! These lines are imaginary patterns in the sky.`
    : `${retry ? 'Try the numbered star. ' : ''}Tap ${count + 1}: ${name}.`;
  const returning = !done && count > 0 && next.lines === steps[count - 1].lines;
  const collected = new Set([...completedIds, ...(done ? [constellation.id] : [])]).size;
  useEffect(() => {
    panel.current?.focus();
    return stopNarration;
  }, []);
  useEffect(() => {
    if (count > 0) {
      if (next) targets.current.get(next.id)?.focus({ preventScroll: true });
      else { content.current?.scrollTo({ top: 0 }); panel.current?.focus({ preventScroll: true }); }
    }
  }, [count, next]);
  useEffect(() => {
    api?.setConstellationTrace(count ? steps[count - 1].lines : 0);
  }, [api, steps, count]);
  useEffect(() => () => api?.setConstellationTrace(null), [api]);
  useEffect(() => {
    let frame;
    const position = () => {
      for (const [id, button] of targets.current) {
        const point = api?.projectConstellationStar(id);
        button.style.visibility = point?.visible ? 'visible' : 'hidden';
        if (point) { button.style.left = `${point.x}px`; button.style.top = `${point.y}px`; }
      }
      frame = requestAnimationFrame(position);
    };
    position();
    return () => cancelAnimationFrame(frame);
  }, [api]);
  useEffect(() => {
    const escape = e => { if (e.key === 'Escape') { e.stopPropagation(); onClose(); } };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [onClose]);
  return <section className="solar-dots" aria-label={`Join the dots: ${constellation.name}`}>
    {!done && constellation.stars.map(star => <button key={star.id} type="button"
      ref={el => { if (el) targets.current.set(star.id, el); else targets.current.delete(star.id); }}
      className={`solar-dots__star${star.id === next.id ? ' solar-dots__star--next' : ''}`}
      aria-label={`Star ${star.name}`} tabIndex={star.id === next.id ? 0 : -1}
      onClick={() => { stopNarration(); if (star.id === next.id) { setCount(c => c + 1); setRetry(false); if (count + 1 === steps.length) onCollect?.(constellation.id); } else setRetry(true); }}>
      {star.id === next.id ? count + 1 : '·'}
    </button>)}
    <div className="solar-dots__panel solar-constellation solar-constellation--sky" ref={panel} tabIndex={-1} aria-label={`${constellation.name} tracing controls`}>
      <header className="solar-constellation__header">
        <div><span className="solar-constellation__eyebrow">Join the dots · {index + 1} / {total}</span><h2>{constellation.name}</h2></div>
        <button type="button" aria-label="Centre stars" title="Centre stars" onClick={() => api?.showConstellationSky(constellation.id)}>🎯</button>
        <button type="button" aria-label="Back to constellations" title="Back to constellations" onClick={onClose}>×</button>
      </header>
      <div className="solar-dots__progress">
        <progress value={count} max={steps.length} aria-label="Constellation progress" />
        <span>{count} / {steps.length}</span>
      </div>
      <div className="solar-dots__content solar-constellation__scroll" ref={content}>
        {done && <div className="solar-dots__reward" aria-label="Constellation complete"><strong>✅ Constellation complete! ⭐</strong></div>}
        <p className={`solar-dots__instruction${retry ? ' solar-dots__instruction--retry' : ''}`} role="status">{instruction}</p>
        {!done && <p className="solar-constellation__hint">{returning ? 'Follow the number back to an earlier star.' : 'Tap the numbered star. Drag to look around.'}</p>}
        <p className="solar-dots__collection" aria-label={`${collected} of ${total} constellations collected this visit`}>⭐ {collected} / {total} collected this visit{done ? ` · ${constellation.lines.length} lines joined` : ''}</p>
      </div>
      <nav className="solar-dots__actions solar-constellation__controls" aria-label="Tracing controls">
        <button type="button" aria-label="Previous" title="Previous pattern" onClick={onPrevious} disabled={index === 0}>←</button>
        {done && index < total - 1 && <button type="button" className="solar-dots__primary" aria-label="Try next constellation" onClick={onNext}>Next pattern →</button>}
        <button type="button" aria-label="Read aloud" title="Read aloud" onClick={() => { if (!muted && !isMuted()) speak(`${instruction}${returning ? ' Follow the number back to an earlier star.' : ''}`); }} disabled={muted}>🔊</button>
        <button type="button" aria-label="Start again" title="Start again" onClick={() => { stopNarration(); setCount(0); setRetry(false); }}>↻</button>
        {!done && <button type="button" aria-label="Next" title="Next pattern" onClick={onNext} disabled={index === total - 1}>→</button>}
      </nav>
    </div>
  </section>;
}
