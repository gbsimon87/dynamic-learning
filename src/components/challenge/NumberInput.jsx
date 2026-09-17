import "./challenge-kit.css";

const DIGITS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

/**
 * Numeric entry with an on-screen keypad.
 *
 * `hideField` drops the text box for challenges that already show the answer
 * somewhere else (the number line, for instance) — two places showing the same
 * digits reads as a bug, and the empty second box looks broken.
 *
 * The field stays a real editable input so a physical keyboard still works.
 */
function NumberInput({ value, onChange, disabled, label, hideField }) {
  // Functional updates, not `value + key`: two quick taps land in the same
  // React batch, and reading the prop would make the second one overwrite the
  // first instead of appending to it. A child double-tapping loses a digit.
  // Three digits covers every Year 2 answer; more just overflows the display.
  const press = (key) => onChange((prev) => (prev + key).slice(0, 3));
  const backspace = () => onChange((prev) => prev.slice(0, -1));

  return (
    <div className="number-input">
      {!hideField && (
        <label className="number-input-label">
          <span className="number-input-caption">{label}</span>
          <input
            className="number-input-field"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="?"
            value={value}
            disabled={disabled}
            onChange={(e) =>
              onChange(e.target.value.replace(/\D/g, "").slice(0, 3))
            }
          />
        </label>
      )}

      <div className="keypad">
        {DIGITS.map((digit) => (
          <button
            key={digit}
            type="button"
            className="keypad-btn"
            disabled={disabled}
            onClick={() => press(digit)}
          >
            {digit}
          </button>
        ))}

        <button
          type="button"
          className="keypad-btn action"
          disabled={disabled || value === ""}
          onClick={backspace}
          aria-label="Delete the last digit"
        >
          ⌫
        </button>

        <button
          type="button"
          className="keypad-btn action"
          disabled={disabled || value === ""}
          onClick={() => onChange("")}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default NumberInput;
