import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import HintNote from "../../../../../components/challenge/HintNote";
import SpeakButton from "../../../../../components/challenge/SpeakButton";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import { showHint } from "../../../../../components/challenge/hints";
import {
  buildRootWordsQuestions,
  builtWord,
} from "../../../../../data/challenges/english/rootWords";
import { bareWord, tokenise } from "../../../../../data/challenges/english/shared";

// Glossed terms in slots 1–3; slot 4 uses the bare words.
const TITLES = [
  "Find the root word (the word at the heart of a longer word).",
  "Three words share a root word (the word at the heart). Which one does not?",
  "Build a word from a root word and a prefix (front part) or suffix (end part).",
  "Use the root word, prefix and suffix to work out what the new word means.",
];

function RootWordsGame({ level, onComplete }) {
  const questions = useMemo(() => buildRootWordsQuestions(level, Math.random), [level]);

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

/** The hint takes away one wrong option, never the answer, never down to one. */
function useStruck(question, hint, keep) {
  if (!hint || question.options.length <= 2) return question.options;
  const struck = question.options.find((option) => option !== question.answer && option !== keep);
  return question.options.filter((option) => option !== struck);
}

function FindRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const options = useStruck(question, hint);
  return (
    <>
      <div className="english-prompt-row">
        <p className="english-focus" data-word={question.word}>
          {question.parts.map(([text, role], index) =>
            role === "root" ? (
              <span key={index}>{text}</span>
            ) : (
              <span key={index} className="english-mark">{text}</span>
            )
          )}
        </p>
        <SpeakButton text={question.word} compact label="Hear the word" />
      </div>
      <p className="challenge-prompt">
        The added parts (a prefix at the front, a suffix at the end) are marked. What is the <strong>root word</strong>?
      </p>
      {question.note && <p className="challenge-prompt">Watch out: {question.note}</p>}
      {hint && <HintNote>Cover up the marked parts. What word is left? Is it a real word on its own?</HintNote>}
      <ChoiceGrid options={options} selected={selected} onSelect={setSelected} disabled={locked} />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

function OddRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const options = useStruck(question, hint);
  return (
    <>
      <p className="challenge-prompt">
        Three of these words are in the same family. Tap the one that is <strong>not</strong>.
      </p>
      {hint && <HintNote>One family word has gone. Find a word hiding inside the others. The odd one only looks like it.</HintNote>}
      <ChoiceGrid options={options} selected={selected} onSelect={setSelected} disabled={locked} />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

function BuildRound({ question, submit, locked, hint }) {
  const [placed, setPlaced] = useState([]);
  const word = builtWord(question, placed);
  return (
    <>
      <p className="challenge-prompt">
        Build a word that means: <strong>{question.meaning}</strong>
      </p>
      {hint && (
        <HintNote>
          You need two tiles: the root word and one more. The extra part goes at the {question.affixAt === "end" ? "end (a suffix)" : "front (a prefix)"}.
        </HintNote>
      )}
      <TileBuilder tiles={question.tiles} placed={placed} onChange={setPlaced} disabled={locked} kind="letters" label="Your word" />
      <CheckButton disabled={locked || placed.length === 0} onClick={() => submit(word === question.answer)} />
    </>
  );
}

function MeaningRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const options = useStruck(question, hint);
  return (
    <>
      <div className="english-prompt-row">
        <p className="english-focus">
          {tokenise(question.sentence).map((token, index) => (
            <span key={index}>
              {index > 0 && " "}
              {bareWord(token) === question.word ? <strong className="english-mark">{token}</strong> : token}
            </span>
          ))}
        </p>
        <SpeakButton text={question.sentence} compact label="Hear the sentence" />
      </div>
      <p className="challenge-prompt">
        What does <strong>{question.word}</strong> mean here?
      </p>
      {hint && (
        <HintNote>
          Split it up: <strong>{question.parts.join(" + ")}</strong>.{question.note ? ` ${question.note}` : ""}
        </HintNote>
      )}
      <ChoiceGrid options={options} selected={selected} onSelect={setSelected} disabled={locked} variant="wordy" />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

const ROUNDS = { find: FindRound, odd: OddRound, build: BuildRound, meaning: MeaningRound };

export default RootWordsGame;
