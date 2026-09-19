import { useMemo, useState } from "react";
import BarChart from "../../../../../components/challenge/BarChart";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import DataTable from "../../../../../components/challenge/DataTable";
import NumberInput from "../../../../../components/challenge/NumberInput";
import PictogramChart from "../../../../../components/challenge/PictogramChart";
import { clamp } from "../../../../../data/challenges/statistics";
import { isCorrectNumber } from "../../../../../data/challenges/placeValue3Digit";
import { YEAR3_STATISTICS_BUILDERS } from "../../../../../data/challenges/year3Statistics";

const TITLES = {
  bars: ["Read a scaled bar chart.", "Compare bars using the scale.", "Build a bar chart.", "Solve a bar-chart problem."],
  pictograms: ["Read a pictogram key.", "Compare scaled picture rows.", "Build a scaled pictogram.", "Use the key to solve a problem."],
  tables: ["Find a number in a table.", "Read a whole table row.", "Complete a table from a chart.", "Solve a table problem."],
  problems: ["Solve a one-step bar question.", "Solve a pictogram question.", "Solve a two-step table question.", "Solve a two-step data question."],
};

function Year3StatisticsGame({ topic, level, onComplete }) {
  const questions = useMemo(() => YEAR3_STATISTICS_BUILDERS[topic](level, Math.random), [topic, level]);
  return (
    <ChallengeShell
      title={TITLES[topic][level - 1]}
      questions={questions}
      onComplete={onComplete}
      render={({ question, submit, locked, index }) => (
        <StatisticsRound key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function CheckButton({ disabled, onClick, children = "Check my answer" }) {
  return <button type="button" className="submit-btn" disabled={disabled} onClick={onClick}>{children}</button>;
}

function Chart({ question, rows = question.rows, editable = false, onStep, locked }) {
  const isPictogram = question.type.startsWith("pictogram")
    || question.type === "problem-pictogram"
    || (question.type === "problem-mixed" && question.representation === "pictogram");
  if (isPictogram) return (
    <PictogramChart
      rows={rows}
      ratio={question.ratio}
      symbol={question.symbol}
      highlight={question.ask}
      onStepSymbols={editable ? onStep : undefined}
      maxSymbols={6}
      disabled={locked}
    />
  );
  return (
    <BarChart
      bars={rows}
      step={question.step}
      max={question.max}
      unit={question.unit}
      label={`${question.caption}, a bar chart with a scale of ${question.step}`}
      onStep={editable ? onStep : undefined}
      disabled={locked}
    />
  );
}

function Table({ question, blank, blankValue, highlight }) {
  return (
    <DataTable
      caption={question.caption}
      columns={question.columns}
      rows={question.rows}
      blank={blank}
      blankValue={blankValue}
      highlight={highlight}
    />
  );
}

function StatisticsRound({ question, submit, locked }) {
  const [choice, setChoice] = useState(null);
  const [typed, setTyped] = useState("");
  const [built, setBuilt] = useState(() => Object.fromEntries((question.rows ?? []).map((row) => [row.label, 0])));

  const choose = (prompt, visual) => (
    <>
      <p className="challenge-prompt">{prompt}</p>
      {visual}
      <ChoiceGrid options={question.options} selected={choice} onSelect={setChoice} disabled={locked} />
      <CheckButton disabled={locked || choice === null} onClick={() => submit(choice === question.answer)} />
    </>
  );
  const typeAnswer = (prompt, visual) => (
    <>
      <p className="challenge-prompt">{prompt}</p>
      {visual}
      <NumberInput value={typed} onChange={setTyped} disabled={locked} label="My answer" />
      <CheckButton disabled={locked || typed === ""} onClick={() => submit(isCorrectNumber(typed, question.answer))} />
    </>
  );

  if (question.type === "bar-read") return choose(
    `The chart shows ${question.caption.toLowerCase()}. How many ${question.unit} for ${question.ask}?`,
    <Chart question={question} />,
  );
  if (question.type === "bar-difference") return choose(
    `How many more ${question.unit} are shown for ${question.second} than ${question.first}?`,
    <Chart question={question} />,
  );
  if (question.type === "bar-build") {
    const rows = question.rows.map((row) => ({ label: row.label, value: built[row.label] }));
    const onStep = (label, delta) => setBuilt((previous) => ({
      ...previous,
      [label]: clamp(previous[label] + delta * question.step, 0, question.max),
    }));
    return (
      <>
        <p className="challenge-prompt">Use the table to make all three bars. Each line on the scale is worth {question.step}.</p>
        <Table question={{ ...question, columns: [{ key: "count", label: question.unit }], rows: question.rows.map((row) => ({ label: row.label, cells: { count: row.value } })) }} />
        <Chart question={question} rows={rows} editable onStep={onStep} locked={locked} />
        <CheckButton disabled={locked} onClick={() => submit(question.rows.every((row) => built[row.label] === row.value))}>Check my chart</CheckButton>
      </>
    );
  }
  if (question.type === "bar-story") return typeAnswer(question.prompt, <Chart question={question} />);

  if (question.type === "pictogram-read") return choose(
    `The pictogram shows ${question.caption.toLowerCase()}. How many ${question.unit} for ${question.ask}?`,
    <Chart question={question} />,
  );
  if (question.type === "pictogram-difference") return choose(
    `How many more ${question.unit} are shown for ${question.second} than ${question.first}?`,
    <Chart question={question} />,
  );
  if (question.type === "pictogram-build") {
    const rows = question.rows.map((row) => ({ label: row.label, value: built[row.label] }));
    const onStep = (label, delta) => setBuilt((previous) => ({
      ...previous,
      [label]: clamp(previous[label] + delta * question.ratio, 0, 6 * question.ratio),
    }));
    return (
      <>
        <p className="challenge-prompt">Use the table and key to draw all three picture rows.</p>
        <Table question={{ ...question, columns: [{ key: "count", label: question.unit }], rows: question.rows.map((row) => ({ label: row.label, cells: { count: row.value } })) }} />
        <Chart question={question} rows={rows} editable onStep={onStep} locked={locked} />
        <CheckButton disabled={locked} onClick={() => submit(question.rows.every((row) => built[row.label] === row.value))}>Check my pictogram</CheckButton>
      </>
    );
  }
  if (question.type === "pictogram-story") return typeAnswer(question.prompt, <Chart question={question} />);

  if (question.type === "table-read") return choose(
    `Find ${question.ask} and ${question.columnLabel}. How many ${question.unit} are there?`,
    <Table question={question} highlight={{ row: question.ask }} />,
  );
  if (question.type === "table-row-total") return choose(
    `How many ${question.unit} are recorded for ${question.ask} across both columns?`,
    <Table question={question} highlight={{ row: question.ask }} />,
  );
  if (question.type === "table-fill-from-bar") return (
    <>
      <p className="challenge-prompt">Read the bar for {question.ask}. Fill in the missing table number.</p>
      <Chart question={{ ...question, type: "bar-read", rows: question.sourceRows }} />
      <Table
        question={question}
        blank={{ row: question.ask, column: "count" }}
        blankValue={typed === "" ? "?" : typed}
        highlight={{ row: question.ask }}
      />
      <NumberInput value={typed} onChange={setTyped} disabled={locked} hideField />
      <CheckButton disabled={locked || typed === ""} onClick={() => submit(isCorrectNumber(typed, question.answer))}>Check my table</CheckButton>
    </>
  );
  if (question.type === "table-story") return typeAnswer(question.prompt, <Table question={question} />);

  if (question.type === "problem-bar" || question.type === "problem-pictogram" || question.type === "problem-mixed") {
    const visual = question.representation === "table"
      ? <Table question={{ ...question, columns: [{ key: "count", label: question.unit }], rows: question.rows.map((row) => ({ label: row.label, cells: { count: row.value } })) }} />
      : <Chart question={question} />;
    return typeAnswer(question.prompt, visual);
  }
  if (question.type === "problem-table") return typeAnswer(question.prompt, <Table question={question} />);

  return null;
}

export default Year3StatisticsGame;
