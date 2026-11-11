import { useId } from "react";
export default function PracticeDataModel({ model: m }) {
  const hatchId = useId();
  if (m.type === "data-table") return <div className="pp-model pp-data-table"><table><caption>{m.caption}</caption><thead><tr><th scope="col">Category</th>{m.columns.map((c) => <th scope="col" key={c.key}>{c.label}</th>)}</tr></thead><tbody>{m.rows.map((row, i) => <tr key={i}><th scope="row">{row.label}</th>{m.columns.map((c) => <td key={c.key}>{row.cells[c.key]}</td>)}</tr>)}</tbody></table></div>;
  if (m.type === "pictogram") return <div className="pp-model pp-data-table"><p><strong>{m.caption}</strong> · Key: ○ = {m.ratio}</p><table><tbody>{m.rows.map((row) => <tr key={row.label}><th scope="row">{row.label}</th><td className="pp-symbols" aria-label={`${row.value / m.ratio} circles`}>{Array.from({ length: row.value / m.ratio }, () => "○").join(" ")}</td></tr>)}</tbody></table></div>;
  if (m.type === "bar-chart") {
    const max = m.max ?? Math.max(...m.rows.map((r) => r.value));
    const step = m.step || max / 6;
    const tickCount = Math.ceil(max / step);
    return <svg className="pp-model pp-bar-chart" viewBox={`0 0 440 ${m.rows.length * 42 + 65}`} role="img" aria-label={`${m.caption}; horizontal bar chart with equally spaced scale marks of ${step}`}>
      <text x="140" y="15">{m.caption}</text>
      {Array.from({ length: tickCount + 1 }, (_, i) => <g key={i}><line x1={140 + i * step / max * 280} x2={140 + i * step / max * 280} y1="25" y2={m.rows.length * 42 + 25} stroke="#aaa" strokeWidth=".6" /><text x={140 + i * step / max * 280} y={m.rows.length * 42 + 45} textAnchor="middle">{i * step}</text></g>)}
      {m.rows.map((row, i) => <g key={row.label}><text x="130" y={i * 42 + 49} textAnchor="end">{row.label}</text><rect x="140" y={i * 42 + 30} width={row.value / max * 280} height="26" fill={`url(#${hatchId})`} stroke="currentColor" /></g>)}
      <defs><pattern id={hatchId} width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 6 6 0" stroke="currentColor" strokeWidth=".6" /></pattern></defs>
    </svg>;
  }
  if (m.type === "fraction-bars") return <svg className="pp-model pp-fraction-bars" viewBox={`0 0 380 ${m.bars.length * 47}`} role="img" aria-label={m.bars.map((b, i) => `Bar ${String.fromCharCode(65 + i)}: ${b.parts} equal parts, ${b.shaded} shaded`).join("; ")}>
    <defs><pattern id={hatchId} width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 6 6 0" stroke="currentColor" /></pattern></defs>
    {m.bars.map((bar, row) => <g key={row}><text x="4" y={row * 47 + 25}>{String.fromCharCode(65 + row)}</text>{Array.from({ length: bar.parts }, (_, i) => <rect key={i} x={30 + i * 330 / bar.parts} y={row * 47 + 4} width={330 / bar.parts} height="30" fill={i < bar.shaded ? `url(#${hatchId})` : "none"} stroke="currentColor" />)}</g>)}
  </svg>;
  if (m.type === "reading") return <div className="pp-reading-evidence"><p className="pp-evidence-title">{m.title ?? "Read before answering"}</p>{m.lines.map((line, n) => <p key={n}>{Array.isArray(line) ? line.join(" ") : line}</p>)}{m.table && <PracticeDataModel model={{ type: "data-table", ...m.table }} />}</div>;
  return null;
}
