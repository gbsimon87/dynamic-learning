import { useEffect, useRef, useState } from "react";
import { initialRocksEnquiry, reduceRocksEnquiry } from "../data/challenges/science/rocksEnquiry.js";

export function useRocksEnquiry({ question, submit, locked }) {
  const [state, setState] = useState(initialRocksEnquiry);
  const current = useRef(state), active = useRef(true);
  useEffect(() => { active.current = true; return () => { active.current = false; }; }, []);
  const { revision, version, stage } = state;
  const dispatch = (action, assessed = false) => {
    if (!active.current || locked || current.current.stage === "done") return;
    const before = current.current;
    const next = reduceRocksEnquiry(before, { ...action, revision, version }, question);
    if (next === before) {
      if (assessed && before.revision === revision && before.version === version && before.stage === stage) submit(false);
      return;
    }
    current.current = next; setState(next);
    if (next.stage === "done") submit(true);
  };
  return { state, dispatch, updateConclusion: update => dispatch({ type: "conclusion", ids: update(current.current.conclusion) }) };
}
