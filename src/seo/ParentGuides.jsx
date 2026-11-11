import { useState } from "react";
import { Link, useParams } from "react-router";
import LessonExample from "../components/challenge/lesson/LessonExample";
import { CURRICULUM_GUIDES } from "../../shared/curriculumGuides.js";
import { PARENT_EXPLAINERS, PARENT_GUIDES_PATH, findParentExplainer, parentGuidePath } from "../../shared/parentExplainers.js";
import { Icon } from "../pages/teachers/TeacherIcons";
import NotFound from "../pages/NotFound";
import "../components/challenge/lesson/lesson.css";
import "../pages/teachers/TeacherPlanning.css";
import "../pages/teachers/TeacherTools.css";
import ReadingLayout from "../pages/teachers/ReadingLayout";
import { sectionId } from "../pages/teachers/readingSections";
import "../pages/teachers/AdultResources.css";

// Parent guides ("parent explainers"): the "how it's taught" layer under the
// curriculum guides. Teachers reach them from /teachers and send the links home.
const SUBJECTS = { math: "Maths", english: "English" };
const yearsLabel = (years) => years.length === 1 ? `Year ${years[0]}` : `Years ${years[0]}–${years.at(-1)}`;

function Breadcrumb({ explainer }) {
  return <nav aria-label="Breadcrumb" className="tt-breadcrumb tt-no-print">
    <Link to="/">Home</Link><span aria-hidden="true"> / </span>
    <Link to="/what-we-teach">What we teach</Link><span aria-hidden="true"> / </span>
    {explainer ? <><Link to={PARENT_GUIDES_PATH}>Parent guides</Link><span aria-hidden="true"> / </span><span>{explainer.title}</span></> : <span>Parent guides</span>}
  </nav>;
}

export function ParentGuideIndex() {
  const [year, setYear] = useState(0);
  const shown = PARENT_EXPLAINERS.filter((explainer) => !year || explainer.years.includes(year));
  return <div className="teacher-planning teacher-tools adult-resources adult-hub parent-guides">
    <header className="tp-header">
      <Breadcrumb />
      <p className="tt-kicker">Learning, together</p>
      <h1>Parent guides</h1>
      <p className="tp-lede">How children learn key methods at school, the words they use and quick ways to help at home. Teachers can send a link or print a copy.</p>
      <div className="tp-chips" role="group" aria-label="Year group">
        <button type="button" aria-pressed={year === 0} onClick={() => setYear(0)}>All years</button>
        {[1, 2, 3, 4, 5, 6].map((option) => <button key={option} type="button" aria-pressed={year === option} onClick={() => setYear(option)}>Year {option}</button>)}
      </div>
    </header>
    <ul className="tt-hub">{shown.map((explainer) => <li key={explainer.slug}>
      <Link className="tt-hub-card" to={parentGuidePath(explainer.slug)}>
        <span className="tt-kicker">{SUBJECTS[explainer.subject]} · {yearsLabel(explainer.years)}</span>
        <strong>{explainer.title}</strong>
        <span className="ar-arrow" aria-hidden="true">↗</span>
        <span>{explainer.summary}</span>
      </Link>
    </li>)}</ul>
  </div>;
}

function SharePanel({ note, onNote }) {
  const [status, setStatus] = useState("");
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(window.location.href); setStatus("Link copied. Paste it into your newsletter, email or class app."); }
    catch { setStatus("Couldn't copy automatically. Copy the address from your browser's address bar."); }
  };
  return <details className="tt-teacher-panel tt-no-print">
    <summary>Share or print this guide</summary>
    <p className="tp-quiet">Teachers: add a note for the printed copy. The note isn't saved and isn't part of the link.</p>
    <label>Note for the printed copy <span className="tp-optional">(optional)</span><textarea rows={3} maxLength={600} value={note} placeholder="For example, our calculation policy uses this method from Year 3." onChange={(event) => onNote(event.target.value)} /></label>
    <div className="tt-actions">
      <button type="button" onClick={copyLink}>Copy link</button>
      <button type="button" onClick={() => window.print()}><Icon name="print" />Print</button>
    </div>
    <p role="status" className="tt-status">{status}</p>
  </details>;
}

