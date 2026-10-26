import { useMemo, useRef, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import DiagramLabelBoard from "../../../../../components/challenge/DiagramLabelBoard";
import HintNote from "../../../../../components/challenge/HintNote";
import ObservationSequence from "../../../../../components/challenge/ObservationSequence";
import ShadowFigure from "../../../../../components/challenge/ShadowFigure";
import SortBins from "../../../../../components/challenge/SortBins";
import ScienceRound from "../../../../../components/challenge/ScienceRound";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import { placeDiagramLabel } from "../../../../../data/diagramPlacement.js";
import { useProcessEnquiry } from "../../../../../hooks/useProcessEnquiry.js";
import { SHADOW_SOURCE, SHADOW_GLOSS } from "../../../../../data/challenges/science/shadowModel.js";
import { buildShadowFormationQuestions, isShadowFormationRecordCorrect, isShadowFormationLabelsCorrect } from "../../../../../data/challenges/science/howShadowsForm.js";

const TITLES = ["Opaque objects block light", "Compare shadow observations", "Label a shadow model", "Investigate how shadows form"];
const Source = () => <p className="science-source">{SHADOW_SOURCE.label}. These are supplied model observations. The lamp is the only source; no other light enters.</p>;
export default function HowShadowsFormGame({ level, onComplete }) {
  const questions = useMemo(() => buildShadowFormationQuestions(level, Math.random), [level]);
  return <ChallengeShell wide title={TITLES[level - 1]} questions={questions} onComplete={onComplete} render={({ question, submit, locked, index, misses, feedback }) => {
    const Round = level === 4 ? Investigation : ShortRound;
    return <Round key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} feedback={feedback} />;
  }} />;
}
function ShortRound({ question, submit, locked, hint, feedback }) {
  const [selected, setSelected] = useState(null), [record, setRecord] = useState({}), [placement, setPlacement] = useState({});
  const accepted = useRef(false);
  const { level } = question;
  const prompt = level === 1 ? question.prompt : level === 2 ? "Record whether this lamp casts the object's shadow in each observation." : "Label the lamp, opaque object and shadow on the screen. Use the lettered notes.";
  const ready = level === 1 ? selected !== null : Object.keys(level === 2 ? record : placement).length === 3;
  function check() {
    if (locked || accepted.current || !ready) return;
    const correct = level === 1 ? selected === question.answer : level === 2 ? isShadowFormationRecordCorrect(question, record) : isShadowFormationLabelsCorrect(question, placement);
    if (correct) accepted.current = true;
    submit(correct);
  }
  return <ScienceRound
    prompt={<p className="challenge-prompt">{prompt}</p>} speak={`${prompt} ${question.stages.map(s => s.text).join(" ")}`} speakLabel="Hear the task" gloss={SHADOW_GLOSS}
    figure={<>{level === 3 ? <ShadowFigure observation={question.stages[0]} targets={question.diagramTargets} /> : <div className="science-life-cards">{question.stages.map(s => <section key={s.id}><h4>{s.label}</h4><ShadowFigure observation={s} /></section>)}</div>}<Source /></>}
    hint={hint && <HintNote>A cast shadow needs light and an opaque object in its path. An unlit screen with the lamp off is different from an object's cast shadow.</HintNote>}
    check={{ label: "Check", disabled: locked || !ready, onClick: check }} feedback={feedback}>
    {level === 3 && <DiagramLabelBoard targets={question.targets} labels={question.labels} placement={placement} disabled={locked} label="Shadow model labels" onPlace={(id, target) => { if (!locked && !accepted.current) setPlacement(prev => placeDiagramLabel(prev, id, target, question.labels, question.targets)); }} />}
    {level === 1 && <ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={value => { if (!locked && !accepted.current) setSelected(value); }} />}
    {level === 2 && <SortBins cards={question.recordCards} bins={question.recordBins} placement={record} disabled={locked} onPlace={(id, bin) => { if (locked || accepted.current) return; setRecord(prev => { const next = { ...prev }; if (bin === null) delete next[id]; else next[id] = bin; return next; }); }} />}
  </ScienceRound>;
}
function Investigation({ question, submit, locked, hint, feedback }) {
  const { state, dispatch, updateConclusion } = useProcessEnquiry({ question, validateRecord: isShadowFormationRecordCorrect, submit, locked });
  const { stage } = state;
  const current = state.seen.includes(state.observation) ? question.stages[state.observation] : null;
  const action = stage === "prediction" ? { label: "Inspect observations", disabled: locked || !state.prediction, onClick: () => dispatch({ type: "start" }) }
    : stage === "observe" ? (state.seen.length === question.stages.length ? { label: "Record findings", disabled: locked, onClick: () => dispatch({ type: "recordStage" }) } : null)
    : stage === "record" ? { label: "Check records", disabled: locked || Object.keys(state.record).length !== 3, onClick: () => dispatch({ type: "checkRecord" }, true) }
    : stage === "done" ? null
    : { label: "Check explanation", disabled: locked || state.conclusion.length !== 3, onClick: () => dispatch({ type: "finish" }, true) };
  return <ScienceRound
    prompt={<p className="challenge-prompt">{question.title}</p>} speak={`${question.setup} ${current?.text ?? ""}`} speakLabel="Hear this stage" gloss={SHADOW_GLOSS}
    evidence={<><p>{question.setup}</p><Source /></>}
    hint={hint && stage !== "done" && <HintNote>{stage === "record" ? "Check the lamp and the object's position in each numbered observation." : "Light must reach an opaque object before the object can block it. Inspect every condition and use the evidence."}</HintNote>}
    check={action} feedback={feedback}
    secondary={stage !== "prediction" && stage !== "done" && <button type="button" className="science-reset" disabled={locked} onClick={() => dispatch({ type: "reset" })}>Restart this investigation</button>}>
    <p role="status">Stage: {stage === "prediction" ? "Predict" : stage === "observe" ? "Observe" : stage === "record" ? "Record" : "Explain"}</p>
    {stage === "prediction" && <><p>Your prediction is not marked right or wrong.</p><ChoiceGrid options={question.predictionOptions} selected={state.prediction} disabled={locked} variant="wordy" onSelect={value => dispatch({ type: "predict", value })} /></>}
    {["observe", "record", "conclusion"].includes(stage) && <ObservationSequence stages={question.stages} index={state.observation} seen={state.seen} disabled={locked} label="Shadow formation observations" nextLabel="Inspect next condition" onView={index => dispatch({ type: "view", index })} onNext={stage === "observe" ? () => dispatch({ type: "next" }) : null} renderObservation={s => <ShadowFigure observation={s} />} />}
    {stage === "record" && <SortBins cards={question.recordCards} bins={question.recordBins} placement={state.record} disabled={locked} onPlace={(id, bin) => dispatch({ type: "record", id, bin })} />}
    {stage === "conclusion" && <><p>Explain what is needed to cast a shadow: First, Next, So.</p><TileBuilder tiles={question.tiles} placed={state.conclusion} label="Your shadow explanation" disabled={locked} onChange={updateConclusion} /></>}
  </ScienceRound>;
}
