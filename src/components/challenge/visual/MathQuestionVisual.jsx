import { mathQuestionModel } from "../../../data/challenges/questionVisuals";
import ScrollableTable from "../../ui/ScrollableTable";
import "./question-visuals.css";

/** Givens as manipulable-looking models; the computed answer stays unknown. */
export default function MathQuestionVisual({ question }) {
  const model = mathQuestionModel(question);
  if (!model) return null;
  return <figure className="question-visual math-question-visual">
    <figcaption>A picture of the given numbers</figcaption>
    {model.type === "fractions" && <div className="qv-fractions">{model.fractions.map(f => <div key={f.label}>
      <b>{f.label}</b>
      <div role="img" aria-label={`Fraction model for ${f.label}. Each bar is one whole split into ${f.d} equal parts.`}>
        {Array.from({ length: Math.max(1, Math.ceil(f.n / f.d)) }, (_, row) => <div className="qv-fraction" key={row}>
          {Array.from({ length: f.d }, (_, i) => <span key={i} className={row * f.d + i < f.n ? "is-filled" : ""} />)}
        </div>)}
      </div>
    </div>)}</div>}
    {model.type === "places" && <Places numbers={model.numbers} />}
    {model.type === "array" && <div>
      <p>{model.rows} rows of {model.columns}</p>
      <div className="qv-array" style={{ gridTemplateColumns: `repeat(${model.columns}, 1fr)` }} role="img" aria-label={`${model.rows} rows, each with ${model.columns} counters`}>
        {Array.from({ length: model.rows * model.columns }, (_, i) => <span key={i} />)}
      </div>
    </div>}
    {model.type === "parts" && <Parts {...model} />}
    {model.type === "share" && <div><p>{model.total} shared equally between {model.groups} groups</p>
      <div className="qv-groups" aria-label={`${model.groups} empty groups to share ${model.total} between`}>{Array.from({ length: model.groups }, (_, i) => <span key={i}>?</span>)}</div>
    </div>}
    {model.type === "rounding" && <svg className="qv-number-line" viewBox="0 0 420 120" role="img" aria-label={`${model.n} marked between ${model.low} and ${model.high}; the middle tick is halfway.`}>
      <path d="M40 65H380M40 55V75M210 55V75M380 55V75" />
      <circle cx={40 + (model.n - model.low) / (model.high - model.low) * 340} cy="65" r="6" />
      <text x="40" y="104">{model.low.toLocaleString("en-GB")}</text><text x="380" y="104">{model.high.toLocaleString("en-GB")}</text>
      <text x={Math.max(65, Math.min(355, 40 + (model.n - model.low) / (model.high - model.low) * 340))} y="30">{model.n.toLocaleString("en-GB")}</text>
    </svg>}
  </figure>;
}

function Places({ numbers }) {
  const parts = numbers.map(n => n.replaceAll(",", "").split("."));
  const wholes = Math.max(...parts.map(p => p[0].length)), decimals = Math.max(...parts.map(p => p[1]?.length ?? 0));
  const names = ["Millions", "Hundred thousands", "Ten thousands", "Thousands", "Hundreds", "Tens", "Ones"].slice(-wholes);
  const heads = [...names, ...["Tenths", "Hundredths", "Thousandths"].slice(0, decimals)];
  return <ScrollableTable label="Compare place values"><table className="qv-place-table"><thead><tr><th scope="col">Given number</th>{heads.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead>
    <tbody>{parts.map(([whole, decimal = ""], i) => <tr key={i}><th scope="row">{numbers[i]}</th>{[...whole.padStart(wholes, " "), ...decimal.padEnd(decimals, "0")].map((digit, j) => <td key={j}>{digit.trim() || "—"}</td>)}</tr>)}</tbody>
  </table></ScrollableTable>;
}

function Parts({ a, b, op }) {
  const scale = op === "+" ? a + b : a;
  return <div className="qv-parts" role="img" aria-label={op === "+" ? `Two parts, ${a} and ${b}, make an unknown whole.` : `The whole is ${a}. Remove ${b}; the remaining part is unknown.`}>
    <div className="qv-whole">{op === "+" ? "?" : a}</div>
    <div className="qv-part-row">{op === "+" ? <>
      <span style={{ flex: a / scale }}>{a}</span><span style={{ flex: b / scale }}>{b}</span>
    </> : <><span style={{ flex: (a - b) / scale }}>?</span><span className="is-removed" style={{ flex: b / scale }}>{b} removed</span></>}</div>
    <p>Model; very small parts have extra space for their labels.</p>
  </div>;
}
