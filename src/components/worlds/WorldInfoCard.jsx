import { useState } from 'react';
import WorldSections, { WorldSection } from './WorldSections.jsx';
import './WorldInfoCard.css';

const NO_TOUR = { active: false };

/**
 * The information card every world shares. A world passes a Discovery, its own
 * class prefix if it keeps its own styles, and any extra sections as slots.
 */
export default function WorldInfoCard({ discovery, baseClass = 'world-card', orbiting = false, onClose, onRead, tour = NO_TOUR, tourActions, playSection, closerExtras, playTitle = '🎲 Play & compare', storyTitle = '🔊 Tour story' }) {
  const [expandedOrbit, setExpandedOrbit] = useState(null);
  const { name, facts = [], closer = [] } = discovery;
  const detailsVisible = !orbiting || expandedOrbit === name;
  const lastStop = tour.active && tour.index === tour.total - 1;
  const tourPaused = Boolean(tour.paused);
  const introduction = discovery.summary?.match(/^[\s\S]*?[.!?](?:\s|$)/)?.[0] ?? discovery.summary;
  const css = part => `${baseClass}__${part}`;
  return <aside className={`${baseClass}${tour.active ? ` ${baseClass}--tour` : ''}`} aria-label={`${name} information`}>
    <div className={css('header')}>
      <div><span className={css('eyebrow')}>{discovery.eyebrow}</span><h2>{name}</h2></div>
      <button type="button" className={css('close')} aria-label={`Hide ${name} information`} onClick={onClose}>×</button>
    </div>
    {orbiting && <button type="button" className={css('tour-button')} aria-expanded={detailsVisible}
      onClick={() => setExpandedOrbit(detailsVisible ? null : name)}>{detailsVisible ? 'Hide' : 'Show'} {discovery.factsNoun} facts</button>}
    {discovery.summary && !tour.active && detailsVisible && <p className={css('summary')}>{introduction}</p>}
    {discovery.honesty && detailsVisible && <p className={css('honesty')}>{discovery.honesty}</p>}
    <div className={css('body')} hidden={!detailsVisible}>
      <WorldSections key={`${discovery.id ?? name}:${tour.active}`} defaultOpen={tour.active ? 'story' : 'facts'}>
        {tour.active && <WorldSection section="story" title={storyTitle}><p>{discovery.narration}</p></WorldSection>}
        <WorldSection section="facts" title="✨ Discover">
          <div className={css('meta')}>{discovery.meta?.map((tag, index) => <span key={index}>{tag}</span>)}</div>
          {discovery.stats?.length > 0 && <ul className={css('stats')}>{discovery.stats.map(stat => <li key={stat.label}><strong>{stat.label}</strong> {stat.value}{stat.compare && <span> · {stat.compare}</span>}</li>)}</ul>}
          <ul>{facts.slice(0, 2).map(fact => <li key={fact}>{fact}</li>)}</ul>
          {facts.length > 2 && <details className={css('more-facts')}><summary>More facts</summary><ul>{facts.slice(2).map(fact => <li key={fact}>{fact}</li>)}</ul></details>}
        </WorldSection>
        {playSection && <WorldSection section="play" title={playTitle}>{playSection}</WorldSection>}
        <WorldSection section="closer" title="🔎 Look closer">
          {closer.length > 0 && <div>
            {closer.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            <button type="button" className={css('tour-button')} onClick={() => onRead?.(closer.join(' '))}>🔊 Read about {name}</button>
          </div>}
          {closerExtras && <WorldSections>{closerExtras}</WorldSections>}
        </WorldSection>
      </WorldSections>
    </div>
    {tour.active && <div className={css('navigation')} aria-label="Tour navigation">
      <button onClick={() => tourActions?.previous()} disabled={tourPaused || tour.index === 0} aria-label="Previous">←</button>
      <button onClick={() => tourActions?.replay()} disabled={tourPaused || tour.muted} aria-label="Replay narration">↻</button>
      <button onClick={() => tourActions?.toggleNarration()} disabled={tourPaused} aria-label={tour.muted ? 'Turn sound on' : 'Mute'}>{tour.muted ? '🔊' : '🔇'}</button>
      <button onClick={() => tourActions?.next()} disabled={tourPaused} aria-label={lastStop ? tour.finishLabel : 'Next'}>{lastStop ? (tour.finishIcon ?? '✓') : '→'}</button>
    </div>}
  </aside>;
}
