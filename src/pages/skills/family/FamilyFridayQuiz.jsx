import { useEffect, useReducer, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { editionLabel, editionPath, isPublishedEdition, latestFriday, publishedFridays } from '../../../../shared/familyFridaySchedule.js';
import { familyFridayEdition } from '../../../data/familyFriday.js';
import { useFamilyFridayDay } from '../../../hooks/useFamilyFridayDay.js';
import { useAnswerFeedback } from '../../../components/skills/useAnswerFeedback.js';
import SpeakButton from '../../../components/challenge/SpeakButton.jsx';
import Mascot from '../../../components/mascot/Mascot.jsx';
import '../../../components/familyFriday/FamilyFriday.css';

const INITIAL = { phase: 'intro', index: 0, answers: [] };
// The endless FreePlayShell retries misses. This finite family quiz deliberately
// reveals each answer once and ends after five, keeping its own guarded loop.
function reducer(state, action) {
  if (action.type === 'start' && state.phase === 'intro') return { ...state, phase: 'question' };
  if (action.type === 'answer' && state.phase === 'question' && state.index === action.index && state.answers.length === state.index) {
    return { ...state, answers: [...state.answers, action.value] };
  }
  if (action.type === 'next' && state.phase === 'question' && state.index === action.index && state.answers.length === state.index + 1) {
    return state.index === 4 ? { ...state, phase: 'results' } : { ...state, index: state.index + 1 };
  }
  return state;
}

function Picture({ picture }) {
  return (
    <svg className="ff-picture" viewBox="0 0 400 150" role="img" aria-label={picture.description}>
      {picture.items.map((shape, index) => {
        const x = 45 + (index % 5) * 76;
        const y = 38 + Math.floor(index / 5) * 76;
        return <g key={index} transform={`translate(${x} ${y})`} className={`ff-shape ff-shape-${shape}`}>
          {shape === 'star' ? <path d="M0 -24 7 -8 24 -7 12 5 15 23 0 14 -15 23 -12 5 -24 -7 -7 -8Z" />
            : shape === 'circle' ? <circle r="23" /> : <path d="M0 -25 26 22 -26 22Z" />}
        </g>;
      })}
    </svg>
  );
}

function ShareQuiz({ edition, score }) {
  const [message, setMessage] = useState('');
  const [manual, setManual] = useState(false);
  const input = useRef(null);
  const mounted = useRef(true);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
  useEffect(() => { if (manual) { input.current?.focus(); input.current?.select(); } }, [manual]);
  const url = new URL(editionPath(edition.week), window.location.origin).href;
  const share = async () => {
    try {
      if (typeof navigator.share === 'function') {
        await navigator.share({ title: 'Family Friday Quiz', text: `We got ${score} out of 5! Try this Family Friday Quiz together.`, url });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        if (mounted.current) setMessage('Quiz link copied. Share it with another family!');
      } else if (mounted.current) setManual(true);
    } catch (error) {
      if (error.name !== 'AbortError' && mounted.current) {
        setManual(true);
        setMessage('You can copy the quiz link below.');
      }
    }
  };
  return <div className="ff-share">
    <button type="button" className="ff-button ff-button-secondary" onClick={share}>Share this quiz</button>
    <p role="status">{message}</p>
    {manual && <label className="ff-share-link">Quiz link<input ref={input} readOnly value={url} onFocus={event => event.target.select()} /></label>}
  </div>;
}

function QuizRun({ edition, onReplay }) {
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const focus = useRef(null);
  const answered = useRef(-1);
  const nextButton = useRef(null);
  const fb = useAnswerFeedback();
  const { index, answers, phase } = state;
  const question = edition.questions[index];
  const selected = answers[index];
  const correct = selected === question.answer;
  const score = answers.reduce((total, value, i) => total + Number(value === edition.questions[i].answer), 0);

  useEffect(() => {
    focus.current?.focus();
  }, [phase, index]);
  useEffect(() => {
    if (selected !== undefined) nextButton.current?.focus();
  }, [selected]);

  if (phase === 'intro') return <section className="ff-panel ff-intro" aria-labelledby="ff-intro-heading">
    <div className="ff-intro-mascot"><Mascot decorative /></div>
    <div>
      <p className="ff-eyebrow">Edition {edition.number} · {editionLabel(edition.week)}</p>
      <h2 id="ff-intro-heading" ref={focus} tabIndex={-1}>{edition.title}</h2>
      <p>Grab a grown-up, a sibling or your favourite quiz buddy.</p>
      <p>Five little questions. Three choices each. Talk it over and pick your answer together.</p>
      <div className="ff-tags"><span>5 minutes or less</span><span>One team, one score</span></div>
      <button type="button" className="ff-button" onClick={() => dispatch({ type: 'start' })}>Start the quiz <span aria-hidden="true">→</span></button>
      <p className="ff-small">Take your time — there’s no timer.</p>
    </div>
  </section>;

  if (phase === 'results') return <section className="ff-panel ff-results" aria-labelledby="ff-results-heading">
    <div className="ff-result-mascot"><Mascot decorative cheerOn={edition.week} /></div>
    <p className="ff-eyebrow">A little Friday discovery, together</p>
    <h2 id="ff-results-heading" ref={focus} tabIndex={-1}>You make a curious crew!</h2>
    <p className="ff-score" aria-label={`Your family scored ${score} out of 5`}>{score}<span> / 5</span></p>
    <p>{score === 5 ? 'Five out of five! What a team.' : 'Every answer was a chance to discover something new.'}</p>
    <div className="ff-actions">
      <button type="button" className="ff-button" onClick={onReplay}>Play this quiz again</button>
      <ShareQuiz edition={edition} score={score} />
    </div>
    <details className="ff-review">
      <summary>Look back at the answers</summary>
      <ol>{edition.questions.map((item, i) => <li key={item.id}>
        <h3>{item.prompt}</h3>
        <p>Your answer: {answers[i]} {answers[i] === item.answer ? '✓' : ''}</p>
        <p><strong>{item.answer}.</strong> {item.explanation}</p>
        {item.source && <a href={item.source} target="_blank" rel="noreferrer">Explore the source <span className="ff-small">(opens a new tab)</span></a>}
      </li>)}</ol>
    </details>
    <p className="ff-small">Another quiz arrives on Friday. Past editions are below whenever you fancy one.</p>
  </section>;

  const spokenChoices = question.options.map(option => ({ '?': 'question mark', '!': 'exclamation mark', '.': 'full stop' })[option] ?? option);
  const speech = `${question.prompt} Your choices are: ${spokenChoices.join('. ')}.${question.picture ? ` ${question.picture.description}` : ''}`;
  return <section className="ff-panel ff-question" aria-labelledby="ff-question-heading">
    <div className="ff-question-top"><p className="ff-eyebrow">{question.category}</p><span>Question {index + 1} of 5</span></div>
    <ol className="ff-progress" aria-label="Quiz progress">{edition.questions.map((item, i) => <li key={item.id} className={i <= index ? 'is-current' : ''} aria-current={i === index ? 'step' : undefined}><span className="ff-sr-only">Question </span>{i + 1}</li>)}</ol>
    <div className="ff-prompt-row"><h2 id="ff-question-heading" ref={focus} tabIndex={-1}>{question.prompt}</h2><SpeakButton text={speech} label="Hear the question and choices" compact /></div>
    {question.picture && <Picture picture={question.picture} />}
    <p className="ff-small">Have a chat. Choose one answer together.</p>
    <div className="ff-options" ref={fb.answerRef} role="group" aria-label="Choose your family’s answer">
      {question.options.map((option, i) => <button key={option} type="button" disabled={selected !== undefined}
        className={`ff-option ${selected !== undefined && option === question.answer ? 'is-correct' : ''} ${selected === option && !correct ? 'is-chosen' : ''}`}
        onClick={() => {
          if (answered.current === index) return;
          answered.current = index;
          dispatch({ type: 'answer', index, value: option });
          fb.answer(option === question.answer);
        }}><span className="ff-option-letter" aria-hidden="true">{'ABC'[i]}</span><span>{option}</span>{selected !== undefined && option === question.answer && <span className="ff-option-mark">✓<span className="ff-sr-only"> Correct answer</span></span>}</button>)}
    </div>
    <div className="ff-answer" role="status" aria-live="polite" ref={fb.feedbackRef}>
      {selected !== undefined && <>
        <p className="ff-answer-title">{correct ? 'You got it!' : `Now we know! The answer is ${question.answer}.`}</p>
        <p>{question.explanation}</p>
      </>}
    </div>
    {selected !== undefined && <div className="ff-answer-actions">
      <SpeakButton text={question.explanation} label="Hear why" />
      <button ref={nextButton} type="button" className="ff-button" onClick={() => { fb.clear(); dispatch({ type: 'next', index }); }}>{index === 4 ? 'See our score' : 'Next question'} <span aria-hidden="true">→</span></button>
    </div>}
  </section>;
}

export default function FamilyFridayQuiz() {
  const day = useFamilyFridayDay();
  const [params] = useSearchParams();
  const [attempt, setAttempt] = useState(0);
  const [limit, setLimit] = useState(8);
  // Freeze the chosen edition for an active run, even if midnight passes.
  const [openedAt] = useState(() => new Date());
  const currentNow = day ? new Date(`${day}T12:00:00Z`) : openedAt;
  const latest = latestFriday(currentNow);
  const requested = params.get('week');
  const week = requested ?? latestFriday(openedAt);
  const valid = week && isPublishedEdition(week, currentNow);
  const edition = valid ? familyFridayEdition(week) : null;
  const archive = publishedFridays(currentNow, limit);
  const hasMore = publishedFridays(currentNow, limit + 1).length > archive.length;
  return <div className="ff-theme family-friday-page">
    <header className="ff-page-heading"><p className="ff-eyebrow">A little tradition for your whole crew</p><h1>Family Friday Quiz</h1><p>Five questions. Five minutes or less. Discover together.</p></header>
    {edition ? <QuizRun key={`${week}-${attempt}`} edition={edition} onReplay={() => setAttempt(value => value + 1)} />
      : <section className="ff-panel"><h2>{latest ? 'That quiz isn’t available' : 'Our first quiz is on its way'}</h2><p>{latest ? 'Choose a published Friday quiz below.' : 'The first Family Friday Quiz arrives on 13 November 2026.'}</p>{latest && <Link className="ff-button" to={editionPath(latest)}>Play the latest quiz</Link>}</section>}
    {archive.length > 0 && <section className="ff-archive" aria-labelledby="ff-archive-heading"><h2 id="ff-archive-heading">More Fridays, more discoveries</h2><p>Missed a Friday? Every published quiz is here to play any day.</p><div className="ff-archive-links">{archive.map(date => <Link key={date} to={editionPath(date)} aria-current={date === week ? 'page' : undefined}>{editionLabel(date)}<span aria-hidden="true">→</span></Link>)}</div>{hasMore && <button className="ff-button ff-button-secondary" onClick={() => setLimit(value => value + 8)}>Show earlier quizzes</button>}</section>}
  </div>;
}
