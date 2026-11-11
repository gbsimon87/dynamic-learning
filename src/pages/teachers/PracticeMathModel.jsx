import { useId } from "react";
const point = (cx, cy, radius, degrees) => [cx + radius * Math.sin(degrees * Math.PI / 180), cy - radius * Math.cos(degrees * Math.PI / 180)];
const line = (a, b, key, props = {}) => <line key={key} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} {...props} />;
const ROMAN = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];
function Clock({ model: m }) {
  return <svg className="pp-model pp-clock" viewBox="0 0 180 180" role="img" aria-label={m.blank ? "Blank clock face with minute marks" : "Clock face with hour and minute hands"}>
    <circle cx="90" cy="90" r="84" />
    {Array.from({ length: 60 }, (_, i) => line(point(90, 90, i % 5 === 0 ? 73 : 78, i * 6), point(90, 90, 82, i * 6), i, { strokeWidth: i % 5 === 0 ? 1.7 : .7 }))}
    {Array.from({ length: 12 }, (_, i) => { const [x, y] = point(90, 90, 62, i * 30); return <text key={i} x={x} y={y + 5} textAnchor="middle">{m.roman ? ROMAN[i] : i || 12}</text>; })}
    {!m.blank && <>{line([90, 90], point(90, 90, 40, (m.hour % 12) * 30 + m.minute / 2), "hour", { strokeWidth: 4 })}{line([90, 90], point(90, 90, 68, m.minute * 6), "minute", { strokeWidth: 2 })}<circle cx="90" cy="90" r="3" fill="currentColor" /></>}
  </svg>;
}
function Axis({ model: m }) {
  const span = m.max - m.min;
  const ticks = Math.round(span / (m.minorStep ?? m.step));
  return <svg className="pp-model pp-axis" viewBox="0 0 440 100" role="img" aria-label={`${m.type === "ruler" ? "Ruler" : "Number line"} from ${m.min} to ${m.max}${m.unit ? ` ${m.unit}` : ""}${m.fractional ? `, with ${m.fractional} equal intervals per whole` : ""}`}>
    <line x1="20" y1="45" x2="420" y2="45" />
    {Array.from({ length: ticks + 1 }, (_, i) => { const value = m.min + i * (m.minorStep ?? m.step); const major = m.fractional ? i % m.fractional === 0 : Math.abs(value / m.step - Math.round(value / m.step)) < .001; const x = 20 + i * 400 / ticks; return <g key={i}><line x1={x} x2={x} y1={major ? 34 : 39} y2="51" />{major && <text x={x} y="72" textAnchor="middle" fontSize="12">{Number(value.toFixed(4))}</text>}</g>; })}
    {m.value !== undefined && <g><path d={`M${20 + (m.value - m.min) / span * 400},40 l-5,-10 h10z`} fill="currentColor" /><text x={20 + (m.value - m.min) / span * 400} y="22" textAnchor="middle">A</text></g>}
    {m.unit && <text x="420" y="94" textAnchor="end">{m.unit}</text>}
  </svg>;
}
function Scale({ model: m, hatchId }) {
  if (m.type === "dial-scale") return <svg className="pp-model pp-clock" viewBox="0 0 190 180" role="img" aria-label={`Weighing dial marked from ${m.min} to ${m.max} ${m.unit}`}>
    <path d="M25 148 A80 80 0 1 1 165 148" />
    {Array.from({ length: Math.round((m.max - m.min) / m.minorStep) + 1 }, (_, i) => { const value = m.min + i * m.minorStep, angle = -130 + (value - m.min) / (m.max - m.min) * 260, [x, y] = point(95, 90, 62, angle); return <g key={i}>{line(point(95, 90, 72, angle), point(95, 90, 79, angle), "tick")}{value % m.step === 0 && <text x={x} y={y + 4} fontSize="10" textAnchor="middle">{value}</text>}</g>; })}
    {line([95, 90], point(95, 90, 69, -130 + (m.value - m.min) / (m.max - m.min) * 260), "pointer", { strokeWidth: 2.5 })}<text x="95" y="125" textAnchor="middle">A · {m.unit}</text>
  </svg>;
  return <svg className="pp-model pp-jug" viewBox="0 0 200 190" role="img" aria-label={`Measuring jug marked from 0 to ${m.max} ${m.unit}`}>
    <path d="M35 12 H150 V170 H35 Z M150 35 H180 V115 H150" />
    <rect x="36" y={170 - m.value / m.max * 150} width="113" height={m.value / m.max * 150} fill={`url(#${hatchId})`} />
    <line x1="35" x2="150" y1={170 - m.value / m.max * 150} y2={170 - m.value / m.max * 150} strokeWidth="2" />
    {Array.from({ length: m.max / m.minorStep + 1 }, (_, i) => { const value = i * m.minorStep, y = 170 - value / m.max * 150; return <g key={i}><line x1={value % m.step === 0 ? 105 : 125} x2="150" y1={y} y2={y} />{value % m.step === 0 && <text x="99" y={y + 4} fontSize="10" textAnchor="end">{value}</text>}</g>; })}<text x="20" y="185">{m.unit}</text>
  </svg>;
}
function Polygon({ model: m }) {
  const vertices = m.shape.vertices.map(([x, y]) => [25 + x * 150, 20 + y * 130]);
  return <svg className="pp-model pp-polygon" viewBox="0 0 220 175" role="img" aria-label="A polygon; any marked sides are drawn with a thick line">
    <polygon points={vertices.map((p) => p.join(",")).join(" ")} />
    {m.highlightSides?.map((side) => line(vertices[side], vertices[(side + 1) % vertices.length], side, { strokeWidth: 5 }))}
  </svg>;
}
function Angle({ degrees, x = 70, label }) {
  const end = point(x, 85, 52, 90 - degrees);
  return <g><path d={`M${x + 56} 85 H${x} L${end.join(" ")}`} strokeWidth="2" /><path d={`M${x + 22} 85 A22 22 0 ${degrees > 180 ? 1 : 0} 0 ${point(x, 85, 22, 90 - degrees).join(" ")}`} />{label && <text x={x} y="117" textAnchor="middle">{label}</text>}</g>;
}
function Solid({ solid }) {
  const common = { className: "pp-model pp-solid", viewBox: "0 0 180 150", role: "img", "aria-label": "Wireframe drawing of a three-dimensional shape" };
  if (solid === "sphere") return <svg {...common}><circle cx="90" cy="75" r="52" /><ellipse cx="90" cy="75" rx="52" ry="15" strokeDasharray="3 3" /><ellipse cx="90" cy="75" rx="20" ry="52" /></svg>;
  if (solid === "cylinder") return <svg {...common}><ellipse cx="90" cy="28" rx="48" ry="15" /><path d="M42 28 V119 A48 15 0 0 0 138 119 V28" /><path d="M42 119 A48 15 0 0 1 138 119" strokeDasharray="3 3" /></svg>;
  if (solid === "cone") return <svg {...common}><path d="M90 17 38 123 A52 14 0 0 0 142 123 Z" /><path d="M38 123 A52 14 0 0 1 142 123" strokeDasharray="3 3" /></svg>;
  if (solid === "square-pyramid") return <svg {...common}><path d="M90 15 25 112 104 139 157 106 Z M90 15 104 139" /><path d="M25 112 80 82 157 106 M80 82 90 15" strokeDasharray="3 3" /></svg>;
  if (solid === "triangular-prism") return <svg {...common}><path d="M28 127 62 46 97 127 Z M62 46 113 18 151 100 97 127 M113 18 151 100" /><path d="M28 127 80 100 113 18 M80 100 151 100" strokeDasharray="3 3" /></svg>;
  const wide = solid === "cuboid";
  return <svg {...common}><path d={wide ? "M20 50 62 20 164 20 164 95 124 128 20 128 Z M20 50 H124 V128 M124 50 164 20" : "M30 50 72 20 150 20 150 95 108 128 30 128 Z M30 50 H108 V128 M108 50 150 20"} /><path d={wide ? "M62 20 V95 H164 M62 95 20 128" : "M72 20 V95 H150 M72 95 30 128"} strokeDasharray="3 3" /></svg>;
}
export default function PracticeMathModel({ model: m }) {
  const id = useId();
  if (m.type === "clock") return <Clock model={m} />;
  if (["number-line", "ruler"].includes(m.type)) return <Axis model={m} />;
  if (["jug", "dial-scale"].includes(m.type)) return <div className="pp-measure-model"><Scale model={m} hatchId={id} /><svg width="0" height="0" aria-hidden="true"><defs><pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 6 6 0" stroke="currentColor" /></pattern></defs></svg></div>;
  if (m.type === "drawing-grid") return <svg className="pp-model pp-drawing-grid" viewBox="0 0 360 110" role="img" aria-label="Blank square grid for drawing"><defs><pattern id={id} width="12" height="12" patternUnits="userSpaceOnUse"><path d="M12 0 H0 V12" stroke="#aaa" strokeWidth=".5" /></pattern></defs><rect width="360" height="110" fill={`url(#${id})`} /></svg>;
  if (m.type === "solid") return <Solid solid={m.solid} />;
  if (m.type === "polygon") return <Polygon model={m} />;
  if (["angle", "angles"].includes(m.type)) { const angles = m.angles ?? [{ degrees: m.degrees }]; return <svg className="pp-model pp-angles" viewBox={`0 0 ${angles.length * 140} 125`} role="img" aria-label="Angle diagram; compare the openings of the labelled rays">{angles.map((a, i) => <Angle key={i} {...a} x={i * 140 + 65} />)}</svg>; }
  if (m.type === "turn") { const start = { up: 0, right: 90, down: 180, left: 270 }[m.from]; return <svg className="pp-model pp-turn" viewBox="0 0 220 160" role="img" aria-label={`Start arrow points ${m.from}; follow the clockwise arc to the end arrow`}><defs><marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="currentColor" /></marker></defs>{line([90, 80], point(90, 80, 60, start), "start", { strokeWidth: 2, markerEnd: `url(#${id})` })}{line([90, 80], point(90, 80, 60, start + m.degrees), "end", { strokeWidth: 2, markerEnd: `url(#${id})` })}<path d={`M${point(90, 80, 35, start).join(" ")} A35 35 0 ${m.degrees > 180 ? 1 : 0} 1 ${point(90, 80, 35, start + m.degrees).join(" ")}`} markerEnd={`url(#${id})`} /><text x="163" y="50">clockwise</text></svg>; }
  if (m.type === "array") return <svg className="pp-model pp-array" viewBox={`0 0 ${m.columns * 20 + 10} ${m.rows * 20 + 10}`} role="img" aria-label={`${m.rows} rows with ${m.columns} counters in each row`}>{Array.from({ length: m.rows * m.columns }, (_, i) => <circle key={i} cx={15 + i % m.columns * 20} cy={15 + Math.floor(i / m.columns) * 20} r="5" />)}</svg>;
  if (m.type === "perimeter") { const width = m.shape === "square" ? 100 : 160; return <svg className="pp-model pp-perimeter" viewBox="0 0 300 155" role="img" aria-label="Shape with side lengths marked; not drawn to scale"><rect x="65" y="30" width={width} height="90" />{m.sides.map((s, i) => <text key={i} x={[65 + width / 2, 65 + width + 25, 65 + width / 2, 35][i]} y={[18, 80, 147, 80][i]} textAnchor="middle">{s.length} {s.unit}</text>)}</svg>; }
  return null;
}
