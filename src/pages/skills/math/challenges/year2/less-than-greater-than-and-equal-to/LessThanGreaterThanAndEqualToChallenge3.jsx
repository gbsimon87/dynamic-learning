import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { buildChainQuestions } from "../../../../../../data/challenges/comparingNumbers";

/**
 * Challenge 3 - build a true chain.
 *
 * The learner arranges four numbers so every "<" (or every ">") between them
 * holds. Getting one pair right is not enough: the whole chain has to be true
 * at once. Sets are generated each time, three chains of each sign.
 */

function LessThanGreaterThanAndEqualToChallenge3({ onComplete }) {
  const questions = useMemo(() => buildChainQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Make every sign true."
      render={({ question, submit, locked, index }) => (
        <BuildChain key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function BuildChain({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">
        Drag the numbers so each one is{" "}
        {question.symbol === "<" ? "less than" : "greater than"} the next.
      </p>

      <p className="statement">
        {items.map((item, i) => (
          <span key={item.id}>
            {item.label}
            {i < items.length - 1 ? ` ${question.symbol} ` : ""}
          </span>
        ))}
      </p>

      <DragToOrder items={items} onReorder={setItems} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() => submit(items.every((item, i) => item.id === question.terms[i]))}
      >
        Check my answer
      </button>
    </>
  );
}

export default LessThanGreaterThanAndEqualToChallenge3;
