import { polygonPoints } from "../../data/challenges/shapes";
import "./challenge-kit.css";

/**
 * A 2-D shape drawn from its vertex data.
 *
 * SVG rather than CSS clip-path because this topic is about PROPERTIES: the
 * same coordinate list draws the outline, marks each corner, and places the
 * line of symmetry. A clip-path gives a silhouette with nothing to count.
 *
 * `showVertices` dots the corners, for counting them.
 * `showSymmetry` draws the dashed vertical line down the middle — the only
 * line of symmetry Year 2 is asked about.
 * `drawnSides` turns the outline into a tracing guide and reveals that many
 * edges, so the same figure can support Year 3 drawing work.
 * `highlightSides` emphasises selected edge indexes for line-property work.
 */
const SIZE = 160;
const PAD = 14;

function ShapeFigure({
  shape,
  showVertices,
  showSymmetry,
  drawnSides,
  highlightSides = [],
  label,
}) {
  const box = SIZE + PAD * 2;
  const tracing = Number.isInteger(drawnSides) && !shape.curved;

  return (
    <svg
      className="shape-figure"
      viewBox={`0 0 ${box} ${box}`}
      role="img"
      aria-label={label ?? `a ${shape.name}`}
    >
      <g transform={`translate(${PAD} ${PAD})`}>
        {shape.curved ? (
          <circle
            className="shape-outline"
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={SIZE / 2}
          />
        ) : (
          <>
            <polygon
              className={`shape-outline ${tracing ? "guide" : ""}`}
              points={polygonPoints(shape, SIZE)}
            />

            {shape.vertices.map(([x1, y1], index) => {
              const [x2, y2] = shape.vertices[(index + 1) % shape.vertices.length];
              const isDrawn = tracing && index < drawnSides;
              const isHighlighted = highlightSides.includes(index);
              if (!isDrawn && !isHighlighted) return null;

              return (
                <line
                  key={`edge-${index}`}
                  className={`shape-edge ${isDrawn ? "drawn" : ""} ${isHighlighted ? "highlighted" : ""}`}
                  x1={x1 * SIZE}
                  y1={y1 * SIZE}
                  x2={x2 * SIZE}
                  y2={y2 * SIZE}
                />
              );
            })}
          </>
        )}

        {showVertices &&
          !shape.curved &&
          shape.vertices.map(([x, y], i) => (
            <circle key={i} className="shape-vertex" cx={x * SIZE} cy={y * SIZE} r={6} />
          ))}
      </g>

      {showSymmetry && (
        <line
          className="shape-symmetry-line"
          x1={box / 2}
          y1={2}
          x2={box / 2}
          y2={box - 2}
        />
      )}
    </svg>
  );
}

export default ShapeFigure;
