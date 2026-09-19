import "./fraction-kit.css";

/** Tick positions are numerator counts, including 0 and each whole. */
function FractionNumberTrack({ denominator, wholes = 1, selected, onSelect, disabled = false, label }) {
  const last = denominator * wholes;
  return (
    <div className="fraction-track-scroll">
      <div
        className="fraction-number-track"
        role={onSelect ? "group" : "img"}
        aria-label={label || `Number line from zero to ${wholes} in ${denominator} equal parts per whole`}
      >
        {Array.from({ length: last + 1 }, (_, numerator) => {
          const whole = numerator % denominator === 0;
          const text = whole ? String(numerator / denominator) : "";
          return onSelect ? (
            <button
              key={numerator}
              type="button"
              className={`fraction-track-tick ${selected === numerator ? "selected" : ""}`}
              aria-label={`${numerator}/${denominator}`}
              aria-pressed={selected === numerator}
              disabled={disabled}
              onClick={() => onSelect(numerator)}
            >{text || "│"}</button>
          ) : (
            <span key={numerator} className={`fraction-track-tick ${selected === numerator ? "selected" : ""}`}>
              {text || "│"}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default FractionNumberTrack;
