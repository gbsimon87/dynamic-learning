import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import HintNote from "../../../../../components/challenge/HintNote";
import ReadingPassage from "../../../../../components/challenge/ReadingPassage";
import SpeakButton from "../../../../../components/challenge/SpeakButton";
import WordPicker from "../../../../../components/challenge/WordPicker";
import { showHint } from "../../../../../components/challenge/hints";
import { FEELINGS, buildFeelingsQuestions } from "../../../../../data/challenges/english/charactersFeelings";

const TITLES = [
  "How does the character feel?",
  "Which sentence shows the feeling?",
  "Find the evidence: tap the sentence that shows the feeling.",
  "Read the story, then answer the questions.",
];

function CharactersFeelingsGame({ level, onComplete }) {
  const questions = useMemo(() => buildFeelingsQuestions(level, Math.random), [level]);

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

/** One wrong option is taken away by the hint; never the answer. */
function useStruckOptions(question, hint) {
  const struck = question.options.find((option) => option !== question.answer);
  return hint && question.options.length > 2
    ? question.options.filter((option) => option !== struck)
    : question.options;
}

function FeelingRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const options = useStruckOptions(question, hint);
  return (
    <>
      <ReadingPassage passage={{ blocks: [{ type: "p", text: question.text }] }} />
      {hint && <HintNote>Look at what they DO. Those clues tell you how they feel.</HintNote>}
      <ChoiceGrid options={options} selected={selected} onSelect={setSelected} disabled={locked} variant="wordy" />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

function ActionRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const options = useStruckOptions(question, hint);
  return (
    <>
      <span className="english-picture" aria-hidden="true">{question.emoji}</span>
      <p className="english-focus">
        {question.who} feels <strong>{question.feeling}</strong>. Which sentence shows it?
      </p>
      {hint && <HintNote>Picture someone who feels {question.feeling}. What would they do?</HintNote>}
      <ChoiceGrid options={options} selected={selected} onSelect={setSelected} disabled={locked} variant="wordy" />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

function EvidenceRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <div className="english-prompt-row">
        <p className="challenge-prompt">
          Which sentence shows that {question.who} feels <strong>{FEELINGS[question.feeling]} {question.feeling}</strong>?
        </p>
        <SpeakButton text={question.sentences.join(" ")} compact label="Read it to me" />
      </div>
      {hint && <HintNote>Most of these sentences only tell you what happened. One tells you what {question.who} did or felt inside.</HintNote>}
      <WordPicker
        tokens={question.sentences}
        selected={selected}
        onSelect={setSelected}
        disabled={locked}
        variant="sentences"
        label="The story"
      />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

function PassageRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <ReadingPassage passage={question.passage} highlight={hint ? new Set([question.para]) : undefined} />
      <p className="english-focus">{question.q}</p>
      {hint && <HintNote>The answer is in the paragraph with the box around it.</HintNote>}
      <ChoiceGrid options={question.options} selected={selected} onSelect={setSelected} disabled={locked} variant="wordy" />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

const ROUNDS = { feeling: FeelingRound, action: ActionRound, evidence: EvidenceRound, passage: PassageRound };

export default CharactersFeelingsGame;
