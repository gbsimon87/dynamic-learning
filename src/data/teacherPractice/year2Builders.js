// Explicit source identifiers survive production minification. Existing Year 2 banks: one practice format and one written application per topic.
import { buildArrayStories, buildCombineAndShare, buildDivisionStatementChoice, buildDoubling, buildEqualGroupStories, buildHalving, buildInverseMissingNumbers, buildMultiplicationArrays, buildOperationChoice, buildRelatedDivisionChoice, buildSharingOrGrouping, buildSharingPictures } from "../challenges/multiplicationAndDivision.js";
import { buildFaceOnSolid, buildNameShapes, buildNameSolids, buildOrderBySides, buildOrderSolids, buildShapeClues } from "../challenges/shapeQuestions.js";
import { buildBlockProblems, buildBlockRead, buildPictogramProblems, buildPictogramRead, buildPileCount, buildPileProblems, buildTableProblems, buildTableRead, buildTallyProblems, buildTallyRead } from "../challenges/statisticsQuestions.js";
import { buildAddPricesQuestions, buildClockReadQuestions, buildCoinNameQuestions, buildCoinTotalQuestions, buildLengthStoryQuestions, buildMassCapacityStoryQuestions, buildMeasureDifferenceQuestions, buildRulerReadQuestions, buildScaleReadQuestions, buildTemperatureSenseQuestions, buildThermometerReadQuestions, buildTimeIntervalQuestions, buildTwoStepMoneyQuestions, buildVisualCompareQuestions } from "../challenges/measurement.js";
import { buildCountOnQuestions, buildCountingStoryQuestions } from "../challenges/countingForwardsAndBackwards.js";
import { buildGroupStoryQuestions, buildNamedStepQuestions } from "../challenges/countingInSteps.js";
import { buildMoreLessStoryQuestions, buildOneMoreLessQuestions } from "../challenges/countingMoreAndLess.js";
import { buildAddOnesQuestions, buildDoublingQuestions, buildMissingAddendQuestions, buildMissingNumberQuestions, buildOneStepQuestions, buildTwoDigitQuestions, buildTwoStepQuestions, buildUseDoublesQuestions } from "../challenges/additionAndSubtraction.js";
import { buildFractionOfRows, buildFractionOfSet, buildFractionStatements, buildFractionStories, buildNameFraction, buildWriteFraction } from "../challenges/fractions.js";
import { buildBetweenQuestions, buildPickSymbolQuestions } from "../challenges/comparingNumbers.js";
import { buildFillGapQuestions, buildWordsToDigitsQuestions } from "../challenges/numbersAndCounting.js";
import { buildArrangeLine, buildBuildPattern, buildCornerRoute, buildDescribePosition, buildFillGap, buildPredictTurn, buildRightAngleCount, buildRobotTurn } from "../challenges/positionQuestions.js";
import { buildCountBlocksQuestions, buildPartitionQuestions } from "../challenges/placeValue.js";
export const YEAR2_PAPER_BUILDERS = {
  "2-d-shapes": [{ source: "buildNameShapes", build: buildNameShapes }, { source: "buildOrderBySides", build: buildOrderBySides }],
  "3-d-shapes": [{ source: "buildNameSolids", build: buildNameSolids }, { source: "buildOrderSolids", build: buildOrderSolids }],
  "block-diagrams": [{ source: "buildBlockRead", build: buildBlockRead }, { source: "buildBlockProblems", build: buildBlockProblems }],
  "comparing-measurements": [{ source: "buildVisualCompareQuestions", build: buildVisualCompareQuestions }, { source: "buildMeasureDifferenceQuestions", build: buildMeasureDifferenceQuestions }],
  "connecting-multiplication-and-division": [{ source: "buildRelatedDivisionChoice", build: buildRelatedDivisionChoice }, { source: "buildInverseMissingNumbers", build: buildInverseMissingNumbers }],
  "counting-forwards-and-backwards": [{ source: "buildCountOnQuestions", build: buildCountOnQuestions }, { source: "buildCountingStoryQuestions", build: buildCountingStoryQuestions }],
  "counting-in-steps-of-2-3-5-and-10": [{ source: "buildNamedStepQuestions", build: buildNamedStepQuestions }, { source: "buildGroupStoryQuestions", build: buildGroupStoryQuestions }],
  "counting-more-and-less": [{ source: "buildOneMoreLessQuestions", build: buildOneMoreLessQuestions }, { source: "buildMoreLessStoryQuestions", build: buildMoreLessStoryQuestions }],
  "different-shapes": [{ source: "buildFaceOnSolid", build: buildFaceOnSolid }, { source: "buildShapeClues", build: buildShapeClues }],
  "division-problems": [{ source: "buildDivisionStatementChoice", build: buildDivisionStatementChoice }, { source: "buildCombineAndShare", build: buildCombineAndShare }],
  "doubling-and-halving-using-addition-and-subtraction": [{ source: "buildDoublingQuestions", build: buildDoublingQuestions }, { source: "buildUseDoublesQuestions", build: buildUseDoublesQuestions }],
  "doubling-and-halving-using-multiplication-and-division": [{ source: "buildDoubling", build: buildDoubling }, { source: "buildHalving", build: buildHalving }],
  "finding-fractions-of-larger-groups": [{ source: "buildFractionOfSet", build: buildFractionOfSet }, { source: "buildFractionStories", build: buildFractionStories }],
  "fractions-of-numbers": [{ source: "buildFractionOfRows", build: buildFractionOfRows }, { source: "buildFractionStatements", build: buildFractionStatements }],
  "gathering-information-and-using-data": [{ source: "buildPileCount", build: buildPileCount }, { source: "buildPileProblems", build: buildPileProblems }],
  "less-than-greater-than-and-equal-to": [{ source: "buildPickSymbolQuestions", build: buildPickSymbolQuestions }, { source: "buildBetweenQuestions", build: buildBetweenQuestions }],
  "measuring-length-and-height": [{ source: "buildRulerReadQuestions", build: buildRulerReadQuestions }, { source: "buildLengthStoryQuestions", build: buildLengthStoryQuestions }],
  "measuring-temperature": [{ source: "buildThermometerReadQuestions", build: buildThermometerReadQuestions }, { source: "buildTemperatureSenseQuestions", build: buildTemperatureSenseQuestions }],
  "measuring-time": [{ source: "buildClockReadQuestions", build: buildClockReadQuestions }, { source: "buildTimeIntervalQuestions", build: buildTimeIntervalQuestions }],
  "measuring-weight-and-volume": [{ source: "buildScaleReadQuestions", build: buildScaleReadQuestions }, { source: "buildMassCapacityStoryQuestions", build: buildMassCapacityStoryQuestions }],
  "money-problems": [{ source: "buildAddPricesQuestions", build: buildAddPricesQuestions }, { source: "buildTwoStepMoneyQuestions", build: buildTwoStepMoneyQuestions }],
  "numbers-and-counting": [{ source: "buildFillGapQuestions", build: buildFillGapQuestions }, { source: "buildWordsToDigitsQuestions", build: buildWordsToDigitsQuestions }],
  "patterns": [{ source: "buildFillGap", build: buildFillGap }, { source: "buildBuildPattern", build: buildBuildPattern }],
  "pictograms": [{ source: "buildPictogramRead", build: buildPictogramRead }, { source: "buildPictogramProblems", build: buildPictogramProblems }],
  "place-value": [{ source: "buildCountBlocksQuestions", build: buildCountBlocksQuestions }, { source: "buildPartitionQuestions", build: buildPartitionQuestions }],
  "quarter-turns-and-half-turns": [{ source: "buildPredictTurn", build: buildPredictTurn }, { source: "buildRightAngleCount", build: buildRightAngleCount }],
  "right-angle-turns": [{ source: "buildRobotTurn", build: buildRobotTurn }, { source: "buildCornerRoute", build: buildCornerRoute }],
  "sequences": [{ source: "buildDescribePosition", build: buildDescribePosition }, { source: "buildArrangeLine", build: buildArrangeLine }],
  "solving-missing-number-problems": [{ source: "buildMissingAddendQuestions", build: buildMissingAddendQuestions }, { source: "buildMissingNumberQuestions", build: buildMissingNumberQuestions }],
  "solving-multiplication-and-division-problems": [{ source: "buildOperationChoice", build: buildOperationChoice }, { source: "buildArrayStories", build: buildArrayStories }],
  "solving-number-problems": [{ source: "buildOneStepQuestions", build: buildOneStepQuestions }, { source: "buildTwoStepQuestions", build: buildTwoStepQuestions }],
  "standard-units-of-money": [{ source: "buildCoinNameQuestions", build: buildCoinNameQuestions }, { source: "buildCoinTotalQuestions", build: buildCoinTotalQuestions }],
  "tables": [{ source: "buildTableRead", build: buildTableRead }, { source: "buildTableProblems", build: buildTableProblems }],
  "tally-charts": [{ source: "buildTallyRead", build: buildTallyRead }, { source: "buildTallyProblems", build: buildTallyProblems }],
  "using-two-digit-numbers": [{ source: "buildAddOnesQuestions", build: buildAddOnesQuestions }, { source: "buildTwoDigitQuestions", build: buildTwoDigitQuestions }],
  "what-is-a-fraction": [{ source: "buildNameFraction", build: buildNameFraction }, { source: "buildWriteFraction", build: buildWriteFraction }],
  "what-is-division": [{ source: "buildSharingPictures", build: buildSharingPictures }, { source: "buildSharingOrGrouping", build: buildSharingOrGrouping }],
  "what-is-multiplication": [{ source: "buildMultiplicationArrays", build: buildMultiplicationArrays }, { source: "buildEqualGroupStories", build: buildEqualGroupStories }],
};
