// Usage: node scripts/lintLessonFile.mjs <file under src/data/lessons> <EXPORT_NAME> <category id>
import { lintLessons } from "../src/data/lessons/lintLessons.js";
import { loadCurriculum } from "../src/data/curriculumRegistry.js";
const [file, name, categoryId] = process.argv.slice(2);
const lessons = (await import(new URL(`../${file}`, import.meta.url)))[name];
const topicIds = loadCurriculum(3, "math").find((c) => c.id === categoryId).topics.map((t) => t.id);
const errors = lintLessons(lessons, { year: 3, topicIds });
console.log(errors.length ? errors.join("\n") : "OK");
process.exitCode = errors.length ? 1 : 0;
