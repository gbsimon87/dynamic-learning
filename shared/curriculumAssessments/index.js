// Both Node and the local driver use these lazy, React-free pathway banks.
// One file per pathway: shared/curriculumAssessments/<subject>/year<N>.js.
// The template import works natively in Node and through Vite's
// dynamic-import-vars, so adding a pathway needs no registry edit here.
const SAFE_SUBJECT = /^[a-z]+$/;
const missing = (error) => error?.code === "ERR_MODULE_NOT_FOUND" && /curriculumAssessments\//.test(error.message)
  || /^Unknown variable dynamic import/.test(error?.message ?? "");

export async function loadCurriculumAssessmentBank(year, subject) {
  const y = Number(year);
  if (!Number.isSafeInteger(y) || y < 1 || y > 6 || !SAFE_SUBJECT.test(subject)) return null;
  try { return (await import(`./${subject}/year${y}.js`)).default; }
  catch (error) { if (missing(error)) return null; throw error; }
}
