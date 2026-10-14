import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import TallyChart from "../../../../../../components/challenge/TallyChart";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildTallyWhole } from "../../../../../../data/challenges/statisticsQuestions";

/**
 * Challenge 2 - read the whole chart, with nothing highlighted.
 *
 * The rule is no longer stated and the row is no longer pointed at, so which
 * row to count has to be worked out from the question. "Most" and "fewest"
 * can be answered by eye; "altogether" cannot — that one needs every row
 * counted and then added, which is where four rows starts to bite.
 *
 * Every dataset has all-different values, so "most" and "fewest" each have
 * exactly one correct answer, and each run draws new ones (see
 * buildTallyWhole).
 */

function TallyChartsChallenge2({ onComplete }) {
  const questions = useMemo(() => buildTallyWhole(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Read the tally chart to answer the question."
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
      <TallyChart rows={question.rows} />

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

export default TallyChartsChallenge2;
