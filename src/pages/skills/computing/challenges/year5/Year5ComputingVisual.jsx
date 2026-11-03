import { VISUAL_TYPES } from "../../../../../data/challenges/year5Computing/visualTypes.js";
import { Fig, Root, Scene, Counters, Emoji, Arrow, Lines, wrap } from "../../../year5Pictures/Pictures";
import "./Year5ComputingVisual.css";

// The figure types are also exported here so a frame can read them next to the component.
// eslint-disable-next-line react-refresh/only-export-components
export { VISUAL_TYPES };

// ---- Blocks: a program as Scratch-like command blocks --------------------------------
// Colour is never the only cue: every block has its words and a small picture glyph.
const KIND = [
  [/^(repeat|for each|forever|while)\b/, "loop", "🔁"],
  [/^(if|else)\b/, "choice", "❓"],
  [/^(set|add|subtract|take|change)\b/, "data", "📦"],
  [/^(say|show|print)\b/, "say", "💬"],
  [/^(forward|turn|move|go|step)\b/, "move", "➡️"],
  [/^(ask|input|wait)\b/, "input", "⌨️"],
];
function kindOf(text) {
  const t = text.trim();
  for (const [re, kind, glyph] of KIND) if (re.test(t)) return { kind, glyph };
  return { kind: "other", glyph: "⚙️" };
}
const CHAR = 11.6; // width of one monospace character at the 19px block text size
function Blocks({ lines = [], alt, caption }) {
  // Each line becomes a block; a long line wraps inside its block rather than shrinking.
  const rows = lines.map((line) => {
    const depth = Math.floor((line.length - line.trimStart().length) / 2);
    const width = 368 - depth * 24;
    const cap = Math.max(10, Math.floor((width - 46) / CHAR));
    return { text: line.trim(), depth, width, parts: wrap(line.trim(), cap), ...kindOf(line) };
  });
  let y = 10;
  const placed = rows.map((row) => { const h = row.parts.length * 24 + 12; const at = y; y += h + 4; return { ...row, y: at, h }; });
  const height = Math.max(120, y + 8);
  return <Fig label={alt} caption={caption} height={height}>
    <rect className="y5v-paper" width="400" height={height} />
    {placed.map((row, i) => {
      const x = 16 + row.depth * 24;
      return <g key={i}>
        {row.depth > 0 && <rect className="y5v-bar" x={x - 12} y={row.y - 3} width="10" height={row.h + 6} />}
        <rect className={`y5v-block y5v-block-${row.kind}`} x={x} y={row.y} width={row.width} height={row.h} rx="9" />
        <Emoji e={row.glyph} x={x + 18} y={row.y + row.h / 2 + 1} size="18" />
        <text className="y5v-block-text" x={x + 36} y={row.y + 25} style={{ fontSize: 19 }}>
          {row.parts.map((part, k) => <tspan key={k} x={x + 36} dy={k === 0 ? 0 : 24}>{part}</tspan>)}
        </text>
      </g>;
    })}
  </Fig>;
}

// ---- Robot grid -----------------------------------------------------------------------
function RobotGrid({ alt, caption }) {
  const cell = 38;
  const x0 = 54;
  const y0 = 204;
  return <Fig label={alt} caption={caption}>
    <rect className="y5v-paper" width="400" height="240" />
    {Array.from({ length: 5 }, (_, r) => Array.from({ length: 5 }, (_, c) => <rect key={`${r}${c}`} className="y5v-cell" x={x0 + c * cell} y={y0 - (r + 1) * cell} width={cell} height={cell} />))}
    {[0, 1, 2, 3, 4].map((n) => <g key={n}>
      <text className="y5v-small" x={x0 + n * cell + cell / 2} y={y0 + 18} textAnchor="middle">{n}</text>
      <text className="y5v-small" x={x0 - 14} y={y0 - n * cell - cell / 2 + 1} textAnchor="middle" dominantBaseline="central">{n}</text>
    </g>)}
    <rect className="y5v-cell-start" x={x0} y={y0 - cell} width={cell} height={cell} />
    <Emoji e="🤖" x={x0 + cell / 2} y={y0 - cell / 2 + 3} size="28" />
    <Arrow x1={x0 + cell / 2} y1={y0 - cell + 8} x2={x0 + cell / 2} y2={y0 - cell - 14} head={12} />
    <Arrow x1="262" y1="212" x2="300" y2="212" head={12} />
    <Arrow x1="340" y1="176" x2="340" y2="140" head={12} />
    <Lines x="340" y="226" lines={["x: east"]} />
    <Lines x="340" y="130" lines={["y: north"]} />
    <Lines x="340" y="52" lines={["Start", "(0, 0)", "facing", "north"]} gap={24} />
  </Fig>;
}

