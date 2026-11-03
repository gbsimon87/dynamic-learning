/* eslint-disable react-refresh/only-export-components -- a small drawing kit: components and their helpers live together */
import "./pictures.css";

// Small drawing pieces shared by the Year 5 Science, French, Computing and Wellbeing figures.
// Pure: props in, SVG out. Every figure is a <figure> with a role="img" SVG whose aria-label
// is the full text equivalent, and a short figcaption.

export const W = 400;
export const H = 240;

export function Fig({ label, caption, children, name = "", height = H }) {
  return <figure className={`y5v-figure ${name}`}>
    <svg viewBox={`0 0 ${W} ${height}`} role="img" aria-label={label}>{children}</svg>
    {caption && <figcaption>{caption}</figcaption>}
  </figure>;
}

/** The root every subject's component wraps its figure in: it defines the colour variables. */
export function Root({ name, children }) {
  return <div className={`y5v ${name}`}>{children}</div>;
}

export const Emoji = ({ e, x, y, size = 48 }) => <text className="y5v-emoji" x={x} y={y} style={{ fontSize: size }} textAnchor="middle" dominantBaseline="central" aria-hidden="true">{e}</text>;

/** Break `text` into lines of at most `max` characters. */
export function wrap(text, max = 24) {
  const lines = [];
  let line = "";
  // A long hyphenated word (quatre-vingt-quinze) may break after a hyphen.
  const words = String(text).split(" ").flatMap((word) => (word.length > max ? word.split(/(?<=-)/) : [word]));
  for (const word of words) {
    const joiner = line.endsWith("-") ? "" : " ";
    if (line && (line + joiner + word).length > max) { lines.push(line); line = word; } else line = line ? `${line}${joiner}${word}` : word;
  }
  if (line) lines.push(line);
  return lines;
}

export function Lines({ x, y, lines, anchor = "middle", gap = 24, className }) {
  return <text x={x} y={y - ((lines.length - 1) * gap) / 2} textAnchor={anchor} dominantBaseline="central" className={className}>
    {lines.map((l, i) => <tspan key={i} x={x} dy={i === 0 ? 0 : gap}>{l}</tspan>)}
  </text>;
}

/** Arrow from (x1,y1) to (x2,y2) with a filled head. */
export function Arrow({ x1, y1, x2, y2, head = 11, className = "y5v-arrow" }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const bx = x2 - Math.cos(a) * head * 0.6;
  const by = y2 - Math.sin(a) * head * 0.6;
  const p = [[x2, y2], [x2 - head * Math.cos(a - 0.45), y2 - head * Math.sin(a - 0.45)], [x2 - head * Math.cos(a + 0.45), y2 - head * Math.sin(a + 0.45)]];
  return <g><line className={className} x1={x1} y1={y1} x2={bx} y2={by} /><polygon className="y5v-arrow-head" points={p.map((q) => q.join(",")).join(" ")} /></g>;
}

const STARS = [[30, 30], [90, 60], [150, 22], [230, 48], [300, 26], [360, 66], [60, 120], [340, 130], [270, 96], [120, 100]];

/** A painted backdrop. `kind` picks one; every colour is a token. */
export function Backdrop({ kind = "meadow" }) {
  switch (kind) {
    case "night": case "space":
      return <g><rect className="y5v-night" width={W} height={H} />{STARS.map(([x, y]) => <circle key={x} className="y5v-star" cx={x} cy={y} r="3" />)}</g>;
    case "sky":
      return <g><rect className="y5v-sky" width={W} height={H} /><ellipse className="y5v-cloud" cx="90" cy="50" rx="46" ry="20" /><ellipse className="y5v-cloud" cx="310" cy="80" rx="52" ry="20" /></g>;
    case "pond":
      return <g><rect className="y5v-sky" width={W} height={H} /><circle className="y5v-sun" cx="350" cy="42" r="22" /><path className="y5v-grass" d="M0 150 Q100 130 200 150 T400 146 V240 H0Z" /><ellipse className="y5v-water" cx="200" cy="200" rx="150" ry="30" /></g>;
    case "room":
      return <g><rect className="y5v-room-wall" width={W} height={H} /><rect className="y5v-floor" y="170" width={W} height="70" /></g>;
    case "street":
      return <g><rect className="y5v-sky" width={W} height={H} />
        <rect className="y5v-house" x="20" y="70" width="90" height="80" /><path className="y5v-roof" d="M10 72 L65 34 L120 72Z" /><rect className="y5v-door" x="55" y="112" width="20" height="38" /><rect className="y5v-window" x="28" y="90" width="18" height="18" /><rect className="y5v-window" x="84" y="90" width="18" height="18" />
        <rect className="y5v-house" x="290" y="50" width="90" height="100" /><path className="y5v-roof-2" d="M280 52 L335 14 L390 52Z" /><rect className="y5v-door" x="325" y="112" width="20" height="38" /><rect className="y5v-window" x="298" y="72" width="18" height="18" /><rect className="y5v-window" x="354" y="72" width="18" height="18" />
        <rect className="y5v-road" y="150" width={W} height="90" /><line className="y5v-road-line" x1="0" y1="195" x2={W} y2="195" /></g>;
    case "lab":
      return <g><rect className="y5v-paper" width={W} height={H} /><rect className="y5v-bench" x="0" y="176" width={W} height="64" /></g>;
    case "plain":
      return <rect className="y5v-paper" width={W} height={H} />;
    default:
      return <g><rect className="y5v-sky" width={W} height={H} /><circle className="y5v-sun" cx="352" cy="40" r="22" /><ellipse className="y5v-cloud" cx="90" cy="46" rx="44" ry="18" /><path className="y5v-hill" d="M0 160 Q90 110 190 150 T400 140 V240 H0Z" /><path className="y5v-grass" d="M0 180 Q120 156 240 178 T400 172 V240 H0Z" /></g>;
  }
}

