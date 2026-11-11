import { paperQuestion, essential, seededPaper, cleanPaperPrompt } from "./paperQuestions.js";
import { buildAOrAnQuestions } from "../challenges/english/aOrAn.js";
import { buildAddingPrefixesQuestions } from "../challenges/english/addingPrefixes.js";
import { buildAskingQuestionsQuestions } from "../challenges/english/askingQuestionsAboutAText.js";
import { buildFeelingsQuestions } from "../challenges/english/charactersFeelings.js";
import { buildConjunctionQuestions } from "../challenges/english/conjunctions.js";
import { buildDictationQuestions } from "../challenges/english/dictation.js";
import { buildDoesItMakeSenseQuestions } from "../challenges/english/doesItMakeSense.js";
import { buildDoublingQuestions } from "../challenges/english/doublingBeforeASuffix.js";
import { buildExceptionWordsQuestions } from "../challenges/english/exceptionWords.js";
import { buildFairyStoriesQuestions } from "../challenges/english/fairyStoriesMythsAndLegends.js";
import { buildFindingInformationQuestions } from "../challenges/english/findingInformation.js";
import { buildHeadingQuestions } from "../challenges/english/headingsAndSubHeadings.js";
import { buildHomophoneQuestions } from "../challenges/english/homophones.js";
import { buildInvertedCommasQuestions } from "../challenges/english/invertedCommas.js";
import { buildKindsOfWritingQuestions } from "../challenges/english/kindsOfWriting.js";
import { buildParagraphQuestions } from "../challenges/english/paragraphs.js";
import { buildPoetryFormsQuestions } from "../challenges/english/poetryForms.js";
import { buildPredictingQuestions } from "../challenges/english/predictingWhatHappensNext.js";
import { buildProofreadingQuestions } from "../challenges/english/proofreading.js";
import { buildRootWordsQuestions } from "../challenges/english/rootWords.js";
import { buildStoryQuestions } from "../challenges/english/settingsCharactersAndPlot.js";
import { buildSuperAntiAutoQuestions } from "../challenges/english/thePrefixesSuperAntiAndAuto.js";
import { buildPresentPerfectQuestions } from "../challenges/english/thePresentPerfect.js";
import { buildSuffixQuestions } from "../challenges/english/theSuffixesAtionAndLy.js";
import { buildTheSureAndTureEndingsQuestions } from "../challenges/english/theSureAndTureEndings.js";
import { buildTimeAndCauseQuestions } from "../challenges/english/timeAndCauseWords.js";
import { buildTrickySoundsYAndOuQuestions } from "../challenges/english/trickySoundsYAndOu.js";
import { buildUsingADictionaryQuestions } from "../challenges/english/usingADictionary.js";
import { buildWordFamilyQuestions } from "../challenges/english/wordFamilies.js";
import { buildWordsInContextQuestions } from "../challenges/english/wordsInContext.js";
import { buildWordsOftenMisspeltQuestions } from "../challenges/english/wordsOftenMisspelt.js";
import { buildSparkWordsQuestions } from "../challenges/english/wordsThatSparkTheImagination.js";