// ---- Flowcharts -----------------------------------------------------------------------
function Flowchart({ mode = "ifelse", condition, yes, no, boxes = [], alt, caption }) {
  if (mode === "row") {
    const n = boxes.length;
    const w = Math.min(110, (380 - (n - 1) * 26) / n);
    const start = 200 - ((n * w + (n - 1) * 26) / 2);
    return <Fig label={alt} caption={caption}>
      <rect className="y5v-paper" width="400" height="240" />
      {boxes.map((b, i) => <g key={b}>
        <rect className={i === 1 ? "y5v-card-hi" : "y5v-card"} x={start + i * (w + 26)} y="82" width={w} height="76" rx="14" />
        <Lines x={start + i * (w + 26) + w / 2} y="120" lines={wrap(b, Math.max(6, Math.floor(w / 10)))} />
        {i > 0 && <Arrow x1={start + i * (w + 26) - 24} y1="120" x2={start + i * (w + 26) - 3} y2="120" head={13} />}
      </g>)}
    </Fig>;
  }
  return <Fig label={alt} caption={caption}>
    <rect className="y5v-paper" width="400" height="240" />
    <polygon className="y5v-card-hi" points="200,16 340,68 200,120 60,68" />
    <Lines x="200" y="68" lines={wrap(`${condition} ?`, 14)} gap={21} />
    <Arrow x1="96" y1="86" x2="70" y2="150" head={13} />
    <Arrow x1="304" y1="86" x2="330" y2="150" head={13} />
    <text x="68" y="124" textAnchor="middle">Yes</text>
    <text x="332" y="124" textAnchor="middle">No</text>
    <rect className="y5v-card" x="14" y="154" width="150" height="66" rx="14" />
    <Lines x="89" y="187" lines={wrap(yes, 13)} gap={22} />
    <rect className="y5v-card" x="236" y="154" width="150" height="66" rx="14" />
    <Lines x="311" y="187" lines={wrap(no, 13)} gap={22} />
  </Fig>;
}

// ---- Network --------------------------------------------------------------------------
function Network({ ask = true, alt, caption }) {
  return <Fig label={alt} caption={caption}>
    <rect className="y5v-paper" width="400" height="240" />
    <rect className="y5v-zone" x="8" y="30" width="170" height="190" rx="18" />
    <text className="y5v-small" x="93" y="22" textAnchor="middle">School network</text>
    {[62, 120, 178].map((y) => <g key={y}><line className="y5v-ink" x1="62" y1={y} x2="122" y2="120" /><Emoji e="💻" x="44" y={y} size="34" /></g>)}
    <rect className="y5v-card" x="106" y="104" width="44" height="32" rx="8" />
    {[116, 128, 140].map((x) => <rect key={x} className="y5v-fill-ink" x={x - 3} y="124" width="6" height="8" />)}
    <line className="y5v-ink" x1="150" y1="120" x2="208" y2="120" />
    <rect className={ask ? "y5v-card-ask" : "y5v-card"} x="208" y="94" width="52" height="52" rx="12" />
    {ask && <text x="234" y="122" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 32 }}>?</text>}
    <line className="y5v-ink" x1="260" y1="120" x2="290" y2="120" />
    <Emoji e="☁️" x="334" y="116" size="78" />
    <text x="334" y="176" textAnchor="middle">Internet</text>
  </Fig>;
}

// ---- Switch with ports ----------------------------------------------------------------
function Ports({ total = 16, used = 0, alt, caption }) {
  const perRow = Math.ceil(total / 2);
  const gap = Math.min(40, 340 / perRow);
  const start = 200 - (gap * (perRow - 1)) / 2;
  return <Fig label={alt} caption={caption}>
    <rect className="y5v-paper" width="400" height="240" />
    <rect className="y5v-card" x="14" y="50" width="372" height="96" rx="14" />
    {Array.from({ length: total }, (_, i) => {
      const x = start + (i % perRow) * gap;
      const y = i < perRow ? 78 : 118;
      const on = i < used;
      return <g key={i}>
        <rect className={on ? "y5v-port-on" : "y5v-port"} x={x - 12} y={y - 12} width="24" height="24" rx="4" />
        {on && <path className="y5v-tick" d={`M${x - 6} ${y} l5 6 l8 -12`} />}
      </g>;
    })}
    <text x="200" y="38" textAnchor="middle">Switch with {total} ports</text>
    <text x="200" y="190" textAnchor="middle">{used} ports have a cable plugged in</text>
    <text className="y5v-small" x="200" y="218" textAnchor="middle">A tick shows a cable in a port.</text>
  </Fig>;
}

