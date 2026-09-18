import "./challenge-kit.css";

/**
 * Two arms meeting at a point, with the angle between them swept and shaded.
 *
 * `RotationDial` cannot serve this topic: it turns in whole right angles by
 * design, so there is nothing between 90° and 180° to look at. Year 3 asks
 * whether an angle is GREATER OR LESS than a right angle, which only means
 * something if in-between angles can be drawn.
 *
 * The right-angle marker is a square corner rather than an arc, because that is
 * the notation a learner will meet everywhere else, and it snaps on only at
 * exactly 90° — so the picture itself answers "is this a right angle?".
 *
 * `degrees`      the angle to draw, 0–360
 * `showMarker`   draw the right-angle square when degrees === 90
 * `compare`      also draw a faint right angle behind, to compare against
 * `label`        accessible description
 * `size`         px, defaults to 200
 */
function AngleExplorer({
  degrees,
  showMarker = true,
  compare = false,
  label,
  size = 200,
}) {
  const centre = size / 2;
  const radius = size * 0.38;

  // SVG y grows downward; negate so 0° points right and angles open anticlockwise,
  // which is how a turn is drawn in the programme of study's examples.
  const point = (deg, r = radius) => {
    const radians = (deg * Math.PI) / 180;
    return [centre + r * Math.cos(radians), centre - r * Math.sin(radians)];
  };

  const [armX, armY] = point(degrees);
  const isRightAngle = Math.round(degrees) === 90;

  // A wedge for the swept angle. Large-arc flag once past a half turn.
  const [arcX, arcY] = point(degrees, radius * 0.45);
  const wedge = [
    `M ${centre} ${centre}`,
    `L ${centre + radius * 0.45} ${centre}`,
    `A ${radius * 0.45} ${radius * 0.45} 0 ${degrees > 180 ? 1 : 0} 0 ${arcX} ${arcY}`,
    "Z",
  ].join(" ");

  return (
    <svg
      className="angle-explorer"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={label || `An angle of ${Math.round(degrees)} degrees`}
    >
      {compare && (
        <path
          className="angle-compare"
          d={`M ${centre + radius} ${centre} L ${centre} ${centre} L ${centre} ${
            centre - radius
          }`}
        />
      )}

      <path className="angle-wedge" d={wedge} />

      {/* Fixed arm along the baseline, then the arm that moves. */}
      <line
        className="angle-arm"
        x1={centre}
        y1={centre}
        x2={centre + radius}
        y2={centre}
      />
      <line
        className="angle-arm angle-arm-moving"
        x1={centre}
        y1={centre}
        x2={armX}
        y2={armY}
      />

      {showMarker && isRightAngle && (
        <path
          className="angle-right-marker"
          d={`M ${centre + 18} ${centre} L ${centre + 18} ${centre - 18} L ${centre} ${
            centre - 18
          }`}
        />
      )}

      <circle className="angle-vertex" cx={centre} cy={centre} r={4} />
    </svg>
  );
}

export default AngleExplorer;
