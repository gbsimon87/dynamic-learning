import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import HintNote from "../../../../../components/challenge/HintNote";
import ReadingPassage from "../../../../../components/challenge/ReadingPassage";
import SortBins from "../../../../../components/challenge/SortBins";
import SpeakButton from "../../../../../components/challenge/SpeakButton";
import WordPicker from "../../../../../components/challenge/WordPicker";
import { showHint } from "../../../../../components/challenge/hints";
import {
  buildWordsInContextQuestions,
  isSortCorrect,
} from "../../../../../data/challenges/english/wordsInContext";
import { bareWord, tokenise } from "../../../../../data/challenges/english/shared";

const TITLES = [
  "Some words have more than one meaning. Read the sentence to find the one that fits.",
  "Some words have more than one meaning. Sort the sentences by meaning.",
  "Work out a new word from the sentence after it.",
  "Read the story. What do the words mean in it?",
];

function WordsInContextGame({ level, onComplete }) {
  const questions = useMemo(() => buildWordsInContextQuestions(level, Math.random), [level]);

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

/** The sentence with the word asked about marked. */
function MarkedSentence({ sentence, word }) {
  return (
    <p className="english-focus">
      {tokenise(sentence).map((token, index) => (
        <span key={index}>
          {index > 0 && " "}
          {bareWord(token) === word ? <strong className="english-mark">{token}</strong> : token}
        </span>
      ))}
    </p>
  );
}

function PickRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <div className="english-prompt-row">
        <MarkedSentence sentence={question.sentence} word={question.word} />
        <SpeakButton text={question.sentence} compact label="Hear the sentence" />
      </div>
      <p className="challenge-prompt">
        What does <strong>{question.word}</strong> mean in this sentence?
      </p>
      {hint && <HintNote>Look at the other words in the sentence. Try each meaning in place of “{question.word}”. Which one makes sense?</HintNote>}
      <ChoiceGrid options={question.options} selected={selected} onSelect={setSelected} disabled={locked} variant="wordy" />
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
      <p className="challenge-prompt">
        Every sentence uses <strong>{question.word}</strong>. Which meaning does it have in each one?
      </p>
      {hint && <HintNote>Each meaning has two sentences. Read a sentence, then try each meaning in place of “{question.word}”.</HintNote>}
      <SortBins bins={question.bins} cards={question.cards} placement={placement} onPlace={place} disabled={locked} />
      <CheckButton disabled={locked || !allPlaced} onClick={() => submit(isSortCorrect(question, placement))} />
    </>
  );
}

function ClueRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <MarkedSentence sentence={question.first} word={question.word} />
      <p className="challenge-prompt">
        Tap the word in this sentence that tells you what <strong>{question.word}</strong> means.
      </p>
      {hint && <HintNote>It is one of the underlined words.</HintNote>}
      <WordPicker
        tokens={question.tokens}
        selected={selected}
        onSelect={setSelected}
        disabled={locked}
        hinted={hint ? question.hinted : undefined}
      />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answerIndex)} />
    </>
  );
}

function StoryRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const options = hint ? question.options.filter((option) => option !== question.unrelated) : question.options;
  return (
    <>
      <ReadingPassage passage={question.passage} highlight={hint ? new Set([question.para]) : undefined} />
      <p className="english-focus">{question.q}</p>
      {hint && <HintNote>One answer has gone. The word is in the part with the box around it. Read that part again.</HintNote>}
      <ChoiceGrid options={options} selected={selected} onSelect={setSelected} disabled={locked} variant="wordy" />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

const ROUNDS = { pick: PickRound, sort: SortRound, clue: ClueRound, story: StoryRound };

export default WordsInContextGame;
