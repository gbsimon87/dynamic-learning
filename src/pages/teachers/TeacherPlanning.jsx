import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { isChallengeImplemented } from "../../data/challengeAvailability";
import { getTeacherPlanningCatalogue } from "../../data/teacherPlanningResources";
import { CURRICULUM_SUBJECTS, CURRICULUM_YEARS, getSubjectName, isCurriculumAvailable, isYearAvailable } from "../../data/curriculumRegistry";
import { generateTeachingPlan, moveItem, SAMPLE_CLASS, SAMPLE_EVIDENCE } from "../../data/teacherPlanning";
import { compileClassEvidence } from "../../data/teacherClassInput";
import { resourceFit } from "../../data/teacherResourceCatalogue";
import { ResourceFinder, ResourceInformation } from "./TeacherResources";
import TeacherClassInput from "./TeacherClassInput";
import { Icon } from "./TeacherIcons";
import TeacherWorkspace, { TeacherHeader } from "./TeacherWorkspace";

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

function dateFromValue(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function dateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function mondayFor(date) {
  const copy = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  copy.setDate(copy.getDate() - ((copy.getDay() + 6) % 7));
  return copy;
}

function nextMondayValue() {
  const today = new Date();
  const monday = mondayFor(today);
  if (monday < new Date(today.getFullYear(), today.getMonth(), today.getDate())) monday.setDate(monday.getDate() + 7);
  return dateValue(monday);
}

function calendarDays(startDate) {
  const start = dateFromValue(startDate);
  // Three teaching weeks from the chosen date, including a partial calendar week.
  return Array.from({ length: 23 }, (_, index) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + index))
    .filter((date) => date.getDay() !== 0 && date.getDay() !== 6)
    .slice(0, 15)
    .map((date, index) => ({ value: dateValue(date), weekday: new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(date), week: Math.floor(index / 5) + 1, date }));
}

function displayDate(value) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" }).format(dateFromValue(value));
}

function displayTime(value) {
  if (!value) return "Time not set";
  return new Intl.DateTimeFormat("en-GB", { hour: "numeric", minute: "2-digit" }).format(new Date(2000, 0, 1, ...value.split(":").map(Number)));
}

