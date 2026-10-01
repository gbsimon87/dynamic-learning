import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import DragToOrder from "../../../../../components/challenge/DragToOrder";
import HintNote from "../../../../../components/challenge/HintNote";
import { showHint } from "../../../../../components/challenge/hints";
import {
  ALPHABET,
  buildUsingADictionaryQuestions,
  isOrderCorrect,
} from "../../../../../data/challenges/english/usingADictionary";
import { bareWord, tokenise } from "../../../../../data/challenges/english/shared";
import "./UsingADictionaryGame.css";

const TITLES = [
  "A dictionary puts words in alphabetical order (a, b, c order).",
  "Guide words (the words at the top of a dictionary page) show the first and last word on the page.",
  "Put the words in alphabetical order (a, b, c order), like a dictionary.",
  "Use the dictionary to check what the word means.",
];

function UsingADictionaryGame({ level, onComplete }) {
  const questions = useMemo(() => buildUsingADictionaryQuestions(level, Math.random), [level]);

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

function FirstRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const options = useStruck(question, hint);
  return (
    <>
      <ol className="dictionary-alphabet" aria-label="The alphabet">
        {ALPHABET.map((letter) => (
          <li key={letter} className="dictionary-alphabet-letter">{letter}</li>
        ))}
      </ol>
      <p className="challenge-prompt">
        Look at the <strong>first letter</strong> of each word. Which word comes <strong>first</strong> in a dictionary?
      </p>
      {hint && <HintNote>One word has gone. Find the first letter of each word left in the alphabet. Which is nearer to a?</HintNote>}
      <ChoiceGrid options={options} selected={selected} onSelect={setSelected} disabled={locked} />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

function PageRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const options = useStruck(question, hint);
  const [first, last] = question.guides;
  return (
    <>
      <div className="dictionary-page" aria-label={`A dictionary page with the guide words ${first} and ${last}`}>
        <div className="dictionary-page-head">
          <span className="dictionary-guide" data-guide="first">{first}</span>
          <span className="dictionary-guide" data-guide="last">{last}</span>
        </div>
        <span className="dictionary-page-lines" aria-hidden="true" />
      </div>
      <p className="challenge-prompt">
        This page starts with <strong>{first}</strong> and ends with <strong>{last}</strong>. Which word is on this page?
      </p>
      {hint && (
        <HintNote>
          One word has gone. The first letters are all the same, so look at the second letter, then the third.
        </HintNote>
      )}
      <ChoiceGrid options={options} selected={selected} onSelect={setSelected} disabled={locked} />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

function OrderRound({ question, submit, locked, hint }) {
  const [items, setItems] = useState(question.items);
  return (
    <>
      <p className="challenge-prompt">
        Drag the words into dictionary order, from first to last.
      </p>
      {hint && (
        <HintNote>
          They all start with the same letter, so look at the next one. You need to look as far as letter {question.decider}.
        </HintNote>
      )}
      <DragToOrder items={items} onReorder={setItems} disabled={locked} />
      <CheckButton disabled={locked} onClick={() => submit(isOrderCorrect(question, items))} />
    </>
  );
}

function MeaningRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const options = useStruck(question, hint);
  return (
    <>
      <p className="english-focus">
        {tokenise(question.sentence).map((token, index) => (
          <span key={index}>
            {index > 0 && " "}
            {bareWord(token) === question.word ? <strong className="english-mark">{token}</strong> : token}
          </span>
        ))}
      </p>
      <div className="dictionary-entry" aria-label={`Dictionary entry for ${question.word}`}>
        <p className="dictionary-entry-word">{question.word}</p>
        <ol className="dictionary-entry-list">
          {question.meanings.map((meaning) => (
            <li key={meaning}>{meaning}</li>
          ))}
        </ol>
      </div>
      <p className="challenge-prompt">Which meaning fits the sentence?</p>
      {hint && (
        <HintNote>
          {question.options.length > 2 ? "One meaning has gone. " : ""}
          Read the sentence again with each meaning in place of the word. Which one makes sense?
        </HintNote>
      )}
      <ChoiceGrid options={options} selected={selected} onSelect={setSelected} disabled={locked} variant="wordy" />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

const ROUNDS = { first: FirstRound, page: PageRound, order: OrderRound, meaning: MeaningRound };

export default UsingADictionaryGame;
