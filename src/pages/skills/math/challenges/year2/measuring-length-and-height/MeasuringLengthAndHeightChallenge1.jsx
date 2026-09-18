import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import ScaleReader from "../../../../../../components/challenge/ScaleReader";
import { scaleOptions } from "../../../../../../data/challenges/measurement";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 1 - read a ruler.
 *
 * The pointer always lands on a labelled mark, so this is reading a scale
 * rather than estimating between marks. Distractors are the neighbouring
 * marks, so a learner who miscounts by one finds their answer offered.
 */

const PLANS = [
  { value: 10, object: "pencil" },
  { value: 25, object: "ribbon" },
  { value: 5, object: "rubber" },
  { value: 20, object: "book" },
  { value: 15, object: "leaf" },
  { value: 30, object: "scarf" },
];

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((plan) => ({
    ...plan,
    // scaleOptions rather than a filtered pair: at 30 cm the "+5" falls off
    // the ruler, which left only two options and made it a coin flip.
    options: shuffle(scaleOptions(plan.value, 5, 0, 30, 3), rng),
  }));
}

function MeasuringLengthAndHeightChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Read the ruler."
      render={({ question, submit, locked, index }) => (
        <ReadRuler key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function ReadRuler({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">
        How long is the {question.object}?
      </p>

      <ScaleReader
        min={0}
        max={30}
        majorStep={5}
        value={question.value}
        unit="cm"
        orientation="horizontal"
        label={`A ruler with the marker at ${question.value} centimetres`}
      />

      <ChoiceGrid
        options={question.options}
        selected={selected}
        onSelect={setSelected}
        disabled={locked}
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || selected === null}
        onClick={() => submit(selected === question.value)}
      >
        Check my answer
      </button>
    </>
  );
}

export default MeasuringLengthAndHeightChallenge1;
