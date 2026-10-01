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
  buildTrickySoundsYAndOuQuestions,
  builtWord,
  isSortCorrect,
} from "../../../../../data/challenges/english/trickySoundsYAndOu";
import { isSameAnswer } from "../../../../../data/challenges/english/shared";

const TITLES = [
  "Sometimes y says “i” (as in pin), and ou says “u” (as in cup).",
  "Which words use the tricky spelling (y or ou)?",
  "Build the word from the letter tiles. One tile is not needed.",
  "Type the missing word.",
];

function TrickySoundsYAndOuGame({ level, onComplete }) {
  const questions = useMemo(() => buildTrickySoundsYAndOuQuestions(level, Math.random), [level]);

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

function FillRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  // The hint takes away the clearly wrong vowel, leaving the tricky and the usual spelling.
  const options = hint ? question.options.filter((option) => option === question.answer || option === question.usual) : question.options;
  return (
    <>
      <p className="challenge-prompt">
        In some words, <strong>y</strong> says “i”: g<span className="english-mark">y</span>m. In some words, <strong>ou</strong> says “u”: t<span className="english-mark">ou</span>ch.
      </p>
      <span className="english-picture" aria-hidden="true">{question.emoji}</span>
      <div className="english-prompt-row">
        <p className="english-focus" data-word-before={question.before} data-word-after={question.after}>
          {question.before}
          <span className="english-blank">{selected ?? <span className="english-blank-empty">?</span>}</span>
          {question.after}
        </p>
        <SpeakButton text={question.word} compact label="Hear the word" />
      </div>
      <p className="challenge-prompt">It means <strong>{question.meaning}</strong>. Which letters fill the gap?</p>
      {hint && <HintNote>One has gone. This word uses one of the tricky spellings from the top.</HintNote>}
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
  const [tricky, usual] = question.bins.map((bin) => bin.label);
  return (
    <>
      <p className="challenge-prompt">
        Use the picture to work out each word. Does the gap need <strong>{tricky}</strong> or <strong>{usual}</strong>?
      </p>
      {hint && <HintNote>Three words go in each box. Picture each word written in a book: which spelling does it use?</HintNote>}
      <SortBins bins={question.bins} cards={question.cards} placement={placement} onPlace={place} disabled={locked} />
      <CheckButton disabled={locked || !allPlaced} onClick={() => submit(isSortCorrect(question, placement))} />
    </>
  );
}

function BuildRound({ question, submit, locked, hint }) {
  const [placed, setPlaced] = useState([]);
  return (
    <>
      <span className="english-picture" aria-hidden="true">{question.emoji}</span>
      <div className="english-prompt-row">
        <p className="challenge-prompt">Build the word that means <strong>{question.meaning}</strong>.</p>
        <SpeakButton text={question.word} compact label="Hear the word" />
      </div>
      {hint && (
        <HintNote>
          It has {question.word.length} letters and starts with <strong>{question.word[0]}</strong>. Watch out for the tricky spelling.
        </HintNote>
      )}
      <TileBuilder tiles={question.tiles} placed={placed} onChange={setPlaced} disabled={locked} kind="letters" label="Your word" />
      <CheckButton disabled={locked || placed.length === 0} onClick={() => submit(isSameAnswer(builtWord(question, placed), question.answer))} />
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
        <span className="english-blank">{value || <span className="english-blank-empty">?</span>}</span>
        {after}
      </p>
      {hint && <HintNote>The word looks like this: <strong>{question.hint}</strong></HintNote>}
      <LetterInput value={value} onChange={setValue} disabled={locked} label="The missing word" hideLine />
      <CheckButton disabled={locked || value === ""} onClick={() => submit(isSameAnswer(value, question.answer))} />
    </>
  );
}

const ROUNDS = { fill: FillRound, sort: SortRound, build: BuildRound, type: TypeRound };

export default TrickySoundsYAndOuGame;
