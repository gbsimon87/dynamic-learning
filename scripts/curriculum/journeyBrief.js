// Authoring brief for one pathway's introductions and quiz banks:
//   npm run journey:brief -- --year 3 --subject math [--quest <categoryId>]
// Prints real IDs, names, built challenge slots, saved statutory mapping rows,
// the public guide's quest summary and Bix's existing lesson titles. Read-only.
import { existsSync } from "node:fs";
import { parseArgs } from "node:util";
import { pathToFileURL } from "node:url";
import { CURRICULUM_JOURNEY_MANIFEST } from "../../shared/curriculumJourneyManifest.js";
import { curriculumGuideFor } from "../../shared/curriculumGuides.js";
import { loadCurriculum } from "../../src/data/curriculumRegistry.js";
import { REPO_ROOT, findMapping, repoPath } from "./topics.js";

const { values } = parseArgs({ options: { year: { type: "string" }, subject: { type: "string" }, quest: { type: "string" } } });
const year = Number(values.year);
const pathway = CURRICULUM_JOURNEY_MANIFEST.find((p) => p.year === year && p.subject === values.subject);
if (!pathway) { console.error("Unknown or unbuilt pathway. Use --year N --subject ID"); process.exit(1); }
const curriculum = loadCurriculum(year, values.subject);
const guide = curriculumGuideFor(year, values.subject);
const lessonsIndex = repoPath(REPO_ROOT, "src/data/lessons/index.js");
const { getLesson } = existsSync(lessonsIndex) ? await import(pathToFileURL(lessonsIndex).href) : { getLesson: () => null };

console.log(`# Year ${year} ${values.subject}${guide ? ` — ${guide.label}` : ""}`);
if (guide) console.log(`Guide intro: ${guide.intro}\nPractical note: ${guide.practical ?? "—"}`);
console.log(`Files: src/data/curriculumIntroductions/${values.subject}/year${year}.js, shared/curriculumAssessments/${values.subject}/year${year}.js`);
for (const quest of pathway.categories.filter((q) => !values.quest || q.id === values.quest)) {
  const data = curriculum.find((c) => c.id === quest.id);
  const area = guide?.areas?.find((a) => a.categoryId === quest.id);
  console.log(`\n## Quest \`${quest.id}\` — ${data.title}`);
  if (area) console.log(`Guide: ${area.description} Example: ${area.example}`);
  for (const topic of quest.topics) {
    const t = data.topics.find((x) => x.id === topic.id);
    const mapping = findMapping({ root: REPO_ROOT, year, subject: values.subject, topicId: topic.id });
    console.log(`\n### Topic \`${topic.id}\` — ${t.name}  (built challenges: ${topic.challengeIds.join(", ")})`);
    for (const row of mapping.rows) console.log(`Mapping (${mapping.file}:${row.line}): ${row.text.slice(0, 600)}`);
    const titles = topic.challengeIds.map((id) => {
      const lesson = getLesson(values.subject, year, topic.id, id);
      const challenge = t.challenges.find((c) => Number(c.id) === id);
      return `${id}. ${challenge?.title ?? ""}${lesson ? ` — lesson “${lesson.title}”: ${lesson.lines?.join(" ")}` : ""}`;
    });
    for (const line of titles) console.log(`  ${line}`);
  }
}
