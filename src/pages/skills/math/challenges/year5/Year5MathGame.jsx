import { useMemo, useState } from 'react';
import ChallengeShell from '../../../../../components/challenge/ChallengeShell';
import ColumnAnswer from '../../../../../components/challenge/ColumnAnswer';
import HintNote from '../../../../../components/challenge/HintNote';
import { showHint } from '../../../../../components/challenge/hints';
import { DataRound } from '../../../../../components/challenge/data/DataChallenge';
import { buildYear5Math, titleFor } from '../../../../../data/challenges/year5Math/questions';
import { isYear5MathCorrect } from '../../../../../data/challenges/year5Math/answers';
import { isCorrect } from '../../../../../data/challenges/questionKinds';
import Year5MathVisual from './Year5MathVisual';
import { AngleDiagram } from './Year5Diagrams';
import '../year4/Year4Math.css';
import './Year5Math.css';

/** One Year 5 Maths challenge: five questions from the topic's bank, at the given level (1 to 4). */
export default function Year5MathGame({ topic, level, onComplete }) {
  const questions = useMemo(() => buildYear5Math(topic, level, Math.random), [topic, level]);
  return <ChallengeShell title={titleFor(topic, level)} questions={questions} onComplete={onComplete}
    render={({ question, index, submit, locked, misses }) => {
      const hint = showHint(misses);
      if (question.interaction === 'plot') return <PlotRound key={index} question={question} submit={submit} locked={locked} hint={hint} />;
      if (question.interaction === 'setAngle') return <AngleRound key={index} question={question} submit={submit} locked={locked} hint={hint} />;
      if (question.visual?.type === 'column' && question.kind === 'number') return <WrittenRound key={index} question={question} submit={submit} locked={locked} hint={hint} />;
      return <DataRound key={index} checkAnswer={isYear5MathCorrect} question={question} submit={submit} locked={locked} hint={hint} renderVisual={q => <Year5MathVisual question={q} />} illustrate />;
    }} />;
}

/** Column working with a box for each digit of the answer, entered from the ones column. */
function WrittenRound({ question: q, submit, locked, hint }) {
  const [value, setValue] = useState('');
  const v = q.visual, operation = v.op === '+' ? 'add' : v.op === '×' ? 'multiply' : 'subtract';
  const columns = Math.max(String(v.a).length, String(v.b).length, String(q.answer).length);
  return <>
    <p className="challenge-prompt">{q.prompt}</p>
    {q.rule && <p className="challenge-prompt">{q.rule}</p>}
    {hint && q.hint && <HintNote>{q.hint}</HintNote>}
    <ColumnAnswer top={v.a} bottom={v.b} operation={operation} columns={columns} onChange={setValue} disabled={locked} />
    <button type="button" className="submit-btn" disabled={locked || value === ''} onClick={() => submit(Number(value) === Number(q.answer))}>Check my answer</button>
  </>;
}

/** Tap a point on the grid. */
function PlotRound({ question: q, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  return <>
    {q.rule && <p className="challenge-prompt">{q.rule}</p>}
    <p className="challenge-prompt">{q.prompt}</p>
    {hint && q.hint && <HintNote>{q.hint}</HintNote>}
    <Year5MathVisual question={q} selected={selected} onPoint={setSelected} disabled={locked} />
    <button type="button" className="submit-btn" disabled={locked || selected === null} onClick={() => submit(isCorrect(q, selected))}>Check my answer</button>
  </>;
}

const TURNS = [-10, -5, -1, 1, 5, 10];
/** Draw an angle: turn the arm on a protractor in steps until it points at the right mark. */
function AngleRound({ question: q, submit, locked, hint }) {
  const [angle, setAngle] = useState(0);
  const turn = by => setAngle(prev => Math.max(0, Math.min(180, prev + by)));
  return <>
    {q.rule && <p className="challenge-prompt">{q.rule}</p>}
    <p className="challenge-prompt">{q.prompt}</p>
    {hint && q.hint && <HintNote>{q.hint}</HintNote>}
    <AngleDiagram degrees={angle} from={q.from} protractor label="A protractor with an arm that you turn" />
    <p className="year5-visually-hidden" aria-live="polite">The arm is turned {angle} degrees.</p>
    <div className="year5-angle-controls" role="group" aria-label="Turn the arm">
      {TURNS.map(by => <button key={by} type="button" disabled={locked} aria-label={`Turn the arm ${by < 0 ? 'back' : 'on'} ${Math.abs(by)} degrees`} onClick={() => turn(by)}>{by < 0 ? '−' : '+'}{Math.abs(by)}°</button>)}
    </div>
    <button type="button" className="submit-btn" disabled={locked} onClick={() => submit(isCorrect(q, String(angle)))}>Check my answer</button>
  </>;
}
