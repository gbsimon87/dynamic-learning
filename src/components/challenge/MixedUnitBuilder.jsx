import "./challenge-kit.css";

/**
 * Build a measurement from one large unit and one small unit: m/cm, kg/g or
 * l/ml. Controls emit steps, never totals, so the parent can apply rapid taps
 * functionally without losing an update in a React batch.
 */
function MixedUnitBuilder({
  major,
  minor,
  majorUnit,
  minorUnit,
  factor,
  onStep,
  disabled,
  label,
}) {
  const minorPercent = Math.min(100, Math.max(0, (minor / factor) * 100));

  return (
    <div className="mixed-unit-builder" role="group" aria-label={label}>
      <p className="mixed-unit-equivalence">1 {majorUnit} = {factor} {minorUnit}</p>

      <div className="mixed-unit-visual" aria-hidden="true">
        {Array.from({ length: major }, (_, index) => (
          <span key={index} className="mixed-unit-whole" />
        ))}
        <span className="mixed-unit-part">
          <span style={{ width: `${minorPercent}%` }} />
        </span>
      </div>

      <div className="mixed-unit-controls">
        <UnitControl
          value={major}
          unit={majorUnit}
          disabled={disabled}
          onStep={(delta) => onStep({ unit: "major", delta })}
        />
        <UnitControl
          value={minor}
          unit={minorUnit}
          disabled={disabled}
          onStep={(delta) => onStep({ unit: "minor", delta })}
        />
      </div>
    </div>
  );
}

function UnitControl({ value, unit, disabled, onStep }) {
  return (
    <div className="mixed-unit-control">
      <button
        type="button"
        className="mixed-unit-step"
        disabled={disabled}
        onClick={() => onStep(-1)}
        aria-label={`Decrease ${unit}`}
      >
        −
      </button>
      <span className="mixed-unit-value">
        <strong>{value}</strong>
        <small>{unit}</small>
      </span>
      <button
        type="button"
        className="mixed-unit-step"
        disabled={disabled}
        onClick={() => onStep(1)}
        aria-label={`Increase ${unit}`}
      >
        +
      </button>
    </div>
  );
}

export default MixedUnitBuilder;
