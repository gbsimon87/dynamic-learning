import "./challenge-kit.css";

/**
 * A row of number cards, some of them blank for the learner to fill.
 *
 * `terms`    the full sequence
 * `gaps`     indices rendered as blanks
 * `values`   { [index]: string } current answers for the blanks
 * `active`   which blank is being answered, highlighted
 */
function NumberLine({ terms, gaps, values, active, onFocusGap, disabled }) {
  const gapSet = new Set(gaps);

  return (
    <div className="number-line" role="list">
      {terms.map((term, index) =>
        gapSet.has(index) ? (
          <button
            key={index}
            type="button"
            role="listitem"
            className={`number-cell gap ${active === index ? "active" : ""} ${
              values[index] ? "filled" : ""
            }`}
            aria-label={`Blank ${gaps.indexOf(index) + 1}`}
            disabled={disabled}
            onClick={() => onFocusGap(index)}
          >
            {values[index] || "?"}
          </button>
        ) : (
          <span key={index} role="listitem" className="number-cell">
            {term}
          </span>
        )
      )}
    </div>
  );
}

export default NumberLine;
