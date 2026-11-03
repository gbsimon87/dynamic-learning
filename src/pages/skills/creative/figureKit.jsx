// Small drawing helpers shared by the Year 5 Music, Art, Design and PE figures.
// Pure SVG pieces: no state, no randomness. Colours come from the CSS classes in
// each subject's Year5<Subject>Visual.css, which map to the --*-geo-* tokens.

/** A figure with a rounded paper card, an accessible text equivalent and a caption. */
export function Figure({ root, label, caption, h = 240, children }) {
  return <div className={root}>
    <figure className="v-fig">
      <svg viewBox={`0 0 400 ${h}`} role="img" aria-label={label}>
        <rect className="v-bg" x="1" y="1" width="398" height={h - 2} rx="18" />
        {children}
      </svg>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  </div>;
}

export function Txt({ x, y, children, anchor = "middle", bold, big, cls = "" }) {
  return <text x={x} y={y} textAnchor={anchor} className={`v-t${bold ? " v-b" : ""}${big ? " v-big" : ""} ${cls}`}>{children}</text>;
}

/** Words on a paper chip, so a label is always readable on top of any colour. */
export function Chip({ x, y, w, children, bold = true, cls = "" }) {
  const width = w ?? String(children).length * 10.4 + 22;
  return <g>
    <rect className="v-chip" x={x - width / 2} y={y - 15} width={width} height="26" rx="13" />
    <text x={x} y={y + 3} textAnchor="middle" className={`v-t${bold ? " v-b" : ""} ${cls}`}>{children}</text>
  </g>;
}

/** A line with a drawn arrowhead at (x2, y2). */
export function Arrow({ x1, y1, x2, y2, cls = "ln", head = 9 }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const p = (d) => `${(x2 - head * Math.cos(a + d)).toFixed(1)} ${(y2 - head * Math.sin(a + d)).toFixed(1)}`;
  return <g className={cls}>
    <path d={`M${x1} ${y1} L${x2} ${y2}`} />
    <path d={`M${p(0.5)} L${x2} ${y2} L${p(-0.5)}`} />
  </g>;
}

// A stick figure. Angles are in degrees from "straight down": +90 points right,
// -90 left and 180 straight up. Each limb is two segments, so knees and elbows bend.
const POSES = {
  stand: { armL: [-8, -4], armR: [8, 4], legL: [-4, 0], legR: [4, 0] },
  reach: { armL: [-172, 180], armR: [172, 180], legL: [-4, 0], legR: [4, 0] },
  star: { armL: [-140, -140], armR: [140, 140], legL: [-28, -28], legR: [28, 28] },
  sideStretch: { lean: 18, armL: [-30, -20], armR: [150, 175], legL: [-12, -4], legR: [12, 4] },
  toeTouch: { fold: 125, armL: [130, 130], armR: [134, 134], legL: [-3, 0], legR: [3, 0] },
  balance: { armL: [-95, -95], armR: [95, 95], legL: [0, 0], legR: [78, 8] },
  jog: { lean: 8, armL: [-50, -110], armR: [50, 110], legL: [-38, 12], legR: [35, -35] },
  lunge: { armL: [-20, -10], armR: [20, 10], legL: [-62, -2], legR: [55, 10] },
  crouch: { lean: 12, armL: [30, 60], armR: [40, 70], legL: [-70, 20], legR: [60, -25] },
  wave: { armL: [-8, -4], armR: [150, 175], legL: [-4, 0], legR: [4, 0] },
  plank: { lean: 82, armL: [84, 84], armR: [80, 80], legL: [0, 0], legR: [0, 0] },
  catch: { armL: [-130, -150], armR: [130, 150], legL: [-8, 0], legR: [8, 0] },
  throw: { lean: -8, armL: [-60, -50], armR: [140, 40], legL: [-30, 0], legR: [28, 5] },
  sit: { lean: 0, armL: [-25, -10], armR: [25, 10], legL: [-4, 0], legR: [4, 0] },
};

const limb = (angles, lens, [x, y]) => {
  let px = x, py = y;
  const pts = [`${px.toFixed(1)} ${py.toFixed(1)}`];
  angles.forEach((deg, i) => {
    const r = (deg * Math.PI) / 180;
    px += Math.sin(r) * lens[i];
    py += Math.cos(r) * lens[i];
    pts.push(`${px.toFixed(1)} ${py.toFixed(1)}`);
  });
  return `M${pts.join(" L")}`;
};

/** (x, y) is the point between the feet; the figure is about 84 units tall at scale 1. */
export function Stick({ x, y, s = 1, pose = "stand", cls = "ln", headCls = "paper k" }) {
  const p = typeof pose === "string" ? POSES[pose] ?? POSES.stand : pose;
  return <g transform={`translate(${x} ${y}) scale(${s})`} className={cls}>
    <g transform={`rotate(${p.lean ?? 0} 0 -34)`}>
      <path d={limb(p.legL, [17, 17], [0, -34])} />
      <path d={limb(p.legR, [17, 17], [0, -34])} />
      <g transform={`rotate(${p.fold ?? 0} 0 -34)`}>
        <path d="M0 -65 L0 -34" />
        <path d={limb(p.armL, [14, 14], [0, -60])} />
        <path d={limb(p.armR, [14, 14], [0, -60])} />
        <circle cx="0" cy="-75" r="9" className={headCls} />
      </g>
    </g>
  </g>;
}

const PALETTE = ["roof", "sea", "leaf", "sun", "door", "autumn"];

/** "N groups of M": equal boxes in a row. Only the givens are written, never the total. */
export function BlocksFigure({ root, v }) {
  const n = Math.min(Math.max(v.count, 1), 8);
  const w = Math.min(72, (370 - (n - 1) * 8) / n), x0 = 200 - (n * w + (n - 1) * 8) / 2;
  return <Figure root={root} label={`${v.count} equal ${v.plural ?? `${v.item}s`}, each with ${v.each} ${v.unit}.`} caption={v.caption}>
    {Array.from({ length: n }, (_, i) => <g key={i}>
      <rect className="f-sun k" x={x0 + i * (w + 8)} y="64" width={w} height="72" rx="10" />
      <text x={x0 + i * (w + 8) + w / 2} y="108" textAnchor="middle" className="v-t v-b v-on v-big">{v.each}</text>
    </g>)}
    <Txt x={200} y={170} bold>{`${v.count} ${v.plural ?? `${v.item}s`}`}</Txt>
    <Txt x={200} y={196}>{`${v.each} ${v.unit} in each ${v.item}`}</Txt>
  </Figure>;
}

/** A picture graph: one dot per item. Shows the givens of a counting question. */
export function PictogramFigure({ root, v }) {
  const rows = v.rows, step = Math.min(44, 190 / rows.length);
  return <Figure root={root} h={Math.min(240, 70 + rows.length * 44)} label={`A picture graph, one dot for each ${v.unit}: ${rows.map((r) => `${r.label}, ${r.count}`).join("; ")}.`} caption={`Each dot is one ${v.unit}.`}>
    {rows.map((r, i) => <g key={r.label}>
      <Txt x={14} y={36 + i * step + 6} anchor="start" bold>{r.label}</Txt>
      {Array.from({ length: r.count }, (_, k) => <circle key={k} className={`f-${PALETTE[i % 6]} k`} cx={190 + k * 21} cy={36 + i * step} r="9" />)}
    </g>)}
  </Figure>;
}
