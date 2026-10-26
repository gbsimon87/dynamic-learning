import { useMemo, useRef, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import HintNote from "../../../../../components/challenge/HintNote";
import MovementFigure from "../../../../../components/challenge/MovementFigure";
import ArmMovementIllustration from "../../../../../components/challenge/ArmMovementIllustration";
import MuscleMapFigure from "../../../../../components/challenge/MuscleMapFigure";
import { isIllustrated } from "../../../../../data/scienceDiagrams";
import ObservationSequence from "../../../../../components/challenge/ObservationSequence";
import ScienceInformationCard from "../../../../../components/challenge/ScienceInformationCard";
import SortBins from "../../../../../components/challenge/SortBins";
import ScienceRound from "../../../../../components/challenge/ScienceRound";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import { useProcessEnquiry } from "../../../../../hooks/useProcessEnquiry.js";
import { SOURCE, GLOSS, buildMusclesQuestions, isMovementExplanationCorrect, isMovementRecordCorrect } from "../../../../../data/challenges/science/musclesAndMovement.js";
// The illustrated arm, or the original hand-built one (scienceDiagrams.js).
const Arm = isIllustrated() ? ArmMovementIllustration : MovementFigure;
const TITLES = ["Muscles pull bones", "Compare movement pictures", "Build a movement explanation", "Investigate an arm model"];
function Guidance() { return <><ScienceInformationCard title="How this arm model works" text="The front muscle contracts (gets shorter) and pulls to bend the arm. The back muscle contracts and pulls to straighten it. The other muscle relaxes and is lengthened. Bones move at the joint; muscles pull, rather than push, bones." sourceLabel={SOURCE.label} />{isIllustrated() && <MuscleMapFigure highlight={["biceps", "triceps"]} caption="This muscle pair is in your upper arm: the front muscle on the front, the back muscle on the back." />}</>; }
function Pictures({ stages }) { return <div className="science-life-cards">{stages.map(s => <section key={s.id} aria-label={s.label}><h4>{s.label}</h4><Arm pose={s.pose} /></section>)}</div>; }
export default function MusclesAndMovementGame({ level, onComplete }) {
  const questions = useMemo(() => buildMusclesQuestions(level, Math.random), [level]);
  return <ChallengeShell wide title={TITLES[level-1]} questions={questions} onComplete={onComplete} render={({ question, submit, locked, index, misses, feedback }) => {
    const Round = level === 4 ? Investigation : ShortRound;
    return <Round key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} feedback={feedback} />;
  }} />;
}
function ShortRound({ question, submit, locked, hint, feedback }) {
  const [selected, setSelected] = useState(null);
  const [placed, setPlaced] = useState([]);
  const accepted = useRef(false);
  const ready = question.level === 3 ? placed.length === 3 : selected !== null;
  function check() {
    if (locked || accepted.current || !ready) return;
    const correct = question.level === 3 ? isMovementExplanationCorrect(question, placed) : selected === question.answer;
    if (correct) accepted.current = true;
    submit(correct);
  }
  return <ScienceRound
    prompt={<p className="challenge-prompt">{question.prompt}</p>} speak={`${question.prompt} ${question.text ?? "Compare the model pictures in order."} ${GLOSS}`} speakLabel="Hear the task" gloss={GLOSS}
    figure={question.level === 1 ? <Arm pose={question.pose} /> : <Pictures stages={question.stages} />}
    reference={question.level === 3 ? <Guidance /> : null}
    evidence={question.level === 1 ? <ScienceInformationCard title="Movement rule" text={question.text} sourceLabel={SOURCE.label} /> : null}
    answerLabel={question.level === 3 ? "Choose three parts in order: muscle action, pull on the bone, then movement. Tap a chosen part to take it back." : undefined}
    hint={hint && <HintNote>{question.level === 1 ? "Look for the rule about pulling, contracting and the elbow joint." : question.level === 2 ? "Compare the first and last pictures. For a return, look at the middle picture too." : "Start with the muscle action. Next say how the bone moves; end with the movement you saw at the elbow."}</HintNote>}
    check={{ label: "Check", disabled: locked || !ready, onClick: check }} feedback={feedback}>
    {question.level === 3 ? <TileBuilder tiles={question.tiles} placed={placed} label="Your movement explanation" disabled={locked} onChange={update => { if (!locked && !accepted.current) setPlaced(previous => update(previous)); }} /> : <ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={value => { if (!locked && !accepted.current) setSelected(value); }} />}
  </ScienceRound>;
}
function Investigation({ question, submit, locked, hint, feedback }) {
  const { state, dispatch, updateConclusion } = useProcessEnquiry({ question, validateRecord: isMovementRecordCorrect, submit, locked });
  const { stage } = state;
  const current = state.seen.includes(state.observation) ? question.stages[state.observation] : null;
  const hints = { prediction: "Your prediction is not graded.", observe: "Observe all three stages. Notice which muscle becomes shorter and how the lower arm changes position.", record: "Check the sequence for the movement claim. Read the rule to decide whether muscles pull or push bones.", conclusion: "Choose three parts: muscle action, pulling the bone, then the movement shown across the stages." };
  const action = stage === "prediction" ? { label: "Observe the model", disabled: locked || !state.prediction, onClick: () => dispatch({ type: "start" }) }
    : stage === "observe" ? (state.seen.length === question.stages.length ? { label: "Record evidence", disabled: locked, onClick: () => dispatch({ type: "recordStage" }) } : null)
    : stage === "record" ? { label: "Check evidence", disabled: locked || Object.keys(state.record).length !== 2, onClick: () => dispatch({ type: "checkRecord" }, true) }
    : stage === "done" ? null
    : { label: "Check explanation", disabled: locked || state.conclusion.length !== 3, onClick: () => dispatch({ type: "finish" }, true) };
  return <ScienceRound
    prompt={<p className="challenge-prompt">{question.title}</p>} speak={`${question.setup} ${current ? `Current picture: ${current.label}, ${current.pose} arm.` : ""} ${hints[stage] ?? ""}`} speakLabel="Hear this stage" gloss={GLOSS}
    evidence={<><p>{question.setup}</p><Guidance /></>}
    hint={hint && stage !== "done" && <HintNote>{hints[stage]}</HintNote>}
    check={action} feedback={feedback}
    secondary={stage !== "prediction" && stage !== "done" && <button type="button" className="science-reset" disabled={locked} onClick={() => dispatch({ type: "reset" })}>Restart this investigation</button>}>
    <p role="status">Stage: {stage === "prediction" ? "Predict" : stage === "observe" ? "Observe" : stage === "record" ? "Record evidence" : "Explain"}</p>
    {stage === "prediction" && <><p>What might the sequence show? Your prediction is not marked right or wrong.</p><ChoiceGrid options={question.predictionOptions} selected={state.prediction} disabled={locked} variant="wordy" onSelect={value => dispatch({ type: "predict", value })} /></>}
    {["observe", "record", "conclusion"].includes(stage) && <ObservationSequence stages={question.stages} index={state.observation} seen={state.seen} disabled={locked} label="Arm movement observations" onView={index => dispatch({ type: "view", index })} onNext={stage === "observe" ? () => dispatch({ type: "next" }) : null} renderObservation={s => <Arm pose={s.pose} />} />}
    {stage === "record" && <><p>Sort both claims using the model and its movement rule.</p><SortBins cards={question.recordCards} bins={question.recordBins} placement={state.record} disabled={locked} onPlace={(id, bin) => dispatch({ type: "record", id, bin })} /></>}
    {stage === "conclusion" && <><p>Build three parts in order to explain the observed movement.</p><TileBuilder tiles={question.tiles} placed={state.conclusion} label="Your investigation explanation" disabled={locked} onChange={updateConclusion} /></>}
  </ScienceRound>;
}
