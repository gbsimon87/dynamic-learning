/**
 * Course-checker adapters for curriculum topics whose challenges use their own
 * question shapes instead of the shared DataChallenge kinds (Years 2–3 Maths,
 * Year 3 English and Science, and dictation). Each entry names the pure
 * builder its challenge wrappers call; `banks.test.js` checks the registry
 * against the wrappers so it cannot drift silently.
 *
 *   "year/subject/topic": [file, "buildX"]          → buildX(level, rng)
 *   "year/subject/topic": [file, "MAP.key"]         → MAP[key](level, rng)
 *   "year/subject/topic": [file, [b1, b2, b3, b4]]  → b<level>(rng)
 *
 * Files are relative to src/data/challenges/.
 */
import { seededRng } from "../../src/data/challenges/questionKinds.js";
import { findUsSpellings } from "../../src/data/english/textChecks.js";

export const BESPOKE_BANKS = {
  "2/math/2-5-and-10-multiplication-tables": ["multiplicationAndDivision.js", ["buildTableRecall", "buildOddOrEven", "buildTableOrdering", "buildMixedTableFacts"]],
  "2/math/2-d-shapes": ["shapeQuestions.js", ["buildNameShapes", "buildCountSides", "buildSymmetry", "buildOrderBySides"]],
  "2/math/3-d-shapes": ["shapeQuestions.js", ["buildNameSolids", "buildCountSolidParts", "buildEverydaySolids", "buildOrderSolids"]],
  "2/math/block-diagrams": ["statisticsQuestions.js", ["buildBlockRead", "buildBlockScale", "buildBlockConstruct", "buildBlockProblems"]],
  "2/math/comparing-measurements": ["measurement.js", ["buildVisualCompareQuestions", "buildCrossUnitCompareQuestions", "buildMixedUnitOrderQuestions", "buildMeasureDifferenceQuestions"]],
  "2/math/connecting-multiplication-and-division": ["multiplicationAndDivision.js", ["buildRelatedDivisionChoice", "buildUseTheFact", "buildFactFamilySort", "buildInverseMissingNumbers"]],
  "2/math/counting-forwards-and-backwards": ["countingForwardsAndBackwards.js", ["buildCountOnQuestions", "buildCountBackQuestions", "buildCountOrderQuestions", "buildCountingStoryQuestions"]],
  "2/math/counting-in-steps-of-2-3-5-and-10": ["countingInSteps.js", ["buildNamedStepQuestions", "buildNextTermQuestions", "buildStepOrderQuestions", "buildGroupStoryQuestions"]],
  "2/math/counting-more-and-less": ["countingMoreAndLess.js", ["buildOneMoreLessQuestions", "buildRuleMachineQuestions", "buildRuleChainQuestions", "buildMoreLessStoryQuestions"]],
  "2/math/different-shapes": ["shapeQuestions.js", ["buildFaceOnSolid", "buildFlatOrSolid", "buildOddOneOut", "buildShapeClues"]],
  "2/math/division-problems": ["multiplicationAndDivision.js", ["buildDivisionStatementChoice", "buildMeasureSharing", "buildDivisionOrdering", "buildCombineAndShare"]],
  "2/math/doubling-and-halving-using-addition-and-subtraction": ["additionAndSubtraction.js", ["buildDoublingQuestions", "buildHalvingQuestions", "buildDoublingChainQuestions", "buildUseDoublesQuestions"]],
  "2/math/doubling-and-halving-using-multiplication-and-division": ["multiplicationAndDivision.js", ["buildDoubling", "buildHalving", "buildHalvingChains", "buildDoubleOrHalveProblems"]],
  "2/math/finding-fractions-of-larger-groups": ["fractions.js", ["buildFractionOfSet", "buildFractionOfMeasure", "buildFractionOfOrdering", "buildFractionStories"]],
  "2/math/fractions-of-numbers": ["fractions.js", ["buildFractionOfRows", "buildHalfIsTwoQuarters", "buildFractionCounting", "buildFractionStatements"]],
  "2/math/gathering-information-and-using-data": ["statisticsQuestions.js", ["buildPileCount", "buildPileSort", "buildPileToBlocks", "buildPileProblems"]],
  "2/math/less-than-greater-than-and-equal-to": ["comparingNumbers.js", ["buildPickSymbolQuestions", "buildPickNumberQuestions", "buildChainQuestions", "buildBetweenQuestions"]],
  "2/math/measuring-length-and-height": ["measurement.js", ["buildRulerReadQuestions", "buildRulerSetQuestions", "buildUnitChoiceQuestions", "buildLengthStoryQuestions"]],
  "2/math/measuring-temperature": ["measurement.js", ["buildThermometerReadQuestions", "buildThermometerSetQuestions", "buildTemperatureOrderQuestions", "buildTemperatureSenseQuestions"]],
  "2/math/measuring-time": ["measurement.js", ["buildClockReadQuestions", "buildFiveMinuteReadQuestions", "buildClockSetQuestions", "buildTimeIntervalQuestions"]],
  "2/math/measuring-weight-and-volume": ["measurement.js", ["buildScaleReadQuestions", "buildJugReadQuestions", "buildJugFillQuestions", "buildMassCapacityStoryQuestions"]],
  "2/math/money-problems": ["measurement.js", ["buildAddPricesQuestions", "buildChangeQuestions", "buildCountChangeQuestions", "buildTwoStepMoneyQuestions"]],
  "2/math/numbers-and-counting": ["numbersAndCounting.js", ["buildFillGapQuestions", "buildWordsToNumeralQuestions", "buildEstimateQuestions", "buildWordsToDigitsQuestions"]],
  "2/math/patterns": ["positionQuestions.js", ["buildFillGap", "buildNextShape", "buildTurnedShapes", "buildBuildPattern"]],
  "2/math/pictograms": ["statisticsQuestions.js", ["buildPictogramRead", "buildPictogramCompare", "buildPictogramConstruct", "buildPictogramProblems"]],
  "2/math/place-value": ["placeValue.js", ["buildCountBlocksQuestions", "buildPartsToNumberQuestions", "buildOrderDigitsQuestions", "buildPartitionQuestions"]],
  "2/math/quarter-turns-and-half-turns": ["positionQuestions.js", ["buildPredictTurn", "buildMakeTurn", "buildNameTurn", "buildRightAngleCount"]],
  "2/math/right-angle-turns": ["positionQuestions.js", ["buildRobotTurn", "buildStraightRoute", "buildCountTurns", "buildCornerRoute"]],
  "2/math/sequences": ["positionQuestions.js", ["buildDescribePosition", "buildRepeatLength", "buildOrdinals", "buildArrangeLine"]],
  "2/math/solving-missing-number-problems": ["additionAndSubtraction.js", ["buildMissingAddendQuestions", "buildPickInverseQuestions", "buildFactFamilyQuestions", "buildMissingNumberQuestions"]],
  "2/math/solving-multiplication-and-division-problems": ["multiplicationAndDivision.js", ["buildOperationChoice", "buildArrayStories", "buildMixedFactOrdering", "buildTwoStepProblems"]],
  "2/math/solving-number-problems": ["additionAndSubtraction.js", ["buildOneStepQuestions", "buildSwapQuestions", "buildOrderByAnswerQuestions", "buildTwoStepQuestions"]],
  "2/math/standard-units-of-money": ["measurement.js", ["buildCoinNameQuestions", "buildMakeAmountQuestions", "buildAnotherWayQuestions", "buildCoinTotalQuestions"]],
  "2/math/tables": ["statisticsQuestions.js", ["buildTableRead", "buildTableCell", "buildTableFromTally", "buildTableProblems"]],
  "2/math/tally-charts": ["statisticsQuestions.js", ["buildTallyRead", "buildTallyWhole", "buildTallyPile", "buildTallyProblems"]],
  "2/math/using-two-digit-numbers": ["additionAndSubtraction.js", ["buildAddOnesQuestions", "buildTensQuestions", "buildMakeTenQuestions", "buildTwoDigitQuestions"]],
  "2/math/what-is-a-fraction": ["fractions.js", ["buildNameFraction", "buildEquivalence", "buildFractionOrdering", "buildWriteFraction"]],
  "2/math/what-is-division": ["multiplicationAndDivision.js", ["buildSharingPictures", "buildGroupingQuestions", "buildDivisionFamilies", "buildSharingOrGrouping"]],
  "2/math/what-is-multiplication": ["multiplicationAndDivision.js", ["buildMultiplicationArrays", "buildRepeatedAddition", "buildArrayStatements", "buildEqualGroupStories"]],
  "3/math/3-and-4-times-tables": ["year3MulDiv.js", "buildTablesQuestions"],
  "3/math/adding-and-subtracting-fractions": ["year3Fractions.js", "buildArithmeticQuestions"],
  "3/math/adding-and-subtracting-measurements": ["year3Measurement.js", "buildMeasurementArithmeticQuestions"],
  "3/math/adding-and-subtracting-ones-tens-and-hundreds": ["addingAndSubtractingPlaces.js", "buildPlaceChangeQuestions"],
  "3/math/addition-and-subtraction-problems": ["additionSubtractionProblems3Digit.js", "buildAdditionSubtractionProblems"],
  "3/math/angles-as-turns": ["year3Shapes.js", "YEAR3_SHAPE_BUILDERS.anglesAsTurns"],
  "3/math/bar-charts": ["year3Statistics.js", "YEAR3_STATISTICS_BUILDERS.bars"],
  "3/math/column-addition": ["columnAddition3Digit.js", "buildColumnAdditionQuestions"],
  "3/math/column-subtraction": ["columnSubtraction3Digit.js", "buildColumnSubtractionQuestions"],
  "3/math/comparing-and-ordering-fractions": ["year3Fractions.js", "buildComparingQuestions"],
  "3/math/comparing-and-ordering-numbers-to-1000": ["comparingNumbers1000.js", "buildCompareQuestions"],
  "3/math/comparing-angles-to-a-right-angle": ["year3Shapes.js", "YEAR3_SHAPE_BUILDERS.comparingAngles"],
  "3/math/counting-in-multiples-of-4-8-50-and-100": ["countingInMultiples.js", ["buildNextMultipleQuestions", "buildMissingMultipleQuestions", "buildOrderMultiplesQuestions", "buildNthMultipleQuestions"]],
  "3/math/drawing-2-d-shapes": ["year3Shapes.js", "YEAR3_SHAPE_BUILDERS.drawing2d"],
  "3/math/equivalent-fractions": ["year3Fractions.js", "buildEquivalentQuestions"],
  "3/math/estimating-and-checking-answers": ["estimatingAndChecking.js", "buildEstimatingQuestions"],
  "3/math/finding-10-or-100-more-or-less": ["finding10Or100MoreOrLess.js", "buildJumpQuestions"],
  "3/math/fraction-problems": ["year3Fractions.js", "buildFractionProblemQuestions"],
  "3/math/fractions-as-numbers": ["year3Fractions.js", "buildNumbersQuestions"],
  "3/math/fractions-of-a-set-of-objects": ["year3Fractions.js", "buildSetQuestions"],
  "3/math/horizontal-vertical-parallel-and-perpendicular-lines": ["year3Shapes.js", "YEAR3_SHAPE_BUILDERS.lines"],
  "3/math/making-and-recognising-3-d-shapes": ["year3Shapes.js", "YEAR3_SHAPE_BUILDERS.solids3d"],
  "3/math/measuring-length-in-mm-cm-and-m": ["year3Measurement.js", "buildLengthQuestions"],
  "3/math/measuring-mass": ["year3Measurement.js", "buildMassQuestions"],
  "3/math/measuring-volume-and-capacity": ["year3Measurement.js", "buildVolumeQuestions"],
  "3/math/missing-number-problems": ["missingNumber3Digit.js", "buildMissingNumberQuestions"],
  "3/math/money-and-giving-change": ["year3Measurement.js", "buildMoneyQuestions"],
  "3/math/multiplication-and-division-problems": ["year3MulDiv.js", "buildMulDivProblemQuestions"],
  "3/math/multiplying-and-dividing-two-digit-numbers": ["year3MulDiv.js", "buildTwoDigitQuestions"],
  "3/math/number-and-place-value-problems": ["numberAndPlaceValueProblems.js", "buildProblemQuestions"],
  "3/math/one-step-and-two-step-questions": ["year3Statistics.js", "YEAR3_STATISTICS_BUILDERS.problems"],
  "3/math/perimeter-of-2-d-shapes": ["year3Measurement.js", "buildPerimeterQuestions"],
  "3/math/place-value-in-3-digit-numbers": ["placeValue3Digit.js", ["buildPlaceDigitQuestions", "buildReadBlocksQuestions", "buildMakeNumberQuestions", "buildPartitionGapQuestions"]],
  "3/math/reading-and-writing-numbers-to-1000": ["readingAndWritingNumbers1000.js", "buildWordQuestions"],
  "3/math/representing-and-estimating-numbers": ["representingNumbers.js", "buildRepresentQuestions"],
  "3/math/right-angles": ["year3Shapes.js", "YEAR3_SHAPE_BUILDERS.rightAngles"],
  "3/math/roman-numerals-and-24-hour-clocks": ["year3Measurement.js", "buildRoman24Questions"],
  "3/math/scaled-pictograms": ["year3Statistics.js", "YEAR3_STATISTICS_BUILDERS.pictograms"],
  "3/math/scaling-and-correspondence-problems": ["year3MulDiv.js", "buildScalingQuestions"],
  "3/math/tables": ["year3Statistics.js", "YEAR3_STATISTICS_BUILDERS.tables"],
  "3/math/telling-the-time-to-the-minute": ["year3Measurement.js", "buildTimeToMinuteQuestions"],
  "3/math/tenths": ["year3Fractions.js", "buildTenthsQuestions"],
  "3/math/the-8-times-table": ["year3MulDiv.js", "buildEightQuestions"],
  "3/math/units-of-time-and-durations": ["year3Measurement.js", "buildDurationQuestions"],
  "3/english/a-or-an": ["english/aOrAn.js", "buildAOrAnQuestions"],
  "3/english/adding-prefixes": ["english/addingPrefixes.js", "buildAddingPrefixesPractice"],
  "3/english/asking-questions-about-a-text": ["english/askingQuestionsAboutAText.js", "buildAskingQuestionsQuestions"],
  "3/english/characters-feelings": ["english/charactersFeelings.js", "buildFeelingsQuestions"],
  "3/english/conjunctions": ["english/conjunctions.js", "buildConjunctionQuestions"],
  "3/english/dictation": ["english/dictation.js", "buildDictationQuestions"],
  "3/english/does-it-make-sense": ["english/doesItMakeSense.js", "buildDoesItMakeSenseQuestions"],
  "3/english/doubling-before-a-suffix": ["english/doublingBeforeASuffix.js", "buildDoublingPractice"],
  "3/english/exception-words": ["english/exceptionWords.js", "buildExceptionWordsQuestions"],
  "3/english/fairy-stories-myths-and-legends": ["english/fairyStoriesMythsAndLegends.js", "buildFairyStoriesQuestions"],
  "3/english/finding-information": ["english/findingInformation.js", "buildFindingInformationQuestions"],
  "3/english/headings-and-sub-headings": ["english/headingsAndSubHeadings.js", "buildHeadingQuestions"],
  "3/english/homophones": ["english/homophones.js", "buildHomophoneQuestions"],
  "3/english/inverted-commas": ["english/invertedCommas.js", "buildInvertedCommasQuestions"],
  "3/english/kinds-of-writing": ["english/kindsOfWriting.js", "buildKindsOfWritingQuestions"],
  "3/english/paragraphs": ["english/paragraphs.js", "buildParagraphQuestions"],
  "3/english/poetry-forms": ["english/poetryForms.js", "buildPoetryFormsQuestions"],
  "3/english/predicting-what-happens-next": ["english/predictingWhatHappensNext.js", "buildPredictingQuestions"],
  "3/english/proofreading": ["english/proofreading.js", "buildProofreadingQuestions"],
  "3/english/root-words": ["english/rootWords.js", "buildRootWordsQuestions"],
  "3/english/settings-characters-and-plot": ["english/settingsCharactersAndPlot.js", "buildStoryQuestions"],
  "3/english/the-prefixes-super-anti-and-auto": ["english/thePrefixesSuperAntiAndAuto.js", "buildSuperAntiAutoQuestions"],
  "3/english/the-present-perfect": ["english/thePresentPerfect.js", "buildPresentPerfectQuestions"],
  "3/english/the-suffixes-ation-and-ly": ["english/theSuffixesAtionAndLy.js", "buildSuffixPractice"],
  "3/english/the-sure-and-ture-endings": ["english/theSureAndTureEndings.js", "buildTheSureAndTureEndingsQuestions"],
  "3/english/time-and-cause-words": ["english/timeAndCauseWords.js", "buildTimeAndCauseQuestions"],
  "3/english/tricky-sounds-y-and-ou": ["english/trickySoundsYAndOu.js", "buildTrickySoundsYAndOuQuestions"],
  "3/english/using-a-dictionary": ["english/usingADictionary.js", "buildUsingADictionaryQuestions"],
  "3/english/word-families": ["english/wordFamilies.js", "buildWordFamilyQuestions"],
  "3/english/words-in-context": ["english/wordsInContext.js", "buildWordsInContextQuestions"],
  "3/english/words-often-misspelt": ["english/wordsOftenMisspelt.js", "buildWordsOftenMisspeltPractice"],
  "3/english/words-that-spark-the-imagination": ["english/wordsThatSparkTheImagination.js", "buildSparkWordsQuestions"],
  "3/science/changing-shadow-size": ["science/changingShadowSize.js", "buildShadowSizeQuestions"],
  "3/science/comparing-and-grouping-rocks": ["science/comparingAndGroupingRocks.js", "buildRocksQuestions"],
  "3/science/contact-and-magnetic-forces": ["science/contactAndMagneticForces.js", "buildContactQuestions"],
  "3/science/how-fossils-form": ["science/howFossilsForm.js", "buildFossilQuestions"],
  "3/science/how-shadows-form": ["science/howShadowsForm.js", "buildShadowFormationQuestions"],
  "3/science/light-and-darkness": ["science/lightAndDarkness.js", "buildLightQuestions"],
  "3/science/magnetic-materials": ["science/magneticMaterials.js", "buildMaterialsQuestions"],
  "3/science/magnets-and-their-poles": ["science/magnetsAndTheirPoles.js", "buildPolesQuestions"],
  "3/science/movement-on-different-surfaces": ["science/movementOnDifferentSurfaces.js", "buildMovementQuestions"],
  "3/science/muscles-and-movement": ["science/musclesAndMovement.js", "buildMusclesQuestions"],
  "3/science/nutrition-for-animals-and-humans": ["science/nutritionForAnimalsAndHumans.js", "buildNutritionQuestions"],
  "3/science/parts-of-flowering-plants": ["science/partsOfFloweringPlants.js", "buildPartsOfFloweringPlantsQuestions"],
  "3/science/pollination-and-seed-formation": ["science/pollinationAndSeedFormation.js", "buildPollinationAndSeedFormationQuestions"],
  "3/science/predicting-attraction-and-repulsion": ["science/predictingAttractionAndRepulsion.js", "buildPredictionQuestions"],
  "3/science/protecting-our-eyes-from-sunlight": ["science/protectingOurEyesFromSunlight.js", "buildSunlightQuestions"],
  "3/science/reflected-light": ["science/reflectedLight.js", "buildReflectionQuestions"],
  "3/science/seed-dispersal": ["science/seedDispersal.js", "buildSeedDispersalQuestions"],
  "3/science/skeletons-for-support-and-protection": ["science/skeletonsForSupportAndProtection.js", "buildSkeletonQuestions"],
  "3/science/water-transport-in-plants": ["science/waterTransportInPlants.js", "buildWaterTransportInPlantsQuestions"],
  "3/science/what-plants-need-to-grow": ["science/whatPlantsNeedToGrow.js", "buildWhatPlantsNeedToGrowQuestions"],
  "3/science/what-soil-is-made-from": ["science/whatSoilIsMadeFrom.js", "buildSoilQuestions"],
  "1/english/dictation": ["english/year1Dictation.js", "buildQuestions"],
  "2/english/dictation": ["english/year2Dictation.js", "buildQuestions"],
  "4/english/dictation": ["english/year4Dictation.js", "buildDictationQuestions"],
  "5/english/dictation": ["english/year5Dictation.js", "buildDictationQuestions"],
};

