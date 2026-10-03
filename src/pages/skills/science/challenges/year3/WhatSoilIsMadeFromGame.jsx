import { useMemo, useRef, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import DiagramLabelBoard from "../../../../../components/challenge/DiagramLabelBoard";
import SoilCompositionFigure from "../../../../../components/challenge/SoilCompositionFigure";
import HintNote from "../../../../../components/challenge/HintNote";
import ObservationSequence from "../../../../../components/challenge/ObservationSequence";
import ScienceInformationCard from "../../../../../components/challenge/ScienceInformationCard";
import SortBins from "../../../../../components/challenge/SortBins";
import SpeakButton from "../../../../../components/challenge/SpeakButton";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import { placeDiagramLabel } from "../../../../../data/diagramPlacement.js";
import { useProcessEnquiry } from "../../../../../hooks/useProcessEnquiry.js";
import { SOURCES,GLOSS,soilFeatures,buildSoilQuestions,isSoilRecordCorrect,isSoilLabelsCorrect } from "../../../../../data/challenges/science/whatSoilIsMadeFrom.js";
const TITLES=["Find soil components","Sort soil materials","Label a soil model","Investigate a soil mixture"];
function Vocabulary(){return <details className="science-gloss"><summary>Science words</summary><p>{GLOSS}</p></details>;}
function Picture({question,stage}){return <SoilCompositionFigure sampleId={question.sample.id} features={stage?soilFeatures(question.sample,stage.variant).filter(c=>stage.id!=="inspect"||["mineral","organic"].includes(c.id)):question.features}/>;}
function Source(){return <p className="science-gloss">{SOURCES.bsss.label}. Supplied specimen notes and local models; no live experiment.</p>;}
export default function WhatSoilIsMadeFromGame({level,onComplete}){
 const questions=useMemo(()=>buildSoilQuestions(level,Math.random),[level]);
 return <ChallengeShell title={TITLES[level-1]} questions={questions} onComplete={onComplete} render={({question,submit,locked,index,misses})=>{const Round=level===4?Investigation:ShortRound;return <Round key={index} question={question} submit={submit} locked={locked} hint={misses>=2}/>;}}/>;
}
function ShortRound({question,submit,locked,hint}){
 const [selected,setSelected]=useState(null),[record,setRecord]=useState({}),[placement,setPlacement]=useState({});const accepted=useRef(false);
 const prompt=question.level===1?`${question.prompt} ${question.features.find(c=>c.id===question.component).letter}?`:question.level===2?"Sort these two solid materials by where they came from. Air and water are shown in spaces, but are not solid-material cards.":"Use the notes to label all four parts of the soil model.";
 const ready=question.level===1?selected!==null:question.level===2?Object.keys(record).length===2:Object.keys(placement).length===4;
 function check(){if(locked||accepted.current||!ready)return;const correct=question.level===1?selected===question.answer:question.level===2?isSoilRecordCorrect(question,record):isSoilLabelsCorrect(question,placement);if(correct)accepted.current=true;submit(correct);}
 return <><Vocabulary/><p className="challenge-prompt">{prompt}</p><SpeakButton text={`${prompt} ${question.features.map(c=>`${c.letter}: ${c.text}`).join(". ")}`} label="Hear the task"/>
 {question.level===3?<DiagramLabelBoard diagram={<Picture question={question}/>} targets={question.targets} labels={question.labels} placement={placement} label="Soil component labels" disabled={locked} onPlace={(id,target)=>{if(!locked&&!accepted.current)setPlacement(prev=>placeDiagramLabel(prev,id,target,question.labels,question.targets));}}/>:<Picture question={question}/>}
 <Source/>
 {question.level===1&&<ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={value=>{if(!locked&&!accepted.current)setSelected(value);}}/>}
 {question.level===2&&<SortBins cards={question.recordCards} bins={question.recordBins} placement={record} disabled={locked} onPlace={(id,bin)=>{if(locked||accepted.current)return;setRecord(prev=>{const next={...prev};if(bin===null)delete next[id];else next[id]=bin;return next;});}}/>}
 {hint&&<HintNote>Read the origin in each note: rock material or once-living remains. Air is a gas and water is a liquid in spaces between solid particles.</HintNote>}
 <button type="button" className="submit-btn" disabled={locked||!ready} onClick={check}>Check</button></>;
}
function Investigation({question,submit,locked,hint}){
 const {state,dispatch,updateConclusion}=useProcessEnquiry({question,validateRecord:isSoilRecordCorrect,submit,locked});const {stage}=state;
 const current=state.seen.includes(state.observation)?question.stages[state.observation]:null;
 const hints={prediction:"Your prediction is not graded.",observe:"Read all three observation cards. Find the solid materials and the spaces between particles.",record:"Use the notes to distinguish rock particles from once-living remains. This sample does not tell us exact amounts in every soil.",conclusion:"Connect the identified materials to their origins. Include air and water in spaces."};
 return <><Vocabulary/><p className="challenge-prompt">{question.title}</p><p>{question.setup}</p><Source question={question}/>
 <p role="status">Stage: {stage==="prediction"?"Predict":stage==="observe"?"Read sources":stage==="record"?"Check evidence":"Explain"}</p>
 <SpeakButton text={`${question.setup} ${current?.text??""} ${hints[stage]??""}`} label="Hear this stage"/>
 {stage==="prediction"&&<><p>What might this soil sample contain? Your prediction is not marked right or wrong.</p><ChoiceGrid options={question.predictionOptions} selected={state.prediction} disabled={locked} variant="wordy" onSelect={value=>dispatch({type:"predict",value})}/><button type="button" className="submit-btn" disabled={locked||!state.prediction} onClick={()=>dispatch({type:"start"})}>Inspect the sources</button></>}
 {["observe","record","conclusion"].includes(stage)&&<ObservationSequence stages={question.stages} index={state.observation} seen={state.seen} disabled={locked} label="Soil observation cards" nextLabel="Read next source card" onView={index=>dispatch({type:"view",index})} onNext={stage==="observe"?()=>dispatch({type:"next"}):null} renderObservation={s=><><ScienceInformationCard title={s.label} text={s.text} sourceLabel={SOURCES[question.account.source].label}/><Picture question={question} stage={s}/></>}/>}
 {stage==="observe"&&state.seen.length===question.stages.length&&<button type="button" className="submit-btn" disabled={locked} onClick={()=>dispatch({type:"recordStage"})}>Check the evidence</button>}
 {stage==="record"&&<><p>Sort both claims using the illustrated account.</p><SortBins cards={question.recordCards} bins={question.recordBins} placement={state.record} disabled={locked} onPlace={(id,bin)=>dispatch({type:"record",id,bin})}/><button type="button" className="submit-btn" disabled={locked||Object.keys(state.record).length!==2} onClick={()=>dispatch({type:"checkRecord"},true)}>Check claims</button></>}
 {stage==="conclusion"&&<><p>Choose one explanation that connects the evidence to soil components.</p><TileBuilder tiles={question.tiles} placed={state.conclusion} label="Your soil explanation" disabled={locked} onChange={updateConclusion}/><button type="button" className="submit-btn" disabled={locked||state.conclusion.length!==1} onClick={()=>dispatch({type:"finish"},true)}>Check explanation</button></>}
 {hint&&stage!=="done"&&<HintNote>{hints[stage]}</HintNote>}
 {stage!=="prediction"&&stage!=="done"&&<button type="button" className="science-reset" disabled={locked} onClick={()=>dispatch({type:"reset"})}>Restart this investigation</button>}
 </>;
}
