import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import HintNote from "../../../../../components/challenge/HintNote";
import WordPicker from "../../../../../components/challenge/WordPicker";
import { showHint } from "../../../../../components/challenge/hints";
import { buildProofreadingQuestions, sentenceAround } from "../../../../../data/challenges/english/proofreading";

const TITLES = [
  "Proofreading (checking for mistakes): the mistake is marked. Choose the right spelling.",
  "Proofread (check for mistakes): tap the word that is spelt wrong.",
  "Proofread (check for mistakes): find the one mistake and tap it.",
  "Find the mistakes in the paragraph. Tap them one at a time.",
];

function ProofreadingGame({ level, onComplete }) {
  const questions = useMemo(() => buildProofreadingQuestions(level, Math.random), [level]);
  // Level 4: mistakes already found stay corrected for the next question,
  // in whatever order the child finds them.
  const [found, setFound] = useState([]);

  return (
    <ChallengeShell
      title={TITLES[level - 1]}
      questions={questions}
      onComplete={onComplete}
      render={({ question, submit, locked, index, misses }) => {
        const Round = ROUNDS[question.kind];
        return (
          <Round
            key={index}
            question={question}
            submit={submit}
            locked={locked}
            hint={showHint(misses)}
            found={found}
            onFound={(token) => setFound((previous) => [...previous, token])}
          />
        );
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

function CorrectRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const options = hint ? question.options.filter((option) => option !== question.struck) : question.options;
  return (
    <>
      <p className="english-focus">
        {question.before}
        <span className="english-mark">{question.shown}</span>
        {question.after}
      </p>
      {hint && <HintNote>“{question.struck}” is not right either, so it has gone. Which one looks right?</HintNote>}
      <ChoiceGrid options={options} selected={selected} onSelect={setSelected} disabled={locked} />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

function TapRound({ question, submit, locked, hint, prompt, hintText }) {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <p className="challenge-prompt">{prompt}</p>
      {hint && <HintNote>{hintText}</HintNote>}
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

function SpellRound(props) {
  return <TapRound {...props} prompt="One word is spelt wrong." hintText="It is one of the underlined words." />;
}

function MarkRound(props) {
  return (
    <TapRound
      {...props}
      prompt="A capital letter is missing, or the end mark is wrong. Tap the word with the mistake."
      hintText="It is one of the underlined words. Check names, “I”, the first word, and the mark at the end."
    />
  );
}

function TenseRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <p className="challenge-prompt">This happened in the past. One sentence slips into the present. Tap it.</p>
      {hint && <HintNote>Find the doing word in each sentence. Does it say it happened (went, climbed) or that it is happening now?</HintNote>}
      <WordPicker
        variant="sentences"
        tokens={question.sentences}
        selected={selected}
        onSelect={setSelected}
        disabled={locked}
        label="The text"
      />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

function HuntRound({ question, submit, locked, hint, found, onFound }) {
  const [selected, setSelected] = useState(null);
  const foundSet = new Set(found);
  const tokens = question.shown.map((token, index) => (foundSet.has(index) ? question.fixed[index] : token));
  const remaining = question.errors.filter((index) => !foundSet.has(index));
  const hinted = hint && remaining.length > 0 ? new Set(sentenceAround(question.shown, remaining[0])) : undefined;

  const check = () => {
    const right = remaining.includes(selected);
    if (right) onFound(selected);
    submit(right);
  };

  return (
    <>
      <h4 className="reading-passage-title">{question.title}</h4>
      <p className="challenge-prompt">
        There are <strong>{question.errors.length}</strong> mistakes: a spelling, a capital letter and an end mark.
        Found: <strong>{found.length}</strong>
      </p>
      {hint && <HintNote>There is a mistake in the underlined sentence.</HintNote>}
      <WordPicker
        tokens={tokens}
        selected={selected}
        onSelect={setSelected}
        disabled={locked}
        pickable={(index) => !foundSet.has(index)}
        hinted={hinted}
        label="The paragraph"
      />
      <CheckButton disabled={locked || selected === null} onClick={check} />
    </>
  );
}

const ROUNDS = { correct: CorrectRound, spell: SpellRound, mark: MarkRound, tense: TenseRound, hunt: HuntRound };

export default ProofreadingGame;
