import { tickValues } from "../../data/challenges/measurement";
import "./challenge-kit.css";

/**
 * A marked scale with a pointer — the one picture behind most of Measurement.
 *
 * Dressed four ways by its props alone: a ruler (horizontal cm), a thermometer
 * (vertical °C), a measuring jug (vertical ml) and a kitchen scale (horizontal
 * g). Building four near-identical widgets would have meant four sets of tick
 * maths to get wrong.
 *
 * Read-only. MeasureDrag is the same scale with the pointer under the
 * learner's control.
 */
function ScaleReader({
  min,
  max,
  majorStep,
  value,
  unit,
  orientation = "horizontal",
  variant = "",
  label,
}) {
  const ticks = tickValues(min, max, majorStep);
  // Position as a percentage of the span, so the same maths serves both
  // orientations and the CSS does the rest.
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div
      className={`scale scale-${orientation} ${variant}`}
      role="img"
      aria-label={label ?? `${value} ${unit}`}
    >
      <div className="scale-track">
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

        <div
          className="scale-pointer"
          style={offsetFor(orientation, percent)}
        />
      </div>

      <p className="scale-unit">{unit}</p>
    </div>
  );
}

/** Vertical scales fill and measure from the bottom up. */
function sizeFor(orientation, percent) {
  return orientation === "vertical"
    ? { height: `${percent}%` }
    : { width: `${percent}%` };
}

function offsetFor(orientation, percent) {
  return orientation === "vertical"
    ? { bottom: `${percent}%` }
    : { left: `${percent}%` };
}

export default ScaleReader;
