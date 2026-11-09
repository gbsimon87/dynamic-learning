import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { isChallengeImplemented } from "../../data/challengeAvailability";
import { getTeacherCurriculum } from "../../data/teacherPlanningResources";
import { CURRICULUM_SUBJECTS, CURRICULUM_YEARS, getSubjectName, isCurriculumAvailable, isYearAvailable } from "../../data/curriculumRegistry";
import { generateTeachingPlan, moveItem, SAMPLE_CLASS, SAMPLE_EVIDENCE } from "../../data/teacherPlanning";
import { resourceFit } from "../../data/teacherResourceCatalogue";
import { ResourceFinder, ResourceInformation } from "./TeacherResources";
import TeacherClassInput from "./TeacherClassInput";
import { Icon } from "./TeacherIcons";
import "./TeacherPlanning.css";

const DURATIONS = [20, 30, 40, 45, 50, 60, 75, 90];
const YEARS = CURRICULUM_YEARS.filter(isYearAvailable);
const EMPTY_INPUT = { source: "none", evidence: [], revision: 0 };
const sourceLabel = (source) => ({ teacher: "Teacher judgement", "class-results": "Pasted class results", sample: "Fictional sample", none: "No class evidence yet" })[source] ?? "Evidence not supplied";
const subjectsFor = (year) => CURRICULUM_SUBJECTS.filter((subject) => isCurriculumAvailable(year, subject.id));
// Sample results only promote topics needing teaching; real input also keeps
// "practise" and "not sure" topics, leaving secure topics for retrieval starters.
const includedByDefault = (row, source) => source === "sample" ? row.priority === "teach" : row.priority !== "retrieve";
const LESSON_FIELDS = [["starter", "Retrieval starter"], ["teaching", "Teaching and worked model"], ["activity", "Guided or practical activity"], ["checkpoint", "Checkpoint"]];
const EXTRA_FIELDS = [["support", "Support"], ["stretch", "Stretch"]];

function ClassPicker({ context, onChoose }) {
  return <div className="tp-picker-row">
    <div className="tp-chips" role="group" aria-label="Class year">
      {YEARS.map((year) => <button key={year} type="button" aria-pressed={context.year === year} onClick={() => onChoose({ year, subject: isCurriculumAvailable(year, context.subject) ? context.subject : subjectsFor(year)[0].id })}>Year {year}</button>)}
    </div>
    <div className="tp-chips" role="group" aria-label="Subject">
      {subjectsFor(context.year).map((subject) => <button key={subject.id} type="button" aria-pressed={context.subject === subject.id} onClick={() => onChoose({ ...context, subject: subject.id })}>{subject.name}</button>)}
    </div>
  </div>;
}

function FocusRow({ objective, evidence, selected, onToggle }) {
  const scored = evidence.source !== "teacher" && evidence.accuracy !== null && evidence.accuracy !== undefined;
  return <li className={`tp-focus${selected ? " is-on" : ""}`}>
    <label className="tp-focus-main">
      <input type="checkbox" checked={selected} onChange={onToggle} aria-label={`Include ${objective.title.toLowerCase()}`} />
      <span className="tp-focus-title">{objective.title}</span>
    </label>
    <span className={`tp-tag tp-tag--${evidence.priority}`}>{evidence.label}</span>
    {scored && <span className="tp-score">{Math.round(evidence.accuracy * 100)}% correct</span>}
    {evidence.source !== "teacher" && <details className="tp-focus-more"><summary>Details</summary>
      <p className="tp-quiet">{evidence.reason}</p>
      {evidence.coverage !== null && evidence.coverage !== undefined && <p className="tp-quiet">{Math.round(evidence.coverage * 100)}% of expected answers given.</p>}
      {evidence.distribution.length > 0 && <div className="tp-table-scroll"><table>
        <caption>{objective.title} · sample evidence</caption>
        <thead><tr><th scope="col">Fictional pupil</th><th scope="col">Correct</th><th scope="col">Incorrect</th><th scope="col">Skipped</th><th scope="col">Not assessed</th><th scope="col">Review</th></tr></thead>
        <tbody>{evidence.distribution.map((row) => <tr key={row.id}><th scope="row">{row.label}</th><td>{row.correct}</td><td>{row.incorrect}</td><td>{row.skipped}</td><td>{row.missing}</td><td>{row.followUp ? "Follow up" : row.support ? "Consider support" : "Review responses"}</td></tr>)}</tbody>
      </table></div>}
    </details>}
  </li>;
}

