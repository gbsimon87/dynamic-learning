import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { buildTwoStepQuestions } from "../../../../../../data/challenges/additionAndSubtraction";

/**
 * Challenge 4 - two-step problems, typed.
 *
 * Each story needs two calculations, and the first answer is not the one being
 * asked for. Nothing to choose from, so a learner who stops after one step has
 * no way to stumble onto the right answer. Six of eight stories are drawn
 * each time, with fresh numbers.
 */
function SolvingNumberProblemsChallenge4({ onComplete }) {
  const questions = useMemo(() => buildTwoStepQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="This one takes two steps."
      render={({ question, submit, locked, index }) => (
        <TwoStep key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function TwoStep({ question, submit, locked }) {
  const [value, setValue] = useState("");

  return (
    <>
      <p className="challenge-prompt">{question.prompt}</p>

      <NumberInput label={question.unit === "p" ? "My answer in pence is" : "My answer is"} value={value} onChange={setValue} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || value === ""}
        onClick={() => submit(isCorrectNumber(value, question.answer))}
      >
        Check my answer
      </button>
    </>
  );
}

export default SolvingNumberProblemsChallenge4;
