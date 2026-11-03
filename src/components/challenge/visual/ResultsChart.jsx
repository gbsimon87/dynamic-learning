import BarChart from "../BarChart";
import { resultsChartModel } from "../../../data/challenges/questionVisuals";
import "./question-visuals.css";

export default function ResultsChart({ table }) {
  const model = resultsChartModel(table);
  if (!model) return null;
  return <figure className="question-visual qv-results-chart">
    <figcaption>The same supplied results as a chart</figcaption>
    <BarChart {...model} label={`${model.unit}. ${model.bars.map(bar => `${bar.label}: ${bar.value}`).join("; ")}.`} />
  </figure>;
}
