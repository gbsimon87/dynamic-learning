import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { buildOddOneOut } from "../../../../../../data/challenges/shapeQuestions";

/**
 * Challenge 3 - put the odd one out at the front.
 *
 * Three cards share a property and one does not, and the learner drags the
 * exception to the front. The families sort by sides and by curved or flat
 * surfaces, and the cards are drawn fresh every run (see buildOddOneOut).
 */

function DifferentShapesChallenge3({ onComplete }) {
  const questions = useMemo(() => buildOddOneOut(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Find the odd one out."
      render={({ question, submit, locked, index }) => (
        <OddOneOut key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OddOneOut({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">
        {question.rule} Drag the one that does not belong to the front.
      </p>

      <DragToOrder items={items} onReorder={setItems} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() => submit(items[0].id === question.odd)}
      >
        Check my answer
      </button>
    </>
  );
}

export default DifferentShapesChallenge3;
