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
const TITLES = ["Muscles pull bones", "Compare the arm pictures", "Explain how the arm moves", "Watch an arm model"];
function Guidance() { return <><ScienceInformationCard title="How this arm model works" text="The front muscle gets shorter and pulls to bend the arm. The back muscle gets shorter and pulls to straighten it. The other muscle relaxes and stretches longer. Muscles pull bones. They never push them." sourceLabel={SOURCE.label} />{isIllustrated() && <MuscleMapFigure highlight={["biceps", "triceps"]} caption="These two muscles are in your upper arm. One is at the front and one is at the back." />}</>; }
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
    prompt={<p className="challenge-prompt">{question.prompt}</p>} speak={`${question.text ?? "Look at the arm pictures in order."} ${question.prompt}`} speakLabel="Hear the question" gloss={GLOSS}
    figure={question.level === 1 ? <Arm pose={question.pose} /> : <Pictures stages={question.stages} />}
    reference={question.level === 3 ? <Guidance /> : null}
    evidence={question.level === 1 ? <ScienceInformationCard title="Remember this" text={question.text} sourceLabel={SOURCE.label} /> : null}
    answerLabel={question.level === 3 ? "Tap three parts in order: the muscle, the pull, then the movement. Tap a part to take it back." : undefined}
    hint={hint && <HintNote>{question.level === 1 ? "Read the card again. Muscles pull, and the bones move at the elbow joint." : question.level === 2 ? "Compare the first and last pictures. If the arm goes back, look at the middle picture too." : "Start with what the muscle does. Next, say how it pulls the bone. End with the movement at the elbow."}</HintNote>}
    check={{ label: "Check", disabled: locked || !ready, onClick: check }} feedback={feedback}>
    {question.level === 3 ? <TileBuilder tiles={question.tiles} placed={placed} label="Your explanation" disabled={locked} onChange={update => { if (!locked && !accepted.current) setPlaced(previous => update(previous)); }} /> : <ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={value => { if (!locked && !accepted.current) setSelected(value); }} />}
  </ScienceRound>;
}
function Investigation({ question, submit, locked, hint, feedback }) {
  const { state, dispatch, updateConclusion } = useProcessEnquiry({ question, validateRecord: isMovementRecordCorrect, submit, locked });
  const { stage } = state;
  const current = state.seen.includes(state.observation) ? question.stages[state.observation] : null;
  const hints = { prediction: "A prediction is a guess before you look. Any guess is fine.", observe: "Look at all three stages. Which muscle gets shorter? How does the lower arm move?", record: "Check each claim. Read the card to decide if muscles pull or push bones.", conclusion: "Choose three parts: what the muscle does, how it pulls the bone, then the movement you saw." };
  const action = stage === "prediction" ? { label: "Look at the model", disabled: locked || !state.prediction, onClick: () => dispatch({ type: "start" }) }
    : stage === "observe" ? (state.seen.length === question.stages.length ? { label: "Check the claims", disabled: locked, onClick: () => dispatch({ type: "recordStage" }) } : null)
    : stage === "record" ? { label: "Check my sort", disabled: locked || Object.keys(state.record).length !== 2, onClick: () => dispatch({ type: "checkRecord" }, true) }
    : stage === "done" ? null
    : { label: "Check my explanation", disabled: locked || state.conclusion.length !== 3, onClick: () => dispatch({ type: "finish" }, true) };
  return <ScienceRound
    prompt={<p className="challenge-prompt">{question.title}</p>} speak={`${question.setup} ${current ? `Current picture: ${current.label}, ${current.pose} arm.` : ""} ${hints[stage] ?? ""}`} speakLabel="Hear this stage" gloss={GLOSS}
    evidence={<><p>{question.setup}</p><Guidance /></>}
    hint={hint && stage !== "done" && <HintNote>{hints[stage]}</HintNote>}
    check={action} feedback={feedback}
    secondary={stage !== "prediction" && stage !== "done" && <button type="button" className="science-reset" disabled={locked} onClick={() => dispatch({ type: "reset" })}>Start again</button>}>
    <p role="status">Stage: {stage === "prediction" ? "Predict" : stage === "observe" ? "Observe" : stage === "record" ? "Check claims" : "Explain"}</p>
    {stage === "prediction" && <><p>What do you think the pictures will show? There is no wrong answer.</p><ChoiceGrid options={question.predictionOptions} selected={state.prediction} disabled={locked} variant="wordy" onSelect={value => dispatch({ type: "predict", value })} /></>}
    {["observe", "record", "conclusion"].includes(stage) && <ObservationSequence stages={question.stages} index={state.observation} seen={state.seen} disabled={locked} label="Arm pictures" onView={index => dispatch({ type: "view", index })} onNext={stage === "observe" ? () => dispatch({ type: "next" }) : null} renderObservation={s => <Arm pose={s.pose} />} />}
    {stage === "record" && <><p>Sort both claims. Use the model and the card.</p><SortBins cards={question.recordCards} bins={question.recordBins} placement={state.record} disabled={locked} onPlace={(id, bin) => dispatch({ type: "record", id, bin })} /></>}
    {stage === "conclusion" && <><p>Choose three parts, in order, to explain the movement.</p><TileBuilder tiles={question.tiles} placed={state.conclusion} label="Your explanation" disabled={locked} onChange={updateConclusion} /></>}
  </ScienceRound>;
}
