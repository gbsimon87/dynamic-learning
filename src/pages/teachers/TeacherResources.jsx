import { useMemo, useState } from "react";
import { LEARNING_NEEDS, searchLearningNeeds, resourceFit } from "../../data/teacherResourceCatalogue";
import { getResourceExample } from "../../data/teacherResourceExamples";
import { shapeParts } from "../../data/freePlay/fractionShapes";

function ExampleModel({ model }) {
  if (!model) return null;
  if (model.type === "shape") {
    const { width, height, paths } = shapeParts(model.shape, model.parts);
    return <svg className="tp-example-model tp-shape-model" viewBox={`-3 -3 ${width + 6} ${height + 6}`} role="img" aria-label={`A ${model.shape} with ${model.shaded.length} of ${model.parts} equal parts shaded`}>
      {paths.map((path, index) => <path key={index} d={path} className={model.shaded.includes(index) ? "tp-shaded" : ""} />)}
    </svg>;
  }
  if (model.type === "bars") return <svg className="tp-example-model" viewBox={`0 0 340 ${model.bars.length * 70}`} role="img" aria-label={model.bars.map((bar) => `${bar.shaded} of ${bar.parts} parts shaded`).join("; ")}>
    {model.bars.map((bar, row) => <g key={row}>
      <text x="5" y={row * 70 + 16}>{bar.label ?? "Count the equal parts"}</text>
      {Array.from({ length: bar.parts }, (_, index) => <rect key={index} x={5 + index * 330 / bar.parts} y={row * 70 + 26} width={330 / bar.parts} height="32" className={index < bar.shaded ? "tp-shaded" : ""} />)}
    </g>)}
  </svg>;
  if (model.type === "line") {
    const last = model.denominator * model.wholes;
    return <svg className="tp-example-model" viewBox="0 0 340 75" role="img" aria-label={`Number line from 0 to ${model.wholes}, with ${model.denominator} equal intervals per whole`}>
      <line x1="12" y1="30" x2="328" y2="30" />
      {Array.from({ length: last + 1 }, (_, n) => <g key={n}><line x1={12 + 316 * n / last} x2={12 + 316 * n / last} y1="20" y2="40" />{n % model.denominator === 0 && <text x={12 + 316 * n / last} y="62" textAnchor="middle">{n / model.denominator}</text>}</g>)}
    </svg>;
  }
  if (model.type === "set") {
    const perRow = model.groupSize || 5;
    return <svg className="tp-example-model" viewBox={`0 0 340 ${Math.ceil(model.total / perRow) * 38 + 8}`} role="img" aria-label={`${model.total} counters${model.shaded ? `, ${model.shaded} coloured` : ""}${model.groupSize ? `, in groups of ${model.groupSize}` : ""}`}>
      {Array.from({ length: model.total }, (_, n) => <circle key={n} cx={22 + (n % perRow) * 38} cy={22 + Math.floor(n / perRow) * 38} r="12" className={n < (model.shaded ?? 0) ? "tp-shaded" : ""} />)}
    </svg>;
  }
  if (model.type === "blocks") return <svg className="tp-example-model" viewBox="0 0 340 210" role="img" aria-label={`Base-ten blocks: ${model.blocks.hundreds} hundreds, ${model.blocks.tens} tens, ${model.blocks.ones} ones`}>
    {["hundreds", "tens", "ones"].map((place, column) => <g key={place} transform={`translate(${column * 113 + 4} 0)`}>
      <text x="0" y="18">{place}</text>
      {Array.from({ length: model.blocks[place] }, (_, n) => {
        const width = place === "hundreds" ? 28 : 7;
        const height = place === "ones" ? 7 : 28;
        return <g key={n} transform={`translate(${(n % 3) * 34} ${32 + Math.floor(n / 3) * 40})`}><rect width={width} height={height} className="tp-shaded" />{place !== "ones" && Array.from({ length: 9 }, (_, i) => <g key={i}><line x1="0" x2={width} y1={(i + 1) * height / 10} y2={(i + 1) * height / 10} />{place === "hundreds" && <line x1={(i + 1) * width / 10} x2={(i + 1) * width / 10} y1="0" y2={height} />}</g>)}</g>;
      })}
    </g>)}
  </svg>;
  return null;
}

export function ResourcePreview({ resource }) {
  const [open, setOpen] = useState(false);
  const example = useMemo(() => open ? getResourceExample(resource) : null, [open, resource]);
  return <details className="tp-resource-preview" onToggle={(event) => setOpen(event.currentTarget.open)}>
    <summary>Preview example</summary>
    {example && <div className="tp-example">
      <p className="tp-quiet">{example.origin === "lesson" ? "Existing Bix introduction and worked example." : `Read-only sample from this activity${example.mode ? ` · ${example.mode}` : ""}.`}</p>
      <p><strong>{example.prompt}</strong></p>
      {example.teachingLines && <ul>{example.teachingLines.map((line, index) => <li key={index}>{line}</li>)}</ul>}
      {example.explanation && <p>{example.explanation}</p>}
      <ExampleModel model={example.model} />
      {example.options && <p className="tp-example-options">{example.options.join(" · ")}</p>}
      {example.answer && <details><summary>Show answer</summary><p>{example.answer}</p></details>}
    </div>}
    {open && !example && <p>No reviewed example is available for this activity yet.</p>}
  </details>;
}

