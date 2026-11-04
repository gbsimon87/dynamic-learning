import Year5ScienceVisual from "../year5/Year5ScienceVisual";
import { VISUAL_TYPES, YEAR6_ONLY_TYPES } from "../../../../../data/challenges/year6Science/visualTypes.js";
import { Fig, Root, Emoji, Arrow } from "../../../year5Pictures/Pictures";
import "./Year6ScienceVisual.css";

// The figure types are also exported here so a frame can read them next to the component.
// eslint-disable-next-line react-refresh/only-export-components
export { VISUAL_TYPES };

// ---- Circuit diagrams, drawn with the standard symbols Year 6 learns. ----
// A bulb is never drawn lit: the learner reasons from the diagram, as in Year 4.
const PART_NAMES = { cell: "Cell", lamp: "Bulb", buzzer: "Buzzer", motor: "Motor", switchOpen: "Switch", switchClosed: "Switch", wire: "" };
const HALF = { cell: 7, lamp: 16, buzzer: 11, motor: 16, switchOpen: 17, switchClosed: 17, wire: 0 };

function Symbol({ part, x, y }) {
  switch (part) {
    case "cell": return <g><line className="y6v-wire" x1={x - 6} y1={y - 20} x2={x - 6} y2={y + 20} /><line className="y6v-cell-short" x1={x + 6} y1={y - 10} x2={x + 6} y2={y + 10} /></g>;
    case "lamp": return <g><circle className="y6v-part" cx={x} cy={y} r="16" /><path className="y6v-wire" d={`M${x - 11} ${y - 11} L${x + 11} ${y + 11} M${x - 11} ${y + 11} L${x + 11} ${y - 11}`} /></g>;
    case "motor": return <g><circle className="y6v-part" cx={x} cy={y} r="16" /><text x={x} y={y + 1} textAnchor="middle" dominantBaseline="central">M</text></g>;
    case "buzzer": return <g><path className="y6v-wire" d={`M${x - 11} ${y} V${y - 12} M${x + 11} ${y} V${y - 12}`} /><path className="y6v-part" d={`M${x - 18} ${y - 12} H${x + 18} A18 18 0 0 0 ${x - 18} ${y - 12} Z`} /></g>;
    case "switchOpen": return <g><circle className="y6v-contact" cx={x - 17} cy={y} r="4" /><circle className="y6v-contact" cx={x + 17} cy={y} r="4" /><line className="y6v-wire" x1={x - 17} y1={y} x2={x + 13} y2={y - 20} /></g>;
    case "switchClosed": return <g><circle className="y6v-contact" cx={x - 17} cy={y} r="4" /><circle className="y6v-contact" cx={x + 17} cy={y} r="4" /><line className="y6v-wire" x1={x - 17} y1={y} x2={x + 17} y2={y} /></g>;
    default: return null;
  }
}

/** Wire along one edge from x0 to x1 at height y, broken around each symbol. */
function Edge({ parts, y, x0, x1, labels, labelY }) {
  const step = (x1 - x0) / (parts.length + 1);
  const at = parts.map((part, i) => ({ part, x: x0 + step * (i + 1) }));
  const edges = [x0, ...at.flatMap(({ part, x }) => [x - HALF[part], x + HALF[part]]), x1];
  const wires = [];
  for (let i = 0; i < edges.length; i += 2) wires.push(`M${edges[i]} ${y} H${edges[i + 1]}`);
  return <g>
    <path className="y6v-wire" d={wires.join(" ")} />
    {at.map(({ part, x }, i) => <Symbol key={i} part={part} x={x} y={y} />)}
    {labels && at.map(({ part, x }, i) => PART_NAMES[part] && <text key={`l${i}`} className="y5v-small" x={x} y={labelY} textAnchor="middle">{PART_NAMES[part]}</text>)}
  </g>;
}

