import './RangeSlider.css';

/**
 * Two thumbs on one track: two native range inputs laid over each other, so
 * keyboard, screen readers and touch all keep working. Only the thumbs take
 * pointer events; the track underneath is drawn here.
 */
export default function RangeSlider({ min, max, floor, ceiling, onMinChange, onMaxChange }) {
  const span = ceiling - floor;
  const lo = (min - floor) / span;
  const hi = (max - floor) / span;
  // Near the top end the Min thumb must sit above Max, or it can't be dragged back.
  const minOnTop = min > floor + span / 2;

  return (
    <div className="ap-slider" style={{ '--lo': lo, '--hi': hi }}>
      <div className="ap-slider-track" aria-hidden="true">
        <div className="ap-slider-fill" />
      </div>
      <input
        type="range"
        className="ap-slider-input"
        style={{ zIndex: minOnTop ? 3 : 2 }}
        aria-label="Smallest number"
        min={floor}
        max={ceiling}
        value={min}
        onChange={(e) => onMinChange(parseInt(e.target.value, 10))}
      />
      <input
        type="range"
        className="ap-slider-input"
        style={{ zIndex: minOnTop ? 2 : 3 }}
        aria-label="Biggest number"
        min={floor}
        max={ceiling}
        value={max}
        onChange={(e) => onMaxChange(parseInt(e.target.value, 10))}
      />
      <div className="ap-slider-ends" aria-hidden="true">
        <span>{floor}</span>
        <span>{ceiling}</span>
      </div>
    </div>
  );
}
