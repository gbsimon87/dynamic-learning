import FractionBar from "../challenge/FractionBar.jsx";
import ScrollableTable from "../ui/ScrollableTable.jsx";
import LessonExample from "../challenge/lesson/LessonExample.jsx";
import "../challenge/lesson/lesson.css";
import { validateJourneyModel } from "../../../shared/curriculumJourneyModels.js";

/**
 * Draws one validated public model (shared/curriculumJourneyModels.js). It only
 * ever receives an item's public givens; scoring/review data never reach here.
 * `lesson` reuses the LessonFrame worked-example shapes children already know.
 */
export default function JourneyModel({ model }) {
  if (!model) return null;
  try { validateJourneyModel(model); } catch { return <p className="cj-error" role="alert">This learning picture could not load.</p>; }
  const d = model.data;
  if (model.renderer === "lesson") {
    return <div className="lesson-rounds cj-lesson-model" role="group" aria-label={model.alt}>
      <LessonExample example={d} />
      <p className="sr-only">{model.alt}</p>
    </div>;
  }
  return <figure className="cj-model">
    {model.renderer === "groups" && <div className="cj-groups" role="img" aria-label={model.alt}>{d.groups.map((g, i) => <div className="cj-group" key={i}>{g.map((s, n) => <span key={n}>{s}</span>)}</div>)}</div>}
    {model.renderer === "fraction-bars" && d.bars.map((b, i) => <FractionBar key={i} parts={Array.from({ length: b.parts }, (_, n) => b.shaded.includes(n))} label={b.label ?? model.alt} />)}
    {model.renderer === "number-line" && <ol className="cj-number-line">{d.terms.map((s, i) => <li key={i}>{s}</li>)}</ol>}
    {model.renderer === "table" && <ScrollableTable><table className="cj-table">{d.caption && <caption>{d.caption}</caption>}<thead><tr>{d.headings.map((s, i) => <th key={i} scope="col">{s}</th>)}</tr></thead><tbody>{d.rows.map((r, i) => <tr key={i}>{r.map((s, j) => <td key={j}>{s}</td>)}</tr>)}</tbody></table></ScrollableTable>}
    {model.renderer === "text" && <div className="cj-text-card">{d.title && <strong>{d.title}</strong>}{d.lines.map((s, i) => <p key={i}>{s}</p>)}</div>}
    {model.renderer === "timeline" && <ol className="cj-timeline">{d.events.map((e, i) => <li key={i}><strong>{e.date}</strong><span>{e.label}</span></li>)}</ol>}
    {model.renderer === "clock" && <Clock {...d} />}
    {model.renderer === "bar-chart" && <BarChart {...d} />}
    {model.renderer === "pictures" && <>
      {d.title && <p className="cj-pictures-title">{d.title}</p>}
      <ul className="cj-pictures">{d.items.map((item, i) => <li key={i}><span className="cj-picture-icon" aria-hidden="true">{item.icon}</span><span>{item.label}</span></li>)}</ul>
    </>}
    <figcaption className={model.renderer === "groups" ? "sr-only" : "cj-model-caption"}>{model.alt}</figcaption>
  </figure>;
}

function Clock({ hour, minute }) {
  const angle = (deg) => (deg - 90) * Math.PI / 180;
  const hand = (deg, length) => `M100,100L${100 + length * Math.cos(angle(deg))},${100 + length * Math.sin(angle(deg))}`;
  return <svg className="cj-clock" viewBox="0 0 200 200" aria-hidden="true">
    <circle cx="100" cy="100" r="92" className="cj-clock-face" />
    {Array.from({ length: 60 }, (_, i) => <path key={i} className="cj-clock-tick" strokeWidth={i % 5 ? 1 : 3}
      d={`M${100 + 86 * Math.cos(angle(i * 6))},${100 + 86 * Math.sin(angle(i * 6))}L${100 + (i % 5 ? 81 : 76) * Math.cos(angle(i * 6))},${100 + (i % 5 ? 81 : 76) * Math.sin(angle(i * 6))}`} />)}
    {Array.from({ length: 12 }, (_, i) => <text key={i} x={100 + 62 * Math.cos(angle((i + 1) * 30))} y={107 + 62 * Math.sin(angle((i + 1) * 30))}>{i + 1}</text>)}
    <path className="cj-clock-hour" d={hand((hour % 12) * 30 + minute / 2, 44)} />
    <path className="cj-clock-minute" d={hand(minute * 6, 70)} />
    <circle cx="100" cy="100" r="5" className="cj-clock-pin" />
  </svg>;
}

function BarChart({ title, unit, step, bars }) {
  const top = Math.max(step, Math.ceil(Math.max(...bars.map((b) => b.value)) / step) * step);
  const lines = top / step;
  const width = 300, height = 180, left = 40, base = 160, plot = 140;
  const slot = (width - left - 10) / bars.length;
  return <figure className="cj-bar-chart">
    {title && <p className="cj-pictures-title">{title}</p>}
    <svg viewBox={`0 0 ${width} ${height + 30}`} aria-hidden="true">
      {Array.from({ length: lines + 1 }, (_, i) => <g key={i}>
        <path className="cj-chart-grid" d={`M${left},${base - (i * plot) / lines}H${width - 10}`} />
        <text className="cj-chart-scale" x={left - 6} y={base - (i * plot) / lines + 4}>{i * step}</text>
      </g>)}
      {bars.map((bar, i) => <g key={i}>
        <rect className="cj-chart-bar" x={left + i * slot + slot * 0.2} width={slot * 0.6} y={base - (bar.value / top) * plot} height={(bar.value / top) * plot} />
        <text className="cj-chart-label" x={left + i * slot + slot / 2} y={base + 18}>{bar.label}</text>
      </g>)}
      {unit && <text className="cj-chart-label" x={left} y={height + 22} textAnchor="start">{unit}</text>}
    </svg>
  </figure>;
}
