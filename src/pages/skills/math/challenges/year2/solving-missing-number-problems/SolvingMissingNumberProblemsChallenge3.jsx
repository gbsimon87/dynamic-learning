import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { buildFactFamilyQuestions, isTrueSubtraction } from "../../../../../../data/challenges/additionAndSubtraction";

/**
 * Challenge 3 - build a true subtraction from three numbers.
 *
 * A fact family has two true subtractions: from 15, 6 and 9 both 15 − 6 = 9
 * and 15 − 9 = 6 work, and both are accepted. What cannot work is starting
 * anywhere but the largest number, which is the understanding being tested.
 */

function SolvingMissingNumberProblemsChallenge3({ onComplete }) {
  const questions = useMemo(() => buildFactFamilyQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Make a subtraction that is true."
      render={({ question, submit, locked, index }) => (
        <BuildSubtraction key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function BuildSubtraction({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);
  const values = items.map((item) => item.value);

  return (
    <>
      <p className="challenge-prompt">
        Drag the numbers to make this true. There is more than one right answer.
      </p>

      <p className="statement">
        <span>{values[0]}</span>
        <span>−</span>
        <span>{values[1]}</span>
        <span>=</span>
        <span>{values[2]}</span>
      </p>

      <DragToOrder items={items} onReorder={setItems} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() => submit(isTrueSubtraction(values))}
      >
        Check my answer
      </button>
    </>
  );
}

export default SolvingMissingNumberProblemsChallenge3;
