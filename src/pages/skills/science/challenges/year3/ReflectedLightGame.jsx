import { useMemo, useRef, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import DiagramLabelBoard from "../../../../../components/challenge/DiagramLabelBoard";
import HintNote from "../../../../../components/challenge/HintNote";
import ObservationSequence from "../../../../../components/challenge/ObservationSequence";
import ReflectionFigure from "../../../../../components/challenge/ReflectionFigure";
import SortBins from "../../../../../components/challenge/SortBins";
import ScienceRound from "../../../../../components/challenge/ScienceRound";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import { placeDiagramLabel } from "../../../../../data/diagramPlacement.js";
import { useProcessEnquiry } from "../../../../../hooks/useProcessEnquiry.js";
import { SOURCES, GLOSS, buildReflectionQuestions, isReflectionRecordCorrect, isReflectionLabelsCorrect } from "../../../../../data/challenges/science/reflectedLight.js";
const TITLES = ["Light bounces off surfaces", "Compare reflected images", "Label the reflection path", "Investigate reflected light"];
function Source() { return <p className="science-source">{SOURCES.bbc.label}; {SOURCES.optics.label}. Observation notes are authored.</p>; }
function Picture({ question, observation }) { return <ReflectionFigure observation={observation} targets={question.diagramTargets} />; }
export default function ReflectedLightGame({ level, onComplete }) {
  const questions = useMemo(() => buildReflectionQuestions(level, Math.random), [level]);
  return <ChallengeShell wide title={TITLES[level - 1]} questions={questions} onComplete={onComplete} render={({ question, submit, locked, index, misses, feedback }) => {
    const Round = level === 4 ? Investigation : ShortRound;
    return <Round key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} feedback={feedback} />;
  }} />;
}
function ShortRound({ question, submit, locked, hint, feedback }) {
  const [selected, setSelected] = useState(null), [record, setRecord] = useState({}), [placement, setPlacement] = useState({}); const accepted = useRef(false);
  const prompt = question.level === 1 ? question.prompt : question.level === 2 ? "Compare both supplied samples. Record whether a clear reflected image was seen. Both samples reflect light." : "Label the three parts. Follow the arrows from the source to the surface, then to the eye.";
  const ready = question.level === 1 ? selected !== null : question.level === 2 ? Object.keys(record).length === 2 : Object.keys(placement).length === 3;
  function check() { if (locked || accepted.current || !ready) return; const correct = question.level === 1 ? selected === question.answer : question.level === 2 ? isReflectionRecordCorrect(question, record) : isReflectionLabelsCorrect(question, placement); if (correct) accepted.current = true; submit(correct); }
  return <ScienceRound
    prompt={<p className="challenge-prompt">{prompt}</p>} speak={`${prompt} ${question.stages.map(s => s.text).join(" ")}`} speakLabel="Hear the task" gloss={GLOSS}
    figure={<>{question.level === 3 ? <Picture question={question} observation={question.stages[0]} /> : <div className="science-life-cards">{question.stages.map(s => <section key={s.id}><h4>{s.label}</h4><Picture question={question} observation={s} /></section>)}</div>}<Source /></>}
    hint={hint && <HintNote>Follow light from the source to the surface and then the eye. Read the image notes: no clear image does not mean no reflected light.</HintNote>}
    check={{ label: "Check", disabled: locked || !ready, onClick: check }} feedback={feedback}>
    {question.level === 3 && <DiagramLabelBoard targets={question.targets} labels={question.labels} placement={placement} label="Reflection path labels" disabled={locked} onPlace={(id, target) => { if (!locked && !accepted.current) setPlacement(prev => placeDiagramLabel(prev, id, target, question.labels, question.targets)); }} />}
    {question.level === 1 && <ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={value => { if (!locked && !accepted.current) setSelected(value); }} />}
    {question.level === 2 && <SortBins cards={question.recordCards} bins={question.recordBins} placement={record} disabled={locked} onPlace={(id, bin) => { if (locked || accepted.current) return; setRecord(prev => { const next = { ...prev }; if (bin === null) delete next[id]; else next[id] = bin; return next; }); }} />}
  </ScienceRound>;
}
function Investigation({ question, submit, locked, hint, feedback }) {
  const { state, dispatch, updateConclusion } = useProcessEnquiry({ question, validateRecord: isReflectionRecordCorrect, submit, locked }); const { stage } = state;
  const current = state.seen.includes(state.observation) ? question.stages[state.observation] : null;
  const action = stage === "prediction" ? { label: "Inspect observations", disabled: locked || !state.prediction, onClick: () => dispatch({ type: "start" }) }
    : stage === "observe" ? (state.seen.length === 3 ? { label: "Record image observations", disabled: locked, onClick: () => dispatch({ type: "recordStage" }) } : null)
    : stage === "record" ? { label: "Check records", disabled: locked || Object.keys(state.record).length !== 2, onClick: () => dispatch({ type: "checkRecord" }, true) }
    : stage === "done" ? null
    : { label: "Check explanation", disabled: locked || state.conclusion.length !== 3, onClick: () => dispatch({ type: "finish" }, true) };
  return <ScienceRound
    prompt={<p className="challenge-prompt">{question.title}</p>} speak={`${question.setup} ${current?.text ?? ""}`} speakLabel="Hear this stage" gloss={GLOSS}
    evidence={<><p>{question.setup}</p><Source /></>}
    hint={hint && stage !== "done" && <HintNote>{stage === "prediction" ? "Any prediction can start the investigation." : stage === "observe" ? "Read the setup and both sample notes. Look for clear image evidence." : stage === "record" ? "Match A and B to their image observations, even if both go in the same bin." : "Explain where the light came from and what both surfaces did, then add the image evidence."}</HintNote>}
    check={action} feedback={feedback}
    secondary={stage !== "prediction" && stage !== "done" && <button type="button" className="science-reset" disabled={locked} onClick={() => dispatch({ type: "reset" })}>Restart this investigation</button>}>
    <p role="status">Stage: {stage === "prediction" ? "Predict" : stage === "observe" ? "Observe" : stage === "record" ? "Record" : "Explain"}</p>
    {stage === "prediction" && <><p>Your prediction is not marked right or wrong.</p><ChoiceGrid options={question.predictionOptions} selected={state.prediction} disabled={locked} variant="wordy" onSelect={value => dispatch({ type: "predict", value })} /></>}
    {["observe", "record", "conclusion"].includes(stage) && <ObservationSequence stages={question.stages} index={state.observation} seen={state.seen} disabled={locked} label="Surface comparison observations" nextLabel="Read next observation" onView={index => dispatch({ type: "view", index })} onNext={stage === "observe" ? () => dispatch({ type: "next" }) : null} renderObservation={s => <Picture question={question} observation={s} />} />}
    {stage === "record" && <><p>Use both supplied image notes. The diagram shows a light path, not the image.</p><SortBins cards={question.recordCards} bins={question.recordBins} placement={state.record} disabled={locked} onPlace={(id, bin) => dispatch({ type: "record", id, bin })} /></>}
    {stage === "conclusion" && <><p>Choose three explanation tiles in the order First, Next, So.</p><TileBuilder tiles={question.tiles} placed={state.conclusion} label="Your reflection explanation" disabled={locked} onChange={updateConclusion} /></>}
  </ScienceRound>;
}
