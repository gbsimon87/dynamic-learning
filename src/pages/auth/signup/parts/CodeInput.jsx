import { useRef } from "react";
import { parseCode } from "../../../../data/signupFlow";

/**
 * Six boxes. Typing moves on, Backspace moves back, and pasting — or iOS/Android
 * offering the code from the email — fills all six. Calls onComplete once the
 * sixth digit lands; the caller guards against double submits.
 */
export default function CodeInput({ value, onChange, onComplete, disabled = false, invalid = false, shakeKey = 0 }) {
  const refs = useRef([]);
  const digits = Array.from({ length: 6 }, (_, i) => value[i] ?? "");

  const fill = (from, text) => {
    const incoming = parseCode(text);
    if (!incoming) return;
    const next = (value.slice(0, from) + incoming).slice(0, 6);
    onChange(next);
    refs.current[Math.min(next.length, 5)]?.focus();
    if (next.length === 6) onComplete(next);
  };

  const onKeyDown = (event, index) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      const cut = digits[index] ? index : Math.max(0, index - 1);
      onChange(value.slice(0, cut));
      refs.current[cut]?.focus();
    } else if (event.key === "ArrowLeft") {
      refs.current[Math.max(0, index - 1)]?.focus();
    } else if (event.key === "ArrowRight") {
      refs.current[Math.min(5, index + 1)]?.focus();
    }
  };

  return (
    <div key={shakeKey} className={`sf-code ${invalid ? "is-invalid" : ""}`} role="group" aria-label="Six-digit code">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(node) => {
            refs.current[index] = node;
          }}
          className="sf-code-box"
          value={digit}
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={index === 0 ? 6 : 2}
          aria-label={`Digit ${index + 1}`}
          disabled={disabled}
          autoFocus={index === 0}
          onChange={(event) => {
            const raw = event.target.value;
            // Typing over a filled box gives "47": keep the new digit only.
            const fresh = digit && raw.startsWith(digit) ? raw.slice(digit.length) : raw;
            fill(Math.min(index, value.length), fresh);
          }}
          onPaste={(event) => {
            event.preventDefault();
            fill(0, event.clipboardData.getData("text"));
          }}
          onKeyDown={(event) => onKeyDown(event, index)}
        />
      ))}
    </div>
  );
}
