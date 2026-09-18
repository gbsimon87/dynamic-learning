import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - which calculation finds the missing number?
 *
 * Statutory: "recognise and use the inverse relationship between addition and
 * subtraction". The learner picks the calculation rather than performing it,
 * so this tests the relationship itself. The tempting wrong answer is always
 * the same operation as the question.
 */

const QUESTIONS = [
  { statement: "14 + ? = 20", options: ["20 − 14", "20 + 14", "14 − 20"], answer: "20 − 14" },
  { statement: "? + 9 = 16", options: ["16 − 9", "16 + 9", "9 − 16"], answer: "16 − 9" },
  { statement: "25 − ? = 10", options: ["25 − 10", "25 + 10", "10 − 25"], answer: "25 − 10" },
  { statement: "? − 8 = 12", options: ["12 + 8", "12 − 8", "8 − 12"], answer: "12 + 8" },
  { statement: "30 + ? = 45", options: ["45 − 30", "45 + 30", "30 − 45"], answer: "45 − 30" },
  { statement: "? + 18 = 24", options: ["24 − 18", "24 + 18", "18 − 24"], answer: "24 − 18" },
];

function SolvingMissingNumberProblemsChallenge2({ onComplete }) {
  const questions = useMemo(
    () =>
      shuffle(QUESTIONS, Math.random).map((q) => ({
        ...q,
        options: shuffle(q.options, Math.random),
      })),
    []
  );

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Which calculation would find the missing number?"
      render={({ question, submit, locked, index }) => (
        <PickInverse key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function PickInverse({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="sequence-strip">{question.statement}</p>

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

export default SolvingMissingNumberProblemsChallenge2;
