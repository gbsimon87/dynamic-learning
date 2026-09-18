import "./challenge-kit.css";

/**
 * A columnar addition or subtraction, laid out the way it is written by hand.
 *
 * Year 3 is where formal written methods arrive, and the part that actually
 * needs teaching is the EXCHANGE — the carry that hops into the next column,
 * or the ten that is broken open to subtract from. A component that only
 * displayed the finished sum would hide exactly the step being learned, so
 * carries and exchanges are rendered as their own marks above the digits.
 *
 * `top`, `bottom`  the two numbers
 * `operation`      "add" | "subtract"
 * `answer`         { hundreds, tens, ones } of entered digits; "" for blank
 * `carries`        { hundreds, tens } marks above the columns
 * `exchanges`      { hundreds, tens } crossed-out/renamed digits for subtraction
 * `activeColumn`   the column being answered, highlighted
 * `onColumnFocus`  (place) => void when a learner picks a column to answer
 * `revealed`       draw it as a finished, correct sum (used after success)
 */
function ColumnBuilder({
  top,
  bottom,
  operation = "add",
  answer = {},
  carries = {},
  exchanges = {},
  activeColumn,
  onColumnFocus,
  revealed = false,
  label,
}) {
  const places = ["hundreds", "tens", "ones"];
  const sign = operation === "add" ? "+" : "−";

  const digitsOf = (value) => ({
    hundreds: Math.floor(value / 100) || "",
    tens: value >= 10 ? Math.floor((value % 100) / 10) : "",
    ones: value % 10,
  });

  const topDigits = digitsOf(top);
  const bottomDigits = digitsOf(bottom);

  return (
    <div
      className={`col-sum ${revealed ? "revealed" : ""}`}
      role="img"
      aria-label={label || `${top} ${sign} ${bottom}`}
    >
      <div className="col-sum-grid">
        {/* Carries and exchanges sit above the digits, where they are written. */}
        <div className="col-sum-row col-sum-marks" aria-hidden="true">
          <span className="col-sum-sign" />
          {places.map((place) => (
            <span key={place} className="col-sum-cell">
              {carries[place] ? (
                <span className="col-carry">{carries[place]}</span>
              ) : exchanges[place] ? (
                <span className="col-exchange">{exchanges[place]}</span>
              ) : null}
            </span>
          ))}
        </div>

        <div className="col-sum-row">
          <span className="col-sum-sign" />
          {places.map((place) => (
            <span
              key={place}
              className={`col-sum-cell ${
                exchanges[place] ? "struck" : ""
              }`}
            >
              {topDigits[place]}
            </span>
          ))}
        </div>

        <div className="col-sum-row col-sum-operand">
          <span className="col-sum-sign">{sign}</span>
          {places.map((place) => (
            <span key={place} className="col-sum-cell">
              {bottomDigits[place]}
            </span>
          ))}
        </div>

        <div className="col-sum-rule" />

        <div className="col-sum-row col-sum-answer">
          <span className="col-sum-sign" />
          {places.map((place) => {
            const filled = answer[place] !== undefined && answer[place] !== "";
            const isActive = activeColumn === place;
            return onColumnFocus ? (
              <button
                key={place}
                type="button"
                className={`col-sum-cell col-sum-slot ${isActive ? "active" : ""} ${
                  filled ? "filled" : ""
                }`}
                aria-label={`${place} of the answer`}
                onClick={() => onColumnFocus(place)}
              >
                {filled ? answer[place] : "?"}
              </button>
            ) : (
              <span key={place} className="col-sum-cell col-sum-slot filled">
                {answer[place]}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ColumnBuilder;
