import FractionBar from "./FractionBar";
import FractionShadeBoard from "./FractionShadeBoard";
import "./fraction-kit.css";

/** Build the result of a same-denominator fraction calculation by shading. */
function FractionEquationBoard({ denominator, first, second, operation, selected, onToggle, disabled = false, caption = "Shade the answer." }) {
  const parts = (count) => Array.from({ length: denominator }, (_, index) => index < count);
  return (
    <div className="fraction-equation-board">
      <div className="fraction-equation-inputs">
        <div>
          <strong>{first}/{denominator}</strong>
          <FractionBar parts={parts(first)} label={`${first} of ${denominator} parts shaded`} />
        </div>
        <span className="fraction-equation-sign" aria-label={operation === "add" ? "plus" : "minus"}>
          {operation === "add" ? "+" : "−"}
        </span>
        <div>
          <strong>{second}/{denominator}</strong>
          <FractionBar parts={parts(second)} label={`${second} of ${denominator} parts shaded`} />
        </div>
      </div>
      <p className="fraction-board-caption">{caption}</p>
      <FractionShadeBoard
        denominator={denominator}
        selected={selected}
        onToggle={onToggle}
        disabled={disabled}
        label={`Answer bar with ${denominator} equal parts`}
      />
    </div>
  );
}

export default FractionEquationBoard;
