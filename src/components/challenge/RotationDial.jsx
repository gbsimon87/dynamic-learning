import { headingDegrees } from "../../data/challenges/positionAndDirection";
import "./challenge-kit.css";

/**
 * An arrow that turns in right angles.
 *
 * The arrow animates to its new heading rather than jumping, because the whole
 * idea being taught is the TURN, not the end position — a jump shows the
 * answer but hides the movement.
 *
 * Buttons only: a draggable dial would let a learner land between right
 * angles, which is finer than Year 2 is asked for and makes a wrong answer
 * out of a correct understanding.
 */
function RotationDial({ heading, onTurn, disabled, showControls = true }) {
  return (
    <div className="rotation-dial">
      <div className="dial-face">
        <span className="dial-cross" aria-hidden="true" />
        <span
          className="dial-arrow"
          style={{ transform: `rotate(${headingDegrees(heading)}deg)` }}
          role="img"
          aria-label={`an arrow pointing ${heading}`}
        />
      </div>

      {showControls && (
        <div className="dial-controls">
          <button
            type="button"
            className="scale-step-btn"
            disabled={disabled}
            onClick={() => onTurn("anti-clockwise")}
          >
            ↺ anti-clockwise
          </button>
          <button
            type="button"
            className="scale-step-btn"
            disabled={disabled}
            onClick={() => onTurn("clockwise")}
          >
            clockwise ↻
          </button>
        </div>
      )}

      <p className="dial-readout">Facing {heading}</p>
    </div>
  );
}

export default RotationDial;