function CircuitDiagram({ parts = [], labels = false, gap = false, alt, caption }) {
  const half = Math.ceil(parts.length / 2);
  const [L, R, T, B] = [55, 345, 72, 178];
  return <Fig label={alt} caption={caption ?? "A circuit diagram with standard symbols. Trace the loop."}>
    <rect className="y5v-paper" width="400" height="240" />
    <Edge parts={parts.slice(0, half)} y={T} x0={L} x1={R} labels={labels} labelY={30} />
    <Edge parts={parts.slice(half).reverse()} y={B} x0={L} x1={R} labels={labels} labelY={222} />
    <path className="y6v-wire" d={gap ? `M${L} ${T} V${B} M${R} ${T} V${(T + B) / 2 - 16} M${R} ${(T + B) / 2 + 16} V${B}` : `M${L} ${T} V${B} M${R} ${T} V${B}`} />
    {gap && labels && <text className="y5v-small" x={R - 14} y={(T + B) / 2} textAnchor="end" dominantBaseline="central">Gap</text>}
  </Fig>;
}

// ---- Light travelling in straight lines. ----
function LightPath({ source = "🔦", via = null, object = "🍎", labels = false, alt, caption }) {
  const s = { x: 62, y: via ? 62 : 120 };
  const eye = { x: 338, y: via ? 62 : 120 };
  const hit = { x: 200, y: via === "mirror" ? 186 : 168 };
  return <Fig label={alt} caption={caption}>
    <rect className="y5v-paper" width="400" height="240" />
    <Emoji e={source} x={s.x} y={s.y} size="52" />
    <Emoji e="👁️" x={eye.x} y={eye.y} size="50" />
    {via === "mirror" && <g><rect className="y6v-mirror" x="140" y="190" width="120" height="10" rx="3" /><path className="y5v-ink-thin" d="M150 200 l-10 14 M175 200 l-10 14 M200 200 l-10 14 M225 200 l-10 14 M250 200 l-10 14" /></g>}
    {via === "object" && <Emoji e={object} x={hit.x} y={hit.y + 14} size="54" />}
    {via ? <g>
      <Arrow x1={s.x + 24} y1={s.y + 18} x2={hit.x - 10} y2={hit.y - (via === "object" ? 20 : 4)} head={16} className="y5v-arrow y6v-ray" />
      <Arrow x1={hit.x + 10} y1={hit.y - (via === "object" ? 20 : 4)} x2={eye.x - 26} y2={eye.y + 20} head={16} className="y5v-arrow y6v-ray" />
    </g> : <Arrow x1={s.x + 34} y1={s.y} x2={eye.x - 34} y2={eye.y} head={16} className="y5v-arrow y6v-ray" />}
    {labels && <g>
      <text x="8" y={s.y - 38} textAnchor="start">Light source</text>
      <text x={eye.x} y={eye.y - 38} textAnchor="middle">Eye</text>
      {via && <text x={hit.x} y={via === "mirror" ? 232 : 228} textAnchor="middle">{via === "mirror" ? "Mirror" : "Object"}</text>}
    </g>}
  </Fig>;
}

// ---- A periscope: two mirrors turn the light twice. ----
function Periscope({ labels = false, object = "🐦", alt, caption }) {
  return <Fig label={alt} caption={caption}>
    <rect className="y5v-paper" width="400" height="240" />
    <path className="y6v-tube" d="M175 45 V30 H225 V145 H250 M250 200 H225 V210 H175 V100 H150 M150 45 H175" />
    <line className="y6v-mirror-line" x1="176" y1="46" x2="224" y2="94" />
    <line className="y6v-mirror-line" x1="176" y1="146" x2="224" y2="194" />
    <Emoji e={object} x="62" y="70" size="48" />
    <Emoji e="👁️" x="352" y="170" size="46" />
    <path className="y5v-arrow y6v-ray" d="M92 70 H200 V170 H316" />
    <polygon className="y5v-arrow-head y6v-ray-head" points="326,170 310,162 310,178" />
    {labels && <g><text x="236" y="58" textAnchor="start">Mirror</text><text x="164" y="182" textAnchor="end">Mirror</text></g>}
  </Fig>;
}

