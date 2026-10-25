import Dialog from '../../../components/ui/Dialog.jsx';
import './Beyond.css';

/**
 * Where to? (#113): one card per destination that really exists (owner: no
 * "coming soon" cards). The galaxy map (#108) will replace this later, reading
 * the same list from beyondDestinations.js.
 */
export default function BeyondPicker({ destinations, onChoose, onClose }) {
  return <Dialog label="Where to?" className="beyond-picker" onClose={onClose}>
    <header>
      <span className="beyond-picker__eyebrow">Warp to Beyond</span>
      <h2>🌀 Where to?</h2>
    </header>
    <p className="beyond-picker__intro">Pick a place outside our Solar System.</p>
    <div className="beyond-picker__list">
      {destinations.map((destination) => (
        <button key={destination.id} type="button" className="beyond-picker__card" onClick={() => onChoose(destination.id)}>
          <strong>{destination.name}</strong>
          <span className="beyond-picker__place">{destination.place.galaxyLabel}</span>
          <span>{destination.blurb}</span>
          {destination.pretendLines.map((line) => <span key={line} className="beyond-picker__pretend">{line}</span>)}
        </button>
      ))}
    </div>
  </Dialog>;
}
