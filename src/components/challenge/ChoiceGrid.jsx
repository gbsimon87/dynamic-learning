import "./challenge-kit.css";

/**
 * Large tappable answer buttons. Selection is the caller's state so a
 * challenge can decide whether to submit immediately or on a button.
 *
 * `variant="wordy"` is for options that are phrases rather than numbers — "four
 * hundred and six" at the numeric size gives four buttons that fill the screen
 * and can no longer be compared at a glance.
 */
function ChoiceGrid({ options, selected, onSelect, disabled, variant = "" }) {
  return (
    <div className={`choice-grid ${variant}`} role="group">
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
