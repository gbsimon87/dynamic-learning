import { useMemo, useRef, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import FossilFormationFigure from "../../../../../components/challenge/FossilFormationFigure";
import FossilLayersIllustration from "../../../../../components/challenge/FossilLayersIllustration";
import { isIllustrated } from "../../../../../data/scienceDiagrams";

// The illustrated diagram, or the original hand-built one (scienceDiagrams.js).
const FossilPicture = isIllustrated() ? FossilLayersIllustration : FossilFormationFigure;
import HintNote from "../../../../../components/challenge/HintNote";
import ObservationSequence from "../../../../../components/challenge/ObservationSequence";
import ScienceInformationCard from "../../../../../components/challenge/ScienceInformationCard";
import SortBins from "../../../../../components/challenge/SortBins";
import SpeakButton from "../../../../../components/challenge/SpeakButton";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import { useProcessEnquiry } from "../../../../../hooks/useProcessEnquiry.js";
import { SOURCES, GLOSS, buildFossilQuestions, isFossilRecordCorrect, isFossilOrderCorrect } from "../../../../../data/challenges/science/howFossilsForm.js";
const TITLES=["Evidence of past life","Compare fossil evidence","Order a fossil story","Explain how a fossil formed"];
function Vocabulary(){return <details className="science-gloss"><summary>Science words</summary><p>{GLOSS}</p></details>;}
function Picture({question,stage}){return <FossilPicture kind={question.account.kind} phase={stage.phase} description={stage.text}/>;}
function Source({question}){return <p className="science-gloss">{SOURCES[question.account.source].label}. This is a simplified illustrated account, not a photograph or live experiment.</p>;}
export default function HowFossilsFormGame({level,onComplete}){
 const questions=useMemo(()=>buildFossilQuestions(level,Math.random),[level]);
 return <ChallengeShell title={TITLES[level-1]} questions={questions} onComplete={onComplete} render={({question,submit,locked,index,misses})=>{const Round=level===4?Investigation:ShortRound;return <Round key={index} question={question} submit={submit} locked={locked} hint={misses>=2}/>;}}/>;
}
function ShortRound({question,submit,locked,hint}){
 const [selected,setSelected]=useState(null),[record,setRecord]=useState({}),[placed,setPlaced]=useState([]);const accepted=useRef(false);
 const prompt=question.level===1?question.prompt:question.level===2?"Compare the illustrated account. Sort the claims using its evidence.":question.prompt;
 const ready=question.level===1?selected!==null:question.level===2?Object.keys(record).length===3:placed.length===4;
 const cards=question.level===3?question.pictureCards:question.level===1?question.stages.filter(s=>s.phase===question.phase):question.stages;
 function check(){if(locked||accepted.current||!ready)return;const correct=question.level===1?selected===question.answer:question.level===2?isFossilRecordCorrect(question,record):isFossilOrderCorrect(question,placed);if(correct)accepted.current=true;submit(correct);}
 return <><Vocabulary/><p className="challenge-prompt">{prompt}</p><SpeakButton text={`${prompt} ${cards.map(s=>s.text).join(" ")}`} label="Hear the task"/>
 <div className="science-life-cards">{cards.map(s=><section key={s.id}><h4>{question.level===3?`Picture ${s.letter}`:s.label}</h4><Picture question={question} stage={s}/></section>)}</div><Source question={question}/>
 {question.level===1&&<ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={value=>{if(!locked&&!accepted.current)setSelected(value);}}/>}
 {question.level===2&&<SortBins cards={question.recordCards} bins={question.recordBins} placement={record} disabled={locked} onPlace={(id,bin)=>{if(locked||accepted.current)return;setRecord(prev=>{const next={...prev};if(bin===null)delete next[id];else next[id]=bin;return next;});}}/>}
 {question.level===3&&<><p>Choose all four picture cards from earliest to latest. Tap a chosen card to take it back. Exposure comes after the fossil has formed.</p><TileBuilder tiles={question.tiles} placed={placed} label="Your ordered fossil story" disabled={locked} onChange={update=>{if(!locked&&!accepted.current)setPlaced(prev=>update(prev));}}/></>}
 {hint&&<HintNote>{question.level===1?"Read the picture caption. Look for burial, preserved evidence or later exposure.":question.level===2?"Match each claim to the account. Evidence of a once-living thing is different from something still alive; burial does not guarantee a fossil.":"Start with past life. Follow the remains into sediment and rock before the covering rock is removed."}</HintNote>}
 <button type="button" className="submit-btn" disabled={locked||!ready} onClick={check}>Check</button></>;
}
function Investigation({question,submit,locked,hint}){
 const {state,dispatch,updateConclusion}=useProcessEnquiry({question,validateRecord:isFossilRecordCorrect,submit,locked});const {stage}=state;
 const current=state.seen.includes(state.observation)?question.stages[state.observation]:null;
 const hints={prediction:"Your prediction is not graded.",observe:"Read all four source cards. Look for what was buried and what was preserved.",record:"Use the preserved-evidence card to check one claim. The fossil is not alive, and burial does not guarantee preservation.",conclusion:"Link sediment burial to the evidence in rock, then to later exposure. Finding the fossil does not create it."};
 return <><Vocabulary/><p className="challenge-prompt">{question.title}</p><p>{question.setup}</p><Source question={question}/>
 <p role="status">Stage: {stage==="prediction"?"Predict":stage==="observe"?"Read sources":stage==="record"?"Check evidence":"Explain"}</p>
 <SpeakButton text={`${question.setup} ${current?.text??""} ${hints[stage]??""}`} label="Hear this stage"/>
 {stage==="prediction"&&<><p>What might remain after burial? Your prediction is not marked right or wrong.</p><ChoiceGrid options={question.predictionOptions} selected={state.prediction} disabled={locked} variant="wordy" onSelect={value=>dispatch({type:"predict",value})}/><button type="button" className="submit-btn" disabled={locked||!state.prediction} onClick={()=>dispatch({type:"start"})}>Inspect the sources</button></>}
 {["observe","record","conclusion"].includes(stage)&&<ObservationSequence stages={question.stages} index={state.observation} seen={state.seen} disabled={locked} label="Fossil formation source cards" nextLabel="Read next source card" onView={index=>dispatch({type:"view",index})} onNext={stage==="observe"?()=>dispatch({type:"next"}):null} renderObservation={s=><><ScienceInformationCard title={s.label} text={s.text} sourceLabel={SOURCES[question.account.source].label}/><Picture question={question} stage={s}/></>}/>}
 {stage==="observe"&&state.seen.length===question.stages.length&&<button type="button" className="submit-btn" disabled={locked} onClick={()=>dispatch({type:"recordStage"})}>Check the evidence</button>}
 {stage==="record"&&<><p>Sort both claims using the illustrated account.</p><SortBins cards={question.recordCards} bins={question.recordBins} placement={state.record} disabled={locked} onPlace={(id,bin)=>dispatch({type:"record",id,bin})}/><button type="button" className="submit-btn" disabled={locked||Object.keys(state.record).length!==2} onClick={()=>dispatch({type:"checkRecord"},true)}>Check claims</button></>}
 {stage==="conclusion"&&<><p>Choose one explanation that connects the evidence to formation and later exposure.</p><TileBuilder tiles={question.tiles} placed={state.conclusion} label="Your fossil formation explanation" disabled={locked} onChange={updateConclusion}/><button type="button" className="submit-btn" disabled={locked||state.conclusion.length!==1} onClick={()=>dispatch({type:"finish"},true)}>Check explanation</button></>}
 {hint&&stage!=="done"&&<HintNote>{hints[stage]}</HintNote>}
 {stage!=="prediction"&&stage!=="done"&&<button type="button" className="science-reset" disabled={locked} onClick={()=>dispatch({type:"reset"})}>Restart this investigation</button>}
 </>;
}
