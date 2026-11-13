import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { isUuid, validateAssessmentScope } from "../../../shared/curriculumJourneyData.js";
import { getJourneyPathway } from "../../../shared/curriculumJourneyPathway.js";
import { getSubjectName, loadCurriculum } from "../../data/curriculumRegistry.js";
import { isChallengeImplemented } from "../../data/challengeAvailability.js";
import { CURRICULUM_JOURNEY_ENABLED } from "../../data/curriculumJourney.js";
import { useCurriculumAssessment } from "../../hooks/useCurriculumAssessment.js";
import CurriculumEntryBoundary from "../../components/curriculum/CurriculumEntryBoundary.jsx";
import AssessmentRunner from "../../components/curriculum/AssessmentRunner.jsx";
import AssessmentResults from "../../components/curriculum/AssessmentResults.jsx";
import Mascot from "../../components/mascot/Mascot.jsx";
import "../../components/curriculum/curriculumJourney.css";

const questName = (title) => title.split(/\s+[–-]\s+/).slice(-1)[0];

/**
 * Quest Mastery (/curriculum/year/:year/:subject/quest/:categoryId/mastery) and
 * the Subject Final Test (/curriculum/year/:year/:subject/final-test).
 * `?session=<UUID>` names a saved attempt; without it the page shows the
 * quiz's overview with Start/Resume and the latest result.
 */
export default function AssessmentView() {
  const { year, subject, categoryId = null } = useParams();
  const kind = categoryId === null ? "subject" : "quest";
  const mapHref = `/curriculum/year/${year}/${subject}`;
  let valid = true;
  try { validateAssessmentScope(getJourneyPathway(year, subject), kind, categoryId); } catch { valid = false; }
  if (!valid) {
    return <div className="cj-page"><section className="cj-screen" role="alert"><h1>We couldn’t find that quiz</h1>
      <p>It may not be built yet.</p><Link className="cj-link-button" to="/curriculum">Choose a subject</Link></section></div>;
  }
  if (!CURRICULUM_JOURNEY_ENABLED) {
    return <div className="cj-page"><section className="cj-screen"><h1>Quizzes are coming soon</h1>
      <p>You can keep playing the challenges on your map.</p><Link className="cj-link-button" to={mapHref}>Back to the map</Link></section></div>;
  }
  return <CurriculumEntryBoundary year={Number(year)} subject={subject} target={kind === "subject" ? "subject" : "quest"} categoryId={categoryId}>
    <Assessment year={Number(year)} subject={subject} kind={kind} categoryId={categoryId} mapHref={mapHref} />
  </CurriculumEntryBoundary>;
}

