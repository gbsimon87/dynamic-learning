import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { double } from "../../../../../../data/challenges/additionAndSubtraction";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - double again, and again.
 *
 * Ordering a doubling chain means applying the rule four times over, so the
 * learner produces the whole pattern rather than one answer. Every chain stays
 * within 100.
 */

const STARTS = [1, 2, 3, 4, 5, 6];
const LENGTH = 5;

function buildQuestions(rng) {
  return shuffle(STARTS, rng).map((start) => {
    const terms = [start];
    for (let i = 1; i < LENGTH; i++) terms.push(double(terms[i - 1]));

    const cards = shuffle(terms.map((value) => ({ id: value, label: value })), rng);
    const solved = cards.every((card, i) => card.id === terms[i]);
    return { start, terms, cards: solved ? [...cards].reverse() : cards };
  });
}

function DoublingAndHalvingUsingAdditionAndSubtractionChallenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Each number is double the one before it."
      render={({ question, submit, locked, index }) => (
        <DoublingChain key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function DoublingChain({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">
        Start at {question.start} and keep doubling. Drag them into order.
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

export default DoublingAndHalvingUsingAdditionAndSubtractionChallenge3;
