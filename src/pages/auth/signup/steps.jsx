import { CHILD_NAME_MAX } from "../../../data/childFields";
import { CURRICULUM_SUBJECTS, getSubjectName } from "../../../data/curriculumRegistry";
import { EXPLORING, birthYearOptions, subjectsForYear } from "../../../data/signupFlow";
import ChoiceCards from "./parts/ChoiceCards";
import YearWheel from "./parts/YearWheel";
import { AvatarPicker, ColourPicker } from "../ProfilePickers";
import "../ProfileBuilder.css";

const YEAR_OPTIONS = [
  { id: "1", title: "Year 1", blurb: "usually age 5–6" },
  { id: "2", title: "Year 2", blurb: "usually age 6–7" },
  { id: "3", title: "Year 3", blurb: "usually age 7–8" },
  { id: "4", title: "Year 4", blurb: "usually age 8–9" },
  { id: "none", title: "Not sure", blurb: "You can change it later" },
];

export function BirthYearBody({ draft, currentYear, onPick }) {
  return <YearWheel years={birthYearOptions(currentYear)} value={draft.birthYear} onChange={onPick} labelledBy="sf-heading" />;
}

export function GateBody({ onRestart }) {
  return (
    <>
      <p className="auth-intro">Ask a grown-up to sign up for you — they can add you to their account in a couple of minutes.</p>
      <button type="button" className="auth-btn auth-btn-quiet" onClick={onRestart}>Start again</button>
    </>
  );
}

export function WhoBody({ draft, onPick }) {
  return (
    <ChoiceCards
      label="Who's going to learn?"
      value={draft.learnFor}
      onChoose={onPick}
      options={[
        { id: "me", icon: "🙋", title: "Me", blurb: "I'm learning myself" },
        { id: "children", icon: "👨‍👩‍👧", title: "My children", blurb: "I'm setting this up for my family" },
      ]}
    />
  );
}

export function CountBody({ draft, onPick }) {
  const count = draft.learners.length;
  return (
    <ChoiceCards
      label="How many children?"
      value={count >= 4 ? "4" : count ? String(count) : null}
      onChoose={(id) => onPick(Number(id))}
      options={[
        { id: "1", icon: "🧒", title: "1" },
        { id: "2", icon: "👧👦", title: "2" },
        { id: "3", icon: "👧👦🧒", title: "3" },
        { id: "4", icon: "🎉", title: "4 or more", blurb: "Add more on the summary" },
      ]}
    />
  );
}

export function NameBody({ learner, error, onName, onSubmit }) {
  return (
    <form className="auth-form" onSubmit={(event) => { event.preventDefault(); onSubmit(); }} noValidate>
      <div className="auth-field">
        <label className="auth-label" htmlFor="sf-name">Nickname</label>
        <input
          id="sf-name"
          className={`auth-input ${error ? "invalid" : ""}`}
          value={learner.name}
          onChange={(event) => onName(event.target.value)}
          autoComplete="off"
          autoCapitalize="words"
          enterKeyHint="next"
          maxLength={CHILD_NAME_MAX * 2}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "sf-name-error" : "sf-name-hint"}
          autoFocus
        />
        {error ? (
          <p className="auth-error" id="sf-name-error" role="alert">{error}</p>
        ) : (
          <p className="auth-hint" id="sf-name-hint">No surname needed.</p>
        )}
      </div>
    </form>
  );
}

export function YearBody({ learner, label, onPick }) {
  const value = learner.yearGroup === undefined ? null : learner.yearGroup === null ? "none" : String(learner.yearGroup);
  return <ChoiceCards label={label} value={value} options={YEAR_OPTIONS} onChoose={(id) => onPick(id === "none" ? null : Number(id))} />;
}

export function LookBody({ learner, onAvatar, onColour }) {
  return (
    <div className="pb-pickers">
      <p className="pb-label">Pick a picture</p>
      <AvatarPicker value={learner.avatar} onChange={onAvatar} />
      <p className="pb-label">Pick a colour</p>
      <ColourPicker value={learner.colour} onChange={onColour} />
    </div>
  );
}

export function SubjectsBody({ learner, label, onToggle }) {
  const options = [
    ...subjectsForYear(learner.yearGroup).map((id) => {
      const subject = CURRICULUM_SUBJECTS.find((s) => s.id === id);
      return { id, icon: subject?.icon, title: getSubjectName(id) };
    }),
    { id: EXPLORING, icon: "🧭", title: "Just exploring" },
  ];
  const value = Array.isArray(learner.subjects) ? (learner.subjects.length ? learner.subjects : [EXPLORING]) : [];
  return <ChoiceCards label={label} multiple value={value} options={options} onChoose={onToggle} />;
}

export function SummaryBody({ draft, onEdit, onAdd, canAdd }) {
  return (
    <>
      <ul className="sf-summary">
        {draft.learners.map((learner, index) => (
          <li key={index} className="sf-summary-card">
            <span className="sf-family-face" style={learner.colour ? { "--sf-face": `var(${learner.colour})` } : undefined} aria-hidden="true">
              {learner.avatar}
            </span>
            <span>
              <strong>{learner.name.trim()}</strong>
              <br />
              {learner.yearGroup ? `Year ${learner.yearGroup}` : "Year not set"}
              {" · "}
              {learner.subjects?.length ? learner.subjects.map(getSubjectName).join(", ") : "Just exploring"}
            </span>
            <button type="button" className="auth-btn auth-btn-quiet" onClick={() => onEdit(index)} aria-label={`Edit ${learner.name.trim()}`}>
              Edit
            </button>
          </li>
        ))}
      </ul>
      {canAdd && (
        <button type="button" className="auth-btn auth-btn-quiet" onClick={onAdd}>+ Add another child</button>
      )}
    </>
  );
}
