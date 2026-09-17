import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - build a true chain.
 *
 * The learner arranges four numbers so every "<" between them holds. Getting
 * one pair right is not enough: the whole chain has to be true at once.
 */

const SETS = [
  [12, 21, 18, 9],
  [45, 54, 40, 50],
  [33, 13, 31, 3],
  [67, 76, 60, 70],
  [28, 82, 20, 80],
  [56, 65, 55, 66],
];

function buildQuestions(rng) {
  return shuffle(SETS, rng).map((set) => {
    const terms = [...set].sort((a, b) => a - b);
    const cards = shuffle(terms.map((value) => ({ id: value, label: value })), rng);
    const solved = cards.every((card, i) => card.id === terms[i]);
    return { terms, cards: solved ? [...cards].reverse() : cards };
  });
}

function LessThanGreaterThanAndEqualToChallenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Make every < true."
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
        Drag the numbers so each one is less than the next.
      </p>

      <p className="statement">
        {items.map((item, i) => (
          <span key={item.id}>
            {item.label}
            {i < items.length - 1 ? " < " : ""}
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
