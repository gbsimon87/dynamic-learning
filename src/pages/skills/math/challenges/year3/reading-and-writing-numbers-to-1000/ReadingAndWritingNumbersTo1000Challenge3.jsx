import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { buildWordQuestions } from "../../../../../../data/challenges/readingAndWritingNumbers1000";

/**
 * Challenge 3 — whole-structure work: order four numbers written only in words.
 *
 * Not a comparing exercise wearing a disguise. Every card has to be READ back
 * into a number before any of them can be placed, and the four cards in a set
 * share a hundreds digit, so "three hundred and six" and "three hundred and
 * sixty" sit side by side with nothing but the last word to tell them apart.
 *
 * No digits appear anywhere on screen.
 */

function ReadingAndWritingNumbersTo1000Challenge3({ onComplete }) {
  const questions = useMemo(() => buildWordQuestions(3, Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Put the numbers in order."
      render={({ question, submit, locked, index }) => (
        <OrderWords key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OrderWords({ question, submit, locked }) {
  const [items, setItems] = useState(question.items);

  const check = () =>
    submit(items.every((item, i) => Number(item.id) === question.answer[i]));

  return (
    <>
      <p className="challenge-prompt">
        Read each card, then drag them so the <strong>smallest</strong> number is
        first.
      </p>

      <DragToOrder items={items} onReorder={setItems} disabled={locked} />

      <button type="button" className="submit-btn" disabled={locked} onClick={check}>
        Check my answer
      </button>
    </>
  );
}

export default ReadingAndWritingNumbersTo1000Challenge3;
