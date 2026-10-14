/**
 * A worked example on the lesson screen. Every shape is drawn from data in
 * src/data/lessons (see lintLessons.js for the fields), and every picture
 * carries its meaning in digits and words too, never colour alone.
 */
const OPERATORS = new Set(["+", "−", "-", "×", "÷", "=", "<", ">"]);

function Equation({ parts }) {
  return <p className="lesson-eq">{parts.map((part, i) =>
    <span key={i} className={OPERATORS.has(part) ? "lesson-eq-op" : "lesson-eq-tile"}>{part}</span>)}</p>;
}

function Column({ top, bottom, op, answer }) {
  const width = Math.max(String(top).length, String(bottom).length, String(answer).length);
  const cells = (value) => String(value).padStart(width, " ").split("");
  const row = (value, sign = "") => <div className="lesson-col-row"><span className="lesson-col-sign">{sign}</span>
    {cells(value).map((d, i) => <span key={i} className="lesson-col-cell">{d.trim()}</span>)}</div>;
  return <div className="lesson-col" role="img" aria-label={`${top} ${op} ${bottom} = ${answer}, written in columns`}>
    {row(top)}{row(bottom, op)}<div className="lesson-col-line" />{row(answer)}
  </div>;
}

function Steps({ steps }) {
  return <ol className="lesson-steps">{steps.map((step, i) =>
    <li key={i}><b>{i + 1}</b><span>{step}</span></li>)}</ol>;
}

function Jumps({ terms, step }) {
  return <ol className="lesson-jumps" aria-label={`Counting ${terms.join(", ")}`}>
    {terms.map((term, i) => <li key={i}>
      {i > 0 && step && <span className="lesson-jump-step" aria-hidden="true">{step}</span>}
      <span className="lesson-jump-term">{term}</span>
    </li>)}
  </ol>;
}

function Bars({ bars }) {
  return <div className="lesson-bars">{bars.map((bar, b) =>
    <div key={b} className="lesson-bar-row">
      <div className="lesson-bar" role="img" aria-label={`${bar.shaded} of ${bar.parts} equal parts shaded`}>
        {Array.from({ length: bar.parts }, (_, i) => <span key={i} className={i < bar.shaded ? "is-shaded" : ""} />)}
      </div>
      <b className="lesson-bar-label">{bar.label ?? `${bar.shaded}/${bar.parts}`}</b>
    </div>)}
  </div>;
}

function Groups({ groups, label }) {
  return <div className="lesson-groups" role="img" aria-label={label}>
    {groups.map((group, g) => <span key={g} className="lesson-group">{group.join("")}</span>)}
  </div>;
}

function Table({ headers, rows }) {
  return <table className="lesson-table">
    <thead><tr>{headers.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
    <tbody>{rows.map((row, r) => <tr key={r}>{row.map((cell, c) =>
      c === 0 ? <th key={c} scope="row">{cell}</th> : <td key={c}>{cell}</td>)}</tr>)}</tbody>
  </table>;
}

/** "**word**" marks the part the lesson is about; it is a <mark>, so it is announced, not just coloured. */
function Sentence({ text }) {
  return <p className="lesson-sentence">{text.split(/\*\*(.+?)\*\*/).map((part, i) =>
    i % 2 ? <mark key={i} className="lesson-mark">{part}</mark> : part)}</p>;
}

function Fix({ wrong, right }) {
  return <div className="lesson-fix">
    <p className="lesson-fix-row is-wrong"><b aria-hidden="true">✗</b><span><span className="lesson-fix-tag">Not this:</span> <s>{wrong}</s></span></p>
    <p className="lesson-fix-row is-right"><b aria-hidden="true">✓</b><span><span className="lesson-fix-tag">Write this:</span> {right}</span></p>
  </div>;
}

const SHAPES = { equation: Equation, column: Column, steps: Steps, jumps: Jumps, bar: Bars, groups: Groups, table: Table, sentence: Sentence, fix: Fix };

export default function LessonExample({ example }) {
  const Shape = SHAPES[example.type];
  return <figure className="lesson-example">
    <figcaption className="lesson-example-title">{example.title}</figcaption>
    {Shape && <Shape {...example} />}
    {example.note && <p className="lesson-example-note">{example.note}</p>}
  </figure>;
}
