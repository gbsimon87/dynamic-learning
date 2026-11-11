import { useId } from "react";
import PracticeCurriculumModel from "./PracticeCurriculumModel";
import PracticeMathModel from "./PracticeMathModel";
import PracticeDataModel from "./PracticeDataModel";
import PracticeSourceModel from "./PracticeSourceModel";
import { practiceTopic } from "../../data/teacherPractice/catalogue";

// Monochrome SVGs keep the same meaning on screen and on a photocopy.
export function PracticeModel({ model }) {
  const hatchId = useId();
  if (!model) return null;
  if (model.type === "curriculum-source") return <PracticeCurriculumModel model={model} />;
  if (model.type === "bar") return <svg className="pp-model pp-bar" viewBox="0 0 360 46" role="img" aria-label={`Bar divided into ${model.parts} equal parts; ${model.shaded} shaded`}>
    <defs><pattern id={hatchId} width="6" height="6" patternUnits="userSpaceOnUse"><path d="M-1 1 1-1M0 6 6 0M5 7 7 5" stroke="currentColor" strokeWidth="1" /></pattern></defs>
    {Array.from({ length: model.parts }, (_, n) => <rect key={n} x={n * 35 + 4} y="4" width="35" height="34" fill={n < model.shaded ? `url(#${hatchId})` : "none"} stroke="currentColor" />)}
  </svg>;
  if (model.type === "sequence") return <svg className="pp-model pp-sequence" viewBox="0 0 360 55" role="img" aria-label={`Number line: ${model.terms.join(", ")}`}>
    <line x1="22" x2="338" y1="18" y2="18" stroke="currentColor" />
    {model.terms.map((term, n) => <g key={n}><line x1={22 + n * 79} x2={22 + n * 79} y1="11" y2="25" stroke="currentColor" /><text x={22 + n * 79} y="47" textAnchor="middle" fill="currentColor" fontSize="16">{term}</text></g>)}
  </svg>;
  if (model.type === "column") return <div className="pp-column" role="img" aria-label={`${model.a} ${model.operation} ${model.b}, set out in columns`}>
    <span>H</span><span>T</span><span>O</span>
    {String(model.a).padStart(3, " ").split("").map((digit, n) => <b key={`a${n}`}>{digit}</b>)}
    <span className="pp-column-op">{model.operation}</span>
    {String(model.b).padStart(3, " ").split("").map((digit, n) => <b key={`b${n}`}>{digit}</b>)}
    <span className="pp-column-rule" />
  </div>;
  if (model.type === "counters") return <svg className="pp-model pp-counters" viewBox={`0 0 360 ${model.total / model.groupSize * 32 + 4}`} role="img" aria-label={`${model.total} counters, in equal groups of ${model.groupSize}`}>
    {Array.from({ length: model.total / model.groupSize }, (_, group) => <g key={group}>
      <rect x="2" y={group * 32 + 2} width={model.groupSize * 32} height="28" rx="4" stroke="currentColor" fill="none" strokeDasharray="3 3" />
      {Array.from({ length: model.groupSize }, (_, n) => <circle key={n} cx={18 + n * 32} cy={group * 32 + 16} r="8" stroke="currentColor" fill="none" />)}
    </g>)}
  </svg>;
  if (model.type === "blocks") return <svg className="pp-model pp-blocks" viewBox="0 0 360 145" role="img" aria-label={`${model.hundreds} hundreds, ${model.tens} tens and ${model.ones} ones in base-ten blocks`}>
    {["hundreds", "tens", "ones"].map((place, col) => <g key={place} transform={`translate(${col * 120 + 4},0)`}>
      <text x="0" y="14" fill="currentColor" fontSize="13">{place}</text>
      {Array.from({ length: model[place] }, (_, n) => {
        const width = place === "hundreds" ? 30 : 3;
        const height = place === "ones" ? 3 : 30;
        return <g key={n} transform={`translate(${(n % 3) * 36},${26 + Math.floor(n / 3) * 37})`}>
          <rect width={width} height={height} fill="none" stroke="currentColor" />
          {place !== "ones" && Array.from({ length: 9 }, (_, j) => <g key={j}><line x1="0" x2={width} y1={(j + 1) * 3} y2={(j + 1) * 3} stroke="currentColor" strokeWidth=".4" />{place === "hundreds" && <line x1={(j + 1) * 3} x2={(j + 1) * 3} y1="0" y2={height} stroke="currentColor" strokeWidth=".4" />}</g>)}
        </g>;
      })}
    </g>)}
  </svg>;
  if (["clock", "number-line", "ruler", "jug", "dial-scale", "drawing-grid", "solid", "polygon", "angle", "angles", "turn", "array", "perimeter"].includes(model.type)) return <PracticeMathModel model={model} />;
  if (["geography-source", "history-source"].includes(model.type)) return <PracticeSourceModel model={model} />;
  return <PracticeDataModel model={model} />;
}

export default function PracticePaper({ title, instructions, children, number, total, subjectLabel = "Maths", year = 3, answers = false }) {
  return <article className={`pp-page${answers ? " pp-answer-page" : ""}`} aria-label={`${answers ? "Answers" : "Pupil sheet"}, page ${number} of ${total}`}>
    <header className="pp-paper-header">
      <p className="pp-paper-kicker">Year {year} · {subjectLabel}{answers ? " · Teacher answer key" : ""}</p>
      <h2>{title.trim() || `Year ${year} practice`}{answers && " — answers"}</h2>
      {!answers && <><div className="pp-name-line"><span>Name: ____________________</span><span>Date: ______________</span></div><p className="pp-instructions">{instructions.trim()}</p></>}
    </header>
    <div className="pp-paper-body">{children}</div>
    <footer className="pp-paper-footer"><span>Learn with Bix · {answers ? "Answer key" : "Practice sheet"}</span><span>{number} / {total}</span></footer>
  </article>;
}

export function PracticeAnswer({ question, number }) {
  return <li><span className="pp-answer-number">{number}.</span><div><p className="pp-answer-topic">{practiceTopic(question.topicId).name}</p><p>{question.prompt}</p><p className="pp-answer-value">{question.answer}</p><p>{question.reason}</p></div></li>;
}
