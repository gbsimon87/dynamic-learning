// Printable review pack for curriculum introductions and quiz items, for an
// owner or teacher content review before the journey flags are switched on:
//   npm run journey:review -- --year 3 --subject math   (one pathway)
//   npm run journey:review -- --all                     (every built pathway + index)
// Writes self-contained HTML to .superpowers/journey-review/ (gitignored) or
// --out DIR. Shows every candidate item with its answer, explanation, spoken
// text and practice link, plus tick boxes. Pictures are listed by their text
// equivalent: check how they look in the app (flags are on in development).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parseArgs } from "node:util";
import { CURRICULUM_JOURNEY_MANIFEST } from "../../shared/curriculumJourneyManifest.js";
import { loadCurriculumAssessmentBank } from "../../shared/curriculumAssessments/index.js";
import { loadCurriculumIntroductions } from "../../src/data/curriculumIntroductions/index.js";
import { getSubjectName, loadCurriculum } from "../../src/data/curriculumRegistry.js";
import { assessmentReadAloud, introductionReadAloud } from "../../src/data/curriculumJourney.js";
import { REPO_ROOT } from "./topics.js";

const { values } = parseArgs({ options: { year: { type: "string" }, subject: { type: "string" }, all: { type: "boolean" }, out: { type: "string" } } });
const outDir = values.out ?? join(REPO_ROOT, ".superpowers/journey-review");

