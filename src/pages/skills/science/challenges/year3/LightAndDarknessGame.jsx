import { useMemo, useRef, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import HintNote from "../../../../../components/challenge/HintNote";
import LightSceneFigure from "../../../../../components/challenge/LightSceneFigure";
import ObservationSequence from "../../../../../components/challenge/ObservationSequence";
import SortBins from "../../../../../components/challenge/SortBins";
import ScienceRound from "../../../../../components/challenge/ScienceRound";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import { useProcessEnquiry } from "../../../../../hooks/useProcessEnquiry.js";
import { GLOSS, buildLightQuestions, isLightRecordCorrect, isLightExplanationCorrect } from "../../../../../data/challenges/science/lightAndDarkness.js";
const TITLES = ["Light lets us see", "Compare light and dark", "Explain how we see", "Investigate light and dark"];
function Source() { return <p className="science-source">Ideas from BBC Teach.</p>; }
export default function LightAndDarknessGame({ level, onComplete }) {
  const questions = useMemo(() => buildLightQuestions(level, Math.random), [level]);
  return <ChallengeShell wide title={TITLES[level - 1]} questions={questions} onComplete={onComplete} render={({ question, submit, locked, index, misses, feedback }) => {
    const Round = level === 4 ? Investigation : ShortRound;
    return <Round key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} feedback={feedback} />;
  }} />;
}
function ShortRound({ question, submit, locked, hint, feedback }) {
  const [selected, setSelected] = useState(null), [record, setRecord] = useState({}), [placed, setPlaced] = useState([]);
  const accepted = useRef(false);
  const prompt = question.level === 2 ? `Sort the pictures. Can Sam see the ${question.object.label} in each one?` : question.prompt;
  const ready = question.level === 1 ? selected !== null : question.level === 2 ? Object.keys(record).length === 3 : placed.length === 3;
  function check() {
    if (locked || accepted.current || !ready) return;
    const correct = question.level === 1 ? selected === question.answer : question.level === 2 ? isLightRecordCorrect(question, record) : isLightExplanationCorrect(question, placed);
    if (correct) accepted.current = true;
    submit(correct);
  }
  return <ScienceRound
    prompt={<p className="challenge-prompt">{prompt}</p>} speak={`${question.stages.map(s => s.text).join(" ")} ${prompt}`} speakLabel="Hear the question" gloss={GLOSS}
    figure={<><div className="science-life-cards">{question.stages.map(s => <section key={s.id}><h4>{s.label}</h4><LightSceneFigure observation={s} /></section>)}</div><Source /></>}
    evidence={<p>Sam looks into a box. It has no windows, so no other light can get in. The object stays in the same place.</p>}
    hint={hint && <HintNote>{question.level === 3 ? "First, say what the light is doing. Next, say if light reaches the eyes. So, say what Sam sees." : "Look at the light in each picture. If we cannot see an object, it has not gone away."}</HintNote>}
    check={{ label: "Check", disabled: locked || !ready, onClick: check }} feedback={feedback}>
    {question.level === 1 && <ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={value => { if (!locked && !accepted.current) setSelected(value); }} />}
    {question.level === 2 && <SortBins cards={question.recordCards} bins={question.recordBins} placement={record} disabled={locked} onPlace={(id, bin) => {
      if (locked || accepted.current) return;
      setRecord(prev => { const next = { ...prev }; if (bin === null) delete next[id]; else next[id] = bin; return next; });
    }} />}
    {question.level === 3 && <TileBuilder tiles={question.tiles} placed={placed} label="Your explanation" disabled={locked} onChange={update => { if (!locked && !accepted.current) setPlaced(prev => update(prev)); }} />}
  </ScienceRound>;
}
function Investigation({ question, submit, locked, hint, feedback }) {
  const { state, dispatch, updateConclusion } = useProcessEnquiry({ question, validateRecord: isLightRecordCorrect, submit, locked });
  const { stage } = state;
  const current = state.seen.includes(state.observation) ? question.stages[state.observation] : null;
  const action = stage === "prediction" ? { label: "Look at the pictures", disabled: locked || !state.prediction, onClick: () => dispatch({ type: "start" }) }
    : stage === "observe" ? (state.seen.length === 3 ? { label: "Record what we saw", disabled: locked, onClick: () => dispatch({ type: "recordStage" }) } : null)
    : stage === "record" ? { label: "Check", disabled: locked || Object.keys(state.record).length !== 3, onClick: () => dispatch({ type: "checkRecord" }, true) }
    : stage === "done" ? null
    : { label: "Check", disabled: locked || state.conclusion.length !== 3, onClick: () => dispatch({ type: "finish" }, true) };
  return <ScienceRound
    prompt={<p className="challenge-prompt">{question.title}</p>} speak={`${question.setup} ${question.title} ${current?.text ?? ""}`} speakLabel="Hear this step" gloss={GLOSS}
    evidence={<><p>{question.setup}</p><Source /></>}
    hint={hint && stage !== "done" && <HintNote>{stage === "prediction" ? "A prediction is a guess you can check. Any choice is fine." : stage === "observe" ? "Look at all three pictures. Only the light changes. The object stays in the same place." : stage === "record" ? "Match each card to its picture. Is the light on or off?" : "Use the last picture. First the light, next the eyes, so what Sam sees."}</HintNote>}
    check={action} feedback={feedback}
    secondary={stage !== "prediction" && stage !== "done" && <button type="button" className="science-reset" disabled={locked} onClick={() => dispatch({ type: "reset" })}>Start again</button>}>
    <p role="status">{stage === "prediction" ? "Step 1: Predict" : stage === "observe" ? "Step 2: Look" : stage === "record" ? "Step 3: Record" : "Step 4: Explain"}</p>
    {stage === "prediction" && <><p>What do you think will happen?</p>
      <ChoiceGrid options={question.predictionOptions} selected={state.prediction} disabled={locked} variant="wordy" onSelect={value => dispatch({ type: "predict", value })} /></>}
    {["observe", "record", "conclusion"].includes(stage) && <ObservationSequence stages={question.stages} index={state.observation} seen={state.seen} disabled={locked} label="Light and dark pictures" nextLabel="Next picture" onView={index => dispatch({ type: "view", index })} onNext={stage === "observe" ? () => dispatch({ type: "next" }) : null} renderObservation={s => <LightSceneFigure observation={s} />} />}
    {stage === "record" && <><p>Sort the cards. Can Sam see the object in each picture? You can look at the pictures again above.</p>
      <SortBins cards={question.recordCards} bins={question.recordBins} placement={state.record} disabled={locked} onPlace={(id, bin) => dispatch({ type: "record", id, bin })} /></>}
    {stage === "conclusion" && <><p>Explain the last picture ({question.stages.at(-1).source} {question.stages.at(-1).lit ? "on" : "off"}). Tap three tiles in order: First, Next, So.</p>
      <TileBuilder tiles={question.tiles} placed={state.conclusion} label="Your explanation" disabled={locked} onChange={updateConclusion} /></>}
  </ScienceRound>;
}
