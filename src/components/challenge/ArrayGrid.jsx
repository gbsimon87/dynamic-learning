import "./challenge-kit.css";

/**
 * Rows and columns of dots.
 *
 * The programme of study names arrays explicitly as a representation of
 * multiplication, and an array is the picture that makes commutativity
 * obvious: the same grid is 3 rows of 4 and 4 columns of 3.
 */
function ArrayGrid({ rows, label }) {
  return (
    <div className="array-grid" role="img" aria-label={label}>
      {rows.map((row, r) => (
        <div key={r} className="array-row">
          {row.map((cell) => (
            <span key={cell} className="array-dot" />
          ))}
        </div>
      ))}
    </div>
  );
}

export default ArrayGrid;
