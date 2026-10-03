import { useMemo, useRef, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import DataTable from "../../../../../components/challenge/DataTable";
import HintNote from "../../../../../components/challenge/HintNote";
import ObservationSequence from "../../../../../components/challenge/ObservationSequence";
import ScienceInformationCard from "../../../../../components/challenge/ScienceInformationCard";
import SortBins from "../../../../../components/challenge/SortBins";
import SpeakButton from "../../../../../components/challenge/SpeakButton";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import { useProcessEnquiry } from "../../../../../hooks/useProcessEnquiry.js";
import { FOOD_GROUPS, GLOSS, SOURCES, buildNutritionQuestions, isNutritionMealCorrect, isNutritionRecordCorrect } from "../../../../../data/challenges/science/nutritionForAnimalsAndHumans.js";

const TITLES = ["Food gives animals nutrition", "Compare food sources", "Build a model menu", "Research nutrition cards"];
function Vocabulary() { return <details className="science-gloss"><summary>Science words</summary><p>{GLOSS}</p></details>; }
function SourceCard({ card, title }) { return <ScienceInformationCard title={title ?? card.label} text={card.text} sourceLabel={SOURCES[card.source]?.label} />; }
export default function NutritionForAnimalsAndHumansGame({ level, onComplete }) {
  const questions = useMemo(() => buildNutritionQuestions(level, Math.random), [level]);
  return <ChallengeShell title={TITLES[level - 1]} questions={questions} onComplete={onComplete} render={({ question, submit, locked, index, misses }) => {
    const Round = level === 4 ? ResearchRound : ShortRound;
    return <Round key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} />;
  }} />;
}
function ShortRound({ question, submit, locked, hint }) {
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
  const prompt = question.level === 1 ? question.prompt : question.level === 2 ? "Sort by the food sources described on each card." : question.title;
  return <><Vocabulary /><p className="challenge-prompt">{prompt}</p>
    <SpeakButton text={`${prompt} ${question.level === 2 ? question.cards.map((card) => card.text).join(" ") : question.text} ${question.level === 3 ? FOOD_GROUPS.map((group) => `${group.label}: ${question.requirements[group.id]} food cards`).join(". ") : ""}`} label="Hear the task" />
    {question.level === 1 && <><SourceCard card={question} /><ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={(value) => { if (!locked && !accepted.current) setSelected(value); }} /></>}
    {question.level === 2 && <><p>Classify the listed foods. The cards do not list everything these animals ever eat.</p><div className="science-life-cards">{question.cards.map((card) => <SourceCard key={card.id} card={card} />)}</div><SortBins cards={question.recordCards} bins={question.recordBins} placement={record} disabled={locked} onPlace={(id, bin) => { if (locked || accepted.current) return; setRecord((previous) => { const next = { ...previous }; if (bin === null) delete next[id]; else next[id] = bin; return next; }); }} /></>}
    {question.level === 3 && <><ScienceInformationCard title="Model menu rules" text={question.text} /><DataTable caption="Required number of food cards" columns={[{ key: "amount", label: "Food cards to choose" }]} rows={FOOD_GROUPS.map((group) => ({ label: group.label, cells: { amount: question.requirements[group.id] } }))} /><p>Choose {total} food cards in any order. More than one combination can fit. Tap a chosen card to take it back.</p><TileBuilder tiles={question.tiles} placed={placed} disabled={locked} label="Your model menu" onChange={(update) => { if (!locked && !accepted.current) setPlaced((previous) => update(previous)); }} /></>}
    {hint && <HintNote>{question.level === 3 ? "Count the cards in each named group. Check the table, not just the total; any foods that meet all three counts can fit." : question.level === 2 ? "Look for plant foods, animal foods or both in the actual examples on the cards. Humans are animals too." : "Return to the information card. Look for the sentence about the nutrient, food source or amount the question asks about."}</HintNote>}
    <button type="button" className="submit-btn" disabled={locked || !ready} onClick={check}>Check</button>
  </>;
}
function ResearchRound({ question, submit, locked, hint }) {
  const { state, dispatch, updateConclusion } = useProcessEnquiry({ question, validateRecord: isNutritionRecordCorrect, submit, locked });
  const { stage } = state;
  const current = state.seen.includes(state.observation) ? question.stages[state.observation] : null;
  const hints = { prediction: "Your prediction is not graded.", observe: "Read both source cards. You can revisit a card you have already read.", record: "Check each claim against the cards. An exact amount cannot be inferred when no portion sizes are supplied.", conclusion: "Choose one explanation that matches both cards. Animals can need different food types and amounts." };
  return <><Vocabulary /><p className="challenge-prompt">{question.title}</p><p>{question.setup}</p>
    <p role="status">Stage: {stage === "prediction" ? "Predict" : stage === "observe" ? "Read" : stage === "record" ? "Check claims" : "Explain"}</p>
    <SpeakButton text={`${question.setup} ${current?.text ?? ""} ${hints[stage] ?? ""}`} label="Hear this stage" />
    {stage === "prediction" && <><p>What might these cards show about nutrition? Your idea is not marked right or wrong.</p><ChoiceGrid options={question.predictionOptions} selected={state.prediction} disabled={locked} variant="wordy" onSelect={(value) => dispatch({ type: "predict", value })} /><button type="button" className="submit-btn" disabled={locked || !state.prediction} onClick={() => dispatch({ type: "start" })}>Read the information</button></>}
    {["observe", "record", "conclusion"].includes(stage) && <ObservationSequence stages={question.stages} index={state.observation} seen={state.seen} disabled={locked} label="Nutrition information cards" nextLabel="Read next card" onView={(index) => dispatch({ type: "view", index })} onNext={stage === "observe" ? () => dispatch({ type: "next" }) : null} renderObservation={(card) => <SourceCard card={card} />} />}
    {stage === "observe" && state.seen.length === question.stages.length && <button type="button" className="submit-btn" disabled={locked} onClick={() => dispatch({ type: "recordStage" })}>Check the claims</button>}
    {stage === "record" && <><p>Sort both claims using the information cards. A claim is supported only when the cards give evidence for it.</p><SortBins cards={question.recordCards} bins={question.recordBins} placement={state.record} disabled={locked} onPlace={(id, bin) => dispatch({ type: "record", id, bin })} /><button type="button" className="submit-btn" disabled={locked || Object.keys(state.record).length !== question.recordCards.length} onClick={() => dispatch({ type: "checkRecord" }, true)}>Check evidence</button></>}
    {stage === "conclusion" && <><p>Build a report ending from these sources. Choose one ending.</p><TileBuilder tiles={question.tiles} placed={state.conclusion} disabled={locked} label="Your nutrition report" onChange={updateConclusion} /><p>A further question: {question.followUp}</p><button type="button" className="submit-btn" disabled={locked || state.conclusion.length !== 1} onClick={() => dispatch({ type: "finish" }, true)}>Check explanation</button></>}
    {hint && stage !== "done" && <HintNote>{hints[stage]}</HintNote>}
    {stage !== "prediction" && stage !== "done" && <button type="button" className="science-reset" disabled={locked} onClick={() => dispatch({ type: "reset" })}>Restart this research</button>}
  </>;
}