function LessonCard({ lesson, index, count, resources, objectives, needs, year, subjectName, open, onToggle, reordering, onChange, onMove }) {
  const [editing, setEditing] = useState(false);
  const [resourceId, setResourceId] = useState("");
  const [finderOpen, setFinderOpen] = useState(false);
  const available = resources.filter((resource) => resource.available && !lesson.resources.some((entry) => entry.resourceId === resource.id));
  const addChosenResource = (resource) => {
    if (!available.some((entry) => entry.id === resource.id)) return;
    onChange({ resources: [...lesson.resources, { resourceId: resource.id, minutes: 10, instruction: resource.instruction }] });
    setResourceId("");
  };
  const updateResource = (resourceIndex, patch) => onChange({ resources: lesson.resources.map((entry, i) => i === resourceIndex ? { ...entry, ...patch } : entry) });
  const resourceMinutes = lesson.resources.reduce((sum, entry) => sum + entry.minutes, 0);
  const practice = Math.min(10, Math.floor(lesson.duration / 4));
  const bodyId = `${lesson.id}-body`;
  const activityList = <>
    {lesson.resources.length === 0 && <p className="tp-quiet">No Bix activities selected. Use the practical activity above.</p>}
    <ol className="tp-resources">{lesson.resources.map((entry, resourceIndex) => {
      const resource = resources.find((candidate) => candidate.id === entry.resourceId);
      const aligned = resource?.objectiveIds.includes(lesson.objectiveId);
      return <li key={entry.resourceId}>
        <div className="tp-res-top"><div><strong>{resource?.teacherTitle ?? "Resource not found"}</strong><small>{resource?.kind === "skills" ? "Skills game" : "Curriculum"} · {entry.minutes} min</small></div>
          {!editing && (resource?.available ? <a className="tp-open" href={resource.to} target="_blank" rel="noopener noreferrer">Open resource <Icon name="external" /></a> : <span role="status">Currently unavailable</span>)}
        </div>
        {!aligned && <p className="tp-hint">This activity is for a different objective.</p>}
        {editing && <div className="tp-res-controls">
          <label className="tp-minutes">Activity minutes<input type="number" min={1} max={90} value={entry.minutes} onChange={(event) => updateResource(resourceIndex, { minutes: Math.max(1, Math.min(90, Number(event.target.value) || 1)) })} /></label>
          {resource?.available ? <a className="tp-open" href={resource.to} target="_blank" rel="noopener noreferrer">Open resource <Icon name="external" /></a> : <span role="status">Currently unavailable</span>}
          <span className="tp-res-actions">
            <button type="button" className="tp-icon-button" disabled={resourceIndex === 0} aria-label={`Move resource ${resourceIndex + 1} earlier`} onClick={() => onChange({ resources: moveItem(lesson.resources, resourceIndex, -1) })}><Icon name="up" /></button>
            <button type="button" className="tp-icon-button" disabled={resourceIndex === lesson.resources.length - 1} aria-label={`Move resource ${resourceIndex + 1} later`} onClick={() => onChange({ resources: moveItem(lesson.resources, resourceIndex, 1) })}><Icon name="down" /></button>
            <button type="button" className="tp-icon-button" aria-label={`Remove ${resource?.title ?? "resource"}`} onClick={() => onChange({ resources: lesson.resources.filter((_, i) => i !== resourceIndex) })}><Icon name="close" /></button>
          </span>
        </div>}
        <details className="tp-res-more"><summary>Instructions and preview</summary>
          {editing ? <label>Instructions for this activity<textarea rows={3} value={entry.instruction} maxLength={2000} onChange={(event) => updateResource(resourceIndex, { instruction: event.target.value })} /></label> : <p>{entry.instruction}</p>}
          {resource && <ResourceInformation resource={resource} objectiveId={lesson.objectiveId} />}
        </details>
      </li>;
    })}</ol>
    {resourceMinutes + 10 > lesson.duration && <p className="tp-hint" role="status">{resourceMinutes} min of activities leaves little time to teach in a {lesson.duration}-minute lesson.</p>}
  </>;
  return <article className={`tp-lesson${open ? " is-open" : ""}`} aria-label={`Lesson ${index + 1}`}>
    <div className="tp-lesson-row">
      <button type="button" className="tp-lesson-toggle" aria-expanded={open} aria-controls={bodyId} onClick={() => { setEditing(false); onToggle(); }}>
        <span className="tp-lesson-n">{index + 1}</span>
        <span className="tp-lesson-name">{lesson.title}<small>{lesson.duration} min{lesson.resources.length ? ` · ${lesson.resources.length} Bix ${lesson.resources.length === 1 ? "activity" : "activities"}` : ""}</small></span>
        <Icon name="chevron" />
      </button>
      {reordering && <div className="tp-move">
        <button type="button" className="tp-icon-button" disabled={index === 0} aria-label={`Move lesson ${index + 1} earlier`} onClick={() => onMove(-1)}><Icon name="up" /></button>
        <button type="button" className="tp-icon-button" disabled={index === count - 1} aria-label={`Move lesson ${index + 1} later`} onClick={() => onMove(1)}><Icon name="down" /></button>
      </div>}
    </div>
    {open && <div className="tp-lesson-body" id={bodyId}>
      <div className="tp-lesson-toolbar"><p className="tp-lesson-goal"><span>Learning focus</span>{lesson.learningGoal}</p><button type="button" onClick={() => { setFinderOpen(false); setEditing((value) => !value); }}>{editing ? "Done editing" : "Edit lesson"}</button></div>
      {!editing ? <>
        <ol className="tp-lesson-flow" aria-label="Teaching sequence">
          {[["starter", "Warm up", 5], ["teaching", "Teach and model", lesson.duration - practice - 10], ["activity", "Practise", practice], ["checkpoint", "Check understanding", 5]].map(([field, title, minutes]) => <li key={field}>
            <div className="tp-flow-heading"><h4>{title}</h4><span>{minutes} min</span></div>
            <p>{lesson[field]}</p>
            {field === "activity" && activityList}
          </li>)}
        </ol>
        <details className="tp-lesson-extra"><summary>Support and stretch</summary><div className="tp-two">{EXTRA_FIELDS.map(([field, label]) => <div key={field}><h4>{label}</h4><p>{lesson[field]}</p></div>)}</div></details>
        {lesson.notes && <div className="tp-lesson-notes"><h4>Your notes</h4><p>{lesson.notes}</p></div>}
      </> : <div className="tp-lesson-form">
        <div className="tp-lesson-meta">
        <label className="tp-grow">Lesson title<input value={lesson.title} onChange={(event) => onChange({ title: event.target.value })} maxLength={160} /></label>
        <label className="tp-grow">Objective<select value={lesson.objectiveId} onChange={(event) => onChange({ objectiveId: event.target.value, needId: null, learningGoal: objectives.find((objective) => objective.id === event.target.value)?.goal, rationale: "Objective changed by you. Check the activities still fit." })}>
          {objectives.map((objective) => <option key={objective.id} value={objective.id}>{objective.title}</option>)}
        </select></label>
        <label>Lesson minutes<select value={lesson.duration} onChange={(event) => onChange({ duration: Number(event.target.value) })}>{DURATIONS.map((duration) => <option key={duration}>{duration}</option>)}</select></label>
      </div>
      <p className="tp-timing" aria-label="Suggested timing"><span>5 starter</span><span>{lesson.duration - practice - 10} teach</span><span>{practice} Bix</span><span>5 check</span></p>
      {LESSON_FIELDS.map(([field, label]) => <label key={field}>{label}<textarea rows={2} value={lesson[field]} maxLength={2000} onChange={(event) => onChange({ [field]: event.target.value })} /></label>)}
      <div className="tp-two">{EXTRA_FIELDS.map(([field, label]) => <label key={field}>{label}<textarea rows={2} value={lesson[field]} maxLength={2000} onChange={(event) => onChange({ [field]: event.target.value })} /></label>)}</div>
      <label>Teacher notes (no pupil names)<textarea rows={2} value={lesson.notes} maxLength={2000} onChange={(event) => onChange({ notes: event.target.value })} /></label>

      <h4>Bix activities</h4>
      {activityList}
      <div className="tp-add-row"><label className="tp-grow">Add an existing resource<select value={resourceId} onChange={(event) => setResourceId(event.target.value)}>
        <option value="">Choose an activity</option>
        {available.map((resource) => <option key={resource.id} value={resource.id}>{resource.objectiveIds.includes(lesson.objectiveId) ? "★ " : ""}{resource.teacherTitle}</option>)}
      </select></label><button type="button" disabled={!available.some((resource) => resource.id === resourceId)} onClick={() => { const resource = available.find((entry) => entry.id === resourceId); if (resource) addChosenResource(resource); }}>Add resource</button></div>
      <details className="tp-find-for-lesson" onToggle={(event) => setFinderOpen(event.currentTarget.open)}><summary>Search activities for this lesson</summary>
        {finderOpen && <ResourceFinder key={lesson.objectiveId} resources={resources} needs={needs} year={year} subjectName={subjectName} objectiveId={lesson.objectiveId} selectedResourceIds={lesson.resources.map((entry) => entry.resourceId)} onAdd={addChosenResource} />}
      </details>
      </div>}
      <details className="tp-lesson-extra"><summary>Why this lesson?</summary><p className="tp-why">{lesson.rationale}</p></details>
    </div>}
  </article>;
}

