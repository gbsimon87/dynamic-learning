import "./challenge-kit.css";

/**
 * A buildable all-pairs grid. Each selected cell connects one item from the
 * first set to one item from the second set, making n × m visible rather than
 * asking the learner to guess it from a sentence.
 */
function CorrespondenceBoard({ tops, bottoms, selected, onToggle, disabled, topName, bottomName }) {
  return (
    <div className="correspondence-board">
      <p className="correspondence-key">
        One square joins one {topName} to one {bottomName}.
      </p>
      <div
        className="correspondence-grid"
        style={{ "--correspondence-columns": tops.length }}
        role="group"
        aria-label={`Connect every ${topName} to every ${bottomName}`}
      >
        <span className="correspondence-corner" aria-hidden="true">×</span>
        {tops.map((top, topIndex) => (
          <span key={`top-${topIndex}`} className="correspondence-heading" aria-label={`${topName} ${topIndex + 1}`}>{top}</span>
        ))}
        {bottoms.flatMap((bottom, bottomIndex) => [
          <span key={`bottom-${bottomIndex}`} className="correspondence-heading" aria-label={`${bottomName} ${bottomIndex + 1}`}>{bottom}</span>,
          ...tops.map((top, topIndex) => {
            const id = `${topIndex}-${bottomIndex}`;
            const isSelected = selected.includes(id);
            return (
              <button
                key={id}
                type="button"
                className={`correspondence-pair ${isSelected ? "selected" : ""}`}
                aria-pressed={isSelected}
                aria-label={`${isSelected ? "Connected" : "Connect"} ${topName} ${topIndex + 1} and ${bottomName} ${bottomIndex + 1}`}
                disabled={disabled}
                onClick={() => onToggle(id)}
              >
                {isSelected ? "✓" : "＋"}
              </button>
            );
          }),
        ])}
      </div>
      <p className="challenge-running" aria-live="polite">
        {selected.length} {selected.length === 1 ? "connection" : "connections"}
      </p>
    </div>
  );
}

export default CorrespondenceBoard;
