import { Link } from "react-router";
import { curriculumAssessmentHref } from "../../data/curriculumJourney.js";
import "./curriculumJourney.css";

/**
 * Map card for a Quest Mastery quiz or the Subject Final Test. Always open
 * (voluntary practice); "recommended" once the built content is complete.
 * An overview failure shows Retry, never "no attempts yet".
 */
export default function CurriculumQuizCard({ year, subject, kind, categoryId = null, title, complete, overview }) {
  const href = curriculumAssessmentHref(year, subject, kind, categoryId);
  const scope = overview.scope(kind, categoryId);
  const latest = scope?.latestCompleted;
  const active = scope?.latestActive;
  return <section className="cj-quiz-card" aria-label={title}>
    <h3><span aria-hidden="true">{kind === "quest" ? "📝" : "🏁"}</span> {title}</h3>
    <p>{kind === "quest" ? "A mixed quiz with one question from every topic in this quest." : "A final test with questions from every quest."}
      {complete ? " You’ve finished the challenges — a great time to try it!" : " Try it whenever you like."}</p>
    {overview.loading && <p role="status">Checking your saved quizzes…</p>}
    {overview.error && <p role="alert">We couldn’t check your saved quizzes. <button type="button" className="cj-inline" onClick={overview.retry}>Try again</button></p>}
    {latest && <p>Last result: <strong>{latest.summary.correct} correct out of {latest.summary.total}</strong> · <Link to={`${href}?session=${latest.sessionId}`}>See results</Link></p>}
    <div className="cj-actions">
      {active ? <Link className="cj-link-button cj-primary" to={`${href}?session=${active.sessionId}`}>Carry on ({active.savedResponses} of {active.total})</Link>
        : <Link className="cj-link-button" to={href}>{latest ? "Try it again" : kind === "quest" ? "Try Quest Mastery" : "Try the final test"}</Link>}
    </div>
  </section>;
}
