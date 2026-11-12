// Explicit lazy imports keep authored pathway content out of initial bundles.
// One file per pathway: src/data/curriculumIntroductions/<subject>/year<N>.js.
const SAFE_SUBJECT = /^[a-z]+$/;
const missing = (error) => error?.code === "ERR_MODULE_NOT_FOUND" && /curriculumIntroductions\//.test(error.message)
  || /^Unknown variable dynamic import/.test(error?.message ?? "");

export async function loadCurriculumIntroductions(year, subject) {
  const y = Number(year);
  if (!Number.isSafeInteger(y) || y < 1 || y > 6 || !SAFE_SUBJECT.test(subject)) return null;
  try { return (await import(`./${subject}/year${y}.js`)).default; }
  catch (error) { if (missing(error)) return null; throw error; }
}
