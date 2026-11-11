import ShapeFigure from "../../components/challenge/ShapeFigure";
import SolidFigure from "../../components/challenge/SolidFigure";
import Year1MathVisual from "../skills/math/challenges/year1/Year1MathVisual";
import Year4MathVisual from "../skills/math/challenges/year4/Year4MathVisual";
import Year5MathVisual from "../skills/math/challenges/year5/Year5MathVisual";
import Year6MathVisual from "../skills/math/challenges/year6/Year6MathVisual";
import Year1ScienceVisual from "../skills/science/challenges/year1/Year1ScienceVisual";
import Year2ScienceVisual from "../skills/science/challenges/year2/Year2ScienceVisual";
import Year4ScienceVisual from "../skills/science/challenges/year4/Year4ScienceVisual";
import Year5ScienceVisual from "../skills/science/challenges/year5/Year5ScienceVisual";
import Year6ScienceVisual from "../skills/science/challenges/year6/Year6ScienceVisual";
import PracticeDataModel from "./PracticeDataModel";
import "../skills/math/challenges/year4/Year4Math.css";
import "../skills/math/challenges/year5/Year5Math.css";

const MATH_VISUALS = { 4: Year4MathVisual, 5: Year5MathVisual, 6: Year6MathVisual };
const SCIENCE_VISUALS = { 4: Year4ScienceVisual, 5: Year5ScienceVisual, 6: Year6ScienceVisual };

function PaperShapes({ cards }) {
  return <div className="pp-shape-cards">{cards.map((card, n) => <figure key={n}>{card.label && <figcaption>{card.label}</figcaption>}{card.type === "gap" ? <span className="pp-shape-gap">?</span> : card.type === "shape" ? <ShapeFigure shape={card.shape} label="Shape to examine" /> : <SolidFigure solid={card.solid} label="Solid to examine" />}</figure>)}</div>;
}
function Reflection({ visual: v }) {
  return <svg className="pp-reflection" viewBox={`0 0 ${v.width * 30 + 10} ${v.height * 30 + 10}`} role="img" aria-label="Square grid with the supplied pattern and a dashed mirror line">
    {Array.from({ length: v.width * v.height }, (_, n) => {
      const x = n % v.width, y = Math.floor(n / v.width);
      return <rect key={n} x={5 + x * 30} y={5 + y * 30} width="30" height="30" fill={v.cells.some(([a, b]) => a === x && b === y) ? "#777" : "white"} stroke="currentColor" />;
    })}
    <line x1={v.horizontal ? 5 : 95} x2={v.horizontal ? v.width * 30 + 5 : 95} y1={v.horizontal ? 95 : 5} y2={v.horizontal ? 95 : v.height * 30 + 5} stroke="currentColor" strokeWidth="3" strokeDasharray="6 4" />
  </svg>;
}

export default function PracticeCurriculumModel({ model: m }) {
  // These renderers receive evidence only: no answer, hint, response or callbacks.
  const question = { visual: m.visual, table: m.table, unit: m.unit };
  const MathVisual = MATH_VISUALS[m.year];
  const ScienceVisual = SCIENCE_VISUALS[m.year];
  return <div className="pp-curriculum-source">
    {m.lines.length > 0 && <div className="pp-reading-evidence"><p className="pp-evidence-title">{m.title}</p>{m.lines.map((line, n) => <p key={n}>{line}</p>)}</div>}
    {m.picture && <span className="pp-picture-clue" role="img" aria-label={m.picture.label}>{m.picture.symbol}</span>}
    {m.subject === "math" && m.visual && (m.visual.type === "paper-shapes" ? <PaperShapes cards={m.visual.cards} /> : m.visual.type === "reflection" ? <Reflection visual={m.visual} /> : m.year === 1 ? <Year1MathVisual visual={m.visual} /> : MathVisual && <MathVisual question={question} disabled />)}
    {m.subject === "science" && (m.year === 1 ? <Year1ScienceVisual visual={m.visual} /> : m.year === 2 ? <Year2ScienceVisual visual={m.visual} /> : ScienceVisual && <ScienceVisual question={question} />)}
    {m.chart && <PracticeDataModel model={m.chart.type === "pictogram" ? { ...m.chart, caption: m.chart.unit, type: "pictogram" } : m.chart.type === "bar" ? { ...m.chart, caption: m.chart.unit, type: "bar-chart" } : { type: "data-table", caption: "Tally chart", columns: [{ key: "tally", label: "Tally marks (groups of five)" }], rows: m.chart.rows.map((row) => ({ label: row.label, cells: { tally: `${"||||/ ".repeat(Math.floor(row.value / 5))}${"|".repeat(row.value % 5)}` } })) }} />}
  </div>;
}
