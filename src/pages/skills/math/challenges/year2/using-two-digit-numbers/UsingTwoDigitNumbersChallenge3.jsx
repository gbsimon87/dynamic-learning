import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { makesTenFirst } from "../../../../../../data/challenges/additionAndSubtraction";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - adding 3 one-digit numbers.
 *
 * Statutory, and previously uncovered. Rather than asking for the total, this
 * asks for the STRATEGY: drag the two that make ten to the front. That works
 * only because addition can be done in any order, so it also puts the
 * commutativity rule to use.
 *
 * Either order of the ten-pair is accepted - only the pairing matters.
 */

const TRIPLES = [
  [7, 3, 8],
  [4, 6, 5],
  [9, 2, 1],
  [8, 6, 2],
  [3, 5, 7],
  [1, 4, 9],
];

function buildQuestions(rng) {
  return TRIPLES.map((triple) => {
    let cards = shuffle(triple.map((value, i) => ({ id: `${value}-${i}`, value, label: value })), rng);
    // Start from an order that is not already a solution, so there is a move
    // to make.
    if (makesTenFirst(cards.map((c) => c.value))) cards = [cards[2], cards[0], cards[1]];
    return { triple, cards, total: triple.reduce((sum, n) => sum + n, 0) };
  });
}

function UsingTwoDigitNumbersChallenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Find the two that make 10."
      render={({ question, submit, locked, index }) => (
        <MakeTen key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function MakeTen({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">
        Adding is easier if you make 10 first. Drag the two that make 10 to the
        front.
      </p>

      <DragToOrder items={items} onReorder={setItems} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() => submit(makesTenFirst(items.map((item) => item.value)))}
      >
        Check my answer
      </button>
    </>
  );
}

export default UsingTwoDigitNumbersChallenge3;
