import DataTable from "./DataTable";
import "./science-kit.css";

/** Discrete authored observations, controlled by the investigation state.
 * Previously seen stages remain accessible; no live timer or experiment save. */
export default function ObservationSequence({ stages, index, seen, onView, onNext, disabled, renderObservation = null, label = "Plant growth observations", nextLabel = "Observe next stage" }) {
  const current = stages[index];
  if (!current || !seen.includes(index)) return <p role="status">No observation is available yet.</p>;
  return <section className="science-sequence" aria-label={label}>
    <p><strong>{current.label}</strong></p>
    {renderObservation ? renderObservation(current) : <>
    <DataTable caption="Plant height (cm)" columns={[{ key: "height", label: "Height (cm)" }]} rows={["A", "B"].map((id) => ({ label: `Plant ${id}`, cells: { height: current.heights[id] } }))} />
    <div className="science-sequence-pictures" aria-hidden="true">
      {["A", "B"].map((id) => <div key={id}>
        <span>{id}</span>
        <svg viewBox="0 0 100 130"><path className="science-soil" d="M15 110H85V125H15Z" /><path className="science-stem" d={`M50 110V${110 - current.heights[id] * 7}`} /><path className="science-leaf" d={`M50 ${112 - current.heights[id] * 7}q-27 -24 -22 0q6 11 22 0q25 -24 22 0q-6 11 -22 0`} /></svg>
      </div>)}
    </div>
    </>}
    <div className="science-sequence-controls" role="group" aria-label="Observation stages">
      {seen.map((stageIndex) => <button key={stages[stageIndex].id} type="button" disabled={disabled} aria-pressed={stageIndex === index} onClick={() => { if (!disabled) onView(stageIndex); }}>{stages[stageIndex].label}</button>)}
      {onNext && index === seen.at(-1) && index < stages.length - 1 && <button type="button" disabled={disabled} onClick={() => { if (!disabled) onNext(); }}>{nextLabel}</button>}
    </div>
  </section>;
}
