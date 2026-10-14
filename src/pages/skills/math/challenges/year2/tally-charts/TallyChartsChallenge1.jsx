import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import TallyChart from "../../../../../../components/challenge/TallyChart";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildTallyRead } from "../../../../../../data/challenges/statisticsQuestions";

/**
 * Challenge 1 - read one row of tally marks.
 *
 * The gentlest slot: one row is highlighted, the rule is on screen, and the
 * counts are chosen so the gates of five do the work — 5, 10, then the
 * leftovers. The asked row always has at least one gate. Distractors are
 * off by one or two, or a whole gate out - what happens when a learner
 * counts every stroke, or a gate as 4 - and are picked at random, so the
 * answer is not always in the same place (see buildTallyRead).
 */

function TallyChartsChallenge1({ onComplete }) {
  const questions = useMemo(() => buildTallyRead(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Tally marks come in gates of five. Count 5, 10, then the rest."
      render={({ question, submit, locked, index }) => (
        <ReadRow key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function ReadRow({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <TallyChart rows={question.rows} highlight={question.ask} />

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

export default TallyChartsChallenge1;
