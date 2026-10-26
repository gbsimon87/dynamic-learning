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
import { SHADOW_SOURCE, SHADOW_GLOSS, shadowGeometry } from "../../../../../data/challenges/science/shadowModel.js";
import { buildShadowSizeQuestions, isShadowTableCorrect } from "../../../../../data/challenges/science/changingShadowSize.js";

const TITLES = ["Compare shadow sizes", "Find a shadow-size pattern", "Record shadow measurements", "Investigate changing shadow size"];
const Source = () => <p className="science-source">{SHADOW_SOURCE.label}. Geometry is an app-authored point-source model. We measure shadow height, not brightness.</p>;
export default function ChangingShadowSizeGame({ level, onComplete }) {
  const questions = useMemo(() => buildShadowSizeQuestions(level, Math.random), [level]);
  return <ChallengeShell wide title={TITLES[level - 1]} questions={questions} onComplete={onComplete} render={({ question, submit, locked, index, misses, feedback }) => {
    const Round = level === 4 ? Investigation : ShortRound;
    return <Round key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} feedback={feedback} />;
  }} />;
}
function RecordTable({ question, record }) {
  return <DataTable caption="Your shadow-height record (nearest whole cm)" columns={[{ key: "distance", label: "Source → object (cm)" }, { key: "height", label: "Shadow height (cm)" }]} rows={question.stages.map(s => ({ label: s.label, cells: { distance: shadowGeometry(s.geometry).sourceDistance, height: record[s.id] ?? "?" } }))} />;
}
function ShortRound({ question, submit, locked, hint, feedback }) {
  const [selected, setSelected] = useState(null), [position, setPosition] = useState(0), [record, setRecord] = useState({});
  const accepted = useRef(false), { level } = question;
  const prompt = level === 3 ? "Inspect each position. Copy its shadow height into your table in cm." : question.prompt;
  const ready = level === 3 ? question.stages.every(s => record[s.id]?.length > 0) : selected !== null;
  function check() {
    if (locked || accepted.current || !ready) return;
    const correct = level === 3 ? isShadowTableCorrect(question, record) : selected === question.answer;
    if (correct) accepted.current = true;
    submit(correct);
  }
  return <ScienceRound
    prompt={<p className="challenge-prompt">{prompt}</p>} speak={`${prompt} ${question.setup}`} speakLabel="Hear the task" gloss={SHADOW_GLOSS}
    figure={level === 3 ? <><ShadowExplorer stages={question.stages} index={position} available={[0, 1, 2]} disabled={locked} onPosition={index => { if (!locked && !accepted.current) setPosition(index); }} /><Source /></> : <><div className="science-life-cards">{question.stages.map(s => <section key={s.id}><h4>{s.label}</h4><ShadowFigure observation={s} measurement /></section>)}</div><Source /></>}
    evidence={<p>{question.setup}</p>}
    hint={hint && <HintNote>{level === 3 ? "Read shadow height, not either distance. Each position has its own row; use the same whole cm shown in the model." : "Compare the stated shadow heights and source-to-object distances. The screen stays fixed."}</HintNote>}
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
  const action = stage === "prediction" ? { label: "Set up a fair comparison", disabled: locked || !state.prediction, onClick: () => dispatch({ type: "start" }) }
    : stage === "setup" ? { label: "Check comparison", disabled: locked || Object.keys(state.setup).length !== question.setupCards.length, onClick: () => dispatch({ type: "checkSetup" }, true) }
    : stage === "observe" ? (state.seen.length === question.stages.length ? { label: "Record measurements", disabled: locked, onClick: () => dispatch({ type: "recordStage" }) } : null)
    : stage === "record" ? { label: "Check records", disabled: locked || Object.keys(state.record).length !== 3, onClick: () => dispatch({ type: "checkRecord" }, true) }
    : stage === "done" ? null
    : { label: "Check explanation", disabled: locked || state.conclusion.length !== 3, onClick: () => dispatch({ type: "finish" }, true) };
  return <ScienceRound
    prompt={<p className="challenge-prompt">{question.title}</p>} speak={`${question.setup} ${current?.text ?? ""}`} speakLabel="Hear this stage" gloss={SHADOW_GLOSS}
    evidence={<><p>{question.setup}</p><Source /></>}
    hint={hint && stage !== "done" && <HintNote>{stage === "setup" ? "Change only the named position. Keep the screen, object height and lamp setting fixed." : stage === "record" ? "Use shadow height in cm from each position, not source distance. Measurements are rounded to whole cm." : "Inspect all three positions in order. Your explanation needs the changed condition, measured evidence and a pattern limited to this model."}</HintNote>}
    check={action} feedback={feedback}
    secondary={stage !== "prediction" && stage !== "done" && <button type="button" className="science-reset" disabled={locked} onClick={() => dispatch({ type: "reset" })}>Restart this investigation</button>}>
    <p role="status">Stage: {stage === "prediction" ? "Predict" : stage === "setup" ? "Fair comparison" : stage === "observe" ? "Observe" : stage === "record" ? "Record" : "Explain"}</p>
    {stage === "prediction" && <><p>Your prediction is not marked right or wrong.</p><ChoiceGrid options={question.predictionOptions} selected={state.prediction} disabled={locked} variant="wordy" onSelect={value => dispatch({ type: "predict", value })} /></>}
    {stage === "setup" && <FairTestBoard prompt={`What will you change to compare ${question.config.moving} positions?`} comparison={question.setup} cards={question.setupCards} placement={state.setup} disabled={locked} onPlace={(id, bin) => dispatch({ type: "setup", id, bin })} />}
    {["observe", "record", "conclusion"].includes(stage) && <ShadowExplorer stages={question.stages} index={state.observation} available={available} disabled={locked} onPosition={index => { if (state.seen.includes(index)) dispatch({ type: "view", index }); else if (index === next && state.observation === state.seen.at(-1)) dispatch({ type: "next" }); }} />}
    {stage === "record" && <><p>Match each position to its shadow height, in whole cm. Revisit the positions above.</p><SortBins cards={question.recordCards} bins={question.recordBins} placement={state.record} disabled={locked} onPlace={(id, bin) => dispatch({ type: "record", id, bin })} /></>}
    {stage === "conclusion" && <><RecordTable question={question} record={Object.fromEntries(Object.entries(state.record).map(([id, value]) => [id, value.slice(3)]))} /><p>Build the explanation: First, Evidence, So.</p><TileBuilder tiles={question.tiles} placed={state.conclusion} label="Your shadow-size explanation" disabled={locked} onChange={updateConclusion} /></>}
  </ScienceRound>;
}