function PrintablePlan({ plan, resources }) {
  return <section className="tp-print" aria-label="Printable plan" aria-hidden="true">
    <h1>{plan.title}</h1><p>Year {plan.year} {plan.subjectName} · Three weeks · {plan.lessons.length} lessons · {sourceLabel(plan.evidenceSource)}</p>
    <p>{plan.classSize ? `${plan.classSize} pupils. ` : ""}Teaching suggestions require teacher review. Class-level evidence does not establish individual pupil groups.</p>
    {plan.retrievalReason && <p><strong>Retrieval rationale:</strong> {plan.retrievalReason}</p>}
    {plan.snapshots.map((snapshot) => <p key={snapshot.objectiveId}><strong>{plan.objectives.find((objective) => objective.id === snapshot.objectiveId)?.title}:</strong> {snapshot.reason}</p>)}
    {plan.lessons.map((lesson, index) => <article key={lesson.id}>
      <h2>Week {Math.floor(index / plan.lessonsPerWeek) + 1} · Lesson {index + 1}: {lesson.title}</h2>
      <p>{lesson.duration} minutes · {lesson.learningGoal}</p>
      <p><strong>Evidence:</strong> {lesson.rationale}</p>
      {[["starter", "Starter"], ["teaching", "Teaching"], ["activity", "Practical activity"], ["support", "Support"], ["stretch", "Stretch"], ["checkpoint", "Checkpoint"], ["notes", "Notes"]].map(([field, label]) => lesson[field] && <p key={field}><strong>{label}:</strong> {lesson[field]}</p>)}
      <ol>{lesson.resources.map((entry) => {
        const resource = resources.find((candidate) => candidate.id === entry.resourceId);
        return <li key={entry.resourceId}><strong>{resource?.teacherTitle ?? "Unavailable resource"}</strong> · {entry.minutes} min (estimate){resource && <><p>{resource.title}</p><p>{resourceFit(resource, lesson.objectiveId)}</p><p>{resource.does} {resource.scope}</p>{resource.limitation && <p>{resource.limitation}</p>}</>}<p>{entry.instruction}</p><p>{resource?.available ? `${window.location.origin}${resource.to}` : "Currently unavailable"}</p></li>;
      })}</ol>
    </article>)}
  </section>;
}

