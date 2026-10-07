import { useCallback, useEffect, useRef, useState } from "react";
import { DRAFT_KEY, emptyDraft, parseDraft, serialiseDraft } from "../../../data/signupFlow";

function readDraft() {
  try {
    const raw = globalThis.sessionStorage?.getItem(DRAFT_KEY);
    return (raw && parseDraft(raw)) || emptyDraft();
  } catch {
    return emptyDraft(); // private mode, blocked storage
  }
}

/**
 * The answers so far, kept in sessionStorage so a refresh resumes. Never holds
 * the password, the birth year, or anything about an under-13 (serialiseDraft
 * returns null for those, and the saved copy is removed). `finishDraft`
 * removes it for good once sign-up succeeds.
 */
export function useSignupDraft() {
  const [draft, setDraft] = useState(readDraft);
  const finished = useRef(false);

  useEffect(() => {
    if (finished.current) return;
    try {
      const saved = serialiseDraft(draft);
      if (saved === null) globalThis.sessionStorage?.removeItem(DRAFT_KEY);
      else globalThis.sessionStorage?.setItem(DRAFT_KEY, saved);
    } catch {
      /* the flow still works; it just won't survive a reload */
    }
  }, [draft]);

  const finishDraft = useCallback(() => {
    finished.current = true;
    try {
      globalThis.sessionStorage?.removeItem(DRAFT_KEY);
    } catch {
      /* nothing to remove */
    }
  }, []);

  return [draft, setDraft, finishDraft];
}
