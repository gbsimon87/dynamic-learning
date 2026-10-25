import { useEffect, useRef } from 'react';
import { speak } from '../../../utils/speech.js';
import { isMuted } from '../../../components/celebration/sound/player.js';
import { SPACE_RIPPLES_FACTS, SPACE_RIPPLES_LINE, SPACE_RIPPLES_PICTURE, SPACE_RIPPLES_PRETEND } from './spaceRipplesFacts.js';
import './Beyond.css';

/** The Space ripples card (#94): facts, honesty labels and the scene's actions. */
export default function SpaceRipplesCard({ stage, onBringTogether, onReplay, onHome }) {
  const card = useRef(null);
  const heading = useRef(null);
  const action = useRef(null);

  // Keyboard focus moves with the card's one action: Bring them together on
  // arrival, the title while it is gone (merging), Replay once settled. It is
  // left alone if the child has moved somewhere else on the page.
  useEffect(() => {
    const focused = document.activeElement;
    if (focused && focused !== document.body && !card.current?.contains(focused)) return;
    (action.current ?? heading.current)?.focus();
  }, [stage]);

  return <aside ref={card} className="solar-info-card beyond-ripples-card" aria-label="Space ripples">
    <div className="solar-info-card__header">
      <div>
        <span className="solar-info-card__eyebrow">Far beyond our galaxy</span>
        <h2 ref={heading} tabIndex={-1}>Space ripples</h2>
      </div>
    </div>
    <div className="solar-info-card__body">
      <ul className="beyond-ripples-card__facts">
        {SPACE_RIPPLES_FACTS.map((fact) => <li key={fact}>{fact}</li>)}
      </ul>
      <p className="beyond-ripples-card__label">{SPACE_RIPPLES_PICTURE}</p>
      <p className="beyond-ripples-card__label">{SPACE_RIPPLES_PRETEND}</p>
      <button type="button" className="beyond-ripples-card__listen" onClick={() => { if (!isMuted()) speak(SPACE_RIPPLES_LINE); }}>
        🔊 Hear about space ripples
      </button>
    </div>
    <div className="beyond-ripples-card__actions">
      {stage === 'waiting' && <button ref={action} type="button" className="beyond-ripples-card__primary" onClick={onBringTogether}>Bring them together</button>}
      {stage === 'settled' && <button ref={action} type="button" className="beyond-ripples-card__primary" onClick={onReplay}>Replay</button>}
      <button type="button" onClick={onHome}>Back to the Solar System</button>
    </div>
  </aside>;
}
