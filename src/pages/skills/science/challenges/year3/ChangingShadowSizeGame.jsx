import { useMemo, useRef, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import DataTable from "../../../../../components/challenge/DataTable";
import FairTestBoard from "../../../../../components/challenge/FairTestBoard";
import HintNote from "../../../../../components/challenge/HintNote";
import NumberInput from "../../../../../components/challenge/NumberInput";
import ShadowExplorer from "../../../../../components/challenge/ShadowExplorer";
import ShadowFigure from "../../../../../components/challenge/ShadowFigure";
import SortBins from "../../../../../components/challenge/SortBins";
import ScienceRound from "../../../../../components/challenge/ScienceRound";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import { useShadowEnquiry } from "../../../../../hooks/useShadowEnquiry.js";
import { SHADOW_GLOSS, shadowGeometry } from "../../../../../data/challenges/science/shadowModel.js";
import { buildShadowSizeQuestions, isShadowTableCorrect } from "../../../../../data/challenges/science/changingShadowSize.js";

const TITLES = ["Compare shadow sizes", "Find the shadow pattern", "Record shadow heights", "Investigate shadow size"];
const Source = () => <p className="science-source">Ideas from BBC Teach. We measure the height of the shadow.</p>;
export default function ChangingShadowSizeGame({ level, onComplete }) {
  const questions = useMemo(() => buildShadowSizeQuestions(level, Math.random), [level]);
  return <ChallengeShell wide title={TITLES[level - 1]} questions={questions} onComplete={onComplete} render={({ question, submit, locked, index, misses, feedback }) => {
    const Round = level === 4 ? Investigation : ShortRound;
    return <Round key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} feedback={feedback} />;
  }} />;
}
function RecordTable({ question, record }) {
  return <DataTable caption="Your shadow heights" columns={[{ key: "distance", label: "Lamp to object (cm)" }, { key: "height", label: "Shadow height (cm)" }]} rows={question.stages.map(s => ({ label: s.label, cells: { distance: shadowGeometry(s.geometry).sourceDistance, height: record[s.id] ?? "?" } }))} />;
}
function ShortRound({ question, submit, locked, hint, feedback }) {
  const [selected, setSelected] = useState(null), [position, setPosition] = useState(0), [record, setRecord] = useState({});
  const accepted = useRef(false), { level } = question;
  const prompt = level === 3 ? "Look at each position. Type its shadow height in cm." : question.prompt;
  const ready = level === 3 ? question.stages.every(s => record[s.id]?.length > 0) : selected !== null;
  function check() {
    if (locked || accepted.current || !ready) return;
    const correct = level === 3 ? isShadowTableCorrect(question, record) : selected === question.answer;
    if (correct) accepted.current = true;
    submit(correct);
  }
  return <ScienceRound
    prompt={<p className="challenge-prompt">{prompt}</p>} speak={`${question.setup} ${prompt}`} speakLabel="Hear the question" gloss={SHADOW_GLOSS}
    figure={level === 3 ? <><ShadowExplorer stages={question.stages} index={position} available={[0, 1, 2]} disabled={locked} onPosition={index => { if (!locked && !accepted.current) setPosition(index); }} /><Source /></> : <><div className="science-life-cards">{question.stages.map(s => <section key={s.id}><h4>{s.label}</h4><ShadowFigure observation={s} measurement /></section>)}</div><Source /></>}
    evidence={<p>{question.setup}</p>}
    hint={hint && <HintNote>{level === 3 ? "Type the shadow height, not a distance. Each position has its own row." : "Compare the shadow heights and the distances from the lamp. The screen stays still."}</HintNote>}
    check={{ label: "Check", disabled: locked || !ready, onClick: check }} feedback={feedback}>
    {level === 3 ? <><RecordTable question={question} record={record} /><NumberInput value={record[question.stages[position].id] ?? ""} label={`${question.stages[position].label}: shadow height (cm)`} maxDigits={2} disabled={locked} onChange={update => { if (locked || accepted.current) return; const id = question.stages[position].id; setRecord(prev => ({ ...prev, [id]: typeof update === "function" ? update(prev[id] ?? "") : update })); }} /></> : <ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={value => { if (!locked && !accepted.current) setSelected(value); }} />}
  </ScienceRound>;
}
function Investigation({ question, submit, locked, hint, feedback }) {
  const { state, dispatch, updateConclusion } = useShadowEnquiry({ question, submit, locked });
  const { stage } = state;
  const current = state.seen.includes(state.observation) ? question.stages[state.observation] : null;
  const next = state.seen.at(-1) + 1;
  const available = stage === "observe" && state.observation === state.seen.at(-1) && next < question.stages.length ? [...state.seen, next] : state.seen;
  const action = stage === "prediction" ? { label: "Plan a fair test", disabled: locked || !state.prediction, onClick: () => dispatch({ type: "start" }) }
    : stage === "setup" ? { label: "Check", disabled: locked || Object.keys(state.setup).length !== question.setupCards.length, onClick: () => dispatch({ type: "checkSetup" }, true) }
    : stage === "observe" ? (state.seen.length === question.stages.length ? { label: "Record what we saw", disabled: locked, onClick: () => dispatch({ type: "recordStage" }) } : null)
    : stage === "record" ? { label: "Check", disabled: locked || Object.keys(state.record).length !== 3, onClick: () => dispatch({ type: "checkRecord" }, true) }
    : stage === "done" ? null
    : { label: "Check", disabled: locked || state.conclusion.length !== 3, onClick: () => dispatch({ type: "finish" }, true) };
  return <ScienceRound
    prompt={<p className="challenge-prompt">{question.title}</p>} speak={`${question.setup} ${question.title} ${current?.text ?? ""}`} speakLabel="Hear this step" gloss={SHADOW_GLOSS}
    evidence={<><p>{question.setup}</p><Source /></>}
    hint={hint && stage !== "done" && <HintNote>{stage === "setup" ? "Change only the thing that moves. Keep the screen, the object height and the lamp the same." : stage === "record" ? "Use the shadow height in cm, not the distance from the lamp." : "Look at all three positions in order. Say what changed, what you measured and the pattern."}</HintNote>}
    check={action} feedback={feedback}
    secondary={stage !== "prediction" && stage !== "done" && <button type="button" className="science-reset" disabled={locked} onClick={() => dispatch({ type: "reset" })}>Start again</button>}>
    <p role="status">{stage === "prediction" ? "Step 1: Predict" : stage === "setup" ? "Step 2: Plan a fair test" : stage === "observe" ? "Step 3: Look" : stage === "record" ? "Step 4: Record" : "Step 5: Explain"}</p>
    {stage === "prediction" && <><p>What do you think will happen?</p><ChoiceGrid options={question.predictionOptions} selected={state.prediction} disabled={locked} variant="wordy" onSelect={value => dispatch({ type: "predict", value })} /></>}
    {stage === "setup" && <FairTestBoard prompt="Which cards change and which stay the same?" comparison={question.setup} cards={question.setupCards} placement={state.setup} disabled={locked} onPlace={(id, bin) => dispatch({ type: "setup", id, bin })} />}
    {["observe", "record", "conclusion"].includes(stage) && <ShadowExplorer stages={question.stages} index={state.observation} available={available} disabled={locked} onPosition={index => { if (state.seen.includes(index)) dispatch({ type: "view", index }); else if (index === next && state.observation === state.seen.at(-1)) dispatch({ type: "next" }); }} />}
    {stage === "record" && <><p>Match each position to its shadow height in whole cm. You can look at the positions again above.</p><SortBins cards={question.recordCards} bins={question.recordBins} placement={state.record} disabled={locked} onPlace={(id, bin) => dispatch({ type: "record", id, bin })} /></>}
    {stage === "conclusion" && <><RecordTable question={question} record={Object.fromEntries(Object.entries(state.record).map(([id, value]) => [id, value.slice(3)]))} /><p>Tap three tiles in order: First, Evidence, So.</p><TileBuilder tiles={question.tiles} placed={state.conclusion} label="Your explanation" disabled={locked} onChange={updateConclusion} /></>}
  </ScienceRound>;
}
