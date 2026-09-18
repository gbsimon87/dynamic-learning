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
 */
const SIZE = 160;
const PAD = 14;

function ShapeFigure({ shape, showVertices, showSymmetry, label }) {
  const box = SIZE + PAD * 2;

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
          <polygon className="shape-outline" points={polygonPoints(shape, SIZE)} />
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
