import "./challenge-kit.css";

/**
 * A 3-D solid drawn as a simple line figure.
 *
 * Hidden edges are dashed rather than left out, so a learner counting edges on
 * a cube can find all twelve — with the back three missing the drawing would
 * contradict the answer.
 *
 * Each solid is hand-drawn rather than projected from 3-D data: at this size
 * the standard schoolbook view is clearer than a true projection, and there
 * are only seven of them.
 */
const FIGURES = {
  cube: (
    <>
      <polygon className="solid-face" points="30,50 100,50 100,120 30,120" />
      <polygon className="solid-face" points="30,50 60,20 130,20 100,50" />
      <polygon className="solid-face" points="100,50 130,20 130,90 100,120" />
      <line className="solid-hidden" x1="30" y1="120" x2="60" y2="90" />
      <line className="solid-hidden" x1="60" y1="90" x2="130" y2="90" />
      <line className="solid-hidden" x1="60" y1="90" x2="60" y2="20" />
    </>
  ),
  cuboid: (
    <>
      <polygon className="solid-face" points="20,60 120,60 120,115 20,115" />
      <polygon className="solid-face" points="20,60 50,30 150,30 120,60" />
      <polygon className="solid-face" points="120,60 150,30 150,85 120,115" />
      <line className="solid-hidden" x1="20" y1="115" x2="50" y2="85" />
      <line className="solid-hidden" x1="50" y1="85" x2="150" y2="85" />
      <line className="solid-hidden" x1="50" y1="85" x2="50" y2="30" />
    </>
  ),
  "square-pyramid": (
    <>
      <polygon className="solid-face" points="85,20 30,110 140,110" />
      <line className="solid-edge" x1="30" y1="110" x2="70" y2="130" />
      <line className="solid-edge" x1="70" y1="130" x2="140" y2="110" />
      <line className="solid-edge" x1="85" y1="20" x2="70" y2="130" />
      <line className="solid-hidden" x1="30" y1="110" x2="100" y2="90" />
      <line className="solid-hidden" x1="100" y1="90" x2="140" y2="110" />
      <line className="solid-hidden" x1="85" y1="20" x2="100" y2="90" />
    </>
  ),
  "triangular-prism": (
    <>
      <polygon className="solid-face" points="30,110 70,40 110,110" />
      <polygon className="solid-face" points="70,40 110,20 150,90 110,110" />
      <line className="solid-edge" x1="30" y1="110" x2="70" y2="90" />
      <line className="solid-hidden" x1="70" y1="90" x2="150" y2="90" />
      <line className="solid-hidden" x1="70" y1="90" x2="110" y2="20" />
    </>
  ),
  sphere: (
    <>
      <circle className="solid-face" cx="85" cy="75" r="55" />
      <ellipse className="solid-hidden" cx="85" cy="75" rx="55" ry="18" />
    </>
  ),
  cylinder: (
    <>
      <ellipse className="solid-face" cx="85" cy="35" rx="45" ry="15" />
      <line className="solid-edge" x1="40" y1="35" x2="40" y2="110" />
      <line className="solid-edge" x1="130" y1="35" x2="130" y2="110" />
      <path className="solid-edge" d="M40 110 A 45 15 0 0 0 130 110" />
      <path className="solid-hidden" d="M40 110 A 45 15 0 0 1 130 110" />
    </>
  ),
  cone: (
    <>
      <ellipse className="solid-face" cx="85" cy="110" rx="45" ry="15" />
      <line className="solid-edge" x1="85" y1="20" x2="40" y2="110" />
      <line className="solid-edge" x1="85" y1="20" x2="130" y2="110" />
    </>
  ),
};

function SolidFigure({ solid, label }) {
  return (
    <svg
      className="solid-figure"
      viewBox="0 0 170 145"
      role="img"
      aria-label={label ?? `a ${solid.name}`}
    >
      {FIGURES[solid.id]}
    </svg>
  );
}

export default SolidFigure;
