import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { isEven } from "../../../../../../data/challenges/multiplicationAndDivision";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - odd and even.
 *
 * Statutory, and sitting inside the tables bullet: "recall and use ... facts
 * for the 2, 5 and 10 multiplication tables, INCLUDING RECOGNISING ODD AND EVEN
 * NUMBERS". It belongs here because the even numbers are exactly the 2 times
 * table, which the previous challenge just practised.
 *
 * The numbers deliberately include ones ending in 0 and larger two-digit
 * numbers, so the rule has to be applied to the last digit rather than recalled.
 */

const NUMBERS = [7, 14, 20, 33, 46, 51, 68, 75, 90, 13, 28, 100];

function buildQuestions(rng) {
  return shuffle(NUMBERS, rng)
    .slice(0, 6)
    .map((value) => ({
      value,
      answer: isEven(value) ? "even" : "odd",
    }));
}

function MultiplicationTablesChallenge2({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Even numbers can be shared into 2 equal groups."
      render={({ question, submit, locked, index }) => (
        <OddOrEven key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OddOrEven({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="sequence-strip">{question.value}</p>

      <p className="challenge-prompt">Is this number odd or even?</p>

      <ChoiceGrid
        options={["odd", "even"]}
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

export default MultiplicationTablesChallenge2;