function Assessment({ year, subject, kind, categoryId, mapHref }) {
  const [query, setQuery] = useSearchParams();
  const navigate = useNavigate();
  const raw = query.get("session");
  const sessionId = raw && isUuid(raw) ? raw : null;
  const quiz = useCurriculumAssessment({ year, subject, kind, categoryId, sessionId });
  const curriculum = loadCurriculum(year, subject);
  const isBuilt = (topicId, challengeId) => isChallengeImplemented(subject, year, topicId, challengeId);
  const quest = curriculum.find((q) => q.id === categoryId);
  const title = kind === "quest" ? `Quest Mastery: ${questName(quest.title)}` : `${getSubjectName(subject)} Final Test`;
  const open = (id) => setQuery(id ? { session: id } : {}, { replace: Boolean(id) });
  const startNew = () => quiz.start((id) => open(id));

  let body;
  if (raw && !sessionId) body = <Problem text="That quiz link isn’t right." onBack={() => open(null)} backLabel="See this quiz" />;
  else if (sessionId) {
    if (quiz.sessionLoading) body = <p className="cj-screen" role="status">Loading your quiz…</p>;
    else if (quiz.sessionError) {
      body = quiz.sessionError === "SESSION_NOT_FOUND" || quiz.sessionError === "INVALID_SESSION_ID"
        ? <Problem text="We couldn’t find that quiz attempt." onBack={() => open(null)} backLabel="See this quiz" />
        : <Problem text="We couldn’t load your quiz." onRetry={quiz.reload} onBack={() => navigate(mapHref)} backLabel="Back to the map" />;
    } else if (quiz.session.status === "completed") {
      body = <AssessmentResults session={quiz.session} curriculum={curriculum} isBuilt={isBuilt} year={year} subject={subject}
        mapHref={mapHref} onStartFresh={startNew} busy={quiz.busy} startError={quiz.actionError} />;
    } else {
      body = <AssessmentRunner session={quiz.session} subject={subject} busy={quiz.busy} actionError={quiz.actionError} conflict={quiz.conflict}
        onSubmit={quiz.submit} onFinish={quiz.finish} onReload={quiz.reload} onLeave={() => navigate(mapHref)} />;
    }
  } else body = <Overview quiz={quiz} kind={kind} pathway={getJourneyPathway(year, subject)} categoryId={categoryId} onStart={startNew} onOpen={open} mapHref={mapHref} />;

  return <div className="cj-page">
    <header className="cj-page-head">
      <Link className="cj-back" to={mapHref}>← Back to the map</Link>
      <div className="cj-heading"><Mascot decorative /><div><p className="cj-eyebrow">{kind === "quest" ? "Quest review" : "Subject review"}</p><h1>{title}</h1></div></div>
    </header>
    {body}
  </div>;
}

function Overview({ quiz, kind, pathway, categoryId, onStart, onOpen, mapHref }) {
  const topics = pathway.categories.find((q) => q.id === categoryId)?.topics.length ?? 0;
  const latest = quiz.overview?.latestCompleted;
  const active = quiz.overview?.latestActive;
  return <section className="cj-screen" aria-labelledby="cj-overview-title">
    <h2 id="cj-overview-title">{kind === "quest" ? "Mix it up!" : "Show what you remember"}</h2>
    <p>{kind === "quest"
      ? `One question from each of the ${topics} topics in this quest. There’s no timer and no pass mark.`
      : `Two questions from each of the ${pathway.categories.length} quests. There’s no timer and no pass mark.`}</p>
    <p>Answer what you can, or choose “I’m not sure”. Afterwards you’ll see which topics to practise.</p>
    {quiz.overviewLoading && <p role="status">Checking your saved quizzes…</p>}
    {quiz.overviewError && <div className="cj-error" role="alert"><p>We couldn’t check your saved quizzes.</p><button type="button" onClick={quiz.reload}>Try again</button></div>}
    {latest && <p className="cj-latest">Last time: <strong>{latest.summary.correct} correct out of {latest.summary.total}</strong>. <button type="button" className="cj-inline" onClick={() => onOpen(latest.sessionId)}>See results</button></p>}
    {quiz.actionError && <p className="cj-error" role="alert">We couldn’t start the quiz. Please try again.</p>}
    <div className="cj-actions">
      {active && <button type="button" className="cj-primary" onClick={() => onOpen(active.sessionId)}>Carry on ({active.savedResponses} of {active.total} answered)</button>}
      <button type="button" className={active ? "" : "cj-primary"} disabled={quiz.busy || quiz.overviewLoading} onClick={onStart}>
        {quiz.busy ? "Starting…" : active ? "Start a fresh quiz" : "Start the quiz"}</button>
      <Link className="cj-link-button" to={mapHref}>Not now</Link>
    </div>
    {active && <p className="cj-note">Starting fresh keeps your unfinished quiz in your history.</p>}
  </section>;
}

function Problem({ text, onRetry, onBack, backLabel }) {
  return <section className="cj-screen" role="alert"><p>{text}</p><div className="cj-actions">
    {onRetry && <button type="button" className="cj-primary" onClick={onRetry}>Try again</button>}
    <button type="button" onClick={onBack}>{backLabel}</button></div></section>;
}