/** A speech bubble. `at` is its centre; `tail` is "l", "r", "bl" or "br". */
export function Bubble({ x, y, text, tail = "bl", max = 22, w, className = "y5v-bubble" }) {
  const lines = wrap(text, max);
  const width = w ?? Math.min(340, Math.max(60, Math.max(...lines.map((l) => l.length)) * 10.4 + 28));
  const height = lines.length * 24 + 18;
  const left = x - width / 2;
  const top = y - height / 2;
  const tx = tail.endsWith("r") ? x + width / 2 - 30 : x - width / 2 + 30;
  return <g>
    <rect className={className} x={left} y={top} width={width} height={height} rx="16" />
    {tail !== "none" && <path className={className} d={`M${tx - 10} ${top + height - 1} L${tx + (tail.endsWith("r") ? 12 : -12)} ${top + height + 18} L${tx + 10} ${top + height - 1}`} />}
    {tail !== "none" && <line stroke="var(--v-paper)" strokeWidth="5" x1={tx - 8} y1={top + height} x2={tx + 8} y2={top + height} />}
    <Lines x={x} y={y} lines={lines} />
  </g>;
}

/**
 * A painted scene: a backdrop, emoji pictures and optional speech bubbles.
 *   items    [emoji, x, y, size, label?]
 *   bubbles  [{ x, y, text, tail }]
 *   arrows   [x1, y1, x2, y2]
 *   banner   true draws a tricolore strip along the top (French)
 */
export function Scene({ backdrop = "meadow", items = [], bubbles = [], arrows = [], banner = false, alt, caption, name = "" }) {
  return <Fig label={alt} caption={caption === undefined ? alt : caption} name={name}>
    <Backdrop kind={backdrop} />
    {banner && <g><rect x="0" y="0" width="133" height="14" fill="var(--v-roof-2)" /><rect x="133" y="0" width="134" height="14" fill="var(--v-paper)" /><rect x="267" y="0" width="133" height="14" fill="var(--v-roof)" /></g>}
    {items.map(([e, x, y, size = 56, label], i) => <g key={i}>
      <Emoji e={e} x={x} y={y} size={size} />
      {label && <text className="y5v-small" x={x} y={y + size * 0.62 + 12} textAnchor="middle">{label}</text>}
    </g>)}
    {arrows.map(([x1, y1, x2, y2], i) => <Arrow key={i} x1={x1} y1={y1} x2={x2} y2={y2} head={16} />)}
    {bubbles.map((b, i) => <Bubble key={i} {...b} />)}
  </Fig>;
}

/**
 * A row of counting pictures: `total` icons, the first `marked` ticked (so the count never
 * depends on colour). Used for data in a word problem.
 */
export function Counters({ icon, total, marked = 0, markIcon, label, alt, caption, perRow = 10, size }) {
  const rows = Math.ceil(total / perRow);
  const cols = Math.min(total, perRow);
  const s = size ?? Math.min(52, Math.floor(360 / cols) - 12);
  const gapX = Math.min(s + 14, 360 / cols);
  const startX = (W - gapX * (cols - 1)) / 2;
  const gapY = s + 14;
  const startY = H / 2 - ((rows - 1) * gapY) / 2 - 8;
  return <Fig label={alt} caption={caption ?? label}>
    <rect className="y5v-paper" width={W} height={H} />
    {Array.from({ length: total }, (_, i) => {
      const x = startX + (i % perRow) * gapX;
      const y = startY + Math.floor(i / perRow) * gapY;
      const on = i < marked;
      return <g key={i}>
        {on && <circle className="y5v-mark-ring" cx={x} cy={y} r={s * 0.5} />}
        <Emoji e={on && markIcon ? markIcon : icon} x={x} y={y} size={s} />
        {on && <path className="y5v-tick" d={`M${x - 6} ${y + s * 0.55 + 4} l5 6 l9 -12`} />}
      </g>;
    })}
  </Fig>;
}

/** A simple scale with a label at each end, for "least … most" questions. */
export function Scale({ low, high, label, alt, caption }) {
  return <Fig label={alt} caption={caption ?? label}>
    <rect className="y5v-paper" width={W} height={H} />
    <Arrow x1="50" y1="110" x2="350" y2="110" head={16} />
    {[0, 1, 2, 3, 4].map((i) => <line key={i} className="y5v-ink" x1={60 + i * 70} y1="98" x2={60 + i * 70} y2="122" />)}
    <Lines x="100" y="160" lines={wrap(low, 14)} />
    <Lines x="300" y="160" lines={wrap(high, 14)} />
    <text x="200" y="64" textAnchor="middle">{label}</text>
  </Fig>;
}
