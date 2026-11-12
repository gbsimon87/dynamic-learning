// Build-time flag for curriculum introductions and quizzes (#69). Kept in its
// own tiny module so eager code (RequireChild) never pulls in the manifest.
export const CURRICULUM_JOURNEY_ENABLED = import.meta.env?.VITE_ENABLE_CURRICULUM_JOURNEY === "true";
