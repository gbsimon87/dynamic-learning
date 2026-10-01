import { useEffect } from "react";
import "./english-kit.css";

const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");

/**
 * Spelling entry with a large on-screen a–z keyboard.
 *
 * Deliberately NOT a native text field. On a phone that opens the device
 * keyboard over the question, and autocorrect and word suggestions would spell
 * the word for the child. A physical keyboard still works: letters,
 * Backspace and (when `apostrophe` is on) ' are read from the window while the
 * input is enabled.
 *
 * Alphabetical rather than QWERTY: a seven-year-old finds a letter by its
 * place in the alphabet, not by a layout they have never learnt.
 *
 * Updates are functional (`prev => prev + key`) for the same reason as
 * NumberInput: two quick taps in one React batch must both land.
 *
 * `value` / `onChange(updater)` are the caller's state. `apostrophe` adds a '
 * key for he'll and who's. `label` captions the answer line for screen readers.
 * `hideLine` drops the answer line when the challenge already shows the
 * letters somewhere else (in a sentence's blank, say): the same word in two
 * places reads as a bug.
 */
function LetterInput({ value, onChange, disabled, label = "Your spelling", maxLength = 16, apostrophe = false, hideLine = false }) {
  const press = (key) => onChange((prev) => (prev + key).slice(0, maxLength));
  const backspace = () => onChange((prev) => prev.slice(0, -1));

  useEffect(() => {
    if (disabled) return undefined;
    const onKey = (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      // Another control is being typed into (unlikely in a challenge, but a
      // grown-up's devtools or a future field must not be hijacked).
      const target = event.target;
      if (target instanceof HTMLElement && target.closest("input, textarea, [contenteditable]")) return;
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (/^[a-z]$/.test(key) || (apostrophe && (key === "'" || key === "’"))) {
        event.preventDefault();
        onChange((prev) => (prev + (key === "’" ? "'" : key)).slice(0, maxLength));
      } else if (key === "Backspace") {
        event.preventDefault();
        onChange((prev) => prev.slice(0, -1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [disabled, apostrophe, maxLength, onChange]);

  const keys = apostrophe ? [...LETTERS, "'"] : LETTERS;

  return (
    <div className="letter-input">
      {!hideLine && (
        <p className="letter-input-line" aria-label={label} aria-live="polite">
          {value === "" ? <span className="letter-input-placeholder">?</span> : value}
        </p>
      )}

      <div className="letter-keyboard" role="group" aria-label="Letters">
        {keys.map((letter) => (
          <button
            key={letter}
            type="button"
            className="letter-input-key letter-key"
            disabled={disabled || value.length >= maxLength}
            onClick={() => press(letter)}
            aria-label={letter === "'" ? "apostrophe" : letter}
          >
            {letter}
          </button>
        ))}
        <button
          type="button"
          className="letter-input-key letter-key is-action"
          disabled={disabled || value === ""}
          onClick={backspace}
          aria-label="Delete the last letter"
        >
          ⌫
        </button>
        <button
          type="button"
          className="letter-input-key letter-key is-action"
          disabled={disabled || value === ""}
          onClick={() => onChange("")}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default LetterInput;
