import { useEffect, useState } from "react";

/**
 * The circular percent dial, shared by the homepage, the curriculum page and
 * the profile cards.
 *
 * It was written out twice already — identically, bar the class prefix — and a
 * third copy was about to be. The GEOMETRY is what has to stay in one place:
 * `strokeDasharray` and `strokeDashoffset` only agree if both are derived from
 * the same radius, and a copy that drifted would draw a ring that never quite
 * closes at 100%.
 *
 * APPEARANCE stays with each caller. `prefix` names the three classes
 * (`home-ring`, `cp-ring`, `pf-ring`), so each page keeps its own size, stroke
 * width and colour tokens, and nothing has to be re-themed to adopt this.
 *
 * @param {number} percent  0–100
 * @param {string} label    accessible description, e.g. "40% of Fractions complete"
 * @param {string} prefix   class prefix owning the CSS, e.g. "home-ring"
 */
const RING_RADIUS = 46;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

function ProgressRing({ percent, label, prefix }) {
  // Starts empty and fills on mount, so the number is seen arriving rather
  // than just being there. The CSS transition on the fill carries it.
  const [drawn, setDrawn] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setDrawn(percent));
    return () => cancelAnimationFrame(frame);
  }, [percent]);

  return (
    <svg className={prefix} viewBox="0 0 110 110" role="img" aria-label={label}>
      <circle className={`${prefix}-track`} cx="55" cy="55" r={RING_RADIUS} />
      <circle
        className={`${prefix}-fill`}
        cx="55"
        cy="55"
        r={RING_RADIUS}
        strokeDasharray={RING_LENGTH}
        strokeDashoffset={RING_LENGTH - (RING_LENGTH * drawn) / 100}
      />
      <text className={`${prefix}-text`} x="55" y="55">
        {percent}%
      </text>
    </svg>
  );
}

export default ProgressRing;
