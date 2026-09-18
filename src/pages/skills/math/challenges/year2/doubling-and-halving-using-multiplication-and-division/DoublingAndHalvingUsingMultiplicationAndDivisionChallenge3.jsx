import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - halve, and halve again.
 *
 * Repeated halving is repeated division, and the chain has to hold across four
 * steps. Every chain divides exactly the whole way down, so no step leaves a
 * remainder.
 */

const STARTS = [80, 40, 48, 32, 96, 64];
const LENGTH = 4;

function buildQuestions(rng) {
  return shuffle(STARTS, rng).map((start) => {
    const terms = [start];
    for (let i = 1; i < LENGTH; i++) terms.push(terms[i - 1] / 2);

    const cards = shuffle(terms.map((value) => ({ id: value, label: value })), rng);
    const solved = cards.every((card, i) => card.id === terms[i]);
    return { start, terms, cards: solved ? [...cards].reverse() : cards };
  });
}

function DoublingAndHalvingUsingMultiplicationAndDivisionChallenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Each number is half the one before it."
      render={({ question, submit, locked, index }) => (
        <HalvingChain key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function HalvingChain({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">
        Start at {question.start} and keep halving. Drag them into order.
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

export default DoublingAndHalvingUsingMultiplicationAndDivisionChallenge3;
