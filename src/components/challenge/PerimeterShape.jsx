import "./challenge-kit.css";

/**
 * A polygon with its side lengths labelled, for measuring perimeter.
 *
 * `ShapeFigure` draws a shape to name and count corners on; perimeter needs
 * numbers on the edges and a way to see them accumulate. `traced` lights the
 * sides up to that index and is meant to be stepped, so the learner watches the
 * total build edge by edge instead of being handed a sum — "perimeter is the
 * way round" is the idea, and a single number hides it.
 *
 * `sides`   [{ length, unit }] in order around the shape
 * `shape`   "rectangle" | "square" | "lshape" — how the sides are arranged
 * `traced`  how many sides are highlighted so far (0 = none)
 * `running` optional running total to show in the middle
 */
function PerimeterShape({ sides, shape = "rectangle", traced = 0, running, label }) {
  const points = outlineFor(shape, sides);

  // Midpoint of each edge, where its length label sits.
  const edges = points.map((point, i) => {
    const next = points[(i + 1) % points.length];
    return {
      x1: point[0],
      y1: point[1],
      x2: next[0],
      y2: next[1],
      midX: (point[0] + next[0]) / 2,
      midY: (point[1] + next[1]) / 2,
    };
  });

  return (
    <svg
      className="perimeter-shape"
      viewBox="0 0 240 180"
      role="img"
      aria-label={label || `A ${shape} with sides ${sides.map((s) => s.length).join(", ")}`}
    >
      <polygon
        className="perimeter-fill"
        points={points.map(([x, y]) => `${x},${y}`).join(" ")}
      />

      {edges.map((edge, i) => (
        <line
          key={`edge-${i}`}
          className={`perimeter-edge ${i < traced ? "traced" : ""}`}
          x1={edge.x1}
          y1={edge.y1}
          x2={edge.x2}
          y2={edge.y2}
        />
      ))}

      {edges.map((edge, i) => (
        <text
          key={`label-${i}`}
          className={`perimeter-length ${i < traced ? "traced" : ""}`}
          x={edge.midX}
          y={edge.midY}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {sides[i] ? `${sides[i].length}${sides[i].unit || ""}` : ""}
        </text>
      ))}

      {running !== undefined && (
        <text className="perimeter-running" x="120" y="95" textAnchor="middle">
          {running}
        </text>
      )}
    </svg>
  );
}

/**
 * Vertex lists per shape. Coordinates are fixed rather than derived from the
 * lengths: a 12cm side drawn twelve times longer than a 1cm side would leave
 * the label unreadable, and the numbers — not the drawing — are what is summed.
 */
function outlineFor(shape, sides) {
  if (shape === "square") {
    return [
      [70, 30],
      [170, 30],
      [170, 130],
      [70, 130],
    ];
  }
  if (shape === "lshape") {
    return [
      [50, 25],
      [150, 25],
      [150, 85],
      [200, 85],
      [200, 150],
      [50, 150],
    ];
  }
  // rectangle, and the fallback for anything with four sides
  return [
    [40, 40],
    [200, 40],
    [200, 130],
    [40, 130],
  ].slice(0, Math.max(3, sides.length));
}

export default PerimeterShape;
