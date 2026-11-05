import { drawSolid, SOLID_VERTICES } from "../../../data/freePlay/solidModels";

/**
 * Every Shape Explorer drawing, in one 120 x 120 box so all shapes feel
 * equally big. Fill, outline and shadow come from `.se-shape` in
 * ShapeExplorer.css (the kit's --ck-* tokens), so both themes work.
 *
 * Flat shapes are hand-placed. Solids with flat faces are drawn from vertex
 * data (solidModels.js); the curved ones are drawn here with gradients.
 * Gradient ids are unique because only one drawing is on the page at a time.
 */

/** Corners of a regular n-sided polygon, flat on top when n is even. */
function regular(n, radius = 54) {
  const start = n % 2 === 0 ? -Math.PI / 2 + Math.PI / n : -Math.PI / 2;
  return Array.from({ length: n }, (_, i) => {
    const angle = start + (i / n) * 2 * Math.PI;
    return `${(60 + radius * Math.cos(angle)).toFixed(1)},${(60 + radius * Math.sin(angle)).toFixed(1)}`;
  }).join(" ");
}

const STAR_POINTS = Array.from({ length: 10 }, (_, i) => {
  const radius = i % 2 === 0 ? 54 : 23;
  const angle = (i / 10) * 2 * Math.PI - Math.PI / 2;
  return `${(60 + radius * Math.cos(angle)).toFixed(1)},${(62 + radius * Math.sin(angle)).toFixed(1)}`;
}).join(" ");

/** Little cross-bars on a side: the same count means the same length. */
function ticks(from, to, count) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const len = Math.hypot(x2 - x1, y2 - y1);
  const dx = (x2 - x1) / len;
  const dy = (y2 - y1) / len;
  const px = -dy;
  const py = dx;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return Array.from({ length: count }, (_, i) => {
    const offset = (i - (count - 1) / 2) * 7;
    const cx = mx + dx * offset;
    const cy = my + dy * offset;
    return `M${(cx + px * 7).toFixed(1)},${(cy + py * 7).toFixed(1)} L${(cx - px * 7).toFixed(1)},${(cy - py * 7).toFixed(1)}`;
  }).join(" ");
}

function Triangle({ points, marks = [] }) {
  const corners = points.split(" ").map((p) => p.split(",").map(Number));
  return (
    <>
      <polygon points={points} />
      {marks.map((count, i) =>
        count ? <path key={i} className="se-tick" d={ticks(corners[i], corners[(i + 1) % 3], count)} /> : null,
      )}
    </>
  );
}

const TRI = {
  equilateral: "60,14 108,97 12,97",
  isosceles: "60,8 94,108 26,108",
  scalene: "22,16 112,92 8,104",
  acute: "50,12 112,100 14,88",
  obtuse: "8,78 112,78 40,48",
};

const FLAT = {
  circle: <circle cx="60" cy="60" r="50" />,
  square: <rect x="14" y="14" width="92" height="92" rx="5" />,
  rectangle: <rect x="6" y="28" width="108" height="64" rx="5" />,
  triangle: <polygon points="60,12 110,102 10,102" />,
  star: <polygon points={STAR_POINTS} />,
  heart: (
    <path d="M60 106 C20 76 8 54 8 36 C8 20 20 10 34 10 C46 10 55 17 60 27 C65 17 74 10 86 10 C100 10 112 20 112 36 C112 54 100 76 60 106 Z" />
  ),

  oval: <ellipse cx="60" cy="60" rx="54" ry="36" />,
  diamond: <polygon points="60,6 112,60 60,114 8,60" />,
  pentagon: <polygon points={regular(5)} />,
  hexagon: <polygon points={regular(6)} />,
  octagon: <polygon points={regular(8)} />,
  semicircle: <path d="M8,82 A52,52 0 0 1 112,82 Z" />,
  crescent: <path transform="translate(12 0)" d="M80,12 A50,50 0 1 0 80,108 A56,56 0 0 1 80,12 Z" />,
  trapezium: <polygon points="34,24 86,24 114,96 6,96" />,

  "equilateral-triangle": <Triangle points={TRI.equilateral} marks={[1, 1, 1]} />,
  "isosceles-triangle": <Triangle points={TRI.isosceles} marks={[1, 0, 1]} />,
  "scalene-triangle": <Triangle points={TRI.scalene} marks={[1, 2, 3]} />,
  "right-angled-triangle": (
    <>
      <polygon points="28,16 28,104 92,104" />
      <path className="se-tick" d="M28,86 H46 V104" />
    </>
  ),
  "acute-triangle": <polygon points={TRI.acute} />,
  "obtuse-triangle": <polygon points={TRI.obtuse} />,
  parallelogram: <polygon points="32,28 114,28 88,92 6,92" />,
  rhombus: <polygon points="60,22 112,60 60,98 8,60" />,
  kite: <polygon points="60,6 98,44 60,114 22,44" />,
  heptagon: <polygon points={regular(7)} />,
  nonagon: <polygon points={regular(9)} />,
  decagon: <polygon points={regular(10)} />,
  dodecagon: <polygon points={regular(12)} />,
  ellipse: <ellipse cx="60" cy="60" rx="54" ry="30" transform="rotate(-20 60 60)" />,
  sector: <path d="M60,108 L8.4,34 A90,90 0 0 1 111.6,34 Z" />,
  lens: <path d="M10,60 A56,56 0 0 1 110,60 A56,56 0 0 1 10,60 Z" />,
};

