import { useState } from "react";
import "./science-kit.css";

/** Select a label, then a target. Tap a placed label to take it back.
 * The diagram is supplied as JSX; placement is owned by the caller.
 * No drag timing or pointer precision is required; every control is a button. */
function DiagramLabelBoard({ diagram, targets, labels, placement, onPlace, disabled, label = "Plant labels" }) {
  const [selected, setSelected] = useState(null);
  return (
    <div className="science-label-board">
      {diagram}
      <p>Select a label, then a letter. Take a label back before replacing it.</p>
      <div className="science-label-tray" role="group" aria-label={label}>
        {labels.map((label) => (
          <button key={label.id} type="button" disabled={disabled}
            aria-pressed={selected === label.id} className={selected === label.id ? "is-selected" : ""}
            onClick={() => { if (!disabled) setSelected(label.id); }}>
            {label.label}{placement[label.id] ? ` → ${targets.find((target) => target.id === placement[label.id])?.label}` : ""}
          </button>
        ))}
      </div>
      <div className="science-label-targets" role="group" aria-label="Diagram targets">
        {targets.map((target) => {
          const placedId = Object.keys(placement).find((id) => placement[id] === target.id);
          const placed = labels.find((label) => label.id === placedId);
          return (
            <button key={target.id} type="button" disabled={disabled || (!placed && !selected)}
              aria-label={placed ? `${target.label}: ${placed.label}, take back` : `Place selected label at ${target.label}`}
              onClick={() => {
                if (disabled) return;
                if (placed) onPlace(placed.id, null);
                else if (selected) { onPlace(selected, target.id); setSelected(null); }
              }}>
              <strong>{target.label}</strong>: {placed ? `${placed.label} ↩` : "?"}
            </button>
          );
        })}
      </div>
      <p className="science-board-status" role="status" aria-live="polite">
        {Object.keys(placement).length} of {labels.length} labels placed. {selected ? `${labels.find((label) => label.id === selected)?.label} selected.` : ""}
      </p>
    </div>
  );
}
export default DiagramLabelBoard;
