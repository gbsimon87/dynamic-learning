import { useMemo, useState } from "react";
import { LEARNING_NEEDS, searchLearningNeeds, resourcesForNeed } from "../../data/teacherResourceCatalogue";
import { compileClassEvidence, NEED_STATUSES, parseTopicResults } from "../../data/teacherClassInput";
import { Icon } from "./TeacherIcons";

const NONE = { source: "none", evidence: [] };

// Step 1. Topics apply as soon as they are added, so there is no separate
// "use these needs" step to forget. Pasted results still need confirming.
export default function TeacherClassInput({ resources, needs = LEARNING_NEEDS, initialEntries = [], searchSubject, topicSelection, onApply, onDirty, onSample }) {
  const [mode, setMode] = useState("topics");
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState(initialEntries);
  const [paste, setPaste] = useState("");
  const [review, setReview] = useState(null);
  const [appliedReview, setAppliedReview] = useState(null);
  const [errors, setErrors] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const matches = useMemo(() => searchLearningNeeds(query, resources, searchSubject ? needs.filter((need) => need.subject === searchSubject) : needs), [query, resources, needs, searchSubject]);
  const searching = query.trim().length > 0;
  const fuzzy = matches.some((match) => match.matchType === "fuzzy");
  const titleOf = (needId) => needs.find((need) => need.id === needId)?.title ?? "Topic";

  const publish = (bundle) => { try { onApply(bundle()); setErrors([]); } catch (error) { setErrors([error.message]); } };
  const applyEntries = (next) => {
    setEntries(next);
    publish(() => next.length ? { source: "teacher", evidence: compileClassEvidence(next, "teacher", { needs, resources }) } : NONE);
  };
  const applyReview = (rows) => publish(() => rows?.length ? { source: "class-results", evidence: compileClassEvidence(rows, "class-results", { needs, resources }) } : NONE);

  const switchMode = (next) => {
    if (next === mode) return;
    setMode(next); setErrors([]);
    if (next === "sample") { onSample(); onDirty(false); return; }
    if (next === "topics") applyEntries(entries);
    else applyReview(appliedReview);
    onDirty(next === "paste" && Boolean(paste.trim()) && review !== appliedReview);
  };
  const addNeed = (needId, matchedResources) => {
    const resourceIds = matchedResources?.length ? matchedResources.map((resource) => resource.id) : undefined;
    applyEntries(entries.some((entry) => entry.needId === needId)
      ? entries.map((entry) => entry.needId === needId ? { ...entry, resourceIds } : entry)
      : [...entries, { needId, priority: "teach", resourceIds }]);
    setQuery(""); setVisibleCount(8);
  };
  const reviewPaste = () => {
    const result = parseTopicResults(paste);
    setErrors(result.errors);
    setReview(result.errors.length ? null : result.rows.map((row) => {
      const found = searchLearningNeeds(row.topic, resources, needs);
      const sure = found.length === 1 && found[0].matchType !== "fuzzy";
      return { ...row, suggestions: found.map((match) => match.need.id), suggestedResources: Object.fromEntries(found.map((match) => [match.need.id, match.resources.map((resource) => resource.id)])), fuzzy: found.some((match) => match.matchType === "fuzzy"),
        resourceIds: sure ? found[0].resources.map((resource) => resource.id) : undefined, needId: sure ? found[0].need.id : "" };
    }));
  };
  const useReview = () => {
    try {
      onApply({ source: "class-results", evidence: compileClassEvidence(review, "class-results", { needs, resources }) });
      setAppliedReview(review); setErrors([]); onDirty(false);
    } catch (error) { setErrors([error.message]); }
  };

  return <section className="tp-step" aria-labelledby="tp-input-heading">
    <h2 id="tp-input-heading" className="sr-only">Add your teaching topics</h2>
    <div className="tp-tabs" role="group" aria-label="How to add class needs">
      <button type="button" aria-pressed={mode === "topics"} onClick={() => switchMode("topics")}>Pick topics</button>
      <button type="button" aria-pressed={mode === "paste"} onClick={() => switchMode("paste")}>Paste results</button>
      {onSample && <button type="button" aria-pressed={mode === "sample"} onClick={() => switchMode("sample")}>Try a sample class</button>}
    </div>

    {mode === "topics" && <>
      <label className="tp-search"><span className="sr-only">Search topics</span>
        <Icon name="search" />
        <input type="search" value={query} maxLength={160} placeholder="Search topics, e.g. fractions" onChange={(event) => { setQuery(event.target.value); setVisibleCount(8); }} />
      </label>
      {searching && fuzzy && <p className="tp-hint" role="status">Did you mean one of these?</p>}
      {searching && !matches.length && <p className="tp-hint" role="status">Nothing matches “{query.trim()}”. Try another word.</p>}
      {matches.length > 0 && <ul className="tp-matches" aria-label="Matching topics">
        {matches.slice(0, visibleCount).map(({ need, resources: found }) => {
          const added = entries.some((entry) => entry.needId === need.id);
          return <li key={need.id}>
            <button type="button" className="tp-match" aria-label={`Add: ${need.title}`} onClick={() => addNeed(need.id, found)}>
              <Icon name={added ? "check" : "plus"} />
              <span>{need.title}<small>{found.length} {found.length === 1 ? "activity" : "activities"}{added ? " · added" : ""}</small></span>
            </button>
            {found.length > 1 && <details className="tp-pick-one"><summary>Pick one activity</summary>
              <ul>{found.map((resource) => <li key={resource.id}><button type="button" onClick={() => addNeed(need.id, [resource])}>Use: {resource.teacherTitle}</button></li>)}</ul>
            </details>}
          </li>;
        })}
      </ul>}
      {matches.length > visibleCount && <button type="button" className="tp-link" onClick={() => setVisibleCount((count) => count + 8)}>Show {Math.min(8, matches.length - visibleCount)} more</button>}

      {entries.length > 0 && <><p className="tp-added-heading">Selected topics <span>{entries.length}</span></p></>}
      {entries.length > 0 && <ul className="tp-needs" aria-label="Your class needs">{entries.map((entry) => {
        const title = titleOf(entry.needId);
        const objectiveId = needs.find((need) => need.id === entry.needId)?.objectiveId;
        const objective = topicSelection?.objectives.find((item) => item.id === objectiveId);
        return <li key={entry.needId}>
          <label className="tp-entry-topic">{objective && <input type="checkbox" checked={topicSelection.selectedIds.includes(objectiveId)} onChange={() => topicSelection.onToggle(objectiveId)} aria-label={`Include ${objective.title.toLowerCase()}`} />}<span className="tp-need-title">{title}{needs.find((need) => need.id === entry.needId)?.subjectName && <small>{needs.find((need) => need.id === entry.needId).subjectName}</small>}{entry.resourceIds?.length === 1 && <small>{resources.find((resource) => resource.id === entry.resourceIds[0])?.teacherTitle}</small>}</span></label>
          <fieldset className="tp-seg"><legend className="sr-only">How is the class doing with {title}?</legend>
            {NEED_STATUSES.map((status) => <label key={status.id} title={status.label} className={`tp-seg--${status.id}`}>
              <input type="radio" name={`status-${entry.needId}`} value={status.id} checked={entry.priority === status.id} onChange={() => applyEntries(entries.map((row) => row.needId === entry.needId ? { ...row, priority: status.id } : row))} />
              <span>{status.short}</span>
            </label>)}
          </fieldset>
          <button type="button" className="tp-icon-button" aria-label={`Remove ${title}`} onClick={() => applyEntries(entries.filter((row) => row.needId !== entry.needId))}><Icon name="close" /></button>
        </li>;
      })}</ul>}
    </>}

    {mode === "paste" && <div className="tp-paste">
      <p className="tp-quiet">Copy from a spreadsheet with columns <strong>Topic, Correct, Answered</strong>. Expected and Skipped are optional. Use question counts, not pupil names.</p>
      <label>Paste class topic results<textarea rows={5} maxLength={20000} value={paste} placeholder={"Topic\tCorrect\tAnswered\nFractions of amounts\t9\t30"} onChange={(event) => { setPaste(event.target.value); setReview(null); setErrors([]); onDirty(Boolean(event.target.value.trim())); }} /></label>
      <button type="button" onClick={reviewPaste} disabled={!paste.trim()}>Check results</button>
      {review && <div className="tp-import-review">
        <ul>{review.map((row, index) => <li key={row.id} className="tp-import-row">
          <p><strong>{row.topic}</strong> <span className="tp-quiet">{row.correct}/{row.answered} correct</span></p>
          <label><span className="sr-only">Learning focus for row {index + 1}</span><select aria-label={`Learning focus for row ${index + 1}`} value={row.needId} onChange={(event) => { const needId = event.target.value; setReview((current) => current.map((item) => item.id === row.id ? { ...item, needId, resourceIds: item.suggestedResources[needId] ?? resourcesForNeed(resources, needId).map((resource) => resource.id) } : item)); onDirty(true); }}>
            <option value="">{row.fuzzy ? "Did you mean…?" : "Choose a topic"}</option>
            {needs.map((need) => <option key={need.id} value={need.id}>{need.subjectName ? `${need.subjectName} · ` : ""}{need.title}{row.suggestions.includes(need.id) ? " (suggested)" : ""}</option>)}
          </select></label>
        </li>)}</ul>
        <button className="tp-primary" type="button" disabled={review.some((row) => !row.needId)} onClick={useReview}>Use these results</button>
      </div>}
    </div>}

    {mode === "sample" && <p className="tp-quiet">Fictional Year 3 Maths sample.</p>}
    {errors.length > 0 && <div className="tp-notice" role="alert">{errors.map((error, index) => <p key={index}>{error}</p>)}</div>}
  </section>;
}