const TEXT_KEYS = /^(prompt|text|question|sentence|hint|label|title|story|clue|feedback|explanation|speak|say|caption|instruction|statement|word|answer|options|choices|items|cards|tiles|lines|passage|blocks)$/i;

/** Every string reachable from a question, with the path that reached it. */
function strings(value, at = "", out = []) {
  if (typeof value === "string") out.push([at, value]);
  else if (Array.isArray(value)) value.forEach((item, i) => strings(item, `${at}[${i}]`, out));
  else if (value && typeof value === "object") for (const [key, item] of Object.entries(value)) strings(item, at ? `${at}.${key}` : key, out);
  return out;
}

function numbers(value, at = "", out = []) {
  if (typeof value === "number") out.push([at, value]);
  else if (Array.isArray(value)) value.forEach((item, i) => numbers(item, `${at}[${i}]`, out));
  else if (value && typeof value === "object") for (const [key, item] of Object.entries(value)) numbers(item, at ? `${at}.${key}` : key, out);
  return out;
}

const shown = (path) => path.split(/[.[\]]+/).filter(Boolean).some((part) => TEXT_KEYS.test(part));
// Text a learner must read to act. Other fields (a passage title, a tile
// label) may be deliberately blank.
const REQUIRED_TEXT = /^(?:prompt|question|sentence|hint|options\[\d+\])$/;
const primitive = (value) => typeof value === "string" || typeof value === "number";
const optionKey = (option) => JSON.stringify(option && typeof option === "object" && "id" in option ? option.id : option);

