import { useMemo, useRef, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import HintNote from "../../../../../components/challenge/HintNote";
import LightSceneFigure from "../../../../../components/challenge/LightSceneFigure";
import ObservationSequence from "../../../../../components/challenge/ObservationSequence";
import SortBins from "../../../../../components/challenge/SortBins";
import SpeakButton from "../../../../../components/challenge/SpeakButton";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import { useProcessEnquiry } from "../../../../../hooks/useProcessEnquiry.js";
import { SOURCE, GLOSS, buildLightQuestions, isLightRecordCorrect, isLightExplanationCorrect } from "../../../../../data/challenges/science/lightAndDarkness.js";
const TITLES = ["Light lets us see", "Compare lit and dark scenes", "Explain light and seeing", "Investigate light and darkness"];
function Vocabulary() { return <details className="science-gloss"><summary>Science words</summary><p>{GLOSS}</p></details>; }
function Source() { return <p className="science-gloss">{SOURCE.label}. All observations are supplied models.</p>; }
export default function LightAndDarknessGame({ level, onComplete }) {
  const questions = useMemo(() => buildLightQuestions(level, Math.random), [level]);
  return <ChallengeShell title={TITLES[level - 1]} questions={questions} onComplete={onComplete} render={({ question, submit, locked, index, misses }) => {
    const Round = level === 4 ? Investigation : ShortRound;
    return <Round key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} />;
  }} />;
}
function ShortRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null), [record, setRecord] = useState({}), [placed, setPlaced] = useState([]);
  const accepted = useRef(false);
  const prompt = question.level === 2 ? "Compare the same object in all three observations. Record whether it can be seen each time." : question.prompt;
  const ready = question.level === 1 ? selected !== null : question.level === 2 ? Object.keys(record).length === 3 : placed.length === 3;
  function check() {
    if (locked || accepted.current || !ready) return;
    const correct = question.level === 1 ? selected === question.answer : question.level === 2 ? isLightRecordCorrect(question, record) : isLightExplanationCorrect(question, placed);
    if (correct) accepted.current = true;
    submit(correct);
  }
  return <><Vocabulary /><p className="challenge-prompt">{prompt}</p>
    <p>Windowless box; no other light enters. The object and observer stay in place.</p>
    <SpeakButton text={`${prompt} ${question.stages.map(s => s.text).join(" ")}`} label="Hear the task" />
    <div className="science-life-cards">{question.stages.map(s => <section key={s.id}><h4>{s.label}</h4><LightSceneFigure observation={s} /></section>)}</div><Source />
    {question.level === 1 && <ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={value => { if (!locked && !accepted.current) setSelected(value); }} />}
    {question.level === 2 && <SortBins cards={question.recordCards} bins={question.recordBins} placement={record} disabled={locked} onPlace={(id, bin) => {
      if (locked || accepted.current) return;
      setRecord(prev => { const next = { ...prev }; if (bin === null) delete next[id]; else next[id] = bin; return next; });
    }} />}
    {question.level === 3 && <TileBuilder tiles={question.tiles} placed={placed} label="Your light and seeing explanation" disabled={locked} onChange={update => { if (!locked && !accepted.current) setPlaced(prev => update(prev)); }} />}
    {hint && <HintNote>{question.level === 3 ? "Follow First, Next, So. Explain the light condition, light reaching eyes, then what can be seen." : "Check the only light source in each observation. Not seeing the object does not mean it was removed."}</HintNote>}
    <button type="button" className="submit-btn" disabled={locked || !ready} onClick={check}>Check</button>
  </>;
}
function Investigation({ question, submit, locked, hint }) {
  const { state, dispatch, updateConclusion } = useProcessEnquiry({ question, validateRecord: isLightRecordCorrect, submit, locked });
  const { stage } = state;
  const current = state.seen.includes(state.observation) ? question.stages[state.observation] : null;
  return <><Vocabulary /><p className="challenge-prompt">{question.title}</p><p>{question.setup}</p><Source />
    <p role="status">Stage: {stage === "prediction" ? "Predict" : stage === "observe" ? "Observe" : stage === "record" ? "Record" : "Explain"}</p>
    <SpeakButton text={`${question.setup} ${current?.text ?? ""}`} label="Hear this stage" />
    {stage === "prediction" && <><p>What do you predict? Predictions are not marked right or wrong.</p>
      <ChoiceGrid options={question.predictionOptions} selected={state.prediction} disabled={locked} variant="wordy" onSelect={value => dispatch({ type: "predict", value })} />
      <button type="button" className="submit-btn" disabled={locked || !state.prediction} onClick={() => dispatch({ type: "start" })}>Inspect observations</button></>}
    {["observe", "record", "conclusion"].includes(stage) && <ObservationSequence stages={question.stages} index={state.observation} seen={state.seen} disabled={locked} label="Light and darkness observations" nextLabel="Read next observation" onView={index => dispatch({ type: "view", index })} onNext={stage === "observe" ? () => dispatch({ type: "next" }) : null} renderObservation={s => <LightSceneFigure observation={s} />} />}
    {stage === "observe" && state.seen.length === 3 && <button type="button" className="submit-btn" disabled={locked} onClick={() => dispatch({ type: "recordStage" })}>Record findings</button>}
    {stage === "record" && <><p>Record whether the object can be seen in each of the three observations. You can revisit them above.</p>
      <SortBins cards={question.recordCards} bins={question.recordBins} placement={state.record} disabled={locked} onPlace={(id, bin) => dispatch({ type: "record", id, bin })} />
      <button type="button" className="submit-btn" disabled={locked || Object.keys(state.record).length !== 3} onClick={() => dispatch({ type: "checkRecord" }, true)}>Check records</button></>}
    {stage === "conclusion" && <><p>Explain the final observation: {question.stages.at(-1).label}, light {question.stages.at(-1).lit ? "on" : "off"}. Choose three tiles in the order First, Next, So.</p>
      <TileBuilder tiles={question.tiles} placed={state.conclusion} label="Your final observation explanation" disabled={locked} onChange={updateConclusion} />
      <button type="button" className="submit-btn" disabled={locked || state.conclusion.length !== 3} onClick={() => dispatch({ type: "finish" }, true)}>Check explanation</button></>}
    {hint && stage !== "done" && <HintNote>{stage === "prediction" ? "A prediction is an idea to check. Any choice can start the investigation." : stage === "observe" ? "Inspect all three observations. Only the light changes; the object stays in place." : stage === "record" ? "Match each numbered card to its observation. Look for light on or complete darkness." : "Use the final observation. Start with its light condition, then light reaching eyes, then seeing."}</HintNote>}
    {stage !== "prediction" && stage !== "done" && <button type="button" className="science-reset" disabled={locked} onClick={() => dispatch({ type: "reset" })}>Restart this investigation</button>}
  </>;
}
