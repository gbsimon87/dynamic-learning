import ShapeFigure from "./ShapeFigure";
import "./challenge-kit.css";

/**
 * The same shape shown at several rotations, to pick from.
 *
 * Straight from the guidance: "pupils should work with patterns of shapes,
 * INCLUDING THOSE IN DIFFERENT ORIENTATIONS". A shape turned on its side is
 * still that shape, and that is not obvious to a six-year-old.
 *
 * Rotation is a CSS transform on the existing ShapeFigure, so these are the
 * same drawings used everywhere else rather than new art.
 */
function OrientationPicker({ shape, rotations, selected, onSelect, disabled }) {
  return (
    <div className="orientation-row" role="group">
      {rotations.map((degrees, i) => (
        <button
          key={i}
          type="button"
          className={`orientation-option ${selected === i ? "selected" : ""}`}
          aria-pressed={selected === i}
          aria-label={`Option ${i + 1}, turned ${degrees} degrees`}
          disabled={disabled}
          onClick={() => onSelect(i)}
        >
          <span className="orientation-inner" style={{ transform: `rotate(${degrees}deg)` }}>
            <ShapeFigure shape={shape} />
          </span>
        </button>
      ))}
    </div>
  );
}

export default OrientationPicker;
