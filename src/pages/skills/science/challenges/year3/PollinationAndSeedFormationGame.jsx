import { useMemo, useRef, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import HintNote from "../../../../../components/challenge/HintNote";
import ObservationSequence from "../../../../../components/challenge/ObservationSequence";
import FlowerLifeCycleFigure from "../../../../../components/challenge/FlowerLifeCycleFigure";
import FlowerLifeCycleIllustration from "../../../../../components/challenge/FlowerLifeCycleIllustration";
import { isIllustrated } from "../../../../../data/scienceDiagrams";
import SortBins from "../../../../../components/challenge/SortBins";
import ScienceRound from "../../../../../components/challenge/ScienceRound";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import { useProcessEnquiry } from "../../../../../hooks/useProcessEnquiry.js";
import { GLOSS, buildPollinationAndSeedFormationQuestions, isPollinationSequenceCorrect, isPollinationRecordCorrect } from "../../../../../data/challenges/science/pollinationAndSeedFormation.js";

const ROLE_FACTS = "Flowers make pollen. Pollen is a fine powder. Pollination is pollen reaching the receiving part of a flower. Seeds can grow afterwards, and the seeds can grow into new plants. Insects and wind can carry pollen. Nectar is a sweet liquid in some flowers.";
const LifeCyclePicture = isIllustrated() ? FlowerLifeCycleIllustration : FlowerLifeCycleFigure;
const TITLES = ["Flowers, pollen and seeds", "Read the life-cycle pictures", "Build the life cycle", "Explain pollination and seeds"];
export default function PollinationAndSeedFormationGame({ level, onComplete }) {
  const questions = useMemo(() => buildPollinationAndSeedFormationQuestions(level, Math.random), [level]);
  return <ChallengeShell wide title={TITLES[level - 1]} questions={questions} onComplete={onComplete} render={({ question, submit, locked, index, misses, feedback }) => {
    const Round = level === 4 ? EnquiryRound : ShortRound;
    return <Round key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} feedback={feedback} />;
  }} />;
}
function ShortRound({ question, submit, locked, hint, feedback }) {
  const [selected, setSelected] = useState(null);
  const [placed, setPlaced] = useState([]);
  const accepted = useRef(false);
  const ready = question.level === 3 ? placed.length === question.steps.length : selected !== null;
  const check = () => {
    if (locked || accepted.current || !ready) return;
    const correct = question.level === 3 ? isPollinationSequenceCorrect(question, placed) : selected === question.answer;
    if (correct) accepted.current = true;
    submit(correct);
  };
  const figure = question.level === 2
    ? <div className="science-life-cards">{question.stages.map((shown) => <section key={shown.id}><h4>{shown.label}</h4><LifeCyclePicture phase={shown.phase} seedCase={shown.seedCase} pollinator={shown.pollinator} evidence={shown.evidence} /></section>)}</div>
    : question.level === 3
      ? <div className="science-life-cards">{["seed", "seedling", "flower", "pollen", "seeds"].map((phase) => <LifeCyclePicture key={phase} phase={phase} evidence={{ seed: "Seed", seedling: "Young plant", flower: "Flower", pollen: "Pollen on the flower", seeds: "New seeds inside a seed case" }[phase]} />)}</div>
      : <LifeCyclePicture phase={question.phase} />;
  return <ScienceRound
    prompt={<p className="challenge-prompt">{question.prompt}</p>} speak={`${question.level === 1 ? ROLE_FACTS : question.setup ?? ""} ${question.prompt}`} gloss={GLOSS}
    figure={figure}
    evidence={question.level === 1 ? <p className="science-observation">{ROLE_FACTS}</p> : question.level === 2 ? <p>{question.setup}</p> : null}
    answerLabel={question.level === 3 ? "Tap the steps in order. Tap a step to take it back." : undefined}
    hint={hint && <HintNote>{question.level === 3 ? "Find the first step. A young plant grows flowers. Pollen arrives before new seeds grow. What we learn comes after what we see." : question.level === 2 ? "Read the setup and look at the cards. Pollen moving is different from seeing new seeds." : "Use the word guide. Pollen is a powder, not a seed. Seeds can grow after pollination."}</HintNote>}
    check={{ label: "Check", disabled: locked || !ready, onClick: check }} feedback={feedback}>
    {question.level === 3 ? <TileBuilder tiles={question.tiles} placed={placed} disabled={locked} label="Your steps" onChange={(update) => { if (!locked && !accepted.current) setPlaced((previous) => update(previous)); }} /> : <ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={(value) => { if (!locked && !accepted.current) setSelected(value); }} />}
  </ScienceRound>;
}
function EnquiryRound({ question, submit, locked, hint, feedback }) {
  const { state, dispatch, updateConclusion } = useProcessEnquiry({ question, validateRecord: isPollinationRecordCorrect, submit, locked });
  const { stage } = state;
  const hints = { prediction: "A prediction is a guess before you look. Any guess is fine.", observe: "Look at every card. Pollen dots on the receiving part are not the same as seeds in a seed case.", record: "Use all the cards. Did we see pollen move? Did we see new seeds? A seed at the start is not a new seed.", conclusion: "Choose the ending that matches what you saw. Pollination alone does not show that seeds grew." };
  const shown = state.seen.includes(state.observation) ? question.stages[state.observation] : null;
  const action = stage === "prediction" ? { label: "Look at the pictures", disabled: locked || !state.prediction, onClick: () => dispatch({ type: "start" }) }
    : stage === "observe" ? (state.seen.length === question.stages.length ? { label: "Write down what I saw", disabled: locked, onClick: () => dispatch({ type: "recordStage" }) } : null)
    : stage === "record" ? { label: "Check my sort", disabled: locked || Object.keys(state.record).length !== question.recordCards.length, onClick: () => dispatch({ type: "checkRecord" }, true) }
    : stage === "done" ? null
    : { label: "Check my ending", disabled: locked || state.conclusion.length !== 1, onClick: () => dispatch({ type: "finish" }, true) };
  return <ScienceRound
    prompt={<p className="challenge-prompt">{question.title}</p>} speak={`${question.setup} ${shown ? shown.label + ": " + shown.evidence : ""} ${hints[stage] ?? ""}`} speakLabel="Hear this stage" gloss={GLOSS}
    evidence={<div className="science-observation"><strong>Look and remember</strong><p>{question.setup}</p></div>}
    hint={hint && stage !== "done" && <HintNote>{hints[stage]}</HintNote>}
    check={action} feedback={feedback}
    secondary={stage !== "prediction" && stage !== "done" && <button type="button" className="science-reset" disabled={locked} onClick={() => dispatch({ type: "reset" })}>Start again</button>}>
    <p role="status">Stage: {stage === "prediction" ? "Predict" : stage === "observe" ? "Observe" : stage === "record" ? "Record" : "Explain"}</p>
    {stage === "prediction" && <><p>What do you think we will see later? There is no wrong answer.</p><ChoiceGrid options={question.predictionOptions} selected={state.prediction} disabled={locked} variant="wordy" onSelect={(value) => dispatch({ type: "predict", value })} /></>}
    {["observe", "record", "conclusion"].includes(stage) && <ObservationSequence stages={question.stages} index={state.observation} seen={state.seen} disabled={locked} label="What we saw" onView={(index) => dispatch({ type: "view", index })} onNext={stage === "observe" ? () => dispatch({ type: "next" }) : null} renderObservation={(observation) => <LifeCyclePicture phase={observation.phase} seedCase={observation.seedCase} pollinator={observation.pollinator} evidence={observation.evidence} />} />}
    {stage === "record" && <><p>Sort both cards. Use all the pictures. “Not seen yet” does not mean it cannot happen.</p><SortBins cards={question.recordCards} bins={question.recordBins} placement={state.record} disabled={locked} onPlace={(id, bin) => dispatch({ type: "record", id, bin })} /></>}
    {stage === "conclusion" && <><p>What we saw tells us…</p><TileBuilder tiles={question.tiles} placed={state.conclusion} disabled={locked} label="Your ending" onChange={updateConclusion} /><p>Choose one ending. Then think about this: {question.followUp}</p></>}
  </ScienceRound>;
}
