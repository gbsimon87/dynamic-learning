import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import HintNote from "../../../../../components/challenge/HintNote";
import SortBins from "../../../../../components/challenge/SortBins";
import SpeakButton from "../../../../../components/challenge/SpeakButton";
import WordPicker from "../../../../../components/challenge/WordPicker";
import { showHint } from "../../../../../components/challenge/hints";
import {
  buildAOrAnQuestions,
  isSortCorrect,
  isStoryCorrect,
} from "../../../../../data/challenges/english/aOrAn";
import "./WordWork.css";

const TITLES = [
  "a or an? Look at the first letter of the next word: is it a vowel letter or a consonant letter?",
  "Sort them: does each one need a or an? Think vowel letter or consonant letter.",
  "One a or an is wrong. Tap it. (Check the next word’s first letter: vowel or consonant?)",
  "Fill each gap with a or an.",
];

function AOrAnGame({ level, onComplete }) {
  const questions = useMemo(() => buildAOrAnQuestions(level, Math.random), [level]);

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
        The vowel letters are <strong>a, e, i, o, u</strong>. All the other letters are consonant letters.
      </p>
      <p>
        Next word starts with a vowel letter? Use <strong>an</strong>: an open box.
      </p>
      <p>
        Next word starts with a consonant letter? Use <strong>a</strong>: a rock.
      </p>
    </div>
  );
}

function PickRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const first = question.word[0];
  const rest = question.word.slice(1);
  return (
    <>
      <RuleCard />
      <span className="english-picture" aria-hidden="true">{question.emoji}</span>
      <p className="english-focus">
        <span className="english-blank">{selected ?? <span className="english-blank-empty">?</span>}</span>{" "}
        <span className="english-mark">{first}</span>
        {rest}
      </p>
      {hint && (
        <HintNote>
          The first letter is “{first}”. Is it one of a, e, i, o, u?
        </HintNote>
      )}
      <ChoiceGrid options={question.options} selected={selected} onSelect={setSelected} disabled={locked} />
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
      <p className="challenge-prompt">Would you say “a …” or “an …”?</p>
      {hint && (
        <HintNote>
          Three go in each box. Only the FIRST word on each card matters: “huge egg” starts with h.
        </HintNote>
      )}
      <SortBins bins={question.bins} cards={question.cards} placement={placement} onPlace={place} disabled={locked} />
      <CheckButton disabled={locked || !allPlaced} onClick={() => submit(isSortCorrect(question, placement))} />
    </>
  );
}

function FixRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <div className="english-prompt-row">
        <p className="challenge-prompt">Tap the a or an that is wrong.</p>
        <SpeakButton text={question.tokens.join(" ")} compact label="Hear the sentence" />
      </div>
      {hint && (
        <HintNote>
          Look at the underlined pairs. Does the word after each a or an start with a vowel letter?
        </HintNote>
      )}
      <WordPicker
        tokens={question.tokens}
        selected={selected}
        onSelect={setSelected}
        disabled={locked}
        hinted={hint ? question.hinted : undefined}
      />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.wrongIndex)} />
    </>
  );
}

/** Empty → a → an → a … */
const nextChoice = (value) => (value === "a" ? "an" : "a");

/**
 * A mini-story with tappable gaps: each tap turns a gap to "a", then "an",
 * then back. The hint marks the first letter of the word after each gap.
 */
function StoryRound({ question, submit, locked, hint }) {
  const [chosen, setChosen] = useState(() => question.gaps.map(() => null));
  const flip = (gap) =>
    setChosen((previous) => previous.map((value, index) => (index === gap ? nextChoice(value) : value)));
  const allChosen = chosen.every((value) => value !== null);
  const spoken = question.parts.reduce(
    (text, part, index) => text + (index > 0 ? chosen[index - 1] ?? "blank" : "") + part,
    ""
  );

  return (
    <>
      <div className="english-prompt-row">
        <p className="challenge-prompt">Tap a gap to change it. Every gap needs a or an.</p>
        <SpeakButton text={spoken} compact label="Hear the story" />
      </div>
      {hint && <HintNote>Look at the marked letter after each gap.</HintNote>}
      <p className="ww-story">
        {question.parts.map((part, index) => (
          <StoryPart
            key={index}
            part={part}
            gap={index - 1}
            value={index > 0 ? chosen[index - 1] : null}
            onFlip={flip}
            disabled={locked}
            hint={hint && index > 0}
          />
        ))}
      </p>
      <CheckButton disabled={locked || !allChosen} onClick={() => submit(isStoryCorrect(question, chosen))} />
    </>
  );
}

function StoryPart({ part, gap, value, onFlip, disabled, hint }) {
  // The text after a gap starts " owl in…"; split off its first letter so
  // the hint can mark it.
  const match = gap >= 0 ? part.match(/^(\s*)(\S)([\s\S]*)$/) : null;
  return (
    <>
      {gap >= 0 && (
        <button
          type="button"
          className={`ww-gap ww-gap-btn ${value ? "is-filled" : ""}`}
          disabled={disabled}
          onClick={() => onFlip(gap)}
          aria-label={`Gap ${gap + 1}: ${value ?? "empty"}. Tap to change`}
        >
          {value ?? <span aria-hidden="true">?</span>}
        </button>
      )}
      {match && hint ? (
        <>
          {match[1]}
          <span className="english-mark">{match[2]}</span>
          {match[3]}
        </>
      ) : (
        part
      )}
    </>
  );
}

const ROUNDS = { pick: PickRound, sort: SortRound, fix: FixRound, story: StoryRound };

export default AOrAnGame;
