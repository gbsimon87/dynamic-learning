import { useEffect, useRef, useState } from "react";
import { initialMagnetBuild, reduceMagnetBuild } from "../data/challenges/science/magnetBuild.js";

export function useMagnetBuild({ question, submit, locked }) {
  const [state, setState] = useState(() => initialMagnetBuild(question));
  const current = useRef(state), active = useRef(true);
  useEffect(() => { active.current = true; return () => { active.current = false; }; }, []);
  const { revision, version } = state;
  const dispatch = action => {
    if (!active.current || locked || current.current.done) return;
    const before = current.current, next = reduceMagnetBuild(before, { ...action, revision, version }, question);
    if (next === before) {
      if (action.type === "check" && before.tested && before.revision === revision && before.version === version) submit(false);
      return;
    }
    current.current = next; setState(next);
    if (next.done) submit(true);
  };
  return { state, dispatch };
}
