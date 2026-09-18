import { useRef } from "react";
import { tickValues } from "../../data/challenges/measurement";
import "./challenge-kit.css";

/**
 * The same scale as ScaleReader, but the learner sets the pointer.
 *
 * Clicking anywhere on the track places the pointer, and arrow keys nudge it
 * by one step. Both are deliberately the primary way in: dragging is added on
 * top, so a learner who cannot drag — or a browser where the drag misbehaves —
 * can still answer. The value always snaps to `step`, so an answer is exact
 * rather than "close enough".
 */
function MeasureDrag({
  min,
  max,
  majorStep,
  step,
  value,
  unit,
  orientation = "horizontal",
  onChange,
  disabled,
  label,
}) {
  const trackRef = useRef(null);
  const ticks = tickValues(min, max, majorStep);
  const percent = ((value - min) / (max - min)) * 100;

  const snap = (raw) => {
    const clamped = Math.min(max, Math.max(min, raw));
    return Math.round(clamped / step) * step;
  };

  const setFromPoint = (clientX, clientY) => {
    const track = trackRef.current;
    if (!track || disabled) return;
    const box = track.getBoundingClientRect();
    const ratio =
      orientation === "vertical"
        ? (box.bottom - clientY) / box.height
        : (clientX - box.left) / box.width;
    onChange(snap(min + ratio * (max - min)));
  };

  const nudge = (direction) => {
    if (disabled) return;
    onChange(snap(value + direction * step));
  };

  const handleKeyDown = (event) => {
    const back = ["ArrowLeft", "ArrowDown"];
    const forward = ["ArrowRight", "ArrowUp"];
    if (![...back, ...forward].includes(event.key)) return;
    event.preventDefault();
    nudge(forward.includes(event.key) ? 1 : -1);
  };

  return (
    <div className={`scale scale-${orientation} scale-interactive`}>
      <div
        className="scale-track"
        ref={trackRef}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`${value} ${unit}`}
        aria-label={label ?? `Set the ${unit} value`}
        aria-disabled={disabled}
        onKeyDown={handleKeyDown}
        onClick={(e) => setFromPoint(e.clientX, e.clientY)}
        onPointerMove={(e) => {
          // Only while a button is held — this is the drag, layered on top of
          // click-to-place rather than replacing it.
          if (e.buttons === 1) setFromPoint(e.clientX, e.clientY);
        }}
      >
        <div className="scale-fill" style={sizeFor(orientation, percent)} />

        {ticks.map((tick) => (
          <div
            key={tick}
            className="scale-tick"
            style={offsetFor(orientation, ((tick - min) / (max - min)) * 100)}
          >
            <span className="scale-tick-label">{tick}</span>
          </div>
        ))}

        <div className="scale-pointer draggable" style={offsetFor(orientation, percent)} />
      </div>

      <div className="scale-controls">
        <button type="button" className="scale-step-btn" disabled={disabled} onClick={() => nudge(-1)}>
          −{step}
        </button>
        <span className="scale-readout">
          {value} {unit}
        </span>
        <button type="button" className="scale-step-btn" disabled={disabled} onClick={() => nudge(1)}>
          +{step}
        </button>
      </div>
    </div>
  );
}

function sizeFor(orientation, percent) {
  return orientation === "vertical" ? { height: `${percent}%` } : { width: `${percent}%` };
}

function offsetFor(orientation, percent) {
  return orientation === "vertical" ? { bottom: `${percent}%` } : { left: `${percent}%` };
}

export default MeasureDrag;
