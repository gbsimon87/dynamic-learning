import PlanetPlayCard from './PlanetPlayCard.jsx';
import MoonPhaseCard from './MoonPhaseCard.jsx';
import AuroraCard from './AuroraCard.jsx';
import WorldInfoCard from '../../../components/worlds/WorldInfoCard.jsx';
import { WorldSection } from '../../../components/worlds/WorldSections.jsx';
import { SATURN_RING_LINE } from './saturnRingDetail.js';
import { COMET_LINE } from './cometOrbit.js';
import { EARTH_DAY_NIGHT_LINE } from './earthDayNight.js';
import { playFor } from './planetPlay.js';
import { isMuted } from '../../../components/celebration/sound/player.js';
import { speak } from '../../../utils/speech.js';

export default function SolarInfoCard({ body, tour, api, sceneApiRef, onClose, orbiting = false }) {
  const read = text => { if (!isMuted() && !(tour.active && tour.muted)) speak(text); };
  // Everything here comes from the body's system definition (systems/bodyInfo.js).
  const canPlay = playFor(body.play);
  const sections = body.sections ?? {};
  const discovery = {
    ...body,
    eyebrow: tour.active ? `Tour stop ${tour.index + 1} of ${tour.total}` : body.kind === 'moon' ? `Moon of ${body.parentName}` : body.classification,
    factsNoun: body.kind === 'moon' ? 'moon' : body.kind === 'star' ? 'star' : 'planet',
    meta: [body.classification, body.moonSummary],
    facts: body.facts,
  };
  const playSection = !tour.active && (canPlay.age || canPlay.weight)
    && <PlanetPlayCard name={body.name} play={body.play} isHome={body.isHomeWorld} onLineUp={body.lineUp ? () => api?.openLineUp(body.name) : undefined} />;
  const closerExtras = <>
    {sections.rings && <WorldSection section="rings" title="🧊 Saturn’s rings"><p>{SATURN_RING_LINE}</p><button className="solar-info-card__tour-button" onClick={() => read(SATURN_RING_LINE)}>🔊 Read aloud</button></WorldSection>}
    {body.kind === 'comet' && <WorldSection section="comet" title="☄️ Comet tails"><p>{COMET_LINE}</p><button className="solar-info-card__tour-button" onClick={() => read(COMET_LINE)}>🔊 Read aloud</button></WorldSection>}
    {sections.dayNight && <WorldSection section="day-night" title="🌗 Day & night"><p>{EARTH_DAY_NIGHT_LINE}</p><button className="solar-info-card__tour-button" onClick={() => read(EARTH_DAY_NIGHT_LINE)}>🔊 Read aloud</button></WorldSection>}
    {sections.moonPhases && <WorldSection section="phases" title="🌙 Moon phases"><MoonPhaseCard embedded sceneApiRef={sceneApiRef} muted={tour.active && tour.muted} /></WorldSection>}
    {sections.auroras && <WorldSection section="auroras" title="✨ Northern lights"><AuroraCard embedded muted={tour.active && tour.muted} /></WorldSection>}
    {!tour.active && <WorldSection section="explore" title="🚀 Explore more">
      {body.kind === 'region' ? body.relatedBodies.map(related => <button key={related.id} className="solar-info-card__tour-button" onClick={() => api?.focusById(related.id)}>View {related.name}</button>)
        : <button className="solar-info-card__tour-button" onClick={() => body.kind === 'moon' ? api?.focusById(body.parentId) : api?.start()}>{body.kind === 'moon' ? `View ${body.parentName}` : 'Start guided tour'}</button>}
    </WorldSection>}
  </>;
  return <WorldInfoCard discovery={discovery} baseClass="solar-info-card" orbiting={orbiting} onClose={onClose} onRead={read}
    tour={{ ...tour, finishIcon: tour.finish === 'pale-blue-dot' ? '🌍' : '✓' }} tourActions={api}
    playSection={playSection} closerExtras={closerExtras} />;
}
