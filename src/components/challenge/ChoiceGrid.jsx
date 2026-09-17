import "./challenge-kit.css";

/**
 * Large tappable answer buttons. Selection is the caller's state so a
 * challenge can decide whether to submit immediately or on a button.
 */
function ChoiceGrid({ options, selected, onSelect, disabled }) {
  return (
    <div className="choice-grid" role="group">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`choice-btn ${selected === option ? "selected" : ""}`}
          aria-pressed={selected === option}
          disabled={disabled}
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default ChoiceGrid;
