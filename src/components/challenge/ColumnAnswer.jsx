import { useLayoutEffect, useReducer } from "react";
import ColumnBuilder from "./ColumnBuilder";
import NumberInput from "./NumberInput";

const PLACES = ["ten thousands", "thousands", "hundreds", "tens", "ones"];

/** One digit per column, entered from ones towards the left. */
export default function ColumnAnswer({ top, bottom, operation, columns = 3, onChange, disabled }) {
  const places = PLACES.slice(-columns);
  const [state, dispatch] = useReducer((previous, action) => {
    if (action.type === "select") return { ...previous, active: action.index };
    if (action.type === "clear") return { digits: Array(columns).fill(""), active: columns - 1 };
    const digits = [...previous.digits];
    let active = previous.active;
    if (action.type === "delete") {
      if (digits[active] === "" && active < columns - 1) active += 1;
      digits[active] = "";
    } else {
      digits[active] = action.digit;
      active = Math.max(0, active - 1);
    }
    return { digits, active };
  }, { digits: Array(columns).fill(""), active: columns - 1 });
  const complete = state.digits.every(digit => digit !== "");
  const answer = complete ? state.digits.join("") : "";
  useLayoutEffect(() => { onChange(answer); }, [answer, onChange]);
  const send = action => { if (!disabled) dispatch(action); };
  const enter = updater => {
    // Evaluate against an empty slot so a new digit replaces a selected digit.
    const digit = typeof updater === "function" ? updater("") : updater;
    send(digit === "" ? { type: "delete" } : { type: "digit", digit });
  };

  return <div className="column-answer" onKeyDown={event => {
    if (disabled || event.ctrlKey || event.metaKey || event.altKey) return;
    if (/^[0-9]$/.test(event.key)) {
      event.preventDefault();
      send({ type: "digit", digit: event.key });
    } else if (event.key === "Backspace" || event.key === "Delete") {
      event.preventDefault();
      send({ type: "delete" });
    }
  }}>
    <ColumnBuilder top={top} bottom={bottom} operation={operation} places={places}
      answer={Object.fromEntries(places.map((place, index) => [place, state.digits[index]]))}
      activeColumn={places[state.active]} onColumnFocus={place => send({ type: "select", index: places.indexOf(place) })}
      disabled={disabled} />
    <p className="challenge-prompt" aria-live="polite">{complete ? "Check your answer, or tap a column to change it." : `Enter the ${places[state.active]} digit. Start with ones and work left. Use 0 for an empty column.`}</p>
    <NumberInput hideField maxDigits={1} value={state.digits.join("")}
      onChange={enter} onClear={() => send({ type: "clear" })} disabled={disabled} />
  </div>;
}