export function ResourceInformation({ resource, objectiveId }) {
  const different = objectiveId && !resource.objectiveIds.includes(objectiveId);
  return <div className="tp-resource-information">
    <p>{resource.does}</p>
    {different && <p className="tp-hint">{resourceFit(resource, objectiveId)}</p>}
    <details><summary>What this activity covers</summary>
      {objectiveId && !different && <p className="tp-quiet">{resourceFit(resource, objectiveId)}</p>}
      <dl><dt>Learning objective</dt><dd>{resource.learningObjective}</dd><dt>Starting knowledge</dt><dd>{resource.prerequisites}</dd><dt>Scope</dt><dd>{resource.scope}</dd><dt>Teaching use</dt><dd>{resource.use}</dd><dt>Children see</dt><dd>{resource.childTitle} · {resource.title}</dd></dl>
      {resource.limitation && <p className="tp-hint">{resource.limitation}</p>}
    </details>
    <ResourcePreview resource={resource} />
  </div>;
}

export function ResourceFinder({ resources, needs: catalogueNeeds = LEARNING_NEEDS, year = 3, subjectName = "Maths", objectiveId, selectedResourceIds = [], selectedObjectiveIds = [], onAdd, onIncludeObjective }) {
  const [query, setQuery] = useState("");
  const [chosenId, setChosenId] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [visibleNeeds, setVisibleNeeds] = useState(8);
  const matches = useMemo(() => searchLearningNeeds(query, resources, catalogueNeeds), [query, resources, catalogueNeeds]);
  const needs = matches.map((match) => match.need);
  const fuzzy = matches.some((match) => match.matchType === "fuzzy");
  const chosen = needs.find((need) => need.id === chosenId) ?? (query.trim() && needs.length === 1 && !fuzzy ? needs[0] : null);
  const results = chosen ? matches.find((match) => match.need.id === chosen.id).resources
    : !query.trim() && objectiveId ? resources.filter((resource) => resource.available && resource.objectiveIds.includes(objectiveId)) : [];
  const visible = showAll ? results : results.slice(0, 4);
  const updateQuery = (value) => { setQuery(value); setChosenId(""); setShowAll(false); setVisibleNeeds(8); };
  return <div className="tp-resource-finder">
    <label>Search activities<input type="search" value={query} maxLength={160} placeholder={`Search Year ${year} ${subjectName}`} onChange={(event) => updateQuery(event.target.value)} /></label>
    {fuzzy && !chosen && <p className="tp-hint" role="status">Did you mean one of these?</p>}
    {query.trim() && needs.length > 1 && !chosen && !fuzzy && <p className="tp-hint" role="status">Which do you mean?</p>}
    <div className="tp-need-choices" role="group" aria-label="Choose a learning focus">
      {needs.slice(0, visibleNeeds).map((need) => <button key={need.id} type="button" aria-pressed={chosen?.id === need.id} onClick={() => { setChosenId(need.id); setShowAll(false); }}>{need.title}</button>)}
      {needs.length > visibleNeeds && <button type="button" onClick={() => setVisibleNeeds((current) => current + 8)}>Show more learning focuses</button>}
    </div>
    {query.trim() && needs.length === 0 && <div role="status"><p className="tp-hint">No matching activity. Try another word.</p><button type="button" className="tp-link" onClick={() => updateQuery("")}>Show all topics</button></div>}
    {(chosen || results.length > 0) && <div>
      {chosen?.note && <p className="tp-hint">{chosen.note}</p>}
      <p className="tp-finder-count" role="status">{results.length} {results.length === 1 ? "activity" : "activities"}{results.length ? "" : " available. Use a teacher-led activity instead."}</p>
      <div className="tp-resource-results">{visible.map((resource) => <article className="tp-resource-card" key={resource.id} aria-label={resource.teacherTitle}>
        <h4>{resource.teacherTitle}</h4>
        <ResourceInformation resource={resource} objectiveId={objectiveId} />
        {onAdd && <button type="button" disabled={selectedResourceIds.includes(resource.id)} onClick={() => onAdd(resource)}>{selectedResourceIds.includes(resource.id) ? "Already in this lesson" : "Add to this lesson"}</button>}
        {onIncludeObjective && chosen && <button type="button" disabled={selectedObjectiveIds.includes(chosen.objectiveId)} onClick={() => onIncludeObjective(chosen.objectiveId)}>{selectedObjectiveIds.includes(chosen.objectiveId) ? "Objective included in planning focus" : "Include this objective in planning focus"}</button>}
      </article>)}</div>
      {!showAll && results.length > visible.length && <button type="button" className="tp-link" onClick={() => setShowAll(true)}>Show all {results.length} activities</button>}
    </div>}
  </div>;
}
