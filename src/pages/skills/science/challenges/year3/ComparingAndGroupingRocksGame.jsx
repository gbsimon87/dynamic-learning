import { useMemo, useRef, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import ClassificationTable from "../../../../../components/challenge/ClassificationTable";
import DataTable from "../../../../../components/challenge/DataTable";
import HintNote from "../../../../../components/challenge/HintNote";
import RockFigure from "../../../../../components/challenge/RockFigure";
import RockSampleIllustration from "../../../../../components/challenge/RockSampleIllustration";
import { isIllustrated } from "../../../../../data/scienceDiagrams";

// The illustrated diagram, or the original hand-built one (scienceDiagrams.js).
const RockPicture = isIllustrated() ? RockSampleIllustration : RockFigure;
import ObservationSequence from "../../../../../components/challenge/ObservationSequence";
import ScienceInformationCard from "../../../../../components/challenge/ScienceInformationCard";
import SortBins from "../../../../../components/challenge/SortBins";
import SpeakButton from "../../../../../components/challenge/SpeakButton";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import { useRocksEnquiry } from "../../../../../hooks/useRocksEnquiry.js";
import { SOURCE, GLOSS, buildRocksQuestions, isRocksSortCorrect, isRocksTableCorrect, testText, specimenText } from "../../../../../data/challenges/science/comparingAndGroupingRocks.js";
const TITLES=["Look closely at rock samples","Group rock samples","Build a classification table","Compare rock properties fairly"];
function Vocabulary(){return <details className="science-gloss"><summary>Science words</summary><p>{GLOSS}</p></details>;}
function Samples({ specimens, tests=false }){return <div className="science-life-cards">{specimens.map(s=><section key={s.id}><RockPicture specimen={s}/>{tests&&<ScienceInformationCard title={`Test card ${s.id}`} text={testText(s)}/>}</section>)}</div>;}
export default function ComparingAndGroupingRocksGame({level,onComplete}){
 const questions=useMemo(()=>buildRocksQuestions(level,Math.random),[level]);
 return <ChallengeShell title={TITLES[level-1]} questions={questions} onComplete={onComplete} render={({question,submit,locked,index,misses})=>{const Round=level===4?Investigation:ShortRound;return <Round key={index} question={question} submit={submit} locked={locked} hint={misses>=2}/>;}}/>;
}
function ShortRound({question,submit,locked,hint}){
 const [selected,setSelected]=useState(null),[record,setRecord]=useState({});const accepted=useRef(false);
 const ready=question.level===1?selected!==null:Object.keys(record).length===(question.level===2?3:6);
 const prompt=question.level===1?question.prompt:question.level===2?`Sort using only this rule: ${question.criterion.label}.`:"Complete both property columns for all three samples. Use the diagrams and any supplied test cards.";
 function check(){if(locked||accepted.current||!ready)return;const correct=question.level===1?selected===question.answer:question.level===2?isRocksSortCorrect(question,record):isRocksTableCorrect(question,record);if(correct)accepted.current=true;submit(correct);}
 function place(id,value){if(locked||accepted.current)return;setRecord(prev=>{const next={...prev};if(value===null)delete next[id];else next[id]=value;return next;});}
 const specimens=question.level===1?[question.specimen]:question.specimens;
 const tests=question.level===2?question.criterion.kind==="test":question.level===3&&question.columns.some(c=>c.kind==="test");
 return <><Vocabulary/><p className="challenge-prompt">{prompt}</p><SpeakButton text={`${prompt} ${specimens.map(s=>`${specimenText(s)} ${tests?testText(s):""}`).join(" ")}`} label="Hear the task"/><Samples specimens={specimens} tests={tests}/>
 {question.level===1&&<><p>Use the magnified view. Hardness needs a test; it cannot be read from a picture alone.</p><ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={value=>{if(!locked&&!accepted.current)setSelected(value);}}/></>}
 {question.level===2&&<SortBins cards={question.recordCards} bins={question.recordBins} placement={record} disabled={locked} onPlace={place}/>}
 {question.level===3&&<ClassificationTable rows={question.specimens} columns={question.columns} answers={record} disabled={locked} onChange={place}/>}
 <p className="science-gloss">{SOURCE.label}. These are unnamed sample diagrams and authored observations, not photographs or rock identifications.</p>
 {hint&&<HintNote>{question.level===1?"Look for the named feature; do not use the picture to guess a scratch result.":question.level===2?"Read the grouping rule again. Use a test card when the rule asks about a test result.":"Check the sample letter and the property heading for every cell. A sample may have more than one feature."}</HintNote>}
 <button type="button" className="submit-btn" disabled={locked||!ready} onClick={check}>Check</button></>;
}
function Investigation({question,submit,locked,hint}){
 const {state,dispatch,updateConclusion}=useRocksEnquiry({question,submit,locked});
 const {stage}=state;
 const fairReady=stage!=="plan";
 const hints={prediction:"Your prediction is not graded.",observe:"Read the before, method and results stages. Compare only the named property.",record:"Match each sample letter to its result. The two samples might belong in the same group.",conclusion:"Use the supplied results for both samples. Appearance alone does not prove the outcome."};
 const current=state.seen.includes(state.observation)?question.stages[state.observation]:null;
 return <><Vocabulary/><p className="challenge-prompt">{question.title}</p><p>{question.setup}</p>
 <SpeakButton text={`${question.title} ${question.setup} ${current?.text??""} ${fairReady?(hints[stage]??""):"Change the sample, but keep the test conditions the same."}`} label="Hear this stage"/>
 {!fairReady?<><p>Which plan makes this comparison fair?</p><ChoiceGrid options={question.fairOptions} selected={state.fairChoice} disabled={locked} variant="wordy" onSelect={value=>dispatch({type:"plan",value})}/>{hint&&<HintNote>Change which sample is tested, but keep the tool or water, time, pressure and other relevant conditions the same.</HintNote>}<button type="button" className="submit-btn" disabled={locked||!state.fairChoice} onClick={()=>dispatch({type:"checkPlan"},true)}>Check comparison plan</button></>:<>
 <p role="status">Stage: {stage==="prediction"?"Predict":stage==="observe"?"Observe":stage==="record"?"Record results":"Explain"}</p>
 {stage==="prediction"&&<><Samples specimens={question.specimens}/><p>What might the test show? Your prediction is not marked right or wrong.</p><ChoiceGrid options={question.predictionOptions} selected={state.prediction} disabled={locked} variant="wordy" onSelect={value=>dispatch({type:"predict",value})}/><button type="button" className="submit-btn" disabled={locked||!state.prediction} onClick={()=>dispatch({type:"start"})}>Inspect the observations</button></>}
 {["observe","record","conclusion"].includes(stage)&&<ObservationSequence stages={question.stages} index={state.observation} seen={state.seen} disabled={locked} label="Rock comparison observations" onView={index=>dispatch({type:"view",index})} onNext={stage==="observe"?()=>dispatch({type:"next"}):null} renderObservation={s=>s.results?<><DataTable caption="Supplied test results" columns={[{key:"result",label:question.property.title}]} rows={question.specimens.map((sample,i)=>({label:`Sample ${sample.id}`,cells:{result:question.results[i]?question.property.yes:question.property.no}}))}/><p>{question.property.finding}</p></>:<ScienceInformationCard title={s.label} text={s.text}/>}/>}
 {stage==="observe"&&state.seen.length===question.stages.length&&<button type="button" className="submit-btn" disabled={locked} onClick={()=>dispatch({type:"recordStage"})}>Record the results</button>}
 {stage==="record"&&<><p>Group both samples by this test result. Use the results table, not their appearance.</p><SortBins cards={question.recordCards} bins={question.recordBins} placement={state.record} disabled={locked} onPlace={(id,bin)=>dispatch({type:"record",id,bin})}/><button type="button" className="submit-btn" disabled={locked||Object.keys(state.record).length!==2} onClick={()=>dispatch({type:"checkRecord"},true)}>Check records</button></>}
 {stage==="conclusion"&&<><p>Choose one explanation supported by the test.</p><TileBuilder tiles={question.tiles} placed={state.conclusion} disabled={locked} label="Your rock comparison explanation" onChange={updateConclusion}/><button type="button" className="submit-btn" disabled={locked||state.conclusion.length!==1} onClick={()=>dispatch({type:"finish"},true)}>Check explanation</button></>}
 {hint&&stage!=="done"&&<HintNote>{hints[stage]}</HintNote>}
 {stage!=="done"&&<button type="button" className="science-reset" disabled={locked} onClick={()=>dispatch({type:"reset"})}>Restart this investigation</button>}
 </>}</>;
}
