import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import PictogramChart from "../../../../../../components/challenge/PictogramChart";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildPictogramCompare } from "../../../../../../data/challenges/statisticsQuestions";

/**
 * Challenge 2 - ratios of 5 and 10, and nothing highlighted.
 *
 * Harder in two ways at once: the key is no longer 2, so the doubling
 * shortcut fails, and the row to look at has to be found from the question.
 * "Which has the most" can be answered from the picture alone, but "how many
 * more" cannot — that one needs the key twice.
 *
 * Every dataset has all-different values, so "most" and "fewest" have
 * exactly one right answer, and each run draws new ones (see
 * buildPictogramCompare).
 */

function PictogramsChallenge2({ onComplete }) {
  const questions = useMemo(() => buildPictogramCompare(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Read the key carefully — it is not always 2."
      render={({ question, submit, locked, index }) => (
        <ReadChart key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function ReadChart({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <PictogramChart rows={question.rows} ratio={question.ratio} symbol={question.symbol} />

      <p className="challenge-prompt">{question.prompt}</p>

      <ChoiceGrid
        options={question.options}
        selected={selected}
        onSelect={setSelected}
        disabled={locked}
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || selected === null}
        onClick={() => submit(selected === question.answer)}
      >
        Check my answer
      </button>
    </>
  );
}

export default PictogramsChallenge2;
