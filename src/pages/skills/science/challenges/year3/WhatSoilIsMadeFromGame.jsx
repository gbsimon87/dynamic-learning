import { useMemo, useRef, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import DiagramLabelBoard from "../../../../../components/challenge/DiagramLabelBoard";
import SoilCompositionFigure from "../../../../../components/challenge/SoilCompositionFigure";
import SoilIllustration from "../../../../../components/challenge/SoilIllustration";
import { isIllustrated } from "../../../../../data/scienceDiagrams";

// The illustrated diagram, or the original hand-built one (scienceDiagrams.js).
const SoilPicture = isIllustrated() ? SoilIllustration : SoilCompositionFigure;
import HintNote from "../../../../../components/challenge/HintNote";
import ObservationSequence from "../../../../../components/challenge/ObservationSequence";
import ScienceInformationCard from "../../../../../components/challenge/ScienceInformationCard";
import SortBins from "../../../../../components/challenge/SortBins";
import ScienceRound from "../../../../../components/challenge/ScienceRound";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import { placeDiagramLabel } from "../../../../../data/diagramPlacement.js";
import { useProcessEnquiry } from "../../../../../hooks/useProcessEnquiry.js";
import { SOURCES,GLOSS,soilFeatures,buildSoilQuestions,isSoilRecordCorrect,isSoilLabelsCorrect } from "../../../../../data/challenges/science/whatSoilIsMadeFrom.js";
const TITLES=["Find the parts of soil","Sort what soil is made from","Label the parts of soil","Investigate a soil mixture"];
function Picture({question,stage}){return <SoilPicture sampleId={question.sample.id} features={stage?soilFeatures(question.sample,stage.variant).filter(c=>stage.id!=="inspect"||["mineral","organic"].includes(c.id)):question.features}/>;}
function Source(){return <p className="science-source">{SOURCES.bsss.label}. These are example notes and drawings, not a real test.</p>;}
export default function WhatSoilIsMadeFromGame({level,onComplete}){
 const questions=useMemo(()=>buildSoilQuestions(level,Math.random),[level]);
 return <ChallengeShell wide title={TITLES[level-1]} questions={questions} onComplete={onComplete} render={({question,submit,locked,index,misses,feedback})=>{const Round=level===4?Investigation:ShortRound;return <Round key={index} question={question} submit={submit} locked={locked} hint={misses>=2} feedback={feedback}/>;}}/>;
}
function ShortRound({question,submit,locked,hint,feedback}){
 const [selected,setSelected]=useState(null),[record,setRecord]=useState({}),[placement,setPlacement]=useState({});const accepted=useRef(false);
 const prompt=question.level===1?`${question.prompt} ${question.features.find(c=>c.id===question.component).letter}?`:question.level===2?"Sort these two bits of soil. Did they come from rock or from once-living things?":"Use the notes to label the four parts of the soil.";
 const ready=question.level===1?selected!==null:question.level===2?Object.keys(record).length===2:Object.keys(placement).length===4;
 function check(){if(locked||accepted.current||!ready)return;const correct=question.level===1?selected===question.answer:question.level===2?isSoilRecordCorrect(question,record):isSoilLabelsCorrect(question,placement);if(correct)accepted.current=true;submit(correct);}
 return <ScienceRound
 prompt={<p className="challenge-prompt">{prompt}</p>} speak={`${question.features.map(c=>`${c.letter}: ${c.text}`).join(". ")}. ${prompt}`} speakLabel="Hear the question" gloss={GLOSS}
 figure={<><Picture question={question}/><Source/></>}
 hint={hint&&<HintNote>Read where each part came from: rock, or something that was once alive. Air is a gas and water is a liquid. They fill the spaces between the particles.</HintNote>}
 check={{label:"Check",disabled:locked||!ready,onClick:check}} feedback={feedback}>
 {question.level===3&&<DiagramLabelBoard targets={question.targets} labels={question.labels} placement={placement} label="Soil labels" disabled={locked} onPlace={(id,target)=>{if(!locked&&!accepted.current)setPlacement(prev=>placeDiagramLabel(prev,id,target,question.labels,question.targets));}}/>}
 {question.level===1&&<ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={value=>{if(!locked&&!accepted.current)setSelected(value);}}/>}
 {question.level===2&&<SortBins cards={question.recordCards} bins={question.recordBins} placement={record} disabled={locked} onPlace={(id,bin)=>{if(locked||accepted.current)return;setRecord(prev=>{const next={...prev};if(bin===null)delete next[id];else next[id]=bin;return next;});}}/>}
 </ScienceRound>;
}
function Investigation({question,submit,locked,hint,feedback}){
 const {state,dispatch,updateConclusion}=useProcessEnquiry({question,validateRecord:isSoilRecordCorrect,submit,locked});const {stage}=state;
 const current=state.seen.includes(state.observation)?question.stages[state.observation]:null;
 const hints={prediction:"A prediction is a guess before you look. Any guess is fine.",observe:"Read all three cards. Find the solid parts and the spaces between them.",record:"Use the notes to tell rock particles from once-living remains. One sample cannot tell us the exact amounts in every soil.",conclusion:"Join each part to where it came from. Include air and water in the spaces."};
 const action=stage==="prediction"?{label:"Read the cards",disabled:locked||!state.prediction,onClick:()=>dispatch({type:"start"})}
 :stage==="observe"?(state.seen.length===question.stages.length?{label:"Check the claims",disabled:locked,onClick:()=>dispatch({type:"recordStage"})}:null)
 :stage==="record"?{label:"Check my sort",disabled:locked||Object.keys(state.record).length!==2,onClick:()=>dispatch({type:"checkRecord"},true)}
 : stage === "done" ? null
 : { label: "Check my ending",disabled:locked||state.conclusion.length!==1,onClick:()=>dispatch({type:"finish"},true)};
 return <ScienceRound
 prompt={<p className="challenge-prompt">{question.title}</p>} speak={`${question.setup} ${current?.text??""} ${hints[stage]??""}`} speakLabel="Hear this stage" gloss={GLOSS}
 evidence={<><p>{question.setup}</p><Source question={question}/></>}
 hint={hint&&stage!=="done"&&<HintNote>{hints[stage]}</HintNote>}
 check={action} feedback={feedback}
 secondary={stage!=="prediction"&&stage!=="done"&&<button type="button" className="science-reset" disabled={locked} onClick={()=>dispatch({type:"reset"})}>Start again</button>}>
 <p role="status">Stage: {stage==="prediction"?"Predict":stage==="observe"?"Read cards":stage==="record"?"Check claims":"Explain"}</p>
 {stage==="prediction"&&<><p>What do you think is in this soil? There is no wrong answer.</p><ChoiceGrid options={question.predictionOptions} selected={state.prediction} disabled={locked} variant="wordy" onSelect={value=>dispatch({type:"predict",value})}/></>}
 {["observe","record","conclusion"].includes(stage)&&<ObservationSequence stages={question.stages} index={state.observation} seen={state.seen} disabled={locked} label="Soil cards" nextLabel="Read next card" onView={index=>dispatch({type:"view",index})} onNext={stage==="observe"?()=>dispatch({type:"next"}):null} renderObservation={s=><><ScienceInformationCard title={s.label} text={s.text} sourceLabel={SOURCES[question.account.source].label}/><Picture question={question} stage={s}/></>}/>}
 {stage==="record"&&<><p>Sort both claims. Use the notes.</p><SortBins cards={question.recordCards} bins={question.recordBins} placement={state.record} disabled={locked} onPlace={(id,bin)=>dispatch({type:"record",id,bin})}/></>}
 {stage==="conclusion"&&<><p>Choose the ending that matches the soil notes.</p><TileBuilder tiles={question.tiles} placed={state.conclusion} label="Your ending" disabled={locked} onChange={updateConclusion}/></>}
 </ScienceRound>;
}
