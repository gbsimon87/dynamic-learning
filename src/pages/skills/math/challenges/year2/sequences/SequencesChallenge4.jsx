import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - arrange a sequence from instructions.
 *
 * Several position words at once, each one constraining the answer. Getting it
 * right means holding all the instructions together rather than following one
 * and hoping, which is the hardest thing in this topic.
 */

const PLANS = [
  {
    clue: "The cat is first. The dog is last. The rabbit is between them.",
    order: ["🐱", "🐰", "🐶"],
  },
  {
    clue: "The star is last. The apple is first. The fish is in the middle.",
    order: ["🍎", "🐟", "⭐"],
  },
  {
    clue: "The car is first, then the bus, then the bike.",
    order: ["🚗", "🚌", "🚲"],
  },
  {
    clue: "The sun is last. The moon is first. The cloud is between them.",
    order: ["🌙", "☁️", "☀️"],
  },
  {
    clue: "The bear is third. The panda is first. The cat is second.",
    order: ["🐼", "🐱", "🐻"],
  },
  {
    clue: "The flower is first. The tree is last. The leaf is in the middle.",
    order: ["🌸", "🍃", "🌳"],
  },
];

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((plan) => {
    let cards = shuffle(plan.order.map((emoji) => ({ id: emoji, label: emoji })), rng);
    const solved = cards.every((card, i) => card.id === plan.order[i]);
    if (solved) cards = [...cards].reverse();
    return { ...plan, cards };
  });
}

function SequencesChallenge4({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Follow all the instructions."
      render={({ question, submit, locked, index }) => (
        <ArrangeLine key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function ArrangeLine({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">{question.clue}</p>

      <p className="challenge-prompt">Drag them into the right order.</p>

      <DragToOrder items={items} onReorder={setItems} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() => submit(items.every((item, i) => item.id === question.order[i]))}
      >
        Check my answer
      </button>
    </>
  );
}

export default SequencesChallenge4;