const esc = (text) => String(text ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const marked = (text) => esc(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
const fileName = ({ year, subject }) => `year${year}-${subject}.html`;
const KIND = { choice: "Choose one", number: "Type a number", text: "Type a word", order: "Put in order", sort: "Sort",
  fractionShade: "Shade a fraction", numberTrack: "Mark on a track" };

function modelLine(model) {
  if (!model) return "";
  return `<p class="model"><b>Picture (${esc(model.renderer)}):</b> ${esc(model.alt)}</p>`;
}

function introBlock(label, intro, subject) {
  return `<section class="intro"><h4>${esc(label)}: ${esc(intro.title)}</h4>
<ul>${intro.learning.map((line) => `<li>${esc(line)}</li>`).join("")}</ul>
<p><b>Use:</b> ${esc(intro.usefulness)}</p><p><b>Example:</b> ${esc(intro.example.text)}</p>${modelLine(intro.example.model)}
<p class="say"><b>Read aloud:</b> ${esc(introductionReadAloud(intro, subject))}</p>${ticks()}</section>`;
}

function ticks() {
  return `<p class="ticks">☐ Correct and clear &nbsp; ☐ Needs a change: <span class="line"></span></p>`;
}

function answerBlock(item) {
  const { input } = item.public;
  if (input.kind === "choice") {
    return `<ul class="options">${input.options.map((o) => `<li${o.label === item.review.answerText ? ' class="right"' : ""}>${marked(o.label)}</li>`).join("")}</ul>`;
  }
  return `<p class="answer"><b>Answer:</b> ${esc(item.review.answerText)}</p>`;
}

function itemBlock(item, number, subject, challengeTitle) {
  const { prompt, evidence, model, input } = item.public;
  const spoken = assessmentReadAloud(item, subject);
  return `<article class="item"><h5>${number}. ${marked(prompt)} <span class="kind">${KIND[input.kind] ?? input.kind}</span></h5>
${evidence.map((card) => `<blockquote>${card.title ? `<b>${esc(card.title)}</b><br>` : ""}${esc(card.text).replace(/\n/g, "<br>")}${card.credit ? `<br><i>${esc(card.credit)}</i>` : ""}</blockquote>`).join("")}
${modelLine(model)}${answerBlock(item)}
<p><b>Why:</b> ${esc(item.review.explanation)}</p>
<p class="meta">Read aloud: ${spoken ? esc(spoken) : "<i>none</i>"} · Practice: challenge ${item.practice.challengeId}${challengeTitle ? ` “${esc(challengeTitle)}”` : ""} · ID ${esc(item.id)}</p>
${ticks()}</article>`;
}

async function pathwayPage(pathway) {
  const { year, subject } = pathway;
  const [bank, intros] = await Promise.all([loadCurriculumAssessmentBank(year, subject), loadCurriculumIntroductions(year, subject)]);
  const curriculum = loadCurriculum(year, subject);
  const name = `Year ${year} ${getSubjectName(subject)}`;
  let body = introBlock("Subject introduction", intros.subjectIntroduction, subject);
  let count = 0;
  for (const quest of pathway.categories) {
    const data = curriculum.find((c) => c.id === quest.id);
    body += `<h2>${esc(data.title)}</h2>${introBlock("Quest introduction", intros.quests[quest.id].introduction, subject)}`;
    for (const topic of quest.topics) {
      const t = data.topics.find((x) => x.id === topic.id);
      const items = bank.items.filter((item) => item.categoryId === quest.id && item.topicId === topic.id);
      const source = items[0]?.sourceRefs?.[0];
      body += `<section class="topic"><h3>${esc(t.name)}</h3>
<p class="meta">Objective: ${esc(items[0]?.objective)}${source ? ` · Statutory source: ${esc(source.path)}${source.heading ? ` (${esc(source.heading)})` : ""}` : ""}</p>
${introBlock("Topic introduction", intros.quests[quest.id].topics[topic.id], subject)}
${items.map((item, i) => itemBlock(item, i + 1, subject, t.challenges.find((c) => Number(c.id) === item.practice.challengeId)?.title)).join("")}</section>`;
      count += items.length;
    }
  }
  const html = `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(name)} quiz review</title><style>${CSS}</style></head><body>
<header><h1>${esc(name)}: introductions and quiz review</h1>
<p>${count} quiz items in ${pathway.categories.length} quests. A quest quiz uses one item per topic; the final test two per quest. Every item here can appear.
Check each answer, wrong option, explanation and spoken text; look at pictures in the app. Reviewer: <span class="line"></span> Date: <span class="line short"></span></p></header>
${body}</body></html>`;
  return { html, count };
}

const CSS = `body{font:15px/1.45 system-ui,sans-serif;max-width:900px;margin:0 auto;padding:16px;color:#1d1d1f;background:#fff}
h1{font-size:1.5rem}h2{margin-top:2rem;border-bottom:2px solid #333;page-break-before:always}h3{margin:1.5rem 0 .25rem}
h4,h5{margin:.25rem 0;font-size:1rem}.intro{background:#f3f6fb;padding:8px 12px;border-radius:6px;margin:8px 0}
.item{border-top:1px solid #ccc;padding:8px 0;break-inside:avoid}.kind{font-weight:normal;font-size:.8rem;color:#555;border:1px solid #bbb;border-radius:4px;padding:0 4px}
.options li.right{font-weight:bold}.options li.right::after{content:" ✓ correct"}.meta,.say,.model{font-size:.85rem;color:#444}
blockquote{margin:4px 0;padding:4px 10px;border-left:3px solid #999;background:#fafafa}.ticks{font-size:.85rem}
.line{display:inline-block;min-width:18em;border-bottom:1px solid #777}.line.short{min-width:7em}
p,ul{margin:.25rem 0}@media print{body{font-size:11pt;max-width:none}.intro{background:none;border:1px solid #ccc}}`;

const pathways = values.all ? CURRICULUM_JOURNEY_MANIFEST
  : CURRICULUM_JOURNEY_MANIFEST.filter((p) => p.year === Number(values.year) && p.subject === values.subject);
if (!pathways.length) { console.error("Unknown or unbuilt pathway. Use --year N --subject ID, or --all"); process.exit(1); }
mkdirSync(outDir, { recursive: true });
const index = [];
for (const pathway of pathways) {
  const { html, count } = await pathwayPage(pathway);
  writeFileSync(join(outDir, fileName(pathway)), html);
  index.push(`<li><a href="${fileName(pathway)}">Year ${pathway.year} ${esc(getSubjectName(pathway.subject))}</a> (${count} items)</li>`);
  console.log(`${fileName(pathway)}: ${count} items`);
}
if (values.all) {
  writeFileSync(join(outDir, "index.html"), `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><title>Quiz review packs</title><style>${CSS}</style></head><body><h1>Curriculum quiz review packs</h1><ul>${index.join("")}</ul></body></html>`);
}
console.log(`Written to ${outDir}`);
