// Usage: node scripts/lintLessonFile.mjs <file under repo> <EXPORT_NAME> <category id> [year=3] [subject=math]
import { lintLessons } from "../src/data/lessons/lintLessons.js";
import { loadCurriculum } from "../src/data/curriculumRegistry.js";
const [file, name, categoryId, year = "3", subject = "math"] = process.argv.slice(2);
const lessons = (await import(new URL(`../${file}`, import.meta.url)))[name];
const topicIds = loadCurriculum(Number(year), subject).find((c) => c.id === categoryId).topics.map((t) => t.id);
const errors = lintLessons(lessons, { year: Number(year), topicIds });
console.log(errors.length ? errors.join("\n") : "OK");
process.exitCode = errors.length ? 1 : 0;
