import { existsSync, readFileSync, readdirSync, realpathSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import { toKebabCase } from "../../src/utils/toKebabCase.js";

export const REPO_ROOT = fileURLToPath(new URL("../../", import.meta.url));
export const pascalTopicId = (id) => id.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("");

// Follow existing ancestors too: a symlink must not turn a repo-relative write
// into a write outside the checkout.
export function repoPath(root, relative) {
  if (typeof relative !== "string" || !relative || path.isAbsolute(relative)) throw new Error("Use a repository-relative path");
  const absolute = path.resolve(root, relative);
  const inside = (base, candidate) => candidate === base || candidate.startsWith(base + path.sep);
  if (!inside(path.resolve(root), absolute)) throw new Error(`Path leaves repository: ${relative}`);
  let ancestor = absolute;
  while (!existsSync(ancestor)) ancestor = path.dirname(ancestor);
  if (!inside(realpathSync(root), realpathSync(ancestor))) throw new Error(`Symlink leaves repository: ${relative}`);
  return absolute;
}

export function parseTopicArgs(args, extra = {}) {
  const { values, positionals } = parseArgs({ args, allowPositionals: true, options: {
    year: { type: "string" }, subject: { type: "string" }, topic: { type: "string" },
    builder: { type: "string" }, export: { type: "string" }, help: { type: "boolean", short: "h" }, ...extra,
  } });
  if (positionals.length) throw new Error(`Unexpected arguments: ${positionals.join(" ")}`);
  if (values.help) return values;
  if (!/^[1-6]$/.test(values.year ?? "")) throw new Error("--year must be 1–6");
  if (!/^[a-z][a-z0-9-]*$/.test(values.subject ?? "")) throw new Error("--subject must be a subject id (e.g. math)");
  if (values.all && values.topic) throw new Error("Choose --all or --topic, not both");
  if (!values.all && !/^[a-z0-9]+(?:-+[a-z0-9]+)*$/.test(values.topic ?? "")) throw new Error("--topic must be an existing curriculum topic id");
  if (values.export && !values.builder) throw new Error("--export requires --builder");
  return { ...values, year: Number(values.year), topicId: values.topic, exportName: values.export };
}

export function wrapperPaths({ year, subject, topicId }) {
  const directory = `src/pages/skills/${subject}/challenges/year${year}/${topicId}`;
  return [1, 2, 3, 4].map((level) => `${directory}/${pascalTopicId(topicId)}Challenge${level}.jsx`);
}

export async function loadTopic({ root = REPO_ROOT, year, subject, topicId }) {
  const registry = await import(pathToFileURL(repoPath(root, "src/data/curriculumRegistry.js")).href);
  const curriculum = registry.loadCurriculum(year, subject);
  if (!curriculum) throw new Error(`No registered Year ${year} ${subject} curriculum. Register its dataset and statutory mapping first.`);
  const matches = curriculum.flatMap((category) => category.topics.filter((topic) => topic.id === topicId).map((topic) => ({ category, topic })));
  if (matches.length !== 1) throw new Error(`Expected one topic ${topicId} in Year ${year} ${subject}; found ${matches.length}`);
  const { topic, category } = matches[0];
  if (toKebabCase(topic.name) !== topicId) throw new Error("Topic title and stored id differ; resolve the identity explicitly before scaffolding");
  if (JSON.stringify(topic.challenges.map((c) => c.id)) !== "[1,2,3,4]") throw new Error("Topic must have challenge slots 1–4");
  return { root, year, subject, topicId, topic, category, wrappers: wrapperPaths({ year, subject, topicId }) };
}

export async function courseTopicIds({ root = REPO_ROOT, year, subject }) {
  const registry = await import(pathToFileURL(repoPath(root, "src/data/curriculumRegistry.js")).href);
  const curriculum = registry.loadCurriculum(year, subject);
  if (!curriculum) throw new Error(`No registered Year ${year} ${subject} curriculum`);
  const ids = curriculum.flatMap((category) => category.topics.map((topic) => topic.id));
  if (!ids.length || new Set(ids).size !== ids.length) throw new Error("Course must have topics with unique ids");
  return ids;
}

export async function lessonContext(info) {
  const index = "src/data/lessons/index.js";
  if (!existsSync(repoPath(info.root, index))) return { slots: 0, paths: [] };
  const { getLesson } = await import(pathToFileURL(repoPath(info.root, index)).href);
  const slots = [1, 2, 3, 4].filter((level) => getLesson(info.subject, info.year, info.topicId, level)).length;
  const directory = `src/data/lessons/${info.subject}/year${info.year}`;
  const paths = [index];
  if (existsSync(repoPath(info.root, directory))) {
    for (const file of readdirSync(repoPath(info.root, directory))) {
      if (!file.endsWith(".js") || file.endsWith(".test.js")) continue;
      const relative = `${directory}/${file}`;
      const source = readFileSync(repoPath(info.root, relative), "utf8");
      if (file === "index.js" || source.includes(`"${info.topicId}"`) || source.includes(`'${info.topicId}'`)) paths.push(relative);
    }
  }
  return { slots, paths };
}

export function statutoryFile(year, subject) {
  if (subject === "math") return `year-${year}-maths.md`;
  if (subject === "science") return `year-${year}-science.md`;
  if (subject === "english") return year <= 2 ? `year-${year}-english.md` : year <= 4 ? "year-3-and-4-english.md" : "year-5-and-6-english.md";
  if (["history", "geography"].includes(subject)) return `key-stage-${year <= 2 ? 1 : 2}-${subject}.md`;
  const files = { art: "key-stage-2-art-and-design.md", computing: "key-stage-2-computing.md", design: "key-stage-2-design-and-technology.md", french: "key-stage-2-languages.md", music: "key-stage-2-music.md", pe: "key-stage-2-physical-education.md", wellbeing: "primary-relationships-and-health-education.md" };
  return files[subject] ?? null;
}

export function findMapping({ root, year, subject, topicId }) {
  const filename = statutoryFile(year, subject);
  const file = filename && `docs/curriculum/${filename}`;
  if (!file || !existsSync(repoPath(root, file))) return { file, rows: [], metadata: [] };
  const lines = readFileSync(repoPath(root, file), "utf8").split(/\r?\n/);
  const headings = [];
  const rows = [];
  for (let index = 0; index < lines.length; index += 1) {
    const heading = /^(#{1,6})\s+(.+)/.exec(lines[index]);
    if (heading) {
      while (headings.length && headings.at(-1).level >= heading[1].length) headings.pop();
      headings.push({ level: heading[1].length, text: heading[2] });
    }
    if (!lines[index].startsWith("|")) continue;
    const cells = lines[index].split("|").map((cell) => cell.trim().replace(/\*\*/g, ""));
    if (!lines[index].includes(`\`${topicId}\``) && !cells.some((cell) => toKebabCase(cell) === topicId)) continue;
    const yearHeading = headings.map((h) => h.text).filter((text) => /\byears?\b/i.test(text)).at(-1);
    if (yearHeading) {
      const years = [...yearHeading.matchAll(/\b[1-6]\b/g)].map((match) => Number(match[0]));
      if (years.length && !years.includes(Number(year))) continue;
    }
    rows.push({ line: index + 1, text: lines[index], heading: headings.map((h) => h.text).join(" > ") });
  }
  // Source metadata only; the original statutory document remains authoritative.
  const metadata = lines.slice(0, 24).filter((line) => /^\s*(?:>\s*)?(?:\*\*)?(?:source|retrieved|checked)\b/i.test(line));
  return { file, rows, metadata };
}

export function relatedTests({ root, year, subject }) {
  const result = [];
  for (const directory of ["src/data", "tests/components"]) {
    const absolute = repoPath(root, directory);
    if (!existsSync(absolute)) continue;
    const prefix = `year${year}${subject}`.toLowerCase();
    for (const name of readdirSync(absolute)) if (name.toLowerCase().startsWith(prefix) && /\.test\.(js|jsx)$/.test(name)) result.push(`${directory}/${name}`);
  }
  return result;
}

export function renderContext(info, mapping, bank, lessons, visual) {
  const dataset = `src/data/year${info.year}${info.subject.charAt(0).toUpperCase() + info.subject.slice(1)}Curriculum.js`;
  const lines = [
    `# Year ${info.year} ${info.subject}: ${info.topic.name}`,
    `Category: ${info.category.title} (\`${info.category.id}\`)`,
    `Permanent topic id: \`${info.topicId}\``, "",
    "## Curriculum boundary (original mapping rows)",
    ...mapping.metadata,
    ...(mapping.rows.length ? mapping.rows.flatMap((row) => [`${mapping.file}:${row.line} — ${row.heading}`, row.text]) : [`MISSING mapping in ${mapping.file ?? "the statutory documents"}. Add it before writing questions.`]), "",
    "## Files",
    ...(existsSync(repoPath(info.root, dataset)) ? [`- Curriculum: ${dataset}`] : []),
    ...info.wrappers.map((file) => `- ${existsSync(repoPath(info.root, file)) ? "Exists" : "Missing"}: ${file}`),
    ...(bank?.paths ?? []).map((file) => `- Bank/recipe: ${file}`),
    ...(lessons?.paths ?? []).map((file) => `- Lesson registration/source: ${file}`),
    ...relatedTests(info).map((file) => `- Test: ${file}`), "",
    ...(lessons ? [`Separate LessonFrame introductions: ${lessons.slots}/4 slots. Subject games may instead provide their own stories/notes; inspect their renderer.`, ""] : []),
    ...(visual ? ["## Built-year visual recipe", ...visual.paths.map((file) => `- ${file}`),
      "Preserve illustrated teaching and question models using this subject's existing approach. Connect the requested year's own banks; never substitute older-year content.",
      "Visuals use visible givens, with the unknown left unknown. A null fallback is not proof that a suitable visual exists.", ""] : []),
    "## Read for this build",
    "- docs/AUTHORING.md",
    "- .claude/skills/building-curriculum-topics/SKILL.md",
    "- docs/VISUAL_RECIPES.md",
    `- ${mapping.file ?? "docs/curriculum/README.md"}: the statutory bullet and relevant notes, not only its mapping row`,
    "- docs/superpowers/templates/topic-brief.md (four teaching goals, boundaries, interactions and review evidence)", "",
    "## Next checks",
    `npm run check:topic -- --year ${info.year} --subject ${info.subject} --topic ${info.topicId}`,
    "npm run lint && npm test && npm run build", "",
    "Automated checks do not certify factual accuracy, teaching quality, physical touch/voice, or visual layout.",
    ...(bank?.limitations ?? []).map((limitation) => `- ${limitation}`),
    ...(!bank ? ["No automatic bank adapter: pass --builder path/to/pure.js --export buildName for seeded bank checks."] : []),
  ];
  return lines.join("\n") + "\n";
}
