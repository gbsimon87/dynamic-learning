import { CURRICULUM_JOURNEY_MANIFEST } from "./curriculumJourneyManifest.js";
import { findJourneyPathway } from "./curriculumJourneyData.js";

/** Built pathway for (year, subject) from the generated manifest, or INVALID_SCOPE. */
export function getJourneyPathway(year, subject, manifest = CURRICULUM_JOURNEY_MANIFEST) {
  return findJourneyPathway(year, subject, manifest);
}
