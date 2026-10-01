import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import HintNote from "../../../../../components/challenge/HintNote";
import LetterInput from "../../../../../components/challenge/LetterInput";
import SpeakButton from "../../../../../components/challenge/SpeakButton";
import WordPicker from "../../../../../components/challenge/WordPicker";
import { showHint } from "../../../../../components/challenge/hints";
import {
  MEANINGS,
  PREFIXES,
  buildSuperAntiAutoQuestions,
} from "../../../../../data/challenges/english/thePrefixesSuperAntiAndAuto";
import { isSameAnswer } from "../../../../../data/challenges/english/shared";
import "./WordWork.css";

const TITLES = [
  "The prefixes (start parts) super–, anti– and auto– each have a meaning.",
  "Three words have a prefix (start part). One only looks like it does.",
  "Tap the word whose prefix (start part) has this meaning.",
  "Type the missing prefix.",
];

function ThePrefixesSuperAntiAndAutoGame({ level, onComplete }) {
  const questions = useMemo(() => buildSuperAntiAutoQuestions(level, Math.random), [level]);

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

/** Strikes one wrong option for the hint, only while more than two remain. */
function strikeOne(question, hint) {
  const struck = question.options.find((option) => option !== question.answer);
  if (!hint || question.options.length <= 2) return { options: question.options, struck: null };
  return { options: question.options.filter((option) => option !== struck), struck };
}

function MeaningsCard() {
  return (
    <div className="ww-rule">
      <dl className="ww-rule-list">
        {PREFIXES.map((prefix) => (
          <MeaningRow key={prefix} prefix={prefix} />
        ))}
      </dl>
    </div>
  );
}

function MeaningRow({ prefix }) {
  return (
    <>
      <dt>{prefix}–</dt>
      <dd>means “{MEANINGS[prefix]}”</dd>
    </>
  );
}

function MeaningRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const { options, struck } = strikeOne(question, hint);
  return (
    <>
      <MeaningsCard />
      <span className="english-picture" aria-hidden="true">{question.emoji}</span>
      <div className="english-prompt-row">
        <p className="challenge-prompt">
          Which word means <strong>{question.definition}</strong>?
        </p>
        <SpeakButton text={question.definition} compact label="Hear the meaning" />
      </div>
      {hint && <HintNote>It is not “{struck}”. Which prefix meaning matches the words above?</HintNote>}
      <ChoiceGrid options={options} selected={selected} onSelect={setSelected} disabled={locked} variant="wordy" />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

function OddRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const { options, struck } = strikeOne(question, hint);
  return (
    <>
      <p className="challenge-prompt">
        Three of these start with the prefix <strong>{question.prefix}–</strong>. Which one does not?
      </p>
      {hint && (
        <HintNote>
          “{struck}” really has the prefix. Ask of each word: does it mean “{MEANINGS[question.prefix]}” something?
        </HintNote>
      )}
      <ChoiceGrid options={options} selected={selected} onSelect={setSelected} disabled={locked} variant="wordy" />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

function TapRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <div className="english-prompt-row">
        <p className="challenge-prompt">
          Tap the word with a prefix that means <strong>“{question.meaning}”</strong>.
        </p>
        <SpeakButton text={question.tokens.join(" ")} compact label="Hear the sentence" />
      </div>
      {hint && <HintNote>It is one of the underlined words. Only one of them has the prefix {question.prefix}–.</HintNote>}
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

function TypeRound({ question, submit, locked, hint }) {
  const [value, setValue] = useState("");
  const [before, after] = question.sentence.split("___");
  return (
    <>
      <span className="english-picture" aria-hidden="true">{question.emoji}</span>
      <div className="english-prompt-row">
        <p className="challenge-prompt">Which prefix is missing?</p>
        <SpeakButton text={question.spoken} label="Hear the sentence" />
      </div>
      <p className="english-focus" aria-live="polite">
        {before}
        <span className="english-blank">{value || <span className="english-blank-empty">?</span>}</span>
        {after}
      </p>
      {hint && <HintNote>The prefix looks like this: <strong>{question.hint}</strong></HintNote>}
      <LetterInput value={value} onChange={setValue} disabled={locked} label="The missing prefix" maxLength={8} hideLine />
      <CheckButton disabled={locked || value === ""} onClick={() => submit(isSameAnswer(value, question.answer))} />
    </>
  );
}

const ROUNDS = { meaning: MeaningRound, odd: OddRound, tap: TapRound, type: TypeRound };

export default ThePrefixesSuperAntiAndAutoGame;
