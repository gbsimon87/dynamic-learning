import { useState } from 'react';
import { PLANET_DETAILS } from './planetDetails.js';
import PlanetPlayCard from './PlanetPlayCard.jsx';
import MoonPhaseCard from './MoonPhaseCard.jsx';
import AuroraCard from './AuroraCard.jsx';
import SolarSections, { SolarSection } from './SolarSections.jsx';
import { TRUE_RADII_KM } from './lineUpLayout.js';
import { SATURN_RING_LINE } from './saturnRingDetail.js';
import { COMET_LINE } from './cometOrbit.js';
import { EARTH_DAY_NIGHT_LINE } from './earthDayNight.js';
import { playFor } from './planetPlay.js';
import { isMuted } from '../../../components/celebration/sound/player.js';
import { speak } from '../../../utils/speech.js';

export default function SolarInfoCard({ body, tour, api, sceneApiRef, onClose, orbiting = false }) {
  const [expandedOrbit, setExpandedOrbit] = useState(null);
  const detailsVisible = !orbiting || expandedOrbit === body.name;
  const read = text => { if (!isMuted() && !(tour.active && tour.muted)) speak(text); };
  const canPlay = playFor(body.name);
  const planetDetails = body.kind === 'planet' ? PLANET_DETAILS[body.name] : null;
  const facts = planetDetails?.facts ?? body.facts;
  const closer = planetDetails?.closer ?? body.closer ?? [];
  const introduction = body.summary?.match(/^[\s\S]*?[.!?](?:\s|$)/)?.[0] ?? body.summary;
  const earthMoon = body.name === 'Moon' && body.parentName === 'Earth';
  return <aside className={`solar-info-card${tour.active ? ' solar-info-card--tour' : ''}`} aria-label={`${body.name} information`}>
    <div className="solar-info-card__header">
      <div><span className="solar-info-card__eyebrow">{tour.active ? `Tour stop ${tour.index + 1} of ${tour.total}` : body.kind === 'moon' ? `Moon of ${body.parentName}` : body.classification}</span><h2>{body.name}</h2></div>
      <button type="button" className="solar-info-card__close" aria-label={`Hide ${body.name} information`} onClick={onClose}>×</button>
    </div>
    {orbiting && <button type="button" className="solar-info-card__tour-button" aria-expanded={detailsVisible}
      onClick={() => setExpandedOrbit(detailsVisible ? null : body.name)}>{detailsVisible ? 'Hide' : 'Show'} {body.kind === 'moon' ? 'moon' : 'planet'} facts</button>}
    {body.summary && !tour.active && detailsVisible && <p className="solar-info-card__summary">{introduction}</p>}
    <div className="solar-info-card__body" hidden={!detailsVisible}>
      <SolarSections key={`${body.id ?? body.name}:${tour.active}`} defaultOpen={tour.active ? 'story' : 'facts'}>
        {tour.active && <SolarSection section="story" title="🔊 Tour story"><p>{body.narration}</p></SolarSection>}
        <SolarSection section="facts" title="✨ Discover">
          <div className="solar-info-card__meta"><span>{body.classification}</span><span>{body.moonSummary}</span></div>
          <ul>{facts.slice(0, 2).map(fact => <li key={fact}>{fact}</li>)}</ul>
          {facts.length > 2 && <details className="solar-info-card__more-facts"><summary>More facts</summary><ul>{facts.slice(2).map(fact => <li key={fact}>{fact}</li>)}</ul></details>}
        </SolarSection>
        {!tour.active && (canPlay.age || canPlay.weight) && <SolarSection section="play" title="🎲 Play & compare">
          <PlanetPlayCard bodyName={body.name} onLineUp={TRUE_RADII_KM[body.name] ? () => api?.openLineUp(body.name) : undefined} />
        </SolarSection>}
        <SolarSection section="closer" title="🔎 Look closer">
          {closer.length > 0 && <div>
            {closer.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            <button type="button" className="solar-info-card__tour-button" onClick={() => read(closer.join(' '))}>🔊 Read about {body.name}</button>
          </div>}
          <SolarSections>
        {body.name === 'Saturn' && <SolarSection section="rings" title="🧊 Saturn’s rings"><p>{SATURN_RING_LINE}</p><button className="solar-info-card__tour-button" onClick={() => read(SATURN_RING_LINE)}>🔊 Read aloud</button></SolarSection>}
        {body.kind === 'comet' && <SolarSection section="comet" title="☄️ Comet tails"><p>{COMET_LINE}</p><button className="solar-info-card__tour-button" onClick={() => read(COMET_LINE)}>🔊 Read aloud</button></SolarSection>}
        {body.name === 'Earth' && <SolarSection section="day-night" title="🌗 Day & night"><p>{EARTH_DAY_NIGHT_LINE}</p><button className="solar-info-card__tour-button" onClick={() => read(EARTH_DAY_NIGHT_LINE)}>🔊 Read aloud</button></SolarSection>}
        {(body.name === 'Earth' || earthMoon) && <SolarSection section="phases" title="🌙 Moon phases"><MoonPhaseCard embedded sceneApiRef={sceneApiRef} muted={tour.active && tour.muted} /></SolarSection>}
        {body.name === 'Earth' && <SolarSection section="auroras" title="✨ Northern lights"><AuroraCard embedded muted={tour.active && tour.muted} /></SolarSection>}
        {!tour.active && <SolarSection section="explore" title="🚀 Explore more">
          {body.kind === 'region' ? body.relatedBodies.map(related => <button key={related.id} className="solar-info-card__tour-button" onClick={() => api?.focusById(related.id)}>View {related.name}</button>)
            : <button className="solar-info-card__tour-button" onClick={() => body.kind === 'moon' ? api?.focusById(body.parentId) : api?.start()}>{body.kind === 'moon' ? `View ${body.parentName}` : 'Start guided tour'}</button>}
        </SolarSection>}
          </SolarSections>
        </SolarSection>
      </SolarSections>
    </div>
    {tour.active && <div className="solar-info-card__navigation" aria-label="Tour navigation">
      <button onClick={() => api?.previous()} disabled={tour.index === 0} aria-label="Previous">←</button>
      <button onClick={() => api?.replay()} disabled={tour.muted} aria-label="Replay narration">↻</button>
      <button onClick={() => api?.toggleNarration()} aria-label={tour.muted ? 'Turn sound on' : 'Mute'}>{tour.muted ? '🔊' : '🔇'}</button>
      <button onClick={() => api?.next()} aria-label={tour.index === tour.total - 1 ? 'One last look back at Earth' : 'Next'}>{tour.index === tour.total - 1 ? '🌍' : '→'}</button>
    </div>}
  </aside>;
}
