import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router";
import { AuthContext } from "../../context/auth-context.js";
import { getJourneyPathway } from "../../../shared/curriculumJourneyPathway.js";
import { validateIntroduction } from "../../../shared/curriculumJourneyModels.js";
import { curriculumEntryScopes, CURRICULUM_JOURNEY_ENABLED, introductionForScope } from "../../data/curriculumJourney.js";
import { useCurriculumJourney } from "../../hooks/useCurriculumJourney.js";
import CurriculumIntroduction from "./CurriculumIntroduction.jsx";
import BixLoader from "../mascot/BixLoader.jsx";
import "./curriculumJourney.css";

export default function CurriculumEntryBoundary(props) {
  if (!CURRICULUM_JOURNEY_ENABLED) return props.children;
  return <EnabledEntry {...props} />;
}

function EnabledEntry(props) {
  const { child } = useContext(AuthContext);
  const [query] = useSearchParams();
  const replay = props.target === "map" ? query.get("intro") : null;
  let scopes;
  try {
    scopes = curriculumEntryScopes(getJourneyPathway(props.year, props.subject), { ...props, replay,
      categoryId: replay ? query.get("category") : props.categoryId,
      topicId: replay ? query.get("topic") : props.topicId });
  } catch { return <><p className="cj-error" role="alert">That introduction is not available.</p>{props.children}</>; }
  const identity = JSON.stringify([child?._id, props.year, props.subject, props.target, props.categoryId, props.topicId, replay, query.get("category"), query.get("topic")]);
  return <Entry key={identity} {...props} scopes={scopes} replay={replay} />;
}

function Entry({ children, year, subject, scopes, target, replay }) {
  const journey = useCurriculumJourney(year, subject, scopes, Boolean(replay));
  const [query, setQuery] = useSearchParams();
  const finished = journey.bypassed || !journey.loading && !journey.loadError && journey.pending.length === 0;
  useEffect(() => {
    if (replay && finished) {
      const next = new URLSearchParams(query); for (const key of ["intro", "category", "topic"]) next.delete(key);
      setQuery(next, { replace: true });
    }
  }, [replay, finished, query, setQuery]);
  let overlay = null;
  const intro = introductionForScope(journey.content, journey.pending[0]);
  let valid = true;
  if (intro) { try { validateIntroduction(intro); } catch { valid = false; } }
  if (!finished) {
    if (journey.loading) overlay = <BixLoader />;
    else if (journey.loadError || !intro || !valid) overlay = <div className="cj-screen cj-load-error" role="alert">
      <p className="cj-load-error-icon" aria-hidden="true">📖</p>
      <h2>This introduction isn’t ready yet</h2>
      <p>We couldn’t load it just now. You can try again, or carry on and come back to it later.</p>
      <div className="cj-actions"><button type="button" className="cj-primary" onClick={journey.retryLoad}>Try again</button>
        <button type="button" onClick={journey.continueForNow}>Continue for now</button></div></div>;
    else overlay = <CurriculumIntroduction key={journey.pending[0]} introduction={intro} saving={journey.saving} saveError={journey.saveError}
      onContinue={() => journey.acknowledge(journey.pending.slice(0, 1))} onSkip={() => journey.acknowledge(journey.pending.slice(0, 1))}
      onSkipAll={() => journey.acknowledge(journey.pending)} remaining={journey.pending.length} onRetry={journey.retrySave} onContinueForNow={journey.continueForNow} />;
  }
  return <>{target === "map" ? <div hidden={!finished}>{children}</div> : finished ? children : null}{overlay}</>;
}