export const ENGLISH_BUILDERS = {
  "a-or-an": buildAOrAnQuestions,
  "adding-prefixes": buildAddingPrefixesQuestions,
  "asking-questions-about-a-text": buildAskingQuestionsQuestions,
  "characters-feelings": buildFeelingsQuestions,
  "conjunctions": buildConjunctionQuestions,
  "dictation": buildDictationQuestions,
  "does-it-make-sense": buildDoesItMakeSenseQuestions,
  "doubling-before-a-suffix": buildDoublingQuestions,
  "exception-words": buildExceptionWordsQuestions,
  "fairy-stories-myths-and-legends": buildFairyStoriesQuestions,
  "finding-information": buildFindingInformationQuestions,
  "headings-and-sub-headings": buildHeadingQuestions,
  "homophones": buildHomophoneQuestions,
  "inverted-commas": buildInvertedCommasQuestions,
  "kinds-of-writing": buildKindsOfWritingQuestions,
  "paragraphs": buildParagraphQuestions,
  "poetry-forms": buildPoetryFormsQuestions,
  "predicting-what-happens-next": buildPredictingQuestions,
  "proofreading": buildProofreadingQuestions,
  "root-words": buildRootWordsQuestions,
  "settings-characters-and-plot": buildStoryQuestions,
  "the-prefixes-super-anti-and-auto": buildSuperAntiAutoQuestions,
  "the-present-perfect": buildPresentPerfectQuestions,
  "the-suffixes-ation-and-ly": buildSuffixQuestions,
  "the-sure-and-ture-endings": buildTheSureAndTureEndingsQuestions,
  "time-and-cause-words": buildTimeAndCauseQuestions,
  "tricky-sounds-y-and-ou": buildTrickySoundsYAndOuQuestions,
  "using-a-dictionary": buildUsingADictionaryQuestions,
  "word-families": buildWordFamilyQuestions,
  "words-in-context": buildWordsInContextQuestions,
  "words-often-misspelt": buildWordsOftenMisspeltQuestions,
  "words-that-spark-the-imagination": buildSparkWordsQuestions,
};
const words = (value) => Array.isArray(value) ? value.join(" ") : value;
const labelFor = (list, id) => list.find((item) => item.id === id)?.label ?? id;
function passageLines(passage) {
  if (!passage) return [];
  return (passage.blocks ?? passage.paragraphs ?? []).flatMap((block) => typeof block === "string" ? [block] : block.text ? [`${block.label ? `${block.label}: ` : ""}${block.text}`] : block.lines ?? []);
}
function adapt(topic, level, q) {
  let prompt = q.prompt ?? q.q, answer = q.answer ?? q.correct, reason = "", lines = [], teacherScript = null;
  const options = Array.isArray(q.options) && q.options.every((item) => typeof item === "string") ? [...q.options].sort((a, b) => a.localeCompare(b, "en")) : [];
  if (q.passage) lines.push(...passageLines(q.passage));
  if (q.text && topic !== "dictation") lines.push(q.text);
  if (q.focus) lines.push(q.focus);
  if (q.first) lines.push(q.first);
  if (q.start) lines.push(q.start);
  if (q.paragraph) lines.push(q.paragraph);
  if (q.sentence) lines.push(["words-often-misspelt"].includes(topic) && q.word ? q.sentence.replace(new RegExp(`\\b${q.word}\\b`, "gi"), "____") : q.sentence);
  if (q.lines) lines.push(...q.lines.map(words));
  if (q.kind === "sort" || q.kind === "match") {
    prompt ??= q.kind === "match" ? "Match each card to the correct paragraph." : "Sort these cards under the headings.";
    lines.push(`Headings: ${q.bins.map((b) => b.label).join("; ")}`, ...q.cards.map((c, i) => `${i + 1}. ${c.label}`));
    answer = q.cards.map((c) => `${c.label}: ${labelFor(q.bins, c.bin)}`).join("; ");
  } else if (q.kind === "order") {
    prompt ??= topic === "using-a-dictionary" ? "Put these words in dictionary order." : "Number these events or sentences in the correct order.";
    lines.push(...q.items.map((i, n) => `${n + 1}. ${i.label}`));
    answer = q.answer.map((id) => labelFor(q.items, id)).join(" → ");
  } else if (q.kind === "lines") {
    prompt ??= "Underline the word requested in the poem.";
    const [row, col] = String(q.answer).split(":").map(Number);
    answer = q.lines[row]?.[col];
  } else if (q.tokens) {
    lines.push(q.tokens.join(" "));
    if (q.kind === "gaps") { prompt = "Rewrite the sentence, adding inverted commas around the spoken words."; answer = q.tokens.map((token, n) => `${n === q.openGap ? "“" : ""}${token}${n + 1 === q.closeGap ? "”" : ""}`).join(" "); }
    else if (q.kind === "fix") { prompt ??= topic === "a-or-an" ? "Find the incorrect article. Rewrite the sentence with the correct a or an." : "Find the incorrect word and write the correction."; answer = q.correct; }
    else if (q.kind === "spot" && q.correct) { prompt = "Find the misspelt word and write its correct spelling."; answer = q.correct; }
    else { prompt ??= topic === "words-in-context" ? `Underline the clue that helps explain the word “${q.word}”.` : topic === "does-it-make-sense" ? "Underline the word that does not make sense." : topic === "conjunctions" ? "Underline the conjunction in this sentence." : topic === "the-prefixes-super-anti-and-auto" ? `Underline the word with the prefix meaning ‘${q.meaning}’.` : topic === "proofreading" ? "Underline the word that needs checking." : "Underline the word or sentence requested."; if (typeof q.answer === "number") answer = q.tokens[q.answer]; else if (q.answerIndex !== undefined) answer = q.tokens[q.answerIndex]; }
  } else if (q.gaps && q.story) {
    prompt = "Complete each gap with a or an."; lines.push(q.story); answer = q.gaps.map((gap) => gap.answer).join(", ");
  } else if (q.kind === "split") {
    prompt = "Rewrite this text as two paragraphs. Start a new paragraph when the theme changes.";
    lines.push(q.sentences.join(" ")); answer = `Start the second paragraph before sentence ${q.answer + 1}: “${q.sentences[q.answer]}”. Themes: ${q.themes.join("; ")}.`;
  } else if (q.kind === "place") {
    prompt = `Which paragraph should this extra sentence join? “${q.sentence}”`; lines = passageLines(q.passage);
  } else if (q.kind === "spot" && q.sections) {
    prompt = "Which sub-heading does not fit its paragraph? Suggest a better heading.";
    lines.push(...q.sections.map((section, n) => `${n + 1}. ${section.heading}: ${section.text}`)); answer = `Heading ${q.answer + 1}; replace it with “${q.belongs}”.`;
  } else if (q.kind === "restore") {
    prompt = "Choose a suitable heading for this paragraph."; lines = [q.sections[q.step].text];
  } else if (q.kind === "diary") {
    prompt = `Choose the verb form that fits the clue: ${q.clue}`;
    lines = [`${q.gap.before}____${q.gap.after}`];
  } else if (q.kind === "hunt") {
    const error = q.errors[q.step];
    prompt = "Proofread this text. Correct the spelling, capital letters and punctuation.";
    lines = [words(q.shown)]; answer = words(q.fixed); reason = error?.explanation ?? "Accept a fully corrected version of the supplied text.";
  } else if (q.kind === "tense") {
    prompt = "Find the sentence whose tense does not fit the others. Explain the change needed.";
    lines = q.sentences; answer = typeof q.answer === "number" ? q.sentences[q.answer] : q.answer;
  } else if (q.kind === "build") {
    prompt ??= q.meaning ? `Build the word meaning “${q.meaning}”. Leave unused tiles.` : q.word ? `Build the word “${q.word}”. Leave unused tiles.` : q.root ? `Build the word${q.suffix ? ` by adding −${q.suffix}` : ""} from the root “${q.root}”.` : q.main ? `Complete this sentence using the given conjunction: ${q.main} ${q.conjunction ?? q.word ?? ""} ____.` : "Arrange the word tiles to make a correct sentence or word.";
    if (q.tiles) lines.push(`Tiles: ${q.tiles.map((t) => t.label).join(" · ")}`);
    if (q.answerOrder) answer = q.answerOrder.map((id) => labelFor(q.tiles, id)).join(" ");
  }
  if (topic === "dictation") {
    teacherScript = q.text;
    prompt = "Listen as your teacher reads a sentence. Write the sentence with correct spelling and punctuation.";
    lines = [];
    answer = q.text;
    reason = `Teacher script: read “${q.text}” aloud, then repeat it in short phrases.`;
  } else if (!prompt) {
    if (q.before !== undefined && q.after !== undefined) prompt = `Complete the gap${q.shown ? `, correcting “${q.shown}”` : ""}: ${q.before}____${q.after}${q.meaning ? ` (meaning: ${q.meaning})` : ""}`;
    else if (q.kind === "first") prompt = "Which word comes first in dictionary order?";
    else if (q.kind === "page") prompt = `Which word belongs between the dictionary guide words ${words(q.guides)}?`;
    else if (q.kind === "find") prompt = `Write the root word in “${q.word}”.`;
    else if (q.kind === "feeling") prompt = "How does the character feel? Use a clue from the text.";
    else if (q.kind === "action") prompt = `Which action best shows that ${q.who} feels ${q.feeling}?`;
    else if (q.kind === "evidence") { prompt = `Which sentence shows that ${q.who} feels ${q.feeling}?`; lines.push(...q.sentences); answer = q.sentences[q.answer]; }
    else if (q.kind === "pick" && ["words-often-misspelt", "homophones"].includes(topic)) prompt = `Choose the correctly spelt word meaning “${q.meaning}”.`;
    else if (q.kind === "meaning" && q.definition) prompt = `Which word matches this definition: ${q.definition}?`;
    else if (q.kind === "pick" && topic === "a-or-an") prompt = `Complete the phrase: ____ ${q.word}. Use a or an.`;
    else if (q.kind === "odd") prompt = `Which word does not belong${q.root ? ` to the “${q.root}” word family` : ` to the −${q.prefix} prefix group`}?`;
    else if (q.kind === "sound") prompt = `What sound do the letters “${q.letters}” represent in “${q.word}”?`;
    else if (q.kind === "which") prompt = q.sound ? `Which word contains “${q.letters}” with the sound ${q.sound}?` : `Which paragraph theme fits this sentence: ${q.sentence}?`;
    else if (q.kind === "tap" && q.chunks) { prompt = `Underline the letters in “${q.word}” that represent ${q.sound}.`; answer = q.letters; }
    else if (q.kind === "ending") prompt = `Complete the word ${q.stem}____. Meaning: ${q.meaning}.`;
    else if (q.kind === "fill") prompt = `Fill the missing spelling in ${q.before ?? q.stem ?? ""}____${q.after ?? ""}${q.meaning ? ` (meaning: ${q.meaning})` : ""}.`;
    else if (q.kind === "said") prompt = `Which words are spoken by ${q.who}?`;
    else if (q.kind === "setting") prompt = `Which description fits the setting ${q.place}?`;
    else if (q.kind === "pick" && topic === "adding-prefixes") prompt = `Choose the prefix that adds the meaning “${q.meaning}” to “${q.root}”.`;
    else if (q.kind === "pick" && q.suffix) prompt = `Add −${q.suffix} to “${q.root}”. Write the correct spelling.`;
    else if (q.kind === "pick" && topic === "word-families") prompt = `Which word belongs to the same word family as “${q.root}”?`;
    else if (["meaning", "pick"].includes(q.kind) && q.word) prompt = `What does “${q.word}” mean${q.sentence ? " in this sentence" : ""}?`;
    else if (q.kind === "finish") prompt = "Choose the ending that completes the sentence and makes sense.";
    else if (q.kind === "hasHave") prompt = "Complete the sentence using has or have.";
    else if (q.sentence) prompt = "Choose the word or phrase that correctly completes the sentence.";
    else if (q.kind === "choose" && options.length) prompt = "Choose the sentence with correctly placed inverted commas.";
  }
  if (options.length && topic !== "dictation") lines.push(`Choices: ${options.join(" / ")}`);
  if (q.list) lines.push(`${q.list.title ?? "Contents"}`, ...q.list.rows.map((row) => `${row.label} — page ${row.page}`));
  if (answer === undefined || answer === null || !prompt) return null;
  const model = lines.length ? essential("reading", { title: q.passage?.title ?? q.title ?? "Read and answer", lines: [...new Set(lines.filter(Boolean))] }) : null;
  return paperQuestion("english", topic, level, cleanPaperPrompt(prompt), answer, model, reason, { largeWorking: ["order", "sort", "match", "split", "hunt"].includes(q.kind) || topic === "dictation", teacherScript, data: { sourceKind: q.kind, sourceAnswer: q.answer } });
}
export function englishPaperPool(topic) {
  const builder = ENGLISH_BUILDERS[topic];
  if (!builder) return [];
  const bank = [];
  for (let seed = 1; seed <= 12; seed++) for (let level = 1; level <= 4; level++) {
    for (const q of builder(level, seededPaper(seed * 109 + level))) {
      const item = adapt(topic, level, q);
      if (item) bank.push(item);
    }
  }
  return bank;
}
