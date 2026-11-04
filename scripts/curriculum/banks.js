/** Pure-bank adapters for the authoring CLI. Imports never mount a component. */
import { access, readFile, realpath } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const cap = (value) => value[0].toUpperCase() + value.slice(1);
const pascal = (value) => value.split("-").map(cap).join("");
const exists = async (file) => {
  try { await access(file); return true; }
  catch (error) { if (error.code === "ENOENT") return false; throw error; }
};
const questions = (build) => (level, rng) => {
  const result = build(level, rng);
  const run = Array.isArray(result) ? result : result?.questions;
  if (!Array.isArray(run)) throw new TypeError("Bank builder must return a question array or { questions: array }.");
  return run;
};

/**
 * Return null only when no supported bank is registered. Broken modules and
 * malformed builders throw, so a failed check cannot become a successful skip.
 * Explicit builders execute trusted repository JS; this is not a JS sandbox.
 */
export async function resolveBank({ root, year, subject, topicId, builder, exportName }) {
  root = path.resolve(root);
  year = Number(year);
  const paths = [];
  const limitations = ["Automated bank checks do not certify curriculum accuracy, teaching quality or device layout."];
  const load = async (relative) => {
    paths.push(relative);
    return import(pathToFileURL(path.join(root, relative)).href);
  };
  if (builder !== undefined) {
    if (typeof builder !== "string" || path.isAbsolute(builder) || !/\.[cm]?js$/.test(builder)) throw new Error("--builder must be a repository-relative JavaScript module path.");
    const absolute = path.resolve(root, builder);
    const inside = (base, file) => file.startsWith(base + path.sep);
    if (!inside(root, absolute) || !inside(await realpath(root), await realpath(absolute))) throw new Error("--builder must stay inside the repository.");
    if (!exportName || typeof exportName !== "string") throw new Error("An explicit --builder requires --export with a function name.");
    const module = await load(path.relative(root, absolute));
    if (typeof module[exportName] !== "function") throw new TypeError(`Builder export "${exportName}" is missing or is not a function.`);
    limitations.push("Explicit builder: subject-specific story, source and figure validators were not run.");
    return { build: questions(module[exportName]), titles: module.TITLES, paths, limitations };
  }
  if (exportName !== undefined) throw new Error("--export requires --builder.");
  if (!Number.isInteger(year) || year < 1 || year > 6 || typeof topicId !== "string" || !/^[a-z0-9]+(?:-+[a-z0-9]+)*$/.test(topicId)) return null;
  const authored = `src/data/challenges/authored/year${year}/${subject}/${topicId}.js`;
  if (/^[a-z][a-z0-9-]*$/.test(subject ?? "") && await exists(path.join(root, authored))) {
    const wrapper = `src/pages/skills/${subject}/challenges/year${year}/${topicId}/${pascal(topicId)}Challenge1.jsx`;
    const source = await exists(path.join(root, wrapper)) ? await readFile(path.join(root, wrapper), "utf8") : "";
    const used = [...source.matchAll(/\bimport\s+[^;]+?\s+from\s*["']([^"']+)["']/g)].some(match =>
      path.resolve(root, path.dirname(wrapper), match[1]) === path.join(root, authored));
    if (used) {
      const module = await load(authored);
      const build = module[`build${pascal(topicId)}`];
      if (typeof build !== "function") throw new TypeError(`${authored}: missing generated builder export`);
      limitations.push("Authored data recipe: additional subject-specific story, source and figure checks are not supplied by this generic bank.");
      return { build: questions(build), minQuestions: 5, paths, limitations };
    }
  }
  if (subject === "english") {
    // Dictation uses its memory-game response model, not DataChallenge kinds.
    if (topicId === "dictation") return null;
    const relative = `src/data/challenges/english/year${year}${pascal(topicId)}.js`;
    if (!await exists(path.join(root, relative))) return null;
    const module = await load(relative);
    const candidates = Object.entries(module).filter(([name, value]) => /^build[A-Z]/.test(name) && typeof value === "function");
    if (candidates.length !== 1) return null;
    limitations.push("English adapter checks the pure question builder; passage accuracy and subject-specific pedagogy need review.");
    const result = { build: questions(candidates[0][1]), titles: module.TITLES, paths, limitations };
    if (year === 5 && topicId === "homophones-and-confusing-words") {
      // Match the existing Year 5 suite's narrow statutory licence/license
      // exception. Do not suppress other spelling or structural problems.
      result.filterLintProblems = (problems) => problems.filter((problem) => !problem.endsWith("US spelling: license"));
    }
    return result;
  }
  const supported = new Set(["math", "science", "history", "geography", "art", "french", "computing", "music", "design", "pe", "wellbeing"]);
  if (!supported.has(subject)) return null;
  const prefix = `YEAR${year}_${subject.toUpperCase()}`;
  const base = ["history", "geography"].includes(subject)
    ? `src/data/challenges/${subject}/year${year}`
    : `src/data/challenges/year${year}${cap(subject)}`;
  const mathFile = `${base}/questions.js`;
  if (subject === "math" && await exists(path.join(root, mathFile))) {
    const module = await load(mathFile);
    let key = topicId;
    if (!module.TOPIC_KEYS?.includes(key)) {
      // Maths wrappers map curriculum IDs to short internal bank keys.
      const wrapper = `src/pages/skills/math/challenges/year${year}/${topicId}/${pascal(topicId)}Challenge1.jsx`;
      if (!await exists(path.join(root, wrapper))) return null;
      const source = await readFile(path.join(root, wrapper), "utf8");
      key = source.match(new RegExp(`<Year${year}MathGame\\b[^>]*\\btopic=["']([^"']+)["']`))?.[1];
      if (!module.TOPIC_KEYS?.includes(key)) return null;
      paths.push(wrapper);
    }
    const build = module[`buildYear${year}Math`];
    if (typeof build !== "function") throw new TypeError(`Missing buildYear${year}Math function.`);
    limitations.push("Maths checks cover common question structure; custom maths answer acceptance and interactive controls still require subject tests/playthroughs.");
    return { build: questions((level, rng) => build(key, level, rng)), titles: [1, 2, 3, 4].map(level => module.titleFor?.(key, level) ?? module.TITLES?.[level - 1]), minQuestions: 5, paths, limitations };
  }
  const index = `${base}/index.js`;
  if (!await exists(path.join(root, index))) return null;
  const module = await load(index);
  const rawBuild = module[`${prefix}_BUILDERS`]?.[topicId];
  if (rawBuild === undefined) return null;
  if (typeof rawBuild !== "function") throw new TypeError(`${prefix}_BUILDERS[${topicId}] is not a function.`);
  const result = { build: questions(rawBuild), titles: module[`${prefix}_TITLES`], paths, limitations };
  const topic = module[`${prefix}_TOPICS`]?.[topicId];
  if (["history", "geography"].includes(subject)) {
    const engine = await load(`src/data/challenges/${subject}/engine.js`);
    const manifestPath = `src/assets/${subject}/manifest.json`;
    paths.push(manifestPath);
    const { images } = JSON.parse(await readFile(path.join(root, manifestPath), "utf8"));
    if (!images || typeof images !== "object" || Array.isArray(images)) throw new TypeError(`${manifestPath} needs an images registry.`);
    let sources;
    if (subject === "geography") sources = (await load("src/data/challenges/geography/allSources.js")).ALL_GEOGRAPHY_SOURCES;
    result.titles = subject === "history" ? engine.HISTORY_TITLES[year] : engine.GEOGRAPHY_TITLES;
    result.minQuestions = (subject === "history" ? engine.HISTORY_AGE : engine.GEOGRAPHY_AGES)[year]?.rounds;
    result.validate = async () => {
      const problems = subject === "history" ? engine.lintHistoryTopic(topic, { images }) : engine.lintGeographyTopic(topic, sources, images);
      const ids = new Set();
      const visit = (value) => {
        if (!value || typeof value !== "object") return;
        if (typeof value.image === "string") ids.add(value.image);
        for (const child of Object.values(value)) visit(child);
      };
      visit(topic);
      for (const id of ids) {
        const file = images[id]?.file;
        if (!file) continue; // The existing topic lint reports unknown IDs.
        const assetRoot = path.join(root, `src/assets/${subject}`, subject === "history" ? "images" : "");
        const absolute = path.resolve(assetRoot, file);
        if (!absolute.startsWith(assetRoot + path.sep) || !await exists(absolute)) problems.push(`Image ${id}: missing or invalid local asset ${file}`);
      }
      return problems;
    };
    limitations.push("Source references and local images are checked against repository registries; external URLs and image content were not fetched or reviewed.");
  } else if (year === 5 && topic) {
    const typesModule = await load(`${base}/visualTypes.js`);
    const types = typesModule.VISUAL_TYPES ?? typesModule[`${prefix}_VISUAL_TYPES`];
    const rules = module[`${prefix}_FIGURE_RULES`];
    if (rules) {
      const { checkFigures } = await load("src/data/challenges/figures.js");
      result.validate = () => checkFigures({ topics: { [topicId]: topic }, builders: { [topicId]: rawBuild }, rulesByTopic: { [topicId]: rules[topicId] }, types });
    } else {
      const { allVisuals } = await load("src/data/challenges/year5Creative/visuals.js");
      result.validate = () => allVisuals(topic).flatMap(([where, visual]) => {
        const problems = [];
        if (!types.includes(visual?.type)) problems.push(`${topicId}/${where}: missing or unknown visual type ${visual?.type}`);
        const kinds = typesModule[`${prefix}_PICTURE_KINDS`];
        if (kinds && ["artwork", "picture"].includes(visual?.type) && !kinds.includes(visual.kind)) problems.push(`${topicId}/${where}: unknown picture kind ${visual.kind}`);
        if (kinds && visual?.type === "gallery" && visual.items.some(item => !kinds.includes(item.kind))) problems.push(`${topicId}/${where}: unknown gallery picture kind`);
        if (visual?.type === "pitch" && !typesModule[`${prefix}_SPORTS`]?.includes(visual.sport)) problems.push(`${topicId}/${where}: unknown sport ${visual.sport}`);
        return problems;
      });
      limitations.push("Creative-subject figure checks cover registered types and picture kinds; rendering and visual teaching quality require review.");
    }
  } else limitations.push("No additional subject-specific story, source or figure validator is available through this adapter.");
  return result;
}
