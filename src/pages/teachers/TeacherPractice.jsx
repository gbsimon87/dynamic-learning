import { useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import TeacherWorkspace, { TeacherHeader } from "./TeacherWorkspace";
import { Icon } from "./TeacherIcons";
import PracticePaper, { PracticeAnswer, PracticeModel } from "./PracticePaper";
import { getLesson } from "../../data/lessons";
import LessonExample from "../../components/challenge/lesson/LessonExample";
import { PRACTICE_YEARS, practiceTopics, practiceSubjects, practiceTopic, practiceKey, searchPracticeTopics, createPracticeQuestions, replacePracticeQuestion, paginatePractice, paginatePracticeAnswers } from "../../data/teacherPractice";
import "../../components/challenge/lesson/lesson.css";
import "./TeacherTools.css";
import "./AdultResources.css";
import "./TeacherPractice.css";

const DEFAULT_TOPIC = "counting-in-multiples-of-4-8-50-and-100";

export default function TeacherPractice() {
  const [params] = useSearchParams();
  const suppliedYear = PRACTICE_YEARS.includes(Number(params.get("year"))) ? Number(params.get("year")) : 3;
  const suppliedSubject = practiceSubjects(suppliedYear).some((item) => item.id === params.get("subject")) ? params.get("subject") : "math";
  const suppliedTopic = params.get("topic") ? practiceKey(suppliedSubject, params.get("topic"), suppliedYear) : null;
  const initialTopic = practiceTopic(suppliedTopic) ? suppliedTopic : suppliedYear === 3 && suppliedSubject === "math" ? DEFAULT_TOPIC : practiceTopics(suppliedYear, suppliedSubject)[0].id;
  const [year, setYear] = useState(suppliedYear);
  const [subject, setSubject] = useState(suppliedSubject);
  const yearDrafts = useRef(new Map());
  const [topicIds, setTopicIds] = useState([initialTopic]);
  const [query, setQuery] = useState("");
  const [visibleTopics, setVisibleTopics] = useState(8);
  const [count, setCount] = useState(8);
  const [mix, setMix] = useState("mixed");
  const [questions, setQuestions] = useState(() => createPracticeQuestions({ topicIds: [initialTopic] }));
  const [title, setTitle] = useState(practiceTopic(initialTopic).name);
  const titleEdited = useRef(false);
  const [instructions, setInstructions] = useState("Work through the questions. Show your method where you can.");
  const [support, setSupport] = useState({ examples: false, vocabulary: false, showModels: false, extraSpace: false });
  const [view, setView] = useState("pupil");
  const [printMode, setPrintMode] = useState("pupil");
  const [status, setStatus] = useState("");
  const results = useMemo(() => searchPracticeTopics(query, subject, year), [query, subject, year]);
  const pages = useMemo(() => paginatePractice({ questions, ...support }), [questions, support]);
  const subjectLabel = [...new Set(questions.map((q) => practiceTopic(q.topicId).subjectName))].join(" & ") || practiceSubjects(year).find((item) => item.id === subject).name;
  const answerPages = useMemo(() => paginatePracticeAnswers(questions), [questions]);

  const rebuild = (nextTopics = topicIds, nextCount = count, nextMix = mix) => {
    const next = nextTopics.length ? createPracticeQuestions({ topicIds: nextTopics, count: nextCount, mix: nextMix }) : [];
    setQuestions(next);
    setStatus(next.length < nextCount && nextTopics.length ? `This selection has ${next.length} different questions. Choose another topic or question mix for more.` : "Sheet updated.");
  };
  const changeTopics = (next) => {
    setTopicIds(next); setQuery(""); setVisibleTopics(8); rebuild(next);
    if (!titleEdited.current) setTitle(next.length === 1 ? practiceTopic(next[0]).name : `Year ${year} practice`);
  };
  const changeYear = (nextYear) => {
    yearDrafts.current.set(year, { subject, topicIds, questions, title, titleEdited: titleEdited.current, count, mix, instructions, support, view, printMode });
    const draft = yearDrafts.current.get(nextYear);
    const nextSubject = draft?.subject ?? (practiceSubjects(nextYear).some((item) => item.id === subject) ? subject : "math");
    const first = practiceTopics(nextYear, nextSubject)[0];
    const nextTopics = draft?.topicIds ?? [first.id];
    setYear(nextYear); setSubject(nextSubject); setTopicIds(nextTopics);
    setQuestions(draft?.questions ?? createPracticeQuestions({ topicIds: nextTopics, count, mix }));
    setTitle(draft?.title ?? first.name); titleEdited.current = draft?.titleEdited ?? false;
    setCount(draft?.count ?? count); setMix(draft?.mix ?? mix);
    if (draft) { setInstructions(draft.instructions); setSupport(draft.support); setView(draft.view); setPrintMode(draft.printMode); }
    setQuery(""); setVisibleTopics(8);
    setStatus(draft ? `Your Year ${nextYear} sheet has been restored.` : `Year ${nextYear} sheet ready. Your other year's sheet is kept in this tab.`);
  };
  const move = (id, direction) => {
    const next = [...questions], from = next.findIndex((q) => q.id === id), to = from + direction;
    if (to < 0 || to >= next.length) return;
    [next[from], next[to]] = [next[to], next[from]];
    setQuestions(next); setStatus(`Question ${from + 1} moved to position ${to + 1}.`);
  };
  const replace = (id) => {
    const next = replacePracticeQuestion(questions, id, mix);
    if (next) setQuestions(next);
    setStatus(next ? "Question replaced. Other questions kept." : "All the available questions for this topic are already on the sheet.");
  };
  const toggleSupport = (key) => setSupport((current) => ({ ...current, [key]: !current[key] }));

  return <TeacherWorkspace className={`teacher-tools adult-resources teacher-practice pp-print-${printMode}`}>
    <div className="pp-screen-header"><TeacherHeader title="Practice sheet builder" context="Years 1–6 · Printable practice with separate answer keys" note="No account needed" /></div>
    <div className="pp-builder">
      <aside className="pp-setup" aria-label="Sheet settings">
        <section className="pp-settings-section"><h2>Choose your topics</h2>
          <p className="tp-quiet">Choose a year, then a subject. Mix up to three topics from the same year.</p>
          <label>Year<select value={year} onChange={(event) => changeYear(Number(event.target.value))}>{PRACTICE_YEARS.map((value) => <option key={value} value={value}>Year {value}</option>)}</select></label>
          <p className="pp-setting-hint">Switching year keeps each sheet in this tab. Subject changes keep selected topics.</p>
          <label>Subject<select value={subject} onChange={(event) => { setSubject(event.target.value); setQuery(""); setVisibleTopics(8); }}>{practiceSubjects(year).map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
          <p className="pp-setting-hint">{practiceTopics(year, subject).length} printable topics</p>
          <label className="pp-search"><span className="tt-visually-hidden">Search practice topics</span><Icon name="search" /><input type="search" value={query} maxLength={160} placeholder="Search topics, e.g. adding" onChange={(event) => { setQuery(event.target.value); setVisibleTopics(8); }} /></label>
          {results.some((result) => result.matchType === "fuzzy") && <p className="tp-hint">Did you mean one of these?</p>}
          <ul className="pp-topic-results" aria-label="Available practice topics">{results.slice(0, visibleTopics).map((topic) => <li key={topic.id}>
            <button type="button" aria-pressed={topicIds.includes(topic.id)} disabled={!topicIds.includes(topic.id) && topicIds.length === 3} onClick={() => changeTopics(topicIds.includes(topic.id) ? topicIds.filter((id) => id !== topic.id) : [...topicIds, topic.id])}>
              <Icon name={topicIds.includes(topic.id) ? "check" : "plus"} /><span>{topic.name}</span>
            </button>
          </li>)}</ul>
          {results.length > visibleTopics && <button className="tp-link" type="button" onClick={() => setVisibleTopics((n) => n + 8)}>Show {Math.min(8, results.length - visibleTopics)} more topics</button>}
          {!results.length && <p className="tp-hint" role="status">No printable topic matches “{query}”. <button className="tp-link" type="button" onClick={() => setQuery("")}>Show all topics</button></p>}
          {query && topicIds.length > 0 && <p className="pp-selected-summary">Selected: {topicIds.map((id) => practiceTopic(id).name).join("; ")}</p>}
          {topicIds.length > 0 && <ul className="pp-selected-topics" aria-label="Selected practice topics">{topicIds.map((id) => <li key={id}><span>{practiceTopic(id).name}</span><button type="button" aria-label={`Remove topic: ${practiceTopic(id).name}`} onClick={() => changeTopics(topicIds.filter((topic) => topic !== id))}><Icon name="close" /></button></li>)}</ul>}
        </section>
        <section className="pp-settings-section"><h2>Shape the sheet</h2>
          <div className="pp-setting-row"><label>Questions<select value={count} onChange={(event) => { const value = Number(event.target.value); setCount(value); rebuild(topicIds, value); }}>{[4, 8, 12, 16].map((n) => <option key={n} value={n}>{n} questions</option>)}</select></label>
            <label>Question mix<select value={mix} onChange={(event) => { setMix(event.target.value); rebuild(topicIds, count, event.target.value); }}><option value="mixed">Practice & application</option><option value="practice">Practice</option><option value="application">Apply & explain</option></select></label></div>
          <p className="pp-setting-hint">Changing topics, count or mix creates a new set.</p>
          <fieldset className="pp-support"><legend>Support & space</legend>{[["examples", "Examples & reminders"], ["vocabulary", "Vocabulary strip"], ["showModels", "Extra visual models"], ["extraSpace", "More working space"]].map(([key, label]) => <label key={key}><input type="checkbox" checked={support[key]} onChange={() => toggleSupport(key)} />{label}</label>)}</fieldset>
          <label>Sheet title<input value={title} maxLength={90} onChange={(event) => { titleEdited.current = true; setTitle(event.target.value); }} /></label>
          <label>Instructions<textarea rows={2} value={instructions} maxLength={180} onChange={(event) => setInstructions(event.target.value)} /></label>
          <button className="pp-new-set" type="button" disabled={!topicIds.length} onClick={() => rebuild()}><Icon name="sliders" />New question set</button>
          <p className="pp-unsaved">Your sheet stays in this tab. Print or save a PDF before leaving.</p>
        </section>
      </aside>
      <section className="pp-preview" aria-label="Sheet preview">
        <div className="pp-preview-toolbar"><div className="pp-preview-tabs" role="group" aria-label="Preview content"><button type="button" aria-pressed={view === "pupil"} onClick={() => setView("pupil")}>Pupil sheet</button><button type="button" aria-pressed={view === "answers"} onClick={() => setView("answers")}>Answer key</button></div><span>{questions.length} questions · {pages.length} pupil {pages.length === 1 ? "page" : "pages"}</span></div>
        <div className="pp-print-controls"><label><span className="tt-visually-hidden">Print content</span><select value={printMode} onChange={(event) => setPrintMode(event.target.value)}><option value="pupil">Pupil sheet only</option><option value="answers">Answer key only</option><option value="both">Pupil sheet & answers</option></select></label><button className="tp-primary" type="button" disabled={!questions.length} onClick={() => window.print()}><Icon name="print" />Print / save PDF</button></div>
        <p className="pp-status" role="status">{status}</p>
        {!questions.length && <div className="pp-empty"><Icon name="list" /><h2>Start with a topic</h2><p>Choose a topic to create your practice sheet.</p>{topicIds.length > 0 && <button type="button" onClick={() => rebuild()}>Restore questions</button>}</div>}
        <div hidden={view !== "pupil"} className={`pp-pupil-pages${view !== "pupil" ? " pp-preview-hidden" : ""}`}>
          {pages.map((items, pageIndex) => <PracticePaper key={pageIndex} title={title} instructions={instructions} number={pageIndex + 1} total={pages.length} year={year} subjectLabel={subjectLabel}>
            {items.map((item) => item.type === "vocabulary" ? <p className="pp-vocabulary" key="words"><strong>Words to use</strong>{item.words}</p> : item.type === "example" ? <section className="pp-worked-example" key={item.topicId}><p className="pp-example-label">{item.example.reminder ? "Topic reminder" : "Worked example"} · {practiceTopic(item.topicId).name}</p><LessonExample example={item.example} /></section> : <section className={`pp-question${support.extraSpace || item.question.largeWorking ? " pp-extra-space" : ""}`} key={item.question.id} aria-label={`Question ${item.number}`}>
              <div className="pp-question-top"><span className="pp-question-number">{item.number}.</span><p>{item.question.prompt}</p></div>
              <PracticeModel model={item.model} />
              <div className="pp-working" aria-label="Space for working" />
              <div className="pp-question-actions"><button type="button" onClick={() => replace(item.question.id)} aria-label={`Replace question ${item.number}`}>Replace</button><button type="button" disabled={item.number === 1} onClick={() => move(item.question.id, -1)} aria-label={`Move question ${item.number} up`}><Icon name="up" /></button><button type="button" disabled={item.number === questions.length} onClick={() => move(item.question.id, 1)} aria-label={`Move question ${item.number} down`}><Icon name="down" /></button><button type="button" onClick={() => { setQuestions(questions.filter((q) => q.id !== item.question.id)); setStatus(`Question ${item.number} removed.`); }} aria-label={`Remove question ${item.number}`}><Icon name="close" /></button>{getLesson(item.question.subject, year, item.question.curriculumTopicId, 1) && <Link to={`/teachers/briefings/${year}/${item.question.subject}/${practiceTopic(item.question.topicId).topicId}`} aria-label={`Topic briefing for question ${item.number}`}>Topic notes ↗</Link>}</div>
            </section>)}
          </PracticePaper>)}
        </div>
        <div hidden={view !== "answers"} className={`pp-answer-pages${view !== "answers" ? " pp-preview-hidden" : ""}`}>
          {answerPages.map((entries, pageIndex) => <PracticePaper key={pageIndex} title={title} number={pageIndex + 1} total={answerPages.length} year={year} subjectLabel={subjectLabel} answers><ol className="pp-answer-list">{entries.map(({ question, number }) => <PracticeAnswer key={question.id} question={question} number={number} />)}</ol></PracticePaper>)}
        </div>
      </section>
    </div>
    <p className="pp-review-note">Review the sheet before using it with your class. This first collection has not yet had a teacher content review.</p>
  </TeacherWorkspace>;
}
