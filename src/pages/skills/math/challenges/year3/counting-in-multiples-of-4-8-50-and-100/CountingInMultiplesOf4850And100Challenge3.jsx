import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import {
  STEPS,
  sequenceWithin1000,
  shuffle,
} from "../../../../../../data/challenges/countingInMultiples";

/**
 * Challenge 3 — whole-structure work: put a scrambled count back in order.
 *
 * Ordering five terms at once is a different demand from naming the next one:
 * it needs the whole run held in mind. Multiples of one step are always
 * distinct, so exactly one arrangement is correct and a learner who is right
 * can never be marked wrong.
 */

function buildQuestions(rng) {
  const steps = shuffle([...STEPS, ...STEPS], rng).slice(0, 6);
  return steps.map((step) => {
    const sequence = sequenceWithin1000(step, 5, rng);
    // Shuffle until it is actually scrambled — handing back the answer already
    // in order is not a question.
    let scrambled = shuffle(sequence, rng);
    let guard = 0;
    while (scrambled.every((v, i) => v === sequence[i]) && guard++ < 10) {
      scrambled = shuffle(sequence, rng);
    }
    return {
      step,
      sequence,
      items: scrambled.map((value) => ({ id: String(value), label: String(value) })),
    };
  });
}

function CountingInMultiplesOf4850And100Challenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Put the count in order."
      render={({ question, submit, locked, index }) => (
        <OrderCount key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OrderCount({ question, submit, locked }) {
  const [items, setItems] = useState(question.items);

  const check = () =>
    submit(items.every((item, i) => Number(item.id) === question.sequence[i]));

  return (
    <>
      <p className="challenge-prompt">
        These are all in the count of <strong>{question.step}s</strong>, but they
        are jumbled. Put them smallest first.
      </p>

      <DragToOrder items={items} onReorder={setItems} disabled={locked} />

      <button type="button" className="submit-btn" disabled={locked} onClick={check}>
        Check my answer
      </button>
    </>
  );
}

export default CountingInMultiplesOf4850And100Challenge3;
