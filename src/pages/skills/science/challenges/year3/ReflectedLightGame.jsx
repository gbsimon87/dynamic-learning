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
import { GLOSS, buildReflectionQuestions, isReflectionRecordCorrect, isReflectionLabelsCorrect } from "../../../../../data/challenges/science/reflectedLight.js";
const TITLES = ["Light bounces off surfaces", "Compare reflections", "Label the light path", "Investigate reflected light"];
function Source() { return <p className="science-source">Ideas from BBC Teach and Optica.</p>; }
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
  const prompt = question.level === 1 ? question.prompt : question.level === 2 ? "Is the reflection clear on each surface? Sort the two cards." : "Label the three parts. Follow the arrows from the lamp to the surface to the eye.";
  const ready = question.level === 1 ? selected !== null : question.level === 2 ? Object.keys(record).length === 2 : Object.keys(placement).length === 3;
  function check() { if (locked || accepted.current || !ready) return; const correct = question.level === 1 ? selected === question.answer : question.level === 2 ? isReflectionRecordCorrect(question, record) : isReflectionLabelsCorrect(question, placement); if (correct) accepted.current = true; submit(correct); }
  return <ScienceRound
    prompt={<p className="challenge-prompt">{prompt}</p>} speak={`${question.stages.map(s => s.text).join(" ")} ${prompt}`} speakLabel="Hear the question" gloss={GLOSS}
    figure={<>{question.level === 3 ? <Picture question={question} observation={question.stages[0]} /> : <div className="science-life-cards">{question.stages.map(s => <section key={s.id}><h4>{s.label}</h4><Picture question={question} observation={s} /></section>)}</div>}<Source /></>}
    evidence={question.level === 2 ? <p>Sam looks from the same place each time. The lamp stays the same. Only the surface changes.</p> : question.level === 3 ? <p>The arrows show which way the light goes.</p> : null}
    hint={hint && <HintNote>Follow the light from the lamp to the surface and then to the eye. If the reflection is not clear, light still bounced off.</HintNote>}
    check={{ label: "Check", disabled: locked || !ready, onClick: check }} feedback={feedback}>
    {question.level === 3 && <DiagramLabelBoard targets={question.targets} labels={question.labels} placement={placement} label="Light path labels" disabled={locked} onPlace={(id, target) => { if (!locked && !accepted.current) setPlacement(prev => placeDiagramLabel(prev, id, target, question.labels, question.targets)); }} />}
    {question.level === 1 && <ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={value => { if (!locked && !accepted.current) setSelected(value); }} />}
    {question.level === 2 && <SortBins cards={question.recordCards} bins={question.recordBins} placement={record} disabled={locked} onPlace={(id, bin) => { if (locked || accepted.current) return; setRecord(prev => { const next = { ...prev }; if (bin === null) delete next[id]; else next[id] = bin; return next; }); }} />}
  </ScienceRound>;
}
function Investigation({ question, submit, locked, hint, feedback }) {
  const { state, dispatch, updateConclusion } = useProcessEnquiry({ question, validateRecord: isReflectionRecordCorrect, submit, locked }); const { stage } = state;
  const current = state.seen.includes(state.observation) ? question.stages[state.observation] : null;
  const action = stage === "prediction" ? { label: "Look at the pictures", disabled: locked || !state.prediction, onClick: () => dispatch({ type: "start" }) }
    : stage === "observe" ? (state.seen.length === 3 ? { label: "Record what we saw", disabled: locked, onClick: () => dispatch({ type: "recordStage" }) } : null)
    : stage === "record" ? { label: "Check", disabled: locked || Object.keys(state.record).length !== 2, onClick: () => dispatch({ type: "checkRecord" }, true) }
    : stage === "done" ? null
    : { label: "Check", disabled: locked || state.conclusion.length !== 3, onClick: () => dispatch({ type: "finish" }, true) };
  return <ScienceRound
    prompt={<p className="challenge-prompt">{question.title}</p>} speak={`${question.setup} ${question.title} ${current?.text ?? ""}`} speakLabel="Hear this step" gloss={GLOSS}
    evidence={<><p>{question.setup}</p><Source /></>}
    hint={hint && stage !== "done" && <HintNote>{stage === "prediction" ? "A prediction is a guess you can check. Any choice is fine." : stage === "observe" ? "Read the notes for both surfaces. Is the reflection clear?" : stage === "record" ? "Match A and B to their notes. Both can go in the same box." : "Say where the light came from, what both surfaces did, then what the notes showed."}</HintNote>}
    check={action} feedback={feedback}
    secondary={stage !== "prediction" && stage !== "done" && <button type="button" className="science-reset" disabled={locked} onClick={() => dispatch({ type: "reset" })}>Start again</button>}>
    <p role="status">{stage === "prediction" ? "Step 1: Predict" : stage === "observe" ? "Step 2: Look" : stage === "record" ? "Step 3: Record" : "Step 4: Explain"}</p>
    {stage === "prediction" && <><p>What do you think will happen?</p><ChoiceGrid options={question.predictionOptions} selected={state.prediction} disabled={locked} variant="wordy" onSelect={value => dispatch({ type: "predict", value })} /></>}
    {["observe", "record", "conclusion"].includes(stage) && <ObservationSequence stages={question.stages} index={state.observation} seen={state.seen} disabled={locked} label="Surface pictures" nextLabel="Next picture" onView={index => dispatch({ type: "view", index })} onNext={stage === "observe" ? () => dispatch({ type: "next" }) : null} renderObservation={s => <Picture question={question} observation={s} />} />}
    {stage === "record" && <><p>Use the notes for both surfaces. Is the reflection clear? The drawing shows the light path only.</p><SortBins cards={question.recordCards} bins={question.recordBins} placement={state.record} disabled={locked} onPlace={(id, bin) => dispatch({ type: "record", id, bin })} /></>}
    {stage === "conclusion" && <><p>Tap three tiles in order: First, Next, So.</p><TileBuilder tiles={question.tiles} placed={state.conclusion} label="Your explanation" disabled={locked} onChange={updateConclusion} /></>}
  </ScienceRound>;
}
