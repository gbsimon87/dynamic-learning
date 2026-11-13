// Build-time switch for curriculum introductions and quizzes (#69). On unless
// VITE_ENABLE_CURRICULUM_JOURNEY is "false" (the rollback switch). Kept in its
// own tiny module so eager code (RequireChild) never pulls in the manifest.
export const CURRICULUM_JOURNEY_ENABLED = import.meta.env?.VITE_ENABLE_CURRICULUM_JOURNEY !== "false";
