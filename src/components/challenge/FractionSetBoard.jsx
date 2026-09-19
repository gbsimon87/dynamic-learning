import "./fraction-kit.css";

/** A discrete set. `groupSize` draws equal groups without preselecting an answer. */
function FractionSetBoard({ total, selected = [], groupSize, onToggle, disabled = false, label }) {
  return (
    <div
      className="fraction-set-board"
      role={onToggle ? "group" : "img"}
      aria-label={label || `A set of ${total} objects`}
    >
      {Array.from({ length: total }, (_, index) => {
        const picked = Boolean(selected[index]);
        const className = `fraction-set-object ${picked ? "selected" : ""} ${groupSize && (index + 1) % groupSize === 0 ? "group-end" : ""}`;
        return onToggle ? (
          <button
            key={index}
            type="button"
            className={className}
            aria-label={`Object ${index + 1} of ${total}`}
            aria-pressed={picked}
            disabled={disabled}
            onClick={() => onToggle(index)}
          >●</button>
        ) : <span key={index} className={className} aria-hidden="true">●</span>;
      })}
    </div>
  );
}

export default FractionSetBoard;
