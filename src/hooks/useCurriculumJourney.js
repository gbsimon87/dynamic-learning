import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/auth-context.js";
import { CurriculumJourneySessionContext } from "../context/curriculum-journey-context.js";
import { store } from "../data/store/index.js";
import { loadCurriculumIntroductions } from "../data/curriculumIntroductions/index.js";
import { introductionForScope, pendingCurriculumIntroductions } from "../data/curriculumJourney.js";

export function useCurriculumJourney(year, subject, scopes, replay = false) {
  const { child } = useContext(AuthContext);
  const session = useContext(CurriculumJourneySessionContext);
  const childId = child?._id;
  const key = JSON.stringify([childId, Number(year), subject]);
  const [state, setState] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const [saveError, setSaveError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [bypassed, setBypassed] = useState(false);
  // An explicit replay closes locally; it never suppresses later replays.
  const [replayDone, setReplayDone] = useState([]);
  const mounted = useRef(false), gate = useRef(false), retryAction = useRef(null);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
  useEffect(() => {
    let cancelled = false;
    Promise.all([store.getCurriculumJourney(childId, year, subject), loadCurriculumIntroductions(year, subject)])
      .then(([doc, content]) => {
        if (!content) throw new Error("CONTENT_UNAVAILABLE");
        if (!cancelled) setState({ key, doc, content, error: false });
      }).catch(() => { if (!cancelled) setState({ key, error: true }); });
    return () => { cancelled = true; };
  }, [childId, year, subject, key, attempt]);
  const current = state?.key === key ? state : null;
  const suppressed = new Set(replay ? replayDone : session?.suppressed[key] ?? []);
  const pending = pendingCurriculumIntroductions(scopes, current?.doc, suppressed, replay);
  const acknowledge = async (scopeIds) => {
    if (!current?.content || current.error || gate.current) return;
    const acknowledgements = scopeIds.map((scopeId) => ({ scopeId, contentVersion: introductionForScope(current.content, scopeId)?.version }));
    const action = { acknowledgements };
    retryAction.current = scopeIds;
    gate.current = true; setSaving(true); setSaveError(false);
    try {
      const doc = await store.acknowledgeCurriculumIntroductions(childId, year, subject, action);
      if (mounted.current) {
        setState((latest) => latest?.key === key ? { ...latest, doc } : latest);
        if (replay) setReplayDone((done) => [...done, ...scopeIds]);
        retryAction.current = null;
      }
    } catch { if (mounted.current) setSaveError(true); }
    finally { gate.current = false; if (mounted.current) setSaving(false); }
  };
  return { content: current?.content, pending, loading: !current, loadError: current?.error === true,
    saveError, saving, bypassed,
    acknowledge, retrySave: () => acknowledge(retryAction.current ?? pending.slice(0, 1)),
    retryLoad: () => { setState(null); setAttempt((a) => a + 1); },
    continueForNow: () => { if (!replay) session?.suppress(key, pending); setBypassed(true); },
  };
}
