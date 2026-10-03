import { useEffect, useRef, useState } from "react";
import { initialForcesEnquiry, reduceForcesEnquiry } from "../data/challenges/science/forcesShared.js";

export function useForcesEnquiry({ question, validateRecord, validateSetup = null, submit, locked }) {
  const [state, setState] = useState(initialForcesEnquiry);
  const current = useRef(state), active = useRef(true);
  useEffect(() => { active.current = true; return () => { active.current = false; }; }, []);
  const { revision, version, stage } = state;
  const dispatch = (action, assessed = false) => {
    if (!active.current || locked || current.current.stage === "done") return;
    const before = current.current;
    const next = reduceForcesEnquiry(before, { ...action, revision, version }, question, validateRecord, validateSetup);
    if (next === before) {
      if (assessed && before.revision === revision && before.version === version && before.stage === stage) submit(false);
      return;
    }
    current.current = next; setState(next);
    if (next.stage === "done") submit(true);
  };
  return { state, dispatch, updateConclusion: update => dispatch({ type: "conclusion", ids: update(current.current.conclusion) }) };
}
