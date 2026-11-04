import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
import { transformWithEsbuild } from "vite";
import { lintBuild, seededRng } from "../../src/data/challenges/questionKinds.js";
import { findMapping, repoPath } from "./topics.js";

export async function checkWrappers(info) {
  const problems = [];
  for (const file of info.wrappers) {
    const absolute = repoPath(info.root, file);
    if (!existsSync(absolute)) { problems.push(`Missing loader module: ${file}`); continue; }
    try {
      const source = readFileSync(absolute, "utf8");
      const { code } = await transformWithEsbuild(source, absolute, { loader: "jsx", jsx: "automatic" });
      if (!/export\s+default\b|export\s*\{[^}]*\bas\s+default\b/.test(code)) problems.push(`${file}: no default export`);
      for (const match of code.matchAll(/\b(?:import|export)\s+(?:[^'";]+?\s+from\s*)?["']([^"']+)["']/g)) {
        if (!match[1].startsWith(".")) continue;
        const base = path.resolve(path.dirname(absolute), match[1].split("?")[0]);
        const relative = path.relative(info.root, base);
        repoPath(info.root, relative);
        if (![base, `${base}.js`, `${base}.jsx`, path.join(base, "index.js"), path.join(base, "index.jsx")].some(existsSync)) problems.push(`${file}: missing relative import ${match[1]}`);
      }
    } catch (error) { problems.push(`${file}: ${error.message}`); }
  }
  return problems;
}

export async function checkBank(bank, { year, seeds = 50 }) {
  const problems = [];
  if (bank.validate) {
    try { problems.push(...await bank.validate()); }
    catch (error) { problems.push(`Subject validator failed: ${error.message}`); }
  }
  try {
    const lintProblems = lintBuild(bank.build, { year, titles: bank.titles, seeds, minQuestions: bank.minQuestions ?? 3 });
    problems.push(...(bank.filterLintProblems ? bank.filterLintProblems(lintProblems) : lintProblems));
    for (const level of [1, 2, 3, 4]) {
      for (let seed = 1; seed <= seeds; seed += 1) {
        const first = structuredClone(bank.build(level, seededRng(seed)));
        const second = bank.build(level, seededRng(seed));
        if (!isDeepStrictEqual(first, second)) {
          problems.push(`level ${level}, seed ${seed}: builder ignores its deterministic rng or mutates its bank`);
          break;
        }
      }
    }
  } catch (error) { problems.push(`Bank generation failed: ${error.message}`); }
  return [...new Set(problems)];
}

export async function checkTopic(info, bank, { structureOnly = false, seeds = 50 } = {}) {
  if (!Number.isInteger(seeds) || seeds < 1 || seeds > 1000) throw new Error("--seeds must be an integer from 1 to 1000");
  const mapping = findMapping(info);
  const problems = [];
  if (!mapping.rows.length) problems.push(`No statutory mapping row in ${mapping.file ?? "docs/curriculum"}`);
  problems.push(...await checkWrappers(info));
  const limitations = [
    "Wrapper JSX syntax and immediate relative imports checked; runtime retry, hints and completion still require component tests.",
    "Factual accuracy, curriculum coverage, lesson/question alignment and actual layout/touch/voice are not certified by this command.",
  ];
  if (structureOnly) limitations.push("STRUCTURE ONLY: all bank and subject-specific validation was deliberately skipped.");
  else if (!bank) problems.push("No supported bank adapter. Use --builder PATH --export NAME, or --structure-only for an explicitly limited structural check.");
  else {
    problems.push(...await checkBank(bank, { year: info.year, seeds }));
    limitations.push(...bank.limitations);
  }
  return { status: problems.length ? "fail" : structureOnly ? "structure-only" : "pass", year: info.year, subject: info.subject, topicId: info.topicId, seeds: structureOnly || !bank ? 0 : seeds, problems: [...new Set(problems)], limitations: [...new Set(limitations)] };
}
