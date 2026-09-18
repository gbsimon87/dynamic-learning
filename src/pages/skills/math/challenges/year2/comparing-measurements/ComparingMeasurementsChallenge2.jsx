import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { compareMeasures } from "../../../../../../data/challenges/measurement";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - compare without a picture, across units.
 *
 * Half the pairs mix units — 1 m against 90 cm — so the learner has to convert
 * before comparing. That is where a bigger number can be the smaller measure,
 * which is the trap worth setting.
 */

const PAIRS = [
  { left: "90 cm", right: "1 m", a: 90, b: 100 },
  { left: "2 m", right: "150 cm", a: 200, b: 150 },
  { left: "500 g", right: "1 kg", a: 500, b: 1000 },
  { left: "1 litre", right: "750 ml", a: 1000, b: 750 },
  { left: "100 cm", right: "1 m", a: 100, b: 100 },
  { left: "250 ml", right: "500 ml", a: 250, b: 500 },
];

function buildQuestions(rng) {
  return shuffle(PAIRS, rng).map((pair) => ({
    ...pair,
    answer: compareMeasures(pair.a, pair.b),
  }));
}

function ComparingMeasurementsChallenge2({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Careful — the units are not always the same."
      render={({ question, submit, locked, index }) => (
        <CompareUnits key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function CompareUnits({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="statement">
        <span>{question.left}</span>
        <span className="statement-slot">{selected ?? "?"}</span>
        <span>{question.right}</span>
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

export default ComparingMeasurementsChallenge2;
