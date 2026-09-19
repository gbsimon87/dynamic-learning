import "./challenge-kit.css";

const PLACES = ["hundreds", "tens", "ones"];

/** A two-digit by one-digit calculation laid out as formal short multiplication. */
function ShortMultiplication({ top, multiplier, digits, activePlace, onSelect, disabled, label }) {
  const topDigits = {
    hundreds: "",
    tens: Math.floor(top / 10),
    ones: top % 10,
  };

  return (
    <div className="short-multiply" role="group" aria-label={label}>
      <div className="short-multiply-row">
        <span />
        {PLACES.map((place) => <span key={place}>{topDigits[place]}</span>)}
      </div>
      <div className="short-multiply-row operand">
        <span>×</span><span /><span /><span>{multiplier}</span>
      </div>
      <div className="short-multiply-rule" />
      <div className="short-multiply-row answer">
        <span />
        {PLACES.map((place) => (
          <button
            key={place}
            type="button"
            className={`short-multiply-slot ${activePlace === place ? "active" : ""} ${digits[place] !== "" ? "filled" : ""}`}
            onClick={() => onSelect(place)}
            disabled={disabled}
            aria-label={`${place} digit of the answer`}
          >
            {digits[place] === "" ? "?" : digits[place]}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ShortMultiplication;
