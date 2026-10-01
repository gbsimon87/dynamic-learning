import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import HintNote from "../../../../../components/challenge/HintNote";
import SpeakButton from "../../../../../components/challenge/SpeakButton";
import WordPicker from "../../../../../components/challenge/WordPicker";
import { showHint } from "../../../../../components/challenge/hints";
import { buildExceptionWordsQuestions } from "../../../../../data/challenges/english/exceptionWords";

const TITLES = [
  "Exception words (words with an unusual spelling): what do the marked letters say?",
  "Exception words (words with an unusual spelling): find the word that matches.",
  "Exception words (words with an unusual spelling): find the tricky part.",
  "Read the sentence and choose the word that fits.",
];

function ExceptionWordsGame({ level, onComplete }) {
  const questions = useMemo(() => buildExceptionWordsQuestions(level, Math.random), [level]);

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

/** One wrong option goes after two misses; never the answer, never down to one. */
function useStruck(question, hint) {
  if (!hint || question.options.length <= 2) return question.options;
  const struck = question.options.find((option) => option !== question.answer);
  return question.options.filter((option) => option !== struck);
}

function MarkedWord({ chunks, at }) {
  return (
    <p className="english-focus" data-word={chunks.join("")}>
      {chunks.map((chunk, index) =>
        index === at ? <span key={index} className="english-mark">{chunk}</span> : <span key={index}>{chunk}</span>
      )}
    </p>
  );
}

function SoundRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const options = useStruck(question, hint);
  return (
    <>
      <div className="english-prompt-row">
        <MarkedWord chunks={question.chunks} at={question.at} />
        <SpeakButton text={question.word} compact label="Hear the word" />
      </div>
      <p className="challenge-prompt">
        In <strong>{question.word}</strong>, what do the marked letters <strong>{question.letters}</strong> say?
      </p>
      {hint && <HintNote>One wrong answer has gone. Say the word slowly and listen for the marked part.</HintNote>}
      <ChoiceGrid options={options} selected={selected} onSelect={setSelected} disabled={locked} variant="wordy" />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

function WhichRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const options = useStruck(question, hint);
  return (
    <>
      <p className="challenge-prompt" data-letters={question.letters}>
        {question.silent ? (
          <>In which word is the <span className="english-mark">{question.letters}</span> silent (it makes no sound)?</>
        ) : (
          <>In which word do the letters <span className="english-mark">{question.letters}</span> say {question.sound}?</>
        )}
      </p>
      {hint && <HintNote>One word has gone. Say each word that is left, slowly, and listen for the letters.</HintNote>}
      <ChoiceGrid options={options} selected={selected} onSelect={setSelected} disabled={locked} />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

function TapRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <div className="english-prompt-row">
        <p className="english-focus">{question.word}</p>
        <SpeakButton text={question.word} compact label="Hear the word" />
      </div>
      <p className="challenge-prompt">
        {question.silent
          ? <>Tap the letter that makes <strong>no sound</strong>.</>
          : <>Tap the letters that say <strong>{question.sound}</strong>.</>}
      </p>
      {hint && (
        <HintNote>
          {question.hinted ? "It is one of the underlined parts." : "Say the word slowly, one part at a time. Which part sounds different from how it looks?"}
        </HintNote>
      )}
      <WordPicker
        tokens={question.chunks}
        selected={selected}
        onSelect={setSelected}
        disabled={locked}
        hinted={hint && question.hinted ? question.hinted : undefined}
        label={`The letters of ${question.word}`}
      />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.at)} />
    </>
  );
}

function ReadRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const options = useStruck(question, hint);
  const [before, after] = question.sentence.split("___");
  return (
    <>
      <p className="english-focus">
        {before}
        <span className="english-blank">{selected ?? <span className="english-blank-empty">?</span>}</span>
        {after}
      </p>
      {hint && <HintNote>One word has gone. Read the sentence with each word that is left.</HintNote>}
      <ChoiceGrid options={options} selected={selected} onSelect={setSelected} disabled={locked} />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

const ROUNDS = { sound: SoundRound, which: WhichRound, tap: TapRound, read: ReadRound };

export default ExceptionWordsGame;
