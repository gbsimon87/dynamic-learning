import { VISUAL_TYPES } from "../../../../../data/challenges/year5Wellbeing/visualTypes.js";
import { Fig, Root, Scene, Counters, Scale, Emoji, Lines } from "../../../year5Pictures/Pictures";
import "./Year5WellbeingVisual.css";

// The figure types are also exported here so a frame can read them next to the component.
// eslint-disable-next-line react-refresh/only-export-components
export { VISUAL_TYPES };

/** Bars out of ten, for "7 out of 10" style questions. `items` is [label, value, max]. */
function Meter({ items = [], alt, caption }) {
  return <Fig label={alt} caption={caption}>
    <rect className="y5v-paper" width="400" height="240" />
    {items.map(([label, value, max], i) => {
      const y = 44 + i * 104;
      const seg = 24;
      return <g key={label}>
        <Lines x="14" y={y - 12} lines={[label]} anchor="start" />
        {Array.from({ length: max }, (_, k) => <rect key={k} className={k < value ? "y5v-meter-on" : "y5v-meter-off"} x={16 + k * (seg + 3)} y={y + 4} width={seg} height="26" rx="5" />)}
        <text className="y5v-small" x="16" y={y + 52}>{value} out of {max}</text>
      </g>;
    })}
  </Fig>;
}

function clock(cx, cy, r, hour, minute) {
  const hAngle = ((hour % 12) + minute / 60) * 30 - 90;
  const mAngle = minute * 6 - 90;
  const pt = (angle, len) => [cx + Math.cos((angle * Math.PI) / 180) * len, cy + Math.sin((angle * Math.PI) / 180) * len];
  const h = pt(hAngle, r * 0.38);
  const m = pt(mAngle, r * 0.58);
  return <g>
    <circle className="y5v-card" cx={cx} cy={cy} r={r} />
    {[12, 3, 6, 9].map((n) => { const [x, y] = pt(n * 30 - 90, r * 0.82); return <text className="y5v-small" key={n} x={x} y={y + 1} textAnchor="middle" dominantBaseline="central">{n}</text>; })}
    <line className="y5v-ink" x1={cx} y1={cy} x2={h[0]} y2={h[1]} strokeWidth="6" />
    <line className="y5v-ink" x1={cx} y1={cy} x2={m[0]} y2={m[1]} strokeWidth="3.5" />
    <circle className="y5v-fill-ink" cx={cx} cy={cy} r="5" />
  </g>;
}
/** One or two clock faces. `times` is [hour, minute, label]. */
function Clocks({ times = [], alt, caption }) {
  const n = times.length;
  const r = n > 1 ? 66 : 80;
  return <Fig label={alt} caption={caption}>
    <rect className="y5v-paper" width="400" height="240" />
    {times.map(([hour, minute, label], i) => {
      const cx = n === 1 ? 200 : 100 + i * 200;
      return <g key={i}>{clock(cx, 100, r, hour, minute)}<text x={cx} y="214" textAnchor="middle">{label}</text></g>;
    })}
  </Fig>;
}

const FIGURES = {
  scene: (v) => <Scene {...v} />,
  counters: (v) => <Counters {...v} />,
  scale: (v) => <Scale {...v} />,
  meter: (v) => <Meter {...v} />,
  clocks: (v) => <Clocks {...v} />,
};

/**
 * The picture for a Year 5 Relationships and health question: `question.visual` is `{ type, ...params }`.
 * Pictures stay gentle and generic: emoji faces and everyday things, never harm or bodies.
 * Returns null when there is nothing to draw.
 */
export default function Year5WellbeingVisual({ question }) {
  const v = question?.visual;
  if (!v || !Object.hasOwn(FIGURES, v.type)) return null;
  return <Root name="y5-well-visual">{FIGURES[v.type](v)}</Root>;
}
