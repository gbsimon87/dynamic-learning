import { useState } from "react";
import FreePlayShell from "../../../components/skills/FreePlayShell";
import BarChart from "../../../components/challenge/BarChart";
import ChoiceGrid from "../../../components/challenge/ChoiceGrid";
import PictogramChart from "../../../components/challenge/PictogramChart";
import TallyChart from "../../../components/challenge/TallyChart";
import { makeChartQuestion } from "../../../data/freePlay/charts";
import "./ChartDetective.css";

/**
 * Chart Detective — free play reading tally charts, pictograms and bar
 * charts, all drawn by the challenge kit.
 *
 * Datasets never tie, so "which has the most?" always has one answer
 * (data/freePlay/charts.js). Easier is tallies and 1:2 pictograms; Harder
 * reads Year 3's scales of 5 and 10.
 */
function ChartDetective() {
  return (
    <FreePlayShell
      title="Chart Detective"
      icon="📊"
      intro="Read the chart to answer the question."
      makeQuestion={makeChartQuestion}
      render={(props) => <ReadChart {...props} />}
    />
  );
}

function Chart({ question }) {
  if (question.chart === "tally") {
    return <TallyChart rows={question.rows} highlight={question.highlight} />;
  }
  if (question.chart === "pictogram") {
    return (
      <PictogramChart
        rows={question.rows}
        ratio={question.unit}
        symbol={question.symbol}
        highlight={question.highlight}
      />
    );
  }
  return (
    <BarChart
      bars={question.rows.map((row) => ({ label: row.label, value: row.value }))}
      step={question.unit}
      max={question.max}
      label={`Bar chart: ${question.rows.map((row) => `${row.label} ${row.value}`).join(", ")}`}
    />
  );
}

function ReadChart({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <figure className="chart-detective-figure">
        <figcaption className="chart-detective-caption">{question.caption}</figcaption>
        <Chart question={question} />
      </figure>

      <ChoiceGrid
        options={question.options}
        selected={selected}
        onSelect={setSelected}
        disabled={locked}
        variant={typeof question.answer === "string" ? "wordy" : ""}
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || selected === null}
        onClick={() => submit(selected === question.answer)}
      >
        Check my answer
      </button>
    </>
  );
}

export default ChartDetective;
