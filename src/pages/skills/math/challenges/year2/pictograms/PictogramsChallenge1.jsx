import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import PictogramChart from "../../../../../../components/challenge/PictogramChart";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildPictogramRead } from "../../../../../../data/challenges/statisticsQuestions";

/**
 * Challenge 1 - read a pictogram where one symbol stands for two.
 *
 * The gentlest slot: the key is on screen, the ratio is always 2, and the
 * asked row is highlighted so there is no hunting. All the question wants is
 * "count the symbols, then double". A new dataset every question (see
 * buildPictogramRead).
 */

function PictogramsChallenge1({ onComplete }) {
  const questions = useMemo(() => buildPictogramRead(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Each picture stands for 2. Use the key!"
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
      <PictogramChart
        rows={question.rows}
        ratio={question.ratio}
        symbol={question.symbol}
        highlight={question.ask}
      />

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

export default PictogramsChallenge1;