// ---- Search results -------------------------------------------------------------------
function SearchResults({ query = "", results = [], pager, note, alt, caption }) {
  const rows = results.slice(0, 3);
  const rowH = 52;
  const height = 74 + Math.max(rows.length, note ? 1 : 0) * rowH + (pager ? 44 : 14);
  return <Fig label={alt} caption={caption} height={height}>
    <rect className="y5v-paper" width="400" height={height} />
    <rect className="y5v-card" x="12" y="10" width="376" height="42" rx="21" />
    <Emoji e="🔍" x="38" y="32" size="20" />
    <text x="62" y="32" dominantBaseline="central" style={{ fontSize: 19 }}>{query}</text>
    {rows.map((r, i) => <g key={i}>
      <text className="y5v-link" x="20" y={78 + i * rowH + 12} style={{ fontSize: 19 }}>{r.title}</text>
      {r.tag && <g><rect className="y5v-card-hi" x="300" y={78 + i * rowH - 6} width="88" height="24" rx="12" /><text className="y5v-small" x="344" y={78 + i * rowH + 7} textAnchor="middle" dominantBaseline="central">{r.tag}</text></g>}
      {r.snippet && <text className="y5v-small y5v-snippet" x="20" y={78 + i * rowH + 34}>{r.snippet}</text>}
    </g>)}
    {note && <text className="y5v-small" x="20" y={78 + 12} style={{ fontSize: 19 }}>{note}</text>}
    {pager && <g>{[1, 2, 3, 4, 5].map((n, i) => <g key={n}><circle className={n === 1 ? "y5v-dot" : "y5v-dot-ring"} cx={120 + i * 40} cy={height - 26} r="14" /><text className={n === 1 ? "y5v-on-ink" : ""} x={120 + i * 40} y={height - 25} textAnchor="middle" dominantBaseline="central" style={{ fontSize: 19 }}>{n}</text></g>)}</g>}
  </Fig>;
}

// ---- Packets --------------------------------------------------------------------------
function Packets({ mode = "size", file, packet, order = [], alt, caption }) {
  if (mode === "order") {
    const n = order.length;
    const gap = Math.min(80, 340 / n);
    const start = 200 - (gap * (n - 1)) / 2;
    return <Fig label={alt} caption={caption}>
      <rect className="y5v-paper" width="400" height="240" />
      <text x="200" y="34" textAnchor="middle">Packets in the order they arrived</text>
      {order.map((num, i) => <g key={i}><rect className="y5v-card-hi" x={start + i * gap - 28} y="70" width="56" height="64" rx="10" /><text x={start + i * gap} y="102" textAnchor="middle" dominantBaseline="central" style={{ fontSize: 26 }}>{num}</text></g>)}
      <Arrow x1="60" y1="176" x2="340" y2="176" head={14} />
      <text className="y5v-small" x="200" y="214" textAnchor="middle">first to arrive → last to arrive</text>
    </Fig>;
  }
  return <Fig label={alt} caption={caption}>
    <rect className="y5v-paper" width="400" height="240" />
    <rect className="y5v-card-hi" x="20" y="40" width="360" height="56" rx="12" />
    <text x="200" y="68" textAnchor="middle" dominantBaseline="central">Whole file: {file} KB</text>
    <rect className="y5v-card" x="140" y="136" width="120" height="48" rx="10" />
    <text x="200" y="160" textAnchor="middle" dominantBaseline="central">1 packet</text>
    <text x="200" y="212" textAnchor="middle">holds {packet} KB</text>
  </Fig>;
}

const FIGURES = {
  blocks: (v) => <Blocks {...v} />,
  robotGrid: (v) => <RobotGrid {...v} />,
  flowchart: (v) => <Flowchart {...v} />,
  network: (v) => <Network {...v} />,
  ports: (v) => <Ports {...v} />,
  searchResults: (v) => <SearchResults {...v} />,
  packets: (v) => <Packets {...v} />,
  scene: (v) => <Scene {...v} />,
  counters: (v) => <Counters {...v} />,
};

/**
 * The picture for a Year 5 Computing question: `question.visual` is `{ type, ...params }`.
 * Blocks and grids are drawn from the question's own numbers and lines, never from its answer.
 * Returns null when there is nothing to draw.
 */
export default function Year5ComputingVisual({ question }) {
  const v = question?.visual;
  if (!v || !Object.hasOwn(FIGURES, v.type)) return null;
  return <Root name="y5-comp-visual">{FIGURES[v.type](v)}</Root>;
}
