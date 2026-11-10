import { useMemo, useState } from "react";
import { CURRICULUM_SUBJECTS, CURRICULUM_YEARS, isCurriculumAvailable, isYearAvailable, loadCurriculum } from "../../data/curriculumRegistry";
import { BANDS, BEHAVIOURS, PRONOUNS, TARGETS, buildReport, countReport } from "../../data/teacherReports";
import TeacherWorkspace, { TeacherHeader } from "./TeacherWorkspace";
import "./TeacherTools.css";

const YEARS = CURRICULUM_YEARS.filter(isYearAvailable);
const MAX_BEHAVIOURS = 3;
const emptyPupil = () => ({ name: "", pronoun: "they", subjects: {}, behaviours: [], target: "", variant: 0 });

function FieldLabel({ children, optional = false }) {
  return <span className="tt-label">{children}{optional && <> <span className="tp-optional">(optional)</span></>}</span>;
}

function TopicSelect({ label, optional, wide, value, categories, onChange }) {
  return <label className={wide ? "tt-span-all" : undefined}><FieldLabel optional={optional}>{label}</FieldLabel>
    <select value={value} onChange={(event) => onChange(event.target.value)}>
      <option value="">None</option>
      {categories.map((category) => <optgroup key={category.id} label={category.title}>
        {category.topics.map((topic) => <option key={topic.id} value={topic.name}>{topic.name}</option>)}
      </optgroup>)}
    </select>
  </label>;
}

function SubjectRow({ subject, year, value, onChange }) {
  const categories = useMemo(() => loadCurriculum(year, subject.id) ?? [], [year, subject.id]);
  const band = value?.band ?? "none";
  const strengths = value?.strengths ?? ["", ""];
  return <fieldset className={`tt-subject${band !== "none" ? " is-on" : ""}`}>
    <legend>{subject.name}</legend>
    <div className="tt-segments tt-bands" role="group" aria-label={`${subject.name} judgement`}>
      {BANDS.map((option) => <button key={option.id} type="button" className={option.id === "none" ? "tt-band-none" : undefined} aria-pressed={band === option.id} onClick={() => onChange({ ...value, band: option.id })}>{option.label}</button>)}
    </div>
    {band !== "none" && <div className="tt-subject-detail">
      <TopicSelect label="Strength" value={strengths[0]} categories={categories} onChange={(topic) => onChange({ ...value, band, strengths: [topic, strengths[1]] })} />
      <TopicSelect label="Another strength" optional value={strengths[1]} categories={categories} onChange={(topic) => onChange({ ...value, band, strengths: [strengths[0], topic] })} />
      <TopicSelect label="Next step" optional wide value={value?.nextStep ?? ""} categories={categories} onChange={(topic) => onChange({ ...value, band, nextStep: topic })} />
    </div>}
  </fieldset>;
}

