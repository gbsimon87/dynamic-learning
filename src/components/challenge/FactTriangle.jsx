import "./challenge-kit.css";

/**
 * A multiplication fact family in one picture. The product sits above its two
 * factors so the same triangle can be read as two multiplications and two
 * divisions.
 */
function FactTriangle({ left, right, product, hidden, label }) {
  const value = (part, number) => (
    <span className={`fact-triangle-value ${hidden === part ? "hidden" : ""}`}>
      {hidden === part ? "?" : number}
    </span>
  );

  return (
    <div className="fact-triangle" role="img" aria-label={label}>
      <div className="fact-triangle-top">{value("product", product)}</div>
      <div className="fact-triangle-line" aria-hidden="true" />
      <div className="fact-triangle-factors">
        {value("left", left)}
        <span className="fact-triangle-times" aria-hidden="true">×</span>
        {value("right", right)}
      </div>
    </div>
  );
}

export default FactTriangle;