// ---- A shadow has the same shape as the object that blocks the light. ----
function Outline({ kind, cx, cy, s, className }) {
  const star = Array.from({ length: 10 }, (_, i) => { const r = i % 2 ? s * 0.45 : s; const a = -Math.PI / 2 + (i * Math.PI) / 5; return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`; }).join(" ");
  switch (kind) {
    case "circle": return <circle className={className} cx={cx} cy={cy} r={s} />;
    case "square": return <rect className={className} x={cx - s} y={cy - s} width={s * 2} height={s * 2} />;
    case "triangle": return <polygon className={className} points={`${cx},${cy - s} ${cx + s},${cy + s * 0.8} ${cx - s},${cy + s * 0.8}`} />;
    default: return <polygon className={className} points={star} />;
  }
}

function Shadow({ shape = "star", hideShadow = false, labels = false, alt, caption }) {
  return <Fig label={alt} caption={caption}>
    <rect className="y5v-paper" width="400" height="240" />
    <Emoji e="🔦" x="46" y="120" size="48" />
    <path className="y6v-beam" d="M70 120 L332 22 M70 120 L332 218" />
    <Outline kind={shape} cx={165} cy={120} s={26} className="y6v-object" />
    <rect className="y6v-screen" x="332" y="18" width="14" height="204" rx="3" />
    {hideShadow
      ? <g><rect className="y5v-card-ask" x="270" y="74" width="56" height="92" rx="8" /><text x="298" y="121" textAnchor="middle" dominantBaseline="central">?</text></g>
      : <Outline kind={shape} cx={300} cy={120} s={30} className="y6v-shadow" />}
    {labels && <g><text x="46" y="170" textAnchor="middle">Torch</text><text x="165" y="176" textAnchor="middle">Object</text><text x="360" y="236" textAnchor="end">Screen</text></g>}
  </Fig>;
}

// ---- The double loop: heart to lungs and back, heart to body and back. ----
function Circulation({ labels = false, alt, caption }) {
  return <Fig label={alt} caption={caption}>
    <rect className="y5v-paper" width="400" height="240" />
    <Emoji e="🫁" x="200" y="36" size="48" />
    <Emoji e="🫀" x="200" y="122" size="54" />
    <Emoji e="🧍" x="200" y="206" size="48" />
    <Arrow x1="168" y1="104" x2="168" y2="54" head={14} className="y5v-arrow y6v-blood-low" />
    <Arrow x1="232" y1="54" x2="232" y2="104" head={14} className="y5v-arrow y6v-blood-high" />
    <Arrow x1="232" y1="142" x2="232" y2="190" head={14} className="y5v-arrow y6v-blood-high" />
    <Arrow x1="168" y1="190" x2="168" y2="142" head={14} className="y5v-arrow y6v-blood-low" />
    {labels && <g>
      <text x="270" y="36" textAnchor="start" dominantBaseline="central">Lungs</text>
      <text x="270" y="122" textAnchor="start" dominantBaseline="central">Heart</text>
      <text x="270" y="206" textAnchor="start" dominantBaseline="central">Body</text>
    </g>}
  </Fig>;
}

const FIGURES = {
  circuitDiagram: (v) => <CircuitDiagram {...v} />,
  lightPath: (v) => <LightPath {...v} />,
  periscope: (v) => <Periscope {...v} />,
  shadow: (v) => <Shadow {...v} />,
  circulation: (v) => <Circulation {...v} />,
};

/**
 * The picture for a Year 6 Science question. Year 6's own figures are drawn here; every other
 * figure, a results table and the classification key go to Year5ScienceVisual (and on to Year 4).
 */
export default function Year6ScienceVisual({ question }) {
  const v = question?.visual;
  if (v && YEAR6_ONLY_TYPES.includes(v.type)) return <Root name="y6-sci-visual">{FIGURES[v.type](v)}{question.table && <Year5ScienceVisual question={{ table: question.table }} />}</Root>;
  return <Year5ScienceVisual question={question} />;
}
