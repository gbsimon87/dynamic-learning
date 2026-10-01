import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import HintNote from "../../../../../components/challenge/HintNote";
import SortBins from "../../../../../components/challenge/SortBins";
import SpeakButton from "../../../../../components/challenge/SpeakButton";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import { showHint } from "../../../../../components/challenge/hints";
import {
  buildWordFamilyQuestions,
  builtWord,
  isBuildCorrect,
  isSortCorrect,
} from "../../../../../data/challenges/english/wordFamilies";
import "./WordWork.css";

const TITLES = [
  "A word family (words built from the same root word) shares spelling AND meaning.",
  "Sort the words into their word family (words from the same root). Some only look alike!",
  "Build a word in the word family (words from the same root) that matches the meaning.",
  "Choose the word that fits the sentence.",
];

function WordFamiliesGame({ level, onComplete }) {
  const questions = useMemo(() => buildWordFamilyQuestions(level, Math.random), [level]);

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

function RuleCard() {
  return (
    <div className="ww-rule">
      <p>
        <strong>help</strong> → helpful, helper, unhelpful: all of them are about helping.
      </p>
      <p>
        <strong>helmet</strong> starts with the same letters, but it has nothing to do with helping, so it is not in
        the family.
      </p>
    </div>
  );
}

function PickRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  // The hint takes away one look-alike: three options, so two remain.
  const struck = question.lookAlikes[0];
  const options = hint ? question.options.filter((option) => option !== struck) : question.options;
  return (
    <>
      <RuleCard />
      <span className="english-picture" aria-hidden="true">{question.emoji}</span>
      <p className="challenge-prompt">
        Which word is in the <strong>{question.root}</strong> family?
      </p>
      {hint && <HintNote>It is not “{struck}”. Which word still has something to do with “{question.root}”?</HintNote>}
      <ChoiceGrid options={options} selected={selected} onSelect={setSelected} disabled={locked} variant="wordy" />
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
        Is it about <strong>{question.roots[0]}</strong>, about <strong>{question.roots[1]}</strong>, or neither?
      </p>
      {hint && (
        <HintNote>
          Two words go in each box. A look-alike has the same letters but a different meaning.
        </HintNote>
      )}
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
      <div className="english-prompt-row">
        <p className="challenge-prompt">
          Make a <strong>{question.root}</strong> word that means <strong>{question.meaning}</strong>.
        </p>
        {placed.length > 0 && <SpeakButton text={word} compact label="Hear your word" />}
      </div>
      {hint && (
        <HintNote>
          Use {question.partCount} tiles, and one of them is “{question.root}”. Say your word: does it mean “
          {question.meaning}”?
        </HintNote>
      )}
      <TileBuilder tiles={question.tiles} placed={placed} onChange={setPlaced} disabled={locked} kind="letters" label="Your word" />
      <CheckButton disabled={locked || placed.length < 2} onClick={() => submit(isBuildCorrect(question, placed))} />
    </>
  );
}

function FitRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const struck = question.options.find((option) => option !== question.answer);
  const options = hint ? question.options.filter((option) => option !== struck) : question.options;
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
      {hint && <HintNote>It is not “{struck}”. Read the sentence with each word that is left.</HintNote>}
      <ChoiceGrid options={options} selected={selected} onSelect={setSelected} disabled={locked} variant="wordy" />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

const ROUNDS = { pick: PickRound, sort: SortRound, build: BuildRound, fit: FitRound };

export default WordFamiliesGame;
