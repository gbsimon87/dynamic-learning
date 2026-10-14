import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { buildOrderByAnswerQuestions } from "../../../../../../data/challenges/additionAndSubtraction";

/**
 * Challenge 3 - order calculations by their answers.
 *
 * Every card has to be worked out before any of them can be placed, so one
 * question is four calculations plus a comparison. Sums and differences are
 * mixed so the operation has to be read each time. Sets are generated within
 * 20 and no two cards share an answer, so only one order is right.
 */

function SolvingNumberProblemsChallenge3({ onComplete }) {
  const questions = useMemo(() => buildOrderByAnswerQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Work each one out, then put them in order."
      render={({ question, submit, locked, index }) => (
        <OrderByAnswer key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OrderByAnswer({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">
        Drag them so the smallest answer is first.
      </p>

      <DragToOrder items={items} onReorder={setItems} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() => submit(items.every((item, i) => item.id === question.ordered[i]))}
      >
        Check my answer
      </button>
    </>
  );
}

export default SolvingNumberProblemsChallenge3;
