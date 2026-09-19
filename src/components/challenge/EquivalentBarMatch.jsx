import FractionBar from "./FractionBar";
import "./fraction-kit.css";

/** Match a target shaded bar to one of several bars with different partitions. */
function EquivalentBarMatch({ target, options, selected, onSelect, disabled = false }) {
  const parts = ({ numerator, denominator }) =>
    Array.from({ length: denominator }, (_, index) => index < numerator);
  return (
    <div className="equivalent-match">
      <p className="fraction-board-caption">Find the bar with the same shaded amount.</p>
      <FractionBar parts={parts(target)} label={`Target: ${target.numerator} of ${target.denominator} parts shaded`} />
      <div className="equivalent-options" role="group" aria-label="Matching bars">
        {options.map((fraction, index) => (
          <button
            key={`${fraction.numerator}-${fraction.denominator}-${index}`}
            type="button"
            className={`equivalent-option ${selected === index ? "selected" : ""}`}
            aria-label={`${fraction.numerator} of ${fraction.denominator} equal parts shaded`}
            aria-pressed={selected === index}
            disabled={disabled}
            onClick={() => onSelect(index)}
          >
            <FractionBar parts={parts(fraction)} label="" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default EquivalentBarMatch;