/** Curved solids. `url(#…)` overlays add the light and shade. */
const CURVED = {
  sphere: (
    <>
      <circle cx="60" cy="60" r="50" />
      <circle className="se-shade" cx="60" cy="60" r="50" fill="url(#se-ball)" />
    </>
  ),
  hemisphere: (
    <>
      <path d="M8,78 A52,52 0 0 1 112,78 A52,16 0 0 1 8,78 Z" />
      <path className="se-shade" d="M8,78 A52,52 0 0 1 112,78 A52,16 0 0 1 8,78 Z" fill="url(#se-ball)" />
    </>
  ),
  cylinder: (
    <>
      <path d="M20,30 V90 A40,14 0 0 0 100,90 V30 A40,14 0 0 1 20,30 Z" />
      <path className="se-shade" d="M20,30 V90 A40,14 0 0 0 100,90 V30 Z" fill="url(#se-side)" />
      <ellipse cx="60" cy="30" rx="40" ry="14" />
      <ellipse className="se-shade" cx="60" cy="30" rx="40" ry="14" fill="#fff" fillOpacity="0.35" />
    </>
  ),
  cone: (
    <>
      <path d="M60,10 L16,92 A44,14 0 0 0 104,92 Z" />
      <path className="se-shade" d="M60,10 L16,92 A44,14 0 0 0 104,92 Z" fill="url(#se-side)" />
    </>
  ),
  torus: (
    <>
      <path
        fillRule="evenodd"
        d="M6,60 A54,40 0 1 0 114,60 A54,40 0 1 0 6,60 Z M34,56 A26,14 0 1 0 86,56 A26,14 0 1 0 34,56 Z"
      />
      <path
        className="se-shade"
        fillRule="evenodd"
        fill="url(#se-ball)"
        d="M6,60 A54,40 0 1 0 114,60 A54,40 0 1 0 6,60 Z M34,56 A26,14 0 1 0 86,56 A26,14 0 1 0 34,56 Z"
      />
    </>
  ),
};

/** Shading for a flat face: white where it faces the light, black where it turns away. */
function shade(tone) {
  if (tone > 0.45) return { fill: "#fff", opacity: Math.min(0.5, (tone - 0.45) * 0.9) };
  return { fill: "#000", opacity: Math.min(0.4, (0.45 - tone) * 0.7) };
}

function Gradients() {
  return (
    <defs>
      <radialGradient id="se-ball" cx="35%" cy="30%" r="80%">
        <stop offset="0" stopColor="#fff" stopOpacity="0.6" />
        <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.32" />
      </radialGradient>
      <linearGradient id="se-side" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#fff" stopOpacity="0.3" />
        <stop offset="0.4" stopColor="#fff" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.32" />
      </linearGradient>
    </defs>
  );
}

function ShapeArt({ id, label = "A shape to name" }) {
  let body;
  if (id in FLAT) {
    body = FLAT[id];
  } else if (id in CURVED) {
    body = (
      <>
        <Gradients />
        {CURVED[id]}
      </>
    );
  } else if (id in SOLID_VERTICES) {
    body = drawSolid(id).map(({ points, tone }, i) => {
      const { fill, opacity } = shade(tone);
      return (
        <g key={i}>
          <polygon points={points} />
          <polygon className="se-shade" points={points} fill={fill} fillOpacity={opacity} />
        </g>
      );
    });
  } else {
    return null;
  }

  return (
    <svg className="se-shape" viewBox="0 0 120 120" role="img" aria-label={label}>
      {body}
    </svg>
  );
}

export default ShapeArt;
