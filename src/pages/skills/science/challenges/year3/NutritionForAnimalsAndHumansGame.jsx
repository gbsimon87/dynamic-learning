import { useMemo, useRef, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import DataTable from "../../../../../components/challenge/DataTable";
import HintNote from "../../../../../components/challenge/HintNote";
import ObservationSequence from "../../../../../components/challenge/ObservationSequence";
import ScienceInformationCard from "../../../../../components/challenge/ScienceInformationCard";
import SortBins from "../../../../../components/challenge/SortBins";
import ScienceRound from "../../../../../components/challenge/ScienceRound";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import { useProcessEnquiry } from "../../../../../hooks/useProcessEnquiry.js";
import { FOOD_GROUPS, GLOSS, SOURCES, buildNutritionQuestions, isNutritionMealCorrect, isNutritionRecordCorrect } from "../../../../../data/challenges/science/nutritionForAnimalsAndHumans.js";

const TITLES = ["Food gives animals nutrition", "Compare what animals eat", "Build a menu", "Read the nutrition cards"];
function SourceCard({ card, title }) { return <ScienceInformationCard title={title ?? card.label} text={card.text} sourceLabel={SOURCES[card.source]?.label} />; }
export default function NutritionForAnimalsAndHumansGame({ level, onComplete }) {
  const questions = useMemo(() => buildNutritionQuestions(level, Math.random), [level]);
  return <ChallengeShell wide title={TITLES[level - 1]} questions={questions} onComplete={onComplete} render={({ question, submit, locked, index, misses, feedback }) => {
    const Round = level === 4 ? ResearchRound : ShortRound;
    return <Round key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} feedback={feedback} />;
  }} />;
}
function ShortRound({ question, submit, locked, hint, feedback }) {
  const [selected, setSelected] = useState(null);
  const [record, setRecord] = useState({});
  const [placed, setPlaced] = useState([]);
  const accepted = useRef(false);
  const total = Object.values(question.requirements ?? {}).reduce((sum, amount) => sum + amount, 0);
  const ready = question.level === 1 ? selected !== null : question.level === 2 ? Object.keys(record).length === question.recordCards.length : placed.length === total;
  const check = () => {
    if (locked || accepted.current || !ready) return;
    const correct = question.level === 1 ? selected === question.answer : question.level === 2 ? isNutritionRecordCorrect(question, record) : isNutritionMealCorrect(question, placed);
    if (correct) accepted.current = true;
    submit(correct);
  };
  const prompt = question.level === 1 ? question.prompt : question.level === 2 ? "Sort each card. Does it show plant foods, animal foods or both?" : question.title;
  return <ScienceRound
    prompt={<p className="challenge-prompt">{prompt}</p>} speak={`${question.level === 2 ? question.cards.map((card) => card.text).join(" ") : question.text} ${question.level === 3 ? FOOD_GROUPS.map((group) => `${group.label}: ${question.requirements[group.id]} food cards`).join(". ") : ""} ${prompt}`} speakLabel="Hear the task" gloss={GLOSS}
    evidence={question.level === 1 ? <SourceCard card={question} />
      : question.level === 2 ? <div className="science-life-cards">{question.cards.map((card) => <SourceCard key={card.id} card={card} />)}</div>
      : <><ScienceInformationCard title="Menu rules" text={question.text} /><DataTable caption="How many food cards to pick" columns={[{ key: "amount", label: "Cards to pick" }]} rows={FOOD_GROUPS.map((group) => ({ label: group.label, cells: { amount: question.requirements[group.id] } }))} /></>}
    answerLabel={question.level === 2 ? "Sort by the foods on the cards. Animals may eat other foods too." : question.level === 3 ? `Choose ${total} food cards. Many menus can work. Tap a card to take it back.` : undefined}
    hint={hint && <HintNote>{question.level === 3 ? "Count the cards in each group. Check the table, not just the total." : question.level === 2 ? "Look at the foods on each card. Are they plants, animals or both? Humans are animals too." : "Read the information card again. Find the sentence that answers the question."}</HintNote>}
    check={{ label: "Check", disabled: locked || !ready, onClick: check }} feedback={feedback}>
    {question.level === 1 && <ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={(value) => { if (!locked && !accepted.current) setSelected(value); }} />}
    {question.level === 2 && <SortBins cards={question.recordCards} bins={question.recordBins} placement={record} disabled={locked} onPlace={(id, bin) => { if (locked || accepted.current) return; setRecord((previous) => { const next = { ...previous }; if (bin === null) delete next[id]; else next[id] = bin; return next; }); }} />}
    {question.level === 3 && <TileBuilder tiles={question.tiles} placed={placed} disabled={locked} label="Your menu" onChange={(update) => { if (!locked && !accepted.current) setPlaced((previous) => update(previous)); }} />}
  </ScienceRound>;
}
function ResearchRound({ question, submit, locked, hint, feedback }) {
  const { state, dispatch, updateConclusion } = useProcessEnquiry({ question, validateRecord: isNutritionRecordCorrect, submit, locked });
  const { stage } = state;
  const current = state.seen.includes(state.observation) ? question.stages[state.observation] : null;
  const hints = { prediction: "A prediction is a guess before you look. Any guess is fine.", observe: "Read both cards. You can go back to a card you have read.", record: "Check each claim against the cards. If the cards give no portion sizes, we cannot work out an exact amount.", conclusion: "Choose the ending that matches both cards. Different animals can need different foods and amounts." };
  const action = stage === "prediction" ? { label: "Read the cards", disabled: locked || !state.prediction, onClick: () => dispatch({ type: "start" }) }
    : stage === "observe" ? (state.seen.length === question.stages.length ? { label: "Check the claims", disabled: locked, onClick: () => dispatch({ type: "recordStage" }) } : null)
    : stage === "record" ? { label: "Check my sort", disabled: locked || Object.keys(state.record).length !== question.recordCards.length, onClick: () => dispatch({ type: "checkRecord" }, true) }
    : stage === "done" ? null
    : { label: "Check my report", disabled: locked || state.conclusion.length !== 1, onClick: () => dispatch({ type: "finish" }, true) };
  return <ScienceRound
    prompt={<p className="challenge-prompt">{question.title}</p>} speak={`${question.setup} ${current?.text ?? ""} ${hints[stage] ?? ""}`} speakLabel="Hear this stage" gloss={GLOSS}
    evidence={<p>{question.setup}</p>}
    hint={hint && stage !== "done" && <HintNote>{hints[stage]}</HintNote>}
    check={action} feedback={feedback}
    secondary={stage !== "prediction" && stage !== "done" && <button type="button" className="science-reset" disabled={locked} onClick={() => dispatch({ type: "reset" })}>Start again</button>}>
    <p role="status">Stage: {stage === "prediction" ? "Predict" : stage === "observe" ? "Read" : stage === "record" ? "Check claims" : "Explain"}</p>
    {stage === "prediction" && <><p>What do you think the cards will say? There is no wrong answer.</p><ChoiceGrid options={question.predictionOptions} selected={state.prediction} disabled={locked} variant="wordy" onSelect={(value) => dispatch({ type: "predict", value })} /></>}
    {["observe", "record", "conclusion"].includes(stage) && <ObservationSequence stages={question.stages} index={state.observation} seen={state.seen} disabled={locked} label="Nutrition cards" nextLabel="Read next card" onView={(index) => dispatch({ type: "view", index })} onNext={stage === "observe" ? () => dispatch({ type: "next" }) : null} renderObservation={(card) => <SourceCard card={card} />} />}
    {stage === "record" && <><p>Sort both claims. A claim is right only when the cards agree with it.</p><SortBins cards={question.recordCards} bins={question.recordBins} placement={state.record} disabled={locked} onPlace={(id, bin) => dispatch({ type: "record", id, bin })} /></>}
    {stage === "conclusion" && <><p>Finish the report. Choose one ending.</p><TileBuilder tiles={question.tiles} placed={state.conclusion} disabled={locked} label="Your report" onChange={updateConclusion} /><p>Think about this: {question.followUp}</p></>}
  </ScienceRound>;
}
