import { useEffect, useRef, useState } from "react";
import { initialProcessEnquiry, reduceProcessEnquiry } from "../data/challenges/science/processEnquiry.js";

/** Mount one keyed round per question. No persistence or timers; the shell
 * counts misses for the entire round and owns the only completion delay. */
export function useProcessEnquiry({ question, validateRecord, submit, locked }) {
  const [state, setState] = useState(initialProcessEnquiry);
  const current = useRef(state);
  const active = useRef(true);
  useEffect(() => { active.current = true; return () => { active.current = false; }; }, []);
  const { revision, version, stage } = state;
  const dispatch = (action, assessed = false) => {
    if (!active.current || locked || current.current.stage === "done") return;
    const before = current.current;
    const next = reduceProcessEnquiry(before, { ...action, revision, version }, question, validateRecord);
    if (next === before) {
      if (assessed && before.revision === revision && before.version === version && before.stage === stage) submit(false);
      return;
    }
    current.current = next;
    setState(next);
    if (next.stage === "done") submit(true);
  };
  return { state, dispatch, updateConclusion: (update) => dispatch({ type: "conclusion", ids: update(current.current.conclusion) }) };
}
