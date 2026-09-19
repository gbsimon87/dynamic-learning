import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import { store } from "../../data/store";
import { isChallengeImplemented } from "../../data/challengeAvailability";
import { loadResumeCandidates } from "../../data/resumeCandidates";
import { pickResume } from "../../data/curriculumResume";

/**
 * Feeds the homepage's Keep-going card.
 *
 * Reads every available curriculum's progress document for the active child and
 * hands them to the pure `pickResume`. There are only a handful of available
 * year+subject pairs, so this is a couple of cheap reads on mount.
 *
 * Strictly read-only — the homepage must never write a learner's progress
 * (.claude/skills/curriculum-progress). No child signed in means no reads at
 * all, so a signed-out visitor never touches another child's document.
 *
 * @returns {{ loading: boolean, resume: object|null }}
 */
export function useHomeResume() {
  const auth = useContext(AuthContext);
  const childId = auth?.child?._id ?? null;

  const [state, setState] = useState({ loading: Boolean(childId), resume: null });

  useEffect(() => {
    let cancelled = false;

    if (!childId) {
      setState({ loading: false, resume: null });
      return () => {
        cancelled = true;
      };
    }

    setState({ loading: true, resume: null });

    loadResumeCandidates(store, childId, isChallengeImplemented)
      .then((candidates) => {
        if (cancelled) return;
        setState({ loading: false, resume: pickResume(candidates) });
      })
      .catch(() => {
        // A failed read just means no card — never a broken homepage.
        if (!cancelled) setState({ loading: false, resume: null });
      });

    return () => {
      cancelled = true;
    };
  }, [childId]);

  return state;
}
