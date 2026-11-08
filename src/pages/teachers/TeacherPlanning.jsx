import { useMemo, useState } from "react";
import { Link } from "react-router";
import { isChallengeImplemented } from "../../data/challengeAvailability";
import { getPlanningResources } from "../../data/teacherPlanningResources";
import { generateTeachingPlan, moveItem, PLANNING_OBJECTIVES, SAMPLE_CLASS, SAMPLE_EVIDENCE } from "../../data/teacherPlanning";
import "./TeacherPlanning.css";

const DURATIONS = [20, 30, 40, 45, 50, 60, 75, 90];

function EvidenceCard({ objective, evidence, selected, onSelect }) {
  return <article className="tp-evidence-card">
    <div className="tp-card-top"><span className={`tp-tag tp-tag--${evidence.priority}`}>{evidence.label}</span><span>{objective.strand}</span></div>
    <h3>{objective.title}</h3>
    <p className="tp-score">{evidence.accuracy === null ? "No responses" : `${Math.round(evidence.accuracy * 100)}% correct`}<small>{evidence.correct}/{evidence.answered} answered questions</small></p>
    <meter min="0" max="1" value={evidence.coverage} aria-label={`${objective.title}: response coverage`} />
    <p className="tp-small">{Math.round(evidence.coverage * 100)}% response coverage · {evidence.skipped} skipped · {evidence.missing} not assessed</p>
    <p>{evidence.reason}</p>
    <label className="tp-check"><input type="checkbox" checked={selected} onChange={onSelect} /> Include {objective.title.toLowerCase()}</label>
    <details><summary>View fictional pupil responses</summary>
      <p className="tp-small">Four questions per objective. Follow up means fewer than two answers; support means below 60% on at least two answers. These are provisional prompts for teacher review.</p>
      <div className="tp-table-scroll"><table>
        <caption>{objective.title} · sample evidence</caption>
        <thead><tr><th scope="col">Fictional pupil</th><th scope="col">Correct</th><th scope="col">Incorrect</th><th scope="col">Skipped</th><th scope="col">Not assessed</th><th scope="col">Review</th></tr></thead>
        <tbody>{evidence.distribution.map((row) => <tr key={row.id}><th scope="row">{row.label}</th><td>{row.correct}</td><td>{row.incorrect}</td><td>{row.skipped}</td><td>{row.missing}</td><td>{row.followUp ? "Follow up" : row.support ? "Consider support" : "Review responses"}</td></tr>)}</tbody>
      </table></div>
    </details>
  </article>;
}

