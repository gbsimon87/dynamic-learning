import { useEffect, useReducer, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { editionLabel, editionPath, isPublishedEdition, latestFriday, publishedFridays } from '../../../../shared/familyFridaySchedule.js';
import { familyFridayEdition } from '../../../data/familyFriday.js';
import { useFamilyFridayDay } from '../../../hooks/useFamilyFridayDay.js';
import SpeakButton from '../../../components/challenge/SpeakButton.jsx';
import Mascot from '../../../components/mascot/Mascot.jsx';
import '../../../components/familyFriday/FamilyFriday.css';

const INITIAL = { phase: 'intro', index: 0, answers: [] };
// Choices stay editable until the single final submission. Guard navigation by
// its originating index so repeated taps cannot skip a question or submit twice.
function reducer(state, action) {
  if (action.type === 'start' && state.phase === 'intro') return { ...state, phase: 'question' };
  if (action.type === 'answer' && state.phase === 'question' && state.index === action.index) {
    const answers = [...state.answers];
    answers[state.index] = action.value;
    return { ...state, answers };
  }
  if (state.phase !== 'question' || state.index !== action.index) return state;
  if (action.type === 'next' && state.index < 4 && state.answers[state.index] !== undefined) {
    return { ...state, index: state.index + 1 };
  }
  if (action.type === 'previous' && state.index > 0) return { ...state, index: state.index - 1 };
  if (action.type === 'submit' && state.index === 4 && state.answers.length === 5 && state.answers.every(value => typeof value === 'string')) return { ...state, phase: 'results' };
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
  const { index, answers, phase } = state;
  const question = edition.questions[index];
  const selected = answers[index];
  const score = answers.reduce((total, value, i) => total + Number(value === edition.questions[i].answer), 0);

  useEffect(() => {
    focus.current?.focus();
  }, [phase, index]);

  if (phase === 'intro') return <section className="ff-panel ff-intro" aria-labelledby="ff-intro-heading">
    <div className="ff-intro-mascot"><Mascot decorative /></div>
    <div>
      <p className="ff-eyebrow">Edition {edition.number} · {editionLabel(edition.week)}</p>
      <h2 id="ff-intro-heading" ref={focus} tabIndex={-1}>{edition.title}</h2>
      <p>Grab a grown-up, a sibling or your favourite quiz buddy.</p>
      <p>Five little questions. Three choices each. Talk it over and pick your answer together.</p>
      <p>You can go back and change your choices. Submit all five to see the answers and your score.</p>
      {edition.questions.some(item => item.curriculum) && <p>A mix from Years 1–6, with something for little thinkers and grown-ups to tackle together.</p>}
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
    <details className="ff-review" open>
      <summary>
        <span className="ff-review-book" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M16 9C12 6 7 6 3 7v18c5-1 9-1 13 2 4-3 8-3 13-2V7c-4-1-9-1-13 2Zm0 0v18M7 12h5M7 16h5M20 12h5M20 16h5" /></svg></span>
        <span className="ff-review-summary-copy"><span className="ff-review-title">Look back at the answers</span><span className="ff-review-subtitle">Five little discoveries to share together</span></span>
        <svg className="ff-review-chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      </summary>
      <p className="ff-review-welcome">Some you knew, some you discovered. That’s what makes a great quiz team!</p>
      <ol className="ff-review-cards" role="list" aria-label="Your family’s quiz discoveries">{edition.questions.map((item, i) => {
        const matched = answers[i] === item.answer;
        return <li key={item.id} className="ff-review-card">
          <div className="ff-review-card-top">
            <span className="ff-review-number" aria-label={`Question ${i + 1}`}>{i + 1}</span>
            <span className="ff-review-category">{item.category}</span>
            <span className={`ff-review-badge ${matched ? 'is-match' : ''}`}><span aria-hidden="true">{matched ? '✓' : '✦'}</span> {matched ? 'You got it!' : 'A new discovery'}</span>
          </div>
          <h3>{item.prompt}</h3>
          {item.picture && <Picture picture={item.picture} />}
          <dl className="ff-review-picks">
            <div className={`ff-review-pick ${matched ? 'is-match' : ''}`}><dt>Your family’s pick</dt><dd>{answers[i]}</dd></div>
            {!matched && <div className="ff-review-pick is-match"><dt>The answer is</dt><dd>{item.answer}</dd></div>}
          </dl>
          <div className="ff-review-discovery"><p className="ff-review-discovery-label">A little discovery</p><p>{item.explanation}</p></div>
          <div className="ff-review-tools">
            <SpeakButton text={`The answer is ${item.answer}. ${item.explanation}`} label={`Hear answer ${i + 1}`} />
            {item.source && <a href={item.source} target="_blank" rel="noreferrer">Explore together <span aria-hidden="true">↗</span><span className="ff-sr-only"> (opens a new tab)</span></a>}
          </div>
        </li>;
      })}</ol>
      <div className="ff-review-chat"><span aria-hidden="true">✦</span><div><h3>One more thing to chat about…</h3><p>Which discovery would you tell someone about?</p></div></div>
    </details>
    <p className="ff-small">Another quiz arrives on Friday. Past editions are below whenever you fancy one.</p>
  </section>;

  const spokenChoices = question.options.map(option => ({ '?': 'question mark', '!': 'exclamation mark', '.': 'full stop' })[option] ?? option);
  const speech = `${question.prompt} Your choices are: ${spokenChoices.join('. ')}.${question.picture ? ` ${question.picture.description}` : ''}`;
  return <section className="ff-panel ff-question" aria-labelledby="ff-question-heading">
    <div className="ff-question-top"><p className="ff-eyebrow">{question.category}</p><span>Question {index + 1} of 5</span></div>
    <ol className="ff-progress" aria-label="Quiz progress">{edition.questions.map((item, i) => <li key={item.id} className={answers[i] !== undefined || i === index ? 'is-current' : ''} aria-current={i === index ? 'step' : undefined}><span className="ff-sr-only">Question </span>{i + 1}</li>)}</ol>
    <div className="ff-prompt-row"><h2 id="ff-question-heading" ref={focus} tabIndex={-1}>{question.prompt}</h2><SpeakButton text={speech} label="Hear the question and choices" compact /></div>
    {question.picture && <Picture picture={question.picture} />}
    <p className="ff-small">Have a chat. You can change your choice until you submit the quiz.</p>
    <div className="ff-options" role="group" aria-label="Choose your family’s answer">
      {question.options.map((option, i) => <button key={option} type="button" aria-pressed={selected === option}
        className={`ff-option ${selected === option ? 'is-chosen' : ''}`}
        onClick={() => dispatch({ type: 'answer', index, value: option })}><span className="ff-option-letter" aria-hidden="true">{'ABC'[i]}</span><span>{option}</span></button>)}
    </div>
    <div className="ff-answer-actions">
      <button type="button" className="ff-button ff-button-secondary" disabled={index === 0} onClick={() => dispatch({ type: 'previous', index })}>Previous question</button>
      <button type="button" className="ff-button" disabled={selected === undefined} onClick={() => dispatch({ type: index === 4 ? 'submit' : 'next', index })}>{index === 4 ? 'Submit quiz' : 'Next question'} <span aria-hidden="true">→</span></button>
    </div>
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