/**
 * Shape-independent checks for one question. These hold for every bespoke
 * model in the registry; anything shape-specific belongs in the topic's own
 * subject test.
 */
export function bespokeQuestionProblems(q, { year } = {}) {
  if (!q || typeof q !== "object" || Array.isArray(q)) return ["not a question object"];
  const problems = [];
  for (const [at, text] of strings(q)) {
    if (/\b(?:undefined|NaN)\b|\[object Object\]/.test(text)) problems.push(`${at}: shows "${text}"`);
    if (REQUIRED_TEXT.test(at) && !text.trim()) problems.push(`${at}: empty text`);
  }
  for (const [at, n] of numbers(q)) if (!Number.isFinite(n)) problems.push(`${at}: ${n}`);
  const visible = strings(q).filter(([at]) => shown(at)).map(([, text]) => text).join(" \n ");
  const us = findUsSpellings(visible);
  if (us.length) problems.push(`US spelling: ${us.join(", ")}`);
  if (year !== undefined && year <= 2 && /(?:^|[\s(=])[-−]\d/.test(visible)) problems.push("a negative number in a Year 2 question");

  if (Array.isArray(q.options) && q.options.length) {
    if (new Set(q.options.map(optionKey)).size !== q.options.length) problems.push("duplicate options");
    // Only compare like with like: many models keep a numeric answer beside
    // labelled options ("850 ml", "7/8"), which their own tests check.
    if (q.options.every(primitive)) {
      for (const field of ["answer", "answerOption", "answerLabel"]) {
        const value = q[field];
        if (!primitive(value) || typeof value !== typeof q.options[0]) continue;
        const hits = q.options.filter((option) => option === value).length;
        if (hits !== 1) problems.push(`${field} ${JSON.stringify(value)} appears ${hits} times in options`);
      }
    }
  }
  for (const key of ["cards", "items", "tiles"]) {
    if (!Array.isArray(q[key]) || !q[key].every((c) => c && typeof c === "object" && "id" in c)) continue;
    if (new Set(q[key].map((c) => c.id)).size !== q[key].length) problems.push(`duplicate ${key} ids`);
  }
  if (Array.isArray(q.ordered) && Array.isArray(q.cards) && q.cards.every((c) => c && "id" in c)) {
    const ids = q.cards.map((c) => c.id);
    if (q.ordered.length !== ids.length || !q.ordered.every((id) => ids.includes(id))) problems.push("ordered answer does not match the cards");
  }
  return problems;
}

/** Run every level over `seeds` deterministic rngs. */
export function lintBespoke(build, { year, seeds = 50, minQuestions = 3 } = {}) {
  const problems = [];
  for (const level of [1, 2, 3, 4]) {
    for (let seed = 1; seed <= seeds; seed += 1) {
      const questions = build(level, seededRng(seed));
      if (!Array.isArray(questions) || questions.length < minQuestions) {
        problems.push(`level ${level}, seed ${seed}: fewer than ${minQuestions} questions`);
        continue;
      }
      questions.forEach((q, i) => {
        for (const problem of bespokeQuestionProblems(q, { year })) problems.push(`level ${level}, seed ${seed}, question ${i + 1}: ${problem}`);
      });
    }
  }
  return problems;
}

/**
 * Resolve a registered bespoke bank, or null. `load(relative)` imports a
 * repository module and records it in the result's paths.
 */
export async function resolveBespokeBank({ year, subject, topicId, load, paths, limitations }) {
  const entry = BESPOKE_BANKS[`${year}/${subject}/${topicId}`];
  if (!entry) return null;
  const [file, builders] = entry;
  const relative = `src/data/challenges/${file}`;
  const module = await load(relative);
  const pick = (name) => {
    const [first, key] = name.split(".");
    const found = key === undefined ? module[first] : module[first]?.[key];
    if (typeof found !== "function") throw new TypeError(`${relative}: ${name} is not a builder function`);
    return found;
  };
  const build = typeof builders === "string"
    ? ((fn) => (level, rng) => fn(level, rng))(pick(builders))
    : ((fns) => (level, rng) => fns[level - 1](rng))(builders.map(pick));
  limitations.push(`Bespoke question model: checked for deterministic replay, question count, readable text, UK spelling${year <= 2 ? ", Year 2 negatives" : ""} and answers among like-for-like options. Answer acceptance and shape-specific rules still need each builder's own *.test.js.`);
  const result = { build, model: "bespoke", minQuestions: 3, paths, limitations };
  if (topicId === "dictation") {
    const { checkBuild } = await load("src/data/challenges/english/englishBankValidation.js");
    result.validate = () => {
      try { checkBuild(build); return []; }
      catch (error) { return [`English dictation validator: ${error.message.split("\n")[0]}`]; }
    };
    limitations.push("Dictation also ran the shared English bank validator (tiles, typed answers, passages); spoken audio is not checked.");
  }
  return result;
}
