import { useMemo, useState } from 'react';
import BarChart from '../../../../../components/challenge/BarChart';
import ChallengeShell from '../../../../../components/challenge/ChallengeShell';
import { DataRound } from '../../../../../components/challenge/data/DataChallenge';
import { buildYear4Math, TITLES } from '../../../../../data/challenges/year4Math/questions';
import { isYear4MathCorrect } from '../../../../../data/challenges/year4Math/answers';
import { isCorrect } from '../../../../../data/challenges/questionKinds';
import Year4MathVisual from './Year4MathVisual';
import './Year4Math.css';

export default function Year4MathGame({ topic, level, onComplete }) {
  const questions = useMemo(() => buildYear4Math(topic, level, Math.random), [topic, level]);
  return <ChallengeShell title={TITLES[level-1]} questions={questions} onComplete={onComplete}
    render={({ question, index, submit, locked, misses }) => question.interaction
      ? question.interaction==='chartBuild'
        ? <ChartBuildRound key={index} question={question} submit={submit} locked={locked} />
        : <SpatialRound key={index} question={question} submit={submit} locked={locked} hint={misses>=2} />
      : <DataRound checkAnswer={isYear4MathCorrect} key={index} question={question} submit={submit} locked={locked} hint={misses>=2} renderVisual={q => <Year4MathVisual question={q} />} />
    } />;
}

function SpatialRound({ question:q, submit, locked, hint }) {
  const [selected,setSelected] = useState(null);
  const [coloured,setColoured] = useState({});
  const reflecting = q.interaction==='reflection';
  const response = reflecting ? Object.fromEntries(q.cards.map(card=>[card.id,coloured[card.label]?'Coloured':'Empty'])) : selected;
  return <>
    {q.rule && <p className="challenge-prompt">{q.rule}</p>}
    <p className="challenge-prompt">{q.prompt}</p>
    {hint && <p className="year4-hint">{q.hint ?? (reflecting ? 'Count the squares to the mirror line, then count the same distance on the other side.' : 'Read x across first, then y up. Count from the numbered axes.')}</p>}
    <Year4MathVisual question={q} selected={selected} onPoint={setSelected} coloured={coloured}
      onSquare={id=>setColoured(prev=>({...prev,[id]:!prev[id]}))} disabled={locked} />
    <button type="button" className="submit-btn" disabled={locked || (reflecting ? !Object.values(coloured).some(Boolean) : selected===null)}
      onClick={()=>submit(isCorrect(q,response))}>Check my answer</button>
  </>;
}

function ChartBuildRound({ question:q, submit, locked }) {
  const [counts,setCounts] = useState(() => Object.fromEntries(q.chart.rows.map(row=>[row.label,0])));
  const max=Math.max(...q.chart.rows.map(row=>row.value))+q.chart.step;
  const response=Object.fromEntries(q.cards.map(card=>[card.id,String(counts[card.label])]));
  return <>
    <p className="challenge-prompt">{q.prompt}</p>
    <Year4MathVisual question={q} />
    <BarChart bars={q.chart.rows.map(row=>({...row,value:counts[row.label]}))} step={q.chart.step} max={max} unit="visitors"
      label="Build the visitor chart" disabled={locked}
      onStep={(label,delta)=>setCounts(prev=>({...prev,[label]:Math.max(0,Math.min(max,prev[label]+delta*q.chart.step))}))} />
    <button type="button" className="submit-btn" disabled={locked} onClick={()=>submit(isCorrect(q,response))}>Check my answer</button>
  </>;
}
