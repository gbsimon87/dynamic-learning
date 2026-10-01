import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import HintNote from "../../../../../components/challenge/HintNote";
import LetterInput from "../../../../../components/challenge/LetterInput";
import SortBins from "../../../../../components/challenge/SortBins";
import SpeakButton from "../../../../../components/challenge/SpeakButton";
import WordPicker from "../../../../../components/challenge/WordPicker";
import { showHint } from "../../../../../components/challenge/hints";
import {
  buildHomophoneQuestions,
  isSortCorrect,
} from "../../../../../data/challenges/english/homophones";
import { isSameAnswer } from "../../../../../data/challenges/english/shared";

const TITLES = [
  "Homophones (words that sound the same) — pick the right spelling.",
  "Sort the meanings into the right word.",
  "Find the homophone that is spelt wrong.",
  "Type the missing homophone.",
];

function HomophonesGame({ level, onComplete }) {
  const questions = useMemo(() => buildHomophoneQuestions(level, Math.random), [level]);

  return (
    <ChallengeShell
      title={TITLES[level - 1]}
      questions={questions}
      onComplete={onComplete}
      render={({ question, submit, locked, index, misses }) => {
        const Round = ROUNDS[question.kind];
        return (
          <Round key={index} question={question} submit={submit} locked={locked} hint={showHint(misses)} />
        );
      }}
    />
  );
}

function PickRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  // The hint strikes out one wrong spelling, never the answer.
  const struck = hint ? question.options.find((option) => option !== question.answer) : null;
  const options = struck && question.options.length > 2
    ? question.options.filter((option) => option !== struck)
    : question.options;

  return (
    <>
      <span className="english-picture" aria-hidden="true">{question.emoji}</span>
      <div className="english-prompt-row">
        <p className="challenge-prompt">Which word means <strong>{question.meaning}</strong>?</p>
        <SpeakButton text={question.spoken} compact label="Hear it in a sentence" />
      </div>
      {hint && (
        <HintNote>
          {question.options.length > 2
            ? `It is not “${struck}”. `
            : ""}
          Think about the picture, then say each word in a sentence.
        </HintNote>
      )}
      <ChoiceGrid options={options} selected={selected} onSelect={setSelected} disabled={locked} />
      <button type="button" className="submit-btn" disabled={locked || selected === null} onClick={() => submit(selected === question.answer)}>
        Check
      </button>
    </>
  );
}

function SortRound({ question, submit, locked, hint }) {
  const [placement, setPlacement] = useState({});
  const place = (cardId, binId) =>
    setPlacement((previous) => {
      const next = { ...previous };
      if (binId === null) delete next[cardId];
      else next[cardId] = binId;
      return next;
    });
  const allPlaced = question.cards.every((card) => placement[card.id]);

  return (
    <>
      <p className="challenge-prompt">These words sound the same. Which meaning goes with which spelling?</p>
      {hint && <HintNote>Each word has exactly two meanings. Read each card and try it in “I can see a …” or “I can …”.</HintNote>}
      <SortBins bins={question.bins} cards={question.cards} placement={placement} onPlace={place} disabled={locked} />
      <button type="button" className="submit-btn" disabled={locked || !allPlaced} onClick={() => submit(isSortCorrect(question, placement))}>
        Check
      </button>
    </>
  );
}

function FixRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <div className="english-prompt-row">
        <p className="challenge-prompt">One word sounds right but is spelt wrong. Tap it.</p>
        <SpeakButton text={question.tokens.join(" ")} compact label="Hear the sentence" />
      </div>
      {hint && <HintNote>It is one of the underlined words.</HintNote>}
      <WordPicker
        tokens={question.tokens}
        selected={selected}
        onSelect={setSelected}
        disabled={locked}
        hinted={hint ? question.hinted : undefined}
      />
      <button type="button" className="submit-btn" disabled={locked || selected === null} onClick={() => submit(selected === question.wrongIndex)}>
        Check
      </button>
    </>
  );
}

function TypeRound({ question, submit, locked, hint }) {
  const [value, setValue] = useState("");
  const [before, after] = question.sentence.split("___");
  return (
    <>
      <span className="english-picture" aria-hidden="true">{question.emoji}</span>
      <div className="english-prompt-row">
        <p className="challenge-prompt">Read the sentence, or listen to it.</p>
        <SpeakButton text={question.spoken} label="Hear the sentence" />
      </div>
      <p className="english-focus" aria-live="polite">
        {before}
        <span className="english-blank">
          {value || <span className="english-blank-empty">?</span>}
        </span>
        {after}
      </p>
      {hint && <HintNote>The word looks like this: <strong>{question.hint}</strong></HintNote>}
      <LetterInput value={value} onChange={setValue} disabled={locked} label="The missing word" hideLine />
      <button type="button" className="submit-btn" disabled={locked || value === ""} onClick={() => submit(isSameAnswer(value, question.answer))}>
        Check
      </button>
    </>
  );
}

const ROUNDS = { pick: PickRound, sort: SortRound, fix: FixRound, type: TypeRound };

export default HomophonesGame;