function LessonEditor({ lesson, index, count, resources, onChange, onMove }) {
  const [resourceId, setResourceId] = useState("");
  const available = resources.filter((resource) => resource.available && !lesson.resources.some((entry) => entry.resourceId === resource.id));
  const addResource = () => {
    const resource = available.find((entry) => entry.id === resourceId);
    if (!resource) return;
    onChange({ resources: [...lesson.resources, { resourceId, minutes: 10, instruction: resource.instruction }] });
    setResourceId("");
  };
  const updateResource = (resourceIndex, patch) => onChange({ resources: lesson.resources.map((entry, i) => i === resourceIndex ? { ...entry, ...patch } : entry) });
  const resourceMinutes = lesson.resources.reduce((sum, entry) => sum + entry.minutes, 0);
  const practiceEstimate = Math.min(10, Math.floor(lesson.duration / 4));
  return <article className="tp-lesson" aria-label={`Lesson ${index + 1}`}>
    <div className="tp-lesson-bar"><span>Lesson {index + 1} · {lesson.duration} min</span><div className="tp-move">
      <button type="button" disabled={index === 0} aria-label={`Move lesson ${index + 1} earlier`} onClick={() => onMove(-1)}>↑ Earlier</button>
      <button type="button" disabled={index === count - 1} aria-label={`Move lesson ${index + 1} later`} onClick={() => onMove(1)}>↓ Later</button>
    </div></div>
    <details open={index === 0}>
      <summary>{lesson.title}</summary>
      <div className="tp-lesson-body">
        <p className="tp-rationale">Why this lesson: {lesson.rationale}</p>
        <label>Lesson title<input value={lesson.title} onChange={(event) => onChange({ title: event.target.value })} maxLength={160} /></label>
        <div className="tp-form-row"><label>Learning objective<select value={lesson.objectiveId} onChange={(event) => onChange({ objectiveId: event.target.value, rationale: "Objective changed by teacher. Review the teaching activities and resource alignment." })}>
          {PLANNING_OBJECTIVES.map((objective) => <option key={objective.id} value={objective.id}>{objective.title}</option>)}
        </select></label><label>Lesson minutes<select value={lesson.duration} onChange={(event) => onChange({ duration: Number(event.target.value) })}>{DURATIONS.map((duration) => <option key={duration}>{duration}</option>)}</select></label></div>
        <p className="tp-small">Starting estimate: 5 min retrieval, {lesson.duration - practiceEstimate - 10} min teaching/practical work, {practiceEstimate} min Bix practice, 5 min checkpoint. Adjust to fit your lesson.</p>
        {[["starter", "Retrieval starter"], ["teaching", "Teaching and worked model"], ["activity", "Guided or practical activity"], ["support", "Support"], ["stretch", "Stretch"], ["checkpoint", "Checkpoint"], ["notes", "Teacher notes (use fictional details only)"]].map(([field, label]) =>
          <label key={field}>{label}<textarea rows={2} value={lesson[field]} maxLength={2000} onChange={(event) => onChange({ [field]: event.target.value })} /></label>)}
        <h4>Bix playlist</h4>
        <p className="tp-small">Practice durations are estimates. Game levels are chosen manually. Resource links open a new tab so your draft stays here.</p>
        {lesson.resources.length === 0 && <p>No Bix resources selected. Use the teacher-led activity or add a resource below.</p>}
        <ol className="tp-resources">{lesson.resources.map((entry, resourceIndex) => {
          const resource = resources.find((candidate) => candidate.id === entry.resourceId);
          const aligned = resource?.objectiveIds.includes(lesson.objectiveId);
          return <li key={entry.resourceId}>
            <div className="tp-card-top"><strong>{resource?.title ?? "Resource not found"}</strong><span className="tp-tag">{resource?.kind === "skills" ? "Skills game" : "Curriculum"}</span></div>
            {!aligned && <p className="tp-notice">This resource supports a different objective. Keep it only if it fits your teaching purpose.</p>}
            <label>Practice minutes (estimate)<input type="number" min={1} max={90} value={entry.minutes} onChange={(event) => updateResource(resourceIndex, { minutes: Math.max(1, Math.min(90, Number(event.target.value) || 1)) })} /></label>
            <label>Resource instructions<textarea rows={3} value={entry.instruction} maxLength={2000} onChange={(event) => updateResource(resourceIndex, { instruction: event.target.value })} /></label>
            <div className="tp-actions">{resource?.available ? <a href={resource.to} target="_blank" rel="noopener noreferrer">Open resource ↗</a> : <span role="status">Currently unavailable</span>}
              <button type="button" disabled={resourceIndex === 0} aria-label={`Move resource ${resourceIndex + 1} earlier`} onClick={() => onChange({ resources: moveItem(lesson.resources, resourceIndex, -1) })}>↑</button>
              <button type="button" disabled={resourceIndex === lesson.resources.length - 1} aria-label={`Move resource ${resourceIndex + 1} later`} onClick={() => onChange({ resources: moveItem(lesson.resources, resourceIndex, 1) })}>↓</button>
              <button type="button" aria-label={`Remove ${resource?.title ?? "resource"}`} onClick={() => onChange({ resources: lesson.resources.filter((_, i) => i !== resourceIndex) })}>Remove</button>
            </div>
          </li>;
        })}</ol>
        {resourceMinutes + 10 > lesson.duration && <p className="tp-notice" role="status">Allow time for teaching and a checkpoint: {resourceMinutes} minutes of resources are selected for a {lesson.duration}-minute lesson.</p>}
        <div className="tp-picker"><label>Add an existing resource<select value={resourceId} onChange={(event) => setResourceId(event.target.value)}>
          <option value="">Choose a resource</option>
          {available.map((resource) => <option key={resource.id} value={resource.id}>{resource.kind === "skills" ? "Skills: " : ""}{resource.title}{resource.objectiveIds.includes(lesson.objectiveId) ? " (matches objective)" : ""}</option>)}
        </select></label><button type="button" disabled={!available.some((resource) => resource.id === resourceId)} onClick={addResource}>Add resource</button></div>
        {resources.some((resource) => !resource.available) && <p className="tp-small">Unavailable curriculum challenges are excluded from the picker.</p>}
      </div>
    </details>
  </article>;
}