function ParentGuidePage({ explainer }) {
  const [note, setNote] = useState("");
  const guides = CURRICULUM_GUIDES.filter((guide) => guide.subject === explainer.subject && explainer.years.includes(guide.year));
  return <article className="teacher-planning teacher-tools adult-resources ar-reading parent-guides tt-printable">
    <header className="tp-header">
      <Breadcrumb explainer={explainer} />
      <p className="tt-kicker">A guide for parents and carers · {SUBJECTS[explainer.subject]} · {yearsLabel(explainer.years)}</p>
      <h1>{explainer.title}</h1>
      <p className="tp-lede">{explainer.summary}</p>
      <SharePanel note={note} onNote={setNote} />
      {note.trim() && <aside className="tt-note tt-print-only"><h2>A note from your child's teacher</h2><p>{note}</p></aside>}
    </header>
    <ReadingLayout sections={["What it is", "How it’s taught", "Words your child will use", "Quick ways to help at home", "Common mix-ups", "Free practice with Bix"]}>
    <section id={sectionId("What it is")} className="tt-section"><h2>What it is</h2>{explainer.whatItIs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>
    <section id="how-its-taught" className="tt-section">
      <h2>How it's taught</h2>
      <p>{explainer.howWeTeach.intro}</p>
      <ol className="tt-numbered">{explainer.howWeTeach.steps.map((step) => <li key={step}>{step}</li>)}</ol>
      <div className="tt-examples">{explainer.howWeTeach.examples.map((example) => <LessonExample key={example.title} example={example} />)}</div>
      {explainer.schoolsVary && <p className="tp-notice">Schools teach written methods in slightly different ways. If your child's method looks different, ask their teacher; using the school's method at home helps most.</p>}
    </section>
    <section id="words-your-child-will-use" className="tt-section">
      <h2>Words your child will use</h2>
      <dl className="tt-glossary">{explainer.words.map((word) => <div key={word.term}><dt>{word.term}</dt><dd>{word.meaning}</dd></div>)}</dl>
    </section>
    <section id="quick-ways-to-help-at-home" className="tt-section">
      <h2>Quick ways to help at home</h2>
      <ul className="tt-cards">{explainer.atHome.map((idea) => <li key={idea.title} className="tt-card"><h3>{idea.title}</h3><p>{idea.how}</p></li>)}</ul>
    </section>
    <section id="common-mix-ups" className="tt-section">
      <h2>Common mix-ups</h2>
      <ul className="tt-cards">{explainer.mixUps.map((item) => <li key={item.mistake} className="tt-card"><p><strong>{item.mistake}</strong></p><p>{item.help}</p></li>)}</ul>
    </section>
    <section id="free-practice-with-bix" className="tt-section">
      <h2>Free practice with Bix</h2>
      <ul className="tt-link-row">{explainer.practise.map((link) => <li key={link.to}><Link to={link.to}>{link.label}</Link><span className="tt-print-only"> (learnwithbix.com{link.to})</span></li>)}</ul>
    </section>
    {guides.length > 0 && <nav className="tt-section tt-no-print" aria-labelledby="guide-years">
      <h2 id="guide-years">What your child learns each year</h2>
      <ul className="tt-link-row">{guides.map((guide) => <li key={guide.slug}><Link to={guide.path}>{guide.label}</Link></li>)}</ul>
    </nav>}
    </ReadingLayout>
    <p className="tt-no-print"><Link to={PARENT_GUIDES_PATH}>← All parent guides</Link></p>
  </article>;
}

export default function ParentGuide({ slug: suppliedSlug }) {
  const params = useParams();
  const slug = suppliedSlug ?? params.slug;
  if (!slug) return <ParentGuideIndex />;
  const explainer = findParentExplainer(slug);
  if (!explainer) return <NotFound />;
  return <ParentGuidePage key={slug} explainer={explainer} />;
}
