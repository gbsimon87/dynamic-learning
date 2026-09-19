import "./challenge-kit.css";

/**
 * A row of number cards, some of them blank for the learner to fill.
 *
 * `terms`     the full sequence
 * `gaps`      indices rendered as blanks
 * `values`    { [index]: string } current answers for the blanks
 * `active`    which blank is being answered, highlighted
 * `highlight` a non-gap index to mark as the number under discussion
 * `captions`  optional per-cell labels. A row is not always a count: "100 less,
 *             10 less, 342, 10 more, 100 more" needs each cell to say what it
 *             is, and without the labels the blanks have no question attached
 *             to them. An entry may be empty to leave a cell unlabelled.
 */
function NumberLine({
  terms,
  gaps,
  values,
  active,
  onFocusGap,
  disabled,
  highlight,
  captions,
}) {
  const gapSet = new Set(gaps);
  // A long line must stay one line: wrapped onto two rows it stops reading as
  // a number line at all.
  const dense = terms.length > 8;
  const captioned = Boolean(captions);

  const caption = (index) =>
    captions?.[index] ? (
      <span className="number-cell-caption">{captions[index]}</span>
    ) : null;

  return (
    <div
      className={`number-line ${dense ? "dense" : ""} ${
        captioned ? "captioned" : ""
      }`}
      role="list"
    >
      {terms.map((term, index) =>
        gapSet.has(index) ? (
          <button
            key={index}
            type="button"
            role="listitem"
            className={`number-cell gap ${active === index ? "active" : ""} ${
              values[index] ? "filled" : ""
            }`}
            aria-label={
              captions?.[index] || `Blank ${gaps.indexOf(index) + 1}`
            }
            disabled={disabled}
            onClick={() => onFocusGap(index)}
          >
            {caption(index)}
            <span className="number-cell-value">{values[index] || "?"}</span>
          </button>
        ) : (
          <span
            key={index}
            role="listitem"
            className={`number-cell ${highlight === index ? "highlight" : ""}`}
          >
            {caption(index)}
            <span className="number-cell-value">{term}</span>
          </span>
        )
      )}
    </div>
  );
}

export default NumberLine;
