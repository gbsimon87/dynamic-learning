import ChoiceGrid from "./ChoiceGrid";
import FairTestBoard from "./FairTestBoard";
import HintNote from "./HintNote";
import ObservationSequence from "./ObservationSequence";
import SortBins from "./SortBins";
import SpeakButton from "./SpeakButton";
import TileBuilder from "./TileBuilder";
import { useForcesEnquiry } from "../../hooks/useForcesEnquiry.js";

/** Topic-owned evidence; shared guarded stages. Only a final correct explanation submits success. */
export default function ForcesEnquiryRound({ question, submit, locked, hint, validateRecord, validateSetup = null, renderObservation }) {
  const { state, dispatch, updateConclusion } = useForcesEnquiry({ question, validateRecord, validateSetup, submit, locked });
  const { stage } = state;
  const current = state.seen.includes(state.observation) ? question.stages[state.observation] : null;
  return <><p className="challenge-prompt">{question.title}</p><p>{question.setup}</p>
    <p role="status">Stage: {stage === "prediction" ? "Predict" : stage === "setup" ? "Fair comparison" : stage === "observe" ? "Observe" : stage === "record" ? "Record" : "Explain"}</p>
    <SpeakButton text={`${question.setup} ${current?.text ?? ""}`} label="Hear this stage" />
    {stage === "prediction" && <><p>A prediction is an idea to check. It is not marked right or wrong.</p><ChoiceGrid options={question.predictionOptions} selected={state.prediction} disabled={locked} variant="wordy" onSelect={value => dispatch({ type: "predict", value })} /><button type="button" className="submit-btn" disabled={locked || !state.prediction} onClick={() => dispatch({ type: "start" })}>{validateSetup ? "Plan the comparison" : "Start observing"}</button></>}
    {stage === "setup" && <><FairTestBoard prompt={question.setupPrompt} comparison={question.setup} cards={question.setupCards} placement={state.setup} disabled={locked} onPlace={(id, bin) => dispatch({ type: "setup", id, bin })} /><button type="button" className="submit-btn" disabled={locked || Object.keys(state.setup).length !== question.setupCards.length} onClick={() => dispatch({ type: "checkSetup" }, true)}>Check fair comparison</button></>}
    {["observe", "record", "conclusion"].includes(stage) && <ObservationSequence stages={question.stages} index={state.observation} seen={state.seen} disabled={locked} label={question.title} nextLabel={question.nextLabel ?? "Inspect next observation"} onView={index => dispatch({ type: "view", index })} onNext={stage === "observe" ? () => dispatch({ type: "next" }) : null} renderObservation={renderObservation} />}
    {stage === "observe" && state.seen.length === question.stages.length && <button type="button" className="submit-btn" disabled={locked} onClick={() => dispatch({ type: "recordStage" })}>Record findings</button>}
    {stage === "record" && <><p>{question.recordPrompt}</p><SortBins cards={question.recordCards} bins={question.recordBins} placement={state.record} disabled={locked} onPlace={(id, bin) => dispatch({ type: "record", id, bin })} /><button type="button" className="submit-btn" disabled={locked || Object.keys(state.record).length !== question.recordCards.length} onClick={() => dispatch({ type: "checkRecord" }, true)}>Check records</button></>}
    {stage === "conclusion" && <><p>Build the explanation in the order First, Evidence, So.</p><TileBuilder tiles={question.tiles} placed={state.conclusion} label="Your scientific explanation" disabled={locked} onChange={updateConclusion} /><button type="button" className="submit-btn" disabled={locked || state.conclusion.length !== question.correctConclusionIds.length} onClick={() => dispatch({ type: "finish" }, true)}>Check explanation</button></>}
    {hint && stage !== "done" && <HintNote>{stage === "setup" ? question.setupHint : stage === "record" ? question.recordHint : question.conclusionHint}</HintNote>}
    {stage !== "prediction" && stage !== "done" && <button type="button" className="science-reset" disabled={locked} onClick={() => dispatch({ type: "reset" })}>Restart this investigation</button>}
  </>;
}