export default function TeacherPlanning() {
  const [context, setContext] = useState({ year: 3, subject: "math" });
  const [pendingContext, setPendingContext] = useState(null);
  const catalogue = useMemo(() => getTeacherCurriculum({ ...context, isBuilt: isChallengeImplemented }), [context]);
  const { resources, objectives, needs, year, subjectName } = catalogue;
  const [input, setInput] = useState(EMPTY_INPUT);
  const [overrides, setOverrides] = useState({});
  const [dirty, setDirty] = useState(false);
  const [lessonsPerWeek, setLessonsPerWeek] = useState(5);
  const [duration, setDuration] = useState(45);
  const [classSize, setClassSize] = useState("");
  const [plan, setPlan] = useState(null);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [reordering, setReordering] = useState(false);
  const [replacement, setReplacement] = useState(false);
  const [message, setMessage] = useState("");
  const planRef = useRef(null);
  const scrollToPlan = useRef(false);

  const focusObjectives = objectives.filter((objective) => input.evidence.some((row) => row.objectiveId === objective.id));
  const evidenceFor = (id) => input.evidence.find((row) => row.objectiveId === id);
  const selectedIds = focusObjectives.filter((objective) => overrides[objective.id] ?? includedByDefault(evidenceFor(objective.id), input.source)).map((objective) => objective.id);
  const sizeValue = classSize === "" ? null : Number(classSize);
  const sizeError = sizeValue !== null && (!Number.isInteger(sizeValue) || sizeValue < 1 || sizeValue > 1000);
  const blocker = dirty ? "Press “Use these results” in step 1 first." : input.source === "none" ? "Add a topic in step 1 first." : !selectedIds.length ? "Tick at least one topic in step 2." : sizeError ? "Class size must be a whole number from 1 to 1,000." : "";
  const stale = plan && plan.inputRevision !== input.revision;

  useEffect(() => {
    if (!scrollToPlan.current || !plan) return;
    scrollToPlan.current = false;
    planRef.current?.scrollIntoView?.({ behavior: "smooth", block: "start" });
  }, [plan]);

  const generate = () => {
    try {
      if (blocker) throw new Error(blocker);
      const draft = generateTeachingPlan({ selectedIds, lessonsPerWeek, duration, resources, objectives, year, subject: context.subject, subjectName, evidence: input.evidence, evidenceMeta: { ...input, classSize: sizeValue ?? input.classSize ?? null } });
      scrollToPlan.current = !plan;
      setPlan(draft); setActiveLessonId(null); setReordering(false); setReplacement(false);
      setMessage(`Plan ready: ${draft.lessons.length} lessons over three weeks.`);
    } catch (error) { setMessage(error.message); setReplacement(false); }
  };
  const switchContext = (next) => {
    setContext(next); setPendingContext(null); setPlan(null); setInput(EMPTY_INPUT); setActiveLessonId(null); setReordering(false);
    setOverrides({}); setDirty(false); setReplacement(false); setMessage("");
  };
  const chooseContext = (next) => {
    if (next.year === context.year && next.subject === context.subject) { setPendingContext(null); return; }
    if (input.source !== "none" || dirty || plan) setPendingContext(next);
    else switchContext(next);
  };
  const applyInput = (bundle) => {
    setInput((current) => ({ ...bundle, revision: current.revision + 1 }));
    if (bundle.source !== input.source || bundle.source === "sample") setOverrides({});
    setReplacement(false);
  };
  const updateLesson = (id, patch) => setPlan((current) => ({ ...current, lessons: current.lessons.map((lesson) => lesson.id === id ? { ...lesson, ...patch } : lesson) }));
  const sample = year === 3 && context.subject === "math" ? () => applyInput({ source: "sample", evidence: SAMPLE_EVIDENCE, classSize: SAMPLE_CLASS.pupils.length }) : undefined;

  return <div className="teacher-planning">
    <div className="tp-screen">
      <header className="tp-header">
        <Link className="tp-back" to="/"><Icon name="back" />Learn with Bix</Link>
        <h1>Plan your next three weeks</h1>
        <p className="tp-lede">Pick your class, add what they need, get a lesson-by-lesson plan. <span className="tp-unsaved">Not saved. Print to keep it.</span></p>
        <ClassPicker context={context} onChoose={chooseContext} />
        {pendingContext && <div className="tp-confirm" role="group" aria-label="Change curriculum confirmation">
          <p>Switch to <strong>Year {pendingContext.year} {getSubjectName(pendingContext.subject)}</strong>? This clears your topics{plan ? " and plan" : ""}.</p>
          <div className="tp-actions">
            <button type="button" onClick={() => setPendingContext(null)}>Keep current curriculum</button>
            {plan && <button type="button" onClick={() => window.print()}><Icon name="print" />Print plan first</button>}
            <button type="button" className="tp-primary" onClick={() => switchContext(pendingContext)}>Change curriculum and start again</button>
          </div>
        </div>}
      </header>

      <TeacherClassInput key={`${year}:${context.subject}`} resources={resources} needs={needs} onApply={applyInput} onDirty={(value) => { setDirty(value); if (value) setReplacement(false); }} onSample={sample} />

      <section className="tp-step" aria-labelledby="tp-focus-heading">
        <h2 id="tp-focus-heading"><span className="tp-step-n" aria-hidden="true">2</span>Choose what to plan</h2>
        {focusObjectives.length ? <>
          {input.source === "sample" && <p className="tp-quiet">All eight pupils and results are fictional.</p>}
          <ul className="tp-focus-list">{focusObjectives.map((objective) => <FocusRow key={objective.id} objective={objective} evidence={evidenceFor(objective.id)} selected={selectedIds.includes(objective.id)} onToggle={() => setOverrides((current) => ({ ...current, [objective.id]: !selectedIds.includes(objective.id) }))} />)}</ul>
          <p className="tp-quiet">Secure topics come back as quick starters.</p>
        </> : <p className="tp-quiet">Your topics will show here.</p>}
      </section>

      <section className="tp-step" aria-labelledby="tp-build-heading">
        <h2 id="tp-build-heading"><span className="tp-step-n" aria-hidden="true">3</span>Build the plan</h2>
        <div className="tp-build-controls">
          <fieldset className="tp-seg tp-seg--plain"><legend>Lessons per week</legend>
            {[1, 2, 3, 4, 5].map((value) => <label key={value}><input type="radio" name="tp-lessons" value={value} checked={lessonsPerWeek === value} onChange={() => setLessonsPerWeek(value)} /><span>{value}</span></label>)}
          </fieldset>
          <label>Minutes per lesson<select value={duration} onChange={(event) => setDuration(Number(event.target.value))}>{DURATIONS.map((minutes) => <option key={minutes}>{minutes}</option>)}</select></label>
          <label className="tp-size"><span>Class size <span className="tp-optional">(optional)</span></span><input type="number" min={1} max={1000} inputMode="numeric" value={classSize} aria-invalid={sizeError || undefined} onChange={(event) => setClassSize(event.target.value)} /></label>
        </div>
        <div className="tp-go">
          <button className="tp-primary tp-big" type="button" disabled={Boolean(blocker)} onClick={() => plan ? setReplacement(true) : generate()}>{plan ? "Rebuild plan" : "Create three-week plan"}</button>
          <p className="tp-quiet">{blocker || `${selectedIds.length} ${selectedIds.length === 1 ? "topic" : "topics"} · ${lessonsPerWeek * 3} lessons`}</p>
        </div>
        {replacement && <div className="tp-confirm" role="group" aria-label="Replace draft confirmation"><p>Replace your plan? Your edits will be lost.</p><div className="tp-actions"><button type="button" onClick={() => setReplacement(false)}>Keep current plan</button><button type="button" className="tp-primary" onClick={generate}>Replace plan</button></div></div>}
        <p role="status" className="tp-status">{message}</p>
      </section>

      {plan && <section className="tp-plan" ref={planRef} aria-labelledby="tp-plan-heading">
        <div className="tp-plan-head">
          <div className="tp-grow">
            <h2 id="tp-plan-heading">Your plan</h2>
            <label className="tp-plan-name"><span className="sr-only">Plan name</span><input aria-label="Plan name" value={plan.title} maxLength={160} onChange={(event) => setPlan((current) => ({ ...current, title: event.target.value }))} /></label>
            <p className="tp-quiet">{plan.lessons.length} lessons · {plan.lessons.reduce((sum, lesson) => sum + lesson.duration, 0)} minutes · open a lesson to see the teaching steps</p>
          </div>
          <div className="tp-plan-actions"><button type="button" aria-pressed={reordering} onClick={() => setReordering((value) => !value)}>{reordering ? "Done reordering" : "Reorder lessons"}</button><button type="button" onClick={() => window.print()}><Icon name="print" />Print / Save as PDF</button></div>
        </div>
        {stale && <p className="tp-notice" role="status">Your class needs changed. Press “Rebuild plan” to use them. Your edits stay until you do.</p>}
        {[0, 1, 2].map((week) => <section className="tp-week" key={week} aria-label={`Week ${week + 1}`}>
          <h3>Week {week + 1}<span>{plan.lessonsPerWeek} {plan.lessonsPerWeek === 1 ? "lesson" : "lessons"} · {plan.lessons.slice(week * plan.lessonsPerWeek, (week + 1) * plan.lessonsPerWeek).reduce((sum, lesson) => sum + lesson.duration, 0)} min</span></h3>
          {plan.lessons.slice(week * plan.lessonsPerWeek, (week + 1) * plan.lessonsPerWeek).map((lesson, localIndex) => {
            const index = week * plan.lessonsPerWeek + localIndex;
            return <LessonCard key={lesson.id} lesson={lesson} index={index} count={plan.lessons.length} resources={resources} objectives={objectives} needs={needs} year={year} subjectName={subjectName} open={activeLessonId === lesson.id} onToggle={() => setActiveLessonId((current) => current === lesson.id ? null : lesson.id)} reordering={reordering} onChange={(patch) => updateLesson(lesson.id, patch)} onMove={(offset) => { setPlan((current) => ({ ...current, lessons: moveItem(current.lessons, index, offset) })); setMessage(`Lesson moved to position ${index + offset + 1}.`); }} />;
          })}
        </section>)}
      </section>}
    </div>
    {plan && <PrintablePlan plan={plan} resources={resources} />}
  </div>;
}
