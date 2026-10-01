import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import DragToOrder from "../../../../../components/challenge/DragToOrder";
import HintNote from "../../../../../components/challenge/HintNote";
import ReadingPassage from "../../../../../components/challenge/ReadingPassage";
import SortBins from "../../../../../components/challenge/SortBins";
import { showHint } from "../../../../../components/challenge/hints";
import {
  PLOT_STAGES,
  buildStoryQuestions,
  isOrderCorrect,
  isSortCorrect,
} from "../../../../../data/challenges/english/settingsCharactersAndPlot";

const TITLES = [
  "The setting is where and when a story happens. A good setting sentence helps you see, hear or smell it.",
  "Sort the sentences: setting (where and when), character (who) or plot (what happens).",
  "Put the plot (what happens) in order.",
  "Read the middle of the story. Then help to plan the rest of it.",
];

function SettingsCharactersAndPlotGame({ level, onComplete }) {
  const questions = useMemo(() => buildStoryQuestions(level, Math.random), [level]);

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

function SettingRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const options = hint ? question.options.filter((option) => option !== question.struck) : question.options;
  return (
    <>
      <span className="english-picture" aria-hidden="true">{question.emoji}</span>
      <p className="challenge-prompt">Which sentence best describes <strong>{question.place}</strong>?</p>
      {hint && <HintNote>One sentence was about a person, not a place, so it has gone. Which place does each one that is left describe?</HintNote>}
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
  return (
    <>
      <p className="challenge-prompt">Each sentence comes from a story.</p>
      {hint && (
        <HintNote>
          Two go in each box. Does something happen in the sentence? That is plot. Does it say what someone is like? That
          is a character. Does it describe a place or a time? That is a setting.
        </HintNote>
      )}
      <SortBins bins={question.bins} cards={question.cards} placement={placement} onPlace={place} disabled={locked} />
      <CheckButton
        disabled={locked || question.cards.some((card) => !placement[card.id])}
        onClick={() => submit(isSortCorrect(question, placement))}
      />
    </>
  );
}

function OrderRound({ question, submit, locked, hint }) {
  const [items, setItems] = useState(question.items);
  return (
    <>
      <p className="challenge-prompt">
        Top to bottom: <strong>{PLOT_STAGES.join(" → ")}</strong>
      </p>
      {hint && <HintNote>The story begins: “{question.first}”</HintNote>}
      <DragToOrder items={items} onReorder={setItems} disabled={locked} direction="vertical" />
      <CheckButton disabled={locked} onClick={() => submit(isOrderCorrect(question, items))} />
    </>
  );
}

function PlanRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const options = hint ? question.options.filter((option) => option !== question.struck) : question.options;
  return (
    <>
      <ReadingPassage
        passage={{
          title: question.title,
          kind: "story",
          blocks: [
            { type: "p", label: "Opening", text: "(missing)" },
            { type: "p", label: "Middle", text: question.middle },
            { type: "p", label: "Ending", text: "(missing)" },
          ],
        }}
      />
      <p className="challenge-prompt"><strong>{question.q}</strong></p>
      {hint && <HintNote>One answer did not fit the story at all, so it has gone. Read the middle again.</HintNote>}
      <ChoiceGrid options={options} selected={selected} onSelect={setSelected} disabled={locked} variant="wordy" />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

const ROUNDS = { setting: SettingRound, sort: SortRound, order: OrderRound, plan: PlanRound };

export default SettingsCharactersAndPlotGame;
