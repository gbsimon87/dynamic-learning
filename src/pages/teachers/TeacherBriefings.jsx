import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import LessonExample from "../../components/challenge/lesson/LessonExample";
import { LESSONS } from "../../data/lessons/index.js";
import { briefingCourses, getTopicBriefing, listBriefingTopics } from "../../data/teacherBriefings/index.js";
import TeacherWorkspace, { TeacherHeader } from "./TeacherWorkspace";
import { Icon } from "./TeacherIcons";
import "../../components/challenge/lesson/lesson.css";
import "./TeacherTools.css";

const COURSES = briefingCourses();
const briefingPath = (year, subject, topicId) => `/teachers/briefings/${year}/${subject}/${topicId}`;

function BriefingIndex() {
  const [course, setCourse] = useState({ year: 3, subject: "math" });
  const [query, setQuery] = useState("");
  const years = [...new Set(COURSES.map((entry) => entry.year))];
  const subjects = COURSES.filter((entry) => entry.year === course.year);
  const categories = useMemo(() => listBriefingTopics(course.year, course.subject), [course]);
  const hasLessons = Boolean(LESSONS[course.subject]?.[course.year]);
  const hasNotes = categories.some((category) => category.topics.some((topic) => topic.hasNotes));
  const courseName = `Year ${course.year} ${COURSES.find((entry) => entry.year === course.year && entry.subject === course.subject)?.subjectName ?? ""}`;
  const term = query.trim().toLowerCase();
  const shown = categories.map((category) => ({ ...category, topics: category.topics.filter((topic) => !term || `${topic.name} ${category.title}`.toLowerCase().includes(term)) })).filter((category) => category.topics.length);
  const chooseYear = (year) => setCourse((current) => ({ year, subject: COURSES.some((entry) => entry.year === year && entry.subject === current.subject) ? current.subject : COURSES.find((entry) => entry.year === year).subject }));
  return <TeacherWorkspace className="teacher-tools">
    <TeacherHeader title="Topic briefings" />
    <div className="tw-panel tw-filters">
      <label>Year group<select value={course.year} onChange={(event) => chooseYear(Number(event.target.value))}>
        {years.map((year) => <option key={year} value={year}>Year {year}</option>)}
      </select></label>
      <label>Subject<select value={course.subject} onChange={(event) => setCourse({ ...course, subject: event.target.value })}>
        {subjects.map((entry) => <option key={entry.subject} value={entry.subject}>{entry.subjectName}</option>)}
      </select></label>
      <label>Find a topic<input type="search" value={query} maxLength={80} placeholder="Search topics, e.g. fractions" onChange={(event) => setQuery(event.target.value)} /></label>
    </div>
    {!hasNotes && <p className="tp-notice">Teacher notes for {courseName} aren't written yet. {hasLessons ? "Briefings here show Bix's worked examples for each topic." : "Briefings here link to each topic's challenges for now."}</p>}
    {shown.length === 0 && <p className="tp-hint" role="status">No topic matches “{query}”.</p>}
    {shown.map((category) => <section key={category.id} className="tt-topic-group" aria-labelledby={`cat-${category.id}`}>
      <h2 id={`cat-${category.id}`}>{category.title}</h2>
      <ul className="tt-topic-list">{category.topics.map((topic) => <li key={topic.id}>
        <Link to={briefingPath(course.year, course.subject, topic.id)}>{topic.name}</Link>
        {topic.hasNotes && <span className="tp-tag tp-tag--teach">Teacher notes</span>}
      </li>)}</ul>
    </section>)}
  </TeacherWorkspace>;
}

function Section({ title, children }) {
  return <section className="tt-section"><h2>{title}</h2>{children}</section>;
}

function BriefingNotes({ notes }) {
  return <>
    <Section title="What the curriculum says">
      <blockquote className="tt-quote">{notes.statutory.map((quote) => <p key={quote}>{quote}</p>)}</blockquote>
      <p className="tp-quiet">Statutory requirement, quoted from the National Curriculum in England.</p>
    </Section>
    <Section title="In brief"><p className="tt-lead">{notes.inBrief}</p></Section>
    <Section title="Key ideas"><ul className="tt-list">{notes.keyFacts.map((fact) => <li key={fact}>{fact}</li>)}</ul></Section>
    <Section title="Common misconceptions">
      <ul className="tt-cards">{notes.misconceptions.map((item) => <li key={item.mistake} className="tt-card">
        <p><strong>The mistake:</strong> {item.mistake}</p>
        <p><strong>Why it happens:</strong> {item.why}</p>
        <p><strong>What to do:</strong> {item.response}</p>
      </li>)}</ul>
    </Section>
    <Section title="Vocabulary">
      <dl className="tt-glossary">{notes.vocabulary.map((word) => <div key={word.term}><dt>{word.term}</dt><dd>{word.meaning}</dd></div>)}</dl>
    </Section>
    <Section title="Where it fits">
      <dl className="tt-glossary"><div><dt>Before</dt><dd>{notes.before}</dd></div><div><dt>Next</dt><dd>{notes.next}</dd></div></dl>
    </Section>
  </>;
}

function BriefingPage({ year, subject, topicId }) {
  const briefing = useMemo(() => getTopicBriefing(year, subject, topicId), [year, subject, topicId]);
  if (!briefing) return <TeacherWorkspace className="teacher-tools">
    <TeacherHeader title="Briefing not found" backTo="/teachers/briefings" backLabel="All topic briefings" />
    <p>This topic doesn't exist. Choose another from the <Link to="/teachers/briefings">topic list</Link>.</p>
  </TeacherWorkspace>;
  const lessons = briefing.challenges.filter((challenge) => challenge.lesson);
  return <TeacherWorkspace as="article" className="teacher-tools tt-printable tw-reading">
    <TeacherHeader title={briefing.name} backTo="/teachers/briefings" backLabel="All topic briefings"
      context={`Year ${briefing.year} ${briefing.subjectName} · ${briefing.categoryTitle}`}
      actions={<>
        <Link className="tt-button-link" to={`/teachers/planning?year=${briefing.year}&subject=${briefing.subject}&topic=${briefing.topicId}`}>Plan lessons for this topic</Link>
        <button type="button" onClick={() => window.print()}><Icon name="print" />Print briefing</button>
      </>} />
    {briefing.notes ? <BriefingNotes notes={briefing.notes} /> : <p className="tp-notice">Detailed teacher notes for this topic aren't written yet. {lessons.length ? "Below are the worked examples Bix uses to introduce it." : "Open a challenge below to see how Bix teaches it."}</p>}
    {lessons.length > 0 && <Section title="How Bix teaches it">
      <ol className="tt-lessons">{lessons.map((challenge) => <li key={challenge.id} className="tt-card">
        <h3>Challenge {challenge.id}: {challenge.lesson.title}</h3>
        <ul className="tt-list">{challenge.lesson.lines.map((line) => <li key={line}>{line}</li>)}</ul>
        {challenge.lesson.example && <LessonExample example={challenge.lesson.example} />}
      </li>)}</ol>
    </Section>}
    <Section title="Try the challenges">
      <p className="tp-quiet tt-no-print">Challenges open in Curriculum Mode, which asks for a learner profile and records that learner's progress.</p>
      <ul className="tt-link-row">{briefing.challenges.map((challenge) => <li key={challenge.id}><a href={challenge.to} target="_blank" rel="noopener noreferrer">Challenge {challenge.id}{challenge.lesson ? `: ${challenge.lesson.title}` : ""} <Icon name="external" /></a></li>)}</ul>
    </Section>
    <nav className="tt-pager tt-no-print" aria-label="Other topics">
      {briefing.previous ? <Link to={briefingPath(year, subject, briefing.previous.id)}><Icon name="back" />{briefing.previous.name}</Link> : <span />}
      {briefing.next && <Link to={briefingPath(year, subject, briefing.next.id)}>{briefing.next.name} →</Link>}
    </nav>
    {briefing.notes && <p className="tp-quiet">Teacher notes are written by the Learn with Bix team and not yet reviewed by a teacher. Check them against your school's scheme.</p>}
  </TeacherWorkspace>;
}

export default function TeacherBriefings() {
  const { year, subject, topicId } = useParams();
  return topicId ? <BriefingPage year={Number(year)} subject={subject} topicId={topicId} /> : <BriefingIndex />;
}
