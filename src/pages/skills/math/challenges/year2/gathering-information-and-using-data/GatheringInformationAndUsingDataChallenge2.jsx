import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import SurveyTray from "../../../../../../components/challenge/SurveyTray";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { buildPileSort } from "../../../../../../data/challenges/statisticsQuestions";

/**
 * Challenge 2 - sort the categories by quantity.
 *
 * "Sorting the categories by quantity" is in the statutory sentence word for
 * word, and it is the one thing no chart-reading question asks: it needs
 * every category counted and then the counts compared.
 *
 * Every pile has four categories with FOUR DIFFERENT counts, drawn fresh
 * each run. A tie would make several arrangements correct while the check
 * accepts one, so `sortByQuantity` refuses a tied dataset (see
 * buildPileSort and its tests).
 */

function GatheringChallenge2({ onComplete }) {
  const questions = useMemo(() => buildPileSort(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Count each kind, then put them in order."
      render={({ question, submit, locked, index }) => (
        <SortCategories key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function SortCategories({ question, submit, locked }) {
  const [counted, setCounted] = useState(() => new Set());
  const [order, setOrder] = useState(() =>
    question.start.map((category) => ({ id: category, label: category }))
  );

  const isCorrect = order.every((item, i) => item.id === question.answer[i]);

  return (
    <>
      <SurveyTray
        items={question.items}
        counted={counted}
        disabled={locked}
        onToggle={(index) =>
          setCounted((prev) => {
            const next = new Set(prev);
            if (next.has(index)) next.delete(index);
            else next.add(index);
            return next;
          })
        }
      />

      <p className="challenge-prompt">
        {question.direction === "most-first"
          ? "Drag them so the one there is MOST of comes first."
          : "Drag them so the one there is FEWEST of comes first."}
      </p>

      <DragToOrder items={order} onReorder={setOrder} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() => submit(isCorrect)}
      >
        Check my order
      </button>
    </>
  );
}

export default GatheringChallenge2;
