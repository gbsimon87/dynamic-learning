import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import ScaleReader from "../../../../../../components/challenge/ScaleReader";
import { compareMeasures } from "../../../../../../data/challenges/measurement";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 1 - compare two measurements you can see.
 *
 * Statutory: "compare and order lengths, mass, volume/capacity and record the
 * results using >, < and =". Two scales are shown side by side, so the
 * comparison is visible before it is written as a symbol.
 */

const PAIRS = [
  { a: 10, b: 25, unit: "cm", max: 30, step: 5 },
  { a: 20, b: 20, unit: "cm", max: 30, step: 5 },
  { a: 30, b: 15, unit: "cm", max: 30, step: 5 },
  { a: 5, b: 20, unit: "cm", max: 30, step: 5 },
  { a: 25, b: 25, unit: "cm", max: 30, step: 5 },
  { a: 30, b: 10, unit: "cm", max: 30, step: 5 },
];

function buildQuestions(rng) {
  return shuffle(PAIRS, rng).map((pair) => ({
    ...pair,
    answer: compareMeasures(pair.a, pair.b),
  }));
}

function ComparingMeasurementsChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

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

  return (
    <>
      <ScaleReader
        min={0}
        max={question.max}
        majorStep={question.step}
        value={question.a}
        unit={question.unit}
        orientation="horizontal"
        label={`The first measure, ${question.a} ${question.unit}`}
      />

      <ScaleReader
        min={0}
        max={question.max}
        majorStep={question.step}
        value={question.b}
        unit={question.unit}
        orientation="horizontal"
        label={`The second measure, ${question.b} ${question.unit}`}
      />

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
