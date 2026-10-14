import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import ScaleReader from "../../../../../../components/challenge/ScaleReader";
import { buildVisualCompareQuestions } from "../../../../../../data/challenges/measurement";

/**
 * Challenge 1 - compare two measurements you can see.
 *
 * Statutory: "compare and order lengths, mass, volume/capacity and record the
 * results using >, < and =". So each run has two pairs of rulers (cm), two of
 * kitchen scales (g) and two of jugs (ml). Two scales are shown together, so
 * the comparison is visible before it is written as a symbol, and every run
 * needs <, > and = at least once.
 */

const NAMES = { cm: "ruler", g: "scale", ml: "jug" };

function ComparingMeasurementsChallenge1({ onComplete }) {
  const questions = useMemo(() => buildVisualCompareQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Which symbol makes this true?"
      render={({ question, submit, locked, index }) => (
        <CompareScales key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function CompareScales({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);
  const vertical = question.orientation === "vertical";
  const scale = (value, which) => (
    <ScaleReader
      min={0}
      max={question.max}
      majorStep={question.step}
      value={value}
      unit={question.unit}
      orientation={question.orientation}
      variant={question.variant}
      label={`The ${which} ${NAMES[question.unit]}, showing ${value} ${question.unit}`}
    />
  );

  return (
    <>
      {/* Two jugs stand side by side; stacked they would not fit a phone. */}
      <div style={vertical ? { display: "flex", justifyContent: "center", gap: "2.5rem" } : undefined}>
        {scale(question.a, "first")}
        {scale(question.b, "second")}
      </div>

      <p className="statement">
        <span>
          {question.a} {question.unit}
        </span>
        <span className="statement-slot">{selected ?? "?"}</span>
        <span>
          {question.b} {question.unit}
        </span>
      </p>

      <ChoiceGrid
        options={["<", ">", "="]}
        selected={selected}
        onSelect={setSelected}
        disabled={locked}
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

export default ComparingMeasurementsChallenge1;
