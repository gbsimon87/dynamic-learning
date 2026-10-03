import ShadowFigure from "./ShadowFigure";
import "./science-kit.css";

/** Controlled discrete geometry; callbacks never alter a measurement themselves. */
export default function ShadowExplorer({ stages, index, available, onPosition, disabled }) {
  if (!Number.isInteger(index) || !stages[index] || !available.includes(index)) return <p role="status">No shadow observation is available yet.</p>;
  return <section className="science-sequence" aria-label="Fixed-screen shadow explorer"><p><strong>{stages[index].label}</strong></p>
    <ShadowFigure observation={stages[index]} measurement />
    <div className="science-sequence-controls" role="group" aria-label="Object or source positions">{stages.map((s, i) => <button key={s.id} type="button" disabled={disabled || !available.includes(i)} aria-pressed={i === index} onClick={() => { if (!disabled && available.includes(i)) onPosition(i); }}>{s.label}</button>)}</div>
  </section>;
}
