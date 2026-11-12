import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/auth-context.js";
import { store } from "../data/store/index.js";

const newId = () => globalThis.crypto.randomUUID();
const CONFLICTS = new Set(["REVISION_CONFLICT", "ITEM_ALREADY_ANSWERED", "ITEM_OUT_OF_ORDER", "SUBMISSION_ID_REUSED", "SESSION_COMPLETE"]);

/**
 * One quiz scope (quest mastery or subject final) for the active child.
 *
 * Sessions are only ever created by the explicit `start` action, never by
 * render/effects. Every write is locked synchronously before awaiting, keeps
 * its IDs/payload for an identical retry, and shows correctness only from the
 * store's acknowledged session. Late answers for an old child/pathway/session
 * are ignored.
 */
export function useCurriculumAssessment({ year, subject, kind, categoryId, sessionId }) {
  const { child } = useContext(AuthContext);
  const childId = child?._id;
  const scopeKey = JSON.stringify([childId, Number(year), subject, kind, categoryId]);
  const sessionKey = `${scopeKey}/${sessionId ?? ""}`;
  const keyRef = useRef(sessionKey);
  keyRef.current = sessionKey;

  const [overview, setOverview] = useState({ key: null });
  const [session, setSession] = useState({ key: null });
  const [attempt, setAttempt] = useState(0);
  const [action, setAction] = useState({ busy: false, error: null, conflict: false });
  const gate = useRef(false);
  const pendingStart = useRef(null);
  const pendingSubmit = useRef(null);

  // Overview (latest active/completed) for the landing card; failure ≠ "no attempts".
  useEffect(() => {
    if (sessionId) return undefined;
    let cancelled = false;
    store.getCurriculumAssessmentOverview(childId, year, subject).then((result) => {
      const scope = result.scopes.find((s) => s.kind === kind && s.categoryId === categoryId) ?? null;
      if (!cancelled) setOverview({ key: scopeKey, scope, error: false });
    }).catch(() => { if (!cancelled) setOverview({ key: scopeKey, error: true }); });
    return () => { cancelled = true; };
  }, [childId, year, subject, kind, categoryId, scopeKey, sessionId, attempt]);

  useEffect(() => {
    if (!sessionId) return undefined;
    let cancelled = false;
    store.getCurriculumAssessment(childId, year, subject, sessionId).then((doc) => {
      const valid = doc.kind === kind && doc.categoryId === categoryId;
      if (!cancelled) setSession(valid ? { key: sessionKey, doc, error: null } : { key: sessionKey, error: "SESSION_NOT_FOUND" });
    }).catch((error) => { if (!cancelled) setSession({ key: sessionKey, error: error?.code ?? "LOAD_FAILED" }); });
    return () => { cancelled = true; };
  }, [childId, year, subject, kind, categoryId, sessionId, sessionKey, attempt]);

  // Reset per-key action state during render, so an old error never shows on a new quiz.
  const [actionKey, setActionKey] = useState(sessionKey);
  if (actionKey !== sessionKey) {
    setActionKey(sessionKey);
    setAction({ busy: false, error: null, conflict: false });
    pendingSubmit.current = null;
  }

  const run = useCallback(async (perform, onSuccess) => {
    if (gate.current) return false;
    gate.current = true;
    const captured = keyRef.current;
    setAction({ busy: true, error: null, conflict: false });
    try {
      const result = await perform();
      if (keyRef.current !== captured) return false;
      onSuccess(result);
      setAction({ busy: false, error: null, conflict: false });
      return true;
    } catch (error) {
      if (keyRef.current === captured) setAction({ busy: false, error: error?.code ?? "SAVE_FAILED", conflict: CONFLICTS.has(error?.code) });
      return false;
    } finally { gate.current = false; }
  }, []);

  const start = useCallback((onStarted) => {
    // One ID per intended attempt, reused by Retry after a lost acknowledgement.
    if (!pendingStart.current || pendingStart.current.scopeKey !== scopeKey) pendingStart.current = { scopeKey, sessionId: newId() };
    const request = { sessionId: pendingStart.current.sessionId, kind, categoryId };
    return run(() => store.startCurriculumAssessment(childId, year, subject, request), (doc) => {
      pendingStart.current = null;
      onStarted(doc.sessionId);
    });
  }, [childId, year, subject, kind, categoryId, scopeKey, run]);

  const current = session.key === sessionKey ? session : { key: sessionKey };
  const doc = current.doc ?? null;

  const submit = useCallback((itemInstanceId, response) => {
    if (!doc) return Promise.resolve(false);
    const same = pendingSubmit.current && pendingSubmit.current.itemInstanceId === itemInstanceId
      && JSON.stringify(pendingSubmit.current.response) === JSON.stringify(response);
    if (!same) pendingSubmit.current = { itemInstanceId, response, submissionId: newId(), expectedRevision: doc.revision };
    const body = { ...pendingSubmit.current };
    return run(() => store.submitCurriculumAssessmentResponse(childId, year, subject, doc.sessionId, body), (saved) => {
      pendingSubmit.current = null;
      setSession({ key: sessionKey, doc: saved, error: null });
    });
  }, [doc, childId, year, subject, sessionKey, run]);

  const finish = useCallback(() => {
    if (!doc) return Promise.resolve(false);
    return run(() => store.finishCurriculumAssessment(childId, year, subject, doc.sessionId, { expectedRevision: doc.revision }),
      (saved) => setSession({ key: sessionKey, doc: saved, error: null }));
  }, [doc, childId, year, subject, sessionKey, run]);

  const reload = useCallback(() => {
    pendingSubmit.current = null;
    setAction({ busy: false, error: null, conflict: false });
    setAttempt((a) => a + 1);
  }, []);

  const currentOverview = overview.key === scopeKey ? overview : null;
  return {
    childId,
    overview: currentOverview?.scope ?? null,
    overviewLoading: !sessionId && !currentOverview,
    overviewError: currentOverview?.error === true,
    session: doc,
    sessionLoading: Boolean(sessionId) && !current.doc && !current.error,
    sessionError: current.error ?? null,
    busy: action.busy,
    actionError: action.error,
    conflict: action.conflict,
    start, submit, finish, reload,
  };
}

/** One overview request per subject map: latest active/completed per quiz scope. */
export function useCurriculumAssessmentOverview(year, subject, enabled = true) {
  const { child } = useContext(AuthContext);
  const childId = child?._id;
  const key = JSON.stringify([childId, Number(year), subject]);
  const [state, setState] = useState({ key: null });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (!enabled) return undefined;
    let cancelled = false;
    store.getCurriculumAssessmentOverview(childId, year, subject)
      .then((overview) => { if (!cancelled) setState({ key, overview, error: false }); })
      .catch(() => { if (!cancelled) setState({ key, error: true }); });
    return () => { cancelled = true; };
  }, [childId, year, subject, key, enabled, attempt]);
  const current = state.key === key ? state : null;
  return {
    loading: enabled && !current, error: current?.error === true,
    scope: (kind, categoryId) => current?.overview?.scopes.find((s) => s.kind === kind && s.categoryId === categoryId) ?? null,
    retry: () => setAttempt((a) => a + 1),
  };
}
