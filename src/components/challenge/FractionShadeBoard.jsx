import "./fraction-kit.css";

/** Equal parts that a learner can shade by tapping. `onToggle` receives an index. */
function FractionShadeBoard({ denominator, selected = [], onToggle, disabled = false, label }) {
  return (
    <div className="fraction-shade-scroll">
      <div
        className={`fraction-shade-board ${denominator >= 8 ? "multirow" : ""}`}
        role={onToggle ? "group" : "img"}
        aria-label={label || `A whole split into ${denominator} equal parts`}
        style={{ "--fraction-part-count": denominator, "--fraction-columns": denominator / 2 }}
      >
        {Array.from({ length: denominator }, (_, index) => {
        const shaded = Boolean(selected[index]);
        return onToggle ? (
          <button
            key={index}
            type="button"
            className={`fraction-shade-part ${shaded ? "shaded" : ""}`}
            aria-label={`Part ${index + 1} of ${denominator}`}
            aria-pressed={shaded}
            disabled={disabled}
            onClick={() => onToggle(index)}
          />
        ) : (
          <span key={index} className={`fraction-shade-part ${shaded ? "shaded" : ""}`} />
        );
        })}
      </div>
    </div>
  );
}

export default FractionShadeBoard;
