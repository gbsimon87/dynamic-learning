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
import ScienceRound from "../../../../../components/challenge/ScienceRound";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import { useRocksEnquiry } from "../../../../../hooks/useRocksEnquiry.js";
import { SOURCE, GLOSS, buildRocksQuestions, isRocksSortCorrect, isRocksTableCorrect, testText, specimenText } from "../../../../../data/challenges/science/comparingAndGroupingRocks.js";
const TITLES=["Look closely at rock samples","Group rock samples","Fill in a table","Compare rocks fairly"];
function Samples({ specimens, tests=false }){return <div className="science-life-cards">{specimens.map(s=><section key={s.id}><RockPicture specimen={s}/>{tests&&<ScienceInformationCard title={`Test card ${s.id}`} text={testText(s)}/>}</section>)}</div>;}
export default function ComparingAndGroupingRocksGame({level,onComplete}){
 const questions=useMemo(()=>buildRocksQuestions(level,Math.random),[level]);
 return <ChallengeShell wide title={TITLES[level-1]} questions={questions} onComplete={onComplete} render={({question,submit,locked,index,misses, feedback }) => {const Round=level===4?Investigation:ShortRound;return <Round key={index} question={question} submit={submit} locked={locked} hint={misses>=2} feedback={feedback}/>;}}/>;
}
function ShortRound({ question, submit, locked, hint, feedback }) {
 const [selected,setSelected]=useState(null),[record,setRecord]=useState({});const accepted=useRef(false);
 const ready=question.level===1?selected!==null:Object.keys(record).length===(question.level===2?3:6);
 const prompt=question.level===1?question.prompt:question.level===2?`Sort the samples by this rule: ${question.criterion.label.toLowerCase()}.`:"Fill in the table. Choose Yes or No for every sample and column. Use the pictures and any test cards.";
 function check(){if(locked||accepted.current||!ready)return;const correct=question.level===1?selected===question.answer:question.level===2?isRocksSortCorrect(question,record):isRocksTableCorrect(question,record);if(correct)accepted.current=true;submit(correct);}
 function place(id,value){if(locked||accepted.current)return;setRecord(prev=>{const next={...prev};if(value===null)delete next[id];else next[id]=value;return next;});}
 const specimens=question.level===1?[question.specimen]:question.specimens;
 const tests=question.level===2?question.criterion.kind==="test":question.level===3&&question.columns.some(c=>c.kind==="test");
 return <ScienceRound
 prompt={<p className="challenge-prompt">{prompt}</p>} speak={`${specimens.map(s=>`${specimenText(s)} ${tests?testText(s):""}`).join(" ")} ${prompt}`} speakLabel="Hear the task" gloss={GLOSS}
 figure={<><Samples specimens={specimens} tests={tests}/><p className="science-source">{SOURCE.label}. These are drawings of example samples, not photos of real rocks.</p></>}
 answerLabel={question.level===1?"Look at the magnified picture. A picture cannot show how hard a rock is. We need a test for that.":undefined}
 hint={hint&&<HintNote>{question.level===1?"Look for the feature in the question. A picture cannot show a scratch test.":question.level===2?"Read the sorting rule again. Use a test card when the rule is about a test.":"Check the sample letter and the column heading for every box. A sample can have more than one feature."}</HintNote>}
 check={{label:"Check",disabled:locked||!ready,onClick:check}} feedback={feedback}>
 {question.level===1&&<ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={value=>{if(!locked&&!accepted.current)setSelected(value);}}/>}
 {question.level===2&&<SortBins cards={question.recordCards} bins={question.recordBins} placement={record} disabled={locked} onPlace={place}/>}
 {question.level===3&&<ClassificationTable rows={question.specimens} columns={question.columns} answers={record} disabled={locked} onChange={place}/>}
 </ScienceRound>;
}
function Investigation({ question, submit, locked, hint, feedback }) {
 const {state,dispatch,updateConclusion}=useRocksEnquiry({question,submit,locked});
 const {stage}=state;
 const fairReady=stage!=="plan";
 const hints={prediction:"A prediction is a guess before you look. Any guess is fine.",observe:"Read the Before, Same test and Results stages. Compare only the property in the question.",record:"Match each sample to its result. Both samples could go in the same group.",conclusion:"Use the results for both samples. How a rock looks does not prove the result."};
 const current=state.seen.includes(state.observation)?question.stages[state.observation]:null;
 const action=!fairReady?{label:"Check my plan",disabled:locked||!state.fairChoice,onClick:()=>dispatch({type:"checkPlan"},true)}
 :stage==="prediction"?{label:"Look at the test",disabled:locked||!state.prediction,onClick:()=>dispatch({type:"start"})}
 :stage==="observe"?(state.seen.length===question.stages.length?{label:"Sort the results",disabled:locked,onClick:()=>dispatch({type:"recordStage"})}:null)
 :stage==="record"?{label:"Check my sort",disabled:locked||Object.keys(state.record).length!==2,onClick:()=>dispatch({type:"checkRecord"},true)}
 : stage === "done" ? null
 : { label: "Check my explanation",disabled:locked||state.conclusion.length!==1,onClick:()=>dispatch({type:"finish"},true)};
 return <ScienceRound
 prompt={<p className="challenge-prompt">{question.title}</p>} speak={`${question.title} ${question.setup} ${current?.text??""} ${fairReady?(hints[stage]??""):"Test different samples, but keep everything else the same."}`} speakLabel="Hear this stage" gloss={GLOSS}
 evidence={<p>{question.setup}</p>}
 hint={hint&&stage!=="done"&&<HintNote>{!fairReady?"Change which sample you test. Keep the tool or water, the time and the push the same.":hints[stage]}</HintNote>}
 check={action} feedback={feedback}
 secondary={fairReady&&stage!=="done"&&<button type="button" className="science-reset" disabled={locked} onClick={()=>dispatch({type:"reset"})}>Start again</button>}>
 {!fairReady?<><p>Which plan is a fair test?</p><ChoiceGrid options={question.fairOptions} selected={state.fairChoice} disabled={locked} variant="wordy" onSelect={value=>dispatch({type:"plan",value})}/></>:<>
 <p role="status">Stage: {stage==="prediction"?"Predict":stage==="observe"?"Observe":stage==="record"?"Sort results":"Explain"}</p>
 {stage==="prediction"&&<><Samples specimens={question.specimens}/><p>What do you think the test will show? There is no wrong answer.</p><ChoiceGrid options={question.predictionOptions} selected={state.prediction} disabled={locked} variant="wordy" onSelect={value=>dispatch({type:"predict",value})}/></>}
 {["observe","record","conclusion"].includes(stage)&&<ObservationSequence stages={question.stages} index={state.observation} seen={state.seen} disabled={locked} label="What we saw" onView={index=>dispatch({type:"view",index})} onNext={stage==="observe"?()=>dispatch({type:"next"}):null} renderObservation={s=>s.results?<><DataTable caption="Test results" columns={[{key:"result",label:question.property.title}]} rows={question.specimens.map((sample,i)=>({label:`Sample ${sample.id}`,cells:{result:question.results[i]?question.property.yes:question.property.no}}))}/><p>{question.property.finding}</p></>:<ScienceInformationCard title={s.label} text={s.text}/>}/>}
 {stage==="record"&&<><p>Sort both samples by their test result. Use the table, not how they look.</p><SortBins cards={question.recordCards} bins={question.recordBins} placement={state.record} disabled={locked} onPlace={(id,bin)=>dispatch({type:"record",id,bin})}/></>}
 {stage==="conclusion"&&<><p>Choose the ending that the test results support.</p><TileBuilder tiles={question.tiles} placed={state.conclusion} disabled={locked} label="Your ending" onChange={updateConclusion}/></>}
 </>}
 </ScienceRound>;
}
