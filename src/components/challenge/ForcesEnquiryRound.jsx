import ChoiceGrid from "./ChoiceGrid";
import FairTestBoard from "./FairTestBoard";
import HintNote from "./HintNote";
import ObservationSequence from "./ObservationSequence";
import SortBins from "./SortBins";
import ScienceRound from "./ScienceRound";
import TileBuilder from "./TileBuilder";
import { useForcesEnquiry } from "../../hooks/useForcesEnquiry.js";

/** Topic-owned evidence; shared guarded stages. Only a final correct explanation submits success. */
export default function ForcesEnquiryRound({ question, submit, locked, hint, feedback, gloss, source, validateRecord, validateSetup = null, renderObservation }) {
  const { state, dispatch, updateConclusion } = useForcesEnquiry({ question, validateRecord, validateSetup, submit, locked });
  const { stage } = state;
  const current = state.seen.includes(state.observation) ? question.stages[state.observation] : null;
  const action = stage === "prediction" ? { label: validateSetup ? "Plan the comparison" : "Start observing", disabled: locked || !state.prediction, onClick: () => dispatch({ type: "start" }) }
    : stage === "setup" ? { label: "Check fair comparison", disabled: locked || Object.keys(state.setup).length !== question.setupCards.length, onClick: () => dispatch({ type: "checkSetup" }, true) }
    : stage === "observe" ? (state.seen.length === question.stages.length ? { label: "Record findings", disabled: locked, onClick: () => dispatch({ type: "recordStage" }) } : null)
    : stage === "record" ? { label: "Check records", disabled: locked || Object.keys(state.record).length !== question.recordCards.length, onClick: () => dispatch({ type: "checkRecord" }, true) }
    : stage === "done" ? null
    : { label: "Check explanation", disabled: locked || state.conclusion.length !== question.correctConclusionIds.length, onClick: () => dispatch({ type: "finish" }, true) };
  return <ScienceRound
    prompt={<p className="challenge-prompt">{question.title}</p>} speak={`${question.setup} ${current?.text ?? ""}`} speakLabel="Hear this stage" gloss={gloss}
    evidence={<><p>{question.setup}</p>{source}</>}
    hint={hint && stage !== "done" && <HintNote>{stage === "setup" ? question.setupHint : stage === "record" ? question.recordHint : question.conclusionHint}</HintNote>}
    check={action} feedback={feedback}
    secondary={stage !== "prediction" && stage !== "done" && <button type="button" className="science-reset" disabled={locked} onClick={() => dispatch({ type: "reset" })}>Restart this investigation</button>}>
    <p role="status">Stage: {stage === "prediction" ? "Predict" : stage === "setup" ? "Fair comparison" : stage === "observe" ? "Observe" : stage === "record" ? "Record" : "Explain"}</p>
    {stage === "prediction" && <><p>A prediction is an idea to check. It is not marked right or wrong.</p><ChoiceGrid options={question.predictionOptions} selected={state.prediction} disabled={locked} variant="wordy" onSelect={value => dispatch({ type: "predict", value })} /></>}
    {stage === "setup" && <FairTestBoard prompt={question.setupPrompt} comparison={question.setup} cards={question.setupCards} placement={state.setup} disabled={locked} onPlace={(id, bin) => dispatch({ type: "setup", id, bin })} />}
    {["observe", "record", "conclusion"].includes(stage) && <ObservationSequence stages={question.stages} index={state.observation} seen={state.seen} disabled={locked} label={question.title} nextLabel={question.nextLabel ?? "Inspect next observation"} onView={index => dispatch({ type: "view", index })} onNext={stage === "observe" ? () => dispatch({ type: "next" }) : null} renderObservation={renderObservation} />}
    {stage === "record" && <><p>{question.recordPrompt}</p><SortBins cards={question.recordCards} bins={question.recordBins} placement={state.record} disabled={locked} onPlace={(id, bin) => dispatch({ type: "record", id, bin })} /></>}
    {stage === "conclusion" && <><p>Build the explanation in the order First, Evidence, So.</p><TileBuilder tiles={question.tiles} placed={state.conclusion} label="Your scientific explanation" disabled={locked} onChange={updateConclusion} /></>}
  </ScienceRound>;
}
