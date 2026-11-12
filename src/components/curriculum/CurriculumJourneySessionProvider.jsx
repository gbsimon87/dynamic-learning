import { useCallback, useMemo, useState } from "react";
import { CurriculumJourneySessionContext } from "../../context/curriculum-journey-context.js";

export default function CurriculumJourneySessionProvider({ children }) {
  const [suppressed, setSuppressed] = useState({});
  const suppress = useCallback((key, scopes) => setSuppressed((current) => ({ ...current,
    [key]: [...new Set([...(current[key] ?? []), ...scopes])] })), []);
  const value = useMemo(() => ({ suppressed, suppress }), [suppressed, suppress]);
  return <CurriculumJourneySessionContext.Provider value={value}>{children}</CurriculumJourneySessionContext.Provider>;
}
