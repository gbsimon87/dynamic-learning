import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import HintNote from "../../../../../components/challenge/HintNote";
import SpeakButton from "../../../../../components/challenge/SpeakButton";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import WordPicker from "../../../../../components/challenge/WordPicker";
import { showHint } from "../../../../../components/challenge/hints";
import {
  CONJUNCTIONS,
  MEANINGS,
  buildConjunctionQuestions,
  isBuildCorrect,
} from "../../../../../data/challenges/english/conjunctions";

// The friendly gloss goes with the term in slots 1–3 and is dropped in 4,
// so the term itself is what gets practised (plan: grammar terms).
const TITLES = [
  "A conjunction (a joining word) joins two parts of a sentence. Tap it.",
  "Choose the conjunction (joining word) that makes sense.",
  "Build the sentence with the right conjunction (joining word).",
  "Choose the ending that makes sense after the conjunction.",
];

function ConjunctionsGame({ level, onComplete }) {
  const questions = useMemo(() => buildConjunctionQuestions(level, Math.random), [level]);

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

function SpotRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <p className="challenge-prompt">
        Look for one of these: <strong>{CONJUNCTIONS.join(" · ")}</strong>
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

function ChooseRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const [before, after] = question.sentence.split("___");
  return (
    <>
      <div className="english-prompt-row">
        <p className="english-focus">
          {before}
          <span className="english-blank">{selected ?? <span className="english-blank-empty">?</span>}</span>
          {after}
        </p>
      </div>
      {hint && (
        <HintNote>
          Read it with each word. “because” {MEANINGS.because}; “although” {MEANINGS.although}.
        </HintNote>
      )}
      <ChoiceGrid options={question.options} selected={selected} onSelect={setSelected} disabled={locked} variant="wordy" />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

function BuildRound({ question, submit, locked, hint }) {
  const [placed, setPlaced] = useState([]);
  const sentence = placed.map((id) => question.tiles.find((tile) => tile.id === id)?.label).join(" ");
  return (
    <>
      <div className="english-prompt-row">
        <p className="challenge-prompt">Use three tiles. One joining word is not needed.</p>
        {placed.length > 0 && <SpeakButton text={sentence} compact label="Hear your sentence" />}
      </div>
      {hint && (
        <HintNote>
          Start with the part that has a capital letter. Then ask: does the last part say why, or is it a surprise?
        </HintNote>
      )}
      <TileBuilder tiles={question.tiles} placed={placed} onChange={setPlaced} disabled={locked} label="Your sentence" />
      <CheckButton disabled={locked || placed.length !== 3} onClick={() => submit(isBuildCorrect(question, placed))} />
    </>
  );
}

function FinishRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const options = hint ? question.options.filter((option) => option !== question.unrelated) : question.options;
  return (
    <>
      <p className="english-focus">{question.start} …</p>
      {hint && <HintNote>One ending had nothing to do with it, so it has gone. Read the start with each one that is left.</HintNote>}
      <ChoiceGrid options={options} selected={selected} onSelect={setSelected} disabled={locked} variant="wordy" />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

const ROUNDS = { spot: SpotRound, choose: ChooseRound, build: BuildRound, finish: FinishRound };

export default ConjunctionsGame;
