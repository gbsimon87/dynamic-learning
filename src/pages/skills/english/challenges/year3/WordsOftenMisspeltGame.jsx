import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import HintNote from "../../../../../components/challenge/HintNote";
import LetterInput from "../../../../../components/challenge/LetterInput";
import SortBins from "../../../../../components/challenge/SortBins";
import SpeakButton from "../../../../../components/challenge/SpeakButton";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import { showHint } from "../../../../../components/challenge/hints";
import {
  buildWordsOftenMisspeltQuestions,
  builtWord,
  isSortCorrect,
} from "../../../../../data/challenges/english/wordsOftenMisspelt";
import { isSameAnswer } from "../../../../../data/challenges/english/shared";

const TITLES = [
  "These words are often spelt wrong. Use the tip to pick the right spelling.",
  "Which words are spelt right, and which are spelt wrong?",
  "Build the word from the letter tiles.",
  "Type the missing word.",
];

function WordsOftenMisspeltGame({ level, onComplete }) {
  const questions = useMemo(() => buildWordsOftenMisspeltQuestions(level, Math.random), [level]);

  return (
    <ChallengeShell
      title={TITLES[level - 1]}
      questions={questions}
      onComplete={onComplete}
      render={({ question, submit, locked, index, misses }) => {
        const Round = ROUNDS[question.kind];
        return <Round key={index} question={question} submit={submit} locked={locked} hint={showHint(misses)} />;
      }}
    />
  );
}

function CheckButton({ disabled, onClick }) {
  return (
    <button type="button" className="submit-btn" disabled={disabled} onClick={onClick}>
      Check
    </button>
  );
}

/** The sentence with its blank, the blank showing `fill` when there is one. */
function BlankSentence({ sentence, fill }) {
  const [before, after] = sentence.split("___");
  return (
    <p className="english-focus" aria-live="polite">
      {before}
      <span className="english-blank">{fill || <span className="english-blank-empty">?</span>}</span>
      {after}
    </p>
  );
}

function PickRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const struck = hint ? question.options.find((option) => option !== question.answer) : null;
  const options = struck ? question.options.filter((option) => option !== struck) : question.options;
  return (
    <>
      <span className="english-picture" aria-hidden="true">{question.emoji}</span>
      <BlankSentence sentence={question.sentence} fill={selected} />
      <p className="challenge-prompt">
        It means <strong>{question.meaning}</strong>. Tip: {question.tip}
      </p>
      {hint && <HintNote>It is not “{struck}”. Read the tip again and check each letter.</HintNote>}
      <ChoiceGrid options={options} selected={selected} onSelect={setSelected} disabled={locked} />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
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
      <p className="challenge-prompt">Look carefully at every letter. Sort each word into the right box.</p>
      {hint && <HintNote>Three are spelt right and three are spelt wrong. Look for a missing letter, a doubled letter, or two letters swapped.</HintNote>}
      <SortBins bins={question.bins} cards={question.cards} placement={placement} onPlace={place} disabled={locked} />
      <CheckButton disabled={locked || !allPlaced} onClick={() => submit(isSortCorrect(question, placement))} />
    </>
  );
}

function BuildRound({ question, submit, locked, hint }) {
  const [placed, setPlaced] = useState([]);
  const word = builtWord(question, placed);
  return (
    <>
      <span className="english-picture" aria-hidden="true">{question.emoji}</span>
      <BlankSentence sentence={question.sentence} />
      <p className="challenge-prompt">
        It means <strong>{question.meaning}</strong>. Use every tile.
      </p>
      {hint && <HintNote>It starts with <strong>{question.word[0]}</strong>.</HintNote>}
      <TileBuilder tiles={question.tiles} placed={placed} onChange={setPlaced} disabled={locked} kind="letters" label="Your word" />
      <CheckButton
        disabled={locked || placed.length !== question.tiles.length}
        onClick={() => submit(isSameAnswer(word, question.answer))}
      />
    </>
  );
}

function TypeRound({ question, submit, locked, hint }) {
  const [value, setValue] = useState("");
  return (
    <>
      <span className="english-picture" aria-hidden="true">{question.emoji}</span>
      <div className="english-prompt-row">
        <p className="challenge-prompt">Read the sentence, or listen to it.</p>
        <SpeakButton text={question.spoken} label="Hear the sentence" />
      </div>
      <BlankSentence sentence={question.sentence} fill={value} />
      <p className="challenge-prompt">It means <strong>{question.meaning}</strong>.</p>
      {hint && <HintNote>The word looks like this: <strong>{question.hint}</strong></HintNote>}
      <LetterInput value={value} onChange={setValue} disabled={locked} label="The missing word" hideLine />
      <CheckButton disabled={locked || value === ""} onClick={() => submit(isSameAnswer(value, question.answer))} />
    </>
  );
}

const ROUNDS = { pick: PickRound, sort: SortRound, build: BuildRound, type: TypeRound };

export default WordsOftenMisspeltGame;
