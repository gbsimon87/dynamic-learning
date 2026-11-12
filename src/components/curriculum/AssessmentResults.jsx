import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { assessmentPracticeSuggestions } from "../../data/curriculumJourney.js";

/**
 * Results for a completed session: score with coverage, skipped shown
 * separately, and "Try practising" links. No pass mark or mastery label.
 */
export default function AssessmentResults({ session, curriculum, isBuilt, year, subject, mapHref, onStartFresh, busy, startError }) {
  const heading = useRef(null);
  const [showAll, setShowAll] = useState(false);
  useEffect(() => { heading.current?.focus(); }, []);
  const s = session.summary;
  const suggestions = assessmentPracticeSuggestions(session, curriculum, isBuilt);
  const shown = showAll ? suggestions : suggestions.slice(0, 3);
  const topicName = (categoryId, topicId) => curriculum.find((q) => q.id === categoryId)?.topics.find((t) => t.id === topicId)?.name ?? topicId;
  return <section className="cj-results" aria-labelledby="cj-results-title">
    <h2 id="cj-results-title" ref={heading} tabIndex={-1}>Your results</h2>
    <p className="cj-score"><strong>{s.correct}</strong> correct out of <strong>{s.total}</strong></p>
    <ul className="cj-score-parts">
      <li>✔ {s.correct} correct</li>
      <li>✖ {s.incorrect} not quite</li>
      <li>? {s.skipped} “I’m not sure”</li>
    </ul>
    <p className="cj-coverage">This quiz asked about {s.byTopic.length} topic{s.byTopic.length === 1 ? "" : "s"}, one or two questions each. It is a quick check, not a test of everything you know.</p>
    <details className="cj-topic-results">
      <summary>See each topic</summary>
      <ul>{s.byTopic.map((t) => <li key={`${t.categoryId}/${t.topicId}`}>{topicName(t.categoryId, t.topicId)}: {t.correct} of {t.total} correct{t.skipped ? `, ${t.skipped} not sure` : ""}</li>)}</ul>
    </details>
    {suggestions.length ? <>
      <h3>Try practising</h3>
      <ul className="cj-practice">
        {shown.map((p) => <li key={`${p.categoryId}/${p.topicId}`}>
          {p.challengeId ? <Link to={`/year/${year}/${subject}/problem/${p.categoryId}/${p.topicId}/${p.challengeId}`}>{p.topicName}</Link>
            : <span>{p.topicName} <em>(practice for this topic is not available right now)</em></span>}
        </li>)}
      </ul>
      {suggestions.length > 3 && !showAll && <button type="button" onClick={() => setShowAll(true)}>See all {suggestions.length}</button>}
    </> : <p>Brilliant work! You can still revisit any topic on the map whenever you like.</p>}
    {startError && <p className="cj-error" role="alert">We couldn’t start a new quiz. Please try again.</p>}
    <div className="cj-actions">
      <button type="button" className="cj-primary" disabled={busy} onClick={onStartFresh}>{busy ? "Starting…" : "Try a fresh quiz"}</button>
      <Link className="cj-link-button" to={mapHref}>Back to the map</Link>
    </div>
  </section>;
}
