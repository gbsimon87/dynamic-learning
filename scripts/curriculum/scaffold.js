import { closeSync, existsSync, mkdirSync, openSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { findMapping, pascalTopicId, repoPath } from "./topics.js";
import { visualRecipe } from "./visualRecipes.js";
import { seededRng } from "../../src/data/challenges/questionKinds.js";

const relativeImport = (from, to) => {
  const relative = path.relative(path.dirname(from), to).split(path.sep).join("/");
  return relative.startsWith(".") ? relative : `./${relative}`;
};

export async function planScaffold(info, { builder, exportName, game, topicProp = "topicId", topicKey } = {}) {
  if (builder && game) throw new Error("Choose --builder (DataChallenge) or --game (existing subject renderer)");
  if (topicKey !== undefined && !game) throw new Error("--topic-key requires --game");
  const gameTopic = topicKey ?? info.topicId;
  const mapping = findMapping(info);
  if (!mapping.rows.length) throw new Error(`Missing statutory mapping in ${mapping.file ?? "docs/curriculum"}; add the topic row first`);
  const recipe = visualRecipe(info);
  if (!game && !recipe.genericVisual) throw new Error(`Use --game with the ${info.subject} subject adapter to preserve its illustrated introductions and question visuals. See docs/VISUAL_RECIPES.md.`);
  if (!game && !existsSync(repoPath(info.root, recipe.genericVisual))) throw new Error(`Missing shared visual renderer: ${recipe.genericVisual}`);
  const files = new Map();
  const stem = `src/data/challenges/authored/year${info.year}/${info.subject}/${info.topicId}`;
  const bankFile = builder ?? `${stem}.js`;
  const buildName = `build${pascalTopicId(info.topicId)}`;
  if (builder) {
    if (!exportName || !/^[A-Za-z_$][\w$]*$/.test(exportName)) throw new Error("--builder requires --export with the function's name");
    const module = await import(pathToFileURL(repoPath(info.root, builder)).href);
    if (typeof module[exportName] !== "function") throw new Error(`${builder} does not export function ${exportName}`);
    for (const level of [1, 2, 3, 4]) {
      const questions = module[exportName](level, seededRng(1));
      if (!Array.isArray(questions)) throw new Error("--builder must return a question array for DataChallenge. Use --game for story/envelope builders so their teaching frame is preserved.");
      if (questions.some((question) => question?.maths || question?.interaction)) throw new Error("This builder needs subject-specific answer checking or interactive controls. Use --game to preserve them.");
    }
  }
  if (game) {
    const source = readFileSync(repoPath(info.root, game), "utf8");
    if (!/export\s+default\b/.test(source)) throw new Error("--game must have a default component export");
    if (!/^[A-Za-z_$][\w$]*$/.test(topicProp)) throw new Error("--topic-prop must be a JSX prop name");
    if (["onComplete", "level", "key", "ref", "children"].includes(topicProp)) throw new Error("--topic-prop must not override the game contract");
  }
  if (!builder && !game) {
    const helper = relativeImport(bankFile, "src/data/challenges/topicBank.js");
    files.set(bankFile, `import { buildTopic } from ${JSON.stringify(helper)};

// Author inside the statutory boundary in ${mapping.file}.
// Keep at least 15 distinct templates per slot; use ch/bd/od/st/etc. from topicBank.js.
// Empty levels deliberately fail validation until real teaching content is written.
export const topic = {
  rule: "",
  hint: "",
  levels: { 1: [], 2: [], 3: [], 4: [] },
};
export const ${buildName} = buildTopic(topic);
`);
    const testFile = `${stem}.test.js`;
    const validator = relativeImport(testFile, "src/data/challenges/questionKinds.js");
    files.set(testFile, `import test from "node:test";
import assert from "node:assert/strict";
import { ${buildName}, topic } from ${JSON.stringify(relativeImport(testFile, bankFile))};
import { lintBuild } from ${JSON.stringify(validator)};

test(${JSON.stringify(`${info.topic.name}: four complete question banks`)}, () => {
  for (const level of [1, 2, 3, 4]) assert.ok(topic.levels[level].length >= 15, \`slot \${level} needs 15 templates\`);
  assert.deepEqual(lintBuild(${buildName}, { year: ${info.year}, minQuestions: 5 }), []);
});
`);
  }
  for (const [index, file] of info.wrappers.entries()) {
    const level = index + 1;
    if (game) {
      files.set(file, `import TopicGame from ${JSON.stringify(relativeImport(file, game))};

export default function Challenge({ onComplete }) {
  return <TopicGame ${topicProp}={${JSON.stringify(gameTopic)}} level={${level}} onComplete={onComplete} />;
}
`);
    } else {
      const renderer = relativeImport(file, "src/components/challenge/data/DataChallenge.jsx");
      const titles = relativeImport(file, "src/data/challenges/topicBank.js");
      const visual = relativeImport(file, recipe.genericVisual);
      const bankImport = JSON.stringify(relativeImport(file, bankFile));
      const builderImport = !builder ? `import { ${buildName} } from ${bankImport};`
        : exportName === "default" ? `import ${buildName} from ${bankImport};`
          : `import { ${exportName} as ${buildName} } from ${bankImport};`;
      files.set(file, `import DataChallenge from ${JSON.stringify(renderer)};
import { TITLES } from ${JSON.stringify(titles)};
import QuestionVisual from ${JSON.stringify(visual)};
${builderImport}

export default function Challenge({ onComplete }) {
  return <DataChallenge level={${level}} build={${buildName}} titles={TITLES} renderVisual={question => <QuestionVisual question={question} />} illustrate onComplete={onComplete} />;
}
`);
    }
  }
  const brief = `docs/authoring/year${info.year}-${info.subject}-${info.topicId}.md`;
  files.set(brief, `# ${info.topic.name} — Year ${info.year} ${info.subject}

Status: scaffold only; content, interactions, layout and device checks pending.
Permanent category/topic: \`${info.category.id}\` / \`${info.topicId}\`.

## Curriculum boundary

Source: ${mapping.file}. Read the original statutory bullet and notes there.
${mapping.rows.map((row) => row.text).join("\n")}

## Teaching plan (complete before writing questions)

| Slot | Learning goal and Bix's explanation | Interaction | Evidence the learner can use | Misconception and hint |
|---|---|---|---|---|
| 1 | To author | To choose | To author | To author |
| 2 | To author | To choose | To author | To author |
| 3 | To author | To choose | To author | To author |
| 4 | To author | To choose | To author | To author |

Content exclusions, factual sources and sound-off path: to author.

## Visual teaching recipe

Use the existing built-year approach for the same subject and interaction.
References${recipe.referenceYear ? ` (Year ${recipe.referenceYear})` : ""}:
${recipe.paths.map((file) => `- ${file}`).join("\n")}

For each slot, specify the illustrated teaching example and the question's model,
diagram, source picture or pictured interaction. Keep the same representation in
the explanation and task. Connect the new topic's own banks; references are not
registrations. Visuals show visible givens, not hidden answers, hint text or bin
assignments. Use accessible text equivalents, both themes and touch controls.
Shared Math/English visual fallbacks may return null: add an authored visual when
the teaching needs a representation the fallback does not support. Record any
deliberate text-only assessment, such as hidden dictation, and its reason.

## Verification record

- [ ] Four slots teach the mapped requirement with age-appropriate variety.
- [ ] Explanations teach what the questions ask; wrong options are clearly wrong.
- [ ] Illustrated introduction, worked example and question visuals preserve the built-year recipe; given quantities/labels agree and hidden answers are not exposed.
- [ ] Pure bank checks and real-control playthrough (wrong answer, hint, retry, completion once).
- [ ] npm run lint; npm test; npm run build.
- [ ] Layout/drag/browser checks where needed: record topics, sizes, both themes and omissions.
- [ ] Physical-device speech/touch and owner/child feedback, where still outstanding.

Builder: ${game ?? bankFile}${game ? ` (${topicProp}=${gameTopic})` : ` export ${exportName ?? buildName}`}.
${game ? "" : `Focused check: npm run check:topic -- --year ${info.year} --subject ${info.subject} --topic ${info.topicId} --builder ${bankFile} --export ${exportName ?? buildName}\n`}
Read docs/AUTHORING.md for the full workflow. This scaffold does not register lessons,
certificate lines or award inclusion, and does not establish teaching quality.
`);
  // Preflight the entire batch before writing a single byte.
  for (const file of files.keys()) {
    if (existsSync(repoPath(info.root, file))) throw new Error(`Refusing to overwrite ${file}`);
  }
  return files;
}

export function writeScaffold(root, files, { write = writeFileSync } = {}) {
  for (const file of files.keys()) if (existsSync(repoPath(root, file))) throw new Error(`Refusing to overwrite ${file}`);
  const written = [];
  try {
    for (const [file, content] of files) {
      const absolute = repoPath(root, file);
      mkdirSync(path.dirname(absolute), { recursive: true });
      const descriptor = openSync(absolute, "wx");
      written.push(absolute);
      try { write(descriptor, content); }
      finally { closeSync(descriptor); }
    }
  } catch (error) {
    for (const file of written.reverse()) unlinkSync(file);
    throw error;
  }
}
