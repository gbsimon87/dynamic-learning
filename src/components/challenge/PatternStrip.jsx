import ShapeFigure from "./ShapeFigure";
import { findShape } from "../../data/challenges/shapes";
import "./challenge-kit.css";

/**
 * A repeating run of shapes with one slot left blank.
 *
 * The blank is shown in place rather than at the end, because a pattern is
 * read across: seeing what comes before AND after the gap is what makes it a
 * pattern rather than a guess.
 */
function PatternStrip({ items, gapIndex, filled, label }) {
  return (
    <div className="pattern-strip" role="img" aria-label={label ?? "a repeating pattern"}>
      {items.map((shapeId, i) => (
        <div key={i} className={`pattern-cell ${i === gapIndex ? "gap" : ""}`}>
          {i === gapIndex ? (
            filled ? (
              <ShapeFigure shape={findShape(filled)} />
            ) : (
              <span className="pattern-question">?</span>
            )
          ) : (
            <ShapeFigure shape={findShape(shapeId)} />
          )}
        </div>
      ))}
    </div>
  );
}

export default PatternStrip;