export default function TeacherReports() {
  const [year, setYear] = useState(3);
  const [pupil, setPupil] = useState(emptyPupil);
  const [edited, setEdited] = useState(null);
  const [status, setStatus] = useState("");
  const subjects = CURRICULUM_SUBJECTS.filter((subject) => isCurriculumAvailable(year, subject.id));
  const draft = useMemo(() => buildReport({
    name: pupil.name, pronoun: pupil.pronoun, year, behaviours: pupil.behaviours, target: pupil.target || null, variant: pupil.variant,
    subjects: subjects.map((subject) => ({ name: subject.name, band: pupil.subjects[subject.id]?.band ?? "none", strengths: pupil.subjects[subject.id]?.strengths ?? [], nextStep: pupil.subjects[subject.id]?.nextStep || null })),
  }), [pupil, year, subjects]);
  const text = edited ?? draft;
  const { characters, words } = countReport(text);
  const reported = Object.values(pupil.subjects).some((subject) => subject.band && subject.band !== "none");
  const update = (patch) => { setPupil((current) => ({ ...current, ...patch })); setStatus(""); };
  const behavioursFull = pupil.behaviours.length >= MAX_BEHAVIOURS;
  const toggleBehaviour = (id) => update({ behaviours: pupil.behaviours.includes(id) ? pupil.behaviours.filter((entry) => entry !== id) : [...pupil.behaviours, id].slice(-MAX_BEHAVIOURS) });
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setStatus("Copied. Paste it into your school's report system."); }
    catch { setStatus("Couldn't copy automatically. Select the text and copy it instead."); }
  };
  const nextPupil = () => { setPupil(emptyPupil()); setEdited(null); setStatus("Cleared for the next pupil. Your year group is kept."); };

  return <TeacherWorkspace className="teacher-tools">
    <TeacherHeader title="Report comment builder" note="Unsaved · Copy each comment before leaving" />
    <div className="tt-report">
      <div className="tt-report-form tw-panel">
        <section className="tt-section" aria-labelledby="pupil-heading">
          <h2 id="pupil-heading" className="sr-only">Pupil</h2>
          <div className="tt-row">
            <label>Year group<select value={year} onChange={(event) => { setYear(Number(event.target.value)); update({ subjects: {} }); }}>
              {YEARS.map((option) => <option key={option} value={option}>Year {option}</option>)}
            </select></label>
            <label className="tp-grow"><FieldLabel optional>First name</FieldLabel><input value={pupil.name} maxLength={40} autoComplete="off" spellCheck={false} onChange={(event) => update({ name: event.target.value })} /></label>
            <fieldset><legend>Pronouns</legend><div className="tt-segments">
              {Object.entries(PRONOUNS).map(([id, words]) => <button key={id} type="button" aria-pressed={pupil.pronoun === id} onClick={() => update({ pronoun: id })}>{words.label}</button>)}
            </div></fieldset>
          </div>
        </section>
        <section className="tt-section" aria-labelledby="subjects-heading">
          <h2 id="subjects-heading">Subjects</h2>
          {subjects.map((subject) => <SubjectRow key={`${year}-${subject.id}`} subject={subject} year={year} value={pupil.subjects[subject.id]} onChange={(value) => update({ subjects: { ...pupil.subjects, [subject.id]: value } })} />)}
        </section>
        <section className="tt-section" aria-labelledby="behaviour-heading">
          <h2 id="behaviour-heading">As a learner</h2>
          <p className="tp-quiet" aria-live="polite">{pupil.behaviours.length} of {MAX_BEHAVIOURS} selected{behavioursFull ? " · Unselect one to swap" : ""}</p>
          <div className="tp-chips" role="group" aria-label="Learning behaviours">
            {BEHAVIOURS.map((behaviour) => {
              const chosen = pupil.behaviours.includes(behaviour.id);
              return <button key={behaviour.id} type="button" aria-pressed={chosen} disabled={behavioursFull && !chosen} onClick={() => toggleBehaviour(behaviour.id)}>{behaviour.label}</button>;
            })}
          </div>
          <label className="tt-target"><FieldLabel optional>Target for next year</FieldLabel>
            <select value={pupil.target} onChange={(event) => update({ target: event.target.value })}>
              <option value="">None</option>
              {TARGETS.map((target) => <option key={target.id} value={target.id}>{target.label}</option>)}
            </select>
          </label>
        </section>
      </div>
      <section className="tt-report-draft" aria-labelledby="draft-heading">
        <h2 id="draft-heading">Draft comment</h2>
        {!reported && <p className="tp-quiet">Choose a subject judgement to begin.</p>}
        <label className="tt-visually-hidden" htmlFor="report-draft">Draft comment</label>
        <textarea id="report-draft" rows={14} value={text} onChange={(event) => { setEdited(event.target.value); setStatus(""); }} />
        <p className="tp-quiet tt-count" aria-live="polite">{characters} characters · {words} words</p>
        {edited !== null && <p className="tp-hint">You've edited the draft, so new choices won't change it. <button type="button" className="tp-link" onClick={() => setEdited(null)}>Rebuild from my choices</button></p>}
        <div className="tt-actions tt-draft-actions">
          <button type="button" className="tp-primary" onClick={copy}>Copy comment</button>
          <button type="button" disabled={edited !== null} onClick={() => update({ variant: pupil.variant + 1 })}>Reword</button>
          <button type="button" onClick={nextPupil}>Next pupil</button>
        </div>
        <p role="status" className="tt-status">{status}</p>
      </section>
    </div>
  </TeacherWorkspace>;
}
