import { useEffect, useRef, useState } from "react";
import { initialShadowEnquiry, reduceShadowEnquiry } from "../data/challenges/science/shadowEnquiry.js";

export function useShadowEnquiry({ question, submit, locked }) {
  const [state, setState] = useState(initialShadowEnquiry);
  const current = useRef(state), active = useRef(true);
  useEffect(() => { active.current = true; return () => { active.current = false; }; }, []);
  const { revision, version, stage } = state;
  const dispatch = (action, assessed = false) => {
    if (!active.current || locked || current.current.stage === "done") return;
    const before = current.current;
    const next = reduceShadowEnquiry(before, { ...action, revision, version }, question);
    if (next === before) {
      if (assessed && before.revision === revision && before.version === version && before.stage === stage) submit(false);
      return;
    }
    current.current = next; setState(next);
    if (next.stage === "done") submit(true);
  };
  return { state, dispatch, updateConclusion: update => dispatch({ type: "conclusion", ids: update(current.current.conclusion) }) };
}