function minutesFor(time) {
  if (!time) return null;
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function overlaps(lesson, lessons) {
  const start = minutesFor(lesson.schedule?.startTime);
  if (!lesson.schedule?.date || start === null) return false;
  const end = start + lesson.duration;
  return lessons.some((other) => {
    const otherStart = minutesFor(other.schedule?.startTime);
    return other.id !== lesson.id && other.schedule?.date === lesson.schedule.date && otherStart !== null && start < otherStart + other.duration && otherStart < end;
  });
}

function ClassPicker({ context, onChoose }) {
  return <div className="tp-picker-row">
    <label>Year group<select aria-label="Class year" value={context.year} onChange={(event) => {
      const year = Number(event.target.value);
      onChoose({ year, subject: isCurriculumAvailable(year, context.subject) ? context.subject : subjectsFor(year)[0].id });
    }}>{YEARS.map((year) => <option key={year} value={year}>Year {year}</option>)}</select></label>
    <label>Subject<select aria-label="Subject" value={context.subject} onChange={(event) => onChoose({ ...context, subject: event.target.value })}>
      {subjectsFor(context.year).map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
    </select></label>
  </div>;
}

function FocusRow({ objective, evidence, selected, onToggle }) {
  const scored = evidence.source !== "teacher" && evidence.accuracy !== null && evidence.accuracy !== undefined;
  return <li className={`tp-focus${selected ? " is-on" : ""}`}>
    <label className="tp-focus-main">
      <input type="checkbox" checked={selected} onChange={onToggle} aria-label={`Include ${objective.title.toLowerCase()}`} />
      <span className="tp-focus-title">{objective.title}{objective.subjectName && <small> · {objective.subjectName}</small>}</span>
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
  const available = resources.filter((resource) => resource.subject === lesson.subject && resource.available && !lesson.resources.some((entry) => entry.resourceId === resource.id));
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
        <span className="tp-lesson-name">{lesson.title}<small>{lesson.subjectName} · {lesson.duration} min{lesson.schedule?.date ? ` · ${displayDate(lesson.schedule.date)}${lesson.schedule.startTime ? `, ${displayTime(lesson.schedule.startTime)}` : ""}` : ""}</small></span>
        <Icon name="chevron" />
      </button>
      {reordering && <div className="tp-move">
        <button type="button" className="tp-icon-button" disabled={index === 0} aria-label={`Move lesson ${index + 1} earlier`} onClick={() => onMove(-1)}><Icon name="up" /></button>
        <button type="button" className="tp-icon-button" disabled={index === count - 1} aria-label={`Move lesson ${index + 1} later`} onClick={() => onMove(1)}><Icon name="down" /></button>
      </div>}
    </div>
    {open && <div className="tp-lesson-body" id={bodyId}>
      <div className="tp-lesson-toolbar"><p className="tp-lesson-goal">{lesson.learningGoal}</p><button type="button" onClick={() => { setFinderOpen(false); setEditing((value) => !value); }}>{editing ? "Done editing" : "Edit lesson"}</button></div>
      {!editing ? <>
        {(lesson.vocabulary?.length > 0 || lesson.briefingPath) && <div className="tp-lesson-knowledge">
          {lesson.vocabulary?.length > 0 && <p><span>Vocabulary</span>{lesson.vocabulary.join(" · ")}</p>}
          {lesson.briefingPath && <a className="tp-open" href={lesson.briefingPath} target="_blank" rel="noopener noreferrer">Topic briefing <Icon name="external" /></a>}
        </div>}
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
        <label className="tp-grow">Objective<select value={lesson.objectiveId} onChange={(event) => onChange({ objectiveId: event.target.value, subject: objectives.find((objective) => objective.id === event.target.value)?.subject, subjectName: objectives.find((objective) => objective.id === event.target.value)?.subjectName, needId: null, learningGoal: objectives.find((objective) => objective.id === event.target.value)?.goal, rationale: "Objective changed by you. Check the activities still fit." })}>
          {objectives.map((objective) => <option key={objective.id} value={objective.id}>{objective.subjectName} · {objective.title}</option>)}
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
        {finderOpen && <ResourceFinder key={lesson.objectiveId} resources={resources.filter((resource) => resource.subject === lesson.subject)} needs={needs} year={year} subjectName={subjectName} objectiveId={lesson.objectiveId} selectedResourceIds={lesson.resources.map((entry) => entry.resourceId)} onAdd={addChosenResource} />}
      </details>
      </div>}
      <details className="tp-lesson-extra"><summary>Why this lesson?</summary><p className="tp-why">{lesson.rationale}</p></details>
    </div>}
  </article>;
}

function CalendarLesson({ lesson, lessons, days, onChange }) {
  const dayIndex = days.findIndex((day) => day.value === lesson.schedule?.date);
  const conflict = overlaps(lesson, lessons);
  const moveDay = (offset) => {
    const target = dayIndex < 0 ? (offset > 0 ? 0 : days.length - 1) : dayIndex + offset;
    if (target < 0 || target >= days.length) return;
    onChange({ schedule: { ...lesson.schedule, date: days[target].value } });
  };
  return <article className={`tp-calendar-lesson${conflict ? " has-conflict" : ""}`} aria-label={`${lesson.title}, ${lesson.duration} minutes`}>
    <div className="tp-calendar-card-head"><span><Icon name="clock" />{displayTime(lesson.schedule?.startTime)}</span><span>{lesson.duration} min</span></div>
    <strong className="tp-calendar-title">{lesson.title}</strong>
    <p>{lesson.subjectName}</p>
    <details className="tp-calendar-edit"><summary>Change schedule<Icon name="chevron" /></summary><div className="tp-calendar-controls">
      <label>Day<select aria-label={`Day for ${lesson.title}`} value={lesson.schedule?.date ?? ""} onChange={(event) => onChange({ schedule: { ...lesson.schedule, date: event.target.value || null } })}>
        <option value="">Not scheduled</option>
        {days.map((day) => <option key={day.value} value={day.value}>Week {day.week} · {day.weekday} {displayDate(day.value)}</option>)}
      </select></label>
      <label>Start time<input aria-label={`Start time for ${lesson.title}`} type="time" value={lesson.schedule?.startTime ?? ""} onChange={(event) => onChange({ schedule: { ...lesson.schedule, startTime: event.target.value || null } })} /></label>
    </div>
    <div className="tp-calendar-card-foot"><span>Move a school day</span><span className="tp-calendar-move"><button type="button" disabled={dayIndex <= 0} aria-label={`Move ${lesson.title} one school day earlier`} onClick={() => moveDay(-1)}><Icon name="up" /></button><button type="button" disabled={dayIndex < 0 || dayIndex === days.length - 1} aria-label={`Move ${lesson.title} one school day later`} onClick={() => moveDay(1)}><Icon name="down" /></button></span></div>
    </details>
    {conflict && <p className="tp-calendar-warning" role="status">Overlaps another lesson.</p>}
  </article>;
}

function TeachingCalendar({ plan, onChange, onMessage }) {
  const days = calendarDays(plan.calendarStartDate);
  const scheduled = plan.lessons.filter((lesson) => days.some((day) => day.value === lesson.schedule?.date));
  const unscheduled = plan.lessons.filter((lesson) => !days.some((day) => day.value === lesson.schedule?.date));
  const updateLesson = (lessonId, patch) => onChange({ lessons: plan.lessons.map((lesson) => lesson.id === lessonId ? { ...lesson, ...patch } : lesson) });
  const changeStart = (value) => {
    if (!value) return;
    const nextDays = calendarDays(value);
    const lessons = plan.lessons.map((lesson) => {
      const index = days.findIndex((day) => day.value === lesson.schedule?.date);
      return index < 0 ? lesson : { ...lesson, schedule: { ...lesson.schedule, date: nextDays[index].value } };
    });
    onChange({ calendarStartDate: value, lessons });
    onMessage("Scheduled lessons moved with the new start date; individual times were kept.");
  };

  return <section className="tp-calendar" aria-labelledby="tp-calendar-heading">
    <h3 id="tp-calendar-heading" className="sr-only">Schedule in calendar</h3>
    <div className="tp-calendar-head"><label>Calendar start date<input aria-label="Calendar start date" type="date" value={plan.calendarStartDate} onChange={(event) => changeStart(event.target.value)} /></label><span className="tp-quiet">{scheduled.length} of {plan.lessons.length} lessons scheduled</span></div>
    {unscheduled.length > 0 && <section className="tp-unscheduled" aria-labelledby="tp-unscheduled-heading"><h4 id="tp-unscheduled-heading">Unscheduled lessons</h4><div className="tp-calendar-cards">{unscheduled.map((lesson) => <CalendarLesson key={lesson.id} lesson={lesson} lessons={plan.lessons} days={days} onChange={(patch) => updateLesson(lesson.id, patch)} />)}</div></section>}
    {[1, 2, 3].map((week) => <section className="tp-calendar-week" key={week} aria-label={`Calendar week ${week}`}><h4>Week {week}<span>{displayDate(days[(week - 1) * 5].value)} – {displayDate(days[week * 5 - 1].value)}</span></h4><div className="tp-calendar-scroll" role="region" aria-label={`Week ${week} timetable, scroll for more days`} tabIndex={0}><div className="tp-calendar-grid">{days.filter((day) => day.week === week).map((day) => <section className="tp-calendar-day" key={day.value} aria-label={`${day.weekday} ${displayDate(day.value)}`}><h5>{day.weekday}<span>{displayDate(day.value)}</span></h5><div className="tp-calendar-cards">{plan.lessons.filter((lesson) => lesson.schedule?.date === day.value).sort((a, b) => (minutesFor(a.schedule?.startTime) ?? Number.MAX_SAFE_INTEGER) - (minutesFor(b.schedule?.startTime) ?? Number.MAX_SAFE_INTEGER)).map((lesson) => <CalendarLesson key={lesson.id} lesson={lesson} lessons={plan.lessons} days={days} onChange={(patch) => updateLesson(lesson.id, patch)} />)}</div></section>)}</div></div></section>)}
  </section>;
}

function PrintablePlan({ plan, resources }) {
  return <section className="tp-print" aria-label="Printable plan" aria-hidden="true">
    <h1>{plan.title}</h1><p>Year {plan.year} {plan.subjectName} · Three weeks · {plan.lessons.length} lessons · {sourceLabel(plan.evidenceSource)}</p>
    <p>{plan.classSize ? `${plan.classSize} pupils. ` : ""}Teaching suggestions require teacher review. Class-level evidence does not establish individual pupil groups.</p>
    {plan.retrievalReason && <p><strong>Retrieval rationale:</strong> {plan.retrievalReason}</p>}
    {plan.snapshots.map((snapshot) => <p key={snapshot.objectiveId}><strong>{plan.objectives.find((objective) => objective.id === snapshot.objectiveId)?.title}:</strong> {snapshot.reason}</p>)}
    {plan.lessons.map((lesson, index) => <article key={lesson.id}>
      <h2>Week {Math.floor(index / plan.lessonsPerWeek) + 1} · Lesson {index + 1}: {lesson.title}</h2>
      <p>{lesson.schedule?.date ? `${new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long" }).format(dateFromValue(lesson.schedule.date))}${lesson.schedule.startTime ? ` · ${displayTime(lesson.schedule.startTime)}` : " · time not set"} · ` : "Not scheduled · "}{lesson.subjectName} · {lesson.duration} minutes · {lesson.learningGoal}</p>
      {lesson.vocabulary?.length > 0 && <p><strong>Key vocabulary:</strong> {lesson.vocabulary.join(", ")}</p>}
      <p><strong>Evidence:</strong> {lesson.rationale}</p>
      {[["starter", "Starter"], ["teaching", "Teaching"], ["activity", "Practical activity"], ["support", "Support"], ["stretch", "Stretch"], ["checkpoint", "Checkpoint"], ["notes", "Notes"]].map(([field, label]) => lesson[field] && <p key={field}><strong>{label}:</strong> {lesson[field]}</p>)}
      <ol>{lesson.resources.map((entry) => {
        const resource = resources.find((candidate) => candidate.id === entry.resourceId);
        return <li key={entry.resourceId}><strong>{resource?.teacherTitle ?? "Unavailable resource"}</strong> · {entry.minutes} min (estimate){resource && <><p>{resource.title}</p><p>{resourceFit(resource, lesson.objectiveId)}</p><p>{resource.does} {resource.scope}</p>{resource.limitation && <p>{resource.limitation}</p>}</>}<p>{entry.instruction}</p><p>{resource?.available ? `${window.location.origin}${resource.to}` : "Currently unavailable"}</p></li>;
      })}</ol>
    </article>)}
  </section>;
}

// A topic briefing links here with ?year=&subject=&topic= so the topic is
// already added in step 1. Invalid or unknown values fall back to the default.
function initialContext(params) {
  const year = Number(params.get("year"));
  const subject = params.get("subject");
  return YEARS.includes(year) && isCurriculumAvailable(year, subject) ? { year, subject } : { year: 3, subject: "math" };
}

function initialSeed(params, catalogue) {
  const entries = catalogue.needs.filter((need) => need.objectiveId === `${catalogue.subject}:${params.get("topic")}`).map((need) => ({ needId: need.id, priority: "teach" }));
  if (!entries.length) return null;
  try { return { entries, input: { source: "teacher", evidence: compileClassEvidence(entries, "teacher", catalogue), revision: 1 } }; }
  catch { return null; }
}

export default function TeacherPlanning() {
  const [params] = useSearchParams();
  const [context, setContext] = useState(() => initialContext(params));
  const [pendingContext, setPendingContext] = useState(null);
  const catalogue = useMemo(() => getTeacherPlanningCatalogue({ year: context.year, isBuilt: isChallengeImplemented }), [context.year]);
  const { resources, objectives, needs, year } = catalogue;
  const subjectName = getSubjectName(context.subject);
  const [seed, setSeed] = useState(() => initialSeed(params, { ...catalogue, subject: context.subject }));
  const [input, setInput] = useState(() => seed?.input ?? EMPTY_INPUT);
  const [overrides, setOverrides] = useState({});
  const [dirty, setDirty] = useState(false);
  const [lessonsPerWeek, setLessonsPerWeek] = useState(5);
  const [duration, setDuration] = useState(45);
  const [startDate, setStartDate] = useState(nextMondayValue);
  const [startTime, setStartTime] = useState("09:00");
  const [classSize, setClassSize] = useState("");
  const [plan, setPlan] = useState(null);
  const [setupOpen, setSetupOpen] = useState(true);
  const [planView, setPlanView] = useState("list");
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
  const blocker = dirty ? "Check your pasted results, then press “Use these results”." : input.source === "none" ? "Add at least one topic to get started." : !selectedIds.length ? "Include at least one topic in your plan." : sizeError ? "Class size must be a whole number from 1 to 1,000." : !startDate || !startTime ? "Choose a start date and lesson start time." : "";
  const stale = plan && plan.inputRevision !== input.revision;

  useEffect(() => {
    if (!scrollToPlan.current || !plan) return;
    scrollToPlan.current = false;
    planRef.current?.focus?.({ preventScroll: true });
    planRef.current?.scrollIntoView?.({ behavior: "smooth", block: "start" });
  }, [plan]);

  const generate = () => {
    try {
      if (blocker) throw new Error(blocker);
      const generated = generateTeachingPlan({ selectedIds, lessonsPerWeek, duration, resources, objectives, year, subject: context.subject, subjectName, evidence: input.evidence, evidenceMeta: { ...input, classSize: sizeValue ?? input.classSize ?? null } });
      const days = calendarDays(startDate);
      const lessons = generated.lessons.map((lesson, index) => ({ ...lesson, schedule: { date: days[Math.floor(index / lessonsPerWeek) * 5 + index % lessonsPerWeek].value, startTime } }));
      const draft = { ...generated, lessons, calendarStartDate: startDate };
      scrollToPlan.current = true;
      setSetupOpen(false); setPlan(draft); setPlanView("list"); setActiveLessonId(null); setReordering(false); setReplacement(false);
      setMessage(`Plan ready: ${draft.lessons.length} lessons over three weeks.`);
    } catch (error) { setMessage(error.message); setReplacement(false); }
  };
  const switchContext = (next) => {
    setSetupOpen(true); setContext(next); setPendingContext(null); setPlan(null); setPlanView("list"); setInput(EMPTY_INPUT); setActiveLessonId(null); setReordering(false); setSeed(null);
    setOverrides({}); setDirty(false); setReplacement(false); setMessage("");
  };
  const chooseContext = (next) => {
    if (next.year === context.year && next.subject === context.subject) { setPendingContext(null); return; }
    if (next.year === context.year) { setContext(next); setPendingContext(null); return; }
    if (input.source !== "none" || dirty || plan) setPendingContext(next);
    else switchContext(next);
  };
  const applyInput = (bundle) => {
    setInput((current) => ({ ...bundle, revision: current.revision + 1 }));
    if (bundle.source !== input.source || bundle.source === "sample") setOverrides({});
    setReplacement(false);
  };
  const updateLesson = (id, patch) => setPlan((current) => ({ ...current, lessons: current.lessons.map((lesson) => lesson.id === id ? { ...lesson, ...patch } : lesson) }));
  const sample = year === 3 ? () => applyInput({ source: "sample", evidence: SAMPLE_EVIDENCE.map((row) => ({ ...row, objectiveId: `math:${row.objectiveId}` })), classSize: SAMPLE_CLASS.pupils.length }) : undefined;

  return <TeacherWorkspace>
    <div className="tp-screen">
      <TeacherHeader title="Lesson planner" note={<><Icon name="print" /><span>Unsaved · Print to keep a copy</span></>} />
      <details className="tp-setup" open={setupOpen} onToggle={(event) => setSetupOpen(event.currentTarget.open)}>
        <summary className="tp-setup-summary"><span><Icon name="sliders" /><strong>Plan settings</strong><span className="tp-setup-context">Year {year} · {subjectName}{plan ? ` · ${selectedIds.length} topics` : ""}</span></span><Icon name="chevron" /></summary>
        <div className="tp-setup-content">
        <ClassPicker context={context} onChoose={chooseContext} />
        {pendingContext && <div className="tp-confirm" role="group" aria-label="Change curriculum confirmation">
          <p>Switch to <strong>Year {pendingContext.year} {getSubjectName(pendingContext.subject)}</strong>? This clears your topics{plan ? " and plan" : ""}.</p>
          <div className="tp-actions">
            <button type="button" onClick={() => setPendingContext(null)}>Keep current curriculum</button>
            {plan && <button type="button" onClick={() => window.print()}><Icon name="print" />Print plan first</button>}
            <button type="button" className="tp-primary" onClick={() => switchContext(pendingContext)}>Change curriculum and start again</button>
          </div>
        </div>}
      <div className="tp-setup-grid">
      <div className="tp-topics-panel">
      <TeacherClassInput topicSelection={{ selectedIds, objectives, onToggle: (id) => setOverrides((current) => ({ ...current, [id]: !selectedIds.includes(id) })) }} key={year} searchSubject={context.subject} initialEntries={seed?.entries} resources={resources} needs={needs} onApply={applyInput} onDirty={(value) => { setDirty(value); if (value) setReplacement(false); }} onSample={sample} />

      {input.source !== "teacher" && focusObjectives.length > 0 && <section className="tp-step tp-evidence-review" aria-labelledby="tp-focus-heading">
        <h3 id="tp-focus-heading">Selected topics <span className="tp-topic-count">{selectedIds.length} selected</span></h3>
          {input.source === "sample" && <p className="tp-quiet">All eight pupils and results are fictional.</p>}
          <ul className="tp-focus-list">{focusObjectives.map((objective) => <FocusRow key={objective.id} objective={objective} evidence={evidenceFor(objective.id)} selected={selectedIds.includes(objective.id)} onToggle={() => setOverrides((current) => ({ ...current, [objective.id]: !selectedIds.includes(objective.id) }))} />)}</ul>
      </section>}
      </div>

      <section className="tp-step tp-build-panel" aria-labelledby="tp-build-heading">
        <h2 id="tp-build-heading" className="sr-only">Schedule settings</h2>
        <div className="tp-build-controls">
          <fieldset className="tp-seg tp-seg--plain"><legend>Lessons per week</legend>
            {[1, 2, 3, 4, 5].map((value) => <label key={value}><input type="radio" name="tp-lessons" value={value} checked={lessonsPerWeek === value} onChange={() => setLessonsPerWeek(value)} /><span>{value}</span></label>)}
          </fieldset>
          <label>Minutes per lesson<select value={duration} onChange={(event) => setDuration(Number(event.target.value))}>{DURATIONS.map((minutes) => <option key={minutes}>{minutes}</option>)}</select></label>
          <label>Start date<input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} /></label>
          <label>Lesson start time<input type="time" value={startTime} onChange={(event) => setStartTime(event.target.value)} /></label>
          <details className="tp-class-options"><summary>Class size (optional)<Icon name="chevron" /></summary><label>Class size<input type="number" min={1} max={1000} inputMode="numeric" value={classSize} aria-invalid={sizeError || undefined} onChange={(event) => setClassSize(event.target.value)} /></label></details>
        </div>
        <div className="tp-build-summary"><strong>{lessonsPerWeek * 3} lessons</strong><span>over 3 weeks</span></div>
        <div className="tp-go">
          <button className="tp-primary tp-big" type="button" disabled={Boolean(blocker)} aria-describedby="tp-build-help" onClick={() => plan ? setReplacement(true) : generate()}>{plan ? "Rebuild plan" : "Create three-week plan"}</button>
          <p className="tp-quiet" id="tp-build-help">{blocker || "Weekends skipped."}</p>
        </div>
        {replacement && <div className="tp-confirm" role="group" aria-label="Replace draft confirmation"><p>Replace your plan? Your edits will be lost.</p><div className="tp-actions"><button type="button" onClick={() => setReplacement(false)}>Keep current plan</button><button type="button" className="tp-primary" onClick={generate}>Replace plan</button></div></div>}
      </section>
      </div></div>
      </details>
      <p role="status" className={message.startsWith("Plan ready:") ? "sr-only" : "tp-status"}>{message}</p>

      {plan && <section className="tp-plan" ref={planRef} tabIndex={-1} aria-labelledby="tp-plan-heading">
        <div className="tp-plan-head">
          <div className="tp-grow">
            <h2 id="tp-plan-heading" className="sr-only">Your plan</h2>
            <label className="tp-plan-name"><span className="sr-only">Plan name</span><input aria-label="Plan name" value={plan.title} maxLength={160} onChange={(event) => setPlan((current) => ({ ...current, title: event.target.value }))} /></label>
            <p className="tp-quiet">{sourceLabel(plan.evidenceSource)}</p>
          </div>
          <button type="button" className="tp-primary" onClick={() => window.print()}><Icon name="print" />Print / Save as PDF</button>
        </div>
        <div className="tp-plan-toolbar"><div className="tp-view-switch" role="group" aria-label="Plan view"><button type="button" aria-pressed={planView === "list"} onClick={() => setPlanView("list")}><Icon name="list" />Lesson list</button><button type="button" aria-pressed={planView === "calendar"} onClick={() => { setPlanView("calendar"); setReordering(false); }}><Icon name="calendar" />Calendar</button></div>{planView === "list" && <button type="button" aria-pressed={reordering} onClick={() => setReordering((value) => !value)}>{reordering ? "Done reordering" : "Reorder lessons"}</button>}<span className="tp-plan-total">{plan.lessons.length} lessons · {plan.lessons.reduce((sum, lesson) => sum + lesson.duration, 0)} min</span></div>
        {stale && <p className="tp-notice" role="status">Your class needs changed. Press “Rebuild plan” to use them. Your edits stay until you do.</p>}
        {planView === "calendar" ? <TeachingCalendar plan={plan} onChange={(patch) => { if (patch.calendarStartDate) setStartDate(patch.calendarStartDate); setPlan((current) => ({ ...current, ...patch })); }} onMessage={setMessage} /> : <div className="tp-weeks">{[0, 1, 2].map((week) => <section className="tp-week" key={week} aria-label={`Week ${week + 1}`}>
          <h3>Week {week + 1}</h3>
          {plan.lessons.slice(week * plan.lessonsPerWeek, (week + 1) * plan.lessonsPerWeek).map((lesson, localIndex) => {
            const index = week * plan.lessonsPerWeek + localIndex;
            return <LessonCard key={lesson.id} lesson={lesson} index={index} count={plan.lessons.length} resources={resources} objectives={objectives.filter((objective) => objective.subject === lesson.subject)} needs={needs.filter((need) => need.subject === lesson.subject)} year={year} subjectName={lesson.subjectName} open={activeLessonId === lesson.id} onToggle={() => setActiveLessonId((current) => current === lesson.id ? null : lesson.id)} reordering={reordering} onChange={(patch) => updateLesson(lesson.id, patch)} onMove={(offset) => { setPlan((current) => ({ ...current, lessons: moveItem(current.lessons, index, offset) })); setMessage(`Lesson moved to position ${index + offset + 1}.`); }} />;
          })}
        </section>)}</div>}
      </section>}
    </div>
    {plan && <PrintablePlan plan={plan} resources={resources} />}
  </TeacherWorkspace>;
}
