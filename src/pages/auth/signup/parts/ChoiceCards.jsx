import { useRef } from "react";

/**
 * Big tappable answers. Arrow keys move between them; Enter/Space choose.
 * `value` is an id (single) or an id[] (multiple).
 */
export default function ChoiceCards({ label, options, value, onChoose, multiple = false }) {
  const refs = useRef([]);
  const isChosen = (id) => (multiple ? Array.isArray(value) && value.includes(id) : value === id);

  const onKeyDown = (event, index) => {
    const delta = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (!delta) return;
    event.preventDefault();
    refs.current[(index + delta + options.length) % options.length]?.focus();
  };

  return (
    <div className="sf-cards" role="group" aria-label={label}>
      {options.map((option, index) => (
        <button
          key={option.id}
          ref={(node) => {
            refs.current[index] = node;
          }}
          type="button"
          className={`sf-card ${isChosen(option.id) ? "is-chosen" : ""}`}
          aria-pressed={isChosen(option.id)}
          onClick={() => onChoose(option.id)}
          onKeyDown={(event) => onKeyDown(event, index)}
        >
          {option.icon && <span className="sf-card-icon" aria-hidden="true">{option.icon}</span>}
          <span className="sf-card-title">{option.title}</span>
          {option.blurb && <span className="sf-card-blurb">{option.blurb}</span>}
          <span className="sf-card-check" aria-hidden="true">✓</span>
        </button>
      ))}
    </div>
  );
}
