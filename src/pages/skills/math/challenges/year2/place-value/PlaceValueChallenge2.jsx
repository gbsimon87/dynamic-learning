import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildPartsToNumberQuestions } from "../../../../../../data/challenges/placeValue";

/**
 * Challenge 2 - no picture now.
 *
 * The learner reads "6 tens and 2 ones" and picks the number. The digit-swap
 * (62 vs 26) is always among the options, because that is the mistake this
 * topic exists to correct. Numbers are generated each time.
 */

const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;

function PlaceValueChallenge2({ onComplete }) {
  const questions = useMemo(() => buildPartsToNumberQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Which number is it?"
      render={({ question, submit, locked, index }) => (
        <PickNumber key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function PickNumber({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="sequence-strip">
        {plural(question.tens, "ten")} and {plural(question.ones, "one")}
      </p>

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
        onClick={() => submit(selected === question.answer)}
      >
        Check my answer
      </button>
    </>
  );
}

export default PlaceValueChallenge2;