function PrintablePlan({ plan, resources }) {
  return <section className="tp-print" aria-label="Printable plan" aria-hidden="true">
    <h1>{plan.title}</h1><p>Year 3 maths · Three weeks · {plan.lessons.length} lessons · Sample evidence preview</p>
    <p>Fictional assessment evidence. Teaching suggestions require teacher review.</p>
    {plan.snapshots.map((snapshot) => <p key={snapshot.objectiveId}><strong>{PLANNING_OBJECTIVES.find((objective) => objective.id === snapshot.objectiveId)?.title}:</strong> {snapshot.reason}</p>)}
    {plan.lessons.map((lesson, index) => <article key={lesson.id}>
      <h2>Week {Math.floor(index / plan.lessonsPerWeek) + 1} · Lesson {index + 1}: {lesson.title}</h2>
      <p>{lesson.duration} minutes · {PLANNING_OBJECTIVES.find((objective) => objective.id === lesson.objectiveId)?.goal}</p>
      <p><strong>Evidence:</strong> {lesson.rationale}</p>
      {[["starter", "Starter"], ["teaching", "Teaching"], ["activity", "Practical activity"], ["support", "Support"], ["stretch", "Stretch"], ["checkpoint", "Checkpoint"], ["notes", "Notes"]].map(([field, label]) => lesson[field] && <p key={field}><strong>{label}:</strong> {lesson[field]}</p>)}
      <ol>{lesson.resources.map((entry) => {
        const resource = resources.find((candidate) => candidate.id === entry.resourceId);
        return <li key={entry.resourceId}><strong>{resource?.title ?? "Unavailable resource"}</strong> · {entry.minutes} min (estimate)<p>{entry.instruction}</p><p>{resource?.available ? `${window.location.origin}${resource.to}` : "Currently unavailable"}</p></li>;
      })}</ol>
    </article>)}
  </section>;
}

