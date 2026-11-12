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
import ScienceRound from "../../../../../components/challenge/ScienceRound";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import { useProcessEnquiry } from "../../../../../hooks/useProcessEnquiry.js";
import { SOURCES, GLOSS, buildFossilQuestions, isFossilRecordCorrect, isFossilOrderCorrect } from "../../../../../data/challenges/science/howFossilsForm.js";
const TITLES=["Fossils: clues to the past","Compare fossil clues","Order a fossil story","Explain how a fossil formed"];
function Picture({question,stage}){return <FossilPicture kind={question.account.kind} phase={stage.phase} description={stage.text}/>;}
function Source({question}){return <p className="science-source">{SOURCES[question.account.source].label}. This is a simple drawn story, not a photo.</p>;}
export default function HowFossilsFormGame({level,onComplete}){
 const questions=useMemo(()=>buildFossilQuestions(level,Math.random),[level]);
 return <ChallengeShell wide title={TITLES[level-1]} questions={questions} onComplete={onComplete} render={({question,submit,locked,index,misses, feedback }) => {const Round=level===4?Investigation:ShortRound;return <Round key={index} question={question} submit={submit} locked={locked} hint={misses>=2} feedback={feedback}/>;}}/>;
}
function ShortRound({ question, submit, locked, hint, feedback }) {
 const [selected,setSelected]=useState(null),[record,setRecord]=useState({}),[placed,setPlaced]=useState([]);const accepted=useRef(false);
 const prompt=question.level===1?question.prompt:question.level===2?"Sort the claims. Does the fossil story agree with each one?":question.prompt;
 const ready=question.level===1?selected!==null:question.level===2?Object.keys(record).length===3:placed.length===4;
 const cards=question.level===3?question.pictureCards:question.level===1?question.stages.filter(s=>s.phase===question.phase):question.stages;
 function check(){if(locked||accepted.current||!ready)return;const correct=question.level===1?selected===question.answer:question.level===2?isFossilRecordCorrect(question,record):isFossilOrderCorrect(question,placed);if(correct)accepted.current=true;submit(correct);}
 return <ScienceRound
 prompt={<p className="challenge-prompt">{prompt}</p>} speak={`${cards.map(s=>s.text).join(" ")} ${prompt}`} speakLabel="Hear the question" gloss={GLOSS}
 figure={<><div className="science-life-cards">{cards.map(s=><section key={s.id}><h4>{question.level===3?`Picture ${s.letter}`:s.label}</h4><Picture question={question} stage={s}/></section>)}</div><Source question={question}/></>}
 answerLabel={question.level===3?"Tap the four pictures in order, first to last. Tap a picture to take it back.":undefined}
 hint={hint&&<HintNote>{question.level===1?"Read the picture caption. Look for burial, what was kept, or what was uncovered.":question.level===2?"Match each claim to the story. A fossil is what is left of something that lived. It is not alive. Burial does not always make a fossil.":"Start with life. Then follow the remains into the sediment and rock. The rock on top wears away last."}</HintNote>}
 check={{label:"Check",disabled:locked||!ready,onClick:check}} feedback={feedback}>
 {question.level===1&&<ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={value=>{if(!locked&&!accepted.current)setSelected(value);}}/>}
 {question.level===2&&<SortBins cards={question.recordCards} bins={question.recordBins} placement={record} disabled={locked} onPlace={(id,bin)=>{if(locked||accepted.current)return;setRecord(prev=>{const next={...prev};if(bin===null)delete next[id];else next[id]=bin;return next;});}}/>}
 {question.level===3&&<TileBuilder tiles={question.tiles} placed={placed} label="Your story" disabled={locked} onChange={update=>{if(!locked&&!accepted.current)setPlaced(prev=>update(prev));}}/>}
 </ScienceRound>;
}
function Investigation({ question, submit, locked, hint, feedback }) {
 const {state,dispatch,updateConclusion}=useProcessEnquiry({question,validateRecord:isFossilRecordCorrect,submit,locked});const {stage}=state;
 const current=state.seen.includes(state.observation)?question.stages[state.observation]:null;
 const hints={prediction:"A prediction is a guess before you look. Any guess is fine.",observe:"Read all four cards. Look for what was buried and what was kept.",record:"Use the card about what was kept to check one claim. A fossil is not alive. Burial does not always make a fossil.",conclusion:"Link burial to what was kept in the rock, then to the rock wearing away. Finding a fossil does not make it."};
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
 {stage==="prediction"&&<><p>What do you think will be left after burial? There is no wrong answer.</p><ChoiceGrid options={question.predictionOptions} selected={state.prediction} disabled={locked} variant="wordy" onSelect={value=>dispatch({type:"predict",value})}/></>}
 {["observe","record","conclusion"].includes(stage)&&<ObservationSequence stages={question.stages} index={state.observation} seen={state.seen} disabled={locked} label="Fossil story cards" nextLabel="Read next card" onView={index=>dispatch({type:"view",index})} onNext={stage==="observe"?()=>dispatch({type:"next"}):null} renderObservation={s=><><ScienceInformationCard title={s.label} text={s.text} sourceLabel={SOURCES[question.account.source].label}/><Picture question={question} stage={s}/></>}/>}
 {stage==="record"&&<><p>Sort both claims. Use the fossil story.</p><SortBins cards={question.recordCards} bins={question.recordBins} placement={state.record} disabled={locked} onPlace={(id,bin)=>dispatch({type:"record",id,bin})}/></>}
 {stage==="conclusion"&&<><p>Choose the ending that tells the whole story.</p><TileBuilder tiles={question.tiles} placed={state.conclusion} label="Your ending" disabled={locked} onChange={updateConclusion}/></>}
 </ScienceRound>;
}
