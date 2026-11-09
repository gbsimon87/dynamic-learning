import { useMemo, useState } from "react";
import { CURRICULUM_SUBJECTS, CURRICULUM_YEARS, isCurriculumAvailable, isYearAvailable, loadCurriculum } from "../../data/curriculumRegistry";
import { BANDS, BEHAVIOURS, PRONOUNS, TARGETS, buildReport, countReport } from "../../data/teacherReports";
import { TeacherBack } from "./TeacherHub";
import "./TeacherPlanning.css";
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

  return <div className="teacher-planning teacher-tools tt-wide">
    <header className="tp-header">
      <TeacherBack />
      <h1>Report comment builder</h1>
      <p className="tp-lede">Make your judgements, and a draft comment appears as you go. Edit it, copy it into your report system, then move on to the next pupil.</p>
      <p className="tp-notice">Nothing you type here is saved or sent anywhere. Copy each comment before you clear it or leave the page.</p>
    </header>
    <div className="tt-report">
      <div className="tt-report-form">
        <section className="tt-section" aria-labelledby="pupil-heading">
          <h2 id="pupil-heading"><span className="tp-step-n" aria-hidden="true">1</span>Pupil</h2>
          <fieldset className="tt-field">
            <legend>Year group</legend>
            <div className="tp-chips">
              {YEARS.map((option) => <button key={option} type="button" aria-pressed={year === option} onClick={() => { setYear(option); update({ subjects: {} }); }}>Year {option}</button>)}
            </div>
          </fieldset>
          <div className="tt-row">
            <label className="tp-grow"><FieldLabel optional>First name</FieldLabel><input value={pupil.name} maxLength={40} autoComplete="off" spellCheck={false} onChange={(event) => update({ name: event.target.value })} /></label>
            <fieldset><legend>Pronouns</legend><div className="tt-segments">
              {Object.entries(PRONOUNS).map(([id, words]) => <button key={id} type="button" aria-pressed={pupil.pronoun === id} onClick={() => update({ pronoun: id })}>{words.label}</button>)}
            </div></fieldset>
          </div>
        </section>
        <section className="tt-section" aria-labelledby="subjects-heading">
          <h2 id="subjects-heading"><span className="tp-step-n" aria-hidden="true">2</span>Subjects</h2>
          <p className="tp-quiet">Choose a judgement for each subject you report on. Strengths and next steps come from the Year {year} curriculum.</p>
          {subjects.map((subject) => <SubjectRow key={`${year}-${subject.id}`} subject={subject} year={year} value={pupil.subjects[subject.id]} onChange={(value) => update({ subjects: { ...pupil.subjects, [subject.id]: value } })} />)}
        </section>
        <section className="tt-section" aria-labelledby="behaviour-heading">
          <h2 id="behaviour-heading"><span className="tp-step-n" aria-hidden="true">3</span>As a learner</h2>
          <p className="tp-quiet" aria-live="polite">Choose up to {MAX_BEHAVIOURS}. {behavioursFull ? `${MAX_BEHAVIOURS} chosen. Unselect one to swap it.` : `${pupil.behaviours.length} chosen.`}</p>
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
        {!reported && <p className="tp-quiet">Choose a judgement for at least one subject to add it to the comment.</p>}
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
  </div>;
}