export default function TeacherPlanning() {
  const resources = useMemo(() => getPlanningResources(isChallengeImplemented), []);
  const [selectedIds, setSelectedIds] = useState(() => SAMPLE_EVIDENCE.filter((evidence) => evidence.priority === "teach").map((evidence) => evidence.objectiveId));
  const [lessonsPerWeek, setLessonsPerWeek] = useState(5);
  const [duration, setDuration] = useState(45);
  const [plan, setPlan] = useState(null);
  const [replacement, setReplacement] = useState(false);
  const [message, setMessage] = useState("");
  const generate = () => {
    try {
      const draft = generateTeachingPlan({ selectedIds, lessonsPerWeek, duration, resources });
      setPlan(draft); setReplacement(false);
      setMessage(`Draft created: ${draft.lessons.length} lessons across three weeks. Review the teaching suggestions.`);
    } catch (error) { setMessage(error.message); setReplacement(false); }
  };
  const updateLesson = (id, patch) => setPlan((current) => ({ ...current, lessons: current.lessons.map((lesson) => lesson.id === id ? { ...lesson, ...patch } : lesson) }));
  return <div className="teacher-planning">
    <div className="tp-screen">
      <header className="tp-header">
        <Link to="/">← Learn with Bix</Link>
        <div className="tp-heading-row"><div><p className="tp-eyebrow">Bix for teachers · Planning preview</p><h1>From class evidence<br />to your next three weeks.</h1><p>Review the gaps. Choose your focus. Make the plan yours.</p></div><div className="tp-year-stamp">Year <strong>3</strong><span>Maths</span></div></div>
        <p className="tp-preview-note"><strong>Sample data · Unsaved preview.</strong> All eight pupils and results are fictional. Use fictional details only. Refreshing or leaving this page loses your edits; print or save as PDF to keep a copy. Teacher accounts, live pre-tests and school sharing are coming in later milestones.</p>
      </header>
      <div className="tp-overview"><div><strong>08</strong><span>fictional pupils</span></div><div><strong>02</strong><span>suggested teaching priorities</span></div><div><strong>03</strong><span>weeks, shaped by you</span></div></div>
      <section className="tp-evidence" aria-labelledby="tp-evidence-heading">
        <div className="tp-section-heading"><div><p className="tp-eyebrow">01 · Review the evidence</p><h2 id="tp-evidence-heading">Where should teaching time go?</h2></div><span className="tp-tag">{SAMPLE_CLASS.name}</span></div>
        <p>Fractions need attention in this example. Addition and subtraction can receive brief retrieval, with individual needs kept in view. Select the objectives you want to teach.</p>
        <details className="tp-rules"><summary>How are these suggestions made?</summary><p>These are provisional planning rules, not validated mastery judgements. At least 75% of responses must be available and at least 75% of pupils must answer two questions. Below 60% correct suggests teaching; 60–79% suggests consolidation; 80% or more suggests retrieval. Otherwise, gather more evidence. A skipped question is distinct from an incorrect answer or an objective not assessed.</p></details>
        <div className="tp-evidence-grid">{PLANNING_OBJECTIVES.map((objective, index) => <EvidenceCard key={objective.id} objective={objective} evidence={SAMPLE_EVIDENCE[index]} selected={selectedIds.includes(objective.id)} onSelect={() => setSelectedIds((current) => current.includes(objective.id) ? current.filter((id) => id !== objective.id) : [...current, objective.id])} />)}</div>
      </section>
      <section className="tp-build" aria-labelledby="tp-build-heading">
        <div><p className="tp-eyebrow">02 · Shape your sequence</p><h2 id="tp-build-heading">A starting point for your teaching.</h2><p>Choose your rhythm. Selected objectives follow the pilot's foundational order, with time to revisit them. This covers your selected focus, not the entire fractions strand.</p></div>
        <div className="tp-build-controls"><label>Lessons per week<select value={lessonsPerWeek} onChange={(event) => setLessonsPerWeek(Number(event.target.value))}>{[1, 2, 3, 4, 5].map((count) => <option key={count} value={count}>{count}</option>)}</select></label>
          <label>Minutes per lesson<select value={duration} onChange={(event) => setDuration(Number(event.target.value))}>{DURATIONS.map((minutes) => <option key={minutes}>{minutes}</option>)}</select></label>
          <button className="tp-primary" type="button" disabled={!selectedIds.length} onClick={() => plan ? setReplacement(true) : generate()}>{plan ? "Review replacement draft" : "Create three-week draft"}</button>
        </div>
        <p className="tp-small">{selectedIds.length} objectives selected · {lessonsPerWeek * 3} lessons. Changing these settings does not change an existing draft.</p>
        {replacement && <div className="tp-confirm" role="group" aria-label="Replace draft confirmation"><p>Replace your current draft and its edits with a new sequence using the selected objectives and settings?</p><div className="tp-actions"><button type="button" onClick={() => setReplacement(false)}>Keep current draft</button><button type="button" onClick={generate}>Replace draft and edits</button></div></div>}
        <p role="status" className="tp-status">{message}</p>
      </section>
      {plan && <section className="tp-plan" aria-labelledby="tp-plan-heading">
        <div className="tp-section-heading"><div><p className="tp-eyebrow">03 · Teach, check and adjust</p><h2 id="tp-plan-heading">Your three-week draft</h2></div><button type="button" onClick={() => window.print()}>Print / Save as PDF</button></div>
        <label>Plan name<input value={plan.title} maxLength={160} onChange={(event) => setPlan((current) => ({ ...current, title: event.target.value }))} /></label>
        <p>Unsaved · {plan.lessons.length} lessons · {plan.lessons.reduce((sum, lesson) => sum + lesson.duration, 0)} minutes. Open a lesson to edit it. Moving lessons changes their week; review prerequisites after reordering.</p>
        {[0, 1, 2].map((week) => <section className="tp-week" key={week} aria-label={`Week ${week + 1}`}><h3>Week {week + 1}<span>{plan.lessonsPerWeek} lessons</span></h3>
          {plan.lessons.slice(week * plan.lessonsPerWeek, (week + 1) * plan.lessonsPerWeek).map((lesson, localIndex) => {
            const index = week * plan.lessonsPerWeek + localIndex;
            return <LessonEditor key={lesson.id} lesson={lesson} index={index} count={plan.lessons.length} resources={resources} onChange={(patch) => updateLesson(lesson.id, patch)} onMove={(offset) => { setPlan((current) => ({ ...current, lessons: moveItem(current.lessons, index, offset) })); setMessage(`Lesson moved to position ${index + offset + 1}.`); }} />;
          })}
        </section>)}
      </section>}
    </div>
    {plan && <PrintablePlan plan={plan} resources={resources} />}
  </div>;
}
